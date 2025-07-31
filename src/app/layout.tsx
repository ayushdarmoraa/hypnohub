import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindReboot Lab - Transform Your Mind with Hypnotherapy",
  description: "Professional hypnotherapy platform offering personalized audio sessions, guided programs, and expert therapist consultations for anxiety, stress, confidence, and personal growth.",
  keywords: "hypnotherapy, meditation, anxiety relief, stress management, confidence building, personal development, mental health",
  authors: [{ name: "MindReboot Lab" }],
  openGraph: {
    title: "MindReboot Lab - Transform Your Mind with Hypnotherapy",
    description: "Professional hypnotherapy platform for personal transformation and mental wellness.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindReboot Lab - Transform Your Mind with Hypnotherapy",
    description: "Professional hypnotherapy platform for personal transformation and mental wellness.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <AuthProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

