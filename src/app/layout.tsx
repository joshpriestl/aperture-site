import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aperture - Operational Intelligence",
  description:
    "Aperture is an AI-native operational intelligence platform for professional service firms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
