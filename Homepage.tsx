import React, { useState, useEffect } from 'react';

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

interface HomepageProps {
  isVisible: boolean;
  showHeroText?: boolean; // default true
}

const Homepage: React.FC<HomepageProps> = ({ isVisible, showHeroText = true }) => {
  /* live time / date */
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false,
      timeZone: 'America/Toronto'
    });

  
  return (
    <div
      className={`fixed inset-0 text-white z-20 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ 
        backgroundColor: '#1B1B1B',
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      <div className="min-h-screen flex flex-col">
        {/* hero + tagline */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            {showHeroText ? (
              <h1
                className={`font-light tracking-wider text-6xl sm:text-7xl md:text-8xl lg:text-9xl transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                AUSTIN&nbsp;JIAN
              </h1>
            ) : (
              <div className="h-[1.6em] sm:h-[1.7em] md:h-[1.8em] lg:h-[1.9em]" />
            )}

          </div>
        </div>

        {/* nav */}
        <nav
          className={`pb-8 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <ul className="flex justify-center items-center space-x-8 text-[14px]">
            <li>
              <a
                href="#home"
                className="border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300"
                style={uiFont}
              >
                home
              </a>
            </li>
            <li>
              <a 
                href="#work" 
                className="hover:opacity-70 transition-opacity duration-300"
                style={uiFont}
              >
                about
              </a>
            </li>
            <li>
              <a 
                href="#archive" 
                className="hover:opacity-70 transition-opacity duration-300"
                style={uiFont}
              >
                projects
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className="hover:opacity-70 transition-opacity duration-300"
                style={uiFont}
              >
                blog
              </a>
            </li>
          </ul>
        </nav>

        {/* footers */}
        <div
          className={`fixed bottom-8 right-8 text-xs text-right opacity-70 transition-all duration-700 transform ${
            isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div>toronto</div>
          <div>{fmtTime(now)}</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
