import { useCallback, useEffect, useRef, useState } from "react"; import Image from 'next/image';
import RSC from "react-scrollbars-custom";

type Props = {
	selectOptions?: string[];
	selectedOption: string | undefined;
	getSelect: (item: string | undefined) => void;
	openSelect: (isOpen: boolean) => void;
	widthValue?: number;
	startValue?: string;
	isModal?: boolean;
}

const SelectTime = ({ selectOptions,
	selectedOption,
	getSelect,
	openSelect,
	widthValue,
	startValue,
	isModal }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const selectBodyRef = useRef<HTMLDivElement | null>(null);
	let key = 0;

	const onClose = () => {
		setIsOpen(!isOpen);
	};

	const memoizedClose = useCallback(onClose, [isOpen])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			//close select if it is opened
			if (e.key === 'Escape' && selectBodyRef?.current) {
				openSelect(true);
				memoizedClose();
			};
			// close modal
			if (e.key === 'Escape' && !selectBodyRef?.current) {
				openSelect(false);
			};
		};

		// close select if click outside of select
		const handleClickCloseInput = (e: any) => {
			if (selectBodyRef?.current && !selectBodyRef?.current?.contains(e.target as Node)) {
				memoizedClose();
				if (startValue === '00') {
					getSelect('00');
				} else {
					getSelect('');
				};
			};
		};

		// control click or keydown for close select
		if (isModal) {
			// if select is inside modal
			document.body.addEventListener('keydown', handleKeyDown);
			document.body.addEventListener('click', handleClickCloseInput);
		}
		else {
			// if select is outside modal
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('click', handleClickCloseInput);
		}

		return () => {
			if (isModal) {
				// if select is inside modal
				document.body.removeEventListener('keydown', handleKeyDown);
				document.body.removeEventListener('click', handleClickCloseInput);
			}
			else {
				// if select is outside modal
				document.removeEventListener('keydown', handleKeyDown);
				document.removeEventListener('click', handleClickCloseInput);
			}
		};

	}, [memoizedClose, getSelect, startValue, isModal, openSelect, isOpen]);

	return (
		<div onClick={onClose} className={`select-wrap relative ${widthValue ? ` w-[${widthValue}px]` : `w-full`} ${isOpen ? `rounded-t-[18px]` : `border-[#E6E6E6] rounded-[18px]`}`}>
			<div className='select'>
				<div className='absolute top-1/2 -translate-y-1/2  md:left-7 left-4 font-montserrat font-normal text-lg leading-6'>
					{isOpen && !selectedOption ? startValue : selectedOption}</div>
				{isOpen ?
					<>
						<Image
							src="/svg/arrow-up.svg"
							alt="Arrov up icon"
							width={32}
							height={32}
							className="hidden md:block absolute top-1/2 -translate-y-1/2 md:right-7 right-2 ml-auto cursor-pointer"
						/>
						<Image
							src="/svg/arrow-up.svg"
							alt="Arrov up icon"
							width={24}
							height={24}
							className="md:hidden absolute top-1/2 -translate-y-1/2 md:right-7 right-2 ml-auto cursor-pointer"
						/>
					</>
					:
					<>
						<Image
							src="/svg/arrow-down.svg"
							alt="Arrov down icon"
							width={32}
							height={32}
							className="hidden md:block absolute top-1/2 -translate-y-1/2 md:right-7 right-2 ml-auto cursor-pointer"
						/>
						<Image
							src="/svg/arrow-down.svg"
							alt="Arrov down icon"
							width={24}
							height={24}
							className="md:hidden absolute top-1/2 -translate-y-1/2 md:right-7 right-2 ml-auto cursor-pointer"
						/>
					</>}
			</div>

			{isOpen && <div className={`${widthValue ? ` w-[${widthValue}px]` : `w-full`} absolute overflow-auto h-60 -ml-[1px] -mt-[2px] bg-white rounded-b-[18px] border-[1px] border-[#E6E6E6] border-t-0`} ref={selectBodyRef}>
				<RSC>
					{selectOptions?.map((selectOption) => (
						<div key={key++} onClick={() => getSelect(selectOption)} className="select-item">{selectOption}</div>
					))}
				</RSC>
			</div >
				// : null
			}
		</div>
	)
}
export default SelectTime;