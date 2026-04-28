import React, { useState, useEffect } from 'react';
import wolfImage from '/Gemini_Generated_Image_j9ys38j9ys38j9ys.png'

const clientID = '2ae6327813dd4c5fbcee78403962e87d';
const redirectUri = 'https://the-jammming-1.netlify.app/';
let accessToken;
const Spotify = {
  getAccessToken() {
    if (accessToken) { return accessToken; }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
   window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(searchTerms) {
const token = Spotify.getAccessToken();
if(!token) { return Promise.resolve([]); }
return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerms}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(response => {
  return response.json();
}).then(jsonResponse => {
  if (!jsonResponse.tracks) {
    return [];
  }
  return jsonResponse.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri
  }))
})},

  savePlaylist(playlistName, uris) {
    if (!playlistName || !uris.length) {
      return;
    }
  const saveToken = Spotify.getAccessToken();
  const headers = { Authorization: `Bearer ${saveToken}`};
  let userId;

  return fetch('https://api.spotify.com/v1/me', { headers: headers })
  .then(response => response.json())
  .then(jsonResponse => {
    userId = jsonResponse.id;
 return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  headers: headers,
  method: 'POST',
  body: JSON.stringify({ name: playlistName })
 })
  .then(response => response.json())
  .then(jsonResponse => {
const playlistId = jsonResponse.id;
return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  headers: headers,
  method: 'POST',
  body: JSON.stringify({ uris: uris })
 })
  });
  });
  } 
};
const SearchBar = (props) => {
  return (
    <div>
      <input placeholder='search songs' onChange={(e) => props.onSearch(e.target.value)} />
    </div>
  );
};
const Search = (props) => {
  return (
    <div>
      <button onClick={props.onSearch} > search </button>
    </div>
  );
};
const SearchResults = (props) => {
  let isRemoval = false;
  return (
    <div>
      <h2>Results ☆

      </h2>
      <Tracklist tracks={props.results} onAdd={props.onAdd} isRemoval={isRemoval} />
    </div>
  );
};
const Playlist = (props) => {
  let isRemoval = true;
  return (
    <div>
      <h2>Playlist ♡</h2>
      <input defaultValue={"New playlist"} onChange={(e) => props.onNameChange(e.target.value)}/>
      <Tracklist tracks={props.tracks} onDelete={props.onDelete} isRemoval={isRemoval} />
    </div>
  );
};
const Tracklist = (props) => {
  return (
    <div>
      {props.tracks.map((song) => {
        return <Track oneTrack={song} key={song.id} onAdd={props.onAdd} onDelete={props.onDelete} isRemoval={props.isRemoval} />;
      })}
    </div>
  );
};
const Track = (props) => {
  return (
    <div>
      <h3>{props.oneTrack.name}</h3>
      <h4>{props.oneTrack.artist}</h4>
      <h4>{props.oneTrack.album}</h4>
      {props.isRemoval ? (<button onClick={() => props.onDelete(props.oneTrack.id)}>-</button>) :
        (<button onClick={() => props.onAdd(props.oneTrack)}>+</button>)}
    </div>
  );
};
const SaveToSpotify = (props) => {
  return (
    <div><button onClick={props.savePlaylist}>Save to Spotify</button></div>
  );
};
const App = () => {
  const [wolfToggle, setWolfToggle] = useState(false)
  
  useEffect(() => {
    const root = document.documentElement;

    if(wolfToggle) {
      root.style.setProperty('--wolf-bg', `url(${wolfImage})`);
    }else{
       root.style.setProperty('--wolf-bg', 'none');
    }
  }, [wolfToggle]);
  const [searchTerms, setSearchTerms] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([ ]);
  function savePlaylist(e) {
    const uris = tracks.map(track => track.uri);
    e.preventDefault();
    Spotify.savePlaylist(playlistName, uris);
   setPlaylistName('New playlist');
   setTracks([]);
  }
  function handleSearch(e) {
    e.preventDefault();
    Spotify.search(searchTerms).then(results => setSearchResults(results));
  }
  let addTrack = (track) => {
    setTracks(prev => [track, ...prev]);
  };
  let removeTrack = (trackIdToRemove) => {
    setTracks((tracks) => tracks.filter((track) => track.id !== trackIdToRemove));
  };
  return (
    <div className="App">
      <div>
        <SearchBar onSearch={setSearchTerms} />    
        <Search onSearch={handleSearch}/>
        <SearchResults results={searchResults} onAdd={addTrack} />
      </div>
      <div>
        <Playlist tracks={tracks} onDelete={removeTrack} onNameChange={setPlaylistName} />
        <SaveToSpotify savePlaylist={savePlaylist} />
      <button onClick={() => setWolfToggle(!wolfToggle)}>Click me!</button>
      </div>
    </div>
  );
};


export default App;
