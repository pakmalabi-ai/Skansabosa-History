import React, { useState } from 'react';
import { MindfulnessDemokrasi, SystemSimulation, LKPDTopic8, QuizDemokrasi } from '../components/Topic8Components';

const Topic8: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'hakikat' | 'sistem' | 'dinamika'>('hakikat');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-emerald-500/20 mb-6 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                    <i className="fas fa-landmark text-4xl text-emerald-500 animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Selamat Datang, Generasi Emas</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Jejak Demokrasi: Dari Konsep Menuju Aksi"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-emerald-500">
                    <h3 className="font-sans text-sm font-bold mb-4 text-emerald-500 uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessDemokrasi />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {[
                    { id: 'materi', icon: 'book-open', label: 'Materi' },
                    { id: 'simulasi', icon: 'gamepad', label: 'Simulasi Sistem' },
                    { id: 'lkpd', icon: 'file-alt', label: 'LKPD' },
                    { id: 'kuis', icon: 'clipboard-list', label: 'Evaluasi' }
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
                                onClick={() => window.open('https://drive.google.com/file/d/1tjvqQLs-oV010nRAvI1r-E8wPsoyL5lN/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'hakikat', label: '1. Hakikat Demokrasi', icon: 'university' },
                                    { id: 'sistem', label: '2. Presidensial vs Parlementer', icon: 'balance-scale' },
                                    { id: 'dinamika', label: '3. Dinamika 1945-1950', icon: 'history' }
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
                                    
                                    {subMateri === 'hakikat' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Hakikat Demokrasi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Pemerintahan dari rakyat, oleh rakyat, dan untuk rakyat.</p>
                                            </div>
                                            
                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10">
                                                <p className="text-history-brown mb-6 font-light leading-relaxed">
                                                    Secara etimologis, demokrasi berasal dari bahasa Yunani: <strong>Demos</strong> (Rakyat) dan <strong>Kratos/Cratein</strong> (Pemerintahan/Kekuasaan).
                                                </p>
                                                <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 text-emerald-400 italic text-xl">
                                                    "Demokrasi adalah pemerintahan dari rakyat, oleh rakyat, dan untuk rakyat."
                                                    <span className="block text-sm font-bold text-history-muted mt-2 not-italic">- Abraham Lincoln</span>
                                                </blockquote>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'sistem' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Perbandingan Sistem</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Liberal vs Presidensial pada awal kemerdekaan.</p>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-[#0a0a0a] text-history-gold text-xs uppercase tracking-wider">
                                                            <th className="p-4 border border-history-gold/20">Aspek</th>
                                                            <th className="p-4 border border-history-gold/20 bg-blue-900/20">Sistem Presidensial (RI Saat Ini)</th>
                                                            <th className="p-4 border border-history-gold/20 bg-history-gold/10 text-white">Sistem Parlementer (1950)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm text-history-muted">
                                                        <tr className="border-b border-history-gold/10">
                                                            <td className="p-4 font-bold text-history-brown">Kepala Negara</td>
                                                            <td className="p-4">Presiden (Simbol & Kuasa)</td>
                                                            <td className="p-4">Raja / Presiden (Hanya Simbol)</td>
                                                        </tr>
                                                        <tr className="border-b border-history-gold/10">
                                                            <td className="p-4 font-bold text-history-brown">Kepala Pemerintahan</td>
                                                            <td className="p-4">Presiden</td>
                                                            <td className="p-4 font-bold text-history-gold">Perdana Menteri</td>
                                                        </tr>
                                                        <tr className="border-b border-history-gold/10">
                                                            <td className="p-4 font-bold text-history-brown">Tanggung Jawab</td>
                                                            <td className="p-4">Menteri lapor ke Presiden</td>
                                                            <td className="p-4">Menteri lapor ke Parlemen (DPR)</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="p-4 font-bold text-history-brown">Stabilitas</td>
                                                            <td className="p-4">Stabil (Masa jabatan tetap)</td>
                                                            <td className="p-4 text-red-400">Labil (Bisa jatuh lewat Mosi Tidak Percaya)</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'dinamika' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Dinamika 1945-1950</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Perubahan cepat demi kelangsungan negara.</p>
                                            </div>

                                            <div className="space-y-6 relative border-l-2 border-history-gold/30 ml-3 pl-8 py-2">
                                                <div className="relative">
                                                    <div className="absolute -left-[41px] top-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-[#171717]"></div>
                                                    <h4 className="font-bold text-white text-lg">18 Agustus 1945</h4>
                                                    <p className="text-history-muted text-sm mt-1">Sistem Presidensial Murni. Soekarno sebagai Presiden dan Kepala Pemerintahan sesuai UUD 1945.</p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-[41px] top-1 w-6 h-6 bg-history-gold rounded-full border-4 border-[#171717]"></div>
                                                    <h4 className="font-bold text-white text-lg">16 Oktober 1945 (Maklumat X)</h4>
                                                    <p className="text-history-muted text-sm mt-1">KNIP diberi kekuasaan legislatif. Cikal bakal Parlemen/DPR.</p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-[41px] top-1 w-6 h-6 bg-red-500 rounded-full border-4 border-[#171717]"></div>
                                                    <h4 className="font-bold text-red-400 text-lg">14 November 1945 (Titik Balik)</h4>
                                                    <p className="text-history-muted text-sm mt-1">Maklumat Pemerintah mengubah sistem menjadi <strong>Parlementer</strong>. Sutan Sjahrir diangkat sebagai Perdana Menteri Pertama.</p>
                                                    <div className="mt-2 bg-[#0a0a0a] p-3 rounded border-l-2 border-red-500 text-xs text-history-muted italic">
                                                        "Strategi diplomasi agar Sekutu tidak menganggap Indonesia sebagai negara Fasis buatan Jepang."
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Interactive Strategy</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Simulasi: The Diplomat 1945</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Ambil keputusan sebagai Founding Fathers dalam menentukan nasib sistem pemerintahan.</p>
                        </div>
                        <SystemSimulation />
                    </div>
                )}

                 {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic8 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa paham kamu tentang jejak demokrasi bangsa?</p>
                        </div>
                        <QuizDemokrasi />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic8;