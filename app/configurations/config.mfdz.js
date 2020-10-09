/* eslint-disable */
import configMerger from '../util/configMerger';
import privacy from '../../static/assets/privacy.json';

const CONFIG = 'mfdz';
const APP_TITLE = 'Mitfahren-BW';
const APP_DESCRIPTION =
  'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.stadtnavi.de';
const MAP_URL =
  process.env.MAP_URL || 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const SEMI_TRANSPARENT_MAP_URL =
  process.env.SEMI_TRANSPARENT_MAP_URL ||
  'https://api.maptiler.com/maps/ffa4d49e-c68c-46c8-ab3f-60543337cecb/256/{z}/{x}/{y}.png?key=eA0drARBA1uPzLR6StGD';
const GEOCODING_BASE_URL =
  process.env.GEOCODING_BASE_URL || `https://pelias.locationiq.org/v1`;
const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
  process.env.STATIC_MESSAGE_URL || '/assets/messages/message.hb.json';

const walttiConfig = require('./config.waltti.js').default;

const minLat = 49.7913749328;
const maxLat = 47.5338000528;
const minLon = 7.5113934084;
const maxLon = 10.4918239143;

export default configMerger(walttiConfig, {
  CONFIG,
  URL: {
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/router/`,
    MAP: {
      default: MAP_URL,
      semiTransparent: SEMI_TRANSPARENT_MAP_URL,
      bicycle:
        'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    },
    STOP_MAP: `${API_URL}/map/v1/stop-map/`,
    DYNAMICPARKINGLOTS_MAP: `${API_URL}/map/v1/hb-parking-map/`,
    ROADWORKS_MAP: `${API_URL}/map/v1/roadworks-bw-map/`,
    COVID19_MAP: `https://tiles.caresteouvert.fr/public.poi_osm_light/{z}/{x}/{y}.pbf`,
    CITYBIKE_MAP: `${API_URL}/map/v1/regiorad-map/`,
  },

  availableLanguages: ['de', 'en'],
  defaultLanguage: 'de',

  MATOMO_URL: process.env.MATOMO_URL,

  /* disable the "next" column of the Route panel as it can be confusing sometimes: https://github.com/mfdz/digitransit-ui/issues/167 */
  displayNextDeparture: false,
  maxWalkDistance: 15000,

  defaultSettings: {
    optimize: 'TRIANGLE',
    safetyFactor: 0.4,
    slopeFactor: 0.3,
    timeFactor: 0.3,
  },

  showLogin: false,
  mainMenu: {
    showDisruptions: false,
  },

  itinerary: {
    delayThreshold: 60,
  },

  contactName: {
    de: 'mfdz',
    default: 'mfdz',
  },

  colors: {
    primary: '#005b8c',
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

    twitter: {
      card: 'summary_large_image',
      site: '@TUGHerrenberg',
    },
  },

  dynamicParkingLots: {
    showDynamicParkingLots: false,
    dynamicParkingLotsSmallIconZoom: 14,
    dynamicParkingLotsMinZoom: 14,
  },

  roadworks: {
    showRoadworks: true,
    roadworksSmallIconZoom: 16,
    roadworksMinZoom: 10,
  },

  covid19: {
    show: false,
    smallIconZoom: 17,
    minZoom: 15,
  },

  carpool: {
    show: true,
    minZoom: 8,
  },

  cityBike: {
    showStationId: false,
    useSpacesAvailable: false,
    showCityBikes: true,
    networks: {
      regiorad: {
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
      },
      taxi: {
        icon: 'taxi',
        name: {
          de: 'Taxistand',
          en: 'taxi stand',
        },
        type: 'taxi',
      },
      'car-sharing': {
        icon: 'car-sharing',
        name: {
          de: 'Car-Sharing',
          en: 'car sharing',
        },
        type: 'car-sharing',
      },
    },
  },

  mergeStopsByCode: true,

  title: APP_TITLE,

  favicon: './app/configurations/images/hb/favicon.png',

  meta: {
    description: APP_DESCRIPTION,
  },

  showNavBarLink: true,
  appBarLink: { name: 'Mitfahren', href: `/phpcrud/rides.php` },

  modeToOTP: {
    carpool: 'CARPOOL',
  },

  logo: 'mfdz/logo.svg',

  GTMid: '',

  timezoneData:
    'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
    attribution: {
      default:
        '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
      bicycle:
        '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href=https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx>CyclOSM</a>, © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
    },
  },

  feedIds: ['hb'],
  searchSources: ['oa', 'osm'],

  searchParams: {
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
    'focus.point.lat': 48.5957,
    'focus.point.lon': 8.8675,
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
  ],

  nationalServiceLink: {
    name: 'Fahrplanauskunft efa-bw',
    href: 'https://www.efa-bw.de',
  },

  defaultMapCenter: {
    lat: 48.775845,
    lon: 9.182932,
  },

  defaultOrigins: [],

  footer: {
    content: [
      { label: `© MFDZ ${YEAR}` },
      {},
      {
        name: 'about-this-service',
        nameEn: 'About this service',
        route: '/dieser-dienst',
        icon: 'icon-icon_info',
      },
      {
        name: 'imprint',
        nameEn: 'Imprint',
        route: '/impressum',
      },
      {
        name: 'privacy',
        nameEn: 'Privacy',
        route: '/privacy',
      },
    ],
  },

  privacy,
  imprint: {
    de: [
      {
        header: '<h1>Impressum</h1>',
        paragraphs: [
          'Holger Bruch<br> Steigstraße 84b / 70565 Stuttgart<br> Fon +49 711 50494330 / <span>holger.bruch</span><span>@mitfahrdezentrale.de</span><br> <a href="www.mitfahrdezentrale.de">www.mitfahrdezentrale.de</a>',
        ],
      },
    ],
  },
  aboutThisService: {
    de: [
      {
        header: 'Über uns',
        paragraphs: [
          'Mitfahren-BW ist ein Projekt der Initiative <a href="https://mfdz.de/">MITFAHR|DE|ZENTRALE</a>. Mitfahren-BW verbindet Fahrgemeinschaften und ÖPNV in einer intermodalen Routensuche und zeigt damit neue Mobilitätsoptionen für den Weg zum Arbeits- oder Ausbildungsplatz.',
        ],
      },
      {
        header: 'Fahrgemeinschaftsangebote',
        paragraphs: [
          'Mitfahren-BW ist eine Verbindungssuche. Die Fahrgemeinschafts-Angebote werden uns von unseren Partnern <a href="https://www.fahrgemeinschaft.de/">fahrgemeinschaft.de</a> und <a href="https://www.mifaz.de/de/suche">mifaz.de</a> bereitgestellt.',
          'Hinweis: Angezeigte Fahrtoptionen sind ohne Gewähr. Setzen Sie sich vor Fahrtantritt mit dem/der Anbieter/in der Fahrt in Verbindung und vereinbaren Sie z.B. Treff- und Zeitpunkt sowie eine eventuelle Kostenbeteiligung.',
        ],
      },
      {
        header: 'Fahrplandaten',
        paragraphs: [
          'Für die ÖPNV-Informationen nutzen wir die durch die Verkehrsverbünde KVV, VVS, VRN und VAG Freiburg bereitgestellten Fahrplandaten sowie Fahrplandaten der Nahverkehrsgesellschaft Baden-Württemberg GmbH.',
          'Hinweis: Leider können wir keine Echtzeit-Information der Fahrplandaten nutzen. Jegliche Auskunft erfolgt ohne Gewähr.',
        ],
      },
      {
        header: 'Geodaten',
        paragraphs: [
          "Mitfahren-BW nutzt die Hintergrundkarte 'WebAtlasDE.Light (Graustufen)' des Bundesamtes für Kartographie und Geodäsie. Zur Adressverortung und Fußgänger- und PKW-Routenermittlung nutzen wir OpenStreetMap. Daten zu Pendlerparkplätzen wurden uns vom Verkehrsministerium Baden-Württemberg bereitgestellt und in Teilen mit OpenStreetMap Daten ergänzt. Haltestellenstandorte beziehen wir aus den Haltestellen-Daten der Elektronischen Fahrplanauskunft Baden-Württemberg. Alle Angaben sind ohne Gewähr. Gerne dürfen Sie uns jedoch eventuelle Fehler rückmelden.",
        ],
      },
    ],
  },

  redirectReittiopasParams: true,

  themeMap: {
    mfdz: 'mfdz',
  },

  transportModes: {
    bus: {
      availableForSelection: true,
      defaultValue: true,
      smallIconZoom: 16,
    },

    rail: {
      availableForSelection: true,
      defaultValue: true,
    },

    tram: {
      availableForSelection: false,
      defaultValue: false,
    },

    subway: {
      availableForSelection: true,
      defaultValue: true,
    },

    citybike: {
      availableForSelection: true,
      defaultValue: false,
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false,
    },

    carpool: {
      availableForSelection: true,
      defaultValue: true,
    },
  },

  streetModes: {
    public_transport: {
      availableForSelection: true,
      defaultValue: true,
      exclusive: false,
      icon: 'bus-withoutBox',
    },

    walk: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'walk',
    },

    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: true,
      icon: 'bicycle-withoutBox',
    },

    car: {
      availableForSelection: false,
      defaultValue: false,
      exclusive: false,
      icon: 'car-withoutBox',
    },

    car_park: {
      availableForSelection: true,
      defaultValue: false,
      exclusive: false,
      icon: 'car-withoutBox',
    },
  },

  staticMessagesUrl: STATIC_MESSAGE_URL,

  staticMessages: [
    {
      id: '2',
      priority: -1,
      shouldTrigger: true,
      content: {
        en: [
          {
            type: 'text',
            content:
              'We use cookies to improve our services. By using this site, you agree to its use of cookies.',
          },
        ],
        de: [
          {
            type: 'text',
            content:
              'Diese Seite benutzt Cookies. Wenn Sie die Seite weiterhin benutzten stimmen Sie dem zu.',
          },
        ],
      },
    },
  ],

  showCarpoolOffer: true,
  showSaveSearch: true,
});
