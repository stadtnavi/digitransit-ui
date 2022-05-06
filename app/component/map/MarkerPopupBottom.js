import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMap } from 'react-leaflet';
import { dtLocationShape } from '../../util/shapes';
import { addAnalyticsEvent } from '../../util/analyticsUtils';

class MarkerPopupBottom extends React.Component {
  static displayName = 'MarkerPopupBottom';

  static propTypes = {
    location: dtLocationShape.isRequired,
    onSelectLocation: PropTypes.func.isRequired,
    locationPopup: PropTypes.string,
  };

  static defaultProps = {
    locationPopup: 'all', // show add via point by default
  };

  routeFrom = () => {
    addAnalyticsEvent({
      action: 'EditJourneyStartPoint',
      category: 'ItinerarySettings',
      name: 'MapPopup',
    });
    this.props.onSelectLocation(this.props.location, 'origin');
    const mapInstance = useMap();
    mapInstance.closePopup();
  };

  routeTo = () => {
    addAnalyticsEvent({
      action: 'EditJourneyEndPoint',
      category: 'ItinerarySettings',
      name: 'MapPopup',
    });
    this.props.onSelectLocation(this.props.location, 'destination');
    useMap().closePopup();
  };

  routeAddViaPoint = () => {
    addAnalyticsEvent({
      action: 'AddJourneyViaPoint',
      category: 'ItinerarySettings',
      name: 'MapPopup',
    });
    this.props.onSelectLocation(this.props.location, 'via');
    useMap().closePopup();
  };

  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
  render() {
    return (
      <div className="bottom location">
        <div onClick={() => this.routeFrom()} className="route cursor-pointer">
          <FormattedMessage
            id="route-from-here"
            defaultMessage="Route from here"
          />
        </div>
        {this.props.locationPopup === 'all' && (
          <div
            onClick={() => this.routeAddViaPoint()}
            className="route cursor-pointer route-add-viapoint"
          >
            <FormattedMessage
              id="route-add-viapoint"
              defaultMessage="Via point"
            />
          </div>
        )}
        <div onClick={() => this.routeTo()} className="route cursor-pointer">
          <FormattedMessage id="route-here" defaultMessage="Route here" />
        </div>
      </div>
    );
  }
}

export { MarkerPopupBottom as default, MarkerPopupBottom as Component };
