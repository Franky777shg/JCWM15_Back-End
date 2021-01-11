use classicmodels;

-- filtering data
select * from customers;
select customerNumber, customerName, creditLimit from customers;

-- order data
select customerNumber, customerName, creditLimit from customers order by customerName;
select customerNumber, customerName, creditLimit from customers order by customerName desc;

-- where =  filtering with condition
select customerNumber, customerName, country from customers where country='USA';
select customerNumber, customerName, city from customers where city='San Francisco';

-- where (and, or, between, in, like, not)
-- where + and
select customerNumber, customerName, country, salesRepEmployeeNumber from customers where country='USA' and salesRepEmployeeNumber=1166;
select * from products;
select productCode, productName, productLine, productScale from products where productLine='Vintage Cars' and productScale='1:18';

-- where + or
select productCode, productName, productLine, productScale from products where productLine='Vintage Cars' or productScale='1:18';
select customerNumber, customerName, country, salesRepEmployeeNumber from customers where country='USA' or salesRepEmployeeNumber=1166;

-- where + between
select * from employees where officeCode between 1 and 3;
select * from products where buyPrice between 0 and 50.00;

-- where + in
select customerNumber, customerName, country from customers where country in ('USA', 'France');
select productCode, productName, productLine from products where productLine in ('Vintage Cars', 'Classic Cars');

-- where + like
select * from employees;
select * from employees where lastName like 'bo%'; -- cari di awal
select * from employees where lastName like '%son'; -- cari di akhir
select * from employees where lastName like '%p%'; -- full search

-- where + not
select * from products where productLine not in ('Classic Cars', 'Vintage Cars');
select * from employees where lastName not like 'bo%';
select * from employees where officeCode not between 1 and 3;

-- is null & is not null
select * from customers where state is null;
select * from customers where state is not null;

-- MATH OPERATOR (<, <=, >= >, =, -, +, *, /)
select customerNumber, customerName, creditLimit from customers where creditLimit > 100000;
select customerNumber, customerName, creditLimit from customers where creditLimit < 100000;
select customerNumber, customerName, creditLimit from customers where creditLimit = 0;
select *, 200000 - amount as sisa_Limit from payments;
select customerNumber, customerName, creditLimit, 50000 + creditLimit as final_credit_limit from customers;
select customerNumber, customerName, creditLimit, 2 * creditLimit as double_credit_limit from customers;
select customerNumber, customerName, creditLimit, creditLimit / 2 as half_credit_limit from customers;

-- LIMIT and OFFSET
select * from offices;
select * from offices limit 5;
select * from offices limit 3 offset 2; -- cara pertama
select * from offices limit 3, 2; -- cara kedua, digit pertama itu jadi offset, digit kedua itu jadi limit
select customerNumber, customerName, country from customers where country in ('USA', 'France') limit 10;

-- dapatkan data dari table customers, ambil kolom customer name, city, state, country, cari yang country nya di USA dan France, order by customer name, 
-- limit 5 dimulai setelah data ke 3
select customerName, city, state, country from customers where country in ('USA', 'France')
order by customerName
limit 5 offset 3;

-- get data customer salesRepEmploye !== null, country = germany, nama mengandung huruf n, dan urutkan berdarkan nama
select * from customers
where salesRepEmployeeNumber is not null
and country = 'Germany'
and customerName like '%n%'
order by customerName;

-- get data customer salerRepEmployee != null dan credit limit > 60000, 
-- urutkan berdasarkan credit limit dan di kasih limit 4 data dimulai setelah data ke 10
select * from customers
where salesRepEmployeeNumber is not null
and creditLimit > 60000
order by creditLimit
limit 10, 4;

-- AGGREGATE FUNCTION => CONCAT, COUNT, MIN, MAX, AVG, SUM
-- CONCAT, menyambung antara satu kolom dengan kolom yang lain
select * from customers;
select customerNumber, customerName, concat(contactLastName, ' ', contactFirstName) as fullName from customers;

-- COUNT, menghitung total keseluruhan data
select count(*) as total_office from offices;

-- MIN => mencari data terendah, MAX => mencari data terbesar
select * from payments;
select min(amount) as jumlah_pembelian_terendah from payments;
select max(amount) as jumlah_pembelian_tertinggi from payments;

-- AVG (AVERAGE) => mencari rata-rata data
select avg(amount) as rata_rata_pembelian from payments;

-- SUM => menjumlah data tertentu
select sum(amount) as total_pembelian from payments;

-- EXAMPLE
-- mencari total quantity pmebelian dari order details untuk orderNumber 10100
select sum(quantityOrdered) as total_quantity_10100 from orderdetails
where orderNumber = 10100;









