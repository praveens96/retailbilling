//print bill
$(document).ready(function(){

	$("#PrintBill").click(function(){
	//debugger
		// var BillData = $(document.forms["BillingForm"]).serialize();
		// formPrintTable(BillData);
		window.print();
		
		// $('#printBillDIv').printElement(
		// {
			// overrideElementCSS:[{href:'printStyle.css'}], //,media:'print'
			// // classNameToAdd :'printstyling1'
			
		// },{printMode:'iframe'});
	});
	
	
});
function formPrintTable(BillData)
{
	if(BillData!=null)
	{
	// debugger
		var $printtable = $('<table class="printTable"/>').appendTo('body');
		var deserializedBillData =deparam(BillData);
		var curr = new Date();
		$printtable.append('<tr class="heading">'+"<td>**Sadhana Textiles**</td>"+'</tr>');
		//add customer details
		$printtable.append('<tr class="InfoRow">'+"<td>B.No</td>"+"<td>"+deserializedBillData["CurrentBillID"]+"</td>"+"</tr>");
		$printtable.append('<tr class="InfoRow">'+"<td>Date</td>"+"<td >"+curr.toISOString().substr(0,10)+"</td>"+"</tr>");
		$printtable.append('<tr class="InfoRow">'+'<td>Name</td>'+'<td>'+deserializedBillData["CustName"]+'</td>'+'</tr>');
		$printtable.append('<tr class="InfoRow">'+'<td>Mobile</td>'+'<td>'+deserializedBillData["customerMobile"]+'</td>'+'</tr>');
		$printtable.append('<tr class="ItemRow">'+'<td style="width:40%">Item</td>'+'<td style="width:10%">Qty</td>'+
							'<td style="width:20%">Rate</td>'+'<td style="width:20%">Amount</td>'+'</tr>');
		var $strIndexes = deserializedBillData["tblAppendGrid_rowOrder"];
		var $arrIndexes = $strIndexes.split(",");
		$NoOfItems = $arrIndexes.length;
		//alert($arrIndexes.length);
		for(var $i=1;$i<=$NoOfItems;$i++)
		{
			//alert(deserializedBillData["tblAppendGrid_BillItem_"+$i]);
			$printtable.append('<tr class="ItemRow">'+
				'<td style="width:50%">'+deserializedBillData["tblAppendGrid_BillItem_"+$i]+'</td>' +
				'<td style="width:10%">'+deserializedBillData["tblAppendGrid_BItemQuant_"+$i]+'</td>' +
				'<td style="width:20%">'+deserializedBillData["tblAppendGrid_BItemPrice_"+$i]+'</td>' +
				'<td style="width:20%">'+deserializedBillData["tblAppendGrid_BItemAmount_"+$i]+'</td>' +
			+'</tr>');
		}
		$printtable.append('<tr class="InfoRow">'+'<td>Gross</td>'+'<td>'+deserializedBillData["GrossAmount"]+'</td>'+'</tr>');
		$printtable.append('<tr class="InfoRow">'+'<td>Discount</td>'+'<td>'+deserializedBillData["BillDiscount"]+'</td>'+'</tr>');
		$printtable.append('<tr class="InfoRow">'+'<td>Tax</td>'+'<td>'+deserializedBillData["TaxAmount"]+'</td>'+'</tr>');
		$printtable.append('<tr class="InfoRow">'+'<td>Net</td>'+'<td>'+deserializedBillData["NetAmount"]+'</td>'+'</tr>');
		$printtable.append('<tr class="InfoRow">'+'<td>Received</td>'+'<td>'+deserializedBillData["Received"]+'</td>'+'</tr>');
		$printtable.append('<tr class="InfoRow">'+'<td>Balance</td>'+'<td>'+deserializedBillData["Tendered"]+'</td>'+'</tr>');
		$printtable.append('<tr class="heading">'+"<td>**Thank You**</td>"+'</tr>');
			//for(var $i=0;$i<serializeBillData["tblAppendGrid_rowOrder"];$i++)
			//$('#printBillDIv').append($printtable);
		//empty it before writing
		$('#printBillDIv').empty();
		$('#printBillDIv').html('');
		$('#printBillDIv').append($printtable);
	}
}
function deparam(query) {
    var pairs, i, keyValuePair, key, value, map = {};
    // remove leading question mark if its there
    if (query.slice(0, 1) === '?') {
        query = query.slice(1);
    }
    if (query !== '') {
        pairs = query.split('&');
        for (i = 0; i < pairs.length; i += 1) {
            keyValuePair = pairs[i].split('=');
            key = decodeURIComponent(keyValuePair[0]);
            value = (keyValuePair.length > 1) ? decodeURIComponent(keyValuePair[1]) : undefined;
            map[key] = value;
        }
    }
    return map;
}