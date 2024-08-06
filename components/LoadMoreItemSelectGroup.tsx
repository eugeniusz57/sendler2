import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { getUserGroups } from '@/fetch-actions/groupsFetchActions';
import { IGroupDatabase } from "@/globaltypes/types";
import ItemGroupSelect from "./ItemGroupSelect";

type Props = {
	userId: number;
	isUpdated: boolean;
	LIMIT: number;
	getSelect: (item: string) => void,
};

const LoadMoreItemSelectGroup: React.FC<Props> = ({
	userId,
	isUpdated,
	LIMIT,
	getSelect }: Props) => {
	const [groups, setGroups] = useState<IGroupDatabase[]>([]);
	const [visible, setVisible] = useState(LIMIT);
	const [ref, inView] = useInView();

	const loadMorePayments = async () => {
		if (visible <= groups.length + LIMIT) {
			const res = await getUserGroups(userId, LIMIT, visible);
			if (res) {
				const groups = res ?? [];
				const newGroups = groups;
				setGroups((prevGroups: IGroupDatabase[]) => [...prevGroups, ...newGroups]);
				setVisible(visible + LIMIT);
			}
		}
	}

	const memoizedLoadMorePayments = useCallback(loadMorePayments, [userId, visible, LIMIT, groups.length]);

	useEffect(() => {
		setGroups([]);
		setVisible(LIMIT);
	}, [isUpdated, LIMIT]);

	useEffect(() => {
		if (inView) {
			memoizedLoadMorePayments();
		}
	}, [inView, memoizedLoadMorePayments]);

	return (
		<>
			{groups?.map((group: IGroupDatabase) => (
				<ItemGroupSelect
					key={group.group_id}
					selectOption={group.group_name}
					getSelect={getSelect}
				/>
			))}
			<div ref={ref}>
				{visible <= groups.length + LIMIT ?
					<h4 className="text-center font-medium">Loading ...</h4> :
					<h4 className="text-center font-medium">There are no more groups.</h4>}
			</div>
		</>
	);
};

export default LoadMoreItemSelectGroup;