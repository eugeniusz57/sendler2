export function setSliderDisplacement(count: number, width: number) {
	let root = document.documentElement;
	root.style.setProperty('--displacement', -count * width + 'px');
};