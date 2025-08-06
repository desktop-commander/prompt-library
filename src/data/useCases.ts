export interface UseCase {
  id: string;
  title: string;
  description: string;
  prompt: string;
  difficulty: 'Simple' | 'Medium' | 'Complex';
  targetRoles: string[];
  category: string;
  votes: number;
  icon: string;
  tags: string[];
}

export const useCases: UseCase[] = [
  {
    id: '1',
    title: 'Explore and Understand New Repository',
    description: 'Quickly understand a new codebase structure, key files, and architecture patterns.',
    prompt: 'I need you to explore this repository and help me understand its structure. Please:\n\n1. First, explore the main directory structure and identify the key folders\n2. Look at the package.json or similar config files to understand dependencies and scripts\n3. Find and analyze the main entry points (like index.js, main.py, etc.)\n4. Identify the architecture pattern being used\n5. Look for documentation files (README, docs folder, etc.)\n6. Summarize the project\'s purpose, tech stack, and how to get started\n\nPlease give me a clear overview of what this project does and how it\'s organized.',
    difficulty: 'Simple',
    targetRoles: ['Developer', 'Team Lead'],
    category: 'Code Exploration',
    votes: 156,
    icon: 'FolderSearch',
    tags: ['repository', 'code-analysis', 'documentation']
  },
  {
    id: '2',
    title: 'Organize Downloads Folder',
    description: 'Automatically sort and organize files in your downloads folder by type, date, or project.',
    prompt: 'Help me organize my Downloads folder. Please:\n\n1. Scan the Downloads folder and categorize all files by type (documents, images, videos, installers, etc.)\n2. Create organized subfolders if they don\'t exist\n3. Move files to appropriate subfolders\n4. Identify and handle duplicate files\n5. Remove empty folders\n6. Generate a summary report of what was organized\n\nMake sure to ask before deleting anything and create a backup list of moves in case I need to undo.',
    difficulty: 'Simple',
    targetRoles: ['Everyone'],
    category: 'File Management',
    votes: 203,
    icon: 'FolderOrganize',
    tags: ['organization', 'cleanup', 'files']
  },
  {
    id: '3',
    title: 'Build Simple Web App Locally',
    description: 'Create a complete web application with frontend and basic backend functionality.',
    prompt: 'I want to build a simple web application. Please help me:\n\n1. Set up a new project structure with HTML, CSS, and JavaScript\n2. Create a basic responsive layout with navigation\n3. Add a simple form for user input\n4. Implement basic JavaScript functionality for form handling\n5. Set up a simple local server setup\n6. Add some basic styling to make it look professional\n7. Include basic form validation\n8. Test the application and fix any issues\n\nPlease make it a [describe your app idea] and walk me through each step.',
    difficulty: 'Medium',
    targetRoles: ['Developer', 'Entrepreneur'],
    category: 'Development',
    votes: 187,
    icon: 'Code',
    tags: ['web-development', 'frontend', 'project-setup']
  },
  {
    id: '4',
    title: 'Analyze Data File',
    description: 'Perform comprehensive analysis on CSV, Excel, or JSON data files with insights and visualizations.',
    prompt: 'I have a data file that I need analyzed. Please:\n\n1. Load and examine the data file structure\n2. Provide basic statistics (row count, column types, missing values)\n3. Identify patterns, trends, and anomalies in the data\n4. Create relevant visualizations (charts, graphs)\n5. Generate insights and recommendations based on the data\n6. Export a summary report with key findings\n7. Suggest data cleaning steps if needed\n\nThe file is located at [file path]. Please start with an overview and then dive into detailed analysis.',
    difficulty: 'Simple',
    targetRoles: ['Everyone'],
    category: 'Data Analytics',
    votes: 234,
    icon: 'BarChart3',
    tags: ['data-analysis', 'visualization', 'insights']
  },
  {
    id: '5',
    title: 'Set Up Development Environment',
    description: 'Configure a complete development environment for a specific technology stack.',
    prompt: 'Help me set up a complete development environment for [technology stack]. Please:\n\n1. Check current system and installed tools\n2. Install necessary development tools and dependencies\n3. Configure IDE/editor with relevant extensions and settings\n4. Set up version control (Git) with proper configuration\n5. Configure package managers and build tools\n6. Set up environment variables and configuration files\n7. Create a sample project to test the setup\n8. Document the setup process for future reference\n\nPlease guide me through each step and verify everything is working correctly.',
    difficulty: 'Medium',
    targetRoles: ['Developer'],
    category: 'DevOps',
    votes: 145,
    icon: 'Settings',
    tags: ['setup', 'configuration', 'development']
  },
  {
    id: '6',
    title: 'Generate Project Documentation',
    description: 'Create comprehensive documentation for your codebase including README, API docs, and guides.',
    prompt: 'Help me generate comprehensive documentation for my project. Please:\n\n1. Analyze the codebase structure and functionality\n2. Create a detailed README.md with project overview, installation, and usage\n3. Generate API documentation if applicable\n4. Create developer setup and contribution guidelines\n5. Document key architectural decisions and patterns\n6. Add code comments where missing\n7. Create user guides and tutorials\n8. Set up documentation structure for easy maintenance\n\nMake sure the documentation is clear, comprehensive, and follows best practices.',
    difficulty: 'Medium',
    targetRoles: ['Developer', 'Technical Writer'],
    category: 'Documentation',
    votes: 98,
    icon: 'FileText',
    tags: ['documentation', 'readme', 'api-docs']
  },
  {
    id: '7',
    title: 'Backup Important Files',
    description: 'Create automated backup system for important files and directories.',
    prompt: 'Help me create a backup system for my important files. Please:\n\n1. Identify important directories and files that need backing up\n2. Create a backup strategy with multiple destinations\n3. Set up automated backup scripts\n4. Implement versioning to keep multiple backup copies\n5. Add compression to save space\n6. Create restore procedures and test them\n7. Set up monitoring to ensure backups are working\n8. Document the backup system for future maintenance\n\nMake sure to test the backup and restore process thoroughly.',
    difficulty: 'Complex',
    targetRoles: ['Everyone'],
    category: 'System Management',
    votes: 167,
    icon: 'Archive',
    tags: ['backup', 'automation', 'security']
  },
  {
    id: '8',
    title: 'Code Security Audit',
    description: 'Perform comprehensive security analysis of your codebase to identify vulnerabilities.',
    prompt: 'Please perform a security audit of my codebase. I need you to:\n\n1. Scan for common security vulnerabilities (SQL injection, XSS, etc.)\n2. Check for hardcoded credentials and sensitive data exposure\n3. Analyze dependencies for known security issues\n4. Review authentication and authorization implementations\n5. Check input validation and sanitization\n6. Identify potential data leaks or privacy issues\n7. Generate a security report with prioritized recommendations\n8. Suggest fixes and best practices for each issue found\n\nPlease be thorough and provide actionable recommendations.',
    difficulty: 'Complex',
    targetRoles: ['Developer', 'Security Engineer'],
    category: 'Security',
    votes: 89,
    icon: 'Shield',
    tags: ['security', 'audit', 'vulnerability']
  },
  {
    id: '9',
    title: 'Database Query Optimization',
    description: 'Analyze and optimize database queries for better performance.',
    prompt: 'Help me optimize my database queries and performance. Please:\n\n1. Connect to my database and analyze the current schema\n2. Identify slow-running queries using EXPLAIN/execution plans\n3. Analyze table structures and relationships\n4. Suggest index optimizations\n5. Identify N+1 query problems and suggest solutions\n6. Recommend query refactoring for better performance\n7. Check for proper use of database features (views, stored procedures)\n8. Generate a performance improvement report\n\nPlease provide specific recommendations with before/after comparisons.',
    difficulty: 'Complex',
    targetRoles: ['Developer', 'Database Admin'],
    category: 'Database',
    votes: 124,
    icon: 'Database',
    tags: ['database', 'optimization', 'performance']
  },
  {
    id: '10',
    title: 'Create API Testing Suite',
    description: 'Build comprehensive API tests with multiple scenarios and automated validation.',
    prompt: 'Help me create a comprehensive API testing suite. Please:\n\n1. Analyze my API endpoints and documentation\n2. Create test cases for all endpoints (GET, POST, PUT, DELETE)\n3. Add authentication and authorization tests\n4. Implement data validation tests\n5. Create error handling and edge case tests\n6. Set up performance and load testing\n7. Add automated test reporting\n8. Integrate with CI/CD pipeline\n\nMake sure to test both happy paths and error scenarios thoroughly.',
    difficulty: 'Medium',
    targetRoles: ['Developer', 'QA Engineer'],
    category: 'Testing',
    votes: 112,
    icon: 'TestTube',
    tags: ['api', 'testing', 'automation']
  },
  {
    id: '11',
    title: 'Automated Task Scheduler',
    description: 'Create scripts to automate repetitive tasks and schedule them appropriately.',
    prompt: 'Help me automate repetitive tasks on my system. Please:\n\n1. Identify tasks that can be automated (file cleanup, backups, reports, etc.)\n2. Create scripts for each automated task\n3. Set up proper scheduling (cron jobs, task scheduler)\n4. Add error handling and logging\n5. Create monitoring and notification systems\n6. Test all automated tasks thoroughly\n7. Document the automation system\n8. Set up maintenance procedures\n\nMake sure the automation is reliable and includes proper error recovery.',
    difficulty: 'Medium',
    targetRoles: ['Developer', 'System Admin'],
    category: 'Automation',
    votes: 198,
    icon: 'Clock',
    tags: ['automation', 'scheduling', 'productivity']
  },
  {
    id: '12',
    title: 'Code Refactoring Assistant',
    description: 'Systematically refactor legacy code to improve maintainability and performance.',
    prompt: 'Help me refactor this legacy code to improve its quality. Please:\n\n1. Analyze the current code structure and identify issues\n2. Suggest architectural improvements\n3. Refactor functions to be more modular and reusable\n4. Improve naming conventions and code readability\n5. Add proper error handling and logging\n6. Update to use modern language features and best practices\n7. Add unit tests for refactored code\n8. Document changes and provide migration guide\n\nMake sure to maintain existing functionality while improving code quality.',
    difficulty: 'Complex',
    targetRoles: ['Developer', 'Tech Lead'],
    category: 'Code Quality',
    votes: 156,
    icon: 'RefreshCw',
    tags: ['refactoring', 'code-quality', 'modernization']
  },
  {
    id: '13',
    title: 'Environment Migration Helper',
    description: 'Migrate applications and configurations between different environments safely.',
    prompt: 'Help me migrate my application from one environment to another. Please:\n\n1. Analyze current environment configuration and dependencies\n2. Create environment-specific configuration files\n3. Set up deployment scripts for the new environment\n4. Migrate database schema and data if needed\n5. Update DNS and networking configurations\n6. Test the application in the new environment\n7. Create rollback procedures\n8. Document the migration process\n\nEnsure zero-downtime migration with proper testing at each step.',
    difficulty: 'Complex',
    targetRoles: ['DevOps', 'System Admin'],
    category: 'DevOps',
    votes: 87,
    icon: 'ArrowRightLeft',
    tags: ['migration', 'deployment', 'infrastructure']
  },
  {
    id: '14',
    title: 'Performance Monitoring Setup',
    description: 'Implement comprehensive monitoring and alerting for application performance.',
    prompt: 'Help me set up performance monitoring for my application. Please:\n\n1. Identify key performance metrics to track\n2. Set up application performance monitoring (APM)\n3. Configure server and infrastructure monitoring\n4. Create custom dashboards for different stakeholders\n5. Set up alerting for critical issues\n6. Implement log aggregation and analysis\n7. Create performance baselines and SLAs\n8. Set up automated reporting\n\nMake sure monitoring covers all critical aspects of the application.',
    difficulty: 'Medium',
    targetRoles: ['DevOps', 'Developer'],
    category: 'Monitoring',
    votes: 143,
    icon: 'Activity',
    tags: ['monitoring', 'performance', 'alerting']
  },
  {
    id: '15',
    title: 'SEO Optimization Analysis',
    description: 'Analyze and improve website SEO performance with actionable recommendations.',
    prompt: 'Help me optimize my website for search engines. Please:\n\n1. Analyze current website structure and content\n2. Check meta titles, descriptions, and header tags\n3. Analyze page loading speed and performance\n4. Review internal and external linking structure\n5. Check mobile responsiveness and Core Web Vitals\n6. Analyze competitor SEO strategies\n7. Generate keyword recommendations\n8. Create an SEO improvement action plan\n\nProvide specific, actionable recommendations with priority levels.',
    difficulty: 'Medium',
    targetRoles: ['Marketing', 'Developer'],
    category: 'SEO',
    votes: 176,
    icon: 'Search',
    tags: ['seo', 'optimization', 'marketing']
  }
];

export const categories = [
  'All Categories',
  'Code Exploration',
  'File Management', 
  'Development',
  'Data Analytics',
  'DevOps',
  'Documentation',
  'System Management',
  'Security',
  'Database',
  'Testing',
  'Automation',
  'Code Quality',
  'Monitoring',
  'SEO'
];

export const roles = [
  'All Roles',
  'Everyone',
  'Developer',
  'DevOps',
  'Team Lead',
  'Entrepreneur',
  'Technical Writer',
  'Security Engineer',
  'Database Admin',
  'QA Engineer',
  'System Admin',
  'Marketing'
];

export const difficulties = ['All Difficulties', 'Simple', 'Medium', 'Complex'];