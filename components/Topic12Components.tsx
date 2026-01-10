import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessOrba: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Mari kita kembali ke tahun 1966...",
        "Jalanan Jakarta penuh dengan mahasiswa yang turun ke jalan.",
        "Harga beras melambung tinggi, rakyat antre minyak tanah.",
        "Rasakan semangat perubahan yang membara di dada pemuda.",
        "Tarik napas... rasakan harapan akan tatanan baru yang lebih baik.",
        "Hembuskan... lepaskan memori kelam masa lalu, bersiap untuk Orde Baru."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-bullhorn text-history-gold text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-history-gold text-history-gold px-8 py-2 rounded-full hover:bg-history-gold hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MENUJU STABILITAS
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: JEJAK AKTIVIS '66 ---
export const Activist66Simulation: React.FC = () => {
    const [stats, setStats] = useState({ spirit: 50, order: 50 });
    const [turn, setTurn] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Kamu adalah mahasiswa UI tahun 1966. Negara dalam keadaan chaos. Tentukan langkahmu!");

    const scenarios = [
        {
            title: "Aksi Tritura (Januari 1966)",
            desc: "Harga barang naik 600%. Rakyat lapar. KAMI dan KAPPI berencana turun ke jalan menuntut Tritura.",
            options: [
                { text: "Ikut demonstrasi besar-besaran", effect: { spr: +30, ord: -20 }, msg: "Semangatmu membakar massa! Pemerintah mulai tertekan, tapi situasi makin tidak terkendali." },
                { text: "Fokus belajar di kampus", effect: { spr: -20, ord: +10 }, msg: "Kamu aman, tapi teman-temanmu mencapmu tidak peduli nasib rakyat." },
                { text: "Menulis kritik di koran kampus", effect: { spr: +10, ord: 0 }, msg: "Suaramu didengar kalangan intelektual, tapi kurang berdampak pada kebijakan langsung." }
            ]
        },
        {
            title: "Supersemar (Maret 1966)",
            desc: "Beredar kabar Presiden Soekarno memberikan mandat kepada Letjen Soeharto untuk memulihkan keamanan.",
            options: [
                { text: "Dukung penuh pembubaran PKI", effect: { spr: +10, ord: +40 }, msg: "Keamanan pulih dengan cepat. PKI dibubarkan. Orde Baru mulai terbentuk." },
                { text: "Kritis terhadap wewenang militer", effect: { spr: +20, ord: -10 }, msg: "Kamu khawatir militer akan terlalu dominan, tapi stabilitas memang dibutuhkan saat ini." },
                { text: "Tetap setia pada Orde Lama", effect: { spr: -10, ord: -30 }, msg: "Kamu tersingkir dari arus sejarah. Perubahan besar tidak bisa dibendung." }
            ]
        },
        {
            title: "Dualisme Kepemimpinan (1966-1967)",
            desc: "Ada dua matahari kembar: Soekarno masih Presiden, tapi Soeharto pemegang mandat eksekutif. Politik bingung.",
            options: [
                { text: "Desak Sidang Istimewa MPRS", effect: { spr: +20, ord: +30 }, msg: "Tepat! Ketidakpastian harus diakhiri. Soeharto akhirnya dilantik menjadi Pejabat Presiden." },
                { text: "Biarkan mengalir", effect: { spr: -10, ord: -10 }, msg: "Ketidakpastian berlanjut. Ekonomi makin sulit pulih." }
            ]
        }
    ];

    const handleChoice = (effect: any, msg: string) => {
        const newStats = {
            spirit: Math.min(100, Math.max(0, stats.spirit + effect.spr)),
            order: Math.min(100, Math.max(0, stats.order + effect.ord))
        };
        setStats(newStats);
        setMessage(msg);

        if (turn >= 3) {
            setGameOver(true);
            setMessage("Simulasi Selesai. Anda telah melewati masa transisi kritis bangsa ini.");
        } else {
            setTurn(turn + 1);
        }
    };

    const resetGame = () => {
        setStats({ spirit: 50, order: 50 });
        setTurn(1);
        setGameOver(false);
        setMessage("Kamu adalah mahasiswa UI tahun 1966. Negara dalam keadaan chaos. Tentukan langkahmu!");
    };

    const currentScenario = scenarios[turn - 1];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm">Simulasi: Jejak Aktivis '66</h3>
                <span className="text-xs text-history-muted">Fase: {turn}/3</span>
            </div>
            
            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-center">
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Semangat Juang</div>
                        <div className={`text-lg font-bold ${stats.spirit < 30 ? 'text-red-500' : 'text-history-gold'}`}>{stats.spirit}%</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Ketertiban Umum</div>
                        <div className={`text-lg font-bold ${stats.order < 30 ? 'text-red-500' : 'text-blue-400'}`}>{stats.order}%</div>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-[#0a0a0a] rounded border-l-2 border-history-gold text-history-brown italic text-center text-sm">
                    "{message}"
                </div>

                {!gameOver ? (
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">{currentScenario.title}</h4>
                        <p className="text-history-muted mb-6 text-sm">{currentScenario.desc}</p>
                        <div className="grid gap-3">
                            {currentScenario.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(opt.effect, opt.msg)}
                                    className="p-4 bg-[#262626] hover:bg-history-gold hover:text-[#0a0a0a] text-left rounded transition border border-white/5 text-sm group"
                                >
                                    <span className="font-bold mr-2 group-hover:text-black text-history-gold">{String.fromCharCode(65+idx)}.</span> {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-4">Orde Baru Telah Lahir</h4>
                        <p className="text-history-muted mb-6 text-sm">Sejarah mencatat peran mahasiswa angkatan '66 sebagai ujung tombak perubahan.</p>
                        <button onClick={resetGame} className="bg-history-red text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-red-700">
                            Ulangi Simulasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic12: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1: Timeline
    const [tl1Order, setTl1Order] = useState(''); const [tl1Date, setTl1Date] = useState('');
    const [tl2Order, setTl2Order] = useState(''); const [tl2Date, setTl2Date] = useState('');
    const [tl3Order, setTl3Order] = useState(''); const [tl3Date, setTl3Date] = useState('');
    const [tl4Order, setTl4Order] = useState(''); const [tl4Date, setTl4Date] = useState('');

    // Activity 2: Critical Thinking
    const [ctKasus, setCtKasus] = useState('');
    const [ctVisi, setCtVisi] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Mata Pelajaran: Sejarah - Materi: Lahirnya Orde Baru</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>Aktivitas 1: Analisis Kronologis (Timeline)</h3>
                    <p class="instruction">Petunjuk: Urutkan peristiwa berikut dari yang paling awal terjadi (1) hingga yang paling akhir (4).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="40%">Peristiwa</th>
                                <th width="20%">Urutan (1-4)</th>
                                <th width="40%">Tanggal/Tahun Peristiwa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Keluarnya Supersemar</td>
                                <td>${tl1Order}</td>
                                <td>${tl1Date}</td>
                            </tr>
                            <tr>
                                <td>Peristiwa G30S</td>
                                <td>${tl2Order}</td>
                                <td>${tl2Date}</td>
                            </tr>
                            <tr>
                                <td>Pelantikan Soeharto sebagai Presiden RI ke-2</td>
                                <td>${tl3Order}</td>
                                <td>${tl3Date}</td>
                            </tr>
                            <tr>
                                <td>Aksi Tritura</td>
                                <td>${tl4Order}</td>
                                <td>${tl4Date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Critical Thinking (HOTS)</h3>
                    
                    <p><strong>Kasus:</strong> Dalam Tritura, salah satu tuntutannya adalah "Turunkan Harga". Mengapa tuntutan ekonomi ini menjadi sangat penting pada tahun 1966, dan apa hubungannya dengan stabilitas politik saat itu?</p>
                    <div class="answer">${ctKasus}</div>

                    <p style="margin-top:15px;"><strong>Analisis Visi:</strong> Jelaskan makna kalimat "Melaksanakan Pancasila secara murni dan konsekuen"! Mengapa Orde Baru merasa perlu menggunakan slogan ini?</p>
                    <div class="answer">${ctVisi}</div>
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
                    <button onClick={() => window.open('https://forms.gle/JAC7AUkyWdi7poyH7', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 1: Analisis Kronologis (Timeline)</h4>
                    <p className="text-sm text-history-muted mb-4">Urutkan peristiwa berikut dari yang paling awal terjadi (1) hingga yang paling akhir (4).</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/2">Peristiwa</th>
                                    <th className="p-3 border border-history-gold/10 w-1/6">Urutan (1-4)</th>
                                    <th className="p-3 border border-history-gold/10 w-1/3">Tanggal/Tahun</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Keluarnya Supersemar</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl1Order} onChange={e => setTl1Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl1Date} onChange={e => setTl1Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Peristiwa G30S</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl2Order} onChange={e => setTl2Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl2Date} onChange={e => setTl2Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Pelantikan Soeharto (Presiden RI ke-2)</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl3Order} onChange={e => setTl3Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl3Date} onChange={e => setTl3Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Aksi Tritura</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl4Order} onChange={e => setTl4Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl4Date} onChange={e => setTl4Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 2: Critical Thinking (HOTS)</h4>
                    
                    <div className="mb-6">
                        <label className="block text-history-brown text-sm font-bold mb-2">Kasus: "Turunkan Harga"</label>
                        <p className="text-xs text-history-muted mb-2">Mengapa tuntutan ekonomi ini menjadi sangat penting pada tahun 1966, dan apa hubungannya dengan stabilitas politik saat itu?</p>
                        <textarea value={ctKasus} onChange={e => setCtKasus(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Analisis hubungan ekonomi dan politik..."></textarea>
                    </div>

                    <div>
                        <label className="block text-history-brown text-sm font-bold mb-2">Analisis Visi</label>
                        <p className="text-xs text-history-muted mb-2">Jelaskan makna kalimat "Melaksanakan Pancasila secara murni dan konsekuen"! Mengapa Orde Baru merasa perlu menggunakan slogan ini?</p>
                        <textarea value={ctVisi} onChange={e => setCtVisi(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Jawaban analisis visi..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const QuizOrba: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Latar belakang utama lahirnya Orde Baru adalah...",
            options: ["Peristiwa G30S dan krisis ekonomi", "Agresi Militer Belanda", "Keluarnya Indonesia dari PBB", "Pembentukan RIS"],
            answerIndex: 0
        },
        {
            question: "Isi dari Tritura (Tri Tuntutan Rakyat) adalah sebagai berikut, KECUALI...",
            options: ["Bubarkan PKI", "Bersihkan Kabinet Dwikora", "Turunkan Harga", "Turunkan Presiden Soekarno"],
            answerIndex: 3
        },
        {
            question: "Surat Perintah 11 Maret (Supersemar) berisi mandat dari Presiden Soekarno kepada...",
            options: ["Jenderal A.H. Nasution", "Letjen Soeharto", "Sultan Hamengkubuwono IX", "Adam Malik"],
            answerIndex: 1
        },
        {
            question: "Visi utama pemerintahan Orde Baru adalah...",
            options: ["Menjadikan Indonesia negara komunis", "Melaksanakan Pancasila & UUD 1945 secara murni dan konsekuen", "Membangun sistem liberal", "Menghapus peran militer dalam politik"],
            answerIndex: 1
        },
        {
            question: "Dualisme kepemimpinan nasional terjadi pada tahun 1966-1967 antara...",
            options: ["Soekarno dan Hatta", "Soekarno dan Soeharto", "Soeharto dan Nasution", "Aidit dan Untung"],
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
                <p className="text-history-muted mb-6">{score >= 80 ? "Sangat Baik! Anda memahami proses lahirnya Orde Baru." : "Pelajari lagi tentang Tritura dan Supersemar."}</p>
                <button onClick={restart} className="bg-history-red px-6 py-2 rounded text-white font-bold text-xs uppercase hover:bg-red-700 transition">Ulangi Kuis</button>
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
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded font-bold text-xs uppercase hover:bg-[#c5a028] transition">
                        {currentQ < questions.length - 1 ? "Lanjut" : "Lihat Hasil"}
                    </button>
                </div>
            )}
        </div>
    );
};