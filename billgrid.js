$(document).ready(function()
{
//clear sessionStorage
// var i = sessionStorage.length;
// while(i--) {
  // var key = sessionStorage.key(i);
  // if(/foo/.test(key)) {
    // sessionStorage.removeItem(key);
  // }  
// }
	sessionStorage.clear();
	// $('#LoginPopup').height('300px'); 
	// $('#LoginPopup').width('300px');
	// $('#LoginPopup').css({'width':300px,'height':300px});
	
	//$('#LoginPopup').popup('open');
	//CheckLogin();
	//debugger
	// $( '#LoginPopup' ).dialog( { 'autoOpen': false } );
	// $('#LoginPopup').dialog('open');
	//debugger
	//OpenLoginPopup();
	//debugger
	//GetMaxBillIDandInitialize();
	//InitializeBillGrid(NewBillID);
	// $('#tblAppendGrid').appendGrid({
	// caption: 'Bill Details',
	// initRows: 0,
	// columns: [
	// { name: 'ItemID', display: 'ItemID',invisible:true},
	// { name: 'BillItem', display: 'Particulars', type: 'text', ctrlAttr: { maxlength: 500 }, ctrlCss: { width: '350px'},ctrlAttr: { 'readonly': 'readonly' } },
	// { name: 'BItemQuant', display: 'Qty', type: 'text', onChange: function(evt,rowIndex){updateValues(evt,rowIndex)},ctrlAttr: { maxlength: 10 }, ctrlCss: { width: '30px'} },
	// { name: 'BItemPrice', display: 'Rate', type: 'text', ctrlAttr: { maxlength: 20 }, ctrlCss: { width: '60px'} },
	// { name: 'BItemAmount', display: 'Amount', type: 'text', ctrlAttr: { maxlength: 20 }, ctrlCss: { width: '90px'},ctrlAttr: { 'readonly': 'readonly' } },
	// { name: 'ItemDiscount', display: 'Discount',invisible:true},
	// ],
	// hideButtons:{
		// moveUp:true,
		// moveDown:true,
		// //removeLast:true
	// }
	// });
	
	// //submit bill
	// $('#SubmitBill').button().click(function () {
		
		// //var count =  $('#tblAppendGrid').appendGrid('getRowCount');
		// //alert('There are ' + count + ' row(s) inside the grid!');
		// var BillData = $('#tblAppendGrid').appendGrid('getAllValue'); //get all grid values
		// if(BillData!=null)
		// {
			// // data.forEach(function(BillRow){
				// // alert(BillRow["BillItem"]);
			// // });
			// //debugger
			// var serializeBillData =$(document.forms["BillingForm"]).serialize();
			// alert(serializeBillData);
			// // var ser = data.serializeArray();
			// // alert(ser);
			// $.ajax({
				// type:"POST",
				// url:"php/BillSubmit.php",
				// data:serializeBillData,
				// cache:false,
				// success: function(result){
						// alert(result);
				// }
			// });
		// }
	// });
	$('#Discount').change(function(){
		// debugger
		//update net
		var NetAmount = calculateNet();
		$('#NetAmount').val(NetAmount);
		//update tendered
		var BalFromCust = parseFloat(parseFloat($("#NetAmount").val())-(parseFloat($("#AmountReceived").val())||0)).toFixed(2);
		$("#BalanceTendered").val(BalFromCust);
	});
	
	});
	//on enter click, insert new row
	$('#tblAppendGrid').keypress(function(e){
		if(e.keyCode==13)
		{
			$('#tblAppendGrid').appendGrid('appendRow',1);
		}	//alert("enter");
	});
	//on ctrl+del - delete current row
	$('#tblAppendGrid').keydown(function(e){
		if(e.ctrlKey && e.keyCode==46)
		{
			var trid = $(this);//.closest('tr').closest('tr').attr('id');
			var rowUniqueIndex = $(this).data('appendGrid');
			//alert(Object.keys(trid.context[id]));
			var focused = document.activeElement.id;
			$('#tblAppendGrid').appendGrid('removeRow',focused);
			//$('#testlbl').value = Object.keys(trid.context);
			
		}
		//on up arrow key press
		else if(e.keyCode==38)
		{
			var focused = document.activeElement;
			//alert(Object.keys(focused));
			//alert(focused.nextSibling);
			//alert(Object.keys($(this).parent().context));
			//alert(Object.keys($(document.activeElement).context));
			var prevRow = $(document.activeElement).context.parentElement.parentElement.previousSibling;
			if(prevRow!=null)
			{	
				//alert("ok");
				//alert(Object.keys($(prevRow).context.childNodes[1]));
				//alert($(prevRow).context.childNodes[1].id);
				
				var $prevRowID = $(prevRow).context.childNodes[1].firstChild.id;
				//alert(Object.keys($(prevRow).context.childNodes[1]));
				$('#'+$prevRowID).focus();
				//alert("'"+$prevRowID.trim()+"'");
				//debugger 
				//alert(document.getElementById($prevRowID));
				//alert($("#"+$prevRowID).is(":focus"));
				//$('#'+$prevRowID).focus();
				//$('#tblAppendGrid_BillItem_1').focus();
				//alert(prevSelectorID);
				//$('#tblAppendGrid_BillItem_1').focus();
				//alert($(prevSelectorID));
				//alert(Object.keys($(prevRowID).context));
				
			}
		}
		//on down arrow key press
		else if(e.keyCode==40)
		{
			//alert($(this).parent().children().index(this));
			var nextRow = $(document.activeElement).context.parentElement.parentElement.nextSibling;
			//alert(Object.keys($(document.activeElement).context));
			if(nextRow!=null)
			{
				var nexRowID = $(nextRow).context.childNodes[1].firstChild.id;
				$('#'+nexRowID).focus();
			}
			 
		}
	});

	
