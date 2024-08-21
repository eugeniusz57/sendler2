"use client";

import { useRouter } from "next/navigation";

type Props = {
	children: React.ReactNode;
};

const BackStatisticsBtn: React.FC<Props> = ({ children }) => {
	const router = useRouter();

	const handleClick = async () => {
		try {
			router.back();
		} catch (error: any) {
			console.log(error.message);
			router.push("/");
		}
	};

	return (
		<button
			onClick={handleClick}
			className="mb-10 text-lg font-roboto text-[#2366E8]"
		>
			{children}
		</button>
	);
};

export default BackStatisticsBtn;
