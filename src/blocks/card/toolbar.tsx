import {
	AlignmentToolbar,
	BlockControls,
	__experimentalLinkControl as LinkControl,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { Popover, ToolbarButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link } from '@wordpress/icons';

import type { CardProps, MediaLike } from './types';

const ALLOWED_MEDIA_TYPES = ['image', 'video'];

type ToolbarProps = CardProps & {
	onSelectMedia: (media?: MediaLike) => void;
};

const Toolbar = ({ attributes, setAttributes, onSelectMedia }: ToolbarProps) => {
	const { textAlign, imageId, imageUrl, url, opensInNewTab, rel } =
		attributes as CardProps['attributes'] & {
			textAlign?: string;
			opensInNewTab?: boolean;
			rel?: string;
		};

	const [isEditingURL, setIsEditingURL] = useState(false);

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(value) => setAttributes({ textAlign: value } as never)}
				/>
			</BlockControls>
			<BlockControls group="other">
				<MediaReplaceFlow
					mediaId={imageId}
					mediaURL={imageUrl}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					accept="image/*,video/*"
					onSelect={onSelectMedia}
					name={!imageUrl ? __('Add Media', 'ctx-blocks') : __('Replace', 'ctx-blocks')}
				/>
				{imageUrl && (
					<ToolbarButton
						icon="trash"
						title={__('Remove Media', 'ctx-blocks')}
						onClick={() => {
							setAttributes({
								imageId: 0,
								imageUrl: '',
								focalPoint: undefined,
							});
						}}
					/>
				)}
				<ToolbarButton
					name="link"
					icon={link}
					title={__('Link', 'ctx-blocks')}
					onClick={() => setIsEditingURL(true)}
				/>
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
						value={{ url, opensInNewTab }}
						onChange={(linkObject: { url?: string; opensInNewTab?: boolean }) =>
							setAttributes({
								rel,
								url: linkObject.url,
								opensInNewTab: linkObject.opensInNewTab,
							} as never)
						}
						onRemove={() => {
							setAttributes({
								url: '',
								opensInNewTab: false,
							} as never);
						}}
						forceIsEditingLink={isEditingURL}
					/>
				</Popover>
			)}
		</>
	);
};

export default Toolbar;
