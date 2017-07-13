
var authKey = require("./keys.js")
var inquirer = require("inquirer")
var fs = require("fs");
var userCommand;
var userChoice;

inquirer.prompt([
	{
		type: "list",
		message: "What Would you like to do?",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
		name: "yourChoice"
	},
	{
		type: "input",
		message: "Search Movie/Song, Leave Blank if You are viewing tweets",
		name: "confirm",
		default: true
	}

		])

		.then(function(inquirerResponse) {
			userCommand = inquirerResponse.yourChoice;
			userChoice =  inquirerResponse.confirm;
			choices();


		});

		function choices (){
			switch(userCommand){
				case "my-tweets":
				tweets();
				break;
				case "spotify-this-song":
				spotifySong();
				break;
				case "movie-this":
				omdb();
				break;
        case "do-what-it-says":
        doThis();
        break;



			}
		}

//used to grab twitter keys
var command = process.argv[2]

function omdb () {

var request = require('request');

var movieName = userChoice;

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&apikey=40e9cece";

var options = {
  url: queryUrl
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("Title: " + info.Title);
    console.log("Release Year: " + info.Year);
    console.log("IMDB Rating: " + info.imdbRating);
    console.log("Rotten Tomatoes Rating: " + info.imdbRating);
    console.log("Country: " + info.Country);
    console.log("Language: " + info.Language);
    console.log("Plot: " + info.Plot);
    console.log('hello');
    //console.log(info.forks_count + " Forks");
  }
}

request(options, callback);
}

function tweets() {

var Twitter = require('twitter');

var client = new Twitter(authKey.twitterKeys);

var params = {screen_name: 'EFRED321'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		tweet = tweets[i]['text'];
  		tTime = tweets[i]['created_at'];
  		tUser = tweets[i].user['name'];
  		console.log('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ')
  		console.log(tUser);
  		console.log(tTime);
  		console.log(tweet);
  	}
    
  }
});
console.log('this is loaded');

}

function spotifySong () {
    
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "2532eb8170bf42d4bf2725054cc1e6c0",
  secret: "e2538c827e8c495fbfac4aba86f52f84"
});

spotify.search({ type: 'track', query: userChoice, limit:1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _")
 console.log("Song Name: " + data.tracks.items[0].name);
 console.log("Artists Name: " + data.tracks.items[0].album.artists[0].name);
 console.log("Album Name: " + data.tracks.items[0].album.name);
 console.log(data.tracks.items[0].external_urls);
 console.log("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _")
});

    }

function doThis () {
    
    fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  userChoice = data;
  spotifySong();

  });
    }

   