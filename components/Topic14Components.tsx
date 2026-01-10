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

// --- QUIZ COMPONENT ---
export const QuizJejakOrba: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Salah satu keberhasilan ekonomi Orde Baru yang diakui dunia internasional adalah...",
            options: ["Swasembada Beras (1984)", "Industri Pesawat Terbang", "Pembangunan Sirkuit Sentul", "Ekspor Mobil Nasional"],
            answerIndex: 0
        },
        {
            question: "Program Keluarga Berencana (KB) pada masa Orde Baru bertujuan untuk...",
            options: ["Meningkatkan jumlah tentara", "Mengendalikan laju pertumbuhan penduduk", "Membatasi hak asasi manusia", "Menambah tenaga kerja murah"],
            answerIndex: 1
        },
        {
            question: "Dampak negatif kebijakan politik 'Massa Mengambang' (Floating Mass) adalah...",
            options: ["Rakyat di desa menjadi buta politik dan mudah dimobilisasi", "Partai politik semakin banyak", "Demokrasi semakin maju", "Rakyat bebas berpendapat"],
            answerIndex: 0
        },
        {
            question: "Apa yang dimaksud dengan Dwifungsi ABRI yang diterapkan pada masa Orde Baru?",
            options: ["TNI hanya bertugas menjaga perbatasan", "TNI memiliki peran ganda: Pertahanan dan Sosial-Politik", "TNI dilarang berbisnis", "Polisi dan Tentara dipisah"],
            answerIndex: 1
        },
        {
            question: "Penyebab utama runtuhnya ekonomi Orde Baru pada tahun 1997/1998 adalah...",
            options: ["Serangan negara asing", "Pondasi ekonomi rapuh akibat KKN dan hutang luar negeri", "Kegagalan panen raya", "Bencana alam tsunami"],
            answerIndex: 1
        }
    ];

    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (idx: number) => {
        if (isAnswered) return;
        setSelectedOption(idx);
        setIsAnswered(true);
        if (idx === questions[currentQ].answerIndex) setScore(score + 20);
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    };

    const restart = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setIsAnswered(false);
        setSelectedOption(null);
    };

    if (showResult) {
        return (
            <div className="bg-[#171717] p-8 rounded text-center border border-history-gold/30">
                <h3 className="text-xl font-bold text-history-gold mb-4 uppercase tracking-widest">Hasil Evaluasi</h3>
                <div className="text-6xl font-black text-white mb-4">{score}</div>
                <p className="text-history-muted mb-6">{score >= 80 ? "Sangat Baik! Anda mampu melihat dua sisi Orde Baru." : "Pelajari lagi materi tentang dampak positif dan negatif."}</p>
                <button onClick={restart} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded text-xs font-bold uppercase hover:bg-yellow-600 transition">Ulangi Kuis</button>
            </div>
        );
    }

    return (
        <div className="bg-[#171717] p-8 rounded border border-history-gold/10">
            <div className="mb-6 text-xs font-bold text-history-muted flex justify-between uppercase tracking-widest">
                <span>Soal {currentQ + 1}/{questions.length}</span>
                <span className="text-history-gold">Skor: {score}</span>
            </div>
            <h3 className="font-bold text-lg text-white mb-6 font-sans">{questions[currentQ].question}</h3>
            <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded border transition group ${selectedOption === idx ? (idx === questions[currentQ].answerIndex ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400') : 'bg-[#0a0a0a] border-history-gold/10 hover:border-history-gold hover:bg-[#1c1c1c] text-history-brown'}`}
                    >
                        <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check text-green-500"></i>}
                            {isAnswered && selectedOption === idx && idx !== questions[currentQ].answerIndex && <i className="fas fa-times text-red-500"></i>}
                        </div>
                    </button>
                ))}
            </div>
            {isAnswered && (
                <div className="mt-6 text-right">
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded font-bold text-xs uppercase hover:bg-yellow-600 transition">
                        {currentQ < questions.length - 1 ? "Lanjut" : "Lihat Hasil"}
                    </button>
                </div>
            )}
        </div>
    );
};