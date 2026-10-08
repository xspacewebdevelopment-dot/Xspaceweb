import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xspaceweb.com"),
  title: "XSPACEWEB — Building Digital Experiences Beyond Boundaries",
  description:
    "XSPACEWEB is an Indian technology company focused on building innovative SaaS products and delivering end-to-end digital solutions.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/logos/logo-icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "XSPACEWEB — Building Digital Experiences Beyond Boundaries",
    description:
      "XSPACEWEB is an Indian technology company focused on building innovative SaaS products and delivering end-to-end digital solutions.",
    url: "https://xspaceweb.com",
    siteName: "XSPACEWEB",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XSPACEWEB — Building Digital Experiences Beyond Boundaries",
      },
      {
        url: "/logos/logo-icon.png",
        width: 332,
        height: 332,
        alt: "XSPACEWEB Blue X Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XSPACEWEB — Building Digital Experiences Beyond Boundaries",
    description:
      "XSPACEWEB is an Indian technology company focused on building innovative SaaS products and delivering end-to-end digital solutions.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${caveat.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-[#0A1128] font-sans antialiased selection:bg-[#1668E8] selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
