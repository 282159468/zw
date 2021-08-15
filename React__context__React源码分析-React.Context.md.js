(self["webpackChunkzw"]=self["webpackChunkzw"]||[]).push([[2134],{22231:function(e,n,t){"use strict";t.d(n,{m:function(){return r.m}});var r=t(9684);t(72255)},3545:function(e,n,t){"use strict";t.r(n);var r=t(67294),o=t(96089),l=t(72350),c=t(65659),a=t(53132),s=r.memo(a.default["React\u6e90\u7801\u5206\u6790-React.Context-demo"].component),d=r.memo(a.default["React\u6e90\u7801\u5206\u6790-React.Context-demo-1"].component),u=r.memo(a.default["React\u6e90\u7801\u5206\u6790-React.Context-demo-2"].component);n["default"]=e=>(r.useEffect((()=>{var n;null!==e&&void 0!==e&&null!==(n=e.location)&&void 0!==n&&n.hash&&o.AnchorLink.scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),r.createElement(r.Fragment,null,r.createElement(r.Fragment,null,r.createElement("div",{className:"markdown"},r.createElement("h1",{id:"react\u6e90\u7801\u5206\u6790-reactcontext"},r.createElement(o.AnchorLink,{to:"#react\u6e90\u7801\u5206\u6790-reactcontext","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"React\u6e90\u7801\u5206\u6790-React.Context"),r.createElement("h2",{id:"\u5e26\u7740\u95ee\u9898\u770b\u6e90\u7801"},r.createElement(o.AnchorLink,{to:"#\u5e26\u7740\u95ee\u9898\u770b\u6e90\u7801","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"\u5e26\u7740\u95ee\u9898\u770b\u6e90\u7801"),r.createElement("ul",null,r.createElement("li",null,r.createElement("code",null,"useContext"),"\u7ec4\u4ef6\u5916\u90e8\u5982\u679c\u6ca1\u6709\u8c03\u7528",r.createElement("code",null,"Context.Provider"),"\u662f\u5426\u80fd\u83b7\u53d6\u5230\u9ed8\u8ba4\u503c?"),r.createElement("li",null,"\u5f53",r.createElement("code",null,"value"),"\u503c\u66f4\u65b0\u65f6\uff0c",r.createElement("code",null,"react"),"\u662f\u5982\u4f55\u901a\u77e5\u76f8\u5e94\u7ec4\u4ef6\u66f4\u65b0\u7684?")),r.createElement("h2",{id:"\u57fa\u7840\u7528\u6cd5"},r.createElement(o.AnchorLink,{to:"#\u57fa\u7840\u7528\u6cd5","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"\u57fa\u7840\u7528\u6cd5"),r.createElement("p",null,"\u4ee5\u4e0b\u4e3a\u5b98\u7f51\u7684\u793a\u4f8b"),r.createElement(c.Z,{code:"const ThemeContext = React.createContext('light');\n\nclass App extends React.Component {\n  render() {\n    // \u4f7f\u7528\u4e00\u4e2a Provider \u6765\u5c06\u5f53\u524d\u7684 theme \u4f20\u9012\u7ed9\u4ee5\u4e0b\u7684\u7ec4\u4ef6\u6811\u3002\n    // \u65e0\u8bba\u591a\u6df1\uff0c\u4efb\u4f55\u7ec4\u4ef6\u90fd\u80fd\u8bfb\u53d6\u8fd9\u4e2a\u503c\u3002\n    // \u5728\u8fd9\u4e2a\u4f8b\u5b50\u4e2d\uff0c\u6211\u4eec\u5c06 \u201cdark\u201d \u4f5c\u4e3a\u5f53\u524d\u7684\u503c\u4f20\u9012\u4e0b\u53bb\u3002\n    return (\n      <ThemeContext.Provider value=\"dark\">\n        <Toolbar />\n      </ThemeContext.Provider>\n    );\n  }\n}\n\n// \u4e2d\u95f4\u7684\u7ec4\u4ef6\u518d\u4e5f\u4e0d\u5fc5\u6307\u660e\u5f80\u4e0b\u4f20\u9012 theme \u4e86\u3002\nfunction Toolbar() {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n}\n\nclass ThemedButton extends React.Component {\n  // \u6307\u5b9a contextType \u8bfb\u53d6\u5f53\u524d\u7684 theme context\u3002\n  // React \u4f1a\u5f80\u4e0a\u627e\u5230\u6700\u8fd1\u7684 theme Provider\uff0c\u7136\u540e\u4f7f\u7528\u5b83\u7684\u503c\u3002\n  // \u5728\u8fd9\u4e2a\u4f8b\u5b50\u4e2d\uff0c\u5f53\u524d\u7684 theme \u503c\u4e3a \u201cdark\u201d\u3002\n  static contextType = ThemeContext;\n  render() {\n    return <Button theme={this.context} />;\n  }\n}",lang:"jsx"}),r.createElement("h2",{id:"reactcreatecontext"},r.createElement(o.AnchorLink,{to:"#reactcreatecontext","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"React.createContext"),r.createElement("p",null,"\u5148\u770b",r.createElement("code",null,"createContext"),"\u7c7b\u578b\u5b9a\u4e49"),r.createElement(c.Z,{code:"interface Context<T> {\n  // `Provider`\u63d0\u4f9b\u4e0a\u4e0b\u6587\u503c\n  Provider: Provider<T>;\n  // `Consumer`\u7528\u6765\u83b7\u53d6\u63d0\u4f9b\u7684\u503c\n  Consumer: Consumer<T>;\n  // \u8ddf\u7ec4\u4ef6displayName\u5dee\u4e0d\u591a\u610f\u601d\uff0c\u4e3b\u8981\u8c03\u8bd5\u7528\n  displayName?: string | undefined;\n}\nfunction createContext<T>(\n  // If you thought this should be optional, see\n  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106\n  defaultValue: T,\n): Context<T>;",lang:"ts"})),r.createElement(l.default,a.default["React\u6e90\u7801\u5206\u6790-React.Context-demo"].previewerProps,r.createElement(s,null)),r.createElement("div",{className:"markdown"},r.createElement("p",null,"\u7136\u540e",r.createElement("code",null,"createContext"),"\u7684\u5b9e\u73b0\u5176\u5b9e\u5f88\u7b80\u5355\u5c31\u662f\u521b\u5efa\u4e00\u4e2a",r.createElement("code",null,"context"),"\u5bf9\u8c61\u5e76\u8fd4\u56de\uff0c"),r.createElement(c.Z,{code:"export function createContext<T>(\n  defaultValue: T,\n  calculateChangedBits?: (a: T, b: T) => number,\n): ReactContext<T> {\n  const context: ReactContext<T> = {\n    $$typeof: REACT_CONTEXT_TYPE,\n    _calculateChangedBits: calculateChangedBits,\n    // As a workaround to support multiple concurrent renderers, we categorize\n    // some renderers as primary and others as secondary. We only expect\n    // there to be two concurrent renderers at most: React Native (primary) and\n    // Fabric (secondary); React DOM (primary) and React ART (secondary).\n    // Secondary renderers store their context values on separate fields.\n    _currentValue: defaultValue,\n    _currentValue2: defaultValue,\n    // Used to track how many concurrent renderers this context currently\n    // supports within in a single renderer. Such as parallel server rendering.\n    _threadCount: 0,\n    // These are circular\n    Provider: null,\n    Consumer: null,\n  };\n\n  context.Provider = {\n    $$typeof: REACT_PROVIDER_TYPE,\n    _context: context,\n  };\n\n  context.Consumer = context;\n\n  return context;\n}",lang:"ts"}),r.createElement("h2",{id:"contextprovider"},r.createElement(o.AnchorLink,{to:"#contextprovider","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"Context.Provider"),r.createElement("p",null,"\u4e00\u4e2a\u6709\u610f\u601d\u7684\u95ee\u9898\u662f\uff0c",r.createElement("code",null,"ThemeContext.Provider"),"\u548c",r.createElement("code",null,"ThemeContext.Consumer"),"\u662f\u88ab\u5f53\u4f5c\u7ec4\u4ef6\u4f7f\u7528\u7684\uff0c\u6bd4\u5982",r.createElement("code",null,"<ThemeContext.Provider ... />"),"\uff0c\u4f46\u4ece\u4e0a\u9762\u7684",r.createElement("code",null,"createContext"),"\u5b9e\u73b0\u53ef\u4ee5\u770b\u5230",r.createElement("code",null,"Provider"),'\u5373\u4e0d\u662f\u7c7b\u7ec4\u4ef6\u4e5f\u4e0d\u662f\u51fd\u6570\u7ec4\u4ef6\uff0c\u4ed6\u662f\u5982\u4f55"\u8c03\u7528"\u7684\u5462'),r.createElement("p",null,"\u5176\u5b9e\u4e25\u683c\u7684\u8bf4\u4e0d\u5e94\u8be5\u53eb",r.createElement("strong",null,"\u8c03\u7528"),"\uff0c\u5e94\u8be5\u53eb\u5b9e\u73b0\uff0c\u5f53\u770b\u4e86",r.createElement("code",null,"beginWork"),"\u51fd\u6570\u540e\uff0c\u604d\u7136\u8fd9\u4e0d\u662f",r.createElement("code",null,"OOP"),"\u4e2d\u7684\u591a\u6001\u4e48\uff0c\u5728",r.createElement("code",null,"beginWork"),"\u5bf9\u4e0d\u540c\u7c7b\u578b\u7ec4\u4ef6\u5bf9\u5e94\u4e0d\u540c\u7684\u5904\u7406\u65b9\u5f0f\uff0c"),r.createElement("ul",null,r.createElement("li",null,r.createElement("p",null,r.createElement("code",null,"Provider"),"\u5bf9\u8c61\u867d\u7136\u4e0d\u662f\u7c7b\u4e5f\u4e0d\u662f\u51fd\u6570\uff0c\u4f46\u8be5\u5bf9\u8c61\u5305\u542b",r.createElement("code",null,"$$typeof: REACT_PROVIDER_TYPE"),"\u5c5e\u6027")),r.createElement("li",null,r.createElement("p",null,r.createElement("code",null,"JSX"),"\u8f6c\u6362\u540e\u5b9e\u9645\u662f ",r.createElement("code",null,"React.createElement(Context.Provider, ","{"," value: null ","}",', "1")'))),r.createElement("li",null,r.createElement("p",null,"\u5728",r.createElement("code",null,"render"),"\u9636\u6bb5\u7684",r.createElement("code",null,"beginWork"),"\u4f1a\u8c03\u7528",r.createElement("code",null,"createFiberFromElement"),"\u521b\u5efa",r.createElement("code",null,"fiber"),"\u8282\u70b9\uff0c\u4e14",r.createElement("code",null,"Context.Provider"),"\u7684",r.createElement("code",null,"fiber"),"\u8282\u70b9\u7684",r.createElement("code",null,"fiber.tag = REACT_PROVIDER_TYPE")),r.createElement(c.Z,{code:"beginWork(current, rootFiber);\n// ...\nchild = createFiberFromElement(ContextProviderElement);\nbeginWork(current, child);",lang:"js"}),r.createElement("p",null,"\u5728\u5904\u7406 Provider \u7236\u8282\u70b9\u65f6\uff0c\u521b\u5efa Provider Fiber\uff0c\u4e0b\u6b21\u518d\u8fdb\u5165",r.createElement("code",null,"beginWork"),"\u5c31 ok \u4e86"),r.createElement(c.Z,{code:"function beginWork(\n  current: Fiber | null,\n  workInProgress: Fiber,\n  renderLanes: Lanes,\n): Fiber | null {\n  switch (workInProgress.tag) {\n    case FunctionComponent: {\n    }\n    case ClassComponent: {\n    }\n    case ForwardRef: {\n    }\n    case Fragment:\n      return updateFragment(current, workInProgress, renderLanes);\n    case ContextProvider:\n      return updateContextProvider(current, workInProgress, renderLanes);\n    case ContextConsumer:\n      return updateContextConsumer(current, workInProgress, renderLanes);\n    case MemoComponent: {\n    }\n    // ...\n  }\n}",lang:"ts"}),r.createElement("p",null,r.createElement("strong",null,"updateContextProvider")))),r.createElement(c.Z,{code:"function updateContextProvider(\n  current: Fiber | null,\n  workInProgress: Fiber,\n  renderLanes: Lanes,\n) {\n  const providerType: ReactProviderType<any> = workInProgress.type;\n  const context: ReactContext<any> = providerType._context;\n\n  const newProps = workInProgress.pendingProps;\n  const oldProps = workInProgress.memoizedProps;\n\n  const newValue = newProps.value;\n\n  pushProvider(workInProgress, newValue);\n\n  if (oldProps !== null) {\n    const oldValue = oldProps.value;\n    const changedBits = calculateChangedBits(context, newValue, oldValue);\n    if (changedBits === 0) {\n      // No change. Bailout early if children are the same.\n      if (\n        oldProps.children === newProps.children &&\n        !hasLegacyContextChanged()\n      ) {\n        return bailoutOnAlreadyFinishedWork(\n          current,\n          workInProgress,\n          renderLanes,\n        );\n      }\n    } else {\n      // The context value changed. Search for matching consumers and schedule\n      // them to update.\n      propagateContextChange(workInProgress, context, changedBits, renderLanes);\n    }\n  }\n\n  const newChildren = newProps.children;\n  reconcileChildren(current, workInProgress, newChildren, renderLanes);\n  return workInProgress.child;\n}",lang:"ts"}),r.createElement("ul",null,r.createElement("li",null,r.createElement("code",null,"pushProvider"),"\uff1a\u628a\u65b0\u7684\u503c\u63a8\u5230\u6808\u4e2d"),r.createElement("li",null,r.createElement("code",null,"propagateContextChange"),": \u901a\u8fc7\u4e0b\u9762\u63d0\u5230\u7684",r.createElement("code",null,"firstContext"),"\uff0c\u627e\u5230\u5f53\u524d\u8282\u70b9\u4e0b\u9762\u6240\u6709\u6709",r.createElement("code",null,"context"),"\u4f9d\u8d56\u7684\u5b50\u8282\u70b9\uff0c\u521b\u5efa\u6dfb\u52a0\u66f4\u65b0"),r.createElement("li",null,r.createElement("code",null,"reconcileChildren"),"\u8c03\u548c\u5b50\u8282\u70b9\u66f4\u65b0")),r.createElement("p",null,"\u5176\u4e2d",r.createElement("code",null,"pushProvider"),"\u548c",r.createElement("code",null,"popProvider"),"\u7684\u5b9e\u73b0\u5927\u81f4\u5982\u4e0b"),r.createElement(c.Z,{code:"const stack = [];\n\nconst context = {\n  currentValue: 'context init value',\n};\n\nfunction pushProvider(nextValue) {\n  stack.unshift(context.currentValue);\n  context.currentValue = nextValue;\n}\n\nfunction popProvider() {\n  const value = stack.shift();\n  context.currentValue = value;\n}",lang:"js"}),r.createElement("p",null,"\u8fd9\u6837\u8bbe\u8ba1\u7684\u76ee\u7684\u662f\u4e3a\u4e86\u591a\u6b21\u8c03\u7528\u540c\u4e00",r.createElement("code",null,"Context"),"\u7684",r.createElement("code",null,"Provider"),"\u80fd\u6b63\u5e38\u83b7\u53d6\u5230",r.createElement("code",null,"value"),"\uff0c\u5982")),r.createElement(l.default,a.default["React\u6e90\u7801\u5206\u6790-React.Context-demo-1"].previewerProps,r.createElement(d,null)),r.createElement("div",{className:"markdown"},r.createElement("p",null,r.createElement("code",null,"render"),"\u9636\u6bb5\u6df1\u5ea6\u4f18\u5148\u904d\u5386\uff0c",r.createElement("code",null,"beginWork"),"\u904d\u5386\u67d0\u4e00\u8def\u5f84\u6700\u6df1\u8282\u70b9\uff0c\u7136\u540e\u5f00\u59cb\u5411\u4e0a\u56de\u9000\u5f00\u59cb",r.createElement("code",null,"completeWork")),r.createElement("ul",null,r.createElement("li",null,r.createElement("p",null,"Provider-b => pushProvider('b')"),r.createElement("p",null,"currentValue = 'b'"),r.createElement("p",null,"stack = ['a']")),r.createElement("li",null,r.createElement("p",null,"Provider-c => pushProvider('c')"),r.createElement("p",null,"currentValue = 'c'"),r.createElement("p",null,"stack = ['b','a']")),r.createElement("li",null,r.createElement("p",null,"ThemedButton \u83b7\u53d6\u5230 currentValue = 'c'")),r.createElement("li",null,r.createElement("p",null,"\u8f6c\u5230",r.createElement("code",null,"completeWork"),"\uff0cProvider-c => popProvider"),r.createElement("p",null,"currentValue = 'b'"),r.createElement("p",null,"stack = ['a']")),r.createElement("li",null,r.createElement("p",null,"\u7b2c\u4e8c\u4e2a ThemedButton \u83b7\u53d6\u5230\u6b63\u786e\u7684 currentValue = 'b'"))),r.createElement("h2",{id:"usecontext"},r.createElement(o.AnchorLink,{to:"#usecontext","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"useContext"),r.createElement("p",null,r.createElement("code",null,"Provider"),"\u7684\u8c03\u7528\u6574\u6e05\u695a\u4e86\uff0c\u4e0b\u9762\u770b\u4e0b\u5982\u4f55\u83b7\u53d6",r.createElement("code",null,"value"),"\uff0c\u5148\u770b\u4e0b\u901a\u8fc7",r.createElement("code",null,"hook"),"\u5f62\u5f0f\u83b7\u53d6\uff0c\u8fd8\u662f\u7528\u5b98\u7f51\u7ed9\u7684\u4f8b\u5b50")),r.createElement(l.default,a.default["React\u6e90\u7801\u5206\u6790-React.Context-demo-2"].previewerProps,r.createElement(u,null)),r.createElement("div",{className:"markdown"},r.createElement(c.Z,{code:"export function useContext<T>(\n  Context: ReactContext<T>,\n  unstable_observedBits: number | boolean | void,\n): T {\n  //\n  const dispatcher = resolveDispatcher();\n  return dispatcher.useContext(Context, unstable_observedBits);\n}",lang:"ts"}),r.createElement("p",null,r.createElement("code",null,"ReactCurrentDispatcher"),"\u662f\u5728",r.createElement("code",null,"renderWithHooks"),"\u4e2d\u8d4b\u503c\u7684"),r.createElement(c.Z,{code:"ReactCurrentDispatcher.current =\n  current === null || current.memoizedState === null\n    ? HooksDispatcherOnMount\n    : HooksDispatcherOnUpdate;",lang:"js"}),r.createElement("p",null,r.createElement("code",null,"HooksDispatcherOnMount"),"\u548c",r.createElement("code",null,"HooksDispatcherOnUpdate"),"\u5206\u522b\u5b9a\u4e49\u4e86\u9996\u6b21\u6e32\u67d3\u3001\u66f4\u65b0\u6e32\u67d3\u5bf9\u5e94\u7684\u4e0d\u540c\u7684",r.createElement("code",null,"hook"),"\uff0c\u6bd4\u5982",r.createElement("code",null,"useState"),"\uff0c\u4f46\u662f",r.createElement("code",null,"useContext"),"\u5728\u8fd9\u4e24\u4e2a\u9636\u6bb5\u5904\u7406\u51fd\u6570\u90fd\u662f",r.createElement("code",null,"readContext")),r.createElement(c.Z,{code:"HooksDispatcherOnMount = {\n  useContext: readContext,\n  // ...\n};",lang:"js"}),r.createElement(c.Z,{code:"export function readContext<T>(\n  context: ReactContext<T>,\n  observedBits: void | number | boolean,\n): T {\n  if (lastContextWithAllBitsObserved === context) {\n    // Nothing to do. We already observe everything in this context.\n  } else if (observedBits === false || observedBits === 0) {\n    // Do not observe any updates.\n  } else {\n    let resolvedObservedBits; // Avoid deopting on observable arguments or heterogeneous types.\n    if (\n      typeof observedBits !== 'number' ||\n      observedBits === MAX_SIGNED_31_BIT_INT\n    ) {\n      // Observe all updates.\n      lastContextWithAllBitsObserved = context as ReactContext<mixed>;\n      resolvedObservedBits = MAX_SIGNED_31_BIT_INT;\n    } else {\n      resolvedObservedBits = observedBits;\n    }\n\n    const contextItem = {\n      context: context as  ReactContext<mixed>,\n      observedBits: resolvedObservedBits,\n      next: null,\n    };\n\n    if (lastContextDependency === null) {\n      invariant(\n        currentlyRenderingFiber !== null,\n        'Context can only be read while React is rendering. ' +\n          'In classes, you can read it in the render method or getDerivedStateFromProps. ' +\n          'In function components, you can read it directly in the function body, but not ' +\n          'inside Hooks like useReducer() or useMemo().',\n      );\n\n      // This is the first dependency for this component. Create a new list.\n      lastContextDependency = contextItem;\n      currentlyRenderingFiber.dependencies = {\n        lanes: NoLanes,\n        firstContext: contextItem,\n        responders: null,\n      };\n    } else {\n      // Append a new context item.\n      lastContextDependency = lastContextDependency.next = contextItem;\n    }\n  }\n  // \u5728react-dom\u4e2disPrimaryRenderer\u4e3atrue\n  return isPrimaryRenderer ? context._currentValue : context._currentValue2;\n}",lang:"js"}),r.createElement("ul",null,r.createElement("li",null,"\u5168\u5c40\u53d8\u91cf",r.createElement("code",null,"lastContextDependency"),"\u4fdd\u5b58\u7740\u6709",r.createElement("code",null,"context"),"\u4f9d\u8d56\u7684\u94fe\u8868\uff0c\u8fd9\u4e2a\u540e\u9762\u518d\u5206\u6790"),r.createElement("li",null,r.createElement("code",null,"readContext"),"\u8fd4\u56de\u503c\u662f",r.createElement("code",null,"context._currentValue")),r.createElement("li",null,r.createElement("code",null,"context._currentValue"),"\u503c\u7684\u66f4\u65b0\u6709\u4e24\u4e2a\u5730\u65b9\uff0c\u7b2c\u4e00\u4e2a\u662f",r.createElement("code",null,"crateContext"),"\u521d\u59cb\u5316\u65f6\uff1b\u7b2c\u4e8c\u4e2a\u662f",r.createElement("code",null,"<Provider value=","{","}"," />"))),r.createElement("h2",{id:"contextconsumer"},r.createElement(o.AnchorLink,{to:"#contextconsumer","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"Context.Consumer"),r.createElement("p",null,r.createElement("code",null,"Context.Consumer"),"\u548c",r.createElement("code",null,"useContext"),"\u5927\u4f53\u76f8\u540c"),r.createElement(c.Z,{code:'function updateContextConsumer(\n  current: Fiber | null,\n  workInProgress: Fiber,\n  renderLanes: Lanes,\n) {\n  let context: ReactContext<any> = workInProgress.type;\n  // The logic below for Context differs depending on PROD or DEV mode. In\n  // DEV mode, we create a separate object for Context.Consumer that acts\n  // like a proxy to Context. This proxy object adds unnecessary code in PROD\n  // so we use the old behaviour (Context.Consumer references Context) to\n  // reduce size and overhead. The separate object references context via\n  // a property called "_context", which also gives us the ability to check\n  // in DEV mode if this property exists or not and warn if it does not.\n  const newProps = workInProgress.pendingProps;\n  const render = newProps.children;\n\n  prepareToReadContext(workInProgress, renderLanes);\n  const newValue = readContext(context, newProps.unstable_observedBits);\n  let newChildren;\n  if (__DEV__) {\n  } else {\n    newChildren = render(newValue);\n  }\n\n  // React DevTools reads this flag.\n  workInProgress.flags |= PerformedWork;\n  reconcileChildren(current, workInProgress, newChildren, renderLanes);\n  return workInProgress.child;\n}',lang:"ts"}),r.createElement("h2",{id:"contexttype"},r.createElement(o.AnchorLink,{to:"#contexttype","aria-hidden":"true",tabIndex:-1},r.createElement("span",{className:"icon icon-link"})),"ContextType"),r.createElement("p",null,"\u4f7f\u7528",r.createElement("code",null,"ContextType"),"\uff0c\u4e0d\u7ba1\u662f\u9996\u6b21\u6e32\u67d3\u8fd8\u662f\u66f4\u65b0\uff0c\u5224\u65ad\u7ec4\u4ef6\u6709\u6ca1\u6709",r.createElement("code",null,"contextType"),"\u9759\u6001\u5c5e\u6027\uff0c\u5982\u679c\u6709\u4e5f\u662f\u8c03\u7528",r.createElement("code",null,"readContext"),"\u83b7\u53d6\u503c"),r.createElement(c.Z,{code:"const contextType = ctor.contextType;\n// \u9996\u6b21\nif (typeof contextType === 'object' && contextType !== null) {\n  context = readContext((contextType: any));\n}\nconst instance = new ctor(props, context);\ninstance.context = context;\n\n// \u66f4\u65b0\u6e32\u67d3\nlet nextContext = emptyContextObject;\nif (typeof contextType === 'object' && contextType !== null) {\n  nextContext = readContext(contextType);\n}\ninstance.UNSAFE_componentWillReceiveProps(newProps, nextContext);\ninstance.componentWillReceiveProps(newProps, nextContext);\ninstance.context = nextContext;",lang:"js"}),r.createElement(c.Z,{code:"import React from 'react';\n\nconst ThemeContext = React.createContext('light');\n\nclass App extends React.Component {\n  render() {\n    return (\n      <ThemeContext.Provider value=\"dark\">\n        <ThemedButton />\n      </ThemeContext.Provider>\n    );\n  }\n}\n\nclass ThemedButton extends React.Component {\n  static contextType = ThemeContext;\n\n  render() {\n    return <div>value:{this.context}</div>;\n  }\n}\nexport default App;",lang:"jsx"})))))}}]);