import type { TerminalCommand } from '$lib/type/terminal/TerminalCommand';

type Social = {
	id: string;
	label: string;
	url: string;
};

const socialsData: ReadonlyArray<Social> = [
	{ id: 'gh', label: 'GitHub', url: 'https://github.com/your-username' },
	{ id: 'li', label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-username' },
	{ id: 'tw', label: 'Twitter', url: 'https://twitter.com/your-username' },
	{ id: 'ig', label: 'Instagram', url: 'https://instagram.com/your-username' },
	{ id: 'em', label: 'Email', url: 'mailto:you@example.com' }
] as const;

const pad = (s: string, n: number): string => s.padEnd(n, ' ');
const nowIso = (): string => new Date().toISOString();
const fmtTitle = (t: string): string => `== ${t} ==`;
const openUrl = (url: string): string => {
	if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer');
	return `opening: ${url}`;
};

export const helpCommand = (all: () => TerminalCommand[]): TerminalCommand => ({
	name: 'help',
	description: 'List available commands',
	usage: 'help',
	handler: () => {
		const cmds = all()
			.slice()
			.sort((a, b) => a.name.localeCompare(b.name));
		const nameW = Math.max(...cmds.map((c) => c.name.length)) + 2;
		const descW = Math.max(...cmds.map((c) => c.description.length)) + 2;
		const lines = [
			fmtTitle('commands'),
			...cmds.map((c) => {
				const u = c.usage ? ` usage: ${c.usage}` : '';
				return `${pad(c.name, nameW)}${pad(c.description, descW)}${u}`;
			})
		];
		return lines.join('\n');
	}
});

export const echoCommand: TerminalCommand = {
	name: 'echo',
	description: 'Echo arguments',
	usage: 'echo hello world',
	handler: (args) => args.join(' ')
};

export const clearCommand = (fn: () => void): TerminalCommand => ({
	name: 'clear',
	description: 'Clear the terminal',
	usage: 'clear',
	handler: () => {
		fn();
		return '';
	}
});

export const dateCommand: TerminalCommand = {
	name: 'date',
	description: 'Print current date/time',
	usage: 'date',
	handler: () => `${fmtTitle('date')} \n${nowIso()}`
};

export const whoamiCommand: TerminalCommand = {
	name: 'whoami',
	description: 'Show user identity',
	usage: 'whoami',
	handler: () => 'visitor'
};

export const promptCommand = (setPrompt: (p: string) => void): TerminalCommand => ({
	name: 'prompt',
	description: 'Set the prompt',
	usage: 'prompt "$ user -> "',
	handler: (args) => {
		const p = args.join(' ');
		const v = p || '$ ';
		setPrompt(v);
		return `prompt set to: ${v}`;
	}
});

export const socialsCommand: TerminalCommand = {
	name: 'socials',
	description: 'List social links',
	usage: 'socials',
	handler: () => {
		const idW = Math.max(...socialsData.map((s) => s.id.length)) + 2;
		const labelW = Math.max(...socialsData.map((s) => s.label.length)) + 2;
		const lines: string[] = [
			fmtTitle('socials'),
			pad('id', idW) + pad('name', labelW) + 'url',
			...socialsData.map((s) => `${pad(s.id, idW)}${pad(s.label, labelW)}${s.url}`)
		];
		return lines.join('\n');
	}
};

export const socialsGotoCommand: TerminalCommand = {
	name: 'socials goto',
	description: 'Open a social link by id or name',
	usage: 'socials goto gh | socials goto github',
	handler: (args) => {
		const q = args.join(' ').trim().toLowerCase();
		if (!q) return 'usage: socials goto <id|name>';
		const match = socialsData.find((s) => {
			const name = s.label.toLowerCase();
			return s.id.toLowerCase() === q || name === q || name.replace(/\s+/g, '') === q;
		});
		if (!match) return `not found: ${q}`;
		return openUrl(match.url);
	}
};

export const asciiCommand: TerminalCommand = {
	name: 'ascii',
	description: 'Show an ascii banner',
	usage: 'ascii',
	handler: () =>
		[
			'  ___      ___  ________  ________ ',
			' |\\  \\    /  /||\\   __  \\|\\   __  \\',
			' \\ \\  \\  /  / /\\ \\  \\|\\  \\ \\  \\|\\  \\',
			'  \\ \\  \\/  / /  \\ \\   __  \\ \\   _  _\\',
			'   \\ \\    / /    \\ \\  \\ \\  \\ \\  \\\\  \\|',
			'    \\ \\__/ /      \\ \\__\\ \\__\\ \\__\\\\ _\\',
			'     \\|__|/        \\|__|\\|__|\\|__|\\|__|'
		].join('\n')
};

export const aboutCommand: TerminalCommand = {
	name: 'about',
	description: 'About this portfolio',
	usage: 'about',
	handler: () =>
		[
			fmtTitle('about'),
			'hi, I am Your Name',
			'I build web experiences with type safety and performance',
			'try: projects, skills, theme, joke, time'
		].join('\n')
};

export const timeCommand: TerminalCommand = {
	name: 'time',
	description: 'Show local and UTC time',
	usage: 'time',
	handler: () => {
		const d = new Date();
		const local = d.toLocaleString();
		const utc = d.toUTCString();
		return [fmtTitle('time'), `local: ${local}`, `utc:   ${utc}`].join('\n');
	}
};

export const projectsCommand = (
	projects: ReadonlyArray<{ name: string; url: string; desc: string }>
): TerminalCommand => ({
	name: 'projects',
	description: 'List featured projects',
	usage: 'projects',
	handler: () => {
		if (!projects.length) return 'no projects available';
		const nameW = Math.max(...projects.map((p) => p.name.length)) + 2;
		const lines = [
			fmtTitle('projects'),
			...projects.map((p) => `${pad(p.name, nameW)}${p.desc} -> ${p.url}`)
		];
		return lines.join('\n');
	}
});

export const skillsCommand = (skills: ReadonlyArray<string>): TerminalCommand => ({
	name: 'skills',
	description: 'Show skills with groups',
	usage: 'skills',
	handler: () => {
		if (!skills.length) return 'no skills available';
		const groups: Record<string, string[]> = {};
		skills.forEach((s) => {
			const g = /^[a-zA-Z]+/.exec(s)?.[0]?.toLowerCase() ?? 'misc';
			if (!groups[g]) groups[g] = [];
			groups[g].push(s);
		});
		const keys = Object.keys(groups).sort();
		const lines: string[] = [fmtTitle('skills')];
		keys.forEach((k) => {
			lines.push(`${k}: ${groups[k].sort().join(', ')}`);
		});
		return lines.join('\n');
	}
});

export const themeCommand = (
	setTheme: (t: 'light' | 'dark' | 'system') => void
): TerminalCommand => ({
	name: 'theme',
	description: 'Set theme light dark or system',
	usage: 'theme dark',
	handler: (args) => {
		const v = (args[0] ?? '').toLowerCase();
		if (v !== 'light' && v !== 'dark' && v !== 'system') return 'usage: theme <light|dark|system>';
		setTheme(v);
		return `theme set to: ${v}`;
	}
});

export const jokeCommand: TerminalCommand = {
	name: 'joke',
	description: 'Print a short clean joke',
	usage: 'joke',
	handler: () => {
		const jokes: ReadonlyArray<string> = [
			'why do programmers prefer dark mode it saves energy and eyes',
			'i would tell you a udp joke but you might not get it',
			'there are 10 types of people those who understand binary and those who do not',
			'debugging is like being the detective in a crime movie where you are also the murderer'
		];
		const i = Math.floor(Math.random() * jokes.length);
		return jokes[i];
	}
};

export const fortuneCommand: TerminalCommand = {
	name: 'fortune',
	description: 'Get a tiny fortune',
	usage: 'fortune',
	handler: () => {
		const items: ReadonlyArray<string> = [
			'a small change will spark a big idea',
			'consistency beats intensity',
			'clean code invites happy bugs to leave',
			'seek clarity then speed'
		];
		const i = Math.floor(Math.random() * items.length);
		return items[i];
	}
};

export const pingCommand: TerminalCommand = {
	name: 'ping',
	description: 'Check terminal responsiveness',
	usage: 'ping',
	handler: () => 'pong'
};

export const calcCommand: TerminalCommand = {
	name: 'calc',
	description: 'Evaluate simple math safely',
	usage: 'calc 2 * (3 + 4)',
	handler: (args) => {
		const input = args.join(' ').replace(/[^0-9+\-*/().% ]/g, '');
		if (!input.trim()) return 'usage: calc <expression>';
		try {
			const f = new Function(`return (${input})`) as () => unknown;
			const v = f();
			if (typeof v === 'number' && Number.isFinite(v)) return `${v}`;
			return 'invalid expression';
		} catch {
			return 'invalid expression';
		}
	}
};

export const bannerCommand: TerminalCommand = {
	name: 'banner',
	description: 'Show welcome banner',
	usage: 'banner',
	handler: () =>
		[fmtTitle('welcome'), 'type help to see all commands', 'try socials or projects'].join('\n')
};
