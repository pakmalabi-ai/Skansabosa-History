import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessPembangunan: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Bayangkan sebuah negara yang baru bangkit dari kekacauan...",
        "Jalanan mulai diaspal, sekolah-sekolah Inpres dibangun di desa.",
        "Sawah-sawah menguning, lumbung padi penuh.",
        "Namun, di balik kemajuan itu, suara kritis dibungkam.",
        "Tarik napas... rasakan dilema antara kemakmuran dan kebebasan.",
        "Hembuskan... mari kita pelajari bagaimana 'Pembangunan' menjadi mantra sakti Orde Baru."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-hard-hat text-yellow-500 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-yellow-500 text-yellow-500 px-8 py-2 rounded-full hover:bg-yellow-500 hover:text-[#0a0a0a] transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MULAI MEMBANGUN
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: BAPAK PEMBANGUNAN SIMULATOR ---
export const PolicySimulation: React.FC = () => {
    const [stats, setStats] = useState({ economy: 30, stability: 30, democracy: 50 });
    const [turn, setTurn] = useState(0);
    const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'FEEDBACK' | 'SUMMARY'>('INTRO');
    const [feedback, setFeedback] = useState("");

    const scenarios = [
        {
            year: "1973",
            title: "Penyederhanaan Partai",
            desc: "Terlalu banyak partai membuat pemerintahan tidak stabil. Apa yang akan Anda lakukan?",
            options: [
                { 
                    label: "Biarkan Demokrasi Berjalan Alami", 
                    effect: { eco: -10, stab: -20, demo: 30 }, 
                    feedback: "Politik gaduh. Investor takut masuk. Pembangunan mangkrak karena DPR ribut terus." 
                },
                { 
                    label: "Lakukan Fusi (Penyederhanaan) Partai", 
                    effect: { eco: 20, stab: 30, demo: -30 }, 
                    feedback: "Politik tenang dan terkendali (Hanya ada PPP, PDI, Golkar). Pembangunan lancar, tapi aspirasi rakyat dibatasi." 
                }
            ]
        },
        {
            year: "1984",
            title: "Kebutuhan Pangan",
            desc: "Penduduk bertambah pesat. Kita butuh makan. Impor beras menguras devisa.",
            options: [
                { 
                    label: "Fokus Industri Berat (Pesawat)", 
                    effect: { eco: 10, stab: -10, demo: 0 }, 
                    feedback: "Teknologi maju, tapi rakyat di desa kelaparan. Terjadi kerusuhan sosial." 
                },
                { 
                    label: "Revolusi Hijau (Pertanian)", 
                    effect: { eco: 40, stab: 20, demo: 0 }, 
                    feedback: "Sukses Besar! Indonesia mencapai Swasembada Beras. Rakyat kenyang, Anda dapat penghargaan FAO." 
                }
            ]
        },
        {
            year: "1990",
            title: "Kritik & Keterbukaan",
            desc: "Ekonomi maju, tapi Korupsi (KKN) merajalela dan kritik dibungkam. Mahasiswa mulai resah.",
            options: [
                { 
                    label: "Buka Kebebasan Pers", 
                    effect: { eco: -10, stab: -20, demo: 50 }, 
                    feedback: "Demokrasi tumbuh, tapi borok KKN terbongkar semua. Kekuasaan Anda terancam lebih cepat." 
                },
                { 
                    label: "Pertahankan Status Quo (Represi)", 
                    effect: { eco: 10, stab: 20, demo: -50 }, 
                    feedback: "Stabilitas terjaga semu. Di permukaan tenang, di dalam mendidih menunggu ledakan (1998)." 
                }
            ]
        }
    ];

    const handleStart = () => {
        setGameState('PLAYING');
    };

    const handleChoice = (effect: any, msg: string) => {
        const newStats = {
            economy: Math.min(100, Math.max(0, stats.economy + effect.eco)),
            stability: Math.min(100, Math.max(0, stats.stability + effect.stab)),
            democracy: Math.min(100, Math.max(0, stats.democracy + effect.demo))
        };
        setStats(newStats);
        setFeedback(msg);
        setGameState('FEEDBACK');
    };

    const handleNext = () => {
        if (turn < scenarios.length - 1) {
            setTurn(turn + 1);
            setGameState('PLAYING');
        } else {
            setGameState('SUMMARY');
        }
    };

    const resetSim = () => {
        setStats({ economy: 30, stability: 30, democracy: 50 });
        setTurn(0);
        setFeedback("");
        setGameState('INTRO');
    };

    const currentScenario = scenarios[turn];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-chess-board mr-2"></i>Simulasi Kebijakan</h3>
                <div className="grid grid-cols-3 gap-4 text-xs font-bold">
                    <span className={stats.economy > 70 ? 'text-green-500' : 'text-history-muted'}>Ekonomi: {stats.economy}</span>
                    <span className={stats.stability > 70 ? 'text-blue-500' : 'text-history-muted'}>Stabilitas: {stats.stability}</span>
                    <span className={stats.democracy < 30 ? 'text-red-500' : 'text-history-muted'}>Demokrasi: {stats.democracy}</span>
                </div>
            </div>

            <div className="p-8">
                {gameState === 'INTRO' && (
                    <div className="text-center animate-fade-in py-8">
                        <div className="text-6xl mb-6 text-history-gold opacity-80"><i className="fas fa-user-tie"></i></div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-sans">Selamat Datang, Bapak Presiden</h3>
                        <p className="text-history-brown mb-8 font-light text-lg leading-relaxed max-w-2xl mx-auto">
                            "Indonesia tahun 1968. Ekonomi hancur, politik gaduh. Tugas Anda adalah membangun negeri ini. Ingat, setiap kebijakan ada harganya."
                        </p>
                        <button onClick={handleStart} className="bg-history-gold text-[#0a0a0a] px-10 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#c5a028] shadow-lg transition transform hover:scale-105">
                            Mulai Bertugas
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="animate-fade-in">
                        <div className="mb-6">
                            <span className="text-xs font-bold text-history-gold uppercase tracking-widest mb-1 block">Tahun {currentScenario.year}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{currentScenario.title}</h3>
                            <p className="text-history-muted text-lg font-light leading-relaxed bg-[#0a0a0a] p-4 rounded border-l-2 border-history-gold">{currentScenario.desc}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {currentScenario.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(opt.effect, opt.feedback)}
                                    className="p-6 bg-[#262626] border border-white/5 hover:border-history-gold hover:bg-[#0a0a0a] rounded-xl text-left transition group h-full"
                                >
                                    <span className="block font-bold text-history-gold mb-2 text-xs uppercase tracking-widest group-hover:text-white">Opsi {String.fromCharCode(65+idx)}</span>
                                    <span className="text-history-brown font-light">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'FEEDBACK' && (
                    <div className="animate-fade-in text-center py-6">
                        <div className="bg-[#262626] p-8 rounded-xl border-l-4 border-history-gold mb-8 shadow-inner inline-block max-w-3xl">
                            <h4 className="text-history-gold font-bold uppercase tracking-widest mb-4 text-sm">Dampak Kebijakan</h4>
                            <p className="text-history-brown text-xl italic font-light">"{feedback}"</p>
                        </div>
                        <br/>
                        <button onClick={handleNext} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#c5a028] transition shadow-lg">
                            {turn < scenarios.length - 1 ? "Tahun Berikutnya" : "Lihat Hasil Akhir"} <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                )}

                {gameState === 'SUMMARY' && (
                    <div className="text-center animate-fade-in py-6">
                        <div className="text-6xl mb-4 text-history-gold">🏗️</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Era Pembangunan Berakhir</h3>
                        <div className="flex justify-center gap-6 mb-8">
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${stats.economy > 70 ? 'text-green-500' : 'text-yellow-500'}`}>{stats.economy}</div>
                                <div className="text-xs text-history-muted uppercase">Ekonomi</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${stats.stability > 70 ? 'text-blue-500' : 'text-yellow-500'}`}>{stats.stability}</div>
                                <div className="text-xs text-history-muted uppercase">Stabilitas</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${stats.democracy > 40 ? 'text-green-500' : 'text-red-500'}`}>{stats.democracy}</div>
                                <div className="text-xs text-history-muted uppercase">Demokrasi</div>
                            </div>
                        </div>
                        <p className="text-history-muted mb-8 leading-relaxed max-w-xl mx-auto">
                            Anda telah melewati masa Orde Baru. Sejarah mencatat Anda sebagai pemimpin yang membawa 
                            <strong className="text-white"> {stats.economy > 70 ? 'Kemakmuran' : 'Pertumbuhan Cukup'}</strong> namun dengan harga 
                            <strong className="text-white"> {stats.democracy < 40 ? 'Otokrasi' : 'Kompromi Politik'}</strong>.
                        </p>
                        <button onClick={resetSim} className="bg-[#262626] text-white border border-white/20 px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition">
                            Ulangi Simulasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic13: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1: Timeline Sorting (User inputs 1-5)
    const [tlSupersemar, setTlSupersemar] = useState('');
    const [tlTritura, setTlTritura] = useState('');
    const [tlPelantikan, setTlPelantikan] = useState('');
    const [tlSwasembada, setTlSwasembada] = useState('');
    const [tlFusi, setTlFusi] = useState('');

    // Activity 2: Analisis Dua Sisi
    const [dwifungsiPos, setDwifungsiPos] = useState('');
    const [dwifungsiNeg, setDwifungsiNeg] = useState('');
    const [fusiPos, setFusiPos] = useState('');
    const [fusiNeg, setFusiNeg] = useState('');
    const [ekonomiPos, setEkonomiPos] = useState('');
    const [ekonomiNeg, setEkonomiNeg] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Menganalisis Kebijakan Orde Baru</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>Aktivitas 1: Garis Waktu (Chronological Thinking)</h3>
                    <p class="instruction">Urutkan peristiwa berikut dengan memberi nomor 1-5 berdasarkan kronologis waktu!</p>
                    <ul style="list-style: none; padding: 0;">
                        <li>( ${tlSupersemar} ) Supersemar</li>
                        <li>( ${tlTritura} ) Tritura</li>
                        <li>( ${tlPelantikan} ) Pelantikan Soeharto sebagai Presiden</li>
                        <li>( ${tlSwasembada} ) Swasembada Beras</li>
                        <li>( ${tlFusi} ) Fusi Partai Politik</li>
                    </ul>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Analisis "Dua Sisi Mata Uang" (HOTS)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Kebijakan</th>
                                <th width="40%">Dampak Positif (Keuntungan)</th>
                                <th width="40%">Dampak Negatif (Kritik/Kerugian)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Dwifungsi ABRI</strong></td>
                                <td>${dwifungsiPos}</td>
                                <td>${dwifungsiNeg}</td>
                            </tr>
                            <tr>
                                <td><strong>Penyederhanaan Partai (Fusi Partai)</strong></td>
                                <td>${fusiPos}</td>
                                <td>${fusiNeg}</td>
                            </tr>
                            <tr>
                                <td><strong>Pembangunan Ekonomi (Repelita/Revolusi Hijau)</strong></td>
                                <td>${ekonomiPos}</td>
                                <td>${ekonomiNeg}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 3: Refleksi (Deep Learning)</h3>
                    <p><strong>Jika kalian menjadi pemimpin Indonesia saat ini, kebijakan Orde Baru mana yang akan kalian tiru dan mana yang akan kalian buang? Mengapa?</strong></p>
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
                    <button onClick={() => window.open('https://forms.gle/MXrThjqVLMSvk4T56', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">Aktivitas 1: Garis Waktu (Chronological Thinking)</h4>
                    <p className="text-sm text-history-muted mb-4">Urutkan peristiwa berikut dengan memberi nomor 1-5 berdasarkan kronologis waktu!</p>
                    <div className="bg-[#171717] p-6 rounded-xl border border-white/5 space-y-3">
                        {[
                            { label: "Tritura", val: tlTritura, set: setTlTritura },
                            { label: "Supersemar", val: tlSupersemar, set: setTlSupersemar },
                            { label: "Pelantikan Soeharto sebagai Presiden", val: tlPelantikan, set: setTlPelantikan },
                            { label: "Fusi Partai Politik", val: tlFusi, set: setTlFusi },
                            { label: "Swasembada Beras", val: tlSwasembada, set: setTlSwasembada },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <input 
                                    value={item.val} 
                                    onChange={e => item.set(e.target.value)} 
                                    className="w-12 h-10 bg-[#0a0a0a] text-center rounded border border-history-gold/20 focus:border-history-gold outline-none text-history-gold font-bold" 
                                    maxLength={1}
                                />
                                <span className="text-history-brown text-sm">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">Aktivitas 2: Analisis "Dua Sisi Mata Uang" (HOTS)</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/5">Kebijakan</th>
                                    <th className="p-3 border border-history-gold/10 w-2/5">Dampak Positif</th>
                                    <th className="p-3 border border-history-gold/10 w-2/5">Dampak Negatif</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">Dwifungsi ABRI</td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={dwifungsiPos} onChange={e => setDwifungsiPos(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10" placeholder="Positif..."></textarea></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={dwifungsiNeg} onChange={e => setDwifungsiNeg(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10" placeholder="Negatif..."></textarea></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">Fusi Partai</td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={fusiPos} onChange={e => setFusiPos(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10" placeholder="Positif..."></textarea></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={fusiNeg} onChange={e => setFusiNeg(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10" placeholder="Negatif..."></textarea></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold text-history-gold">Pembangunan Ekonomi</td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={ekonomiPos} onChange={e => setEkonomiPos(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10" placeholder="Positif..."></textarea></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={ekonomiNeg} onChange={e => setEkonomiNeg(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded h-20 text-xs border border-white/10" placeholder="Negatif..."></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 3 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">Aktivitas 3: Refleksi (Deep Learning)</h4>
                    <p className="text-sm text-history-muted mb-2">Jika kalian menjadi pemimpin Indonesia saat ini, kebijakan Orde Baru mana yang akan kalian tiru dan mana yang akan kalian buang? Mengapa?</p>
                    <textarea value={refleksi} onChange={e => setRefleksi(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-32 text-history-brown focus:border-history-gold outline-none" placeholder="Refleksimu..."></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const QuizPemerintahanOrba: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Apa tujuan utama dari kebijakan Fusi Partai pada tahun 1973?",
            options: ["Meningkatkan demokrasi", "Menciptakan stabilitas politik", "Menambah jumlah partai", "Menghapus peran militer"],
            answerIndex: 1
        },
        {
            question: "Program ekonomi Orde Baru yang berhasil membawa Indonesia mendapatkan penghargaan FAO tahun 1984 adalah...",
            options: ["Swasembada Beras", "Industrialisasi Pesawat", "Pembangunan Jalan Tol", "Ekspor Minyak"],
            answerIndex: 0
        },
        {
            question: "Manakah yang BUKAN merupakan isi dari Trilogi Pembangunan?",
            options: ["Stabilitas Nasional", "Pertumbuhan Ekonomi", "Pemerataan Pembangunan", "Kebebasan Pers Mutlak"],
            answerIndex: 3
        },
        {
            question: "Dampak negatif utama dari kebijakan ekonomi Orde Baru (Konglomerasi & Hutang) adalah...",
            options: ["Inflasi tinggi di awal pemerintahan", "Fondasi ekonomi rapuh (Krisis 1998)", "Rakyat tidak makan", "Infrastruktur hancur"],
            answerIndex: 1
        },
        {
            question: "Peran ganda ABRI sebagai kekuatan pertahanan dan kekuatan sosial politik disebut...",
            options: ["Dwikora", "Dwifungsi ABRI", "Dwi Dharma", "Sapta Marga"],
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
                <p className="text-history-muted mb-6">{score >= 80 ? "Luar Biasa! Anda memahami kebijakan Orde Baru." : "Pelajari lagi materi tentang Pembangunan dan Politik."}</p>
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