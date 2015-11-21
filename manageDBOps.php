<?php 
	require_once('php/DBSettings.php');
	
	// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
	// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	// print_r( FetchColumn("typeofclothing","ClothingType"));
	
	// FetchMatchingColumnValue("table","firstCol","valueRequiredCol","MatchValue");
	
	function FetchColumn($table,$column)
	{	
		$DBH =  GetDBHandle();
		$QuerySelect = '' ;
		// echo "Connected";
		// echo "Connected";
		if($DBH!=null)
		{	
			// echo "Connected";
			$QuerySelect = $DBH->prepare("select ".$column." from ".$table);
			$QuerySelect->execute();
			
		}
		// return json_encode($QuerySelect->fetchAll()); 
		return ($QuerySelect->fetchAll()); 
	}
	
	
?>
