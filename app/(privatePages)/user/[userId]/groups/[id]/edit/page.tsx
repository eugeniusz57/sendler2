"use client";

import { useState, useCallback, useEffect, } from "react";
import { useRouter } from "next/navigation";

import Title from "@/components/Title";
import ClientsList from "@/components/ClientsList";
import SearchClientForm from "@/components/forms/SearchClientForm";
import { getGroupClientsAndGroupName } from "@/fetch-actions/clientsFetchActions";
import { IGroupId, IUserId, IClientDatabase } from "@/globaltypes/types";
import EmailColorLinkBtn from "@/components/buttons/EmailColorLinkBtn";

const LIMIT = 10;

export default function EditGroupPage({ params }: { params: { id: IGroupId, userId: IUserId } }) {

	const [groupName, setGroupName] = useState<string>('');
	const [filter, setFilter] = useState<string>('');
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const [clients, setClients] = useState<IClientDatabase[] | undefined>([]);
	const router = useRouter();

	const groupId = Number(params.id);
	const userId = Number(params.userId);

	const handleClick = async () => {
		try {
			router.back();
		} catch (error: any) {
			console.log(error.message);
			router.push("/");
		}
	}

	// update page if list of clients or client in database are updated
	const getUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	// update list of clients if filter is changed
	const getFilter = (e: any) => {
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
	}, [memoizedupdateData, isUpdated])

	return (
		<>
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block md:mt-[60px] mt-[28px]">
				<div className='md:mb-[50px] mb-[28px] lg:px-[26px] md:px-[20px] px-[10px]'>
					<div className="flex items-center flex-wrap gap-2 md:gap-4">
						<Title
							type="title_block"
							color="dark">
							Редагування групи:
						</Title>
						<span className="text-headerTable title_block overflow-hidden">
							{groupName}
						</span>
					</div>
					<EmailColorLinkBtn isDisabled={false} onClick={handleClick}>Повернутись до списку груп</EmailColorLinkBtn>
				</div>
				<SearchClientForm getFilter={getFilter} resetFilter={resetFilter} />
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
}
