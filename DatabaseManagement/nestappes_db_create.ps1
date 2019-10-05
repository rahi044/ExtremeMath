 param (
	[string]$server_name,
    [string]$db_name,
    [string]$db_data_folder, 
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
$db_create_scripts_folder=$execution_path+"\CreateScripts\" 
$filesToProcess=@()

$create_script_files=Get-ChildItem -Path $db_create_scripts_folder

if($create_script_files -and $create_script_files.Length -gt 0)
{
    foreach($file in $create_script_files)
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

$sql_params="db_name="+$db_name  

if($filesToProcess -and $filesToProcess.Length -gt 0)
{
    $filesToProcess=$filesToProcess | Sort-Object Version_no

    echo 'Current processing create scripts name:'
    foreach($script_file in $filesToProcess)
    {        
        $current_file_full_path=$db_create_scripts_folder+$script_file.Name        
        echo "Executing: "$current_file_full_path 
        if($script_file.Name -eq "001_CreateDatabase.sql") 
		{
			$param1="db_name="+$db_name 
			$param2="db_data_folder="+$db_data_folder 
			$ParamsArray=$param1,$param2 
			Invoke-Sqlcmd -inputfile $current_file_full_path -ServerInstance $server_name -Username $user_name -Password $password -Variable $ParamsArray 
		} 
		else 
		{
			Invoke-Sqlcmd -inputfile $current_file_full_path -ServerInstance $server_name -Username $user_name -Password $password -Variable $sql_params  
		}
    }
}

