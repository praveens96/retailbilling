//login js
$(document).ready(function(){

//login click
	$("#btnLogin").click(function(){
		alert("btnclick");
		var $username = $("#usrname").val();
		var $password = $("#password").val();
		//alert(username+password);
		var $hash = CryptoJS.MD5(password);
		var $dataToPHP = "username="+$username+"&passwordhash="+$hash,
		//alert(hash);
		$.ajax({
			type:"POST",
			data:$dataToPHP,
			url:"php/login.php",
			success:function(message){
				
				alert(message);
				GetMaxBillIDandInitialize();
			}
				
			
		});
	});


});