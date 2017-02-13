<?php

namespace ideasonpurpose;

class CaptionHoistClass
{
    public function __construct()
    {
        add_filter('mce_external_plugins', [$this, 'mce_load']);
    }

    public function mce_load($plugins)
    {
      $package_assets_url = get_stylesheet_directory_uri();
      $package_assets_url .= str_replace(get_stylesheet_directory(), '', dirname(__dir__));
      $package_assets_url .= '/assets/js/caption-hoist-class.js';
        $plugins['caption_hoist_class'] = $package_assets_url;
        return $plugins;
    }
}
