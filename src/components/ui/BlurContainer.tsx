
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  blur?: 'sm' | 'md' | 'lg';
}

const BlurContainer = ({ 
  children, 
  className,
  padding = 'md',
  blur = 'md'
}: BlurContainerProps) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };
  
  return (
    <div 
      className={cn(
        'bg-white/80 border border-white/20 rounded-xl shadow-lg',
        blurClasses[blur],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
