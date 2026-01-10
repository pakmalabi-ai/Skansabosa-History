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

// --- QUIZ TOPIC 5 (FULL EVALUATION SYSTEM) ---
export const QuizPerjuanganFisik: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Analisis Kausalitas: Peristiwa pertempuran 10 November 1945 di Surabaya dipicu oleh serangkaian insiden. Puncak ketegangan yang membuat rakyat Surabaya marah besar dan menolak kompromi adalah...",
            options: [
                "A. Penurunan bendera Merah Putih di Hotel Yamato",
                "B. Mendaratnya pasukan NICA di Tanjung Perak",
                "C. Tewasnya Brigadir Jenderal A.W.S. Mallaby",
                "D. Dikeluarkannya ultimatum oleh Mayor Jenderal Mansergh agar rakyat menyerahkan senjata",
                "E. Pelarangan rapat umum oleh tentara Jepang"
            ],
            correct: 3 // D
        },
        {
            id: 2,
            question: "Pemahaman Tokoh: Perhatikan kutipan pidato berikut: \"Selama banteng-banteng Indonesia masih mempunyai darah merah yang dapat membikin secarik kain putih merah dan putih, maka selama itu tidak akan kita mau menyerah kepada siapapun juga!\" Tokoh yang membakar semangat pemuda Surabaya dengan kalimat tersebut melalui siaran radio adalah...",
            options: [
                "A. Gubernur Suryo",
                "B. Bung Tomo",
                "C. Sungkono",
                "D. Moestopo",
                "E. Mayjen Mansergh"
            ],
            correct: 1 // B
        },
        {
            id: 3,
            question: "Strategi Militer: Dalam Pertempuran Ambarawa, Kolonel Sudirman menerapkan strategi Supit Urang. Alasan utama penggunaan strategi ini adalah...",
            options: [
                "A. Untuk memancing musuh keluar dari benteng pertahanan",
                "B. Memutus suplai logistik dan komunikasi musuh dengan mengepung dari dua sisi",
                "C. Menunggu bantuan tentara sekutu datang membantu Indonesia",
                "D. Melakukan serangan udara secara mendadak ke markas musuh",
                "E. Mengajak musuh berunding di meja perundingan"
            ],
            correct: 1 // B
        },
        {
            id: 4,
            question: "Identifikasi Peristiwa: Pertempuran Medan Area bermula dari insiden yang melukai harga diri bangsa Indonesia, yaitu...",
            options: [
                "A. Sekutu membebaskan tawanan perang Belanda tanpa izin",
                "B. Seorang penghuni hotel merampas dan menginjak-injak lencana Merah Putih",
                "C. Belanda memasang bendera Merah Putih Biru di kantor pemerintahan",
                "D. Tentara NICA menembak mati seorang pemuda di jalan raya",
                "E. Sekutu melarang penggunaan mata uang Republik Indonesia"
            ],
            correct: 1 // B
        },
        {
            id: 5,
            question: "Dampak Kewilayahan: Pemasangan papan bertuliskan \"Fixed Boundaries Medan Area\" di berbagai sudut pinggiran kota Medan oleh Sekutu bertujuan untuk...",
            options: [
                "A. Menandai wilayah yang aman bagi pengungsi",
                "B. Menetapkan batas wilayah kekuasaan Sekutu secara sepihak",
                "C. Memberikan peringatan adanya ladang ranjau",
                "D. Membagi wilayah logistik antara Indonesia dan Sekutu",
                "E. Menghormati kedaulatan wilayah Republik Indonesia"
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Analisis Strategi: Peristiwa Bandung Lautan Api pada 23 Maret 1946 merupakan keputusan strategis yang sangat berat namun harus diambil. Tujuan utama pembumihangusan kota Bandung Selatan adalah...",
            options: [
                "A. Mencegah Sekutu dan NICA memanfaatkan kota Bandung sebagai markas militer strategis",
                "B. Memancing pasukan Sekutu agar masuk ke perangkap di tengah kota",
                "C. Menunjukkan kekecewaan rakyat terhadap pemerintah pusat di Jakarta",
                "D. Mengusir penduduk sipil agar tidak menjadi korban perang",
                "E. Memusnahkan aset-aset peninggalan Jepang agar tidak diambil Belanda"
            ],
            correct: 0 // A
        },
        {
            id: 7,
            question: "Tokoh Pahlawan: Dalam peristiwa Bandung Lautan Api, terdapat tokoh yang gugur saat meledakkan gudang mesiu milik Sekutu di Dayeuhkolot. Tokoh tersebut adalah...",
            options: [
                "A. A.H. Nasution",
                "B. Mohamad Toha",
                "C. T.B. Simatupang",
                "D. Otto Iskandardinata",
                "E. Djuanda Kartawidjaja"
            ],
            correct: 1 // B
        },
        {
            id: 8,
            question: "Motivasi Agresi: Belanda melancarkan Agresi Militer I pada 21 Juli 1947 dengan fokus menyerang wilayah Jawa Barat, Jawa Timur, Sumatera Timur, dan Palembang. Motif ekonomi di balik serangan ini adalah...",
            options: [
                "A. Menguasai jalur perdagangan laut internasional",
                "B. Merebut kembali daerah perkebunan, pertambangan, dan ladang minyak untuk memulihkan ekonomi Belanda",
                "C. Menangkap para pemimpin Republik Indonesia yang bersembunyi di pedalaman",
                "D. Membuka jalur logistik untuk bantuan kemanusiaan PBB",
                "E. Menghancurkan basis militer TNI yang semakin kuat"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Istilah Sejarah: Dalam Agresi Militer I, Belanda tidak menyebut tindakannya sebagai \"Perang\", melainkan \"Aksi Polisionil\". Tujuannya adalah...",
            options: [
                "A. Menunjukkan kekuatan militer Belanda yang superior",
                "B. Menghindari campur tangan Dewan Keamanan PBB karena dianggap masalah dalam negeri",
                "C. Agar rakyat Indonesia tidak melakukan perlawanan bersenjata",
                "D. Karena Belanda hanya menggunakan kepolisian, bukan tentara",
                "E. Untuk menarik simpati negara-negara Asia Afrika"
            ],
            correct: 1 // B
        },
        {
            id: 10,
            question: "Analisis Konflik Internal: Pemberontakan PKI Madiun pada September 1948 dianggap sebagai \"tikaman dari belakang\" bagi bangsa Indonesia karena...",
            options: [
                "A. Dilakukan oleh tentara asing yang menyusup",
                "B. Terjadi saat bangsa Indonesia sedang memusatkan kekuatan menghadapi ancaman Belanda",
                "C. Menggunakan senjata bantuan dari negara Barat",
                "D. Dipimpin oleh tokoh yang tidak dikenal oleh rakyat",
                "E. Terjadi di daerah yang jauh dari ibu kota negara"
            ],
            correct: 1 // B
        },
        {
            id: 11,
            question: "Tokoh Pemberontakan: Tokoh utama yang memproklamasikan berdirinya \"Republik Soviet Indonesia\" di Madiun pada tahun 1948 adalah...",
            options: [
                "A. D.N. Aidit dan Untung",
                "B. Musso dan Amir Sjarifuddin",
                "C. Kartosuwiryo dan Kahar Muzakkar",
                "D. Tan Malaka dan Sutan Sjahrir",
                "E. Westerling dan Soumokil"
            ],
            correct: 1 // B
        },
        {
            id: 12,
            question: "Kronologi Agresi II: Sasaran utama Agresi Militer Belanda II pada 19 Desember 1948 adalah...",
            options: [
                "A. Menguasai pelabuhan-pelabuhan utama di Jawa",
                "B. Menghancurkan seluruh pasukan TNI di Jawa Tengah",
                "C. Menduduki ibu kota Yogyakarta dan menangkap pemimpin negara (Soekarno-Hatta)",
                "D. Merebut kembali wilayah perkebunan di Sumatera Utara",
                "E. Membubarkan pemerintahan daerah di Jawa Barat"
            ],
            correct: 2 // C
        },
        {
            id: 13,
            question: "Resiliensi Pemerintahan: Sesaat sebelum ditangkap Belanda saat Agresi Militer II, Presiden Soekarno mengirimkan kawat (mandat) kepada Sjafruddin Prawiranegara. Isi mandat tersebut adalah...",
            options: [
                "A. Perintah untuk menyerah kepada Belanda agar tidak ada korban jiwa",
                "B. Perintah untuk membentuk Pemerintahan Darurat Republik Indonesia (PDRI) di Bukittinggi",
                "C. Perintah untuk memindahkan ibu kota ke luar negeri",
                "D. Perintah kepada TNI untuk melakukan gencatan senjata",
                "E. Perintah untuk meminta bantuan militer kepada PBB"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Peran Militer: Meskipun dalam keadaan sakit parah (paru-paru), Jenderal Sudirman tetap memimpin perlawanan melawan Agresi Militer Belanda II dengan cara...",
            options: [
                "A. Diplomasi di meja perundingan PBB",
                "B. Perang Gerilya (masuk hutan keluar hutan) untuk memecah konsentrasi musuh",
                "C. Bertahan total di dalam keraton Yogyakarta",
                "D. Melakukan serangan udara menggunakan pesawat sisa Jepang",
                "E. Meminta perlindungan politik ke negara tetangga"
            ],
            correct: 1 // B
        },
        {
            id: 15,
            question: "Dampak Serangan Umum: Serangan Umum 1 Maret 1949 di Yogyakarta yang diprakarsai oleh Sultan Hamengkubuwono IX dan dipimpin Letkol Soeharto memiliki dampak politis yang besar, yaitu...",
            options: [
                "A. Belanda langsung menyerahkan kedaulatan kepada Indonesia hari itu juga",
                "B. Pasukan Belanda berhasil diusir seluruhnya dari pulau Jawa",
                "C. Membuktikan kepada dunia internasional (PBB) bahwa TNI dan RI masih ada dan kuat",
                "D. Menewaskan seluruh pimpinan militer Belanda di Yogyakarta",
                "E. Membatalkan hasil Perjanjian Renville secara sepihak"
            ],
            correct: 2 // C
        },
        {
            id: 16,
            question: "Perbandingan Perjuangan: Perbedaan mendasar antara perjuangan diplomasi dan perjuangan bersenjata (fisik) adalah...",
            options: [
                "A. Diplomasi dilakukan oleh tentara, bersenjata dilakukan oleh rakyat",
                "B. Diplomasi mengandalkan perundingan, bersenjata mengandalkan pertempuran fisik",
                "C. Diplomasi selalu gagal, bersenjata selalu berhasil",
                "D. Diplomasi dilakukan di dalam negeri, bersenjata dilakukan di luar negeri",
                "E. Tidak ada perbedaan, keduanya sama-sama menggunakan kekerasan"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Refleksi Nilai (Deep Learning): Nilai moral utama yang dapat dipetik dari peristiwa \"Puputan\" Margarana di Bali yang dipimpin oleh I Gusti Ngurah Rai adalah...",
            options: [
                "A. Semangat menyerang wilayah musuh demi harta rampasan",
                "B. Semangat pantang menyerah dan rela berkorban demi mempertahankan kehormatan bangsa (Perang Habis-habisan)",
                "C. Pentingnya memiliki senjata modern dalam berperang",
                "D. Kecerdikan dalam menipu musuh di medan perang",
                "E. Ketaatan buta terhadap perintah atasan tanpa pertimbangan"
            ],
            correct: 1 // B
        },
        {
            id: 18,
            question: "Evaluasi Dampak: Salah satu dampak negatif dari hasil Perjanjian Renville (akibat kekalahan di Agresi Militer I) bagi wilayah Indonesia adalah...",
            options: [
                "A. Wilayah Indonesia bertambah luas mencakup seluruh Hindia Belanda",
                "B. Munculnya Garis Van Mook yang membuat wilayah RI semakin sempit dan terisolasi",
                "C. Belanda mengakui kedaulatan RI secara de jure atas Jawa dan Sumatera",
                "D. TNI diperbolehkan memiliki senjata berat",
                "E. Ekonomi Indonesia membaik karena bantuan Belanda"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Fakta Sejarah: Tanggal 15 Desember diperingati sebagai Hari Juang Kartika (Hari Infanteri) untuk mengenang kemenangan TKR dalam peristiwa...",
            options: [
                "A. Pertempuran Surabaya",
                "B. Pertempuran Medan Area",
                "C. Pertempuran Ambarawa",
                "D. Pertempuran Lima Hari di Semarang",
                "E. Bandung Lautan Api"
            ],
            correct: 2 // C
        },
        {
            id: 20,
            question: "Kesimpulan: Secara keseluruhan, keberhasilan Indonesia mempertahankan kemerdekaan dari tahun 1945-1949 ditentukan oleh...",
            options: [
                "A. Kekuatan senjata TNI yang lebih canggih dari Belanda",
                "B. Bantuan militer penuh dari negara-negara Blok Timur",
                "C. Kombinasi antara perjuangan bersenjata (TNI/Rakyat) dan perjuangan diplomasi",
                "D. Kebaikan hati Ratu Belanda yang memberikan kemerdekaan",
                "E. Perpecahan di dalam tubuh militer Belanda sendiri"
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
                    <h2>Topik: Perjuangan Mempertahankan Kemerdekaan</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Perjuangan Mempertahankan Kemerdekaan (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Perjuangan Mempertahankan Kemerdekaan</p>
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