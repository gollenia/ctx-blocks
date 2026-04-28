import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import type { DescriptionListProps } from './types';

const Inspector = ({ attributes, setAttributes }: DescriptionListProps) => {
	const { dividers } = attributes;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Appearance', 'ctx-blocks')}
				initialOpen={true}
			>
				<PanelRow>
					<ToggleControl
						label={__('Lines as separators', 'ctx-blocks')}
						checked={dividers}
						onChange={(value) => setAttributes({ dividers: value })}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
