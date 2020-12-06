import React from 'react';
import Button from '../elements/Button';
import $ from 'jquery';
import { create } from 'underscore';
window.jQuery = window.$ = require ('jquery');


var g_access_token = '';
var g_name = 'playlist not saved yet'
var g_username = '';
var g_tracks = [];

function getUsername(callback) {
	console.log('getUsername');
	var url = 'https://api.spotify.com/v1/me';
	$.ajax(url, {
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + g_access_token
		},
		success: function(r) {
			console.log('got username response', r);
			callback(r.id);
		},
		error: function(r) {
			callback(null);
		}
	});
}

function createPlaylist(username, name, callback) {
	console.log('createPlaylist', username, name);
	var url = 'https://api.spotify.com/v1/users/' + username + '/playlists';
	$.ajax(url, {
		method: 'POST',
		data: JSON.stringify({
			'name': name,
			'public': false
		}),
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + g_access_token,
			'Content-Type': 'application/json'
		},
		success: function(r) {
			console.log('create playlist response', r);
			callback(r.id);
		},
		error: function(r) {
            console.log(r);
			callback(null);
		}
	});
}

function addTracksToPlaylist(username, playlist, tracks, callback) {
	console.log('addTracksToPlaylist', username, playlist, tracks);
	var url = 'https://api.spotify.com/v1/users/' + username +
		'/playlists/' + playlist +
		'/tracks'; // ?uris='+encodeURIComponent(tracks.join(','));
	$.ajax(url, {
		method: 'POST',
		data: JSON.stringify(tracks),
		dataType: 'json',
		headers: {
			'Authorization': 'Bearer ' + g_access_token,
			'Content-Type': 'application/json'
		},
		success: function(r) {
			console.log('add track response', r);
			callback(r.id);
		},
		error: function(r) {
			callback(null);
		}
	});
}

function doit() {
  // parse hash

  var hash = window.location.hash.replace(/#/g, '');
  console.log(hash);
	var all = hash.split('&');
	var args = {};
	console.log('all', all);
	all.forEach(function(keyvalue) {
		var idx = keyvalue.indexOf('=');
		var key = keyvalue.substring(0, idx);
		var val = keyvalue.substring(idx + 1);
		args[key] = val;
	});


g_name = "my anti-racist playlist <3"
	var g_tracks =[
]

	g_tracks = ['spotify:track:0HB9QK0Eraem2k4JmR6ZWs',
		'spotify:track:3f42pE8qk77OFz6blNNVEP',
		'spotify:track:5kRBzRZmZTXVg8okC7SJFZ',
		'spotify:track:7z4mcKCYFPgqFeYS5mNyTB',
		'spotify:track:5GUZfJ58XYGTMrnciBF0Xr',
		'spotify:track:249gnXrbfmV8NG6jTEMSwD',
		'spotify:track:0AiTIiCQ15NW8QHQwSxKuR'
		 ]

	console.log('got args', args);

	if (typeof(args['access_token']) != 'undefined') {
		// got access token
		console.log('got access token', args['access_token']);
		g_access_token = args['access_token'];
	}

	getUsername(function(username) {
		console.log('got username, creating playlist', username, g_name);
		createPlaylist(username, g_name, function(playlist) {
			console.log('created playlist', playlist);
            $('#creating').hide();
            if (playlist) {
                addTracksToPlaylist(username, playlist, g_tracks, function() {
                    console.log('tracks added.');
                    $('#playlistlink').attr('href', 'spotify:user:'+username+':playlist:'+playlist);
                    $("#title").text(g_name);
                    $('#done').show();
                });
            } else {
                $("#error").show();
            }
		});
	});
}

function savePlaylist(){
  doit();
  return (
    <body>
    <div class="container site-wrapper">
    <div class="site-wrapper-inner">
      <div id="creating">
        <h1>Creating playlist...</h1>
      </div>
      <div id="done">
        <h1 class='text-success' >Done!</h1>
        <div id='info'> Playlist saved as: <div id="title" class="text-info"> </div></div>
        <p>
          <a class="btn btn-lg btn-primary btn-success" id="playlistlink">
            Open playlist in Spotify
          </a>
        </p>
      </div>
      <div id="error">
        <h1 class='text-warning' >Trouble!</h1>
        <div id='einfo'> Trouble saving that playlist.</div>
      </div>
    </div>
  </div>
  </body>
  )
}



const Home = () => {
doit();

  return (    
<>

    <div class="container site-wrapper">
    <div class="site-wrapper-inner">
  
      <div id="done">
        <div id='info'> Playlist saved as: <div id="title" class="text-info"> </div></div>
        <p>
          <a class="btn btn-lg btn-primary btn-success" id="playlistlink">
            Open playlist in Spotify
          </a>
        </p>
      </div>
    </div>
  </div>
      <script src="https://sp-bootstrap.global.ssl.fastly.net/8.2.0/sp-bootstrap.min.js"></script>
</>
  ) ;
}

export default Home; 
