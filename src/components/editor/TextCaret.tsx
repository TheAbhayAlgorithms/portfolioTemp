import React from 'react';

export interface TextCaretProps {
  children: React.ReactNode;
  user?: string;
  color?: string; // default #00E5FF
  className?: string;
}

export const TextCaret: React.FC<TextCaretProps> = ({
  children,
  user = 'Aria',
  color = '#00E5FF',
  className = '',
}) => {
  return (
    <span
      className={`relative inline-block border border-dashed rounded-[2px] px-1 py-0.5 transition-colors ${className}`}
      style={{
        borderColor: color,
        backgroundColor: `${color}1A`, // 10% opacity background
      }}
    >
      {/* Editor Name Tag hovering above */}
      {user && (
        <span
          className="absolute -top-4 left-0 px-1 py-0.2 rounded font-mono text-[9px] font-bold uppercase leading-none shadow-sm select-none pointer-events-none flex items-center gap-1"
          style={{ backgroundColor: color, color: '#0A0A0B' }}
        >
          <span>{user}</span>
        </span>
      )}

      {/* Selected Text */}
      <span>{children}</span>

      {/* Blinking Vertical Text Cursor Bar */}
      <span
        className="inline-block w-[2px] h-[1em] ml-0.5 align-middle animate-[pulse_1s_ease-in-out_infinite]"
        style={{ backgroundColor: color }}
      />
    </span>
  );
};
