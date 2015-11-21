$(function(){
	$('#SadhanaSalesTabs').tabs();
});

$(document).ready(function(){
	// debugger
	var TodayTimeSpan = {};
	var curr = new Date();
	$("#loadeimg").show();
	var WeekFirstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
	var WeekLastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
	curr = new Date();
	var tomorrow =  new Date(curr.setDate(curr.getDate()+1));
	curr = new Date();
	// debugger
	TodayTimeSpan["FromDate"] = FormatDate(curr);// curr.toISOString().substr(0,10);//.toISOString().substr(0,10) - to get in yyyy-mm-dd format
	TodayTimeSpan["ToDate"] = FormatDate(tomorrow);//.toISOString().substr(0,10);
	// console.log("from"+TodayTimeSpan["FromDate"]+"to"+TodayTimeSpan["ToDate"]);
	// debugger
	var ItemwiseAggDetails = GetSalesReportTimespan(TodayTimeSpan,"Today");
	
	var ThisWeekTimeSpan = {};
	ThisWeekTimeSpan["FromDate"] = FormatDate(WeekFirstday);//.toISOString().substr(0,10);
	ThisWeekTimeSpan["ToDate"] = FormatDate(WeekLastday);//.toISOString().substr(0,10);
	console.log("from"+ThisWeekTimeSpan["FromDate"]+"to"+ThisWeekTimeSpan["ToDate"]);
	GetSalesReportTimespan(ThisWeekTimeSpan,"CurrentWeek");
	// debugger
	var ThisMonthTimeSpan = {};
	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);//.toISOString().toString();
	// firstDay = FormatDate(firstDay);
	// firstDay = firstDay.toISOString().toString();
	// firstDay = firstDay.substr(0,10);
	var lastDay = new Date(y, m + 1, 0);//.toISOString().substr(0,10);
	ThisMonthTimeSpan["FromDate"] = FormatDate(firstDay);
	ThisMonthTimeSpan["ToDate"] = FormatDate(lastDay);
	console.log("from"+ThisMonthTimeSpan["FromDate"]+"to"+ThisMonthTimeSpan["ToDate"]);
	GetSalesReportTimespan(ThisMonthTimeSpan,"CurrentMonth");
	//console.log("ItemwiseAggDetails "+JSON.stringify(ItemwiseAggDetails));
	$("#loadeimg").hide();
	//custom search
	$('#btnCustomSales').click(function(){
		var validDates = false;
		var FromDate = $('#FromDate').val();
		var	ToDate = $('#ToDate').val();
		if(!FromDate || !ToDate)
		{
			alert("Select valid from and to dates");
		}
		else if(new Date(FromDate) > new Date($.now()))
		{
			alert("from date is greater than today's");
		}
		else if(new Date(ToDate) < new Date(FromDate))
		{
			alert("To date is lesser than from date");
		}
		else
		{
			validDates =true;
		}
		if(validDates)
		{
			$("#loadeimg").show();
			var CustomTimeSpan = {};
			FormattedFromDate = new Date(FromDate).toISOString().substr(0,10);
			FormattedToDate = new Date(ToDate).toISOString().substr(0,10);
			CustomTimeSpan["FromDate"] = FormattedFromDate;
			CustomTimeSpan["ToDate"] = FormattedToDate;
			GetSalesReportTimespan(CustomTimeSpan,"Custom");
			$("#loadeimg").hide();
		}
	});
	
	
	//today
	$(document).on('click','.TodaysSalesDiv',function(){
		// alert("today:"+$(this).data('timespan').FromDate);
		GetBills(this,"#tabs-1");
	});
	//week
	$(document).on('click','.ThisWeekSalesDiv',function(){
		// alert("week"+$(this).data('timespan').FromDate);
		var dataFromDate = $(this).data('timespan').FromDate;
		var dataToDate = $(this).data('timespan').ToDate;
		// GetBills(dataFromDate,dataToDate);
		GetBills(this,"#tabs-1");
		
	});	
	//month
	$(document).on('click','.ThisMonthSalesDiv',function(){
		// alert("month");
		GetBills(this,"#tabs-1");
	});
	//custom
	$(document).on('click','.CustomSalesReportDiv',function(){
		// alert("month");
		GetBills(this,"#tabs-2");
	});
	
	//billitem click
	$(document).on('click','.ShowBillItems',function(){
		// alert(this.id);
		$.ajax({
			url:"php/db.php",
			data:{operation:"GetBillItems",BillID:this.id},
			type:"POST",
			success:function(BillItemsReturn){
				BillItemsReturn = JSON.parse(BillItemsReturn);
				console.log("BillItemsReturn:"+JSON.stringify(BillItemsReturn));
				// var tabid = "#tabs-1";
				// debugger
				var active = $( "#SadhanaSalesTabs" ).tabs( "option", "active" );
				// var tabid = active.attr('id');
				// debugger
				// var tabid = $('div[id="SadhanaSalesTabs"] ul .ui-tabs-active').attr("id");
				// alert(active);
				ShowItemsinDiv(BillItemsReturn,"#tabs-"+(active+1));
			},
			error:function(BillItemsErr){
				console.log("BillItemsErr:"+JSON.stringify(BillItemsErr));
			}
		});
	});
});

