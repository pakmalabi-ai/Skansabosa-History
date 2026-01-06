import React, { useState, useEffect } from 'react';
import { QuizQuestion, SimulationStep } from '../types';

// --- MINDFULNESS COMPONENT ---
export const Mindfulness: React.FC = () => {
    const [status, setStatus] = useState<'IDLE' | 'INHALE' | 'HOLD' | 'EXHALE' | 'DONE'>('IDLE');
    const [text, setText] = useState('Tekan tombol untuk mulai fokus');

    const startBreathing = () => {
        setStatus('INHALE');
        setText('Tarik Napas... (Inhale)');
        
        setTimeout(() => {
            setStatus('HOLD');
            setText('Tahan... (Hold)');
            
            setTimeout(() => {
                setStatus('EXHALE');
                setText('Hembuskan perlahan... (Exhale)');
                
                setTimeout(() => {
                    setStatus('DONE');
                    setText('Bagus. Pikiran siap menerima ilmu.');
                }, 4000);
            }, 3000);
        }, 4000);
    };

    const getBgColor = () => {
        switch(status) {
            case 'IDLE': return 'bg-blue-50';
            case 'INHALE': return 'bg-blue-200 scale-105';
            case 'HOLD': return 'bg-blue-300 scale-105';
            case 'EXHALE': return 'bg-blue-100';
            case 'DONE': return 'bg-green-50';
            default: return 'bg-blue-50';
        }
    };

    return (
        <div className={`p-6 rounded-md text-center transition-all duration-700 ease-in-out ${getBgColor()}`}>
            <p className="text-lg font-bold text-blue-900 mb-4">{text}</p>
            {status === 'IDLE' && (
                <button 
                    onClick={startBreathing} 
                    className="bg-history-dark text-white px-6 py-2 rounded-full hover:bg-gray-700 transition transform hover:scale-105 shadow-md"
                >
                    Mulai Teknik STOP
                </button>
            )}
            {status === 'DONE' && (
                <button 
                    onClick={() => setStatus('IDLE')} 
                    className="text-sm text-gray-500 underline mt-2"
                >
                    Ulangi
                </button>
            )}
        </div>
    );
};

