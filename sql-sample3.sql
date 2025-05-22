-- Restaurant Data Analysis

-- Query 1: List all menu items with a price over $7.50, ordered by price (descending)
SELECT 
    id,
    name,
    ROUND(price, 2) AS price,
    category,
    CASE 
        WHEN price > 10 THEN 'Premium'
        ELSE 'Standard'
    END AS price_tier
FROM 
    menu_items
WHERE 
    price > 7.50
ORDER BY 
    price DESC,
    name ASC;

-- Query 2: Find the total number of orders placed by each customer
SELECT 
    c.id AS customer_id,
    c.name AS customer_name,
    COUNT(o.id) AS total_orders,
    SUM(o.total_amount) AS total_spent,
    ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM 
    customers c
LEFT JOIN 
    orders o ON c.id = o.customer_id
GROUP BY 
    c.id, c.name
HAVING 
    COUNT(o.id) > 0
ORDER BY 
    total_orders DESC,
    total_spent DESC;

-- Query 3: Calculate the average order amount
WITH order_stats AS (
    SELECT
        COUNT(*) AS order_count,
        SUM(total_amount) AS total_sales,
        MIN(total_amount) AS min_order,
        MAX(total_amount) AS max_order,
        AVG(total_amount) AS avg_order
    FROM
        orders
)
SELECT
    order_count,
    ROUND(total_sales, 2) AS total_sales,
    ROUND(min_order, 2) AS min_order,
    ROUND(max_order, 2) AS max_order,
    ROUND(avg_order, 2) AS average_order_amount
FROM
    order_stats;

-- Query 4: Find the most popular menu item (most frequently ordered)
WITH item_popularity AS (
    SELECT
        m.id,
        m.name AS item_name,
        m.category,
        SUM(oi.quantity) AS total_quantity,
        COUNT(DISTINCT oi.order_id) AS order_count,
        RANK() OVER (ORDER BY SUM(oi.quantity) DESC) AS popularity_rank
    FROM
        order_items oi
    JOIN
        menu_items m ON oi.menu_item_id = m.id
    GROUP BY
        m.id, m.name, m.category
)
SELECT
    item_name,
    category,
    total_quantity,
    order_count,
    ROUND(total_quantity * 100.0 / (SELECT SUM(quantity) FROM order_items), 1) AS percentage_of_all_items
FROM
    item_popularity
WHERE
    popularity_rank = 1;

-- Query 5: List all orders placed on March 15, 2023 with their total amounts
SELECT
    o.id AS order_id,
    c.name AS customer_name,
    o.order_date,
    o.total_amount,
    COUNT(oi.menu_item_id) AS item_count,
    STRING_AGG(m.name, ', ') AS items_ordered
FROM
    orders o
JOIN
    customers c ON o.customer_id = c.id
LEFT JOIN
    order_items oi ON o.id = oi.order_id
LEFT JOIN
    menu_items m ON oi.menu_item_id = m.id
WHERE
    o.order_date = '2023-03-15'
GROUP BY
    o.id, c.name, o.order_date, o.total_amount
ORDER BY
    o.total_amount DESC;