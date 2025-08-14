import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Heart } from 'lucide-react';

export function MainSiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-lg h-20">
      <div className="container mx-auto px-4 h-full max-w-7xl">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Logo */}
          <a href="https://desktopcommander.app" className="flex items-center flex-shrink-0">
            <img 
              src="https://desktopcommander.app/optimized_images/logo.webp" 
              alt="DesktopCommander Logo" 
              width="35" 
              height="35" 
              className="mr-2"
            />
            <span className="text-white font-light text-sm sm:text-base">DesktopCommander</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-1 justify-center">
            {/* Prompts Link */}
            <a href="/" className="hover:text-blue-400 transition-colors font-light">
              Prompts
            </a>

            <a href="https://desktopcommander.app#installation" className="hover:text-blue-400 transition-colors font-light">
              Installation
            </a>

            <a href="https://desktopcommander.app#testimonials" className="hover:text-blue-400 transition-colors font-light">
              Testimonials
            </a>

            {/* Resources Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a 
                href="#" 
                className="flex items-center hover:text-blue-400 transition-colors font-light"
              >
                Resources
                <ChevronDown className="ml-1 h-3 w-3 transition-transform group-hover:rotate-180" />
              </a>
              <div 
                className={`absolute top-full left-0 mt-1 bg-black rounded-md shadow-lg py-2 min-w-48 transition-all duration-300 ${
                  activeDropdown === 'resources' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                }`}
              >
                <a href="https://discord.gg/kQ27sNnZr7" target="_blank" rel="noopener" className="block px-4 py-2 hover:bg-white/10 transition-colors font-light">Join Discord</a>
                <a href="https://github.com/wonderwhy-er/DesktopCommanderMCP" target="_blank" rel="noopener" className="block px-4 py-2 hover:bg-white/10 transition-colors font-light">GITHUB</a>
                <a href="https://desktopcommander.app#media" className="block px-4 py-2 hover:bg-white/10 transition-colors font-light">Media</a>
                <a href="https://desktopcommander.app#faq" className="block px-4 py-2 hover:bg-white/10 transition-colors font-light">FAQ</a>
              </div>
            </div>

            {/* Sponsor Link */}
            <a href="https://desktopcommander.app#sponsors" className="flex items-center hover:text-blue-400 transition-colors font-light">
              <Heart className="mr-2 h-4 w-4" />
              Sponsor
            </a>
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Desktop CTA Button */}
            <a 
              href="https://desktopcommander.app#installation" 
              className="hidden xl:inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-light transition-colors whitespace-nowrap"
            >
              Install Desktop Commander
            </a>
            
            {/* Large Tablet CTA Button - Medium text */}
            <a 
              href="https://desktopcommander.app#installation" 
              className="hidden lg:inline-block xl:hidden bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-light transition-colors whitespace-nowrap"
            >
              Install DC
            </a>
            
            {/* Small Tablet CTA Button - Short text */}
            <a 
              href="https://desktopcommander.app#installation" 
              className="hidden md:inline-block lg:hidden bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md text-xs font-light transition-colors whitespace-nowrap"
            >
              Install
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 ml-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-black border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile CTA Button - First in menu */}
              <a 
                href="https://desktopcommander.app#installation" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-center font-medium transition-colors"
              >
                Install Desktop Commander
              </a>
              
              <div className="border-t border-gray-700 pt-4">
                <a href="/" className="block hover:text-blue-400 transition-colors font-light py-2">Prompts</a>
                <a href="https://desktopcommander.app#installation" className="block hover:text-blue-400 transition-colors font-light py-2">Installation</a>
                <a href="https://desktopcommander.app#testimonials" className="block hover:text-blue-400 transition-colors font-light py-2">Testimonials</a>
                <a href="https://discord.gg/kQ27sNnZr7" target="_blank" rel="noopener" className="block hover:text-blue-400 transition-colors font-light py-2">Join Discord</a>
                <a href="https://desktopcommander.app#sponsors" className="flex items-center hover:text-blue-400 transition-colors font-light py-2">
                  <Heart className="mr-2 h-4 w-4" />
                  Sponsor
                </a>
                <a href="https://github.com/wonderwhy-er/DesktopCommanderMCP" target="_blank" rel="noopener" className="block hover:text-blue-400 transition-colors font-light py-2">GITHUB</a>
                <a href="https://desktopcommander.app#media" className="block hover:text-blue-400 transition-colors font-light py-2">Media</a>
                <a href="https://desktopcommander.app#faq" className="block hover:text-blue-400 transition-colors font-light py-2">FAQ</a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
