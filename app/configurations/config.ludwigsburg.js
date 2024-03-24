/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'ludwigsburg';
const APP_TITLE = 'stadtnavi Ludwigsburg';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.stadtnavi.de';
const MAP_URL = process.env.MAP_URL || 'https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMITRANSPARENT_MAP_URL || "https://tiles.stadtnavi.eu/satellite-overlay/{z}/{x}/{y}{r}.png";
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon.stadtnavi.eu/pelias/v1";
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.ludwigsburg.json';

const parentConfig = require('./config.herrenberg.js').default;

const minLat = 47.6020;
const maxLat = 49.0050;
const minLon = 8.4087;
const maxLon = 9.9014;

export default configMerger(parentConfig, {
    CONFIG,

    appBarLink: {
        name: 'Feedback',
        href: 'mailto:mobilitaet@ludwigsburg.de?subject=stadtnavi Ludwigsburg Feedback',
        target: '_blank'
    },

    contactName: {
        de: 'SWLB',
        default: 'Stadtwerke Ludwigsburg',
    },

    colors: {
        primary: '#333333',
    },

    socialMedia: {
        title: APP_TITLE,
        description: APP_DESCRIPTION,

        image: {
            url: '/img/stadtnavi-social-media-card.png',
            width: 600,
            height: 300,
        },

        twitter: {
            card: 'summary_large_image',
            site: '@TUGHerrenberg',
        },
    },
    title: APP_TITLE,
    favicon: './app/configurations/images/ludwigsburg/favicon.png',
    logo: 'ludwigsburg/stadtnavi-ludwigsburg-logo.svg',
    secondaryLogo: 'ludwigsburg/stadtnavi-logo-yellow.svg',

    searchParams: {
        'boundary.rect.min_lat': 48.34164,
        'boundary.rect.max_lat': 48.97661,
        'boundary.rect.min_lon': 9.95635,
        'boundary.rect.max_lon': 8.530883,
        'focus.point.lat': 48.895195,
        'focus.point.lon': 9.188647
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    defaultEndpoint: {
        zoomLevel: 14,
        address: 'Bahnhof Ludwigsburg',
        lat: 48.8922609,
        lon: 9.1852056
    },

    menu: {
        copyright: {
            label: `© Stadtwerke Ludwigsburg ${YEAR}`
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
                href: 'https://www.ludwigsburg.de/stadtnavi-impressum',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: 'https://www.swlb.de/datenschutz',
            },
        ],
    },

    aboutThisService: {
        de: [
            {
                header: 'Über diesen Dienst',
                paragraphs: [
                    'stadtnavi Ludwigsburg ist eine Reiseplanungs-Anwendung für die Stadt Ludwigsburg und Umgebung. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, Straßen- und Parkplatzinformationen, Ladeinfrastruktur und Sharing-Angebote. Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt.',
                ],
            },
            {
                header: 'Mitmachen',
                paragraphs: [
                    'stadtnavi Ludwigsburg basiert auf dem BMVI-geförderten Projekt stadtnavi Herrenberg. stadtnavi Anwendung ist eine Open Source Lösung, <a class="link" href="https://github.com/stadtnavi/digitransit-ui">auf GitHub verfügbar</a>, und kann von anderen Kommunen und Akteuren unter ihrem Namen und Erscheinungsbild verwendet und an individuelle Bedürfnisse angepasst und weiterentwickelt werden (White Label Lösung). Mitmachen ist gewünscht!',
                ]
            },
            {
                header: 'Digitransit Plattform',
                paragraphs: [
                    'Dieser Dienst basiert auf der Digitransit Platform und dem Backend-Dienst OpenTripPlanner. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beteiligten.',
                    'Der gesamte Quellcode der Plattform, die aus vielen verschiedenen Komponenten besteht, ist auf <a class="link" href="https://github.com/stadtnavi/">Github</a> verfügbar.'
                ],
            },
            {
                header: 'Datenquellen',
                paragraphs: [
                    'Kartendaten: © <a class="link" arget=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'ÖPNV-Daten: Datensätze der <a class="link" target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> und der <a class="link" target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'Sharing-Angebote: RegioRad Stuttgart, stadtmobil carsharing AG, TIER Mobility SE, ride2go GmbH.',
                    'Alle Angaben ohne Gewähr.'
                ],
            },
        ],
        en: [
            {
                header: 'About this service',
                paragraphs: [
                    'stadtnavi Ludwigsburg is a travel planning application for the city of Ludwigsburg and its surroundings. This service includes public transport, footpaths, cycling, street and parking information, charging infrastructure and sharing offerings. The mobility offerings are connected through intermodal routing.',
                ],
            },
            {
                header: 'Contribute',
                paragraphs: [
                    'The Stadtwerke Ludwigsburg have developed this app, based on stadtnavi Herrenberg, which was funded by the Federal Ministry of Transport and Digital Infrastructure (BMVI). The stadtnavi app is an open source solution, <a class="link" href="https://github.com/stadtnavi/digitransit-ui">available via GitHub</a>, and can be used, customized and further developed by other municipalities to meet individual needs (white lable solution). Participation is welcome!',
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
                    'Map data: © <a class="link" target=new href=https://www.openstreetmap.org/>OpenStreetMap contributors</a>',
                    'Public transit data: Datasets by <a class="link" target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> and <a class="link" target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometries of transit routes) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'Sharing: RegioRad Stuttgart, stadtmobil carsharing AG, TIER Mobility SE, ride2go GmbH',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ],
    },

    // adding assets/geoJson/hb-layers layers
    geoJson: {
        layers: [
            // bicycleinfrastructure includes shops, repair stations,
            {
                name: {
                    fi: '',
                    en: 'Service stations and stores',
                    de: "Radservice Stationen",
                },
                url: '/assets/geojson/lb-layers/radservice.json',
                icon: 'icon-icon_bike_repair',
                isOffByDefault: true,
            },
            // Nette Toilette layer
            {
                name: {
                    fi: '',
                    en: 'Public Toilets',
                    de: 'Nette Toilette',
                },
                url: "/assets/geojson/lb-layers/nettetoilette.json",
                icon: 'icon-icon_public_toilets',
                isOffByDefault: true,
            },
            // Parking zones layer
            {
                name: {
                  fi: '',
                  en: 'Parking zones',
                  de: 'Parkzonen',
                },
                category: 'car',
                url: '/assets/geojson/lb-layers/parkzonen.json',
                icon: 'icon-icon_open_carpark',
                isOffByDefault: false,
                minZoom: 13
            },
            // Bicycle network layer
            {
                name: {
                  fi: '',
                  en: "Bicycle network",
                  de: 'Radnetz Ludwigsburg',
                },
                category: 'bicycle',
                url: '/assets/geojson/lb-layers/radnetz.json',
                icon: 'icon-icon_radnetz',
                isOffByDefault: false,
                minZoom: 12
            },
	   ],
    },
    staticMessagesUrl: STATIC_MESSAGE_URL,

    // no live bus locations
    vehicles: false,
});
