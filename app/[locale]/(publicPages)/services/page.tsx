import Title from "@/components/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Services: React.FC = () => {
	const t = useTranslations('ServicesPage');
	return (
		<>
			<section className="bg-[url('/bg-services-mobile.jpg')] md:bg-[url('/bg-services-tablet.jpg')] lg:bg-[url('/bg-services.jpg')]  bg-cover flex flex-col items-center pt-[206px]  h-[400px]  md:h-[532px]  lg:h-[606px] w-full">
				<div className="container ">
					<Title type="h1" color="light">
						{" "}
						{t('pageTitle')}.
					</Title>
				</div>
			</section>

			<section className="container pt-7 md:pt-20 flex flex-col">
				<div className=" flex  flex-col lg:flex-row w-full  ">
					<ul className=" md:mr-[88px] lg:mr-[174px] lg:w-[636px] lg:pt-[100px]">
						<li className=" mb-6 md:mb-8">
							<p className=" text-sm md:text-base">
								{t('text_part1')}
							</p>
						</li>
						<li>
							<p className=" text-sm md:text-base">
								{t('text_part2')}
							</p>
						</li>
					</ul>
					<ul className="flex flex-col ml-auto lg:ml-0 mt-[50px] lg:mt-0 gap-[22px] font-montserrat">
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/1.svg"
									width={16}
									height={54}
									alt="number"
								/>
							</span>
							<p className=" ml-7 md:ml-10 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_1')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/2.svg"
									width={32}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_2')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/3.svg"
									width={32}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_3')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/4.svg"
									width={34}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_4')}
							</p>
						</li>
						<li className="flex items-center  bg-formBg dark:bg-darkItems py-[10px] px-3 md:px-[14px] rounded-[18px] md:w-[486px]">
							<span>
								<Image
									className="dark:invert"
									src="/svg/services/5.svg"
									width={32}
									height={54}
									alt="number"
								/>
							</span>
							<p className="ml-3 md:ml-6 text-sm md:text-lg  lg:text-xl">
								{t('titleItem_5')}
							</p>
						</li>
					</ul>
				</div>
				<p className="mt-[50px] md:mt-20 font-roboto text-base md:text-[18px] lg:text-[20px]">
					{t('textEnd')}
				</p>
			</section>
		</>
	);
};

export default Services;
