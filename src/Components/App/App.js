import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';
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
      }, {
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
        }, {
          name: "third playlist song",
          artist: "third playlist artist",
          album: "third playlist album",
          id: "p3"
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)    
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track)
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    this.setState({ playlistTracks: tracks })
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  async search(term) {
    const spotifyResults = await Spotify.search(term);
    this.setState({searchResults: spotifyResults})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist 
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
