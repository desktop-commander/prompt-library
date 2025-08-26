import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoleFilterProps {
  roles: string[];
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleFilter = ({ roles, selectedRole, onRoleChange }: RoleFilterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-0 px-4">
      {roles.map((role) => (
        <div key={role} className="relative">
          <Button
            onClick={() => onRoleChange(role)}
            variant={selectedRole === role ? "default" : "outline"}
            size="sm"
            className={`
              transition-all duration-200 text-sm font-medium
              min-h-[36px] px-3 py-2
              ${selectedRole === role 
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                : "hover:bg-accent hover:text-accent-foreground border-input"
              }
            `}
          >
            {role}
          </Button>
          {/* Show "New" badge for DevOps role */}
          {role === 'DevOps' && (
            <Badge className="absolute -top-2 -right-2 bg-primary hover:bg-primary text-primary-foreground text-xs px-1.5 py-0.5 h-5 min-w-[2rem] rounded-full border-2 border-background pointer-events-none">
              New
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};
