const clientId = '68d593c4f2f24ae0b2807bf920635535';
const redirectUri = 'http://localhost:3000';
let accessToken;

export function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }

  // check for an access token match
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    // This clears the parameters, allowing us to grab a new access token when it expires.
    window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = accessUrl;
  }
}
export async function search(term) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${term}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const jsonResponse = await response.json();
  if (!jsonResponse.tracks) {
    return [];
  }
  return jsonResponse.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    albumImage: track.album.images[0].url,
    uri: track.uri,
  }));
}
export async function savePlaylist(name, trackUris) {
  if (!name || !trackUris.length) {
    return;
  }

  const accessToken = getAccessToken();
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const meData = await fetch('https://api.spotify.com/v1/me', {
      headers: headers,
    });
    const user = await meData.json();
    const playlistData = await fetch(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name }),
      }
    );
    const playlist = await playlistData.json();
    await fetch(
      `https://api.spotify.com/v1/users/${user.id}/playlists/${playlist.id}/tracks`,
      {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  } catch (err) {
    throw err;
  }
}
