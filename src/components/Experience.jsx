import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { experienceData } from '../data';
import Modal from './Modal';

// Random colors for timeline dots - expanded vibrant palette
const dotColors = ['rose', 'amber', 'cyan', 'blue', 'purple', 'pink', 'green', 'orange', 'teal', 'lime', 'sky', 'emerald', 'yellow'];
const getColorClasses = (color) => {
  const colorMap = {
    cyan: 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]',
    blue: 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    purple: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    pink: 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]',
    green: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    orange: 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]',
    teal: 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]',
    lime: 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]',
    amber: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]',
    rose: 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]',
    sky: 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]',
    emerald: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    yellow: 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
  };
  return colorMap[color] || colorMap.cyan;
};

function Experience({ isActive, isDarkMode }) {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const headerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      // Exit animation
      if (hasAnimatedRef.current) {
        gsap.to([headerRef.current, lineRef.current, ...itemsRef.current], {
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

    // Animate horizontal timeline line
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
    );

    // Animate timeline items with enhanced stagger and 3D effects
    gsap.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        y: 80,
        x: -30,
        scale: 0.8,
        rotateY: -15,
        rotateX: 10,
        z: -100,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        duration: 1.2,
        delay: 0.5,
        stagger: {
          amount: 0.6,
          from: 'start',
          ease: 'power2.out'
        },
        ease: 'power4.out',
        clearProps: 'all'
      }
    );
  }, [isActive]);

  const handleItemClick = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedExperience(null), 300);
  };

  return (
    <div className={`w-full min-h-screen py-20 px-4 transition-colors duration-300 ${isDarkMode
      ? 'bg-gradient-to-t from-gray-950 to-black'
      : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <h1 className={`text-4xl md:text-5xl font-light mb-2 tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Experience
          </h1>

        </div>

        {/* Horizontal Timeline */}
        <div ref={timelineRef} className="relative" style={{ perspective: '2000px' }}>
          {/* Horizontal Line */}
          <div className="relative mb-16">
            <div
              ref={lineRef}
              className={`h-px transition-colors ${isDarkMode
                ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700'
                : 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300'
                }`}
            />
          </div>

          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experienceData.map((experience, index) => {
              const dotColor = dotColors[index % dotColors.length];
              const isNotLast = index < experienceData.length - 1;
              return (
                <div
                  key={experience.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className="relative"
                >
                  {/* Timeline Dot with Connecting Line */}
                  <div className="absolute -top-[4.5rem] left-0 flex flex-col items-start w-full">
                    <div className="flex items-center w-full">
                      <button
                        onClick={() => handleItemClick(experience)}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget.querySelector('.dot'), {
                            scale: 1.5,
                            duration: 0.3,
                            ease: 'back.out(1.7)'
                          });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget.querySelector('.dot'), {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                          });
                        }}
                        className="flex-shrink-0 group cursor-pointer z-10"
                        aria-label={`View details for ${experience.title}`}
                      >
                        <div className={`dot w-3 h-3 rounded-full ${getColorClasses(dotColor)} transition-shadow`} />
                      </button>

                      {/* Connecting Line to Next Circle */}
                      {isNotLast && (
                        <div className={`hidden lg:block flex-1 h-px ml-3 transition-colors ${isDarkMode
                          ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                          : 'bg-gradient-to-r from-gray-400 to-gray-300'
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    onClick={() => handleItemClick(experience)}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget;
                      gsap.to(card, {
                        y: -10,
                        scale: 1.02,
                        rotateY: 2,
                        rotateX: -2,
                        z: 50,
                        duration: 0.15,
                        ease: 'power2.out',
                        outline: isDarkMode
                          ? '2px solid rgba(99, 102, 241, 0.5)'
                          : '2px solid rgba(139, 92, 246, 0.5)',
                        outlineOffset: '2px'
                      });

                      // Animate title
                      gsap.to(card.querySelector('h3'), {
                        x: 3,
                        duration: 0.15,
                        ease: 'power2.out'
                      });

                      // Animate button
                      gsap.to(card.querySelector('button'), {
                        scale: 1.05,
                        duration: 0.15,
                        ease: 'back.out(1.7)'
                      });
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      gsap.to(card, {
                        y: 0,
                        scale: 1,
                        rotateY: 0,
                        rotateX: 0,
                        z: 0,
                        duration: 0.15,
                        ease: 'power2.out',
                        outline: 'none',
                        outlineOffset: '0px'
                      });

                      // Reset title
                      gsap.to(card.querySelector('h3'), {
                        x: 0,
                        duration: 0.15,
                        ease: 'power2.out'
                      });

                      // Reset button
                      gsap.to(card.querySelector('button'), {
                        scale: 1,
                        duration: 0.15,
                        ease: 'power2.out'
                      });
                    }}
                    className={`p-4 rounded-lg transition-all duration-300 ${isDarkMode
                      ? 'bg-gray-900/30 hover:bg-gray-900/50'
                      : 'bg-white border-gray-200 hover:border-violet-500/50 shadow-sm hover:shadow-xl  '
                      } backdrop-blur-sm group cursor-pointer`}
                    style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                  >
                    {/* Position */}
                    <h3 className={`text-lg font-medium mb-2 transition-all duration-300 ${isDarkMode
                      ? 'text-white group-hover:text-indigo-400'
                      : 'text-gray-900 group-hover:text-violet-600'
                      }`}>
                      {experience.title}
                    </h3>

                    {/* Company */}
                    <p className={`text-sm font-medium mb-1 transition-all duration-300 ${isDarkMode
                      ? 'text-gray-400 group-hover:text-indigo-300'
                      : 'text-gray-600 group-hover:text-violet-500'
                      }`}>
                      {experience.company}
                    </p>

                    {/* Years */}
                    <p className={`text-xs mb-3 font-light transition-all duration-300 ${isDarkMode
                      ? 'text-gray-500 group-hover:text-indigo-300'
                      : 'text-gray-500 group-hover:text-violet-500'
                      }`}>
                      {experience.period}
                    </p>

                    {/* Summary */}
                    <p className={`text-sm mb-4 font-light leading-relaxed transition-all duration-300 ${isDarkMode
                      ? 'text-gray-400 group-hover:text-gray-300'
                      : 'text-gray-600 group-hover:text-gray-700'
                      }`}>
                      {experience.summary}
                    </p>

                    {/* View More Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(experience);
                      }}
                      className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${isDarkMode
                        ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)]'
                        : 'bg-violet-100 text-violet-600 hover:bg-violet-200 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                        }`}
                      aria-label={`View more details about ${experience.title}`}
                    >
                      View More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedExperience}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default Experience;
