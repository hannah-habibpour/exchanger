import { useState } from 'react';

export default function Button({ children, style, onClick, hoverStyle }) {
  const [isHovered, setIsHovered] = useState(false);

  const setStyle = () => {
    return isHovered ? hoverStyle : style;
  };

  return (
    <button
      style={setStyle()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
