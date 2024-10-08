'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const SwitchTheme: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );

  const [isToggled, setIsToggled] = useState<boolean>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'light' ? true : false
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const onToggle = () => {
    toggleTheme();
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme', isToggled ? 'light' : 'dark');
  }, [isToggled]);

  console.log('isToggled', isToggled);

  return (
    <label className="relative inline-block w-[72px] h-[34px] ml-2 md:ml-8">
      <input type="checkbox" checked={!isToggled} onChange={onToggle} className="hidden" />
      <span
        className={`absolute inset-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out px-2
    ${isToggled ? 'bg-swetchThemeBgLight' : 'bg-darkInput'} flex text-center justify-center 
  `}
      >
        <Image
          src="./svg/sun.svg"
          alt="sun"
          width={16}
          height={16}
          className={`mr-auto z-10 ${isToggled ? 'invert-0' : 'invert'}`}
        />
        <Image
          src="./svg/moon.svg"
          alt="moon"
          width={16}
          height={16}
          className={`ml-auto z-10 ${isToggled ? 'invert' : 'invert-0'}`}
        />
      </span>
      <span
        className={` absolute left-1 top-1 w-[26px] h-[26px] bg-bgSwetch rounded-full transition-transform transform
          ${isToggled ? 'translate-x-0' : 'translate-x-[38px] '}  
        `}
      ></span>
    </label>
  );
};

export default SwitchTheme;
