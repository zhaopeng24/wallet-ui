import * as React from "react"

function EthSVG(props: React.SVGAttributes<unknown>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      viewBox="0 0 45 45"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_b_225_6069)" fill="#fff">
        <rect width={45} height={45} rx={6} fillOpacity={0.1} />
        <path d="M22.804 11.446l-.149.471v13.659l.149.138 6.803-3.748-6.803-10.52z" />
        <path d="M22.803 11.446L16 21.966l6.803 3.748V11.446zM22.803 27.777l-.083.095v4.865l.084.228 6.807-8.934-6.808 3.746z" />
        <path d="M22.805 32.965v-5.188L16 24.03l6.803 8.934zM22.804 25.714l6.803-3.748-6.803-2.882v6.63z" />
        <path d="M16.001 21.966l6.803 3.748v-6.63l-6.803 2.882z" />
      </g>
      <defs>
        <filter
          id="filter0_b_225_6069"
          x={-13}
          y={-13}
          width={71}
          height={71}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={6.5} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_225_6069"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_225_6069"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default EthSVG