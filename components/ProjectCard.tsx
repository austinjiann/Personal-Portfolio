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
      className={`group h-full w-full flex flex-col rounded-3xl overflow-hidden border border-zinc-700/60 bg-transparent transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] ${className}`}
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "24px",
        backgroundColor: 'transparent'
      }}
    >
      {/* TOP PANE - Filled background with content */}
      <div 
        className="bg-zinc-900/85 backdrop-blur-sm p-3 sm:p-4"
        style={{
          backgroundColor: 'rgba(24, 24, 27, 0.85)',
          backdropFilter: 'blur(4px)',
          padding: '0.75rem'
        }}
      >
        {/* Project Title */}
        <h3 
          className="text-base font-semibold tracking-tight text-white"
          style={{
            ...uiFont,
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: '-0.025em',
            color: 'white',
            marginBottom: '0.25rem'
          }}
        >
          {project.name}
        </h3>

        {/* Project Description */}
        <p 
          className="mt-1 text-xs text-zinc-300 line-clamp-2"
          style={{
            ...uiFont,
            marginTop: '0.25rem',
            fontSize: '0.75rem',
            color: 'rgb(212, 212, 216)',
            lineHeight: '1rem'
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div 
          className="mt-2 flex flex-wrap gap-1"
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem'
          }}
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-800/80 text-zinc-200 border border-zinc-700/60"
              style={{
                ...uiFont,
                fontSize: '0.65rem',
                paddingLeft: '0.375rem',
                paddingRight: '0.375rem',
                paddingTop: '0.125rem',
                paddingBottom: '0.125rem',
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
          className="mt-2 flex items-center gap-1"
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          {/* Live Demo Button */}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-1 border border-zinc-700/60 bg-zinc-800/80 hover:bg-zinc-700/80 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/40"
              style={{
                ...uiFont,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                borderRadius: '9999px',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                border: '1px solid rgba(63, 63, 70, 0.6)',
                backgroundColor: 'rgba(39, 39, 42, 0.8)',
                color: 'white'
              }}
            >
              <ExternalLink className="h-3 w-3" />
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
              className="inline-flex items-center justify-center rounded-full p-1 border border-zinc-700/60 hover:bg-zinc-800/70 text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/40"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                padding: '0.25rem',
                border: '1px solid rgba(63, 63, 70, 0.6)',
                color: 'white'
              }}
            >
              <Github className="h-3 w-3" />
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
          className="aspect-[4/3] w-full overflow-hidden bg-black/40"
          style={{
            aspectRatio: '4/3',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }}
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : project.image ? (
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