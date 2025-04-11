
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for medicines...", 
  className 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex items-center w-full relative",
        className
      )}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 px-5 pr-12 rounded-lg border border-gray-200 focus:border-medilink-blue focus:ring-1 focus:ring-medilink-blue bg-white/90 backdrop-blur-sm transition-all duration-200 outline-none"
      />
      <button
        type="submit"
        className="absolute right-3 text-medilink-darkGray hover:text-medilink-blue transition-colors duration-200"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
