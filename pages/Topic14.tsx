import React, { useState } from 'react';
import { MindfulnessJejak, PressSimulation, LKPDTopic14, QuizJejakOrba } from '../components/Topic14Components';

const Topic14: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'positif' | 'negatif' | 'akhir'>('positif');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-gray-500/20 mb-6 shadow-[0_0_50px_rgba(107,114,128,0.2)]">
                    <i className="fas fa-shoe-prints text-4xl text-gray-400 animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Menelusuri Jejak Orde Baru</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Antara Pembangunan Fisik dan Pasung Demokrasi"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-gray-500">
                    <h3 className="font-sans text-sm font-bold mb-4 text-gray-400 uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessJejak />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {['materi', 'simulasi', 'lkpd', 'evaluasi'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-3 font-bold transition-all duration-300 text-sm uppercase tracking-widest rounded-full ${
                            activeTab === tab 
                            ? 'bg-history-gold text-[#0a0a0a] shadow-lg scale-105' 
                            : 'bg-[#171717] text-history-muted hover:text-history-brown hover:bg-[#262626]'
                        }`}
                    >
                        <i className={`fas fa-${tab === 'materi' ? 'book-open' : tab === 'simulasi' ? 'gamepad' : tab === 'lkpd' ? 'file-alt' : 'clipboard-list'} mr-2 text-xs`}></i> 
                        {tab === 'evaluasi' ? 'Evaluasi' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4">
                {activeTab === 'materi' && (
                    <div className="animate-fade-in">
                        {/* Download Button */}
                        <div className="bg-[#171717] p-6 rounded-2xl border border-history-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mb-8">
                            <div>
                                <h4 className="text-history-gold font-bold uppercase tracking-widest text-sm mb-1"><i className="fas fa-file-pdf mr-2"></i>Bahan Ajar Digital</h4>
                                <p className="text-history-muted text-xs">Unduh materi lengkap analisis Orde Baru.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1jad4EQ1kfqZQFdeQUAYxSALAs8_CB7jg/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'positif', label: '1. Sisi Terang (Pembangunan)', icon: 'sun' },
                                    { id: 'negatif', label: '2. Sisi Gelap (Represi)', icon: 'moon' },
                                    { id: 'akhir', label: '3. Akhir Kekuasaan', icon: 'hourglass-end' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSubMateri(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            subMateri === item.id 
                                            ? 'bg-[#171717] border-history-gold text-history-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                                            : 'bg-transparent border-white/5 text-history-muted hover:bg-[#171717] hover:border-white/20'
                                        }`}
                                    >
                                        <div className="relative z-10 flex items-center">
                                            <i className={`fas fa-${item.icon} mr-3 opacity-70`}></i>
                                            <span className="font-sans font-bold text-sm uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        {subMateri === item.id && <div className="absolute right-0 top-0 h-full w-1 bg-history-gold"></div>}
                                    </button>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-9">
                                <div className="glass-card p-8 md:p-12 rounded-3xl min-h-[600px] relative overflow-hidden">
                                    
                                    {subMateri === 'positif' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Sisi Terang: Pembangunan Fisik</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Gemah Ripah Loh Jinawi"</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border-t-4 border-green-500">
                                                    <h4 className="font-bold text-white text-lg mb-2"><i className="fas fa-seedling text-green-500 mr-2"></i>Swasembada Beras</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Tahun 1984, Indonesia berhasil memenuhi kebutuhan beras sendiri dan mendapat penghargaan FAO. Modernisasi pertanian (Revolusi Hijau) sukses besar.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border-t-4 border-blue-500">
                                                    <h4 className="font-bold text-white text-lg mb-2"><i className="fas fa-users text-blue-500 mr-2"></i>Program KB</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        "Dua Anak Cukup". Program Keluarga Berencana berhasil menekan laju pertumbuhan penduduk yang meledak, meningkatkan kualitas hidup keluarga.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border-t-4 border-yellow-500">
                                                    <h4 className="font-bold text-white text-lg mb-2"><i className="fas fa-school text-yellow-500 mr-2"></i>Wajib Belajar</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Pembangunan SD Inpres di seluruh pelosok desa memberantas buta huruf secara masif. Angka partisipasi sekolah meningkat tajam.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border-t-4 border-purple-500">
                                                    <h4 className="font-bold text-white text-lg mb-2"><i className="fas fa-road text-purple-500 mr-2"></i>Infrastruktur</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Jalan tol, jembatan, dan bendungan dibangun lewat Repelita (Rencana Pembangunan Lima Tahun) yang terstruktur.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'negatif' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-red-500/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-red-500 uppercase tracking-wide">Sisi Gelap: Represi & KKN</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Pembangunan dengan Harga Mahal"</p>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-900/30">
                                                    <h4 className="font-bold text-red-400 text-lg mb-2">Pengekangan Demokrasi</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed mb-3">
                                                        Kebebasan pers dibungkam (Bredel Tempo, Detik, Editor). Partai politik disederhanakan paksa (Fusi Partai). PNS wajib memilih Golkar (Monoloyalitas).
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-900/30">
                                                    <h4 className="font-bold text-red-400 text-lg mb-2">Pelanggaran HAM</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed mb-3">
                                                        Daerah Operasi Militer (DOM) di Aceh dan Papua. Peristiwa Tanjung Priok (1984). Operasi Petrus (Penembak Misterius) untuk memberantas preman tanpa pengadilan.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-900/30">
                                                    <h4 className="font-bold text-red-400 text-lg mb-2">Budaya KKN</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Korupsi, Kolusi, dan Nepotisme merajalela. Ekonomi dikuasai oleh kroni-kroni Cendana dan konglomerat tertentu, menciptakan kesenjangan sosial yang parah.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'akhir' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-white uppercase tracking-wide">Akhir Sebuah Rezim</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Ketika pondasi rapuh runtuh oleh badai krisis.</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 text-center">
                                                <div className="text-4xl mb-4 text-history-gold"><i className="fas fa-chart-line transform rotate-180"></i></div>
                                                <h4 className="font-bold text-xl text-white mb-4">Krisis Moneter 1997/1998</h4>
                                                <p className="text-history-brown leading-relaxed font-light mb-6">
                                                    Nilai tukar Rupiah anjlok dari Rp 2.500 menjadi Rp 16.000 per Dolar AS. Harga sembako melambung. KKN membuat fundamental ekonomi Indonesia keropos dan tidak tahan guncangan.
                                                </p>
                                                <div className="inline-block bg-[#0a0a0a] px-6 py-3 rounded-full border border-red-500/50 text-red-400 text-sm font-bold tracking-widest uppercase">
                                                    Reformasi Lahir
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'simulasi' && (
                    <div className="animate-fade-in max-w-5xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Interactive Roleplay</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Pers Mahasiswa '90-an</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Berani memberitakan kebenaran di tengah ancaman pembredelan?</p>
                        </div>
                        <PressSimulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic14 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang jejak langkah Orde Baru.</p>
                        </div>
                        <QuizJejakOrba />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic14;