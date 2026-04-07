// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Corbyte Solutions | Innovación Tecnológica",
    description: "Expertos en Deep Learning, ERP y Desarrollo Web",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={`${inter.className} bg-slate-950 antialiased`}>
                {children}
            </body>
        </html>
    );
}