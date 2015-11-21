<?php
	include_once("DBSettings.php");
	include_once("DBSettings.php");
	//db settings
	// $host = "localhost";
	// $dbname = "sadhanatextilesdb";
	// $username="praveens";
	// $password="WaWbx5Kx6pTvu6RL";
	//PDO stuff
		session_start();
	$RowsOrder = $_POST["tblAppendGrid_rowOrder"];
	$arrUniqueIndexes = explode(",",$RowsOrder);
	//echo count($arrUniqueIndexes);

	//PDO stuff
	try
	{
	
	$DBH =  GetDBHandle();//new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
	//$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	if($DBH!=null)
	{	//echo "Connected";
		//$selh=$DBH->query("select * from Bill");
		//$selh->setFetchMode(PDO::FETCH_CLASS,'Bill')or die($DBH->errorInfo());
		//$obj=$selh->fetchAll(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE,'Bill') or die($DBH->errorInfo());
		
		//insert into bill table
		$CustomerName = $_POST["CustName"];
		$CustomerMobileNo = $_POST["customerMobile"];
		$Gross = $_POST["GrossAmount"];
		$discount = $_POST["BillDiscount"];
		$AmountReceived = $_POST["Received"];
		$BalTendered = $_POST["Tendered"];
		$NetBillAmount = $_POST["NetAmount"];
		$BillTaxAmount = $_POST["TaxAmount"];
		//$isNewBill  = $_POST["isNewBill"];
		// @LastInsertedBillID = -1;
		date_default_timezone_set('Asia/Calcutta');
		$dt = new DateTime();
		$BillDate = $dt->format("Y-m-d H:i:s");
		$CurrentBillNumber = $_POST["CurrentBillID"];
			//echo ($BillDate);
			//prepare pdo
		//$DBH->setAttribute(PDO::ATTR_EMULATE_PREPARES,TRUE);
		//delete all bill items first
		$stmtDelBillItem = $DBH->prepare("CALL sp_BillItemsDel(?)");
		$stmtDelBillItem->bindParam(1,$CurrentBillNumber,PDO::PARAM_INT);
		$stmtDelBillItem->execute();
		//insert into bill
		$DBH->beginTransaction();
		 //$GeneratedBillID =-1;
		// if($isNewBill == "1")
		// {
			$stmt = $DBH->prepare("CALL sp_insert_bill(?,?,?,?,?,?,?,?,@out,?,?,?)"); //no of ? = no of params, @out to get last insert id
			//pCustomerName,pBillDate,pBillAmount,pDiscount,pamountreceived,pbalancetendered,pCustomerMobile,pNetAmount
			
			$stmt->bindParam(1,$CustomerName,PDO::PARAM_STR);
			$stmt->bindParam(2,date('Y-m-d H:i:s', strtotime($BillDate)),PDO::PARAM_STR);
			$stmt->bindParam(3,$Gross,PDO::PARAM_INT);//,,,,);
			$stmt->bindParam(4,$discount,PDO::PARAM_INT);
			$stmt->bindParam(5,$AmountReceived,PDO::PARAM_INT);
			$stmt->bindParam(6,$BalTendered,PDO::PARAM_INT);
			$stmt->bindParam(7,$CustomerMobileNo,PDO::PARAM_INT);
			$stmt->bindParam(8,$NetBillAmount,PDO::PARAM_INT);
			// $stmt->bindParam(9,$LastInsertedBillID,PDO::PARAM_INT);
			$stmt->bindParam(9,$CurrentBillNumber,PDO::PARAM_INT);	
			$stmt->bindParam(10,$BillTaxAmount,PDO::PARAM_INT);
			// echo 'b4'.$_SESSION['LoggedInUser'];
			$stmt->bindParam(11,$_SESSION['LoggedInUser'],PDO::PARAM_STR);
			//$lastId = -1;
			//$stmt->bindParam("out",$lastId,PDO::PARAM_INT|PDO::PARAM_INPUT_OUTPUT,50);
			// echo "<script>console.log(  '" . $_SESSION['LoggedInUser']. "' );</script>";
			$stmt->execute();
			
			//getting last insert id out parameter
			//	$lastIdrRes = $DBH->query("SELECT @out"); 
				//$lastIDRow= $lastIdrRes->fetch();
				//echo $lastIDRow["@out"];
				//$GeneratedBillID = $lastIDRow["@out"];
			//end last insert id
			$DBH->commit();
			//insertion to bill done
		// }
		// else
		// {
			
			// $GeneratedBillID = $_POST["CurrentBillID"];
			// //echo $GeneratedBillID;
			// $stmtDelBillItem = $DBH->prepare("CALL sp_BillItemsDel(?)");
			// $stmtDelBillItem->bindParam(1,$GeneratedBillID,PDO::PARAM_INT);
			// $stmtDelBillItem->execute();
		// }
		
		
		//echo $CurrentBillNumber;

		//insert into bill items
		for($i=0;$i<count($arrUniqueIndexes);$i++)
		{
		//echo $i;
			$BillItemID = $_POST["tblAppendGrid_ItemID_".$arrUniqueIndexes[$i]];
			$BillItemName = $_POST["tblAppendGrid_BillItem_".$arrUniqueIndexes[$i]];//$_POST['tblAppendGrid_BillItem_'].$arrUniqueIndexes[$i];
			$BItemQuant = $_POST["tblAppendGrid_BItemQuant_".$arrUniqueIndexes[$i]];
			$BItemPrice = $_POST["tblAppendGrid_BItemPrice_".$arrUniqueIndexes[$i]];
			$BillItemAmount = $_POST["tblAppendGrid_BItemAmount_".$arrUniqueIndexes[$i]];
			
			//$B
			//Billid,itemid,name,qty,price,amount
			//echo "$GeneratedBillID";
			$stmtBillItems = $DBH->prepare("CALL sp_billitems_ins(?,?,?,?,?,?)");
			$stmtBillItems->bindParam(1,$CurrentBillNumber,PDO::PARAM_INT);
			$stmtBillItems->bindParam(2,$BillItemID,PDO::PARAM_INT);
			$stmtBillItems->bindParam(3,$BillItemName,PDO::PARAM_STR);
			$stmtBillItems->bindParam(4,$BItemQuant,PDO::PARAM_INT);
			$stmtBillItems->bindParam(5,$BItemPrice,PDO::PARAM_INT);
			$stmtBillItems->bindParam(6,$BillItemAmount,PDO::PARAM_INT);
			
			$stmtBillItems->execute();
			//echo "bill item inserted";
		}
		echo "InsertedBillID:".$CurrentBillNumber;
		// foreach($obj as $billrecord)
		// {
			// //echo "enterd";
			// //echo $billrecord->BillID;//." \r\n".PHP_EOL;
		// }
	}
		$DBH =null;
	}
	catch(PDOException $ex)
	{
		echo $ex->getMessage();
	}
	
	#Bill Class
	class Bill
	{
		public $BillID;
		public $CustomerName;
		public $BillDateTime;
		
		//public $CustomerMobileNo;
		public $BillAmount;
		public $Discount;
		
		//public $MoneyReceived;
		//public $BalanceTendered;
		
		// function __construct($bid,$bdt,$cname,$cmob,$disc,$billamount) #//,$MoneyRec,$balTen)
		// {
			// $this->BillID = $bid;
			// $this->CustomerName = $cname;
			// $this->BillDateTime = $bdt;
			// //$this->$CustomerMobileNo = $cmob;
			// $this->Discount = $disc;
			// $this->BillAmount = $billamount;
			// //$this->MoneyReceived = $MoneyRec;
			// //$this->$BalanceTendered =$balTen;
		// }
	}
	#Bill Items Class
	class BillItems
	{
		public $BillID;
		public $ItemName;
		public $Quantity;
		public $Rate;
		public $Amount;
		
		// function __construct($bid,$name,$qty,$rate,$amount)
		// {
			// $this->BillID = $bid;
			// $this->ItemName = $name;
			// $this->Quantity = $qty;
			// $this->Rate =$rate;
			// $this->Amount = $amount;
		// }
	}
?>