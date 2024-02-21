/* eslint-disable */
import configMerger from '../util/configMerger';
import { MapMode } from '../constants';

const CONFIG = 'mobidatabw';
const APP_TITLE = 'stadtnavi mobidatabw';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://otp.mobidata-bw.de';
const OTP_URL = process.env.OTP_URL || `${API_URL}/otp/routers/default/`;
const MAP_URL = process.env.MAP_URL || 'https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png';
const BIKE_MAP_URL = process.env.BIKE_MAP_URL ||'https://tiles.stadtnavi.eu/bicycle/{z}/{x}/{y}{r}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMITRANSPARENT_MAP_URL || "https://tiles.stadtnavi.eu/satellite-overlay/{z}/{x}/{y}{r}.png";

const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ;

const parentConfig = require('./config.stadtnavi.js').default;

const hostname = new URL(API_URL);

const minLat = 47.6020;
const maxLat = 49.0050;
const minLon = 8.4087;
const maxLon = 9.9014;

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
        STOP_MAP: `${OTP_URL}/vectorTiles/stops/`,
        PARK_AND_RIDE_MAP: `${OTP_URL}/vectorTiles/parking/`,
        // TODO ROADWORKS_MAP: `${API_URL}/map/v1/cifs/`,
        RENTAL_STATION_MAP: `${OTP_URL}/vectorTiles/rentalStations/`,
        RENTAL_VEHICLE_MAP: `${OTP_URL}/vectorTiles/rentalVehicles/`,
        REALTIME_RENTAL_STATION_MAP: `${OTP_URL}/vectorTiles/realtimeRentalStations/`,
        // TODO WEATHER_STATIONS_MAP: `${API_URL}/map/v1/weather-stations/`,
        CHARGING_STATIONS_MAP: `https://api.mobidata-bw.de/ocpdb/tiles/{z}/{x}/{y}.mvt`,
        CHARGING_STATION_DETAILS_API: 'https://api.mobidata-bw.de/ocpdb/api/public/v1/locations/',
    },

    colors: {
        primary: '#0c79bc',
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
    
    issueTrackerUrl: 'https://maengelmelder.service-bw.de/?lat=${lat}&lng=${lon}',
    // issueTrackerUrls define issuetracker URLs per postalCode. In case none matches, issueTrackerUrl is used as falllback
    issueTrackerUrls: {
    },

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            
        }
    },

    title: APP_TITLE,

    favicon: './app/configurations/images/herrenberg/favicon.png',

    meta: {
        description: APP_DESCRIPTION,
    },

    logo: 'mobidatabw/mobidatabw_logo.png',

    feedIds: ['hbg'],

    searchSources: ['oa', 'osm'],

    searchParams: {
        'boundary.rect.min_lat': 48.34164,
        'boundary.rect.max_lat': 48.97661,
        'boundary.rect.min_lon': 9.95635,
        'boundary.rect.max_lon': 8.530883,
        'focus.point.lat': 48.5957,
        'focus.point.lon': 8.8675
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    defaultEndpoint: {
        lat: 48.5942066,
        lon: 8.8644041,
    },

    menu: {
        copyright: {
            copyright: { label: `© MobiData BW ${parentConfig.YEAR}` },
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
                    'ÖPNV-Daten: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
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
                    'Public transit data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ],
    },

    // adding assets/geoJson/hb-layers layers
    geoJson: {
        layers: [
            // bicycleinfrastructure includes shops, repair stations,
        ],
    },
    staticMessagesUrl: STATIC_MESSAGE_URL,

    transportModes: {
        tram: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Tramhaltestellen in der Nähe',
            }
        },

        ferry: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Fähranleger in der Nähe',
            }
        },
    },

    parkAndRideBannedVehicleParkingTags: [
        'lot_type:Parkplatz',
        'lot_type:Tiefgarage',
        'lot_type:Parkhaus'
    ],

});
