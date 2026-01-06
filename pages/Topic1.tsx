import React, { useState } from 'react';
import { Mindfulness, InteractiveMap, Quiz } from '../components/Topic1Components';

const Topic1: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'kuis' | 'refleksi'>('materi');
    const [activeChapter, setActiveChapter] = useState('chap1');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto text-center mt-8 mb-20">
                <div className="inline-block p-6 rounded-full border border-history-gold/20 mb-8 bg-[#171717]">
                    <i className="fas fa-sun text-4xl text-history-gold opacity-90"></i>
                </div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold text-history-brown mb-6 leading-tight">Matahari Terbit di Tanah Hindia</h2>
                <div className="w-32 h-px bg-history-gold mx-auto mb-6"></div>
                <p className="text-xl text-history-muted mb-10 italic font-sans font-light">"Saudara Tua atau Petaka Baru?"</p>
                
                {/* Mindfulness Section */}
                <div className="glass-card p-10 rounded-2xl text-left max-w-4xl mx-auto relative overflow-hidden border-l-4 border-l-history-gold">
                    <div className="flex items-center mb-4">
                        <i className="fas fa-spa text-history-gold mr-3 text-xl"></i>
                        <h3 className="font-sans text-xl font-bold text-history-brown uppercase tracking-widest">Mindfulness</h3>
                    </div>
                    <p className="mb-8 text-history-muted font-light">
                        Sebelum kita menyelami masa lalu, mari kita siapkan pikiran kita agar hadir utuh di sini.
                    </p>
                    <Mindfulness />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-history-gold/10 pb-1 max-w-4xl mx-auto">
                {['materi', 'simulasi', 'kuis', 'refleksi'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-4 font-bold transition-all duration-300 text-sm tracking-widest uppercase border-b-2 ${
                            activeTab === tab 
                            ? 'border-history-gold text-history-gold bg-history-gold/5' 
                            : 'border-transparent text-history-muted hover:text-history-brown hover:bg-[#171717]'
                        }`}
                    >
                        <i className={`fas fa-${tab === 'materi' ? 'book-open' : tab === 'simulasi' ? 'map-marked-alt' : tab === 'kuis' ? 'clipboard-check' : 'pen-fancy'} mr-2 text-xs`}></i> 
                        {tab}
                    </button>
                ))}
            </div>

            {/* MATERI TAB */}
            {activeTab === 'materi' && (
                <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 animate-fade-in">
                    {/* Sidebar */}
                    <div className="md:col-span-3 space-y-2">
                        {[
                            {id: 'chap1', label: '1. Latar Belakang'},
                            {id: 'chap2', label: '2. Proses Masuk'},
                            {id: 'chap3', label: '3. Propaganda 3A'},
                            {id: 'chap4', label: '4. Respon Tokoh'}
                        ].map(chap => (
                            <button 
                                key={chap.id}
                                onClick={() => setActiveChapter(chap.id)} 
                                className={`w-full text-left px-5 py-4 rounded-lg transition font-sans text-sm border-l-2 ${
                                    activeChapter === chap.id 
                                    ? 'bg-[#171717] border-history-gold text-history-gold font-bold shadow-sm' 
                                    : 'border-transparent text-history-muted hover:text-history-brown hover:bg-[#171717]'
                                }`}
                            >
                                {chap.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 glass-card p-12 rounded-3xl min-h-[600px] relative">
                        
                        {activeChapter === 'chap1' && (
                            <div className="fade-in">
                                <h3 className="font-sans text-3xl text-history-brown font-bold mb-8 pb-4 border-b border-history-gold/20">Badai dari Utara</h3>
                                
                                <div className="mb-10 w-full p-2 border border-history-gold/10 bg-[#0a0a0a] rounded-xl">
                                    <img 
                                        src="https://asset.kompas.com/crops/041UY1_Lcc2YGrUdIFk_19REJlA=/62x3:998x627/1200x800/data/photo/2024/03/04/65e4aea7145b4.jpeg" 
                                        alt="Serangan Pearl Harbor" 
                                        className="w-full h-[450px] object-cover rounded-lg filter sepia-[20%]"
                                    />
                                    <p className="text-xs text-center mt-3 text-history-muted uppercase tracking-widest">Serangan Pearl Harbor 1941</p>
                                </div>

                                <div className="prose prose-lg text-history-muted max-w-none leading-relaxed">
                                    <p className="mb-4">
                                        Jepang tumbuh menjadi raksasa industri namun miskin sumber daya alam. Ketika Amerika Serikat melakukan <strong className="text-history-gold">embargo minyak</strong>, Jepang ibarat motor tanpa bensin. Pilihannya: berhenti atau merebut sumber minyak paksa.
                                    </p>
                                    <p>
                                        <strong>7 Desember 1941</strong>, Jepang mengebom pangkalan AL Amerika di Pearl Harbor, Hawaii. Tujuannya melumpuhkan penjaga Pasifik agar Jepang leluasa mengambil minyak di Hindia Belanda (Indonesia).
                                    </p>
                                </div>
                                
                                <div className="bg-[#171717] p-8 rounded-xl mt-10 border-l-4 border-history-gold shadow-lg">
                                    <h4 className="font-bold text-history-brown font-sans text-sm uppercase tracking-widest mb-3">Refleksi Kritis</h4>
                                    <p className="italic text-history-muted font-light text-lg">"Jika Indonesia tidak kaya minyak, apakah Jepang akan tetap datang?"</p>
                                </div>
                            </div>
                        )}
                        {activeChapter === 'chap2' && (
                            <div className="fade-in">
                                <h3 className="font-sans text-3xl text-history-brown font-bold mb-8 pb-4 border-b border-history-gold/20">Gurita Jepang Mencekik Hindia</h3>
                                
                                <div className="mb-10 relative h-[500px] rounded-xl overflow-hidden shadow-xl border border-history-gold/10 group">
                                     <img 
                                        src="https://sejarahmiliter.com/wp-content/uploads/2019/11/61783102_10219016361786242_5073836954882146304_n.jpg" 
                                        alt="Pasukan Bersepeda Jepang" 
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition duration-700"
                                    />
                                    <div className="absolute bottom-0 w-full bg-[#0a0a0a]/90 backdrop-blur p-4">
                                        <p className="text-history-brown text-center text-sm font-light">Pasukan gerak cepat Jepang menggunakan sepeda untuk efisiensi.</p>
                                    </div>
                                </div>

                                <p className="mb-8 text-lg leading-relaxed text-history-muted">
                                    Jepang menggunakan taktik "Gurita". Tidak langsung ke pusat (Jawa), tapi menguasai daerah pinggiran penghasil minyak.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {[
                                        {date: '11 Jan 1942', place: 'Tarakan', desc: 'Pendaratan pertama di Kaltim untuk minyak.'},
                                        {date: 'Feb 1942', place: 'Palembang', desc: 'Pasukan payung kuasai kilang Plaju.'},
                                        {date: '1 Mar 1942', place: 'Jawa', desc: 'Pendaratan di Banten, Eretan, Kragan.'},
                                        {date: '8 Mar 1942', place: 'Kalijati', desc: 'Belanda menyerah tanpa syarat.'}
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col bg-[#171717] p-6 rounded-lg border border-history-gold/5 hover:border-history-gold/30 transition duration-300">
                                            <div className="flex items-center mb-3">
                                                <div className="w-8 h-8 text-history-gold border border-history-gold rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                                    {idx + 1}
                                                </div>
                                                <h5 className="font-bold text-history-brown text-sm uppercase tracking-wide">{item.place}</h5>
                                            </div>
                                            <p className="text-history-gold text-xs font-bold mb-2">{item.date}</p>
                                            <p className="text-history-muted text-sm">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeChapter === 'chap3' && (
                            <div className="fade-in">
                                <h3 className="font-sans text-3xl text-history-brown font-bold mb-8 pb-4 border-b border-history-gold/20">Manis di Bibir (Propaganda)</h3>
                                
                                <div className="mb-10 p-2 bg-[#0a0a0a] border border-history-gold/10 rounded-xl">
                                    <img 
                                        src="https://www.berdikarionline.com/cdn/2013/09/RapatIkada.jpg.jpg" 
                                        alt="Rapat Akbar Gerakan 3A" 
                                        className="w-full h-[500px] object-cover rounded-lg grayscale-[20%]"
                                    />
                                    <p className="text-xs text-center mt-3 text-history-muted uppercase tracking-widest">Rapat Akbar dengan Antusiasme Rakyat</p>
                                </div>

                                <p className="mb-8 text-lg leading-relaxed text-history-muted">
                                    Jepang datang bukan sebagai penjajah (katanya), tapi sebagai "Saudara Tua". Mereka memanfaatkan kepercayaan pada <strong>Ramalan Jayabaya</strong>.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                                    {['Cahaya', 'Pelindung', 'Pemimpin'].map((word) => (
                                        <div key={word} className="bg-[#171717] border border-history-gold/20 text-history-brown p-8 rounded-xl text-center hover:border-history-gold transition duration-300">
                                            <h4 className="font-sans font-light text-xl mb-2 text-history-brown">Nippon</h4>
                                            <div className="w-8 h-0.5 bg-history-gold mx-auto my-3"></div>
                                            <p className="text-history-gold font-bold text-lg uppercase tracking-wider">{word} Asia</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeChapter === 'chap4' && (
                             <div className="fade-in">
                             <h3 className="font-sans text-3xl text-history-brown font-bold mb-8 pb-4 border-b border-history-gold/20">Dua Wajah Perjuangan</h3>
                             
                             <div className="grid md:grid-cols-2 gap-8 mt-6">
                                 <div className="bg-[#171717] p-8 rounded-2xl border border-history-gold/20 hover:border-history-gold transition duration-300 text-center">
                                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Presiden_Sukarno.jpg/220px-Presiden_Sukarno.jpg" className="w-24 h-24 rounded-full object-cover border-2 border-history-gold mx-auto mb-6 shadow-lg" alt="Soekarno"/>
                                     <h4 className="font-sans font-bold text-xl text-history-gold uppercase tracking-wide mb-1">Kooperatif</h4>
                                     <span className="text-xs text-history-muted uppercase tracking-widest block mb-4">Soekarno & Hatta</span>
                                     <p className="text-history-brown text-sm italic font-light">"Bekerja sama untuk menyelamatkan rakyat."</p>
                                 </div>
                                 <div className="bg-[#171717] p-8 rounded-2xl border border-history-gold/20 hover:border-history-gold transition duration-300 text-center">
                                     <img src="https://github.com/pakmalabi-ai/Skansabosa-History/blob/main/public/sutan-syahrir.jpeg?raw=true" className="w-24 h-24 rounded-full object-cover border-2 border-history-red mx-auto mb-6 shadow-lg" alt="Sjahrir"/>
                                     <h4 className="font-sans font-bold text-xl text-history-red uppercase tracking-wide mb-1">Bawah Tanah</h4>
                                     <span className="text-xs text-history-muted uppercase tracking-widest block mb-4">Sutan Sjahrir</span>
                                     <p className="text-history-brown text-sm italic font-light">"Menolak kompromi, menyusun revolusi."</p>
                                 </div>
                             </div>
                         </div>
                        )}
                    </div>
                </div>
            )}

            {/* SIMULASI TAB */}
            {activeTab === 'simulasi' && (
                <div className="max-w-6xl mx-auto animate-fade-in glass-card p-8 rounded-2xl border border-history-gold/10">
                    <h3 className="font-sans text-2xl font-bold text-history-gold text-center mb-8 uppercase tracking-widest">Simulasi Strategi "Gurita"</h3>
                    <InteractiveMap />
                </div>
            )}

            {/* KUIS TAB */}
            {activeTab === 'kuis' && (
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <h3 className="font-sans text-2xl font-bold text-history-gold text-center mb-8 uppercase tracking-widest">Uji Pemahaman</h3>
                    <Quiz />
                </div>
            )}

            {/* REFLEKSI TAB */}
            {activeTab === 'refleksi' && (
                <div className="max-w-3xl mx-auto animate-fade-in">
                    <div className="glass-card p-12 rounded-2xl border border-history-gold/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-history-gold"></div>
                        <h2 className="font-sans text-2xl font-bold text-history-brown mb-4">Refleksi Diri</h2>
                        <p className="text-history-muted mb-8 font-light text-lg">Pembelajaran yang bermakna terjadi ketika hati ikut merasakan.</p>

                        <div className="space-y-8">
                            <div>
                                <label className="block font-bold text-history-gold text-sm uppercase tracking-wide mb-4">Bagaimana perasaanmu?</label>
                                <div className="flex gap-6 text-3xl opacity-80">
                                    {['😁', '😐', '🤔', '😢'].map(emoji => (
                                        <button key={emoji} className="hover:scale-110 transition transform focus:opacity-100 opacity-50 focus:scale-110">{emoji}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-history-gold text-sm uppercase tracking-wide mb-3">Satu pelajaran penting:</label>
                                <textarea className="w-full p-4 border border-history-muted/20 bg-[#0a0a0a] rounded-lg focus:border-history-gold outline-none h-40 resize-none text-history-brown text-lg font-light" placeholder="Tuliskan refleksimu..."></textarea>
                            </div>

                            <button 
                                onClick={() => alert('Terima kasih! Refleksimu telah disimpan.')}
                                className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-sm"
                            >
                                Kirim Refleksi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Topic1;