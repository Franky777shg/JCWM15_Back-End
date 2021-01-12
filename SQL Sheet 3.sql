-- SELECT DISTINCT => membuat data yang duplicate, menjadi satu jenis
select lastName from employees;
select distinct lastName from employees;
select * from customers;
select distinct state, city from customers where state is not null;

-- GROUP BY => grouping data
select * from customers;
select country, count(*) as total_customers_perCountry from customers
group by country
order by country;

select * from orders;
select status, count(*) as total_perStatus from orders
group by status
order by status;

select * from orderdetails;
select orderNumber, sum(quantityOrdered) as total_qty from orderdetails
group by orderNumber
order by orderNumber;

-- get total data user , group by salesRepEmployeeNumber and count total customer
select salesRepEmployeeNumber, count(*) as total_cust from customers
group by salesRepEmployeeNumber
order by salesRepEmployeeNumber;

-- hitung total pembelanjaan tiap order number
select * from orderdetails;
select orderNumber, sum(quantityOrdered) as total_qty , sum(quantityOrdered * priceEach) as total_price from orderdetails
group by orderNumber;

-- HAVING => conditional search, biasanya dipakai bersamaan dengan group by
select * from orderdetails;
select orderNumber, sum(quantityOrdered) as total_qty , sum(quantityOrdered * priceEach) as total_price from orderdetails
group by orderNumber
having total_qty > 200 and total_price > 10000;

select salesRepEmployeeNumber, count(*) as total_cust from customers
where salesRepEmployeeNumber is not null
group by salesRepEmployeeNumber
having total_cust > 6
order by salesRepEmployeeNumber;

-- hitung total customer per country, cari country yang rata2 credit limit nya di atas 50000
select * from customers;
select country, count(country) as total_cust, avg(creditLimit) as avg_creditLimit from customers
group by country
having avg_creditLimit > 50000
order by avg_creditLimit;

-- SUB QUERY => query 1 (query 2 (query 3))), EXECUTION ORDER => query 3, query 2, query 1
-- tampilkan rata2 credit tiap negara, hitung ada berapa country yang rata2 credit limitnya di atas rata2 credit limit USA

-- cari dulu rata2 credit limit USA
select country, avg(creditLimit) as avg_USA from customers
where country = 'USA';
select avg(creditLimit) as avg_USA from customers
where country = 'USA';

-- setelah dapat rata2 credit limit USA,
-- maka kita gunakan sub query untuk mencari country dengan rata2 credit limit di atas rata2 credit limit USA
select country, count(country) as total_cust, avg(creditLimit) as avg_creditLimit from customers
group by country
order by avg_creditLimit;

select country, count(country) as total_cust, avg(creditLimit) as avg_creditLimit from customers
group by country
having avg_creditLimit > (
	select avg(creditLimit) as avg_USA from customers
	where country = 'USA'
)
order by avg_creditLimit;

-- hitung berapa country yang rata2 credit limitnya di atas rata2 credit limit USA
SELECT 
    COUNT(*) AS result
FROM
    (SELECT 
        country,
            COUNT(country) AS total_cust,
            AVG(creditLimit) AS avg_creditLimit
    FROM
        customers
    GROUP BY country
    HAVING avg_creditLimit > (SELECT 
            AVG(creditLimit) AS avg_USA
        FROM
            customers
        WHERE
            country = 'USA')
    ORDER BY avg_creditLimit) AS list_credit_limit;

-- JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN, CROSS JOIN
-- INNER JOIN, menggabung tabel dengan foregin key, data yang tidak cocok akan dibuang
select * from employees;
select * from offices;

-- INNER JOIN WITH ON, ketika nama kolom nya beda
select e.employeeNumber, concat(e.firstName, ' ', e.lastName) as name, e.email, e.officeCode, o.city, o.phone from employees e
INNER JOIN offices o
on e.officeCode = o.officeCode;

-- INNER JOIN WITH USING, ketikam nama kolomnya sama
select e.employeeNumber, concat(e.firstName, ' ', e.lastName) as name, e.email, e.officeCode, o.city, o.phone from employees e
INNER JOIN offices o
using(officeCode);