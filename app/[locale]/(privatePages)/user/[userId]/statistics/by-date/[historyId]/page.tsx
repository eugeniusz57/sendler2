'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx/xlsx.mjs';
import Title from '@/components/Title';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import { getUserHistoryDetails } from '@/fetch-actions/historyFetchActions';
import formatToDate from '@/app/utils//fotmatToDate';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Props {
	params: {
		userId: string;
		historyId: string
	};
};

const HistoryDetails: React.FC<Props> = ({ params }) => {
	const [userHistoryDetails, setUserHistoryDetails] = useState<IHistoryDetailsResponce[]>([]);
	const userId = Number(params.userId);
	const historyId = String(params.historyId);
	const searchParams = useSearchParams();
	const [historyDate, setHistorydate] = useState(searchParams.get('date'));
	const router = useRouter();
	const locale = useLocale();
	const t = useTranslations('HistoryDetails');

	const memoizedUserHistoryDetails = useCallback(async () => {
		const userHistory: IHistoryDetailsResponce[] | undefined = await getUserHistoryDetails(
			historyId
		);

		if (userHistory) setUserHistoryDetails(userHistory);
	}, [historyId]);

	useEffect(() => {
		memoizedUserHistoryDetails();
	}, [memoizedUserHistoryDetails]);

	const handleClick = async () => {
		try {
			const formatedHistory: any[] = [];

			userHistoryDetails.forEach(history => {
				formatedHistory.push({
					['Одержувач']: history.tel,
					['Відправник']: history.alfa_name,
					['Відправлено']: history.sending_group_date,
					['Статус']: history.recipient_status.every(item => item === 'fullfield')
						? 'Доставлено'
						: 'Недоставлено',
					['Текст повідомлення']: history.text_sms,
				});
			});

			const keysObject = Object.keys(formatedHistory[0]);
			const ws = XLSX.utils.json_to_sheet(formatedHistory, {
				header: keysObject,
			});

			if (!ws['!cols']) ws['!cols'] = [];
			const range = XLSX.utils.decode_range(ws['!ref']);
			const width = 20;
			for (let i = range.s.c; i <= range.e.c; i++) {
				ws['!cols'][i] = { wch: width };
			}

			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, ws, 'Sheet 1');
			XLSX.writeFile(workbook, `Statistics.xlsx`);
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">
				{t('pageTitle')}
			</Title>
			<div className="content-block mt-[28px] md:mt-[60px]">
				<div className="mx-[10px] md:mx-[26px]">
					<div className="flex items-center gap-3 mb-[14px] md:mb-5">
						<p className="text-base md:text-lg lg:text-xl font-roboto text-[#1B1B30]">{t('titlePageBox')}</p>
						<button type="button" onClick={handleClick}>
							<Image src="/svg/excel.svg" alt="Excel icon" width={42} height={42} className="hidden md:block" />
							<Image src="/svg/excel.svg" alt="Excel icon" width={30} height={30} className="md:hidden" />
						</button>
					</div>
					<Link href={{
						pathname: `/${locale}/user/${userId}/statistics/by-date`,
						query: { date: historyDate }
					}} className='block mb-10 text-left text-sm font-roboto text-emailColorLink md:text-base'>{t('textTurnBackButton')}
					</Link>
					<div className="flex flex-wrap gap-y-[40px] lg:flex-nowrap mb-10 text-base md:text-lg lg:text-xl font-roboto text-[#1B1B30]">
						<div className="flex-none md:w-40 mr-8">
							<p className="mb-4 ">{t('sender')}</p>
							<p className="mb-4">{t('malingStatus')}</p>
							<p>{t('groupName')}</p>
						</div>
						<div className="w-2/5 font-montserrat self-stretch text-sm md:mr-28 md:text-base lg:text-lg">
							<p className="mb-[22px] lg:mb-4 text-emailColorLink">
								{userHistoryDetails[0] ? userHistoryDetails[0]?.alfa_name : '-'}
							</p>
							<p className="mb-[22px] lg:mb-4">
								{userHistoryDetails[0] && formatToDate(userHistoryDetails[0].sending_group_date)?.getTime() >= new Date().getTime() && userHistoryDetails[0]?.sending_permission === true
									? t('malingStatus_value_1')
									: userHistoryDetails[0]?.sending_permission === false
										? t('malingStatus_value_2')
										: new Date(userHistoryDetails[0]?.sending_group_date) < new Date() &&
											userHistoryDetails.some(history => history.recipient_status.some(status => status === 'pending'))
											? t('malingStatus_value_3')
											: t('malingStatus_value_4')}
							</p>
							<p className="max-w-[300px] break-words">{Array.from(new Set(userHistoryDetails.map(obj => obj.group_name))).join(', ')}</p>
						</div>
						<br />
						<div className="w-full">
							<p className="mb-3 md:mb-4">{t('messageText')}</p>
							<p className="lg:w-[440px] xl:w-[560px] font-montserrat text-sm break-words md:text-base">
								{userHistoryDetails[0] ? userHistoryDetails[0]?.text_sms : '-'}
							</p>
						</div>
					</div>
				</div>
				<div className="justify-center lg:justify-start flex items-center gap-[100px] h-[58px] px-[26px] font-roboto text-lg lg:text-xl text-white bg-[#417D8A]">
					<p className="lg:hidden">{t('nameMobileHistoryDetailsTable')}</p>
					<p className="hidden lg:block w-[166px]">{t('nameCol_1HistoryDetailsTable')}</p>
					<p className="hidden lg:block w-[196px]">{t('nameCol_2HistoryDetailsTable')}</p>
					<p className="hidden lg:block w-[130px]">{t('nameCol_3HistoryDetailsTable')}</p>
					<p className="hidden lg:block w-[130px]">{t('nameCol_4HistoryDetailsTable')}</p>
				</div>

				<ul>
					{userHistoryDetails &&
						userHistoryDetails.length !== 0 &&
						userHistoryDetails.map((item, index) => {
							return (
								<li
									key={index}
									className="flex items-center gap-x-8 mb-8 py-3 px-[10px] font-roboto text-l text-black border-b border-[#B5C9BE] md:px-[26px] lg:h-[47px] lg:mb-0 lg:py-0 lg:gap-[100px]"
								>
									<div className="hidden md:flex flex-col gap-y-8 font-medium lg:hidden">
										<p className="">{t('nameCol_1HistoryDetailsTable')}</p>
										<p className="">{t('nameCol_2HistoryDetailsTable')}</p>
										<p className="">{t('nameCol_3HistoryDetailsTable')}</p>
										<p className="">{t('nameCol_4HistoryDetailsTable')}</p>
									</div>

									<div className="flex flex-col gap-y-2 text-base md:gap-y-8 lg:flex-row lg:items-center lg:gap-[100px]">
										<p className="font-medium md:hidden">{t('nameCol_1HistoryDetailsTable')}</p>
										<p className="w-[166px] montserrat text-sm md:text-lg">{item.tel}</p>
										<p className="font-medium mt-4 md:hidden">{t('nameCol_2HistoryDetailsTable')}</p>
										<p className="w-[196px] montserrat text-sm md:text-lg">
											{String(item.sending_group_date)}
										</p>
										<p className="font-medium mt-4 md:hidden">{t('nameCol_3HistoryDetailsTable')}</p>
										<p className="w-[130px] montserrat text-sm md:text-lg">{item.recipient_status.length}</p>
										<p className="font-medium mt-4 md:hidden">{t('nameCol_4HistoryDetailsTable')}</p>
										<p className="w-[130px] montserrat text-sm md:text-lg">
											{item.recipient_status.every(item => item === 'fullfield')
												? 'Доставлено'
												: 'Недоставлено'}
										</p>
									</div>
								</li>
							);
						})}

					{(!userHistoryDetails || userHistoryDetails.length < 3) &&
						Array.from({ length: 3 - userHistoryDetails.length }).map((_, index: number) => {
							return (
								<li
									key={index}
									className="flex items-center justify-between mb-8 py-3 lg:mb-0 lg:py-0 lg:h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
								></li>
							);
						})}
				</ul>
			</div>
		</section>
	);
};

export default HistoryDetails;
