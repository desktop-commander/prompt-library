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
  author: string;
  dateAdded: string;
  verified?: boolean;
}

export const useCases: UseCase[] = [
  {
    id: '1',
    title: 'Explore and Understand New Repository',
    description: 'Read a repository and understand the codebase.',
    prompt: 'I need to understand this codebase: [repo path]. Give me an overview of the project structure, main components, and how they interact. Identify the entry points and key files I should focus on first.',
    difficulty: 'Simple',
    targetRoles: ['Developers', 'Vibe coders'],
    category: 'Code base exploration',
    votes: 156,
    icon: 'FolderSearch',
    tags: ['repository', 'code-analysis', 'codebase'],
    author: 'Internal',
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    title: 'Build Complete Feature from Scratch',
    description: 'Build a new feature for your app based on your existing codebase.',
    prompt: 'I need to build [feature description] in my project at [project path]. Create all necessary files, implement the feature, and integrate it with existing code. Show me what you\'re building as you go.',
    difficulty: 'Medium',
    targetRoles: ['Developers', 'Vibe coders'],
    category: 'Development',
    votes: 203,
    icon: 'Code',
    tags: ['feature', 'development', 'implementation'],
    author: 'Internal',
    dateAdded: '2024-01-12'
  },
  {
    id: '3',
    title: 'Analyze My Data File',
    description: 'Make sense of a data file that you have.',
    prompt: 'Look for the file called \'filename\' in my [folder]. Analyze this file and tell me: what data it contains, key patterns or insights, and create a simple summary report.',
    difficulty: 'Simple',
    targetRoles: ['Data analysts', 'Professionals'],
    category: 'Data Analytics',
    votes: 187,
    icon: 'BarChart3',
    tags: ['data-analysis', 'insights', 'reporting'],
    author: 'Internal',
    dateAdded: '2024-01-10'
  },
  {
    id: '4',
    title: 'Set Up Development Environment',
    description: 'Set up your development environment, install dependencies and configure required tools.',
    prompt: 'Set up a complete development environment for [technology stack] on my machine. Install dependencies, configure tools, and create a sample project to verify everything works.',
    difficulty: 'Medium',
    targetRoles: ['Developers', 'Vibe coders'],
    category: 'DevOps',
    votes: 234,
    icon: 'Settings',
    tags: ['setup', 'environment', 'configuration'],
    author: 'Internal',
    dateAdded: '2024-01-08'
  },
  {
    id: '5',
    title: 'Organise my Downloads folder',
    description: 'Organise messy downloads folder into relevant subfolders.',
    prompt: 'Analyze my Downloads folder and organize all files into subfolders by type (Documents, Images, Videos, Archives, etc.). Show me what you\'re doing and create a summary of what was organized. Open the new folder when you are done.',
    difficulty: 'Simple',
    targetRoles: ['Professionals'],
    category: 'File Management',
    votes: 145,
    icon: 'FolderOrganize',
    tags: ['organization', 'files', 'cleanup'],
    author: 'Internal',
    dateAdded: '2024-01-07'
  },
  {
    id: '6',
    title: 'Clean Up Unused Code',
    description: 'Scan your codebase to find unused imports, dead functions, and redundant code that can be safely removed.',
    prompt: 'Analyze this project directory: [project root path]. Identify unused imports and dead code in this codebase.',
    difficulty: 'Simple',
    targetRoles: ['Developers', 'Vibe coders'],
    category: 'Code optimization',
    votes: 98,
    icon: 'Trash2',
    tags: ['cleanup', 'optimization', 'maintenance'],
    author: 'Internal',
    dateAdded: '2024-01-06'
  },
  {
    id: '7',
    title: 'Build Personal Finance Tracker',
    description: 'Create a complete web application from scratch and launch it locally in your browser.',
    prompt: 'Build me a personal finance tracker web app that lets me [add expenses, categorize spending, see monthly summaries]. Create all the necessary HTML, CSS, and JavaScript files. Set up a local server and open the app in my browser when it\'s ready. Make it look professional and fully functional. Open it in browser when ready.',
    difficulty: 'Medium',
    targetRoles: ['Developers', 'Vibe coders'],
    category: 'Development',
    votes: 167,
    icon: 'DollarSign',
    tags: ['web-app', 'finance', 'personal-project'],
    author: 'Internal',
    dateAdded: '2024-01-05'
  },
  {
    id: '8',
    title: 'Understand React Component Architecture',
    description: 'Get a clear breakdown of how your React component works, including props flow, state management, and dependencies.',
    prompt: 'Find this React component: [component name/path]. Analyze this React component and explain its data flow and dependencies',
    difficulty: 'Simple',
    targetRoles: ['Developers', 'Vibe coders'],
    category: 'Code base exploration',
    votes: 89,
    icon: 'Component',
    tags: ['react', 'components', 'architecture'],
    author: 'Internal',
    dateAdded: '2024-01-04'
  },
  {
    id: '9',
    title: 'Build Data Processing Pipeline',
    description: 'Creates automated systems that continuously collect and process data (like tracking competitor prices daily).',
    prompt: 'Create an automated system to [collect/process] data from [source]. Set up the pipeline to run regularly and save results to organized files on my computer.',
    difficulty: 'Medium',
    targetRoles: ['Data analysts', 'Professionals'],
    category: 'Data Analytics',
    votes: 124,
    icon: 'Pipeline',
    tags: ['automation', 'data-processing', 'pipeline'],
    author: 'Internal',
    dateAdded: '2024-01-03'
  },
  {
    id: '10',
    title: 'Create Knowledge Base Folder',
    description: 'Create a structure for your local knowledge base.',
    prompt: 'I want to create a personal knowledge base by organizing copies of my existing files on this computer. Please help me:\n\n-Check my current file structure using Desktop Commander to understand what types of files and content I have\n\n-Ask targeted follow-up questions about my goals and preferences before proposing an organizational system\n\n-Create a well-structured knowledge base folder on my Desktop with appropriate subfolders\n\n-Copy (never move or delete) relevant files into this new organizational structure.',
    difficulty: 'Medium',
    targetRoles: ['Professionals'],
    category: 'File Management',
    votes: 112,
    icon: 'Database',
    tags: ['knowledge-base', 'organization', 'files'],
    author: 'Internal',
    dateAdded: '2024-01-02'
  },
  {
    id: '11',
    title: 'Create Automated Email Newsletter',
    description: 'Create an automated content for email newsletters.',
    prompt: 'Create an automated system that compiles content from [these sources] and generates a weekly newsletter. Set it up to create HTML email templates and organize them in folders on my computer.',
    difficulty: 'Medium',
    targetRoles: ['Content makers', 'Professionals'],
    category: 'Content',
    votes: 198,
    icon: 'Mail',
    tags: ['automation', 'newsletter', 'content'],
    author: 'Internal',
    dateAdded: '2024-01-01',
    verified: true,
  }
];

export const categories = [
  'All Categories',
  'Code base exploration',
  'Development',
  'Data Analytics',
  'DevOps',
  'File Management',
  'Code optimization',
  'Content'
];

export const roles = [
  'All Roles',
  'Developers',
  'Vibe coders',
  'Content makers',
  'Data analysts',
  'Professionals'
];

export const difficulties = ['All Difficulties', 'Simple', 'Medium', 'Complex'];