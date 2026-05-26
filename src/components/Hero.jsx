import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import reactIcon from '../assets/images/React.png';
import nodeicon from '../assets/images/Node.js.png';
import mongoicon from '../assets/images/MongoDB.png';
import AzureSQlicon from '../assets/images/SQL.png';
import v1 from '../assets/videos/v8.mp4';

gsap.registerPlugin(SplitText);

function Hero() {
  const fonts = ['fnt-yeseva','fnt-indie-flower','fnt-turret-road'];
  const [fontClass, setFontClass] = useState(fonts[0]);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const splitTitleRef = useRef(null);
  const splitSubtitleRef = useRef(null);
  const skillsRef = useRef(null);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);

  // Initialize SplitText on mount
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !skillsRef.current || !videoRef.current) return;

    // Split text into characters
    splitTitleRef.current = new SplitText(titleRef.current, { type: 'chars' });
    splitSubtitleRef.current = new SplitText(subtitleRef.current, { type: 'chars' });

    // Set initial state for video (scaled down and transparent)
    gsap.set(videoRef.current, {
      opacity: 0,
      scale: 0.7,
      filter: 'blur(20px)',
    });

    // Set initial state
    gsap.set(splitTitleRef.current.chars, {
      opacity: 0,
      filter: 'blur(20px)',
      scale: 0.8,
    });

    gsap.set(splitSubtitleRef.current.chars, {
      opacity: 0,
      filter: 'blur(15px)',
    });

    // Set initial state for skills icons
    gsap.set(skillsRef.current.children, {
      opacity: 0,
      filter: 'blur(15px)',
      scale: 0.8,
    });

    // Play initial animation
    playAnimation();

    // Cleanup
    return () => {
      if (splitTitleRef.current) splitTitleRef.current.revert();
      if (splitSubtitleRef.current) splitSubtitleRef.current.revert();
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  // Listen for horizontal scroll to detect when Hero comes into view
  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-x-auto');
    if (!scrollContainer) return;

    let lastScrollLeft = 0;
    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const viewportWidth = window.innerWidth;

      // Check if we're on the Hero page (scrollLeft < half viewport)
      const isOnHeroPage = scrollLeft < viewportWidth * 0.5;
      const wasOffHeroPage = lastScrollLeft >= viewportWidth * 0.5;

      // If we just scrolled back to Hero page, replay animation
      if (isOnHeroPage && wasOffHeroPage) {
        resetAndPlayAnimation();
      }

      lastScrollLeft = scrollLeft;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const playAnimation = () => {
    if (!splitTitleRef.current || !splitSubtitleRef.current || !skillsRef.current || !videoRef.current) return;

    // Kill existing timeline
    if (timelineRef.current) timelineRef.current.kill();

    // Create new timeline
    timelineRef.current = gsap.timeline();

    // Animate video zoom in and fade in
    timelineRef.current.to(videoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 2,
      filter: 'blur(0px)',
      ease: 'power2.out',
    });

    // Animate title with blur-in effect
    timelineRef.current.to(splitTitleRef.current.chars, {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      duration: 1.2,
      stagger: 0.03,
      ease: 'power3.out',
    }, '-=1.5');

    // Animate subtitle with blur-in effect (slightly delayed)
    timelineRef.current.to(
      splitSubtitleRef.current.chars,
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.02,
        ease: 'power2.out',
      },
      '-=0.7'
    );

    // Animate skills icons with blur-in effect
    timelineRef.current.to(
      skillsRef.current.children,
      {
        opacity: 1,
        filter: 'brightness(0) invert(1) opacity(0.9)',
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
  };

  const resetAndPlayAnimation = () => {
    if (!splitTitleRef.current || !splitSubtitleRef.current || !skillsRef.current || !videoRef.current) return;

    // Reset video to initial state
    gsap.set(videoRef.current, {
      opacity: 0,
      scale: 0.5,
      filter: 'blur(20px)',
    });

    // Reset to initial state
    gsap.set(splitTitleRef.current.chars, {
      opacity: 0,
      filter: 'blur(20px)',
      scale: 0.8,
    });

    gsap.set(splitSubtitleRef.current.chars, {
      opacity: 0,
      filter: 'blur(15px)',
    });

    // Reset skills icons
    gsap.set(skillsRef.current.children, {
      opacity: 0,
      filter: 'blur(15px)',
      scale: 0.8,
    });

    // Play animation
    playAnimation();
  };

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (!isFlickering) {
        // Start flicker - switch to next font
        const nextIndex = (currentFontIndex + 1) % fonts.length;
        setFontClass(fonts[nextIndex]);
        setIsFlickering(true);

        // After short flicker, go back to base font and update index
        setTimeout(() => {
          setFontClass(fonts[0]);
          setCurrentFontIndex(nextIndex);
          setIsFlickering(false);
        }, 80);
      }
    }, 200);

    return () => clearInterval(flickerInterval);
  }, [currentFontIndex, isFlickering]);

  return (
    <main className="relative w-full h-full overflow-hidden bg-black">

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={v1} type="video/mp4" />
      </video>

      {/* Content Layer */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">

        {/* Text with mix-blend-mode */}
        <h1
          ref={titleRef}
          className={`${fontClass} text-[5rem] md:text-[8rem] font-bold leading-none transition-all duration-75`}
          style={{
            color: 'white',
            mixBlendMode: 'difference'
          }}
        >
          ABHINAND A S
        </h1>

        <h3
          ref={subtitleRef}
          className="fnt-gfs text-xl md:text-2xl tracking-[0.4em] uppercase mt-2"
          style={{
            color: 'white',
            mixBlendMode: 'difference'
          }}
        >
          Full Stack Developer
        </h3>

        {/* Icons converted to solid white with transparency */}
        <div ref={skillsRef} className="flex gap-6 mt-12 items-center justify-center skills">
          <img
            src={reactIcon}
            className="w-12 h-12 object-contain hover:scale-110 transition-all duration-300 ease-in-out"
            alt="React"
            style={{
              mixBlendMode: 'difference',
              filter: 'brightness(0) invert(1) opacity(0.9)'
            }}
          />
          <img
            src={nodeicon}
            className="w-12 h-12 object-contain hover:scale-110 transition-all duration-300 ease-in-out"
            alt="Node"
            style={{
              mixBlendMode: 'difference',
              filter: 'brightness(0) invert(1) opacity(0.9)'
            }}
          />
          <img
            src={AzureSQlicon}
            className="w-10 h-10 object-contain hover:scale-110 transition-all duration-300 ease-in-out"
            alt="SQL"
            style={{
              mixBlendMode: 'difference',
              filter: 'brightness(0) invert(1) opacity(0.9)'
            }}
          />
          <img
            src={mongoicon}
            className="w-12 h-12 object-contain hover:scale-110 transition-all duration-300 ease-in-out"
            alt="Mongo"
            style={{
              mixBlendMode: 'difference',
              filter: 'brightness(0) invert(1) opacity(0.9)'
            }}
          />
        </div>

      </div>
    </main>
  );
}

export default Hero;
