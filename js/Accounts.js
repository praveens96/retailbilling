$(function(){
	// alert('tabs');
	$('#STAcctabs').tabs();
});
$(document).ready(function(){
	var changedUserNames = [];
	var NewUserCounter = 0;
	//call and get users from login table
	$.ajax({
		url:"php/db.php",
		data:{operation:"fetch",table:"login",cols:["username","passwordhash","role"]},
		type:'POST',
		success:function(FetchLogins){
			// console.log("FetchLogins:"+FetchLogins);
			//add to UsersDiv
			ShowinView(JSON.parse(FetchLogins));
		},
		failure:function(FetchLoginsErr){
			console.log("FetchLoginsErr:"+FetchLoginsErr);
		},
		error:function(FetchLoginsErr){
			console.log("FetchLoginsErr:"+FetchLoginsErr);
		}
	});
	$('#AddLoginUsers').click(function(){
		NewUserCounter++;
		var strHTMLNew = "<div class='row'> <div class='col-md-2'><input id='username_"+NewUserCounter+"' type='text' placeholder='User Name' class='form-control'></div>"+
				"<div class='col-md-2'>"+"<select id='role_"+NewUserCounter+"' class='col-md-2 form-control' ><option>  admin  </option> <option>  guest  </option></select>"+"</div>"+
				"<div class='col-md-2'>"+"<input id='password_"+NewUserCounter+"' type='password' placeholder='Password' class='col-md-2 tbxPassword form-control' >"+"</div>"+
				"<div class='col-md-2'>"+"<button id='AddBtn_"+NewUserCounter+"' class='btn btn-success btnAddUser'>Add</button>"+"</div>"+"<br/>";
		$('#UsersDiv').append(strHTMLNew);
	});
	//attach click
	// $(document).on('click','.btnLoginUpdate',function(){
		// alert(this.id);
		
	// });
	//delete
	$(document).on('click','.btnLogindelete',function(){
		var DeleteUserName = (trimNgetUsername(this.id));
		DeleteLoginUser(DeleteUserName);
	});
	//btnAddUser
	$(document).on('click','.btnAddUser',function(){
		// debugger
		var NewUserRowID = (trimNgetUsername(this.id));
		var NewUsername = $('#username_'+NewUserRowID).val();
		var NewUserRole = $('#role_'+NewUserRowID).val();
		var NewPassword = CryptoJS.MD5($('#password_'+NewUserRowID).val()).toString();
		if(NewUsername!='' && NewPassword!='')
		{
			$.ajax({
				url:"php/AccDBActivities.php",
				data:{operation:"InsertNew",UserDetails:{"UserName":NewUsername,"UserRole":NewUserRole,"Password":NewPassword}},
				type:'POST',
				success:function(InsertNewReturn){
					console.log("InsertNewReturn:"+InsertNewReturn);
					InsertNewReturn = JSON.parse(InsertNewReturn);
					if(InsertNewReturn.UpdateRowCount=='1')
					{
						alert("User Added Successfully");
						$('#STAccMgmt').click();
					}
				},
				error:function(InsertNewErr){
					console.log("InsertNewErr:"+InsertNewErr);
				}
			});
		}
		else
		{
			alert("username and password cannot be empty");
		}
	});
	//password chnage
	$(document).on('change','.tbxPassword',function(){
		// alert(this.value);
		changedUserNames.push(trimNgetUsername(this.id));
	});
	
});

function trimNgetUsername(fieldID)
{
	// debugger
	var username ='';
	if(fieldID!='' && fieldID!= undefined)
	{
		var UnderscoreIndex = fieldID.lastIndexOf("_");
		username = fieldID.substring(UnderscoreIndex+1);
	}
	return username;
}

function ShowinView(LoginsJSON)
{
	if(LoginsJSON!= '' && LoginsJSON!= undefined)
	{
		var DivHtml = '';
		// debugger
		// var combo = $("<select></select>").attr("id", "Roles").attr("name", "Roles");
				// combo.append("<option>" + "admin" + "</option>");
				// combo.append("<option>" + "guest" + "</option>");
				var Heading = "<div class='row' style='font-weight:bold'> <div class='col-md-2'>User Name</div>"+
				"<div class='col-md-2'>User Role</div>"; //+"<div class='col-md-2'>Password</div>"
				
		var combo = "<select class='col-md-2 form-control' style='width:10%'><option>  admin  </option> <option>  guest  </option></select>";
		var strOptions = '';
		$('#UsersDiv').append(Heading);
		
		$.each(LoginsJSON ,function(index,valuesRow){
			console.log(valuesRow);//{username: "admin", passwordhash: "098f6bcd4621d373cade4e832627b4f6", role: "admin"}
			if(valuesRow.role=='admin')
			{
				strOptions = "<option selected>  admin  </option> <option>  guest  </option>";
			}
			else
			{
				strOptions = "<option >  admin  </option> <option selected>  guest  </option>";
			}
			var strHTML = "<div class='row'>"+
								"<div class='col col-md-2'>"+
								"<div id='usrname_"+valuesRow.username+"'>"+valuesRow.username+"</div>"+"</div>"+
								"<div class='col col-md-2'>"+
								"<select id='role_"+valuesRow.username+"' class=' form-control'>"+
											strOptions+"</select>"+"</div>"+
								
								"<div class='col-md-2'>"+
								"<button id='delete_"+valuesRow.username+"' class='btnLogindelete btn btn-success ' >"+"Delete"+"</button>"+"</div>"+
								"</div>"+"</div>";
								// "<div class='col-md-2'>"+
								// "<input id='password_"+valuesRow.username+"'type='password' value="+valuesRow.passwordhash+
										// " class=' tbxPassword form-control'>"+"</div>"+
								// "<div class='col-md-2'>"+
								// "<button id='update_"+valuesRow.username+"' class='btnLoginUpdate btn btn-success ' >"+"Update"+"</button>"+"</div>"+
			// var $userrow = $('<div>',{class:"row"});
			// var $UserName = $('<div >',{text:valuesRow.username, class:"col col-md-2"});
			// var $tbPassword = $('<input type="password">',{text:valuesRow.passwordhash});
			
			$('#UsersDiv').append(strHTML+"<br/>");
			
		});
	}
}

function DeleteLoginUser(DeleteUserName)
{
	if(DeleteUserName!='' && DeleteUserName!= undefined)
	{
		$.ajax({
			url:"php/AccDBActivities.php",
			data:{operation:"DeleteUser",DelUserName:DeleteUserName},
			type:"POST",
			// async: false, 
			success:function(UpdatePassReturn){
				console.log("UpdatePassReturn:"+UpdatePassReturn);
				UpdatePassReturn = JSON.parse(UpdatePassReturn);
				if(UpdatePassReturn.DeletedUsers=='1')
				{
					alert("Successfully Deleted User");
					$('#STAccMgmt').click();
				}
			},
			error:function(DeleteLoginUserErr){
				console.log("DeleteLoginUserErr:"+DeleteLoginUserErr);
				alert("DeleteLoginUserErr:"+DeleteLoginUserErr);
			}
		});
	}
}
