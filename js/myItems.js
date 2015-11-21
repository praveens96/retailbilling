//require("js/billgrid.js");
$(document).ready(function(){
					
//fetch data from DB

//Attach to Images
//onclick add it grid 
//calculate accordingly
 
 // $('#AvailItemsDiv').prepend(
	
	// $('<img>',{id:'img1',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img2',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img3',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img4',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img5',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
		// $('<img>',{id:'img1',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img2',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img3',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img4',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img5',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
		// $('<img>',{id:'img1',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img2',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img3',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img4',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img5',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img2',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img3',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img4',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img2',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img3',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'}),
	// $('<img>',{id:'img4',src:'images/STcontent/arvind.jpg',class:'AvailableItem img-responsive'})
 // );
// $('#AvailItemsDiv').scroll();
$("#AmountReceived").change(function(received){
	net  = parseFloat($("#NetAmount").val()).toFixed(2);
	received = parseFloat($("#AmountReceived").val()).toFixed(2);
	
	$("#BalanceTendered").val(parseFloat(net-received).toFixed(2));
	
});
var windowHeight = $(window).height();
$('#AvailItemsDiv').height(windowHeight-155);
// alert(windowHeight-300);
				$('#AvailItemsCtrl').jplist({
						itemsBox:'.list',
						itemPath:'.list-item',
						panelPath:'.jplist-panel'
					});
$.ajax({
		
		url:'php/db.php',
		data:{operation:"fetch",table:"itemsavailable",cols:["ItemID","sellingPrice","QuantityAvailable","Discount","Nickname","ImagePath"]},
		type:'POST',
		success:function($dbItemData){
			// for(i=0;i<$dbItemData.length;i++)
				//alert($dbItemData[i]);
			// alert($dbItemData[3]);
			//debugger
			// alert("$dbItemData"+$dbItemData);
			// debugger
			if($dbItemData!=null)
			{
				Items = jQuery.parseJSON($dbItemData);
				// debugger
				for(i=0;i<Items.length;i++)
				{
					
					//var $newImage = $('<img>',{id:'img'+i,src:Items[i].ImagePath,class:'AvailableItem img-responsive'});
					var $newImageCaption = $('<div>',{text:Items[i].Nickname,class:"stitemname"});
					// $newImageCaption.css('class','stitemname');
					var $htmlImagewithCaption = $('<div>',{id:'item'+i,class:'AvailableItem list-item'});//.append($newImage);//'<div id=item'+i+'>'+$newImage+$newImageCaption+'</div>';
					// var newDynImage = new image;
					// newDynImage.src = Items[i].ImagePath;
					// newDynImage.height = '80px';
					// newDynImage.width='201px';
					$htmlImagewithCaption.css({'background-image':'url('+Items[i].ImagePath+')'
												// 'background-size': '201px 80px ' 
						}); //defined image size statically
					$htmlImagewithCaption.css('class',' img-responsive');
					// $('#AvailItemsDiv').append($htmlImagewithCaption);
					$htmlImagewithCaption.append($newImageCaption);
					$htmlImagewithCaption.data("ItemID",Items[i].ItemID);
					$htmlImagewithCaption.data("sellingPrice",Items[i].sellingPrice);
					$htmlImagewithCaption.data("QuantityAvailable",Items[i].QuantityAvailable);
					$htmlImagewithCaption.data("Discount",Items[i].Discount);
					$htmlImagewithCaption.data("Nickname",Items[i].Nickname);
					$htmlImagewithCaption.bind('click',ItemonClick);//+' '+'#img'+i
					
					$('#AvailItemsCtrl').jplist({
							command: 'add',
							commandData: {
							$item: $htmlImagewithCaption,
							// index: 0 //if index is omitted -> the items are added to the end of the list
						}
					});
				}

					
				//alert(Items[0].ImagePath);
			}
		},
		failure:function(msg){
			alert("error:"+msg);
		}
		
	});



function ItemonClick($item)
{
	// debugger
	//alert(Object.getOwnPropertyNames(this)); //>div>img).data("Nickname")
	//alert($(this).data("Nickname"));
	var ItemData = {"Nickname":$(this).data("Nickname"),
						"ItemID":$(this).data("ItemID"),
						"QuantityAvailable":$(this).data("QuantityAvailable"),
						"sellingPrice":$(this).data("sellingPrice"),
						"Discount":$(this).data("Discount")};
		
	ItemAvailable_Click(ItemData);
	UpdateBillAmounts();
	// $.ajax({
		// url:'db.php',
		// data:{operation:"fetch",args:{"brand","ItemID","sellingprice"}},
		// type:'POST',
		// success:function($dbItemData){
			// alert($dbItemData);
		// }
	//});
} 
}); 
		
// $('#AvailItemsDiv').jresponsive({
	// min_size: 50,
		// max_size: 200,
		// hspace: 50,
		// vspace: 10,
		// height:200,
		// class_name: 'item',
		// content_array: Items,
		// transformation: 'animation',
	
	// });
	

