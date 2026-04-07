// src/app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant"; // Importamos el robot
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.className} bg-white dark:bg-black transition-colors duration-500`}>
                <ThemeProvider>
                    {/* El Navbar se mantiene arriba */}
                    <Navbar />

                    {/* El Robot asistente que te sigue por toda la web */}
                    <AIAssistant />

                    {/* El contenido de tus páginas (Hero, Proyectos, etc.) */}
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}