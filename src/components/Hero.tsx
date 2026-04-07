// src/components/Hero.tsx
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState, useRef, useMemo } from 'react'

export default function Hero() {
    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme()
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const particles = useMemo(() => {
        return Array.from({ length: 120 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }))
    }, [])

    if (!mounted) return null

    const particleColor = theme === 'dark' ? 'bg-white' : 'bg-black'

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden transition-colors duration-700">

            {/* FONDO INTERACTIVO */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {particles.map((p) => {
                    const pXpx = (p.x / 100) * (containerRef.current?.offsetWidth || 0)
                    const pYpx = (p.y / 100) * (containerRef.current?.offsetHeight || 0)
                    const dx = mousePos.x - pXpx
                    const dy = mousePos.y - pYpx
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const maxDist = 250
                    const push = distance < maxDist ? (1 - distance / maxDist) * 30 : 0
                    const translateX = push * (dx / distance || 0)
                    const translateY = push * (dy / distance || 0)

                    return (
                        <div
                            key={p.id}
                            className={`absolute rounded-full opacity-20 ${particleColor}`}
                            style={{
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                top: `${p.y}%`,
                                left: `${p.x}%`,
                                transform: `translate(${translateX}px, ${translateY}px)`,
                                transition: 'transform 0.2s ease-out',
                            }}
                        />
                    )
                })}
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="z-10 max-w-6xl w-full text-center space-y-16">
                <div className="space-y-6">
                    <p className={`text-[10px] md:text-[11px] font-bold tracking-[0.7em] uppercase transition-colors duration-700 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Engineering Digital Precision
                    </p>
                    <h1 className={`text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85] transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        CORBYTE <br />
                        <span className="font-serif italic font-normal text-cyan-500">SOLUTIONS</span>
                    </h1>
                </div>

                {/* LAS 3 VERTICALES */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-16 border-y border-current/10">
                    <div className="space-y-3 max-w-[200px]">
                        <span className="text-[9px] font-bold opacity-30 tracking-widest">01</span>
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">WEB DESIGN</h3>
                        <p className={`text-[11px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Interfaces vanguardistas con Next.js y performance de élite.
                        </p>
                    </div>
                    <div className="space-y-3 max-w-[200px]">
                        <span className="text-[9px] font-bold opacity-30 tracking-widest">02</span>
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">CUSTOM ERP</h3>
                        <p className={`text-[11px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Sistemas de gestión a medida para optimizar tu operación real.
                        </p>
                    </div>
                    <div className="space-y-3 max-w-[200px]">
                        <span className="text-[9px] font-bold opacity-30 tracking-widest">03</span>
                        <h3 className="text-sm font-bold tracking-[0.2em] uppercase">AUTOMATION</h3>
                        <p className={`text-[11px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Flujos de trabajo autónomos impulsados por IA avanzada.
                        </p>
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <button className={`px-16 py-5 text-[10px] font-bold tracking-[0.4em] uppercase transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl ${theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}>
                        INICIAR PROYECTO
                    </button>
                </div>
            </div>

            <div className={`absolute bottom-10 left-10 text-[10px] font-bold tracking-widest transition-colors duration-700 ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`}>
                PERU / 2026
            </div>
        </section>
    )
}