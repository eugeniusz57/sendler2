'use client';

import BackBtn from '@/components/buttons/BackBtn';
import { combinedAlfaNameAndUser } from '@/globaltypes/types';

import { ActiveAlfaName, CombinedAlfaNamesAndUser, DeleteAlfaName } from '@/fetch-actions/AlfaName';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const SenderNameApproved: React.FC = () => {
	const [isUpdated, setisUpdated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [OnlyNotActiveAlfaNames, setOnlyNotActiveAlfaNames] = useState<combinedAlfaNameAndUser[]>(
		[]
	);
	const t = useTranslations('SenderNameApprovedPage');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const users = await CombinedAlfaNamesAndUser();
				setOnlyNotActiveAlfaNames(users.OnlyNotActiveAlfaNames);
				setIsLoading(false);
			} catch (error) {
				console.error('Error while fetching users:', error);
			}
		};

		fetchData();
	}, [isUpdated]);

	const handleDelete = async (id: number) => {
		await DeleteAlfaName(id);
		setisUpdated(prevIsUpdate => !prevIsUpdate);
	};

	const handleActivateAlfaName = async (id: number) => {
		await ActiveAlfaName(id);
		setisUpdated(prevIsUpdate => !prevIsUpdate);
	};

	return (
		<>
			<BackBtn />
			<table className="mt-10 w-full border bg-priceTableBg dark:bg-darkItems ">
				<thead className='hidden md:table-header-group'>
					<tr className="bg-headerTable text-white text-xl font-roboto  leading-[30px] ">
						<th className="border px-4 py-3 font-normal">{t('nameCol_1_Table')}</th>
						<th className=" border px-4 py-3 font-normal">{t('nameCol_2_Table')}</th>
						<th className="hidden lg:table-cell border px-4 py-3 font-normal">{t('nameCol_3_Table')}</th>
						<th className="hidden lg:table-cell border px-4 py-3 font-normal">{t('nameCol_4_Table')}</th>
						<th className=" border px-4 py-3 font-normal">{t('nameCol_5_Table')}</th>
						<th className=" border px-4 py-3 font-normal">{t('nameCol_6_Table')}</th>
					</tr>
				</thead>
				{!isLoading && <tbody className='block md:table-header-group '>
					{OnlyNotActiveAlfaNames.length === 0 ? (
						<tr className="text-center">
							<td colSpan={6} className="py-4 px-3 border font-montserrat text-xl">
								{t('description_1')}
							</td>
						</tr>
					) : (
						OnlyNotActiveAlfaNames.map(elem => (
							<tr className=" block md:table-row text-center border border-zinc-800  md:border-none ${elem.user_active ? '' : ' bg-gray-500'} " key={elem.alfa_name_id}>
								<td data-title={`${t('nameCol_1_Table')} :`} className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.user_login}</td>
								<td data-title={`${t('nameCol_2_Table')} :`} className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.alfa_name}</td>
								<td className="hidden lg:table-cell py-4 px-3 border font-montserrat text-xl">{elem.email}</td>
								<td className="hidden lg:table-cell py-4 px-3 border font-montserrat text-xl">{elem.tel}</td>
								<td className="block md:table-cell  py-4 px-3 border font-montserrat text-xl">
									<button
										className={`row-table__btn px-2 ${isLoading ? 'text-slate-400 hover:bg-slate-500' : ''
											}`}
										onClick={async () => {
											await handleActivateAlfaName(elem?.alfa_name_id);
										}}
										disabled={isLoading}
									>
										{t('button_1_text')}
									</button>
								</td>
								<td className="block md:table-cell  py-4 px-3 border font-montserrat text-xl">
									<button
										className={`row-table__btn px-2 ${isLoading ? 'text-slate-400 hover:bg-slate-500' : ''
											}`}
										onClick={async () => await handleDelete(elem?.alfa_name_id)}
										disabled={isLoading}
									>
										{t('button_2_text')}
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>}
			</table>
		</>
	);
};

export default SenderNameApproved;
