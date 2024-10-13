import TablePrices from '@/components/TablePrices';
import Title from '@/components/Title';
import HeroBtn from '@/components/buttons/HeroBtn';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Prices: React.FC = () => {
	const t = useTranslations('PricesPage');
	return (
		<>
			<section className="w-full bg-[url('/bg-prices-mobile.jpg')] md:bg-[url('/bg-prices-tablet.jpg')] lg:bg-[url('/bg-prices.jpg')] bg-cover flex flex-col items-center pt-[213px] pb-[248px] h-[400px]  md:h-[532px]  lg:h-[606px]">
				<div className="container ">
					<Title type="h1" color="light">
						{' '}
						{t('pageTitle')}
					</Title>
					<div className=" flex gap-[14px] mt-11 lg:mt-12 ">
						<HeroBtn linkTo="/login">
							{t('enterButtonText')}{' '}
							<Image
								className="ml-1 text-white"
								src="/svg/login.svg"
								alt="icon login logout"
								width={24}
								height={24}
							/>
						</HeroBtn>
						<HeroBtn linkTo="/signup">{t('registrationButtonText')}</HeroBtn>
					</div>
				</div>
			</section>
			<section className="pt-[50px] md:pt-20 flex flex-col items-center">
				<div className="container ">
					<div className="lg:flex items-center w-full">
						<div className="lg:w-5/12 md:w-[525px] mb-[50px] lg:mb-0">
							<p className="font-roboto text-lg md:text-xl mb-2">{t('textTitle')}</p>
							<p className=" text-sm md:text-base mb-6 md:mb-8">
								{t('text_part1')}
							</p>
							<p className="text-sm md:text-base mb-6 md:mb-8">
								{t('text_part2')} <br />
								{t('text_part3')}
							</p>
							<p className="text-sm md:text-base">
								{t('text_part4')}
							</p>
						</div>
						<div className="flex  w-full">
							<TablePrices />
						</div>
					</div>
					<p className="font-roboto text-base md:text-lg lg:text-xl mt-[50px] md:mt-20">
						{t('text_part5')}
					</p>
				</div>
			</section>
		</>
	);
};

export default Prices;
