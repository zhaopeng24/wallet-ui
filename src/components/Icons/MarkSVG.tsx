import * as React from "react"

function MarkSVG(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.562 12.53L4.091 9.059l1.157-1.156 2.314 2.313 4.628-4.628 1.158 1.158-5.786 5.786z"
        fill="#6FFF62"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9.001a9 9 0 1118 0 9 9 0 01-18 0zm9 7.364a7.365 7.365 0 110-14.73 7.365 7.365 0 010 14.73z"
        fill="#6FFF62"
      />
    </svg>
  )
}

export default MarkSVG
