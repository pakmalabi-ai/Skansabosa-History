import React, { useState } from 'react';
import { MindfulnessPerjuangan, BattleStrategySim, QuizPerjuanganFisik, LKPDTopic5 } from '../components/Topic5Components';

const Topic5: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'surabaya' | 'ambarawa' | 'bandung' | 'medan'>('surabaya');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-red/30 mb-6 shadow-[0_0_50px_rgba(190,18,60,0.2)]">
                    <i className="fas fa-fist-raised text-4xl text-history-red animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Perjuangan Mempertahankan Kemerdekaan</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Merdeka atau Mati! Revolusi Fisik 1945-1949"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-red">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-red uppercase tracking-widest flex items-center"><i className="fas fa-peace mr-3"></i>Mindfulness</h3>
                    <MindfulnessPerjuangan />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {[
                    { id: 'materi', icon: 'book-dead', label: 'Medan Pertempuran' },
                    { id: 'simulasi', icon: 'chess', label: 'Simulasi Strategi' },
                    { id: 'lkpd', icon: 'file-alt', label: 'LKPD' },
                    { id: 'evaluasi', icon: 'clipboard-list', label: 'Evaluasi' }
                ].map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-8 py-3 font-bold transition-all duration-300 text-sm uppercase tracking-widest rounded-full ${
                            activeTab === tab.id 
                            ? 'bg-history-gold text-[#0a0a0a] shadow-lg scale-105' 
                            : 'bg-[#171717] text-history-muted hover:text-history-brown hover:bg-[#262626]'
                        }`}
                    >
                        <i className={`fas fa-${tab.icon} mr-2 text-xs`}></i> {tab.label}
                    </button>
                ))}
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-4">
                {activeTab === 'materi' && (
                    <div className="animate-fade-in">
                         {/* Download Button */}
                         <div className="bg-[#171717] p-6 rounded-2xl border border-history-red/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mb-8">
                            <div>
                                <h4 className="text-history-red font-bold uppercase tracking-widest text-sm mb-1"><i className="fas fa-file-pdf mr-2"></i>Bahan Ajar Digital</h4>
                                <p className="text-history-muted text-xs">Unduh materi lengkap dalam format PDF untuk dipelajari secara offline.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1Q6vrvDOtzmSKf50Hld4pFzh2L7Qhhd3X/view?usp=sharing', '_blank')}
                                className="px-6 py-3 bg-history-red text-white rounded hover:bg-red-700 transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu for Materi */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'surabaya', label: '1. Pertempuran Surabaya', date: '10 Nov 1945' },
                                    { id: 'ambarawa', label: '2. Palagan Ambarawa', date: 'Des 1945' },
                                    { id: 'bandung', label: '3. Bandung Lautan Api', date: 'Mar 1946' },
                                    { id: 'medan', label: '4. Medan Area', date: 'Okt 1945' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSubMateri(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            subMateri === item.id 
                                            ? 'bg-[#171717] border-history-red text-history-red shadow-[0_0_20px_rgba(190,18,60,0.1)]' 
                                            : 'bg-transparent border-white/5 text-history-muted hover:bg-[#171717] hover:border-white/20'
                                        }`}
                                    >
                                        <div className="relative z-10">
                                            <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{item.date}</span>
                                            <span className="font-sans font-bold text-sm uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        {subMateri === item.id && <div className="absolute right-0 top-0 h-full w-1 bg-history-red"></div>}
                                    </button>
                                ))}
                            </div>

                            {/* Materi Content Area */}
                            <div className="md:col-span-9">
                                <div className="glass-card p-8 md:p-12 rounded-3xl min-h-[600px] relative overflow-hidden">
                                    
                                    {subMateri === 'surabaya' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-red/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-history-brown uppercase tracking-wide">Surabaya Membara</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Lebih baik hancur lebur daripada tidak merdeka!"</p>
                                            </div>
                                            
                                            <div className="w-full relative group">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                                                <img 
                                                    src="https://img.okezone.com/content/2024/08/08/337/3046188/bung_tomo-OBxi_large.jpg" 
                                                    alt="Bung Tomo" 
                                                    className="w-full h-[400px] object-cover rounded-xl border border-history-red/20 grayscale hover:grayscale-0 transition duration-700"
                                                />
                                                <p className="absolute bottom-4 left-4 text-xs text-history-gold uppercase tracking-widest bg-black/70 px-3 py-1 rounded backdrop-blur-sm">Bung Tomo Membakar Semangat</p>
                                            </div>

                                            <div className="prose prose-lg text-history-muted font-light leading-relaxed max-w-none">
                                                <p>
                                                    Pertempuran 10 November 1945 adalah perang terbesar pertama pasukan Indonesia melawan tentara asing (Inggris/Sekutu) setelah Proklamasi.
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-6 my-6">
                                                    <div className="bg-[#171717] p-6 rounded-lg border-l-4 border-history-red">
                                                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2">Pemicu</h4>
                                                        <p className="text-sm">Tewasnya Brigjen A.W.S. Mallaby dan ultimatum Inggris agar rakyat menyerahkan senjata.</p>
                                                    </div>
                                                    <div className="bg-[#171717] p-6 rounded-lg border-l-4 border-history-gold">
                                                        <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-2">Tokoh Kunci</h4>
                                                        <p className="text-sm"><strong>Bung Tomo</strong> (Orator) dan <strong>Gubernur Suryo</strong> (Pemimpin Jawa Timur).</p>
                                                    </div>
                                                </div>
                                                <p>
                                                    Meskipun Surabaya jatuh ke tangan Inggris dalam 3 minggu, perlawanan gigih ini membuka mata dunia. Tanggal 10 November kemudian ditetapkan sebagai <strong>Hari Pahlawan</strong>.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'ambarawa' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-history-gold uppercase tracking-wide">Palagan Ambarawa</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Kecerdikan Strategi Supit Urang</p>
                                            </div>

                                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                                <img 
                                                    src="https://www.daarelqolam3.sch.id/wp-content/uploads/2024/10/Screenshot_2024-10-05_060021-1-1761x2048.jpg" 
                                                    alt="Jenderal Sudirman" 
                                                    className="w-full md:w-1/3 rounded-xl border border-history-gold/20 shadow-lg grayscale"
                                                />
                                                <div className="space-y-4 w-full md:w-2/3">
                                                    <p className="text-lg text-history-brown leading-relaxed font-light">
                                                        Pertempuran ini dipicu oleh Sekutu yang mempersenjatai tawanan perang Belanda. Setelah Letkol Isdiman gugur, komando diambil alih langsung oleh <strong>Kolonel Soedirman</strong>.
                                                    </p>
                                                    <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/10">
                                                        <h4 className="font-bold text-history-gold mb-2 uppercase text-sm tracking-wide">Taktik Supit Urang</h4>
                                                        <p className="text-history-muted text-sm">
                                                            Strategi pengepungan rangkap dari dua sisi sehingga musuh benar-benar terkurung dan suplai logistik terputus. Sekutu akhirnya mundur ke Semarang pada 15 Desember 1945.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'bandung' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-red/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-history-red uppercase tracking-wide">Bandung Lautan Api</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Mari bung, rebut kembali!"</p>
                                            </div>

                                            <div className="w-full relative overflow-hidden rounded-xl border border-history-red/10 h-[400px]">
                                                 <img 
                                                    src="https://cdnwpedutorenews.gramedia.net/wp-content/uploads/2022/08/25223125/peristiwa-bandung-lautan-api1-810x604.jpg" 
                                                    alt="Bandung Lautan Api Illustration" 
                                                    className="w-full h-full object-cover opacity-60"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                    <p className="text-white text-3xl font-bold uppercase tracking-widest text-shadow-lg">Bumi Hangus</p>
                                                </div>
                                            </div>

                                            <div className="prose prose-lg text-history-muted font-light leading-relaxed max-w-none">
                                                <p>
                                                    Maret 1946. Sekutu menuntut Bandung dikosongkan. Menyadari kekuatan senjata tidak seimbang, TRI (Tentara Republik Indonesia) dan rakyat memilih langkah ekstrem: <strong>membakar rumah mereka sendiri</strong> sebelum mengungsi ke selatan.
                                                </p>
                                                <ul className="list-none space-y-3 mt-4">
                                                    <li className="flex items-center text-history-brown"><i className="fas fa-fire text-history-red mr-3"></i> Tujuannya agar Sekutu tidak bisa menggunakan Bandung sebagai markas militer.</li>
                                                    <li className="flex items-center text-history-brown"><i className="fas fa-user-secret text-history-red mr-3"></i> Tokoh: <strong>Mohamad Toha</strong> gugur saat meledakkan gudang mesiu Sekutu.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'medan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-wide">Medan Area</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Perlawanan di Tanah Deli</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10">
                                                <div className="flex items-start mb-6">
                                                    <div className="bg-history-red/20 p-3 rounded-full mr-4 text-history-red">
                                                        <i className="fas fa-map-marker-alt text-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white text-lg uppercase tracking-wide mb-1">Insiden Lencana</h4>
                                                        <p className="text-history-muted text-sm leading-relaxed">
                                                            Bermula dari seorang penghuni hotel yang menginjak-injak lencana Merah Putih. Kemarahan pemuda meledak.
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="w-full h-px bg-white/10 my-6"></div>

                                                <div className="flex items-start">
                                                     <div className="bg-history-gold/20 p-3 rounded-full mr-4 text-history-gold">
                                                        <i className="fas fa-border-all text-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white text-lg uppercase tracking-wide mb-1">Fixed Boundaries Medan Area</h4>
                                                        <p className="text-history-muted text-sm leading-relaxed">
                                                            Sekutu memasang papan batas wilayah secara sepihak. Rakyat Medan di bawah pimpinan <strong>Achmad Tahir</strong> membentuk Barisan Pemuda Indonesia untuk melawan.
                                                        </p>
                                                    </div>
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Roleplay Game</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Komandan Medan Tempur</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Ambil alih komando. Nasib ribuan pejuang ada di tanganmu.</p>
                        </div>
                        <BattleStrategySim />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic5 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa kuat ingatanmu tentang heroisme masa lalu?</p>
                        </div>
                        <QuizPerjuanganFisik />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic5;