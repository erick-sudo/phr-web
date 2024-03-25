import React from "react";

function LinesMesh({ className }) {
  return (
    <div className={`${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <defs>
          <pattern
            id="radar-lines"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="200"
              y2="200"
              stroke="rgb(4, 120, 87)"
              stroke-width="0.5"
            />

            <line
              x1="-200"
              y1="0"
              x2="200"
              y2="200"
              stroke="rgb(4, 120, 87)"
              stroke-width="0.5"
            />

            <line
              x1="0"
              y1="-200"
              x2="200"
              y2="200"
              stroke="rgb(4, 120, 87)"
              stroke-width="0.5"
            />

            <line
              x1="0"
              y1="0"
              x2="-200"
              y2="200"
              stroke="rgb(4, 120, 87)"
              stroke-width="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#radar-lines)" />
      </svg>
    </div>
  );
}

export default LinesMesh;
