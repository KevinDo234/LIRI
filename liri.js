var fs = require('fs')
var twitterKeys = require('./keys.js')
var twitter = require('twitter')
var Spotify = require('node-spotify-api')
var omdb = require('omdb');
var command = process.argv[2]

//<----Twitter Code---->//
var client = new twitter(twitterKeys);
function myTweets(){
	var params = {screen_name: 'AnotherHWBot', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (i=0; i<tweets.length; i++) {
				var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
				console.log(returnedData);
				console.log("-------------------------");
			}
		};
	});
}
//<----Spotify Code---->//
var spotify = new Spotify({
	id: '4d28ae0a20ad46248d078d246dc056f0',
	secret: 'a8392127d17745d7ba0beb679beeae9d'
});

function spotifySong(){
	spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		for (i = 0; i < data.tracks.items.length; i++){
			console.log(data.tracks.items[i].name);
		};
	});
};
//<----OMDB Code---->//
function movie(){
	omdb.search(process.argv[3], function(err, movies) {
		if(err) {
			return console.error(err);
		}

		if (movies.length < 1) {
			return console.log('No movies were found!');
		}

		movies.forEach(function(movie) {
			console.log('%s (%d)', movie.title, movie.year);
		});
	});
	omdb.get({ title: process.argv[3]}, true, function(err, movie) {
		if(err) {
			return console.error(err);
		}

		if (!movie) {
			return console.log('Movie not found!');
		}

		console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
		console.log(movie.plot);
	});
};
//<----Do What It Says Code---->//
function doThis(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){
			console.log(err)
		}else {
			console.log(data)
		};
	});
};
switch(command) {
	case 'myTweets':
	myTweets();
	break;

	case 'spotify-this-song':
	spotifySong();
	break;

	case 'movie-this':
	movie();
	break;

	case 'do-what-it-says':
	doThis();
	break;
}