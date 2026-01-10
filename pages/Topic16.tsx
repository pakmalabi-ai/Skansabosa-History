import React, { useState } from 'react';
import { MindfulnessDemokrasiBaru, PresidentialSimulator, LKPDTopic16, QuizDemokrasiBaru } from '../components/Topic16Components';

const Topic16: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [activePresident, setActivePresident] = useState<'gusdur' | 'mega' | 'sby' | 'jokowi'>('gusdur');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-blue-400/20 mb-6 shadow-[0_0_50px_rgba(96,165,250,0.2)]">
                    <i className="fas fa-vote-yea text-4xl text-blue-400 animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Dari Otokrasi Menuju Demokrasi</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Perjalanan Panjang Menemukan Jati Diri Bangsa"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-blue-400">
                    <h3 className="font-sans text-sm font-bold mb-4 text-blue-400 uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessDemokrasiBaru />
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap: Timeline Presiden Era Reformasi.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1HOEZWmLHZ0ce1T-dbieK1CpiE7lFAMQI/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'gusdur', label: '1. Abdurrahman Wahid', year: '1999-2001' },
                                    { id: 'mega', label: '2. Megawati', year: '2001-2004' },
                                    { id: 'sby', label: '3. Susilo B. Yudhoyono', year: '2004-2014' },
                                    { id: 'jokowi', label: '4. Joko Widodo', year: '2014-2024' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setActivePresident(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            activePresident === item.id 
                                            ? 'bg-[#171717] border-history-gold text-history-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                                            : 'bg-transparent border-white/5 text-history-muted hover:bg-[#171717] hover:border-white/20'
                                        }`}
                                    >
                                        <div className="relative z-10">
                                            <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{item.year}</span>
                                            <span className="font-sans font-bold text-sm uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        {activePresident === item.id && <div className="absolute right-0 top-0 h-full w-1 bg-history-gold"></div>}
                                    </button>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-9">
                                <div className="glass-card p-8 md:p-12 rounded-3xl min-h-[600px] relative overflow-hidden">
                                    
                                    {activePresident === 'gusdur' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Abdurrahman Wahid (Gus Dur)</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Bapak Pluralisme Indonesia"</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border-l-4 border-green-500 mb-6">
                                                <i className="fas fa-quote-left text-green-500 mb-4 text-2xl"></i>
                                                <p className="text-history-brown font-light italic">"Gitu aja kok repot!"</p>
                                                <p className="text-sm text-history-muted mt-2">- Slogan legendaris Gus Dur</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white mb-2">Humanisme</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Mencabut Inpres No. 14/1967 sehingga warga Tionghoa bebas merayakan Imlek dan Barongsai. Mengakui Konghucu sebagai agama resmi.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white mb-2">Reformasi Militer</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Berusaha memisahkan TNI dari politik praktis (penghapusan Dwifungsi ABRI). Mengganti nama Irian Jaya menjadi Papua.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activePresident === 'mega' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-red-500 uppercase tracking-wide">Megawati Soekarnoputri</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Peletak Dasar Institusi Demokrasi"</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border-l-4 border-red-500 mb-6">
                                                <p className="text-history-brown font-light">
                                                    Presiden wanita pertama Indonesia. Putri Sang Proklamator yang naik menggantikan Gus Dur melalui Sidang Istimewa MPR.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-900/30 flex gap-4 items-start">
                                                    <div className="bg-red-900/20 p-3 rounded-full text-red-500"><i className="fas fa-gavel"></i></div>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">KPK (2002)</h4>
                                                        <p className="text-sm text-history-muted">Mendirikan Komisi Pemberantasan Korupsi untuk memerangi korupsi yang akut.</p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-900/30 flex gap-4 items-start">
                                                    <div className="bg-red-900/20 p-3 rounded-full text-red-500"><i className="fas fa-balance-scale"></i></div>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Mahkamah Konstitusi</h4>
                                                        <p className="text-sm text-history-muted">Membentuk MK sebagai pengawal konstitusi dan demokrasi.</p>
                                                    </div>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-900/30 flex gap-4 items-start">
                                                    <div className="bg-red-900/20 p-3 rounded-full text-red-500"><i className="fas fa-vote-yea"></i></div>
                                                    <div>
                                                        <h4 className="font-bold text-white mb-1">Pemilu Langsung</h4>
                                                        <p className="text-sm text-history-muted">Mempersiapkan sistem Pemilu 2004 di mana rakyat memilih Presiden secara langsung untuk pertama kalinya.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activePresident === 'sby' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-blue-500 uppercase tracking-wide">Susilo Bambang Yudhoyono</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Stabilitas dan Perdamaian"</p>
                                            </div>

                                            <div className="text-center mb-8">
                                                <span className="bg-blue-900/30 text-blue-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-500/30">Presiden Pilihan Rakyat Pertama (2 Periode)</span>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-blue-500/20 hover:bg-[#1f1f1f] transition">
                                                    <h4 className="font-bold text-blue-400 text-lg mb-2">Perdamaian Aceh</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Perjanjian Helsinki (2005) mengakhiri konflik GAM yang telah berlangsung puluhan tahun. Aceh damai dalam bingkai NKRI.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-blue-500/20 hover:bg-[#1f1f1f] transition">
                                                    <h4 className="font-bold text-blue-400 text-lg mb-2">Ekonomi & Stabilitas</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Melunasi hutang IMF. Pertumbuhan ekonomi stabil di angka 5-6%. Program BLT dan BOS untuk rakyat miskin.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-blue-500/20 col-span-1 md:col-span-2 hover:bg-[#1f1f1f] transition">
                                                    <h4 className="font-bold text-blue-400 text-lg mb-2">Politik Luar Negeri</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        "Thousand friends, zero enemy". Indonesia aktif di forum internasional (G20, ASEAN) dan meningkatkan citra negara.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activePresident === 'jokowi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-white uppercase tracking-wide">Joko Widodo</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Infrastruktur dan Indonesia Sentris"</p>
                                            </div>

                                            <div className="flex flex-col gap-4">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <div className="flex items-center mb-3">
                                                        <i className="fas fa-hard-hat text-history-gold text-xl mr-3"></i>
                                                        <h4 className="font-bold text-white">Pembangunan Masif</h4>
                                                    </div>
                                                    <p className="text-sm text-history-muted">
                                                        Membangun Tol Trans Jawa, Trans Sumatera, Bendungan, Pelabuhan, dan Bandara. Fokus pada konektivitas antar wilayah.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <div className="flex items-center mb-3">
                                                        <i className="fas fa-map-marked-alt text-history-gold text-xl mr-3"></i>
                                                        <h4 className="font-bold text-white">IKN (Ibu Kota Nusantara)</h4>
                                                    </div>
                                                    <p className="text-sm text-history-muted">
                                                        Memindahkan Ibu Kota Negara dari Jakarta ke Kalimantan Timur untuk pemerataan pembangunan (Indonesia Sentris).
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <div className="flex items-center mb-3">
                                                        <i className="fas fa-id-card text-history-gold text-xl mr-3"></i>
                                                        <h4 className="font-bold text-white">Kartu Sakti</h4>
                                                    </div>
                                                    <p className="text-sm text-history-muted">
                                                        Program jaminan sosial melalui KIP (Pintar), KIS (Sehat), dan PKH untuk kesejahteraan rakyat.
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Interactive Roleplay</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Kursi Kepresidenan</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Bisakah kamu mengambil keputusan krusial seperti para Presiden kita?</p>
                        </div>
                        <PresidentialSimulator />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic16 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang perjalanan demokrasi era Reformasi.</p>
                        </div>
                        <QuizDemokrasiBaru />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic16;