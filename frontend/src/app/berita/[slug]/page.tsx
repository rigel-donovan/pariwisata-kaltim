import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ShareButton from "@/components/ShareButton";

interface NewsDetail {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    excerpt: string;
    content: string;
    author: string;
    published_at: string;
    is_published: boolean;
}

interface SidebarNews {
    id: number;
    title: string;
    slug: string;
    image: string;
    published_at: string;
    category: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API}/storage/${imagePath}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
};

const estimateReadTime = (content: string) => {
    const words = content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(words / 200));
};

async function getNewsDetail(slug: string): Promise<NewsDetail | null> {
    try {
        const res = await fetch(`${API}/api/news/${slug}`);
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

async function getAllNews(): Promise<SidebarNews[]> {
    try {
        const res = await fetch(`${API}/api/news`);
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export async function generateStaticParams() {
    try {
        const res = await fetch(`${API}/api/news`);
        if (!res.ok) return [];
        const news = await res.json();
        const items = news.data || news || [];
        return items.map((n: any) => ({
            slug: n.slug?.toString() || "",
        }));
    } catch (e) {
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const news = await getNewsDetail(slug);
    if (!news) return { title: "Berita Tidak Ditemukan" };
    return {
        title: `${news.title} | KaltimExplore`,
        description: news.excerpt,
        openGraph: {
            title: news.title,
            description: news.excerpt,
            images: [getImageUrl(news.image)],
        },
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [news, allNews] = await Promise.all([getNewsDetail(slug), getAllNews()]);

    if (!news) notFound();

    const relatedNews = allNews
        .filter((n) => n.slug !== slug)
        .slice(0, 3);
    const sidebarNews = allNews
        .filter((n) => n.slug !== slug)
        .slice(0, 5);

    const currentIndex = allNews.findIndex((n) => n.slug === slug);
    const prevNews = currentIndex > 0 ? allNews[currentIndex - 1] : null;
    const nextNews = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;

    const uniqueCategories = Array.from(
        new Set(allNews.map((n) => n.category).filter(Boolean))
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">

                {/* Hero Banner */}
                <div className="relative h-[480px] md:h-[560px] overflow-hidden">
                    <img
                        src={getImageUrl(news.image)}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                        <div className="container mx-auto max-w-4xl">
                            {news.category && (
                                <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                                    {news.category}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 max-w-3xl">
                                {news.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-300 text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                                        {news.author?.charAt(0)?.toUpperCase() || "A"}
                                    </div>
                                    <span className="font-medium text-white">{news.author || "KaltimExplore"}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-emerald-400" />
                                    {formatDate(news.published_at)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="text-emerald-400">⏱</span>
                                    {estimateReadTime(news.content)} menit baca
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="container mx-auto max-w-7xl px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Main Article */}
                        <article className="flex-1 min-w-0">

                            {/* Excerpt Callout */}
                            {news.excerpt && (
                                <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 mb-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-r-xl">
                                    <p className="text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                        {news.excerpt}
                                    </p>
                                </blockquote>
                            )}

                            {/* Article Content */}
                            {news.content ? (
                                <div
                                    className="prose prose-lg prose-slate dark:prose-invert max-w-none
                                        prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white
                                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                                        prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6
                                        prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                                        prose-img:rounded-2xl prose-img:shadow-xl
                                        prose-blockquote:border-l-emerald-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900
                                        prose-blockquote:rounded-r-xl prose-blockquote:py-2
                                        prose-strong:text-slate-900 dark:prose-strong:text-white
                                        prose-ul:text-slate-600 dark:prose-ul:text-slate-400
                                        prose-ol:text-slate-600 dark:prose-ol:text-slate-400"
                                    dangerouslySetInnerHTML={{ __html: news.content }}
                                />
                            ) : (
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                    {news.excerpt}
                                </p>
                            )}

                            {/* Tags & Share */}
                            <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Tag className="w-4 h-4 text-slate-400" />
                                    {news.category && (
                                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm rounded-full font-medium">
                                            {news.category}
                                        </span>
                                    )}
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-full font-medium">
                                        Kalimantan Timur
                                    </span>
                                </div>
                                <ShareButton title={news.title} />
                            </div>

                            {/* Author Card */}
                            <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-2xl shrink-0">
                                    {news.author?.charAt(0)?.toUpperCase() || "A"}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ditulis oleh</p>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{news.author || "Tim KaltimExplore"}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Kontributor konten perjalanan & pariwisata Kalimantan Timur di KaltimExplore.
                                    </p>
                                </div>
                            </div>

                            {/* Prev / Next Navigation */}
                            {(prevNews || nextNews) && (
                                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {prevNews ? (
                                        <Link href={`/berita/${prevNews.slug}`} className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                                <span>Sebelumnya</span>
                                            </div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {prevNews.title}
                                            </p>
                                        </Link>
                                    ) : <div />}
                                    {nextNews ? (
                                        <Link href={`/berita/${nextNews.slug}`} className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors text-right">
                                            <div className="flex items-center justify-end gap-2 text-sm text-slate-500 mb-2">
                                                <span>Selanjutnya</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            <p className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {nextNews.title}
                                            </p>
                                        </Link>
                                    ) : <div />}
                                </div>
                            )}
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:w-80 shrink-0 space-y-8">

                            {/* Back Button */}
                            <Link
                                href="/#berita"
                                className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Berita
                            </Link>

                            {/* Recent Posts */}
                            {sidebarNews.length > 0 && (
                                <div>
                                    <h3 className="text-base font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
                                        Berita Terbaru
                                    </h3>
                                    <div className="space-y-4">
                                        {sidebarNews.map((item) => (
                                            <Link key={item.id} href={`/berita/${item.slug}`} className="group flex gap-3 items-start">
                                                <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                                                    <img
                                                        src={getImageUrl(item.image)}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                                                        {formatDate(item.published_at)}
                                                    </p>
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                                                        {item.title}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category Badge */}
                            <div>
                                <h3 className="text-base font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
                                    Kategori
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {uniqueCategories.length > 0 ? (
                                        uniqueCategories.map((cat) => (
                                            <span key={cat} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 text-sm font-medium rounded-full cursor-pointer transition-colors">
                                                {cat}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-400">Belum ada kategori.</p>
                                    )}
                                </div>
                            </div>

                        </aside>
                    </div>

                    {/* Related Articles */}
                    {relatedNews.length > 0 && (
                        <section className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="w-1.5 h-7 bg-emerald-500 rounded-full inline-block" />
                                Artikel Terkait
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedNews.map((item) => (
                                    <Link key={item.id} href={`/berita/${item.slug}`} className="group bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={getImageUrl(item.image)}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            {item.category && (
                                                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 block">
                                                    {item.category}
                                                </span>
                                            )}
                                            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(item.published_at)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

            </main>
            <Footer />
        </>
    );
}
