import React from 'react';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

const PublishCarpoolOfferLink = () => (
  <div>
    <a
      className={cx('no-decoration', 'medium')}
      href="https://dev.mitfahren-bw.de/mitfahrplattformen.html"
    >
      <FormattedMessage id="publish-carpool-request" defaultMessage="" />
    </a>
  </div>
);

export default PublishCarpoolOfferLink;
