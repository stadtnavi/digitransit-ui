import React from 'react';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import Icon from './Icon';

export default function LoginButton({ isMobile, className }) {
  return (
    <div className={isMobile ? 'offcanvas-section' : 'right-border'}>
      <button className={cx('noborder', className)}>
        <a href="/login">
          <div className="top-bar-login">
            <div className="login-icon">
              <Icon img="icon-icon_user" />
            </div>
            <FormattedMessage id="login" defaultMessage="login" />
          </div>
        </a>
      </button>
    </div>
  );
}

LoginButton.propTypes = {
  isMobile: propTypes.bool,
  className: propTypes.string,
};
