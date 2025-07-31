import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 16, className }) => {
  const iconMap: Record<string, string> = {
  'settings': '⚙',
  'chart': '◢',
  'timer': '⏱',
  'tasks': '☐',
  'play': '▶',
  'pause': '⏸',
  'skip': '⏭',
  'reset': '↻',
  'close': '×',
  'plus': '+',
  'check': '✓',
  'edit': '✎',
  'delete': '🗑',
  'trending': '📈',
  'clock': '⏰',
  'target': '🎯'
};

  const icon = iconMap[name] || '•';
  
  return (
    <span 
      className={className}
      style={{ 
        fontSize: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </span>
  );
};

export default Icon; 