function FormatDate(date) {
  date = new Date(date);

  var day = ('0' + date.getDate()).slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}
function GetSalesReportTimespan(TimeSpan,strTimePerioad)  //GetSalesAggDetailsofTimespan
{
	if(TimeSpan!='' && TimeSpan!= undefined)
	{
		$.ajax({
			url:"php/db.php",
			type:"POST",
			data:{operation:"SalesReport",TimePerioad:TimeSpan},
			success:function(SalesReportReturn){
				if(SalesReportReturn!='' && SalesReportReturn != undefined)
				{
					// console.log("SalesReportReturn:"+JSON.stringify(JSON.parse(SalesReportReturn)));
					console.log("TimeSpan:"+JSON.stringify(TimeSpan));
					 // SalesReportReturn;
					var ItemwiseSales = JSON.parse(SalesReportReturn);
					console.log("ItemwiseSales:"+JSON.stringify(ItemwiseSales));
					GetAggSalesReport(ItemwiseSales,strTimePerioad,TimeSpan);
				}
				
			},
			error:function(SalesReportError){
				console.log("SalesReportError:"+SalesReportError);
			}
		});
	
	}
}

function GetBills(clicked,tabid)
{
	
	var BillsJSON ;
	var dataFromDate = $(clicked).data('timespan').FromDate;
	var dataToDate = $(clicked).data('timespan').ToDate;
	console.log("from:"+dataFromDate+" to:"+dataToDate);
	if(dataFromDate!='' && dataToDate!='' &&dataFromDate!=undefined &&dataToDate!=undefined)
	{
		// SalesBetweenDates
		$.ajax({
			url:"php/db.php",
			type:"POST",
			data:{operation:"SalesBetweenDates","FromDate":dataFromDate,"ToDate":dataToDate},
			success:function(GetBillsReturn){
				console.log("GetBillsReturn:"+JSON.stringify(GetBillsReturn));
				BillsJSON = JSON.parse(GetBillsReturn);
				
				// BillsJSON =GetBillsReturn; 
				// console.log("GetBillsReturn:"+JSON.stringify(BillsJSON));
				// $("#tabs-1").html(JSON.stringify(BillsJSON));
				// var tabid = '#tabs-1';
				AddtoMainDiv(BillsJSON,tabid);
			},
			error:function(GetBillsErr){
				
			}
		});
	}

}

