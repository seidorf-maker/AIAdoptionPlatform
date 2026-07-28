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

const title = "OnRamp — AI adoption for the rest of us";
const description =
  "A role-based AI adoption platform: sanctioned, job-specific AI training with real, competence-based certification — not another completion badge.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
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
            This is a demo environment — screens are seeded with sample data
            so you can explore the full product experience. No real accounts
            or company data are used here.
          </div>
        </footer>
      </body>
    </html>
  );
}
