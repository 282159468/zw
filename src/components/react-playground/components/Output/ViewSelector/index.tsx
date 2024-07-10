import classnames from 'classnames';
import React from 'react';

import styles from './index.module.less';
import { IViewSelector } from '../../../types';

export const ViewSelector: React.FC<IViewSelector> = (props) => {
  const { onChange, items, value = items[0], hidden } = props;

  return hidden ? null : (
    <div className={styles.tabs}>
      {items.map((name) => (
        <div
          className={classnames(styles['tab-item'], value === name ? styles.actived : '')}
          key={name}
          onClick={() => onChange(name)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};
