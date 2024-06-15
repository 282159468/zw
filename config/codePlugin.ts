import { toString } from 'hast-util-to-string';
import { Element, Root } from 'hast';
import { isElement } from 'hast-util-is-element';
import { visit } from 'unist-util-visit';
export const CODE_VALUE_PROP = 'DEMO_CODE_PROP';
export const CODE_PREVIEW_COMPONENT_NAME = 'CodeEditor';

const codeTypes = ['tsx', 'jsx'];

function getCodeLang(node: Element) {
  if (node.data?.meta?.includes('pure')) {
    return;
  }
  const cls = Array.isArray(node.properties?.className)
    ? node.properties?.className?.find((str) => {
        return codeTypes.some((t) => String(str).endsWith(t));
      })
    : undefined;
  return cls ? String(cls).replace('language-', '') : undefined;
}

export function codePlugin() {
  return function (tree, file) {
    visit<Root, 'element'>(tree, 'element', function (node, _, parent) {
      if (isElement(node, 'code')) {
        if (getCodeLang(node)) {
          const codeValue = toString(node).trim();
          node.properties = { [CODE_VALUE_PROP]: codeValue };
          node.tagName = CODE_PREVIEW_COMPONENT_NAME as 'code';
        }
      }
    });
  };
}
