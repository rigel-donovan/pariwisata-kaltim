"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CarouselItem {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    location: string;
    destination?: {
        slug: string;
    };
}

const getImageUrl = (imagePath: string) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=1920&auto=format&fit=crop';
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/storage/${imagePath}`;
};

const defaultSlides: CarouselItem[] = [
    {
        id: 1,
        title: "Pesona Kepulauan Derawan",
        subtitle: "Surga Tersembunyi di Timur Borneo",
        description: "Nikmati keindahan koral, berenang bersama penyu, dan menyelam di laut jernih. Destinasi impian bagi setiap pecinta laut.",
        image: "https://images.unsplash.com/photo-1544480843-0e42a96b7978?q=80&w=1920&auto=format&fit=crop",
        location: "Kabupaten Berau"
    },
    {
        id: 2,
        title: "Danau Labuan Cermin",
        subtitle: "Keajaiban Alam Dua Rasa",
        description: "Saksikan fenomena unik danau dengan air tawar di permukaan dan air asin di dasarnya yang sebening kaca.",
        image: "https://images.unsplash.com/photo-1518331822268-6d24de3bc5dd?q=80&w=1920&auto=format&fit=crop",
        location: "Biduk-Biduk"
    },
    {
        id: 3,
        title: "Desa Budaya Pampang",
        subtitle: "Warisan Leluhur Dayak Kenyah",
        description: "Rasakan kearifan lokal, saksikan tarian tradisional, dan selami kekayaan budaya Suku Dayak.",
        image: "https://images.unsplash.com/photo-1589133464871-2edb95fbb06e?q=80&w=1920&auto=format&fit=crop",
        location: "Samarinda"
    }
];

export default function CarouselHero({ items }: { items: any }) {
    const getArrayItems = () => {
        if (!items) return [];
        if (Array.isArray(items)) return items;
        if (items.value && Array.isArray(items.value)) return items.value;
        if (items.data && Array.isArray(items.data)) return items.data;
        return [];
    };

    const arrayItems = getArrayItems();
    const displayItems = arrayItems.length > 0 ? arrayItems : defaultSlides;

    return (
        <div className="relative w-full h-[90vh] min-h-[600px] bg-slate-900 overflow-hidden group">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                key={displayItems.length}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                loop={true}
                className="w-full h-full"
            >
                {displayItems.map((slide: any) => (
                    <SwiperSlide key={slide.id}>
                        {({ isActive }) => (
                            <div className="relative w-full h-full">
                                {/* Background Image */}
                                <div
                                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ${isActive ? "scale-105" : "scale-100"}`}
                                    style={{ backgroundImage: `url(${getImageUrl(slide.image)})` }}
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30" />

                                {/* Content */}
                                <div className={`absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-4 transition-opacity duration-700 ${isActive ? "opacity-100 delay-300" : "opacity-0 pointer-events-none"}`}>
                                    <div className="container mx-auto">
                                        <div className="max-w-3xl">
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                                transition={{ duration: 0.8 }}
                                            >
                                                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 font-medium text-sm">
                                                    <MapPin className="w-4 h-4" />
                                                    {slide.location}
                                                </div>

                                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                                                    {slide.title}
                                                </h2>
                                                {slide.subtitle && (
                                                    <h3 className="text-xl md:text-2xl text-emerald-400 font-medium mb-6">
                                                        {slide.subtitle}
                                                    </h3>
                                                )}
                                                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                                                    {slide.description}
                                                </p>

                                                <Link href={slide.destination ? `/destinasi/${slide.destination.slug}` : '#'} className="inline-flex px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full items-center gap-3 transition-all group/btn">
                                                    Jelajahi Sekarang
                                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}

                {/* Custom Navigation */}
                <div className="container mx-auto absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-4 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="swiper-button-prev-custom w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 pointer-events-auto transition-all transition-transform hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button className="swiper-button-next-custom w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 pointer-events-auto transition-all transition-transform hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>
            </Swiper>

            {/* Styles overrides for swiper pagination */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .swiper-pagination-bullet { background: rgba(255,255,255,0.5); opacity: 1; }
        .swiper-pagination-bullet-active { background: #10b981; width: 24px; border-radius: 8px; }
      `}} />
        </div>
    );
}
