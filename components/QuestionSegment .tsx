'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  title: string;
  desc: string;
  email?: string;
};

const QuestionSegment: React.FC<Props> = ({ title, desc, email }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <button
        onClick={toggleDescription}
        className="flex justify-between items-center text-start w-full py-3 md:py-5 lg:py-[22px] "
      >
        <h3 className="w-[276px] md:w-[575px] lg:max-w-none text-base lg:text-xl md:text-lg font-roboto block">
          {title}
        </h3>
        <span className="block ml-2 md:ml-8 lg:ml-10 w-8 h-8 ">
          {expanded ? (
            <Image
              src="/svg/arrow-down.svg"
              alt="buton detailes"
              width={32}
              height={32}
              className="dark:invert"
            />
          ) : (
            <Image
              src="/svg/arrow-up.svg"
              alt="buton detailes"
              width={32}
              height={32}
              className="dark:invert"
            />
          )}
        </span>
      </button>
      <p
        className={` text-sm md:text-[16px] w-full mt-3 lg:mt-[18px] lg:pr-[196px] pb-4 lg:pb-5 ${
          expanded ? 'hidden ' : ' blok'
        }`}
      >
        {desc}
        {email && (
          <Link href={`mailto:${email}`} className="text-emailColorLink">
            {email}
          </Link>
        )}
      </p>
    </>
  );
};

export default QuestionSegment;
