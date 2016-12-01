$( document ).ready(function() {

var topics = ["books", "movies", "food", "games", "cute boys", "sleeping"]

function renderButtons() {
	$("#topic_buttons").empty();

	topics.forEach(function(item){
		var topic = $('<button class="btn btn-primary btn-lg">' + item + '</button>');
		$("#topic_buttons").append(topic);
	}) //topics for each closed
}

function display_gifs (){
	var topic_url ="http://api.giphy.com/v1/gifs/search?q=" + this.textContent  + "&limit=10" +"&api_key=dc6zaTOxFJmzC";  
	$.ajax({ url: topic_url, method: "GET"}).done(function(response){
		for (var i=0; i < 10; i++){
			var gif_still = response.data[i].images.fixed_height_still.url;
			console.log(gif_still);
			$("#topic_gifs").append('<img class="still_gifs" />');
			$("#topic_gifs").children().eq(i).attr("src", gif_still);
			$("#topic_gifs").children().eq(i).attr("value", i);
		}

		$("#topic_gifs").on("click", ".still_gifs", function() {
			$(this).attr("src", response.data[this.getAttribute('value')].images.fixed_height.url);
			console.log(this.getAttribute('value')); //THIS IS THE ONLY ONE THAT WORKS
		})	//still_gifs click close 
	}) 
};
//can do if an iff statement... if it equals moving one, changed to fix one.. etc

$("#add_topic").on("click", function(event){
	event.preventDefault();
	var new_topic = $("#topic_input").val().trim();
	topics.push(new_topic);
	// NEED NEW FUNCTION TO RENDER BUTTONS!!!!
	renderButtons();
})	//submit button close

$(document).on("click", "button", display_gifs);

renderButtons();


}); //document ready closed


// The public beta key is "dc6zaTOxFJmzC”


//help with playing/stopping gifs: http://stackoverflow.com/questions/5818003/stop-a-gif-animation-onload-on-mouseover-start-the-activation