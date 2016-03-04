// app.js
!function() { // Immediately invoked function expression (IIFE)
	$(function() {
		$('body').on('click', '#startBtn', function(event) {
			event.preventDefault();
			tag = $('#searchTag').val();
			// tag must not be empty and can only contain letters and numbers
			if (tag != '' && !tag.match(/\W|_/)) {
				getImages(tag);
				console.log(tag);
				getSound();
			} else {
				alert('Please enter a tag to search for. Tags may only contain letters and numbers with no spaces.');
			}
		});
		$('body').on('click', '#stopBtn', function(event) {
			event.preventDefault();
			clearInterval(intervalID);
			// TODO: Stop the music too
		});
	});

	var tag = '';
	var clientID = '6734a9a21d4c47a39050e15a0487adc8';
	var intervalID = '';
	// initialize Soundcloud client with app credentials
	SC.initialize({
		client_id: 'ea1da5d568fd0336237e798e85d121f4',
	});

	var loadImages = function(igObject) {
		// empty the image id element
		$('#image').empty();
		$('#credit').empty();
		// load images into array
		var html = [];
		var credit = [];
		for (var i = 0; i < igObject.data.length; i++) {
			// Build HTML string to show image and link it to Instagram
			html[i] = '<a href="' + igObject.data[i].link + '" target="_blank">';
			html[i] += '<img src="' + igObject.data[i].images.standard_resolution.url + '" alt="' + igObject.data[i].caption.text + '" id="image' + i + '">';
			html[i] += '</a>'
			$(html[i]).appendTo('#image').hide();
			credit[i] = '<p>Photo by: ' + igObject.data[i].user.username + '</p>';
			$(credit[i]).appendTo('#credit').hide();
		}
		// Store the next_max_tag_id to get the next batch of images
		var nextBatchId = igObject.pagination.next_max_tag_id;
		showImages(html, nextBatchId);
	};

	var showImages = function(array, nextBatchId) {
		// showImages with 5 second delay between images
		var $images = $('#image a');
		var $credit = $('#credit p');
		var j = 0;
		$images.eq(j).fadeIn(2000);	// reveal the first image
		$credit.eq(j).fadeIn(2000);	// show the photo credit
		intervalID = setInterval(function() {
			// fadeOut the first image since it was loaded earlier
			$images.eq(j).fadeOut(2000);
			$credit.eq(j).fadeOut(2000);
			if(j < array.length - 1) {
				$images.eq(++j).fadeIn(2000);	// advance to next image and reveal it
				$credit.eq(j).fadeIn(2000);
			} else {
				getMoreImages(nextBatchId);
				clearInterval(intervalID);
			}
		}, 5000);

	};

	var getMoreImages = function(nextBatchId) {
		var endpoint = 'https://api.instagram.com/v1/tags/' + tag;
			endpoint += '/media/recent?client_id=' + clientID;
			endpoint += '&max_id=' + nextBatchId;
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
			type: "GET"
		})
		.done(function(response) {
			if (response.data.length > 0) {
				console.log(response);
				loadImages(response);
			} else {
				$('#searchTag').val(''); // empty the text box
				alert('Your tag returned no items. Please try another tag.');
			}
		})
		.fail(function(jqXHR, error, errorThrown){
			console.log(error);
		});
	};

	var getSound = function() {
		// Get track from Soundcloud
		// find all sounds of chill licensed under 'creative commons'
		SC.get('/tracks', { genres: 'chill', license: 'cc-by' }, function(tracks) {
		// SC.get('/playlists', { q: 'chill' }, function(tracks) {
			console.log(tracks);
			// $('#player').html(tracks[0].title);
			playSound(tracks);
		});
	};

	var playSound = function(tracks) {
		var randomSong = Math.floor(Math.random() * 9);
		SC.oEmbed(tracks[randomSong].permalink_url, {auto_play: false, maxheight: 166}, document.getElementById('player'));
		// SC.oEmbed(tracks[0].permalink_url, {auto_play: true, maxheight: 166}, document.getElementById('player'));
	};

}(); // Immediately invoked function expression (IIFE)
