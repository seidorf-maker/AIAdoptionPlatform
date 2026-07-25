import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnRamp — AI adoption for the rest of us",
  description:
    "A role-based AI adoption prototype: sanctioned, job-specific AI training with real, competence-based certification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-card-border px-6 py-6 text-sm text-muted-foreground">
          <div className="mx-auto max-w-3xl">
            OnRamp is a prototype built for a course project — this demo uses
            local sample data only, no accounts or real data are stored.
          </div>
        </footer>
      </body>
    </html>
  );
}
