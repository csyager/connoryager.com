var today = new Date();
var time = today.getHours();
var greeting;

if (time < 12){
	greeting = "Good Morning!";
}
else if (time < 18){
	greeting = "Good Afternoon!";
}
else if (time <24){
	greeting = "Good Evening!";
}

document.write("<h1>" + greeting + "</h1>");