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

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizReformasi: React.FC = () => {
    // 20 Questions from PDF "Lahirnya Reformasi dan Masa Pemerintahan B.J. Habibie"
    const questions = [
        {
            id: 1,
            question: "Reformasi di Indonesia pada tahun 1998 lahir sebagai koreksi total terhadap penyelenggaraan negara pada masa Orde Baru. Faktor pemicu utama (trigger factor) yang menyebabkan runtuhnya kepercayaan masyarakat terhadap Presiden Soeharto adalah...",
            options: [
                "A. Kekalahan Golkar dalam Pemilu 1997",
                "B. Krisis moneter yang menyebabkan nilai tukar rupiah anjlok drastis",
                "C. Lepasnya Timor Timur dari Indonesia",
                "D. Terjadinya konflik antar etnis di Kalimantan",
                "E. Adanya intervensi asing dalam penyusunan kabinet"
            ],
            correct: 1 // B
        },
        {
            id: 2,
            question: "Pada tanggal 12 Mei 1998, terjadi peristiwa tragis yang menewaskan empat mahasiswa Universitas Trisakti. Peristiwa ini menjadi titik balik pergerakan mahasiswa karena...",
            options: [
                "A. Memicu solidaritas dan kemarahan massa yang lebih besar di seluruh Indonesia",
                "B. Menyebabkan Presiden Soeharto langsung mengundurkan diri saat itu juga",
                "C. Membuat PBB mengirimkan pasukan perdamaian ke Jakarta",
                "D. Menghentikan seluruh aktivitas ekonomi di Indonesia selamanya",
                "E. Menyebabkan militer mengambil alih kekuasaan dari presiden"
            ],
            correct: 0 // A
        },
        {
            id: 3,
            question: "Agenda Reformasi yang disuarakan oleh mahasiswa pada tahun 1998 mencakup enam tuntutan utama. Salah satu tuntutan yang berkaitan langsung dengan upaya membersihkan pemerintahan dari praktik penyalahgunaan kekuasaan adalah...",
            options: [
                "A. Amandemen UUD 1945",
                "B. Otonomi Daerah seluas-luasnya",
                "C. Pemberantasan Korupsi, Kolusi, dan Nepotisme (KKN)",
                "D. Penghapusan Dwi Fungsi ABRI",
                "E. Penegakan Supremasi Hukum"
            ],
            correct: 2 // C
        },
        {
            id: 4,
            question: "Setelah Presiden Soeharto menyatakan berhenti pada tanggal 21 Mei 1998, jabatan Presiden Republik Indonesia diserahkan kepada B.J. Habibie. Dasar hukum pengangkatan B.J. Habibie adalah...",
            options: [
                "A. Ketetapan MPR No. IV Tahun 1998",
                "B. Undang-Undang Dasar 1945 Pasal 8",
                "C. Hasil Pemilihan Umum 1997",
                "D. Kesepakatan antara Soeharto dan pimpinan DPR",
                "E. Desakan dari mahasiswa dan tokoh reformasi"
            ],
            correct: 1 // B
        },
        {
            id: 5,
            question: "Pemerintahan B.J. Habibie sering disebut sebagai pemerintahan transisi. Tantangan terbesar yang harus segera diselesaikan oleh Presiden B.J. Habibie pada awal masa jabatannya adalah...",
            options: [
                "A. Membangun infrastruktur jalan tol",
                "B. Memulihkan stabilitas ekonomi dan kepercayaan publik",
                "C. Menghapus seluruh partai politik lama",
                "D. Memindahkan ibu kota negara",
                "E. Membubarkan parlemen (DPR/MPR)"
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Salah satu kebijakan fundamental Presiden B.J. Habibie dalam bidang politik yang mengubah wajah demokrasi Indonesia adalah...",
            options: [
                "A. Membubarkan Departemen Penerangan",
                "B. Melarang pegawai negeri sipil berpolitik",
                "C. Memberikan kebebasan pers dan membebaskan tahanan politik",
                "D. Menetapkan Pancasila sebagai satu-satunya asas partai",
                "E. Mengangkat anggota TNI aktif sebagai kepala daerah"
            ],
            correct: 2 // C
        },
        {
            id: 7,
            question: "Kebijakan Presiden B.J. Habibie untuk memisahkan Bank Indonesia (BI) dari campur tangan pemerintah bertujuan untuk...",
            options: [
                "A. Agar pemerintah tidak bisa meminjam uang lagi",
                "B. Menjaga independensi BI dalam menjaga kestabilan nilai rupiah",
                "C. Meningkatkan jumlah uang yang beredar di masyarakat",
                "D. Memudahkan presiden dalam mencetak uang",
                "E. Agar BI bisa menjadi bank komersial biasa"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Istilah \"Dwifungsi ABRI\" yang menjadi salah satu sasaran kritik kaum reformis memiliki makna bahwa ABRI (TNI/Polri) memiliki dua peran, yaitu...",
            options: [
                "A. Sebagai penjaga perbatasan dan pasukan perdamaian PBB",
                "B. Sebagai kekuatan pertahanan keamanan dan kekuatan sosial politik",
                "C. Sebagai pelindung presiden dan pengaman pemilu",
                "D. Sebagai penegak hukum dan pengatur ekonomi",
                "E. Sebagai tentara reguler dan tentara cadangan"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Pada masa pemerintahan B.J. Habibie, diselenggarakan Jajak Pendapat (Referendum) untuk wilayah Timor Timur pada tahun 1999. Opsi yang ditawarkan pemerintah Indonesia kepada rakyat Timor Timur adalah...",
            options: [
                "A. Menjadi negara bagian atau negara serikat",
                "B. Otonomi luas (tetap dalam NKRI) atau menolak otonomi (merdeka)",
                "C. Bergabung dengan Australia atau Portugal",
                "D. Menjadi daerah istimewa atau daerah khusus ibukota",
                "E. Menerima bantuan ekonomi atau menolak bantuan ekonomi"
            ],
            correct: 1 // B
        },
        {
            id: 10,
            question: "Salah satu dampak positif dari UU No. 22 Tahun 1999 tentang Pemerintahan Daerah yang disahkan pada masa Presiden Habibie adalah...",
            options: [
                "A. Kekuasaan presiden menjadi tidak terbatas",
                "B. Terjadinya sentralisasi kekuasaan di Jakarta",
                "C. Daerah memiliki wewenang lebih besar untuk mengurus rumah tangganya sendiri (Desentralisasi)",
                "D. Gubernur dipilih langsung oleh Presiden",
                "E. Pendapatan daerah seluruhnya diserahkan ke pusat"
            ],
            correct: 2 // C
        },
        {
            id: 11,
            question: "Peristiwa pendudukan Gedung DPR/MPR oleh ribuan mahasiswa pada Mei 1998 menyimbolkan...",
            options: [
                "A. Kudeta militer terhadap pemerintahan yang sah",
                "B. Tekanan rakyat agar wakil rakyat segera mengambil sikap tegas terhadap presiden",
                "C. Keinginan mahasiswa untuk menjadi anggota DPR",
                "D. Dukungan mahasiswa terhadap kepemimpinan Harmoko",
                "E. Upaya mahasiswa untuk menguasai aset negara"
            ],
            correct: 1 // B
        },
        {
            id: 12,
            question: "Alasan utama MPR menolak pidato pertanggungjawaban Presiden B.J. Habibie pada Sidang Umum MPR tahun 1999 adalah...",
            options: [
                "A. Terjadinya kasus korupsi Bank Bali",
                "B. Kegagalan Habibie dalam menurunkan harga sembako",
                "C. Lepasnya Timor Timur dari Negara Kesatuan Republik Indonesia",
                "D. Adanya indikasi kecurangan dalam Pemilu 1999",
                "E. Habibie dianggap terlalu dekat dengan kroni Orde Baru"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Perbedaan mendasar antara Pemilu 1997 (masa Orde Baru) dengan Pemilu 1999 (masa Reformasi) terletak pada...",
            options: [
                "A. Jumlah partai peserta pemilu yang jauh lebih banyak pada tahun 1999",
                "B. Pemilu 1997 memilih presiden secara langsung",
                "C. Pemilu 1999 tidak diikuti oleh Golkar",
                "D. Pemilu 1997 diselenggarakan oleh KPU yang independen",
                "E. Pemilu 1999 hanya diikuti oleh tiga partai politik"
            ],
            correct: 0 // A
        },
        {
            id: 14,
            question: "Dalam mengatasi krisis ekonomi, langkah taktis yang dilakukan pemerintahan Habibie yang berhasil menguatkan nilai tukar rupiah dari level Rp16.000 menjadi sekitar Rp6.500 per dolar AS adalah...",
            options: [
                "A. Mencetak uang sebanyak-banyaknya",
                "B. Menutup semua bank swasta di Indonesia",
                "C. Menerapkan kebijakan moneter ketat dan restrukturisasi perbankan",
                "D. Meminta bantuan hutang baru tanpa syarat",
                "E. Mewajibkan warga negara menukarkan dolarnya dengan paksa"
            ],
            correct: 2 // C
        },
        {
            id: 15,
            question: "Kebebasan pers pada masa Reformasi ditandai dengan dicabutnya wewenang pemerintah untuk membatalkan izin penerbitan pers, yang sebelumnya dikenal dengan istilah...",
            options: [
                "A. Sensor",
                "B. Bredel (SIUPP)",
                "C. Somasi",
                "D. Interogasi",
                "E. Verifikasi"
            ],
            correct: 1 // B
        },
        {
            id: 16,
            question: "Tokoh reformasi yang dikenal sebagai \"Bapak Reformasi\" dan merupakan salah satu penggerak utama aksi mahasiswa 1998 adalah...",
            options: [
                "A. Abdurrahman Wahid (Gus Dur)",
                "B. Megawati Soekarnoputri",
                "C. Amien Rais",
                "D. Sultan Hamengkubuwono X",
                "E. Wiranto"
            ],
            correct: 2 // C
        },
        {
            id: 17,
            question: "Amandemen UUD 1945 yang dimulai sejak era Reformasi bertujuan untuk...",
            options: [
                "A. Mengganti dasar negara Pancasila",
                "B. Membatasi masa jabatan presiden agar tidak terjadi kekuasaan seumur hidup",
                "C. Menjadikan Indonesia negara federal",
                "D. Menghapus peran MPR sebagai lembaga negara",
                "E. Memberikan kekuasaan mutlak kepada DPR"
            ],
            correct: 1 // B
        },
        {
            id: 18,
            question: "Meskipun masa pemerintahannya singkat, Presiden B.J. Habibie dianggap telah meletakkan fondasi yang kuat bagi Indonesia baru karena...",
            options: [
                "A. Berhasil membangun industri pesawat terbang N-250",
                "B. Menciptakan stabilitas keamanan dengan pendekatan militer",
                "C. Membuka keran demokrasi dan kebebasan sipil seluas-luasnya",
                "D. Mewariskan hutang luar negeri yang sangat kecil",
                "E. Berhasil mempertahankan seluruh wilayah NKRI tanpa terkecuali"
            ],
            correct: 2 // C
        },
        {
            id: 19,
            question: "Berikut ini yang bukan merupakan ciri-ciri kehidupan politik pada masa Orde Baru yang dikritik oleh kaum reformis adalah...",
            options: [
                "A. Sentralisasi kekuasaan",
                "B. Dominasi Partai Golkar",
                "C. Kebebasan berpendapat yang terjamin",
                "D. Peran militer yang dominan dalam politik",
                "E. Pengekangan terhadap pers"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Pelajaran berharga (refleksi) yang dapat diambil generasi muda dari peristiwa Reformasi 1998 adalah...",
            options: [
                "A. Kekerasan adalah satu-satunya jalan untuk mencapai perubahan",
                "B. Pentingnya sikap kritis dan kepedulian terhadap nasib bangsa",
                "C. Mahasiswa tidak perlu ikut campur dalam urusan politik negara",
                "D. Stabilitas ekonomi lebih penting daripada kebebasan berpendapat",
                "E. Sejarah masa lalu tidak memiliki pengaruh pada masa kini"
            ],
            correct: 1 // B
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
                    <h2>Topik: Lahirnya Reformasi dan Pemerintahan B.J. Habibie</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Lahirnya Reformasi (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Lahirnya Reformasi dan Masa Pemerintahan B.J. Habibie</p>
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