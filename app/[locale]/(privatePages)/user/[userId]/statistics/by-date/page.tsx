'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import Title from '@/components/Title';
import SendingPermissionBtn from '@/components/buttons/SendingPermissionBtn';
import BackStatisticsBtn from '@/components/buttons/BackStatisticsBtn';
import { countSuccessfullySentNumbers } from '@/helpers/getCountSuccessfullySentNumbers';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';
import { useTranslations } from 'next-intl';

interface Props {
	params: { userId: string };
};

const DayHistory: React.FC<Props> = ({ params }) => {
	const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);
	const userId = Number(params.userId);
	const searchParams = useSearchParams();
	const historyDate = searchParams.get('date');
	const t = useTranslations('DayHistory');

	const memoizedUserHistory = useCallback(async () => {
		const historyPeriod: IHistoryPeriod = {
			startDate: historyDate ? new Date(historyDate) : undefined,
			endDate: historyDate ? new Date(historyDate) : undefined,
		};
		const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
			id: userId,
			historyPeriod,
		});

		if (userHistory) setUserHistory(userHistory);
	}, [historyDate, userId]);

	useEffect(() => {
		memoizedUserHistory();
	}, [memoizedUserHistory]);

	return (
		<section className="container mx-auto">
			<Title type="h1" color="dark">
				{t('pageTitle')}
			</Title>
			<div className="mt-[28px] md:mt-[60px]">
				<div className="content-block">
					<div className="pl-[10px] md:pl-[26px]">
						<p className="mb-[14px] md:mb-5 text-base md:text-lg font-roboto text-[#1B1B30] lg:text-xl">
							{t('titlePageBox')} {historyDate ? `${String(new Date(historyDate).getDate()).padStart(2, '0')}.${String(new Date(historyDate).getMonth() + 1).padStart(2, '0')}.${new Date(historyDate).getFullYear()}` : '-'}
						</p>
						<BackStatisticsBtn>
							<p className='text-left text-sm md:text-base'>{t('textTurnBackButton')}</p>
						</BackStatisticsBtn>
					</div>
					<div className="justify-center flex items-center lg:justify-between h-[40px] md:h-[58px] px-[26px] font-roboto text-lg lg:text-xl text-white bg-[#417D8A]">
						<p className="lg:hidden">{t("nameMobileDayHistoryTable")}</p>
						<p className="hidden lg:block w-[130px]">{t('nameCol_1DayHistoryTable')}</p>
						<p className="hidden lg:block w-[118px]">{t('nameCol_2DayHistoryTable')}</p>
						<p className="hidden lg:block w-[126px]">{t('nameCol_3DayHistoryTable')}</p>
						<p className="hidden lg:block w-[160px]">{t('nameCol_4DayHistoryTable')}</p>
						<p className="hidden lg:block w-[200px]">{t('nameCol_5DayHistoryTable')}</p>
						<p className="hidden lg:block w-[113px]">{t('nameCol_6DayHistoryTable')}</p>
					</div>
					<ul>
						{userHistory &&
							userHistory.length !== 0 &&
							userHistory.map(item => {
								return (
									<li
										key={item.history_id as number}
										className="flex items-center mb-8 px-[10px] gap-x-8 py-3 md:px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE] lg:h-[47px] lg:mb-1 lg:py-0"
									>
										<div className="hidden md:flex flex-col gap-y-7 font-medium lg:hidden">
											<p className="">{t('nameCol_1DayHistoryTable')}</p>
											<p className="">{t('nameCol_2DayHistoryTable')}</p>
											<p className="">{t('nameCol_3DayHistoryTable')}</p>
											<p className="">{t('nameCol_4DayHistoryTable')}</p>
											<p className="">{t('nameCol_5DayHistoryTable')}</p>
											<p className="">{t('nameCol_6DayHistoryTable')}</p>
										</div>

										<div className="flex flex-col gap-y-2 text-base md:gap-y-8 lg:flex-row lg:justify-between lg:items-center lg:grow">
											<p className="font-medium md:hidden">{t('nameCol_1DayHistoryTable')}</p>
											<p className="w-[130px] montserrat text-sm md:text-base text-[#2366E8] text-ellipsis whitespace-nowrap overflow-hidden">
												<Link href={`by-date/${item.history_id}`}>{item.text_sms}</Link>
											</p>
											<p className="font-medium mt-4 md:hidden">{t('nameCol_2DayHistoryTable')}</p>
											<p className="w-[118px] montserrat text-sm md:text-base">{item.alfa_name}</p>
											<p className="font-medium mt-4 md:hidden">{t('nameCol_3DayHistoryTable')}</p>
											<p className="w-[126px] montserrat text-sm md:text-base">
												{new Date(item.sending_group_date) >= new Date() && item.sending_permission === true
													? 'Заплановано'
													: item.sending_permission === false
														? 'Зупинено'
														: new Date(item.sending_group_date) < new Date() &&
															item.recipient_status.some(item => item === 'pending')
															? 'Відправлено'
															: 'Завершено'}
											</p>
											<p className="font-medium mt-4 md:hidden">{t('nameCol_4DayHistoryTable')}</p>
											<p className="w-[160px] montserrat text-sm md:text-base">
												{item.recipient_status.filter(item => item === 'fullfield').length}/
												{item.recipient_status.length}
											</p>
											<p className="font-medium mt-4 md:hidden">{t('nameCol_5DayHistoryTable')}в</p>
											<p className="w-[200px] montserrat text-sm md:text-base">
												{countSuccessfullySentNumbers(item)}/
												{Array.from(new Set(item.clients)).length}
											</p>
											<p className="font-medium mt-4 md:hidden">{t('nameCol_6DayHistoryTable')}</p>
											<p className="w-[113px] montserrat text-sm md:text-base">
												{new Date(item.sending_group_date) > new Date() ? (
													<SendingPermissionBtn history={item} />
												) : (
													<>&#8212;</>
												)}
											</p>
										</div>
									</li>
								);
							})}
						{(!userHistory || userHistory.length < 3) &&
							Array.from({ length: 3 - userHistory.length }).map((_, index: number) => {
								return (
									<li
										key={index}
										className="flex items-center justify-between mb-8 py-3 lg:mb-0 lg:py-0 lg:h-[47px] px-[26px] font-roboto text-lg text-black border-b border-[#B5C9BE]"
									></li>
								);
							})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default DayHistory;
