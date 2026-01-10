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

// --- QUIZ TOPIC 3 (FULL EVALUATION SYSTEM) ---
export const QuizGate: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Apa alasan utama Jepang menggunakan slogan \"Saudara Tua\" saat pertama kali datang ke Indonesia?",
            options: [
                "A. Karena Jepang dan Indonesia memiliki nenek moyang yang sama",
                "B. Untuk menarik simpati rakyat agar mendukung Jepang dalam Perang Pasifik",
                "C. Karena letak geografis Jepang yang dekat dengan Indonesia",
                "D. Untuk menyebarkan budaya Jepang di Indonesia",
                "E. Karena Jepang ingin memberikan kemerdekaan secara tulus"
            ],
            correct: 1 // B
        },
        {
            id: 2,
            question: "Organisasi bentukan Jepang yang dipimpin oleh \"Empat Serangkai\" (Soekarno, Hatta, Ki Hajar Dewantara, Mas Mansyur) adalah...",
            options: [
                "A. Jawa Hokokai",
                "B. PETA",
                "C. Putera (Pusat Tenaga Rakyat)",
                "D. Heiho",
                "E. Seinendan"
            ],
            correct: 2 // C
        },
        {
            id: 3,
            question: "Dampak negatif pendudukan Jepang yang paling menyengsarakan rakyat, di mana rakyat dipaksa bekerja tanpa upah dan jaminan kesehatan untuk kubu pertahanan, disebut...",
            options: [
                "A. Romusha",
                "B. Rodi",
                "C. Kerja Wajib",
                "D. Kinrohosi",
                "E. Seikerei"
            ],
            correct: 0 // A
        },
        {
            id: 4,
            question: "Mengapa pembentukan PETA (Pembela Tanah Air) oleh Jepang dianggap sebagai \"pedang bermata dua\"?",
            options: [
                "A. Karena PETA menggunakan senjata buatan Belanda",
                "B. Karena PETA dilatih untuk menyerang Sekutu saja",
                "C. Karena PETA memberikan bekal militer bagi pemuda yang kelak digunakan melawan Jepang sendiri",
                "D. Karena anggota PETA digaji sangat tinggi oleh Jepang",
                "E. Karena PETA dipimpin langsung oleh Kaisar Jepang"
            ],
            correct: 2 // C
        },
        {
            id: 5,
            question: "Janji kemerdekaan Jepang kepada Indonesia \"di kemudian hari\" yang disampaikan pada tahun 1944 dikenal dengan sebutan...",
            options: [
                "A. Janji Koiso",
                "B. Deklarasi Tokyo",
                "C. Perjanjian Kalijati",
                "D. Piagam Jakarta",
                "E. Maklumat Nippon"
            ],
            correct: 0 // A
        },
        {
            id: 6,
            question: "Badan yang dibentuk pada tanggal 1 Maret 1945 untuk menyelidiki usaha-usaha persiapan kemerdekaan adalah...",
            options: [
                "A. PPKI",
                "B. BPUPKI",
                "C. KNIP",
                "D. Chuo Sangi In",
                "E. Masyumi"
            ],
            correct: 1 // B
        },
        {
            id: 7,
            question: "Istilah bahasa Jepang untuk BPUPKI adalah...",
            options: [
                "A. Dokuritsu Junbi Inkai",
                "B. Jawa Hokokai",
                "C. Dokuritsu Junbi Cosakai",
                "D. Hakko Ichiu",
                "E. Kaigun"
            ],
            correct: 2 // C
        },
        {
            id: 8,
            question: "Tokoh yang menjabat sebagai ketua BPUPKI adalah...",
            options: [
                "A. Ir. Soekarno",
                "B. Drs. Moh. Hatta",
                "C. Mr. Soepomo",
                "D. dr. K.R.T. Radjiman Wedyodiningrat",
                "E. Mr. Ahmad Soebardjo"
            ],
            correct: 3 // D
        },
        {
            id: 9,
            question: "Agenda utama Sidang Pertama BPUPKI (29 Mei - 1 Juni 1945) adalah membahas tentang...",
            options: [
                "A. Rancangan UUD",
                "B. Pemilihan Presiden",
                "C. Dasar Negara Indonesia Merdeka",
                "D. Wilayah Negara",
                "E. Bentuk Negara"
            ],
            correct: 2 // C
        },
        {
            id: 10,
            question: "Pada tanggal 1 Juni 1945, Ir. Soekarno menyampaikan pidato tentang usulan dasar negara yang diberi nama...",
            options: [
                "A. Eka Sila",
                "B. Trisila",
                "C. Sapta Marga",
                "D. Pancasila",
                "E. Piagam Jakarta"
            ],
            correct: 3 // D
        },
        {
            id: 11,
            question: "Panitia Sembilan berhasil merumuskan sebuah dokumen kesepakatan dasar negara pada tanggal 22 Juni 1945 yang dikenal dengan nama...",
            options: [
                "A. UUD 1945",
                "B. Piagam Jakarta (Jakarta Charter)",
                "C. Dasasila Bandung",
                "D. Teks Proklamasi",
                "E. Sumpah Pemuda"
            ],
            correct: 1 // B
        },
        {
            id: 12,
            question: "Perbedaan mendasar antara rumusan Pancasila dalam Piagam Jakarta dengan Pembukaan UUD 1945 yang sah terletak pada...",
            options: [
                "A. Sila Kedua",
                "B. Sila Ketiga",
                "C. Sila Keempat",
                "D. Sila Kelima",
                "E. Sila Pertama"
            ],
            correct: 4 // E
        },
        {
            id: 13,
            question: "Setelah tugas BPUPKI dianggap selesai, Jepang membubarkannya dan membentuk...",
            options: [
                "A. PPKI",
                "B. KNIP",
                "C. PETA",
                "D. BKR",
                "E. TKR"
            ],
            correct: 0 // A
        },
        {
            id: 14,
            question: "Ketua dan Wakil Ketua PPKI adalah...",
            options: [
                "A. Radjiman Wedyodiningrat dan Soekarno",
                "B. Soekarno dan Moh. Hatta",
                "C. Moh. Hatta dan Ahmad Soebardjo",
                "D. Soekarno dan Soepomo",
                "E. Soepomo dan Yamin"
            ],
            correct: 1 // B
        },
        {
            id: 15,
            question: "Apa arti dari kondisi \"Vacuum of Power\" yang terjadi pada pertengahan Agustus 1945 di Indonesia?",
            options: [
                "A. Kekuasaan Jepang sedang berada di puncak",
                "B. Belanda kembali menguasai Indonesia",
                "C. Kekosongan kekuasaan karena Jepang menyerah tapi Sekutu belum datang",
                "D. Perebutan kekuasaan antara Golongan Tua dan Muda",
                "E. Indonesia sudah memiliki pemerintahan yang sah"
            ],
            correct: 2 // C
        },
        {
            id: 16,
            question: "Berikut ini adalah hasil keputusan Sidang PPKI tanggal 18 Agustus 1945, KECUALI...",
            options: [
                "A. Mengesahkan UUD 1945",
                "B. Memilih Presiden dan Wakil Presiden",
                "C. Membentuk Komite Nasional (KNIP)",
                "D. Membentuk Badan Keamanan Rakyat (BKR)",
                "E. Menetapkan Pancasila sebagai dasar negara (dalam Pembukaan UUD)"
            ],
            correct: 3 // D (Note: BKR dibentuk tanggal 22 Agustus)
        },
        {
            id: 17,
            question: "Penghapusan tujuh kata \"...dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya\" menunjukkan sikap para pendiri bangsa yang mengutamakan...",
            options: [
                "A. Kepentingan pribadi",
                "B. Kepentingan golongan mayoritas",
                "C. Persatuan dan Kesatuan Bangsa",
                "D. Tekanan dari Jepang",
                "E. Keinginan Belanda"
            ],
            correct: 2 // C
        },
        {
            id: 18,
            question: "Pemilihan Presiden dan Wakil Presiden pertama Indonesia dilakukan secara...",
            options: [
                "A. Pemilihan Umum (Pemilu)",
                "B. Penunjukan langsung oleh Jepang",
                "C. Aklamasi (Persetujuan bulat)",
                "D. Voting tertutup",
                "E. Undian"
            ],
            correct: 2 // C
        },
        {
            id: 19,
            question: "Tugas utama Komite Nasional Indonesia Pusat (KNIP) yang dibentuk pada awal kemerdekaan adalah...",
            options: [
                "A. Menggantikan peran Presiden",
                "B. Membantu tugas Presiden sebelum terbentuknya DPR/MPR",
                "C. Menyusun UUD baru",
                "D. Melucuti senjata tentara Jepang",
                "E. Melawan tentara Sekutu"
            ],
            correct: 1 // B
        },
        {
            id: 20,
            question: "Nilai karakter yang dapat diteladani dari peristiwa perumusan dasar negara dalam sidang BPUPKI dan PPKI adalah...",
            options: [
                "A. Sikap mau menang sendiri",
                "B. Semangat primordialisme (kesukuan)",
                "C. Jiwa toleransi dan musyawarah mufakat",
                "D. Ketergantungan pada bangsa asing",
                "E. Sikap individualisme"
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
                    <h2>Topik: Menuju Gerbang Kemerdekaan</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Menuju Gerbang Kemerdekaan (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Menuju Gerbang Kemerdekaan</p>
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