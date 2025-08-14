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
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="https://desktopcommander.app" className="flex items-center">
            <img 
              src="https://desktopcommander.app/optimized_images/logo.webp" 
              alt="DesktopCommander Logo" 
              width="35" 
              height="35" 
              className="mr-2"
            />
            <span className="text-white font-light">DesktopCommander</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          <div className="flex items-center space-x-4">
            <a 
              href="https://desktopcommander.app#installation" 
              className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-light transition-colors"
            >
              Install Desktop Commander
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2"
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
              <a href="/" className="block hover:text-blue-400 transition-colors font-light">Prompts</a>
              <a href="https://desktopcommander.app#installation" className="block hover:text-blue-400 transition-colors font-light">Installation</a>
              <a href="https://desktopcommander.app#testimonials" className="block hover:text-blue-400 transition-colors font-light">Testimonials</a>
              <a href="https://discord.gg/kQ27sNnZr7" target="_blank" rel="noopener" className="block hover:text-blue-400 transition-colors font-light">Join Discord</a>
              <a href="https://desktopcommander.app#sponsors" className="flex items-center hover:text-blue-400 transition-colors font-light">
                <Heart className="mr-2 h-4 w-4" />
                Sponsor
              </a>
              <a href="https://github.com/wonderwhy-er/DesktopCommanderMCP" target="_blank" rel="noopener" className="block hover:text-blue-400 transition-colors font-light">GITHUB</a>
              <a href="https://desktopcommander.app#media" className="block hover:text-blue-400 transition-colors font-light">Media</a>
              <a href="https://desktopcommander.app#faq" className="block hover:text-blue-400 transition-colors font-light">FAQ</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
