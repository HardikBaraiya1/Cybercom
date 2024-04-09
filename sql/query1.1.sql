#	1.	Create a database structure for product and categories. 
-- One product can be in more than one category and one category can have multiple products.

create table category(
	categId int auto_increment primary key,
    categoryName varchar(50) not null
);

insert into category(categoryName) values ('fruits'),('electronic'),('liquide');

describe category;

create table product(
	productId int auto_increment primary key,
    productName varchar(155) not null,
    price decimal(10,2) not null
);

insert into product(productName,price) values ('apple',9.804),('watch',120.345),('jadu',34.5),('water',150.678);

describe product;
select * from product;
select * from category;
insert into productcategory(productId,categId) values (1,1),(2,2),(3,2),(4,3);
select * from productcategory;
create table productCategory(
    productCategoryId int auto_increment primary key,
	productId int,
    categId int ,
#    primary key(productId,categId),
	foreign key(productId) references product(productId),
    foreign key(categId) references category(categId)
);

desc productcategory;


select productcategory.productCategoryId, product.productName,category.categoryName from productcategory
join category on productcategory.categId = category.categId
join product on productcategory.productId = product.productId;

