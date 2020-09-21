import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { routerShape } from 'react-router';

import ReactDOM from 'react-dom';
import moment from 'moment';
import LazilyLoad, { importLazy } from './LazilyLoad';
import OriginDestinationBar from './OriginDestinationBar';
import QuickSettingsPanel from './QuickSettingsPanel';
import StreetModeSelectorPanel from './StreetModeSelectorPanel';
import { getDrawerWidth, isBrowser } from '../util/browser';
import * as ModeUtils from '../util/modeUtils';
import { parseLocation, PREFIX_ITINERARY_SUMMARY } from '../util/path';
import withBreakpoint from '../util/withBreakpoint';
import { addAnalyticsEvent } from '../util/analyticsUtils';
import { MapMode, StreetMode } from '../constants';
import ToggleButton from './ToggleButton';

class SummaryNavigation extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }).isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    breakpoint: PropTypes.string.isRequired,
    serviceTimeRange: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    startTime: null,
    endTime: null,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    router: routerShape,
    location: PropTypes.object.isRequired,
    getStore: PropTypes.func.isRequired,
  };

  customizeSearchModules = {
    Drawer: () => importLazy(import('material-ui/Drawer')),
    CustomizeSearch: () => importLazy(import('./CustomizeSearchNew')),
  };

  carpoolOfferModules = {
    Drawer: () => importLazy(import('material-ui/Drawer')),
    CarpoolOffer: () => importLazy(import('./CarpoolOffer')),
  };

  saveSearchModules = {
    Drawer: () => importLazy(import('material-ui/Drawer')),
    SaveSearch: () => importLazy(import('./SaveSearch')),
  };

  componentDidMount() {
    this.unlisten = this.context.router.listen(location => {
      if (
        this.context.location.state &&
        this.context.location.state.customizeSearchOffcanvas &&
        (!location.state || !location.state.customizeSearchOffcanvas) &&
        !this.transitionDone &&
        location.pathname.startsWith(`/${PREFIX_ITINERARY_SUMMARY}/`)
      ) {
        this.transitionDone = true;
        const newLocation = {
          ...this.context.location,
          state: {
            ...this.context.location.state,
            customizeSearchOffcanvas: false,
          },
        };
        setTimeout(() => this.context.router.replace(newLocation), 0);
      } else {
        this.transitionDone = false;
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onRequestChange = newState => {
    this.internalSetOffcanvas(newState);
  };

  getOffcanvasState = () =>
    (this.context.location.state &&
      this.context.location.state.customizeSearchOffcanvas) ||
    false;

  getLazilyLoadForCarpool(isOpen) {
    const { location } = this.context;
    return (
      <LazilyLoad modules={this.carpoolOfferModules}>
        {({ Drawer, CarpoolOffer }) => (
          <Drawer
            className="offcanvas"
            disableSwipeToOpen
            openSecondary
            docked={false}
            open={isOpen}
            onRequestChange={this.onRequestChange}
            // Needed for the closing arrow button that's left of the drawer.
            containerStyle={{
              background: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
            }}
            width={getDrawerWidth(window)}
          >
            <CarpoolOffer
              duration={null}
              from={this.props.params.from}
              to={this.props.params.to}
              start={
                this.props.startTime ||
                (location.query &&
                  location.query.time &&
                  moment(location.query.time).unix())
              }
              onToggleClick={this.toggleOfferCarpool}
            />
          </Drawer>
        )}
      </LazilyLoad>
    );
  }

  getLazilyLoadForSaveSearch(isOpen) {
    const { location } = this.context;
    return (
      <LazilyLoad modules={this.saveSearchModules}>
        {({ Drawer, SaveSearch }) => (
          <Drawer
            className="offcanvas"
            disableSwipeToOpen
            openSecondary
            docked={false}
            open={isOpen}
            onRequestChange={this.onRequestChange}
            // Needed for the closing arrow button that's left of the drawer.
            containerStyle={{
              background: 'transparent',
              boxShadow: 'none',
              overflow: 'visible',
            }}
            width={getDrawerWidth(window)}
          >
            <SaveSearch
              duration={null}
              from={this.props.params.from}
              to={this.props.params.to}
              start={
                this.props.startTime ||
                (location.query &&
                  location.query.time &&
                  moment(location.query.time).unix())
              }
              onToggleClick={this.toggleSaveSearch}
            />
          </Drawer>
        )}
      </LazilyLoad>
    );
  }

  toggleCustomizeSearchOffcanvas = () => {
    this.internalSetOffcanvas(!this.getOffcanvasState());
  };

  internalSetOffcanvas = ({
    customizeSearchOffcanvas,
    carpoolOfferOffcanvas,
    saveSearchOffcanvas,
  }) => {
    addAnalyticsEvent({
      event: 'sendMatomoEvent',
      category: 'ItinerarySettings',
      action: 'ExtraSettingsPanelClick',
      name: customizeSearchOffcanvas
        ? 'ExtraSettingsPanelOpen'
        : 'ExtraSettingsPanelClose',
    });
    if (
      customizeSearchOffcanvas ||
      carpoolOfferOffcanvas ||
      saveSearchOffcanvas
    ) {
      this.context.router.push({
        ...this.context.location,
        state: {
          ...this.context.location.state,
          customizeSearchOffcanvas,
          carpoolOfferOffcanvas,
          saveSearchOffcanvas,
        },
      });
    } else {
      this.context.router.goBack();
    }
  };

  getCarpoolOffcanvasState = () =>
    (this.context.location.state &&
      this.context.location.state.carpoolOfferOffcanvas) ||
    false;

  toggleOfferCarpool = () => {
    this.internalSetOffcanvas({
      carpoolOfferOffcanvas: !this.getCarpoolOffcanvasState(),
      saveSearchOffcanvas: false,
    });
  };

  getSaveSearchOffcanvasState = () =>
    (this.context.location.state &&
      this.context.location.state.saveSearchOffcanvas) ||
    false;

  toggleSaveSearch = () => {
    this.internalSetOffcanvas({
      carpoolOfferOffcanvas: false,
      saveSearchOffcanvas: !this.getSaveSearchOffcanvasState(),
    });
  };

  renderStreetModeSelector = (config, router) => (
    <div className="street-mode-selector-panel-container">
      <StreetModeSelectorPanel
        selectedStreetMode={ModeUtils.getStreetMode(router.location, config)}
        selectStreetMode={(streetMode, isExclusive) => {
          ModeUtils.setStreetMode(streetMode, config, router, isExclusive);
          addAnalyticsEvent({
            action: 'SelectTravelingModeFromQuickSettings',
            category: 'ItinerarySettings',
            name: streetMode,
          });
          const MapModeStore = this.context.getStore('MapModeStore');
          if (streetMode === StreetMode.Bicycle) {
            MapModeStore.setPrevMapMode(MapModeStore.getMapMode());
            MapModeStore.setMapMode(MapMode.Bicycle);
          }
          if (streetMode !== StreetMode.Bicycle) {
            MapModeStore.setMapMode(MapModeStore.getPrevMapMode());
          }
        }}
        streetModeConfigs={ModeUtils.getAvailableStreetModeConfigs(config)}
      />
    </div>
  );

  render() {
    const { config, router } = this.context;
    const className = cx({ 'bp-large': this.props.breakpoint === 'large' });
    const isOpen = this.getOffcanvasState();
    const isCarpoolOpen = this.getCarpoolOffcanvasState();
    const isSaveSearchOpen = this.getSaveSearchOffcanvasState();

    return (
      <div className="summary-navigation-container">
        <OriginDestinationBar
          className={className}
          origin={parseLocation(this.props.params.from)}
          destination={parseLocation(this.props.params.to)}
        />
        {isBrowser && (
          <React.Fragment>
            {this.renderStreetModeSelector(config, router)}
            <div className={cx('quicksettings-separator-line')} />
            <QuickSettingsPanel
              timeSelectorStartTime={this.props.startTime}
              timeSelectorEndTime={this.props.endTime}
              timeSelectorServiceTimeRange={this.props.serviceTimeRange}
            >
              <span className="offcanvas-buttons">
                {this.context.config.showCarpoolOffer && (
                  <ToggleButton
                    className="standalone-btn carpool-offer-btn"
                    showButtonTitle
                    label="offer-ride"
                    onBtnClick={this.toggleOfferCarpool}
                  />
                )}
                {this.context.config.showSaveSearch && (
                  <ToggleButton
                    className="standalone-btn carpool-offer-btn"
                    showButtonTitle
                    label="save-search"
                    onBtnClick={this.toggleSaveSearch}
                  />
                )}
              </span>
              {ReactDOM.createPortal(
                this.getLazilyLoadForCarpool(isCarpoolOpen),
                document.getElementById('app'),
              )}
              {ReactDOM.createPortal(
                this.getLazilyLoadForSaveSearch(isSaveSearchOpen),
                document.getElementById('app'),
              )}
            </QuickSettingsPanel>
          </React.Fragment>
        )}
        <LazilyLoad modules={this.customizeSearchModules}>
          {({ Drawer, CustomizeSearch }) => (
            <Drawer
              className="offcanvas"
              disableSwipeToOpen
              openSecondary
              docked={false}
              open={isOpen}
              onRequestChange={this.onRequestChange}
              // Needed for the closing arrow button that's left of the drawer.
              containerStyle={{
                background: 'transparent',
                boxShadow: 'none',
                overflow: 'visible',
              }}
              style={{
                // hide root element from screen reader in sync with drawer animation
                transition: 'visibility 450ms',
                visibility: isOpen ? 'visible' : 'hidden',
              }}
              width={getDrawerWidth(window)}
            >
              <CustomizeSearch
                params={this.props.params}
                onToggleClick={this.toggleCustomizeSearchOffcanvas}
              />
            </Drawer>
          )}
        </LazilyLoad>
      </div>
    );
  }
}

export default withBreakpoint(SummaryNavigation);
