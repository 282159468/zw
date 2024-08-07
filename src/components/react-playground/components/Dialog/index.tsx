import React, { useRef } from 'react';

import styles from './index.module.less';
import { IDialog } from '../../types';

export const Dialog: React.FC<IDialog> = (props) => {
  const { message, onConfirm, children } = props;
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    dialogRef.current?.showModal();
  };

  return (
    <span onClick={(e) => e.stopPropagation()}>
      <span onClick={handleOpen}>{children}</span>

      <dialog className={styles.dialog} ref={dialogRef}>
        <span className={styles.content}>
          <svg
            aria-hidden="true"
            data-icon="exclamation-circle"
            fill="currentColor"
            focusable="false"
            height="1em"
            viewBox="64 64 896 896"
            width="1em"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />

            <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
          </svg>

          {message}
        </span>

        <form method="dialog">
          <div className={styles['dialog-footer']}>
            <button onClick={() => dialogRef.current?.close()}>取 消</button>

            <button className={styles['dialog-btn']} onClick={onConfirm}>
              确 定
            </button>
          </div>
        </form>
      </dialog>
    </span>
  );
};
