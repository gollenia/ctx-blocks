<?php

$classes = [ 'ctx__description-item' ];

$block_attributes = get_block_wrapper_attributes(
	[
		'class' => implode( ' ', array_filter( $classes ) ),
	]
);

$icon_color_slug = is_array( $attributes['iconColor'] ?? null )
	? ( $attributes['iconColor']['slug'] ?? '' )
	: ( $attributes['iconColor'] ?? '' );

$icon_background_color_slug = is_array( $attributes['iconBackgroundColor'] ?? null )
	? ( $attributes['iconBackgroundColor']['slug'] ?? '' )
	: ( $attributes['iconBackgroundColor'] ?? '' );

$image_classes = [
	'ctx__description-item-image',
	! empty( $attributes['icon'] ) && empty( $attributes['imageUrl'] ) && 'label' === $attributes['icon']
		? 'ctx__description-item-image-bullet'
		: '',
	$icon_color_slug ? 'has-' . sanitize_html_class( $icon_color_slug ) . '-color' : '',
	$icon_background_color_slug ? 'has-' . sanitize_html_class( $icon_background_color_slug ) . '-background-color' : '',
];

$image_style = [];

if ( ! empty( $attributes['customIconColor'] ) ) {
	$image_style[] = 'color:' . esc_attr( $attributes['customIconColor'] );
}

if ( ! empty( $attributes['customIconBackgroundColor'] ) ) {
	$image_style[] = 'background-color:' . esc_attr( $attributes['customIconBackgroundColor'] );
}

$image_style_attr = $image_style ? ' style="' . esc_attr( implode( ';', $image_style ) ) . '"' : '';

echo '<li ' . $block_attributes . '>';
echo '<div class="' . esc_attr( implode( ' ', array_filter( $image_classes ) ) ) . '"' . $image_style_attr . '>';

if ( ! empty( $attributes['imageUrl'] ) ) {
	echo '<img src="' . esc_url( $attributes['imageUrl'] ) . '" alt="" />';
} else {
		echo \Contexis\Blocks\Icons::render_icon( (string) ( $attributes['icon'] ?? '' ) );
}

echo '</div>';
echo '<div class="ctx__description-item__content">';
echo $content;
echo '</div>';

if ( ! empty( $attributes['url'] ) ) {
	echo '<a class="ctx__description-item__link" href="' . esc_url( $attributes['url'] ) . '" target="_blank" rel="noopener noreferrer">';
	if ( ! empty( $attributes['urlIcon'] ) ) {
			echo \Contexis\Blocks\Icons::render_icon( (string) $attributes['urlIcon'] );
	}
	echo '</a>';
}

echo '</li>';
