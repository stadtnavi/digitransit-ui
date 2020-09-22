import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Moment from 'moment';
import { routerShape } from 'react-router';
import Icon from './Icon';
import Loading from './Loading';
import LoginButton from './LoginButton';

export default class SaveSearch extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
    config: PropTypes.object.isRequired,
    router: routerShape,
  };

  static propTypes = {
    onToggleClick: PropTypes.func.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formState: 'initial',
    };
    this.finishForm = this.finishForm.bind(this);
    this.close = this.close.bind(this);
  }

  finishForm = e => {
    e.preventDefault();
    /*
    const carpoolOffer = {
      origin: {
        label: this.props.from.name,
        lat: this.props.from.lat,
        lon: this.props.from.lon,
      },
      destination: {
        label: this.props.to.name,
        lat: this.props.to.lat,
        lon: this.props.to.lon,
      },
      time: {
        departureTime: new Moment(this.props.start).format('HH:mm'),
      },
    };

    this.setState({ formState: 'sending' });
    
    fetch('/saved-searches', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(carpoolOffer),
      // eslint-disable-next-line func-names
    }).then(response => {
      if (response.status === 200) {
        this.setState({ formState: 'success' });
      }
      return response.json();
    });
     */
  };

  close() {
    this.context.router.goBack();
    this.setState({
      formState: 'initial',
    });
  }

  renderSuccessMessage(origin, destination, departure) {
    return (
      <div className="sidePanelText">
        <h2>
          <FormattedMessage id="thank-you" defaultMessage="Thank you!" />
        </h2>
        <div>
          <p>
            <h2>
              <FormattedMessage id="your-search" defaultMessage="Your search" />
            </h2>
            <p>
              <b>
                <FormattedMessage id="origin" defaultMessage="Origin" />
              </b>
              : {origin} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
              {departure}{' '}
              <FormattedMessage id="time-oclock" defaultMessage=" " />
              <br />
              <b>
                <FormattedMessage
                  id="destination"
                  defaultMessage="Destination"
                />
              </b>
              : {destination}
            </p>
          </p>
          <button type="submit" className="sidePanel-btn" onClick={this.close}>
            <FormattedMessage id="close" defaultMessage="Close" />
          </button>
        </div>
        {this.renderSavedSearches()}
      </div>
    );
  }

  renderForm(origin, destination, departure) {
    return (
      <form onSubmit={this.finishForm} className="sidePanelText">
        <h2>
          <FormattedMessage id="your-search" defaultMessage="Your search" />
        </h2>
        <p>
          <b>
            <FormattedMessage id="origin" defaultMessage="Origin" />
          </b>
          : {origin} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
          {departure} <FormattedMessage id="time-oclock" defaultMessage=" " />
          <br />
          <b>
            <FormattedMessage id="destination" defaultMessage="Destination" />
          </b>
          : {destination}
        </p>
        <button className="standalone-btn" type="submit">
          <FormattedMessage id="save-search" defaultMessage="Save search" />
        </button>
      </form>
    );
  }

  renderLogin = (origin, destination, departure) => {
    return (
      <div className="sidePanelText">
        <h2>
          <FormattedMessage id="your-search" defaultMessage="Your search" />
        </h2>
        <p>
          <b>
            <FormattedMessage id="origin" defaultMessage="Origin" />
          </b>
          : {origin} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
          {departure} <FormattedMessage id="time-oclock" defaultMessage=" " />
          <br />
          <b>
            <FormattedMessage id="destination" defaultMessage="Destination" />
          </b>
          : {destination}
        </p>
        Please log in to save.
        <LoginButton />
      </div>
    );
  };

  renderSavedSearches = () => {
    return (
      <div>
        <h2>Your already saved searches:</h2>
      </div>
    );
  };

  renderBody() {
    const userLoggedIn = false;
    const { formState } = this.state;
    const origin = this.props.from.name || this.props.from.split('::')[0];
    const destination = this.props.to.name || this.props.to.split('::')[0];
    const departure = new Moment(this.props.start).format('LT');

    if (!userLoggedIn) {
      return this.renderLogin(origin, destination, departure);
    }
    if (formState === 'initial') {
      return this.renderForm(origin, destination, departure);
    }
    if (formState === 'sending') {
      return <Loading />;
    }
    if (formState === 'success') {
      return this.renderSuccessMessage(origin, destination, departure);
    }
    return null;
  }

  render() {
    const { onToggleClick } = this.props;

    const stopPropagation = ev => {
      ev.stopPropagation();
    };

    return (
      // disabled because this thing only prevents events from propagating
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="customize-search carpool-offer"
        onClick={stopPropagation}
        onKeyPress={stopPropagation}
      >
        <button className="close-offcanvas" onClick={onToggleClick}>
          <Icon className="close-icon" img="icon-icon_close" />
        </button>
        <Icon img="icon-icon_save" height={8} width={8} />
        {this.renderBody()}
      </div>
    );
  }
}
