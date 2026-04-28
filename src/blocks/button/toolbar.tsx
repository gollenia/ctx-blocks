import {
	AlignmentControl,
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { Popover, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link, pullLeft, pullRight, seen, unseen } from '@wordpress/icons';

import type { ButtonProps } from './types';

const Toolbar = ({ attributes, setAttributes }: ButtonProps) => {
	const [isEditingURL, setIsEditingURL] = useState(false);
	const { url, newTab, rel, action, iconRight, iconOnly, icon } = attributes;

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={iconRight ? 'right' : 'left'}
					onChange={(value) => {
						setAttributes({
							iconRight: value === 'right',
						});
					}}
					alignmentControls={[
						{
							icon: pullLeft,
							title: __('Align icon left', 'ctx-blocks'),
							align: 'left',
						},
						{
							icon: pullRight,
							title: __('Align icon right', 'ctx-blocks'),
							align: 'right',
						},
					]}
					label={__('Icon alignment', 'ctx-blocks')}
				/>
				{action === 'link' && (
					<ToolbarButton
						name="link"
						icon={link}
						title={__('Link', 'ctx-blocks')}
						onClick={() => setIsEditingURL(true)}
					/>
				)}
				{icon && (
					<ToolbarButton
						name="iconOnly"
						icon={iconOnly ? unseen : seen}
						title={__('Hide text', 'ctx-blocks')}
						isActive={iconOnly}
						onClick={() => setAttributes({ iconOnly: !iconOnly })}
					/>
				)}
			</BlockControls>
			{isEditingURL && (
				<Popover
					placement="bottom"
					onClose={() => {
						setIsEditingURL(false);
					}}
					focusOnMount={isEditingURL ? 'firstElement' : false}
					__unstableSlotName="__unstable-block-tools-after"
					shift
				>
					<LinkControl
						value={{ url, opensInNewTab: newTab }}
						onChange={(linkObject: {
							url?: string;
							opensInNewTab?: boolean;
							noFollow?: boolean;
						}) =>
							setAttributes({
								rel,
								url: linkObject.url,
								newTab: linkObject.opensInNewTab,
							})
						}
						onRemove={() => {
							setAttributes({
								url: '',
								newTab: false,
							});
						}}
						forceIsEditingLink={isEditingURL}
					/>
				</Popover>
			)}
		</>
	);
};

export default Toolbar;
