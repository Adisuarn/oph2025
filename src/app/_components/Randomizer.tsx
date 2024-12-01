import React from "react";
import Link from "next/link";

const Randomizer = () => {
  const mockData = [
    { name: "Cristiano Ronaldo", desc: "The best football player in the world" },
    { name: "Lionel Messi", desc: "The second best football player in the world" },
    { name: "Neymar Jr.", desc: "The third best football player in the world" },
    { name: "Kylian Mbappe", desc: "The fourth best football player in the world" },
    { name: "Mohamed Salah", desc: "The fifth best football player in the world" },
    { name: "Kevin De Bruyne", desc: "The sixth best football player in the world" },
    { name: "Robert Lewandowski", desc: "The seventh best football player in the world" },
    { name: "Sadio Mane", desc: "The eighth best football player in the world" },
    { name: "Karim Benzema", desc: "The ninth best football player in the world" },
    { name: "Harry Kane", desc: "The tenth best football player in the world" },
  ];

  // Helper function to shuffle the array
  const shuffleArray = (array: typeof mockData) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Get the first 8 unique items from the shuffled array
  const randomizedData = shuffleArray(mockData).slice(0, 8);

  type RandomBoxProps = {
    name: string;
    desc: string;
  };

  const RandomBox: React.FC<RandomBoxProps> = ({ name, desc }) => {
    return (
      <Link href='/' className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold">{name}</h2>
        <p>{desc}</p>
      </Link>
    );
  };

  return (
    <div className="grid grid-rows-2 grid-cols-4 gap-4 p-4">
      {randomizedData.map((player, index) => (
        <RandomBox key={index} name={player.name} desc={player.desc} />
      ))}
    </div>
  );
};

export default Randomizer;
