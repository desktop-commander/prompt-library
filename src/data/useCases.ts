import useCasesData from './useCases.json';

export interface RoleOption {
  value: string;
  label?: string;
  tag?: string;
  tagColor?: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  prompt: string;
  sessionType: 'Instant output' | 'Step-by-step flow';
  targetRoles: string[];
  categories: string[];  // Updated to support multiple categories
  taskCategory?: string;  // New field for DevOps task categorization
  votes: number;
  gaClicks: number;  // Primary click tracking metric for popularity sorting
  icon: string;
  author: string;
  dateAdded: string;
  verified?: boolean;
}

// Import prompts from JSON file
export const useCases: UseCase[] = useCasesData.useCases;

// Extract unique categories from prompts and add custom categories
const dataCategories = Array.from(new Set(useCases.flatMap(uc => uc.categories)));
const customCategories = ['Optimize workflow']; // Add custom categories that may not have prompts yet
export const categories = Array.from(new Set([...dataCategories, ...customCategories])).sort();

// Define available task categories for DevOps filtering
export const taskCategories = [
  'All Categories',
  'Environment Setup',
  'Database Management', 
  'Server Configuration',
  'Deploy Applications',
  'Monitor Systems'
];

// Extract unique roles from prompts and create role options with special tags
const uniqueRoles = Array.from(new Set(useCases.flatMap(uc => uc.targetRoles))).sort();
export const roles: RoleOption[] = uniqueRoles.map(role => {
  if (role === 'DevOps') {
    return {
      value: role,
      tag: 'New',
      tagColor: 'new'
    };
  }
  return { value: role };
});

export const sessionTypes = ['Instant output', 'Step-by-step flow'];

// Session type explanations for tooltips
export const sessionTypeExplanations = {
  'Instant output': 'Get immediate, ready-to-use results in a single prompt',
  'Step-by-step flow': 'This prompt runs in multiple steps and leads you through an iterative workflow'
};
