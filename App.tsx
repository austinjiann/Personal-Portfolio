import React, { useState } from 'react';
import AnimatedTextCollage from './AnimatedTextCollage';
import Homepage from './Homepage';

const App: React.FC = () => {
  const [showHomepage, setShowHomepage] = useState(false);

  const handleWordsFadeStart = () => {
    // Start showing homepage as words begin to fade OUT
    // This creates overlap where hero stays but homepage content appears
    setShowHomepage(true);
  };

  const handleCollageComplete = () => {
    // This fires after animation is complete
    // Homepage is already visible at this point
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Collage animation - hero persists during homepage transition */}
      <AnimatedTextCollage 
        onWordsFadeStart={handleWordsFadeStart}
        onAnimationComplete={handleCollageComplete}
        keepHeroVisible={true}
      />
      
      {/* Homepage content - no hero text since collage hero persists */}
      <Homepage 
        isVisible={showHomepage} 
        showHeroText={false}
      />
    </div>
  );
};

export default App;