<?php

namespace ideasonpurpose;

class CaptionHoistClass
{
    public function __construct()
    {
        add_filter('', [$this, 'mce_load']);
    }

    public function mce_load($plugins)
    {
      $plugins['caption-hoist-class'] = plugins_url('caption-hoist-class', __file__);
      return $plugins;
    }
}
