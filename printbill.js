//print bill
$(document).ready(function(){

	$("#PrintBill").click(function(){
	debugger
		//window.print();
		$('#printBillDIv').printElement();
	});
	
	function formPrintTable(serializeBillData)
	{
		if(serializeBillData!=null)
		{
			$printtable = $('<table />');
			alert(serializeBillData["tblAppendGrid_rowOrder"]);
			//for(var $i=0;$i<serializeBillData["tblAppendGrid_rowOrder"];$i++)
			//$('#printBillDIv').append($printtable);
		}
	}
});