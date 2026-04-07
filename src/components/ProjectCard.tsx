// src/components/ProjectCard.tsx
export default function ProjectCard({ title, description, tags }: { title: string, description: string, tags: string[] }) {
    return (
        <div className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-blue-500 transition-all">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 mb-4">{description}</p>
            <div className="flex gap-2">
                {tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-blue-900/30 text-blue-400 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}