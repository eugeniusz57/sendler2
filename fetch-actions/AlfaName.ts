import { axiosInstance } from '@/helpers/AxiosInstance';

const api = axiosInstance;

export const ActiveAlfaName = async (id: number) => {
	try {
		const response = await api.patch('api/alfa-name', { "alfa_name_id": id });
		return response.data;
	} catch (error: any) { };
};

export const CombinedAlfaNamesAndUser = async () => {
	try {
		const response = await api.put('api/alfa-name');
		return response.data;
	} catch (error: any) { }
}

export const DeleteAlfaName = async (id: number) => {
	try {
		const response = await api.delete('api/alfa-name', { data: { alfa_name_id: id } });
		return response.data;
	} catch (error) { }
};

// import axios from 'axios';

// export const ActiveAlfaName = async (id: number) => {
// 	try {
// 		const response = await axios.patch('api/alfa-name', { "alfa_name_id": id });
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error while fetching users:', error);
// 		throw error;
// 	}
// };

// export const CombinedAlfaNamesAndUser = async () => {
// 	try {
// 		const response = await axios.put('api/alfa-name');
// 		return response.data;
// 	} catch (error: any) {
// 		console.log('ERROR', error.message)
// 		console.error('Error while fetching users:', error);
// 		throw error;
// 	}
// }

// export const DeleteAlfaName = async (id: number) => {
// 	try {
// 		const response = await axios.delete('api/alfa-name', { data: { alfa_name_id: id } });
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error while fetching users:', error);
// 		throw error;
// 	}
// };