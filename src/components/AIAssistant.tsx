// src/components/AIAssistant.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// Solo importamos MessageCircle que es genérico y no falla
import { MessageCircle } from 'lucide-react'

// --- ICONOS SVG (Rápido, liviano y sin errores de build) ---
const FacebookIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const LinkedinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

function RobotModel({ theme, mousePos }: { theme: string | undefined, mousePos: { x: number, y: number } }) {
    const headRef = useRef<THREE.Group>(null);
    const bodyColor = "#f0f0f0";
    const faceColor = "#050505";
    const neonColor = "#22d3ee";

    useFrame(() => {
        if (!headRef.current) return;
        const targetX = (mousePos.x / window.innerWidth) * 2 - 1;
        const targetY = -(mousePos.y / window.innerHeight) * 2 + 1;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX * 0.5, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY * 0.3, 0.1);
    });

    return (
        <group>
            <mesh position={[0, -0.5, 0]}>
                <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={bodyColor} roughness={0.1} metalness={0.2} />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
                <capsuleGeometry args={[0.4, 0.4, 32, 32]} />
                <meshStandardMaterial color={bodyColor} />
            </mesh>
            <group ref={headRef} position={[0, 0.3, 0]}>
                <mesh><sphereGeometry args={[0.55, 32, 32]} /><meshStandardMaterial color={bodyColor} /></mesh>
                <mesh position={[0, 0, 0.2]} scale={[1, 0.8, 0.8]}>
                    <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
                    <meshStandardMaterial color={faceColor} roughness={0} />
                </mesh>
                <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.48, 0.02, 16, 100]} />
                    <meshStandardMaterial color={neonColor} emissive={neonColor} emissiveIntensity={5} />
                </mesh>
                <mesh position={[-0.18, 0.05, 0.53]}>
                    <capsuleGeometry args={[0.04, 0.08, 16, 16]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={10} />
                </mesh>
                <mesh position={[0.18, 0.05, 0.53]}>
                    <capsuleGeometry args={[0.04, 0.08, 16, 16]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={10} />
                </mesh>
            </group>
        </group>
    );
}

export default function AIAssistant() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isTalking, setIsTalking] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setMounted(true)
        setTimeout(() => setIsTalking(true), 2500)
        const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    if (!mounted) return null

    const socialLinks = [
        { name: 'WhatsApp', icon: <MessageCircle size={14} />, url: '#', color: 'bg-green-500' },
        { name: 'Facebook', icon: <FacebookIcon />, url: '#', color: 'bg-blue-600' },
        { name: 'Instagram', icon: <InstagramIcon />, url: '#', color: 'bg-pink-500' },
        { name: 'LinkedIn', icon: <LinkedinIcon />, url: '#', color: 'bg-blue-800' },
    ]

    return (
        <div className="fixed bottom-10 right-10 z-[150] w-[350px] h-[350px] pointer-events-none hidden lg:block">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <RobotModel theme={theme} mousePos={mousePos} />
            </Canvas>

            <AnimatePresence>
                {isTalking && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: -150 }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: -540 }}
                        exit={{ opacity: 0, scale: 0.8, x: "-50%", y: -150 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                        className={`absolute left-1/2 p-6 rounded-3xl backdrop-blur-xl border shadow-2xl pointer-events-auto ${theme === 'dark' ? 'bg-black/90 border-white/10 text-white' : 'bg-white/90 border-black/10 text-black'
                            }`}
                        style={{ width: '320px' }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
                            <span className="text-[9px] font-bold tracking-widest uppercase opacity-60">Corbyte AI</span>
                        </div>

                        <p className="text-[11px] leading-relaxed font-medium mb-4">
                            ¡HOLA! BIENVENIDO. <br />
                            Nuestras redes oficiales son:
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-bold text-white transition-all hover:scale-105 active:scale-95 ${social.color}`}
                                >
                                    {social.icon}
                                    {social.name}
                                </a>
                            ))}
                        </div>

                        <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent ${theme === 'dark' ? 'border-t-black/90' : 'border-t-white/90'
                            }`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}