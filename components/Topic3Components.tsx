import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 3 ---
export const MindfulnessGate: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Tarik napas dalam-dalam... rasakan semangat di dada.",
        "Bayangkan dirimu berada di tahun 1945. Suasana genting, namun penuh harapan.",
        "Sadari bahwa kemerdekaan bukan hadiah, tapi hasil keberanian mengambil keputusan.",
        "Fokuskan pikiranmu. Kita akan menelusuri jejak para pendiri bangsa.",
        "Siap? Mari kita masuki gerbang kemerdekaan."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-6 rounded text-center border-l-2 border-history-gold shadow transition-all duration-500">
            <i className="fas fa-torii-gate text-history-gold text-3xl mb-4 opacity-80 animate-pulse"></i>
            <p className="text-lg font-sans text-history-brown mb-6 min-h-[60px] flex items-center justify-center font-light">{messages[step]}</p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded-full hover:bg-[#c5a028] transition transform hover:scale-105 font-bold text-xs uppercase tracking-widest"
                >
                    Lanjut
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-red text-white px-6 py-2 rounded-full cursor-default shadow-md text-xs uppercase tracking-widest"
                >
                    Mulai Belajar
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: DILEMA PENDIRI BANGSA ---
interface SimulationScenario {
    id: number;
    title: string;
    text: string;
    choices: { text: string; impact: string; score: number }[];
}

export const IndependenceSimulation: React.FC = () => {
    const scenarios: SimulationScenario[] = [
        {
            id: 1,
            title: "Tahun 1943: Tawaran Senjata",
            text: "Jepang menawarkan pelatihan militer (PETA) kepada pemuda Indonesia. Teman-temanmu ragu karena benci Jepang. Sebagai pemimpin pemuda, apa keputusanmu?",
            choices: [
                { text: "Tolak mentah-mentah! Itu alat penjajah.", impact: "Semangat nasionalisme tinggi, tapi saat Sekutu datang, pemuda kita tidak punya kemampuan tempur. Kita kalah.", score: 0 },
                { text: "Ikut pelatihan untuk mencuri ilmu militer.", impact: "Cerdas! Walau berat, kamu mendapat 'Senjata Makan Tuan'. Alumni PETA kelak menjadi tulang punggung TNI.", score: 10 }
            ]
        },
        {
            id: 2,
            title: "Juni 1945: Sidang BPUPKI Memanas",
            text: "Golongan Islam ingin syariat Islam masuk dasar negara. Golongan Nasionalis ingin negara sekuler. Sidang macet dan suasana tegang. Apa solusinya?",
            choices: [
                { text: "Paksa pendapat satu pihak saja.", impact: "Terjadi perpecahan (Deadlock). Sidang gagal. Jepang membatalkan janji kemerdekaan.", score: 0 },
                { text: "Lakukan kompromi (Jalan Tengah).", impact: "Luar biasa! Lahir 'Piagam Jakarta'. Semua golongan merasa dihargai demi tujuan bersama: Merdeka.", score: 10 }
            ]
        },
        {
            id: 3,
            title: "18 Agustus 1945: Ancaman Perpecahan",
            text: "Wakil Indonesia Timur mengancam memisahkan diri jika kalimat 'Kewajiban menjalankan syariat Islam' tidak dihapus dari UUD. Waktu sangat sempit.",
            choices: [
                { text: "Biarkan mereka pergi, prinsip adalah prinsip.", impact: "Indonesia merdeka tapi pecah. Wilayah Timur tidak jadi bergabung. NKRI gagal terbentuk utuh.", score: 0 },
                { text: "Hapus kalimat tersebut demi persatuan.", impact: "Sikap berjiwa besar! Sila 1 menjadi 'Ketuhanan Yang Maha Esa'. NKRI utuh dari Sabang sampai Merauke.", score: 10 }
            ]
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isFinished, setIsFinished] = useState(false);

    const handleChoice = (choicePoints: number, impactText: string) => {
        setScore(score + choicePoints);
        setFeedback(impactText);
    };

    const nextScenario = () => {
        setFeedback("");
        if (currentStep < scenarios.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
        }
    };

    const resetSim = () => {
        setCurrentStep(0);
        setScore(0);
        setFeedback("");
        setIsFinished(false);
    };

    if (isFinished) {
        return (
            <div className="bg-[#171717] p-8 rounded-xl shadow-lg border-2 border-history-gold text-center animate-fade-in">
                <div className="text-6xl mb-4">{score >= 20 ? '🇮🇩' : '🏳️'}</div>
                <h3 className="text-2xl font-bold font-sans text-history-brown mb-2 uppercase tracking-wide">Simulasi Selesai</h3>
                <p className="text-xl mb-6 text-history-muted">Skor Kebijaksanaanmu: <span className="font-bold text-history-gold">{score}</span> / 30</p>
                <p className="text-history-brown mb-8 italic font-light">
                    {score >= 20 
                        ? "Luar biasa! Kamu memiliki jiwa negarawan seperti Soekarno dan Hatta. Persatuan di atas segalanya." 
                        : "Menjadi pemimpin itu sulit. Sejarah mengajarkan bahwa ego harus dikalahkan demi kepentingan bangsa."}
                </p>
                <button onClick={resetSim} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition shadow font-bold uppercase tracking-widest text-xs">
                    Ulangi Simulasi
                </button>
            </div>
        );
    }

    const scenario = scenarios[currentStep];

    return (
        <div className="max-w-3xl mx-auto bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20">
            <div className="bg-[#0a0a0a] text-history-gold p-4 flex justify-between items-center border-b border-history-gold/20">
                <span className="font-bold tracking-widest uppercase text-xs">Skenario {currentStep + 1}/{scenarios.length}</span>
                <div className="bg-[#171717] px-3 py-1 rounded text-xs text-white border border-history-gold/30">Skor: {score}</div>
            </div>
            
            <div className="p-8">
                {!feedback ? (
                    <div className="animate-fade-in">
                        <h3 className="text-xl font-bold font-sans text-history-brown mb-4 uppercase tracking-wide">{scenario.title}</h3>
                        <p className="text-history-muted text-lg leading-relaxed mb-8 border-l-2 border-history-red pl-4 bg-[#0a0a0a] py-4 rounded-r font-light">
                            "{scenario.text}"
                        </p>
                        
                        <div className="space-y-4">
                            {scenario.choices.map((choice, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleChoice(choice.score, choice.impact)}
                                    className="w-full text-left p-6 border border-history-gold/10 rounded-lg hover:border-history-gold hover:bg-[#0a0a0a] transition-all duration-200 group flex items-start bg-[#171717]"
                                >
                                    <div className="bg-[#262626] text-history-gold font-bold w-6 h-6 rounded flex items-center justify-center mr-4 group-hover:bg-history-gold group-hover:text-[#0a0a0a] shrink-0 border border-history-gold/30 text-xs">
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <span className="font-light text-history-brown group-hover:text-white">{choice.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6 animate-fade-in-down">
                        <div className="inline-block p-4 rounded-full bg-[#0a0a0a] mb-4 border border-history-gold/30">
                            <i className="fas fa-gavel text-3xl text-history-gold"></i>
                        </div>
                        <h4 className="text-lg font-bold text-history-red mb-4 uppercase tracking-widest">Konsekuensi</h4>
                        <div className="bg-[#0a0a0a] p-6 rounded-lg border border-history-gold/10 shadow-inner mb-8 max-w-lg mx-auto">
                            <p className="text-lg font-serif text-history-brown leading-relaxed italic font-light">"{feedback}"</p>
                        </div>
                        <button 
                            onClick={nextScenario}
                            className="bg-history-gold hover:bg-[#c5a028] text-[#0a0a0a] font-bold py-3 px-10 rounded shadow-lg transition transform hover:-translate-y-1 uppercase tracking-widest text-xs"
                        >
                            Lanjut <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 3 ---
export const LKPDTopic3: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));

    // Activity 1: Analisis Kritis (Mind Map)
    const [act1Politik, setAct1Politik] = useState('');
    const [act1Bahasa, setAct1Bahasa] = useState('');

    // Activity 2: Komparasi Peran Lembaga
    const [act2PpkiTugas, setAct2PpkiTugas] = useState('');
    const [act2BpupkiAnggota, setAct2BpupkiAnggota] = useState('');
    const [act2PpkiMakna, setAct2PpkiMakna] = useState('');

    // Activity 3: Refleksi Deep Learning
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
                <div class="sub-header">Topik: Menelusuri Jejak Menuju Proklamasi</div>
                
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
                    <h3>Aktivitas 1: Analisis Kritis (Mind Map)</h3>
                    <p class="instruction">Instruksi: Diskusikan dengan kelompokmu dan isilah tabel analisis berikut!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek</th>
                                <th width="40%">Kebijakan Jepang</th>
                                <th width="40%">Keuntungan Terselubung bagi Indonesia (Blessing in Disguise)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Militer</strong></td>
                                <td>Pembentukan PETA, Heiho, Seinendan</td>
                                <td>Contoh: Pemuda Indonesia mendapatkan pelatihan militer modern dan mental bertempur.</td>
                            </tr>
                             <tr>
                                <td><strong>Politik</strong></td>
                                <td>Pembentukan Putera & Jawa Hokokai</td>
                                <td>${act1Politik}</td>
                            </tr>
                             <tr>
                                <td><strong>Bahasa</strong></td>
                                <td>Pelarangan Bahasa Belanda</td>
                                <td>${act1Bahasa}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Komparasi Peran Lembaga</h3>
                    <p class="instruction">Instruksi: Bandingkan BPUPKI dan PPKI!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Pembeda</th>
                                <th width="40%">BPUPKI</th>
                                <th width="40%">PPKI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Tugas Utama</strong></td>
                                <td>Merancang dasar negara dan UUD</td>
                                <td>${act2PpkiTugas}</td>
                            </tr>
                             <tr>
                                <td><strong>Keanggotaan</strong></td>
                                <td>${act2BpupkiAnggota}</td>
                                <td>Mewakili seluruh wilayah Indonesia (Sabang-Merauke)</td>
                            </tr>
                             <tr>
                                <td><strong>Makna bagi Kemerdekaan</strong></td>
                                <td>Sebagai "Arsitek" (Perancang)</td>
                                <td>Sebagai ${act2PpkiMakna}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="section">
                    <h3>Aktivitas 3: Refleksi Deep Learning (HOTS)</h3>
                    <p><strong>"Seandainya Jepang tidak pernah membentuk PETA dan BPUPKI, menurut pendapatmu, apakah Indonesia akan tetap merdeka pada tahun 1945? Jelaskan alasan logismu!"</strong></p>
                    <div class="answer-box">${act3Refleksi}</div>
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
        window.open('https://forms.gle/HL9o7rGqDNQAQqZD9', '_blank');
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

            {/* Aktivitas 1 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Aktivitas 1: Analisis Kritis (Mind Map)</h4>
                <p className="text-history-muted text-sm mb-4 italic">Instruksi: Diskusikan dengan kelompokmu dan isilah tabel analisis berikut!</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-history-gold/20">
                        <thead>
                            <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                <th className="p-4 border border-history-gold/20 w-1/4">Aspek</th>
                                <th className="p-4 border border-history-gold/20 w-1/3">Kebijakan Jepang</th>
                                <th className="p-4 border border-history-gold/20 w-1/3">Keuntungan Terselubung bagi Indonesia (Blessing in Disguise)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            {/* Row 1 - Example */}
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Militer</td>
                                <td className="p-4 border border-history-gold/20 align-top">Pembentukan PETA, Heiho, Seinendan</td>
                                <td className="p-4 border border-history-gold/20 align-top italic opacity-70">
                                    Contoh: Pemuda Indonesia mendapatkan pelatihan militer modern dan mental bertempur.
                                </td>
                            </tr>
                             {/* Row 2 - Politik */}
                            <tr className="bg-[#0a0a0a]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Politik</td>
                                <td className="p-4 border border-history-gold/20 align-top">Pembentukan Putera & Jawa Hokokai</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <textarea 
                                        value={act1Politik} 
                                        onChange={e => setAct1Politik(e.target.value)} 
                                        className="w-full h-24 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Analisis keuntungan..."
                                    ></textarea>
                                </td>
                            </tr>
                             {/* Row 3 - Bahasa */}
                             <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Bahasa</td>
                                <td className="p-4 border border-history-gold/20 align-top">Pelarangan Bahasa Belanda</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <textarea 
                                        value={act1Bahasa} 
                                        onChange={e => setAct1Bahasa(e.target.value)} 
                                        className="w-full h-24 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="Analisis keuntungan..."
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aktivitas 2 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Aktivitas 2: Komparasi Peran Lembaga</h4>
                <p className="text-history-muted text-sm mb-4 italic">Instruksi: Bandingkan BPUPKI dan PPKI!</p>
                
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-history-gold/20">
                        <thead>
                            <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                <th className="p-4 border border-history-gold/20 w-1/4">Pembeda</th>
                                <th className="p-4 border border-history-gold/20 w-1/3">BPUPKI</th>
                                <th className="p-4 border border-history-gold/20 w-1/3">PPKI</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            {/* Row 1 */}
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Tugas Utama</td>
                                <td className="p-4 border border-history-gold/20 align-top">Merancang dasar negara dan UUD</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <textarea 
                                        value={act2PpkiTugas} 
                                        onChange={e => setAct2PpkiTugas(e.target.value)} 
                                        className="w-full h-20 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                            </tr>
                             {/* Row 2 */}
                             <tr className="bg-[#0a0a0a]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Keanggotaan</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act2BpupkiAnggota} 
                                        onChange={e => setAct2BpupkiAnggota(e.target.value)} 
                                        className="w-full h-20 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">Mewakili seluruh wilayah Indonesia (Sabang-Merauke)</td>
                            </tr>
                             {/* Row 3 */}
                             <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Makna bagi Kemerdekaan</td>
                                <td className="p-4 border border-history-gold/20 align-top">Sebagai "Arsitek" (Perancang)</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <div className="flex items-center">
                                        <span className="mr-2">Sebagai</span>
                                        <input 
                                            type="text"
                                            value={act2PpkiMakna} 
                                            onChange={e => setAct2PpkiMakna(e.target.value)} 
                                            className="w-full bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none" 
                                            placeholder="..."
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aktivitas 3 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Aktivitas 3: Refleksi Deep Learning (HOTS)</h4>
                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/10">
                    <p className="text-history-brown text-sm mb-4 font-bold leading-relaxed">
                        "Seandainya Jepang tidak pernah membentuk PETA dan BPUPKI, menurut pendapatmu, apakah Indonesia akan tetap merdeka pada tahun 1945? Jelaskan alasan logismu!"
                    </p>
                    <textarea 
                        value={act3Refleksi} 
                        onChange={e => setAct3Refleksi(e.target.value)} 
                        className="w-full h-32 bg-[#171717] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                        placeholder="Tuliskan pendapat kritismu di sini..."
                    ></textarea>
                </div>
            </div>

        </div>
    );
};

// --- QUIZ TOPIC 3 ---
export const QuizGate: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Mengapa pembentukan tentara PETA oleh Jepang disebut sebagai 'Senjata Makan Tuan'?",
            options: [
                "Karena PETA menyerang Jepang sejak awal dibentuk",
                "Karena PETA memberikan bekal militer bagi pemuda untuk melawan Sekutu dan kelak melawan Belanda",
                "Karena PETA bekerjasama dengan Belanda",
                "Karena senjata PETA dibeli dari Jepang"
            ],
            answerIndex: 1
        },
        {
            question: "Apa perbedaan mendasar antara BPUPKI dan PPKI dari segi keanggotaan?",
            options: [
                "BPUPKI orang Jepang, PPKI orang Indonesia",
                "BPUPKI didominasi orang Jawa, PPKI representasi seluruh Nusantara",
                "BPUPKI anggotanya sedikit, PPKI anggotanya ribuan",
                "Tidak ada perbedaan"
            ],
            answerIndex: 1
        },
        {
            question: "Sikap para pendiri bangsa yang menghapus '7 kata' (Syariat Islam) dalam Piagam Jakarta menunjukkan nilai...",
            options: [
                "Menyerah pada keadaan",
                "Takut pada ancaman",
                "Jiwa besar dan mengutamakan persatuan bangsa",
                "Ketidakpedulian pada agama"
            ],
            answerIndex: 2
        },
        {
            question: "Kapan BPUPKI dibentuk oleh pemerintah pendudukan Jepang?",
            options: ["17 Agustus 1945", "1 Maret 1945", "1 Juni 1945", "7 Agustus 1945"],
            answerIndex: 1
        },
        {
            question: "Siapakah ketua dari BPUPKI?",
            options: ["Ir. Soekarno", "Drs. Moh. Hatta", "Dr. Radjiman Wedyodiningrat", "Sutan Sjahrir"],
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
            setScore(score + 20); // 5 soal x 20
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
                <div className="h-px w-20 bg-history-gold/50 mx-auto mb-4"></div>
                <p className="mb-6 text-history-muted italic font-light">
                    {score >= 80 
                        ? "Sangat Bagus! Anda memahami proses krusial menuju kemerdekaan." 
                        : "Jangan menyerah. Baca kembali materi tentang BPUPKI dan PPKI ya."}
                </p>
                <button onClick={restart} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs">
                    Ulangi Kuis
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#171717] p-8 rounded-lg shadow-lg border border-history-gold/10">
            <div className="mb-6 flex justify-between items-center text-xs font-bold text-history-muted uppercase tracking-widest">
                <span>Soal {currentQ + 1} dari {questions.length}</span>
                <span className="text-history-gold">Skor: {score}</span>
            </div>
            
            <h3 className="font-bold text-lg mb-8 text-history-brown leading-relaxed">
                {questions[currentQ].question}
            </h3>
            
            <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 border rounded transition-all duration-200 flex justify-between items-center group
                            ${selectedOption === idx 
                                ? (idx === questions[currentQ].answerIndex ? 'bg-emerald-900/30 border-emerald-500 text-emerald-100' : 'bg-rose-900/30 border-rose-500 text-rose-100')
                                : 'bg-[#0a0a0a] border-history-gold/10 hover:border-history-gold/50 text-history-muted hover:bg-[#1c1c1c]'
                            }
                        `}
                    >
                        <span className="font-light">{opt}</span>
                        {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check-circle text-emerald-500 text-lg"></i>}
                        {isAnswered && selectedOption === idx && idx !== questions[currentQ].answerIndex && <i className="fas fa-times-circle text-rose-500 text-lg"></i>}
                    </button>
                ))}
            </div>
            
            {isAnswered && (
                <div className="mt-8 text-right animate-fade-in">
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded shadow hover:bg-[#c5a028] transition transform hover:translate-x-1 font-bold uppercase tracking-widest text-xs">
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Pertanyaan Selanjutnya"} <i className="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            )}
        </div>
    );
};