'use client'

import React, { useEffect, useState } from 'react';
import * as motion from "motion/react-client";

const Countdown = () => {
  const ophTime = new Date('2025-01-10T00:00:00Z').getTime();

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = ophTime - now;

    if (difference <= 0) {
      return { days: '00', hours: '00', mins: '00', secs: '00' };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((difference / (1000 * 60)) % 60);
    const secs = Math.floor((difference / 1000) % 60);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      mins: String(mins).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft); // Initialize with calculated time

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownBox = ({ time, unit }: { time: string; unit: string }) => (
    <div className='flex flex-col items-center justify-center space-y-1 lg:space-y-2'>
      <motion.div className="bg-white size-14 lg:size-20 xl:size-24 rounded-xl flex flex-col justify-center items-center hover:scale-110 transition-all shadow-xl">
        <div className='text-[#C72612] font-bold text-2xl lg:text-4xl xl:text-5xl'>{time}</div>
      </motion.div>
      <div className='text-white opacity-70 xl:text-sm'>{unit}</div>
    </div>
  );

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div className="flex space-x-2 lg:space-x-4 xl:space-x-8">
          <CountdownBox time={timeLeft.days} unit="Days" />
          <CountdownBox time={timeLeft.hours} unit="Hours" />
          <CountdownBox time={timeLeft.mins} unit="Minutes" />
          <CountdownBox time={timeLeft.secs} unit="Seconds" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
