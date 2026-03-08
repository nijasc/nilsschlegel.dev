import type { TrackInfo } from './TrackInfo';

export type HistoryItem = TrackInfo & {
	playedAt: string;
};
