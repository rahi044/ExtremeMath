 param (
	[string]$server_name,
    [string]$db_name,
	[string]$user_name, 
	[string]$password
 )

$execution_path=split-path -parent $MyInvocation.MyCommand.Definition 
$data_folder=$execution_path+"\Data\" 
$sql_params="folder_path = '" + $data_folder + "'"
Invoke-Sqlcmd -Query "exec usp_insert_prerequisite_data `$(folder_path)`;"  -Variable $sql_params -ServerInstance $server_name -Database $db_name -Username $user_name -Password $password -QueryTimeout 300   
