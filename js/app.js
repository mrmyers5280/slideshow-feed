// app.js
$(function() {
	$( "#datepicker" ).datepicker();
	getImages(tag);
});
var tag = 'gigharbor';
var clientID = '6734a9a21d4c47a39050e15a0487adc8';

var loadImages = function(igObject) {
	// empty the image id element
	$('#image').empty();
	// load images into array
	var html = [];
	for (var i = 0; i < igObject.data.length; i++) {
		html[i] = '<img src="' + igObject.data[i].images.standard_resolution.url + '" alt="' + igObject.data[i].caption.text + '" id="image' + i + '">';
		$(html[i]).appendTo('#image').hide();
	}
	showImages(html, igObject);
};

var showImages = function(array, igObject) {
	// showImages with 5 second delay between images
	var j = 0;
	$('#image img').eq(j).fadeIn(2000);	// reveal the first image
	var loop = setInterval(function() {
		if(j >= array.length) {
			getMoreImages(tag);
			clearInterval(loop);
		}
		// skip the first image since it was loaded earlier
		if (j > 0) {
			$('#image img').eq(j).fadeOut(2000);
			$('#image img').eq(j).fadeIn(2000);
		}
		j++;
		console.log('j = ' + j + '; loop = ' + loop);
	}, 5000);

};

var getMoreImages = function(tag) {
	var endpoint = 'https://api.instagram.com/v1/tags/' + tag;
		endpoint += '/media/recent?client_id=' + clientID;
		endpoint += '&max_id=' + '1064953093328255764';
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
		console.log(error);
	});
};

var getImages = function(tag) {
	var endpoint = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=' + clientID;
	// var endpoint = 'https://api.instagram.com/v1/tags/gigharbor/media/recent?client_id=6734a9a21d4c47a39050e15a0487adc8';
	$.ajax({
		url: endpoint,
		dataType: "jsonp",
		cache: "false",
		type: "GET",
		data: { count: 5 }
	})
	.done(function(response) {
		console.log(response);
		loadImages(response);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});
};
