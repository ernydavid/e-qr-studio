import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";

const figtreeHeading = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Studio | Generador y Personalizador de QR Premium",
  description:
    "Crea, personaliza y exporta códigos QR vectoriales y de alta resolución.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geist.variable} ${figtreeHeading.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('qr_theme_preference='))
                    ?.split('=')[1];
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
