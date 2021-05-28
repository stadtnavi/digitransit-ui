import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';
import QueryRenderer from 'react-relay/lib/ReactRelayQueryRenderer';
import ReactRelayContext from 'react-relay/lib/ReactRelayContext';

import withProps from 'recompose/withProps';
import Loading from '../../../Loading';
import ParkAndRideContent from './ParkAndRideContent';

const ParkAndRideFacility = createFragmentContainer(
  withProps(props => ({
    realtime: props.facility.realtime,
    maxCapacity: props.facility.maxCapacity,
    spacesAvailable: props.facility.spacesAvailable,
  }))(ParkAndRideContent),
  {
    facility: graphql`
      fragment ParkAndRideFacilityContent_facility on CarPark {
        spacesAvailable
        maxCapacity
        realtime
      }
    `,
  },
);

function ParkAndRideFacilityContent(props) {
  const { facilityIds, facilityName } = props.match.location.query;
  const { environment } = useContext(ReactRelayContext);
  return (
    <QueryRenderer
      query={graphql`
        query ParkAndRideFacilityContentQuery($stationId: String!) {
          facility: carPark(id: $stationId) {
            ...ParkAndRideFacilityContent_facility
          }
        }
      `}
      variables={{ stationId: facilityIds }}
      environment={environment}
      render={({ props: renderProps }) =>
        renderProps ? (
          <ParkAndRideFacility {...renderProps} name={facilityName} />
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

ParkAndRideFacilityContent.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ParkAndRideFacilityContent;
