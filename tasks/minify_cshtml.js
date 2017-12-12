/*
 * grunt-minify-cshtml
 * https://github.com/GordonApplepie/grunt-minify-cshtml
 *
 * Copyright (c) 2017 Gordon Mundt
 * Licensed under the MIT license.
 */

'use strict';

var minify = function (content, options, grunt) {
    if (grunt.util.kindOf(content) === "string") {
        if ((options !== undefined) && options.comments) {
            // <!--    - Match the start of the comment.
            // [\s\S]* - Match anything in between.
            // ?       - Or nothing at all.
            // -->     - Match the end of the comment.
            // g       - Match globally.
            content = content.replace(/<!--[\s\S]*?-->/g, '');
        }

        if ((options === undefined) || options.razorComments) {
            // @\*     - Match the start of the comment.
            // [\s\S]* - Match anything in between.
            // ?       - Or nothing at all.
            // \*@     - Match the end of the comment.
            // g       - Match globally.
            content = content.replace(/@\*[\s\S]*?\*@/g, '');
        }

        if ((options === undefined) || options.whitespace) {
            // >           - Match the end of a tag.
            // [\s]*       - Match any white-space.
            // \<          - Match the start of a tag.
            // (?!(\/pre)) - Do not match /pre. This stops removing white space between pre tags.
            // gi          - Match globally and case insensitive.
            content = content.replace(/>[\s]*<(?!(\/pre))/gi, '><'); //: />[\s]*\<(?!(\/pre))/gi
        }

        if ((options === undefined) || options.linebreaks) {
            content = content.replace(/[\r\n]{2,}/g, '\r\n');
            content = content.replace(/[\r]{2,}/g, '\r');
            content = content.replace(/[\n]{2,}/g, '\n');
        }
    }
    return content;
};

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('minify_cshtml', 'Minify ASP.NET Razor Views (.cshtml).', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            comments: true,
            razorComments: true,
            whitespace: true,
            linebreaks: true
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                var content = grunt.file.read(filepath);
                return minify(content, options, grunt);
            });

            // Write the destination file.
            grunt.file.write(f.dest, src);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
};
