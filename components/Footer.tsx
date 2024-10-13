
import Link from "next/link";
import React from "react";
import { useTranslations } from 'next-intl';
import Feedback from "./Feedback";
import LogoFooter from "./LogoFooter";

const Footer: React.FC = () => {
	const t = useTranslations('Footer');

	return (
		<footer
			id="footer"
			className=" w-full flex justify-center bg-bgFooter md:pt-[60px] pt-[30px] lg:pt-[50px] pb-[38px] text-white font-roboto text-lg font-normal"
		>
			<div className="container ">
				<LogoFooter />
				<ul className="flex flex-wrap lg:flex-wrap-no-wrap justify-between items-center pt-10 md:pt-[60px]">
					<li className="flex flex-col gap-[14px] justify-center mb-[50px] lg:mb-0">
						<p className=" lg:text-base text-sm font-medium ">
							{t('company_part_1')} &quot;{t('company_part_2')}&quot;{t('company_part_3')}
						</p>
						<p className="lg:text-base text-sm font-medium">
							{t('e-mail')}
							<Link
								className="ml-3 lg:text-base text-sm underline-offset-1 underline"
								href="mailto:info@bsender.com.ua"
								type="email"
							>
								info@bsender.com.ua
							</Link>
						</p>
						<p className="lg:text-base text-sm font-medium">
							{t('phone')}
							<Link className="ml-3 lg:text-base text-sm" href="tel:+38 (097) 678-12-59">
								+38 (097) 678-12-59
							</Link>
						</p>
					</li>
					<li className="flex flex-col gap-[14px] justify-center mb-[50px] lg:mb-0">
						<p className="lg:text-base text-sm  font-medium ">{t('legalAddress')}</p>
						<p className="lg:text-base text-sm">
							{t('address')}
						</p>
						<p className="lg:text-base text-sm">
							{t('advertisingText')}
						</p>
					</li>
					<li className="flex flex-col gap-[14px] justify-center w-full">
						<Feedback />
					</li>
					<li className="block lg:hidden">
						<p className="text-center text-sm mt-[60px]">
							&copy; {new Date().getFullYear()}, BSender.com.ua {t('allRights')}
						</p>
					</li>
				</ul>

				<p className="hidden lg:block  text-center text-sm mt-[60px]">
					&copy; {new Date().getFullYear()}, BSender.com.ua {t('allRights')}
				</p>
			</div>
		</footer>
	);
};

export default Footer;