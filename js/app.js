// app.js
$(function() {
	$( "#datepicker" ).datepicker();
	// var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=6734a9a21d4c47a39050e15a0487adc8';
	var endpoint = 'https://api.instagram.com/v1/tags/gigharbor/media/recent?client_id=6734a9a21d4c47a39050e15a0487adc8';
	$.ajax({
		url: endpoint,
		dataType: "jsonp",
		cache: "false",
		type: "GET"
	})
	.done(function(response) {
		console.log(response);
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
	// takes error string and turns it into displayable DOM element
	var showError = function(error){
		var errorElem = $('.templates .error').clone();
		var errorText = '<p>' + error + '</p>';
		errorElem.append(errorText);
	};
  });
