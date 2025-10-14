import type { TerminalOptions } from '$lib/type/terminal/TerminalOptions';
import { TerminalCore } from './TerminalCore';
import {
	clearCommand,
	dateCommand,
	echoCommand,
	helpCommand,
	promptCommand,
	whoamiCommand,
	socialsCommand,
	socialsGotoCommand,
	asciiCommand,
	aboutCommand,
	timeCommand,
	projectsCommand,
	skillsCommand,
	themeCommand,
	jokeCommand,
	fortuneCommand,
	pingCommand,
	calcCommand,
	bannerCommand
} from './commands';

type Project = { name: string; url: string; desc: string };

export const createTerminal = (
	opts?: TerminalOptions & {
		socials?: ReadonlyArray<{ id: string; label: string; url: string }>;
		projects?: ReadonlyArray<Project>;
		skills?: ReadonlyArray<string>;
		setTheme?: (t: 'light' | 'dark' | 'system') => void;
	}
) => {
	const core = new TerminalCore(opts);
	const projects = opts?.projects ?? [];
	const skills = opts?.skills ?? [];
	const setTheme = opts?.setTheme ?? (() => {});

	core.register(helpCommand(() => core.listCommands()));
	core.register(echoCommand);
	core.register(whoamiCommand);
	core.register(dateCommand);
	core.register(promptCommand((p) => core.setPrompt(p)));
	core.register(
		clearCommand(() => {
			core.clear();
		})
	);

	core.register(bannerCommand);
	core.register(asciiCommand);
	core.register(aboutCommand);
	core.register(timeCommand);
	core.register(pingCommand);
	core.register(jokeCommand);
	core.register(fortuneCommand);
	core.register(calcCommand);

	core.register(socialsCommand);
	core.register(socialsGotoCommand);

	core.register(projectsCommand(projects));
	core.register(skillsCommand(skills));
	core.register(themeCommand(setTheme));

	return core;
};
