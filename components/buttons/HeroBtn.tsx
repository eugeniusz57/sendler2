"use-client";

import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
	children: React.ReactNode;
	linkTo: string;
};

const HeroBtn: React.FC<Props> = ({ children, linkTo }: Props) => {
	const locale = useLocale();
	return (
		<Link
			href={locale + linkTo}
			className="w-[156px] md:w-[144px] py-[10px] rounded-[14px] bg-[#32BB79] hover:bg-green-700 text-white text-base flex items-center justify-center transition-colors"
		>
			{children}
		</Link>
	);
}

export default HeroBtn;
