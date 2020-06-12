import Store from 'fluxible/addons/BaseStore';
import { MapMode } from '../constants';
import { getLocalMapMode, setLocalMapMode } from './localStorage';

export default class MapModeStore extends Store {
  static storeName = 'MapModeStore';
  static existingMapModes = Object.values(MapMode);
  prevMapMode = MapMode.Default;

  static handlers = {
    SetMapMode: 'setMapMode',
  };

  constructor(dispatcher) {
    super(dispatcher);

    const { router } = dispatcher.getContext();
    if (router && router.query && router.query.mapMode) {
      this.setMapMode(router.query.mapMode);
    }
  }

  getMapMode = () => getLocalMapMode();

  setMapMode = mapMode => {
    if (MapModeStore.existingMapModes.includes(mapMode)) {
      setLocalMapMode(mapMode);
    } else {
      setLocalMapMode(MapMode.Default);
    }
    this.emitChange();
  };

  getPrevMapMode = () => this.prevMapMode;

  setPrevMapMode = mapMode => {
    this.prevMapMode = mapMode;
  };
}
