import React, { useState } from 'react';
import { MindfulnessDampak, AgentOfChangeSim, LKPDTopic17, QuizReformasiDampak } from '../components/Topic17Components';

const Topic17: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'positif' | 'negatif' | 'tantangan'>('positif');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-gold/20 mb-6 shadow-[0_0_50px_rgba(180,83,9,0.2)]">
                    <i className="fas fa-balance-scale text-4xl text-history-gold animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Menilai Dampak Reformasi</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Kebebasan, Demokrasi, dan Tantangan Baru"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-gold">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-gold uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessDampak />
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap Dampak Reformasi.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1vJzKywXoQe5Z7lX7qP1yR2wK8o9tL0/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'positif', label: '1. Dampak Positif', icon: 'thumbs-up' },
                                    { id: 'negatif', label: '2. Dampak Negatif', icon: 'thumbs-down' },
                                    { id: 'tantangan', label: '3. Tantangan Masa Depan', icon: 'flag' }
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
                                                <h3 className="text-3xl font-sans font-bold text-green-500 uppercase tracking-wide">Dampak Positif Reformasi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Angin Segar Kebebasan"</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-green-500/20">
                                                    <h4 className="font-bold text-green-500 text-lg mb-2">Kebebasan Berpendapat</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Masyarakat bebas berekspresi, mendirikan partai politik, dan mengkritik pemerintah tanpa takut ditangkap (selama sesuai hukum). Pers berkembang pesat.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-green-500/20">
                                                    <h4 className="font-bold text-green-500 text-lg mb-2">Demokrasi Terbuka</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Pemilihan Presiden, Kepala Daerah, dan Anggota DPR dilakukan secara langsung oleh rakyat (Pemilu Langsung). Kedaulatan benar-benar di tangan rakyat.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-green-500/20">
                                                    <h4 className="font-bold text-green-500 text-lg mb-2">Desentralisasi</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Otonomi Daerah memberikan wewenang kepada daerah untuk mengurus rumah tangganya sendiri, sehingga pembangunan lebih merata.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'negatif' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-red-500 uppercase tracking-wide">Dampak Negatif Reformasi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Eforia yang Kebablasan"</p>
                                            </div>

                                            <div className="grid gap-4">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20 flex gap-4">
                                                    <i className="fas fa-exclamation-triangle text-red-500 text-2xl mt-1"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Korupsi Desentralisasi</h4>
                                                        <p className="text-sm text-history-muted">Korupsi tidak hilang, malah menyebar ke daerah (Raja-raja kecil di daerah). Dinasti politik bermunculan.</p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20 flex gap-4">
                                                    <i className="fas fa-comments text-red-500 text-2xl mt-1"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Konflik Horizontal</h4>
                                                        <p className="text-sm text-history-muted">Kebebasan sering disalahartikan. Muncul ujaran kebencian (Hate Speech), hoax, dan konflik antarkelompok/agama.</p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20 flex gap-4">
                                                    <i className="fas fa-money-bill-wave text-red-500 text-2xl mt-1"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Biaya Politik Mahal</h4>
                                                        <p className="text-sm text-history-muted">Demokrasi langsung membutuhkan biaya sangat besar, memicu praktik politik uang (Money Politics).</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'tantangan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-blue-400 uppercase tracking-wide">Tantangan Masa Depan</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Menjaga Indonesia Emas 2045"</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 text-center">
                                                <p className="text-history-brown mb-6 font-light leading-relaxed">
                                                    Reformasi bukanlah tujuan akhir, melainkan sebuah proses. Tugas generasi muda adalah mengisi kemerdekaan dan reformasi dengan integritas dan inovasi.
                                                </p>
                                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                                    <div className="p-4 bg-[#0a0a0a] rounded border border-blue-500/30 text-blue-400 font-bold uppercase">
                                                        Lawan Korupsi
                                                    </div>
                                                    <div className="p-4 bg-[#0a0a0a] rounded border border-blue-500/30 text-blue-400 font-bold uppercase">
                                                        Rawat Toleransi
                                                    </div>
                                                    <div className="p-4 bg-[#0a0a0a] rounded border border-blue-500/30 text-blue-400 font-bold uppercase">
                                                        Inovasi Digital
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Roleplay Strategy</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Agen Perubahan</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Hadapi dilema transisi demokrasi.</p>
                        </div>
                        <AgentOfChangeSim />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic17 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa kritis pemahamanmu tentang dampak Reformasi?</p>
                        </div>
                        <QuizReformasiDampak />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic17;