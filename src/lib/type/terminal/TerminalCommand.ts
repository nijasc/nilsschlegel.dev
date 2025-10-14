import type { TerminalCommandHandler } from './TerminalCommandHandler';

export type TerminalCommand = {
	name: string;
	description: string;
	usage?: string;
	handler: TerminalCommandHandler;
};
