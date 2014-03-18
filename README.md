# css-loader

A CSS lazy loader that takes a path and, if the file has not already been loaded, loads it and returns a promise. As is, it requires Q, but any promise library should work.

## Usage

It exposes a global cssLoader. This is easily modified to attach to any other object.

cssLoader.load(path).then(do somthing else)