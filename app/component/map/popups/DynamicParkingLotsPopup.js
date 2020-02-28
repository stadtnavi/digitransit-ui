import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import { intlShape } from 'react-intl';
import OpeningHours from 'opening_hours';
import Moment from 'moment';
import MarkerPopupBottom from '../MarkerPopupBottom';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import { station as exampleStation } from '../../ExampleData';
import ComponentUsageExample from '../../ComponentUsageExample';

class DynamicParkingLotsPopup extends React.Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
  };

  static description = (
    <div>
      <p>Renders a citybike popup.</p>
      <ComponentUsageExample description="">
        <DynamicParkingLotsPopup
          context="context object here"
          station={exampleStation}
        >
          Im content of a citybike card
        </DynamicParkingLotsPopup>
      </ComponentUsageExample>
    </div>
  );

  static displayName = 'ParkingLotPopup';

  static propTypes = {
    feature: PropTypes.object.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  };

  getPaidHours() {
    const NOW = new Date();

    Moment.locale('de');
    var oh = new OpeningHours(this.props.feature.properties.paid_hours, null, {'locale': 'en'});
    var from = new Date('23 Feb 2020');
    var to = new Date('29 Feb 2020');
    var intervals = oh.getOpenIntervals(from, to);
    let isOpenNow = 'Now: ' + (oh.getState(NOW) ? 'open' : 'closed');
    console.log('Further this week:');
    for (var i in intervals)
      console.log('From ' + Moment(intervals[i][0]).format('dd HH:mm') + ' till ' + Moment(intervals[i][1]).format('HH:mm') + '.');
    return (
      <div className="padding-vertical-small">
        <div>{isOpenNow}</div>
        <div>Further this week:</div>
      </div>
    );
  }

  getCapacity() {
    const { intl } = this.context;
    let text;
    if (this.props.feature.properties && this.props.feature.properties.free) {
      text = intl.formatMessage(
        {
          id: 'parking-spaces-available',
          defaultMessage: '{free} of {total} parking spaces available',
        },
        this.props.feature.properties,
      );
    } else {
      text = intl.formatMessage(
        {
          id: 'parking-spaces-in-total',
          defaultMessage: 'Capacity: {total} parking spaces',
        },
        this.props.feature.properties,
      );
    }

    return <div className="padding-vertical-small">{text}</div>;
  }

  getUrl() {
    const { intl } = this.context;
    if (this.props.feature.properties && this.props.feature.properties.url) {
      return (
        <div className="padding-vertical-small">
          <a
            href={this.props.feature.properties.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage({
              id: 'extra-info',
              defaultMessage: 'More information',
            })}
          </a>
        </div>
      );
    }
    return null;
  }

  render() {
    const desc = (
      <div>
        {this.getCapacity()}
        {this.getPaidHours()}
        {this.getUrl()}
      </div>
    );
    return (
      <Card>
        <div className="padding-normal">
          <CardHeader
            name={this.props.feature.properties.name}
            description={desc}
            unlinked
            className="padding-small"
          />
        </div>
        <MarkerPopupBottom
          location={{
            address: this.props.feature.properties.name,
            lat: this.props.lat,
            lon: this.props.lon,
          }}
        />
      </Card>
    );
  }
}

DynamicParkingLotsPopup.contextTypes = {
  intl: intlShape.isRequired,
};

export default Relay.createContainer(DynamicParkingLotsPopup, {
  fragments: {
    /* station: () => Relay.QL`
      fragment on BikeRentalStation {
        stationId
        name
        lat
        lon
        bikesAvailable
        spacesAvailable
        state
      }
    `, */
  },
});
