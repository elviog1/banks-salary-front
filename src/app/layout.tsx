import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Salary",
  description: "Aplicación para gestionar tus ingresos y gastos con tarjetas.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico", 
  },
  openGraph: {
    title: "My Salary",
    description: "Gestiona tus ingresos y gastos fácilmente.",
    url: "https://banks-salary-front.vercel.app", // cámbialo por tu dominio real
    siteName: "My Salary",
    images: [
      {
        url: "/mysalary.png", // imagen que se muestra en redes sociales
        width: 1200,
        height: 630,
        alt: "Vista previa de My Salary",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Salary",
    description: "Gestiona tus ingresos y gastos fácilmente.",
    images: ["/mysalary.png"],
    creator: "@elviog1", // si tienes Twitter/X
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
