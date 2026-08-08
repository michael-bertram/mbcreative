import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { X, MessageCircle } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { profile } from "@/data/portfolio";
import logo from "@/assets/mb-logo-blue.png";


const STORAGE_KEY = "mb-chat-conversation-id";

function getConversationId() {
  if (typeof window === "undefined") return null;
  let id = window.localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

const SUGGESTIONS = [
  "What kind of work does Michael do?",
  "Tell me about the Traqr app",
  "Can Michael get in touch with me?",
];

export function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setConversationId(getConversationId());
  }, []);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages: msgs, body }) => ({
        body: {
          ...body,
          messages: msgs,
          conversationId: getConversationId(),
          path: typeof window !== "undefined" ? window.location.pathname : null,
        },
      }),
    }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open && !busy) textareaRef.current?.focus();
  }, [open, busy, messages.length]);

  const send = (text) => {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    sendMessage({ text: value });
  };

  const renderText = (message) =>
    (message.parts ?? [])
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : `Chat with ${profile.name}'s site assistant`}
        className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-105 motion-safe:animate-[chat-bob_3.2s_ease-in-out_infinite]"
      >
        {!open && (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />
        )}
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform duration-300 group-hover:scale-110">
            <MessageCircle className="h-6 w-6" fill="currentColor" />
            <span className="sr-only">Open chat</span>
          </div>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-[60] flex h-[min(70vh,560px)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <img src={logo} alt="" className="h-8 w-8 object-contain" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">Ask about my work</p>
              <p className="truncate text-xs text-muted-foreground">
                AI assistant — answers from this site
              </p>
            </div>
          </div>

          <Conversation className="flex-1">
            <ConversationContent className="gap-3 p-4">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Hi 👋 — ask me anything about {profile.name}&apos;s projects, background or how
                    to get in touch.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const text = renderText(message);
                if (!text) return null;
                return (
                  <Message from={message.role} key={message.id}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent p-0 text-foreground"
                      }
                    >
                      <MessageResponse>{text}</MessageResponse>
                    </MessageContent>
                  </Message>
                );
              })}

              {status === "submitted" && <Shimmer className="text-sm">Thinking…</Shimmer>}
              {error && (
                <p className="text-sm text-destructive">
                  Something went wrong. Please try again, or email{" "}
                  <a className="underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border p-3">
            <PromptInput
              onSubmit={(_, event) => {
                event.preventDefault();
                send(input);
              }}
            >
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={!input.trim() || busy} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Conversations are saved so {profile.name.split(" ")[0]} can follow up.
            </p>
          </div>
        </div>
      )}
    </>
  );
}