-- Restaurant Data Analysis

-- Query 1: List all menu items with a price over $7.50, ordered by price (descending)
SELECT *
FROM menu_items
WHERE price > 7.50
ORDER BY price DESC;

-- Query 2: Find the total number of orders placed by each customer
SELECT customers.name, COUNT(*) AS total_orders
FROM customers, orders
WHERE customers.id = orders.customer_id
GROUP BY customers.name;

-- Query 3: Calculate the average order amount
SELECT SUM(total_amount) / COUNT(*) AS average_order_amount
FROM orders;

-- Query 4: Find the most popular menu item (most frequently ordered)
SELECT menu_items.name AS item_name, SUM(order_items.quantity) AS total_ordered
FROM order_items, menu_items
WHERE order_items.menu_item_id = menu_items.id
GROUP BY item_name
ORDER BY total_ordered DESC
LIMIT 1;

-- Query 5: List all orders placed on March 15, 2023 with their total amounts
SELECT orders.id, customers.name, orders.total_amount
FROM orders, customers
WHERE orders.customer_id = customers.id
AND orders.order_date = '2023-03-15';