<?php
/**
 * Rewrite the menu block output to match the theme's menu structure.
 */

namespace Contexis\Blocks;

class Posts {

	public static function init() : self {
		$instance = new self;
		add_filter( 'render_block', [$instance, 'ctx_blocks'], 10, 3 );
		return $instance;
	}

	public function ctx_blocks( string $block_content, array $block, \WP_Block $instance ) : string {

		switch ( $block['blockName'] ) {
			case 'core/latest-posts':
				$block_content = $this->ctx_posts( $block );
				break;
		}

		return $block_content;
	}

	public function ctx_posts( array $block ) : string {
		global $post;
		$default_attrs = [
			"displayPostContentRadio" => "excerpt",
			"postLayout" => "list",
			"excerptLength" => 55,
			"postsToShow" => 5,
			"order" => "desc",
			"orderBy" => "date",
			"columns" => 3

		];
		$attributes = array_merge($default_attrs, $block['attrs']);

		$args = array(
			'posts_per_page'      => $attributes['postsToShow'],
			'post_status'         => 'publish',
			'order'               => $attributes['order'],
			'orderby'             => $attributes['orderBy'],
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		);

		$block_core_latest_posts_excerpt_length = $attributes['excerptLength'];
		add_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length', 20 );

		if ( ! empty( $attributes['categories'] ) ) {
			$args['category__in'] = array_column( $attributes['categories'], 'id' );
		}
		if ( isset( $attributes['selectedAuthor'] ) ) {
			$args['author'] = $attributes['selectedAuthor'];
		}

		$query        = new \WP_Query();
		$recent_posts = $query->query( $args );
		if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
			update_post_thumbnail_cache( $query );
		}

		$list_items_markup = '';

		foreach ( $recent_posts as $post ) {
			$post_link = esc_url( get_permalink( $post ) );
			$title     = get_the_title( $post );
	
			if ( ! $title ) {
				$title = __( '(no title)' );
			}
			
			$list_items_markup .= '<li>';
	
			if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
				$image_style = '';
				if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
					$image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
				}
				if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
					$image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
				}
	
				$image_classes = 'wp-block-latest-posts__featured-image';
				if ( isset( $attributes['featuredImageAlign'] ) ) {
					$image_classes .= ' align' . $attributes['featuredImageAlign'];
				}
	
				$featured_image = get_the_post_thumbnail(
					$post,
					$attributes['featuredImageSizeSlug'],
					array(
						'style' => esc_attr( $image_style ),
					)
				);
				if ( $attributes['addLinkToFeaturedImage'] ) {
					$featured_image = sprintf(
						'<a href="%1$s" aria-label="%2$s">%3$s</a>',
						esc_url( $post_link ),
						esc_attr( $title ),
						$featured_image
					);
				}
				$list_items_markup .= sprintf(
					'<div class="%1$s">%2$s</div>',
					esc_attr( $image_classes ),
					$featured_image
				);
			} else {
				$list_items_markup .= '<div class="wp-block-latest-posts__featured-image-dummy"></div>';
			}

			$list_items_markup .= '<div class="wp-block-latest-posts__post-content">';
	
			$list_items_markup .= sprintf(
				'<a class="wp-block-latest-posts__post-title" href="%1$s">%2$s</a>',
				esc_url( $post_link ),
				$title
			);
	
			if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
				$author_display_name = get_the_author_meta( 'display_name', $post->post_author );
	
				/* translators: byline. %s: author. */
				$byline = sprintf( __( 'by %s' ), $author_display_name );
	
				if ( ! empty( $author_display_name ) ) {
					$list_items_markup .= sprintf(
						'<div class="wp-block-latest-posts__post-author">%1$s</div>',
						$byline
					);
				}
			}
	
			if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
				$list_items_markup .= sprintf(
					'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
					esc_attr( get_the_date( 'c', $post ) ),
					get_the_date( '', $post )
				);
			}

	
			if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
				&& isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {
					
				$trimmed_excerpt = get_the_excerpt( $post );
	
				/*
				 * Adds a "Read more" link with screen reader text.
				 * [&hellip;] is the default excerpt ending from wp_trim_excerpt() in Core.
				 */
				if ( str_ends_with( $trimmed_excerpt, ' [&hellip;]' ) ) {
					/** This filter is documented in wp-includes/formatting.php */
					$excerpt_length = (int) apply_filters( 'excerpt_length', $block_core_latest_posts_excerpt_length );
					if ( $excerpt_length <= $block_core_latest_posts_excerpt_length ) {
						$trimmed_excerpt  = substr( $trimmed_excerpt, 0, -11 );
						$trimmed_excerpt .= sprintf(
							/* translators: 1: A URL to a post, 2: Hidden accessibility text: Post title */
							__( '…' ),
							esc_url( $post_link ),
							esc_html( $title )
						);
					}
				}
	
				if ( post_password_required( $post ) ) {
					$trimmed_excerpt = __( 'This content is password protected.' );
				}
	
				$list_items_markup .= sprintf(
					'<div class="wp-block-latest-posts__post-excerpt">%1$s</div>',
					$trimmed_excerpt
				);
			}
	
			if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
				&& isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {
	
				$post_content = html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) );
	
				if ( post_password_required( $post ) ) {
					$post_content = __( 'This content is password protected.' );
				}
	
				$list_items_markup .= sprintf(
					'<div class="wp-block-latest-posts__post-full-content">%1$s</div>',
					wp_kses_post( $post_content )
				);
			}

			$list_items_markup .= '<div class="wp-block-latest-posts__post-more-link"><a href="' . esc_url( $post_link ) . '"><span>' . __( 'Read more' ) . '</span><i class="material-icons material-symbols-outlined">arrow_forward</i></a></div>';
	
			$list_items_markup .= "</div></li>\n";
		}

		remove_filter( 'excerpt_length', 'block_core_latest_posts_get_excerpt_length', 20 );

		$classes = array( 'wp-block-latest-posts', 'wp-block-latest-posts__list' );
		if ( isset( $attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
			$classes[] = 'is-grid';
		}
		if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
			$classes[] = 'columns-' . $attributes['columns'];
		}
		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$classes[] = 'has-dates';
		}
		if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
			$classes[] = 'has-author';
		}
		if ( isset( $attributes['style']['elements']['link']['color']['text'] ) ) {
			$classes[] = 'has-link-color';
		}

		$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => implode( ' ', $classes ) ) );

		return sprintf(
			'<ul %1$s>%2$s</ul>',
			$wrapper_attributes,
			$list_items_markup
		);

	}
	
	
}


Posts::init();