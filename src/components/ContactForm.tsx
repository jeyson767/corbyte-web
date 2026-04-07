'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            interest: formData.get('interest'),
            message: formData.get('message'),
        }

        const { error } = await supabase.from('leads').insert([data])

        if (!error) {
            setSubmitted(true)
        } else {
            alert("Error al enviar: " + error.message)
        }
        setLoading(false)
    }

    if (submitted) return (
        <div className="p-8 text-center bg-green-900/20 border border-green-500 rounded-xl">
            <h3 className="text-2xl font-bold text-green-400">¡Recibido! 🚀</h3>
            <p className="text-slate-300 mt-2">El equipo de Corbyte Solutions se pondrá en contacto contigo pronto.</p>
        </div>
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">¿Tienes un proyecto en mente?</h2>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Nombre Completo</label>
                <input name="full_name" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jeyson..." />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Correo Electrónico</label>
                <input name="email" type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="tu@email.com" />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Interés Principal</label>
                <select name="interest" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Desarrollo Web / Next.js</option>
                    <option>Deep Learning / Visión Artificial</option>
                    <option>Sistemas ERP / Bases de Datos</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Mensaje (Opcional)</label>
                <textarea name="message" rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cuéntanos sobre tu idea..."></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
                {loading ? 'Enviando...' : 'Solicitar Información'}
            </button>
        </form>
    )
}