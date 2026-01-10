import React, { useState } from 'react';
import { MindfulnessOrba, Activist66Simulation, LKPDTopic12, QuizOrba } from '../components/Topic12Components';

const Topic12: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'latar' | 'tritura' | 'supersemar' | 'dualisme'>('latar');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-gold/20 mb-6 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                    <i className="fas fa-shield-alt text-4xl text-history-gold animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Lahirnya Orde Baru</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Dari G30S Menuju Stabilitas Nasional"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-gold">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-gold uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessOrba />
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap tentang Lahirnya Orde Baru.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1zrqoE7c_ZHe7ypSCbJLtnZgxeOzFeq0V/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'latar', label: '1. Latar Belakang & Krisis', icon: 'exclamation-circle' },
                                    { id: 'tritura', label: '2. Aksi Tritura', icon: 'bullhorn' },
                                    { id: 'supersemar', label: '3. Supersemar', icon: 'file-signature' },
                                    { id: 'dualisme', label: '4. Dualisme Kepemimpinan', icon: 'balance-scale' }
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
                                    
                                    {subMateri === 'latar' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Latar Belakang</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Kekacauan Pasca G30S/PKI.</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-red-500/20">
                                                    <h4 className="font-bold text-red-500 text-lg mb-2">Krisis Politik</h4>
                                                    <p className="text-history-muted text-sm">Ketidakpercayaan rakyat terhadap Presiden Soekarno yang dianggap melindungi PKI. Pembentukan KAMI (Kesatuan Aksi Mahasiswa Indonesia) dan KAPPI.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/20">
                                                    <h4 className="font-bold text-history-gold text-lg mb-2">Krisis Ekonomi</h4>
                                                    <p className="text-history-muted text-sm">Inflasi mencapai 600%. Harga kebutuhan pokok melambung tinggi. Rakyat antre beras dan minyak tanah di mana-mana.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'tritura' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Aksi TRITURA</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Tri Tuntutan Rakyat (10 Januari 1966).</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10 text-center">
                                                <h4 className="font-bold text-xl text-white mb-6 uppercase tracking-widest">Isi Tritura</h4>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-[#0a0a0a] rounded border border-red-500/30">
                                                        <h5 className="font-bold text-red-500">1. Bubarkan PKI</h5>
                                                    </div>
                                                    <div className="p-4 bg-[#0a0a0a] rounded border border-history-gold/30">
                                                        <h5 className="font-bold text-history-gold">2. Bersihkan Kabinet Dwikora</h5>
                                                        <p className="text-xs text-history-muted mt-1">(Dari unsur-unsur G30S/PKI)</p>
                                                    </div>
                                                    <div className="p-4 bg-[#0a0a0a] rounded border border-blue-500/30">
                                                        <h5 className="font-bold text-blue-400">3. Turunkan Harga</h5>
                                                        <p className="text-xs text-history-muted mt-1">(Perbaikan Ekonomi)</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'supersemar' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">SUPERSEMAR</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Surat Perintah Sebelas Maret (1966).</p>
                                            </div>

                                            <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-history-gold">
                                                <p className="text-history-brown text-sm leading-relaxed mb-4">
                                                    Mandat yang diberikan oleh Presiden Soekarno kepada <strong>Letjen Soeharto</strong> untuk mengambil segala tindakan yang dianggap perlu demi terjaminnya keamanan, ketenangan, dan kestabilan jalannya pemerintahan.
                                                </p>
                                                <div className="bg-[#0a0a0a] p-4 rounded text-sm text-history-muted">
                                                    <strong>Tindakan Pertama Soeharto:</strong> Membubarkan PKI pada tanggal 12 Maret 1966 dan menyatakannya sebagai partai terlarang.
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'dualisme' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Dualisme Kepemimpinan</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Dua Matahari Kembar (1966-1967).</p>
                                            </div>

                                            <p className="text-history-brown mb-6 font-light">
                                                Soekarno masih menjabat sebagai Presiden (Kepala Negara), namun Soeharto sebagai pemegang Supersemar memiliki kekuasaan eksekutif (Kepala Pemerintahan) yang besar. Kondisi ini membingungkan rakyat.
                                            </p>

                                            <div className="grid gap-4">
                                                <div className="bg-[#171717] p-4 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white mb-1">Sidang Istimewa MPRS (1967)</h4>
                                                    <p className="text-sm text-history-muted">MPRS mencabut kekuasaan pemerintahan dari Presiden Soekarno.</p>
                                                </div>
                                                <div className="bg-[#171717] p-4 rounded-xl border border-history-gold/10">
                                                    <h4 className="font-bold text-history-gold mb-1">Pelantikan Soeharto</h4>
                                                    <p className="text-sm text-history-muted">Soeharto dilantik sebagai Pejabat Presiden (1967) dan kemudian Presiden definitif (1968), menandai resmi dimulainya <strong>Orde Baru</strong>.</p>
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
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Jejak Aktivis '66</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Rasakan atmosfer demonstrasi dan ketegangan politik transisi Orde Baru.</p>
                        </div>
                        <Activist66Simulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic12 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang lahirnya Orde Baru.</p>
                        </div>
                        <QuizOrba />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic12;