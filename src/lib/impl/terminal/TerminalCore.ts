import type { TerminalAPI } from '$lib/type/terminal/TerminalAPI';
import type { TerminalCommand } from '$lib/type/terminal/TerminalCommand';
import type { TerminalListener } from '$lib/type/terminal/TerminalListener';
import type { TerminalOptions } from '$lib/type/terminal/TerminalOptions';

const DEFAULT_PREFIX = '$ visitor@nilsschlegel -> ';
const DEFAULT_WELCOME = ['Welcome to the web terminal', 'Type `help` to begin'];
const DEFAULT_HISTORY_LIMIT = 200;

export class TerminalCore {
	private content = '';
	private buffer = '';
	private prompt = DEFAULT_PREFIX;
	private listeners: TerminalListener[] = [];
	private commands: Map<string, TerminalCommand> = new Map();
	private history: string[] = [];
	private historyLimit = DEFAULT_HISTORY_LIMIT;
	private historyIndex = -1;
	private ready = false;

	constructor(opts?: TerminalOptions) {
		if (opts?.prefix) this.prompt = opts.prefix;
		if (opts?.historyLimit) this.historyLimit = opts.historyLimit;
		const welcome = opts?.welcome ?? DEFAULT_WELCOME;
		for (const line of welcome) this.println(line);
		this.printPrompt();
	}

	subscribe(listener: TerminalListener) {
		this.listeners.push(listener);
		listener(this.content);
	}

	private emit() {
		for (const l of this.listeners) l(this.content);
	}

	private append(text: string) {
		this.content += text;
		this.emit();
	}

	private println(text = '') {
		this.append(text + '\n');
	}

	private printPrompt() {
		this.append(this.prompt);
	}

	write(text: string) {
		this.buffer += text;
		this.append(text);
	}

	writeln(text = '') {
		this.write(text);
		this.newline();
	}

	private exec(line: string) {
		const trimmed = line.trim();
		if (!trimmed) return;
		this.history.push(trimmed);
		if (this.history.length > this.historyLimit) this.history.shift();
		this.historyIndex = this.history.length;
		const [name, ...args] = this.tokenize(trimmed);
		const cmd = this.commands.get(name);
		if (!cmd) {
			this.println(`Command not found: ${name}`);
			return;
		}
		const out = cmd.handler(args, this.api());
		if (out instanceof Promise) {
			out
				.then((res) => {
					if (res) this.println(res);
					this.printPrompt();
				})
				.catch((e) => {
					this.println(String(e ?? 'error'));
					this.printPrompt();
				});
		} else {
			if (out) this.println(out);
		}
	}

	private tokenize(line: string): string[] {
		const out: string[] = [];
		let cur = '';
		let quote: '"' | "'" | null = null;
		for (let i = 0; i < line.length; i++) {
			const c = line[i];
			if (quote) {
				if (c === quote) {
					quote = null;
				} else if (c === '\\') {
					const n = line[i + 1];
					if (n) {
						cur += n;
						i++;
					}
				} else {
					cur += c;
				}
			} else {
				if (c === '"' || c === "'") {
					quote = c;
				} else if (/\s/.test(c)) {
					if (cur) {
						out.push(cur);
						cur = '';
					}
				} else {
					cur += c;
				}
			}
		}
		if (cur) out.push(cur);
		return out;
	}

	input(char: string) {
		if (!this.ready) this.ready = true;
		if (char === '\n') {
			this.newline();
			return;
		}
		if (char === '\r') return;
		if (char === '\b') {
			if (this.buffer.length > 0) {
				this.buffer = this.buffer.slice(0, -1);
				this.content = this.content.slice(0, -1);
				this.emit();
			}
			return;
		}
		this.write(char);
	}

	private newline() {
		const line = this.buffer;
		this.buffer = '';
		this.append('\n');
		this.exec(line);
		this.printPrompt();
	}

	navigateHistory(delta: -1 | 1) {
		if (!this.history.length) return;
		this.historyIndex = Math.max(0, Math.min(this.history.length, this.historyIndex + delta));
		const entry =
			this.historyIndex >= 0 && this.historyIndex < this.history.length
				? this.history[this.historyIndex]
				: '';
		const removeCount = this.buffer.length;
		if (removeCount > 0) {
			this.content = this.content.slice(0, -removeCount);
		}
		this.buffer = '';
		this.emit();
		this.write(entry);
	}

	clear() {
		this.content = '';
		this.buffer = '';
		this.emit();
	}

	setPrompt(p: string) {
		this.prompt = p;
	}

	getPrompt() {
		return this.prompt;
	}

	getHistory() {
		return [...this.history];
	}

	register(cmd: TerminalCommand) {
		this.commands.set(cmd.name, cmd);
	}

	listCommands() {
		return Array.from(this.commands.values());
	}

	api(): TerminalAPI {
		return {
			write: (t) => this.write(t),
			writeln: (t) => this.writeln(t),
			setPrompt: (p) => this.setPrompt(p),
			getPrompt: () => this.getPrompt(),
			getHistory: () => this.getHistory(),
			clear: () => this.clear(),
			register: (c) => this.register(c),
			listCommands: () => this.listCommands()
		};
	}
}
