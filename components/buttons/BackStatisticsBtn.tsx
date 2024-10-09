"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
};

const BackStatisticsBtn: React.FC<Props> = ({ children, onClick }) => {

	return (
		<button
			onClick={onClick}
			className="mb-10 text-lg font-roboto text-emailColorLink"
		>
			{children}
		</button>
	);
};

export default BackStatisticsBtn;
