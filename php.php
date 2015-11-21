<html>
<head></head>
<body>
<?php
	echo "hello";
	$host = "localhost";
	$dbname = "sadhanatextilesdb";
	$username="praveens";
	$password="WaWbx5Kx6pTvu6RL";
	//print_r(PDO::getAvailableDrivers());
	try
	{
	$DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
	$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	if($DBH!=null)
		//echo "Connected";
		$selh=$DBH->query("select * from Bill");
		//$selh->setFetchMode(PDO::FETCH_CLASS,'Bill')or die($DBH->errorInfo());
		$obj=$selh->fetchAll(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE,'Bill') or die($DBH->errorInfo());
		foreach($obj as $billrecord)
		{
			//echo "enterd";
			echo $billrecord->BillID." \r\n".PHP_EOL;
		}
		$DBH =null;
	}
	catch(PDOException $ex)
	{
		echo $ex->getMessage();
	}
	//$con = mysql_connect($dbh);
	//mysql_close($con);
	
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
 </body>
 </html>