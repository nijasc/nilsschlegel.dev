import { getSpotifyStats } from '$lib/server/spotify';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		const stats = await getSpotifyStats();
		return json(stats, {
			headers: {
				'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
			}
		});
	} catch (error) {
		return json({ error: 'Failed to fetch Spotify data' }, { status: 500 });
	}
};
