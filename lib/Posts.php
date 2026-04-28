<?php
/**
 * Rewrite the latest posts block output to match the theme's structure.
 */

namespace Contexis\Blocks;

final class Posts {

	private const DEFAULT_BLOCK_ATTRIBUTES = [
		'displayPostContentRadio' => 'excerpt',
		'postLayout'              => 'list',
		'excerptLength'           => 55,
		'postsToShow'             => 5,
		'order'                   => 'desc',
		'orderBy'                 => 'date',
		'columns'                 => 3,
	];

	public static function init() : self {
		$instance = new self();
		add_filter( 'render_block', [ $instance, 'filter_latest_posts_block' ], 10, 3 );

		return $instance;
	}

	public function filter_latest_posts_block( string $block_content, array $block, \WP_Block $instance ) : string {
		if ( 'core/latest-posts' !== ( $block['blockName'] ?? '' ) ) {
			return $block_content;
		}

		return $this->render_latest_posts_block( $block );
	}

	private function render_latest_posts_block( array $block ) : string {
		$attributes = array_merge( self::DEFAULT_BLOCK_ATTRIBUTES, $block['attrs'] ?? [] );
		$query      = new \WP_Query();
		$posts      = $query->query( $this->get_query_args( $attributes ) );

		if ( $this->has_enabled_attribute( $attributes, 'displayFeaturedImage' ) ) {
			update_post_thumbnail_cache( $query );
		}

		$excerpt_length = (int) $attributes['excerptLength'];
		add_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length', 20 );

		try {
			$list_items_markup = implode(
				'',
				array_map(
					fn( \WP_Post $post ) : string => $this->render_post_list_item( $post, $attributes, $excerpt_length ),
					$posts
				)
			);
		} finally {
			remove_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length', 20 );
		}

			$wrapper_attributes = get_block_wrapper_attributes(
				[ 'class' => implode( ' ', $this->get_wrapper_classes( $attributes ) ) ]
			);

		return sprintf(
			'<ul %1$s>%2$s</ul>',
			$wrapper_attributes,
			$list_items_markup
		);
	}

	private function get_query_args( array $attributes ) : array {
		$query_args = [
			'posts_per_page'      => $attributes['postsToShow'],
			'post_status'         => 'publish',
			'order'               => $attributes['order'],
			'orderby'             => $attributes['orderBy'],
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		];

		if ( ! empty( $attributes['categories'] ) ) {
			$query_args['category__in'] = array_column( $attributes['categories'], 'id' );
		}

		if ( isset( $attributes['selectedAuthor'] ) ) {
			$query_args['author'] = $attributes['selectedAuthor'];
		}

		return $query_args;
	}

	private function render_post_list_item( \WP_Post $post, array $attributes, int $excerpt_length ) : string {
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post ) ?: __( '(no title)' );

