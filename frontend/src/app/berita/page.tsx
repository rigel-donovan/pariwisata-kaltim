import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsListClient from "@/components/NewsListClient";

export const metadata: Metadata = {
    title: "Semua Berita | KaltimExplore",
    description: "Baca semua berita terbaru seputar pariwisata, budaya, dan destinasi Kalimantan Timur.",
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getAllNews() {
    try {
        const res = await fetch(`${API}/api/news`);
        if (!res.ok) return [];
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (data?.data && Array.isArray(data.data)) return data.data;
        return [];
    } catch {
        return [];
    }
}

export default async function BeritaPage() {
    const news = await getAllNews();
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-slate-950">
                {/* Page Hero */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 pt-32 pb-16 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <span className="inline-block text-emerald-400 font-bold text-sm tracking-widest uppercase mb-3">
                            Info Terkini
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                            Berita &amp; <span className="text-emerald-400">Artikel</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            Temukan berita terbaru seputar pariwisata, budaya, dan destinasi menarik di Kalimantan Timur.
                        </p>
                    </div>
                </div>

                {/* News List with Filter */}
                <div className="container mx-auto max-w-7xl px-4 py-12">
                    <NewsListClient initialNews={news} />
                </div>
            </main>
            <Footer />
        </>
    );
}
