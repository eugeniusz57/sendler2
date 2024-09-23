'use client';
import DetailBtn from '@/components/buttons/Details';
import ManageContactBtn from '@/components/buttons/ManageContactBtn';
import SearchUserForm from '@/components/forms/SearchUserForm';
import { combinedAlfaNameAndUser } from '@/globaltypes/types';
import { CombinedAlfaNamesAndUser } from '@/helpers/AlfaName';
import { useEffect, useState } from 'react';

const Admin: React.FC = () => {
	const [allUsersAlfaNames, setallUsersAlfaNames] = useState<combinedAlfaNameAndUser[]>([]);
	const [filter, setFilter] = useState<string>('');
	const [filterallUsersAlfaNames, setFilterAllUsersAlfaNames] = useState<combinedAlfaNameAndUser[]>(
		allUsersAlfaNames ? allUsersAlfaNames : []
	);

	const [isLoading, setIsLoading] = useState(false);
	const getFilter = (e: any) => {
		setFilter(e.target.value);
	};

	const filterAllUsersLogin = (users: combinedAlfaNameAndUser[], login: string) => {
		const filtered = users.filter(user =>
			user.user_login.toLowerCase().includes(login.toLowerCase())
		);
		setFilterAllUsersAlfaNames(filtered);
	};

	const sortAllUsersAlfaNames = (
		filter.length === 0 ? allUsersAlfaNames : filterallUsersAlfaNames
	).sort((a, b) => {
		return a.user_active === b.user_active ? 0 : a.user_active ? -1 : 1;
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const res = await CombinedAlfaNamesAndUser();
				const alfaNames = res.mappedUsers;
				setallUsersAlfaNames(alfaNames);
				setIsLoading(false);
			} catch (error) {
				console.error('Error while fetching users:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		filterAllUsersLogin(allUsersAlfaNames, filter);
	}, [filter, allUsersAlfaNames]);

	return (
		<div className="flex flex-col items-center justify-center">
			<SearchUserForm getFilter={getFilter} />
			<table className="mt-10 w-full border bg-priceTableBg text-center">
				<thead className="hidden md:table-header-group align-middle border-inherit">
					<tr className="bg-headerTable text-white text-sm lg:text-xl font-roboto lg:leading-[30px]">
						<th className="w-1/8 border px-4 py-3 font-normal">ID клієнта</th>
						<th className="w-1/4 border px-4 py-3 font-normal">Альфа ім&apos;я</th>
						<th className="w-1/4 border px-4 py-3 font-normal">Логін</th>
						<th className="w-1/8 border px-4 py-3 font-normal">Баланс</th>
						<th className="w-1/4 border px-4 py-3 font-normal">Управляти</th>
						<th className="w-full border px-4 py-3 font-normal">Додаткова інформація</th>
					</tr>
				</thead>
				{!isLoading && (
					<tbody className="text-center">
						{sortAllUsersAlfaNames.length !== 0 ? (
							sortAllUsersAlfaNames.map(elem => (
								<tr
									className={`block md:table-row text-center border border-zinc-800 border-b-transparent md:border-none ${elem.user_active ? '' : ' bg-gray-500'} `}
									key={elem.user_id}
								>
									<td data-title="ID :" className="block md:table-cell text-right md:text-center  py-4 px-3 border font-montserrat text-base lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.user_id}</td>
									<td className="hidden md:table-cell py-4 px-3 border font-montserrat text-base lg:text-xl">
										{elem?.alfa_name?.join(', ')}
									</td>
									<td data-title="Логін :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.user_login}</td>
									<td data-title="Баланс :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base lg:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.balance}</td>
									<td className="flex items-center justify-between  md:table-cell py-4 px-3 border font-montserrat text-base lg:text-xl ">
										<ManageContactBtn id={elem.user_id}>Manage </ManageContactBtn>{' '}
										<DetailBtn id={elem.user_id}>Detail </DetailBtn>
									</td>
									<td className=" hidden md:table-cell py-4 px-3 border font-montserrat text-sm ">{elem.description}</td>
								</tr>
							))
						) : (
							<tr className="text-center">
								<td colSpan={6} className="py-4 px-3 border font-montserrat text-m lg:text-xl">
									Не має жодного логіна з таким ім'ям
								</td>
							</tr>
						)}
					</tbody>
				)}
			</table>
		</div>
	);
};

export default Admin;
