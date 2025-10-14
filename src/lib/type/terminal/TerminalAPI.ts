import type { TerminalCommand } from './TerminalCommand';

export type TerminalAPI = {
	write: (text: string) => void;
	writeln: (text?: string) => void;
	setPrompt: (prompt: string) => void;
	getPrompt: () => string;
	getHistory: () => string[];
	clear: () => void;
	register: (cmd: TerminalCommand) => void;
	listCommands: () => TerminalCommand[];
};
