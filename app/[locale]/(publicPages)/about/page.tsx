import Image from "next/image";
import { useTranslations } from 'next-intl'
import Title from "@/components/Title";

const About: React.FC = () => {
	const t = useTranslations('AboutPage');
	const AboutMarketing = [
		{
			id: 1,
			title: t('titleItem_1'),
			iconPath: '/svg/service-mobile.svg',
			alt: 'Mobile marketing',
		},
		{
			id: 2,
			title: t('titleItem_2'),
			iconPath: '/svg/service-comment.svg',
			alt: 'SMS-Mailing',
		},
		{
			id: 3,
			title: t('titleItem_3'),
			iconPath: '/svg/service-tags.svg',
			alt: 'SMS-Services, promotions',
		},
		{
			id: 4,
			title: t('titleItem_4'),
			iconPath: '/svg/service-settings.svg',
			alt: 'Development of Internet sites',
		},
		{
			id: 5,
			title: t('titleItem_5'),
			iconPath: '/svg/service-play-circle.svg',
			alt: 'Mobile multimedia content',
		},
		{
			id: 6,
			title: t('titleItem_6'),
			iconPath: '/svg/service-servmobile.svg',
			alt: 'Voice services',
		},
	];
	return (
		<>
			<div className="container mb-[60px]">
				<Title type="h1" color="dark">
					{t('pageTitle')}
				</Title>
			</div>
			<section className="bg-[url('/bg-about.jpg')] bg-cover bg-center flex flex-col items-center py-[40px] md:py-[80px] lg:py-[116px] h-[309px] md:h-[336px] lg:h-[400px] w-full">
				<div className="container">
					<p className="max-w-[855px] font-montserrat text-sm md:text-base lg:text-lg text-white">
						{`${t('textPage_Part1')}`}
						<br /> <br />
						{`${t('textPage_Part2')}`}
					</p>
				</div>
			</section>
			<section className="pt-20 flex flex-col items-center">
				<div className="container">
					<Title type="h1" color="dark">
						{t('subTitle_1')}
					</Title>
					<ul className="flex justify-between items-center flex-wrap gap-[40px] md:gap-[60px] mt-[28px] md:mt-[60px]">
						{AboutMarketing.map(({ id, title, iconPath, alt }) => {
							return (
								<li key={id} className=" md:w-[308px]">
									<Image src={iconPath} alt={alt} width={60} height={60} />
									<p className="mt-[22px] font-montserrat md:text-lg lg:text-xl text-[#1B1B30] dark:text-textColorDarkTheme">
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
						{t('subTitle_2')}
					</Title>
				</div>
				<div className="container flex flex-col-reverse lg:items-center lg:flex-row gap-[28px] md:gap-[50px] lg:gap-[80px] xl:gap-[134px]">
					<div className="flex flex-col items-center justify-center lg:max-w-[526px] w-full md:pr-[148px] lg:pr-0 gap-[32px]">
						<p className="font-montserrat text-sm md:text-base text-mainTextColor dark:text-textColorDarkTheme">
							{t('text_part1')}
						</p>
						<p className="font-montserrat text-sm md:text-base text-mainTextColor dark:text-textColorDarkTheme">
							{t('text_part2')}
						</p>
						<p className="font-roboto text-base md:text-xl text-mainTextColor dark:text-textColorDarkTheme">
							{t('text_part3')}.
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
