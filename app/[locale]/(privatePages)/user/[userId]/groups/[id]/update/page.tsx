'use client';

import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx/xlsx.mjs';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import Title from '@/components/Title';
import GreenButton from '@/components/buttons/GreenButton';
import { getGroupClientsAndGroupName } from '@/fetch-actions/clientsFetchActions';
import updateGroup from '@/fetch-actions/updateGroup';
import { IGroupId, IUserId } from '@/globaltypes/types';
import EmailColorLinkBtn from "@/components/buttons/EmailColorLinkBtn";


interface Props {
	params: {
		id: IGroupId,
		userId: IUserId,
	};
};

const UpdateGroupPage: React.FC<Props> = ({ params }) => {
	const userId = Number(params.userId);
	const groupId = Number(params.id);
	const router = useRouter();
	const [file, setFile] = useState<File>();
	const [groupName, setGroupName] = useState('');
	const [numberClients, setNumberClients] = useState(0);
	const locale = useLocale();
	const t = useTranslations('UpdateGroupPage');

	// get list of clients and group name for current group
	const getData = async () => {
		if (groupId) {
			const res = await getGroupClientsAndGroupName(groupId, '', null, 0);
			if (res) {
				const { groupName, clients } = res;
				setGroupName(groupName);
				setNumberClients(clients.length);
			}
		}
	};

	//the function returns to the previos page
	const handleClick = async () => {
		try {
			router.push(`/${locale}/user/${params.userId}/groups`);
		} catch (error: any) {
			console.log(error.message);
			router.push("/");
		}
	};

	const memoizedgetgetData = useCallback(getData, [groupId]);

	useEffect(() => {
		memoizedgetgetData();
	}, [memoizedgetgetData]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		};
	};
	const xport = useCallback(async () => {
		if (file) {
			const header = [
				'first_name',
				'middle_name',
				'last_name',
				'tel',
				'date_of_birth',
				'parameter_1',
				'parameter_2',
			];
			const ab = await file.arrayBuffer();
			const wb = XLSX.read(ab);
			const wsname = wb.SheetNames[0];
			const clients = XLSX.utils.sheet_to_json(wb.Sheets[wsname], { header });

			clients.shift();

			await updateGroup(clients, groupId);
			router.push(`/${locale}/user/${userId}/groups`);
		} else {
			console.log('Please, select a file!');
		}
	}, [file, groupId, router, userId, locale]);

	return (
		<>
			<Title type="h1" color="dark">
				{t('pageTitle')}
			</Title>
			<div className="content-block md:mt-[60px] mt-[28px] lg:px-[26px] md:px-[20px] px-[10px]">
				<div className='md:mb-[50px] mb-[28px]'>
					<Title type="title_block" color="dark">
						{t('titlePageBox')}
						<span className="ml-4 text-headerTable">{`${groupName} (${numberClients})`}</span>
					</Title>
					<EmailColorLinkBtn isDisabled={false} onClick={handleClick}>{t('textTurnBackButton')}</EmailColorLinkBtn>
				</div>
				<p className="lg:w-[724px] md:mb-[50px] mb-[40px] leading-6">
					{t('textPageBox')}
				</p>
				<p className="block mb-2 md:mb-3 label">{t('tilteFileInput')}</p>
				<div className="relative flex flex-col md:flex-row gap-6 md:gap-0 text-base  items-center justify-start">
					<label
						htmlFor="file"
						className="flex items-center justify-between w-full  md:w-[474px]  input w-8 h-[48px] md:mr-8 pr-[28px] pl-[28px] bg-slate-300 hover:cursor-pointer"
					>
						<div className="grow main_text">{file?.name}</div>
						<Image src="/svg/paper-clip.svg" alt="paper clip" width={32} height={32} className="" />
					</label>
					<input
						type="file"
						id="file"
						name="file"
						accept=".xls,.xlsx"
						onChange={handleFileChange}
						className="absolute input_file h-[48px]bg-slate-300"
					/>
					<GreenButton size="normal" onClick={xport}>
						{t('textFileInputButton')}
					</GreenButton>
				</div>
			</div>
		</>
	);
};

export default UpdateGroupPage;
