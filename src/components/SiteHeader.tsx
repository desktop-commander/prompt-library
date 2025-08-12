import { Link } from "react-router-dom";
// Using the uploaded logo directly to avoid asset import issues
const logoSrc = "/lovable-uploads/34ab283d-cdc2-40f8-9036-23471f2503c9.png";
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
            alt="DesktopCommander logo"
            className="h-8 w-8 rounded-sm"
            loading="lazy"
          />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            DesktopCommander
          </span>
        </Link>

        {/* Navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Use Cases</NavigationMenuTrigger>
                <NavigationMenuContent className="p-3">
                  <ul className="grid gap-2 p-2 md:w-[240px]">
                    <li>
                      <Link to="/use-cases" className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                        Browse Library
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <a href="https://desktopcommander.app" target="_blank" rel="noopener noreferrer">
              Free Consultation
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
