import { IClientDatabase } from "@/globaltypes/types";

export const createSmsUrlStrWithParameters = (client: IClientDatabase, text: string): string => {
	const adaptedText = text.split(" ").join("+");

	const str = `DestinationAddress=${client.tel}&Data=${adaptedText.replace('%ClientName%', client.first_name ? `${client.first_name}` : '').replace('%Parametr1%', client.parameter_1 ? `${client.parameter_1}` : '').replace('%Parametr2%', client.parameter_2 ? `${client.parameter_2}` : '')}`;

	return str;
};
