"use client";

import React, { useState } from "react";
import { useTranslations } from 'next-intl'

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import { FormFeedback } from "./forms/FormFeedback";

const Feedback: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const t = useTranslations('Footer');

	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};
	return (
		<>
			<p className=" text-base font-medium">{t('feedback')}</p>
			<GreenButton size="normal" onClick={openModal} >{t('feedbackButtonText')}</GreenButton>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<FormFeedback onClose={closeModal} title='Зворотній зв’язок' cross={true} />
			</Modal>
		</>
	);
};

export default Feedback;
