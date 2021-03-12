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

  render() {
    const { name } = this.props;
    return (
      <Card>
        <div className="padding-normal">
          <CardHeader
            name={name}
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
            address: name,
            lat: this.props.lat,
            lon: this.props.lon,
          }}
        />
      </Card>
    );
  }
}

export default BikeParkPopup;
