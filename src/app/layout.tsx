import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Providers } from "./providers";

const font = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fake User Records",
  description: "Generate fake user records for anything you want.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
