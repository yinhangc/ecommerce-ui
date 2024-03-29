import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import Providers from "./_redux/providers";
import Sidebars from "./_components/sidebar/sidebars";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emi Coffee",
  description: "Ecommerce project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.className} relative`}>
          <Header />
          <Sidebars />
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}
