import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { RenderIconPreview, getBlockIcon, useBlockIcons } from '../../shared/icons';
import Inspector from './inspector';
import Toolbar from './toolbar';
import type { ButtonProps } from './types';

export default function ButtonEdit({ ...props }: ButtonProps) {
	const {
		attributes: {
			title,
			size,
			modalTitle,
			modalFull,
			action,
			icon,
			iconRight,
			iconOnly,
		},
		setAttributes,
		className,
	} = props;

	const [deleteButton, setDeleteButton] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { icons } = useBlockIcons();

	const hasModal = action === 'modal';
	const template: [string][] = [['core/paragraph']];
	const selectedIcon = getBlockIcon(icons, icon);

	const buttonClasses = [
		className || false,
		'ctx__button',
		iconRight ? 'reverse' : false,
		iconOnly ? 'icon-only' : false,
		size || false,
	]
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps({ className: buttonClasses });

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<Toolbar {...props} />
			<span
				onClick={() => {
					if (!hasModal) {
						return;
					}
					setShowModal(true);
				}}
			>
				{icon && (
					<RenderIconPreview icon={selectedIcon} className="ctx-icon" />
				)}
				{!iconOnly && (
					<RichText
						tagName="span"
						value={title}
						disableLineBreaks={true}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Button title', 'ctx-blocks')}
						allowedFormats={['core/bold', 'core/italic']}
						onKeyUp={(event) => {
							if (event.keyCode === 13) {
								if (title === '') {
									return;
								}
								event.preventDefault();
								const newBlock = createBlock('core/paragraph', {});
								props.insertBlocksAfter?.(newBlock);
							}
							if (event.keyCode === 8 && title === '') {
								event.preventDefault();
								if (deleteButton) {
									setDeleteButton(false);
									props.onRemove?.();
									return;
								}
								setDeleteButton(true);
							}
						}}
					/>
				)}
			</span>

			{showModal && (
				<Modal
					title={__('Edit Modal content', 'ctx-blocks')}
					isOpen={showModal}
					onRequestClose={() => {
						setShowModal(false);
					}}
					isFullScreen={modalFull}
				>
					<RichText
						tagName="h1"
						value={modalTitle}
						onChange={(value) =>
							setAttributes({ modalTitle: value })
						}
						placeholder={__('Modal title', 'ctx-blocks')}
						allowedFormats={['core/bold', 'core/italic']}
					/>
					<InnerBlocks template={template} />
				</Modal>
			)}
		</div>
	);
}
