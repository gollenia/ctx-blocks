import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import IconSelector from '../../components/icon-selector';
import { RenderIconPreview, getBlockIcon, useBlockIcons } from '../../shared/icons';
import type { IconBlockProps } from './types';

export default function IconEdit({ attributes, setAttributes }: IconBlockProps) {
	const { icon, size, url, newTab, rel } = attributes;
	const { icons, isLoading } = useBlockIcons();
	const selectedIcon = getBlockIcon(icons, icon);

	const blockProps = useBlockProps({
		className: 'ctx-icon-block',
		style: {
			...((size ?? 24) > 0
				? {
						width: `${size}px`,
						height: `${size}px`,
				  }
				: {}),
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Icon', 'ctx-blocks')} initialOpen>
					<IconSelector
						value={icon || ''}
						onChange={(value) => setAttributes({ icon: value })}
					/>
					<RangeControl
						label={__('Size', 'ctx-blocks')}
						value={size}
						onChange={(value) =>
							setAttributes({ size: typeof value === 'number' ? value : 24 })
						}
						min={12}
						max={256}
						step={2}
					/>
				</PanelBody>
				<PanelBody title={__('Link', 'ctx-blocks')} initialOpen={false}>
					<TextControl
						label={__('URL', 'ctx-blocks')}
						value={url || ''}
						onChange={(value) => setAttributes({ url: value })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={__('Open in new tab', 'ctx-blocks')}
						checked={!!newTab}
						onChange={(value) => setAttributes({ newTab: value })}
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={__('Rel', 'ctx-blocks')}
						value={rel || ''}
						onChange={(value) => setAttributes({ rel: value })}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{isLoading ? null : (
					<RenderIconPreview
						icon={selectedIcon}
						className="ctx-icon-block__icon"
					/>
				)}
			</div>
		</>
	);
}
