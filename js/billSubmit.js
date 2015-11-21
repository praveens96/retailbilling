$(document).ready(function(){
	//submit bill
	$('#SubmitBill').button().click(function () {
		
		//falgs
		var customerNameFilled =0;
		var customerMobileFilled = 0;
		var canStoreToDB =0;
		//check customer name and mobile
		var customerName = $('#CustName').val();
		if(customerName.trim()=="")
		{
			$('#CustName').css('border-color','red');
			$('#CustName').focus();
			customerNameFilled = 0;
		}
		else
		{
			$('#CustName').css('border-color','');
			customerNameFilled =1;
		}
		var customerMobile = $('#CustMob').val();
		if(customerMobile.trim() =="" && customerMobile.length!=10)
		{
			$('#CustMob').css('border-color','red');
			if(customerNameFilled==1)
			{
				$('#CustMob').focus();
			}
		}
		else
		{
			$('#CustMob').css('border-color','');
			customerMobileFilled =1;
		}
		var BillData = $('#tblAppendGrid').appendGrid('getAllValue'); //get all grid values
		//alert(BillData.length);
		if(BillData.length != 0 && customerMobileFilled ==1 && customerNameFilled==1)
		{	
			canStoreToDB = 1;
		}
		//debugger
		if(canStoreToDB)
		{
			//debugger
			for(i=0;i<BillData.length;i++)
			{
				if(BillData[i].ItemID.trim() == "")
				{
					var uniqueIDtoRemove = $('#tblAppendGrid').appendGrid('getUniqueIndex',i);
					var rowIndextoRemove = $('#tblAppendGrid').appendGrid('getRowIndex',uniqueIDtoRemove);
					$('#tblAppendGrid').appendGrid('removeRow',rowIndextoRemove);
				}
			}
			// getBillIDAutoIncrementValue();
			// updateMaxBillID();
			// var isNewBill = 1;
			// if(parseInt(sessionStorage.getItem("CurrentBillNumber")) == parseInt(sessionStorage.getItem("MaxBillID"))+1)
			// {
				// if(parseInt(sessionStorage.getItem("AutoIncrementValue")) ==1 )
				// {
					// isNewBill =1;
				// }
				// else
				// {
					// isNewBill =0;
				// }
			// }
			//alert(isNewBill);
			//alert($('#CustMob').val());
			var gross = $('#GrossAmount').val();
			var Discount = $('#Discount').val();
			var TaxPer = $('#TaxAmount').val();
			var NetWithOutTax = parseFloat(gross).toFixed(2) - (parseFloat(Discount).toFixed(2)||0);
			var NetTaxAmount = (parseFloat(NetWithOutTax).toFixed(2)*parseFloat(TaxPer).toFixed(2))/100; 
			var serializeBillData =$(document.forms["BillingForm"]).serialize();
			
			serializeBillData += "&CustName="+$('#CustName').val();
			serializeBillData += "&customerMobile="+ parseInt($('#CustMob').val());
			serializeBillData += "&GrossAmount="+$("#GrossAmount").val();
			serializeBillData += "&BillDiscount="+$("#Discount").val();
			serializeBillData += "&NetAmount="+$("#NetAmount").val();
			serializeBillData += "&Received="+($("#AmountReceived").val()||0);
			serializeBillData += "&Tendered="+$("#BalanceTendered").val();
			serializeBillData += "&TaxAmount="+NetTaxAmount;
			//serializeBillData += "&isNewBill="+isNewBill;
			serializeBillData += "&CurrentBillID="+parseInt(sessionStorage.getItem("CurrentBillNumber"));
			//alert(serializeBillData);
			formPrintTable(serializeBillData); // document.forms["BillingForm"], in printBill.js //form print table
			console.log(serializeBillData);
			$.ajax({
				type:"POST",
				url:"php/BillSubmit.php",
				data:serializeBillData,
				cache:false,
				success: function(result){
					//alert(result);
					console.log("result:"+result);
					$('#SubmitStatus').removeClass('StatusFail');
					$('#SubmitStatus').addClass('StatusSuccess');
					$('#SubmitStatus').text("Bill Successfully Submitted");	
					$('#SubmitStatus').delay(15000).fadeOut('slow');;	
					$('#PrintBill').removeClass("disabled");
				},
				failure: function(result){
					alert("failure"+result);
				},
				error:function(result){
						alert("error"+result);
				}
				
			 });
			 
			 
		}
		else
		{
			$('#SubmitStatus').removeClass('StatusSuccess');
			$('#SubmitStatus').addClass('StatusFail');
			$('#SubmitStatus').text("fill mandatory fields");
		}
		
		
	});
	
	//logout 
	$('#logout').click(function(){
		$.ajax({
			type:"POST",
			url:"php/login.php",
			data:"logout=true",
			success:function(result){
				location.reload();
				//alert("successfully logged out"+result);
			}
		});
	});
	
	function getBillIDAutoIncrementValue(callback)
	{
		//AutoIncrementValue = -1;
		$.ajax({
				type:"POST",
				url:"php/getBillID.php",
				data:{"GetAutoIncrementValue":"0"},
				success:function(AutoIncrementValue){
					//alert("AutoIncrementValue"+AutoIncrementValue);
					if(parseInt(AutoIncrementValue)!=-1)
					{
						sessionStorage.setItem("AutoIncrementValue",parseInt(AutoIncrementValue));
					}
				}
				});
				//return AutoIncrementValue;
	}
	
	function updateMaxBillID(callback)
	{
			$.ajax({
				type:"POST",
				url:"php/getBillID.php",
				data:{"GetAutoIncrementValue":"1"},
				async:false,
				success:function(MaxBillID){
					//alert("AutoIncrementValue"+AutoIncrementValue);
					if(parseInt(MaxBillID)!=-1)
					{
						alert(MaxBillID);
						sessionStorage.setItem("MaxBillID",parseInt(MaxBillID));
					}
					else
					{
						//NextBillID =-1;
					}
				}
				});
		
	}
});