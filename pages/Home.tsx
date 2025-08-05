import React, { useState, useEffect } from 'react';
import ContentContainer from '../components/ContentContainer';

interface HomeProps {
  animationComplete?: boolean;
}

const Home: React.FC<HomeProps> = ({ animationComplete = false }) => {
  const [heroMoved, setHeroMoved] = useState(false);

  // Move hero text to top after animation completes or immediately for direct navigation
  useEffect(() => {
    if (!heroMoved) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setHeroMoved(true);
      }, animationComplete ? 300 : 100);
      return () => clearTimeout(timer);
    }
  }, [animationComplete, heroMoved]);

  return (
    <div className="flex-1 relative">
      {/* Hero text - repositions from center to top after animation */}
      <div 
        className={`transition-all duration-1000 ease-out ${
          heroMoved 
            ? 'absolute top-16 left-0 right-0 text-center' 
            : 'absolute inset-0 flex items-center justify-center'
        }`}
        style={{ 
          transform: heroMoved ? 'none' : 'translateY(30px)'
        }}
      >
        <ContentContainer>
          <div className="text-center">
            <h1 className={`font-light tracking-wider text-white transition-all duration-1000 ${
              heroMoved 
                ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' 
                : 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl'
            }`}>
              AUSTIN&nbsp;JIAN
            </h1>
          </div>
        </ContentContainer>
      </div>

    </div>
  );
};

export default Home;