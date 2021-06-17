import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames'; // DT-3470
import connectToStores from 'fluxible-addons-react/connectToStores';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import getContext from 'recompose/getContext';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { intlShape } from 'react-intl';
import { startLocationWatch } from '../../action/PositionActions';
import { setSettingsOpen } from '../../action/userPreferencesActions';
import ComponentUsageExample from '../ComponentUsageExample';
import MapContainer from './MapContainer';
import ToggleMapTracking from '../ToggleMapTracking';
import { isBrowser } from '../../util/browser';
import PositionStore from '../../store/PositionStore';
import { mapLayerShape } from '../../store/MapLayerStore';
import BubbleDialog from '../BubbleDialog';
// eslint-disable-next-line import/no-named-as-default
import PreferencesStore from '../../store/PreferencesStore';
import withBreakpoint from '../../util/withBreakpoint';

const onlyUpdateCoordChanges = onlyUpdateForKeys([
  'lat',
  'lon',
  'zoom',
  'bounds',
  'mapTracking',
  'mapLayers',
  'children',
  'leafletObjs',
  'bottomButtons',
  'settingsOpen',
]);

const MapCont = onlyUpdateCoordChanges(MapContainer);

class MapWithTrackingStateHandler extends React.Component {
  static propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number,
    position: PropTypes.shape({
      hasLocation: PropTypes.bool.isRequired,
      locationingFailed: PropTypes.bool,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
    bounds: PropTypes.array,
    children: PropTypes.array,
    leafletObjs: PropTypes.array,
    renderCustomButtons: PropTypes.func,
    mapLayers: mapLayerShape.isRequired,
    mapTracking: PropTypes.bool,
    locationPopup: PropTypes.string,
    onSelectLocation: PropTypes.func,
    onStartNavigation: PropTypes.func,
    onEndNavigation: PropTypes.func,
    onMapTracking: PropTypes.func,
    setMWTRef: PropTypes.func,
    mapRef: PropTypes.func,
    leafletEvents: PropTypes.object,
    breakpoint: PropTypes.string,
    lang: PropTypes.string,
    settingsOpen: PropTypes.bool,
  };

  static defaultProps = {
    renderCustomButtons: undefined,
    locationPopup: 'reversegeocoding',
    onSelectLocation: () => null,
    leafletEvents: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      mapTracking: props.mapTracking,
    };
    this.naviProps = {};
  }

