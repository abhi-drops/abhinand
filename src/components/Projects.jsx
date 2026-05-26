import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { projectsData } from '../data';
import ProjectModal from './ProjectModal';

// Random colors for project indicators - same palette as Experience/Skills
const projectColors = ['rose', 'amber', 'cyan', 'blue', 'purple', 'pink', 'green', 'orange', 'teal', 'lime', 'sky', 'emerald', 'yellow'];
const getColorClasses = (color) => {
  const colorMap = {
    cyan: 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]',
    blue: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    purple: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    pink: 'bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]',
    green: 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]',
    orange: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]',
    teal: 'bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.4)]',
    lime: 'bg-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.4)]',
    amber: 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]',
    rose: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]',
    sky: 'bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]',
    emerald: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    yellow: 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]'
  };
  return colorMap[color] || colorMap.cyan;
};

function Projects({ isActive, isDarkMode }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      // Exit animation
      if (hasAnimatedRef.current) {
        gsap.to([headerRef.current, ...cardsRef.current], {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.05
        });
      }
      return;
    }

    // Entry animation - only play once per visit
    hasAnimatedRef.current = true;

    // Animate header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Animate project cards with stagger
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        delay: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, [isActive]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className={`w-full min-h-screen py-20 px-4 transition-colors duration-300 ${isDarkMode
      ? 'bg-gradient-to-t from-gray-950 to-black'
      : 'bg-gray-50'
      }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <h1 className={`text-4xl md:text-5xl font-light mb-2 tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Projects
          </h1>
          <p className={`text-sm font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
            A showcase of my recent side projects
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => {
            const projectColor = projectColors[index % projectColors.length];
            return (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onClick={() => handleProjectClick(project)}
                className={`group cursor-pointer rounded-lg transition-all duration-300 ${isDarkMode
                  ? 'bg-gray-900/30 hover:bg-gray-900/50'
                  : 'bg-white hover:shadow-xl shadow-sm'
                  }`}
              >
                {/* Wrapper for positioning */}
                <div
                  className="relative"
                  style={{
                    clipPath: 'path("M 20 0 A 20 20 0 0 0 0 20 L 0 100% L 100% 100% L 100% 0 Z")'
                  }}
                >
                  {/* Colored Circle - positioned outside image container */}
                  <div className="absolute -top-5 -left-5 z-50">
                    <div id='mask-div' className={`flex justify-center items-center p-3 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'} rounded-full`}>
                      <div id='colored-circle' className={`w-4 h-4 rounded-full ${getColorClasses(projectColor)} transition-all duration-300 group-hover:scale-125`} />
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Project Name */}
                  <h3 className={`text-lg font-medium mb-3 transition-colors duration-300 ${isDarkMode
                    ? 'text-white group-hover:text-indigo-400'
                    : 'text-gray-900 group-hover:text-violet-600'
                    }`}>
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm mb-4 line-clamp-2 font-light transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    {project.description}
                  </p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${isDarkMode
                          ? 'bg-white text-black'
                          : 'bg-gray-900 text-white'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default Projects;
