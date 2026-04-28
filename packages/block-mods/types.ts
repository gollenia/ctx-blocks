export type BlockSettings = {
	attributes?: Record<string, unknown>;
};

export type BlockEditProps<TAttributes extends Record<string, unknown>> = {
	name: string;
	attributes: TAttributes;
	setAttributes: (attributes: Partial<TAttributes>) => void;
};

export type SaveProps = {
	className?: string;
};

export type BlockTypeLike = {
	name: string;
};
