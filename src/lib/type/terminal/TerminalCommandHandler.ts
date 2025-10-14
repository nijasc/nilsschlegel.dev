import type { TerminalAPI } from './TerminalAPI';

export type TerminalCommandHandler = (args: string[], api: TerminalAPI) => Promise<string> | string;
