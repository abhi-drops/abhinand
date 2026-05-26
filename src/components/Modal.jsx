import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Modal({ isOpen, onClose, data, isDarkMode }) {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen && data) {
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
    }, [isOpen, data]);

    if (!isOpen || !data) return null;

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

            {/* Modal Content */}
            <div
                ref={contentRef}
                className={`relative rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto border transition-colors ${isDarkMode
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
                    className={`absolute top-6 right-6 w-8 h-8 flex items-center justify-center transition-colors ${isDarkMode
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
                    {/* Header */}
                    <div className={`modal-section mb-8 pb-6 border-b transition-colors ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                        }`}>
                        <h2 className={`text-2xl font-semibold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{data.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{data.company}</span>
                            <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{data.period}</span>
                            {data.location && (
                                <>
                                    <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{data.location}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {data.description && (
                        <div className="modal-section mb-8">
                            <p className={`leading-relaxed transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>{data.description}</p>
                        </div>
                    )}

                    {/* Responsibilities */}
                    {data.responsibilities && data.responsibilities.length > 0 && (
                        <div className="modal-section mb-8">
                            <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                                }`}>
                                Responsibilities
                            </h3>
                            <ul className="space-y-3">
                                {data.responsibilities.map((item, index) => (
                                    <li key={index} className={`flex items-start gap-3 text-sm transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        <span className={`mt-1.5 text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'
                                            }`}>—</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies */}
                    {data.technologies && data.technologies.length > 0 && (
                        <div className="modal-section mb-8">
                            <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                                }`}>
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.technologies.map((tech, index) => (
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

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <div className="modal-section">
                            <h3 className={`text-sm uppercase tracking-wider mb-4 font-light transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                                }`}>
                                Projects
                            </h3>
                            <ul className="space-y-4">
                                {data.projects.map((project, index) => (
                                    <li key={index} className="text-sm">
                                        <h4 className={`font-medium mb-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>{project.name}</h4>
                                        <p className={`leading-relaxed transition-colors ${isDarkMode ? 'text-gray-500' : 'text-gray-600'
                                            }`}>{project.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Modal;
