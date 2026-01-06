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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentPage = PAGES.find(p => p.path === location.pathname) || PAGES[0];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="text-history-brown font-sans antialiased flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-[#0a0a0a]/90 backdrop-blur-md text-history-brown border-b border-history-gold/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => handleNavigate('/')}>
            <div className="w-10 h-10 border border-history-gold text-history-gold rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-history-gold group-hover:text-[#0a0a0a]">
                <i className="fas fa-landmark text-lg"></i>
            </div>
            <div>
              <h1 className="font-sans text-xl tracking-wider font-bold text-history-brown group-hover:text-history-gold transition-colors">Sejarah Indonesia</h1>
              <p className="text-[11px] text-history-muted font-bold tracking-[0.2em] uppercase">SMK Negeri 1 Bojongsari</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
             {/* Hide breadcrumb on Home page */}
             {location.pathname !== '/' && (
               <span className="text-sm font-medium text-history-muted mr-4 border-r border-history-muted/20 pr-8 font-sans">
                 {currentPage.title}
               </span>
             )}
             
             <button 
                onClick={() => handleNavigate('/')}
                className="text-history-muted hover:text-history-gold transition duration-300 text-sm font-bold uppercase tracking-widest"
             >
               Beranda
             </button>
             
             {/* Dropdown for Chapters */}
             <div className="relative">
               <button 
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 className="px-5 py-2 rounded-full border border-history-muted/30 text-history-brown hover:border-history-gold hover:text-history-gold transition duration-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2 focus:outline-none"
               >
                 Materi <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} text-xs ml-1`}></i>
               </button>
               
               {isDropdownOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                   
                   <div className="absolute right-0 mt-4 w-80 bg-[#171717] text-history-brown rounded-lg shadow-2xl max-h-[500px] overflow-y-auto border border-history-gold/20 z-50 py-2">
                     <div className="px-6 py-3 border-b border-history-muted/10 text-xs font-bold text-history-muted uppercase tracking-widest">
                        Navigasi Bab
                     </div>
                     {PAGES.filter(p => p.id > 1).map((page) => (
                       <button
                         key={page.id}
                         onClick={() => handleNavigate(page.path)}
                         className={`w-full text-left px-6 py-3 text-sm hover:bg-white/5 hover:text-history-gold transition font-sans border-b border-white/5 last:border-0 ${location.pathname === page.path ? 'text-history-gold font-bold bg-history-gold/5' : ''}`}
                       >
                         <span className="opacity-50 mr-2">{page.id - 1}.</span> {page.title}
                       </button>
                     ))}
                   </div>
                 </>
               )}
             </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-history-brown hover:text-history-gold focus:outline-none transition">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#171717] border-t border-history-gold/10 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex flex-col p-6 space-y-4">
              <button onClick={() => handleNavigate('/')} className="text-left text-history-gold hover:text-white py-3 font-bold border-b border-white/5">
                BERANDA
              </button>
              <div className="text-history-muted text-xs uppercase mt-4 mb-2 tracking-widest">Daftar Materi</div>
              {PAGES.filter(p => p.id > 1).map((page) => (
                 <button
                   key={page.id}
                   onClick={() => handleNavigate(page.path)}
                   className={`text-left text-history-brown hover:text-history-gold py-3 text-sm pl-2 font-sans border-b border-white/5 ${location.pathname === page.path ? 'text-history-gold font-bold' : ''}`}
                 >
                   <span className="inline-block w-6 opacity-50">{page.id - 1}.</span> {page.title}
                 </button>
               ))}
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow container mx-auto px-4 py-12 relative z-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#050505] text-history-brown py-16 mt-auto border-t border-history-gold/10">
        <div className="container mx-auto text-center px-4">
          <div className="mb-6">
            <i className="fas fa-feather-alt text-history-gold text-2xl mb-4 opacity-80"></i>
            <h3 className="font-sans font-bold text-xl tracking-widest text-history-brown uppercase">SMK Negeri 1 Bojongsari</h3>
          </div>
          <div className="w-16 h-px bg-history-gold/30 mx-auto my-6"></div>
          <p className="text-sm text-history-muted font-light tracking-wide">
            Portal Pembelajaran Sejarah &bull; Findi Lestari, S.Pd.
          </p>
          <div className="mt-8 text-[11px] text-history-muted/50 font-bold uppercase tracking-[0.2em]">
             © 2026 History Dept.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;