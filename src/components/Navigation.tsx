
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import Button from './Button';
import { Menu, X, Heart } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Symptoms', path: '/symptoms' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={cn(
      "fixed w-full top-0 left-0 z-50 transition-all duration-300 px-6 md:px-12",
      isScrolled ? "py-2 glass" : "py-4 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="text-primary mr-2">
            <Heart className="h-6 w-6 stroke-[2.5px]" />
          </div>
          <h1 className="font-bold text-xl">HealthPal</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm">Log In</Button>
          </Link>
          <Link to="/login">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass p-6 shadow-md space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={cn(
                "block py-2 text-base font-medium transition-colors",
                location.pathname === link.path ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <Link to="/login">
              <Button variant="outline" fullWidth>Log In</Button>
            </Link>
            <Link to="/login">
              <Button fullWidth>Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
