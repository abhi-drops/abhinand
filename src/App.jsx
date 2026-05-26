import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

// Component Imports
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Education from './components/Education';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const scrollContainerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Track scroll position to update current page
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const pageWidth = window.innerWidth;
    const newPage = Math.round(scrollLeft / pageWidth);

    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [currentPage]);

  // Debounced scroll handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const debouncedScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        handleScroll();
      }, 150);
    };

    container.addEventListener('scroll', debouncedScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', debouncedScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const handleNavigate = (pageIndex) => {
    isScrollingRef.current = true;
    setCurrentPage(pageIndex);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: pageIndex * window.innerWidth,
        behavior: 'smooth'
      });
    }

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <div className='w-full h-[100vh] flex flex-col overflow-hidden'>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${isDarkMode
          ? 'bg-gray-800/50 border-gray-700 text-yellow-400 hover:bg-gray-700 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]'
          : 'bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
          } backdrop-blur-sm`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className='w-full h-[90vh] flex overflow-x-auto overflow-y-hidden scroll-smooth'
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Page 1: Hero */}
        <div className='min-w-full h-full flex-shrink-0 overflow-y-auto' style={{ scrollSnapAlign: 'start' }}>
          <Hero />
        </div>

        {/* Page 2: Experience */}
        <div className='min-w-full h-full flex-shrink-0 overflow-y-auto' style={{ scrollSnapAlign: 'start' }}>
          <Experience isActive={currentPage === 1} isDarkMode={isDarkMode} />
        </div>

        {/* Page 3: Skills */}
        <div className='min-w-full h-full flex-shrink-0 overflow-y-auto' style={{ scrollSnapAlign: 'start' }}>
          <Skills isActive={currentPage === 2} isDarkMode={isDarkMode} />
        </div>

        {/* Page 4: Projects */}
        <div className='min-w-full h-full flex-shrink-0 overflow-y-auto' style={{ scrollSnapAlign: 'start' }}>
          <Projects isActive={currentPage === 3} isDarkMode={isDarkMode} />
        </div>

        {/* Page 5: About */}
        <div className='min-w-full h-full flex-shrink-0 overflow-y-auto' style={{ scrollSnapAlign: 'start' }}>
          <About isActive={currentPage === 4} isDarkMode={isDarkMode} />
        </div>

        {/* Page 6: Education & Certificate */}
        <div className='min-w-full h-full flex-shrink-0 overflow-y-auto' style={{ scrollSnapAlign: 'start' }}>
          <Education isActive={currentPage === 5} isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* Left Arrow - Previous Page */}
      {currentPage > 0 && (
        <button
          onClick={() => handleNavigate(currentPage - 1)}
          className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-sm group ${isDarkMode
            ? 'bg-gray-800/50 hover:bg-gray-700 border-gray-700 hover:border-indigo-500/50 text-gray-400 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(129,140,248,0.3)]'
            : 'bg-white/90 hover:bg-gray-50 border-gray-300 hover:border-violet-500/50 text-gray-600 hover:text-violet-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
            }`}
          aria-label="Previous page"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Right Arrow - Next Page */}
      {currentPage < 5 && (
        <button
          onClick={() => handleNavigate(currentPage + 1)}
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 backdrop-blur-sm group ${isDarkMode
            ? 'bg-gray-800/50 hover:bg-gray-700 border-gray-700 hover:border-indigo-500/50 text-gray-400 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(129,140,248,0.3)]'
            : 'bg-white/90 hover:bg-gray-50 border-gray-300 hover:border-violet-500/50 text-gray-600 hover:text-violet-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]'
            }`}
          aria-label="Next page"
        >
          <svg
            className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );

}

export default App;