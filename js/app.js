// app.js
$(function() {
	$( "#datepicker" ).datepicker();
	getImages('gigharbor');
});

var showImages = function(igObject) {
	// empty the image id element
	$('#image').empty();
	// show a new image
	var html = '<img src="' + igObject.data[0].images.standard_resolution.url + '" alt="' + igObject.data[0].caption.text + '">';
	$('#image').append(html)
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
		showImages(response);
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
