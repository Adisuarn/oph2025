import React, { FC } from 'react'

const TT: FC<{
  className?: string
}> = ({ className }) => {
  return (
    <svg width="49" height="49" className={`${className}`} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33.8915 11.8825C32.4962 10.289 31.7271 8.24302 31.7273 6.125H25.4186V31.4417C25.3709 32.812 24.7928 34.1103 23.8063 35.0626C22.8197 36.0148 21.5018 36.5467 20.1307 36.5458C17.2315 36.5458 14.8223 34.1775 14.8223 31.2375C14.8223 27.7258 18.2115 25.0921 21.7027 26.1742V19.7225C14.659 18.7833 8.49316 24.255 8.49316 31.2375C8.49316 38.0363 14.1282 42.875 20.1102 42.875C26.5211 42.875 31.7273 37.6688 31.7273 31.2375V18.3954C34.2855 20.2326 37.3569 21.2183 40.5065 21.2129V14.9042C40.5065 14.9042 36.6682 15.0879 33.8915 11.8825Z"
        fill="url(#paint0_linear_301_388)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_301_388"
          x1="24.4998"
          y1="6.125"
          x2="24.4998"
          y2="42.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1A8B6D" />
          <stop offset="1" stopColor="#09342F" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default TT

/*

 style={{ maskType: 'alpha' }}

 <g style={{ mixBlendMode: 'soft-light' }}>

 className={`${className}`} 

 */
