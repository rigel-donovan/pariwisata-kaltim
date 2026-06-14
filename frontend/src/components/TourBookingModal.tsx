"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface TourBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TourBookingModal({ isOpen, onClose }: TourBookingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        participants: 1,
        date: "",
        message: "",
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setTimeout(() => {
                setStatus("idle");
                setFormData({ name: "", email: "", phone: "", participants: 1, date: "", message: "" });
            }, 300);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

        try {
            const res = await fetch(`${API}/api/tour-bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Terjadi kesalahan sistem server");

            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal Box */}
                    <div className="fixed inset-0 overflow-y-auto w-full pointer-events-none" style={{ zIndex: 60 }}>
                        <div className="flex min-h-full items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                                className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col pointer-events-auto"
                            >
                                {/* Modal Header */}
                                <div className="px-6 md:px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Form Pemesanan Tour</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Kami akan menghubungi Anda untuk konfirmasi jadwal.</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="px-6 md:px-8 py-6 max-h-[70vh] overflow-y-auto">
                                    {status === "success" ? (
                                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Pemesanan Terkirim!</h4>
                                            <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                                                Terima kasih, agen perjalanan kami telah menerima permohonan Anda dan akan melakukan pengecekan ketersediaan secepatnya.
                                            </p>
                                            <button
                                                onClick={onClose}
                                                className="mt-4 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                                            >
                                                Selesai
                                            </button>
                                        </div>
                                    ) : (
                                        <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1.5">
                                                    <label htmlFor="nameB" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap Pemesan <span className="text-red-500">*</span></label>
                                                    <input
                                                        id="nameB"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label htmlFor="emailB" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Utama <span className="text-red-500">*</span></label>
                                                    <input
                                                        id="emailB"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1.5">
                                                    <label htmlFor="phoneB" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nomor Telepon / WA <span className="text-red-500">*</span></label>
                                                    <input
                                                        id="phoneB"
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                                        placeholder="0812xxxxxx"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label htmlFor="participantsB" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Jumlah Peserta Tour <span className="text-red-500">*</span></label>
                                                    <input
                                                        id="participantsB"
                                                        type="number"
                                                        min="1"
                                                        required
                                                        value={formData.participants}
                                                        onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 1 })}
                                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="dateB" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Rencana Tanggal Keberangkatan <span className="text-red-500">*</span></label>
                                                <input
                                                    id="dateB"
                                                    type="date"
                                                    required
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-900 dark:text-white outline-none"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label htmlFor="messageB" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Catatan Khusus <span className="text-slate-400 font-normal ml-1">(Opsional)</span></label>
                                                <textarea
                                                    id="messageB"
                                                    rows={3}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none text-slate-900 dark:text-white outline-none"
                                                    placeholder="Minta penjemputan di bandara Sepinggan / alergi makanan..."
                                                />
                                            </div>

                                            {status === "error" && (
                                                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl flex items-start gap-3">
                                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                                    <p className="text-sm font-medium">Gagal meneruskan permohonan booking ke server. Mohon periksa kembali isian dan koneksi Anda.</p>
                                                </div>
                                            )}

                                        </form>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                {status !== "success" && (
                                    <div className="px-6 md:px-8 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 sticky bottom-0">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            disabled={isSubmitting}
                                            className="px-6 py-2.5 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            form="booking-form"
                                            disabled={isSubmitting}
                                            className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    Booking Sekarang <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
