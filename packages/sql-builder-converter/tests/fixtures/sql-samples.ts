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
