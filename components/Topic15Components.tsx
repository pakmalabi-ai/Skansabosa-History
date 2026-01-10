import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessReformasi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Mari kembali ke bulan Mei 1998...",
        "Jakarta membara. Asap hitam mengepul di langit ibu kota.",
        "Ribuan mahasiswa menduduki gedung DPR/MPR, menyuarakan satu kata: REFORMASI.",
        "Tarik napas... rasakan ketegangan dan semangat perubahan yang bercampur aduk.",
        "Hembuskan... sadari bahwa kebebasan yang kita nikmati hari ini dibayar mahal.",
        "Siapkan hatimu untuk memahami detik-detik runtuhnya kekuasaan 32 tahun."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-emerald-600 shadow-[0_0_30px_rgba(5,150,105,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-bullhorn text-emerald-600 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-emerald-600 text-emerald-600 px-8 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MASUK ERA BARU
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: HABIBIE'S DILEMMA ---
export const ReformasiSimulation: React.FC = () => {
    const [stats, setStats] = useState({ democracy: 50, stability: 50 });
    const [turn, setTurn] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');

    const scenarios = [
        {
            title: "Kebebasan Pers",
            desc: "Pers menuntut kebebasan setelah 32 tahun dibungkam. Namun, militer khawatir berita bebas akan memicu kerusuhan baru.",
            options: [
                { 
                    label: "Buka Kran Kebebasan Pers", 
                    effect: { dem: +30, stab: -10 }, 
                    msg: "Dunia memuji! Demokrasi tumbuh pesat, tapi kritik kepada pemerintah menjadi sangat pedas." 
                },
                { 
                    label: "Tetap Kontrol Media", 
                    effect: { dem: -20, stab: +10 }, 
                    msg: "Rakyat marah! Anda dianggap penerus Orde Baru. Demonstrasi kembali terjadi." 
                }
            ]
        },
        {
            title: "Tahanan Politik",
            desc: "Banyak tokoh oposisi dipenjara oleh rezim sebelumnya. Masyarakat mendesak pembebasan mereka.",
            options: [
                { 
                    label: "Bebaskan Tahanan Politik (Amnesti)", 
                    effect: { dem: +30, stab: +10 }, 
                    msg: "Langkah rekonsiliasi yang tepat! Citra pemerintah membaik di mata rakyat." 
                },
                { 
                    label: "Biarkan di Penjara", 
                    effect: { dem: -30, stab: -10 }, 
                    msg: "Kepercayaan publik anjlok. Anda dinilai tidak serius melakukan reformasi." 
                }
            ]
        },
        {
            title: "Masalah Timor Timur",
            desc: "Tekanan internasional (PBB) menuntut penyelesaian masalah HAM di Timor Timur. Pilihan sulit ada di tangan Anda.",
            options: [
                { 
                    label: "Tawarkan Referendum (Jajak Pendapat)", 
                    effect: { dem: +40, stab: -30 }, 
                    msg: "Keputusan berani! Timor Timur akhirnya lepas, tapi Indonesia terbebas dari beban diplomasi internasional." 
                },
                { 
                    label: "Pertahankan dengan Militer", 
                    effect: { dem: -20, stab: -20 }, 
                    msg: "Indonesia diembargo dunia. Ekonomi makin hancur. Krisis berkepanjangan." 
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
        setHistory([...history, option.msg]);

        if (turn < scenarios.length - 1) {
            setTurn(turn + 1);
        } else {
            setGameState('SUMMARY');
        }
    };

    const resetGame = () => {
        setStats({ democracy: 50, stability: 50 });
        setTurn(0);
        setHistory([]);
        setGameState('INTRO');
    };

    const currentScenario = scenarios[turn];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-user-tie mr-2"></i>Presiden Transisi</h3>
                <div className="flex gap-4 text-xs font-bold">
                    <span className={stats.democracy > 70 ? "text-emerald-500" : "text-history-muted"}>Demokrasi: {stats.democracy}%</span>
                    <span className={stats.stability > 70 ? "text-blue-500" : "text-history-muted"}>Stabilitas: {stats.stability}%</span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col justify-center">
                {gameState === 'INTRO' && (
                    <div className="text-center">
                        <div className="w-24 h-24 bg-[#0a0a0a] rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-history-gold">
                            <i className="fas fa-plane-departure text-4xl text-history-gold"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Habibie's Dilemma</h3>
                        <p className="text-history-brown mb-8 max-w-xl mx-auto font-light leading-relaxed">
                            Anda adalah B.J. Habibie. Anda mewarisi negara yang sedang terbakar, ekonomi hancur, dan rakyat yang marah. 
                            Setiap keputusan Anda akan menentukan apakah Indonesia selamat atau bubar.
                        </p>
                        <button onClick={() => setGameState('PLAYING')} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs shadow-lg">
                            Ambil Sumpah Jabatan
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="animate-fade-in w-full max-w-2xl mx-auto">
                        <div className="mb-2 text-center text-xs font-bold text-history-muted uppercase tracking-widest">Isu Kenegaraan {turn + 1}/3</div>
                        <h3 className="text-xl font-bold text-white text-center mb-4">{currentScenario.title}</h3>
                        <p className="text-history-muted text-center mb-8 font-light">{currentScenario.desc}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {currentScenario.options.map((opt, idx) => (
                                <button key={idx} onClick={() => handleChoice(opt)} className="p-6 bg-[#262626] border border-history-gold/10 rounded-xl hover:bg-[#0a0a0a] hover:border-history-gold transition group text-left">
                                    <span className="block text-xs font-bold text-history-gold mb-2 uppercase tracking-wide">Pilihan {String.fromCharCode(65+idx)}</span>
                                    <h4 className="text-white font-bold text-md mb-2 group-hover:text-history-gold">{opt.label}</h4>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'SUMMARY' && (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-4">🇮🇩</div>
                        <h3 className="text-2xl font-bold text-history-gold mb-4">Bapak Demokrasi</h3>
                        <p className="text-history-muted mb-6 max-w-lg mx-auto font-light">
                            Anda berhasil meletakkan fondasi demokrasi Indonesia modern dalam waktu yang sangat singkat (517 hari). 
                            Meski Timor Timur lepas, Anda menyelamatkan Indonesia dari kehancuran total.
                        </p>
                        <div className="bg-[#0a0a0a] p-6 rounded text-left text-sm text-history-muted mb-6 max-w-md mx-auto border border-history-gold/10">
                            <strong className="block mb-3 text-history-gold text-xs uppercase tracking-widest">Catatan Sejarah:</strong>
                            <ul className="list-disc pl-4 space-y-2">
                                {history.map((h, i) => <li key={i}>{h}</li>)}
                            </ul>
                        </div>
                        <button onClick={resetGame} className="border border-white/20 text-white px-8 py-3 rounded hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs transition">
                            Ulangi Simulasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic15: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1: Timeline
    const [tl12Mei, setTl12Mei] = useState(''); const [dmp12Mei, setDmp12Mei] = useState('');
    const [tl14Mei, setTl14Mei] = useState(''); const [dmp14Mei, setDmp14Mei] = useState('');
    const [tl18Mei, setTl18Mei] = useState(''); const [dmp18Mei, setDmp18Mei] = useState('');
    const [tl21Mei, setTl21Mei] = useState(''); const [dmp21Mei, setDmp21Mei] = useState('');

    // Activity 2: Critical Thinking
    const [analisisPers, setAnalisisPers] = useState('');
    const [analisisTimtim, setAnalisisTimtim] = useState('');
    const [analisisTapol, setAnalisisTapol] = useState('');

    // Activity 3: Refleksi
    const [refleksi, setRefleksi] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Menganalisis Transisi Orde Baru ke Reformasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>KEGIATAN 1: Timeline Analysis (Kronologis)</h3>
                    <p class="instruction">Susunlah urutan peristiwa kunci jatuhnya Soeharto pada bulan Mei 1998!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Tanggal</th>
                                <th width="40%">Peristiwa Penting</th>
                                <th width="40%">Dampak Langsung</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12 Mei 1998</td>
                                <td>${tl12Mei}</td>
                                <td>${dmp12Mei}</td>
                            </tr>
                            <tr>
                                <td>14 Mei 1998</td>
                                <td>${tl14Mei}</td>
                                <td>${dmp14Mei}</td>
                            </tr>
                            <tr>
                                <td>18 Mei 1998</td>
                                <td>${tl18Mei}</td>
                                <td>${dmp18Mei}</td>
                            </tr>
                            <tr>
                                <td>21 Mei 1998</td>
                                <td>${tl21Mei}</td>
                                <td>${dmp21Mei}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>KEGIATAN 2: Critical Thinking (HOTS)</h3>
                    <p class="instruction">Analisislah kebijakan Presiden B.J. Habibie berikut ini. Apakah kebijakan tersebut menguntungkan atau merugikan stabilitas negara saat itu? Berikan alasanmu!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Kebijakan</th>
                                <th width="70%">Analisis (Dampak Positif & Negatif)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Kebebasan Pers</strong> (Media bebas bicara)</td>
                                <td>${analisisPers}</td>
                            </tr>
                            <tr>
                                <td><strong>Referendum Timor Timur</strong> (Lepasnya Timtim)</td>
                                <td>${analisisTimtim}</td>
                            </tr>
                            <tr>
                                <td><strong>Pembebasan Tahanan Politik</strong></td>
                                <td>${analisisTapol}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>KEGIATAN 3: Refleksi Relevansi (Meaningfull)</h3>
                    <p><strong>"Jika kalian menjadi mahasiswa pada tahun 1998, hal apa yang akan kalian perjuangkan? Apakah hal tersebut masih relevan diperjuangkan di tahun 2026 ini?"</strong></p>
                    <div class="answer">${refleksi}</div>
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
                    <button onClick={() => window.open('https://forms.gle/t84zUrfTRjYC1Sa58', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">KEGIATAN 1: Timeline Analysis (Kronologis)</h4>
                    <p className="text-sm text-history-muted mb-4">Susunlah urutan peristiwa kunci jatuhnya Soeharto pada bulan Mei 1998!</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/5">Tanggal</th>
                                    <th className="p-3 border border-history-gold/10 w-2/5">Peristiwa Penting</th>
                                    <th className="p-3 border border-history-gold/10 w-2/5">Dampak Langsung</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">12 Mei 1998</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl12Mei} onChange={e => setTl12Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Peristiwa..." /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={dmp12Mei} onChange={e => setDmp12Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Dampak..." /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">14 Mei 1998</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl14Mei} onChange={e => setTl14Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Peristiwa..." /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={dmp14Mei} onChange={e => setDmp14Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Dampak..." /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">18 Mei 1998</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl18Mei} onChange={e => setTl18Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Peristiwa..." /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={dmp18Mei} onChange={e => setDmp18Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Dampak..." /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">21 Mei 1998</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl21Mei} onChange={e => setTl21Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Peristiwa..." /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={dmp21Mei} onChange={e => setDmp21Mei(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="Dampak..." /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">KEGIATAN 2: Critical Thinking (HOTS)</h4>
                    <p className="text-sm text-history-muted mb-4">Analisislah kebijakan Presiden B.J. Habibie. Apakah menguntungkan atau merugikan stabilitas negara?</p>
                    
                    <div className="space-y-4">
                        <div className="bg-[#171717] p-4 rounded border border-white/5">
                            <h5 className="text-white font-bold mb-2">Kebebasan Pers</h5>
                            <textarea value={analisisPers} onChange={e => setAnalisisPers(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs text-history-brown border border-white/10 h-20" placeholder="Analisis..."></textarea>
                        </div>
                        <div className="bg-[#171717] p-4 rounded border border-white/5">
                            <h5 className="text-white font-bold mb-2">Referendum Timor Timur</h5>
                            <textarea value={analisisTimtim} onChange={e => setAnalisisTimtim(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs text-history-brown border border-white/10 h-20" placeholder="Analisis..."></textarea>
                        </div>
                        <div className="bg-[#171717] p-4 rounded border border-white/5">
                            <h5 className="text-white font-bold mb-2">Pembebasan Tahanan Politik</h5>
                            <textarea value={analisisTapol} onChange={e => setAnalisisTapol(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs text-history-brown border border-white/10 h-20" placeholder="Analisis..."></textarea>
                        </div>
                    </div>
                </div>

                {/* Aktivitas 3 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">KEGIATAN 3: Refleksi Relevansi (Meaningfull)</h4>
                    <p className="text-sm text-history-muted mb-2">"Jika kalian menjadi mahasiswa pada tahun 1998, hal apa yang akan kalian perjuangkan? Apakah hal tersebut masih relevan diperjuangkan di tahun 2026 ini?"</p>
                    <textarea value={refleksi} onChange={e => setRefleksi(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-32 text-history-brown focus:border-history-gold outline-none" placeholder="Tuliskan refleksimu (1 paragraf singkat)..."></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const QuizReformasi: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Tragedi penembakan mahasiswa Universitas Trisakti yang memicu kerusuhan Mei 1998 terjadi pada tanggal...",
            options: ["12 Mei 1998", "14 Mei 1998", "20 Mei 1998", "21 Mei 1998"],
            answerIndex: 0
        },
        {
            question: "Agenda utama Reformasi yang dituntut mahasiswa tahun 1998 adalah, KECUALI...",
            options: ["Adili Soeharto dan kroninya", "Hapus Dwifungsi ABRI", "Lanjutkan pemerintahan Orde Baru", "Otonomi Daerah seluas-luasnya"],
            answerIndex: 2
        },
        {
            question: "Setelah Soeharto menyatakan berhenti, jabatan Presiden diserahkan kepada...",
            options: ["Amien Rais", "Megawati Soekarnoputri", "B.J. Habibie", "Wiranto"],
            answerIndex: 2
        },
        {
            question: "Kebijakan Presiden B.J. Habibie yang paling menandai era keterbukaan informasi adalah...",
            options: ["UU Kebebasan Pers", "Pemisahan Polri dari TNI", "Referendum Aceh", "Pembubaran Departemen Penerangan"],
            answerIndex: 0
        },
        {
            question: "Pada masa pemerintahan B.J. Habibie, provinsi yang lepas dari NKRI melalui referendum adalah...",
            options: ["Papua", "Aceh", "Timor Timur", "Maluku"],
            answerIndex: 2
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
                <p className="text-history-muted mb-6">{score >= 80 ? "Hebat! Semangat Reformasi ada padamu." : "Baca lagi kronologi Mei 98 ya."}</p>
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