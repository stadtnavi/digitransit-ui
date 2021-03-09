import { VectorTile } from '@mapbox/vector-tile';
import pick from 'lodash/pick';
import Protobuf from 'pbf';
import range from 'lodash-es/range';
import { drawIcon, drawRoundIcon } from '../../../util/mapIconUtils';
import { isBrowser } from '../../../util/browser';

export default class BusPositions {
  constructor(tile, config) {
    this.tile = tile;
    this.config = config;
    const scaleratio = (isBrowser && window.devicePixelRatio) || 1;
    this.imageSize = 23 * scaleratio;
    this.promise = this.getPromise();
  }

  static getName = () => 'busPositions';

  static getIconSuffix({ pax }) {
    const busCapacity = 60;
    const percentFull = pax / busCapacity * 100;
    if (percentFull < 70) {
      return 'green';
    }
    if (percentFull < 85) {
      return 'orange';
    }
    return 'red';
  }

  getPromise() {
    return fetch(
      `${this.config.URL.BUS_POSITIONS_MAP}${this.tile.coords.z +
        (this.tile.props.zoomOffset || 0)}` +
        `/${this.tile.coords.x}/${this.tile.coords.y}.pbf`,
    )
      .then(
        res => {
          if (res.status !== 200) {
            return undefined;
          }

          if (
            res.headers.has('x-protobuf-encoding') &&
            res.headers.get('x-protobuf-encoding') === 'base64'
          ) {
            return res.text().then(text => Buffer.from(text, 'base64'));
          }
          return res.arrayBuffer();
        },
        // eslint-disable-next-line no-console
        err => console.log(err),
      )
      .then(buf => {
        const vt = new VectorTile(new Protobuf(buf));

        this.features = [];

        const layerData = vt.layers.buspositions || { length: 0 };
        const { length } = layerData;

        if (layerData != null) {
          this.features = range(length).map(index => {
            const feature = layerData.feature(index);
            [[feature.geom]] = feature.loadGeometry();
            return pick(feature, ['geom', 'properties']);
          });

          this.features.forEach(feature => {
            if (this.tile.coords.z <= this.config.busPositions.smallIconZoom) {
              return drawRoundIcon(this.tile, feature.geom, 'weather-station');
            }
            const suffix = BusPositions.getIconSuffix(feature.properties);
            return drawIcon(
              `icon-icon_bus-live-${suffix}`,
              this.tile,
              feature.geom,
              this.imageSize,
            );
          });
        }
      });
  }
}