import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { Header } from "@/components/sections/Header";
import { QuoteEstimatorModal } from "@/components/modals/QuoteEstimatorModal";
import { LightboxModal } from "@/components/modals/LightboxModal";
import { WelcomeGuideModal } from "@/components/modals/WelcomeGuideModal";
import { Toast } from "@/components/ui/Toast";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { JsonLdSchema } from "@/components/seo/JsonLdSchema";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edenandblooms.com"),
  title: {
    default: "Eden & Blooms | Affordable & Thoughtful Event Decor",
    template: "%s | Eden & Blooms",
  },
  description:
    "Eden & Blooms - Custom U-shaped ring setups, balloon & floral arches, and custom flex print backdrops for weddings, birthdays, and special events.",
  keywords: [
    "Event Decor",
    "Stage Decoration",
    "Wedding Decoration",
    "Birthday Decoration",
    "Floral Arches",
    "Balloon Arches",
    "Eden and Blooms",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eden & Blooms | Affordable & Thoughtful Event Decor",
    description:
      "Custom U-shaped ring setups, balloon & floral arches, and personalized backdrops for your special celebrations.",
    url: "https://edenandblooms.com",
    siteName: "Eden & Blooms",
    images: [
      {
        url: "/assets/hero_u_ring.jpg",
        width: 1200,
        height: 630,
        alt: "Eden & Blooms Event Decor",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eden & Blooms | Event Decor",
    description:
      "Affordable and thoughtful event decor for weddings, birthdays, and celebrations.",
    images: ["/assets/hero_u_ring.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google4cc067c06a10baab",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <head>
        <JsonLdSchema />
      </head>
      <body className="bg-brand-base text-brand-text-main font-body antialiased">
        <GoogleAnalytics />
        <ModalProvider>
          <SmoothScrollProvider>
            <Header />
            {children}
            <WelcomeGuideModal />
            <QuoteEstimatorModal />
            <LightboxModal />
            <Toast />
            <WhatsAppFab />
          </SmoothScrollProvider>
        </ModalProvider>
      </body>
    </html>
  );
}

