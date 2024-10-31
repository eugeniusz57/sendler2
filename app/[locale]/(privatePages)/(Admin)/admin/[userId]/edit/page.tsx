import { fetchUser } from '@/api-actions';
import BackBtn from '@/components/buttons/BackBtn';
import UserPaymentForm from '@/components/forms/UserPaymentForm';
import Link from 'next/link';
import React from 'react';
import { getTranslations } from 'next-intl/server';

interface Props {
	params: { userId: string };
};

const Edit: React.FC<Props> = async ({ params }) => {
	const userId = Number(params.userId);
	const userInfo = await fetchUser(params.userId);
	const t = await getTranslations('AdminEditPage');


	return (
		<>
			{' '}
			<BackBtn />
			<div className="text-center mt-6">
				{userInfo?.user_active ? (
					<>
						<p className=" text-xl mb-8">
							{t('pageTitle')}{' '}
							<span className=" text-2xl">{userInfo?.user_login}</span>
						</p>
						<div className="flex items-center justify-center">
							<UserPaymentForm userId={userId} />
						</div>
					</>
				) : (
					<p className=" text-center text-2xl">
						{t('description_1')}<span className=" font-bold">{userInfo?.user_login}</span>
						{t('description_2')}{' '}
						<Link className=" italic hover:underline " href={`/admin/${userId}/detail`}>
							{t('description_3')}
						</Link>
					</p>
				)}
			</div>
		</>
	);
};

export default Edit;
