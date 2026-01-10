import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessDampak: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Mari duduk dengan nyaman...",
        "Bayangkan sebuah negara yang baru bangkit dari pembungkaman panjang.",
        "Tarik napas... rasakan kebebasan berbicara yang kita nikmati hari ini.",
        "Hembuskan... lepaskan ego, karena demokrasi adalah tentang 'Kita', bukan 'Aku'.",
        "Mari belajar sejarah agar kita bijak menggunakan kebebasan ini."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-royalGold shadow-[0_0_30px_rgba(180,83,9,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-wind text-royalGold text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-royalGold text-royalGold px-8 py-2 rounded-full hover:bg-royalGold hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
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

// --- SIMULATION: AGEN PERUBAHAN ---
export const AgentOfChangeSim: React.FC = () => {
    const [stats, setStats] = useState({ democracy: 50, stability: 50 });
    const [turn, setTurn] = useState(0);
    const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');
    const [feedback, setFeedback] = useState("");

    const scenarios = [
        {
            title: "Masalah Kebebasan Pers (1999)",
            desc: "Media massa mulai mengkritik pemerintah secara tajam. Pejabat lama menyarankan pemberlakuan kembali izin ketat (SIUPP).",
            options: [
                { 
                    label: "Batasi Media (Kontrol Ketat)", 
                    effect: { dem: -20, stab: +10 }, 
                    msg: "Stabilitas terjaga sementara, tapi rakyat marah karena merasa kembali ke Orde Baru. Demokrasi mundur." 
                },
                { 
                    label: "Bebaskan Media (Cabut SIUPP)", 
                    effect: { dem: +30, stab: -10 }, 
                    msg: "Keputusan Tepat! UU Pers No. 40/1999 lahir. Meski gaduh, ini fondasi demokrasi." 
                }
            ]
        },
        {
            title: "Tuntutan Daerah (2001)",
            desc: "Daerah kaya sumber daya alam mengancam ingin merdeka jika hasil bumi terus disedot pusat. Apa solusinya?",
            options: [
                { 
                    label: "Terapkan Otonomi Daerah", 
                    effect: { dem: +20, stab: +20 }, 
                    msg: "Hebat! Desentralisasi meredam gejolak disintegrasi. Daerah kini bisa mengurus dirinya sendiri." 
                },
                { 
                    label: "Pertahankan Sentralisasi", 
                    effect: { dem: -10, stab: -30 }, 
                    msg: "Bahaya! Ketidakadilan pusat memicu gerakan separatis semakin kuat." 
                }
            ]
        },
        {
            title: "Peran Militer (2004)",
            desc: "Ada usulan agar militer tetap memiliki jatah kursi di DPR tanpa pemilu untuk menjaga keamanan.",
            options: [
                { 
                    label: "Hapus Dwifungsi ABRI", 
                    effect: { dem: +30, stab: +10 }, 
                    msg: "Langkah bersejarah! TNI fokus pertahanan, tidak lagi berpolitik. Supremasi sipil tegak." 
                },
                { 
                    label: "Pertahankan Kursi ABRI", 
                    effect: { dem: -30, stab: 0 }, 
                    msg: "Demokrasi cacat. Rakyat ingin wakil yang dipilih, bukan ditunjuk." 
                }
            ]
        }
    ];

    const handleChoice = (option: any) => {
        const newStats = {
            democracy: Math.min(100, Math.max(0, stats.democracy + option.effect.dem)),
            stability: Math.min(100, Math.max(0, stats.stability + option.effect.stab))
        };
        setStats(newStats);
        setFeedback(option.msg);
        
        if (turn < scenarios.length - 1) {
            setTimeout(() => {
                setTurn(turn + 1);
                setFeedback("");
            }, 2000);
        } else {
            setTimeout(() => setGameState('SUMMARY'), 2000);
        }
    };

    const resetGame = () => {
        setStats({ democracy: 50, stability: 50 });
        setTurn(0);
        setGameState('INTRO');
        setFeedback("");
    };

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-gamepad mr-2"></i>Simulasi Transisi</h3>
                <div className="flex gap-4 text-xs font-bold">
                    <span className={stats.democracy > 70 ? "text-green-500" : "text-history-muted"}>Demokrasi: {stats.democracy}%</span>
                    <span className={stats.stability > 70 ? "text-blue-500" : "text-history-muted"}>Stabilitas: {stats.stability}%</span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col justify-center">
                {gameState === 'INTRO' && (
                    <div className="text-center">
                        <i className="fas fa-user-tie text-6xl text-history-muted mb-6 opacity-50"></i>
                        <h3 className="text-2xl font-bold text-white mb-4">Jadilah Agen Perubahan</h3>
                        <p className="text-history-brown mb-8 max-w-xl mx-auto font-light leading-relaxed">
                            Bayangkan kamu adalah penasihat pemerintah di masa transisi 1999. Setiap keputusanmu akan menentukan nasib demokrasi Indonesia.
                        </p>
                        <button onClick={() => setGameState('PLAYING')} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs shadow-lg">
                            Mulai Simulasi
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="animate-fade-in w-full max-w-2xl mx-auto">
                        {!feedback ? (
                            <>
                                <div className="mb-2 text-center text-xs font-bold text-history-muted uppercase tracking-widest">Skenario {turn + 1}/3</div>
                                <h3 className="text-xl font-bold text-white text-center mb-4">{scenarios[turn].title}</h3>
                                <p className="text-history-muted text-center mb-8 font-light">{scenarios[turn].desc}</p>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    {scenarios[turn].options.map((opt, idx) => (
                                        <button key={idx} onClick={() => handleChoice(opt)} className="p-6 bg-[#262626] border border-history-gold/10 rounded-xl hover:bg-[#0a0a0a] hover:border-history-gold transition group text-left">
                                            <span className="block text-xs font-bold text-history-gold mb-2 uppercase tracking-wide">Pilihan {String.fromCharCode(65+idx)}</span>
                                            <h4 className="text-white font-bold text-md mb-2 group-hover:text-history-gold">{opt.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center animate-fade-in">
                                <h3 className="text-xl font-bold text-history-gold mb-4">Dampak Keputusan</h3>
                                <p className="text-white text-lg font-light italic">"{feedback}"</p>
                                <p className="text-history-muted text-xs mt-4 animate-pulse">Memuat skenario berikutnya...</p>
                            </div>
                        )}
                    </div>
                )}

                {gameState === 'SUMMARY' && (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-4">🏛️</div>
                        <h3 className="text-2xl font-bold text-history-gold mb-4">Reformasi Berjalan!</h3>
                        <p className="text-history-muted mb-6 max-w-lg mx-auto font-light">
                            Anda berhasil membawa Indonesia melewati masa transisi kritis. Demokrasi dan stabilitas mulai tumbuh beriringan.
                        </p>
                        <button onClick={resetGame} className="border border-white/20 text-white px-8 py-3 rounded hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs transition">
                            Main Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic17: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1
    const [eraReformasi1, setEraReformasi1] = useState(''); const [analisis1, setAnalisis1] = useState('');
    const [eraReformasi2, setEraReformasi2] = useState(''); const [analisis2, setAnalisis2] = useState('');
    const [eraReformasi3, setEraReformasi3] = useState(''); const [analisis3, setAnalisis3] = useState('');

    // Activity 2
    const [problemSolving1, setProblemSolving1] = useState('');
    const [problemSolving2, setProblemSolving2] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Investigasi Dampak Reformasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>AKTIVITAS 1: Perbandingan Era (HOTS - Menganalisis)</h3>
                    <p class="instruction">Lengkapi tabel berikut untuk melihat kontras perubahan!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek</th>
                                <th width="25%">Era Orde Baru (Sebelum 1998)</th>
                                <th width="25%">Era Reformasi (Sekarang)</th>
                                <th width="30%">Analisis (Lebih baik/Buruk? Mengapa?)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Kebebasan Pers / Media</td>
                                <td>Media dikontrol ketat, ada pembredelan.</td>
                                <td>${eraReformasi1}</td>
                                <td>${analisis1}</td>
                            </tr>
                            <tr>
                                <td>Pemilihan Pemimpin</td>
                                <td>Presiden dipilih MPR.</td>
                                <td>${eraReformasi2}</td>
                                <td>${analisis2}</td>
                            </tr>
                            <tr>
                                <td>Militer (Dwifungsi ABRI)</td>
                                <td>Militer berpolitik & masuk pemerintahan sipil.</td>
                                <td>${eraReformasi3}</td>
                                <td>${analisis3}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>AKTIVITAS 2: Studi Kasus Kontekstual (Problem Solving)</h3>
                    <p><strong>Kasus:</strong> "Di era Reformasi, banyak pejabat tertangkap KPK. Namun, masih banyak warga yang merasa korupsi semakin merajalela dibanding Orde Baru."</p>
                    
                    <p><strong>1. Menurut kelompokmu, apakah korupsi bertambah banyak, atau penegakan hukumnya yang semakin transparan sehingga banyak yang tertangkap? Jelaskan alasannya!</strong></p>
                    <div class="answer">${problemSolving1}</div>

                    <p style="margin-top:15px;"><strong>2. Sebagai pelajar SMK, tindakan nyata apa yang bisa kalian lakukan untuk mencegah mental korupsi di lingkungan sekolah?</strong></p>
                    <div class="answer">${problemSolving2}</div>
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
                    <button onClick={() => window.open('https://forms.gle/eEwwNv7afj6GWztJ6', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">AKTIVITAS 1: Perbandingan Era (HOTS)</h4>
                    <p className="text-sm text-history-muted mb-4">Lengkapi tabel berikut untuk melihat kontras perubahan!</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/4">Aspek</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Era Orde Baru</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Era Reformasi</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Analisis</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold">Kebebasan Pers</td>
                                    <td className="p-3 border border-history-gold/10 italic">Media dikontrol ketat, ada pembredelan.</td>
                                    <td className="p-2 border border-history-gold/10"><input value={eraReformasi1} onChange={e => setEraReformasi1(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="..." /></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={analisis1} onChange={e => setAnalisis1(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 h-16" placeholder="..."></textarea></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold">Pemilihan Pemimpin</td>
                                    <td className="p-3 border border-history-gold/10 italic">Presiden dipilih MPR.</td>
                                    <td className="p-2 border border-history-gold/10"><input value={eraReformasi2} onChange={e => setEraReformasi2(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="..." /></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={analisis2} onChange={e => setAnalisis2(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 h-16" placeholder="..."></textarea></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold">Militer (Dwifungsi)</td>
                                    <td className="p-3 border border-history-gold/10 italic">Militer berpolitik & masuk pemerintahan sipil.</td>
                                    <td className="p-2 border border-history-gold/10"><input value={eraReformasi3} onChange={e => setEraReformasi3(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="..." /></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={analisis3} onChange={e => setAnalisis3(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 h-16" placeholder="..."></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">AKTIVITAS 2: Studi Kasus Kontekstual (Problem Solving)</h4>
                    <p className="text-sm text-history-muted mb-4 bg-[#171717] p-3 rounded italic">Kasus: "Di era Reformasi, banyak pejabat tertangkap KPK. Namun, masih banyak warga yang merasa korupsi semakin merajalela dibanding Orde Baru."</p>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">1. Apakah korupsi bertambah banyak, atau penegakan hukumnya yang semakin transparan? Jelaskan!</p>
                            <textarea value={problemSolving1} onChange={e => setProblemSolving1(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Jawabanmu..."></textarea>
                        </div>
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">2. Sebagai pelajar SMK, tindakan nyata apa yang bisa kalian lakukan untuk mencegah mental korupsi di sekolah?</p>
                            <textarea value={problemSolving2} onChange={e => setProblemSolving2(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Contoh: Jujur saat ujian..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const QuizReformasiDampak: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Salah satu dampak negatif penerapan Otonomi Daerah yang tidak terkontrol adalah munculnya...",
            options: ["Pembangunan merata", "Raja-raja kecil di daerah (Dinasti Politik)", "Kebebasan pers", "Investasi asing"],
            answerIndex: 1
        },
        {
            question: "Landasan hukum yang menjadi tonggak kebebasan pers di era Reformasi adalah...",
            options: ["UU No. 40 Tahun 1999", "Supersemar", "Dekrit Presiden", "UU ITE"],
            answerIndex: 0
        },
        {
            question: "Pembatasan masa jabatan Presiden maksimal 2 periode merupakan hasil dari...",
            options: ["Sidang Istimewa 1998", "Amandemen UUD 1945", "Peraturan Pemerintah", "Keputusan Presiden"],
            answerIndex: 1
        },
        {
            question: "Apa perubahan mendasar peran TNI setelah penghapusan Dwifungsi ABRI?",
            options: ["Menjadi alat kekuasaan presiden", "Kembali ke barak sebagai alat pertahanan negara", "Menguasai sektor ekonomi", "Menjadi polisi"],
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
        if (idx === questions[currentQ].answerIndex) setScore(score + 25);
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
                <p className="text-history-muted mb-6">{score >= 75 ? "Hebat! Anda memahami dampak Reformasi." : "Coba pelajari materi lagi."}</p>
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