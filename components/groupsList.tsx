'use client';

import RSC from "react-scrollbars-custom";

import { IGroupDatabase } from "@/globaltypes/types";
import Group from "./Group";
import LoadMoreGroups from "./LoadMoreGroups";

type Props = {
	userId: number;
	groups?: IGroupDatabase[];
	getGroups: () => void,
	getUpdate: () => void;
	LIMIT: number;
	isUpdated: boolean;
}

export default function GroupsList({ groups, getGroups, getUpdate, userId, isUpdated, LIMIT }: Props) {

	return (
		<>
			<div>
				<div className="hidden lg:flex gap-x-0 xl:gap-x-2 w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white font-roboto font-normal bg-headerTable">
					<p className='w-1/6'>Група</p>
					<p className='w-1/4'>Оновлення</p>
					<p className="w-[12%]">Кількість</p>
					<p></p>
				</div>
				<p className="lg:hidden block w-full md:pt-[18px] pt-2 md:pb-[13px] pb-2 md:text-lg text-white text-base text-center font-normal bg-headerTable">Групи</p>
				<ul className='h-[520px] md:h-[432px] overflow-auto'>
					{groups?.length ? (
						<RSC style={{ height: "100%" }}>
							{groups?.map((group: IGroupDatabase) => (
								<Group
									key={group.group_id}
									group={group}
									getGroups={getGroups}
								/>
							))}
							<LoadMoreGroups
								userId={userId}
								isUpdated={isUpdated}
								getUpdate={getUpdate}
								LIMIT={LIMIT}
								getGroups={getGroups}
							/>
						</RSC>
					) : (
						<>
							<div className="flex  px-[26px] items-center h-[48px]  text-base font-montserrat font-normal border-b border-rowUnderLine">
								<span>1</span>
							</div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
							<div className="h-[48px] border-b border-rowUnderLine"></div>
						</>)}
				</ul>
			</div>
		</>
	)
}


