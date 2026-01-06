import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Topic1 from './pages/Topic1';
import Topic2 from './pages/Topic2';
import Topic3 from './pages/Topic3';
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
          
          {/* Generate routes for Pages 5-17 dynamically */}
          {PAGES.filter(p => p.id > 4).map((page) => (
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