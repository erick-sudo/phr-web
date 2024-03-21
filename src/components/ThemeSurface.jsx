import React from "react";

function ThemeSurface({ children, className, onClick }) {
  return (
    <div
      onClick={() => {
        if (typeof onClick === "function") onClick();
      }}
      className={`bg-emerald-500/50 text-emerald-800 hover:bg-emerald-800 hover:text-white duration-300 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export default ThemeSurface;
