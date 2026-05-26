import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { educationData } from '../data';
import { projectsData } from '../data';
import ProjectModal from './ProjectModal';

function Education({ isActive, isDarkMode }) {
  const headerRef = useRef(null);
  const degreeRef = useRef(null);
  const courseGridRef = useRef(null);
  const courseCardsRef = useRef([]);
  const certCardsRef = useRef([]);
  const hasAnimatedRef = useRef(false);
  const academicProjectsRef = useRef([]);

  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter academic projects
  const academicProjects = projectsData.filter(project => project.isAcademic);

  useEffect(() => {
    if (!isActive) {
      // Exit animation
      if (hasAnimatedRef.current) {
        gsap.to([headerRef.current, degreeRef.current, courseGridRef.current], {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.in'
        });
      }
      return;
    }

    // Entry animation - only play once per visit
    hasAnimatedRef.current = true;

    // Animate header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    // Animate degree card with 3D effect
    gsap.fromTo(
      degreeRef.current,
      {
        opacity: 0,
        scale: 0.9,
        rotationY: -10,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      }
    );

    // Animate course grid
    gsap.fromTo(
      courseGridRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.7,
        ease: 'power2.out'
      }
    );

    // Animate course cards with wave effect
    courseCardsRef.current.forEach((card, index) => {
      if (card) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const delay = 0.9 + (row * 0.1) + (col * 0.05);

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
            rotation: gsap.utils.random(-5, 5)
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: delay,
            ease: 'back.out(1.4)'
          }
        );
      }
    });

    // Animate certification cards with flip effect
    certCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            rotationX: -90,
            transformOrigin: 'center top'
          },
          {
            opacity: 1,
            rotationX: 0,
            duration: 0.6,
            delay: 1.3 + (index * 0.15),
            ease: 'power2.out'
          }
        );
      }
    });

    // Animate academic project cards with slide-in effect
    academicProjectsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -30,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            delay: 0.8 + (index * 0.1),
            ease: 'power2.out'
          }
        );
      }
    });
  }, [isActive]);

  const handleDegreeHover = (isEntering) => {
    if (!degreeRef.current) return;

    gsap.to(degreeRef.current, {
      scale: isEntering ? 1.02 : 1,
      y: isEntering ? -5 : 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleCourseHover = (card, isEntering) => {
    if (!card) return;

    gsap.to(card, {
      y: isEntering ? -8 : 0,
      scale: isEntering ? 1.05 : 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.5)'
    });
  };

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
      : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center" style={{ perspective: '1000px' }}>
          <h1 className={`text-4xl md:text-5xl font-light mb-2 tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Education Journey
          </h1>
          <p className={`text-sm font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
            Academic achievements and continuous learning
          </p>
        </div>

        {/* Featured Degree - Certificate Style */}
        {educationData.degrees.slice(0, 1).map((degree) => (
          <div
            key={degree.id}
            ref={degreeRef}
            className="max-w-4xl mx-auto mb-20"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => handleDegreeHover(true)}
            onMouseLeave={() => handleDegreeHover(false)}
          >
            {/* Certificate-Style Card */}
            <div className={`relative p-8 md:p-12 rounded-2xl border-4 transition-all duration-500 ${isDarkMode
              ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-gray-800 hover:border-indigo-500/50 shadow-2xl'
              : 'bg-gradient-to-br from-white via-gray-50 to-white border-gray-300 hover:border-violet-500/50 shadow-2xl hover:shadow-3xl'
              }`}>
              {/* Decorative Corner Elements */}
              <div className={`absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 ${isDarkMode ? 'border-indigo-400/30' : 'border-violet-600/30'
                }`} />
              <div className={`absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 ${isDarkMode ? 'border-indigo-400/30' : 'border-violet-600/30'
                }`} />
              <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 ${isDarkMode ? 'border-indigo-400/30' : 'border-violet-600/30'
                }`} />
              <div className={`absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 ${isDarkMode ? 'border-indigo-400/30' : 'border-violet-600/30'
                }`} />

              {/* Graduation Cap Icon */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${isDarkMode
                  ? 'bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 border-2 border-indigo-400/40'
                  : 'bg-gradient-to-br from-violet-600/20 to-violet-800/20 border-2 border-violet-600/40'
                  }`}>
                  <svg className={`w-10 h-10 ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              </div>

              {/* Degree Information */}
              <div className="text-center mb-6">
                <div className={`inline-block px-6 py-2 rounded-full text-sm font-medium mb-4 ${isDarkMode
                  ? 'bg-indigo-400/10 text-indigo-400 border-2 border-indigo-400/30'
                  : 'bg-violet-600/10 text-violet-600 border-2 border-violet-600/30'
                  }`}>
                  {degree.period}
                </div>

                <h3 className={`text-2xl md:text-3xl font-medium mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  {degree.degree}
                </h3>

                <p className={`text-xl md:text-2xl font-light mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'
                  }`}>
                  {degree.institution}
                </p>

                <div className={`flex items-center justify-center gap-4 text-sm mb-6 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {degree.location}
                  </span>
                  <span>•</span>
                  <span className={`font-medium ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'}`}>
                    GPA: {degree.gpa}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className={`text-center max-w-2xl mx-auto mb-8 leading-relaxed font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {degree.description}
              </p>

              {/* Academic Projects */}
              {academicProjects.length > 0 && (
                <div className={`pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <h4 className={`text-center text-sm uppercase tracking-wider mb-6 font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                    Academic Projects
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {academicProjects.map((project, idx) => (
                      <div
                        key={project.id}
                        ref={(el) => (academicProjectsRef.current[idx] = el)}
                        onClick={() => handleProjectClick(project)}
                        className={`group flex items-start gap-3 text-sm font-light p-4 rounded-lg cursor-pointer transition-all duration-300 ${isDarkMode
                          ? 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50 hover:border-indigo-500/30 border border-transparent'
                          : 'bg-gray-100/50 text-gray-600 hover:bg-gray-100 hover:border-violet-500/30 border border-transparent'
                          }`}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-indigo-400/20 group-hover:bg-indigo-400/30' : 'bg-violet-600/20 group-hover:bg-violet-600/30'
                          }`}>
                          <svg className={`w-3 h-3 ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium mb-1 transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-violet-600'}`}>
                            {project.name}
                          </div>
                          <div className="text-xs line-clamp-2 opacity-80">
                            {project.description}
                          </div>
                        </div>
                        <svg className={`w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Decorative Bottom Line */}
              <div className={`mt-8 pt-6 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-px w-16 ${isDarkMode ? 'bg-indigo-400/30' : 'bg-violet-600/30'}`} />
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-indigo-400/50' : 'text-violet-600/50'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className={`h-px w-16 ${isDarkMode ? 'bg-indigo-400/30' : 'bg-violet-600/30'}`} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Certifications Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-light mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Industry Certifications
            </h2>
            <p className={`text-sm font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Validated expertise and professional credentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
            {educationData.certifications.map((cert, index) => (
              <div
                key={cert.id}
                ref={(el) => (certCardsRef.current[index] = el)}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-900/80 to-gray-950/80 border-gray-800 hover:border-indigo-500/50'
                  : 'bg-white border-gray-200 hover:border-violet-500/50 shadow-lg hover:shadow-xl'
                  }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Badge Icon */}
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDarkMode
                  ? 'bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 border-2 border-indigo-400/30'
                  : 'bg-gradient-to-br from-violet-600/20 to-violet-800/20 border-2 border-violet-600/30'
                  }`}>
                  <svg className={`w-8 h-8 ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>

                <h3 className={`text-lg font-medium mb-2 text-center transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  {cert.name}
                </h3>

                <p className={`text-sm text-center mb-4 font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  {cert.issuer}
                </p>

                <div className={`space-y-2 text-sm mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  <div className="flex justify-between">
                    <span className="font-light">Issued:</span>
                    <span className="font-medium">{cert.issued}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light">Expires:</span>
                    <span className={`font-medium ${cert.expires === 'Never' ? (isDarkMode ? 'text-indigo-400' : 'text-violet-600') : ''}`}>
                      {cert.expires}
                    </span>
                  </div>
                </div>

                <div className={`pt-4 border-t text-center ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-light transition-colors ${isDarkMode
                      ? 'text-indigo-400 hover:text-indigo-300'
                      : 'text-violet-600 hover:text-violet-700'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Verify Credential
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div ref={courseGridRef}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-light mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Professional Development
            </h2>
            <p className={`text-sm font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Continuous learning through specialized courses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {educationData.courses.map((course, index) => (
              <div
                key={course.id}
                ref={(el) => (courseCardsRef.current[index] = el)}
                onMouseEnter={(e) => handleCourseHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleCourseHover(e.currentTarget, false)}
                className={`group p-5 rounded-lg border transition-all duration-300 cursor-pointer ${isDarkMode
                  ? 'bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800 hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgba(129,140,248,0.15)]'
                  : 'bg-white border-gray-200 hover:border-violet-500/50 shadow-sm hover:shadow-xl'
                  }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center transition-all duration-300 ${isDarkMode
                  ? 'bg-indigo-400/10 group-hover:bg-indigo-400/20'
                  : 'bg-violet-600/10 group-hover:bg-violet-600/20'
                  }`}>
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <h3 className={`text-base font-medium mb-2 line-clamp-2 transition-colors ${isDarkMode
                  ? 'text-white group-hover:text-indigo-400'
                  : 'text-gray-900 group-hover:text-violet-600'
                  }`}>
                  {course.name}
                </h3>

                <p className={`text-xs mb-1 font-light ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  {course.provider}
                </p>

                <p className={`text-xs mb-3 font-light ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                  {course.completed}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.skills.slice(0, 2).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 text-xs rounded-full ${isDarkMode
                        ? 'bg-white text-black'
                        : 'bg-gray-900 text-white'
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 2 && (
                    <span className={`px-2 py-0.5 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      +{course.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
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

export default Education;
