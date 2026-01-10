import React, { useState } from 'react';
import { MindfulnessTirani, VillageSimulation, QuizTirani, LKPDTopic2 } from '../components/Topic2Components';

const Topic2: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full border border-history-red/20 mb-6 bg-[#171717]">
                    <i className="fas fa-certificate text-4xl text-history-red opacity-80 animate-spin-slow"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Tirani Matahari Terbit</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Antara Janji Kemerdekaan dan Realita Penindasan"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-4xl mx-auto relative overflow-hidden border-l-4 border-l-history-red">
                    <h3 className="font-sans text-lg font-bold mb-4 text-history-red uppercase tracking-widest relative z-10">Mindfulness</h3>
                    <MindfulnessTirani />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-history-gold/10 pb-1">
                <button 
                    onClick={() => setActiveTab('materi')}
                    className={`px-8 py-3 font-bold transition text-sm uppercase tracking-widest ${activeTab === 'materi' ? 'text-history-gold border-b-2 border-history-gold' : 'text-history-muted hover:text-history-brown'}`}
                >
                    <i className="fas fa-book-open mr-2 text-xs"></i> Materi
                </button>
                <button 
                    onClick={() => setActiveTab('simulasi')}
                    className={`px-8 py-3 font-bold transition text-sm uppercase tracking-widest ${activeTab === 'simulasi' ? 'text-history-gold border-b-2 border-history-gold' : 'text-history-muted hover:text-history-brown'}`}
                >
                    <i className="fas fa-gamepad mr-2 text-xs"></i> Simulasi RPG
                </button>
                <button 
                    onClick={() => setActiveTab('lkpd')}
                    className={`px-8 py-3 font-bold transition text-sm uppercase tracking-widest ${activeTab === 'lkpd' ? 'text-history-gold border-b-2 border-history-gold' : 'text-history-muted hover:text-history-brown'}`}
                >
                    <i className="fas fa-file-alt mr-2 text-xs"></i> LKPD
                </button>
                <button 
                    onClick={() => setActiveTab('evaluasi')}
                    className={`px-8 py-3 font-bold transition text-sm uppercase tracking-widest ${activeTab === 'evaluasi' ? 'text-history-gold border-b-2 border-history-gold' : 'text-history-muted hover:text-history-brown'}`}
                >
                    <i className="fas fa-pencil-alt mr-2 text-xs"></i> Evaluasi
                </button>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-6xl mx-auto">
                {activeTab === 'materi' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Download Button */}
                        <div className="bg-[#171717] p-6 rounded-2xl border border-history-red/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
                            <div>
                                <h4 className="text-history-red font-bold uppercase tracking-widest text-sm mb-1"><i className="fas fa-file-pdf mr-2"></i>Bahan Ajar Digital</h4>
                                <p className="text-history-muted text-xs">Unduh materi lengkap dalam format PDF untuk dipelajari secara offline.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1DZlagVTOCIBwPI70HVLHtx22YPv0QyIF/view?usp=sharing', '_blank')}
                                className="px-6 py-3 bg-history-red text-white rounded hover:bg-red-700 transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        {/* Section 1: Eksploitasi Ekonomi */}
                        <div className="glass-card p-10 rounded-2xl border border-history-gold/10">
                            <h3 className="text-2xl font-sans font-bold text-history-brown mb-8 pb-4 border-b border-history-gold/20 uppercase tracking-wide">1. Ekonomi Perang & Penderitaan Rakyat</h3>
                            <div className="flex flex-col md:flex-row gap-10 items-start">
                                {/* ENLARGED IMAGE */}
                                <div className="w-full md:w-5/12">
                                    <div className="border border-history-gold/20 p-2 bg-[#0a0a0a] rounded-lg">
                                        <img 
                                            src="https://kompaspedia.kompas.id/wp-content/uploads/2024/03/Foto-5-.jpg" 
                                            alt="Penderitaan Rakyat Masa Jepang" 
                                            className="w-full h-[500px] object-cover grayscale-[30%]"
                                        />
                                    </div>
                                    <p className="text-xs text-center mt-3 text-history-muted uppercase tracking-widest">Krisis pangan di desa</p>
                                </div>
                                <div className="w-full md:w-7/12 space-y-6 text-lg text-history-muted font-light leading-relaxed">
                                    <p>Jepang menerapkan sistem <strong>Autarki</strong>, di mana setiap daerah harus memenuhi kebutuhannya sendiri dan menyetor untuk perang. Akibatnya sangat fatal bagi kesejahteraan:</p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start bg-[#171717] p-4 rounded border border-history-gold/5">
                                            <i className="fas fa-seedling text-history-red mt-1 mr-4 text-lg"></i>
                                            <div><strong className="text-history-gold block mb-1 font-sans text-sm uppercase tracking-wide">Wajib Serah Padi</strong> Petani hanya boleh menyimpan sedikit padi, sisanya untuk Jepang.</div>
                                        </li>
                                        <li className="flex items-start bg-[#171717] p-4 rounded border border-history-gold/5">
                                            <i className="fas fa-tshirt text-history-red mt-1 mr-4 text-lg"></i>
                                            <div><strong className="text-history-gold block mb-1 font-sans text-sm uppercase tracking-wide">Krisis Sandang</strong> Kain sulit didapat. Rakyat memakai karung goni yang menyebabkan penyakit kulit (kudis).</div>
                                        </li>
                                        <li className="flex items-start bg-[#171717] p-4 rounded border border-history-gold/5">
                                            <i className="fas fa-plane text-history-red mt-1 mr-4 text-lg"></i>
                                            <div><strong className="text-history-gold block mb-1 font-sans text-sm uppercase tracking-wide">Tanaman Jarak</strong> Ladang padi diganti tanaman Jarak untuk pelumas mesin pesawat tempur.</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Mobilisasi Sosial */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#171717] p-8 rounded-2xl border-l-4 border-history-red hover:bg-[#1c1c1c] transition">
                                <h4 className="font-sans font-bold text-xl mb-4 text-history-red flex items-center uppercase tracking-wide"><i className="fas fa-users-cog mr-3"></i>Romusha</h4>
                                <p className="text-history-muted text-lg leading-relaxed font-light">
                                    Jutaan rakyat dikerahkan untuk membangun jalan, goa pertahanan, dan lapangan terbang. Banyak yang meninggal karena kelaparan dan penyakit. Mereka dijuluki "Prajurit Ekonomi".
                                </p>
                            </div>
                            <div className="bg-[#171717] p-8 rounded-2xl border-l-4 border-history-gold hover:bg-[#1c1c1c] transition">
                                <h4 className="font-sans font-bold text-xl mb-4 text-history-gold flex items-center uppercase tracking-wide"><i className="fas fa-shield-alt mr-3"></i>Militerisasi</h4>
                                <p className="text-history-muted text-lg leading-relaxed font-light">
                                    Jepang melatih pemuda Indonesia memegang senjata (Seinendan, Keibodan, Heiho, PETA). Tujuannya untuk membantu Jepang, namun kelak menjadi modal utama <strong>TNI</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Section 3: Organisasi Pergerakan */}
                        <div className="bg-[#0a0a0a] p-10 rounded-3xl border border-history-gold/10">
                            <h3 className="text-2xl font-sans font-bold text-history-brown mb-10 text-center uppercase tracking-widest">Evolusi Organisasi Masa Jepang</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-[#171717] p-8 rounded-xl border border-history-gold/5 hover:border-history-red transition duration-500 group">
                                    <div className="text-xs font-bold text-history-muted mb-3 tracking-[0.2em] group-hover:text-history-red">1942</div>
                                    <h5 className="font-sans font-bold text-xl text-history-red mb-2 uppercase">Gerakan 3A</h5>
                                    <p className="text-xs text-history-muted font-light leading-relaxed">Gagal karena kurang diminati rakyat.</p>
                                </div>
                                <div className="bg-[#171717] p-8 rounded-xl border border-history-gold/30 hover:bg-[#1c1c1c] transition duration-500 transform scale-105 z-10 shadow-xl">
                                    <div className="text-xs font-bold text-history-gold mb-3 tracking-[0.2em]">1943</div>
                                    <h5 className="font-sans font-bold text-xl text-history-gold mb-2 uppercase">Putera</h5>
                                    <p className="text-xs text-history-muted font-light leading-relaxed">Dipimpin 4 Serangkai. Dimanfaatkan untuk nasionalisme.</p>
                                </div>
                                <div className="bg-[#171717] p-8 rounded-xl border border-history-gold/5 hover:border-white transition duration-500 group">
                                    <div className="text-xs font-bold text-history-muted mb-3 tracking-[0.2em] group-hover:text-white">1944</div>
                                    <h5 className="font-sans font-bold text-xl text-white mb-2 uppercase">Jawa Hokokai</h5>
                                    <p className="text-xs text-history-muted font-light leading-relaxed">Organisasi paling ketat, langsung di bawah militer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'simulasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <VillageSimulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic2 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-3xl mx-auto">
                        <QuizTirani />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic2;