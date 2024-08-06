'use client';

import { useState } from 'react';
import { toggleSendingPermission } from '@/fetch-actions/historyFetchActions';
import { ISendingHistoryResponce, IHistoryResponce } from '@/globaltypes/historyTypes';

type Props = {
	history: IHistoryResponce;
};

const SendingPermissionBtn: React.FC<Props> = ({ history }) => {
	const [action, setAction] = useState(history.sending_permission === true ? 'STOP' : 'RESTORE');

	const togglePermission = async () => {
		const updatedHistory: ISendingHistoryResponce | undefined = await toggleSendingPermission(
			history.history_id as number
		);

		if (!updatedHistory) {
			return;
		}

		if (updatedHistory.sending_permission === true) {
			setAction('STOP');
		} else {
			setAction('RESTORE');
		}
	};

	return (
		<button type="button" onClick={togglePermission} className="row-table__btn">
			{action}
		</button>
	);
};

export default SendingPermissionBtn;
