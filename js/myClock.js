$(document).ready(function()
{
   //alert("gn");
   setInterval('digiClock()', 1000);

});

function digiClock ( )
    {
	var WeekdayNames = ['SUN', 'MON','TUE', 'WED', 'THU', 'FRI', 'SAT'];
	var MonthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	
    var crTime = new Date ( );
    var crHrs = crTime.getHours ( );
    var crMns = crTime.getMinutes ( );
    var crScs = crTime.getSeconds ( );
    var crDate = crTime.getDay();
	var crMonthName = MonthNames[crTime.getMonth()];
	var crWeekdayName = WeekdayNames[crTime.getDay()];
	var crYear = crTime.getFullYear();
	//debugger
	//alert(crMonthName+crWeekdayName);
	crMns = ( crMns < 10 ? "0" : "" ) + crMns;
    crScs = ( crScs < 10 ? "0" : "" ) + crScs;
    var timeOfDay = ( crHrs < 12 ) ? "AM" : "PM";
    crHrs = ( crHrs > 12 ) ? crHrs - 12 : crHrs;
    crHrs = ( crHrs == 0 ) ? 12 : crHrs;
    
	var crDateStr = crWeekdayName+" "+crTime.getDate()+""+crMonthName+" "+crYear;
	//alert(crDateStr);
	var crTimeString = crHrs + ":" + crMns + ":" + crScs + " " + timeOfDay;
	$("#Today").html(crDateStr);
    $("#clock").html(crTimeString);

 }

