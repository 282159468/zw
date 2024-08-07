import MonacoEditor from '@monaco-editor/react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import CompilerWorker from './compiler.worker.ts?worker&inline';
import { Preview } from './Preview';
import { ViewSelector } from './ViewSelector';
import { MonacoEditorConfig } from '../EditorContainer/Editor/monacoConfig';
import { PlaygroundContext } from '../../PlaygroundContext';
import { IMPORT_MAP_FILE_NAME } from '../../files';
import { IOutput, IPreviewData } from '../../types';
import { debounce } from '../../utils';

const viewTypes = ['PREVIEW', 'JS'];

export const Output: React.FC<IOutput> = (props) => {
  const { showCompileOutput = true } = props;
  const { files, theme, selectedFileName } = useContext(PlaygroundContext);
  const [activedType, setActivedType] = useState('PREVIEW');
  const compilerRef = useRef<Worker | null>(null);
  const [compiledFiles, setCompiledFiles] = useState<IPreviewData>();
  const [compiledCode, setCompiledCode] = useState('');

  const handleViewChange = (type: string) => {
    setActivedType(type);
  };

  const sendCompiledCode = debounce(() => {
    if (activedType === 'PREVIEW') compilerRef.current?.postMessage(files);
    if (activedType === 'JS') {
      compilerRef.current?.postMessage(files[selectedFileName].value);
    }
  }, 50);

  useEffect(() => {
    if (!compilerRef.current) {
      compilerRef.current = new CompilerWorker();
      compilerRef.current.addEventListener('message', ({ data }: { data: any }) => {
        if (data.type === 'UPDATE_FILES') {
          try {
            JSON.parse(files[IMPORT_MAP_FILE_NAME].value);
            data.data.importmap = files[IMPORT_MAP_FILE_NAME].value;
          } catch (error) {
            console.error('importmap 解析错误:', error);
          }
          setCompiledFiles(data);
        } else if (data.type === 'UPDATE_FILE') {
          setCompiledCode(data.data);
        } else if (data.type === 'ERROR') {
          console.log(data);
        }
      });
    }
  }, []);

  useEffect(() => {
    sendCompiledCode();
  }, [activedType, files]);

  useEffect(() => {
    if (selectedFileName === IMPORT_MAP_FILE_NAME || activedType === 'PREVIEW') return;
    if (['javascript', 'typescript'].includes(files[selectedFileName]?.language)) {
      compilerRef.current?.postMessage(files[selectedFileName]?.value);
    } else {
      compilerRef.current?.postMessage('');
    }
  }, [selectedFileName]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ViewSelector hidden={!showCompileOutput} items={viewTypes} onChange={handleViewChange} value={activedType} />

      <Preview data={compiledFiles} hidden={activedType !== 'PREVIEW'} iframeKey={files[IMPORT_MAP_FILE_NAME].value} />

      {showCompileOutput ? (
        <div style={{ display: activedType !== 'JS' ? 'none' : '', height: '100%' }}>
          <MonacoEditor
            className="react-playground-editor"
            height="100%"
            language="javascript"
            options={{
              ...MonacoEditorConfig,
              readOnly: true,
            }}
            theme={`vs-${theme}`}
            value={compiledCode}
          />
        </div>
      ) : null}
    </div>
  );
};
