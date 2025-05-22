-- Restaurant Data Analysis

-- Query 1: List all menu items with a price over $7.50, ordered by price (descending)
SELECT id, name, price, category
FROM menu_items
WHERE price > 7.50
ORDER BY price DESC;

-- Query 2: Find the total number of orders placed by each customer
SELECT c.name, COUNT(o.id) AS total_orders
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY total_orders DESC;

-- Query 3: Calculate the average order amount
SELECT AVG(total_amount) AS average_order_amount
FROM orders;

-- Query 4: Find the most popular menu item (most frequently ordered)
SELECT m.name AS item_name, SUM(oi.quantity) AS total_ordered
FROM order_items oi
JOIN menu_items m ON oi.menu_item_id = m.id
GROUP BY m.id, m.name
ORDER BY total_ordered DESC
LIMIT 1;

-- Query 5: List all orders placed on March 15, 2023 with their total amounts
SELECT o.id, c.name AS customer_name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.order_date = '2023-03-15'
ORDER BY o.id;