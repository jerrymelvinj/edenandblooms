import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { Header } from "@/components/sections/Header";
import { QuoteEstimatorModal } from "@/components/modals/QuoteEstimatorModal";
import { LightboxModal } from "@/components/modals/LightboxModal";
import { Toast } from "@/components/ui/Toast";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";

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
  title: "Eden & Blooms | Affordable & Thoughtful Event Decor",
  description:
    "Eden & Blooms - Custom U-shaped ring setups, balloon & floral arches, and custom flex print backdrops for weddings, birthdays, and special events.",
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
      <body className="bg-brand-base text-brand-text-main font-body antialiased">
        <ModalProvider>
          <SmoothScrollProvider>
            <Header />
            {children}
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
