import React from 'react';
import Link from 'next/link';
import { SmsStatusEnum } from '@/globaltypes/types';
import formatTableDate from '@/app/utils/formatTableDate';
import { IHistoryResponce } from '@/globaltypes/historyTypes';

type Props = { userHistory: IHistoryResponce[] };

const TableAdminStatistics: React.FC<Props> = ({ userHistory }) => {
	return (
		<table className="w-full border bg-priceTableBg text-center">
			<thead className="bg-lightGreen ">
				<tr className="bg-headerTable text-white text-xl font-roboto leading-[30px] ">
					<th className="md:hidden py-[10px] px-3 border font-roboto text-xl font-normal w-full">Розсилки</th>
					<th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-xl font-normal">Дата</th>
					<th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-xl font-normal">Кіл-ть номерів</th>
					<th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-xl font-normal">
						Кіл-ть відправленних СМС
					</th>
					<th className="hidden md:table-cell py-[10px] px-3 border font-roboto text-xl font-normal">
						Кіл-ть доставленних СМС
					</th>
				</tr>
			</thead>

			<tbody className="text-center text-xl">
				<tr key={"total"} className="block md:hidden border border-zinc-800 md:border-none">
					<td className="block md:table-cell text-left md:text-center py-4 px-3 border font-montserrat text-base md:text-xl font-bold md:font-normal before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
						Всього
					</td>
					<td className="hidden md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
					</td>
					<td data-title="Кіл-ть відправленних СМС :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
						{userHistory?.reduce((acc, item) => acc + item.recipient_status.length, 0)}
					</td>
					<td data-title="Кіл-ть доставленних СМС :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
						{userHistory?.reduce(
							(acc, item) =>
								acc +
								item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield')
									.length,
							0
						)}
					</td>
				</tr>
				{userHistory.map((elem: IHistoryResponce, index: number) => (
					<tr className="block md:table-row border border-zinc-800  border-t-transparent md:border-none" key={index}>
						<td data-title="Дата :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
							<Link
								className="text-[#2366E8]"
								href={{
									pathname: `general-statistics/${formatTableDate(elem.sending_group_date)}/`,
								}}
							>
								{formatTableDate(elem.sending_group_date)}
							</Link>
						</td>
						<td data-title="Кіл-ть номерів :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
							{Array.from(new Set(elem.clients)).length}
						</td>
						<td data-title="Кіл-ть відправленних СМС :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
							{elem.recipient_status.length}
						</td>
						<td data-title="Кіл-ть доставленних СМС :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
							{elem.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield').length}
						</td>
					</tr>
				))}
				<tr key={"total"} className="hidden md:table-row border">
					<td className="block md:table-cell text-left md:text-center py-4 px-3 border font-montserrat text-base md:text-xl font-bold md:font-normal before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
						Всього
					</td>
					<td className="hidden md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
					</td>
					<td data-title="Кіл-ть відправленних СМС :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
						{userHistory?.reduce((acc, item) => acc + item.recipient_status.length, 0)}
					</td>
					<td data-title="Кіл-ть доставленних СМС :" className="block md:table-cell text-right md:text-center py-4 px-3 border font-montserrat text-base md:text-xl before:content-[attr(data-title)] before:float-left md:before:content-none before:font-bold">
						{userHistory?.reduce(
							(acc, item) =>
								acc +
								item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield')
									.length,
							0
						)}
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default TableAdminStatistics;
