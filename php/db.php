<?php 
	require_once '../php/PHPExcel/Classes/PHPExcel.php';
	include_once("DBSettings.php");
	//determine which DB function to call
	$dbFunc = $_POST['operation'];
	// echo $dbFunc;
	
	//db settings
	// $host = "localhost";
	// $dbname = "sadhanatextilesdb";
	// $username="praveens";
	// $password="WaWbx5Kx6pTvu6RL";
	// $i = $i+1;
	// $DetailsMapping = array("BillDetails"=>array("bill","billitems"),
							// "PurchaseDetails"=>array("purchases","purchaseitems"),
							// "AvailabilityReport"=>array("itemsavailable"));
	try
	{
	$DBH = GetDBHandle();//new PDO("mysql:host=".$host.";dbname=".$dbname.";port=".$port,$username,$password) or die("Not able to connect");
	// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	// echo "in dbpho";
	if($DBH!=null)
	{
	// echo "Connected";
		
		switch($dbFunc)
		{
			case "fetch":
				$dbCols = $_POST['cols'];
				$dbTable = $_POST['table'];
				$dbArgCols =array();
				foreach($dbCols as $colInTable)
				{
					array_push($dbArgCols,$colInTable); 
				}
				$stringCols = rtrim(implode(',', $dbArgCols), ',');
				
				$insQuery = "select ".$stringCols." from ".$dbTable;
				//echo $insQuery;
				$SelHandle = $DBH->query($insQuery);
				$obj = $SelHandle ->fetchAll(PDO::FETCH_ASSOC);
				echo json_encode($obj);
				break;
			case "FetchMatchingColumnValue":
				$dbCols = $_POST['cols'];
				$dbTable = $_POST['table'];
				$varValueToSearch = $_POST['ValueToSearch'];
				FetchMatchingColumnValue("itemsavailable","purchaseitems","ImagePath","Itemid","ItemName",$varValueToSearch);
				break;
			case "PurchasesInsertion":
				InsertPurchase();
				break;
			case "GetAllItemDetails":
				$SelectedItemName = $_POST['ValueToSearch'];
				FetchAllItemDetails($SelectedItemName);
				break;
			case "FetchBillDetails":
				$QueryBillID = $_POST['QueryBillID'];
				FetchBillDetails($QueryBillID);
				break;
			case "UpdateBillItems":
				$ItemDetails = $_POST['ItemsArray'];
				$BillDetails = $_POST['BillDetails'];
				DeleteAndInsertItems($ItemDetails,$BillDetails);
				break;
			case "ExportDetails":
				// echo "ExportDetails";
				$UserDetailsSelection = $_POST['DetailsSelected'];
				$UserTimelineSelection = $_POST['TimelineSelected'];
				//$UserTimelineSelection["FromDate"]."::"; //.$i++
				$FetchedExportDetails = FetchDetailsToExport($UserTimelineSelection,$UserDetailsSelection);
				//WriteToExcel($FetchedExportDetails);
				break;
			case "ItemsAvailabilityReport":
				$ReportTable = "itemsavailable";
				$ColsRequired = $_POST['ColumnsRequired'];
				// GetAvailableItemsForReprt($ReportTable,$ColsRequired);
				$SelectionReturn = SelectColsOfaTable($ReportTable,$ColsRequired);
				print_r(json_encode($SelectionReturn));
				break;
			case "SalesReport":
				$RequiredTimeSpan = $_POST['TimePerioad'];
				GetSalesReport($RequiredTimeSpan);
				break;
			case "SalesBetweenDates":
				$dataFromDate = $_POST['FromDate'];
				$dataToDate = $_POST['ToDate'];
				GetBills($dataFromDate,$dataToDate);
				break;
			case "GetBillItems":
				$BillID = $_POST['BillID'];
				GetBillItems($BillID);
				break;
		}
	
	}
	$DBH =null;
	}
	catch(PDOException $ex)
	{
		echo $ex->getMessage();
	}
	
	function FetchDetailsToExport($UserTimelineSelection,$UserDetailsSelection)
	{
		
		// $host = "localhost";
		// $dbname = "sadhanatextilesdb";
		// $username="praveens";
		// $password="WaWbx5Kx6pTvu6RL";
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		$header = '';
		$result ='';
		$ExportQueryReturn = '';
		$PrintData = array();
		$objPHPExcel = new PHPExcel();
		$ExportFromDate = '1000-01-01';
		$ExportToDate = '9999-12-31';
		$ExportTablenames = array();
		$ExportColumnToCheck = '';
		$ExportIDColumn = '';
		$SheetName = '';
		$ItemsSheetName = '';
		if($DBH!=null)
		{
			
			$objTimeline = $UserTimelineSelection;//json_decode(
			if($UserTimelineSelection["FromDate"] !='' && $UserTimelineSelection["ToDate"] != '')
			{
				$ExportFromDate = $UserTimelineSelection["FromDate"];//$objTimeline->{'FromDate'};
				$ExportToDate= $UserTimelineSelection["ToDate"];//$objTimeline->{'ToDate'};
			}
			if($UserDetailsSelection == "BillDetails" || $UserDetailsSelection == "PurchaseDetails")
			{
				if($UserDetailsSelection == "BillDetails")
				{
					array_push($ExportTablenames, 'bill','billitems');
					$ExportColumnToCheck = 'BillDate';
					$ExportIDColumn = 'BillID';
					$SheetName = "Bill Details";
					$ItemsSheetName = "Bill Items";
				}
				else if($UserDetailsSelection == "PurchaseDetails")
				{
					array_push($ExportTablenames,'purchases','purchaseitems');
					$ExportColumnToCheck = 'dateofpurchase';
					$ExportIDColumn = 'purchaseId';
					$SheetName = "Purchases";
					$ItemsSheetName = "Purchase Items";
				}
				else
				{
					
				}
					
					
				$QueryString = "select * from ".$ExportTablenames[0]." where ".$ExportColumnToCheck." between '".$ExportFromDate."' and '".$ExportToDate."'";
				// echo $QueryString;
				$QueryItemsString = "select t2.* from ".$ExportTablenames[0]." t1,".$ExportTablenames[1].
									" t2 where ( (t1.".$ExportColumnToCheck ." between '".$ExportFromDate."' AND '".$ExportToDate."') and t1.".$ExportIDColumn." = t2.".$ExportIDColumn.")";
				
				date_default_timezone_set('Asia/Kolkata');
				$dt = date('d_m_Y_H_i'); //30_08_2015_18_47
				
				if (!file_exists('C:/Exports/')) {
					mkdir('C:/Exports/', 0777, true);
				}
				$FilePath = "C:/Exports/".$ExportTablenames[0]."_Export_".$dt.".xlsx";
				echo $SheetName;
				ExecuteAndWrite($QueryString,$FilePath,$SheetName);
				ExecuteAndWrite($QueryItemsString,$FilePath,$ItemsSheetName);
					
			}
			else
			{
				// $ExportSQLQuery = $DBH->prepare("select * from bill where (BillDate between '2014-12-10' and '2014-12-12'");
				// $ExportSQLQuery->execute();
				// // select * from bill where (BillDate between '2014-12-10' and '2014-12-12')
				// $ExportItemsSQLQuery = $DBH->prepare("select bi.* from bill b,billitems bi where ( (b.BillDate between '2014-12-10' and '2014-12-12')
									  // and b.BillID = bi.BillID)");
			}	
				
		}
			// echo $ExportQueryReturn;
	}
		//return $PrintData;
	//}
	
	function ExecuteAndWrite($QueryString,$FilePath,$ExSheetName)
	{
		// $host = "localhost";
		// $dbname = "sadhanatextilesdb";
		// $username="praveens";
		// $password="WaWbx5Kx6pTvu6RL";
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		
		//PHPExcel object to write to excel
		if(file_exists($FilePath))
		{
			$objPHPExcel = PHPExcel_IOFactory::load($FilePath);
		}
		else
		{
			$objPHPExcel = new PHPExcel();
		}
		
		// echo "b4 dbh";
		if($DBH!=null)
		{
			// echo "dbh nt ";
			if($QueryString != '' && $FilePath != '')
			{
				$ExportSQLQuery = $DBH->prepare($QueryString);
			}
			$ExportSQLQuery->execute();
			$QueryReturn = $ExportSQLQuery->fetchAll(PDO::FETCH_ASSOC);
			$counter = 1;
			// if(file_exists($FilePath))
			// {
				// echo "b4";
				$NoOfSheets = $objPHPExcel->getSheetCount();
				$NoOfSheets++;
				$objPHPExcel->createSheet();
				$NoOfSheets = $objPHPExcel->getSheetCount();
				$objPHPExcel->setActiveSheetIndex($NoOfSheets-1);
				// echo $ExSheetName;
				$objPHPExcel->getActiveSheet()->setTitle($ExSheetName);
				print_r(array_keys($QueryReturn[0]));
				$objPHPExcel->getActiveSheet()->fromArray(array_keys($QueryReturn[0]),NULL,'A'.$counter++);
				foreach($QueryReturn as $ResultRow)
				{
					// print_r($ResultRow);
					// $objPHPExcel->setActiveSheetIndexByName($SheetName);
					// $objPHPExcel->setActiveSheetIndex(0);
					
					// $objPHPExcel->setActiveSheetIndexByName($SheetName);
					
					$objPHPExcel->getActiveSheet()->fromArray($ResultRow, NULL, 'A'.$counter);
					$counter++;
				}
				$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
				 // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
				$objWriter->save($FilePath);
			//}
		}
	}
	
	function WriteToExcel($FetchedExportDetails)
	{
		$ExcelFileName = "Report.xls";
		if($FetchedExportDetails!='')
		{
			//print_r( $FetchedExportDetails->fetchAll());
			 // $colcount = $FetchedExportDetails->columnCount();
			 // //$ExportData = $FetchedExportDetails->fetchAll()
			 $ExportData = $FetchedExportDetails->fetchAll(PDO::FETCH_ASSOC);
			 
			$file = fopen("report_.csv","w");
			fputcsv($file,array_keys($ExportData[0]));
			foreach($ExportData as $BillRow)
			{
				fputcsv($file,$BillRow);
				// print_r($BillRow);
			}
			
			// echo implode(",",$ExportData);
			fclose($file);

		}
	}
	
	function FetchMatchingColumnValue($RequiredColTable,$MatchWithTable,$ValueReqCol,$IDColName,$MatchValueColumn,$value)
	{
		// $host = "localhost";
		// $dbname = "sadhanatextilesdb";
		// $username="praveens";
		// $password="WaWbx5Kx6pTvu6RL";
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		
		if($DBH!=null)
		{			
			$QueryMatchnReturnValue = $DBH->prepare("select ".$ValueReqCol." from ".$RequiredColTable." where ".$IDColName." = (select ".$IDColName." from ".$MatchWithTable." where ".$MatchValueColumn." like '".$value."')");
			echo	$QueryMatchnReturnValue->execute();
		}
	}
	
	function InsertPurchase()
	{
		// #$PurchaseName,$PurchaseDate,$PurchasedFrom,$ItemType,$BrandName,$QualityLevel,$CostPrice,$PurchaseQuantity,$ItemName
		// $host = "localhost";
		// $dbname = "sadhanatextilesdb";
		// $username="praveens";
		// $password="WaWbx5Kx6pTvu6RL";
		
		#get parameters
		// $PurchaseName,$PurchaseDate,$PurchasedFrom,$ItemType,$BrandName,$QualityLevel,$CostPrice,$PurchaseQuantity,$ItemName
		// purchasename:$PurchaseName, type:$type,Brand:$Brand,Quality:$Quality,PurchasedFrom:$purchasedfrom,puchasedate:$puchasedate, CostPrice:$CostPrice,Quantity:$Quantity,ItemName:$ItemName
		$PurchaseName = $_POST['purchasename'];
		$PurchaseDate = $_POST['purchasedate'];
		$PurchasedFrom =$_POST['PurchasedFrom'];
		$ItemType = $_POST['type'];
		$BrandName = $_POST['Brand'];
		$QualityLevel = $_POST['Quality'];
		$CostPrice = $_POST['CostPrice'];
		$PurchaseQuantity = $_POST['Quantity'];
		$ItemName = $_POST['ItemName'];
		$PurchaseName = $_POST['PurchaseName'];
		$SellingPrice = $_POST['SellingPrice'];
		$NickName = $_POST['NickName'];
		$Discount = $_POST['Discount'];
		$ImagePath = $_POST['ItemImage'];
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		
		if($DBH!=null)
		{
			//$PurchasesInsertion_SP = $DBH->prepare("CALL sp_Purchases('".$PurchaseName."', '".$PurchaseDate."','".$PurchasedFrom."','".$ItemType."','".
				//														$BrandName."','".$QualityLevel."',".$CostPrice.",".$PurchaseQuantity.",".$ItemName);
													// call sp_purchases('test','2015-12-12','test store','test type','test brand','test qual',140,100,'mytstitem',20);
			$PurchasesInsertion_SP = $DBH->prepare("CALL sp_Purchases(?,?,?,?,?,?,?,?,?,?,?,?,?)");
			$PurchasesInsertion_SP->bindParam(1,$PurchaseName,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(2,date('Y-m-d H:i:s', strtotime($PurchaseDate)),PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(3,$PurchasedFrom,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(4,$ItemType,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(5,$BrandName,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(6,$QualityLevel,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(7,$CostPrice,PDO::PARAM_INT);
			$PurchasesInsertion_SP->bindParam(8,$PurchaseQuantity,PDO::PARAM_INT);
			$PurchasesInsertion_SP->bindParam(9,$ItemName,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(10,$SellingPrice,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(11,$Discount,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(12,$NickName,PDO::PARAM_STR);
			$PurchasesInsertion_SP->bindParam(13,$ImagePath,PDO::PARAM_STR);
			$PurchasesInsertion_SP->execute();
		}
	}
	
	function FetchAllItemDetails($SelectedItemName)
	{
		if($SelectedItemName!= '' && $SelectedItemName != null)
		{
			// $host = "localhost";
			// $dbname = "sadhanatextilesdb";
			// $username="praveens";
			// $password="WaWbx5Kx6pTvu6RL";
			$DBH = GetDBHandle();
			// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
			// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			
			if($DBH!=null)
			{	
				// $SelectedItemDetails = '';
				// $FetchAllItemDetailsReturn = $DBH->prepare("CALL sp_FetchAllItemDetails(?,@pItemDetails); select @pItemDetails;");
				$FetchAllItemDetailsReturn = $DBH->prepare("select TC.ClothingType, Brand.BrandName, Qual.ClothQualityLevel, IA.sellingPrice, 
																	IA.Discount, IA.NickName, IA.ImagePath, PI.costprice, PI.purchasedfrom
															FROM typeofclothing TC, purchaseitems PI, brands Brand, quality Qual, itemsavailable IA
															Where PI.typeid = TC.typeid AND
															PI.Brandid = Brand.Brandid AND
															PI.ClothQualityID = Qual.ClothQualityID AND
															PI.Itemid = IA.Itemid AND
															PI.ItemName = ?;");
				$FetchAllItemDetailsReturn->bindParam(1,$SelectedItemName,PDO::PARAM_STR);
				// $FetchAllItemDetailsReturn->bindParam(2,$SelectedItemDetails,PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT,4000);
				 $FetchAllItemDetailsReturn->execute();
				print_r(json_encode($FetchAllItemDetailsReturn->fetch()));
				 // echo $FetchAllItemDetailsReturn->fetch();
			}
		}
		
	}
	
	function FetchBillDetails($BillID)
	{
		if($BillID != '' && $BillID != 'NaN')
		{
			// print "xame";
			// $host = "localhost";
			// $dbname = "sadhanatextilesdb";
			// $username="praveens";
			// $password="WaWbx5Kx6pTvu6RL";
			$DBH = GetDBHandle();
			// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
			// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			
			if($DBH!=null)
			{	
				// print 'cull';
				$FetchBillDetailsQuery = $DBH->prepare("select * from bill b, billitems bi where b.billid = ?  and bi.billid = ?"); 
				$FetchBillDetailsQuery->bindParam(1,$BillID,PDO::PARAM_INT);
				$FetchBillDetailsQuery->bindParam(2,$BillID,PDO::PARAM_INT);
				$FetchBillDetailsQuery->execute();
				print_r(json_encode($FetchBillDetailsQuery->fetchAll()));
			}
		}
	}
	
	function DeleteAndInsertItems($BillItemsArray,$BillDetails)
	{
		if($BillItemsArray != '' && $BillItemsArray != 'NaN' && $BillDetails!='' && $BillDetails !='NaN')
		{
			//delete rows of matching billid
			// $host = "localhost";
			// $dbname = "sadhanatextilesdb";
			// $username="praveens";
			// $password="WaWbx5Kx6pTvu6RL";
			$DBH = GetDBHandle();
			// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
			// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			
			//Input data
			$BillIDToUpdate = $BillItemsArray[0]['BillID'];
			// print_r( $BillID);
			if($DBH!=null)
			{
				// $DeleteItemsStmt = $DBH->prepare('delete from billitems where BillID=?');
				// $DeleteItemsStmt->bindParam(1,$BillIDToUpdate,PDO::PARAM_INT);
				// $DeleteItemsStmt->execute();
				
				//insert billitems
				//update items
				for($i=0;$i< count($BillItemsArray);$i++)
				{
					$UpdateItemDetails = $DBH->prepare("update sadhanatextilesdb.billitems SET Quantity =?, Rate =?, Amount =?
														WHERE billitems.BillID =? AND billitems.ItemID =?" );
					$UpdateItemDetails->bindParam(1,$BillItemsArray[$i]["Quantity"],PDO::PARAM_INT);
					$UpdateItemDetails->bindParam(2,$BillItemsArray[$i]["Rate"],PDO::PARAM_INT);
					$UpdateItemDetails->bindParam(3,$BillItemsArray[$i]["Amount"],PDO::PARAM_INT);
					$UpdateItemDetails->bindParam(4,$BillItemsArray[$i]["BillID"],PDO::PARAM_INT);
					$UpdateItemDetails->bindParam(5,$BillItemsArray[$i]["ItemID"],PDO::PARAM_INT);
					$UpdateItemDetails->execute();
				}
				//update bill
				// print_r ($BillDetails[0]["BillID"]);
				$UpdateBillDetailsQuery = $DBH->prepare("update sadhanatextilesdb.bill SET BillDate =?, BillAmount =?, NetBillAmount=?,
														discount=?, amountreceived=?, balancetendered=?, CustomerMobileNo=? 
														 WHERE bill.BillID = ? ");
				$UpdateBillDetailsQuery->bindParam(1,$BillDetails[0]["BillDate"]);										
				$UpdateBillDetailsQuery->bindParam(2,$BillDetails[0]["Billamount"]);										
				$UpdateBillDetailsQuery->bindParam(3,$BillDetails[0]["Net"]);										
				$UpdateBillDetailsQuery->bindParam(4,$BillDetails[0]["Discount"]);										
				$UpdateBillDetailsQuery->bindParam(5,$BillDetails[0]["Received"]);										
				$UpdateBillDetailsQuery->bindParam(6,$BillDetails[0]["Balance"]);										
				$UpdateBillDetailsQuery->bindParam(7,$BillDetails[0]["Mobile"]);										
				$UpdateBillDetailsQuery->bindParam(8,$BillIDToUpdate);										
				$UpdateBillDetailsQuery->execute();
				// print $UpdateBillDetailsQuery->fetchAll();
			}
			
			//insert in billitems
			// for($i=0;$i< count($BillItemsArray);$i++)
			// {
				// $stmtBillItems = $DBH->prepare("CALL sp_billitems_ins(?,?,?,?,?,?)");
				// $stmtBillItems->bindParam(1,$BillItemsArray[i]['BillID'],PDO::PARAM_INT);
				// $stmtBillItems->bindParam(2,$BillItemsArray[i]['ItemID'],PDO::PARAM_INT);
				// $stmtBillItems->bindParam(3,$BillItemsArray[i]['ItemName'],PDO::PARAM_STR);
				// $stmtBillItems->bindParam(4,$BillItemsArray[i]['Quantity'],PDO::PARAM_INT);
				// $stmtBillItems->bindParam(5,$BillItemsArray[i]['Rate'],PDO::PARAM_INT);
				// $stmtBillItems->bindParam(6,$BillItemsArray[i]['Amount'],PDO::PARAM_INT);
				
				// $stmtBillItems->execute();
			
			// }
		}
	}
	
	function SelectColsOfaTable($TableName, $ColsArray)
	{
		$ColsString = '';
		// $host = "localhost";
		// $dbname = "sadhanatextilesdb";
		// $username="praveens";
		// $password="WaWbx5Kx6pTvu6RL";
		$QueryReturn = array();
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		if($TableName!='' && count($ColsArray)>0 && $DBH != null)
		{
			foreach($ColsArray as $ColName)
			{
				$ColsString = $ColName.",".$ColsString;
			}
			$rtrimmed = rtrim($ColsString,",");
			$QueryString = "select ".$rtrimmed." from ".$TableName;
			// echo $QueryString;
			$objQuery = $DBH->prepare($QueryString);
			$objQuery->execute();
			$QueryReturn = $objQuery->fetchAll(PDO::FETCH_ASSOC);
		}
		return $QueryReturn;
	}

	function GetSalesReport($RequiredTimeSpan)
	{
		// $host = "localhost";
		// $dbname = "sadhanatextilesdb";
		// $username="praveens";
		// $password="WaWbx5Kx6pTvu6RL";
		$QueryReturn = array();
		$DBH = GetDBHandle();
		// $DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		// $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		if($RequiredTimeSpan != '' && $RequiredTimeSpan!= null)
		{
			$FromDate = $RequiredTimeSpan['FromDate'];
			$ToDate = $RequiredTimeSpan['ToDate'];
			$QSoldUniqueItemsandCP = $DBH->prepare("select ia.discount* uniqueids.itemcount as AggItem_Discount,ia.sellingprice* uniqueids.itemcount as AggItem_SPSale,
													pi.itemid,costprice * uniqueids.itemcount as AggItem_CPSale from purchaseitems as pi
													LEFT JOIN(select itemid,sum(quantity) as itemcount from billitems 
													where BillID in (select billid from bill WHERE billdate between ? and ?) group by itemid) uniqueids 
													on pi.itemid = uniqueids.itemid 
													LEFT JOIN itemsavailable ia
													on ia.itemid = pi.itemid
													having AggItem_CPSale IS NOT NULL");
			$QSoldUniqueItemsandCP->bindParam(1,$FromDate,PDO::PARAM_INT);
			$QSoldUniqueItemsandCP->bindParam(2,$ToDate,PDO::PARAM_INT);
			$QSoldUniqueItemsandCP->execute();
			print_r(json_encode($QSoldUniqueItemsandCP->fetchAll()));
		}
	}
	
	function GetBills($dataFromDate,$dataToDate)
	{
		if($dataFromDate!='' && $dataToDate!='')
		{
			$DBH = GetDBHandle();
			$GetBillsQuery = $DBH->prepare("select BillID as ID,CustomerName as Name,BillDate,BillAmount as Amount,NetBillAmount as Net,Discount,
											amountreceived as Received, balancetendered as Balance, CustomerMobileNo as Mobile, TaxAmount as Tax, Biller 
											from bill where BillDate between ? and ?");
			$GetBillsQuery->bindParam(1,$dataFromDate,PDO::PARAM_STR);
			$GetBillsQuery->bindParam(2,$dataToDate,PDO::PARAM_STR);
			$GetBillsQuery->execute();
			print_r(json_encode($GetBillsQuery->fetchAll()));
			
		}
	}
	
	function GetBillItems($BillID)
	{
		if($BillID != '' && $BillID != null)
		{
			$DBH = GetDBHandle();
			$ItemDetailsQuery = $DBH->prepare("select * from billitems where BillID = ?");
			$ItemDetailsQuery->bindParam(1,$BillID,PDO::PARAM_INT);
			$ItemDetailsQuery->execute();
			print_r(json_encode($ItemDetailsQuery->fetchAll()));
		}
	}
?>