$( document ).ready(function() {


var topics = ["books", "movies", "food", "games", "cute boys", "sleeping"]

topics.forEach(function(item){
	var topic = $('<button class="btn btn-primary btn-lg">' + item + '</button>');
	$("#topic_buttons").append(topic);
}) //topics for each closed


var gif_still, gif_animated;
$("button").click(function() {
	var topic_url ="http://api.giphy.com/v1/gifs/search?q=" + this.textContent  + "&limit=10" +"&api_key=dc6zaTOxFJmzC";  
	$.ajax({ url: topic_url, method: "GET"}).done(function(response){
		for (var i=0; i < 10; i++){
			gif_still = response.data[i].images.fixed_height_still.url;
			console.log(gif_still);
			$("#topic_gifs").append('<img class="still_gifs" />');
			$("#topic_gifs").children.eq(i).attr("src", gif_still);
		//	$("#topic_gifs").children.eq(i).attr("value", i);
		}
	}) 
});

$(".still_gifs").click(function(){
//	$(this).attr("src", )
	console.log(this.val);
})	//still_gifs click close 



}); //document ready closed


// The public beta key is "dc6zaTOxFJmzC”


//help with playing/stopping gifs: http://stackoverflow.com/questions/5818003/stop-a-gif-animation-onload-on-mouseover-start-the-activation