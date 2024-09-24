"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from 'next-intl';

import GroupsList from "@/components/groupsList";
import CreateGroupForm from "@/components/forms/CreateGroupForm";
import GreenButton from "@/components/buttons/GreenButton";
import Title from "@/components/Title";
import { getUserGroups } from '@/fetch-actions/groupsFetchActions';
import { IGroupDatabase } from '@/globaltypes/types';

const LIMIT = 5;

interface Props {
	params: { userId: string };
};

const ContactManagmentPage: React.FC<Props> = ({ params }) => {
	const [groups, setGroups] = useState<IGroupDatabase[] | undefined>([]);
	const [isUpdated, setIsUpdated] = useState<boolean>(false);
	const userId = Number(params.userId);
	const locale = useLocale();


	const getUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	// get list of groups from database
	const getData = async () => {
		const res = await getUserGroups(userId, LIMIT, 0);
		setGroups(res);
	};

	const memoizedgetData = useCallback(getData, [userId]);

	useEffect(() => {
		memoizedgetData();
	}, [memoizedgetData, isUpdated]);

	return (
		<>
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block md:mt-[60px] mt-[28px]">
				<p className='lg:w-[776px] md:mb-[50px] mb-[40px] lg:px-[26px] md:px-[20px] px-[10px] leading-6'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<CreateGroupForm id={userId} getGroups={getData} />
				<GroupsList
					userId={userId}
					groups={groups}
					getGroups={getData}
					getUpdate={getUpdate}
					isUpdated={isUpdated}
					LIMIT={LIMIT}
				/>
				<div className=" lg:px-[26px] md:px-[20px] px-[10px]">
					<p className="accent-main_text mb-3 mt-[28px] md:mt-[50px] lg:mt-[80px]">Всі контакти</p>
					<div className="flex md:flex-row flex-col items-center">
						<p className="lg:mr-8 md:mr-[22px] md:mb-0 mb-6">За бажанням ви можете переглянути всі свої контакти</p>
						<GreenButton size="normal">
							<Link href={`/${locale}/user/${userId}/clients`}>
								Переглянути
							</Link>
						</GreenButton>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactManagmentPage;

