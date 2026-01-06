import React from 'react';

interface ComingSoonProps {
    title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 fade-in">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-history-dark mb-4">{title}</h1>
        <div className="text-6xl text-history-gold mb-6 animate-pulse">
            <i className="fas fa-hourglass-half"></i>
        </div>
        <p className="text-xl text-gray-600 font-light mb-8">Materi ini sedang disusun oleh Ibu Guru.</p>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg">
            <p className="text-gray-500 italic">"Sejarah ditulis oleh para pemenang, tapi dipelajari oleh mereka yang ingin menang di masa depan."</p>
        </div>
        <button 
            onClick={() => window.history.back()}
            className="mt-8 text-history-dark hover:text-history-red underline decoration-2 underline-offset-4 font-bold"
        >
            &larr; Kembali
        </button>
    </div>
  );
};

export default ComingSoon;