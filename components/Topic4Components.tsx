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

// --- QUIZ TOPIC 4 ---
export const QuizProklamasi: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Peristiwa Rengasdengklok terjadi karena adanya perbedaan pendapat antara golongan tua dan golongan muda mengenai...",
            options: [
                "Tempat pelaksanaan proklamasi",
                "Waktu pelaksanaan proklamasi",
                "Siapa yang menandatangani naskah",
                "Isi naskah proklamasi"
            ],
            answerIndex: 1
        },
        {
            question: "Siapakah tokoh yang mengetik naskah Proklamasi setelah disempurnakan?",
            options: [
                "B.M. Diah",
                "Sayuti Melik",
                "Sukarni",
                "Ahmad Soebardjo"
            ],
            answerIndex: 1
        },
        {
            question: "Kalimat pertama pada naskah proklamasi 'Kami bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia' adalah usulan dari...",
            options: [
                "Drs. Moh. Hatta",
                "Ir. Soekarno",
                "Ahmad Soebardjo",
                "Laksamana Maeda"
            ],
            answerIndex: 2
        },
        {
            question: "Dimanakah pembacaan teks Proklamasi Kemerdekaan Indonesia dilaksanakan?",
            options: [
                "Lapangan Ikada",
                "Rumah Laksamana Maeda",
                "Jalan Pegangsaan Timur No. 56",
                "Rengasdengklok"
            ],
            answerIndex: 2
        },
        {
            question: "Bendera Merah Putih yang dikibarkan saat proklamasi dijahit oleh...",
            options: [
                "S.K. Trimurti",
                "Fatmawati",
                "Rahmi Hatta",
                "Wikana"
            ],
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
            <div className="bg-[#171717] p-10 rounded-xl shadow-2xl border border-history-gold/20 text-center animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-history-gold"></div>
                <h3 className="text-2xl font-bold mb-6 font-sans text-history-brown uppercase tracking-widest">Hasil Evaluasi</h3>
                
                <div className="relative inline-block mb-8">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="#262626" strokeWidth="8" fill="none" />
                        <circle cx="64" cy="64" r="60" stroke="#d4af37" strokeWidth="8" fill="none" strokeDasharray={377} strokeDashoffset={377 - (377 * score) / 100} className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-history-brown">{score}</div>
                </div>

                <p className="mb-8 text-history-muted italic font-light text-lg">
                    {score >= 80 
                        ? "Selamat! Anda siap menjadi penjaga kemerdekaan." 
                        : "Jangan berkecil hati. Sejarah perlu dibaca berulang kali."}
                </p>
                <button onClick={restart} className="bg-history-gold text-[#0a0a0a] px-10 py-3 rounded-full hover:bg-white hover:scale-105 transition transform shadow-lg font-bold uppercase tracking-widest text-xs">
                    Ulangi Kuis
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#171717] p-8 md:p-10 rounded-xl shadow-lg border border-history-gold/10">
            <div className="mb-8 flex justify-between items-end border-b border-white/5 pb-4">
                <div>
                    <span className="text-xs font-bold text-history-muted uppercase tracking-widest block mb-1">Pertanyaan</span>
                    <span className="text-2xl font-bold text-history-brown">{currentQ + 1} <span className="text-base text-history-muted font-normal">/ {questions.length}</span></span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-history-muted uppercase tracking-widest block mb-1">Skor</span>
                    <span className="text-xl font-bold text-history-gold">{score}</span>
                </div>
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
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition transform hover:-translate-y-1 font-bold uppercase tracking-widest text-xs">
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Lanjut"} <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            )}
        </div>
    );
};