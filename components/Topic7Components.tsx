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

// --- QUIZ TOPIC 7 (FULL EVALUATION SYSTEM) ---
export const QuizIntegrasi: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Pergolakan di dalam negeri yang terjadi pada kurun waktu 1948–1965 dapat dikategorikan ke dalam tiga corak berdasarkan latar belakangnya. Berikut ini yang termasuk pergolakan yang berkaitan dengan ideologi adalah ....",
            options: [
                "A. APRA dan Andi Aziz",
                "B. RMS dan PRRI",
                "C. PKI Madiun dan DI/TII",
                "D. PRRI dan Permesta",
                "E. BFO dan Negara Federal"
            ],
            correct: 2 // C based on key
        },
        {
            id: 2,
            question: "Pemberontakan PKI Madiun tahun 1948 dipimpin oleh Musso yang baru saja kembali dari Moskow. Tujuan utama dari pemberontakan ini adalah ....",
            options: [
                "A. Menuntut otonomi daerah yang lebih luas",
                "B. Mempertahankan bentuk negara federal",
                "C. Mengganti dasar negara Pancasila dengan Komunisme",
                "D. Menolak kedatangan tentara Belanda ke Jawa Timur",
                "E. Mengusir pasukan Divisi Siliwangi dari Jawa Tengah"
            ],
            correct: 2 // C based on key
        },
        {
            id: 3,
            question: "Latar belakang munculnya pemberontakan DI/TII di Jawa Barat yang dipimpin oleh S.M. Kartosuwiryo adalah ....",
            options: [
                "A. Kekecewaan terhadap isi Perjanjian Renville yang mengharuskan TNI hijrah",
                "B. Penolakan terhadap pembubaran Negara Pasundan",
                "C. Ketidakpuasan terhadap alokasi dana pembangunan pusat",
                "D. Keinginan untuk memisahkan diri dari RIS dan membentuk negara sendiri",
                "E. Menolak masuknya pasukan APRIS dari unsur KNIL"
            ],
            correct: 0 // A based on key
        },
        {
            id: 4,
            question: "Meskipun sama-sama bertujuan mendirikan Negara Islam Indonesia (NII), pemicu pemberontakan DI/TII di Aceh yang dipimpin oleh Daud Beureueh berbeda dengan di Jawa Barat. Faktor utama pemicu di Aceh adalah ....",
            options: [
                "A. Masalah otonomi militer bagi laskar pejuang",
                "B. Penurunan status Provinsi Aceh menjadi Karesidenan",
                "C. Penolakan terhadap ideologi Pancasila secara radikal",
                "D. Adanya intervensi asing dari negara tetangga",
                "E. Persaingan antar elit politik lokal di Sumatera"
            ],
            correct: 1 // B based on key
        },
        {
            id: 5,
            question: "Istilah Vested Interest dalam konflik sejarah Indonesia merujuk pada adanya kepentingan yang tertanam kuat pada suatu kelompok. Kelompok pemberontak yang timbul akibat masalah ini umumnya berkaitan dengan keberadaan pasukan ....",
            options: [
                "A. TNI (Tentara Nasional Indonesia)",
                "B. PETA (Pembela Tanah Air)",
                "C. Laskar Rakyat",
                "D. KNIL (Koninklijk Nederlandsch-Indische Leger)",
                "E. TKR (Tentara Keamanan Rakyat)"
            ],
            correct: 3 // D based on key
        },
        {
            id: 6,
            question: "Kapten Raymond Westerling memimpin gerakan APRA (Angkatan Perang Ratu Adil) di Bandung pada tahun 1950. Strategi psikologis yang digunakan Westerling untuk menarik simpati rakyat adalah ....",
            options: [
                "A. Menjanjikan pembagian tanah gratis",
                "B. Memanfaatkan mitos Ratu Adil yang akan membawa kemakmuran",
                "C. Menyebarkan isu bahwa TNI akan bertindak kejam",
                "D. Membagikan bantuan logistik makanan kepada rakyat miskin",
                "E. Mengkampanyekan anti-komunis secara masif"
            ],
            correct: 1 // B based on key (Key says 2. B, assumed row based from PDF)
        },
        {
            id: 7,
            question: "Peristiwa Andi Aziz di Makassar bermula dari tuntutan kapten Andi Aziz agar ....",
            options: [
                "A. Negara Indonesia Timur (NIT) segera dibubarkan",
                "B. Pemerintah pusat memberikan otonomi khusus bagi Sulawesi",
                "C. Hanya pasukan APRIS dari unsur KNIL yang bertanggung jawab atas keamanan di NIT",
                "D. Ia diangkat menjadi Menteri Pertahanan RIS",
                "E. Pasukan TNI dari Jawa segera dikirim untuk membantu keamanan"
            ],
            correct: 2 // C based on key
        },
        {
            id: 8,
            question: "Gerakan Republik Maluku Selatan (RMS) yang dipimpin oleh Dr. Soumokil dapat dikategorikan sebagai gerakan separatisme karena ....",
            options: [
                "A. Ingin mengganti ideologi negara",
                "B. Ingin memisahkan diri dari NKRI dan membentuk negara merdeka",
                "C. Menolak kebijakan ekonomi pemerintah pusat",
                "D. Hanya menuntut pergantian kepala daerah",
                "E. Berusaha menggulingkan pemerintahan Soekarno"
            ],
            correct: 1 // B based on key
        },
        {
            id: 9,
            question: "Pergolakan PRRI (Pemerintah Revolusioner Republik Indonesia) dan Permesta (Perjuangan Rakyat Semesta) pada dasarnya disebabkan oleh ....",
            options: [
                "A. Keinginan mendirikan negara agama",
                "B. Intervensi asing dari blok Barat dan Timur",
                "C. Kekecewaan prajurit KNIL yang akan dibubarkan",
                "D. Hubungan yang tidak harmonis antara pusat dan daerah terkait pemerataan pembangunan",
                "E. Ambisi para perwira militer untuk menjadi presiden"
            ],
            correct: 3 // D based on key
        },
        {
            id: 10,
            question: "Dalam menumpas pemberontakan PRRI/Permesta, pemerintah melancarkan operasi militer gabungan. Salah satu operasi terbesar untuk menumpas PRRI di Sumatera Barat disebut ....",
            options: [
                "A. Operasi Pagar Betis",
                "B. Operasi Baratayudha",
                "C. Operasi 17 Agustus",
                "D. Operasi Tegas",
                "E. Operasi Merdeka"
            ],
            correct: 2 // C based on key
        },
        {
            id: 11,
            question: "Frans Kaisiepo adalah salah satu tokoh integrasi yang berasal dari Papua. Salah satu peran penting beliau adalah ....",
            options: [
                "A. Memimpin perang gerilya di hutan Sulawesi",
                "B. Mengusulkan nama \"Irian\" yang berarti Ikut Republik Indonesia Anti Nederland",
                "C. Menyumbangkan hartanya untuk modal kemerdekaan RI",
                "D. Menjadi delegasi Indonesia dalam KMB di Den Haag",
                "E. Membentuk laskar wanita untuk melawan Belanda"
            ],
            correct: 1 // B based on key
        },
        {
            id: 12,
            question: "Sri Sultan Hamengkubuwono IX memiliki peran vital dalam menjaga keutuhan NKRI di awal kemerdekaan. Tindakan heroik beliau yang paling monumental adalah ....",
            options: [
                "A. Memimpin pertempuran 10 November di Surabaya",
                "B. Menyatakan Kesultanan Yogyakarta sebagai bagian dari RI",
                "C. Menolak kedatangan pasukan Sekutu di Jawa Tengah",
                "D. Menjadi perantara perundingan Linggarjati",
                "E. Membubarkan partai-partai politik yang radikal"
            ],
            correct: 1 // B based on key
        },
        {
            id: 13,
            question: "Silas Papare membentuk Komite Indonesia Merdeka (KIM) dengan tujuan ....",
            options: [
                "A. Mengumpulkan dana untuk perjuangan di Jawa",
                "B. Menghimpun kekuatan rakyat Papua untuk mempertahankan kemerdekaan Indonesia",
                "C. Melakukan diplomasi dengan pemerintah Belanda di Jayapura",
                "D. Membentuk pemerintahan pelarian di Australia",
                "E. Menyusun strategi perang gerilya di Maluku"
            ],
            correct: 1 // B based on key
        },
        {
            id: 14,
            question: "Salah satu tokoh perempuan yang mendapat gelar Pahlawan Nasional karena keberaniannya melawan Belanda di Sulawesi Selatan dan rela kehilangan pendengarannya akibat penyiksaan adalah ....",
            options: [
                "A. Cut Nyak Dien",
                "B. Opu Daeng Risaju",
                "C. Rasuna Said",
                "D. Laksamana Malahayati",
                "E. Maria Walanda Maramis"
            ],
            correct: 1 // B based on key
        },
        {
            id: 15,
            question: "Hikmah yang bisa diambil dari peristiwa pemberontakan G30S/PKI bagi kehidupan berbangsa dan bernegara saat ini adalah ....",
            options: [
                "A. Perlunya memperkuat militer di setiap daerah",
                "B. Pentingnya kewaspadaan terhadap ideologi yang bertentangan dengan Pancasila",
                "C. Melarang semua bentuk organisasi masyarakat",
                "D. Mengisolasi diri dari pengaruh budaya asing",
                "E. Menghapus sejarah kelam dari kurikulum sekolah"
            ],
            correct: 1 // B based on key
        },
        {
            id: 16,
            question: "Perhatikan data berikut: 1. Menyerang kota Bandung, 2. Menguasai Madiun, 3. Menculik pejabat militer, 4. Memproklamasikan Negara Islam. Manakah yang merupakan tindakan yang dilakukan oleh kelompok PKI Madiun 1948?",
            options: [
                "A. 1 dan 2",
                "B. 2 dan 3",
                "C. 1 dan 4",
                "D. 2 dan 4",
                "E. 3 dan 4"
            ],
            correct: 1 // B based on key
        },
        {
            id: 17,
            question: "Pemerintah menggunakan cara diplomasi dan operasi militer dalam menumpas pemberontakan. Kasus pemberontakan mana yang awalnya dicoba diselesaikan dengan mengirimkan misi damai (Dr. Leimena) namun gagal?",
            options: [
                "A. PKI Madiun",
                "B. DI/TII Jawa Barat",
                "C. Republik Maluku Selatan (RMS)",
                "D. APRA",
                "E. G30S/PKI"
            ],
            correct: 2 // C based on key
        },
        {
            id: 18,
            question: "Ancaman disintegrasi bangsa saat ini tidak lagi berupa pemberontakan bersenjata, melainkan dalam bentuk lain. Manakah di bawah ini yang merupakan ancaman disintegrasi paling relevan di era digital?",
            options: [
                "A. Agresi militer negara tetangga",
                "B. Penyebaran berita bohong (hoax) dan ujaran kebencian SARA",
                "C. Persaingan dagang antar negara",
                "D. Kenaikan harga bahan pokok",
                "E. Wabah penyakit menular"
            ],
            correct: 1 // B based on key
        },
        {
            id: 19,
            question: "Mengapa perwira TNI mendirikan Dewan Banteng, Dewan Gajah, dan Dewan Garuda di Sumatera sebelum meletusnya PRRI?",
            options: [
                "A. Sebagai persiapan untuk menyerang Belanda",
                "B. Sebagai bentuk protes daerah terhadap pusat untuk mengambil alih pembangunan daerahnya sendiri",
                "C. Untuk membentuk angkatan perang terpisah dari TNI",
                "D. Untuk mendukung gerakan separatisme RMS",
                "E. Sebagai organisasi sosial kemasyarakatan biasa"
            ],
            correct: 1 // B based on key
        },
        {
            id: 20,
            question: "Nilai keteladanan apa yang paling menonjol dari para tokoh yang berjuang mempertahankan integrasi bangsa meskipun memiliki kekuasaan besar di daerahnya masing-masing?",
            options: [
                "A. Rela berkorban dan menempatkan kepentingan bangsa di atas kepentingan pribadi/golongan",
                "B. Keberanian melawan penjajah dengan senjata modern",
                "C. Kemampuan berdiplomasi dengan pihak asing",
                "D. Kecerdasan dalam menyusun strategi ekonomi",
                "E. Kharisma dalam memimpin pasukan perang"
            ],
            correct: 0 // A based on key
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
                    <h2>Topik: Menjaga Keutuhan NKRI</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Ancaman Disintegrasi Bangsa (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Menjaga Keutuhan NKRI</p>
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