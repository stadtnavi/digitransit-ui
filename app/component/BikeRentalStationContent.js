import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import { routerShape, RedirectException } from 'found';

import CityBikeStopContent from './CityBikeStopContent';
import BikeRentalStationHeader from './BikeRentalStationHeader';
import Icon from './Icon';
import withBreakpoint from '../util/withBreakpoint';
import {
  getCityBikeNetworkConfig,
  getCityBikeNetworkId,
} from '../util/citybikes';
import { isBrowser } from '../util/browser';
import { PREFIX_BIKESTATIONS } from '../util/path';

const BikeRentalStationContent = (
  { bikeRentalStation, breakpoint, language, router },
  { config },
) => {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    // To prevent SSR from rendering something https://reactjs.org/docs/react-dom.html#hydrate
    setClient(true);
  });

  if (!bikeRentalStation) {
    if (isBrowser) {
      router.replace(`/${PREFIX_BIKESTATIONS}`);
    } else {
      throw new RedirectException(`/${PREFIX_BIKESTATIONS}`);
    }
    return null;
  }
  const { bikesAvailable, capacity } = bikeRentalStation;
  const isFull = bikesAvailable >= capacity;

  const networkConfig = getCityBikeNetworkConfig(
    bikeRentalStation.networks[0],
    config,
  );
  const url = networkConfig.url[language];
  let returnInstructionsUrl;
  if (networkConfig.returnInstructions) {
    returnInstructionsUrl = networkConfig.returnInstructions[language];
  }
  const { cityBike } = config;
  const cityBikeBuyUrl = cityBike.buyUrl;
  let cityBikeNetworkUrl;
  // Use general information about using city bike, if one network config is available
  if (Object.keys(cityBike.networks).length === 1) {
    cityBikeNetworkUrl = getCityBikeNetworkConfig(
      getCityBikeNetworkId(Object.keys(cityBike.networks)),
      config,
    ).url;
  }
  return (
    <div className="bike-station-page-container">
      <BikeRentalStationHeader
        bikeRentalStation={bikeRentalStation}
        breakpoint={breakpoint}
      />
      <CityBikeStopContent bikeRentalStation={bikeRentalStation} />
      {config.cityBike.showFullInfo && isFull && (
        <div className="citybike-full-station-guide">
          <FormattedMessage id="citybike-return-full" />
          <a
            onClick={e => {
              e.stopPropagation();
            }}
            className="external-link-citybike"
            href={returnInstructionsUrl}
          >
            {' '}
            <FormattedMessage id="citybike-return-full-link" />{' '}
          </a>
        </div>
      )}
      {(cityBikeBuyUrl || cityBikeNetworkUrl) && (
        <div className="citybike-use-disclaimer">
          <div className="disclaimer-header">
            <FormattedMessage id="citybike-start-using" />
          </div>
          <div className="disclaimer-content">
            {cityBikeBuyUrl ? (
              <FormattedMessage id="citybike-buy-season" />
            ) : (
              <a
                className="external-link-citybike"
                href={cityBikeNetworkUrl[language]}
              >
                <FormattedMessage id="citybike-start-using-info" />{' '}
              </a>
            )}
          </div>
          {isClient && cityBikeBuyUrl && (
            <a
              onClick={e => {
                e.stopPropagation();
              }}
              className="external-link"
              href={url}
            >
              <FormattedMessage id="citybike-purchase-link" />
              <Icon img="icon-icon_external-link-box" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
BikeRentalStationContent.propTypes = {
  bikeRentalStation: PropTypes.any,
  breakpoint: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  router: routerShape.isRequired,
};
BikeRentalStationContent.contextTypes = {
  config: PropTypes.object.isRequired,
};
const BikeRentalStationContentWithBreakpoint = withBreakpoint(
  BikeRentalStationContent,
);

const connectedComponent = connectToStores(
  BikeRentalStationContentWithBreakpoint,
  ['PreferencesStore'],
  context => ({
    language: context.getStore('PreferencesStore').getLanguage(),
  }),
);

const containerComponent = createFragmentContainer(connectedComponent, {
  bikeRentalStation: graphql`
    fragment BikeRentalStationContent_bikeRentalStation on BikeRentalStation {
      lat
      lon
      name
      spacesAvailable
      bikesAvailable
      capacity
      networks
      stationId
      state
    }
  `,
});

export {
  containerComponent as default,
  BikeRentalStationContentWithBreakpoint as Component,
};
