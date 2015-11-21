//login js
$(document).ready(function(){

//login click
	$("#btnLogin").click(function(){
	
		var $username = $("#usrname").val();
		var $password = $("#password").val();
		//alert($password);
		var $hash = CryptoJS.MD5($password);
		//alert(CryptoJS.MD5("MeVineethJain"));
		var $dataToPHP = "username="+$username+"&passwordhash="+$hash;
		//alert(hash);
		$.ajax({
			type:"POST",
			data:$dataToPHP,
			url:"php/login.php",
			success:function(message){
				// alert(message);
				returnMsg = message.split(':');
				//alert(returnMsg[1]);
				if(returnMsg[1] == '1')
				{
					//alert(returnMsg[0]);
					
					$('#LoginPopup').dialog("close");
					location.reload();
					//var user = <?php echo json_encode($_SESSION['LoggedInUser']); ?>;
					$('#LoggedInUser').text("Hi "+$username+",");
					GetMaxBillIDandInitialize();
				}
				else
				{
					$('#LoginStatus').text("Incorrect Credentials").addClass('StatusFail');
					$('#usrname').focus();
				}
			}
		});
	});


});