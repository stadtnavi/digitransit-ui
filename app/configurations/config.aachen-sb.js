/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'aachen-sb';
const APP_TITLE = 'Innenstadtnavi Aachen';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.aachen-sb.stadtnavi.eu';
const OTP_URL = process.env.OTP_URL || `${API_URL}/otp/routers/default/`;
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon-eu.stadtnavi.eu/pelias/v1";
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.empty.json';

const parentConfig = require('./config.aachen.js').default;


export default configMerger(parentConfig, {
    CONFIG,
    URL: {
        OTP: OTP_URL,
        MAP: {
            satellite: 'https://www.wmts.nrw.de/geobasis/wmts_nw_dop/tiles/nw_dop/EPSG_3857_16/{z}/{x}/{y}',
        },
        STOP_MAP: `${OTP_URL}vectorTiles/stops/`,
        PARK_AND_RIDE_MAP: `${OTP_URL}vectorTiles/parking/`,
        RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/rentalStations/`,
        RENTAL_VEHICLE_MAP: `${OTP_URL}vectorTiles/rentalVehicles/`,
        REALTIME_RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/realtimeRentalStations/`,
        CHARGING_STATIONS_MAP: `https://api.ocpdb.de/tiles/{z}/{x}/{y}.mvt`,
        CHARGING_STATION_DETAILS_API: 'https://api.ocpdb.de/api/ocpi/2.2/location/',
        PELIAS: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL}/search`,
        PELIAS_REVERSE_GEOCODER: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/reverse`,
        PELIAS_PLACE: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/place`,
        FONT: '', // Do not use Google fonts.
        EMBEDDED_SEARCH_GENERATION: '/embeddedSearchGenerator',
    },

    title: APP_TITLE,
    meta: {
        description: APP_DESCRIPTION,
    },

    //searchPanelText: 'Wohin?',

    map: {
        attribution: {
            'default': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>© <a tabindex=-1 href="https://www.maptiler.com/copyright/">MapTiler</a> ÖPNV-Daten: <a tabindex=-1 href=https://avv.de/de/fahrplaene/opendata-service>AVV GmbH</a></a>',
            'satellite': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a> © <a tabindex=-1 href="https://www.lgl-bw.de/">LGL BW</a>,ÖPNV-Daten: <a tabindex=-1 href=https://avv.de/de/fahrplaene/opendata-service>AVV GmbH</a>',
            'bicycle': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a> ÖPNV-Daten: <a tabindex=-1 href=https://avv.de/de/fahrplaene/opendata-service>AVV GmbH</a>',
        },
    },

    appBarTitle: '| Zukunftsrouting',
    
    
    // -- Menu and content customization ----

    staticMessagesUrl: STATIC_MESSAGE_URL,

});
