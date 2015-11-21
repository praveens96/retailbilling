$(document).ready(function(){

	$(document).on('click','#BillEditSubmit',function(){
			var CurrentBillTable = $('#QueryBillDetails').appendGrid('getAllValue');
			var CurrentBillItemDetails = $('#QueryBillItemDetails').appendGrid('getAllValue');
			// alert(CurrentBillItemDetails+""+$('#QueryBillItemDetails_rowOrder'));
			// var serializeBillData =$(document.forms["BillingForm"]).serialize();
			// var SelectedBillID = parseInt(this.id.substring(this.id.lastIndexOf('_')+1));
			var SelectedBillUniqueId = $('#QueryBillItemDetails').appendGrid('getUniqueIndex',0);
			var SelectedBillID = parseInt($('#QueryBillItemDetails_BillID_'+SelectedBillUniqueId).val());
			var NoOfBillRows = $('#QueryBillDetails').appendGrid('getRowCount');
			var SelectedBillRowDetails = [];
			for(i=0;i<NoOfBillRows;i++)
			{
				if(CurrentBillTable[i]["BillID"] == SelectedBillID)
				{
					SelectedBillRowDetails.push(CurrentBillTable[i]);
				}
			}
			//debugger
			if(CurrentBillTable!=null && CurrentBillTable!= undefined && CurrentBillItemDetails!= undefined && CurrentBillItemDetails!= null)
			{
				// alert(JSON.stringify(CurrentBillTable)+"::"+JSON.stringify(CurrentBillItemDetails));
				// var ItemsDatatoUpdate = CurrentBillItemDetails;
				$.ajax({
					url:'php/db.php',
					data:{operation:"UpdateBillItems",ItemsArray:CurrentBillItemDetails,BillDetails:SelectedBillRowDetails},
					type:'POST',
					success:function(UpdateBillItemsReturn){
						alert("UpdateBillItemsReturn:"+UpdateBillItemsReturn);
					},
					error:function(UpdateBillItemsError){
						alert("UpdateBillItemsError:"+UpdateBillItemsError);
					}
				});
			}
			else
			{
				alert("Select a bill to update");
			}
		});	
	
});
