import React, { useState } from 'react';
import { matchShape, routerShape } from 'found';
import debounce from 'lodash/debounce';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { replaceQueryParams } from '../../util/queryUtils';

function PhasepickerContainer(props, context) {
  const { router, match, intl } = context;

  const getPhaseFromQueryParam = () => {
    const timeMs = match.location.query.time * 1000;

    if (timeMs > new Date(2025, 6, 1).getTime()) {
      return 'phase3';
    }
    if (timeMs > new Date(2025, 0, 1).getTime()) {
      return 'phase2';
    }
    return 'phase1';
  };

  const [phase, setPhase] = useState(getPhaseFromQueryParam());

  const setParams = debounce((time, arriveBy, setTime) => {
    replaceQueryParams(router, match, {
      time,
      arriveBy,
      setTime,
    });
  }, 10);

  const onPhaseChange = changeEvent => {
    const time = new Date();
    switch (changeEvent.target.value) {
      case 'phase2':
        time.setMonth(1);
        time.setFullYear(2025);
        break;
      case 'phase3':
        time.setMonth(7);
        time.setFullYear(2025);
        break;
      default:
    }
    setPhase(changeEvent.target.value);
    setParams(Math.floor(time.getTime() / 1000), undefined, 'true');
  };

  const phaseLabel = (num, name, starting) => {
    const fromMessageId =
      starting === '2024'
        ? 'phasepicker.starting-in'
        : 'phasepicker.starting-from';
    const from = intl.formatMessage({ id: fromMessageId });
    return intl.formatMessage(
      {
        id: 'phasepicker.phase',
        defaultMessage:
          'Phase {phase}: Lenkungspunkt {name} ({from} {starting})',
      },
      { phase: num, name, starting, from },
    );
  };

  const phaseToggle = (phaseName, num, name, starting) => {
    return (
      <span>
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
          <span>{phaseLabel(num, name, starting)}</span>
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
      {phaseToggle('phase1', 1, 'Karlsgraben', '2024')}
      {phaseToggle('phase2', 2, 'Theaterplatz', '2025')}
      {phaseToggle('phase3', 3, 'Seilgraben', '2025')}
    </div>
  );
}

PhasepickerContainer.contextTypes = {
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
