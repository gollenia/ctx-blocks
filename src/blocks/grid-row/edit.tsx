import {
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { Button, Icon, Placeholder } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import blockGapStyle from './blockGapStyle';
import icons from './icons';
import Inspector from './inspector';
import type { GridRowProps } from './types';

const ALLOWED_BLOCKS = ['ctx-blocks/grid-column'];

export default function GridRowEdit({ ...props }: GridRowProps) {
	const {
		className,
		clientId,
		attributes: { equalizer, divider, childrenWidthLarge },
	} = props;

	const [templateIndex, setTemplateIndex] = useState(0);

	const templates: [string, Record<string, unknown>?][][] = [
		[],
		[
			['ctx-blocks/grid-column'],
			['ctx-blocks/grid-column'],
			['ctx-blocks/grid-column'],
		],
		[
			['ctx-blocks/grid-column', { widthLarge: 2 }],
			['ctx-blocks/grid-column'],
		],
		[
			['ctx-blocks/grid-column'],
			['ctx-blocks/grid-column', { widthLarge: 2 }],
		],
	];

	const hasInnerBlocks = useSelect(
		(select: typeof import('@wordpress/data').select) => {
			const { getBlock } = select(blockEditorStore);
			const block = getBlock(clientId);
			return !!(block && block.innerBlocks.length);
		},
		[clientId]
	);

	const classes = [
		className,
		'ctx:row',
		hasInnerBlocks && 'ctx:row__columns',
		hasInnerBlocks && `ctx:row__columns--${childrenWidthLarge}`,
		equalizer ? 'ctx:row--equalize' : false,
		divider ? 'ctx:row--separator' : false,
	]
		.filter(Boolean)
		.join(' ');

	const blockProps = useBlockProps({ className: classes });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: templates[templateIndex],
		orientation: 'horizontal',
	});

	const style = {
		gap: blockGapStyle(props.attributes?.style?.spacing?.blockGap || '1.5rem'),
	};

	return (
		<>
			<Inspector {...props} />

			{!hasInnerBlocks && templateIndex === 0 ? (
				<div {...blockProps}>
					<Placeholder
						instructions={__(
							'Group blocks together. Select a layout:'
						)}
						label={__('Columns')}
					>
						<>
							<Button onClick={() => setTemplateIndex(1)}>
								<Icon
									width={44}
									height={44}
									icon={icons.threeEqual}
								/>
							</Button>
							<Button onClick={() => setTemplateIndex(2)}>
								<Icon
									width={44}
									height={44}
									icon={icons.twoLeft}
								/>
							</Button>
							<Button onClick={() => setTemplateIndex(3)}>
								<Icon
									width={44}
									height={44}
									icon={icons.twoRight}
								/>
							</Button>
						</>
					</Placeholder>
				</div>
			) : (
				<div
					{...innerBlocksProps}
					style={{ ...style, ...blockProps.style }}
				/>
			)}
		</>
	);
}
