import React, { useState } from 'react';
import { Mindfulness, InteractiveMap, Quiz } from '../components/Topic1Components';

const Topic1: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'materi' | 'simulasi' | 'kuis' | 'refleksi'>('materi');
    const [activeChapter, setActiveChapter] = useState('chap1');

    return (
        <div className="fade-in pb-12">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mt-6 mb-12">
                <div className="inline-block p-4 rounded-full bg-history-gold/20 border-2 border-history-gold mb-4">
                    <i className="fas fa-sun text-4xl text-history-gold"></i>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-history-dark mb-4">Matahari Terbit di Tanah Hindia</h2>
                <p className="text-xl text-gray-600 mb-6 italic">"Saudara Tua atau Petaka Baru?"</p>
                
                {/* Mindfulness Section - Always visible at top of topic */}
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-history-gold text-left max-w-3xl mx-auto">
                    <h3 className="font-serif text-xl font-bold mb-2 text-history-dark"><i className="fas fa-brain mr-2"></i>Mindfulness (Kesadaran Penuh)</h3>
                    <p className="mb-4 text-gray-700 text-sm">
                        Sebelum kita menyelami masa lalu, mari kita siapkan pikiran kita agar hadir utuh di sini (Mindfull).
                    </p>
                    <Mindfulness />
                </div>
            </div>

            {/* Navigation Tabs for this Topic */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 border-b-2 border-gray-200 pb-1">
                <button 
                    onClick={() => setActiveTab('materi')}
                    className={`px-6 py-2 rounded-t-lg font-bold transition ${activeTab === 'materi' ? 'bg-history-dark text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                    <i className="fas fa-book-open mr-2"></i> Materi
                </button>
                <button 
                    onClick={() => setActiveTab('simulasi')}
                    className={`px-6 py-2 rounded-t-lg font-bold transition ${activeTab === 'simulasi' ? 'bg-history-dark text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                    <i className="fas fa-map-marked-alt mr-2"></i> Simulasi
                </button>
                <button 
                    onClick={() => setActiveTab('kuis')}
                    className={`px-6 py-2 rounded-t-lg font-bold transition ${activeTab === 'kuis' ? 'bg-history-dark text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                    <i className="fas fa-clipboard-check mr-2"></i> Kuis
                </button>
                <button 
                    onClick={() => setActiveTab('refleksi')}
                    className={`px-6 py-2 rounded-t-lg font-bold transition ${activeTab === 'refleksi' ? 'bg-history-dark text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                >
                    <i className="fas fa-pen-fancy mr-2"></i> Refleksi
                </button>
            </div>

            {/* MATERI TAB */}
            {activeTab === 'materi' && (
                <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-6 animate-fade-in">
                    {/* Sidebar */}
                    <div className="md:col-span-3 space-y-2">
                        <button onClick={() => setActiveChapter('chap1')} className={`w-full text-left px-4 py-3 rounded shadow transition font-semibold border-l-4 ${activeChapter === 'chap1' ? 'bg-history-gold text-white border-history-dark' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>1. Latar Belakang</button>
                        <button onClick={() => setActiveChapter('chap2')} className={`w-full text-left px-4 py-3 rounded shadow transition font-semibold border-l-4 ${activeChapter === 'chap2' ? 'bg-history-gold text-white border-history-dark' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>2. Proses Masuk</button>
                        <button onClick={() => setActiveChapter('chap3')} className={`w-full text-left px-4 py-3 rounded shadow transition font-semibold border-l-4 ${activeChapter === 'chap3' ? 'bg-history-gold text-white border-history-dark' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>3. Propaganda 3A</button>
                        <button onClick={() => setActiveChapter('chap4')} className={`w-full text-left px-4 py-3 rounded shadow transition font-semibold border-l-4 ${activeChapter === 'chap4' ? 'bg-history-gold text-white border-history-dark' : 'bg-white hover:bg-gray-50 border-gray-300'}`}>4. Respon Tokoh</button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 bg-white p-8 rounded-lg shadow-lg min-h-[500px] border border-gray-200">
                        {activeChapter === 'chap1' && (
                            <div className="fade-in">
                                <h3 className="font-serif text-2xl text-history-red font-bold mb-4">Badai dari Utara</h3>
                                <div className="float-right ml-6 mb-4 w-1/3 bg-gray-100 p-2 rounded border">
                                    <div className="bg-gray-300 h-32 flex items-center justify-center rounded text-gray-500 text-xs text-center">
                                       [Placeholder: Gambar Pearl Harbor]
                                    </div>
                                    <p className="text-xs text-center mt-1 italic">Serangan Pearl Harbor 1941</p>
                                </div>
                                <p className="mb-4 text-justify leading-relaxed">
                                    Jepang tumbuh menjadi raksasa industri namun miskin sumber daya alam. Ketika Amerika Serikat melakukan <strong>embargo minyak</strong>, Jepang ibarat motor tanpa bensin. Pilihannya: berhenti atau merebut sumber minyak paksa.
                                </p>
                                <p className="mb-4 text-justify leading-relaxed">
                                    <strong>7 Desember 1941</strong>, Jepang mengebom pangkalan AL Amerika di Pearl Harbor, Hawaii. Tujuannya melumpuhkan penjaga Pasifik agar Jepang leluasa mengambil minyak di Hindia Belanda (Indonesia).
                                </p>
                                <div className="bg-amber-50 p-4 border-l-4 border-amber-500 rounded mt-6 clear-both">
                                    <h4 className="font-bold text-amber-800">Critical Thinking</h4>
                                    <p className="text-sm italic">"Jika Indonesia tidak kaya minyak, apakah Jepang akan tetap datang?"</p>
                                </div>
                            </div>
                        )}
                        {activeChapter === 'chap2' && (
                            <div className="fade-in">
                                <h3 className="font-serif text-2xl text-history-red font-bold mb-4">Gurita Jepang Mencekik Hindia</h3>
                                <p className="mb-4 leading-relaxed">
                                    Jepang menggunakan taktik "Gurita". Tidak langsung ke pusat (Jawa), tapi menguasai daerah pinggiran penghasil minyak.
                                </p>
                                <ul className="space-y-4 mb-6">
                                    <li className="flex items-start bg-gray-50 p-3 rounded">
                                        <span className="bg-history-dark text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">1</span>
                                        <div><strong>11 Jan 1942 (Tarakan):</strong> Pendaratan pertama di Kalimantan Timur untuk menguasai kilang minyak.</div>
                                    </li>
                                    <li className="flex items-start bg-gray-50 p-3 rounded">
                                        <span className="bg-history-dark text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">2</span>
                                        <div><strong>Feb 1942 (Palembang):</strong> Pasukan payung turun menguasai kilang Plaju.</div>
                                    </li>
                                    <li className="flex items-start bg-gray-50 p-3 rounded">
                                        <span className="bg-history-dark text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">3</span>
                                        <div><strong>1 Maret 1942 (Jawa):</strong> Pendaratan di Banten, Eretan, dan Kragan.</div>
                                    </li>
                                    <li className="flex items-start bg-red-50 p-3 rounded border border-red-200">
                                        <span className="bg-history-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1 flex-shrink-0">4</span>
                                        <div><strong>8 Maret 1942 (Kalijati):</strong> Belanda menyerah tanpa syarat kepada Letjen Hitoshi Imamura.</div>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {activeChapter === 'chap3' && (
                            <div className="fade-in">
                                <h3 className="font-serif text-2xl text-history-red font-bold mb-4">Manis di Bibir (Propaganda)</h3>
                                <p className="mb-4 leading-relaxed">
                                    Rakyat menyambut Jepang sebagai "Saudara Tua". Mengapa? Karena kebencian pada Belanda dan kepercayaan pada <strong>Ramalan Jayabaya</strong> (Orang kate berkulit kuning akan memerintah seumur jagung).
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center my-6">
                                    <div className="bg-history-dark text-white p-4 rounded shadow-lg transform hover:-translate-y-1 transition">Nippon<br/>Cahaya Asia</div>
                                    <div className="bg-history-dark text-white p-4 rounded shadow-lg transform hover:-translate-y-1 transition">Nippon<br/>Pelindung Asia</div>
                                    <div className="bg-history-dark text-white p-4 rounded shadow-lg transform hover:-translate-y-1 transition">Nippon<br/>Pemimpin Asia</div>
                                </div>
                                <p className="text-sm bg-gray-100 p-4 rounded italic border-l-4 border-history-gold">
                                    <strong>Meaningfull Learning:</strong> Propaganda Jepang ini mirip dengan "Hoaks" di zaman sekarang. Berita yang terlalu manis harus dicek kebenarannya.
                                </p>
                            </div>
                        )}
                        {activeChapter === 'chap4' && (
                             <div className="fade-in">
                             <h3 className="font-serif text-2xl text-history-red font-bold mb-4">Dua Wajah Perjuangan</h3>
                             <p className="mb-4">Tokoh nasional terpecah menjadi dua strategi namun satu tujuan:</p>
                             
                             <div className="grid md:grid-cols-2 gap-6 mt-6">
                                 <div className="border-2 border-history-dark p-4 rounded bg-stone-50">
                                     <h4 className="font-bold text-lg text-history-dark border-b border-gray-300 pb-2 mb-2">Kooperatif</h4>
                                     <p className="text-sm font-semibold mb-2">Tokoh: Soekarno, Hatta, Ki Hajar Dewantara.</p>
                                     <ul className="text-sm list-disc list-inside mt-2 text-gray-600 space-y-1">
                                         <li>Bekerja sama dengan Jepang.</li>
                                         <li>Memanfaatkan organisasi resmi (Putera) untuk pidato nasionalisme.</li>
                                         <li>Menjadi "perisai" bagi rakyat.</li>
                                     </ul>
                                 </div>
                                 <div className="border-2 border-history-red p-4 rounded bg-stone-50">
                                     <h4 className="font-bold text-lg text-history-red border-b border-gray-300 pb-2 mb-2">Bawah Tanah</h4>
                                     <p className="text-sm font-semibold mb-2">Tokoh: Sjahrir, Amir Syarifuddin.</p>
                                     <ul className="text-sm list-disc list-inside mt-2 text-gray-600 space-y-1">
                                         <li>Menolak jabatan Jepang.</li>
                                         <li>Menyadap radio sekutu.</li>
                                         <li>Mempersiapkan pemuda untuk revolusi.</li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                        )}
                    </div>
                </div>
            )}

            {/* SIMULASI TAB */}
            {activeTab === 'simulasi' && (
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <h3 className="font-serif text-2xl font-bold text-history-dark text-center mb-6">Simulasi Strategi "Gurita"</h3>
                    <InteractiveMap />
                </div>
            )}

            {/* KUIS TAB */}
            {activeTab === 'kuis' && (
                <div className="max-w-3xl mx-auto animate-fade-in">
                    <h3 className="font-serif text-2xl font-bold text-history-dark text-center mb-6">Uji Pemahaman</h3>
                    <Quiz />
                </div>
            )}

            {/* REFLEKSI TAB */}
            {activeTab === 'refleksi' && (
                <div className="max-w-2xl mx-auto animate-fade-in">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-history-red to-history-gold"></div>
                        <h2 className="font-serif text-3xl font-bold text-history-dark mb-4">Refleksi Diri</h2>
                        <p className="text-gray-600 mb-6">Pembelajaran yang bermakna (Meaningfull Learning) terjadi ketika kita menghubungkan masa lalu dengan kehidupan sekarang.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block font-bold text-gray-700 mb-3">Bagaimana perasaanmu setelah mempelajari materi ini?</label>
                                <div className="flex justify-between md:justify-start md:space-x-8 text-3xl">
                                    <button className="hover:scale-125 transition transform focus:scale-125">😁</button>
                                    <button className="hover:scale-125 transition transform focus:scale-125">😐</button>
                                    <button className="hover:scale-125 transition transform focus:scale-125">🤔</button>
                                    <button className="hover:scale-125 transition transform focus:scale-125">😢</button>
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-gray-700 mb-2">Satu pelajaran penting agar kita tidak termakan "Janji Manis" (Propaganda) di masa kini:</label>
                                <textarea className="w-full p-3 border border-gray-300 rounded focus:border-history-gold focus:ring-1 focus:ring-history-gold outline-none h-32" placeholder="Tuliskan refleksimu di sini..."></textarea>
                            </div>

                            <button 
                                onClick={() => alert('Terima kasih! Refleksimu telah disimpan dalam jurnal guru.')}
                                className="w-full bg-history-dark text-white py-3 rounded font-bold hover:bg-gray-700 transition"
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