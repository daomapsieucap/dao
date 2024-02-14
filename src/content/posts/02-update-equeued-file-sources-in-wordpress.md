---
title: "Update equeued file sources in WordPress"
publishedAt: 2023-02-14
description: "Lorem ipsum dolor sit amet consectetur et ultrices blandit neque ege"
slug: "update-equeued-file-sources-in-wordpress"
isPublish: true
---

Today I have a problem when building obfuscation code for my team. After creating the uglify files, I need to replace all the original file sources with the uglify ones. The most important thing is I want the code still works with WP Rocket plugin.

After a quick research, I found that WordPress has many hooks to adjust the assets.

First of all, I think I need to list all the scripts and styles enqueued, so I found this link. It’s pretty cool that I can get all the things enqueued, but I can’t change the enqueued resources with this hook because it’s called when the resources already enqueued.

Because I just want to get all the enqueued scripts, so I tried with the filter script_loader_src which I’ve used to remove query string from some core WordPress scripts before. I think it’s the correct filter I need, it has the $source variable for me to update, and the $handle to filter out which scripts I need to replace. Cool! Let’s do the code!

The main purpose of this code is getting all the enqueued resources, filter out which has my theme prefix in the $handle to update the resource URL. The final code will be something like this:

```php
/**
 * Update enqueued resource in WordPress
 */
 
add_filter('script_loader_src', 'dc_update_resource_urls', 9999, 2);
function dc_update_resource_urls($src, $handle){
  // check if it's my theme scripts and it's not the minified files
  if(!is_admin() && strpos($src, 'min.js') === false){
    // do the replacement
    $src = str_replace('.js', '.min.js', $src);
  }
  return $src;
}
```