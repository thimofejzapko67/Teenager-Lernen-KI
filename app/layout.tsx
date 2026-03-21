import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://clawacademy.de";

export const metadata: Metadata = {
  title: {
    default: "ClawAcademy - Lerne KI-Entwicklung. Werde sponsored.",
    template: "%s | ClawAcademy",
  },
  description:
    "Die KI-Lernplattform für Teenager (13-19 Jahre). Lerne programmieren, baue KI-Apps, spiele Challenges und werde von Tech-Companies sponsored. Kostenlos.",
  keywords: [
    "KI lernen",
    "AI für Teenager",
    "Programmieren lernen",
    "Python für Anfänger",
    "JavaScript lernen",
    "Künstliche Intelligenz",
    "Coding für Jugendliche",
    "Tech Ausbildung",
    "Sponsorship Programm",
  ],
  authors: [{ name: "ClawAcademy", url: baseUrl }],
  creator: "ClawAcademy",
  publisher: "ClawAcademy",
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
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: baseUrl,
    title: "ClawAcademy - Lerne KI-Entwicklung. Werde sponsored.",
    description:
      "Die KI-Lernplattform für Teenager. Lerne programmieren, baue KI-Apps und werde sponsored.",
    siteName: "ClawAcademy",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ClawAcademy - KI-Lernen für Teenager",
      },
      {
        url: `${baseUrl}/og-image-square.png`,
        width: 1200,
        height: 1200,
        alt: "ClawAcademy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawAcademy - Lerne KI-Entwicklung. Werde sponsored.",
    description:
      "Die KI-Lernplattform für Teenager. Lerne programmieren, baue KI-Apps und werde sponsored.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@clawacademy",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
