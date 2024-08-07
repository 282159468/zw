import classnames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './index.module.less';
import { IMessage } from '../../types';

export const Message: React.FC<IMessage> = (props) => {
  const { type, context } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!context);
  }, [context]);

  return visible ? (
    <div className={classnames(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: context }} />

      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null;
};
