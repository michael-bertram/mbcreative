import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolio";
import logo from "@/assets/mb-logo-blue.png";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Work" },
    { to: "/resources", label: "Resources" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300", 
            scrolled ? "h-16 bg-background/80 backdrop-blur-md border-b" : "h-20 bg-transparent"
        )}>
            <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-12 w-15 object-contain"/>
                </Link>

                {/* Morphing Desktop/Mobile Menu */}
                <div className="flex items-center">
                    <nav className={cn(
                        "flex items-center gap-3 rounded-full border border-border bg-background/50 px-2 shadow-sm transition-all duration-500 ease-in-out",
                        open ? "max-w-[600px] px-3 py-1 opacity-100" : "max-w-[44px] overflow-hidden"
                    )}>
                        
                        {/* The Trigger Icon */}
                        <button 
                            onClick={() => setOpen(!open)}
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary",
                                open ? "bg-secondary" : "bg-transparent hover:bg-secondary"
                            )}
                        >
                            {open ? <X className=" ml-0 h-4 w-4" /> : <Search className="ml-1 h-4 w-4" />}
                        </button>

                        {/* Sliding Links Container */}
                        <div className={cn(
                            "flex items-center gap-1 transition-all duration-1500 ease-in-out",
                            open ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"
                        )}>
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.to} 
                                    to={link.to} 
                                    activeOptions={{ exact: link.to === "/" }}
                                    onClick={() => setOpen(false)}
                                    className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}