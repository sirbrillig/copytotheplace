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
