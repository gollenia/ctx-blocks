<?php

$size = isset( $attributes['size'] ) ? (int) $attributes['size'] : 24;
$size = $size > 0 ? $size : 24;

$style = sprintf( 'width:%1$spx;height:%1$spx;', $size );

$block_attributes = get_block_wrapper_attributes(
	[
		'class' => 'ctx-icon-block',
		'style' => $style,
	]
);

$tag = ! empty( $attributes['url'] ) ? 'a' : 'span';
$href = ! empty( $attributes['url'] ) ? ' href="' . esc_url( $attributes['url'] ) . '"' : '';
$target = ! empty( $attributes['newTab'] ) ? ' target="_blank"' : '';
$rel_parts = [];

if ( ! empty( $attributes['newTab'] ) ) {
	$rel_parts[] = 'noopener';
}

if ( ! empty( $attributes['rel'] ) ) {
	$rel_parts[] = (string) $attributes['rel'];
}

$rel = $rel_parts ? ' rel="' . esc_attr( implode( ' ', array_unique( $rel_parts ) ) ) . '"' : '';

echo '<' . $tag . ' ' . $block_attributes . $href . $target . $rel . '>';
echo \Contexis\Blocks\Icons::render_icon( (string) ( $attributes['icon'] ?? '' ), [ 'class' => 'ctx-icon-block__icon' ] );
echo '</' . $tag . '>';
