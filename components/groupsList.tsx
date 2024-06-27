'use client';

import { IGroupDatabase } from "@/globaltypes/types";
import DeleteGroupBtn from "./buttons/DeleteGroupBtn";
import EditGroupBtn from "./buttons/EditGroupBtn";
import ImportGroupBtn from "./buttons/ImportGroupBTN";
import ExportGroupBtn from "./buttons/ExportGroupBtn";

type Props = {
	groups?: IGroupDatabase[];
	getGroups: () => void,
}

export default function GroupsList({ groups, getGroups }: Props) {

	return (
		<>
			<table className="w-full lg:mb-[80px] md:mb-[50px] mb-[28px] border-collapse border-headerTable">
				<thead className="hidden lg:table-header-group">
					<tr className='text-xl text-white font-roboto bg-headerTable'>
						<th className='w-1/6 pl-[26px] pt-[18px] pb-[13px] text-left font-normal bg-headerTable'>Група</th>
						<th className='w-1/4 pt-[18px] pb-[13px] text-left font-normal  bg-headerTable'>Оновлення</th>
						<th className="w-[12%] pt-[18px] pb-[13px] text-left font-normal bg-headerTable">Кількість</th>
						<th className="w-full pt-[18px] pb-[13px] text-left font-normal bg-headerTable"></th>
					</tr>
				</thead>
				<thead className="lg:hidden table-header-group">
					<tr className='text-xl text-white font-roboto bg-headerTable'>
						<th className='md:pt-[18px] pt-2 md:pb-[13px] pb-2 md:text-lg text-base text-center font-normal'>Групи</th>
					</tr>
				</thead>
				<tbody>
					{groups?.length ? groups?.map((group: IGroupDatabase) => (
						<tr key={group.group_id} className="block lg:table-row items-center text-base font-montserrat font-normal border-b border-rowUnderLine">
							<td data-title='Група' className="flex lg:table-cell lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:pl-[26px] md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">
								<div className="w-3/5 text-left">{group.group_name}</div>
							</td>
							<td data-title='Оновлення' className="block lg:table-cell lg:mb-0 mb-[22px] lg:pl-0 md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">
								<div className="flex w-3/5 text-left">{group.group_create_date}</div>
							</td>
							<td data-title='Кількість' className="block lg:table-cell lg:mb-0 mb-[22px] lg:pl-0 md:pl-[20px] pl-[10px] lg:pt-[18px] lg:pb-[13px] lg:text-left text-center before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">
								<div className="w-3/5 text-left">
									{group.number_members}
								</div>
							</td>
							<td className="block lg:table-cell lg:mb-0 mb-[14px] lg:pl-0 md:pl-[20px] lg:pt-[18px] lg:pb-[13px] text-left before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold">
								<div className="flex gap-[15px] md:flex-nowrap flex-wrap items-center md:justify-start justify-center">
									<EditGroupBtn id={group.group_id} >Редагувати</EditGroupBtn>
									<DeleteGroupBtn id={group.group_id} getGroups={getGroups}>Видалити</DeleteGroupBtn>
									<ImportGroupBtn id={group.group_id}>Імпорт</ImportGroupBtn>
									<ExportGroupBtn id={group.group_id} group={group}>Експорт</ExportGroupBtn>
								</div>
							</td>
						</tr>
					)) :
						<>
							<tr className="h-[48px] border-b border-rowUnderLine"></tr>
							<tr className="h-[48px] border-b border-rowUnderLine"></tr>
							<tr className="h-[48px] border-b border-rowUnderLine"></tr>
						</>
					}
				</tbody>
			</table>
		</>
	)
}

