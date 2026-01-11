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

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizPemerintahanOrba: React.FC = () => {
    // 20 Questions from PDF "Pemerintahan Orde Baru (Politik & Ekonomi)"
    const questions = [
        {
            id: 1,
            question: "Latar Belakang & Transisi: Pasca peristiwa G30S/PKI, kondisi politik dan ekonomi Indonesia sangat tidak stabil. Mahasiswa yang tergabung dalam KAMI (Kesatuan Aksi Mahasiswa Indonesia) mengajukan tiga tuntutan kepada pemerintah yang dikenal dengan istilah TRITURA. Berikut ini yang bukan merupakan isi dari TRITURA adalah...",
            options: [
                "A. Pembubaran PKI beserta ormas-ormasnya",
                "B. Pembersihan Kabinet Dwikora dari unsur G30S/PKI",
                "C. Penurunan harga barang (perbaikan ekonomi)",
                "D. Penurunan Presiden Soekarno dari jabatannya",
                "E. Pembubaran PKI dan perbaikan sandang pangan"
            ],
            correct: 3 // D
        },
        {
            id: 2,
            question: "Legalitas Kekuasaan: Tonggak lahirnya pemerintahan Orde Baru ditandai dengan dikeluarkannya surat perintah dari Presiden Soekarno kepada Letjen Soeharto pada tanggal 11 Maret 1966. Tujuan utama dikeluarkannya Supersemar adalah...",
            options: [
                "A. Memberikan mandat kepada Soeharto untuk menjadi presiden seumur hidup",
                "B. Mengambil segala tindakan yang dianggap perlu untuk memulihkan keamanan dan ketertiban",
                "C. Membubarkan partai-partai politik yang menentang pemerintah",
                "D. Mengadakan pemilihan umum secepatnya",
                "E. Melakukan kudeta secara damai terhadap pemerintahan Orde Lama"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Masa Transisi: Pada kurun waktu 1966-1967, terjadi dualisme kepemimpinan nasional di Indonesia. Kondisi yang menggambarkan dualisme tersebut adalah...",
            options: [
                "A. Soekarno sebagai Presiden, Hatta sebagai Wakil Presiden",
                "B. Soekarno sebagai Kepala Negara, A.H. Nasution sebagai Ketua MPRS",
                "C. Soekarno sebagai pemimpin pemerintahan, Soeharto sebagai pemimpin militer",
                "D. Soekarno sebagai Presiden yang sah, Soeharto sebagai pemegang mandat eksekutif pemerintahan",
                "E. Soeharto sebagai pejabat Presiden, B.J. Habibie sebagai wakil"
            ],
            correct: 3 // D
        },
        {
            id: 4,
            question: "Stabilisasi Politik (Penyederhanaan Partai): Pada tahun 1973, pemerintah Orde Baru melakukan kebijakan fusi (penggabungan) partai politik untuk menciptakan stabilitas. Partai Persatuan Pembangunan (PPP) merupakan hasil gabungan dari partai-partai yang berhaluan...",
            options: [
                "A. Nasionalis",
                "B. Sosialis",
                "C. Islam",
                "D. Komunis",
                "E. Kristen dan Katolik"
            ],
            correct: 2 // C
        },
        {
            id: 5,
            question: "Partai Politik: Partai Demokrasi Indonesia (PDI) merupakan hasil fusi dari beberapa partai, antara lain...",
            options: [
                "A. NU, Parmusi, PSII, dan Perti",
                "B. PNI, IPKI, Murba, Parkindo, dan Partai Katolik",
                "C. Golkar, PNI, dan Masyumi",
                "D. PNI, NU, dan Muhammadiyah",
                "E. Gerindo, Gapi, dan Parkindo"
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Peran Militer: Salah satu ciri khas politik masa Orde Baru adalah kuatnya peran militer dalam pemerintahan melalui konsep Dwifungsi ABRI. Makna dari Dwifungsi ABRI adalah...",
            options: [
                "A. ABRI bertugas menjaga perbatasan dan melatih rakyat sipil",
                "B. ABRI memiliki dua pemimpin, yaitu Panglima TNI dan Presiden",
                "C. ABRI berperan sebagai kekuatan pertahanan keamanan dan kekuatan sosial politik",
                "D. ABRI berhak memilih dan dipilih dalam pemilihan umum",
                "E. ABRI memiliki tugas ganda sebagai polisi dan tentara sekaligus"
            ],
            correct: 2 // C
        },
        {
            id: 7,
            question: "Ideologi: Untuk menyeragamkan pemahaman ideologi bangsa dan menjaga stabilitas politik, pemerintah Orde Baru mewajibkan penataran P4 bagi seluruh lapisan masyarakat. Kepanjangan dari P4 adalah...",
            options: [
                "A. Pedoman Penghayatan dan Pengamalan Pancasila",
                "B. Pedoman Perjuangan dan Persatuan Pembangunan",
                "C. Program Percepatan Pembangunan Pemerintah",
                "D. Persatuan Perjuangan Pemuda Pancasila",
                "E. Pedoman Pelaksanaan Pembangunan Pancasila"
            ],
            correct: 0 // A
        },
        {
            id: 8,
            question: "Ekonomi (Strategi): Tim ekonomi yang membantu Presiden Soeharto merancang pembangunan ekonomi Indonesia pada masa awal Orde Baru, yang sebagian besar lulusan Universitas California, Berkeley, sering dijuluki sebagai...",
            options: [
                "A. Kabinet Pembangunan",
                "B. Zaken Kabinet",
                "C. Mafia Berkeley",
                "D. Tim Mawar",
                "E. Dewan Jenderal"
            ],
            correct: 2 // C
        },
        {
            id: 9,
            question: "Trilogi Pembangunan: Pemerintah Orde Baru menetapkan Trilogi Pembangunan sebagai pedoman pembangunan nasional. Urutan prioritas Trilogi Pembangunan pada awal pemerintahan Orde Baru yang menekankan keamanan adalah...",
            options: [
                "A. Pemerataan pembangunan, Pertumbuhan ekonomi, Stabilitas nasional",
                "B. Pertumbuhan ekonomi, Pemerataan pembangunan, Stabilitas nasional",
                "C. Stabilitas nasional, Pertumbuhan ekonomi, Pemerataan pembangunan",
                "D. Stabilitas nasional, Kebebasan pers, Pertumbuhan ekonomi",
                "E. Kebebasan berpendapat, Stabilitas ekonomi, Pemerataan hasil"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Program Pembangunan: Rencana pembangunan jangka panjang yang disusun oleh pemerintah Orde Baru dilaksanakan secara bertahap setiap lima tahun yang dikenal dengan istilah...",
            options: [
                "A. Repelita",
                "B. Pelita",
                "C. PJPT",
                "D. Trilogi",
                "E. GBHN"
            ],
            correct: 0 // A
        },
        {
            id: 11,
            question: "Revolusi Hijau: Keberhasilan pemerintah Orde Baru dalam sektor pertanian ditandai dengan pencapaian swasembada beras pada tahun 1984. Upaya meningkatkan hasil pertanian dengan cara penganekaragaman jenis tanaman pada suatu lahan pertanian disebut...",
            options: [
                "A. Intensifikasi",
                "B. Ekstensifikasi",
                "C. Diversifikasi",
                "D. Rehabilitasi",
                "E. Mekanisasi"
            ],
            correct: 2 // C
        },
        {
            id: 12,
            question: "Penghargaan Internasional: Atas keberhasilan Indonesia mencapai swasembada beras pada tahun 1984, Presiden Soeharto mendapatkan penghargaan internasional dan diundang untuk berpidato di markas lembaga PBB yang mengurusi pangan, yaitu...",
            options: [
                "A. WHO",
                "B. UNESCO",
                "C. ILO",
                "D. FAO",
                "E. IMF"
            ],
            correct: 3 // D
        },
        {
            id: 13,
            question: "Dampak Pembangunan: Salah satu dampak positif pembangunan fisik pada masa Orde Baru di bidang pendidikan yang diakui dunia internasional adalah...",
            options: [
                "A. Program Wajib Belajar 12 Tahun",
                "B. Pembangunan SD Inpres di seluruh pelosok desa",
                "C. Pemberian beasiswa LPDP",
                "D. Penghapusan Ujian Nasional",
                "E. Pendirian universitas bertaraf internasional di setiap provinsi"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Analisis Kebijakan (HOTS): Pemerintah Orde Baru menerapkan kebijakan \"Massa Mengambang\" (Floating Mass), di mana partai politik dilarang memiliki pengurus hingga ke tingkat desa. Tujuan politik dari kebijakan ini adalah...",
            options: [
                "A. Agar masyarakat desa fokus pada kegiatan ekonomi/pertanian dan tidak terpecah belah oleh ideologi politik",
                "B. Agar partai politik bisa menghemat anggaran kampanye",
                "C. Memberikan kesempatan kepada militer untuk memimpin desa",
                "D. Memastikan Golkar kalah di daerah pedesaan",
                "E. Mendorong masyarakat desa untuk membuat partai lokal sendiri"
            ],
            correct: 0 // A
        },
        {
            id: 15,
            question: "Analisis Ekonomi (HOTS): Meskipun pertumbuhan ekonomi masa Orde Baru cukup tinggi (rata-rata 7% per tahun), namun fondasi ekonominya dianggap rapuh (bubble economy). Faktor utama penyebab rapuhnya fondasi ekonomi tersebut adalah...",
            options: [
                "A. Terlalu banyak subsidi untuk rakyat miskin",
                "B. Pembangunan yang terlalu merata hingga ke Papua",
                "C. Ketergantungan pada utang luar negeri dan investasi asing yang rentan fluktuasi",
                "D. Kurangnya peran pemerintah dalam mengatur pasar",
                "E. Terlalu kuatnya sektor pertanian dibanding industri"
            ],
            correct: 2 // C
        },
        {
            id: 16,
            question: "Kritik Sosial: Pada masa Orde Baru, pers dan media massa diawasi dengan ketat. Jika ada media yang terlalu keras mengkritik kebijakan pemerintah, maka Surat Izin Usaha Penerbitan Pers (SIUPP) mereka akan dicabut. Istilah untuk tindakan pencabutan izin ini dikenal dengan...",
            options: [
                "A. Sensor",
                "B. Bredel",
                "C. Skorsing",
                "D. Somasi",
                "E. Interogasi"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Perbandingan Masa (HOTS): Perbedaan mendasar kebijakan luar negeri antara masa Demokrasi Terpimpin (Orde Lama) dengan masa Orde Baru adalah...",
            options: [
                "A. Orde Lama pro-Barat, Orde Baru pro-Timur",
                "B. Orde Lama menjalankan politik Mercusuar (konfrontasi), Orde Baru kembali menjadi anggota PBB dan memulihkan hubungan dengan Malaysia",
                "C. Orde Lama fokus pada ekonomi, Orde Baru fokus pada politik",
                "D. Orde Lama bekerja sama dengan IMF, Orde Baru menolak IMF",
                "E. Orde Lama anti-kolonialisme, Orde Baru mendukung kolonialisme"
            ],
            correct: 1 // B
        },
        {
            id: 18,
            question: "Korupsi dan Nepotisme: Menjelang akhir kekuasaannya, kepercayaan rakyat terhadap Presiden Soeharto menurun drastis akibat maraknya praktik KKN. Salah satu bentuk nepotisme yang paling disoroti masyarakat saat itu adalah...",
            options: [
                "A. Pengangkatan menteri dari kalangan profesional",
                "B. Pemberian hak monopoli perdagangan (seperti cengkeh dan mobil nasional) kepada keluarga Cendana",
                "C. Kenaikan gaji pegawai negeri sipil yang terlalu tinggi",
                "D. Pembangunan jalan tol yang menghubungkan antar provinsi",
                "E. Kerjasama militer dengan Amerika Serikat"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Dampak Sosial: Program Keluarga Berencana (KB) dengan slogan \"Dua Anak Cukup\" sangat gencar dikampanyekan pada masa Orde Baru. Tujuan utama program ini dalam konteks pembangunan ekonomi adalah...",
            options: [
                "A. Mengurangi jumlah tentara di Indonesia",
                "B. Membatasi hak asasi manusia untuk memiliki keturunan",
                "C. Menekan laju pertumbuhan penduduk agar pertumbuhan ekonomi tidak habis untuk konsumsi semata",
                "D. Mengurangi kepadatan penduduk di pulau Jawa saja",
                "E. Meniru kebijakan satu anak yang diterapkan di Tiongkok"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Evaluasi Akhir (Refleksi): Runtuhnya Orde Baru pada tahun 1998 memberikan pelajaran berharga bagi bangsa Indonesia. Hikmah utama yang dapat diambil terkait hubungan antara stabilitas ekonomi dan demokrasi adalah...",
            options: [
                "A. Ekonomi yang kuat tidak perlu demokrasi",
                "B. Demokrasi harus ditiadakan demi keamanan negara",
                "C. Pembangunan ekonomi tidak akan berkelanjutan jika dibangun di atas fondasi pemerintahan yang korup dan otoriter",
                "D. Militer adalah satu-satunya elemen yang bisa menjaga ekonomi",
                "E. Kebebasan berpendapat adalah penghambat utama pembangunan jalan tol"
            ],
            correct: 2 // C
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
                    <h2>Topik: Pemerintahan Orde Baru (Politik & Ekonomi)</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Pemerintahan Orde Baru (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Pemerintahan Orde Baru</p>
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