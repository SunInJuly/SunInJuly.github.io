function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
	return '';
}

function httpGet(theUrl)
{
    var res;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;

	
   
}


function GetResult()
{
	
try {
		var raw = httpGet('http://worldclockapi.com/api/json/utc/now');
		var data = JSON.parse(raw);
		var now = new Date(data.currentDateTime);
		console.log ("Using server time: ", now.getUTCHours())

	}
	catch (e)
{	
		var now = new Date();
		console.log ("Using local time: ", now.getUTCHours())
	}
	return Math.log(now.getUTCHours());

	
}

function CountDown(interval) {

    var countDownTime = new Date();
    countDownTime = new Date(countDownTime.getTime() + 1000 * interval);
    console.log(countDownTime);

// Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownTime - now;

        // Time calculations for days, hours, minutes and seconds
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "не осталось времени :(";
            document.getElementById("btn").disabled = true;

        }
    }, 100);

}