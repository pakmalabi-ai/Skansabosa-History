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
                    <p class="instruction">Jika kalian hidup di tahun 1945, sistem mana yang akan kalian pilih untuk negara yang baru merdeka: Presidensial (Kuat tapi berisiko Otokrasi) atau Parlementer (Demokratis tapi berisiko tidak stabil)? Berikan alasannya!</p>
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

// --- QUIZ TOPIC 8 ---
export const QuizDemokrasi: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Apa arti kata 'Demos' dalam konsep Demokrasi?",
            options: ["Pemerintahan", "Rakyat", "Negara", "Hukum"],
            answerIndex: 1
        },
        {
            question: "Siapa Perdana Menteri pertama Indonesia pada masa Demokrasi Parlementer 1945?",
            options: ["Ir. Soekarno", "Moh. Hatta", "Sutan Sjahrir", "Amir Syarifuddin"],
            answerIndex: 2
        },
        {
            question: "Apa ciri utama sistem Parlementer?",
            options: ["Kepala Pemerintahan adalah Presiden", "Menteri bertanggung jawab pada Presiden", "Tidak ada Partai Politik", "Kepala Pemerintahan adalah Perdana Menteri"],
            answerIndex: 3
        },
        {
            question: "Mengapa Indonesia mengubah sistem Presidensial ke Parlementer pada Nov 1945?",
            options: ["Agar Soekarno bisa istirahat", "Strategi diplomasi mendapat pengakuan Sekutu", "Mengikuti perintah Jepang", "Karena rakyat membenci Presiden"],
            answerIndex: 1
        },
        {
            question: "Apa kelemahan utama dari sistem Demokrasi Liberal / Parlementer pada masa itu?",
            options: ["Pemerintahan Otokrasi", "Kabinet sering jatuh bangun (tidak stabil)", "Presiden terlalu kuat", "Tidak ada kebebasan berpendapat"],
            answerIndex: 1
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
                <p className="mb-6 text-history-muted italic font-light">{score >= 80 ? "Luar Biasa! Anda memahami konsep demokrasi." : "Pelajari lagi perbedaan sistem pemerintahan."}</p>
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