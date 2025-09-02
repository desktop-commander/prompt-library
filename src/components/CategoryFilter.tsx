import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-0 px-4 max-w-4xl mx-auto">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className={`
            transition-all duration-200 text-xs font-medium whitespace-nowrap
            min-h-[32px] px-2.5 py-1.5
            ${selectedCategory === category 
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
              : "hover:bg-accent hover:text-accent-foreground border-input"
            }
          `}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
