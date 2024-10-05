"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import SelectSendSmsForm from "./forms/SelectSendSmsForm";
import { getSendSmsClients } from "@/fetch-actions/smsFetchActions";

interface Props {
	handleClickSubmit: () => void,
	setDisabledSendBtn: () => boolean,
	isDisabled: boolean,
	recipients: (string | number)[];
	balance: number | undefined;
};

const SendSmsModal: React.FC<Props> = ({
	handleClickSubmit,
	setDisabledSendBtn,
	isDisabled,
	recipients,
	balance }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [clientsQuantity, setClientsQuantity] = useState<number>();
	const t = useTranslations('MailList');


	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};

	const handleClick = async () => {
		const clientsQuatity = await getSendSmsClients(recipients);
		setClientsQuantity(clientsQuatity);
		if (balance && clientsQuatity && balance > clientsQuatity) {
			handleClickSubmit();
		} else {
			openModal();
		};
	};

	return (
		<>
			<GreenButton
				size="big"
				type="button"
				onClick={handleClick}
				isDisabled={setDisabledSendBtn() || isDisabled}
			>
				{t('textSendButton')}
			</GreenButton>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<SelectSendSmsForm
					handleClickSubmit={handleClickSubmit}
					closeModal={closeModal}
					balance={balance}
					clientsQuantity={clientsQuantity}
				/>
			</Modal>
		</>
	);
};

export default SendSmsModal;