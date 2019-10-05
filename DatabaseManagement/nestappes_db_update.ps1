 param (
	[string]$server_name,
    [string]$db_name,
	[string]$user_name, 
	[string]$password
 )

if($server_name -eq $null -or $server_name -eq "") 
{
	$server_name= Read-Host 'Server Name' 
}
if($db_name -eq $null -or $db_name -eq "") 
{
	$db_name= Read-Host 'Database Name' 
}
if($user_name -eq $null -or $user_name -eq "") 
{
	$user_name= Read-Host 'User Name' 
}
if($password -eq $null -or $password -eq "") 
{
	$password= Read-Host 'Password' 
}

$sql_params="db_name="+$db_name  

$execution_path=split-path -parent $MyInvocation.MyCommand.Definition 

$update_scripts_folder=$execution_path+"\UpdateScripts\" 
$update_files_to_process=@() 
$update_files=Get-ChildItem -Path $update_scripts_folder 
if($update_files -and $update_files.Length -gt 0) 
{
    foreach($file in $update_files)
    {
        $fileNameArray=$file.Name.Split('_')
        
        $strFileVersion=$fileNameArray[0]

        if($strFileVersion)
        {
            [int]$fileVersionNumber= [convert]::ToInt32($strFileVersion, 10)     
            
            $fileObj = New-Object System.Object
            $fileObj | Add-Member -type NoteProperty -name Name -value $file.Name
            $fileObj | Add-Member -type NoteProperty -name version_no -value ($fileVersionNumber)
            $update_files_to_process += $fileObj            
        }
    }
}

if($update_files_to_process -and $update_files_to_process.Length -gt 0)
{
    $update_files_to_process=$update_files_to_process | Sort-Object Version_no

    echo 'Processing update scripts:'
    foreach($script_file in $update_files_to_process)
    {        
        $current_file_full_path=$update_scripts_folder+$script_file.Name        
        echo "Executing: "$current_file_full_path 
		Invoke-Sqlcmd -inputfile $current_file_full_path -ServerInstance $server_name -Database $db_name -Username $user_name -Password $password -Variable $sql_params  
    }
}


$sp_scripts_folder=$execution_path+"\StoredProcedures\" 
$filesToProcess=@()

$sp_script_files=Get-ChildItem -Path $sp_scripts_folder

if($sp_script_files -and $sp_script_files.Length -gt 0)
{
    foreach($file in $sp_script_files)
    {
        $fileNameArray=$file.Name.Split('_')
        
        $strFileVersion=$fileNameArray[0]

        if($strFileVersion)
        {
            [int]$fileVersionNumber= [convert]::ToInt32($strFileVersion, 10)     
            
            $fileObj = New-Object System.Object
            $fileObj | Add-Member -type NoteProperty -name Name -value $file.Name
            $fileObj | Add-Member -type NoteProperty -name version_no -value ($fileVersionNumber)
            $filesToProcess += $fileObj            
        }
    }
}


if($filesToProcess -and $filesToProcess.Length -gt 0)
{
    $filesToProcess=$filesToProcess | Sort-Object Version_no

    echo 'Processing SP scripts:'
    foreach($script_file in $filesToProcess)
    {        
        $current_file_full_path=$sp_scripts_folder+$script_file.Name        
        echo "Executing: "$current_file_full_path 
		Invoke-Sqlcmd -inputfile $current_file_full_path -ServerInstance $server_name -Database $db_name -Username $user_name -Password $password -Variable $sql_params  
    }
}
echo "All stored procedures created" 
echo "Inserting prerequisite data..." 
$insert_script_path=$execution_path+"\nestappes_db_insert_data.ps1" 
Invoke-Command -ScriptBlock {& $insert_script_path -server_name $server_name -db_name $db_name -user_name $user_name -password $password} 

$delete_scripts_folder=$execution_path+"\DeleteScripts\" 
$delete_files_to_process=@() 
$delete_files=Get-ChildItem -Path $delete_scripts_folder 
if($delete_files -and $delete_files.Length -gt 0) 
{
    foreach($file in $delete_files)
    {
        $fileNameArray=$file.Name.Split('_')
        
        $strFileVersion=$fileNameArray[0]

        if($strFileVersion)
        {
            [int]$fileVersionNumber= [convert]::ToInt32($strFileVersion, 10)     
            
            $fileObj = New-Object System.Object
            $fileObj | Add-Member -type NoteProperty -name Name -value $file.Name
            $fileObj | Add-Member -type NoteProperty -name version_no -value ($fileVersionNumber)
            $delete_files_to_process += $fileObj            
        }
    }
}

if($delete_files_to_process -and $delete_files_to_process.Length -gt 0)
{
    $delete_files_to_process=$delete_files_to_process | Sort-Object Version_no

    echo 'Processing Delete scripts:'
    foreach($script_file in $delete_files_to_process)
    {        
        $current_file_full_path=$delete_scripts_folder+$script_file.Name        
        echo "Executing: "$current_file_full_path 
		Invoke-Sqlcmd -inputfile $current_file_full_path -ServerInstance $server_name -Database $db_name -Username $user_name -Password $password -Variable $sql_params  
    }
}