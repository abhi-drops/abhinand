import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { aboutData } from '../data';

function About({ isActive, isDarkMode }) {
  const headerRef = useRef(null);
  const photoStackRef = useRef(null);
  const photoRefs = useRef([]);
  const bioRef = useRef(null);
  const contactRef = useRef(null);
  const socialRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const autoRotateRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      // Exit animation
      if (hasAnimatedRef.current) {
        gsap.to([headerRef.current, photoStackRef.current, bioRef.current, contactRef.current, socialRef.current], {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.05
        });
      }
      // Clear auto-rotate
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
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

    // Animate photo stack container
    gsap.fromTo(
      photoStackRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );

    // Initial photo stack setup with subtle rotation
    photoRefs.current.forEach((photo, index) => {
      if (photo) {
        const offset = (index - activePhotoIndex) * 8; // Tighter stack
        const rotation = (index - activePhotoIndex) * 2; // Subtle rotation
        const scale = index === activePhotoIndex ? 1 : 0.95;
        const zIndex = aboutData.photos.length - Math.abs(index - activePhotoIndex);

        gsap.set(photo, {
          x: offset,
          y: offset * 0.5,
          rotation: rotation,
          scale: scale,
          zIndex: zIndex,
          opacity: 1
        });

        // Stagger entrance
        gsap.fromTo(
          photo,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: offset * 0.5,
            duration: 0.5,
            delay: 0.3 + (index * 0.08),
            ease: 'back.out(1.2)'
          }
        );
      }
    });

    // Animate bio
    gsap.fromTo(
      bioRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
    );

    // Animate contact
    gsap.fromTo(
      contactRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
    );

    // Animate social
    gsap.fromTo(
      socialRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' }
    );

    // Auto-rotate photos
    autoRotateRef.current = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % aboutData.photos.length);
    }, 4000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isActive]);

  // Animate photo transitions with smooth stacking effect
  useEffect(() => {
    if (!hasAnimatedRef.current) return;

    photoRefs.current.forEach((photo, index) => {
      if (photo) {
        const offset = (index - activePhotoIndex) * 8;
        const rotation = (index - activePhotoIndex) * 2;
        const scale = index === activePhotoIndex ? 1 : 0.95;
        const zIndex = aboutData.photos.length - Math.abs(index - activePhotoIndex);
        const brightness = index === activePhotoIndex ? 1 : 0.7;

        gsap.to(photo, {
          x: offset,
          y: offset * 0.5,
          rotation: rotation,
          scale: scale,
          zIndex: zIndex,
          filter: `brightness(${brightness})`,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    });
  }, [activePhotoIndex, isDarkMode]);

  const handlePhotoClick = () => {
    setActivePhotoIndex((prev) => (prev + 1) % aboutData.photos.length);
    // Reset auto-rotate timer
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = setInterval(() => {
        setActivePhotoIndex((prev) => (prev + 1) % aboutData.photos.length);
      }, 4000);
    }
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
            About Me
          </h1>
          <p className={`text-sm font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
            Get to know me better
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ">
          {/* Left Column - Compact Photo Stack */}
          <div className="flex justify-center lg:justify-center  h-fit sticky top-[20%]">
            <div
              ref={photoStackRef}
              onClick={handlePhotoClick}
              className="relative w-64 h-80 cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {aboutData.photos.map((photo, index) => (
                <div
                  key={index}
                  ref={(el) => (photoRefs.current[index] = el)}
                  className={`absolute inset-0 rounded-xl overflow-hidden border-2 transition-shadow ${isDarkMode
                    ? 'border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
                    : 'border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)]'
                    }`}
                  style={{
                    transformOrigin: 'center center',
                    willChange: 'transform'
                  }}
                >
                  <img
                    src={photo}
                    alt={`${aboutData.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                </div>
              ))}

              {/* Hover hint */}
              <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                Click to cycle photos
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8" style={{ perspective: '2000px' }}>
            {/* Bio Section - No hover effects */}
            <div
              ref={bioRef}
              className={`p-6 rounded-lg border-0 outline-none ring-0 transition-colors duration-300 ${isDarkMode
                ? 'bg-gray-900/20'
                : ' '
                }`}
            >
              <h2 className={`text-3xl font-semibold mb-4 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                {aboutData.name}
              </h2>
              <p className={`text-lg mb-4 font-medium transition-colors ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'
                }`}>
                {aboutData.title}
              </p>
              <p className={`text-justify leading-relaxed font-light transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {aboutData.bio}
              </p>
            </div>

            {/* Contact Information */}
            <div
              ref={contactRef}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
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
                // Animate heading color
                gsap.to(e.currentTarget.querySelector('h3'), {
                  color: isDarkMode ? 'rgb(129, 140, 248)' : 'rgb(139, 92, 246)',
                  duration: 0.15,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
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
                // Reset heading color
                gsap.to(e.currentTarget.querySelector('h3'), {
                  color: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(75, 85, 99)',
                  duration: 0.15,
                  ease: 'power2.out'
                });
              }}
              className={`p-6 rounded-lg transition-all duration-300 ${isDarkMode
                ? 'bg-gray-900/30 hover:bg-gray-900/50'
                : 'bg-white border-gray-200 hover:border-violet-500/50 shadow-sm hover:shadow-xl'
                } backdrop-blur-sm group`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                Contact Information
              </h3>
              <div className="space-y-3">
                {/* Email */}
                <div className={`flex items-center gap-3 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-light">{aboutData.contact.email}</span>
                </div>

                {/* Phone */}
                <a
                  href={`tel:${aboutData.contact.phone}`}
                  className={`flex items-center gap-3 group/item transition-colors ${isDarkMode
                    ? 'text-gray-400 hover:text-indigo-400'
                    : 'text-gray-600 hover:text-violet-600'
                    }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-light">{aboutData.contact.phone}</span>
                </a>

                {/* Location */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(aboutData.contact.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 group/item transition-colors ${isDarkMode
                    ? 'text-gray-400 hover:text-indigo-400'
                    : 'text-gray-600 hover:text-violet-600'
                    }`}
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-light">{aboutData.contact.location}</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div
              ref={socialRef}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
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
                // Animate heading color
                gsap.to(e.currentTarget.querySelector('h3'), {
                  color: isDarkMode ? 'rgb(129, 140, 248)' : 'rgb(139, 92, 246)',
                  duration: 0.15,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
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
                // Reset heading color
                gsap.to(e.currentTarget.querySelector('h3'), {
                  color: isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(75, 85, 99)',
                  duration: 0.15,
                  ease: 'power2.out'
                });
              }}
              className={`p-6 rounded-lg transition-all duration-300 ${isDarkMode
                ? 'bg-gray-900/30 hover:bg-gray-900/50'
                : 'bg-white border-gray-200 hover:border-violet-500/50 shadow-sm hover:shadow-xl'
                } backdrop-blur-sm group`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                Connect With Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* GitHub */}
                {aboutData.social.github && (
                  <a
                    href={aboutData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all group/item ${isDarkMode
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700 hover:border-indigo-500/50'
                      : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-violet-500/50 shadow-sm hover:shadow-md'
                      }`}
                  >
                    <svg className={`w-6 h-6 transition-colors ${isDarkMode
                      ? 'text-gray-400 group-hover/item:text-indigo-400'
                      : 'text-gray-600 group-hover/item:text-violet-600'
                      }`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className={`text-sm font-light transition-colors ${isDarkMode
                      ? 'text-gray-300 group-hover/item:text-white'
                      : 'text-gray-700 group-hover/item:text-gray-900'
                      }`}>GitHub</span>
                  </a>
                )}

                {/* LinkedIn */}
                {aboutData.social.linkedin && (
                  <a
                    href={aboutData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all group/item ${isDarkMode
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700 hover:border-indigo-500/50'
                      : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-violet-500/50 shadow-sm hover:shadow-md'
                      }`}
                  >
                    <svg className={`w-6 h-6 transition-colors ${isDarkMode
                      ? 'text-gray-400 group-hover/item:text-indigo-400'
                      : 'text-gray-600 group-hover/item:text-violet-600'
                      }`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className={`text-sm font-light transition-colors ${isDarkMode
                      ? 'text-gray-300 group-hover/item:text-white'
                      : 'text-gray-700 group-hover/item:text-gray-900'
                      }`}>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
