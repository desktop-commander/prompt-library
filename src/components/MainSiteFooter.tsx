import { Github, MessageCircle, Package, Layers, Twitter } from 'lucide-react';

export function MainSiteFooter() {
  return (
    <>
      {/* Discord Community Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-4">Need help or have questions?</h3>
          <p className="text-gray-700 mb-6 font-light">
            Join our Discord community for real-time support, discussions, and updates.
          </p>
          <a 
            href="https://discord.gg/kQ27sNnZr7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-light transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.02.06.03.09.02 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/>
            </svg>
            Join our Discord Server
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-600 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight max-w-4xl mx-auto">
            Skip coding.<br />Let AI build your product.
          </h2>
          <a 
            href="https://desktopcommander.app#installation" 
            className="inline-block bg-white text-blue-600 text-lg px-9 py-4 rounded-lg font-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Install DesktopCommander now
          </a>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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
              <p className="text-gray-300 mb-6 font-light">Build products faster without coding skills.</p>
              
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
                <li><a href="https://go.desktopcommander.app/free-call" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Free consultation</a></li>
                <li><a href="https://github.com/wonderwhy-er/DesktopCommanderMCP" target="_blank" rel="noopener" className="text-gray-300 hover:text-blue-400 transition-colors font-light">GitHub Repository</a></li>
                <li><a href="https://github.com/wonderwhy-er/DesktopCommanderMCP/wiki" target="_blank" rel="noopener" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Documentation</a></li>
                <li><a href="https://github.com/wonderwhy-er/DesktopCommanderMCP/issues" target="_blank" rel="noopener" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Issue Tracker</a></li>
                <li><a href="https://github.com/wonderwhy-er/DesktopCommanderMCP/releases" target="_blank" rel="noopener" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Release Notes</a></li>
                <li><a href="https://desktopcommander.app#installation" className="text-gray-300 hover:text-blue-400 transition-colors font-light">Installation</a></li>
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
