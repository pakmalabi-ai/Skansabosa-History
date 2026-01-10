import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessDemokrasiBaru: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Duduklah dengan nyaman...",
        "Bayangkan sebuah kotak suara di hadapanmu.",
        "Dulu, kotak ini hanya formalitas. Sekarang, ia adalah penentu masa depan.",
        "Tarik napas... rasakan kebebasan untuk memilih pemimpinmu sendiri.",
        "Hembuskan... lepaskan ketakutan akan intimidasi.",
        "Demokrasi bukan tujuan akhir, tapi jalan untuk kesejahteraan bersama."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-vote-yea text-blue-400 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-blue-400 text-blue-400 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-[#0a0a0a] transition font-bold text-xs uppercase tracking-[0.2em]"
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

// --- SIMULATION: KURSI KEPRESIDENAN ---
export const PresidentialSimulator: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'fail' | null, msg: string }>({ type: null, msg: '' });
    const [score, setScore] = useState(0);

    const scenarios = [
        {
            president: "Gus Dur (1999-2001)",
            context: "Warga Tionghoa ingin merayakan Imlek secara terbuka, namun Inpres No 14/1967 (Orba) melarangnya. Kelompok konservatif menekan Anda.",
            choices: [
                { text: "Cabut Inpres tersebut (Kebebasan Budaya)", isCorrect: true, feedback: "Bapak Pluralisme! Anda mengajarkan bangsa ini arti toleransi. Imlek kini menjadi hari libur nasional." },
                { text: "Pertahankan larangan demi stabilitas", isCorrect: false, feedback: "Diskriminasi berlanjut. Semangat reformasi untuk kesetaraan warga negara gagal Anda wujudkan." }
            ]
        },
        {
            president: "Megawati (2001-2004)",
            context: "Korupsi masih merajalela pasca Orde Baru. Rakyat menuntut lembaga yang super kuat (Superbody) untuk memberantas maling uang rakyat.",
            choices: [
                { text: "Serahkan pada Polisi dan Jaksa saja", isCorrect: false, feedback: "Kurang efektif. Lembaga lama dinilai masih kotor. Korupsi sulit diberantas." },
                { text: "Dirikan KPK (Komisi Pemberantasan Korupsi)", isCorrect: true, feedback: "Langkah bersejarah! KPK menjadi lembaga yang paling ditakuti koruptor di tahun-tahun mendatang." }
            ]
        },
        {
            president: "Susilo Bambang Yudhoyono (2004-2014)",
            context: "Konflik GAM di Aceh sudah berlangsung puluhan tahun. Pasca Tsunami 2004, ada momentum untuk damai. Tapi syarat GAM berat (Otonomi Khusus).",
            choices: [
                { text: "Lanjutkan Darurat Militer", isCorrect: false, feedback: "Perang berlanjut. Korban jiwa bertambah. Anggaran negara habis untuk peluru." },
                { text: "Sepakati Perjanjian Helsinki (Damai)", isCorrect: true, feedback: "Damai di Serambi Mekkah. Aceh tetap dalam NKRI dengan otonomi khusus. Prestasi emas diplomasi!" }
            ]
        }
    ];

    const handleAnswer = (isCorrect: boolean, msg: string) => {
        setFeedback({ type: isCorrect ? 'success' : 'fail', msg });
        if (isCorrect) setScore(score + 1);
    };

    const nextLevel = () => {
        setFeedback({ type: null, msg: '' });
        setCurrentLevel(currentLevel + 1);
    };

    const resetGame = () => {
        setCurrentLevel(0);
        setScore(0);
        setFeedback({ type: null, msg: '' });
    };

    if (currentLevel >= scenarios.length) {
        return (
            <div className="bg-[#171717] p-8 rounded-xl text-center border border-history-gold/30 animate-fade-in">
                <div className="text-6xl mb-4">🇮🇩</div>
                <h3 className="text-2xl font-bold text-history-gold mb-2">Simulasi Selesai</h3>
                <p className="text-history-muted mb-6">Skor Keputusan Anda: {score}/{scenarios.length}</p>
                <p className="text-history-brown italic font-light mb-6">
                    "Setiap masa ada orangnya, setiap orang ada masanya. Terima kasih telah belajar menjadi pemimpin."
                </p>
                <button onClick={resetGame} className="bg-history-brown text-[#0a0a0a] px-6 py-2 rounded font-bold uppercase tracking-widest text-xs hover:bg-white transition">
                    Main Lagi
                </button>
            </div>
        );
    }

    const currentData = scenarios[currentLevel];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-user-tie mr-2"></i>Kursi Kepresidenan</h3>
                <span className="text-xs text-history-muted font-bold">Skenario {currentLevel + 1}/{scenarios.length}</span>
            </div>
            
            <div className="p-8">
                <h4 className="text-xl font-bold text-white mb-2">{currentData.president}</h4>
                <p className="text-history-muted mb-8 leading-relaxed font-light border-l-2 border-blue-500 pl-4 bg-[#0a0a0a] p-3 rounded-r">
                    {currentData.context}
                </p>

                {!feedback.type ? (
                    <div className="grid gap-4">
                        {currentData.choices.map((choice, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleAnswer(choice.isCorrect, choice.feedback)}
                                className="w-full text-left p-4 bg-[#262626] border border-white/5 rounded hover:border-history-gold hover:bg-[#0a0a0a] transition group"
                            >
                                <span className="text-history-gold font-bold mr-2 group-hover:text-white">Op. {String.fromCharCode(65+idx)}</span>
                                <span className="text-history-brown text-sm">{choice.text}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center animate-fade-in">
                        <div className={`p-6 rounded mb-6 border ${feedback.type === 'success' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                            <h5 className={`font-bold text-lg mb-2 ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {feedback.type === 'success' ? 'Keputusan Tepat!' : 'Kurang Tepat'}
                            </h5>
                            <p className="text-white font-light text-sm">{feedback.msg}</p>
                        </div>
                        <button onClick={nextLevel} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#c5a028] transition shadow-lg">
                            Lanjut <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic16: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1: Investigation
    const [presName, setPresName] = useState('');
    const [polPolicy, setPolPolicy] = useState('');
    const [ecoPolicy, setEcoPolicy] = useState('');
    const [challenge, setChallenge] = useState('');
    const [relevance, setRelevance] = useState('');
    const [sourceInfo, setSourceInfo] = useState('');

    // Activity 2: Reflection
    const [reflection1, setReflection1] = useState('');
    const [reflection2, setReflection2] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Analisis Komparatif Corak Pemerintahan Reformasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>B. Tabel Investigasi (TPACK Integration)</h3>
                    <p class="instruction">Analisis salah satu Presiden pada masa Reformasi (Habibie, Gus Dur, Megawati, SBY, atau Jokowi).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Aspek Analisis</th>
                                <th width="45%">Temuan Data / Fakta Sejarah</th>
                                <th width="25%">Sumber Informasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Nama Presiden & Periode</strong></td>
                                <td>${presName}</td>
                                <td rowspan="5">${sourceInfo}</td>
                            </tr>
                            <tr>
                                <td><strong>Kebijakan Politik Utama</strong><br/>(Misal: UU baru, Kebebasan Pers, Hubungan Luar Negeri)</td>
                                <td>${polPolicy}</td>
                            </tr>
                            <tr>
                                <td><strong>Kebijakan Ekonomi</strong><br/>(Misal: Nilai tukar, Harga BBM, Utang, Pembangunan)</td>
                                <td>${ecoPolicy}</td>
                            </tr>
                            <tr>
                                <td><strong>Tantangan / Masalah Terbesar</strong><br/>yang dihadapi saat menjabat</td>
                                <td>${challenge}</td>
                            </tr>
                            <tr>
                                <td><strong>Relevansi (Gen Z)</strong><br/>Apa kebijakan beliau yang masih terasa efeknya bagi Gen Z hari ini?</td>
                                <td>${relevance}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>C. Pertanyaan Refleksi Kritis (HOTS)</h3>
                    <p><strong>1. Jika kalian hidup di masa pemerintahan presiden tersebut, apakah kalian akan mendukung kebijakannya? Mengapa?</strong></p>
                    <div class="answer">${reflection1}</div>
                    
                    <p style="margin-top:15px;"><strong>2. Bandingkan dengan satu presiden lain (diskusikan dengan kelompok sebelah), mana yang menurut kalian paling berhasil menegakkan demokrasi? Jelaskan alasannya!</strong></p>
                    <div class="answer">${reflection2}</div>
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
                    <button onClick={() => window.open('https://forms.gle/z5tdKULn4ty2XfjA7', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">B. Tabel Investigasi (TPACK)</h4>
                    <p className="text-sm text-history-muted mb-4">Diskusikan mengenai salah satu tokoh Presiden Reformasi.</p>
                    
                    <div className="bg-[#171717] p-6 rounded-xl space-y-4 border border-white/5">
                        <div>
                            <label className="text-white text-xs font-bold uppercase mb-1 block">Nama Presiden & Periode</label>
                            <input value={presName} onChange={e => setPresName(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10" placeholder="Contoh: B.J. Habibie (1998-1999)" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-white text-xs font-bold uppercase mb-1 block">Kebijakan Politik</label>
                                <textarea value={polPolicy} onChange={e => setPolPolicy(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-24" placeholder="UU baru, Kebebasan Pers..."></textarea>
                            </div>
                            <div>
                                <label className="text-white text-xs font-bold uppercase mb-1 block">Kebijakan Ekonomi</label>
                                <textarea value={ecoPolicy} onChange={e => setEcoPolicy(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-24" placeholder="Nilai tukar, Harga BBM..."></textarea>
                            </div>
                        </div>

                        <div>
                            <label className="text-white text-xs font-bold uppercase mb-1 block">Tantangan Terbesar</label>
                            <textarea value={challenge} onChange={e => setChallenge(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-16" placeholder="Masalah utama saat menjabat..."></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-history-gold text-xs font-bold uppercase mb-1 block">Relevansi (Gen Z)</label>
                                <textarea value={relevance} onChange={e => setRelevance(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-20" placeholder="Apa efek kebijakannya bagi Gen Z?"></textarea>
                            </div>
                            <div>
                                <label className="text-history-gold text-xs font-bold uppercase mb-1 block">Sumber Informasi</label>
                                <textarea value={sourceInfo} onChange={e => setSourceInfo(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-20" placeholder="Link berita/Buku..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">C. Refleksi Kritis (HOTS)</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">1. Jika kalian hidup di masa pemerintahan presiden tersebut, apakah kalian akan mendukung kebijakannya? Mengapa?</p>
                            <textarea value={reflection1} onChange={e => setReflection1(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none"></textarea>
                        </div>
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">2. Bandingkan dengan satu presiden lain, mana yang menurut kalian paling berhasil menegakkan demokrasi? Jelaskan alasannya!</p>
                            <textarea value={reflection2} onChange={e => setReflection2(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const QuizDemokrasiBaru: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Lembaga negara yang dibentuk pada masa pemerintahan Megawati Soekarnoputri untuk memberantas korupsi adalah...",
            options: ["Kejaksaan Agung", "KPK (Komisi Pemberantasan Korupsi)", "Polri", "ICW"],
            answerIndex: 1
        },
        {
            question: "Kebijakan Gus Dur yang paling mencerminkan nilai toleransi dan pluralisme adalah...",
            options: ["Pembubaran Departemen Sosial", "Pencabutan larangan perayaan Imlek", "Mengganti nama Irian Jaya", "Semua benar"],
            answerIndex: 3
        },
        {
            question: "Presiden pertama Indonesia yang dipilih secara langsung oleh rakyat melalui Pemilu 2004 adalah...",
            options: ["B.J. Habibie", "Abdurrahman Wahid", "Megawati Soekarnoputri", "Susilo Bambang Yudhoyono"],
            answerIndex: 3
        },
        {
            question: "Perjanjian damai yang mengakhiri konflik berkepanjangan di Aceh pada masa pemerintahan SBY dikenal dengan...",
            options: ["Perjanjian Linggarjati", "Perjanjian Renville", "Perjanjian Helsinki", "Perjanjian KMB"],
            answerIndex: 2
        },
        {
            question: "Salah satu fokus utama pembangunan pada masa pemerintahan Joko Widodo (2014-2024) adalah...",
            options: ["Pembangunan Militer", "Infrastruktur (Jalan Tol, Bendungan)", "Sentralisasi Kekuasaan", "Pembatasan Media"],
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
                <p className="text-history-muted mb-6">{score >= 80 ? "Hebat! Wawasan demokrasimu luas." : "Baca lagi profil presidennya ya."}</p>
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