# Seed Site

This seed website is built on Django & React, and has support for backend Jupyter development. 
The purpose of the seed site is to provide the common infrastrucuture for a production ready website.
The seed should be cloned for each new project where it will be used, and is customized from there. 

The site's backend connects to a postgres database, and uses websockets for server initiated updates.
The django python environment is also available in notebooks. 
This allows for rapid development of non-web functionalities, like scrapers or graphing data.
A skeleton frontend app is provided, with layouts and common input wrappers. 
The frontend uses [ReactN](https://github.com/charlesStover/reactn) to maintain the global state, because redux has too much overhead.

[SeedSite](http://35.199.41.243)
