import { Instagram, Twitter, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";

export interface SocialMediaItem {
    id: number;
    platform: string;
    url: string;
    icon: string;
}

interface FooterSettings {
    [key: string]: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getSocialMedia() {
    try {
        const res = await fetch(`${API}/api/social-media`, { next: { revalidate: 30 } });
        if (!res.ok) return [];
        return res.json() as Promise<SocialMediaItem[]>;
    } catch (e) {
        return [];
    }
}

async function getFooterSettings(): Promise<FooterSettings> {
    try {
        const res = await fetch(`${API}/api/footer-settings`, { next: { revalidate: 30 } });
        if (!res.ok) return {};
        return res.json() as Promise<FooterSettings>;
    } catch (e) {
        return {};
    }
}

function parseLinks(settings: FooterSettings, prefix: string): { label: string; url: string }[] {
    const links: { label: string; url: string }[] = [];
    for (let i = 1; i <= 10; i++) {
        const val = settings[`${prefix}_link_${i}`];
        if (!val) break;
        const [label, url] = val.split("|");
        links.push({ label: label || "", url: url || "#" });
    }
    return links;
}

export default async function Footer() {
    const [socialMedia, settings] = await Promise.all([
        getSocialMedia(),
        getFooterSettings(),
    ]);

    const IconMap: Record<string, any> = {
        'instagram': Instagram,
        'twitter': Twitter,
        'facebook': Facebook,
        'youtube': Youtube,
    };

    // Parse settings with fallbacks
    const brandName = settings.brand_name || "KaltimExplore";
    const brandHighlight = settings.brand_highlight || "Explore";
    const brandPrefix = brandName.replace(brandHighlight, "");
    const brandTagline = settings.brand_tagline || "Membangun koneksi antara pelancong dengan pesona autentik alam dan budaya Kalimantan Timur, Indonesia.";
    const address = settings.address || "Jl. APT Pranoto No.88, Samarinda, Kalimantan Timur 75116";
    const phone = settings.phone || "+62 811 555 1234";
    const email = settings.email || "halo@kaltimexplore.id";
    const copyrightText = settings.copyright_text || "Kaltim Explore Tour & Travel. All rights reserved.";
    const copyrightTagline = settings.copyright_tagline || "Dibuat dengan ♥ di Borneo";

    const navLinks = parseLinks(settings, "nav");
    const supportLinks = parseLinks(settings, "support");

    // Fallback navigation links
    const defaultNavLinks = [
        { label: "Tentang Kami", url: "#" },
        { label: "Destinasi Populer", url: "#destinasi" },
        { label: "Paket Wisata", url: "#" },
        { label: "Blog & Artikel", url: "#berita" },
        { label: "Galeri Kaltim", url: "#" },
    ];

    const defaultSupportLinks = [
        { label: "FAQ", url: "#" },
        { label: "Syarat & Ketentuan", url: "#" },
        { label: "Kebijakan Privasi", url: "#" },
        { label: "Panduan Wisatawan", url: "#" },
    ];

    const displayNavLinks = navLinks.length > 0 ? navLinks : defaultNavLinks;
    const displaySupportLinks = supportLinks.length > 0 ? supportLinks : defaultSupportLinks;

    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black text-white tracking-tighter">
                            {brandPrefix}<span className="text-emerald-500">{brandHighlight}</span>
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            {brandTagline}
                        </p>
                        <div className="flex gap-4 pt-4">
                            {socialMedia.map((social) => {
                                const IconComponent = IconMap[social.icon?.toLowerCase()] || MapPin;
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
                                        title={social.platform}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                    </a>
                                );
                            })}

                            {/* Fallback dummy if DB empty */}
                            {socialMedia.length === 0 && (
                                <>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6">Navigasi</h4>
                        <ul className="space-y-3 text-sm">
                            {displayNavLinks.map((link, i) => (
                                <li key={i}><a href={link.url} className="hover:text-emerald-400 transition-colors">{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6">Pusat Bantuan</h4>
                        <ul className="space-y-3 text-sm">
                            {displaySupportLinks.map((link, i) => (
                                <li key={i}><a href={link.url} className="hover:text-emerald-400 transition-colors">{link.label}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-slate-400">{address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-slate-400">{phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span className="text-slate-400">{email}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} {copyrightText}</p>
                    <p className="flex items-center gap-1">
                        {copyrightTagline}
                    </p>
                </div>
            </div>
        </footer>
    );
}
