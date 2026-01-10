import React, { useState } from 'react';
import { MindfulnessDiplomasi, DiplomatSimulation, QuizDiplomasi, LKPDTopic6 } from '../components/Topic6Components';

const Topic6: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'linggarjati' | 'renville' | 'roemroyen' | 'kmb'>('linggarjati');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-gold/20 mb-6 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                    <i className="fas fa-file-signature text-4xl text-history-gold animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Dari Meja Perundingan <br/> Menuju Kedaulatan</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Diplomasi: Perjuangan Tanpa Peluru"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-gold">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-gold uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessDiplomasi />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {[
                    { id: 'materi', icon: 'book-open', label: 'Materi' },
                    { id: 'simulasi', icon: 'chess-king', label: 'Simulasi Diplomat' },
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
                                onClick={() => window.open('https://drive.google.com/file/d/1Q4pzmIXxU0sbeI2WfKJHYIuJgnwVEQ2A/view?usp=drive_link', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'linggarjati', label: '1. Perjanjian Linggarjati', year: '1946' },
                                    { id: 'renville', label: '2. Perjanjian Renville', year: '1948' },
                                    { id: 'roemroyen', label: '3. Perjanjian Roem-Royen', year: '1949' },
                                    { id: 'kmb', label: '4. Konferensi Meja Bundar', year: '1949' }
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
                                        <div className="relative z-10">
                                            <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{item.year}</span>
                                            <span className="font-sans font-bold text-sm uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        {subMateri === item.id && <div className="absolute right-0 top-0 h-full w-1 bg-history-gold"></div>}
                                    </button>
                                ))}
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-9">
                                <div className="glass-card p-8 md:p-12 rounded-3xl min-h-[600px] relative overflow-hidden">
                                    
                                    {subMateri === 'linggarjati' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-brown uppercase tracking-wide">Awal Pengakuan Dunia</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Wilayah menyempit, tapi bendera kita mulai dikenal."</p>
                                            </div>
                                            
                                            <img 
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Sutan_Sjahrir_menulis.jpg/220px-Sutan_Sjahrir_menulis.jpg" 
                                                alt="Sutan Sjahrir" 
                                                className="w-full h-[350px] object-cover rounded-xl border border-history-gold/10 grayscale-[30%]"
                                            />
                                            <p className="text-xs text-center text-history-muted uppercase tracking-widest">Sutan Sjahrir - Arsitek Diplomasi Indonesia</p>

                                            <div className="prose prose-lg text-history-muted font-light leading-relaxed max-w-none">
                                                <p>
                                                    Dalam perundingan ini, Belanda hanya mengakui kekuasaan RI secara <em>de facto</em> atas <strong>Jawa, Sumatera, dan Madura</strong>. Keputusan ini memicu protes keras di dalam negeri karena dianggap "menjual" wilayah. Namun bagi Sjahrir, ini adalah pintu masuk agar RI bisa sejajar duduk di forum internasional.
                                                </p>
                                                <div className="bg-[#171717] p-6 rounded-lg border-l-4 border-history-gold my-6">
                                                    <h4 className="text-history-gold font-bold uppercase tracking-wide text-sm mb-2">Hasil Penting</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li>• Pengakuan De Facto (Jawa, Sumatera, Madura).</li>
                                                        <li>• Pembentukan RIS (Republik Indonesia Serikat).</li>
                                                        <li>• Uni Indonesia-Belanda di bawah Ratu Belanda.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'renville' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-red/20 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-red uppercase tracking-wide">Masa Paling Kritis</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Mundur selangkah untuk maju seribu langkah."</p>
                                            </div>

                                            <div className="w-full bg-[#0a0a0a] p-4 rounded-xl border border-history-gold/20">
                                                <div className="h-64 flex items-center justify-center bg-[#171717] rounded mb-4">
                                                    <i className="fas fa-ship text-6xl text-history-muted opacity-50"></i>
                                                </div>
                                                <p className="text-center text-sm text-history-gold uppercase tracking-widest font-bold">Kapal USS Renville (Netral)</p>
                                            </div>

                                            <p className="text-lg text-history-brown leading-relaxed font-light">
                                                Dilakukan di atas kapal perang Amerika Serikat. Hasilnya sangat merugikan: Wilayah RI semakin sempit karena adanya <strong>Garis Van Mook</strong>. TNI (Divisi Siliwangi) dipaksa <em>Hijrah</em> dari Jawa Barat ke Yogyakarta (Long March). Ini adalah pil pahit yang harus ditelan demi menjaga eksistensi tentara.
                                            </p>
                                        </div>
                                    )}

                                    {subMateri === 'roemroyen' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Titik Balik Diplomasi</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Gencatan senjata menuju perdamaian."</p>
                                            </div>

                                            <div className="bg-[#171717] p-8 rounded-xl border border-white/10">
                                                <div className="flex items-start mb-6">
                                                    <i className="fas fa-handshake text-3xl text-history-gold mr-4"></i>
                                                    <div>
                                                        <h4 className="font-bold text-white text-lg uppercase tracking-wide mb-1">Hasil Perjanjian</h4>
                                                        <p className="text-history-muted text-sm leading-relaxed">
                                                            Pemerintahan RI kembali ke Yogyakarta. Soekarno-Hatta dibebaskan dari pengasingan. Kedua belah pihak sepakat gencatan senjata dan bersiap menuju KMB.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'kmb' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-white/20 pb-6 mb-6">
                                                <h3 className="text-3xl font-sans font-bold text-white uppercase tracking-wide">Puncak Kedaulatan</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Den Haag, 23 Agustus - 2 November 1949</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/30">
                                                    <h4 className="font-bold text-history-gold uppercase mb-3 text-sm">Kesepakatan</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Belanda menyerahkan kedaulatan kepada RIS. Masalah Irian Barat ditunda 1 tahun.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-red/30">
                                                    <h4 className="font-bold text-history-red uppercase mb-3 text-sm">Beban Berat</h4>
                                                    <p className="text-history-muted text-sm leading-relaxed">
                                                        Indonesia harus menanggung hutang Hindia Belanda sebesar 4,3 Miliar Gulden.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-8 bg-gradient-to-r from-[#0a0a0a] to-[#171717] p-8 rounded-xl border border-history-gold/10">
                                                <div className="flex items-center mb-4">
                                                    <i className="fas fa-users text-history-gold text-2xl mr-3"></i>
                                                    <h4 className="font-bold text-white text-lg">Integrasi: Kembali ke NKRI</h4>
                                                </div>
                                                <p className="text-history-brown italic font-light text-lg mb-4">
                                                    RIS bubar pada 17 Agustus 1950 berkat "Mosi Integral" dari <strong>Mohammad Natsir</strong>. Kita kembali menjadi Negara Kesatuan Republik Indonesia.
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Strategy Game</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Diplomat Ulung</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Bisakah kamu mempertahankan Indonesia di meja perundingan?</p>
                        </div>
                        <DiplomatSimulation />
                    </div>
                )}

                 {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic6 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa tajam ingatanmu tentang sejarah diplomasi bangsa?</p>
                        </div>
                        <QuizDiplomasi />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic6;