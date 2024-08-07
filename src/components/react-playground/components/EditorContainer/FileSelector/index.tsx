import classnames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';

import { FileItem } from './FileItem';
import { maxSequenceTabName } from './utils';

import styles from './index.module.less';
import { PlaygroundContext } from '../../../PlaygroundContext';
import { IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME, MAIN_FILE_NAME } from '../../../files';
import { IFileSelector } from '../../../types';

export const FileSelector: React.FC<IFileSelector> = (props) => {
  const { onChange, onError, readOnly = false } = props;
  const { files, removeFile, addFile, updateFileName, selectedFileName } = useContext(PlaygroundContext);
  const [tabs, setTabs] = useState(['']);
  const [creating, setCreating] = useState(false);

  const addTab = () => {
    setTabs([...tabs, maxSequenceTabName(tabs)]);
    setCreating(true);
  };

  const handleCancel = () => {
    if (creating) {
      tabs.pop();
      setTabs([...tabs]);
      setCreating(false);
    }
  };

  const handleClickTab = (fileName: string) => {
    if (creating) return;
    onChange(fileName);
  };

  const editImportMap = () => {
    onChange(IMPORT_MAP_FILE_NAME);
  };

  const handleSaveTab = (val: string, item: string) => {
    // 修改名字
    if (creating) {
      addFile(val);
      setCreating(false);
    } else {
      updateFileName(item, val);
    }
    setTimeout(() => {
      handleClickTab(val);
    }, 0);
  };

  const handleValidateTab = (newName: string, oldName: string) => {
    if (!/\.(jsx|tsx|js|ts|css|json)$/.test(newName)) {
      onError('Playground only supports *.jsx, *.js, *.css, *.json files.');
      return false;
    }

    // name已存在
    if (tabs.includes(newName) && newName !== oldName) {
      onError(`File "${newName}" already exists.`);
      return false;
    }
    onError('');
    return true;
  };

  useEffect(() => {
    setTabs(
      Object.keys(files).filter(
        (item) => ![IMPORT_MAP_FILE_NAME, ENTRY_FILE_NAME].includes(item) && !files[item].hidden,
      ),
    );
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index) => (
        <FileItem
          actived={selectedFileName === item}
          creating={creating}
          key={index + item}
          onCancel={handleCancel}
          onClick={() => handleClickTab(item)}
          onOk={(name: string) => handleSaveTab(name, item)}
          onRemove={(name: string) => {
            removeFile(name);
            handleClickTab(MAIN_FILE_NAME);
          }}
          onValidate={handleValidateTab}
          readOnlyTabs={readOnly ? tabs : [MAIN_FILE_NAME]}
          value={item}
        />
      ))}

      {!readOnly && (
        <>
          <div className={styles.add} onClick={addTab}>
            +
          </div>

          <div className={styles['import-map-wrapper']}>
            <div
              className={classnames(
                styles['tab-item'],
                selectedFileName === IMPORT_MAP_FILE_NAME ? styles.actived : null,
              )}
              onClick={editImportMap}
            >
              Import Map
            </div>
          </div>
        </>
      )}
    </div>
  );
};
