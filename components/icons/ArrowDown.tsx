import * as React from "react"

function ArrowDownSVG(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      {...props}
    >
      <path
        d="M11.285 1.338a1.125 1.125 0 011.124 1.124v9.015a1.125 1.125 0 01-1.124 1.125H2.269a1.127 1.127 0 01-1.086-1.125 1.126 1.126 0 011.086-1.124h6.3L.678 2.462A1.125 1.125 0 012.268.87l7.892 7.891v-6.3a1.125 1.125 0 011.125-1.124z"
        fill="#6FFF62"
      />
    </svg>
  )
}

export default ArrowDownSVG
