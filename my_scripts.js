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


function getHashcode(problem_number)
{
	
try {
		var raw = httpGet('http://worldclockapi.com/api/json/utc/now');
		var data = JSON.parse(raw);
		var now = new Date(data.currentDateTime);
    console.log("Using server time: ", Math.round(now.getTime() / 1000))

	}
	catch (e)
{	
		var now = new Date();
    console.log("Using local time: ", Math.round(now.getTime() / 1000))
}
    return Math.log(Math.round(now.getTime() / 1000) * problem_number);

	
}


function CountDown(interval) {

    var countDownTime = new Date();
    countDownTime = new Date(countDownTime.getTime() + 1000 * interval);

// Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownTime - now;

        // Time calculations for days, hours, minutes and seconds
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = seconds + " секунд";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = " не осталось времени :(";
            document.getElementById("timeLeft").innerHTML = "Упс, ";
            window.isFinished = true;
            $("button").attr("disabled", true);
        }
    }, 100);

}

// show result for math task
function checkResult(input_value, task) {
        if (!window.isFinished) {
            var result = parseFloat(document.getElementById("answer").value);
            if (result == Math.log(Math.abs(12 * Math.sin(input_value)))) {
                var hashcode = getHashcode(task);
                alert("Поздравляю, вы справились! Вставьте это число в поле ответа на Stepik: " + hashcode);
            } else {
                alert("Неверный ответ!");
            }
        } else {
            alert("Время вышло!");
        }
}

// show result for math task
function checkTask2(input_value) {
    var task = 2;
    if (document.getElementById("robotsRules").checked) {
        checkResult(input_value, task);
    } else {
        alert("Роботы должны рулить!");
    }
}

// show result when timer done
function showResult(task) {

  if (!window.isFinished) {
    var hashcode = getHashcode(task);
    alert("Поздравляю, вы справились! Вставьте это число в поле ответа на Stepik: \n" + hashcode);
  }
  else {
    alert("Время вышло!");
  }
}