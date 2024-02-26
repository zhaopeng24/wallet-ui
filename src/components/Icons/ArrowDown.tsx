import * as React from "react"

function ArrowDownSVG(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.285 7.338a1.125 1.125 0 011.124 1.124v9.015a1.125 1.125 0 01-1.124 1.125H8.269a1.127 1.127 0 01-1.086-1.125 1.126 1.126 0 011.086-1.124h6.3L6.678 8.462A1.125 1.125 0 018.269 6.87l7.891 7.891v-6.3a1.125 1.125 0 011.125-1.124z"
        fill="#6FFF62"
      />
    </svg>
  )
}

export default ArrowDownSVG