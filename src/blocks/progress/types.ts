export type ProgressColor = {
	color?: string;
	slug?: string;
};

export type ProgressAttributes = {
	maxValue?: string;
	currentValue?: string;
	showValues?: boolean;
	unit?: string;
	prefixedUnit?: boolean;
	thousandSeparators?: boolean;
	decimalPlaces?: number;
	colorBar?: string;
	colorBackground?: string;
	title?: string;
	currentDescription?: string;
	maxDescription?: string;
	animate?: boolean;
	barLabel?: string;
	barType?: string;
};

export type ProgressProps = {
	attributes: ProgressAttributes;
	className?: string;
	setAttributes: (attributes: Partial<ProgressAttributes>) => void;
	colorBar?: ProgressColor;
	colorBackground?: ProgressColor;
	setColorBar?: (color?: string) => void;
	setColorBackground?: (color?: string) => void;
	colorUtils: {
		getMostReadableColor: (color?: string) => string;
	};
};
