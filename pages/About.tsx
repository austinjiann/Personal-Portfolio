import React from 'react';
import ContentContainer from '../components/ContentContainer';

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

interface AboutProps {
  animationComplete?: boolean;
}

const About: React.FC<AboutProps> = ({ animationComplete: _animationComplete = false }) => {
  return (
    <div className="flex-1 flex justify-center pt-32">
      <ContentContainer>
        <div className="text-left mt-8">
          <div className="text-center mt-28 sm:mt-32 lg:mt-40">
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white text-center"
                style={{ 
                  ...uiFont,
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 0 2px rgba(0,0,0,1)',
                  WebkitTextStroke: '1px rgba(0,0,0,0.5)',
                  marginTop: '3rem'
                }}
              >
                AUSTIN JIAN
              </h1>
          </div>
          <br/>
          <div className="mt-16 max-w-4xl mx-auto">
            {/* About Me Section */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6" style={uiFont}>
                <strong><i>Currently: </i></strong>
              </h2>
              <br/>
              <ul className="text-2xl sm:text-3xl text-gray-300 leading-relaxed space-y-8" style={uiFont}>
                <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;Incoming freshman at the&nbsp;
                    <img
                      src="/uw.png"
                      alt="University of Waterloo"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://uwaterloo.ca" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      University of Waterloo
                    </a>, studying computer science
                  </span>
                </li>
                <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;SWE at&nbsp;
                    <img
                      src="/gplogo.png"
                      alt="GoPlace"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;
                    <a 
                      href="https://www.goplace.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      GoPlace
                    </a>, where I'm working on full-stack web development
                  </span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>&nbsp;Building live clip farming and stat analysis for all athletes</span>
                </li>
              </ul>
            </div>  
            <br/>
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6" style={uiFont}>
                <strong><i>Previously:</i></strong>
              </h2>
              <br/>
              <ul className="text-2xl sm:text-3xl text-gray-300 leading-relaxed space-y-8" style={uiFont}>
              <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;SWE at&nbsp;
                    <img
                      src="/cyc.png"
                      alt="Canadian Youth Champions"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://www.thecyc.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Canadian Youth Champions
                    </a>, where I built their application portal
                  </span>
                </li>
                
                <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;Won $1,500 and first place in the&nbsp;
                    <img
                      src="/vellum.png"
                      alt="vellum"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://www.vellum.ai/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Vellum
                    </a> &nbsp;prize track at&nbsp;
                    <img
                      src="/ht6.png"
                      alt="hack the 6ix"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://hackthe6ix2025.devpost.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Hack the 6ix
                    </a>
                  </span>
                </li>
                <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;Won $1,000 and first place at&nbsp;
                    <img
                      src="/hack404.png"
                      alt="Hack404"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://hack404-2025.devpost.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Hack404
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            <br/>
            {/* Currently Section */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6" style={uiFont}>
                <strong><i>What I'm up to outside of work:</i></strong>
              </h2>
              <br/>
              <ul className="text-2xl sm:text-3xl text-gray-300 leading-relaxed space-y-8" style={uiFont}>
              <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;Posting daily to document my journey in computer science on&nbsp;
                    <img
                      src="/twitter.png"
                      alt="twitter"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://x.com/austinjian_" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Twitter
                    </a>
                  </span>
                </li>
                <li className="flex items-center mb-6">
                  <span className="flex items-center text-blue-400 mr-3">•</span>
                  <span className="flex items-center">
                    &nbsp;Playing video games (prev top 1% in&nbsp;
                    <img
                      src="/val.png"
                      alt="val"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://tracker.gg/valorant/profile/riot/osten%23OSTEB/overview?platform=pc&playlist=competitive&season=aef237a0-494d-3a14-a1c8-ec8de84e309c" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Valorant
                    </a>
                    , 2000+ hours on&nbsp;
                    <img
                      src="/mc.png"
                      alt="mc"
                      className="inline-block h-5 sm:h-6 w-auto mx-1"
                      style={{ maxHeight: '1.5rem' }}
                    />
                    &nbsp;<a 
                      href="https://plancke.io/hypixel/player/stats/ostebn" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative uw-link hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      Minecraft
                    </a>
                    )
                  </span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>&nbsp;Playing badminton, going out with friends, eating food</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br/>
        <br/>

                  {/* Resume Section */}
          <div className="mt-24 text-center">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                width: 'calc(100% - 2.5rem)',
                maxWidth: 'calc(100% - 2.5rem)',
                marginRight: '2rem'
              }}
            >
              <div 
                style={{
                  backgroundColor: '#2E2E2E',
                  border: '2px solid white',
                  borderRadius: '2rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  paddingTop: '2rem',
                  paddingBottom: '2rem',
                  boxSizing: 'border-box',
                  width: '100%',
                  color: 'white',
                  transform: 'scale(1)',
                  transition: 'transform 0.3s ease-out',
                  ...uiFont
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span className="text-3xl sm:text-3xl font-bold tracking-wider">
                  <strong>check out my resume</strong>
                </span>
              </div>
            </a>
          </div>
      </ContentContainer>
    </div>
  );
};

export default About;