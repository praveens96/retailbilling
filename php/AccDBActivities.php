<?php 
	// echo "in acc php";
	include_once("DBSettings.php");
	//determine which DB function to call
	// echo "in acc php";
	$dbFunc = $_POST['operation'];
	// echo $dbFunc;
	switch($dbFunc)
	{
		case "CheckPass":
			$PassHashtoChk = $_POST['PasswordString'];
			CheckPassinDB($PassHashtoChk);
			break;
		case "UpdatePass":
			$NewPassHash = $_POST['NewPassHash'];
			UpdatePassHash($NewPassHash);
			break;
		case "InsertNew":
			$UserDetails = $_POST['UserDetails'];
			InsertIntoLogin($UserDetails);
			break;
		case "DeleteUser":
			$DeleteUserName = $_POST["DelUserName"];
			DeleteUser($DeleteUserName);
			break;
	}
	
	function CheckPassinDB($PassHashtoChk)
	{
		if($PassHashtoChk!='')
		{
			session_start();
			if(isset($_SESSION['LoggedInUser']))
			{
				$CurrUser = $_SESSION['LoggedInUser'];
				// echo $CurrUser;
				$DBH = GetDBHandle();
				$PassChkQuery = $DBH->prepare("select * from login where username = ? and passwordhash = ?");
				$PassChkQuery->bindParam(1,$CurrUser,PDO::PARAM_STR);
				$PassChkQuery->bindParam(2,$PassHashtoChk,PDO::PARAM_STR);
				$PassChkQuery->execute();
				print_r(json_encode($PassChkQuery->fetchAll()));
			}
			else
			{
				echo null;
			}
			
			
		}
		else
		{
			echo null;
		}
	}
	
	function UpdatePassHash($newpass)
	{
		if($newpass!='')
		{
			session_start();
			if(isset($_SESSION['LoggedInUser']))
			{
				$CurrUser = $_SESSION['LoggedInUser'];
				// echo $CurrUser;
				$DBH = GetDBHandle();
				$UpdatePassQuery = $DBH->prepare("update login set passwordhash = ? where username = ?");
				$UpdatePassQuery->bindParam(1,$newpass,PDO::PARAM_STR);
				$UpdatePassQuery->bindParam(2,$CurrUser,PDO::PARAM_STR);
				$UpdatePassQuery->execute() or die();
				echo $UpdatePassQuery->rowCount();
			}
		}
	}
	
	function InsertIntoLogin($UserDetails)
	{
		if($UserDetails!='')
		{
			$UserName = $UserDetails["UserName"];
			$UserRole = $UserDetails["UserRole"];
			$NewPassword = $UserDetails["Password"];
			// echo $UserName.$UserRole.$NewPassword;
			// print_r(json_encode(array("UpdateRowCount"=>"test")));
			$DBH = GetDBHandle();
			$InsertIntoLoginQuery = $DBH->prepare("insert into login(username,passwordhash,role) values(?,?,?)");
			$InsertIntoLoginQuery->bindParam(1,$UserName,PDO::PARAM_STR);
			$InsertIntoLoginQuery->bindParam(2,$NewPassword,PDO::PARAM_STR);
			$InsertIntoLoginQuery->bindParam(3,$UserRole,PDO::PARAM_STR);
			$InsertIntoLoginQuery->execute();
			print_r(json_encode(array("UpdateRowCount"=>$InsertIntoLoginQuery->rowCount())));
		}
	}
	
	function DeleteUser($DeleteUserName)
	{
		if($DeleteUserName!='')
		{
			$DBH = GetDBHandle();
			$DelUserQuery = $DBH->prepare("delete from login where username = ?");
			$DelUserQuery->bindParam(1,$DeleteUserName,PDO::PARAM_STR);
			$DelUserQuery->execute();
			print_r(json_encode(array("DeletedUsers"=>$DelUserQuery->rowCount())));
		}
	}
?>