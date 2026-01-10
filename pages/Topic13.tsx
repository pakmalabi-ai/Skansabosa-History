import React, { useState } from 'react';
import { MindfulnessPembangunan, PolicySimulation, LKPDTopic13, QuizPemerintahanOrba } from '../components/Topic13Components';

const Topic13: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'politik' | 'ekonomi' | 'dampak'>('politik');

    return (
        <div className="fade-in pb-12">
            {/* Header */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-gold/20 mb-6 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                    <i className="fas fa-building text-4xl text-history-gold animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Pemerintahan Orde Baru</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Stabilitas, Pembangunan, dan Pertumbuhan"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-gold">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-gold uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessPembangunan />
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
                                <p className="text-history-muted text-xs">Unduh materi lengkap tentang Pemerintahan Orde Baru.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1Xx0autGg8KSpFOZ2RC-J-rjnSP_ZdC4B/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'politik', label: '1. Stabilisasi Politik', icon: 'gavel' },
                                    { id: 'ekonomi', label: '2. Pembangunan Ekonomi', icon: 'chart-line' },
                                    { id: 'dampak', label: '3. Dampak & Akhir', icon: 'balance-scale-right' }
                                ].map((item) => (
                                    <button 
                                        key={item.id}
                                        onClick={() => setSubMateri(item.id as any)}
                                        className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                                            subMateri === item.id 
                                            ? 'bg-[#171717] border-history-gold text-history-gold shadow-[0_0_20px_rgba(234,179,8,0.1)]' 
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
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Stabilisasi Politik</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Politik tidak boleh gaduh, agar pembangunan lancar."</p>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-history-gold">
                                                    <h4 className="font-bold text-history-gold text-lg mb-2">Fusi Partai (1973)</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed mb-4">
                                                        Penyederhanaan partai politik menjadi 3 kekuatan besar:
                                                    </p>
                                                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                                        <div className="bg-green-900/30 p-2 rounded border border-green-500 text-green-400 font-bold">PPP<br/>(Islam)</div>
                                                        <div className="bg-yellow-900/30 p-2 rounded border border-yellow-500 text-yellow-400 font-bold">GOLKAR<br/>(Karya)</div>
                                                        <div className="bg-red-900/30 p-2 rounded border border-red-500 text-red-400 font-bold">PDI<br/>(Nasionalis)</div>
                                                    </div>
                                                </div>

                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white text-lg mb-2">Dwifungsi ABRI</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Tentara memiliki dua peran: <strong>Pertahanan Keamanan (Hankam)</strong> dan <strong>Sosial Politik</strong>. 
                                                        Banyak jabatan sipil (Gubernur, Bupati, Menteri) diisi oleh anggota militer aktif.
                                                    </p>
                                                </div>

                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white text-lg mb-2">Indoktrinasi P4</h4>
                                                    <p className="text-history-brown text-sm leading-relaxed">
                                                        Pedoman Penghayatan dan Pengamalan Pancasila. Setiap siswa, mahasiswa, dan pegawai negeri wajib mengikuti penataran P4 untuk menyeragamkan pemahaman ideologi.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'ekonomi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Pembangunan Ekonomi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Trilogi Pembangunan: Stabilitas, Pertumbuhan, Pemerataan.</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-history-gold/10 mb-6 text-center">
                                                <i className="fas fa-seedling text-green-500 text-5xl mb-4"></i>
                                                <h4 className="font-bold text-green-400 text-xl mb-2">Revolusi Hijau</h4>
                                                <p className="text-history-brown text-sm leading-relaxed">
                                                    Modernisasi pertanian dengan bibit unggul, pupuk, dan irigasi. Hasilnya luar biasa: Indonesia yang tadinya pengimpor beras terbesar dunia, berhasil mencapai <strong>Swasembada Beras</strong> pada tahun 1984.
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white mb-2">REPELITA</h4>
                                                    <p className="text-xs text-history-muted">Rencana Pembangunan Lima Tahun. Fokus bertahap mulai dari pertanian hingga industri.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10">
                                                    <h4 className="font-bold text-white mb-2">Utang Luar Negeri</h4>
                                                    <p className="text-xs text-history-muted">Pembangunan dibiayai oleh IGGI (Inter-Governmental Group on Indonesia) dan hasil minyak bumi (Oil Boom).</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'dampak' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Dampak & Akhir</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Keberhasilan fisik vs Kerapuhan mental.</p>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-green-500">
                                                    <h4 className="font-bold text-green-500 text-lg mb-2"><i className="fas fa-check-circle mr-2"></i>Dampak Positif</h4>
                                                    <ul className="text-history-brown text-sm space-y-2 list-disc list-inside">
                                                        <li>Pertumbuhan ekonomi tinggi (Rata-rata 7% per tahun).</li>
                                                        <li>Angka buta huruf menurun drastis (SD Inpres).</li>
                                                        <li>Keluarga Berencana (KB) sukses mengendalikan penduduk.</li>
                                                        <li>Keamanan negara stabil.</li>
                                                    </ul>
                                                </div>

                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-red-500">
                                                    <h4 className="font-bold text-red-500 text-lg mb-2"><i className="fas fa-times-circle mr-2"></i>Dampak Negatif</h4>
                                                    <ul className="text-history-brown text-sm space-y-2 list-disc list-inside">
                                                        <li>Otokrasi: Kebebasan berpendapat dibungkam.</li>
                                                        <li>KKN (Korupsi, Kolusi, Nepotisme) merajalela.</li>
                                                        <li>Kesenjangan sosial melebar (Konglomerasi).</li>
                                                        <li>Ketergantungan pada utang luar negeri.</li>
                                                    </ul>
                                                </div>
                                                
                                                <p className="text-history-muted text-center text-sm italic mt-4">
                                                    Fondasi ekonomi yang rapuh akibat KKN akhirnya runtuh saat <strong>Krisis Moneter 1997/1998</strong>, memicu Reformasi.
                                                </p>
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Policy Simulator</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Bapak Pembangunan</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Seimbangkan Ekonomi, Stabilitas, dan Demokrasi.</p>
                        </div>
                        <PolicySimulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic13 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Uji wawasanmu tentang Pemerintahan Orde Baru.</p>
                        </div>
                        <QuizPemerintahanOrba />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic13;