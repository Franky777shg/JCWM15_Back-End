-- get category detail parent
select c1.id, c1.title, c2.title as parent from category c1
left join category c2
on c1.parent_id = c2.id;

-- get category detail child
select c1.id, c1.title, c2.title as child from category c1
left join category c2
on c1.id = c2.parent_id;

-- get category group concat
SELECT c1.id, c1.title, group_concat(c2.title SEPARATOR ', ') AS children FROM category c1
LEFT JOIN category c2
ON c1.id = c2.parent_id
GROUP BY c1.title
HAVING children IS NOT NULL
ORDER BY c1.id;

-- get top node
SELECT id, title AS top_node FROM category WHERE parent_id IS NULL;

-- get leaf node
select c1.id, c1.title from category c1
left join category c2
ON c1.id = c2.parent_id
WHERE c2.title IS NULL;

-- get lvl of each node with recursive
WITH RECURSIVE category_level as (
select id, title, parent_id, 1 lvl from category where parent_id is null
UNION ALL
select c.id, c.title, c.parent_id, cl.lvl + 1 
from category_level cl
join category c on cl.id = c.parent_id
)
select cl.id, cl.title, c.title parent, cl.lvl from category_level cl
left join category c
on cl.parent_id = c.id;