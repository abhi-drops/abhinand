import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { skillsData } from '../data';

// Random colors for category indicators - expanded vibrant palette
const categoryColors = ['rose', 'amber', 'cyan', 'blue', 'purple', 'pink', 'green', 'orange', 'teal', 'lime', 'sky', 'emerald', 'yellow'];
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

function Skills({ isActive, isDarkMode }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const groupRefs = useRef([]);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isActive) {
      // Exit animation
      if (hasAnimatedRef.current) {
        gsap.to([headerRef.current, ...groupRefs.current], {
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

    // Animate skill groups with stagger
    groupRefs.current.forEach((group, index) => {
      if (group) {
        gsap.fromTo(
          group,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3 + index * 0.1,
            ease: 'power2.out'
          }
        );

        // Animate individual skill chips within each group
        const chips = group.querySelectorAll('.skill-chip');
        gsap.fromTo(
          chips,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.03,
            delay: 0.5 + index * 0.1,
            ease: 'back.out(1.5)'
          }
        );
      }
    });
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen py-20 px-4 transition-colors duration-300 ${isDarkMode
        ? 'bg-gradient-to-t from-gray-950 to-black'
        : 'bg-gradient-to-b from-gray-50 to-white'
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h1 className={`text-4xl md:text-5xl font-light mb-2 tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Skills & Technologies
          </h1>
          {/* <p className={`text-sm mt-4 transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>Click any skill to visit its official documentation</p> */}
        </div>

        {/* Skills Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((group, index) => {
            const categoryColor = categoryColors[index % categoryColors.length];
            return (
              <div
                key={index}
                ref={(el) => (groupRefs.current[index] = el)}
                className="group/card"
              >
                {/* Category Card */}
                <div className={`rounded-lg p-6 transition-all duration-300 h-full ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 hover:border-gray-700'
                  : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                  }`}>
                  {/* Category Header */}
                  <div className={`mb-6 pb-4 border-b transition-colors ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                    <h2 className={`text-xl font-medium tracking-wide flex items-center gap-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      <span className={`w-2 h-2 rounded-full ${getColorClasses(categoryColor)}`}></span>
                      {group.category}
                    </h2>
                    <p className={`text-xs mt-2 transition-colors ${isDarkMode ? 'text-gray-600' : 'text-gray-500'
                      }`}>{group.skills.length} technologies</p>
                  </div>

                  {/* Skills Chips - NEW FLAT ROUNDED DESIGN */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, skillIndex) => (
                      <a
                        key={skillIndex}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`skill-chip px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg ${isDarkMode
                          ? 'bg-white text-black hover:shadow-white/20'
                          : 'bg-gray-900 text-white hover:shadow-gray-900/30'
                          }`}
                        aria-label={`Learn more about ${skill.name}`}
                      >
                        {skill.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          
        </div>
      </div>
    </div>
  );
}

export default Skills;


