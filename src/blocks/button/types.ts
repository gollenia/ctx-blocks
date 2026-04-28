export type ButtonAttributes = {
	title?: string;
	size?: string;
	modalTitle?: string;
	modalFull?: boolean;
	action?: 'link' | 'modal' | 'script';
	outline?: boolean;
	icon?: string;
	iconRight?: boolean;
	iconOnly?: boolean;
	url?: string;
	newTab?: boolean;
	rel?: string;
	script?: ScriptActions;
	scriptTarget?: string;
};

export type ButtonProps = {
	attributes: ButtonAttributes;
	className?: string;
	setAttributes: (attributes: Partial<ButtonAttributes>) => void;
	insertBlocksAfter?: (block: unknown) => void;
	onRemove?: () => void;
};

export type ScriptActions = "toggle" | "hide" | "show" | "scroll" | "";