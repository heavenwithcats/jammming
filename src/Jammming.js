import React, { useState } from 'react';

const clientID = '2ae6327813dd4c5fbcee78403962e87d';
const redirectUri = 'https://heavenwithcats.github.io/Jammming/';
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
return fetch(`https://accounts.spotify.com/authorize?client_id=${clientID}&type=track`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(response => {
  return response.json();
}).then(jsonResponse => {
  if (!jsonResponse.tracks) {
    return [];
  }
  return jsonResponse.tracks.items.map(track =>






































    
  )
})

  },

  savePlaylist(playlistName, uris) {}
};
const SearchBar = (props) => {
  return (
    <div>
      <input placeholder='nine tailed fox' onChange={(e) => props.onSearch(e.target.value)} />
    </div>
  );
};
const Search = () => {
  return (
    <div>
      <button><FontAwesomeIcon icon={byPrefixAndName.fab['searchengin']} style={{ color: "rgb(116, 192, 252)", }} /></button>
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
  const [searchTerms, setSearchTerms] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [tracks, setTracks] = useState([{ id: 1, name: 'Bad Dreams', artist: 'Teddy Swims', album: 'I\'ve Tried Everything but Therapy (Part 2)' }, { id: 2, name: 'Devil in Disguise', artist: 'Marino', album: 'Devil in Disguise (Single)' }]);
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Bad Dreams', artist: 'Teddy Swims', album: 'I\'ve Tried Everything but Therapy (Part 2)', uri: 'spotify:track:1QSv1v1M76v2H1A5N0q9Xv' },
    { id: 2, name: 'Devil in Disguise', artist: 'Marino', album: 'Devil in Disguise (Single)', uri: 'spotify:track:4saGtsbfqEXbc7Zt6W1Xv' }
  ]);

  function savePlaylist(e) {
    const uris = tracks.map(track => track.uri);
    e.preventDefault();
    Spotify.savePlaylist(playlistName, uris);
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
    <div>
      <div onSearch={handleSearch}>
        <SearchBar playlistName={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />       <Search />
        <SearchResults results={searchResults} onAdd={addTrack} />
        <Search />
      </div>
      <div>
        <Playlist tracks={tracks} onDelete={removeTrack} />
        <SaveToSpotify savePlaylist={savePlaylist} />
      </div>
    </div>
  );
};


