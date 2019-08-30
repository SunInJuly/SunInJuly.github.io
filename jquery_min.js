var input_value;

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


function countDown(interval) {

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
        document.getElementById("countdown").innerHTML = seconds + " seconds";

        // If the count down is finished, write some text
        if (distance < 0) {

            clearInterval(x);
            document.getElementById("countdown").innerHTML = " time is up :(";
            document.getElementById("timeLeft").innerHTML = "Oops, ";
            window.isFinished = true;
            $("button").attr("disabled", true);
        }
    }, 100);
}

// check answer for math task
function checkAnswer(input_value, task_number) {
    if (!window.isFinished) {
        var result = parseFloat(document.getElementById("answer").value);
        // var inputValue = document.getElementById("input_value").innerHTML;
        console.log(result);
        // if (Math.abs(result - Math.log(Math.abs(12 * Math.sin(inputValue)))) <= 1e-13) {
        if (Math.abs(result - Math.log(Math.abs(12 * Math.sin(input_value)))) <= 1e-11) {
            var hashcode = getHashcode(task_number);
            alert("Congrats, you've passed the task! Copy this code as the answer to Stepik quiz: " + hashcode);
        } else {
            alert("Wrong answer!");
        }
    } else {
        alert("Time is up!");
    }
}

function checkPrice() {
    const price = document.getElementById("price").innerHTML;
    if (price.toString() === "$100") {
        document.getElementById("solve").disabled = false;
        startTimer();
    } else {
        alert("You failed to rent your dream home :( Try again.");
        window.location.reload();
    }
}

// show result for math related tasks
function checkTask(input_value, task) {
    if (document.getElementById("robotsRule").checked) {
        checkAnswer(input_value, task);
    } else {
        alert("Robots should rule!");
    }
}

function checkSelectTask(number1, number2) {
    select = document.getElementById('dropdown')
    var value = select.options[select.selectedIndex].value;
    if (!window.isFinished) {
        if (number1 + number2 == value) {
            var hashcode = getHashcode(2203);
            alert("Congrats, you've passed the task! Copy this code as the answer for Stepik quiz: " + hashcode);
        } else {
            alert("You chose wrong number in the list, try again.");
        }
    } else {
        alert("Time is up!");
    }
}

// show result when timer done
function showResult(task) {
    var warnings = ["Time is up!", "You are tenacious! Please, fill out the form using a script, not hands!"];
    var randomWarning = warnings[Math.floor(Math.random()*warnings.length)];
    if (!window.isFinished) {
        var hashcode = getHashcode(task);
        alert("Congrats, you've passed the task! Copy this code as the answer for Stepik quiz: " + hashcode);
    }
    else {
        alert(randomWarning);
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// change price for explicit wait task
function startAuction() {
    // change price every 500ms
    let cost = Math.floor(Math.random() * 5) * 10 + 110;
    let x = setInterval(function () {
        cost = cost - 5;
        if (cost < 95) {
            document.getElementById("book").disabled = true;
        }
        else {
            document.getElementById("price").innerHTML =  + "$" + cost.toString();
        }
    }, 1000);

    setTimeout(function () {
        clearInterval(x);
    }, 15000);
}

// start anticapcha for explicit wait task
function startTimer() {
    let form = document.getElementsByTagName("form");
    form[0].style.display = "block";
    input_value = Math.floor(Math.random() * 1000) + 1;
    document.getElementById("input_value").innerHTML = input_value;
    var isFinished = false;
    countDown(3);
}

// implicit wait
function add_elts() {
  var form_elt = document.querySelector('form');
  var group_elt0 = document.querySelector('form div:nth-child(1)');
  var input_elt0 = document.createElement('input');
  input_elt0.className = "form-control";
  input_elt0.type = "text";
  input_elt0.name = "first_name";
  input_elt0.required = true;
  input_elt0.maxlength = "32";
  input_elt0.placeholder = "Enter your first name";
  group_elt0.appendChild(input_elt0);
  var group_elt1 = document.querySelector('form div:nth-child(2)');
  var input_elt1 = document.createElement('input');
  input_elt1.className = "form-control";
  input_elt1.type = "text";
  input_elt1.name = "last_name";
  input_elt1.required = true;
  input_elt1.maxlength = "32";
  input_elt1.placeholder = "Enter your last name";
  group_elt1.appendChild(input_elt1);
  var group_elt2 = document.querySelector('form div:nth-child(3)');
  var input_elt2 = document.createElement('input');
  input_elt2.className = "form-control";
  input_elt2.type = "text";
  input_elt2.name = "city";
  input_elt2.required = true;
  input_elt2.maxlength = "32";
  input_elt2.placeholder = "Enter your city";
  group_elt2.appendChild(input_elt2);
  var button = document.createElement('button');
  button.className="btn btn-primary";
  button.type="submit";
  button.innerHTML="Submit";
  form_elt.appendChild(button);
  var isFinished = false;
  countDown(2);
};

// explicit wait
function enable_button() {
  var show_elt = document.querySelector("#show-button");
  show_elt.disabled = false;
}

function create_form() {
  var container_elt = document.querySelector(".container");
  var form_elt = document.createElement('form');
  form_elt.action = "#";
  form_elt.method = "get";
  form_elt.setAttribute("onsubmit", "showResult(12);");
  form_elt.style = "margin-top: 50px;";
  container_elt.appendChild(form_elt);

  // create first group
  var group1 = document.createElement('div');
  group1.className = "form-group";
  form_elt.appendChild(group1);

  var label1 = document.createElement('label');
  label1.innerHTML = "First name:*";
  label1.setAttribute("for", "first_name");
  group1.appendChild(label1);

  var input1 = document.createElement('input');
  group1.appendChild(input1);
  input1.setAttribute("class", "form-control");
  input1.setAttribute("id", "first_name");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", "first_name");
  input1.setAttribute("required", "true");
  input1.setAttribute("maxlength", "32");
  input1.setAttribute("placeholder", "Enter your first name");

  // create second group
  var group2 = document.createElement('div');
  group2.className = "form-group";
  form_elt.appendChild(group2);
  var group2_elt = document.querySelector("form .form-group:nth-child(2)");

  var label2 = document.createElement('label');
  label2.innerHTML = "Last name:*";
  label2.setAttribute("for", "last_name");
  group2_elt.appendChild(label2);

  var input2 = document.createElement('input');
  input2.className = "form-control";
  input2.type = "text";
  input2.name = "last_name";
  input2.required = true;
  input2.maxlength = "32";
  input2.placeholder = "Enter your last name";
  group2_elt.appendChild(input2);


  var button = document.createElement('button');
  button.className="btn btn-default";
  button.type="submit";
  button.innerHTML="Submit";
  form_elt.appendChild(button);
  var isFinished = false;
  countDown(1);
};
