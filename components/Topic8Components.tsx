import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';

// --- MINDFULNESS TOPIC 8 ---
export const MindfulnessDemokrasi: React.FC = () => {
    const [step, setStep] = useState(0);
    const messages = [
        "Duduklah dengan nyaman, tegakkan punggungmu.",
        "Bayangkan sebuah negara di mana suaramu tidak berharga.",
        "Tarik napas... syukuri kebebasan berpendapat yang kita miliki saat ini.",
        "Hembuskan... lepaskan ego, karena demokrasi adalah tentang 'Kita', bukan 'Aku'.",
        "Generasi Emas, masa depan bangsa ada di tanganmu.",
        "Mari belajar sejarah demokrasi agar kita bijak menggunakan hak suara."
    ];

    const nextStep = () => {
        if (step < messages.length - 1) setStep(step + 1);
    };

    return (
        <div className="bg-[#0a0a0a] p-8 rounded-xl text-center border-l-4 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-500 relative overflow-hidden">
            <i className="fas fa-dove text-emerald-500 text-4xl mb-6 opacity-80 animate-pulse"></i>
            <p className="text-xl font-sans text-history-brown mb-8 min-h-[80px] flex items-center justify-center font-light leading-relaxed italic">
                "{messages[step]}"
            </p>
            {step < messages.length - 1 ? (
                <button 
                    onClick={nextStep}
                    className="group bg-transparent border border-emerald-500 text-emerald-500 px-8 py-2 rounded-full hover:bg-emerald-600 hover:text-white transition font-bold text-xs uppercase tracking-[0.2em]"
                >
                    Fokus <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </button>
            ) : (
                <button 
                    disabled 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-2 rounded-full cursor-default shadow-lg text-xs uppercase tracking-[0.2em] font-bold"
                >
                    SIAP BELAJAR
                </button>
            )}
        </div>
    );
};

