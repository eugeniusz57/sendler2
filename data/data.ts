export const publicNavigation = [
	{ id: 1, title: "Головна", path: "/" },
	{ id: 2, title: "Про нас", path: "/about" },
	{ id: 3, title: "Ціни", path: "/prices" },
	{ id: 4, title: "Питання", path: "/questions" },
	{ id: 5, title: "Послуги", path: "/services" },
	{ id: 6, title: "Контакти", path: "#footer" },
];

export const privateNavigation = [
	{ id: 1, title: "Розсилка", path: "/mailing-list" },
	{ id: 2, title: "Управління контактами", path: "/groups" },
	{ id: 3, title: "Статистика", path: "/statistics" },
	{ id: 4, title: "Особистий кабінет", path: "/account" },
];

export const ArrayQuestions = [
	{
		id: 1,
		title: "Кому я можу надсилати повідомлення?",
		desc: " За законом 'Про рекламу' повідомлення можна розсилати абонентам, які дали згоду на їх отримання. Тільки в такому разі масове розсилання SMS-повідомлень не є спамом.",
		email: undefined,
	},
	{
		id: 2,
		title:
			"Чи можу я в тексті повідомлення індивідуально звертатися до абонента?",
		desc: "Так. У текст повідомлення можна встановити будь-яке поле для груп абонентів. Наприклад, ви можете підставити П.І.Б. абонента та два додаткові параметри (якщо такі дані містяться у групі абонентів).",
		email: undefined,
	},
	{
		id: 3,
		title: "Наскільки важко розібратися в інтерфейсі сервісу?",
		desc: "Дуже просто. Від 2 до 15 хвилин в залежності від вашого рівня комп'ютера. У разі труднощів зручні підказки допоможуть розібратися. У разі виникнення дивних та незрозумілих ситуацій просимо звертатися до служби підтримки.",
		email: undefined,
	},
	{
		id: 4,
		title:
			"Чи можу я інтегрувати Bsender.com.ua зі своєю CRM-системою, сайтом, інтернет-магазином?",
		desc: "Так, у сервісу є API, підключитися до сервісу просто за наявності грамотного розробника. У разі питань, пов'язаних з технічною частиною, просимо звертатися до служби підтримки, з питань щодо умов використання та взаєморозрахунків — до комерційної служби ",
		email: "info@bsender.com.ua.",
	},
	{
		id: 5,
		title:
			"До яких країн можна надіслати SMS-повідомлення за допомогою Bsender та яка ціна ?",
		desc: "SMS-повідомлення можна надіслати на всіх GSM-операторів України. Ціна не залежить від оператора. Відправлення в інші країни (країни СНД та весь світ) у загальному порядку ми плануємо організувати у найближчому майбутньому. Зараз можливе індивідуальне відправлення повідомлень країнами СНД та світу, просимо зв'язатися з комерційною службою info@bsender.com.ua.",
		email: "info@bsender.com.ua.",
	},
];

export const AboutMarketing = [
	{
		id: 1,
		title: "Мобільний маркетинг",
		iconPath: "/svg/service-mobile.svg",
		alt: "Mobile marketing",
	},
	{
		id: 2,
		title: "Масові та цільові СМС-Розсилання",
		iconPath: "/svg/service-comment.svg",
		alt: "SMS-Mailing",
	},
	{
		id: 3,
		title: "Короткі СМС-Номери: СМС-Сервіси, акції",
		iconPath: "/svg/service-tags.svg",
		alt: "SMS-Services, promotions",
	},
	{
		id: 4,
		title: "Розробка Інтернет-сайтів (WEB-сайтів)",
		iconPath: "/svg/service-settings.svg",
		alt: "Development of Internet sites",
	},
	{
		id: 5,
		title:
			"Мобільний контент (Відео, рингтони, ігри та інший мультимедійний контент)",
		iconPath: "/svg/service-play-circle.svg",
		alt: "Mobile multimedia content",
	},
	{
		id: 6,
		title: 'Голосові послуги: "гарячі" лінії, IVR-рішення',
		iconPath: "/svg/service-servmobile.svg",
		alt: "Voice services",
	},
];