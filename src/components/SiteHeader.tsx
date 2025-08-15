import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
// Using the Desktop Commander logo
const logoSrc = "/logo.png";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Desktop Commander logo"
            className="h-8 w-8 rounded-sm"
            loading="lazy"
          />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Desktop Commander
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Prompts</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <ul className="grid gap-2 p-2 md:w-[240px]">
                    <li>
                      <Link to="/prompts" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Browse Library
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/#testimonials" className="rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                    Testimonials
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="https://desktopcommander.app/resources" target="_blank" rel="noopener noreferrer" className="rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                    Resources
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <a href="https://desktopcommander.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Get Desktop Commander
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
