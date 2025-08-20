import fs from 'fs';
import path from 'path';

/**
 * Post-build script to set up GitHub Pages SPA routing
 * This copies index.html to 404.html and modifies it for SPA redirect handling
 */
function setupGitHubPagesSPA() {
  const buildDir = 'docs';
  const indexPath = path.join(buildDir, 'index.html');
  const notFoundPath = path.join(buildDir, '404.html');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found in build directory');
    process.exit(1);
  }

  // Read the built index.html
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Create 404.html content with redirect logic
  const notFoundContent = indexContent.replace(
    /<script type="text\/javascript">\s*\/\/ Handle redirects[\s\S]*?<\/script>/,
    `<script type="text/javascript">
      // Store the path in sessionStorage and redirect to index.html
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'"></meta>`
  );

  // Write 404.html
  fs.writeFileSync(notFoundPath, notFoundContent);
  
  console.log('✅ GitHub Pages SPA routing setup complete');
  console.log(`   - Created ${notFoundPath} for client-side routing`);
}

setupGitHubPagesSPA();