
import React from 'react';
import { Link } from 'react-router-dom';

function Logo({ size = 'md', className, withLink = true }) {
  let height;
  if (size === 'sm') height = 'h-8';
  else if (size === 'md') height = 'h-12';
  else height = 'h-16';
  
  const logo = (
    <div className={`flex items-center hover:scale-105 transition-all ${className || ''}`}>
      <img 
        src="/lovable-uploads/104b6c42-e9b4-4117-9eaf-bb7095671a45.png" 
        alt="Medilink Logo" 
        className={height}
      />
    </div>
  );
  
  if (withLink) {
    return <Link to="/">{logo}</Link>;
  }
  
  return logo;
}

export default Logo;
