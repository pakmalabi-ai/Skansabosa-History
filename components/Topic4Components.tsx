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

// --- QUIZ TOPIC 4 ---
export const QuizProklamasi: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Siapakah tokoh yang mengetik naskah proklamasi agar terlihat rapi dan resmi?",
            options: ["Sayuti Melik", "B.M. Diah", "Sukarni", "Ahmad Soebardjo"],
            answerIndex: 0
        },
        {
            question: "Di manakah perumusan naskah proklamasi dilakukan pada malam 16 Agustus 1945?",
            options: ["Rumah Soekarno", "Markas PETA Rengasdengklok", "Rumah Laksamana Maeda", "Gedung Chuo Sangi In"],
            answerIndex: 2
        },
        {
            question: "Apa alasan utama golongan muda menculik Soekarno-Hatta ke Rengasdengklok?",
            options: [
                "Agar Soekarno-Hatta beristirahat",
                "Menjauhkan mereka dari pengaruh Jepang dan mendesak proklamasi segera",
                "Untuk berunding dengan pihak Sekutu",
                "Menghindari serangan Belanda"
            ],
            answerIndex: 1
        },
        {
            question: "Siapakah yang mengibarkan bendera Merah Putih saat upacara proklamasi?",
            options: ["Soekarno & Hatta", "Latief Hendraningrat & Suhud", "Wikana & Darwis", "Fatmawati & S.K. Trimurti"],
            answerIndex: 1
        },
        {
            question: "Kalimat pertama dalam naskah proklamasi yang berbunyi 'Kami bangsa Indonesia dengan ini menyatakan Kemerdekaan Indonesia' adalah sumbangan pemikiran dari...",
            options: ["Moh. Hatta", "Soekarno", "Ahmad Soebardjo", "Sukarni"],
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
            <div className="bg-[#171717] p-8 rounded-lg shadow-lg border border-history-gold/30 text-center animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 font-sans text-history-brown uppercase tracking-widest">Hasil Evaluasi</h3>
                <div className="text-6xl font-black text-history-gold mb-2">{score}</div>
                <div className="h-px w-20 bg-history-gold/50 mx-auto mb-4"></div>
                <p className="mb-6 text-history-muted italic font-light">
                    {score >= 80 
                        ? "Luar Biasa! Anda menguasai detik-detik sejarah bangsa." 
                        : "Tetap semangat. Pelajari kembali momen-momen penting tersebut."}
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
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Lanjut"} <i className="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            )}
        </div>
    );
};