function initializesite(val)
{
	if(val=='0')
	{
		//alert(val);
		OpenLoginPopup();
	}
	else
	{
		//alert(val);
		//OpenLoginPopup();
		GetMaxBillIDandInitialize();
	}
}
//get max Bill ID
function GetMaxBillIDandInitialize()
{
	NextBillID = -1;
	$.ajax({
		type:"POST",
		url:"php/getBillID.php",
		data:{"GetAutoIncrementValue":"0"},
		cache:false,
		success:function(result){
			//alert(result);
			NextBillID =-1;
			if(result.trim().length>0)
			{
				//alert(result);
				
				NextBillID = parseInt(result)+1;
				if(NextBillID!=-1)
				{
					sessionStorage.setItem("NextBillID",NextBillID);
					sessionStorage.setItem("CurrentBillNumber",NextBillID);
					InitializeBillGrid(NextBillID);
				}
			}
			else
			{
				$.ajax({
					type:"POST",
					url:"php/getBillID.php",
					data:{"GetAutoIncrementValue":"1"},
					success:function(AutoIncrementValue){
						//alert("AutoIncrementValue"+AutoIncrementValue);
						
						NextBillID = parseInt(AutoIncrementValue)+1;//+1
						if(parseInt(AutoIncrementValue) ==1)
						{
							NextBillID =1;
						}
						else
						{
							//dont change
						}
						if(NextBillID!=-1)
						{
							sessionStorage.setItem("NextBillID",NextBillID);
							sessionStorage.setItem("CurrentBillNumber",NextBillID);
							InitializeBillGrid(NextBillID);
						}
					},
					failure:function(error){
						alert(error);
					}
				});
			}
			
		}
		
	});
}
//initialize grid
function InitializeBillGrid($id)
{
	// debugger
	$('#tblAppendGrid').appendGrid({
	caption: 'Bill Number:'+$id,
	initRows: 0,
	columns: [
	{ name: 'ItemID', display: 'ItemID',invisible:true},
	{ name: 'BillItem', display: 'Particulars', type: 'text', ctrlAttr: { maxlength: 500 }, ctrlCss: { width: '350px'},ctrlAttr: { 'readonly': 'readonly' } },
	{ name: 'BItemQuant', display: 'Qty', type: 'text', onChange: function(evt,rowIndex){updateValues(evt,rowIndex)},ctrlAttr: { maxlength: 10 }, ctrlCss: { width: '30px'} },
	{ name: 'BItemPrice', display: 'Rate', type: 'text', onChange: function(evt,rowIndex){updateValues(evt,rowIndex)},ctrlAttr: { maxlength: 20 }, ctrlCss: { width: '60px'} },
	{ name: 'BItemAmount', display: 'Amount', type: 'text', ctrlAttr: { maxlength: 20 }, ctrlCss: { width: '90px'},ctrlAttr: { 'readonly': 'readonly' } },
	{ name: 'ItemDiscount', display: 'Discount',invisible:true},
	],
	hideButtons:{
		moveUp:true,
		moveDown:true,
		removeLast:true,
		insert:true,
		append:true
	},
	beforeRowRemove: function (caller, rowIndex) {
            // updateValues(caller,rowIndex);
			// alert("before");
			return confirm('Are you sure to remove this Item?');
        },
	afterRowRemoved: function (caller, rowIndex) {
             // alert("row removed:"+caller);
			 UpdateBillAmounts();
			//updateValues(evt,rowIndex);
        },
	customFooterButtons: [
            {
                uiButton: { icons: { primary: 'ui-icon-pencil' }, label: 'New' },
                btnCss: { 'color': '#ff0000' },
                click: function (evt) {
                    //alert('You clicked `Refresh` button!');
					setAllToDefaults();
                },
                atTheFront: true
            }]
	});
}
function setAllToDefaults()
{
	//make grid empty
	//InitializeBillGrid();
	GetMaxBillIDandInitialize();
	//UpdateBillAmounts sets values to zero. to display place holder set manually to zero
	//UpdateBillAmounts();
	//customerName empty
	$('#CustName').val("");
	//customer mobile empty
	$('#CustMob').val("");
	//gross empty
	$('#GrossAmount').val("");
	//Discount empty
	$('#Discount').val("");
	//net empty
	$('#NetAmount').val("");
	//amount received
	$('#AmountReceived').val("");
	//balance tendered
	$('#BalanceTendered').val("");
	
	
}
function ItemAvailable_Click(ItemData){
	//alert(Object.getOwnPropertyNames($('#tblAppendGrid').context.childNodes[1].firstChild.value));
	// debugger
	var jsonItemData = ItemData;//JSON.parse(ItemData);
	
	var BillData = $('#tblAppendGrid').appendGrid('getAllValue');
	var QtyIncremented = 0;
	if(BillData.length>0)
	{
		for(i=0;i<BillData.length;i++)
		{
			var UniqueIndexofMatch =  $('#tblAppendGrid').appendGrid('getUniqueIndex', i);
			
			if(BillData[i].ItemID == ItemData.ItemID && BillData[i].ItemID.trim()!="")
			{
				//var UniqueIndexofMatch =  $('#tblAppendGrid').appendGrid('getUniqueIndex', i);
				var NewQty = parseInt(BillData[i].BItemQuant) + 1;
				$('#tblAppendGrid_BItemQuant_'+UniqueIndexofMatch).val(NewQty);
				QtyIncremented =1;
				$('#tblAppendGrid_BItemQuant_'+UniqueIndexofMatch).change();
			}
			else if(BillData[i].ItemID.trim()=="" && QtyIncremented ==0)
			{
				fillRowData(UniqueIndexofMatch,jsonItemData);
				QtyIncremented =1;
			}
		
		}
	}
	else
	{
		createNewBillItemRow(jsonItemData);
	}
	if(QtyIncremented!=1 && BillData.length>0)
	{	
		createNewBillItemRow(jsonItemData);
	}
	//CalculateBill();
	//UpdateBillAmounts();
	
	//alert("asda");
	
	}

