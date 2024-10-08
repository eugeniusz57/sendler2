'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslations } from "next-intl";
import { setSliderDisplacement } from '@/app/utils/setSliderDisplacement';

let count = 0;

const SliderSmsService: React.FC = () => {
	const [extra, setExtra] = useState<string>('');
	const [isActiveRight, setIsActiveRight] = useState(false);
	const [isActiveLeft, setIsActiveLeft] = useState(true);
	const t = useTranslations('SmsServiseCard');

	const hanleClickLeft = (): void => {
		if (count > 0) {
			count = count - 1;
		}
		if (0 <= count && count <= 5) {
			setIsActiveRight(false);
			setSliderDisplacement(count, 352);
			setExtra('swiperOnMoveMobile');
		}
		if (count === 0) {
			setIsActiveLeft(true);
			setIsActiveRight(false);
		}
	};

	const hanleClickRight = (): void => {
		if (count < 5) {
			count = count + 1;
		}
		if (0 <= count && count <= 5) {
			setIsActiveLeft(false);
			setSliderDisplacement(count, 352);
			setExtra('swiperOnMoveMobile');
		}
		if (count === 5) {
			setIsActiveLeft(false);
			setIsActiveRight(true);
		}
	};

	let xStart: number | null = null;
	let yStart: number | null = null;

	const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>): void => {
		const firstTouch = e.touches[0];
		xStart = firstTouch.clientX;
		yStart = firstTouch.clientY;
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>): void => {
		if (!xStart || !yStart) {
			return;
		}

		let xEnd = 0;
		let yEnd = 0;

		xEnd = e.changedTouches[0].clientX;
		yEnd = e.changedTouches[0].clientY;

		let xDiff = xEnd - xStart;
		let yDiff = yEnd - yStart;

		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff > 0) {
				if (count > 0) {
					count = count - 1;
				}
				if (0 <= count && count <= 5) {
					setIsActiveRight(false);
					setSliderDisplacement(count, 352);
					setExtra('swiperOnMoveMobile');
				}
				if (count === 0) {
					setIsActiveLeft(true);
					setIsActiveRight(false);
				}
			} else {
				if (count < 5) {
					count = count + 1;
				}
				if (0 <= count && count <= 5) {
					setIsActiveLeft(false);
					setSliderDisplacement(count, 352);
					setExtra('swiperOnMoveMobile');
				}
				if (count === 5) {
					setIsActiveLeft(false);
					setIsActiveRight(true);
				}
			}
		}
		xStart = null;
		yStart = null;
	};

	return (
		<>
			<div className="container relative mx-auto">
				<div className="flex gap-3 absolute right-[40px] top-[15px] z-10">
					<button
						type="button"
						className={`md:hidden cursor-pointer ${isActiveLeft && 'opacity-[0.3]'} `}
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
						className={`md:hidden cursor - pointer ${isActiveRight && 'opacity-[0.3]'} `}
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
				<ul
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchMove}
					id="sliderServices"
					className={`flex md:flex-wrap gap-6 ${extra} swiperTransition`}
				>
					<SmsServiseCard
						title={t('title_1')}
						descr={t('description_1')}
					></SmsServiseCard>
					<SmsServiseCard
						linkText={t('linkText_1')}
						linkTo="/"
						title={t('title_2')}
						descr={t('description_2')}
					></SmsServiseCard>
					<SmsServiseCard
						title={t('title_3')}
						descr={t('description_3')}
					></SmsServiseCard>
					<SmsServiseCard
						title={t('title_4')}
						descr={t('description_4')}
					></SmsServiseCard>
					<SmsServiseCard
						title={t('title_5')}
						descr={t('description_5')}
					></SmsServiseCard>
					<SmsServiseCard
						linkText={t('linkText_2')}
						linkTo="/"
						title={t('title_6')}
						descr={t('description_6')}
					></SmsServiseCard>
				</ul>
			</div>
		</>
	);
};

export default SliderSmsService;

interface ICardProps {
	title: string;
	descr: string;
	linkText?: string;
	linkTo?: string;
}

function SmsServiseCard({ title, descr, linkText, linkTo }: ICardProps) {
	return (
		<li
			className="smsServiseCard dark:bg-darkItems dark:shadow  min-w-[328px] md:w-[328px] lg:min-w-[350.6px] xl:min-w-[416px] px-[14px] lg:px-[26px] pt-[54px] md:pt-10 pb-[26px] md:pb-3.5 lg:pb-[26px] rounde"
			key={title}
		>
			<p className=" font-montserrat font-medium text-lg lg:text-xl leading-[30px] dark:text-textColorDarkTheme text-[#1B1B30] mb-[24px] lg:mb-7">
				{title}
			</p>
			<p className=" font-montserrat text-sm lg:text-lg lg:leading-[27px] dark:text-textColorDarkTheme text-[#1B1B30]">
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