function GetAggSalesReport(ItemwiseSalesReport,strTimePerioad,TimeSpan)
{
	var SPSum = 0;
	var AggDisc = 0;
	var CPSum = 0;
	var DivIDtoAppend = '';
	switch(strTimePerioad)
		{
			case "Today":
				DivIDtoAppend = 'TodaysSalesDiv';
				break;
			case "CurrentWeek":
				DivIDtoAppend = 'ThisWeekSalesDiv';
				break;
			case "CurrentMonth":
				DivIDtoAppend = "ThisMonthSalesDiv";
				break;
			case "Custom":
				DivIDtoAppend = "CustomSalesReportDiv";
				break;	
		}
		
	if(ItemwiseSalesReport!='' && ItemwiseSalesReport!= undefined)
	{
		$.each(ItemwiseSalesReport,function(index,ItemRow){
			SPSum += parseFloat(ItemRow["AggItem_SPSale"]);
			AggDisc +=parseFloat(ItemRow["AggItem_Discount"]);
			CPSum +=parseFloat(ItemRow["AggItem_CPSale"]);
		});
		// console.log("SPSum:"+SPSum+"AggDisc"+AggDisc+"CPSum"+CPSum);
		
		var reportTable ="<table class='table table-striped'>"+
							"<tr>"+"<th>Total Selling Price</th>"+ "<th>Total Cost Price</th>"+ "<th>Total Discount</th>"+ "<th>Total Profit</th>"+"</tr>"+
							"<tr>"+"<td>"+"<a class='"+DivIDtoAppend+"' href='#"+DivIDtoAppend+"' data-timespan='"+JSON.stringify(TimeSpan)+"'>"+SPSum+"</a>"+"</td>"+ 
									"<td>"+"<a class='"+DivIDtoAppend+"' href='#"+DivIDtoAppend+"'>"+CPSum+"</a>"+"</td>"+ 
									"<td>"+"<a class='"+DivIDtoAppend+"' href='#"+DivIDtoAppend+"'>"+AggDisc+"</a>"+"</td>"+ 
									"<td>"+"<a class='"+DivIDtoAppend+"' href='#"+DivIDtoAppend+"'>"+(SPSum-AggDisc-CPSum)+"</a>"+"</td>"+
							"</tr>"+"</table>";
		// console.log('DivIDtoAppend:'+DivIDtoAppend);
		$('#'+DivIDtoAppend).append(reportTable);
	}
	else
	{
		$('#'+DivIDtoAppend).append("No sales in this time periaod");
	}
}

function AddtoMainDiv(BillsJSON,tabid)
{
	if(BillsJSON!=undefined && tabid!= undefined)
	{
		// console.log("BillsJSON:"+JSON.stringify(BillsJSON)+" index0:"+BillsJSON[0].BillID);
		// var strBills = JSON.stringify(BillsJSON);
		var BillsTable = "<table class='table table-striped'>";
		var Header = '<tr>';
		var rows = '';
		$.each(BillsJSON[0],function(key,value){
			// alert("key:"+BillsJSON[key].BillID);
			if(!isInteger(key))
			{
				// console.log("key:"+key);
				Header += "<th>"+key+"</th>";
			}
		});
		Header += "</tr>";
		
		$.each(BillsJSON,function(index,value){
			rows += "<tr>"+"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].ID+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Name+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].BillDate+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Amount+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Net+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Discount+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Received+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Balance+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Mobile+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Tax+"</a>"+"</td>"+
							"<td>"+"<a id='"+BillsJSON[index].ID+"' class='ShowBillItems' href='#"+BillsJSON[index].ID+"'>"+BillsJSON[index].Biller+"</a>"+"</td>"+"</tr>";
		});
		$(tabid).html(BillsTable+Header+rows+"</table>");
	}
}

function isInteger(value) 
{
    return (value == parseInt(value));
}

function ShowItemsinDiv(BillItemDetails,tabid)
{
	if(BillItemDetails!='' && BillItemDetails!= null)
	{
		var BillsTable = "<table class='table table-striped'>";
		var Header = '<tr>';
		var Rows = '';
		$.each(BillItemDetails[0],function(key,value){
			if(!isInteger(key))
			{
				Header += "<th>"+key+"</th>";
			}
		});
		Header += "</tr>";
		
		$.each(BillItemDetails,function(index,value){
			// debugger	
			Rows += "<tr>"+"<td>"+BillItemDetails[index].BillID+"</td>"+
					"<td>"+BillItemDetails[index].ItemID+"</td>"+
					"<td>"+BillItemDetails[index].ItemName+"</td>"+
					"<td>"+BillItemDetails[index].Quantity+"</td>"+
					"<td>"+BillItemDetails[index].Rate+"</td>"+
					"<td>"+BillItemDetails[index].Amount+"</td>"+"</tr>";
		});
		
		$(tabid).html(BillsTable+Header+Rows+"</table>");
	}
}