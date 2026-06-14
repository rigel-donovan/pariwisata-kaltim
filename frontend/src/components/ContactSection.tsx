"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

        try {
            const res = await fetch(`${API}/api/contact-messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Terjadi kesalahan sistem");

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });

            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error('Submission error:', error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden" id="kontak">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-slate-900 skew-x-12 translate-x-32 hidden lg:block -z-10" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">

                    {/* Text Column */}
                    <div className="flex-1 max-w-xl">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Dukungan & Bantuan
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                            Punya Pertanyaan <br /> Seputar Kaltim?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                            Tim pusat bantuan wisata kami di Kaltim Explore akan menajamkan rencana perjalanan Anda ke timur Borneo.
                            Silahkan hubungi kami melalui form ini.
                        </p>

                    </div>

                    {/* Form Column */}
                    <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
                        >
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                        placeholder="Masukkan Nama Anda"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Utama</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                        placeholder="Masukkan Email Anda"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Topik Permintaan</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                        placeholder="Masukkan Topik Permintaan"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Isi Pesan Detail</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none text-slate-900 dark:text-white outline-none"
                                        placeholder="Ceritakan momen yang berkesan..."
                                    />
                                </div>

                                {/* Status Feedback */}
                                {status === "success" && (
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium">Pesan terkirim! Tim kami akan segera menindaklanjuti permintaan Anda.</p>
                                    </div>
                                )}
                                {status === "error" && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium">Gagal meneruskan pesan ke server, mohon cek koneksi Anda.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Kirim Pesan <Send className="w-4 h-4 ml-1" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
