import type { Metadata } from "next";
import { Caveat, Inter, Outfit, Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
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
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <head>
        {/* Preload critical mobile & desktop hero LCP images */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/women-mobile.webp"
          type="image/webp"
          media="(max-width: 640px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/women.webp"
          type="image/webp"
          media="(min-width: 641px)"
          fetchPriority="high"
        />
        {/* DNS prefetch & preconnect for remote image origins */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#0A1128] font-sans antialiased selection:bg-[#1668E8] selection:text-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
