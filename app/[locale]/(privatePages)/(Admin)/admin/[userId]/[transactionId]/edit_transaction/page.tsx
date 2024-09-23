import { fetchUser } from '@/api-actions';
import BackBtn from '@/components/buttons/BackBtn';
import SMSReductionForm from '@/components/forms/SMSReductionForm';
import React from 'react';

interface Props {
	params: {
		userId: string;
		transactionId: string;
	};
};

const EditTransaction: React.FC<Props> = async ({
	params,
}) => {
	const userInfo = await fetchUser(params.userId);

	return (
		<>
			<BackBtn />{' '}
			<div className="flex items-center flex-col justify-center text-center">
				<p className="text-lg md:text-xl my-4 md:m-8">
					{' '}
					Ви працюєте з обліковим записом користувача{' '}
					<span className="text-lg font-bold md:text-2xl">{userInfo?.user_login}</span> (транзакція{' '}
					{params.transactionId})
				</p>
				{userInfo?.user_id && <SMSReductionForm userId={userInfo?.user_id} transactionId={Number(params.transactionId)} />}
			</div>
		</>
	);
};

export default EditTransaction;
