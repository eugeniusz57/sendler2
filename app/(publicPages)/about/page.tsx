import Image from "next/image";
import { AboutMarketing } from "@/data/data";
import Title from "@/components/Title";

const About = () => {
  return (
    <>
      <div className="container mb-[60px]">
        <Title type="h1" color="dark">
          Про сервіс
        </Title>
      </div>
      <section className="bg-[url('/bg-about.jpg')] bg-cover bg-center flex flex-col items-center py-[40px] md:py-[80px] lg:py-[116px] h-[309px] md:h-[336px] lg:h-[400px] w-full">
        <div className="container">
          <p className="max-w-[855px] font-montserrat text-sm md:text-base lg:text-lg text-white">
            Компанія &quot;Інноваційні медіа рішення&quot; була заснована у 2000
            році у м. Києві. З 2006 року Компанія почала розвивати спрямування
            додаткових послуг у мережах мобільного зв&apos;язку - VAS (англ.
            Value Added Services - послуги, що приносять додатковий дохід).
            <br /> <br />
            Нашою перевагою є можливість надавати повний комплекс послуг у сфері
            мобільних технологій та мобільного маркетингу.
          </p>
        </div>
      </section>
      <section className="pt-20 flex flex-col items-center">
        <div className="container">
          <Title type="h1" color="dark">
            Можливості сервісу
          </Title>
          <ul className="flex justify-between items-center flex-wrap gap-[40px] md:gap-[60px] mt-[28px] md:mt-[60px]">
            {AboutMarketing.map(({ id, title, iconPath, alt }) => {
              return (
                <li key={id} className=" md:w-[308px]">
                  <Image src={iconPath} alt={alt} width={60} height={60} />
                  <p className="mt-[22px] font-montserrat md:text-lg lg:text-xl text-[#1B1B30]">
                    {title}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="pt-[50px] md:pt-20">
        <div className="container mb-[28px] md:mb-[60px] lg:text-center">
          <Title type="h1" color="dark">
            Розробка та супровід сервісів
          </Title>
        </div>
        <div className="container flex flex-col-reverse lg:items-center lg:flex-row gap-[28px] md:gap-[50px] lg:gap-[80px] xl:gap-[134px]">
          <div className="flex flex-col items-center justify-center lg:max-w-[526px] w-full md:pr-[148px] lg:pr-0 gap-[32px]">
            <p className="font-montserrat text-sm md:text-base text-[#1B1B30]">
              Якщо Вашій компанії потрібно розробити сервіс або провести акцію
              мобільного маркетингу, яка міститиме одну або кілька наших послуг,
              наша компанія готова до продуктивної співпраці.
            </p>
            <p className="font-montserrat text-sm md:text-base text-[#1B1B30]">
              Деталі розробки логіки сервісів чи акцій, питання відносності
              вартості проектів ми готові обговорити під час зустрічі чи по
              телефону.
            </p>
            <p className="font-roboto text-base md:text-xl text-[#1B1B30]">
              Зв&apos;яжіться з нами — ми завжди раді допомогти Вам у будь-якому
              питанні.
            </p>
          </div>
          <div className="self-end md:w-[504px] md:h-[337px] xl:w-[636px] xl:h-[437px]">
            <Image
              src="/about-development.png"
              alt="Development and maintenance of services"
              width={636}
              height={437}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
