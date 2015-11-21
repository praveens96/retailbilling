<div id="BillManagerBody">
	<form name="BillManagerForm">
		<div class="row">
			<label for="BillNum" class="col-md-3" style="min-width:150px">Bill Number </label>
			<input type=number id="tbBillNum" class="col-md-6" placeholder="Bill No" required/>
		</div>
		<br/>
		<!-- submit -->
		<div class="row">
			<input class="col-md-2 col-md-offset-3 btn btn-success" type="submit" value="Submit" id="BillMgrSubmit">
		</div>
	</form>
	<div class="row">
			<label for="TaxPer" class="col-md-3" >Tax Percentage </label>
			<span id="TaxPer" class="col-md-3" ></span>
	</div>
	<div class="row">
		<table id="QueryBillDetails">	</table>
		<table id="QueryBillItemDetails">	</table>
	</div>
	<br/>
	<div class="row">
			<input class="col-md-2 col-md-offset-3 btn btn-success" type="submit" value="Save Changes" id="BillEditSubmit">
		</div>
</div >
<!-- <script src="js/BillManager.js"></script> -->