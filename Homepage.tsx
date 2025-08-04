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
        const rightShift = 6; // Shift pill slightly to the right
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

        {/* social media icons - aligned with hero text left margin */}
        <div
          className={`fixed bottom-10 flex space-x-4 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ 
            transitionDelay: '800ms',
            left: 'calc(50% - min(55vw, 475px))' // Responsive alignment with hero text left edge
          }}
        >
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="mailto:contact@example.com"
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
            </svg>
          </a>
        </div>

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
