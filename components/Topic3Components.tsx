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