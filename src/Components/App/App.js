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
    }]}
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
