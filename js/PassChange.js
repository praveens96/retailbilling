$(document).ready(function(){
	
	$("#btnPassChange").click(function(){
		var CurrPass = $("#CurrPass").val();
		var NewPass = $("#NewPass").val();
		var RetypedNewPass = $("#RetypedNewPass").val();
		if(NewPass == RetypedNewPass)
		{
			// debugger
			var CurrPassHash = GetHash(CurrPass);
			// alert(CurrPassHash);
			var NewPassHash = GetHash(NewPass);
			var isCurrPassValid = VerifyCurrentPassword(CurrPassHash,NewPassHash);
			// if(isCurrPassValid ==1)
			// {
				// console.log("valid curr pas");
				// UpdateNewPassword(NewPassHash);
			// }
			// else if(isCurrPassValid == 0)
			// {
				// alert("Current Password is not correct, please retry");
			// }
			// else if(isCurrPassValid == -1)
			// {
				// alert("Error in updating to Database");
			// }
			// else
			// {
				// alert("unknown error:"+isCurrPassValid);
			// }
			// var RetypedNewPass = GetHash(RetypedNewPass));
		}
		else
		{
			alert("New Password and Re-typed password are not matching");
		}
	});
	
	$("#PasswordUpdate").dialog({
		autoOpen: false,
		 resizable: false,
        modal: true,
        width:'auto',
		show: {
			effect: "blind",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		}
	});
	
	$('#PasswordChange').click(function(){
		$("#PasswordUpdate").dialog("open");
	});
	
});
function GetHash(strPass)
{
	var $hash ='';
	if(strPass!='' && strPass!= undefined)
	{
		$hash= CryptoJS.MD5(strPass);
	}
	
	return $hash;
}

function VerifyCurrentPassword(PasswordHash,NewPassHash)
{
	
	if(PasswordHash!='')
	{
		console.log("in verify:"+PasswordHash.toString());
		$.ajax({
			url:"php/AccDBActivities.php",
			data:{operation:"CheckPass",PasswordString:PasswordHash.toString()},
			type:"POST",
			// async: false, 
			success:function(CurrPassCheckReturn){
				CurrPassCheckReturn = JSON.parse(CurrPassCheckReturn);
				if(!$.isEmptyObject(CurrPassCheckReturn) && CurrPassCheckReturn !=null && 
					CurrPassCheckReturn != undefined && CurrPassCheckReturn.length !=0)
				{
					// debugger
					console.log("CurrPassCheckReturn:"+JSON.stringify(CurrPassCheckReturn)+" len"+CurrPassCheckReturn.length);
					console.log("newhash:"+NewPassHash);
					UpdateNewPassword(NewPassHash);
					// return 1;
				}
				else
				{
					alert("Please Check Current Password"+CurrPassCheckReturn);
					// return 0;
				}
			},
			failure:function(CurrPassCheckErr){
				alert("Error in updating:"+CurrPassCheckErr);
				console.log("CurrPassCheckErr:"+CurrPassCheckErr);
				// return -1;
			},
			error:function(CurrPassCheckErr){
				alert("Error in updating:"+CurrPassCheckErr);
				console.log("CurrPassCheckErr:"+CurrPassCheckErr);
				// return -1;
			}
		});
	}
}

function UpdateNewPassword(NewPassHash)
{
	if(NewPassHash!='' && NewPassHash != undefined)
	{
		// console.log("newp:"+NewPassHash);
		$.ajax({
			url:"php/AccDBActivities.php",
			data:{operation:"UpdatePass",NewPassHash:NewPassHash.toString()},
			type:"POST",
			// async: false, 
			success:function(UpdatePassReturn){
				if(!$.isEmptyObject(UpdatePassReturn) && UpdatePassReturn !=null && UpdatePassReturn != undefined && UpdatePassReturn.length !=0)
				{
					console.log("UpdatePassReturn:"+UpdatePassReturn);
					alert("updated");
					// return 1;
				}
				else
				{
					alert("updatefailed");
					// return 0;
				}
			},
			failure:function(UpdatePassErr){
				console.log("UpdatePassErr:"+UpdatePassErr);
				// return -1;
			},
			error:function(UpdatePassErr){
				console.log("UpdatePassErr:"+UpdatePassErr);
				// return -1;
			}
		});
	}
}