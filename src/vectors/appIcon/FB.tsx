import React, { FC } from 'react'

const FB: FC<{
  className?: string
}> = ({ className }) => {
  return ( 
 <svg width="49" height="49" className={`${className}`}  viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M44.9166 24.4997C44.9166 13.2297 35.7699 4.08301 24.4999 4.08301C13.2299 4.08301 4.08325 13.2297 4.08325 24.4997C4.08325 34.3813 11.1066 42.6093 20.4166 44.508V30.6247H16.3333V24.4997H20.4166V19.3955C20.4166 15.4551 23.622 12.2497 27.5624 12.2497H32.6666V18.3747H28.5833C27.4603 18.3747 26.5416 19.2934 26.5416 20.4163V24.4997H32.6666V30.6247H26.5416V44.8143C36.852 43.7934 44.9166 35.0959 44.9166 24.4997Z"
        fill="url(#paint0_linear_301_372)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_301_372"
          x1="24.4999"
          y1="4.08301"
          x2="24.4999"
          y2="44.8143"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A8B6D" />
          <stop offset="1" stop-color="#09342F" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default FB
