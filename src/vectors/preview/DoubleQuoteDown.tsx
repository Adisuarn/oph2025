import React, { FC } from 'react'

const DoubleQuoteDown: FC<{
  className?: string
}> = ({ className }) => {
  return (
    <svg
      width="29"
      height="22"
      className={`${className}`}
      viewBox="0 0 29 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9992 0.334024C23.2239 0.334024 24.2622 0.600258 25.1142 1.13273C26.0194 1.61194 26.7648 2.2509 27.3505 3.0496C27.9362 3.90154 28.3356 4.8866 28.5486 6.00478C28.8148 7.12296 28.9479 8.21451 28.9479 9.27944C28.9479 11.8885 28.2557 14.3112 26.8713 16.5476C25.5401 18.7839 23.4635 20.5677 20.6415 21.8989L19.9226 20.4612C21.4668 19.769 22.7979 18.7573 23.9161 17.4262C25.0875 16.0417 25.7531 14.6041 25.9129 13.1132C26.1258 12.1548 26.1258 11.2496 25.9129 10.3976C24.8479 11.4625 23.4635 11.995 21.7596 11.995C20.109 11.995 18.7246 11.4892 17.6064 10.4775C16.4882 9.4658 15.9291 8.02815 15.9291 6.16452C15.9291 4.46063 16.4882 3.07622 17.6064 2.01129C18.7778 0.893113 20.2421 0.334024 21.9992 0.334024ZM6.5045 0.334024C7.72917 0.334024 8.76748 0.600258 9.61942 1.13273C10.5246 1.61194 11.2701 2.2509 11.8558 3.0496C12.4415 3.90154 12.8408 4.8866 13.0538 6.00478C13.3201 7.12296 13.4532 8.21451 13.4532 9.27944C13.4532 11.8885 12.761 14.3112 11.3766 16.5476C10.0454 18.7839 7.96878 20.5677 5.14672 21.8989L4.42789 20.4612C5.97204 19.769 7.3032 18.7573 8.42138 17.4262C9.5928 16.0417 10.2584 14.6041 10.4181 13.1132C10.6311 12.1548 10.6311 11.2496 10.4181 10.3976C9.35319 11.4625 7.96878 11.995 6.26489 11.995C4.61425 11.995 3.22984 11.4892 2.11167 10.4775C0.993488 9.4658 0.4344 8.02815 0.4344 6.16452C0.4344 4.46063 0.993488 3.07622 2.11167 2.01129C3.28309 0.893113 4.74737 0.334024 6.5045 0.334024Z"
        fill="white"
      />
    </svg>
  )
}

export default DoubleQuoteDown