// --- SIMULATION COMPONENT ---
export const InteractiveMap: React.FC = () => {
    const [step, setStep] = useState(0);

    const simData: SimulationStep[] = [
        {
            title: "Langkah 1: Target Minyak",
            description: "11 Januari 1942. Jepang mendarat di Tarakan (Kalimantan). Mengapa? Karena kilang minyak ada di sana.",
            activeElements: ['tarakan']
        },
        {
            title: "Langkah 2: Kuasai Sumatera",
            description: "Februari 1942. Pasukan payung turun di Palembang. Kilang minyak Plaju dikuasai.",
            activeElements: ['tarakan', 'palembang']
        },
        {
            title: "Langkah 3: Masuk ke Jawa",
            description: "1 Maret 1942. Setelah 'bensin' aman, Jepang mengepung pusat pemerintahan Belanda di Jawa dari 3 titik.",
            activeElements: ['tarakan', 'palembang', 'jawa']
        },
        {
            title: "Langkah 4: Belanda Menyerah",
            description: "8 Maret 1942. Perjanjian Kalijati. Belanda menyerah tanpa syarat. Tamatlah riwayat Hindia Belanda.",
            activeElements: ['tarakan', 'palembang', 'jawa', 'kalijati']
        }
    ];

    const handleNext = () => {
        if (step < simData.length) {
            setStep(step + 1);
        }
    };

    const handleReset = () => {
        setStep(0);
    };

    const currentData = step > 0 ? simData[step - 1] : null;
    const isVisible = (id: string) => step > 0 && currentData && simData[step-1].activeElements.includes(id);
    
    // Helper to check if an element should be shown based on cummulative steps
    // Actually, logic needs to be: if current step >= step where element introduced
    const showTarakan = step >= 1;
    const showPalembang = step >= 2;
    const showJawa = step >= 3;
    const showKalijati = step >= 4;

    return (
        <div className="w-full">
            <div className="relative bg-blue-200 w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-white mb-6">
                {/* SVG MAP */}
                <svg viewBox="0 0 800 400" className="absolute w-full h-full pointer-events-none opacity-80">
                    <path d="M150,100 L200,150 L220,250 L180,280 L120,200 Z" fill="#27ae60" stroke="white" strokeWidth="2"/>
                    <path d="M250,80 L350,80 L360,180 L300,200 L240,150 Z" fill="#27ae60" stroke="white" strokeWidth="2"/>
                    <path d="M200,300 L450,300 L440,340 L210,340 Z" fill="#27ae60" stroke="white" strokeWidth="2"/>
                    <path d="M400,100 L450,100 L430,200 L390,150 Z" fill="#27ae60" stroke="white" strokeWidth="2"/>
                </svg>

                {/* Elements positioned with percentage to be responsive */}
                {showTarakan && (
                    <>
                        <div className="absolute top-[25%] left-[40%] w-8 h-8 bg-history-red rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 animate-bounce">1</div>
                        <div className="absolute top-[18%] left-[40%] bg-white px-2 py-1 text-xs rounded shadow font-bold text-gray-800">Tarakan</div>
                    </>
                )}

                {showPalembang && (
                    <>
                        <div className="absolute top-[50%] left-[22%] w-8 h-8 bg-history-red rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 animate-bounce">2</div>
                        <div className="absolute top-[42%] left-[22%] bg-white px-2 py-1 text-xs rounded shadow font-bold text-gray-800">Palembang</div>
                    </>
                )}

                {showJawa && (
                    <>
                        <div className="absolute top-[78%] left-[29%] w-6 h-6 bg-history-red rounded-full z-10 animate-pulse"></div>
                        <div className="absolute top-[78%] left-[35%] w-6 h-6 bg-history-red rounded-full z-10 animate-pulse"></div>
                        <div className="absolute top-[78%] left-[44%] w-6 h-6 bg-history-red rounded-full z-10 animate-pulse"></div>
                        <div className="absolute top-[85%] left-[35%] bg-white px-2 py-1 text-xs rounded shadow font-bold text-gray-800">Jawa (Pusat)</div>
                    </>
                )}

                {showKalijati && (
                    <div className="absolute top-[75%] left-[33%] w-12 h-12 bg-white border-2 border-history-gold rounded-full flex items-center justify-center text-2xl shadow-xl z-20 animate-spin-slow">
                        🤝
                    </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 rounded-lg shadow-lg backdrop-blur-sm border-l-4 border-history-red">
                    <h4 className="font-bold text-lg text-history-dark">
                        {step === 0 ? "Mulai Simulasi" : currentData?.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                        {step === 0 ? "Tekan tombol 'Langkah Berikutnya' untuk melihat strategi 'Gurita' Jepang." : currentData?.description}
                    </p>
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button 
                    onClick={handleReset} 
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                    disabled={step === 0}
                >
                    Reset
                </button>
                <button 
                    onClick={handleNext} 
                    className={`px-6 py-2 text-white rounded font-bold transition shadow-lg flex items-center ${step >= 4 ? 'bg-gray-400 cursor-not-allowed' : 'bg-history-red hover:bg-red-800'}`}
                    disabled={step >= 4}
                >
                   {step >= 4 ? 'Selesai' : 'Langkah Berikutnya'} <i className="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
    );
};

// --- QUIZ COMPONENT ---
export const Quiz: React.FC = () => {
    const questions: QuizQuestion[] = [
        {
            question: "Mengapa Jepang mendarat pertama kali di Tarakan, bukan di Jakarta?",
            options: ["Mencari sumber makanan", "Menguasai kilang minyak", "Ingin berwisata", "Takut dengan tentara di Jawa"],
            answerIndex: 1
        },
        {
            question: "Apa nama strategi pendaratan Jepang yang menyerupai hewan laut?",
            options: ["Strategi Hiu", "Strategi Gurita", "Strategi Elang", "Strategi Naga"],
            answerIndex: 1
        },
        {
            question: "Propaganda Jepang menyebut diri mereka sebagai...",
            options: ["Cahaya, Pelindung, Pemimpin Asia", "Raja, Ratu, Pangeran Asia", "Teman, Sahabat, Saudara Asia", "Kuat, Hebat, Dahsyat Asia"],
            answerIndex: 0
        },
        {
            question: "Tokoh yang memilih taktik Kooperatif (bekerja sama) adalah...",
            options: ["Sutan Sjahrir", "Amir Syarifuddin", "Ir. Soekarno", "Sudirman"],
            answerIndex: 2
        }
    ];

    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleAnswer = (idx: number) => {
        if (isAnswered) return;
        
        setSelectedOption(idx);
        setIsAnswered(true);

        if (idx === questions[currentQ].answerIndex) {
            setScore(score + 25);
            setFeedback("Benar! 👍");
        } else {
            setFeedback(`Salah. Jawaban yang benar: ${questions[currentQ].options[questions[currentQ].answerIndex]}`);
        }
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            setIsAnswered(false);
            setSelectedOption(null);
            setFeedback("");
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setIsAnswered(false);
        setSelectedOption(null);
        setFeedback("");
    };

    if (showResult) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-history-gold text-center">
                <div className="text-6xl mb-4 text-history-gold">🏆</div>
                <h3 className="text-2xl font-bold mb-2">Kuis Selesai!</h3>
                <p className="text-lg mb-6">Skor Anda: <span className="font-bold text-history-red">{score}</span> / 100</p>
                <p className="text-gray-600 italic mb-6">
                    {score === 100 ? "Luar Biasa! Kamu sejarawan sejati." : score >= 50 ? "Bagus, tapi perlu membaca lagi." : "Ayo baca lagi modulnya ya!"}
                </p>
                <button onClick={restartQuiz} className="px-6 py-2 bg-history-dark text-white rounded hover:bg-gray-700">Ulangi Kuis</button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-history-gold">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-history-dark h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQ) / questions.length) * 100}%` }}></div>
            </div>

            <h3 className="text-xl font-bold mb-6 text-gray-800">
                {currentQ + 1}. {questions[currentQ].question}
            </h3>

            <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 border rounded transition flex justify-between items-center
                            ${selectedOption === idx 
                                ? (idx === questions[currentQ].answerIndex ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500')
                                : 'hover:bg-gray-50'
                            }
                            ${isAnswered && idx === questions[currentQ].answerIndex ? 'bg-green-100 border-green-500' : ''}
                        `}
                    >
                        <span>{opt}</span>
                        {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check text-green-600"></i>}
                        {selectedOption === idx && idx !== questions[currentQ].answerIndex && <i className="fas fa-times text-red-600"></i>}
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mt-6 pt-4 border-t flex justify-between items-center animate-fade-in">
                    <span className={`font-bold ${feedback.includes("Benar") ? "text-green-600" : "text-red-600"}`}>{feedback}</span>
                    <button onClick={nextQuestion} className="bg-history-dark text-white px-4 py-2 rounded hover:bg-gray-800">
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
                    </button>
                </div>
            )}
        </div>
    );
};