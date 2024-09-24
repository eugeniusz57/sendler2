import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

interface Props {
	width: number;
	height: number;
};

const ServiceDescriptionList: React.FC<Props> = ({ width, height }) => {
	const t = useTranslations('ServiceDescriptionList');
	return (
		<ul className="flex flex-col gap-[50px] md:gap-[80px] text-[#1B1B30] text-sm md:text-base font-montserrat">
			<li key="1" className="flex flex-col lg:flex-row gap-[28px] md:gap-[50px] lg:gap-[134px]">
				<div className="flex flex-col order-last lg:order-first justify-center items-center gap-6 md:gap-8 lg:gap-[41px] lg:pl-[110px]">
					<p>
						{t('description_1')}
					</p>
					<p>
						{t('description_2')}
					</p>
				</div>
				<Image
					src="/woman.png"
					alt="Service description image"
					width={width}
					height={height}
				/>
			</li>
			<li key="2" className=" flex flex-col lg:flex-row gap-[28px] md:gap-[50px] lg:gap-[134px]">
				<Image
					src="/globe.png"
					alt="Service description image"
					width={width}
					height={height}
					className="md:self-end"
				/>
				<div className="flex flex-col justify-center items-center gap-6 md:gap-[23px] lg:gap-[68px] lg:pr-[110px]">
					<p>
						{t('description_3')}
					</p>
					<p>
						{t('description_4')}
					</p>
				</div>
			</li>
		</ul>
	);
};

export default ServiceDescriptionList;