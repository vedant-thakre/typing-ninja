import React from "react";

const Spinner = ({
  src, // Image source
  size = 24, // Size in pixels
  speed = 1, // Speed multiplier (1 = normal)
  className = "", // Additional classes
  alt = "Loading...",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`
        animate-spin
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${1.5 / speed}s`,
      }}
    />
  );
};

export default Spinner;
