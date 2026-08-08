import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, stepCountIs, tool } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, getLovableAiGatewayRunId } from "@/lib/ai-gateway.server";
import { buildSiteContext, whatsappLink } from "@/lib/site-context";
import { profile } from "@/data/portfolio";

function textOf(message) {
  return (message?.parts ?? [])
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("")
    .trim();
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const messages = body?.messages;
        const startedPath = typeof body?.path === "string" ? body.path.slice(0, 300) : null;
        let conversationId =
          typeof body?.conversationId === "string" ? body.conversationId : null;

        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        // Persistence is best-effort: chat must still work if the database is unavailable.
        let supabaseAdmin = null;
        try {
          ({ supabaseAdmin } = await import("@/integrations/supabase/client.server"));
        } catch (err) {
          console.error("chat: supabase admin unavailable", err);
        }

        let persist = Boolean(supabaseAdmin);

        if (persist) {
          try {
            let exists = false;
            if (conversationId) {
              const { data } = await supabaseAdmin
                .from("chat_conversations")
                .select("id")
                .eq("id", conversationId)
                .maybeSingle();
              exists = Boolean(data);
            }
            if (!exists) {
              const insertRow = { started_path: startedPath };
              if (conversationId) insertRow.id = conversationId;
              const { data, error } = await supabaseAdmin
                .from("chat_conversations")
                .insert(insertRow)
                .select("id")
                .single();
              if (error) throw error;
              conversationId = data.id;
            }

            const lastUserText = textOf(messages[messages.length - 1]);
            if (lastUserText) {
              const { error } = await supabaseAdmin
                .from("chat_messages")
                .insert({ conversation_id: conversationId, role: "user", content: lastUserText });
              if (error) console.error("chat: failed to save user message", error);
            }
          } catch (err) {
            console.error("chat: persistence disabled for this request", err);
            persist = false;
          }
        }

        const initialRunId = getLovableAiGatewayRunId(request);
        const gateway = createLovableAiGatewayProvider(key, initialRunId);

        const system = [
          `You are the friendly assistant on ${profile.name}'s personal portfolio website.`,
          "Answer visitor questions using ONLY the site information below. Be concise (1-3 short paragraphs max), warm and plain-spoken.",
          "Point people to relevant pages using site paths like /projects or /about when useful.",
          "If you genuinely don't know something, say so and offer to pass the question on.",
          `If the visitor asks to be contacted, wants to speak to ${profile.name} directly, or asks for WhatsApp/phone/email, call the request_contact tool once and then share the WhatsApp link it returns.`,
          "Never invent projects, clients, dates, prices or availability.",
          "",
          "=== SITE INFORMATION ===",
          buildSiteContext(),
        ].join("\n");

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system,
          messages: await convertToModelMessages(messages),
          stopWhen: stepCountIs(50),
          tools: {
            request_contact: tool({
              description:
                "Record that this visitor would like Michael to get in touch, and get a WhatsApp link they can use. Call once when the visitor asks to be contacted.",
              inputSchema: z.object({
                name: z.string().nullable().describe("Visitor's name if given, otherwise null"),
                email: z.string().nullable().describe("Visitor's email if given, otherwise null"),
                topic: z.string().describe("Short summary of what they want to discuss"),
              }),
              execute: async ({ name, email, topic }) => {
                if (persist && conversationId) {
                  try {
                    const { error } = await supabaseAdmin
                      .from("chat_conversations")
                      .update({
                        wants_contact: true,
                        visitor_name: name,
                        visitor_email: email,
                        updated_at: new Date().toISOString(),
                      })
                      .eq("id", conversationId);
                    if (error) console.error("chat: failed to flag contact request", error);
                  } catch (err) {
                    console.error("chat: failed to flag contact request", err);
                  }
                }
                return {
                  whatsappUrl: whatsappLink(
                    `Hi Michael — I was on your website and wanted to ask about: ${topic}`,
                  ),
                  email: profile.email,
                  contactPage: "/contact",
                };
              },
            }),
          },
          onError: ({ error }) => console.error("chat: stream error", error),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          headers: conversationId ? { "X-Conversation-Id": conversationId } : undefined,
          onFinish: async ({ responseMessage }) => {
            if (!persist || !conversationId) return;
            const assistantText = textOf(responseMessage);
            if (!assistantText) return;
            try {
              const { error } = await supabaseAdmin
                .from("chat_messages")
                .insert({
                  conversation_id: conversationId,
                  role: "assistant",
                  content: assistantText,
                });
              if (error) console.error("chat: failed to save assistant message", error);
              await supabaseAdmin
                .from("chat_conversations")
                .update({ updated_at: new Date().toISOString() })
                .eq("id", conversationId);
            } catch (err) {
              console.error("chat: failed to save assistant message", err);
            }
          },
        });
      },
    },
  },
});