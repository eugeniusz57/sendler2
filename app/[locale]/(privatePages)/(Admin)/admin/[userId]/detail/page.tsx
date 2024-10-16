'use client';

import TablePaymentHistory from '@/components/TablePaymentHistory';
import TableUserInfo from '@/components/TableUserInfo';
import BackBtn from '@/components/buttons/BackBtn';
import DescUserForm from '@/components/forms/DescUserForm';
import { getUser } from '@/fetch-actions/usersFetchActions';
import { IUser } from '@/globaltypes/types';
import { DeleteUser } from '@/helpers/fetchUserId';

import { useEffect, useState } from 'react';

interface Props {
	params: { userId: string };
};

const Detail: React.FC<Props> = ({ params }) => {
	const userId = Number(params.userId);
	const [user, setUser] = useState<IUser>();
	const [isUpdated, setisUpdated] = useState(false);

	const handleDelete = async (userId: number) => {
		await DeleteUser(userId);
		setisUpdated(prevIsUpdate => !prevIsUpdate);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await getUser(userId);
				setUser(response?.data.user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchUserData();
	}, [userId, isUpdated]);

	return (
		<>
			<BackBtn />
			<div className="flex mt-10 justify-center items-center flex-col md:flex-row">
				{user && <TableUserInfo user={user} handleDelete={handleDelete} />}
				{user && <DescUserForm userId={userId} />}
			</div>
			{user && <TablePaymentHistory userId={userId} />}
		</>
	);
};

export default Detail;
