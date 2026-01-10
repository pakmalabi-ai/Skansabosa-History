import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 6 ---
export const MindfulnessDiplomasi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Duduklah dengan tenang. Tarik napas perlahan...",
        "Bayangkan Anda berada di meja perundingan yang dingin dan tegang.",
        "Di hadapan Anda adalah lawan yang kuat secara militer.",
        "Anda tidak memegang senjata, hanya pena dan kecerdasan.",
        "Rasakan beratnya tanggung jawab: Salah ucap, negara bisa hancur.",
        "Kuatkan hati. Diplomasi adalah seni memenangkan perang tanpa membunuh."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-handshake text-history-gold text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-history-gold text-history-gold px-8 py-2 rounded-full hover:bg-history-gold hover:text-[#0a0a0a] transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    SIAP BERUNDING
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: DIPLOMAT ULUNG ---
export const DiplomatSimulation: React.FC = () => {
    const [stage, setStage] = useState(0);
    const [territory, setTerritory] = useState(100); // Wilayah RI
    const [recognition, setRecognition] = useState(10); // Pengakuan Internasional
    const [historyLog, setHistoryLog] = useState<string[]>([]);
    const [gameOver, setGameOver] = useState(false);

    const scenarios = [
        {
            title: "1946: Perundingan Linggarjati",
            desc: "Belanda hanya mau mengakui Jawa, Sumatera, dan Madura. Pemuda marah karena wilayah kita menyempit. Tapi kita butuh pengakuan de facto agar bisa sejajar dengan bangsa lain.",
            options: [
                {
                    text: "Tolak! Kita harus merdeka 100% atau perang total.",
                    effect: { terr: 0, rec: -10 },
                    feedback: "Perang meletus tanpa persiapan matang. Dunia cap kita ekstremis. Surabaya hancur, ribuan gugur. Diplomasi gagal."
                },
                {
                    text: "Setuju (Linggarjati). Wilayah sempit tak apa, asal diakui dunia.",
                    effect: { terr: -40, rec: +30 },
                    feedback: "Keputusan pahit. Wilayah RI tinggal Jawa, Sumatera, Madura. Tapi AS & Inggris mulai melirik keberadaan RI."
                }
            ]
        },
        {
            title: "1948: Agresi Militer & Renville",
            desc: "Belanda melanggar janji (Agresi I) dan mencaplok wilayah kaya SDA. Di kapal Renville, mereka memaksa TNI mundur dari Jawa Barat (Garis Van Mook).",
            options: [
                {
                    text: "Pertahankan Jawa Barat! Jangan mundur setapak pun!",
                    effect: { terr: -20, rec: -10 },
                    feedback: "Pasukan Siliwangi terkepung dan dihancurkan. Kekuatan militer RI lumpuh total."
                },
                {
                    text: "TNI Hijrah ke Yogyakarta (Mundur taktis).",
                    effect: { terr: -30, rec: +20 },
                    feedback: "Sangat menyakitkan. Tapi Siliwangi selamat dan menyusun kekuatan di Yogya. Kita kehilangan wilayah, tapi menjaga 'nyawa' tentara."
                }
            ]
        },
        {
            title: "1949: Konferensi Meja Bundar (KMB)",
            desc: "Belanda terdesak oleh Serangan Umum 1 Maret & tekanan PBB. Di Den Haag, mereka mau mengakui kedaulatan TAPI Irian Barat ditahan dan RI harus bayar hutang Hindia Belanda.",
            options: [
                {
                    text: "Tolak bayar hutang! Irian Barat harus kembali sekarang!",
                    effect: { terr: 0, rec: -20 },
                    feedback: "Perundingan macet (Deadlock). Belanda kembali menyerang. Rakyat sudah lelah perang. Kemerdekaan tertunda entah sampai kapan."
                },
                {
                    text: "Terima syarat hutang. Kedaulatan adalah prioritas utama.",
                    effect: { terr: +50, rec: +50 }, // Bonus for achieving sovereignty
                    feedback: "Merdeka! Akhirnya Belanda mengakui kedaulatan RI (dalam bentuk RIS). Irian Barat jadi PR di masa depan, tapi kita sudah berdaulat penuh!"
                }
            ]
        }
    ];

    const handleChoice = (idx: number) => {
        const scenario = scenarios[stage];
        const choice = scenario.options[idx];
        
        // Apply effects
        const newTerr = Math.max(0, territory + choice.effect.terr);
        const newRec = Math.min(100, recognition + choice.effect.rec);
        
        setTerritory(newTerr);
        setRecognition(newRec);
        setHistoryLog([...historyLog, `Step ${stage + 1}: ${choice.feedback}`]);

        // Check fail state
        if (choice.effect.rec < 0) { // Specific fail conditions based on the logic
             setGameOver(true); // Lose
        } else {
            if (stage < scenarios.length - 1) {
                setStage(stage + 1);
            } else {
                setGameOver(true); // Win (finished)
            }
        }
    };

    const resetGame = () => {
        setStage(0);
        setTerritory(100);
        setRecognition(10);
        setHistoryLog([]);
        setGameOver(false);
    };

    // Determine Result
    const isWin = territory > 0 && recognition >= 60; // Winning condition roughly

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20 flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar Stats */}
            <div className="md:w-1/3 p-8 bg-[#0a0a0a] border-r border-history-gold/10 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-history-gold uppercase tracking-widest text-sm mb-6 border-b border-history-gold/20 pb-2">Status Negara</h4>
                    
                    <div className="mb-6">
                        <div className="flex justify-between text-xs mb-2 text-history-muted font-bold uppercase">
                            <span>Wilayah Kekuasaan</span>
                            <span>{territory}%</span>
                        </div>
                        <div className="w-full bg-[#171717] h-3 rounded-full border border-history-muted/20 overflow-hidden">
                            <div className={`h-full transition-all duration-700 ${territory < 30 ? 'bg-history-red' : 'bg-emerald-600'}`} style={{ width: `${territory}%` }}></div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between text-xs mb-2 text-history-muted font-bold uppercase">
                            <span>Pengakuan Dunia</span>
                            <span>{recognition}%</span>
                        </div>
                        <div className="w-full bg-[#171717] h-3 rounded-full border border-history-muted/20 overflow-hidden">
                            <div className={`h-full transition-all duration-700 ${recognition < 50 ? 'bg-history-red' : 'bg-history-gold'}`} style={{ width: `${recognition}%` }}></div>
                        </div>
                    </div>
                </div>
                
                <div className="text-xs text-history-muted italic opacity-50">
                    *Keputusan yang salah dapat menyebabkan hilangnya wilayah atau agresi militer.
                </div>
            </div>

            {/* Main Game Area */}
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
                {!gameOver ? (
                    <div className="animate-fade-in">
                        <div className="mb-2 text-history-red text-xs font-bold uppercase tracking-widest">Tahap {stage + 1}/3</div>
                        <h3 className="text-2xl font-sans font-bold text-history-brown mb-4">{scenarios[stage].title}</h3>
                        <p className="text-lg text-history-muted font-light leading-relaxed mb-8 border-l-2 border-history-gold pl-4">
                            {scenarios[stage].desc}
                        </p>
                        
                        <div className="space-y-4">
                            {scenarios[stage].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(idx)}
                                    className="w-full text-left p-5 border border-history-gold/20 rounded-lg hover:bg-history-gold hover:text-[#0a0a0a] hover:border-history-gold transition-all group bg-[#171717]"
                                >
                                    <span className="font-bold mr-3 opacity-50 group-hover:opacity-100 text-xs uppercase tracking-widest block mb-1">Pilihan {String.fromCharCode(65 + idx)}</span>
                                    <span className="font-medium text-lg">{opt.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-4">{isWin ? '🏛️' : '💥'}</div>
                        <h3 className={`text-3xl font-bold mb-4 uppercase tracking-widest ${isWin ? 'text-history-gold' : 'text-history-red'}`}>
                            {isWin ? "Kedaulatan Tercapai!" : "Diplomasi Gagal"}
                        </h3>
                        <p className="text-history-muted mb-8 font-light text-lg">
                            {isWin 
                                ? "Selamat! Anda berhasil menavigasi masa sulit dan membawa Indonesia menuju pengakuan kedaulatan penuh, meski harus menempuh jalan berliku." 
                                : "Negara hancur akibat keputusan yang terburu-buru atau terlalu keras. Sejarah mencatat kegagalan ini."}
                        </p>
                        
                        <div className="bg-[#0a0a0a] p-4 rounded text-left mb-8 max-h-40 overflow-y-auto border border-history-gold/10">
                            <h5 className="text-history-gold text-xs font-bold uppercase mb-2">Jejak Keputusan:</h5>
                            <ul className="text-xs text-history-muted space-y-2">
                                {historyLog.map((log, i) => <li key={i}>{log}</li>)}
                            </ul>
                        </div>

                        <button onClick={resetGame} className="bg-history-brown text-[#0a0a0a] px-8 py-3 rounded hover:bg-white font-bold uppercase tracking-widest text-xs shadow-lg">
                            Mainkan Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 6 ---
export const LKPDTopic6: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));
    
    // Form States - Activity 1
    const [linggarjatiPos, setLinggarjatiPos] = useState('');
    const [linggarjatiUntung, setLinggarjatiUntung] = useState('');
    const [linggarjatiRugi, setLinggarjatiRugi] = useState('');

    const [renvillePos, setRenvillePos] = useState('');
    const [renvilleUntung, setRenvilleUntung] = useState('');
    const [renvilleRugi, setRenvilleRugi] = useState('');

    const [roemPos, setRoemPos] = useState('');
    const [roemUntung, setRoemUntung] = useState('');
    const [roemRugi, setRoemRugi] = useState('');

    const [kmbPos, setKmbPos] = useState('');
    const [kmbUntung, setKmbUntung] = useState('');
    const [kmbRugi, setKmbRugi] = useState('');

    // Form States - Activity 2
    const [renvilleOpinion, setRenvilleOpinion] = useState('');
    const [lifeLesson, setLifeLesson] = useState('');

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
                <div class="sub-header">Topik: Analisis Strategi Diplomasi Indonesia</div>
                
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
                    <h3>KEGIATAN 1: Analisis Perbandingan (Comparative Analysis)</h3>
                    <p class="instruction">Isilah tabel di bawah ini dengan analisis mendalam (HOTS).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="15%">Aspek Pembeda</th>
                                <th width="21%">Perjanjian Linggarjati</th>
                                <th width="21%">Perjanjian Renville</th>
                                <th width="21%">Perjanjian Roem-Royen</th>
                                <th width="21%">KMB (Konferensi Meja Bundar)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Posisi Wilayah Indonesia</strong></td>
                                <td>${linggarjatiPos}</td>
                                <td>${renvillePos}</td>
                                <td>${roemPos}</td>
                                <td>${kmbPos}</td>
                            </tr>
                            <tr>
                                <td><strong>Keuntungan bagi Indonesia</strong></td>
                                <td>${linggarjatiUntung}</td>
                                <td>${renvilleUntung}</td>
                                <td>${roemUntung}</td>
                                <td>${kmbUntung}</td>
                            </tr>
                            <tr>
                                <td><strong>Kerugian bagi Indonesia</strong></td>
                                <td>${linggarjatiRugi}</td>
                                <td>${renvilleRugi}</td>
                                <td>${roemRugi}</td>
                                <td>${kmbRugi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>KEGIATAN 2: Critical Thinking (Pemecahan Masalah)</h3>
                    <p class="instruction">Kasus: Pada Perjanjian Renville, banyak pejuang yang marah karena TNI harus mundur (hijrah) dan wilayah RI makin kecil.</p>
                    
                    <p><strong>1. Menurut kelompok kalian, apakah keputusan pemerintah menerima Perjanjian Renville itu sebuah kesalahan atau taktik cerdas? Jelaskan alasannya!</strong></p>
                    <div class="answer-box">${renvilleOpinion}</div>

                    <p style="margin-top:15px;"><strong>2. Jika dikaitkan dengan kehidupan kalian sekarang, apa pelajaran yang bisa diambil ketika kita harus "mengalah" sedikit untuk menang di kemudian hari? (Meaningfull Learning)</strong></p>
                    <div class="answer-box">${lifeLesson}</div>
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
                    <button onClick={() => window.open('https://forms.gle/2mdFP5qCSLGgtLDg6', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div className="space-y-4">
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Nama Kelompok</label>
                        <input value={kelompok} onChange={e => setKelompok(e.target.value)} placeholder="Contoh: Kelompok Soekarno" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
                    </div>
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Kelas</label>
                        <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Contoh: X TKJ 1" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
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

            {/* Activity 1 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-history-gold pl-3">KEGIATAN 1: Analisis Perbandingan</h4>
                <p className="text-history-muted text-sm mb-4 italic">Isilah tabel di bawah ini dengan analisis mendalam.</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#171717] text-history-brown text-xs border-b border-history-gold/20 text-center">
                                <th className="p-3 border-r border-history-gold/10">Aspek Pembeda</th>
                                <th className="p-3 border-r border-history-gold/10">Linggarjati</th>
                                <th className="p-3 border-r border-history-gold/10">Renville</th>
                                <th className="p-3 border-r border-history-gold/10">Roem-Royen</th>
                                <th className="p-3">KMB</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-brown">
                            {/* Row 1: Posisi Wilayah */}
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Posisi Wilayah Indonesia</td>
                                <td className="p-2"><textarea value={linggarjatiPos} onChange={e => setLinggarjatiPos(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Jawa, Sumatera..."></textarea></td>
                                <td className="p-2"><textarea value={renvillePos} onChange={e => setRenvillePos(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={roemPos} onChange={e => setRoemPos(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={kmbPos} onChange={e => setKmbPos(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                            </tr>
                            {/* Row 2: Keuntungan */}
                            <tr className="border-b border-history-muted/10 bg-[#171717]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Keuntungan</td>
                                <td className="p-2"><textarea value={linggarjatiUntung} onChange={e => setLinggarjatiUntung(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={renvilleUntung} onChange={e => setRenvilleUntung(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={roemUntung} onChange={e => setRoemUntung(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={kmbUntung} onChange={e => setKmbUntung(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                            </tr>
                            {/* Row 3: Kerugian */}
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Kerugian</td>
                                <td className="p-2"><textarea value={linggarjatiRugi} onChange={e => setLinggarjatiRugi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={renvilleRugi} onChange={e => setRenvilleRugi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={roemRugi} onChange={e => setRoemRugi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                                <td className="p-2"><textarea value={kmbRugi} onChange={e => setKmbRugi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="..."></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Activity 2 */}
            <div className="space-y-6 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-history-gold pl-3">KEGIATAN 2: Critical Thinking</h4>
                <div className="bg-[#171717] p-4 rounded mb-4 text-sm text-history-muted italic border border-history-gold/10">
                    <strong>Kasus:</strong> Pada Perjanjian Renville, banyak pejuang yang marah karena TNI harus mundur (hijrah) dan wilayah RI makin kecil.
                </div>

                <div>
                    <label className="block text-history-brown text-sm font-bold mb-2">1. Apakah keputusan menerima Renville sebuah kesalahan atau taktik cerdas? Jelaskan!</label>
                    <textarea value={renvilleOpinion} onChange={e => setRenvilleOpinion(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold"></textarea>
                </div>
                <div>
                    <label className="block text-history-brown text-sm font-bold mb-2">2. Apa pelajaran hidup ketika kita harus "mengalah" sedikit untuk menang di kemudian hari?</label>
                    <textarea value={lifeLesson} onChange={e => setLifeLesson(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold"></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ TOPIC 6 ---
export const QuizDiplomasi: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Mengapa pemerintah Indonesia memilih jalur diplomasi meskipun banyak pemuda menginginkan perang?",
            options: ["Karena pemimpin takut berperang", "Untuk menarik simpati dunia dan mengukur kekuatan militer yang belum seimbang", "Karena Belanda menawarkan uang yang banyak", "Karena Indonesia sudah menyerah"],
            answerIndex: 1
        },
        {
            question: "Perjanjian yang mengharuskan TNI hijrah dari Jawa Barat ke Yogyakarta (Mundur Taktis) adalah...",
            options: ["Linggarjati", "Renville", "Roem-Royen", "KMB"],
            answerIndex: 1
        },
        {
            question: "Tokoh yang mencetuskan 'Mosi Integral' untuk membubarkan RIS dan kembali ke NKRI adalah...",
            options: ["Mohammad Hatta", "Sutan Sjahrir", "Mohammad Natsir", "Soekarno"],
            answerIndex: 2
        },
        {
            question: "Apa dampak utama Perjanjian Linggarjati bagi status internasional Indonesia?",
            options: ["Indonesia kehilangan semua wilayah", "Belanda mengakui kekuasaan de facto RI atas Jawa, Sumatera, dan Madura", "TNI harus mundur ke Yogyakarta", "Indonesia harus membayar hutang perang"],
            answerIndex: 1
        },
        {
            question: "Pada tanggal berapa Belanda akhirnya mengakui kedaulatan Indonesia (dalam bentuk RIS) melalui KMB?",
            options: ["17 Agustus 1945", "10 November 1945", "19 Desember 1948", "27 Desember 1949"],
            answerIndex: 3
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
                <p className="mb-6 text-history-muted italic font-light">{score >= 80 ? "Hebat! Anda calon diplomat masa depan." : "Pelajari lagi detail perjanjiannya."}</p>
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