import type { Metadata } from "next";
import { Halant, Newsreader, Work_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { MotionProvider } from "@/components/motion-provider";

const halant = Halant({
  variable: "--font-halant",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inquisitivearts.com"),
  title: {
    default: "Inquisitive Arts — Anugrah Mishra, Contemporary Painter",
    template: "%s — Inquisitive Arts",
  },
  description:
    "The studio and gallery of Anugrah Mishra, a London-based contemporary painter exploring displacement, memory and stillness. Winner of the Freelands Painting Prize 2024.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icon.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    title: "Inquisitive Arts — Anugrah Mishra",
    description: "The studio and gallery of Anugrah Mishra, a London-based contemporary painter.",
    images: [{ url: "/logo-original.png", width: 898, height: 1024, alt: "Inquisitive Arts Logo" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${halant.variable} ${newsreader.variable} ${workSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <MotionProvider>
          <ScrollProgress />
          <div className="grain" />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
