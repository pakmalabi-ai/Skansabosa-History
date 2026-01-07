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

// --- QUIZ TOPIC 2 ---
export const QuizTirani: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Apa tujuan utama Jepang membentuk organisasi seperti Putera dan Jawa Hokokai?",
            options: ["Mempersiapkan kemerdekaan RI", "Memobilisasi rakyat untuk membantu perang Jepang", "Mengajarkan budaya Jepang", "Memberikan modal usaha"],
            answerIndex: 1
        },
        {
            question: "Dampak ekonomi paling berat yang dirasakan petani pada masa Jepang adalah...",
            options: ["Wajib serah padi (Shokuryo Konri)", "Pajak tanah", "Sewa tanah murah", "Ekspor beras lancar"],
            answerIndex: 0
        },
        {
            question: "Organisasi militer bentukan Jepang yang menjadi cikal bakal TNI adalah...",
            options: ["Keibodan", "Seinendan", "PETA", "Fujinkai"],
            answerIndex: 2
        },
        {
            question: "Romusha adalah sebutan untuk...",
            options: ["Tentara wanita", "Kerja paksa", "Polisi rahasia", "Pasukan berani mati"],
            answerIndex: 1
        },
        {
            question: "Apa fungsi Tonarigumi (Rukun Tetangga) pada masa pendudukan Jepang?",
            options: ["Arisan warga", "Mengontrol aktivitas penduduk dan mobilisasi", "Pesta rakyat", "Pemilihan umum"],
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
        if (idx === questions[currentQ].answerIndex) {
            setScore(score + 20); // 5 soal x 20
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
            <div className="bg-[#171717] p-8 rounded-lg shadow border border-history-gold/30 text-center">
                <h3 className="text-xl font-bold mb-4 text-history-brown uppercase tracking-widest">Hasil Evaluasi</h3>
                <div className="text-5xl font-black text-history-gold mb-4">{score}</div>
                <p className="mb-6 text-history-muted font-light">{score >= 80 ? "Sangat Bagus! Anda memahami materi." : "Coba pelajari materi lagi ya."}</p>
                <button onClick={restart} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs">Ulangi</button>
            </div>
        );
    }

    return (
        <div className="bg-[#171717] p-8 rounded-lg shadow-lg border border-history-gold/10">
            <div className="mb-4 flex justify-between text-xs text-history-muted font-bold uppercase tracking-widest">
                <span>Soal {currentQ + 1}/{questions.length}</span>
                <span>Skor: {score}</span>
            </div>
            <h3 className="font-bold text-lg mb-8 text-history-brown">{questions[currentQ].question}</h3>
            <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 border rounded transition flex justify-between items-center group
                            ${selectedOption === idx 
                                ? (idx === questions[currentQ].answerIndex ? 'bg-emerald-900/30 border-emerald-500 text-emerald-100' : 'bg-rose-900/30 border-rose-500 text-rose-100')
                                : 'bg-[#0a0a0a] border-history-gold/10 hover:bg-[#1c1c1c] text-history-brown hover:border-history-gold/40'
                            }
                        `}
                    >
                        <span className="font-light">{opt}</span>
                        {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check text-emerald-500"></i>}
                    </button>
                ))}
            </div>
            {isAnswered && (
                <div className="mt-8 text-right">
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs">
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
                    </button>
                </div>
            )}
        </div>
    );
};