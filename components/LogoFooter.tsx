"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import React from "react";

const LogoFooter: React.FC = () => {
	const { data: session, status } = useSession();
	const t = useTranslations('Footer');
	const isLogin = status === "authenticated";
	return isLogin ? (
		<div className="inline-flex flex-col items-center gap-1">
			<span className=" text-[34px] font-medium text-white font-montserrat tracking-wide">
				BSender
			</span>
			<span className=" text-sm text-white font-montserrat">
				{t('logoText')}
			</span>
		</div>
	) : (
		<Link href={"/"} className=" inline-flex flex-col items-center gap-1">
			<span className=" text-[34px] font-medium text-white font-montserrat tracking-wide">
				BSender
			</span>
			<span className=" text-sm text-white font-montserrat">
				{t('logoText')}
			</span>
		</Link>
	);
};

export default LogoFooter;
