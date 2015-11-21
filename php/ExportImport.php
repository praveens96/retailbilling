<div id="tabs">
  <ul>
	<li><a href="#tabs-1">Export</a></li>
	<li><a href="#tabs-2">Import</a></li>
  </ul>
	<div id="tabs-1">
		
		<fieldset>
			<legend> Timeline</legend>
			<input type="radio" name="timeline" value="BetweenDates" checked>Between Dates</input>
			<input type="radio" name="timeline" value="All">All</input>
			<br/>
			From <input type="date" id="FromDate"> To <input type="date" id="ToDate">
		</fieldset>
		<fieldset>
			<legend>Details</legend>
			<input type="radio" name="ExportDetails" value="BillDetails" checked>Bill Details</input>
			<input type="radio" name="ExportDetails" value="PurchaseDetails">Purchase Details</input>
			<!--<input type="radio" name="ExportDetails" value="AvailabilityReport">Availability Report</input>-->
		</fieldset>
		
		<input type="button" class="btn btn-success  col-md-offset-2" value="Export" id="BtnExport"/>
		<br/>
		<div id="ExportImportStatus" style="display:none;font-weight:bold;color:green">Successfully Exported to C:\Exports\</div>
		<!--http://www.sourcecodester.com/tutorials/php/6993/how-export-mysql-data-csvexcel-file-using-phpmysql.html-->
	
	</div>
	<div id="tabs-2">
		<input type="button" value="Import" id="BtnImport"/>
	</div>

</div>