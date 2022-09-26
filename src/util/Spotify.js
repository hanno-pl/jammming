
let accessToken;
const clientID = '3b7222743c7a428f973c18f6d5b315fc';
const redirectURI = 'https://jaming.surge.sh/';

export const Spotify = {
    getAccessToken() {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken) {
            return accessToken
        } else if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            let expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else if (!accessToken && !accessTokenMatch) {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },
    async search(searchTerm) {
        const passedAccessToken = Spotify.getAccessToken();
        const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`

        return fetch(fetchUrl,
            { headers: { Authorization: `Bearer ${passedAccessToken}` } }).then(response => {
                if (response.ok) { return response.json() }
                throw new Error("Request failed!")
            }).then(jsonResponse => {
                if (!jsonResponse) {
                    return [];
                }
                return jsonResponse.tracks.items.map((track) => (
                    {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }))
            })
    },
    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) {
            return;
        }
        const passedAccessToken = Spotify.getAccessToken();
        const myHeaders = { "Authorization": `Bearer ${passedAccessToken}` }
        let userID = ""
        const fetchUrl = "https://api.spotify.com/v1/me"
        const userNameFetch = await fetch(fetchUrl, {
            headers: myHeaders,
        }).then(
            response => {
                if (response.ok) { return response.json() }
                throw new Error("Username Request failed!")
            })
        console.log(userNameFetch)
        userID = userNameFetch.id;
        console.log(userID)
        const newPlaylistEndpoint = `https://api.spotify.com/v1/users/${userID}/playlists`
        const PlaylistResponse = await fetch(newPlaylistEndpoint, {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify({
                name: playlistName,
            })
        }).then(
            response => {
                if (response.ok) { return response.json() }
                console.log(response)
                throw new Error("Save Playlist failed!")
            }
        )
        const playlistID = PlaylistResponse.id
        const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
        console.log(addTracksEndpoint)
        await fetch(addTracksEndpoint, {
            headers: myHeaders,
            method: "POST",
            body: JSON.stringify({
                uris: trackURIs
            })
        }).then(response => {
            if (response.ok) { return response.json() }
            throw new Error("Add Track failed!")
        })

    }
}
