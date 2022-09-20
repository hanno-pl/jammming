import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist';
import React from "react"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [{
      name: "first song",
      artist: "first artist",
      album: "first album",
      id: "1"
    },
    {
      name: "second song",
      artist: "second artist",
      album: "second album",
      id: "2"
    },{
      name: "third song",
      artist: "third artist",
      album: "third album",
      id: "3"
    }], 
  playlistName: "testPlaylist", 
  playlistTracks: [
    {
      name: "first playlist song",
      artist: "first playlist artist",
      album: "first playlistalbum",
      id: "p1"
    },
    {
      name: "second playlist song",
      artist: "second playlist artist",
      album: "second playlist album",
      id: "p2"
    },{
      name: "third playlist song",
      artist: "third playlist artist",
      album: "third playlist album",
      id: "p3"
    }
  ]}
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
