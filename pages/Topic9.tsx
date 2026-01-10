import React, { useState } from 'react';
import { MindfulnessEkonomi, EconomyMinisterSimulation, LKPDTopic9, QuizDinamika } from '../components/Topic9Components';

const Topic9: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'liberal' | 'terpimpin' | 'ekonomi'>('liberal');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-amber-600/20 mb-6 shadow-[0_0_50px_rgba(217,119,6,0.2)]">
                    <i className="fas fa-balance-scale text-4xl text-amber-600 animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Dinamika Politik & Ekonomi</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Liberal hingga Terpimpin: Mencari Bentuk Negara Ideal"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-amber-600">
                    <h3 className="font-sans text-sm font-bold mb-4 text-amber-600 uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessEkonomi />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {[
                    { id: 'materi', icon: 'book-open', label: 'Materi' },
                    { id: 'simulasi', icon: 'gamepad', label: 'Simulasi Menteri' },
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
                         <div className="bg-[#171717] p-6 rounded-2xl border border-history-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mb-8">
                            <div>
                                <h4 className="text-history-gold font-bold uppercase tracking-widest text-sm mb-1"><i className="fas fa-file-pdf mr-2"></i>Bahan Ajar Digital</h4>
                                <p className="text-history-muted text-xs">Unduh materi lengkap dalam format PDF untuk dipelajari secara offline.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1Ecw5y6jYQEeiwB5Yhs6wQPrhiBB-0AmE/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'liberal', label: '1. Demokrasi Liberal', icon: 'users' },
                                    { id: 'terpimpin', label: '2. Demokrasi Terpimpin', icon: 'crown' },
                                    { id: 'ekonomi', label: '3. Krisis Ekonomi', icon: 'coins' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSubMateri(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            subMateri === item.id 
                                            ? 'bg-[#171717] border-history-gold text-history-gold shadow-[0_0_20px_rgba(217,119,6,0.1)]' 
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
                                    
                                    {subMateri === 'liberal' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Era Kabinet Jatuh Bangun (1950-1959)</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Sistem Parlementer yang labil.</p>
                                            </div>
                                            
                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10">
                                                <p className="text-history-brown mb-6 font-light leading-relaxed">
                                                    Masa ini ditandai dengan ketidakstabilan politik. Dalam 9 tahun, terjadi 7 kali pergantian kabinet. Hal ini karena adanya <strong>Mosi Tidak Percaya</strong> dari parlemen.
                                                </p>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-[#0a0a0a] p-4 rounded border border-history-gold/10 hover:border-history-gold/50 transition">
                                                        <h4 className="font-bold text-blue-400 text-sm mb-1">Kabinet Natsir (Masyumi)</h4>
                                                        <p className="text-xs text-history-muted">Gagal karena masalah Irian Barat.</p>
                                                    </div>
                                                    <div className="bg-[#0a0a0a] p-4 rounded border border-history-gold/10 hover:border-history-gold/50 transition">
                                                        <h4 className="font-bold text-green-400 text-sm mb-1">Kabinet Burhanuddin Harahap</h4>
                                                        <p className="text-xs text-history-muted">Sukses selenggarakan Pemilu 1955.</p>
                                                    </div>
                                                    <div className="bg-[#0a0a0a] p-4 rounded border border-history-gold/10 hover:border-history-gold/50 transition">
                                                        <h4 className="font-bold text-red-400 text-sm mb-1">Kabinet Wilopo (PNI)</h4>
                                                        <p className="text-xs text-history-muted">Jatuh karena Peristiwa Tanjung Morawa.</p>
                                                    </div>
                                                    <div className="bg-[#0a0a0a] p-4 rounded border border-history-gold/10 hover:border-history-gold/50 transition">
                                                        <h4 className="font-bold text-white text-sm mb-1">Kabinet Djuanda (Zaken)</h4>
                                                        <p className="text-xs text-history-muted">Kabinet Ahli. Deklarasi Djuanda (Laut).</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'terpimpin' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Demokrasi Terpimpin (1959-1965)</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Pemusatan kekuasaan di tangan Presiden.</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 mb-6">
                                                <h4 className="font-bold text-amber-500 text-xl mb-4">Dekrit Presiden 5 Juli 1959</h4>
                                                <ul className="list-disc list-inside text-history-brown font-light space-y-2">
                                                    <li>Pembubaran Konstituante.</li>
                                                    <li>Berlakunya kembali UUD 1945.</li>
                                                    <li>Tidak berlakunya UUDS 1950.</li>
                                                    <li>Pembentukan MPRS dan DPAS.</li>
                                                </ul>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-red-500/30">
                                                <h4 className="font-bold text-red-500 text-lg mb-2">Penyimpangan</h4>
                                                <p className="text-history-muted text-sm mb-4">Kekuasaan Soekarno menjadi sangat besar, melanggar prinsip demokrasi.</p>
                                                <ul className="space-y-2 text-sm text-history-brown">
                                                    <li className="flex items-center"><i className="fas fa-times text-red-500 mr-2"></i> Pengangkatan Presiden Seumur Hidup.</li>
                                                    <li className="flex items-center"><i className="fas fa-times text-red-500 mr-2"></i> Pembubaran DPR hasil Pemilu 1955.</li>
                                                    <li className="flex items-center"><i className="fas fa-times text-red-500 mr-2"></i> Konsep NASAKOM (Nasionalis, Agama, Komunis).</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'ekonomi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Krisis Ekonomi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Kebijakan kontroversial di tengah himpitan ekonomi.</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-blue-500/30 hover:bg-[#1c1c1c] transition">
                                                    <div className="text-3xl text-blue-500 mb-4"><i className="fas fa-cut"></i></div>
                                                    <h4 className="font-bold text-white mb-2">Gunting Syafruddin</h4>
                                                    <p className="text-xs text-history-muted leading-relaxed">
                                                        Memotong uang kertas pecahan Rp 5 ke atas menjadi dua. Tujuannya mengurangi uang beredar, tapi merugikan rakyat kecil pemegang uang tunai.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-amber-500/30 hover:bg-[#1c1c1c] transition">
                                                    <div className="text-3xl text-amber-500 mb-4"><i className="fas fa-handshake"></i></div>
                                                    <h4 className="font-bold text-white mb-2">Sistem Ali-Baba</h4>
                                                    <p className="text-xs text-history-muted leading-relaxed">
                                                        Kerjasama pengusaha Pribumi (Ali) dan Non-Pribumi (Baba). Gagal karena pribumi hanya menjual lisensi (Mentalitas konsumtif).
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/30 hover:bg-[#1c1c1c] transition md:col-span-2">
                                                    <div className="flex items-center mb-4">
                                                        <div className="text-3xl text-red-500 mr-4"><i className="fas fa-money-bill-wave"></i></div>
                                                        <h4 className="font-bold text-white">Sanering & Inflasi</h4>
                                                    </div>
                                                    <p className="text-xs text-history-muted leading-relaxed mb-3">
                                                        Pemotongan nilai mata uang (Rp 1000 jadi Rp 1). Ditambah proyek mercusuar (Monas, GBK), inflasi meroket hingga 600% di akhir masa Soekarno.
                                                    </p>
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Interactive Strategy</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Simulasi: Menteri Ekonomi</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Bisakah kamu menyelamatkan ekonomi negara dari kebangkrutan?</p>
                        </div>
                        <EconomyMinisterSimulation />
                    </div>
                )}

                 {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic9 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa paham kamu tentang dinamika politik & ekonomi masa lalu?</p>
                        </div>
                        <QuizDinamika />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic9;