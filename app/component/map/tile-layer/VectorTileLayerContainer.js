import PropTypes from 'prop-types';
import React from 'react';

import TileLayerContainer from './TileLayerContainer';
import CityBikes from './CityBikes';
import DynamicParkingLots from './DynamicParkingLots';
import Covid19OpeningHours from './Covid19OpeningHours';
import Roadworks from './Roadworks';
import Stops from './Stops';
import ParkAndRide from './ParkAndRide';
import TicketSales from './TicketSales';
import WeatherStations from './WeatherStations';
import ChargingStations from './ChargingStations';
import BikeParks from './BikeParks';

export default function VectorTileLayerContainer(props, { config }) {
  const layers = [];

  if (props.showStops) {
    layers.push(Stops);

    if (config.cityBike && config.cityBike.showCityBikes) {
      layers.push(CityBikes);
    }

    if (config.parkAndRide && config.parkAndRide.showParkAndRide) {
      layers.push(ParkAndRide);
    }

    if (config.ticketSales && config.ticketSales.showTicketSales) {
      layers.push(TicketSales);
    }

    if (
      config.dynamicParkingLots &&
      config.dynamicParkingLots.showDynamicParkingLots
    ) {
      layers.push(DynamicParkingLots);
    }

    if (config.roadworks && config.roadworks.showRoadworks) {
      layers.push(Roadworks);
    }

    if (config.covid19 && config.covid19.show) {
      layers.push(Covid19OpeningHours);
    }

    if (config.weatherStations && config.weatherStations.show) {
      layers.push(WeatherStations);
    }

    if (config.chargingStations && config.chargingStations.show) {
      layers.push(ChargingStations);
    }
    if (config.bikeParks && config.bikeParks.show) {
      layers.push(BikeParks);
    }
  }

  return (
    <TileLayerContainer
      key="tileLayer"
      layers={layers}
      hilightedStops={props.hilightedStops}
      tileSize={config.map.tileSize || 256}
      zoomOffset={config.map.zoomOffset || 0}
      disableMapTracking={props.disableMapTracking}
    />
  );
}

VectorTileLayerContainer.propTypes = {
  hilightedStops: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  disableMapTracking: PropTypes.func.isRequired,
  showStops: PropTypes.bool.isRequired,
};

VectorTileLayerContainer.contextTypes = {
  config: PropTypes.object.isRequired,
};
