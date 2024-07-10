import MonacoEditor, { Monaco } from '@monaco-editor/react';
import React, { useEffect, useRef, useContext } from 'react';

import { MonacoEditorConfig } from './monacoConfig';
import { useEditor } from './useEditor';
import { useTypesProgress } from './useProgress';

import './jsx-highlight.less';
import './useEditorWoker';
import { PlaygroundContext } from '../../../PlaygroundContext';
import { IFile, IEditorOptions } from '../../../types';
import { fileName2Language } from '../../../utils';
import { Loading } from '../../Loading';

interface Props {
  readonly file: IFile;
  readonly onChange?: (code: string | undefined) => void;
  readonly options?: IEditorOptions;
}

export const Editor: React.FC<Props> = (props) => {
  const { file, onChange, options } = props;
  const { theme, files, setSelectedFileName } = useContext(PlaygroundContext);
  const editorRef = useRef<any>(null);
  const { doOpenEditor, loadJsxSyntaxHighlight, autoLoadExtraLib } = useEditor();
  const jsxSyntaxHighlightRef = useRef<any>({ highlighter: null, dispose: null });
  const { total, finished, onWatch } = useTypesProgress();

  const handleEditorDidMount = async (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    // ignore save event
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument').run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    // 初始化自定义文件model
    Object.entries(files).forEach(([key]) => {
      if (!monaco?.editor?.getModel(monaco.Uri.parse(`file:///${key}`))) {
        monaco?.editor?.createModel(files[key].value, fileName2Language(key), monaco.Uri.parse(`file:///${key}`));
      }
    });

    // 覆盖原点击变量跳转方法
    editor._codeEditorService.doOpenEditor = function (editor: any, input: any) {
      const path = input.resource.path;
      if (!path.startsWith('/node_modules/')) {
        setSelectedFileName(path.replace('/', ''));
        doOpenEditor(editor, input);
      }
    };
    // 加载jsx高亮
    jsxSyntaxHighlightRef.current = loadJsxSyntaxHighlight(editor, monaco);

    // 加载类型定义文件
    autoLoadExtraLib(editor, monaco, file.value, onWatch);
  };

  useEffect(() => {
    editorRef.current?.focus();
    jsxSyntaxHighlightRef?.current?.highlighter?.();
  }, [file.name]);

  return (
    <>
      <MonacoEditor
        className="react-playground-editor"
        height="100%"
        language={file.language}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          ...MonacoEditorConfig,
          ...{
            ...options,
            theme: undefined,
          },
        }}
        path={file.name}
        theme={`vs-${theme}`}
        value={file.value}
      />

      <div className="react-playground-editor-types-loading">{total > 0 ? <Loading finished={finished} /> : null}</div>
    </>
  );
};
