import React, { useState, useEffect } from 'react';
import { THE_SPOTIFY_CLIENT_SECRET, THE_SPOTIFY_CLIENT_ID, THE_SPOTIFY_REDIRECT_URL} from './Jammming.env';


  const searchBar = () => {
    return (
        <div>
            <input placeholder='nine tailed fox'/>
        </div>
    )
  }
  const search = () => {
    return (
        <div>
            <button><FontAwesomeIcon icon={byPrefixAndName.fab['searchengin']} style={{color: "rgb(116, 192, 252)",}} /></button>
        </div>
    )
  }
  let searchResults = (props) => {
    {props.searchResults.map((song) => {
        return <Track key={song.id} track={song} />
    })}
    return (
      <div>
        <h2>Results ☆</h2>
      </div>
    )
  }
   const playlist = () => {
    return ( 
        <div>
            <h2>Playlist ♡</h2>
        </div>
    )
   }
   const tracklist = () => {
return (
    <div>
     <h3>Bad Dreams</h3>   
     <h4>Teddy Swims / I've Tried Everything but Therapy (Part 2)</h4>
     <h3>Devil in Disguise</h3>
     <h4>Marino / Devil in Disguise (Single)</h4>
     <h3>Lose Control</h3>
     <h4>Teddy Swims / I've Tried Everything but Therapy (Part 1)</h4>
    </div>
)
   }
   const track = () => {
return (
    <div>
       <h3>Bad Dreams</h3>   
     <h4>Teddy Swims / I've Tried Everything but Therapy (Part 2)</h4>  
    </div>
)
   }
   const saveToSpotify = () => {
return (
    <div><button>Save to Spotify</button></div>
)
   }
   
const App = () => {
const [searchResults, setSearchResults] = useState([
{id: 1, name: 'Bad Dreams', artist: 'Teddy Swims', album: 'I\'ve Tried Everything but Therapy (Part 2)'},
{id: 2, name: 'Devil in Disguise', artist: 'Marino', album: 'Devil in Disguise (Single)'}
]);




} 

