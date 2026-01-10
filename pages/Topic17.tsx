import React, { useState } from 'react';
import { MindfulnessDampak, AgentOfChangeSim, LKPDTopic17, QuizReformasiDampak } from '../components/Topic17Components';

const Topic17: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'politik' | 'pemerintahan' | 'sosial'>('politik');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-royalGold/20 mb-6 shadow-[0_0_50px_rgba(180,83,9,0.2)]">
                    <i className="fas fa-balance-scale text-4xl text-royalGold animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Menilai Dampak Reformasi</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Perubahan Sistem Tata Negara dan Kehidupan Sosial"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-royalGold">
                    <h3 className="font-sans text-sm font-bold mb-4 text-royalGold uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessDampak />
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap Dampak Reformasi.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1F6-iq9iS0SXOLb4uP7P1AbDY_rd5k8hq/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'politik', label: '1. Reformasi Politik', icon: 'landmark' },
                                    { id: 'pemerintahan', label: '2. Otonomi Daerah', icon: 'map' },
                                    { id: 'sosial', label: '3. Kebebasan Pers & HAM', icon: 'newspaper' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSubMateri(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            subMateri === item.id 
                                            ? 'bg-[#171717] border-history-gold text-history-gold shadow-[0_0_20px_rgba(180,83,9,0.1)]' 
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
                                    
                                    {subMateri === 'politik' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Reformasi Politik</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Perubahan fundamental dari sistem Otokrasi ke demokrasi.</p>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white text-lg mb-2">Amandemen UUD 1945</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Membatasi kekuasaan eksekutif agar tidak ada lagi presiden seumur hidup. Masa jabatan dibatasi maksimal 2 periode (5 tahun per periode).
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white text-lg mb-2">Penghapusan Dwifungsi ABRI</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Militer (TNI) kembali ke barak, fokus pada pertahanan negara, dan tidak lagi menduduki jabatan sipil atau berpolitik praktis.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white text-lg mb-2">Sistem Multipartai</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Kran demokrasi dibuka lebar. Masyarakat bebas mendirikan partai politik untuk mengikuti Pemilu.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'pemerintahan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-blue-500/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-blue-500 uppercase tracking-wide">Otonomi Daerah</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Dari Sentralisasi (Pusat) ke Desentralisasi (Daerah).</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 mb-6">
                                                <p className="text-history-brown font-light leading-relaxed">
                                                    Berdasarkan UU No. 22 Tahun 1999 (diperbarui UU No. 32/2004), daerah memiliki wewenang untuk mengatur dan mengurus rumah tangganya sendiri.
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-green-500">
                                                    <h4 className="font-bold text-green-500 text-lg mb-2">Dampak Positif</h4>
                                                    <p className="text-xs text-history-muted">Pembangunan lebih merata, pelayanan publik lebih dekat dengan masyarakat, potensi daerah berkembang.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-red-500">
                                                    <h4 className="font-bold text-red-500 text-lg mb-2">Dampak Negatif</h4>
                                                    <p className="text-xs text-history-muted">Munculnya "Raja Kecil" (Dinasti Politik) di daerah dan korupsi yang menyebar hingga ke tingkat lokal.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'sosial' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-emerald-500/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-emerald-500 uppercase tracking-wide">Kebebasan Pers & HAM</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Suara kritis yang tidak lagi dibungkam.</p>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-emerald-500/20">
                                                    <h4 className="font-bold text-emerald-400 text-lg mb-2"><i className="fas fa-newspaper mr-2"></i>UU Pers No. 40 Tahun 1999</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Menjamin kemerdekaan pers sebagai hak asasi warga negara. Tidak ada lagi pembredelan (penutupan paksa) media seperti di masa Orde Baru.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-emerald-500/20">
                                                    <h4 className="font-bold text-emerald-400 text-lg mb-2"><i className="fas fa-users mr-2"></i>Hak Asasi Manusia</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Pemenuhan hak-hak sipil, termasuk bagi kelompok minoritas. Contoh: Pencabutan larangan perayaan Imlek oleh Gus Dur.
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
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Agen Perubahan</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Ambil keputusan krusial di masa transisi 1999 untuk membentuk wajah Indonesia modern.</p>
                        </div>
                        <AgentOfChangeSim />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic17 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang dampak Reformasi.</p>
                        </div>
                        <QuizReformasiDampak />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic17;