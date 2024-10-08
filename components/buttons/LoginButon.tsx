"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEvent } from "react";
import { useTranslations } from 'next-intl';


type LoginButtonProps = {
	onClick?: () => void;
};

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
	const router = useRouter();
	const t = useTranslations('LoginButton');

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {

		if (onClick) {
			onClick();
		}
		router.push("/login");
	};

	return (
		<button
			onClick={handleClick}
			className="flex justify-center items-center hover:underline hover:underline-offset-4 lg:py-4 lg:ml-11"
			type="button"
		>
			{t('text')}
			<Image
				className="ml-1"
				src="/svg/login.svg"
				alt="icon login logout"
				width={30}
				height={30}
			/>
		</button>
	);
};

export default LoginButton;
