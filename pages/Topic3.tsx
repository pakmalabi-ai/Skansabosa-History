import React, { useState } from 'react';
import { MindfulnessGate, IndependenceSimulation, QuizGate, LKPDTopic3 } from '../components/Topic3Components';

const Topic3: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'lkpd' | 'evaluasi'>('materi');
    const [subMateri, setSubMateri] = useState<'jepang' | 'bpupki' | 'ppki'>('jepang');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-10 mb-16 px-4">
                <div className="inline-block p-6 rounded-full bg-[#171717] border border-history-gold/20 mb-6">
                    <i className="fas fa-door-open text-4xl text-history-gold"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-4 leading-tight">Menuju Gerbang Kemerdekaan</h2>
                <div className="w-24 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-8 italic font-sans font-light">"Antara Penderitaan dan Harapan Bangsa"</p>
                
                <div className="glass-card p-10 rounded-2xl text-left max-w-4xl mx-auto border-l-4 border-l-history-red">
                    <h3 className="font-sans text-sm font-bold mb-4 text-history-red uppercase tracking-widest flex items-center"><i className="fas fa-brain mr-3"></i>Mindfulness</h3>
                    <MindfulnessGate />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-history-gold/10 pb-1">
                <button 
                    onClick={() => setActiveTab('materi')}
                    className={`px-8 py-3 font-bold transition text-sm uppercase tracking-widest ${activeTab === 'materi' ? 'text-history-gold border-b-2 border-history-gold' : 'text-history-muted hover:text-history-brown'}`}
                >
                    <i className="fas fa-book-reader mr-2 text-xs"></i> Materi
                </button>
                <button 
                    onClick={() => setActiveTab('simulasi')}
                    className={`px-8 py-3 font-bold transition text-sm uppercase tracking-widest ${activeTab === 'simulasi' ? 'text-history-gold border-b-2 border-history-gold' : 'text-history-muted hover:text-history-brown'}`}
                >
                    <i className="fas fa-chess-knight mr-2 text-xs"></i> Simulasi
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
                    <i className="fas fa-tasks mr-2 text-xs"></i> Evaluasi
                </button>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-4">
                {activeTab === 'materi' && (
                    <div className="animate-fade-in space-y-8">
                        {/* Download Button */}
                        <div className="bg-[#171717] p-6 rounded-2xl border border-history-red/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mb-8">
                            <div>
                                <h4 className="text-history-red font-bold uppercase tracking-widest text-sm mb-1"><i className="fas fa-file-pdf mr-2"></i>Bahan Ajar Digital</h4>
                                <p className="text-history-muted text-xs">Unduh materi lengkap dalam format PDF untuk dipelajari secara offline.</p>
                            </div>
                            <button 
                                onClick={() => window.open('https://drive.google.com/file/d/1cslrVvtP_TH3DZi49d14Q1fIyEjfyppI/view?usp=sharing', '_blank')}
                                className="px-6 py-3 bg-history-red text-white rounded hover:bg-red-700 transition font-bold uppercase tracking-widest text-xs flex items-center shadow-md whitespace-nowrap"
                            >
                                <i className="fas fa-download mr-2"></i> Download PDF
                            </button>
                        </div>

                        <div className="grid md:grid-cols-12 gap-10">
                            {/* Sidebar Menu for Materi */}
                            <div className="md:col-span-3 space-y-2">
                                <button 
                                    onClick={() => setSubMateri('jepang')}
                                    className={`w-full text-left p-5 rounded-lg border-l-2 transition-all flex items-center justify-between group shadow-lg ${subMateri === 'jepang' ? 'bg-[#171717] text-history-gold border-history-red' : 'bg-transparent text-history-muted border-transparent hover:bg-[#171717]'}`}
                                >
                                    <span className={`font-sans font-bold text-sm uppercase tracking-wide`}>1. Dampak Pendudukan</span>
                                </button>
                                <button 
                                    onClick={() => setSubMateri('bpupki')}
                                    className={`w-full text-left p-5 rounded-lg border-l-2 transition-all flex items-center justify-between group shadow-lg ${subMateri === 'bpupki' ? 'bg-[#171717] text-history-gold border-history-gold' : 'bg-transparent text-history-muted border-transparent hover:bg-[#171717]'}`}
                                >
                                    <span className={`font-sans font-bold text-sm uppercase tracking-wide`}>2. Badan Penyelidik</span>
                                </button>
                                <button 
                                    onClick={() => setSubMateri('ppki')}
                                    className={`w-full text-left p-5 rounded-lg border-l-2 transition-all flex items-center justify-between group shadow-lg ${subMateri === 'ppki' ? 'bg-[#171717] text-white border-white' : 'bg-transparent text-history-muted border-transparent hover:bg-[#171717]'}`}
                                >
                                    <span className={`font-sans font-bold text-sm uppercase tracking-wide`}>3. Panitia Persiapan</span>
                                </button>
                            </div>

                            {/* Materi Content Area */}
                            <div className="md:col-span-9">
                                <div className="glass-card p-12 rounded-3xl min-h-[600px] relative overflow-hidden">
                                    
                                    {subMateri === 'jepang' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-4 mb-4">
                                                <h3 className="text-3xl font-sans font-bold text-history-brown uppercase tracking-wide">Pedang Bermata Dua</h3>
                                                <p className="text-history-muted italic text-lg mt-2 font-light">Dampak Positif yang tidak disengaja oleh Jepang</p>
                                            </div>
                                            
                                            {/* ENLARGED IMAGE */}
                                            <div className="w-full">
                                                <img 
                                                    src="https://upload.wikimedia.org/wikipedia/id/a/a4/Peta_ri.jpg" 
                                                    alt="Pasukan PETA" 
                                                    className="w-full h-[500px] object-cover rounded-xl border border-history-gold/10 grayscale-[30%]"
                                                />
                                                <p className="text-xs text-center text-history-muted mt-3 uppercase tracking-widest">Pasukan Pembela Tanah Air (PETA)</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="bg-[#171717] p-8 rounded-2xl border border-history-red/30">
                                                    <h4 className="font-sans font-bold text-lg text-history-red mb-3 uppercase tracking-wide"><i className="fas fa-fist-raised mr-2"></i>Dampak Militer</h4>
                                                    <p className="text-history-brown leading-relaxed font-light">
                                                        Jepang melatih pemuda Indonesia (PETA, Heiho) untuk melawan Sekutu. Tanpa sadar, mereka memberikan "otot" bagi Indonesia untuk Perang Revolusi nanti. Tokoh seperti <strong>Jenderal Soedirman</strong> adalah lulusan PETA.
                                                    </p>
                                                </div>
                                                <div className="bg-[#171717] p-8 rounded-2xl border border-blue-900/30">
                                                    <h4 className="font-sans font-bold text-lg text-blue-300 mb-3 uppercase tracking-wide"><i className="fas fa-language mr-2"></i>Bahasa Persatuan</h4>
                                                    <p className="text-history-brown leading-relaxed font-light">
                                                        Karena bahasa Belanda dilarang, <strong>Bahasa Indonesia</strong> menjadi bahasa resmi administrasi dan pendidikan. Ini mempercepat penyebaran rasa nasionalisme ke seluruh pelosok.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'bpupki' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-4 mb-4">
                                                <h3 className="text-3xl font-sans font-bold text-history-gold uppercase tracking-wide">Sang Arsitek Negara</h3>
                                                <p className="text-history-muted italic text-lg mt-2 font-light">Dokuritsu Junbi Cosakai (1 Maret 1945)</p>
                                            </div>

                                            <div className="flex flex-col gap-8">
                                                {/* ENLARGED IMAGE */}
                                                <div className="w-full">
                                                     <img 
                                                        src="https://kompaspedia.kompas.id/wp-content/uploads/2020/08/RAPAT-PANITIA-PERSIAPAN-KEMERDEKAAN-INDONESIA-1-08-1-1536x1014.jpg" 
                                                        alt="Sidang BPUPKI" 
                                                        className="w-full h-[500px] object-cover rounded-xl border border-history-gold/10 grayscale-[30%]"
                                                    />
                                                </div>
                                                <div className="w-full bg-[#171717] p-8 rounded-2xl border border-history-gold/10">
                                                    <p className="leading-relaxed text-history-brown text-lg mb-4 font-light">
                                                        Ketika Jepang mulai kalah perang, mereka menjanjikan kemerdekaan. Dibentuklah BPUPKI yang diketuai <strong>Dr. Radjiman Wedyodiningrat</strong>.
                                                    </p>
                                                    <ul className="space-y-4 text-history-muted">
                                                        <li className="flex items-center bg-[#0a0a0a] p-4 rounded border border-white/5"><i className="fas fa-check-circle text-history-gold mr-3 text-lg"></i> <strong>Sidang I (29 Mei - 1 Juni):</strong> Merumuskan Dasar Negara (Lahirnya Pancasila).</li>
                                                        <li className="flex items-center bg-[#0a0a0a] p-4 rounded border border-white/5"><i className="fas fa-check-circle text-history-gold mr-3 text-lg"></i> <strong>Sidang II (10-17 Juli):</strong> Merumuskan UUD 1945.</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="bg-[#0a0a0a] p-8 rounded-xl border-l-4 border-history-gold">
                                                <h4 className="font-bold text-xl text-history-gold mb-3 font-sans uppercase tracking-wide">Piagam Jakarta (22 Juni 1945)</h4>
                                                <p className="text-history-brown mb-4 font-light">
                                                    Sebuah kesepakatan ("Gentlemen's Agreement") antara golongan Nasionalis dan Islam. Sila pertamanya berbunyi: 
                                                </p>
                                                <blockquote className="italic font-sans text-xl text-history-muted border-l-2 border-history-muted/30 pl-6 py-2">
                                                    "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya."
                                                </blockquote>
                                            </div>
                                        </div>
                                    )}

                                    {subMateri === 'ppki' && (
                                        <div className="fade-in space-y-8">
                                            <div className="border-b border-history-gold/20 pb-4 mb-4">
                                                <h3 className="text-3xl font-sans font-bold text-white uppercase tracking-wide">Sang Eksekutor Kemerdekaan</h3>
                                                <p className="text-history-muted italic text-lg mt-2 font-light">Dokuritsu Junbi Inkai (7 Agustus 1945)</p>
                                            </div>

                                            <p className="text-lg leading-relaxed text-history-brown mb-6 font-light">
                                                Setelah tugas BPUPKI selesai, dibentuklah PPKI. Jika BPUPKI didominasi orang Jawa, PPKI mewakili <strong>seluruh Nusantara</strong> (Sumatera, Kalimantan, Sulawesi, Maluku, Sunda Kecil).
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-[#171717] border border-white/10 p-8 rounded-2xl hover:bg-[#262626] transition text-center group">
                                                    <div className="w-12 h-12 bg-white text-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:bg-[#0a0a0a] group-hover:text-white transition">1</div>
                                                    <h4 className="font-bold mb-2 text-lg text-white uppercase tracking-wide">Mengesahkan UUD 1945</h4>
                                                    <p className="text-sm opacity-60 font-light">Menetapkan landasan hukum negara.</p>
                                                </div>
                                                <div className="bg-[#171717] border border-history-red/20 p-8 rounded-2xl hover:bg-[#262626] transition text-center group">
                                                    <div className="w-12 h-12 bg-history-red text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:bg-white group-hover:text-history-red transition">2</div>
                                                    <h4 className="font-bold mb-2 text-lg text-history-red uppercase tracking-wide">Memilih Presiden</h4>
                                                    <p className="text-sm opacity-60 font-light">Soekarno (Presiden) & Hatta (Wakil).</p>
                                                </div>
                                            </div>

                                            <div className="mt-8 bg-gradient-to-r from-[#0a0a0a] to-[#171717] border border-history-gold/30 text-white p-10 rounded-2xl relative overflow-hidden shadow-2xl">
                                                <div className="relative z-10">
                                                    <h4 className="font-sans font-bold text-2xl mb-4 text-history-gold uppercase tracking-wide"><i className="fas fa-handshake mr-3"></i>Momen Kritis 18 Agustus 1945</h4>
                                                    <p className="text-lg opacity-80 leading-relaxed font-light text-history-brown">
                                                        Demi persatuan bangsa, para tokoh Islam berbesar hati menyetujui penghapusan "7 kata" dalam Piagam Jakarta. Sila pertama berubah menjadi <strong>"Ketuhanan Yang Maha Esa"</strong>. Inilah hadiah terbesar untuk persatuan Indonesia.
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
                            <h3 className="font-sans text-2xl font-bold text-history-gold uppercase tracking-widest">Simulasi: Dilema Pendiri Bangsa</h3>
                            <p className="text-history-muted mt-2 font-light">Bisakah kamu mengambil keputusan sulit demi kemerdekaan?</p>
                        </div>
                        <IndependenceSimulation />
                    </div>
                )}

                {activeTab === 'lkpd' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <LKPDTopic3 />
                    </div>
                )}

                {activeTab === 'evaluasi' && (
                    <div className="animate-fade-in max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="font-sans text-2xl font-bold text-history-gold uppercase tracking-widest">Uji Pemahaman</h3>
                            <p className="text-history-muted mt-2 font-light">Seberapa dalam pemahamanmu tentang jalan menuju gerbang kemerdekaan?</p>
                        </div>
                        <QuizGate />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topic3;