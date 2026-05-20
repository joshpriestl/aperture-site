import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aperture - Operational Intelligence",
  description:
    "Aperture is a productized operations firm for scaling consultancies, agencies, advisory firms and hospitality groups. Free diagnostic Audit. Strategic Blueprint. Done-for-you implementation.",
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
