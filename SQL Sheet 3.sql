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
CREATE TABLE members (
    member_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (member_id)
);

CREATE TABLE committees (
    committee_id INT AUTO_INCREMENT,
    name VARCHAR(100),
    PRIMARY KEY (committee_id)
);

INSERT INTO members(name)
VALUES('John'),('Jane'),('Mary'),('David'),('Amelia');

INSERT INTO committees(name)
VALUES('John'),('Mary'),('Amelia'),('Joe');

select * from members;
select * from committees;

-- INNER JOIN WITH ON, ketika nama kolom nya beda
select * from members m
INNER JOIN committees c
on m.name = c.name;

-- INNER JOIN WITH USING, ketika nama kolomnya sama
select * from members m
INNER JOIN committees c
using(name);

-- LEFT JOIN, kalau ada data yang tidak cocok, dia tidak dibuang tapi datanya dinull kan, table utama sebelah kiri
select * from members m
LEFT JOIN committees c
on m.name = c.name;

-- RIGHT JOIN, kalau ada data yang tidak cocok, dia tidak dibuang tapi datanya dinull kan, table utama sebelah kanan
select * from members m
RIGHT JOIN committees c
on m.name = c.name;

-- CROSS JOIN, tidak membutuhkan condition, tiap item dari table sebelah kiri, akan dipasangkan dengan tiap item di table sebelah kanan
select * from members m
CROSS JOIN committees c;

-- tampilkan data customers yang ada di negara USA yang mempunyai credit limit diatas rata2 credit limit customers di Germany
select country, avg(creditLimit) as avg_crLimitGerm from customers where country = 'Germany';

select customerNumber, customerName, country, creditLimit from customers
where country = 'USA'
order by customerName;

select customerNumber, customerName, country, creditLimit from customers
where country = 'USA' and creditLimit >= (
	select avg(creditLimit) as avg_crLimitGerm from customers where country = 'Germany'
)
order by creditLimit;

select cs.customerNumber, cs.customerName, cs.country, cs.creditLimit, em.employeeNumber, concat(em.lastname, ', ', em.firstName) as sales_name, em.email from customers cs
join employees em
on cs.salesRepEmployeeNumber = em.employeeNumber
order by customerNumber;

-- tampilkan data orderdetail, hitunglah total quantity dan total price per order number
-- dengan ketentuan total price diatas rata2 semua total price per order number dan 
-- total quantity diatas rata2 semua total quantity per order number
select * from orderdetails;

-- cari dahulu rata2 semua total quantity per order number
select orderNumber, sum(quantityOrdered) total_qty from orderdetails
group by orderNumber;

select avg(total_qty) as avg_total_qty from (
	select sum(quantityOrdered) total_qty from orderdetails
	group by orderNumber
) list_total_qty;

-- cari dahulu rata2 semua total price per order number
select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
group by orderNumber;

select avg(total_price) as avg_total_price from (
	select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
	group by orderNumber
) list_total_price;

-- avg_qty 323
-- avg price 29460
select orderNumber, sum(quantityOrdered) total_qty, sum(quantityOrdered * priceEach) total_price from orderdetails
group by orderNumber
having total_qty > (
	select avg(total_qty) as avg_total_qty from (
		select sum(quantityOrdered) total_qty from orderdetails
		group by orderNumber
	) list_total_qty
) and total_price > (
	select avg(total_price) as avg_total_price from (
		select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
		group by orderNumber
	) list_total_price
);

select count(*) result from (
	select orderNumber, sum(quantityOrdered) total_qty, sum(quantityOrdered * priceEach) total_price from orderdetails
	group by orderNumber
	having total_qty > (
		select avg(total_qty) as avg_total_qty from (
			select sum(quantityOrdered) total_qty from orderdetails
			group by orderNumber
		) list_total_qty
	) and total_price > (
		select avg(total_price) as avg_total_price from (
			select orderNumber, sum(quantityOrdered * priceEach) total_price from orderdetails
			group by orderNumber
		) list_total_price
	)
) list_result;