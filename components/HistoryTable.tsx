'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import HistoryList from './HistoryList';
import HistoryPeriodForm from './forms/HistoryPeriodForm';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';
import { useTranslations } from 'next-intl';

const LIMIT = 120;

type Props = {
	id: number | undefined;
};

const HistoryTable: React.FC<Props> = ({ id }) => {
	const searchParams = useSearchParams();
	const startDate = searchParams.get('startDate');
	const endDate = searchParams.get('endDate');
	const t = useTranslations('StatisticsPage');

	const [userHistory, setUserHistory] = useState<IHistoryResponce[] | undefined>([]);
	const [historyPeriod, setHistoryPeriod] = useState<IHistoryPeriod | undefined>(undefined);
	const [offset, setOffset] = useState(LIMIT);
	const { ref, inView } = useInView()

	useEffect(() => {
		if (startDate && endDate) {
			setHistoryPeriod({
				startDate: new Date(startDate),
				endDate: new Date(endDate),
			});
		} else {
			setHistoryPeriod(undefined);
		}
	}, [startDate, endDate]);

	useEffect(() => {
		async function fetchAPI() {
			try {
				const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
					id,
					historyPeriod,
					limit: LIMIT,
					visible: null
				});

				setUserHistory(userHistory);
			} catch (error: any) {
				console.log(error.message + ' | ' + error.response.data.error);
				setUserHistory([]);
			}
		}
		fetchAPI();
	}, [historyPeriod, id]);

	const loadMoreHistory = async () => {
		const apiUserHistory: IHistoryResponce[] | undefined = await getUserHistory({
			id,
			historyPeriod,
			limit: LIMIT,
			visible: offset
		});
		setUserHistory([...(userHistory ?? []), ...(apiUserHistory ?? [])])
		setOffset(offset + LIMIT)
	};

	return (
		<>
			<div className="content-block">
				<HistoryPeriodForm />
				<div className="justify-center lg:justify-start flex items-center gap-[100px] h-[40px] md:h-[58px] px-[26px] font-roboto text-base md:text-xl text-white bg-[#417D8A]">
					<p className="lg:hidden">{t('nameMobileHistoryTable')}</p>
					<p className="hidden lg:block w-[194px]">{t('nameCol_1HistoryTable')}</p>
					<p className="hidden lg:block w-[184px]">{t('nameCol_2HistoryTable')}</p>
					<p className="hidden lg:block w-[150px]">{t('nameCol_3HistoryTable')} </p>
					<p className="hidden lg:block w-[150px]">{t('nameCol_4HistoryTable')}</p>
				</div>
				<HistoryList userHistory={userHistory} loadMoreHistory={loadMoreHistory} visible={userHistory?.length && offset <= userHistory?.length + LIMIT ? true : false} />
			</div>
		</>
	);
}

export default HistoryTable;
