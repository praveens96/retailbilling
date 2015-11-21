<div id="SadhanaSalesTabs">
  <ul>
	<li><a href="#tabs-1">Standard</a></li>
	<li><a href="#tabs-2">Custom</a></li>
  </ul>
	<div id="tabs-1">
		
		<fieldset>
			<legend> Today's</legend>
				<div id="TodaysSalesDiv"></div>
			
		</fieldset>
		<fieldset>
			<legend> This Week</legend>
				<div id="ThisWeekSalesDiv"></div>
			
		</fieldset>		
		<fieldset>
			<legend> This Month</legend>
				<div id="ThisMonthSalesDiv"></div>
			
		</fieldset>
	</div>

	<div id="tabs-2">
		<fieldset>
			<legend>Find Sales betweeen dates</legend>
			From <input type="date" id="FromDate"> To <input type="date" id="ToDate"> <input type="button" class="btn btn-success" value="Show" id="btnCustomSales">
			<div id="CustomSalesReportDiv"></div>
		</fieldset>
	</div>

</div>