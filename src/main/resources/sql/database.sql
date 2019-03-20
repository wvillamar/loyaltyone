
create schema if not exists loyaltyone;

drop table loyaltyone.entries;

create table loyaltyone.entries (	
	"id" UUID PRIMARY KEY,
	"username" varchar(50),
	"city" varchar(100),
	"text" varchar(100),
	"parent_id" UUID references entries(id),
	"createdAt" timestamp with time zone default now(),
	"updatedAt" timestamp with time zone default now()
);
