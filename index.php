<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<title>Sadhana Textiles - Home</title>
	<!-- CSS -->
		<link href="css/bootstrap.css" rel="stylesheet"></link>
		<link href='css/googlefonts.css' rel='stylesheet' type='text/css'></link>
		<link href="css/stylesHeader.css" rel="stylesheet" type="text/css"></link>
		<link href="css/styleST.css" rel="stylesheet" type="text/css"></link>
		<link href="jquery.appendGrid-1.4.1.css" rel="stylesheet" type="text/css"/><!-- </link> -->
		<!-- <link href="css/jquery.appendGrid-development.css" rel="stylesheet" type="text/css"></link> -->
		<link href="jquery-ui.css" rel="stylesheet" type="text/css"/>
		<link href="jquery.hoverGrid.css" rel="stylesheet" type="text/css"/>
		<link href="css/myItems.css" rel="stylesheet" type="text/css"/>
		<link href="css/printStyle.css" rel="stylesheet" type="text/css" media="print"/> <!-- media="print" -->
		<link href="css/stylesBillForm.css" rel="stylesheet" type="text/css"/>
		<link href="css/font-awesome.css" rel="stylesheet" type="text/css" />
		<link href="css/jplist.core.min.css" rel="stylesheet" type="text/css" />
		<link href="css/jplist.textbox-filter.min.css" rel="stylesheet" type="text/css" />
		<!-- <link href="jquery-ui-1.10.2.custom.css" rel="stylesheet" type="text/css"/>
		 <link href="jquery-ui.structure.css" rel="stylesheet" type="text/css"></link>
		<link href="jquery-ui.theme.css" rel="stylesheet" type="text/css"></link>
		  -->
		<script src="external/jquery/jquery.js"></script>
		<script src="js/md5.js"></script>
		<script src="bootstrap.js"></script>
		<script src="jquery-ui.js"></script>
		<script src="jquery.appendGrid-1.4.1.js"></script>
		<script src="jquery.prettyPhoto.js"></script>
		<script src="jquery.hoverGrid.js"></script>
		<script src="jresponsive.js"></script>
		<script src="billgrid.js"></script>
		<script src="js/myItems.js"></script>
		<script src="js/printbill.js"></script>
		<script src="js/homelogin.js"></script>
		<script src="js/billSubmit.js"></script>
		<script src="js/PassChange.js"></script>
		<script src="js/jquery.ddslick.min.js"></script>
		<script src="js/jplist.core.min.js"></script>
		<script src="js/jplist.textbox-filter.min.js"></script>
		<script src="js/jplist.pagination-bundle.min.js"></script>
		
		<!-- <script type="text/javascript" src="jquery-ui.js"></script>
	<script type="text/javascript" src="jquery.appendGrid-1.4.1.js"></script> -->

	</head>
	<body>
		<div class="overlay" id="loadeimg">
			<img src="/st/images/ajax-loader.gif" class="loadingImg">
		</div>
			<!--login div-->
		<div data-role="popup" id="LoginPopup" class="DoNotDisplay">
			<div class="popupRow">
				<label for="usrname" class="popupLabel">User Name  </label>
				<input type="text" id="usrname" placeholder="User Name"/> 
			</div>
			<div class="popupRow">
				<label for="password" class="popupLabel">Password   </label>
				<input id="password" type="password" placeholder="Password"/>
			</div>
			<div class="popupRow btnCenter">
				<input id="btnLogin" type="button" value="Login"/>
			</div>
			<span><label id="LoginStatus" /></span>
		</div>
		<?php 
				session_start();
				// echo "<script>console.log(  '" . $_SESSION['LoggedInUser']. "' );</script>";
				if(isset($_SESSION['LoggedInUser'])){
					echo '<script type="text/javascript">', 
					 'initializesite(1);',' </script>';
					 ?> 
		
		<!--Password update div-->
		<div id="PasswordUpdate" class="container" title="Change Password">
			<div class="row">
				<div class="col-md-5">
					<label>Current Password</label>
				</div>
				<div class="col-md-5">
					<input id="CurrPass" type="password" placeholder="Current Password"/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-5">
					<label>New Password</label>
				</div>
				<div class="col-md-5">
					<input id="NewPass" type="password" placeholder="New Password"/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-5">
					<label>Re-type Password</label>
				</div>
				<div class="col-md-5">
					<input id="RetypedNewPass" type="password" placeholder="Re-type Password"/>
				</div>
			</div>
			<div class="row">
				<div class="col-md-2 col-md-offset-5">
					<input type="button" class="btn btn-success" id="btnPassChange" value="change"></input>
				</div>
			</div>
		</div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
			
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  <div id="MainOuterDiv">
		<!-- Row 1 - Logo,Date -->
			<div class="container">
				
				<div class="row">	
					<div class="col-md-2 nav"> 
								<ul>
									<li><a href="#">options</a>
										<ul id="innerli">
											<li><a href="#" id="logout">logout</a></li>
											<li id="PasswordChange"><a href="#">account</a></li>
											<?php 
												if(isset($_SESSION['LoggedInUser']) && isset($_SESSION['UserRole']) && $_SESSION['UserRole'] == 'admin'){ ?>
												<li id="liManage"><a href="manage.php">manage</a></li> <?php }?>
										</ul>
									</li>
								</ul>
								
					</div>

					<div class="col-md-6 col-md-offset-2"> <!-- Logo -->
						
					<a href="index.php" class="navbar-brand  col-md-offset-6"  >Sadhana Textiles</a>
						
					</div>
					<!-- Date & Time -->
					<div class="nav1"> 	
						<div id="Today" ></div> <!-- today -->
						<div id="clock" ></div> <!-- clock -->
					</div> <!-- Date & Time -->
				</div>
			</div>
			</div>
			</div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
		
			
			<!--<hr /> -->
			<div id="MainBodyDiv">
			<div id="AvailItemsCtrl">
				
				<div class="jplist-panel box panel-top">						
				
					<div class="text-filter-box">

					   <i class="fa fa-pencil jplist-icon"></i>
					   
					   <!--[if lt IE 10]>
					   <div class="jplist-label">Filter by Title:</div>
					   <![endif]-->
					   
					   <input 
						  data-path=".stitemname" 
						  type="text" 
						  value="" 
						  placeholder="Filter by Name" 
						  data-control-type="textbox" 
						  data-control-name="title-filter" 
						  data-control-action="filter"
					   />
					</div>
				  <!-- ios button: show/hide panel -->
					<div class="jplist-ios-button">
						<i class="fa fa-sort"></i>
						jPList Actions
					</div>
					
					<div 
					   class="jplist-label" 
					   data-type="Page {current} of {pages}" 
					   data-control-type="pagination-info" 
					   data-control-name="paging" 
					   data-control-action="paging">
					</div>	

					<div 
					   class="jplist-pagination" 
					   data-control-type="pagination" 
					   data-control-name="paging" 
					   data-control-action="paging">
					</div>
					<div 
					   class="jplist-drop-down" 
					   data-control-type="items-per-page-drop-down" 
					   data-control-name="paging" 
					   data-control-action="paging">
							<ul>
							  <li><span data-number="8"> 8 per page </span></li>
							  <li><span data-number="12" data-default="true"> 12 per page </span></li>
							  <li><span data-number="20"> 20 per page </span></li>
							  <li><span data-number="all"> view all </span></li>
						   </ul>
					</div>
				</div>
						
				<div id="AvailItemsDiv" class="col-md-6 list">
						
				</div> <!-- AvailItemsDiv -->
				<div class="jplist-no-results" style="clear:both">
					<p>No results found</p>
 			    </div>
			</div>
			<div id="BillingDiv" class="col-md-6">
				<form id="BillingForm">
				<div id="CustomerDetails">
					<span><label id="lblCustName" for="CustName">Customer Name</label>
					<input type="text" id="CustName" placeholder="Customer Name" value="seela" required="true"/></span>
					<span><label id="lblCustMob" for="CustMob">Customer Mobile</label>
					<input id="CustMob" placeholder="Customer Mobile Number" required="true" value="9032428081"/></span>
				</div> <!-- CustomerDetails -->
				<br/>
				<div id="AppendGrid" >
					<table id="tblAppendGrid">
					</table>
				</div><!-- AppendGrid -->
				
				<div class="container" id="BillSummary">
					<div class="row" id="BillAmounts">
					<br/>
					<div class="col-md-3">
							<span> <label class="col-sm-5 control-label" id="lblBillGross" for="GrossAmount" style="padding: 0px;" >Gross</label>
									<input type="number" class="col-sm-7" id="GrossAmount" style="padding: 0px;" placeholder="Gross" readonly required /></span>
							<br/><br/>
							<span><label class="col-sm-5" id="lblTax" for="TaxAmount" style="padding: 0px;">Tax</label>
							<input type="number" id="TaxAmount" class="col-sm-7" style="padding: 0px;" placeholder="Tax" readonly /></span>
						</div>
						<div class="col-md-5">
							<span><label id="lblTax" for="NetAmount" class="col-sm-2" style="padding: 0px;align:center;">Net</label>
							<input type="number" id="NetAmount" class="col-sm-10" placeholder="Net" class="col-sm-7" readonly /></span>
							<br/><br/>
							<span><label class="col-sm-5" id="lblReceived" for="AmountReceived" style="padding: 0px;">Received</label>
							<input type="number" id="AmountReceived" class="col-sm-7" style="padding: 0px;" placeholder="Received"/></span>
						</div>
						<div class="col-md-4">
							<span><label id="lblTax" for="Discount" class="col-sm-5" style="padding: 0px;">Discount</label>
							<input type="number" id="Discount" placeholder="Discount" class="col-sm-6" style="padding: 0px;"/></span>
							<br/><br/>
							<span><label class="col-sm-5" id="lblTender" for="BalanceTendered" style="padding: 0px;">Tendered</label>
							<input type="number" id="BalanceTendered" class="col-sm-7" style="padding: 0px;" placeholder="Balance" readonly/></span>
						</div>
					</div>
					<br/>
					<div class="row" id="BillingButtons">
						<div class="col-md-6">
							<input id="SubmitBill" type="button"  value="Bill"/>
						</div>
						<div class="col-md-6">
							<input id="PrintBill" type="button" class="btn btn-success disabled" value="Print"/>
						</div>
					</div>
				
				<label id="SubmitStatus" />
			</div><!-- BillSummary -->
				
			</form>
			</div> <!-- BillingDiv -->
		
		</div> <!--<form id="BillingForm">-->
		<!--<hr/>-->
		<div class="footer" style="clear:both;">
			<br/>
			<!-- <br/> -->
			<a id="asdx"></a>
			<p> <center> <a href="index.php"> Sadhana Textiles &copy 2015 </a></center> </p>
		</div>

					<!-- print div -->
			
				<div id="printBillDIv" style="display:none">
					<!--<p>i am printing this</p> -->
				</div>
	<!-- JS -->	
		<!-- <script src="js/jquery.js"></script> --> <!-- http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js -->
		<!-- <script  src="js/bootstrap.js"></script> -->
		<script src="js/myClock.js"></script>
	<!--	<script> 
			$(function(){
			alert("ok1");
			
			$("").appendTo(document.body).button({
				icons: {
				primary: "ui-icon-locked"
				},
				text: false
				});
			});
		</script>
 		<script src="js/jquery.appendGrid-1.4.1.js"></script>
		<script src="js/billgrid.js"></script> -->
		
		<script src="js/maths.js"></script>
		<script src="js/homeInteractions.js"></script>
		<script src="jquery.printelement.js"></script>
		<script src="js/manage.js"></script>
		
		</div>
		<?php
		}
			else
			{
				// echo '<script type="text/javascript">', 'alert(\'ok\')','</script>';
				echo '<script type="text/javascript">', 
				 'initializesite(0);',' </script>';
			}
			?>
			
	</body>
</html>