function createNewBillItemRow(jsonItemData)
{
	if(jsonItemData!=null)
	{
		// debugger
		var NoOfRows = $('#tblAppendGrid tr').length-3;
		var lastRowID = NoOfRows;
		$('#tblAppendGrid').appendGrid('appendRow',1);
		var uniqueIndex = $('#tblAppendGrid').appendGrid('getUniqueIndex', lastRowID);
		// uniqueIndex = $('#tblAppendGrid').appendGrid('getUniqueIndex', 0);
		if(uniqueIndex==null)
		{
			// uniqueIndex =1;
			uniqueIndex = $('#tblAppendGrid').appendGrid('getUniqueIndex', lastRowID-1);
			if(uniqueIndex==null)
			{
				uniqueIndex = 1;
			}
		}
		//alert(lastRowID+" "+uniqueIndex);
		fillRowData(uniqueIndex,jsonItemData);
		
	}
}
function fillRowData(uniqueIndex,jsonItemData)
{
	if(jsonItemData!=null)
	{
		$('#tblAppendGrid_ItemID_'+uniqueIndex).val(jsonItemData.ItemID);
		$('#tblAppendGrid_BillItem_'+uniqueIndex).val(jsonItemData.Nickname);
		$('#tblAppendGrid_BItemQuant_'+uniqueIndex).val("1");
		$('#tblAppendGrid_BItemPrice_'+uniqueIndex).val(jsonItemData.sellingPrice);
		$('#tblAppendGrid_BItemAmount_'+uniqueIndex).val(jsonItemData.sellingPrice);
		$('#tblAppendGrid_ItemDiscount_'+uniqueIndex).val(jsonItemData.Discount);
	}
}
function UpdateBillAmounts()
{
	//get grid
	// debugger
	var BillData = $('#tblAppendGrid').appendGrid('getAllValue');
	
	var totalDisc = getSumOfAllDiscounts(BillData);
	// var DiscountinTB = $('#Discount').val();
	// var additionalDisount = (parseInt(totalDisc)||0) - (parseInt(DiscountinTB)||0);
	if(totalDisc!=null ) //&& parseInt(additionalDisount)>=0
	{
		$('#Discount').val(parseFloat(totalDisc).toFixed(2));//+parseInt(additionalDisount)
	}
	var GrossBillAmount = getGrossofBill(BillData,totalDisc);
	if(GrossBillAmount!=null)
	{
		$('#GrossAmount').val(GrossBillAmount);
	}
	// debugger
	var calcNetAmount = calculateNet();
	$('#NetAmount').val(calcNetAmount);
	if(BillData!=null)
		{
			//var serializeBillData =$(document.forms["BillingForm"]);//.serialize();
			var serializeBillData = $('form').serialize();
			var customerName = $('#CustName').val();
			var CustomerMobile = $('#CustMob').val();
			var Discount = $('#Discount').val();
			var Gross = $('#GrossAmount').val();
			var NetAmount = $('#NetAmount').val();
			var taxPer = $('#TaxAmount').val();
			
		}
		var BalFromCust = parseFloat(parseFloat($("#NetAmount").val())-(parseFloat($("#AmountReceived").val())||0)).toFixed(2);
		$("#BalanceTendered").val(BalFromCust);
		//alert((parseInt($("#AmountReceived").val()))||0);
	//calculate each field
	//update fields
}
function getSumOfAllDiscounts(BillData)
{
	var TotalDiscount = 0;
	if(BillData!=null)
	{
		
		for(i=0;i<BillData.length;i++)
		{
			TotalDiscount += parseInt(BillData[i].ItemDiscount * BillData[i].BItemQuant);
		}
	}
	return TotalDiscount;
}

