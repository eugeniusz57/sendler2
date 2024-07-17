import DeleteGroupBtn from "./buttons/DeleteGroupBtn";
import EditGroupBtn from "./buttons/EditGroupBtn";
import ImportGroupBtn from "./buttons/ImportGroupBTN";
import ExportGroupBtn from "./buttons/ExportGroupBtn";
import { IGroupDatabase } from "@/globaltypes/types";

interface Props {
	group: IGroupDatabase;
	getGroups: () => void,
}

const Group = ({ group, getGroups }: Props) => {
	return (
		<li className="block lg:flex w-full gap-x-6 lg:gap-x-2 px-[26px] items-center lg:h-[48px] text-base font-montserrat font-normal border-b border-rowUnderLine">
			<div data-title='Група' className="w-full md:w-3/5 lg:w-1/6 max-h-6 lg:mt-0 mt-[22px] lg:mb-0 mb-[22px] lg:text-left text-center overflow-hidden before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">
				<div className="w-full text-left">{group.group_name}</div>
			</div>
			<div data-title='Оновлення' className="w-full md:w-3/5 lg:w-1/4 lg:mb-0 mb-[22px] lg:text-left text-center before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">
				<div className="w-full text-left">{group.group_create_date}</div>
			</div>
			<div data-title='Кількість' className="w-full md:w-3/5 lg:w-[12%] lg:mb-0 mb-[22px] lg:text-left text-center before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold before:w-2/5 before:text-left">
				<div className="w-full text-left">{group.number_members}</div>
			</div>
			<div className="lg:mb-0 mb-[14px] text-left before:content-[attr(data-title)] before:float-left lg:before:content-none before:font-bold">
				<div className="flex gap-[15px] md:flex-nowrap flex-wrap items-center md:justify-start justify-center">
					<EditGroupBtn id={group.group_id} >Редагувати</EditGroupBtn>
					<DeleteGroupBtn id={group.group_id} getGroups={getGroups}>Видалити</DeleteGroupBtn>
					<ImportGroupBtn id={group.group_id}>Імпорт</ImportGroupBtn>
					<ExportGroupBtn id={group.group_id} group={group}>Експорт</ExportGroupBtn>
				</div>
			</div>
		</li>
	)
}

export default Group
