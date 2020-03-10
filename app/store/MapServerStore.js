import Store from 'fluxible/addons/BaseStore';

class MapServerStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher;

    const { config } = dispatcher.getContext();
    this.availableStreetModes = config.streetModes;
    this.streetMode = this.availableStreetModes.public_transport;

    this.bikeUrl = config.URL.BIKE_MAP_URL;
    this.carUrl = config.URL.MAP;

    this.mapUrl = `${this.carUrl}{z}/{x}/{y}{size}.png`;
  }

  updateMap = streetMode => {
    this.streetMode = streetMode;
    this.mapUrl =
      this.streetMode === 'BICYCLE'
        ? `https://{s}${this.bikeUrl}{z}/{x}/{y}.png`
        : `${this.carUrl}{z}/{x}/{y}{size}.png`;

    this.emitChange();
  };
}

MapServerStore.storeName = 'MapServerStore';

export default MapServerStore;
