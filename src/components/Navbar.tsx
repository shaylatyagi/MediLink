
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  PackageCheck, 
  Calendar, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Search', path: '/search', icon: Search },
  { name: 'Track Orders', path: '/track-orders', icon: PackageCheck },
  { name: 'Schedule', path: '/schedule-order', icon: Calendar },
];

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    // In a real app, this would handle logout functionality
    window.location.href = '/';
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <>
      {/* Desktop Navbar */}
      <nav className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-10 transition-transform duration-300 ease-in-out py-8 px-4 flex flex-col",
        isMobile && "-translate-x-full"
      )}>
        <div className="mb-12 px-4">
          <Logo animated={false} />
        </div>
        
        <div className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-medilink-lightBlue text-medilink-blue font-medium" 
                        : "text-medilink-darkGray hover:bg-gray-50"
                    )}
                  >
                    <Icon 
                      size={20} 
                      className={cn(
                        isActive ? "text-medilink-blue" : "text-medilink-darkGray"
                      )} 
                    />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-left text-medilink-darkGray hover:bg-gray-50 rounded-lg transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button onClick={toggleMobileMenu} className="text-medilink-darkGray">
              <Menu size={24} />
            </button>
            <Logo animated={false} size="sm" />
          </div>
        </div>
      )}
      
      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={toggleMobileMenu}>
          <div 
            className="h-full w-64 bg-white shadow-lg py-8 px-4 flex flex-col animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-12 px-4">
              <Logo animated={false} />
              <button onClick={toggleMobileMenu} className="text-medilink-darkGray">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200",
                          isActive 
                            ? "bg-medilink-lightBlue text-medilink-blue font-medium" 
                            : "text-medilink-darkGray hover:bg-gray-50"
                        )}
                        onClick={toggleMobileMenu}
                      >
                        <Icon 
                          size={20} 
                          className={cn(
                            isActive ? "text-medilink-blue" : "text-medilink-darkGray"
                          )} 
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 px-4 py-3 w-full text-left text-medilink-darkGray hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
