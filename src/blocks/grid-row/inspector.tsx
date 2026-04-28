import { InspectorControls } from '@wordpress/block-editor';
import {
	CheckboxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import type { GridRowProps } from './types';

const Inspector = ({ attributes, setAttributes }: GridRowProps) => {
	const {
		equalizer,
		divider,
		childrenWidthLarge,
		childrenWidthSmall,
		childrenWidthMedium,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Appearance', 'ctx-blocks')}
				initialOpen={true}
			>
				<RangeControl
					label={__('Columns on mobile devices', 'ctx-blocks')}
					max={3}
					min={1}
					onChange={(value) => {
						setAttributes({ childrenWidthSmall: value ?? 1 });
					}}
					value={childrenWidthSmall}
				/>
				<RangeControl
					label={__('Columns on tablets and medium screens', 'ctx-blocks')}
					max={6}
					min={1}
					onChange={(value) => {
						setAttributes({ childrenWidthMedium: value ?? 1 });
					}}
					value={childrenWidthMedium}
				/>
				<RangeControl
					label={__('Columns on desktops', 'ctx-blocks')}
					max={6}
					min={1}
					onChange={(value) => {
						setAttributes({ childrenWidthLarge: value ?? 1 });
					}}
					value={childrenWidthLarge}
				/>

				<CheckboxControl
					label={__('Make all columns same height', 'ctx-blocks')}
					checked={equalizer}
					onChange={(value) => {
						setAttributes({ equalizer: value });
					}}
				/>
				<CheckboxControl
					label={__('Separate columns with borders', 'ctx-blocks')}
					checked={divider}
					onChange={(value) => {
						setAttributes({ divider: value });
					}}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
