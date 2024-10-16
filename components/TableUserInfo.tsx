import { IUser } from '@/globaltypes/types';

import React from 'react';

interface TableUserInfoProps {
	user: IUser;
	handleDelete: (userId: number) => void;
};

const TableUserInfo: React.FC<TableUserInfoProps> = ({ user, handleDelete }) => {
	const userCreateDate = user.user_create_date;
	const date = new Date(userCreateDate);
	const formattedDate = date.toISOString().split('T')[0];

	return (
		<table className="table-auto w-full md:w-1/2 border bg-priceTableBg  md:mr-5 mb-8 md:mb-0 ">
			<caption className="text-lg md:text-2xl mb-2">Персональна інформація про користувача</caption>
			<tbody className=" text-center text-base md:text-xl font-roboto  leading-[30px] rounded-[18px] ">
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border">ID</td>
					<td className="border px-4 py-2">{user.user_id}</td>
				</tr>
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border">
						Ім&apos;я
					</td>
					<td className="border px-4 py-2">{user.user_name}</td>
				</tr>
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border">Логін</td>
					<td className="border px-4 py-2">{user.user_login}</td>
				</tr>
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border">Телефон</td>
					<td className="border px-4 py-2">{user.tel}</td>
				</tr>
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border">Email</td>
					<td className="border px-4 py-2">{user.email}</td>
				</tr>
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border">Баланс</td>
					<td className="border px-4 py-2">{user.balance} SMS</td>
				</tr>
				<tr>
					<td className="bg-headerTable text-white  font-roboto  leading-[30px] border px-1">
						Дата реєстрації
					</td>
					<td className="border px-4 py-2">{formattedDate}</td>
				</tr>
				<tr>
					<td colSpan={2} className="px-4 py-6">
						<button
							className={` row-table__btn_delete px-2`}
							onClick={async () => await handleDelete(user.user_id)}
						>
							{user.user_active ? `Деактивувати ` : 'Активувати '} {user.user_name}
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default TableUserInfo;
