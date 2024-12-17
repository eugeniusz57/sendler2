'use client';

import { useTranslations } from "next-intl";
import TitleAuthForm from '@/components/TitleAuthForm';
import useWindowWidth from '../../../helpers/windowsSize';

interface Props {
	children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
	const t = useTranslations('AuthForm');
	const width = useWindowWidth() ?? 0;

	return (
		<div
			className={`w-full h-[1162px] mb-20 overflow-y-auto  bg-cover bg-center ${width < 1160 ? 'bg-[url("/bg-auth-tablet.jpg")]' : "bg-[url('/bg-auth.jpg')]"
				} flex items-left justify-left pt-[190px] mb-20}`}
		>
			<div className=" container mx-auto flex items-start justify-center lg:justify-start">
				<div className=" w-[328px] md:w-[526px] py-7 lg:py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700 px-[10px] lg:px-[26px] bg-formBg dark:bg-darkItems">
					<h1 className="form-title mb-8">{t('title')}</h1>
					<TitleAuthForm />
					{children}
				</div>
			</div>
		</div>
	);
};

export default RootLayout;