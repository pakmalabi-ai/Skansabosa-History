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

// --- QUIZ TOPIC 6 (FULL EVALUATION SYSTEM) ---
export const QuizDiplomasi: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Analisis Strategi: Pada awal kemerdekaan, pemerintah Indonesia dihadapkan pada pilihan sulit antara konfrontasi fisik atau diplomasi. Alasan utama pemerintah Sjahrir lebih mengutamakan jalur diplomasi adalah...",
            options: [
                "A. Kekuatan militer Indonesia sudah sangat kuat sehingga tidak perlu berperang.",
                "B. Indonesia ingin menghindari jatuhnya korban jiwa dan mencari simpati dunia internasional.",
                "C. Belanda menjanjikan kemerdekaan penuh tanpa syarat jika Indonesia mau berunding.",
                "D. Para pemuda mendesak Soekarno-Hatta untuk segera berdamai dengan Sekutu.",
                "E. Persenjataan tentara Indonesia jauh lebih modern dibandingkan tentara Sekutu."
            ],
            correct: 1 // B
        },
        {
            id: 2,
            question: "Perjanjian Linggarjati: Salah satu isi pokok Perjanjian Linggarjati adalah pengakuan de facto wilayah Republik Indonesia. Wilayah manakah yang diakui oleh Belanda berdasarkan perjanjian tersebut?",
            options: [
                "A. Jawa, Kalimantan, dan Madura",
                "B. Jawa, Sumatera, dan Madura",
                "C. Jawa, Sumatera, dan Kalimantan",
                "D. Jawa, Bali, dan Nusa Tenggara",
                "E. Sumatera, Kalimantan, dan Sulawesi"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Dampak Linggarjati: Mengapa hasil Perjanjian Linggarjati justru memicu jatuhnya Kabinet Sjahrir?",
            options: [
                "A. Karena Sjahrir dianggap terlalu keras terhadap Belanda.",
                "B. Karena Belanda memberikan wilayah yang terlalu luas kepada Indonesia.",
                "C. Karena dianggap merugikan dan mempersempit wilayah RI serta mendapat penentangan dari partai oposisi (PNI & Masyumi).",
                "D. Karena Sjahrir menolak pembentukan Uni Indonesia-Belanda.",
                "E. Karena PBB menekan Sjahrir untuk mundur dari jabatannya."
            ],
            correct: 2 // C
        },
        {
            id: 4,
            question: "Komisi Tiga Negara (KTN): Pasca Agresi Militer Belanda I, PBB membentuk Komisi Tiga Negara (KTN) untuk menengahi konflik Indonesia-Belanda. Negara manakah yang dipilih oleh Indonesia sebagai wakil dalam KTN?",
            options: [
                "A. Amerika Serikat",
                "B. Belgia",
                "C. Inggris",
                "D. Australia",
                "E. Mesir"
            ],
            correct: 3 // D
        },
        {
            id: 5,
            question: "Perjanjian Renville: Salah satu kerugian terbesar Indonesia dalam Perjanjian Renville adalah disetujuinya \"Garis Van Mook\". Apa implikasi dari garis ini bagi militer Indonesia (TNI)?",
            options: [
                "A. TNI diperbolehkan membangun pangkalan militer di seluruh Jawa.",
                "B. TNI harus melakukan Long March (Hijrah) dari kantong gerilya ke wilayah RI yang tersisa.",
                "C. TNI mendapat bantuan senjata dari Amerika Serikat.",
                "D. TNI diakui sebagai satu-satunya angkatan perang yang sah di RIS.",
                "E. TNI diperbolehkan melucuti senjata tentara Jepang."
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Agresi Militer II: Tujuan utama Belanda melancarkan Agresi Militer II pada 19 Desember 1948 dengan menyerang Yogyakarta adalah...",
            options: [
                "A. Membantu Indonesia mengusir komunis.",
                "B. Menunjukkan kepada dunia bahwa TNI dan Pemerintah RI sudah tidak ada.",
                "C. Mengamankan warga negara Belanda yang ada di Yogyakarta.",
                "D. Memenuhi janji Perjanjian Renville.",
                "E. Menjadikan Yogyakarta sebagai ibu kota Hindia Belanda yang baru."
            ],
            correct: 1 // B
        },
        {
            id: 7,
            question: "Pemerintahan Darurat: Ketika Soekarno dan Hatta ditangkap saat Agresi Militer II, mandat pemerintahan diserahkan kepada Syafruddin Prawiranegara untuk membentuk PDRI. Dimanakah pusat pemerintahan PDRI tersebut?",
            options: [
                "A. Jakarta",
                "B. Bukittinggi, Sumatera Barat",
                "C. Bandung, Jawa Barat",
                "D. Surabaya, Jawa Timur",
                "E. Denpasar, Bali"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Perjanjian Roem-Royen: Perjanjian Roem-Royen (1949) dianggap sebagai titik balik kemenangan diplomasi Indonesia. Salah satu isi penting perjanjian ini adalah...",
            options: [
                "A. Belanda mengakui kedaulatan Indonesia secara penuh tanpa syarat.",
                "B. Indonesia setuju menjadi bagian dari Kerajaan Belanda.",
                "C. Pengembalian pemerintahan Republik Indonesia ke Yogyakarta.",
                "D. Pembentukan tentara gabungan Indonesia-Belanda.",
                "E. Penyelesaian masalah Irian Barat saat itu juga."
            ],
            correct: 2 // C
        },
        {
            id: 9,
            question: "Konferensi Inter-Indonesia: Sebelum melangkah ke KMB, Indonesia melakukan Konferensi Inter-Indonesia. Apa tujuan utama konferensi ini?",
            options: [
                "A. Menyatukan pandangan antara RI dan BFO (negara-negara boneka federal) agar kompak menghadapi Belanda.",
                "B. Menyusun strategi perang gerilya melawan Belanda.",
                "C. Membubarkan partai-partai politik yang pro-Belanda.",
                "D. Meminta bantuan senjata dari negara-negara tetangga.",
                "E. Membentuk pemerintahan pengasingan di luar negeri."
            ],
            correct: 0 // A
        },
        {
            id: 10,
            question: "Konferensi Meja Bundar (KMB): Delegasi Indonesia dalam Konferensi Meja Bundar dipimpin oleh...",
            options: [
                "A. Ir. Soekarno",
                "B. Sutan Sjahrir",
                "C. Mohammad Hatta",
                "D. Sri Sultan Hamengkubuwono IX",
                "E. Mohammad Roem"
            ],
            correct: 2 // C
        },
        {
            id: 11,
            question: "Hasil KMB: Meskipun KMB menghasilkan pengakuan kedaulatan, ada satu poin yang sangat memberatkan ekonomi Indonesia, yaitu...",
            options: [
                "A. Indonesia harus membeli senjata dari Belanda.",
                "B. Mata uang Belanda harus tetap digunakan di Indonesia.",
                "C. Indonesia harus menanggung hutang Hindia Belanda sejak tahun 1942.",
                "D. Hasil perkebunan Indonesia harus diserahkan ke Belanda.",
                "E. Bank sentral Indonesia harus dipimpin orang Belanda."
            ],
            correct: 2 // C
        },
        {
            id: 12,
            question: "Masalah Irian Barat: Salah satu keputusan KMB yang tertunda penyelesaiannya dan menjadi duri dalam hubungan Indonesia-Belanda di masa depan adalah status Irian Barat. Bagaimana kesepakatan KMB mengenai hal ini?",
            options: [
                "A. Irian Barat langsung diserahkan ke Indonesia.",
                "B. Irian Barat menjadi negara merdeka terpisah.",
                "C. Akan diselesaikan melalui perundingan dalam waktu satu tahun setelah pengakuan kedaulatan.",
                "D. Irian Barat diserahkan kepada PBB (UNTEA).",
                "E. Irian Barat tetap menjadi milik Belanda selamanya."
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Bentuk Negara RIS: Sebagai hasil KMB, bentuk negara Indonesia berubah menjadi Republik Indonesia Serikat (RIS). Hal ini merupakan strategi Belanda untuk...",
            options: [
                "A. Memperkuat persatuan bangsa Indonesia.",
                "B. Memudahkan administrasi pemerintahan di Indonesia.",
                "C. Menerapkan politik Devide et Impera (pecah belah) agar Indonesia tetap lemah dan mudah dikendalikan.",
                "D. Meningkatkan kesejahteraan rakyat di daerah-daerah.",
                "E. Meniru sistem pemerintahan Amerika Serikat."
            ],
            correct: 2 // C
        },
        {
            id: 14,
            question: "Disintegrasi RIS: Mengapa rakyat di negara-negara bagian RIS (seperti Negara Pasundan, Negara Jawa Timur) menuntut pembubaran negara bagian mereka?",
            options: [
                "A. Karena mereka merasa dijajah kembali oleh Belanda melalui boneka federal.",
                "B. Karena pemerintah pusat RIS tidak memberikan anggaran.",
                "C. Karena mereka ingin memisahkan diri menjadi negara merdeka sendiri.",
                "D. Karena mereka tidak suka dipimpin oleh Soekarno.",
                "E. Karena mereka ingin bergabung dengan Malaysia."
            ],
            correct: 0 // A
        },
        {
            id: 15,
            question: "Mosi Integral: Tokoh yang memprakarsai \"Mosi Integral\" pada tahun 1950 untuk membubarkan RIS dan menyatukan kembali Indonesia ke dalam NKRI adalah...",
            options: [
                "A. Mohammad Yamin",
                "B. Mohammad Natsir",
                "C. Sutan Sjahrir",
                "D. Tan Malaka",
                "E. Jenderal Soedirman"
            ],
            correct: 1 // B
        },
        {
            id: 16,
            question: "Kembali ke NKRI: Secara resmi, Republik Indonesia Serikat (RIS) dibubarkan dan kembali menjadi Negara Kesatuan Republik Indonesia (NKRI) pada tanggal...",
            options: [
                "A. 17 Agustus 1945",
                "B. 27 Desember 1949",
                "C. 17 Agustus 1950",
                "D. 5 Juli 1959",
                "E. 11 Maret 1966"
            ],
            correct: 2 // C
        },
        {
            id: 17,
            question: "Peran PBB: Badan PBB yang berperan menggantikan Komisi Tiga Negara (KTN) dan memiliki wewenang lebih luas untuk membantu penyelesaian konflik Indonesia-Belanda hingga ke KMB adalah...",
            options: [
                "A. UNTEA",
                "B. AFNEI",
                "C. UNCI (United Nations Commission for Indonesia)",
                "D. SEAC",
                "E. UNESCO"
            ],
            correct: 2 // C
        },
        {
            id: 18,
            question: "Serangan Umum 1 Maret 1949: Peristiwa militer yang digagas Sri Sultan HB IX dan dipimpin Letkol Soeharto ini memiliki dampak politis besar bagi diplomasi, yaitu...",
            options: [
                "A. Mengalahkan seluruh pasukan Belanda di Jawa.",
                "B. Membuka mata dunia internasional bahwa TNI masih ada dan kuat, mematahkan propaganda Belanda.",
                "C. Membunuh pimpinan militer Belanda, Jenderal Spoor.",
                "D. Menguasai Yogyakarta kembali secara permanen.",
                "E. Mendapatkan bantuan senjata langsung dari Uni Soviet."
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Refleksi Sejarah: Nilai karakter utama yang dapat diteladani dari perjuangan para diplomat (Sjahrir, Hatta, Roem) dalam mempertahankan kemerdekaan adalah...",
            options: [
                "A. Mengutamakan emosi dan kekuatan fisik.",
                "B. Rela berkorban, cerdas bernegosiasi, dan menempatkan kepentingan bangsa di atas ego pribadi.",
                "C. Bersikap keras kepala dan tidak mau berkompromi sama sekali.",
                "D. Mengandalkan bantuan asing sepenuhnya tanpa usaha sendiri.",
                "E. Mencari keuntungan materi dari jabatan delegasi."
            ],
            correct: 1 // B
        },
        {
            id: 20,
            question: "Konstitusi: Ketika Indonesia kembali menjadi NKRI pada tahun 1950, konstitusi (UUD) yang digunakan adalah...",
            options: [
                "A. UUD 1945 (Asli)",
                "B. Konstitusi RIS",
                "C. UUDS 1950 (Undang-Undang Dasar Sementara)",
                "D. UUD 1945 Amandemen",
                "E. Piagam Jakarta"
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
                    <h2>Topik: Diplomasi & Kedaulatan</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Diplomasi & Kedaulatan (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Diplomasi & Kedaulatan</p>
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