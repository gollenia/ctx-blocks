const blockGapStyle = (blockGap?: string) => {
	const raw = blockGap;

	if (!raw) {
		return '1rem';
	}
	if (raw.includes('rem') || raw.includes('px')) {
		return raw;
	}

	return raw.replace(':', '(--wp--').replaceAll('|', '--') + ')';
};

export default blockGapStyle;
