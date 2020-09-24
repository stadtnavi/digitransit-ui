import React from 'react';
import PropTypes from 'prop-types';
import SanitizedHTML from 'react-sanitized-html';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

const PrivacyPage = ({ location }, { config }) => {
  const data =
    location.pathname === '/privacy' ? config.privacy.de : config.imprint.de;
  const allowedTags = [
    'a',
    'b',
    'i',
    'strong',
    'em',
    'img',
    'br',
    'h1',
    'h2',
    'h3',
    'h4',
    'span',
  ];
  return (
    <div className="about-page fullscreen">
      {data.map(
        (section, i) =>
          section.paragraphs ? (
            <div key={`data-section-${i + 1}`}>
              <SanitizedHTML allowedTags={allowedTags} html={section.header} />
              {section.paragraphs.map((p, j) => (
                <SanitizedHTML
                  allowedTags={allowedTags}
                  html={p}
                  key={`data-section-${i + 1}-p-${j + 1}`}
                />
              ))}
            </div>
          ) : (
            <div key={`data-section-${i + 1}`}>
              <SanitizedHTML allowedTags={allowedTags} html={section.header} />
            </div>
          ),
      )}
      <Link to="/">
        <div className="call-to-action-button">
          <FormattedMessage
            id="back-to-front-page"
            defaultMessage="Back to front page"
          />
        </div>
      </Link>
    </div>
  );
};

PrivacyPage.propTypes = {
  location: PropTypes.object.isRequired,
};

PrivacyPage.contextTypes = {
  config: PropTypes.object.isRequired,
};

export default PrivacyPage;
