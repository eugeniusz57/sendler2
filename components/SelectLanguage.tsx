import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';

type Props = {
	selectOptions?: readonly ["ua", "en"];
	selectedOption: string;
	openSelect: (isOpen: boolean) => void;
	startValue?: string;
	defaultValue: string;
};

const SelectLanguage: React.FC<Props> = ({
	selectOptions,
	selectedOption,
	openSelect,
	startValue,
	defaultValue
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const selectBodyRef = useRef<HTMLDivElement | null>(null);
	let key = 0;
	const pathName: string = usePathname();

	const deleteLocaleFromPathName = (path: string) => {
		const segments = path.split('/');
		segments.splice(1, 1);
		if (segments.length === 1 && segments[0] === '') {
			path = segments[0] + '/';
			return path;
		}
		path = segments.join('/');
		return path;
	};

	deleteLocaleFromPathName(pathName)

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
			}
		};

		// control click or keydown for close select
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('click', handleClickCloseInput);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('click', handleClickCloseInput);
		};
	}, [memoizedClose, startValue]);

	return (
		<div
			onClick={onClose}
			className='w-full pt-[5px] lg:pt-[3px] text-lg relative'
		>
			<div className='absolute w-full top-1/2 -translate-y-1/2 flex items-start'>
				{!isOpen && !selectedOption && <div>{defaultValue.toUpperCase()}</div>}
				{isOpen && !selectedOption ? <div>{defaultValue.toUpperCase()}</div> : <div>{selectedOption.toUpperCase()}</div>}
				{!isOpen ?
					<Image
						src="/svg/arrowPath-down.svg"
						alt="Arrov down icon"
						width={18}
						height={18}
						className="absolute top-1/2 -translate-y-1/2 right-4 ml-auto cursor-pointer"
					/> :
					<Image
						src="/svg/arrowPath-down.svg"
						alt="Arrov down icon"
						width={18}
						height={18}
						className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-4 ml-auto cursor-pointer origin-center rotate-180"
					/>
				}
			</div>
			{isOpen && (
				<div
					className={`absolute top-1/2 lg:top-2 -translate-y-1/2 lg:translate-y-0 right-0 lg:right-4 lg:h-18 px-1 lg:px-0 overflow-auto border-[1px] border-[#E6E6E6]  rounded-[4px] lg:border-none`}
					ref={selectBodyRef}
				>
					{selectOptions?.map(selectOption => (
						<div key={key++} className='text-right leading-6 hover:opacity-70'>
							<Link href={deleteLocaleFromPathName(pathName)} locale={selectOption}>
								{selectOption.toUpperCase()}
							</Link>
						</div>
					))}

				</div>
			)
			}
		</div >
	);
};
export default SelectLanguage;

