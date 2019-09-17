[![Build Status](https://travis-ci.org/HSLdevcom/digitransit-ui.svg?branch=master)](https://travis-ci.org/HSLdevcom/digitransit-ui)
[![codecov](https://codecov.io/gh/HSLdevcom/digitransit-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/HSLdevcom/digitransit-ui)

# Digitransit

Digitransit-ui is a mobile friendly User interface built to work with Digitransit platform

## Licensing
The source code of the platform is dual-licensed under the EUPL v1.2 and AGPLv3 licenses.

## Issues
Our main issue tracking is handled in [https://digitransit.atlassian.net](https://digitransit.atlassian.net)
However, we also monitor this repository's issues and import them to Jira. You can create issues in GitHub.

## Demos
* [https://reittiopas.hsl.fi - Helsinki city area demo](https://reittiopas.hsl.fi/)
* [https://opas.matka.fi/ - National demo](https://opas.matka.fi/)

## Testing

Digitransit-ui is tested to work on the latest and the second latest major versions of Firefox, Chrome, Safari and Edge. Additionally, latest version of IE and couple of latest versions Samsung Internet for Android should work almost optimally. For automated testing we use [Nightwatch](http://nightwatchjs.org/) and [BrowserStack](http://browserstack.com/).
- Continuous Integration: [https://travis-ci.org/HSLdevcom/digitransit-ui](https://travis-ci.org/HSLdevcom/digitransit-ui)
- BrowserStack (not public): [BrowserStack](http://www.browserstack.com/)

Visual tests are run with Gemini. The images must be created using same browser on same platform to eliminate font rendering issues. We use BrowserStack for that too.

More information about [testing](docs/Tests.md).

## Documentation
* [Terms](docs/Terms.md)
* [Architecture](docs/Architecture.md)
* [Positioning](docs/Position.md)
* [Locations](docs/Location.md)
* [Run in Docker](docs/Docker.md)
* [Style guide](http://beta.digitransit.fi/styleguide)
* [Installation](docs/Installation.md)
* [Tests](docs/Tests.md)
* [Z-Index Index](docs/ZIndex.md)
* [Benchmark results and UX](docs/JSBenchmark.md)
* [Navigation](docs/Navigation.md)
* [Themes](docs/Themes.md)
* [GeoJSON](docs/GeoJson.md)

This repo is a fork from the original Digitransit and migrated to our internal gitlab.

# MFDZ changes
## Development environment
* WebStorm 2019.2
* Yarn v1.17.3
* Node v10.16.3

### Yarn Installation
```
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt update
$ sudo apt install yarn
$ yarn --version
```

### NodeJS Installation
```
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ node -v
```

### Debugger
Run/Debug Configurations:
1. Add new configuration...
2. Attach to Node.js/Chrome
3. check Reconnect automatically

package.json 
modify row 14. (add --inspect):
    ```
    "dev": "PID=$$; trap 'pkill -QUIT -P $PID > /dev/null' EXIT; NODE_ENV=development nodemon -e js,css,scss,html --watch ./server/ --watch ./app/ --inspect server/server.js & NODE_ENV=development webpack-dev-server",
    ```
## How to Run
### In terminal locally
```
$ yarn run dev
```
If it won't work properly at first:
```
$ yarn upgrade
```
### In Docker locally
1. For details see the original docs above.
2. Go to the folder of your project.
3. Build image: ```docker build -t <yourUserName/yourProjectName> .```
4. Run: ```docker run -p 8080:8080 <yourUserName/yourProjectName>```
5. Stop: ```docker ps``` -> copy the ID of your running project -> ```docker stop <ID>```
## Modifications
### URLs: app/configuration/config.default.js
* API_URL: https://api.mobil-in-herrengerg.de
* MAP_URL: https://maps.wikimedia.org/osm-intl/
* OTP (in row 27): changed string 'finland' to 'hb'
* In row 29-30 delete the added strings of MAP_URL
* STOP_MAP and CITYBIKE_MAP: changed MAP_URL to API_URL and removed string 'finland-'

### New RideShare icons
New icon from: https://iconmonstr.com/car-17-svg/ added to the street mode and to the transfer mode filter (in static/assets/svg-sprite.default.svg).
The color of the RideShare filter button: $rideshare-color: #800000 (in default/theme.scss)

### Timezone and default language
Both can be modified in app/config.default.js.