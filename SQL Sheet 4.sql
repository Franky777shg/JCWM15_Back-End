-- ADJENCY LIST TREE / HIERARCHICAL DATABASE
CREATE TABLE category (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  parent_id int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (parent_id) REFERENCES category (id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

select * from category;

INSERT INTO category(title,parent_id) 
VALUES('Electronics',NULL);

INSERT INTO category(title,parent_id) 
VALUES('Laptops & PC',1);

INSERT INTO category(title,parent_id) 
VALUES('Laptops',2);
INSERT INTO category(title,parent_id) 
VALUES('PC',2);

INSERT INTO category(title,parent_id) 
VALUES('Cameras & photo',1);
INSERT INTO category(title,parent_id) 
VALUES('Camera',5);

INSERT INTO category(title,parent_id) 
VALUES('Phones & Accessories',1);
INSERT INTO category(title,parent_id) 
VALUES('Smartphones',7);

INSERT INTO category(title,parent_id) 
VALUES('Android',8);
INSERT INTO category(title,parent_id) 
VALUES('iOS',8);
INSERT INTO category(title,parent_id) 
VALUES('Other Smartphones',8);

INSERT INTO category(title,parent_id) 
VALUES('Batteries',7);
INSERT INTO category(title,parent_id) 
VALUES('Headsets',7);
INSERT INTO category(title,parent_id) 
VALUES('Screen Protectors',7);

select * from category;

-- FINDING ROOT NODE => cari node yang menjadi root node/top node/node paling atas
select * from category where parent_id is null;

-- FINDING IMMEDIATE CHILDREN OF NODE => cari node yang menjadi children dari node tertentu
select * from category where parent_id=7; -- mencari children dari phones & accessories

-- FINDING LEAF NODE => cari node yang menjadi node paling bawah / tidak punya children
select c1.id, c1. title from category c1
left join category c2
on c2.parent_id = c1.id
where c2.id is null;

-- QUERYING THE WHOLE TREE
WITH RECURSIVE category_path (id, title, path) AS
(
	SELECT id, title, title as path							-- titik awal recursive
	FROM category											-- titik awal recursive
    WHERE parent_id IS NULL									-- titik awal recursive
    
	UNION ALL 												-- titik awal digabung dengan recursive query berikutnya
  
	SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)	-- recursive query
	FROM category_path AS cp JOIN category AS c				-- recursive query
	ON cp.id = c.parent_id									-- recursive query
)
SELECT * FROM category_path;								-- pemanggilan hasil recursive

-- QUERYING A SUB TREE
WITH RECURSIVE category_path (id, title, path) AS
(
  SELECT id, title, title as path
    FROM category
    WHERE parent_id = 7
  UNION ALL
  SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
    FROM category_path AS cp JOIN category AS c
      ON cp.id = c.parent_id
)
SELECT * FROM category_path;

-- QUERYING A SINGLE PATH
WITH RECURSIVE category_path (id, title, parent_id) AS
(
  SELECT id, title, parent_id
    FROM category
    WHERE id = 10 -- child node
  UNION ALL
  SELECT c.id, c.title, c.parent_id
    FROM category_path AS cp JOIN category AS c
      ON cp.parent_id = c.id
)
SELECT * FROM category_path;