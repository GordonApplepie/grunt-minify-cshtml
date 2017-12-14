# grunt-minify-cshtml

> Minify ASP.NET Razor Views (.cshtml).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-minify-cshtml --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-minify-cshtml');
```

## The "minify_cshtml" task

### Overview
In your project's Gruntfile, add a section named `minify_cshtml` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  minify_cshtml: {
    options: {
      comments: true,		// strip comments <!-- -->
      razorComments: true,	// strip razor comments @* *@
      whitespace: true,		// strip whitespaces inbetween markup ><
      linebreaks: true,		// strip double linebreaks \n\n
      dir: 'test',			// base directory usually "Views"
      filetype: '.cshtml',	// filetypes to be replaced
      test: true			// test mode if false it will overwrite the files
    }
  },
});
```

### Usage Examples

#### Default Options
In this example, the default options are used to do convert all cshtml markup pages.

```js
grunt.initConfig({
  minify_cshtml: {
    options: {
      comments: true,
      razorComments: true,
      whitespace: true,
      linebreaks: true,
      dir: 'Views',
      filetype: '.cshtml',
      test: false
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
