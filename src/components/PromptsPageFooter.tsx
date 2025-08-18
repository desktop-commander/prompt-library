import { Github, MessageCircle, Package, Layers, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PromptsPageFooter() {
  console.log('PromptsPageFooter is rendering - NO CTA BANNER');
  return (
    <>
      {/* Simple Black Footer Only - NO DISCORD SECTION, NO CTA BANNER */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="https://desktopcommander.app/optimized_images/logo.webp" 
                  alt="Logo" 
                  width="30" 
                  height="30"
                  className="mr-3"
                />
                <h3 className="text-xl font-light">Desktop Commander</h3>
              </div>
              <p className="text-gray-300 mb-6 font-light">AI automation tool for Claude Desktop app.</p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/wonderwhy-er/DesktopCommanderMCP" 
                  target="_blank" 
                  rel="noopener" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://discord.gg/kQ27sNnZr7" 
                  target="_blank" 
                  rel="noopener" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Discord Server"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.npmjs.com/package/@wonderwhy-er/desktop-commander" 
                  target="_blank" 
                  rel="noopener" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="NPM Package"
                >
                  <Package className="h-5 w-5" />
                </a>
                <a 
                  href="https://bsky.app/profile/dcommandermcp.bsky.social" 
                  target="_blank" 
                  rel="noopener" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Bluesky Profile"
                >
                  <Layers className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/DCommander_MCP" 
                  target="_blank" 
                  rel="noopener" 
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="X (Twitter) Profile"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Prompt Library Column */}
            <div>
              <h3 className="text-lg font-light mb-4">Prompt Library</h3>
              <ul className="space-y-2">
                <li><Link to="/prompts" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Browse All Prompts</Link></li>
              </ul>
            </div>

            {/* Use Cases Column */}
            <div>
              <h3 className="text-lg font-light mb-4">Use Cases</h3>
              <ul className="space-y-2">
                <li><a href="https://desktopcommander.app#cases-software" className="text-gray-300 hover:text-blue-400 transition-colors font-light">AI Software Engineer</a></li>
                <li><a href="https://desktopcommander.app#cases-devops" className="text-gray-300 hover:text-blue-400 transition-colors font-light">AI DevOps</a></li>
                <li><a href="https://desktopcommander.app#cases-data" className="text-gray-300 hover:text-blue-400 transition-colors font-light">AI Data Analyst</a></li>
                <li><a href="https://desktopcommander.app#cases-writer" className="text-gray-300 hover:text-blue-400 transition-colors font-light">AI Technical Writer</a></li>
                <li><a href="https://desktopcommander.app#cases-uxui" className="text-gray-300 hover:text-blue-400 transition-colors font-light">AI UX/UI Designer</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-light mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://github.com/wonderwhy-er/DesktopCommanderMCP" target="_blank" rel="noopener" className="text-gray-300 hover:text-blue-400 transition-colors font-light">GitHub Repository</a></li>
                <li><a href="https://github.com/wonderwhy-er/DesktopCommanderMCP/wiki" target="_blank" rel="noopener" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Documentation</a></li>
                <li><a href="https://desktopcommander.app#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Testimonials</a></li>
                <li><a href="https://desktopcommander.app#media" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Media</a></li>
                <li><a href="https://desktopcommander.app#faq" className="text-gray-300 hover:text-blue-400 transition-colors font-light">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 font-light">&copy; 2025 Desktop Commander MCP. Open-source software under MIT license.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
