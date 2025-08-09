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
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

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

  const handleToggleExpand = (projectId: string) => {
    if (expandedProjectId === projectId) {
      // Same project clicked - close it
      setExpandedProjectId(null);
    } else {
      // Different project clicked - open this one, close others
      setExpandedProjectId(projectId);
    }
  };

  return (
    <div className="flex-1 flex justify-center pt-32">
      <section style={{ margin: "0 auto", maxWidth: "1152px", paddingLeft: "16px", paddingRight: "16px" }}>
        

        {/* Trim container: right = 5.5 grids (≈110px), left = 4.5 grids (≈90px) */}
        <div data-right-trim style={{ width: 'calc(100% - 200px)', marginRight: '110px', marginLeft: '90px' }}>

          {/* Search Bar */}
          <div className="mb-8" style={{ marginTop: '40px', marginBottom: '48px' }}>
            <div data-search-wrap style={{ width: '952px', maxWidth: '100%', margin: '0 auto' }}>
              <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=" search for project names, tech stacks, or project types..."
              aria-label="Search projects"
              data-search
              className="w-full border px-5 py-4 transition-colors duration-200 focus:outline-none"
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
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              width: '100%',
              alignItems: 'flex-start',
            }}
          >
            {visible.map((project) => (
              <li
                key={project.id}
                style={{
                  width: '100%',
                  flex: '1 1 100%',
                  maxWidth: '100%',
                }}
              >
                <ProjectCard
                  project={project}
                  isExpanded={expandedProjectId === project.id}
                  onToggleExpand={() => handleToggleExpand(project.id)}
                />
              </li>
            ))}
          </ul>
        ) : null}

        </div>

        {/* Local media query to keep 1 column on mobile and 2 columns at md (768px) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* HIGH SPECIFICITY to beat any external styles */
              :root :where([data-inline-grid]) { display: flex !important; flex-wrap: wrap !important; gap: 24px !important; width: 100% !important; align-items: flex-start !important; }
              :root :where([data-inline-grid] > li) { flex: 1 1 100% !important; max-width: 100% !important; }
              @media (min-width: 768px) {
                :root :where([data-inline-grid] > li) { flex-basis: calc(50% - 12px) !important; max-width: calc(50% - 12px) !important; }
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