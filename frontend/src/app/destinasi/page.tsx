import AllDestinationsClient from "@/components/DestinationsListClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getDestinations() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/destinations`);
        if (!res.ok) {
            throw new Error('Failed to fetch destinations');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching destinations:', error);
        return [];
    }
}

export const metadata = {
    title: 'Semua Destinasi Tour | KaltimExplore',
    description: 'Jelajahi berbagai paket wisata dan destinasi terbaik di Kalimantan Timur.',
};

export default async function AllDestinationsPage() {
    const destinations = await getDestinations();

    const items = destinations?.data || destinations || [];

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
                <AllDestinationsClient initialDestinations={items} />
            </div>
            <Footer />
        </main>
    );
}
