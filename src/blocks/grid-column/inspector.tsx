import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import type { GridColumnProps } from './types';

const Inspector = ({ attributes, setAttributes }: GridColumnProps) => {
	const {
		widthSmall,
		widthLarge,
		widthMedium,
		mobilePosition,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Mobile appearance', 'ctx-blocks')}
				help={__('How should the column behave on small devices?')}
				initialOpen={true}
			>
				<RangeControl
					label={__('Column span on mobile devices', 'ctx-blocks')}
					max={3}
					min={0}
					onChange={(value) => {
						setAttributes({ widthSmall: value ?? 0 });
					}}
					value={widthSmall}
				/>
				<RangeControl
					label={__('Columns span on tablets and small displays', 'ctx-blocks')}
					max={12}
					min={0}
					onChange={(value) => {
						setAttributes({ widthMedium: value ?? 0 });
					}}
					value={widthMedium}
				/>
				<RangeControl
					label={__('Column span on Desktops', 'ctx-blocks')}
					max={12}
					min={0}
					onChange={(value) => {
						setAttributes({ widthLarge: value ?? 0 });
					}}
					value={widthLarge}
				/>

				<SelectControl
					label={__('Position on mobile devices', 'ctx-blocks')}
					value={mobilePosition}
					options={[
						{ label: __('In place', 'ctx-blocks'), value: '' },
						{ label: __('Start', 'ctx-blocks'), value: 'first' },
						{ label: __('End', 'ctx-blocks'), value: 'last' },
					]}
					onChange={(value) => {
						setAttributes({ mobilePosition: value });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
