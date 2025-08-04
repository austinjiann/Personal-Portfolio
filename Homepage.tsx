import React, { useState, useEffect, useRef } from 'react';

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

  // Navigation state
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillStyle, setPillStyle] = useState({ transform: 'translateX(0px)', width: '0px' });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '#home', label: 'home' },
    { href: '#about', label: 'about' },
    { href: '#projects', label: 'projects' },
    { href: '#blog', label: 'blog' }
  ];

  // Update pill position when active index changes
  useEffect(() => {
    if (linkRefs.current[activeIndex] && containerRef.current) {
      const activeLink = linkRefs.current[activeIndex];
      const container = containerRef.current;
      
      if (activeLink) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        // Add extra padding to make pill larger and centered
        const extraPadding = 16; // 8px on each side
        const containerPadding = 8; // px-2 = 8px padding
        const rightShift = 6.5; // Shift pill slightly to the right
        const translateX = linkRect.left - containerRect.left - containerPadding - (extraPadding / 2) + rightShift;
        const width = linkRect.width + extraPadding;
        
        setPillStyle({
          transform: `translateX(${translateX}px)`,
          width: `${width}px`
        });
      }
    }
  }, [activeIndex, isVisible]);

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
          <div
            ref={containerRef}
            className="relative mx-auto w-fit border border-white rounded-full px-2 py-2 bg-transparent"
            style={{ backgroundColor: '#000' }}
          >
            {/* Animated pill background */}
            <div
              className="absolute top-[1px] left-[1px] h-[calc(100%-2px)] bg-white rounded-full transition-all duration-300 ease-out"
              style={pillStyle}
            />
            
            {/* Navigation links */}
            <div className="flex items-center space-x-0 relative z-10">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  ref={(el) => (linkRefs.current[index] = el)}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                  }}
                  className={`px-4 py-2 text-sm transition-all duration-200 hover:opacity-80 ${
                    activeIndex === index ? 'text-black' : 'text-white'
                  }`}
                  style={{
                    ...uiFont,
                    fontWeight: 'normal',
                    textTransform: 'lowercase'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
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
