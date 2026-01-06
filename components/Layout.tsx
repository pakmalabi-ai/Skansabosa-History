import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PAGES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPage = PAGES.find(p => p.path === location.pathname) || PAGES[0];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="text-gray-800 font-sans antialiased flex flex-col min-h-screen bg-history-paper bg-paper-pattern">
      {/* HEADER */}
      <header className="bg-history-dark text-white shadow-lg sticky top-0 z-50 border-b-4 border-history-gold">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigate('/')}>
            <i className="fas fa-landmark text-2xl text-history-gold"></i>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-wide">Sejarah Indonesia</h1>
              <p className="text-xs text-history-gold">Guru: Findi Lestari, S.Pd.</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
             <span className="text-sm italic text-gray-300 mr-4 border-r border-gray-500 pr-4">
               {currentPage.title}
             </span>
             <button 
                onClick={() => handleNavigate('/')}
                className="hover:text-history-gold transition duration-300 text-sm font-semibold uppercase tracking-wider"
             >
               Beranda
             </button>
             {/* Simple Dropdown for Chapters */}
             <div className="relative group">
               <button className="hover:text-history-gold transition duration-300 text-sm font-semibold uppercase tracking-wider flex items-center gap-1">
                 Daftar Materi <i className="fas fa-chevron-down text-xs"></i>
               </button>
               <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded shadow-xl hidden group-hover:block max-h-96 overflow-y-auto border border-gray-200 z-50">
                 {PAGES.filter(p => p.id > 1).map((page) => (
                   <button
                     key={page.id}
                     onClick={() => handleNavigate(page.path)}
                     className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 hover:bg-history-gold hover:text-white transition ${location.pathname === page.path ? 'bg-gray-100 font-bold' : ''}`}
                   >
                     {page.id - 1}. {page.title}
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white focus:outline-none">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-history-dark border-t border-gray-700 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col p-4 space-y-2">
              <button onClick={() => handleNavigate('/')} className="text-left text-white hover:text-history-gold py-2 font-bold border-b border-gray-700">
                Beranda
              </button>
              <div className="text-gray-400 text-xs uppercase mt-2 mb-1">Daftar Materi</div>
              {PAGES.filter(p => p.id > 1).map((page) => (
                 <button
                   key={page.id}
                   onClick={() => handleNavigate(page.path)}
                   className={`text-left text-white hover:text-history-gold py-2 text-sm pl-2 ${location.pathname === page.path ? 'text-history-gold font-bold' : ''}`}
                 >
                   {page.id - 1}. {page.title}
                 </button>
               ))}
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-history-dark text-white py-6 mt-auto border-t-4 border-history-gold">
        <div className="container mx-auto text-center px-4">
          <p className="font-serif font-bold text-lg">SMK Negeri 1 Bojongsari</p>
          <p className="text-sm text-gray-400 mt-2">Dikembangkan oleh Findi Lestari, S.Pd. – SMK Negeri 1 Bojongsari</p>
          <div className="mt-4 text-xs text-gray-500">
            Media Pembelajaran Sejarah Indonesia - Semester Genap 2025/2026
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;