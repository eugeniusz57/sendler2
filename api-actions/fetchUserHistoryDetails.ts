import db from '@/db';
import { QueryResult } from 'pg';
import { IHistoryDetailsResponce } from '@/globaltypes/historyTypes';

export default async function fetchUserHistoryDetails(
  historyId: string
): Promise<QueryResult<IHistoryDetailsResponce>> {
  const query = `
  WITH combined AS (
    SELECT 
        rs.client_id, 
        rs.group_id, 
        rs.recipient_status, 
        rs.history_id
    FROM 
        recipients_status rs
    WHERE rs.history_id = $1

    UNION ALL

    SELECT 
        gm.client_id, 
        sm.group_id, 
        'pending' AS recipient_status, 
        sm.history_id
    FROM 
        sending_members sm
    LEFT JOIN 
        groups_members gm ON gm.group_id = sm.group_id
    WHERE 
        sm.history_id = $1
        AND NOT EXISTS (
            SELECT 1 
            FROM recipients_status rs2
            WHERE rs2.history_id = sm.history_id
        )
)
SELECT 
    cl.tel, 
    cl.client_id, 
    sh.alfa_name, 
    sh.sending_permission, 
    sh.text_sms, 
    to_char(sh.sending_group_date::timestamptz AT TIME ZONE 'Europe/Vilnius', 'DD.MM.YYYY HH24:MI:SS') AS sending_group_date, 
    sg.group_name, 
    u.user_name,
    ARRAY_AGG(DISTINCT COALESCE(combined.recipient_status, 'pending')) AS recipient_status
FROM 
    sending_history sh
LEFT JOIN combined ON combined.history_id = sh.history_id
INNER JOIN 
    clients cl ON cl.client_id = combined.client_id
INNER JOIN 
    groups_members gm ON gm.client_id = cl.client_id AND gm.group_id = combined.group_id
INNER JOIN 
    send_groups sg ON sg.group_id = combined.group_id
INNER JOIN 
    users u ON sg.user_id = u.user_id
WHERE 
    sh.history_id = $1
GROUP BY 
    cl.tel, 
    cl.client_id, 
    sh.alfa_name, 
    sh.sending_permission, 
    sh.text_sms, 
    sh.sending_group_date, 
    sg.group_name, 
    u.user_name;

        `;

  return await db.query(query, [historyId]);
}
