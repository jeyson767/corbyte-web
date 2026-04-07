// src/components/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon } from 'lucide-react'

export default function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const navLinks = [
        { name: 'INICIO', href: '/' },
        { name: 'NOSOTROS', href: '#proyectos' },
        { name: 'SERVICIOS', href: '#servicios' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 h-20 flex items-center justify-between transition-all duration-500">

            {/* LOGO DINÁMICO (Mantenemos tu lógica: Dark -> Negro, Light -> Blanco) */}
            <div className="w-1/3 flex items-center">
                <Link href="/">
                    <Image
                        src={theme === 'dark' ? '/LogoNegro.png' : '/LogoBlanco.png'}
                        alt="Corbyte Logo"
                        width={125} // Un poco más grande para que luzca
                        height={45}
                        priority
                        className="object-contain"
                    />
                </Link>
            </div>

            {/* 2. ISLA CENTRAL (Tu lógica intacta) */}
            <div className={`hidden md:flex backdrop-blur-md rounded-full px-2 py-1 border transition-all duration-500 ${theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'
                }`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`px-6 py-2 text-[10px] font-bold tracking-[0.2em] transition-colors duration-500 hover:opacity-50 ${theme === 'dark' ? 'text-white' : 'text-black'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* ACCIONES DERECHA */}
            <div className="w-1/3 flex items-center justify-end gap-6">

                {/* BOTÓN TIPO SWITCH MÁS GRANDE (Escalado de 12x6 a 16x8) */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 border outline-none focus:ring-0 ${theme === 'dark' ? 'bg-zinc-800 border-white/20' : 'bg-zinc-200 border-black/10'
                        }`}
                >
                    <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-8 bg-white' : 'translate-x-0 bg-black'
                        }`}>
                        {theme === 'dark' ? (
                            <Sun size={12} className="text-black" />
                        ) : (
                            <Moon size={12} className="text-white" />
                        )}
                    </div>
                </button>

                <Link
                    href="#contacto"
                    className={`hidden md:block text-[10px] font-bold tracking-[0.2em] border-b pb-1 transition-all duration-500 ${theme === 'dark' ? 'text-white border-white' : 'text-black border-black'
                        }`}
                >
                    CONTACT
                </Link>

                {/* Móvil Toggle */}
                <button
                    className={`md:hidden border-none outline-none ${theme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Menú Móvil */}
            {isOpen && (
                <div className={`fixed inset-0 z-[-1] flex flex-col items-center justify-center gap-10 transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-light tracking-tighter"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}