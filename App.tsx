import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AnimatedTextCollage from './AnimatedTextCollage';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';

const BackgroundLayers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const trailPointsRef = useRef<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const setupCanvasSize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      const displayWidth = Math.max(1, Math.floor(width));
      const displayHeight = Math.max(1, Math.floor(height));
      if (canvas.width !== displayWidth * devicePixelRatio || canvas.height !== displayHeight * devicePixelRatio) {
        canvas.width = displayWidth * devicePixelRatio;
        canvas.height = displayHeight * devicePixelRatio;
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      }
      // Fill fully black initially
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = '#000000';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    setupCanvasSize();

    // Observe size changes of the canvas' parent (viewport) to adjust resolution
    if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    resizeObserverRef.current = new ResizeObserver(() => setupCanvasSize());
    resizeObserverRef.current.observe(document.body);

    const maxTrailPoints = 16;
    const baseRadiusPixels = 55; // smaller reveal radius for tighter circle
    const fadeOverlayAlpha = 0.16; // slightly faster decay for a quicker fade

    const addPoint = (x: number, y: number) => {
      lastPointRef.current = { x, y };
      const points = trailPointsRef.current;
      points.push({ x, y });
      if (points.length > maxTrailPoints) {
        points.shift();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      addPoint(event.clientX, event.clientY);
    };
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        addPoint(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      // Slightly darken entire canvas to slowly remove older holes
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = `rgba(0,0,0,${fadeOverlayAlpha})`;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Carve out transparent holes with jittered, soft sub-stamps for a more natural look
      const points = trailPointsRef.current;
      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        const falloff = (index + 1) / points.length; // 0..1 older → larger value
        const baseR = baseRadiusPixels * (1 - 0.7 * falloff); // newer points are larger

        // Use a few jittered sub-stamps per point to avoid a perfect circle
        const subStamps = 3;
        for (let j = 0; j < subStamps; j += 1) {
          const angleNoise = (index * 0.73 + j * 2.11) + Math.random() * 0.8;
          const offsetScale = 0.12 + Math.random() * 0.10; // 12%..22% of base radius (tighter, more defined)
          const offset = baseR * offsetScale;
          const ox = point.x + Math.cos(angleNoise) * offset;
          const oy = point.y + Math.sin(angleNoise) * offset;
          const subRadius = Math.max(1, baseR * (0.75 + Math.random() * 0.25)); // 75%..100% of base (more defined)

          const gradient = context.createRadialGradient(ox, oy, 0, ox, oy, subRadius);
          gradient.addColorStop(0, 'rgba(0,0,0,1)');
          gradient.addColorStop(1, 'rgba(0,0,0,0)');

          context.save();
          context.globalCompositeOperation = 'destination-out';
          context.globalAlpha = 0.92; // slightly stronger to define the shape
          // slight blur to further soften the stamp
          // @ts-ignore
          context.filter = 'blur(0.3px)';
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(ox, oy, subRadius, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dotted pattern base layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -2,
          backgroundColor: '#000000',
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Black overlay canvas that we dynamically cut through to reveal the dots with a trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1, width: '100%', height: '100%' }}
      />
    </>
  );
};

const Layout: React.FC<{ 
  children: React.ReactNode; 
  animationComplete?: boolean;
}> = ({ children, animationComplete = false }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/' || (location.pathname === '/' && animationComplete);

  return (
    <div className="relative min-h-screen flex flex-col text-white">
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
      <div className="relative min-h-screen">
        <BackgroundLayers />
        <AnimatedTextCollage 
          onWordsFadeStart={handleWordsFadeStart}
          onAnimationComplete={handleCollageComplete}
          keepHeroVisible={true}
        />
        {showHomepage && (
          <div 
            className="fixed inset-0 text-white z-20"
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
    <>
      <BackgroundLayers />
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
    </>
  );
};

export default App;