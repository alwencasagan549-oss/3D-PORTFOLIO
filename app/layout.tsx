import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alwin Casagan — Full-Stack Developer & System Architect",
  description: "Portfolio of Alwin T. Casagan — Full-stack developer and system architect specializing in React, Next.js, TypeScript, and scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://prod.spline.design" />
      </head>
      <body className="min-h-full flex flex-col bg-black">
        <Analytics />
        <SpeedInsights />
        {children}

        {/* Person microdata — TODO: Replace with actual data */}
        <Script
          id="person-microdata"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              // TODO: Replace with actual full name
              "name": "Alwin T. Casagan",
              // TODO: Replace with actual portfolio URL
              "url": "https://your-portfolio-domain.com",
              "jobTitle": "Full-Stack Developer & System Architect",
              "sameAs": [
                // TODO: Replace with actual LinkedIn handle
                "https://github.com/alwencasagan549-oss",
                "https://linkedin.com/in/your-linkedin-handle",
              ],
              "worksFor": {
                "@type": "Organization",
                // TODO: Replace with actual company or "Freelance"
                "name": "Self-Employed / Freelance",
              },
              "description": "Full-stack developer and system architect specializing in React, Next.js, TypeScript, and scalable web applications.",
            }),
          }}
        />
      </body>
    </html>
  );
}
