import React from 'react';
import classNames from 'classnames/bind';
import ThemeContext from 'terra-theme-context';

import { titleConfigPropType } from '../utils/propTypes';

import styles from './DrawerMenuTitle.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * A configuration object with information pertaining to the application's title.
   */
  titleConfig: titleConfigPropType.isRequired,
};

const DrawerMenuTitle = ({ titleConfig }) => {
  const theme = React.useContext(ThemeContext);

  return (
    titleConfig.element ? (
      <div title={titleConfig.title} className={cx('title-container', theme.className)}>
        {titleConfig.element}
      </div>
    ) : (
      <div className={cx('title-container', theme.className)}>
        {titleConfig.headline ? <div className={cx('headline')} title={titleConfig.headline}>{titleConfig.headline}</div> : null}
        <div className={cx('title')} title={titleConfig.title}>{titleConfig.title}</div>
        {titleConfig.subline ? <div className={cx('subline')} title={titleConfig.subline}>{titleConfig.subline}</div> : null}
      </div>
    )
  );
};

DrawerMenuTitle.propTypes = propTypes;

export default DrawerMenuTitle;
