import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
import { isBrowser } from '../util/browser';

class ItineraryCircleLine extends React.Component {
  static defaultProps = {
    isVia: false,
    color: null,
    renderBottomMarker: true,
  };

  static propTypes = {
    index: PropTypes.number.isRequired,
    modeClassName: PropTypes.string.isRequired,
    isVia: PropTypes.bool,
    color: PropTypes.string,
    renderBottomMarker: PropTypes.bool,
  };

  state = {
    imageUrl: 'none',
  };

  isFirstChild = () => {
    return this.props.index === 0 && this.props.isVia === false;
  };

  componentDidMount() {
    import(/* webpackChunkName: "dotted-line" */ `../configurations/images/default/dotted-line.svg`).then(
      imageUrl => {
        this.setState({ imageUrl: `url(${imageUrl.default})` });
      },
    );
  }

  getMarker = top => {
    if (this.isFirstChild() && top) {
      return (
        <div className="itinerary-icon-container">
          <Icon
            img="icon-icon_mapMarker-from"
            className="itinerary-icon from from-it"
          />
        </div>
      );
    }
    if (this.props.isVia === true) {
      return (
        <div className="itinerary-icon-container">
          <Icon
            img="icon-icon_mapMarker-via"
            className="itinerary-icon via via-it"
          />
        </div>
      );
    }
    return (
      <div
        className={`leg-before-circle circle ${this.props.modeClassName} ${
          top ? 'top' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          style={{ fill: this.props.color, stroke: this.props.color }}
        >
          <circle strokeWidth="4" width={28} cx={11} cy={10} r={6} />
        </svg>
      </div>
    );
  };

  render() {
    const topMarker = this.getMarker(true);
    const bottomMarker = this.getMarker(false);
    const legBeforeLineStyle = { color: this.props.color };
    if (
      isBrowser &&
      (this.props.modeClassName === 'walk' ||
        this.props.modeClassName === 'bicycle' ||
        this.props.modeClassName === 'bicycle_walk')
    ) {
      // eslint-disable-next-line global-require
      legBeforeLineStyle.backgroundImage = this.state.imageUrl;
    }

    return (
      <div
        className={`leg-before ${this.props.modeClassName}`}
        aria-hidden="true"
      >
        {topMarker}

        <div
          style={legBeforeLineStyle}
          className={`leg-before-line ${this.props.modeClassName}`}
        />
        {this.props.renderBottomMarker && <>{bottomMarker}</>}
      </div>
    );
  }
}

export default ItineraryCircleLine;
