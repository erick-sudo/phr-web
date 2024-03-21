import React from "react";

function HoverFade({ children, className, onClick }) {
  return (
    <div
      onClick={() => {
        if (typeof onClick === "function") onClick();
      }}
      className={`hover:bg-emerald-700/10 hover:text-emerald-900 duration-200 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export default HoverFade;
