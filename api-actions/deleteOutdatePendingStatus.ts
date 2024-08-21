import db from "@/db";

export default async function deleteOutdatePendingStatus(id: number): Promise<void> {

	await db.query(
		`UPDATE recipients_status
		SET recipient_status = 'rejected'
		WHERE recipient_id IN (
		SELECT rs.recipient_id
		FROM recipients_status rs
		INNER JOIN send_groups sg ON sg.group_id = rs.group_id
		WHERE sg.user_id = ${id} AND rs.recipient_status = 'pending')
		AND EXTRACT(EPOCH FROM now())-EXTRACT(EPOCH FROM status_changing_date) > 172800;	
		`);
};

