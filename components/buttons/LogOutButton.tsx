"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

type LogOutButtonProps = {
	onClick?: () => void;
};

const LogOutButton: React.FC<LogOutButtonProps> = ({ onClick }) => {

	const t = useTranslations('LogOutButton');

	const handleLogOut = () => {
		if (onClick) {
			onClick();
		}
		signOut({ callbackUrl: "/" });
	};

	return (
		<button
			onClick={handleLogOut}
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

export default LogOutButton;