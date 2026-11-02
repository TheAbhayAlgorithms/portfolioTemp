import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLiveBuild } from './editor/LiveBuildEngine.tsx';

interface ThemeToggleProps {
  className?: string;
  variant?: 'navbar' | 'toolbar' | 'mobile';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'navbar' }) => {
  const { theme, toggleTheme } = useLiveBuild();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  if (variant === 'toolbar') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        title={`Toggle ${theme === 'dark' ? 'Day' : 'Night'} Mode (D)`}
        aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer ${
          theme === 'dark'
            ? 'text-zinc-400 hover:text-white hover:bg-white/10'
            : 'text-zinc-600 hover:text-zinc-900 hover:bg-black/5'
        } ${className}`}
      >
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5 text-[#FF8A00] transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#2F6BFF] transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full py-3.5 px-4 rounded flex items-center justify-between border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            : 'bg-black/5 border-black/10 text-zinc-900 hover:bg-black/10'
        } ${className}`}
      >
        <span className="flex items-center gap-2">
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-[#FF8A00]" />
          ) : (
            <Moon className="w-4 h-4 text-[#2F6BFF]" />
          )}
          <span>{theme === 'dark' ? 'SWITCH TO DAY MODE' : 'SWITCH TO NIGHT MODE'}</span>
        </span>
        <span className="text-[10px] text-zinc-500 font-bold">[D]</span>
      </button>
    );
  }

  // Default: Navbar Segmented Pill
  return (
    <button
      type="button"
      onClick={handleToggle}
      title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode (Keyboard shortcut: D)`}
      aria-label={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer shadow-xs active:scale-95 select-none ${
        theme === 'dark'
          ? 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300 hover:text-white'
          : 'bg-black/5 hover:bg-black/10 border-black/15 text-zinc-800 hover:text-black'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5 text-[#FF8A00] transition-transform duration-500 group-hover:rotate-90" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#2F6BFF] transition-transform duration-500 group-hover:-rotate-45" />
        )}
      </div>

      <span className="font-mono text-[10px] uppercase tracking-wider font-bold">
        {theme === 'dark' ? 'DAY' : 'NIGHT'}
      </span>

      <span className="font-mono text-[9px] text-zinc-500 group-hover:text-zinc-400 hidden sm:inline">
        [D]
      </span>
    </button>
  );
};
