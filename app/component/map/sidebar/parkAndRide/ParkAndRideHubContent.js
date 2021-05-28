import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';
import QueryRenderer from 'react-relay/lib/ReactRelayQueryRenderer';
import ReactRelayContext from 'react-relay/lib/ReactRelayContext';

import withProps from 'recompose/withProps';
import every from 'lodash/every';
import sumBy from 'lodash/sumBy';
import compact from 'lodash/compact';
import Loading from '../../../Loading';
import ParkAndRidePopup from './ParkAndRideContent';

const ParkAndRideHub = createFragmentContainer(
  withProps(({ facilities }) => ({
    // compact removes any falseisch values from the array
    // (bike parks are included in the hub but return null from graphQL carParks)
    realtime: every(compact(facilities), 'realtime'),
    maxCapacity: sumBy(compact(facilities), 'maxCapacity'),
    spacesAvailable: sumBy(compact(facilities), 'spacesAvailable'),
  }))(ParkAndRidePopup),
  {
    facilities: graphql`
      fragment ParkAndRideHubContent_facilities on CarPark
      @relay(plural: true) {
        spacesAvailable
        maxCapacity
        realtime
      }
    `,
  },
);

function ParkAndRideHubContent(props) {
  const { environment } = useContext(ReactRelayContext);
  return (
    <QueryRenderer
      query={graphql`
        query ParkAndRideHubContentQuery($stationIds: [String!]) {
          facilities: carParks(ids: $stationIds) {
            ...ParkAndRideHubContent_facilities
          }
        }
      `}
      variables={{ stationIds: props.ids }}
      environment={environment}
      render={({ props: renderProps }) =>
        renderProps ? (
          <ParkAndRideHub {...renderProps} name={props.name} />
        ) : (
          <div className="card" style={{ height: '12rem' }}>
            {' '}
            <Loading />{' '}
          </div>
        )
      }
    />
  );
}

ParkAndRideHubContent.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
};

export default ParkAndRideHubContent;
