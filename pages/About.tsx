import React from 'react';
import ContentContainer from '../components/ContentContainer';

const About: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <ContentContainer>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-white mb-8">
            About Me
          </h1>
          <div className="text-lg sm:text-xl text-gray-300 leading-relaxed space-y-6">
            <p>
              Welcome to my corner of the internet. I'm Austin, a passionate developer 
              and creative thinker based in Toronto.
            </p>
            <p>
              I love building beautiful, functional experiences that bridge the gap 
              between design and technology.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              reading about design, or enjoying the vibrant culture of Toronto.
            </p>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default About;