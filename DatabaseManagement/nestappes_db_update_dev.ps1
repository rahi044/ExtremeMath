$execution_path=split-path -parent $MyInvocation.MyCommand.Definition 
$db_sp_script_path=$execution_path+"\nestappes_db_update.ps1" 
$server_name=".\SQLEXPRESS" 
$db_name="nestappes_db" 
$user_name="sa"
$password="Pass@1234" 
Invoke-Command -ScriptBlock {& $db_sp_script_path -server_name $server_name -db_name $db_name -user_name $user_name -password $password} 
PAUSE