import { NextRequest, NextResponse } from 'next/server';

import HttpError from '@/helpers/HttpError';
import { charAndSmsCount } from '@/app/utils/charAndSmsCount';
import { getUserHistory, createUserHistory } from '@/app/api/controllers/sending-history';
import { IErrorResponse, SmsStatusEnum, SendMethodType } from '@/globaltypes/types';
import { IHistoryProps, IHistoryResponce } from '@/globaltypes/historyTypes';

function parseStartUTCDateString(dateString: string): Date {
  const date = new Date(dateString);
  const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));

  return utcDate;
}

function parseEndUTCDateString(dateString: string): Date {
  const date = new Date(dateString);
  const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));

  return utcDate;
}

export async function GET(
	req: NextRequest
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
	try {
		const { searchParams }: URL = new URL(req.url);
		const userId = Number(searchParams.get('userId'));
		const start_date = searchParams.get('start_date');
		const end_date = searchParams.get('end_date');
		const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : null;
		const visible = searchParams.get('visible') ? Number(searchParams.get('visible')) : null;
		const sendMethod: any = searchParams.get('send_method') ?? null;

		const startDate = start_date ? parseStartUTCDateString(start_date) : undefined;
		const endDate = end_date ? parseEndUTCDateString(end_date) : undefined;

		// console.log("startDate", startDate)
		// console.log("endDate", endDate)
		// console.log("start_date", start_date)
		// console.log("end_date", end_date)

		if (!userId) {
			return HttpError(400, `ID required for getting user's history`);
		}

		const result: null | IHistoryResponce[] = await getUserHistory(userId, sendMethod, {
			startDate,
			endDate,
		},
			limit, visible);

		if (!result) {
			return HttpError(400, `Failed to get user's history by userID = ${userId}`);
		}

		const formatedHistory = result.map(history => {
			return {
				...history,
				recipient_status: history.recipient_status ? `${history.recipient_status as unknown as string}`
					?.replace(/{|}/g, '')
					.split(',') as SmsStatusEnum[] : new Array(charAndSmsCount(history.text_sms).smsQuantity * Array.from(new Set(history.clients)).length).fill(null),
			};
		});

		return NextResponse.json({
			history: formatedHistory,
		});
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
	}
}

export async function POST(
	req: NextRequest
): Promise<NextResponse<IErrorResponse> | NextResponse<IHistoryProps>> {
	try {
		const formData = await req.formData();
		const groupId = Number(formData.get('groupId'));
		const textSMS = String(formData.get('textSMS'));

		const result: null | IHistoryResponce = await createUserHistory(groupId, textSMS);

		if (!result) {
			return HttpError(400, `Failed to add data to user's history`);
		}

		return NextResponse.json({
			addedHistory: result,
			message: 'Data successfully added to history',
		});
	} catch (error: any) {
		return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
	}
}
