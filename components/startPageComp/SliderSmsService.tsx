"use client";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { setSliderDisplacement } from "@/app/utils/setSliderDisplacement";

let count = 0;

function SliderSmsService() {
	const [extra, setExtra] = useState<string>("");
	const [isActive, setIsActive] = useState(false);
	const [isActiveRight, setIsActiveRight] = useState(false);
	const [isActiveLeft, setIsActiveLeft] = useState(true);

	const hanleClick = (): void => {
		if (extra === "") {
			setExtra("swiperOnMove");
			setIsActive(true);
		} else {
			setExtra("");
			setIsActive(false);
		}
	};

	const hanleClickLeft = (): void => {
		if (count > 0) {
			count = count - 1;
		};
		if (0 <= count && count <= 5) {
			setIsActiveRight(false);
			setSliderDisplacement(count, 352);
			setExtra('swiperOnMoveMobile');
		}
		if (count === 0) {
			setIsActiveLeft(true);
			setIsActiveRight(false);
		};
	};

	const hanleClickRight = (): void => {
		if (count < 5) {
			count = count + 1
		};
		if (0 <= count && count <= 5) {
			setIsActiveLeft(false);
			setSliderDisplacement(count, 352);
			setExtra('swiperOnMoveMobile');
		}
		if (count === 5) {
			setIsActiveLeft(false);
			setIsActiveRight(true);
		};
	};

	return (
		<>
			<div className="container relative mx-auto">
				<div className="flex gap-3 absolute right-[40px] top-[15px] z-10">

					<button
						type="button"
						className={`md:hidden cursor-pointer ${isActiveLeft && "opacity-[0.3]"} `}
						onClick={hanleClickLeft}
						disabled={isActiveLeft}
					>
						<Image
							src="/svg/carbon_next-outline-black.svg"
							alt="left arrow"
							width={28}
							height={28}
						/>
					</button>

					<button
						type="button"
						className={`md:hidden cursor - pointer ${isActiveRight && "opacity-[0.3]"} `}
						onClick={hanleClickRight}
						disabled={isActiveRight}
					>
						<Image
							src="/svg/carbon_next-outline-black-1.svg"
							alt="right arrow"
							width={28}
							height={28}
						/>
					</button>
				</div>
			</div>

			<div className="container lg:w-[1130px] xl:w-full overflow-hidden mx-auto  ">
				<ul className={`flex md:flex-wrap gap-6 ${extra} swiperTransition`}>
					<SmsServiseCard
						title="Створення та керування СМС-розсилкою"
						descr="Ви задаєте текст повідомлення, вибираєте групи абонентів, які отримають повідомлення, і вказуєте час, коли повідомлення будуть відправленні отримувачам."
					></SmsServiseCard>
					<SmsServiseCard
						linkText="Інструкція"
						linkTo="/"
						title="Альфа ім'я відправника SMS-повідомлення"
						descr="Ви самі вибираєте підпис (ім'я відправника), який відображатиметься замість номера відправника SMS-повідомлення. "
					></SmsServiseCard>
					<SmsServiseCard
						title="Звіти про доставку ваших повідомлень"
						descr="Звіт з кожної СМС-Розсилки Ви зможете переглянути on-line на сайті або завантажити у зручному форматі (Excel)."
					></SmsServiseCard>
					<SmsServiseCard
						title="Створення та редагування груп абонентів"
						descr="Ви задаєте текст повідомлення, вибираєте групи абонентів, які отримають повідомлення, і вказуєте час, коли повідомлення будуть відправленні отримувачам."
					></SmsServiseCard>
					<SmsServiseCard
						title="Покриття  мобільних операторів зв’язку"
						descr="Ви маєте можливість надсилати повідомлення абонентам усіх українських мобільних операторів. На запит доступні інші країни."
					></SmsServiseCard>
					<SmsServiseCard
						linkText="Реєстрація"
						linkTo="/"
						title="Послуга не потребує встановлення"
						descr="Ви зможете надсилати SMS-повідомлення з будь-якого комп'ютера, підключеного до Інтернету, використовуючи наш сайт."
					></SmsServiseCard>
				</ul>
			</div>
		</>
	);
}

export default SliderSmsService;

interface ICardProps {
	title: string;
	descr: string;
	linkText?: string;
	linkTo?: string;
};

function SmsServiseCard({ title, descr, linkText, linkTo }: ICardProps) {
	return (
		<li className="smsServiseCard min-w-[328px] md:w-[328px] lg:min-w-[350.6px] xl:min-w-[416px] px-[14px] lg:px-[26px] pt-[54px] md:pt-10 pb-[26px] md:pb-3.5 lg:pb-[26px] rounde" key={title}>
			<p className=" font-montserrat font-medium text-lg lg:text-xl leading-[30px] text-[#1B1B30] mb-[24px] lg:mb-7">
				{title}
			</p>
			<p className=" font-montserrat text-sm lg:text-lg lg:leading-[27px] text-[#1B1B30]">
				{descr}
				{linkTo && (
					<Link href={linkTo} className="block text-[#2366E8] underline">
						{linkText}
					</Link>
				)}
			</p>
		</li>
	);
}



