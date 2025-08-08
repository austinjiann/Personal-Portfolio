import React from 'react';
import ContentContainer from '../components/ContentContainer';

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

interface BlogProps {
  animationComplete?: boolean;
}

const Blog: React.FC<BlogProps> = ({ animationComplete: _animationComplete = false }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <ContentContainer>
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-white mb-12" style={uiFont}>
            Blogs Coming SOON
          </h1>
          
        </div>
      </ContentContainer>
    </div>
  );
};

export default Blog;