'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const ophDate = new Date("2025-01-10T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: '0', hours: '0', mins: '0', secs: '0' });
  const [quote, setQuote] = useState('');

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = ophDate - now;
  
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
  

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote!);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);  

  const CountdownBox = ({ time, unit }: { time: string; unit: string }) => (
    <div className='flex flex-col items-center justify-center space-y-2'>
    <motion.div className="bg-white size-20 rounded-xl flex flex-col justify-center items-center hover:scale-110 transition-all shadow-xl">
      <div className='text-[#C72612] font-bold text-3xl md:text-4xl'>{time}</div>
    </motion.div>
      <div className='text-white opacity-70'>{unit}</div>
      </div>
  );

  const quotes = [
    "The only way to do great work is to love what you do.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Your limitation—it’s only your imagination",
  ];

  return (
    <section>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="flex space-x-4">
          <CountdownBox time={timeLeft.days} unit="Days" />
          <CountdownBox time={timeLeft.hours} unit="Hours" />
          <CountdownBox time={timeLeft.mins} unit="Minutes" />
          <CountdownBox time={timeLeft.secs} unit="Seconds" />
        </div>
        <p>{quote}</p>
      </div>
    </section>
  );
};

export default Countdown;
