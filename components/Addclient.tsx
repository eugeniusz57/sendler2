"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import GreenButton from "./buttons/GreenButton";
import { CreateClientForm } from "./forms/CreateClientForm";
import { useTranslations } from "next-intl";

interface Props {
	groupId?: number;
	updateClients: () => void;
	getUpdate: () => void;
};

const AddClient: React.FC<Props> = ({ groupId, updateClients, getUpdate }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [isSelectOpen, setIsSelectOpen] = useState(false);
	const t = useTranslations('ClientsList');

	const openModal = () => {
		setIsModalOpen(true);
		setIsDisabled(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsDisabled(false);
		document.body.classList.remove('overflow-hidden');
	};

	// control keydown 'Escape' depend on open select in CreateClientForm 
	const openSelect = (isOpen: boolean) => {
		setIsSelectOpen(isOpen);
	};

	return (
		<>
			<GreenButton
				size="big"
				type="button"
				onClick={openModal}
				isDisabled={isDisabled}
			>
				{t('textAddClientButton')}
			</GreenButton>
			<Modal isOpen={isModalOpen} isSelectOpen={isSelectOpen} onClose={closeModal}>
				<CreateClientForm
					onClose={closeModal}
					openSelect={openSelect}
					updateClients={updateClients}
					groupId={groupId}
					getUpdate={getUpdate} title={t('titleAddClientForm')} />
			</Modal>
		</>
	);
};

export default AddClient;