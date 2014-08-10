/**
* formatTimer
* Convert incomming seconds to a timer format
*
* @author Matt Carter <m@ttcarter.com>
*
*/
var zeroPad = function(no) {
	return (no < 10) ? '0' + no : no;
};
app.filter('formatTimer', function() {
	return function(value) {
		if (!value)
			return;
		var date = new Date(value);
		date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
		return (date.getHours() > 0 ? date.getHours() + ':' : '') + date.getMinutes() + ':' + zeroPad(date.getSeconds());
	};
});
