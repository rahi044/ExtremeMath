 param (
	[string]$server_name,
    [string]$db_name,
    [string]$db_data_folder, 
	[string]$user_name, 
	[string]$password, 
	[int]$create_database 
 )

if($server_name -eq $null -or $server_name -eq "") 
{
	$server_name= Read-Host 'Server Name' 
}
if($db_name -eq $null -or $db_name -eq "") 
{
	$db_name= Read-Host 'Database Name' 
}
if($db_data_folder -eq $null -or $db_data_folder -eq "") 
{
	$db_data_folder= Read-Host 'Database files folder path' 
}
if($user_name -eq $null -or $user_name -eq "") 
{
	$user_name= Read-Host 'User Name' 
}
if($password -eq $null -or $password -eq "") 
{
	$password= Read-Host 'Password' 
}

$execution_path=split-path -parent $MyInvocation.MyCommand.Definition 
if($create_database -eq 1) 
{
	echo "Creating the database" 
	$db_create_script_path=$execution_path+"\nestappes_db_create.ps1" 
	Invoke-Command -ScriptBlock {& $db_create_script_path -server_name $server_name -db_name $db_name -db_data_folder $db_data_folder -user_name $user_name -password $password} 
}

echo "Creating Stored Procedures" 
$db_sp_script_path=$execution_path+"\nestappes_db_update.ps1" 
Invoke-Command -ScriptBlock {& $db_sp_script_path -server_name $server_name -db_name $db_name -user_name $user_name -password $password} 

# TODO: Update scripts

if($create_database -eq 1 -or $create_database -eq "1") 
{
    echo "Inserting prerequisite data..." 
	$insert_script_path=$execution_path+"\_insert_data.ps1" 
	Invoke-Command -ScriptBlock {& $insert_script_path -server_name $server_name -db_name $db_name -user_name $user_name -password $password} 
}