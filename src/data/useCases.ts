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
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
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

export const difficulties = ['Easy', 'Intermediate', 'Advanced'];
