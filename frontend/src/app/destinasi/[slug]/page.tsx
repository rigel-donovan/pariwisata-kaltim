import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DestinationDetailClient from "@/components/DestinationDetailClient";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getDestination(slug: string) {
    try {
        const res = await fetch(`${API}/api/destinations/${slug}`);
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

async function getRelatedDestinations(currentSlug: string) {
    try {
        const res = await fetch(`${API}/api/destinations`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.filter((d: any) => d.slug?.toString() !== currentSlug).slice(0, 3);
    } catch {
        return [];
    }
}

export async function generateStaticParams() {
    try {
        const res = await fetch(`${API}/api/destinations`);
        if (!res.ok) return [];
        const destinations = await res.json();
        const items = destinations.data || destinations || [];
        return items.map((d: any) => ({
            slug: d.slug?.toString() || "",
        }));
    } catch (e) {
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const destination = await getDestination(resolvedParams.slug);

    if (!destination) {
        return {
            title: "Destinasi Tidak Ditemukan - KaltimExplore",
        };
    }

    return {
        title: `${destination.name} - KaltimExplore`,
        description: destination.short_description || "Jelajahi surga tersembunyi di Kalimantan Timur.",
    };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const destination = await getDestination(resolvedParams.slug);

    if (!destination) {
        notFound();
    }

    const related = await getRelatedDestinations(resolvedParams.slug);

    return (
        <main className="min-h-screen flex flex-col pt-16 lg:pt-20">
            <Navbar />
            <div className="flex-1">
                <DestinationDetailClient destination={destination} related={related} />
            </div>
            <Footer />
        </main>
    );
}
