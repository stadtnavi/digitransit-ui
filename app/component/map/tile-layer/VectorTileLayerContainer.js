import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import LayerCategoriesStore from '../../../store/LayerCategoriesStore';
import { getLayerByCode } from '../../../util/mapLayerUtils';

import TileLayerContainer from './TileLayerContainer';
import BikeRentalStations from './BikeRentalStations';
import RentalVehicles from './RentalVehicles';
import WeatherStations from './WeatherStations';
import Stops from './Stops';
import ParkAndRideForCars from './ParkAndRideForCars.bbnavi';
import ParkAndRideForBikes from './ParkAndRideForBikes.bbnavi';
import Roadworks from './Roadworks';
import ChargingStations from './ChargingStations';
import { mapLayerShape } from '../../../store/MapLayerStore';
import Loading from '../../Loading';
import PoiVectorTileLayer from './PoiVectorTileLayer';

function VectorTileLayerContainer(props, { config }) {
  const layers = [];

  if (config.URL.STOP_MAP) {
    layers.push(Stops);
  }

  PoiVectorTileLayer.visibleCategories = Object.keys(props.mapLayers)
    // Only include layer categories of layers that are enabled.
    .filter(code => props.mapLayers[code] === true)
    .map(code => getLayerByCode(code, props.layerCategories))
    .filter(Boolean);

  layers.push(PoiVectorTileLayer);

  // TODO switch to mapLayers.rental
  if (props.mapLayers.citybike && config.URL.RENTAL_STATION_MAP) {
    layers.push(BikeRentalStations);
    if (config.URL.RENTAL_VEHICLE_MAP) {
      layers.push(RentalVehicles);
    }
  }

  if (config.parkAndRide?.show && props.mapLayers.parkAndRide) {
    layers.push(ParkAndRideForCars);
  }
  if (config.parkAndRideForBikes?.show && props.mapLayers.parkAndRideForBikes) {
    layers.push(ParkAndRideForBikes);
  }

  if (config.weatherStations?.show && props.mapLayers.weatherStations) {
    layers.push(WeatherStations);
  }

  if (config.chargingStations?.show && props.mapLayers.chargingStations) {
    layers.push(ChargingStations);
  }

  if (config.roadworks?.show && props.mapLayers.roadworks) {
    layers.push(Roadworks);
  }

  return layers.length !== 0 ? (
    <TileLayerContainer
      key="tileLayer"
      pane="markerPane"
      layers={layers}
      mapLayers={props.mapLayers}
      mergeStops={props.mergeStops}
      hilightedStops={props.hilightedStops}
      stopsToShow={props.stopsToShow}
      tileSize={config.map.tileSize || 256}
      zoomOffset={config.map.zoomOffset || 0}
      disableMapTracking={props.disableMapTracking}
      locationPopup={props.locationPopup}
      onSelectLocation={props.onSelectLocation}
    />
  ) : (
    <Loading />
  );
}

VectorTileLayerContainer.propTypes = {
  mapLayers: mapLayerShape.isRequired,
  layerCategories: PropTypes.array,
  hilightedStops: PropTypes.arrayOf(PropTypes.string),
  stopsToShow: PropTypes.arrayOf(PropTypes.string),
  disableMapTracking: PropTypes.func,
  mergeStops: PropTypes.bool,
  locationPopup: PropTypes.string,
  onSelectLocation: PropTypes.func,
};

VectorTileLayerContainer.contextTypes = {
  config: PropTypes.object.isRequired,
};

const connectedComponent = connectToStores(
  VectorTileLayerContainer,
  [LayerCategoriesStore],
  ({ getStore }) => ({
    layerCategories: getStore(LayerCategoriesStore).getLayerCategories(),
  }),
);

export default connectedComponent;
