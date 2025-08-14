import useCasesData from './useCases.json';

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
  author: string;
  dateAdded: string;
  verified?: boolean;
}

// Import prompts from JSON file
export const useCases: UseCase[] = useCasesData.useCases;

// Extract unique categories from prompts
export const categories = Array.from(new Set(useCases.map(uc => uc.category))).sort();

// Extract unique roles from prompts
export const roles = Array.from(new Set(useCases.flatMap(uc => uc.targetRoles))).sort();

export const difficulties = ['Simple', 'Medium', 'Complex'];
