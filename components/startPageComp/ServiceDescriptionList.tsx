import Image from "next/image";
import React from "react";

interface Props {
	width: number;
	height: number;
};

const ServiceDescriptionList: React.FC<Props> = ({ width, height }) => {
	return (
		<ul className="flex flex-col gap-[50px] md:gap-[80px] dark:text-textColorDarkTheme text-[#1B1B30] text-sm md:text-base font-montserrat">
			<li key="1" className="flex flex-col lg:flex-row gap-[28px] md:gap-[50px] lg:gap-[134px]">
				<div className="flex flex-col order-last lg:order-first justify-center items-center gap-6 md:gap-8 lg:gap-[41px] lg:pl-[110px]">
					<p>
						Цей метод має особистісний характер, адже за допомогою повідомлень
						ви доставляєте інформацію безпосередньо клієнту.
					</p>
					<p>
						Нині маркетинг розширює свої межі. Якщо раніше для реклами товарів
						та брендів використовувалися в основному телебачення та зовнішня
						реклама, то тепер у підприємців набагато більше можливостей зробити
						свій товар впізнаваним. Простий та доступний спосіб комунікації з
						потенційними клієнтами – SMS-розсилка.
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
						SMS-реклама допоможе зробити ваш бренд упізнаваним. Звичайно, не всі
						клієнти відреагують на перше повідомлення, але швидше за все їх
						зацікавлять наступні.
					</p>
					<p>
						SMS-розсилка допоможе знайти нових клієнтів, і не втратити старих,
						сповіщаючи їх про акції, знижки та нові пропозиції. Покупці будуть
						зацікавлені, і захочуть дізнатися більше інформації про ваші
						продукти, і про те, що ви можете їм запропонувати.
					</p>
				</div>
			</li>
		</ul>
	);
};

export default ServiceDescriptionList;