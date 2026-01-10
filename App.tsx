import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Topic1 from './pages/Topic1';
import Topic2 from './pages/Topic2';
import Topic3 from './pages/Topic3';
import Topic4 from './pages/Topic4';
import Topic5 from './pages/Topic5';
import Topic6 from './pages/Topic6';
import Topic7 from './pages/Topic7';
import Topic8 from './pages/Topic8';
import Topic9 from './pages/Topic9';
import Topic11 from './pages/Topic11';
import Topic12 from './pages/Topic12';
import Topic13 from './pages/Topic13';
import Topic14 from './pages/Topic14';
import Topic15 from './pages/Topic15';
import Topic16 from './pages/Topic16';
import Topic17 from './pages/Topic17';
import ComingSoon from './pages/ComingSoon';
import { PAGES } from './constants';

// Scroll to top component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matahari-terbit" element={<Topic1 />} />
          <Route path="/tirani-matahari" element={<Topic2 />} />
          <Route path="/gerbang-kemerdekaan" element={<Topic3 />} />
          <Route path="/detik-proklamasi" element={<Topic4 />} />
          <Route path="/perjuangan-fisik" element={<Topic5 />} />
          <Route path="/meja-perundingan" element={<Topic6 />} />
          <Route path="/keutuhan-nkri" element={<Topic7 />} />
          <Route path="/generasi-emas" element={<Topic8 />} />
          <Route path="/dinamika-politik" element={<Topic9 />} />
          <Route path="/demokrasi-terpimpin" element={<Topic11 />} />
          <Route path="/lahir-orba" element={<Topic12 />} />
          <Route path="/pemerintah-orba" element={<Topic13 />} />
          <Route path="/jejak-orba" element={<Topic14 />} />
          <Route path="/era-reformasi" element={<Topic15 />} />
          <Route path="/otokrasi-demokrasi" element={<Topic16 />} />
          <Route path="/dampak-reformasi" element={<Topic17 />} />
          
          {/* Generate routes for any future pages dynamically */}
          {PAGES.filter(p => p.id > 17).map((page) => (
            <Route 
                key={page.id} 
                path={page.path} 
                element={<ComingSoon title={page.title} />} 
            />
          ))}
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;