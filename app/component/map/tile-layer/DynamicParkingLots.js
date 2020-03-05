import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';

import OpeningHours from 'opening_hours';
import Moment from 'moment';
import { isBrowser } from '../../../util/browser';
import {
  drawRoundIcon,
  drawIcon,
  drawAvailabilityBadge,
} from '../../../util/mapIconUtils';
import glfun from '../../../util/glfun';

const getScale = glfun({
  base: 1,
  stops: [[13, 0.8], [20, 1.6]],
});

class DynamicParkingLots {
  constructor(tile, config) {
    this.tile = tile;
    this.config = config;

    this.scaleratio = (isBrowser && window.devicePixelRatio) || 1;
    this.parkingLotImageSize =
      20 * this.scaleratio * getScale(this.tile.coords.z);
    this.availabilityImageSize =
      14 * this.scaleratio * getScale(this.tile.coords.z);

    this.promise = this.fetchWithAction(this.fetchAndDrawStatus);
  }

  fetchWithAction = actionFn =>
    fetch(
      `${this.config.URL.DYNAMICPARKINGLOTS_MAP}` +
        `${this.tile.coords.z + (this.tile.props.zoomOffset || 0)}/` +
        `${this.tile.coords.x}/${this.tile.coords.y}.pbf`,
    ).then(res => {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(
        buf => {
          const vt = new VectorTile(new Protobuf(buf));

          this.features = [];

          if (vt.layers.parking != null) {
            for (let i = 0, ref = vt.layers.parking.length - 1; i <= ref; i++) {
              const feature = vt.layers.parking.feature(i);
              [[feature.geom]] = feature.loadGeometry();
              this.features.push(pick(feature, ['geom', 'properties']));
            }
          }

          this.features.forEach(actionFn);
        },
        err => console.log(err), // eslint-disable-line no-console
      );
    });

  getIcon = type => {
    if (type === 'Parkhaus' || type === 'Tiefgarage') {
      return 'covered_carpark';
    }
    if (type === 'Park-Ride') {
      return 'p+r';
    }
    if (type === 'Park-Carpool') {
      return 'carpark_carpool';
    }
    if (type === 'Wohnmobilparkplatz') {
      return 'caravan';
    }
    return 'open_carpark';
  };

  fetchAndDrawStatus = ({ geom, properties }) => {
    if (
      this.tile.coords.z <=
      this.config.dynamicParkingLots.dynamicParkingLotsSmallIconZoom
    ) {
      return drawRoundIcon(this.tile, geom, 'car');
    }

    const icon = this.getIcon(properties.lot_type);

    const NOW = new Date();
    const tomorrow = new Date(NOW);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const openingHours = new OpeningHours(
      this.props.feature.properties.opening_hours,
      null,
      {},
    );
    const intervals = openingHours.getOpenIntervals(NOW, tomorrow);
    const isOpenNow = openingHours.getState(NOW);
    const timeLeftTilClose = Moment.utc(
      Moment(intervals[0][1], 'DD/MM/YYYY HH:mm').diff(
        Moment(NOW, 'DD/MM/YYYY HH:mm'),
        'minutes',
      ),
    );
    const isClosingSoon = isOpenNow && timeLeftTilClose < 30;

    return drawIcon(
      `icon-icon_${icon}`,
      this.tile,
      geom,
      this.parkingLotImageSize,
    ).then(() => {
      if (properties.free !== undefined) {
        let avail;
        if (properties.free === 0 || !isOpenNow) {
          avail = 'no';
        } else if (properties.free < 3 || isClosingSoon) {
          avail = 'poor';
        } else {
          avail = 'good';
        }
        drawAvailabilityBadge(
          avail,
          this.tile,
          geom,
          this.parkingLotImageSize,
          this.availabilityImageSize,
          this.scaleratio,
        );
      }
    });
  };

  onTimeChange = () => {
    if (this.tile.coords.z > this.config.cityBike.cityBikeSmallIconZoom) {
      this.fetchWithAction(this.fetchAndDrawStatus);
    }
  };

  static getName = () => 'dynamicParkingLots';
}

export default DynamicParkingLots;
