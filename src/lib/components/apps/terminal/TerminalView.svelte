<script lang="ts">
	import type { TerminalCore } from '$lib/impl/terminal/TerminalCore';
	import { onMount, onDestroy } from 'svelte';

	export let terminal: TerminalCore;
	let content = '';
	let unsub: any | null = null;

	let textareaEl: HTMLTextAreaElement | undefined;

	const focusEnd = () => {
		if (!textareaEl) return;
		const len = textareaEl.value.length;
		textareaEl.focus();
		textareaEl.setSelectionRange(len, len);
	};

	const scrollToBottom = () => {
		if (!textareaEl) return;
		textareaEl.scrollTop = textareaEl.scrollHeight;
	};

	const onbeforeinput = (e: InputEvent) => {
		const t = e.target as HTMLTextAreaElement | null;

		if (e.inputType === 'insertText' && typeof e.data === 'string') {
			terminal.input(e.data);
			e.preventDefault();
			return;
		}
		if (e.inputType === 'insertLineBreak' || e.inputType === 'insertParagraph') {
			terminal.input('\n');
			e.preventDefault();
			return;
		}
		if (e.inputType === 'deleteContentBackward') {
			terminal.input('\b');
			e.preventDefault();
			return;
		}
		if (e.inputType === 'insertFromPaste') {
			const data = (e as any).clipboardData?.getData('text') ?? '';
			if (data) terminal.input(data);
			e.preventDefault();
			return;
		}
		if (
			e.inputType === 'insertCompositionText' ||
			e.inputType === 'insertFromComposition' ||
			e.inputType === 'deleteCompositionText'
		) {
			return;
		}
		if (
			e.inputType === 'deleteByCut' ||
			e.inputType === 'deleteContentForward' ||
			e.inputType === 'deleteByDrag'
		) {
			e.preventDefault();
			return;
		}
		if (t && t.value !== content) t.value = content;
		e.preventDefault();
	};

	const onkeydown = (e: KeyboardEvent) => {
		if (e.isComposing) return;

		switch (e.key) {
			case 'Enter':
				terminal.input('\n');
				e.preventDefault();
				return;
			case 'Backspace':
				terminal.input('\b');
				e.preventDefault();
				return;
			case 'ArrowUp':
				terminal.navigateHistory(-1);
				e.preventDefault();
				return;
			case 'ArrowDown':
				terminal.navigateHistory(1);
				e.preventDefault();
				return;
			case 'Tab':
				terminal.input('\t');
				e.preventDefault();
				return;
		}

		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
			return;
		}
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
			return;
		}
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
			e.preventDefault();
			return;
		}
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
			e.preventDefault();
			focusEnd();
			return;
		}
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
			(terminal as any).clear?.();
			e.preventDefault();
			return;
		}

		if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
			terminal.input(e.key);
			e.preventDefault();
			return;
		}
	};

	const applyEndAndScroll = () => {
		queueMicrotask(() => {
			focusEnd();
			scrollToBottom();
		});
	};

	onMount(() => {
		const unsubLocal = terminal.subscribe((c: string) => {
			content = c;
			applyEndAndScroll();
		});
		unsub = unsubLocal;
		applyEndAndScroll();
	});

	onDestroy(() => {
		unsub?.();
		unsub = null;
	});
</script>

<textarea
	bind:this={textareaEl}
	value={content}
	{onbeforeinput}
	{onkeydown}
	onclick={focusEnd}
	onfocus={focusEnd}
	spellcheck="false"
	autocapitalize="off"
	autocomplete="off"
	inputmode="text"
	class="textarea-bordered caret- textarea h-full w-full resize-none overflow-auto border-none bg-base-300 p-4 font-mono text-sm leading-6 whitespace-pre text-base-content opacity-70 outline-none focus:border-none focus:outline-none"
></textarea>
