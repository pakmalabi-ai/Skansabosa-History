import React, { useState } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 4 ---
export const MindfulnessProklamasi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Pejamkan mata sejenak...",
        "Bayangkan hari itu, 17 Agustus 1945, di pagi yang cerah bulan Ramadhan.",
        "Rasakan debar jantung para pemuda yang menjaga rumah Bung Karno.",
        "Tarik napas... rasakan ketegangan bercampur harapan yang membuncah.",
        "Hembuskan... lepaskan ketakutan akan bayonet Jepang.",
        "Hari ini, nasib bangsa akan berubah selamanya."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border border-history-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)] transition-all duration-500 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-history-gold to-transparent opacity-50"></div>
            
            <i className="fas fa-microphone-alt text-history-gold text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-history-gold text-history-gold px-8 py-2 rounded-full hover:bg-history-gold hover:text-[#0a0a0a] transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Lanjut <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-red text-white px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    MERDEKA!
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: MISI RENGASDENGKLOK ---
interface Scene {
    id: number;
    title: string;
    desc: string;
    choices: { text: string; next: number }[];
}

export const ProklamasiSimulation: React.FC = () => {
    const [currentSceneId, setCurrentSceneId] = useState(0);
    const [history, setHistory] = useState<number[]>([0]);

    const scenes: Record<number, Scene> = {
        0: {
            id: 0,
            title: "15 Agustus 1945: Kabar Rahasia",
            desc: "Kamu adalah seorang pemuda yang bekerja di kantor berita Domei. Kamu mendengar siaran radio asing bahwa Jepang telah menyerah pada Sekutu. Soekarno belum tahu hal ini.",
            choices: [
                { text: "Segera temui Soekarno & Hatta di Pegangsaan.", next: 1 },
                { text: "Tunggu konfirmasi resmi dari tentara Jepang.", next: 99 }
            ]
        },
        1: {
            id: 1,
            title: "Debat Panas",
            desc: "Di rumah Soekarno, terjadi perdebatan. Soekarno menolak proklamasi tergesa-gesa: 'Kita tidak boleh memancing pertumpahan darah, harus lewat PPKI'. Kamu frustrasi.",
            choices: [
                { text: "Patuhi Soekarno, dia pemimpin yang bijak.", next: 98 },
                { text: "Culika Soekarno-Hatta untuk menjauhkan dari pengaruh Jepang!", next: 2 }
            ]
        },
        2: {
            id: 2,
            title: "Penculikan ke Rengasdengklok",
            desc: "Dini hari, 16 Agustus. Kamu dan kawan-kawan membawa Dwitunggal ke Rengasdengklok, markas PETA. Di sini aman. Ahmad Soebardjo dari Jakarta datang menjemput.",
            choices: [
                { text: "Lepaskan mereka hanya jika ada jaminan Proklamasi besok.", next: 3 },
                { text: "Tahan terus sampai Jepang benar-benar pergi.", next: 97 }
            ]
        },
        3: {
            id: 3,
            title: "Malam Perumusan (Rumah Maeda)",
            desc: "16 Agustus malam. Naskah selesai disusun. Sekarang, siapa yang harus menandatanganinya? Ada usulan agar semua yang hadir tanda tangan.",
            choices: [
                { text: "Setuju, agar semua merasa memiliki.", next: 96 },
                { text: "Tolak! Cukup Soekarno-Hatta atas nama Bangsa Indonesia.", next: 4 }
            ]
        },
        4: {
            id: 4,
            title: "17 Agustus 1945: MERDEKA!",
            desc: "Pukul 10.00 WIB. Bendera Merah Putih berkibar. Indonesia Merdeka! Keputusan beranimu mengubah sejarah.",
            choices: []
        },
        // Fail States
        99: { id: 99, title: "Terlambat!", desc: "Sekutu mendarat sebelum kita proklamasi. Belanda kembali berkuasa. Momen emas hilang.", choices: [] },
        98: { id: 98, title: "Hadiah Jepang", desc: "Proklamasi dilakukan lewat PPKI. Dunia menganggap kemerdekaan kita adalah hadiah Jepang, bukan perjuangan. Posisi diplomasi lemah.", choices: [] },
        97: { id: 97, title: "Konflik Internal", desc: "Terjadi perpecahan antara pemuda dan golongan tua. Jepang mencium keberadaan kalian. Semua ditangkap.", choices: [] },
        96: { id: 96, title: "Dokumen Biasa", desc: "Naskah terlihat seperti piagam biasa karena terlalu banyak tanda tangan. Kurang sakral dan berwibawa.", choices: [] }
    };

    const handleChoice = (nextId: number) => {
        setCurrentSceneId(nextId);
        setHistory([...history, nextId]);
    };

    const resetGame = () => {
        setCurrentSceneId(0);
        setHistory([0]);
    };

    const currentScene = scenes[currentSceneId];
    const isEnd = currentScene.choices.length === 0;
    const isWin = currentSceneId === 4;

    return (
        <div className="bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20 flex flex-col md:flex-row min-h-[500px]">
            {/* Visual Side */}
            <div className={`md:w-1/3 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden ${isWin ? 'bg-history-gold/10' : 'bg-[#0a0a0a]'}`}>
                <div className="text-8xl mb-6 opacity-80 scale-110">
                    {isWin ? '🇮🇩' : isEnd ? '🥀' : '📜'}
                </div>
                <h4 className="font-bold text-history-gold uppercase tracking-widest text-sm mb-2">Status Misi</h4>
                <div className={`px-4 py-1 rounded text-xs font-bold uppercase ${isWin ? 'bg-emerald-900 text-emerald-100' : isEnd ? 'bg-history-red text-white' : 'bg-history-gold text-[#0a0a0a]'}`}>
                    {isWin ? 'SELESAI' : isEnd ? 'GAGAL' : 'BERLANGSUNG'}
                </div>
            </div>

            {/* Content Side */}
            <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                    <span className="text-history-muted text-xs font-bold uppercase tracking-widest block mb-2">Scene {history.length}</span>
                    <h3 className="text-3xl font-sans font-bold text-history-brown mb-4">{currentScene.title}</h3>
                    <p className="text-lg text-history-muted font-light leading-relaxed">{currentScene.desc}</p>
                </div>

                <div className="space-y-4">
                    {currentScene.choices.map((choice, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChoice(choice.next)}
                            className="w-full text-left p-5 border border-history-gold/20 rounded-lg hover:bg-history-gold hover:text-[#0a0a0a] hover:border-history-gold transition-all group"
                        >
                            <span className="font-bold mr-3 opacity-50 group-hover:opacity-100">{String.fromCharCode(65 + idx)}.</span>
                            {choice.text}
                        </button>
                    ))}

                    {isEnd && (
                        <button 
                            onClick={resetGame}
                            className={`px-8 py-3 rounded font-bold uppercase tracking-widest text-xs transition ${isWin ? 'bg-history-gold text-[#0a0a0a] hover:bg-white' : 'bg-history-red text-white hover:bg-red-700'}`}
                        >
                            {isWin ? 'Mainkan Lagi' : 'Coba Lagi'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- LKPD TOPIC 4 ---
export const LKPDTopic4: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));

    // Activity 1: Analisis Kausalitas
    const [act1MudaTokoh, setAct1MudaTokoh] = useState('');
    const [act1TuaTokoh, setAct1TuaTokoh] = useState('');
    const [act1MudaAlasan, setAct1MudaAlasan] = useState('');
    const [act1TuaAlasan, setAct1TuaAlasan] = useState('');
    const [act1MudaSolusi, setAct1MudaSolusi] = useState('');
    const [act1TuaSolusi, setAct1TuaSolusi] = useState('');

    // Activity 2: Analisis Kebijakan
    const [act2UUD, setAct2UUD] = useState('');
    const [act2Presiden, setAct2Presiden] = useState('');

    // Activity 3: Refleksi
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
                <div class="sub-header">Topik: Menganalisis Peristiwa Proklamasi</div>
                
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
                    <h3>PETUNJUK KERJA:</h3>
                    <ol style="font-size: 14px;">
                        <li>Diskusikan dengan teman sekelompokmu dengan penuh semangat (<em>Joyful</em>).</li>
                        <li>Gunakan HP/Buku untuk mencari jawaban (<em>TPACK</em>).</li>
                        <li>Isilah tabel/bagan berikut dengan kritis (<em>HOTS</em>).</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>Aktivitas 1: Analisis Kausalitas (Sebab-Akibat)</h3>
                    <p class="instruction">Hubungkan Peristiwa Rengasdengklok dengan Proklamasi!</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">Aspek</th>
                                <th width="40%">Golongan Muda</th>
                                <th width="40%">Golongan Tua</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Tokoh Utama</strong></td>
                                <td>${act1MudaTokoh}</td>
                                <td>${act1TuaTokoh}</td>
                            </tr>
                             <tr>
                                <td><strong>Alasan/Pendapat</strong></td>
                                <td>${act1MudaAlasan}</td>
                                <td>${act1TuaAlasan}</td>
                            </tr>
                             <tr>
                                <td><strong>Solusi/Hasil Akhir</strong></td>
                                <td>${act1MudaSolusi}</td>
                                <td>${act1TuaSolusi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="section">
                    <h3>Aktivitas 2: Analisis Kebijakan (Hasil PPKI)</h3>
                    <p class="instruction">Bagaimana hasil sidang PPKI mempengaruhi struktur negara kita saat ini?</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="40%">Hasil Sidang PPKI 18 Agustus</th>
                                <th width="60%">Relevansi dengan Indonesia Saat Ini (Masih ada/Berubah?)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Pengesahan UUD 1945</strong></td>
                                <td>${act2UUD}</td>
                            </tr>
                             <tr>
                                <td><strong>Pemilihan Presiden</strong></td>
                                <td>${act2Presiden}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="section">
                    <h3>Aktivitas 3: Refleksi "Meaningful"</h3>
                    <p><strong>"Jika kalian adalah pemuda di tahun 1945, peran apa yang akan kalian ambil untuk mendukung kemerdekaan? Mengapa?"</strong></p>
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
        window.open('https://forms.gle/DGLgurxHz4YsEFTo8', '_blank');
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
                    <li>Diskusikan dengan teman sekelompokmu dengan penuh semangat (<em>Joyful</em>).</li>
                    <li>Gunakan HP/Buku untuk mencari jawaban (<em>TPACK</em>).</li>
                    <li>Isilah tabel/bagan berikut dengan kritis (<em>HOTS</em>).</li>
                </ol>
            </div>

            {/* Aktivitas 1 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Aktivitas 1: Analisis Kausalitas (Sebab-Akibat)</h4>
                <p className="text-history-muted text-sm mb-4 italic">Hubungkan Peristiwa Rengasdengklok dengan Proklamasi!</p>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-history-gold/20">
                        <thead>
                            <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                <th className="p-4 border border-history-gold/20 w-1/5">Aspek</th>
                                <th className="p-4 border border-history-gold/20 w-2/5">Golongan Muda</th>
                                <th className="p-4 border border-history-gold/20 w-2/5">Golongan Tua</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Tokoh Utama</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1MudaTokoh} 
                                        onChange={e => setAct1MudaTokoh(e.target.value)} 
                                        className="w-full h-16 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1TuaTokoh} 
                                        onChange={e => setAct1TuaTokoh(e.target.value)} 
                                        className="w-full h-16 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                            </tr>
                             <tr className="bg-[#0a0a0a]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Alasan/Pendapat</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1MudaAlasan} 
                                        onChange={e => setAct1MudaAlasan(e.target.value)} 
                                        className="w-full h-24 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1TuaAlasan} 
                                        onChange={e => setAct1TuaAlasan(e.target.value)} 
                                        className="w-full h-24 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                            </tr>
                             <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Solusi/Hasil Akhir</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1MudaSolusi} 
                                        onChange={e => setAct1MudaSolusi(e.target.value)} 
                                        className="w-full h-20 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act1TuaSolusi} 
                                        onChange={e => setAct1TuaSolusi(e.target.value)} 
                                        className="w-full h-20 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aktivitas 2 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Aktivitas 2: Analisis Kebijakan (Hasil PPKI)</h4>
                <p className="text-history-muted text-sm mb-4 italic">Bagaimana hasil sidang PPKI mempengaruhi struktur negara kita saat ini?</p>
                
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-history-gold/20">
                        <thead>
                            <tr className="bg-[#0a0a0a] text-history-brown text-sm">
                                <th className="p-4 border border-history-gold/20 w-1/3">Hasil Sidang PPKI 18 Agustus</th>
                                <th className="p-4 border border-history-gold/20 w-2/3">Relevansi dengan Indonesia Saat Ini (Masih ada/Berubah?)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-history-muted">
                            <tr className="bg-[#171717]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Pengesahan UUD 1945</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                    <textarea 
                                        value={act2UUD} 
                                        onChange={e => setAct2UUD(e.target.value)} 
                                        className="w-full h-20 bg-[#0a0a0a] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                            </tr>
                             <tr className="bg-[#0a0a0a]">
                                <td className="p-4 border border-history-gold/20 align-top font-bold text-history-gold">Pemilihan Presiden</td>
                                <td className="p-4 border border-history-gold/20 align-top">
                                     <textarea 
                                        value={act2Presiden} 
                                        onChange={e => setAct2Presiden(e.target.value)} 
                                        className="w-full h-20 bg-[#171717] border border-history-muted/20 rounded p-2 text-history-brown focus:border-history-gold outline-none resize-none" 
                                        placeholder="..."
                                    ></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Aktivitas 3 */}
            <div className="mb-10 animate-fade-in">
                <h4 className="text-lg font-bold text-history-gold mb-2 pl-3 border-l-4 border-history-red">Aktivitas 3: Refleksi "Meaningful"</h4>
                <div className="bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/10">
                    <p className="text-history-brown text-sm mb-4 font-bold leading-relaxed">
                        "Jika kalian adalah pemuda di tahun 1945, peran apa yang akan kalian ambil untuk mendukung kemerdekaan? Mengapa?"
                    </p>
                    <textarea 
                        value={act3Refleksi} 
                        onChange={e => setAct3Refleksi(e.target.value)} 
                        className="w-full h-32 bg-[#171717] border border-history-muted/20 rounded p-3 text-history-brown focus:border-history-gold outline-none"
                        placeholder="Tuliskan refleksimu di sini..."
                    ></textarea>
                </div>
            </div>

        </div>
    );
};

// --- QUIZ TOPIC 4 (FULL EVALUATION SYSTEM) ---
export const QuizProklamasi: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Latar belakang utama terjadinya peristiwa Rengasdengklok adalah adanya perbedaan pendapat antara golongan tua dan golongan muda mengenai...",
            options: [
                "A. Tokoh yang akan menandatangani teks proklamasi",
                "B. Tempat pelaksanaan proklamasi kemerdekaan",
                "C. Waktu dan cara pelaksanaan proklamasi kemerdekaan",
                "D. Bentuk negara Indonesia setelah merdeka",
                "E. Penyusunan dasar negara Indonesia"
            ],
            correct: 2 // C based on key
        },
        {
            id: 2,
            question: "Kondisi vacuum of power (kekosongan kekuasaan) di Indonesia terjadi karena...",
            options: [
                "A. Jepang menyerah tanpa syarat kepada Sekutu dan Sekutu belum tiba di Indonesia",
                "B. Soekarno dan Hatta sedang berada di Dalat, Vietnam",
                "C. Tentara PETA dibubarkan oleh pemerintah Jepang",
                "D. Belanda kembali masuk ke Indonesia membonceng NICA",
                "E. Pemerintah Jepang memberikan kemerdekaan lebih awal"
            ],
            correct: 0 // A based on key
        },
        {
            id: 3,
            question: "Alasan para pemuda membawa Ir. Soekarno dan Drs. Moh. Hatta ke Rengasdengklok adalah...",
            options: [
                "A. Untuk menjauhkan mereka dari pengaruh Jepang agar segera memproklamasikan kemerdekaan",
                "B. Melindungi mereka dari ancaman tentara Sekutu yang akan mendarat",
                "C. Memaksa mereka untuk menandatangani Piagam Jakarta",
                "D. Mengadakan perundingan dengan pihak Jepang di tempat netral",
                "E. Menyusun strategi perang gerilya melawan Jepang"
            ],
            correct: 0 // A based on key
        },
        {
            id: 4,
            question: "Tokoh golongan tua yang menjemput Ir. Soekarno dan Drs. Moh. Hatta di Rengasdengklok serta menjaminkan nyawanya bahwa proklamasi akan dilaksanakan selambat-lambatnya tanggal 17 Agustus 1945 adalah...",
            options: [
                "A. Mr. Soepomo",
                "B. Dr. Radjiman Wedyodiningrat",
                "C. Mr. Achmad Soebardjo",
                "D. Sutan Sjahrir",
                "E. Wikana"
            ],
            correct: 2 // C based on key
        },
        {
            id: 5,
            question: "Perumusan naskah teks proklamasi dilakukan di rumah seorang perwira tinggi Angkatan Laut Jepang yang bersimpati pada perjuangan Indonesia, yaitu...",
            options: [
                "A. Jenderal Terauchi",
                "B. Laksamana Tadashi Maeda",
                "C. Jenderal Kumakichi Harada",
                "D. Marsekal Hitoshi Imamura",
                "E. Kaisar Hirohito"
            ],
            correct: 1 // B based on key
        },
        {
            id: 6,
            question: "Kalimat pertama pada teks proklamasi yang berbunyi \"Kami bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia\" merupakan sumbangan pemikiran dari...",
            options: [
                "A. Ir. Soekarno",
                "B. Drs. Moh. Hatta",
                "C. Mr. Achmad Soebardjo",
                "D. Sayuti Melik",
                "E. Sukarni"
            ],
            correct: 2 // C based on key
        },
        {
            id: 7,
            question: "Usulan agar teks proklamasi ditandatangani oleh Ir. Soekarno dan Drs. Moh. Hatta atas nama bangsa Indonesia disampaikan oleh...",
            options: [
                "A. B.M. Diah",
                "B. Sayuti Melik",
                "C. Chaerul Saleh",
                "D. Sukarni",
                "E. Sudiro"
            ],
            correct: 3 // D based on key
        },
        {
            id: 8,
            question: "Tokoh yang mengetik naskah proklamasi dan melakukan perubahan redaksi pada teks tersebut adalah...",
            options: [
                "A. B.M. Diah",
                "B. Sayuti Melik",
                "C. Jusuf Kunto",
                "D. Muwardi",
                "E. Latief Hendraningrat"
            ],
            correct: 1 // B based on key
        },
        {
            id: 9,
            question: "Pelaksanaan pembacaan teks proklamasi kemerdekaan Indonesia pada tanggal 17 Agustus 1945 berlangsung di...",
            options: [
                "A. Lapangan Ikada",
                "B. Rumah Laksamana Maeda",
                "C. Jalan Pegangsaan Timur No. 56",
                "D. Istana Merdeka",
                "E. Rengasdengklok"
            ],
            correct: 2 // C based on key
        },
        {
            id: 10,
            question: "Makna proklamasi kemerdekaan Indonesia dari aspek politik adalah...",
            options: [
                "A. Bangsa Indonesia dapat mengelola sumber daya alam sendiri",
                "B. Tumbuhnya persatuan dan kesatuan bangsa",
                "C. Indonesia memiliki kedaulatan penuh untuk menentukan nasibnya sendiri sebagai negara merdeka",
                "D. Hapusnya diskriminasi rasial dalam masyarakat",
                "E. Munculnya kesempatan pendidikan bagi seluruh rakyat"
            ],
            correct: 2 // C based on key
        },
        {
            id: 11,
            question: "Pada sidang PPKI tanggal 18 Agustus 1945, terjadi kesepakatan untuk mengubah sila pertama Piagam Jakarta menjadi \"Ketuhanan Yang Maha Esa\". Alasan utama perubahan ini adalah...",
            options: [
                "A. Tekanan dari pemerintah pendudukan Jepang",
                "B. Demi menjaga persatuan dan kesatuan bangsa Indonesia dari Sabang sampai Merauke",
                "C. Agar lebih mudah dihafalkan oleh rakyat",
                "D. Menghindari intervensi dari pihak Sekutu",
                "E. Mengikuti saran dari golongan muda"
            ],
            correct: 1 // B based on key
        },
        {
            id: 12,
            question: "Berikut ini yang bukan merupakan hasil sidang PPKI pertama pada tanggal 18 Agustus 1945 adalah...",
            options: [
                "A. Mengesahkan UUD 1945",
                "B. Memilih Ir. Soekarno sebagai Presiden dan Drs. Moh. Hatta sebagai Wakil Presiden",
                "C. Membentuk Komite Nasional untuk membantu Presiden",
                "D. Membagi wilayah Indonesia menjadi 8 provinsi",
                "E. Menetapkan Pancasila sebagai dasar negara (tersirat dalam UUD)"
            ],
            correct: 3 // D based on key (Membagi wilayah adl hasil sidang tgl 19)
        },
        {
            id: 13,
            question: "Hasil sidang PPKI kedua pada tanggal 19 Agustus 1945 salah satunya adalah pembagian wilayah Indonesia menjadi...",
            options: [
                "A. 8 Provinsi",
                "B. 10 Provinsi",
                "C. 12 Provinsi",
                "D. 27 Provinsi",
                "E. 34 Provinsi"
            ],
            correct: 0 // A based on key
        },
        {
            id: 14,
            question: "Pengaruh proklamasi kemerdekaan terhadap bidang sosial adalah...",
            options: [
                "A. Dikeluarkannya mata uang ORI (Oeang Republik Indonesia)",
                "B. Dihapusnya penggolongan masyarakat (kasta) kelas 1, 2, dan 3 warisan kolonial",
                "C. Terbentuknya partai-partai politik baru",
                "D. Nasionalisasi perusahaan-perusahaan asing",
                "E. Dibentuknya Badan Keamanan Rakyat"
            ],
            correct: 1 // B based on key
        },
        {
            id: 15,
            question: "Salah satu dampak proklamasi di bidang pendidikan yang membedakannya dengan masa penjajahan adalah...",
            options: [
                "A. Pendidikan hanya diperuntukkan bagi kalangan bangsawan",
                "B. Sekolah menggunakan bahasa Belanda sebagai pengantar utama",
                "C. Pendidikan bertujuan mencerdaskan kehidupan bangsa tanpa memandang status sosial",
                "D. Kurikulum pendidikan berfokus pada pelatihan militer",
                "E. Pendidikan dikelola sepenuhnya oleh pihak swasta asing"
            ],
            correct: 2 // C based on key
        },
        {
            id: 16,
            question: "Mengapa golongan muda menolak proklamasi dilakukan melalui wadah PPKI?",
            options: [
                "A. Karena anggota PPKI terlalu banyak",
                "B. Karena PPKI belum siap bekerja",
                "C. Karena PPKI dianggap sebagai badan buatan Jepang, sehingga kemerdekaan akan dianggap sebagai \"hadiah\"",
                "D. Karena Soekarno menolak menjadi ketua PPKI",
                "E. Karena markas PPKI dijaga ketat oleh tentara Jepang"
            ],
            correct: 2 // C based on key
        },
        {
            id: 17,
            question: "\"Proklamasi merupakan titik puncak perjuangan bangsa Indonesia\". Maksud dari pernyataan tersebut adalah...",
            options: [
                "A. Setelah proklamasi, perjuangan bangsa Indonesia selesai sepenuhnya",
                "B. Proklamasi adalah akhir dari penderitaan rakyat akibat penjajahan",
                "C. Proklamasi merupakan hasil akhir dari rangkaian perjuangan melawan penjajah untuk mencapai kemerdekaan",
                "D. Tidak ada lagi ancaman dari negara asing setelah proklamasi",
                "E. Pembangunan nasional dimulai sebelum proklamasi"
            ],
            correct: 2 // C based on key
        },
        {
            id: 18,
            question: "Peran pers dan wartawan (seperti B.M. Diah) pasca proklamasi sangat penting, yaitu...",
            options: [
                "A. Menyembunyikan tokoh proklamator dari kejaran Jepang",
                "B. Menyebarluaskan berita proklamasi ke seluruh penjuru dunia dan rakyat Indonesia",
                "C. Mengambil alih senjata dari tentara Jepang",
                "D. Membentuk angkatan perang republik",
                "E. Menyusun struktur kabinet pemerintahan"
            ],
            correct: 1 // B based on key
        },
        {
            id: 19,
            question: "Secara de facto, Indonesia merdeka pada tanggal 17 Agustus 1945. Arti pengakuan de facto adalah...",
            options: [
                "A. Pengakuan berdasarkan hukum internasional",
                "B. Pengakuan resmi dari negara lain melalui hubungan diplomatik",
                "C. Pengakuan berdasarkan kenyataan atau fakta yang ada bahwa suatu negara telah berdiri",
                "D. Pengakuan yang diberikan oleh PBB",
                "E. Pengakuan dari negara penjajah sebelumnya"
            ],
            correct: 2 // C based on key
        },
        {
            id: 20,
            question: "Jika dikaitkan dengan kehidupan masa kini (Kontekstual), semangat peristiwa Rengasdengklok mengajarkan kita tentang pentingnya...",
            options: [
                "A. Memaksakan kehendak kepada orang tua",
                "B. Menggunakan kekerasan untuk mencapai tujuan",
                "C. Menunggu bantuan orang lain dalam menyelesaikan masalah",
                "D. Sinergi dan musyawarah antara generasi muda dan tua demi kepentingan bangsa",
                "E. Mengandalkan pihak asing untuk kemajuan negara"
            ],
            correct: 3 // D based on key
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
                    <h2>Sejarah Indonesia: Detik-Detik Proklamasi</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Detik-Detik Proklamasi (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Detik-Detik Proklamasi</p>
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