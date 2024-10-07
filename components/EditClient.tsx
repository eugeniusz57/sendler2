"use client";

import React, { useState } from "react";

import Modal from "./Modal/Modal";
import { CreateClientForm } from "./forms/CreateClientForm";
import { IClientDatabase } from "@/globaltypes/types";
import { useTranslations } from "next-intl";

interface Props {
	groupId?: number;
	client?: IClientDatabase;
	updateClients: () => void;
	getUpdate: () => void;
};

const EditClient: React.FC<Props> = ({ groupId,
	client,
	updateClients,
	getUpdate }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const t = useTranslations('ClientsList');

	const openModal = () => {
		setIsModalOpen(true);
		document.body.classList.add('overflow-hidden');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove('overflow-hidden');
	};

	// control keydown 'Escape' depend on open select in CreateClientForm 
	const openSelect = (isOpen: boolean) => {
		setIsSelectOpen(isOpen);
	};

	return (
		<>
			<button type="button" onClick={openModal} className="row-table__btn">{t('textEditClientButton')}</button>
			<Modal isOpen={isModalOpen} isSelectOpen={isSelectOpen} onClose={closeModal}>
				{groupId ?
					<CreateClientForm
						onClose={closeModal}
						openSelect={openSelect}
						groupId={groupId}
						currentClient={client}
						updateClients={updateClients}
						getUpdate={getUpdate}
						title='Редагування контакту'
					/> :
					<CreateClientForm
						onClose={closeModal}
						openSelect={openSelect}
						updateClients={updateClients}
						currentClient={client}
						getUpdate={getUpdate}
						title='Редагування контакту' />}
			</Modal>
		</>
	);
};

export default EditClient;