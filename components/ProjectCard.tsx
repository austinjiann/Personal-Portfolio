import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const uiFont = {
  fontFamily: 'Roboto, sans-serif',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  return (
    <article 
      className={`group h-full flex flex-col rounded-3xl overflow-hidden border border-zinc-700/60 bg-transparent transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${className}`}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        backgroundColor: 'transparent'
      }}
    >
      {/* TOP PANE - Filled background with content */}
      <div 
        className="bg-zinc-900/85 backdrop-blur-sm p-4 sm:p-5"
        style={{
          backgroundColor: 'rgba(24, 24, 27, 0.85)',
          backdropFilter: 'blur(4px)',
          padding: '1.25rem'
        }}
      >
        {/* Project Title */}
        <h3 
          className="text-lg font-semibold tracking-tight text-white"
          style={{
            ...uiFont,
            fontSize: '1.125rem',
            fontWeight: '600',
            letterSpacing: '-0.025em',
            color: 'white',
            marginBottom: '0.375rem'
          }}
        >
          {project.name}
        </h3>

        {/* Project Description */}
        <p 
          className="mt-1.5 text-sm text-zinc-300 line-clamp-3"
          style={{
            ...uiFont,
            marginTop: '0.375rem',
            fontSize: '0.875rem',
            color: 'rgb(212, 212, 216)',
            lineHeight: '1.25rem'
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div 
          className="mt-3 flex flex-wrap gap-2"
          style={{
            marginTop: '0.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
              style={{
                ...uiFont,
                fontSize: '0.75rem',
                paddingLeft: '0.625rem',
                paddingRight: '0.625rem',
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(39, 39, 42, 0.8)',
                color: 'rgb(228, 228, 231)',
                border: '1px solid rgba(63, 63, 70, 0.6)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div 
          className="mt-4 flex items-center gap-2"
          style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {/* Live Demo Button */}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm rounded-full px-3 py-1.5 border border-zinc-700/60 bg-zinc-800/80 hover:bg-zinc-700/80 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/40"
              style={{
                ...uiFont,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                borderRadius: '9999px',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                paddingTop: '0.375rem',
                paddingBottom: '0.375rem',
                border: '1px solid rgba(63, 63, 70, 0.6)',
                backgroundColor: 'rgba(39, 39, 42, 0.8)',
                color: 'white'
              }}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live</span>
            </a>
          )}

          {/* GitHub Icon Button */}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="inline-flex items-center justify-center rounded-full p-1.5 border border-zinc-700/60 hover:bg-zinc-800/70 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/40"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                padding: '0.375rem',
                border: '1px solid rgba(63, 63, 70, 0.6)',
                color: 'white'
              }}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* BOTTOM PANE - Preview only */}
      <div 
        className="relative mt-auto"
        style={{
          position: 'relative',
          marginTop: 'auto'
        }}
      >
        {/* Fixed aspect ratio to keep card heights aligned */}
        <div 
          className="aspect-[16/9] w-full overflow-hidden bg-black/40"
          style={{
            aspectRatio: '16/9',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={`${project.name} preview`} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div 
              className="h-full w-full flex items-center justify-center"
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div 
                className="text-white/30 text-sm"
                style={{
                  ...uiFont,
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontSize: '0.875rem'
                }}
              >
                No preview available
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;