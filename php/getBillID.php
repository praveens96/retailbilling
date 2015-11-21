<?php 
	include_once("DBSettings.php");
	try
	{
		$AutoInc = $_POST["GetAutoIncrementValue"];
		$DBH = GetDBHandle();//new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			
		if($AutoInc != 1)
		{
			if($DBH!=null)
			{	
				//echo "Connected";
				$SelectStmt = $DBH->prepare("select MAX(billid) as MaxBillID from bill order by MaxBillID LIMIT 1");
				$SelectStmt->execute();
				
				$result = $SelectStmt->fetch(PDO::FETCH_LAZY);
				print_r($result->MaxBillID);
			}
		}
		else
		{
			if($DBH!=null)
				$SelectAutoIncStmt = $DBH->prepare("SELECT `AUTO_INCREMENT`
											FROM  INFORMATION_SCHEMA.TABLES
											WHERE TABLE_SCHEMA = '".$dbname."'
											AND   TABLE_NAME   = 'bill';");
				$SelectAutoIncStmt->execute();
			{	
					 //echo $SelectStmt;
				$result = $SelectAutoIncStmt->fetch(PDO::FETCH_LAZY);
				print_r($result->AUTO_INCREMENT);
			}
		}
	}
	catch(PDOException $ex)
	{
		echo $ex->getMessage();
	}
?>