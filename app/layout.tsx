import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
// import WebinarPopup from "@/components/WebinarPopup/WebinarPopup"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: "--font-poppins",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devops-community.com"),
  title: "Quantum Vector from TheDevOpsCommunity",
  description: "Master Your DevOps Career with Quantum Vector",
  icons: {
    icon: '/Logo/LOGO_ICON_PNG_FORMAT.png',
  },
  openGraph: {
    title: "Quantum Vector from TheDevOpsCommunity",
    description: "Master Your DevOps Career with Quantum Vector",
    siteName: "Quantum Vector",
    locale: "en_US",
    type: "website",
    url: "https://devops-community.com",
    images: [
      {
        url: "/blue.png",
        width: 1536,
        height: 1024,
        alt: "Quantum Vector - Master Your DevOps Career",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devops-community",
    creator: "@devops-community",
    title: "Quantum Vector from TheDevOpsCommunity",
    description: "Master Your DevOps Career with Quantum Vector",
    images: ["/blue.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="preconnect" href="https://app.cal.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://app.cal.com" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${poppins.variable} ${outfit.variable} ${poppins.className} min-h-screen antialiased`}>
        <Analytics />
        <main className="w-full min-h-screen">
          {children}
        </main>
        {/* WebinarPopup disabled as there is no upcoming webinar */}
      </body>
    </html>
  );
}
