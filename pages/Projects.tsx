import React, { useState, useEffect, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

interface ProjectsProps {
  animationComplete?: boolean;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Projects: React.FC<ProjectsProps> = ({ animationComplete: _animationComplete = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  const filteredProjects = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return projects;
    }

    const terms = debouncedQuery.toLowerCase().trim().split(/\s+/);
    
    return projects.filter(project => {
      const projectName = project.name.toLowerCase();
      const projectTech = project.tech.map(tech => tech.toLowerCase()).join(' ');
      const searchText = `${projectName} ${projectTech}`;
      
      return terms.every(term => searchText.includes(term));
    });
  }, [debouncedQuery]);

  // Slice to first 2 AFTER filtering
  const finalProjects = filteredProjects.slice(0, 2);

  return (
    <div className="flex-1 flex justify-center pt-32">
      <section 
        className="mx-auto max-w-6xl px-4"
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1rem',
          width: '100%'
        }}
      >
        {/* Page Title */}
        <div className="text-center mt-28 sm:mt-32 lg:mt-40 mb-16">
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
            PROJECTS
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search my projects…"
            aria-label="Search projects"
            className="w-full border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none backdrop-blur-[2px] transition-colors duration-200"
            style={{ 
              ...uiFont, 
              width: '100%',
              borderRadius: '1.5rem'
            }}
          />
        </div>

        {/* Projects Grid */}
        {finalProjects.length > 0 ? (
          <ul 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
              gap: '1.5rem',
              width: '100%',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                @media (min-width: 768px) {
                  .projects-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                  }
                }
              `
            }} />
            {finalProjects.map((project) => (
              <li 
                key={project.id} 
                className="h-full w-full projects-grid"
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'block'
                }}
              >
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-white/40 mb-4">
              <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white/60 mb-2" style={uiFont}>
              No projects found
            </h3>
            <p className="text-white/40 mb-4" style={uiFont}>
              Try searching for different keywords
            </p>
            <p className="text-sm text-white/30" style={uiFont}>
              Try "react", "python", "typescript", "blockchain"...
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;