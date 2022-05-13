import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMap, useMapEvent } from 'react-leaflet';
import Icon from '../../Icon';

import { isBrowser } from '../../../util/browser';

/* eslint-disable global-require */

const Marker = isBrowser && require('react-leaflet').Marker;
const L = isBrowser && require('leaflet');

function LegMarker(props) {
  const mapInstance = useMap();

  function isVisible() {
    if (!isBrowser) {
      return false;
    }
    const p1 = mapInstance.latLngToLayerPoint(props.leg.from);
    const p2 = mapInstance.latLngToLayerPoint(props.leg.to);

    const minDistanceToShow = 64;
    return minDistanceToShow <= p1.distanceTo(p2);
  }

  const [visible, setVisible] = useState(isVisible());

  useMapEvent('zoomend', () => {
    setVisible(isVisible());
  });

  const color = props.color ? props.color : 'currentColor';
  const className = props.wide ? 'wide' : '';

  return (
    visible && (
      <Marker
        key={`${props.leg.name}_text`}
        position={{
          lat: props.leg.lat,
          lng: props.leg.lon,
        }}
        interactive={false}
        icon={L.divIcon({
          html: `
            <div class="${className}" style="background-color: ${color}">
            ${Icon.asString({
              img: `icon-icon_${props.mode}`,
              className: 'map-route-icon',
              color,
            })}
              <span class="map-route-number">${props.leg.name}</span>
            </div>`,
          className: `legmarker ${props.mode}`,
          iconSize: null,
        })}
        zIndexOffset={props.zIndexOffset}
        keyboard={false}
      />
    )
  );
}

LegMarker.propTypes = {
  leg: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  color: PropTypes.string,
  zIndexOffset: PropTypes.number,
  wide: PropTypes.bool,
};

LegMarker.defaultProps = {
  color: 'currentColor',
  zIndexOffset: undefined,
  wide: false,
};

export default LegMarker;
