import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { MultiSelect } from '@/components/MultiSelect';
import { categories, roles, sessionTypes, RoleOption } from '@/data/useCases';

interface FilterControlsProps {
  searchTerm: string;
  selectedCategories: string[];
  selectedRoles: string[];
  selectedSessionTypes: string[];
  sortBy: string;
  onSearchChange: (value: string) => void;
  onCategoriesChange: (value: string[]) => void;
  onRolesChange: (value: string[]) => void;
  onSessionTypesChange: (value: string[]) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

export function FilterControls({
  searchTerm,
  selectedCategories,
  selectedRoles,
  selectedSessionTypes,
  sortBy,
  onSearchChange,
  onCategoriesChange,
  onRolesChange,
  onSessionTypesChange,
  onSortChange,
  onClearFilters
}: FilterControlsProps) {
  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedRoles.length > 0 || 
    selectedSessionTypes.length > 0 ||
    searchTerm.length > 0;

  return (
    <div className="space-y-3 p-3 bg-card rounded-md border">
      <div className="flex items-center justify-end">
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Category</label>
          <MultiSelect
            options={categories}
            selected={selectedCategories}
            onChange={onCategoriesChange}
            placeholder="All Categories"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Target Role</label>
          <MultiSelect
            options={roles}
            selected={selectedRoles}
            onChange={onRolesChange}
            placeholder="All Roles"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Session Type</label>
          <MultiSelect
            options={sessionTypes}
            selected={selectedSessionTypes}
            onChange={onSessionTypesChange}
            placeholder="All Session Types"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Sort By</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="sessionType">Session Type</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
