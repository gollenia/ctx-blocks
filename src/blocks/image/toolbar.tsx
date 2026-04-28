import {
	BlockControls,
	__experimentalLinkControl as LinkControl,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

import { Popover, ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { link } from '@wordpress/icons';
import { ALLOWED_MEDIA_TYPES } from './common';
import type { ImageProps, MediaLike } from './types';

type ToolbarProps = ImageProps & {
	onSelectMedia: (media?: MediaLike) => void;
};

const Toolbar = (props: ToolbarProps) => {
	const {
		attributes: { imageUrl, imageId, url, newTab, rel },
		setAttributes,
		onSelectMedia,
	} = props;

	const [isEditingURL, setIsEditingURL] = useState(false);

	return (
		<>
			<BlockControls>
				<BlockControls group="other">
					<MediaReplaceFlow
						mediaId={imageId}
						mediaURL={imageUrl}
						allowedTypes={ALLOWED_MEDIA_TYPES}
						accept="image/*,video/*"
						onSelect={onSelectMedia}
						name={
							!imageUrl
								? __('Add Media', 'ctx-blocks')
								: __('Replace', 'ctx-blocks')
						}
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
			</BlockControls>
			{isEditingURL && (
				<Popover
					placement="bottom"
					onClose={() => {
						setIsEditingURL(false);
					}}
					focusOnMount={isEditingURL ? 'firstElement' : false}
					__unstableSlotName={'__unstable-block-tools-after'}
					shift
				>
					<LinkControl
						value={{ url, opensInNewTab: newTab }}
						onChange={(linkObject) =>
							setAttributes({
								rel: linkObject.rel ?? rel,
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
