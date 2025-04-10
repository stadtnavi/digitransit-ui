/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'herrenberg';
const APP_TITLE = 'stadtnavi Herrenberg';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.stadtnavi.de';
const FEATURES_URL = 'https://featuredetails.stadtnavi.eu'
const LAYER_CATEGORIES_URL =
  'https://services.stadtnavi.eu/layer-categories/herrenberg/layers.json';
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.hb.json';

const parentConfig = require('./config.stadtnavi.js').default;

const hostname = new URL(API_URL);
const minLat = 47.6020;
const maxLat = 49.0050;
const minLon = 8.4087;
const maxLon = 9.9014;

export default configMerger(parentConfig, {
    CONFIG,
    
    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            deer: {
             icon: "brand_deer",
             operator: "deer",
             name: {
               de: "deer",
               en: "deer"
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.deer-carsharing.de/",
               en: "https://www.deer-carsharing.de/"
             }
           },
           stadtmobil_stuttgart: {
             icon: "brand_stadtmobil",
             operator: "stadtmobil",
             name: {
               de: "Stadtmobil Stuttgart",
               en: "Stadtmobil Stuttgart"
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://stuttgart.stadtmobil.de/",
               en: "https://stuttgart.stadtmobil.de/"
             }
           },
           stadtmobil_karlsruhe: {
             icon: "brand_stadtmobil",
             operator: "stadtmobil",
             name: {
               de: "Stadtmobil Karlsruhe",
               en: "Stadtmobil Karlsruhe"
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://karlsruhe.stadtmobil.de/",
               en: "https://karlsruhe.stadtmobil.de/"
             }
           },
           flinkster_carsharing: {
             icon: "brand_flinkster",
             operator: "flinkster",
             name: {
               de: "Flinkster",
               en: "Flinkster"
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.flinkster.de/de/start",
               en: "https://www.flinkster.de/en/home"
             }
           },
           oekostadt_renningen: {
             icon: "brand_stadtmobil",
             operator: "stadtmobil",
             name: {
               de: "Ökostadt Renningen e.V.",
               en: "Ökostadt Renningen e.V."
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://carsharing-renningen.de/",
               en: "https://carsharing-renningen.de/"
             }
           },
           "teilauto_neckar-alb": {
             icon: "brand_stadtmobil",
             operator: "stadtmobil",
             name: {
               de: "Teilauto Neckar-Alb",
               en: "Teilauto Neckar-Alb"
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.teilauto-neckar-alb.de/",
               en: "https://www.teilauto-neckar-alb.de/"
             }
           },
           regiorad_stuttgart: {
             icon: "brand_regiorad",
             operator: "regiorad",
             name: {
               de: "RegioRad Stuttgart"
             },
             type: "bicycle",
             form_factors: ['bicycle'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.regioradstuttgart.de",
               en: "https://www.regioradstuttgart.de"
             }
           },
           bolt_stuttgart: {
             icon: "brand_bolt",
             operator: "bolt",
             name: {
               de: "Bolt OÜ",
               en: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.bolt.eu/",
               en: "https://www.bolt.eu/"
             }
           },
           bolt_reutlingen_tuebingen: {
             icon: "brand_bolt",
             operator: "bolt",
             name: {
               de: "Bolt OÜ",
               en: "Bolt OÜ"
             },
             type: "scooter",
             form_factors: ['scooter', 'bicycle'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.bolt.eu/",
               en: "https://www.bolt.eu/"
             }
           },
           zeo_bruchsal: {
             icon: "brand_zeus",
             operator: "other",
             name: {
               de: "Zeo Bruchsal",
               en: "Zeo Bruchsal"
             },
             type: "car",
             form_factors: ['car'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://www.zeo-carsharing.de/",
               en: "https://www.zeo-carsharing.de/"
             }
           },
           zeus_ludwigsburg: {
             icon: "brand_zeus",
             operator: "zeus",
             name: {
               de: "Zeus Scooters",
               en: "Zeus Scooters"
             },
             type: "scooter",
             form_factors: ['scooter'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://zeusscooters.com",
               en: "https://zeusscooters.com"
             }
           },
           zeus_pforzheim: {
             icon: "brand_zeus",
             operator: "zeus",
             name: {
               de: "Zeus Scooters",
               en: "Zeus Scooters"
             },
             type: "scooter",
             form_factors: ['scooter'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://zeusscooters.com",
               en: "https://zeusscooters.com"
             }
           },
           zeus_tubingen: {
             icon: "brand_zeus",
             operator: "zeus",
             name: {
               de: "Zeus Scooters",
               en: "Zeus Scooters"
             },
             type: "scooter",
             form_factors: ['scooter'],
             hideCode: true,
             enabled: true,
             url: {
               de: "https://zeusscooters.com",
               en: "https://zeusscooters.com"
             }
           },
           voi_de: {
             icon: "brand_voi",
             operator: "voi",
             name: {
               de: "Voi Scooter",
               en: "Voi Scooter"
             },
             type: "scooter",
             form_factors: ['scooter'],
             hideCode: true,
             enabled: true
           },
           dott_boblingen: {
                icon: 'brand_dott',
                operator: "dott",
                name: {
                    de: 'Dott Böblingen',
                    en: 'Dott Böblingen',
                },
                type: 'scooter',
                url: {
                    de: 'https://ridedott.com/de/fahr-mit-uns/',
                    en: 'https://ridedott.com/ride-with-us/',
                },
                visibleInSettingsUi: true,
                hideCode: true,
                enabled: true,
            },
           dott_ludwigsburg: {
                icon: 'brand_dott',
                operator: "dott",
                name: {
                    de: 'Dott Ludwigsburg',
                    en: 'Dott Ludwigsburg',
                },
                type: 'scooter',
                url: {
                    de: 'https://ridedott.com/de/fahr-mit-uns/',
                    en: 'https://ridedott.com/ride-with-us/',
                },
                visibleInSettingsUi: true,
                hideCode: true,
                enabled: true,
            },
            dott_reutlingen: {
                icon: 'brand_dott',
                operator: "dott",
                name: {
                    de: 'Dott Reutlingen',
                    en: 'Dott Reutlingen',
                },
                type: 'scooter',
                form_factors: ['scooter', 'bicycle'],
                url: {
                    de: 'https://ridedott.com/de/fahr-mit-uns/',
                    en: 'https://ridedott.com/ride-with-us/',
                },
                visibleInSettingsUi: true,
                hideCode: true,
                enabled: true,
            },
            dott_stuttgart: {
                icon: 'brand_dott',
                operator: "dott",
                name: {
                    de: 'Dott Stuttgart',
                    en: 'Dott Stuttgart',
                },
                type: 'scooter',
                url: {
                    de: 'https://ridedott.com/de/fahr-mit-uns/',
                    en: 'https://ridedott.com/ride-with-us/',
                },
                visibleInSettingsUi: true,
                hideCode: true,
                enabled: true,
            },
            dott_tubingen: {
                icon: 'brand_dott',
                operator: "dott",
                name: {
                    de: 'Dott Tübingen',
                    en: 'Dott Tübingen',
                },
                type: 'scooter',
                form_factors: ['scooter', 'bicycle'],
                url: {
                    de: 'https://ridedott.com/de/fahr-mit-uns/',
                    en: 'https://ridedott.com/ride-with-us/',
                },
                visibleInSettingsUi: true,
                hideCode: true,
                enabled: true,
            },
            "de.stadtnavi.gbfs.alf": {
                icon: 'cargo_bike_sharing',
                operator: 'other',
                name: {
                    de: 'Lastenrad Alf',
                    en: 'Cargobike Alf',
                },
                type: 'cargo_bicycle',
                enabled: true,
                season: {
                    // currently not enabled for routing, but for display
                    start: new Date(new Date().getFullYear()+10, 0, 1),
                    end: new Date(new Date().getFullYear()+10, 11, 31),
                    preSeasonStart: new Date(new Date().getFullYear(), 0, 1),
                },
            },
            "de.stadtnavi.gbfs.gueltstein": {
                icon: 'cargo_bike_sharing',
                operator: 'other',
                name: {
                    de: 'Lastenrad Gültstein-Mobil',
                    en: 'Cargobike Gültstein-Mobil',
                },
                type: 'cargo_bicycle',
                enabled: true,
                season: {
                    // currently not enabled for routing, but for display
                    start: new Date(new Date().getFullYear()+10, 0, 1),
                    end: new Date(new Date().getFullYear()+10, 11, 31),
                    preSeasonStart: new Date(new Date().getFullYear(), 0, 1),
                },
            },
            "de.stadtnavi.gbfs.stadtrad": {
                icon: 'cargo_bike_sharing',
                operator: 'other',
                name: {
                    de: 'stadtRad der Stadt Herrenberg',
                    en: 'City of Herrberg\'s StadtRad',
                },
                type: 'cargo_bicycle',
                enabled: true,
                season: {
                    // currently not enabled for routing, but for display
                    start: new Date(new Date().getFullYear()+10, 0, 1),
                    end: new Date(new Date().getFullYear()+10, 11, 31),
                    preSeasonStart: new Date(new Date().getFullYear(), 0, 1),
                },
            },
            "de.stadtnavi.gbfs.bananologen": {
                icon: 'cargo_bike_sharing',
                operator: 'other',
                name: {
                    de: 'Lastenrad Bananologen',
                    en: 'Cargobike Bananologen',
                },
                type: 'cargo_bicycle',
                enabled: true,
                season: {
                    // currently not enabled for routing, but for display
                    start: new Date(new Date().getFullYear()+10, 0, 1),
                    end: new Date(new Date().getFullYear()+10, 11, 31),
                    preSeasonStart: new Date(new Date().getFullYear(), 0, 1),
                },
            },
        }
    },

    title: APP_TITLE,

    favicon: './app/configurations/images/herrenberg/favicon.png',

    meta: {
        description: APP_DESCRIPTION,
    },

    logo: 'herrenberg/stadtnavi-herrenberg-logo.svg',
    secondaryLogo: 'herrenberg/stadtnavi-logo-green.svg',

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
            label: `© Stadt Herrenberg ${YEAR}`
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
                href: 'https://www.herrenberg.de/impressum',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: 'https://www.herrenberg.de/datenschutz',
            },
        ],
    },
    defaultSettings: {
        walkReluctance: 3,
        walkBoardCost: 150
    },

    aboutThisService: {
        de: [
            {
                header: 'Über diesen Dienst',
                paragraphs: [
                    'stadtnavi ist eine Reiseplanungs-Anwendung für die Stadt Herrenberg und Umgebung. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, Straßen- und Parkplatzinformationen, Ladeinfrastruktur und Sharing-Angebote. Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt.',
                    'Gefördert durch <br>',
                    '<a href="https://www.herrenberg.de/stadtluft"><img alt="BMDV Logo" src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',

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
                    'ÖPNV-Daten: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> und der <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'Sharing-Daten: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a>.',
                    'Alle Angaben ohne Gewähr.'
                ],
            },
        ],
        en: [
            {
                header: 'About this service',
                paragraphs: [
                    'stadtnavi is a travel planning application for the city of Herrenberg and its surroundings. This service includes public transport, footpaths, cycling, street and parking information, charging infrastructure and sharing offerings. The mobility offerings are connected through intermodal routing.',
                    '<a href="https://www.herrenberg.de/stadtluft"><img alt="BMDV Logo" src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',
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
                    'Public transit data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> and <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
        ],
    },

    // adding assets/geoJson/hb-layers layers
    geoJson: {
      layers: [
        // Bicycle network layer
        {
          code: 'cycle_network',
          name: {
            fi: '',
            en: "Bicycle network",
            de: 'Radnetz',
          },
          category: 'bicycle',
          url: 'https://api.mobidata-bw.de/geoserver/MobiData-BW/wms',
          icon: 'icon-icon_radnetz',
          isOffByDefault: true,
          minZoom: 12,
          type: 'wmst',
          layers: 'MobiData-BW:radvis_cycle_network',
          attribution: 'RadNETZ-BW',
        },
        // LoRaWan map layer
        {
          code: 'loarawan_gateways',
          name: {
            fi: '',
            en: 'LoRaWAN Gateways',
            de: 'LoRaWAN Gateways',
          },
          url: 'https://data.mfdz.de/hbg/dt-layers/lorawan-gateways.geojson',
          category: 'leisure_and_tourism',
          isOffByDefault: true,
          icon: 'icon-icon_gateways',
        },
        {
          code: 'sights',
          name: {
            fi: '',
            en: 'Sights',
            de: 'Sehenswürdigkeiten',
          },
          url: 'https://data.mfdz.de/hbg/dt-layers/sights.geojson',
          category: 'leisure_and_tourism',
          isOffByDefault: true,
          icon: 'icon-icon_sights',
        },
        {
          code: 'walking_bus',
          name: {
            fi: '',
            en: 'Walking Bus',
            de: 'Schulbus auf Beinen',
          },
          url: 'https://data.mfdz.de/hbg/dt-layers/walking_bus.geojson',
          category: 'health_and_social_services',
          isOffByDefault: true,
          icon: 'icon-icon_school_bus',
        },
        {
          code: 'school_route_map',
          name: {
            fi: '',
            en: 'School route map',
            de: 'Schulwegplan',
          },
          url: 'https://data.mfdz.de/hbg/dt-layers/school_route_map.geojson',
          category: 'health_and_social_services',
          isOffByDefault: true,
          icon: 'icon-icon_school_route_map',
        },
      ],
    },

    layerCategoriesUrl: LAYER_CATEGORIES_URL,

    enableLockedMapLayers: false,

    staticMessagesUrl: STATIC_MESSAGE_URL,

    featuresUrl: FEATURES_URL,
    
    parkAndRideBannedVehicleParkingTags: [
        'lot_type:Parkplatz',
        'lot_type:Tiefgarage',
        'lot_type:Parkhaus'
    ],

    // live bus locations
    vehicles: true,

    showCO2InItinerarySummary: true,

    EMISSIONS_INFO: 'https://www.herrenberg.de/Mobilit%C3%A4t/CO2'
});
