import db from '@/db';

import { QueryResult } from 'pg';
import { IHistoryResponce, IHistoryPeriod } from '@/globaltypes/historyTypes';
import { SmsStatusEnum, SendMethodType } from '@/globaltypes/types';

const DEFAULT_STATUS: SmsStatusEnum = 'pending';
const sendMethod = 'api';

export default async function fetchUserHistory(
  userId: number,
  sendMethod: SendMethodType | null,
  { startDate, endDate }: IHistoryPeriod
): Promise<QueryResult<IHistoryResponce>> {
  const query = `
SELECT
    sh.history_id,
    sh.alfa_name,
    sh.sending_permission,
    sh.send_method,
    sh.text_sms,
    sh.sending_group_date,
    COALESCE(
        (SELECT ARRAY_AGG(COALESCE(rs.recipient_status, 'pending'))
         FROM recipients_status rs
         WHERE rs.history_id = sh.history_id)
    ) AS recipient_status,
    ARRAY_AGG(DISTINCT CONCAT(COALESCE(rs.client_id, gm.client_id), COALESCE(rs.group_id, sm.group_id))) AS clients
FROM
    sending_history sh
LEFT JOIN
    recipients_status rs ON rs.history_id = sh.history_id
LEFT JOIN
    sending_members sm ON sm.history_id = sh.history_id
LEFT JOIN 
    groups_members gm ON gm.group_id = COALESCE(rs.group_id, sm.group_id)
JOIN 
    send_groups sg ON sg.group_id = COALESCE(rs.group_id, sm.group_id)
JOIN
    users u ON sg.user_id = u.user_id
WHERE 
    ($1 = -1 OR u.user_id = $1)
    AND (sh.send_method = $2 OR $2 IS NULL)
    AND (sh.sending_group_date >= $3 OR $3 IS NULL)
    AND (sh.sending_group_date <= $4 OR $4 IS NULL)
GROUP BY 
    sh.history_id, 
    sh.alfa_name, 
    sh.sending_permission, 
    sh.send_method, 
    sh.text_sms, 
    sh.sending_group_date, 
    u.user_name
ORDER BY sh.sending_group_date DESC;
        `;

  return await db.query(query, [userId, sendMethod, startDate, endDate]);
}
