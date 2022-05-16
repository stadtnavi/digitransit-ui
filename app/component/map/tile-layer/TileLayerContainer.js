import connectToStores from 'fluxible-addons-react/connectToStores';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { ReactRelayContext } from 'react-relay';
import { useMap, Popup } from 'react-leaflet';
import SphericalMercator from '@mapbox/sphericalmercator';
import { GridLayer as LeafletGridLayer } from 'leaflet';
import lodashFilter from 'lodash/filter';
// TODO used in componentDidUpdate import isEqual from 'lodash/isEqual';
import { routerShape } from 'found';
import { mapLayerShape } from '../../../store/MapLayerStore';
import MarkerSelectPopup from './MarkerSelectPopup';
import LocationPopup from '../popups/LocationPopup';
import TileContainer from './TileContainer';
import { isFeatureLayerEnabled } from '../../../util/mapLayerUtils';
import RealTimeInformationStore from '../../../store/RealTimeInformationStore';
import { addAnalyticsEvent } from '../../../util/analyticsUtils';
import { getClientBreakpoint } from '../../../util/withBreakpoint';
import {
  PREFIX_BIKESTATIONS,
  PREFIX_STOPS,
  PREFIX_TERMINALS,
  PREFIX_CARPARK,
  PREFIX_BIKEPARK,
} from '../../../util/path';
import SelectVehicleContainer from './SelectVehicleContainer';

