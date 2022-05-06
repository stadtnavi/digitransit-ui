import PropTypes from 'prop-types';
import React from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import ReactRelayContext from 'react-relay/lib/ReactRelayContext';
import { useMap } from 'react-leaflet';

import CityBikeMarker from './CityBikeMarker';

class CityBikeMarkerContainer extends React.Component {
  static contextTypes = {
    config: PropTypes.object.isRequired,
  };

  static propTypes = {};

  componentDidMount() {
    useMap().on('zoomend', this.onMapZoom);
  }

  componentWillUnmount() {
    useMap().off('zoomend', this.onMapZoom);
  }

  onMapZoom = () => this.forceUpdate();

  render() {
    if (useMap().getZoom() < this.context.config.cityBike.cityBikeMinZoom) {
      return false;
    }
    return (
      <ReactRelayContext.Consumer>
        {({ environment }) => (
          <QueryRenderer
            environment={environment}
            query={graphql`
              query CityBikeMarkerContainerQuery {
                viewer {
                  stations: bikeRentalStations {
                    lat
                    lon
                    stationId
                    networks
                    bikesAvailable
                  }
                }
              }
            `}
            render={({ props }) => (
              <div>
                {props &&
                  Array.isArray(props.viewer.stations) &&
                  props.viewer.stations.map(station => (
                    <CityBikeMarker station={station} key={station.stationId} />
                  ))}
              </div>
            )}
          />
        )}
      </ReactRelayContext.Consumer>
    );
  }
}

export default CityBikeMarkerContainer;