		return implode(
				'',
				[
					'<li>',
					$this->render_post_thumbnail( $post, $attributes, $post_link, $title ),
					'<div class="wp-block-latest-posts__post-content">',
					$this->render_post_title_link( $post_link, $title ),
					$this->render_post_author( $post, $attributes ),
					$this->render_post_date( $post, $attributes ),
					$this->render_post_body( $post, $attributes, $excerpt_length ),
					$this->render_post_read_more_link( $post_link ),
					'</div></li>' . "\n",
				]
			);
	}

	private function render_post_thumbnail( \WP_Post $post, array $attributes, string $post_link, string $title ) : string {
		if ( ! $this->has_enabled_attribute( $attributes, 'displayFeaturedImage' ) || ! has_post_thumbnail( $post ) ) {
			return '<div class="wp-block-latest-posts__featured-image-dummy"></div>';
		}

		$image_style   = $this->get_thumbnail_style( $attributes );
		$image_classes = implode(
			' ',
			array_filter(
				[
					'wp-block-latest-posts__featured-image',
					isset( $attributes['featuredImageAlign'] ) ? 'align' . $attributes['featuredImageAlign'] : '',
				]
			)
		);

		$featured_image = isset( $attributes['featuredImageSizeSlug'] )
			? get_the_post_thumbnail(
				$post,
				$attributes['featuredImageSizeSlug'],
				[
					'style' => esc_attr( $image_style ),
				]
			)
				: '';

		if ( $this->has_enabled_attribute( $attributes, 'addLinkToFeaturedImage' ) ) {
			$featured_image = sprintf(
				'<a href="%1$s" aria-label="%2$s">%3$s</a>',
				$post_link,
				esc_attr( $title ),
				$featured_image
			);
		}

		return sprintf(
			'<div class="%1$s">%2$s</div>',
			esc_attr( $image_classes ),
			$featured_image
		);
	}

	private function get_thumbnail_style( array $attributes ) : string {
		$styles = [];

		if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
			$styles[] = sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
		}

		if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
			$styles[] = sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
		}

		return implode( '', $styles );
	}

	private function render_post_title_link( string $post_link, string $title ) : string {
		return sprintf(
			'<a class="wp-block-latest-posts__post-title" href="%1$s">%2$s</a>',
			$post_link,
			$title
		);
	}

	private function render_post_author( \WP_Post $post, array $attributes ) : string {
		if ( ! $this->has_enabled_attribute( $attributes, 'displayAuthor' ) ) {
			return '';
		}

		$author_display_name = get_the_author_meta( 'display_name', $post->post_author );

		if ( empty( $author_display_name ) ) {
			return '';
		}

		$byline = sprintf(
			/* translators: byline. %s: author. */
			__( 'by %s' ),
			$author_display_name
		);

		return sprintf(
			'<div class="wp-block-latest-posts__post-author">%1$s</div>',
			$byline
		);
	}

	private function render_post_date( \WP_Post $post, array $attributes ) : string {
		if ( ! $this->has_enabled_attribute( $attributes, 'displayPostDate' ) ) {
			return '';
		}

		return sprintf(
			'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
			esc_attr( get_the_date( 'c', $post ) ),
			get_the_date( '', $post )
		);
	}

	private function render_post_body(
		\WP_Post $post,
		array $attributes,
		int $excerpt_length
	) : string {
		if ( ! $this->has_enabled_attribute( $attributes, 'displayPostContent' ) ) {
			return '';
		}

		return match ( $attributes['displayPostContentRadio'] ?? '' ) {
			'excerpt'   => $this->render_post_excerpt( $post, $excerpt_length ),
			'full_post' => $this->render_post_full_content( $post ),
			default     => '',
		};
	}

	private function render_post_excerpt( \WP_Post $post, int $excerpt_length ) : string {
		return sprintf(
			'<div class="wp-block-latest-posts__post-excerpt">%1$s</div>',
			$this->get_post_excerpt_html( $post, $excerpt_length )
		);
	}

	private function render_post_full_content( \WP_Post $post ) : string {
		return sprintf(
			'<div class="wp-block-latest-posts__post-full-content">%1$s</div>',
			wp_kses_post( $this->get_post_content_html( $post ) )
		);
	}

	private function get_post_excerpt_html( \WP_Post $post, int $excerpt_length ) : string {
		if ( post_password_required( $post ) ) {
			return __( 'This content is password protected.' );
		}

		$excerpt = get_the_excerpt( $post );

		if ( ! str_ends_with( $excerpt, ' [&hellip;]' ) ) {
			return $excerpt;
		}

		$filtered_excerpt_length = (int) apply_filters( 'excerpt_length', $excerpt_length );

		if ( $filtered_excerpt_length > $excerpt_length ) {
			return $excerpt;
		}

		return substr( $excerpt, 0, -11 ) . __( '…' );
	}

	private function get_post_content_html( \WP_Post $post ) : string {
		if ( post_password_required( $post ) ) {
			return __( 'This content is password protected.' );
		}

		return html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) );
	}

	private function render_post_read_more_link( string $post_link ) : string {
		return sprintf(
			'<div class="wp-block-latest-posts__post-more-link"><a href="%1$s"><span>%2$s</span>%3$s</a></div>',
			$post_link,
				__( 'Read more' ),
				Icons::render_icon( 'arrow_forward' )
			);
	}

	private function get_wrapper_classes( array $attributes ) : array {
		$is_grid = 'grid' === ( $attributes['postLayout'] ?? '' );

		return array_filter(
			[
				'wp-block-latest-posts',
				'wp-block-latest-posts__list',
				$is_grid ? 'is-grid' : '',
				$is_grid ? 'columns-' . $attributes['columns'] : '',
					$this->has_enabled_attribute( $attributes, 'displayPostDate' ) ? 'has-dates' : '',
					$this->has_enabled_attribute( $attributes, 'displayAuthor' ) ? 'has-author' : '',
					isset( $attributes['style']['elements']['link']['color']['text'] ) ? 'has-link-color' : '',
				]
			);
	}

	private function has_enabled_attribute( array $attributes, string $key ) : bool {
		return ! empty( $attributes[ $key ] );
	}
}

Posts::init();
