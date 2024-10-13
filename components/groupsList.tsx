'use client';

import RSC from "react-scrollbars-custom";
import { useTranslations } from "next-intl";

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
};

const GroupsList: React.FC<Props> = ({ groups, getGroups, userId, isUpdated, LIMIT }) => {
	const t = useTranslations('GroupsPage');
	return (
		<>
			<div>
				<div className="hidden lg:flex gap-x-0 xl:gap-x-2 w-full px-[26px] pt-[18px] pb-[13px] text-xl text-white dark:text-textColorDarkTheme font-roboto font-normal bg-headerTable dark:bg-tableCptionBG">
					<p className='w-1/6'>{t('nameCol_1GroupsList')}</p>
					<p className='w-1/4'>{t('nameCol_2GroupsList')}</p>
					<p className="w-[12%]">{t('nameCol_3GroupsList')}</p>
					<p></p>
				</div>
				<p className="lg:hidden block w-full md:pt-[18px] pt-2 md:pb-[13px] pb-2 md:text-lg text-white dark:text-textColorDarkTheme text-base text-center font-normal bg-headerTable dark:bg-tableCptionBG">Групи</p>
				<ul className='h-[520px] md:h-[432px] lg:h-[380px] overflow-auto'>
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
	);
};

export default GroupsList;


