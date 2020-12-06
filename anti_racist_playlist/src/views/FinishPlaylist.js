import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../utils/SectionProps';
import Test from '../components/sections/GenericSection';
import Routes from './../utils/Routes';
import Button from './../components/elements/Button';
import ButtonGroup from './../components/elements/ButtonGroup';
import Input from './../components/elements/Input';
import FormLabel from './../components/elements/FormLabel';
import $ from 'jquery';
import {
    Stitch,
    UserPasswordCredential,
    RemoteMongoClient
  } from "mongodb-stitch-browser-sdk";
import { forEach } from 'lodash';
window.jQuery = window.$ = require('jquery');

const _ = require("underscore");

const propTypes = {
  children: PropTypes.node,
  ...SectionProps.types
}

const defaultProps = {
  children: null,
  ...SectionProps.defaults
}

const GenericSection = ({
  className,
  children,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const appId = 'antiracistplaylist-qvlud';

  // Get a client for your Stitch app, or instantiate a new one
  const stitchClient = Stitch.hasAppClient(appId)
    ? Stitch.getAppClient(appId)
    : Stitch.initializeDefaultAppClient(appId);

    login('katherine.barbano@duke.edu', 'HackDuke2020').then(() => {
      // Initialize a MongoDB Service Client
      const mongodb = stitchClient.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
      // Get a hook to the employees collection
      const contacts = mongodb.db('createdPlaylistsDatabase').collection('unfinishedPlaylistsCollection');
      

      //TODO:make this specific to the account
      return contacts.find({}, {
        // limit: 3,
        // sort: { 'salary': -1 }
      })
        .asArray();
    })
      .then(displayContacts)

      // Renders the the contacts' information in the table
      function displayContacts(contacts) {
        const contactsTableBody = document.getElementById('contacts');
        const tableRows = contacts.map(contact => {
          return `
            <tr>
              <td>${contact.sender}</td>
            </tr>
          `;
        });
        contactsTableBody.innerHTML = tableRows.join('');
      }
  
    function testClick(name) {
      alert("Clicked" + name);
    }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
    
        <div className={innerClasses}>
          <h1> Finish a playlist here</h1>

          <h5>You have a playlist generation request from these friends</h5>
          <table class='table table-striped'>
            <thead class='thead'>
                <tr>
                    <th>Sender</th>
                </tr>
            </thead>
            <tbody id='contacts' onClick = {() => testClick(document.getElementById('contacts'))}></tbody>
            </table>
      
        {/* <label for='last_name' id="dest" > Select a second artist</label>
        <Input class='form-control' name='last_name'/> */}
        <label for='friend'>Choose last artist: </label>
        <Input for='second name' id = "dest"></Input> 
          {children}
          <ButtonGroup>
          <Button tag="a" color="primary"  wideMobile variant="btn btn-success" onClick={() => clickGo($("#dest").val())}>
                    Generate Songs! 
                    </Button>
          <Button class="btn btn-info btn-sm" type="button"  onClick={() => savePlaylist()}>  Save this playlist</Button>
          </ButtonGroup>
 
          
        </div>
        <Test />
      </div>
      <div class='input-form'>
         {/* <label for='first_name' id="source" > First Artist:</label>
        <input class='input-form' name='first_name'></input>
        <label for='last_name' id="dest" > Second Artists:</label>
        <input class='input-form' name='last_name'></input>  */}
         {/* <Input for='first_name' id="source" > First Artist:</Input>
        <Input for='second name' id = "dest"> Second Artist:</Input> 
        <div id="xbuttons">
                <Button class="btn btn-info btn-sm" id='save' type="button"  onClick= {() => savePlaylist()}>  Extra Button </Button>
                 </div> */}
         </div>


     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script> 
    <script>
  window.jQuery = window.$ = require('jquery');
</script>
    </section>
  );
}

GenericSection.propTypes = propTypes;
GenericSection.defaultProps = defaultProps;

export default GenericSection;

window.jQuery.ajaxSettings.traditional = true; 
var skipList = [];
var curArtistPath = [];
var curArtist = null;
var trackTemplate = _.template($("#track-template").text());
var notrackTemplate = _.template($("#no-track-template").text());
var audio = $("<audio>");
var url_prefix = "http://smarterplaylists.playlistmachinery.com/frog/";
var url_prefix = "http://frog.playlistmachinery.com:4682/frog/";


