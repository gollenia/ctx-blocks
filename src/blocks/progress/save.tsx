import { getColorClassName, useBlockProps } from '@wordpress/block-editor';
import type { ProgressProps } from './types';

const save = (props: ProgressProps) => {
	const { attributes, className } = props;

	const {
		maxValue,
		currentValue,
		unit,
		animate,
		prefixedUnit,
		currentDescription,
		maxDescription,
		decimalPlaces,
		thousandSeparators,
		colorBar,
		colorBarBackground,
		showValues,
	} = attributes;

	const classes = [
		'ctx-progress',
		className,
		getColorClassName('background-color', colorBarBackground),
		decimalPlaces ? 'ctx-progress--decimal' : false,
		thousandSeparators ? 'ctx-progress--thousand-separators' : false,
	]
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps.save({ className: classes });

	const percent =
		currentValue < maxValue
			? 100
			: Math.floor((currentValue * 100) / maxValue);
	const fullPercent = Math.floor((currentValue * 100) / maxValue);

	const formattedCurrentValue = new Intl.NumberFormat('de-DE').format(
		currentValue
	);
	const formattedMaxValue = new Intl.NumberFormat('de-DE').format(maxValue);

	return (
		<div {...blockProps} data-max={maxValue} data-current={currentValue}>
			<div className="ctx-progress__title">
				<div className="ctx-progress__legend">
					<div className="ctx-progress__current-label">
						{currentDescription}
					</div>
					<div className="ctx-progress__current-value">
						{prefixedUnit ? unit : ''}{' '}
						<span className="ctx-progress__number-injection">
							{formattedCurrentValue}
						</span>{' '}
						{!prefixedUnit ? unit : ''}
					</div>
				</div>
				<div
					style={{ color: 'var(--black)' }}
					className="ctx-progress__legend"
				>
					<div className="ctx-progress__max-label">{maxDescription}</div>
					<div className="ctx-progress__max-value">
						{prefixedUnit ? unit : ''} {formattedMaxValue}{' '}
						{!prefixedUnit ? unit : ''}
					</div>
				</div>
			</div>
			<div
				className={`ctx-progress__track ${getColorClassName(
					'background-color',
					colorBarBackground
				)}`}
			>
				<div
					className={`ctx-progress__bar ${getColorClassName(
						'background-color',
						colorBar
					)}`}
					style={{
						width: animate ? null : `${percent}%`,
					}}
				>
					{showValues && (
						<span className="ctx-progress__percent">
							{fullPercent}%
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default save;
