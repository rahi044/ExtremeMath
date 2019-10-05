$server_name="NestappES-SRV-01" 
$db_name="nestappes_db" 
$db_data_folder="D:\DatabaseFiles\NestappES\"
$user_name="sa"
$password="sa" 
$execution_path=split-path -parent $MyInvocation.MyCommand.Definition 
$db_create_script_path=$execution_path+"\nestappes_db_create.ps1" 
$db_sp_script_path=$execution_path+"\nestappes_db_update.ps1" 
$insert_script_path=$execution_path+"\nestappes_db_insert_data.ps1" 
Invoke-Command -ScriptBlock {& $db_create_script_path -server_name $server_name -db_name $db_name -db_data_folder $db_data_folder -user_name $user_name -password $password} 
Invoke-Command -ScriptBlock {& $db_sp_script_path -server_name $server_name -db_name $db_name -user_name $user_name -password $password} 
Invoke-Command -ScriptBlock {& $insert_script_path -server_name $server_name -db_name $db_name -user_name $user_name -password $password} 
PAUSE