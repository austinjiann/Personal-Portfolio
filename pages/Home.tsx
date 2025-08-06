import React from 'react';
import ContentContainer from '../components/ContentContainer';

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

const Projects: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <ContentContainer>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-white mb-12" style={uiFont}>
            Projects
          </h1>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-4" style={uiFont}>Project One</h3>
              <p className="text-gray-400 mb-4" style={uiFont}>
                Description of your first project. What technologies did you use? 
                What problem did it solve?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">React</span>
                <span className="px-3 py-1 bg-green-600 text-white text-sm rounded">Node.js</span>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-4" style={uiFont}>Project Two</h3>
              <p className="text-gray-400 mb-4" style={uiFont}>
                Description of your second project. What was challenging about it? 
                What did you learn?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded">TypeScript</span>
                <span className="px-3 py-1 bg-orange-600 text-white text-sm rounded">Python</span>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-white mb-4" style={uiFont}>Project Three</h3>
              <p className="text-gray-400 mb-4" style={uiFont}>
                Description of your third project. What inspired you to build it? 
                What was the outcome?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-red-600 text-white text-sm rounded">Vue.js</span>
                <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded">Firebase</span>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Projects;