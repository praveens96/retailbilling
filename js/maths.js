$(document).ready(function()
{
	$.ajax({
		type:"GET",
		url:"helpers/dataHelper.xml",
		dataType:"xml",
		success:function(Infoxml){
			//var $xmlDoc = $.parseXML(Infoxml);
			//debugger
			
			var VATTax = $(Infoxml).find("VAT").text();
			// alert(VATTax);
			// debugger
			if($('#TaxAmount').length !=0)
			{	
				$('#TaxAmount').val(VATTax.trim());
			}
			else if($('#TaxPer').length!=0)
			{
				$($('#TaxPer').text(VATTax.trim()));
			}
		}
		// error: function(){
			// alert("error in reading info xml");
		// }
	});
});