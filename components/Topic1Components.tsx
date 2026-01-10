import React, { useState, useEffect } from 'react';
import { QuizQuestion, SimulationStep } from '../types';

// --- MINDFULNESS COMPONENT ---
export const Mindfulness: React.FC = () => {
    const [status, setStatus] = useState<'IDLE' | 'INHALE' | 'HOLD' | 'EXHALE' | 'DONE'>('IDLE');
    const [text, setText] = useState('Tekan tombol untuk mulai fokus');

    const startBreathing = () => {
        setStatus('INHALE');
        setText('Tarik Napas... (Inhale)');
        
        setTimeout(() => {
            setStatus('HOLD');
            setText('Tahan... (Hold)');
            
            setTimeout(() => {
                setStatus('EXHALE');
                setText('Hembuskan perlahan... (Exhale)');
                
                setTimeout(() => {
                    setStatus('DONE');
                    setText('Bagus. Pikiran siap menerima ilmu.');
                }, 4000);
            }, 3000);
        }, 4000);
    };

    const getBgColor = () => {
        switch(status) {
            case 'IDLE': return 'bg-[#171717] border-history-gold/10';
            case 'INHALE': return 'bg-[#171717] scale-105 shadow-[0_0_40px_rgba(212,175,55,0.2)] border-history-gold/50';
            case 'HOLD': return 'bg-[#171717] scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)] border-history-gold';
            case 'EXHALE': return 'bg-[#171717] border-history-gold/30';
            case 'DONE': return 'bg-[#0a0a0a] border-emerald-900/50';
            default: return 'bg-[#171717]';
        }
    };

    return (
        <div className={`p-8 rounded-xl text-center transition-all duration-1000 ease-in-out border ${getBgColor()}`}>
            <p className="text-xl font-sans font-bold text-history-brown mb-6 tracking-wide">{text}</p>
            {status === 'IDLE' && (
                <button 
                    onClick={startBreathing} 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded-full hover:bg-[#c5a028] transition transform hover:scale-105 shadow-lg font-bold uppercase tracking-widest text-sm"
                >
                    Mulai Teknik STOP
                </button>
            )}
            {status === 'DONE' && (
                <button 
                    onClick={() => setStatus('IDLE')} 
                    className="text-sm text-history-muted underline mt-2 hover:text-history-gold"
                >
                    Ulangi
                </button>
            )}
        </div>
    );
};

// --- SIMULATION COMPONENT ---
export const InteractiveMap: React.FC = () => {
    const [step, setStep] = useState(0);

    const simData: SimulationStep[] = [
        {
            title: "Langkah 1: Target Minyak",
            description: "11 Januari 1942. Jepang mendarat di Tarakan (Kalimantan Timur). Mengapa? Karena kilang minyak ada di sana untuk bahan bakar perang.",
            activeElements: ['tarakan']
        },
        {
            title: "Langkah 2: Kuasai Sumatera",
            description: "Februari 1942. Pasukan payung turun di Palembang. Kilang minyak Plaju, yang terbesar di Asia Tenggara, dikuasai.",
            activeElements: ['tarakan', 'palembang']
        },
        {
            title: "Langkah 3: Masuk ke Jawa",
            description: "1 Maret 1942. Setelah 'bensin' aman, Jepang mengepung pusat pemerintahan Belanda di Jawa dari 3 titik (Banten, Eretan, Kragan).",
            activeElements: ['tarakan', 'palembang', 'jawa']
        },
        {
            title: "Langkah 4: Belanda Menyerah",
            description: "8 Maret 1942. Perjanjian Kalijati (Subang). Belanda menyerah tanpa syarat. Tamatlah riwayat Hindia Belanda.",
            activeElements: ['tarakan', 'palembang', 'jawa', 'kalijati']
        }
    ];

    const handleNext = () => {
        if (step < simData.length) {
            setStep(step + 1);
        }
    };

    const handleReset = () => {
        setStep(0);
    };

    const currentData = step > 0 ? simData[step - 1] : null;
    
    const showTarakan = step >= 1;
    const showPalembang = step >= 2;
    const showJawa = step >= 3;
    const showKalijati = step >= 4;

    return (
        <div className="w-full">
            <div className="relative bg-[#0a0a0a] w-full aspect-[16/9] md:h-[600px] rounded-xl overflow-hidden shadow-2xl border border-history-gold/20 mb-8 select-none group">
                
                {/* Background Map SVG */}
                <svg 
                    id="indo-map" 
                    viewBox="0 0 800 300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute w-full h-full"
                    preserveAspectRatio="none"
                >
                    <style>{`
                        .island { fill: #0d9488; stroke: #ccfbf1; stroke-width: 0.8; transition: all 0.5s ease; }
                        .island:hover { fill: #14b8a6; stroke: #d4af37; cursor: pointer; }
                    `}</style>
                    
                    {/* Sumatra */}
                    <path id="Sumatera" className="island" d="M120,40 L160,50 L180,90 L170,120 L150,150 L120,130 L100,90 L90,60 Z M100,60 L110,50" data-name="Sumatera"></path>
                    <path className="island" data-name="Sumatera" d="M40,55 C50,45 70,55 80,65 L130,120 C140,130 145,150 135,160 L120,170 C110,175 100,160 95,150 L50,90 C40,75 35,60 40,55 Z"></path>
    
                    {/* Kalimantan */}
                    <path className="island" data-name="Kalimantan" d="M160,90 L230,80 L260,85 L270,110 L260,150 L240,160 L180,155 L165,130 L160,90 Z M230,80 C235,70 250,70 255,80"></path>
    
                    {/* Jawa */}
                    <path className="island" data-name="Jawa" d="M140,175 L150,170 L260,175 L280,185 L275,195 L150,190 L140,175 Z"></path>
                    
                    {/* Sulawesi */}
                    <path className="island" data-name="Sulawesi" d="M300,100 L320,100 L310,120 L330,120 L340,110 L350,120 L340,130 L350,140 L330,150 L310,140 L300,130 L290,110 Z M310,120 L300,130"></path>
    
                    {/* Bali & Nusa Tenggara */}
                    <g className="island-group">
                        <circle className="island" data-name="Bali" cx="295" cy="190" r="4"></circle>
                        <path className="island" data-name="Nusa Tenggara Barat" d="M305,190 L325,190 L325,200 L305,200 Z"></path>
                        <path className="island" data-name="Nusa Tenggara Timur" d="M330,195 L360,190 L370,200 L360,210 L335,205 Z"></path>
                    </g>
    
                    {/* Maluku Islands (Simplified) */}
                    <path className="island" data-name="Maluku Utara" d="M380,100 L395,100 L390,120 L375,115 Z"></path>
                    <path className="island" data-name="Maluku" d="M380,140 L400,135 L405,150 L390,155 Z"></path>
    
                    {/* Papua */}
                    <path className="island" data-name="Papua" d="M430,120 L450,110 L500,115 L560,130 L560,190 L500,190 L480,170 L460,160 L440,150 L430,140 Z M430,120 C420,125 420,135 430,140"></path>
                </svg>

                {/* SVG Overlay for Arrows & Animations - Adjusted ViewBox to match Map */}
                <svg viewBox="0 0 800 300" className="absolute w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                    <defs>
                        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                            <polygon points="0 0, 4 2, 0 4" fill="#d4af37" />
                        </marker>
                    </defs>

                    {/* Strategy Arrows based on Historical Movement */}
                    {showTarakan && (
                        // From Philippines (North-East) to Tarakan (East Kalimantan ~260,100)
                        <path d="M 350,20 Q 320,50 260,100" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" className="animate-dash" />
                    )}
                    {showPalembang && (
                        // From Malaya (West) to Palembang (South Sumatra ~130,140)
                        <path d="M 50,50 Q 80,100 130,140" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" className="animate-dash" />
                    )}
                     {showJawa && (
                        <>
                           {/* To Banten (West Java ~150,180) from Sumatra side */}
                           <path d="M 130,140 Q 135,160 150,180" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
                           {/* To Eretan (Central Java ~200,180) from Java Sea */}
                           <path d="M 220,100 L 200,180" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
                           {/* To Kragan (East Java ~250,180) from Makassar Strait */}
                           <path d="M 280,100 Q 270,140 250,180" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
                        </>
                    )}
                </svg>

                {/* LABELS & MARKERS (Positioned by %) */}
                
                {/* 1. Tarakan */}
                {showTarakan && (
                    <div className="absolute top-[33%] left-[32%] animate-bounce z-20">
                        <div className="w-8 h-8 bg-history-red text-white rounded-full flex items-center justify-center font-bold shadow-lg border border-history-gold text-sm">1</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 px-2 py-1 text-[9px] text-history-gold border border-history-gold/30 rounded whitespace-nowrap tracking-wider uppercase">
                            Tarakan
                        </div>
                    </div>
                )}

                {/* 2. Palembang */}
                {showPalembang && (
                    <div className="absolute top-[46%] left-[16%] animate-bounce z-20">
                        <div className="w-8 h-8 bg-history-red text-white rounded-full flex items-center justify-center font-bold shadow-lg border border-history-gold text-sm">2</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 px-2 py-1 text-[9px] text-history-gold border border-history-gold/30 rounded whitespace-nowrap tracking-wider uppercase">
                            Palembang
                        </div>
                    </div>
                )}

                {/* 3. Jawa Landing Spots */}
                {showJawa && (
                    <>
                        <div className="absolute top-[60%] left-[18%] w-4 h-4 bg-history-red rounded-full z-10 animate-ping border border-history-gold/50"></div>
                        <div className="absolute top-[60%] left-[25%] w-4 h-4 bg-history-red rounded-full z-10 animate-ping border border-history-gold/50"></div>
                        <div className="absolute top-[60%] left-[31%] w-4 h-4 bg-history-red rounded-full z-10 animate-ping border border-history-gold/50"></div>
                        
                        <div className="absolute top-[68%] left-[25%] -translate-x-1/2 bg-[#171717] text-history-gold px-3 py-1 text-xs border border-history-gold/30 uppercase tracking-widest whitespace-nowrap">
                            Pengepungan Jawa
                        </div>
                    </>
                )}

                {/* 4. Kalijati */}
                {showKalijati && (
                    <div className="absolute top-[61%] left-[20%] z-30 cursor-pointer group-hover:scale-110 transition duration-300">
                        <div className="w-12 h-12 bg-[#0a0a0a] border border-history-gold rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-spin-slow text-history-gold">
                            🤝
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-history-gold text-[#0a0a0a] px-2 py-1 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                            Perjanjian Kalijati
                        </div>
                    </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-[#0a0a0a]/90 p-6 rounded-lg shadow-2xl backdrop-blur-md border border-history-gold/20 transition-all duration-300 z-40">
                    <h4 className="font-sans font-bold text-sm text-history-gold flex items-center mb-2 uppercase tracking-widest">
                        <span className="bg-history-gold text-[#0a0a0a] text-[9px] px-2 py-0.5 rounded-sm mr-3 font-bold">Step {step}/4</span>
                        {step === 0 ? "Mulai Simulasi" : currentData?.title}
                    </h4>
                    <p className="text-history-brown leading-relaxed text-xs font-light">
                        {step === 0 ? "Tekan tombol 'Langkah Berikutnya' untuk melihat bagaimana Jepang menggunakan strategi 'Gurita'." : currentData?.description}
                    </p>
                </div>
            </div>

            <div className="flex justify-center space-x-6">
                <button 
                    onClick={handleReset} 
                    className="px-6 py-3 bg-[#171717] text-history-muted rounded border border-history-muted/20 hover:border-history-gold hover:text-history-gold transition shadow-lg text-xs font-bold uppercase tracking-widest"
                    disabled={step === 0}
                >
                    <i className="fas fa-undo mr-2"></i> Reset
                </button>
                <button 
                    onClick={handleNext} 
                    className={`px-8 py-3 rounded text-xs font-bold transition shadow-xl flex items-center transform hover:scale-105 tracking-widest uppercase ${step >= 4 ? 'bg-gray-800 cursor-not-allowed text-gray-500' : 'bg-history-gold text-[#0a0a0a] hover:bg-[#c5a028]'}`}
                    disabled={step >= 4}
                >
                   {step >= 4 ? 'Selesai' : 'Langkah Berikutnya'} <i className="fas fa-arrow-right ml-3"></i>
                </button>
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic1: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    
    // Activity 1 State
    const [act1Row2Date, setAct1Row2Date] = useState('');
    const [act1Row2Reason, setAct1Row2Reason] = useState('');
    const [act1Row3Loc, setAct1Row3Loc] = useState('');

    // Activity 2 State
    const [act2Q1, setAct2Q1] = useState('');
    const [act2Q2, setAct2Q2] = useState('');

    // Activity 3 State
    const [act3Ref, setAct3Ref] = useState('');

    const handlePrint = () => {
        const printContent = `
            <html>
            <head>
                <title>LKPD - ${nama || 'Siswa'}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; padding: 40px; color: #000; background: #fff; }
                    h1 { text-align: center; font-size: 18px; margin-bottom: 5px; }
                    .header-info { margin-bottom: 20px; font-size: 14px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                    .section { margin-bottom: 25px; }
                    h3 { font-size: 16px; border-left: 5px solid #000; padding-left: 10px; margin-bottom: 10px; background: #f0f0f0; padding-top:5px; padding-bottom:5px;}
                    p.instruction { font-style: italic; font-size: 13px; margin-bottom: 10px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                    th { background-color: #e0e0e0; }
                    .answer-box { border: 1px solid #ccc; padding: 10px; min-height: 50px; background: #f9f9f9; font-family: sans-serif; }
                    .footer { margin-top: 50px; text-align: right; font-size: 12px; }
                </style>
            </head>
            <body>
                <h1>LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
                <div style="text-align:center; margin-bottom: 20px;">Topik: Analisis Kedatangan & Strategi Tokoh Masa Jepang</div>
                
                <div class="header-info">
                    <strong>Nama:</strong> ${nama} <br/>
                    <strong>Kelas/Kelompok:</strong> ${kelas}
                </div>

                <div class="section">
                    <h3>A. Aktivitas 1: Detektif Peta (Mapping)</h3>
                    <p class="instruction">Instruksi: Berdasarkan sumber bacaan/internet, urutkan jalur kedatangan Jepang dengan mengisi tabel berikut!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="20%">Tanggal</th>
                                <th width="25%">Lokasi Pendaratan</th>
                                <th>Alasan Jepang Memilih Lokasi Ini (Analisis SDA)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>11 Jan 1942</td>
                                <td>Tarakan</td>
                                <td>Contoh: Terdapat kilang minyak bumi yang besar.</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>${act1Row2Date}</td>
                                <td>Palembang</td>
                                <td>${act1Row2Reason}</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>1 Maret 1942</td>
                                <td>${act1Row3Loc}</td>
                                <td>Pusat pemerintahan Hindia Belanda (Batavia/Bandung).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>B. Aktivitas 2: Bedah Kasus (Critical Thinking)</h3>
                    <p class="instruction">Kasus: Bung Karno dan Bung Hatta memilih bekerja sama dengan Jepang melalui organisasi Pusat Tenaga Rakyat (PUTERA), sementara Sjahrir menolak dan bergerak di bawah tanah.</p>
                    
                    <p><strong>1. Menurut kelompokmu, apakah langkah Soekarno-Hatta itu bentuk pengkhianatan atau taktik cerdas? Jelaskan alasannya!</strong></p>
                    <div class="answer-box">${act2Q1}</div>
                    
                    <p style="margin-top:15px;"><strong>2. Jika kalian hidup di masa itu sebagai pemuda terpelajar, jalur mana yang akan kalian pilih (Kooperatif atau Bawah Tanah)? Mengapa?</strong></p>
                    <div class="answer-box">${act2Q2}</div>
                </div>

                <div class="section">
                    <h3>C. Refleksi Makna (Meaningfull Learning)</h3>
                    <p class="instruction">Jepang datang dengan janji manis (Propaganda). Di masa sekarang (Abad 21), hal ini mirip dengan "Hoaks" atau "Penipuan Online".</p>
                    
                    <p><strong>Tuliskan satu pelajaran penting dari peristiwa kedatangan Jepang agar kita tidak mudah tertipu oleh janji manis di masa kini!</strong></p>
                    <div class="answer-box">${act3Ref}</div>
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
        window.open('https://forms.gle/NFrxBf82DmshCfhH8', '_blank');
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
                <div>
                    <label className="block text-history-gold text-xs font-bold uppercase tracking-wide mb-2">Nama Lengkap</label>
                    <input 
                        type="text" 
                        value={nama} 
                        onChange={(e) => setNama(e.target.value)} 
                        className="w-full bg-[#171717] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none" 
                        placeholder="Nama Siswa..."
                    />
                </div>
                <div>
                    <label className="block text-history-gold text-xs font-bold uppercase tracking-wide mb-2">Kelas / Kelompok</label>
                    <input 
                        type="text" 
                        value={kelas} 
                        onChange={(e) => setKelas(e.target.value)} 
                        className="w-full bg-[#171717] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none" 
                        placeholder="X TKJ 1 / Kelompok 3..."
                    />
                </div>
            </div>

            {/* Aktivitas 1 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-history-gold pl-3">A. Aktivitas 1: Detektif Peta (Mapping)</h4>
                <p className="text-history-muted text-sm mb-4 italic">Instruksi: Berdasarkan sumber bacaan/internet, urutkan jalur kedatangan Jepang dengan mengisi tabel berikut!</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#171717] text-history-brown text-sm border-b border-history-gold/20">
                                <th className="p-3">No</th>
                                <th className="p-3">Tanggal</th>
                                <th className="p-3">Lokasi Pendaratan</th>
                                <th className="p-3">Alasan Jepang Memilih Lokasi Ini (Analisis SDA)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            <tr className="border-b border-history-muted/10">
                                <td className="p-3">1</td>
                                <td className="p-3">11 Jan 1942</td>
                                <td className="p-3">Tarakan</td>
                                <td className="p-3 italic">Contoh: Terdapat kilang minyak bumi yang besar.</td>
                            </tr>
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]/50">
                                <td className="p-3">2</td>
                                <td className="p-3"><input type="text" value={act1Row2Date} onChange={e => setAct1Row2Date(e.target.value)} className="bg-[#171717] border border-history-muted/20 p-2 rounded w-full text-history-brown" placeholder="Tanggal..."/></td>
                                <td className="p-3">Palembang</td>
                                <td className="p-3"><input type="text" value={act1Row2Reason} onChange={e => setAct1Row2Reason(e.target.value)} className="bg-[#171717] border border-history-muted/20 p-2 rounded w-full text-history-brown" placeholder="Alasan..."/></td>
                            </tr>
                            <tr>
                                <td className="p-3">3</td>
                                <td className="p-3">1 Maret 1942</td>
                                <td className="p-3"><input type="text" value={act1Row3Loc} onChange={e => setAct1Row3Loc(e.target.value)} className="bg-[#171717] border border-history-muted/20 p-2 rounded w-full text-history-brown" placeholder="Lokasi..."/></td>
                                <td className="p-3">Pusat pemerintahan Hindia Belanda (Batavia/Bandung).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aktivitas 2 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-history-gold pl-3">B. Aktivitas 2: Bedah Kasus (Critical Thinking)</h4>
                <div className="bg-[#171717] p-4 rounded mb-4 text-sm text-history-muted italic border border-history-gold/10">
                    <strong>Kasus:</strong> Bung Karno dan Bung Hatta memilih bekerja sama dengan Jepang melalui organisasi Pusat Tenaga Rakyat (PUTERA), sementara Sjahrir menolak dan bergerak di bawah tanah.
                </div>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-history-brown text-sm mb-2 font-bold">1. Menurut kelompokmu, apakah langkah Soekarno-Hatta itu bentuk pengkhianatan atau taktik cerdas? Jelaskan alasannya!</p>
                        <textarea 
                            value={act2Q1} 
                            onChange={e => setAct2Q1(e.target.value)} 
                            className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                            placeholder="Jawabanmu..."
                        ></textarea>
                    </div>
                    <div>
                        <p className="text-history-brown text-sm mb-2 font-bold">2. Jika kalian hidup di masa itu sebagai pemuda terpelajar, jalur mana yang akan kalian pilih (Kooperatif atau Bawah Tanah)? Mengapa?</p>
                        <textarea 
                            value={act2Q2} 
                            onChange={e => setAct2Q2(e.target.value)} 
                            className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                            placeholder="Jawabanmu..."
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Aktivitas 3 */}
            <div className="animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-history-gold pl-3">C. Refleksi Makna (Meaningfull Learning)</h4>
                <p className="text-history-muted text-sm mb-4">Jepang datang dengan janji manis (Propaganda). Di masa sekarang (Abad 21), hal ini mirip dengan "Hoaks" atau "Penipuan Online".</p>
                
                <div>
                    <p className="text-history-brown text-sm mb-2 font-bold">Tuliskan satu pelajaran penting dari peristiwa kedatangan Jepang agar kita tidak mudah tertipu oleh janji manis di masa kini!</p>
                    <textarea 
                        value={act3Ref} 
                        onChange={e => setAct3Ref(e.target.value)} 
                        className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                        placeholder="Refleksimu..."
                    ></textarea>
                </div>
            </div>

        </div>
    );
};

// --- QUIZ COMPONENT ---
export const Quiz: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Apa alasan utama Jepang menyerang pangkalan Angkatan Laut Amerika Serikat di Pearl Harbor pada 7 Desember 1941?",
            options: [
                "A. Ingin menunjukkan kekuatan militer Jepang kepada dunia",
                "B. Membalas dendam atas serangan Amerika Serikat sebelumnya",
                "C. Melumpuhkan kekuatan Amerika Serikat yang menghalangi ekspansi Jepang ke Asia Selatan",
                "D. Menguji coba senjata dan pesawat tempur baru buatan Jepang",
                "E. Membantu Jerman memenangkan perang di front Eropa"
            ],
            correct: 2 // C
        },
        {
            id: 2,
            question: "Pendaratan pertama tentara Jepang di wilayah Indonesia terjadi pada tanggal 11 Januari 1942 di...",
            options: [
                "A. Palembang",
                "B. Tarakan",
                "C. Balikpapan",
                "D. Batavia",
                "E. Pontianak"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Tujuan strategis Jepang menguasai wilayah Tarakan dan Balikpapan terlebih dahulu sebelum masuk ke Pulau Jawa adalah...",
            options: [
                "A. Menguasai pusat pemerintahan kolonial Belanda",
                "B. Menguasai sumber daya manusia untuk tenaga kerja",
                "C. Menguasai kilang minyak bumi untuk bahan bakar perang",
                "D. Membangun pangkalan militer angkatan darat",
                "E. Mencari dukungan politik dari suku-suku lokal"
            ],
            correct: 2 // C
        },
        {
            id: 4,
            question: "Belanda menyerah tanpa syarat kepada Jepang pada tanggal 8 Maret 1942. Peristiwa penyerahan kekuasaan ini tertuang dalam...",
            options: [
                "A. Perjanjian Linggarjati",
                "B. Perjanjian Renville",
                "C. Perjanjian Bongaya",
                "D. Kapitulasi Kalijati",
                "E. Perjanjian Roem-Royen"
            ],
            correct: 3 // D
        },
        {
            id: 5,
            question: "Salah satu bentuk propaganda Jepang untuk menarik simpati rakyat Indonesia dikenal dengan \"Gerakan 3A\". Siapakah tokoh Indonesia yang ditunjuk Jepang untuk memimpin gerakan ini?",
            options: [
                "A. Ir. Soekarno",
                "B. Mr. Syamsudin",
                "C. Ki Hajar Dewantara",
                "D. K.H. Mas Mansyur",
                "E. Moh. Hatta"
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Organisasi PUTERA (Pusat Tenaga Rakyat) dipimpin oleh tokoh nasionalis yang dikenal dengan sebutan \"Empat Serangkai\". Tokoh-tokoh tersebut adalah...",
            options: [
                "A. Soekarno, Hatta, Sjahrir, Amir Syarifuddin",
                "B. Soekarno, Hatta, Ki Hajar Dewantara, K.H. Mas Mansyur",
                "C. Soekarno, Hatta, Yamin, Soepomo",
                "D. Soekarno, Hatta, Ahmad Soebardjo, Sayuti Melik",
                "E. Soekarno, Hatta, Cipto Mangunkusumo, Douwes Dekker"
            ],
            correct: 1 // B based on key in PDF
        },
        {
            id: 7,
            question: "Bagi para pemimpin nasionalis, tujuan memanfatkan organisasi PUTERA sebenarnya adalah...",
            options: [
                "A. Mempersiapkan kemerdekaan Indonesia secara bertahap",
                "B. Mengembangkan kebudayaan Jawa di seluruh Indonesia",
                "C. Membujuk kaum intelektual untuk membantu Jepang berperang",
                "D. Melatih pemuda Indonesia menjadi tentara Jepang",
                "E. Memberikan pendidikan gratis bagi rakyat miskin"
            ],
            correct: 0 // A
        },
        {
            id: 8,
            question: "Organisasi bentukan Jepang yang merupakan himpunan kebaktian rakyat dan terstruktur sangat rapi hingga tingkat RT/RW (Tonarigumi) adalah...",
            options: [
                "A. PUTERA",
                "B. Jawa Hokokai",
                "C. Masyumi",
                "D. MIAI",
                "E. Seinendan"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Pengerahan tenaga kerja paksa pada masa pendudukan Jepang yang menyebabkan penderitaan hebat, kelaparan, dan kematian bagi rakyat Indonesia disebut...",
            options: [
                "A. Kerja Rodi",
                "B. Cultuurstelsel",
                "C. Romusha",
                "D. Seikerei",
                "E. Kinrohosi"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Barisan pemuda pembantu prajurit Jepang yang dikirim ke medan perang di Pasifik, Morotai, dan Burma adalah...",
            options: [
                "A. Keibodan",
                "B. Seinendan",
                "C. Heiho",
                "D. PETA",
                "E. Fujinkai"
            ],
            correct: 2 // C
        },
        {
            id: 11,
            question: "Perbedaan mendasar antara PETA (Pembela Tanah Air) dengan Heiho adalah...",
            options: [
                "A. PETA adalah bagian resmi dari tentara Jepang, Heiho bukan",
                "B. PETA dipimpin oleh perwira bangsa Indonesia, Heiho dipimpin perwira Jepang",
                "C. PETA hanya berisi wanita, Heiho berisi laki-laki",
                "D. PETA tidak dibekali senjata, Heiho bersenjata lengkap",
                "E. PETA dibentuk oleh Belanda, Heiho dibentuk oleh Jepang"
            ],
            correct: 1 // B
        },
        {
            id: 12,
            question: "Pemberontakan PETA di Blitar pada tanggal 14 Februari 1945 merupakan perlawanan terbesar terhadap Jepang yang dipimpin oleh...",
            options: [
                "A. K.H. Zaenal Mustafa",
                "B. Teuku Hamid",
                "C. Supriyadi",
                "D. Jenderal Sudirman",
                "E. Slamet Riyadi"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Tokoh pergerakan nasional yang menolak bekerja sama dengan Jepang dan memilih strategi perjuangan \"Gerakan Bawah Tanah\" adalah...",
            options: [
                "A. Ir. Soekarno",
                "B. Moh. Hatta",
                "C. K.H. Mas Mansyur",
                "D. Sutan Sjahrir",
                "E. Ki Hajar Dewantara"
            ],
            correct: 3 // D
        },
        {
            id: 14,
            question: "Kewajiban melakukan penghormatan dengan membungkukkan badan ke arah matahari terbit (Tokyo) setiap pagi pada masa pendudukan Jepang disebut...",
            options: [
                "A. Harakiri",
                "B. Seikerei",
                "C. Bushido",
                "D. Hakko Ichiu",
                "E. Kimigayo"
            ],
            correct: 1 // B
        },
        {
            id: 15,
            question: "Dampak positif pendudukan Jepang di bidang bahasa bagi bangsa Indonesia adalah...",
            options: [
                "A. Bahasa Jepang menjadi bahasa utama di sekolah",
                "B. Bahasa Belanda wajib dipelajari oleh semua kalangan",
                "C. Bahasa Indonesia dilarang digunakan dalam percakapan sehari-hari",
                "D. Bahasa Indonesia dijadikan bahasa pengantar resmi dan bahasa administrasi",
                "E. Bahasa Inggris mulai diajarkan di sekolah-sekolah"
            ],
            correct: 3 // D
        },
        {
            id: 16,
            question: "Badan yang dibentuk Jepang pada akhir masa pendudukannya untuk menyelidiki usaha-usaha persiapan kemerdekaan Indonesia adalah...",
            options: [
                "A. PPKI",
                "B. BPUPKI",
                "C. KNIP",
                "D. PETA",
                "E. Cuo Sangi In"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Siapakah tokoh yang menjabat sebagai Ketua BPUPKI (Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia)?",
            options: [
                "A. Ir. Soekarno",
                "B. Moh. Hatta",
                "C. Dr. K.R.T. Radjiman Wedyodiningrat",
                "D. Mr. Muhammad Yamin",
                "E. Prof. Dr. Mr. Soepomo"
            ],
            correct: 2 // C
        },
        {
            id: 18,
            question: "Perdana Menteri Jepang yang memberikan janji kemerdekaan kepada Indonesia di \"kelak kemudian hari\" pada sidang parlemen Jepang adalah...",
            options: [
                "A. Kuniaki Koiso",
                "B. Hideki Tojo",
                "C. Tanaka",
                "D. Laksamana Maeda",
                "E. Isoroku Yamamoto"
            ],
            correct: 0 // A
        },
        {
            id: 19,
            question: "Peristiwa eksternal yang menjadi faktor utama menyerahnya Jepang kepada Sekutu dan menandai berakhirnya kekuasaan Jepang di Indonesia adalah...",
            options: [
                "A. Serangan Umum 1 Maret",
                "B. Jatuhnya bom atom di kota Hiroshima dan Nagasaki",
                "C. Kekalahan Jepang dalam Pertempuran Laut Jawa",
                "D. Ditandatanganinya Perjanjian Linggarjati",
                "E. Terjadinya Pemberontakan PETA di berbagai daerah"
            ],
            correct: 1 // B
        },
        {
            id: 20,
            question: "Nilai luhur yang dapat diambil dari perbedaan strategi antara tokoh kooperatif (Soekarno-Hatta) dan non-kooperatif (Sjahrir) pada masa Jepang adalah...",
            options: [
                "A. Pentingnya persaingan antar golongan untuk merebut kekuasaan",
                "B. Sinergi dan kerja sama meski berbeda cara demi satu tujuan: Kemerdekaan",
                "C. Sikap menyerah pada nasib dan menunggu pemberian penjajah",
                "D. Mementingkan keselamatan kelompok sendiri di atas kepentingan bangsa",
                "E. Tidak peduli pada penderitaan rakyat asalkan tujuan tercapai"
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
                    <h2>Sejarah Indonesia: Pendudukan Jepang</h2>
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
                    const isCorrect = userAns === q.correct;
                    
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Pendudukan Jepang di Indonesia (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Pendudukan Jepang di Indonesia</p>
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