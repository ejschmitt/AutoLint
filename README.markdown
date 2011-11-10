This is a jQuery plugin for running Douglas Crockford's JSLint ([http://www.jslint.com/](http://www.jslint.com/)) on script tags you specify. JSLint is required and is included in this repo but the most recent version can be found on the JSLint site: [https://github.com/douglascrockford/JSLint](https://github.com/douglascrockford/JSLint)

This runs in the browser, so it will be slower then using something on the machine like rhino. However this requires nothing else to be installed/maintained besides the browser.

Use like so:
`jQuery('.autolint').autolint();`

to run any script tag with the autolint class JSLint and show the results at the bottom of the page.

Full example (same as in example.html):

    <html>
    	<head>
    		<script src="jquery.js"></script>
    		<script src="jslint.js"></script>
    		<script src="autolint.jquery.js" class="autolint"></script>
    	</head>
    	<body>
    		<h1>This is an AutoLint example</h1>
    		<script>
    		jQuery(document).ready(function () {
    				jQuery('script.autolint').autolint();
    		});
    		</script>
    	</body>
    </html>

Example of output added to the bottom of the page:
![Screen shot](http://dl.dropbox.com/u/1506097/Screenshots/autolint_scrn.png)


This software is licensed under the MIT License:

Copyright (c) 2009 Erick Schmitt
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
