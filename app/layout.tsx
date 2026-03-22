import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeLift - Lerne KI-Entwicklung. Werde sponsored.",
  description: "Die KI-Lernplattform für Teenager. Lerne programmieren, baue KI-Apps und werde gesponsert.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
