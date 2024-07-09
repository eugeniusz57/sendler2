'use client';

import { useState, useCallback, useEffect } from 'react';

import Title from '@/components/Title';
import ClientsList from '@/components/ClientsList';
import SearchClientForm from '@/components/forms/SearchClientForm';
import { getUserClients } from '@/fetch-actions/clientsFetchActions';
import { IClientDatabase } from '@/globaltypes/types';

const LIMIT = 10;

export default function AllContactsUserPage({ params }: { params: { id: string, userId: string } }) {

	const [filter, setFilter] = useState<string>('');
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);

	const userId = Number(params.userId);

	// update page if list of clients or client in database are updated
	const getUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	// update list of clients if filter is changed
	const getFilter = (e: any) => {
		setFilter(e.target.value);
	};

	// update list of clients if filter is cleaned
	const resetFilter = () => {
		setFilter('');
	};

	//get data from database
	const updateData = async () => {
		const res = await getUserClients(userId, filter, LIMIT, 0);
		if (res) {
			setClients(res);
		}
	};

	const memoizedupdateData = useCallback(updateData, [filter, userId]);
	useEffect(() => {
		memoizedupdateData();
	}, [memoizedupdateData, isUpdated]);

	return (
		<>
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block md:mt-[60px] mt-[28px]">
				<div className="md:mb-[50px] mb-[28px] lg:px-[26px] md:px-[20px] px-[10px]">
					<Title
						type="accent-main_text"
						color="dark">
						Всі контакти
					</Title>
				</div>
				<p className="lg:w-[724px] md:mb-[50px] mb-[40px] lg:px-[26px] md:px-[20px] px-[10px] leading-6">
					У данній таблиці представленні всі ваші контакти. Ви можете переглянути детальну
					інформацію, а також редагувати контакт.
				</p>
				<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
				<div className="mt-[60px]">
					<ClientsList
						filter={filter}
						userId={userId}
						updateClients={updateData}
						getUpdate={getUpdate}
						clients={clients}
						isUpdated={isUpdated}
						LIMIT={LIMIT}
					/>
				</div>
			</div>
		</>
	);
}