// --- SIMULATION: THE DIPLOMAT 1945 ---
export const SystemSimulation: React.FC = () => {
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'RESULT'>('START');
    const [decision, setDecision] = useState<'presidensial' | 'parlementer' | null>(null);

    const handleChoice = (choice: 'presidensial' | 'parlementer') => {
        setDecision(choice);
        setGameState('RESULT');
    };

    const resetGame = () => {
        setGameState('START');
        setDecision(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-[#171717] rounded-xl shadow-2xl overflow-hidden border border-history-gold/20 flex flex-col md:flex-row min-h-[450px]">
            {/* Context Panel */}
            <div className="md:w-1/3 bg-[#0a0a0a] p-6 border-r border-history-gold/10 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-history-gold animate-pulse"></div>
                <h4 className="text-history-gold font-bold uppercase tracking-widest text-xs mb-4 flex items-center">
                    <i className="fas fa-calendar-alt mr-2"></i> 14 November 1945
                </h4>
                <div className="space-y-4 text-history-muted text-sm font-light">
                    <p><strong>Laporan Intelijen:</strong></p>
                    <p>Pasukan Sekutu (Inggris & Belanda) akan segera mendarat. Propaganda Belanda menyebarkan isu bahwa Republik Indonesia adalah negara boneka Jepang yang <strong>Fasis</strong> dan <strong>Otokrasi</strong>.</p>
                    <p>Alasannya: Kekuasaan negara menumpuk pada satu orang (Presiden Soekarno) sesuai UUD 1945 awal.</p>
                    <p className="italic border-l-2 border-history-red pl-2 text-history-brown">"Dunia Barat tidak menyukai Fasisme. Kita butuh pengakuan Internasional!"</p>
                </div>
            </div>

            {/* Action Panel */}
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
                {gameState === 'START' && (
                    <div className="text-center">
                        <i className="fas fa-balance-scale text-5xl text-history-gold mb-6"></i>
                        <h3 className="text-2xl font-bold text-history-brown mb-4">Dilema Sang Pendiri Bangsa</h3>
                        <p className="text-history-muted mb-8 font-light">
                            Sebagai penentu kebijakan, langkah apa yang akan Anda ambil untuk menyelamatkan citra Indonesia di mata dunia?
                        </p>
                        <div className="grid gap-4">
                            <button onClick={() => handleChoice('presidensial')} className="p-4 border border-history-gold/20 rounded hover:bg-[#262626] hover:border-history-gold text-left transition group">
                                <span className="block font-bold text-history-gold group-hover:underline mb-1">A. Pertahankan Sistem Presidensial</span>
                                <span className="text-xs text-history-muted">Tetap ikuti UUD 1945 murni. Soekarno memimpin penuh. Abaikan opini Barat.</span>
                            </button>
                            <button onClick={() => handleChoice('parlementer')} className="p-4 border border-history-gold/20 rounded hover:bg-[#262626] hover:border-history-gold text-left transition group">
                                <span className="block font-bold text-history-gold group-hover:underline mb-1">B. Ubah ke Parlementer (Maklumat X)</span>
                                <span className="text-xs text-history-muted">Angkat Sutan Sjahrir (sosok anti-Jepang) sebagai Perdana Menteri. Kurangi kekuasaan Presiden.</span>
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'RESULT' && (
                    <div className="animate-fade-in text-center">
                        {decision === 'presidensial' ? (
                            <>
                                <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
                                <h3 className="text-xl font-bold text-red-500 mb-2">Diplomasi Macet!</h3>
                                <p className="text-history-brown mb-6 font-light">
                                    Dunia Internasional terus menganggap Indonesia negara Fasis buatan Jepang. Sekutu menyerang tanpa ragu. Perundingan sulit dilakukan karena tidak ada "common ground" (demokrasi) dengan Barat.
                                </p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-handshake text-5xl text-emerald-500 mb-4"></i>
                                <h3 className="text-xl font-bold text-emerald-500 mb-2">Diplomasi Sukses!</h3>
                                <p className="text-history-brown mb-6 font-light">
                                    Dunia melihat Indonesia sebagai negara Demokratis. Sutan Sjahrir berhasil memimpin perundingan Linggarjati. 
                                    <br/><br/>
                                    <span className="text-sm italic text-history-muted">Namun, risikonya: Pemerintahan jadi tidak stabil, kabinet sering jatuh bangun karena oposisi parlemen.</span>
                                </p>
                            </>
                        )}
                        <button onClick={resetGame} className="bg-history-gold text-[#0a0a0a] px-6 py-2 rounded font-bold uppercase tracking-widest text-xs hover:bg-[#c5a028]">
                            Ulangi Simulasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- LKPD TOPIC 8 ---
export const LKPDTopic8: React.FC = () => {
    const [kelompok, setKelompok] = useState('');
    const [kelas, setKelas] = useState('');
    const [anggota, setAnggota] = useState<string[]>(Array(7).fill(''));
    
    // Form States
    const [act1Definisi, setAct1Definisi] = useState('');
    const [act2Kausalitas, setAct2Kausalitas] = useState('');
    const [act3StudiKasus, setAct3StudiKasus] = useState('');
    const [kesimpulan, setKesimpulan] = useState('');

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
                    .answer-box { border: 1px solid #ccc; padding: 10px; min-height: 80px; background: #f9f9f9; font-family: sans-serif; font-size: 14px; }
                    .members-list ol { padding-left: 20px; margin: 0; }
                    .footer { margin-top: 50px; text-align: right; font-size: 12px; border-top: 1px solid #ccc; padding-top: 10px; }
                </style>
            </head>
            <body>
                <h1>LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
                <div class="sub-header">Topik: Analisis Perubahan Sistem Pemerintahan Masa Awal Kemerdekaan</div>
                
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
                    <h3>A. Petunjuk Belajar (Meaningfull Learning)</h3>
                    <ol style="font-size: 14px;">
                        <li>Diskusikan dengan teman sekelompokmu.</li>
                        <li>Gunakan gawai/HP untuk mencari sumber yang relevan.</li>
                        <li>Ingat, sejarah bukan hanya hapalan tahun, tapi memahami "mengapa" peristiwa itu terjadi.</li>
                    </ol>
                </div>

                <div class="section">
                    <h3>B. Aktivitas Analisis (HOTS)</h3>
                    
                    <p><strong>1. Definisi Kritis</strong></p>
                    <p class="instruction">Menurut kelompok kalian, apa perbedaan paling mendasar antara Demokrasi yang kita rasakan saat ini dengan konsep Demokrasi Liberal?</p>
                    <div class="answer-box">${act1Definisi}</div>

                    <p style="margin-top: 15px;"><strong>2. Analisis Kausalitas (Sebab-Akibat)</strong></p>
                    <p class="instruction">Mengapa pada tanggal 14 November 1945, Indonesia mengubah sistem dari Presidensial ke Parlementer? Apakah karena Presiden Soekarno tidak mampu, atau ada strategi diplomasi di baliknya? Jelaskan!</p>
                    <div class="answer-box">${act2Kausalitas}</div>

                    <p style="margin-top: 15px;"><strong>3. Studi Kasus</strong></p>
                    <p class="instruction">Jika kalian hidup di tahun 1945, sistem mana yang akan kalian pilih untuk negara yang baru merdeka: Presidensial (Kuat tapi berisiko Otokrasi) atau Parlementer (Demokratis tapi berisiko tidak stabil)? Berikan alasan!</p>
                    <div class="answer-box">${act3StudiKasus}</div>
                </div>

                <div class="section">
                    <h3>C. Kesimpulan Kelompok</h3>
                    <p class="instruction">Tuliskan satu kalimat kesimpulan mengenai "Wajah Demokrasi Indonesia Masa Perjuangan":</p>
                    <div class="answer-box" style="min-height: 40px;">${kesimpulan}</div>
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
                    <button onClick={() => window.open('https://forms.gle/kq7P1iB3JCbf2tiP8', '_blank')} className="bg-history-red text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-700 flex items-center"><i className="fas fa-paper-plane mr-2"></i>Kirim ke Guru</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 bg-[#0a0a0a] p-6 rounded-xl border border-history-gold/5">
                <div className="space-y-4">
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Nama Kelompok</label>
                        <input value={kelompok} onChange={e => setKelompok(e.target.value)} placeholder="Contoh: Kelompok Sjahrir" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
                    </div>
                    <div>
                        <label className="block text-history-gold text-xs font-bold uppercase mb-2">Kelas</label>
                        <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Contoh: X TKJ 2" className="w-full bg-[#171717] border border-history-gold/20 p-3 rounded text-history-brown outline-none focus:border-history-gold" />
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

            <div className="space-y-8">
                <div>
                    <h4 className="text-history-gold text-sm font-bold uppercase mb-2 border-l-4 border-blue-500 pl-3">1. Definisi Kritis</h4>
                    <label className="block text-history-brown text-sm font-bold mb-2">Apa perbedaan paling mendasar antara Demokrasi saat ini dengan Demokrasi Liberal?</label>
                    <textarea value={act1Definisi} onChange={e => setAct1Definisi(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold" placeholder="Jawaban analisis..."></textarea>
                </div>

                <div>
                    <h4 className="text-history-gold text-sm font-bold uppercase mb-2 border-l-4 border-blue-500 pl-3">2. Analisis Kausalitas</h4>
                    <label className="block text-history-brown text-sm font-bold mb-2">Mengapa pada 14 Nov 1945 sistem berubah dari Presidensial ke Parlementer? Strategi diplomasi atau ketidakmampuan Presiden?</label>
                    <textarea value={act2Kausalitas} onChange={e => setAct2Kausalitas(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold" placeholder="Analisis sebab-akibat..."></textarea>
                </div>

                <div>
                    <h4 className="text-history-gold text-sm font-bold uppercase mb-2 border-l-4 border-blue-500 pl-3">3. Studi Kasus</h4>
                    <label className="block text-history-brown text-sm font-bold mb-2">Jika hidup di tahun 1945, pilih Presidensial (Kuat/Otokrasi) atau Parlementer (Demokratis/Labil)?</label>
                    <textarea value={act3StudiKasus} onChange={e => setAct3StudiKasus(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown h-24 outline-none focus:border-history-gold" placeholder="Pilihan dan alasanmu..."></textarea>
                </div>

                <div>
                    <h4 className="text-history-gold text-sm font-bold uppercase mb-2 border-l-4 border-emerald-500 pl-3">C. Kesimpulan Kelompok</h4>
                    <label className="block text-history-brown text-sm font-bold mb-2">Satu kalimat tentang "Wajah Demokrasi Indonesia Masa Perjuangan":</label>
                    <input value={kesimpulan} onChange={e => setKesimpulan(e.target.value)} className="w-full bg-[#171717] p-3 rounded border border-history-muted/20 text-history-brown outline-none focus:border-history-gold" placeholder="Kesimpulan..." />
                </div>
            </div>
        </div>
    );
};

// --- QUIZ TOPIC 8 (FULL EVALUATION SYSTEM) ---
export const QuizDemokrasi: React.FC = () => {
    // 20 Questions Data from PDF
    const questions = [
        {
            id: 1,
            question: "Secara etimologis, kata \"Demokrasi\" berasal dari bahasa Yunani, yaitu demos dan kratos/cratein. Arti dari kata demos adalah...",
            options: [
                "A. Kekuasaan",
                "B. Negara",
                "C. Pemerintah",
                "D. Rakyat",
                "E. Hukum"
            ],
            correct: 3 // D
        },
        {
            id: 2,
            question: "\"Pemerintahan dari rakyat, oleh rakyat, dan untuk rakyat\" adalah definisi demokrasi yang dikemukakan oleh tokoh dunia, yaitu...",
            options: [
                "A. John Locke",
                "B. Montesquieu",
                "C. Abraham Lincoln",
                "D. Winston Churchill",
                "E. Franklin D. Roosevelt"
            ],
            correct: 2 // C
        },
        {
            id: 3,
            question: "Salah satu ciri utama dari pelaksanaan Demokrasi Liberal adalah adanya kebebasan individu yang sangat luas. Dalam konteks pemerintahan, sistem ini sering disebut juga sebagai...",
            options: [
                "A. Demokrasi Terpimpin",
                "B. Demokrasi Pancasila",
                "C. Sistem Parlementer",
                "D. Sistem Presidensial",
                "E. Sistem Monarki Konstitusional"
            ],
            correct: 2 // C based on key
        },
        {
            id: 4,
            question: "Dalam sistem pemerintahan Parlementer, kepala pemerintahan dipegang oleh...",
            options: [
                "A. Presiden",
                "B. Raja",
                "C. Sultan",
                "D. Perdana Menteri",
                "E. Ketua Parlemen"
            ],
            correct: 3 // D
        },
        {
            id: 5,
            question: "Perbedaan mendasar antara kepala negara dan kepala pemerintahan dalam sistem Parlementer adalah...",
            options: [
                "A. Kepala negara menjalankan pemerintahan, kepala pemerintahan adalah simbol",
                "B. Kepala negara adalah simbol, kepala pemerintahan menjalankan kabinet",
                "C. Keduanya memiliki kekuasaan mutlak yang sama",
                "D. Kepala negara dipilih rakyat, kepala pemerintahan ditunjuk raja",
                "E. Tidak ada perbedaan tugas antara keduanya"
            ],
            correct: 1 // B
        },
        {
            id: 6,
            question: "Berdasarkan UUD 1945 (naskah asli), sistem pemerintahan Indonesia yang sebenarnya dirancang oleh para pendiri bangsa adalah...",
            options: [
                "A. Parlementer",
                "B. Presidensial",
                "C. Liberal",
                "D. Terpimpin",
                "E. Monarki"
            ],
            correct: 1 // B
        },
        {
            id: 7,
            question: "Pada awal kemerdekaan, terjadi perubahan fungsi KNIP (Komite Nasional Indonesia Pusat) melalui Maklumat Wakil Presiden No. X tanggal 16 Oktober 1945. Perubahan fungsi tersebut adalah...",
            options: [
                "A. KNIP dibubarkan dan diganti DPR",
                "B. KNIP hanya menjadi pembantu presiden",
                "C. KNIP diserahi kekuasaan legislatif untuk membuat Undang-Undang",
                "D. KNIP menjadi lembaga eksekutif tertinggi",
                "E. KNIP menjadi lembaga yudikatif pengawas hakim"
            ],
            correct: 2 // C
        },
        {
            id: 8,
            question: "Perubahan sistem pemerintahan Indonesia dari Presidensial menjadi Parlementer pada awal kemerdekaan ditandai dengan keluarnya...",
            options: [
                "A. Dekrit Presiden 5 Juli 1959",
                "B. Maklumat Pemerintah 14 November 1945",
                "C. Maklumat Wakil Presiden No. X",
                "D. Supersemar",
                "E. UUD RIS 1949"
            ],
            correct: 1 // B
        },
        {
            id: 9,
            question: "Siapakah tokoh yang diangkat menjadi Perdana Menteri pertama Republik Indonesia setelah perubahan sistem pemerintahan pada November 1945?",
            options: [
                "A. Moh. Hatta",
                "B. Amir Syarifuddin",
                "C. Tan Malaka",
                "D. Sutan Sjahrir",
                "E. Ali Sastroamidjojo"
            ],
            correct: 3 // D
        },
        {
            id: 10,
            question: "Alasan politis utama pemerintah Indonesia mengubah sistem Presidensial menjadi Parlementer pada tahun 1945 adalah...",
            options: [
                "A. Ketidakmampuan Presiden Soekarno dalam memimpin kabinet",
                "B. Desakan dari partai-partai politik oposisi",
                "C. Strategi diplomasi agar Indonesia diakui Sekutu sebagai negara demokratis",
                "D. Keinginan rakyat yang melakukan demonstrasi besar-besaran",
                "E. Mengikuti saran dari pemerintah Jepang"
            ],
            correct: 2 // C
        },
        {
            id: 11,
            question: "Dalam sistem Parlementer, kabinet atau para menteri bertanggung jawab kepada...",
            options: [
                "A. Presiden",
                "B. Rakyat langsung",
                "C. Mahkamah Agung",
                "D. Parlemen (DPR/KNIP)",
                "E. Wakil Presiden"
            ],
            correct: 3 // D
        },
        {
            id: 12,
            question: "Salah satu kelemahan utama pelaksanaan sistem Parlementer di Indonesia pada masa awal kemerdekaan adalah...",
            options: [
                "A. Presiden menjadi otoriter",
                "B. Sering terjadi pergantian kabinet akibat mosi tidak percaya",
                "C. Tidak adanya partai politik yang berdiri",
                "D. Rakyat tidak boleh memilih dalam pemilu",
                "E. Kekuasaan militer sangat dominan"
            ],
            correct: 1 // B
        },
        {
            id: 13,
            question: "Istilah \"Mosi Tidak Percaya\" dalam sistem demokrasi parlementer berarti...",
            options: [
                "A. Rakyat tidak percaya lagi kepada Presiden",
                "B. Parlemen menyatakan ketidakpercayaan terhadap kebijakan kabinet sehingga kabinet harus bubar",
                "C. Menteri mengundurkan diri karena sakit",
                "D. Presiden membubarkan parlemen karena dianggap mengganggu",
                "E. Dunia internasional tidak mengakui kedaulatan negara tersebut"
            ],
            correct: 1 // B
        },
        {
            id: 14,
            question: "Propaganda Belanda kepada dunia internasional pada tahun 1945 menyebutkan bahwa Republik Indonesia adalah negara boneka buatan Jepang yang bersifat...",
            options: [
                "A. Demokratis",
                "B. Komunis",
                "C. Liberal",
                "D. Fasis",
                "E. Sosialis"
            ],
            correct: 3 // D
        },
        {
            id: 15,
            question: "Pada masa Demokrasi Parlementer (1945-1950), posisi Presiden Soekarno berkedudukan sebagai...",
            options: [
                "A. Kepala Pemerintahan",
                "B. Kepala Negara (Simbol)",
                "C. Panglima Tertinggi Perang saja",
                "D. Ketua Partai Politik",
                "E. Perdana Menteri"
            ],
            correct: 1 // B
        },
        {
            id: 16,
            question: "Kabinet Sjahrir I, II, dan III sering jatuh bangun dikarenakan...",
            options: [
                "A. Presiden Soekarno sering memecat menteri",
                "B. Adanya tekanan oposisi dari kelompok Persatuan Perjuangan dan parlemen",
                "C. Belanda berhasil menangkap semua menteri",
                "D. Kasus korupsi yang merajalela di kalangan menteri",
                "E. Sutan Sjahrir mengundurkan diri karena sakit"
            ],
            correct: 1 // B
        },
        {
            id: 17,
            question: "Jika dibandingkan dengan sistem pemerintahan saat ini (pasca Amandemen UUD 1945), menteri-menteri negara saat ini bertanggung jawab kepada...",
            options: [
                "A. DPR",
                "B. MPR",
                "C. Presiden",
                "D. Mahkamah Konstitusi",
                "E. Partai Pengusung"
            ],
            correct: 2 // C
        },
        {
            id: 18,
            question: "Syarat utama berjalannya Demokrasi Liberal adalah adanya sistem multipartai. Tujuan adanya banyak partai politik adalah...",
            options: [
                "A. Agar negara terlihat ramai",
                "B. Sebagai sarana penyalur aspirasi rakyat yang beragam",
                "C. Untuk memecah belah persatuan bangsa",
                "D. Agar mudah mendapatkan bantuan asing",
                "E. Untuk memperkuat kekuasaan presiden"
            ],
            correct: 1 // B
        },
        {
            id: 19,
            question: "Peristiwa perubahan sistem pemerintahan pada 14 November 1945 sering dianggap sebagai \"penyimpangan\" terhadap UUD 1945 karena...",
            options: [
                "A. Dilakukan tanpa persetujuan rakyat",
                "B. UUD 1945 mengamanatkan sistem Presidensial, bukan Parlementer",
                "C. UUD 1945 melarang adanya Perdana Menteri",
                "D. Dilakukan oleh pihak asing (Belanda)",
                "E. Mengubah bentuk negara dari Kesatuan menjadi Serikat"
            ],
            correct: 1 // B
        },
        {
            id: 20,
            question: "Nilai positif yang dapat diambil dari dinamika politik masa awal kemerdekaan (1945-1950) bagi generasi sekarang adalah...",
            options: [
                "A. Pentingnya mempertahankan kekuasaan dengan segala cara",
                "B. Kemampuan beradaptasi dan strategi diplomasi demi mempertahankan kedaulatan bangsa",
                "C. Bahwa sistem pemerintahan boleh diganti semau pemimpin",
                "D. Partai politik adalah sumber perpecahan",
                "E. Kita tidak perlu mengikuti konstitusi"
            ],
            correct: 1 // B
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
                    <h2>Topik: Sejarah Demokrasi Indonesia</h2>
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
                    <p className="text-history-muted text-sm mb-8">Evaluasi: Sejarah Perkembangan Demokrasi (20 Soal)</p>
                    
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
                            <p className="text-history-muted text-sm mt-2">Topik Materi: Perkembangan Demokrasi Indonesia</p>
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