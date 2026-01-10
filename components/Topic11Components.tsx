import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessTerpimpin: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Bayangkan sebuah kelas yang sangat gaduh...",
        "Semua orang berteriak, berebut menjadi ketua, tidak ada aturan.",
        "Sekarang, bayangkan satu sosok pemimpin masuk dan memukul meja.",
        "HENING. Semua diam dan menunduk patuh.",
        "Tarik napas... rasakan ketenangan, namun juga tekanan otoritas.",
        "Itulah suasana peralihan dari Demokrasi Liberal ke Terpimpin."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-red shadow-[0_0_30px_rgba(190,18,60,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-gavel text-history-red text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-history-red text-history-red px-8 py-2 rounded-full hover:bg-history-red hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MASUK ERA TERPIMPIN
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: THE GREAT LEADER'S BALANCE (NASAKOM) ---
export const NasakomSimulation: React.FC = () => {
    const [stats, setStats] = useState({ tni: 50, pki: 50, economy: 50 });
    const [turn, setTurn] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Sebagai Presiden, Anda harus menyeimbangkan kekuatan TNI AD dan PKI sambil menjaga ekonomi agar tidak runtuh.");

    const scenarios = [
        {
            title: "Isu Angkatan Kelima (1965)",
            desc: "PKI mengusulkan agar buruh dan tani dipersenjatai untuk membantu konfrontasi Malaysia (Angkatan Kelima). Petinggi TNI AD menolak keras ide ini karena takut ada tentara tandingan.",
            options: [
                { text: "Setuju usul PKI (Persenjatai Buruh)", effect: { tni: -30, pki: +30, eco: -10 }, msg: "PKI makin kuat dan merasa di atas angin. Jenderal TNI marah besar!" },
                { text: "Tolak usul PKI (Dukung TNI)", effect: { tni: +20, pki: -20, eco: 0 }, msg: "TNI AD lega. PKI merasa dianaktirikan dan mulai memprovokasi masa." },
                { text: "Tunda keputusan (Ulur Waktu)", effect: { tni: -10, pki: -10, eco: 0 }, msg: "Kedua pihak kesal karena ketidaktegasan Anda. Situasi memanas." }
            ]
        },
        {
            title: "Krisis Ekonomi & Inflasi",
            desc: "Inflasi mencapai 600%. Harga beras selangit. Penasihat menyarankan Sanering (Gunting Nilai Uang) atau mencari hutang.",
            options: [
                { text: "Lakukan Sanering (Potong Nilai Uang)", effect: { tni: 0, pki: +10, eco: -40 }, msg: "Rakyat panik! Nilai uang hancur. Ekonomi justru makin lumpuh. Pedagang tutup toko." },
                { text: "Cari Hutang ke Blok Timur (Uni Soviet)", effect: { tni: -10, pki: +20, eco: +10 }, msg: "Ekonomi sedikit terbantu, tapi Indonesia makin condong ke Komunis. Barat memusuhi kita." },
                { text: "Stop Proyek Mercusuar (Hemat)", effect: { tni: +10, pki: -10, eco: +30 }, msg: "Ekonomi membaik, tapi Anda kehilangan wibawa sebagai 'Mercusuar Dunia' di mata internasional." }
            ]
        },
        {
            title: "Konfrontasi Malaysia (Ganyang Malaysia)",
            desc: "Malaysia dianggap boneka Inggris (Nekolim). PKI mendesak 'Ganyang Malaysia'. TNI siap tapi khawatir logistik.",
            options: [
                { text: "Ganyang Malaysia! (Perang Terbuka)", effect: { tni: +10, pki: +30, eco: -50 }, msg: "Nasionalisme membara! Tapi kas negara kosong melompong untuk biaya perang." },
                { text: "Diplomasi Damai", effect: { tni: -10, pki: -40, eco: +20 }, msg: "PKI menuduh Anda lembek terhadap Nekolim. Ekonomi stabil, tapi politik gaduh." }
            ]
        }
    ];

    const handleChoice = (effect: any, msg: string) => {
        const newStats = {
            tni: Math.min(100, Math.max(0, stats.tni + effect.tni)),
            pki: Math.min(100, Math.max(0, stats.pki + effect.pki)),
            economy: Math.min(100, Math.max(0, stats.economy + effect.eco))
        };
        setStats(newStats);
        setMessage(msg);

        if (newStats.tni <= 0 || newStats.pki <= 0 || newStats.economy <= 0) {
            setGameOver(true);
            setMessage("Keseimbangan hancur! Terjadi kudeta atau kebangkrutan negara. Sejarah mencatat kegagalan ini.");
        } else if (turn >= 3) {
            setGameOver(true);
            setMessage("Anda berhasil bertahan di atas tali yang tipis hingga tahun 1965. Namun badai besar (G30S) menanti di depan mata...");
        } else {
            setTurn(turn + 1);
        }
    };

    const resetGame = () => {
        setStats({ tni: 50, pki: 50, economy: 50 });
        setTurn(1);
        setGameOver(false);
        setMessage("Mulai simulasi keseimbangan kekuasaan.");
    };

    const currentScenario = scenarios[turn - 1];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm">Simulasi: The Great Leader's Balance</h3>
                <span className="text-xs text-history-muted">Tahun: {1963 + turn - 1}</span>
            </div>
            
            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Loyalitas TNI</div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${stats.tni < 30 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${stats.tni}%` }}></div>
                        </div>
                        <div className="text-xs mt-1 font-bold">{stats.tni}%</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Dukungan PKI</div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${stats.pki < 30 ? 'bg-red-500' : 'bg-red-600'}`} style={{ width: `${stats.pki}%` }}></div>
                        </div>
                        <div className="text-xs mt-1 font-bold">{stats.pki}%</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded border border-history-muted/20">
                        <div className="text-xs text-history-muted uppercase mb-1">Ekonomi</div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${stats.economy < 30 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${stats.economy}%` }}></div>
                        </div>
                        <div className="text-xs mt-1 font-bold">{stats.economy}%</div>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-[#0a0a0a] rounded border-l-2 border-history-gold text-history-brown italic text-center text-sm">
                    "{message}"
                </div>

                {!gameOver && currentScenario ? (
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
                        <h4 className="text-xl font-bold text-white mb-4">Simulasi Selesai</h4>
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
export const LKPDTopic11: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1
    const [act1Feeling, setAct1Feeling] = useState('');

    // Activity 2
    const [act2Politik, setAct2Politik] = useState('');
    const [act2Ekonomi, setAct2Ekonomi] = useState('');

    // Activity 3
    const [act3Refleksi, setAct3Refleksi] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Investigasi Sejarah - Transisi Demokrasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>Aktivitas 1: Analisis Visual (Mindful)</h3>
                    <p class="instruction">Amati gambar/video Dekrit Presiden yang ditayangkan guru.</p>
                    <p><strong>1. Apa yang kalian rasakan jika berada di situasi saat Dekrit dibacakan? (Tegang/Senang/Bingung?)</strong></p>
                    <div class="answer">${act1Feeling}</div>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Pemecahan Masalah (HOTS & TPACK)</h3>
                    <p class="instruction">Kasus: Indonesia mengalami hiperinflasi hingga 600% pada akhir masa Demokrasi Terpimpin. Namun, di saat yang sama, Presiden Soekarno membangun proyek mercusuar (Stadion GBK, Monas, Hotel Indonesia).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Sudut Pandang</th>
                                <th width="70%">Analisis Kelompok</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Alasan Politik (Proyek Mercusuar)</strong><br/>Apakah keputusan ini dapat dibenarkan secara politik?</td>
                                <td>${act2Politik}</td>
                            </tr>
                            <tr>
                                <td><strong>Alasan Ekonomi (Dampak bagi rakyat)</strong><br/>Bagaimana dampaknya terhadap perut rakyat saat itu?</td>
                                <td>${act2Ekonomi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 3: Refleksi Kritis (Meaningful)</h3>
                    <p><strong>Jika kalian menjadi pemimpin saat itu, apa yang akan kalian pilih:</strong></p>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li>A. Memberi kebebasan penuh (Liberal) tapi negara ribut terus.</li>
                        <li>B. Memimpin dengan keras (Terpimpin) agar negara stabil, tapi kebebasan dibatasi.</li>
                    </ul>
                    <p><strong>Berikan argumenmu!</strong></p>
                    <div class="answer">${act3Refleksi}</div>
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
                    <button onClick={() => window.open('https://forms.gle/WRY4xuvuzPrQ4ZUT7', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 1: Analisis Visual (Mindful)</h4>
                    <p className="text-sm text-history-muted mb-2">Apa yang kalian rasakan jika berada di situasi saat Dekrit Presiden 5 Juli 1959 dibacakan? (Tegang/Senang/Bingung?)</p>
                    <textarea value={act1Feeling} onChange={e => setAct1Feeling(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Jawab di sini..."></textarea>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 2: Pemecahan Masalah (HOTS)</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/3">Sudut Pandang</th>
                                    <th className="p-3 border border-history-gold/10 w-2/3">Analisis Kelompok</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 align-top">
                                        <strong className="text-history-gold block mb-1">Alasan Politik</strong>
                                        (Proyek Mercusuar)
                                    </td>
                                    <td className="p-2 border border-history-gold/10">
                                        <textarea value={act2Politik} onChange={e => setAct2Politik(e.target.value)} className="bg-[#0a0a0a] w-full p-2 h-24 rounded border border-white/10 focus:border-history-gold outline-none" placeholder="Analisis politik..."></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 align-top">
                                        <strong className="text-history-gold block mb-1">Alasan Ekonomi</strong>
                                        (Dampak bagi rakyat)
                                    </td>
                                    <td className="p-2 border border-history-gold/10">
                                        <textarea value={act2Ekonomi} onChange={e => setAct2Ekonomi(e.target.value)} className="bg-[#0a0a0a] w-full p-2 h-24 rounded border border-white/10 focus:border-history-gold outline-none" placeholder="Analisis ekonomi..."></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 3 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-red pl-3 mb-3">Aktivitas 3: Refleksi Kritis (Meaningful)</h4>
                    <p className="text-sm text-history-muted mb-2">Jika kalian menjadi pemimpin saat itu, pilih: <strong>(A)</strong> Bebas tapi ribut (Liberal) atau <strong>(B)</strong> Keras tapi stabil (Terpimpin)? Berikan argumenmu!</p>
                    <textarea value={act3Refleksi} onChange={e => setAct3Refleksi(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-32 text-history-brown focus:border-history-gold outline-none" placeholder="Jawaban kritis..."></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizTerpimpin: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Ciri utama sistem pemerintahan pada masa Demokrasi Liberal (1950-1959) di Indonesia adalah...",
            options: [
                "A. Kekuasaan eksekutif dijalankan oleh Presiden secara mutlak",
                "B. Sering terjadi pergantian kabinet karena adanya mosi tidak percaya",
                "C. Partai politik dibatasi jumlah dan ruang geraknya",
                "D. TNI memiliki peran dominan dalam pemerintahan (Dwifungsi)",
                "E. Stabilitas ekonomi sangat terjaga dengan baik"
            ],
            correct: 1 // B
        },
        {
            id: 2,
            question: "Penyebab utama sering jatuhnya kabinet pada masa Demokrasi Liberal adalah...",
            options: [
                "A. Intervensi asing dalam pemerintahan",
                "B. Presiden terlalu sering mencampuri urusan kabinet",
                "C. Adanya pemberontakan di berbagai daerah yang tidak tertangani",
                "D. Sistem multipartai yang menyebabkan kepentingan partai lebih diutamakan daripada kepentingan negara",
                "E. Rakyat melakukan demonstrasi besar-besaran menolak kebijakan pemerintah"
            ],
            correct: 3 // D
        },
        {
            id: 3,
            question: "Prestasi paling gemilang yang dicapai oleh Kabinet Burhanuddin Harahap adalah...",
            options: [
                "A. Penyelenggaraan Konferensi Asia Afrika (KAA)",
                "B. Penyelenggaraan Pemilihan Umum pertama tahun 1955",
                "C. Pembatalan sepihak hasil Konferensi Meja Bundar (KMB)",
                "D. Penumpasan pemberontakan DI/TII di Jawa Barat",
                "E. Deklarasi Djuanda mengenai batas laut teritorial"
            ],
            correct: 1 // B
        },
        {
            id: 4,
            question: "Tugas utama Badan Konstituante yang terbentuk dari hasil Pemilu 1955 adalah...",
            options: [
                "A. Membentuk kabinet baru yang lebih stabil",
                "B. Menyusun Undang-Undang Dasar baru untuk menggantikan UUDS 1950",
                "C. Mengawasi kinerja Presiden dan Wakil Presiden",
                "D. Menetapkan Garis-Garis Besar Haluan Negara (GBHN)",
                "E. Membubarkan partai politik yang tidak sejalan dengan pemerintah"
            ],
            correct: 1 // B
        },
        {
            id: 5,
            question: "Latar belakang utama dikeluarkannya Dekrit Presiden 5 Juli 1959 adalah...",
            options: [
                "A. Kegagalan Konstituante dalam menyusun UUD baru yang berlarut-larut",
                "B. Desakan dari negara-negara Blok Barat untuk mengubah sistem pemerintahan",
                "C. Keinginan Presiden Soekarno untuk menjadi raja",
                "D. Tekanan dari PKI untuk membubarkan Masyumi",
                "E. Keberhasilan pembangunan ekonomi yang membutuhkan stabilitas politik"
            ],
            correct: 0 // A
        },
        {
            id: 6,
            question: "Berikut ini yang bukan merupakan isi dari Dekrit Presiden 5 Juli 1959 adalah...",
            options: [
                "A. Pembubaran Konstituante",
                "B. Berlakunya kembali UUD 1945",
                "C. Tidak berlakunya UUDS 1950",
                "D. Pembubaran Partai Komunis Indonesia (PKI)",
                "E. Pembentukan MPRS dan DPAS"
            ],
            correct: 3 // D
        },
        {
            id: 7,
            question: "Pada masa Demokrasi Terpimpin, tafsir \"Terpimpin\" menurut Presiden Soekarno seharusnya dipimpin oleh...",
            options: [
                "A. Kekuatan militer yang solid",
                "B. Hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
                "C. Kehendak tunggal seorang Presiden",
                "D. Partai politik pemenang pemilu",
                "E. Kepentingan ekonomi rakyat jelata"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Salah satu penyimpangan konstitusional yang terjadi pada masa Demokrasi Terpimpin terhadap UUD 1945 adalah...",
            options: [
                "A. Presiden membentuk kabinet kerja",
                "B. Pengangkatan Presiden Soekarno sebagai Presiden Seumur Hidup",
                "C. Indonesia menjadi tuan rumah Asian Games 1962",
                "D. Presiden membubarkan PKI",
                "E. Pelaksanaan politik luar negeri bebas aktif"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Konsep politik yang digagas Presiden Soekarno untuk menyatukan tiga kekuatan ideologi besar di Indonesia pada masa Demokrasi Terpimpin disebut...",
            options: [
                "A. Trisakti",
                "B. Manipol USDEK",
                "C. Nawakarsa",
                "D. Nasakom",
                "E. Panca Azimat Revolusi"
            ],
            correct: 3 // D
        },
        {
            id: 10,
            question: "Tindakan Presiden Soekarno membubarkan DPR hasil Pemilu 1955 dan menggantinya dengan DPR-GR disebabkan oleh...",
            options: [
                "A. DPR menolak rancangan APBN yang diajukan pemerintah",
                "B. DPR didominasi oleh partai oposisi yang radikal",
                "C. Masa jabatan anggota DPR sudah habis",
                "D. DPR terbukti terlibat dalam korupsi besar-besaran",
                "E. Permintaan rakyat melalui demonstrasi jalanan"
            ],
            correct: 0 // A
        },
        {
            id: 11,
            question: "Arah politik luar negeri Indonesia pada masa Demokrasi Terpimpin cenderung condong ke...",
            options: [
                "A. Blok Barat (Amerika Serikat dan sekutunya)",
                "B. Blok Timur (Negara-negara Komunis)",
                "C. Gerakan Non-Blok murni",
                "D. Negara-negara Skandinavia",
                "E. Negara-negara Persemakmuran Inggris"
            ],
            correct: 1 // B
        },
        {
            id: 12,
            question: "Istilah yang digunakan Presiden Soekarno untuk menyebut negara-negara barat yang dianggap imperialis dan kolonialis adalah...",
            options: [
                "A. NEFO (New Emerging Forces)",
                "B. OLDEFO (Old Established Forces)",
                "C. Nekolim",
                "D. Poros Jakarta-Peking",
                "E. Vivere Pericoloso"
            ],
            correct: 1 // B
        },
        {
            id: 13,
            question: "Alasan utama Indonesia memutuskan keluar dari keanggotaan PBB pada tanggal 7 Januari 1965 adalah...",
            options: [
                "A. PBB menolak memberikan bantuan ekonomi kepada Indonesia",
                "B. Diterimanya Malaysia sebagai anggota tidak tetap Dewan Keamanan PBB",
                "C. PBB didominasi oleh negara-negara komunis",
                "D. Indonesia ingin mendirikan organisasi tandingan PBB sendirian",
                "E. PBB gagal menyelesaikan sengketa Irian Barat"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Kebijakan konfrontasi \"Ganyang Malaysia\" dilatarbelakangi oleh pandangan Presiden Soekarno bahwa pembentukan Federasi Malaysia adalah...",
            options: [
                "A. Upaya memajukan ekonomi Asia Tenggara",
                "B. Proyek Neokolonialisme Inggris yang membahayakan revolusi Indonesia",
                "C. Bentuk persahabatan antara bangsa serumpun",
                "D. Strategi untuk membendung pengaruh komunis di Asia",
                "E. Upaya Malaysia untuk merebut wilayah Kalimantan"
            ],
            correct: 1 // B
        },
        {
            id: 15,
            question: "Untuk mengatasi inflasi yang sangat tinggi (hiperinflasi), pemerintah pada tahun 1959 melakukan kebijakan Sanering, yaitu...",
            options: [
                "A. Mencetak uang baru sebanyak-banyaknya",
                "B. Meminjam dana dari IMF",
                "C. Menasionalisasi perusahaan asing",
                "D. Memotong nilai mata uang kertas (misal Rp 1000 menjadi Rp 100)",
                "E. Menurunkan harga barang kebutuhan pokok secara paksa"
            ],
            correct: 3 // D
        },
        {
            id: 16,
            question: "Proyek pembangunan monumen dan gedung-gedung megah seperti Monas dan Gelora Bung Karno pada masa ekonomi sulit disebut sebagai...",
            options: [
                "A. Politik Etis",
                "B. Politik Mercusuar",
                "C. Politik Balas Budi",
                "D. Revolusi Hijau",
                "E. Pembangunan Lima Tahun"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Dampak negatif dari kebijakan Politik Mercusuar terhadap kondisi ekonomi Indonesia adalah...",
            options: [
                "A. Meningkatnya devisa negara dari pariwisata",
                "B. Menurunnya angka pengangguran secara drastis",
                "C. Habisnya kas negara yang memicu inflasi semakin parah",
                "D. Masuknya investasi asing dalam jumlah besar",
                "E. Terpenuhinya kebutuhan sandang dan pangan rakyat"
            ],
            correct: 2 // C
        },
        {
            id: 18,
            question: "Perbedaan mendasar peran partai politik pada masa Demokrasi Liberal dan Demokrasi Terpimpin adalah...",
            options: [
                "A. Pada masa Liberal partai dibatasi, pada masa Terpimpin partai sangat bebas",
                "B. Pada masa Liberal partai sangat dominan menentukan pemerintahan, pada masa Terpimpin peran partai dikerdilkan kecuali PKI",
                "C. Pada masa Liberal tidak ada pemilu, pada masa Terpimpin ada pemilu rutin",
                "D. Pada masa Liberal partai hanya satu (tunggal), pada masa Terpimpin banyak partai",
                "E. Tidak ada perbedaan peran partai di kedua masa tersebut"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Pada tanggal 28 Maret 1963, pemerintah mengeluarkan Deklarasi Ekonomi (Dekon) dengan tujuan...",
            options: [
                "A. Menciptakan ekonomi yang bersifat nasional, demokratis, dan bebas dari sisa imperialisme",
                "B. Menyerahkan seluruh aset negara kepada pihak swasta",
                "C. Membuka pintu investasi asing seluas-luasnya dari Blok Barat",
                "D. Menghapus peran koperasi dalam perekonomian",
                "E. Mengganti mata uang Rupiah dengan Dollar"
            ],
            correct: 0 // A
        },
        {
            id: 20,
            question: "Akhir dari masa Demokrasi Terpimpin ditandai dengan peristiwa besar yang mengubah peta politik Indonesia, yaitu...",
            options: [
                "A. Keluarnya Dekrit Presiden",
                "B. Penyelenggaraan KAA di Bandung",
                "C. Peristiwa Gerakan 30 September 1965 (G30S)",
                "D. Kembalinya Indonesia ke PBB",
                "E. Perundingan New York tentang Irian Barat"
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
                    <h2>Topik: Demokrasi Terpimpin (1959-1965)</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Demokrasi Terpimpin (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Demokrasi Terpimpin</p>
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