import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "@vivekkv178/library/dist/style.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import StoreProvider from "@/lib/StoreProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UOB | United Overseas Bank",
  description:
    "Unlock precise access control with United Overseas Bank (UOB) — ensure security and efficiency by assigning permissions based on user roles. Empower your organization with seamless, scalable access management tailored to every user",
  metadataBase: new URL(
    `${process.env.NEXT_PUBLIC_CDN_PATH}/uob/Thumbnail.png`,
  ),
  openGraph: {
    title: "UOB | United Overseas Bank",
    description:
      "Unlock precise access control with United Overseas Bank (UOB) — ensure security and efficiency by assigning permissions based on user roles.",
    url: "https://uob-vivekkv.vercel.app/",
    siteName: "UOB",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_PATH}/uob/Thumbnail.png`, // Must be an absolute URL
        width: 800,
        height: 1000,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_PATH}/uob/Thumbnail.png`, // Must be an absolute URL
        width: 1800,
        height: 2000,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
