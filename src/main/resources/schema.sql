-- noinspection SqlDialectInspectionForFile
-- noinspection SqlNoDataSourceInspectionForFile

create table appointment
(
   id bigint not null,
   confirmed boolean not null default false,
   cancelled boolean not null default false,
   note varchar(255),
   date date,
   time time,
   company_id bigint not null,
   primary key(id)
);

create table company
(
  id bigint not null,
  name varchar(255) not null,
  url varchar(255),
  street varchar(255),
  house_number bigint,
  postal_code varchar(255),
  locality varchar(255),
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  phone varchar(255) not null,
  email varchar(255) not null,
  salutation varchar(255)
);