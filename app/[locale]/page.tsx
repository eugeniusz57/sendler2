"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';

import Title from "@/components/Title";
import HeroBtn from "@/components/buttons/HeroBtn";
import Image from "next/image";
import ServiceDescriptionList from "@/components/startPageComp/ServiceDescriptionList";
import SliderAdvantages from "@/components/startPageComp/SliderAdvantages";
import SliderSmsService from "@/components/startPageComp/SliderSmsService";

const Home: React.FC = () => {
	const { data: session } = useSession();
	const route = useRouter();
	const locale = useLocale();
	const t = useTranslations('HomePage');

	if (session) {
		route.push(`/${locale}/user/${session?.user?.user_id}/mailing-list`);
	};

	return (
		<>
			<div className="w-full pb-[205px] pt-[239px] md:pb-[495px] md:pt-[421px] lg:pb-[342px] lg:pt-[310px] bg-[url('/start-hero.jpg')] bg-cover ">
				<div className=" container mx-auto ">
					<h1 className="mb-1.5 md:mb-4 text-[40px] md:text-[68px] lg:text-7xl lg:leading-[108px] font-bold text-white font-montserrat">
						BSender
					</h1>
					<h2 className="mb-11 lg:mb-12 text-sm md:text-base lg:text-lg font-normal text-white">
						{
							t('heroText')
						}
					</h2>
					<div className=" flex gap-[16px] md:gap-[14px]">
						<HeroBtn linkTo={"/login"}>
							{t('enterButtonText')}{" "}
							<Image
								className="ml-1 text-white"
								src="/svg/login.svg"
								alt="icon login logout"
								width={24}
								height={24}
							/>
						</HeroBtn>
						<HeroBtn linkTo={"/signup"}>{t('registrationButtonText')}</HeroBtn>
					</div>
				</div>
			</div>

			<main className="flex flex-col justify-center w-full bg-[#FEFEFE]">

				<section className="my-[50px] md:my-[80px]">
					<div className="container mx-auto mb-[28px] md:mb-[50px] lg:mb-[60px]">
						<Title type="h2" color="dark">
							{t('title_1')}
						</Title>
					</div>
					<SliderSmsService />

				</section>
				<section className=" container  mx-auto">
					<div className="mb-[28px] md:mb-[50px] lg:mb-[60px]">
						<Title type="h2" color="dark">
							{t('title_2_part_1')} <br />
							&#34;{t('title_2_part_2')}&#34;{t('title_3_part_3')}
						</Title>
					</div>
					<div className="md:hidden">
						<ServiceDescriptionList width={328} height={220} />
					</div>
					<div className="hidden md:block lg:hidden">
						<ServiceDescriptionList width={504} height={337} />
					</div>
					<div className="hidden lg:block">
						<ServiceDescriptionList width={526} height={350} />
					</div>
				</section>

				<section className="my-[50px] md:my-[80px]">
					<div className="container mx-auto mb-[28px] md:mb-[50px] lg:mb-[60px]">
						<Title type="h2" color="dark">
							{t('title_3')}
						</Title>
					</div>
					<div className="py-[60px] md:py-[60px] lg:py-[100px] caruselBg ">
						<SliderAdvantages />
					</div>
				</section>
			</main>
		</>
	);
};

export default Home;