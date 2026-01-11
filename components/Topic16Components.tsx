import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessDemokrasiBaru: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Duduklah dengan nyaman...",
        "Bayangkan sebuah kotak suara di hadapanmu.",
        "Dulu, kotak ini hanya formalitas. Sekarang, ia adalah penentu masa depan.",
        "Tarik napas... rasakan kebebasan untuk memilih pemimpinmu sendiri.",
        "Hembuskan... lepaskan ketakutan akan intimidasi.",
        "Demokrasi bukan tujuan akhir, tapi jalan untuk kesejahteraan bersama."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-blue-400 shadow-[0_0_30px_rgba(96,165,250,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-vote-yea text-blue-400 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-blue-400 text-blue-400 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-[#0a0a0a] transition font-bold text-xs uppercase tracking-[0.2em]"
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

// --- SIMULATION: KURSI KEPRESIDENAN ---
export const PresidentialSimulator: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'fail' | null, msg: string }>({ type: null, msg: '' });
    const [score, setScore] = useState(0);

    const scenarios = [
        {
            president: "Gus Dur (1999-2001)",
            context: "Warga Tionghoa ingin merayakan Imlek secara terbuka, namun Inpres No 14/1967 (Orba) melarangnya. Kelompok konservatif menekan Anda.",
            choices: [
                { text: "Cabut Inpres tersebut (Kebebasan Budaya)", isCorrect: true, feedback: "Bapak Pluralisme! Anda mengajarkan bangsa ini arti toleransi. Imlek kini menjadi hari libur nasional." },
                { text: "Pertahankan larangan demi stabilitas", isCorrect: false, feedback: "Diskriminasi berlanjut. Semangat reformasi untuk kesetaraan warga negara gagal Anda wujudkan." }
            ]
        },
        {
            president: "Megawati (2001-2004)",
            context: "Korupsi masih merajalela pasca Orde Baru. Rakyat menuntut lembaga yang super kuat (Superbody) untuk memberantas maling uang rakyat.",
            choices: [
                { text: "Serahkan pada Polisi dan Jaksa saja", isCorrect: false, feedback: "Kurang efektif. Lembaga lama dinilai masih kotor. Korupsi sulit diberantas." },
                { text: "Dirikan KPK (Komisi Pemberantasan Korupsi)", isCorrect: true, feedback: "Langkah bersejarah! KPK menjadi lembaga yang paling ditakuti koruptor di tahun-tahun mendatang." }
            ]
        },
        {
            president: "Susilo Bambang Yudhoyono (2004-2014)",
            context: "Konflik GAM di Aceh sudah berlangsung puluhan tahun. Pasca Tsunami 2004, ada momentum untuk damai. Tapi syarat GAM berat (Otonomi Khusus).",
            choices: [
                { text: "Lanjutkan Darurat Militer", isCorrect: false, feedback: "Perang berlanjut. Korban jiwa bertambah. Anggaran negara habis untuk peluru." },
                { text: "Sepakati Perjanjian Helsinki (Damai)", isCorrect: true, feedback: "Damai di Serambi Mekkah. Aceh tetap dalam NKRI dengan otonomi khusus. Prestasi emas diplomasi!" }
            ]
        }
    ];

    const handleAnswer = (isCorrect: boolean, msg: string) => {
        setFeedback({ type: isCorrect ? 'success' : 'fail', msg });
        if (isCorrect) setScore(score + 1);
    };

    const nextLevel = () => {
        setFeedback({ type: null, msg: '' });
        setCurrentLevel(currentLevel + 1);
    };

    const resetGame = () => {
        setCurrentLevel(0);
        setScore(0);
        setFeedback({ type: null, msg: '' });
    };

    if (currentLevel >= scenarios.length) {
        return (
            <div className="bg-[#171717] p-8 rounded-xl text-center border border-history-gold/30 animate-fade-in">
                <div className="text-6xl mb-4">🇮🇩</div>
                <h3 className="text-2xl font-bold text-history-gold mb-2">Simulasi Selesai</h3>
                <p className="text-history-muted mb-6">Skor Keputusan Anda: {score}/{scenarios.length}</p>
                <p className="text-history-brown italic font-light mb-6">
                    "Setiap masa ada orangnya, setiap orang ada masanya. Terima kasih telah belajar menjadi pemimpin."
                </p>
                <button onClick={resetGame} className="bg-history-brown text-[#0a0a0a] px-6 py-2 rounded font-bold uppercase tracking-widest text-xs hover:bg-white transition">
                    Main Lagi
                </button>
            </div>
        );
    }

    const currentData = scenarios[currentLevel];

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-user-tie mr-2"></i>Kursi Kepresidenan</h3>
                <span className="text-xs text-history-muted font-bold">Skenario {currentLevel + 1}/{scenarios.length}</span>
            </div>
            
            <div className="p-8">
                <h4 className="text-xl font-bold text-white mb-2">{currentData.president}</h4>
                <p className="text-history-muted mb-8 leading-relaxed font-light border-l-2 border-blue-500 pl-4 bg-[#0a0a0a] p-3 rounded-r">
                    {currentData.context}
                </p>

                {!feedback.type ? (
                    <div className="grid gap-4">
                        {currentData.choices.map((choice, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleAnswer(choice.isCorrect, choice.feedback)}
                                className="w-full text-left p-4 bg-[#262626] border border-white/5 rounded hover:border-history-gold hover:bg-[#0a0a0a] transition group"
                            >
                                <span className="text-history-gold font-bold mr-2 group-hover:text-white">Op. {String.fromCharCode(65+idx)}</span>
                                <span className="text-history-brown text-sm">{choice.text}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center animate-fade-in">
                        <div className={`p-6 rounded mb-6 border ${feedback.type === 'success' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                            <h5 className={`font-bold text-lg mb-2 ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {feedback.type === 'success' ? 'Keputusan Tepat!' : 'Kurang Tepat'}
                            </h5>
                            <p className="text-white font-light text-sm">{feedback.msg}</p>
                        </div>
                        <button onClick={nextLevel} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#c5a028] transition shadow-lg">
                            Lanjut <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic16: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1: Investigation
    const [presName, setPresName] = useState('');
    const [polPolicy, setPolPolicy] = useState('');
    const [ecoPolicy, setEcoPolicy] = useState('');
    const [challenge, setChallenge] = useState('');
    const [relevance, setRelevance] = useState('');
    const [sourceInfo, setSourceInfo] = useState('');

    // Activity 2: Reflection
    const [reflection1, setReflection1] = useState('');
    const [reflection2, setReflection2] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Analisis Komparatif Corak Pemerintahan Reformasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>B. Tabel Investigasi (TPACK Integration)</h3>
                    <p class="instruction">Analisis salah satu Presiden pada masa Reformasi (Habibie, Gus Dur, Megawati, SBY, atau Jokowi).</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Aspek Analisis</th>
                                <th width="45%">Temuan Data / Fakta Sejarah</th>
                                <th width="25%">Sumber Informasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Nama Presiden & Periode</strong></td>
                                <td>${presName}</td>
                                <td rowspan="5">${sourceInfo}</td>
                            </tr>
                            <tr>
                                <td><strong>Kebijakan Politik Utama</strong><br/>(Misal: UU baru, Kebebasan Pers, Hubungan Luar Negeri)</td>
                                <td>${polPolicy}</td>
                            </tr>
                            <tr>
                                <td><strong>Kebijakan Ekonomi</strong><br/>(Misal: Nilai tukar, Harga BBM, Utang, Pembangunan)</td>
                                <td>${ecoPolicy}</td>
                            </tr>
                            <tr>
                                <td><strong>Tantangan / Masalah Terbesar</strong><br/>yang dihadapi saat menjabat</td>
                                <td>${challenge}</td>
                            </tr>
                            <tr>
                                <td><strong>Relevansi (Gen Z)</strong><br/>Apa kebijakan beliau yang masih terasa efeknya bagi Gen Z hari ini?</td>
                                <td>${relevance}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>C. Pertanyaan Refleksi Kritis (HOTS)</h3>
                    <p><strong>1. Jika kalian hidup di masa pemerintahan presiden tersebut, apakah kalian akan mendukung kebijakannya? Mengapa?</strong></p>
                    <div class="answer">${reflection1}</div>
                    
                    <p style="margin-top:15px;"><strong>2. Bandingkan dengan satu presiden lain (diskusikan dengan kelompok sebelah), mana yang menurut kalian paling berhasil menegakkan demokrasi? Jelaskan alasannya!</strong></p>
                    <div class="answer">${reflection2}</div>
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
                    <button onClick={() => window.open('https://forms.gle/z5tdKULn4ty2XfjA7', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">B. Tabel Investigasi (TPACK)</h4>
                    <p className="text-sm text-history-muted mb-4">Diskusikan mengenai salah satu tokoh Presiden Reformasi.</p>
                    
                    <div className="bg-[#171717] p-6 rounded-xl space-y-4 border border-white/5">
                        <div>
                            <label className="text-white text-xs font-bold uppercase mb-1 block">Nama Presiden & Periode</label>
                            <input value={presName} onChange={e => setPresName(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10" placeholder="Contoh: B.J. Habibie (1998-1999)" />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-white text-xs font-bold uppercase mb-1 block">Kebijakan Politik</label>
                                <textarea value={polPolicy} onChange={e => setPolPolicy(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-24" placeholder="UU baru, Kebebasan Pers..."></textarea>
                            </div>
                            <div>
                                <label className="text-white text-xs font-bold uppercase mb-1 block">Kebijakan Ekonomi</label>
                                <textarea value={ecoPolicy} onChange={e => setEcoPolicy(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-24" placeholder="Nilai tukar, Harga BBM..."></textarea>
                            </div>
                        </div>

                        <div>
                            <label className="text-white text-xs font-bold uppercase mb-1 block">Tantangan Terbesar</label>
                            <textarea value={challenge} onChange={e => setChallenge(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-16" placeholder="Masalah utama saat menjabat..."></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-history-gold text-xs font-bold uppercase mb-1 block">Relevansi (Gen Z)</label>
                                <textarea value={relevance} onChange={e => setRelevance(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-20" placeholder="Apa efek kebijakannya bagi Gen Z?"></textarea>
                            </div>
                            <div>
                                <label className="text-history-gold text-xs font-bold uppercase mb-1 block">Sumber Informasi</label>
                                <textarea value={sourceInfo} onChange={e => setSourceInfo(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-sm text-history-brown border border-white/10 h-20" placeholder="Link berita/Buku..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">C. Refleksi Kritis (HOTS)</h4>
                    <div className="space-y-4">
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">1. Jika kalian hidup di masa pemerintahan presiden tersebut, apakah kalian akan mendukung kebijakannya? Mengapa?</p>
                            <textarea value={reflection1} onChange={e => setReflection1(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none"></textarea>
                        </div>
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">2. Bandingkan dengan satu presiden lain, mana yang menurut kalian paling berhasil menegakkan demokrasi? Jelaskan alasannya!</p>
                            <textarea value={reflection2} onChange={e => setReflection2(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizDemokrasiBaru: React.FC = () => {
    // 20 Questions from PDF "Dinamika Politik dan Ekonomi Indonesia Masa Reformasi"
    const questions = [
        {
            id: 1,
            question: "Reformasi di Indonesia secara resmi dimulai pada tanggal 21 Mei 1998. Peristiwa monumental yang menandai awal masa ini adalah...",
            options: [
                "A. Terjadinya Tragedi Trisakti",
                "B. Mundurnya Soeharto dari jabatan Presiden",
                "C. Didudukinya gedung DPR/MPR oleh mahasiswa",
                "D. Naiknya nilai tukar Rupiah terhadap Dollar",
                "E. Pelaksanaan Sidang Istimewa MPR"
            ],
            correct: 1 // B
        },
        {
            id: 2,
            question: "Pada masa pemerintahan B.J. Habibie, salah satu kebijakan fundamental yang mengubah wajah demokrasi Indonesia secara drastis adalah...",
            options: [
                "A. Pembatasan jumlah partai politik peserta pemilu",
                "B. Penerapan Dwi Fungsi ABRI yang lebih ketat",
                "C. Kebebasan pers melalui UU No. 40 Tahun 1999",
                "D. Pembubaran Departemen Penerangan dan Departemen Sosial",
                "E. Pembangunan infrastruktur jalan tol secara masif"
            ],
            correct: 2 // C
        },
        {
            id: 3,
            question: "Pemerintahan B.J. Habibie sering disebut sebagai masa transisi. Salah satu keputusan paling kontroversial namun dianggap demokratis yang diambil pada masa ini adalah...",
            options: [
                "A. Menjual aset BUMN strategis",
                "B. Membubarkan departemen sosial",
                "C. Memberikan otonomi khusus pada Aceh",
                "D. Melaksanakan referendum untuk Timor Timur",
                "E. Mengembalikan mandat kepada MPR"
            ],
            correct: 3 // D
        },
        {
            id: 4,
            question: "Dalam bidang ekonomi, keberhasilan utama pemerintahan B.J. Habibie di tengah krisis moneter adalah...",
            options: [
                "A. Melunasi seluruh utang luar negeri Indonesia",
                "B. Mencetak uang baru dalam jumlah besar",
                "C. Menurunkan harga BBM ke level terendah",
                "D. Menguatkan nilai tukar Rupiah dari Rp16.000 menjadi kisaran Rp6.500 per USD",
                "E. Memutus hubungan kerja sama dengan IMF"
            ],
            correct: 3 // D
        },
        {
            id: 5,
            question: "Presiden Abdurrahman Wahid (Gus Dur) dikenal sebagai Bapak Pluralisme. Salah satu kebijakan beliau yang sangat membekas bagi masyarakat minoritas adalah...",
            options: [
                "A. Menetapkan agama Konghucu sebagai agama resmi dan mencabut larangan perayaan Imlek",
                "B. Membangun tempat ibadah di setiap sekolah negeri",
                "C. Mewajibkan pendidikan agama bagi seluruh siswa",
                "D. Membubarkan organisasi keagamaan radikal",
                "E. Menjadikan hari raya semua agama sebagai hari libur internasional"
            ],
            correct: 0 // A
        },
        {
            id: 6,
            question: "Gaya kepemimpinan Gus Dur cenderung informal dan sering menabrak tatanan protokoler. Langkah politik beliau yang memicu konflik dengan parlemen hingga berujung pada pemakzulan adalah...",
            options: [
                "A. Mengeluarkan Dekrit Presiden yang salah satunya berisi pembubaran DPR/MPR",
                "B. Mengangkat menteri dari kalangan non-partai",
                "C. Melakukan kunjungan luar negeri yang terlalu sering",
                "D. Mengganti nama Irian Jaya menjadi Papua",
                "E. Meminta maaf kepada korban peristiwa 1965"
            ],
            correct: 0 // A
        },
        {
            id: 7,
            question: "Pada masa pemerintahan Presiden Megawati Soekarnoputri, upaya serius pemberantasan korupsi ditandai dengan didirikannya sebuah lembaga independen, yaitu...",
            options: [
                "A. Kejaksaan Agung",
                "B. Badan Pemeriksa Keuangan (BPK)",
                "C. Indonesia Corruption Watch (ICW)",
                "D. Komisi Pemberantasan Korupsi (KPK)",
                "E. Ombudsman Republik Indonesia"
            ],
            correct: 3 // D
        },
        {
            id: 8,
            question: "Salah satu kebijakan ekonomi pada masa pemerintahan Megawati yang menuai kritik tajam dan masih diperdebatkan hingga kini adalah...",
            options: [
                "A. Pemberian Bantuan Langsung Tunai (BLT)",
                "B. Penjualan saham BUMN Indosat",
                "C. Pembangunan bandara internasional",
                "D. Pembubaran Bulog",
                "E. Kenaikan gaji pegawai negeri sipil secara signifikan"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Pemilu tahun 2004 merupakan tonggak sejarah baru dalam demokrasi Indonesia yang terjadi pada akhir masa jabatan Megawati. Keistimewaan Pemilu 2004 adalah...",
            options: [
                "A. Diikuti oleh lebih dari 100 partai politik",
                "B. Menggunakan sistem e-voting untuk pertama kalinya",
                "C. Rakyat memilih Presiden dan Wakil Presiden secara langsung (one man one vote)",
                "D. Presiden dipilih kembali oleh MPR melalui voting tertutup",
                "E. Tidak adanya kampanye terbuka"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Susilo Bambang Yudhoyono (SBY) mencatatkan sejarah sebagai presiden pertama yang...",
            options: [
                "A. Berasal dari kalangan militer",
                "B. Dipilih langsung oleh rakyat dan menjabat selama dua periode penuh",
                "C. Mengundurkan diri sebelum masa jabatannya habis",
                "D. Membubarkan parlemen melalui dekrit",
                "E. Tidak memiliki wakil presiden di tengah masa jabatan"
            ],
            correct: 1 // B
        },
        {
            id: 11,
            question: "Prestasi terbesar pemerintahan SBY dalam bidang keamanan dan kesatuan bangsa adalah keberhasilannya menyelesaikan konflik berkepanjangan di Aceh melalui...",
            options: [
                "A. Operasi Militer Terpadu",
                "B. Perjanjian Linggarjati",
                "C. Perjanjian Helsinki (MoU Helsinki)",
                "D. Referendum kemerdekaan",
                "E. Pemberian status Daerah Istimewa Yogyakarta"
            ],
            correct: 2 // C
        },
        {
            id: 12,
            question: "Dalam bidang sosial-ekonomi, pemerintahan SBY meluncurkan program bantuan bersyarat untuk keluarga miskin guna menjaga daya beli masyarakat di tengah kenaikan harga BBM, yang dikenal dengan nama...",
            options: [
                "A. Kredit Usaha Rakyat (KUR)",
                "B. Bantuan Operasional Sekolah (BOS)",
                "C. Bantuan Langsung Tunai (BLT)",
                "D. Kartu Indonesia Sehat (KIS)",
                "E. Program Keluarga Harapan (PKH)"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Presiden Joko Widodo (Jokowi) memiliki fokus pembangunan yang berbeda dari pendahulunya. Istilah \"Indonesia Sentris\" pada masa Jokowi bermakna...",
            options: [
                "A. Pembangunan dipusatkan kembali di pulau Jawa",
                "B. Pembangunan infrastruktur dilakukan merata hingga ke luar Jawa (Papua, Kalimantan, Sulawesi)",
                "C. Pembangunan hanya berfokus pada kota-kota besar",
                "D. Pemusatan kekuasaan politik di tangan presiden",
                "E. Sentralisasi anggaran daerah ke pemerintah pusat"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Salah satu proyek strategis nasional terbesar pada masa pemerintahan Joko Widodo yang bertujuan memindahkan pusat pemerintahan adalah...",
            options: [
                "A. Pembangunan Jembatan Suramadu",
                "B. Proyek Kereta Cepat Jakarta-Bandung",
                "C. Pembangunan Ibu Kota Nusantara (IKN)",
                "D. Reklamasi Teluk Jakarta",
                "E. Pembangunan Tol Trans Jawa"
            ],
            correct: 2 // C
        },
        {
            id: 15,
            question: "Di bawah pemerintahan Joko Widodo, pemerintah gencar melakukan hilirisasi industri. Tujuan utama dari kebijakan pelarangan ekspor bijih nikel mentah adalah...",
            options: [
                "A. Mengurangi pencemaran lingkungan akibat tambang",
                "B. Meningkatkan nilai tambah komoditas di dalam negeri",
                "C. Memenuhi permintaan pasar nikel di Eropa",
                "D. Menutup perusahaan tambang asing",
                "E. Menghemat cadangan nikel untuk masa depan"
            ],
            correct: 1 // B
        },
        {
            id: 16,
            question: "Perhatikan ciri-ciri berikut: 1. Kebebasan pers sangat dibatasi, 2. Sentralisasi kekuasaan di pusat, 3. Stabilitas keamanan menjadi prioritas utama, 4. Peran militer sangat dominan (Dwi Fungsi ABRI). Ciri-ciri di atas menggambarkan kondisi politik Indonesia pada masa...",
            options: [
                "A. Orde Lama",
                "B. Orde Baru",
                "C. Reformasi Awal",
                "D. Demokrasi Liberal",
                "E. Demokrasi Terpimpin"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Perbedaan mendasar sistem pemerintahan masa Orde Baru dengan masa Reformasi terletak pada...",
            options: [
                "A. Masa jabatan presiden; Orde Baru tidak dibatasi, Reformasi dibatasi maksimal 2 periode",
                "B. Lambang negara; Orde Baru menggunakan Garuda, Reformasi menggunakan Bendera",
                "C. Ideologi negara; Orde Baru Pancasila, Reformasi Liberalisme",
                "D. Bentuk negara; Orde Baru Serikat, Reformasi Kesatuan",
                "E. Sistem ekonomi; Orde Baru Kapitalis, Reformasi Sosialis"
            ],
            correct: 0 // A
        },
        {
            id: 18,
            question: "Gerakan Reformasi 1998 dimotori oleh mahasiswa yang menuntut \"6 Agenda Reformasi\". Berikut ini yang bukan termasuk agenda tersebut adalah...",
            options: [
                "A. Adili Soeharto dan kroni-kroninya",
                "B. Amandemen UUD 1945",
                "C. Penghapusan Dwi Fungsi ABRI",
                "D. Otonomi Daerah seluas-luasnya",
                "E. Kembali ke UUD 1945 yang asli (tanpa amandemen)"
            ],
            correct: 4 // E
        },
        {
            id: 19,
            question: "Dampak negatif yang muncul akibat euforia kebebasan di era Reformasi, khususnya terkait media sosial saat ini adalah...",
            options: [
                "A. Meningkatnya partisipasi politik pemula",
                "B. Munculnya jurnalisme warga",
                "C. Maraknya penyebaran berita bohong (hoax) dan ujaran kebencian",
                "D. Kemudahan akses informasi pemerintahan",
                "E. Transparansi anggaran negara"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Tujuan utama dilakukannya Amandemen UUD 1945 pada masa awal Reformasi adalah...",
            options: [
                "A. Mengganti ideologi Pancasila",
                "B. Memperpanjang masa jabatan presiden seumur hidup",
                "C. Menyempurnakan aturan dasar agar lebih demokratis dan mencegah penyalahgunaan kekuasaan",
                "D. Memberikan kekuasaan mutlak kepada MPR",
                "E. Menghapus peran partai politik dalam pemerintahan"
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
                    <h2>Topik: Dinamika Politik dan Ekonomi Indonesia Masa Reformasi</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Dinamika Reformasi (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Dinamika Politik dan Ekonomi Reformasi</p>
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