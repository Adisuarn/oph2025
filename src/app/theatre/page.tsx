import Image from 'next/image'
import React from 'react'

interface ScheduleProps {
  name: string
  time: string
  desc: string
}
const Schedule: React.FC<ScheduleProps> = ({ name, time, desc }) => {
  return (
    <div className="flex">
      {/* <Image src={time} alt={name} /> */}
      <div className="flex flex-col">
        <div>{time}</div>
        <div>{desc}</div>
        <div>{name}</div>
      </div>
    </div>
  )
}

const page = () => {
  return (
    <section>
      <div>
        <p>10 Jan 2025</p>
        <Schedule name="name" desc="desc" time="time" />
      </div>
      <p>11 Jan 2025</p>
      <Schedule name="name" desc="desc" time="time" />
    </section>
  )
}

export default page
