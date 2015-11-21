$(document).ready(function(){
// alert("click");	
	// debugger
	var CurrentBillSearchResults = {};
	
	$('.list-left-nav li').click(function(){
		$('.list-left-nav li').removeClass('active');
		$(this).addClass('active');
	});
	$('#STExportImport').click(function(){
		
		
		$('<link/>', {rel: 'stylesheet', href: 'jquery-ui.css'}).appendTo('head');
		
		$.getScript("jquery-ui.js",function(){
			$.getScript("js/ExportImport.js",function(){
				// alert("cust js loaded");
			});
		});
		
		$("#loadeimg").show();
		$("#Manage_Content").load("/st/php/ExportImport.php",function(){
			// alert('loaded');
			$("#loadeimg").hide();
		});
	});
	
	$('#STReports').click(function(){
		
		$('<link/>', {rel: 'stylesheet', href: 'jquery-ui.css'}).appendTo('head');
		
		$.getScript("jquery-ui.js",function(){
			// alert("jquery-uijs loaded");
			// debugger
			$.getScript("js/SadhanaReports.js",function(){
				// alert("cust js loaded");
			}).fail(function(){
				if(arguments[0].readyState==0){
					//script failed to load
				}else{
					//script loaded but failed to parse
					alert(arguments[2].toString());
				}
			});
		});
		$("#loadeimg").show();
		$("#Manage_Content").load("/st/php/SadhanaReports.php",function(){
			// alert('loaded');
			$("#loadeimg").hide();
		});
	});
	
	//sales reports
		$('#STSales').click(function(){
		// debugger
		$('<link/>', {rel: 'stylesheet', href: 'jquery-ui.css'}).appendTo('head');
		
		$.getScript("jquery-ui.js",function(){
			// alert("jquery-uijs loaded");
			// debugger
			$.getScript("js/SadhanaSales.js",function(){
				// alert("cust js loaded");
			}).fail(function(){
				if(arguments[0].readyState==0){
					//script failed to load
				}else{
					//script loaded but failed to parse
					alert(arguments[2].toString());
				}
			});
		});
		$("#loadeimg").show();
		$("#Manage_Content").load("/st/php/SadhanaSales.php",function(){
			// alert('loaded');
			// $("#loadeimg").hide();
		});
	});
	
	// $('#ManagePurchases').click(function(){
				// $("#loadeimg").show();
		// $("#Manage_Content").load("/st/php/ExportImport.php",function(){
			// // alert('loaded');
			// $("#loadeimg").hide();
		// });
	// });
	
	$('#STAccMgmt').click(function(){
		// alert('acc click');
		$("#loadeimg").show();
		$.getScript("jquery-ui.js",function(){
			$.getScript("js/Accounts.js",function(){
				// alert('loaded');
			
			}).fail(function(){
				if(arguments[0].readyState==0){
					//script failed to load
				}else{
					//script loaded but failed to parse
					alert(arguments[2].toString());
				}
			});
		});
		$("#Manage_Content").load("/st/php/Accounts.php",function(){
			$("#loadeimg").hide();
		});
		
	});
	$('#STBillManager').click(function(){
		// alert("M4");
		$.getScript("js/BillManager.js",function(){
			// alert('loaded');
		});
		//load tax percentage
		$.getScript("js/maths.js",function(){
			// alert('loaded');
		});
		$("#loadeimg").show();
		$("#Manage_Content").load("/st/BillManager.php",function(){
			// alert("loaded");
			 // var hash=location.hash;
			 //alert(hash);
					// alert('pq');
		//Bills Grid
			$('#QueryBillDetails').appendGrid({
				caption: 'Bill Number',
				initRows: 0,
				columns: [
						{ name: 'BillID', display: 'Bill ID',ctrlAttr: { 'readonly': 'readonly' }},
						{name:'CustomerName',display:"Customer Name",ctrlAttr: { 'readonly': 'readonly' }},
						{name:'BillDate',display:'Bill Date'},
						{name:'Net',display:'Net',ctrlAttr: { 'readonly': 'readonly' }},
						{name:'Discount',display:'Discount',onChange: function(evt,rowIndex){BillMgrBillChange(evt,rowIndex)}},
						{name:'Total',display:'Total',ctrlAttr: { 'readonly': 'readonly',onChange: function(evt,rowIndex){BillMgrBillChange(evt,rowIndex)}} },
						{name:'Received',display:'Received',onChange: function(evt,rowIndex){BillMgrBillChange(evt,rowIndex)}},//,onChange: function(evt,rowIndex){BillMgrReceivedChanged(evt,rowIndex)}},
						{name:'Balance',display:'Balance',ctrlAttr: { 'readonly': 'readonly' }},
						{name:'TaxAmount',display:'Tax',ctrlAttr: { 'readonly': 'readonly' }},
						{name:'Mobile',display:'Mobile'}
				],
				hideButtons:{
					moveUp:true, moveDown:true, removeLast:true, append:true,insert:true, remove:true
				},
	});
	
	function BillMgrBillChange(evt,rowIndex)
	{
		// debugger
		if(rowIndex!=undefined && rowIndex != 'NaN')
		{
			var EditBillRowIndex = $('#QueryBillDetails').appendGrid('getUniqueIndex',rowIndex);
			var total = parseFloat( $('#QueryBillDetails_Total_'+EditBillRowIndex).val());
			var discount = parseFloat($('#QueryBillDetails_Discount_'+EditBillRowIndex).val());
			var received = parseFloat($('#QueryBillDetails_Received_'+EditBillRowIndex).val());
			var tax = parseFloat($('#QueryBillDetails_TaxAmount_'+EditBillRowIndex).val());
			$('#QueryBillDetails_Net_'+EditBillRowIndex).val(total+tax-discount);
			var net = parseFloat($('#QueryBillDetails_Net_'+EditBillRowIndex).val());
			$('#QueryBillDetails_Balance_'+EditBillRowIndex).val(net-(received));
			
		}
	}
		
		$('#QueryBillItemDetails').appendGrid({
			caption: 'Bill Items',
			initRows: 0,
			columns: [
						{name:"BillID",display:"Bill ID",invisible:true},
						{name:"ItemID",display:"Item ID",invisible:true},
						{name:"ItemName",display:"Item Name",ctrlAttr: { 'readonly': 'readonly' }},
						{name:"Quantity",display:"Quantity",onChange: function(evt,rowIndex){BillItmMgrChanged(evt,rowIndex)}}, //,onChange: function(evt,rowIndex){BillMgrQtyChanged(evt,rowIndex)}
						{name:"Rate",display:"Rate",onChange: function(evt,rowIndex){BillItmMgrChanged(evt,rowIndex)}},//,onChange: function(evt,rowIndex){BillMgrRateChanged(evt,rowIndex)}},
						{name:"Amount",display:"Amount",ctrlAttr: { 'readonly': 'readonly' },onChange: function(evt,rowIndex){BillItmMgrAmountChanged(evt,rowIndex)}}
			],
			hideButtons:{
				moveUp:true, moveDown:true, removeLast:true, append:true, insert:true, remove:true
			},
		});
		// debugger
			 // $(".loading").hide(); 
			 $("#loadeimg").hide();
		});
	});
	// $('#STBillManager').click(function(){
		// alert("click");
		
	// });
	function BillItmMgrChanged(evt,rowIndex)
	{
		// alert(rowIndex);
		// debugger
		if(rowIndex!=undefined && rowIndex != 'NaN')
		{
			var EditedRowUniqueIndex = $('#QueryBillItemDetails').appendGrid('getUniqueIndex',rowIndex);
			var EditedItemQty = parseFloat($('#QueryBillItemDetails_Quantity_'+EditedRowUniqueIndex).val());
			var EditedItemRate = parseFloat($('#QueryBillItemDetails_Rate_'+EditedRowUniqueIndex).val());
			var AmountBeforeEdit = parseFloat($('#QueryBillItemDetails_Amount_'+EditedRowUniqueIndex).val());
			$('#QueryBillItemDetails_Amount_'+EditedRowUniqueIndex).val(EditedItemQty * EditedItemRate);
			var AmountAfterEdit = parseFloat($('#QueryBillItemDetails_Amount_'+EditedRowUniqueIndex).val());
			var EditedBillID = parseInt($('#QueryBillItemDetails_BillID_'+EditedRowUniqueIndex).val());
			UpdateEditBillTable(EditedBillID,AmountAfterEdit-AmountBeforeEdit);
		}
	}
	
	function UpdateEditBillTable(EditedBillID,AddToTotal)
	{
		var CurrentBillTable = $('#QueryBillDetails').appendGrid('getAllValue');
		var CurrentBillItems = $('#QueryBillItemDetails').appendGrid('getAllValue');
		
		if(EditedBillID!=null && EditedBillID!= 'NaN' && EditedBillID!=undefined)
		{
			
			var EditRowIndex = -1;
			var BillBeforeEdit = '';
			for(i=0;i<CurrentBillTable.length;i++)
			{
				if(CurrentBillTable[i]["BillID"] == EditedBillID)
				{
					EditRowIndex = i;
					BillBeforeEdit = CurrentBillTable[i];
					break;
				}
			}
		}
		if(EditRowIndex !=-1)
		{
			var EditBillRowUniqueIndex = $('#QueryBillDetails').appendGrid('getUniqueIndex',EditRowIndex);
			// $('#QueryBillDetails_')
			console.log(BillBeforeEdit);
			 var TotalBeforeEdit = $('#QueryBillDetails_Total_'+EditBillRowUniqueIndex).val();
			 $('#QueryBillDetails_Total_'+EditBillRowUniqueIndex).val(parseFloat(AddToTotal)+parseFloat(TotalBeforeEdit));
			 var total = parseFloat( $('#QueryBillDetails_Total_'+EditBillRowUniqueIndex).val());
			var discount = parseFloat($('#QueryBillDetails_Discount_'+EditBillRowUniqueIndex).val());
			var received = parseFloat($('#QueryBillDetails_Received_'+EditBillRowUniqueIndex).val());
			var tax = parseFloat($('#QueryBillDetails_TaxAmount_'+EditBillRowUniqueIndex).val());
			$('#QueryBillDetails_Net_'+EditBillRowUniqueIndex).val(total+tax-discount);
			var net = parseFloat($('#QueryBillDetails_Net_'+EditBillRowUniqueIndex).val());
			$('#QueryBillDetails_Balance_'+EditBillRowUniqueIndex).val(net-(received));
		}
	}
	function BillItmMgrAmountChanged(evt,rowIndex)
	{
		alert("BillItmMgrAmountChanged:"+rowIndex);
	}
	
	function BillMgrBillDiscountChanged(event,EditedRowIndex)
	{
		var CurrentBillTableDataModel = $('#QueryBillDetails').pqGrid("option","dataModel");
		var CurrentBillItemDetails = $('#QueryBillItemDetails').pqGrid("option","dataModel");
		alert(JSON.stringify(CurrentBillTableDataModel)+"::"+JSON.stringify(CurrentBillItemDetails));
	}
	$(document).on('click','#BillMgrSubmit',function(){
		var QueryBillNo = parseInt($('#tbBillNum').val());
		// alert(QueryBillNo);
		if(QueryBillNo != 'NaN')
		{
			$.ajax({
				url:'php/db.php',
				data:{operation:"FetchBillDetails",QueryBillID:QueryBillNo},
				type:'POST',
				success:function(QueryBillSuccess){
					// if()
					QueryBillSuccess = JSON.parse(QueryBillSuccess);
					console.log("QueryBillSuccess:"+JSON.stringify(QueryBillSuccess));
					// alert(JSON.stringify(QueryBillSuccess));
					CurrentBillSearchResults = QueryBillSuccess;
					var PreviousBillID = -1;
					var SearchBillTableReturn = [];
					InsertBillsSearchReturn(QueryBillSuccess);
					
				},
				error:function(QueryBillError){
					alert("QueryBillError:"+JSON.stringify(QueryBillError));
				}
			});
		}
	});
	
	function InsertBillsSearchReturn(SearchBillTableReturn)
	{
		//debugger
		DeleteAllRowsFromTable('QueryBillDetails');
		// debugger
		DeleteAllRowsFromTable('QueryBillItemDetails');
		// var NoOfItems = $('#QueryBillDetails').appendGrid('getRowCount');
		// var MaxUniqueIndex = $('#QueryBillDetails').appendGrid('getUniqueIndex', NoOfItems<=0?0:NoOfItems-1);
		// for(var i=0;i<NoOfItems;i++)
			// {
				
				// $('#QueryBillDetails').appendGrid('removeRow', i);
			// }
		var PreviousBillID = -1;
		
		$.each(SearchBillTableReturn,function(index,valuesRow){
			if(valuesRow.BillID != PreviousBillID)
			{
				// debugger
				var NoOfRows = $('#QueryBillDetails tr').length-3;
				var lastRowID = NoOfRows;
				$('#QueryBillDetails').appendGrid('appendRow',1);
				var uniqueIndex = $('#QueryBillDetails').appendGrid('getUniqueIndex', lastRowID<=0?0:lastRowID-1);
				if(uniqueIndex==null)
				{
					uniqueIndex =1;
				}
				$('#QueryBillDetails_BillID_'+uniqueIndex).val(valuesRow.BillID);
				$('#QueryBillDetails_CustomerName_'+uniqueIndex).val(valuesRow.CustomerName);
				$('#QueryBillDetails_BillDate_'+uniqueIndex).val(valuesRow.BillDate);
				$('#QueryBillDetails_Net_'+uniqueIndex).val(valuesRow.NetBillAmount);
				$('#QueryBillDetails_Discount_'+uniqueIndex).val(valuesRow.discount);
				$('#QueryBillDetails_Total_'+uniqueIndex).val(valuesRow.Billamount);
				$('#QueryBillDetails_Received_'+uniqueIndex).val(valuesRow.amountreceived);
				$('#QueryBillDetails_Balance_'+uniqueIndex).val(valuesRow.balancetendered);
				$('#QueryBillDetails_TaxAmount_'+uniqueIndex).val(valuesRow.TaxAmount);
				$('#QueryBillDetails_Mobile_'+uniqueIndex).val(valuesRow.CustomerMobileNo);
				PreviousBillID = valuesRow.BillID;
			}
	});
	
	}
	
	$(document).on('click','#QueryBillDetails tr',function(){
		// alert(this.id);
		var SelectedRowIndex = parseInt(this.id.substring(this.id.lastIndexOf('_')+1));
		// alert(SelectedRowIndex);
		var SelectedBillUniqueId = $('#QueryBillDetails').appendGrid('getUniqueIndex',SelectedRowIndex);
		if(SelectedBillUniqueId==null)
		{
			SelectedBillUniqueId =1;
		}
		var SelectedBillID = $('#QueryBillDetails_BillID_'+SelectedRowIndex).val();
		// alert(JSON.stringify(CurrentBillSearchResults));
		InsertBillItemsSearchReturn(CurrentBillSearchResults,SelectedBillID);
		//$('td', this).each( function(index,value){
			// alert(index+":"+value.innerHtml+",");
			
		//});
		
	});
	//insert into bill items
	function InsertBillItemsSearchReturn(SearchBillTableReturn,SelectedBill)
	{
		// debugger
		var BillItemCount = $('#QueryBillItemDetails').appendGrid('getRowCount');
		if(BillItemCount>0)
		{
			var CurrentItems = $('#QueryBillItemDetails').appendGrid('getAllValue');
			if(CurrentItems.length>0)
			{
				if(CurrentItems[0]["BillID"] == SelectedBill)
				{
					//Same bill do nothing
				}
				else
				{
					//InsertItems
					InserBillItems(SearchBillTableReturn,SelectedBill);
				}
			}
		}
		else
		{
			//Insert Items
			InserBillItems(SearchBillTableReturn,SelectedBill);
		}
		
	}
	
	function InserBillItems(SearchBillTableReturn,SelectedBill)
	{
		if(SearchBillTableReturn!= null && SearchBillTableReturn!=null)
					{
						var PreviousBillID = -1;
						//emptying the grid
						DeleteAllRowsFromTable('QueryBillItemDetails');
						// var NoOfItems = $('#QueryBillItemDetails').appendGrid('getRowCount');
						// var MaxUniqueIndex = $('#QueryBillItemDetails').appendGrid('getUniqueIndex', NoOfItems<=0?0:NoOfItems-1);
						// for(var i=0;i<NoOfItems;i++)
						// {
							
							// $('#QueryBillItemDetails').appendGrid('removeRow', i);
						// }
						
						
						$.each(SearchBillTableReturn,function(index,valuesRow){
							$('#QueryBillItemDetails').appendGrid('appendRow',1);
							var NoOfItemRows = $('#QueryBillItemDetails').appendGrid('getRowCount');
							var uniqueIndex = $('#QueryBillItemDetails').appendGrid('getUniqueIndex',NoOfItemRows<=0?0:NoOfItemRows-1 );
							if(uniqueIndex==null)
							{
								uniqueIndex =1;
							}
							if(PreviousBillID == -1)
							{
								PreviousBillID = valuesRow.BillID;
							}
							if(SelectedBill == valuesRow.BillID && (PreviousBillID == valuesRow.BillID))
							{
								$('#QueryBillItemDetails_BillID_'+uniqueIndex).val(valuesRow.BillID);
								$('#QueryBillItemDetails_ItemID_'+uniqueIndex).val(valuesRow.ItemID);
								// alert(valuesRow.ItemName);
								$('#QueryBillItemDetails_ItemName_'+uniqueIndex).val(valuesRow.ItemName);
								$('#QueryBillItemDetails_Quantity_'+uniqueIndex).val(valuesRow.Quantity);
								$('#QueryBillItemDetails_Rate_'+uniqueIndex).val(valuesRow.Rate);
								$('#QueryBillItemDetails_Amount_'+uniqueIndex).val(valuesRow.Amount);
								PreviousBillID = valuesRow.BillID;
							}
						});
					}
	}
	
	//emptying table
	function DeleteAllRowsFromTable(tableid)
	{
		var NoOfItems = $('#'+tableid).appendGrid('getRowCount');
		for(var i=0;i<NoOfItems;i++)
		{
			$('#'+tableid).appendGrid('removeRow', 0);
		}
		
	}

	
});