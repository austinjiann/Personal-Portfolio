import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnimatedTextCollage from './AnimatedTextCollage';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';

const Layout: React.FC<{ 
  children: React.ReactNode; 
  animationComplete?: boolean;
}> = ({ children, animationComplete = false }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/' || (location.pathname === '/' && animationComplete);

  return (
    <div 
      className="min-h-screen flex flex-col text-white"
      style={{ 
        backgroundColor: '#1B1B1B',
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {children}
      {showFooter && (
        <div className="transition-all duration-700 opacity-100 translate-y-0" 
             style={{ transitionDelay: '400ms' }}>
          <Footer />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [showCollage, setShowCollage] = useState(true);
  const [showHomepage, setShowHomepage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const location = useLocation();

  // Trigger animation whenever route is '/'
  useEffect(() => {
    if (location.pathname === '/') {
      setShowCollage(true);
      setShowHomepage(false);
      setAnimationComplete(false);
    } else {
      // Navigated to other page – ensure animation states reset
      setShowCollage(false);
      setShowHomepage(false);
      setAnimationComplete(false);
    }
  }, [location.pathname]);

  const handleWordsFadeStart = () => {
    setShowHomepage(true);
  };

  const handleCollageComplete = () => {
    // Animation complete - trigger hero text repositioning
    setAnimationComplete(true);
  };

  // Show animated collage on page refresh/fresh load to home page
  if (location.pathname === '/' && showCollage) {
    return (
      <div className="relative min-h-screen bg-black">
        <AnimatedTextCollage 
          onWordsFadeStart={handleWordsFadeStart}
          onAnimationComplete={handleCollageComplete}
          keepHeroVisible={true}
        />
        {showHomepage && (
          <div 
            className="fixed inset-0 text-white z-20"
            style={{ 
              backgroundColor: '#1B1B1B',
              backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="min-h-screen flex flex-col">
              <div className="flex-1" />
              {animationComplete && <Footer />}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        // Only render home page if not in animation mode
        !showCollage ? (
          <Layout animationComplete={animationComplete}>
            <Home animationComplete={animationComplete} />
          </Layout>
        ) : null
      } />
      <Route path="/about" element={
        <Layout animationComplete={animationComplete}>
          <About />
        </Layout>
      } />
      <Route path="/projects" element={
        <Layout animationComplete={animationComplete}>
          <Projects />
        </Layout>
      } />
      <Route path="/blog" element={
        <Layout animationComplete={animationComplete}>
          <Blog />
        </Layout>
      } />
    </Routes>
  );
};

export default App;