import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto text-center mt-6 fade-in px-4">
      {/* Hero Section */}
      <div className="mb-20">
        <h1 className="font-sans text-5xl md:text-7xl font-bold text-history-brown mb-6 leading-tight animate-slide-up">
          <span className="block opacity-0 animate-[slideUp_1s_ease-out_forwards]">Selamat Datang di</span>
          <span className="gold-gradient-text animate-shimmer inline-block mt-2">Portal Sejarah</span>
        </h1>
        <h2 className="font-sans text-xl md:text-2xl text-history-muted font-light mb-10 tracking-[0.15em] uppercase opacity-0 animate-fade-in-delayed">
          SMK Negeri 1 Bojongsari
        </h2>
        <div className="h-px w-32 bg-history-gold/50 mx-auto mb-10 opacity-0 animate-[fadeIn_1.5s_ease-out_0.8s_forwards]"></div>
        <p className="text-xl md:text-3xl text-history-brown italic font-sans font-light mb-12 opacity-0 animate-[slideUp_1s_ease-out_1s_forwards]">
          "Menyelami Masa Lalu, Merancang Masa Depan."
        </p>
      </div>

      {/* Profile & Intro Card */}
      <div className="glass-card p-8 md:p-16 rounded-[2rem] mb-20 text-left relative overflow-hidden animate-[fadeIn_1.5s_ease-out_0.5s_forwards] opacity-0">
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-history-gold rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-history-paper rounded-full blur-[150px] opacity-30"></div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start relative z-10">
            {/* Foto Profil Section */}
            <div className="w-full md:w-5/12 flex flex-col items-center text-center shrink-0">
                <div className="relative group mb-8 w-full max-w-sm">
                    {/* Double Border Frame Effect */}
                    <div className="absolute -inset-1 border border-history-gold/30 rounded-[2rem] transform translate-x-2 translate-y-2"></div>
                    <img 
                        src="https://github.com/pakmalabi-ai/public/blob/main/findi.jpg?raw=true" 
                        alt="Findi Lestari, S.Pd." 
                        className="relative w-full h-[550px] object-cover rounded-[2rem] border border-history-gold/20 shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition duration-700"
                    />
                </div>
                <div>
                    <h3 className="font-sans text-2xl font-bold text-history-brown tracking-wide">Findi Lestari, S.Pd.</h3>
                    <div className="w-12 h-px bg-history-gold mx-auto my-3"></div>
                    <p className="text-history-muted text-sm uppercase tracking-widest">Guru Sejarah Skansabosa</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-7/12 flex flex-col justify-center h-full pt-4">
                <h3 className="font-sans text-3xl md:text-4xl font-bold mb-8 text-history-brown leading-snug">
                  Halo, Siswa-Siswi <br/><span className="text-history-gold italic font-light">Kelas X Skansabosa</span>
                </h3>
                <div className="text-lg text-history-muted leading-relaxed space-y-6 font-light">
                  <p>
                    Selamat datang di rumah belajar digital kita untuk Semester Genap Tahun Pelajaran 2025/2026. 
                    Website ini didedikasikan khusus untuk kalian yang siap memperluas wawasan kebangsaan dengan pendekatan yang profesional dan mendalam.
                  </p>
                  <p>
                    Di sini, Sejarah bukan sekadar menghafal tahun. Bersama saya, kita akan belajar melalui <strong className="text-history-brown font-bold border-b border-history-gold/50">Media Pembelajaran Interaktif</strong> dan modul digital terstruktur.
                  </p>
                  
                  <div className="bg-[#0a0a0a]/50 p-8 rounded-xl border border-history-gold/10 mt-10 hover:border-history-gold/30 transition duration-500">
                    <h4 className="font-bold text-history-brown mb-6 text-xs uppercase tracking-[0.2em]">Fitur Unggulan</h4>
                    <ul className="space-y-5">
                        <li className="flex items-center text-history-muted group">
                            <span className="w-8 h-8 rounded-full border border-history-gold/30 flex items-center justify-center text-history-gold mr-4 group-hover:bg-history-gold group-hover:text-black transition"><i className="fas fa-book text-xs"></i></span> 
                            E-Modul Sejarah Estetik
                        </li>
                        <li className="flex items-center text-history-muted group">
                             <span className="w-8 h-8 rounded-full border border-history-gold/30 flex items-center justify-center text-history-gold mr-4 group-hover:bg-history-gold group-hover:text-black transition"><i className="fas fa-film text-xs"></i></span>
                            Media Interaktif & Simulasi
                        </li>
                        <li className="flex items-center text-history-muted group">
                             <span className="w-8 h-8 rounded-full border border-history-gold/30 flex items-center justify-center text-history-gold mr-4 group-hover:bg-history-gold group-hover:text-black transition"><i className="fas fa-star text-xs"></i></span>
                            Kuis & Evaluasi Mandiri
                        </li>
                    </ul>
                  </div>
                </div>
            </div>
        </div>
        
        <div className="mt-20 text-center border-t border-history-gold/10 pt-16">
            <blockquote className="font-sans italic text-history-muted text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                "Jangan sekali-kali meninggalkan sejarah (JASMERAH)." <br/>
                <span className="text-sm font-bold not-italic mt-6 block text-history-gold tracking-widest uppercase">— Ir. Soekarno</span>
            </blockquote>
            
            <button 
                onClick={() => navigate('/matahari-terbit')}
                className="group relative bg-history-gold text-[#0a0a0a] font-bold py-4 px-12 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
                 <span className="relative flex items-center justify-center gap-4 text-lg tracking-wide">
                    <span>MULAI BELAJAR</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                 </span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;