function randomChoice(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function randomIndex(list) {
    return Math.floor(Math.random() * list.length);
}

function clearSkips() {
    skipList = [];
}

function scoreTrackList(list) {
    var maxDelta = 0;
    var maxIndex = 0;
    var lastEnergy = -1;
    for (var i = 0; i < list.length; i++) {
        var which = list[i];
        var tracks = curArtistPath[i].tracks;
        if (tracks.length > 0) {
            var track = tracks[which];
            var energy = track.energy;
            if (lastEnergy >= 0) {
                var delta = Math.abs(energy - lastEnergy);
                if (delta > maxDelta) {
                    maxDelta = delta;
                    maxIndex = i;
                }
            }
            lastEnergy = energy;
        }
    }
    return [maxDelta, maxIndex];
}

function randomizePlaylist() {
    var indicies = [];

    for (var i = 0; i < curArtistPath.length; i++) {
        var tracks = curArtistPath[i].tracks;
        var index = Math.floor(Math.random() * tracks.length);
        indicies.push(index);
    }
    return indicies;
}


function applyIndicies(indicies) {
    for (var i = 0; i < curArtistPath.length; i++) {
        var artist = curArtistPath[i];
        artist.curTrack = indicies[i];
    }
}

function directedEnergyMinimizer(indicies) {

    var done = false;
    var bestList = indicies.slice(0);

    var score_and_index = scoreTrackList(indicies);
    while (!done) {
        done = true;

        var score = score_and_index[0];
        var index = score_and_index[1];

        var artist = curArtistPath[index];
        for (var i = 0; i < artist.tracks.length; i++) {
            indicies[index] = i;

            score_and_index = scoreTrackList(indicies);
            var newScore = score_and_index[0];
            if (newScore < score) {
                done = false;
                bestList = indicies.slice(0);
                break;
            }
        }
    }
    return bestList;
}

function randomEnergyMinimizer() {
    var bestScore = 1;
    var bestList = null;
    var tries = 100000;

    for (var i = 0; i < tries; i++) {
        var indicies = randomizePlaylist();
        var score_and_index = scoreTrackList(indicies);
        var score = score_and_index[0];
        if (score < bestScore) {
            bestScore = score;
            bestList = indicies;
        }
    }
    bestList = directedEnergyMinimizer(bestList);
    var finalScore = scoreTrackList(bestList)[0];
    return bestList;
}

function minimizeEnergyChange() {
    var indicies = randomEnergyMinimizer();
    applyIndicies(indicies);
}

function generatePath() {
    var source = $("#source").val();
    var dest = $("#dest").val();
    source = "Weezer";
    dest = "LadyGaga";
    if (dest.length === 0) {
        fetchSims(source);
    } else {
        fetchPath(source, dest);
    }
}

function addBypassClick(elem, artist) {
    elem.click(function(e) { 
        skipList.push(artist.id);
        generatePath();
        ga_track('frog', 'bypass',  artist.name);
    });
}

function removeFromList(list, item) {
    var index = list.indexOf(item);
    if  (index >= 0) {
        list.splice(index, 1);
    }
}


function getNoPlayer(artist, allowBypass) {
    var el = $(notrackTemplate(artist))
    var bypass = el.find('.bypass');

    if (allowBypass) {
        addBypassClick(bypass, artist);
    } else {
        bypass.hide();
    }

    var buttons = el.find('.buttons');
    buttons.hide();
    el.hover(
        function() {
            artistChanged(artist);
            buttons.show();
        },
        function() {
            buttons.hide();
        }
    );

    el.find('.tooltips').tooltip({placement:'auto', delay : 1500, html:true});
    return el;
}

function getPlayer(artist, allowBypass) {
    var track = artist.tracks[artist.curTrack];
    track.artist = artist.name;
    track.popularity = artist.popularity;
    var el = $(trackTemplate(track))

    var changeTrack = el.find('.change');
    addChangeTrack(changeTrack, artist);

    var bypass = el.find('.bypass');

    if (allowBypass) {
        addBypassClick(bypass, artist);
    } else {
        bypass.hide();
    }

    //var art = el.find('.album-art');

    var buttons = el.find('.buttons');
    buttons.hide();

    var pause = el.find('.pause');
    var play = el.find('.play');

    play.click( function() {
        playArtist(artist);
        ga_track('frog', 'click-play',  artist.name);
    });

    pause.click( function() {
        playArtist(artist);
        ga_track('frog', 'click-pause',  artist.name);
    });

    var artistElement = el.find('.artist');
    artistElement.click( function() {
        $("#source").val(artist.name);
        $("#dest").val("");
        fetchSims(artist.name);
    });

    el.hover(
        function() {
            artistChanged(artist);
            buttons.show();
        },
        function() {
            buttons.hide();
        }
    );

   // el.find('.tooltips').tooltip({placement:'bottom', delay : 1500});
    return el;
}


function artistChanged(artist) {
    if (artist) {
        var el = artist.adiv.find('.adiv');

        var pause = el.find('.pause');
        var play = el.find('.play');

        if (artist === curArtist) {
            el.addClass('is-current');
        } else {
            el.removeClass('is-current');
        }

        if (artist === curArtist && audioIsPlaying()) {
            play.hide();
            pause.show();
        } else {
            play.show();
            pause.hide();
        }
    }
}

function playArtist(artist) {

    if (artist === curArtist) {
        togglePausePlay();
    } else {
        var oldArtist = curArtist;
        curArtist = artist;
        var track = artist.tracks[artist.curTrack];
        artistChanged(oldArtist);
        playTrack(track);
        ga_track('frog', 'play',  artist.name);
    }
}

function playTrack(track) {
    audio.attr('src', track['audio']);
    audio.get(0).play();
}

function audioIsPlaying() {
    return !audio.get(0).paused;
}

function togglePausePlay() {
    if (audio.get(0).paused) {
        audio.get(0).play();
    } else {
        audio.get(0).pause();
    }
}

function playNext() {
    if (curArtist) {
        if (curArtist.which + 1 < curArtistPath.length) {
            playArtist(curArtistPath[curArtist.which + 1]);
        } else {
            curArtist = null;
        }
    } 
}

function showPlayer(artist, bypass) {
    if (artist.tracks.length > 0) {
        var track = artist.tracks[artist.curTrack];
        var player = artist.adiv;
        player.html(getPlayer(artist, bypass));
    } else {
        var player = artist.adiv;
        player.html(getNoPlayer(artist, bypass));
    }
}

function showPath(path) {
    fixPath(path);
    console.log("show playlist");
    showPlaylist(path);
    $("#list").show();
    $("#xbuttons").show();
    tweetSetup();
}

function showPlaylist(path) {
    var trackDivList = $("#list");
    _.each(path, 
        function(artist, index, list) { 
            var bypass = index > 0 && index < list.length -1;
            artist.adiv = $("<div>").attr('class', 'tadiv');
            artist.which = index;
            artist.curTrack = randomIndex(artist.tracks);
            trackDivList.append(artist.adiv);
            showPlayer(artist, bypass); 
        }
    );

}

function getCurTrack(artist) {
    if ('tracks' in artist && artist.tracks.length > 0) {
        var track = artist.tracks[artist.curTrack];
        return track;
    } else {
        return null;
    }
}

function getCurTracks() {
    var curTracks = [];
    for (var i = 0; i < curArtistPath.length; i++) {
        var artist = curArtistPath[i];
        var track = getCurTrack(artist);
        if (track) {
            curTracks.push('spotify:track:' + track.id);
        }
    }
    return curTracks;
}

function filterDupTracks(tracks) {
    return tracks;
}


function addChangeTrack(button, artist) {
    button.click( function() {
        artist.curTrack += 1;
        if (artist.curTrack >= artist.tracks.length) {
            artist.curTrack = 0;
        }

        var track = artist.tracks[artist.curTrack];
        var player = artist.adiv;
        player.find('.title').text(track.name);
        player.find('.adiv').css('background-image', 'url(' +  track.image  +')');

        if (artist == curArtist && audioIsPlaying()) {
            playTrack(track);
        }

        ga_track('frog', 'new-track',  artist.name);
    });
}

function fetchPath(source, dest) {
    ga_track('frog', 'fetchPath',  source + ' ==== ' + dest);
    var url = url_prefix + "path";

    //$("#xbuttons").hide();
    info("Creating path between " + source + " and " + dest);
    setURL(source, dest, skipList);
    $.getJSON(url, {src : source, dest : dest, skips:skipList.join(",")}, function(data) {
            var list = $("#list");
            list.empty();
            if (data.status == 'ok' && data.path.length >= 2) {
                info("");
                curArtistPath = data.path;
                var msg = 'Found a path from ' + data.path[0].name + ' to ' + data.path[data.path.length -1].name + ' in ' 
                    + data.path.length + ' tracks. '  
                info(msg);
                modifyDatabases(curArtistPath);
                showPath(curArtistPath);
                let firstArtist = curArtistPath[0].name;
                let lastArtist = curArtistPath[curArtistPath.length - 1].name;
                $("#source").val(firstArtist);
                $("#dest").val(lastArtist);
                $("#time-info").show();
                $("#path-time").text(Math.round(data.pdelta));
                $("#total-time").text(Math.round(data.fdelta));
            } else {
                error("Sorry, "  + data.reason);
            }
        }
    );
}

function modifyDatabases(path) {
      //add new item to finished database, both directions (sender and receiver both ppl?idk)
  login('katherine.barbano@duke.edu', 'HackDuke2020').then(() => {
    const appId = 'antiracistplaylist-qvlud';
    const stitchClient = Stitch.hasAppClient(appId)
    ? Stitch.getAppClient(appId)
    : Stitch.initializeDefaultAppClient(appId);
        
    // Initialize a MongoDB Service Client
    const mongodb = stitchClient.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
  
          // Get a hook to the employees collection
          const finished = mongodb.db('createdPlaylistsDatabase').collection('finishedPlaylistsCollection');


          var pathArr = [];
          for (var i = 0; i < path.length; i++) {
            pathArr.push(path[i].name);
        } 

          

          //add path in here
          const newItem = {
              "my_id": "katherine.barbano",
              "friend_id": "alex.chao",
              "path": pathArr
          };
          finished.insertOne(newItem);

        //delete item from unfinished database
          const unfinished = mongodb.db('createdPlaylistsDatabase').collection('unfinishedPlaylistsCollection');
          unfinished.deleteOne({ "receiver" : "my id", "sender": "friend id1" });
      });

}


function fixPath(path) {
    _.each(path, function(artist) {
        fixArtist(artist);
    });
}

function fixArtist(artist) {
    if (!("full_tracks" in artist) ) {
        artist.full_tracks = artist.tracks;
        let ntracks = [];
        _.each(artist.tracks, function(track) {
            if (track.audio != null) {
                ntracks.push(track);
            }
        });
        artist.tracks = ntracks;
    }
}

function fetchSims(artist) {
    ga_track('frog', 'fetchSims',  artist);
    var url = url_prefix + "sims";

  //  $("#xbuttons").hide();
    info("Showing near neighbors for " + artist);
    setURL(artist, "", []);
    $.getJSON(url, {artist : artist}, function(data) {
            var list = $("#list");
            list.empty();
            if (data.status == 'ok') {
                info("");
                curArtistPath = data.sims;
                var msg = 'Similar artists to ' + data.seed.name;
                info(msg);
                showPath(curArtistPath);
                $("#time-info").show();
                $("#path-time").text(Math.round(data.time * 1000));
            } else {
                error("Sorry, Can't find sims for " + artist);
            }
        }
    );
}


function error(msg) {
    $("#info").text(msg);
}

function info(msg) {
    $("#info").text(msg);
}

function now() {
    return new Date().getTime();
}

function urldecode(str) {
   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

function processParams() {
    var params = {};
    var q = document.URL.split('?')[1];
    if(q != undefined){
        q = q.split('&');
        for(var i = 0; i < q.length; i++){
            var pv = q[i].split('=');
            var p = pv[0];
            var v = pv[1];
            params[p] = urldecode(v);
        }
    }

    if ('src' in params && 'dest' in params) {
        var src = params['src'];
        var dest = params['dest'];
        if ('skip' in params) {
            skipList = params['skip'].split(',')
        }
        $("#source").val(src);
        $("#dest").val(dest);
        generatePath();
    } else {
        $("#source").val('Weezer');
        $("#dest").val('Lady Gaga');
    }
}

function setURL(src, dest, skiplist) {
    var p = '?src=' + src + '&dest=' + dest;
    if (skipList && skiplist.length > 0) {
        p += '&skip=' + skiplist.join()
    }
    window.history.replaceState({}, document.title, p);
}

function addNavigation() {
    $("#show-search").click( 
        function() {
           $(".option").removeClass("option-active");
           $(this).addClass("option-active");
           $('#search').show();
           $('#main').show();
    
           $('#about').hide();
        }
    );



    $("#show-about").click( 
        function() {
           $(".option").removeClass("option-active");
           $(this).addClass("option-active");
           $('#search').hide();
           $('#main').hide();
        
           $('#about').show();
        }
    );
}

function clickGo(dest) {
  clearSkips();
  generatePath(dest);
  alert("Worked!");
}

function login(email, password) {
    const appId = 'antiracistplaylist-qvlud';
    const stitchClient = Stitch.hasAppClient(appId)
    ? Stitch.getAppClient(appId)
    : Stitch.initializeDefaultAppClient(appId);
    const credential = new UserPasswordCredential(email, password);
    return stitchClient.auth.loginWithCredential(credential);
  }

$(document).ready(
    function() {
        $(".gen-input").keyup( 
            function(event) {
                if (event.keyCode == 13) {
                    clearSkips();
                    generatePath();
                }
            }
        );

        $("#go").click(function() {
            clearSkips();
            generatePath();
            alert("Worked!")
        });

        /*
        R.player.on("change:playingTrack", function(track) {
            if (track === null) {
                playNext();
            }
        });
        
        R.player.on("change:playState", function(state) {
            artistChanged(curArtist);
        });

        R.player.on("change:playingSource", function(track) {
            artistChanged(curArtist);
        });
        */

        audio.on('pause', function() {
            artistChanged(curArtist);
        });

        audio.on('play', function() {
            artistChanged(curArtist);
        });

        audio.on('ended', function() {
            playNext();
        });

        addNavigation();
        tweetSetup();
        processParams();

        showPopular();
        showRecents();
    }
);


function showPopular() {
    var url = url_prefix + "popular";
    $.getJSON(url, {}, function(data) {
            var list = $("#popular-list");
            list.empty();
            if (data.status == 'ok') {
                _.each(data.popular, function(entry) {
                    var a = $("<a>").attr("href", "?src="+ "spotify:artist:" + entry.src +"&dest=" +  "spotify:artist:" + entry.dest).
                        text(entry.text);
                    var li = $("<li>").append(a);
                    list.append(li);
                });
            }
        }
    );
}

function showRecents() {
    var url = url_prefix + "history";
    $.getJSON(url, {}, function(data) {
            var list = $("#recent-list");
            list.empty();
            if (data.status == 'ok') {
                _.each(data.history, function(entry) {
                    var a = $("<a>").attr("href", "?src="+ 'spotify:artist:' + entry.src +"&dest=" + 'spotify:artist:' + entry.dest).
                        text(entry.text);
                    var li = $("<li>").append(a);
                    list.append(li);
                });
            }
        }
    );
}

function ga_track(page, action, id) {
    _gaq.push(['_trackEvent', page, action, id]);
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3675615-11']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type =
'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' :
'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();

function getPlaylistTitle() {
    var source = $("#source").val();
    var dest = $("#dest").val();
    var title = "";

    if (source && dest) {
        title = "From " + source + " to " + dest;
    } else if (source) {
        title = "Similar to " + source;
    }
    return title;
}

function savePlaylist() {
    var title = getPlaylistTitle();
    var g_tracks = getCurTracks();

    var client_id = '';
    var redirect_uri = '';
    var url = "http://localhost:3000/Save";


	client_id = '802d7ae8caf44a2c906346486811d999';      
    redirect_uri = url;
    
    url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
        '&response_type=token' +
        '&scope=playlist-read-private%20playlist-modify%20playlist-modify-private' +
        '&redirect_uri=' + encodeURIComponent(redirect_uri);
    //localStorage.setItem('createplaylist-tracks', JSON.stringify(g_tracks));
    //localStorage.setItem('createplaylist-name', title);
    window.open(url, 'asdf', 'WIDTH=400,HEIGHT=500');
    alert("Saved!");
}

function spotifyAuthentication() {
  var title = "TestPlaylist";
  var g_tracks = []

  var client_id = '';
  var redirect_uri = '';

  client_id = '802d7ae8caf44a2c906346486811d999';
  redirect_uri = 'http://localhost:3000/callback.html';

  var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
      '&response_type=token' +
      '&scope=playlist-read-private%20playlist-modify%20playlist-modify-private' +
      '&redirect_uri=' + encodeURIComponent(redirect_uri);
  localStorage.setItem('createplaylist-tracks', JSON.stringify(g_tracks));
  localStorage.setItem('createplaylist-name', title);
  var w = window.open(url, 'asdf', 'WIDTH=400,HEIGHT=500');
}


function tweetSetup() {
    $(".twitter-share-button").remove();
    var tweet = $('<a>')
        .attr('href', "https://twitter.com/share")
        .attr('id', "tweet")
        .attr('class', "twitter-share-button")
        .attr('data-lang', "en")
        .attr('data-size', "large")
        .attr('data-count', "none")
        .text('Tweet');

    $("#tweet-span").prepend(tweet);

    var msg = 'Create seamless, genre-transitioning playlists with #boilthefrog';
    if (curArtistPath.length > 0) {
        var msg = 'I made a ' + curArtistPath.length + ' track playlist from ' + curArtistPath[0].name 
            + ' to ' + curArtistPath[curArtistPath.length -1].name + ' with #boilthefrog'  
    }  
    tweet.attr('data-text', msg);
    tweet.attr('data-url', document.URL);

    // twitter can be troublesome. If it is not there, don't bother loading it
/*     if ('twttr' in window && twttr.widgets) {
        twttr.widgets.load();
    } */
}


