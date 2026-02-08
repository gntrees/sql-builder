export const sqlSamples = {
    basicSelect: [
        "SELECT id, name FROM users",
        "SELECT * FROM products",
        "SELECT id, name, email, created_at FROM users",
    ],

    whereClauses: [
        "SELECT id FROM users WHERE active = true",
        "SELECT * FROM orders WHERE total > 100",
        "SELECT * FROM products WHERE price < 50",
        "SELECT * FROM users WHERE email = 'test@example.com'",
        "SELECT * FROM orders WHERE status = 'completed' AND paid = true",
    ],

    joins: [
        "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id",
        "SELECT u.name, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id",
        "SELECT * FROM orders RIGHT JOIN products ON orders.product_id = products.id",
        "SELECT * FROM users u CROSS JOIN products p",
    ],

    aggregations: [
        "SELECT COUNT(*), AVG(price) FROM products",
        "SELECT category, COUNT(*) FROM products GROUP BY category",
        "SELECT department, SUM(salary) FROM employees GROUP BY department HAVING SUM(salary) > 100000",
        "SELECT COUNT(*) FROM orders",
        "SELECT MAX(price), MIN(price) FROM products",
    ],

    subqueries: [
        "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders)",
        "SELECT (SELECT COUNT(*) FROM orders) AS total_orders",
        "SELECT * FROM products WHERE category_id IN (SELECT id FROM categories WHERE active = true)",
    ],

    ctes: [
        "WITH ranked_users AS (SELECT *, ROW_NUMBER() OVER (ORDER BY created_at) AS rn FROM users) SELECT * FROM ranked_users",
        "WITH user_counts AS (SELECT user_id, COUNT(*) as order_count FROM orders GROUP BY user_id) SELECT * FROM user_counts WHERE order_count > 5",
    ],

    functions: [
        "SELECT COUNT(1), ROUND(AVG(spend_hours)) FROM services",
        "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users",
        "SELECT UPPER(name) FROM products",
        "SELECT LOWER(email) FROM users",
        "SELECT SUBSTRING(description, 1, 50) FROM products",
        "SELECT COALESCE(NULLIF(price, 0), 100) FROM products",
    ],

    orderBy: [
        "SELECT * FROM users ORDER BY created_at DESC",
        "SELECT * FROM products ORDER BY price ASC, name DESC",
        "SELECT * FROM orders ORDER BY created_at",
    ],

    limitOffset: [
        "SELECT * FROM users LIMIT 10",
        "SELECT * FROM users LIMIT 10 OFFSET 20",
        "SELECT * FROM products ORDER BY price DESC LIMIT 5",
    ],

    distinct: [
        "SELECT DISTINCT category FROM products",
        "SELECT DISTINCT status FROM orders",
    ],

    operators: [
        "SELECT * FROM users WHERE age >= 18",
        "SELECT * FROM products WHERE price BETWEEN 10 AND 100",
        "SELECT * FROM users WHERE name LIKE 'John%'",
        "SELECT * FROM orders WHERE created_at > '2024-01-01'",
    ],

    complex: [
        "SELECT u.name, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = true GROUP BY u.name HAVING COUNT(o.id) > 0 ORDER BY order_count DESC",
        "SELECT category, AVG(price) as avg_price, COUNT(*) as product_count FROM products WHERE price > 0 GROUP BY category HAVING AVG(price) < 100 ORDER BY avg_price ASC",
        `SELECT  service , sub_service , sla,  count(1) as jumlah_keluhan,
                round(avg(spend_hours)) as rata_rata_jam,
                    round(((cast(count(1) filter (where not is_late) as decimal ))/cast(count(1) as decimal)*100),2) as close_sesuai_target,
                            round(((cast(count(1) filter (where is_late) as decimal ))/cast(count(1) as decimal)*100),2) as close_tidak_sesuai_target
                FROM  (
                SELECT A
                    .service,
                    A.sub_service,
                    A.ticket_created,
                    A.closed_time,
                    A.sla,
                    A.is_late,
                    case when 
                        lama_seluruh_hari - floor(jumlah_libur)  is null then lama_seluruh_hari - tanggal
                        else 	 (lama_seluruh_hari - floor(jumlah_libur)) - tanggal end  spend_hourS
                FROM
                    (
                    SELECT
                        service,
                        sub_service,
                        sla,
                        ticket_created,
                        is_late,
                        closed_time,
                        15.5 * floor(COUNT ( tanggal )-1) tanggal,
                        ( EXTRACT ( EPOCH FROM closed_time - ticket_created ) / 3600 ) lama_seluruh_hari
                    FROM
                        (
                        SELECT
                            service,
                            sub_service,
                            sla,
                            day_name,
                            is_late,
                            ticket_created,
                            closed_time,
                            DATE ( generate_series ( DATE ( ticket_created ), DATE ( closed_time ), 'P1D' ) ) AS tanggal 
                        FROM
                            (
                            SELECT
                                s.NAME AS service,
                                ss.NAME AS sub_service,
                                ss.sla,
                                T.created_At,
                                TRIM ( to_char( T.created_at, 'day' ) ) AS day_name,
                                tsh.closed_time,
                                a2.deadline,
                                ( tsh.closed_time :: DATE > a2.deadline :: DATE ) AS is_late,
                            CASE
                                    
                                    WHEN T.created_At :: TIME < '08:00:00' THEN
                                    ( concat ( DATE ( T.created_at ), ' 08:00:00' ) :: TIMESTAMP ) 
                                    WHEN T.created_At :: TIME > '16:30:00' THEN
                                    ( concat ( DATE ( T.created_at ) + 1, ' 08:00:00' ) :: TIMESTAMP ) 
                                    WHEN TRIM ( to_char( T.created_at, 'day' ) ) = 'friday' 
                                    AND T.created_At :: TIME > '17:00:00' THEN
                                        ( concat ( DATE ( T.created_at ) + 3, ' 08:00:00' ) :: TIMESTAMP ) 
                                        WHEN TRIM ( to_char( T.created_at, 'day' ) ) = 'saturday' THEN
                                        ( concat ( DATE ( T.created_at ) + 2, ' 08:00:00' ) :: TIMESTAMP ) 
                                        WHEN TRIM ( to_char( T.created_at, 'day' ) ) = 'sunday' THEN
                                        ( concat ( DATE ( T.created_at ) + 1, ' 08:00:00' ) :: TIMESTAMP ) ELSE T.created_at 
                                    END AS ticket_created 
                                FROM
                                    tickets
                                    T INNER JOIN assignments A ON A.ticket_id = T.
                                    ID INNER JOIN sub_service ss ON A.subservice_id = ss.
                                    ID INNER JOIN services s ON ss.service_id = s.
                                    ID JOIN (
                                    SELECT MAX
                                        ( tsh.created_at ) AS closed_time,
                                        tsh.ticket_id 
                                    FROM
                                        ticket_status_history tsh 
                                    WHERE
                                        tsh.type_id = 5 
                                    GROUP BY
                                        tsh.ticket_id 
                                    ) tsh ON tsh.ticket_id = T.
                                    ID LEFT JOIN (
                                    SELECT MAX
                                        ( a2.end_date_assignee ) AS deadline,
                                        t2.assignment_id 
                                    FROM
                                        assignees a2
                                        JOIN task t2 ON ( a2.task_id = t2.ID ) 
                                    GROUP BY
                                        t2.assignment_id 
                                    ) a2 ON a2.assignment_id = A.ID 
                                    
                                GROUP BY
                                    s.ID,
                                    ss.ID,
                                    T.ID,
                                    tsh.closed_time,
                                    a2.deadline,
                                    T.created_at 
                                ) A 
                            ) b 
                        WHERE
                            tanggal IN ( SELECT work_date FROM calender_work_day WHERE is_work_day = 1 ) 
                            
                        GROUP BY
                            service,
                            sub_service,
                            sla,
                            is_late,
                            ticket_created,
                            closed_time 
                        ORDER BY
                            4 ASC 
                        )
                        A LEFT JOIN (
                        SELECT
                            service,
                            sub_service,
                            sla,
                            ticket_created,
                            closed_time,
                            COUNT ( tanggal ) * 24 jumlah_libur
                        FROM
                            (
                            SELECT
                                service,
                                sub_service,
                                sla,
                                day_name,
                                ticket_created,
                                closed_time,
                                DATE ( generate_series ( DATE ( ticket_created ), DATE ( closed_time ), 'P1D' ) ) AS tanggal 
                            FROM
                                (
                                SELECT
                                    s.NAME AS service,
                                    ss.NAME AS sub_service,
                                    ss.sla,
                                    T.created_At,
                                    TRIM ( to_char( T.created_at, 'day' ) ) AS day_name,
                                    tsh.closed_time,
                                    a2.deadline,
                                    ( tsh.closed_time :: DATE > a2.deadline :: DATE ) AS is_late,
                                CASE
                                        
                                        WHEN T.created_At :: TIME < '08:00:00' THEN
                                        ( concat ( DATE ( T.created_at ), ' 08:00:00' ) :: TIMESTAMP ) 
                                        WHEN T.created_At :: TIME > '16:30:00' THEN
                                        ( concat ( DATE ( T.created_at ) + 1, ' 08:00:00' ) :: TIMESTAMP ) 
                                        WHEN TRIM ( to_char( T.created_at, 'day' ) ) = 'friday' 
                                        AND T.created_At :: TIME > '17:00:00' THEN
                                            ( concat ( DATE ( T.created_at ) + 3, ' 08:00:00' ) :: TIMESTAMP ) 
                                            WHEN TRIM ( to_char( T.created_at, 'day' ) ) = 'saturday' THEN
                                            ( concat ( DATE ( T.created_at ) + 2, ' 08:00:00' ) :: TIMESTAMP ) 
                                            WHEN TRIM ( to_char( T.created_at, 'day' ) ) = 'sunday' THEN
                                            ( concat ( DATE ( T.created_at ) + 1, ' 08:00:00' ) :: TIMESTAMP ) ELSE T.created_at 
                                        END AS ticket_created 
                                    FROM
                                        tickets
                                        T INNER JOIN assignments A ON A.ticket_id = T.
                                        ID INNER JOIN sub_service ss ON A.subservice_id = ss.
                                        ID INNER JOIN services s ON ss.service_id = s.
                                        ID JOIN (
                                        SELECT MAX
                                            ( tsh.created_at ) AS closed_time,
                                            tsh.ticket_id 
                                        FROM
                                            ticket_status_history tsh 
                                        WHERE
                                            tsh.type_id = 5 
                                        GROUP BY
                                            tsh.ticket_id 
                                        ) tsh ON tsh.ticket_id = T.
                                        ID LEFT JOIN (
                                        SELECT MAX
                                            ( a2.end_date_assignee ) AS deadline,
                                            t2.assignment_id 
                                        FROM
                                            assignees a2
                                            JOIN task t2 ON ( a2.task_id = t2.ID ) 
                                        GROUP BY
                                            t2.assignment_id 
                                        ) a2 ON a2.assignment_id = A.ID 
                                        
                                    GROUP BY
                                        s.ID,
                                        ss.ID,
                                        T.ID,
                                        tsh.closed_time,
                                        a2.deadline,
                                        T.created_at 
                                    ) A 
                                ) b 
                            WHERE
                                tanggal IN ( SELECT work_date FROM calender_work_day WHERE is_work_day = 0 ) 
                                
                            GROUP BY
                                service,
                                sub_service,
                                sla,
                                ticket_created,
                                closed_time 
                            ORDER BY
                                4 ASC 
                            ) b ON A.service = b.service 
                            AND A.sub_service = b.sub_service 
                            AND A.sla = b.sla 
                            and a.ticket_created = b.ticket_created
                            and a.closed_time = b.closed_time
                        GROUP BY
                            A.service,
                            A.sub_service,
                            A.ticket_created,
                        A.closed_time,
                        lama_seluruh_hari,
                        jumlah_libur,
                        tanggal,
                        A.sla,
                        is_late )
                        Sd
                        GROUP BY  service , sub_service , sla
                        ORDER BY 1`
    ],
};

export type SqlSampleCategory = keyof typeof sqlSamples;

export function getAllSamples(): Array<{ category: string; sql: string }> {
    const result: Array<{ category: string; sql: string }> = [];
    for (const [category, samples] of Object.entries(sqlSamples)) {
        for (const sql of samples) {
            result.push({ category, sql });
        }
    }
    return result;
}
