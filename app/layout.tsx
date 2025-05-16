import "./globals.css";
import type { Metadata } from "next";
import { pixelFont, scriptFont, arabicFont } from "./fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PersonalizationProvider } from "@/components/PersonalizationProvider";
import { ThemeToggleWrapper } from "@/components/ThemeToggleWrapper";

export const metadata: Metadata = {
  title: "Heartbeats",
  description: "A special journey of love and memories for Merah",
  keywords: ["love", "romance", "memories", "UAE University", "biochemistry", "Palestine"],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href={pixelFont.url} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={scriptFont.url} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={arabicFont.url} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body
        className={`${pixelFont.variable} ${scriptFont.variable} ${arabicFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="merah-theme"
          themes={["dark", "pastel"]}
        >
          <PersonalizationProvider>
            <ThemeToggleWrapper />
            {children}
          </PersonalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}