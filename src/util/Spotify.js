
let accessToken;
const clientID = '3b7222743c7a428f973c18f6d5b315fc';
const redirectURI = 'http://localhost:3000/';

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
        } else if(!accessToken && !accessTokenMatch) {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    },
    async search(searchTerm){
        const passedAccessToken = Spotify.getAccessToken();
        const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`

        return fetch(fetchUrl,
            {headers:{Authorization: `Bearer ${passedAccessToken}`}}).then(response=>{
                if (response.ok) {return response.json()}
                throw new Error("Request failed!")
            }).then(jsonResponse=>{
                if(!jsonResponse){
                    return [];
                }
                return jsonResponse.tracks.items.map((track)=>(
                    {
                        id:track.id, 
                        name:track.name,
                        artist:track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }))
            })
    }
}
