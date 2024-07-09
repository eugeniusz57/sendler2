import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { IPaymentHistory } from "@/globaltypes/types";
import { getUserPaymentHistory } from "@/fetch-actions/usersFetchActions";
import Payment from "./Payment";

type Props = {
	userId: number;
	isUpdated: boolean;
	LIMIT: number;
};

export default function LoadMorePaymentHistory({
	userId,
	isUpdated,
	LIMIT }: Props) {
	const [payments, setPayments] = useState<IPaymentHistory[]>([]);
	const [visible, setVisible] = useState(LIMIT);

	const [ref, inView] = useInView();

	const loadMorePayments = async () => {
		if (visible <= payments.length + LIMIT) {
			const res = await getUserPaymentHistory(userId, LIMIT, visible);
			if (res) {
				const payments = res.data.payments ?? [];
				const newPayments = payments;
				setPayments((prevPayments: IPaymentHistory[]) => [...prevPayments, ...newPayments]);
				setVisible(visible + LIMIT);
			}
		}
	}

	const memoizedLoadMorePayments = useCallback(loadMorePayments, [userId, visible, LIMIT, payments.length]);

	useEffect(() => {
		setPayments([]);
		setVisible(LIMIT);
	}, [isUpdated, LIMIT]);

	useEffect(() => {
		if (inView) {
			memoizedLoadMorePayments();
		}
	}, [inView, memoizedLoadMorePayments]);

	return (
		<>
			{payments?.map(payment => (
				<Payment
					key={2 * (payment.transaction_id)}
					payment={payment}
				/>
			))}
			<div ref={ref}>
				{visible <= payments.length + LIMIT ?
					<h4 className="text-center font-medium">Loading ...</h4> :
					<h4 className="text-center font-medium">There are no more payments.</h4>}
			</div>
		</>
	);
};