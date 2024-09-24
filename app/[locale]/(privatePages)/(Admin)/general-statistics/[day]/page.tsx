'use client';

import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import TableStatisticsPerDay from '@/components/TableStatisticsPerDay';
import GreenButton from '@/components/buttons/GreenButton';
import { getUserHistory } from '@/fetch-actions/historyFetchActions';
import { IHistoryPeriod, IHistoryResponce } from '@/globaltypes/historyTypes';
import { SendMethodType } from '@/globaltypes/types';

const ALL_USERS = -1;

type Props = {
	params: { day: string };
};

const DayHistory: React.FC<Props> = ({ params: { day } }) => {
	const [userHistory, setUserHistory] = useState<IHistoryResponce[]>([]);
	const [sendMethod, setSendMethod] = useState<SendMethodType>('web');

	function parseDateString(dateString: string) {
		const [day, month, year] = dateString.split('.').map(Number);
		return new Date(year, month - 1, day);
	}

	const memoizedUserHistory = useCallback(async () => {
		const historyPeriod: IHistoryPeriod = {
			startDate: day ? parseDateString(day) : undefined,
			endDate: day ? parseDateString(day) : undefined,
		};
		const userHistory: IHistoryResponce[] | undefined = await getUserHistory({
			id: ALL_USERS,
			sendMethod,
			historyPeriod,
		});

		if (userHistory) setUserHistory(userHistory);
	}, [day, sendMethod]);

	useEffect(() => {
		memoizedUserHistory();
	}, [memoizedUserHistory]);

	const handleSendMethod = (method: SendMethodType) => {
		setSendMethod(method);
	};

	return (
		<>
			<p>Statistics for {day ?? ''}</p>
			<div className="flex gap-4 mb-4 mt-4">
				<GreenButton type="button" size="normal" onClick={() => handleSendMethod('web')} isActive={sendMethod === "web"}>
					Site
				</GreenButton>
				<GreenButton type="button" size="normal" onClick={() => handleSendMethod('api')} isActive={sendMethod === "api"}>
					Api
				</GreenButton>
			</div>
			<TableStatisticsPerDay userHistory={userHistory} />
		</>
	);
};

export default DayHistory;
