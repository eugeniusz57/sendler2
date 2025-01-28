export default function getKyivTime(): string {
	// Создаем объект Date
	const date: Date = new Date();

	// Настраиваем форматировщик с учетом Киева
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("uk-UA", {
		timeZone: "Europe/Kiev",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false // 24-часовой формат
	});

	// Разбиваем дату на части
	const parts: Intl.DateTimeFormatPart[] = formatter.formatToParts(date);

	// Вспомогательная функция для поиска нужной части даты
	function getPart(type: string): string {
		const part = parts.find(p => p.type === type);
		return part?.value ?? "00"; // Если не найдено, возвращаем "00"
	}

	// Собираем строку в формате "YY-MM-DD HH:MM:SS"
	return `${getPart("year")}-${getPart("month")}-${getPart("day")} ${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;
}