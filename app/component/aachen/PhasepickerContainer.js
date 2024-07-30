import React, { useState } from 'react';
import { matchShape, routerShape } from 'found';
import debounce from 'lodash/debounce';
import { connectToStores } from 'fluxible-addons-react';
import { replaceQueryParams } from '../../util/queryUtils';

function PhasepickerContainer(props, context) {
  const { router, match } = context;

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

  // TODO aktuelle Uhrzeit beibehalten, nur Datum ändern
  // TODO als Dropdown die ausgwählte Phase nennen
  //
  return (
    <div>
      <h2>Neue Routen</h2>
      <input
        type="radio"
        name="aachen_phase"
        id="aachen_phase1"
        value="phase1"
        checked={phase === 'phase1'}
        onChange={onPhaseChange}
      />
      {/* eslint-disable-next-line  jsx-a11y/label-has-associated-control */}
      <label htmlFor="aachen_phase1">Phase 1: Lenkungspunkt Karlsgraben</label>
      <br />
      <input
        type="radio"
        name="aachen_phase"
        id="aachen_phase2"
        value="phase2"
        checked={phase === 'phase2'}
        onChange={onPhaseChange}
      />
      {/* eslint-disable-next-line  jsx-a11y/label-has-associated-control */}
      <label htmlFor="aachen_phase2">Phase 2: Lenkungspunkt Theaterplatz</label>
      <br />
      <input
        type="radio"
        name="aachen_phase"
        id="aachen_phase3"
        value="phase3"
        checked={phase === 'phase3'}
        onChange={onPhaseChange}
      />
      {/* eslint-disable-next-line  jsx-a11y/label-has-associated-control */}
      <label htmlFor="aachen_phase3">Phase 3: Lenkungspunkt Seilgraben</label>
      <br />
    </div>
  );
}

PhasepickerContainer.contextTypes = {
  router: routerShape.isRequired,
  match: matchShape.isRequired,
};

const withLang = connectToStores(
  PhasepickerContainer,
  ['PreferencesStore'],
  context => ({
    lang: context.getStore('PreferencesStore').getLanguage(),
  }),
);

export { withLang as default, PhasepickerContainer as Component };
