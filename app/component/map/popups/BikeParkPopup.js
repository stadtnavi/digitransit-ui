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
    maxCapacity: PropTypes.number,
    name: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
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
          <div />
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
