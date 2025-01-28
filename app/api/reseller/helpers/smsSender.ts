import axios from "axios";

const { RESELLER_URL } = process.env;
export const smsSender = async (
	authRes: string,
	smsQuerystr: string,
	clientsLength: number,
	userName: string,
): Promise<string[]> => {
	const sendOption = clientsLength > 1 ? "SendBulk" : "Send";
	const sendedSmsRes = await axios.post(
		`${RESELLER_URL}/rest/Sms/${sendOption}?SessionID=${authRes}&SourceAddress=${userName}&${smsQuerystr}`,
		{
			headers: {
				"Content-Type": "application/ x - www - form - urlencoded",
			},
		}
	);
	return sendedSmsRes.data;
};

// https://api.streamtools.com.ua/rest/Sms/SendBulk?SessionID=2D1CDD31DEE84BFAB84D739BFFC250A6D526&SourceAddress=legenda&DestinationAddresses=380675024820&Data=Сергій&DestinationAddresses=380994830669&Data=Serhii
