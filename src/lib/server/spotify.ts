import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';
import type { HistoryItem } from '$lib/type/spotify/HistoryItem';
import type { SpotifyStats } from '$lib/type/spotify/SpotifyStats';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=10';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists?limit=20';

async function getAccessToken() {
	const creds = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${creds}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	});
	return response.json();
}

export async function getSpotifyStats(): Promise<SpotifyStats> {
	const { access_token } = await getAccessToken();
	const headers = { Authorization: `Bearer ${access_token}` };

	const [nowResp, recResp, playlistResp] = await Promise.all([
		fetch(NOW_PLAYING_ENDPOINT, { headers }),
		fetch(RECENTLY_PLAYED_ENDPOINT, { headers }),
		fetch(PLAYLISTS_ENDPOINT, { headers })
	]);

	const nowPlayingData = nowResp.status === 200 ? await nowResp.json() : null;
	const recentlyPlayedData = await recResp.json();
	const playlistData = await playlistResp.json();

	const history: HistoryItem[] = (recentlyPlayedData.items || []).map((item: any) => ({
		name: item.track.name,
		artist: item.track.artists[0].name,
		url: item.track.external_urls.spotify,
		image: item.track.album.images[0]?.url || '',
		playedAt: item.played_at
	}));
	return {
		isPlaying: !!nowPlayingData?.is_playing,
		nowPlaying: nowPlayingData?.item
			? {
					name: nowPlayingData.item.name,
					artist: nowPlayingData.item.artists[0].name,
					url: nowPlayingData.item.external_urls.spotify,
					image: nowPlayingData.item.album.images[0].url
				}
			: undefined,
		history,
		playlists: (playlistData.items || [])
			.filter((p: any) => p.public === true)
			.slice(0, 15)
			.map((p: any) => ({
				name: p.name,
				image: p.images?.[0]?.url || '',
				url: p.external_urls.spotify,
				tracks: p.items?.total ?? 0
			}))
	};
}
