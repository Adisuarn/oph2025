import React from 'react'

interface ScheduleProps {
  name: string
  time: string
}
const Schedule: React.FC<ScheduleProps> = ({ name, time }) => {
  return (
    <div className="flex">
      <div>{time}</div>
      <div>{name}</div>
    </div>
  )
}

const page = () => {
  return (
    <section className="flex w-screen flex-col items-center justify-center">
      <div>
        <p>10 Jan 2025</p>
        <Schedule name="พิธีเปิด" time="8.20-9.30" />
        <Schedule name="การสัมภาษณ์รองททรงเกียรติ" time="8.20-9.30" />
        <Schedule name="พิธีเปิด" time="8.20-9.30" />
        <Schedule name="พิธีเปิด" time="8.20-9.30" />
        <Schedule name="พิธีเปิด" time="8.20-9.30" />
        <Schedule name="พิธีเปิด" time="8.20-9.30" />
        <Schedule name="พิธีเปิด" time="8.20-9.30" />
      </div>
      <div>
        <p>11 Jan 2025</p>
        <Schedule name="name" time="time" />
      </div>
    </section>
  )
}

export default page
