import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import RSC from 'react-scrollbars-custom';

type Props = {
	selectOptions?: string[];
	selectedOption: string;
	getSelect: (item: string) => void;
	openSelect: (isOpen: boolean) => void;
	widthValue?: number;
	startValue?: string;
	defaultValue?: string;
};

const Select: React.FC<Props> = ({
	selectOptions,
	selectedOption,
	getSelect,
	openSelect,
	widthValue,
	startValue,
	defaultValue,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const selectBodyRef = useRef<HTMLDivElement | null>(null);
	let key = 0;

	const onClose = () => {
		setIsOpen(!isOpen);
		openSelect(!isOpen);
	};

	const memoizedClose = useCallback(onClose, [isOpen, openSelect]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			//close select if it is opened
			if (e.key === 'Escape' && selectBodyRef?.current) {
				memoizedClose();
			};
		};

		// close select if click outside of select
		function handleClickCloseInput(e: MouseEvent): void {
			if (selectBodyRef?.current && !selectBodyRef?.current?.contains(e.target as Node)) {
				memoizedClose();
				if (startValue === '00') {
					getSelect('00');
				} else {
					getSelect('');
				}
			}
		};

		// control click or keydown for close select
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('click', handleClickCloseInput);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('click', handleClickCloseInput);
		};
	}, [memoizedClose, getSelect, startValue]);

	return (
		<div
			onClick={onClose}
			className={`select-wrap ${widthValue ? ` w-[${widthValue}px]` : `w-full`}`}
		>
			<div className={`select bg-white dark:bg-darkInput ${isOpen ? ` rounded-t-[18px] border-[1px] dark:border-none` : `border-[#E6E6E6] border-[1px] rounded-[18px] dark:border-none`}`}>
				<div className="absolute top-1/2 -translate-y-1/2 left-7 font-montserrat font-normal text-base md:text-base sm:text-sm leading-6">
					{!isOpen && !selectedOption && <div>{defaultValue}</div>}
					{isOpen && !selectedOption ? defaultValue : selectedOption}
				</div>
				{isOpen ? (
					<Image
						src="/svg/arrow-up.svg"
						alt="Arrov up icon"
						width={32}
						height={32}
						className="absolute top-1/2 -translate-y-1/2 right-7 ml-auto cursor-pointer dark:invert"
					/>
				) : (
					<Image
						src="/svg/arrow-down.svg"
						alt="Arrov down icon"
						width={32}
						height={32}
						className="absolute top-1/2 -translate-y-1/2 right-7 ml-auto cursor-pointer dark:invert"
					/>
				)}
			</div>
			{isOpen && (
				<div
					className={`w-[${widthValue}px] overflow-auto h-32 sm:h-28 -mt-[2px] bg-white dark:bg-darkInput rounded-b-[18px] border-[1px] border-[#E6E6E6] border-t-0 dark:border-none`}
					ref={selectBodyRef}
				>
					<RSC>
						{selectOptions?.map(selectOption => (
							<div key={key++} onClick={() => getSelect(selectOption)} className="select-item truncate">
								{selectOption}
							</div>
						))}
					</RSC>
				</div>
			)}
		</div>
	);
};
export default Select;

