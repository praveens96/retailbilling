<?php
//db settings
	 $host = "localhost";
	 $dbname = "sadhanatextilesdb";
	 $port = "8806";
	 $username="praveens";
	 $password="B86trPA8u8yXSCd7";//HZdE3HC3GnWFmQfU, WaWbx5Kx6pTvu6RL
	
	function GetDBHandle()
	{
		global $host,$dbname,$port,$username,$password;
		$DBH = new PDO("mysql:host=".$host.";dbname=".$dbname.";port=".$port,$username,$password) or die("Not able to connect");
		$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		return $DBH;
	}
?>