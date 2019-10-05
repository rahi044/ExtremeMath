use master;

IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'$(db_name)')
begin
declare @kill varchar(8000) = '';
select @kill=@kill+'kill '+convert(varchar(5),spid)+';'
    from master..sysprocesses 
where dbid=db_id('$(db_name)');
exec (@kill);
DROP DATABASE [$(db_name)]
end;

declare @data_file_path nvarchar(1024)
declare @log_file_path nvarchar(1024)
declare @sql nvarchar(1024)
declare @data_file_name nvarchar(1024), @data_logical_file_name nvarchar(1024) 
declare @log_file_name nvarchar(1024), @log_logical_file_name nvarchar(1024)
declare @default_path nvarchar(1024)
set @data_file_name= '$(db_name)' + '_data.mdf' 
set @log_file_name= '$(db_name)' + '_log.ldf' 
set @data_logical_file_name= '$(db_name)' + '_data' 
set @log_logical_file_name= '$(db_name)' + '_log' 

set @data_file_path = '$(db_data_folder)' + @data_file_name  
set @log_file_path = '$(db_data_folder)'  + @log_file_name  

--select @data_file_path, @log_file_path 

set @sql = 'CREATE DATABASE $(db_name) ON ( NAME = ' + @data_logical_file_name + ', ' +
'FILENAME = ' + quotename(@data_file_path) + ') LOG ON ( NAME = ' + @log_logical_file_name + ', ' + 
'FILENAME = ' + quotename(@log_file_path)+')' 
EXEC (@sql);

-- select 'DB created successfully' as ExecutionResult 