"use client";
import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { setSliderDisplacement } from "@/app/utils/setSliderDisplacement";

let count = 0;

function SliderAdvantages() {
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
			<div className="container lg:w-[998px] xl:w-full relative mx-auto">
				<div className="flex gap-3  absolute right-[15px] top-[-50px]">
					<button
						type="button"
						className={`hidden lg:block cursor - pointer ${!isActive && "opacity-[0.3]"} `}
						onClick={hanleClick}
						disabled={!isActive}
					>
						<Image
							src="/svg/carbon_next-outline.svg"
							alt="left arrow"
							width={28}
							height={28}
						/>
					</button>

					<button
						type="button"
						className={`hidden lg:block cursor - pointer ${isActive && "opacity-[0.3]"} `}
						onClick={hanleClick}
						disabled={isActive}
					>
						<Image
							src="/svg/carbon_next-outline-1.svg"
							alt="left arrow"
							width={28}
							height={28}
						/>
					</button>

					<button
						type="button"
						className={`md:hidden cursor - pointer ${isActiveLeft && "opacity-[0.3]"} `}
						onClick={hanleClickLeft}
						disabled={isActiveLeft}
					>
						<Image
							src="/svg/carbon_next-outline.svg"
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
							src="/svg/carbon_next-outline-1.svg"
							alt="right arrow"
							width={28}
							height={28}
						/>
					</button>
				</div>
			</div>

			<div className="container lg:w-[998px] xl:w-full overflow-hidden mx-auto  ">
				<ul className={`flex md:flex-wrap lg:flex-nowrap gap-6 ${extra} swiperTransition`}>
					<SwiperCard idx="1">
						<Image
							src="/svg/swiper-check-circle.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Зручний та простий у використанні інтерфейс керування послугою
						</p>
					</SwiperCard>

					<SwiperCard idx="2">
						<Image
							src="/svg/swiper-dollar.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Ви сплачуєте лише за доставлені повідомлення за умови підписання
							договору!
						</p>
					</SwiperCard>

					<SwiperCard idx="3">
						<Image
							src="/svg/swiper-sms.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Високий рівень відкриття SMS-повідомлень - найефективніший
							інструмент реклами.
						</p>
					</SwiperCard>

					<SwiperCard idx="4">
						<Image
							src="/svg/swiper-telegramm.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							SMS-розсилки – майбутнє вашого бізнесу, його успіх та розвиток.
						</p>
					</SwiperCard>

					<SwiperCard idx="5">
						<Image
							src="/svg/swipertime-fast.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							BSender - &#34;Швидкий, простий та надійний SMS сервіс&#34;
						</p>
					</SwiperCard>

					<SwiperCard idx="6">
						<Image
							src="/svg/swiper-gift.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Sms привітання з днем ​​народження для постійних клієнтів
						</p>
					</SwiperCard>
				</ul>
			</div>
		</>
	);
}

function SwiperCard({ children, idx }: { children: ReactNode; idx: string }) {
	return (
		<li
			key={idx}
			className="min-w-[328px] md:w-[328px] lg:min-w-[306px] h-[240px] md:h-[275px] rounded-[18px] border-[#E2E2E2] border bg-[#d8d8d819] px-[30px] py-[26px] flex flex-col gap-[22px] items-center"
		>
			{children}
		</li>
	);
}

export default SliderAdvantages;


