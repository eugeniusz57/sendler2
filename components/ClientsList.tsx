'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import RSC from "react-scrollbars-custom";

import GreenButton from './buttons/GreenButton';
import AddClient from './Addclient';
import Client from './Client';
import { deleteClients } from '@/fetch-actions/clientsFetchActions';
import { deleteGroupClients } from '@/fetch-actions/clientsFetchActions';
import { IClientDatabase } from '@/globaltypes/types';
import LoadMore from './LoadMore';
import convertClientsBirthdayFormat from '@/helpers/ConvertClientsBirsdayFormat';
import { useTranslations } from 'next-intl';

type Props = {
	groupId?: number | undefined;
	filter: string;
	userId: number;
	clients: IClientDatabase[] | undefined;
	getUpdate: () => void;
	updateClients: () => Promise<void>;
	isUpdated: boolean;
	LIMIT: number;
};

const ClientsList: React.FC<Props> = ({
	groupId,
	filter,
	userId,
	getUpdate,
	updateClients,
	clients,
	isUpdated,
	LIMIT }) => {

	const [isSelected, setIsSelected] = useState(0);
	const { register, handleSubmit, reset } = useForm();
	const [isDisabled, setIsDisabled] = useState(false);
	const convertClients = convertClientsBirthdayFormat(clients);
	const t = useTranslations('ClientsList');

	// variable for control of state of delete button
	const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;
		if (checked) {
			setIsSelected(isSelected + 1);
		} else {
			setIsSelected(isSelected - 1);
		}
	};

	const onSubmit = async (data: any) => {
		setIsDisabled(true);
		// create array of client_id that should be deleted
		const deletedClientsId: number[] = [];
		for (const key in data) {
			if (data[key] === true) {
				deletedClientsId.push(Number(key));
			}
		}

		if (groupId) {
			// delete clients from group
			await deleteGroupClients(groupId, deletedClientsId);
			setIsSelected(0);
			updateClients();
			getUpdate();
		} else {
			// delete clients from list of clients
			await deleteClients(deletedClientsId);
			setIsSelected(0);
			updateClients();
			getUpdate();
		}
		reset();
		setIsDisabled(false);
	};

	return (
		<div>
			<div className="hidden lg:flex gap-x-8 w-full pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable">
				<p className="w-[185px] pl-[66px]">{t('nameCol_1ClientsTable')}</p>
				<p className="lg:w-[190px] xl:w-[346px]">{t('nameCol_2ClientsTable')}</p>
				<p className="lg:w-[180px] xl:w-[180px]">{t('nameCol_3ClientsTable')}</p>
				<p className="w-[135px]">{t('nameCol_4ClientsTable')}</p>
				<p>{t('nameCol_5ClientsTable')}</p>
			</div>
			<p className="lg:hidden block w-full md:pt-[18px] pt-2 md:pb-[13px] pb-2 md:text-lg text-white text-base text-center font-normal bg-headerTable">{t('nameMobileClientsTable')}</p>
			<form onSubmit={handleSubmit(onSubmit)} className='scroll-bar'>
				<ul className='h-[840px] md:h-[520px] lg:h-[380px] overflow-auto'>
					{convertClients?.length ? (
						<RSC style={{ height: "100%" }}>
							{convertClients.map(convertClient => (
								<Client
									key={convertClient.client_id}
									convertClient={convertClient}
									groupId={groupId}
									updateClients={updateClients}
									getUpdate={getUpdate}
									register={register}
									onSelect={onSelect} />
							))}
							<LoadMore
								userId={userId}
								groupId={groupId}
								filter={filter}
								register={register}
								onSelect={onSelect}
								isUpdated={isUpdated}
								LIMIT={LIMIT}
								getUpdate={getUpdate}
							/>
						</RSC>
					) : (
						<>
							<div className="flex  px-[26px] items-center h-[48px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
								<span>1</span>
							</div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
						</>
					)}
				</ul>
				<div className="flex gap-x-4 gap-x-3 lg:mr-[26px] md:mr-[20px] pt-6 md:pt-[50px] justify-center md:justify-end">
					{groupId ?
						<>
							<div className="flex w-[144px] md:w-[198px]">
								<AddClient
									groupId={groupId}
									updateClients={updateClients}
									getUpdate={getUpdate} />
							</div>
							<div className='w-[144px] md:w-[198px]'>
								<GreenButton
									isDisabled={convertClients?.length && isSelected ? false : true || isDisabled} size="big">
									{t('textDeleteClientButton')}
								</GreenButton>
							</div>
						</> :
						<div className='w-full md:w-[198px] px-[10px] md:px-0'>
							<GreenButton
								isDisabled={convertClients?.length && isSelected ? false : true || isDisabled} size="big">
								{t('textDeleteClientButton')}
							</GreenButton>
						</div>
					}
				</div>
			</form>
		</div>
	);
};

export default ClientsList;


