use $(db_name); 

if object_id('tbl_user') is not null drop table tbl_user; 
if object_id('tbl_math') is not null drop table tbl_math; 

create table tbl_user ( 
	id							int identity(1,1), 
	name						nvarchar(256) not null, 
	constraint pk_user			primary key(id) 
); 
create table tbl_math ( 
	id							int identity(1,1), 
	number_1					nvarchar(max), 
	number_2					nvarchar(max), 
	summation					nvarchar(max), 
	created_by					int not null, 
	created_on					datetime not null default(SYSDATETIME()), 
	constraint pk_math			primary key(id), 
	constraint fk_math_created_by foreign key(created_by) references tbl_user(id) 
); 