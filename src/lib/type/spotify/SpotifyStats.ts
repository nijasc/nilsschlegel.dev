import type { HistoryItem } from './HistoryItem';
import type { PlaylistInfo } from './PlaylistInfo';
import type { TrackInfo } from './TrackInfo';

export type SpotifyStats = {
	isPlaying: boolean;
	nowPlaying?: TrackInfo;
	playlists: PlaylistInfo[];
	history: HistoryItem[];
};
