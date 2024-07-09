import { NextResponse } from "next/server";
import fetchUserPaymentHistory from "../../../../../api-actions/fetchUserPaymentHistory";
import { QueryResult } from "pg";
import { IPaymentHistory } from "@/globaltypes/types";


export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{
	message: string;
}> | NextResponse<{
	payments: IPaymentHistory[];
}> | NextResponse<{
	error: any;
}> | undefined> {
	try {
		const id = params.id;
		const { searchParams }: URL = new URL(request.url);
		const visible = Number(searchParams.get("visible"));
		const limit = searchParams.get("limit") === null ? null : Number(searchParams.get("limit"));

		const paymentHistoryData: QueryResult<IPaymentHistory> | null = await fetchUserPaymentHistory(Number(id), limit, visible);
		const payments = paymentHistoryData.rows;
		if (!payments.length) {
			return NextResponse.json(
				{ message: `Payment history information not found` },
				{ status: 500 }
			);
		}

		if (payments.length) {
			return NextResponse.json(
				{ payments },
				{ status: 200 }
			);
		};
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message },
			{ status: 500 });
	}
};