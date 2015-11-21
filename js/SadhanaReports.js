$(function() {
    $( "#SadhanaReportsTabs" ).tabs();
	// alert("SadhanaReportsTabs");
	//http://www.sourcecodester.com/tutorials/php/6993/how-export-mysql-data-csvexcel-file-using-phpmysql.html
  });
$(document).ready(function(){
	// $( "#SadhanaReportsTabs" ).tabs();
	var cols = ["QuantityAvailable","NickName"];
	//Query Items available
	$.ajax({
		url:"php/db.php",
		type:"POST",
		data:{operation:"ItemsAvailabilityReport",ColumnsRequired:cols},
		success:function(AvailableItemsReturn){
			// alert(JSON.stringify(AvailableItemsReturn));
			
			// debugger
			if(AvailableItemsReturn!='' && AvailableItemsReturn!= null)
			{
				// console.log(AvailableItemsReturn);
				// console.log(AvailableItemsReturn);
				var AvailableItems = JSON.parse(AvailableItemsReturn);//JSON.parse(AvailableItemsReturn);
				// $('ItemsAvailabilityDiv')
				// var reportTable = $('<table/>',{
						
				// });
				console.log(AvailableItems[0]);
				var KeysArray = Object.keys(AvailableItems[0]);
				// alert(AvailableItems[0][0]);
				var header = '';
				var rows = '';
				$.each(KeysArray,function(index,value){
					header += " <th>"+value+"</th>";
				});
				// alert(header);
				$.each(AvailableItems,function(key,value){
					rows+="<tr><td>"+value.NickName+"</td><td>"+value.QuantityAvailable+"</td></tr>";
				});
				var reportTable ="<table class='table table-striped'>"+"<tr>"+header+"</tr>"+rows+"</table>";
				// $('#ItemsAvailabilityDiv',{
					// html:reportTable
				// });
				$('#ItemsAvailabilityDiv').append(reportTable);
				// console.log(reportTable);
				
			}
		}
	});
});