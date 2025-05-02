<?php
namespace Contexis\Blocks;

class Update {

    private $plugin_file;
    private $plugin_slug;
    private $repo_owner;
    private $repo_name;

    public function __construct(string $plugin_file, string $repo_owner, string $repo_name) {

        if ((defined('WP_DEBUG') && WP_DEBUG) || defined('CTX_DEV_SERVER')) {
            return;
        }

        $this->plugin_file = $plugin_file;
        $this->plugin_slug = plugin_basename($plugin_file);
        $this->repo_owner = $repo_owner;
        $this->repo_name = $repo_name;

        add_filter('site_transient_update_plugins', [$this, 'check_for_update']);
        add_filter('plugins_api', [$this, 'plugin_info'], 10, 3);
    }

    private function get_latest_release() : ?object {

        $cache_key = 'ghup_' . md5($this->repo_owner . '/' . $this->repo_name);
        $cached = get_transient($cache_key);

        if ($cached) return $cached;

        $response = wp_remote_get("https://api.github.com/repos/{$this->repo_owner}/{$this->repo_name}/releases/latest", [
            'timeout' => 5,
            'headers' => [
                'Accept' => 'application/vnd.github.v3+json',
                'User-Agent' => 'WordPress-Updater'
            ]
        ]);

        if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
            return null;
        }

        $body = json_decode(wp_remote_retrieve_body($response));
        set_transient($cache_key, $body, HOUR_IN_SECONDS);

        return $body;
    }

    public function check_for_update($transient) {
        if (empty($transient->checked[$this->plugin_slug])) {
            return $transient;
        }

        $release = $this->get_latest_release();
        if (!$release) return $transient;

        $remote_version = ltrim($release->tag_name, 'v');
        $current_version = $transient->checked[$this->plugin_slug];

        if (version_compare($remote_version, $current_version, '>')) {
            $plugin_data = get_plugin_data($this->plugin_file);

            $transient->response[$this->plugin_slug] = (object)[
                'slug' => dirname($this->plugin_slug),
                'plugin' => $this->plugin_slug,
                'new_version' => $remote_version,
                'url' => $plugin_data['PluginURI'],
                'package' => $release->zipball_url,
            ];
        }

        return $transient;
    }

    public function plugin_info($res, $action, $args) {
        if ($action !== 'plugin_information' || $args->slug !== dirname($this->plugin_slug)) {
            return $res;
        }

        $release = $this->get_latest_release();
        if (!$release) return $res;

        $info = new \stdClass();
        $info->name = basename(dirname($this->plugin_file));
        $info->slug = dirname($this->plugin_slug);
        $info->version = ltrim($release->tag_name, 'v');
        $info->author = 'Thomas Gollenia';
        $info->homepage = "https://github.com/{$this->repo_owner}/{$this->repo_name}";
        $info->download_link = $release->zipball_url;
        $info->sections = [
            'description' => $release->body ?? '',
            'changelog' => $release->body ?? '',
        ];

        return $info;
    }
}

