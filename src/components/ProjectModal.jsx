import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function ProjectModal({ isOpen, onClose, project, isDarkMode }) {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (isOpen && project) {
            // Reset image index when modal opens
            setCurrentImageIndex(0);
            setIsFullScreen(false);

            // Lock body scroll
            document.body.style.overflow = 'hidden';

            // Animate overlay with backdrop blur
            gsap.fromTo(
                overlayRef.current,
                {
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(0px)'
                },
                {
                    opacity: 1,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    duration: 0.5,
                    ease: 'power2.out'
                }
            );

            // Animate modal content with 3D transform
            gsap.fromTo(
                contentRef.current,
                {
                    scale: 0.7,
                    opacity: 0,
                    y: 100,
                    rotateX: 15,
                    rotateY: 5,
                    z: -200
                },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    z: 0,
                    duration: 0.8,
                    ease: 'power4.out',
                    clearProps: 'transform'
                }
            );

            // Stagger animate content sections
            const sections = contentRef.current?.querySelectorAll('.modal-section');
            if (sections && sections.length > 0) {
                gsap.fromTo(
                    sections,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        delay: 0.3,
                        ease: 'power3.out'
                    }
                );
            }
        } else if (modalRef.current && !isOpen) {
            // Animate modal closing with 3D transforms
            const closeTimeline = gsap.timeline({
                onComplete: () => {
                    // Unlock body scroll after animation
                    document.body.style.overflow = '';
                }
            });

            closeTimeline
                .to(contentRef.current, {
                    scale: 0.85,
                    opacity: 0,
                    y: -50,
                    rotateX: -10,
                    rotateY: -5,
                    z: -150,
                    duration: 0.4,
                    ease: 'power3.in'
                })
                .to(
                    overlayRef.current,
                    {
                        opacity: 0,
                        backdropFilter: 'blur(0px)',
                        WebkitBackdropFilter: 'blur(0px)',
                        duration: 0.3,
                        ease: 'power2.in'
                    },
                    '-=0.2'
                );
        }
    }, [isOpen, project]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? project.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === project.images.length - 1 ? 0 : prev + 1
        );
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    if (!isOpen || !project) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            style={{ perspective: '2000px' }}
        >
            {/* Overlay */}
            <div
                ref={overlayRef}
                className={`absolute inset-0 transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-black/40'
                    }`}
                style={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            />

            {/* Full Screen Image View */}
            {isFullScreen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                    onClick={toggleFullScreen}
                >
                    <button
                        onClick={toggleFullScreen}
                        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors z-[70]"
                        aria-label="Close full screen"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={project.images[currentImageIndex]}
                        alt={`${project.name} - Full screen`}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {project.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                                aria-label="Previous image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                                aria-label="Next image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Modal Content */}
            <div
                ref={contentRef}
                className={`relative rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border transition-colors ${isDarkMode
                    ? 'bg-gradient-to-t from-gray-950 to-black border-gray-800'
                    : 'bg-white border-gray-200'
                    }`}
                onClick={(e) => e.stopPropagation()}
                style={{ opacity: 0, transformStyle: 'preserve-3d' }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, {
                            scale: 1.1,
                            rotation: 90,
                            duration: 0.3,
                            ease: 'back.out(1.7)'
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }}
                    className={`absolute top-6 right-6 w-8 h-8 flex items-center justify-center transition-colors z-10 ${isDarkMode
                        ? 'text-gray-500 hover:text-white'
                        : 'text-gray-400 hover:text-gray-900'
                        }`}
                    aria-label="Close modal"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8 md:p-12">
                    {/* Image Gallery */}
                    <div className="modal-section mb-8">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-4 group cursor-pointer" onClick={toggleFullScreen}>
                            <img
                                src={project.images[currentImageIndex]}
                                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>

                        {/* Image Navigation */}
                        {project.images.length > 1 && (
                            <div className="flex items-center justify-between gap-4">
                                <button
                                    onClick={handlePrevImage}
                                    className={`px-4 py-2 rounded-lg border transition-all ${isDarkMode
                                        ? 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
                                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    aria-label="Previous image"
                                >
                                    ← Previous
                                </button>
                                <div className="flex gap-2">
                                    {project.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                ? isDarkMode ? 'bg-indigo-400 w-6' : 'bg-violet-600 w-6'
                                                : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                                }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleNextImage}
                                    className={`px-4 py-2 rounded-lg border transition-all ${isDarkMode
                                        ? 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
                                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    aria-label="Next image"
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Header */}
                    <div className={`modal-section mb-8 pb-6 border-b transition-colors ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                        <h2 className={`text-2xl font-semibold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{project.name}</h2>
                        <p className={`leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>{project.description}</p>
                    </div>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                        <div className="modal-section mb-8">
                            <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                                }`}>
                                Key Features
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {project.features.map((feature, index) => (
                                    <li key={index} className={`flex items-start gap-3 text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        <span className={`mt-1.5 text-xs ${isDarkMode ? 'text-indigo-400' : 'text-violet-600'
                                            }`}>✓</span>
                                        <span className="leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tech Stack */}
                    {project.stack && project.stack.length > 0 && (
                        <div className="modal-section mb-8">
                            <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                                }`}>
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${isDarkMode
                                            ? 'bg-white text-black'
                                            : 'bg-gray-900 text-white'
                                            }`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    <div className="modal-section flex flex-wrap gap-4">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${isDarkMode
                                    ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-indigo-500/50 hover:text-indigo-400'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-violet-500/50 hover:text-violet-600'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${isDarkMode
                                    ? 'bg-indigo-400/10 border-indigo-500/50 text-indigo-400 hover:bg-indigo-400/20'
                                    : 'bg-violet-600 border-violet-600 text-white hover:bg-violet-700'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Live Demo
                            </a>
                        )}
                        {project.linkedinLink && (
                            <a
                                href={project.linkedinLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${isDarkMode
                                    ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-indigo-500/50 hover:text-indigo-400'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-violet-500/50 hover:text-violet-600'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
