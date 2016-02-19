# copytotheplace

In my project pipelines I often have to copy my compiled files to a special
directory after the build process completes. That's easy. But the location of
the special directory depends on my local file system and isn't part of the
project directory, so it needs to be configurable per local copy.

This tool will allow setting the destination directory using an environment
variable, config file, or on the command line.

If no destination directory is set, this tool will do nothing, which allows this
to be used as the last step in a pipeline without doing anything unless
called-for.

# Install

To install globally:

`npm install -g copytotheplace`

To install for a project (not necessary if you're using Grunt; see below):

`npm install --save-dev copytotheplace`

# Usage

**IMPORTANT NOTE**: copytotheplace intentionally fails silently if no destination directory is set. You can set the destination directory on the command-line, via the `COPYTOTHEPLACE` environment variable, or by writing `COPYTOTHEPLACE=<some directory>` to a .env file in the directory where it is run.

## With Grunt

See [grunt-copytotheplace](https://github.com/sirbrillig/grunt-copytotheplace) which will take care of everything.

## Command-line

This will copy the file `build/index.js` to `dist/index.js`:

`copytotheplace --place dist build/index.js`

You can omit the `--place` option if you set the `COPYTOTHEPLACE` environment
variable:

`COPYTOTHEPLACE=dist copytotheplace build/index.js`

You can save the environment variable by putting it in a `.env` file:

`echo 'COPYTOTHEPLACE=dist' > .env`

then:

`copytotheplace build/index.js`

## As a node module

This will copy the file `build/index.js` to `dist/index.js`:

```javascript
// ES2015:
import { copytotheplace } from 'copytotheplace'
copytotheplace( [ 'build/index.js' ], 'dist' )
```

```javascript
// ES5:
var copytotheplace = require( 'copytotheplace' ).copytotheplace;
copytotheplace( [ 'build/index.js' ], 'dist' );
```

You can omit the second argument to `copytotheplace()` if you set the `COPYTOTHEPLACE` environment variable. You can save the environment variable by putting it in a `.env` file:

`echo 'COPYTOTHEPLACE=dist' > .env`

then, in your code:

```javascript
// ES5:
copytotheplace( [ 'build/index.js' ] );
```

