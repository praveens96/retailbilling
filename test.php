<?php 
	require_once("php/manageDBOps.php");
	$ClothTypes = FetchColumn("typeofclothing","ClothingType");
	echo count($ClothTypes);
	$rows = FetchColumn("brands","BrandName");
	echo count($rows);
	echo "0";
?>