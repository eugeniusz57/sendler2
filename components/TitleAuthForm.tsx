'use client'
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useTranslations } from "next-intl";

const TitleAuthForm: React.FC = () => {
	const pathName = usePathname();
	const t = useTranslations('AuthForm');
	return (
		<div className="flex items-center mb-8">
			<Link
				href="/login"
				className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4 mr-[92px] ${pathName.startsWith("/login")
					? "underline underline-offset-4"
					: ""
					}`}
			>
				{t('subTitle_1')}
			</Link>
			<Link
				href="/signup"
				className={`font-roboto text-base font-normal hover:underline hover:underline-offset-4  ${pathName.startsWith("/signup")
					? "underline underline-offset-4"
					: ""
					}`}
			>
				{t('subTitle_2')}
			</Link>
		</div>
	)
}

export default TitleAuthForm;