// @bun
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/@dark-engine/core/dist/esm/constants.js
var LIB, ROOT, REPLACER, INDEX_KEY, KEY_ATTR, REF_ATTR, CREATE_EFFECT_TAG, UPDATE_EFFECT_TAG, DELETE_EFFECT_TAG, SKIP_EFFECT_TAG, INSERTION_EFFECT_HOST_MASK, LAYOUT_EFFECT_HOST_MASK, ASYNC_EFFECT_HOST_MASK, ATOM_HOST_MASK, FLUSH_MASK, MOVE_MASK, IS_WIP_HOOK_MASK, IS_PORTAL_HOOK_NASK, IS_SUSPENSE_HOOK_MASK, IS_PENDING_HOOK_MASK, HOOK_DELIMETER, YIELD_INTERVAL, STATE_SCRIPT_TYPE, TaskPriority, Flag, ATTR_BLACK_LIST;
var init_constants = __esm(() => {
  LIB = "@dark-engine/core";
  ROOT = "dark:root";
  REPLACER = "dark:matter";
  INDEX_KEY = "dark:idx";
  KEY_ATTR = "key";
  REF_ATTR = "ref";
  CREATE_EFFECT_TAG = "C";
  UPDATE_EFFECT_TAG = "U";
  DELETE_EFFECT_TAG = "D";
  SKIP_EFFECT_TAG = "S";
  INSERTION_EFFECT_HOST_MASK = 1;
  LAYOUT_EFFECT_HOST_MASK = 2;
  ASYNC_EFFECT_HOST_MASK = 4;
  ATOM_HOST_MASK = 8;
  FLUSH_MASK = 16;
  MOVE_MASK = 32;
  IS_WIP_HOOK_MASK = 1;
  IS_PORTAL_HOOK_NASK = 2;
  IS_SUSPENSE_HOOK_MASK = 4;
  IS_PENDING_HOOK_MASK = 8;
  HOOK_DELIMETER = ":";
  YIELD_INTERVAL = 6;
  STATE_SCRIPT_TYPE = "text/dark-state";
  (function(TaskPriority2) {
    TaskPriority2[TaskPriority2["LOW"] = 0] = "LOW";
    TaskPriority2[TaskPriority2["NORMAL"] = 1] = "NORMAL";
    TaskPriority2[TaskPriority2["HIGH"] = 2] = "HIGH";
  })(TaskPriority || (TaskPriority = {}));
  (function(Flag2) {
    Flag2["SKIP_SCAN_OPT"] = "__skipScanOpt";
    Flag2["MEMO_SLOT_OPT"] = "__memoSlotOpt";
    Flag2["STATIC_SLOT_OPT"] = "__staticSlotOpt";
  })(Flag || (Flag = {}));
  ATTR_BLACK_LIST = {
    [KEY_ATTR]: true,
    [REF_ATTR]: true,
    [Flag.SKIP_SCAN_OPT]: true,
    [Flag.MEMO_SLOT_OPT]: true,
    [Flag.STATIC_SLOT_OPT]: true
  };
});

// node_modules/@dark-engine/core/dist/esm/component/component.js
class Component {
  type = null;
  props = null;
  token = null;
  displayName = null;
  shouldUpdate = null;
  children = [];
  constructor(type47, token, props, shouldUpdate, displayName) {
    this.type = type47;
    this.props = props;
    token && (this.token = token);
    shouldUpdate && (this.shouldUpdate = shouldUpdate);
    displayName && (this.displayName = displayName);
  }
}
var component, $$inject, defaultInject, detectIsComponent, getComponentKey, hasComponentFlag;
var init_component = __esm(() => {
  init_constants();
  component = function(type47, options = {}) {
    const { token: $token, displayName } = options;
    const factory = (props = {}) => {
      const { token = $token, shouldUpdate } = factory[$$inject] || defaultInject;
      return new Component(type47, token, props, shouldUpdate, displayName);
    };
    factory.displayName = displayName;
    return factory;
  };
  $$inject = Symbol("inject");
  defaultInject = {};
  detectIsComponent = (x3) => x3 instanceof Component;
  getComponentKey = (x3) => x3.props[KEY_ATTR] ?? null;
  hasComponentFlag = (inst, flag) => Boolean(inst.props[flag]);
});

// node_modules/@dark-engine/core/dist/esm/component/index.js
var init_component2 = __esm(() => {
  init_component();
});

// node_modules/@dark-engine/core/dist/esm/utils/utils.js
var throwThis, flatten, detectAreDepsDifferent, detectIsFunction, detectIsUndefined, detectIsNumber, detectIsString, detectIsTextBased, detectIsObject, detectIsBoolean, detectIsArray, detectIsNull, detectIsEmpty, detectIsFalsy, detectIsPromise, detectIsEqual, keys, getTime, dummyFn, trueFn, falseFn, sameFn, logError, formatErrorMsg, illegal, nextTick, createIndexKey, mapRecord;
var init_utils = __esm(() => {
  init_constants();
  throwThis = function(x3) {
    throw x3;
  };
  flatten = function(source, transform7 = sameFn) {
    if (detectIsArray(source)) {
      if (source.length === 0)
        return [];
    } else {
      return [transform7(source)];
    }
    const list = [];
    const stack = [source[0]];
    let idx = 0;
    while (stack.length > 0) {
      const x3 = stack.pop();
      if (detectIsArray(x3)) {
        for (let i3 = x3.length - 1;i3 >= 0; i3--) {
          stack.push(x3[i3]);
        }
      } else {
        list.push(transform7(x3));
        if (stack.length === 0 && idx < source.length - 1) {
          idx++;
          stack.push(source[idx]);
        }
      }
    }
    return list;
  };
  detectAreDepsDifferent = function(prevDeps, nextDeps) {
    if (prevDeps === nextDeps || prevDeps.length === 0 && nextDeps.length === 0)
      return false;
    const max = Math.max(prevDeps.length, nextDeps.length);
    for (let i3 = 0;i3 < max; i3++) {
      if (!detectIsEqual(prevDeps[i3], nextDeps[i3]))
        return true;
    }
    return false;
  };
  detectIsFunction = (o) => typeof o === "function";
  detectIsUndefined = (o) => typeof o === "undefined";
  detectIsNumber = (o) => typeof o === "number";
  detectIsString = (o) => typeof o === "string";
  detectIsTextBased = (o) => typeof o === "string" || typeof o === "number";
  detectIsObject = (o) => typeof o === "object";
  detectIsBoolean = (o) => typeof o === "boolean";
  detectIsArray = (o) => Array.isArray(o);
  detectIsNull = (o) => o === null;
  detectIsEmpty = (o) => detectIsNull(o) || detectIsUndefined(o);
  detectIsFalsy = (o) => detectIsEmpty(o) || o === false;
  detectIsPromise = (o) => o instanceof Promise;
  detectIsEqual = (a, b) => Object.is(a, b);
  keys = (o) => Object.keys(o);
  getTime = () => Date.now();
  dummyFn = () => {
  };
  trueFn = () => true;
  falseFn = () => false;
  sameFn = (x3) => x3;
  logError = (...args) => !detectIsUndefined(console) && console.error(...args);
  formatErrorMsg = (x3, prefix = LIB) => `[${prefix}]: ${x3}`;
  illegal = (x3, prefix = LIB) => throwThis(new Error(formatErrorMsg(x3, prefix)));
  nextTick = (callback) => Promise.resolve().then(callback);
  createIndexKey = (idx) => `${INDEX_KEY}:${idx}`;
  mapRecord = (record4) => keys(record4).map((x3) => record4[x3]);
});

// node_modules/@dark-engine/core/dist/esm/utils/index.js
var init_utils2 = __esm(() => {
  init_utils();
});

// node_modules/@dark-engine/core/dist/esm/platform/platform.js
var realisation, platform, detectIsServer, detectIsHydration, detectIsSSR;
var init_platform = __esm(() => {
  init_utils2();
  init_scope2();
  realisation = () => illegal("The function was not installed by renderer!");
  platform = {
    createElement: realisation,
    toggle: realisation,
    raf: realisation,
    caf: realisation,
    spawn: realisation,
    commit: realisation,
    finishCommit: realisation,
    detectIsDynamic: realisation
  };
  detectIsServer = () => !platform.detectIsDynamic();
  detectIsHydration = () => $$scope().getIsHydrateZone();
  detectIsSSR = () => detectIsServer() || detectIsHydration();
});

// node_modules/@dark-engine/core/dist/esm/platform/index.js
var init_platform2 = __esm(() => {
  init_platform();
});

// node_modules/@dark-engine/core/dist/esm/emitter/emitter.js
class EventEmitter {
  subscribers = new Map;
  on(e3, fn) {
    !this.subscribers.has(e3) && this.subscribers.set(e3, new Set);
    this.subscribers.get(e3).add(fn);
    return () => this.subscribers.has(e3) && this.subscribers.get(e3).delete(fn);
  }
  emit(e3, data) {
    this.subscribers.has(e3) && this.subscribers.get(e3).forEach((x3) => x3(data));
  }
  kill() {
    this.subscribers = new Map;
  }
  __getSize() {
    return this.subscribers.size;
  }
}
var init_emitter = __esm(() => {
});

// node_modules/@dark-engine/core/dist/esm/emitter/index.js
var init_emitter2 = __esm(() => {
  init_emitter();
});

// node_modules/@dark-engine/core/dist/esm/fiber/fiber.js
class Fiber {
  id = 0;
  cc = 0;
  cec = 0;
  idx = 0;
  eidx = 0;
  mask = 0;
  element = null;
  tag = null;
  parent = null;
  child = null;
  next = null;
  alt = null;
  inst = null;
  hook = null;
  constructor(idx = 0, hook = null) {
    this.id = Fiber.incrementId();
    this.idx = idx;
    this.hook = hook;
  }
  mutate(fiber) {
    for (const key in fiber) {
      this[key] = fiber[key];
    }
    return this;
  }
  markHost(mask) {
    this.mask |= mask;
    this.parent && !(this.parent.mask & mask) && this.parent.markHost(mask);
  }
  increment(count = 1) {
    if (!this.parent)
      return;
    this.parent.cec += count;
    if (!this.parent.element && !this.parent.hook?.getIsWip()) {
      this.parent.increment(count);
    }
  }
  setError(err) {
    if (this.hook?.hasCatch()) {
      this.hook.catch(err);
      logError(err);
    } else if (this.parent) {
      this.parent.setError(err);
    } else {
      throw err;
    }
  }
  static incrementId() {
    return ++Fiber.nextId;
  }
  static setNextId(id) {
    Fiber.nextId = id;
  }
  static nextId = 0;
}

class Hook {
  idx = 0;
  values = [];
  owner = null;
  atoms = null;
  mask = 0;
  box = null;
  __getMask(mask) {
    return Boolean(this.mask & mask);
  }
  __mark(mask, x3) {
    x3 ? this.mask |= mask : this.mask &= ~mask;
  }
  __box() {
    if (!this.box)
      this.box = {};
  }
  getIsWip() {
    return this.__getMask(IS_WIP_HOOK_MASK);
  }
  setIsWip(x3) {
    this.__mark(IS_WIP_HOOK_MASK, x3);
  }
  getIsPortal() {
    return this.__getMask(IS_PORTAL_HOOK_NASK);
  }
  setIsPortal(x3) {
    this.__mark(IS_PORTAL_HOOK_NASK, x3);
  }
  getIsSuspense() {
    return this.__getMask(IS_SUSPENSE_HOOK_MASK);
  }
  setIsSuspense(x3) {
    this.__mark(IS_SUSPENSE_HOOK_MASK, x3);
  }
  getIsPending() {
    return this.__getMask(IS_PENDING_HOOK_MASK);
  }
  setIsPeinding(x3) {
    this.__mark(IS_PENDING_HOOK_MASK, x3);
  }
  getProviders() {
    return this.box?.providers;
  }
  setProviders(x3) {
    this.__box();
    this.box.providers = x3;
  }
  getBatch() {
    return this.box?.batch;
  }
  setBatch(x3) {
    this.__box();
    this.box.batch = x3;
  }
  hasCatch() {
    return detectIsFunction(this.box?.catch);
  }
  setCatch(x3) {
    this.__box();
    this.box.catch = x3;
  }
  catch(x3) {
    this.box?.catch(x3);
  }
  incrementPending() {
    this.__box();
    detectIsUndefined(this.box.pendings) && (this.box.pendings = 0);
    this.box.pendings++;
  }
  getPendings() {
    return this.box?.pendings;
  }
}

class Awaiter {
  store = new Map;
  add(hook, promise5) {
    !this.store.has(hook) && this.store.set(hook, new Set);
    this.store.get(hook).add(promise5);
  }
  resolve(cb) {
    for (const [hook, promises] of this.store) {
      const $promises = Array.from(promises);
      this.store.delete(hook);
      if ($promises.length > 0) {
        hook.setIsPeinding(true);
        hook.incrementPending();
        const pendings = hook.getPendings();
        cb(hook);
        Promise.allSettled($promises).then(() => {
          if (pendings === hook.getPendings()) {
            hook.setIsPeinding(false);
            cb(hook);
          }
        });
      }
    }
  }
}
var getHook;
var init_fiber = __esm(() => {
  init_constants();
  init_utils2();
  init_view2();
  init_component2();
  getHook = function(alt, prevInst, nextInst) {
    if (alt && detectAreSameComponentTypesWithSameKeys(prevInst, nextInst))
      return alt.hook;
    if (detectIsComponent(nextInst))
      return new Hook;
    return null;
  };
});

// node_modules/@dark-engine/core/dist/esm/fiber/index.js
var init_fiber2 = __esm(() => {
  init_fiber();
});

// node_modules/@dark-engine/core/dist/esm/scope/scope.js
class Scope {
  root = null;
  wip = null;
  cursor = null;
  unit = null;
  mountDeep = true;
  mountLevel = 0;
  mountNav = {};
  events = new Map;
  unsubs = new Set;
  actions = {};
  candidates = new Set;
  deletions = new Set;
  cancels = [];
  asyncEffects = new Set;
  layoutEffects = new Set;
  insertionEffects = new Set;
  resourceId = 0;
  resources = new Map;
  awaiter = new Awaiter;
  onTransitionEnd = null;
  isLayoutEffectsZone = false;
  isInsertionEffectsZone = false;
  isUpdateZone = false;
  isBatchZone = false;
  isHydrateZone = false;
  isStreamZone = false;
  isTransitionZone = false;
  isEventZone = false;
  isHot = false;
  isDynamic = platform.detectIsDynamic();
  isServer = detectIsServer();
  emitter = new EventEmitter;
  resetActions() {
    this.actions = {};
  }
  getActionsById(id) {
    return this.actions[id];
  }
  addActionMap(id, map3) {
    this.actions[id] = {
      map: map3,
      replace: null,
      insert: null,
      remove: null,
      move: null,
      stable: null
    };
  }
  addReplaceAction(id, nextKey) {
    !this.actions[id].replace && (this.actions[id].replace = {});
    this.actions[id].replace[nextKey] = true;
  }
  addInsertAction(id, nextKey) {
    !this.actions[id].insert && (this.actions[id].insert = {});
    this.actions[id].insert[nextKey] = true;
  }
  addRemoveAction(id, prevKey) {
    !this.actions[id].remove && (this.actions[id].remove = {});
    this.actions[id].remove[prevKey] = true;
  }
  addMoveAction(id, nextKey) {
    !this.actions[id].move && (this.actions[id].move = {});
    this.actions[id].move[nextKey] = true;
  }
  addStableAction(id, nextKey) {
    !this.actions[id].stable && (this.actions[id].stable = {});
    this.actions[id].stable[nextKey] = true;
  }
  fork() {
    const scope2 = new Scope;
    scope2.root = null;
    scope2.wip = null;
    scope2.cursor = null;
    scope2.unit = this.unit;
    scope2.mountDeep = this.mountDeep;
    scope2.mountLevel = this.mountLevel;
    scope2.mountNav = { ...this.mountNav };
    scope2.events = this.events;
    scope2.unsubs = this.unsubs;
    scope2.actions = { ...this.actions };
    scope2.candidates = new Set([...this.candidates]);
    scope2.deletions = new Set([...this.deletions]);
    scope2.asyncEffects = new Set([...this.asyncEffects]);
    scope2.layoutEffects = new Set([...this.layoutEffects]);
    scope2.isUpdateZone = this.isUpdateZone;
    scope2.emitter = this.emitter;
    scope2.awaiter = this.awaiter;
    return scope2;
  }
  getRoot() {
    return this.root;
  }
  setRoot(fiber3) {
    this.root = fiber3;
  }
  keepRoot() {
    !this.isUpdateZone && this.setRoot(this.wip);
  }
  getWorkInProgress() {
    return this.wip;
  }
  setWorkInProgress(fiber3) {
    this.wip = fiber3;
  }
  getNextUnitOfWork() {
    return this.unit;
  }
  setNextUnitOfWork(fiber3) {
    this.unit = fiber3;
  }
  getCursorFiber() {
    return this.cursor;
  }
  setCursorFiber(fiber3) {
    this.cursor = fiber3;
  }
  navToChild() {
    this.mountLevel = this.mountLevel + 1;
    this.mountNav[this.mountLevel] = 0;
  }
  navToSibling() {
    this.mountNav[this.mountLevel] = this.mountNav[this.mountLevel] + 1;
  }
  navToParent() {
    this.mountLevel = this.mountLevel - 1;
  }
  navToPrev() {
    const idx = this.getMountIndex();
    if (idx === 0) {
      this.navToParent();
      this.setMountDeep(true);
    } else {
      this.mountNav[this.mountLevel] = this.mountNav[this.mountLevel] - 1;
      this.setMountDeep(false);
    }
  }
  getMountIndex() {
    return this.mountNav[this.mountLevel];
  }
  getMountDeep() {
    return this.mountDeep;
  }
  setMountDeep(value15) {
    this.mountDeep = value15;
  }
  resetMount() {
    this.mountLevel = 0;
    this.mountNav = {};
    this.mountDeep = true;
  }
  getEvents() {
    return this.events;
  }
  addEventUnsubscriber(fn) {
    this.unsubs.add(fn);
  }
  unsubscribeEvents() {
    this.unsubs.forEach((x3) => x3());
    this.unsubs = new Set;
  }
  getCandidates() {
    return this.candidates;
  }
  addCandidate(fiber3) {
    this.candidates.add(fiber3);
  }
  resetCandidates() {
    this.candidates = new Set;
  }
  getDeletions() {
    return this.deletions;
  }
  hasDeletion(fiber3) {
    let nextFiber = fiber3;
    while (nextFiber) {
      if (this.deletions.has(nextFiber))
        return true;
      nextFiber = nextFiber.parent;
    }
    return false;
  }
  addDeletion(fiber3) {
    !this.hasDeletion(fiber3) && this.deletions.add(fiber3);
  }
  resetDeletions() {
    this.deletions = new Set;
  }
  addAsyncEffect(fn) {
    this.asyncEffects.add(fn);
  }
  resetAsyncEffects() {
    this.asyncEffects = new Set;
  }
  runAsyncEffects() {
    if (!this.isDynamic)
      return;
    const effects = this.asyncEffects;
    effects.size > 0 && setTimeout(() => effects.forEach((fn) => fn()));
  }
  addLayoutEffect(fn) {
    this.layoutEffects.add(fn);
  }
  resetLayoutEffects() {
    this.layoutEffects = new Set;
  }
  runLayoutEffects() {
    if (!this.isDynamic)
      return;
    this.setIsLayoutEffectsZone(true);
    this.layoutEffects.forEach((fn) => fn());
    this.setIsLayoutEffectsZone(false);
  }
  addInsertionEffect(fn) {
    this.insertionEffects.add(fn);
  }
  resetInsertionEffects() {
    this.insertionEffects = new Set;
  }
  runInsertionEffects() {
    if (!this.isDynamic)
      return;
    this.setIsInsertionEffectsZone(true);
    this.insertionEffects.forEach((fn) => fn());
    this.setIsInsertionEffectsZone(false);
  }
  addCancel(fn) {
    this.cancels.push(fn);
  }
  applyCancels() {
    for (let i3 = this.cancels.length - 1;i3 >= 0; i3--) {
      this.cancels[i3]();
    }
  }
  resetCancels() {
    this.cancels = [];
  }
  getIsLayoutEffectsZone() {
    return this.isLayoutEffectsZone;
  }
  setIsLayoutEffectsZone(value15) {
    this.isLayoutEffectsZone = value15;
  }
  getIsInsertionEffectsZone() {
    return this.isInsertionEffectsZone;
  }
  setIsInsertionEffectsZone(value15) {
    this.isInsertionEffectsZone = value15;
  }
  getIsUpdateZone() {
    return this.isUpdateZone;
  }
  setIsUpdateZone(value15) {
    this.isUpdateZone = value15;
  }
  getIsBatchZone() {
    return this.isBatchZone;
  }
  setIsBatchZone(value15) {
    this.isBatchZone = value15;
  }
  getIsHydrateZone() {
    return this.isHydrateZone;
  }
  setIsHydrateZone(value15) {
    this.isHydrateZone = value15;
  }
  getIsStreamZone() {
    return this.isStreamZone;
  }
  setIsStreamZone(value15) {
    this.isStreamZone = value15;
  }
  getIsTransitionZone() {
    return this.isTransitionZone;
  }
  setIsTransitionZone(value15) {
    this.isTransitionZone = value15;
  }
  getIsEventZone() {
    return this.isEventZone;
  }
  setIsEventZone(value15) {
    this.isEventZone = value15;
  }
  getIsHot() {
    return this.isHot;
  }
  setIsHot(value15) {
    this.isHot = value15;
  }
  getOnTransitionEnd() {
    return this.onTransitionEnd;
  }
  setOnTransitionEnd(fn) {
    this.onTransitionEnd = fn;
  }
  cleanup() {
    this.keepRoot();
    this.setWorkInProgress(null);
    this.setNextUnitOfWork(null);
    this.setCursorFiber(null);
    this.resetMount();
    this.resetCandidates();
    this.resetDeletions();
    this.resetCancels();
    this.resetInsertionEffects();
    this.resetLayoutEffects();
    this.resetAsyncEffects();
    this.setIsHydrateZone(false);
    this.setIsUpdateZone(false);
    this.resetActions();
  }
  getEmitter() {
    return this.emitter;
  }
  getResource(id) {
    return this.resources.get(id);
  }
  setResource(id, res) {
    this.resources.set(id, res);
  }
  getResources() {
    return this.resources;
  }
  getResourceId() {
    return this.resourceId;
  }
  setResourceId(id) {
    this.resourceId = id;
  }
  getNextResourceId() {
    return ++this.resourceId;
  }
  getAwaiter() {
    return this.awaiter;
  }
  runAfterCommit() {
    this.resources = new Map;
    this.isServer && (this.resourceId = 0);
  }
}
var rootId, scopes, getRootId, setRootId, removeScope, replaceScope, $$scope;
var init_scope = __esm(() => {
  init_platform2();
  init_emitter2();
  init_fiber2();
  rootId = null;
  scopes = new Map;
  getRootId = () => rootId;
  setRootId = (id) => {
    rootId = id;
    !scopes.has(rootId) && scopes.set(rootId, new Scope);
  };
  removeScope = (id) => scopes.delete(id);
  replaceScope = (scope2, id = rootId) => {
    Object.assign(scopes.get(id), scope2);
  };
  $$scope = (id = rootId) => scopes.get(id);
});

// node_modules/@dark-engine/core/dist/esm/scope/index.js
var init_scope2 = __esm(() => {
  init_scope();
});

// node_modules/@dark-engine/core/dist/esm/view/view.js
class VirtualNode {
  type = null;
  constructor(type47) {
    this.type = type47;
  }
}

class TagVirtualNode extends VirtualNode {
  name;
  attrs;
  children;
  constructor(name, attrs, children) {
    super(NodeType.TAG);
    this.name = name;
    this.attrs = attrs;
    this.children = children;
  }
}

class TextVirtualNode extends VirtualNode {
  value;
  constructor(source) {
    super(NodeType.TEXT);
    this.value = String(source);
  }
}

class CommentVirtualNode extends VirtualNode {
  value = "";
  constructor(text) {
    super(NodeType.COMMENT);
    this.value = text;
  }
}
var View, getElementKey, hasElementFlag, getElementType, hasChildrenProp, detectAreSameInstanceTypes, detectAreSameComponentTypesWithSameKeys, $$vNode, ATTR_TYPE, Text, detectIsVirtualNode, detectIsTagVirtualNode, detectIsCommentVirtualNode, detectIsTextVirtualNode, detectIsVirtualNodeFactory, getTagVirtualNodeKey, hasTagVirtualNodeFlag, getVirtualNodeFactoryKey, hasVirtualNodeFactoryFlag, detectIsPlainVirtualNode, createReplacer, NodeType;
var init_view = __esm(() => {
  init_component2();
  init_utils2();
  init_constants();
  init_scope2();
  View = function(options) {
    const factory = () => {
      const { as: name, slot, _void = false, ...attrs } = options;
      const children = _void ? [] : detectIsArray(slot) ? slot : !detectIsEmpty(slot) ? [slot] : [];
      return new TagVirtualNode(name, attrs, children);
    };
    factory[$$vNode] = true;
    factory[ATTR_TYPE] = options.as;
    factory[KEY_ATTR] = options.key;
    return factory;
  };
  getElementKey = function(inst) {
    return detectIsComponent(inst) ? getComponentKey(inst) : detectIsVirtualNodeFactory(inst) ? getVirtualNodeFactoryKey(inst) : detectIsTagVirtualNode(inst) ? getTagVirtualNodeKey(inst) : null;
  };
  hasElementFlag = function(inst, flag) {
    return detectIsComponent(inst) ? hasComponentFlag(inst, flag) : detectIsVirtualNodeFactory(inst) ? hasVirtualNodeFactoryFlag(inst, flag) : detectIsTagVirtualNode(inst) ? hasTagVirtualNodeFlag(inst, flag) : false;
  };
  getElementType = function(inst) {
    return detectIsComponent(inst) ? inst.type : detectIsVirtualNodeFactory(inst) ? inst[ATTR_TYPE] : detectIsTagVirtualNode(inst) ? inst.name : detectIsVirtualNode(inst) ? inst.type : null;
  };
  hasChildrenProp = function(inst) {
    return detectIsTagVirtualNode(inst) || detectIsComponent(inst);
  };
  detectAreSameInstanceTypes = function(prevInst, nextInst, isComponentFactories = false) {
    if (true) {
      if ($$scope().getIsHot()) {
        if (detectIsComponent(prevInst) && detectIsComponent(nextInst)) {
          return prevInst.displayName === nextInst.displayName;
        }
      }
    }
    return isComponentFactories ? prevInst.type === nextInst.type : getElementType(prevInst) === getElementType(nextInst);
  };
  detectAreSameComponentTypesWithSameKeys = function(prevInst, nextInst) {
    return detectIsComponent(prevInst) && detectIsComponent(nextInst) && detectAreSameInstanceTypes(prevInst, nextInst, true) && getElementKey(prevInst) === getElementKey(nextInst);
  };
  $$vNode = Symbol("vNode");
  ATTR_TYPE = "type";
  Text = (source) => new TextVirtualNode(source);
  Text.from = (source) => detectIsTextVirtualNode(source) ? source.value : String(source);
  detectIsVirtualNode = (vNode) => vNode instanceof VirtualNode;
  detectIsTagVirtualNode = (vNode) => vNode instanceof TagVirtualNode;
  detectIsCommentVirtualNode = (vNode) => vNode instanceof CommentVirtualNode;
  detectIsTextVirtualNode = (vNode) => vNode instanceof TextVirtualNode;
  detectIsVirtualNodeFactory = (factory) => detectIsFunction(factory) && factory[$$vNode] === true;
  getTagVirtualNodeKey = (vNode) => vNode.attrs ? vNode.attrs[KEY_ATTR] ?? null : null;
  hasTagVirtualNodeFlag = (vNode, flag) => Boolean(vNode.attrs[flag]);
  getVirtualNodeFactoryKey = (factory) => factory[KEY_ATTR] ?? null;
  hasVirtualNodeFactoryFlag = (factory, flag) => Boolean(factory[flag]);
  detectIsPlainVirtualNode = (vNode) => detectIsTextVirtualNode(vNode) || detectIsCommentVirtualNode(vNode);
  createReplacer = () => new CommentVirtualNode(REPLACER);
  (function(NodeType2) {
    NodeType2["TAG"] = "TAG";
    NodeType2["TEXT"] = "TEXT";
    NodeType2["COMMENT"] = "COMMENT";
  })(NodeType || (NodeType = {}));
});

// node_modules/@dark-engine/core/dist/esm/view/index.js
var init_view2 = __esm(() => {
  init_view();
});

// node_modules/@dark-engine/core/dist/esm/memo/memo.js
var memo, $$memo, defaultShouldUpdate, detectIsMemo;
var init_memo = __esm(() => {
  init_component2();
  memo = function(factory, shouldUpdate = defaultShouldUpdate) {
    factory[$$inject] = {
      token: $$memo,
      shouldUpdate
    };
    return factory;
  };
  $$memo = Symbol("memo");
  defaultShouldUpdate = (props, nextProps) => {
    for (const key in nextProps) {
      if (key !== "slot" && nextProps[key] !== props[key])
        return true;
    }
    return false;
  };
  detectIsMemo = (instance) => detectIsComponent(instance) && instance.token === $$memo;
});

// node_modules/@dark-engine/core/dist/esm/memo/index.js
var init_memo2 = __esm(() => {
  init_memo();
});

// node_modules/@dark-engine/core/dist/esm/walk/walk.js
var walk, getFiberWithElement, detectIsFiberAlive, getSuspense, resolveSuspense, createHookLoc, detectIsStableMemoTree, tryOptStaticSlot, tryOptMemoSlot, tryOptMov, buildChildNodes, buildChildNode, getKey, notifyParents;
var init_walk = __esm(() => {
  init_constants();
  init_view2();
  init_fiber2();
  init_utils2();
  init_memo2();
  walk = function(fiber4, onWalk) {
    let shouldDeep = true;
    let shouldStop = false;
    const skip = () => shouldDeep = false;
    const stop = () => shouldStop = true;
    const stack = [fiber4];
    while (stack.length !== 0) {
      const unit = stack.pop();
      onWalk(unit, skip, stop);
      if (shouldStop)
        break;
      unit !== fiber4 && unit.next && stack.push(unit.next);
      shouldDeep && unit.child && stack.push(unit.child);
      shouldDeep = true;
    }
  };
  getFiberWithElement = function(fiber4) {
    let $fiber = fiber4;
    while ($fiber) {
      if ($fiber.element)
        return $fiber;
      $fiber = $fiber.parent;
    }
    return $fiber;
  };
  detectIsFiberAlive = function(fiber4) {
    let $fiber = fiber4;
    while ($fiber) {
      if ($fiber.tag === DELETE_EFFECT_TAG)
        return false;
      $fiber = $fiber.parent;
    }
    return Boolean(fiber4);
  };
  getSuspense = function(fiber4, isPending) {
    let suspense = fiber4;
    while (suspense) {
      if (suspense.hook?.getIsSuspense() && (isPending ? suspense.hook.getIsPending() : true))
        return suspense;
      suspense = suspense.parent;
    }
    return null;
  };
  resolveSuspense = function(fiber4) {
    return getSuspense(fiber4, true) || getSuspense(fiber4, false) || null;
  };
  createHookLoc = function(rootId2, idx, hook) {
    const fiber4 = hook.owner;
    let $fiber = fiber4;
    let loc = `${fiber4.idx}${HOOK_DELIMETER}${idx}`;
    while ($fiber) {
      $fiber = $fiber.parent;
      $fiber && (loc = `${$fiber.idx}.${loc}`);
    }
    loc = `[${rootId2}]${loc}`;
    return loc;
  };
  detectIsStableMemoTree = function(fiber4, $scope) {
    if (!hasChildrenProp(fiber4.inst))
      return;
    const actions = $scope.getActionsById(fiber4.id);
    const children = fiber4.inst.children;
    for (let i3 = 0;i3 < children.length; i3++) {
      const inst = children[i3];
      const key = getElementKey(inst);
      if (key === null)
        return false;
      const alt = actions.map[key];
      if (!alt)
        return false;
      const pc = alt.inst;
      const nc = inst;
      const isStable = detectIsMemo(nc) && detectIsMemo(pc) && nc.type === pc.type && !nc.shouldUpdate(pc.props, nc.props);
      if (!isStable)
        return false;
    }
    return true;
  };
  tryOptStaticSlot = function(fiber4, alt, $scope) {
    const actions = $scope.getActionsById(fiber4.id);
    const inst = fiber4.inst;
    alt.element && (fiber4.element = alt.element);
    for (let i3 = 0;i3 < inst.children.length; i3++) {
      buildChildNode(inst.children, fiber4, actions.map, i3, fiber4.eidx);
    }
    fiber4.cc = inst.children.length;
    $scope.setMountDeep(false);
  };
  tryOptMemoSlot = function(fiber4, alt, $scope) {
    const actions = $scope.getActionsById(fiber4.id);
    const hasMove = Boolean(actions.move);
    const hasRemove = Boolean(actions.remove);
    const hasInsert = Boolean(actions.insert);
    const hasReplace = Boolean(actions.replace);
    const canOptimize = (hasMove && !hasRemove || hasRemove && !hasMove) && !hasInsert && !hasReplace;
    if (!canOptimize || !detectIsStableMemoTree(fiber4, $scope))
      return;
    hasMove && tryOptMov(fiber4, alt, $scope);
    hasRemove && buildChildNodes(fiber4, alt, $scope);
  };
  tryOptMov = function(fiber4, alt, $scope) {
    const actions = $scope.getActionsById(fiber4.id);
    buildChildNodes(fiber4, alt, $scope, (fiber5, key) => {
      if (!actions.move[key])
        return;
      fiber5.alt = new Fiber().mutate(fiber5);
      fiber5.tag = UPDATE_EFFECT_TAG;
      fiber5.mask |= MOVE_MASK;
      $scope.addCandidate(fiber5);
    });
  };
  buildChildNodes = function(fiber4, alt, $scope, onNode) {
    const actions = $scope.getActionsById(fiber4.id);
    const inst = fiber4.inst;
    const children = inst.children;
    alt.element && (fiber4.element = alt.element);
    for (let i3 = 0;i3 < children.length; i3++) {
      const key = getKey(children[i3], i3);
      const $fiber = actions.map[key];
      buildChildNode(children, fiber4, actions.map, i3, fiber4.eidx);
      onNode && onNode($fiber, key);
    }
    fiber4.cc = children.length;
    $scope.setMountDeep(false);
  };
  buildChildNode = function(children, parent, altMap, idx, startEidx) {
    const prevIdx = idx - 1;
    const nextIdx = idx + 1;
    const key = getKey(children[idx], idx);
    const prevKey = getKey(children[prevIdx], prevIdx);
    const nextKey = getKey(children[nextIdx], nextIdx);
    const fiber4 = altMap[key];
    const left = altMap[prevKey];
    const right = altMap[nextKey];
    const isFirst = idx === 0;
    const isLast = idx === children.length - 1;
    isFirst && (parent.child = fiber4);
    fiber4.alt = null;
    fiber4.parent = parent;
    fiber4.tag = SKIP_EFFECT_TAG;
    fiber4.idx = idx;
    left ? fiber4.eidx = left.eidx + (left.element ? 1 : left.cec) : fiber4.eidx = startEidx;
    right && (fiber4.next = right);
    isLast && (fiber4.next = null);
    notifyParents(fiber4);
  };
  getKey = function(inst, idx) {
    const key = getElementKey(inst);
    return key !== null ? key : createIndexKey(idx);
  };
  notifyParents = function(fiber4, alt = fiber4) {
    fiber4.increment(alt.element ? 1 : alt.cec);
    alt.mask & INSERTION_EFFECT_HOST_MASK && fiber4.markHost(INSERTION_EFFECT_HOST_MASK);
    alt.mask & LAYOUT_EFFECT_HOST_MASK && fiber4.markHost(LAYOUT_EFFECT_HOST_MASK);
    alt.mask & ASYNC_EFFECT_HOST_MASK && fiber4.markHost(ASYNC_EFFECT_HOST_MASK);
    alt.mask & ATOM_HOST_MASK && fiber4.markHost(ATOM_HOST_MASK);
  };
});

// node_modules/@dark-engine/core/dist/esm/walk/index.js
var init_walk2 = __esm(() => {
  init_walk();
});

// node_modules/@dark-engine/core/dist/esm/use-memo/use-memo.js
var detectIsElement, useMemo, Memo;
var init_use_memo = __esm(() => {
  init_view2();
  init_component2();
  init_internal2();
  init_utils2();
  init_memo2();
  detectIsElement = function(value15) {
    return detectIsComponent(value15) || detectIsVirtualNodeFactory(value15);
  };
  useMemo = function(getValue, deps) {
    const cursor = useCursor();
    const { hook } = cursor;
    const { idx, values } = hook;
    const state = values[idx] || (values[idx] = {
      deps,
      value: getValue()
    });
    let value15 = null;
    let $value = null;
    if (detectIsElement(state.value)) {
      value15 = state.value;
      $value = Memo({ getValue, deps });
    } else {
      value15 = detectAreDepsDifferent(state.deps, deps) ? getValue() : state.value;
      $value = value15;
    }
    state.deps = deps;
    state.value = value15;
    hook.idx++;
    return $value;
  };
  Memo = memo(component(({ getValue }) => getValue()), (p3, n) => detectAreDepsDifferent(p3.deps, n.deps));
});

// node_modules/@dark-engine/core/dist/esm/use-memo/index.js
var init_use_memo2 = __esm(() => {
  init_use_memo();
});

// node_modules/@dark-engine/core/dist/esm/internal/internal.js
var useCursor, useSSR;
var init_internal = __esm(() => {
  init_platform2();
  init_scope2();
  useCursor = function() {
    return $$scope().getCursorFiber();
  };
  useSSR = function() {
    const isServer = detectIsServer();
    const isHydration = detectIsHydration();
    const isSSR = isServer || isHydration;
    return {
      isServer,
      isHydration,
      isSSR
    };
  };
});

// node_modules/@dark-engine/core/dist/esm/internal/index.js
var init_internal2 = __esm(() => {
  init_internal();
});

// node_modules/@dark-engine/core/dist/esm/use-effect/use-effect.js
var createEffect, $$useEffect, EffectType, useEffect, dropEffects;
var init_use_effect = __esm(() => {
  init_constants();
  init_internal2();
  init_walk2();
  init_utils2();
  init_use_memo2();
  init_scope2();
  createEffect = function(token, type47) {
    function useEffect(effect, deps = [{}]) {
      const $scope = $$scope();
      const cursor = useCursor();
      const scope6 = useMemo(() => ({ token, cleanup: undefined }), []);
      const isInsertionEffect = type47 === EffectType.INSERTION;
      const isLayoutEffect = type47 === EffectType.LAYOUT;
      const isAsyncEffect = type47 === EffectType.ASYNC;
      isInsertionEffect && cursor.markHost(INSERTION_EFFECT_HOST_MASK);
      isLayoutEffect && cursor.markHost(LAYOUT_EFFECT_HOST_MASK);
      isAsyncEffect && cursor.markHost(ASYNC_EFFECT_HOST_MASK);
      useMemo(() => {
        const runEffect = () => {
          scope6.cleanup = effect();
          if (isAsyncEffect && detectIsFunction(scope6.cleanup) && !detectIsFiberAlive(cursor)) {
            scope6.cleanup();
          }
        };
        isInsertionEffect && $scope.addInsertionEffect(runEffect);
        isLayoutEffect && $scope.addLayoutEffect(runEffect);
        isAsyncEffect && $scope.addAsyncEffect(runEffect);
        detectIsFunction(scope6.cleanup) && scope6.cleanup();
        return null;
      }, deps);
    }
    function dropEffects(hook) {
      for (const { value: effect } of hook.values) {
        effect && effect.token === token && detectIsFunction(effect.cleanup) && effect.cleanup();
      }
    }
    return {
      useEffect,
      dropEffects
    };
  };
  $$useEffect = Symbol("use-effect");
  (function(EffectType2) {
    EffectType2["ASYNC"] = "ASYNC";
    EffectType2["LAYOUT"] = "LAYOUT";
    EffectType2["INSERTION"] = "INSERTION";
  })(EffectType || (EffectType = {}));
  ({ useEffect, dropEffects } = createEffect($$useEffect, EffectType.ASYNC));
});

// node_modules/@dark-engine/core/dist/esm/use-effect/index.js
var init_use_effect2 = __esm(() => {
  init_use_effect();
});

// node_modules/@dark-engine/core/dist/esm/use-layout-effect/use-layout-effect.js
var $$useLayoutEffect, useLayoutEffect, dropLayoutEffects;
var init_use_layout_effect = __esm(() => {
  init_use_effect2();
  $$useLayoutEffect = Symbol("use-layout-effect");
  ({ useEffect: useLayoutEffect, dropEffects: dropLayoutEffects } = createEffect($$useLayoutEffect, EffectType.LAYOUT));
});

// node_modules/@dark-engine/core/dist/esm/use-layout-effect/index.js
var init_use_layout_effect2 = __esm(() => {
  init_use_layout_effect();
});

// node_modules/@dark-engine/core/dist/esm/scheduler/scheduler.js
class MessageChannel extends EventEmitter {
  port1 = null;
  port2 = null;
  constructor() {
    super();
    this.port1 = new MessagePort(this);
    this.port2 = new MessagePort(this);
  }
}

class MessagePort {
  channel;
  offs = [];
  constructor(channel) {
    this.channel = channel;
  }
  on(event, callback) {
    const off = this.channel.on(event, callback);
    this.offs.push(off);
  }
  postMessage(value15) {
    platform.spawn(() => {
      this.channel.emit("message", value15);
    });
  }
  unref() {
    this.offs.forEach((x3) => x3());
  }
}

class Scheduler {
  queue = {
    [TaskPriority.HIGH]: [],
    [TaskPriority.NORMAL]: [],
    [TaskPriority.LOW]: []
  };
  deadline = 0;
  task = null;
  scheduledCallback = null;
  isMessageLoopRunning = false;
  channel = null;
  port = null;
  constructor() {
    this.channel = new MessageChannel;
    this.port = this.channel.port2;
    this.channel.port1.on("message", this.performWorkUntilDeadline.bind(this));
  }
  reset() {
    this.deadline = 0;
    this.task = null;
    this.scheduledCallback = null;
    this.isMessageLoopRunning = false;
  }
  shouldYield() {
    return getTime() >= this.deadline;
  }
  schedule(callback, options) {
    const task = createTask(callback, options);
    this.put(task);
    this.execute();
  }
  detectIsTransition() {
    return this.task.getIsTransition();
  }
  hasPrimaryTask() {
    const { high, normal } = this.getQueues();
    const hasPrimary = high.length > 0 || normal.length > 0;
    return hasPrimary;
  }
  retain(fn) {
    const { high, normal, low } = this.getQueues();
    const priorityTasks = [...high, ...normal];
    const { hasHostUpdate, hasChildUpdate } = collectFlags(this.task, priorityTasks);
    if (hasHostUpdate || hasChildUpdate) {
      const hasExact = detectHasExact(this.task, [...priorityTasks, ...low]);
      if (hasExact) {
        this.complete(this.task);
      } else {
        this.defer(this.task);
      }
      this.task.markAsObsolete();
    } else {
      this.task.setOnRestore(fn);
      this.defer(this.task);
    }
  }
  complete(task) {
    task.complete();
  }
  put(task) {
    const queue = this.queue[task.getPriority()];
    if (task.getIsTransition()) {
      const loc = task.loc();
      const tasks = queue.filter((x3) => x3.loc() !== loc);
      queue.splice(0, queue.length, ...tasks);
    }
    queue.push(task);
  }
  pick(queue) {
    if (queue.length === 0)
      return false;
    this.task = queue.shift();
    this.run(this.task);
    return true;
  }
  run(task) {
    try {
      task.run();
      task.getForceAsync() ? this.requestCallbackAsync(workLoop) : this.requestCallback(workLoop);
    } catch (something) {
      if (detectIsPromise(something)) {
        something.finally(() => {
          this.run(task);
        });
      } else {
        throw something;
      }
    }
  }
  execute() {
    const isBusy = detectIsBusy();
    if (!isBusy && !this.isMessageLoopRunning) {
      const { high, normal, low } = this.getQueues();
      this.pick(high) || this.pick(normal) || this.pick(low);
    }
  }
  requestCallbackAsync(callback) {
    this.scheduledCallback = callback;
    if (!this.isMessageLoopRunning) {
      this.isMessageLoopRunning = true;
      this.port.postMessage(null);
    }
  }
  requestCallback(callback) {
    const something = callback(false);
    if (detectIsPromise(something)) {
      something.finally(() => {
        this.requestCallback(callback);
      });
    } else {
      this.task = null;
      this.execute();
    }
  }
  performWorkUntilDeadline() {
    if (this.scheduledCallback) {
      this.deadline = getTime() + YIELD_INTERVAL;
      const something = this.scheduledCallback(true);
      if (detectIsPromise(something)) {
        something.finally(() => {
          this.port.postMessage(null);
        });
      } else if (something) {
        this.port.postMessage(null);
      } else {
        this.complete(this.task);
        this.reset();
        this.execute();
      }
    } else {
      this.isMessageLoopRunning = false;
    }
  }
  defer(task) {
    const { low } = this.getQueues();
    low.unshift(task);
  }
  getQueues() {
    const high = this.queue[TaskPriority.HIGH];
    const normal = this.queue[TaskPriority.NORMAL];
    const low = this.queue[TaskPriority.LOW];
    return {
      high,
      normal,
      low
    };
  }
}

class Task {
  __id;
  priority;
  forceAsync = false;
  isTransition = false;
  isObsolete = false;
  callback = null;
  createLoc = null;
  onRestore = null;
  onTransitionEnd = null;
  static nextTaskId = 0;
  constructor(callback, priority, forceAsync) {
    this.__id = ++Task.nextTaskId;
    this.callback = callback;
    this.priority = priority;
    this.forceAsync = forceAsync;
  }
  getPriority() {
    return this.priority;
  }
  getForceAsync() {
    return this.forceAsync;
  }
  setIsTransition(value15) {
    this.isTransition = value15;
  }
  getIsTransition() {
    return this.isTransition;
  }
  run() {
    this.isObsolete = false;
    this.callback(this.onRestore);
    this.onRestore = null;
  }
  complete() {
    this.isTransition && !this.isObsolete && detectIsFunction(this.onTransitionEnd) && this.onTransitionEnd();
  }
  markAsObsolete() {
    this.isObsolete = true;
  }
  getIsObsolete() {
    return this.isObsolete;
  }
  setOnRestore(fn) {
    this.onRestore = fn;
  }
  setCreateLoc(fn) {
    this.createLoc = fn;
  }
  loc() {
    const [loc] = this.createLoc().split(HOOK_DELIMETER);
    return loc;
  }
  $loc() {
    return this.createLoc();
  }
  setOnTransitionEnd(fn) {
    this.onTransitionEnd = fn;
  }
}
var collectFlags, detectHasExact, createTask, rootLoc, scheduler;
var init_scheduler = __esm(() => {
  init_constants();
  init_utils2();
  init_workloop2();
  init_emitter2();
  init_platform2();
  collectFlags = function(task, tasks) {
    const loc = task.loc();
    let hasTopUpdate = false;
    let hasHostUpdate = false;
    let hasChildUpdate = false;
    for (let i3 = 0;i3 < tasks.length; i3++) {
      const task2 = tasks[i3];
      const $loc = task2.loc();
      if ($loc.length < loc.length && loc.indexOf($loc) === 0) {
        hasTopUpdate = true;
      } else if ($loc === loc) {
        hasHostUpdate = true;
      } else if ($loc.length > loc.length && $loc.indexOf(loc) === 0) {
        hasChildUpdate = true;
      }
    }
    return {
      hasTopUpdate,
      hasHostUpdate,
      hasChildUpdate
    };
  };
  detectHasExact = function(task, tasks) {
    const $loc = task.$loc();
    const hasExact = tasks.some((x3) => x3.$loc() === $loc);
    return hasExact;
  };
  createTask = function(callback, options) {
    const { priority = TaskPriority.NORMAL, forceAsync = false, isTransition = false, loc, onTransitionEnd } = options;
    const task = new Task(callback, priority, forceAsync);
    task.setIsTransition(isTransition);
    task.setOnTransitionEnd(onTransitionEnd);
    task.setCreateLoc(loc || rootLoc);
    return task;
  };
  rootLoc = () => ">";
  scheduler = new Scheduler;
});

// node_modules/@dark-engine/core/dist/esm/scheduler/index.js
var init_scheduler2 = __esm(() => {
  init_scheduler();
});

// node_modules/@dark-engine/core/dist/esm/fragment/fragment.js
var $$fragment, Fragment, detectIsFragment;
var init_fragment = __esm(() => {
  init_component2();
  $$fragment = Symbol("fragment");
  Fragment = component(({ slot }) => slot || null, { token: $$fragment, displayName: "Fragment" });
  detectIsFragment = (instance) => detectIsComponent(instance) && instance.token === $$fragment;
});

// node_modules/@dark-engine/core/dist/esm/fragment/index.js
var init_fragment2 = __esm(() => {
  init_fragment();
});

// node_modules/@dark-engine/core/dist/esm/use-callback/use-callback.js
var useCallback;
var init_use_callback = __esm(() => {
  init_use_memo2();
  useCallback = function(callback, deps) {
    const value15 = useMemo(() => callback, deps);
    return value15;
  };
});

// node_modules/@dark-engine/core/dist/esm/use-callback/index.js
var init_use_callback2 = __esm(() => {
  init_use_callback();
});

// node_modules/@dark-engine/core/dist/esm/use-state/use-state.js
var createTools, useState;
var init_use_state = __esm(() => {
  init_utils2();
  init_use_callback2();
  init_use_update2();
  init_use_memo2();
  init_scope2();
  init_utils2();
  createTools = function(options) {
    const { get, set: set2, reset, next, shouldUpdate: $shouldUpdate = trueFn } = options;
    const $scope = $$scope();
    const isBatch = $scope.getIsBatchZone();
    const tools = () => {
      const prevValue = get();
      const newValue = detectIsFunction(next) ? next(prevValue) : next;
      const shouldUpdate = () => isBatch || $shouldUpdate(prevValue, newValue);
      const setValue = () => set2(newValue);
      const resetValue = () => reset(prevValue);
      return { shouldUpdate, setValue, resetValue };
    };
    return tools;
  };
  useState = function(initialValue) {
    const update = useUpdate();
    const scope7 = useMemo(() => ({
      value: detectIsFunction(initialValue) ? initialValue() : initialValue
    }), []);
    const setState = useCallback((next) => {
      const tools = createTools({
        next,
        get: () => scope7.value,
        set: (x3) => scope7.value = x3,
        reset: (x3) => scope7.value = x3,
        shouldUpdate: (p3, n) => !detectIsEqual(p3, n)
      });
      update(tools);
    }, []);
    return [scope7.value, setState];
  };
});

// node_modules/@dark-engine/core/dist/esm/use-state/index.js
var init_use_state2 = __esm(() => {
  init_use_state();
});

// node_modules/@dark-engine/core/dist/esm/use-event/use-event.js
var useEvent;
var init_use_event = __esm(() => {
  init_use_memo2();
  init_use_callback2();
  useEvent = function(fn) {
    const scope7 = useMemo(() => ({ fn }), []);
    scope7.fn = fn;
    const callback = useCallback((...args) => {
      return scope7.fn(...args);
    }, []);
    return callback;
  };
});

// node_modules/@dark-engine/core/dist/esm/use-event/index.js
var init_use_event2 = __esm(() => {
  init_use_event();
});

// node_modules/@dark-engine/core/dist/esm/start-transition/start-transition.js
var startTransition;
var init_start_transition = __esm(() => {
  init_scope2();
  startTransition = function(callback) {
    const $scope = $$scope();
    $scope.setIsTransitionZone(true);
    callback();
    $scope.setIsTransitionZone(false);
  };
});

// node_modules/@dark-engine/core/dist/esm/start-transition/index.js
var init_start_transition2 = __esm(() => {
  init_start_transition();
});

// node_modules/@dark-engine/core/dist/esm/use-insertion-effect/use-insertion-effect.js
var $$useInsertionEffect, useInsertionEffect, dropInsertionEffects;
var init_use_insertion_effect = __esm(() => {
  init_use_effect2();
  $$useInsertionEffect = Symbol("use-insertion-effect");
  ({ useEffect: useInsertionEffect, dropEffects: dropInsertionEffects } = createEffect($$useInsertionEffect, EffectType.INSERTION));
});

// node_modules/@dark-engine/core/dist/esm/use-insertion-effect/index.js
var init_use_insertion_effect2 = __esm(() => {
  init_use_insertion_effect();
});

// node_modules/@dark-engine/core/dist/esm/unmount/unmount.js
var unmountFiber, onWalk, unmountRoot, mask;
var init_unmount = __esm(() => {
  init_use_effect2();
  init_use_insertion_effect2();
  init_use_layout_effect2();
  init_scope2();
  init_utils2();
  init_walk2();
  init_constants();
  unmountFiber = function(fiber4) {
    if (!(fiber4.mask & mask))
      return;
    walk(fiber4, onWalk);
  };
  onWalk = function(fiber4, skip) {
    const { hook } = fiber4;
    if (!(fiber4.mask & mask))
      return skip();
    if (hook?.values.length > 0) {
      const $hook = hook;
      fiber4.mask & INSERTION_EFFECT_HOST_MASK && dropInsertionEffects($hook);
      fiber4.mask & LAYOUT_EFFECT_HOST_MASK && dropLayoutEffects($hook);
      fiber4.mask & ASYNC_EFFECT_HOST_MASK && dropEffects($hook);
    }
    if (hook?.atoms) {
      for (const [_, cleanup] of hook.atoms) {
        cleanup();
      }
      hook.atoms = null;
    }
  };
  unmountRoot = function(rootId2, onCompleted) {
    if (detectIsUndefined(rootId2))
      return;
    const $scope = $$scope(rootId2);
    unmountFiber($scope.getRoot());
    $scope.unsubscribeEvents();
    removeScope(rootId2);
    onCompleted();
  };
  mask = INSERTION_EFFECT_HOST_MASK | LAYOUT_EFFECT_HOST_MASK | ASYNC_EFFECT_HOST_MASK | ATOM_HOST_MASK;
});

// node_modules/@dark-engine/core/dist/esm/unmount/index.js
var init_unmount2 = __esm(() => {
  init_unmount();
});

// node_modules/@dark-engine/core/dist/esm/batch/batch.js
var addBatch;
var init_batch = __esm(() => {
  init_scope2();
  addBatch = function(hook, callback, change) {
    const $scope = $$scope();
    if ($scope.getIsTransitionZone()) {
      callback();
    } else {
      const batch = hook.getBatch() || { timer: null, changes: [] };
      hook.setBatch(batch);
      batch.changes.push(change);
      batch.timer && clearTimeout(batch.timer);
      batch.timer = setTimeout(() => {
        batch.changes.splice(-1);
        batch.changes.forEach((x3) => x3());
        hook.setBatch(null);
        callback();
      });
    }
  };
});

// node_modules/@dark-engine/core/dist/esm/batch/index.js
var init_batch2 = __esm(() => {
  init_batch();
});

// node_modules/@dark-engine/core/dist/esm/workloop/workloop.js
var workLoop, performUnitOfWork, mountChild, mountSibling, setupInstance, share, createFiber, getAlternate, reconcile, setup, shouldUpdate, mount, extractKeys, supportConditional, commit, cleanup, sync, fork, createCallback, createUpdate, onWalkInShouldUpdate, createResetClosure, onResolve, onUnmount, onWalkInSync, createOnRestore, createLoc, $tools, detectIsBusy;
var init_workloop = __esm(() => {
  init_platform2();
  init_constants();
  init_utils2();
  init_scope2();
  init_component2();
  init_fiber2();
  init_view2();
  init_memo2();
  init_walk2();
  init_scheduler2();
  init_fragment2();
  init_start_transition2();
  init_unmount2();
  init_batch2();
  workLoop = function(isAsync) {
    const $scope = $$scope();
    const wipFiber = $scope.getWorkInProgress();
    let unit = $scope.getNextUnitOfWork();
    let shouldYield = false;
    try {
      while (unit && !shouldYield) {
        unit = performUnitOfWork(unit, $scope);
        shouldYield = isAsync && scheduler.shouldYield();
        $scope.setNextUnitOfWork(unit);
        if (shouldYield && scheduler.detectIsTransition() && scheduler.hasPrimaryTask()) {
          fork($scope);
          return false;
        }
      }
      if (!unit && wipFiber) {
        commit($scope);
      }
    } catch (err) {
      if (detectIsPromise(err)) {
        return err;
      } else {
        const emitter4 = $scope.getEmitter();
        $scope.keepRoot();
        emitter4.emit("error", String(err));
        if (!isAsync) {
          throw err;
        } else {
          logError("err", err);
        }
        return false;
      }
    }
    return Boolean(unit);
  };
  performUnitOfWork = function(fiber5, $scope) {
    const wipFiber = $scope.getWorkInProgress();
    const isDeepWalking = $scope.getMountDeep();
    const isStream = $scope.getIsStreamZone();
    const emitter4 = $scope.getEmitter();
    const children = fiber5.inst.children;
    const hasChildren = isDeepWalking && children && children.length > 0;
    fiber5.hook && (fiber5.hook.idx = 0);
    if (hasChildren) {
      const child = mountChild(fiber5, $scope);
      isStream && emitter4.emit("chunk", child);
      return child;
    } else {
      while (fiber5.parent && fiber5 !== wipFiber) {
        const next = mountSibling(fiber5, $scope);
        isStream && emitter4.emit("chunk", fiber5);
        if (next) {
          isStream && emitter4.emit("chunk", next);
          return next;
        }
        fiber5 = fiber5.parent;
      }
    }
    return null;
  };
  mountChild = function(parent, $scope) {
    $scope.navToChild();
    const $hook = parent.child ? parent.child.hook || null : null;
    const $inst = parent.inst;
    const idx = 0;
    const children = $inst.children;
    const inst = setupInstance(children, idx);
    const alt = getAlternate(parent, inst, idx, $scope);
    const fiber5 = createFiber(alt, inst, idx);
    fiber5.hook = $hook || fiber5.hook;
    fiber5.parent = parent;
    parent.child = fiber5;
    fiber5.eidx = parent.element ? 0 : parent.eidx;
    share(fiber5, parent, inst, $scope);
    return fiber5;
  };
  mountSibling = function(left, $scope) {
    $scope.navToSibling();
    const $hook = left.next ? left.next.hook || null : null;
    const $inst = left.parent.inst;
    const idx = $scope.getMountIndex();
    const children = $inst.children;
    const inst = setupInstance(children, idx);
    const hasSibling = Boolean(inst);
    if (!hasSibling) {
      $scope.navToParent();
      $scope.setMountDeep(false);
      return null;
    }
    $scope.setMountDeep(true);
    const alt = getAlternate(left, inst, idx, $scope);
    const fiber5 = createFiber(alt, inst, idx);
    fiber5.hook = $hook || fiber5.hook;
    fiber5.parent = left.parent;
    left.next = fiber5;
    fiber5.eidx = left.eidx + (left.element ? left.hook?.getIsPortal() ? 0 : 1 : left.cec);
    share(fiber5, left, inst, $scope);
    return fiber5;
  };
  setupInstance = function(children, idx) {
    let inst = null;
    if (children && idx < children.length) {
      const child = children[idx];
      children[idx] = detectIsArray(child) ? Fragment({ slot: child }) : detectIsTextBased(child) ? Text(child) : child || supportConditional(child);
      inst = children[idx];
    }
    return inst;
  };
  share = function(fiber5, prev, inst, $scope) {
    const { alt } = fiber5;
    const shouldMount = alt && detectIsMemo(inst) ? shouldUpdate(fiber5, inst, $scope) : true;
    $scope.setCursorFiber(fiber5);
    fiber5.inst = inst;
    if (alt && alt.mask & MOVE_MASK) {
      fiber5.mask |= MOVE_MASK;
      alt.mask &= ~MOVE_MASK;
    }
    fiber5.hook && (fiber5.hook.owner = fiber5);
    if (shouldMount) {
      fiber5.inst = mount(fiber5, prev, $scope);
      alt && reconcile(fiber5, alt, $scope);
      setup(fiber5, alt);
    } else if (fiber5.mask & MOVE_MASK) {
      fiber5.tag = UPDATE_EFFECT_TAG;
    }
    $scope.addCandidate(fiber5);
  };
  createFiber = function(alt, next, idx) {
    const prev = alt ? alt.inst : null;
    const fiber5 = new Fiber(idx, getHook(alt, prev, next));
    fiber5.alt = alt || null;
    return fiber5;
  };
  getAlternate = function(fiber5, inst, idx, $scope) {
    const isChild = idx === 0;
    const parent = isChild ? fiber5 : fiber5.parent;
    if (!fiber5.hook?.getIsWip() && parent.tag === CREATE_EFFECT_TAG)
      return null;
    const parentId = isChild ? fiber5.id : fiber5.parent.id;
    const key = getElementKey(inst);
    const actions = $scope.getActionsById(parentId);
    let alt = null;
    if (key !== null && actions) {
      const isMove = actions.move && Boolean(actions.move[key]);
      const isStable = actions.stable && Boolean(actions.stable[key]);
      if (isMove || isStable) {
        alt = actions.map[key];
        isMove && (alt.mask |= MOVE_MASK);
      }
    } else {
      if (fiber5.alt) {
        alt = isChild ? fiber5.alt.child : fiber5.alt.next;
      } else {
        alt = actions ? actions.map[createIndexKey(idx)] || null : null;
      }
    }
    return alt;
  };
  reconcile = function(fiber5, alt, $scope) {
    const { id, inst } = fiber5;
    const areSameTypes = detectAreSameInstanceTypes(alt.inst, inst);
    const nextChildren = inst.children;
    if (!areSameTypes) {
      $scope.addDeletion(alt);
    } else if (hasChildrenProp(alt.inst) && nextChildren && alt.cc !== 0) {
      const hasSameCount = alt.cc === nextChildren.length;
      const check11 = hasElementFlag(inst, Flag.SKIP_SCAN_OPT) ? !hasSameCount : true;
      if (check11) {
        const { prevKeys, nextKeys, prevKeysMap, nextKeysMap, keyedFibersMap } = extractKeys(alt.child, nextChildren);
        const flush = nextKeys.length === 0;
        let size = Math.max(prevKeys.length, nextKeys.length);
        let p3 = 0;
        let n = 0;
        $scope.addActionMap(id, keyedFibersMap);
        for (let i3 = 0;i3 < size; i3++) {
          const nextKey = nextKeys[i3 - n] ?? null;
          const prevKey = prevKeys[i3 - p3] ?? null;
          const prevKeyFiber = keyedFibersMap[prevKey] || null;
          if (nextKey !== prevKey) {
            if (nextKey !== null && !prevKeysMap[nextKey]) {
              if (prevKey !== null && !nextKeysMap[prevKey]) {
                $scope.addReplaceAction(id, nextKey);
                $scope.addDeletion(prevKeyFiber);
              } else {
                $scope.addInsertAction(id, nextKey);
                p3++;
                size++;
              }
            } else if (!nextKeysMap[prevKey]) {
              $scope.addRemoveAction(id, prevKey);
              $scope.addDeletion(prevKeyFiber);
              flush && (prevKeyFiber.mask |= FLUSH_MASK);
              n++;
              size++;
            } else if (nextKeysMap[prevKey] && nextKeysMap[nextKey]) {
              $scope.addMoveAction(id, nextKey);
            }
          } else if (nextKey !== null) {
            $scope.addStableAction(id, nextKey);
          }
        }
        hasElementFlag(inst, Flag.STATIC_SLOT_OPT) && tryOptStaticSlot(fiber5, alt, $scope);
        hasElementFlag(inst, Flag.MEMO_SLOT_OPT) && tryOptMemoSlot(fiber5, alt, $scope);
      }
    }
  };
  setup = function(fiber5, alt) {
    const inst = fiber5.inst;
    let isUpdate = false;
    fiber5.parent.tag === CREATE_EFFECT_TAG && (fiber5.tag = fiber5.parent.tag);
    isUpdate = alt && fiber5.tag !== CREATE_EFFECT_TAG && detectAreSameInstanceTypes(alt.inst, inst) && getElementKey(alt.inst) === getElementKey(inst);
    fiber5.tag = isUpdate ? UPDATE_EFFECT_TAG : CREATE_EFFECT_TAG;
    if (!fiber5.element) {
      if (isUpdate && alt.element) {
        fiber5.element = alt.element;
      } else if (detectIsVirtualNode(fiber5.inst)) {
        fiber5.element = platform.createElement(fiber5.inst);
      }
    }
    fiber5.element && !fiber5.hook?.getIsPortal() && fiber5.increment();
  };
  shouldUpdate = function(fiber5, inst, $scope) {
    if (true) {
      if ($scope.getIsHot())
        return true;
    }
    const alt = fiber5.alt;
    const pc = alt.inst;
    const nc = inst;
    if (nc.type !== pc.type || nc.shouldUpdate(pc.props, nc.props))
      return true;
    $scope.setMountDeep(false);
    fiber5.tag = SKIP_EFFECT_TAG;
    fiber5.child = alt.child;
    fiber5.child.parent = fiber5;
    fiber5.hook = alt.hook;
    fiber5.cc = alt.cc;
    fiber5.cec = alt.cec;
    alt.element && (fiber5.element = alt.element);
    const diff = fiber5.eidx - alt.eidx;
    const deep = diff !== 0;
    deep && walk(fiber5.child, onWalkInShouldUpdate(diff));
    notifyParents(fiber5, alt);
    return false;
  };
  mount = function(fiber5, prev, $scope) {
    let inst = fiber5.inst;
    const isComponent = detectIsComponent(inst);
    const component9 = inst;
    if (isComponent) {
      try {
        let result = component9.type(component9.props);
        if (detectIsArray(result)) {
          !detectIsFragment(component9) && (result = Fragment({ slot: result }));
        } else if (detectIsTextBased(result)) {
          result = Text(result);
        }
        component9.children = result;
      } catch (err) {
        if (detectIsPromise(err)) {
          const promise5 = err;
          const isSSR = detectIsSSR();
          const reset = createResetClosure(fiber5, prev, $scope);
          if (!isSSR) {
            const suspense = resolveSuspense(fiber5);
            if (suspense) {
              suspense.hook.setIsPeinding(true);
              $scope.getAwaiter().add(suspense.hook, promise5);
            } else {
              reset();
              throw err;
            }
          } else {
            reset();
            throw err;
          }
        } else {
          component9.children = [];
          fiber5.setError(err);
        }
      }
    } else if (detectIsVirtualNodeFactory(inst)) {
      inst = inst();
    }
    if (hasChildrenProp(inst)) {
      inst.children = detectIsArray(inst.children) ? inst.children : [inst.children];
      isComponent && component9.children.length === 0 && component9.children.push(createReplacer());
      fiber5.cc = inst.children.length;
    }
    return inst;
  };
  extractKeys = function(alt, children) {
    let nextFiber = alt;
    let idx = 0;
    const prevKeys = [];
    const nextKeys = [];
    const prevKeysMap = {};
    const nextKeysMap = {};
    const keyedFibersMap = {};
    const usedKeysMap = {};
    while (nextFiber || idx < children.length) {
      if (nextFiber) {
        const key = getElementKey(nextFiber.inst);
        const prevKey = detectIsEmpty(key) ? createIndexKey(idx) : key;
        if (!prevKeysMap[prevKey]) {
          prevKeysMap[prevKey] = true;
          prevKeys.push(prevKey);
        }
        keyedFibersMap[prevKey] = nextFiber;
      }
      if (idx < children.length) {
        const inst = children[idx];
        const key = getElementKey(inst);
        const nextKey = detectIsEmpty(key) ? createIndexKey(idx) : key;
        if (true) {
          if (usedKeysMap[nextKey]) {
            logError(formatErrorMsg(`The key of node [${nextKey}] already has been used!`), [inst]);
          }
        }
        if (!nextKeysMap[nextKey]) {
          nextKeysMap[nextKey] = true;
          nextKeys.push(nextKey);
        }
        usedKeysMap[nextKey] = true;
      }
      nextFiber = nextFiber ? nextFiber.next : null;
      idx++;
    }
    return {
      prevKeys,
      nextKeys,
      prevKeysMap,
      nextKeysMap,
      keyedFibersMap
    };
  };
  supportConditional = function(inst) {
    return detectIsFalsy(inst) ? createReplacer() : inst;
  };
  commit = function($scope) {
    if (true) {
      $scope.setIsHot(false);
    }
    const rootId2 = getRootId();
    const wip = $scope.getWorkInProgress();
    const deletions = $scope.getDeletions();
    const candidates = $scope.getCandidates();
    const isUpdateZone = $scope.getIsUpdateZone();
    const awaiter = $scope.getAwaiter();
    const unmounts = [];
    const isTransition = scheduler.detectIsTransition();
    const inst = wip.inst;
    const mask2 = INSERTION_EFFECT_HOST_MASK | LAYOUT_EFFECT_HOST_MASK | ASYNC_EFFECT_HOST_MASK;
    for (const fiber5 of deletions) {
      const canAsync = fiber5.mask & ATOM_HOST_MASK && !(fiber5.mask & mask2);
      canAsync ? unmounts.push(fiber5) : unmountFiber(fiber5);
      fiber5.tag = DELETE_EFFECT_TAG;
      platform.commit(fiber5);
    }
    isUpdateZone && sync(wip);
    $scope.runInsertionEffects();
    for (const fiber5 of candidates) {
      const item = fiber5.inst;
      fiber5.tag !== SKIP_EFFECT_TAG && platform.commit(fiber5);
      fiber5.alt = null;
      item.children && (item.children = null);
    }
    wip.alt = null;
    wip.hook?.setIsWip(false);
    inst.children = null;
    platform.finishCommit();
    $scope.runLayoutEffects();
    $scope.runAsyncEffects();
    awaiter.resolve(onResolve(rootId2, isTransition));
    unmounts.length > 0 && platform.raf(onUnmount(unmounts));
    cleanup($scope);
  };
  cleanup = function($scope, fromFork = false) {
    $scope.cleanup();
    !fromFork && $scope.getEmitter().emit("finish");
    $scope.runAfterCommit();
  };
  sync = function(fiber5) {
    const diff = fiber5.cec - fiber5.alt.cec;
    if (diff === 0)
      return;
    const parent = getFiberWithElement(fiber5.parent);
    const scope11 = { isRight: false };
    fiber5.hook.setIsWip(false);
    fiber5.increment(diff);
    walk(parent.child, onWalkInSync(diff, fiber5, scope11));
  };
  fork = function($scope) {
    const $fork = $scope.fork();
    const wip = $scope.getWorkInProgress();
    const onRestore = createOnRestore($fork, wip.child);
    const { alt } = wip;
    wip.child = alt.child;
    wip.cc = alt.cc;
    wip.cec = alt.cec;
    wip.hook?.setIsWip(false);
    wip.alt = null;
    wip.hook.idx = 0;
    wip.hook.owner = wip;
    $scope.runInsertionEffects();
    $scope.applyCancels();
    cleanup($scope, true);
    scheduler.retain(onRestore);
  };
  createCallback = function(options) {
    const { rootId: rootId2, hook, isTransition, tools = $tools } = options;
    const callback = (onRestore) => {
      setRootId(rootId2);
      const isRetain = detectIsFunction(onRestore);
      const { shouldUpdate: shouldUpdate2, setValue, resetValue } = tools();
      const $scope = $$scope();
      const owner = hook.owner;
      const fiber5 = owner.alt || owner;
      const isBroken = !fiber5.tag;
      if (isBroken || !shouldUpdate2() || !detectIsFiberAlive(fiber5) || isRetain) {
        isRetain && onRestore({ fiber: fiber5, setValue, resetValue });
        return;
      }
      detectIsFunction(setValue) && setValue();
      detectIsFunction(resetValue) && isTransition && $scope.addCancel(resetValue);
      fiber5.alt = null;
      fiber5.alt = new Fiber().mutate(fiber5);
      fiber5.tag = UPDATE_EFFECT_TAG;
      fiber5.cc = 0;
      fiber5.cec = 0;
      fiber5.child = null;
      fiber5.hook.setIsWip(true);
      hook.idx = 0;
      hook.owner = fiber5;
      $scope.setIsUpdateZone(true);
      $scope.resetMount();
      $scope.setWorkInProgress(fiber5);
      $scope.setCursorFiber(fiber5);
      fiber5.inst = mount(fiber5, null, $scope);
      $scope.setNextUnitOfWork(fiber5);
    };
    return callback;
  };
  createUpdate = function(rootId2, hook) {
    const { idx } = hook;
    const update = (tools) => {
      const $scope = $$scope();
      if ($scope.getIsInsertionEffectsZone())
        return;
      const hasTools = detectIsFunction(tools);
      const isTransition = $scope.getIsTransitionZone();
      const isBatch = $scope.getIsBatchZone();
      const isEvent = $scope.getIsEventZone();
      const priority = isTransition ? TaskPriority.LOW : isEvent ? TaskPriority.HIGH : TaskPriority.NORMAL;
      const forceAsync = isTransition;
      const onTransitionEnd = isTransition ? $scope.getOnTransitionEnd() : null;
      const callback = createCallback({
        rootId: rootId2,
        hook,
        isTransition,
        tools: hasTools ? tools : undefined
      });
      const loc = createLoc(rootId2, idx, hook);
      const options = {
        priority,
        forceAsync,
        isTransition,
        loc,
        onTransitionEnd
      };
      if (isBatch) {
        addBatch(hook, () => scheduler.schedule(callback, options), () => hasTools && tools().setValue());
      } else {
        scheduler.schedule(callback, options);
      }
    };
    return update;
  };
  onWalkInShouldUpdate = (diff) => ($fiber, skip) => {
    $fiber.eidx += diff;
    if ($fiber.element)
      return skip();
  };
  createResetClosure = (fiber5, prev, $scope) => () => {
    if (prev) {
      fiber5.hook.owner = null;
      fiber5.hook.idx = 0;
      $scope.navToPrev();
      $scope.setNextUnitOfWork(prev);
      Fiber.setNextId(prev.id);
    } else {
      fiber5.id = Fiber.incrementId();
      fiber5.cec = fiber5.alt.cec;
    }
  };
  onResolve = (rootId2, isTransition) => (hook) => {
    const update = createUpdate(rootId2, hook);
    isTransition ? startTransition(update) : update();
  };
  onUnmount = (fibers) => () => fibers.forEach(unmountFiber);
  onWalkInSync = (diff, fiber5, scope11) => ($fiber, skip) => {
    if ($fiber === fiber5) {
      scope11.isRight = true;
      return skip();
    }
    $fiber.element && skip();
    scope11.isRight && ($fiber.eidx += diff);
  };
  createOnRestore = ($fork, child) => (options) => {
    const { fiber: wip, setValue, resetValue } = options;
    const $scope = $$scope();
    detectIsFunction(setValue) && setValue();
    detectIsFunction(resetValue) && $fork.addCancel(resetValue);
    wip.alt = new Fiber().mutate(wip);
    wip.tag = UPDATE_EFFECT_TAG;
    wip.child = child;
    wip.hook?.setIsWip(true);
    child.parent = wip;
    $fork.setRoot($scope.getRoot());
    $fork.setWorkInProgress(wip);
    replaceScope($fork);
  };
  createLoc = (rootId2, idx, hook) => () => createHookLoc(rootId2, idx, hook);
  $tools = () => ({
    shouldUpdate: trueFn,
    setValue: null,
    resetValue: null
  });
  detectIsBusy = () => Boolean($$scope()?.getWorkInProgress());
});

// node_modules/@dark-engine/core/dist/esm/workloop/index.js
var init_workloop2 = __esm(() => {
  init_workloop();
});

// node_modules/@dark-engine/core/dist/esm/use-update/use-update.js
var useUpdate;
var init_use_update = __esm(() => {
  init_internal2();
  init_workloop2();
  init_scope2();
  useUpdate = function() {
    const rootId2 = getRootId();
    const cursor = useCursor();
    return createUpdate(rootId2, cursor.hook);
  };
});

// node_modules/@dark-engine/core/dist/esm/use-update/index.js
var init_use_update2 = __esm(() => {
  init_use_update();
});

// node_modules/@dark-engine/core/dist/esm/context/context.js
var createContext, useContext, getProvider;
var init_context = __esm(() => {
  init_component2();
  init_use_layout_effect2();
  init_internal2();
  init_emitter2();
  init_use_update2();
  init_utils2();
  init_use_memo2();
  createContext = function(defaultValue, options) {
    const { displayName = "Component" } = options || {};
    const context = component(({ value: value15 = defaultValue, slot }) => {
      const cursor = useCursor();
      const { hook } = cursor;
      let providers = hook.getProviders();
      if (!providers) {
        providers = new Map;
        providers.set(context, { value: value15, emitter: new EventEmitter });
        hook.setProviders(providers);
      }
      const provider = providers.get(context);
      useLayoutEffect(() => {
        provider.emitter.emit("publish", value15);
      }, [value15]);
      provider.value = value15;
      return slot;
    }, { displayName: `Context(${displayName})` });
    context.defaultValue = defaultValue;
    Object.freeze(context);
    return context;
  };
  useContext = function(context) {
    const { defaultValue } = context;
    const cursor = useCursor();
    const scope12 = useMemo(() => ({ value: null, provider: getProvider(context, cursor) }), []);
    const update = useUpdate();
    const { provider } = scope12;
    const value15 = provider ? provider.value : defaultValue;
    useLayoutEffect(() => {
      if (!provider)
        return;
      return provider.emitter.on("publish", (value16) => {
        !detectIsEqual(scope12.value, value16) && update();
      });
    }, []);
    scope12.value = value15;
    return value15;
  };
  getProvider = function(context, fiber5) {
    let $fiber = fiber5;
    while ($fiber) {
      const providers = $fiber.hook?.getProviders();
      if (providers?.has(context))
        return providers.get(context);
      $fiber = $fiber.parent;
    }
    return null;
  };
});

// node_modules/@dark-engine/core/dist/esm/context/index.js
var init_context2 = __esm(() => {
  init_context();
});

// node_modules/@dark-engine/core/dist/esm/atom/atom.js
class Atom {
  value;
  connections1;
  connections2;
  subjects;
  emitter;
  constructor(value15) {
    this.value = value15;
  }
  val(fn, key) {
    try {
      this.__connect(fn, key);
    } catch (err) {
      if (true) {
        logError(formatErrorMsg(`Illegal invocation atom.val() outside render process!`));
      }
    }
    return this.value;
  }
  get() {
    return this.value;
  }
  on(fn) {
    !this.emitter && (this.emitter = new EventEmitter);
    return this.emitter.on("data", fn);
  }
  kill() {
    if (this.connections1) {
      for (const [hook, [_, __, ___, key]] of this.connections1) {
        this.off(hook, key);
      }
    }
    if (this.connections2) {
      for (const [key, [_, hook]] of this.connections2) {
        this.off(hook, key);
      }
    }
    this.connections1 = null;
    this.connections2 = null;
    this.emitter = null;
    this.subjects = null;
  }
  toString() {
    return String(this.value);
  }
  toJSON() {
    return this.value;
  }
  valueOf() {
    return this.value;
  }
  __connect(fn, key) {
    const rootId2 = getRootId();
    const fiber5 = $$scope().getCursorFiber();
    const { hook } = fiber5;
    const disconnect = () => this.off(hook, key);
    !hook.atoms && (hook.atoms = new Map);
    hook.atoms.set(this, disconnect);
    fiber5.markHost(ATOM_HOST_MASK);
    if (detectIsEmpty(key)) {
      !this.connections1 && (this.connections1 = new Map);
      this.connections1.set(hook, [rootId2, hook, fn, key]);
    } else {
      !this.connections2 && (this.connections2 = new Map);
      this.connections2.set(key, [rootId2, hook, fn, key]);
    }
    return disconnect;
  }
  __addSubject(atom$) {
    !this.subjects && (this.subjects = new Set);
    this.subjects.add(atom$);
  }
  __removeSubject(atom$) {
    return this.subjects && this.subjects.delete(atom$);
  }
  __getSize() {
    const size1 = this.connections1 ? this.connections1.size : 0;
    const size2 = this.connections2 ? this.connections2.size : 0;
    const size3 = this.subjects ? this.subjects.size : 0;
    const size4 = this.emitter ? this.emitter.__getSize() : 0;
    return size1 + size2 + size3 + size4;
  }
  setValue(value15) {
    const prev = this.value;
    const next = detectIsFunction(value15) ? value15(this.value) : value15;
    const data = { prev, next };
    const make = (tuple8, prev2, next2) => {
      const [rootId2, hook, shouldUpdate2, key] = tuple8;
      const fn = shouldUpdate2 || trueFn;
      if (fn(prev2, next2, key)) {
        const update = createUpdate(rootId2, hook);
        if (this.__getSize() === 1) {
          const tools = createTools({
            next: next2,
            get: () => prev2,
            set: () => this.value = next2,
            reset: () => this.value = prev2
          });
          update(tools);
        } else {
          update();
        }
      }
    };
    this.value = next;
    if (this.connections1) {
      for (const [_, tuple8] of this.connections1) {
        make(tuple8, prev, next);
      }
    }
    if (this.connections2) {
      if (this.connections2.has(next)) {
        make(this.connections2.get(next), prev, next);
        this.connections2.has(prev) && make(this.connections2.get(prev), prev, next);
      }
    }
    this.emitter && this.emitter.emit("data", data);
    this.subjects && this.subjects.forEach((x3) => x3.__notify());
  }
  off(hook, key) {
    hook.atoms.delete(this);
    this.connections1 && this.connections1.delete(hook);
    this.connections2 && this.connections2.delete(key);
  }
}

class WritableAtom extends Atom {
  set(value15) {
    super.setValue(value15);
  }
}
var atom;
var init_atom = __esm(() => {
  init_utils2();
  init_use_update2();
  init_constants();
  init_scope2();
  init_use_state2();
  init_emitter2();
  atom = (value15) => new WritableAtom(value15);
});

// node_modules/@dark-engine/core/dist/esm/atom/index.js
var init_atom2 = __esm(() => {
  init_atom();
});

// node_modules/@dark-engine/core/dist/esm/lazy/lazy.js
var lazy, run, check11, $$lazy, factories;
var init_lazy = __esm(() => {
  init_utils2();
  init_component2();
  init_use_memo2();
  lazy = function(loader, done) {
    return component((props) => {
      const scope13 = useMemo(() => ({ isDirty: false }), []);
      const factory = factories.get(loader);
      if (detectIsUndefined(factory) && !scope13.isDirty) {
        const make = async () => {
          factories.set(loader, await run(loader));
          detectIsFunction(done) && done();
        };
        scope13.isDirty = true;
        throwThis(make());
      }
      return factory ? factory(props) : null;
    }, { token: $$lazy, displayName: "Lazy" });
  };
  run = function(loader) {
    return new Promise((resolve, reject) => {
      loader().then((module) => {
        check11(module);
        resolve(module.default);
      }).catch(reject);
    });
  };
  check11 = function(module) {
    if (true) {
      if (!module.default) {
        illegal("The lazy loaded component should be exported as default!");
      }
    }
  };
  $$lazy = Symbol("lazy");
  factories = new Map;
});

// node_modules/@dark-engine/core/dist/esm/lazy/index.js
var init_lazy2 = __esm(() => {
  init_lazy();
});

// node_modules/@dark-engine/core/dist/esm/ref/ref.js
var detectIsMutableRef, applyRef, useRef;
var init_ref = __esm(() => {
  init_utils2();
  init_use_memo2();
  detectIsMutableRef = function(ref4) {
    if (!detectIsObject(ref4) || detectIsNull(ref4))
      return false;
    const mutableRef = ref4;
    for (const key in mutableRef) {
      if (key === "current" && mutableRef.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  };
  applyRef = function(ref4, current) {
    if (detectIsFunction(ref4)) {
      ref4(current);
    } else if (detectIsMutableRef(ref4)) {
      ref4.current = current;
    }
  };
  useRef = function(initialValue = null) {
    const ref4 = useMemo(() => ({ current: initialValue }), []);
    return ref4;
  };
});

// node_modules/@dark-engine/core/dist/esm/ref/index.js
var init_ref2 = __esm(() => {
  init_ref();
});

// node_modules/@dark-engine/core/dist/esm/shared/types.js
var init_types = __esm(() => {
});

// node_modules/@dark-engine/core/dist/esm/shared/index.js
var init_shared = __esm(() => {
  init_types();
});

// node_modules/@dark-engine/core/dist/esm/use-imperative-handle/use-imperative-handle.js
var useImperativeHandle;
var init_use_imperative_handle = __esm(() => {
  init_use_memo2();
  init_ref2();
  useImperativeHandle = function(ref6, createHandle, deps) {
    const current = useMemo(() => createHandle(), deps || [{}]);
    ref6 && applyRef(ref6, current);
  };
});

// node_modules/@dark-engine/core/dist/esm/use-imperative-handle/index.js
var init_use_imperative_handle2 = __esm(() => {
  init_use_imperative_handle();
});

// node_modules/@dark-engine/core/dist/esm/use-id/use-id.js
var useId, nextId, getNextId;
var init_use_id = __esm(() => {
  init_use_memo2();
  init_scope2();
  useId = function() {
    const id = useMemo(() => getNextId(getRootId()), []);
    return id;
  };
  nextId = 1e6;
  getNextId = (rootId2) => `dark:${rootId2}:${(++nextId).toString(36)}`;
});

// node_modules/@dark-engine/core/dist/esm/use-id/index.js
var init_use_id2 = __esm(() => {
  init_use_id();
});

// node_modules/@dark-engine/core/dist/esm/index.js
var init_esm = __esm(() => {
  init_component2();
  init_view2();
  init_context2();
  init_fiber2();
  init_workloop2();
  init_atom2();
  init_platform2();
  init_utils2();
  init_lazy2();
  init_ref2();
  init_scope2();
  init_shared();
  init_scheduler2();
  init_use_callback2();
  init_use_effect2();
  init_use_layout_effect2();
  init_use_insertion_effect2();
  init_use_event2();
  init_use_imperative_handle2();
  init_use_memo2();
  init_use_state2();
  init_use_id2();
  init_internal2();
  init_walk2();
  init_unmount2();
  init_emitter2();
  init_start_transition2();
  init_constants();
});

// node_modules/@dark-engine/styled/dist/esm/constants.js
var LIB4, STYLE_TAG, STYLED_ATTR, GLOBAL_ATTR_VALUE, COMPONENTS_ATTR_VALUE, INTERLEAVE_GLOBAL_ATTR_VALUE, INTERLEAVE_COMPONENTS_ATTR_VALUE, CLASS_NAME_PREFIX, OPENING_CURLY_BRACE_MARK, CLOSING_CURLY_BRACE_MARK, OPENING_PARENTHESIS_MARK, CLOSING_PARENTHESIS_MARK, COLON_MARK, SEMICOLON_MARK, COMMA_MARK, DOT_MARK, BLANK_SPACE, MEDIA_QUERY_MARK, CONTAINER_QUERY_MARK, KEYFRAMES_MARK, NESTING_MARK, SELF_MARK, FUNCTION_MARK, SINGLE_LINE_COMMENT_START_MARK, SINGLE_LINE_COMMENT_END_MARK, MULTI_LINE_COMMENT_START_MARK, MULTI_LINE_COMMENT_END_MARK, URL_FN_MARK, NULL_MARK;
var init_constants2 = __esm(() => {
  LIB4 = "@dark-engine/styled";
  STYLE_TAG = "style";
  STYLED_ATTR = "dark-styled";
  GLOBAL_ATTR_VALUE = "g";
  COMPONENTS_ATTR_VALUE = "c";
  INTERLEAVE_GLOBAL_ATTR_VALUE = "ig";
  INTERLEAVE_COMPONENTS_ATTR_VALUE = "ic";
  CLASS_NAME_PREFIX = "dk";
  OPENING_CURLY_BRACE_MARK = "{";
  CLOSING_CURLY_BRACE_MARK = "}";
  OPENING_PARENTHESIS_MARK = "(";
  CLOSING_PARENTHESIS_MARK = ")";
  COLON_MARK = ":";
  SEMICOLON_MARK = ";";
  COMMA_MARK = ",";
  DOT_MARK = ".";
  BLANK_SPACE = " ";
  MEDIA_QUERY_MARK = "@media";
  CONTAINER_QUERY_MARK = "@container";
  KEYFRAMES_MARK = "@keyframes";
  NESTING_MARK = ">";
  SELF_MARK = "&";
  FUNCTION_MARK = "[$]";
  SINGLE_LINE_COMMENT_START_MARK = "//";
  SINGLE_LINE_COMMENT_END_MARK = "\n";
  MULTI_LINE_COMMENT_START_MARK = "/*";
  MULTI_LINE_COMMENT_END_MARK = "*/";
  URL_FN_MARK = "url";
  NULL_MARK = "null";
});

// node_modules/@dark-engine/styled/dist/esm/server/manager.js
class Manager {
  styles = createStyles();
  resets = new Set;
  collectGlobalStyle(css) {
    this.styles[STYLE_LEVEL.GLOBAL].add(css);
  }
  collectComponentStyle(css) {
    this.styles[STYLE_LEVEL.COMPONENT].add(css);
  }
  getStyles() {
    return this.styles;
  }
  reset(fn) {
    this.resets.add(fn);
  }
  seal() {
    this.styles = createStyles();
    this.resets.forEach((x3) => x3());
    this.resets = new Set;
  }
}
var useManager, STYLE_LEVEL, createStyles, ManagerContext, ManagerProvider;
var init_manager = __esm(() => {
  init_esm();
  useManager = function() {
    return useContext(ManagerContext);
  };
  (function(STYLE_LEVEL2) {
    STYLE_LEVEL2[STYLE_LEVEL2["GLOBAL"] = 0] = "GLOBAL";
    STYLE_LEVEL2[STYLE_LEVEL2["COMPONENT"] = 1] = "COMPONENT";
  })(STYLE_LEVEL || (STYLE_LEVEL = {}));
  createStyles = () => ({
    [STYLE_LEVEL.GLOBAL]: new Set,
    [STYLE_LEVEL.COMPONENT]: new Set
  });
  ManagerContext = createContext(null, { displayName: "Manager" });
  ManagerProvider = component(({ manager, slot }) => {
    return ManagerContext({ value: manager, slot });
  });
});

// node_modules/@wareme/event-emitter/dist/index.js
class G {
  fn;
  once;
  constructor(p3, b) {
    if (this.fn = p3, b === true)
      this.once = true;
    else
      this.once = false;
  }
}

class J {
  static onceTimeoutErrorCreator = () => {
    const p3 = new Error("Once listener timed out.");
    return p3.name = "Timeout", p3;
  };
  internalListeners;
  off(p3) {
    const b = this.internalListeners;
    if (detectIsUndefined(b))
      return;
    if (detectIsUndefined(p3)) {
      this.internalListeners = undefined;
      return;
    }
    if (b.fn && b.fn === p3) {
      this.internalListeners = undefined;
      return;
    }
    const q = [];
    for (let h3 = 0, x3 = b.length;h3 < x3; h3++)
      if (b[h3].fn !== p3)
        q.push(b[h3]);
    this.internalListeners = q;
  }
  listenerCount() {
    if (detectIsUndefined(this.internalListeners))
      return 0;
    if (this.internalListeners.fn)
      return 1;
    return this.internalListeners.length;
  }
  on(p3) {
    H(this, new G(p3));
  }
  once(p3) {
    if (detectIsFunction(p3)) {
      H(this, new G(p3, true));
      return;
    }
    if (p3)
      return new Promise((b, q) => {
        let h3;
        const x3 = setTimeout(() => {
          O(this, h3), q(J.onceTimeoutErrorCreator());
        }, p3);
        H(this, h3 = new G(function() {
          clearTimeout(x3), b(arguments);
        }, true));
      });
    else
      return new Promise((b) => H(this, new G(b, true)));
  }
  emit(p3, b, q) {
    const h3 = this.internalListeners, x3 = arguments.length;
    if (detectIsUndefined(h3))
      return;
    if (h3.fn) {
      if (h3.once)
        this.internalListeners = undefined;
      if (x3 === 0)
        return h3.fn();
      else if (x3 === 1)
        return h3.fn(p3);
      else if (x3 === 2)
        return h3.fn(p3, b);
      else if (x3 === 3)
        return h3.fn(p3, b, q);
      else
        h3.fn.apply(null, Array.from(arguments));
    } else {
      let K, z;
      for (let C = 0, D = h3.length;C < D; C++) {
        if (z = h3[C], z.once === true) {
          if (h3.splice(C, 1), C--, h3.length === 0)
            this.internalListeners = undefined;
        }
        if (D === 0)
          z.fn();
        else if (D === 1)
          z.fn(p3);
        else if (D === 2)
          z.fn(p3, b);
        else if (D === 3)
          z.fn(p3, b, q);
        else
          z.fn.apply(null, K || (K = Array.from(arguments)));
      }
    }
  }
}
var H, O;
var init_dist = __esm(() => {
  init_esm();
  H = function(p3, b) {
    if (detectIsUndefined(p3.internalListeners))
      p3.internalListeners = b;
    else if (detectIsArray(p3.internalListeners))
      p3.internalListeners.push(b);
    else
      p3.internalListeners = [p3.internalListeners, b];
  };
  O = function(p3, b) {
    const q = p3.internalListeners;
    if (detectIsUndefined(q))
      return;
    if (q.fn && q === b)
      p3.internalListeners = undefined;
    if (detectIsArray(q)) {
      for (let h3 = 0, x3 = q.length;h3 < x3; h3++)
        if (q[h3] === b) {
          q.splice(h3, 1);
          break;
        }
      if (q.length === 0)
        b.internalListeners = undefined;
    }
  };
});

// node_modules/@dark-engine/core/dist/esm/jsx-runtime.js
var jsx;
var init_jsx_runtime = __esm(() => {
  init_utils2();
  init_view2();
  init_constants();
  init_fragment2();
  jsx = function(element, props, key) {
    const { children, slot: $slot, ...$props } = props;
    const content = !detectIsUndefined(children) ? children : !detectIsUndefined($slot) ? $slot : [];
    const slot = detectIsArray(content) ? content : [content];
    if (key || !detectIsEmpty(key)) {
      $props[KEY_ATTR] = key;
    }
    if (detectIsString(element)) {
      const options = $props || {};
      options.as = element;
      options.slot = slot;
      return View(options);
    }
    if (detectIsFunction(element)) {
      const options = $props || {};
      options.slot = slot.length === 1 ? slot[0] : slot;
      return element(options);
    }
    return null;
  };
});

// node_modules/@wareme/translations/dist/index.js
class L3 {
  input;
  index = 0;
  done = false;
  value = "";
  constructor(q) {
    this.input = q, this.value = this.input.charAt(0);
  }
  next() {
    if (++this.index >= this.input.length)
      this.done = true;
    return this.value = this.input.charAt(this.index);
  }
  croak() {
    throw new Error(`[${this.input}]. Unexpected character "${this.value}" on position ${this.index}.`);
  }
}

class M {
  input;
  constructor(q) {
    this.input = new L3(q);
  }
  #q(q) {
    if (q !== this.input.value)
      this.input.croak();
    this.input.next();
  }
  #H(q) {
    let H3 = "";
    while (!this.input.done && q(this.input.value))
      H3 += this.input.value, this.input.next();
    return H3;
  }
  #K() {
    const q = this.#H((H3) => H3 !== j).trim();
    if (q === x3)
      return "Plural";
    if (q === I)
      return "Select";
    this.input.croak();
  }
  #Q() {
    this.#q(j);
    const q = {};
    while (this.input.value !== Y)
      q[this.#J().value.trim()] = this.#X();
    return this.#q(Y), q;
  }
  #X() {
    const q = [];
    this.#q(_);
    while (this.input.value !== Y)
      q.push(this.next());
    return this.#q(Y), q;
  }
  #Z() {
    this.#q(_);
    const q = this.#H((J3) => !y3(J3)).trim();
    if (q.length === 0)
      this.input.croak();
    if (this.input.value === Y)
      return this.#q(Y), { type: "Variable", value: q };
    this.#q(j);
    const H3 = this.#K();
    return { options: this.#Q(), type: H3, value: q };
  }
  #J() {
    return { type: "Text", value: this.#H((q) => q !== _ && q !== Y) };
  }
  next() {
    if (this.input.value === _)
      return this.#Z();
    return this.#J();
  }
}

class B extends Error {
  id;
  language;
  constructor(q, H3) {
    super(formatErrorMsg(`Translation failed. id: ${q} language: ${H3}`, v3));
    this.id = q, this.language = H3;
  }
}

class b {
  onError = console.error;
  localeData;
  currentLanguage;
  currentMessages;
  languageChangeEvents;
  constructor(q, H3, J3) {
    if (this.currentLanguage = q, detectIsEmpty(H3))
      S("`messages` must be provided when creating a new Translator instance");
    if (!detectIsEmpty(J3))
      this.onError = J3;
    this.languageChangeEvents = new J, this.localeData = [{ language: q, messages: H3 }], this.currentMessages = H3;
  }
  changeLanguage = (q, H3) => {
    if (this.currentLanguage === q)
      return;
    if (this.currentLanguage = q, detectIsEmpty(H3)) {
      let J3 = false;
      for (let K = 0, Q = this.localeData.length;K < Q; K++)
        if (this.localeData[K].language === q)
          this.currentMessages = this.localeData[K].messages, J3 = true;
      if (J3 === false)
        S("A language with no associated messages was selected.");
      this.#H();
      return;
    }
    this.localeData = [...this.localeData, { language: q, messages: H3 }], this.currentMessages = H3, this.#H();
  };
  formatDate = (q, H3) => {
    return new Intl.DateTimeFormat(this.currentLanguage, H3).format(q);
  };
  formatNumber = (q, H3) => {
    return new Intl.NumberFormat(this.currentLanguage, H3).format(q);
  };
  #q = (q, H3, J3) => {
    let K;
    if (detectIsEmpty(J3))
      K = this.currentMessages[q];
    else {
      const Q = this.localeData;
      for (let Z = 0, X = Q.length;Z < X; Z++)
        if (Q[Z].language === J3)
          K = Q[Z].messages[q];
    }
    if (!detectIsString(K)) {
      if (this.onError(new B(q, this.currentLanguage)), detectIsEmpty(H3))
        return q;
      if (detectIsEmpty(H3.defaultMessage))
        return q;
      return H3.defaultMessage;
    }
    return K;
  };
  translate = (q, H3, J3) => {
    const K = this.#q(q, H3, J3);
    if (detectIsString(K)) {
      const Q = J3 || this.language;
      try {
        return V(Q, K, H3).join("");
      } catch (Z) {
        this.onError(new B(q, this.currentLanguage));
      }
    }
    return String(K);
  };
  getFixedT = (q) => {
    return (J3, K, Q) => {
      let Z = J3;
      if (!detectIsEmpty(q))
        Z = `${q}.${J3}`;
      return this.translate(Z, K, Q);
    };
  };
  onLanguageChanged = (q) => {
    return this.languageChangeEvents.on(q);
  };
  offLanguageChanged = (q) => {
    return this.languageChangeEvents.off(q);
  };
  #H = () => {
    this.languageChangeEvents.emit();
  };
}
var V, R, y3, _, Y, j, T, x3, I, v3, S, w, r, D, a, t, e3, qq, Hq, Jq, Kq;
var init_dist2 = __esm(() => {
  init_esm();
  init_esm();
  init_dist();
  init_esm();
  init_jsx_runtime();
  init_esm();
  init_esm();
  init_jsx_runtime();
  V = function(q, H3, J3) {
    const K = new M(H3), Q = [], Z = ({ options: X, type: $, value: z }) => {
      if ($ === "Variable") {
        Q.push(J3[z]);
        return;
      }
      if (detectIsUndefined(X)) {
        Q.push(z);
        return;
      }
      if ($ === "Select") {
        const G3 = X[J3[z]] || X.other;
        Q.concat(G3.map(Z));
        return;
      }
      try {
        Q.concat(X[new Intl.PluralRules(q).select(J3[z])].map(Z));
      } catch (G3) {
        Q.concat(X.other.map(Z));
      }
    };
    while (!K.input.done)
      Z(K.next());
    return Q;
  };
  R = function(q) {
    const { translator: H3 } = useContext(w), J3 = a(H3, q), K = () => J3, Q = () => D(H3, q), [Z, X] = useState(Q), $ = useRef(true);
    return useEffect(() => {
      $.current = true;
      const z = () => {
        if ($.current === true)
          X(Q);
      };
      return H3.onLanguageChanged(z), () => {
        $.current = false, H3.offLanguageChanged(z);
      };
    }, [H3]), useEffect(() => {
      if ($.current === true)
        X(K);
    }, [H3, q]), { t: Z, translator: H3 };
  };
  y3 = function(q) {
    return T.includes(q);
  };
  _ = "{";
  Y = "}";
  j = ",";
  T = [_, Y, j];
  x3 = "plural";
  I = "select";
  v3 = "@wareme/translations";
  S = (q) => illegal(q, v3);
  w = createContext(null);
  r = component(({ translator: q, slot: H3 }) => {
    const J3 = useMemo(() => {
      return { translator: q };
    }, [q]);
    return jsx(w, { value: J3, children: H3 }, undefined, false, undefined, null);
  });
  D = function(q, H3) {
    return q.getFixedT(H3);
  };
  a = function(q, H3) {
    return useCallback(D(q, H3), [q, H3]);
  };
  t = function(q, H3, J3, K) {
    const Q = q.substring(H3), Z = `<${J3}>`, X = `</${J3}>`, $ = Q.indexOf(Z), z = Q.indexOf(X);
    if ($ === -1 || z === -1)
      return null;
    const G3 = H3 + $, W = H3 + z + X.length;
    let A3 = q.substring(0, W);
    A3 = A3.substring(G3);
    const f3 = A3.substring(Z.length, A3.length - X.length);
    return { dummyElement: J3, renderElement: K, found: A3, content: f3, openingIndex: G3, closingIndex: W };
  };
  e3 = function(q, H3) {
    const J3 = Object.keys(H3), K = [];
    for (let Q = 0, Z = J3.length;Q < Z; Q++) {
      const X = J3[Q], $ = H3[X];
      let z = 0;
      while (true) {
        const G3 = t(q, z, X, $);
        if (G3 === null)
          break;
        else
          K.push(G3), z = G3.closingIndex;
      }
    }
    return K;
  };
  qq = function(q) {
    const H3 = [];
    for (let J3 = 0, K = q.length;J3 < K; J3++) {
      const Q = q[J3];
      H3.push(Q.openingIndex), H3.push(Q.closingIndex);
    }
    return H3;
  };
  Hq = function(q, H3) {
    for (let J3 = 0, K = q.length;J3 < K; J3++) {
      const Q = q[J3];
      if (Q.openingIndex === H3)
        return Q;
    }
  };
  Jq = function(q, H3) {
    const J3 = [], K = qq(H3), Q = Math.min(...K), Z = Math.max(...K);
    if (Q !== 0) {
      const X = q.substring(0, Q);
      J3.push(jsx(Fragment, { children: X }, undefined, false, undefined, this));
    }
    for (let X = 0, $ = K.length;X < $; X += 2) {
      const z = K[X], G3 = Hq(H3, z);
      if (J3.push(G3.renderElement(G3.content)), X + 2 === $)
        break;
      const F = K[X + 1], W = K[X + 2];
      if (F !== W) {
        const A3 = q.substring(F, W);
        J3.push(jsx(Fragment, { children: A3 }, undefined, false, undefined, this));
      }
    }
    if (Z !== q.length) {
      const X = q.substring(Z);
      J3.push(jsx(Fragment, { children: X }, undefined, false, undefined, this));
    }
    return J3;
  };
  Kq = component(({ id: q, defaultMessage: H3, elements: J3, values: K }) => {
    if (detectIsEmpty(q) && detectIsEmpty(H3))
      throw new Error("Missing both `id` and `defaultMessage` props");
    const { t: Q } = R(), Z = { defaultMessage: H3, ...K }, X = Q(q, Z);
    if (detectIsEmpty(J3))
      return X;
    const $ = e3(X, J3);
    return Jq(X, $);
  });
});

// src/shared/translations/messages/it.js
var exports_it = {};
__export(exports_it, {
  default: () => it_default
});
var it_default;
var init_it = __esm(() => {
  it_default = {};
});

// src/shared/translations/messages/en.js
var exports_en = {};
__export(exports_en, {
  default: () => en_default
});
var en_default;
var init_en = __esm(() => {
  en_default = {};
});

// src/shared/translations/messages/nl.js
var exports_nl = {};
__export(exports_nl, {
  default: () => nl_default
});
var nl_default;
var init_nl = __esm(() => {
  nl_default = {};
});

// node_modules/@wareme/utils/dist/index.js
var s3, r3, m3;
var init_dist3 = __esm(() => {
  init_esm();
  s3 = function(t3, e4) {
    if (t3)
      return;
    r3(e4);
  };
  r3 = (t3) => illegal(t3, "invariant");
  m3 = (t3, e4, o) => t3 ? e4 : o;
});

// node_modules/@dark-engine/styled/dist/esm/utils/utils.js
var uniq, mergeClassNames, getElement, getElements, createStyleElement, setAttr, append, insertBefore, mergeTemplates, detectIsBrowser2, illegal6;
var init_utils3 = __esm(() => {
  init_esm();
  init_constants2();
  uniq = (items, selector = (x4) => x4) => {
    const arr = [];
    const set2 = new Set;
    for (const item of items) {
      const key = selector(item);
      !set2.has(key) && arr.push(item);
      set2.add(key);
    }
    return arr;
  };
  mergeClassNames = (classNames) => uniq(classNames.filter(Boolean)).join(BLANK_SPACE);
  getElement = (selector) => document.querySelector(selector);
  getElements = (selector) => Array.from(document.querySelectorAll(selector));
  createStyleElement = () => document.createElement(STYLE_TAG);
  setAttr = (element, attrName, attrValue) => element.setAttribute(attrName, attrValue);
  append = (parent, element) => parent.appendChild(element);
  insertBefore = (parent, element, sibling) => parent.insertBefore(element, sibling);
  mergeTemplates = (t12, t22) => {
    const [first] = t22;
    const $t1 = [...t12];
    const $t2 = [];
    let result = null;
    for (let i3 = 0;i3 < t22.length; i3++) {
      if (i3 > 0) {
        $t2.push(t22[i3]);
      }
    }
    $t1[$t1.length - 1] = $t1[$t1.length - 1] + first;
    result = [...$t1, ...$t2];
    Object.assign(result, { raw: result });
    return result;
  };
  detectIsBrowser2 = () => typeof globalThis.window !== "undefined";
  illegal6 = (x4) => illegal(x4, LIB4);
});

// node_modules/@dark-engine/styled/dist/esm/utils/index.js
var init_utils4 = __esm(() => {
  init_utils3();
});

// node_modules/@dark-engine/styled/dist/esm/hash/hash.js
var phash, hash7, SEED, SIZE, map3;
var init_hash = __esm(() => {
  phash = function(h3, x4) {
    let i3 = x4.length;
    while (i3) {
      h3 = h3 * 33 ^ x4.charCodeAt(--i3);
    }
    return h3;
  };
  hash7 = function(x4) {
    const source = phash(SEED, x4);
    const hash8 = String(Math.abs(source)).slice(0, SIZE).split("").map((x5) => map3[x5]).join("");
    return hash8;
  };
  SEED = 5381;
  SIZE = 6;
  map3 = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h", 8: "i", 9: "j" };
});

// node_modules/@dark-engine/styled/dist/esm/hash/index.js
var init_hash2 = __esm(() => {
  init_hash();
});

// node_modules/@dark-engine/styled/dist/esm/parse/parse.js
var parse4, detectIsPropName, detectHasSingleLineCommentStartMark, detectHasSingleLineCommentEndMark, detectHasMultiLineCommentStartMark, detectHasMultiLineCommentEndMark, detectHasFunctionMark, detectHasUrlFnMark, detectHasMediaQueryMark, detectHasContainerQueryMark, detectHasKeyframesMark, sub, createEnd;
var init_parse = __esm(() => {
  init_constants2();
  init_tokens2();
  init_utils4();
  parse4 = function(css) {
    const stylesheet = new StyleSheet;
    const stack = [];
    let buffer = "";
    let end = "";
    let fnIdx = -1;
    let isSingleLineComment = false;
    let isMultiLineComment = false;
    let isPropValue = false;
    let isUrl = false;
    for (let i3 = 0;i3 < css.length; i3++) {
      const char = css[i3];
      const parent = stack[stack.length - 1] || stylesheet;
      const last = parent.children[parent.children.length - 1];
      buffer += char;
      if (!isSingleLineComment && detectHasSingleLineCommentStartMark(buffer)) {
        isSingleLineComment = !isUrl;
      } else if (isSingleLineComment && detectHasSingleLineCommentEndMark(buffer)) {
        isSingleLineComment = false;
        buffer = "";
      }
      if (!isMultiLineComment && detectHasMultiLineCommentStartMark(buffer)) {
        isMultiLineComment = true;
        end = detectIsStyleRule(last) ? createEnd(buffer) : "";
      } else if (isMultiLineComment && detectHasMultiLineCommentEndMark(buffer)) {
        isMultiLineComment = false;
        buffer = "";
      }
      if (isSingleLineComment || isMultiLineComment)
        continue;
      if (detectHasFunctionMark(buffer)) {
        const token = new FunctionRule;
        if (detectIsFunctionRule(last) && !last.getIsSealed() && last.style) {
          last.add(++fnIdx);
          buffer = "";
          continue;
        }
        token.add(++fnIdx);
        token.parent = parent;
        token.markAsDynamic();
        if (detectIsStyleRule(last) && !last.value) {
          token.style = last;
          token.name = buffer.trim();
          last.normalize();
          last.isDynamic = true;
          parent.children[parent.children.length - 1] = token;
        } else {
          parent.children.push(token);
        }
        buffer = "";
        continue;
      }
      switch (char) {
        case OPENING_CURLY_BRACE_MARK:
          {
            const token = detectHasMediaQueryMark(buffer) ? new MediaQueryRule : detectHasContainerQueryMark(buffer) ? new ContainerQueryRule : detectHasKeyframesMark(buffer) ? new KeyframesRule : new NestingRule;
            const canNest = detectIsMediaQueryRule(token) || detectIsContainerQueryRule(token) || detectIsKeyframesRule(token) ? detectIsStyleSheet(parent) : detectIsNestingRule(token) ? detectIsStyleSheet(parent) || detectIsMediaQueryRule(parent) || detectIsContainerQueryRule(parent) || detectIsKeyframesRule(parent) : false;
            if (!canNest) {
              illegal6("Illegal style nesting!");
            }
            token.value = sub(buffer);
            token.normalize();
            token.parent = parent;
            if (!token.value) {
              illegal6("Empty style nesting!");
            }
            parent.children.push(token);
            stack.push(token);
            buffer = "";
          }
          break;
        case CLOSING_CURLY_BRACE_MARK:
          stack.pop();
          buffer = "";
          break;
        case COLON_MARK:
          {
            if (!detectIsPropName(buffer, i3, css, parent.children))
              continue;
            const token = new StyleRule;
            token.name = sub(buffer);
            token.parent = parent;
            parent.children.push(token);
          }
          buffer = "";
          isPropValue = true;
          break;
        case SEMICOLON_MARK:
          if (!last) {
            illegal6("Incorrect style!");
          }
          if (detectIsFunctionRule(last)) {
            last.seal(sub(buffer));
            buffer = "";
            continue;
          }
          last.value = end || sub(buffer);
          last.normalize();
          buffer = "";
          end = "";
          isPropValue = false;
          break;
        case OPENING_PARENTHESIS_MARK:
          if (isPropValue && detectHasUrlFnMark(buffer)) {
            isUrl = true;
          }
          break;
        case CLOSING_PARENTHESIS_MARK:
          isUrl = false;
          break;
        default:
          break;
      }
    }
    return stylesheet;
  };
  detectIsPropName = function(name, idx, css, children) {
    const last = children[children.length - 1];
    if (detectHasMediaQueryMark(name) || detectHasContainerQueryMark(name))
      return false;
    if (detectIsStyleRule(last) && !last.value)
      return false;
    for (let i3 = idx;i3 < css.length; i3++) {
      const char = css[i3];
      if (char === OPENING_CURLY_BRACE_MARK)
        return false;
      if (char === SEMICOLON_MARK)
        return true;
    }
    return true;
  };
  detectHasSingleLineCommentStartMark = (x4) => x4.endsWith(SINGLE_LINE_COMMENT_START_MARK);
  detectHasSingleLineCommentEndMark = (x4) => x4.endsWith(SINGLE_LINE_COMMENT_END_MARK);
  detectHasMultiLineCommentStartMark = (x4) => x4.endsWith(MULTI_LINE_COMMENT_START_MARK);
  detectHasMultiLineCommentEndMark = (x4) => x4.endsWith(MULTI_LINE_COMMENT_END_MARK);
  detectHasFunctionMark = (x4) => x4.endsWith(FUNCTION_MARK);
  detectHasUrlFnMark = (x4) => x4.endsWith(URL_FN_MARK + OPENING_PARENTHESIS_MARK);
  detectHasMediaQueryMark = (x4) => x4.trim().startsWith(MEDIA_QUERY_MARK);
  detectHasContainerQueryMark = (x4) => x4.trim().startsWith(CONTAINER_QUERY_MARK);
  detectHasKeyframesMark = (x4) => x4.trim().startsWith(KEYFRAMES_MARK);
  sub = (x4) => x4.substring(0, x4.length - 1);
  createEnd = (x4) => x4.replace(MULTI_LINE_COMMENT_START_MARK, "").trim();
});

// node_modules/@dark-engine/styled/dist/esm/parse/index.js
var init_parse2 = __esm(() => {
  init_parse();
});

// node_modules/@dark-engine/styled/dist/esm/keyframes/keyframes.js
class Keyframes {
  name;
  token;
  constructor(name, token) {
    this.name = name;
    this.token = token;
  }
  getName() {
    return this.name;
  }
  getToken() {
    return this.token;
  }
}
var detectIsKeyframes;
var init_keyframes = __esm(() => {
  detectIsKeyframes = (x4) => x4 instanceof Keyframes;
});

// node_modules/@dark-engine/styled/dist/esm/keyframes/index.js
var init_keyframes2 = __esm(() => {
  init_keyframes();
});

// node_modules/@dark-engine/styled/dist/esm/tokens/tokens.js
class Token {
  name = "";
  value = "";
  parent;
  isDynamic = false;
  normalize() {
    this.name = this.name.trim();
    this.value = this.value.trim();
  }
  markAsDynamic() {
    this.isDynamic = true;
    detectIsToken(this.parent) && !this.parent.isDynamic && this.parent.markAsDynamic();
  }
}

class StyleRule extends Token {
  generate() {
    return `${this.name}${COLON_MARK}${this.value}${SEMICOLON_MARK}`;
  }
}

class NestingRule extends Token {
  name = NESTING_MARK;
  children = [];
  normalize() {
    super.normalize();
    this.value = this.value.replace(GROUP_SELECTOR_PATTERN, COMMA_MARK);
  }
  generate(...args) {
    const className = args[0];
    const props = args[1];
    const fns = args[2];
    let styles = `${this.value.replaceAll(SELF_MARK, `${DOT_MARK}${className}`)}${OPENING_CURLY_BRACE_MARK}`;
    let keyframes3 = "";
    for (const token of this.children) {
      const [$styles, _3, __, ___, $keyframes] = generate3({ token, className, props, fns });
      styles += $styles;
      keyframes3 += $keyframes;
    }
    styles += `${CLOSING_CURLY_BRACE_MARK}${keyframes3}`;
    return styles;
  }
}

class MediaQueryRule extends Token {
  name = MEDIA_QUERY_MARK;
  children = [];
  generate(...args) {
    const className = args[0];
    const props = args[1];
    const fns = args[2];
    let styles = className ? `${this.value}${OPENING_CURLY_BRACE_MARK}${DOT_MARK}${className}${OPENING_CURLY_BRACE_MARK}` : `${this.value}${OPENING_CURLY_BRACE_MARK}`;
    let nesting = "";
    for (const token of this.children) {
      const [$styles, $nesting] = generate3({ token, className, props, fns });
      styles += $styles;
      nesting += $nesting;
    }
    if (className) {
      styles += `${CLOSING_CURLY_BRACE_MARK}${nesting}${CLOSING_CURLY_BRACE_MARK}`;
    } else {
      styles += `${nesting}${CLOSING_CURLY_BRACE_MARK}`;
    }
    return styles;
  }
}

class ContainerQueryRule extends Token {
  name = CONTAINER_QUERY_MARK;
  children = [];
  generate(...args) {
    const className = args[0];
    const props = args[1];
    const fns = args[2];
    let styles = className ? `${this.value}${OPENING_CURLY_BRACE_MARK}${DOT_MARK}${className}${OPENING_CURLY_BRACE_MARK}` : `${this.value}${OPENING_CURLY_BRACE_MARK}`;
    let nesting = "";
    for (const token of this.children) {
      const [$styles, $nesting] = generate3({ token, className, props, fns });
      styles += $styles;
      nesting += $nesting;
    }
    if (className) {
      styles += `${CLOSING_CURLY_BRACE_MARK}${nesting}${CLOSING_CURLY_BRACE_MARK}`;
    } else {
      styles += `${nesting}${CLOSING_CURLY_BRACE_MARK}`;
    }
    return styles;
  }
}

class KeyframesRule extends Token {
  name = KEYFRAMES_MARK;
  children = [];
  generate(...args) {
    const props = args[0];
    const fns = args[1];
    let keyframes3 = `${this.value}${OPENING_CURLY_BRACE_MARK}`;
    for (const token of this.children) {
      const [$styles, $nesting] = generate3({ token, props, fns });
      keyframes3 += $styles;
      keyframes3 += $nesting;
    }
    keyframes3 += `${CLOSING_CURLY_BRACE_MARK}`;
    return keyframes3;
  }
}

class FunctionRule extends Token {
  name = FUNCTION_MARK;
  args = [];
  style = null;
  end = "";
  isSealed = false;
  add(idx) {
    this.args.push(idx);
  }
  seal(end) {
    this.isSealed = true;
    this.end = end;
  }
  getIsSealed() {
    return this.isSealed;
  }
  getEnd() {
    return this.end;
  }
  generate(...args) {
    const className = args[0];
    const props = args[1];
    const fns = args[2];
    const styleExp = this.style;
    const [idx, ...rest4] = this.args;
    const value15 = fns[idx](props);
    let styles = "";
    let nesting = "";
    let media = "";
    let container = "";
    let keyframes3 = "";
    if (detectIsStyleSheet(value15)) {
      for (const token of value15.children) {
        const [$styles, $nesting, $media, $container, $keyframes] = generate3({ token, className, props, fns });
        styles += $styles;
        nesting += $nesting;
        media += $media;
        container += $container;
        keyframes3 += $keyframes;
      }
    } else if (styleExp) {
      const end = rest4.reduce((acc, x4) => acc += BLANK_SPACE + fns[x4](props), "") + this.end;
      if (detectIsKeyframes(value15)) {
        styleExp.value = replace(this.name, value15.getName()) + end;
        styles += styleExp.generate();
        keyframes3 += value15.getToken().generate(props, fns);
      } else {
        styleExp.value = replace(this.name, value15) + end;
        styles += styleExp.generate();
      }
    }
    return [styles, nesting, media, container, keyframes3];
  }
}

class StyleSheet {
  children = [];
  generate(options = {}) {
    const { className = null, props, fns } = options;
    let styles = className ? `${DOT_MARK}${className}${OPENING_CURLY_BRACE_MARK}` : "";
    let nesting = "";
    let media = "";
    let container = "";
    let keyframes3 = "";
    for (const token of this.children) {
      const [$styles, $nesting, $media, $container, $keyframes] = generate3({ token, className, props, fns });
      styles += $styles;
      nesting += $nesting;
      media += $media;
      container += $container;
      keyframes3 += $keyframes;
    }
    if (className) {
      styles += `${CLOSING_CURLY_BRACE_MARK}${nesting}${media}${container}${keyframes3}`;
    } else {
      styles += `${nesting}${media}${container}${keyframes3}`;
    }
    return styles;
  }
}
var generate3, GROUP_SELECTOR_PATTERN, detectIsToken, detectIsStyleRule, detectIsMediaQueryRule, detectIsContainerQueryRule, detectIsKeyframesRule, detectIsNestingRule, detectIsFunctionRule, detectIsStyleSheet, replace;
var init_tokens = __esm(() => {
  init_constants2();
  init_keyframes2();
  generate3 = function(options) {
    const { token, className = null, props, fns } = options;
    let styles = "";
    let nesting = "";
    let media = "";
    let container = "";
    let keyframes3 = "";
    if (detectIsStyleRule(token)) {
      styles += token.generate();
    } else if (detectIsNestingRule(token)) {
      nesting += token.generate(className, props, fns);
    } else if (detectIsMediaQueryRule(token)) {
      media += token.generate(className, props, fns);
    } else if (detectIsContainerQueryRule(token)) {
      container += token.generate(className, props, fns);
    } else if (detectIsKeyframesRule(token)) {
      keyframes3 += token.generate(props, fns);
    } else if (detectIsFunctionRule(token)) {
      const [$styles, $nesting, $media, $container, $keyframes] = token.generate(className, props, fns);
      styles += $styles;
      nesting += $nesting;
      media += $media;
      container += $container;
      keyframes3 += $keyframes;
    }
    return [styles, nesting, media, container, keyframes3];
  };
  GROUP_SELECTOR_PATTERN = new RegExp(`${COMMA_MARK}\\s*`, "g");
  detectIsToken = (x4) => x4 instanceof Token;
  detectIsStyleRule = (x4) => x4 instanceof StyleRule;
  detectIsMediaQueryRule = (x4) => x4 instanceof MediaQueryRule;
  detectIsContainerQueryRule = (x4) => x4 instanceof ContainerQueryRule;
  detectIsKeyframesRule = (x4) => x4 instanceof KeyframesRule;
  detectIsNestingRule = (x4) => x4 instanceof NestingRule;
  detectIsFunctionRule = (x4) => x4 instanceof FunctionRule;
  detectIsStyleSheet = (x4) => x4 instanceof StyleSheet;
  replace = (target, x4) => target.replace(FUNCTION_MARK, x4);
});

// node_modules/@dark-engine/styled/dist/esm/tokens/index.js
var init_tokens2 = __esm(() => {
  init_tokens();
});

// node_modules/@dark-engine/styled/dist/esm/theme/theme.js
var ThemeContext, useTheme, ThemeProvider;
var init_theme = __esm(() => {
  init_esm();
  ThemeContext = createContext(null, { displayName: "Theme" });
  useTheme = () => useContext(ThemeContext);
  ThemeProvider = component(({ theme, slot }) => {
    return ThemeContext({ value: theme, slot });
  });
});

// node_modules/@dark-engine/styled/dist/esm/theme/index.js
var init_theme2 = __esm(() => {
  init_theme();
});

// node_modules/@dark-engine/styled/dist/esm/styled/styled.js
var styled, createStyledComponent, injectWithHydration, filter, setupGlobal, getExtendingConfig, generate4, split3, slice, join2, createTag, inject2, reuse, getInterleavedElements, cache, injections, tag, isLoaded, $$styled, getTag, createParser, ast, css, getClassNamesFrom, genClassName, detectIsStyled, filterArgs;
var init_styled = __esm(() => {
  init_esm();
  init_constants2();
  init_utils4();
  init_tokens2();
  init_keyframes2();
  init_theme2();
  init_manager();
  init_parse2();
  init_hash2();
  styled = function(tagName) {
    const isString = detectIsString(tagName);
    const factory = isString ? (props) => View({ as: tagName, ...props }) : tagName;
    const targetName = isString ? tagName : factory.displayName || "Component";
    const displayName = `styled.${targetName}`;
    if (!isLoaded && detectIsBrowser2()) {
      reuse(getInterleavedElements(), createTag);
      isLoaded = true;
    }
    return createStyledComponent(factory, displayName);
  };
  createStyledComponent = function(factory, displayName) {
    let transform7 = (x4) => x4;
    const isExtending = detectIsStyled(factory);
    const config3 = isExtending ? getExtendingConfig(factory) : null;
    const fn = (source, ...args) => {
      const $source = isExtending ? mergeTemplates(config3.source, source) : source;
      const $args = isExtending ? [...config3.args, ...args] : args;
      const $transform = isExtending ? (p3) => transform7(config3.transform(p3)) : transform7;
      const fns = filterArgs($args);
      const [sheet, sheets] = slice(ast($source, ...$args));
      const [baseName, baseStyle, baseKeyframes] = generate4({ sheet, cache });
      const styled2 = component((props) => {
        const { as: component12, ...rest4 } = props;
        const theme3 = useTheme();
        const { isServer, isHydration } = useSSR();
        const isSwap = detectIsFunction(component12);
        const $props = isSwap ? rest4 : props;
        const $factory = isSwap ? component12 : isExtending ? config3.factory : factory;
        const [className, styles, keyframes4] = useMemo(() => {
          const [names, styles2, keyframes5] = sheets.reduce((acc, sheet2) => {
            const [className3, style, keyframes6] = generate4({ sheet: sheet2, cache, props: { ...props, theme: theme3 }, fns });
            const [names2, styles3, keyframesList] = acc;
            names2.push(className3);
            styles3.push(style);
            keyframesList.push(keyframes6);
            return acc;
          }, [[], [baseStyle], [baseKeyframes]]);
          const className2 = mergeClassNames([...getClassNamesFrom(props), baseName, ...names]);
          return [className2, filter(styles2, injections), filter(keyframes5, injections)];
        }, [...mapRecord(props), theme3]);
        useInsertionEffect(() => {
          injectWithHydration(styles, isHydration);
          injectWithHydration(keyframes4, isHydration);
        }, [...styles, ...keyframes4]);
        if (isServer) {
          const manager3 = useManager();
          styles.forEach((css) => manager3.collectComponentStyle(css));
          keyframes4.forEach((css) => manager3.collectComponentStyle(css));
          manager3.reset(setupGlobal);
        }
        if (detectIsFunction($props.slot) && !detectIsVirtualNodeFactory($props.slot)) {
          $props.slot = $props.slot((x4) => `${className}_${x4}`);
        }
        return $factory({ ...$transform($props), className });
      }, { displayName });
      styled2[$$styled] = {
        className: baseName,
        source: $source,
        args: $args,
        factory: config3?.factory || factory,
        transform: config3 ? (p3) => transform7(config3.transform(p3)) : transform7
      };
      return styled2;
    };
    fn.attrs = (t4) => {
      transform7 = detectIsFunction(t4) ? t4 : transform7;
      return fn;
    };
    return fn;
  };
  injectWithHydration = function(styles, isHydration) {
    tag = tag || getTag() || createTag();
    const content = tag.textContent;
    for (const css of styles) {
      if (isHydration) {
        content.indexOf(css) === -1 && inject2(css, tag);
      } else {
        inject2(css, tag);
      }
    }
  };
  filter = function(styles, injections) {
    const $styles = [];
    for (const style of styles) {
      if (style && !injections.has(style)) {
        $styles.push(style);
        injections.add(style);
      }
    }
    return $styles;
  };
  setupGlobal = function() {
    cache = new Map;
    injections = new Set;
    tag = null;
    isLoaded = false;
  };
  getExtendingConfig = function(factory) {
    const { className, ...rest4 } = factory[$$styled];
    const config3 = rest4;
    return config3;
  };
  generate4 = function(options) {
    const { sheet: $sheet, cache, props, fns } = options;
    const [sheet, rules] = split3($sheet);
    const key = sheet.generate({ className: FUNCTION_MARK, props, fns });
    const item = cache.get(key);
    const className = item ? item[0] : genClassName(key);
    let css = "";
    let style = "";
    let keyframes4 = "";
    if (item) {
      css = item[1];
    } else {
      css = key.replaceAll(FUNCTION_MARK, className);
      css = css.replaceAll(`${DOT_MARK}${NULL_MARK}`, `${DOT_MARK}${className}`);
    }
    style += css;
    cache.set(key, [className, css]);
    for (const rule of rules) {
      keyframes4 += rule.generate();
    }
    return [className, style, keyframes4];
  };
  split3 = function(source) {
    const sheet = new StyleSheet;
    const rules = [];
    for (const token of source.children) {
      if (detectIsKeyframesRule(token)) {
        rules.push(token);
      } else {
        sheet.children.push(token);
      }
    }
    return [sheet, rules];
  };
  slice = function(source) {
    const sheet = new StyleSheet;
    const sheets = [];
    for (const token of source.children) {
      if (token.isDynamic) {
        const style = new StyleSheet;
        style.children.push(token);
        sheets.push(style);
      } else {
        sheet.children.push(token);
      }
    }
    return [sheet, sheets];
  };
  join2 = function(strings, args, isFragment = false) {
    let joined = "";
    let keyframes4 = "";
    for (let i3 = 0;i3 < strings.length; i3++) {
      const arg = args[i3];
      joined += strings[i3];
      if (detectIsStyled(arg)) {
        joined += `${DOT_MARK}${arg[$$styled].className}`;
      } else if (detectIsStyleSheet(arg)) {
        joined += arg.generate();
      } else if (detectIsKeyframes(arg)) {
        joined += arg.getName();
        keyframes4 += arg.getToken().generate();
      } else if (detectIsFunction(arg)) {
        if (isFragment)
          illegal6("Illegal nesting functions in a CSS fragment!");
        joined += FUNCTION_MARK;
      } else if (detectIsTextBased(arg)) {
        joined += arg;
      }
    }
    joined += keyframes4;
    return joined;
  };
  createTag = function() {
    const tag = createStyleElement();
    setAttr(tag, STYLED_ATTR, COMPONENTS_ATTR_VALUE);
    append(document.head, tag);
    return tag;
  };
  inject2 = function(css, tag) {
    tag.textContent = `${tag.textContent}${css}`;
  };
  reuse = function(elements, createTag2, isComponentStyle = true) {
    if (elements.length === 0)
      return;
    const tag = createTag2();
    let content = "";
    for (const element of elements) {
      const style = element.textContent;
      isComponentStyle && filter([style], injections);
      content += style;
      element.remove();
    }
    tag.textContent = content;
  };
  getInterleavedElements = function() {
    return getElements(`[${STYLED_ATTR}="${INTERLEAVE_COMPONENTS_ATTR_VALUE}"]`);
  };
  cache = null;
  injections = null;
  tag = null;
  isLoaded = false;
  $$styled = Symbol("styled");
  setupGlobal();
  getTag = () => getElement(`[${STYLED_ATTR}="${COMPONENTS_ATTR_VALUE}"]`);
  createParser = (isFragment) => (strings, ...args) => parse4(join2(strings, args, isFragment));
  ast = createParser(false);
  css = createParser(true);
  getClassNamesFrom = (props) => (props.class || props.className || "").split(BLANK_SPACE);
  genClassName = (key) => `${CLASS_NAME_PREFIX}-${hash7(key)}`;
  detectIsStyled = (x4) => detectIsFunction(x4) && Boolean(x4[$$styled]);
  filterArgs = (args) => args.filter((x4) => detectIsFunction(x4) && !detectIsStyled(x4));
  styled.a = styled("a");
  styled.abbr = styled("abbr");
  styled.address = styled("address");
  styled.area = styled("area");
  styled.article = styled("article");
  styled.aside = styled("aside");
  styled.audio = styled("audio");
  styled.b = styled("b");
  styled.base = styled("base");
  styled.bdi = styled("bdi");
  styled.bdo = styled("bdo");
  styled.blockquote = styled("blockquote");
  styled.body = styled("body");
  styled.br = styled("br");
  styled.button = styled("button");
  styled.canvas = styled("canvas");
  styled.caption = styled("caption");
  styled.cite = styled("cite");
  styled.code = styled("code");
  styled.col = styled("col");
  styled.colgroup = styled("colgroup");
  styled.data = styled("data");
  styled.datalist = styled("datalist");
  styled.dd = styled("dd");
  styled.del = styled("del");
  styled.details = styled("details");
  styled.dfn = styled("dfn");
  styled.dialog = styled("dialog");
  styled.div = styled("div");
  styled.dl = styled("dl");
  styled.dt = styled("dt");
  styled.em = styled("em");
  styled.embed = styled("embed");
  styled.fieldset = styled("fieldset");
  styled.figcaption = styled("figcaption");
  styled.figure = styled("figure");
  styled.footer = styled("footer");
  styled.form = styled("form");
  styled.h1 = styled("h1");
  styled.h2 = styled("h2");
  styled.h3 = styled("h3");
  styled.h4 = styled("h4");
  styled.h5 = styled("h5");
  styled.h6 = styled("h6");
  styled.head = styled("head");
  styled.header = styled("header");
  styled.hgroup = styled("hgroup");
  styled.hr = styled("hr");
  styled.html = styled("html");
  styled.i = styled("i");
  styled.iframe = styled("iframe");
  styled.img = styled("img");
  styled.input = styled("input");
  styled.ins = styled("ins");
  styled.kbd = styled("kbd");
  styled.label = styled("label");
  styled.legend = styled("legend");
  styled.li = styled("li");
  styled.link = styled("link");
  styled.main = styled("main");
  styled.map = styled("map");
  styled.mark = styled("mark");
  styled.menu = styled("menu");
  styled.meta = styled("meta");
  styled.meter = styled("meter");
  styled.nav = styled("nav");
  styled.noscript = styled("noscript");
  styled.object = styled("object");
  styled.ol = styled("ol");
  styled.optgroup = styled("optgroup");
  styled.option = styled("option");
  styled.output = styled("output");
  styled.p = styled("p");
  styled.param = styled("param");
  styled.picture = styled("picture");
  styled.pre = styled("pre");
  styled.progress = styled("progress");
  styled.q = styled("q");
  styled.rp = styled("rp");
  styled.rt = styled("rt");
  styled.ruby = styled("ruby");
  styled.s = styled("s");
  styled.samp = styled("samp");
  styled.script = styled("script");
  styled.section = styled("section");
  styled.select = styled("select");
  styled.small = styled("small");
  styled.source = styled("source");
  styled.span = styled("span");
  styled.strong = styled("strong");
  styled.style = styled("style");
  styled.sub = styled("sub");
  styled.summary = styled("summary");
  styled.sup = styled("sup");
  styled.table = styled("table");
  styled.tbody = styled("tbody");
  styled.td = styled("td");
  styled.template = styled("template");
  styled.textarea = styled("textarea");
  styled.tfoot = styled("tfoot");
  styled.th = styled("th");
  styled.thead = styled("thead");
  styled.time = styled("time");
  styled.title = styled("title");
  styled.tr = styled("tr");
  styled.track = styled("track");
  styled.u = styled("u");
  styled.ul = styled("ul");
  styled.var = styled("var");
  styled.video = styled("video");
  styled.wbr = styled("wbr");
  styled.circle = styled("circle");
  styled.clipPath = styled("clipPath");
  styled.defs = styled("defs");
  styled.desc = styled("desc");
  styled.ellipse = styled("ellipse");
  styled.feBlend = styled("feBlend");
  styled.feColorMatrix = styled("feColorMatrix");
  styled.feComponentTransfer = styled("feComponentTransfer");
  styled.feComposite = styled("feComposite");
  styled.feConvolveMatrix = styled("feConvolveMatrix");
  styled.feDiffuseLighting = styled("feDiffuseLighting");
  styled.feDisplacementMap = styled("feDisplacementMap");
  styled.feDistantLight = styled("feDistantLight");
  styled.feFlood = styled("feFlood");
  styled.feFuncA = styled("feFuncA");
  styled.feFuncB = styled("feFuncB");
  styled.feFuncG = styled("feFuncG");
  styled.feFuncR = styled("feFuncR");
  styled.feGaussianBlur = styled("feGaussianBlur");
  styled.feImage = styled("feImage");
  styled.feMerge = styled("feMerge");
  styled.feMergeNode = styled("feMergeNode");
  styled.feMorphology = styled("feMorphology");
  styled.feOffset = styled("feOffset");
  styled.fePointLight = styled("fePointLight");
  styled.feSpecularLighting = styled("feSpecularLighting");
  styled.feSpotLight = styled("feSpotLight");
  styled.feTile = styled("feTile");
  styled.feTurbulence = styled("feTurbulence");
  styled.filter = styled("filter");
  styled.g = styled("g");
  styled.image = styled("image");
  styled.line = styled("line");
  styled.linearGradient = styled("linearGradient");
  styled.marker = styled("marker");
  styled.mask = styled("mask");
  styled.path = styled("path");
  styled.pattern = styled("pattern");
  styled.polygon = styled("polygon");
  styled.polyline = styled("polyline");
  styled.radialGradient = styled("radialGradient");
  styled.rect = styled("rect");
  styled.stop = styled("stop");
  styled.svg = styled("svg");
  styled.switch = styled("switch");
  styled.symbol = styled("symbol");
  styled.text = styled("text");
  styled.textPath = styled("textPath");
  styled.tspan = styled("tspan");
  styled.use = styled("use");
  styled.view = styled("view");
});

// node_modules/@dark-engine/styled/dist/esm/styled/index.js
var init_styled2 = __esm(() => {
  init_styled();
});

// node_modules/@dark-engine/styled/dist/esm/global/global.js
var createGlobalStyle, setupGlobal2, createTag2, getInterleavedElements2, cache2, tag2, isLoaded2, getTag2, reinject;
var init_global = __esm(() => {
  init_esm();
  init_utils4();
  init_constants2();
  init_styled2();
  init_theme2();
  init_manager();
  createGlobalStyle = function(source, ...args) {
    if (!isLoaded2 && detectIsBrowser2()) {
      reuse(getInterleavedElements2(), createTag2, false);
      isLoaded2 = true;
    }
    const fns = filterArgs(args);
    const sheet = ast(source, ...args);
    const factory = component((props) => {
      const theme4 = useTheme();
      const id = useId();
      const css2 = useMemo(() => sheet.generate({ props: { ...props, theme: theme4 }, fns }), [...mapRecord(props), theme4]);
      useInsertionEffect(() => {
        tag2 = tag2 || getTag2() || createTag2();
        cache2.set(id, css2);
        reinject(tag2, cache2);
      }, [css2]);
      useInsertionEffect(() => {
        return () => {
          cache2.delete(id);
          reinject(tag2, cache2);
        };
      }, []);
      if (detectIsServer()) {
        const manager4 = useManager();
        manager4.collectGlobalStyle(css2);
        manager4.reset(setupGlobal2);
      }
      return null;
    }, { displayName: "GlobalStyle" });
    return factory;
  };
  setupGlobal2 = function() {
    cache2 = new Map;
    tag2 = null;
    isLoaded2 = false;
  };
  createTag2 = function() {
    const tag1 = createStyleElement();
    const tag2 = getTag();
    setAttr(tag1, STYLED_ATTR, GLOBAL_ATTR_VALUE);
    if (tag2) {
      insertBefore(document.head, tag1, tag2);
    } else {
      append(document.head, tag1);
    }
    return tag1;
  };
  getInterleavedElements2 = function() {
    return getElements(`[${STYLED_ATTR}="${INTERLEAVE_GLOBAL_ATTR_VALUE}"]`);
  };
  cache2 = null;
  tag2 = null;
  isLoaded2 = false;
  setupGlobal2();
  getTag2 = () => getElement(`[${STYLED_ATTR}="${GLOBAL_ATTR_VALUE}"]`);
  reinject = (tag3, stylesMap) => {
    tag3.textContent = "";
    stylesMap.forEach((css2) => inject2(css2, tag3));
  };
});

// node_modules/@dark-engine/styled/dist/esm/global/index.js
var init_global2 = __esm(() => {
  init_global();
});

// node_modules/@dark-engine/styled/dist/esm/index.js
var init_esm2 = __esm(() => {
  init_styled2();
  init_theme2();
  init_global2();
});

// src/shared/styles/fragments.js
var fragmentContainerPadding;
var init_fragments = __esm(() => {
  init_esm2();
  init_dist3();
  fragmentContainerPadding = (props) => css`
  padding: 0 4vw;

  @media (min-width: ${props.theme.sm}) {
    && {padding: 0 2.5vw;} // https://github.com/atellmer/dark/issues/72#issuecomment-2135525554
  }
`;
});

// src/shared/components/WideImage.jsx
var Container, ImageContainer, Image, WideImage, WideImage_default;
var init_WideImage = __esm(() => {
  init_esm();
  init_esm2();
  init_fragments();
  init_jsx_runtime();
  Container = styled.div`
  ${(props) => fragmentContainerPadding(props)}
`;
  ImageContainer = styled.div`
  height: 60svh;
  padding: 2rem 0;
`;
  Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
  WideImage = component(({ ...props }) => {
    return jsx(Container, {
      children: jsx(ImageContainer, {
        children: jsx(Image, {
          ...props
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  });
  WideImage_default = WideImage;
});

// src/shared/pages/Home.jsx
var exports_Home = {};
__export(exports_Home, {
  default: () => Home_default
});
var Home, Home_default;
var init_Home = __esm(() => {
  init_esm();
  init_dist2();
  init_WideImage();
  init_jsx_runtime();
  Home = component(() => {
    const { t: t4 } = R("home");
    return jsx(Fragment, {
      children: jsx(WideImage_default, {
        src: "_public/hero.jpg",
        alt: t4("imageAlt")
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  });
  Home_default = Home;
});

// src/shared/pages/NotFound.jsx
var exports_NotFound = {};
__export(exports_NotFound, {
  default: () => NotFound_default
});
var NotFound, NotFound_default;
var init_NotFound = __esm(() => {
  init_esm();
  init_dist2();
  init_jsx_runtime();
  NotFound = component(() => {
    const { t: t4 } = R();
    return jsx("section", {
      children: t4("notFound.title")
    }, undefined, false, undefined, this);
  });
  NotFound_default = NotFound;
});

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
function IsStandardObject(value) {
  return IsObject(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === "object";
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsInteger(value) {
  return Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsString(value) {
  return typeof value === "string";
}
function IsFunction(value) {
  return typeof value === "function";
}
function IsSymbol(value) {
  return typeof value === "symbol";
}
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN ? IsNumber(value) : Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => Set2,
  Has: () => Has,
  Get: () => Get,
  Entries: () => Entries,
  Delete: () => Delete,
  Clear: () => Clear
});
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
var map = new Map;
// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => Set3,
  Has: () => Has2,
  Get: () => Get2,
  Entries: () => Entries2,
  Delete: () => Delete2,
  Clear: () => Clear2
});
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
var map2 = new Map;
// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");
// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function(TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format))
      throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => IsUndefined2,
  IsUint8Array: () => IsUint8Array2,
  IsSymbol: () => IsSymbol2,
  IsString: () => IsString2,
  IsRegExp: () => IsRegExp,
  IsObject: () => IsObject2,
  IsNumber: () => IsNumber2,
  IsNull: () => IsNull2,
  IsIterator: () => IsIterator2,
  IsFunction: () => IsFunction2,
  IsDate: () => IsDate2,
  IsBoolean: () => IsBoolean2,
  IsBigInt: () => IsBigInt2,
  IsAsyncIterator: () => IsAsyncIterator2,
  IsArray: () => IsArray2
});
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.asyncIterator in value;
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === "bigint";
}
function IsBoolean2(value) {
  return typeof value === "boolean";
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === "function";
}
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.iterator in value;
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === "number";
}
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === "string";
}
function IsSymbol2(value) {
  return typeof value === "symbol";
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
var ArrayType = function(value) {
  return value.map((value2) => Visit(value2));
};
var DateType = function(value) {
  return new Date(value.getTime());
};
var Uint8ArrayType = function(value) {
  return new Uint8Array(value);
};
var RegExpType = function(value) {
  return new RegExp(value.source, value.flags);
};
var ObjectType = function(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
};
var Visit = function(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
};
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
var DiscardKey = function(value2, key) {
  const { [key]: _, ...rest } = value2;
  return rest;
};
function Discard(value2, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value2);
}
// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
function IsReadonly(value2) {
  return IsObject2(value2) && value2[ReadonlyKind] === "Readonly";
}
function IsOptional(value2) {
  return IsObject2(value2) && value2[OptionalKind] === "Optional";
}
function IsAny(value2) {
  return IsKindOf(value2, "Any");
}
function IsArray3(value2) {
  return IsKindOf(value2, "Array");
}
function IsAsyncIterator3(value2) {
  return IsKindOf(value2, "AsyncIterator");
}
function IsBigInt3(value2) {
  return IsKindOf(value2, "BigInt");
}
function IsBoolean3(value2) {
  return IsKindOf(value2, "Boolean");
}
function IsConstructor(value2) {
  return IsKindOf(value2, "Constructor");
}
function IsDate3(value2) {
  return IsKindOf(value2, "Date");
}
function IsFunction3(value2) {
  return IsKindOf(value2, "Function");
}
function IsInteger2(value2) {
  return IsKindOf(value2, "Integer");
}
function IsIntersect(value2) {
  return IsKindOf(value2, "Intersect");
}
function IsIterator3(value2) {
  return IsKindOf(value2, "Iterator");
}
function IsKindOf(value2, kind) {
  return IsObject2(value2) && Kind in value2 && value2[Kind] === kind;
}
function IsLiteral(value2) {
  return IsKindOf(value2, "Literal");
}
function IsMappedKey(value2) {
  return IsKindOf(value2, "MappedKey");
}
function IsMappedResult(value2) {
  return IsKindOf(value2, "MappedResult");
}
function IsNever(value2) {
  return IsKindOf(value2, "Never");
}
function IsNot(value2) {
  return IsKindOf(value2, "Not");
}
function IsNull3(value2) {
  return IsKindOf(value2, "Null");
}
function IsNumber3(value2) {
  return IsKindOf(value2, "Number");
}
function IsObject3(value2) {
  return IsKindOf(value2, "Object");
}
function IsPromise2(value2) {
  return IsKindOf(value2, "Promise");
}
function IsRecord(value2) {
  return IsKindOf(value2, "Record");
}
function IsRef(value2) {
  return IsKindOf(value2, "Ref");
}
function IsRegExp2(value2) {
  return IsKindOf(value2, "RegExp");
}
function IsString3(value2) {
  return IsKindOf(value2, "String");
}
function IsSymbol3(value2) {
  return IsKindOf(value2, "Symbol");
}
function IsTemplateLiteral(value2) {
  return IsKindOf(value2, "TemplateLiteral");
}
function IsThis(value2) {
  return IsKindOf(value2, "This");
}
function IsTransform(value2) {
  return IsObject2(value2) && TransformKind in value2;
}
function IsTuple(value2) {
  return IsKindOf(value2, "Tuple");
}
function IsUndefined3(value2) {
  return IsKindOf(value2, "Undefined");
}
function IsUnion(value2) {
  return IsKindOf(value2, "Union");
}
function IsUint8Array3(value2) {
  return IsKindOf(value2, "Uint8Array");
}
function IsUnknown(value2) {
  return IsKindOf(value2, "Unknown");
}
function IsUnsafe(value2) {
  return IsKindOf(value2, "Unsafe");
}
function IsVoid(value2) {
  return IsKindOf(value2, "Void");
}
function IsKind(value2) {
  return IsObject2(value2) && Kind in value2 && IsString2(value2[Kind]);
}
function IsSchema(value2) {
  return IsAny(value2) || IsArray3(value2) || IsBoolean3(value2) || IsBigInt3(value2) || IsAsyncIterator3(value2) || IsConstructor(value2) || IsDate3(value2) || IsFunction3(value2) || IsInteger2(value2) || IsIntersect(value2) || IsIterator3(value2) || IsLiteral(value2) || IsMappedKey(value2) || IsMappedResult(value2) || IsNever(value2) || IsNot(value2) || IsNull3(value2) || IsNumber3(value2) || IsObject3(value2) || IsPromise2(value2) || IsRecord(value2) || IsRef(value2) || IsRegExp2(value2) || IsString3(value2) || IsSymbol3(value2) || IsTemplateLiteral(value2) || IsThis(value2) || IsTuple(value2) || IsUndefined3(value2) || IsUnion(value2) || IsUint8Array3(value2) || IsUnknown(value2) || IsUnsafe(value2) || IsVoid(value2) || IsKind(value2);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
var RemoveOptional = function(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
};
var AddOptional = function(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
};
var OptionalWithFlag = function(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
};
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
var FromProperties = function(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
};
var FromMappedResult = function(R, F) {
  return FromProperties(R.properties, F);
};
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
var IsIntersectOptional = function(T) {
  return T.every((L) => IsOptional(L));
};
var RemoveOptionalFromType = function(T) {
  return Discard(T, [OptionalKind]);
};
var RemoveOptionalFromRest = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
};
var ResolveIntersect = function(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
};
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
var IsUnionOptional = function(T) {
  return T.some((L) => IsOptional(L));
};
var RemoveOptionalFromRest2 = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
};
var RemoveOptionalFromType2 = function(T) {
  return Discard(T, [OptionalKind]);
};
var ResolveUnion = function(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
};
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
var Unescape = function(pattern) {
  return pattern.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
};
var IsNonEscaped = function(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
};
var IsOpenParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
};
var IsCloseParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
};
var IsSeparator = function(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
};
var IsGroup = function(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
};
var InGroup = function(pattern) {
  return pattern.slice(1, pattern.length - 1);
};
var IsPrecedenceOr = function(pattern) {
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
};
var IsPrecedenceAnd = function(pattern) {
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
};
var Or = function(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
};
var And = function(pattern) {
  function Group(value2, index) {
    if (!IsOpenParen(value2, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index;scan < value2.length; scan++) {
      if (IsOpenParen(value2, scan))
        count += 1;
      if (IsCloseParen(value2, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  function Range(pattern2, index) {
    for (let scan = index;scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
};
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: Unescape(pattern) };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

class TemplateLiteralParserError extends TypeBoxError {
}

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
var IsNumberExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
};
var IsBooleanExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
};
var IsStringExpression = function(expression) {
  return expression.type === "const" && expression.const === ".*";
};
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}

class TemplateLiteralFiniteError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}

class TemplateLiteralGenerateError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
function Literal(value2, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value2,
    type: typeof value2
  };
}
// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
function Boolean2(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean2() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal3) => Literal(literal3.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2;i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0;i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}\$`;
var PatternNumberExact = `^${PatternNumber}\$`;
var PatternStringExact = `^${PatternString}\$`;
// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
var Escape = function(value2) {
  return value2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var Visit2 = function(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
};
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}

class TemplateLiteralPatternError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern2 = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern: pattern2 };
}
// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
var FromTemplateLiteral = function(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
};
var FromUnion2 = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexPropertyKeys(L));
  return Acc;
};
var FromLiteral = function(T) {
  return [T.toString()];
};
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
var FromProperties2 = function(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
};
var FromMappedResult2 = function(T, R, options) {
  return FromProperties2(T, R.properties, options);
};
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
var FromRest = function(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
};
var FromIntersectRest = function(T) {
  return T.filter((L) => !IsNever(L));
};
var FromIntersect = function(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
};
var FromUnionRest = function(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
};
var FromUnion3 = function(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
};
var FromTuple = function(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
};
var FromArray = function(T, K) {
  return K === "[number]" ? T : Never();
};
var FromProperty = function(T, K) {
  return K in T ? T[K] : Never();
};
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
var FromSchema = function(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
};
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
var MappedIndexPropertyKey = function(T, K, options) {
  return { [K]: Index(T, [K], options) };
};
var MappedIndexPropertyKeys = function(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
};
var MappedIndexProperties = function(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
};
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
var _Object = function(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
};
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
var RemoveReadonly = function(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
};
var AddReadonly = function(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
};
var ReadonlyWithFlag = function(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
};
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
var FromProperties3 = function(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
};
var FromMappedResult3 = function(R, F) {
  return FromProperties3(R.properties, F);
};
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
var SetIntersectManyResolve = function(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
};
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...L);
  return Acc;
}
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
var FromMappedResult4 = function(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
};
var MappedKeyToKnownMappedResultProperties = function(K) {
  return { [K]: Literal(K) };
};
var MappedKeyToUnknownMappedResultProperties = function(P) {
  const Acc = {};
  for (const L of P)
    Acc[L] = Literal(L);
  return Acc;
};
var MappedKeyToMappedResultProperties = function(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
};
var FromMappedKey = function(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
};
var FromRest2 = function(K, T) {
  return T.map((L) => FromSchemaType(K, L));
};
var FromProperties4 = function(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
};
var FromSchemaType = function(K, T) {
  return IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T;
};
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K)
    Acc[L] = FromSchemaType(L, T);
  return Acc;
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
var FromRest3 = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(KeyOfPropertyKeys(L));
  return Acc;
};
var FromIntersect2 = function(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
};
var FromUnion4 = function(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
};
var FromTuple2 = function(T) {
  return T.map((_, I) => I.toString());
};
var FromArray2 = function(_) {
  return ["[number]"];
};
var FromProperties5 = function(T) {
  return globalThis.Object.getOwnPropertyNames(T);
};
var FromPatternProperties = function(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
};
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern3 = keys.map((key) => `(${key})`);
  return `^(${pattern3.join("|")})\$`;
}
var includePatternProperties = false;

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
var FromProperties6 = function(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
};
var FromMappedResult5 = function(R, options) {
  return FromProperties6(R.properties, options);
};
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
var Intersect2 = function(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
};
var Union2 = function(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
};
var Not = function(schema) {
  return !ExtendsUndefinedCheck(schema.not);
};
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
function DefaultErrorFunction(error7) {
  switch (error7.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error7.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error7.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error7.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error7.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error7.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error7.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error7.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error7.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error7.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error7.schema.const === "string" ? `'${error7.schema.const}'` : error7.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error7.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error7.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error7.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error7.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error7.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error7.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error7.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error7.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error7.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error7.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error7.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
function GetErrorFunction() {
  return errorFunction;
}
var errorFunction = DefaultErrorFunction;

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
var Resolve = function(schema, references) {
  const target = references.find((target2) => target2.$id === schema.$ref);
  if (target === undefined)
    throw new TypeDereferenceError(schema);
  return Deref(target, references);
};
function Deref(schema, references) {
  return schema[Kind] === "This" || schema[Kind] === "Ref" ? Resolve(schema, references) : schema;
}

class TypeDereferenceError extends TypeBoxError {
  constructor(schema) {
    super(`Unable to dereference schema with \$id '${schema.$id}'`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
function* NumberToBytes(value3) {
  const byteCount = value3 === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value3) + 1) / 8);
  for (let i = 0;i < byteCount; i++) {
    yield value3 >> 8 * (byteCount - 1 - i) & 255;
  }
}
var ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Array);
  for (const item of value3) {
    Visit3(item);
  }
};
var BooleanType = function(value3) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value3 ? 1 : 0);
};
var BigIntType = function(value3) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var DateType2 = function(value3) {
  FNV1A64(ByteMarker.Date);
  Visit3(value3.getTime());
};
var NullType = function(value3) {
  FNV1A64(ByteMarker.Null);
};
var NumberType = function(value3) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var ObjectType2 = function(value3) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value3).sort()) {
    Visit3(key);
    Visit3(value3[key]);
  }
};
var StringType = function(value3) {
  FNV1A64(ByteMarker.String);
  for (let i = 0;i < value3.length; i++) {
    for (const byte of NumberToBytes(value3.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
};
var SymbolType = function(value3) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value3.description);
};
var Uint8ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0;i < value3.length; i++) {
    FNV1A64(value3[i]);
  }
};
var UndefinedType = function(value3) {
  return FNV1A64(ByteMarker.Undefined);
};
var Visit3 = function(value3) {
  if (IsArray(value3))
    return ArrayType2(value3);
  if (IsBoolean(value3))
    return BooleanType(value3);
  if (IsBigInt(value3))
    return BigIntType(value3);
  if (IsDate(value3))
    return DateType2(value3);
  if (IsNull(value3))
    return NullType(value3);
  if (IsNumber(value3))
    return NumberType(value3);
  if (IsStandardObject(value3))
    return ObjectType2(value3);
  if (IsString(value3))
    return StringType(value3);
  if (IsSymbol(value3))
    return SymbolType(value3);
  if (IsUint8Array(value3))
    return Uint8ArrayType2(value3);
  if (IsUndefined(value3))
    return UndefinedType(value3);
  throw new ValueHashError(value3);
};
var FNV1A64 = function(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = Accumulator * Prime % Size;
};
function Hash(value3) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value3);
  return Accumulator;
}

class ValueHashError extends TypeBoxError {
  constructor(value3) {
    super(`Unable to hash value`);
    this.value = value3;
  }
}
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
var EscapeKey = function(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
};
var IsDefined = function(value3) {
  return value3 !== undefined;
};
var Create = function(errorType, schema, path, value3) {
  return { type: errorType, schema, path, value: value3, message: GetErrorFunction()({ errorType, path, schema, value: value3 }) };
};
function* FromAny(schema, references, path, value3) {
}
function* FromArray3(schema, references, path, value3) {
  if (!IsArray(value3)) {
    return yield Create(ValueErrorType.Array, schema, path, value3);
  }
  if (IsDefined(schema.minItems) && !(value3.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value3);
  }
  if (IsDefined(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value3);
  }
  for (let i = 0;i < value3.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value3[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value3);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4, index) => Visit4(containsSchema, references, `${path}${index}`, value4).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value3);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value3);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value3);
  }
}
function* FromAsyncIterator(schema, references, path, value3) {
  if (!IsAsyncIterator(value3))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value3);
}
function* FromBigInt(schema, references, path, value3) {
  if (!IsBigInt(value3))
    return yield Create(ValueErrorType.BigInt, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value3);
  }
}
function* FromBoolean(schema, references, path, value3) {
  if (!IsBoolean(value3))
    yield Create(ValueErrorType.Boolean, schema, path, value3);
}
function* FromConstructor(schema, references, path, value3) {
  yield* Visit4(schema.returns, references, path, value3.prototype);
}
function* FromDate(schema, references, path, value3) {
  if (!IsDate(value3))
    return yield Create(ValueErrorType.Date, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value3);
  }
}
function* FromFunction(schema, references, path, value3) {
  if (!IsFunction(value3))
    yield Create(ValueErrorType.Function, schema, path, value3);
}
function* FromInteger(schema, references, path, value3) {
  if (!IsInteger(value3))
    return yield Create(ValueErrorType.Integer, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value3);
  }
}
function* FromIntersect3(schema, references, path, value3) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value3).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value3);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value3);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value3[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value3) {
  if (!IsIterator(value3))
    yield Create(ValueErrorType.Iterator, schema, path, value3);
}
function* FromLiteral2(schema, references, path, value3) {
  if (!(value3 === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value3);
}
function* FromNever(schema, references, path, value3) {
  yield Create(ValueErrorType.Never, schema, path, value3);
}
function* FromNot(schema, references, path, value3) {
  if (Visit4(schema.not, references, path, value3).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value3);
}
function* FromNull(schema, references, path, value3) {
  if (!IsNull(value3))
    yield Create(ValueErrorType.Null, schema, path, value3);
}
function* FromNumber(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return yield Create(ValueErrorType.Number, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value3);
  }
}
function* FromObject(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value3);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value3)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey)) {
        yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      }
    }
  }
}
function* FromPromise(schema, references, path, value3) {
  if (!IsPromise(value3))
    yield Create(ValueErrorType.Promise, schema, path, value3);
}
function* FromRecord(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value3)) {
    if (regex.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (!regex.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (regex.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
function* FromRef(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromRegExp(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value3)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value3);
  }
}
function* FromString(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value3);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value3);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value3)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value3);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value3) {
  if (!IsSymbol(value3))
    yield Create(ValueErrorType.Symbol, schema, path, value3);
}
function* FromTemplateLiteral2(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value3)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value3);
  }
}
function* FromThis(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromTuple3(schema, references, path, value3) {
  if (!IsArray(value3))
    return yield Create(ValueErrorType.Tuple, schema, path, value3);
  if (schema.items === undefined && !(value3.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!(value3.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0;i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value3[i]);
  }
}
function* FromUndefined(schema, references, path, value3) {
  if (!IsUndefined(value3))
    yield Create(ValueErrorType.Undefined, schema, path, value3);
}
function* FromUnion5(schema, references, path, value3) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors2 = [...Visit4(subschema, references, path, value3)];
    if (errors2.length === 0)
      return;
    count += errors2.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value3);
  }
}
function* FromUint8Array(schema, references, path, value3) {
  if (!IsUint8Array(value3))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value3);
  if (IsDefined(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value3);
  }
  if (IsDefined(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value3);
  }
}
function* FromUnknown(schema, references, path, value3) {
}
function* FromVoid(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsVoidLike(value3))
    yield Create(ValueErrorType.Void, schema, path, value3);
}
function* FromKind(schema, references, path, value3) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value3))
    yield Create(ValueErrorType.Kind, schema, path, value3);
}
function* Visit4(schema, references, path, value3) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path, value3);
    case "Array":
      return yield* FromArray3(schema_, references_, path, value3);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path, value3);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path, value3);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path, value3);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path, value3);
    case "Date":
      return yield* FromDate(schema_, references_, path, value3);
    case "Function":
      return yield* FromFunction(schema_, references_, path, value3);
    case "Integer":
      return yield* FromInteger(schema_, references_, path, value3);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path, value3);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path, value3);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path, value3);
    case "Never":
      return yield* FromNever(schema_, references_, path, value3);
    case "Not":
      return yield* FromNot(schema_, references_, path, value3);
    case "Null":
      return yield* FromNull(schema_, references_, path, value3);
    case "Number":
      return yield* FromNumber(schema_, references_, path, value3);
    case "Object":
      return yield* FromObject(schema_, references_, path, value3);
    case "Promise":
      return yield* FromPromise(schema_, references_, path, value3);
    case "Record":
      return yield* FromRecord(schema_, references_, path, value3);
    case "Ref":
      return yield* FromRef(schema_, references_, path, value3);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path, value3);
    case "String":
      return yield* FromString(schema_, references_, path, value3);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path, value3);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path, value3);
    case "This":
      return yield* FromThis(schema_, references_, path, value3);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path, value3);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path, value3);
    case "Union":
      return yield* FromUnion5(schema_, references_, path, value3);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path, value3);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path, value3);
    case "Void":
      return yield* FromVoid(schema_, references_, path, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value3);
  }
}
function Errors(...args) {
  const iterator3 = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator3);
}
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
}

class ValueErrorIterator {
  constructor(iterator3) {
    this.iterator = iterator3;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => TypeGuardUnknownTypeError,
  IsVoid: () => IsVoid2,
  IsUnsafe: () => IsUnsafe2,
  IsUnknown: () => IsUnknown2,
  IsUnionLiteral: () => IsUnionLiteral,
  IsUnion: () => IsUnion2,
  IsUndefined: () => IsUndefined4,
  IsUint8Array: () => IsUint8Array4,
  IsTuple: () => IsTuple2,
  IsTransform: () => IsTransform2,
  IsThis: () => IsThis2,
  IsTemplateLiteral: () => IsTemplateLiteral2,
  IsSymbol: () => IsSymbol4,
  IsString: () => IsString4,
  IsSchema: () => IsSchema2,
  IsRegExp: () => IsRegExp3,
  IsRef: () => IsRef2,
  IsRecursive: () => IsRecursive,
  IsRecord: () => IsRecord2,
  IsReadonly: () => IsReadonly2,
  IsProperties: () => IsProperties,
  IsPromise: () => IsPromise3,
  IsOptional: () => IsOptional2,
  IsObject: () => IsObject4,
  IsNumber: () => IsNumber4,
  IsNull: () => IsNull4,
  IsNot: () => IsNot2,
  IsNever: () => IsNever2,
  IsMappedResult: () => IsMappedResult2,
  IsMappedKey: () => IsMappedKey2,
  IsLiteralValue: () => IsLiteralValue,
  IsLiteralString: () => IsLiteralString,
  IsLiteralNumber: () => IsLiteralNumber,
  IsLiteralBoolean: () => IsLiteralBoolean,
  IsLiteral: () => IsLiteral2,
  IsKindOf: () => IsKindOf2,
  IsKind: () => IsKind2,
  IsIterator: () => IsIterator4,
  IsIntersect: () => IsIntersect2,
  IsInteger: () => IsInteger3,
  IsFunction: () => IsFunction4,
  IsDate: () => IsDate4,
  IsConstructor: () => IsConstructor2,
  IsBoolean: () => IsBoolean4,
  IsBigInt: () => IsBigInt4,
  IsAsyncIterator: () => IsAsyncIterator4,
  IsArray: () => IsArray4,
  IsAny: () => IsAny2
});
var IsPattern = function(value3) {
  try {
    new RegExp(value3);
    return true;
  } catch {
    return false;
  }
};
var IsControlCharacterFree = function(value3) {
  if (!IsString2(value3))
    return false;
  for (let i = 0;i < value3.length; i++) {
    const code = value3.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
};
var IsAdditionalProperties = function(value3) {
  return IsOptionalBoolean(value3) || IsSchema2(value3);
};
var IsOptionalBigInt = function(value3) {
  return IsUndefined2(value3) || IsBigInt2(value3);
};
var IsOptionalNumber = function(value3) {
  return IsUndefined2(value3) || IsNumber2(value3);
};
var IsOptionalBoolean = function(value3) {
  return IsUndefined2(value3) || IsBoolean2(value3);
};
var IsOptionalString = function(value3) {
  return IsUndefined2(value3) || IsString2(value3);
};
var IsOptionalPattern = function(value3) {
  return IsUndefined2(value3) || IsString2(value3) && IsControlCharacterFree(value3) && IsPattern(value3);
};
var IsOptionalFormat = function(value3) {
  return IsUndefined2(value3) || IsString2(value3) && IsControlCharacterFree(value3);
};
var IsOptionalSchema = function(value3) {
  return IsUndefined2(value3) || IsSchema2(value3);
};
function IsReadonly2(value3) {
  return IsObject2(value3) && value3[ReadonlyKind] === "Readonly";
}
function IsOptional2(value3) {
  return IsObject2(value3) && value3[OptionalKind] === "Optional";
}
function IsAny2(value3) {
  return IsKindOf2(value3, "Any") && IsOptionalString(value3.$id);
}
function IsArray4(value3) {
  return IsKindOf2(value3, "Array") && value3.type === "array" && IsOptionalString(value3.$id) && IsSchema2(value3.items) && IsOptionalNumber(value3.minItems) && IsOptionalNumber(value3.maxItems) && IsOptionalBoolean(value3.uniqueItems) && IsOptionalSchema(value3.contains) && IsOptionalNumber(value3.minContains) && IsOptionalNumber(value3.maxContains);
}
function IsAsyncIterator4(value3) {
  return IsKindOf2(value3, "AsyncIterator") && value3.type === "AsyncIterator" && IsOptionalString(value3.$id) && IsSchema2(value3.items);
}
function IsBigInt4(value3) {
  return IsKindOf2(value3, "BigInt") && value3.type === "bigint" && IsOptionalString(value3.$id) && IsOptionalBigInt(value3.exclusiveMaximum) && IsOptionalBigInt(value3.exclusiveMinimum) && IsOptionalBigInt(value3.maximum) && IsOptionalBigInt(value3.minimum) && IsOptionalBigInt(value3.multipleOf);
}
function IsBoolean4(value3) {
  return IsKindOf2(value3, "Boolean") && value3.type === "boolean" && IsOptionalString(value3.$id);
}
function IsConstructor2(value3) {
  return IsKindOf2(value3, "Constructor") && value3.type === "Constructor" && IsOptionalString(value3.$id) && IsArray2(value3.parameters) && value3.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value3.returns);
}
function IsDate4(value3) {
  return IsKindOf2(value3, "Date") && value3.type === "Date" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximumTimestamp) && IsOptionalNumber(value3.exclusiveMinimumTimestamp) && IsOptionalNumber(value3.maximumTimestamp) && IsOptionalNumber(value3.minimumTimestamp) && IsOptionalNumber(value3.multipleOfTimestamp);
}
function IsFunction4(value3) {
  return IsKindOf2(value3, "Function") && value3.type === "Function" && IsOptionalString(value3.$id) && IsArray2(value3.parameters) && value3.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value3.returns);
}
function IsInteger3(value3) {
  return IsKindOf2(value3, "Integer") && value3.type === "integer" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximum) && IsOptionalNumber(value3.exclusiveMinimum) && IsOptionalNumber(value3.maximum) && IsOptionalNumber(value3.minimum) && IsOptionalNumber(value3.multipleOf);
}
function IsProperties(value3) {
  return IsObject2(value3) && Object.entries(value3).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema));
}
function IsIntersect2(value3) {
  return IsKindOf2(value3, "Intersect") && (IsString2(value3.type) && value3.type !== "object" ? false : true) && IsArray2(value3.allOf) && value3.allOf.every((schema) => IsSchema2(schema) && !IsTransform2(schema)) && IsOptionalString(value3.type) && (IsOptionalBoolean(value3.unevaluatedProperties) || IsOptionalSchema(value3.unevaluatedProperties)) && IsOptionalString(value3.$id);
}
function IsIterator4(value3) {
  return IsKindOf2(value3, "Iterator") && value3.type === "Iterator" && IsOptionalString(value3.$id) && IsSchema2(value3.items);
}
function IsKindOf2(value3, kind14) {
  return IsObject2(value3) && Kind in value3 && value3[Kind] === kind14;
}
function IsLiteralString(value3) {
  return IsLiteral2(value3) && IsString2(value3.const);
}
function IsLiteralNumber(value3) {
  return IsLiteral2(value3) && IsNumber2(value3.const);
}
function IsLiteralBoolean(value3) {
  return IsLiteral2(value3) && IsBoolean2(value3.const);
}
function IsLiteral2(value3) {
  return IsKindOf2(value3, "Literal") && IsOptionalString(value3.$id) && IsLiteralValue(value3.const);
}
function IsLiteralValue(value3) {
  return IsBoolean2(value3) || IsNumber2(value3) || IsString2(value3);
}
function IsMappedKey2(value3) {
  return IsKindOf2(value3, "MappedKey") && IsArray2(value3.keys) && value3.keys.every((key) => IsNumber2(key) || IsString2(key));
}
function IsMappedResult2(value3) {
  return IsKindOf2(value3, "MappedResult") && IsProperties(value3.properties);
}
function IsNever2(value3) {
  return IsKindOf2(value3, "Never") && IsObject2(value3.not) && Object.getOwnPropertyNames(value3.not).length === 0;
}
function IsNot2(value3) {
  return IsKindOf2(value3, "Not") && IsSchema2(value3.not);
}
function IsNull4(value3) {
  return IsKindOf2(value3, "Null") && value3.type === "null" && IsOptionalString(value3.$id);
}
function IsNumber4(value3) {
  return IsKindOf2(value3, "Number") && value3.type === "number" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximum) && IsOptionalNumber(value3.exclusiveMinimum) && IsOptionalNumber(value3.maximum) && IsOptionalNumber(value3.minimum) && IsOptionalNumber(value3.multipleOf);
}
function IsObject4(value3) {
  return IsKindOf2(value3, "Object") && value3.type === "object" && IsOptionalString(value3.$id) && IsProperties(value3.properties) && IsAdditionalProperties(value3.additionalProperties) && IsOptionalNumber(value3.minProperties) && IsOptionalNumber(value3.maxProperties);
}
function IsPromise3(value3) {
  return IsKindOf2(value3, "Promise") && value3.type === "Promise" && IsOptionalString(value3.$id) && IsSchema2(value3.item);
}
function IsRecord2(value3) {
  return IsKindOf2(value3, "Record") && value3.type === "object" && IsOptionalString(value3.$id) && IsAdditionalProperties(value3.additionalProperties) && IsObject2(value3.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema2(schema.patternProperties[keys[0]]);
  })(value3);
}
function IsRecursive(value3) {
  return IsObject2(value3) && Hint in value3 && value3[Hint] === "Recursive";
}
function IsRef2(value3) {
  return IsKindOf2(value3, "Ref") && IsOptionalString(value3.$id) && IsString2(value3.$ref);
}
function IsRegExp3(value3) {
  return IsKindOf2(value3, "RegExp") && IsOptionalString(value3.$id) && IsString2(value3.source) && IsString2(value3.flags) && IsOptionalNumber(value3.maxLength) && IsOptionalNumber(value3.minLength);
}
function IsString4(value3) {
  return IsKindOf2(value3, "String") && value3.type === "string" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.minLength) && IsOptionalNumber(value3.maxLength) && IsOptionalPattern(value3.pattern) && IsOptionalFormat(value3.format);
}
function IsSymbol4(value3) {
  return IsKindOf2(value3, "Symbol") && value3.type === "symbol" && IsOptionalString(value3.$id);
}
function IsTemplateLiteral2(value3) {
  return IsKindOf2(value3, "TemplateLiteral") && value3.type === "string" && IsString2(value3.pattern) && value3.pattern[0] === "^" && value3.pattern[value3.pattern.length - 1] === "$";
}
function IsThis2(value3) {
  return IsKindOf2(value3, "This") && IsOptionalString(value3.$id) && IsString2(value3.$ref);
}
function IsTransform2(value3) {
  return IsObject2(value3) && TransformKind in value3;
}
function IsTuple2(value3) {
  return IsKindOf2(value3, "Tuple") && value3.type === "array" && IsOptionalString(value3.$id) && IsNumber2(value3.minItems) && IsNumber2(value3.maxItems) && value3.minItems === value3.maxItems && (IsUndefined2(value3.items) && IsUndefined2(value3.additionalItems) && value3.minItems === 0 || IsArray2(value3.items) && value3.items.every((schema) => IsSchema2(schema)));
}
function IsUndefined4(value3) {
  return IsKindOf2(value3, "Undefined") && value3.type === "undefined" && IsOptionalString(value3.$id);
}
function IsUnionLiteral(value3) {
  return IsUnion2(value3) && value3.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
function IsUnion2(value3) {
  return IsKindOf2(value3, "Union") && IsOptionalString(value3.$id) && IsObject2(value3) && IsArray2(value3.anyOf) && value3.anyOf.every((schema) => IsSchema2(schema));
}
function IsUint8Array4(value3) {
  return IsKindOf2(value3, "Uint8Array") && value3.type === "Uint8Array" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.minByteLength) && IsOptionalNumber(value3.maxByteLength);
}
function IsUnknown2(value3) {
  return IsKindOf2(value3, "Unknown") && IsOptionalString(value3.$id);
}
function IsUnsafe2(value3) {
  return IsKindOf2(value3, "Unsafe");
}
function IsVoid2(value3) {
  return IsKindOf2(value3, "Void") && value3.type === "void" && IsOptionalString(value3.$id);
}
function IsKind2(value3) {
  return IsObject2(value3) && Kind in value3 && IsString2(value3[Kind]) && !KnownTypes.includes(value3[Kind]);
}
function IsSchema2(value3) {
  return IsObject2(value3) && (IsAny2(value3) || IsArray4(value3) || IsBoolean4(value3) || IsBigInt4(value3) || IsAsyncIterator4(value3) || IsConstructor2(value3) || IsDate4(value3) || IsFunction4(value3) || IsInteger3(value3) || IsIntersect2(value3) || IsIterator4(value3) || IsLiteral2(value3) || IsMappedKey2(value3) || IsMappedResult2(value3) || IsNever2(value3) || IsNot2(value3) || IsNull4(value3) || IsNumber4(value3) || IsObject4(value3) || IsPromise3(value3) || IsRecord2(value3) || IsRef2(value3) || IsRegExp3(value3) || IsString4(value3) || IsSymbol4(value3) || IsTemplateLiteral2(value3) || IsThis2(value3) || IsTuple2(value3) || IsUndefined4(value3) || IsUnion2(value3) || IsUint8Array4(value3) || IsUnknown2(value3) || IsUnsafe2(value3) || IsVoid2(value3) || IsKind2(value3));
}

class TypeGuardUnknownTypeError extends TypeBoxError {
}
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
var IntoBooleanResult = function(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
};
var Throw = function(message) {
  throw new ExtendsResolverError(message);
};
var IsStructuralRight = function(right) {
  return exports_type2.IsNever(right) || exports_type2.IsIntersect(right) || exports_type2.IsUnion(right) || exports_type2.IsUnknown(right) || exports_type2.IsAny(right);
};
var StructuralRight = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
};
var FromAnyRight = function(left, right) {
  return ExtendsResult.True;
};
var FromAny2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) && right.anyOf.some((schema) => exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)) ? ExtendsResult.True : exports_type2.IsUnion(right) ? ExtendsResult.Union : exports_type2.IsUnknown(right) ? ExtendsResult.True : exports_type2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
};
var FromArrayRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromArray4 = function(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromAsyncIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromBigInt2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBooleanRight = function(left, right) {
  return exports_type2.IsLiteralBoolean(left) ? ExtendsResult.True : exports_type2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBoolean2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromConstructor2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromDate2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromFunction2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromIntegerRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromInteger2 = function(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
};
var FromIntersectRight = function(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIntersect4 = function(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromLiteral3 = function(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
};
var FromNeverRight = function(left, right) {
  return ExtendsResult.False;
};
var FromNever2 = function(left, right) {
  return ExtendsResult.True;
};
var UnwrapTNot = function(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
};
var FromNot2 = function(left, right) {
  return exports_type2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : exports_type2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
};
var FromNull2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumberRight = function(left, right) {
  return exports_type2.IsLiteralNumber(left) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumber2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
};
var IsObjectPropertyCount = function(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
};
var IsObjectStringLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectSymbolLike = function(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && exports_type2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (exports_type2.IsString(schema.properties.description.anyOf[0]) && exports_type2.IsUndefined(schema.properties.description.anyOf[1]) || exports_type2.IsString(schema.properties.description.anyOf[1]) && exports_type2.IsUndefined(schema.properties.description.anyOf[0]));
};
var IsObjectNumberLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBooleanLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBigIntLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectDateLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectUint8ArrayLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectFunctionLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectConstructorLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectArrayLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectPromiseLike = function(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
};
var Property = function(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
};
var FromObjectRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) || exports_type2.IsLiteralString(left) && IsObjectStringLike(right) || exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right) || exports_type2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsBigInt(left) && IsObjectBigIntLike(right) || exports_type2.IsString(left) && IsObjectStringLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsNumber(left) && IsObjectNumberLike(right) || exports_type2.IsInteger(left) && IsObjectNumberLike(right) || exports_type2.IsBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || exports_type2.IsDate(left) && IsObjectDateLike(right) || exports_type2.IsConstructor(left) && IsObjectConstructorLike(right) || exports_type2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : exports_type2.IsRecord(left) && exports_type2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : exports_type2.IsRecord(left) && exports_type2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
};
var FromObject2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : !exports_type2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
};
var FromPromise2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !exports_type2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
};
var RecordKey = function(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : (PatternStringExact in schema.patternProperties) ? String2() : Throw("Unknown record key pattern");
};
var RecordValue = function(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : (PatternStringExact in schema.patternProperties) ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
};
var FromRecordRight = function(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) && exports_type2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsString(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsArray(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
};
var FromRecord2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
};
var FromRegExp2 = function(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
};
var FromStringRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const) ? ExtendsResult.True : exports_type2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromString2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromSymbol2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromTemplateLiteral3 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : exports_type2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
};
var IsArrayOfTuple = function(left, right) {
  return exports_type2.IsArray(right) && left.items !== undefined && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
};
var FromTupleRight = function(left, right) {
  return exports_type2.IsNever(left) ? ExtendsResult.True : exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
};
var FromTuple4 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : exports_type2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !exports_type2.IsTuple(right) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) || !exports_value.IsUndefined(left.items) && exports_value.IsUndefined(right.items) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUint8Array2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUndefined2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsVoid(right) ? FromVoidRight(left, right) : exports_type2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnionRight = function(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnion6 = function(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnknownRight = function(left, right) {
  return ExtendsResult.True;
};
var FromUnknown2 = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : exports_type2.IsArray(right) ? FromArrayRight(left, right) : exports_type2.IsTuple(right) ? FromTupleRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoidRight = function(left, right) {
  return exports_type2.IsUndefined(left) ? ExtendsResult.True : exports_type2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoid2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
};
var Visit5 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) || exports_type2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right) ? FromRegExp2(left, right) : exports_type2.IsNot(left) || exports_type2.IsNot(right) ? FromNot2(left, right) : exports_type2.IsAny(left) ? FromAny2(left, right) : exports_type2.IsArray(left) ? FromArray4(left, right) : exports_type2.IsBigInt(left) ? FromBigInt2(left, right) : exports_type2.IsBoolean(left) ? FromBoolean2(left, right) : exports_type2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : exports_type2.IsConstructor(left) ? FromConstructor2(left, right) : exports_type2.IsDate(left) ? FromDate2(left, right) : exports_type2.IsFunction(left) ? FromFunction2(left, right) : exports_type2.IsInteger(left) ? FromInteger2(left, right) : exports_type2.IsIntersect(left) ? FromIntersect4(left, right) : exports_type2.IsIterator(left) ? FromIterator2(left, right) : exports_type2.IsLiteral(left) ? FromLiteral3(left, right) : exports_type2.IsNever(left) ? FromNever2(left, right) : exports_type2.IsNull(left) ? FromNull2(left, right) : exports_type2.IsNumber(left) ? FromNumber2(left, right) : exports_type2.IsObject(left) ? FromObject2(left, right) : exports_type2.IsRecord(left) ? FromRecord2(left, right) : exports_type2.IsString(left) ? FromString2(left, right) : exports_type2.IsSymbol(left) ? FromSymbol2(left, right) : exports_type2.IsTuple(left) ? FromTuple4(left, right) : exports_type2.IsPromise(left) ? FromPromise2(left, right) : exports_type2.IsUint8Array(left) ? FromUint8Array2(left, right) : exports_type2.IsUndefined(left) ? FromUndefined2(left, right) : exports_type2.IsUnion(left) ? FromUnion6(left, right) : exports_type2.IsUnknown(left) ? FromUnknown2(left, right) : exports_type2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`);
};
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}

class ExtendsResolverError extends TypeBoxError {
}
var ExtendsResult;
(function(ExtendsResult2) {
  ExtendsResult2[ExtendsResult2["Union"] = 0] = "Union";
  ExtendsResult2[ExtendsResult2["True"] = 1] = "True";
  ExtendsResult2[ExtendsResult2["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
var FromProperties7 = function(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
};
var FromMappedResult6 = function(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
};
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
var ExtendsResolve = function(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
};
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
var FromPropertyKey = function(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
};
var FromPropertyKeys = function(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
};
var FromMappedKey2 = function(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
};
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
var IsAnyOrUnknown = function(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
};
var IsDefined2 = function(value3) {
  return value3 !== undefined;
};
var FromAny3 = function(schema, references, value3) {
  return true;
};
var FromArray5 = function(schema, references, value3) {
  if (!IsArray(value3))
    return false;
  if (IsDefined2(schema.minItems) && !(value3.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    return false;
  }
  if (!value3.every((value4) => Visit6(schema.items, references, value4))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4) => Visit6(containsSchema, references, value4) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
};
var FromAsyncIterator3 = function(schema, references, value3) {
  return IsAsyncIterator(value3);
};
var FromBigInt3 = function(schema, references, value3) {
  if (!IsBigInt(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
};
var FromBoolean3 = function(schema, references, value3) {
  return IsBoolean(value3);
};
var FromConstructor3 = function(schema, references, value3) {
  return Visit6(schema.returns, references, value3.prototype);
};
var FromDate3 = function(schema, references, value3) {
  if (!IsDate(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
};
var FromFunction3 = function(schema, references, value3) {
  return IsFunction(value3);
};
var FromInteger3 = function(schema, references, value3) {
  if (!IsInteger(value3)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromIntersect5 = function(schema, references, value3) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value3));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value3[key]));
    return check1 && check2;
  } else {
    return check1;
  }
};
var FromIterator3 = function(schema, references, value3) {
  return IsIterator(value3);
};
var FromLiteral4 = function(schema, references, value3) {
  return value3 === schema.const;
};
var FromNever3 = function(schema, references, value3) {
  return false;
};
var FromNot3 = function(schema, references, value3) {
  return !Visit6(schema.not, references, value3);
};
var FromNull3 = function(schema, references, value3) {
  return IsNull(value3);
};
var FromNumber3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromObject3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value3[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value3)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey) && !Visit6(property, references, value3[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value3);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value3);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value3[key]));
  } else {
    return true;
  }
};
var FromPromise3 = function(schema, references, value3) {
  return IsPromise(value3);
};
var FromRecord3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value3).every(([key, value4]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value4) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value3).every(([key, value4]) => {
    return !regex.test(key) ? Visit6(schema.additionalProperties, references, value4) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value3).every((key) => {
    return regex.test(key);
  }) : true;
  return check1 && check2 && check3;
};
var FromRef2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromRegExp3 = function(schema, references, value3) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  return regex.test(value3);
};
var FromString3 = function(schema, references, value3) {
  if (!IsString(value3)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format))
      return false;
    const func = exports_format.Get(schema.format);
    return func(value3);
  }
  return true;
};
var FromSymbol3 = function(schema, references, value3) {
  return IsSymbol(value3);
};
var FromTemplateLiteral4 = function(schema, references, value3) {
  return IsString(value3) && new RegExp(schema.pattern).test(value3);
};
var FromThis2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromTuple5 = function(schema, references, value3) {
  if (!IsArray(value3)) {
    return false;
  }
  if (schema.items === undefined && !(value3.length === 0)) {
    return false;
  }
  if (!(value3.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0;i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value3[i]))
      return false;
  }
  return true;
};
var FromUndefined3 = function(schema, references, value3) {
  return IsUndefined(value3);
};
var FromUnion7 = function(schema, references, value3) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value3));
};
var FromUint8Array3 = function(schema, references, value3) {
  if (!IsUint8Array(value3)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    return false;
  }
  return true;
};
var FromUnknown3 = function(schema, references, value3) {
  return true;
};
var FromVoid3 = function(schema, references, value3) {
  return TypeSystemPolicy.IsVoidLike(value3);
};
var FromKind2 = function(schema, references, value3) {
  if (!exports_type.Has(schema[Kind]))
    return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value3);
};
var Visit6 = function(schema, references, value3) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value3);
    case "Array":
      return FromArray5(schema_, references_, value3);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value3);
    case "BigInt":
      return FromBigInt3(schema_, references_, value3);
    case "Boolean":
      return FromBoolean3(schema_, references_, value3);
    case "Constructor":
      return FromConstructor3(schema_, references_, value3);
    case "Date":
      return FromDate3(schema_, references_, value3);
    case "Function":
      return FromFunction3(schema_, references_, value3);
    case "Integer":
      return FromInteger3(schema_, references_, value3);
    case "Intersect":
      return FromIntersect5(schema_, references_, value3);
    case "Iterator":
      return FromIterator3(schema_, references_, value3);
    case "Literal":
      return FromLiteral4(schema_, references_, value3);
    case "Never":
      return FromNever3(schema_, references_, value3);
    case "Not":
      return FromNot3(schema_, references_, value3);
    case "Null":
      return FromNull3(schema_, references_, value3);
    case "Number":
      return FromNumber3(schema_, references_, value3);
    case "Object":
      return FromObject3(schema_, references_, value3);
    case "Promise":
      return FromPromise3(schema_, references_, value3);
    case "Record":
      return FromRecord3(schema_, references_, value3);
    case "Ref":
      return FromRef2(schema_, references_, value3);
    case "RegExp":
      return FromRegExp3(schema_, references_, value3);
    case "String":
      return FromString3(schema_, references_, value3);
    case "Symbol":
      return FromSymbol3(schema_, references_, value3);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value3);
    case "This":
      return FromThis2(schema_, references_, value3);
    case "Tuple":
      return FromTuple5(schema_, references_, value3);
    case "Undefined":
      return FromUndefined3(schema_, references_, value3);
    case "Union":
      return FromUnion7(schema_, references_, value3);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value3);
    case "Unknown":
      return FromUnknown3(schema_, references_, value3);
    case "Void":
      return FromVoid3(schema_, references_, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value3);
  }
};
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}

class ValueCheckUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
var ObjectType3 = function(value3) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  return Acc;
};
var ArrayType3 = function(value3) {
  return value3.map((element) => Clone2(element));
};
var TypedArrayType = function(value3) {
  return value3.slice();
};
var DateType3 = function(value3) {
  return new Date(value3.toISOString());
};
var ValueType = function(value3) {
  return value3;
};
function Clone2(value3) {
  if (IsArray(value3))
    return ArrayType3(value3);
  if (IsDate(value3))
    return DateType3(value3);
  if (IsStandardObject(value3))
    return ObjectType3(value3);
  if (IsTypedArray(value3))
    return TypedArrayType(value3);
  if (IsValueType(value3))
    return ValueType(value3);
  throw new Error("ValueClone: Unable to clone value");
}
// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
var FromDefault = function(value3) {
  return typeof value3 === "function" ? value3 : Clone2(value3);
};
var FromAny4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromArray6 = function(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
};
var FromAsyncIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
};
var FromBigInt4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
};
var FromBoolean4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
};
var FromConstructor4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = Visit7(schema.returns, references);
    if (typeof value3 === "object" && !Array.isArray(value3)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value3)) {
            const self = this;
            self[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
};
var FromDate4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date;
  }
};
var FromFunction4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
};
var FromInteger4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromIntersect6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value3))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value3;
  }
};
var FromIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
};
var FromLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
};
var FromNever4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
};
var FromNot4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
};
var FromNull4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
};
var FromNumber4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromObject4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key))
        continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
};
var FromPromise4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
};
var FromRecord4 = function(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    const Acc = {};
    for (const key of propertyKeys)
      Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
};
var FromRef3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromRegExp4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
};
var FromString4 = function(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
};
var FromSymbol4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
};
var FromTemplateLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
};
var FromThis3 = function(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromTuple6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
};
var FromUndefined4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromUnion8 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
};
var FromUint8Array4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
};
var FromUnknown4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromVoid4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromKind3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
};
var Visit7 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
};
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}

class ValueCreateError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
var ScoreUnion = function(schema, references, value3) {
  if (schema[Kind] === "Object" && typeof value3 === "object" && !IsNull(value3)) {
    const object3 = schema;
    const keys = Object.getOwnPropertyNames(value3);
    const entries = Object.entries(object3.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal7 = schema2[Kind] === "Literal" && schema2.const === value3[key] ? max : 0;
      const checks = Check(schema2, references, value3[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal7 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value3) ? 1 : 0;
  }
};
var SelectUnion = function(union9, references, value3) {
  const schemas = union9.anyOf.map((schema) => Deref(schema, references));
  let [select, best] = [schemas[0], 0];
  for (const schema of schemas) {
    const score = ScoreUnion(schema, references, value3);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
};
var CastUnion = function(union9, references, value3) {
  if ("default" in union9) {
    return typeof value3 === "function" ? union9.default : Clone2(union9.default);
  } else {
    const schema = SelectUnion(union9, references, value3);
    return Cast(schema, references, value3);
  }
};
var DefaultClone = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : Create2(schema, references);
};
var Default = function(schema, references, value3) {
  return Check(schema, references, value3) ? value3 : Create2(schema, references);
};
var FromArray7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  const created = IsArray(value3) ? Clone2(value3) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value4) => Visit8(schema.items, references, value4));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
};
var FromConstructor5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function() {
  };
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value3.prototype[key] === undefined)
      continue;
    result.prototype[key] = Visit8(property, references, value3.prototype[key]);
  }
  return result;
};
var FromIntersect7 = function(schema, references, value3) {
  const created = Create2(schema, references);
  const mapped9 = IsStandardObject(created) && IsStandardObject(value3) ? { ...created, ...value3 } : value3;
  return Check(schema, references, mapped9) ? mapped9 : Create2(schema, references);
};
var FromNever5 = function(schema, references, value3) {
  throw new ValueCastError(schema, "Never types cannot be cast");
};
var FromObject5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return value3;
  if (value3 === null || typeof value3 !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value3[key] === undefined)
      continue;
    result[key] = Visit8(property, references, value3[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value3)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value3[propertyName]);
    }
  }
  return result;
};
var FromRecord5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (value3 === null || typeof value3 !== "object" || Array.isArray(value3) || value3 instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
};
var FromRef4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromThis4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromTuple7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (!IsArray(value3))
    return Create2(schema, references);
  if (schema.items === undefined)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value3[index]));
};
var FromUnion9 = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : CastUnion(schema, references, value3);
};
var Visit8 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value3);
    case "Constructor":
      return FromConstructor5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect7(schema_, references_, value3);
    case "Never":
      return FromNever5(schema_, references_, value3);
    case "Object":
      return FromObject5(schema_, references_, value3);
    case "Record":
      return FromRecord5(schema_, references_, value3);
    case "Ref":
      return FromRef4(schema_, references_, value3);
    case "This":
      return FromThis4(schema_, references_, value3);
    case "Tuple":
      return FromTuple7(schema_, references_, value3);
    case "Union":
      return FromUnion9(schema_, references_, value3);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value3);
    default:
      return Default(schema_, references_, value3);
  }
};
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}

class ValueCastError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
var IsCheckable = function(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
};
var FromArray8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  return value3.map((value4) => Visit9(schema.items, references, value4));
};
var FromIntersect8 = function(schema, references, value3) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value3)));
  const composite = intersections.reduce((acc, value4) => IsObject(value4) ? { ...acc, ...value4 } : value4, {});
  if (!IsObject(value3) || !IsObject(composite) || !IsSchema2(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value3[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value3[key]);
    }
  }
  return composite;
};
var FromObject6 = function(schema, references, value3) {
  if (!IsObject(value3) || IsArray(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (key in schema.properties) {
      value3[key] = Visit9(schema.properties[key], references, value3[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRecord6 = function(schema, references, value3) {
  if (!IsObject(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value3);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value3[key] = Visit9(propertySchema, references, value3[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRef5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromThis5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromTuple8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value3.length, schema.items.length);
  for (let i = 0;i < length; i++) {
    value3[i] = Visit9(schema.items[i], references, value3[i]);
  }
  return value3.length > length ? value3.slice(0, length) : value3;
};
var FromUnion10 = function(schema, references, value3) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value3)) {
      return Visit9(inner, references, value3);
    }
  }
  return value3;
};
var Visit9 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value3);
    case "Intersect":
      return FromIntersect8(schema_, references_, value3);
    case "Object":
      return FromObject6(schema_, references_, value3);
    case "Record":
      return FromRecord6(schema_, references_, value3);
    case "Ref":
      return FromRef5(schema_, references_, value3);
    case "This":
      return FromThis5(schema_, references_, value3);
    case "Tuple":
      return FromTuple8(schema_, references_, value3);
    case "Union":
      return FromUnion10(schema_, references_, value3);
    default:
      return value3;
  }
};
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
var IsStringNumeric = function(value3) {
  return IsString(value3) && !isNaN(value3) && !isNaN(parseFloat(value3));
};
var IsValueToString = function(value3) {
  return IsBigInt(value3) || IsBoolean(value3) || IsNumber(value3);
};
var IsValueTrue = function(value3) {
  return value3 === true || IsNumber(value3) && value3 === 1 || IsBigInt(value3) && value3 === BigInt("1") || IsString(value3) && (value3.toLowerCase() === "true" || value3 === "1");
};
var IsValueFalse = function(value3) {
  return value3 === false || IsNumber(value3) && (value3 === 0 || Object.is(value3, -0)) || IsBigInt(value3) && value3 === BigInt("0") || IsString(value3) && (value3.toLowerCase() === "false" || value3 === "0" || value3 === "-0");
};
var IsTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsDateTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateString = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value3);
};
var TryConvertLiteralString = function(value3, target) {
  const conversion = TryConvertString(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralNumber = function(value3, target) {
  const conversion = TryConvertNumber(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralBoolean = function(value3, target) {
  const conversion = TryConvertBoolean(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteral = function(schema, value3) {
  return IsString(schema.const) ? TryConvertLiteralString(value3, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value3, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value3, schema.const) : Clone2(value3);
};
var TryConvertBoolean = function(value3) {
  return IsValueTrue(value3) ? true : IsValueFalse(value3) ? false : value3;
};
var TryConvertBigInt = function(value3) {
  return IsStringNumeric(value3) ? BigInt(parseInt(value3)) : IsNumber(value3) ? BigInt(value3 | 0) : IsValueFalse(value3) ? BigInt(0) : IsValueTrue(value3) ? BigInt(1) : value3;
};
var TryConvertString = function(value3) {
  return IsValueToString(value3) ? value3.toString() : IsSymbol(value3) && value3.description !== undefined ? value3.description.toString() : value3;
};
var TryConvertNumber = function(value3) {
  return IsStringNumeric(value3) ? parseFloat(value3) : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertInteger = function(value3) {
  return IsStringNumeric(value3) ? parseInt(value3) : IsNumber(value3) ? value3 | 0 : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertNull = function(value3) {
  return IsString(value3) && value3.toLowerCase() === "null" ? null : value3;
};
var TryConvertUndefined = function(value3) {
  return IsString(value3) && value3 === "undefined" ? undefined : value3;
};
var TryConvertDate = function(value3) {
  return IsDate(value3) ? value3 : IsNumber(value3) ? new Date(value3) : IsValueTrue(value3) ? new Date(1) : IsValueFalse(value3) ? new Date(0) : IsStringNumeric(value3) ? new Date(parseInt(value3)) : IsTimeStringWithoutTimeZone(value3) ? new Date(`1970-01-01T${value3}.000Z`) : IsTimeStringWithTimeZone(value3) ? new Date(`1970-01-01T${value3}`) : IsDateTimeStringWithoutTimeZone(value3) ? new Date(`${value3}.000Z`) : IsDateTimeStringWithTimeZone(value3) ? new Date(value3) : IsDateString(value3) ? new Date(`${value3}T00:00:00.000Z`) : value3;
};
var Default2 = function(value3) {
  return value3;
};
var FromArray9 = function(schema, references, value3) {
  const elements = IsArray(value3) ? value3 : [value3];
  return elements.map((element) => Visit10(schema.items, references, element));
};
var FromBigInt5 = function(schema, references, value3) {
  return TryConvertBigInt(value3);
};
var FromBoolean5 = function(schema, references, value3) {
  return TryConvertBoolean(value3);
};
var FromDate5 = function(schema, references, value3) {
  return TryConvertDate(value3);
};
var FromInteger5 = function(schema, references, value3) {
  return TryConvertInteger(value3);
};
var FromIntersect9 = function(schema, references, value3) {
  return schema.allOf.reduce((value4, schema2) => Visit10(schema2, references, value4), value3);
};
var FromLiteral6 = function(schema, references, value3) {
  return TryConvertLiteral(schema, value3);
};
var FromNull5 = function(schema, references, value3) {
  return TryConvertNull(value3);
};
var FromNumber5 = function(schema, references, value3) {
  return TryConvertNumber(value3);
};
var FromObject7 = function(schema, references, value3) {
  const isConvertable = IsObject(value3);
  if (!isConvertable)
    return value3;
  const result = {};
  for (const key of Object.keys(value3)) {
    result[key] = HasPropertyKey(schema.properties, key) ? Visit10(schema.properties[key], references, value3[key]) : value3[key];
  }
  return result;
};
var FromRecord7 = function(schema, references, value3) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
};
var FromRef6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromString5 = function(schema, references, value3) {
  return TryConvertString(value3);
};
var FromSymbol5 = function(schema, references, value3) {
  return IsString(value3) || IsNumber(value3) ? Symbol(value3) : value3;
};
var FromThis6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromTuple9 = function(schema, references, value3) {
  const isConvertable = IsArray(value3) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value3;
  return value3.map((value4, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value4) : value4;
  });
};
var FromUndefined5 = function(schema, references, value3) {
  return TryConvertUndefined(value3);
};
var FromUnion11 = function(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value3);
    if (!Check(subschema, references, converted))
      continue;
    return converted;
  }
  return value3;
};
var Visit10 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value3);
    case "BigInt":
      return FromBigInt5(schema_, references_, value3);
    case "Boolean":
      return FromBoolean5(schema_, references_, value3);
    case "Date":
      return FromDate5(schema_, references_, value3);
    case "Integer":
      return FromInteger5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect9(schema_, references_, value3);
    case "Literal":
      return FromLiteral6(schema_, references_, value3);
    case "Null":
      return FromNull5(schema_, references_, value3);
    case "Number":
      return FromNumber5(schema_, references_, value3);
    case "Object":
      return FromObject7(schema_, references_, value3);
    case "Record":
      return FromRecord7(schema_, references_, value3);
    case "Ref":
      return FromRef6(schema_, references_, value3);
    case "String":
      return FromString5(schema_, references_, value3);
    case "Symbol":
      return FromSymbol5(schema_, references_, value3);
    case "This":
      return FromThis6(schema_, references_, value3);
    case "Tuple":
      return FromTuple9(schema_, references_, value3);
    case "Undefined":
      return FromUndefined5(schema_, references_, value3);
    case "Union":
      return FromUnion11(schema_, references_, value3);
    default:
      return Default2(value3);
  }
};
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
var ValueOrDefault = function(schema, value3) {
  return value3 === undefined && "default" in schema ? Clone2(schema.default) : value3;
};
var IsCheckable2 = function(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
};
var IsDefaultSchema = function(value3) {
  return IsSchema2(value3) && "default" in value3;
};
var FromArray10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0;i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
};
var FromIntersect10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
};
var FromObject8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRecord8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRef7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value3));
};
var FromThis7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, value3);
};
var FromTuple10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0;i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
};
var FromUnion12 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
};
var Visit11 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value3);
    case "Intersect":
      return FromIntersect10(schema_, references_, value3);
    case "Object":
      return FromObject8(schema_, references_, value3);
    case "Record":
      return FromRecord8(schema_, references_, value3);
    case "Ref":
      return FromRef7(schema_, references_, value3);
    case "This":
      return FromThis7(schema_, references_, value3);
    case "Tuple":
      return FromTuple10(schema_, references_, value3);
    case "Union":
      return FromUnion12(schema_, references_, value3);
    default:
      return ValueOrDefault(schema_, value3);
  }
};
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => ValuePointerRootSetError,
  ValuePointerRootDeleteError: () => ValuePointerRootDeleteError,
  Set: () => Set4,
  Has: () => Has3,
  Get: () => Get3,
  Format: () => Format,
  Delete: () => Delete3
});
var Escape2 = function(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
};
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0;i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value3, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value3, pointer, update);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value3, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value3, pointer);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value3, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value3, pointer) {
  if (pointer === "")
    return value3;
  let current = value3;
  for (const component of Format(pointer)) {
    if (current[component] === undefined)
      return;
    current = current[component];
  }
  return current;
}

class ValuePointerRootSetError extends TypeBoxError {
  constructor(value3, path, update) {
    super("Cannot set root value");
    this.value = value3;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  constructor(value3, path) {
    super("Cannot delete root value");
    this.value = value3;
    this.path = path;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
var CreateUpdate = function(path, value3) {
  return { type: "update", path, value: value3 };
};
var CreateInsert = function(path, value3) {
  return { type: "insert", path, value: value3 };
};
var CreateDelete = function(path) {
  return { type: "delete", path };
};
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0;i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1;i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
var IsRootUpdate = function(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
};
var IsIdentity = function(edits) {
  return edits.length === 0;
};
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone8 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "update": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "delete": {
        exports_pointer.Delete(clone8, edit.path);
        break;
      }
    }
  }
  return clone8;
}
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  constructor(value3, message) {
    super(message);
    this.value = value3;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  constructor(value3) {
    super(value3, "Cannot diff objects with symbol keys");
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
var ObjectType5 = function(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
};
var DateType4 = function(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
};
var ArrayType5 = function(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var TypedArrayType3 = function(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var ValueType3 = function(left, right) {
  return left === right;
};
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
var ObjectType6 = function(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
};
var ArrayType6 = function(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0;index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
};
var TypedArrayType4 = function(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0;i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
};
var ValueType4 = function(root, path, current, next) {
  if (current === next)
    return;
  exports_pointer.Set(root, path, next);
};
var Visit13 = function(root, path, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path, current, next);
  if (IsValueType(next))
    return ValueType4(root, path, current, next);
};
var IsNonMutableValue = function(value3) {
  return IsTypedArray(value3) || IsValueType(value3);
};
var IsMismatchedValue = function(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
};
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}

class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
var Default4 = function(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value3) : value3;
  } catch (error19) {
    throw new TransformDecodeError(schema, path, value3, error19);
  }
};
var FromArray11 = function(schema, references, path, value3) {
  return IsArray(value3) ? Default4(schema, path, value3.map((value4, index) => Visit14(schema.items, references, `${path}/${index}`, value4))) : Default4(schema, path, value3);
};
var FromIntersect11 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3) || IsValueType(value3))
    return Default4(schema, path, value3);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value3 };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(unevaluatedProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromNot5 = function(schema, references, path, value3) {
  return Default4(schema, path, Visit14(schema.not, references, path, value3));
};
var FromObject9 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, path, value3);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value3 };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromRecord9 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, path, value3);
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...value3 };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(schema.patternProperties[pattern3], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromRef8 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
};
var FromThis8 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
};
var FromTuple11 = function(schema, references, path, value3) {
  return IsArray(value3) && IsArray(schema.items) ? Default4(schema, path, schema.items.map((schema2, index) => Visit14(schema2, references, `${path}/${index}`, value3[index]))) : Default4(schema, path, value3);
};
var FromUnion13 = function(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const decoded = Visit14(subschema, references, path, value3);
    return Default4(schema, path, decoded);
  }
  return Default4(schema, path, value3);
};
var Visit14 = function(schema, references, path, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, path, value3);
    case "Intersect":
      return FromIntersect11(schema_, references_, path, value3);
    case "Not":
      return FromNot5(schema_, references_, path, value3);
    case "Object":
      return FromObject9(schema_, references_, path, value3);
    case "Record":
      return FromRecord9(schema_, references_, path, value3);
    case "Ref":
      return FromRef8(schema_, references_, path, value3);
    case "Symbol":
      return Default4(schema_, path, value3);
    case "This":
      return FromThis8(schema_, references_, path, value3);
    case "Tuple":
      return FromTuple11(schema_, references_, path, value3);
    case "Union":
      return FromUnion13(schema_, references_, path, value3);
    default:
      return Default4(schema_, path, value3);
  }
};
function TransformDecode(schema, references, value3) {
  return Visit14(schema, references, "", value3);
}

class TransformDecodeCheckError extends TypeBoxError {
  constructor(schema, value3, error19) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error19;
  }
}

class TransformDecodeError extends TypeBoxError {
  constructor(schema, path, value3, error19) {
    super(error19 instanceof Error ? error19.message : "Unknown error");
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error19;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
var Default5 = function(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value3) : value3;
  } catch (error20) {
    throw new TransformEncodeError(schema, path, value3, error20);
  }
};
var FromArray12 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  return IsArray(defaulted) ? defaulted.map((value4, index) => Visit15(schema.items, references, `${path}/${index}`, value4)) : defaulted;
};
var FromIntersect12 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3) || IsValueType(value3))
    return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(unevaluatedProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromNot6 = function(schema, references, path, value3) {
  return Default5(schema.not, path, Default5(schema, path, value3));
};
var FromObject10 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(defaulted))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromRecord10 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3))
    return defaulted;
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(schema.patternProperties[pattern3], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromRef9 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
};
var FromThis9 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
};
var FromTuple12 = function(schema, references, path, value3) {
  const value1 = Default5(schema, path, value3);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, `${path}/${index}`, value1[index])) : [];
};
var FromUnion14 = function(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const value1 = Visit15(subschema, references, path, value3);
    return Default5(schema, path, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path, value3);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, path, value1);
  }
  return Default5(schema, path, value3);
};
var Visit15 = function(schema, references, path, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, path, value3);
    case "Intersect":
      return FromIntersect12(schema_, references_, path, value3);
    case "Not":
      return FromNot6(schema_, references_, path, value3);
    case "Object":
      return FromObject10(schema_, references_, path, value3);
    case "Record":
      return FromRecord10(schema_, references_, path, value3);
    case "Ref":
      return FromRef9(schema_, references_, path, value3);
    case "This":
      return FromThis9(schema_, references_, path, value3);
    case "Tuple":
      return FromTuple12(schema_, references_, path, value3);
    case "Union":
      return FromUnion14(schema_, references_, path, value3);
    default:
      return Default5(schema_, path, value3);
  }
};
function TransformEncode(schema, references, value3) {
  return Visit15(schema, references, "", value3);
}

class TransformEncodeCheckError extends TypeBoxError {
  constructor(schema, value3, error20) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error20;
  }
}

class TransformEncodeError extends TypeBoxError {
  constructor(schema, path, value3, error20) {
    super(`${error20 instanceof Error ? error20.message : "Unknown error"}`);
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error20;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
var FromArray13 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromAsyncIterator5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromConstructor6 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromFunction5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromIntersect13 = function(schema, references) {
  return IsTransform2(schema) || IsTransform2(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
};
var FromIterator5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromNot7 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
};
var FromObject11 = function(schema, references) {
  return IsTransform2(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema2(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
};
var FromPromise5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
};
var FromRecord11 = function(schema, references) {
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern3];
  return IsTransform2(schema) || Visit16(property, references) || IsSchema2(schema.additionalProperties) && IsTransform2(schema.additionalProperties);
};
var FromRef10 = function(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromThis10 = function(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromTuple13 = function(schema, references) {
  return IsTransform2(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
};
var FromUnion15 = function(schema, references) {
  return IsTransform2(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
};
var Visit16 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
};
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
var visited = new Set;
// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => Patch2,
  Mutate: () => Mutate2,
  Hash: () => Hash2,
  Errors: () => Errors2,
  Equal: () => Equal2,
  Encode: () => Encode,
  Diff: () => Diff2,
  Default: () => Default6,
  Decode: () => Decode,
  Create: () => Create3,
  Convert: () => Convert2,
  Clone: () => Clone3,
  Clean: () => Clean2,
  Check: () => Check2,
  Cast: () => Cast2
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value3) {
  return Clone2(value3);
}
function Decode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value3))
    throw new TransformDecodeCheckError(schema, value3, Errors2(schema, references, value3).First());
  return HasTransform(schema, references) ? TransformDecode(schema, references, value3) : value3;
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references) ? TransformEncode(schema, references, value3) : value3;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, encoded, Errors2(schema, references, encoded).First());
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value3) {
  return Hash(value3);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
var FromRest4 = function(T) {
  return T.map((L) => AwaitedResolve(L));
};
var FromIntersect14 = function(T) {
  return Intersect(FromRest4(T));
};
var FromUnion16 = function(T) {
  return Union(FromRest4(T));
};
var FromPromise6 = function(T) {
  return AwaitedResolve(T);
};
var AwaitedResolve = function(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
};
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
var CompositeKeys = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
};
var FilterNever = function(T) {
  return T.filter((L) => !IsNever(L));
};
var CompositeProperty = function(T, K) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
};
var CompositeProperties = function(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
};
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
var FromArray14 = function(T) {
  return T.map((L) => FromValue(L, false));
};
var FromProperties8 = function(value5) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value5))
    Acc[K] = Readonly(FromValue(value5[K], false));
  return Acc;
};
var ConditionalReadonly = function(T, root) {
  return root === true ? T : Readonly(T);
};
var FromValue = function(value5, root) {
  return IsAsyncIterator2(value5) ? ConditionalReadonly(Any(), root) : IsIterator2(value5) ? ConditionalReadonly(Any(), root) : IsArray2(value5) ? Readonly(Tuple(FromArray14(value5))) : IsUint8Array2(value5) ? Uint8Array2() : IsDate2(value5) ? Date2() : IsObject2(value5) ? ConditionalReadonly(Object2(FromProperties8(value5)), root) : IsFunction2(value5) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value5) ? Undefined() : IsNull2(value5) ? Null() : IsSymbol2(value5) ? Symbol2() : IsBigInt2(value5) ? BigInt2() : IsNumber2(value5) ? Literal(value5) : IsBoolean2(value5) ? Literal(value5) : IsString2(value5) ? Literal(value5) : Object2({});
};
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
var FromRest5 = function(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
};
var FromProperties9 = function(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
};
var FromConstructor7 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromFunction6 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromIntersect15 = function(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
};
var FromUnion17 = function(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
};
var FromTuple14 = function(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
};
var FromArray15 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromObject12 = function(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
};
var FromPromise7 = function(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
};
var FromAsyncIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromRef11 = function(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with \$id ${schema.$ref}`);
  const discard8 = Discard(target, ["$id"]);
  return Deref2(discard8, references);
};
var DerefResolve = function(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
};
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value7) => Literal(value7));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
var ExcludeRest = function(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
};
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
var FromProperties10 = function(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
};
var FromMappedResult7 = function(R, T) {
  return FromProperties10(R.properties, T);
};
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
var ExtractRest = function(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
};
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
var FromProperties11 = function(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
};
var FromMappedResult8 = function(R, T) {
  return FromProperties11(R.properties, T);
};
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
var MappedIntrinsicPropertyKey = function(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
};
var MappedIntrinsicPropertyKeys = function(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
};
var MappedIntrinsicProperties = function(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
};
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
var ApplyUncapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toLowerCase(), rest].join("");
};
var ApplyCapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toUpperCase(), rest].join("");
};
var ApplyUppercase = function(value7) {
  return value7.toUpperCase();
};
var ApplyLowercase = function(value7) {
  return value7.toLowerCase();
};
var FromTemplateLiteral6 = function(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite3 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite3)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value7) => Literal(value7));
  const mapped12 = FromRest6(literals, mode);
  const union15 = Union(mapped12);
  return TemplateLiteral([union15], options);
};
var FromLiteralValue = function(value7, mode) {
  return typeof value7 === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value7) : mode === "Capitalize" ? ApplyCapitalize(value7) : mode === "Uppercase" ? ApplyUppercase(value7) : mode === "Lowercase" ? ApplyLowercase(value7) : value7 : value7.toString();
};
var FromRest6 = function(T, M) {
  return T.map((L) => Intrinsic(L, M));
};
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema;
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
var FromProperties12 = function(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
};
var FromMappedResult9 = function(R, K, options) {
  return FromProperties12(R.properties, K, options);
};
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
var FromIntersect16 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromUnion18 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromProperty2 = function(T, K) {
  const { [K]: _, ...R } = T;
  return R;
};
var FromProperties13 = function(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
};
var OmitResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
};
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
var FromPropertyKey2 = function(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
};
var FromPropertyKeys2 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
};
var FromMappedKey3 = function(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
};
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
var FromRest7 = function(T) {
  return T.map((L) => PartialResolve(L));
};
var FromProperties14 = function(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
};
var PartialResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
};
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
var FromProperties15 = function(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
};
var FromMappedResult10 = function(R, options) {
  return FromProperties15(R.properties, options);
};
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
var FromProperties16 = function(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
};
var FromMappedResult11 = function(R, K, options) {
  return FromProperties16(R.properties, K, options);
};
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
var FromIntersect17 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromUnion19 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromProperties17 = function(T, K) {
  const Acc = {};
  for (const K2 of K)
    if (K2 in T)
      Acc[K2] = T[K2];
  return Acc;
};
var PickResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
};
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
var FromPropertyKey3 = function(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
};
var FromPropertyKeys3 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
};
var FromMappedKey4 = function(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
};
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
var RecordCreateFromPattern = function(pattern3, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern3]: CloneType(T) }
  };
};
var RecordCreateFromKeys = function(K, T, options) {
  const Acc = {};
  for (const K2 of K)
    Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: "Record" });
};
var FromTemplateLiteralKey = function(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
};
var FromUnionKey = function(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
};
var FromLiteralKey = function(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
};
var FromRegExpKey = function(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
};
var FromStringKey = function(K, T, options) {
  const pattern3 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern3, T, options);
};
var FromIntegerKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
var FromNumberKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
var Ordinal = 0;
// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
var FromRest8 = function(T) {
  return T.map((L) => RequiredResolve(L));
};
var FromProperties18 = function(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
};
var RequiredResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
};
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
var FromProperties19 = function(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
};
var FromMappedResult12 = function(R, options) {
  return FromProperties19(R.properties, options);
};
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
var RestResolve = function(T) {
  return IsIntersect(T) ? CloneRest(T.allOf) : IsUnion(T) ? CloneRest(T.anyOf) : IsTuple(T) ? CloneRest(T.items ?? []) : [];
};
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}

class TransformDecodeBuilder {
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value11) => schema2[TransformKind].Encode(encode2(value11));
    const Decode2 = (value11) => this.decode(schema2[TransformKind].Decode(value11));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2) ? this.EncodeTransform(encode2, schema2) : this.EncodeSchema(encode2, schema2);
  }
}
// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => Void,
  Uppercase: () => Uppercase,
  Unsafe: () => Unsafe,
  Unknown: () => Unknown,
  Union: () => Union,
  Undefined: () => Undefined,
  Uncapitalize: () => Uncapitalize,
  Uint8Array: () => Uint8Array2,
  Tuple: () => Tuple,
  Transform: () => Transform,
  TemplateLiteral: () => TemplateLiteral,
  Symbol: () => Symbol2,
  String: () => String2,
  Strict: () => Strict,
  ReturnType: () => ReturnType,
  Rest: () => Rest,
  Required: () => Required,
  RegExp: () => RegExp2,
  Ref: () => Ref,
  Recursive: () => Recursive,
  Record: () => Record,
  ReadonlyOptional: () => ReadonlyOptional,
  Readonly: () => Readonly,
  Promise: () => Promise2,
  Pick: () => Pick,
  Partial: () => Partial,
  Parameters: () => Parameters,
  Optional: () => Optional,
  Omit: () => Omit,
  Object: () => Object2,
  Number: () => Number2,
  Null: () => Null,
  Not: () => Not2,
  Never: () => Never,
  Mapped: () => Mapped,
  Lowercase: () => Lowercase,
  Literal: () => Literal,
  KeyOf: () => KeyOf,
  Iterator: () => Iterator,
  Intersect: () => Intersect,
  Integer: () => Integer,
  InstanceType: () => InstanceType,
  Index: () => Index,
  Function: () => Function2,
  Extract: () => Extract,
  Extends: () => Extends,
  Exclude: () => Exclude,
  Enum: () => Enum,
  Deref: () => Deref2,
  Date: () => Date2,
  ConstructorParameters: () => ConstructorParameters,
  Constructor: () => Constructor,
  Const: () => Const,
  Composite: () => Composite,
  Capitalize: () => Capitalize,
  Boolean: () => Boolean2,
  BigInt: () => BigInt2,
  Awaited: () => Awaited,
  AsyncIterator: () => AsyncIterator,
  Array: () => Array2,
  Any: () => Any
});

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
class TypeCheck {
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value11) {
    return Errors(this.schema, this.references, value11);
  }
  Check(value11) {
    return this.checkFunc(value11);
  }
  Decode(value11) {
    if (!this.checkFunc(value11))
      throw new TransformDecodeCheckError(this.schema, value11, this.Errors(value11).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value11) : value11;
  }
  Encode(value11) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value11) : value11;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value11, this.Errors(value11).First());
    return encoded;
  }
}
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value11) {
    if (value11.length === 0)
      return false;
    return Character.IsNumeric(value11.charCodeAt(0));
  }
  function IsAccessor(value11) {
    if (IsFirstCharacterNumeric(value11))
      return false;
    for (let i = 0;i < value11.length; i++) {
      const code = value11.charCodeAt(i);
      const check11 = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check11)
        return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object13, key) {
    return IsAccessor(key) ? `${object13}.${key}` : `${object13}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0;i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  constructor(schema3) {
    super("Unknown type");
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  constructor(schema3) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema3;
  }
}
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value11, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value11} ? ${expression} : true)` : `(${MemberExpression.Encode(value11, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}))` : `(typeof ${value11} === 'object' && ${value11} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}) && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))` : `(typeof ${value11} === 'object' && ${value11} !== null && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value11) {
    return TypeSystemPolicy.AllowNaN ? `typeof ${value11} === 'number'` : `Number.isFinite(${value11})`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value11) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value11} === undefined || ${value11} === null)` : `${value11} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === "Any" || schema3[Kind] === "Unknown";
  }
  function* FromAny5(schema3, references, value11) {
    yield "true";
  }
  function* FromArray16(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema3.maxItems))
      yield `${value11}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value11}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(schema3.items, references, "value");
    yield `${value11}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema2(schema3.contains) || IsNumber(schema3.minContains) || IsNumber(schema3.maxContains)) {
      const containsSchema = IsSchema2(schema3.contains) ? schema3.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema3.minContains) ? [`(count >= ${schema3.minContains})`] : [];
      const checkMaxContains = IsNumber(schema3.maxContains) ? [`(count <= ${schema3.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check11 = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check11}})(${value11})`;
    }
    if (schema3.uniqueItems === true) {
      const check11 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check11} }`;
      yield `((${parameter}) => { ${block} )(${value11})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value11})`;
  }
  function* FromBigInt6(schema3, references, value11) {
    yield `(typeof ${value11} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value11} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value11} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value11} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value11} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value11} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value11) {
    yield `(typeof ${value11} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value11) {
    yield* Visit17(schema3.returns, references, `${value11}.prototype`);
  }
  function* FromDate6(schema3, references, value11) {
    yield `(${value11} instanceof Date) && Number.isFinite(${value11}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value11}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value11}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value11}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value11}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value11}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value11) {
    yield `(typeof ${value11} === 'function')`;
  }
  function* FromInteger6(schema3, references, value11) {
    yield `Number.isInteger(${value11})`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value11) {
    const check1 = schema3.allOf.map((schema4) => CreateExpression(schema4, references, value11)).join(" && ");
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema2(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value11}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value11})`;
  }
  function* FromLiteral7(schema3, references, value11) {
    if (typeof schema3.const === "number" || typeof schema3.const === "boolean") {
      yield `(${value11} === ${schema3.const})`;
    } else {
      yield `(${value11} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value11) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value11) {
    const expression = CreateExpression(schema3.not, references, value11);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value11) {
    yield `(${value11} === null)`;
  }
  function* FromNumber6(schema3, references, value11) {
    yield Policy.IsNumberLike(value11);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value11) {
    yield Policy.IsObjectLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value11, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value11})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value11, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value11}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === "object") {
      const expression = CreateExpression(schema3.additionalProperties, references, `${value11}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value11) {
    yield `(typeof value === 'object' && typeof ${value11}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value11) {
    yield Policy.IsRecordLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema3.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check22 = IsSchema2(schema3.additionalProperties) ? CreateExpression(schema3.additionalProperties, references, value11) : schema3.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value11}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value11) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
    yield* Visit17(target, references, value11);
  }
  function* FromRegExp5(schema3, references, value11) {
    const variable = CreateVariable(`${new RegExp(schema3.source, schema3.flags)};`);
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value11})`;
  }
  function* FromString6(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value11})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value11})`;
    }
  }
  function* FromSymbol6(schema3, references, value11) {
    yield `(typeof ${value11} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value11})`;
  }
  function* FromThis11(schema3, references, value11) {
    yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
  }
  function* FromTuple15(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    if (schema3.items === undefined)
      return yield `${value11}.length === 0`;
    yield `(${value11}.length === ${schema3.maxItems})`;
    for (let i = 0;i < schema3.items.length; i++) {
      const expression = CreateExpression(schema3.items[i], references, `${value11}[${i}]`);
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value11) {
    yield `${value11} === undefined`;
  }
  function* FromUnion20(schema3, references, value11) {
    const expressions = schema3.anyOf.map((schema4) => CreateExpression(schema4, references, value11));
    yield `(${expressions.join(" || ")})`;
  }
  function* FromUint8Array5(schema3, references, value11) {
    yield `${value11} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value11}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value11}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value11) {
    yield "true";
  }
  function* FromVoid5(schema3, references, value11) {
    yield Policy.IsVoidLike(value11);
  }
  function* FromKind4(schema3, references, value11) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value11})`;
  }
  function* Visit17(schema3, references, value11, useHoisting = true) {
    const references_ = IsString(schema3.$id) ? [...references, schema3] : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value11})`;
      } else {
        const functionCode = CreateFunction(functionName, schema3, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value11})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value11);
      case "Array":
        return yield* FromArray16(schema_, references_, value11);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value11);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value11);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value11);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value11);
      case "Date":
        return yield* FromDate6(schema_, references_, value11);
      case "Function":
        return yield* FromFunction7(schema_, references_, value11);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value11);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value11);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value11);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value11);
      case "Never":
        return yield* FromNever6(schema_, references_, value11);
      case "Not":
        return yield* FromNot8(schema_, references_, value11);
      case "Null":
        return yield* FromNull6(schema_, references_, value11);
      case "Number":
        return yield* FromNumber6(schema_, references_, value11);
      case "Object":
        return yield* FromObject13(schema_, references_, value11);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value11);
      case "Record":
        return yield* FromRecord12(schema_, references_, value11);
      case "Ref":
        return yield* FromRef12(schema_, references_, value11);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value11);
      case "String":
        return yield* FromString6(schema_, references_, value11);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value11);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value11);
      case "This":
        return yield* FromThis11(schema_, references_, value11);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value11);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value11);
      case "Union":
        return yield* FromUnion20(schema_, references_, value11);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value11);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value11);
      case "Void":
        return yield* FromVoid5(schema_, references_, value11);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value11);
    }
  }
  const state = {
    language: "javascript",
    functions: new Map,
    variables: new Map,
    instances: new Map
  };
  function CreateExpression(schema3, references, value11, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value11, useHoisting)].join(" && ")})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(name, schema3, references, value11, useHoisting = true) {
    const [newline, pad] = ["\n", (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema3, references, value11, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})\n}`;
  }
  function CreateParameter(name, type47) {
    const annotation = state.language === "typescript" ? `: ${type47}` : "";
    return `${name}${annotation}`;
  }
  function CreateReturns(type47) {
    return state.language === "typescript" ? `: ${type47}` : "";
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction("check", schema3, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id) ? `return function check(${parameter})${returns} {\n  return ${CreateFunctionName(schema3.$id)}(value)\n}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join("\n");
  }
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema3, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema3))
      throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema2(schema4))
        throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind28, instance, value11) {
      if (!exports_type.Has(kind28) || !instances.has(instance))
        return false;
      const checkFunc = exports_type.Get(kind28);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value11);
    }
    function formatRegistryFunction(format, value11) {
      if (!exports_format.Has(format))
        return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value11);
    }
    function hashFunction(value11) {
      return Hash(value11);
    }
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/elysia/dist/bun/index.js
var g2 = function(j) {
  return j % 4 === 0 && (j % 100 !== 0 || j % 400 === 0);
};
var m1 = function(j) {
  const W = y2.exec(j);
  if (!W)
    return false;
  const $ = +W[1], X = +W[2], Z = +W[3];
  return X >= 1 && X <= 12 && Z >= 1 && Z <= (X === 2 && g2($) ? 29 : f2[X]);
};
var _1 = function(j) {
  return function W($) {
    const X = v2.exec($);
    if (!X)
      return false;
    const Z = +X[1], J = +X[2], Q = +X[3], K = X[4], Y = X[5] === "-" ? -1 : 1, B = +(X[6] || 0), U = +(X[7] || 0);
    if (B > 23 || U > 59 || j && !K)
      return false;
    if (Z <= 23 && J <= 59 && Q < 60)
      return true;
    const _ = J - U * Y, M = Z - B * Y - (_ < 0 ? 1 : 0);
    return (M === 23 || M === -1) && (_ === 59 || _ === -1) && Q < 61;
  };
};
var k1 = function(j) {
  const W = _1(j);
  return function $(X) {
    const Z = X.split(k2);
    return Z.length === 2 && m1(Z[0]) && W(Z[1]);
  };
};
var m2 = function(j) {
  return u2.test(j) && h2.test(j);
};
var d2 = function(j) {
  return u1.lastIndex = 0, u1.test(j);
};
var p2 = function(j) {
  return Number.isInteger(j) && j <= l2 && j >= c2;
};
var i2 = function(j) {
  return Number.isInteger(j);
};
var h1 = function() {
  return true;
};
var n2 = function(j) {
  if (t2.test(j))
    return false;
  try {
    return new RegExp(j), true;
  } catch (W) {
    return false;
  }
};
var jj = function(j, W) {
  if (typeof j !== "string")
    throw new TypeError("argument str must be a string");
  var $ = {}, X = W || {}, Z = X.decode || $j, J = 0;
  while (J < j.length) {
    var Q = j.indexOf("=", J);
    if (Q === -1)
      break;
    var K = j.indexOf(";", J);
    if (K === -1)
      K = j.length;
    else if (K < Q) {
      J = j.lastIndexOf(";", Q - 1) + 1;
      continue;
    }
    var Y = j.slice(J, Q).trim();
    if ($[Y] === undefined) {
      var B = j.slice(Q + 1, K).trim();
      if (B.charCodeAt(0) === 34)
        B = B.slice(1, -1);
      $[Y] = Jj(B, Z);
    }
    J = K + 1;
  }
  return $;
};
var Wj = function(j, W, $) {
  var X = $ || {}, Z = X.encode || Xj;
  if (typeof Z !== "function")
    throw new TypeError("option encode is invalid");
  if (!s0.test(j))
    throw new TypeError("argument name is invalid");
  var J = Z(W);
  if (J && !s0.test(J))
    throw new TypeError("argument val is invalid");
  var Q = j + "=" + J;
  if (X.maxAge != null) {
    var K = X.maxAge - 0;
    if (isNaN(K) || !isFinite(K))
      throw new TypeError("option maxAge is invalid");
    Q += "; Max-Age=" + Math.floor(K);
  }
  if (X.domain) {
    if (!s0.test(X.domain))
      throw new TypeError("option domain is invalid");
    Q += "; Domain=" + X.domain;
  }
  if (X.path) {
    if (!s0.test(X.path))
      throw new TypeError("option path is invalid");
    Q += "; Path=" + X.path;
  }
  if (X.expires) {
    var Y = X.expires;
    if (!Zj(Y) || isNaN(Y.valueOf()))
      throw new TypeError("option expires is invalid");
    Q += "; Expires=" + Y.toUTCString();
  }
  if (X.httpOnly)
    Q += "; HttpOnly";
  if (X.secure)
    Q += "; Secure";
  if (X.partitioned)
    Q += "; Partitioned";
  if (X.priority) {
    var B = typeof X.priority === "string" ? X.priority.toLowerCase() : X.priority;
    switch (B) {
      case "low":
        Q += "; Priority=Low";
        break;
      case "medium":
        Q += "; Priority=Medium";
        break;
      case "high":
        Q += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (X.sameSite) {
    var U = typeof X.sameSite === "string" ? X.sameSite.toLowerCase() : X.sameSite;
    switch (U) {
      case true:
        Q += "; SameSite=Strict";
        break;
      case "lax":
        Q += "; SameSite=Lax";
        break;
      case "strict":
        Q += "; SameSite=Strict";
        break;
      case "none":
        Q += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return Q;
};
var $j = function(j) {
  return j.indexOf("%") !== -1 ? decodeURIComponent(j) : j;
};
var Xj = function(j) {
  return encodeURIComponent(j);
};
var Zj = function(j) {
  return e2.call(j) === "[object Date]" || j instanceof Date;
};
var Jj = function(j, W) {
  try {
    return W(j);
  } catch ($) {
    return j;
  }
};
var Mj = function(j) {
  let W = j;
  while (W.endsWith("="))
    W = W.slice(0, -1);
  return W;
};
var x0 = function(j) {
  const W = {};
  if (typeof j !== "string")
    return W;
  let $ = "", X = "", Z = -1, J = -1, Q = 0;
  const K = j.length;
  for (let Y = 0;Y < K; Y++)
    switch (j.charCodeAt(Y)) {
      case 38:
        const B = J > Z;
        if (!B)
          J = Y;
        if ($ = j.slice(Z + 1, J), B || $.length > 0) {
          if (Q & 1)
            $ = $.replace(G1, " ");
          if (Q & 2)
            $ = c0.default($) || $;
          if (!W[$]) {
            if (B) {
              if (X = j.slice(J + 1, Y), Q & 4)
                X = X.replace(G1, " ");
              if (Q & 8)
                X = c0.default(X) || X;
            }
            W[$] = X;
          }
        }
        $ = "", X = "", Z = Y, J = Y, Q = 0;
        break;
      case 61:
        if (J <= Z)
          J = Y;
        else
          Q |= 8;
        break;
      case 43:
        if (J > Z)
          Q |= 4;
        else
          Q |= 1;
        break;
      case 37:
        if (J > Z)
          Q |= 8;
        else
          Q |= 2;
        break;
    }
  if (Z < K) {
    const Y = J > Z;
    if ($ = j.slice(Z + 1, Y ? J : K), Y || $.length > 0) {
      if (Q & 1)
        $ = $.replace(G1, " ");
      if (Q & 2)
        $ = c0.default($) || $;
      if (!W[$]) {
        if (Y) {
          if (X = j.slice(J + 1, K), Q & 4)
            X = X.replace(G1, " ");
          if (Q & 8)
            X = c0.default(X) || X;
        }
        W[$] = X;
      }
    }
  }
  return W;
};
var O2 = Object.create;
var { getPrototypeOf: V2, defineProperty: R1, getOwnPropertyNames: A2 } = Object;
var C2 = Object.prototype.hasOwnProperty;
var Y1 = (j, W, $) => {
  $ = j != null ? O2(V2(j)) : {};
  const X = W || !j || !j.__esModule ? R1($, "default", { value: j, enumerable: true }) : $;
  for (let Z of A2(j))
    if (!C2.call(X, Z))
      R1(X, Z, { get: () => j[Z], enumerable: true });
  return X;
};
var S2 = (j, W) => () => (W || j((W = { exports: {} }).exports, W), W.exports);
var r0 = S2((j3, r1) => {
  function Gj(j) {
    var W = j.indexOf("%");
    if (W === -1)
      return j;
    var $ = j.length, X = "", Z = 0, J = 0, Q = W, K = n1;
    while (W > -1 && W < $) {
      var Y = s1(j[W + 1], 4), B = s1(j[W + 2], 0), U = Y | B, _ = F1[U];
      if (K = F1[256 + K + _], J = J << 6 | U & F1[364 + _], K === n1)
        X += j.slice(Z, Q), X += J <= 65535 ? String.fromCharCode(J) : String.fromCharCode(55232 + (J >> 10), 56320 + (J & 1023)), J = 0, Z = W + 3, W = Q = j.indexOf("%", Z);
      else if (K === Qj)
        return null;
      else {
        if (W += 3, W < $ && j.charCodeAt(W) === 37)
          continue;
        return null;
      }
    }
    return X + j.slice(Z);
  }
  function s1(j, W) {
    var $ = Kj[j];
    return $ === undefined ? 255 : $ << W;
  }
  var n1 = 12, Qj = 0, F1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7], Kj = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
  r1.exports = Gj;
});
var T0 = (j, W) => {
  const $ = W?.length ? {} : null;
  if ($)
    for (let X of W)
      $[X.part.charCodeAt(0)] = X;
  return { part: j, store: null, inert: $, params: null, wildcardStore: null };
};
var x1 = (j, W) => ({ ...j, part: W });
var g1 = (j) => ({ name: j, store: null, inert: null });

class D0 {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g, optionalParams: /:.+?\?(?=\/|$)/g };
  add(j, W, $, { ignoreError: X = false, ignoreHistory: Z = false } = {}) {
    if (typeof W !== "string")
      throw new TypeError("Route path must be a string");
    if (W === "")
      W = "/";
    else if (W[0] !== "/")
      W = `/${W}`;
    const J = W[W.length - 1] === "*", Q = W.match(D0.regex.optionalParams);
    if (Q) {
      const _ = W.replaceAll("?", "");
      this.add(j, _, $, { ignoreError: X });
      for (let M = 0;M < Q.length; M++) {
        let G = W.replace("/" + Q[M], "");
        this.add(j, G, $, { ignoreError: true });
      }
      return $;
    }
    if (Q)
      W = W.replaceAll("?", "");
    if (this.history.find(([_, M, G]) => _ === j && M === W))
      return $;
    if (J || Q && W.charCodeAt(W.length - 1) === 63)
      W = W.slice(0, -1);
    if (!Z)
      this.history.push([j, W, $]);
    const K = W.split(D0.regex.static), Y = W.match(D0.regex.params) || [];
    if (K[K.length - 1] === "")
      K.pop();
    let B;
    if (!this.root[j])
      B = this.root[j] = T0("/");
    else
      B = this.root[j];
    let U = 0;
    for (let _ = 0;_ < K.length; ++_) {
      let M = K[_];
      if (_ > 0) {
        const G = Y[U++].slice(1);
        if (B.params === null)
          B.params = g1(G);
        else if (B.params.name !== G)
          if (X)
            return $;
          else
            throw new Error(`Cannot create route "${W}" with parameter "${G}" because a route already exists with a different parameter name ("${B.params.name}") in the same location`);
        const w = B.params;
        if (w.inert === null) {
          B = w.inert = T0(M);
          continue;
        }
        B = w.inert;
      }
      for (let G = 0;; ) {
        if (G === M.length) {
          if (G < B.part.length) {
            const w = x1(B, B.part.slice(G));
            Object.assign(B, T0(M, [w]));
          }
          break;
        }
        if (G === B.part.length) {
          if (B.inert === null)
            B.inert = {};
          const w = B.inert[M.charCodeAt(G)];
          if (w) {
            B = w, M = M.slice(G), G = 0;
            continue;
          }
          const z = T0(M.slice(G));
          B.inert[M.charCodeAt(G)] = z, B = z;
          break;
        }
        if (M[G] !== B.part[G]) {
          const w = x1(B, B.part.slice(G)), z = T0(M.slice(G));
          Object.assign(B, T0(B.part.slice(0, G), [w, z])), B = z;
          break;
        }
        ++G;
      }
    }
    if (U < Y.length) {
      const _ = Y[U].slice(1);
      if (B.params === null)
        B.params = g1(_);
      else if (B.params.name !== _)
        if (X)
          return $;
        else
          throw new Error(`Cannot create route "${W}" with parameter "${_}" because a route already exists with a different parameter name ("${B.params.name}") in the same location`);
      if (B.params.store === null)
        B.params.store = $;
      return B.params.store;
    }
    if (J) {
      if (B.wildcardStore === null)
        B.wildcardStore = $;
      return B.wildcardStore;
    }
    if (B.store === null)
      B.store = $;
    return B.store;
  }
  find(j, W) {
    const $ = this.root[j];
    if (!$)
      return null;
    return U1(W, W.length, $, 0);
  }
}
var U1 = (j, W, $, X) => {
  const Z = $.part, J = Z.length, Q = X + J;
  if (J > 1) {
    if (Q > W)
      return null;
    if (J < 15) {
      for (let K = 1, Y = X + 1;K < J; ++K, ++Y)
        if (Z.charCodeAt(K) !== j.charCodeAt(Y))
          return null;
    } else if (j.slice(X, Q) !== Z)
      return null;
  }
  if (Q === W) {
    if ($.store !== null)
      return { store: $.store, params: {} };
    if ($.wildcardStore !== null)
      return { store: $.wildcardStore, params: { "*": "" } };
    return null;
  }
  if ($.inert !== null) {
    const K = $.inert[j.charCodeAt(Q)];
    if (K !== undefined) {
      const Y = U1(j, W, K, Q);
      if (Y !== null)
        return Y;
    }
  }
  if ($.params !== null) {
    const { store: K, name: Y, inert: B } = $.params, U = j.indexOf("/", Q);
    if (U !== Q) {
      if (U === -1 || U >= W) {
        if (K !== null) {
          const _ = {};
          return _[Y] = j.substring(Q, W), { store: K, params: _ };
        }
      } else if (B !== null) {
        const _ = U1(j, W, B, U);
        if (_ !== null)
          return _.params[Y] = j.substring(Q, U), _;
      }
    }
  }
  if ($.wildcardStore !== null)
    return { store: $.wildcardStore, params: { "*": j.substring(Q, W) } };
  return null;
};
var q0 = (j) => {
  const W = typeof j === "object" ? j.fn.toString() : typeof j === "string" ? j.toString() : j, $ = W.indexOf(")");
  if (W.charCodeAt($ + 2) === 61 && W.charCodeAt($ + 5) !== 123)
    return true;
  return W.includes("return");
};
var T2 = (j) => {
  if (j.startsWith("async"))
    j = j.slice(5);
  j = j.trimStart();
  let W = -1;
  if (j.charCodeAt(0) === 40) {
    if (W = j.indexOf("=>", j.indexOf(")")), W !== -1) {
      let Z = W;
      while (Z > 0)
        if (j.charCodeAt(--Z) === 41)
          break;
      let J = j.slice(W + 2);
      if (J.charCodeAt(0) === 32)
        J = J.trimStart();
      return [j.slice(1, Z), J, { isArrowReturn: J.charCodeAt(0) !== 123 }];
    }
  }
  if (j.startsWith("function")) {
    W = j.indexOf("(");
    const Z = j.indexOf(")");
    return [j.slice(W + 1, Z), j.slice(Z + 2), { isArrowReturn: false }];
  }
  const $ = j.indexOf("(");
  if ($ !== -1) {
    const Z = j.indexOf("\n", 2), J = j.slice(0, Z), Q = J.lastIndexOf(")") + 1, K = j.slice(Z + 1);
    return [J.slice($, Q), "{" + K, { isArrowReturn: false }];
  }
  const X = j.split("\n", 2);
  return [X[0], X[1], { isArrowReturn: false }];
};
var q2 = (j) => {
  const W = j.indexOf("{");
  if (W === -1)
    return [-1, 0];
  let $ = W + 1, X = 1;
  for (;$ < j.length; $++) {
    const Z = j.charCodeAt($);
    if (Z === 123)
      X++;
    else if (Z === 125)
      X--;
    if (X === 0)
      break;
  }
  if (X !== 0)
    return [0, j.length];
  return [W, $ + 1];
};
var L2 = (j) => {
  const W = j.lastIndexOf("}");
  if (W === -1)
    return [-1, 0];
  let $ = W - 1, X = 1;
  for (;$ >= 0; $--) {
    const Z = j.charCodeAt($);
    if (Z === 125)
      X++;
    else if (Z === 123)
      X--;
    if (X === 0)
      break;
  }
  if (X !== 0)
    return [-1, 0];
  return [$, W + 1];
};
var y1 = (j) => {
  while (true) {
    const W = j.indexOf(":");
    if (W === -1)
      break;
    let $ = j.indexOf(",", W);
    if ($ === -1)
      $ = j.indexOf("}", W) - 1;
    if ($ === -2)
      $ = j.length;
    j = j.slice(0, W) + j.slice($);
  }
  return j;
};
var f1 = (j) => {
  let W = false;
  if (j.charCodeAt(0) === 40)
    j = j.slice(1, -1);
  if (j.charCodeAt(0) === 123)
    W = true, j = j.slice(1, -1);
  j = j.replace(/( |\t|\n)/g, "").trim();
  let $ = [];
  while (true) {
    let [Z, J] = q2(j);
    if (Z === -1)
      break;
    if ($.push(j.slice(0, Z - 1)), j.charCodeAt(J) === 44)
      J++;
    j = j.slice(J);
  }
  if (j = y1(j), j)
    $ = $.concat(j.split(","));
  const X = [];
  for (let Z of $) {
    if (Z.indexOf(",") === -1) {
      X.push(Z);
      continue;
    }
    for (let J of Z.split(","))
      X.push(J.trim());
  }
  return $ = X, { hasParenthesis: W, parameters: $ };
};
var E2 = (j, W) => {
  const { parameters: $, hasParenthesis: X } = f1(j);
  if (!W.query && $.includes("query"))
    W.query = true;
  if (!W.headers && $.includes("headers"))
    W.headers = true;
  if (!W.body && $.includes("body"))
    W.body = true;
  if (!W.cookie && $.includes("cookie"))
    W.cookie = true;
  if (!W.set && $.includes("set"))
    W.set = true;
  if (!W.server && $.includes("server"))
    W.server = true;
  if (X)
    return `{ ${$.join(", ")} }`;
  return $.join(", ");
};
var H2 = (j, W, $) => {
  const X = W.indexOf(j + "\n", $), Z = W.indexOf(j + "\t", $), J = W.indexOf(j + ",", $), Q = W.indexOf(j + ";", $), K = W.indexOf(j + " ", $);
  return [X, Z, J, Q, K].filter((Y) => Y > 0).sort((Y, B) => Y - B)[0] || -1;
};
var v1 = (j, W, $ = 0) => {
  if ($ > 5)
    return [];
  const X = [];
  let Z = W;
  while (true) {
    let J = H2(" = " + j, Z);
    if (J === -1) {
      const Y = Z.indexOf(" = " + j);
      if (Y + 3 + j.length !== Z.length)
        break;
      J = Y;
    }
    const Q = Z.slice(0, J);
    let K = Q.slice(Q.lastIndexOf(" ") + 1);
    if (K === "}") {
      const [Y, B] = L2(Q);
      X.push(y1(Z.slice(Y, B))), Z = Z.slice(J + 3 + j.length);
      continue;
    }
    while (K.charCodeAt(0) === 44)
      K = K.slice(1);
    while (K.charCodeAt(0) === 9)
      K = K.slice(1);
    if (!K.includes("("))
      X.push(K);
    Z = Z.slice(J + 3 + j.length);
  }
  for (let J of X) {
    if (J.charCodeAt(0) === 123)
      continue;
    const Q = v1(J, W);
    if (Q.length > 0)
      X.push(...Q);
  }
  return X;
};
var b2 = (j) => {
  if (!j)
    return;
  if (j.charCodeAt(0) !== 123)
    return j;
  if (j = j.slice(2, -2), !j.includes(",")) {
    if (j.includes("..."))
      return j.slice(j.indexOf("...") + 3);
    return;
  }
  const $ = j.indexOf("...");
  if ($ === -1)
    return;
  return j.slice($ + 3).trimEnd();
};
var R2 = (j, W, $) => {
  const X = (Z, J) => j.includes(J + "." + Z) || j.includes(J + '["' + Z + '"]') || j.includes(J + "['" + Z + "']");
  for (let Z of W) {
    if (!Z)
      continue;
    if (Z.charCodeAt(0) === 123) {
      const J = f1(Z).parameters;
      if (!$.query && J.includes("query"))
        $.query = true;
      if (!$.headers && J.includes("headers"))
        $.headers = true;
      if (!$.body && J.includes("body"))
        $.body = true;
      if (!$.cookie && J.includes("cookie"))
        $.cookie = true;
      if (!$.set && J.includes("set"))
        $.set = true;
      if (!$.query && J.includes("server"))
        $.server = true;
      continue;
    }
    if (!$.query && X("query", Z))
      $.query = true;
    if (j.includes("return " + Z) || j.includes("return " + Z + ".query"))
      $.query = true;
    if (!$.headers && X("headers", Z))
      $.headers = true;
    if (!$.body && X("body", Z))
      $.body = true;
    if (!$.cookie && X("cookie", Z))
      $.cookie = true;
    if (!$.set && X("set", Z))
      $.set = true;
    if (!$.server && X("server", Z))
      $.server = true;
    if ($.query && $.headers && $.body && $.cookie && $.set && $.server)
      break;
  }
  return W;
};
var x2 = (j, W, $) => {
  try {
    const X = new RegExp(`(?:\\w)\\((?:.*)?${j}`, "gs");
    X.test(W);
    const Z = W.charCodeAt(X.lastIndex);
    if (Z === 41 || Z === 44)
      return $.query = true, $.headers = true, $.body = true, $.cookie = true, $.set = true, $.server = true, true;
    return false;
  } catch (X) {
    return console.log("[Sucrose] warning: unexpected isContextPassToFunction error, you may continue development as usual but please report the following to maintainers:"), console.log("--- body ---"), console.log(W), console.log("--- context ---"), console.log(j), true;
  }
};
var t0 = (j, W = { query: false, headers: false, body: false, cookie: false, set: false, server: false }) => {
  const $ = [];
  if (j.handler && typeof j.handler === "function")
    $.push(j.handler);
  if (j.request?.length)
    $.push(...j.request);
  if (j.beforeHandle?.length)
    $.push(...j.beforeHandle);
  if (j.parse?.length)
    $.push(...j.parse);
  if (j.error?.length)
    $.push(...j.error);
  if (j.transform?.length)
    $.push(...j.transform);
  if (j.afterHandle?.length)
    $.push(...j.afterHandle);
  if (j.mapResponse?.length)
    $.push(...j.mapResponse);
  if (j.afterResponse?.length)
    $.push(...j.afterResponse);
  for (let X of $) {
    if (!X)
      continue;
    const Z = "fn" in X ? X.fn : X, [J, Q, { isArrowReturn: K }] = T2(Z.toString()), Y = E2(J, W), B = b2(Y);
    if (B) {
      const U = v1(B, Q);
      if (U.splice(0, -1, B), !x2(B, Q, W))
        R2(Q, U, W);
      if (!W.query && Q.includes("return " + B + ".query"))
        W.query = true;
    }
    if (W.query && W.headers && W.body && W.cookie && W.set && W.server)
      break;
  }
  return W;
};
var n0 = { date: m1, time: _1(true), "date-time": k1(true), "iso-time": _1(false), "iso-date-time": k1(false), duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/, uri: m2, "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu, email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i, ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i, regex: n2, uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/, "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i, "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/, byte: d2, int32: { type: "number", validate: p2 }, int64: { type: "number", validate: i2 }, float: { type: "number", validate: h1 }, double: { type: "number", validate: h1 }, password: true, binary: true };
var y2 = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var f2 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var v2 = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
var k2 = /t|\s/i;
var u2 = /\/|:/;
var h2 = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var u1 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
var c2 = -2147483648;
var l2 = 2147483647;
var t2 = /[^\\]\\Z/;
var p1 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var i1 = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var t1 = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var s2 = n0.date;
var r2 = n0["date-time"];
if (!exports_format.Has("date"))
  TypeSystem.Format("date", (j) => {
    const W = j.replace(/"/g, "");
    if (p1.test(W) || i1.test(W) || t1.test(W) || s2(W)) {
      const $ = new Date(W);
      if (!Number.isNaN($.getTime()))
        return true;
    }
    return false;
  });
if (!exports_format.Has("date-time"))
  TypeSystem.Format("date-time", (j) => {
    const W = j.replace(/"/g, "");
    if (p1.test(W) || i1.test(W) || t1.test(W) || r2(W)) {
      const $ = new Date(W);
      if (!Number.isNaN($.getTime()))
        return true;
    }
    return false;
  });
Object.entries(n0).forEach((j) => {
  const [W, $] = j;
  if (!exports_format.Has(W)) {
    if ($ instanceof RegExp)
      TypeSystem.Format(W, (X) => $.test(X));
    else if (typeof $ === "function")
      TypeSystem.Format(W, $);
  }
});
var A = Object.assign({}, Type);
var c1 = (j) => {
  if (typeof j === "string")
    switch (j.slice(-1)) {
      case "k":
        return +j.slice(0, j.length - 1) * 1024;
      case "m":
        return +j.slice(0, j.length - 1) * 1048576;
      default:
        return +j;
    }
  return j;
};
var w1 = (j, W) => {
  if (!(W instanceof Blob))
    return false;
  if (j.minSize && W.size < c1(j.minSize))
    return false;
  if (j.maxSize && W.size > c1(j.maxSize))
    return false;
  if (j.extension)
    if (typeof j.extension === "string") {
      if (!W.type.startsWith(j.extension))
        return false;
    } else {
      for (let $ = 0;$ < j.extension.length; $++)
        if (W.type.startsWith(j.extension[$]))
          return true;
      return false;
    }
  return true;
};
var a2 = exports_type.Get("Files") ?? TypeSystem.Type("File", w1);
var o2 = exports_type.Get("Files") ?? TypeSystem.Type("Files", (j, W) => {
  if (!Array.isArray(W))
    return w1(j, W);
  if (j.minItems && W.length < j.minItems)
    return false;
  if (j.maxItems && W.length > j.maxItems)
    return false;
  for (let $ = 0;$ < W.length; $++)
    if (!w1(j, W[$]))
      return false;
  return true;
});
if (!exports_format.Has("numeric"))
  exports_format.Set("numeric", (j) => !!j && !isNaN(+j));
if (!exports_format.Has("boolean"))
  exports_format.Set("boolean", (j) => j === "true" || j === "false");
if (!exports_format.Has("ObjectString"))
  exports_format.Set("ObjectString", (j) => {
    let W = j.charCodeAt(0);
    if (W === 9 || W === 10 || W === 32)
      W = j.trimStart().charCodeAt(0);
    if (W !== 123 && W !== 91)
      return false;
    try {
      return JSON.parse(j), true;
    } catch {
      return false;
    }
  });
if (!exports_format.Has("ArrayString"))
  exports_format.Set("ArrayString", (j) => {
    let W = j.charCodeAt(0);
    if (W === 9 || W === 10 || W === 32)
      W = j.trimStart().charCodeAt(0);
    if (W !== 123 && W !== 91)
      return false;
    try {
      return JSON.parse(j), true;
    } catch {
      return false;
    }
  });
var Q0 = { Numeric: (j) => {
  const W = Type.Number(j);
  return A.Transform(A.Union([A.String({ format: "numeric", default: 0 }), A.Number(j)], j)).Decode(($) => {
    const X = +$;
    if (isNaN(X))
      return $;
    if (j && !exports_value2.Check(W, X))
      throw new L("property", W, X);
    return X;
  }).Encode(($) => $);
}, Date: (j) => {
  const W = Type.Date(j);
  return A.Transform(A.Union([Type.Date(j), A.String({ format: "date", default: new Date().toISOString() }), A.String({ format: "date-time", default: new Date().toISOString() })], j)).Decode(($) => {
    if ($ instanceof Date)
      return $;
    const X = new Date($);
    if (!exports_value2.Check(W, X))
      throw new L("property", W, X);
    return X;
  }).Encode(($) => {
    if (typeof $ === "string")
      return new Date($);
    return $;
  });
}, BooleanString: (j) => {
  const W = Type.Boolean(j);
  return A.Transform(A.Union([A.String({ format: "boolean", default: false }), A.Boolean(j)], j)).Decode(($) => {
    if (typeof $ === "string")
      return $ === "true";
    if (j && !exports_value2.Check(W, $))
      throw new L("property", W, $);
    return $;
  }).Encode(($) => $);
}, ObjectString: (j, W) => {
  const $ = A.Object(j, W), X = JSON.stringify(exports_value2.Create($));
  let Z;
  try {
    Z = TypeCompiler.Compile($);
  } catch {
  }
  return A.Transform(A.Union([A.String({ format: "ObjectString", default: X }), $])).Decode((J) => {
    if (typeof J === "string") {
      if (J.charCodeAt(0) !== 123)
        throw new L("property", $, J);
      try {
        J = JSON.parse(J);
      } catch {
        throw new L("property", $, J);
      }
      if (Z) {
        if (!Z.Check(J))
          throw new L("property", $, J);
        return Z.Decode(J);
      }
      if (!exports_value2.Check($, J))
        throw new L("property", $, J);
      return exports_value2.Decode($, J);
    }
    return J;
  }).Encode((J) => {
    if (typeof J === "string")
      try {
        J = JSON.parse(J);
      } catch {
        throw new L("property", $, J);
      }
    if (!exports_value2.Check($, J))
      throw new L("property", $, J);
    return JSON.stringify(J);
  });
}, ArrayString: (j = {}, W) => {
  const $ = A.Array(j, W), X = JSON.stringify(exports_value2.Create($));
  let Z;
  try {
    Z = TypeCompiler.Compile($);
  } catch {
  }
  return A.Transform(A.Union([A.String({ format: "ArrayString", default: X }), $])).Decode((J) => {
    if (typeof J === "string") {
      if (J.charCodeAt(0) !== 91)
        throw new L("property", $, J);
      try {
        J = JSON.parse(J);
      } catch {
        throw new L("property", $, J);
      }
      if (Z) {
        if (!Z.Check(J))
          throw new L("property", $, J);
        return Z.Decode(J);
      }
      if (!exports_value2.Check($, J))
        throw new L("property", $, J);
      return exports_value2.Decode($, J);
    }
    return J;
  }).Encode((J) => {
    if (typeof J === "string")
      try {
        J = JSON.parse(J);
      } catch {
        throw new L("property", $, J);
      }
    if (!exports_value2.Check($, J))
      throw new L("property", $, J);
    return JSON.stringify(J);
  });
}, File: a2, Files: (j = {}) => A.Transform(o2(j)).Decode((W) => {
  if (Array.isArray(W))
    return W;
  return [W];
}).Encode((W) => W), Nullable: (j) => A.Union([j, A.Null()]), MaybeEmpty: (j) => A.Union([j, A.Null(), A.Undefined()]), Cookie: (j, { domain: W, expires: $, httpOnly: X, maxAge: Z, path: J, priority: Q, sameSite: K, secure: Y, secrets: B, sign: U, ..._ } = {}) => {
  const M = A.Object(j, _);
  return M.config = { domain: W, expires: $, httpOnly: X, maxAge: Z, path: J, priority: Q, sameSite: K, secure: Y, secrets: B, sign: U }, M;
} };
A.BooleanString = Q0.BooleanString;
A.ObjectString = Q0.ObjectString;
A.ArrayString = Q0.ArrayString;
A.Numeric = Q0.Numeric;
A.File = (j = {}) => Q0.File({ default: "File", ...j, extension: j?.type, type: "string", format: "binary" });
A.Files = (j = {}) => Q0.Files({ ...j, elysiaMeta: "Files", default: "Files", extension: j?.type, type: "array", items: { ...j, default: "Files", type: "string", format: "binary" } });
A.Nullable = (j) => Q0.Nullable(j);
A.MaybeEmpty = Q0.MaybeEmpty;
A.Cookie = Q0.Cookie;
A.Date = Q0.Date;
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var D1 = jj;
var M1 = Wj;
var e2 = Object.prototype.toString;
var s0 = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var o1 = Y1(r0(), 1);

class B0 {
  j;
  W;
  $;
  constructor(j, W, $ = {}) {
    this.name = j;
    this.jar = W;
    this.initial = $;
  }
  get cookie() {
    if (!(this.name in this.jar))
      return this.initial;
    return this.jar[this.name];
  }
  set cookie(j) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = j;
  }
  get value() {
    return this.cookie.value;
  }
  set value(j) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name].value = j;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(j) {
    this.cookie.expires = j;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(j) {
    this.cookie.maxAge = j;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(j) {
    this.cookie.domain = j;
  }
  get path() {
    return this.cookie.path;
  }
  set path(j) {
    this.cookie.path = j;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(j) {
    this.cookie.secure = j;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(j) {
    this.cookie.httpOnly = j;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(j) {
    this.cookie.sameSite = j;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(j) {
    this.cookie.priority = j;
  }
  get partitioned() {
    return this.cookie.partitioned;
  }
  set partitioned(j) {
    this.cookie.partitioned = j;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(j) {
    this.cookie.secrets = j;
  }
  update(j) {
    return this.cookie = Object.assign(this.cookie, typeof j === "function" ? j(this.cookie) : j), this;
  }
  set(j) {
    return this.cookie = Object.assign({ ...this.initial, value: this.value }, typeof j === "function" ? j(this.cookie) : j), this;
  }
  remove() {
    if (this.value === undefined)
      return;
    return this.set({ expires: new Date(0), maxAge: 0, value: "" }), this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
}
var a1 = (j, W, $) => {
  if (!j.cookie)
    j.cookie = {};
  return new Proxy(W, { get(X, Z) {
    if (Z in W)
      return new B0(Z, j.cookie, Object.assign({}, $ ?? {}, W[Z]));
    return new B0(Z, j.cookie, Object.assign({}, $));
  } });
};
var a0 = async (j, W, { secrets: $, sign: X, ...Z } = {}) => {
  if (!W)
    return a1(j, {}, Z);
  const J = typeof $ === "string";
  if (X && X !== true && !Array.isArray(X))
    X = [X];
  const Q = {}, K = D1(W);
  for (let [Y, B] of Object.entries(K)) {
    let U = o1.default(B);
    if (X === true || X?.includes(Y)) {
      if (!$)
        throw new Error("No secret is provided to cookie plugin");
      if (J) {
        const _ = await z1(U, $);
        if (_ === false)
          throw new f0(Y);
        U = _;
      } else {
        let _ = true;
        for (let M = 0;M < $.length; M++) {
          const G = await z1(U, $[M]);
          if (G !== false) {
            _ = true, U = G;
            break;
          }
        }
        if (!_)
          throw new f0(Y);
      }
    }
    Q[Y] = { value: U };
  }
  return a1(j, Q, Z);
};
var e1 = "toJSON" in new Headers;
var p = (j) => {
  if (!j)
    return false;
  for (let W in j)
    return true;
  return false;
};
var v0 = (j, W) => {
  const $ = j.size;
  if (!W && $ || $ && W && W.status !== 206 && W.status !== 304 && W.status !== 412 && W.status !== 416) {
    if (W) {
      if (W.headers instanceof Headers) {
        if (e1)
          W.headers = W.headers.toJSON();
        else
          for (let [X, Z] of W.headers.entries())
            if (X in W.headers)
              W.headers[X] = Z;
      }
      return new Response(j, { status: W.status, headers: Object.assign({ "accept-ranges": "bytes", "content-range": `bytes 0-${$ - 1}/${$}` }, W.headers) });
    }
    return new Response(j, { headers: { "accept-ranges": "bytes", "content-range": `bytes 0-${$ - 1}/${$}` } });
  }
  return new Response(j);
};
var j2 = (j, W) => {
  if (!j)
    return j;
  j.delete("set-cookie");
  for (let $ = 0;$ < W.length; $++) {
    const X = W[$].indexOf("=");
    j.append("set-cookie", `${W[$].slice(0, X)}=${W[$].slice(X + 1) || ""}`);
  }
  return j;
};
var W2 = (j) => {
  if (!j || !p(j))
    return;
  const W = [];
  for (let [$, X] of Object.entries(j)) {
    if (!$ || !X)
      continue;
    const Z = X.value;
    if (Z === undefined || Z === null)
      continue;
    W.push(M1($, typeof Z === "object" ? JSON.stringify(Z) : Z + "", X));
  }
  if (W.length === 0)
    return;
  if (W.length === 1)
    return W[0];
  return W;
};
var k0 = async (j, W, $) => {
  let X = j.next();
  if (X instanceof Promise)
    X = await X;
  if (X.done) {
    if (W)
      return y(X.value, W, $);
    return e(X.value, $);
  }
  return new Response(new ReadableStream({ async start(Z) {
    let J = false;
    if ($?.signal.addEventListener("abort", () => {
      J = true;
      try {
        Z.close();
      } catch {
      }
    }), X.value !== undefined && X.value !== null)
      if (typeof X.value === "object")
        try {
          Z.enqueue(Buffer.from(JSON.stringify(X.value)));
        } catch {
          Z.enqueue(Buffer.from(X.value.toString()));
        }
      else
        Z.enqueue(Buffer.from(X.value.toString()));
    for await (let Q of j) {
      if (J)
        break;
      if (Q === undefined || Q === null)
        continue;
      if (typeof Q === "object")
        try {
          Z.enqueue(Buffer.from(JSON.stringify(Q)));
        } catch {
          Z.enqueue(Buffer.from(Q.toString()));
        }
      else
        Z.enqueue(Buffer.from(Q.toString()));
      await new Promise((K) => setTimeout(() => K(), 0));
    }
    try {
      Z.close();
    } catch {
    }
  } }), { ...W, headers: { "transfer-encoding": "chunked", "content-type": "text/event-stream; charset=utf-8", ...W?.headers } });
};
var y = (j, W, $) => {
  if (p(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (typeof W.status === "string")
      W.status = Y0[W.status];
    if (W.redirect) {
      if (W.headers.Location = W.redirect, !W.status || W.status < 300 || W.status >= 400)
        W.status = 302;
    }
    if (W.cookie && p(W.cookie)) {
      const X = W2(W.cookie);
      if (X)
        W.headers["set-cookie"] = X;
    }
    if (W.headers["set-cookie"] && Array.isArray(W.headers["set-cookie"]))
      W.headers = j2(new Headers(W.headers), W.headers["set-cookie"]);
    switch (j?.constructor?.name) {
      case "String":
        return new Response(j, W);
      case "Blob":
        return v0(j, W);
      case "Array":
        return Response.json(j, W);
      case "Object":
        const X = j[d];
        if (X)
          return W.status = X, y(j.response, W, $);
        for (let J in Object.values(j))
          switch (J?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(z0(j));
            default:
              break;
          }
        return Response.json(j, W);
      case "ReadableStream":
        if (!W.headers["content-type"]?.startsWith("text/event-stream"))
          W.headers["content-type"] = "text/event-stream; charset=utf-8";
        return $?.signal.addEventListener("abort", { handleEvent() {
          if (!$?.signal.aborted)
            j.cancel($);
        } }, { once: true }), new Response(j, W);
      case undefined:
        if (!j)
          return new Response("", W);
        return Response.json(j, W);
      case "Response":
        let Z = false;
        if (W.headers instanceof Headers)
          for (let J of W.headers.keys())
            if (J === "set-cookie") {
              if (Z)
                continue;
              Z = true;
              for (let Q of W.headers.getSetCookie())
                j.headers.append("set-cookie", Q);
            } else
              j.headers.append(J, W.headers?.get(J) ?? "");
        else
          for (let J in W.headers)
            j.headers.append(J, W.headers[J]);
        if (j.status !== W.status)
          W.status = j.status;
        return j;
      case "Error":
        return G0(j, W);
      case "Promise":
        return j.then((J) => y(J, W));
      case "Function":
        return y(j(), W);
      case "Number":
      case "Boolean":
        return new Response(j.toString(), W);
      case "Cookie":
        if (j instanceof B0)
          return new Response(j.value, W);
        return new Response(j?.toString(), W);
      case "FormData":
        return new Response(j, W);
      default:
        if (j instanceof Response) {
          let J = false;
          if (W.headers instanceof Headers)
            for (let Q of W.headers.keys())
              if (Q === "set-cookie") {
                if (J)
                  continue;
                J = true;
                for (let K of W.headers.getSetCookie())
                  j.headers.append("set-cookie", K);
              } else
                j.headers.append(Q, W.headers?.get(Q) ?? "");
          else
            for (let Q in W.headers)
              j.headers.append(Q, W.headers[Q]);
          if (e1)
            W.headers = j.headers.toJSON();
          else
            for (let [Q, K] of j.headers.entries())
              if (Q in W.headers)
                W.headers[Q] = K;
          return j;
        }
        if (j instanceof Promise)
          return j.then((J) => y(J, W));
        if (j instanceof Error)
          return G0(j, W);
        if (typeof j?.next === "function")
          return k0(j, W, $);
        if ("toResponse" in j)
          return y(j.toResponse(), W);
        if ("charCodeAt" in j) {
          const J = j.charCodeAt(0);
          if (J === 123 || J === 91) {
            if (!W.headers["Content-Type"])
              W.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(j), W);
          }
        }
        return new Response(j, W);
    }
  } else
    switch (j?.constructor?.name) {
      case "String":
        return new Response(j);
      case "Blob":
        return v0(j, W);
      case "Array":
        return Response.json(j);
      case "Object":
        const X = j[d];
        if (X)
          return W.status = X, y(j.response, W, $);
        for (let Z in Object.values(j))
          switch (Z?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(z0(j), W);
            default:
              break;
          }
        return Response.json(j, W);
      case "ReadableStream":
        return $?.signal.addEventListener("abort", { handleEvent() {
          if (!$?.signal.aborted)
            j.cancel($);
        } }, { once: true }), new Response(j, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!j)
          return new Response("");
        return new Response(JSON.stringify(j), { headers: { "content-type": "application/json" } });
      case "Response":
        return j;
      case "Error":
        return G0(j, W);
      case "Promise":
        return j.then((Z) => {
          const J = e(Z, $);
          if (J !== undefined)
            return J;
          return new Response("");
        });
      case "Function":
        return e(j(), $);
      case "Number":
      case "Boolean":
        return new Response(j.toString());
      case "Cookie":
        if (j instanceof B0)
          return new Response(j.value, W);
        return new Response(j?.toString(), W);
      case "FormData":
        return new Response(j, W);
      default:
        if (j instanceof Response)
          return new Response(j.body, { headers: { "Content-Type": "application/json" } });
        if (j instanceof Promise)
          return j.then((Z) => y(Z, W));
        if (j instanceof Error)
          return G0(j, W);
        if (typeof j?.next === "function")
          return k0(j, W, $);
        if ("toResponse" in j)
          return y(j.toResponse(), W);
        if ("charCodeAt" in j) {
          const Z = j.charCodeAt(0);
          if (Z === 123 || Z === 91) {
            if (!W.headers["Content-Type"])
              W.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(j), W);
          }
        }
        return new Response(j);
    }
};
var f = (j, W, $) => {
  if (j === undefined || j === null)
    return;
  if (p(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (typeof W.status === "string")
      W.status = Y0[W.status];
    if (W.redirect) {
      if (W.headers.Location = W.redirect, !W.status || W.status < 300 || W.status >= 400)
        W.status = 302;
    }
    if (W.cookie && p(W.cookie)) {
      const X = W2(W.cookie);
      if (X)
        W.headers["set-cookie"] = X;
    }
    if (W.headers["set-cookie"] && Array.isArray(W.headers["set-cookie"]))
      W.headers = j2(new Headers(W.headers), W.headers["set-cookie"]);
    switch (j?.constructor?.name) {
      case "String":
        return new Response(j, W);
      case "Blob":
        return v0(j, W);
      case "Array":
        return Response.json(j, W);
      case "Object":
        const X = j[d];
        if (X)
          return W.status = X, f(j.response, W, $);
        for (let J in Object.values(j))
          switch (J?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(z0(j), W);
            default:
              break;
          }
        return Response.json(j, W);
      case "ReadableStream":
        if (!W.headers["content-type"]?.startsWith("text/event-stream"))
          W.headers["content-type"] = "text/event-stream; charset=utf-8";
        return $?.signal.addEventListener("abort", { handleEvent() {
          if (!$?.signal.aborted)
            j.cancel($);
        } }, { once: true }), new Response(j, W);
      case undefined:
        if (!j)
          return;
        return Response.json(j, W);
      case "Response":
        let Z = false;
        if (W.headers instanceof Headers)
          for (let J of W.headers.keys())
            if (J === "set-cookie") {
              if (Z)
                continue;
              Z = true;
              for (let Q of W.headers.getSetCookie())
                j.headers.append("set-cookie", Q);
            } else
              j.headers.append(J, W.headers?.get(J) ?? "");
        else
          for (let J in W.headers)
            j.headers.append(J, W.headers[J]);
        if (j.status !== W.status)
          W.status = j.status;
        return j;
      case "Promise":
        return j.then((J) => {
          const Q = f(J, W);
          if (Q !== undefined)
            return Q;
        });
      case "Error":
        return G0(j, W);
      case "Function":
        return f(j(), W);
      case "Number":
      case "Boolean":
        return new Response(j.toString(), W);
      case "FormData":
        return new Response(j);
      case "Cookie":
        if (j instanceof B0)
          return new Response(j.value, W);
        return new Response(j?.toString(), W);
      default:
        if (j instanceof Response) {
          let J = false;
          if (W.headers instanceof Headers)
            for (let Q of W.headers.keys())
              if (Q === "set-cookie") {
                if (J)
                  continue;
                J = true;
                for (let K of W.headers.getSetCookie())
                  j.headers.append("set-cookie", K);
              } else
                j.headers.append(Q, W.headers?.get(Q) ?? "");
          else
            for (let Q in W.headers)
              j.headers.append(Q, W.headers[Q]);
          if (j.status !== W.status)
            W.status = j.status;
          return j;
        }
        if (j instanceof Promise)
          return j.then((J) => f(J, W));
        if (j instanceof Error)
          return G0(j, W);
        if (typeof j?.next === "function")
          return k0(j, W, $);
        if ("toResponse" in j)
          return f(j.toResponse(), W);
        if ("charCodeAt" in j) {
          const J = j.charCodeAt(0);
          if (J === 123 || J === 91) {
            if (!W.headers["Content-Type"])
              W.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(j), W);
          }
        }
        return new Response(j, W);
    }
  } else
    switch (j?.constructor?.name) {
      case "String":
        return new Response(j);
      case "Blob":
        return v0(j, W);
      case "Array":
        return Response.json(j);
      case "Object":
        const X = j[d];
        if (X)
          return W.status = X, f(j.response, W, $);
        for (let Z in Object.values(j))
          switch (Z?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(z0(j), W);
            default:
              break;
          }
        return Response.json(j, W);
      case "ReadableStream":
        return $?.signal.addEventListener("abort", { handleEvent() {
          if (!$?.signal.aborted)
            j.cancel($);
        } }, { once: true }), new Response(j, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!j)
          return new Response("");
        return new Response(JSON.stringify(j), { headers: { "content-type": "application/json" } });
      case "Response":
        return j;
      case "Promise":
        return j.then((Z) => {
          const J = f(Z, W);
          if (J !== undefined)
            return J;
        });
      case "Error":
        return G0(j, W);
      case "Function":
        return e(j(), $);
      case "Number":
      case "Boolean":
        return new Response(j.toString());
      case "Cookie":
        if (j instanceof B0)
          return new Response(j.value, W);
        return new Response(j?.toString(), W);
      case "FormData":
        return new Response(j);
      default:
        if (j instanceof Response)
          return new Response(j.body, { headers: { "Content-Type": "application/json" } });
        if (j instanceof Promise)
          return j.then((Z) => f(Z, W));
        if (j instanceof Error)
          return G0(j, W);
        if (typeof j?.next === "function")
          return k0(j, W, $);
        if ("toResponse" in j)
          return f(j.toResponse(), W);
        if ("charCodeAt" in j) {
          const Z = j.charCodeAt(0);
          if (Z === 123 || Z === 91) {
            if (!W.headers["Content-Type"])
              W.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(j), W);
          }
        }
        return new Response(j);
    }
};
var e = (j, W) => {
  switch (j?.constructor?.name) {
    case "String":
      return new Response(j);
    case "Blob":
      return v0(j);
    case "Array":
      return Response.json(j);
    case "Object":
      if (j[d])
        return y(j.response, { status: j[d], headers: {} });
      j:
        for (let $ of Object.values(j))
          switch ($?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(z0(j));
            case "Object":
              break j;
            default:
              break;
          }
      return Response.json(j);
    case "ReadableStream":
      return W?.signal.addEventListener("abort", { handleEvent() {
        if (!W?.signal.aborted)
          j.cancel(W);
      } }, { once: true }), new Response(j, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
    case undefined:
      if (!j)
        return new Response("");
      return new Response(JSON.stringify(j), { headers: { "content-type": "application/json" } });
    case "Response":
      return j;
    case "Error":
      return G0(j);
    case "Promise":
      return j.then(($) => e($, W));
    case "Function":
      return e(j(), W);
    case "Number":
    case "Boolean":
      return new Response(j.toString());
    case "FormData":
      return new Response(j);
    default:
      if (j instanceof Response)
        return new Response(j.body, { headers: { "Content-Type": "application/json" } });
      if (j instanceof Promise)
        return j.then(($) => e($, W));
      if (j instanceof Error)
        return G0(j);
      if (typeof j?.next === "function")
        return k0(j, undefined, W);
      if ("toResponse" in j)
        return e(j.toResponse());
      if ("charCodeAt" in j) {
        const $ = j.charCodeAt(0);
        if ($ === 123 || $ === 91)
          return new Response(JSON.stringify(j), { headers: { "Content-Type": "application/json" } });
      }
      return new Response(j);
  }
};
var G0 = (j, W) => new Response(JSON.stringify({ name: j?.name, message: j?.message, cause: j?.cause }), { status: W?.status !== 200 ? W?.status ?? 500 : 500, headers: W?.headers });
var o0 = (j, W) => {
  const $ = new URL(j);
  return $.pathname = W, $.toString();
};
var Bj = (j) => typeof j === "function" && /^\s*class\s+/.test(j.toString()) || j.toString().startsWith("[object ") && j.toString() !== "[object Object]" || p(Object.getPrototypeOf(j));
var I1 = (j) => j && typeof j === "object" && !Array.isArray(j);
var c = (j, W, { skipKeys: $, override: X = true } = {}) => {
  if (!I1(j) || !I1(W))
    return j;
  for (let [Z, J] of Object.entries(W)) {
    if ($?.includes(Z))
      continue;
    if (!I1(J) || !(Z in j) || Bj(J)) {
      if (X || !(Z in j))
        j[Z] = J;
      continue;
    }
    j[Z] = c(j[Z], J, { skipKeys: $, override: X });
  }
  return j;
};
var Yj = (j, W) => {
  const { properties: $, ...X } = j ?? {}, { properties: Z, ...J } = W ?? {};
  return c(X, J);
};
var x = (j = [], W = []) => {
  if (!j)
    return [];
  if (!W)
    return j;
  const $ = [], X = [];
  if (!Array.isArray(j))
    j = [j];
  if (!Array.isArray(W))
    W = [W];
  for (let Z of j)
    if ($.push(Z), Z.checksum)
      X.push(Z.checksum);
  for (let Z of W)
    if (!X.includes(Z.checksum))
      $.push(Z);
  return $;
};
var Uj = ["start", "request", "parse", "transform", "resolve", "beforeHandle", "afterHandle", "mapResponse", "afterResponse", "trace", "error", "stop", "body", "headers", "params", "query", "response", "type", "detail"];
var _j = Uj.reduce((j, W) => (j[W] = true, j), {});
var J2 = (j, W) => {
  const $ = (X) => typeof X === "object" && Object.keys(X).every($1);
  if ($(j) && $(W))
    return { ...j, ...W };
  return W ?? j;
};
var H0 = (j, W) => {
  return { body: W?.body ?? j?.body, headers: W?.headers ?? j?.headers, params: W?.params ?? j?.params, query: W?.query ?? j?.query, cookie: W?.cookie ?? j?.cookie, response: J2(j?.response, W?.response) };
};
var l = (j, W) => {
  return { ...j, ...W, body: W?.body ?? j?.body, headers: W?.headers ?? j?.headers, params: W?.params ?? j?.params, query: W?.query ?? j?.query, cookie: W?.cookie ?? j?.cookie, response: J2(j?.response, W?.response), type: j?.type || W?.type, detail: c(W?.detail ?? {}, j?.detail ?? {}), parse: x(j?.parse, W?.parse), transform: x(j?.transform, W?.transform), beforeHandle: x(j?.beforeHandle, W?.beforeHandle), afterHandle: x(j?.afterHandle, W?.afterHandle), mapResponse: x(j?.mapResponse, W?.mapResponse), afterResponse: x(j?.afterResponse, W?.afterResponse), trace: x(j?.trace, W?.trace), error: x(j?.error, W?.error) };
};
var Q2 = (j, W, $ = true) => {
  if (!Array.isArray(W))
    return h(j, W, $);
  for (let X of W)
    j = h(j, X, $);
  return j;
};
var h = (j, W, $ = true) => {
  if (!j)
    return j;
  if (W.untilObjectFound && !$ && j.type === "object")
    return j;
  const X = W.from[Kind];
  if (j.oneOf) {
    for (let Q = 0;Q < j.oneOf.length; Q++)
      j.oneOf[Q] = h(j.oneOf[Q], W, $);
    return j;
  }
  if (j.anyOf) {
    for (let Q = 0;Q < j.anyOf.length; Q++)
      j.anyOf[Q] = h(j.anyOf[Q], W, $);
    return j;
  }
  if (j.allOf) {
    for (let Q = 0;Q < j.allOf.length; Q++)
      j.allOf[Q] = h(j.allOf[Q], W, $);
    return j;
  }
  if (j.not) {
    for (let Q = 0;Q < j.not.length; Q++)
      j.not[Q] = h(j.not[Q], W, $);
    return j;
  }
  const Z = $ && !!W.excludeRoot;
  if (j[Kind] === X) {
    const { anyOf: Q, oneOf: K, allOf: Y, not: B, properties: U, items: _, ...M } = j, G = W.to();
    let w;
    const z = (F) => {
      if (U && F.type === "object") {
        const O = {};
        for (let [V, C] of Object.entries(U))
          O[V] = h(C, W, false);
        return { ...M, ...F, properties: O };
      }
      if (_ && F.type === "array")
        return { ...M, ...F, items: h(_, W, false) };
      const P = { ...M, ...F };
      if (delete P.required, U && F.type === "string" && F.format === "ObjectString" && F.default === "{}")
        w = A.ObjectString(U, M), P.default = JSON.stringify(exports_value2.Create(A.Object(U))), P.properties = U;
      if (_ && F.type === "string" && F.format === "ArrayString" && F.default === "[]")
        w = A.ArrayString(_, M), P.default = JSON.stringify(exports_value2.Create(A.Array(_))), P.items = _;
      return P;
    };
    if (Z) {
      if (U) {
        const F = {};
        for (let [P, O] of Object.entries(U))
          F[P] = h(O, W, false);
        return { ...M, properties: F };
      } else if (_?.map)
        return { ...M, items: _.map((F) => h(F, W, false)) };
      return M;
    }
    if (G.anyOf)
      for (let F = 0;F < G.anyOf.length; F++)
        G.anyOf[F] = z(G.anyOf[F]);
    else if (G.oneOf)
      for (let F = 0;F < G.oneOf.length; F++)
        G.oneOf[F] = z(G.oneOf[F]);
    else if (G.allOf)
      for (let F = 0;F < G.allOf.length; F++)
        G.allOf[F] = z(G.allOf[F]);
    else if (G.not)
      for (let F = 0;F < G.not.length; F++)
        G.not[F] = z(G.not[F]);
    if (w)
      G[TransformKind] = w[TransformKind];
    if (G.anyOf || G.oneOf || G.allOf || G.not)
      return G;
    if (U) {
      const F = {};
      for (let [P, O] of Object.entries(U))
        F[P] = h(O, W, false);
      return { ...M, ...G, properties: F };
    } else if (_?.map)
      return { ...M, ...G, items: _.map((F) => h(F, W, false)) };
    return { ...M, ...G };
  }
  const J = j?.properties;
  if (J)
    for (let [Q, K] of Object.entries(J))
      switch (K[Kind]) {
        case X:
          const { anyOf: Y, oneOf: B, allOf: U, not: _, type: M, ...G } = K, w = W.to();
          if (w.anyOf)
            for (let z = 0;z < w.anyOf.length; z++)
              w.anyOf[z] = { ...G, ...w.anyOf[z] };
          else if (w.oneOf)
            for (let z = 0;z < w.oneOf.length; z++)
              w.oneOf[z] = { ...G, ...w.oneOf[z] };
          else if (w.allOf)
            for (let z = 0;z < w.allOf.length; z++)
              w.allOf[z] = { ...G, ...w.allOf[z] };
          else if (w.not)
            for (let z = 0;z < w.not.length; z++)
              w.not[z] = { ...G, ...w.not[z] };
          J[Q] = { ...G, ...h(G, W, false) };
          break;
        case "Object":
        case "Union":
          J[Q] = h(K, W, false);
          break;
        default:
          if (K.items)
            for (let z = 0;z < K.items.length; z++)
              K.items[z] = h(K.items[z], W, false);
          else if (K.anyOf || K.oneOf || K.allOf || K.not)
            J[Q] = h(K, W, false);
          break;
      }
  return j;
};
var m = (j, { models: W = {}, dynamic: $ = false, normalize: X = false, additionalProperties: Z = false, coerce: J = false, additionalCoerce: Q = [] } = {}) => {
  if (!j)
    return;
  if (typeof j === "string" && !(j in W))
    return;
  let K = typeof j === "string" ? W[j] : j;
  if (J)
    K = Q2(K, [{ from: A.Number(), to: () => A.Numeric(), untilObjectFound: true }, { from: A.Boolean(), to: () => A.BooleanString(), untilObjectFound: true }, ...Array.isArray(Q) ? Q : [Q]]);
  if (K.type === "object" && "additionalProperties" in K === false)
    K.additionalProperties = Z;
  const Y = (U) => exports_value2.Clean(K, U);
  if ($) {
    const U = { schema: K, references: "", checkFunc: () => {
    }, code: "", Check: (_) => exports_value2.Check(K, _), Errors: (_) => exports_value2.Errors(K, _), Code: () => "", Clean: Y };
    if (X && K.additionalProperties === false)
      U.Clean = Y;
    if (K.config) {
      if (U.config = K.config, U?.schema?.config)
        delete U.schema.config;
    }
    return U.parse = (_) => {
      try {
        return U.Decode(_);
      } catch (M) {
        throw [...U.Errors(_)].map(s);
      }
    }, U.safeParse = (_) => {
      try {
        return { success: true, data: U.Decode(_), error: null };
      } catch (M) {
        const G = [...B.Errors(_)].map(s);
        return { success: false, data: null, error: G[0]?.summary, errors: G };
      }
    }, U;
  }
  const B = TypeCompiler.Compile(K, Object.values(W));
  if (B.Clean = Y, K.config) {
    if (B.config = K.config, B?.schema?.config)
      delete B.schema.config;
  }
  return B.parse = (U) => {
    try {
      return B.Decode(U);
    } catch (_) {
      throw [...B.Errors(U)].map(s);
    }
  }, B.safeParse = (U) => {
    try {
      return { success: true, data: B.Decode(U), error: null };
    } catch (_) {
      const M = [...B.Errors(U)].map(s);
      return { success: false, data: null, error: M[0]?.summary, errors: M };
    }
  }, B;
};
var e0 = (j, { models: W = {}, dynamic: $ = false, normalize: X = false, additionalProperties: Z = false }) => {
  if (!j)
    return;
  if (typeof j === "string" && !(j in W))
    return;
  const J = typeof j === "string" ? W[j] : j, Q = (Y, B) => {
    const U = (M) => {
      if (!M || typeof M !== "object")
        return exports_value2.Clean(Y, M);
      let G = false;
      const w = new Set, z = (F) => {
        if (w.has(F))
          return F;
        if (w.add(F), Array.isArray(F))
          return F.map((C) => z(C));
        const P = {};
        for (let [C, T] of Object.entries(F))
          if (Array.isArray(T))
            P[C] = z(T), delete F[C];
        Object.assign(F, P);
        const O = {};
        let V = F;
        while (V !== null) {
          for (let C of Object.getOwnPropertyNames(V)) {
            const T = Object.getOwnPropertyDescriptor(V, C);
            if (T && typeof T.get === "function" && C !== "__proto__")
              O[C] = F[C], delete V[C], G = true;
          }
          V = Object.getPrototypeOf(V);
        }
        return Object.assign(F, O), F;
      };
      if (M = z(M), !G)
        return exports_value2.Clean(Y, M);
      if (Array.isArray(M))
        M = exports_value2.Clean(Y, M);
      else
        M = { ...exports_value2.Clean(Y, M) };
      return M;
    };
    if ($)
      return { schema: Y, references: "", checkFunc: () => {
      }, code: "", Check: (M) => exports_value2.Check(Y, M), Errors: (M) => exports_value2.Errors(Y, M), Code: () => "" };
    const _ = TypeCompiler.Compile(Y, B);
    if (X && Y.additionalProperties === false)
      _.Clean = U;
    return _;
  };
  if (Kind in J) {
    if ("additionalProperties" in J === false)
      J.additionalProperties = Z;
    return { 200: Q(J, Object.values(W)) };
  }
  const K = {};
  return Object.keys(J).forEach((Y) => {
    const B = J[+Y];
    if (typeof B === "string") {
      if (B in W) {
        const U = W[B];
        U.type === "object" && "additionalProperties" in U, K[+Y] = Kind in U ? Q(U, Object.values(W)) : U;
      }
      return;
    }
    if (B.type === "object" && "additionalProperties" in B === false)
      B.additionalProperties = Z;
    K[+Y] = Kind in B ? Q(B, Object.values(W)) : B;
  }), K;
};
var wj = typeof Bun !== "undefined";
var Dj = wj && typeof Bun.hash === "function";
var I0 = (j) => {
  if (Dj)
    return Bun.hash(j);
  let W = 9;
  for (let $ = 0;$ < j.length; )
    W = Math.imul(W ^ j.charCodeAt($++), 387420489);
  return W = W ^ W >>> 9;
};
var P1;
var F0 = () => {
  if (!P1)
    P1 = [{ from: A.Object({}), to: () => A.ObjectString({}), excludeRoot: true }, { from: A.Array(A.Any()), to: () => A.ArrayString(A.Any()) }];
  return P1;
};
var j1 = ({ validator: j, defaultConfig: W = {}, config: $, dynamic: X, models: Z }) => {
  let J = m(j, { dynamic: X, models: Z, additionalProperties: true, coerce: true, additionalCoerce: F0() });
  if (p(W))
    if (J)
      J.config = Yj(J.config, $);
    else
      J = m(A.Cookie({}), { dynamic: X, models: Z, additionalProperties: true }), J.config = W;
  return J;
};
var j0 = (j, W) => {
  if (!W)
    return;
  if (!Array.isArray(W)) {
    const X = W;
    if (j && !X.checksum)
      X.checksum = j;
    if (X.scope === "scoped")
      X.scope = "local";
    return X;
  }
  const $ = [...W];
  for (let X of $) {
    if (j && !X.checksum)
      X.checksum = j;
    if (X.scope === "scoped")
      X.scope = "local";
  }
  return $;
};
var N1 = (j, W, $) => {
  return { start: x(j.start, j0($, W?.start)), request: x(j.request, j0($, W?.request)), parse: x(j.parse, j0($, W?.parse)), transform: x(j.transform, j0($, W?.transform)), beforeHandle: x(j.beforeHandle, j0($, W?.beforeHandle)), afterHandle: x(j.afterHandle, j0($, W?.afterHandle)), mapResponse: x(j.mapResponse, j0($, W?.mapResponse)), afterResponse: x(j.afterResponse, j0($, W?.afterResponse)), trace: x(j.trace, j0($, W?.trace)), error: x(j.error, j0($, W?.error)), stop: x(j.stop, j0($, W?.stop)) };
};
var G2 = (j, W, { skipIfHasType: $ = false } = {}) => {
  if (!j)
    return j;
  if (!Array.isArray(j)) {
    if ($)
      j.scope ??= W;
    else
      j.scope = W;
    return j;
  }
  for (let X of j)
    if ($)
      X.scope ??= W;
    else
      X.scope = W;
  return j;
};
var M0 = (j) => {
  if (!j)
    return j;
  if (!Array.isArray(j))
    switch (j.scope) {
      case "global":
      case "scoped":
        return { ...j };
      default:
        return { fn: j };
    }
  const W = [];
  for (let $ of j)
    switch ($.scope) {
      case "global":
      case "scoped":
        W.push({ ...$ });
        break;
    }
  return W;
};
var O1 = (j) => {
  return { ...j, type: j?.type, detail: j?.detail, parse: M0(j?.parse), transform: M0(j?.transform), beforeHandle: M0(j?.beforeHandle), afterHandle: M0(j?.afterHandle), mapResponse: M0(j?.mapResponse), afterResponse: M0(j?.afterResponse), error: M0(j?.error), trace: M0(j?.trace) };
};
var Y0 = { Continue: 100, "Switching Protocols": 101, Processing: 102, "Early Hints": 103, OK: 200, Created: 201, Accepted: 202, "Non-Authoritative Information": 203, "No Content": 204, "Reset Content": 205, "Partial Content": 206, "Multi-Status": 207, "Already Reported": 208, "Multiple Choices": 300, "Moved Permanently": 301, Found: 302, "See Other": 303, "Not Modified": 304, "Temporary Redirect": 307, "Permanent Redirect": 308, "Bad Request": 400, Unauthorized: 401, "Payment Required": 402, Forbidden: 403, "Not Found": 404, "Method Not Allowed": 405, "Not Acceptable": 406, "Proxy Authentication Required": 407, "Request Timeout": 408, Conflict: 409, Gone: 410, "Length Required": 411, "Precondition Failed": 412, "Payload Too Large": 413, "URI Too Long": 414, "Unsupported Media Type": 415, "Range Not Satisfiable": 416, "Expectation Failed": 417, "I'm a teapot": 418, "Misdirected Request": 421, "Unprocessable Content": 422, Locked: 423, "Failed Dependency": 424, "Too Early": 425, "Upgrade Required": 426, "Precondition Required": 428, "Too Many Requests": 429, "Request Header Fields Too Large": 431, "Unavailable For Legal Reasons": 451, "Internal Server Error": 500, "Not Implemented": 501, "Bad Gateway": 502, "Service Unavailable": 503, "Gateway Timeout": 504, "HTTP Version Not Supported": 505, "Variant Also Negotiates": 506, "Insufficient Storage": 507, "Loop Detected": 508, "Not Extended": 510, "Network Authentication Required": 511 };
var W1 = Object.fromEntries(Object.entries(Y0).map(([j, W]) => [W, j]));
var X2 = new TextEncoder;
var b0 = async (j, W) => {
  if (typeof j !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (W === null)
    throw new TypeError("Secret key must be provided.");
  const $ = await crypto.subtle.importKey("raw", X2.encode(W), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), X = await crypto.subtle.sign("HMAC", $, X2.encode(j));
  return j + "." + Mj(Buffer.from(X).toString("base64"));
};
var z1 = async (j, W) => {
  if (typeof j !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (W === null)
    throw new TypeError("Secret key must be provided.");
  const $ = j.slice(0, j.lastIndexOf("."));
  return await b0($, W) === j ? $ : false;
};
var K2 = (j, W) => {
  if (!j || typeof j !== "object" || !W)
    return;
  for (let [$, X] of Object.entries(W)) {
    if ($ in _j || !($ in j))
      continue;
    const Z = j[$];
    if (typeof Z === "function")
      Z(X), delete W[$];
  }
};
var B2 = ({ globalHook: j, localHook: W }) => ($) => (X, Z) => {
  if (typeof X === "function")
    X = { fn: X };
  if ("fn" in X || Array.isArray(X)) {
    if (!W[$])
      W[$] = [];
    if (typeof W[$] === "function")
      W[$] = [W[$]];
    if (Array.isArray(X))
      W[$] = W[$].concat(X);
    else
      W[$].push(X);
    return;
  }
  const { insert: J = "after", stack: Q = "local" } = X;
  if (typeof Z === "function")
    Z = { fn: Z };
  if (Q === "global")
    if (!Array.isArray(Z))
      if (J === "before")
        j[$].unshift(Z);
      else
        j[$].push(Z);
    else if (J === "before")
      j[$] = Z.concat(j[$]);
    else
      j[$] = j[$].concat(Z);
  else {
    if (!W[$])
      W[$] = [];
    if (typeof W[$] === "function")
      W[$] = [W[$]];
    if (!Array.isArray(Z))
      if (J === "before")
        W[$].unshift(Z);
      else
        W[$].push(Z);
    else if (J === "before")
      W[$] = Z.concat(W[$]);
    else
      W[$] = W[$].concat(Z);
  }
};
var Fj = (j) => {
  if (typeof j === "number")
    return j;
  if (j.length < 16) {
    if (j.trim().length === 0)
      return null;
    const W = Number(j);
    if (Number.isNaN(W))
      return null;
    return W;
  }
  if (j.length === 16) {
    if (j.trim().length === 0)
      return null;
    const W = Number(j);
    if (Number.isNaN(W) || W.toString() !== j)
      return null;
    return W;
  }
  return null;
};
var $1 = (j) => Fj(j) !== null;

class V1 {
  j;
  root = null;
  promises = [];
  constructor(j = console.error) {
    this.onError = j;
  }
  get size() {
    return this.promises.length;
  }
  add(j) {
    return this.promises.push(j), this.root ||= this.drain(), j;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch (j) {
        this.onError(j);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  then(j, W) {
    return (this.root ?? Promise.resolve()).then(j, W);
  }
}
var i = (j) => {
  if (!j)
    return j;
  if (!Array.isArray(j)) {
    if (typeof j === "function")
      return { fn: j };
    else if ("fn" in j)
      return j;
  }
  const W = [];
  for (let $ of j)
    if (typeof $ === "function")
      W.push({ fn: $ });
    else if ("fn" in $)
      W.push($);
  return W;
};
var Y2 = (j) => {
  return { ...j, start: i(j?.start), request: i(j?.request), parse: i(j?.parse), transform: i(j?.transform), beforeHandle: i(j?.beforeHandle), afterHandle: i(j?.afterHandle), mapResponse: i(j?.mapResponse), afterResponse: i(j?.afterResponse), trace: i(j?.trace), error: i(j?.error), stop: i(j?.stop) };
};
var A1 = (j) => {
  return { ...j, start: j.start?.map((W) => W.fn), request: j.request?.map((W) => W.fn), parse: j.parse?.map((W) => W.fn), transform: j.transform?.map((W) => W.fn), beforeHandle: j.beforeHandle?.map((W) => W.fn), afterHandle: j.afterHandle?.map((W) => W.fn), afterResponse: j.afterResponse?.map((W) => W.fn), mapResponse: j.mapResponse?.map((W) => W.fn), trace: j.trace?.map((W) => W.fn), error: j.error?.map((W) => W.fn), stop: j.stop?.map((W) => W.fn) };
};
var u0 = (j) => ({ body: j.body, cookie: j.cookie, headers: j.headers, query: j.query, set: j.set, server: j.server });
var h0 = (j, W = 302) => Response.redirect(j, W);
var zj = Symbol("ElysiaFormData");
var P0 = Symbol("ElysiaRequestId");
var z0 = (j) => {
  const W = new FormData;
  for (let [$, X] of Object.entries(j)) {
    if (Array.isArray(X)) {
      for (let Z of X) {
        if (X instanceof File)
          W.append($, X, X.name);
        W.append($, Z);
      }
      continue;
    }
    if (X instanceof File)
      W.append($, X, X.name);
    W.append($, X);
  }
  return W;
};
var X1 = () => crypto.getRandomValues(new Uint32Array(1))[0];
var Z1 = (j) => {
  const W = [];
  for (let $ = 0;$ < j.length; $++) {
    const X = j[$];
    if (X.checksum) {
      if (W.includes(X.checksum))
        j.splice($, 1), $--;
      W.push(X.checksum);
    }
  }
  return j;
};
var v = (j, W = "scoped") => {
  if (W === "scoped") {
    for (let $ of j)
      if ("scope" in $ && $.scope === "local")
        $.scope = "scoped";
    return;
  }
  for (let $ of j)
    if ("scope" in $)
      $.scope = "global";
};
var U2 = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var N0 = Symbol("ElysiaErrorCode");
var d = Symbol("ElysiaResponse");
var d0 = (U2?.NODE_ENV ?? U2?.ENV) === "production";
var C1 = (j, W) => {
  const $ = W ?? (j in W1 ? W1[j] : j);
  return { [d]: Y0[j] ?? j, response: $, _type: undefined, error: new Error($) };
};

class J1 extends Error {
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(j) {
    super(j ?? "INTERNAL_SERVER_ERROR");
  }
}

class O0 extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor(j) {
    super(j ?? "NOT_FOUND");
  }
}

class Q1 extends Error {
  code = "PARSE";
  status = 400;
  constructor() {
    super("Failed to parse body");
  }
}

class f0 extends Error {
  j;
  code = "INVALID_COOKIE_SIGNATURE";
  status = 400;
  constructor(j, W) {
    super(W ?? `"${j}" has invalid cookie signature`);
    this.key = j;
  }
}
var s = (j) => {
  const { message: W, path: $, value: X, type: Z } = j, J = $.slice(1).replaceAll("/", "."), Q = $ === "";
  switch (Z) {
    case 42:
      return { ...j, summary: Q ? "Value should not be provided" : `Property '${J}' should not be provided` };
    case 45:
      return { ...j, summary: Q ? "Value is missing" : `Property '${J}' is missing` };
    case 50:
      const K = W.indexOf("'"), Y = W.slice(K + 1, W.indexOf("'", K + 1));
      return { ...j, summary: Q ? "Value should be an email" : `Property '${J}' should be ${Y}` };
    case 54:
      return { ...j, summary: `${W.slice(0, 9)} property '${J}' to be ${W.slice(8)} but found: ${X}` };
    case 62:
      const B = j.schema.anyOf.map((U) => `'${U?.format ?? U.type}'`).join(", ");
      return { ...j, summary: Q ? `Value should be one of ${B}` : `Property '${J}' should be one of: ${B}` };
    default:
      return { summary: W, ...j };
  }
};

class L extends Error {
  j;
  W;
  $;
  code = "VALIDATION";
  status = 422;
  constructor(j, W, $) {
    if ($ && typeof $ === "object" && d in $)
      $ = $.response;
    const X = d0 ? undefined : ("Errors" in W) ? W.Errors($).First() : exports_value2.Errors(W, $).First(), Z = X?.schema.error !== undefined ? typeof X.schema.error === "function" ? X.schema.error({ type: j, validator: W, value: $, get errors() {
      return [...W.Errors($)].map(s);
    } }) : X.schema.error : undefined, J = X?.path || "root";
    let Q = "";
    if (Z !== undefined)
      Q = typeof Z === "object" ? JSON.stringify(Z) : Z + "";
    else if (d0)
      Q = JSON.stringify({ type: "validation", on: j, summary: s(X).summary, message: X?.message, found: $ });
    else {
      const K = W?.schema ?? W, Y = "Errors" in W ? [...W.Errors($)].map(s) : [...exports_value2.Errors(W, $)].map(s);
      let B;
      try {
        B = exports_value2.Create(K);
      } catch (U) {
        B = { type: "Could not create expected value", message: U?.message, error: U };
      }
      Q = JSON.stringify({ type: "validation", on: j, summary: Y[0]?.summary, property: J, message: X?.message, expected: B, found: $, errors: Y }, null, 2);
    }
    super(Q);
    this.type = j;
    this.validator = W;
    this.value = $;
    Object.setPrototypeOf(this, L.prototype);
  }
  get all() {
    return "Errors" in this.validator ? [...this.validator.Errors(this.value)].map(s) : [...exports_value2.Errors(this.validator, this.value)].map(s);
  }
  static simplifyModel(j) {
    const W = "schema" in j ? j.schema : j;
    try {
      return exports_value2.Create(W);
    } catch {
      return W;
    }
  }
  get model() {
    return L.simplifyModel(this.validator);
  }
  toResponse(j) {
    return new Response(this.message, { status: 400, headers: { ...j, "content-type": "application/json" } });
  }
}
var S1 = { open(j) {
  j.data.open?.(j);
}, message(j, W) {
  j.data.message?.(j, W);
}, drain(j) {
  j.data.drain?.(j);
}, close(j, W, $) {
  j.data.close?.(j, W, $);
} };

class R0 {
  j;
  W;
  validator;
  _validator;
  constructor(j, W) {
    this.raw = j;
    this.data = W;
    if (this.validator = j.data.validator, j.data.id)
      this.id = j.data.id;
    else
      this.id = X1().toString();
  }
  get id() {
    return this.raw.data.id;
  }
  set id(j) {
    this.raw.data.id = j;
  }
  get publish() {
    return (j, W = undefined, $) => {
      if (this.validator?.Check(W) === false)
        throw new L("message", this.validator, W);
      if (typeof W === "object")
        W = JSON.stringify(W);
      return this.raw.publish(j, W, $), this;
    };
  }
  get send() {
    return (j) => {
      if (this.validator?.Check(j) === false)
        throw new L("message", this.validator, j);
      if (Buffer.isBuffer(j))
        return this.raw.send(j), this;
      if (typeof j === "object")
        j = JSON.stringify(j);
      return this.raw.send(j), this;
    };
  }
  get subscribe() {
    return (j) => {
      return this.raw.subscribe(j), this;
    };
  }
  get unsubscribe() {
    return (j) => {
      return this.raw.unsubscribe(j), this;
    };
  }
  get cork() {
    return (j) => {
      return this.raw.cork(j), this;
    };
  }
  get close() {
    return () => {
      return this.raw.close(), this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}
var T1 = "1.1.5";
var c0 = Y1(r0(), 1);
var G1 = /\+/g;
var w2 = Y1(r0(), 1);
var l0 = Symbol("ElysiaTrace");
var U0 = () => {
  const { promise: j, resolve: W } = Promise.withResolvers(), { promise: $, resolve: X } = Promise.withResolvers(), { promise: Z, resolve: J } = Promise.withResolvers(), Q = [], K = [];
  return [(Y) => {
    if (Y)
      Q.push(Y);
    return j;
  }, (Y) => {
    const B = [], U = [];
    let _ = null;
    for (let G = 0;G < (Y.total ?? 0); G++) {
      const { promise: w, resolve: z } = Promise.withResolvers(), { promise: F, resolve: P } = Promise.withResolvers(), { promise: O, resolve: V } = Promise.withResolvers(), C = [], T = [];
      B.push((H) => {
        if (H)
          C.push(H);
        return w;
      }), U.push((H) => {
        const k = { ...H, end: F, error: O, index: G, onStop(b) {
          if (b)
            T.push(b);
          return F;
        } };
        z(k);
        for (let b = 0;b < C.length; b++)
          C[b](k);
        return (b = null) => {
          const w0 = performance.now();
          if (b)
            _ = b;
          const R = { end: w0, error: b, get elapsed() {
            return w0 - H.begin;
          } };
          for (let Z0 = 0;Z0 < T.length; Z0++)
            T[Z0](R);
          P(w0), V(b);
        };
      });
    }
    const M = { ...Y, end: $, error: Z, onEvent(G) {
      for (let w = 0;w < B.length; w++)
        B[w](G);
    }, onStop(G) {
      if (G)
        K.push(G);
      return $;
    } };
    W(M);
    for (let G = 0;G < Q.length; G++)
      Q[G](M);
    return { resolveChild: U, resolve(G = null) {
      const w = performance.now();
      if (!G && _)
        G = _;
      const z = { end: w, error: G, get elapsed() {
        return w - Y.begin;
      } };
      for (let F = 0;F < K.length; F++)
        K[F](z);
      X(w), J(G);
    } };
  }];
};
var _2 = (j) => {
  return (W) => {
    const [$, X] = U0(), [Z, J] = U0(), [Q, K] = U0(), [Y, B] = U0(), [U, _] = U0(), [M, G] = U0(), [w, z] = U0(), [F, P] = U0(), [O, V] = U0();
    return j({ id: W[P0], context: W, set: W.set, onRequest: $, onParse: Z, onTransform: Q, onBeforeHandle: Y, onHandle: U, onAfterHandle: M, onMapResponse: F, onAfterResponse: O, onError: w }), { request: X, parse: J, transform: K, beforeHandle: B, handle: _, afterHandle: G, error: z, mapResponse: P, afterResponse: V };
  };
};
var Pj = new Headers().toJSON;
var D2 = { optional: Symbol.for("TypeBox.Optional"), kind: Symbol.for("TypeBox.Kind") };
var _0 = (j) => {
  if (!j)
    return false;
  const W = j?.schema;
  return !!W && D2.optional in W;
};
var $0 = (j) => {
  if (!j)
    return false;
  const W = j?.schema ?? j;
  if (W.anyOf)
    return W.anyOf.some($0);
  if (W.someOf)
    return W.someOf.some($0);
  if (W.allOf)
    return W.allOf.some($0);
  if (W.not)
    return W.not.some($0);
  if (W.type === "object") {
    const $ = W.properties;
    if ("additionalProperties" in W)
      return W.additionalProperties;
    for (let X of Object.keys($)) {
      const Z = $[X];
      if (Z.type === "object") {
        if ($0(Z))
          return true;
      } else if (Z.anyOf) {
        for (let J = 0;J < Z.anyOf.length; J++)
          if ($0(Z.anyOf[J]))
            return true;
      }
      return Z.additionalProperties;
    }
    return false;
  }
  return false;
};
var L1 = ({ context: j = "c", trace: W, addFn: $ }) => {
  if (!W.length)
    return () => {
      return { resolveChild() {
        return () => {
        };
      }, resolve() {
      } };
    };
  for (let X = 0;X < W.length; X++)
    $(`let report${X}, reportChild${X}, reportErr${X}, reportErrChild${X}; let trace${X} = ${j}[ELYSIA_TRACE]?.[${X}] ?? trace[${X}](${j});\n`);
  return (X, { name: Z, total: J = 0 } = {}) => {
    if (!Z)
      Z = "anonymous";
    const Q = X === "error" ? "reportErr" : "report";
    for (let K = 0;K < W.length; K++)
      $(`\n${Q}${K} = trace${K}.${X}({id,event: '${X}',name: '${Z}',begin: performance.now(),total: ${J}})\n`);
    return { resolve() {
      for (let K = 0;K < W.length; K++)
        $(`\n${Q}${K}.resolve()\n`);
    }, resolveChild(K) {
      for (let Y = 0;Y < W.length; Y++)
        $(`${Q}Child${Y} = ${Q}${Y}.resolveChild?.shift()?.({id,event: '${X}',name: '${K}',begin: performance.now()})\n`);
      return (Y) => {
        for (let B = 0;B < W.length; B++)
          if (Y)
            $(`
                             	if (${Y} instanceof Error)
                    				${Q}Child${B}?.(${Y})
                           		else
                             		${Q}Child${B}?.()\n`);
          else
            $(`${Q}Child${B}?.()\n`);
      };
    } };
  };
};
var Nj = ({ injectResponse: j = "", normalize: W = false, validator: $ }) => ({ composeValidation: (X, Z = `c.${X}`) => `c.set.status = 422; throw new ValidationError('${X}', validator.${X}, ${Z})`, composeResponseValidation: (X = "r") => {
  let Z = "\n" + j + "\n";
  Z += `if(typeof ${X} === "object" && ${X} && ELYSIA_RESPONSE in ${X}) {
			c.set.status = ${X}[ELYSIA_RESPONSE]
			${X} = ${X}.response
		}

		const isResponse = ${X} instanceof Response\n\n`, Z += "switch(c.set.status) {\n";
  for (let [J, Q] of Object.entries($.response)) {
    if (Z += `\tcase ${J}:
				if (!isResponse) {\n`, W && "Clean" in Q && !$0(Q))
      Z += `${X} = validator.response['${J}'].Clean(${X})\n`;
    Z += `if(validator.response['${J}'].Check(${X}) === false) {
					c.set.status = 422

					throw new ValidationError('response', validator.response['${J}'], ${X})
				}

				c.set.status = ${J}
			}

			break\n\n`;
  }
  return Z += "\n}\n", Z;
} });
var k3 = Symbol.for("TypeBox.Kind");
var V0 = (j, W) => {
  if (!W)
    return;
  if (W.type === "object") {
    const $ = W.properties;
    if (!$)
      return false;
    for (let X of Object.keys($)) {
      const Z = $[X];
      if (j in Z)
        return true;
      if (Z.type === "object") {
        if (V0(j, Z))
          return true;
      } else if (Z.anyOf) {
        for (let J = 0;J < Z.anyOf.length; J++)
          if (V0(j, Z.anyOf[J]))
            return true;
      }
    }
    return false;
  }
  return j in W;
};
var q1 = Symbol.for("TypeBox.Transform");
var A0 = (j) => {
  if (!j)
    return;
  if (j.type === "object" && j.properties) {
    const W = j.properties;
    for (let $ of Object.keys(W)) {
      const X = W[$];
      if (X.type === "object") {
        if (A0(X))
          return true;
      } else if (X.anyOf) {
        for (let J = 0;J < X.anyOf.length; J++)
          if (A0(X.anyOf[J]))
            return true;
      }
      if (q1 in X)
        return true;
    }
    return false;
  }
  return q1 in j || j.properties && q1 in j.properties;
};
var Oj = /(?:return|=>) \S+\(/g;
var C0 = (j) => {
  return (j?.fn ?? j).constructor.name === "AsyncFunction";
};
var g = (j) => {
  const W = j?.fn ?? j;
  if (W.constructor.name === "AsyncFunction")
    return true;
  const $ = W.toString();
  if ($.includes("=> response.clone("))
    return false;
  if ($.includes("await"))
    return true;
  if ($.includes("async"))
    return true;
  return !!$.match(Oj);
};
var K1 = (j) => {
  const W = j?.fn ?? j;
  return W.constructor.name === "AsyncGeneratorFunction" || W.constructor.name === "GeneratorFunction";
};
var M2 = ({ app: j, path: W, method: $, localHook: X, hooks: Z, validator: J, handler: Q, allowMeta: K = false, inference: Y }) => {
  const B = typeof Q === "function";
  if (!B)
    Q = y(Q, { headers: j.setHeaders ?? {} });
  const U = B ? "handler(c)" : "handler", _ = Z.afterResponse.length > 0, M = Z.trace.length > 0;
  let G = "";
  if (Y = t0(Object.assign(X, { handler: Q }), Y), Y.server)
    G += `\nObject.defineProperty(c, 'server', {
			get: function() { return getServer() }
		})\n`;
  if (Y.body)
    G += "let isParsing = false\n";
  J.createBody?.(), J.createQuery?.(), J.createHeaders?.(), J.createParams?.(), J.createCookie?.(), J.createResponse?.();
  const w = Y.query || !!J.query, z = $ !== "$INTERNALWS" && $ !== "GET" && $ !== "HEAD" && (Y.body || !!J.body || Z.parse.length), F = j.setHeaders, P = F && !!Object.keys(F).length, O = Y.headers || J.headers, V = Y.cookie || !!J.cookie, C = V ? j1({ validator: J.cookie, defaultConfig: j.config.cookie, dynamic: !!j.config.aot, config: J.cookie?.config ?? {}, models: j.definitions.type }) : undefined, T = C?.config;
  let H = "";
  if (T?.sign) {
    if (!T.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${$}) ${W}.`);
    const I = !T.secrets ? undefined : typeof T.secrets === "string" ? T.secrets : T.secrets[0];
    if (H += `const _setCookie = c.set.cookie
		if(_setCookie) {`, T.sign === true)
      H += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${I}')
			}`;
    else
      for (let D of T.sign)
        H += `if(_setCookie['${D}']?.value) { c.set.cookie['${D}'].value = await signCookie(_setCookie['${D}'].value, '${I}') }\n`;
    H += "}\n";
  }
  const k = j.config.normalize, { composeValidation: b, composeResponseValidation: w0 } = Nj({ normalize: k, validator: J });
  if (O)
    G += Pj ? "c.headers = c.request.headers.toJSON()\n" : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  if (V) {
    const I = (N, S) => {
      const q = T?.[N] ?? S;
      if (!q)
        return typeof S === "string" ? `${N}: "${S}",` : `${N}: ${S},`;
      if (typeof q === "string")
        return `${N}: '${q}',`;
      if (q instanceof Date)
        return `${N}: new Date(${q.getTime()}),`;
      return `${N}: ${q},`;
    }, D = T ? `{
			secrets: ${T.secrets !== undefined ? typeof T.secrets === "string" ? `'${T.secrets}'` : "[" + T.secrets.reduce((N, S) => N + `'${S}',`, "") + "]" : "undefined"},
			sign: ${T.sign === true ? true : T.sign !== undefined ? "[" + T.sign.reduce((N, S) => N + `'${S}',`, "") + "]" : "undefined"},
			${I("domain")}
			${I("expires")}
			${I("httpOnly")}
			${I("maxAge")}
			${I("path", "/")}
			${I("priority")}
			${I("sameSite")}
			${I("secure")}
		}` : "undefined";
    if (O)
      G += `\nc.cookie = await parseCookie(c.set, c.headers.cookie, ${D})\n`;
    else
      G += `\nc.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${D})\n`;
  }
  if (w) {
    const I = [];
    if (J.query && J.query.schema.type === "object") {
      const D = J.query.schema.properties;
      if (!$0(J.query))
        for (let [N, S] of Object.entries(D)) {
          let q = S;
          if (q && D2.optional in q && q.type === "array" && q.items)
            q = q.items;
          const { type: n, anyOf: E } = q, K0 = n === "array" || E?.some((u) => u.type === "string" && u.format === "ArrayString");
          I.push({ key: N, isArray: K0, isNestedObjectArray: K0 && q.items?.type === "object" || !!q.items?.anyOf?.some((u) => u.type === "object" || u.type === "array"), isObject: n === "object" || E?.some((u) => u.type === "string" && u.format === "ArrayString"), anyOf: !!E });
        }
    }
    if (!I.length)
      G += `if(c.qi === -1) {
				c.query = {}
			} else {
				c.query = parseQuery(c.url.slice(c.qi + 1))
			}`;
    else
      G += `if(c.qi !== -1) {
				let url = '&' + c.url.slice(c.qi + 1)

				${I.map(({ key: D, isArray: N, isObject: S, isNestedObjectArray: q, anyOf: n }, E) => {
        const K0 = `${E === 0 ? "let" : ""} memory = url.indexOf('&${D}=')
							let a${E}\n`;
        if (N)
          return K0 + (q ? `while (memory !== -1) {
											const start = memory + ${D.length + 2}
											memory = url.indexOf('&', start)

											if(a${E} === undefined)
												a${E} = ''
											else
												a${E} += ','

											let temp

											if(memory === -1) temp = decodeURIComponent(url.slice(start))
											else temp = decodeURIComponent(url.slice(start, memory))

											const charCode = temp.charCodeAt(0)
											if(charCode !== 91 && charCode !== 123)
												temp = '"' + temp + '"'

											a${E} += temp

											if(memory === -1) break

											memory = url.indexOf('&${D}=', memory)
											if(memory === -1) break
										}

										try {
										    if(a${E}.charCodeAt(0) === 91)
												a${E} = JSON.parse(a${E})
											else
												a${E} = JSON.parse('[' + a${E} + ']')
										} catch {}\n` : `while (memory !== -1) {
											const start = memory + ${D.length + 2}
											memory = url.indexOf('&', start)

											if(a${E} === undefined)
												a${E} = []

											if(memory === -1) {
												a${E}.push(decodeURIComponent(url.slice(start)))
												break
											}
											else a${E}.push(decodeURIComponent(url.slice(start, memory)))

											memory = url.indexOf('&${D}=', memory)
											if(memory === -1) break
										}\n`);
        if (S)
          return K0 + `if (memory !== -1) {
										const start = memory + ${D.length + 2}
										memory = url.indexOf('&', start)

										if(memory === -1) a${E} = decodeURIComponent(url.slice(start))
										else a${E} = decodeURIComponent(url.slice(start, memory))

										if (a${E} !== undefined) {
											try {
												a${E} = JSON.parse(a${E})
											} catch {}
										}
									}`;
        return K0 + `if (memory !== -1) {
										const start = memory + ${D.length + 2}
										memory = url.indexOf('&', start)

										if(memory === -1) a${E} = decodeURIComponent(url.slice(start))
										else {
											a${E} = decodeURIComponent(url.slice(start, memory))

											${n ? `
											let deepMemory = url.indexOf('&${D}=', memory)

											if(deepMemory !== -1) {
												a${E} = [a${E}]
												let first = true

												while(true) {
													const start = deepMemory + ${D.length + 2}
													if(first)
														first = false
													else
														deepMemory = url.indexOf('&', start)

													let value
													if(deepMemory === -1) value = decodeURIComponent(url.slice(start))
													else value = decodeURIComponent(url.slice(start, deepMemory))

													const vStart = value.charCodeAt(0)
													const vEnd = value.charCodeAt(value.length - 1)

													if((vStart === 91 && vEnd === 93) || (vStart === 123 && vEnd === 125))
														try {
															a${E}.push(JSON.parse(value))
														} catch {
														 	a${E}.push(value)
														}

													if(deepMemory === -1) break
												}
											}
												` : ""}
										}
									}`;
      }).join("\n")}

				c.query = {
					${I.map(({ key: D }, N) => `'${D}': a${N}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
  }
  if (M)
    G += "\nconst id = c[ELYSIA_REQUEST_ID]\n";
  const R = L1({ trace: Z.trace, addFn: (I) => {
    G += I;
  } });
  G += "\ntry {\n";
  const Z0 = typeof Q === "function" && g(Q), r = M || Z.afterResponse.length > 0 ? "c.response = " : "", g0 = V || z || Z0 || Z.parse.length > 0 || Z.afterHandle.some(g) || Z.beforeHandle.some(g) || Z.transform.some(g) || Z.mapResponse.some(g), z2 = (typeof Q === "function" ? K1(Q) : false) || Z.beforeHandle.some(K1) || Z.afterHandle.some(K1) || Z.transform.some(K1), i0 = Y.cookie || Y.set || O || M || J.response || B && P || z2, t = ", c.request";
  G += `c.route = \`${W}\`\n`;
  const I2 = R("parse", { total: Z.parse.length });
  if (z) {
    const I = Z.parse.length || Y.body || J.body;
    if (G += "isParsing = true\n", Z.type && !Z.parse.length)
      switch (Z.type) {
        case "json":
        case "application/json":
          G += "c.body = await c.request.json()";
          break;
        case "text":
        case "text/plain":
          G += "c.body = await c.request.text()\n";
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          G += "c.body = parseQuery(await c.request.text())\n";
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          G += "c.body = await c.request.arrayBuffer()\n";
          break;
        case "formdata":
        case "multipart/form-data":
          G += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}\n`;
          break;
      }
    else if (I) {
      if (G += "\n", G += O ? "let contentType = c.headers['content-type']" : "let contentType = c.request.headers.get('content-type')", G += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)\n
					c.contentType = contentType\n`, Z.parse.length) {
        G += "let used = false\n";
        const D = R("parse", { total: Z.parse.length });
        for (let N = 0;N < Z.parse.length; N++) {
          const S = D.resolveChild(Z.parse[N].fn.name), q = `bo${N}`;
          if (N !== 0)
            G += "if(!used) {\n";
          if (G += `let ${q} = parse[${N}](c, contentType)\n`, G += `if(${q} instanceof Promise) ${q} = await ${q}\n`, G += `if(${q} !== undefined) { c.body = ${q}; used = true }\n`, S(), N !== 0)
            G += "}";
        }
        D.resolve();
      }
      if (G += "\ndelete c.contentType\n", Z.parse.length)
        G += "if (!used) {";
      if (Z.type && !Array.isArray(Z.type))
        switch (Z.type) {
          case "json":
          case "application/json":
            G += "c.body = await c.request.json()";
            break;
          case "text":
          case "text/plain":
            G += "c.body = await c.request.text()\n";
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            G += "c.body = parseQuery(await c.request.text())\n";
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            G += "c.body = await c.request.arrayBuffer()\n";
            break;
          case "formdata":
          case "multipart/form-data":
            G += `c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}\n`;
            break;
        }
      else
        G += `
					switch (contentType) {
						case 'application/json':
							c.body = await c.request.json()
							break

						case 'text/plain':
							c.body = await c.request.text()
							break

						case 'application/x-www-form-urlencoded':
							c.body = parseQuery(await c.request.text())
							break

						case 'application/octet-stream':
							c.body = await c.request.arrayBuffer();
							break

						case 'multipart/form-data':
							c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}

							break
					}`;
      if (Z.parse.length)
        G += "}";
      G += "}\n";
    }
    G += "\nisParsing = false\n";
  }
  if (I2.resolve(), Z?.transform) {
    const I = R("transform", { total: Z.transform.length });
    if (Z.transform.length)
      G += "\nlet transformed\n";
    for (let D = 0;D < Z.transform.length; D++) {
      const N = Z.transform[D], S = I.resolveChild(N.fn.name);
      if (G += g(N) ? `transformed = await transform[${D}](c)\n` : `transformed = transform[${D}](c)\n`, N.subType === "mapDerive")
        G += `if(transformed?.[ELYSIA_RESPONSE])
					throw transformed
				else {
					transformed.request = c.request
					transformed.store = c.store
					transformed.qi = c.qi
					transformed.path = c.path
					transformed.url = c.url
					transformed.redirect = c.redirect
					transformed.set = c.set
					transformed.error = c.error

					c = transformed
			}`;
      else
        G += `if(transformed?.[ELYSIA_RESPONSE])
					throw transformed
				else
					Object.assign(c, transformed)\n`;
      S();
    }
    I.resolve();
  }
  if (J) {
    if (G += "\n", J.headers) {
      if (k && "Clean" in J.headers && !$0(J.headers))
        G += "c.headers = validator.headers.Clean(c.headers);\n";
      if (V0("default", J.headers.schema))
        for (let [I, D] of Object.entries(exports_value2.Default(J.headers.schema, {}))) {
          const N = typeof D === "object" ? JSON.stringify(D) : typeof D === "string" ? `'${D}'` : D;
          if (N !== undefined)
            G += `c.headers['${I}'] ??= ${N}\n`;
        }
      if (_0(J.headers))
        G += "if(isNotEmpty(c.headers)) {";
      if (G += `if(validator.headers.Check(c.headers) === false) {
				${b("headers")}
			}`, A0(J.headers.schema))
        G += "c.headers = validator.headers.Decode(c.headers)\n";
      if (_0(J.headers))
        G += "}";
    }
    if (J.params) {
      if (V0("default", J.params.schema))
        for (let [I, D] of Object.entries(exports_value2.Default(J.params.schema, {}))) {
          const N = typeof D === "object" ? JSON.stringify(D) : typeof D === "string" ? `'${D}'` : D;
          if (N !== undefined)
            G += `c.params['${I}'] ??= ${N}\n`;
        }
      if (G += `if(validator.params.Check(c.params) === false) {
				${b("params")}
			}`, A0(J.params.schema))
        G += "\nc.params = validator.params.Decode(c.params)\n";
    }
    if (J.query) {
      if (k && "Clean" in J.query && !$0(J.query))
        G += "c.query = validator.query.Clean(c.query);\n";
      if (V0("default", J.query.schema))
        for (let [I, D] of Object.entries(exports_value2.Default(J.query.schema, {}))) {
          const N = typeof D === "object" ? JSON.stringify(D) : typeof D === "string" ? `'${D}'` : D;
          if (N !== undefined)
            G += `if(c.query['${I}'] === undefined) c.query['${I}'] = ${N}\n`;
        }
      if (_0(J.query))
        G += "if(isNotEmpty(c.query)) {";
      if (G += `if(validator.query.Check(c.query) === false) {
          		${b("query")}
			}`, A0(J.query.schema))
        G += "\nc.query = validator.query.Decode(Object.assign({}, c.query))\n";
      if (_0(J.query))
        G += "}";
    }
    if (J.body) {
      if (k && "Clean" in J.body && !$0(J.body))
        G += "c.body = validator.body.Clean(c.body);\n";
      const I = A0(J.body.schema);
      if (I || _0(J.body))
        G += '\nconst isNotEmptyObject = c.body && (typeof c.body === "object" && isNotEmpty(c.body))\n';
      if (V0("default", J.body.schema)) {
        const D = exports_value2.Default(J.body.schema, J.body.schema.type === "object" ? {} : undefined), N = typeof D === "object" ? JSON.stringify(D) : typeof D === "string" ? `'${D}'` : D;
        if (G += `if(validator.body.Check(c.body) === false) {
					if (typeof c.body === 'object') {
						c.body = Object.assign(${N}, c.body)
					} else { c.body = ${N} }`, _0(J.body))
          G += `
					    if(isNotEmptyObject && validator.body.Check(c.body) === false) {
            				${b("body")}
             			}
                    }`;
        else
          G += `
    				if(validator.body.Check(c.body) === false) {
        				${b("body")}
         			}
                }`;
      } else if (_0(J.body))
        G += `if(isNotEmptyObject && validator.body.Check(c.body) === false) {
         			${b("body")}
          		}`;
      else
        G += `if(validator.body.Check(c.body) === false) {
         			${b("body")}
          		}`;
      if (I)
        G += "\nif(isNotEmptyObject) c.body = validator.body.Decode(c.body)\n";
    }
    if (p(C?.schema?.properties ?? C?.schema?.schema ?? {})) {
      if (G += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value\n`, V0("default", C.schema))
        for (let [I, D] of Object.entries(exports_value2.Default(C.schema, {})))
          G += `cookieValue['${I}'] = ${typeof D === "object" ? JSON.stringify(D) : D}\n`;
      if (_0(J.cookie))
        G += "if(isNotEmpty(c.cookie)) {";
      if (G += `if(validator.cookie.Check(cookieValue) === false) {
				${b("cookie", "cookieValue")}
			}`, A0(J.cookie.schema))
        G += `\nfor(const [key, value] of Object.entries(validator.cookie.Decode(cookieValue)))
					c.cookie[key].value = value\n`;
      if (_0(J.cookie))
        G += "}";
    }
  }
  if (Z?.beforeHandle) {
    const I = R("beforeHandle", { total: Z.beforeHandle.length });
    let D = false;
    for (let N = 0;N < Z.beforeHandle.length; N++) {
      const S = Z.beforeHandle[N], q = I.resolveChild(S.fn.name), n = q0(S);
      if (S.subType === "resolve" || S.subType === "mapResolve") {
        if (!D)
          D = true, G += "\nlet resolved\n";
        if (G += g(S) ? `resolved = await beforeHandle[${N}](c);\n` : `resolved = beforeHandle[${N}](c);\n`, S.subType === "mapResolve")
          G += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else {
						resolved.request = c.request
						resolved.store = c.store
						resolved.qi = c.qi
						resolved.path = c.path
						resolved.url = c.url
						resolved.redirect = c.redirect
						resolved.set = c.set
						resolved.error = c.error

						c = resolved
					}`;
        else
          G += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else
						Object.assign(c, resolved)\n`;
      } else if (!n)
        G += g(S) ? `await beforeHandle[${N}](c);\n` : `beforeHandle[${N}](c);\n`, q();
      else {
        if (G += g(S) ? `be = await beforeHandle[${N}](c);\n` : `be = beforeHandle[${N}](c);\n`, q("be"), G += "if(be !== undefined) {\n", I.resolve(), Z.afterHandle?.length) {
          R("handle", { name: B ? Q.name : undefined }).resolve();
          const u = R("afterHandle", { total: Z.afterHandle.length });
          for (let J0 = 0;J0 < Z.afterHandle.length; J0++) {
            const S0 = Z.afterHandle[J0], P2 = q0(S0), N2 = u.resolveChild(S0.fn.name);
            if (G += "c.response = be\n", !P2)
              G += g(S0.fn) ? `await afterHandle[${J0}](c, be)\n` : `afterHandle[${J0}](c, be)\n`;
            else
              G += g(S0.fn) ? `af = await afterHandle[${J0}](c)\n` : `af = afterHandle[${J0}](c)\n`, G += "if(af !== undefined) { c.response = be = af }\n";
            N2("af");
          }
          u.resolve();
        }
        if (J.response)
          G += w0("be");
        const K0 = R("mapResponse", { total: Z.mapResponse.length });
        if (Z.mapResponse.length) {
          G += "\nc.response = be\n";
          for (let u = 0;u < Z.mapResponse.length; u++) {
            const J0 = Z.mapResponse[u], S0 = K0.resolveChild(J0.fn.name);
            G += `\nif(mr === undefined) {
							mr = ${C0(J0) ? "await" : ""} onMapResponse[${u}](c)
							if(mr !== undefined) be = c.response = mr
						}\n`, S0();
          }
        }
        K0.resolve(), G += H, G += `return mapEarlyResponse(${r} be, c.set ${t})}\n`;
      }
    }
    I.resolve();
  }
  if (Z?.afterHandle.length) {
    const I = R("handle", { name: B ? Q.name : undefined });
    if (Z.afterHandle.length)
      G += Z0 ? `let r = c.response = await ${U};\n` : `let r = c.response = ${U};\n`;
    else
      G += Z0 ? `let r = await ${U};\n` : `let r = ${U};\n`;
    I.resolve();
    const D = R("afterHandle", { total: Z.afterHandle.length });
    for (let S = 0;S < Z.afterHandle.length; S++) {
      const q = Z.afterHandle[S], n = q0(q), E = D.resolveChild(q.fn.name);
      if (!n)
        G += g(q.fn) ? `await afterHandle[${S}](c)\n` : `afterHandle[${S}](c)\n`, E();
      else if (G += g(q.fn) ? `af = await afterHandle[${S}](c)\n` : `af = afterHandle[${S}](c)\n`, E("af"), J.response)
        G += "if(af !== undefined) {", D.resolve(), G += w0("af"), G += "c.response = af }";
      else
        G += "if(af !== undefined) {", D.resolve(), G += "c.response = af}\n";
    }
    if (D.resolve(), G += "r = c.response\n", J.response)
      G += w0();
    G += H;
    const N = R("mapResponse", { total: Z.mapResponse.length });
    if (Z.mapResponse.length)
      for (let S = 0;S < Z.mapResponse.length; S++) {
        const q = Z.mapResponse[S], n = N.resolveChild(q.fn.name);
        G += `\nmr = ${C0(q) ? "await" : ""} onMapResponse[${S}](c)
				if(mr !== undefined) r = c.response = mr\n`, n();
      }
    if (N.resolve(), i0)
      G += `return mapResponse(${r} r, c.set ${t})\n`;
    else
      G += `return mapCompactResponse(${r} r ${t})\n`;
  } else {
    const I = R("handle", { name: B ? Q.name : undefined });
    if (J.response || Z.mapResponse.length) {
      if (G += Z0 ? `let r = await ${U};\n` : `let r = ${U};\n`, I.resolve(), J.response)
        G += w0();
      R("afterHandle").resolve();
      const D = R("mapResponse", { total: Z.mapResponse.length });
      if (Z.mapResponse.length) {
        G += "\nc.response = r\n";
        for (let N = 0;N < Z.mapResponse.length; N++) {
          const S = Z.mapResponse[N], q = D.resolveChild(S.fn.name);
          G += `\nif(mr === undefined) {
						mr = ${C0(S) ? "await" : ""} onMapResponse[${N}](c)
    					if(mr !== undefined) r = c.response = mr
					}\n`, q();
        }
      }
      if (D.resolve(), G += H, Q instanceof Response)
        G += Y.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${r} ${U}.clone(), c.set ${t})
				else
					return ${U}.clone()` : `return ${U}.clone()`, G += "\n";
      else if (i0)
        G += `return mapResponse(${r} r, c.set ${t})\n`;
      else
        G += `return mapCompactResponse(${r} r ${t})\n`;
    } else if (V || M) {
      G += Z0 ? `let r = await ${U};\n` : `let r = ${U};\n`, I.resolve(), R("afterHandle").resolve();
      const D = R("mapResponse", { total: Z.mapResponse.length });
      if (Z.mapResponse.length) {
        G += "\nc.response = r\n";
        for (let N = 0;N < Z.mapResponse.length; N++) {
          const S = Z.mapResponse[N], q = D.resolveChild(S.fn.name);
          G += `\nif(mr === undefined) {
							mr = ${C0(S) ? "await" : ""} onMapResponse[${N}](c)
    						if(mr !== undefined) r = c.response = mr
						}\n`, q();
        }
      }
      if (D.resolve(), G += H, i0)
        G += `return mapResponse(${r} r, c.set ${t})\n`;
      else
        G += `return mapCompactResponse(${r} r ${t})\n`;
    } else {
      I.resolve();
      const D = Z0 ? `await ${U}` : U;
      if (R("afterHandle").resolve(), Q instanceof Response)
        G += Y.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${r} ${U}.clone(), c.set ${t})
				else
					return ${U}.clone()` : `return ${U}.clone()`, G += "\n";
      else if (i0)
        G += `return mapResponse(${r} ${D}, c.set ${t})\n`;
      else
        G += `return mapCompactResponse(${r} ${D} ${t})\n`;
    }
  }
  if (G += "\n} catch(error) {", z)
    G += "\nif(isParsing) error = new ParseError()\n";
  if (!g0)
    G += "\nreturn (async () => {\n";
  if (G += "\nconst set = c.set\nif (!set.status || set.status < 300) set.status = error?.status || 500\n", M)
    for (let I = 0;I < Z.trace.length; I++)
      G += `report${I}?.resolve(error);reportChild${I}?.(error);\n`;
  const B1 = R("error", { total: Z.error.length });
  if (Z.error.length) {
    G += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
				let er
			`;
    for (let I = 0;I < Z.error.length; I++) {
      const D = B1.resolveChild(Z.error[I].fn.name);
      if (g(Z.error[I]))
        G += `\ner = await handleErrors[${I}](c)\n`;
      else
        G += `\ner = handleErrors[${I}](c)\nif (er instanceof Promise) er = await er\n`;
      D();
      const N = R("mapResponse", { total: Z.mapResponse.length });
      if (Z.mapResponse.length)
        for (let S = 0;S < Z.mapResponse.length; S++) {
          const q = Z.mapResponse[S], n = N.resolveChild(q.fn.name);
          G += `\nc.response = er\n
							er = ${C0(q) ? "await" : ""} onMapResponse[${S}](c)
							if(er instanceof Promise) er = await er\n`, n();
        }
      if (N.resolve(), G += `er = mapEarlyResponse(er, set ${t})\n`, G += "if (er) {", M) {
        for (let S = 0;S < Z.trace.length; S++)
          G += `\nreport${S}.resolve()\n`;
        B1.resolve();
      }
      G += "return er\n}\n";
    }
  }
  if (B1.resolve(), G += "return handleError(c, error, true)\n", !g0)
    G += "})()";
  if (G += "}", _ || M) {
    if (G += " finally { ", !g0)
      G += ";(async () => {";
    const I = R("afterResponse", { total: Z.afterResponse.length });
    if (_)
      for (let D = 0;D < Z.afterResponse.length; D++) {
        const N = I.resolveChild(Z.afterResponse[D].fn.name);
        G += `\nawait afterResponse[${D}](c);\n`, N();
      }
    if (I.resolve(), !g0)
      G += "})();";
    G += "}";
  }
  G = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			afterResponse,
			trace: _trace
		},
		validator,
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery,
			isNotEmpty
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError,
			ParseError
		},
		schema,
		definitions,
		ERROR_CODE,
		parseCookie,
		signCookie,
		decodeURIComponent,
		ELYSIA_RESPONSE,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID,
		getServer
	} = hooks

	const trace = _trace.map(x => typeof x === 'function' ? x : x.fn)

	return ${g0 ? "async" : ""} function handle(c) {
		${Z.beforeHandle.length ? "let be" : ""}
		${Z.afterHandle.length ? "let af" : ""}
		${Z.mapResponse.length ? "let mr" : ""}

		${K ? "c.schema = schema; c.defs = definitions" : ""}
		${G}
	}`;
  try {
    return Function("hooks", G)({ handler: Q, hooks: A1(Z), validator: J, handleError: j.handleError, utils: { mapResponse: y, mapCompactResponse: e, mapEarlyResponse: f, parseQuery: x0, isNotEmpty: p }, error: { NotFoundError: O0, ValidationError: L, InternalServerError: J1, ParseError: Q1 }, schema: j.router.history, definitions: j.definitions.type, ERROR_CODE: N0, parseCookie: a0, signCookie: b0, decodeURIComponent: w2.default, ELYSIA_RESPONSE: d, ELYSIA_TRACE: l0, ELYSIA_REQUEST_ID: P0, getServer: () => j.getServer() });
  } catch {
    const I = A1(Z);
    console.log("[Composer] failed to generate optimized handler"), console.log("Please report the following to SaltyAom privately as it may include sensitive information about your codebase:"), console.log("---"), console.log({ handler: typeof Q === "function" ? Q.toString() : Q, hooks: { ...I, transform: I?.transform?.map?.((D) => D.toString()), resolve: I?.resolve?.map?.((D) => D.toString()), beforeHandle: I?.beforeHandle?.map?.((D) => D.toString()), afterHandle: I?.afterHandle?.map?.((D) => D.toString()), mapResponse: I?.mapResponse?.map?.((D) => D.toString()), parse: I?.parse?.map?.((D) => D.toString()), error: I?.error?.map?.((D) => D.toString()), afterResponse: I?.afterResponse?.map?.((D) => D.toString()), stop: I?.stop?.map?.((D) => D.toString()) }, validator: J, definitions: j.definitions.type }), console.log("---"), process.exit(1);
  }
};
var E1 = (j) => {
  let W = "", $ = "";
  const X = j.setHeaders;
  for (let w of Object.keys(j.singleton.decorator))
    W += `,${w}: app.singleton.decorator.${w}`;
  const Z = j.router, J = j.event.trace.length > 0;
  let Q = `
	const route = router.find(request.method, path) ${Z.http.root.ALL ? '?? router.find("ALL", path)' : ""}

	if (route === null)
		return ${j.event.error.length ? "app.handleError(ctx, notFound)" : j.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : "error404.clone()"}

	ctx.params = route.params\n`;
  Q += `if(route.store.handler) return route.store.handler(ctx)
	return (route.store.handler = route.store.compile())(ctx)\n`;
  let K = "";
  for (let [w, { code: z, all: F }] of Object.entries(Z.static.http.map))
    K += `case '${w}':\nswitch(request.method) {\n${z}\n${F ?? "default: break map"}}\n\n`;
  const Y = j.event.request.some(g);
  if ($ += `const {
		app,
		mapEarlyResponse,
		NotFoundError,
		randomId,
		handleError,
		error,
		redirect,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID,
		getServer
	} = data

	const store = app.singleton.store
	const staticRouter = app.router.static.http
	const st = staticRouter.handlers
	const wsRouter = app.router.ws
	const router = app.router.http
	const trace = app.event.trace.map(x => typeof x === 'function' ? x : x.fn)

	const notFound = new NotFoundError()
	const hoc = app.extender.higherOrderFunctions.map(x => x.fn)

	${j.event.request.length ? "const onRequest = app.event.request.map(x => x.fn)" : ""}
	${j.event.error.length ? "" : `\nconst error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });\n`}

	${j.event.trace.length ? `const ${j.event.trace.map((w, z) => `tr${z} = app.event.trace[${z}].fn`).join(",")}` : ""}

	${Y ? "async" : ""} function map(request) {\n`, j.event.request.length)
    $ += "let re";
  if ($ += `\nconst url = request.url
		const s = url.indexOf('/', 11)
		const qi = url.indexOf('?', s + 1)
		let path
		if(qi === -1)
			path = url.substring(s)
		else
			path = url.substring(s, qi)\n`, $ += `${J ? "const id = randomId()" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			url,
			redirect,
			set: {
				headers: ${Object.keys(X ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			},
			error
			${j.inference.server ? `, get server() {
							return getServer()
						}` : ""}
			${J ? ",[ELYSIA_REQUEST_ID]: id" : ""}
			${W}
		}\n`, j.event.trace.length)
    $ += `\nctx[ELYSIA_TRACE] = [${j.event.trace.map((w, z) => `tr${z}(ctx)`).join(",")}]\n`;
  const U = L1({ context: "ctx", trace: j.event.trace, addFn: (w) => {
    $ += w;
  } })("request", { attribute: "ctx", total: j.event.request.length });
  if (j.event.request.length) {
    $ += "\n try {\n";
    for (let w = 0;w < j.event.request.length; w++) {
      const z = j.event.request[w], F = q0(z), P = g(z), O = U.resolveChild(j.event.request[w].fn.name);
      if (F)
        $ += `re = mapEarlyResponse(
					${P ? "await" : ""} onRequest[${w}](ctx),
					ctx.set,
					request
				)\n`, O("re"), $ += "if(re !== undefined) return re\n";
      else
        $ += `${P ? "await" : ""} onRequest[${w}](ctx)\n`, O();
    }
    $ += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
  }
  U.resolve();
  const _ = j.router.static.ws, M = j.router.ws;
  if (Object.keys(_).length || M.history.length) {
    $ += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (let [w, z] of Object.entries(_))
      $ += `
					case '${w}':
						if(request.headers.get('upgrade') === 'websocket')
							return st[${z}](ctx)

						break`;
    $ += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							if(route.store.handler)
							    return route.store.handler(ctx)

							return (route.store.handler = route.store.compile())(ctx)
						}
					}

					break
			}
		}\n`;
  }
  if ($ += `
		map: switch(path) {
			${K}

			default:
				break
		}

		${Q}
	}\n`, j.extender.higherOrderFunctions.length) {
    let w = "map";
    for (let z = 0;z < j.extender.higherOrderFunctions.length; z++)
      w = `hoc[${z}](${w}, request)`;
    $ += `return function hocMap(request) { return ${w}(request) }`;
  } else
    $ += "return map";
  const G = H1(j);
  return j.handleError = G, Function("data", $)({ app: j, mapEarlyResponse: f, NotFoundError: O0, randomId: X1, handleError: G, error: C1, redirect: h0, ELYSIA_TRACE: l0, ELYSIA_REQUEST_ID: P0, getServer: () => j.getServer() });
};
var H1 = (j) => {
  const W = j.event;
  let $ = "";
  $ += `const {
		app: { event: { error: onErrorContainer, afterResponse: resContainer, mapResponse: _onMapResponse, trace: _trace } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE,
		ELYSIA_TRACE,
		ELYSIA_REQUEST_ID
	} = inject

	const trace = _trace.map(x => typeof x === 'function' ? x : x.fn)
	const onMapResponse = []

	for(let i = 0; i < _onMapResponse.length; i++)
		onMapResponse.push(_onMapResponse[i].fn ?? _onMapResponse[i])

	delete _onMapResponse

	const onError = onErrorContainer.map(x => x.fn)
	const res = resContainer.map(x => x.fn)

	return ${j.event.error.find(g) || j.event.mapResponse.find(g) ? "async" : ""} function(context, error, skipGlobal) {`;
  const X = j.event.trace.length > 0;
  if (X)
    $ += "\nconst id = context[ELYSIA_REQUEST_ID]\n";
  const Z = L1({ context: "context", trace: W.trace, addFn: (K) => {
    $ += K;
  } });
  $ += `
		const set = context.set
		let r

		context.code = error.code
		context.error = error

		if(typeof error === "object" && error && ELYSIA_RESPONSE in error) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}\n`;
  const J = X || W.afterResponse.length > 0 || W.afterResponse.length > 0 ? "context.response = " : "";
  for (let K = 0;K < j.event.error.length; K++) {
    const Y = j.event.error[K], B = `${g(Y) ? "await " : ""}onError[${K}](context)`;
    if ($ += "\nif(skipGlobal !== true) {\n", q0(Y)) {
      $ += `r = ${B}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}

				if(set.status === 200) set.status = error.status\n`;
      const U = Z("mapResponse", { total: W.mapResponse.length, name: "context" });
      if (W.mapResponse.length)
        for (let _ = 0;_ < W.mapResponse.length; _++) {
          const M = W.mapResponse[_], G = U.resolveChild(M.fn.name);
          $ += `\ncontext.response = r
						r = ${C0(M) ? "await" : ""} onMapResponse[${_}](context)\n`, G();
        }
      U.resolve(), $ += `return mapResponse(${J} r, set, context.request)}\n`;
    } else
      $ += B + "\n";
    $ += "\n}\n";
  }
  $ += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 422
		return new Response(
			error.message,
			{
				headers: Object.assign(
					{ 'content-type': 'application/json'},
					set.headers
				),
				status: set.status
			}
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)\n`;
  const Q = Z("mapResponse", { total: W.mapResponse.length, name: "context" });
  if (W.mapResponse.length)
    for (let K = 0;K < W.mapResponse.length; K++) {
      const Y = W.mapResponse[K], B = Q.resolveChild(Y.fn.name);
      $ += `\ncontext.response = error
			error = ${C0(Y) ? "await" : ""} onMapResponse[${K}](context)\n`, B();
    }
  return Q.resolve(), $ += `\nreturn mapResponse(${J} error, set, context.request)\n}\n}`, Function("inject", $)({ app: j, mapResponse: y, ERROR_CODE: N0, ELYSIA_RESPONSE: d, ELYSIA_TRACE: l0, ELYSIA_REQUEST_ID: P0 });
};
var b1 = (j) => async (W) => {
  const $ = W.url, X = $.indexOf("/", 11), Z = $.indexOf("?", X + 1), J = Z === -1 ? $.substring(X) : $.substring(X, Z), Q = { cookie: {}, status: 200, headers: {} }, K = Object.assign({}, j.singleton.decorator, { set: Q, store: j.singleton.store, request: W, path: J, qi: Z, redirect: h0 });
  try {
    for (let P = 0;P < j.event.request.length; P++) {
      const O = j.event.request[P].fn;
      let V = O(K);
      if (V instanceof Promise)
        V = await V;
      if (V = f(V, Q), V)
        return K.response = V;
    }
    const Y = j.router.dynamic.find(W.method, J) ?? j.router.dynamic.find("ALL", J);
    if (!Y)
      throw new O0;
    const { handle: B, hooks: U, validator: _, content: M } = Y.store;
    let G;
    if (W.method !== "GET" && W.method !== "HEAD")
      if (M)
        switch (M) {
          case "application/json":
            G = await W.json();
            break;
          case "text/plain":
            G = await W.text();
            break;
          case "application/x-www-form-urlencoded":
            G = x0(await W.text());
            break;
          case "application/octet-stream":
            G = await W.arrayBuffer();
            break;
          case "multipart/form-data":
            G = {};
            const P = await W.formData();
            for (let O of P.keys()) {
              if (G[O])
                continue;
              const V = P.getAll(O);
              if (V.length === 1)
                G[O] = V[0];
              else
                G[O] = V;
            }
            break;
        }
      else {
        let P = W.headers.get("content-type");
        if (P) {
          const O = P.indexOf(";");
          if (O !== -1)
            P = P.slice(0, O);
          K.contentType = P;
          for (let V = 0;V < U.parse.length; V++) {
            const C = U.parse[V].fn;
            let T = C(K, P);
            if (T instanceof Promise)
              T = await T;
            if (T) {
              G = T;
              break;
            }
          }
          if (delete K.contentType, G === undefined)
            switch (P) {
              case "application/json":
                G = await W.json();
                break;
              case "text/plain":
                G = await W.text();
                break;
              case "application/x-www-form-urlencoded":
                G = x0(await W.text());
                break;
              case "application/octet-stream":
                G = await W.arrayBuffer();
                break;
              case "multipart/form-data":
                G = {};
                const V = await W.formData();
                for (let C of V.keys()) {
                  if (G[C])
                    continue;
                  const T = V.getAll(C);
                  if (T.length === 1)
                    G[C] = T[0];
                  else
                    G[C] = T;
                }
                break;
            }
        }
      }
    K.body = G, K.params = Y?.params || undefined, K.query = Z === -1 ? {} : x0($.substring(Z + 1)), K.headers = {};
    for (let [P, O] of W.headers.entries())
      K.headers[P] = O;
    const w = Object.assign({}, j.config?.cookie, _?.cookie?.config), z = W.headers.get("cookie");
    K.cookie = await a0(K.set, z, w ? { secrets: w.secrets !== undefined ? typeof w.secrets === "string" ? w.secrets : w.secrets.join(",") : undefined, sign: w.sign === true ? true : w.sign !== undefined ? typeof w.sign === "string" ? w.sign : w.sign.join(",") : undefined } : undefined);
    for (let P = 0;P < U.transform.length; P++) {
      const O = U.transform[P], V = O.fn(K);
      if (O.subType === "derive")
        if (V instanceof Promise)
          Object.assign(K, await V);
        else
          Object.assign(K, V);
      else if (V instanceof Promise)
        await V;
    }
    if (_) {
      if (_.createHeaders?.()) {
        const P = {};
        for (let O in W.headers)
          P[O] = W.headers.get(O);
        if (_.headers.Check(P) === false)
          throw new L("header", _.headers, P);
      }
      if (_.createParams?.()?.Check(K.params) === false)
        throw new L("params", _.params, K.params);
      if (_.createQuery?.()?.Check(K.query) === false)
        throw new L("query", _.query, K.query);
      if (_.createCookie?.()) {
        const P = {};
        for (let [O, V] of Object.entries(K.cookie))
          P[O] = V.value;
        if (_.cookie.Check(P) === false)
          throw new L("cookie", _.cookie, P);
      }
      if (_.createBody?.()?.Check(G) === false)
        throw new L("body", _.body, G);
    }
    for (let P = 0;P < U.beforeHandle.length; P++) {
      let O = U.beforeHandle[P].fn(K);
      if (O instanceof Promise)
        O = await O;
      if (O !== undefined) {
        K.response = O;
        for (let C = 0;C < U.afterHandle.length; C++) {
          let T = U.afterHandle[C].fn(K);
          if (T instanceof Promise)
            T = await T;
          if (T)
            O = T;
        }
        const V = f(O, K.set);
        if (V)
          return K.response = V;
      }
    }
    let F = B(K);
    if (F instanceof Promise)
      F = await F;
    if (!U.afterHandle.length) {
      const P = F?.[d] ?? (Q.status ? typeof Q.status === "string" ? Y0[Q.status] : Q.status : 200), O = _?.createResponse?.()?.[P];
      if (O?.Check(F) === false)
        throw new L("response", O, F);
    } else {
      K.response = F;
      for (let P = 0;P < U.afterHandle.length; P++) {
        let O = U.afterHandle[P].fn(K);
        if (O instanceof Promise)
          O = await O;
        const V = f(O, K.set);
        if (V !== undefined) {
          const C = _?.response?.[V.status];
          if (C?.Check(V) === false)
            throw new L("response", C, V);
          return K.response = V;
        }
      }
    }
    if (K.set.cookie && w?.sign) {
      const P = !w.secrets ? undefined : typeof w.secrets === "string" ? w.secrets : w.secrets[0];
      if (w.sign === true)
        for (let [O, V] of Object.entries(K.set.cookie))
          K.set.cookie[O].value = await b0(V.value, "${secret}");
      else {
        const O = _?.cookie?.schema?.properties;
        for (let V of w.sign) {
          if (!(V in O))
            continue;
          if (K.set.cookie[V]?.value)
            K.set.cookie[V].value = await b0(K.set.cookie[V].value, P);
        }
      }
    }
    return K.response = y(F, K.set);
  } catch (Y) {
    if (Y.status)
      Q.status = Y.status;
    return j.handleError(K, Y);
  } finally {
    for (let Y of j.event.afterResponse)
      await Y.fn(K);
  }
};
var F2 = (j) => async (W, $) => {
  const X = Object.assign(W, { error: $, code: $.code });
  X.set = W.set;
  for (let Z = 0;Z < j.event.error.length; Z++) {
    let Q = j.event.error[Z].fn(X);
    if (Q instanceof Promise)
      Q = await Q;
    if (Q !== undefined && Q !== null)
      return W.response = y(Q, W.set);
  }
  return new Response(typeof $.cause === "string" ? $.cause : $.message, { headers: W.set.headers, status: $.status ?? 500 });
};

class X0 {
  config;
  server = null;
  dependencies = {};
  _routes = {};
  _types = { Prefix: "", Scoped: false, Singleton: {}, Definitions: {}, Metadata: {} };
  _ephemeral = {};
  _volatile = {};
  static version = T1;
  version = T1;
  singleton = { decorator: {}, store: {}, derive: {}, resolve: {} };
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  definitions = { type: {}, error: {} };
  extender = { macros: [], higherOrderFunctions: [] };
  validator = { global: null, scoped: null, local: null, getCandidate() {
    return H0(H0(this.global, this.scoped), this.local);
  } };
  event = { start: [], request: [], parse: [], transform: [], beforeHandle: [], afterHandle: [], mapResponse: [], afterResponse: [], trace: [], error: [], stop: [] };
  telemetry = { stack: undefined };
  router = { http: new D0, ws: new D0, dynamic: new D0, static: { http: { handlers: [], map: {}, all: "" }, ws: {} }, history: [] };
  routeTree = new Map;
  get routes() {
    return this.router.history;
  }
  getGlobalRoutes() {
    return this.router.history;
  }
  inference = { body: false, cookie: false, headers: false, query: false, set: false, server: false };
  getServer() {
    return this.server;
  }
  _promisedModules;
  get promisedModules() {
    if (!this._promisedModules)
      this._promisedModules = new V1;
    return this._promisedModules;
  }
  constructor(j) {
    if (j?.tags)
      if (!j.detail)
        j.detail = { tags: j.tags };
      else
        j.detail.tags = j.tags;
    if (this.config = {}, this.applyConfig(j ?? {}), j?.analytic && (j?.name || j?.seed !== undefined))
      this.telemetry.stack = new Error().stack;
  }
  env(j, W = Bun?.env ?? process.env) {
    if (m(j, { dynamic: true, additionalProperties: true, coerce: true }).Check(W) === false) {
      const X = new L("env", j, W);
      throw new Error(X.all.map((Z) => Z.summary).join("\n"));
    }
    return this;
  }
  wrap(j) {
    return this.extender.higherOrderFunctions.push({ checksum: I0(JSON.stringify({ name: this.config.name, seed: this.config.seed, content: j.toString() })), fn: j }), this;
  }
  applyMacro(j) {
    if (this.extender.macros.length) {
      const W = B2({ globalHook: this.event, localHook: j }), $ = { events: { global: this.event, local: j }, onParse: W("parse"), onTransform: W("transform"), onBeforeHandle: W("beforeHandle"), onAfterHandle: W("afterHandle"), mapResponse: W("mapResponse"), onAfterResponse: W("afterResponse"), onError: W("error") };
      for (let X of this.extender.macros)
        K2(X.fn($), j);
    }
  }
  applyConfig(j) {
    return this.config = { prefix: "", aot: true, strictPath: false, global: false, analytic: false, normalize: true, ...j, cookie: { path: "/", ...j?.cookie }, experimental: j?.experimental ?? {}, seed: j?.seed === undefined ? "" : j?.seed }, this;
  }
  get models() {
    const j = {};
    for (let [W, $] of Object.entries(this.definitions.type))
      j[W] = m($);
    return j;
  }
  add(j, W, $, X, { allowMeta: Z = false, skipPrefix: J = false } = { allowMeta: false, skipPrefix: false }) {
    if (X = Y2(X), W !== "" && W.charCodeAt(0) !== 47)
      W = "/" + W;
    if (this.config.prefix && !J && !this.config.scoped)
      W = this.config.prefix + W;
    if (X?.type)
      switch (X.type) {
        case "text":
          X.type = "text/plain";
          break;
        case "json":
          X.type = "application/json";
          break;
        case "formdata":
          X.type = "multipart/form-data";
          break;
        case "urlencoded":
          X.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          X.type = "application/octet-stream";
          break;
        default:
          break;
      }
    const Q = this.definitions.type, K = !this.config.aot, Y = { ...this.validator.getCandidate() }, B = { body: X?.body ?? Y?.body, headers: X?.headers ?? Y?.headers, params: X?.params ?? Y?.params, query: X?.query ?? Y?.query, cookie: X?.cookie ?? Y?.cookie, response: X?.response ?? Y?.response }, U = () => B.cookie ? j1({ validator: B.cookie, defaultConfig: this.config.cookie, config: B.cookie?.config ?? {}, dynamic: K, models: Q }) : undefined, _ = this.config.normalize, M = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.schema === true ? { body: m(B.body, { dynamic: K, models: Q, normalize: _ }), headers: m(B.headers, { dynamic: K, models: Q, additionalProperties: !this.config.normalize, coerce: true, additionalCoerce: F0() }), params: m(B.params, { dynamic: K, models: Q, coerce: true, additionalCoerce: F0() }), query: m(B.query, { dynamic: K, models: Q, normalize: _, coerce: true, additionalCoerce: F0() }), cookie: U(), response: e0(B.response, { dynamic: K, models: Q, normalize: _ }) } : { createBody() {
      if (this.body)
        return this.body;
      return this.body = m(B.body, { dynamic: K, models: Q, normalize: _ });
    }, createHeaders() {
      if (this.headers)
        return this.headers;
      return this.headers = m(B.headers, { dynamic: K, models: Q, additionalProperties: !_, coerce: true, additionalCoerce: F0() });
    }, createParams() {
      if (this.params)
        return this.params;
      return this.params = m(B.params, { dynamic: K, models: Q, coerce: true, additionalCoerce: F0() });
    }, createQuery() {
      if (this.query)
        return this.query;
      return this.query = m(B.query, { dynamic: K, models: Q, coerce: true, additionalCoerce: F0() });
    }, createCookie() {
      if (this.cookie)
        return this.cookie;
      return this.cookie = U();
    }, createResponse() {
      if (this.response)
        return this.response;
      return this.response = e0(B.response, { dynamic: K, models: Q, normalize: _ });
    } }, G = W.endsWith("/") ? W.slice(0, W.length - 1) : W + "/";
    if (X = l(X, Y), X.tags)
      if (!X.detail)
        X.detail = { tags: X.tags };
      else
        X.detail.tags = X.tags;
    if (p(this.config.detail))
      X.detail = c(Object.assign({}, this.config.detail), X.detail);
    this.applyMacro(X);
    const w = l(this.event, X);
    if (this.config.aot === false) {
      if (this.router.dynamic.add(j, W, { validator: M, hooks: w, content: X?.type, handle: $ }), this.config.strictPath === false)
        this.router.dynamic.add(j, G, { validator: M, hooks: w, content: X?.type, handle: $ });
      this.router.history.push({ method: j, path: W, composed: null, handler: $, hooks: w });
      return;
    }
    const z = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.compose === true, F = u0(this.inference), P = () => M2({ app: this, path: W, method: j, localHook: l(X), hooks: w, validator: M, handler: $, allowMeta: Z, inference: F }), O = z ? P() : (H) => {
      return P()(H);
    }, V = this.router.history.length;
    if (this.routeTree.has(j + W))
      for (let H = 0;H < this.router.history.length; H++) {
        const k = this.router.history[H];
        if (k.path === W && k.method === j) {
          const b = this.router.history.splice(H, 1)[0];
          if (b && this.routeTree.has(b?.method + b?.path))
            this.routeTree.delete(b.method + b.path);
        }
      }
    else
      this.routeTree.set(j + W, V);
    this.router.history.push({ method: j, path: W, composed: O, handler: $, hooks: w });
    const C = this.router.static.http, T = { handler: z ? O : undefined, compile: P };
    if (j === "$INTERNALWS") {
      const H = this.config.strictPath ? undefined : W.endsWith("/") ? W.slice(0, W.length - 1) : W + "/";
      if (W.indexOf(":") === -1 && W.indexOf("*") === -1) {
        const k = C.handlers.length;
        if (C.handlers.push((b) => (C.handlers[k] = P())(b)), this.router.static.ws[W] = k, H)
          this.router.static.ws[H] = k;
      } else if (this.router.ws.add("ws", W, T), H)
        this.router.ws.add("ws", H, T);
      return;
    }
    if (W.indexOf(":") === -1 && W.indexOf("*") === -1) {
      const H = C.handlers.length;
      if (C.handlers.push((k) => (C.handlers[H] = P())(k)), !C.map[W])
        C.map[W] = { code: "" };
      if (j === "ALL")
        C.map[W].all = `default: return st[${H}](ctx)\n`;
      else
        C.map[W].code = `case '${j}': return st[${H}](ctx)\n${C.map[W].code}`;
      if (!this.config.strictPath) {
        if (!C.map[G])
          C.map[G] = { code: "" };
        if (j === "ALL")
          C.map[G].all = `default: return st[${H}](ctx)\n`;
        else
          C.map[G].code = `case '${j}': return st[${H}](ctx)\n${C.map[G].code}`;
      }
    } else if (this.router.http.add(j, W, T), !this.config.strictPath)
      this.router.http.add(j, W.endsWith("/") ? W.slice(0, W.length - 1) : W + "/", T);
  }
  setHeaders;
  headers(j) {
    if (!j)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    return this.setHeaders = c(this.setHeaders, j), this;
  }
  onStart(j) {
    return this.on("start", j), this;
  }
  onRequest(j) {
    return this.on("request", j), this;
  }
  onParse(j, W) {
    if (!W)
      return this.on("parse", j);
    return this.on(j, "parse", W);
  }
  onTransform(j, W) {
    if (!W)
      return this.on("transform", j);
    return this.on(j, "transform", W);
  }
  resolve(j, W) {
    if (!W)
      W = j, j = { as: "local" };
    const $ = { subType: "resolve", fn: W };
    return this.onBeforeHandle(j, $);
  }
  mapResolve(j, W) {
    if (!W)
      W = j, j = { as: "local" };
    const $ = { subType: "mapResolve", fn: W };
    return this.onBeforeHandle(j, $);
  }
  onBeforeHandle(j, W) {
    if (!W)
      return this.on("beforeHandle", j);
    return this.on(j, "beforeHandle", W);
  }
  onAfterHandle(j, W) {
    if (!W)
      return this.on("afterHandle", j);
    return this.on(j, "afterHandle", W);
  }
  mapResponse(j, W) {
    if (!W)
      return this.on("mapResponse", j);
    return this.on(j, "mapResponse", W);
  }
  onAfterResponse(j, W) {
    if (!W)
      return this.on("afterResponse", j);
    return this.on(j, "afterResponse", W);
  }
  trace(j, W) {
    if (!W)
      W = j, j = { as: "local" };
    if (!Array.isArray(W))
      W = [W];
    for (let $ of W)
      this.on(j, "trace", _2($));
    return this;
  }
  error(j, W) {
    switch (typeof j) {
      case "string":
        return W.prototype[N0] = j, this.definitions.error[j] = W, this;
      case "function":
        return this.definitions.error = j(this.definitions.error), this;
    }
    for (let [$, X] of Object.entries(j))
      X.prototype[N0] = $, this.definitions.error[$] = X;
    return this;
  }
  onError(j, W) {
    if (!W)
      return this.on("error", j);
    return this.on(j, "error", W);
  }
  onStop(j) {
    return this.on("stop", j), this;
  }
  on(j, W, $) {
    let X;
    switch (typeof j) {
      case "string":
        X = j, $ = W;
        break;
      case "object":
        if (X = W, !Array.isArray(W) && typeof W === "object")
          $ = W;
        break;
    }
    if (Array.isArray($))
      $ = i($);
    else if (typeof $ === "function")
      $ = [{ fn: $ }];
    else
      $ = [$];
    const Z = $;
    for (let J of Z)
      J.scope = typeof j === "string" ? "local" : j?.as ?? "local";
    if (X !== "trace")
      t0({ [X]: Z.map((J) => J.fn) }, this.inference);
    for (let J of Z) {
      const Q = G2(J, "global", { skipIfHasType: true });
      switch (X) {
        case "start":
          this.event.start.push(Q);
          break;
        case "request":
          this.event.request.push(Q);
          break;
        case "parse":
          this.event.parse.push(Q);
          break;
        case "transform":
          this.event.transform.push(Q);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(Q);
          break;
        case "afterHandle":
          this.event.afterHandle.push(Q);
          break;
        case "mapResponse":
          this.event.mapResponse.push(Q);
          break;
        case "afterResponse":
          this.event.afterResponse.push(Q);
          break;
        case "trace":
          this.event.trace.push(Q);
          break;
        case "error":
          this.event.error.push(Q);
          break;
        case "stop":
          this.event.stop.push(Q);
          break;
      }
    }
    return this;
  }
  propagate() {
    return v(this.event.parse), v(this.event.transform), v(this.event.beforeHandle), v(this.event.afterHandle), v(this.event.mapResponse), v(this.event.afterResponse), v(this.event.trace), v(this.event.error), this;
  }
  as(j) {
    const W = { plugin: "scoped", global: "global" }[j];
    if (v(this.event.parse, W), v(this.event.transform, W), v(this.event.beforeHandle, W), v(this.event.afterHandle, W), v(this.event.mapResponse, W), v(this.event.afterResponse, W), v(this.event.trace, W), v(this.event.error, W), j === "plugin")
      this.validator.scoped = H0(this.validator.scoped, this.validator.local), this.validator.local = null;
    else if (j === "global")
      this.validator.global = H0(this.validator.global, H0(this.validator.scoped, this.validator.local)), this.validator.scoped = null, this.validator.local = null;
    return this;
  }
  group(j, W, $) {
    const X = new X0({ ...this.config, prefix: "" });
    X.singleton = { ...this.singleton }, X.definitions = { ...this.definitions }, X.getServer = () => this.getServer(), X.inference = u0(this.inference), X.extender = { ...this.extender };
    const Z = typeof W === "object", J = (Z ? $ : W)(X);
    if (this.singleton = c(this.singleton, X.singleton), this.definitions = c(this.definitions, X.definitions), J.event.request.length)
      this.event.request = [...this.event.request || [], ...J.event.request || []];
    if (J.event.mapResponse.length)
      this.event.mapResponse = [...this.event.mapResponse || [], ...J.event.mapResponse || []];
    return this.model(J.definitions.type), Object.values(X.router.history).forEach(({ method: Q, path: K, handler: Y, hooks: B }) => {
      if (K = (Z ? "" : this.config.prefix) + j + K, Z) {
        const U = W, _ = B;
        this.add(Q, K, Y, l(U, { ..._ || {}, error: !_.error ? J.event.error : Array.isArray(_.error) ? [..._.error || {}, ...J.event.error || {}] : [_.error, ...J.event.error || {}] }));
      } else
        this.add(Q, K, Y, l(B, { error: J.event.error }), { skipPrefix: true });
    }), this;
  }
  guard(j, W) {
    if (!W) {
      if (typeof j === "object") {
        this.applyMacro(j);
        const Z = j.as ?? "local";
        if (this.validator[Z] = { body: j.body ?? this.validator[Z]?.body, headers: j.headers ?? this.validator[Z]?.headers, params: j.params ?? this.validator[Z]?.params, query: j.query ?? this.validator[Z]?.query, response: j.response ?? this.validator[Z]?.response, cookie: j.cookie ?? this.validator[Z]?.cookie }, j.parse)
          this.on({ as: Z }, "parse", j.parse);
        if (j.transform)
          this.on({ as: Z }, "transform", j.transform);
        if (j.beforeHandle)
          this.on({ as: Z }, "beforeHandle", j.beforeHandle);
        if (j.afterHandle)
          this.on({ as: Z }, "afterHandle", j.afterHandle);
        if (j.mapResponse)
          this.on({ as: Z }, "mapResponse", j.mapResponse);
        if (j.afterResponse)
          this.on({ as: Z }, "afterResponse", j.afterResponse);
        if (j.error)
          this.on({ as: Z }, "error", j.error);
        if (j.detail)
          if (this.config.detail)
            this.config.detail = c(Object.assign({}, this.config.detail), j.detail);
          else
            this.config.detail = j.detail;
        if (j?.tags)
          if (!this.config.detail)
            this.config.detail = { tags: j.tags };
          else
            this.config.detail.tags = j.tags;
        return this;
      }
      return this.guard({}, j);
    }
    const $ = new X0({ ...this.config, prefix: "" });
    $.singleton = { ...this.singleton }, $.definitions = { ...this.definitions }, $.inference = u0(this.inference), $.extender = { ...this.extender };
    const X = W($);
    if (this.singleton = c(this.singleton, $.singleton), this.definitions = c(this.definitions, $.definitions), X.getServer = () => this.server, X.event.request.length)
      this.event.request = [...this.event.request || [], ...X.event.request || []];
    if (X.event.mapResponse.length)
      this.event.mapResponse = [...this.event.mapResponse || [], ...X.event.mapResponse || []];
    return this.model(X.definitions.type), Object.values($.router.history).forEach(({ method: Z, path: J, handler: Q, hooks: K }) => {
      this.add(Z, J, Q, l(j, { ...K || {}, error: !K.error ? X.event.error : Array.isArray(K.error) ? [...K.error || {}, ...X.event.error || []] : [K.error, ...X.event.error || []] }));
    }), this;
  }
  use(j, W) {
    if (W?.scoped)
      return this.guard({}, ($) => $.use(j));
    if (Array.isArray(j)) {
      let $ = this;
      for (let X of j)
        $ = this.use(X);
      return $;
    }
    if (j instanceof Promise)
      return this.promisedModules.add(j.then(($) => {
        if (typeof $ === "function")
          return $(this);
        if ($ instanceof X0)
          return this._use($);
        if (typeof $.default === "function")
          return $.default(this);
        if ($.default instanceof X0)
          return this._use($.default);
        throw new Error('Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.');
      }).then(($) => $.compile())), this;
    return this._use(j);
  }
  _use(j) {
    if (typeof j === "function") {
      const Z = j(this);
      if (Z instanceof Promise)
        return this.promisedModules.add(Z.then((J) => {
          if (J instanceof X0) {
            this.compile();
            for (let { method: Q, path: K, handler: Y, hooks: B } of Object.values(J.router.history))
              this.add(Q, K, Y, l(B, { error: J.event.error }));
            return J;
          }
          if (typeof J === "function")
            return J(this);
          if (typeof J.default === "function")
            return J.default(this);
          return this._use(J);
        }).then((J) => J.compile())), this;
      return Z;
    }
    if (j.promisedModules.size)
      return this.promisedModules.add(j.modules.then(() => this._use(j)).then((Z) => Z.compile())), this;
    const { name: W, seed: $ } = j.config;
    j.getServer = () => this.getServer(), j.getGlobalRoutes = () => this.getGlobalRoutes(), j.model(this.definitions.type), j.error(this.definitions.error);
    const X = j.config.scoped;
    if (X) {
      if (W) {
        if (!(W in this.dependencies))
          this.dependencies[W] = [];
        const J = $ !== undefined ? I0(W + JSON.stringify($)) : 0;
        if (this.dependencies[W].some(({ checksum: Q }) => J === Q))
          return this;
        this.dependencies[W].push(!this.config?.analytic ? { name: j.config.name, seed: j.config.seed, checksum: J, dependencies: j.dependencies } : { name: j.config.name, seed: j.config.seed, checksum: J, dependencies: j.dependencies, stack: j.telemetry.stack, routes: j.router.history, decorators: j.singleton.decorator, store: j.singleton.store, type: j.definitions.type, error: j.definitions.error, derive: j.event.transform.filter((Q) => Q.subType === "derive").map((Q) => ({ fn: Q.fn.toString(), stack: new Error().stack ?? "" })), resolve: j.event.transform.filter((Q) => Q.subType === "derive").map((Q) => ({ fn: Q.fn.toString(), stack: new Error().stack ?? "" })) });
      }
      j.extender.macros = this.extender.macros.concat(j.extender.macros);
      const Z = [];
      for (let J = 0;J < j.extender.macros.length; J++) {
        const Q = this.extender.macros[J];
        if (Z.includes(Q.checksum))
          j.extender.macros.splice(J, 1), J--;
        Z.push(Q.checksum);
      }
      if (j.onRequest((J) => {
        Object.assign(J, this.singleton.decorator), Object.assign(J.store, this.singleton.store);
      }), j.event.trace.length)
        j.event.trace.push(...j.event.trace);
      if (!j.config.prefix)
        console.warn("It's recommended to use scoped instance with a prefix to prevent collision routing with other instance.");
      if (j.event.error.length)
        j.event.error.push(...this.event.error);
      if (j.config.aot)
        j.compile();
      if (X === true && j.config.prefix) {
        this.mount(j.config.prefix + "/", j.fetch);
        for (let J of j.router.history)
          this.routeTree.set(J.method + `${j.config.prefix}${J.path}`, this.router.history.length), this.router.history.push({ ...J, path: `${j.config.prefix}${J.path}`, hooks: l(J.hooks, { error: this.event.error }) });
      } else {
        this.mount(j.fetch);
        for (let J of j.router.history)
          this.routeTree.set(J.method + `${j.config.prefix}${J.path}`, this.router.history.length), this.router.history.push({ ...J, path: `${j.config.prefix}${J.path}`, hooks: l(J.hooks, { error: this.event.error }) });
      }
      return this;
    } else {
      if (this.headers(j.setHeaders), W) {
        if (!(W in this.dependencies))
          this.dependencies[W] = [];
        const J = $ !== undefined ? I0(W + JSON.stringify($)) : 0;
        if (!this.dependencies[W].some(({ checksum: Q }) => J === Q))
          this.extender.macros = this.extender.macros.concat(j.extender.macros), this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(j.extender.higherOrderFunctions);
      } else
        this.extender.macros = this.extender.macros.concat(j.extender.macros), this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(j.extender.higherOrderFunctions);
      Z1(this.extender.macros), Z1(this.extender.higherOrderFunctions);
      const Z = [];
      for (let J = 0;J < this.extender.higherOrderFunctions.length; J++) {
        const Q = this.extender.higherOrderFunctions[J];
        if (Q.checksum) {
          if (Z.includes(Q.checksum))
            this.extender.higherOrderFunctions.splice(J, 1), J--;
          Z.push(Q.checksum);
        }
      }
      this.inference = { body: this.inference.body || j.inference.body, cookie: this.inference.cookie || j.inference.cookie, headers: this.inference.headers || j.inference.headers, query: this.inference.query || j.inference.query, set: this.inference.set || j.inference.set, server: this.inference.server || j.inference.server };
    }
    this.decorate(j.singleton.decorator), this.state(j.singleton.store), this.model(j.definitions.type), this.error(j.definitions.error), j.extender.macros = this.extender.macros.concat(j.extender.macros);
    for (let { method: Z, path: J, handler: Q, hooks: K } of Object.values(j.router.history))
      this.add(Z, J, Q, l(K, { error: j.event.error }));
    if (!X)
      if (W) {
        if (!(W in this.dependencies))
          this.dependencies[W] = [];
        const Z = $ !== undefined ? I0(W + JSON.stringify($)) : 0;
        if (this.dependencies[W].some(({ checksum: J }) => Z === J))
          return this;
        this.dependencies[W].push(!this.config?.analytic ? { name: j.config.name, seed: j.config.seed, checksum: Z, dependencies: j.dependencies } : { name: j.config.name, seed: j.config.seed, checksum: Z, dependencies: j.dependencies, stack: j.telemetry.stack, routes: j.router.history, decorators: j.singleton, store: j.singleton.store, type: j.definitions.type, error: j.definitions.error, derive: j.event.transform.filter((J) => J?.subType === "derive").map((J) => ({ fn: J.toString(), stack: new Error().stack ?? "" })), resolve: j.event.transform.filter((J) => J?.subType === "resolve").map((J) => ({ fn: J.toString(), stack: new Error().stack ?? "" })) }), this.event = N1(this.event, O1(j.event), Z);
      } else
        this.event = N1(this.event, O1(j.event));
    return this.validator.global = l(this.validator.global, { ...j.validator.global }), this.validator.local = l(this.validator.local, { ...j.validator.scoped }), this;
  }
  macro(j) {
    const W = { checksum: I0(JSON.stringify({ name: this.config.name, seed: this.config.seed, content: j.toString() })), fn: j };
    return this.extender.macros.push(W), this;
  }
  mount(j, W) {
    if (j instanceof X0 || typeof j === "function" || j.length === 0 || j === "/") {
      const Z = typeof j === "function" ? j : j instanceof X0 ? j.compile().fetch : W instanceof X0 ? W.compile().fetch : W, J = async ({ request: Q, path: K }) => Z(new Request(o0(Q.url, K || "/"), Q));
      return this.all("/*", J, { type: "none" }), this;
    }
    const $ = j.length;
    if (W instanceof X0)
      W = W.compile().fetch;
    const X = async ({ request: Z, path: J }) => W(new Request(o0(Z.url, J.slice($) || "/"), Z));
    return this.all(j, X, { type: "none" }), this.all(j + (j.endsWith("/") ? "*" : "/*"), X, { type: "none" }), this;
  }
  get(j, W, $) {
    return this.add("GET", j, W, $), this;
  }
  post(j, W, $) {
    return this.add("POST", j, W, $), this;
  }
  put(j, W, $) {
    return this.add("PUT", j, W, $), this;
  }
  patch(j, W, $) {
    return this.add("PATCH", j, W, $), this;
  }
  delete(j, W, $) {
    return this.add("DELETE", j, W, $), this;
  }
  options(j, W, $) {
    return this.add("OPTIONS", j, W, $), this;
  }
  all(j, W, $) {
    return this.add("ALL", j, W, $), this;
  }
  head(j, W, $) {
    return this.add("HEAD", j, W, $), this;
  }
  connect(j, W, $) {
    return this.add("CONNECT", j, W, $), this;
  }
  route(j, W, $, X) {
    return this.add(j.toUpperCase(), W, $, X, X?.config), this;
  }
  ws(j, W) {
    const $ = W.transformMessage ? Array.isArray(W.transformMessage) ? W.transformMessage : [W.transformMessage] : undefined;
    let X = null;
    const Z = m(W?.body, { models: this.definitions.type, normalize: this.config.normalize }), J = m(W?.response, { models: this.definitions.type, normalize: this.config.normalize }), Q = (K) => {
      if (typeof K === "string") {
        const Y = K?.charCodeAt(0);
        if (Y === 47 || Y === 123)
          try {
            K = JSON.parse(K);
          } catch {
          }
        else if ($1(K))
          K = +K;
      }
      if ($?.length)
        for (let Y = 0;Y < $.length; Y++) {
          const B = $[Y](K);
          if (B !== undefined)
            K = B;
        }
      return K;
    };
    return this.route("$INTERNALWS", j, (K) => {
      const { set: Y, path: B, qi: U, headers: _, query: M, params: G } = K;
      if (X === null)
        X = this.getServer();
      if (X?.upgrade(K.request, { headers: typeof W.upgrade === "function" ? W.upgrade(K) : W.upgrade, data: { validator: J, open(w) {
        W.open?.(new R0(w, K));
      }, message: (w, z) => {
        const F = Q(z);
        if (Z?.Check(F) === false)
          return void w.send(new L("message", Z, F).message);
        W.message?.(new R0(w, K), F);
      }, drain(w) {
        W.drain?.(new R0(w, K));
      }, close(w, z, F) {
        W.close?.(new R0(w, K), z, F);
      } } }))
        return;
      return Y.status = 400, "Expected a websocket connection";
    }, { beforeHandle: W.beforeHandle, transform: W.transform, headers: W.headers, params: W.params, query: W.query }), this;
  }
  state(j, W, $) {
    if (W === undefined)
      $ = j, j = { as: "append" }, W = "";
    else if ($ === undefined) {
      if (typeof j === "string")
        $ = W, W = j, j = { as: "append" };
      else if (typeof j === "object")
        $ = W, W = "";
    }
    const { as: X } = j;
    if (typeof W !== "string")
      return this;
    switch (typeof $) {
      case "object":
        if (W) {
          if (W in this.singleton.store)
            this.singleton.store[W] = c(this.singleton.store[W], $, { override: X === "override" });
          else
            this.singleton.store[W] = $;
          return this;
        }
        if ($ === null)
          return this;
        return this.singleton.store = c(this.singleton.store, $, { override: X === "override" }), this;
      case "function":
        if (W) {
          if (X === "override" || !(W in this.singleton.store))
            this.singleton.store[W] = $;
        } else
          this.singleton.store = $(this.singleton.store);
        return this;
      default:
        if (X === "override" || !(W in this.singleton.store))
          this.singleton.store[W] = $;
        return this;
    }
  }
  decorate(j, W, $) {
    if (W === undefined)
      $ = j, j = { as: "append" }, W = "";
    else if ($ === undefined) {
      if (typeof j === "string")
        $ = W, W = j, j = { as: "append" };
      else if (typeof j === "object")
        $ = W, W = "";
    }
    const { as: X } = j;
    if (typeof W !== "string")
      return this;
    switch (typeof $) {
      case "object":
        if (W) {
          if (W in this.singleton.decorator)
            this.singleton.decorator[W] = c(this.singleton.decorator[W], $, { override: X === "override" });
          else
            this.singleton.decorator[W] = $;
          return this;
        }
        if ($ === null)
          return this;
        return this.singleton.decorator = c(this.singleton.decorator, $, { override: X === "override" }), this;
      case "function":
        if (W) {
          if (X === "override" || !(W in this.singleton.decorator))
            this.singleton.decorator[W] = $;
        } else
          this.singleton.decorator = $(this.singleton.decorator);
        return this;
      default:
        if (X === "override" || !(W in this.singleton.decorator))
          this.singleton.decorator[W] = $;
        return this;
    }
  }
  derive(j, W) {
    if (!W)
      W = j, j = { as: "local" };
    const $ = { subType: "derive", fn: W };
    return this.onTransform(j, $);
  }
  model(j, W) {
    switch (typeof j) {
      case "object":
        return Object.entries(j).forEach(([$, X]) => {
          if (!($ in this.definitions.type))
            this.definitions.type[$] = X;
        }), this;
      case "function":
        return this.definitions.type = j(this.definitions.type), this;
    }
    return this.definitions.type[j] = W, this;
  }
  mapDerive(j, W) {
    if (!W)
      W = j, j = { as: "local" };
    const $ = { subType: "mapDerive", fn: W };
    return this.onTransform(j, $);
  }
  affix(j, W, $) {
    if ($ === "")
      return this;
    const X = ["_", "-", " "], Z = (Y) => Y[0].toUpperCase() + Y.slice(1), J = j === "prefix" ? (Y, B) => X.includes(Y.at(-1) ?? "") ? Y + B : Y + Z(B) : X.includes($.at(-1) ?? "") ? (Y, B) => B + Y : (Y, B) => B + Z(Y), Q = (Y) => {
      const B = {};
      switch (Y) {
        case "decorator":
          for (let U in this.singleton.decorator)
            B[J($, U)] = this.singleton.decorator[U];
          this.singleton.decorator = B;
          break;
        case "state":
          for (let U in this.singleton.store)
            B[J($, U)] = this.singleton.store[U];
          this.singleton.store = B;
          break;
        case "model":
          for (let U in this.definitions.type)
            B[J($, U)] = this.definitions.type[U];
          this.definitions.type = B;
          break;
        case "error":
          for (let U in this.definitions.error)
            B[J($, U)] = this.definitions.error[U];
          this.definitions.error = B;
          break;
      }
    }, K = Array.isArray(W) ? W : [W];
    for (let Y of K.some((B) => B === "all") ? ["decorator", "state", "model", "error"] : K)
      Q(Y);
    return this;
  }
  prefix(j, W) {
    return this.affix("prefix", j, W);
  }
  suffix(j, W) {
    return this.affix("suffix", j, W);
  }
  compile() {
    if (this.fetch = this.config.aot ? E1(this) : b1(this), typeof this.server?.reload === "function")
      this.server.reload({ ...this.server || {}, fetch: this.fetch });
    return this;
  }
  handle = async (j) => this.fetch(j);
  fetch = (j) => {
    return (this.fetch = this.config.aot ? E1(this) : b1(this))(j);
  };
  handleError = async (j, W) => (this.handleError = this.config.aot ? H1(this) : F2(this))(j, W);
  outerErrorHandler = (j) => new Response(j.message || j.name || "Error", { status: j?.status ?? 500 });
  listen = (j, W) => {
    if (typeof Bun === "undefined")
      throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
    if (this.compile(), typeof j === "string") {
      if (!$1(j))
        throw new Error("Port must be a numeric value");
      j = parseInt(j);
    }
    const $ = this.fetch, X = typeof j === "object" ? { development: !d0, reusePort: true, ...this.config.serve || {}, ...j || {}, websocket: { ...this.config.websocket || {}, ...S1 || {} }, fetch: $, error: this.outerErrorHandler } : { development: !d0, reusePort: true, ...this.config.serve || {}, websocket: { ...this.config.websocket || {}, ...S1 || {} }, port: j, fetch: $, error: this.outerErrorHandler };
    this.server = Bun?.serve(X);
    for (let Z = 0;Z < this.event.start.length; Z++)
      this.event.start[Z].fn(this);
    if (W)
      W(this.server);
    return process.on("beforeExit", () => {
      if (this.server) {
        this.server.stop(), this.server = null;
        for (let Z = 0;Z < this.event.stop.length; Z++)
          this.event.stop[Z].fn(this);
      }
    }), this.promisedModules.then(() => {
      Bun?.gc(false);
    }), this;
  };
  stop = async () => {
    if (!this.server)
      throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
    if (this.server) {
      if (this.server.stop(), this.server = null, this.event.stop.length)
        for (let j = 0;j < this.event.stop.length; j++)
          this.event.stop[j].fn(this);
    }
  };
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
}

// src/server/handlers/dark.js
import {join as join3} from "path";

// node_modules/@dark-engine/platform-server/dist/esm/render/render.js
init_esm();
import {Readable} from "stream";

// node_modules/@dark-engine/platform-browser/dist/esm/utils/utils.js
init_esm();

// node_modules/@dark-engine/platform-browser/dist/esm/constants.js
var LIB2 = "@dark-engine/platform-browser";
var HEAD_TAG = "head";
var TITLE_TAG = "title";
var META_TAG = "meta";
var TEXTAREA_TAG = "textarea";
var CLASS_NAME_ATTR = "className";
var CLASS_ATTR = "class";
var NAME_ATTR = "name";
var VALUE_ATTR = "value";
var AS_ATTR = "_as";
var DANGER_HTML_ATTR = "__danger";
var EXCLUDE_ATTR_MARK = "$";

// node_modules/@dark-engine/platform-browser/dist/esm/utils/utils.js
var svgTagNames = new Set([
  "svg",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tspan",
  "use",
  "view"
]);
var voidTagNames = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var detectIsVoidElement = (name) => voidTagNames.has(name);
var detectIsBrowser = () => !detectIsUndefined(globalThis.window);
var illegal2 = (x3) => illegal(x3, LIB2);

// node_modules/@dark-engine/platform-browser/dist/esm/metatags/metatags.js
init_esm();
var createVNodes = function(slot) {
  const vNodes = (detectIsArray(slot) ? slot : [slot]).map((x3) => {
    if (detectIsVirtualNodeFactory(x3)) {
      return x3();
    } else {
      illegal2(`Metatags supports only tags!`);
    }
  });
  return vNodes;
};
var resolveElement = function(vNode) {
  if (vNode.name === TITLE_TAG || vNode.name === META_TAG) {
    return document.querySelector(`${HEAD_TAG} ${createSelector(vNode)}`);
  }
  return null;
};
var createSelector = function(vNode) {
  const attrs = vNode.name === META_TAG ? createAttributeSelector(NAME_ATTR, vNode.attrs[NAME_ATTR]) : "";
  const selector = `${vNode.name}${attrs}`;
  return selector;
};
var setAttributes = function(element, attrs) {
  for (const key in attrs) {
    if (key === DANGER_HTML_ATTR)
      continue;
    const value15 = String(attrs[key]);
    element.getAttribute(key) !== value15 && element.setAttribute(key, value15);
  }
};
var $$metatags = Symbol("metatags");
var Metatags = component(({ slot }) => {
  const { isServer, isHydration } = useSSR();
  const scope15 = useMemo(() => ({ isDirty: false }), []);
  const vNodes = createVNodes(slot);
  if (isServer && !scope15.isDirty) {
    const $scope = $$scope();
    const emitter7 = $scope.getEmitter();
    const off = emitter7.on("chunk", (fiber6) => {
      if (detectIsMetatags(fiber6.inst)) {
        emitter7.emit("box", new MetatagsBox(vNodes));
        off();
      }
    });
    scope15.isDirty = true;
  }
  useLayoutEffect(() => {
    if (isHydration)
      return;
    for (const vNode of vNodes) {
      const { children, attrs } = vNode;
      const element = resolveElement(vNode);
      if (!element)
        continue;
      const text = children.map((x3) => detectIsTextVirtualNode(x3) ? x3.value : x3).join("");
      setAttributes(element, attrs);
      setTextContent(element, text);
    }
  });
  return null;
}, { token: $$metatags, displayName: "Metatags" });
var createAttributeSelector = (name, value15) => !detectIsEmpty(value15) ? `[${name}="${value15}"]` : "";
var setTextContent = (element, text) => element.textContent !== text && (element.textContent = text);

class MetatagsBox {
  vNodes;
  constructor(vNodes) {
    this.vNodes = vNodes;
  }
}
var detectIsMetatags = (x3) => detectIsComponent(x3) && x3.token === $$metatags;
var detectIsMetatagsBox = (x3) => x3 instanceof MetatagsBox;

// node_modules/@dark-engine/platform-server/dist/esm/dom/dom.js
init_esm();

// node_modules/@dark-engine/platform-server/dist/esm/native-element/native-element.js
init_esm();

// node_modules/@dark-engine/platform-server/dist/esm/utils/utils.js
init_esm();

// node_modules/@dark-engine/platform-server/dist/esm/constants.js
var LIB3 = "@dark-engine/platform-server";

// node_modules/@dark-engine/platform-server/dist/esm/utils/utils.js
var escapeChar = function(x3) {
  switch (x3) {
    case "&":
      return "&amp;";
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case '"':
      return "&quot;";
    default:
      return x3;
  }
};
var illegal3 = (x3) => illegal(x3, LIB3);
var escape = (x3) => x3.split("").map((x4) => escapeChar(x4)).join("");

// node_modules/@dark-engine/platform-server/dist/esm/native-element/native-element.js
var getAttributes = function(map3) {
  let attrs = "";
  for (const key of Object.keys(map3)) {
    if (key === DANGER_HTML_ATTR)
      continue;
    const attr = " " + (detectIsBoolean(map3[key]) ? map3[key] === true ? key : "" : `${key}="${map3[key]}"`);
    attrs += attr;
  }
  return attrs;
};

class NativeElement {
  type;
  parentElement = null;
  constructor(type47) {
    this.type = type47;
  }
}

class TagNativeElement extends NativeElement {
  name = null;
  attrs = {};
  children = [];
  constructor(name) {
    super(NodeType.TAG);
    this.name = name;
  }
  appendChild(element) {
    if (this.attrs[DANGER_HTML_ATTR]) {
      illegal3(`The element with danger content can't have a children!`);
    }
    element.parentElement = this;
    this.children.push(element);
  }
  setAttribute(name, value15) {
    let $name = name === CLASS_NAME_ATTR ? CLASS_ATTR : name;
    if ($name[0] === EXCLUDE_ATTR_MARK)
      return;
    if ($name === AS_ATTR)
      $name = name.slice(1, AS_ATTR.length);
    this.attrs[$name] = detectIsString(value15) && $name !== DANGER_HTML_ATTR ? escape(value15) : value15;
  }
  render(...args) {
    const isOpening = args[0];
    const content = this.name === TEXTAREA_TAG ? this.attrs[VALUE_ATTR] || "" : this.attrs[DANGER_HTML_ATTR] || "";
    const isVoid = detectIsVoidElement(this.name);
    const attrs = getAttributes(this.attrs);
    const chunk = isOpening ? isVoid ? `<${this.name}${attrs}>` : `<${this.name}${attrs}>${content || ""}` : isVoid ? "" : `</${this.name}>`;
    return chunk;
  }
  renderToString() {
    const content = this.children.map((x3) => x3.renderToString()).join("");
    return this.render(true) + content + this.render(false);
  }
}

class TextNativeElement extends NativeElement {
  value = "";
  constructor(text) {
    super(NodeType.TEXT);
    this.value = escape(text);
  }
  render() {
    return this.value;
  }
  renderToString() {
    return this.render();
  }
}

class CommentNativeElement extends NativeElement {
  value = "";
  constructor(text) {
    super(NodeType.COMMENT);
    this.value = `<!--${escape(text)}-->`;
  }
  render() {
    return this.value;
  }
  renderToString() {
    return this.render();
  }
}

// node_modules/@dark-engine/platform-server/dist/esm/dom/dom.js
var createNativeElement = function(vNode) {
  switch (vNode.type) {
    case NodeType.TAG:
      return new TagNativeElement(vNode.name);
    case NodeType.TEXT:
      return new TextNativeElement(vNode.value);
    case NodeType.COMMENT:
      return new CommentNativeElement(vNode.value);
  }
};
var addAttributes = function(element, vNode) {
  const tagElement = element;
  for (const attrName in vNode.attrs) {
    const attrValue = vNode.attrs[attrName];
    if (attrName === REF_ATTR || detectIsFunction(attrValue)) {
      continue;
    } else if (!detectIsUndefined(attrValue) && !ATTR_BLACK_LIST[attrName]) {
      !patchAttributes(tagElement, attrName, attrValue) && tagElement.setAttribute(attrName, attrValue);
    }
  }
};
var patchAttributes = function(element, attrName, attrValue) {
  const fn = specialCasesMap[element.name];
  const stop = fn ? fn(element, attrName, attrValue) : false;
  return stop;
};
var commitCreation = function(fiber6) {
  const parent = getFiberWithElement(fiber6.parent);
  const parentElement = parent.element;
  const vNode = parent.inst;
  !detectIsVoidElement(vNode.name) && appendNativeElement(fiber6.element, parentElement);
  detectIsTagVirtualNode(fiber6.inst) && addAttributes(fiber6.element, fiber6.inst);
};
var commit2 = function(fiber6) {
  switch (fiber6.tag) {
    case CREATE_EFFECT_TAG:
      fiber6.element && commitCreation(fiber6);
      break;
    default:
      break;
  }
};
var createChunk = function(fiber6) {
  let chunk = "";
  const tagNode = fiber6?.inst;
  const tagElement = fiber6?.element;
  if (!fiber6 || tagNode.name === ROOT)
    return;
  if (!chunkIds[fiber6.id]) {
    if (detectIsTagVirtualNode(fiber6.inst)) {
      addAttributes(tagElement, fiber6.inst);
      chunk = tagElement.render(true);
    } else if (detectIsPlainVirtualNode(fiber6.inst)) {
      chunk = fiber6.element.render();
    }
  } else if (detectIsTagVirtualNode(fiber6.inst)) {
    chunk = tagElement.render(false);
  }
  chunkIds[fiber6.id] = true;
  return chunk;
};
var createNativeChildrenNodes = function(children, parent) {
  const elements = [];
  for (const child of children) {
    const isTag = detectIsTagVirtualNode(child);
    const isText = detectIsTextVirtualNode(child);
    const content = isTag || isText ? child : detectIsTextBased(child) ? Text(child) : createReplacer();
    const element = createNativeElement(content);
    isTag && addAttributes(element, child);
    parent && appendNativeElement(element, parent);
    if (isTag && child.children.length > 0) {
      createNativeChildrenNodes(child.children, element);
    }
    elements.push(element);
  }
  return elements;
};
var chunkIds = {};
var specialCasesMap = {
  [TEXTAREA_TAG]: (element, attrName, attrValue) => {
    if (attrName === VALUE_ATTR && attrValue) {
      const textElement = new TextNativeElement(String(attrValue));
      element.children = [textElement];
      textElement.parentElement = element;
      return true;
    }
    return false;
  }
};
var finishCommit = () => {
  chunkIds = {};
};
var appendNativeElement = (element, parent) => parent.appendChild(element);

// node_modules/@dark-engine/platform-server/dist/esm/render/render.js
var inject = function() {
  platform.createElement = createNativeElement;
  platform.raf = dummyFn;
  platform.caf = dummyFn;
  platform.spawn = spawn;
  platform.commit = commit2;
  platform.finishCommit = finishCommit;
  platform.detectIsDynamic = falseFn;
  isInjected = true;
};
var scheduleRender = function(options) {
  !isInjected && inject();
  const { element, onCompleted, onError, onStart } = options;
  const rootId2 = getNextRootId();
  const callback = () => {
    setRootId(rootId2);
    const $scope = $$scope();
    const fiber6 = new Fiber().mutate({
      element: new TagNativeElement(ROOT),
      inst: new TagVirtualNode(ROOT, {}, flatten([element || createReplacer()])),
      tag: CREATE_EFFECT_TAG
    });
    const emitter7 = $scope.getEmitter();
    $scope.setIsStreamZone(true);
    $scope.resetMount();
    $scope.setWorkInProgress(fiber6);
    $scope.setNextUnitOfWork(fiber6);
    onStart();
    emitter7.on("finish", () => {
      emitter7.kill();
      onCompleted();
    });
    emitter7.on("error", (err) => {
      emitter7.kill();
      onError(err);
    });
  };
  scheduler.schedule(callback, { priority: TaskPriority.NORMAL, forceAsync: true });
};
var renderToReadableStream = function(element, options, fromStream) {
  const { bootstrapScripts = [], bootstrapModules = [], chunkSize = 500, awaitMetatags = false } = options || {};
  const stream = new Readable({ encoding: "utf-8", read() {
  } });
  let canSendChunks = true;
  let hasMetatags = false;
  let content = "";
  let stash = "";
  const onStart = () => {
    const emitter7 = $$scope().getEmitter();
    emitter7.on("box", (box) => {
      if (!hasMetatags && detectIsMetatagsBox(box)) {
        const data = createMetadata(box.vNodes);
        hasMetatags = true;
        if (awaitMetatags) {
          canSendChunks = true;
          content += data + stash;
          stash = "";
        } else if (!fromStream) {
          content = content.replace(HEAD_CLOSED_CHUNK, data + HEAD_CLOSED_CHUNK);
        }
      }
    });
    emitter7.on("chunk", (fiber6) => {
      const chunk = createChunk(fiber6);
      if (chunk === HEAD_CLOSED_CHUNK && awaitMetatags && !hasMetatags) {
        canSendChunks = false;
      }
      if (canSendChunks) {
        if (chunk === BODY_CLOSED_CHUNK && (bootstrapScripts.length > 0 || bootstrapModules.length > 0)) {
          content += addScripts(bootstrapScripts, false);
          content += addScripts(bootstrapModules, true);
        }
        content += chunk;
        if (content.length >= chunkSize) {
          stream.push(content);
          content = "";
        }
      } else {
        stash += chunk;
      }
    });
  };
  const onCompleted = () => {
    const rootId2 = getRootId();
    if (content) {
      stream.push(content);
      content = "";
    }
    stream.push(withState());
    stream.push(null);
    unmountRoot(rootId2, dummyFn);
  };
  const onError = (err) => {
    const rootId2 = getRootId();
    stream.emit("error", new Error(err));
    stream.push(null);
    unmountRoot(rootId2, dummyFn);
  };
  scheduleRender({ element, onStart, onCompleted, onError });
  return stream;
};
var renderToString = function(element) {
  return convertStreamToPromise(renderToReadableStream(element));
};
var convertStreamToPromise = function(stream) {
  return new Promise((resolve, reject) => {
    let data = "";
    stream.on("data", (chunk) => data += chunk);
    stream.on("end", () => resolve(data));
    stream.on("error", reject);
  });
};
var addScripts = function(scripts, isModule) {
  if (scripts.length === 0)
    return "";
  let content = "";
  scripts.forEach((x3) => content += isModule ? createModule(x3) : createScript(x3));
  return content;
};
var withState = function(content = "") {
  const $scope = $$scope();
  const state = $scope.getResources();
  const resources = {};
  if (state.size === 0)
    return content;
  state.forEach((value15, key) => resources[key] = value15);
  const encoded = Buffer.from(JSON.stringify(resources)).toString("base64");
  const $content = `${content}<script type="${STATE_SCRIPT_TYPE}">"${encoded}"</script>`;
  return $content;
};
var spawn = nextTick;
var nextRootId = -1;
var isInjected = false;
var createMetadata = (vNodes) => createNativeChildrenNodes(vNodes).map((x3) => x3.renderToString()).join("");
var createModule = (src) => `<script type="module" src="${src}" defer></script>`;
var createScript = (src) => `<script src="${src}" defer></script>`;
var getNextRootId = () => ++nextRootId;
var HEAD_CLOSED_CHUNK = "</head>";
var BODY_CLOSED_CHUNK = "</body>";
// node_modules/@dark-engine/styled/dist/esm/server/sheet.js
init_constants2();
init_manager();
import {Transform as Transform2} from "stream";

class ServerStyleSheet {
  manager = new Manager;
  collectStyles(app) {
    return ManagerProvider({ manager: this.manager, slot: app });
  }
  getStyleTags() {
    const styles = this.manager.getStyles();
    const tags = [];
    let css1 = "";
    let css2 = "";
    for (const $css of styles[STYLE_LEVEL.GLOBAL]) {
      css1 += $css;
    }
    for (const $css of styles[STYLE_LEVEL.COMPONENT]) {
      css2 += $css;
    }
    css1 && tags.push(ServerStyleSheet.wrapWithStyleTag(css1, false, false));
    css2 && tags.push(ServerStyleSheet.wrapWithStyleTag(css2, true, false));
    return tags.join("");
  }
  interleaveWithStream(readable) {
    const { manager: manager2 } = this;
    const $seal = this.seal.bind(this);
    const transform7 = new Transform2({
      encoding: "utf-8",
      transform(chunk, _, callback) {
        const pattern3 = /(<\/.*?>)/;
        const data = chunk.toString();
        const styles = manager2.getStyles();
        const set1 = styles[STYLE_LEVEL.GLOBAL];
        const set2 = styles[STYLE_LEVEL.COMPONENT];
        let content = "";
        if (pattern3.test(data)) {
          for (const style of set1) {
            content += ServerStyleSheet.wrapWithStyleTag(style, false, true);
            set1.delete(style);
          }
          for (const style of set2) {
            content += ServerStyleSheet.wrapWithStyleTag(style, true, true);
            set2.delete(style);
          }
          content = data.replace(pattern3, `\$1${content}`);
          this.push(content);
        } else {
          this.push(chunk);
        }
        callback();
      },
      final(callback) {
        $seal();
        callback();
      }
    });
    readable.pipe(transform7);
    return transform7;
  }
  seal() {
    this.manager.seal();
  }
  static wrapWithStyleTag(style, isComponentStyle, isInterleave) {
    return `<${STYLE_TAG} ${STYLED_ATTR}="${isComponentStyle ? isInterleave ? INTERLEAVE_COMPONENTS_ATTR_VALUE : COMPONENTS_ATTR_VALUE : isInterleave ? INTERLEAVE_GLOBAL_ATTR_VALUE : GLOBAL_ATTR_VALUE}">${style}</${STYLE_TAG}>`;
  }
}

// src/server/handlers/dark.js
init_dist2();

// src/server/utils.js
init_it();
init_en();
init_nl();
var getMessagesSync = (lang) => {
  if (lang === "it") {
    return it_default;
  }
  if (lang === "nl") {
    return nl_default;
  }
  return en_default;
};

// src/shared/translations/utils.js
init_esm();

// src/shared/routes/utils.js
init_esm();
init_dist3();
var getBasePathname = (pathname) => {
  for (let i3 = 1, len = languages.length;i3 < len; i3++) {
    const language = languages[i3];
    const homePath = `/${language}`;
    if (pathname === "/" || pathname === homePath) {
      return "/";
    }
    const pathPrefix = `${homePath}/`;
    if (pathname.startsWith(pathPrefix)) {
      return pathname.substring(pathPrefix.length - 1);
    }
  }
  return pathname;
};
var getHomePath = (language) => {
  s3(detectIsString(language), "language must be a string");
  if (isAlternateLanguage(language)) {
    return `/${language}/`;
  }
  return "/";
};
var getAlternatePaths = (pathname) => {
  const result = {};
  const basePathname = getBasePathname(pathname);
  result[defaultLanguage] = basePathname;
  if (basePathname === "/") {
    for (let i3 = 1, len = languages.length;i3 < len; i3++) {
      const language = languages[i3];
      result[language] = `/${language}`;
    }
  } else {
    for (let i3 = 1, len = languages.length;i3 < len; i3++) {
      const language = languages[i3];
      result[language] = `/${language}${basePathname}`;
    }
  }
  return result;
};

// src/shared/translations/languages.js
var languages = ["en", "it", "nl"];

// src/shared/translations/titles.js
var titles = Object.freeze({
  fallback: "Adorable dog breeds and traits",
  home: {
    en: "Discover cute dogs and puppies",
    it: "Scopri cani e cuccioli carini",
    nl: "Ontdek schattige honden en pups"
  }
});

// src/shared/translations/utils.js
var defaultLanguage = languages[0];
var isAlternateLanguage = (language) => {
  for (let i3 = 1, len = languages.length;i3 < len; i3++) {
    const alternateLanguage = languages[i3];
    if (alternateLanguage === language) {
      return true;
    }
  }
  return false;
};
var getTitle = (seoString, language) => {
  const fallbackTitle = titles.fallback;
  if (detectIsUndefined(seoString)) {
    return fallbackTitle;
  }
  const pageTitles = titles[seoString];
  if (detectIsUndefined(pageTitles)) {
    return fallbackTitle;
  }
  const languageTitle = pageTitles[language];
  if (detectIsUndefined(languageTitle)) {
    return fallbackTitle;
  }
  return languageTitle;
};
var getLanguageFromPathname = (pathname) => {
  for (let i3 = 0, len = languages.length;i3 < len; i3++) {
    const language = languages[i3];
    if (pathname.startsWith(`/${language}`)) {
      return language;
    }
  }
  return defaultLanguage;
};
var getTitleFromPathname = (pathname) => {
  const language = getLanguageFromPathname(pathname);
  const basePathname = getBasePathname(pathname);
  if (basePathname === "/") {
    return getTitle("home", language);
  }
  const lastPathnameSegment = basePathname.substring(basePathname.lastIndexOf("/") + 1);
  return getTitle(lastPathnameSegment, language);
};
var getMessages = async (lang) => {
  if (lang === "it") {
    const messages2 = await Promise.resolve().then(() => (init_it(), exports_it));
    return messages2.default;
  }
  if (lang === "nl") {
    const messages2 = await Promise.resolve().then(() => (init_nl(), exports_nl));
    return messages2.default;
  }
  const messages = await Promise.resolve().then(() => (init_en(), exports_en));
  return messages.default;
};
var dynamicMessagesLoading = async (translatorInstance, newLanguage) => {
  const { changeLanguage, localeData } = translatorInstance;
  for (let i3 = 0, len = localeData.length;i3 < len; i3++) {
    if (localeData[i3].language === newLanguage) {
      changeLanguage(newLanguage);
      return;
    }
  }
  const messages = await getMessages(newLanguage);
  changeLanguage(newLanguage, messages);
};
// src/shared/config.js
var config = Object.freeze({
  baseUrl: "http://localhost:12000",
  backendUrl: "http://localhost:12010",
  legalName: "",
  vatId: "redacted",
  name: "redacted",
  tagline: "redacted",
  contactPhone: "+000000000000",
  contactEmail: "redacted",
  addressStreet: "redacted",
  addressZip: "redacted",
  addressCity: "redacted",
  addressCountry: "redacted",
  instagramUsername: "redacted",
  facebookUsername: "redacted",
  twitterUsername: "redacted"
});

// src/shared/data/api.js
var euxenite = {
  files: `${config.backendUrl}/api/euxenite/files`
};
var api = {};

// src/server/api.js
var api3 = {
  ...api
};

// src/shared/components/App.jsx
init_esm();

// node_modules/@dark-engine/data/dist/esm/client/client.js
init_esm();

// node_modules/@dark-engine/data/dist/esm/utils/utils.js
init_esm();

// node_modules/@dark-engine/data/dist/esm/constants.js
var LIB5 = "@dark-engine/data";
var ROOT_ID = "__ROOT__";

// node_modules/@dark-engine/data/dist/esm/utils/utils.js
var illegal4 = (x4) => illegal(x4, LIB5);

// node_modules/@dark-engine/data/dist/esm/client/client.js
class DataClient {
  api;
  cache;
  constructor(options) {
    const { api: api4, cache } = options;
    this.api = api4;
    this.cache = cache;
  }
  getApi() {
    return this.api;
  }
  getCache() {
    return this.cache;
  }
  subscribe(subscriber) {
    return this.cache.subscribe(subscriber);
  }
  monitor(subscriber) {
    return this.cache.monitor(subscriber);
  }
}
var DataClientContext = createContext(null, { displayName: "DataClient" });
var useClient = () => useContext(DataClientContext);
var DataClientProvider = component(({ client, slot }) => {
  if (useClient())
    illegal4("Illegal nested data client provider!");
  return DataClientContext({ value: client, slot });
});
// node_modules/@dark-engine/data/dist/esm/cache/cache.js
init_esm();
class InMemoryCache {
  state = {};
  emitter1 = new EventEmitter;
  emitter2 = new EventEmitter;
  keys = new Set;
  getState() {
    return this.state;
  }
  read(key, options) {
    const { id = ROOT_ID } = options || {};
    const map3 = this.state[key];
    const record4 = map3?.[id] || null;
    return record4;
  }
  write(key, data, options) {
    const { id = ROOT_ID } = options || {};
    if (!this.state[key])
      this.state[key] = {};
    const map3 = this.state[key];
    const record4 = { id, valid: true, modifiedAt: getTime(), data };
    map3[id] = record4;
    this.emitter1.emit("change", { type: "write", key, id, record: record4 });
  }
  optimistic(key, data, options) {
    const { id = ROOT_ID } = options || {};
    if (!this.state[key])
      this.state[key] = {};
    const map3 = this.state[key];
    const record4 = { id, valid: false, modifiedAt: getTime(), data };
    map3[id] = record4;
    this.emitter1.emit("change", { type: "optimistic", key, id, record: record4 });
  }
  invalidate(key, options) {
    const { id = ROOT_ID } = options || {};
    const map3 = this.state[key];
    if (!map3)
      return;
    const record4 = map3[id];
    if (!record4)
      return;
    record4.valid = false;
    this.emitter1.emit("change", { type: "invalidate", key, id, record: record4 });
  }
  delete(key, options) {
    const { id = ROOT_ID } = options || {};
    if (!this.state[key])
      return;
    const map3 = this.state[key];
    delete map3[id];
    this.emitter1.emit("change", { type: "delete", key, id });
  }
  subscribe(subscriber) {
    return this.emitter1.on("change", subscriber);
  }
  monitor(subscriber) {
    return this.emitter2.on("change", subscriber);
  }
  __emit(data) {
    this.emitter2.emit("change", data);
  }
  __canUpdate(key) {
    if (!this.keys.has(key)) {
      this.keys.add(key);
      nextTick(() => this.keys.delete(key));
      return true;
    }
    return false;
  }
}
// node_modules/@dark-engine/web-router/dist/esm/router/router.js
init_jsx_runtime();
init_esm();

// node_modules/@dark-engine/web-router/dist/esm/create-routes/create-routes.js
init_esm();

// node_modules/@dark-engine/web-router/dist/esm/utils/utils.js
init_esm();

// node_modules/@dark-engine/web-router/dist/esm/constants.js
var LIB6 = "@dark-engine/web-router";
var SLASH_MARK = "/";
var PARAMETER_MARK = ":";
var WILDCARD_MARK = "**";
var PROTOCOL_MARK = "://";
var SEARCH_MARK = "?";
var HASH_MARK = "#";
var ROOT_MARK = "__ROOT__";

// node_modules/@dark-engine/web-router/dist/esm/utils/utils.js
var pipe = function(...fns) {
  const [fn, ...rest4] = fns;
  return (...args) => {
    return rest4.reduce((fn1, fn2) => () => fn2(fn1()), () => fn(...args))();
  };
};
var parseURL = function(url) {
  let body = url;
  let protocol = "";
  let host = "";
  let pathname = "";
  let hash7 = "";
  let search = "";
  if (body.indexOf(PROTOCOL_MARK) !== -1) {
    [protocol, body] = body.split(PROTOCOL_MARK).filter((x4, _3, arr) => arr.length > 2 ? Boolean(x4) : true);
  }
  const splitted = body.split("");
  const idx = splitted.findIndex((x4) => x4 === SLASH_MARK);
  if (idx !== -1) {
    host = splitted.filter((_3, idx1) => idx1 < idx).join("");
    pathname = splitted.filter((_3, idx1) => idx1 >= idx).join("");
  } else {
    host = body;
    pathname = pathname || SLASH_MARK;
  }
  if (pathname.indexOf(SEARCH_MARK) !== -1) {
    [pathname, search] = split(pathname, SEARCH_MARK);
  }
  if (body.indexOf(HASH_MARK) !== -1) {
    if (search) {
      [search, hash7] = split(search, HASH_MARK);
    } else {
      [pathname, hash7] = split(pathname, HASH_MARK);
    }
  }
  return {
    protocol,
    host,
    pathname,
    search: createSearch(search),
    hash: createHash(hash7)
  };
};
var normalizePath = function(x4) {
  const { pathname, search, hash: hash7 } = parseURL(startSlash(x4));
  return reduceSlashes(join(pathname, search, hash7));
};
var sort = function(type47, list, selector) {
  const asc = (a3, b3) => selector(a3) - selector(b3);
  const desc = (a3, b3) => selector(b3) - selector(a3);
  const compare = type47 === "asc" ? asc : desc;
  return list.sort(compare);
};
var keyBy = function(list, fn, value15 = false) {
  return list.reduce((acc, x4) => (acc[fn(x4)] = value15 ? x4 : true, acc), {});
};
var createSearch = (x4) => x4 ? `${SEARCH_MARK}${x4}` : "";
var createHash = (x4) => x4 ? `${HASH_MARK}${x4}` : "";
var detectIsParam = (x4) => x4 && x4.startsWith(PARAMETER_MARK);
var getParamName = (x4) => detectIsParam(x4) ? x4.slice(1, x4.length) : null;
var split = (x4, token) => x4.split(token).filter(Boolean);
var splitBySlash = (x4) => split(x4, SLASH_MARK);
var startSlash = (x4) => x4.startsWith(SLASH_MARK) ? x4 : SLASH_MARK + x4;
var join = (...args) => args.join("");
var reduceSlashes = (x4) => x4.replaceAll(new RegExp(`${SLASH_MARK}+`, "g"), SLASH_MARK);
var trimSlashes = (x4) => x4.replace(new RegExp(`^${SLASH_MARK}+|${SLASH_MARK}+\$`, "g"), "");
var illegal5 = (x4) => illegal(x4, LIB6);

// node_modules/@dark-engine/web-router/dist/esm/context/context.js
init_esm();
var checkContextValue = function(value15) {
  if (!value15) {
    illegal5(`Illegal hook's invoke outside router!`);
  }
};
var ActiveRouteContext = createContext(null, { displayName: "ActiveRoute" });
var useActiveRouteContext = () => useContext(ActiveRouteContext);
var RouterHistoryContext = createContext(null, { displayName: "RouterHistory" });
var useRouterHistoryContext = () => useContext(RouterHistoryContext);
var CurrentPathContext = createContext(null, { displayName: "CurrentPath" });
var PendingContext = createContext(null, { displayName: "Pending" });

// node_modules/@dark-engine/web-router/dist/esm/create-routes/create-routes.js
var createRoutes = function(routes, prefix = SLASH_MARK, parent = null) {
  const $routes = [];
  for (const route of routes) {
    const $route = new Route({ ...route, prefix, parent });
    $routes.push($route, ...$route.children);
  }
  if (!parent) {
    const map3 = keyBy($routes, (x4) => x4.path, true);
    for (const $route of $routes) {
      if ($route.redirectTo) {
        $route.redirectTo.route = map3[$route.redirectTo.path] || null;
      }
    }
  }
  return $routes;
};
var resolve = function(url, routes) {
  const $match = match(url, routes);
  const $wildcard = wildcard(url, routes);
  const route = pipe($match, redirect, $wildcard, redirect, root, redirect, canRender)();
  return route;
};
var match = function(url, routes) {
  return () => {
    const [route] = routes.filter((x4) => detectIsMatch(url, x4.path));
    return pick6(route);
  };
};
var redirect = function(route) {
  if (route?.redirectTo)
    return redirect(route.redirectTo.route);
  if (route?.parent?.redirectTo)
    return redirect(route.parent.redirectTo.route);
  return pick6(route);
};
var wildcard = function(path, routes) {
  return (route) => {
    if (route)
      return route;
    const [$route] = pipe((routes2) => routes2.filter((x4) => x4.marker === WILDCARD_MARK), (routes2) => routes2.filter((x4) => detectIsMatchAsWildcard(path, x4.path)) || null, (routes2) => sort("desc", routes2, (x4) => x4.level))(routes);
    return pick6($route);
  };
};
var root = function(route) {
  const $route = route?.children.find((x4) => x4.marker === ROOT_MARK);
  if ($route?.children.length > 0)
    return root($route);
  return pick6($route || route);
};
var canRender = function(route) {
  if (route?.component)
    return route;
  illegal5("The route was not found or it has no component!");
};
var detectIsMatch = function(url, path) {
  const matcher = createMatcher({
    space: (a3, b3) => Math.max(a3.length, b3.length),
    skip: ({ isParam }) => isParam
  });
  return matcher(url, path);
};
var detectIsMatchAsWildcard = function(url, path) {
  const matcher = createMatcher({
    space: (_3, b3) => b3.length,
    skip: ({ isParam, isWildcard }) => isParam || isWildcard
  });
  return matcher(url, path);
};
var createMatcher = function(options) {
  const { space, skip } = options;
  return (url, path) => {
    const [a3, b3] = split2(url, path);
    for (let i3 = 0;i3 < space(a3, b3); i3++) {
      const segment = b3[i3];
      const isWildcard = segment === WILDCARD_MARK;
      const isParam = detectIsParam(segment);
      if (segment !== a3[i3] && !skip({ isWildcard, isParam }))
        return false;
    }
    return true;
  };
};
var mergePaths = function(url, path) {
  const [a3, b3] = split2(url, path);
  const parts = [];
  for (let i3 = 0;i3 < b3.length; i3++) {
    const isParam = detectIsParam(b3[i3]);
    if (isParam) {
      const param = a3[i3] || "null";
      parts.push(param);
    } else {
      parts.push(b3[i3]);
    }
  }
  let $path = normalizePath(parts.join(SLASH_MARK));
  if ($path[0] !== SLASH_MARK) {
    $path = join(SLASH_MARK, $path);
  }
  return $path;
};
var createPrefixedPath = function(pathMatch, prefix, path) {
  const $prefix = pathMatch === "prefix" ? normalizePath(prefix) + SLASH_MARK : "";
  return trimSlashes(normalizePath($prefix ? `${$prefix}${path}` : path));
};
var getParamsMap = function(url, route) {
  const [a3, b3] = split2(url, route.path);
  const map3 = new Map;
  for (let i3 = 0;i3 < b3.length; i3++) {
    if (detectIsParam(b3[i3])) {
      map3.set(getParamName(b3[i3]), a3[i3]);
    }
  }
  return map3;
};
var resolveRoute = function(url, routes) {
  const route = resolve(url, routes);
  const slot = route.render();
  const params = getParamsMap(url, route);
  const value15 = { route, slot, params };
  return value15;
};

class Route {
  path = "";
  pathMatch;
  parent = null;
  children = [];
  level = null;
  marker = "";
  redirectTo;
  component;
  constructor(options) {
    const { prefix, path, redirectTo, pathMatch = "prefix", children = [], parent, component: component12 } = options;
    const rootPath = createRootPath(path);
    const prefixedPath = createPrefixedPath(pathMatch, prefix, rootPath);
    this.path = prefixedPath;
    this.pathMatch = pathMatch;
    this.parent = parent;
    this.children = createRoutes(children, prefixedPath, this);
    this.level = parent ? parent.level + 1 : 0;
    this.marker = rootPath === "" ? ROOT_MARK : rootPath;
    this.redirectTo = detectIsString(redirectTo) ? {
      path: createPrefixedPath(pathMatch, prefix, createRootPath(redirectTo)),
      route: null
    } : null;
    this.component = component12 || null;
  }
  getRoute() {
    return this;
  }
  getPath() {
    return this.path;
  }
  render() {
    let slot = null;
    let nextRoute = this.getRoute();
    while (nextRoute) {
      const value15 = nextRoute.getPath();
      const factory = nextRoute.component;
      const component12 = factory({ slot });
      component12.displayName = `Route(${nextRoute.getPath()})`;
      slot = CurrentPathContext({ value: value15, slot: [component12] });
      nextRoute = nextRoute.parent;
    }
    return slot;
  }
}
var pick6 = (route) => route || null;
var createRootPath = (path) => path === SLASH_MARK ? "" : path;
var split2 = (url, path) => [splitBySlash(url), splitBySlash(path)];
var merge = (url, route, s4, h3) => join(mergePaths(url, route.getPath()), s4, h3);
var detectIsWildcard = (route) => route.marker === WILDCARD_MARK;

// node_modules/@dark-engine/web-router/dist/esm/location/location.js
init_esm();
var createKey = function(path) {
  return path.split("").map((x4) => x4.charCodeAt(0)).reduce((acc, x4) => (acc += x4, acc), 200000).toString(32);
};

class RouterLocation {
  url;
  protocol;
  host;
  pathname;
  hash;
  search;
  key;
  constructor(url) {
    if (detectIsFalsy(url))
      illegal5("The RouterLocation must have an initial url!");
    const { protocol, host, pathname, hash: hash7, search } = parseURL(url);
    this.url = url;
    this.protocol = protocol;
    this.host = host;
    this.pathname = pathname;
    this.hash = hash7;
    this.search = search;
    this.key = createKey(pathname);
    Object.freeze(this);
  }
}
var createRouterLocation = (url) => new RouterLocation(url);

// node_modules/@dark-engine/web-router/dist/esm/history/history.js
init_esm();
var history = globalThis.history;

class RouterHistory {
  stack = [];
  cursor = -1;
  emitter = new EventEmitter;
  fromHistory = false;
  dispose = null;
  constructor(url) {
    if (detectIsFalsy(url))
      illegal5("The RouterHistory must have an initial url!");
    const { pathname, search, hash: hash7 } = parseURL(url);
    const $url = join(pathname, search, hash7);
    this.stack.push($url);
    this.cursor = this.stack.length - 1;
    if (!detectIsUndefined(history)) {
      const state = this.getState();
      if (!state) {
        history.replaceState(this.createStateBox(), "");
      } else {
        this.stack = state.stack;
        this.cursor = state.cursor;
      }
      const handleEvent = () => {
        const state2 = this.getState();
        if (state2) {
          if (this.stack.length < state2.stack.length) {
            this.emitter.emit("forward", this.getValue());
          } else if (this.stack.length > state2.stack.length) {
            this.emitter.emit("back", this.getValue());
          }
          this.stack = state2.stack;
          this.cursor = state2.cursor;
        }
        if (!this.fromHistory) {
          this.mapSubscribers();
        }
        this.fromHistory = false;
      };
      window.addEventListener("popstate", handleEvent);
      this.dispose = () => {
        window.removeEventListener("popstate", handleEvent);
        this.emitter = new EventEmitter;
        this.stack = [];
        this.cursor = -1;
      };
    }
  }
  mapSubscribers() {
    this.emitter.emit("change", this.getValue());
  }
  getValue = () => {
    return normalizePath(this.stack[this.cursor]);
  };
  getState() {
    return history.state && history.state[STATE_KEY] || null;
  }
  createStateBox() {
    const state = history.state || {};
    return { ...state, [STATE_KEY]: { cursor: this.cursor, stack: this.stack } };
  }
  syncHistory(action, url) {
    if (!history)
      return;
    const box = this.createStateBox();
    const $url = normalizePath(url);
    switch (action) {
      case HistoryAction.PUSH:
        return history.pushState(box, "", $url);
      case HistoryAction.REPLACE:
        return history.replaceState(box, "", $url);
    }
  }
  subscribe = (event, subscriber) => {
    return this.emitter.on(event, subscriber);
  };
  push(url) {
    this.stack.splice(this.cursor + 1, this.stack.length, url);
    this.cursor = this.stack.length - 1;
    this.syncHistory(HistoryAction.PUSH, url);
    this.mapSubscribers();
  }
  replace(url) {
    this.stack[this.stack.length - 1] = url;
    this.syncHistory(HistoryAction.REPLACE, url);
    this.mapSubscribers();
  }
  forward() {
    this.go(1);
  }
  back() {
    this.go(-1);
  }
  go(delta4) {
    const max = this.stack.length - 1;
    let $delta = delta4;
    this.fromHistory = true;
    this.cursor += delta4;
    if (this.cursor > max) {
      this.cursor = max;
      $delta = max;
    } else if (this.cursor < 0) {
      this.cursor = 0;
      $delta = -max;
    }
    history?.go($delta);
    this.mapSubscribers();
  }
}
var HistoryAction;
(function(HistoryAction2) {
  HistoryAction2["PUSH"] = "PUSH";
  HistoryAction2["REPLACE"] = "REPLACE";
})(HistoryAction || (HistoryAction = {}));
var STATE_KEY = "web-router";
var createRouterHistory = (url) => new RouterHistory(url);

// node_modules/@dark-engine/web-router/dist/esm/router/router.js
var Router = component(({ ref: ref7, url: fullURL, baseURL = SLASH_MARK, routes: sourceRoutes, mode, slot }) => {
  if (useActiveRouteContext())
    illegal5(`The parent active route's context detected!`);
  const sourceURL = fullURL || window.location.href;
  const $scope = $$scope();
  const [location2, setLocation] = useState(() => createRouterLocation(sourceURL));
  const history3 = useMemo(() => createRouterHistory(sourceURL), []);
  const routes = useMemo(() => createRoutes(sourceRoutes, normalizePath(baseURL)), []);
  const { protocol, host, pathname: url, search, hash: hash7 } = location2;
  const { route, slot: content, params } = useMemo(() => resolveRoute(url, routes), [url]);
  const scope15 = useMemo(() => ({ location: location2, pending$: atom(false) }), []);
  const historyContext = useMemo(() => ({ history: history3 }), []);
  const routerContext = useMemo(() => ({ location: location2, route, params }), [location2]);
  const isConcurrent = mode === "concurrent";
  const { pending$ } = scope15;
  const set2 = (location3) => {
    if (isConcurrent) {
      startTransition(() => pending$.set(true));
      $scope.setOnTransitionEnd(() => {
        if (scope15.location === location3) {
          startTransition(() => pending$.set(false));
        }
      });
      startTransition(() => setLocation(location3));
      $scope.setOnTransitionEnd(null);
    } else {
      setLocation(location3);
    }
  };
  useLayoutEffect(() => {
    if (!detectIsString(fullURL))
      return;
    if (sourceURL !== scope15.location.url) {
      const location3 = createRouterLocation(sourceURL);
      scope15.location = location3;
      set2(location3);
    }
  }, [sourceURL]);
  useLayoutEffect(() => {
    const unsubscribe = history3.subscribe("change", (candidateURL) => {
      const { pathname: url1, search: search1, hash: hash1 } = scope15.location;
      const { pathname: url2, search: search2, hash: hash22 } = parseURL(candidateURL);
      const { route: nextRoute } = resolveRoute(url2, routes);
      const prevURL = join(url1, search1, hash1);
      const nextURL = merge(url2, nextRoute, search2, hash22);
      const isDifferent = candidateURL !== nextURL;
      if (isDifferent || prevURL !== nextURL) {
        const href = join(protocol, PROTOCOL_MARK, host, nextURL);
        const location3 = createRouterLocation(href);
        scope15.location = location3;
        set2(location3);
        isDifferent && !detectIsWildcard(nextRoute) && history3.replace(nextURL);
      }
    });
    return () => {
      unsubscribe();
      history3.dispose();
    };
  }, []);
  useLayoutEffect(() => {
    if (detectIsWildcard(route))
      return;
    const prevURL = join(url, search, hash7);
    const nextURL = merge(url, route, search, hash7);
    if (prevURL !== nextURL) {
      history3.replace(nextURL);
    }
  }, []);
  useImperativeHandle(ref7, () => ({
    navigateTo: (url2) => nextTick(() => history3.push(url2)),
    location: location2
  }));
  return jsx(RouterHistoryContext, {
    value: historyContext,
    children: jsx(ActiveRouteContext, {
      value: routerContext,
      children: jsx(PendingContext, { value: pending$, children: slot(content) })
    })
  });
}, { displayName: "Router" });
// node_modules/@dark-engine/web-router/dist/esm/use-location/use-location.js
var useLocation = function() {
  const active = useActiveRouteContext();
  checkContextValue(active);
  return active.location;
};
// node_modules/@dark-engine/web-router/dist/esm/use-history/use-history.js
var useHistory = function() {
  const value15 = useRouterHistoryContext();
  checkContextValue(value15);
  return value15.history;
};

// node_modules/@dark-engine/web-router/dist/esm/use-params/use-params.js
var useParams = function() {
  const active = useActiveRouteContext();
  checkContextValue(active);
  return active.params;
};
// node_modules/@dark-engine/web-router/dist/esm/link/link.js
init_jsx_runtime();
init_esm();
var Link = component((props) => {
  const { ref: ref7, to, class: cn1, className: cn2, slot, onClick, ...rest4 } = props;
  const history3 = useHistory();
  const className = cn1 || cn2;
  const handleClick = useEvent((e4) => {
    e4.preventDefault();
    history3.push(to);
    detectIsFunction(onClick) && onClick(e4);
  });
  return jsx("a", { ref: ref7, ...rest4, href: to, class: className, onClick: handleClick, children: slot });
}, {
  displayName: "Link"
});
// node_modules/@wareme/raf-nexus/dist/index.js
init_esm();
init_esm();
init_jsx_runtime();

class t3 {
  callbacks;
  now;
  constructor() {
    this.callbacks = [], this.now = performance.now(), requestAnimationFrame(this.raf);
  }
  add = (i3, l3) => {
    if (detectIsEmpty(l3))
      l3 = 0;
    this.callbacks.push({ callback: i3, priority: l3 });
    const c3 = (s4, h3) => s4.priority - h3.priority;
    return this.callbacks.sort(c3), () => this.remove(i3);
  };
  remove = (i3) => {
    const l3 = ({ callback: c3 }) => i3 !== c3;
    this.callbacks = this.callbacks.filter(l3);
  };
  raf = (i3) => {
    requestAnimationFrame(this.raf);
    const l3 = i3 - this.now;
    this.now = i3;
    for (let c3 = 0, s4 = this.callbacks.length;c3 < s4; c3++)
      this.callbacks[c3].callback(i3, l3);
  };
}
var a3 = createContext(null);
var f3 = () => useContext(a3);
var q = () => {
  if (detectIsBrowser())
    return new t3;
  return null;
};
var w3 = (i3) => {
  if (detectIsEmpty(i3))
    return q();
  return i3;
};
var A3 = component(({ rafNexus: i3, slot: l3 }) => {
  const c3 = useMemo(() => {
    return { rafNexus: w3(i3) };
  }, [i3]);
  return jsx(a3, { value: c3, children: l3 }, undefined, false, undefined, null);
});

// src/shared/components/App.jsx
init_dist2();

// src/shared/routes/baseRoutes.js
init_esm();
var baseRoutes = [
  {
    path: "",
    component: lazy(() => Promise.resolve().then(() => (init_Home(), exports_Home)))
  },
  {
    path: "not-found",
    component: lazy(() => Promise.resolve().then(() => (init_NotFound(), exports_NotFound)))
  }
];
// src/shared/routes/generation.js
init_jsx_runtime();

// src/shared/layout/Root.jsx
init_esm();

// src/shared/styles/Theme.jsx
init_esm();
init_esm2();
init_dist3();

// src/shared/styles/GlobalStyle.jsx
init_esm2();
var GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    min-height: 100%;
    background-color: ${(props) => props.theme.backgroundPrimary};
    overflow-y: hidden;
    -webkit-tap-highlight-color: transparent; /* Disable tap highlights */
  }

  ::selection{
    background: ${(props) => props.theme.selection};
    color: ${(props) => props.theme.foregroundPrimary};
  }

  #dark-root {
    isolation: isolate;
  }

  /*
  *
  * typography
  *
  */
  html {
    font-size: 100%;
  }

  body {
    text-rendering: optimizeLegibility;
    color: ${(props) => props.theme.foregroundPrimary};
    line-height: 1.5;
  }

  select,
  textarea,
  input, 
  button {
    font: inherit;
    letter-spacing: inherit;
    word-spacing: inherit;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  figure,
  p,
  pre {
    margin: 0;
    overflow-wrap: break-word;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
  }
`;
var GlobalStyle_default = GlobalStyle;

// src/shared/styles/Theme.jsx
init_jsx_runtime();
var breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1300px",
  xxl: "1500px",
  xxxl: "2000px"
};
var spacing = {
  headerHeightMobile: "3rem",
  headerHeight: "4.5rem",
  footerHeightMobile: "5rem",
  footerHeight: "8rem"
};
var zIndex = {
  zHeader: 1,
  zMobileMenuBackground: 2,
  zMobileMenuForeground: 3
};
var lightColors = {
  backgroundPrimary: "#fafaf0",
  backgroundSecondary: "#dce6dc",
  foregroundPrimary: "#0D190D",
  foregroundSecondary: "#697769",
  foregroundTertiary: "#9EA99E",
  selection: "#ffc757"
};
var constants27 = {
  ...breakpoints,
  ...spacing,
  ...zIndex
};
var light = {
  ...lightColors,
  borderStyle: `solid 1px ${lightColors.foregroundPrimary}`,
  ...constants27
};
var ThemeToggleContext = createContext(null);
var Theme = component(({ slot }) => {
  const themes = { light };
  const defaultTheme = themes.light;
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const toggleTheme = (name) => {
    if (detectIsEmpty(themes[name])) {
      return setSelectedTheme(defaultTheme);
    }
    setSelectedTheme(themes[name]);
  };
  return jsx(ThemeToggleContext, {
    value: toggleTheme,
    children: jsx(ThemeProvider, {
      theme: selectedTheme,
      children: [
        jsx(GlobalStyle_default, {}, undefined, false, undefined, this),
        slot
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
});
var Theme_default = Theme;

// src/shared/components/ChangeTitle.jsx
init_esm();
init_jsx_runtime();
var SetTitle = component(({ title }) => {
  const getTitleWithPostfix = () => {
    return `${title} | ${config.name}`;
  };
  useEffect(() => {
    document.title = getTitleWithPostfix();
  }, [title]);
  return null;
});
var StaticPageTitle = component(() => {
  const { pathname } = useLocation();
  const title = getTitleFromPathname(pathname);
  return jsx(SetTitle, {
    title
  }, undefined, false, undefined, this);
});
var ChangeTitle = component(() => {
  const params = useParams();
  const slug = params.get("slug");
  if (detectIsString(slug)) {
    return null;
  }
  return jsx(StaticPageTitle, {}, undefined, false, undefined, this);
});
var ChangeTitle_default = ChangeTitle;

// src/shared/layout/AppLayout.jsx
init_esm();
init_esm2();

// node_modules/@wareme/use-in-view/dist/index.js
init_esm();
init_esm();
var S3 = function(x4, B3, q3, j3) {
  if (detectIsUndefined(q3))
    q3 = {};
  if (detectIsUndefined(j3))
    j3 = M3;
  if (detectIsUndefined(window.IntersectionObserver) && !detectIsUndefined(j3)) {
    const D3 = x4.getBoundingClientRect();
    return B3(j3, { isIntersecting: j3, target: x4, intersectionRatio: detectIsNumber(q3.threshold) ? q3.threshold : 0, time: 0, boundingClientRect: D3, intersectionRect: D3, rootBounds: D3 }), () => {
    };
  }
  const { id: G3, observer: H3, elements: J3 } = V3(q3), z = J3.get(x4) || [];
  if (detectIsFalsy(J3.has(x4)))
    J3.set(x4, z);
  return z.push(B3), H3.observe(x4), () => {
    if (z.splice(z.indexOf(B3), 1), z.length === 0)
      J3.delete(x4), H3.unobserve(x4);
    if (J3.size === 0)
      H3.disconnect(), _3.delete(G3);
  };
};
var I2 = function(x4) {
  if (detectIsUndefined(x4))
    x4 = {};
  const { threshold: B3, rootMargin: q3, root: j3, triggerOnce: G3, skip: H3, initialInView: J3, fallbackInView: z, onChange: Q } = x4, [D3, T3] = useState(null), C = useRef(Q), [X, K] = useState({ inView: Boolean(J3), entry: undefined });
  useEffect(() => {
    if (H3 || detectIsFalsy(D3))
      return;
    let L4;
    return L4 = S3(D3, (E, Z) => {
      if (K({ inView: E, entry: Z }), C.current)
        C.current(E, Z);
      if (Z.isIntersecting && G3 && L4)
        L4(), L4 = undefined;
    }, { root: j3, rootMargin: q3, threshold: B3 }, z), () => {
      if (L4)
        L4();
    };
  }, [g3(B3), D3, j3, q3, G3, H3, z]);
  const Y3 = X.entry?.target, N = useRef();
  if (!D3 && Y3 && !G3 && !H3 && N.current !== Y3)
    N.current = Y3, K({ inView: Boolean(J3), entry: undefined });
  return { ref: T3, inView: X.inView, entry: X.entry };
};
var h3 = function(x4) {
  if (detectIsFalsy(x4))
    return "0";
  if (W.has(x4))
    return W.get(x4);
  return F++, W.set(x4, F.toString()), W.get(x4);
};
var w5 = function(x4) {
  const B3 = (j3) => {
    return !detectIsUndefined(x4[j3]);
  }, q3 = (j3) => {
    let G3 = x4[j3];
    if (j3 === "root")
      G3 = h3(x4.root);
    return `${j3}_${G3}`;
  };
  return Object.keys(x4).sort().filter(B3).map(q3).toString();
};
var V3 = function(x4) {
  const B3 = w5(x4);
  let q3 = _3.get(B3);
  if (detectIsFalsy(q3)) {
    const j3 = new Map;
    let G3;
    const H3 = new IntersectionObserver((J3) => {
      J3.forEach((z) => {
        const Q = z.isIntersecting && G3.some((D3) => z.intersectionRatio >= D3);
        j3.get(z.target)?.forEach((D3) => {
          D3(Q, z);
        });
      });
    }, x4);
    G3 = H3.thresholds || (Array.isArray(x4.threshold) ? x4.threshold : [x4.threshold || 0]), q3 = { id: B3, observer: H3, elements: j3 }, _3.set(B3, q3);
  }
  return q3;
};
var _3 = new Map;
var W = new WeakMap;
var F = 0;
var M3;
var g3 = function(x4) {
  if (detectIsArray(x4))
    return x4.toString();
  return x4;
};

// node_modules/@wareme/smooth-scrolling/dist/index.js
init_esm();
init_dist();
init_dist3();
init_esm();
init_dist3();
init_esm();
init_esm();
init_dist();
init_esm();
init_dist();
init_jsx_runtime();
init_esm2();
var v5 = (h4) => illegal(h4, "smooth-scrolling");
var b3 = (h4, i3) => {
  let s4;
  return (...w4) => {
    clearTimeout(s4), s4 = setTimeout(() => h4.apply(null, w4), i3);
  };
};
var A5 = (h4, i3, s4) => {
  return Math.max(h4, Math.min(i3, s4));
};
var o = (h4, i3, s4) => {
  return (1 - s4) * h4 + s4 * i3;
};
var f5 = (h4, i3, s4, w4) => {
  return o(h4, i3, 1 - Math.exp(-s4 * w4));
};
var t5 = (h4, i3) => {
  return (h4 % i3 + i3) % i3;
};

class X {
  advance(h4) {
    if (this.isRunning === false)
      return;
    let i3 = false;
    if (this.lerp) {
      if (this.value = f5(this.value, this.to, this.lerp * 60, h4), Math.round(this.value) === this.to)
        this.value = this.to, i3 = true;
    } else {
      this.currentTime += h4;
      const s4 = A5(0, this.currentTime / this.duration, 1);
      i3 = s4 >= 1;
      const w4 = m3(i3, 1, () => this.easing(s4));
      this.value = this.from + (this.to - this.from) * w4;
    }
    if (i3)
      this.stop();
    if (detectIsEmpty(this.onUpdate))
      return;
    this.onUpdate(this.value, i3);
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(h4, i3, { lerp: s4, duration: w4, easing: z, onStart: E, onUpdate: q3 }) {
    if (this.from = h4, this.value = h4, this.to = i3, this.lerp = s4, this.duration = w4, this.easing = z, this.currentTime = 0, this.isRunning = true, this.onUpdate = q3, detectIsEmpty(E))
      return;
    E();
  }
}

class Y3 {
  constructor({ wrapper: h4, content: i3, autoResize: s4 = true, debounce: w4 = 250 } = {}) {
    if (this.wrapper = h4, this.content = i3, s4) {
      if (this.debouncedResize = b3(this.resize, w4), this.wrapper === window)
        window.addEventListener("resize", this.debouncedResize, false);
      else
        this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper);
      this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content);
    }
    this.resize();
  }
  destroy() {
    if (!detectIsUndefined(this.wrapperResizeObserver))
      this.wrapperResizeObserver.disconnect();
    if (!detectIsUndefined(this.contentResizeObserver))
      this.contentResizeObserver.disconnect();
    window.removeEventListener("resize", this.debouncedResize, false);
  }
  resize = () => {
    this.onWrapperResize(), this.onContentResize();
  };
  onWrapperResize = () => {
    if (this.wrapper === window)
      this.width = window.innerWidth, this.height = window.innerHeight;
    else
      this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight;
  };
  onContentResize = () => {
    if (this.wrapper === window)
      this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
    else
      this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth;
  };
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
}
var m5 = 16.666666666666668;

class F3 {
  constructor(h4, { wheelMultiplier: i3 = 1, touchMultiplier: s4 = 1 }) {
    this.element = h4, this.wheelMultiplier = i3, this.touchMultiplier = s4, this.touchStart = { x: null, y: null }, this.eventEmitter = new J, window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.elementListenerOptions = { passive: false }, this.element.addEventListener("wheel", this.onWheel, this.elementListenerOptions), this.element.addEventListener("touchstart", this.onTouchStart, this.elementListenerOptions), this.element.addEventListener("touchmove", this.onTouchMove, this.elementListenerOptions), this.element.addEventListener("touchend", this.onTouchEnd, this.elementListenerOptions);
  }
  on = (h4) => this.eventEmitter.on(h4);
  destroy = () => {
    window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel, this.elementListenerOptions), this.element.removeEventListener("touchstart", this.onTouchStart, this.elementListenerOptions), this.element.removeEventListener("touchmove", this.onTouchMove, this.elementListenerOptions), this.element.removeEventListener("touchend", this.onTouchEnd, this.elementListenerOptions);
  };
  getTouchList = (h4) => {
    if (h4.targetTouches)
      return h4.targetTouches[0];
    return h4;
  };
  onTouchStart = (h4) => {
    const { clientX: i3, clientY: s4 } = this.getTouchList(h4);
    this.touchStart.x = i3, this.touchStart.y = s4, this.lastDelta = { x: 0, y: 0 }, this.eventEmitter.emit({ deltaX: 0, deltaY: 0, event: h4 });
  };
  onTouchMove = (h4) => {
    const { clientX: i3, clientY: s4 } = this.getTouchList(h4), w4 = -(i3 - this.touchStart.x) * this.touchMultiplier, z = -(s4 - this.touchStart.y) * this.touchMultiplier;
    this.touchStart.x = i3, this.touchStart.y = s4, this.lastDelta = { x: w4, y: z }, this.eventEmitter.emit({ deltaX: w4, deltaY: z, event: h4 });
  };
  onTouchEnd = (h4) => this.eventEmitter.emit({ deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: h4 });
  getMultipliers = (h4) => {
    if (h4 === 1)
      return [m5, m5];
    if (h4 === 2)
      return [this.windowWidth, this.windowHeight];
    return [1, 1];
  };
  onWheel = (h4) => {
    let { deltaX: i3, deltaY: s4, deltaMode: w4 } = h4;
    const [z, E] = this.getMultipliers(w4);
    i3 *= z, s4 *= E, i3 *= this.wheelMultiplier, s4 *= this.wheelMultiplier, this.eventEmitter.emit({ deltaX: i3, deltaY: s4, event: h4 });
  };
  onWindowResize = () => {
    this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
  };
}

class T3 {
  __isScrolling = false;
  __isStopped = false;
  __isLocked = false;
  __preventNextNativeScrollEvent;
  __resetVelocityTimeout;
  time;
  userData;
  lastVelocity;
  velocity;
  direction;
  options;
  targetScroll;
  animatedScroll;
  constructor({ wrapper: h4 = window, content: i3 = document.documentElement, eventsTarget: s4 = h4, smoothWheel: w4 = true, syncTouch: z = false, syncTouchLerp: E = 0.075, touchInertiaMultiplier: q3 = 35, duration: J3, easing: O3 = (V4) => Math.min(1, 1.001 - Math.pow(2, -10 * V4)), lerp: B3 = 0.1, infinite: G3 = false, orientation: S4 = "vertical", gestureOrientation: D3 = "vertical", touchMultiplier: L4 = 1, wheelMultiplier: _4 = 1, autoResize: W3 = true, prevent: Q = false } = {}) {
    if (!h4 || h4 === document.documentElement || h4 === document.body)
      h4 = window;
    this.options = { wrapper: h4, content: i3, eventsTarget: s4, smoothWheel: w4, syncTouch: z, syncTouchLerp: E, touchInertiaMultiplier: q3, duration: J3, easing: O3, lerp: B3, infinite: G3, gestureOrientation: D3, orientation: S4, touchMultiplier: L4, wheelMultiplier: _4, autoResize: W3, prevent: Q }, this.animate = new X, this.eventEmitter = new J, this.dimensions = new Y3({ wrapper: h4, content: i3, autoResize: W3 }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = false, this.isStopped = false, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll = new F3(s4, { touchMultiplier: L4, wheelMultiplier: _4 }), this.virtualScroll.on(this.onVirtualScroll);
  }
  destroy() {
    this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
  }
  on(h4) {
    return this.eventEmitter.on(h4);
  }
  off(h4) {
    return this.eventEmitter.off(h4);
  }
  setScroll(h4) {
    if (this.isHorizontal)
      this.rootElement.scrollLeft = h4;
    else
      this.rootElement.scrollTop = h4;
  }
  onPointerDown = (h4) => {
    if (h4.button === 1)
      this.reset();
  };
  onVirtualScroll = ({ deltaX: h4, deltaY: i3, event: s4 }) => {
    if (s4.ctrlKey)
      return;
    const w4 = s4.type.includes("touch"), z = s4.type.includes("wheel");
    if (this.isTouching = s4.type === "touchstart" || s4.type === "touchmove", this.options.syncTouch && w4 && s4.type === "touchstart" && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const q3 = h4 === 0 && i3 === 0, J3 = this.options.gestureOrientation === "vertical" && i3 === 0 || this.options.gestureOrientation === "horizontal" && h4 === 0;
    if (q3 || J3)
      return;
    let O3 = s4.composedPath();
    O3 = O3.slice(0, O3.indexOf(this.rootElement));
    const B3 = this.options.prevent;
    if (Boolean(O3.find((W3) => m3(detectIsFunction(B3), () => B3(W3), B3) || W3.hasAttribute?.("data-odayaka-prevent") || w4 && W3.hasAttribute?.("data-odayaka-prevent-touch") || z && W3.hasAttribute?.("data-odayaka-prevent-wheel") || W3.classList?.contains("odayaka") && !W3.classList?.contains("odayaka-stopped"))))
      return;
    if (this.isStopped || this.isLocked) {
      s4.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && w4 || this.options.smoothWheel && z)) {
      this.isScrolling = "native", this.animate.stop();
      return;
    }
    s4.preventDefault();
    let S4 = i3;
    if (this.options.gestureOrientation === "both")
      if (Math.abs(i3) > Math.abs(h4))
        S4 = i3;
      else
        S4 = h4;
    else if (this.options.gestureOrientation === "horizontal")
      S4 = h4;
    const D3 = w4 && this.options.syncTouch, _4 = w4 && s4.type === "touchend" && Math.abs(S4) > 5;
    if (_4)
      S4 = this.velocity * this.options.touchInertiaMultiplier;
    this.scrollTo(this.targetScroll + S4, { programmatic: false, ...m3(D3, { lerp: m3(_4, this.options.syncTouchLerp, 1) }, { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }) });
  };
  resize() {
    this.dimensions.resize();
  }
  emit() {
    this.eventEmitter.emit(this);
  }
  onNativeScroll = () => {
    if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent) {
      delete this.__preventNextNativeScrollEvent;
      return;
    }
    if (this.isScrolling === false || this.isScrolling === "native") {
      const h4 = this.animatedScroll;
      if (this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - h4, this.direction = Math.sign(this.animatedScroll - h4), this.isScrolling = "native", this.emit(), this.velocity !== 0)
        this.__resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
        }, 400);
    }
  };
  reset() {
    this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  start() {
    if (!this.isStopped)
      return;
    this.isStopped = false, this.reset();
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true, this.animate.stop(), this.reset();
  }
  raf(h4) {
    const i3 = h4 - (this.time || h4);
    this.time = h4, this.animate.advance(i3 * 0.001);
  }
  scrollTo(h4, { offset: i3 = 0, immediate: s4 = false, lock: w4 = false, duration: z = this.options.duration, easing: E = this.options.easing, lerp: q3 = this.options.lerp, onStart: J3, onComplete: O3, force: B3 = false, programmatic: G3 = true, userData: S4 = {} } = {}) {
    if ((this.isStopped || this.isLocked) && !B3)
      return;
    if (detectIsString(h4) && ["top", "left", "start"].includes(h4))
      h4 = 0;
    else if (detectIsString(h4) && ["bottom", "right", "end"].includes(h4))
      h4 = this.limit;
    else {
      let D3;
      if (typeof h4 === "string")
        D3 = document.querySelector(h4);
      else if (h4 instanceof HTMLElement && h4?.nodeType)
        D3 = h4;
      if (D3) {
        if (this.options.wrapper !== window) {
          const _4 = this.rootElement.getBoundingClientRect();
          i3 -= this.isHorizontal ? _4.left : _4.top;
        }
        const L4 = D3.getBoundingClientRect();
        h4 = (this.isHorizontal ? L4.left : L4.top) + this.animatedScroll;
      }
    }
    if (typeof h4 !== "number")
      return;
    if (h4 += i3, h4 = Math.round(h4), this.options.infinite) {
      if (G3)
        this.targetScroll = this.animatedScroll = this.scroll;
    } else
      h4 = A5(0, h4, this.limit);
    if (h4 === this.targetScroll)
      return;
    if (this.userData = S4, s4) {
      if (this.animatedScroll = this.targetScroll = h4, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), !detectIsEmpty(O3) && detectIsFunction(O3))
        O3(this);
      this.userData = {};
      return;
    }
    if (!G3)
      this.targetScroll = h4;
    this.animate.fromTo(this.animatedScroll, h4, { duration: z, easing: E, lerp: q3, onStart: () => {
      if (w4)
        this.isLocked = true;
      this.isScrolling = "smooth", J3?.(this);
    }, onUpdate: (D3, L4) => {
      if (this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = D3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = D3, this.setScroll(this.scroll), G3)
        this.targetScroll = D3;
      if (!L4)
        this.emit();
      if (L4) {
        if (this.reset(), this.emit(), !detectIsEmpty(O3) && detectIsFunction(O3))
          O3(this);
        this.userData = {}, this.preventNextNativeScrollEvent();
      }
    } });
  }
  preventNextNativeScrollEvent() {
    this.__preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
      delete this.__preventNextNativeScrollEvent;
    });
  }
  get rootElement() {
    if (this.options.wrapper === window)
      return document.documentElement;
    return this.options.wrapper;
  }
  get limit() {
    return this.dimensions.limit[m3(this.isHorizontal, "x", "y")];
  }
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  get actualScroll() {
    return m3(this.isHorizontal, this.rootElement.scrollLeft, this.rootElement.scrollTop);
  }
  get scroll() {
    return m3(this.options.infinite, () => t5(this.animatedScroll, this.limit), this.animatedScroll);
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(h4) {
    if (this.__isScrolling !== h4)
      this.__isScrolling = h4, this.updateClassName();
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(h4) {
    if (this.__isStopped !== h4)
      this.__isStopped = h4, this.updateClassName();
  }
  get isLocked() {
    return this.__isLocked;
  }
  set isLocked(h4) {
    if (this.__isLocked !== h4)
      this.__isLocked = h4, this.updateClassName();
  }
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  get className() {
    let h4 = "odayaka";
    if (this.isStopped)
      h4 += " odayaka-stopped";
    if (this.isLocked)
      h4 += " odayaka-locked";
    if (this.isScrolling)
      h4 += " odayaka-scrolling";
    if (this.isScrolling === "smooth")
      h4 += " odayaka-smooth";
    return h4;
  }
  updateClassName() {
    this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/odayaka(-\w+)?/g, "").trim();
  }
}

class I3 {
  state;
  eventEmitter;
  constructor(h4) {
    this.state = h4, this.eventEmitter = new J;
  }
  set = (h4) => {
    this.state = h4, this.eventEmitter.emit(this.state);
  };
  on = (h4) => this.eventEmitter.on(h4);
  get = () => this.state;
}
var N = createContext(null);
var P = new I3({});
var Dh = component(({ rafNexus: h4, wrapperRef: i3, contentRef: s4, slot: w4, root: z = false, options: E = {}, autoRaf: q3 = true, rafPriority: J3 = 0, className: O3, ...B3 }) => {
  if (detectIsEmpty(h4)) {
    const H3 = f3();
    if (detectIsEmpty(H3))
      v5("rafNexus prop was not provided and not found in context");
    h4 = H3.rafNexus;
  }
  const G3 = (H3) => {
    if (detectIsEmpty(H3))
      return useRef(null);
    return H3;
  }, S4 = G3(i3), D3 = G3(s4), [L4, _4] = useState(null), W3 = useRef([]), Q = useCallback((H3, K) => {
    const $ = (d3, c3) => d3.priority - c3.priority;
    W3.current.push({ callback: H3, priority: K }), W3.current.sort($);
  }, []), V4 = useCallback((H3) => {
    const K = ($) => $.callback !== H3;
    W3.current = W3.current.filter(K);
  }, []);
  useEffect(() => {
    const H3 = new T3({ ...E, ...!z && { wrapper: S4.current, content: D3.current } });
    return _4(H3), () => {
      H3.destroy(), _4(null);
    };
  }, [z, JSON.stringify(E)]), useEffect(() => {
    if (L4 === null || q3 === false)
      return;
    return h4.add((H3) => {
      if (L4 !== null)
        L4.raf(H3);
    }, J3);
  }, [L4, q3, J3]), useEffect(() => {
    if (z && L4 !== null)
      return P.set({ odayaka: L4, addCallback: Q, removeCallback: V4 }), () => P.set({});
  }, [z, L4, Q, V4]);
  const U = useCallback((...H3) => {
    for (let K = 0, $ = W3.current.length;K < $; K++)
      W3.current[K].callback(...H3);
  }, []);
  if (useEffect(() => {
    if (L4 !== null)
      L4.on(U);
    return () => {
      if (L4 !== null)
        L4.off(U);
    };
  }, [L4, U]), z)
    return jsx(N, { value: { odayaka: L4, addCallback: Q, removeCallback: V4 }, children: w4 }, undefined, false, undefined, null);
  return jsx(N, { value: { odayaka: L4, addCallback: Q, removeCallback: V4 }, children: jsx("div", { ref: S4, className: O3, ...B3, children: jsx("div", { ref: D3, children: w4 }, undefined, false, undefined, null) }, undefined, false, undefined, null) }, undefined, false, undefined, null);
});
var _h = css`
  html.odayaka, html.odayaka body {
    height: auto;
  }

  .odayaka.odayaka-smooth {
    scroll-behavior: auto !important;
  }

  .odayaka.odayaka-smooth [data-odayaka-prevent] {
    overscroll-behavior: contain;
  }

  .odayaka.odayaka-stopped {
    overflow: hidden;
  }

  .odayaka.odayaka-smooth iframe {
    pointer-events: none;
  }
`;

// src/shared/layout/AppLayout.jsx
init_dist3();

// src/shared/layout/Header.jsx
init_esm();
init_esm2();

// node_modules/@wareme/use-scrollbar-width/dist/index.js
init_esm();
var s5 = () => {
  if (detectIsServer())
    return 0;
  const t4 = useRef(false), r4 = useRef(0);
  if (t4.current === true)
    return r4.current;
  const e4 = document.createElement("div");
  e4.style.visibility = "hidden", e4.style.overflow = "scroll", document.body.appendChild(e4);
  const n = document.createElement("div");
  e4.appendChild(n);
  const o3 = e4.offsetWidth - n.offsetWidth;
  return e4.parentNode.removeChild(e4), t4.current = true, r4.current = o3, o3;
};

// src/shared/layout/Header.jsx
init_dist3();

// src/shared/layout/HeaderNav.jsx
init_esm();
init_esm2();
init_dist2();

// src/shared/components/NavigationLink.jsx
init_esm();
init_esm2();
init_dist3();
init_jsx_runtime();
var StyledLink = styled(Link)`
  text-decoration: none;
  background-image: ${(props) => `linear-gradient(${props.theme.foregroundPrimary}, ${props.theme.foregroundPrimary})`};
  background-repeat: no-repeat;
  transition: background-size .3s;

  background-position: ${(props) => m3(props.$active, "0 100%", "100% 100%")};
  background-size: ${(props) => m3(props.$active, "100% 1px", "0 1px")};

  &:hover {
    background-position: ${(props) => m3(props.$active, "100% 100%", "0 100%")};
    background-size: ${(props) => m3(props.$active, "0 1px", "100% 1px")};
  }

  &:visited,
  &:link {
    color: unset;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
var NavigationLink = component(({ to, slot, ...rest4 }) => {
  const { pathname } = useLocation();
  return jsx(StyledLink, {
    $active: pathname === to,
    to,
    ...rest4,
    children: slot
  }, undefined, false, undefined, this);
});
var NavigationLink_default = NavigationLink;

// src/shared/components/LanguageSelector.jsx
init_esm();
init_esm2();
init_dist2();
init_dist3();
init_jsx_runtime();
var LangaugesList = styled.ul`
  display: inline;
  list-style: none;
  margin: 0;
  padding: 0;
`;
var LanguagesListItem = styled.li`
  display: inline;
`;
var LanguageLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  color: ${(props) => m3(props.$active, props.theme.foregroundPrimary, props.theme.foregroundTertiary)};
`;
var Separator = styled.span`
  margin: 0 .5rem;
  color: ${(props) => props.theme.foregroundTertiary};
`;
var iterationSeparator = (iterationIndex, arrayLength) => {
  if (iterationIndex !== arrayLength - 1) {
    return jsx(Separator, {
      children: "/"
    }, undefined, false, undefined, this);
  }
  return null;
};
var LanguageSelectorLinks = component(({ alternatePaths }) => {
  const { pathname } = useLocation();
  const { translator } = R();
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.name;
    dynamicMessagesLoading(translator, newLanguage);
  };
  const languages3 = Object.keys(alternatePaths);
  const result = [];
  for (let i3 = 0, len = languages3.length;i3 < len; i3++) {
    const language = languages3[i3];
    const to = alternatePaths[language];
    result.push(jsx(LanguagesListItem, {
      children: [
        jsx(LanguageLink, {
          to,
          name: language,
          onClick: handleLanguageChange,
          $active: pathname === to,
          children: language
        }, undefined, false, undefined, this),
        iterationSeparator(i3, len)
      ]
    }, undefined, true, undefined, this));
  }
  return jsx(LangaugesList, {
    children: result
  }, undefined, false, undefined, this);
});
var LanguageSelector = component(() => {
  const { pathname } = useLocation();
  const alternatePaths = getAlternatePaths(pathname);
  return jsx(LanguageSelectorLinks, {
    alternatePaths
  }, undefined, false, undefined, this);
});
var LanguageSelector_default = LanguageSelector;

// src/shared/layout/HeaderNav.jsx
init_jsx_runtime();
var Nav = styled.nav`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  text-transform: uppercase;
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      padding: 0 2.5vw;
    }
  `}
`;
var Logo = styled.div`
`;
var LinksList = styled.ul`
  display: inline;
  list-style: none;
  padding: 0;
  margin: 0 10vw 0 0;
`;
var LinksListItem = styled.li`
  display: inline;
  margin: 0 5vw 0 0;
`;
var LinksWrapper = styled.div`
  display: none;
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      display: block;
    }
  `}
`;
var MobileMenuButton = styled.button`
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.foregroundPrimary};
  text-transform: uppercase;
  background-color: transparent;
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      display: none;
    }
  `}
`;
var HeaderNav = component(({ openMobileMenu }) => {
  const { t: t4 } = R("headerNav");
  const { pathname } = useLocation();
  const currentLanguage = getLanguageFromPathname(pathname);
  const homePath = getHomePath(currentLanguage);
  return jsx(Nav, {
    children: [
      jsx(Logo, {
        children: jsx(Link, {
          to: homePath,
          children: config.name
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      jsx(LinksWrapper, {
        children: [
          jsx(LinksList, {
            role: "list",
            children: [
              jsx(LinksListItem, {
                children: jsx(NavigationLink_default, {
                  to: `${homePath}shop`,
                  children: t4("shop")
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              jsx(LinksListItem, {
                children: jsx(NavigationLink_default, {
                  to: `${homePath}contact`,
                  children: t4("contact")
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          jsx(LanguageSelector_default, {
            hasWhiteBackground: true
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      jsx(MobileMenuButton, {
        type: "button",
        onClick: openMobileMenu,
        children: [
          t4("openMenu"),
          " +"
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
});
var HeaderNav_default = HeaderNav;

// src/shared/layout/Header.jsx
init_jsx_runtime();
var StyledHeader = styled.header`
  position: absolute;
  transition: height .6s, background-color .6s;
  height: ${(props) => m3(props.$isVisible, props.theme.headerHeightMobile, "0")};
  background-color: ${(props) => m3(props.$isVisible, props.theme.backgroundPrimary, "transparent")};
  inset: ${(props) => m3(props.$scrollbarWidth === 0, "0 0 auto", `0 ${props.$scrollbarWidth}px auto 0`)};
  z-index: ${(props) => props.theme.zHeader};
  
  ${(props) => {
  if (props.$isVisible === true) {
    return css`
        @media (min-width: ${props.theme.sm}) {
          height: ${props.theme.headerHeight};
        }
      `;
  }
}};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
var HeaderNavWrapper = styled.div`
  transition: transform .6s;
  transform: ${(props) => m3(props.$isVisible, "translateY(0)", "translateY(-100%)")};
  height: ${(props) => props.theme.headerHeightMobile};
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      && { height: ${props.theme.headerHeight}; } // https://github.com/atellmer/dark/issues/72
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
var Header = component(({ scrollRef, footerInView, openMobileMenu, slot }) => {
  s3(!detectIsEmpty(scrollRef), "Header did not receive required scrollRef");
  const scrollbarWidth = s5();
  const previousScrollPosition = useRef(0);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  useEffect(() => {
    const updateScrollPosition = () => {
      setCurrentScrollPosition(scrollRef.current.scrollTop);
    };
    scrollRef.current.addEventListener("scroll", updateScrollPosition);
    return () => {
      scrollRef.current.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);
  useEffect(() => {
    setIsAtTop(currentScrollPosition === 0);
    setHasScrolledUp(previousScrollPosition.current > currentScrollPosition);
    previousScrollPosition.current = currentScrollPosition;
  }, [currentScrollPosition]);
  const isVisible = isAtTop === true || hasScrolledUp === true || footerInView === true;
  return jsx(StyledHeader, {
    $isVisible: isVisible,
    $scrollbarWidth: scrollbarWidth,
    children: [
      jsx(HeaderNavWrapper, {
        $isVisible: isVisible,
        children: jsx(HeaderNav_default, {
          openMobileMenu
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      slot
    ]
  }, undefined, true, undefined, this);
});
var Header_default = Header;

// src/shared/layout/Footer.jsx
init_esm();
init_esm2();
init_dist2();

// src/shared/components/Copyright.jsx
init_esm();
init_jsx_runtime();
var Copyright = component(({ name }) => {
  const copyrightYear = new Date().getFullYear();
  return jsx(Fragment, {
    children: [
      "\xA9 ",
      copyrightYear,
      " ",
      name
    ]
  }, undefined, true, undefined, this);
});
var Copyright_default = Copyright;

// src/shared/layout/Footer.jsx
init_jsx_runtime();
var StyledFooter = styled.footer`
  display: flex;
  padding: 0 4vw;
  height: ${(props) => props.theme.footerHeightMobile};
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      height: ${props.theme.footerHeight};
      padding: 0 2.5vw;
    }
  `}
`;
var BrandColumn = styled.div`
  display: none;
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      flex: 1;
      display: flex;
      align-items: end;
      padding: 0 0 1vw 0;
    }
  `}
`;
var InfoColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 0 1vw 0;
`;
var InfoParagraph = styled.p`
  color: ${(props) => props.theme.foregroundSecondary};
`;
var LinksList2 = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
var Footer = component(({ inViewRef }) => {
  const { t: t4 } = R("footer");
  const { pathname } = useLocation();
  const language = getLanguageFromPathname(pathname);
  const homePath = getHomePath(language);
  return jsx(StyledFooter, {
    ref: inViewRef,
    children: [
      jsx(BrandColumn, {
        children: jsx("div", {
          children: jsx("svg", {}, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      jsx(InfoColumn, {
        children: [
          jsx(InfoParagraph, {
            children: [
              jsx(Copyright_default, {
                name: config.name
              }, undefined, false, undefined, this),
              jsx("br", {}, undefined, false, undefined, this),
              t4("vat"),
              ": ",
              config.vatId
            ]
          }, undefined, true, undefined, this),
          jsx("nav", {
            children: jsx(LinksList2, {
              role: "list",
              children: [
                jsx("li", {
                  children: jsx(NavigationLink_default, {
                    to: `${homePath}legal`,
                    children: "Legal notice"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this),
                jsx("li", {
                  children: jsx(NavigationLink_default, {
                    to: `${homePath}privacy`,
                    children: "Privacy policy"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
});
var Footer_default = Footer;

// src/shared/layout/MobileMenu.jsx
init_esm();
init_esm2();
init_dist2();
init_dist3();

// src/shared/layout/MobileMenuBackground.jsx
init_esm();
init_esm2();

// node_modules/@dark-engine/animations/dist/esm/controller/controller.js
init_esm();

// node_modules/@dark-engine/animations/dist/esm/preset/preset.js
var preset = function(name) {
  return presets[name] || {};
};
var presets = {
  "no-wobble": { tension: 170, friction: 26 },
  gentle: { tension: 120, friction: 14 },
  wobbly: { tension: 180, friction: 12 },
  stiff: { tension: 210, friction: 20 },
  slow: { tension: 280, friction: 60 },
  molasses: { tension: 280, friction: 120 }
};

// node_modules/@dark-engine/animations/dist/esm/shared/shared.js
var defaultSpringConfig = {
  ...preset("no-wobble"),
  mass: 1,
  precision: 3,
  fix: 4
};

// node_modules/@dark-engine/animations/dist/esm/spring/spring.js
init_esm();

class Spring {
  props = {};
  subscribers = new Set;
  prop(key) {
    return this.props[key] ? this.props[key].get() : null;
  }
  prop$(key) {
    return this.props[key] || null;
  }
  setProp(key, value15) {
    !this.props[key] && (this.props[key] = atom(value15));
    this.props[key].set(value15);
  }
  value() {
    const value15 = Object.keys(this.props).reduce((acc, x4) => (acc[x4] = this.props[x4].get(), acc), {});
    return value15;
  }
  on(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  notify() {
    this.subscribers.forEach((x4) => x4(this.value()));
  }
}

// node_modules/@dark-engine/animations/dist/esm/utils/utils.js
var fix = (x4, precision = 4) => Number(x4.toFixed(precision));
var range = (x4) => Array(x4).fill(null).map((_4, idx) => idx);

// node_modules/@dark-engine/animations/dist/esm/stepper/stepper.js
var stepper = function(pos, vel, dest, step, config6) {
  const { tension, friction, mass, precision } = config6;
  const [nPos, nVel] = spring(pos, vel, dest, step, tension, friction, mass);
  if (Math.abs(nPos - dest) < 10 ** (-1 * precision))
    return [dest, 0];
  return [nPos, nVel];
};
var spring = function(pos, vel, dest, step, tension, friction, mass) {
  const disp = pos - dest;
  const sf = -1 * tension * disp;
  const df = -1 * friction * vel;
  const a4 = (sf + df) / mass;
  const nVel = vel + a4 * step;
  const nPos = pos + nVel * step;
  return [nPos, nVel];
};

// node_modules/@dark-engine/animations/dist/esm/controller/controller.js
var BASE_FRAME_TIME_IN_MS = 1000 / 60;
var MAX_SKIPPED_FRAMES = 10;
var MAX_DELTA_TIME_IN_SEC = MAX_SKIPPED_FRAMES * (BASE_FRAME_TIME_IN_MS / 1000);
var MIN_STEP = 0.01;

class Controller {
  key;
  idx;
  from;
  to;
  value;
  dest;
  state = null;
  frameTime;
  frameId;
  results = {};
  completed = {};
  queue = [];
  left = null;
  right = null;
  springConfigFn;
  configurator;
  immediate = falseFn;
  immediates = [];
  primaryKey;
  isReplaced = false;
  item = null;
  spring = new Spring;
  constructor(state) {
    this.state = state;
    this.key = String(++Controller.key);
  }
  getKey() {
    return this.key;
  }
  setKey(x4) {
    this.key = x4;
  }
  getIdx() {
    return this.idx;
  }
  setIdx(x4) {
    this.idx = x4;
  }
  setFrom(x4) {
    this.from = x4;
    this.value = this.value || { ...x4 };
  }
  setTo(x4) {
    this.to = x4 || { ...this.from };
    this.dest = this.dest || { ...x4 || this.from };
  }
  setSpringConfigFn(fn) {
    this.springConfigFn = fn ? (key) => ({ ...defaultSpringConfig, ...fn(key) }) : () => defaultSpringConfig;
  }
  setLeft(x4) {
    this.left = x4;
  }
  setRight(x4) {
    this.right = x4;
  }
  notify(skip = false) {
    this.sync();
    !skip && this.event("item-change");
  }
  setConfigurator(fn) {
    this.configurator = fn;
  }
  setImmediate(fn) {
    this.immediate = fn || this.immediate;
  }
  replaceValue(x4) {
    this.value = x4;
    this.sync();
  }
  markAsFake(x4) {
    this.primaryKey = x4;
    return Controller.generateFakeKey(x4);
  }
  detectIsFake() {
    return !detectIsUndefined(this.primaryKey);
  }
  getIsReplaced() {
    return this.isReplaced;
  }
  setIsReplaced(x4) {
    this.isReplaced = x4;
  }
  getItem() {
    return this.item;
  }
  setItem(x4) {
    this.item = x4;
  }
  getState() {
    return this.state;
  }
  getSpring() {
    this.sync();
    return this.spring;
  }
  start(fn) {
    if (this.state.getIsCanceled())
      return;
    const config1 = this.configurator(this.idx);
    const config22 = fn ? fn(this.idx) : this.configurator(this.idx);
    const from = { ...config1.from, ...config22.from };
    const to = { ...config1.to, ...config22.to };
    const config6 = config22.config || config1.config;
    const immediate = config22.immediate || config1.immediate;
    this.setFrom(config1.from || from);
    this.setTo(config1.to || to);
    this.setSpringConfigFn(config6);
    this.setImmediate(immediate);
    Object.assign(this.dest, to);
    this.play(this.dest);
  }
  reset() {
    this.value = { ...this.from };
    this.dest = { ...this.to || this.from };
    this.sync();
  }
  cancel() {
    this.frameId && platform.caf(this.frameId);
    this.frameId = null;
  }
  setIsPlaying(x4) {
    this.state.setIsPlaying(x4, this.key);
  }
  play(to) {
    this.queue.push(to);
    if (this.frameId)
      return false;
    this.setIsPlaying(true);
    this.event("item-start");
    this.motion(to);
  }
  motion(to) {
    const { value: value15, results, completed, springConfigFn } = this;
    const keys2 = Object.keys(value15);
    const make = () => this.motion(to);
    this.frameTime = getTime();
    this.frameId = platform.raf(() => {
      if (this.state.getIsPaused())
        return make();
      let step = (getTime() - this.frameTime) / 1000;
      if (step > MAX_DELTA_TIME_IN_SEC) {
        step = MIN_STEP;
      }
      if (this.queue.length === 0) {
        this.queue.push(this.dest);
      }
      for (const key of keys2) {
        if (this.immediate(key)) {
          completed[key] = true;
          const complete = () => {
            value15[key] = to[key];
            results[key] = [to[key], 0];
          };
          if (to[key] === this.from[key]) {
            this.immediates.push(complete);
          } else {
            complete();
          }
        } else {
          if (!results[key]) {
            results[key] = [value15[key], 0];
          }
          const config6 = springConfigFn(key);
          let pos = results[key][0];
          let vel = results[key][1];
          for (const update of this.queue) {
            const dest = update[key];
            [pos, vel] = stepper(pos, vel, dest, step, config6);
            results[key] = [pos, vel];
            completed[key] = pos === dest;
          }
          value15[key] = pos;
        }
      }
      this.queue = [];
      this.change();
      if (this.checkCompleted(keys2)) {
        this.complete();
      } else {
        make();
      }
    });
  }
  event(name) {
    this.state.event(name, { value: this.value, idx: this.idx, key: this.key });
  }
  change() {
    this.notify();
    if (this.state.getIsTrail()) {
      if (this.state.detectIsRightFlow()) {
        this.right && this.right.start(() => ({ to: this.value }));
      } else {
        this.left && this.left.start(() => ({ to: this.value }));
      }
    }
  }
  complete() {
    this.setIsPlaying(false);
    this.frameTime = null;
    this.frameId = null;
    this.results = {};
    this.completed = {};
    this.immediates.forEach((x4) => x4());
    this.immediates.length > 0 && this.notify();
    this.immediates = [];
    this.event("item-end");
    this.state.completeSeries();
  }
  checkCompleted(keys2) {
    for (const key of keys2) {
      if (!this.completed[key])
        return false;
    }
    return true;
  }
  sync() {
    const keys2 = Object.keys(this.value);
    for (const key of keys2) {
      const config6 = this.springConfigFn(key);
      const value15 = fix(this.value[key], config6.fix);
      this.spring.setProp(key, value15);
    }
    this.spring.notify();
  }
  static generateFakeKey(x4) {
    return `__${x4}:${++Controller.fakeKey}__`;
  }
  static key = -1;
  static fakeKey = -1;
}

// node_modules/@dark-engine/animations/dist/esm/state/state.js
init_esm();
var getSharedState = function() {
  const state = sharedState;
  sharedState = null;
  return state;
};

class SharedState {
  ctrls = [];
  stack = new Set;
  flow = Flow.RIGHT;
  isTrail = false;
  isPaused = false;
  isCanceled = false;
  timeout = 0;
  timerId = null;
  emitter = new EventEmitter;
  hasTransitions = false;
  setHasTransitions(x4) {
    this.hasTransitions = x4;
  }
  getCtrls() {
    return this.ctrls;
  }
  setCtrls(ctrls) {
    this.ctrls = ctrls;
  }
  setIsTrail(x4) {
    this.isTrail = x4;
  }
  getIsTrail() {
    return this.isTrail;
  }
  setFlow(x4) {
    this.flow = x4;
  }
  getIsPaused() {
    return this.isPaused;
  }
  getIsCanceled() {
    return this.isCanceled;
  }
  detectIsRightFlow() {
    return this.flow === Flow.RIGHT;
  }
  setIsPlaying(x4, key) {
    if (x4) {
      this.stack.add(key);
    } else {
      this.stack.delete(key);
    }
  }
  detectIsPlaying(key) {
    return detectIsEmpty(key) ? this.stack.size > 0 : this.stack.has(key);
  }
  start(fn) {
    this.defer(() => {
      if (this.ctrls.length === 0)
        return;
      this.event("series-start");
      if (this.isTrail) {
        const ctrl = this.flow === Flow.RIGHT ? this.ctrls[0] : this.ctrls[this.ctrls.length - 1];
        ctrl.start(fn);
      } else {
        this.ctrls.forEach((x4) => x4.start(fn));
      }
    });
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
  }
  delay(timeout) {
    this.timeout = timeout;
  }
  reset() {
    this.ctrls.forEach((x4) => x4.reset());
  }
  cancel() {
    this.ctrls.forEach((x4) => x4.cancel());
    this.resetTimer();
    this.isCanceled = true;
  }
  on(event, handler) {
    return this.emitter.on(event, handler);
  }
  event(event, value15 = null) {
    this.emitter.emit(event, value15);
  }
  completeSeries() {
    const isCompleted = !this.detectIsPlaying();
    isCompleted && !this.hasTransitions && this.event("series-end");
  }
  defer(fn) {
    this.resetTimer();
    if (this.timeout > 0) {
      this.timerId = setTimeout(() => {
        this.timerId = null;
        fn();
      }, this.timeout);
    } else {
      fn();
    }
  }
  resetTimer() {
    this.timerId && clearTimeout(this.timerId);
    this.timerId = null;
  }
}
var Flow;
(function(Flow2) {
  Flow2["RIGHT"] = "RIGHT";
  Flow2["LEFT"] = "LEFT";
})(Flow || (Flow = {}));
var sharedState = null;

// node_modules/@dark-engine/animations/dist/esm/use-springs/use-springs.js
init_esm();
var useSprings = function(count, configurator, deps = []) {
  const state2 = useMemo(() => getSharedState() || new SharedState, []);
  const scope15 = useMemo(() => {
    return {
      configurator,
      prevCount: count,
      ctrls: range(count).map(() => new Controller(state2)),
      inChain: false,
      pending: null
    };
  }, []);
  scope15.configurator = configurator;
  const springs = useMemo(() => {
    const configurator2 = (idx) => scope15.configurator(idx);
    const { ctrls, prevCount } = scope15;
    if (count > prevCount) {
      ctrls.push(...range(count - prevCount).map(() => new Controller(state2)));
    } else if (count < prevCount) {
      const deleted = ctrls.splice(count, ctrls.length);
      deleted.forEach((ctrl) => ctrl.setIsPlaying(false));
    }
    state2.setCtrls(ctrls);
    scope15.prevCount = count;
    prepare(ctrls, configurator2);
    return ctrls.map((ctrl) => ctrl.getSpring());
  }, [count]);
  const api4 = useMemo(() => {
    return {
      marker: "spring-api",
      start: (fn) => {
        if (scope15.inChain) {
          scope15.pending && scope15.pending();
          scope15.pending = null;
        } else {
          state2.start(fn);
        }
      },
      chain: (value15) => scope15.inChain = value15,
      delay: state2.delay.bind(state2),
      pause: state2.pause.bind(state2),
      resume: state2.resume.bind(state2),
      reset: state2.reset.bind(state2),
      cancel: state2.cancel.bind(state2),
      on: state2.on.bind(state2),
      isCanceled: state2.getIsCanceled.bind(state2)
    };
  }, []);
  useLayoutEffect(() => {
    if (deps.length === 0)
      return;
    const { inChain } = scope15;
    if (inChain) {
      scope15.pending = () => state2.start();
    } else {
      state2.start();
    }
  }, [...deps]);
  useLayoutEffect(() => () => api4.cancel(), []);
  return [springs, api4];
};
var prepare = function(ctrls, configurator) {
  ctrls.forEach((ctrl, idx) => {
    const { from, to, config: config6 } = configurator(idx);
    const left = ctrls[idx - 1] || null;
    const right = ctrls[idx + 1] || null;
    ctrl.setIdx(idx);
    ctrl.setFrom(from);
    ctrl.setTo(to);
    ctrl.setSpringConfigFn(config6);
    ctrl.setConfigurator(configurator);
    ctrl.setLeft(left);
    ctrl.setRight(right);
  });
};

// node_modules/@dark-engine/animations/dist/esm/use-spring/use-spring.js
var useSpring = function(options, deps) {
  const [items, api4] = useSprings(1, () => options, deps);
  return [items[0], api4];
};

// node_modules/@dark-engine/animations/dist/esm/animated/animated.js
init_esm();
var Animated = component(({ spring: spring3, fn, slot }) => {
  const cursor = useCursor();
  const { isHydration } = useSSR();
  const scope15 = useMemo(() => ({ element: null, notify: null }), []);
  const notify = () => scope15.element && fn(scope15.element, spring3.value());
  scope15.notify = notify;
  useInsertionEffect(() => {
    const make = () => {
      const fiber6 = cursor.hook.owner;
      walk(fiber6.child, (fiber7, _4, stop) => {
        if (fiber7.element) {
          scope15.element = fiber7.element;
          return stop();
        }
      });
      notify();
    };
    if (isHydration) {
      nextTick(make);
    } else {
      make();
    }
    return spring3.on(() => scope15.notify());
  }, [spring3]);
  notify();
  return slot;
}, { displayName: "Animated" });

// src/shared/layout/MobileMenuBackground.jsx
init_dist3();

// src/shared/utils/animations.js
var getPrefersReducedMotion = () => {
  if (detectIsBrowser()) {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return true;
};

// src/shared/layout/MobileMenuBackground.jsx
init_jsx_runtime();
var MobileMenuBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${(props) => props.theme.backgroundSecondary};
  z-index: ${(props) => props.theme.zMobileMenuBackground};
`;
var styleFn = (e4, v4) => e4.style.setProperty("transform", `translateY(-${v4.transform}%)`);
var MobileMenuBackgroundTransition = component(({ slot, isLeaving, closeMobileMenu, leaveDelay }) => {
  const prefersReducedMotion = getPrefersReducedMotion();
  const enteringStyles = {
    from: { transform: 100 },
    to: { transform: 0 }
  };
  const leavingStyles = {
    from: { transform: 0 },
    to: { transform: 100 }
  };
  const [spring3, api4] = useSpring({
    ...m3(isLeaving, leavingStyles, enteringStyles),
    config: () => preset("slow"),
    immediate: () => prefersReducedMotion
  }, [isLeaving]);
  const delay = m3(isLeaving, leaveDelay, 0);
  if (detectIsNumber(delay)) {
    api4.delay(delay);
  } else {
    api4.delay(0);
  }
  useEffect(() => {
    const itemEndOff = api4.on("item-end", () => {
      if (isLeaving) {
        closeMobileMenu();
      }
    });
    return () => {
      itemEndOff();
    };
  }, [isLeaving]);
  return jsx(Animated, {
    spring: spring3,
    fn: styleFn,
    children: jsx(MobileMenuBackground, {
      children: slot
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
});
var MobileMenuBackground_default = MobileMenuBackgroundTransition;

// src/shared/layout/MobileMenuForegroundTransition.jsx
init_esm();
init_esm2();
init_dist3();
init_jsx_runtime();
var Wrapper = styled.div`
  overflow: hidden;
`;
var styleFn2 = (e4, v4) => e4.style.setProperty("transform", `translateY(-${v4.transform}%)`);
var MobileMenuForeground = component(({ slot, isOpen, isLeaving, enterDelay, leaveDelay }) => {
  const prefersReducedMotion = getPrefersReducedMotion();
  const leavingConfig = {
    from: { transform: 0 },
    to: { transform: 100 }
  };
  const enteringConfig = {
    from: { transform: 100 },
    to: { transform: 0 }
  };
  const leaving = isOpen === true && isLeaving === true;
  const [spring3, api4] = useSpring({
    ...m3(isOpen === true && isLeaving === true, leavingConfig, enteringConfig),
    immediate: () => prefersReducedMotion
  }, [leaving]);
  const delay = m3(leaving === true, leaveDelay, enterDelay);
  if (detectIsNumber(delay)) {
    api4.delay(delay);
  } else {
    api4.delay(0);
  }
  return jsx(Wrapper, {
    children: jsx(Animated, {
      spring: spring3,
      fn: styleFn2,
      children: jsx("div", {
        children: slot
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
});
var MobileMenuForegroundTransition_default = MobileMenuForeground;

// src/shared/layout/MobileMenu.jsx
init_jsx_runtime();
var MobileMenuForeground2 = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${(props) => props.theme.zMobileMenuForeground};
`;
var MobileMenuTop = styled.div`
  height: ${(props) => props.theme.headerHeightMobile};
  display: flex;
  padding: 0 4vw;
  justify-content: space-between;
  align-items: center;
`;
var MobileMenuButtonWrapper = styled.div`
  overflow: hidden;
`;
var Logo2 = styled.div`
  opacity: ${(props) => m3(props.$isLeaving, "0", "1")};
  transition: ${(props) => m3(props.$delay, `opacity .5s ${props.$delay}`, "opacity .15s")};
`;
var MobileMenuButton2 = styled.button`
  display: block;
  border: none;
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.foregroundPrimary};
  text-transform: uppercase;
  background-color: transparent;
`;
var MobileMenuContent = styled.nav`
  height: ${(props) => `calc(100svh - ${props.theme.headerHeightMobile} - 3rem)`};
  flex-direction: column;
  justify-content: center;
  padding: 0 4vw;
`;
var LinksListWrapper = styled.div`
  padding: 8rem 0;
`;
var LinksList3 = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
var MobileMenuLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => m3(props.$active, props.theme.foregroundTertiary, props.theme.foregroundPrimary)};
  text-transform: uppercase;
  font-size: 350%;
  line-height: 1.1;
`;
var MobileMenuBottom = styled.div`
  height: 3rem;
  padding: 0 4vw;
`;
var Tagline = styled.span`
`;
var MobileMenuLinks = component(({ links, isOpen, isLeaving, pathname }) => {
  const firstLeaveDelay = 100;
  const delayIncrement = 50;
  const firstEnterDelay = 100;
  const res = [];
  for (let i3 = 0, len = links.length;i3 < len; i3++) {
    const link2 = links[i3];
    const enterDelay = firstEnterDelay + delayIncrement * (i3 + 1);
    const leaveDelay = firstLeaveDelay + delayIncrement * (len - i3 - 1);
    res.push(jsx("li", {
      children: jsx(MobileMenuForegroundTransition_default, {
        isOpen,
        isLeaving,
        enterDelay,
        leaveDelay,
        children: jsx(MobileMenuLink, {
          $active: pathname === link2.path,
          to: link2.path,
          children: link2.name
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    }, links.path, false, undefined, this));
  }
  return jsx(LinksList3, {
    role: "list",
    children: res
  }, undefined, false, undefined, this);
});
var MobileMenu = component(({ isOpen, closeMobileMenu }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const handleLeave = () => {
    setIsLeaving(true);
  };
  if (isOpen === false) {
    if (isLeaving === true) {
      setIsLeaving(false);
    }
    return null;
  }
  const { t: t4 } = R("mobileMenu");
  const { pathname } = useLocation();
  const currentLanguage = getLanguageFromPathname(pathname);
  const homePath = getHomePath(currentLanguage);
  const links = [
    {
      path: homePath,
      name: t4("home")
    }
  ];
  return jsx(Fragment, {
    children: [
      jsx(MobileMenuBackground_default, {
        isLeaving,
        closeMobileMenu,
        leaveDelay: 100
      }, undefined, false, undefined, this),
      jsx(MobileMenuForeground2, {
        children: [
          jsx(MobileMenuTop, {
            children: [
              jsx(Logo2, {
                $isLeaving: isLeaving,
                $delay: ".30s",
                children: jsx(Link, {
                  to: homePath,
                  children: config.name
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              jsx(MobileMenuButtonWrapper, {
                children: jsx(MobileMenuForegroundTransition_default, {
                  isOpen,
                  isLeaving,
                  leaveDelay: 400,
                  children: jsx(MobileMenuButton2, {
                    onClick: handleLeave,
                    children: t4("closeMenu")
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          jsx(MobileMenuContent, {
            children: [
              jsx(LinksListWrapper, {
                children: jsx(MobileMenuLinks, {
                  links,
                  isOpen,
                  isLeaving,
                  pathname
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              jsx(MobileMenuForegroundTransition_default, {
                isOpen,
                isLeaving,
                enterDelay: 400,
                leaveDelay: 50,
                children: jsx(LanguageSelector_default, {}, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          jsx(MobileMenuBottom, {
            children: jsx(MobileMenuForegroundTransition_default, {
              isOpen,
              isLeaving,
              enterDelay: 500,
              children: jsx(Tagline, {
                children: config.tagline
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
});
var MobileMenu_default = MobileMenu;

// src/shared/layout/AppLayout.jsx
init_jsx_runtime();
var StyledMain = styled.main`
  margin: ${(props) => `${props.theme.headerHeightMobile} 0 0`};
  ${(props) => css`
    @media (min-width: ${props.theme.sm}) {
      margin: ${props.theme.headerHeight} 0 0;
    }
  `}
`;
var StyledSmoothScrollingProvider = styled(Dh)`
  position: absolute;
  inset: 0;
  overflow-y: auto;
  pointer-events: ${(props) => m3(props.$mobileMenuIsOpen, "none", "auto")};
`;
var AppLayout = component(({ slot }) => {
  const scrollRef = useRef(null);
  const { ref: ref7, inView } = I2();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const openMobileMenu = () => setMobileMenuIsOpen(true);
  const closeMobileMenu = () => setMobileMenuIsOpen(false);
  return jsx(Fragment, {
    children: [
      jsx(Header_default, {
        scrollRef,
        footerInView: inView,
        openMobileMenu,
        children: jsx(MobileMenu_default, {
          isOpen: mobileMenuIsOpen,
          closeMobileMenu
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      jsx(StyledSmoothScrollingProvider, {
        wrapperRef: scrollRef,
        $mobileMenuIsOpen: mobileMenuIsOpen,
        children: [
          jsx(StyledMain, {
            children: slot
          }, undefined, false, undefined, this),
          jsx(Footer_default, {
            inViewRef: ref7
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
});
var AppLayout_default = AppLayout;

// src/shared/layout/Root.jsx
init_jsx_runtime();
var Root = component(({ slot }) => {
  return jsx(Theme_default, {
    children: [
      jsx(ChangeTitle_default, {}, undefined, false, undefined, this),
      jsx(AppLayout_default, {
        children: slot
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
});
var Root_default = Root;

// src/shared/routes/generation.js
var generateRoutes = function(baseRoutes3) {
  const alternateLanguageRoutes = [];
  const notFound = {
    path: "**",
    redirectTo: "not-found"
  };
  for (let i3 = 1, len = languages.length;i3 < len; i3++) {
    const language = languages[i3];
    alternateLanguageRoutes.push({
      path: language,
      component: Fragment,
      children: [
        ...baseRoutes3,
        notFound
      ]
    });
  }
  return [
    {
      path: "/",
      component: Root_default,
      children: [
        ...baseRoutes3,
        ...alternateLanguageRoutes,
        notFound
      ]
    }
  ];
};
var routes5 = generateRoutes(baseRoutes);
// src/shared/components/App.jsx
init_jsx_runtime();
var App = component(({ currentPath, translator, api: api4 }) => {
  const client = useMemo(() => {
    return new DataClient({ api: api4, cache: new InMemoryCache });
  }, []);
  return jsx(A3, {
    children: jsx(r, {
      translator,
      children: jsx(DataClientProvider, {
        client,
        children: jsx(Router, {
          routes: routes5,
          url: currentPath,
          children: (slot) => slot
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
});
var App_default = App;

// src/server/components/Page.jsx
init_esm();
init_jsx_runtime();
var Page = component(({ currentLanguage, title }) => {
  return jsx("html", {
    lang: currentLanguage,
    children: [
      jsx("head", {
        children: [
          jsx("meta", {
            charset: "UTF-8"
          }, undefined, false, undefined, this),
          jsx("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          }, undefined, false, undefined, this),
          jsx("base", {
            href: "/"
          }, undefined, false, undefined, this),
          jsx("title", {
            children: title
          }, undefined, false, undefined, this),
          jsx("link", {
            rel: "shortcut icon",
            href: "/favicon.ico"
          }, undefined, false, undefined, this),
          jsx("script", {
            type: "module",
            src: "/_allanite/index.js",
            defer: true
          }, undefined, false, undefined, this),
          "___styleTags"
        ]
      }, undefined, true, undefined, this),
      jsx("body", {
        children: jsx("div", {
          id: "dark-root",
          children: "___app"
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
});
var Page_default = Page;

// src/server/handlers/dark.js
init_jsx_runtime();
function dark(elysiaContext) {
  if (elysiaContext.path === "/") {
    return darkResponse(elysiaContext);
  }
  const absolutePath = join3(process.cwd(), "build/browser", elysiaContext.path);
  const file = Bun.file(absolutePath);
  if (file.size === 0) {
    return darkResponse(elysiaContext);
  }
  return file;
}
var renderApp = async (currentPath, translator) => {
  const sheet = new ServerStyleSheet;
  const app = await renderToString(sheet.collectStyles(jsx(App_default, {
    currentPath,
    translator,
    api: api3
  }, undefined, false, undefined, this)));
  const styleTags = sheet.getStyleTags();
  sheet.seal();
  return { app, styleTags };
};
var renderPage = async (currentLanguage, title) => {
  return await renderToString(jsx(Page_default, {
    currentLanguage,
    title
  }, undefined, false, undefined, this));
};
var darkResponse = async (elysiaContext) => {
  const currentPath = elysiaContext.path;
  const currentLanguage = getLanguageFromPathname(currentPath);
  const messages = getMessagesSync(currentLanguage);
  const translator = new b(currentLanguage, messages);
  const title = getTitleFromPathname(currentPath);
  try {
    const { app, styleTags } = await renderApp(currentPath, translator);
    const page = await renderPage(currentPath, currentLanguage, title);
    const body = `<!DOCTYPE html>${page.replace("___app", app).replace("___styleTags", styleTags)}`;
    elysiaContext.set.headers["Content-Type"] = "text/html;charset=utf-8";
    return body;
  } catch (err) {
    console.error(err);
  }
};

// src/server/index.jsx
new X0().get("*", (ctx) => dark(ctx)).on("start", () => console.log(`Running storefront on port ${"12000"}`)).listen("12000");
