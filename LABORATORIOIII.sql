use laboratorio3;

create table usuarios(
id_usuario int auto_increment not null unique key,
nombre varchar(45),
email varchar (45),
contraseña varchar(45),
primary key(id_usuario)
);

create table productos(
id_productos int auto_increment not null unique key,
nombre varchar(45),
descripcion varchar(75),
precio decimal(4,2),
cantidad_stock int,
primary key (id_productos)
);

create table pedidos(
id_pedidos int auto_increment not null unique key,
fecha date,
id_usuario int not null,
primary key (id_pedidos),
foreign key (id_usuario) references usuarios(id_usuario) 
);

create table detalle_pedidos(
id_detpedidos int auto_increment not null unique key,
cantidad int,
id_pedidos int not null,
id_productos int not null,
primary key(id_detpedidos),
foreign key (id_pedidos) references pedidos(id_pedidos),
foreign key(id_productos) references productos(id_productos)
);

alter table productos 
modify precio float;

DELIMITER $$
create trigger validarusuarios
before insert on usuarios
for each row 
begin
if new.nombre='' or new.email=''or new.id_usuario ='' then 
signal sqlstate '45000' set message_text='Los campos deben estar completos';
end if;
end$$ 
delimiter ;

delimiter //
CREATE PROCEDURE miprocedimiento()
begin
select*from usuarios
where nombre='jorge';
end //

delimiter //
call miprocedimiento();
drop trigger validarusuarios;
drop procedure miprocedimiento;