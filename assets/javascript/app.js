$( document ).ready(function() {

var topics = ["books", "movies", "food", "games", "cute boys", "sleeping"]

function renderButtons() {
	$("#topic_buttons").empty();	//empties out hTML element

	topics.forEach(function(item){	//iterates through each topic
		var topic = $('<button class="btn btn-primary btn-lg">' + item + '</button>'); //writes name to button
		$("#topic_buttons").append(topic);	//adds button
	}) //topics for each closed
}

function display_gifs (){
	$("#topic_gifs").empty();	//clears out img tags
	var topic_url ="http://api.giphy.com/v1/gifs/search?q=" + this.textContent  + "&limit=10" +"&api_key=dc6zaTOxFJmzC";  //whatever you clicked on, takes the text content and inserts into url
	$.ajax({ url: topic_url, method: "GET"}).done(function(response){
		for (var i=0; i < 10; i++){	//gets first ten images
			var gif = response.data[i].images.fixed_height_still.url;	
			$("#topic_gifs").append('<img class="gifs">');	//adds to topic_gifs div
			$("#topic_gifs").children().eq(i).attr("src", gif);	//sets source equal to earlier retrieved still image
			$("#topic_gifs").children().eq(i).attr("data-state", "still");	//makes current state a still imag
			$("#topic_gifs").children().eq(i).attr("data-still", gif);	//makes the data-still state equal to the current one
			$("#topic_gifs").children().eq(i).attr("data-animate", response.data[i].images.fixed_height.url);	//makes data-animate equal to moving gif
		}

	}) 
};

function play_gifs(){
	var state = $(this).attr("data-state");	//sets state equal to whatever it is, still or animate
	console.log(this);
	if (state === "still"){	//if gif isn't moving
		$(this).attr("src", $(this).data("animate"));	//changes source to moving gif
		$(this).attr("data-state", "animate");  	//updates data state
	}
	else {	//if gif IS moving
		$(this).attr("src", $(this).data("still"));	//fixes it to stop moving
		$(this).attr("data-state", "still");	
	}	
}

$("#add_topic").on("click", function(event){
	event.preventDefault();	//prevents it from refreshing page
	var new_topic = $("#topic_input").val().trim();	//take topic input, trims white space
	topics.push(new_topic);	//adds submitted text to buttons array
	renderButtons();	//calls function to display buttons
})	//submit button close

$(document).on("click", "button", display_gifs);	//if any topic gif is clicked
$(document).on("click", "img", play_gifs);	//if any gif is clicked
renderButtons(); 	


}); //document ready closed



