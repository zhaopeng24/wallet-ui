import * as React from "react";

function TriangleSvg(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={8}
      height={7}
      viewBox={`0 0 ${8} ${7}`}
      fill="rgba(255, 255, 255, 0.5)" // 0.5 opacity white
      {...props}
    >
      <path d="M0 0 L7 0 L3.5 7 Z" />
    </svg>
  );
}

export default TriangleSvg;
