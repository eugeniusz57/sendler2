import { fetchUser } from "@/api-actions";
import insertAlfaName from "@/api-actions/insertAlfaName";


export default async function addAlfaName(alfa_name: string, user_id: number) {
	const user = await fetchUser(String(user_id));
	if (
		user?.alfa_names_active.find((name) => name === alfa_name)
	) {
		return 1;
	};
	if (
		user?.alfa_names_disable.find((name) => name === alfa_name)
	) {
		return 2;
	};
	if (alfa_name === 'Outlet') {
		return 3;
	}
	const res = await insertAlfaName(alfa_name, user_id, false);
	return res;
}