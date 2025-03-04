

export const insertTimeLogToDbQuery = `INSERT INTO timer (duration, category_id, user_id) VALUES (?, ?, ?);`

export const getTimeLogsGroupedByDateQuery = `SELECT 
        DATE(created_at) AS date, 
        SUM(duration) AS total_duration
    FROM 
        timer
    WHERE
            user_id = ?
    GROUP BY 
        DATE(created_at)
    ORDER BY 
        DATE(created_at) DESC;`
