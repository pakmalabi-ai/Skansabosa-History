import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 7 ---
export const MindfulnessIntegrasi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Ambil posisi duduk yang nyaman...",
        "Sadari bahwa kita hidup di negara kepulauan yang sangat beragam.",
        "Tarik napas... rasakan kedamaian persatuan yang kita nikmati hari ini.",
        "Hembuskan... lepaskan ego dan kebencian yang bisa memecah belah.",
        "Bayangkan betapa mahalnya harga sebuah keutuhan bangsa.",
        "Mari belajar dari sejarah agar perpecahan tidak terulang kembali."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-hands-helping text-blue-500 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-blue-500 text-blue-500 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    JAGA NKRI
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: MISI PENYELAMAT NKRI ---
export const NkriRescueSimulation: React.FC = () => {
    const [level, setLevel] = useState(0);
    const [feedback, setFeedback] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won'>('playing');

    const missions = [
        {
            title: "Misi 1: Ancaman Ideologi (1948)",
            desc: "Laporan Intelijen: Di Madiun, kelompok Musso memproklamirkan 'Republik Soviet Indonesia'. Mereka menolak Pancasila. Situasi genting, pejabat dibunuh.",
            hint: "Ini adalah pemberontakan PKI Madiun.",
            options: [
                { text: "Kirim tim negosiasi damai", result: "error", feedback: "Gagal! Musso menolak berunding. Korban terus berjatuhan." },
                { text: "Operasi Militer (Divisi Siliwangi)", result: "success", feedback: "Tepat! Pasukan Siliwangi di bawah Gatot Subroto berhasil merebut kembali Madiun dalam 12 hari." },
                { text: "Biarkan saja, nanti bubar sendiri", result: "error", feedback: "Fatal! Ideologi komunis menyebar cepat. NKRI terancam bubar." }
            ]
        },
        {
            title: "Misi 2: Konflik Kepentingan (1950)",
            desc: "Laporan Intelijen: Kapten Andi Aziz menolak kedatangan pasukan TNI (APRIS) ke Makassar. Ia menyandera Panglima Teritorium Indonesia Timur.",
            hint: "Masalah penolakan mantan pasukan KNIL terhadap TNI.",
            options: [
                { text: "Berikan Ultimatum 4x24 Jam", result: "success", feedback: "Sukses! Pemerintah tegas. Andi Aziz terlambat melapor dan akhirnya ditangkap." },
                { text: "Angkat Andi Aziz jadi Jenderal", result: "error", feedback: "Salah! Ini melanggar disiplin militer dan merusak wibawa negara." },
                { text: "Minta bantuan Belanda", result: "error", feedback: "Bahaya! Ini mengundang penjajah kembali mencampuri urusan kita." }
            ]
        },
        {
            title: "Misi 3: Pergolakan Daerah (1958)",
            desc: "Laporan Intelijen: Muncul PRRI di Sumatera dan Permesta di Sulawesi. Mereka kecewa pada pembangunan pusat dan membentuk dewan daerah.",
            hint: "Masalah ketimpangan sistem pemerintahan pusat-daerah.",
            options: [
                { text: "Tangkap semua kepala daerah", result: "error", feedback: "Terlalu gegabah. Ini memicu perang saudara berkepanjangan." },
                { text: "Operasi Militer & Diplomasi (Amnesti)", result: "success", feedback: "Benar! Operasi 17 Agustus dikerahkan secara militer, disusul pemberian amnesti (pengampunan) bagi yang kembali ke pangkuan Ibu Pertiwi." }
            ]
        }
    ];

    const handleChoice = (option: { text: string, result: string, feedback: string }) => {
        if (option.result === 'success') {
            setFeedback({ msg: option.feedback, type: 'success' });
        } else {
            setFeedback({ msg: option.feedback, type: 'error' });
        }
    };

    const nextLevel = () => {
        setFeedback(null);
        if (level < missions.length - 1) {
            setLevel(level + 1);
        } else {
            setGameStatus('won');
        }
    };

    const resetGame = () => {
        setLevel(0);
        setFeedback(null);
        setGameStatus('playing');
    };

    if (gameStatus === 'won') {
        return (
            <div className="bg-[#171717] p-8 rounded-xl border border-history-gold text-center animate-fade-in">
                <div className="text-6xl mb-4">🇮🇩</div>
                <h3 className="text-2xl font-bold text-history-gold uppercase mb-2">Misi Selesai: NKRI Utuh!</h3>
                <p className="text-history-muted mb-6">Anda berhasil mengatasi ancaman disintegrasi bangsa dengan keputusan yang tepat.</p>
                <button onClick={resetGame} className="bg-history-brown text-[#0a0a0a] px-6 py-2 rounded font-bold uppercase tracking-widest text-xs hover:bg-white">Main Lagi</button>
            </div>
        );
    }

    const currentMission = missions[level];

    return (
        <div className="max-w-4xl mx-auto bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20 flex flex-col md:flex-row min-h-[450px]">
            {/* Left Panel: Intel */}
            <div className="md:w-1/3 bg-[#0a0a0a] p-6 border-r border-history-gold/10 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
                <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center">
                    <i className="fas fa-user-secret mr-2"></i> Dokumen Rahasia
                </h4>
                <div className="bg-[#171717] p-4 rounded border border-history-gold/10 mb-4">
                    <span className="text-xs text-history-muted block mb-1">Status:</span>
                    <span className="text-history-brown font-mono text-sm font-bold">DARURAT MILITER</span>
                </div>
                <div className="text-xs text-history-muted leading-relaxed">
                    <p className="mb-2"><strong>Level {level + 1}/{missions.length}</strong></p>
                    <p>{currentMission.hint}</p>
                </div>
            </div>

            {/* Right Panel: Action */}
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-history-gold mb-2 font-sans">{currentMission.title}</h3>
                <p className="text-history-brown mb-8 font-light leading-relaxed">{currentMission.desc}</p>

                {!feedback ? (
                    <div className="space-y-3">
                        {currentMission.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChoice(opt as any)}
                                className="w-full text-left p-4 border border-history-gold/10 rounded hover:bg-[#262626] hover:border-history-gold transition text-sm text-history-muted hover:text-white group"
                            >
                                <span className="font-bold mr-2 text-history-gold group-hover:text-white">{String.fromCharCode(65 + idx)}.</span> {opt.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="animate-fade-in text-center">
                        <div className={`p-4 rounded mb-6 border ${feedback.type === 'success' ? 'bg-green-900/20 border-green-600 text-green-400' : 'bg-red-900/20 border-red-600 text-red-400'}`}>
                            <i className={`fas fa-${feedback.type === 'success' ? 'check-circle' : 'times-circle'} text-2xl mb-2 block`}></i>
                            <p className="font-bold text-sm mb-1">{feedback.type === 'success' ? 'KEPUTUSAN TEPAT' : 'KEPUTUSAN SALAH'}</p>
                            <p className="text-xs opacity-90">{feedback.msg}</p>
                        </div>
                        {feedback.type === 'success' ? (
                            <button onClick={nextLevel} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#c5a028]">
                                {level < missions.length - 1 ? "Misi Selanjutnya" : "Selesaikan"}
                            </button>
                        ) : (
                            <button onClick={() => setFeedback(null)} className="bg-[#262626] text-white px-6 py-2 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#404040]">
                                Coba Lagi
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 7 ---
export const LKPDTopic7: React.FC = () => {
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(6).fill(''));
    
    // Task 1 Fields
    const [t1Peristiwa, setT1Peristiwa] = useState('');
    const [t1Penyebab, setT1Penyebab] = useState('');
    const [t1Tokoh, setT1Tokoh] = useState('');
    const [t1Penyelesaian, setT1Penyelesaian] = useState('');

    // Task 2 Field
    const [t2Refleksi, setT2Refleksi] = useState('');

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
                <title>LKPD - Investigasi Sejarah Disintegrasi</title>
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
                <div class="sub-header">Topik: Investigasi Sejarah Disintegrasi Bangsa</div>
                
                <div class="header-info">
                    <table style="border: none;">
                        <tr style="border: none;"><td style="border: none; width: 100px;"><strong>Kelas</strong></td><td style="border: none;">: ${kelas}</td></tr>
                    </table>
                    <div class="members-list">
                        <strong>Nama Anggota:</strong>
                        <ol>
                            ${memberList || '<li>.......................................</li><li>.......................................</li><li>.......................................</li>'}
                        </ol>
                    </div>
                </div>

                <div class="section">
                    <h3>Petunjuk Kerja:</h3>
                    <ol style="font-size: 14px;">
                        <li>Scan QR Code / Buka Link materi yang diberikan guru.</li>
                        <li>Diskusikan pertanyaan di bawah ini dengan semangat <strong>Gotong Royong</strong>.</li>
                        <li>Gunakan referensi yang valid (buku paket/artikel terpercaya).</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>TUGAS 1: Analisis Kasus (Pilih salah satu: PKI Madiun / DI TII / PRRI)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th width="30%">Aspek Analisis</th>
                                <th width="70%">Jawaban Hasil Diskusi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Apa peristiwanya?</strong></td>
                                <td>${t1Peristiwa}</td>
                            </tr>
                            <tr>
                                <td><strong>Mengapa terjadi? (Akar Masalah)</strong><br/><br/><span style="font-size:12px;font-style:italic;">Jelaskan apakah karena Ideologi, Kepentingan, atau Sistem?</span></td>
                                <td>${t1Penyebab}</td>
                            </tr>
                            <tr>
                                <td><strong>Siapa tokoh kuncinya?</strong><br/><br/><span style="font-size:12px;font-style:italic;">Sebutkan tokoh pemberontak dan tokoh penumpasnya.</span></td>
                                <td>${t1Tokoh}</td>
                            </tr>
                            <tr>
                                <td><strong>Bagaimana penyelesaiannya?</strong><br/><br/><span style="font-size:12px;font-style:italic;">Operasi militer atau diplomasi? Jelaskan.</span></td>
                                <td>${t1Penyelesaian}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>TUGAS 2: Refleksi Kritis (HOTS)</h3>
                    <p class="instruction">"Jika kalian hidup di masa itu sebagai pemuda, apa yang akan kalian lakukan untuk mencegah perpecahan tersebut? Dan bagaimana cara kalian mencegah hal serupa (perpecahan) terjadi di kelas atau sekolah kalian saat ini?"</p>
                    <div class="answer-box">${t2Refleksi}</div>
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
                    <button onClick={() => window.open('https://forms.gle/miER7sH786UMqh4s9', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div>
                    <label className="block text-history-gold text-xs font-bold uppercase mb-2">Kelas</label>
                    <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Contoh: XI TKJ 2" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
                </div>
                <div>
                    <label className="block text-history-gold text-xs font-bold uppercase tracking-wide mb-2">Nama Anggota (Maks 6)</label>
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

            <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-history-gold mb-10">
                <h4 className="font-bold text-history-gold mb-3 text-sm uppercase tracking-wide">Petunjuk Kerja:</h4>
                <ol className="list-decimal pl-5 text-sm text-history-muted space-y-2">
                    <li>Scan QR Code / Buka Link materi yang diberikan guru.</li>
                    <li>Diskusikan pertanyaan di bawah ini dengan semangat <strong>Gotong Royong</strong>.</li>
                    <li>Gunakan referensi yang valid (buku paket/artikel terpercaya).</li>
                </ol>
            </div>

            <div className="space-y-8 animate-fade-in">
                {/* TUGAS 1 */}
                <div>
                    <h4 className="text-history-gold text-sm font-bold uppercase mb-4 border-l-4 border-blue-500 pl-3">TUGAS 1: Analisis Kasus (Pilih salah satu topik undian: PKI Madiun / DI TII / PRRI)</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-history-gold/20">
                            <thead>
                                <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                    <th className="p-4 border border-history-gold/20 w-1/3">Aspek Analisis</th>
                                    <th className="p-4 border border-history-gold/20 w-2/3">Jawaban Hasil Diskusi</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-history-muted">
                                <tr className="bg-[#171717]">
                                    <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Apa peristiwanya?</td>
                                    <td className="p-2 border border-history-gold/20">
                                        <input value={t1Peristiwa} onChange={e => setT1Peristiwa(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded border border-history-muted/20 text-history-brown outline-none focus:border-history-gold" placeholder="Contoh: Pemberontakan G30S/PKI..." />
                                    </td>
                                </tr>
                                <tr className="bg-[#0a0a0a]">
                                    <td className="p-4 border border-history-gold/20 align-top">
                                        <strong className="text-history-gold block mb-1">Mengapa terjadi? (Akar Masalah)</strong>
                                        <span className="text-xs italic opacity-70">Jelaskan apakah karena Ideologi, Kepentingan, atau Sistem?</span>
                                    </td>
                                    <td className="p-2 border border-history-gold/20">
                                        <textarea value={t1Penyebab} onChange={e => setT1Penyebab(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold" placeholder="Analisis penyebab..."></textarea>
                                    </td>
                                </tr>
                                <tr className="bg-[#171717]">
                                    <td className="p-4 border border-history-gold/20 align-top">
                                        <strong className="text-history-gold block mb-1">Siapa tokoh kuncinya?</strong>
                                        <span className="text-xs italic opacity-70">Sebutkan tokoh pemberontak dan tokoh penumpasnya.</span>
                                    </td>
                                    <td className="p-2 border border-history-gold/20">
                                        <textarea value={t1Tokoh} onChange={e => setT1Tokoh(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold" placeholder="Sebutkan tokoh..."></textarea>
                                    </td>
                                </tr>
                                <tr className="bg-[#0a0a0a]">
                                    <td className="p-4 border border-history-gold/20 align-top">
                                        <strong className="text-history-gold block mb-1">Bagaimana penyelesaiannya?</strong>
                                        <span className="text-xs italic opacity-70">Operasi militer atau diplomasi? Jelaskan.</span>
                                    </td>
                                    <td className="p-2 border border-history-gold/20">
                                        <textarea value={t1Penyelesaian} onChange={e => setT1Penyelesaian(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold" placeholder="Jelaskan penyelesaiannya..."></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TUGAS 2 */}
                <div>
                    <h4 className="text-history-gold text-sm font-bold uppercase mb-4 border-l-4 border-blue-500 pl-3">TUGAS 2: Refleksi Kritis (HOTS)</h4>
                    <p className="text-history-muted text-sm mb-3 italic">
                        "Jika kalian hidup di masa itu sebagai pemuda, apa yang akan kalian lakukan untuk mencegah perpecahan tersebut? Dan bagaimana cara kalian mencegah hal serupa (perpecahan) terjadi di kelas atau sekolah kalian saat ini?"
                    </p>
                    <textarea value={t2Refleksi} onChange={e => setT2Refleksi(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-32 outline-none focus:border-history-gold" placeholder="Tuliskan refleksimu..."></textarea>
                </div>
            </div>
        </div>
    );
};

// --- QUIZ TOPIC 7 ---
export const QuizIntegrasi: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Pemberontakan PKI Madiun 1948 bertujuan untuk...",
            options: ["Mendirikan negara Islam", "Mengganti Pancasila dengan Komunis (Republik Soviet Indonesia)", "Memisahkan diri dari NKRI karena masalah ekonomi", "Mempertahankan negara federal"],
            answerIndex: 1
        },
        {
            question: "Konflik yang berkaitan dengan 'Vested Interest' (Kepentingan) terutama menyangkut status pasukan...",
            options: ["PETA", "KNIL", "TKR", "Heiho"],
            answerIndex: 1
        },
        {
            question: "Gerakan PRRI dan Permesta pada dasarnya adalah bentuk...",
            options: ["Koreksi daerah terhadap pemerintah pusat yang dianggap tidak adil", "Keinginan mendirikan negara komunis", "Serangan dari pihak asing", "Konflik agama"],
            answerIndex: 0
        },
        {
            question: "Tokoh pahlawan integrasi dari Papua yang mempopulerkan nama 'Irian' adalah...",
            options: ["Silas Papare", "Frans Kaisiepo", "Marthen Indey", "Johannes Leimena"],
            answerIndex: 1
        },
        {
            question: "Operasi militer untuk menumpas DI/TII di Jawa Barat dengan melibatkan rakyat disebut...",
            options: ["Operasi Pagar Betis", "Operasi 17 Agustus", "Operasi Merdeka", "Operasi Sadar"],
            answerIndex: 0
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
                <p className="mb-6 text-history-muted italic font-light">{score >= 80 ? "Hebat! Anda memahami pentingnya integrasi bangsa." : "Pelajari lagi materi tentang konflik dan integrasi."}</p>
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