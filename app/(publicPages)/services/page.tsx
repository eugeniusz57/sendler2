import Title from "@/components/Title";
import Image from "next/image";

const Services = () => {
  return (
    <>
      <section className="bg-[url('/bg-services-mobile.jpg')] md:bg-[url('/bg-services-tablet.jpg')] lg:bg-[url('/bg-services.jpg')]  bg-cover flex flex-col items-center pt-[206px]  h-[400px]  md:h-[532px]  lg:h-[606px] w-full">
        <div className="container ">
          <Title type="h1" color="light">
            {" "}
            Цільові SMS-Розсилки.
          </Title>
        </div>
      </section>

      <section className="container pt-7 md:pt-20 flex flex-col">
        <div className=" flex  flex-col lg:flex-row w-full  ">
          <ul className=" md:mr-[88px] lg:mr-[174px] lg:w-[636px] lg:pt-[100px]">
            <li className=" mb-6 md:mb-8">
              <p className=" text-sm md:text-base">
                Якщо Ви зацікавлені в залученні нової аудиторії до Вашого товару
                або сервісу і при цьому бажаєте використовувати один із
                найефективніших способів цільової реклами — SMS-Розсилку,
                компанія пропонує послугу Цільових SMS-Розсилок по базах
                операторів.
              </p>
            </li>
            <li>
              <p className=" text-sm md:text-base">
                Ви самі вибираєте цільову аудиторію та потрібну кількість
                контактів, яким буде доставлено Ваше повідомлення. Можливі такі
                параметри вибору:
              </p>
            </li>
          </ul>
          <ul className="flex flex-col ml-auto lg:ml-0 mt-[50px] lg:mt-0 gap-[22px] font-montserrat">
            <li className="flex items-center  bg-formBg py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
              <span>
                <Image
                  src="/svg/services/1.svg"
                  width={16}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className=" ml-7 md:ml-10 text-sm md:text-lg  lg:text-xl">
                Витрати абонента на місяць
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
              <span>
                <Image
                  src="/svg/services/2.svg"
                  width={32}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
                Місце розташування абонента
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
              <span>
                <Image
                  src="/svg/services/3.svg"
                  width={32}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
                Знаходження абонента у роумінгу
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
              <span>
                <Image
                  src="/svg/services/4.svg"
                  width={34}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
                Тип абонента (контракт, pre-paid)
              </p>
            </li>
            <li className="flex items-center  bg-formBg py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
              <span>
                <Image
                  src="/svg/services/5.svg"
                  width={32}
                  height={54}
                  alt="number"
                ></Image>
              </span>
              <p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
                Використання додаткових послуг
              </p>
            </li>
          </ul>
        </div>
        <p className="mt-[50px] md:mt-20 font-roboto text-base md:text-[18px] lg:text-[20px]">
          Зв&apos;яжіться з нами для отримання детальної інформації про вартість
          Цільової SMS-Розсилки.
        </p>
      </section>
    </>
  );
};

export default Services;
