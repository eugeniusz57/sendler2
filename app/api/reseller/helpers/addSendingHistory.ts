import db from "@/db";
import { QueryResult } from "pg";

import { ISendHistoryDatabase } from "@/globaltypes/types";

export const addSendingHistory = async (idArray: number[], text: string, method: 'api' | 'web', userName: string, date?: string): Promise<ISendHistoryDatabase> => {

	let res: QueryResult<ISendHistoryDatabase>;
	if (second) {
		res = await db.query(
			`INSERT INTO sending_history (send_method, text_sms, sending_group_date, alfa_name) VALUES ('${method}', '${text}','${date}'::timestamp(0),'${userName}') RETURNING *`
		);
		// res = await db.query(
		// 	`INSERT INTO sending_history (send_method, text_sms, sending_group_date, alfa_name) VALUES ('${method}', '${text}', now()::timestamptz(0) + interval '${second} second','${userName}') RETURNING *`
		// );
	} else {
		res = await db.query(
			`INSERT INTO sending_history (send_method, text_sms, alfa_name) VALUES ('${method}', '${text}', '${userName}') RETURNING *`,
		);
	};

	const { history_id } = res.rows[0];

	for (let i = 0; i < idArray.length; i += 1) {
		await db.query(
			`INSERT INTO sending_members (group_id, history_id) values($1, $2)`,
			[idArray[i], history_id]
		)
	};
	return res.rows[0];
};
// import db from "@/db";
// import { QueryResult } from "pg";

// import { ISendHistoryDatabase } from "@/globaltypes/types";

// export const addSendingHistory = async (idArray: number[], text: string, method: 'api' | 'web', userName: string, second?: number): Promise<ISendHistoryDatabase> => {

// 	let res: QueryResult<ISendHistoryDatabase>;
// 	let time: QueryResult<Date>;
// 	if (second) {
// 		await db.query(`SET TIME ZONE 'Europe/Vilnius'`);
// 		time = await db.query(`SELECT to_char(now(),'DD.MM.YYYY HH24: MI: SS')`)
// 		console.log('TIME', time.rows[0])
// 		res = await db.query(
// 			`INSERT INTO sending_history (send_method, text_sms, sending_group_date, alfa_name) VALUES ('${method}', '${text}', now()::timestamp(0) AT TIME ZONE 'Europe/Vilnius' + interval '${second} second','${userName}') RETURNING *`
// 		);
// 		console.log('RES', res.rows[0])
// 	} else {
// 		res = await db.query(
// 			`INSERT INTO sending_history (send_method, text_sms, alfa_name) VALUES ('${method}', '${text}', '${userName}') RETURNING *`,
// 		);
// 	};

// 	const { history_id } = res.rows[0];

// 	for (let i = 0; i < idArray.length; i += 1) {
// 		await db.query(
// 			`INSERT INTO sending_members (group_id, history_id) values($1, $2)`,
// 			[idArray[i], history_id]
// 		)
// 	};
// 	return res.rows[0];
// };
