// Svelte action: reveal an element's text one character at a time, in reading
// order, like a teletype. Each character sits faint until its turn, then snaps
// to full dark. Word-wrapping and nested structure (chips, coloured spans) are
// preserved — only text nodes are split, and each word is kept unbreakable.
//
// params:
//   done     — ms after mount when typing starts (i.e. once the box is drawn)
//   duration — ms over which this element's characters are all revealed
//   enabled  — set false to skip (e.g. when not in blueprint motion mode)

export function typewriter(node, params = {}) {
	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (reduce || params.enabled === false) {
		return { update() {}, destroy() {} };
	}

	const chars = [];

	function splitTextNode(textNode) {
		const text = textNode.nodeValue;
		if (!text) return;
		const frag = document.createDocumentFragment();
		// Keep whitespace runs as plain text (valid break points); wrap each
		// word in a nowrap span so it never breaks mid-word once split.
		for (const part of text.split(/(\s+)/)) {
			if (part === '') continue;
			if (/^\s+$/.test(part)) {
				frag.appendChild(document.createTextNode(part));
				continue;
			}
			const word = document.createElement('span');
			word.style.whiteSpace = 'nowrap';
			for (const ch of part) {
				const c = document.createElement('span');
				c.className = 'tw-char';
				c.textContent = ch;
				word.appendChild(c);
				chars.push(c);
			}
			frag.appendChild(word);
		}
		textNode.replaceWith(frag);
	}

	function walk(el) {
		for (const child of Array.from(el.childNodes)) {
			if (child.nodeType === 3) splitTextNode(child);
			else if (
				child.nodeType === 1 &&
				!child.classList.contains('tw-char') &&
				// don't split icon ligatures or explicitly-skipped elements
				!child.classList.contains('material-symbols-outlined') &&
				!child.classList.contains('tw-skip')
			)
				walk(child);
		}
	}

	walk(node);

	const done = params.done ?? 0;
	const duration = params.duration ?? 700;
	const total = chars.length || 1;
	chars.forEach((c, i) => {
		c.style.animationDelay = `${Math.round(done + (i / total) * duration)}ms`;
	});

	return { update() {}, destroy() {} };
}
