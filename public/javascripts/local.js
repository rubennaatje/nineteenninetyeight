/**
 * Created by ruben on 19/10/2016.
 */


var minutes =0.1 , the_interval = minutes * 60 * 1000;
setInterval(function() {
    console.log("I am doing my 5 minutes check");
    document.getElementById("test").src="/images/lol.jpg?" + new Date().getTime();
}, the_interval);