import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 9 ---
export const MindfulnessEkonomi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Tutup matamu sejenak...",
        "Bayangkan harga barang naik setiap jam (Hiperinflasi).",
        "Uang di sakumu hari ini bisa membeli beras, besok hanya cukup untuk permen.",
        "Tarik napas... rasakan beratnya beban ekonomi rakyat masa itu.",
        "Hembuskan... syukuri stabilitas ekonomi yang kita nikmati hari ini.",
        "Mari belajar dari kegagalan masa lalu untuk membangun ekonomi masa depan."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-coins text-amber-600 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-amber-600 text-amber-600 px-8 py-2 rounded-full hover:bg-amber-600 hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
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

// --- SIMULATION: MENTERI EKONOMI ---
export const EconomyMinisterSimulation: React.FC = () => {
    const [stats, setStats] = useState({ inflation: 80, happiness: 40, year: 1950 });
    const [gameStatus, setGameStatus] = useState<'PLAYING' | 'GAME_OVER' | 'WIN'>('PLAYING');
    const [feedback, setFeedback] = useState("Menteri! Uang beredar terlalu banyak warisan kolonial. Harga beras naik. Kas negara kosong. Apa kebijakanmu?");

    const playTurn = (action: 'gunting' | 'alibaba' | 'print') => {
        let newInflation = stats.inflation;
        let newHappiness = stats.happiness;
        let newYear = stats.year;
        let msg = "";

        if (action === 'gunting') {
            newInflation = Math.max(0, newInflation - 30);
            newHappiness = Math.max(0, newHappiness - 20); // Rakyat marah uang dipotong
            newYear += 2;
            msg = "Kebijakan 'Gunting Syafruddin' diambil! Inflasi turun drastis, tapi rakyat bingung dan marah karena uang tunai mereka berkurang nilainya.";
        } else if (action === 'alibaba') {
            newInflation = Math.min(100, newInflation + 10);
            newHappiness = Math.max(0, newHappiness - 10);
            newYear += 3;
            msg = "Sistem Ali-Baba diterapkan. Kredit macet! Pengusaha pribumi menjual lisensi ke pengusaha non-pribumi. Ekonomi stagnan.";
        } else if (action === 'print') {
            newInflation = Math.min(100, newInflation + 40); // Hiperinflasi
            newHappiness = Math.min(100, newHappiness + 10); // Sesaat senang proyek
            newYear += 4;
            msg = "Kamu mencetak uang untuk bangun Monas & GBK (Proyek Mercusuar). Hasilnya megah, tapi Inflasi meroket! Harga beras tak terjangkau.";
        }

        setStats({ inflation: newInflation, happiness: newHappiness, year: newYear });
        setFeedback(msg);

        // Check End Conditions
        if (newInflation >= 95) {
            setGameStatus('GAME_OVER');
            setFeedback("GAME OVER: Hiperinflasi! Ekonomi hancur. Rakyat demo besar-besaran (Tritura). Pemerintah jatuh.");
        } else if (newHappiness <= 10) {
            setGameStatus('GAME_OVER');
            setFeedback("GAME OVER: Revolusi Sosial! Rakyat tidak percaya lagi pada pemerintah. Terjadi kerusuhan.");
        } else if (newYear >= 1965) {
            setGameStatus('WIN');
            setFeedback("Simulasi Selesai! Kamu berhasil bertahan hingga 1965, meski ekonomi sulit. Sejarah mencatat ini sebagai masa transisi yang berat.");
        }
    };

    const resetGame = () => {
        setStats({ inflation: 80, happiness: 40, year: 1950 });
        setGameStatus('PLAYING');
        setFeedback("Menteri! Uang beredar terlalu banyak warisan kolonial. Harga beras naik. Kas negara kosong. Apa kebijakanmu?");
    };

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20">
            {/* Header Stats */}
            <div className="bg-[#0a0a0a] p-6 border-b border-history-gold/10 flex justify-between items-center text-white">
                <div>
                    <h3 className="text-xl font-bold font-sans text-history-gold"><i className="fas fa-user-tie mr-2"></i>Simulasi Menteri Ekonomi</h3>
                    <p className="text-xs text-history-muted mt-1">Tahun: {stats.year}</p>
                </div>
                <div className="text-right">
                    <div className="text-xs uppercase tracking-widest text-history-muted mb-1">Status Negara</div>
                    <div className={`font-bold ${stats.inflation > 70 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {stats.inflation > 70 ? 'Kritis' : 'Stabil'}
                    </div>
                </div>
            </div>

            <div className="p-8">
                {/* Meters */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="flex justify-between mb-2 text-xs font-bold text-history-muted uppercase">
                            <span>Inflasi (Bahaya)</span>
                            <span>{stats.inflation}%</span>
                        </div>
                        <div className="w-full bg-[#0a0a0a] rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all duration-500 ${stats.inflation > 80 ? 'bg-red-600' : 'bg-emerald-600'}`} style={{ width: `${stats.inflation}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2 text-xs font-bold text-history-muted uppercase">
                            <span>Kepercayaan Rakyat</span>
                            <span>{stats.happiness}%</span>
                        </div>
                        <div className="w-full bg-[#0a0a0a] rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all duration-500 ${stats.happiness < 30 ? 'bg-red-600' : 'bg-blue-500'}`} style={{ width: `${stats.happiness}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Scenario Text */}
                <div className="bg-[#0a0a0a] p-6 rounded-lg border-l-4 border-amber-600 mb-8 min-h-[100px] flex items-center">
                    <p className="text-history-brown text-lg font-light leading-relaxed italic w-full text-center">"{feedback}"</p>
                </div>

                {/* Actions */}
                {gameStatus === 'PLAYING' ? (
                    <div className="grid md:grid-cols-3 gap-4">
                        <button onClick={() => playTurn('gunting')} className="p-4 bg-[#262626] border border-blue-500/30 rounded-xl hover:bg-blue-900/20 hover:border-blue-500 transition group text-center">
                            <i className="fas fa-cut text-2xl text-blue-500 mb-2 block group-hover:scale-110 transition"></i>
                            <span className="block font-bold text-blue-400 text-sm mb-1">Gunting Syafruddin</span>
                            <span className="block text-xs text-history-muted">Potong nilai uang</span>
                        </button>
                        <button onClick={() => playTurn('alibaba')} className="p-4 bg-[#262626] border border-amber-500/30 rounded-xl hover:bg-amber-900/20 hover:border-amber-500 transition group text-center">
                            <i className="fas fa-handshake text-2xl text-amber-500 mb-2 block group-hover:scale-110 transition"></i>
                            <span className="block font-bold text-amber-400 text-sm mb-1">Sistem Ali-Baba</span>
                            <span className="block text-xs text-history-muted">Bantu kredit pribumi</span>
                        </button>
                        <button onClick={() => playTurn('print')} className="p-4 bg-[#262626] border border-red-500/30 rounded-xl hover:bg-red-900/20 hover:border-red-500 transition group text-center">
                            <i className="fas fa-print text-2xl text-red-500 mb-2 block group-hover:scale-110 transition"></i>
                            <span className="block font-bold text-red-400 text-sm mb-1">Cetak Uang (Proyek)</span>
                            <span className="block text-xs text-history-muted">Bangun Monumen</span>
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <button onClick={resetGame} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-sm shadow-lg">
                            Main Ulang
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 9 ---
export const LKPDTopic9: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));
    
    // Form States
    const [libKuasai, setLibKuasai] = useState('');
    const [terKuasai, setTerKuasai] = useState('');
    const [libPartai, setLibPartai] = useState('');
    const [terPartai, setTerPartai] = useState('');
    const [libEkonomi, setLibEkonomi] = useState('');
    const [terEkonomi, setTerEkonomi] = useState('');
    const [studiKasus, setStudiKasus] = useState('');

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
                <div class="sub-header">Topik: Analisis Perbandingan Demokrasi Liberal & Terpimpin</div>
                
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
                    <h3>A. Petunjuk Belajar (Joyful Learning)</h3>
                    <ol style="font-size: 14px;">
                        <li>Scan QR Code/Buka Link materi yang diberikan guru.</li>
                        <li>Diskusi dengan teman sekelompok (Gotong Royong).</li>
                        <li>Jawablah pertanyaan dengan bahasa kalian sendiri (Kritis).</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>B. Tugas Analisis (HOTS & Meaningful)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek Pembeda</th>
                                <th width="40%">Demokrasi Liberal (1950-1959)</th>
                                <th width="40%">Demokrasi Terpimpin (1959-1965)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Pemegang Kekuasaan Tertinggi</strong></td>
                                <td>${libKuasai}</td>
                                <td>${terKuasai}</td>
                            </tr>
                            <tr>
                                <td><strong>Kondisi Partai Politik</strong></td>
                                <td>${libPartai}</td>
                                <td>${terPartai}</td>
                            </tr>
                            <tr>
                                <td><strong>Kondisi Ekonomi</strong></td>
                                <td>${libEkonomi}</td>
                                <td>${terEkonomi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>C. Studi Kasus (Deep Learning)</h3>
                    <p class="instruction">"Pada masa Liberal, kabinet jatuh bangun. Pada masa Terpimpin, kekuasaan terlalu kuat di satu orang. Menurut pendapat kelompokmu, manakah yang lebih berbahaya bagi kemajuan bangsa? Berikan alasan logis!"</p>
                    <div class="answer-box">${studiKasus}</div>
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
                    <button onClick={() => window.open('https://forms.gle/CFWBpN9pSKdXCeKu8', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div className="space-y-4">
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Nama Kelompok</label>
                        <input value={kelompok} onChange={e => setKelompok(e.target.value)} placeholder="Contoh: Kelompok Natsir" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
                    </div>
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Kelas</label>
                        <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Contoh: XI TKJ 3" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
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

            {/* Tugas Analisis */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-amber-600 pl-3">B. Tugas Analisis (HOTS & Meaningful)</h4>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#171717] text-history-brown text-xs border-b border-history-gold/20 text-center">
                                <th className="p-3 border-r border-history-gold/10 w-1/5">Aspek Pembeda</th>
                                <th className="p-3 border-r border-history-gold/10 w-2/5">Demokrasi Liberal (1950-1959)</th>
                                <th className="p-3 w-2/5">Demokrasi Terpimpin (1959-1965)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-brown">
                            {/* Row 1 */}
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Pemegang Kekuasaan Tertinggi</td>
                                <td className="p-2"><textarea value={libKuasai} onChange={e => setLibKuasai(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Perdana Menteri..."></textarea></td>
                                <td className="p-2"><textarea value={terKuasai} onChange={e => setTerKuasai(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Presiden..."></textarea></td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="border-b border-history-muted/10 bg-[#171717]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Kondisi Partai Politik</td>
                                <td className="p-2"><textarea value={libPartai} onChange={e => setLibPartai(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Banyak partai..."></textarea></td>
                                <td className="p-2"><textarea value={terPartai} onChange={e => setTerPartai(e.target.value)} className="bg-[#0a0a0a] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Dibatasi/NASAKOM..."></textarea></td>
                            </tr>
                            {/* Row 3 */}
                            <tr className="border-b border-history-muted/10 bg-[#0a0a0a]">
                                <td className="p-3 font-bold text-history-gold text-xs uppercase">Kondisi Ekonomi</td>
                                <td className="p-2"><textarea value={libEkonomi} onChange={e => setLibEkonomi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Defisit, Gunting Syafruddin..."></textarea></td>
                                <td className="p-2"><textarea value={terEkonomi} onChange={e => setTerEkonomi(e.target.value)} className="bg-[#171717] w-full p-2 rounded border border-history-muted/20 text-xs h-20" placeholder="Hiperinflasi, Proyek Mercusuar..."></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Studi Kasus */}
            <div className="space-y-6 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 border-l-4 border-amber-600 pl-3">C. Studi Kasus (Deep Learning)</h4>
                <div className="bg-[#171717] p-4 rounded mb-4 text-sm text-history-muted italic border border-history-gold/10">
                    "Pada masa Liberal, kabinet jatuh bangun. Pada masa Terpimpin, kekuasaan terlalu kuat di satu orang. Menurut pendapat kelompokmu, manakah yang lebih berbahaya bagi kemajuan bangsa? Berikan alasan logis!"
                </div>
                <textarea value={studiKasus} onChange={e => setStudiKasus(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-32 outline-none focus:border-history-gold" placeholder="Argumentasi kalian..."></textarea>
            </div>
        </div>
    );
};

// --- QUIZ TOPIC 9 (FULL EVALUATION SYSTEM) ---
export const QuizDinamika: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Pada masa Demokrasi Liberal (1950-1959), stabilitas pemerintahan sangat rendah karena sering terjadi pergantian kabinet. Faktor utama penyebab seringnya pergantian kabinet tersebut adalah...",
            options: [
                "A. Adanya intervensi dari negara-negara blok Barat dan Timur",
                "B. Presiden terlalu sering mencampuri urusan pemerintahan",
                "C. Munculnya berbagai pemberontakan di daerah-daerah",
                "D. Parlemen dapat menjatuhkan kabinet melalui mosi tidak percaya",
                "E. Militer mengambil alih kekuasaan dari tangan sipil"
            ],
            correct: 3 // D
        },
        {
            id: 2,
            question: "Salah satu kebijakan ekonomi yang diterapkan pada masa Kabinet Natsir adalah \"Gunting Syafruddin\". Tujuan utama dari kebijakan pemotongan nilai uang ini adalah...",
            options: [
                "A. Meningkatkan daya beli masyarakat terhadap barang impor",
                "B. Mengurangi jumlah uang yang beredar untuk menekan inflasi",
                "C. Menambah cadangan kas negara untuk pembangunan proyek mercusuar",
                "D. Membagikan uang kepada rakyat miskin secara merata",
                "E. Mengganti mata uang peninggalan Belanda dengan Rupiah baru"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Kabinet Ali Sastroamidjojo I memiliki prestasi gemilang di kancah internasional yang mengharumkan nama bangsa, yaitu...",
            options: [
                "A. Menyelenggarakan Pemilihan Umum pertama tahun 1955",
                "B. Mendeklarasikan batas laut teritorial Indonesia (Deklarasi Djuanda)",
                "C. Menyelenggarakan Konferensi Asia Afrika (KAA) di Bandung",
                "D. Membentuk pasukan perdamaian Garuda untuk PBB",
                "E. Membebaskan Irian Barat dari tangan Belanda secara diplomasi"
            ],
            correct: 2 // C
        },
        {
            id: 4,
            question: "Kejatuhan Kabinet Sukiman (1951-1952) dipicu oleh adanya penandatanganan kesepakatan Mutual Security Act (MSA) dengan Amerika Serikat. Hal ini dianggap melanggar prinsip politik luar negeri Indonesia karena...",
            options: [
                "A. Indonesia menjadi condong ke Blok Barat dan tidak lagi Bebas Aktif",
                "B. Amerika Serikat menolak memberikan bantuan ekonomi kepada Indonesia",
                "C. Indonesia harus mengirimkan pasukan perang ke Vietnam",
                "D. Perjanjian tersebut merugikan pengusaha pribumi di Indonesia",
                "E. Kabinet Sukiman tidak berkonsultasi dengan Presiden Soekarno"
            ],
            correct: 0 // A
        },
        {
            id: 5,
            question: "Sistem ekonomi \"Ali-Baba\" yang digagas oleh Iskaq Tjokrohadisurjo bertujuan untuk memajukan pengusaha pribumi. Namun, kebijakan ini mengalami kegagalan karena...",
            options: [
                "A. Pengusaha non-pribumi menolak bekerja sama dengan pemerintah",
                "B. Pemerintah tidak memberikan bantuan kredit modal usaha",
                "C. Pengusaha pribumi hanya dijadikan alat (\"pengusaha lisensi\") dan bersikap konsumtif",
                "D. Terjadinya krisis moneter global yang mempengaruhi ekonomi nasional",
                "E. Adanya sabotase ekonomi yang dilakukan oleh pihak Belanda"
            ],
            correct: 2 // C
        },
        {
            id: 6,
            question: "Pemilihan Umum tahun 1955 dianggap sebagai pemilu paling demokratis dalam sejarah Indonesia. Empat partai besar yang keluar sebagai pemenang dalam pemilu tersebut secara berurutan adalah...",
            options: [
                "A. PNI, Masyumi, NU, PKI",
                "B. Masyumi, PNI, PKI, PSI",
                "C. Golkar, PNI, Masyumi, NU",
                "D. PNI, Golkar, PPP, PDI",
                "E. PKI, PNI, Murba, Masyumi"
            ],
            correct: 0 // A
        },
        {
            id: 7,
            question: "Kabinet Djuanda disebut sebagai Zaken Kabinet. Makna dari istilah tersebut adalah...",
            options: [
                "A. Kabinet yang dipimpin langsung oleh Presiden",
                "B. Kabinet yang anggotanya berasal dari satu partai pemenang pemilu",
                "C. Kabinet koalisi yang melibatkan seluruh partai politik",
                "D. Kabinet yang jajaran menterinya berasal dari kalangan militer",
                "E. Kabinet yang jajaran menterinya adalah para ahli di bidangnya masing-masing"
            ],
            correct: 4 // E
        },
        {
            id: 8,
            question: "Deklarasi Djuanda pada 13 Desember 1957 memiliki arti sangat penting bagi kedaulatan wilayah Indonesia, yaitu...",
            options: [
                "A. Mengubah Indonesia menjadi negara serikat",
                "B. Menetapkan batas laut teritorial sejauh 12 mil dari garis pantai terluar yang menghubungkan pulau-pulau",
                "C. Menasionalisasi perusahaan-perusahaan milik Belanda di Indonesia",
                "D. Memutuskan hubungan diplomatik dengan Kerajaan Belanda",
                "E. Menetapkan mata uang Rupiah sebagai satu-satunya alat pembayaran sah"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Latar belakang utama dikeluarkannya Dekrit Presiden 5 Juli 1959 adalah...",
            options: [
                "A. Keinginan Presiden Soekarno untuk menjadi pemimpin seumur hidup",
                "B. Desakan dari partai komunis untuk membubarkan parlemen",
                "C. Kegagalan Dewan Konstituante dalam menyusun Undang-Undang Dasar baru",
                "D. Terjadinya pemberontakan G30S/PKI di Jakarta",
                "E. Krisis ekonomi yang tidak kunjung membaik akibat sanksi PBB"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Berikut ini yang bukan merupakan isi dari Dekrit Presiden 5 Juli 1959 adalah...",
            options: [
                "A. Pembubaran Dewan Konstituante",
                "B. Berlakunya kembali UUD 1945",
                "C. Tidak berlakunya UUDS 1950",
                "D. Pembentukan MPRS dan DPAS",
                "E. Pembubaran Partai Komunis Indonesia (PKI)"
            ],
            correct: 4 // E
        },
        {
            id: 11,
            question: "Pada masa Demokrasi Terpimpin, terjadi penyimpangan terhadap UUD 1945. Salah satu penyimpangan yang paling mencolok dalam lembaga eksekutif adalah...",
            options: [
                "A. Presiden membubarkan DPR hasil Pemilu 1955",
                "B. Presiden membentuk kabinet ahli (zaken kabinet)",
                "C. Presiden menolak bantuan asing dari Blok Barat",
                "D. Presiden menjalankan politik luar negeri bebas aktif",
                "E. Presiden mengizinkan berdirinya banyak partai politik"
            ],
            correct: 0 // A
        },
        {
            id: 12,
            question: "Konsep politik yang digagas Presiden Soekarno untuk menyatukan tiga kekuatan ideologi besar di Indonesia pada masa Demokrasi Terpimpin disebut...",
            options: [
                "A. Pancasila",
                "B. Manipol USDEK",
                "C. NEFO dan OLDEFO",
                "D. NASAKOM",
                "E. Trilogi Pembangunan"
            ],
            correct: 3 // D
        },
        {
            id: 13,
            question: "Pada masa Demokrasi Terpimpin, politik luar negeri Indonesia cenderung bersifat konfrontatif dan membagi kekuatan dunia menjadi dua, yaitu...",
            options: [
                "A. Blok Barat dan Blok Timur",
                "B. Negara Maju dan Negara Berkembang",
                "C. NEFO (New Emerging Forces) dan OLDEFO (Old Established Forces)",
                "D. Poros Jakarta-Peking dan Poros Jakarta-Moskow",
                "E. Sekutu dan Poros"
            ],
            correct: 2 // C
        },
        {
            id: 14,
            question: "Proyek \"Mercusuar\" pada masa Demokrasi Terpimpin, seperti pembangunan Stadion Gelora Bung Karno dan Monas, bertujuan untuk...",
            options: [
                "A. Menyediakan lapangan kerja bagi rakyat miskin",
                "B. Menunjukkan kemegahan dan eksistensi Indonesia di mata dunia internasional",
                "C. Menghabiskan sisa anggaran belanja negara",
                "D. Mempersiapkan Indonesia menjadi tuan rumah Olimpiade Dunia",
                "E. Menarik investor asing agar menanamkan modal di Indonesia"
            ],
            correct: 1 // B
        },
        {
            id: 15,
            question: "Untuk mengatasi inflasi yang sangat tinggi (hiperinflasi) pada tahun 1959, pemerintah melakukan kebijakan Sanering. Maksud dari kebijakan ini adalah...",
            options: [
                "A. Mencetak uang baru sebanyak-banyaknya",
                "B. Menurunkan nilai mata uang (misal Rp1000 menjadi Rp100)",
                "C. Membekukan seluruh simpanan nasabah di bank",
                "D. Meminjam dana dari International Monetary Fund (IMF)",
                "E. Menjual aset-aset negara kepada swasta"
            ],
            correct: 1 // B
        },
        {
            id: 16,
            question: "Peristiwa mundurnya Drs. Moh. Hatta sebagai Wakil Presiden pada tahun 1956 menjadi penanda berakhirnya Dwitunggal. Dampak politik dari peristiwa ini adalah...",
            options: [
                "A. Semakin kuatnya posisi Presiden Soekarno dalam pemerintahan",
                "B. Munculnya pergolakan di daerah yang kecewa (PRRI/Permesta)",
                "C. Bubarnya partai Masyumi dan PSI",
                "D. Terjadinya krisis ekonomi yang berkepanjangan",
                "E. Jawaban A dan B benar"
            ],
            correct: 4 // E (Based on options logic, though key says E, A & B are both impacts)
        },
        {
            id: 17,
            question: "Peristiwa Tanjung Morawa di Sumatera Utara yang melibatkan sengketa tanah perkebunan mengakibatkan jatuhnya kabinet...",
            options: [
                "A. Natsir",
                "B. Sukiman",
                "C. Wilopo",
                "D. Ali Sastroamidjojo I",
                "E. Burhanuddin Harahap"
            ],
            correct: 2 // C
        },
        {
            id: 18,
            question: "Pada masa Demokrasi Terpimpin, Presiden Soekarno membentuk DPR-GR (Dewan Perwakilan Rakyat Gotong Royong). Tindakan ini dianggap menyimpang karena...",
            options: [
                "A. Anggota DPR-GR dipilih langsung oleh rakyat melalui pemilu",
                "B. Anggota DPR-GR ditunjuk dan diangkat langsung oleh Presiden",
                "C. DPR-GR memiliki kekuasaan lebih tinggi daripada Presiden",
                "D. DPR-GR didominasi oleh partai oposisi pemerintah",
                "E. DPR-GR menolak semua rancangan undang-undang dari Presiden"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Inflasi yang mencapai 600% pada akhir masa Demokrasi Terpimpin (1965) disebabkan oleh...",
            options: [
                "A. Harga minyak dunia yang turun drastis",
                "B. Kegagalan panen raya di seluruh Indonesia",
                "C. Pencetakan uang baru tanpa batas untuk membiayai proyek mercusuar dan konfrontasi",
                "D. Boikot ekonomi yang dilakukan oleh negara-negara Asia Tenggara",
                "E. Penutupan seluruh bank asing di Indonesia"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Perbandingan utama antara Demokrasi Liberal dan Demokrasi Terpimpin terletak pada peran pemimpin negara. Pernyataan yang tepat adalah...",
            options: [
                "A. Liberal: Presiden berkuasa mutlak; Terpimpin: Perdana Menteri berkuasa",
                "B. Liberal: Parlemen lemah; Terpimpin: Parlemen sangat kuat",
                "C. Liberal: Dominasi partai politik (legislatif); Terpimpin: Dominasi Presiden (eksekutif)",
                "D. Liberal: Tidak ada pemilu; Terpimpin: Ada pemilu demokratis",
                "E. Liberal: Ekonomi terpusat; Terpimpin: Ekonomi pasar bebas"
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
                    <h2>Topik: Dinamika Politik & Ekonomi</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Dinamika Politik & Ekonomi (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Dinamika Politik & Ekonomi</p>
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