jQuery Flyout
=============

Flyout is a piece of content that fly out of a parent when some action occurs,
for example, when box is clicked.

Installation
------------

The recommended installation method is a [bower](http://bower.io):

```sh
bower install --save jquery-flyout
```

Usage
-----

```html
<style>
  .flyout {
    display: none;
  }
  .flyout.is-opened {
    display: block;
  }
</style>

<div class="has-flyout">
  <div class="js-flyout-open">Show flyout</div>
  <div class="flyout">Hello <span class="js-flyout-close">× close</span></div>
</div>

<script>
  (function() {
    $('.has-flyout').flyout({trigger: {open: 'js-flyout-open',
                                       close: 'js-flyout-close'}});
  }());
</script>
```

License
-------

Licensed under the [MIT license](http://mit-license.org/vitalk).
