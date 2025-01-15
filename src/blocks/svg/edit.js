import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useMemo, useState } from '@wordpress/element';
import Inspector from './inspector';
import Toolbar from './toolbar';

const Edit = (props) => {
	const {
		attributes: {
			url,
			id,
			width,
			height,
			syncHeight,
			strokeWidth,
			imageAlignment,
			sizeInPercent,
		},
		setAttributes,
		toggleSelection,
		strokeColor,
		fillColor,
	} = props;

	const [svgData, setSvgData] = useState(null);

	const onSelectMedia = (media) => {
		if (!media || !media.url) {
			setAttributes({
				url: undefined,
				fileId: undefined,
			});
			return;
		}

		setAttributes({
			url: media.sizes?.large?.url ?? media.url,
			id: media.id,
		});
	};

	useEffect(() => {
		if (!url) {
			return;
		}

		fetch(url)
			.then((response) => response.text())
			.then((data) => {
				setSvgData(data);
			});
	}, [url]);

	const blockProps = useBlockProps({
		className: 'ctx-svg',
		style: { justifyContent: imageAlignment },
	});

	const svgStyle = {
		width: width + (sizeInPercent ? '%' : 'px'),
		height: height + (sizeInPercent ? '%' : 'px'),
		justifySelf: 'center',
	};

	const getInlineStyle = () => {
		const styles = [
			strokeColor.color && `stroke: ${strokeColor.color} !important;`,
			fillColor.color && `fill: ${fillColor.color} !important;`,
			strokeWidth && `stroke-width: ${strokeWidth} !important;`,
		].filter(Boolean);

		return `#svg-${id} svg path { ${styles.join(' ')} }`;
	};

	const inlineStyle = useMemo(
		() => getInlineStyle(),
		[strokeColor, fillColor, strokeWidth]
	);

	return (
		<>
			<Inspector {...props} />
			<Toolbar {...props} onSelectMedia={onSelectMedia} />
			<style scoped>{inlineStyle}</style>
			<figure {...blockProps}>
				{svgData && (
					<div
						className="ctx-svg-container"
						id={'svg-' + id}
						style={svgStyle}
						dangerouslySetInnerHTML={{
							__html: svgData,
						}}
					/>
				)}
			</figure>
		</>
	);
};

export default Edit;
