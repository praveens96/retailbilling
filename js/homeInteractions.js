	function setfilename(val)
	{
		alert(val);
		var fileName = val.substr(val.lastIndexOf("\\")+1, val.length);
		document.getElementById("tbItemImage").value ="images/STContent/"+ document.getElementById("FileBrowse").files[0].name;//fileName;
	}
$(document).ready(function(){
	//var tables = [ClothType:"typeofclothing",Brands:"brands",Quality:"quality",ItemName:""];
	$('#tbPurchaseDate').datepicker({
        changeYear: true,
    });
	
	$("#liManage").click(function(){
		//debugger
		 // $(".loading").show(); 
		$("#loadeimg").show();
		// $("#MainBodyDiv").load("/st/manage.php",function(){
			 // alert("loaded");
			 // // var hash=location.hash;
			 // //alert(hash);
    
			 // // debugger
			 // // $(".loading").hide(); 
			 // $("#loadeimg").hide();
		// });
	});
	
	$('#Browse').click(function(){
		
		$('#FileBrowse').click();
	});

	$("#tbItemName").change(function(evt){
		ItemSelected = $("#tbItemName").val();
		// alert(ItemSelected);
		$.ajax({
			url:'php/db.php',
			data:{operation:"GetAllItemDetails",ValueToSearch:ItemSelected},
			type:'POST',
			success:function(resp){
				resp = JSON.parse(resp);
				// debugger
				// alert("val:"+resp.ClothingType);
				$('#tbTypeofClothing').val(resp.ClothingType);
				if(resp.ImagePath!='' && resp.ImagePath != undefined)
					$('#tbItemImage').val(resp.ImagePath);
				$('#tbBrand').val(resp.BrandName);
				$('#tbQuality').val(resp.ClothQualityLevel);
				$('#tbCostPrice').val(resp.costprice);
				$('#tbSellingPrice').val(resp.sellingPrice);
				$('#tbDiscount').val(resp.Discount);
				$('#tbNickName').val(resp.NickName);
				$('#tbPurchasedfrom').val(resp.purchasedfrom);
			},
			failure:function(msg){
				alert(msg);
			}
		});
	});
	

	$('#purchasesubmit').click(function(evt){
		//alert("asd");
		//debugger
		$("#loadeimg").show();
		$z = document.getElementById("TypeofClothing").options.length;

		$types = $("#TypeofClothing")[0].options;
		
		$type=$('#tbTypeofClothing').val().trim();
		$Brand =$('#tbBrand').val().trim();
		$Quality = $('#tbQuality').val().trim();
		$purchasedfrom =$('#tbPurchasedfrom').val().trim();
		$puchasedate=$('#tbPurchaseDate').val().trim();
		$CostPrice=$('#tbCostPrice').val().trim();
		$Quantity =$('#tbQuantity').val().trim();
		$ItemName = $('#tbItemName').val().trim();
		$ItemImage= $('#tbItemImage').val().trim();
		$PurchaseName = $('#tbPurchaseName').val().trim();
		$SellingPrice = $('#tbSellingPrice').val().trim();
		$NickName = $('#tbNickName').val().trim();
		$Discount = $('#tbDiscount').val().trim();
		//|| $Brand==''||$Quality==''||$purchasedfrom==''||$puchasedate=='')//||
							//$CostPrice==''||$Quantity==''||$ItemImage==''||$ItemName=='')
		if($type==''|| $Brand==''||$Quality==''||$purchasedfrom==''||$puchasedate==''||$CostPrice==''||$Quantity==''||$ItemImage==''||$ItemName=='x' || $ItemImage == ''
			||$PurchaseName=='' || $SellingPrice == '' || $NickName == '' || $Discount == '')
		{
			//alert($type);
			$("#loadeimg").hide();
			// evt.preventDefault();
			
		}
		else
		{
			//check each value in db n proceed acc
			// alert("$type:"+$type);
			// CheckValueandUpdateToDB($type,$types,"Type");
			
			$.ajax({
				url:'php/db.php',
				data:{operation:"PurchasesInsertion",purchasename:$PurchaseName, type:$type,Brand:$Brand,Quality:$Quality,PurchasedFrom:$purchasedfrom,purchasedate:$puchasedate,
						CostPrice:$CostPrice,Quantity:$Quantity,ItemName:$ItemName, PurchaseName:$PurchaseName, SellingPrice:$SellingPrice, NickName:$NickName, 
						ItemImage:$ItemImage, Discount:$Discount},
				type:'POST',
				success:function(PurchasesInsertSuccess){
					alert("PurchasesInsertSuccess:"+PurchasesInsertSuccess);
					$("#loadeimg").hide();
				},
				error:function(PurchasesInsertError){
					alert("PurchasesInsertError:"+PurchasesInsertError);
					$("#loadeimg").hide();
				}
			});
			evt.preventDefault();
		}
	});
	// $("#MainBodyDiv").load(function(){
		// alert("e");
	// });	
	// $("#MainBodyDiv").onload(function(args){
		
		// alert(args);
	// });
	
});

// function CheckValueandUpdateToDB()
