/* eslint-disable */
import configMerger from '../util/configMerger';
import { MapMode } from '../constants';

const CONFIG = 'mitfahren-bw';
const APP_TITLE = 'Mitfahren-BW';
const APP_DESCRIPTION = 'Mitfahren in Baden-Württemberg';
const API_URL = process.env.API_URL || 'https://otp.mobidata-bw.de';
const OTP_URL = process.env.OTP_URL || `${API_URL}/otp/routers/default/`;
const MAP_URL = process.env.MAP_URL || 'https://tiles.mobidata-bw.de/styles/streets/{z}/{x}/{y}{r}.png';
const BIKE_MAP_URL = process.env.BIKE_MAP_URL ||'https://tiles.mobidata-bw.de/styles/bicycle/{z}/{x}/{y}{r}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMITRANSPARENT_MAP_URL || "https://tiles.mobidata-bw.de/styles/satellite-overlay/{z}/{x}/{y}{r}.png";
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://geocoding.mobidata-bw.de/pelias/v1";
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ;

const MOBIDATA_BASE_URL = "https://dev-ipl.mobidata-bw.de/";

const parentConfig = require('./config.stadtnavi.js').default;

const hostname = new URL(API_URL);

const minLat = 47.5;
const maxLat = 49.8;
const minLon = 7.5;
const maxLon = 10.5;

export default configMerger(parentConfig, {
    CONFIG,

    URL: {
        OTP: OTP_URL,
        MAP: {
            default: MAP_URL,
            satellite: 'https://tiles.stadtnavi.eu/orthophoto/{z}/{x}/{y}.jpg',
            semiTransparent: SEMI_TRANSPARENT_MAP_URL,
            bicycle: BIKE_MAP_URL
        },
        STOP_MAP: `${OTP_URL}vectorTiles/stops/`,
        PARK_AND_RIDE_MAP: `${OTP_URL}vectorTiles/parking/`,
        ROADWORKS_MAP: `${MOBIDATA_BASE_URL}geoserver/gwc/service/tms/1.0.0/MobiData-BW:roadworks@EPSG:900913@pbf/{z}/{x}/{-y}.pbf`,
        RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/rentalStations/`,
        RENTAL_VEHICLE_MAP: `${OTP_URL}vectorTiles/rentalVehicles/`,
        REALTIME_RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/realtimeRentalStations/`,
        // TODO WEATHER_STATIONS_MAP: `${API_URL}/map/v1/weather-stations/`,
        CHARGING_STATIONS_MAP: `https://api.mobidata-bw.de/ocpdb/tiles/{z}/{x}/{y}.mvt`,
        CHARGING_STATION_DETAILS_API: 'https://api.mobidata-bw.de/ocpdb/api/public/v1/locations/',
        // use mobidata specific geocoder
        PELIAS: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL}/search`,
        PELIAS_REVERSE_GEOCODER: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/reverse`,
        PELIAS_PLACE: `${
            process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL
        }/place`,
    },

    map: {
        // allow zoom out to level 7, which shows bawü and large region around
        minZoom: 7,
        // initially, zoom to mostly BW
        zoom: 8,
        attribution: {
            'default': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a>',
            'satellite': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href="https://www.lgl-bw.de/">LGL BW</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a>',
            'bicycle': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href=https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx>CyclOSM</a>, © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a>',
        },
    },

    //textLogo: true,
    logo: 'mitfahren-bw/mitfahren-auto.svg',

    colors: {
        primary: '#000000',
        iconColors: {
            'mode-bus': '#ff0000',
            'mode-car': '#007AC9',
            'mode-rail': '#008000',
            'mode-subway': '#0000ff',
            'mode-citybike': '#0e1a50',
            'mode-charging-station': '#00b096',
            'mode-bike-park': '#005ab4',
            'mode-carpool': '#9fc727',
        },
    },

    sprites: 'assets/svg-sprite.mitfahrenbw.svg',
    
    issueTrackerUrl: 'https://maengelmelder.service-bw.de/?lat=${lat}&lng=${lon}',
    // issueTrackerUrls define issuetracker URLs per postalCode. In case none matches, issueTrackerUrl is used as falllback
    issueTrackerUrls: {
    },

    title: APP_TITLE,

    favicon: './app/configurations/images/mitfahren-bw/favicon.png',

    meta: {
        description: APP_DESCRIPTION,
    },

    feedIds: ['mi'],

    searchSources: ['oa', 'osm'],

    searchParams: {
        'boundary.rect.min_lat': 47.2,
        'boundary.rect.max_lat': 50.3,
        'boundary.rect.min_lon': 7.0,
        'boundary.rect.max_lon': 11.2,
        'focus.point.lat': 48.7710755,
        'focus.point.lon': 9.177739
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    defaultEndpoint: {
        lat: 48.7710755, 
        lon: 9.177739,
    },

    showFavouritesContainer: false,

    menu: {
        copyright: {
            label: `© Mitfahren-BW ${parentConfig.YEAR}`
        },
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
                href: 'https://www.nvbw.de/impressum',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: 'https://www.mobidata-bw.de/pages/datenschutz',
            },
        ],
    },

    aboutThisService: {
        de: [
            {
                header: 'Über diesen Dienst',
                paragraphs: [
                    'stadtnavi MobiData BW ist eine Reiseplanungs-Anwendung für Baden-Württemeberg und Umgebung. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, Straßen- und Parkplatzinformationen, Ladeinfrastruktur und Sharing-Angebote. Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt.',
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
                    'Fahrgemeinschaftsangebote: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'Alle Angaben ohne Gewähr.'
                ],
            },
        ],
        en: [
            {
                header: 'About this service',
                paragraphs: [
                    'stadtnavi is a travel planning application for Baden-Wurttemberg and its surroundings. This service includes public transport, footpaths, cycling, street and parking information, charging infrastructure and sharing offerings. The mobility offerings are connected through intermodal routing.',
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
                    'Carpool offers data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ],
    },


    roadworks: {
        show: true,
    },
    weatherStations: {
        show: false,
    },
     
    geoJson: {
        layers: [
            {
                name: {
                  fi: '',
                  fr: 'Region',
                  en: 'Covered region',
                  de: 'Auskunft'
                },
                url: '/assets/geojson/mobidatabw_service_area.json',
                icon: 'icon-icon_open_carpark',
                isOffByDefault: false,
                minZoom: 1,
                alwaysOn: true,
            },
            {
                name: {
                  fi: '',
                  fr: 'Aires de covoiturage',
                  en: 'Carpool Parkings',
                  de: 'P & M Parkplätze'
                },
                url: 'https://data.mfdz.de/mobidata-bw/routing/carpool_parkings.json',
                category: 'bicycle',
                icon: 'icon-icon_bike_repair',
                isOffByDefault: false,
                minZoom: 10
            },
        ],
    },
    staticMessagesUrl: STATIC_MESSAGE_URL,

    transportModes: {
        tram: {
            availableForSelection: false,
            defaultValue: false,
        },

        ferry: {
            availableForSelection: false,
            defaultValue: false,
        },
    },

    parkAndRideBannedVehicleParkingTags: [
        'lot_type:Parkplatz',
        'lot_type:Tiefgarage',
        'lot_type:Parkhaus'
    ],

    // don't show vehicle positions
    vehicles: false,
    // TODO: instead of cityBike this should be renamend to vehicleSharing.
    // and layer settings and operator/network settings should be separated
    cityBike: {
        showCityBikes: false,
    }
 }
);
