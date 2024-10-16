import axios from 'axios';
import { axiosInstance } from './AxiosInstance';

const api = axiosInstance;

export const fetchUserId = async (login: string): Promise<string> => {
	try {
		const response = await axios.post(
			'/api/users',
			{ login: login },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		return response.data.userIdAndRole.user_id;
	} catch (error) {
		throw new Error('Сталася помилка під час отримання User Id');
	}
};

export const DeleteUser = async (id: number) => {
	try {
		await api.put('api/users', { user_id: id });
	} catch (error) {
		console.error('Error while deleting user:', error);
		throw error;
	}
};

export const AddDescription = async (id: number, description: string) => {
	try {
		await api.patch('api/admin', { user_id: id, description });
	} catch (error) {
		console.error('Error while deleting user:', error);
		throw error;
	}
};

export const getByIdUserTransactionHistory = async (id: number) => {
	try {
		const res = await api.put('api/admin/transactions-history', { user_id: id });
		const data = res.data;
		return data;
	} catch (error) {
		console.error('Error while deleting user:', error);
		throw error;
	}
};

export async function userPaymant(userId: number, summ: number, countSms: string, isPaid: boolean, description: string) {
	try {
		const response = await api.post('/api/admin', {
			user_id: userId,
			sms_count: countSms,
			money_count: summ,
			paid: isPaid,
			description
		});
		return response.data;
	} catch (error) {
		throw new Error('Сталася помилка ');
	}
}

export async function deleteSMSFromUser(transactionId: number, countSms: string, description: string) {
	try {
		const response = await api.delete('/api/admin', {
			data: { transactionId: transactionId, sms_count: countSms, description: description },
		});
		return response.data;
	} catch (error) {
		throw new Error('Сталася помилка');
	}
}
