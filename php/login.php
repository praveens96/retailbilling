<?php 
include_once("DBSettings.php");

	$chkSession = "";
	$logout = "";
	if(isset($_POST["CheckSession"]))
	{
		$chkSession = $_POST["CheckSession"];
	}
	if(isset($_POST["logout"]))
	{
		$logout = $_POST["logout"];
	}
	if($chkSession) //if only to check session
	{
		session_start();
		if(isset($_SESSION['LoggedInUser']))
		{
			$usern = $_SESSION['LoggedInUser'];
			echo $usern;
		}
		else
		{
			echo "";
		}
	}
	else //when login button clicked
	{
		if($logout)
		{
			$_SESSION['LoggedInUser']="";
			$_SESSION['UserRole']="";
			
			if($_SESSION)
			{
			session_start();
				session_destroy();
			}
		}
		else
		{
			$loginusername = $_POST['username'];
			$loginhash =$_POST['passwordhash'];
			 // echo "mysql:host=".$host.";dbname=".$dbname."$loginusername"."$loginhash"; //.";port=".$port
			$DBH = GetDBHandle();//new PDO("mysql:host=".$host.";dbname=".$dbname.";port=".$port,$username,$password) or die("Not able to connect"); //<!--.";port=".$port-->
			// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			
			if($DBH != null)
			{
				$checkuser = $DBH->prepare("CALL sp_CheckUser(?,?)");
				$checkuser->bindParam(1,$loginusername,PDO::PARAM_STR);
				$checkuser->bindParam(2,$loginhash,PDO::PARAM_STR);
				// echo "loginhash ".$loginhash;
				$checkuser->execute();
				// echo $checkuser->rowCount();
				if($checkuser->rowCount() == '1')
				{
					echo "count:".$checkuser->rowCount();
					$row = $checkuser->fetch();//All(PDO::FETCH_ASSOC);
					session_start();
					// echo $row[1];
					$_SESSION['LoggedInUser'] = $row[0]; 
					$_SESSION['UserRole'] = $row[1];
				}
				
				// $row = $checkuser->fetch();//All(PDO::FETCH_ASSOC);
				// echo "username".$row[0];
			}
		}
	}
	
?>