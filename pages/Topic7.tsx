import React, { useState } from 'react';
import { MindfulnessIntegrasi, NkriRescueSimulation, LKPDTopic7, QuizIntegrasi } from '../components/Topic7Components';

const Topic7: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'ideologi' | 'kepentingan' | 'sistem' | 'tokoh'>('ideologi');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-blue-500/20 mb-6 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                    <i className="fas fa-hand-holding-heart text-4xl text-blue-500 animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Menjaga Keutuhan NKRI</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Sejarah bukan hanya kenangan, tapi pelajaran untuk persatuan."</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-blue-500">
                    <h3 className="font-sans text-sm font-bold mb-4 text-blue-500 uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessIntegrasi />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {[
                    { id: 'materi', icon: 'book-open', label: 'Materi' },
                    { id: 'simulasi', icon: 'gamepad', label: 'Simulasi NKRI' },
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
                                onClick={() => window.open('https://drive.google.com/file/d/1WirtvJQ6zMM53E9FNKdTlwGWRmh7YQ82/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'ideologi', label: '1. Konflik Ideologi', icon: 'star' },
                                    { id: 'kepentingan', label: '2. Konflik Kepentingan', icon: 'money-bill-wave' },
                                    { id: 'sistem', label: '3. Sistem Pemerintahan', icon: 'balance-scale' },
                                    { id: 'tokoh', label: '4. Tokoh Integrasi', icon: 'user-tie' }
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
                                    
                                    {subMateri === 'ideologi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-red-500/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-red-500 uppercase tracking-wide">Konflik Ideologi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Ancaman mengganti Pancasila dengan ideologi lain (Komunis & Agama).</p>
                                            </div>
                                            
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-red-600">
                                                    <h4 className="font-bold text-red-500 text-lg mb-2">PKI Madiun (1948)</h4>
                                                    <ul className="text-history-muted text-sm space-y-2">
                                                        <li><strong>Tokoh:</strong> Musso & Amir Sjarifuddin.</li>
                                                        <li><strong>Tujuan:</strong> Mendirikan Republik Soviet Indonesia.</li>
                                                        <li><strong>Penyelesaian:</strong> Operasi Militer Divisi Siliwangi.</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-green-600">
                                                    <h4 className="font-bold text-green-500 text-lg mb-2">DI/TII (Darul Islam)</h4>
                                                    <ul className="text-history-muted text-sm space-y-2">
                                                        <li><strong>Tokoh:</strong> Kartosuwiryo (Jabar), Kahar Muzakkar (Sulsel).</li>
                                                        <li><strong>Tujuan:</strong> Mendirikan Negara Islam Indonesia (NII).</li>
                                                        <li><strong>Penyelesaian:</strong> Operasi Pagar Betis & Baratayudha.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'kepentingan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Konflik Kepentingan</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Vested Interest": Masalah pasukan KNIL yang menolak masuk TNI.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10 hover:border-history-gold transition">
                                                    <h4 className="font-bold text-white text-lg mb-1">APRA (Angkatan Perang Ratu Adil) - 1950</h4>
                                                    <p className="text-history-muted text-sm">Dipimpin Raymond Westerling. Memanfaatkan mitos Ratu Adil untuk menyerang Bandung.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10 hover:border-history-gold transition">
                                                    <h4 className="font-bold text-white text-lg mb-1">Andi Aziz - 1950</h4>
                                                    <p className="text-history-muted text-sm">Menolak kedatangan TNI ke Makassar. Ingin mempertahankan Negara Indonesia Timur (NIT).</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-white/10 hover:border-history-gold transition">
                                                    <h4 className="font-bold text-white text-lg mb-1">RMS (Republik Maluku Selatan) - 1950</h4>
                                                    <p className="text-history-muted text-sm">Dipimpin Dr. Soumokil. Gerakan separatisme murni yang ingin lepas dari NKRI.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'sistem' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-blue-500/30 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-blue-500 uppercase tracking-wide">Sistem Pemerintahan</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Ketimpangan pembangunan antara Pusat dan Daerah.</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10">
                                                <h4 className="font-bold text-white text-xl mb-4">PRRI & Permesta (1958)</h4>
                                                <p className="text-history-brown mb-6 font-light leading-relaxed">
                                                    Bukan ingin memisahkan diri, tapi sebagai <strong>koreksi</strong> terhadap pemerintah pusat yang dianggap "Jawa Sentris". Muncul dewan-dewan daerah di Sumatera dan Sulawesi (Dewan Banteng, Gajah, Garuda).
                                                </p>
                                                <div className="bg-[#0a0a0a] p-4 rounded border border-history-gold/10">
                                                    <p className="text-xs text-history-muted"><strong>Penyelesaian:</strong> Kombinasi Operasi Militer (Operasi 17 Agustus) dan Diplomasi (Pemberian Amnesti/Pengampunan).</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'tokoh' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-white/20 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-white uppercase tracking-wide">Pahlawan Integrasi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Mereka yang berjuang menyatukan kepingan Nusantara.</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/10 hover:border-history-gold transition hover:-translate-y-2 duration-300">
                                                    <div className="w-16 h-16 bg-[#0a0a0a] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">🏝️</div>
                                                    <h4 className="font-bold text-history-gold text-sm mb-2">Frans Kaisiepo</h4>
                                                    <p className="text-xs text-history-muted">Pahlawan Papua, mempopulerkan nama "Irian" (Ikut Republik Indonesia Anti Nederland).</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/10 hover:border-history-gold transition hover:-translate-y-2 duration-300">
                                                    <div className="w-16 h-16 bg-[#0a0a0a] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">👑</div>
                                                    <h4 className="font-bold text-history-gold text-sm mb-2">Sultan HB IX</h4>
                                                    <p className="text-xs text-history-muted">Raja Yogyakarta yang menyumbangkan hartanya untuk operasional awal Republik Indonesia.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/10 hover:border-history-gold transition hover:-translate-y-2 duration-300">
                                                    <div className="w-16 h-16 bg-[#0a0a0a] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">🧕</div>
                                                    <h4 className="font-bold text-history-gold text-sm mb-2">Opu Daeng Risaju</h4>
                                                    <p className="text-xs text-history-muted">Wanita pejuang tangguh dari Sulawesi Selatan yang memobilisasi pemuda melawan NICA.</p>
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
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Misi: Penyelamat NKRI</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Kamu adalah staf khusus Presiden. Bisakah kamu mengambil keputusan tepat saat negara terancam pecah?</p>
                        </div>
                        <NkriRescueSimulation />
                    </div>
                )}

                 {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic7 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa paham kamu tentang upaya menjaga keutuhan bangsa?</p>
                        </div>
                        <QuizIntegrasi />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic7;