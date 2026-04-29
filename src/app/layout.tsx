import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic", "normal"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "Happy Birthday",
  description: "A special celebration for a special someone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#070710] text-[#f0ece4] font-jost">
        {children}
      </body>
    </html>
  );
}
