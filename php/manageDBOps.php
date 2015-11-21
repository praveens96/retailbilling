<?php 
	require_once('DBSettings.php');
	
	function FetchColumn($table,$column)
	{
		
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		if($DBH!=null)
		{	
			// echo "Connected";
			$query = "select ".$column." from ".$table;
			
			$QuerySelect = $DBH->prepare($query) or die("error");
			 $QuerySelect->execute();
			$res = $QuerySelect->fetchAll() or die();
			//echo count($res);
			// foreach($res as $r)
				// echo $r[0];
			
			return $res;
			
		}
	}
?>
