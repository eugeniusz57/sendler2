import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import RSC from "react-scrollbars-custom";

import formatTableDate from '@/app/utils/formatTableDate';
import { summarizeHistoryByDate } from '@/helpers/SortHistoryByDate';
import { IHistoryResponce } from '@/globaltypes/historyTypes';
import { SmsStatusEnum } from '@/globaltypes/types';
import { useTranslations } from 'next-intl';

type Props = {
	userHistory: IHistoryResponce[] | undefined;
	loadMoreHistory: () => void;
	visible: boolean
};

export default function HistoryList({ userHistory, loadMoreHistory, visible }: Props) {
	const sortHistory = userHistory ? summarizeHistoryByDate(userHistory) : undefined;
	const { ref, inView } = useInView({});
	const t = useTranslations('StatisticsPage');

	useEffect(() => {
		if (inView) {
			loadMoreHistory()
		}
	}, [inView])

	return (
		<ul className="flex flex-col h-[740px] md:h-[800px] lg:h-[400px]">
			<RSC style={{ height: "100%" }}>
				{sortHistory && sortHistory.length > 0 && (
					<li className="flex flex-wrap gap-y-1 items-center lg:h-[47px] w-full mb-3 md:mb-8 lg:mb-3 py-3 px-[10px] font-roboto font-medium text-sm md:px-[26px] md:text-lg text-black lg:border-b lg:border-[#B5C9BE] lg:text-xl lg:gap-[100px] lg:order-none lg:font-normal">
						<p className="grow w-4/12 md:grow-0 text-base md:text-lg lg:text-xlw-[202px] lg:w-[194px]">{t('total')}</p>
						<p className="block md:hidden w-[184px] text-[#2366E8] lg:block"></p>
						<p className="mr-3 md:mr-[18px] lg:hidden">{t('nameCol_3HistoryTable')}</p>
						<p className="w-fit lg:w-[150px]">
							{userHistory && userHistory[0]?.total_count}
						</p>
						<p className="mr-3 md:mr-[18px] ml-[70px] lg:hidden">{t('nameCol_4HistoryTable')}</p>
						<p className="w-fit lg:w-[150px]">
							{userHistory && userHistory[0]?.fullfield_count}
						</p>
					</li>
				)}

				{sortHistory &&
					sortHistory.length !== 0 &&
					sortHistory.map((item, index) => {
						return (
							<li
								key={typeof item.history_id === 'number' ? item.history_id : item.history_id[0]}
								className="flex mb-8 px-[10px] py-3 font-roboto text-[18px] text-black border-b border-[#B5C9BE] md:px-[26px] lg:h-[47px] lg:mb-0 lg:py-0 lg:text-[20px]"
							>
								<div className="hidden md:flex flex-col gap-y-8 w-4/12 font-medium lg:hidden">
									<p className="">{t('nameCol_1HistoryTable')}</p>
									<p className="">{t('nameCol_2HistoryTable')}</p>
									<p className="">{t('nameCol_3HistoryTable')}</p>
									<p className="">{t('nameCol_4HistoryTable')}</p>
								</div>

								<div className="flex flex-col gap-y-2 text-[16px] md:gap-y-8 lg:flex-row lg:items-center lg:gap-[100px]">
									<p className="font-medium md:hidden">{t('nameCol_1HistoryTable')}</p>
									<p className="w-[194px] montserrat text-[14px] md:text-[18px]">{item.send_method}</p>
									<p className="font-medium mt-4 md:hidden">{t('nameCol_2HistoryTable')}</p>
									<p className="w-[184px] text-[#2366E8] montserrat text-[14px] md:text-[18px]">
										<Link
											href={{
												pathname: `statistics/by-date/`,
												query: {
													date: new Date(item.sending_group_date).toString(),
												},
											}}
										>
											{formatTableDate(item.sending_group_date)}
										</Link>
									</p>
									<p className="font-medium mt-4 md:hidden">{t('nameCol_3HistoryTable')}</p>
									<p className="w-[150px] montserrat text-[14px] md:text-[18px]">{item.recipient_status.filter(status => status !== null).length}</p>
									<p className="font-medium mt-4 md:hidden">{t('nameCol_4HistoryTable')}</p>
									<p className="w-[150px] montserrat text-[14px] md:text-[18px]">
										{item.recipient_status.filter((item: SmsStatusEnum) => item === 'fullfield').length}
									</p>
								</div>
								{(index + 1 === sortHistory.length) && <div ref={ref}></div>}
							</li>
						);
					})}

				{sortHistory && sortHistory.length === 1 && (<li className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"></li>)}
				{(!sortHistory || sortHistory.length === 0) &&
					Array.from({ length: 3 }).map((_, index: number) => {
						return (
							<li
								key={index}
								className="flex items-center gap-[100px] h-[47px] px-[26px] font-roboto text-[20px] text-black border-b border-[#B5C9BE]"
							></li>
						);
					})}

				{<li className="">
					{visible ?
						<h4 className="text-center font-medium">Loading ...</h4> :
						<h4 className="text-center font-medium">There are no more statistics history.</h4>}
				</li>}
			</RSC>
		</ul>
	);
}

