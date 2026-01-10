import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 9 ---
export const MindfulnessEkonomi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Tutup matamu sejenak...",
        "Bayangkan harga barang naik setiap jam (Hiperinflasi).",
        "Uang di sakumu hari ini bisa membeli beras, besok hanya cukup untuk permen.",
        "Tarik napas... rasakan beratnya beban ekonomi rakyat masa itu.",
        "Hembuskan... syukuri stabilitas ekonomi yang kita nikmati hari ini.",
        "Mari belajar dari kegagalan masa lalu untuk membangun ekonomi masa depan."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-coins text-amber-600 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-amber-600 text-amber-600 px-8 py-2 rounded-full hover:bg-amber-600 hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MULAI BELAJAR
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: MENTERI EKONOMI ---
export const EconomyMinisterSimulation: React.FC = () => {
    const [stats, setStats] = useState({ inflation: 80, happiness: 40, year: 1950 });
    const [gameStatus, setGameStatus] = useState<'PLAYING' | 'GAME_OVER' | 'WIN'>('PLAYING');
    const [feedback, setFeedback] = useState("Menteri! Uang beredar terlalu banyak warisan kolonial. Harga beras naik. Kas negara kosong. Apa kebijakanmu?");

    const playTurn = (action: 'gunting' | 'alibaba' | 'print') => {
        let newInflation = stats.inflation;
        let newHappiness = stats.happiness;
        let newYear = stats.year;
        let msg = "";

        if (action === 'gunting') {
            newInflation = Math.max(0, newInflation - 30);
            newHappiness = Math.max(0, newHappiness - 20); // Rakyat marah uang dipotong
            newYear += 2;
            msg = "Kebijakan 'Gunting Syafruddin' diambil! Inflasi turun drastis, tapi rakyat bingung dan marah karena uang tunai mereka berkurang nilainya.";
        } else if (action === 'alibaba') {
            newInflation = Math.min(100, newInflation + 10);
            newHappiness = Math.max(0, newHappiness - 10);
            newYear += 3;
            msg = "Sistem Ali-Baba diterapkan. Kredit macet! Pengusaha pribumi menjual lisensi ke pengusaha non-pribumi. Ekonomi stagnan.";
        } else if (action === 'print') {
            newInflation = Math.min(100, newInflation + 40); // Hiperinflasi
            newHappiness = Math.min(100, newHappiness + 10); // Sesaat senang proyek
            newYear += 4;
            msg = "Kamu mencetak uang untuk bangun Monas & GBK (Proyek Mercusuar). Hasilnya megah, tapi Inflasi meroket! Harga beras tak terjangkau.";
        }

        setStats({ inflation: newInflation, happiness: newHappiness, year: newYear });
        setFeedback(msg);

        // Check End Conditions
        if (newInflation >= 95) {
            setGameStatus('GAME_OVER');
            setFeedback("GAME OVER: Hiperinflasi! Ekonomi hancur. Rakyat demo besar-besaran (Tritura). Pemerintah jatuh.");
        } else if (newHappiness <= 10) {
            setGameStatus('GAME_OVER');
            setFeedback("GAME OVER: Revolusi Sosial! Rakyat tidak percaya lagi pada pemerintah. Terjadi kerusuhan.");
        } else if (newYear >= 1965) {
            setGameStatus('WIN');
            setFeedback("Simulasi Selesai! Kamu berhasil bertahan hingga 1965, meski ekonomi sulit. Sejarah mencatat ini sebagai masa transisi yang berat.");
        }
    };

    const resetGame = () => {
        setStats({ inflation: 80, happiness: 40, year: 1950 });
        setGameStatus('PLAYING');
        setFeedback("Menteri! Uang beredar terlalu banyak warisan kolonial. Harga beras naik. Kas negara kosong. Apa kebijakanmu?");
    };

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20">
            {/* Header Stats */}
            <div className="bg-[#0a0a0a] p-6 border-b border-history-gold/10 flex justify-between items-center text-white">
                <div>
                    <h3 className="text-xl font-bold font-sans text-history-gold"><i className="fas fa-user-tie mr-2"></i>Simulasi Menteri Ekonomi</h3>
                    <p className="text-xs text-history-muted mt-1">Tahun: {stats.year}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-history-muted mb-1">Status Negara</div>
                    <div className={`font-bold ${stats.inflation > 70 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {stats.inflation > 70 ? 'Kritis' : 'Stabil'}
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Meters */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="flex justify-between mb-2 text-xs font-bold text-history-muted uppercase">
                            <span>Inflasi (Bahaya)</span>
                            <span>{stats.inflation}%</span>
                        </div>
                        <div className="w-full bg-[#0a0a0a] rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all duration-500 ${stats.inflation > 80 ? 'bg-red-600' : 'bg-emerald-600'}`} style={{ width: `${stats.inflation}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 text-xs font-bold text-history-muted uppercase">
                            <span>Kepercayaan Rakyat</span>
                            <span>{stats.happiness}%</span>
                        </div>
                        <div className="w-full bg-[#0a0a0a] rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all duration-500 ${stats.happiness < 30 ? 'bg-red-600' : 'bg-blue-500'}`} style={{ width: `${stats.happiness}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Scenario Text */}
                <div className="bg-[#0a0a0a] p-6 rounded-lg border-l-4 border-amber-600 mb-8 min-h-[100px] flex items-center">
                    <p className="text-history-brown text-lg font-light leading-relaxed italic w-full text-center">"{feedback}"</p>
                </div>

                {/* Actions */}
                {gameStatus === 'PLAYING' ? (
                    <div className="grid md:grid-cols-3 gap-4">
                        <button onClick={() => playTurn('gunting')} className="p-4 bg-[#262626] border border-blue-500/30 rounded-xl hover:bg-blue-900/20 hover:border-blue-500 transition group text-center">
                            <i className="fas fa-cut text-2xl text-blue-500 mb-2 block group-hover:scale-110 transition"></i>
                            <span className="block font-bold text-blue-400 text-sm mb-1">Gunting Syafruddin</span>
                            <span className="block text-xs text-history-muted">Potong nilai uang</span>
                        </button>
                        <button onClick={() => playTurn('alibaba')} className="p-4 bg-[#262626] border border-amber-500/30 rounded-xl hover:bg-amber-900/20 hover:border-amber-500 transition group text-center">
                            <i className="fas fa-handshake text-2xl text-amber-500 mb-2 block group-hover:scale-110 transition"></i>
                            <span className="block font-bold text-amber-400 text-sm mb-1">Sistem Ali-Baba</span>
                            <span className="block text-xs text-history-muted">Bantu kredit pribumi</span>
                        </button>
                        <button onClick={() => playTurn('print')} className="p-4 bg-[#262626] border border-red-500/30 rounded-xl hover:bg-red-900/20 hover:border-red-500 transition group text-center">
                            <i className="fas fa-print text-2xl text-red-500 mb-2 block group-hover:scale-110 transition"></i>
                            <span className="block font-bold text-red-400 text-sm mb-1">Cetak Uang (Proyek)</span>
                            <span className="block text-xs text-history-muted">Bangun Monumen</span>
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <button onClick={resetGame} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-sm shadow-lg">
                            Main Ulang
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 9 ---
export const LKPDTopic9: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));
    
    // Form States
    const [libKuasai, setLibKuasai] = useState('');
    const [terKuasai, setTerKuasai] = useState('');
    const [libPartai, setLibPartai] = useState('');
    const [terPartai, setTerPartai] = useState('');
    const [libEkonomi, setLibEkonomi] = useState('');
    const [terEkonomi, setTerEkonomi] = useState('');
    const [studiKasus, setStudiKasus] = useState('');

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
                <title>LKPD - ${kelompok || 'Kelompok'}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; padding: 40px; color: #000; background: #fff; }
                    h1 { text-align: center; font-size: 18px; margin-bottom: 5px; font-weight: bold; }
                    .sub-header { text-align: center; margin-bottom: 20px; font-size: 14px; }
                    .header-info { margin-bottom: 20px; font-size: 14px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    .section { margin-bottom: 25px; }
                    h3 { font-size: 16px; font-weight: bold; margin-bottom: 10px; background: #f0f0f0; padding: 5px; border-left: 4px solid #000; }
                    p.instruction { font-style: italic; font-size: 13px; margin-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: top; }
                    th { background-color: #e0e0e0; }
                    .answer-box { border: 1px solid #ccc; padding: 10px; min-height: 80px; background: #f9f9f9; font-family: sans-serif; font-size: 14px; }
                    .members-list ol { padding-left: 20px; margin: 0; }
                    .footer { margin-top: 50px; text-align: right; font-size: 12px; border-top: 1px solid #ccc; padding-top: 10px; }
                </style>
            </head>
            <body>
                <h1>LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
                <div class="sub-header">Topik: Analisis Perbandingan Demokrasi Liberal & Terpimpin</div>
                
                <div class="header-info">
                    <table style="border: none;">
                        <tr style="border: none;"><td style="border: none; width: 100px;"><strong>Kelompok</strong></td><td style="border: none;">: ${kelompok}</td></tr>
                        <tr style="border: none;"><td style="border: none;"><strong>Kelas</strong></td><td style="border: none;">: ${kelas}</td></tr>
                    </table>
                    <div class="members-list">
                        <strong>Anggota:</strong>
                        <ol>
                            ${memberList || '<li>.......................................</li><li>.......................................</li><li>.......................................</li>'}
                        </ol>
                    </div>
                </div>

                <div class="section">
                    <h3>A. Petunjuk Belajar (Joyful Learning)</h3>
                    <ol style="font-size: 14px;">
                        <li>Scan QR Code/Buka Link materi yang diberikan guru.</li>
                        <li>Diskusi dengan teman sekelompok (Gotong Royong).</li>
                        <li>Jawablah pertanyaan dengan bahasa kalian sendiri (Kritis).</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>B. Tugas Analisis (HOTS & Meaningful)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek Pembeda</th>
                                <th width="40%">Demokrasi Liberal (1950-1959)</th>
                                <th width="40%">Demokrasi Terpimpin (1959-1965)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Pemegang Kekuasaan Tertinggi</strong></td>
                                <td>${libKuasai}</td>
                                <td>${terKuasai}</td>
                            </tr>
                            <tr>
                                <td><strong>Kondisi Partai Politik</strong></td>
                                <td>${libPartai}</td>
                                <td>${terPartai}</td>
                            </tr>
                            <tr>
                                <td><strong>Kondisi Ekonomi</strong></td>
                                <td>${libEkonomi}</td>
                                <td>${terEkonomi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>C. Studi Kasus (Deep Learning)</h3>
                    <p class="instruction">"Pada masa Liberal, kabinet jatuh bangun. Pada masa Terpimpin, kekuasaan terlalu kuat di satu orang. Menurut pendapat kelompokmu, manakah yang lebih berbahaya bagi kemajuan bangsa? Berikan alasan logis!"</p>
                    <div class="answer-box">${studiKasus}</div>
                </div>

                <div class="footer">
                    SMK Negeri 1 Bojongsari - Sejarah Indonesia
                </div>
            </body>
            </html>
        `;
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <div className="glass-card p-8 rounded-2xl border border-history-gold/10 text-left">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-history-gold/20">
                <h3 className="font-sans text-2xl font-bold text-history-brown uppercase tracking-widest">LKPD Digital</h3>
                <div className="flex gap-2">
                    <button onClick={handlePrint} className="bg-history-brown text-[#0a0a0a] px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white flex items-center"><i className="fas fa-print mr-2"></i>Simpan ke PDF</button>
                    <button onClick={() => window.open('https://forms.gle/CFWBpN9pSKdXCeKu8', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div className="space-y-4">
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Nama Kelompok</label>
                        <input value={kelompok} onChange={e => setKelompok(e.target.value)} placeholder="Contoh: Kelompok Natsir" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
                    </div>
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Kelas</label>
                        <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Contoh: XI TKJ 3" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
                    </div>
                </div>
                <div>
                    <label className="block text-history-gold text-xs font-bold uppercase tracking-wide mb-2">Anggota (Maks 7)</label>
                    <div className="grid grid-cols-1 gap-2">
                        {anggota.map((member, idx) => (
                            <input 
                                key={idx}
                                type="text" 
                                value={member} 
                                onChange={(e) => handleMemberChange(idx, e.target.value)} 
                                className="w-full bg-[#171717] border border-history-muted/20 rounded p-2 text-sm text-history-brown focus:border-history-gold outline-none" 
                                placeholder={`Anggota ${idx + 1}...`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Tugas Analisis */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-amber-600 pl-3">B. Tugas Analisis (HOTS & Meaningful)</h4>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#171717] text-history-brown text-xs border-b border-history-gold/20 text-center">
                                <th className="p-3 border-r border-history-gold/10 w-1/5">Aspek Pembeda</th>
                                <th className="p-3 border-r border-history-gold/10 w-2/5">Demokrasi Liberal (1950-1959)</th>
                                <th className="p-3 w-2/5">Demokrasi Terpimpin (1959-1965)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-brown">
                            {/* Row 1 */}
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Pemegang Kekuasaan Tertinggi</td>
                                <td className="p-2"><textarea value={libKuasai} onChange={e => setLibKuasai(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Perdana Menteri..."></textarea></td>
                                <td className="p-2"><textarea value={terKuasai} onChange={e => setTerKuasai(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Presiden..."></textarea></td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="border-b border-history-muted/10 bg-[#171717]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Kondisi Partai Politik</td>
                                <td className="p-2"><textarea value={libPartai} onChange={e => setLibPartai(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Banyak partai..."></textarea></td>
                                <td className="p-2"><textarea value={terPartai} onChange={e => setTerPartai(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Dibatasi/NASAKOM..."></textarea></td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Kondisi Ekonomi</td>
                                <td className="p-2"><textarea value={libEkonomi} onChange={e => setLibEkonomi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Defisit, Gunting Syafruddin..."></textarea></td>
                                <td className="p-2"><textarea value={terEkonomi} onChange={e => setTerEkonomi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Hiperinflasi, Proyek Mercusuar..."></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Studi Kasus */}
            <div className="space-y-6 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-amber-600 pl-3">C. Studi Kasus (Deep Learning)</h4>
                <div className="bg-[#171717] p-4 rounded mb-4 text-sm text-history-muted italic border border-history-gold/10">
                    "Pada masa Liberal, kabinet jatuh bangun. Pada masa Terpimpin, kekuasaan terlalu kuat di satu orang. Menurut pendapat kelompokmu, manakah yang lebih berbahaya bagi kemajuan bangsa? Berikan alasan logis!"
                </div>
                <textarea value={studiKasus} onChange={e => setStudiKasus(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-32 outline-none focus:border-history-gold" placeholder="Argumentasi kalian..."></textarea>
            </div>
        </div>
    );
};

// --- QUIZ TOPIC 9 ---
export const QuizDinamika: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Apa penyebab utama sering jatuhnya kabinet pada masa Demokrasi Liberal?",
            options: ["Presiden terlalu otoriter", "Mosi tidak percaya akibat sistem multipartai", "Intervensi asing", "Ekonomi yang stabil"],
            answerIndex: 1
        },
        {
            question: "Kebijakan memotong nilai uang kertas menjadi separuhnya pada tahun 1950 disebut...",
            options: ["Sanering", "Ali-Baba", "Gunting Syafruddin", "Dekrit Presiden"],
            answerIndex: 2
        },
        {
            question: "Salah satu penyimpangan pada masa Demokrasi Terpimpin adalah...",
            options: ["Pemilu yang demokratis", "Kebebasan pers", "Pengangkatan Presiden Seumur Hidup", "Pembubaran PKI"],
            answerIndex: 2
        },
        {
            question: "Isi Dekrit Presiden 5 Juli 1959 yang menandai berakhirnya Demokrasi Liberal adalah, KECUALI...",
            options: ["Pembubaran Konstituante", "Berlakunya kembali UUD 1945", "Pembentukan MPRS dan DPAS", "Pengangkatan Soeharto sebagai Presiden"],
            answerIndex: 3
        },
        {
            question: "Program ekonomi 'Sistem Ali-Baba' bertujuan untuk...",
            options: ["Membantu pengusaha pribumi agar bisa bersaing dengan pengusaha non-pribumi", "Mengusir pengusaha asing", "Menasionalisasi perusahaan Belanda", "Mencetak uang baru"],
            answerIndex: 0
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
        if (idx === questions[currentQ].answerIndex) {
            setScore(score + 20);
        }
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
            <div className="bg-[#171717] p-8 rounded-lg shadow-lg border border-history-gold/30 text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 font-sans text-history-brown uppercase tracking-widest">Hasil Evaluasi</h3>
                <div className="text-6xl font-black text-history-gold mb-2">{score}</div>
                <p className="mb-6 text-history-muted italic font-light">{score >= 80 ? "Hebat! Kamu memahami dinamika sejarah." : "Pelajari lagi bagian ekonomi dan politik ya."}</p>
                <button onClick={restart} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs">Ulangi Kuis</button>
            </div>
        );
    }

    return (
        <div className="bg-[#171717] p-8 rounded-lg shadow-lg border border-history-gold/10">
            <div className="mb-6 flex justify-between text-xs font-bold text-history-muted uppercase tracking-widest">
                <span>Soal {currentQ + 1}/{questions.length}</span>
                <span className="text-history-gold">Skor: {score}</span>
            </div>
            <h3 className="font-bold text-lg mb-8 text-history-brown">{questions[currentQ].question}</h3>
            <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(idx)} disabled={isAnswered} className={`w-full text-left p-4 border rounded transition-all group ${selectedOption === idx ? (idx === questions[currentQ].answerIndex ? 'bg-emerald-900/30 border-emerald-500' : 'bg-rose-900/30 border-rose-500') : 'bg-[#0a0a0a] border-history-gold/10 hover:bg-[#1c1c1c]'}`}>
                        <span className="font-light">{opt}</span>
                        {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check-circle text-emerald-500 float-right"></i>}
                        {isAnswered && selectedOption === idx && idx !== questions[currentQ].answerIndex && <i className="fas fa-times-circle text-rose-500 float-right"></i>}
                    </button>
                ))}
            </div>
            {isAnswered && (
                <div className="mt-8 text-right">
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs">Lanjut</button>
                </div>
            )}
        </div>
    );
};