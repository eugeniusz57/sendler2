'use client'

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const BackBtn: React.FC = () => {
	const router = useRouter();
	const t = useTranslations('AdminEditPage');

	const handlePrevClick = () => {
		router.back();
	};

	return (
		<div>
			<button className="bg-headerTable text-white text-xl font-roboto  leading-[30px] py-2 px-3 border-slate-400 rounded-xl hover:bg-hoverGreenBtn" onClick={handlePrevClick}>{t('backBtnText')}</button>
		</div>
	);
};

export default BackBtn;