// app.js
!function() { // Immediately invoked function expression (IIFE)
	$(function() {
		$('body').on('click', '#startBtn', function(event) {
			event.preventDefault();
			tag = $('#searchTag').val();
			if (tag != '') {
				getImages(tag);
				console.log(tag);
			} else {
				alert('Please enter a tag to search for.');
			}
		});
		$('body').on('click', '#stopBtn', function(event) {
			event.preventDefault();
			clearInterval(intervalID);
		});
	});

	var tag = '';
	var clientID = '6734a9a21d4c47a39050e15a0487adc8';
	var intervalID = '';
	var imageImg = $('#image a'); // this fails, why? eq?

	var loadImages = function(igObject) {
		// empty the image id element
		$('#image').empty();
		// load images into array
		var html = [];
		for (var i = 0; i < igObject.data.length; i++) {
			// Build HTML string to show image and link it to Instagram
			html[i] = '<a href="' + igObject.data[i].link + '" target="_blank">';
			html[i] += '<img src="' + igObject.data[i].images.standard_resolution.url + '" alt="' + igObject.data[i].caption.text + '" id="image' + i + '">';
			html[i] += '</a>'
			$(html[i]).appendTo('#image').hide();
		}
		// Store the next_max_tag_id to get the next batch of images
		var nextBatchId = igObject.pagination.next_max_tag_id;
		showImages(html, nextBatchId);
	};

	var showImages = function(array, nextBatchId) {
		// showImages with 5 second delay between images
		var j = 0;
		$('#image a').eq(j).fadeIn(2000);	// reveal the first image
		intervalID = setInterval(function() {
			// fadeOut the first image since it was loaded earlier
			$('#image a').eq(j).fadeOut(2000);
			if(j < array.length - 1) {
				$('#image a').eq(++j).fadeIn(2000);	// advance to next image and reveal it
			} else {
				getMoreImages(nextBatchId);
				clearInterval(intervalID);
			}
			console.log('j = ' + j + '; intervalID = ' + intervalID);
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
