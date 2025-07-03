import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from './(main)/layout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tiêm Chủng | Dịch vụ tiêm chủng hàng đầu",
    template: "%s | Tiêm Chủng",
  },
  description: "Hệ thống tiêm chủng hiện đại, an toàn và tiện lợi. Đặt lịch online, tư vấn miễn phí từ đội ngũ bác sĩ chuyên nghiệp.",
  keywords: ["tiêm chủng", "vắc xin", "sức khỏe", "y tế", "tiêm phòng"],
  authors: [{ name: "Your Organization" }],
  themeColor: "#06b6d4", 
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://tiemchung.vn",
    siteName: "Tiêm Chủng",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tiêm Chủng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiêm Chủng",
    description: "Dịch vụ tiêm chủng hàng đầu",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}
      </body>
    </html>
  );
}
