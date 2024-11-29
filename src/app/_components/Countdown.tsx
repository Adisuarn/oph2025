'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const ophDate = new Date("2025-01-10T00:00:00Z").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = ophDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      mins: Math.floor((difference / (1000 * 60)) % 60),
      secs: Math.floor((difference / 1000) % 60),
    };
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownBox = ({ time, unit }: { time: number; unit: string }) => {
    useEffect(() => {
        // console.log(time);
    }, [time]);
    return (
      <motion.div
      className="bg-white size-20 rounded-xl flex flex-col justify-center items-center hover:scale-110 transition-all">
        <div>{unit}</div>
        <div>{time}</div>
      </motion.div>
    );
  };
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    if (randomQuote) {
      setQuote(randomQuote);
    }
  }, []); 
  const quotes = [
    "The only way to do great work is to love what you do.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Your limitation—it’s only your imagination",
  ]

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