function TileLayerContainer(props, { getStore, config, router }) {
  const [selectableTargets, setSelectableTargets] = useState(null);
  const [coords, setCoords] = useState(null);

  const mapInstance = useMap();
  const popupEl = useRef(null);

  let leafletElement = null;

  /**
   * Send an analytics event on opening popup
   */
  const sendAnalytics = () => {
    let name = null;
    let type = null;
    if (selectableTargets.length === 0) {
      return;
      // event for clicking somewhere else on the map will be handled in LocationPopup
    }
    if (selectableTargets.length === 1) {
      const target = selectableTargets[0];
      const { properties } = target.feature;
      name = target.layer;
      switch (name) {
        case 'stop':
          ({ type } = properties);
          if (properties.stops) {
            type += '_TERMINAL';
          }
          break;
        default:
          break;
      }
    } else {
      name = 'multiple';
    }
    const pathPrefixMatch = window.location.pathname.match(/^\/([a-z]{2,})\//);
    const context =
      pathPrefixMatch && pathPrefixMatch[1] !== config.indexPath
        ? pathPrefixMatch[1]
        : 'index';
    addAnalyticsEvent({
      action: 'SelectMapPoint',
      category: 'Map',
      name,
      type,
      source: context,
    });
  };

  const PopupOptions = {
    offset: [0, 0],
    autoPanPaddingTopLeft: [5, 125],
    className: 'popup',
    ref: popupEl,
    onClose: () => {
      setSelectableTargets(null);
      setCoords(null);
    },
    autoPan: false,
    onOpen: () => sendAnalytics(),
    relayEnvironment: PropTypes.object.isRequired,
  };

  const merc = new SphericalMercator({
    size: props.tileSize || 256,
  });

  const onTimeChange = e => {
    let activeTiles;

    if (e.currentTime) {
      /* eslint-disable no-underscore-dangle */
      activeTiles = lodashFilter(leafletElement._tiles, tile => tile.active);
      /* eslint-enable no-underscore-dangle */
      activeTiles.forEach(
        tile =>
          tile.el.layers &&
          tile.el.layers.forEach(layer => {
            if (layer.onTimeChange) {
              layer.onTimeChange();
            }
          }),
      );
    }
  };

  const onClick = e => {
    /* eslint-disable no-underscore-dangle */
    Object.keys(leafletElement._tiles)
      .filter(key => leafletElement._tiles[key].active)
      .filter(key => leafletElement._keyToBounds(key).contains(e.latlng))
      .forEach(key =>
        leafletElement._tiles[key].el.onMapClick(
          e,
          merc.px(
            [e.latlng.lng, e.latlng.lat],
            Number(key.split(':')[2]) + props.zoomOffset,
          ),
        ),
      );
    /* eslint-enable no-underscore-dangle */
  };

  const onSelectRow = option => setSelectableTargets([option]);

  // Factory method
  const createTile = (tileCoords, done) => {
    const tile = new TileContainer(
      tileCoords,
      done,
      props,
      config,
      props.mergeStops,
      props.relayEnvironment,
      props.hilightedStops,
      props.vehicles,
      props.stopsToShow,
    );
    tile.onSelectableTargetClicked = (
      selectableTargetsClicked,
      newCoords,
      forceOpen = false,
    ) => {
      const { mapLayers } = props;
      const popup = mapInstance._popup; // eslint-disable-line no-underscore-dangle
      // navigate to citybike stop page if single stop is clicked
      if (
        selectableTargetsClicked.length === 1 &&
        selectableTargetsClicked[0].layer === 'citybike'
      ) {
        router.push(
          `/${PREFIX_BIKESTATIONS}/${encodeURIComponent(
            selectableTargetsClicked[0].feature.properties.id,
          )}`,
        );
        return;
      }
      // ... Or to stop page
      if (
        selectableTargetsClicked.length === 1 &&
        selectableTargetsClicked[0].layer === 'stop'
      ) {
        const prefix = selectableTargetsClicked[0].feature.properties.stops
          ? PREFIX_TERMINALS
          : PREFIX_STOPS;
        router.push(
          `/${prefix}/${encodeURIComponent(
            selectableTargetsClicked[0].feature.properties.gtfsId,
          )}`,
        );
        return;
      }
      if (
        selectableTargetsClicked.length === 1 &&
        selectableTargetsClicked[0].layer === 'parkAndRide' &&
        (selectableTargetsClicked[0].feature.properties.facility ||
          selectableTargetsClicked[0].feature.properties.facilities.length ===
            1)
      ) {
        const carParkId =
          selectableTargetsClicked[0].feature.properties?.facility?.carParkId ||
          selectableTargetsClicked[0].feature.properties?.facilities[0]
            ?.carParkId;
        if (carParkId) {
          router.push(`/${PREFIX_CARPARK}/${encodeURIComponent(carParkId)}`);
          return;
        }
      }
      if (
        selectableTargetsClicked.length === 1 &&
        selectableTargetsClicked[0].layer === 'parkAndRideForBikes' &&
        selectableTargetsClicked[0].feature.properties.facility
      ) {
        router.push(
          `/${PREFIX_BIKEPARK}/${encodeURIComponent(
            selectableTargets[0].feature.properties.facility.bikeParkId,
          )}`,
        );
        return;
      }
      if (
        popup &&
        popup.isOpen() &&
        (!forceOpen || (newCoords && newCoords.equals(coords)))
      ) {
        mapInstance.closePopup();
        return;
      }

      setCoords(newCoords);
      setSelectableTargets(
        selectableTargetsClicked.filter(
          target =>
            target.layer === 'realTimeVehicle' ||
            isFeatureLayerEnabled(target.feature, target.layer, mapLayers),
        ),
      );
    };

    return tile.el;
  };

  useEffect(() => {
    leafletElement = new LeafletGridLayer(props);
    leafletElement.createTile = createTile;
    mapInstance.addLayer(leafletElement);
    mapInstance.addEventParent(leafletElement);
    // this.props.leaflet.map.addEventParent(this.leafletElement);

    leafletElement.on('click contextmenu', onClick);
    return () => {
      leafletElement.off('click contextmenu', onClick);
    };
  }, []);

  useEffect(() => {
    getStore('TimeStore').addChangeListener(onTimeChange);
    return () => {
      getStore('TimeStore').removeChangeListener(onTimeChange);
    };
  }, []);

  /* TODO componentDidUpdate still needs to be reworked 
  useEffect(() => {
    if (popupContainer != null) {
      popupContainer.openPopup();
    }
    if (!isEqual(prevProps.mapLayers, this.props.mapLayers)) {
      leafletElement.redraw();
    }
    if (!isEqual(prevProps.hilightedStops, this.props.hilightedStops)) {
      leafletElement.redraw();
    }
  } */

  let popup = null;
  let latlng = coords;
  let contents;
  const breakpoint = getClientBreakpoint(); // DT-3470
  let showPopup = true; // DT-3470

  if (selectableTargets !== null) {
    if (selectableTargets.length === 1) {
      let id;
      if (
        selectableTargets[0].layer === 'parkAndRide' &&
        selectableTargets[0].feature.properties.facilityIds
      ) {
        id = selectableTargets[0].feature.properties.facilityIds;
        contents = (
          <MarkerSelectPopup
            selectRow={onSelectRow}
            options={selectableTargets}
            colors={config.colors}
          />
        );
      } else if (selectableTargets[0].layer === 'realTimeVehicle') {
        const vehicle = selectableTargets[0].feature;
        const realTimeInfoVehicle = props.vehicles[vehicle.id];
        if (realTimeInfoVehicle) {
          latlng = {
            lat: realTimeInfoVehicle.lat,
            lng: realTimeInfoVehicle.long,
          };
        }
        PopupOptions.className = 'vehicle-popup';

        contents = <SelectVehicleContainer vehicle={vehicle} />;
      }
      popup = (
        <Popup
          {...PopupOptions}
          key={id}
          position={latlng}
          className={`${PopupOptions.className} ${
            PopupOptions.className === 'vehicle-popup'
              ? 'single-popup'
              : 'choice-popup'
          }`}
        >
          {contents}
        </Popup>
      );
    } else if (selectableTargets.length > 1) {
      if (!config.map.showStopMarkerPopupOnMobile && breakpoint === 'small') {
        // DT-3470
        showPopup = false;
      }
      popup = (
        <Popup
          key={coords.toString()}
          {...PopupOptions}
          position={coords}
          maxWidth="300px"
          className={`${PopupOptions.className} choice-popup`}
        >
          <MarkerSelectPopup
            selectRow={onSelectRow}
            options={selectableTargets}
            colors={config.colors}
          />
        </Popup>
      );
    } else if (selectableTargets.length === 0) {
      if (!config.map.showStopMarkerPopupOnMobile && breakpoint === 'small') {
        // DT-3470
        showPopup = false;
      }
      popup = props.locationPopup !== 'none' && (
        <Popup
          key={coords.toString()}
          {...PopupOptions}
          maxHeight={220}
          maxWidth="auto"
          position={coords}
          className={`${PopupOptions.className} ${
            props.locationPopup === 'all' ? 'single-popup' : 'narrow-popup'
          }`}
        >
          <LocationPopup
            lat={coords.lat}
            lon={coords.lng}
            onSelectLocation={props.onSelectLocation}
            locationPopup={props.locationPopup}
          />
        </Popup>
      );
    }
  }

  return showPopup ? popup : null;
}

TileLayerContainer.propTypes = {
  tileSize: PropTypes.number.isRequired,
  zoomOffset: PropTypes.number.isRequired,
  locationPopup: PropTypes.string, // all, none, reversegeocoding, origindestination
  onSelectLocation: PropTypes.func,
  mergeStops: PropTypes.bool,
  mapLayers: mapLayerShape.isRequired,
  relayEnvironment: PropTypes.object.isRequired,
  hilightedStops: PropTypes.arrayOf(PropTypes.string),
  stopsToShow: PropTypes.arrayOf(PropTypes.string),
  vehicles: PropTypes.object,
};

TileLayerContainer.contextTypes = {
  getStore: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  router: routerShape.isRequired,
};

const connectedComponent = connectToStores(
  props => (
    <ReactRelayContext.Consumer>
      {({ environment }) => (
        <TileLayerContainer {...props} relayEnvironment={environment} />
      )}
    </ReactRelayContext.Consumer>
  ),
  [RealTimeInformationStore],
  context => ({
    vehicles: context.getStore(RealTimeInformationStore).vehicles,
  }),
);

export { connectedComponent as default, TileLayerContainer as Component };
