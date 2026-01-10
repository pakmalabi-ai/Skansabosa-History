import React, { useState } from 'react';
import { MindfulnessTerpimpin, NasakomSimulation, LKPDTopic11, QuizTerpimpin } from '../components/Topic11Components';

const Topic11: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'dekrit' | 'politik' | 'penyimpangan' | 'ekonomi'>('dekrit');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-red/20 mb-6 shadow-[0_0_50px_rgba(190,18,60,0.2)]">
                    <i className="fas fa-crown text-4xl text-history-red animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Demokrasi Terpimpin</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Dari Kebebasan Tanpa Batas Menuju Pemimpin Besar Revolusi"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-red">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-red uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessTerpimpin />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {['materi', 'simulasi', 'lkpd', 'kuis'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-3 font-bold transition-all duration-300 text-sm uppercase tracking-widest rounded-full ${
                            activeTab === tab 
                            ? 'bg-history-gold text-[#0a0a0a] shadow-lg scale-105' 
                            : 'bg-[#171717] text-history-muted hover:text-history-brown hover:bg-[#262626]'
                        }`}
                    >
                        <i className={`fas fa-${tab === 'materi' ? 'book-open' : tab === 'simulasi' ? 'gamepad' : tab === 'lkpd' ? 'file-alt' : 'clipboard-list'} mr-2 text-xs`}></i> {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap tentang Demokrasi Terpimpin.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1UCumV1n8qfrFY8Yi1WLCooTMpD3E-eOf/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'dekrit', label: '1. Dekrit Presiden 1959', icon: 'scroll' },
                                    { id: 'politik', label: '2. Peta Politik & NASAKOM', icon: 'balance-scale' },
                                    { id: 'penyimpangan', label: '3. Penyimpangan Konstitusi', icon: 'exclamation-triangle' },
                                    { id: 'ekonomi', label: '4. Ekonomi & Mercusuar', icon: 'building' }
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
                                    
                                    {subMateri === 'dekrit' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Dekrit Presiden 5 Juli 1959</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Latar Belakang: Kegagalan Dewan Konstituante.</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 text-center">
                                                <h4 className="font-bold text-xl text-white mb-6 uppercase tracking-widest">Isi Dekrit</h4>
                                                <ul className="space-y-4 text-history-brown text-lg font-light">
                                                    <li className="p-3 bg-[#0a0a0a] rounded border border-history-gold/10">1. Pembubaran Konstituante</li>
                                                    <li className="p-3 bg-[#0a0a0a] rounded border border-history-gold/10">2. Berlakunya kembali UUD 1945</li>
                                                    <li className="p-3 bg-[#0a0a0a] rounded border border-history-gold/10">3. Pembentukan MPRS dan DPAS</li>
                                                </ul>
                                            </div>
                                            <p className="text-history-muted text-center mt-4 text-sm">
                                                Makna: Sistem pemerintahan berubah dari Parlementer ke <strong>Presidensial</strong>. Kekuasaan terpusat pada Presiden Soekarno.
                                            </p>
                                        </div>
                                    )}

                                    {subMateri === 'politik' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Peta Kekuatan Politik</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Keseimbangan antara Soekarno, TNI AD, dan PKI.</p>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-history-red">
                                                    <h4 className="font-bold text-history-red text-lg mb-2">Konsep NASAKOM</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Soekarno ingin menyatukan tiga kekuatan besar bangsa: <strong>Nasionalis, Agama, dan Komunis</strong>. 
                                                        Namun, konsep ini justru dimanfaatkan oleh PKI untuk mendekati kekuasaan dan menyingkirkan lawan politiknya (TNI AD dan partai agama).
                                                    </p>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="bg-[#0a0a0a] p-4 rounded border border-white/10">
                                                        <h5 className="font-bold text-white mb-1">Peran TNI AD</h5>
                                                        <p className="text-xs text-history-muted">Menjadi kekuatan pertahanan dan politik, namun khawatir dengan pengaruh PKI.</p>
                                                    </div>
                                                    <div className="bg-[#0a0a0a] p-4 rounded border border-white/10">
                                                        <h5 className="font-bold text-white mb-1">Peran PKI</h5>
                                                        <p className="text-xs text-history-muted">Menjadi partai komunis terbesar ke-3 di dunia, memobilisasi buruh dan tani.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'penyimpangan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Penyimpangan Konstitusi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Atas nama Revolusi, UUD 1945 sering diterobos.</p>
                                            </div>

                                            <div className="grid gap-4">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20 flex items-start">
                                                    <i className="fas fa-times-circle text-red-500 text-xl mr-4 mt-1"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Presiden Seumur Hidup</h4>
                                                        <p className="text-sm text-history-muted">MPRS mengangkat Soekarno sebagai Presiden Seumur Hidup (Tap MPRS No. III/1963), melanggar pembatasan masa jabatan.</p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20 flex items-start">
                                                    <i className="fas fa-times-circle text-red-500 text-xl mr-4 mt-1"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Pembubaran DPR Hasil Pemilu</h4>
                                                        <p className="text-sm text-history-muted">Karena menolak RAPBN, Soekarno membubarkan DPR 1955 dan menggantinya dengan DPR-GR (Gotong Royong) yang anggotanya ditunjuk Presiden.</p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20 flex items-start">
                                                    <i className="fas fa-times-circle text-red-500 text-xl mr-4 mt-1"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Lembaga Negara di Bawah Presiden</h4>
                                                        <p className="text-sm text-history-muted">Ketua MPRS dan DPR dijadikan menteri, padahal seharusnya sejajar atau mengawasi Presiden.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'ekonomi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Ekonomi & Mercusuar</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Gagah di Luar (Politik Luar Negeri), Rapuh di Dalam (Ekonomi).</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/20 hover:bg-[#1f1f1f] transition">
                                                    <h4 className="font-bold text-history-gold text-lg mb-2">Politik Mercusuar</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Membangun proyek raksasa (Stadion GBK, Monas, Hotel Indonesia) agar Indonesia dipandang hebat oleh dunia (NEFO). Menghabiskan anggaran negara yang besar.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-red/20 hover:bg-[#1f1f1f] transition">
                                                    <h4 className="font-bold text-history-red text-lg mb-2">Hiperinflasi & Sanering</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Inflasi mencapai 600%. Pemerintah melakukan <strong>Sanering</strong> (memotong nilai uang Rp 1000 jadi Rp 100), tapi gagal mengatasi krisis dan rakyat makin menderita.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-blue-500/20 col-span-1 md:col-span-2 hover:bg-[#1f1f1f] transition">
                                                    <h4 className="font-bold text-blue-400 text-lg mb-2">Konfrontasi Malaysia</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Soekarno menganggap Malaysia proyek Nekolim (Penjajah). Indonesia keluar dari PBB dan melakukan konfrontasi militer (Dwikora), menguras sumber daya ekonomi.
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
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">The Great Leader's Balance</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Bisakah Anda menyeimbangkan TNI, PKI, dan Ekonomi di tengah badai krisis 1965?</p>
                        </div>
                        <NasakomSimulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic11 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang era Demokrasi Terpimpin.</p>
                        </div>
                        <QuizTerpimpin />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic11;