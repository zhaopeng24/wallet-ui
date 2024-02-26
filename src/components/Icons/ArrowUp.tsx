import * as React from "react"

function ArrowUpSVG(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M17.285 16.662a1.125 1.125 0 001.124-1.124V6.523a1.125 1.125 0 00-1.124-1.125H8.269a1.127 1.127 0 00-.77 1.906c.203.21.479.332.77.343h6.3l-7.891 7.891a1.125 1.125 0 001.591 1.591l7.891-7.891v6.3a1.125 1.125 0 001.125 1.124z"
        fill="#FF8266"
      />
    </svg>
  )
}

export default ArrowUpSVG