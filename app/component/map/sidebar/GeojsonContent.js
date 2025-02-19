import React from 'react';
import PropTypes from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import SidebarContainer from './SidebarContainer';
import SelectedFeatureStore from '../../../store/SelectedFeatureStore';
import Icon from '../../Icon';
import OSMOpeningHours from '../popups/OSMOpeningHours';

const GeoJsonContent = ({ match, selectedFeature }) => {
  const { lat, lng } = match.location.query;

  const {
    name,
    address,
    openingHours,
    openingHoursText,
    phone,
    website,
    popupContent,
    icon,
    imageUrl,
    email,
  } = selectedFeature?.properties || {};

  const svg = icon?.svg;
  return (
    <SidebarContainer
      location={
        lat &&
        lng && {
          address,
          lat: Number(lat),
          lon: Number(lng),
        }
      }
      name={name}
      dataURI={svg ? `data:image/svg+xml;base64,${btoa(svg)}` : undefined}
      description=""
    >
      <div className="scrollable-content-wrapper scroll-target momentum-scroll content">
        {imageUrl && (
          <div className="text-light sidebar-info-container">
            <img src={imageUrl} alt={name} />
          </div>
        )}
        {(address || phone || website || email) && <div className="divider" />}
        {address && (
          <div className="text-light sidebar-info-container">
            <Icon className="sidebar-info-icon" img="icon-icon_place" />
            <span className="text-alignment">{address}</span>
            <br />
            <br />
          </div>
        )}
        {phone && (
          <div className="text-light sidebar-info-container">
            <Icon className="sidebar-info-icon" img="icon-icon_phone" />
            <span className="text-alignment">
              <a href={`tel:${phone}`}>{phone}</a>
            </span>
            <br />
            <br />
          </div>
        )}
        {website && (
          <div className="text-light sidebar-info-container">
            <Icon className="sidebar-info-icon" img="icon-icon_website" />
            <span className="text-alignment">
              <a target="_blank" rel="noopener noreferrer" href={website}>
                {website}
              </a>
            </span>
            <br />
            <br />
          </div>
        )}
        {email && (
          <div className="text-light sidebar-info-container">
            <Icon className="sidebar-info-icon" img="icon-icon_email" />
            <span className="text-alignment">
              <a href={`mailto:${email}`}>{email}</a>
            </span>
            <br />
            <br />
          </div>
        )}
        {!openingHoursText && openingHours && (
          <>
            <div className="divider" />
            <div className="text-light sidebar-info-container">
              <OSMOpeningHours openingHours={openingHours} displayStatus />
            </div>
          </>
        )}
        {openingHoursText && (
          <>
            <div className="divider" />
            <div className="text-light sidebar-info-container">
              <Icon className="sidebar-info-icon" img="icon-icon_schedule" />
              <span
                className="text-alignment"
                dangerouslySetInnerHTML={{ __html: openingHoursText }}
              />
            </div>
          </>
        )}
        {popupContent && (
          <>
            <div className="divider" />
            <div
              className="text-light sidebar-info-container"
              dangerouslySetInnerHTML={{ __html: popupContent }}
            />
          </>
        )}
      </div>
    </SidebarContainer>
  );
};

GeoJsonContent.propTypes = {
  match: PropTypes.object,
  selectedFeature: PropTypes.object,
};

GeoJsonContent.contextTypes = {
  getStore: PropTypes.func.isRequired,
};

const connectedComponent = connectToStores(
  GeoJsonContent,
  [SelectedFeatureStore],
  ({ getStore }) => ({
    selectedFeature: getStore(SelectedFeatureStore).getSelectedFeature(),
  }),
);

export { connectedComponent as default, GeoJsonContent as Component };
