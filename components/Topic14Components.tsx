import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessJejak: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Lihatlah ke sekelilingmu...",
        "Gedung sekolah, jalan raya, jembatan yang kita lalui.",
        "Banyak di antaranya adalah warisan masa lalu.",
        "Namun, ingatlah juga suara-suara yang pernah hilang.",
        "Tarik napas... hargai pembangunan fisik yang ada.",
        "Hembuskan... sadari pentingnya kebebasan berpendapat.",
        "Sejarah bukan untuk menghakimi, tapi untuk memahami secara utuh."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-gray-500 shadow-[0_0_30px_rgba(107,114,128,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-balance-scale text-gray-400 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-gray-500 text-gray-400 px-8 py-2 rounded-full hover:bg-gray-600 hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MULAI INVESTIGASI
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: REDAKSI MAHASISWA (PERS) ---
export const PressSimulation: React.FC = () => {
    const [credibility, setCredibility] = useState(50); // Kepercayaan Rakyat
    const [safety, setSafety] = useState(100); // Keamanan dari Pemerintah
    const [turn, setTurn] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'GAMEOVER' | 'WIN'>('INTRO');

    const headlines = [
        {
            topic: "Isu Pembangunan Waduk (Kedung Ombo)",
            safe: { title: "Waduk Baru: Solusi Irigasi Petani", cred: -10, safe: 0, msg: "Pemerintah senang. Petani korban penggusuran kecewa padamu." },
            risky: { title: "Jeritan Warga: Tanah Kami Ditenggelamkan!", cred: +20, safe: -30, msg: "Oplah koran naik drastis! Tapi telepon redaksi mulai berdering dari 'orang tak dikenal'." }
        },
        {
            topic: "Operasi Keamanan (Petrus)",
            safe: { title: "Angka Kriminalitas Turun Drastis", cred: -5, safe: +10, msg: "Masyarakat merasa aman, tapi aktivis HAM mencibir beritamu." },
            risky: { title: "Mayat Bertato di Karung: Siapa Pelakunya?", cred: +25, safe: -40, msg: "Berani sekali! Masyarakat mulai sadar. Kantor redaksi diawasi intel." }
        },
        {
            topic: "Bisnis Keluarga Cendana",
            safe: { title: "Putra Presiden Resmikan Pabrik Mobil Nasional", cred: -20, safe: +20, msg: "Berita aman. Kamu dianggap corong pemerintah." },
            risky: { title: "Monopoli Cengkeh: Petani Menjerit", cred: +30, safe: -50, msg: "Risiko tingkat tinggi! SIUPP (Izin Terbit) koranmu terancam dicabut!" }
        }
    ];

    const handleChoice = (type: 'safe' | 'risky') => {
        const scenario = headlines[turn];
        const choice = type === 'safe' ? scenario.safe : scenario.risky;
        
        const newCred = Math.max(0, Math.min(100, credibility + choice.cred));
        const newSafe = Math.max(0, Math.min(100, safety + choice.safe));
        
        setCredibility(newCred);
        setSafety(newSafe);
        setHistory([...history, `Edisi ${turn+1}: ${choice.title}`]);

        if (newSafe <= 0) {
            setGameState('GAMEOVER');
        } else if (turn >= 2) {
            setGameState('WIN');
        } else {
            setTurn(turn + 1);
        }
    };

    const resetGame = () => {
        setCredibility(50);
        setSafety(100);
        setTurn(0);
        setHistory([]);
        setGameState('INTRO');
    };

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-newspaper mr-2"></i>Pers Mahasiswa '90-an</h3>
                <div className="flex gap-4 text-xs font-bold">
                    <span className={credibility > 70 ? "text-green-500" : "text-history-muted"}>Kredibilitas: {credibility}%</span>
                    <span className={safety < 30 ? "text-red-500" : "text-blue-500"}>Izin Terbit: {safety}%</span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col justify-center">
                {gameState === 'INTRO' && (
                    <div className="text-center">
                        <i className="fas fa-typewriter text-6xl text-history-muted mb-6 opacity-50"></i>
                        <h3 className="text-2xl font-bold text-white mb-4">Pena Lebih Tajam dari Pedang</h3>
                        <p className="text-history-brown mb-8 max-w-xl mx-auto font-light">
                            Kamu adalah Pemimpin Redaksi Pers Mahasiswa. Tugasmu memberitakan kebenaran. 
                            Tapi ingat, di era ini, "Keterbukaan" adalah barang mahal. Salah melangkah, koranmu dibredel (ditutup paksa).
                        </p>
                        <button onClick={() => setGameState('PLAYING')} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs shadow-lg">
                            Mulai Menerbitkan
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="animate-fade-in w-full max-w-2xl mx-auto">
                        <div className="mb-2 text-center text-xs font-bold text-history-muted uppercase tracking-widest">Edisi {turn + 1}/3</div>
                        <h3 className="text-xl font-bold text-white text-center mb-8">{headlines[turn].topic}</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <button onClick={() => handleChoice('safe')} className="p-6 bg-[#262626] border border-green-900/30 rounded-xl hover:bg-green-900/20 hover:border-green-600 transition group text-left">
                                <span className="block text-xs font-bold text-green-500 mb-2 uppercase tracking-wide">Jalur Aman</span>
                                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-green-400">"{headlines[turn].safe.title}"</h4>
                                <p className="text-xs text-history-muted italic">Dampak: Aman dari bredel, tapi dianggap pengecut oleh mahasiswa.</p>
                            </button>

                            <button onClick={() => handleChoice('risky')} className="p-6 bg-[#262626] border border-red-900/30 rounded-xl hover:bg-red-900/20 hover:border-red-600 transition group text-left">
                                <span className="block text-xs font-bold text-red-500 mb-2 uppercase tracking-wide">Jalur Kritis</span>
                                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-red-400">"{headlines[turn].risky.title}"</h4>
                                <p className="text-xs text-history-muted italic">Dampak: Kredibilitas naik, tapi risiko kantor digerebek tinggi.</p>
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'GAMEOVER' && (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-4">🚫</div>
                        <h3 className="text-2xl font-bold text-red-500 mb-4">Koran Dibredel!</h3>
                        <p className="text-history-muted mb-6">
                            Kantor redaksi disegel aparat. Izin terbit dicabut. Suara kritismu dibungkam selamanya.
                        </p>
                        <button onClick={resetGame} className="border border-white/20 text-white px-6 py-2 rounded hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs transition">
                            Coba Lagi
                        </button>
                    </div>
                )}

                {gameState === 'WIN' && (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-4">📰</div>
                        <h3 className="text-2xl font-bold text-history-gold mb-4">Suara Rakyat!</h3>
                        <p className="text-history-muted mb-6 max-w-lg mx-auto">
                            Kamu berhasil bertahan hingga akhir. Koranmu menjadi referensi utama gerakan Reformasi. 
                            <br/><br/>
                            <strong>Skor Akhir:</strong><br/>
                            Kredibilitas: {credibility}% | Keamanan: {safety}%
                        </p>
                        <div className="bg-[#0a0a0a] p-4 rounded text-left text-xs text-history-muted mb-6 max-w-md mx-auto border border-history-gold/10">
                            <strong className="block mb-2 text-history-gold">Arsip Terbitan:</strong>
                            <ul className="list-disc pl-4 space-y-1">
                                {history.map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                        </div>
                        <button onClick={resetGame} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs shadow-lg">
                            Main Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic14: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activitas 1
    const [ecoFact, setEcoFact] = useState('');
    const [ecoSource, setEcoSource] = useState('');
    const [polFact, setPolFact] = useState('');
    const [polSource, setPolSource] = useState('');

    // Activitas 2
    const [strength1, setStrength1] = useState('');
    const [strength2, setStrength2] = useState('');
    const [weakness1, setWeakness1] = useState('');
    const [weakness2, setWeakness2] = useState('');

    // Activitas 3
    const [pemantik, setPemantik] = useState('');

    const handleMemberChange = (index: number, value: string) => {
        const newAnggota = [...anggota];
        newAnggota[index] = value;
        setAnggota(newAnggota);
    };

    const handlePrint = () => {
        const memberList = anggota.map((m, i) => m ? `<li>${m}</li>` : '').join('');
        
        const printContent = `
            <html>
            <head>
                <title>LKPD - ${nama}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; padding: 40px; }
                    h1 { text-align: center; font-size: 18px; margin-bottom: 5px; }
                    .section { margin-bottom: 25px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: top; }
                    th { background-color: #e0e0e0; }
                    .answer { border: 1px solid #ccc; padding: 10px; min-height: 50px; background: #f9f9f9; font-style: italic; }
                    .instruction { font-size: 13px; font-style: italic; margin-bottom: 5px; }
                </style>
            </head>
            <body>
                <h1>LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
                <div style="text-align:center; margin-bottom: 20px;">Topik: Analisis Dua Sisi Orde Baru</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>A. Aktivitas 1: Investigasi Fakta (Literasi & TPACK)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Aspek</th>
                                <th width="40%">Fakta Sejarah yang Ditemukan</th>
                                <th width="30%">Sumber Informasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Ekonomi</strong> (Contoh: Harga sembako, nilai tukar rupiah, pembangunan)</td>
                                <td>${ecoFact}</td>
                                <td>${ecoSource}</td>
                            </tr>
                            <tr>
                                <td><strong>Politik & Keamanan</strong> (Contoh: Kebebasan pers, peran militer/ABRI)</td>
                                <td>${polFact}</td>
                                <td>${polSource}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>B. Aktivitas 2: Analisis SWOT Orde Baru (Critical Thinking)</h3>
                    <p><strong>1. Strength (Kekuatan/Kelebihan):</strong></p>
                    <ul>
                        <li>${strength1}</li>
                        <li>${strength2}</li>
                    </ul>
                    <p><strong>2. Weakness (Kelemahan/Kekurangan):</strong></p>
                    <ul>
                        <li>${weakness1}</li>
                        <li>${weakness2}</li>
                    </ul>
                </div>

                <div class="section">
                    <h3>C. Aktivitas 3: Pertanyaan Pemantik (HOTS & Meaningful)</h3>
                    <p>"Bayangkan kamu adalah penasihat Presiden Indonesia saat ini. Berdasarkan sejarah Orde Baru, rekomendasi apa yang akan kamu berikan agar Indonesia maju tapi tetap demokratis?"</p>
                    <div class="answer">${pemantik}</div>
                </div>
                
                <div style="margin-top: 50px; text-align: right; font-size: 12px;">
                    SMK Negeri 1 Bojongsari - Sejarah Indonesia
                </div>
            </body>
            </html>
        `;
        const win = window.open('', '_blank');
        win?.document.write(printContent);
        win?.document.close();
        win?.print();
    };

    return (
        <div className="glass-card p-8 rounded-2xl border border-history-gold/10">
            <div className="flex justify-between items-center mb-8 border-b border-history-gold/20 pb-4">
                <h3 className="text-2xl font-bold text-history-brown uppercase tracking-widest">LKPD Digital</h3>
                <div className="flex gap-2">
                    <button onClick={handlePrint} className="bg-history-brown text-[#0a0a0a] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white flex items-center"><i className="fas fa-print mr-2"></i>Simpan ke PDF</button>
                    <button onClick={() => window.open('https://forms.gle/ozgXTr8arx5Ujqap8', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div>
                    <label className="block text-history-gold text-xs font-bold mb-2 uppercase">Kelas</label>
                    <input value={kelas} onChange={e => setKelas(e.target.value)} className="w-full bg-[#171717] border border-history-gold/20 rounded p-2 text-history-brown focus:border-history-gold outline-none" placeholder="Contoh: XI TKJ 1" />
                </div>
                <div>
                    <label className="block text-history-gold text-xs font-bold mb-2 uppercase">Anggota Kelompok</label>
                    <div className="grid grid-cols-1 gap-2">
                        {anggota.map((m, i) => (
                            <input key={i} value={m} onChange={e => handleMemberChange(i, e.target.value)} className="w-full bg-[#171717] border border-white/10 rounded p-2 text-xs text-history-brown focus:border-history-gold outline-none" placeholder={`Nama Anggota ${i+1}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Aktivitas 1 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">A. Aktivitas 1: Investigasi Fakta (Literasi & TPACK)</h4>
                    <p className="text-sm text-history-muted mb-4">Silakan gunakan HP/Gawai kalian untuk mencari data pendukung.</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/4">Aspek</th>
                                    <th className="p-3 border border-history-gold/10 w-1/2">Fakta Sejarah</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Sumber Info</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 align-top">
                                        <strong className="text-white block mb-1">Ekonomi</strong>
                                        (Harga sembako, kurs, pembangunan)
                                    </td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={ecoFact} onChange={e => setEcoFact(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10 focus:border-history-gold outline-none" placeholder="Temuan fakta ekonomi..."></textarea></td>
                                    <td className="p-2 border border-history-gold/10"><input value={ecoSource} onChange={e => setEcoSource(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 focus:border-history-gold outline-none" placeholder="Web/Buku..." /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 align-top">
                                        <strong className="text-white block mb-1">Politik & Keamanan</strong>
                                        (Pers, Militer, HAM)
                                    </td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={polFact} onChange={e => setPolFact(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10 focus:border-history-gold outline-none" placeholder="Temuan fakta politik..."></textarea></td>
                                    <td className="p-2 border border-history-gold/10"><input value={polSource} onChange={e => setPolSource(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 focus:border-history-gold outline-none" placeholder="Web/Buku..." /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">B. Aktivitas 2: Analisis SWOT (Critical Thinking)</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#171717] p-4 rounded border border-green-500/30">
                            <h5 className="font-bold text-green-500 mb-2">1. Strength (Kekuatan/Kelebihan)</h5>
                            <input value={strength1} onChange={e => setStrength1(e.target.value)} className="w-full bg-[#0a0a0a] p-2 mb-2 rounded text-sm border border-white/10 focus:border-green-500 outline-none" placeholder="Poin 1..." />
                            <input value={strength2} onChange={e => setStrength2(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm border border-white/10 focus:border-green-500 outline-none" placeholder="Poin 2..." />
                        </div>
                        <div className="bg-[#171717] p-4 rounded border border-red-500/30">
                            <h5 className="font-bold text-red-500 mb-2">2. Weakness (Kelemahan/Kekurangan)</h5>
                            <input value={weakness1} onChange={e => setWeakness1(e.target.value)} className="w-full bg-[#0a0a0a] p-2 mb-2 rounded text-sm border border-white/10 focus:border-red-500 outline-none" placeholder="Poin 1..." />
                            <input value={weakness2} onChange={e => setWeakness2(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm border border-white/10 focus:border-red-500 outline-none" placeholder="Poin 2..." />
                        </div>
                    </div>
                </div>

                {/* Aktivitas 3 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">C. Pertanyaan Pemantik (HOTS)</h4>
                    <p className="text-sm text-history-muted mb-2">"Bayangkan kamu adalah penasihat Presiden Indonesia saat ini. Berdasarkan sejarah Orde Baru, rekomendasi apa yang akan kamu berikan agar Indonesia maju tapi tetap demokratis?"</p>
                    <textarea value={pemantik} onChange={e => setPemantik(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-32 text-history-brown focus:border-history-gold outline-none" placeholder="Tuliskan rekomendasi kelompokmu..."></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizJejakOrba: React.FC = () => {
    // 20 Questions from PDF "Menelusuri Jejak Orde Baru (1966–1998)"
    const questions = [
        {
            id: 1,
            question: "Lahirnya pemerintahan Orde Baru ditandai oleh sebuah peristiwa penting yang menjadi tonggak peralihan kekuasaan dari Presiden Soekarno kepada Letjen Soeharto. Dokumen atau peristiwa tersebut adalah...",
            options: [
                "A. Dekrit Presiden 5 Juli 1959",
                "B. Trikora (Tri Komando Rakyat)",
                "C. Supersemar (Surat Perintah Sebelas Maret)",
                "D. Proklamasi Kemerdekaan",
                "E. Konferensi Meja Bundar"
            ],
            correct: 2 // C
        },
        {
            id: 2,
            question: "Pada masa transisi tahun 1966, kesatuan aksi mahasiswa dan pemuda mengajukan tuntutan yang dikenal dengan Tritura (Tri Tuntutan Rakyat). Berikut ini yang bukan merupakan isi dari Tritura adalah...",
            options: [
                "A. Bubarkan PKI",
                "B. Bersihkan Kabinet Dwikora dari unsur PKI",
                "C. Turunkan harga sembako",
                "D. Bubarkan Konstituante",
                "E. Perbaikan sandang dan pangan"
            ],
            correct: 3 // D (Bubarkan Konstituante is from 1959 Decree)
        },
        {
            id: 3,
            question: "Pemerintahan Orde Baru memiliki slogan atau visi utama untuk menjalankan kehidupan berbangsa dan bernegara, yaitu...",
            options: [
                "A. Melaksanakan politik luar negeri bebas aktif",
                "B. Melaksanakan Pancasila dan UUD 1945 secara murni dan konsekuen",
                "C. Membangun masyarakat sosialis Indonesia",
                "D. Menjadikan Indonesia sebagai macan Asia",
                "E. Mengembalikan kejayaan Nusantara seperti masa Majapahit"
            ],
            correct: 1 // B
        },
        {
            id: 4,
            question: "Salah satu kebijakan politik dalam negeri yang diterapkan pemerintah Orde Baru untuk menciptakan stabilitas politik adalah penyederhanaan (fusi) partai politik pada tahun 1973. Partai Persatuan Pembangunan (PPP) merupakan gabungan dari partai-partai beraliran...",
            options: [
                "A. Nasionalis",
                "B. Islam",
                "C. Komunis",
                "D. Kristen dan Katolik",
                "E. Sosialis"
            ],
            correct: 1 // B
        },
        {
            id: 5,
            question: "Pada masa Orde Baru, militer memiliki peran ganda, yaitu sebagai kekuatan pertahanan keamanan dan sebagai kekuatan sosial politik yang memungkinkan anggota militer menduduki jabatan sipil (Gubernur, Bupati, DPR). Konsep ini dikenal dengan nama...",
            options: [
                "A. Sapta Marga",
                "B. Komando Teritorial",
                "C. Dwifungsi ABRI",
                "D. Pagar Betis",
                "E. Operasi Militer Selain Perang"
            ],
            correct: 2 // C
        },
        {
            id: 6,
            question: "Strategi pembangunan ekonomi pemerintah Orde Baru tertuang dalam Trilogi Pembangunan. Tiga aspek utama dalam Trilogi Pembangunan tersebut adalah...",
            options: [
                "A. Stabilitas Nasional, Pertumbuhan Ekonomi, dan Pemerataan Pembangunan",
                "B. Kebebasan Pers, Demokrasi Terpimpin, dan Ekonomi Kerakyatan",
                "C. Swasembada Pangan, Industrialisasi, dan Globalisasi",
                "D. Pendidikan, Kesehatan, dan Perumahan Rakyat",
                "E. Pertanian, Perkebunan, dan Kelautan"
            ],
            correct: 0 // A
        },
        {
            id: 7,
            question: "Program pembangunan jangka panjang yang dilaksanakan secara bertahap setiap lima tahun pada masa Orde Baru disebut...",
            options: [
                "A. Rapim (Rapat Pimpinan)",
                "B. Repelita (Rencana Pembangunan Lima Tahun)",
                "C. Propenas (Program Pembangunan Nasional)",
                "D. MP3EI",
                "E. Nawacita"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Prestasi gemilang pemerintah Orde Baru di sektor pertanian yang mendapatkan penghargaan dari FAO (Organisasi Pangan dan Pertanian PBB) pada tahun 1984 adalah keberhasilan Indonesia mencapai...",
            options: [
                "A. Ekspor rempah-rempah terbesar",
                "B. Swasembada Beras",
                "C. Ketahanan pangan laut",
                "D. Swasembada Kedelai",
                "E. Perkebunan kelapa sawit terluas"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Untuk mengatasi ledakan jumlah penduduk yang dapat menghambat pembangunan ekonomi, pemerintah Orde Baru menggalakkan program kependudukan dengan slogan \"Dua Anak Cukup\". Program tersebut adalah...",
            options: [
                "A. Transmigrasi",
                "B. Urbanisasi",
                "C. Keluarga Berencana (KB)",
                "D. Posyandu",
                "E. Wajib Belajar"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Salah satu dampak positif kebijakan pendidikan pada masa Orde Baru melalui Instruksi Presiden (Inpres) adalah...",
            options: [
                "A. Pembangunan ribuan gedung Sekolah Dasar (SD) di pelosok desa",
                "B. Penggratisan biaya kuliah di seluruh universitas negeri",
                "C. Pengiriman ribuan guru ke luar negeri",
                "D. Penghapusan ujian nasional",
                "E. Penerapan kurikulum berbasis teknologi digital"
            ],
            correct: 0 // A
        },
        {
            id: 11,
            question: "Di balik keberhasilan pembangunan fisik, pemerintahan Orde Baru sering dikritik karena membatasi kebebasan berpendapat. Salah satu bentuk pembatasan tersebut terhadap media massa adalah...",
            options: [
                "A. Subsidi kertas koran",
                "B. Pembredelan (pencabutan izin terbit) surat kabar yang kritis",
                "C. Pelatihan jurnalistik bagi wartawan",
                "D. Pewajiban kolom opini pemerintah",
                "E. Larangan iklan asing"
            ],
            correct: 1 // B
        },
        {
            id: 12,
            question: "Peristiwa kerusuhan sosial yang terjadi pada Januari 1974 sebagai bentuk protes mahasiswa terhadap dominasi modal asing (Jepang) di Indonesia dikenal dengan nama peristiwa...",
            options: [
                "A. G30S/PKI",
                "B. Malari (Malapetaka Lima Belas Januari)",
                "C. Tanjung Priok",
                "D. Semanggi",
                "E. Trisakti"
            ],
            correct: 1 // B
        },
        {
            id: 13,
            question: "Istilah \"Petrus\" yang marak pada era 1980-an merujuk pada operasi keamanan untuk menanggulangi kejahatan premanisme. Kepanjangan dari Petrus adalah...",
            options: [
                "A. Pengamanan Terus Menerus",
                "B. Penembak Misterius",
                "C. Pembersihan Tunas",
                "D. Penjaga Strategis",
                "E. Pasukan Khusus"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Golongan Karya (Golkar) selalu memenangkan Pemilihan Umum (Pemilu) pada masa Orde Baru. Salah satu faktor utama kemenangan dominan tersebut adalah...",
            options: [
                "A. Program kampanye yang paling modern",
                "B. Dukungan penuh dari media asing",
                "C. Mobilisasi dukungan dari Pegawai Negeri Sipil (PNS) dan ABRI",
                "D. Koalisi dengan partai-partai Islam",
                "E. Popularitas artis-artis pendukungnya"
            ],
            correct: 2 // C
        },
        {
            id: 15,
            question: "Praktik penyalahgunaan kekuasaan yang memperkaya diri sendiri, keluarga, dan kroni-kroni penguasa yang sangat marak di akhir masa Orde Baru dikenal dengan akronim...",
            options: [
                "A. SARA",
                "B. HAM",
                "C. KKN (Korupsi, Kolusi, Nepotisme)",
                "D. DOM (Daerah Operasi Militer)",
                "E. P4 (Pedoman Penghayatan dan Pengamalan Pancasila)"
            ],
            correct: 2 // C
        },
        {
            id: 16,
            question: "Salah satu pemicu utama runtuhnya pemerintahan Orde Baru pada tahun 1998 adalah krisis ekonomi yang ditandai dengan...",
            options: [
                "A. Turunnya harga minyak dunia secara drastis",
                "B. Anjloknya nilai tukar Rupiah terhadap Dollar AS",
                "C. Gagal panen raya di seluruh Indonesia",
                "D. Embargo ekonomi dari PBB",
                "E. Penutupan seluruh bank swasta"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Gerakan mahasiswa pada bulan Mei 1998 yang menduduki Gedung DPR/MPR menuntut Presiden Soeharto untuk...",
            options: [
                "A. Mengangkat wakil presiden baru",
                "B. Menurunkan harga BBM saja",
                "C. Melakukan reshuffle kabinet",
                "D. Mengundurkan diri dari jabatan presiden (Reformasi)",
                "E. Membubarkan ABRI"
            ],
            correct: 3 // D
        },
        {
            id: 18,
            question: "Jika dibandingkan dengan Orde Lama, kelebihan utama Orde Baru dalam bidang ekonomi pada periode awal hingga pertengahan kekuasaannya adalah...",
            options: [
                "A. Mampu menekan inflasi dan menciptakan stabilitas harga",
                "B. Mampu menghapus utang luar negeri sepenuhnya",
                "C. Mampu menasionalisasi seluruh perusahaan asing",
                "D. Mampu menjadikan Rupiah mata uang terkuat di Asia",
                "E. Mampu menghilangkan pengangguran 100%"
            ],
            correct: 0 // A
        },
        {
            id: 19,
            question: "Dampak negatif dari sentralisasi kekuasaan (pemusatan kekuasaan di Jakarta) pada masa Orde Baru bagi daerah adalah...",
            options: [
                "A. Daerah menjadi lebih mandiri",
                "B. Ketimpangan pembangunan antara pusat (Jawa) dan daerah luar Jawa",
                "C. Meningkatnya pendapatan asli daerah (PAD)",
                "D. Munculnya raja-raja kecil di daerah",
                "E. Hilangnya budaya lokal"
            ],
            correct: 1 // B
        },
        {
            id: 20,
            question: "Pelajaran berharga yang dapat diambil dari berakhirnya masa pemerintahan Orde Baru bagi generasi masa kini adalah...",
            options: [
                "A. Pembangunan ekonomi tidak perlu memperhatikan demokrasi",
                "B. Kebebasan berpendapat harus dilarang demi keamanan",
                "C. Jabatan presiden sebaiknya diemban seumur hidup",
                "D. Pembangunan fisik harus sejalan dengan penegakan hukum dan demokrasi",
                "E. Militer harus memegang kendali penuh atas pemerintahan sipil"
            ],
            correct: 3 // D
        }
    ];

    const [appState, setAppState] = useState<'login' | 'quiz' | 'result'>('login');
    const [userData, setUserData] = useState({ name: '', userClass: '' });
    const [answers, setAnswers] = useState<{[key: number]: number}>({});
    const [score, setScore] = useState(0);
    const [grade, setGrade] = useState('');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    // Handle Login Input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    // Start Quiz
    const startQuiz = () => {
        if (userData.name && userData.userClass) {
            setAppState('quiz');
            window.scrollTo(0, 0);
        } else {
            alert("Mohon isi Nama Lengkap dan Kelas terlebih dahulu.");
        }
    };

    // Handle Answer Selection
    const handleOptionSelect = (qId: number, optionIndex: number) => {
        setAnswers({ ...answers, [qId]: optionIndex });
    };

    // Submit Answers
    const submitAnswers = () => {
        if (Object.keys(answers).length < questions.length) {
            if (!window.confirm("Masih ada soal yang belum diisi. Yakin ingin mengirim jawaban?")) return;
        }

        let calculatedScore = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                calculatedScore += 5; // 5 pts x 20 questions = 100
            }
        });

        setScore(calculatedScore);
        
        let calculatedGrade = '';
        if (calculatedScore <= 69) calculatedGrade = 'Kurang';
        else if (calculatedScore <= 80) calculatedGrade = 'Cukup Baik';
        else if (calculatedScore <= 90) calculatedGrade = 'Baik';
        else calculatedGrade = 'Sangat Baik';
        
        setGrade(calculatedGrade);
        setShowFeedbackModal(true);
    };

    // Generate Report View (Open in new window for printing)
    const handleDownloadPDF = () => {
        const printContent = `
            <html>
            <head>
                <title>Laporan Evaluasi - ${userData.name}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; padding: 40px; color: #000; background: #fff; }
                    .header { text-align: center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { font-size: 24px; margin: 0; text-transform: uppercase; letter-spacing: 2px; }
                    .header h2 { font-size: 18px; margin: 5px 0 0; font-weight: normal; }
                    .info-table { width: 100%; margin-bottom: 30px; border: 1px solid #000; }
                    .info-table td { padding: 10px; border: 1px solid #000; }
                    .score-box { text-align: center; margin: 20px 0; padding: 20px; border: 2px solid #000; background: #f0f0f0; }
                    .score-num { font-size: 48px; font-weight: bold; display: block; }
                    .score-grade { font-size: 18px; font-weight: bold; text-transform: uppercase; }
                    .question-item { margin-bottom: 15px; page-break-inside: avoid; border-bottom: 1px dashed #ccc; padding-bottom: 10px; }
                    .question-text { font-weight: bold; margin-bottom: 5px; }
                    .options { margin-left: 20px; font-size: 14px; }
                    .option { padding: 2px 0; }
                    .selected { font-weight: bold; color: blue; }
                    .correct { font-weight: bold; color: green; }
                    .incorrect { color: red; text-decoration: line-through; }
                    .key-badge { background: #eee; padding: 2px 5px; font-size: 10px; border-radius: 3px; margin-left: 5px; border: 1px solid #999; }
                    .footer { margin-top: 50px; text-align: right; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Laporan Hasil Evaluasi</h1>
                    <h2>Topik: Menelusuri Jejak Orde Baru (1966–1998)</h2>
                </div>

                <table class="info-table" cellspacing="0">
                    <tr>
                        <td width="30%"><strong>Nama Siswa</strong></td>
                        <td>${userData.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Kelas</strong></td>
                        <td>${userData.userClass}</td>
                    </tr>
                    <tr>
                        <td><strong>Tanggal</strong></td>
                        <td>${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    </tr>
                </table>

                <div class="score-box">
                    <span class="score-grade">Nilai Akhir</span>
                    <span class="score-num">${score}</span>
                    <span class="score-grade">${grade}</span>
                </div>

                <h3>Rincian Jawaban:</h3>
                ${questions.map((q, idx) => {
                    const userAns = answers[q.id];
                    
                    return `
                        <div class="question-item">
                            <div class="question-text">${idx + 1}. ${q.question}</div>
                            <div class="options">
                                ${q.options.map((opt, oIdx) => {
                                    let style = "option";
                                    let badge = "";
                                    
                                    if (oIdx === q.correct) {
                                        style += " correct";
                                        badge = `<span class="key-badge">KUNCI</span>`;
                                    } 
                                    
                                    if (userAns === oIdx) {
                                        if (userAns !== q.correct) {
                                            style += " incorrect";
                                            badge = `<span class="key-badge" style="color:red; border-color:red;">JAWABAN ANDA</span>`;
                                        } else {
                                            badge = `<span class="key-badge" style="background:green; color:white; border-color:green;">BENAR</span>`;
                                        }
                                    }

                                    return `<div class="${style}">${opt} ${badge}</div>`;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}

                <div class="footer">
                    <p>Guru Mata Pelajaran</p>
                    <br/><br/><br/>
                    <p><strong>Findi Lestari, S.Pd.</strong></p>
                </div>
                
                <script>window.print();</script>
            </body>
            </html>
        `;
        
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
        }
    };

    const resetEvaluasi = () => {
        setAppState('login');
        setUserData({ name: '', userClass: '' });
        setAnswers({});
        setScore(0);
        setGrade('');
        setShowFeedbackModal(false);
        window.scrollTo(0, 0);
    };

    return (
        <div className="relative min-h-[600px]">
            {appState === 'login' && (
                <div className="bg-[#171717] p-8 md:p-12 rounded-2xl shadow-2xl max-w-xl mx-auto border border-history-gold/20 text-center animate-fade-in">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#0a0a0a] p-5 rounded-full border border-history-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                            <i className="fas fa-school text-4xl text-history-gold"></i>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-history-brown mb-2 uppercase tracking-widest">Identitas Peserta</h2>
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Jejak Orde Baru (20 Soal)</p>
                    
                    <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="input-name" className="block text-xs font-bold text-history-gold mb-2 uppercase tracking-wide">Nama Siswa</label>
                            <input 
                                id="input-name"
                                type="text" 
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-[#0a0a0a] border border-history-muted/20 rounded-lg focus:border-history-gold outline-none transition text-history-brown placeholder-history-muted/30"
                                placeholder="Isi nama lengkap..."
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="input-class" className="block text-xs font-bold text-history-gold mb-2 uppercase tracking-wide">Kelas</label>
                            <input 
                                id="input-class"
                                type="text" 
                                name="userClass" 
                                value={userData.userClass}
                                onChange={handleInputChange}
                                className="w-full p-4 bg-[#0a0a0a] border border-history-muted/20 rounded-lg focus:border-history-gold outline-none transition text-history-brown placeholder-history-muted/30"
                                placeholder="Isi kelas..."
                                autoComplete="off"
                            />
                        </div>
                        <button 
                            type="button"
                            onClick={startQuiz}
                            className="w-full bg-history-gold hover:bg-[#c5a028] text-[#0a0a0a] font-bold py-4 rounded-lg shadow-lg transition transform hover:scale-105 mt-6 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                        >
                            Mulai Mengerjakan <i className="fas fa-chevron-right ml-1"></i>
                        </button>
                    </form>
                </div>
            )}

            {appState === 'quiz' && (
                <div className="flex flex-col min-h-screen">
                    <div className="bg-[#171717] shadow-lg border-b border-history-gold/20 sticky top-0 z-20 print:hidden">
                        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3 font-bold text-history-brown">
                                <i className="fas fa-user text-history-gold"></i> {userData.name} <span className="text-history-muted mx-1">|</span> {userData.userClass}
                            </div>
                            <div className="flex items-center gap-2 text-history-muted">
                                <i className="fas fa-clock text-history-gold"></i> 20 Soal
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-8 pb-24 animate-fade-in">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-history-gold uppercase tracking-widest">Soal Evaluasi</h2>
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Menelusuri Jejak Orde Baru</p>
                        </div>

                        {questions.map((q, index) => (
                            <div key={q.id} className="bg-[#171717] p-6 md:p-8 rounded-xl shadow-lg border border-history-gold/10 hover:border-history-gold/30 transition duration-300">
                                <div className="flex gap-5">
                                    <div className="bg-[#0a0a0a] text-history-gold w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg font-bold text-lg border border-history-gold/20 shadow-inner">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-history-brown mb-6 leading-relaxed font-serif">{q.question}</h3>
                                        <div className="space-y-3">
                                            {q.options.map((opt, optIdx) => (
                                                <label 
                                                    key={optIdx} 
                                                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all group ${
                                                        answers[q.id] === optIdx 
                                                        ? 'bg-history-gold/10 border-history-gold ring-1 ring-history-gold/50' 
                                                        : 'bg-[#0a0a0a] border-history-muted/10 hover:bg-[#262626] hover:border-history-muted/30'
                                                    }`}
                                                >
                                                    <div className="mt-1 relative flex items-center justify-center">
                                                        <input 
                                                            type="radio" 
                                                            name={`q-${q.id}`} 
                                                            className="appearance-none w-5 h-5 rounded-full border-2 border-history-muted/50 checked:border-history-gold checked:bg-history-gold transition-all"
                                                            checked={answers[q.id] === optIdx}
                                                            onChange={() => handleOptionSelect(q.id, optIdx)}
                                                        />
                                                    </div>
                                                    <span className={`text-sm md:text-base ${answers[q.id] === optIdx ? 'text-history-gold font-bold' : 'text-history-muted group-hover:text-history-brown'}`}>
                                                        {opt}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end pt-6">
                            <button 
                                onClick={submitAnswers}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-full shadow-xl flex items-center gap-3 transition transform hover:scale-105 uppercase tracking-widest text-sm"
                            >
                                <i className="fas fa-paper-plane"></i> Kirim Jawaban
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFeedbackModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-[#171717] rounded-2xl max-w-md w-full p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.2)] border-2 border-history-gold scale-100 transform transition-all relative">
                        <div className="w-24 h-24 bg-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-history-gold shadow-lg">
                            <i className="fas fa-trophy text-history-gold text-4xl animate-bounce"></i>
                        </div>
                        <h2 className="text-3xl font-sans font-bold text-history-brown mb-2 uppercase tracking-wide">Hasil Evaluasi</h2>
                        <p className="text-history-muted mb-4">Terima kasih telah mengerjakan, <span className="text-history-gold font-bold">{userData.name}</span>!</p>
                        
                        <div className="bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/20 mb-6">
                            <div className="text-xs text-history-muted uppercase tracking-[0.2em] mb-2 font-bold">Nilai Akhir Kamu</div>
                            <div className={`text-7xl font-black ${score >= 75 ? 'text-emerald-500' : 'text-history-gold'}`}>{score}</div>
                            <div className="mt-2 text-sm font-bold uppercase tracking-widest text-history-brown border-t border-history-gold/10 pt-2 inline-block px-4">
                                {grade}
                            </div>
                        </div>

                        <p className="text-history-brown/80 text-sm mb-8 bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 leading-relaxed">
                            “Silakan Unduh dan Simpan Hasil Evaluasi kalian, sebagai bahan belajar kalian di rumah”
                        </p>

                        <div className="flex flex-col gap-3">
                            {/* Tombol Simpan ke PDF sesuai permintaan */}
                            <button 
                                onClick={handleDownloadPDF}
                                className="bg-history-brown text-[#0a0a0a] px-4 py-3 rounded hover:bg-white transition text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                            >
                                <i className="fas fa-print mr-2"></i> Simpan ke PDF
                            </button>
                            
                            <button 
                                onClick={resetEvaluasi}
                                className="w-full bg-[#262626] text-history-muted font-bold py-3.5 rounded-lg hover:bg-[#404040] hover:text-white transition flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-xs border border-white/5"
                            >
                                <i className="fas fa-redo"></i> Ulangi Evaluasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};