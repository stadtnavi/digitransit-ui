import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import { pick, isNumber } from 'lodash';

import SimpleOpeningHours from 'simple-opening-hours';
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

  static getIcon = type => {
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
    if (type === 'Barrierefreier-Parkplatz') {
      return 'barrierefrei';
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

    const icon = DynamicParkingLots.getIcon(properties.lot_type);

    let isOpenNow = true;
    if (properties.opening_hours) {
      const opening = new SimpleOpeningHours(properties.opening_hours);
      isOpenNow = opening.isOpen();
    }

    return drawIcon(
      `icon-icon_${icon}`,
      this.tile,
      geom,
      this.parkingLotImageSize,
    ).then(() => {
      const { state, free, total } = properties;
      const freeDisabled = properties['free:disabled'];
      const totalDisabled = properties['total:disabled'];
      const hasBothDisabledAndRegular =
        isNumber(free) && isNumber(freeDisabled);
      const hasOnlyRegular = isNumber(free) && !isNumber(freeDisabled);
      const hasOnlyDisabled = !isNumber(free) && isNumber(freeDisabled);
      const percentFree = free / total;
      const percentFreeDisabled = freeDisabled / totalDisabled;

      // what percentage needs to be free in order to get a green icon
      const percentFreeBadgeThreshold = 0.1;

      let avail;
      if (
        (hasOnlyRegular && free === 0) ||
        (hasOnlyDisabled && freeDisabled === 0) ||
        !isOpenNow ||
        state === 'closed'
      ) {
        avail = 'no';
      } else if (
        (hasBothDisabledAndRegular || hasOnlyRegular) &&
        percentFree < percentFreeBadgeThreshold
      ) {
        avail = 'poor';
      } else if (percentFreeDisabled < percentFreeBadgeThreshold) {
        avail = 'poor';
      } else if (
        percentFree > percentFreeBadgeThreshold ||
        percentFreeDisabled > percentFreeBadgeThreshold
      ) {
        avail = 'good';
      }
      if (avail) {
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
