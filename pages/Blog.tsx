import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-8">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-white mb-12">
          Blog
        </h1>
        <div className="space-y-8 text-left">
          <article className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-medium text-white mb-3">
              Coming Soon: My Thoughts on Modern Web Development
            </h2>
            <p className="text-gray-400 mb-4">
              I'm working on some exciting blog posts about the latest trends in web development, 
              my experiences building projects, and insights I've gained along the way.
            </p>
            <div className="text-sm text-gray-500">
              Stay tuned for updates...
            </div>
          </article>
          
          <article className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-medium text-white mb-3">
              Building Beautiful UIs with React and Tailwind
            </h2>
            <p className="text-gray-400 mb-4">
              A deep dive into creating responsive, accessible, and visually appealing 
              user interfaces using modern tools and best practices.
            </p>
            <div className="text-sm text-gray-500">
              Coming soon...
            </div>
          </article>
          
          <article className="bg-gray-900 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-medium text-white mb-3">
              The Developer's Journey: Lessons Learned
            </h2>
            <p className="text-gray-400 mb-4">
              Reflections on my growth as a developer, challenges I've faced, 
              and advice for others starting their coding journey.
            </p>
            <div className="text-sm text-gray-500">
              In progress...
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;