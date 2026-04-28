import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

export type BlockIconDefinition = {
	name: string;
	label: string;
	svg: string;
	url: string;
	source: string;
};

export type BlockIconOption = {
	label: string;
	value: string;
	icon?: BlockIconDefinition;
};

let cachedIcons: BlockIconDefinition[] | null = null;
let cachedRequest: Promise<BlockIconDefinition[]> | null = null;

function sortIcons(icons: BlockIconDefinition[]) {
	return [...icons].sort((left, right) => left.label.localeCompare(right.label));
}

export async function fetchBlockIcons() {
	if (cachedIcons) {
		return cachedIcons;
	}

	if (!cachedRequest) {
		cachedRequest = apiFetch<BlockIconDefinition[]>({
			path: '/ctx-blocks/v1/icons',
		}).then((icons) => {
			cachedIcons = sortIcons(Array.isArray(icons) ? icons : []);
			return cachedIcons;
		});
	}

	return cachedRequest;
}

export function useBlockIcons() {
	const [icons, setIcons] = useState<BlockIconDefinition[]>(cachedIcons ?? []);
	const [isLoading, setIsLoading] = useState(!cachedIcons);

	useEffect(() => {
		let isMounted = true;

		fetchBlockIcons()
			.then((nextIcons) => {
				if (!isMounted) {
					return;
				}
				setIcons(nextIcons);
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return { icons, isLoading };
}

export function getIconOptions(
	icons: BlockIconDefinition[],
	currentValue = ''
): BlockIconOption[] {
	const options = [
		{
			label: __('No icon', 'ctx-blocks'),
			value: '',
			icon: undefined,
		},
		...icons.map((icon) => ({
			label: icon.label,
			value: icon.name,
			icon,
		})),
	];

	if (currentValue && !icons.some((icon) => icon.name === currentValue)) {
		options.push({
			label: sprintf(
				/* translators: %s is a missing icon identifier. */
				__('Missing icon: %s', 'ctx-blocks'),
				currentValue
			),
			value: currentValue,
			icon: undefined,
		});
	}

	return options;
}

export function getBlockIcon(
	icons: BlockIconDefinition[],
	name?: string
) {
	return icons.find((icon) => icon.name === name);
}

type RenderIconPreviewProps = {
	icon?: BlockIconDefinition;
	className?: string;
};

export function RenderIconPreview({
	icon,
	className,
}: RenderIconPreviewProps) {
	if (!icon) {
		return null;
	}

	return (
		<span
			className={className}
			aria-hidden="true"
			dangerouslySetInnerHTML={{ __html: icon.svg }}
		/>
	);
}
