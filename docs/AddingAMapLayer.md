# Adding a map layer

## map server

Before you can draw a map layer in the digitransit UI you will have to add it to `hsl-map-server` first.

An example of the layer source would be https://github.com/mfdz/tilelive-roadworks-bw

This layer takes a GeoJSON source and then converts it to the [Mapbox vector tile format](https://github.com/mapbox/vt-pbf).
This is a highly optimized format for sending geographic data to the client.

Take a note of the [`id` you give to your layer](https://github.com/mfdz/tilelive-roadworks-bw/blob/master/index.js#L85).
You will need it in the client in order to figure out which layer data should be processed in which UI component.

Once you have the layer source, add it to the following files in `hsl-map-server`:

- `config.js`
- `package.json`
- `run.sh`

An example PR is available at https://github.com/transportkollektiv/hsl-map-server/pull/1/files

Note that the `Cache-Control` header tells the _server_ (not only the client) how long it should cache the tiles. If the
cache expires, it will be automatically refreshed. Therefore you don't need to add refresh logic to the layer source.

## digitransit UI

This is where the main work needs to happen. The files you need to touch are:

- `app/component/map/tile-layer/VectorTileLayerContainer.js`: enables or disables the feature globally
- `app/component/SelectMapLayersDialog.js`: The layer switcher on the bottem left side
- `app/component/map/tile-layer/$LAYER.js`: This downloads the tile data from the map server and draws them onto the map UI.
   This where the main logic lives.
- `app/configurations/config.$ROUTER.js`: The config parameters for your layer, for example for which zoom level the 
   icons should be shown for.

Optional:

- `app/component/map/popups/$LAYERPopup.js`: If you want to display a popup when clicking on the icon. This can contain
   extra details about the geographic feature.
- `app/component/map/tile-layer/TileLayerContainer.js`: Contains wiring to open up the correct popup when you click on
   the icon.

A complete example is available in [this pull request](https://github.com/mfdz/digitransit-ui/pull/36/files).
