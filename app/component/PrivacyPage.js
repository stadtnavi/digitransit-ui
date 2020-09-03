import React from 'react';
import PropTypes from 'prop-types';
import SanitizedHTML from 'react-sanitized-html';

const PrivacyPage = (props, { config }) => {
  const privacy = config.privacy.de;
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
  ];
  return (
    <div className="about-page fullscreen">
      <div className="page-frame fullscreen momentum-scroll" />
      {privacy.map(
        (section, i) =>
          section.paragraphs ? (
            <div key={`privacy-section-${i}`}>
              <SanitizedHTML allowedTags={allowedTags} html={section.header} />
              {section.paragraphs.map((p, j) => (
                <SanitizedHTML
                  allowedTags={allowedTags}
                  html={p}
                  key={`privacy-section-${i}-p-${j}`}
                />
              ))}
            </div>
          ) : (
            <div key={`privacy-section-${i}`}>
              <SanitizedHTML allowedTags={allowedTags} html={section.header} />
            </div>
          ),
      )}
    </div>
  );
};

PrivacyPage.contextTypes = {
  config: PropTypes.object.isRequired,
};

export default PrivacyPage;
