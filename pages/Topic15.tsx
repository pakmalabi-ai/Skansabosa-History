import React, { useState } from 'react';
import { MindfulnessReformasi, ReformasiSimulation, LKPDTopic15, QuizReformasi } from '../components/Topic15Components';

const Topic15: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'kronologi' | 'perbandingan' | 'habibie'>('kronologi');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-emerald-500/20 mb-6 shadow-[0_0_50px_rgba(5,150,105,0.2)]">
                    <i className="fas fa-fist-raised text-4xl text-emerald-500 animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Lahirnya Era Reformasi</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Runtuhnya Rezim 32 Tahun & Fajar Baru Demokrasi"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-emerald-500">
                    <h3 className="font-sans text-sm font-bold mb-4 text-emerald-500 uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessReformasi />
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap Kronologi Reformasi 1998.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1MHzfVxqjpkvUG-yCPycCthxeBCQatN4A/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'kronologi', label: '1. Kronologi Mei 1998', icon: 'clock' },
                                    { id: 'perbandingan', label: '2. Orba vs Reformasi', icon: 'balance-scale' },
                                    { id: 'habibie', label: '3. Masa B.J. Habibie', icon: 'user-tie' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSubMateri(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            subMateri === item.id 
                                            ? 'bg-[#171717] border-history-gold text-history-gold shadow-[0_0_20px_rgba(5,150,105,0.1)]' 
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
                                    
                                    {subMateri === 'kronologi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Kronologi Mei 1998</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Hari-hari yang mengubah sejarah bangsa.</p>
                                            </div>

                                            <div className="space-y-6 border-l-2 border-emerald-500/30 pl-6 ml-3">
                                                <div className="relative">
                                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-emerald-500 rounded-full"></div>
                                                    <h4 className="font-bold text-white text-lg">12 Mei 1998 - Tragedi Trisakti</h4>
                                                    <p className="text-history-muted text-sm mt-1 leading-relaxed">
                                                        Empat mahasiswa Trisakti (Elang Mulia, Heri Hertanto, Hafidin Royan, Hendriawan Sie) tewas ditembak aparat keamanan saat demonstrasi damai menuntut Soeharto turun. Kejadian ini memicu amarah nasional.
                                                    </p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-red-500 rounded-full"></div>
                                                    <h4 className="font-bold text-white text-lg">13-14 Mei 1998 - Kerusuhan Jakarta</h4>
                                                    <p className="text-history-muted text-sm mt-1 leading-relaxed">
                                                        Jakarta mencekam. Kerusuhan massal, pembakaran, dan penjarahan terjadi di berbagai titik. Etnis Tionghoa menjadi sasaran. Suasana chaos meluas ke Solo, Palembang, dan kota lain.
                                                    </p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-history-gold rounded-full"></div>
                                                    <h4 className="font-bold text-white text-lg">18-20 Mei 1998 - Pendudukan DPR</h4>
                                                    <p className="text-history-muted text-sm mt-1 leading-relaxed">
                                                        Ribuan mahasiswa menduduki gedung DPR/MPR di Senayan. Harmoko (Ketua MPR) meminta Soeharto mundur. 14 Menteri mengundurkan diri dari Kabinet Pembangunan VII.
                                                    </p>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute -left-[33px] top-1 w-4 h-4 bg-white rounded-full"></div>
                                                    <h4 className="font-bold text-white text-lg">21 Mei 1998 - Soeharto Berhenti</h4>
                                                    <p className="text-history-muted text-sm mt-1 leading-relaxed">
                                                        Pukul 09.00 WIB di Istana Merdeka, Soeharto menyatakan berhenti sebagai Presiden. B.J. Habibie disumpah menjadi Presiden ke-3 RI. Era Orde Baru resmi berakhir.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'perbandingan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Orde Baru vs Reformasi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Transformasi sistem pemerintahan.</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/30">
                                                    <h4 className="font-bold text-red-500 text-lg mb-4 text-center">Era Orde Baru</h4>
                                                    <ul className="text-history-muted text-sm space-y-3">
                                                        <li className="flex items-start"><i className="fas fa-times text-red-500 mt-1 mr-2"></i> Sentralisasi (Pusat Kuat).</li>
                                                        <li className="flex items-start"><i className="fas fa-times text-red-500 mt-1 mr-2"></i> Dwifungsi ABRI (Militer berpolitik).</li>
                                                        <li className="flex items-start"><i className="fas fa-times text-red-500 mt-1 mr-2"></i> Pers dibungkam (SIUPP).</li>
                                                        <li className="flex items-start"><i className="fas fa-times text-red-500 mt-1 mr-2"></i> Pemilu tidak demokratis (Golkar dominan).</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-emerald-500/30">
                                                    <h4 className="font-bold text-emerald-500 text-lg mb-4 text-center">Era Reformasi</h4>
                                                    <ul className="text-history-muted text-sm space-y-3">
                                                        <li className="flex items-start"><i className="fas fa-check text-emerald-500 mt-1 mr-2"></i> Desentralisasi (Otonomi Daerah).</li>
                                                        <li className="flex items-start"><i className="fas fa-check text-emerald-500 mt-1 mr-2"></i> Supremasi Sipil (TNI kembali ke barak).</li>
                                                        <li className="flex items-start"><i className="fas fa-check text-emerald-500 mt-1 mr-2"></i> Kebebasan Pers dijamin UU.</li>
                                                        <li className="flex items-start"><i className="fas fa-check text-emerald-500 mt-1 mr-2"></i> Pemilu demokratis multipartai.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'habibie' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Pemerintahan B.J. Habibie</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Presiden Transisi yang Meletakkan Dasar Demokrasi.</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 mb-6">
                                                <p className="text-history-brown mb-4 font-light leading-relaxed">
                                                    Habibie menjabat sangat singkat (21 Mei 1998 - 20 Oktober 1999), namun prestasinya luar biasa dalam menyelamatkan Indonesia dari kehancuran total.
                                                </p>
                                            </div>

                                            <div className="grid gap-4">
                                                <div className="bg-[#171717] p-4 rounded-xl border-l-4 border-history-gold">
                                                    <h4 className="font-bold text-white">Kebebasan Pers</h4>
                                                    <p className="text-sm text-history-muted">Mencabut pembredelan media, membiarkan kritik terbuka.</p>
                                                </div>
                                                <div className="bg-[#171717] p-4 rounded-xl border-l-4 border-history-gold">
                                                    <h4 className="font-bold text-white">Pembebasan Tapol</h4>
                                                    <p className="text-sm text-history-muted">Membebaskan tahanan politik (Sri Bintang Pamungkas, Muchtar Pakpahan) yang ditahan Soeharto.</p>
                                                </div>
                                                <div className="bg-[#171717] p-4 rounded-xl border-l-4 border-history-gold">
                                                    <h4 className="font-bold text-white">Referendum Timor Timur</h4>
                                                    <p className="text-sm text-history-muted">Menawarkan jajak pendapat yang berujung lepasnya Timtim menjadi negara Timor Leste.</p>
                                                </div>
                                                <div className="bg-[#171717] p-4 rounded-xl border-l-4 border-history-gold">
                                                    <h4 className="font-bold text-white">Independensi Bank Indonesia</h4>
                                                    <p className="text-sm text-history-muted">Memisahkan BI dari pemerintah agar fokus menjaga kestabilan Rupiah (menguat dari Rp16.000 ke Rp6.500).</p>
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
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Habibie's Dilemma</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Ambil keputusan sulit di tengah badai krisis 1998.</p>
                        </div>
                        <ReformasiSimulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic15 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang lahirnya Reformasi.</p>
                        </div>
                        <QuizReformasi />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic15;