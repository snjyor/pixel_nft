import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Google Analytics ID
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: "Open Source Avatar Library - Free Pixel Art Avatar Generator",
    template: "%s | Open Avatar Library"
  },
  description: "Free and open source pixel art avatar library with customizable characters. Generate unique 8-bit style avatars for your projects, games, and applications. MIT licensed and developer-friendly.",
  keywords: [
    "open source avatar",
    "free avatar library",
    "pixel art avatars",
    "8-bit characters",
    "avatar generator",
    "character library",
    "pixel art library",
    "open source graphics",
    "free character sprites",
    "avatar API",
    "pixel character generator",
    "retro avatars",
    "8-bit avatar maker",
    "open source art",
    "free pixel art",
    "avatar components",
    "character customization",
    "pixel graphics library"
  ],
  authors: [{ name: "snjyor", url: "https://github.com/snjyor/pixel_nft" }],
  creator: "snjyor",
  publisher: "snjyor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pixelnft.top"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pixelnft.top",
    title: "Open Source Avatar Library - Free Pixel Art Characters",
    description: "Free and open source pixel art avatar library. Generate customizable 8-bit characters for your projects. MIT licensed and developer-friendly.",
    siteName: "Open Avatar Library",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Source Avatar Library Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source Avatar Library - Free Pixel Art Characters",
    description: "Free and open source pixel art avatar library with customizable 8-bit characters. MIT licensed for developers!",
    site: "@jinghui30",
    creator: "@jinghui30",
    images: ["/og-image.png"],
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
  category: "Open Source Software",
};

// Global type declarations for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
