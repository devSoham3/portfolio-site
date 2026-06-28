// Svelte action: give an element the same four-line "drawn box" treatment as
// the panels — four edge spans plus a random draw order — so its border is
// traced one line at a time (verticals-first or horizontals-first) by the
// shared [data-order] > .e-* CSS, rather than two lines at once.
export function drawEdges(node) {
	const reduce =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	if (reduce) return { destroy() {} };

	node.setAttribute('data-order', Math.random() < 0.5 ? 'v' : 'h');

	const edges = ['e-top', 'e-bottom', 'e-left', 'e-right'].map((cls) => {
		const s = document.createElement('span');
		s.className = `bp-edge ${cls}`;
		s.setAttribute('aria-hidden', 'true');
		node.appendChild(s);
		return s;
	});

	return {
		destroy() {
			edges.forEach((e) => e.remove());
		}
	};
}
