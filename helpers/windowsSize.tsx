import { useState, useEffect, useLayoutEffect } from 'react';

const useWindowWidth = (): number | undefined => {
	const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

	useLayoutEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);

			handleResize();

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);

	return windowWidth;
};

export default useWindowWidth;
