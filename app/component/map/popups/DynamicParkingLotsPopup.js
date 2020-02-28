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
    const inSevenDays = Moment()
      .add(7, 'days')
      .format('YYYY/MM/DD');
    const text = [];
    let openUntil = '';

    Moment.locale('de');

    const paidHours = new OpeningHours(
      this.props.feature.properties.paid_hours,
      null,
      { locale: 'en' },
    );

    const intervals = paidHours.getOpenIntervals(NOW, new Date(inSevenDays));

    const isOpenNow = paidHours.getState(NOW) ? 'open' : 'closed';

    for (let i in intervals) {
      text.push(
        `${Moment(intervals[i][0]).format('dd')} ${Moment(
          intervals[i][0],
        ).format('HH:mm')}-${Moment(intervals[i][1]).format('HH:mm')}.`,
      );
    }

    if (isOpenNow === 'open') {
      openUntil = `until ${Moment(intervals[0][1]).format('HH:mm')}`;
      text.shift();
    }

    return (
      <div className="padding-vertical-small">
        <div>Now: <b>{isOpenNow} {openUntil}</b></div>
        <div>
          Upcoming opening hours:<br />
          {text}
        </div>
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
        {this.props.feature.properties.paid_hours ? this.getPaidHours() : ''}
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
