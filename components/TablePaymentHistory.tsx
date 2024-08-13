import { IPaymentHistory } from '@/globaltypes/types';
import { getByIdUserTransactionHistory } from '@/helpers/fetchUserId';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
	userId: number;
};

const TablePaymentHistory: React.FC<Props> = ({ userId }) => {
	const [userTransactionsHistory, setUserTransactionsHistory] = useState<
		IPaymentHistory[] | undefined
	>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getByIdUserTransactionHistory(userId);
				setUserTransactionsHistory(res.userTransactionsHistory);
			} catch (error) {
				console.error('Error while fetching users:', error);
			}
		};

		fetchData();
	}, [userId]);

	return (
		<table className="w-full border bg-priceTableBg text-center mt-4 md:mt-0">
			<caption className="text-xl md:text-2xl text-right mb-2">Історія оплат користувача</caption>
			<thead className='hidden md:table-header-group '>
				<tr className="bg-headerTable text-white text-xl font-roboto leading-[30px]">
					<th className="border px-4 py-3 font-normal">Сума</th>
					<th className="border px-4 py-3 font-normal">SMS</th>
					<th className="border px-4 py-3 font-normal">Дата поповнення</th>
					<th className="hidden lg:table-cell border px-4 py-3 font-normal">Дата оплати</th>
					<th className="hidden lg:table-cell border px-4 py-3 font-normal">Дата зміни</th>
					<th className="border px-4 py-3 font-normal">Додаткова інформація</th>
					<th className="border px-4 py-3 font-normal">Редагувати</th>
				</tr>
			</thead>
			<tbody className=" text-xl text-center ">
				{userTransactionsHistory ? (
					userTransactionsHistory.map(elem => (
						<tr className='block md:table-row text-center' key={elem.transaction_id}>
							<td data-title="Сума :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.money_count}</td>
							<td data-title="SMS :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">{elem.sms_count}</td>
							<td className="hidden md:table-cell py-4 w-1/3 px-3 border font-montserrat text-xl">
								{elem.transactions_date.toString().split('T')[0]}
							</td>
							<td className="hidden lg:table-cell py-4 w-1/3 px-3 border font-montserrat text-xl">
								{elem.paymant_date && elem.paymant_date.toString().split('T')[0]}
							</td>
							<td className=" hidden lg:table-cell py-4 w-1/3 px-3 border font-montserrat text-xl">
								{elem.change_date && elem.change_date.toString().split('T')[0]}
							</td>
							<td className="hidden md:table-cell py-4 w-1/3 px-3 border font-montserrat text-xl">{elem.description}</td>
							<td className=" py-4 w-1/3 px-3 border font-montserrat text-xl ">
								<Link
									href={`${elem.transaction_id}/edit_transaction`}
									className="row-table__btn mr-2 px-2"
								>
									Редагувати
								</Link>
							</td>
						</tr>
					))
				) : (
					<tr className="text-center">
						<td colSpan={7} className="py-4 px-3 border font-montserrat text-xl">
							Користувач не має жодної історії транзакцій
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default TablePaymentHistory;
