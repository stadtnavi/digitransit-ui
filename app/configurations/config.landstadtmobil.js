/* eslint-disable */
import configMerger from '../util/configMerger';

const CONFIG = 'landstadtmobil';
const APP_TITLE = 'landstadtmobil Kreis Reutlingen';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.stadtnavi.de';
const MAP_URL = process.env.MAP_URL || 'https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png';
const SEMI_TRANSPARENT_MAP_URL = process.env.SEMITRANSPARENT_MAP_URL || "https://tiles.stadtnavi.eu/satellite-overlay/{z}/{x}/{y}{r}.png";
const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon.stadtnavi.eu/pelias/v1";
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.kreis_reutlingen.json';

const parentConfig = require('./config.stadtnavi.js').default;

const hostname = new URL(API_URL);

const minLat = 48.6020;
const maxLat = 50.0050;
const minLon = 9.4087;
const maxLon = 10.9014;

export default configMerger(parentConfig, {
    CONFIG,

    themeMap: {
        muensingen: 'muensingen',
        landstadtmobil: 'landstadtmobil',
        engstingen: 'engstingen'
    },

    appBarLink: {
        name: 'Feedback',
        href: 'mailto:nachhaltige-entwicklung@kreis-reutlingen.de?subject=landstadtmobil Feedback',
        target: '_blank'
    },

    colors: {
        primary: '#888c98',
    },

    sprites: 'assets/svg-sprite.hb.svg',

    socialMedia: {
        title: APP_TITLE,
        description: APP_DESCRIPTION,

        image: {
            url: '/img/stadtnavi-social-media-card.png',
            width: 600,
            height: 300,
        },
    },
    title: APP_TITLE,
    favicon: './app/configurations/images/landstadtmobil/favicon.png',
    meta: {
        description: APP_DESCRIPTION,
    },
    logo: 'landstadtmobil/landstadtmobil-reutlingen-logo.svg',

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            'de.mfdz.flinkster.cab.regiorad_stuttgart': {
                icon: 'regiorad',
                name: {
                    de: 'RegioRad',
                    en: 'RegioRad',
                },
                type: 'citybike',
                url: {
                    de: 'https://www.regioradstuttgart.de/de',
                    en: 'https://www.regioradstuttgart.de/',
                },
                enabled: true,
                hideCode: true,
                season: {
                    // currently not enabled for routing, but for display
                    start: new Date(new Date().getFullYear()+10, 0, 1),
                    end: new Date(new Date().getFullYear()+10, 11, 31),
                    preSeasonStart: new Date(new Date().getFullYear(), 0, 1),
                },
            },
            'tier_reutlingen': {
                icon: 'tier_scooter',
                name: {
                    de: 'TIER Reutlingen',
                    en: 'TIER Reutlingen',
                },
                type: 'scooter',
                url: {
                    de: 'https://www.tier.app/de',
                    en: 'https://www.tier.app/',
                },
                enabled: true,
                hideCode: true,
            },
            'tier_munsingen': {
                icon: 'tier_bicycle',
                name: {
                    de: 'TIER Münsingen',
                    en: 'TIER Münsingen',
                },
                type: 'citybike',
                url: {
                    de: 'https://www.tier.app/de',
                    en: 'https://www.tier.app/',
                },
                enabled: true,
                hideCode: true,
            },
            "car-sharing": {
                icon: 'car-sharing',
                name: {
                    de: 'Carsharing',
                    en: 'Car sharing',
                },
                type: 'car-sharing',
                url: {
                },
                enabled: true,
                hideCode: true,
                season: {
                    // currently not enabled for routing, but for display
                    start: new Date(new Date().getFullYear()+10, 0, 1),
                    end: new Date(new Date().getFullYear()+10, 11, 31),
                    preSeasonStart: new Date(new Date().getFullYear(), 0, 1),
                },
            },
        }
    },

    searchParams: {
        'boundary.rect.min_lat': 48.34164,
        'boundary.rect.max_lat': 48.97661,
        'boundary.rect.min_lon': 9.95635,
        'boundary.rect.max_lon': 8.530883,
        'focus.point.lat': 48.4008,
        'focus.point.lon': 9.3762
    },

    areaPolygon: [
        [minLon, minLat],
        [minLon, maxLat],
        [maxLon, maxLat],
        [maxLon, minLat],
    ],

    defaultEndpoint: {
        lat: 48.4008,
        lon: 9.3762,
    },  

    menu: {
        copyright: {
            label: `© Kreis Reutlingen ${YEAR}`
        },
        content: [
            {
                name: 'privacy',
                nameEn: 'Privacy',
                route: '/dieser-dienst',
                icon: 'icon-icon_info',
            },
            {
                name: 'imprint',
                nameEn: 'Imprint',
                href: 'https://www.kreis-reutlingen.de/de/impressum',
            }
        ],
    },

    welcomeMessage: {
        de: {
            header: 'Herzlich Willkommen auf landstadtmobil.de!',
            paragraphs: [
                'Auf dieser Plattform können Sie bequem und schnell die beste '+
                  'Route für Ihre Strecke berechnen. Einfach Start- und Zielort '+
                  'eingeben und loslegen. Im Anschluss können Sie hier auf der '+
                  'linken Seite unter Einstellungen festlegen, welche Verkehrsmittel '+
                  'in die Routenplanung integriert werden sollen: ÖPNV, Sharing-Angebote, '+
                  'Auto oder Fahrrad. Ist auf Ihrer Strecke eine Mitfahrgelegenheit verfügbar, '+
                  'wird Ihnen diese angezeigt. Sind Sie selbst mit dem Auto unterwegs, '+
                  'können Sie direkt eine Fahrgemeinschaft anbieten und jemanden mitnehmen. '+
                  'Nutzen Sie gerne diese umweltfreundliche Möglichkeit, um Ihre nächste Reise zu planen.',
                  'Unten rechts können Sie die verschiedenen Kartendaten ein- oder ausblenden. '+
                  'Oben rechts können Sie auf das Menü-Symbol klicken und weitere Informationen '+
                  'erhalten sowie uns Feedback zur Plattform zukommen lassen. ',
                  'Wir wünschen eine gute Planung und viel Spaß bei der nächsten Fahrt!'
            ]
        },
        en: {
            header: 'Welcome to landstadtmobil.de!',
            paragraphs: [
                'On this platform you can easily and quickly find '+
                'the best route for your journey. Simply enter your start and destination '+
                'and get started. You can then specify which means of transport should be'+
                ' integrated into the route planning on the left-hand side under Settings:'+
                ' public transport, sharing offers, car or bicycle. If you are traveling by'+
                ' car yourself, you can offer a carpool and take someone with you. '+
                'Feel free to use this eco-friendly way to plan your next trip.',
                'At the bottom right you can show or hide the various map layers. '+
                'You can click the menu icon at the top right to get more information'+
                'and give us feedback about the platform.',
                'We wish you good planning and lots of fun on your next trip!'
            ]
        },
    },

    aboutThisService: {
        de: [
            {
                header: 'Datenschutzhinweise zur Routingplatform LandStadtMobil',
                paragraphs: [
                    'Es gelten die Datenschutzhinweise des Landkreises Reutlingen. Diese sind unter <a href="https://www.kreis-reutlingen.de/datenschutz">https://www.kreis-reutlingen.de/datenschutz</a> einsehbar.',
                    'Die Anwendung LandStadtMobil bietet intermodale Mobilitätsauskünfte. Neben den Datenschutzhinweisen des Landkreises (in der Allgemeinen Datenschutzerklärung) zu Server-Logs und Cookies werden zur Optimierung der Anwendung die genutzten Funktionen erhoben. Hierzu nutzt die Anwendung LandStadtMobil die Anwendung Matomo und speichert hierzu Cookies. Die Speicherung dieser Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. ',
                    'Explizit nicht gespeichert werden Start-/Ziel Suchen.'
                ],
            },
            {
                header: 'ride2go',
                paragraphs: [
                    'LandStadtMobil nutzt zum Inserieren von Fahrgemeinschaftsangeboten die Dienste der ride2go GmbH, Erlenstr. 7, D-71297 Mönsheim.',
                    'Beim Inserieren von Mitfahrangeboten werden die folgenden Daten vom Nutzer erhoben und an ride2go.de übermittelt: ',
                    'Fahrtdaten (Start, Ziel, Datum/Wochentage und Uhrzeit), Kontaktdaten (Telefonnummer, E-Mail-Adresse)',
                    'Die personenbezogenen Daten werden für die Einstellung eines Fahrgemeinschafts-Inserats in LandStadtMobil erhoben und als Kontaktmöglichkeit für die Nutzer zur Kontaktaufnahme verwendet. Die angegebenen Daten werden durch ride2go.de und angeschlossene Partner-Portale veröffentlicht und damit weitergegeben. Die Nutzung und Eingabe von Daten in diese Online-Anwendung erfolgt freiwillig.',
                    'Nach dem Absenden eines Inserats erhalten Inserierende eine E-Mail-Bestätigung zur Aktivierung und späteren Löschung des Inserats.',
                    'Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der <a href="https://www.ride2go.de/html/datenschutz.html">Datenschutzerklärung von ride2go.de</a>',
                    'LandStadtMobil speichert keine Kontaktdaten.'
                ]
            },
            {
                header: 'Über LandStadtMobil',
                paragraphs: [
                    'LandStadtMobil ist eine Routingplattform, die verschiedene Mobilitätsangebote wie Bus, Bahn, Fahrrad und Fahrgemeinschaften miteinander verknüpft. Die Plattform ist Teil des Modellpro-jektes „Integriertes Mobilitätskonzept zur Sicherung der Anschlussmobilität im ländlichen Raum“, das im Rahmen des Förderprogramms „LandMobil“ vom Ministerium für Ernährung und Landwirtschaft gefördert wird.',
                    'Bis Ende 2022 werden die Gemeinde Engstingen und die Stadt Münsingen gemeinsam mit dem Landkreis erproben, wie die Anschlussmobilität im ländlichen Raum, also die erste und letzte Meile zu Mobilitätsknotenpunkten, verbessert werden kann. Dazu werden zusätzliche Mobilitätsangebote, ein E-Bikesharing-System, ein E-Carsharing-Modell und ein lokales Mitfahrnetzwerk in der Gemeinde Engstingen und der Stadt Münsingen umgesetzt. Die Angebote werden in die Routingplattform LandStadtMobil integriert, um entsprechende Routingauskünfte und Reisevorschläge generieren zu können. Ergänzt werden die Mobilitätsangebote um Fahrradabstellmöglichkeiten (Fahrradständer und Fahrradboxen) sowie Lademöglichkeiten für E-Bikes.',
                    'Während des Erprobungszeitraums werden die Projekte vom Kreisamt für nachhaltige Entwicklung begleitet, evaluiert, übertragbare Lösungen abgeleitet und darauf aufbauend Handlungsempfehlungen formuliert.',
                    'Weitere Informationen zum Projekt erhalten Sie unter <a href="https://www.kreis-reutlingen.de/landmobil">www.kreis-reutlingen.de/landmobil</a>.',
                    'Dieser Dienst basiert auf dem Dienst stadtnavi, welche auf der Digitransit Platform und dem Backend-Dienst OpenTripPlanner basiert. Alle Software ist unter einer offenen Lizenzen verfügbar. Vielen Dank an alle Beitragenden.',
                    'Der gesamte Quellcode der Plattform, die aus vielen verschiedenen Komponenten besteht, ist auf <a href="https://github.com/stadtnavi/">Github</a> verfügbar.',
                    '<img src="/img/landstadtmobil-funding-logo.png"/>'
                ],
            },
            {
                header: 'Datenquellen',
                paragraphs: [
                    'Kartendaten: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'ÖPNV-Daten: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> und der <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'CarSharing-Standorte: Datensätze der <a target=new href=https://www.teilauto-neckar-alb.de/>teilAuto Neckar-Alb eG</a>.',
                    'Scooter und BikeSharing-Standorte: <a target=new href=https://www.tier.app/>TIER Mobility GmbH</a>.',
                    'Alle Angaben ohne Gewähr.'
                ],
            }
        ],
        en: [
            {
                header: 'Data protection information for the routing platform LandStadtMobil',
                paragraphs: [
                    'The data protection information of the district of Reutlingen applies. These can be found at <a href="https://www.kreis-reutlingen.de/datenschutz">https://www.kreis-reutlingen.de/datenschutz</a>.',
                    'The LandStadtMobil application offers intermodal mobility information. In addition to the data protection notices of the district (in the general data protection declaration) on server logs and cookies, the functions used are recorded to optimize the application. For this purpose, the LandStadtMobil application uses the Matomo application and stores cookies for this purpose. These cookies are stored on the basis of Article 6 (1) (f) GDPR. ',
                    'Start/destination searches are not saved.'
                ],
            },
            {
                header: 'ride2go',
                paragraphs: [
                    'LandStadtMobil uses the services of ride2go GmbH, Erlenstr. 7, D-71297 Mönsheim to advertise carpool offers.',
                    'When advertising carpooling offers, the following data is collected from the user and transmitted to ride2go.de:',
                    'Journey data (start, destination, date/weekdays and time), contact details (telephone number, e-mail address)',
                    'The personal data is collected for the placement of a carpool advertisement in LandStadtMobil and used as a contact option for interested riders to get in touch. The data provided will be published by ride2go.de and affiliated partner portals and thus passed on. The use and input of data in this online application is voluntary.',
                    'After submitting an advertisement, advertisers receive an e-mail confirming the activation and subsequent deletion of the advertisement.',
                    'More information on handling user data can be found in the <a href="https://www.ride2go.de/html/datenschutz.html">Privacy Policy of ride2go.de</a>',
                    'LandStadtMobil does not store any contact data.'
                ]
            },
            {
                header: 'About LandStadtMobil',
                paragraphs: [
                    'LandStadtMobil is a routing platform that links various mobility offers such as bus, train, bicycle and carpooling. The platform is part of the model project “Integrated mobility concept to ensure subsequent mobility in rural areas”, which is funded by the Ministry of Food and Agriculture as part of the “LandMobil” funding program.',
                    'By the end of 2022, the municipality of Engstingen and the city of Münsingen will work with the district to test how connecting mobility in rural areas, i.e. the first and last mile to mobility hubs, can be improved. Additional mobility offers, an e-bike sharing system, an e-car sharing model and a local car sharing network will be implemented in the community of Engstingen and the city of Münsingen. The offers are integrated into the LandStadtMobil routing platform in order to be able to generate appropriate routing information and travel suggestions. The mobility offers are supplemented by bicycle parking facilities (bicycle racks and bicycle boxes) and charging facilities for e-bikes.',
                    'During the trial period, the projects are monitored and evaluated by the district office for sustainable development, transferrable solutions are derived and recommendations for action are formulated based on this.',
                    'For more information about the project, see <a href="https://www.kreis-reutlingen.de/landmobil">www.kreis-reutlingen.de/landmobil</a>.',
                    'This service is based on the stadtnavi service, which is based on the Digitransit Platform and the OpenTripPlanner backend service. All software is available under an open license. Thanks to all contributors.',
                    'The entire source code of the platform, which consists of many different components, is on available on <a href="https://github.com/stadtnavi/">Github</a>.',
                    '<img src="/img/landstadtmobil-funding-logo.png"/>'
                ],
            },
            {
                header: 'Data sources',
                paragraphs: [
                    'Map data: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap Mitwirkende</a>',
                    'Transit data: Datensätze der <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> und der <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) jeweils angereichert mit OpenStreetMap-Daten © OpenStreetMap Mitwirkende',
                    'CarSharing locations: Datensätze der <a target=new href=https://www.teilauto-neckar-alb.de/>teilAuto Neckar-Alb eG</a>.',
                    'Scooter and BikeSharing locations: <a target=new href=https://www.tier.app/>TIER Mobility GmbH</a>.',
                    'All statements without guarantee.'
                ],
            },
        ],
    },

    // adding assets/geoJson/hb-layers layers
    geoJson: {
        layers: [
            // Bicycle network layer
            {
                name: {
                  fi: '',
                  en: "Bicycle network",
                  de: 'Radnetz Kreis Reutlingen',
                },
                category: 'bicycle',
                url: 'https://data.mfdz.de/reutlingen/radnetz.json',
                icon: 'icon-icon_radnetz',
                isOffByDefault: false,
                minZoom: 12
            },
        ],
    },
    
});
