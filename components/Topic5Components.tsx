import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 5 ---
export const MindfulnessPerjuangan: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Duduklah dengan tegap. Bayangkan kamu berada di tahun 1945.",
        "Udara penuh debu mesiu. Terdengar dentuman meriam di kejauhan.",
        "Tarik napas... rasakan keberanian yang membara di dada para pejuang.",
        "Hembuskan... lepaskan rasa takut. Kemerdekaan harus dipertahankan.",
        "Siapkan hatimu untuk menelusuri jejak darah dan air mata pahlawan."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-history-red shadow-[0_0_30px_rgba(190,18,60,0.1)] transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="fas fa-fighter-jet text-6xl text-white transform -rotate-45"></i>
            </div>
            
            <i className="fas fa-fire text-history-red text-4xl mb-6 opacity-80 animate-pulse"></i>
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
                    SIAP TEMPUR!
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: KOMANDAN MEDAN TEMPUR ---
interface StrategyScenario {
    id: number;
    location: string;
    role: string;
    situation: string;
    choices: { text: string; correct: boolean; feedback: string }[];
}

export const BattleStrategySim: React.FC = () => {
    const scenarios: StrategyScenario[] = [
        {
            id: 1,
            location: "Surabaya, 10 November 1945",
            role: "Bung Tomo & Pimpinan TKR",
            situation: "Inggris mengeluarkan ultimatum: 'Serahkan senjata dan menyerah dengan tangan di atas kepala sebelum jam 06.00 pagi'. Inggris memiliki tank dan pesawat tempur.",
            choices: [
                { 
                    text: "Menyerah demi menyelamatkan nyawa warga sipil.", 
                    correct: false, 
                    feedback: "Salah. Jika menyerah, NICA (Belanda) akan membonceng Inggris dan menjajah kita kembali. Semangat 'Merdeka atau Mati' hilang." 
                },
                { 
                    text: "Tolak ultimatum! Bakar semangat lewat radio!", 
                    correct: true, 
                    feedback: "Tepat! Pidato 'Allahu Akbar' membakar semangat arek-arek Suroboyo. Walau hancur, dunia melihat Indonesia masih ada dan berani melawan." 
                }
            ]
        },
        {
            id: 2,
            location: "Ambarawa, Desember 1945",
            role: "Kolonel Soedirman",
            situation: "Pasukan Sekutu di Ambarawa memiliki persenjataan lengkap dan tank. Pasukan kita hanya bersenjata rampasan dan bambu runcing, namun jumlah kita banyak.",
            choices: [
                { 
                    text: "Serangan Frontal (Maju serentak dari depan).", 
                    correct: false, 
                    feedback: "Berbahaya. Tank musuh akan dengan mudah membantai pasukan kita di area terbuka." 
                },
                { 
                    text: "Taktik Supit Urang (Pengepungan Rangkap).", 
                    correct: true, 
                    feedback: "Brilian! Dengan mengepung dari dua sisi dan memutus suplai logistik, musuh terjepit dan mundur ke Semarang. Kemenangan gemilang TKR!" 
                }
            ]
        },
        {
            id: 3,
            location: "Bandung, Maret 1946",
            role: "A.H. Nasution & Pejuang Bandung",
            situation: "Sekutu menuntut Bandung Selatan dikosongkan. Kekuatan militer tidak seimbang. Jika kita mundur begitu saja, Sekutu akan menggunakan gedung-gedung vital sebagai markas.",
            choices: [
                { 
                    text: "Bumi Hanguskan Kota Bandung!", 
                    correct: true, 
                    feedback: "Keputusan berat namun strategis. Dengan membakar kota, Sekutu tidak bisa memanfaatkan fasilitas Bandung. 'Bandung Lautan Api' menjadi simbol pengorbanan." 
                },
                { 
                    text: "Bertahan di dalam gedung sampai titik darah penghabisan.", 
                    correct: false, 
                    feedback: "Kurang taktis. Kita akan dikepung dan gedung-gedung strategis akhirnya tetap jatuh ke tangan musuh secara utuh." 
                }
            ]
        }
    ];

    const [currentIdx, setCurrentIdx] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isCorrectLast, setIsCorrectLast] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleChoice = (isCorrect: boolean, msg: string) => {
        setFeedback(msg);
        setIsCorrectLast(isCorrect);
        if (isCorrect) setScore(score + 10);
    };

    const nextScenario = () => {
        setFeedback(null);
        if (currentIdx < scenarios.length - 1) {
            setCurrentIdx(currentIdx + 1);
        } else {
            setFinished(true);
        }
    };

    const resetSim = () => {
        setCurrentIdx(0);
        setScore(0);
        setFinished(false);
        setFeedback(null);
    };

    if (finished) {
        return (
            <div className="bg-[#171717] p-10 text-center rounded-xl border-2 border-history-gold animate-fade-in">
                <div className="text-6xl mb-4">{score === 30 ? '🎖️' : '🎗️'}</div>
                <h3 className="text-2xl font-bold text-history-gold mb-2 uppercase tracking-widest">Laporan Pertempuran</h3>
                <p className="text-history-muted mb-6">Skor Strategi: <span className="font-bold text-white text-xl">{score}</span> / 30</p>
                <p className="text-history-brown mb-8 font-light italic">
                    {score === 30 
                        ? "Luar Biasa, Jenderal! Keputusanmu menyelamatkan kehormatan bangsa." 
                        : "Perjuangan belum usai. Pelajari lagi taktik para pahlawan kita."}
                </p>
                <button onClick={resetSim} className="bg-history-red text-white px-8 py-3 rounded hover:bg-[#9f1239] transition font-bold uppercase tracking-widest text-xs">
                    Ulangi Simulasi
                </button>
            </div>
        );
    }

    const scenario = scenarios[currentIdx];

    return (
        <div className="max-w-4xl mx-auto bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20 flex flex-col">
            <div className="bg-[#0a0a0a] border-b border-history-gold/20 p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></span>
                    <span className="text-history-red font-bold uppercase tracking-widest text-xs">Zona Perang: {scenario.location}</span>
                </div>
                <span className="text-history-gold text-xs font-bold border border-history-gold/30 px-2 py-1 rounded">Misi {currentIdx + 1}/{scenarios.length}</span>
            </div>

            <div className="p-8">
                <div className="mb-8">
                    <h3 className="font-sans text-xl font-bold text-white mb-2">Peran: {scenario.role}</h3>
                    <p className="text-history-muted text-lg font-light leading-relaxed bg-[#0a0a0a] p-4 rounded border-l-2 border-history-gold">
                        "{scenario.situation}"
                    </p>
                </div>

                {!feedback ? (
                    <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                        {scenario.choices.map((choice, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChoice(choice.correct, choice.feedback)}
                                className="text-left p-6 border border-history-muted/20 rounded-lg hover:border-history-gold hover:bg-[#262626] transition group"
                            >
                                <span className="block font-bold text-history-gold mb-2 text-xs uppercase tracking-widest">Opsi {String.fromCharCode(65 + idx)}</span>
                                <span className="text-history-brown font-light group-hover:text-white">{choice.text}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="animate-fade-in text-center">
                        <div className={`p-6 rounded-lg mb-6 border ${isCorrectLast ? 'bg-emerald-900/20 border-emerald-500' : 'bg-rose-900/20 border-rose-500'}`}>
                            <h4 className={`font-bold text-lg mb-2 uppercase tracking-wide ${isCorrectLast ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isCorrectLast ? "Keputusan Tepat!" : "Keputusan Berisiko!"}
                            </h4>
                            <p className="text-white font-light">{feedback}</p>
                        </div>
                        <button 
                            onClick={nextScenario}
                            className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-white transition shadow-lg font-bold uppercase tracking-widest text-xs"
                        >
                            {currentIdx < scenarios.length - 1 ? "Misi Selanjutnya" : "Lihat Hasil Akhir"} <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 5 ---
export const LKPDTopic5: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));

    // Activity 1: Analisis Masalah (PBL)
    const [act1Background, setAct1Background] = useState('');
    const [act1Figures, setAct1Figures] = useState('');
    const [act1Strategy, setAct1Strategy] = useState('');
    const [act1Impact, setAct1Impact] = useState('');
    const [act1Meaning, setAct1Meaning] = useState('');

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
                <div class="sub-header">Topik: Investigasi Sejarah Perjuangan Bersenjata</div>
                
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
                    <h3>Petunjuk Kerja:</h3>
                    <ol style="font-size: 14px;">
                        <li>Bacalah materi sesuai pembagian kelompok kalian.</li>
                        <li>Diskusikan dan jawablah pertanyaan di bawah ini (Gunakan prinsip 5W + 1H).</li>
                        <li>Carilah relevansi peristiwa tersebut dengan kondisi saat ini.</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>Tabel Analisis Masalah (PBL)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">No</th>
                                <th width="40%">Pertanyaan Investigasi</th>
                                <th width="55%">Jawaban Hasil Diskusi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><strong>Apa</strong> latar belakang utama pemicu pertempuran/peristiwa tersebut?</td>
                                <td>${act1Background}</td>
                            </tr>
                             <tr>
                                <td>2</td>
                                <td><strong>Siapa</strong> tokoh kunci yang terlibat dan apa perannya?</td>
                                <td>${act1Figures}</td>
                            </tr>
                             <tr>
                                <td>3</td>
                                <td><strong>Bagaimana</strong> strategi yang digunakan oleh pejuang Indonesia? (Jelaskan taktiknya)</td>
                                <td>${act1Strategy}</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td><strong>Analisis (HOTS):</strong> Apa dampak terbesar peristiwa ini bagi posisi Indonesia di mata dunia atau Belanda saat itu?</td>
                                <td>${act1Impact}</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td><strong>Meaningfull Learning:</strong> Jika semangat pertempuran ini diterapkan oleh pelajar SMK masa kini, perilaku apa yang harus ditunjukkan?</td>
                                <td>${act1Meaning}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Produk Akhir:</h3>
                    <p>Buatlah kesimpulan dalam bentuk Mind Map atau Poster Digital (Canva) lalu presentasikan di depan kelas!</p>
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
        window.open('https://forms.gle/9iiSS4RrkTyHHRZR9', '_blank');
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

            {/* Petunjuk */}
            <div className="bg-[#171717] p-6 rounded-xl border-l-4 border-history-gold mb-10">
                <h4 className="font-bold text-history-gold mb-3 text-sm uppercase tracking-wide">Petunjuk Kerja:</h4>
                <ol className="list-decimal pl-5 text-sm text-history-muted space-y-2">
                    <li>Bacalah materi sesuai pembagian kelompok kalian.</li>
                    <li>Diskusikan dan jawablah pertanyaan di bawah ini (Gunakan prinsip 5W + 1H).</li>
                    <li>Carilah relevansi peristiwa tersebut dengan kondisi saat ini.</li>
                </ol>
            </div>

            {/* Tabel Investigasi */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Tabel Analisis Masalah (PBL)</h4>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-history-gold/20">
                        <thead>
                            <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                <th className="p-4 border border-history-gold/20 w-12 text-center">No</th>
                                <th className="p-4 border border-history-gold/20 w-1/3">Pertanyaan Investigasi</th>
                                <th className="p-4 border border-history-gold/20">Jawaban Hasil Diskusi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 text-center font-bold text-history-gold">1</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <strong>Apa</strong> latar belakang utama pemicu pertempuran/peristiwa tersebut?
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1Background} 
                                        onChange={e => setAct1Background(e.target.value)} 
                                        className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Jawaban..."
                                    ></textarea>
                                </td>
                            </tr>
                             <tr className="bg-[#0a0a0a]">
                                <td className="p-4 border border-history-gold/20 text-center font-bold text-history-gold">2</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <strong>Siapa</strong> tokoh kunci yang terlibat dan apa perannya?
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1Figures} 
                                        onChange={e => setAct1Figures(e.target.value)} 
                                        className="w-full h-24 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Jawaban..."
                                    ></textarea>
                                </td>
                            </tr>
                             <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 text-center font-bold text-history-gold">3</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <strong>Bagaimana</strong> strategi yang digunakan oleh pejuang Indonesia? (Jelaskan taktiknya)
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1Strategy} 
                                        onChange={e => setAct1Strategy(e.target.value)} 
                                        className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Jawaban..."
                                    ></textarea>
                                </td>
                            </tr>
                            <tr className="bg-[#0a0a0a]">
                                <td className="p-4 border border-history-gold/20 text-center font-bold text-history-gold">4</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <strong>Analisis (HOTS):</strong> Apa dampak terbesar peristiwa ini bagi posisi Indonesia di mata dunia atau Belanda saat itu?
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1Impact} 
                                        onChange={e => setAct1Impact(e.target.value)} 
                                        className="w-full h-24 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Jawaban..."
                                    ></textarea>
                                </td>
                            </tr>
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 text-center font-bold text-history-gold">5</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <strong>Meaningfull Learning:</strong> Jika semangat pertempuran ini diterapkan oleh pelajar SMK masa kini, perilaku apa yang harus ditunjukkan?
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1Meaning} 
                                        onChange={e => setAct1Meaning(e.target.value)} 
                                        className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Jawaban..."
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-[#171717] p-6 rounded-xl border border-history-gold/10 text-center">
                <h4 className="font-bold text-white mb-2 uppercase tracking-wide">Produk Akhir</h4>
                <p className="text-history-muted text-sm">Buatlah kesimpulan dalam bentuk <strong>Mind Map</strong> atau <strong>Poster Digital (Canva)</strong> lalu presentasikan di depan kelas!</p>
            </div>

        </div>
    );
};

// --- QUIZ TOPIC 5 ---
export const QuizPerjuanganFisik: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Peristiwa perobekan bendera Belanda (Merah-Putih-Biru) menjadi Merah-Putih terjadi di...",
            options: ["Hotel Yamato, Surabaya", "Gedung Sate, Bandung", "Lawang Sewu, Semarang", "Istana Maimun, Medan"],
            answerIndex: 0
        },
        {
            question: "Siapakah tokoh yang terkenal dengan pidato berapi-api membakar semangat arek-arek Suroboyo?",
            options: ["Jenderal Sudirman", "Bung Tomo", "Gubernur Suryo", "I Gusti Ngurah Rai"],
            answerIndex: 1
        },
        {
            question: "Pertempuran Ambarawa berakhir dengan kemenangan TKR berkat strategi...",
            options: ["Perang Gerilya", "Supit Urang", "Bumi Hangus", "Puputan"],
            answerIndex: 1
        },
        {
            question: "Mengapa tanggal 10 November diperingati sebagai Hari Pahlawan?",
            options: ["Karena Soekarno berpidato", "Karena Belanda menyerah", "Untuk mengenang pertempuran dahsyat di Surabaya", "Karena PBB mengakui Indonesia"],
            answerIndex: 2
        },
        {
            question: "Peristiwa Bandung Lautan Api bertujuan untuk...",
            options: ["Merayakan kemenangan", "Menyambut kedatangan Sekutu", "Mencegah Sekutu menggunakan fasilitas kota sebagai markas", "Mengusir penduduk asli"],
            answerIndex: 2
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
            <div className="bg-[#171717] p-10 rounded-xl shadow-2xl border border-history-gold/20 text-center animate-fade-in relative">
                <div className="text-6xl mb-4 text-history-gold">📝</div>
                <h3 className="text-2xl font-bold mb-4 font-sans text-history-brown uppercase tracking-widest">Hasil Evaluasi</h3>
                <div className="text-5xl font-black text-white mb-6">{score}</div>
                <p className="mb-8 text-history-muted italic font-light">
                    {score >= 80 
                        ? "Hebat! Semangat kepahlawanan mengalir dalam dirimu." 
                        : "Jangan patah semangat. Perjuangan butuh pengulangan."}
                </p>
                <button onClick={restart} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-white transition font-bold uppercase tracking-widest text-xs">
                    Ulangi Kuis
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#171717] p-8 md:p-10 rounded-xl shadow-lg border border-history-gold/10">
            <div className="mb-8 flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-xs font-bold text-history-muted uppercase tracking-widest">Soal {currentQ + 1}/{questions.length}</span>
                <span className="text-history-gold font-bold">Skor: {score}</span>
            </div>
            
            <h3 className="font-serif text-xl md:text-2xl mb-10 text-history-brown leading-relaxed">
                {questions[currentQ].question}
            </h3>
            
            <div className="space-y-4">
                {questions[currentQ].options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-5 border rounded-lg transition-all duration-300 flex justify-between items-center group
                            ${selectedOption === idx 
                                ? (idx === questions[currentQ].answerIndex ? 'bg-emerald-900/20 border-emerald-500 text-emerald-100' : 'bg-rose-900/20 border-rose-500 text-rose-100')
                                : 'bg-[#0a0a0a] border-history-gold/10 hover:border-history-gold hover:bg-[#1c1c1c] text-history-muted hover:text-history-brown'
                            }
                        `}
                    >
                        <span className="font-light text-lg">{opt}</span>
                        {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check-circle text-emerald-500 text-xl"></i>}
                        {isAnswered && selectedOption === idx && idx !== questions[currentQ].answerIndex && <i className="fas fa-times-circle text-rose-500 text-xl"></i>}
                    </button>
                ))}
            </div>
            
            {isAnswered && (
                <div className="mt-10 text-right animate-fade-in">
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-white transition font-bold uppercase tracking-widest text-xs shadow-lg">
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Lanjut"} <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            )}
        </div>
    );
};