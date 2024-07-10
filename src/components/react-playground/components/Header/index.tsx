import React, { useContext, useState } from 'react';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { downloadFiles, icons } from './utils';

import styles from './index.module.less';
import { PlaygroundContext } from '../../PlaygroundContext';

export const Header: React.FC = () => {
  const { files, theme, changeTheme, filesHash } = useContext(PlaygroundContext);
  const [copyed, setCopyed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const shareUrl =
    window.self !== window.top
      ? `${window.parent.location.host}${window.parent.location.pathname}#${filesHash}`
      : `${window.location.host}${window.location.pathname}#${filesHash}`;

  const copyLink = () => {
    setCopyed(true);
    setTimeout(() => {
      setCopyed(false);
    }, 3000);
  };

  const downloadProject = () => {
    downloadFiles(files).then(() => {
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
      }, 3000);
    });
  };

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={icons.ReactSvg} />

        <span>React Playground</span>
      </div>

      <div className={styles.links}>
        {theme === 'light' && (
          <button
            className={styles.theme}
            dangerouslySetInnerHTML={{ __html: icons.SunSvg }}
            onClick={() => changeTheme('dark')}
            title="Toggle dark mode"
          />
        )}

        {theme === 'dark' && (
          <button
            className={styles.theme}
            dangerouslySetInnerHTML={{ __html: icons.MoonSvg }}
            onClick={() => changeTheme('light')}
            title="Toggle light mode"
          />
        )}

        <CopyToClipboard onCopy={copyLink} text={shareUrl}>
          <button
            dangerouslySetInnerHTML={{ __html: copyed ? icons.SuccessSvg : icons.ShareSvg }}
            onClick={copyLink}
            title="Copy sharable URL"
          />
        </CopyToClipboard>

        <button
          dangerouslySetInnerHTML={{ __html: downloaded ? icons.SuccessSvg : icons.DownloadSvg }}
          onClick={downloadProject}
          title="Download project files"
        />

        <a href="https://github.com/fewismuch/react-playground" rel="noreferrer" target="_blank" title="View on GitHub">
          <button dangerouslySetInnerHTML={{ __html: icons.GithubSvg }} />
        </a>
      </div>
    </nav>
  );
};
