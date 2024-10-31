'use client';

import SelectMonth from '@/components/SelectMonth';
import TableAdminStatistics from '@/components/TableAdminStatistics';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import { summarizeHistoryByDate } from '@/helpers/SortHistoryByDate';
import BackBtn from '@/components/buttons/BackBtn';
import { useTranslations } from 'next-intl';

const ALL_USERS = -1;

const GeneralStatistics: React.FC = () => {
	const t = useTranslations('GeneralStatisticsPage');
	const months = [
		{ id: 1, value: t('monthValue_1'), label: t('monthLabel_1') },
		{ id: 2, value: t('monthValue_2'), label: t('monthLabel_2') },
		{ id: 3, value: t('monthValue_3'), label: t('monthLabel_3') },
		{ id: 4, value: t('monthValue_4'), label: t('monthLabel_4') },
		{ id: 5, value: t('monthValue_5'), label: t('monthLabel_5') },
		{ id: 6, value: t('monthValue_6'), label: t('monthLabel_6') },
		{ id: 7, value: t('monthValue_7'), label: t('monthLabel_7') },
		{ id: 8, value: t('monthValue_8'), label: t('monthLabel_8') },
		{ id: 9, value: t('monthValue_9'), label: t('monthLabel_9') },
		{ id: 10, value: t('monthValue_10'), label: t('monthLabel_10') },
		{ id: 11, value: t('monthValue_11'), label: t('monthLabel_11') },
		{ id: 12, value: t('monthValue_12'), label: t('monthLabel_12') }
	];
	const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const defaultMonth = months.find(month => month.id === currentMonth);
	const day = '5';
	const [selectedMonth, setSelectedMonth] = useState<string | undefined>(defaultMonth?.value);

	function getDaysInMonth(year: any, month: any) {
		return new Date(year, month + 1, 0).getDate();
	}

	function getMonthIndex(monthValue: any) {
		const month = months.find(m => m.value === monthValue.toLowerCase());
		return month ? month.id - 1 : -1;
	}

	function getMonthDateRange(monthValue: any) {
		const currentMonthIndex = new Date().getMonth();
		const currentYear = new Date().getFullYear();
		const selectedMonthIndex = getMonthIndex(monthValue);

		let year;
		if (selectedMonthIndex <= currentMonthIndex) {
			year = currentYear;
		} else {
			year = currentYear - 1;
		}

		const startDate = new Date(year, selectedMonthIndex, 1);
		const endDate = new Date(year, selectedMonthIndex, getDaysInMonth(year, selectedMonthIndex));

		return { startDate, endDate };
	}

	const memoizedUserHistory = useCallback(async () => {
		const historyPeriod: IHistoryPeriod = getMonthDateRange(selectedMonth);
		const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
			id: ALL_USERS,
			historyPeriod,
		});

		if (userHistory) {
			setUserHistory(summarizeHistoryByDate(userHistory));
		}
	}, [selectedMonth]);

	useEffect(() => {
		memoizedUserHistory();
	}, [memoizedUserHistory]);

	const handleMonthChange = (value: string) => {
		setSelectedMonth(value);
	};

	return (
		<>
			<BackBtn />
			<div className="flex flex-wrap gap-y-4 md:flex-nowrap items-center mb-8 mt-4">
				<Link
					href={{
						pathname: `general-statistics/${day}/`,
						query: {
							months: selectedMonth,
						},
					}}
				>
				</Link>
				<h2 className="text-medium md:text-xl mr-4">{t('title')} </h2>
				<SelectMonth options={months} value={selectedMonth} onChange={handleMonthChange} />
			</div>
			<TableAdminStatistics userHistory={userHistory} />
		</>
	);
};

export default GeneralStatistics;
