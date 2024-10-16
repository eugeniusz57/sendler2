"use client";

import { useState, useCallback, useEffect, } from "react";
import { useRouter } from "next/navigation";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";
import { getGroupClientsAndGroupName } from "@/fetch-actions/clientsFetchActions";
import { IGroupId, IUserId, IClientDatabase } from "@/globaltypes/types";
import EmailColorLinkBtn from "@/components/buttons/EmailColorLinkBtn";
import { useLocale, useTranslations } from "next-intl";

const LIMIT = 5;

interface Props {
	params: {
		id: IGroupId,
		userId: IUserId,
	};
};

const EditGroupPage: React.FC<Props> = ({ params }) => {
	const [groupName, setGroupName] = useState<string>('');
	const [filter, setFilter] = useState<string>('');
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);
	const [locale, setLocale] = useState(useLocale());
	const router = useRouter();
	const groupId = Number(params.id);
	const userId = Number(params.userId);
	const t = useTranslations('EditPage');

	//the function returns to the previos page
	const handleClick = async () => {
		try {
			router.push(`/${locale}/user/${params.userId}/groups`);
		} catch (error: any) {
			console.log(error.message);
			router.push("/");
		}
	};

	// update page if list of clients or client in database are updated
	const getUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	// update list of clients if filter is changed
	const getFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	// update list of clients if filter is cleaned
	const resetFilter = () => {
		setFilter('');
	};

	//get data from database
	const updateData = async () => {
		const res = await getGroupClientsAndGroupName(groupId, filter, LIMIT, 0);
		if (res) {
			const { clients, groupName } = res;
			setClients(clients);
			setGroupName(groupName);
		}
	};

	const memoizedupdateData = useCallback(updateData, [filter, groupId]);

	useEffect(() => {
		memoizedupdateData();
	}, [memoizedupdateData, isUpdated]);

	return (
		<>
			<Title type="h1" color="dark">
				{t('pageTitle')}
			</Title>
			<div className="content-block md:mt-[60px] mt-[28px]">
				<div className='md:mb-[50px] mb-[40px] lg:px-[26px] md:px-[20px] px-[10px]'>
					<div className=" md:mb-[50px] mb-[28px]">
						<div className="flex items-center gap-2 md:gap-4]">
							<Title
								type="title_block"
								color="dark">
								{t('titlePageBox')}
							</Title>
							<span className="text-headerTable title_block overflow-hidden truncate">
								{groupName}
							</span>
						</div>
						<EmailColorLinkBtn isDisabled={false} onClick={handleClick}>{t('textTurnBackButton')}</EmailColorLinkBtn>
					</div>
					<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
				</div>
				<div>
					<ClientsList
						groupId={groupId}
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
};

export default EditGroupPage;
