import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap, ChevronDown, User, Settings, LogOut, Plus, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Hire Us" },
  { href: "/how-to-use", label: "Guide" },
];

const NavLinkItem = ({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => (
  <Link
    to={href}
    className={cn(
      "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group",
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}
  >
    <span className="relative z-10">{label}</span>
    {/* Animated underline indicator */}
    <span
      className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-200",
        isActive ? "w-6" : "w-0 group-hover:w-4"
      )}
    />
    {/* Hover background effect */}
    <span className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
  </Link>
);

const MobileNavLink = ({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick: () => void }) => (
  <Link
    to={href}
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    )}
  >
    {label}
    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
  </Link>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism navbar */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-b border-border/40" />
      
      <div className="relative container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Blitzs Home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="relative bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                <Zap className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              Blitzs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActive(link.href)}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 focus:outline-none hover:bg-muted/50 rounded-lg p-1 pr-3 transition-all duration-200"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all duration-200 group-hover:ring-primary/50">
                      <AvatarImage src={user.avatar} alt={user.full_name || user.email} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {user.full_name
                          ? user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                          : user.email?.split("@")[0].slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm hidden lg:inline text-foreground font-medium truncate max-w-[120px]">
                      {user.full_name || user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className={cn(
                      "h-3 w-3 text-muted-foreground hidden lg:block transition-transform duration-200",
                      isUserMenuOpen && "rotate-180"
                    )} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
                  <DropdownMenuLabel className="truncate">
                    {user.full_name || user.email}
                  </DropdownMenuLabel>
                  <div className="px-3 py-1.5 text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings#avatar" className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[10px]">AV</AvatarFallback>
                      </Avatar>
                      Change Avatar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/add-project" className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-muted-foreground" />
                      Add Project
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin-dashboard" className="flex items-center gap-2 font-medium">
                          <LayoutDashboard className="h-4 w-4 text-amber-500" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={handleSignOut}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild className="hover:bg-muted/50">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="shadow-sm">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-muted/50"
                  aria-label="Toggle menu"
                >
                  <Menu className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isOpen && "scale-0 opacity-0"
                  )} />
                  <X className={cn(
                    "absolute h-5 w-5 transition-all duration-200",
                    !isOpen && "scale-0 opacity-0"
                  )} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="pb-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-md">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <span>Blitzs</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="py-4 space-y-1">
                  {navLinks.map((link) => (
                    <MobileNavLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      isActive={isActive(link.href)}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                </div>

                {user ? (
                  <div className="pt-4 space-y-3 border-t">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.full_name || user.email} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {user.full_name
                            ? user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                            : user.email?.split("@")[0].slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {user.full_name || user.email?.split("@")[0]}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-1 px-2">
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/settings" onClick={() => setIsOpen(false)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </Button>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/add-project" onClick={() => setIsOpen(false)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Link>
                      </Button>
                      {isAdmin && (
                        <Button variant="ghost" asChild className="justify-start">
                          <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
                            <LayoutDashboard className="h-4 w-4 mr-2 text-amber-500" />
                            Admin Dashboard
                          </Link>
                        </Button>
                      )}
                      <DropdownMenuSeparator className="my-2" />
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsOpen(false);
                          signOut();
                        }}
                        className="justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 space-y-2 border-t">
                    <Button
                      variant="outline"
                      asChild
                      className="w-full"
                    >
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="w-full shadow-sm">
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
