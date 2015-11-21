<html>
<head>
	<title>Manage</title>
	<!-- CSS -->
		<link href="css/bootstrap.css" rel="stylesheet"></link>
		<link href='css/googlefonts.css' rel='stylesheet' type='text/css'></link>
		<link href="css/stylesHeader.css" rel="stylesheet" type="text/css"></link>
		<link href="css/styleST.css" rel="stylesheet" type="text/css"></link>
		<link href="jquery.appendGrid-1.4.1.css" rel="stylesheet" type="text/css"/> 
		<!--// <link href="css/jquery.appendGrid-development.css" rel="stylesheet" type="text/css"></link> -->
		<link href="jquery-ui.css" rel="stylesheet" type="text/css"/>
		<link href="css/stylesBillForm.css" rel="stylesheet" type="text/css"/>
		<!--<link href="jquery.hoverGrid.css" rel="stylesheet" type="text/css"/>
		<link href="css/myItems.css" rel="stylesheet" type="text/css"/>
		<link href="css/printStyle.css" rel="stylesheet" type="text/css" media="print"/> 
		
		<link href="css/pqgrid.min.css" rel="stylesheet" type="text/css"/>
		<!-- <link href="jquery-ui-1.10.2.custom.css" rel="stylesheet" type="text/css"/>
		 <link href="jquery-ui.structure.css" rel="stylesheet" type="text/css"></link>
		<link href="jquery-ui.theme.css" rel="stylesheet" type="text/css"></link>
		  --><!-- media="print" -->
		<script src="external/jquery/jquery.js"></script>
		<script src="js/md5.js"></script>
		<script src="bootstrap.js"></script>
		<script src="jquery-ui.js"></script>
		<script src="jquery.appendGrid-1.4.1.js"></script>
		<script src="jquery.prettyPhoto.js"></script>
		<script src="jquery.hoverGrid.js"></script>
		<script src="jresponsive.js"></script>
		<script src="billgrid.js"></script>
		<script src="js/manage.js"></script>
		<script src="js/myClock.js"></script>
		<script src="js/maths.js"></script>
		<script src="js/homeInteractions.js"></script>
		<script src="js/billSubmit.js"></script>
		<script src="js/homelogin.js"></script>
		<!--<script src="js/myItems.js"></script>
		<script src="js/printbill.js"></script>
		<script src="js/homelogin.js"></script>
		<script src="js/jquery.ddslick.min.js"></script>
		
		
		<script src="jquery.printelement.js"></script>
		
		<script src="js/pqgrid.min.js"></script>-->
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
		<nav class="navbar navbar-default">
			<div class="container-fluid">
			
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			  <div id="MainOuterDiv">
		<!-- Row 1 - Logo,Date -->
			<div class="container">
				<?php 
				session_start();
				// echo "<script>console.log(  '" . $_SESSION['LoggedInUser']. "' );</script>";
				if(isset($_SESSION['LoggedInUser']) && isset($_SESSION['UserRole']) && $_SESSION['UserRole'] == 'admin'){
					echo '<script type="text/javascript">', 
					 'initializesite(1);',' </script>';
					 ?> 
				<div class="row">	
					<div class="col-md-2 nav"> 
								<ul>
									<li><a href="#">options</a>
										<ul id="innerli">
											<li><a href="#" id="logout">logout</a></li>
											<li><a href="#">account</a></li>
											<li id="liManage"><a href="manage.php">manage</a></li>
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
		<!--<div id="MainOuterDiv">
		
			<div class="container">
			// <?php 
			// session_start();
			// if(isset($_SESSION['LoggedInUser'])){
				// echo '<script type="text/javascript">', 
				 // 'initializesite(1);',' </script>';
				 // ?> 
				<div class="row">	
					<div class="col-md-2 nav"> 
								<ul>
									<li><a href="#">options</a>
										<ul id="innerli">
											<li><a href="#" id="logout">logout</a></li>
											<li><a href="#">account</a></li>
											<li id="liManage"><a href="manage.php">manage</a></li>
										</ul>
									</li>
								</ul>
								
					</div>

					<div class="col-md-6"> 
						
					<a href="index.php" class="navbar-brand  col-md-offset-6"  >Sadhana Textiles</a>
						
					</div>
					<!-- Date & Time 
					<div class="nav1"> 	
						<div id="Today" ></div> 
						<div id="clock" ></div> 
					</div> 
				</div>
			</div>
		</div>
			
			<hr />-->
	<div class="container">
		<div class="row">
			<div >  <!-- style="border-right:1px solid black;height:100%;"-->  
			<div id="Manage_SideNavPane" class="col-md-3" >
				<ul class="list-left-nav">
					<li class="active"><a id="ManagePurchases" href="manage.php" id="M1">Purchases</a></li>
					<li><a id="STSales" href="#SalesHome">Sales</a></li>
					<li><a id="STReports" href="#reports">Reports</a></li>
					<li><a id="STBillManager" href="#Bill">Bill Manager</a></li>
					<li><a id="STExportImport" href="#ExportImport">Export/Import</a></li>
					<li><a id="STAccMgmt" href="#AccMgmt">Users</a></li>
					
				</ul>
			</div>
			</div>
			<div id="Manage_Content" class="col-md-9">
			<form action="" method="post">
				
				<!--Purchase Name-->
				<div class="row">
					<label for="PurchaseName" class="col-md-3" style="min-width:150px">Purchase Name </label>
					<input type=text id="tbPurchaseName" class="col-md-6" style="min-width:150px" placeholder="Purchase Name" required/>
				</div>
				<br/>
				<!-- Item Name!-->
				<div class="row">
					<label for="ItemName" class="col-md-3" style="min-width:150px">Item Name</label>
					<input type="text"  list="ItemsList" id="tbItemName" class="col-md-6" placeholder="Item Name" id="ItemName" required>
					<datalist id="ItemsList">
						<?php 
							require_once("php/manageDBOps.php");
							$rows = FetchColumn("purchaseitems","ItemName");
							print_r($rows);
							foreach($rows as $row){
						?>
						<option value="<?php echo $row[0];?>"> 
						<?php }?>
					</datalist>
				</div>
				<br/>
				<!--Item Image !-->
				<div class="row">
					<label for="ItemImage" class="col-md-3" style="min-width:150px">Item Image</label>
					<input type="text"  class="col-md-5" id="tbItemImage" placeholder="Image" id="ItemImage" >
					<button id="Browse" class="btn btn-default" style="margin-left:2px;">Browse</button>
					<input type="file" style="display:none;" id="FileBrowse" accept="image/*" onchange="setfilename(this.value);">
				</div>
				<br/>
				<!--Type -->
				<div class="row">
				<label for="TypeofClothing" class="col-md-3" style="min-width:150px">Type </label>
				<input type=text id="tbTypeofClothing" list=TypeofClothing class="col-md-6" style="min-width:150px" placeholder="Type" required/>
					<datalist id=TypeofClothing>
						<?php 
							require_once("php/manageDBOps.php");
							$ClothTypes = FetchColumn("typeofclothing","ClothingType");
							foreach($ClothTypes as $row){
						?>
							<option value="<?php echo $row[0]; ?>"> 
						<?php }?>
					</datalist>
				</div>
				
				<!--brand-->
				<br/>
				<div class="row">
				<label for="Brand" class="col-md-3" style="min-width:150px">Brand</label>
				<input type=text id="tbBrand" list=Brand class="col-md-6" style="min-width:150px" placeholder="Brand" required>
					<datalist id=Brand>
						<?php 
							require_once("php/manageDBOps.php");
							$rows = FetchColumn("brands","BrandName");
							foreach($rows as $row){
						?>
							
							<option value="<?php echo $row[0];?>"><?php }?>
					</datalist>
				</div>
				<br/>
				<!--Quality-->
				<div class="row">
				<label for="Quality" class="col-md-3" style="min-width:150px">Quality</label>
				<input type=text id="tbQuality" list=Quality class="col-md-6" style="min-width:150px" placeholder="Quality" required>
					<datalist id=Quality>
						<?php 
							require_once("php/manageDBOps.php");
							$rows = FetchColumn("quality","ClothQualityLevel");
							foreach($rows as $row){
						?>
							
							<option value="<?php echo $row[0];?>"><?php }?>
					</datalist>
				</div>
				<br/>
				<!--Purchased from-->
				<div class="row">
				<label for="Purchasedfrom" class="col-md-3"style="min-width:150px">Purchased From</label>
				<input type=text id="tbPurchasedfrom" list=Purchasedfrom class="col-md-6" style="min-width:150px" placeholder="Seller" required >
					<datalist id=Purchasedfrom>
						<?php 
							require_once("php/manageDBOps.php");
							$rows = FetchColumn("purchaseitems","purchasedfrom");
							foreach($rows as $row){
						?>
							
							<option value="<?php echo $row[0];?>"><?php }?>
					</datalist>
				</div>
				<br/>
				<!-- Purchase Date !--> 
				<div class="row">
					<label for="PurchaseDate" class="col-md-3" style="min-width:150px">Purchase Date</label>
					<input type="text"  id="tbPurchaseDate" class="col-md-6" placeholder="Select Date"  required>
				</div>
				<br/>
				<!-- Cost Price !-->
				<div class="row">
					<label for="CostPrice" class="col-md-3" style="min-width:150px">Cost Price</label>
					<input type="number" id="tbCostPrice"  class="col-md-6" placeholder="Cost Price" id="CostPrice" required>
				</div>
				<br/>
				<!-- Quantity !-->
				<div class="row">
					<label for="Quantity" class="col-md-3" style="min-width:150px">Quantity</label>
					<input type="number"  id="tbQuantity" class="col-md-6" placeholder="Quantity" id="Quantity" required>
				</div>
				<br/>
				
				<!-- selling price!-->
				<div class="row">
				<label for="SellingPrice" class="col-md-3" style="min-width:150px">Selling Price</label>
				<input type="text"  id="tbSellingPrice" class="col-md-6" placeholder="Selling Price" id="SellingPrice" required/>
				</div>
				<br/>
				<!-- discount!-->
				<div class="row">
				<label for="Discount" class="col-md-3" style="min-width:150px">Discount</label>
				<input type="text"  id="tbDiscount" class="col-md-6" placeholder="Discount" id="Discount" required/>
				</div>
				<br/>
				<!-- nick name!-->
				<div class="row">
				<label for="Nick Name" class="col-md-3" style="min-width:150px">Nick Name</label>
				<input type="text"  id="tbNickName" class="col-md-6" placeholder="Nick Name" id="NickName" required/>
				</div>
				<br/>
				<!-- submit -->
				<div class="row">
					<input class="btn btn-success col-md-2 col-md-offset-2" type="submit" value="Submit" id="purchasesubmit">
				</div>
			</form>
			</div>
		</div>
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