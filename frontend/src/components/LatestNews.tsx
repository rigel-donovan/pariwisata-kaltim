import { Calendar, ArrowRight, User } from "lucide-react";
import Link from "next/link";

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    author: string;
    image: string;
    category: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API}/storage/${imagePath}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
};


export default function LatestNews({ items }: { items: any }) {
    const getArrayItems = () => {
        if (!items) return [];
        if (Array.isArray(items)) return items;
        if (items.value && Array.isArray(items.value)) return items.value;
        if (items.data && Array.isArray(items.data)) return items.data;
        return [];
    };

    const arrayItems = getArrayItems();
    const displayItems = arrayItems.length > 0 ? arrayItems : [];

    return (
        <section id="berita" className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Info Terkini
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                            Berita & Pengumuman <br className="hidden md:block" /> Pariwisata Kalimantan Timur
                        </h2>
                    </div>
                    <Link href="/berita" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                        Lihat Semua Berita
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayItems.map((news: NewsItem) => (
                        <Link
                            key={news.id}
                            href={`/berita/${news.slug}`}
                            className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 border border-slate-100 dark:border-slate-800 block"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={getImageUrl(news.image)}
                                    alt={news.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {news.category && (
                                    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        {news.category}
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                        {formatDate(news.published_at)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-emerald-500" />
                                        {news.author}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {news.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {news.excerpt}
                                </p>

                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 group/btn">
                                    Baca Selengkapnya
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
