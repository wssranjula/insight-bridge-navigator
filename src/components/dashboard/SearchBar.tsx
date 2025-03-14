
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ 
  className, 
  placeholder = "Search for stocks, news, or analysis...",
  onSearch 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      className={cn(
        "relative w-full rounded-xl transition-all duration-300",
        isFocused ? "shadow-lg" : "shadow-sm",
        className
      )}
      onSubmit={handleSearch}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        className={cn(
          "block w-full pl-10 pr-4 py-3 bg-white dark:bg-card rounded-xl",
          "border border-input focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/60",
          "placeholder:text-muted-foreground text-foreground",
          "transition-all duration-300 ease-in-out"
        )}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </form>
  );
};

export default SearchBar;
