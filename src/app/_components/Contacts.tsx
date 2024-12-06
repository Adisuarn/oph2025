import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FB from '~/vectors/appIcon/FB'
import IG from '~/vectors/appIcon/IG'
import TT from '~/vectors/appIcon/TT'
import YT from '~/vectors/appIcon/YT'
import X from '~/vectors/appIcon/X'

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
      return <X className={'w-3 h-6 md:w-8 md:h-12 lg:w-6 lg:h-8 xl:w-8 xl:h-12 mx-2'} />
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
        <Link href={href} passHref target='blank' className='flex items-center space-x-2 lg:space-x-3 bg-[#ECF5C8] bg-opacity-90 rounded-full px-2 py-2 md:px-8 lg:px-4 lg:py-2 xl:px-5 hover:bg-opacity-70 transition-all relative z-40'>
          {getSVG(media)}
          <div className="w-24 md:w-28 lg:w-32 bg-gradient-to-r text-start from-[#1A8B6D] to-[#0C453D] bg-clip-text text-xs md:text-sm lg:text-sm xl:text-md font-bold text-transparent">{text}</div>
        </Link>
    )
  }

  return (
  <div className='flex flex-col lg:flex-row space-y-2 md:space-y-4 lg:space-y-0 lg:space-x-4 items-center justify-center -mt-6 mb-4 xl:mb-8'>
    <Contact
          media="FB"
          href="https://www.facebook.com/TriamUdomOPH/"
          text="TRIAM UDOM 
          OPEN HOUSE"
        />
        <Contact
          media="X"
          href="https://x.com/triamudomoph"
          text="triamudomoph"
        />
        <Contact
          media="TT"
          href="https://www.tiktok.com/@triamudom.oph"
          text="triamudom.oph"
        />
        <Contact
          media="IG"
          href="https://www.instagram.com/triamudom.oph/"
          text="triamudom.oph"
        />
        <Contact
          media="YT"
          href="https://www.youtube.com/c/TriamUdomOpenHouse"
          text="TRIAM UDOM 
          OPEN HOUSE"
        />
  </div>
  )
}

export default Contacts
