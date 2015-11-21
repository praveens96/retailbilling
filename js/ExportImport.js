$(function() {
    $( "#tabs" ).tabs();
	//http://www.sourcecodester.com/tutorials/php/6993/how-export-mysql-data-csvexcel-file-using-phpmysql.html
  });
  
$(document).on('click','#BtnExport',function(){
	// alert('export');
	var TimelineSelection = {};
	var DetailsSelection = '';
	var validDates = false;
	var FromDate = '';
	var ToDate = '';
	// alert("click"+this.value);
		$('input[name="timeline"]').each(function(){
			if($(this.checked).length != 0)
			{
				// TimelineSelection = this.value;
				chkBoxTimeline = this.value;
				if(chkBoxTimeline != 'All')
				{
					FromDate = $('#FromDate').val();
					ToDate = $('#ToDate').val();
					if(!FromDate || !ToDate)
					{
						alert("Select valid from and to dates");
					}
					else if(new Date(FromDate) > new Date($.now()))
					{
						alert("from date is greater than today's");
					}
					else if(new Date(ToDate) < new Date(FromDate))
					{
						alert("To date is lesser than from date");
					}
					else
					{
						validDates =true;
					}
				}
				else
				{
					validDates = true;
				}
			}
		});
		// alert("out of loop");
		if(validDates ) //|| chkBoxTimeline == 'All'
		{
			$('input[name="ExportDetails"]').each(function(){
			if($(this.checked).length != 0)
			{
				DetailsSelection = this.value;
			}
			
		});
		// alert("TimelineSelection:"+JSON.stringify(TimelineSelection)+" DetailsSelection"+DetailsSelection);
		TimelineSelection["FromDate"] =FromDate;
			TimelineSelection["ToDate"] = ToDate;
			// alert("req"+this.value);
			$("#loadeimg").show();
			$.ajax({
				url:'php/db.php',
				data:{operation:"ExportDetails",TimelineSelected:TimelineSelection,DetailsSelected:DetailsSelection},
				type:'POST',
				success:function(ExportSuccess){
					// alert("calback");
					//file written in php to C:/exports/
					console.log("ExportSuccess:"+JSON.stringify(ExportSuccess));
					$('#ExportImportStatus').css("display", "block");
					$("#loadeimg").hide();
					$('#ExportImportStatus').delay(15000).fadeOut('slow');
				}
			});
		}
	
});

$(document).ready(function(){
	$('input[name="timeline"]').click(function(){
		// alert(this.value);
		if(this.value == 'All')
		{
			$('input[type="date"]').attr('readonly',true);
			
		}
		else
		{
			$('input[type="date"]').attr('readonly',false);
		}
		// $('input[name="timeline"]').attr('checked',false);
		// alert('input[name="timeline"][value="'+this.value+'"]');
		$('input[name="timeline"][value="'+this.value+'"]').attr('checked',true);
		// $(this).attr('checked',true);
	});
	
	$('input[name="ExportDetails"]').click(function(){
		$('input[name="ExportDetails"][value="'+this.value+'"]').attr('checked',true);
	});
});