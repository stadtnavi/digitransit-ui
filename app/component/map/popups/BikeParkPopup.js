import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import MarkerPopupBottom from '../MarkerPopupBottom';
import Card from '../../Card';
import CardHeader from '../../CardHeader';

class BikeParkPopup extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static displayName = 'BikeParkPopup';

  static propTypes = {
    id: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number,
    name: PropTypes.string,
  };

  getCapacity() {
    const { maxCapacity } = this.props;
    if (maxCapacity > 0) {
      return (
        <span className="inline-block padding-vertical-small">
          <FormattedMessage
            id="parking-spaces-in-total"
            defaultMessage="{total} parking spaces"
            values={{ total: maxCapacity }}
          />
        </span>
      );
    }
    return null;
  }

  static getName(name, intl) {
    const cleaned = name.replace('Bicycle parking', '').trim();
    if (cleaned.length) {
      return cleaned;
    }
    return intl.formatMessage({
      id: 'bicycle-parking',
      defaultMessage: 'Bicycle parking',
    });
  }

  getBookingButton() {
    const { id } = this.props;
    if (id === '28353623') {
      return (
        <div className="bikebox">
          <img
            src="https://backend.openbikebox.next-site.de/static/files/2.jpg"
            alt=""
          />
          <div>
            <button
              onClick={() =>
                window.open(
                  'https://openbikebox.next-site.de/location/herrenberg-bahnhof/',
                )
              }
              className="standalone-btn cursor-pointer"
            >
              Bikebox buchen
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { intl } = this.context;
    const { name } = this.props;
    const cleanedName = BikeParkPopup.getName(name, intl);
    return (
      <Card>
        <div className="padding-normal">
          <CardHeader
            name={cleanedName}
            description={this.getCapacity()}
            descClass="padding-vertical-small"
            unlinked
            className="padding-medium"
            headingStyle="h2"
          />
          <div>{this.getBookingButton()}</div>
        </div>
        <MarkerPopupBottom
          location={{
            address: cleanedName,
            lat: this.props.lat,
            lon: this.props.lon,
          }}
        />
      </Card>
    );
  }
}

export default BikeParkPopup;
