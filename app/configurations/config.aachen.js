/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'aachen';
const APP_TITLE = 'Op Jöck.';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.aachen-sb.stadtnavi.eu';
const OTP_URL = process.env.OTP_URL || `${API_URL}/otp/routers/default/`;
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon-eu.stadtnavi.eu/pelias/v1";
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.empty.json';

const parentConfig = require('./config.stadtnavi.js').default;

const minLat = 50.39;
const maxLat = 51.31;
const minLon = 5.02;
const maxLon = 7.21;

export default configMerger(parentConfig, {
    CONFIG,
    URL: {
        OTP: OTP_URL,
        MAP: {
            satellite: 'https://www.wmts.nrw.de/geobasis/wmts_nw_dop/tiles/nw_dop/EPSG_3857_16/{z}/{x}/{y}',
        },
        STOP_MAP: `${OTP_URL}vectorTiles/stops/`,
        PARK_AND_RIDE_MAP: `${OTP_URL}vectorTiles/parking/`,
        // TODO ROADWORKS_MAP: `${API_URL}/map/v1/cifs/`,
        RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/rentalStations/`,
        RENTAL_VEHICLE_MAP: `${OTP_URL}vectorTiles/rentalVehicles/`,
        REALTIME_RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/realtimeRentalStations/`,
        
        PELIAS: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL}/search`,
        PELIAS_REVERSE_GEOCODER: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/reverse`,
        PELIAS_PLACE: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/place`,
        FARES: `${API_URL}/fares`,
        FONT: '', // Do not use Google fonts.
        EMBEDDED_SEARCH_GENERATION: '/embeddedSearchGenerator',
    },

    title: APP_TITLE,
    meta: {
        description: APP_DESCRIPTION,
    },

    map: {
        attribution: {
            'default': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>© <a tabindex=-1 href="https://www.maptiler.com/copyright/">MapTiler</a> ÖPNV-Daten: <a tabindex=-1 href=https://avv.de/de/fahrplaene/opendata-service>AVV GmbH</a></a>',
            'satellite': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a> © <a tabindex=-1 href="https://www.lgl-bw.de/">LGL BW</a>,ÖPNV-Daten: <a tabindex=-1 href=https://avv.de/de/fahrplaene/opendata-service>AVV GmbH</a>',
            'bicycle': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a> ÖPNV-Daten: <a tabindex=-1 href=https://avv.de/de/fahrplaene/opendata-service>AVV GmbH</a>',
        },
    },

    // -- Style configuration  ----
    textLogo: true,
    appBarTitle: 'Das Aachener stadtnavi',
    //logo: 'aachen/logo.svg',
    favicon: './app/configurations/images/aachen/stadt-aachen.png',
    
    colors: {
        primary: '#6E9BD2',
        iconColors: {
            'mode-bus': '#B70F75',
        }
    },

    // -- Bounding boxes for display and search ----

    searchParams: {
        'boundary.rect.min_lat': 51.31,
        'boundary.rect.max_lat': 50.39,
        'boundary.rect.min_lon': 5.02,
        'boundary.rect.max_lon': 7.21,
        'focus.point.lat': 50.7754,
        'focus.point.lon': 6.0847
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    defaultEndpoint: {
        lat: 50.7754,
        lon: 6.0847,
    },

    transportModes: {
        subway: {
            availableForSelection: false,
        },
        carpool: {
            availableForSelection: false,
        },
        funicular: {
            availableForSelection: false,
        },
    },

    // -- Map-Layers configuration -----

    // adding assets/geoJson/hb-layers layers
    geoJson: {
        layers: [
            // bicycleinfrastructure includes shops, repair stations,
        ],
    },

    // -- Routing configuration

    parkAndRideBannedVehicleParkingTags: [
        'lot_type:Parkplatz',
        'lot_type:Tiefgarage',
        'lot_type:Parkhaus'
    ],

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            
        }
    },

    
    feedIds: ['1'], // TODO: GTFS Feed AVV contains feed_info.txt, but no feed_id

    // -- Menu and content customization ----

    staticMessagesUrl: STATIC_MESSAGE_URL,

    menu: {
        copyright: { label: `© Aachen ${parentConfig.YEAR}` },
        content: [
            {
                name: 'about-this-service',
                nameEn: 'About this service',
                route: '/dieser-dienst',
                icon: 'icon-icon_info',
            },
            {
                name: 'imprint',
                nameEn: 'Imprint',
                href: 'https://www.aachen.de/DE/stadt_buerger/allgemeines/impressum.html',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: 'https://www.aachen.de/DE/stadt_buerger/allgemeines/datenschutz.html',
            },
        ],
    },

    aboutThisService: {
        de: [
            {
                header: 'Über diesen Dienst',
                paragraphs: [
                    'stadtnavi Aachen ist eine Reiseplanungs-Anwendung für Aachen und Umgebung. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, Straßen- und Parkplatzinformationen, Ladeinfrastruktur und Sharing-Angebote. Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt.',
                    'Gefördert durch <br>',
                    '<a href="https://www.herrenberg.de/stadtluft"><img src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',

                ],
            },
            {
                header: 'Mitmachen',
                paragraphs: [
                    'Die Stadt Herrenberg hat diese App im Rahmen der Modellstadt, gefördert durch das Bundesministerium für Verkehr und digitale Infrastruktur (BMVI) entwickelt. stadtnavi Anwendung ist eine Open Source Lösung und kann von anderen Kommunen und Akteuren unter ihrem Namen und Erscheinungsbild verwendet und an individuelle Bedürfnisse angepasst und weiterentwickelt werden (White Label Lösung). Mitmachen ist gewünscht!',
                ]
            },
            {
                header: 'Digitransit Plattform',
                paragraphs: [
                    'Dieser Dienst basiert auf der Digitransit Platform und dem Backend-Dienst OpenTripPlanner. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beteiligten.',
                    'Der gesamte Quellcode der Plattform, die aus vielen verschiedenen Komponenten besteht, ist auf <a href="https://github.com/stadtnavi/">Github</a> verfügbar.'
                ],
            },
            {
                header: 'Datenquellen',
                paragraphs: [
                    'Kartendaten: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'ÖPNV-Daten: Datensätze der <a target=new href=https://avv.de/>AVV GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'Alle Angaben ohne Gewähr.'
                ],
            },
        ],
        en: [
            {
                header: 'About this service',
                paragraphs: [
                    'stadtnavi is a travel planning application for Aachen and its surroundings. This service includes public transport, footpaths, cycling, street and parking information, charging infrastructure and sharing offerings. The mobility offerings are connected through intermodal routing.',
                    '<a href="https://www.herrenberg.de/stadtluft"><img src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',
                ],
            },
            {
                header: 'Contribute',
                paragraphs: [
                    'The city of Herrenberg has developed this app, funded by the Federal Ministry of Transport and Digital Infrastructure (BMVI), as model city. The stadtnavi app is an open source solution and can be used, customized and further developed by other municipalities to meet individual needs (white lable solution). Participation is welcome!',
                ]
            },
            {
                header: 'Digitransit platform',
                paragraphs: [
                    'The Digitransit service platform is an open source routing platform developed by HSL and Traficom. It builds on OpenTripPlanner by Conveyal. Enhancements by Transportkollektiv and MITFAHR|DE|ZENTRALE. All software is open source. Thanks to everybody working on this!',
                ],
            },
            {
                header: 'Data sources',
                paragraphs: [
                    'Map data: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap contributors</a>',
                    'Public transit data: Datasets by <a target=new href=https://avv.de/>AVV GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ],
    },

    // -- Issue Tracker configuration ---- 
    issueTrackerUrl: 'https://maengelmelder.service-bw.de/?lat=${lat}&lng=${lon}',
    // issueTrackerUrls define issuetracker URLs per postalCode. In case none matches, issueTrackerUrl is used as falllback
    issueTrackerUrls: {
        // The issue tracker is selected depending on the postal code returned by the geocoding service.
        // To add custom ones, e.g. uncomment the following line and add your custom ones:
        // '71083': 'https://www.herrenberg.de/tools/mvs/?lat=${lat}&lng=${lon}#mvPagePictures',
    },

});
