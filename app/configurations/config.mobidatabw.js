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
        // TODO ROADWORKS_MAP: `${API_URL}/map/v1/cifs/`,
        RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/rentalStations/`,
        RENTAL_VEHICLE_MAP: `${OTP_URL}vectorTiles/rentalVehicles/`,
        REALTIME_RENTAL_STATION_MAP: `${OTP_URL}vectorTiles/realtimeRentalStations/`,
        // TODO WEATHER_STATIONS_MAP: `${API_URL}/map/v1/weather-stations/`,
        CHARGING_STATIONS_MAP: `https://api.mobidata-bw.de/ocpdb/tiles/{z}/{x}/{y}.mvt`,
        CHARGING_STATION_DETAILS_API: 'https://api.mobidata-bw.de/ocpdb/api/public/v1/locations/',
    },

    map: {
        attribution: {
            'default': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a>',
            'satellite': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href="https://www.lgl-bw.de/">LGL BW</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a>',
            'bicycle': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href=https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx>CyclOSM</a>, © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a>',
        },
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

    feedIds: ['mi'],

    searchSources: ['oa', 'osm'],

    searchParams: {
        'boundary.rect.min_lat': 47.5,
        'boundary.rect.max_lat': 49.8,
        'boundary.rect.min_lon': 7.5,
        'boundary.rect.max_lon': 10.5,
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


    roadworks: {
        show: false,
    },
    weatherStations: {
        show: false,
    },
     
    geoJson: {
        layers: [
            {
                name: {
                  fi: '',
                  en: 'Covered region',
                  de: 'Auskunft',
                },
                url: '/assets/geojson/mobidatabw_service_area.json',
                icon: 'icon-icon_open_carpark',
                isOffByDefault: false,
                minZoom: 1
            },
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

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
           deer: {
             icon: "car-sharing",
             operator: "deer",
             name: {
               de: "deer"
             },
             type: "car",
             form_factors: ['car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.deer-carsharing.de/"
             }
           },
           voi_karlsruhe: {
             icon: "tier_scooter",
             operator: "voi",
             name: {
               de: "Voi Scooter Karlsruhe"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           lastenvelo_fr: {
             icon: "other",
             operator: "other",
             name: {
               de: "LastenVelo Freiburg"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.lastenvelofreiburg.de/"
             }
           },
           stadtmobil_suedbaden: {
             icon: "car-sharing",
             operator: "other",
             name: {
               de: "Stadtmobil Südbaden"
             },
             type: "car",
             form_factors: ['car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.stadtmobil-suedbaden.de/"
             }
           },
           "my-e-car": {
             icon: "other",
             operator: "other",
             name: {
               de: "my-e-car"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle', 'car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.my-e-car.de/"
             }
           },
           regiorad_stuttgart: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "RegioRad Stuttgart"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.regioradstuttgart.de"
             }
           },
           callabike: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Call a Bike"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.callabike.de"
             }
           },
           callabike_ice: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Call a Bike"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.callabike.de"
             }
           },
           nextbike_df: {
             icon: "other",
             operator: "tier",
             name: {
               de: "Frelo Freiburg"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.frelo-freiburg.de/de/"
             }
           },
           nextbike_fg: {
             icon: "other",
             operator: "tier",
             name: {
               de: "KVV.nextbike"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.kvv-nextbike.de/de/"
             }
           },
           nextbike_ds: {
             icon: "regiorad",
             operator: "tier",
             name: {
               de: "SAP Walldorf"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.nextbike.de/de/sapwalldorf/"
             }
           },
           nextbike_vn: {
             icon: "other",
             operator: "tier",
             name: {
               de: "VRNnextbike"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.vrnnextbike.de/de/"
             }
           },
           bolt_karlsruhe: {
             icon: "tier_scooter",
             operator: "bolt",
             name: {
               de: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.bolt.eu/"
             }
           },
           bolt_stuttgart: {
             icon: "tier_scooter",
             operator: "bolt",
             name: {
               de: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.bolt.eu/"
             }
           },
           bolt_reutlingen_tuebingen: {
             icon: "tier_scooter",
             operator: "bolt",
             name: {
               de: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.bolt.eu/"
             }
           },
           roxy_freiburg: {
             icon: "tier_scooter",
             operator: "other",
             name: {
               de: "Freiburg"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           yoio_freiburg: {
             icon: "tier_scooter",
             operator: "other",
             name: {
               de: "Freiburg"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           zeus_freiburg: {
             icon: "tier_scooter",
             operator: "other",
             name: {
               de: "Zeus Scooters"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://zeusscooters.com"
             }
           },
           tier_stuttgart: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier STUTTGART"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "tier_mannheim-ludwigshafen": {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier MANNHEIM-LUDWIGSHAFEN"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_friedrichshafen: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier FRIEDRICHSHAFEN"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_boeblingen: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier BOEBLINGEN"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_tubingen: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier TUBINGEN"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_sindelfingen: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier SINDELFINGEN"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_ludwigsburg: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier LUDWIGSBURG"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_reutlingen: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier REUTLINGEN"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_heilbronn: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier HEILBRONN"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_karlsruhe: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier KARLSRUHE"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_heidelberg: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier HEIDELBERG"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-basel": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird basel"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-biel": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird biel"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-bulle": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird bulle"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-kloten": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird kloten"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-uster": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird uster"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-winterthur": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird winterthur"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-zurich": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird zurich"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           bolt_basel: {
             icon: "tier_scooter",
             operator: "bolt",
             name: {
               de: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.bolt.eu/"
             }
           },
           bolt_winterthur: {
             icon: "tier_scooter",
             operator: "bolt",
             name: {
               de: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.bolt.eu/"
             }
           },
           bolt_zurich: {
             icon: "tier_scooter",
             operator: "bolt",
             name: {
               de: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.bolt.eu/"
             }
           },
           donkey_ge: {
             icon: "regiorad",
             operator: "donkey",
             name: {
               de: "Donkey Republic Geneva"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.donkey.bike/cities/bike-rental-geneva/"
             }
           },
           donkey_kreuzlingen: {
             icon: "other",
             operator: "donkey",
             name: {
               de: "Donkey Republic Kreuzlingen"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.donkey.bike/cities/bike-rental-kreuzlingen/"
             }
           },
           donkey_neuchatel: {
             icon: "other",
             operator: "donkey",
             name: {
               de: "Donkey Republic Neuchâtel"
             },
             type: "other",
             form_factors: ['other', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.donkey.bike/cities/bike-rental-neuchatel/"
             }
           },
           donkey_sion: {
             icon: "other",
             operator: "donkey",
             name: {
               de: "Donkey Republic Sion"
             },
             type: "other",
             form_factors: ['other', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.donkey.bike/cities/bike-rental-sion/"
             }
           },
           donkey_thun: {
             icon: "regiorad",
             operator: "donkey",
             name: {
               de: "Donkey Republic Thun"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.donkey.bike/cities/bike-rental-thun/"
             }
           },
           "donkey_yverdon-les-bains": {
             icon: "regiorad",
             operator: "donkey",
             name: {
               de: "Donkey Republic Yverdon-les-Bains"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.donkey.bike/cities/bike-rental-yverdon-les-bains/"
             }
           },
           lime_basel: {
             icon: "tier_scooter",
             operator: "lime",
             name: {
               de: "Lime City partners from Partners::RegionFeedMediator"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           lime_opfikon: {
             icon: "tier_scooter",
             operator: "lime",
             name: {
               de: "Lime Opfikon"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           lime_uster: {
             icon: "tier_scooter",
             operator: "lime",
             name: {
               de: "Lime City partners from Partners::RegionFeedMediator"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           lime_zug: {
             icon: "tier_scooter",
             operator: "lime",
             name: {
               de: "Lime Zug"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           lime_zurich: {
             icon: "tier_scooter",
             operator: "lime",
             name: {
               de: "Lime City partners from Partners::RegionFeedMediator"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           nextbike_ch: {
             icon: "regiorad",
             operator: "tier",
             name: {
               de: "nextbike Switzerland"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.nextbike.ch/"
             }
           },
           publibike_ch: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "PubliBike"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://publibike.ch"
             }
           },
           velospot_ch: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Velospot"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://velospot.info/customer/public"
             }
           },
           pickebike_aubonne: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Aubonne"
             },
             type: "citybike",
             form_factors: ['bicycle', 'moped'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           pickebike_basel: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Basel"
             },
             type: "citybike",
             form_factors: ['bicycle', 'moped'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           pickebike_fribourg: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Fribourg"
             },
             type: "citybike",
             form_factors: ['bicycle', 'moped'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           share_birrer_ch: {
             icon: "car-sharing",
             operator: "other",
             name: {
               de: "Share Birrer AG"
             },
             type: "car",
             form_factors: ['car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_basel: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier BASEL"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_bern: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier BERN"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_rotkreuz: {
             icon: "regiorad",
             operator: "tier",
             name: {
               de: "Tier ROTKREUZ"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_stgallen: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier STGALLEN"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_winterthur: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier WINTERTHUR"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           tier_zurich: {
             icon: "tier_scooter",
             operator: "tier",
             name: {
               de: "Tier ZURICH"
             },
             type: "scooter",
             form_factors: ['scooter'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           voi_ch: {
             icon: "tier_scooter",
             operator: "voi",
             name: {
               de: "Voi Technology AB"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.voiscooters.com/"
             }
           },
           liemobil_liechtenstein: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "Liechtenstein"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           zem_ch: {
             icon: "car-sharing",
             operator: "other",
             name: {
               de: "2EM Car Sharing"
             },
             type: "car",
             form_factors: ['car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.2em.ch"
             }
           },
           edrivecarsharing_ch: {
             icon: "car-sharing",
             operator: "other",
             name: {
               de: "edrive carsharing AG"
             },
             type: "car",
             form_factors: ['car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           carvelo2go_ch: {
             icon: "other",
             operator: "other",
             name: {
               de: "carvelo eCargo-Bike Sharing"
             },
             type: "cargo_bicycle",
             form_factors: ['cargo_bicycle', 'bicycle', 'car'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             },
             url: {
               de: "https://www.carvelo.ch"
             }
           },
           "bird-chalonsenchampagne": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird chalonsenchampagne"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           "bird-sarreguemines": {
             icon: "tier_scooter",
             operator: "bird",
             name: {
               de: "bird sarreguemines"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           mulhouse: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "VéloCité"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           },
           nancy: {
             icon: "regiorad",
             operator: "other",
             name: {
               de: "vélOstan'lib"
             },
             type: "citybike",
             form_factors: ['bicycle'],
             visibleInSettingsUi: true,
             hideCode: true,
             enabled: true,
             season: {
               start: new Date(new Date().getFullYear(), 0, 1),
               end: new Date(new Date().getFullYear(), 11, 31)
             }
           }
         }
     }
 }
);
