SELECT  service , sub_service , sla,  count(1) as jumlah_keluhan,
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
                        ORDER BY 1