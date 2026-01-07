import React, { useState } from 'react';
import { MindfulnessProklamasi, ProklamasiSimulation, QuizProklamasi, LKPDTopic4 } from '../components/Topic4Components';

const Topic4: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'kuis'>('materi');
    const [subMateri, setSubMateri] = useState<'rengasdengklok' | 'perumusan' | 'proklamasi'>('rengasdengklok');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-gold/20 mb-6 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                    <i className="fas fa-bullhorn text-4xl text-history-gold animate-pulse-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Detik-Detik Proklamasi</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Ketika Waktu Berhenti dan Sejarah Terukir"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-3xl mx-auto border-l-4 border-l-history-gold">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-gold uppercase tracking-widest flex items-center"><i className="fas fa-stopwatch mr-3"></i>Mindfulness</h3>
                    <MindfulnessProklamasi />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-history-gold/10 pb-4 max-w-4xl mx-auto">
                {[
                    { id: 'materi', icon: 'book-open', label: 'Materi' },
                    { id: 'simulasi', icon: 'vr-cardboard', label: 'Simulasi RPG' },
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
                                onClick={() => window.open('https://drive.google.com/file/d/1419fNbyvbihxwIZHV28yiDfoN1KRmGoK/view?usp=sharing', '_blank')}
                                className="px-6 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu for Materi */}
                            <div className="md:col-span-3 space-y-3 sticky top-24 h-fit">
                                {[
                                    { id: 'rengasdengklok', label: '1. Rengasdengklok', time: '16 Agustus' },
                                    { id: 'perumusan', label: '2. Perumusan Naskah', time: '16 Agustus Malam' },
                                    { id: 'proklamasi', label: '3. Proklamasi', time: '17 Agustus Pagi' }
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
                                            <span className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{item.time}</span>
                                            <span className="font-sans font-bold text-sm uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        {subMateri === item.id && <div className="absolute right-0 top-0 h-full w-1 bg-history-gold"></div>}
                                    </button>
                                ))}
                            </div>

                            {/* Materi Content Area */}
                            <div className="md:col-span-9">
                                <div className="glass-card p-8 md:p-12 rounded-3xl min-h-[600px] relative overflow-hidden">
                                    
                                    {subMateri === 'rengasdengklok' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-history-brown uppercase tracking-wide">Drama Rengasdengklok</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">"Ketegangan antara dua generasi demi satu tujuan."</p>
                                            </div>
                                            
                                            {/* Image */}
                                            <div className="w-full relative group">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                                                <img 
                                                    src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1502772709/nggsmyhr8sznni6rocpv.jpg" 
                                                    alt="Markas PETA Rengasdengklok" 
                                                    className="w-full h-[400px] object-cover rounded-xl border border-history-gold/10"
                                                />
                                                <p className="absolute bottom-4 left-4 text-xs text-history-gold uppercase tracking-widest bg-black/50 px-3 py-1 rounded backdrop-blur-sm">Markas PETA Rengasdengklok</p>
                                            </div>

                                            <div className="prose prose-lg text-history-muted font-light leading-relaxed max-w-none">
                                                <p>
                                                    Berita kekalahan Jepang (15 Agustus 1945) sampai ke telinga pemuda melalui radio BBC. Terjadi <strong className="text-history-gold">Vacuum of Power</strong> (Kekosongan Kekuasaan).
                                                </p>
                                                <div className="bg-[#171717] p-6 rounded-lg border-l-4 border-history-red my-6">
                                                    <h4 className="text-history-red font-bold uppercase tracking-wide text-sm mb-2">Konflik Pendapat</h4>
                                                    <ul className="space-y-2">
                                                        <li><strong className="text-white">Golongan Tua (Soekarno-Hatta):</strong> Ingin proklamasi lewat PPKI agar tidak terjadi pertumpahan darah dengan Jepang.</li>
                                                        <li><strong className="text-white">Golongan Muda (Sukarni, Wikana):</strong> Menolak PPKI karena dianggap buatan Jepang. Ingin proklamasi segera dengan kekuatan sendiri.</li>
                                                    </ul>
                                                </div>
                                                <p>
                                                    Akhirnya, Soekarno dan Hatta "diamankan" ke Rengasdengklok agar terhindar dari pengaruh Jepang. Konflik reda setelah <strong>Ahmad Soebardjo</strong> datang menjemput dan menjaminkan nyawanya bahwa proklamasi akan dilaksanakan besok.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'perumusan' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-history-gold uppercase tracking-wide">Malam Perumusan</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Rumah Laksamana Maeda, Jl. Imam Bonjol No. 1</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                                <img 
                                                    src="https://tagar.co/wp-content/uploads/2025/08/teks-proklamasi-asli.jpg" 
                                                    alt="Naskah Proklamasi Klad" 
                                                    className="w-full rounded-xl border border-white/10 shadow-lg rotate-2 hover:rotate-0 transition duration-500"
                                                />
                                                <div className="space-y-4">
                                                    <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/10">
                                                        <h4 className="font-bold text-history-brown mb-2 uppercase text-sm tracking-wide">Peran Tokoh</h4>
                                                        <ul className="text-history-muted space-y-2 text-sm">
                                                            <li>• <strong>Soekarno:</strong> Menulis konsep naskah.</li>
                                                            <li>• <strong>Hatta & Soebardjo:</strong> Menyumbangkan ide kalimat.</li>
                                                            <li>• <strong>Sukarni:</strong> Mengusulkan penandatangan (Soekarno-Hatta).</li>
                                                            <li>• <strong>Sayuti Melik:</strong> Mengetik naskah.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-[#0a0a0a] p-8 rounded-xl border border-history-gold/20 text-center mt-6">
                                                <i className="fas fa-quote-left text-history-gold/30 text-4xl mb-4 block"></i>
                                                <p className="font-serif text-xl md:text-2xl text-history-brown italic leading-relaxed">
                                                    "Kami bangsa Indonesia dengan ini menjatakan Kemerdekaan Indonesia..."
                                                </p>
                                                <p className="text-xs text-history-muted mt-4 uppercase tracking-widest">Kalimat Pertama (Sumbangan Ahmad Soebardjo)</p>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'proklamasi' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-6 mb-6">
                                                <h3 className="text-3xl md:text-4xl font-sans font-bold text-white uppercase tracking-wide">17 Agustus 1945</h3>
                                                <p className="text-history-muted italic text-lg mt-3 font-light">Pegangsaan Timur 56, Jakarta. Pukul 10.00 WIB.</p>
                                            </div>

                                            <div className="w-full relative group">
                                                <img 
                                                    src="https://assetd.kompas.id/Yvfbciw3ozq4-GIMefXU4VzI4CE=/1024x654/smart/filters:format(webp):quality(75)/https://kompaspedia.kompas.id/wp-content/uploads/2020/08/PEMBACAAN-NASKAH-PROKLAMASI1-08-scaled.jpg" 
                                                    alt="Pembacaan Proklamasi" 
                                                    className="w-full h-[500px] object-cover rounded-xl border border-history-gold/10 grayscale contrast-125"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90"></div>
                                                <div className="absolute bottom-8 left-8 right-8 text-center">
                                                    <p className="text-white text-lg font-light italic">
                                                        "Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan dengan tjara saksama dan dalam tempo jang sesingkat-singkatnja."
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-red/20 text-center">
                                                    <i className="fas fa-flag text-history-red text-2xl mb-3"></i>
                                                    <h5 className="font-bold text-white text-sm uppercase tracking-wide mb-2">Sang Saka</h5>
                                                    <p className="text-xs text-history-muted">Dijahit oleh Ibu Fatmawati. Dikibarkan oleh Latief Hendraningrat & Suhud.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/20 text-center">
                                                    <i className="fas fa-microphone text-history-gold text-2xl mb-3"></i>
                                                    <h5 className="font-bold text-white text-sm uppercase tracking-wide mb-2">Penyebaran</h5>
                                                    <p className="text-xs text-history-muted">Berita disebar lewat radio Domei (Waidan B. Palenewen) dan koran Soeara Asia.</p>
                                                </div>
                                                <div className="bg-[#171717] p-6 rounded-xl border border-blue-500/20 text-center">
                                                    <i className="fas fa-users text-blue-400 text-2xl mb-3"></i>
                                                    <h5 className="font-bold text-white text-sm uppercase tracking-wide mb-2">Dukungan</h5>
                                                    <p className="text-xs text-history-muted">Sri Sultan Hamengkubuwono IX segera mengirim telegram dukungan.</p>
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
                            <span className="bg-history-gold text-[#0a0a0a] px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">Roleplay Game</span>
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Misi: Selamatkan Proklamasi</h3>
                            <p className="text-history-muted mt-3 font-light text-lg">Ambil keputusan sebagai pemuda di tahun 1945. Salah langkah, sejarah berubah.</p>
                        </div>
                        <ProklamasiSimulation />
                    </div>
                )}

                 {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic4 />
                    </div>
                )}

                {activeTab === 'kuis' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-3xl font-bold text-history-brown uppercase tracking-widest">Evaluasi Pemahaman</h3>
                            <p className="text-history-muted mt-3 font-light">Seberapa detail ingatanmu tentang detik-detik bersejarah ini?</p>
                        </div>
                        <QuizProklamasi />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic4;