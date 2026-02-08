SELECT * FROM products WHERE category_id IN (SELECT id
    FROM categories
    WHERE
      active = true)