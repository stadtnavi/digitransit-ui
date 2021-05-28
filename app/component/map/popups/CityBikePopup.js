import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import MarkerPopupBottom from '../MarkerPopupBottom';
import Card from '../../Card';
import CardHeader from '../../CardHeader';

class CityBikePopup extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  static displayName = 'CityBikePopup';

  static propTypes = {
    maxCapacity: PropTypes.number,
    id: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    onSelectLocation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    maxCapacity: 0,
    id: '',
  };

  getCapacity() {
    const { maxCapacity } = this.props;
    if (maxCapacity > 0) {
      return (
        <span className="inline-block padding-vertical-small">
          <FormattedMessage
            id="vehicles-in-total"
            defaultMessage="{total} vehicles available"
            values={{ total: maxCapacity }}
          />
        </span>
      );
    }
    return null;
  }

  getName() {
    const { intl } = this.context;
    const { id } = this.props;
    const cleaned = id.replace('Sharing Services', '').trim();
    if (cleaned.length) {
      return cleaned;
    }
    return intl.formatMessage({
      id: 'citybike',
      defaultMessage: 'Sharing',
    });
  }

  render() {
    const name = this.getName();
    return (
      <Card>
        <div className="padding-normal">
          <CardHeader
            name={name}
            description=""
            descClass="padding-vertical-small"
            unlinked
            className="padding-medium"
            headingStyle="h2"
          />
          {this.getCapacity()}
          <div />
        </div>
        <MarkerPopupBottom
          onSelectLocation={this.props.onSelectLocation}
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

export default CityBikePopup;
