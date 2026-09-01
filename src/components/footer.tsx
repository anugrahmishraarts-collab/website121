"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-line mt-32">
      <div className="container-gallery py-16 grid gap-12 md:grid-cols-3">
        <div className="flex items-start gap-4">
          <Image
            src="/logo-transparent.png"
            alt="Inquisitive Arts Logo"
            width={56}
            height={56}
            className="h-14 w-auto object-contain shrink-0 mt-0.5"
          />
          <div>
            <p className="font-display text-xl text-paper">Inquisitive Arts</p>
            <p className="font-body text-sm text-muted mt-2 max-w-xs leading-relaxed">
              The studio and gallery of Anugrah Mishra — contemporary painter, London.
            </p>
          </div>
        </div>

        <div className="font-ui text-sm">
          <p className="eyebrow mb-4">Site</p>
          <ul className="space-y-2 text-paper/80">
            <li><Link href="/gallery" className="link-underline">Gallery</Link></li>
            <li><Link href="/about" className="link-underline">About the artist</Link></li>
            <li>
              <a href="/Anugrah-Mishra-Artist-CV.pdf" download className="link-underline">
                Download CV
              </a>
            </li>
            <li><Link href="/journal" className="link-underline">Journal &amp; press</Link></li>
            <li><Link href="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div className="font-ui text-sm">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2 text-paper/80">
            <li>
              <a
                href="https://www.instagram.com/inquisitive_artist_/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.saatchiart.com/anugrahmishra"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Saatchi Art
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-gallery py-6 flex flex-col sm:flex-row gap-2 justify-between font-ui text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Anugrah Mishra. All works reserved.</p>
          <Link href="/admin" className="hover:text-paper transition-colors">
            Studio login
          </Link>
        </div>
      </div>
    </footer>
  );
}
