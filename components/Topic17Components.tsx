import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS COMPONENT ---
export const MindfulnessDampak: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Mari duduk dengan nyaman...",
        "Bayangkan sebuah negara yang baru bangkit dari pembungkaman panjang.",
        "Tarik napas... rasakan kebebasan berbicara yang kita nikmati hari ini.",
        "Hembuskan... lepaskan ego, karena demokrasi adalah tentang 'Kita', bukan 'Aku'.",
        "Mari belajar sejarah agar kita bijak menggunakan kebebasan ini."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-gold shadow-[0_0_30px_rgba(180,83,9,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-wind text-history-gold text-4xl mb-6 opacity-80 animate-pulse"></i>
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
                    MULAI BELAJAR
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: AGEN PERUBAHAN ---
export const AgentOfChangeSim: React.FC = () => {
    const [stats, setStats] = useState({ democracy: 50, stability: 50 });
    const [turn, setTurn] = useState(0);
    const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'SUMMARY'>('INTRO');
    const [feedback, setFeedback] = useState("");

    const scenarios = [
        {
            title: "Masalah Kebebasan Pers (1999)",
            desc: "Media massa mulai mengkritik pemerintah secara tajam. Pejabat lama menyarankan pemberlakuan kembali izin ketat (SIUPP).",
            options: [
                { 
                    label: "Batasi Media (Kontrol Ketat)", 
                    effect: { dem: -20, stab: +10 }, 
                    msg: "Stabilitas terjaga sementara, tapi rakyat marah karena merasa kembali ke Orde Baru. Demokrasi mundur." 
                },
                { 
                    label: "Bebaskan Media (Cabut SIUPP)", 
                    effect: { dem: +30, stab: -10 }, 
                    msg: "Keputusan Tepat! UU Pers No. 40/1999 lahir. Meski gaduh, ini fondasi demokrasi." 
                }
            ]
        },
        {
            title: "Tuntutan Daerah (2001)",
            desc: "Daerah kaya sumber daya alam mengancam ingin merdeka jika hasil bumi terus disedot pusat. Apa solusinya?",
            options: [
                { 
                    label: "Terapkan Otonomi Daerah", 
                    effect: { dem: +20, stab: +20 }, 
                    msg: "Hebat! Desentralisasi meredam gejolak disintegrasi. Daerah kini bisa mengurus dirinya sendiri." 
                },
                { 
                    label: "Pertahankan Sentralisasi", 
                    effect: { dem: -10, stab: -30 }, 
                    msg: "Bahaya! Ketidakadilan pusat memicu gerakan separatis semakin kuat." 
                }
            ]
        },
        {
            title: "Peran Militer (2004)",
            desc: "Ada usulan agar militer tetap memiliki jatah kursi di DPR tanpa pemilu untuk menjaga keamanan.",
            options: [
                { 
                    label: "Hapus Dwifungsi ABRI", 
                    effect: { dem: +30, stab: +10 }, 
                    msg: "Langkah bersejarah! TNI fokus pertahanan, tidak lagi berpolitik. Supremasi sipil tegak." 
                },
                { 
                    label: "Pertahankan Kursi ABRI", 
                    effect: { dem: -30, stab: 0 }, 
                    msg: "Demokrasi cacat. Rakyat ingin wakil yang dipilih, bukan ditunjuk." 
                }
            ]
        }
    ];

    const handleChoice = (option: any) => {
        const newStats = {
            democracy: Math.min(100, Math.max(0, stats.democracy + option.effect.dem)),
            stability: Math.min(100, Math.max(0, stats.stability + option.effect.stab))
        };
        setStats(newStats);
        setFeedback(option.msg);
        
        if (turn < scenarios.length - 1) {
            setTimeout(() => {
                setTurn(turn + 1);
                setFeedback("");
            }, 2000);
        } else {
            setTimeout(() => setGameState('SUMMARY'), 2000);
        }
    };

    const resetGame = () => {
        setStats({ democracy: 50, stability: 50 });
        setTurn(0);
        setGameState('INTRO');
        setFeedback("");
    };

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl border border-history-gold/20 overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-history-gold/10">
                <h3 className="text-history-gold font-bold uppercase tracking-widest text-sm"><i className="fas fa-gamepad mr-2"></i>Simulasi Transisi</h3>
                <div className="flex gap-4 text-xs font-bold">
                    <span className={stats.democracy > 70 ? "text-green-500" : "text-history-muted"}>Demokrasi: {stats.democracy}%</span>
                    <span className={stats.stability > 70 ? "text-blue-500" : "text-history-muted"}>Stabilitas: {stats.stability}%</span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col justify-center">
                {gameState === 'INTRO' && (
                    <div className="text-center">
                        <i className="fas fa-user-tie text-6xl text-history-muted mb-6 opacity-50"></i>
                        <h3 className="text-2xl font-bold text-white mb-4">Jadilah Agen Perubahan</h3>
                        <p className="text-history-brown mb-8 max-w-xl mx-auto font-light leading-relaxed">
                            Bayangkan kamu adalah penasihat pemerintah di masa transisi 1999. Setiap keputusanmu akan menentukan nasib demokrasi Indonesia.
                        </p>
                        <button onClick={() => setGameState('PLAYING')} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] font-bold uppercase tracking-widest text-xs shadow-lg">
                            Mulai Simulasi
                        </button>
                    </div>
                )}

                {gameState === 'PLAYING' && (
                    <div className="animate-fade-in w-full max-w-2xl mx-auto">
                        {!feedback ? (
                            <>
                                <div className="mb-2 text-center text-xs font-bold text-history-muted uppercase tracking-widest">Skenario {turn + 1}/3</div>
                                <h3 className="text-xl font-bold text-white text-center mb-4">{scenarios[turn].title}</h3>
                                <p className="text-history-muted text-center mb-8 font-light">{scenarios[turn].desc}</p>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    {scenarios[turn].options.map((opt, idx) => (
                                        <button key={idx} onClick={() => handleChoice(opt)} className="p-6 bg-[#262626] border border-history-gold/10 rounded-xl hover:bg-[#0a0a0a] hover:border-history-gold transition group text-left">
                                            <span className="block text-xs font-bold text-history-gold mb-2 uppercase tracking-wide">Pilihan {String.fromCharCode(65+idx)}</span>
                                            <h4 className="text-white font-bold text-md mb-2 group-hover:text-history-gold">{opt.label}</h4>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center animate-fade-in">
                                <h3 className="text-xl font-bold text-history-gold mb-4">Dampak Keputusan</h3>
                                <p className="text-white text-lg font-light italic">"{feedback}"</p>
                                <p className="text-history-muted text-xs mt-4 animate-pulse">Memuat skenario berikutnya...</p>
                            </div>
                        )}
                    </div>
                )}

                {gameState === 'SUMMARY' && (
                    <div className="text-center animate-fade-in">
                        <div className="text-6xl mb-4">🏛️</div>
                        <h3 className="text-2xl font-bold text-history-gold mb-4">Reformasi Berjalan!</h3>
                        <p className="text-history-muted mb-6 max-w-lg mx-auto font-light">
                            Anda berhasil membawa Indonesia melewati masa transisi kritis. Demokrasi dan stabilitas mulai tumbuh beriringan.
                        </p>
                        <button onClick={resetGame} className="border border-white/20 text-white px-8 py-3 rounded hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs transition">
                            Main Lagi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD COMPONENT ---
export const LKPDTopic17: React.FC = () => {
    const [nama, setNama] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));

    // Activity 1
    const [eraReformasi1, setEraReformasi1] = useState(''); const [analisis1, setAnalisis1] = useState('');
    const [eraReformasi2, setEraReformasi2] = useState(''); const [analisis2, setAnalisis2] = useState('');
    const [eraReformasi3, setEraReformasi3] = useState(''); const [analisis3, setAnalisis3] = useState('');

    // Activity 2
    const [problemSolving1, setProblemSolving1] = useState('');
    const [problemSolving2, setProblemSolving2] = useState('');

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
                <div style="text-align:center; margin-bottom: 20px;">Topik: Investigasi Dampak Reformasi</div>
                
                <p><strong>Kelas:</strong> ${kelas}</p>
                <p><strong>Nama Anggota:</strong></p>
                <ol>${memberList}</ol>

                <div class="section">
                    <h3>AKTIVITAS 1: Perbandingan Era (HOTS - Menganalisis)</h3>
                    <p class="instruction">Lengkapi tabel berikut untuk melihat kontras perubahan!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek</th>
                                <th width="25%">Era Orde Baru (Sebelum 1998)</th>
                                <th width="25%">Era Reformasi (Sekarang)</th>
                                <th width="30%">Analisis (Lebih baik/Buruk? Mengapa?)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Kebebasan Pers / Media</td>
                                <td>Media dikontrol ketat, ada pembredelan.</td>
                                <td>${eraReformasi1}</td>
                                <td>${analisis1}</td>
                            </tr>
                            <tr>
                                <td>Pemilihan Pemimpin</td>
                                <td>Presiden dipilih MPR.</td>
                                <td>${eraReformasi2}</td>
                                <td>${analisis2}</td>
                            </tr>
                            <tr>
                                <td>Militer (Dwifungsi ABRI)</td>
                                <td>Militer berpolitik & masuk pemerintahan sipil.</td>
                                <td>${eraReformasi3}</td>
                                <td>${analisis3}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>AKTIVITAS 2: Studi Kasus Kontekstual (Problem Solving)</h3>
                    <p><strong>Kasus:</strong> "Di era Reformasi, banyak pejabat tertangkap KPK. Namun, masih banyak warga yang merasa korupsi semakin merajalela dibanding Orde Baru."</p>
                    
                    <p><strong>1. Menurut kelompokmu, apakah korupsi bertambah banyak, atau penegakan hukumnya yang semakin transparan sehingga banyak yang tertangkap? Jelaskan alasannya!</strong></p>
                    <div class="answer">${problemSolving1}</div>

                    <p style="margin-top:15px;"><strong>2. Sebagai pelajar SMK, tindakan nyata apa yang bisa kalian lakukan untuk mencegah mental korupsi di lingkungan sekolah?</strong></p>
                    <div class="answer">${problemSolving2}</div>
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
                    <button onClick={() => window.open('https://forms.gle/eEwwNv7afj6GWztJ6', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
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
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">AKTIVITAS 1: Perbandingan Era (HOTS)</h4>
                    <p className="text-sm text-history-muted mb-4">Lengkapi tabel berikut untuk melihat kontras perubahan!</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#171717] text-history-brown text-xs text-center">
                                    <th className="p-3 border border-history-gold/10 w-1/4">Aspek</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Era Orde Baru</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Era Reformasi</th>
                                    <th className="p-3 border border-history-gold/10 w-1/4">Analisis</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold">Kebebasan Pers</td>
                                    <td className="p-3 border border-history-gold/10 italic">Media dikontrol ketat, ada pembredelan.</td>
                                    <td className="p-2 border border-history-gold/10"><input value={eraReformasi1} onChange={e => setEraReformasi1(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="..." /></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={analisis1} onChange={e => setAnalisis1(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 h-16" placeholder="..."></textarea></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold">Pemilihan Pemimpin</td>
                                    <td className="p-3 border border-history-gold/10 italic">Presiden dipilih MPR.</td>
                                    <td className="p-2 border border-history-gold/10"><input value={eraReformasi2} onChange={e => setEraReformasi2(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="..." /></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={analisis2} onChange={e => setAnalisis2(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 h-16" placeholder="..."></textarea></td>
                                </tr>
                                <tr>
                                    <td className="p-3 border border-history-gold/10 font-bold">Militer (Dwifungsi)</td>
                                    <td className="p-3 border border-history-gold/10 italic">Militer berpolitik & masuk pemerintahan sipil.</td>
                                    <td className="p-2 border border-history-gold/10"><input value={eraReformasi3} onChange={e => setEraReformasi3(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10" placeholder="..." /></td>
                                    <td className="p-2 border border-history-gold/10"><textarea value={analisis3} onChange={e => setAnalisis3(e.target.value)} className="w-full bg-[#0a0a0a] p-2 rounded text-xs border border-white/10 h-16" placeholder="..."></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Aktivitas 2 */}
                <div className="animate-fade-in">
                    <h4 className="text-lg font-bold text-history-gold border-l-4 border-history-gold pl-3 mb-3">AKTIVITAS 2: Studi Kasus Kontekstual (Problem Solving)</h4>
                    <p className="text-sm text-history-muted mb-4 bg-[#171717] p-3 rounded italic">Kasus: "Di era Reformasi, banyak pejabat tertangkap KPK. Namun, masih banyak warga yang merasa korupsi semakin merajalela dibanding Orde Baru."</p>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">1. Apakah korupsi bertambah banyak, atau penegakan hukumnya yang semakin transparan? Jelaskan!</p>
                            <textarea value={problemSolving1} onChange={e => setProblemSolving1(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Jawabanmu..."></textarea>
                        </div>
                        <div>
                            <p className="text-history-brown text-sm font-bold mb-2">2. Sebagai pelajar SMK, tindakan nyata apa yang bisa kalian lakukan untuk mencegah mental korupsi di sekolah?</p>
                            <textarea value={problemSolving2} onChange={e => setProblemSolving2(e.target.value)} className="w-full bg-[#0a0a0a] border border-history-gold/20 p-3 rounded h-24 text-history-brown focus:border-history-gold outline-none" placeholder="Contoh: Jujur saat ujian..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT (FULL EVALUATION SYSTEM) ---
export const QuizReformasiDampak: React.FC = () => {
    // 20 Questions from PDF "Dampak Reformasi bagi Kehidupan Berbangsa dan Bernegara"
    const questions = [
        {
            id: 1,
            question: "Salah satu penyebab utama runtuhnya pemerintahan Orde Baru pada tahun 1998 adalah krisis multidimensi. Pemicu awal krisis ekonomi yang melanda Indonesia saat itu adalah...",
            options: [
                "A. Kegagalan panen raya di seluruh Indonesia",
                "B. Merosotnya nilai tukar Rupiah terhadap Dolar AS",
                "C. Terjadinya konflik antar etnis di berbagai daerah",
                "D. Penutupan seluruh perusahaan asing di Indonesia",
                "E. Embargo ekonomi oleh PBB"
            ],
            correct: 1 // B
        },
        {
            id: 2,
            question: "Perhatikan agenda Reformasi berikut: 1. Adili Soeharto dan kroninya, 2. Amandemen UUD 1945, 3. Pertahankan Dwifungsi ABRI, 4. Otonomi Daerah seluas-luasnya, 5. Sentralisasi pemerintahan. Agenda Reformasi yang diperjuangkan oleh mahasiswa tahun 1998 ditunjukkan oleh nomor...",
            options: [
                "A. 1, 2, dan 3",
                "B. 1, 2, dan 4",
                "C. 2, 3, dan 4",
                "D. 2, 4, dan 5",
                "E. 3, 4, dan 5"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Salah satu dampak positif Reformasi di bidang politik adalah adanya pembatasan masa jabatan Presiden. Berdasarkan Amandemen UUD 1945 Pasal 7, masa jabatan Presiden dan Wakil Presiden adalah...",
            options: [
                "A. 5 tahun dan boleh dipilih kembali tanpa batas",
                "B. 4 tahun dan boleh dipilih kembali untuk satu kali masa jabatan",
                "C. 5 tahun dan boleh dipilih kembali untuk satu kali masa jabatan",
                "D. Seumur hidup selama rakyat menghendaki",
                "E. 5 tahun dan tidak boleh dipilih kembali"
            ],
            correct: 2 // C
        },
        {
            id: 4,
            question: "Pada masa Orde Baru, pers mengalami pengekangan yang ketat melalui aturan SIUPP. Dampak dari dicabutnya aturan ini pada masa Reformasi adalah...",
            options: [
                "A. Pers menjadi alat propaganda pemerintah sepenuhnya",
                "B. Munculnya kebebasan pers dan menjamurnya media massa baru",
                "C. Wartawan asing dilarang meliput di Indonesia",
                "D. Berita hanya boleh disiarkan oleh TVRI dan RRI",
                "E. Menurunnya minat baca masyarakat terhadap koran"
            ],
            correct: 1 // B
        },
        {
            id: 5,
            question: "Kebijakan Otonomi Daerah diterapkan melalui UU No. 22 Tahun 1999. Tujuan utama dari kebijakan desentralisasi ini adalah...",
            options: [
                "A. Memusatkan seluruh kekayaan daerah ke Jakarta",
                "B. Memberikan kewenangan kepada daerah untuk mengatur rumah tangganya sendiri",
                "C. Memisahkan diri dari Negara Kesatuan Republik Indonesia",
                "D. Mengurangi beban kerja Presiden agar lebih santai",
                "E. Menghapus peran Gubernur sebagai wakil pemerintah pusat"
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Meskipun Otonomi Daerah memiliki tujuan mulia, dalam pelaksanaannya sering menimbulkan dampak negatif yang dikenal dengan istilah \"Raja-raja Kecil\". Makna dari istilah tersebut adalah...",
            options: [
                "A. Munculnya kerajaan-kerajaan tradisional baru di daerah",
                "B. Bupati/Walikota yang bersikap otoriter dan membangun dinasti politik",
                "C. Kepala Desa yang menolak dana desa dari pusat",
                "D. Gubernur yang memiliki pasukan militer sendiri",
                "E. Wakil rakyat daerah yang tidak mau digaji"
            ],
            correct: 1 // B
        },
        {
            id: 7,
            question: "Penghapusan Dwifungsi ABRI merupakan salah satu tuntutan Reformasi. Dampak langsung dari kebijakan ini bagi institusi militer adalah...",
            options: [
                "A. TNI diperbolehkan menjadi anggota partai politik",
                "B. TNI kembali ke jati dirinya sebagai tentara profesional penjaga pertahanan",
                "C. TNI mengambil alih tugas kepolisian dalam menjaga ketertiban",
                "D. Anggota TNI aktif boleh menjabat sebagai Gubernur atau Bupati",
                "E. Pembubaran seluruh komando teritorial di daerah"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Pemisahan antara TNI dan POLRI pada masa Reformasi bertujuan agar...",
            options: [
                "A. POLRI fokus pada pertahanan negara dari serangan luar",
                "B. TNI fokus pada keamanan dan ketertiban masyarakat (Kamtibmas)",
                "C. TNI fokus pada pertahanan, sedangkan POLRI fokus pada keamanan dan penegakan hukum",
                "D. Anggaran negara bisa dihemat dengan menggabungkan markas",
                "E. Menghilangkan persaingan senjata antar angkatan"
            ],
            correct: 2 // C
        },
        {
            id: 9,
            question: "Reformasi membawa perubahan besar bagi kehidupan sosial etnis Tionghoa di Indonesia. Salah satu buktinya adalah dicabutnya Inpres No. 14/1967 dan ditetapkannya Imlek sebagai hari libur nasional. Hal ini menunjukkan bahwa Reformasi menjunjung tinggi nilai...",
            options: [
                "A. Eksklusivitas golongan",
                "B. Dominasi mayoritas",
                "C. Pluralisme dan HAM",
                "D. Sentralisasi budaya",
                "E. Asimilasi paksa"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Pemilihan Umum (Pemilu) tahun 2004 merupakan tonggak sejarah baru dalam demokrasi Indonesia karena...",
            options: [
                "A. Diikuti oleh 48 partai politik",
                "B. Rakyat memilih Presiden dan Wakil Presiden secara langsung untuk pertama kalinya",
                "C. Presiden dipilih kembali oleh MPR melalui voting",
                "D. Tidak ada partai oposisi dalam parlemen",
                "E. Menggunakan sistem noken di seluruh Indonesia"
            ],
            correct: 1 // B
        },
        {
            id: 11,
            question: "Kebebasan berpendapat di era Reformasi seringkali disalahgunakan. Salah satu tantangan terbesar di era digital saat ini terkait kebebasan berpendapat adalah...",
            options: [
                "A. Kurangnya akses internet di perkotaan",
                "B. Mahalnya biaya kuota data bagi pelajar",
                "C. Menyebarnya berita bohong (hoax) dan ujaran kebencian",
                "D. Pemerintah melarang penggunaan media sosial",
                "E. Tidak adanya undang-undang yang mengatur internet"
            ],
            correct: 2 // C
        },
        {
            id: 12,
            question: "Istilah \"Supremasi Hukum\" yang didengungkan pada masa Reformasi mengandung arti...",
            options: [
                "A. Hukum hanya berlaku bagi rakyat kecil",
                "B. Pejabat negara kebal terhadap hukum",
                "C. Hukum menjadi kekuasaan tertinggi dan berlaku adil bagi semua warga negara",
                "D. Hukum dapat dibeli oleh mereka yang memiliki uang",
                "E. Presiden memiliki kekuasaan di atas hukum"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Lembaga baru yang dibentuk pada masa Reformasi untuk memberantas tindak pidana korupsi secara luar biasa adalah...",
            options: [
                "A. Komnas HAM",
                "B. KPU (Komisi Pemilihan Umum)",
                "C. KPK (Komisi Pemberantasan Korupsi)",
                "D. KY (Komisi Yudisial)",
                "E. MK (Mahkamah Konstitusi)"
            ],
            correct: 2 // C
        },
        {
            id: 14,
            question: "Perbedaan mendasar sistem pemerintahan masa Orde Baru dan masa Reformasi terletak pada...",
            options: [
                "A. Orde Baru sentralistik, Reformasi desentralistik",
                "B. Orde Baru demokratis, Reformasi otoriter",
                "C. Orde Baru parlementer, Reformasi presidensial",
                "D. Orde Baru liberal, Reformasi terpimpin",
                "E. Orde Baru komunis, Reformasi kapitalis"
            ],
            correct: 0 // A
        },
        {
            id: 15,
            question: "Tragedi Trisakti pada 12 Mei 1998 yang menewaskan empat mahasiswa menjadi pemicu kemarahan massa yang lebih besar. Peristiwa ini menunjukkan peran mahasiswa sebagai...",
            options: [
                "A. Agent of Change (Agen Perubahan) dan kontrol sosial",
                "B. Kelompok yang ingin menguasai pemerintahan",
                "C. Alat politik partai oposisi",
                "D. Pembuat keonaran di jalan raya",
                "E. Kelompok yang anti terhadap pembangunan"
            ],
            correct: 0 // A
        },
        {
            id: 16,
            question: "Amandemen UUD 1945 dilakukan sebanyak empat kali dari tahun 1999 hingga 2002. Tujuan utama amandemen ini adalah...",
            options: [
                "A. Mengganti dasar negara Pancasila",
                "B. Menyempurnakan aturan dasar agar sesuai dengan perkembangan demokrasi dan HAM",
                "C. Memperpanjang masa jabatan presiden",
                "D. Menghapus peran MPR sebagai lembaga negara",
                "E. Menjadikan Indonesia negara serikat"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Dampak ekonomi dari Reformasi yang belum sepenuhnya teratasi hingga saat ini adalah...",
            options: [
                "A. Kelangkaan bahan pokok di seluruh daerah",
                "B. Nilai tukar rupiah yang masih fluktuatif dan utang luar negeri",
                "C. Tidak adanya investasi asing yang masuk",
                "D. Hilangnya sistem perbankan nasional",
                "E. Monopoli cengkeh dan terigu"
            ],
            correct: 1 // B
        },
        {
            id: 18,
            question: "Dalam kehidupan berbangsa, Reformasi membuka ruang bagi penyelesaian konflik di daerah seperti Aceh dan Papua. Pendekatan yang lebih diutamakan di era Reformasi adalah...",
            options: [
                "A. Pendekatan Operasi Militer (DOM)",
                "B. Pendekatan dialogis dan otonomi khusus",
                "C. Pembiaran konflik agar selesai sendiri",
                "D. Penangkapan seluruh tokoh adat",
                "E. Isolasi daerah konflik dari dunia luar"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Sebagai seorang pelajar SMK, cara terbaik memaknai Reformasi di lingkungan sekolah adalah dengan...",
            options: [
                "A. Melakukan demonstrasi menolak PR dari guru",
                "B. Bebas membolos karena itu adalah hak asasi",
                "C. Memilih ketua OSIS secara demokratis dan transparan",
                "D. Mengkritik guru dengan kata-kata kasar di media sosial",
                "E. Membentuk geng sekolah untuk menjaga keamanan"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Salah satu dampak negatif dari sistem multipartai di era Reformasi adalah...",
            options: [
                "A. Rakyat bingung memilih karena terlalu sedikit partai",
                "B. Pemerintahan menjadi sangat stabil tanpa gangguan",
                "C. Sering terjadi kegaduhan politik dan koalisi yang rapuh",
                "D. Semua partai memiliki ideologi yang sama persis",
                "E. Presiden dapat membubarkan partai politik sesuka hati"
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
                    <h2>Topik: Dampak Reformasi bagi Kehidupan Berbangsa dan Bernegara</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Dampak Reformasi (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Dampak Reformasi bagi Kehidupan Berbangsa dan Bernegara</p>
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