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
  const visible = filteredProjects.slice(0, 2);

  return (
    <div className="flex-1 flex justify-center pt-32">
      <section style={{ margin: "0 auto", maxWidth: "1152px", paddingLeft: "16px", paddingRight: "16px" }}>
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

        {/* Trim container: right = 5.5 grids (≈110px), left = 4.5 grids (≈90px) */}
        <div data-right-trim style={{ width: 'calc(100% - 200px)', marginRight: '110px', marginLeft: '90px' }}>

          {/* Search Bar */}
          <div className="mb-8" style={{ marginTop: '24px', marginBottom: '48px' }}>
            <div data-search-wrap style={{ width: '952px', maxWidth: '100%', margin: '0 auto' }}>
              <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search for project names or tech stacks.."
              aria-label="Search projects"
              data-search
              className="w-full border px-4 py-3 transition-colors duration-200 focus:outline-none"
              style={{ 
                ...uiFont, 
                width: '100%',
                borderRadius: '1.5rem',
                backgroundColor: '#ffffff',
                color: '#000000',
                caretColor: '#000000',
                borderColor: 'rgba(0,0,0,0.2)'
              }}
              />
            </div>
          </div>
        
        {/* Inline, high-specificity grid */}
        {visible.length > 0 ? (
          <ul
            data-inline-grid
            style={{
              display: "grid",
              /* IMPORTANT: do not set gridTemplateColumns inline,
                 the media query below controls it */
              gap: "24px",
              width: "100%",
              alignItems: "stretch",
            }}
          >
            {visible.map((project) => (
              <li key={project.id} style={{ width: "100%", height: "100%" }}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : null}

        </div>

        {/* Local media query to switch to 2 columns at md (768px) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* HIGH SPECIFICITY to beat any external styles */
              :root :where([data-inline-grid]) { display: grid !important; grid-template-columns: 1fr !important; gap: 24px !important; width: 100% !important; }
              @media (min-width: 768px) {
                :root :where([data-inline-grid]) { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
              }

              /* Force black focus outline and keep width constant */
              :root input[data-search]{ box-sizing: border-box; }
              :root input[data-search]:focus{ outline: 1px solid #fff !important; outline-offset: 0; border-color: #fff !important; box-shadow: none !important; }
              :root input[data-search]::placeholder{ color: rgba(0,0,0,0.45); }
            `,
          }}
        />
      </section>
    </div>
  );
};

export default Projects;