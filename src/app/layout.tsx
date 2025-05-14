import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "西湖区智能向善社会创新网络中心",
  description:
    "我们是一个以技术为驱动的非营利组织，致力于通过技术手段动员志愿者，解决重大社会问题。",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
