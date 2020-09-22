import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Moment from 'moment';
import { routerShape } from 'react-router';
import Icon from './Icon';
import Loading from './Loading';

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

  getOfferedTimes = () => {
    let departureDay = '';
    const departureTime = new Moment(this.props.start).format('LT');
    if (this.state.isRegularly) {
      // If the offer is recurring, return all the selected days as a string.
      departureDay = this.state.selectedDays.join(', ');
      departureDay = departureDay.toLowerCase();
      departureDay =
        departureDay.charAt(0).toUpperCase() + departureDay.slice(1);
    } else {
      // If the offer is one-off, get the date from the epoch time.
      departureDay = new Moment(this.props.start).format('L');
    }
    return { departureDay, departureTime };
  };

  close() {
    this.context.router.goBack();
    this.setState({
      formState: 'initial',
    });
  }

  renderSuccessMessage() {
    const origin = this.props.from.name;
    const destination = this.props.to.name;
    const { departureDay, departureTime } = this.getOfferedTimes();
    const { isRegularly } = this.state;

    return (
      <div className="sidePanelText">
        <h2>
          <FormattedMessage id="thank-you" defaultMessage="Thank you!" />
        </h2>
        <div>
          <p>
            <FormattedMessage
              id="carpool-offer-success"
              values={{ origin, destination }}
              defaultMessage="Your offer from {origin} to {destination} was added."
            />
          </p>
          <p>
            {isRegularly ? (
              <FormattedMessage
                id="chosen-times-recurring"
                defaultMessage="You've set the following times and days: "
              />
            ) : (
              <FormattedMessage
                id="chosen-times-once"
                defaultMessage="You've set the following time: "
              />
            )}
            {departureDay} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
            {departureTime}.
          </p>
          <p>
            <FormattedMessage
              id="carpool-success-info"
              defaultMessage="Your offer will be deleted after the day of the ride. Regular ones will be removed after three months."
            />
          </p>
        </div>
        <button type="submit" className="sidePanel-btn" onClick={this.close}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </button>
      </div>
    );
  }

  renderForm() {
    const origin = this.props.from.name || this.props.from.split('::')[0];
    const destination = this.props.to.name || this.props.to.split('::')[0];
    const departure = new Moment(this.props.start).format('LT');

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
      </form>
    );
  }

  renderBody() {
    const { formState } = this.state;
    if (formState === 'initial') {
      return this.renderForm();
    }
    if (formState === 'sending') {
      return <Loading />;
    }
    if (formState === 'success') {
      return this.renderSuccessMessage();
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
