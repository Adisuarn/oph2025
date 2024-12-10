import React from "react";
import Link from "next/link";
import Clubs from '~/_data/content/clubs.json'
import Image from 'next/image'

const Randomizer = () => {
  const allData = Clubs;

  function randomData(n: number) {
    const result = [];
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * allData.length);
      const [removed] = allData.splice(randomIndex, 1);
        result.push(removed);
    }
    return result;
  }

  const randomFour = randomData(4);

  interface RandomBoxProps {
    name: string;
    logo: string;
    tag: string;
    id: string;
  }

  const RandomBox: React.FC<RandomBoxProps> = ({ name, logo, tag, id }) => {
    return (
        <Link href={`/${tag}/${id}`} className="p-4 border rounded flex flex-col justify-center items-center">
        <Image src={logo || "/hello"} alt={name} width={100} height={100} />
        <h2 className="text-xl font-bold">{name}</h2>
      </Link>
    );
  };

  return (
    <div className="grid grid-rows-2 grid-cols-4 gap-4 p-4">
      {randomFour.map((data, index) => (
        <RandomBox key={index} name={data?.thainame ?? 'Unknown Name'} logo={data?.logo ?? 'No Logo'} tag={data?.tag ?? 'No Tag'} id={data?.clubKey ?? 'No ID'} />
      ))}
    </div>
  );
};

export default Randomizer;
