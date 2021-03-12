#!/bin/sh

echo "# restructure static files"

echo "$ cp /static/css /css"
cp -r ~/Projects/SeedSite/codebase/frontend/build/static/css/. ~/Projects/SeedSite/codebase/frontend/build/css

echo "$ cp /static/js /js"
cp -r ~/Projects/SeedSite/codebase/frontend/build/static/js/. ~/Projects/SeedSite/codebase/frontend/build/js

echo "$ cp /static/media /media"
cp -r ~/Projects/SeedSite/codebase/frontend/build/static/media/. ~/Projects/SeedSite/codebase/frontend/build/media

echo "$ rm /static/"
rm -rf ~/Projects/SeedSite/codebase/frontend/build/static

echo "$ ls /frontend/build"
ls -l ~/Projects/SeedSite/codebase/frontend/build


