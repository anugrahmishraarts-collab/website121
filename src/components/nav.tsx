"use client";

import Link from "next/link";
import Image from "next/image";
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
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-[background-color,border-color] duration-500",
        scrolled || open ? "glass border-b" : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container-gallery flex items-center justify-between h-20">
        <Link
          href="/"
          transitionTypes={pathname === "/" ? [] : ["nav-back"]}
          className="group flex items-center gap-3 font-display text-lg tracking-tight text-paper"
        >
          <Image
            src="/logo-transparent.png"
            alt="Inquisitive Arts Logo"
            width={48}
            height={48}
            className="h-11 w-auto object-contain transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:scale-105"
            priority
          />
          <div>
            <span className="block font-display text-lg leading-tight tracking-tight text-paper transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-[1px]">
              Inquisitive Arts
            </span>
            <span className="block font-ui text-[10px] tracking-[0.2em] uppercase text-muted mt-0.5">
              Anugrah Mishra
            </span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-2 font-ui text-sm">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  transitionTypes={["nav-forward"]}
                  className={cn(
                    "relative z-10 block px-4 py-2 transition-colors",
                    active ? "text-ember-bright" : "text-paper/80 hover:text-paper"
                  )}
                >
                  {link.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-ember/10 border border-ember/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
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
            className="md:hidden overflow-hidden border-t border-line glass"
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
