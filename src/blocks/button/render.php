<?php


$tag = $attributes['action'] === 'link' && $attributes['url'] ? 'a' : 'button';
$id = uniqid();
$href = $attributes['url'] ? 'href="' . $attributes['url'] . '"' : '';
$target = $attributes['newTab'] ? 'target="_blank"' : '';
$button_id = $attributes['action'] == "modal" ? "data-modal=\"{$id}\"" : "id=\"{$id}\"";

$classNames = [
	'button ctx__button',
	$attributes['iconOnly'] ? 'ctx__button--icon-only' : '',
	$attributes['iconRight'] ? 'ctx__button--reverse' : '',
];

$block_attributes = get_block_wrapper_attributes(['class' => join(" ", $classNames)]);

echo "<div class='button-container'>";
echo '<' . join(" ", [$tag, $href, $block_attributes, $button_id, $target]) . '>';

if($attributes['icon']) {
		echo \Contexis\Blocks\Icons::render_icon( $attributes['icon'] );
} 
if(!$attributes['iconOnly']) {
	echo "{$attributes['title']}";
}


echo '</' . $tag . '>';
echo "</div>";
if($attributes['script']) {
	$command = 'classList.add("ctx-button-hidden");';
	switch ($attributes['script']) {
		case 'toggle':
			$command = 'classList.toggle("ctx-button-hidden");';
			break;
		case 'show':
			$command = 'classList.remove("ctx-button-hidden");';
			break;
		case 'hide':
			$command = 'classList.add("ctx-button-hidden");';
			break;
		case 'scroll':
			$command = 'scrollIntoView({behavior: "smooth"});';
		default:
			return '';
	}
	$script = 'document.getElementById("'.$attributes['scriptTarget'].'")?.' . $command ;
	

	add_action('wp_footer', function() use ($script, $id) {
		?>
		<script>
			document.addEventListener("DOMContentLoaded", function() {
				document.getElementById("<?php echo $id ?>").addEventListener("click", function() {
					<?php echo $script; ?>
				});
			});
		</script>
		<?php
	});

}

if($attributes['action'] == "modal") {
	add_action('wp_footer', function() use ($attributes, $content, $id) {
		?>
		<div id="<?php echo $id ?>" class="modal"> 
			
			
			<div class="modal__dialog">
				<div class="modal__header">
					<div class="modal__title"><h2><?php echo $attributes['modalTitle']; ?></h2><button @click="showModal = false" class="modal__close"></button></div>
					
				</div>
				<div class="modal__content">
					
						<?php echo $content; ?>
						
				</div>
			</div>
		</div> 
		<?php
	});
}
