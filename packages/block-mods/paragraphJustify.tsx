import { BlockControls } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { alignJustify } from '@wordpress/icons';
import { addFilter } from '@wordpress/hooks';
import type { BlockEditProps, BlockSettings } from './types';

type ParagraphAttributes = {
	justifyText?: boolean;
	className?: string;
};

const addParagraphAttribute = (props: BlockSettings, name: string) => {
	if (name !== 'core/paragraph') {
		return props;
	}

	const attributes = {
		...props.attributes,
		justifyText: {
			type: 'boolean',
			default: false,
		},
	};

	return { ...props, attributes };
};

addFilter(
	'blocks.registerBlockType',
	'ctx-blocks/paragraph',
	addParagraphAttribute
);

const withParagraphControl = createHigherOrderComponent(
	(BlockEdit: (props: BlockEditProps<ParagraphAttributes>) => JSX.Element) => {
		return (props: BlockEditProps<ParagraphAttributes>) => {
			if (props.name !== 'core/paragraph') {
				return <BlockEdit {...props} />;
			}

			const { attributes, setAttributes } = props;
			const { justifyText } = attributes;

			props.attributes.className = justifyText ? 'wp-justify' : '';

			return (
				<>
					<BlockEdit {...props} />
					<BlockControls>
						<ToolbarButton
							icon={alignJustify}
							title={__('Justify text', 'ctx-blocks')}
							isActive={justifyText}
							onClick={() => {
								setAttributes({
									justifyText: !justifyText,
									className: justifyText ? '' : 'wp-justify',
								});
							}}
						/>
					</BlockControls>
				</>
			);
		};
	},
	'withParagraphControl'
);

addFilter('editor.BlockEdit', 'ctx-blocks/paragraph', withParagraphControl);
