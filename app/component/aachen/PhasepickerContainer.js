import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { matchShape, routerShape } from 'found';
import debounce from 'lodash/debounce';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { replaceQueryParams } from '../../util/queryUtils';

function PhasepickerContainer(props, context) {
  const { config, router, match, intl } = context;

  const [phasen, setPhasen] = useState([]);

  const getPhaseFromQueryParam = () => {
    const timeMs = match.location.query.time * 1000;
    for (let i = phasen.length - 1; i >= 0; i--) {
      if (timeMs >= new Date(phasen[i].date).getTime()) {
        return phasen[i].id;
      }
    }
    return phasen.length > 0 ? phasen[0].id : null;
  };

  const [phase, setPhase] = useState(getPhaseFromQueryParam());

  useEffect(() => {
    async function loadData() {
      const result = await fetch(config.zukunftsroutingPhasenDownloadURL);
      const json = await result.json();
      setPhasen(json);
    }

    loadData();
  }, []);

  useEffect(() => {
    setPhase(getPhaseFromQueryParam());
  }, [phasen]);

  const setParams = debounce((time, arriveBy, setTime) => {
    replaceQueryParams(router, match, {
      time,
      arriveBy,
      setTime,
    });
  }, 10);

  const phaseById = phaseId => {
    return phasen.find(p => p.id === phaseId);
  };

  const onPhaseChange = changeEvent => {
    const time = new Date(phaseById(changeEvent.target.value).date);
    setPhase(changeEvent.target.value);
    setParams(Math.floor(time.getTime() / 1000), undefined, 'true');
  };

  const phaseToggle = (phaseName, names) => {
    return (
      <span key={`aachen_${phaseName}_span)`}>
        {/* eslint-disable-next-line  jsx-a11y/label-has-associated-control */}
        <label>
          <input
            type="radio"
            name="aachen_phase"
            id={`aachen_${phaseName})`}
            value={phaseName}
            checked={phase === phaseName}
            onChange={onPhaseChange}
          />
          <span>{names[intl.locale]}</span>
        </label>
      </span>
    );
  };

  return (
    <div>
      <h2>
        {intl.formatMessage({
          id: 'phasepicker.new-routes',
          defaultMessage: 'Neue Routen',
        })}
      </h2>
      {phasen.map(p => phaseToggle(p.id, p.name))}
    </div>
  );
}

PhasepickerContainer.contextTypes = {
  config: PropTypes.object.isRequired,
  router: routerShape.isRequired,
  match: matchShape.isRequired,
  intl: intlShape.isRequired,
};

const withLang = connectToStores(
  PhasepickerContainer,
  ['PreferencesStore'],
  context => ({
    lang: context.getStore('PreferencesStore').getLanguage(),
  }),
);

export { withLang as default, PhasepickerContainer as Component };
