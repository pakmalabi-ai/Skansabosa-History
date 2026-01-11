import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessOrba: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Mari kita kembali ke tahun 1966...",
        "Jalanan Jakarta penuh dengan mahasiswa yang turun ke jalan.",
        "Harga beras melambung tinggi, rakyat antre minyak tanah.",
        "Rasakan semangat perubahan yang membara di dada pemuda.",
        "Tarik napas... rasakan harapan akan tatanan baru yang lebih baik.",
        "Hembuskan... lepaskan memori kelam masa lalu, bersiap untuk Orde Baru."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-bullhorn text-history-gold text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-history-gold text-history-gold px-8 py-2 rounded-full hover:bg-history-gold hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MENUJU STABILITAS
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: JEJAK AKTIVIS '66 ---
export const Activist66Simulation: React.FC = () => {
    const [stats, setStats] = useState({ spirit: 50, order: 50 });
    const [turn, setTurn] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Kamu adalah mahasiswa UI tahun 1966. Negara dalam keadaan chaos. Tentukan langkahmu!");

    const scenarios = [
        {
            title: "Aksi Tritura (Januari 1966)",
            desc: "Harga barang naik 600%. Rakyat lapar. KAMI dan KAPPI berencana turun ke jalan menuntut Tritura.",
            options: [
                { text: "Ikut demonstrasi besar-besaran", effect: { spr: +30, ord: -20 }, msg: "Semangatmu membakar massa! Pemerintah mulai tertekan, tapi situasi makin tidak terkendali." },
                { text: "Fokus belajar di kampus", effect: { spr: -20, ord: +10 }, msg: "Kamu aman, tapi teman-temanmu mencapmu tidak peduli nasib rakyat." },
                { text: "Menulis kritik di koran kampus", effect: { spr: +10, ord: 0 }, msg: "Suaramu didengar kalangan intelektual, tapi kurang berdampak pada kebijakan langsung." }
            ]
        },
        {
            title: "Supersemar (Maret 1966)",
            desc: "Beredar kabar Presiden Soekarno memberikan mandat kepada Letjen Soeharto untuk memulihkan keamanan.",
            options: [
                { text: "Dukung penuh pembubaran PKI", effect: { spr: +10, ord: +40 }, msg: "Keamanan pulih dengan cepat. PKI dibubarkan. Orde Baru mulai terbentuk." },
                { text: "Kritis terhadap wewenang militer", effect: { spr: +20, ord: -10 }, msg: "Kamu khawatir militer akan terlalu dominan, tapi stabilitas memang dibutuhkan saat ini." },
                { text: "Tetap setia pada Orde Lama", effect: { spr: -10, ord: -30 }, msg: "Kamu tersingkir dari arus sejarah. Perubahan besar tidak bisa dibendung." }
            ]
        },
        {
            title: "Dualisme Kepemimpinan (1966-1967)",
            desc: "Ada dua matahari kembar: Soekarno masih Presiden, tapi Soeharto pemegang mandat eksekutif. Politik bingung.",
            options: [
                { text: "Desak Sidang Istimewa MPRS", effect: { spr: +20, ord: +30 }, msg: "Tepat! Ketidakpastian harus diakhiri. Soeharto akhirnya dilantik menjadi Pejabat Presiden." },
                { text: "Biarkan mengalir", effect: { spr: -10, ord: -10 }, msg: "Ketidakpastian berlanjut. Ekonomi makin sulit pulih." }
            ]
        }
    ];

    const handleChoice = (effect: any, msg: string) => {
        const newStats = {
            spirit: Math.min(100, Math.max(0, stats.spirit + effect.spr)),
            order: Math.min(100, Math.max(0, stats.order + effect.ord))
        };
        setStats(newStats);
        setMessage(msg);

        if (turn >= 3) {
            setGameOver(true);
            setMessage("Simulasi Selesai. Anda telah melewati masa transisi kritis bangsa ini.");
        } else {
            setTurn(turn + 1);
        }
    };

    const resetGame = () => {
        setStats({ spirit: 50, order: 50 });
        setTurn(1);
        setGameOver(false);
        setMessage("Kamu adalah mahasiswa UI tahun 1966. Negara dalam keadaan chaos. Tentukan langkahmu!");
    };

    const currentScenario = scenarios[turn - 1];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm">Simulasi: Jejak Aktivis '66</h3>
                <span className="text-xs text-history-muted">Fase: {turn}/3</span>
            </div>
            
            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-center">
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Semangat Juang</div>
                        <div className={`text-lg font-bold ${stats.spirit < 30 ? 'text-red-500' : 'text-history-gold'}`}>{stats.spirit}%</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Ketertiban Umum</div>
                        <div className={`text-lg font-bold ${stats.order < 30 ? 'text-red-500' : 'text-blue-400'}`}>{stats.order}%</div>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-[#0a0a0a] rounded border-l-2 border-history-gold text-history-brown italic text-center text-sm">
                    "{message}"
                </div>

                {!gameOver ? (
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">{currentScenario.title}</h4>
                        <p className="text-history-muted mb-6 text-sm">{currentScenario.desc}</p>
                        <div className="grid gap-3">
                            {currentScenario.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(opt.effect, opt.msg)}
                                    className="p-4 bg-[#262626] hover:bg-history-gold hover:text-[#0a0a0a] text-left rounded transition border border-white/5 text-sm group"
                                >
                                    <span className="font-bold mr-2 group-hover:text-black text-history-gold">{String.fromCharCode(65+idx)}.</span> {opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-4">Orde Baru Telah Lahir</h4>
                        <p className="text-history-muted mb-6 text-sm">Sejarah mencatat peran mahasiswa angkatan '66 sebagai ujung tombak perubahan.</p>
                        <button onClick={resetGame} className="bg-history-red text-white px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-red-700">
                            Ulangi Simulasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic12: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1: Timeline
    const [tl1Order, setTl1Order] = useState(''); const [tl1Date, setTl1Date] = useState('');
    const [tl2Order, setTl2Order] = useState(''); const [tl2Date, setTl2Date] = useState('');
    const [tl3Order, setTl3Order] = useState(''); const [tl3Date, setTl3Date] = useState('');
    const [tl4Order, setTl4Order] = useState(''); const [tl4Date, setTl4Date] = useState('');

    // Activity 2: Critical Thinking
    const [ctKasus, setCtKasus] = useState('');
    const [ctVisi, setCtVisi] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Mata Pelajaran: Sejarah - Materi: Lahirnya Orde Baru</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>Aktivitas 1: Analisis Kronologis (Timeline)</h3>
                    <p class="instruction">Petunjuk: Urutkan peristiwa berikut dari yang paling awal terjadi (1) hingga yang paling akhir (4).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="40%">Peristiwa</th>
                                <th width="20%">Urutan (1-4)</th>
                                <th width="40%">Tanggal/Tahun Peristiwa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Keluarnya Supersemar</td>
                                <td>${tl1Order}</td>
                                <td>${tl1Date}</td>
                            </tr>
                            <tr>
                                <td>Peristiwa G30S</td>
                                <td>${tl2Order}</td>
                                <td>${tl2Date}</td>
                            </tr>
                            <tr>
                                <td>Pelantikan Soeharto sebagai Presiden RI ke-2</td>
                                <td>${tl3Order}</td>
                                <td>${tl3Date}</td>
                            </tr>
                            <tr>
                                <td>Aksi Tritura</td>
                                <td>${tl4Order}</td>
                                <td>${tl4Date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Critical Thinking (HOTS)</h3>
                    
                    <p><strong>Kasus:</strong> Dalam Tritura, salah satu tuntutannya adalah "Turunkan Harga". Mengapa tuntutan ekonomi ini menjadi sangat penting pada tahun 1966, dan apa hubungannya dengan stabilitas politik saat itu?</p>
                    <div class="answer">${ctKasus}</div>

                    <p style="margin-top:15px;"><strong>Analisis Visi:</strong> Jelaskan makna kalimat "Melaksanakan Pancasila secara murni dan konsekuen"! Mengapa Orde Baru merasa perlu menggunakan slogan ini?</p>
                    <div class="answer">${ctVisi}</div>
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
                    <button onClick={() => window.open('https://forms.gle/JAC7AUkyWdi7poyH7', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 1: Analisis Kronologis (Timeline)</h4>
                    <p className="text-sm text-history-muted mb-4">Urutkan peristiwa berikut dari yang paling awal terjadi (1) hingga yang paling akhir (4).</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/2">Peristiwa</th>
                                    <th className="p-3 border border-history-gold/10 w-1/6">Urutan (1-4)</th>
                                    <th className="p-3 border border-history-gold/10 w-1/3">Tanggal/Tahun</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Keluarnya Supersemar</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl1Order} onChange={e => setTl1Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl1Date} onChange={e => setTl1Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Peristiwa G30S</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl2Order} onChange={e => setTl2Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl2Date} onChange={e => setTl2Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Pelantikan Soeharto (Presiden RI ke-2)</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl3Order} onChange={e => setTl3Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl3Date} onChange={e => setTl3Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10">Aksi Tritura</td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl4Order} onChange={e => setTl4Order(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-center focus:border-history-gold outline-none border border-white/10" /></td>
                                    <td className="p-2 border border-history-gold/10"><input value={tl4Date} onChange={e => setTl4Date(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded focus:border-history-gold outline-none border border-white/10" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 2: Critical Thinking (HOTS)</h4>
                    
                    <div className="mb-6">
                        <label className="block text-history-brown text-sm font-bold mb-2">Kasus: "Turunkan Harga"</label>
                        <p className="text-xs text-history-muted mb-2">Mengapa tuntutan ekonomi ini menjadi sangat penting pada tahun 1966, dan apa hubungannya dengan stabilitas politik saat itu?</p>
                        <textarea value={ctKasus} onChange={e => setCtKasus(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Analisis hubungan ekonomi dan politik..."></textarea>
                    </div>

                    <div>
                        <label className="block text-history-brown text-sm font-bold mb-2">Analisis Visi</label>
                        <p className="text-xs text-history-muted mb-2">Jelaskan makna kalimat "Melaksanakan Pancasila secara murni dan konsekuen"! Mengapa Orde Baru merasa perlu menggunakan slogan ini?</p>
                        <textarea value={ctVisi} onChange={e => setCtVisi(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Jawaban analisis visi..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizOrba: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Secara harfiah, istilah \"Orde Baru\" merujuk pada tatanan kehidupan rakyat, bangsa, dan negara yang diletakkan kembali kepada pelaksanaan...",
            options: [
                "A. Demokrasi Liberal dan UUD 1945",
                "B. Nasakom dan Manipol USDEK",
                "C. Pancasila dan UUD 1945 secara murni dan konsekuen",
                "D. Piagam Jakarta dan Pancasila",
                "E. Dekrit Presiden dan Demokrasi Terpimpin"
            ],
            correct: 2 // C
        },
        {
            id: 2,
            question: "Lahirnya Orde Baru dilatarbelakangi oleh terjadinya krisis multidimensi pada tahun 1965. Peristiwa politik utama yang menjadi pemicu krisis kepercayaan rakyat terhadap Presiden Soekarno saat itu adalah...",
            options: [
                "A. Keluarnya Dekrit Presiden 5 Juli 1959",
                "B. Peristiwa G30S/PKI",
                "C. Agresi Militer Belanda II",
                "D. Konfrontasi dengan Malaysia",
                "E. Pembebasan Irian Barat"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Salah satu faktor penyebab jatuhnya pemerintahan Orde Lama adalah krisis ekonomi yang parah. Indikator ekonomi yang paling mencolok pada tahun 1965-1966 adalah...",
            options: [
                "A. Hutang luar negeri yang lunas",
                "B. Surplus beras yang melimpah",
                "C. Nilai tukar rupiah yang menguat tajam",
                "D. Inflasi yang mencapai angka 600%",
                "E. Banyaknya investor asing yang masuk"
            ],
            correct: 3 // D
        },
        {
            id: 4,
            question: "Sebagai respon terhadap kondisi negara yang kacau, kesatuan aksi mahasiswa (KAMI) dan pelajar (KAPPI) mengajukan tiga tuntutan kepada pemerintah yang dikenal dengan nama...",
            options: [
                "A. Dwikora",
                "B. Trikora",
                "C. Tritura",
                "D. Dasasila Bandung",
                "E. Panca Azimat Revolusi"
            ],
            correct: 2 // C
        },
        {
            id: 5,
            question: "Berikut ini yang BUKAN merupakan isi dari Tritura (Tri Tuntutan Rakyat) adalah...",
            options: [
                "A. Bubarkan PKI",
                "B. Bersihkan Kabinet Dwikora dari unsur G30S/PKI",
                "C. Turunkan Harga (Perbaikan Ekonomi)",
                "D. Turunkan Presiden Soekarno",
                "E. Bubarkan ormas-ormas PKI"
            ],
            correct: 3 // D based on provided key and context (D is usually not part of original Tritura)
        },
        {
            id: 6,
            question: "Aksi demonstrasi mahasiswa pada tahun 1966 seringkali disebut sebagai \"Angkatan 66\". Salah satu tokoh mahasiswa yang gugur dalam aksi demonstrasi tersebut dan diberi gelar Pahlawan Ampera adalah...",
            options: [
                "A. Soe Hok Gie",
                "B. Arif Rahman Hakim",
                "C. Cosmas Batubara",
                "D. Akbar Tandjung",
                "E. Emil Salim"
            ],
            correct: 1 // B
        },
        {
            id: 7,
            question: "Puncak dari upaya mengatasi krisis politik pada bulan Maret 1966 adalah dikeluarkannya surat perintah dari Presiden Soekarno kepada Letjen Soeharto. Surat tersebut dikenal dengan singkatan...",
            options: [
                "A. Spri",
                "B. Supersemar",
                "C. Dekrit",
                "D. Nawaksara",
                "E. Jasmerah"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Tujuan utama dikeluarkannya Surat Perintah Sebelas Maret (Supersemar) menurut versi pemerintah Orde Baru adalah...",
            options: [
                "A. Memberikan kekuasaan mutlak kepada Soeharto untuk menjadi Presiden",
                "B. Memerintahkan Soeharto untuk membubarkan DPR-GR",
                "C. Mengambil segala tindakan yang dianggap perlu untuk menjamin keamanan, ketenangan, dan kestabilan pemerintahan",
                "D. Memindahkan ibukota negara dari Jakarta ke Yogyakarta",
                "E. Melakukan konfrontasi militer terhadap negara tetangga"
            ],
            correct: 2 // C
        },
        {
            id: 9,
            question: "Tindakan pertama yang diambil oleh Letjen Soeharto sehari setelah menerima Supersemar (pada tanggal 12 Maret 1966) adalah...",
            options: [
                "A. Menurunkan harga BBM",
                "B. Membubarkan PKI dan ormas-ormasnya",
                "C. Membentuk Kabinet Ampera",
                "D. Menangkap 15 menteri yang terlibat G30S",
                "E. Melantik dirinya menjadi Pejabat Presiden"
            ],
            correct: 1 // B
        },
        {
            id: 10,
            question: "Pada masa transisi 1966-1967, terjadi dualisme kepemimpinan nasional. Yang dimaksud dengan dualisme kepemimpinan tersebut adalah...",
            options: [
                "A. Soekarno sebagai Presiden non-aktif, Soeharto sebagai Perdana Menteri",
                "B. Soekarno sebagai pemimpin pemerintahan, Soeharto sebagai pemimpin militer",
                "C. Soekarno masih menjabat sebagai Presiden, namun kekuasaan pemerintahan dipegang oleh Soeharto selaku pengemban Supersemar",
                "D. Terdapat dua presiden yang sah dalam waktu bersamaan",
                "E. Pemerintahan dijalankan oleh Soekarno dan Hatta secara bersamaan"
            ],
            correct: 2 // C
        },
        {
            id: 11,
            question: "Pidato pertanggungjawaban Presiden Soekarno di depan MPRS yang berjudul \"Nawaksara\" ditolak oleh MPRS karena...",
            options: [
                "A. Terlalu panjang dan bertele-tele",
                "B. Tidak memuat rencana pembangunan ekonomi",
                "C. Tidak menyinggung masalah G30S/PKI dan kemerosotan ekonomi/moral secara jelas",
                "D. Disampaikan dalam bahasa asing",
                "E. Hanya berisi puji-pujian terhadap Orde Lama"
            ],
            correct: 2 // C
        },
        {
            id: 12,
            question: "Tonggak sejarah yang menandai berakhirnya kekuasaan Orde Lama secara resmi dan dimulainya kekuasaan Orde Baru adalah...",
            options: [
                "A. Peristiwa G30S 1965",
                "B. Keluarnya Supersemar 1966",
                "C. Tap MPRS No. XXXIII/MPRS/1967 tentang Pencabutan Kekuasaan Pemerintahan dari Presiden Soekarno",
                "D. Pemilu pertama Orde Baru tahun 1971",
                "E. Meninggalnya Ir. Soekarno pada tahun 1970"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Visi utama pemerintahan Orde Baru dalam bidang politik luar negeri adalah kembali ke politik bebas aktif. Langkah nyata yang dilakukan adalah...",
            options: [
                "A. Keluar dari PBB (Perserikatan Bangsa-Bangsa)",
                "B. Membentuk poros Jakarta-Peking-Pyongyang",
                "C. Masuk kembali menjadi anggota PBB dan menghentikan konfrontasi dengan Malaysia",
                "D. Mendukung blok Barat secara penuh",
                "E. Memutuskan hubungan diplomatik dengan Amerika Serikat"
            ],
            correct: 2 // C
        },
        {
            id: 14,
            question: "Untuk memulihkan stabilitas ekonomi yang hancur, pemerintah Orde Baru mengeluarkan kebijakan penanaman modal yang dituangkan dalam...",
            options: [
                "A. UU No. 1 Tahun 1967 tentang Penanaman Modal Asing (PMA)",
                "B. UU Reformasi Agraria",
                "C. UU Otonomi Daerah",
                "D. UU Perbankan Syariah",
                "E. UU Ketenagakerjaan"
            ],
            correct: 0 // A
        },
        {
            id: 15,
            question: "Salah satu ciri khas sistem pemerintahan Orde Baru adalah kuatnya peran militer dalam pemerintahan sipil. Konsep ini dikenal dengan istilah...",
            options: [
                "A. Militerisme",
                "B. Dwifungsi ABRI",
                "C. Supremasi Sipil",
                "D. Komando Terpusat",
                "E. Bela Negara"
            ],
            correct: 1 // B
        },
        {
            id: 16,
            question: "Tiga landasan pembangunan nasional yang dicanangkan oleh pemerintah Orde Baru dikenal dengan istilah...",
            options: [
                "A. Trias Politika",
                "B. Catur Karya",
                "C. Trilogi Pembangunan",
                "D. Panca Usaha Tani",
                "E. Sapta Marga"
            ],
            correct: 2 // C
        },
        {
            id: 17,
            question: "Kabinet pertama yang dibentuk oleh Soeharto dengan tugas utama menciptakan stabilitas politik dan ekonomi (Catur Karya) diberi nama...",
            options: [
                "A. Kabinet Kerja",
                "B. Kabinet Dwikora",
                "C. Kabinet Pembangunan",
                "D. Kabinet Ampera",
                "E. Kabinet Reformasi"
            ],
            correct: 3 // D
        },
        {
            id: 18,
            question: "Kesatuan Aksi yang terdiri dari para sarjana yang turut serta dalam aksi demonstrasi menuntut pembubaran PKI disebut...",
            options: [
                "A. KAMI",
                "B. KAPPI",
                "C. KASI",
                "D. KAWI",
                "E. KAPI"
            ],
            correct: 2 // C
        },
        {
            id: 19,
            question: "Makna dari \"Melaksanakan Pancasila secara murni dan konsekuen\" adalah...",
            options: [
                "A. Menjadikan Pancasila sebagai satu-satunya asas bagi semua organisasi massa (Asas Tunggal)",
                "B. Menghapus sila-sila yang tidak sesuai dengan perkembangan zaman",
                "C. Melaksanakan Pancasila tanpa dicampuri oleh paham lain seperti Komunisme",
                "D. Mengganti UUD 1945 dengan konstitusi baru",
                "E. Menjadikan Pancasila sebagai alat oposisi"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Dampak positif awal pemerintahan Orde Baru bagi kehidupan masyarakat adalah...",
            options: [
                "A. Kebebasan pers yang sangat terbuka",
                "B. Menurunnya angka inflasi dan stabilnya harga kebutuhan pokok",
                "C. Munculnya banyak partai politik baru",
                "D. Hilangnya peran militer dalam politik",
                "E. Terhapusnya hutang luar negeri Indonesia"
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
                    <h2>Topik: Lahirnya Pemerintahan Orde Baru</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Lahirnya Orde Baru (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Lahirnya Orde Baru</p>
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