function getGrossofBill(BillData,totalDisc)
{
	//gross is sum of sp of all + item disc
	var TotalGross = 0;
	if(BillData!=null)
	{
		
		for(i=0;i<BillData.length;i++)
		{
			if(BillData[i].BItemAmount.trim()!="")
				TotalGross += parseInt(BillData[i].BItemAmount);
		}
	}
	return TotalGross; //-totalDisc
}	
	
function calculateNet()
{
	var NetAmount = 0;
	var gross = $('#GrossAmount').val();
	var Discount = $('#Discount').val();
	var TaxPer = $('#TaxAmount').val();
	var NetWithOutTax = parseFloat(gross).toFixed(2) - (parseFloat(Discount).toFixed(2)||0);
	var NetAmount = parseFloat(NetWithOutTax) + (parseFloat(NetWithOutTax)*parseFloat(TaxPer))/100;
	
	return NetAmount;
}
function updateValues(evt,rowIndex)
{
	// debugger
	if(rowIndex!=null)
	{
		var UniqueIndexofMatch =  $('#tblAppendGrid').appendGrid('getUniqueIndex', rowIndex);
		var QtyinGrid = $('#tblAppendGrid_BItemQuant_'+UniqueIndexofMatch).val();
		var RateinGrid = $('#tblAppendGrid_BItemPrice_'+UniqueIndexofMatch).val();
		var newTotalAmount = parseInt(QtyinGrid) * parseInt(RateinGrid);
		$('#tblAppendGrid_BItemAmount_'+UniqueIndexofMatch).val(newTotalAmount);
	}
	UpdateBillAmounts();
}
function OpenLoginPopup()
{
	$(document).ready(function(){
		//dialog
		//alert(Object.getOwnPropertyNames(this));
	//$('#LoginPopup').dialog('destroy');
	$('#LoginPopup').dialog({
		title:"Log In",
		// height:$(document).height(),
		// width:$(document).width(),
		
		buttons:{
			Close: function(){
				//alert(this);
				$(this).dialog('close');
			}
		},
		"open":function(){
			// $("#AvailItemsDiv").unbind();
			//alert(Object.getOwnPropertyNames($("#AvailItemsDiv").children().context));
			//$("#AvailItemsDiv").children().context.off();
			//$("#AvailItemsDiv,#BillingForm").addClass("BlurBackground");
			
			// event.stopPropagation();
		},
		"close":function(){
			//$("#AvailItemsDiv,#BillingForm").removeClass("BlurBackground");
		},
		modal:true,
		closeOnEscape:false,
		dialogClass:"no-close"
	});
	});
}
function CheckLogin()
{
	//alert("called");
	var strChk = "CheckSession=true";
	$.ajax({
		type:"POST",
		url:"php/login.php",
		data:strChk,
		cache:false,
		success:function(info){
			debugger
			//alert(info);
			
			if(info==null || info=="")
			{
				OpenLoginPopup();
			}
			else
			{
				
				$('#LoggedInUser').text("Hi "+info+",");
				//$("#LoginPopup").dialog('close');
			}
		}
	});
}  
    // $(function () {
        // // Initialize appendGrid
        // $('#tblAppendGrid').appendGrid({
            // caption: 'My CD Collections',
            // initRows: 1,
            // columns: [
                    // { name: 'Album', display: 'Album', type: 'text', ctrlAttr: { maxlength: 100 }, ctrlCss: { width: '160px'} },
                    // { name: 'Artist', display: 'Artist', type: 'text', ctrlAttr: { maxlength: 100 }, ctrlCss: { width: '100px'} },
                    // { name: 'Year', display: 'Year', type: 'text', ctrlAttr: { maxlength: 4 }, ctrlCss: { width: '40px'} },
                    // { name: 'Origin', display: 'Origin', type: 'select', ctrlOptions: { 0: '{Choose}', 1: 'Hong Kong', 2: 'Taiwan', 3: 'Japan', 4: 'Korea', 5: 'US', 6: 'Others'} },
                    // { name: 'Poster', display: 'With Poster?', type: 'checkbox' },
                    // { name: 'Price', display: 'Price', type: 'text', ctrlAttr: { maxlength: 10 }, ctrlCss: { width: '50px', 'text-align': 'right' }, value: 0 },
                    // { name: 'RecordId', type: 'hidden', value: 0 }
                // ],
				// hideButtons:{
					// remove:true,
				// }
        // });
        // // Handle `Load` button click
        //$('#btnLoad').button().click(function () {
            // $('#tblAppendGrid').appendGrid('load', [
                // { 'Album': 'Dearest', 'Artist': 'Theresa Fu', 'Year': '2009', 'Origin': 1, 'Poster': true, 'Price': 168.9, 'RecordId': 123 },
                // { 'Album': 'To be Free', 'Artist': 'Arashi', 'Year': '2010', 'Origin': 3, 'Poster': true, 'Price': 152.6, 'RecordId': 125 },
                // { 'Album': 'Count On Me', 'Artist': 'Show Luo', 'Year': '2012', 'Origin': 2, 'Poster': false, 'Price': 306.8, 'RecordId': 127 },
                // { 'Album': 'Wonder Party', 'Artist': 'Wonder Girls', 'Year': '2012', 'Origin': 4, 'Poster': true, 'Price': 108.6, 'RecordId': 129 },
                // { 'Album': 'Reflection', 'Artist': 'Kelly Chen', 'Year': '2013', 'Origin': 1, 'Poster': false, 'Price': 138.2, 'RecordId': 131 }
            // ]);
        // });
        // // Handle `Serialize` button click
        // $('#btnSerialize').button().click(function () {
            // alert('Here is the serialized data!!\n' + $(document.forms[0]).serialize());
        // });
    
	// $( "" ).appendTo(document.body).button({
		// icons: {
		// primary: "ui-icon-locked"
		// },
		// text: false
		// });

	// });
	
