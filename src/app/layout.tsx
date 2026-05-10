import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import { metadata as siteMetadata } from "./metadata";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { MagneticCursor } from "@/components/magnetic-cursor";
import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased overflow-x-hidden"
      >
        <SmoothScrollProvider>
          <ScrollProgress />
          <MagneticCursor />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