  async componentDidMount() {
    if (!isBrowser) {
      return;
    }
    if (this.props.setMWTRef) {
      this.props.setMWTRef(this);
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(newProps) {
    let newState;
    if (newProps.mapTracking && !this.state.mapTracking) {
      newState = { mapTracking: true };
    } else if (newProps.mapTracking === false && this.state.mapTracking) {
      newState = { mapTracking: false };
    }
    if (newState) {
      this.setState(newState);
    }
  }

  setMapElementRef = element => {
    if (element && this.mapElement !== element) {
      this.mapElement = element;
      if (this.props.mapRef) {
        this.props.mapRef(element);
      }
    }
  };

  enableMapTracking = () => {
    if (!this.props.position.hasLocation) {
      this.context.executeAction(startLocationWatch);
    }
    this.setState({
      mapTracking: true,
    });
    if (this.props.onMapTracking) {
      this.props.onMapTracking();
    }
  };

  disableMapTracking = () => {
    this.setState({
      mapTracking: false,
    });
  };

  forceRefresh = () => {
    this.refresh = true;
  };

  startNavigation = () => {
    if (this.props.onStartNavigation) {
      this.props.onStartNavigation(this.mapElement);
    }
    if (this.state.mapTracking && !this.ignoreNavigation) {
      this.disableMapTracking();
    }
  };

  endNavigation = () => {
    if (this.props.onEndNavigation) {
      this.props.onEndNavigation(this.mapElement);
    }
    this.navigated = true;
  };

  render() {
    const {
      lat,
      lon,
      zoom,
      position,
      children,
      renderCustomButtons,
      mapLayers,
      bounds,
      leafletEvents,
      ...rest
    } = this.props;
    const { config } = this.context;

    let btnClassName = 'map-with-tracking-buttons'; // DT-3470
    if (config.map.showZoomControl) {
      btnClassName = cx(btnClassName, 'roomForZoomControl');
    }
    // eslint-disable-next-line no-underscore-dangle
    const currentZoom = this.mapElement?.leafletElement?._zoom || zoom || 16;

    if (this.state.mapTracking && position.hasLocation) {
      this.naviProps.lat = position.lat;
      this.naviProps.lon = position.lon;
      if (zoom) {
        this.naviProps.zoom = zoom;
      } else if (!this.naviProps.zoom) {
        this.naviProps.zoom = currentZoom;
      }
      if (this.navigated) {
        // force map update by changing the coordinate slightly. looks crazy but is the easiest way
        this.naviProps.lat += 0.000001 * Math.random();
        this.navigated = false;
      }
      delete this.naviProps.bounds;
    } else if (
      this.props.bounds &&
      (!isEqual(this.oldBounds, this.props.bounds) || this.refresh)
    ) {
      this.naviProps.bounds = cloneDeep(this.props.bounds);
      if (this.refresh) {
        // bounds is defined by [min, max] point pair. Substract min lat a bit
        this.naviProps.bounds[0][0] -= 0.000001 * Math.random();
      }
      this.oldBounds = cloneDeep(this.props.bounds);
    } else if (
      lat &&
      lon &&
      ((lat !== this.oldLat && lon !== this.oldLon) || this.refresh)
    ) {
      this.naviProps.lat = lat;
      if (this.refresh) {
        this.naviProps.lat += 0.000001 * Math.random();
      }
      this.naviProps.lon = lon;
      this.oldLat = lat;
      this.oldLon = lon;
      if (zoom) {
        this.naviProps.zoom = zoom;
      }
      delete this.naviProps.bounds;
    }
    this.refresh = false;

    // eslint-disable-next-line no-nested-ternary
    const img = position.locationingFailed
      ? 'icon-tracking-off-v2'
      : this.state.mapTracking
      ? 'icon-tracking-on-v2'
      : 'icon-tracking-offline-v2';

    const iconColor = this.state.mapTracking ? '#ff0000' : '#78909c';

    return (
      <>
        <MapCont
          className="flex-grow"
          locationPopup={this.props.locationPopup}
          onSelectLocation={this.props.onSelectLocation}
          leafletEvents={{
            ...this.props.leafletEvents,
            onDragstart: this.startNavigation,
            onZoomstart: this.startNavigation,
            onZoomend: this.endNavigation,
            onDragend: this.endNavigation,
          }}
          {...this.naviProps}
          {...rest}
          mapRef={this.setMapElementRef}
          bottomButtons={
            <div className={btnClassName}>
              {config.map.showLayerSelector && (
                <BubbleDialog
                  contentClassName="select-map-layers-dialog-content"
                  header="select-map-layers-header"
                  icon="map-layers"
                  id="mapLayerSelectorV2"
                  isFullscreenOnMobile
                  isOpen={this.props.settingsOpen}
                  tooltip={
                    config.mapLayers &&
                    config.mapLayers.tooltip &&
                    config.mapLayers.tooltip[this.props.lang]
                  }
                  setOpen={open =>
                    this.context.executeAction(setSettingsOpen, open)
                  }
                />
              )}
              {renderCustomButtons && renderCustomButtons()}
              <ToggleMapTracking
                key="toggleMapTracking"
                img={img}
                iconColor={iconColor}
                handleClick={() => {
                  if (this.state.mapTracking) {
                    this.disableMapTracking();
                  } else {
                    // enabling tracking will trigger same navigation events as user navigation
                    // this hack prevents those events from clearing tracking
                    this.ignoreNavigation = true;
                    setTimeout(() => {
                      this.ignoreNavigation = false;
                    }, 500);
                    this.enableMapTracking();
                  }
                }}
                className="icon-mapMarker-toggle-positioning"
              />
            </div>
          }
          mapLayers={mapLayers}
        >
          {children}
        </MapCont>
      </>
    );
  }
}

MapWithTrackingStateHandler.contextTypes = {
  executeAction: PropTypes.func,
  getStore: PropTypes.func,
  intl: intlShape.isRequired,
  config: PropTypes.object.isRequired,
};

const MapWithTrackingStateHandlerapWithBreakpoint = withBreakpoint(
  MapWithTrackingStateHandler,
);

const MapWithTracking = connectToStores(
  getContext({ config: PropTypes.object })(
    MapWithTrackingStateHandlerapWithBreakpoint,
  ),
  [PositionStore, PreferencesStore],
  ({ getStore }) => ({
    position: getStore(PositionStore).getLocationState(),
    lang: getStore(PreferencesStore).getLanguage(),
    settingsOpen: getStore(PreferencesStore).getSettingsOpen(),
  }),
);

MapWithTracking.description = (
  <div>
    <p>Renders a map with map-tracking functionality</p>
    <ComponentUsageExample description="">
      <MapWithTracking />
    </ComponentUsageExample>
  </div>
);

export { MapWithTracking as default, MapWithTrackingStateHandler as Component };
