-- create database
create database toko;

-- delete database
drop database toko;

create database latihan;

-- use database
use latihan;

-- select table
select * from user;

-- insert data to table
-- cara pertama
insert into user value(null, 'choco', 'choco1!', 'choco@mail.com');

-- cara kedua
insert into user (username, password, email) values ('dina', 'dina1!', 'dina@mail.com');

-- cara ketiga
insert into user set username='rafi', password='rafi1!', email='rafi@mail.com';

-- insert multiple values
insert into user values 
(null, 'kevin', 'kevin1!', 'kevin@mail.com'),
(null, 'dede', 'dede1!', 'dede@mail.com');

-- update data user
update user set password = 'kiky1!', username = 'kiky', email = 'kiky@mail.com' where id_user=4;

-- delete data user
delete from user where id_user=6;