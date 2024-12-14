import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FB from '~/vectors/appIcon/FB'
import IG from '~/vectors/appIcon/IG'
import TT from '~/vectors/appIcon/TT'
import X from '~/vectors/appIcon/X'
import YT from '~/vectors/appIcon/YT'

const getSVG = (media: string) => {
  const tailwind = 'w-6 h-6 md:w-12 md:h-12 lg:w-8 lg:h-8 xl:w-12 xl:h-12'
  switch (media) {
    case 'FB':
      return <FB className={tailwind} />
    case 'IG':
      return <IG className={tailwind} />
    case 'TT':
      return <TT className={tailwind} />
    case 'YT':
      return <YT className={tailwind} />
    case 'X':
      return <X className={'mx-2 h-6 w-3 md:h-12 md:w-8 lg:h-8 lg:w-6 xl:h-12 xl:w-8'} />
    default:
      return <></>
  }
}
const Contacts = () => {
  interface ContactProps {
    media: string
    href: string
    text: string
  }

  const Contact: React.FC<ContactProps> = ({ media, href, text }) => {
    return (
      <Link
        href={href}
        passHref
        target="blank"
        className="relative z-40 flex items-center space-x-2 rounded-full bg-[#ECF5C8] bg-opacity-90 px-2 py-2 transition-all hover:bg-opacity-70 md:px-8 lg:space-x-3 lg:px-4 lg:py-2 xl:px-5"
      >
        {getSVG(media)}
        <div className="xl:text-md w-24 bg-gradient-to-r from-[#1A8B6D] to-[#0C453D] bg-clip-text text-start text-xs font-bold text-transparent md:w-28 md:text-sm lg:w-32 lg:text-sm">
          {text}
        </div>
      </Link>
    )
  }

  return (
    <div className="-mt-6 mb-4 flex flex-col items-center justify-center space-y-2 md:space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 xl:mb-8">
      <Contact
        media="YT"
        href="https://www.youtube.com/c/TriamUdomOpenHouse"
        text="TRIAM UDOM 
            OPEN HOUSE"
      />
      <Contact media="IG" href="https://www.instagram.com/triamudom.oph/" text="triamudom.oph" />
      <Contact
        media="FB"
        href="https://www.facebook.com/TriamUdomOPH/"
        text="TRIAM UDOM 
          OPEN HOUSE"
      />
      <Contact media="TT" href="https://www.tiktok.com/@triamudom.oph" text="triamudom.oph" />
      <Contact media="X" href="https://x.com/triamudomoph" text="triamudomoph" />
    </div>
  )
}

export default Contacts
