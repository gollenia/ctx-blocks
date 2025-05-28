<?php
$path = get_attached_file( $attributes['id'] );
if(!file_exists($path)) {
	error_log("SVG File $path not found", 0);
	return "";
}

$uid = uniqid('svg-');
$rules = [];
    
// Bedingungen und zugehörige Regeln
$styleMap = [
	['condition' => !empty($attributes['strokeColor']), 'rule' => "stroke: {$attributes['strokeColor']} !important;"],
	['condition' => !empty($attributes['fillColor']), 'rule' => "stroke: {$attributes['fillColor']} !important;"],
	['condition' => !empty($attributes['strokeWidth']), 'rule' => "stroke-width: {$attributes['strokeWidth']} !important;"],
];

// Schleife durch die Stile
foreach ($styleMap as $style) {
	if ($style['condition']) {
		$rules[] = $style['rule'];
	}
}

// Zusammenfügen der CSS-Regeln
$css = "#svg-{$uid} svg path {" . implode(' ', $rules) . "}";

$unit = $attributes['sizeInPercent'] ? '%' : 'px';

$tag = $attributes['linkUrl'] ? 'a' : 'div';
$style = "width: auto; display: flex; justify-content: {$attributes['imageAlignment']};";
$block_attributes = get_block_wrapper_attributes(['class' => 'ctx-svg-wrapper ' . $uid, 'style' => $style]);
$inner_style = "width: {$attributes['width']}{$unit}; height: {$attributes['height']}{$unit}; ";
?>

<?php if($attributes['linkUrl']) : ?>
<a href="<?php echo $attributes['linkUrl'] ?>" target="<?php echo $attributes['linkNewTab'] ? '_blank' : '' ?>" <?php echo $block_attributes; ?>>
<?php else : ?>
<div <?php echo $block_attributes; ?>>
<?php endif; ?>
	<style>
		.<?php echo $uid; ?> svg path {
			fill: <?php echo $attributes['fillColor'] ?>;
			stroke: <?php echo $attributes['strokeColor'] ?>;
		}
	</style>
	<div style="<?php echo $inner_style ?>"><?php echo file_get_contents($path); ?></div>
<?php echo $attributes['linkUrl'] ? "</a>" : "</div>";
