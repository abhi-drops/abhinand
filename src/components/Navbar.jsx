function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 0, label: 'home' },
    { id: 1, label: 'Experience' },
    { id: 2, label: 'Skills' },
    { id: 3, label: 'Projects' },
    { id: 4, label: 'About & Contact me' },
    { id: 5, label: 'Education & Certificate' }
  ];

  return (
    <nav className='w-full h-[10vh] bg-gray-950 flex items-center justify-between px-6 transition-all duration-300'>
      <div className='flex gap-15 items-center'>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`bg-gray-200 rounded-full group flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out ${
              currentPage === item.id
                ? 'w-fit px-4 py-1 shadow-lg scale-105'
                : 'w-2 h-2 hover:w-fit hover:px-4 hover:py-3 hover:scale-105 hover:shadow-md'
            }`}
          >
            <p
              className={`font-medium transition-all duration-300 ease-in-out whitespace-nowrap ${
                currentPage === item.id
                  ? 'text-gray-950 opacity-100'
                  : 'text-transparent opacity-0 group-hover:text-gray-950 group-hover:opacity-100 w-0 group-hover:w-auto'
              }`}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <button className="bg-gray-200 text-gray-950 px-4 py-1 rounded-full font-medium hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
          Resume
        </button>
        <button className="bg-gray-200 text-gray-950 px-4 py-1 rounded-full font-medium hover:bg-gray-300 transition-colors duration-300">
          Contact Me
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
