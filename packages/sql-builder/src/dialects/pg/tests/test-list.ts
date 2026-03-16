/**
 * Central repository for all SQL test expectations.
 * Test files import from here instead of hardcoding SQL strings.
 */

export interface TestExpectation {
    sql: string;
    parameters?: (string | number | boolean | null)[];
    description?: string;
}

export const testSql: Record<string, Record<string, TestExpectation>> = {
    // Core query builder tests
    queryBuilder: {
        // c() method tests
        "should add column identifier from string": {
            sql: "SELECT WHERE column_name = $1",
            parameters: ["test"],
        },
        "should add column with table prefix": {
            sql: "SELECT WHERE table_name.column_name = $1",
            parameters: ["test"],
        },
        "should add column from QueryBuilder (subquery)": {
            sql: "SELECT WHERE SELECT id FROM users = $1",
            parameters: [1],
        },
        "c() should be chainable": {
            sql: "SELECT WHERE status = $1",
            parameters: ["active"],
        },

        // v() method tests
        "should add string literal": {
            sql: "SELECT WHERE $1 = $2",
            parameters: ["hello world", 1],
        },
        "should add number literal": {
            sql: "SELECT WHERE $1 = $2",
            parameters: [42, 1],
        },
        "should add boolean literal": {
            sql: "SELECT WHERE $1 = $2",
            parameters: [true, 1],
        },
        "should add false boolean literal": {
            sql: "SELECT WHERE $1 = $2",
            parameters: [false, 1],
        },
        "should add value from QueryBuilder (subquery)": {
            sql: "SELECT WHERE SELECT COUNT(*) FROM users = $1",
            parameters: [1],
        },
        "v() should be chainable": {
            sql: "SELECT WHERE id = $1",
            parameters: [123],
        },

        // c() and v() combination tests
        "should work together in insert statement": {
            sql: "INSERT INTO users SET name = $1, age = $2, active = $3",
            parameters: ["John", 25, true],
        },
        "should work together in update statement": {
            sql: "UPDATE users SET last_login = $1 WHERE id = $2",
            parameters: ["2024-01-01", 1],
        },
        "should work with complex query": {
            sql: "SELECT users.id, users.name FROM users WHERE users.active = $1 AND users.age < $2 OR users.age > $3 ORDER BY users.name",
            parameters: [true, 18, 65],
        },

        // comma method tests
        "joins multiple queries with commas": {
            sql: "SELECT id FROM users, SELECT name FROM products",
            parameters: [],
        },
        "handles queries that resolve to empty tokens": {
            sql: "SELECT id",
            parameters: [],
        },
        "handles no arguments": {
            sql: "",
            parameters: [],
        },
        "handles single query": {
            sql: "SELECT id FROM users",
            parameters: [],
        },
        "is chainable": {
            sql: "id, name FROM users",
            parameters: [],
        },

        // insert queries
        "insertQuery": {
            sql: "INSERT INTO users (name, email) VALUES ($1, LOWER('John@Example.com')), ($2, LOWER('John@Example.com'))",
            parameters: ["john", "doe"],
        },
        "insertRecordQuery": {
            sql: "INSERT INTO users (name, email) VALUES ($1, LOWER('Maria@Example.com')), ($2, LOWER('Lia@Example.com'))",
            parameters: ["maria", "lia"],
        },
        "returningQuery": {
            sql: "INSERT INTO users (name, email) VALUES ($1, LOWER('Lara@Example.com')) RETURNING id",
            parameters: ["lara"],
        },

        // update queries
        "updateQuery": {
            sql: "UPDATE users SET cities.name = $1, updated_at = NOW() FROM cities WHERE users.city_id = cities.id",
            parameters: ["budhapest"],
        },

        // select queries
        "selectQuery": {
            sql: "SELECT *, test_column, users.id, haha AS test, users.name AS another, custom_alias AS alias, NOW() AS expression FROM users WHERE users.is_active = $1 ORDER BY users.created_at",
            parameters: [true],
        },
        "distinctQuery": {
            sql: "SELECT DISTINCT users.id, users.name FROM users",
            parameters: [],
        },
        "havingQuery": {
            sql: "SELECT category_id FROM products GROUP BY category_id HAVING ABS(id) > $1",
            parameters: [5],
        },
        "havingQueryWithoutCondition": {
            sql: "SELECT category_id FROM products GROUP BY category_id HAVING",
            parameters: [],
        },
        "havingQueryWithMultipleConditions": {
            sql: "SELECT category_id FROM products GROUP BY category_id HAVING ABS(amount) > $1 AND ABS(id) < $2",
            parameters: [1000, 10],
        },

        // join queries
        "leftJoinQuery": {
            sql: "SELECT users.id, profiles.bio FROM users LEFT JOIN profiles ON profiles.user_id = users.id",
            parameters: [],
        },
        "leftJoinLateralQuery": {
            sql: "SELECT users.id, user_orders.count FROM users LEFT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON NULL",
            parameters: [],
        },
        "innerJoinQuery": {
            sql: "SELECT users.id, profiles.bio FROM users INNER JOIN profiles ON profiles.user_id = users.id",
            parameters: [],
        },
        "rightJoinQuery": {
            sql: "SELECT profiles.user_id, users.name FROM users RIGHT JOIN profiles ON profiles.user_id = users.id",
            parameters: [],
        },
        "innerJoinLateralQuery": {
            sql: "SELECT users.id, user_orders.count FROM users INNER JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE",
            parameters: [],
        },
        "fullJoinQuery": {
            sql: "SELECT users.id, profiles.bio FROM users FULL JOIN profiles ON profiles.user_id = users.id",
            parameters: [],
        },
        "crossJoinQuery": {
            sql: "SELECT users.id, roles.name FROM users CROSS JOIN roles",
            parameters: [],
        },
        "rightJoinLateralQuery": {
            sql: "SELECT users.id, user_orders.count FROM users RIGHT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE",
            parameters: [],
        },
        "crossJoinLateralQuery": {
            sql: "SELECT users.id, user_orders.count FROM users CROSS JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders",
            parameters: [],
        },
        "joinQuery": {
            sql: "SELECT users.id, profiles.bio FROM users JOIN profiles ON profiles.user_id = users.id",
            parameters: [],
        },
        "onClauseQuery": {
            sql: "SELECT users.id, profiles.bio FROM users JOIN profiles ON profiles.user_id = users.id",
            parameters: [],
        },
        "onClauseWithMultipleConditions": {
            sql: "SELECT users.id, profiles.bio FROM users JOIN profiles ON profiles.user_id = users.id AND profiles.active = $1",
            parameters: [true],
        },
        "naturalJoinQuery": {
            sql: "SELECT users.id FROM users NATURAL JOIN profiles",
            parameters: [],
        },
        "naturalLeftJoinQuery": {
            sql: "SELECT users.id FROM users NATURAL LEFT JOIN profiles",
            parameters: [],
        },
        "naturalRightJoinQuery": {
            sql: "SELECT users.id FROM users NATURAL RIGHT JOIN profiles",
            parameters: [],
        },
        "naturalInnerJoinQuery": {
            sql: "SELECT users.id FROM users NATURAL INNER JOIN profiles",
            parameters: [],
        },
        "naturalFullJoinQuery": {
            sql: "SELECT users.id FROM users NATURAL FULL JOIN profiles",
            parameters: [],
        },
        "naturalCrossJoinQuery": {
            sql: "SELECT users.id, roles.name FROM users NATURAL CROSS JOIN roles",
            parameters: [],
        },

        // where queries
        "whereQuery": {
            sql: "SELECT * FROM audit_logs WHERE audit_logs.success = $1 OR audit_logs.action > $2",
            parameters: [true, "login"],
        },

        // CTE and subquery tests
        "subSelectQuery": {
            sql: "SELECT (SELECT id FROM admins) AS admin_ids FROM users",
            parameters: [],
        },
        "cteQuery": {
            sql: "WITH admins_cte AS (SELECT id FROM admins)",
            parameters: [],
        },
        "cteSelectQuery": {
            sql: "SELECT * FROM admins_cte",
            parameters: [],
        },

        // distinct queries
        "distinctOnQuery": {
            sql: "SELECT DISTINCT ON (posts.author_id) posts.id, posts.title FROM posts",
            parameters: [],
        },

        // group by queries
        "groupByQuery": {
            sql: "SELECT users.role, COUNT(*) FROM users GROUP BY users.role",
            parameters: [],
        },
        "groupByDistinctQuery": {
            sql: "SELECT users.role, COUNT(*) FROM users GROUP BY DISTINCT users.role",
            parameters: [],
        },
        "caseQuery": {
            sql: "SELECT CASE WHEN TRUE THEN 1 ELSE 2 END AS something FROM users",
            parameters: [],
        },

        // order queries
        "orderQuery": {
            sql: "SELECT posts.id, posts.title FROM posts WHERE posts.is_published = $1 ORDER BY posts.created_at, posts.id LIMIT $2 OFFSET $3",
            parameters: [true, 23, 20],
        },
        "orderDirectionQuery": {
            sql: "SELECT posts.id, posts.title FROM posts ORDER BY posts.created_at ASC, posts.id ASC, posts.title DESC",
            parameters: [],
        },
        "nullsFirst without parameters": {
            sql: "SELECT users.id, users.name FROM users ORDER BY status ASC NULLS FIRST",
            parameters: [],
        },
        "nullsLast without parameters": {
            sql: "SELECT users.id, users.name FROM users ORDER BY created_at DESC NULLS LAST",
            parameters: [],
        },
        "nullsFirst with column parameter": {
            sql: "SELECT * FROM users ORDER BY status NULLS FIRST",
            parameters: [],
        },
        "nullsLast with column parameter": {
            sql: "SELECT * FROM users ORDER BY created_at NULLS LAST",
            parameters: [],
        },
        "chaining asc and nullsFirst": {
            sql: "SELECT * FROM users ORDER BY status ASC NULLS FIRST",
            parameters: [],
        },
        "chaining desc and nullsLast": {
            sql: "SELECT * FROM users ORDER BY created_at DESC NULLS LAST",
            parameters: [],
        },
        "multiple columns with different nulls ordering": {
            sql: "SELECT * FROM users ORDER BY status ASC NULLS FIRST, name DESC NULLS LAST",
            parameters: [],
        },

        // fetch queries
        "fetchQuery": {
            sql: "SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS ONLY",
            parameters: [10],
        },
        "fetchNextQuery": {
            sql: "SELECT * FROM users ORDER BY users.created_at FETCH NEXT $1 ROWS ONLY",
            parameters: [10],
        },
        "fetchWithTiesQuery": {
            sql: "SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS WITH TIES",
            parameters: [10],
        },
        "withTiesQuery": {
            sql: "SELECT * FROM users ORDER BY users.created_at FETCH FIRST $1 ROWS ONLY WITH TIES",
            parameters: [10],
        },

        // set operations
        "setOpsUnionQuery": {
            sql: "(SELECT admins.id FROM admins) UNION (SELECT moderators.id FROM moderators)",
            parameters: [],
        },
        "setOpsChainedQuery": {
            sql: "SELECT users.id FROM users UNION (SELECT moderators.id FROM moderators) UNION ALL (SELECT guests.id FROM guests) UNION ALL (SELECT visitors.id FROM visitors) INTERSECT (SELECT staff.id FROM staff) INTERSECT (SELECT contractors.id FROM contractors) INTERSECT ALL (SELECT vendors.id FROM vendors) INTERSECT ALL (SELECT suppliers.id FROM suppliers) EXCEPT (SELECT banned_users.id FROM banned_users) EXCEPT (SELECT blocked_users.id FROM blocked_users) EXCEPT ALL (SELECT archived_users.id FROM archived_users) EXCEPT ALL (SELECT deleted_users.id FROM deleted_users)",
            parameters: [],
        },

        // conflict handling
        "conflictDoNothingQuery": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO NOTHING",
            parameters: ["john", "john@example.com", true],
        },
        "conflictDoUpdateQuery": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO UPDATE SET name = $4, updated_at = NOW() WHERE users.is_deleted = $5 RETURNING id",
            parameters: ["donna", "donna@example.com", true, "donna", false],
        },
        "chainable onConflict doNothing": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) DO NOTHING",
            parameters: ["john", "john@example.com"],
        },
        "chainable onConflict with array target doNothing": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email, users.name) DO NOTHING",
            parameters: ["john", "john@example.com"],
        },
        "chainable onConflict with target where doNothing": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO NOTHING",
            parameters: ["john", "john@example.com", true],
        },
        "chainable onConflict doUpdate": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) DO UPDATE SET name = $3, updated_at = NOW() RETURNING id",
            parameters: ["donna", "donna@example.com", "donna"],
        },
        "chainable onConflict doUpdate with set where": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) DO UPDATE SET name = $3, updated_at = NOW() WHERE users.is_deleted = $4 RETURNING id",
            parameters: ["donna", "donna@example.com", "donna", false],
        },
        "chainable onConflict with array target doUpdate": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email, users.name) DO UPDATE SET name = $3, updated_at = NOW()",
            parameters: ["donna", "donna@example.com", "donna"],
        },
        "chainable onConflict with target where doUpdate": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) WHERE users.is_active = $3 DO UPDATE SET name = $4, updated_at = NOW()",
            parameters: ["donna", "donna@example.com", true, "donna"],
        },
        "chainable onConflict doUpdate with array set": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (users.email) DO UPDATE SET name = $3, updated_at = NOW()",
            parameters: ["donna", "donna@example.com", "donna"],
        },
        "onConstraint doNothing": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT users_email_key DO NOTHING",
            parameters: ["john", "john@example.com"],
        },
        "onConstraint doUpdate": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT users_email_key DO UPDATE SET name = $3, updated_at = NOW()",
            parameters: ["donna", "donna@example.com", "donna"],
        },
        "onConstraint with string doNothing": {
            sql: "INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT ON CONSTRAINT users_email_key DO NOTHING",
            parameters: ["john", "john@example.com"],
        },

        // transaction queries
        "beginTransactionQuery": {
            sql: "BEGIN;",
            parameters: [],
        },
        "commitTransactionQuery": {
            sql: "COMMIT;",
            parameters: [],
        },
        "rollbackTransactionQuery": {
            sql: "ROLLBACK;",
            parameters: [],
        },
        "savepointTransactionQuery": {
            sql: "SAVEPOINT sp1;",
            parameters: [],
        },
        "transactionQuery": {
            sql: "BEGIN; INSERT INTO users (name, email) VALUES ($1, $2); SAVEPOINT sp_insert_profile; UPDATE users SET updated_at = NOW() WHERE users.email = $3; COMMIT;",
            parameters: ["hana", "hana@example.com", "hana@example.com"],
        },
        "rawLimitOffsetQuery": {
            sql: "SELECT * FROM posts LIMIT ALL OFFSET 10",
            parameters: [],
        },
    },
    // Function categories (matching test file structure)
    enums: {
        "enum_first": {
            sql: "SELECT ENUM_FIRST(NULL::rainbow)",
            parameters: [],
        },
        "enum_last": {
            sql: "SELECT ENUM_LAST(NULL::rainbow)",
            parameters: [],
        },
        "enum_range with two args": {
            sql: "SELECT ENUM_RANGE($1, $2)",
            parameters: ["orange", "green"],
        },
    },
    geometry: {
        "point": {
            sql: "SELECT POINT($1, $2)",
            parameters: [23.4, -44.5],
        },
        "box of points": {
            sql: "SELECT BOX(POINT($1, $2), POINT($3, $4))",
            parameters: [1, 0, -1, 0],
        },
        "circle": {
            sql: "SELECT CIRCLE(POINT($1, $2), $3)",
            parameters: [0, 0, 5],
        },
        "area": {
            sql: "SELECT AREA(POLYGON($1, CIRCLE(POINT($2, $3), $4)))",
            parameters: [4, 0, 0, 1],
        },
        "length": {
            sql: "SELECT LENGTH(PATH(POINT($1, $2)))",
            parameters: [0, 0],
        },
    },
    sequences: {
        "nextval": {
            sql: "SELECT NEXTVAL($1)",
            parameters: ["my_sequence"],
        },
        "setval function with 2 parameters": {
            sql: "SELECT SETVAL($1, $2)",
            parameters: ["my_sequence", 42],
        },
        "setval function with 3 parameters": {
            sql: "SELECT SETVAL($1, $2, $3)",
            parameters: ["my_sequence", 42, true],
        },
        "currval": {
            sql: "SELECT CURRVAL($1)",
            parameters: ["my_sequence"],
        },
        "lastval": {
            sql: "SELECT LASTVAL()",
            parameters: [],
        },
    },
    strings: {
        "lower": {
            sql: "SELECT LOWER($1)",
            parameters: ["TOM"],
        },
        "concat": {
            sql: "SELECT CONCAT($1, $2, $3)",
            parameters: ["abc", 2, "def"],
        },
        "concat_ws": {
            sql: "SELECT CONCAT_WS($1, $2, $3, $4)",
            parameters: [",", "abcde", 2, "22"],
        },
        "substring": {
            sql: "SELECT SUBSTRING($1, $2, $3)",
            parameters: ["Thomas", 2, 3],
        },
        "regexp_replace": {
            sql: "SELECT REGEXP_REPLACE($1, $2, $3)",
            parameters: ["Thomas", ".[mN]a.", "M"],
        },
        "starts_with": {
            sql: "SELECT STARTS_WITH($1, $2)",
            parameters: ["alphabet", "alph"],
        },
        "like with escape": {
            sql: "SELECT name LIKE $1 ESCAPE $2",
            parameters: ["A\\_%", "\\"],
        },
        "ilike with escape": {
            sql: "SELECT name ILIKE $1 ESCAPE $2",
            parameters: ["a%_", "#"],
        },
        "similar to with escape": {
            sql: "SELECT code SIMILAR TO $1 ESCAPE $2",
            parameters: ["%(a|b)%", "!"],
        },
        "regex operators": {
            sql: "SELECT text ~ $1 text ~* $2 text !~ $3 text !~* $4",
            parameters: ["foo.*bar", "Foo.*Bar", "baz", "BAZ"],
        },
        "starts-with operator": {
            sql: "SELECT name ^@ $1",
            parameters: ["Al"],
        },
        "pg_client_encoding": {
            sql: "SELECT PG_CLIENT_ENCODING()",
            parameters: [],
        },
        "bit_count": {
            sql: "SELECT BIT_COUNT($1)",
            parameters: ["10111"],
        },
        "get_bit": {
            sql: "SELECT GET_BIT($1, $2)",
            parameters: ["101010101010101010", 6],
        },
        "set_bit": {
            sql: "SELECT SET_BIT($1, $2, $3)",
            parameters: ["101010101010101010", 6, 0],
        },
        "bytea functions": {
            sql: "SELECT GET_BYTE($1, $2), SET_BYTE($3, $4, $5), GET_BIT($6, $7), SET_BIT($8, $9, $10), ENCODE($11, $12), DECODE($13, $14), $15 || $16",
            parameters: [
                "\\xDEADBEEF", 2, "\\xDEADBEEF", 2, 255, "\\xDEADBEEF", 1, "\\xDEADBEEF", 1, 1,
                "\\xDEADBEEF", "hex", "deadbeef", "hex", "\\xDEADBEEF", "\\x00",
            ],
        },
        "bit_count for bit strings": {
            sql: "SELECT BIT_COUNT($1)",
            parameters: ["10111"],
        },
        "bit_length for bit strings": {
            sql: "SELECT BIT_LENGTH($1)",
            parameters: ["10111"],
        },
        "length for bit strings": {
            sql: "SELECT LENGTH($1)",
            parameters: ["10111"],
        },
        "octet_length for bit strings": {
            sql: "SELECT OCTET_LENGTH($1)",
            parameters: ["1011111011"],
        },
        "get_bit for bit strings": {
            sql: "SELECT GET_BIT($1, $2)",
            parameters: ["101010101010101010", 6],
        },
        "set_bit for bit strings": {
            sql: "SELECT SET_BIT($1, $2, $3)",
            parameters: ["101010101010101010", 6, 0],
        },
        "overlay for bit strings without count": {
            sql: "SELECT OVERLAY($1, $2, $3)",
            parameters: ["01010101010101010", "11111", 2],
        },
        "overlay for bit strings with count": {
            sql: "SELECT OVERLAY($1, $2, $3, $4)",
            parameters: ["01010101010101010", "11111", 2, 3],
        },
        "position for bit strings": {
            sql: "SELECT POSITION($1, $2)",
            parameters: ["010", "000001101011"],
        },
        "substring for bit strings with start only": {
            sql: "SELECT SUBSTRING($1, $2)",
            parameters: ["110010111111", 3],
        },
        "substring for bit strings with start and count": {
            sql: "SELECT SUBSTRING($1, $2, $3)",
            parameters: ["110010111111", 3, 2],
        },
    },
    aggregates: {
        "any_value": {
            sql: "SELECT ANY_VALUE($1)",
            parameters: ["salary"],
        },
        "array_agg": {
            sql: "SELECT ARRAY_AGG($1)",
            parameters: ["salary"],
        },
        "avg": {
            sql: "SELECT AVG($1)",
            parameters: ["salary"],
        },
        "bit_and": {
            sql: "SELECT BIT_AND($1)",
            parameters: ["flags"],
        },
        "bit_or": {
            sql: "SELECT BIT_OR($1)",
            parameters: ["flags"],
        },
        "bit_xor": {
            sql: "SELECT BIT_XOR($1)",
            parameters: ["flags"],
        },
        "bool_and": {
            sql: "SELECT BOOL_AND($1)",
            parameters: ["is_active"],
        },
        "bool_or": {
            sql: "SELECT BOOL_OR($1)",
            parameters: ["is_active"],
        },
        "count": {
            sql: "SELECT COUNT($1)",
            parameters: ["*"],
        },
        "count with expression": {
            sql: "SELECT COUNT($1)",
            parameters: ["employee_id"],
        },
        "every": {
            sql: "SELECT EVERY($1)",
            parameters: ["is_active"],
        },
        "json_agg": {
            sql: "SELECT JSON_AGG($1)",
            parameters: ["data"],
        },
        "jsonb_agg": {
            sql: "SELECT JSONB_AGG($1)",
            parameters: ["data"],
        },
        "json_agg_strict": {
            sql: "SELECT JSON_AGG_STRICT($1)",
            parameters: ["data"],
        },
        "jsonb_agg_strict": {
            sql: "SELECT JSONB_AGG_STRICT($1)",
            parameters: ["data"],
        },
        "json_arrayagg": {
            sql: "SELECT JSON_ARRAYAGG($1)",
            parameters: ["value"],
        },
        "json_objectagg": {
            sql: "SELECT JSON_OBJECTAGG($1, $2)",
            parameters: ["key", "value"],
        },
        "json_object_agg": {
            sql: "SELECT JSON_OBJECT_AGG($1, $2)",
            parameters: ["name", "value"],
        },
        "jsonb_object_agg": {
            sql: "SELECT JSONB_OBJECT_AGG($1, $2)",
            parameters: ["name", "value"],
        },
        "json_object_agg_strict": {
            sql: "SELECT JSON_OBJECT_AGG_STRICT($1, $2)",
            parameters: ["name", "value"],
        },
        "jsonb_object_agg_strict": {
            sql: "SELECT JSONB_OBJECT_AGG_STRICT($1, $2)",
            parameters: ["name", "value"],
        },
        "json_object_agg_unique": {
            sql: "SELECT JSON_OBJECT_AGG_UNIQUE($1, $2)",
            parameters: ["name", "value"],
        },
        "jsonb_object_agg_unique": {
            sql: "SELECT JSONB_OBJECT_AGG_UNIQUE($1, $2)",
            parameters: ["name", "value"],
        },
        "json_object_agg_unique_strict": {
            sql: "SELECT JSON_OBJECT_AGG_UNIQUE_STRICT($1, $2)",
            parameters: ["name", "value"],
        },
        "jsonb_object_agg_unique_strict": {
            sql: "SELECT JSONB_OBJECT_AGG_UNIQUE_STRICT($1, $2)",
            parameters: ["name", "value"],
        },
        "max": {
            sql: "SELECT MAX($1)",
            parameters: ["salary"],
        },
        "min": {
            sql: "SELECT MIN($1)",
            parameters: ["salary"],
        },
        "range_agg": {
            sql: "SELECT RANGE_AGG($1)",
            parameters: ["date_range"],
        },
        "range_intersect_agg": {
            sql: "SELECT RANGE_INTERSECT_AGG($1)",
            parameters: ["date_range"],
        },
        "string_agg": {
            sql: "SELECT STRING_AGG($1, $2)",
            parameters: ["name", ","],
        },
        "sum": {
            sql: "SELECT SUM($1)",
            parameters: ["salary"],
        },
        "xmlagg": {
            sql: "SELECT XMLAGG($1)",
            parameters: ["xmldata"],
        },
        "corr": {
            sql: "SELECT CORR($1, $2)",
            parameters: ["y", "x"],
        },
        "covar_pop": {
            sql: "SELECT COVAR_POP($1, $2)",
            parameters: ["y", "x"],
        },
        "covar_samp": {
            sql: "SELECT COVAR_SAMP($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_avgx": {
            sql: "SELECT REGR_AVGX($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_avgy": {
            sql: "SELECT REGR_AVGY($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_count": {
            sql: "SELECT REGR_COUNT($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_intercept": {
            sql: "SELECT REGR_INTERCEPT($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_r2": {
            sql: "SELECT REGR_R2($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_slope": {
            sql: "SELECT REGR_SLOPE($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_sxx": {
            sql: "SELECT REGR_SXX($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_sxy": {
            sql: "SELECT REGR_SXY($1, $2)",
            parameters: ["y", "x"],
        },
        "regr_syy": {
            sql: "SELECT REGR_SYY($1, $2)",
            parameters: ["y", "x"],
        },
        "stddev": {
            sql: "SELECT STDDEV($1)",
            parameters: ["score"],
        },
        "stddev_pop": {
            sql: "SELECT STDDEV_POP($1)",
            parameters: ["score"],
        },
        "stddev_samp": {
            sql: "SELECT STDDEV_SAMP($1)",
            parameters: ["score"],
        },
        "variance": {
            sql: "SELECT VARIANCE($1)",
            parameters: ["score"],
        },
        "var_pop": {
            sql: "SELECT VAR_POP($1)",
            parameters: ["score"],
        },
        "var_samp": {
            sql: "SELECT VAR_SAMP($1)",
            parameters: ["score"],
        },
        "mode": {
            sql: "SELECT MODE($1)",
            parameters: ["salary"],
        },
        "percentile_cont": {
            sql: "SELECT PERCENTILE_CONT($1)",
            parameters: [0.5],
        },
        "percentile_disc": {
            sql: "SELECT PERCENTILE_DISC($1)",
            parameters: [0.5],
        },
        "rank": {
            sql: "SELECT RANK($1)",
            parameters: ["salary"],
        },
        "dense_rank": {
            sql: "SELECT DENSE_RANK($1)",
            parameters: ["salary"],
        },
        "percent_rank": {
            sql: "SELECT PERCENT_RANK($1)",
            parameters: ["salary"],
        },
        "cume_dist": {
            sql: "SELECT CUME_DIST($1)",
            parameters: ["salary"],
        },
        "grouping": {
            sql: "SELECT GROUPING($1, $2)",
            parameters: ["column1", "column2"],
        },
        "grouping with single expression": {
            sql: "SELECT GROUPING($1)",
            parameters: ["column1"],
        },
    },
    subquery: {
        "EXISTS with simple subquery": {
            sql: "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id)",
            parameters: [],
        },
        "EXISTS with complex subquery": {
            sql: 'SELECT * FROM products WHERE EXISTS (SELECT $1 FROM order_items WHERE order_items.product_id = products.id AND order_items.quantity > $2)',
            parameters: [1, 10],
        },
        "NOT EXISTS with simple subquery": {
            sql: "SELECT * FROM users WHERE NOT EXISTS (SELECT * FROM banned_users WHERE banned_users.user_id = users.id)",
            parameters: [],
        },
        "NOT EXISTS with parameterized subquery": {
            sql: "SELECT * FROM employees WHERE NOT EXISTS (SELECT * FROM excursions WHERE excursions.employee_id = employees.id AND excursions.date > $1)",
            parameters: [2024],
        },
        "IN with subquery": {
            sql: "SELECT * FROM users WHERE id IN (SELECT user_id FROM premium_users)",
            parameters: [],
        },
        "IN with qualified column": {
            sql: "SELECT * FROM orders WHERE orders.product_id IN (SELECT id FROM active_products)",
            parameters: [],
        },
        "IN with parameterized subquery": {
            sql: "SELECT * FROM users WHERE department_id IN (SELECT id FROM departments WHERE budget > $1)",
            parameters: [100000],
        },
        "IN with multiple subqueries": {
            sql: "SELECT * FROM users WHERE id IN (SELECT user_id FROM premium_users, SELECT user_id FROM active_users)",
            parameters: [],
        },
        "IN without subquery": {
            sql: "SELECT * FROM users WHERE id IN",
            parameters: undefined,
        },
        "NOT IN with subquery": {
            sql: "SELECT * FROM users WHERE id NOT IN (SELECT user_id FROM suspended_users)",
            parameters: [],
        },
        "NOT IN with qualified column": {
            sql: "SELECT * FROM products WHERE products.category_id NOT IN (SELECT id FROM discontinued_categories)",
            parameters: [],
        },
        "ANY with equals operator": {
            sql: "SELECT * FROM products WHERE price = ANY (SELECT price FROM competitor_prices WHERE competitor_prices.product_id = products.id)",
            parameters: [],
        },
        "ANY with greater than operator": {
            sql: "SELECT * FROM employees WHERE salary > ANY (SELECT avg_salary FROM department_stats WHERE department_stats.dept_id = employees.department_id)",
            parameters: [],
        },
        "ANY with less than operator and parameter": {
            sql: "SELECT * FROM inventory WHERE quantity < ANY (SELECT threshold FROM alerts WHERE alerts.priority = $1)",
            parameters: [1],
        },
        "SOME with equals operator": {
            sql: "SELECT * FROM products WHERE price = SOME (SELECT target_price FROM price_targets WHERE price_targets.product_id = products.id)",
            parameters: [],
        },
        "SOME with not equals operator": {
            sql: "SELECT * FROM users WHERE status <> SOME (SELECT status_value FROM status_transitions WHERE status_transitions.user_id = users.id)",
            parameters: [],
        },
        "ALL with greater than operator": {
            sql: "SELECT * FROM employees WHERE salary > ALL (SELECT min_salary FROM departments WHERE departments.id = $1)",
            parameters: [5],
        },
        "ALL with less than operator": {
            sql: "SELECT * FROM products WHERE price < ALL (SELECT max_price FROM price_limits WHERE price_limits.category_id = products.category_id)",
            parameters: [],
        },
        "ALL with not equals operator": {
            sql: "SELECT * FROM tickets WHERE status <> ALL (SELECT status FROM excluded_statuses WHERE excluded_statuses.is_active = $1)",
            parameters: [true],
        },
        "combines EXISTS with AND": {
            sql: "SELECT * FROM users WHERE EXISTS (SELECT * FROM orders WHERE orders.user_id = users.id) AND NOT EXISTS (SELECT * FROM banned_users WHERE banned_users.user_id = users.id)",
            parameters: [],
        },
        "combines IN with OR": {
            sql: "SELECT * FROM products WHERE category_id IN (SELECT id FROM featured_categories) OR supplier_id IN (SELECT supplier_id FROM preferred_suppliers)",
            parameters: [],
        },
        "combines ALL with regular WHERE condition": {
            sql: "SELECT * FROM employees WHERE salary > ALL (SELECT min_salary FROM salary_grades WHERE salary_grades.level = $1) AND department_id = $2",
            parameters: [5, 10],
        },
    },
    network: {
        "abbrev for inet": {
            sql: "SELECT ABBREV($1)",
            parameters: ["192.168.1.0/32"],
        },
        "broadcast": {
            sql: "SELECT BROADCAST($1)",
            parameters: ["192.168.1.5/24"],
        },
        "host": {
            sql: "SELECT HOST($1)",
            parameters: ["192.168.1.0/24"],
        },
        "hostmask": {
            sql: "SELECT HOSTMASK($1)",
            parameters: ["192.168.23.20/30"],
        },
        "inet_merge": {
            sql: "SELECT INET_MERGE($1, $2)",
            parameters: ["192.168.1.5/24", "192.168.2.5/24"],
        },
        "inet_same_family": {
            sql: "SELECT INET_SAME_FAMILY($1, $2)",
            parameters: ["192.168.1.5/24", "::1"],
        },
        "masklen": {
            sql: "SELECT MASKLEN($1)",
            parameters: ["192.168.1.5/24"],
        },
        "netmask": {
            sql: "SELECT NETMASK($1)",
            parameters: ["192.168.1.5/24"],
        },
        "network": {
            sql: "SELECT NETWORK($1)",
            parameters: ["192.168.1.5/24"],
        },
        "set_masklen": {
            sql: "SELECT SET_MASKLEN($1, $2)",
            parameters: ["192.168.1.5/24", 16],
        },
        "text for inet": {
            sql: "SELECT CAST($1 AS TEXT)",
            parameters: ["192.168.1.5"],
        },
        "<< (subnet strictly contained by)": {
            sql: "SELECT $1 << $2",
            parameters: ["192.168.1.5", "192.168.1/24"],
        },
        "<<= (subnet contained by or equal to)": {
            sql: "SELECT $1 <<= $2",
            parameters: ["192.168.1/24", "192.168.1/24"],
        },
        ">> (subnet strictly contains)": {
            sql: "SELECT $1 >> $2",
            parameters: ["192.168.1/24", "192.168.1.5"],
        },
        ">>= (subnet contains or equal to)": {
            sql: "SELECT $1 >>= $2",
            parameters: ["192.168.1/24", "192.168.1/24"],
        },
        "&& (overlap/contain check)": {
            sql: "SELECT $1 && $2",
            parameters: ["192.168.1/24", "192.168.1.80/28"],
        },
        "~ (bitwise NOT)": {
            sql: "SELECT ~$1",
            parameters: [],
        },
        "& (bitwise AND)": {
            sql: "SELECT $1 & $2",
            parameters: ["192.168.1.6", "0.0.0.255"],
        },
        "| (bitwise OR)": {
            sql: "SELECT $1 | $2",
            parameters: ["192.168.1.6", "0.0.0.255"],
        },
        "+ (add offset)": {
            sql: "SELECT $1 + $2",
            parameters: ["192.168.1.6", 25],
        },
        "- (subtract offset)": {
            sql: "SELECT $1 - $2",
            parameters: ["192.168.1.43", 36],
        },
        "- (difference)": {
            sql: "SELECT $1 - $2",
            parameters: ["192.168.1.43", "192.168.1.19"],
        },
        "trunc for macaddr": {
            sql: "SELECT TRUNC($1)",
            parameters: ["12:34:56:78:90:ab"],
        },
        "trunc for macaddr8": {
            sql: "SELECT TRUNC($1)",
            parameters: ["12:34:56:78:90:ab:cd:ef"],
        },
        "macaddr8_set7bit": {
            sql: "SELECT MACADDR8_SET7BIT($1)",
            parameters: ["00:34:56:ab:cd:ef"],
        },
        "query with network function in WHERE clause": {
            sql: "SELECT * FROM devices WHERE NETWORK(ip_address) = NETWORK($1)",
            parameters: ["192.168.1.0/24"],
        },
        "query with subnet containment check": {
            sql: "SELECT * FROM networks WHERE ip_range << $1",
            parameters: ["10.0.0.0/8"],
        },
        "query with multiple network functions": {
            sql: "SELECT BROADCAST(ip_address) AS broadcast, NETMASK(ip_address) AS netmask, HOST(ip_address) AS host FROM devices",
            parameters: [],
        },
    },
    json: {
        // JSON Creation Functions
        "to_json": {
            sql: "SELECT TO_JSON($1)",
            parameters: ['{"a": 1, "b": 2}'],
        },
        "to_jsonb": {
            sql: "SELECT TO_JSONB($1)",
            parameters: ['{"a": 1}'],
        },
        "array_to_json": {
            sql: "SELECT ARRAY_TO_JSON($1)",
            parameters: ["[1,2,3]"],
        },
        "array_to_json with pretty print": {
            sql: "SELECT ARRAY_TO_JSON($1, $2)",
            parameters: ["[1,2,3]", true],
        },
        "row_to_json": {
            sql: "SELECT ROW_TO_JSON($1)",
            parameters: ["row(1, 'foo')"],
        },
        "json_build_array": {
            sql: "SELECT JSON_BUILD_ARRAY($1, $2, $3)",
            parameters: [1, 2, '"three"'],
        },
        "jsonb_build_array": {
            sql: "SELECT JSONB_BUILD_ARRAY($1, $2, $3)",
            parameters: [1, 2, 3],
        },
        "json_build_object": {
            sql: "SELECT JSON_BUILD_OBJECT($1, $2, $3, $4)",
            parameters: ["foo", 1, "bar", 2],
        },
        "jsonb_build_object": {
            sql: "SELECT JSONB_BUILD_OBJECT($1, $2, $3, $4)",
            parameters: ["a", 1, "b", 2],
        },
        "json_object from array": {
            sql: "SELECT JSON_OBJECT($1)",
            parameters: ["{a, 1, b, 2}"],
        },
        "jsonb_object from array": {
            sql: "SELECT JSONB_OBJECT($1)",
            parameters: ["{a, 1, b, 2}"],
        },
        "json_object from pairs": {
            sql: "SELECT JSON_OBJECT($1, $2)",
            parameters: ["{a,b}", "{1,2}"],
        },
        "jsonb_object from pairs": {
            sql: "SELECT JSONB_OBJECT($1, $2)",
            parameters: ["{a,b}", "{1,2}"],
        },
        // JSON Processing Functions - Array Operations
        "json_array_elements": {
            sql: "SELECT JSON_ARRAY_ELEMENTS($1)",
            parameters: ['[1,true,"foo"]'],
        },
        "jsonb_array_elements": {
            sql: "SELECT JSONB_ARRAY_ELEMENTS($1)",
            parameters: ['[1,2,3]'],
        },
        "json_array_elements_text": {
            sql: "SELECT JSON_ARRAY_ELEMENTS_TEXT($1)",
            parameters: ['["foo", "bar"]'],
        },
        "jsonb_array_elements_text": {
            sql: "SELECT JSONB_ARRAY_ELEMENTS_TEXT($1)",
            parameters: ['["a", "b"]'],
        },
        "json_array_length": {
            sql: "SELECT JSON_ARRAY_LENGTH($1)",
            parameters: ['[1,2,3,4,5]'],
        },
        "jsonb_array_length": {
            sql: "SELECT JSONB_ARRAY_LENGTH($1)",
            parameters: ['[]'],
        },
        // JSON Processing Functions - Object Operations
        "json_each": {
            sql: "SELECT JSON_EACH($1)",
            parameters: ['{"a": "foo", "b": "bar"}'],
        },
        "jsonb_each": {
            sql: "SELECT JSONB_EACH($1)",
            parameters: ['{"a": 1, "b": 2}'],
        },
        "json_each_text": {
            sql: "SELECT JSON_EACH_TEXT($1)",
            parameters: ['{"a": "foo", "b": "bar"}'],
        },
        "jsonb_each_text": {
            sql: "SELECT JSONB_EACH_TEXT($1)",
            parameters: ['{"a": "1", "b": "2"}'],
        },
        "json_object_keys": {
            sql: "SELECT JSON_OBJECT_KEYS($1)",
            parameters: ['{"f1": "abc", "f2": "def"}'],
        },
        "jsonb_object_keys": {
            sql: "SELECT JSONB_OBJECT_KEYS($1)",
            parameters: ['{"a": 1, "b": 2}'],
        },
        // JSON Processing Functions - Path Extraction
        "json_extract_path": {
            sql: "SELECT JSON_EXTRACT_PATH($1, $2, $3)",
            parameters: ['{"f2": {"f3": 1}}', "f2", "f3"],
        },
        "jsonb_extract_path": {
            sql: "SELECT JSONB_EXTRACT_PATH($1, $2, $3)",
            parameters: ['{"a": {"b": 1}}', "a", "b"],
        },
        "json_extract_path_text": {
            sql: "SELECT JSON_EXTRACT_PATH_TEXT($1, $2, $3)",
            parameters: ['{"f2": {"f6": "foo"}}', "f2", "f6"],
        },
        "jsonb_extract_path_text": {
            sql: "SELECT JSONB_EXTRACT_PATH_TEXT($1, $2, $3)",
            parameters: ['{"a": {"b": "value"}}', "a", "b"],
        },
        // JSON Processing Functions - Record Population
        "json_populate_record": {
            sql: "SELECT JSON_POPULATE_RECORD($1, $2)",
            parameters: ["null::myrowtype", '{"a": 1, "b": [2, 3]}'],
        },
        "jsonb_populate_record": {
            sql: "SELECT JSONB_POPULATE_RECORD($1, $2)",
            parameters: ["null::myrowtype", '{"a": 1, "b": 2}'],
        },
        "jsonb_populate_record_valid": {
            sql: "SELECT JSONB_POPULATE_RECORD_VALID($1, $2)",
            parameters: ["null::jsb_char2", '{"a": "aa"}'],
        },
        "json_populate_recordset": {
            sql: "SELECT JSON_POPULATE_RECORDSET($1, $2)",
            parameters: ["null::twoints", '[{"a": 1, "b": 2}, {"a": 3, "b": 4}]'],
        },
        "jsonb_populate_recordset": {
            sql: "SELECT JSONB_POPULATE_RECORDSET($1, $2)",
            parameters: ["null::twoints", '[{"a": 1, "b": 2}]'],
        },
        "json_to_record": {
            sql: "SELECT JSON_TO_RECORD($1)",
            parameters: ['{"a": 1, "b": [1, 2, 3]}'],
        },
        "jsonb_to_record": {
            sql: "SELECT JSONB_TO_RECORD($1)",
            parameters: ['{"a": 1, "b": 2}'],
        },
        "json_to_recordset": {
            sql: "SELECT JSON_TO_RECORDSET($1)",
            parameters: ['[{"a": 1, "b": "foo"}, {"a": 2, "c": "bar"}]'],
        },
        "jsonb_to_recordset": {
            sql: "SELECT JSONB_TO_RECORDSET($1)",
            parameters: ['[{"a": 1, "b": 2}]'],
        },
        // JSON Processing Functions - JSONB Modification
        "jsonb_set": {
            sql: "SELECT JSONB_SET($1, $2, $3)",
            parameters: ['{"a": 1}', '{a}', '2'],
        },
        "jsonb_set with create_if_missing": {
            sql: "SELECT JSONB_SET($1, $2, $3, $4)",
            parameters: ['{"a": 1}', '{b}', '2', true],
        },
        "jsonb_set_lax": {
            sql: "SELECT JSONB_SET_LAX($1, $2, $3)",
            parameters: ['{"a": [1, 2]}', '{a}', 'null'],
        },
        "jsonb_set_lax with all parameters": {
            sql: "SELECT JSONB_SET_LAX($1, $2, $3, $4, $5)",
            parameters: ['{"a": 1}', '{b}', 'null', true, 'delete_key'],
        },
        "jsonb_insert": {
            sql: "SELECT JSONB_INSERT($1, $2, $3)",
            parameters: ['{"a": [0, 1, 2]}', '{a, 1}', '"new"'],
        },
        "jsonb_insert with insert_after": {
            sql: "SELECT JSONB_INSERT($1, $2, $3, $4)",
            parameters: ['{"a": [0, 1, 2]}', '{a, 1}', '"new"', true],
        },
        "json_strip_nulls": {
            sql: "SELECT JSON_STRIP_NULLS($1)",
            parameters: ['[{"f1": 1, "f2": null}, 2]'],
        },
        "json_strip_nulls with strip_in_arrays": {
            sql: "SELECT JSON_STRIP_NULLS($1, $2)",
            parameters: ['[1, 2, null, 3]', true],
        },
        "jsonb_strip_nulls": {
            sql: "SELECT JSONB_STRIP_NULLS($1)",
            parameters: ['{"a": 1, "b": null}'],
        },
        "jsonb_strip_nulls with strip_in_arrays": {
            sql: "SELECT JSONB_STRIP_NULLS($1, $2)",
            parameters: ['[1, null, 3]', true],
        },
        // JSON Processing Functions - JSON Path Query
        "jsonb_path_exists": {
            sql: "SELECT JSONB_PATH_EXISTS($1, $2)",
            parameters: ['{"a": [1, 2, 3]}', '$.a[*] ? (@ > 1)'],
        },
        "jsonb_path_exists with vars": {
            sql: "SELECT JSONB_PATH_EXISTS($1, $2, $3)",
            parameters: ['{"a": [1, 2, 3]}', '$.a[*] ? (@ >= $min && @ <= $max)', '{"min": 1, "max": 2}'],
        },
        "jsonb_path_exists_tz": {
            sql: "SELECT JSONB_PATH_EXISTS_TZ($1, $2)",
            parameters: ['[\"2015-08-01 12:00:00-05\"]', '$[*] ? (@.datetime() < \"2015-08-02\".datetime())'],
        },
        "jsonb_path_match": {
            sql: "SELECT JSONB_PATH_MATCH($1, $2)",
            parameters: ['{"a": [1, 2, 3]}', '$.a[*] > 2'],
        },
        "jsonb_path_match with vars": {
            sql: "SELECT JSONB_PATH_MATCH($1, $2, $3)",
            parameters: ['{"a": [1, 2, 3]}', 'exists($.a[*] ? (@ >= $min && @ <= $max))', '{"min": 1, "max": 2}'],
        },
        "jsonb_path_match_tz": {
            sql: "SELECT JSONB_PATH_MATCH_TZ($1, $2)",
            parameters: ['[\"2015-08-01\"]', '$[*].datetime() < \"2015-08-02\".datetime()'],
        },
        "jsonb_path_query": {
            sql: "SELECT JSONB_PATH_QUERY($1, $2)",
            parameters: ['{"a": [1, 2, 3]}', '$.a[*]'],
        },
        "jsonb_path_query_tz": {
            sql: "SELECT JSONB_PATH_QUERY_TZ($1, $2)",
            parameters: ['[\"2015-08-01\"]', '$[*].datetime()'],
        },
        "jsonb_path_query_array": {
            sql: "SELECT JSONB_PATH_QUERY_ARRAY($1, $2)",
            parameters: ['{"a": [1, 2, 3]}', '$.a[*] ? (@ > 1)'],
        },
        "jsonb_path_query_array_tz": {
            sql: "SELECT JSONB_PATH_QUERY_ARRAY_TZ($1, $2)",
            parameters: ['[\"2015-08-01\"]', '$[*].datetime()'],
        },
        "jsonb_path_query_first": {
            sql: "SELECT JSONB_PATH_QUERY_FIRST($1, $2)",
            parameters: ['{"a": [1, 2, 3]}', '$.a[*]'],
        },
        "jsonb_path_query_first_tz": {
            sql: "SELECT JSONB_PATH_QUERY_FIRST_TZ($1, $2)",
            parameters: ['[\"2015-08-01\"]', '$[*].datetime()'],
        },
        // JSON Processing Functions - Utilities
        "jsonb_pretty": {
            sql: "SELECT JSONB_PRETTY($1)",
            parameters: ['[{"f1": 1, "f2": null}, 2]'],
        },
        "json_typeof": {
            sql: "SELECT JSON_TYPEOF($1)",
            parameters: ['-123.4'],
        },
        "jsonb_typeof": {
            sql: "SELECT JSONB_TYPEOF($1)",
            parameters: ['{"a": 1}'],
        },
        // JSON Aggregate Functions
        "json_agg": {
            sql: "SELECT JSON_AGG(column_name)",
            parameters: [],
        },
        "jsonb_agg": {
            sql: "SELECT JSONB_AGG(column_name)",
            parameters: [],
        },
        "json_object_agg": {
            sql: "SELECT JSON_OBJECT_AGG(key_column, value_column)",
            parameters: [],
        },
        "jsonb_object_agg": {
            sql: "SELECT JSONB_OBJECT_AGG(key_column, value_column)",
            parameters: [],
        },
        // Integration with Query Builder
        "json functions in SELECT clause": {
            sql: "SELECT JSONB_PRETTY(data_column) AS pretty_data FROM my_table",
            parameters: [],
        },
        "json functions in WHERE clause": {
            sql: "SELECT * FROM my_table WHERE JSONB_PATH_EXISTS(data_column, $1)",
            parameters: ['$.a[*]'],
        },
        "json_typeof in ORDER BY clause": {
            sql: "SELECT * FROM my_table ORDER BY JSONB_TYPEOF(data_column)",
            parameters: [],
        },
        "json_build_object in SELECT with multiple columns": {
            sql: "SELECT JSONB_BUILD_OBJECT($1, id, $2, name) AS json_data FROM users",
            parameters: ["id", "name"],
        },
        "json_array_length in HAVING clause": {
            sql: "SELECT category FROM products GROUP BY category HAVING JSON_ARRAY_LENGTH(tags) > $1",
            parameters: [3],
        },
        "json_agg with GROUP BY": {
            sql: "SELECT user_id, JSON_AGG(data) AS all_data FROM logs GROUP BY user_id",
            parameters: [],
        },
    },
    uuid: {
        "gen_random_uuid": {
            sql: "SELECT GEN_RANDOM_UUID()",
            parameters: [],
        },
        "uuidv4": {
            sql: "SELECT UUIDV4()",
            parameters: [],
        },
        "uuidv7 without shift parameter": {
            sql: "SELECT UUIDV7()",
            parameters: [],
        },
        "uuidv7 with shift parameter": {
            sql: "SELECT UUIDV7($1)",
            parameters: ["1 hour"],
        },
        "uuidv7 with shift parameter using parameter": {
            sql: "SELECT UUIDV7($1)",
            parameters: ["1 hour"],
        },
        "uuid_extract_timestamp": {
            sql: "SELECT UUID_EXTRACT_TIMESTAMP($1)",
            parameters: ["019535d9-3df7-79fb-b466-fa907fa17f9e"],
        },
        "uuid_extract_timestamp with column reference": {
            sql: "SELECT UUID_EXTRACT_TIMESTAMP(id)",
            parameters: [],
        },
        "uuid_extract_version": {
            sql: "SELECT UUID_EXTRACT_VERSION($1)",
            parameters: ["41db1265-8bc1-4ab3-992f-885799a4af1d"],
        },
        "uuid_extract_version with column reference": {
            sql: "SELECT UUID_EXTRACT_VERSION(uuid_col)",
            parameters: [],
        },
        "insert with gen_random_uuid": {
            sql: "INSERT INTO users (id, name) VALUES (GEN_RANDOM_UUID(), $1)",
            parameters: ["John Doe"],
        },
        "query with uuid functions in WHERE clause": {
            sql: "SELECT * FROM users WHERE UUID_EXTRACT_VERSION(id) = $1",
            parameters: [4],
        },
        "query with multiple uuid functions in SELECT": {
            sql: "SELECT GEN_RANDOM_UUID() AS new_uuid, UUIDV4() AS v4_uuid, UUID_EXTRACT_TIMESTAMP(created_at) AS timestamp, UUID_EXTRACT_VERSION(id) AS version FROM users",
            parameters: [],
        },
        "query with uuidv7 and timestamp extraction": {
            sql: "SELECT UUID_EXTRACT_TIMESTAMP(UUIDV7()) AS timestamp",
            parameters: [],
        },
        "query with uuidv7 and shift parameter": {
            sql: "SELECT UUIDV7($1)",
            parameters: ["-5 minutes"],
        },
        "ORDER BY with uuid_extract_timestamp": {
            sql: "SELECT * FROM events ORDER BY UUID_EXTRACT_TIMESTAMP(event_id)",
            parameters: [],
        },
    },
    datetime: {
        "now": {
            sql: "SELECT NOW()",
            parameters: [],
        },
        "age": {
            sql: "SELECT AGE($1, $2)",
            parameters: ["2024-01-01", "2023-01-01"],
        },
        "date_trunc": {
            sql: "SELECT DATE_TRUNC($1, $2)",
            parameters: ["hour", "2024-01-01 08:15:30"],
        },
        "extract": {
            sql: "SELECT EXTRACT(YEAR FROM $1)",
            parameters: ["2024-01-01"],
        },
        "to_char": {
            sql: "SELECT TO_CHAR($1, $2)",
            parameters: ["2024-01-01", "YYYY-MM-DD"],
        },
        "make_timestamp": {
            sql: "SELECT MAKE_TIMESTAMP($1, $2, $3, $4, $5, $6)",
            parameters: [2024, 1, 2, 12, 30, 15],
        },
        "date_bin": {
            sql: "SELECT DATE_BIN($1, $2, $3)",
            parameters: ["15 minutes", "2020-02-11 15:44:17", "2001-01-01"],
        },
        "date_add": {
            sql: "SELECT DATE_ADD($1, $2, $3)",
            parameters: ["2021-10-31 00:00:00+02", "1 day", "Europe/Warsaw"],
        },
        "date_subtract": {
            sql: "SELECT DATE_SUBTRACT($1, $2, $3)",
            parameters: ["2021-11-01 00:00:00+01", "1 day", "Europe/Warsaw"],
        },
        "make_interval": {
            sql: "SELECT MAKE_INTERVAL($1, $2, $3, $4, $5, $6, $7)",
            parameters: [1, 2, 3, 4, 5, 6, 7.5],
        },
        "pg_sleep": {
            sql: "SELECT PG_SLEEP($1)",
            parameters: [1.5],
        },
        "pg_sleep_for": {
            sql: "SELECT PG_SLEEP_FOR($1)",
            parameters: ["5 minutes"],
        },
        "pg_sleep_until": {
            sql: "SELECT PG_SLEEP_UNTIL($1)",
            parameters: ["2024-01-02 03:00:00+00"],
        },
        "current_time with precision": {
            sql: "SELECT CURRENT_TIME($1)",
            parameters: [2],
        },
        "current_timestamp with precision": {
            sql: "SELECT CURRENT_TIMESTAMP($1)",
            parameters: [0],
        },
        "localtime with precision": {
            sql: "SELECT LOCALTIME($1)",
            parameters: [0],
        },
        "localtimestamp with precision": {
            sql: "SELECT LOCALTIMESTAMP($1)",
            parameters: [2],
        },
    },
    math: {
        "abs": {
            sql: "SELECT ABS($1)",
            parameters: [-17.4],
        },
        "log with base": {
            sql: "SELECT LOG($1, $2)",
            parameters: [2, 64],
        },
        "round with scale": {
            sql: "SELECT ROUND($1, $2)",
            parameters: [42.4382, 2],
        },
        "width_bucket": {
            sql: "SELECT WIDTH_BUCKET($1, $2, $3, $4)",
            parameters: [5.35, 0.024, 10.06, 5],
        },
        "random_normal": {
            sql: "SELECT RANDOM_NORMAL($1, $2)",
            parameters: [0, 1],
        },
        "pi": {
            sql: "SELECT PI()",
            parameters: [],
        },
        "atan2d": {
            sql: "SELECT ATAN2D($1, $2)",
            parameters: [1, 0],
        },
    },
    arrays: {
        "cardinality": {
            sql: "SELECT CARDINALITY(arr)",
            parameters: [],
        },
        "unnest": {
            sql: "SELECT UNNEST(arr)",
            parameters: [],
        },
        "unnest with multiple arrays": {
            sql: "SELECT UNNEST(arr1, arr2)",
            parameters: [],
        },
        "array_append": {
            sql: "SELECT ARRAY_APPEND(arr, $1)",
            parameters: [4],
        },
        "array_cat": {
            sql: "SELECT ARRAY_CAT(arr1, arr2)",
            parameters: [],
        },
        "array_dims": {
            sql: "SELECT ARRAY_DIMS(arr)",
            parameters: [],
        },
        "array_fill": {
            sql: "SELECT ARRAY_FILL($1, ARRAY[3,3])",
            parameters: [0],
        },
        "array_fill with lower bounds": {
            sql: "SELECT ARRAY_FILL($1, ARRAY[3,3], ARRAY[2,2])",
            parameters: [0],
        },
        "array_length": {
            sql: "SELECT ARRAY_LENGTH(arr, $1)",
            parameters: [1],
        },
        "array_lower": {
            sql: "SELECT ARRAY_LOWER(arr, $1)",
            parameters: [1],
        },
        "array_ndims": {
            sql: "SELECT ARRAY_NDIMS(arr)",
            parameters: [],
        },
        "array_position": {
            sql: "SELECT ARRAY_POSITION(arr, $1)",
            parameters: ["target"],
        },
        "array_position with start": {
            sql: "SELECT ARRAY_POSITION(arr, $1, $2)",
            parameters: ["target", 2],
        },
        "array_positions": {
            sql: "SELECT ARRAY_POSITIONS(arr, $1)",
            parameters: ["target"],
        },
        "array_prepend": {
            sql: "SELECT ARRAY_PREPEND($1, arr)",
            parameters: [1],
        },
        "array_remove": {
            sql: "SELECT ARRAY_REMOVE(arr, $1)",
            parameters: ["value"],
        },
        "array_replace": {
            sql: "SELECT ARRAY_REPLACE(arr, $1, $2)",
            parameters: ["old", "new"],
        },
        "array_reverse": {
            sql: "SELECT ARRAY_REVERSE(arr)",
            parameters: [],
        },
        "array_sample": {
            sql: "SELECT ARRAY_SAMPLE(arr, $1)",
            parameters: [5],
        },
        "array_shuffle": {
            sql: "SELECT ARRAY_SHUFFLE(arr)",
            parameters: [],
        },
        "array_sort": {
            sql: "SELECT ARRAY_SORT(arr)",
            parameters: [],
        },
        "array_sort with descending": {
            sql: "SELECT ARRAY_SORT(arr, $1)",
            parameters: [true],
        },
        "array_sort with descending and nulls first": {
            sql: "SELECT ARRAY_SORT(arr, $1, $2)",
            parameters: [true, true],
        },
        "array_to_string": {
            sql: "SELECT ARRAY_TO_STRING(arr, $1)",
            parameters: [","],
        },
        "array_to_string with null string": {
            sql: "SELECT ARRAY_TO_STRING(arr, $1, $2)",
            parameters: [",", "NULL"],
        },
        "array_upper": {
            sql: "SELECT ARRAY_UPPER(arr, $1)",
            parameters: [1],
        },
        "trim_array": {
            sql: "SELECT TRIM_ARRAY(arr, $1)",
            parameters: [2],
        },
    },
    conditional: {
        "coalesce with null literal": {
            sql: "SELECT COALESCE($1, $2, $3)",
            parameters: [null, "default", "value"],
        },
        "nullif with equal values": {
            sql: "SELECT NULLIF(test, test)",
            parameters: undefined,
        },
        "greatest with numbers": {
            sql: "SELECT GREATEST($1, $2, $3, $4)",
            parameters: undefined,
        },
        "least with numbers": {
            sql: "SELECT LEAST($1, $2, $3, $4)",
            parameters: undefined,
        },
        "coalesce in select clause": {
            sql: "SELECT id COALESCE(name, $1) FROM users",
            parameters: undefined,
        },
        "nullif with values": {
            sql: "SELECT NULLIF($1, $2)",
            parameters: undefined,
        },
        "greatest with column names": {
            sql: "SELECT GREATEST(price_a, price_b, price_c) FROM products",
            parameters: undefined,
        },
        "least with mixed values": {
            sql: "SELECT LEAST($1, min_price, $2)",
            parameters: undefined,
        },
    },
    xml: {
        "xmlcomment": {
            sql: "SELECT XMLCOMMENT($1)",
            parameters: ["hello"],
        },
        "xmlconcat": {
            sql: "SELECT XMLCONCAT($1, $2)",
            parameters: ["<abc/>", "<bar>foo</bar>"],
        },
        "xmlelement": {
            sql: "SELECT XMLELEMENT(NAME $1, $2)",
            parameters: ["foo","content"],
        },
        "xmlelement with attributes": {
            sql: "SELECT XMLELEMENT(NAME $1, XMLATTRIBUTES(bar AS xyz), $2)",
            parameters: [
                "foo",
                "content"
            ],
        },
        "xmlelement with multiple content": {
            sql: "SELECT XMLELEMENT(NAME $1, $2, $3, $4)",
            parameters: ["foo","content1", "content2", "content3"],
        },
        "xmlattributes": {
            sql: "SELECT XMLATTRIBUTES(a, b AS c)",
            parameters: [],
        },
        "xmlforest": {
            sql: "SELECT XMLFOREST(abc AS foo, \"123\" AS bar)",
            parameters: [],
        },
        "xmlpi": {
            sql: "SELECT XMLPI($1, $2)",
            parameters: ["php", 'echo "hello world";'],
        },
        "xmlroot": {
            sql: "SELECT XMLROOT(XMLPARSE(DOCUMENT $1), VERSION $2, STANDALONE $3)",
            parameters: ["<content>abc</content>", "1.0", "yes"],
        },
        "xmlroot without standalone": {
            sql: "SELECT XMLROOT(XMLPARSE(DOCUMENT $1), VERSION $2)",
            parameters: ["<content>abc</content>", "1.0"],
        },
        "xmlagg": {
            sql: "SELECT XMLAGG(xml_column)",
            parameters: [],
        },
        "xmlExists": {
            sql: "SELECT XMLEXISTS($1 PASSING BY REF xml_data)",
            parameters: ["//town[text() = 'Toronto']"],
        },
        "xmlIsWellFormed": {
            sql: "SELECT XML_IS_WELL_FORMED($1)",
            parameters: ["<test>content</test>"],
        },
        "xmlIsWellFormedDocument": {
            sql: "SELECT XML_IS_WELL_FORMED_DOCUMENT($1)",
            parameters: ["<root>content</root>"],
        },
        "xmlIsWellFormedContent": {
            sql: "SELECT XML_IS_WELL_FORMED_CONTENT($1)",
            parameters: ["<fragment>content</fragment>"],
        },
        "xpath": {
            sql: "SELECT XPATH($1, xml_col, $2)",
            parameters: ["/my:a/text()", "[['my', 'http://example.com']]"],
        },
        "xpathExists": {
            sql: "SELECT XPATH_EXISTS($1, xml_col, $2)",
            parameters: ["/my:a/text()", "[['my', 'http://example.com']]"],
        },
        "tableToXml": {
            sql: "SELECT TABLE_TO_XML($1, $2, $3)",
            parameters: ["my_table", true, false],
        },
        "queryToXml": {
            sql: "SELECT QUERY_TO_XML($1, $2, $3)",
            parameters: ["SELECT * FROM my_table", true, false],
        },
        "cursorToXml": {
            sql: "SELECT CURSOR_TO_XML($1, $2, $3, $4)",
            parameters: ["my_cursor", 10, true, false],
        },
        "tableToXmlschema": {
            sql: "SELECT TABLE_TO_XMLSCHEMA($1, $2, $3)",
            parameters: ["my_table", true, false],
        },
        "queryToXmlschema": {
            sql: "SELECT QUERY_TO_XMLSCHEMA($1, $2, $3)",
            parameters: ["SELECT * FROM my_table", true, false],
        },
        "cursorToXmlschema": {
            sql: "SELECT CURSOR_TO_XMLSCHEMA($1, $2, $3)",
            parameters: ["my_cursor", true, false],
        },
        "tableToXmlAndXmlschema": {
            sql: "SELECT TABLE_TO_XML_AND_XMLSCHEMA($1, $2, $3)",
            parameters: ["my_table", true, false],
        },
        "queryToXmlAndXmlschema": {
            sql: "SELECT QUERY_TO_XML_AND_XMLSCHEMA($1, $2, $3)",
            parameters: ["SELECT * FROM my_table", true, false],
        },
        "schemaToXml": {
            sql: "SELECT SCHEMA_TO_XML($1, $2, $3)",
            parameters: ["public", true, false],
        },
        "schemaToXmlschema": {
            sql: "SELECT SCHEMA_TO_XMLSCHEMA($1, $2, $3)",
            parameters: ["public", true, false],
        },
        "schemaToXmlAndXmlschema": {
            sql: "SELECT SCHEMA_TO_XML_AND_XMLSCHEMA($1, $2, $3)",
            parameters: ["public", true, false],
        },
        "databaseToXml": {
            sql: "SELECT DATABASE_TO_XML($1, $2)",
            parameters: [true, false],
        },
        "databaseToXmlschema": {
            sql: "SELECT DATABASE_TO_XMLSCHEMA($1, $2)",
            parameters: [true, false],
        },
        "databaseToXmlAndXmlschema": {
            sql: "SELECT DATABASE_TO_XML_AND_XMLSCHEMA($1, $2)",
            parameters: [true, false],
        },
    },
    textsearch: {
        "array_to_tsvector": {
            sql: "SELECT ARRAY_TO_TSVECTOR($1)",
            parameters: ["[fat,cat,rat]"],
        },
        "to_tsvector with document only": {
            sql: "SELECT TO_TSVECTOR($1)",
            parameters: ["fat cats"],
        },
        "to_tsvector with config and document": {
            sql: "SELECT TO_TSVECTOR($1, $2)",
            parameters: ["english", "fat cats"],
        },
        "to_tsquery with query only": {
            sql: "SELECT TO_TSQUERY($1)",
            parameters: ["fat & rat"],
        },
        "json_to_tsvector": {
            sql: "SELECT JSON_TO_TSVECTOR($1, $2, $3)",
            parameters: ["english", '{"a": "fat rats"}', "string"],
        },
        "tsvector_to_array": {
            sql: "SELECT TSVECTOR_TO_ARRAY(search_vector)",
            parameters: [],
        },
        "plainto_tsquery with query": {
            sql: "SELECT PLAINTO_TSQUERY($1)",
            parameters: ["The Fat Rats"],
        },
        "plainto_tsquery with config and query": {
            sql: "SELECT PLAINTO_TSQUERY($1, $2)",
            parameters: ["english", "The Fat Rats"],
        },
        "phraseto_tsquery": {
            sql: "SELECT PHRASETO_TSQUERY($1)",
            parameters: ["The Fat Rats"],
        },
        "websearch_to_tsquery": {
            sql: "SELECT WEBSEARCH_TO_TSQUERY($1)",
            parameters: ['"fat rat" or cat'],
        },
        "tsquery_phrase": {
            sql: "SELECT TSQUERY_PHRASE(TO_TSQUERY($1), TO_TSQUERY($2))",
            parameters: ["fat", "cat"],
        },
        "setweight with vector and weight": {
            sql: "SELECT SETWEIGHT(search_vector, $1)",
            parameters: ["A"],
        },
        "strip with tsvector": {
            sql: "SELECT STRIP(search_vector)",
            parameters: [],
        },
        "ts_delete": {
            sql: "SELECT TS_DELETE(search_vector, $1)",
            parameters: ["fat"],
        },
        "ts_filter": {
            sql: "SELECT TS_FILTER(search_vector, $1)",
            parameters: ["{A,B}"],
        },
        "ts_rank with vector and query": {
            sql: "SELECT TS_RANK(search_vector, TO_TSQUERY($1))",
            parameters: ["cat"],
        },
        "ts_rank_cd": {
            sql: "SELECT TS_RANK_CD(search_vector, TO_TSQUERY($1))",
            parameters: ["cat"],
        },
        "ts_headline with document and query": {
            sql: "SELECT TS_HEADLINE($1, TO_TSQUERY($2))",
            parameters: ["The fat cat ate the rat.", "cat"],
        },
        "querytree": {
            sql: "SELECT QUERYTREE(TO_TSQUERY($1))",
            parameters: ["foo & ! bar"],
        },
        "numnode": {
            sql: "SELECT NUMNODE(TO_TSQUERY($1))",
            parameters: ["(fat & rat) | cat"],
        },
        "get_current_ts_config": {
            sql: "SELECT GET_CURRENT_TS_CONFIG()",
            parameters: [],
        },
        "ts_rewrite": {
            sql: "SELECT TS_REWRITE(TO_TSQUERY($1), TO_TSQUERY($2), TO_TSQUERY($3))",
            parameters: ["a & b", "a", "foo|bar"],
        },
        "ts_debug": {
            sql: "SELECT TS_DEBUG($1)",
            parameters: ["The Brightest supernovaes"],
        },
        "ts_lexize": {
            sql: "SELECT TS_LEXIZE($1, $2)",
            parameters: ["english_stem", "stars"],
        },
        "ts_parse": {
            sql: "SELECT TS_PARSE($1, $2)",
            parameters: ["default", "foo - bar"],
        },
        "ts_token_type": {
            sql: "SELECT TS_TOKEN_TYPE($1)",
            parameters: ["default"],
        },
        "ts_stat": {
            sql: "SELECT TS_STAT($1)",
            parameters: ["SELECT vector FROM apod"],
        },
        "text search in WHERE clause": {
            sql: "SELECT * FROM articles WHERE TO_TSVECTOR($1, content) @@ TO_TSQUERY($2, $3)",
            parameters: ["english", "fat", "cat"],
        },
        "ranking in SELECT clause": {
            sql: "SELECT TS_RANK(search_vector, TO_TSQUERY($1)) AS rank FROM articles",
            parameters: ["cat"],
        },
        "headline in SELECT clause": {
            sql: "SELECT TS_HEADLINE(content, TO_TSQUERY($1), $2) AS snippet FROM articles",
            parameters: ["cat", "MaxWords=20"],
        },
        "should accept no arguments": {
            sql: "SELECT TO_TSQUERY()",
            parameters: [],
        },
        "should accept single argument (query) to_tsquery": {
            sql: "SELECT TO_TSQUERY($1)",
            parameters: ["fat & rat"],
        },
        "should accept two arguments (config, query) to_tsquery": {
            sql: "SELECT TO_TSQUERY($1, $2)",
            parameters: ["english", "fat & rat"],
        },
        "should accept single argument (document) to_tsvector": {
            sql: "SELECT TO_TSVECTOR($1)",
            parameters: ["fat cats"],
        },
        "should accept two arguments (config, document) to_tsvector": {
            sql: "SELECT TO_TSVECTOR($1, $2)",
            parameters: ["english", "fat cats"],
        },
        "should accept single argument (query) plainto_tsquery": {
            sql: "SELECT PLAINTO_TSQUERY($1)",
            parameters: ["The Fat Rats"],
        },
        "should accept two arguments (config, query) plainto_tsquery": {
            sql: "SELECT PLAINTO_TSQUERY($1, $2)",
            parameters: ["english", "The Fat Rats"],
        },
        "should accept two arguments (vector, query) tsRank": {
            sql: "SELECT TS_RANK(search_vector, TO_TSQUERY($1))",
            parameters: ["cat"],
        },
        "should accept three arguments (vector, query, normalization) tsRank": {
            sql: "SELECT TS_RANK(search_vector, TO_TSQUERY($1), $2)",
            parameters: ["cat", 2],
        },
        "should accept four arguments (weights, vector, query, normalization) tsRank": {
            sql: "SELECT TS_RANK($1, search_vector, TO_TSQUERY($2), $3)",
            parameters: ["{0.1,0.2,0.4,1.0}", "cat", 2],
        },
        "should accept two arguments (document, query) tsHeadline": {
            sql: "SELECT TS_HEADLINE($1, TO_TSQUERY($2))",
            parameters: ["The fat cat", "cat"],
        },
        "should accept three arguments (config, document, query) tsHeadline": {
            sql: "SELECT TS_HEADLINE($1, $2, TO_TSQUERY($3))",
            parameters: ["english", "The fat cat", "cat"],
        },
        "should accept single argument (document) tsDebug": {
            sql: "SELECT TS_DEBUG($1)",
            parameters: ["The Brightest supernovaes"],
        },
        "should accept two arguments (config, document) tsDebug": {
            sql: "SELECT TS_DEBUG($1, $2)",
            parameters: ["english", "The Brightest supernovaes"],
        },
    },
    window: {
        "rowNumber": {
            sql: "SELECT ROW_NUMBER()",
            parameters: undefined,
        },
        "ntile with parameter": {
            sql: "SELECT NTILE($1)",
            parameters: [4],
        },
        "lag with value only": {
            sql: "SELECT LAG(salary)",
            parameters: [],
        },
        "lag with offset": {
            sql: "SELECT LAG(salary, $1)",
            parameters: [1],
        },
        "lag with offset and default": {
            sql: "SELECT LAG(salary, $1, $2)",
            parameters: [1, 0],
        },
        "lead with value only": {
            sql: "SELECT LEAD(salary)",
            parameters: [],
        },
        "lead with offset and default": {
            sql: "SELECT LEAD(salary, $1, $2)",
            parameters: [1, 0],
        },
        "firstValue": {
            sql: "SELECT FIRST_VALUE(salary)",
            parameters: [],
        },
        "lastValue": {
            sql: "SELECT LAST_VALUE(salary)",
            parameters: [],
        },
        "nthValue": {
            sql: "SELECT NTH_VALUE(salary, $1)",
            parameters: [2],
        },
        "over empty": {
            sql: "SELECT ROW_NUMBER() OVER",
            parameters: [],
        },
        "over with partition by": {
            sql: "SELECT ROW_NUMBER() OVER (PARTITION BY department_id)",
            parameters: [],
        },
        "over with partition by and order by": {
            sql: "SELECT ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC)",
            parameters: [],
        },
        "over with order by only": {
            sql: "SELECT ROW_NUMBER() OVER (ORDER BY salary DESC)",
            parameters: [],
        },
    },
    setReturning: {
        "generate_series(start, stop)": {
            sql: "SELECT GENERATE_SERIES($1, $2)",
            parameters: [1, 10],
        },
        "generate_series(start, stop, step)": {
            sql: "SELECT GENERATE_SERIES($1, $2, $3)",
            parameters: [1, 10, 2],
        },
        "generate_series with numeric values": {
            sql: "SELECT GENERATE_SERIES($1, $2, $3)",
            parameters: [1.5, 10.5, 0.5],
        },
        "generate_series with timestamp values using raw": {
            sql: "SELECT GENERATE_SERIES(CAST('2008-03-01 00:00:00' AS timestamp), CAST('2008-03-04 12:00:00' AS timestamp), CAST('10 hours' AS interval))",
            parameters: [],
        },
        "generate_series with identifier reference": {
            sql: "SELECT GENERATE_SERIES(start_val, end_val, step_val)",
            parameters: [],
        },
        "generate_subscripts(array, dim)": {
            sql: "SELECT GENERATE_SUBSCRIPTS(arr, $1)",
            parameters: [1],
        },
        "generate_subscripts(array, dim, reverse)": {
            sql: "SELECT GENERATE_SUBSCRIPTS(arr, $1, $2)",
            parameters: [1, true],
        },
        "generate_subscripts with 2D array": {
            sql: "SELECT GENERATE_SUBSCRIPTS(matrix, $1)",
            parameters: [2],
        },
        "generate_subscripts with reverse for second dimension": {
            sql: "SELECT GENERATE_SUBSCRIPTS(matrix, $1, $2)",
            parameters: [2, true],
        },
        "generate_series in FROM clause": {
            sql: "SELECT * FROM GENERATE_SERIES($1, $2) AS n",
            parameters: [1, 5],
        },
        "generate_series with alias in SELECT": {
            sql: "SELECT GENERATE_SERIES($1, $2) AS series",
            parameters: [1, 3],
        },
        "multiple SRF in same query": {
            sql: "SELECT GENERATE_SERIES($1, $2) AS series, GENERATE_SUBSCRIPTS(arr, $3) AS subscripts",
            parameters: [1, 3, 1],
        },
    },
    range: {
        "lower for range": {
            sql: "SELECT LOWER(price_range)",
            parameters: [],
        },
        "upper for range": {
            sql: "SELECT UPPER(date_range)",
            parameters: [],
        },
        "isempty for range": {
            sql: "SELECT ISEMPTY(time_range)",
            parameters: [],
        },
        "lowerInc for range": {
            sql: "SELECT LOWER_INC(num_range)",
            parameters: [],
        },
        "upperInc for range": {
            sql: "SELECT UPPER_INC(ts_range)",
            parameters: [],
        },
        "lowerInf for range": {
            sql: "SELECT LOWER_INF(int_range)",
            parameters: [],
        },
        "upperInf for range": {
            sql: "SELECT UPPER_INF(bigint_range)",
            parameters: [],
        },
        "rangeMerge": {
            sql: "SELECT RANGE_MERGE(range1, range2)",
            parameters: [],
        },
        "multirange": {
            sql: "SELECT MULTIRANGE(single_range)",
            parameters: [],
        },
        "multirangeLower": {
            sql: "SELECT LOWER(price_multirange)",
            parameters: [],
        },
        "multirangeUpper": {
            sql: "SELECT UPPER(date_multirange)",
            parameters: [],
        },
        "multirangeIsempty": {
            sql: "SELECT ISEMPTY(time_multirange)",
            parameters: [],
        },
        "multirangeLowerInc": {
            sql: "SELECT LOWER_INC(num_multirange)",
            parameters: [],
        },
        "multirangeUpperInc": {
            sql: "SELECT UPPER_INC(ts_multirange)",
            parameters: [],
        },
        "multirangeLowerInf": {
            sql: "SELECT LOWER_INF(int_multirange)",
            parameters: [],
        },
        "multirangeUpperInf": {
            sql: "SELECT UPPER_INF(bigint_multirange)",
            parameters: [],
        },
        "multirangeRangeMerge": {
            sql: "SELECT RANGE_MERGE(mr)",
            parameters: [],
        },
        "unnestMultirange": {
            sql: "SELECT UNNEST(my_multirange)",
            parameters: [],
        },
    },
    trigger: {
        "SUPPRESS_REDUNDANT_UPDATES_TRIGGER": {
            sql: "SELECT SUPPRESS_REDUNDANT_UPDATES_TRIGGER()",
            parameters: [],
        },
        "TSVECTOR_UPDATE_TRIGGER with config name": {
            sql: "SELECT TSVECTOR_UPDATE_TRIGGER($1, $2, $3, $4)",
            parameters: ["search_vector", "pg_catalog.english", "title", "body"],
        },
        "TSVECTOR_UPDATE_TRIGGER_column with config column": {
            sql: "SELECT TSVECTOR_UPDATE_TRIGGER_COLUMN($1, $2, $3, $4)",
            parameters: ["search_vector", "config_column", "title", "content"],
        },
        "TSVECTOR_UPDATE_TRIGGER with variable columns": {
            sql: "SELECT TSVECTOR_UPDATE_TRIGGER($1, $2, $3, $4, $5, $6)",
            parameters: ["sv", "english", "a", "b", "c", "d"],
        },
    },
    eventTrigger: {
        "pg_event_trigger_ddl_commands": {
            sql: "SELECT PG_EVENT_TRIGGER_DDL_COMMANDS()",
            parameters: [],
        },
        "pg_event_trigger_dropped_objects": {
            sql: "SELECT PG_EVENT_TRIGGER_DROPPED_OBJECTS()",
            parameters: [],
        },
        "pg_event_trigger_table_rewrite_oid": {
            sql: "SELECT PG_EVENT_TRIGGER_TABLE_REWRITE_OID()",
            parameters: [],
        },
        "pg_event_trigger_table_rewrite_reason": {
            sql: "SELECT PG_EVENT_TRIGGER_TABLE_REWRITE_REASON()",
            parameters: [],
        },
    },
    merge: {
        "merge_action": {
            sql: "SELECT MERGE_ACTION()",
            parameters: [],
        },
        "merge_action with alias": {
            sql: "SELECT MERGE_ACTION() AS action",
            parameters: [],
        },
        "query with merge_action and other columns": {
            sql: "SELECT MERGE_ACTION() AS action_type, product_id, in_stock, quantity FROM products",
            parameters: [],
        },
    },
    info: {
        "current_database": {
            sql: "SELECT CURRENT_DATABASE()",
            parameters: undefined,
        },
        "current_query": {
            sql: "SELECT CURRENT_QUERY()",
            parameters: undefined,
        },
        "current_schemas": {
            sql: "SELECT CURRENT_SCHEMAS($1)",
            parameters: [true],
        },
        "inet_client_addr": {
            sql: "SELECT INET_CLIENT_ADDR()",
            parameters: undefined,
        },
        "inet_client_port": {
            sql: "SELECT INET_CLIENT_PORT()",
            parameters: undefined,
        },
        "inet_server_addr": {
            sql: "SELECT INET_SERVER_ADDR()",
            parameters: undefined,
        },
        "inet_server_port": {
            sql: "SELECT INET_SERVER_PORT()",
            parameters: undefined,
        },
        "pg_backend_pid": {
            sql: "SELECT PG_BACKEND_PID()",
            parameters: undefined,
        },
        "pg_blocking_pids": {
            sql: "SELECT PG_BLOCKING_PIDS($1)",
            parameters: [12345],
        },
        "pg_conf_load_time": {
            sql: "SELECT PG_CONF_LOAD_TIME()",
            parameters: undefined,
        },
        "pg_current_logfile": {
            sql: "SELECT PG_CURRENT_LOGFILE($1)",
            parameters: ["stderr"],
        },
        "pg_get_loaded_modules": {
            sql: "SELECT PG_GET_LOADED_MODULES()",
            parameters: undefined,
        },
        "pg_my_temp_schema": {
            sql: "SELECT PG_MY_TEMP_SCHEMA()",
            parameters: undefined,
        },
        "pg_is_other_temp_schema": {
            sql: "SELECT PG_IS_OTHER_TEMP_SCHEMA($1)",
            parameters: [12345],
        },
        "pg_jit_available": {
            sql: "SELECT PG_JIT_AVAILABLE()",
            parameters: undefined,
        },
        "pg_numa_available": {
            sql: "SELECT PG_NUMA_AVAILABLE()",
            parameters: undefined,
        },
        "pg_listening_channels": {
            sql: "SELECT PG_LISTENING_CHANNELS()",
            parameters: undefined,
        },
        "pg_notification_queue_usage": {
            sql: "SELECT PG_NOTIFICATION_QUEUE_USAGE()",
            parameters: undefined,
        },
        "pg_postmaster_start_time": {
            sql: "SELECT PG_POSTMASTER_START_TIME()",
            parameters: undefined,
        },
        "pg_safe_snapshot_blocking_pids": {
            sql: "SELECT PG_SAFE_SNAPSHOT_BLOCKING_PIDS($1)",
            parameters: [12345],
        },
        "pg_trigger_depth": {
            sql: "SELECT PG_TRIGGER_DEPTH()",
            parameters: undefined,
        },
        "has_any_column_privilege with table and privilege": {
            sql: "SELECT HAS_ANY_COLUMN_PRIVILEGE(users, $1)",
            parameters: ["SELECT"],
        },
        "has_any_column_privilege with user table and privilege": {
            sql: "SELECT HAS_ANY_COLUMN_PRIVILEGE($1, users, $2)",
            parameters: ["current_user", "SELECT"],
        },
        "has_column_privilege": {
            sql: "SELECT HAS_COLUMN_PRIVILEGE(users, id, $1)",
            parameters: ["SELECT"],
        },
        "has_database_privilege": {
            sql: "SELECT HAS_DATABASE_PRIVILEGE($1, $2)",
            parameters: ["mydb", "CREATE"],
        },
        "has_function_privilege": {
            sql: "SELECT HAS_FUNCTION_PRIVILEGE($1, $2)",
            parameters: ["calculate", "EXECUTE"],
        },
        "has_language_privilege": {
            sql: "SELECT HAS_LANGUAGE_PRIVILEGE($1, $2)",
            parameters: ["plpgsql", "USAGE"],
        },
        "has_schema_privilege": {
            sql: "SELECT HAS_SCHEMA_PRIVILEGE($1, $2)",
            parameters: ["public", "CREATE"],
        },
        "has_sequence_privilege": {
            sql: "SELECT HAS_SEQUENCE_PRIVILEGE(user_id_seq, $1)",
            parameters: ["USAGE"],
        },
        "has_table_privilege": {
            sql: "SELECT HAS_TABLE_PRIVILEGE(users, $1)",
            parameters: ["INSERT"],
        },
        "has_tablespace_privilege": {
            sql: "SELECT HAS_TABLESPACE_PRIVILEGE($1, $2)",
            parameters: ["pg_default", "CREATE"],
        },
        "has_type_privilege": {
            sql: "SELECT HAS_TYPE_PRIVILEGE(my_type, $1)",
            parameters: ["USAGE"],
        },
        "pg_has_role": {
            sql: "SELECT PG_HAS_ROLE($1, $2)",
            parameters: ["postgres", "MEMBER"],
        },
        "row_security_active": {
            sql: "SELECT ROW_SECURITY_ACTIVE(users)",
            parameters: undefined,
        },
        "acldefault": {
            sql: "SELECT ACLDEFAULT($1, $2)",
            parameters: ["TABLE", 1],
        },
        "aclexplode": {
            sql: "SELECT ACLEXPLODE(users.acl)",
            parameters: undefined,
        },
        "makeaclitem": {
            sql: "SELECT MAKEACLITEM($1, $2, $3, $4)",
            parameters: [1, 2, "SELECT", false],
        },
        "pg_collation_is_visible": {
            sql: "SELECT PG_COLLATION_IS_VISIBLE($1)",
            parameters: ["en_US"],
        },
        "pg_conversion_is_visible": {
            sql: "SELECT PG_CONVERSION_IS_VISIBLE($1)",
            parameters: ["latin1_to_utf8"],
        },
        "pg_function_is_visible": {
            sql: "SELECT PG_FUNCTION_IS_VISIBLE($1)",
            parameters: ["calculate"],
        },
        "pg_table_is_visible": {
            sql: "SELECT PG_TABLE_IS_VISIBLE(users)",
            parameters: undefined,
        },
        "pg_type_is_visible": {
            sql: "SELECT PG_TYPE_IS_VISIBLE($1)",
            parameters: ["my_type"],
        },
        "format_type": {
            sql: "SELECT FORMAT_TYPE($1, $2)",
            parameters: ["integer", -1],
        },
        "pg_get_constraintdef": {
            sql: "SELECT PG_GET_CONSTRAINTDEF($1)",
            parameters: [12345],
        },
        "pg_get_functiondef": {
            sql: "SELECT PG_GET_FUNCTIONDEF($1)",
            parameters: ["calculate"],
        },
        "pg_get_indexdef": {
            sql: "SELECT PG_GET_INDEXDEF($1)",
            parameters: [12345],
        },
        "pg_get_keywords": {
            sql: "SELECT PG_GET_KEYWORDS()",
            parameters: undefined,
        },
        "pg_get_ruledef": {
            sql: "SELECT PG_GET_RULEDEF($1)",
            parameters: [12345],
        },
        "pg_get_serial_sequence": {
            sql: "SELECT PG_GET_SERIAL_SEQUENCE(users, id)",
            parameters: undefined,
        },
        "pg_get_triggerdef": {
            sql: "SELECT PG_GET_TRIGGERDEF($1)",
            parameters: [12345],
        },
        "pg_get_userbyid": {
            sql: "SELECT PG_GET_USERBYID($1)",
            parameters: [1],
        },
        "pg_get_viewdef": {
            sql: "SELECT PG_GET_VIEWDEF(my_view)",
            parameters: undefined,
        },
        "pg_index_has_property": {
            sql: "SELECT PG_INDEX_HAS_PROPERTY($1, $2)",
            parameters: [12345, "clusterable"],
        },
        "pg_tablespace_location": {
            sql: "SELECT PG_TABLESPACE_LOCATION($1)",
            parameters: ["pg_default"],
        },
        "pg_typeof override": {
            sql: "SELECT PG_TYPEOF($1)",
            parameters: [42],
        },
        "to_regclass": {
            sql: "SELECT TO_REGCLASS($1)",
            parameters: ["users"],
        },
        "to_regtype": {
            sql: "SELECT TO_REGTYPE($1)",
            parameters: ["integer"],
        },
        "pg_get_acl": {
            sql: "SELECT PG_GET_ACL($1, $2, $3)",
            parameters: ["pg_class", 12345, 0],
        },
        "pg_describe_object": {
            sql: "SELECT PG_DESCRIBE_OBJECT($1, $2, $3)",
            parameters: ["pg_class", 12345, 0],
        },
        "pg_identify_object": {
            sql: "SELECT PG_IDENTIFY_OBJECT($1, $2, $3)",
            parameters: ["pg_class", 12345, 0],
        },
        "col_description": {
            sql: "SELECT COL_DESCRIPTION(users, id)",
            parameters: undefined,
        },
        "obj_description": {
            sql: "SELECT OBJ_DESCRIPTION($1, $2)",
            parameters: [12345, "pg_class"],
        },
        "shobj_description": {
            sql: "SELECT SHOBJ_DESCRIPTION($1, $2)",
            parameters: [12345, "pg_database"],
        },
        "pg_input_is_valid": {
            sql: "SELECT PG_INPUT_IS_VALID($1, $2)",
            parameters: ["123", "integer"],
        },
        "pg_input_error_info": {
            sql: "SELECT PG_INPUT_ERROR_INFO($1, $2)",
            parameters: ["abc", "integer"],
        },
        "age (transaction ID)": {
            sql: "SELECT AGE($1)",
            parameters: ["12345"],
        },
        "mxid_age": {
            sql: "SELECT MXID_AGE($1)",
            parameters: ["12345"],
        },
        "pg_current_xact_id": {
            sql: "SELECT PG_CURRENT_XACT_ID()",
            parameters: undefined,
        },
        "pg_current_xact_id_if_assigned": {
            sql: "SELECT PG_CURRENT_XACT_ID_IF_ASSIGNED()",
            parameters: undefined,
        },
        "pg_xact_status": {
            sql: "SELECT PG_XACT_STATUS($1)",
            parameters: ["12345"],
        },
        "pg_current_snapshot": {
            sql: "SELECT PG_CURRENT_SNAPSHOT()",
            parameters: undefined,
        },
        "pg_snapshot_xip": {
            sql: "SELECT PG_SNAPSHOT_XIP(PG_CURRENT_SNAPSHOT())",
            parameters: undefined,
        },
        "pg_snapshot_xmax": {
            sql: "SELECT PG_SNAPSHOT_XMAX(PG_CURRENT_SNAPSHOT())",
            parameters: undefined,
        },
        "pg_snapshot_xmin": {
            sql: "SELECT PG_SNAPSHOT_XMIN(PG_CURRENT_SNAPSHOT())",
            parameters: undefined,
        },
        "pg_visible_in_snapshot": {
            sql: "SELECT PG_VISIBLE_IN_SNAPSHOT($1, PG_CURRENT_SNAPSHOT())",
            parameters: ["12345"],
        },
        "pg_get_multixact_members": {
            sql: "SELECT PG_GET_MULTIXACT_MEMBERS($1)",
            parameters: ["12345"],
        },
        "txid_current": {
            sql: "SELECT TXID_CURRENT()",
            parameters: undefined,
        },
        "txid_current_snapshot": {
            sql: "SELECT TXID_CURRENT_SNAPSHOT()",
            parameters: undefined,
        },
        "txid_status": {
            sql: "SELECT TXID_STATUS($1)",
            parameters: ["12345"],
        },
        "pg_xact_commit_timestamp": {
            sql: "SELECT PG_XACT_COMMIT_TIMESTAMP($1)",
            parameters: ["12345"],
        },
        "pg_xact_commit_timestamp_origin": {
            sql: "SELECT PG_XACT_COMMIT_TIMESTAMP_ORIGIN($1)",
            parameters: ["12345"],
        },
        "pg_last_committed_xact": {
            sql: "SELECT PG_LAST_COMMITTED_XACT()",
            parameters: undefined,
        },
        "pg_control_checkpoint": {
            sql: "SELECT PG_CONTROL_CHECKPOINT()",
            parameters: undefined,
        },
        "pg_control_system": {
            sql: "SELECT PG_CONTROL_SYSTEM()",
            parameters: undefined,
        },
        "pg_control_init": {
            sql: "SELECT PG_CONTROL_INIT()",
            parameters: undefined,
        },
        "pg_control_recovery": {
            sql: "SELECT PG_CONTROL_RECOVERY()",
            parameters: undefined,
        },
        "unicode_version override": {
            sql: "SELECT UNICODE_VERSION()",
            parameters: undefined,
        },
        "icu_unicode_version": {
            sql: "SELECT ICU_UNICODE_VERSION()",
            parameters: undefined,
        },
        "pg_available_wal_summaries": {
            sql: "SELECT PG_AVAILABLE_WAL_SUMMARIES()",
            parameters: undefined,
        },
        "pg_wal_summary_contents": {
            sql: "SELECT PG_WAL_SUMMARY_CONTENTS($1, $2, $3)",
            parameters: [1, "0/0", "0/100"],
        },
        "pg_get_wal_summarizer_state": {
            sql: "SELECT PG_GET_WAL_SUMMARIZER_STATE()",
            parameters: undefined,
        },
        "query with info function in SELECT clause": {
            sql: "SELECT id, CURRENT_DATABASE() AS db, SESSION_USER AS session_user_name FROM users",
            parameters: undefined,
        },
        "query with privilege check in WHERE clause": {
            sql: "SELECT * FROM table_names WHERE HAS_TABLE_PRIVILEGE($1, table_names, $2)",
            parameters: ["current_user", "SELECT"],
        },
        "query with pg_typeof in SELECT": {
            sql: "SELECT id, PG_TYPEOF(id) AS type FROM users",
            parameters: undefined,
        },
        "query with multiple session info functions": {
            sql: "SELECT CURRENT_DATABASE(), CURRENT_USER, PG_BACKEND_PID(), INET_CLIENT_ADDR()",
            parameters: undefined,
        },
    },
    admin: {
        "current_setting": {
            sql: "SELECT CURRENT_SETTING($1)",
            parameters: ["datestyle"],
        },
        "current_setting with missing_ok": {
            sql: "SELECT CURRENT_SETTING($1, $2)",
            parameters: ["unknown_setting", true],
        },
        "set_config": {
            sql: "SELECT SET_CONFIG($1, $2, $3)",
            parameters: ["datestyle", "ISO, MDY", false],
        },
        "pg_cancel_backend": {
            sql: "SELECT PG_CANCEL_BACKEND($1)",
            parameters: [12345],
        },
        "pg_log_backend_memory_contexts": {
            sql: "SELECT PG_LOG_BACKEND_MEMORY_CONTEXTS($1)",
            parameters: [12345],
        },
        "pg_reload_conf": {
            sql: "SELECT PG_RELOAD_CONF()",
            parameters: [],
        },
        "pg_rotate_logfile": {
            sql: "SELECT PG_ROTATE_LOGFILE()",
            parameters: [],
        },
        "pg_terminate_backend": {
            sql: "SELECT PG_TERMINATE_BACKEND($1)",
            parameters: [12345],
        },
        "pg_terminate_backend with timeout": {
            sql: "SELECT PG_TERMINATE_BACKEND($1, $2)",
            parameters: [12345, 5000],
        },
        "pg_create_restore_point": {
            sql: "SELECT PG_CREATE_RESTORE_POINT($1)",
            parameters: ["my_restore_point"],
        },
        "pg_current_wal_flush_lsn": {
            sql: "SELECT PG_CURRENT_WAL_FLUSH_LSN()",
            parameters: [],
        },
        "pg_current_wal_insert_lsn": {
            sql: "SELECT PG_CURRENT_WAL_INSERT_LSN()",
            parameters: [],
        },
        "pg_current_wal_lsn": {
            sql: "SELECT PG_CURRENT_WAL_LSN()",
            parameters: [],
        },
        "pg_backup_start": {
            sql: "SELECT PG_BACKUP_START($1, $2)",
            parameters: ["my_backup", false],
        },
        "pg_backup_stop": {
            sql: "SELECT PG_BACKUP_STOP($1)",
            parameters: [true],
        },
        "pg_switch_wal": {
            sql: "SELECT PG_SWITCH_WAL()",
            parameters: [],
        },
        "pg_walfile_name": {
            sql: "SELECT PG_WALFILE_NAME($1)",
            parameters: ["0/16A4400"],
        },
        "pg_walfile_name_offset": {
            sql: "SELECT PG_WALFILE_NAME_OFFSET($1)",
            parameters: ["0/16A4400"],
        },
        "pg_split_walfile_name": {
            sql: "SELECT PG_SPLIT_WALFILE_NAME($1)",
            parameters: ["000000010000000000000001"],
        },
        "pg_wal_lsn_diff": {
            sql: "SELECT PG_WAL_LSN_DIFF($1, $2)",
            parameters: ["0/16A4400", "0/16A3218"],
        },
        "pg_is_in_recovery": {
            sql: "SELECT PG_IS_IN_RECOVERY()",
            parameters: [],
        },
        "pg_last_wal_receive_lsn": {
            sql: "SELECT PG_LAST_WAL_RECEIVE_LSN()",
            parameters: [],
        },
        "pg_last_wal_replay_lsn": {
            sql: "SELECT PG_LAST_WAL_REPLAY_LSN()",
            parameters: [],
        },
        "pg_last_xact_replay_timestamp": {
            sql: "SELECT PG_LAST_XACT_REPLAY_TIMESTAMP()",
            parameters: [],
        },
        "pg_get_wal_resource_managers": {
            sql: "SELECT PG_GET_WAL_RESOURCE_MANAGERS()",
            parameters: [],
        },
        "pg_is_wal_replay_paused": {
            sql: "SELECT PG_IS_WAL_REPLAY_PAUSED()",
            parameters: [],
        },
        "pg_get_wal_replay_pause_state": {
            sql: "SELECT PG_GET_WAL_REPLAY_PAUSE_STATE()",
            parameters: [],
        },
        "pg_promote": {
            sql: "SELECT PG_PROMOTE()",
            parameters: [],
        },
        "pg_promote with wait": {
            sql: "SELECT PG_PROMOTE($1)",
            parameters: [true],
        },
        "pg_promote with wait and wait_seconds": {
            sql: "SELECT PG_PROMOTE($1, $2)",
            parameters: [true, 30],
        },
        "pg_wal_replay_pause": {
            sql: "SELECT PG_WAL_REPLAY_PAUSE()",
            parameters: [],
        },
        "pg_wal_replay_resume": {
            sql: "SELECT PG_WAL_REPLAY_RESUME()",
            parameters: [],
        },
        "pg_export_snapshot": {
            sql: "SELECT PG_EXPORT_SNAPSHOT()",
            parameters: [],
        },
        "pg_log_standby_snapshot": {
            sql: "SELECT PG_LOG_STANDBY_SNAPSHOT()",
            parameters: [],
        },
        "pg_create_physical_replication_slot": {
            sql: "SELECT PG_CREATE_PHYSICAL_REPLICATION_SLOT($1)",
            parameters: ["my_slot"],
        },
        "pg_drop_replication_slot": {
            sql: "SELECT PG_DROP_REPLICATION_SLOT($1)",
            parameters: ["my_slot"],
        },
        "pg_create_logical_replication_slot": {
            sql: "SELECT PG_CREATE_LOGICAL_REPLICATION_SLOT($1, $2)",
            parameters: ["my_slot", "pgoutput"],
        },
        "pg_copy_physical_replication_slot": {
            sql: "SELECT PG_COPY_PHYSICAL_REPLICATION_SLOT($1, $2)",
            parameters: ["src_slot", "dst_slot"],
        },
        "pg_copy_logical_replication_slot": {
            sql: "SELECT PG_COPY_LOGICAL_REPLICATION_SLOT($1, $2)",
            parameters: ["src_slot", "dst_slot"],
        },
        "pg_logical_slot_get_changes": {
            sql: "SELECT PG_LOGICAL_SLOT_GET_CHANGES($1, $2, $3)",
            parameters: ["my_slot", "0/16A4400", 10],
        },
        "pg_logical_slot_peek_changes": {
            sql: "SELECT PG_LOGICAL_SLOT_PEEK_CHANGES($1, $2, $3)",
            parameters: ["my_slot", "0/16A4400", 10],
        },
        "pg_replication_slot_advance": {
            sql: "SELECT PG_REPLICATION_SLOT_ADVANCE($1, $2)",
            parameters: ["my_slot", "0/16A4400"],
        },
        "pg_replication_origin_create": {
            sql: "SELECT PG_REPLICATION_ORIGIN_CREATE($1)",
            parameters: ["my_origin"],
        },
        "pg_replication_origin_drop": {
            sql: "SELECT PG_REPLICATION_ORIGIN_DROP($1)",
            parameters: ["my_origin"],
        },
        "pg_replication_origin_oid": {
            sql: "SELECT PG_REPLICATION_ORIGIN_OID($1)",
            parameters: ["my_origin"],
        },
        "pg_replication_origin_session_setup": {
            sql: "SELECT PG_REPLICATION_ORIGIN_SESSION_SETUP($1)",
            parameters: ["my_origin"],
        },
        "pg_replication_origin_session_reset": {
            sql: "SELECT PG_REPLICATION_ORIGIN_SESSION_RESET()",
            parameters: [],
        },
        "pg_replication_origin_session_is_setup": {
            sql: "SELECT PG_REPLICATION_ORIGIN_SESSION_IS_SETUP()",
            parameters: [],
        },
        "pg_replication_origin_session_progress": {
            sql: "SELECT PG_REPLICATION_ORIGIN_SESSION_PROGRESS($1)",
            parameters: [true],
        },
        "pg_replication_origin_xact_setup": {
            sql: "SELECT PG_REPLICATION_ORIGIN_XACT_SETUP($1, $2)",
            parameters: ["0/16A4400", "2023-01-01 00:00:00"],
        },
        "pg_replication_origin_xact_reset": {
            sql: "SELECT PG_REPLICATION_ORIGIN_XACT_RESET()",
            parameters: [],
        },
        "pg_replication_origin_advance": {
            sql: "SELECT PG_REPLICATION_ORIGIN_ADVANCE($1, $2)",
            parameters: ["my_origin", "0/16A4400"],
        },
        "pg_replication_origin_progress": {
            sql: "SELECT PG_REPLICATION_ORIGIN_PROGRESS($1, $2)",
            parameters: ["my_origin", true],
        },
        "pg_logical_emit_message": {
            sql: "SELECT PG_LOGICAL_EMIT_MESSAGE($1, $2, $3)",
            parameters: [true, "prefix", "message"],
        },
        "pg_sync_replication_slots": {
            sql: "SELECT PG_SYNC_REPLICATION_SLOTS()",
            parameters: [],
        },
        "pg_column_size": {
            sql: "SELECT PG_COLUMN_SIZE(my_column)",
            parameters: [],
        },
        "pg_column_compression": {
            sql: "SELECT PG_COLUMN_COMPRESSION(my_column)",
            parameters: [],
        },
        "pg_column_toast_chunk_id": {
            sql: "SELECT PG_COLUMN_TOAST_CHUNK_ID(my_column)",
            parameters: [],
        },
        "pg_database_size": {
            sql: "SELECT PG_DATABASE_SIZE($1)",
            parameters: ["mydb"],
        },
        "pg_indexes_size": {
            sql: "SELECT PG_INDEXES_SIZE(my_table)",
            parameters: [],
        },
        "pg_relation_size": {
            sql: "SELECT PG_RELATION_SIZE(my_table)",
            parameters: [],
        },
        "pg_relation_size with fork": {
            sql: "SELECT PG_RELATION_SIZE(my_table, $1)",
            parameters: ["main"],
        },
        "pg_size_bytes": {
            sql: "SELECT PG_SIZE_BYTES($1)",
            parameters: ["10 GB"],
        },
        "pg_size_pretty": {
            sql: "SELECT PG_SIZE_PRETTY($1)",
            parameters: [10737418240],
        },
        "pg_table_size": {
            sql: "SELECT PG_TABLE_SIZE(my_table)",
            parameters: [],
        },
        "pg_tablespace_size": {
            sql: "SELECT PG_TABLESPACE_SIZE($1)",
            parameters: ["pg_default"],
        },
        "pg_total_relation_size": {
            sql: "SELECT PG_TOTAL_RELATION_SIZE(my_table)",
            parameters: [],
        },
        "pg_relation_filenode": {
            sql: "SELECT PG_RELATION_FILENODE(my_table)",
            parameters: [],
        },
        "pg_relation_filepath": {
            sql: "SELECT PG_RELATION_FILEPATH(my_table)",
            parameters: [],
        },
        "pg_filenode_relation": {
            sql: "SELECT PG_FILENODE_RELATION($1, $2)",
            parameters: ["pg_default", 12345],
        },
        "pg_collation_actual_version": {
            sql: "SELECT PG_COLLATION_ACTUAL_VERSION($1)",
            parameters: ["en_US"],
        },
        "pg_database_collation_actual_version": {
            sql: "SELECT PG_DATABASE_COLLATION_ACTUAL_VERSION($1)",
            parameters: ["mydb"],
        },
        "pg_import_system_collations": {
            sql: "SELECT PG_IMPORT_SYSTEM_COLLATIONS($1)",
            parameters: ["public"],
        },
        "pg_partition_tree": {
            sql: "SELECT PG_PARTITION_TREE(my_table)",
            parameters: [],
        },
        "pg_partition_ancestors": {
            sql: "SELECT PG_PARTITION_ANCESTORS(my_table)",
            parameters: [],
        },
        "pg_partition_root": {
            sql: "SELECT PG_PARTITION_ROOT(my_table)",
            parameters: [],
        },
        "brin_summarize_new_values": {
            sql: "SELECT BRIN_SUMMARIZE_NEW_VALUES(my_index)",
            parameters: [],
        },
        "brin_summarize_range": {
            sql: "SELECT BRIN_SUMMARIZE_RANGE(my_index, $1)",
            parameters: [1000],
        },
        "brin_desummarize_range": {
            sql: "SELECT BRIN_DESUMMARIZE_RANGE(my_index, $1)",
            parameters: [1000],
        },
        "gin_clean_pending_list": {
            sql: "SELECT GIN_CLEAN_PENDING_LIST(my_index)",
            parameters: [],
        },
        "pg_ls_dir": {
            sql: "SELECT PG_LS_DIR($1)",
            parameters: ["/tmp"],
        },
        "pg_ls_dir with missing_ok": {
            sql: "SELECT PG_LS_DIR($1, $2)",
            parameters: ["/tmp", true],
        },
        "pg_ls_dir with all options": {
            sql: "SELECT PG_LS_DIR($1, $2, $3)",
            parameters: ["/tmp", true, true],
        },
        "pg_ls_logdir": {
            sql: "SELECT PG_LS_LOGDIR()",
            parameters: [],
        },
        "pg_ls_waldir": {
            sql: "SELECT PG_LS_WALDIR()",
            parameters: [],
        },
        "pg_ls_logicalmapdir": {
            sql: "SELECT PG_LS_LOGICALMAPDIR()",
            parameters: [],
        },
        "pg_ls_logicalsnapdir": {
            sql: "SELECT PG_LS_LOGICALSNAPDIR()",
            parameters: [],
        },
        "pg_ls_replslotdir": {
            sql: "SELECT PG_LS_REPLSLOTDIR($1)",
            parameters: ["my_slot"],
        },
        "pg_ls_summariesdir": {
            sql: "SELECT PG_LS_SUMMARIESDIR()",
            parameters: [],
        },
        "pg_ls_archivestatusdir": {
            sql: "SELECT PG_LS_ARCHIVE_STATUSDIR()",
            parameters: [],
        },
        "pg_ls_tmpdir": {
            sql: "SELECT PG_LS_TMPDIR()",
            parameters: [],
        },
        "pg_ls_tmpdir with tablespace": {
            sql: "SELECT PG_LS_TMPDIR($1)",
            parameters: ["my_tablespace"],
        },
        "pg_read_file": {
            sql: "SELECT PG_READ_FILE($1)",
            parameters: ["/tmp/file.txt"],
        },
        "pg_read_file with offset and length": {
            sql: "SELECT PG_READ_FILE($1, $2, $3)",
            parameters: ["/tmp/file.txt", 0, 100],
        },
        "pg_read_file with all options": {
            sql: "SELECT PG_READ_FILE($1, $2, $3, $4)",
            parameters: ["/tmp/file.txt", 0, 100, true],
        },
        "pg_read_binary_file": {
            sql: "SELECT PG_READ_BINARY_FILE($1)",
            parameters: ["/tmp/file.bin"],
        },
        "pg_read_binary_file with offset and length": {
            sql: "SELECT PG_READ_BINARY_FILE($1, $2, $3)",
            parameters: ["/tmp/file.bin", 0, 100],
        },
        "pg_read_binary_file with all options": {
            sql: "SELECT PG_READ_BINARY_FILE($1, $2, $3, $4)",
            parameters: ["/tmp/file.bin", 0, 100, true],
        },
        "pg_stat_file": {
            sql: "SELECT PG_STAT_FILE($1)",
            parameters: ["/tmp/file.txt"],
        },
        "pg_stat_file with missing_ok": {
            sql: "SELECT PG_STAT_FILE($1, $2)",
            parameters: ["/tmp/file.txt", true],
        },
        "pg_advisory_lock": {
            sql: "SELECT PG_ADVISORY_LOCK($1)",
            parameters: [12345],
        },
        "pg_advisory_lock_shared": {
            sql: "SELECT PG_ADVISORY_LOCK_SHARED($1)",
            parameters: [12345],
        },
        "pg_advisory_unlock": {
            sql: "SELECT PG_ADVISORY_UNLOCK($1)",
            parameters: [12345],
        },
        "pg_advisory_unlock_all": {
            sql: "SELECT PG_ADVISORY_UNLOCK_ALL()",
            parameters: [],
        },
        "pg_advisory_unlock_shared": {
            sql: "SELECT PG_ADVISORY_UNLOCK_SHARED($1)",
            parameters: [12345],
        },
        "pg_advisory_xact_lock": {
            sql: "SELECT PG_ADVISORY_XACT_LOCK($1)",
            parameters: [12345],
        },
        "pg_advisory_xact_lock_shared": {
            sql: "SELECT PG_ADVISORY_XACT_LOCK_SHARED($1)",
            parameters: [12345],
        },
        "pg_try_advisory_lock": {
            sql: "SELECT PG_TRY_ADVISORY_LOCK($1)",
            parameters: [12345],
        },
        "pg_try_advisory_lock_shared": {
            sql: "SELECT PG_TRY_ADVISORY_LOCK_SHARED($1)",
            parameters: [12345],
        },
        "pg_try_advisory_xact_lock": {
            sql: "SELECT PG_TRY_ADVISORY_XACT_LOCK($1)",
            parameters: [12345],
        },
        "pg_try_advisory_xact_lock_shared": {
            sql: "SELECT PG_TRY_ADVISORY_XACT_LOCK_SHARED($1)",
            parameters: [12345],
        },
    },
    statistics: {
        "pg_mcv_list_items with identifier": {
            sql: "SELECT PG_MCV_LIST_ITEMS(stxdmcv)",
            parameters: undefined,
        },
        "pg_mcv_list_items with literal": {
            sql: "SELECT PG_MCV_LIST_ITEMS($1)",
            parameters: ["some_mcv_list"],
        },
        "pg_mcv_list_items without parameters": {
            sql: "SELECT PG_MCV_LIST_ITEMS()",
            parameters: undefined,
        },
    },
    operators: {
        // Operator Functions with Optional Parameters
        "Pattern 1: v(2).plus().v(2) -> $1 + $2": {
            sql: "$1 + $2",
            parameters: [2, 2],
        },
        "Pattern 2: v(2).plus(2) -> $1 + $2": {
            sql: "$1 + $2",
            parameters: [2, 2],
        },
        "Pattern 3: plus(2, 2) -> $1 + $2": {
            sql: "$1 + $2",
            parameters: [2, 2],
        },
        "Pattern 1: v(10).minus().v(3) -> $1 - $2": {
            sql: "$1 - $2",
            parameters: [10, 3],
        },
        "Pattern 2: v(10).minus(3) -> $1 - $2": {
            sql: "$1 - $2",
            parameters: [10, 3],
        },
        "Pattern 3: minus(10, 3) -> $1 - $2": {
            sql: "$1 - $2",
            parameters: [10, 3],
        },
        "Pattern 1: v('Hello').textCat().v('World') -> $1 || $2": {
            sql: "$1 || $2",
            parameters: ["Hello", "World"],
        },
        "Pattern 2: v('Hello').textCat('World') -> $1 || $2": {
            sql: "$1 || $2",
            parameters: ["Hello", "World"],
        },
        "Pattern 3: textCat('Hello', 'World') -> $1 || $2": {
            sql: "$1 || $2",
            parameters: ["Hello", "World"],
        },
        "Pattern 1: v('email').matchRegex().v('^[a-z]+@') -> $1 ~ $2": {
            sql: "$1 ~ $2",
            parameters: ["email", "^[a-z]+@"],
        },
        "Pattern 2: v('email').matchRegex('^[a-z]+@') -> $1 ~ $2": {
            sql: "$1 ~ $2",
            parameters: ["email", "^[a-z]+@"],
        },
        "Pattern 3: matchRegex('email', '^[a-z]+@') -> $1 ~ $2": {
            sql: "$1 ~ $2",
            parameters: ["email", "^[a-z]+@"],
        },
        "Pattern 1: v('path1').crosses().v('path2') -> $1 ?# $2": {
            sql: "$1 ?# $2",
            parameters: ["path1", "path2"],
        },
        "Pattern 2: v('path1').crosses('path2') -> $1 ?# $2": {
            sql: "$1 ?# $2",
            parameters: ["path1", "path2"],
        },
        "Pattern 3: crosses('path1', 'path2') -> $1 ?# $2": {
            sql: "$1 ?# $2",
            parameters: ["path1", "path2"],
        },
        "Pattern 1: v('line1').isParallel().v('line2') -> $1 ?|| $2": {
            sql: "$1 ?|| $2",
            parameters: ["line1", "line2"],
        },
        "Pattern 2: v('line1').isParallel('line2') -> $1 ?|| $2": {
            sql: "$1 ?|| $2",
            parameters: ["line1", "line2"],
        },
        "Pattern 3: isParallel('line1', 'line2') -> $1 ?|| $2": {
            sql: "$1 ?|| $2",
            parameters: ["line1", "line2"],
        },
        "op(2, '+', 2) -> $1 + $2": {
            sql: "$1 + $2",
            parameters: [2, 2],
        },
        "op(10, '-', 3) -> $1 - $2": {
            sql: "$1 - $2",
            parameters: [10, 3],
        },
        "op('Hello', '||', 'World') -> $1 || $2": {
            sql: "$1 || $2",
            parameters: ["Hello", "World"],
        },
        "op('email', '~', '^[a-z]+@') -> $1 ~ $2": {
            sql: "$1 ~ $2",
            parameters: ["email", "^[a-z]+@"],
        },

        // Comparison Operators
        "eq": {
            sql: "SELECT id = $1",
            parameters: [1],
        },
        "ne": {
            sql: "SELECT status <> $1",
            parameters: ["active"],
        },
        "notEq": {
            sql: "SELECT status != $1",
            parameters: ["active"],
        },
        "gt": {
            sql: "SELECT age > $1",
            parameters: [18],
        },
        "lt": {
            sql: "SELECT age < $1",
            parameters: [65],
        },
        "lte": {
            sql: "SELECT age <= $1",
            parameters: [100],
        },
        "gte": {
            sql: "SELECT age >= $1",
            parameters: [0],
        },

        // Pattern Matching Operators
        "like (override, no suffix)": {
            sql: "SELECT name LIKE $1",
            parameters: ["%test%"],
        },
        "notLike": {
            sql: "name NOT LIKE $1",
            parameters: ["%test%"],
        },
        "ilike (override, no suffix)": {
            sql: "name ILIKE $1",
            parameters: ["%test%"],
        },
        "notIlike": {
            sql: "name NOT ILIKE $1",
            parameters: ["%test%"],
        },
        "matchRegex (no suffix)": {
            sql: "email ~ $1",
            parameters: ["^[a-z]+@"],
        },
        "matchRegexInsensitive": {
            sql: "email ~* $1",
            parameters: ["^[A-Z]+@"],
        },
        "notMatchRegex": {
            sql: "email !~ $1",
            parameters: ["^[0-9]+"],
        },
        "notMatchRegexInsensitive": {
            sql: "email !~* $1",
            parameters: ["^[0-9]+"],
        },
        "similarTo (no suffix)": {
            sql: "pattern SIMILAR TO $1",
            parameters: ["%(a|b)%"],
        },
        "notSimilarTo": {
            sql: "pattern NOT SIMILAR TO $1",
            parameters: ["%(a|b)%"],
        },

        // Logical Operators
        "exclamation": {
            sql: "active !",
            parameters: [],
        },
        "is": {
            sql: "deleted_at IS $1",
            parameters: [null],
        },
        "isNot": {
            sql: "deleted_at IS NOT $1",
            parameters: [null],
        },

        // Arithmetic Operators
        "plus": {
            sql: "price + tax",
            parameters: [],
        },
        "minus": {
            sql: "price - discount",
            parameters: [],
        },
        "multiply (no suffix)": {
            sql: "quantity * $1",
            parameters: [2],
        },
        "divide": {
            sql: "total / count",
            parameters: [],
        },
        "modulo": {
            sql: "number % $1",
            parameters: [10],
        },
        "textCat": {
            sql: "first_name || last_name",
            parameters: [],
        },

        // Bitwise Operators
        "bitwiseAnd": {
            sql: "flags1 & flags2",
            parameters: [],
        },
        "bitwiseOr": {
            sql: "flags1 | flags2",
            parameters: [],
        },
        "bitwiseXor": {
            sql: "flags1 ^ flags2",
            parameters: [],
        },
        "bitwiseLeftShift": {
            sql: "value << $1",
            parameters: [2],
        },
        "bitwiseRightShift": {
            sql: "value >> $1",
            parameters: [2],
        },
        "bitwiseLeftShiftAssign": {
            sql: "value <<= $1",
            parameters: [2],
        },
        "bitwiseRightShiftAssign": {
            sql: "value >>= $1",
            parameters: [2],
        },

        // PostgreSQL-Specific Operators
        "atSign": {
            sql: "point1 @ point2",
            parameters: [],
        },
        "hash": {
            sql: "value # $1",
            parameters: [5],
        },
        "caretAt": {
            sql: "point1 ^@ point2",
            parameters: [],
        },

        // Geometric Operators
        "totalLength": {
            sql: "path @-@",
            parameters: [],
        },
        "middle": {
            sql: "box @@",
            parameters: [],
        },
        "closestPoint": {
            sql: "line1 ## line2",
            parameters: [],
        },
        "distance (no suffix)": {
            sql: "point1 <-> point2",
            parameters: [],
        },
        "containment (no suffix)": {
            sql: "circle @> point",
            parameters: [],
        },
        "containedBy": {
            sql: "point <@ circle",
            parameters: [],
        },
        "notExtendRight": {
            sql: "box1 &< box2",
            parameters: [],
        },
        "notExtendLeft": {
            sql: "box1 &> box2",
            parameters: [],
        },
        "strictlyBelow": {
            sql: "box1 <<| box2",
            parameters: [],
        },
        "strictlyAbove": {
            sql: "box1 |>> box2",
            parameters: [],
        },
        "notExtendAbove": {
            sql: "box1 &<| box2",
            parameters: [],
        },
        "notExtendBelow": {
            sql: "box1 |&> box2",
            parameters: [],
        },
        "below": {
            sql: "box1 <^ box2",
            parameters: [],
        },
        "above": {
            sql: "box1 >^ box2",
            parameters: [],
        },
        "crosses (no suffix)": {
            sql: "path1 ?# path2",
            parameters: [],
        },
        "horizontal": {
            sql: "line1 ?- line2",
            parameters: [],
        },
        "vertical": {
            sql: "line1 ?| line2",
            parameters: [],
        },
        "perpendicular": {
            sql: "line1 ?-| line2",
            parameters: [],
        },
        "isParallel (no suffix)": {
            sql: "line1 ?|| line2",
            parameters: [],
        },
        "sameAs": {
            sql: "box1 ~= box2",
            parameters: [],
        },

        // Between operators
        "between": {
            sql: "age BETWEEN $1 AND $2",
            parameters: [18, 65],
        },
        "notBetween": {
            sql: "age NOT BETWEEN $1 AND $2",
            parameters: [18, 65],
        },
        "betweenSymmetric": {
            sql: "age BETWEEN SYMMETRIC $1 AND $2",
            parameters: [18, 65],
        },
        "notBetweenSymmetric": {
            sql: "age NOT BETWEEN SYMMETRIC $1 AND $2",
            parameters: [18, 65],
        },

        // Complex Query Examples
        "Combined operators in WHERE clause": {
            sql: "SELECT name FROM users WHERE age >= $1 AND status = $2",
            parameters: [18, "active"],
        },
        "Pattern matching with OR": {
            sql: "SELECT email FROM users WHERE email LIKE $1 OR email LIKE $2",
            parameters: ["%@gmail.com", "%@yahoo.com"],
        },
    },
};
