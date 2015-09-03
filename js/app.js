// app.js
!function() { // Immediately invoked function expression (IIFE)
	$(function() {
		// TODO: Get tag input from user here
		$('body').on('click', '#startBtn', function(event) {
			event.preventDefault();
			// $('input[name="tag"]').empty();
			tag = $('#searchTag').val();
			getImages(tag);
			console.log(tag);
		});
		// getImages(tag);
	});
	var tag = '';
	var clientID = '6734a9a21d4c47a39050e15a0487adc8';

	var loadImages = function(igObject) {
		// empty the image id element
		$('#image').empty();
		// load images into array
		var html = [];
		for (var i = 0; i < igObject.data.length; i++) {
			// TODO: Make images clickable - link to image on Instagram
			html[i] = '<img src="' + igObject.data[i].images.standard_resolution.url + '" alt="' + igObject.data[i].caption.text + '" id="image' + i + '">';
			$(html[i]).appendTo('#image').hide();
		}
		var nextBatchId = igObject.pagination.next_max_tag_id;
		showImages(html, nextBatchId);
	};

	var showImages = function(array, nextBatchId) {
		// showImages with 5 second delay between images
		var j = 0;
		$('#image img').eq(j).fadeIn(2000);	// reveal the first image and move j to the next image
		var loop = setInterval(function() {
			// skip the first image since it was loaded earlier
			$('#image img').eq(j).fadeOut(2000);
			if(j < array.length - 1) {
				$('#image img').eq(++j).fadeIn(2000);
			} else {
				getMoreImages(nextBatchId);
				clearInterval(loop);
			}
			console.log('j = ' + j + '; loop = ' + loop);
		}, 5000);

	};

	var getMoreImages = function(nextBatchId) {
		var endpoint = 'https://api.instagram.com/v1/tags/' + tag;
			endpoint += '/media/recent?client_id=' + clientID;
			endpoint += '&max_id=' + nextBatchId;
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
}(); // Immediately invoked function expression (IIFE)
