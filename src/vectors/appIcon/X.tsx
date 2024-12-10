import React, { FC } from 'react'

const X: FC<{
  className?: string
}> = ({ className }) => {
  return (
    <svg
      width="23"
      height="23"
      className={`${className}`}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0133 11.4328L25.8485 0H23.5176L14.978 9.92672L8.15716 0H0.290039L10.6045 15.0112L0.290039 27H2.6209L11.6393 16.517L18.8424 27H26.7095L16.0127 11.4328H16.0133ZM12.821 15.1432L11.7758 13.6485L3.46064 1.75458H7.04067L13.7508 11.3535L14.7958 12.8482L23.5187 25.3252H19.9391L12.821 15.1438V15.1432Z"
        fill="url(#paint0_linear_301_385)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_301_385"
          x1="13.4998"
          y1="0"
          x2="13.4998"
          y2="27"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1A8B6D" />
          <stop offset="1" stopColor="#09342F" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default X

/*

 style={{ maskType: 'alpha' }}

 <g style={{ mixBlendMode: 'soft-light' }}>

 className={`${className}`} 

 */
