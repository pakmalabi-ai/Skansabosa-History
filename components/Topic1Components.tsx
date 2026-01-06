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
            case 'IDLE': return 'bg-[#171717] border-history-gold/10';
            case 'INHALE': return 'bg-[#171717] scale-105 shadow-[0_0_40px_rgba(212,175,55,0.2)] border-history-gold/50';
            case 'HOLD': return 'bg-[#171717] scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)] border-history-gold';
            case 'EXHALE': return 'bg-[#171717] border-history-gold/30';
            case 'DONE': return 'bg-[#0a0a0a] border-emerald-900/50';
            default: return 'bg-[#171717]';
        }
    };

    return (
        <div className={`p-8 rounded-xl text-center transition-all duration-1000 ease-in-out border ${getBgColor()}`}>
            <p className="text-xl font-sans font-bold text-history-brown mb-6 tracking-wide">{text}</p>
            {status === 'IDLE' && (
                <button 
                    onClick={startBreathing} 
                    className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded-full hover:bg-[#c5a028] transition transform hover:scale-105 shadow-lg font-bold uppercase tracking-widest text-sm"
                >
                    Mulai Teknik STOP
                </button>
            )}
            {status === 'DONE' && (
                <button 
                    onClick={() => setStatus('IDLE')} 
                    className="text-sm text-history-muted underline mt-2 hover:text-history-gold"
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
            description: "11 Januari 1942. Jepang mendarat di Tarakan (Kalimantan Timur). Mengapa? Karena kilang minyak ada di sana untuk bahan bakar perang.",
            activeElements: ['tarakan']
        },
        {
            title: "Langkah 2: Kuasai Sumatera",
            description: "Februari 1942. Pasukan payung turun di Palembang. Kilang minyak Plaju, yang terbesar di Asia Tenggara, dikuasai.",
            activeElements: ['tarakan', 'palembang']
        },
        {
            title: "Langkah 3: Masuk ke Jawa",
            description: "1 Maret 1942. Setelah 'bensin' aman, Jepang mengepung pusat pemerintahan Belanda di Jawa dari 3 titik (Banten, Eretan, Kragan).",
            activeElements: ['tarakan', 'palembang', 'jawa']
        },
        {
            title: "Langkah 4: Belanda Menyerah",
            description: "8 Maret 1942. Perjanjian Kalijati (Subang). Belanda menyerah tanpa syarat. Tamatlah riwayat Hindia Belanda.",
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
    
    const showTarakan = step >= 1;
    const showPalembang = step >= 2;
    const showJawa = step >= 3;
    const showKalijati = step >= 4;

    return (
        <div className="w-full">
            <div className="relative bg-[#0a0a0a] w-full aspect-[16/9] md:h-[600px] rounded-xl overflow-hidden shadow-2xl border border-history-gold/20 mb-8 select-none group">
                
                {/* Background Map SVG */}
                <svg 
                    id="indo-map" 
                    viewBox="0 0 800 300" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="absolute w-full h-full opacity-60"
                    preserveAspectRatio="none"
                >
                    <style>{`
                        .island { fill: #171717; stroke: #57534e; stroke-width: 0.5; transition: all 0.5s ease; }
                        .island:hover { fill: #262626; stroke: #d4af37; cursor: pointer; }
                    `}</style>
                    
                    {/* Sumatra */}
                    <path id="Sumatera" className="island" d="M120,40 L160,50 L180,90 L170,120 L150,150 L120,130 L100,90 L90,60 Z M100,60 L110,50" data-name="Sumatera"></path>
                    <path className="island" data-name="Sumatera" d="M40,55 C50,45 70,55 80,65 L130,120 C140,130 145,150 135,160 L120,170 C110,175 100,160 95,150 L50,90 C40,75 35,60 40,55 Z"></path>
    
                    {/* Kalimantan */}
                    <path className="island" data-name="Kalimantan" d="M160,90 L230,80 L260,85 L270,110 L260,150 L240,160 L180,155 L165,130 L160,90 Z M230,80 C235,70 250,70 255,80"></path>
    
                    {/* Jawa */}
                    <path className="island" data-name="Jawa" d="M140,175 L150,170 L260,175 L280,185 L275,195 L150,190 L140,175 Z"></path>
                    
                    {/* Sulawesi */}
                    <path className="island" data-name="Sulawesi" d="M300,100 L320,100 L310,120 L330,120 L340,110 L350,120 L340,130 L350,140 L330,150 L310,140 L300,130 L290,110 Z M310,120 L300,130"></path>
    
                    {/* Bali & Nusa Tenggara */}
                    <g className="island-group">
                        <circle className="island" data-name="Bali" cx="295" cy="190" r="4"></circle>
                        <path className="island" data-name="Nusa Tenggara Barat" d="M305,190 L325,190 L325,200 L305,200 Z"></path>
                        <path className="island" data-name="Nusa Tenggara Timur" d="M330,195 L360,190 L370,200 L360,210 L335,205 Z"></path>
                    </g>
    
                    {/* Maluku Islands (Simplified) */}
                    <path className="island" data-name="Maluku Utara" d="M380,100 L395,100 L390,120 L375,115 Z"></path>
                    <path className="island" data-name="Maluku" d="M380,140 L400,135 L405,150 L390,155 Z"></path>
    
                    {/* Papua */}
                    <path className="island" data-name="Papua" d="M430,120 L450,110 L500,115 L560,130 L560,190 L500,190 L480,170 L460,160 L440,150 L430,140 Z M430,120 C420,125 420,135 430,140"></path>
                </svg>

                {/* SVG Overlay for Arrows & Animations - Adjusted ViewBox to match Map */}
                <svg viewBox="0 0 800 300" className="absolute w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                    <defs>
                        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                            <polygon points="0 0, 4 2, 0 4" fill="#d4af37" />
                        </marker>
                    </defs>

                    {/* Strategy Arrows based on Historical Movement */}
                    {showTarakan && (
                        // From Philippines (North-East) to Tarakan (East Kalimantan ~260,100)
                        <path d="M 350,20 Q 320,50 260,100" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" className="animate-dash" />
                    )}
                    {showPalembang && (
                        // From Malaya (West) to Palembang (South Sumatra ~130,140)
                        <path d="M 50,50 Q 80,100 130,140" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" className="animate-dash" />
                    )}
                     {showJawa && (
                        <>
                           {/* To Banten (West Java ~150,180) from Sumatra side */}
                           <path d="M 130,140 Q 135,160 150,180" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
                           {/* To Eretan (Central Java ~200,180) from Java Sea */}
                           <path d="M 220,100 L 200,180" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
                           {/* To Kragan (East Java ~250,180) from Makassar Strait */}
                           <path d="M 280,100 Q 270,140 250,180" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)" />
                        </>
                    )}
                </svg>

                {/* LABELS & MARKERS (Positioned by %) */}
                
                {/* 1. Tarakan */}
                {showTarakan && (
                    <div className="absolute top-[33%] left-[32%] animate-bounce z-20">
                        <div className="w-8 h-8 bg-history-red text-white rounded-full flex items-center justify-center font-bold shadow-lg border border-history-gold text-sm">1</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 px-2 py-1 text-[9px] text-history-gold border border-history-gold/30 rounded whitespace-nowrap tracking-wider uppercase">
                            Tarakan
                        </div>
                    </div>
                )}

                {/* 2. Palembang */}
                {showPalembang && (
                    <div className="absolute top-[46%] left-[16%] animate-bounce z-20">
                        <div className="w-8 h-8 bg-history-red text-white rounded-full flex items-center justify-center font-bold shadow-lg border border-history-gold text-sm">2</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 px-2 py-1 text-[9px] text-history-gold border border-history-gold/30 rounded whitespace-nowrap tracking-wider uppercase">
                            Palembang
                        </div>
                    </div>
                )}

                {/* 3. Jawa Landing Spots */}
                {showJawa && (
                    <>
                        <div className="absolute top-[60%] left-[18%] w-4 h-4 bg-history-red rounded-full z-10 animate-ping border border-history-gold/50"></div>
                        <div className="absolute top-[60%] left-[25%] w-4 h-4 bg-history-red rounded-full z-10 animate-ping border border-history-gold/50"></div>
                        <div className="absolute top-[60%] left-[31%] w-4 h-4 bg-history-red rounded-full z-10 animate-ping border border-history-gold/50"></div>
                        
                        <div className="absolute top-[68%] left-[25%] -translate-x-1/2 bg-[#171717] text-history-gold px-3 py-1 text-xs border border-history-gold/30 uppercase tracking-widest whitespace-nowrap">
                            Pengepungan Jawa
                        </div>
                    </>
                )}

                {/* 4. Kalijati */}
                {showKalijati && (
                    <div className="absolute top-[61%] left-[20%] z-30 cursor-pointer group-hover:scale-110 transition duration-300">
                        <div className="w-12 h-12 bg-[#0a0a0a] border border-history-gold rounded-full flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(212,175,55,0.3)] animate-spin-slow text-history-gold">
                            🤝
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-history-gold text-[#0a0a0a] px-2 py-1 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                            Perjanjian Kalijati
                        </div>
                    </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-[#0a0a0a]/90 p-6 rounded-lg shadow-2xl backdrop-blur-md border border-history-gold/20 transition-all duration-300 z-40">
                    <h4 className="font-sans font-bold text-sm text-history-gold flex items-center mb-2 uppercase tracking-widest">
                        <span className="bg-history-gold text-[#0a0a0a] text-[9px] px-2 py-0.5 rounded-sm mr-3 font-bold">Step {step}/4</span>
                        {step === 0 ? "Mulai Simulasi" : currentData?.title}
                    </h4>
                    <p className="text-history-brown leading-relaxed text-xs font-light">
                        {step === 0 ? "Tekan tombol 'Langkah Berikutnya' untuk melihat bagaimana Jepang menggunakan strategi 'Gurita'." : currentData?.description}
                    </p>
                </div>
            </div>

            <div className="flex justify-center space-x-6">
                <button 
                    onClick={handleReset} 
                    className="px-6 py-3 bg-[#171717] text-history-muted rounded border border-history-muted/20 hover:border-history-gold hover:text-history-gold transition shadow-lg text-xs font-bold uppercase tracking-widest"
                    disabled={step === 0}
                >
                    <i className="fas fa-undo mr-2"></i> Reset
                </button>
                <button 
                    onClick={handleNext} 
                    className={`px-8 py-3 rounded text-xs font-bold transition shadow-xl flex items-center transform hover:scale-105 tracking-widest uppercase ${step >= 4 ? 'bg-gray-800 cursor-not-allowed text-gray-500' : 'bg-history-gold text-[#0a0a0a] hover:bg-[#c5a028]'}`}
                    disabled={step >= 4}
                >
                   {step >= 4 ? 'Selesai' : 'Langkah Berikutnya'} <i className="fas fa-arrow-right ml-3"></i>
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
            setFeedback("Benar");
        } else {
            setFeedback(`Salah. Jawaban: ${questions[currentQ].options[questions[currentQ].answerIndex]}`);
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
            <div className="glass-card p-10 rounded-2xl border border-history-gold/30 text-center">
                <div className="text-6xl mb-4 text-history-gold opacity-80">🏆</div>
                <h3 className="text-2xl font-sans font-bold mb-3 text-history-brown uppercase tracking-widest">Kuis Selesai</h3>
                <p className="text-lg mb-8 text-history-muted font-light">Skor Anda: <span className="font-bold text-history-gold text-2xl ml-2">{score}</span> / 100</p>
                <button onClick={restartQuiz} className="px-8 py-3 bg-history-gold text-[#0a0a0a] rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-sm">Ulangi Kuis</button>
            </div>
        );
    }

    return (
        <div className="glass-card p-10 rounded-2xl border border-history-gold/10">
            {/* Progress Bar */}
            <div className="w-full bg-[#171717] h-1 mb-8">
                <div className="bg-history-gold h-1 transition-all duration-500" style={{ width: `${((currentQ) / questions.length) * 100}%` }}></div>
            </div>

            <h3 className="text-xl font-sans font-bold mb-8 text-history-brown leading-relaxed">
                <span className="text-history-gold mr-3">{currentQ + 1}.</span> {questions[currentQ].question}
            </h3>

            <div className="space-y-3">
                {questions[currentQ].options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 border rounded transition flex justify-between items-center group
                            ${selectedOption === idx 
                                ? (idx === questions[currentQ].answerIndex ? 'bg-emerald-900/30 border-emerald-500 text-emerald-100' : 'bg-rose-900/30 border-rose-500 text-rose-100')
                                : 'bg-[#171717] border-history-gold/10 hover:border-history-gold/40 text-history-muted hover:text-history-brown'
                            }
                        `}
                    >
                        <span className="font-light tracking-wide">{opt}</span>
                        {isAnswered && idx === questions[currentQ].answerIndex && <i className="fas fa-check text-emerald-500"></i>}
                        {selectedOption === idx && idx !== questions[currentQ].answerIndex && <i className="fas fa-times text-rose-500"></i>}
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mt-8 pt-6 border-t border-history-gold/10 flex justify-between items-center animate-fade-in">
                    <span className={`font-bold text-sm uppercase tracking-widest ${feedback.includes("Benar") ? "text-emerald-500" : "text-rose-500"}`}>{feedback}</span>
                    <button onClick={nextQuestion} className="bg-history-gold text-[#0a0a0a] px-8 py-3 rounded hover:bg-[#c5a028] transition font-bold uppercase tracking-widest text-xs">
                        {currentQ === questions.length - 1 ? "Lihat Hasil" : "Lanjut"}
                    </button>
                </div>
            )}
        </div>
    );
};