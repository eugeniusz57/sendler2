'use client';
import { defineSum } from '@/helpers/DefinSum';
import { EnterOnlyFigures } from '@/helpers/EnterOnlyFigures';
import { useState } from 'react';
import Modal from './Modal/Modal';
import AccountInPdf from './AccountInPdf';
import { useTranslations } from 'next-intl';

const CreateAccount: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>('');
	const t = useTranslations('UserAccountPage');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const summ = defineSum(Number(inputValue));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};
	return (
		<div className="flex flex-col lg:flex-row gap-y-6 md:gap-y-10 lg:gap-y-0 items-start lg:items-center mb-8 md:mb-[74px]">
			<div className="relative flex flex-col md:flex-row gap-y-10 md:gap-y-0 items-start md:items-center mr-8">
				<div className="relative">
					<input
						className="input w-[196px] h-12 mr-4 px-4"
						onKeyDown={EnterOnlyFigures}
						value={inputValue}
						onChange={handleInputChange}
						maxLength={12}
					/>
					<p className="absolute -bottom-6 left-0 text-xs font-montserrat font-normal mr-56">
						{t('footnoteInputAccountTopUp')}
					</p>
				</div>
				<div className="relative">
					<p className="text-lg font-montserrat font-normal">{t('sum')} {summ} {t('currency')}</p>
				</div>
			</div>
			<button
				onClick={openModal}
				disabled={!inputValue}
				className={`block md:mt-2 lg:mt-0 text-emailColorLink  ${inputValue ? 'opacity-100 cursor-pointer hover:opacity-80 focus:opacity-80' : 'opacity-50'
					}  `}
			>
				{t('textCreateAccountButton')}
			</button>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<AccountInPdf summ={summ} />
			</Modal>
		</div>
	);
};

export default CreateAccount;
