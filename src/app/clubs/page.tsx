'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Clubs from '~/_data/content/clubs.json'
import { AnimatePresence, motion } from 'framer-motion'

const SearchBar = () => {
  const [query, setQuery] = useState('')

  // Filtered data based on query
  const filteredClubs = Clubs.filter((club) =>
    club.thainame.toLowerCase().includes(query.toLowerCase()),
  )

  interface ClubBoxProps {
    thainame: string
    logo: string
    id: string
  }

  const ClubBox: React.FC<ClubBoxProps> = ({ thainame, logo, id }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        className="bg-gray-100 flex w-48 flex-col items-center justify-center rounded-md border p-2 text-center"
      >
        <Link href={`clubs/${id}`} className="flex flex-col items-center justify-center">
          <Image
            alt={thainame}
            src={logo || '/images/placeholder.png'}
            objectFit="cover"
            priority={true}
            className="h-[112px] w-[212px] rounded-t-lg object-cover md:h-[112px] md:w-[212px]"
            width={212}
            height={112}
          />
          <div className="h-1 w-full bg-gradient-to-r from-[#1827AA] via-[#FA58C4] to-[#D7D7D7]"></div>
          <p>{thainame}</p>
        </Link>
      </motion.div>
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <section className="flex flex-col items-center bg-blue-50">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-80 rounded-md border p-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <motion.div
        className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4"
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: 'easeInOut',
          },
        }}
      >
        <AnimatePresence>
          {filteredClubs.map((club) => (
            <ClubBox key={club.key} thainame={club.thainame} logo={club.logo} id={club.clubKey} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default SearchBar
