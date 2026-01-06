import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto text-center mt-6 fade-in">
      <div className="mb-8 animate-fade-in-down">
        <h1 className="font-serif text-4xl md:text-6xl font-black text-history-dark mb-4 leading-tight">
          Selamat Datang di <br/>
          <span className="text-history-red">Portal Pembelajaran Sejarah</span>
        </h1>
        <h2 className="font-serif text-xl md:text-2xl text-history-gold font-bold mb-8">
          SMK Negeri 1 Bojongsari
        </h2>
        <div className="h-1 w-32 bg-history-dark mx-auto mb-8"></div>
        <p className="text-xl md:text-2xl text-gray-600 italic font-light mb-8">
          "Menyelami Masa Lalu, Merancang Masa Depan."
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border-t-8 border-history-gold mb-12 text-left transform transition hover:scale-[1.01] duration-500">
        <h3 className="font-serif text-2xl font-bold mb-6 text-history-dark">
          Halo, Siswa-Siswi Kelas X Skansabosa!
        </h3>
        <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
          <p>
            Selamat datang di rumah belajar digital kita untuk Semester Genap Tahun Pelajaran 2025/2026. 
            Website ini didedikasikan khusus untuk kalian yang siap memperluas wawasan kebangsaan dan 
            memahami jejak langkah peradaban manusia.
          </p>
          <p>
            Di sini, Sejarah bukan sekadar menghafal tahun dan nama tokoh. Bersama saya, 
            <strong> Ibu Findi Lestari, S.Pd.</strong>, kita akan belajar melalui Media Pembelajaran Interaktif 
            yang menyenangkan, modul digital yang ringkas, dan diskusi yang membuka pikiran. 
            Mari jadikan sejarah sebagai guru terbaik untuk membangun karakter generasi muda yang tangguh.
          </p>
          
          <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-history-gold my-6">
            <h4 className="font-bold text-history-dark mb-2">Fitur Pembelajaran:</h4>
            <ul className="list-none space-y-2">
                <li><i className="fas fa-book mr-2 text-history-red"></i> E-Modul Sejarah Semester Genap</li>
                <li><i className="fas fa-video mr-2 text-history-red"></i> Video & Media Interaktif</li>
                <li><i className="fas fa-edit mr-2 text-history-red"></i> Kuis & Evaluasi Mandiri</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
            <blockquote className="font-serif italic text-gray-500 text-lg mb-8">
                "Jangan sekali-kali meninggalkan sejarah (JASMERAH)." — Ir. Soekarno
            </blockquote>
            
            <button 
                onClick={() => navigate('/matahari-terbit')}
                className="bg-history-red hover:bg-red-800 text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl text-lg flex items-center justify-center mx-auto gap-3"
            >
                <span>Mulai Belajar Sekarang</span>
                <i className="fas fa-arrow-right"></i>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;