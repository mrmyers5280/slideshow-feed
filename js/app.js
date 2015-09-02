// app.js
$(function() {
	$( "#datepicker" ).datepicker();
	getImages('gigharbor');
});

var loadImages = function(igObject) {
	// empty the image id element
	// $('#image').empty();
	// load images into array
	var html = [];
	for (var i = 0; i < igObject.data.length; i++) {
		html[i] = '<img src="' + igObject.data[i].images.standard_resolution.url + '" alt="' + igObject.data[i].caption.text + '" id="image' + i + '">';
		$(html[i]).appendTo('#image').hide();
	}
	// showImages - TODO: move to it's own function
	var j = 0;
	$('#image img').eq(j).fadeIn(2000);
	var loop = setInterval(function() {
		if(j >= html.length) {
		clearInterval(loop);
		}
		$('#image img').eq(j).fadeOut(2000);
		$('#image img').eq(j).fadeIn(2000);
		j++;
		console.log('j = ' + j);
	}, 5000);

};

var getImages = function(tag) {
	var clientID = '6734a9a21d4c47a39050e15a0487adc8'
	var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + clientID;
	// var endpoint = 'https://api.instagram.com/v1/tags/gigharbor/media/recent?client_id=6734a9a21d4c47a39050e15a0487adc8';
	$.ajax({
		url: endpoint,
		dataType: "jsonp",
		cache: "false",
		type: "GET"
	})
	.done(function(response) {
		console.log(response);
		loadImages(response);
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};
// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};
