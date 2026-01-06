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