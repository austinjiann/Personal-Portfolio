import React from 'react';
import ContentContainer from '../components/ContentContainer';

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

const About: React.FC = () => {
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
                    &nbsp;incoming freshman at the&nbsp;
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
                      className="underline decoration-gray-500 hover:decoration-white hover:text-white transition-all duration-200 cursor-pointer text-gray-300"
                    >
                      university of waterloo
                    </a>, studying computer science
                  </span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>&nbsp;Love building beautiful, functional experiences that bridge design and technology</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>Always exploring new technologies and design trends</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span>[Add your background/education here]</span>
                </li>
              </ul>
            </div>  
            <br/>
            {/* Skills & Interests Section */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6" style={uiFont}>
                <strong><i>Previously:</i></strong>
              </h2>
              <br/>
              <ul className="text-2xl sm:text-3xl text-gray-300 leading-relaxed space-y-8" style={uiFont}>
                <li className="flex items-start mb-6">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>[Add your technical skills here]</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>[Add programming languages/frameworks]</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>[Add design tools/creative skills]</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>[Add hobbies/interests]</span>
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
                <li className="flex items-start mb-6">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span>[Add what you're working on now]</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span>[Add current projects/learning]</span>
                </li>
                <li className="flex items-start mb-6">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span>[Add current goals/focus areas]</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default About;