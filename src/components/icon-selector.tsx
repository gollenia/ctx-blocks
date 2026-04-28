import { BaseControl, ComboboxControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	type BlockIconOption,
	getBlockIcon,
	getIconOptions,
	RenderIconPreview,
	useBlockIcons,
} from '../shared/icons';

type IconSelectorProps = {
	label?: string;
	value?: string;
	onChange: (value: string) => void;
	help?: string;
};

export default function IconSelector({
	label = __('Icon', 'ctx-blocks'),
	value = '',
	onChange,
	help,
}: IconSelectorProps) {
	const { icons, isLoading } = useBlockIcons();
	const selectedIcon = getBlockIcon(icons, value);

	return (
		<BaseControl label={label} help={help} __nextHasNoMarginBottom>
			<div className="ctx-icon-selector">
				<ComboboxControl
					label={label}
					hideLabelFromVision
					value={value}
					options={getIconOptions(icons, value)}
					onChange={onChange}
					isLoading={isLoading}
					placeholder={__('Search icons', 'ctx-blocks')}
					expandOnFocus
					allowReset
					__experimentalRenderItem={({
						item,
					}: {
						item: BlockIconOption;
					}) => (
						<div className="ctx-icon-selector__item">
							<RenderIconPreview
								icon={item.icon}
								className="ctx-icon-selector__item-icon"
							/>
							<span className="ctx-icon-selector__item-label">
								{item.label}
							</span>
						</div>
					)}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
				<div className="ctx-icon-selector__preview">
					{isLoading ? (
						<Spinner />
					) : (
						<RenderIconPreview
							icon={selectedIcon}
							className="ctx-icon-selector__icon"
						/>
					)}
				</div>
			</div>
		</BaseControl>
	);
}
