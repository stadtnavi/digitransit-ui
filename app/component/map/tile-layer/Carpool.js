import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';

import { isBrowser } from '../../../util/browser';
import { drawIcon } from '../../../util/mapIconUtils';
import glfun from '../../../util/glfun';

const getScale = glfun({
  base: 1,
  stops: [[13, 0.8], [20, 1.6]],
});

class Carpool {
  constructor(tile, config, mapLayers) {
    this.tile = tile;
    this.config = config;
    this.mapLayers = mapLayers;
    this.scaleratio = (isBrowser && window.devicePixelRatio) || 1;
    this.iconSize = 36 * this.scaleratio * getScale(this.tile.coords.z);

    this.promise = this.fetchWithAction(this.drawStop);
  }

  fetchWithAction = actionFn =>
    fetch(
      `${this.config.URL.STOP_MAP}${this.tile.coords.z +
        (this.tile.props.zoomOffset || 0)}` +
        `/${this.tile.coords.x}/${this.tile.coords.y}.pbf`,
    ).then(res => {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(
        buf => {
          const vt = new VectorTile(new Protobuf(buf));

          this.features = [];

          const layerData = vt.layers.stops;

          if (layerData != null) {
            for (let i = 0, ref = layerData.length - 1; i <= ref; i++) {
              const feature = layerData.feature(i);
              if (
                feature.properties.type === 'CARPOOL' &&
                feature.properties.name.indexOf('P+M') !== -1
              ) {
                [[feature.geom]] = feature.loadGeometry();
                this.features.push(pick(feature, ['geom', 'properties']));
              }
            }
          }
          this.features.forEach(actionFn);
        },
        // eslint-disable-next-line no-console
        err => console.error(err),
      );
    });

  drawStop = f => {
    drawIcon('icon-icon_carpark_carpool', this.tile, f.geom, this.iconSize);
  };

  onTimeChange = () => {
    if (this.tile.coords.z > this.config.carpool.minZoom) {
      this.fetchWithAction(this.drawStop);
    }
  };

  static getName = () => 'carpool';
}

export default Carpool;
