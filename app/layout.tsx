import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Local Business Marketing in New England | LocalBig",
    template: "%s | LocalBig",
  },
  description:
    "LocalBig delivers local business marketing and digital marketing for small businesses across New England, including social media marketing, geofencing, Google Maps marketing, and local SEO.",
  keywords: [
    "Local Business Marketing",
    "Digital Marketing for Small Business",
    "Social Media Marketing",
    "Advertising Agency",
    "Geofencing",
    "Google Maps Marketing",
    "Local SEO",
    "New England marketing",
    "Connecticut marketing",
    "Massachusetts marketing",
    "Rhode Island marketing",
    "New Hampshire marketing",
    "Vermont marketing",
    "Maine marketing",
  ],
  applicationName: "LocalBig",
  authors: [{ name: "LocalBig" }],
  creator: "LocalBig",
  publisher: "LocalBig",
  category: "Local Business Marketing",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LocalBig",
    title: "Local Business Marketing in New England",
    description:
      "Local business marketing for New England small businesses. Social media marketing, geofencing, Google Maps marketing, and local SEO that drives calls, foot traffic, and repeat customers.",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary",
    title: "Local Business Marketing in New England",
    description:
      "Local business marketing for New England small businesses. Social media marketing, geofencing, Google Maps marketing, and local SEO that drives calls, foot traffic, and repeat customers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
