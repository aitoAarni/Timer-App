export const insertTimeLogToDbQuery = `INSERT INTO timer (duration, category_id, user_id) VALUES (?, ?, ?);`

export const getTimeLogsAfterDateQuery = `SELECT 
        DATE(created_at) AS date, 
        SUM(duration) AS total_duration
    FROM timer
    WHERE 
        user_id = ? 
        AND created_at >= ?
    GROUP BY DATE(created_at)
    ORDER BY DATE(created_at) DESC;
`
export const getTotalTimeLogsDurationQuery = `SELECT SUM(duration) AS total_duration
FROM timer
WHERE user_id = ?;
`

export const getTimeLogByIdQuery = 'SELECT * FROM timer WHERE id = ?;'
