import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 2 (Focus: Empathy) ---
export const MindfulnessTirani: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Mari duduk tegak. Pejamkan mata sejenak.",
        "Bayangkan kamu hidup di tahun 1943. Pakaianmu dari karung goni yang gatal.",
        "Tarik napas dalam... rasakan udara bebas yang kita hirup hari ini.",
        "Hembuskan... lepaskan rasa lelah, syukuri kemerdekaan kita.",
        "Buka mata. Mari pelajari sejarah agar penderitaan mereka tidak sia-sia."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-6 rounded text-center border border-history-red/20 shadow-inner transition-all duration-500">
            <i className="fas fa-heart text-history-red text-2xl mb-4 opacity-80"></i>
            <p className="text-lg font-sans text-history-brown mb-6 min-h-[60px] font-light">{messages[step]}</p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="bg-history-red text-white px-6 py-2 rounded hover:bg-[#9f1239] transition shadow-lg font-bold uppercase tracking-widest text-xs"
                >
                    Lanjut
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-[#171717] text-history-gold px-6 py-2 rounded cursor-default border border-history-gold/30 font-bold uppercase tracking-widest text-xs"
                >
                    Siap Belajar
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: DILEMA LURAH (Resource Management) ---
export const VillageSimulation: React.FC = () => {
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER_SAD' | 'GAME_OVER_REBEL' | 'WIN'>('START');
    const [turn, setTurn] = useState(1);
    // Resources
    const [food, setFood] = useState(100); // Kesejahteraan Rakyat
    const [trust, setTrust] = useState(100); // Kepercayaan Jepang (Safety)
    
    const [feedback, setFeedback] = useState("");

    const resetGame = () => {
        setGameState('START');
        setTurn(1);
        setFood(100);
        setTrust(100);
        setFeedback("");
    };

    const handleChoice = (foodCost: number, trustCost: number, msg: string) => {
        const newFood = Math.max(0, Math.min(100, food - foodCost));
        const newTrust = Math.max(0, Math.min(100, trust - trustCost));
        
        setFood(newFood);
        setTrust(newTrust);
        setFeedback(msg);

        // Check End Conditions
        if (newFood <= 0) {
            setGameState('GAME_OVER_SAD');
        } else if (newTrust <= 0) {
            setGameState('GAME_OVER_REBEL');
        } else if (turn >= 3) {
            setGameState('WIN');
        } else {
            setTurn(turn + 1);
        }
    };

    // Scenarios based on Turn
    const getScenario = () => {
        switch(turn) {
            case 1: return {
                title: "Tahun 1943: Permintaan Padi",
                desc: "Tentara Jepang datang meminta 50% hasil panen desa untuk logistik perang. Rakyat mulai kelaparan.",
                options: [
                    { label: "Serahkan sesuai permintaan", foodCost: 40, trustCost: -10, msg: "Jepang senang, tapi rakyatmu mulai kurus kering." },
                    { label: "Sembunyikan sebagian padi", foodCost: 10, trustCost: 30, msg: "Rakyat kenyang, tapi Jepang curiga padamu." }
                ]
            };
            case 2: return {
                title: "Tahun 1944: Panggilan Romusha",
                desc: "Jepang butuh 20 pemuda desa untuk membangun goa pertahanan. Mereka mungkin tidak akan kembali.",
                options: [
                    { label: "Kirim pemuda secara paksa", foodCost: 20, trustCost: -10, msg: "Keluarga menangis. Desa kehilangan tenaga tani." },
                    { label: "Tolak dan lindungi warga", foodCost: 0, trustCost: 50, msg: "Kamu menolak! Perwira Jepang mencabut katananya..." }
                ]
            };
            case 3: return {
                title: "Tahun 1945: Tanam Jarak",
                desc: "Jepang memerintahkan ladang padi diganti pohon jarak untuk minyak pelumas pesawat.",
                options: [
                    { label: "Patuhi perintah", foodCost: 40, trustCost: -10, msg: "Tidak ada beras. Rakyat makan bonggol pisang." },
                    { label: "Tanam sembunyi-sembunyi", foodCost: 10, trustCost: 30, msg: "Risiko tinggi, tapi rakyat masih bisa makan." }
                ]
            };
            default: return { title: "", desc: "", options: [] };
        }
    };

    const scenario = getScenario();

    return (
        <div className="w-full bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20">
            {/* Game Header */}
            <div className="bg-[#0a0a0a] text-history-gold p-4 flex justify-between items-center border-b border-history-gold/20">
                <h3 className="font-bold text-sm uppercase tracking-widest"><i className="fas fa-user-tie mr-2"></i>Dilema Sang Lurah</h3>
                <div className="text-xs bg-history-gold text-[#0a0a0a] px-2 py-1 rounded font-bold uppercase">Turn {turn}/3</div>
            </div>

            {/* Game Screen */}
            <div className="p-8">
                {gameState === 'START' && (
                    <div className="text-center py-8">
                        <i className="fas fa-balance-scale text-5xl text-history-muted mb-6"></i>
                        <p className="mb-8 text-history-brown text-lg font-light leading-relaxed">
                            Kamu adalah Lurah di Jawa. Tugasmu sulit: Menjaga rakyat agar tidak mati kelaparan, 
                            sekaligus mematuhi Jepang agar desa tidak dibumihanguskan.
                        </p>
                        <button onClick={() => setGameState('PLAYING')} className="bg-history-red text-white px-8 py-3 rounded hover:bg-[#9f1239] transition shadow-lg font-bold uppercase tracking-widest text-sm">
                            Mulai Bertugas
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="animate-fade-in">
                        {/* Status Bars */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <div className="flex justify-between text-xs mb-2 text-history-muted font-bold uppercase tracking-wide">
                                    <span>Kesejahteraan Rakyat</span>
                                    <span>{food}%</span>
                                </div>
                                <div className="w-full bg-[#0a0a0a] h-2 border border-history-muted/20">
                                    <div className={`h-full transition-all duration-500 ${food < 30 ? 'bg-history-red' : 'bg-emerald-600'}`} style={{ width: `${food}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2 text-history-muted font-bold uppercase tracking-wide">
                                    <span>Keamanan (Jepang)</span>
                                    <span>{trust}%</span>
                                </div>
                                <div className="w-full bg-[#0a0a0a] h-2 border border-history-muted/20">
                                    <div className={`h-full transition-all duration-500 ${trust < 30 ? 'bg-history-red' : 'bg-blue-600'}`} style={{ width: `${trust}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Scenario */}
                        <div className="bg-[#0a0a0a] border-l-2 border-history-gold p-6 mb-8">
                            <h4 className="font-bold text-lg mb-2 text-history-gold font-sans">{scenario.title}</h4>
                            <p className="text-sm text-history-brown font-light leading-relaxed">{scenario.desc}</p>
                        </div>

                        {/* Feedback */}
                        {feedback && (
                            <div className="text-center text-sm font-bold text-history-brown mb-6 animate-pulse">
                                {feedback}
                            </div>
                        )}

                        {/* Options */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {scenario.options.map((opt, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleChoice(opt.foodCost, opt.trustCost, opt.msg)}
                                    className="p-5 border border-history-gold/20 rounded hover:border-history-gold hover:bg-[#0a0a0a] transition text-left group bg-[#171717]"
                                >
                                    <span className="font-bold block mb-2 text-history-red group-hover:text-history-gold text-xs uppercase tracking-widest">Pilihan {String.fromCharCode(65+idx)}</span>
                                    <span className="text-sm text-history-brown font-light">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* End States */}
                {gameState === 'GAME_OVER_SAD' && (
                    <div className="text-center py-6">
                        <div className="text-6xl mb-4">💀</div>
                        <h3 className="text-xl font-bold text-history-red mb-2 uppercase tracking-wide">Desa Musnah</h3>
                        <p className="text-history-muted mb-6 font-light">Kamu terlalu patuh pada Jepang. Rakyatmu mati kelaparan dan terkena wabah.</p>
                        <button onClick={resetGame} className="bg-[#262626] text-white px-6 py-2 rounded hover:bg-[#404040] font-bold uppercase tracking-widest text-xs">Coba Lagi</button>
                    </div>
                )}
                 {gameState === 'GAME_OVER_REBEL' && (
                    <div className="text-center py-6">
                        <div className="text-6xl mb-4">⚔️</div>
                        <h3 className="text-xl font-bold text-history-red mb-2 uppercase tracking-wide">Ditangkap Kempeitai</h3>
                        <p className="text-history-muted mb-6 font-light">Kamu terlalu berani menentang. Polisi rahasia Jepang menangkapmu.</p>
                        <button onClick={resetGame} className="bg-[#262626] text-white px-6 py-2 rounded hover:bg-[#404040] font-bold uppercase tracking-widest text-xs">Coba Lagi</button>
                    </div>
                )}
                {gameState === 'WIN' && (
                    <div className="text-center py-6">
                        <div className="text-6xl mb-4">🇮🇩</div>
                        <h3 className="text-xl font-bold text-emerald-500 mb-2 uppercase tracking-wide">Bertahan Hingga Merdeka</h3>
                        <p className="text-history-muted mb-6 font-light">
                            Luar biasa. Rakyat menderita, tapi desa bertahan hingga Proklamasi 1945.
                        </p>
                        <button onClick={resetGame} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs">Main Lagi</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 2 ---
export const LKPDTopic2: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));
    
    // Activity 1
    const [act1Temuan, setAct1Temuan] = useState('');
    const [act1Analisis, setAct1Analisis] = useState('');
    const [act1Relevansi, setAct1Relevansi] = useState('');

    // Activity 2
    const [act2Q1, setAct2Q1] = useState('');
    const [act2Q2, setAct2Q2] = useState('');

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
                <div class="sub-header">Topik: Analisis Strategi Perjuangan Masa Pendudukan Jepang</div>
                
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
                    <h3>PETUNJUK KERJA (Deep Learning):</h3>
                    <ol style="font-size: 14px;">
                        <li><strong>Mindfull:</strong> Baca materi/artikel dengan tenang dan teliti.</li>
                        <li><strong>Meaningfull:</strong> Diskusikan jawaban dengan menghubungkan fakta sejarah dengan logika kalian.</li>
                        <li><strong>Joyfull:</strong> Tuliskan hasil diskusi dengan bahasa yang mudah dipahami.</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>AKTIVITAS 1: Analisis Dampak (Critical Thinking)</h3>
                    <p class="instruction">Perhatikan gambar/berita tentang Romusha dan kelaparan masa Jepang.</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek</th>
                                <th width="25%">Temuan Fakta Sejarah</th>
                                <th width="25%">Analisis: Mengapa Jepang melakukan hal tersebut?</th>
                                <th width="30%">Relevansi: Adakah bentuk "penjajahan ekonomi" serupa di masa kini? Jelaskan!</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Sosial-Ekonomi</strong><br/>(Misal: Petani wajib setor padi)</td>
                                <td>${act1Temuan}</td>
                                <td>(Misal: Untuk logistik perang Pasifik)<br/><br/>${act1Analisis}</td>
                                <td>${act1Relevansi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>AKTIVITAS 2: Debat Strategi (HOTS)</h3>
                    <p class="instruction">Kasus: Soekarno dan Hatta mau bekerjasama dengan Jepang menjadi pemimpin PUTERA, sedangkan Sjahrir menolak dan memilih gerakan bawah tanah.</p>
                    
                    <p><strong>1. Jika kamu hidup di masa itu, strategi mana yang akan kamu pilih? Kooperatif atau Bawah Tanah? Jelaskan alasan logismu!</strong></p>
                    <div class="answer-box">${act2Q1}</div>
                    
                    <p style="margin-top:15px;"><strong>2. Apakah tokoh Kooperatif bisa disebut pengkhianat bangsa? Berikan argumenmu (Setuju/Tidak Setuju) beserta buktinya!</strong></p>
                    <div class="answer-box">${act2Q2}</div>
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

    const handleSendToGuru = () => {
        window.open('https://forms.gle/HuP3ToPM8RKTJ88q7', '_blank');
    };

    return (
        <div className="glass-card p-8 rounded-2xl border border-history-gold/10 text-left">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-history-gold/20">
                <h3 className="font-sans text-2xl font-bold text-history-brown uppercase tracking-widest">
                    Lembar Kerja Peserta Didik (LKPD)
                </h3>
                <div className="flex gap-3">
                    <button onClick={handlePrint} className="bg-history-brown text-[#0a0a0a] px-4 py-2 rounded hover:bg-white transition text-xs font-bold uppercase tracking-widest flex items-center">
                        <i className="fas fa-print mr-2"></i> Simpan PDF
                    </button>
                    <button onClick={handleSendToGuru} className="bg-history-red text-white px-4 py-2 rounded hover:bg-rose-700 transition text-xs font-bold uppercase tracking-widest flex items-center">
                        <i className="fas fa-paper-plane mr-2"></i> Kirim ke Guru
                    </button>
                </div>
            </div>

            {/* Identitas */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div className="space-y-4">
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase tracking-wide mb-2">Kelompok</label>
                        <input 
                            type="text" 
                            value={kelompok} 
                            onChange={(e) => setKelompok(e.target.value)} 
                            className="w-full bg-[#171717] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none" 
                            placeholder="Nama Kelompok..."
                        />
                    </div>
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase tracking-wide mb-2">Kelas</label>
                        <input 
                            type="text" 
                            value={kelas} 
                            onChange={(e) => setKelas(e.target.value)} 
                            className="w-full bg-[#171717] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none" 
                            placeholder="Kelas..."
                        />
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

            {/* Petunjuk Kerja */}
            <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-history-gold mb-10">
                <h4 className="font-bold text-history-gold mb-3 text-sm uppercase tracking-wide">Petunjuk Kerja (Deep Learning):</h4>
                <ul className="list-decimal pl-5 text-sm text-history-muted space-y-2">
                    <li><strong className="text-white">Mindfull:</strong> Baca materi/artikel dengan tenang dan teliti.</li>
                    <li><strong className="text-white">Meaningfull:</strong> Diskusikan jawaban dengan menghubungkan fakta sejarah dengan logika kalian.</li>
                    <li><strong className="text-white">Joyfull:</strong> Tuliskan hasil diskusi dengan bahasa yang mudah dipahami.</li>
                </ul>
            </div>

            {/* Aktivitas 1 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">AKTIVITAS 1: Analisis Dampak (Critical Thinking)</h4>
                <p className="text-history-muted text-sm mb-4 italic">Perhatikan gambar/berita tentang Romusha dan kelaparan masa Jepang.</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-history-gold/20">
                        <thead>
                            <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                <th className="p-4 border border-history-gold/20 w-1/4">Aspek</th>
                                <th className="p-4 border border-history-gold/20 w-1/4">Temuan Fakta Sejarah</th>
                                <th className="p-4 border border-history-gold/20 w-1/4">Analisis: Mengapa Jepang melakukan hal tersebut?</th>
                                <th className="p-4 border border-history-gold/20 w-1/4">Relevansi: Adakah bentuk "penjajahan ekonomi" serupa di masa kini? Jelaskan!</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <strong>Sosial-Ekonomi</strong>
                                    <br/><span className="text-xs italic opacity-60">(Misal: Petani wajib setor padi)</span>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <textarea 
                                        value={act1Temuan} 
                                        onChange={e => setAct1Temuan(e.target.value)} 
                                        className="w-full h-32 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Tuliskan temuan fakta..."
                                    ></textarea>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <p className="text-xs italic opacity-60 mb-2">(Misal: Untuk logistik perang Pasifik)</p>
                                    <textarea 
                                        value={act1Analisis} 
                                        onChange={e => setAct1Analisis(e.target.value)} 
                                        className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Analisis..."
                                    ></textarea>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <textarea 
                                        value={act1Relevansi} 
                                        onChange={e => setAct1Relevansi(e.target.value)} 
                                        className="w-full h-32 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Relevansi masa kini..."
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aktivitas 2 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">AKTIVITAS 2: Debat Strategi (HOTS)</h4>
                <div className="bg-[#0a0a0a] p-4 rounded mb-6 text-sm text-history-muted italic border border-history-gold/10">
                    <strong>Kasus:</strong> Soekarno dan Hatta mau bekerjasama dengan Jepang menjadi pemimpin PUTERA, sedangkan Sjahrir menolak dan memilih gerakan bawah tanah.
                </div>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-history-brown text-sm mb-2 font-bold">1. Jika kamu hidup di masa itu, strategi mana yang akan kamu pilih? Kooperatif atau Bawah Tanah? Jelaskan alasan logismu!</p>
                        <textarea 
                            value={act2Q1} 
                            onChange={e => setAct2Q1(e.target.value)} 
                            className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                            placeholder="Jawabanmu..."
                        ></textarea>
                    </div>
                    <div>
                        <p className="text-history-brown text-sm mb-2 font-bold">2. Apakah tokoh Kooperatif bisa disebut pengkhianat bangsa? Berikan argumenmu (Setuju/Tidak Setuju) beserta buktinya!</p>
                        <textarea 
                            value={act2Q2} 
                            onChange={e => setAct2Q2(e.target.value)} 
                            className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                            placeholder="Jawabanmu..."
                        ></textarea>
                    </div>
                </div>
            </div>

        </div>
    );
};

// --- QUIZ TOPIC 2 (NEW: Full Evaluation System) ---
export const QuizTirani: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Jepang pertama kali mendarat di Indonesia pada tahun 1942. Titik pendaratan pertama tentara Jepang untuk menguasai sumber minyak bumi di Indonesia adalah...",
            options: [
                "A. Palembang",
                "B. Tarakan",
                "C. Batavia",
                "D. Surabaya",
                "E. Balikpapan"
            ],
            correct: 1 // B. Tarakan
        },
        {
            id: 2,
            question: "Belanda secara resmi menyerah tanpa syarat kepada Jepang pada tanggal 8 Maret 1942 melalui Perjanjian...",
            options: [
                "A. Linggarjati",
                "B. Renville",
                "C. Kalijati",
                "D. Bongaya",
                "E. Giyanti"
            ],
            correct: 2 // C. Kalijati
        },
        {
            id: 3,
            question: "Salah satu propaganda Jepang untuk menarik simpati rakyat Indonesia adalah \"Gerakan 3A\". Semboyan yang bukan termasuk dalam Gerakan 3A adalah...",
            options: [
                "A. Jepang Cahaya Asia",
                "B. Jepang Pelindung Asia",
                "C. Jepang Pemimpin Asia",
                "D. Jepang Saudara Asia",
                "E. Jepang Saudara Tua"
            ],
            correct: 3 // D. Jepang Saudara Asia
        },
        {
            id: 4,
            question: "Jepang membentuk sistem pemerintahan lingkungan terkecil yang disebut Tonarigumi untuk memperketat pengawasan terhadap penduduk. Dalam sistem pemerintahan Indonesia saat ini, istilah tersebut dikenal dengan...",
            options: [
                "A. Kecamatan",
                "B. Kelurahan",
                "C. Rukun Warga (RW)",
                "D. Rukun Tetangga (RT)",
                "E. Karang Taruna"
            ],
            correct: 3 // D. Rukun Tetangga (RT)
        },
        {
            id: 5,
            question: "Kewajiban rakyat untuk melakukan penghormatan dengan membungkuk 90 derajat ke arah matahari terbit (Tokyo) setiap pagi disebut...",
            options: [
                "A. Harakiri",
                "B. Seikerei",
                "C. Bushido",
                "D. Kimigayo",
                "E. Romusha"
            ],
            correct: 1 // B. Seikerei
        },
        {
            id: 6,
            question: "Perbedaan mendasar antara Heiho dan PETA (Pembela Tanah Air) adalah...",
            options: [
                "A. Heiho dipimpin oleh perwira Indonesia, sedangkan PETA dipimpin oleh perwira Jepang",
                "B. Heiho adalah barisan polisi, sedangkan PETA adalah barisan militer",
                "C. Heiho menjadi bagian langsung angkatan perang Jepang, sedangkan PETA adalah tentara sukarela untuk mempertahankan Indonesia",
                "D. Heiho bertugas di garis belakang, sedangkan PETA di garis depan pertempuran Pasifik",
                "E. Heiho berisi kaum terpelajar, sedangkan PETA berisi para petani"
            ],
            correct: 2 // C based on key
        },
        {
            id: 7,
            question: "Tokoh \"Empat Serangkai\" yang memimpin organisasi Pusat Tenaga Rakyat (PUTERA) adalah...",
            options: [
                "A. Soekarno, Hatta, Sjahrir, Amir Sjarifuddin",
                "B. Soekarno, Hatta, Ki Hajar Dewantara, K.H. Mas Mansyur",
                "C. Soekarno, Hatta, Ahmad Soebardjo, Sukarni",
                "D. Hatta, Sjahrir, Dr. Soetomo, Wahid Hasyim",
                "E. Soekarno, Hatta, Cipto Mangunkusumo, Douwes Dekker"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Mengapa para tokoh nasionalis seperti Ir. Soekarno dan Moh. Hatta bersedia bekerja sama (kooperatif) dengan Jepang dalam organisasi seperti Putera dan Jawa Hokokai?",
            options: [
                "A. Karena mereka setuju dengan cita-cita Jepang Raya",
                "B. Karena dijanjikan jabatan tinggi dalam kekaisaran Jepang",
                "C. Sebagai taktik untuk memanfaatkan fasilitas Jepang guna menyebarkan nasionalisme dan mempersiapkan kemerdekaan",
                "D. Karena takut akan ancaman hukuman mati dari tentara Jepang jika menolak",
                "E. Karena mereka tidak memiliki pilihan lain selain menyerah"
            ],
            correct: 2 // C
        },
        {
            id: 9,
            question: "Tokoh pergerakan nasional yang menolak bekerja sama dengan Jepang dan memilih memimpin gerakan bawah tanah (underground) adalah...",
            options: [
                "A. Ir. Soekarno",
                "B. Drs. Moh. Hatta",
                "C. Ki Hajar Dewantara",
                "D. Sutan Sjahrir",
                "E. K.H. Mas Mansyur"
            ],
            correct: 3 // D
        },
        {
            id: 10,
            question: "Salah satu kegiatan utama kelompok gerakan bawah tanah di masa pendudukan Jepang adalah...",
            options: [
                "A. Mengadakan rapat umum secara terbuka di lapangan",
                "B. Menulis artikel di surat kabar resmi milik Jepang",
                "C. Mendengarkan siaran radio Sekutu secara sembunyi-sembunyi untuk mengetahui perkembangan perang",
                "D. Melakukan latihan militer bersama tentara Jepang",
                "E. Membantu Jepang mengumpulkan hasil bumi dari rakyat"
            ],
            correct: 2 // C
        },
        {
            id: 11,
            question: "Perlawanan rakyat Singaparna, Tasikmalaya, pada tahun 1944 dipimpin oleh...",
            options: [
                "A. Tengku Abdul Djalil",
                "B. Supriyadi",
                "C. K.H. Zainal Mustafa",
                "D. Teuku Umar",
                "E. Silas Papare"
            ],
            correct: 2 // C
        },
        {
            id: 12,
            question: "Penyebab utama meletusnya perlawanan rakyat di Singaparna terhadap Jepang adalah penolakan terhadap kewajiban...",
            options: [
                "A. Membayar pajak tanah yang tinggi",
                "B. Menyerahkan seluruh hasil panen padi",
                "C. Melakukan Seikerei karena dianggap syirik",
                "D. Menjadi tenaga kerja Romusha",
                "E. Menggunakan bahasa Jepang di pesantren"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Pemberontakan PETA di Blitar pada 14 Februari 1945 dipimpin oleh Supriyadi. Latar belakang utama pemberontakan ini adalah...",
            options: [
                "A. Keinginan Supriyadi untuk menjadi presiden",
                "B. Rasa tidak tega melihat penderitaan rakyat akibat Romusha dan kewajiban serah padi",
                "C. Hasutan dari pihak Sekutu yang mendarat di Jawa Timur",
                "D. Perebutan kekuasaan antar anggota PETA sendiri",
                "E. Penolakan terhadap pembubaran organisasi PETA"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Sistem ekonomi yang diterapkan Jepang di Indonesia di mana setiap daerah (kabupaten) harus dapat memenuhi kebutuhannya sendiri dan kebutuhan perang disebut sistem...",
            options: [
                "A. Ekonomi Liberal",
                "B. Monopoli",
                "C. Autarki",
                "D. Merkantilisme",
                "E. Etatisme"
            ],
            correct: 2 // C
        },
        {
            id: 15,
            question: "Dampak positif dari kebijakan Jepang melarang penggunaan Bahasa Belanda dan mewajibkan penggunaan Bahasa Indonesia dalam pendidikan dan pemerintahan adalah...",
            options: [
                "A. Bahasa Indonesia menjadi bahasa internasional",
                "B. Rakyat Indonesia melupakan sejarah penjajahan Belanda",
                "C. Bahasa Indonesia berkembang pesat sebagai bahasa persatuan dan komunikasi nasional",
                "D. Munculnya banyak karya sastra bertema Jepang",
                "E. Sistem pendidikan Indonesia menjadi setara dengan Jepang"
            ],
            correct: 2 // C
        },
        {
            id: 16,
            question: "Jugun Ianfu adalah istilah yang merujuk pada salah satu kekejaman Jepang dalam bidang sosial, yaitu...",
            options: [
                "A. Pasukan berani mati",
                "B. Tenaga kerja paksa laki-laki",
                "C. Perempuan yang dipaksa menjadi penghibur tentara Jepang",
                "D. Sistem penyerahan wajib hasil bumi",
                "E. Polisi rahasia Jepang yang kejam"
            ],
            correct: 2 // C
        },
        {
            id: 17,
            question: "Organisasi Islam yang tetap diperbolehkan berdiri oleh Jepang karena dianggap anti Barat, namun kemudian diawasi ketat adalah...",
            options: [
                "A. Sarekat Islam",
                "B. MIAI (Majelis Islam A'la Indonesia)",
                "C. Muhammadiyah (sebagai organisasi politik)",
                "D. Nahdlatul Ulama (sebagai partai politik)",
                "E. Persis"
            ],
            correct: 1 // B
        },
        {
            id: 18,
            question: "Menjelang kekalahannya, Jepang membentuk BPUPKI (Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia). Tujuan politik Jepang membentuk badan ini adalah...",
            options: [
                "A. Tulus ingin memberikan kemerdekaan kepada Indonesia",
                "B. Agar rakyat Indonesia membantu Jepang melawan Sekutu dengan iming-iming kemerdekaan",
                "C. Menyerahkan kekuasaan Indonesia kembali kepada Belanda",
                "D. Mendidik para pemimpin Indonesia cara memerintah negara",
                "E. Membentuk negara boneka di Asia Tenggara"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Salah satu dampak pendudukan Jepang di bidang militer yang menguntungkan bagi perjuangan kemerdekaan Indonesia adalah...",
            options: [
                "A. Jepang memberikan banyak senjata modern kepada rakyat secara cuma-cuma",
                "B. Rakyat Indonesia menjadi takut berperang",
                "C. Pemuda Indonesia mendapatkan pelatihan militer, disiplin, dan semangat tempur melalui PETA, Heiho, dan Seinendan",
                "D. Jepang membangun banyak benteng pertahanan yang bisa dipakai rakyat",
                "E. Tentara Jepang bergabung dengan tentara Indonesia melawan Sekutu"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Peristiwa Rengasdengklok terjadi karena adanya perbedaan pendapat antara golongan tua dan golongan muda mengenai...",
            options: [
                "A. Siapa yang akan menandatangani teks proklamasi",
                "B. Lokasi pembacaan teks proklamasi",
                "C. Waktu pelaksanaan proklamasi kemerdekaan",
                "D. Isi naskah proklamasi",
                "E. Bentuk negara Indonesia setelah merdeka"
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
                    <h2>Sejarah Indonesia: Masa Pendudukan Jepang</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Masa Pendudukan Jepang (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Tirani Matahari Terbit</p>
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