import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";

import { createGroup } from "../../controllers/sending-groups";
import { createClient } from "../../controllers/clients";

import {
	fetchGroupClients,
	fetchGroupIdByName,
} from "@/api-actions";

import { QueryResult } from "pg";
import { schemaGetQuantitySendSMSRecipients } from "@/models/send-sms";
import { IClientDatabase, ISendSMS, ISession, IGroupId } from "@/globaltypes/types";


export async function POST(request: Request): Promise<NextResponse<{
	message: string;
}> | NextResponse<{
	clients: number;
}> | undefined> {
	const session: ISession | null = await getServerSession(options);
	const userId = session?.user.user_id;
	if (!userId) {
		return NextResponse.json(
			{ message: "The userId doesn't exist." },
			{ status: 400 }
		);
	};
	try {
		const body: ISendSMS = await request.json();
		const { error, value } = schemaGetQuantitySendSMSRecipients.validate(body);

		if (error) {
			return NextResponse.json(
				{ message: "Failed to get list clients ", error: error.details[0].message },
				{ status: 400 }
			);
		};

		const { recipients } = value;

		if (!(recipients.length > 0)) {
			return NextResponse.json(
				{ message: "Enter recipients, please." },
				{ status: 400 }
			);
		};

		let clients: number = 0;
		for (let i = 0; i < recipients.length; i++) {
			if (typeof recipients[i] === "number") {
				if (userId) {
					clients = clients + 1;
				};
			};
			if (typeof recipients[i] === "string") {
				const res: QueryResult<IGroupId> = await fetchGroupIdByName(userId, String(recipients[i]));
				const { group_id } = res.rows[0];
				const resClientsGroup: QueryResult<IClientDatabase> = await fetchGroupClients(group_id, null, 0, '');
				if (resClientsGroup.rows.length > 0) {
					clients = clients + resClientsGroup.rows.length;
				};
			};


			return NextResponse.json(
				{ clients },
				{ status: 200 }
			);
		};
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to get list clients ", error: error.message },
			{ status: 500 }
		);
	}
};