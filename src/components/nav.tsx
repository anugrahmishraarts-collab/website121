"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-colors duration-500",
        scrolled || open ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      )}
    >
      <nav className="container-gallery flex items-center justify-between h-20">
        <Link href="/" className="font-display text-lg tracking-tight text-paper">
          Inquisitive Arts
          <span className="block font-ui text-[10px] tracking-[0.2em] uppercase text-muted mt-0.5">
            Anugrah Mishra
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 font-ui text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "link-underline pb-0.5 transition-colors",
                  pathname === link.href ? "text-ember-bright" : "text-paper/85 hover:text-paper"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden text-paper p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-line bg-ink"
          >
            {LINKS.map((link) => (
              <li key={link.href} className="border-b border-line/60">
                <Link
                  href={link.href}
                  className="block px-6 py-4 font-ui text-base text-paper/90"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
