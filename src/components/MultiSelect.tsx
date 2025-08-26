import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectOption {
  value: string;
  label?: string;
  tag?: string;
  tagColor?: string;
}

interface MultiSelectProps {
  options: string[] | MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== value));
  };

  const displayValue = selected.length === 0 
    ? placeholder 
    : selected.length === 1 
    ? selected[0]
    : `${selected.length} selected`;

  // Clear selection with keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && selected.length > 0) {
      e.preventDefault();
      onChange([]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="w-full justify-between h-9 font-normal"
        >
          <span className="truncate">{displayValue}</span>
          <ChevronDown className={cn(
            "ml-2 h-4 w-4 shrink-0 transition-transform",
            isOpen && "rotate-180"
          )} />
        </Button>
        
        {/* Show "New" badge on main button when DevOps is selected */}
        {selected.includes('DevOps') && (
          <Badge className="absolute -top-2 -right-2 bg-primary hover:bg-primary text-primary-foreground text-xs px-1.5 py-0.5 h-5 min-w-[2rem] rounded-full border-2 border-background pointer-events-none">
            New
          </Badge>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[200px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
          <div className="py-1">
            {/* Add "All" option first */}
            <button
              onClick={() => onChange([])}
              className={cn(
                "flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground mx-1 w-[calc(100%-8px)]",
                selected.length === 0 && "bg-accent/50"
              )}
            >
              <span className="flex-1 text-left">{placeholder}</span>
              {selected.length === 0 && (
                <span className="ml-2 text-xs">✓</span>
              )}
            </button>
            
            <div className="my-1 h-px bg-border mx-2" />
            
            {/* Then list all other options */}
            <div className="max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar">
              {options.map((option) => {
                const optionObj = typeof option === 'string' ? { value: option } : option;
                const isSelected = selected.includes(optionObj.value);
                
                return (
                  <div key={optionObj.value} className="relative mx-1 w-[calc(100%-8px)]">
                    <button
                      onClick={() => toggleOption(optionObj.value)}
                      className={cn(
                        "flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent/50"
                      )}
                    >
                      <span className="flex-1 text-left truncate">
                        {optionObj.label || optionObj.value}
                      </span>
                      {isSelected && (
                        <span className="ml-2 text-xs shrink-0">✓</span>
                      )}
                    </button>
                    {optionObj.tag && optionObj.tagColor === 'new' && (
                      <Badge 
                        className="absolute -top-2 -right-2 bg-primary hover:bg-primary text-primary-foreground text-xs px-1.5 py-0.5 h-5 min-w-[2rem] rounded-full border-2 border-background pointer-events-none"
                      >
                        {optionObj.tag}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selected.map(value => {
            const optionObj = options.find(opt => 
              typeof opt === 'string' ? opt === value : opt.value === value
            );
            const displayName = typeof optionObj === 'string' ? optionObj : optionObj?.label || optionObj?.value || value;
            
            return (
              <Badge
                key={value}
                variant="secondary"
                className="text-xs"
              >
                {displayName}
                <button
                  onClick={(e) => removeOption(value, e)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
