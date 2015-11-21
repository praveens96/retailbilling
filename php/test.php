<?php
require_once '../php/PHPExcel/Classes/PHPExcel.php';
$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A1', 'Hello')
            ->setCellValue('B2', 'world!')
            ->setCellValue('C1', 'Hello')
            ->setCellValue('D2', 'world!');
$objPHPExcel->getActiveSheet()->setTitle('Simple');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save(str_replace('.php', '.xlsx', __FILE__));
// header('Content-Type: application/force-download');  
			// header('Content-Description: File Transfer');
			// // header('Content-Type: application/octet-stream');
			// header('Content-Disposition: attachment; filename=file.csv');
			// header('Content-Transfer-Encoding: binary');
			// header('Expires: 0');
			// header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			// header('Pragma: public');
			// echo "\xEF\xBB\xBF"; // UTF-8 BOM
			// echo "test";
	// FetchDetailsToExport();
	WriteToExcel(FetchDetailsToExport());
	
	function FetchDetailsToExport()
	{
		// header('Content-Type: application/force-download');  
			// header('Content-Description: File Transfer');
			// // header('Content-Type: application/octet-stream');
			// header('Content-Disposition: attachment; filename=file.csv');
			// header('Content-Transfer-Encoding: binary');
			// header('Expires: 0');
			// header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			// header('Pragma: public');
			// echo "\xEF\xBB\xBF"; // UTF-8 BOM
			
		$host = "localhost";
		$dbname = "sadhanatextilesdb";
		$username="praveens";
		$password="WaWbx5Kx6pTvu6RL";
		
		$DBH = new PDO("mysql:host=".$host.";dbname=".$dbname,$username,$password) or die("Not able to connect");
		$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		$header = '';
		$result ='';
		$ExportQueryReturn = '';
		if($DBH!=null)
		{
			$ExportSQLQuery = $DBH->prepare("select * from bill");
			$ExportSQLQuery->execute();
			// echo $ExportQueryReturn;
		}
		return $ExportSQLQuery;
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
			 
			 // //print_r($colcount);
			 // //This Header is used to make data download instead of display the data 
			 // // header("Content-type: application/octet-stream"); 
				// // echo "disable_functions:".ini_get('disable_functions');
			
			// header('Content-Type: application/force-download');  
			// header('Content-Description: File Transfer');
			// // header('Content-Type: application/octet-stream');
			// header('Content-Disposition: attachment; filename=file.csv');
			// header('Content-Transfer-Encoding: binary');
			// header('Expires: 0');
			// header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			// header('Pragma: public');
			// echo "\xEF\xBB\xBF"; // UTF-8 BOM
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
?>