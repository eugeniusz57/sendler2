import { isKyr } from '@/helpers/isKyr';

export const charAndSmsCount: (content: string) => {
	charQuantity: number;
	smsQuantity: number;
} = (content: string) => {
	const characterArray = content.split('');
	let doubleCharCount = 0;
	characterArray.forEach(character => {
		if (character === '~' || character === '^' || character === '[' || character === ']' || character === '{' || character === '}' || character === '|' || character === '\\') {
			doubleCharCount = doubleCharCount + 1;
		}
	});
	const charQuantity: number = content.length + doubleCharCount;
	let smsQuantity = 0;
	if (isKyr(content)) {
		smsQuantity = Math.floor(charQuantity / 70) + 1;
	} else {
		smsQuantity = Math.floor(charQuantity / 160) + 1;
	}
	return {
		charQuantity,
		smsQuantity
	}
};