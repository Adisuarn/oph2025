import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Contacts = () => {
  interface ContactProps {
    src: string
    alt: string
    href: string
    text: string
  }

  const Contact: React.FC<ContactProps> = ({ src, alt, href, text }) => {
    return (
        <Link href={href} passHref target='blank'>
          <div className="flex items-center gap-6 rounded-full border border-white bg-white bg-opacity-70 px-4 py-2 transition-opacity delay-200 hover:bg-opacity-90">
            <Image width={48} height={48} src={src} alt={alt} />
            <p className="text-md w-36 font-bold text-[#000]">{text}</p>
          </div>
        </Link>
    )
  }

  return <div>
    <Contact
          src="/assets/logo/facebook.png"
          alt="Facebook"
          href="https://www.facebook.com/TriamUdomOPH/"
          text="TRIAM UDOM 
          OPEN HOUSE"
        />
        <Contact
          src="/assets/logo/x.png"
          alt="x"
          href="https://x.com/triamudomoph"
          text="triamudom.oph"
        />
        <Contact
          src="/assets/logo/tiktok.png"
          alt="TikTok"
          href="https://www.tiktok.com/@triamudom.oph"
          text="triamudom.oph"
        />
        <Contact
          src="/assets/logo/instagram.png"
          alt="Instagram"
          href="https://www.instagram.com/triamudom.oph/"
          text="triamudom.oph"
        />
        <Contact
          src="/assets/logo/youtube.png"
          alt="YouTube"
          href="https://www.youtube.com/c/TriamUdomOpenHouse"
          text="triamudomoph"
        />
  </div>
}

export default Contacts
