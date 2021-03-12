#!/bin/sh

echo "# restructure static files"
cd ~/Projects/SeedSite/codebase/frontend/build

echo "$ cp -r static/css/. css"
cp -r static/css/. css

echo "$ cp -r static/js/. js"
cp -r static/js/. js

echo "$ cp -r static/media/. media"
cp -r static/media/. media

echo "$ rm -rf static"
rm -rf static

echo "$ ls -l frontend/build"
ls -l .
