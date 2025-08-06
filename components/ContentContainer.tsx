
import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

// This container matches the approximate width of "AUSTIN JIAN" text at different breakpoints
const ContentContainer: React.FC<ContentContainerProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[520px] xl:max-w-[620px]
        mx-auto px-2 sm:px-4 md:px-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
