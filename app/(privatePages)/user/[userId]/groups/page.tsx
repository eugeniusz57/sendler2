"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import GroupsList from "@/components/groupsList";
import CreateGroupForm from "@/components/forms/CreateGroupForm";
import GreenButton from "@/components/buttons/GreenButton";
import Title from "@/components/Title";
import { getUserGroups } from '@/fetch-actions/groupsFetchActions';
import { IGroupDatabase } from '@/globaltypes/types';

export default function ContactManagmentPage({ params }: { params: { userId: string } }) {
	const [groups, setGroups] = useState<IGroupDatabase[] | undefined>([]);
	const userId = Number(params.userId);

	// get list of groups from database
	const getData = async () => {
		const res = await getUserGroups(userId);
		setGroups(res);
	};

	const memoizedgetData = useCallback(getData, [userId]);

	useEffect(() => {
		memoizedgetData();
	}, [memoizedgetData]);

	return (
		<>
			<Title type="h1" color="dark">
				Управління контактами
			</Title>
			<div className="content-block md:mt-[60px] mt-[28px]">
				<p className='lg:w-[776px] md:mb-[50px] mb-[40px] lg:px-[26px] md:px-[20px] px-[10px] leading-6'>Для початку роботи Вам потрібно створити нову Групу контактів та додати до неї номери. Ви можете додати номери телефонів контактів з файлу у форматі Excel або текстового файлу.</p>
				<CreateGroupForm id={userId} getGroups={getData} />
				<GroupsList groups={groups} getGroups={getData} />
				<div className=" lg:px-[26px] md:px-[20px] px-[10px]">
					<p className="accent-main_text mb-3">Всі контакти</p>
					<div className="flex md:flex-row flex-col items-center">
						<p className="lg:mr-8 md:mr-[22px] md:mb-0 mb-6">За бажанням ви можете переглянути всі свої контакти</p>
						<GreenButton size="normal">
							<Link href={`/user/${userId}/clients`}>
								Переглянути
							</Link>
						</GreenButton>
					</div>
				</div>
			</div>
		</>
	);
}

