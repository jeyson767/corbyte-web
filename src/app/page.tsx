// src/app/page.tsx
import { supabase } from '@/lib/supabase'
import ProjectCard from '@/components/ProjectCard'
import ContactForm from '@/components/ContactForm'

export default async function Home() {
    // Traemos los proyectos desde Supabase
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8 pb-24">
            {/* Header / Hero Section */}
            <header className="max-w-5xl mx-auto mb-24 mt-12 text-center">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-400 uppercase bg-blue-900/30 border border-blue-800 rounded-full">
                    Soluciones Tecnológicas de Próxima Generación
                </div>
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    Corbyte Solutions
                </h1>
                <p className="mt-6 text-slate-400 text-xl max-w-2xl mx-auto">
                    Especialistas en desarrollo de sistemas **ERP**, **Deep Learning** y modernización de infraestructura digital para la industria.
                </p>
            </header>

            {/* Sección de Proyectos */}
            <section className="max-w-5xl mx-auto mb-24">
                <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-4">
                    <h2 className="text-3xl font-bold text-white">Proyectos Destacados</h2>
                    <span className="text-slate-500 text-sm font-mono">/portafolio</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            tags={project.tech_stack || []}
                        />
                    ))}

                    {(!projects || projects.length === 0) && (
                        <div className="col-span-full p-12 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                            <p className="text-slate-500 italic">No hay proyectos para mostrar todavía. ¡Es hora de cargar algunos en Supabase!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Sección de Captación / Formulario */}
            <section className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start bg-slate-900/50 p-8 md:p-12 rounded-3xl border border-slate-800">
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-white">¿Listo para escalar tu negocio?</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Ya sea que necesites un sistema de gestión a medida o implementar visión artificial en tus procesos, en Corbyte tenemos la solución.
                    </p>
                    <ul className="space-y-4">
                        {[
                            'Consultoría técnica personalizada',
                            'Desarrollo ágil con Next.js y Supabase',
                            'Integración de modelos de Inteligencia Artificial',
                            'Soporte y migración de bases de datos'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <span className="text-emerald-400">✔</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* El componente del formulario que creamos */}
                <div className="w-full">
                    <ContactForm />
                </div>
            </section>

            {/* Footer sencillo */}
            <footer className="max-w-5xl mx-auto mt-32 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
                © {new Date().getFullYear()} Corbyte SSolutions. Todos los derechos reservados.
            </footer>
        </main>
    )
}