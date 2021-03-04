const API_URL = process.env.API_URL || 'https://dev-api.digitransit.fi';
const MAP_URL =
  process.env.MAP_URL || 'https://digitransit-dev-cdn-origin.azureedge.net';
const MAP_PATH_PREFIX = process.env.MAP_PATH_PREFIX || 'next-'; // TODO maybe use regular endpoint again at some point
const APP_DESCRIPTION = 'Uusi Reittiopas';
const YEAR = 1900 + new Date().getYear();

export default {
  YEAR,
  URL: {
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/routers/waltti/`,
    STOP_MAP: `${MAP_URL}/map/v1/${MAP_PATH_PREFIX}waltti-stop-map/`,
    CITYBIKE_MAP: `${MAP_URL}/map/v1/${MAP_PATH_PREFIX}waltti-citybike-map/`,
  },

  contactName: {
    sv: '',
    fi: '',
    default: '',
  },

  stopsMinZoom: 14,

  cityBike: {
    showCityBikes: false,
  },

  search: {
    minimalRegexp: new RegExp('.+'),
  },

  agency: {
    show: false,
  },

  meta: {
    description: APP_DESCRIPTION,
  },

  availableLanguages: ['fi', 'sv', 'en'],
  defaultLanguage: 'fi',

  transportModes: {
    nearYouButton: {
      borderRadius: '50%',
      color: '#000F94',
    },

    nearYouTitle: {
      fi: 'Aikataulut ja linjat',
      sv: 'Tidtabeller och linjer',
      en: 'Timetables and routes',
    },

    bus: {
      availableForSelection: true,
      defaultValue: true,
      nearYouLabel: {
        fi: 'Bussit ja lähipysäkit kartalla',
        sv: 'Bussar och hållplatser på kartan',
        en: 'Buses and nearby stops on the map',
      },
    },

    rail: {
      availableForSelection: false,
      defaultValue: false,
      nearYouLabel: {
        fi: 'Junat ja lähiasemat kartalla',
        sv: 'Tåg och stationer på kartan',
        en: 'Trains and the closest stations on the map',
      },
    },

    tram: {
      availableForSelection: false,
      defaultValue: false,
      nearYouLabel: {
        fi: 'Raitiovaunut ja lähipysäkit kartalla',
        sv: 'Spårvagnar och hållplatser på kartan',
        en: 'Trams and the closest stops on the map',
      },
    },

    subway: {
      availableForSelection: false,
      defaultValue: false,
      nearYouLabel: {
        fi: 'Metrot ja lähiasemat kartalla',
        sv: 'Metro och stationer på kartan',
        en: 'Subways and the closest stations on the map',
      },
    },

    citybike: {
      availableForSelection: false,
      defaultValue: false,
      nearYouLabel: {
        fi: 'Lähimmät kaupunkipyöräasemat',
        sv: 'Närmaste cykelstationer',
        en: 'The closest bike stations',
      },
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
      nearYouLabel: {
        fi: 'Lähimmät lentoasemat',
        sv: 'Närmaste flygplatser',
        en: 'The closest airports',
      },
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false,
      nearYouLabel: {
        fi: 'Lähimmät lauttalaiturit',
        sv: 'Närmaste färjekajer',
        en: 'The closest ferry piers',
      },
    },
  },

  redirectReittiopasParams: true,
  queryMaxAgeDays: 14,

  nationalServiceLink: { name: 'matka.fi', href: 'https://opas.matka.fi/' },

  showNearYouButtons: true,
};
