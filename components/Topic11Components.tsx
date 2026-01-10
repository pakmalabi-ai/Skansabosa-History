import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessTerpimpin: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Bayangkan sebuah kelas yang sangat gaduh...",
        "Semua orang berteriak, berebut menjadi ketua, tidak ada aturan.",
        "Sekarang, bayangkan satu sosok pemimpin masuk dan memukul meja.",
        "HENING. Semua diam dan menunduk patuh.",
        "Tarik napas... rasakan ketenangan, namun juga tekanan otoritas.",
        "Itulah suasana peralihan dari Demokrasi Liberal ke Terpimpin."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-red shadow-[0_0_30px_rgba(190,18,60,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-gavel text-history-red text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-history-red text-history-red px-8 py-2 rounded-full hover:bg-history-red hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MASUK ERA TERPIMPIN
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: THE GREAT LEADER'S BALANCE (NASAKOM) ---
export const NasakomSimulation: React.FC = () => {
    const [stats, setStats] = useState({ tni: 50, pki: 50, economy: 50 });
    const [turn, setTurn] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Sebagai Presiden, Anda harus menyeimbangkan kekuatan TNI AD dan PKI sambil menjaga ekonomi agar tidak runtuh.");

    const scenarios = [
        {
            title: "Isu Angkatan Kelima (1965)",
            desc: "PKI mengusulkan agar buruh dan tani dipersenjatai untuk membantu konfrontasi Malaysia (Angkatan Kelima). Petinggi TNI AD menolak keras ide ini karena takut ada tentara tandingan.",
            options: [
                { text: "Setuju usul PKI (Persenjatai Buruh)", effect: { tni: -30, pki: +30, eco: -10 }, msg: "PKI makin kuat dan merasa di atas angin. Jenderal TNI marah besar!" },
                { text: "Tolak usul PKI (Dukung TNI)", effect: { tni: +20, pki: -20, eco: 0 }, msg: "TNI AD lega. PKI merasa dianaktirikan dan mulai memprovokasi masa." },
                { text: "Tunda keputusan (Ulur Waktu)", effect: { tni: -10, pki: -10, eco: 0 }, msg: "Kedua pihak kesal karena ketidaktegasan Anda. Situasi memanas." }
            ]
        },
        {
            title: "Krisis Ekonomi & Inflasi",
            desc: "Inflasi mencapai 600%. Harga beras selangit. Penasihat menyarankan Sanering (Gunting Nilai Uang) atau mencari hutang.",
            options: [
                { text: "Lakukan Sanering (Potong Nilai Uang)", effect: { tni: 0, pki: +10, eco: -40 }, msg: "Rakyat panik! Nilai uang hancur. Ekonomi justru makin lumpuh. Pedagang tutup toko." },
                { text: "Cari Hutang ke Blok Timur (Uni Soviet)", effect: { tni: -10, pki: +20, eco: +10 }, msg: "Ekonomi sedikit terbantu, tapi Indonesia makin condong ke Komunis. Barat memusuhi kita." },
                { text: "Stop Proyek Mercusuar (Hemat)", effect: { tni: +10, pki: -10, eco: +30 }, msg: "Ekonomi membaik, tapi Anda kehilangan wibawa sebagai 'Mercusuar Dunia' di mata internasional." }
            ]
        },
        {
            title: "Konfrontasi Malaysia (Ganyang Malaysia)",
            desc: "Malaysia dianggap boneka Inggris (Nekolim). PKI mendesak 'Ganyang Malaysia'. TNI siap tapi khawatir logistik.",
            options: [
                { text: "Ganyang Malaysia! (Perang Terbuka)", effect: { tni: +10, pki: +30, eco: -50 }, msg: "Nasionalisme membara! Tapi kas negara kosong melompong untuk biaya perang." },
                { text: "Diplomasi Damai", effect: { tni: -10, pki: -40, eco: +20 }, msg: "PKI menuduh Anda lembek terhadap Nekolim. Ekonomi stabil, tapi politik gaduh." }
            ]
        }
    ];

    const handleChoice = (effect: any, msg: string) => {
        const newStats = {
            tni: Math.min(100, Math.max(0, stats.tni + effect.tni)),
            pki: Math.min(100, Math.max(0, stats.pki + effect.pki)),
            economy: Math.min(100, Math.max(0, stats.economy + effect.eco))
        };
        setStats(newStats);
        setMessage(msg);

        if (newStats.tni <= 0 || newStats.pki <= 0 || newStats.economy <= 0) {
            setGameOver(true);
            setMessage("Keseimbangan hancur! Terjadi kudeta atau kebangkrutan negara. Sejarah mencatat kegagalan ini.");
        } else if (turn >= 3) {
            setGameOver(true);
            setMessage("Anda berhasil bertahan di atas tali yang tipis hingga tahun 1965. Namun badai besar (G30S) menanti di depan mata...");
        } else {
            setTurn(turn + 1);
        }
    };

    const resetGame = () => {
        setStats({ tni: 50, pki: 50, economy: 50 });
        setTurn(1);
        setGameOver(false);
        setMessage("Mulai simulasi keseimbangan kekuasaan.");
    };

    const currentScenario = scenarios[turn - 1];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm">Simulasi: The Great Leader's Balance</h3>
                <span className="text-xs text-history-muted">Tahun: {1963 + turn - 1}</span>
            </div>
            
            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Loyalitas TNI</div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${stats.tni < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${stats.tni}%` }}></div>
                        </div>
                        <div className="text-xs mt-1 font-bold">{stats.tni}%</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Dukungan PKI</div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${stats.pki < 30 ? 'bg-red-500' : 'bg-red-600'}`} style={{ width: `${stats.pki}%` }}></div>
                        </div>
                        <div className="text-xs mt-1 font-bold">{stats.pki}%</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Ekonomi</div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${stats.economy < 30 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${stats.economy}%` }}></div>
                        </div>
                        <div className="text-xs mt-1 font-bold">{stats.economy}%</div>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-[#0a0a0a] rounded border-l-2 border-history-gold text-history-brown italic text-center text-sm">
                    "{message}"
                </div>

                {!gameOver && currentScenario ? (
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
                        <h4 className="text-xl font-bold text-white mb-4">Simulasi Selesai</h4>
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
export const LKPDTopic11: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1
    const [act1Feeling, setAct1Feeling] = useState('');

    // Activity 2
    const [act2Politik, setAct2Politik] = useState('');
    const [act2Ekonomi, setAct2Ekonomi] = useState('');

    // Activity 3
    const [act3Refleksi, setAct3Refleksi] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Investigasi Sejarah - Transisi Demokrasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>Aktivitas 1: Analisis Visual (Mindful)</h3>
                    <p class="instruction">Amati gambar/video Dekrit Presiden yang ditayangkan guru.</p>
                    <p><strong>1. Apa yang kalian rasakan jika berada di situasi saat Dekrit dibacakan? (Tegang/Senang/Bingung?)</strong></p>
                    <div class="answer">${act1Feeling}</div>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Pemecahan Masalah (HOTS & TPACK)</h3>
                    <p class="instruction">Kasus: Indonesia mengalami hiperinflasi hingga 600% pada akhir masa Demokrasi Terpimpin. Namun, di saat yang sama, Presiden Soekarno membangun proyek mercusuar (Stadion GBK, Monas, Hotel Indonesia).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Sudut Pandang</th>
                                <th width="70%">Analisis Kelompok</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Alasan Politik (Proyek Mercusuar)</strong><br/>Apakah keputusan ini dapat dibenarkan secara politik?</td>
                                <td>${act2Politik}</td>
                            </tr>
                            <tr>
                                <td><strong>Alasan Ekonomi (Dampak bagi rakyat)</strong><br/>Bagaimana dampaknya terhadap perut rakyat saat itu?</td>
                                <td>${act2Ekonomi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 3: Refleksi Kritis (Meaningful)</h3>
                    <p><strong>Jika kalian menjadi pemimpin saat itu, apa yang akan kalian pilih:</strong></p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li>A. Memberi kebebasan penuh (Liberal) tapi negara ribut terus.</li>
                        <li>B. Memimpin dengan keras (Terpimpin) agar negara stabil, tapi kebebasan dibatasi.</li>
                    </ul>
                    <p><strong>Berikan argumenmu!</strong></p>
                    <div class="answer">${act3Refleksi}</div>
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
                    <button onClick={() => window.open('https://forms.gle/WRY4xuvuzPrQ4ZUT7', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 1: Analisis Visual (Mindful)</h4>
                    <p className="text-sm text-history-muted mb-2">Apa yang kalian rasakan jika berada di situasi saat Dekrit Presiden 5 Juli 1959 dibacakan? (Tegang/Senang/Bingung?)</p>
                    <textarea value={act1Feeling} onChange={e => setAct1Feeling(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Jawab di sini..."></textarea>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 2: Pemecahan Masalah (HOTS)</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/3">Sudut Pandang</th>
                                    <th className="p-3 border border-history-gold/10 w-2/3">Analisis Kelompok</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 align-top">
                                        <strong className="text-history-gold block mb-1">Alasan Politik</strong>
                                        (Proyek Mercusuar)
                                    </td>
                                    <td className="p-2 border border-history-gold/10">
                                        <textarea value={act2Politik} onChange={e => setAct2Politik(e.target.value)} className="bg-[#0a0a0a] w-full p-2 h-24 rounded border border-white/10 focus:border-history-gold outline-none" placeholder="Analisis politik..."></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 align-top">
                                        <strong className="text-history-gold block mb-1">Alasan Ekonomi</strong>
                                        (Dampak bagi rakyat)
                                    </td>
                                    <td className="p-2 border border-history-gold/10">
                                        <textarea value={act2Ekonomi} onChange={e => setAct2Ekonomi(e.target.value)} className="bg-[#0a0a0a] w-full p-2 h-24 rounded border border-white/10 focus:border-history-gold outline-none" placeholder="Analisis ekonomi..."></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 3 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 3: Refleksi Kritis (Meaningful)</h4>
                    <p className="text-sm text-history-muted mb-2">Jika kalian menjadi pemimpin saat itu, pilih: <strong>(A)</strong> Bebas tapi ribut (Liberal) atau <strong>(B)</strong> Keras tapi stabil (Terpimpin)? Berikan argumenmu!</p>
                    <textarea value={act3Refleksi} onChange={e => setAct3Refleksi(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-32 text-history-brown focus:border-history-gold outline-none" placeholder="Jawaban kritis..."></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const QuizTerpimpin: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Apa latar belakang utama dikeluarkannya Dekrit Presiden 5 Juli 1959?",
            options: ["Serangan Belanda", "Kegagalan Konstituante menyusun UUD", "Inflasi ekonomi", "Pemberontakan PKI"],
            answerIndex: 1
        },
        {
            question: "Isi Dekrit Presiden 5 Juli 1959 adalah, KECUALI...",
            options: ["Pembubaran Konstituante", "Berlakunya kembali UUD 1945", "Pembentukan MPRS dan DPAS", "Pembubaran PKI"],
            answerIndex: 3
        },
        {
            question: "Konsep NASAKOM menggabungkan tiga kekuatan besar, yaitu...",
            options: ["Nasionalis, Agama, Komunis", "Negara, Agama, Komunitas", "Nasional, Sosialis, Kapitalis", "Nelayan, Angkatan Bersenjata, Komunitas"],
            answerIndex: 0
        },
        {
            question: "Kebijakan ekonomi memotong nilai uang (Rp 1000 jadi Rp 100) untuk menekan inflasi disebut...",
            options: ["Devaluasi", "Sanering", "Gunting Syafruddin", "Ali Baba"],
            answerIndex: 1
        },
        {
            question: "Proyek pembangunan mercusuar (Monas, GBK) bertujuan untuk...",
            options: ["Menghabiskan anggaran", "Menunjukkan kehebatan Indonesia di mata dunia (NEFO)", "Tempat wisata pejabat", "Markas militer"],
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
                <p className="text-history-muted mb-6">{score >= 80 ? "Luar Biasa! Anda memahami era Demokrasi Terpimpin." : "Pelajari lagi materi tentang Dekrit dan kebijakan ekonomi."}</p>
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