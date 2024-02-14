---
title: "Customize WordPress Database Error Page"
publishedAt: 2024-02-14
description: "Easy way to customize the database error message from WordPress"
slug: "customize-wordpress-database-error-page"
isPublish: true
---

When doing some research for the new version of my Fiber Admin WordPress plugin, I found that in the core code of WordPress, they allow us to override the default Database Error Page. It will tell the whole world that you’re using WordPress and your website is having some problems with the database connection 👎.

## Follow clue from WordPress

Luckily, WordPress has feature to allow us to customize this default page. Let’s give it a try!

Follow the instruction I found with CSS Tricks here. I found that we can customize the DB Error page by a file called `db-error.php` in `wp-content`. But why this file?

In `wp-includes/functions.php`, WordPress has a function called dead_db which you can see they will allow us to load custom template for the Database Error Page, the custom template will be named with `wp-content/db-error.php`.

## Tips

With `db-error.php`, we can add inline CSS and customize the content of this page, so it will look different from the default DB Error Page which is applied to all the other WordPress pages.

Some tips I found:

- You may want to put your logo image on this page so the users will know exactly which error message is belong to.
- Make sure to include the error code like 503 on this page. It’s for DB error message, so the error code should be 503. It will help you know exactly what happened with your site.
- Some security plugins can prevent displaying the db-error.php file. For example, Sucuri Hardening option can prevent this custom file display because they harden all the PHP files inside wp-content folder. You may need to add extra rules to exclude the db-error.php file.