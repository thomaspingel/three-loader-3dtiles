import { CanvasTexture, LinearFilter, RepeatWrapping, Frustum, Matrix4 as Matrix4$1, Group, PlaneGeometry, Vector3 as Vector3$1, MeshBasicMaterial, DoubleSide, Mesh, ArrowHelper, Color, Vector2 as Vector2$1, ShaderMaterial } from 'three';

function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
        e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
            if (k !== 'default' && !(k in n)) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    });
    return Object.freeze(n);
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function assert$7(condition, message) {
  if (!condition) {
    throw new Error(message || 'loader assertion failed.');
  }
}

const isBrowser$2 = Boolean(typeof process !== 'object' || String(process) !== '[object process]' || process.browser);
const matches$1 = typeof process !== 'undefined' && process.version && /v([0-9]*)/.exec(process.version);
matches$1 && parseFloat(matches$1[1]) || 0;

const VERSION$9 = "3.2.13" ;

function assert$6(condition, message) {
  if (!condition) {
    throw new Error(message || 'loaders.gl assertion failed.');
  }
}

const globals$1 = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document
};
const global_ = globals$1.global || globals$1.self || globals$1.window || {};
const isBrowser$1 = typeof process !== 'object' || String(process) !== '[object process]' || process.browser;
const isWorker = typeof importScripts === 'function';
const isMobile = typeof window !== 'undefined' && typeof window.orientation !== 'undefined';
const matches = typeof process !== 'undefined' && process.version && /v([0-9]*)/.exec(process.version);
matches && parseFloat(matches[1]) || 0;

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class WorkerJob {
  constructor(jobName, workerThread) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "workerThread", void 0);

    _defineProperty(this, "isRunning", true);

    _defineProperty(this, "result", void 0);

    _defineProperty(this, "_resolve", () => {});

    _defineProperty(this, "_reject", () => {});

    this.name = jobName;
    this.workerThread = workerThread;
    this.result = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  postMessage(type, payload) {
    this.workerThread.postMessage({
      source: 'loaders.gl',
      type,
      payload
    });
  }

  done(value) {
    assert$6(this.isRunning);
    this.isRunning = false;

    this._resolve(value);
  }

  error(error) {
    assert$6(this.isRunning);
    this.isRunning = false;

    this._reject(error);
  }

}

class Worker$1 {}

const workerURLCache = new Map();
function getLoadableWorkerURL(props) {
  assert$6(props.source && !props.url || !props.source && props.url);
  let workerURL = workerURLCache.get(props.source || props.url);

  if (!workerURL) {
    if (props.url) {
      workerURL = getLoadableWorkerURLFromURL(props.url);
      workerURLCache.set(props.url, workerURL);
    }

    if (props.source) {
      workerURL = getLoadableWorkerURLFromSource(props.source);
      workerURLCache.set(props.source, workerURL);
    }
  }

  assert$6(workerURL);
  return workerURL;
}

function getLoadableWorkerURLFromURL(url) {
  if (!url.startsWith('http')) {
    return url;
  }

  const workerSource = buildScriptSource(url);
  return getLoadableWorkerURLFromSource(workerSource);
}

function getLoadableWorkerURLFromSource(workerSource) {
  const blob = new Blob([workerSource], {
    type: 'application/javascript'
  });
  return URL.createObjectURL(blob);
}

function buildScriptSource(workerUrl) {
  return "try {\n  importScripts('".concat(workerUrl, "');\n} catch (error) {\n  console.error(error);\n  throw error;\n}");
}

function getTransferList(object, recursive = true, transfers) {
  const transfersSet = transfers || new Set();

  if (!object) ; else if (isTransferable(object)) {
    transfersSet.add(object);
  } else if (isTransferable(object.buffer)) {
    transfersSet.add(object.buffer);
  } else if (ArrayBuffer.isView(object)) ; else if (recursive && typeof object === 'object') {
    for (const key in object) {
      getTransferList(object[key], recursive, transfersSet);
    }
  }

  return transfers === undefined ? Array.from(transfersSet) : [];
}

function isTransferable(object) {
  if (!object) {
    return false;
  }

  if (object instanceof ArrayBuffer) {
    return true;
  }

  if (typeof MessagePort !== 'undefined' && object instanceof MessagePort) {
    return true;
  }

  if (typeof ImageBitmap !== 'undefined' && object instanceof ImageBitmap) {
    return true;
  }

  if (typeof OffscreenCanvas !== 'undefined' && object instanceof OffscreenCanvas) {
    return true;
  }

  return false;
}

const NOOP = () => {};

class WorkerThread {
  static isSupported() {
    return typeof Worker !== 'undefined' && isBrowser$1 || typeof Worker$1 !== 'undefined' && !isBrowser$1;
  }

  constructor(props) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "url", void 0);

    _defineProperty(this, "terminated", false);

    _defineProperty(this, "worker", void 0);

    _defineProperty(this, "onMessage", void 0);

    _defineProperty(this, "onError", void 0);

    _defineProperty(this, "_loadableURL", '');

    const {
      name,
      source,
      url
    } = props;
    assert$6(source || url);
    this.name = name;
    this.source = source;
    this.url = url;
    this.onMessage = NOOP;

    this.onError = error => console.log(error);

    this.worker = isBrowser$1 ? this._createBrowserWorker() : this._createNodeWorker();
  }

  destroy() {
    this.onMessage = NOOP;
    this.onError = NOOP;
    this.worker.terminate();
    this.terminated = true;
  }

  get isRunning() {
    return Boolean(this.onMessage);
  }

  postMessage(data, transferList) {
    transferList = transferList || getTransferList(data);
    this.worker.postMessage(data, transferList);
  }

  _getErrorFromErrorEvent(event) {
    let message = 'Failed to load ';
    message += "worker ".concat(this.name, " from ").concat(this.url, ". ");

    if (event.message) {
      message += "".concat(event.message, " in ");
    }

    if (event.lineno) {
      message += ":".concat(event.lineno, ":").concat(event.colno);
    }

    return new Error(message);
  }

  _createBrowserWorker() {
    this._loadableURL = getLoadableWorkerURL({
      source: this.source,
      url: this.url
    });
    const worker = new Worker(this._loadableURL, {
      name: this.name
    });

    worker.onmessage = event => {
      if (!event.data) {
        this.onError(new Error('No data received'));
      } else {
        this.onMessage(event.data);
      }
    };

    worker.onerror = error => {
      this.onError(this._getErrorFromErrorEvent(error));
      this.terminated = true;
    };

    worker.onmessageerror = event => console.error(event);

    return worker;
  }

  _createNodeWorker() {
    let worker;

    if (this.url) {
      const absolute = this.url.includes(':/') || this.url.startsWith('/');
      const url = absolute ? this.url : "./".concat(this.url);
      worker = new Worker$1(url, {
        eval: false
      });
    } else if (this.source) {
      worker = new Worker$1(this.source, {
        eval: true
      });
    } else {
      throw new Error('no worker');
    }

    worker.on('message', data => {
      this.onMessage(data);
    });
    worker.on('error', error => {
      this.onError(error);
    });
    worker.on('exit', code => {});
    return worker;
  }

}

class WorkerPool {
  static isSupported() {
    return WorkerThread.isSupported();
  }

  constructor(props) {
    _defineProperty(this, "name", 'unnamed');

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "url", void 0);

    _defineProperty(this, "maxConcurrency", 1);

    _defineProperty(this, "maxMobileConcurrency", 1);

    _defineProperty(this, "onDebug", () => {});

    _defineProperty(this, "reuseWorkers", true);

    _defineProperty(this, "props", {});

    _defineProperty(this, "jobQueue", []);

    _defineProperty(this, "idleQueue", []);

    _defineProperty(this, "count", 0);

    _defineProperty(this, "isDestroyed", false);

    this.source = props.source;
    this.url = props.url;
    this.setProps(props);
  }

  destroy() {
    this.idleQueue.forEach(worker => worker.destroy());
    this.isDestroyed = true;
  }

  setProps(props) {
    this.props = { ...this.props,
      ...props
    };

    if (props.name !== undefined) {
      this.name = props.name;
    }

    if (props.maxConcurrency !== undefined) {
      this.maxConcurrency = props.maxConcurrency;
    }

    if (props.maxMobileConcurrency !== undefined) {
      this.maxMobileConcurrency = props.maxMobileConcurrency;
    }

    if (props.reuseWorkers !== undefined) {
      this.reuseWorkers = props.reuseWorkers;
    }

    if (props.onDebug !== undefined) {
      this.onDebug = props.onDebug;
    }
  }

  async startJob(name, onMessage = (job, type, data) => job.done(data), onError = (job, error) => job.error(error)) {
    const startPromise = new Promise(onStart => {
      this.jobQueue.push({
        name,
        onMessage,
        onError,
        onStart
      });
      return this;
    });

    this._startQueuedJob();

    return await startPromise;
  }

  async _startQueuedJob() {
    if (!this.jobQueue.length) {
      return;
    }

    const workerThread = this._getAvailableWorker();

    if (!workerThread) {
      return;
    }

    const queuedJob = this.jobQueue.shift();

    if (queuedJob) {
      this.onDebug({
        message: 'Starting job',
        name: queuedJob.name,
        workerThread,
        backlog: this.jobQueue.length
      });
      const job = new WorkerJob(queuedJob.name, workerThread);

      workerThread.onMessage = data => queuedJob.onMessage(job, data.type, data.payload);

      workerThread.onError = error => queuedJob.onError(job, error);

      queuedJob.onStart(job);

      try {
        await job.result;
      } finally {
        this.returnWorkerToQueue(workerThread);
      }
    }
  }

  returnWorkerToQueue(worker) {
    const shouldDestroyWorker = this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency();

    if (shouldDestroyWorker) {
      worker.destroy();
      this.count--;
    } else {
      this.idleQueue.push(worker);
    }

    if (!this.isDestroyed) {
      this._startQueuedJob();
    }
  }

  _getAvailableWorker() {
    if (this.idleQueue.length > 0) {
      return this.idleQueue.shift() || null;
    }

    if (this.count < this._getMaxConcurrency()) {
      this.count++;
      const name = "".concat(this.name.toLowerCase(), " (#").concat(this.count, " of ").concat(this.maxConcurrency, ")");
      return new WorkerThread({
        name,
        source: this.source,
        url: this.url
      });
    }

    return null;
  }

  _getMaxConcurrency() {
    return isMobile ? this.maxMobileConcurrency : this.maxConcurrency;
  }

}

const DEFAULT_PROPS = {
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: true,
  onDebug: () => {}
};
class WorkerFarm {
  static isSupported() {
    return WorkerThread.isSupported();
  }

  static getWorkerFarm(props = {}) {
    WorkerFarm._workerFarm = WorkerFarm._workerFarm || new WorkerFarm({});

    WorkerFarm._workerFarm.setProps(props);

    return WorkerFarm._workerFarm;
  }

  constructor(props) {
    _defineProperty(this, "props", void 0);

    _defineProperty(this, "workerPools", new Map());

    this.props = { ...DEFAULT_PROPS
    };
    this.setProps(props);
    this.workerPools = new Map();
  }

  destroy() {
    for (const workerPool of this.workerPools.values()) {
      workerPool.destroy();
    }

    this.workerPools = new Map();
  }

  setProps(props) {
    this.props = { ...this.props,
      ...props
    };

    for (const workerPool of this.workerPools.values()) {
      workerPool.setProps(this._getWorkerPoolProps());
    }
  }

  getWorkerPool(options) {
    const {
      name,
      source,
      url
    } = options;
    let workerPool = this.workerPools.get(name);

    if (!workerPool) {
      workerPool = new WorkerPool({
        name,
        source,
        url
      });
      workerPool.setProps(this._getWorkerPoolProps());
      this.workerPools.set(name, workerPool);
    }

    return workerPool;
  }

  _getWorkerPoolProps() {
    return {
      maxConcurrency: this.props.maxConcurrency,
      maxMobileConcurrency: this.props.maxMobileConcurrency,
      reuseWorkers: this.props.reuseWorkers,
      onDebug: this.props.onDebug
    };
  }

}

_defineProperty(WorkerFarm, "_workerFarm", void 0);

const NPM_TAG = 'latest';
function getWorkerURL(worker, options = {}) {
  const workerOptions = options[worker.id] || {};
  const workerFile = "".concat(worker.id, "-worker.js");
  let url = workerOptions.workerUrl;

  if (!url && worker.id === 'compression') {
    url = options.workerUrl;
  }

  if (options._workerType === 'test') {
    url = "modules/".concat(worker.module, "/dist/").concat(workerFile);
  }

  if (!url) {
    let version = worker.version;

    if (version === 'latest') {
      version = NPM_TAG;
    }

    const versionTag = version ? "@".concat(version) : '';
    url = "https://unpkg.com/@loaders.gl/".concat(worker.module).concat(versionTag, "/dist/").concat(workerFile);
  }

  assert$6(url);
  return url;
}

function validateWorkerVersion(worker, coreVersion = VERSION$9) {
  assert$6(worker, 'no worker provided');
  const workerVersion = worker.version;

  if (!coreVersion || !workerVersion) {
    return false;
  }

  return true;
}

var ChildProcessProxy = {};

var node = /*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    'default': ChildProcessProxy
}, [ChildProcessProxy]);

const VERSION$8 = "3.2.13" ;
const loadLibraryPromises = {};
async function loadLibrary(libraryUrl, moduleName = null, options = {}) {
  if (moduleName) {
    libraryUrl = getLibraryUrl(libraryUrl, moduleName, options);
  }

  loadLibraryPromises[libraryUrl] = loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
  return await loadLibraryPromises[libraryUrl];
}
function getLibraryUrl(library, moduleName, options) {
  if (library.startsWith('http')) {
    return library;
  }

  const modules = options.modules || {};

  if (modules[library]) {
    return modules[library];
  }

  if (!isBrowser$1) {
    return "modules/".concat(moduleName, "/dist/libs/").concat(library);
  }

  if (options.CDN) {
    assert$6(options.CDN.startsWith('http'));
    return "".concat(options.CDN, "/").concat(moduleName, "@").concat(VERSION$8, "/dist/libs/").concat(library);
  }

  if (isWorker) {
    return "../src/libs/".concat(library);
  }

  return "modules/".concat(moduleName, "/src/libs/").concat(library);
}

async function loadLibraryFromFile(libraryUrl) {
  if (libraryUrl.endsWith('wasm')) {
    const response = await fetch(libraryUrl);
    return await response.arrayBuffer();
  }

  if (!isBrowser$1) {
    try {
      return node && ChildProcessProxy.requireFromFile && (await ChildProcessProxy.requireFromFile(libraryUrl));
    } catch {
      return null;
    }
  }

  if (isWorker) {
    return importScripts(libraryUrl);
  }

  const response = await fetch(libraryUrl);
  const scriptSource = await response.text();
  return loadLibraryFromString(scriptSource, libraryUrl);
}

function loadLibraryFromString(scriptSource, id) {
  if (!isBrowser$1) {
    return ChildProcessProxy.requireFromString && ChildProcessProxy.requireFromString(scriptSource, id);
  }

  if (isWorker) {
    eval.call(global_, scriptSource);
    return null;
  }

  const script = document.createElement('script');
  script.id = id;

  try {
    script.appendChild(document.createTextNode(scriptSource));
  } catch (e) {
    script.text = scriptSource;
  }

  document.body.appendChild(script);
  return null;
}

function canParseWithWorker(loader, options) {
  if (!WorkerFarm.isSupported()) {
    return false;
  }

  if (!isBrowser$1 && !(options !== null && options !== void 0 && options._nodeWorkers)) {
    return false;
  }

  return loader.worker && (options === null || options === void 0 ? void 0 : options.worker);
}
async function parseWithWorker(loader, data, options, context, parseOnMainThread) {
  const name = loader.id;
  const url = getWorkerURL(loader, options);
  const workerFarm = WorkerFarm.getWorkerFarm(options);
  const workerPool = workerFarm.getWorkerPool({
    name,
    url
  });
  options = JSON.parse(JSON.stringify(options));
  context = JSON.parse(JSON.stringify(context || {}));
  const job = await workerPool.startJob('process-on-worker', onMessage.bind(null, parseOnMainThread));
  job.postMessage('process', {
    input: data,
    options,
    context
  });
  const result = await job.result;
  return await result.result;
}

async function onMessage(parseOnMainThread, job, type, payload) {
  switch (type) {
    case 'done':
      job.done(payload);
      break;

    case 'error':
      job.error(new Error(payload.error));
      break;

    case 'process':
      const {
        id,
        input,
        options
      } = payload;

      try {
        const result = await parseOnMainThread(input, options);
        job.postMessage('done', {
          id,
          result
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';
        job.postMessage('error', {
          id,
          error: message
        });
      }

      break;

    default:
      console.warn("parse-with-worker unknown message ".concat(type));
  }
}

function getFirstCharacters$1(data, length = 5) {
  if (typeof data === 'string') {
    return data.slice(0, length);
  } else if (ArrayBuffer.isView(data)) {
    return getMagicString$3(data.buffer, data.byteOffset, length);
  } else if (data instanceof ArrayBuffer) {
    const byteOffset = 0;
    return getMagicString$3(data, byteOffset, length);
  }

  return '';
}
function getMagicString$3(arrayBuffer, byteOffset, length) {
  if (arrayBuffer.byteLength <= byteOffset + length) {
    return '';
  }

  const dataView = new DataView(arrayBuffer);
  let magic = '';

  for (let i = 0; i < length; i++) {
    magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
  }

  return magic;
}

function parseJSON(string) {
  try {
    return JSON.parse(string);
  } catch (_) {
    throw new Error("Failed to parse JSON from data starting with \"".concat(getFirstCharacters$1(string), "\""));
  }
}

function isBuffer$1(value) {
  return value && typeof value === 'object' && value.isBuffer;
}
function bufferToArrayBuffer(buffer) {
  if (isBuffer$1(buffer)) {
    const typedArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
    return typedArray.slice().buffer;
  }

  return buffer;
}

function toArrayBuffer(data) {
  if (isBuffer$1(data)) {
    return bufferToArrayBuffer(data);
  }

  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {
      return data.buffer;
    }

    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }

  if (typeof data === 'string') {
    const text = data;
    const uint8Array = new TextEncoder().encode(text);
    return uint8Array.buffer;
  }

  if (data && typeof data === 'object' && data._toArrayBuffer) {
    return data._toArrayBuffer();
  }

  throw new Error('toArrayBuffer');
}
function compareArrayBuffers(arrayBuffer1, arrayBuffer2, byteLength) {
  byteLength = byteLength || arrayBuffer1.byteLength;

  if (arrayBuffer1.byteLength < byteLength || arrayBuffer2.byteLength < byteLength) {
    return false;
  }

  const array1 = new Uint8Array(arrayBuffer1);
  const array2 = new Uint8Array(arrayBuffer2);

  for (let i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
function concatenateArrayBuffers(...sources) {
  const sourceArrays = sources.map(source2 => source2 instanceof ArrayBuffer ? new Uint8Array(source2) : source2);
  const byteLength = sourceArrays.reduce((length, typedArray) => length + typedArray.byteLength, 0);
  const result = new Uint8Array(byteLength);
  let offset = 0;

  for (const sourceArray of sourceArrays) {
    result.set(sourceArray, offset);
    offset += sourceArray.byteLength;
  }

  return result.buffer;
}
function sliceArrayBuffer(arrayBuffer, byteOffset, byteLength) {
  const subArray = byteLength !== undefined ? new Uint8Array(arrayBuffer).subarray(byteOffset, byteOffset + byteLength) : new Uint8Array(arrayBuffer).subarray(byteOffset);
  const arrayCopy = new Uint8Array(subArray);
  return arrayCopy.buffer;
}

function padToNBytes(byteLength, padding) {
  assert$7(byteLength >= 0);
  assert$7(padding > 0);
  return byteLength + (padding - 1) & ~(padding - 1);
}
function copyToArray(source, target, targetOffset) {
  let sourceArray;

  if (source instanceof ArrayBuffer) {
    sourceArray = new Uint8Array(source);
  } else {
    const srcByteOffset = source.byteOffset;
    const srcByteLength = source.byteLength;
    sourceArray = new Uint8Array(source.buffer || source.arrayBuffer, srcByteOffset, srcByteLength);
  }

  target.set(sourceArray, targetOffset);
  return targetOffset + padToNBytes(sourceArray.byteLength, 4);
}

async function concatenateArrayBuffersAsync(asyncIterator) {
  const arrayBuffers = [];

  for await (const chunk of asyncIterator) {
    arrayBuffers.push(chunk);
  }

  return concatenateArrayBuffers(...arrayBuffers);
}

let pathPrefix = '';
const fileAliases = {};
function resolvePath(filename) {
  for (const alias in fileAliases) {
    if (filename.startsWith(alias)) {
      const replacement = fileAliases[alias];
      filename = filename.replace(alias, replacement);
    }
  }

  if (!filename.startsWith('http://') && !filename.startsWith('https://')) {
    filename = "".concat(pathPrefix).concat(filename);
  }

  return filename;
}

function filename(url) {
  const slashIndex = url && url.lastIndexOf('/');
  return slashIndex >= 0 ? url.substr(slashIndex + 1) : '';
}
function dirname(url) {
  const slashIndex = url && url.lastIndexOf('/');
  return slashIndex >= 0 ? url.substr(0, slashIndex) : '';
}

const isBoolean = x => typeof x === 'boolean';

const isFunction = x => typeof x === 'function';

const isObject = x => x !== null && typeof x === 'object';
const isPureObject = x => isObject(x) && x.constructor === {}.constructor;
const isIterable = x => x && typeof x[Symbol.iterator] === 'function';
const isAsyncIterable = x => x && typeof x[Symbol.asyncIterator] === 'function';
const isResponse = x => typeof Response !== 'undefined' && x instanceof Response || x && x.arrayBuffer && x.text && x.json;
const isBlob = x => typeof Blob !== 'undefined' && x instanceof Blob;
const isBuffer = x => x && typeof x === 'object' && x.isBuffer;
const isReadableDOMStream = x => typeof ReadableStream !== 'undefined' && x instanceof ReadableStream || isObject(x) && isFunction(x.tee) && isFunction(x.cancel) && isFunction(x.getReader);
const isReadableNodeStream = x => isObject(x) && isFunction(x.read) && isFunction(x.pipe) && isBoolean(x.readable);
const isReadableStream = x => isReadableDOMStream(x) || isReadableNodeStream(x);

const DATA_URL_PATTERN = /^data:([-\w.]+\/[-\w.+]+)(;|,)/;
const MIME_TYPE_PATTERN = /^([-\w.]+\/[-\w.+]+)/;
function parseMIMEType(mimeString) {
  const matches = MIME_TYPE_PATTERN.exec(mimeString);

  if (matches) {
    return matches[1];
  }

  return mimeString;
}
function parseMIMETypeFromURL(url) {
  const matches = DATA_URL_PATTERN.exec(url);

  if (matches) {
    return matches[1];
  }

  return '';
}

const QUERY_STRING_PATTERN = /\?.*/;
function getResourceUrlAndType(resource) {
  if (isResponse(resource)) {
    const url = stripQueryString(resource.url || '');
    const contentTypeHeader = resource.headers.get('content-type') || '';
    return {
      url,
      type: parseMIMEType(contentTypeHeader) || parseMIMETypeFromURL(url)
    };
  }

  if (isBlob(resource)) {
    return {
      url: stripQueryString(resource.name || ''),
      type: resource.type || ''
    };
  }

  if (typeof resource === 'string') {
    return {
      url: stripQueryString(resource),
      type: parseMIMETypeFromURL(resource)
    };
  }

  return {
    url: '',
    type: ''
  };
}
function getResourceContentLength(resource) {
  if (isResponse(resource)) {
    return resource.headers['content-length'] || -1;
  }

  if (isBlob(resource)) {
    return resource.size;
  }

  if (typeof resource === 'string') {
    return resource.length;
  }

  if (resource instanceof ArrayBuffer) {
    return resource.byteLength;
  }

  if (ArrayBuffer.isView(resource)) {
    return resource.byteLength;
  }

  return -1;
}

function stripQueryString(url) {
  return url.replace(QUERY_STRING_PATTERN, '');
}

async function makeResponse(resource) {
  if (isResponse(resource)) {
    return resource;
  }

  const headers = {};
  const contentLength = getResourceContentLength(resource);

  if (contentLength >= 0) {
    headers['content-length'] = String(contentLength);
  }

  const {
    url,
    type
  } = getResourceUrlAndType(resource);

  if (type) {
    headers['content-type'] = type;
  }

  const initialDataUrl = await getInitialDataUrl(resource);

  if (initialDataUrl) {
    headers['x-first-bytes'] = initialDataUrl;
  }

  if (typeof resource === 'string') {
    resource = new TextEncoder().encode(resource);
  }

  const response = new Response(resource, {
    headers
  });
  Object.defineProperty(response, 'url', {
    value: url
  });
  return response;
}
async function checkResponse(response) {
  if (!response.ok) {
    const message = await getResponseError(response);
    throw new Error(message);
  }
}

async function getResponseError(response) {
  let message = "Failed to fetch resource ".concat(response.url, " (").concat(response.status, "): ");

  try {
    const contentType = response.headers.get('Content-Type');
    let text = response.statusText;

    if (contentType.includes('application/json')) {
      text += " ".concat(await response.text());
    }

    message += text;
    message = message.length > 60 ? "".concat(message.slice(0, 60), "...") : message;
  } catch (error) {}

  return message;
}

async function getInitialDataUrl(resource) {
  const INITIAL_DATA_LENGTH = 5;

  if (typeof resource === 'string') {
    return "data:,".concat(resource.slice(0, INITIAL_DATA_LENGTH));
  }

  if (resource instanceof Blob) {
    const blobSlice = resource.slice(0, 5);
    return await new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = event => {
        var _event$target;

        return resolve(event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result);
      };

      reader.readAsDataURL(blobSlice);
    });
  }

  if (resource instanceof ArrayBuffer) {
    const slice = resource.slice(0, INITIAL_DATA_LENGTH);
    const base64 = arrayBufferToBase64(slice);
    return "data:base64,".concat(base64);
  }

  return null;
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

async function fetchFile(url, options) {
  if (typeof url === 'string') {
    url = resolvePath(url);
    let fetchOptions = options;

    if (options !== null && options !== void 0 && options.fetch && typeof (options === null || options === void 0 ? void 0 : options.fetch) !== 'function') {
      fetchOptions = options.fetch;
    }

    return await fetch(url, fetchOptions);
  }

  return await makeResponse(url);
}

function isElectron(mockUserAgent) {
  if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
    return true;
  }

  if (typeof process !== 'undefined' && typeof process.versions === 'object' && Boolean(process.versions['electron'])) {
    return true;
  }

  const realUserAgent = typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent;
  const userAgent = mockUserAgent || realUserAgent;

  if (userAgent && userAgent.indexOf('Electron') >= 0) {
    return true;
  }

  return false;
}

function isBrowser() {
  const isNode = typeof process === 'object' && String(process) === '[object process]' && !process.browser;
  return !isNode || isElectron();
}

const globals = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document,
  process: typeof process === 'object' && process
};
const window_ = globals.window || globals.self || globals.global;
const process_ = globals.process || {};

const VERSION$7 = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'untranspiled source';
isBrowser();

function getStorage(type) {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return storage;
  } catch (e) {
    return null;
  }
}

class LocalStorage {
  constructor(id, defaultConfig) {
    let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sessionStorage';

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "config", void 0);

    this.storage = getStorage(type);
    this.id = id;
    this.config = defaultConfig;

    this._loadConfiguration();
  }

  getConfiguration() {
    return this.config;
  }

  setConfiguration(configuration) {
    Object.assign(this.config, configuration);

    if (this.storage) {
      const serialized = JSON.stringify(this.config);
      this.storage.setItem(this.id, serialized);
    }
  }

  _loadConfiguration() {
    let configuration = {};

    if (this.storage) {
      const serializedConfiguration = this.storage.getItem(this.id);
      configuration = serializedConfiguration ? JSON.parse(serializedConfiguration) : {};
    }

    Object.assign(this.config, configuration);
    return this;
  }

}

function formatTime(ms) {
  let formatted;

  if (ms < 10) {
    formatted = "".concat(ms.toFixed(2), "ms");
  } else if (ms < 100) {
    formatted = "".concat(ms.toFixed(1), "ms");
  } else if (ms < 1000) {
    formatted = "".concat(ms.toFixed(0), "ms");
  } else {
    formatted = "".concat((ms / 1000).toFixed(2), "s");
  }

  return formatted;
}
function leftPad(string) {
  let length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
  const padLength = Math.max(length - string.length, 0);
  return "".concat(' '.repeat(padLength)).concat(string);
}

function formatImage(image, message, scale) {
  let maxWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 600;
  const imageUrl = image.src.replace(/\(/g, '%28').replace(/\)/g, '%29');

  if (image.width > maxWidth) {
    scale = Math.min(scale, maxWidth / image.width);
  }

  const width = image.width * scale;
  const height = image.height * scale;
  const style = ['font-size:1px;', "padding:".concat(Math.floor(height / 2), "px ").concat(Math.floor(width / 2), "px;"), "line-height:".concat(height, "px;"), "background:url(".concat(imageUrl, ");"), "background-size:".concat(width, "px ").concat(height, "px;"), 'color:transparent;'].join('');
  return ["".concat(message, " %c+"), style];
}

let COLOR;

(function (COLOR) {
  COLOR[COLOR["BLACK"] = 30] = "BLACK";
  COLOR[COLOR["RED"] = 31] = "RED";
  COLOR[COLOR["GREEN"] = 32] = "GREEN";
  COLOR[COLOR["YELLOW"] = 33] = "YELLOW";
  COLOR[COLOR["BLUE"] = 34] = "BLUE";
  COLOR[COLOR["MAGENTA"] = 35] = "MAGENTA";
  COLOR[COLOR["CYAN"] = 36] = "CYAN";
  COLOR[COLOR["WHITE"] = 37] = "WHITE";
  COLOR[COLOR["BRIGHT_BLACK"] = 90] = "BRIGHT_BLACK";
  COLOR[COLOR["BRIGHT_RED"] = 91] = "BRIGHT_RED";
  COLOR[COLOR["BRIGHT_GREEN"] = 92] = "BRIGHT_GREEN";
  COLOR[COLOR["BRIGHT_YELLOW"] = 93] = "BRIGHT_YELLOW";
  COLOR[COLOR["BRIGHT_BLUE"] = 94] = "BRIGHT_BLUE";
  COLOR[COLOR["BRIGHT_MAGENTA"] = 95] = "BRIGHT_MAGENTA";
  COLOR[COLOR["BRIGHT_CYAN"] = 96] = "BRIGHT_CYAN";
  COLOR[COLOR["BRIGHT_WHITE"] = 97] = "BRIGHT_WHITE";
})(COLOR || (COLOR = {}));

function getColor(color) {
  return typeof color === 'string' ? COLOR[color.toUpperCase()] || COLOR.WHITE : color;
}

function addColor(string, color, background) {
  if (!isBrowser && typeof string === 'string') {
    if (color) {
      color = getColor(color);
      string = "\x1B[".concat(color, "m").concat(string, "\x1B[39m");
    }

    if (background) {
      color = getColor(background);
      string = "\x1B[".concat(background + 10, "m").concat(string, "\x1B[49m");
    }
  }

  return string;
}

function autobind(obj) {
  let predefined = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['constructor'];
  const proto = Object.getPrototypeOf(obj);
  const propNames = Object.getOwnPropertyNames(proto);

  for (const key of propNames) {
    if (typeof obj[key] === 'function') {
      if (!predefined.find(name => key === name)) {
        obj[key] = obj[key].bind(obj);
      }
    }
  }
}

function assert$5(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function getHiResTimestamp() {
  let timestamp;

  if (isBrowser && 'performance' in window_) {
    var _window$performance, _window$performance$n;

    timestamp = window_ === null || window_ === void 0 ? void 0 : (_window$performance = window_.performance) === null || _window$performance === void 0 ? void 0 : (_window$performance$n = _window$performance.now) === null || _window$performance$n === void 0 ? void 0 : _window$performance$n.call(_window$performance);
  } else if ('hrtime' in process_) {
    var _process$hrtime;

    const timeParts = process_ === null || process_ === void 0 ? void 0 : (_process$hrtime = process_.hrtime) === null || _process$hrtime === void 0 ? void 0 : _process$hrtime.call(process_);
    timestamp = timeParts[0] * 1000 + timeParts[1] / 1e6;
  } else {
    timestamp = Date.now();
  }

  return timestamp;
}

const originalConsole = {
  debug: isBrowser ? console.debug || console.log : console.log,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
};
const DEFAULT_SETTINGS = {
  enabled: true,
  level: 0
};

function noop() {}

const cache = {};
const ONCE = {
  once: true
};
class Log {
  constructor() {
    let {
      id
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      id: ''
    };

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "VERSION", VERSION$7);

    _defineProperty(this, "_startTs", getHiResTimestamp());

    _defineProperty(this, "_deltaTs", getHiResTimestamp());

    _defineProperty(this, "_storage", void 0);

    _defineProperty(this, "userData", {});

    _defineProperty(this, "LOG_THROTTLE_TIMEOUT", 0);

    this.id = id;
    this.userData = {};
    this._storage = new LocalStorage("__probe-".concat(this.id, "__"), DEFAULT_SETTINGS);
    this.timeStamp("".concat(this.id, " started"));
    autobind(this);
    Object.seal(this);
  }

  set level(newLevel) {
    this.setLevel(newLevel);
  }

  get level() {
    return this.getLevel();
  }

  isEnabled() {
    return this._storage.config.enabled;
  }

  getLevel() {
    return this._storage.config.level;
  }

  getTotal() {
    return Number((getHiResTimestamp() - this._startTs).toPrecision(10));
  }

  getDelta() {
    return Number((getHiResTimestamp() - this._deltaTs).toPrecision(10));
  }

  set priority(newPriority) {
    this.level = newPriority;
  }

  get priority() {
    return this.level;
  }

  getPriority() {
    return this.level;
  }

  enable() {
    let enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this._storage.setConfiguration({
      enabled
    });

    return this;
  }

  setLevel(level) {
    this._storage.setConfiguration({
      level
    });

    return this;
  }

  get(setting) {
    return this._storage.config[setting];
  }

  set(setting, value) {
    this._storage.setConfiguration({
      [setting]: value
    });
  }

  settings() {
    if (console.table) {
      console.table(this._storage.config);
    } else {
      console.log(this._storage.config);
    }
  }

  assert(condition, message) {
    assert$5(condition, message);
  }

  warn(message) {
    return this._getLogFunction(0, message, originalConsole.warn, arguments, ONCE);
  }

  error(message) {
    return this._getLogFunction(0, message, originalConsole.error, arguments);
  }

  deprecated(oldUsage, newUsage) {
    return this.warn("`".concat(oldUsage, "` is deprecated and will be removed in a later version. Use `").concat(newUsage, "` instead"));
  }

  removed(oldUsage, newUsage) {
    return this.error("`".concat(oldUsage, "` has been removed. Use `").concat(newUsage, "` instead"));
  }

  probe(logLevel, message) {
    return this._getLogFunction(logLevel, message, originalConsole.log, arguments, {
      time: true,
      once: true
    });
  }

  log(logLevel, message) {
    return this._getLogFunction(logLevel, message, originalConsole.debug, arguments);
  }

  info(logLevel, message) {
    return this._getLogFunction(logLevel, message, console.info, arguments);
  }

  once(logLevel, message) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return this._getLogFunction(logLevel, message, originalConsole.debug || originalConsole.info, arguments, ONCE);
  }

  table(logLevel, table, columns) {
    if (table) {
      return this._getLogFunction(logLevel, table, console.table || noop, columns && [columns], {
        tag: getTableHeader(table)
      });
    }

    return noop;
  }

  image(_ref) {
    let {
      logLevel,
      priority,
      image,
      message = '',
      scale = 1
    } = _ref;

    if (!this._shouldLog(logLevel || priority)) {
      return noop;
    }

    return isBrowser ? logImageInBrowser({
      image,
      message,
      scale
    }) : logImageInNode();
  }

  time(logLevel, message) {
    return this._getLogFunction(logLevel, message, console.time ? console.time : console.info);
  }

  timeEnd(logLevel, message) {
    return this._getLogFunction(logLevel, message, console.timeEnd ? console.timeEnd : console.info);
  }

  timeStamp(logLevel, message) {
    return this._getLogFunction(logLevel, message, console.timeStamp || noop);
  }

  group(logLevel, message) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      collapsed: false
    };
    const options = normalizeArguments({
      logLevel,
      message,
      opts
    });
    const {
      collapsed
    } = opts;
    options.method = (collapsed ? console.groupCollapsed : console.group) || console.info;
    return this._getLogFunction(options);
  }

  groupCollapsed(logLevel, message) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this.group(logLevel, message, Object.assign({}, opts, {
      collapsed: true
    }));
  }

  groupEnd(logLevel) {
    return this._getLogFunction(logLevel, '', console.groupEnd || noop);
  }

  withGroup(logLevel, message, func) {
    this.group(logLevel, message)();

    try {
      func();
    } finally {
      this.groupEnd(logLevel)();
    }
  }

  trace() {
    if (console.trace) {
      console.trace();
    }
  }

  _shouldLog(logLevel) {
    return this.isEnabled() && this.getLevel() >= normalizeLogLevel(logLevel);
  }

  _getLogFunction(logLevel, message, method, args, opts) {
    if (this._shouldLog(logLevel)) {
      opts = normalizeArguments({
        logLevel,
        message,
        args,
        opts
      });
      method = method || opts.method;
      assert$5(method);
      opts.total = this.getTotal();
      opts.delta = this.getDelta();
      this._deltaTs = getHiResTimestamp();
      const tag = opts.tag || opts.message;

      if (opts.once) {
        if (!cache[tag]) {
          cache[tag] = getHiResTimestamp();
        } else {
          return noop;
        }
      }

      message = decorateMessage(this.id, opts.message, opts);
      return method.bind(console, message, ...opts.args);
    }

    return noop;
  }

}

_defineProperty(Log, "VERSION", VERSION$7);

function normalizeLogLevel(logLevel) {
  if (!logLevel) {
    return 0;
  }

  let resolvedLevel;

  switch (typeof logLevel) {
    case 'number':
      resolvedLevel = logLevel;
      break;

    case 'object':
      resolvedLevel = logLevel.logLevel || logLevel.priority || 0;
      break;

    default:
      return 0;
  }

  assert$5(Number.isFinite(resolvedLevel) && resolvedLevel >= 0);
  return resolvedLevel;
}

function normalizeArguments(opts) {
  const {
    logLevel,
    message
  } = opts;
  opts.logLevel = normalizeLogLevel(logLevel);
  const args = opts.args ? Array.from(opts.args) : [];

  while (args.length && args.shift() !== message) {}

  switch (typeof logLevel) {
    case 'string':
    case 'function':
      if (message !== undefined) {
        args.unshift(message);
      }

      opts.message = logLevel;
      break;

    case 'object':
      Object.assign(opts, logLevel);
      break;
  }

  if (typeof opts.message === 'function') {
    opts.message = opts.message();
  }

  const messageType = typeof opts.message;
  assert$5(messageType === 'string' || messageType === 'object');
  return Object.assign(opts, {
    args
  }, opts.opts);
}

function decorateMessage(id, message, opts) {
  if (typeof message === 'string') {
    const time = opts.time ? leftPad(formatTime(opts.total)) : '';
    message = opts.time ? "".concat(id, ": ").concat(time, "  ").concat(message) : "".concat(id, ": ").concat(message);
    message = addColor(message, opts.color, opts.background);
  }

  return message;
}

function logImageInNode(_ref2) {
  console.warn('removed');
  return noop;
}

function logImageInBrowser(_ref3) {
  let {
    image,
    message = '',
    scale = 1
  } = _ref3;

  if (typeof image === 'string') {
    const img = new Image();

    img.onload = () => {
      const args = formatImage(img, message, scale);
      console.log(...args);
    };

    img.src = image;
    return noop;
  }

  const element = image.nodeName || '';

  if (element.toLowerCase() === 'img') {
    console.log(...formatImage(image, message, scale));
    return noop;
  }

  if (element.toLowerCase() === 'canvas') {
    const img = new Image();

    img.onload = () => console.log(...formatImage(img, message, scale));

    img.src = image.toDataURL();
    return noop;
  }

  return noop;
}

function getTableHeader(table) {
  for (const key in table) {
    for (const title in table[key]) {
      return title || 'untitled';
    }
  }

  return 'empty';
}

const probeLog = new Log({
  id: 'loaders.gl'
});
class NullLog {
  log() {
    return () => {};
  }

  info() {
    return () => {};
  }

  warn() {
    return () => {};
  }

  error() {
    return () => {};
  }

}
class ConsoleLog {
  constructor() {
    _defineProperty(this, "console", void 0);

    this.console = console;
  }

  log(...args) {
    return this.console.log.bind(this.console, ...args);
  }

  info(...args) {
    return this.console.info.bind(this.console, ...args);
  }

  warn(...args) {
    return this.console.warn.bind(this.console, ...args);
  }

  error(...args) {
    return this.console.error.bind(this.console, ...args);
  }

}

const DEFAULT_LOADER_OPTIONS = {
  fetch: null,
  mimeType: undefined,
  nothrow: false,
  log: new ConsoleLog(),
  CDN: 'https://unpkg.com/@loaders.gl',
  worker: true,
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: isBrowser$2,
  _nodeWorkers: false,
  _workerType: '',
  limit: 0,
  _limitMB: 0,
  batchSize: 'auto',
  batchDebounceMs: 0,
  metadata: false,
  transforms: []
};
const REMOVED_LOADER_OPTIONS = {
  throws: 'nothrow',
  dataType: '(no longer used)',
  uri: 'baseUri',
  method: 'fetch.method',
  headers: 'fetch.headers',
  body: 'fetch.body',
  mode: 'fetch.mode',
  credentials: 'fetch.credentials',
  cache: 'fetch.cache',
  redirect: 'fetch.redirect',
  referrer: 'fetch.referrer',
  referrerPolicy: 'fetch.referrerPolicy',
  integrity: 'fetch.integrity',
  keepalive: 'fetch.keepalive',
  signal: 'fetch.signal'
};

function getGlobalLoaderState() {
  globalThis.loaders = globalThis.loaders || {};
  const {
    loaders
  } = globalThis;
  loaders._state = loaders._state || {};
  return loaders._state;
}
const getGlobalLoaderOptions = () => {
  const state = getGlobalLoaderState();
  state.globalOptions = state.globalOptions || { ...DEFAULT_LOADER_OPTIONS
  };
  return state.globalOptions;
};
function normalizeOptions(options, loader, loaders, url) {
  loaders = loaders || [];
  loaders = Array.isArray(loaders) ? loaders : [loaders];
  validateOptions(options, loaders);
  return normalizeOptionsInternal(loader, options, url);
}
function getFetchFunction(options, context) {
  const globalOptions = getGlobalLoaderOptions();
  const fetchOptions = options || globalOptions;

  if (typeof fetchOptions.fetch === 'function') {
    return fetchOptions.fetch;
  }

  if (isObject(fetchOptions.fetch)) {
    return url => fetchFile(url, fetchOptions);
  }

  if (context !== null && context !== void 0 && context.fetch) {
    return context === null || context === void 0 ? void 0 : context.fetch;
  }

  return fetchFile;
}

function validateOptions(options, loaders) {
  validateOptionsObject(options, null, DEFAULT_LOADER_OPTIONS, REMOVED_LOADER_OPTIONS, loaders);

  for (const loader of loaders) {
    const idOptions = options && options[loader.id] || {};
    const loaderOptions = loader.options && loader.options[loader.id] || {};
    const deprecatedOptions = loader.deprecatedOptions && loader.deprecatedOptions[loader.id] || {};
    validateOptionsObject(idOptions, loader.id, loaderOptions, deprecatedOptions, loaders);
  }
}

function validateOptionsObject(options, id, defaultOptions, deprecatedOptions, loaders) {
  const loaderName = id || 'Top level';
  const prefix = id ? "".concat(id, ".") : '';

  for (const key in options) {
    const isSubOptions = !id && isObject(options[key]);
    const isBaseUriOption = key === 'baseUri' && !id;
    const isWorkerUrlOption = key === 'workerUrl' && id;

    if (!(key in defaultOptions) && !isBaseUriOption && !isWorkerUrlOption) {
      if (key in deprecatedOptions) {
        probeLog.warn("".concat(loaderName, " loader option '").concat(prefix).concat(key, "' no longer supported, use '").concat(deprecatedOptions[key], "'"))();
      } else if (!isSubOptions) {
        const suggestion = findSimilarOption(key, loaders);
        probeLog.warn("".concat(loaderName, " loader option '").concat(prefix).concat(key, "' not recognized. ").concat(suggestion))();
      }
    }
  }
}

function findSimilarOption(optionKey, loaders) {
  const lowerCaseOptionKey = optionKey.toLowerCase();
  let bestSuggestion = '';

  for (const loader of loaders) {
    for (const key in loader.options) {
      if (optionKey === key) {
        return "Did you mean '".concat(loader.id, ".").concat(key, "'?");
      }

      const lowerCaseKey = key.toLowerCase();
      const isPartialMatch = lowerCaseOptionKey.startsWith(lowerCaseKey) || lowerCaseKey.startsWith(lowerCaseOptionKey);

      if (isPartialMatch) {
        bestSuggestion = bestSuggestion || "Did you mean '".concat(loader.id, ".").concat(key, "'?");
      }
    }
  }

  return bestSuggestion;
}

function normalizeOptionsInternal(loader, options, url) {
  const loaderDefaultOptions = loader.options || {};
  const mergedOptions = { ...loaderDefaultOptions
  };
  addUrlOptions(mergedOptions, url);

  if (mergedOptions.log === null) {
    mergedOptions.log = new NullLog();
  }

  mergeNestedFields(mergedOptions, getGlobalLoaderOptions());
  mergeNestedFields(mergedOptions, options);
  return mergedOptions;
}

function mergeNestedFields(mergedOptions, options) {
  for (const key in options) {
    if (key in options) {
      const value = options[key];

      if (isPureObject(value) && isPureObject(mergedOptions[key])) {
        mergedOptions[key] = { ...mergedOptions[key],
          ...options[key]
        };
      } else {
        mergedOptions[key] = options[key];
      }
    }
  }
}

function addUrlOptions(options, url) {
  if (url && !('baseUri' in options)) {
    options.baseUri = url;
  }
}

function isLoaderObject(loader) {
  var _loader;

  if (!loader) {
    return false;
  }

  if (Array.isArray(loader)) {
    loader = loader[0];
  }

  const hasExtensions = Array.isArray((_loader = loader) === null || _loader === void 0 ? void 0 : _loader.extensions);
  return hasExtensions;
}
function normalizeLoader(loader) {
  var _loader2, _loader3;

  assert$7(loader, 'null loader');
  assert$7(isLoaderObject(loader), 'invalid loader');
  let options;

  if (Array.isArray(loader)) {
    options = loader[1];
    loader = loader[0];
    loader = { ...loader,
      options: { ...loader.options,
        ...options
      }
    };
  }

  if ((_loader2 = loader) !== null && _loader2 !== void 0 && _loader2.parseTextSync || (_loader3 = loader) !== null && _loader3 !== void 0 && _loader3.parseText) {
    loader.text = true;
  }

  if (!loader.text) {
    loader.binary = true;
  }

  return loader;
}

const getGlobalLoaderRegistry = () => {
  const state = getGlobalLoaderState();
  state.loaderRegistry = state.loaderRegistry || [];
  return state.loaderRegistry;
};
function getRegisteredLoaders() {
  return getGlobalLoaderRegistry();
}

const log = new Log({
  id: 'loaders.gl'
});

const EXT_PATTERN = /\.([^.]+)$/;
async function selectLoader(data, loaders = [], options, context) {
  if (!validHTTPResponse(data)) {
    return null;
  }

  let loader = selectLoaderSync(data, loaders, { ...options,
    nothrow: true
  }, context);

  if (loader) {
    return loader;
  }

  if (isBlob(data)) {
    data = await data.slice(0, 10).arrayBuffer();
    loader = selectLoaderSync(data, loaders, options, context);
  }

  if (!loader && !(options !== null && options !== void 0 && options.nothrow)) {
    throw new Error(getNoValidLoaderMessage(data));
  }

  return loader;
}
function selectLoaderSync(data, loaders = [], options, context) {
  if (!validHTTPResponse(data)) {
    return null;
  }

  if (loaders && !Array.isArray(loaders)) {
    return normalizeLoader(loaders);
  }

  let candidateLoaders = [];

  if (loaders) {
    candidateLoaders = candidateLoaders.concat(loaders);
  }

  if (!(options !== null && options !== void 0 && options.ignoreRegisteredLoaders)) {
    candidateLoaders.push(...getRegisteredLoaders());
  }

  normalizeLoaders(candidateLoaders);
  const loader = selectLoaderInternal(data, candidateLoaders, options, context);

  if (!loader && !(options !== null && options !== void 0 && options.nothrow)) {
    throw new Error(getNoValidLoaderMessage(data));
  }

  return loader;
}

function selectLoaderInternal(data, loaders, options, context) {
  const {
    url,
    type
  } = getResourceUrlAndType(data);
  const testUrl = url || (context === null || context === void 0 ? void 0 : context.url);
  let loader = null;
  let reason = '';

  if (options !== null && options !== void 0 && options.mimeType) {
    loader = findLoaderByMIMEType(loaders, options === null || options === void 0 ? void 0 : options.mimeType);
    reason = "match forced by supplied MIME type ".concat(options === null || options === void 0 ? void 0 : options.mimeType);
  }

  loader = loader || findLoaderByUrl(loaders, testUrl);
  reason = reason || (loader ? "matched url ".concat(testUrl) : '');
  loader = loader || findLoaderByMIMEType(loaders, type);
  reason = reason || (loader ? "matched MIME type ".concat(type) : '');
  loader = loader || findLoaderByInitialBytes(loaders, data);
  reason = reason || (loader ? "matched initial data ".concat(getFirstCharacters(data)) : '');
  loader = loader || findLoaderByMIMEType(loaders, options === null || options === void 0 ? void 0 : options.fallbackMimeType);
  reason = reason || (loader ? "matched fallback MIME type ".concat(type) : '');

  if (reason) {
    var _loader;

    log.log(1, "selectLoader selected ".concat((_loader = loader) === null || _loader === void 0 ? void 0 : _loader.name, ": ").concat(reason, "."));
  }

  return loader;
}

function validHTTPResponse(data) {
  if (data instanceof Response) {
    if (data.status === 204) {
      return false;
    }
  }

  return true;
}

function getNoValidLoaderMessage(data) {
  const {
    url,
    type
  } = getResourceUrlAndType(data);
  let message = 'No valid loader found (';
  message += url ? "".concat(filename(url), ", ") : 'no url provided, ';
  message += "MIME type: ".concat(type ? "\"".concat(type, "\"") : 'not provided', ", ");
  const firstCharacters = data ? getFirstCharacters(data) : '';
  message += firstCharacters ? " first bytes: \"".concat(firstCharacters, "\"") : 'first bytes: not available';
  message += ')';
  return message;
}

function normalizeLoaders(loaders) {
  for (const loader of loaders) {
    normalizeLoader(loader);
  }
}

function findLoaderByUrl(loaders, url) {
  const match = url && EXT_PATTERN.exec(url);
  const extension = match && match[1];
  return extension ? findLoaderByExtension(loaders, extension) : null;
}

function findLoaderByExtension(loaders, extension) {
  extension = extension.toLowerCase();

  for (const loader of loaders) {
    for (const loaderExtension of loader.extensions) {
      if (loaderExtension.toLowerCase() === extension) {
        return loader;
      }
    }
  }

  return null;
}

function findLoaderByMIMEType(loaders, mimeType) {
  for (const loader of loaders) {
    if (loader.mimeTypes && loader.mimeTypes.includes(mimeType)) {
      return loader;
    }

    if (mimeType === "application/x.".concat(loader.id)) {
      return loader;
    }
  }

  return null;
}

function findLoaderByInitialBytes(loaders, data) {
  if (!data) {
    return null;
  }

  for (const loader of loaders) {
    if (typeof data === 'string') {
      if (testDataAgainstText(data, loader)) {
        return loader;
      }
    } else if (ArrayBuffer.isView(data)) {
      if (testDataAgainstBinary(data.buffer, data.byteOffset, loader)) {
        return loader;
      }
    } else if (data instanceof ArrayBuffer) {
      const byteOffset = 0;

      if (testDataAgainstBinary(data, byteOffset, loader)) {
        return loader;
      }
    }
  }

  return null;
}

function testDataAgainstText(data, loader) {
  if (loader.testText) {
    return loader.testText(data);
  }

  const tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
  return tests.some(test => data.startsWith(test));
}

function testDataAgainstBinary(data, byteOffset, loader) {
  const tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
  return tests.some(test => testBinary(data, byteOffset, loader, test));
}

function testBinary(data, byteOffset, loader, test) {
  if (test instanceof ArrayBuffer) {
    return compareArrayBuffers(test, data, test.byteLength);
  }

  switch (typeof test) {
    case 'function':
      return test(data, loader);

    case 'string':
      const magic = getMagicString$2(data, byteOffset, test.length);
      return test === magic;

    default:
      return false;
  }
}

function getFirstCharacters(data, length = 5) {
  if (typeof data === 'string') {
    return data.slice(0, length);
  } else if (ArrayBuffer.isView(data)) {
    return getMagicString$2(data.buffer, data.byteOffset, length);
  } else if (data instanceof ArrayBuffer) {
    const byteOffset = 0;
    return getMagicString$2(data, byteOffset, length);
  }

  return '';
}

function getMagicString$2(arrayBuffer, byteOffset, length) {
  if (arrayBuffer.byteLength < byteOffset + length) {
    return '';
  }

  const dataView = new DataView(arrayBuffer);
  let magic = '';

  for (let i = 0; i < length; i++) {
    magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
  }

  return magic;
}

const DEFAULT_CHUNK_SIZE$2 = 256 * 1024;
function* makeStringIterator(string, options) {
  const chunkSize = (options === null || options === void 0 ? void 0 : options.chunkSize) || DEFAULT_CHUNK_SIZE$2;
  let offset = 0;
  const textEncoder = new TextEncoder();

  while (offset < string.length) {
    const chunkLength = Math.min(string.length - offset, chunkSize);
    const chunk = string.slice(offset, offset + chunkLength);
    offset += chunkLength;
    yield textEncoder.encode(chunk);
  }
}

const DEFAULT_CHUNK_SIZE$1 = 256 * 1024;
function* makeArrayBufferIterator(arrayBuffer, options = {}) {
  const {
    chunkSize = DEFAULT_CHUNK_SIZE$1
  } = options;
  let byteOffset = 0;

  while (byteOffset < arrayBuffer.byteLength) {
    const chunkByteLength = Math.min(arrayBuffer.byteLength - byteOffset, chunkSize);
    const chunk = new ArrayBuffer(chunkByteLength);
    const sourceArray = new Uint8Array(arrayBuffer, byteOffset, chunkByteLength);
    const chunkArray = new Uint8Array(chunk);
    chunkArray.set(sourceArray);
    byteOffset += chunkByteLength;
    yield chunk;
  }
}

const DEFAULT_CHUNK_SIZE = 1024 * 1024;
async function* makeBlobIterator(blob, options) {
  const chunkSize = (options === null || options === void 0 ? void 0 : options.chunkSize) || DEFAULT_CHUNK_SIZE;
  let offset = 0;

  while (offset < blob.size) {
    const end = offset + chunkSize;
    const chunk = await blob.slice(offset, end).arrayBuffer();
    offset = end;
    yield chunk;
  }
}

function makeStreamIterator(stream, options) {
  return isBrowser$2 ? makeBrowserStreamIterator(stream, options) : makeNodeStreamIterator(stream);
}

async function* makeBrowserStreamIterator(stream, options) {
  const reader = stream.getReader();
  let nextBatchPromise;

  try {
    while (true) {
      const currentBatchPromise = nextBatchPromise || reader.read();

      if (options !== null && options !== void 0 && options._streamReadAhead) {
        nextBatchPromise = reader.read();
      }

      const {
        done,
        value
      } = await currentBatchPromise;

      if (done) {
        return;
      }

      yield toArrayBuffer(value);
    }
  } catch (error) {
    reader.releaseLock();
  }
}

async function* makeNodeStreamIterator(stream, options) {
  for await (const chunk of stream) {
    yield toArrayBuffer(chunk);
  }
}

function makeIterator(data, options) {
  if (typeof data === 'string') {
    return makeStringIterator(data, options);
  }

  if (data instanceof ArrayBuffer) {
    return makeArrayBufferIterator(data, options);
  }

  if (isBlob(data)) {
    return makeBlobIterator(data, options);
  }

  if (isReadableStream(data)) {
    return makeStreamIterator(data, options);
  }

  if (isResponse(data)) {
    const response = data;
    return makeStreamIterator(response.body, options);
  }

  throw new Error('makeIterator');
}

const ERR_DATA = 'Cannot convert supplied data type';
function getArrayBufferOrStringFromDataSync(data, loader, options) {
  if (loader.text && typeof data === 'string') {
    return data;
  }

  if (isBuffer(data)) {
    data = data.buffer;
  }

  if (data instanceof ArrayBuffer) {
    const arrayBuffer = data;

    if (loader.text && !loader.binary) {
      const textDecoder = new TextDecoder('utf8');
      return textDecoder.decode(arrayBuffer);
    }

    return arrayBuffer;
  }

  if (ArrayBuffer.isView(data)) {
    if (loader.text && !loader.binary) {
      const textDecoder = new TextDecoder('utf8');
      return textDecoder.decode(data);
    }

    let arrayBuffer = data.buffer;
    const byteLength = data.byteLength || data.length;

    if (data.byteOffset !== 0 || byteLength !== arrayBuffer.byteLength) {
      arrayBuffer = arrayBuffer.slice(data.byteOffset, data.byteOffset + byteLength);
    }

    return arrayBuffer;
  }

  throw new Error(ERR_DATA);
}
async function getArrayBufferOrStringFromData(data, loader, options) {
  const isArrayBuffer = data instanceof ArrayBuffer || ArrayBuffer.isView(data);

  if (typeof data === 'string' || isArrayBuffer) {
    return getArrayBufferOrStringFromDataSync(data, loader);
  }

  if (isBlob(data)) {
    data = await makeResponse(data);
  }

  if (isResponse(data)) {
    const response = data;
    await checkResponse(response);
    return loader.binary ? await response.arrayBuffer() : await response.text();
  }

  if (isReadableStream(data)) {
    data = makeIterator(data, options);
  }

  if (isIterable(data) || isAsyncIterable(data)) {
    return concatenateArrayBuffersAsync(data);
  }

  throw new Error(ERR_DATA);
}

function getLoaderContext(context, options, previousContext = null) {
  if (previousContext) {
    return previousContext;
  }

  const resolvedContext = {
    fetch: getFetchFunction(options, context),
    ...context
  };

  if (!Array.isArray(resolvedContext.loaders)) {
    resolvedContext.loaders = null;
  }

  return resolvedContext;
}
function getLoadersFromContext(loaders, context) {
  if (!context && loaders && !Array.isArray(loaders)) {
    return loaders;
  }

  let candidateLoaders;

  if (loaders) {
    candidateLoaders = Array.isArray(loaders) ? loaders : [loaders];
  }

  if (context && context.loaders) {
    const contextLoaders = Array.isArray(context.loaders) ? context.loaders : [context.loaders];
    candidateLoaders = candidateLoaders ? [...candidateLoaders, ...contextLoaders] : contextLoaders;
  }

  return candidateLoaders && candidateLoaders.length ? candidateLoaders : null;
}

async function parse$3(data, loaders, options, context) {
  assert$6(!context || typeof context === 'object');

  if (loaders && !Array.isArray(loaders) && !isLoaderObject(loaders)) {
    context = undefined;
    options = loaders;
    loaders = undefined;
  }

  data = await data;
  options = options || {};
  const {
    url
  } = getResourceUrlAndType(data);
  const typedLoaders = loaders;
  const candidateLoaders = getLoadersFromContext(typedLoaders, context);
  const loader = await selectLoader(data, candidateLoaders, options);

  if (!loader) {
    return null;
  }

  options = normalizeOptions(options, loader, candidateLoaders, url);
  context = getLoaderContext({
    url,
    parse: parse$3,
    loaders: candidateLoaders
  }, options, context);
  return await parseWithLoader(loader, data, options, context);
}

async function parseWithLoader(loader, data, options, context) {
  validateWorkerVersion(loader);

  if (isResponse(data)) {
    const response = data;
    const {
      ok,
      redirected,
      status,
      statusText,
      type,
      url
    } = response;
    const headers = Object.fromEntries(response.headers.entries());
    context.response = {
      headers,
      ok,
      redirected,
      status,
      statusText,
      type,
      url
    };
  }

  data = await getArrayBufferOrStringFromData(data, loader, options);

  if (loader.parseTextSync && typeof data === 'string') {
    options.dataType = 'text';
    return loader.parseTextSync(data, options, context, loader);
  }

  if (canParseWithWorker(loader, options)) {
    return await parseWithWorker(loader, data, options, context, parse$3);
  }

  if (loader.parseText && typeof data === 'string') {
    return await loader.parseText(data, options, context, loader);
  }

  if (loader.parse) {
    return await loader.parse(data, options, context, loader);
  }

  assert$6(!loader.parseSync);
  throw new Error("".concat(loader.id, " loader - no parser found and worker is disabled"));
}

async function load(url, loaders, options, context) {
  if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
    options = loaders;
    loaders = undefined;
  }

  const fetch = getFetchFunction(options);
  let data = url;

  if (typeof url === 'string') {
    data = await fetch(url);
  }

  if (isBlob(url)) {
    data = await fetch(url);
  }

  return await parse$3(data, loaders, options);
}

const VERSION$6 = "3.2.13" ;
const DEFAULT_LAS_OPTIONS = {
  las: {
    shape: 'mesh',
    fp64: false,
    skip: 1,
    colorDepth: 8
  }
};
const LASLoader$2 = {
  name: 'LAS',
  id: 'las',
  module: 'las',
  version: VERSION$6,
  worker: true,
  extensions: ['las', 'laz'],
  mimeTypes: ['application/octet-stream'],
  text: true,
  binary: true,
  tests: ['LAS'],
  options: DEFAULT_LAS_OPTIONS
};

function getMeshBoundingBox(attributes) {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  const positions = attributes.POSITION ? attributes.POSITION.value : [];
  const len = positions && positions.length;

  for (let i = 0; i < len; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    minZ = z < minZ ? z : minZ;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    maxZ = z > maxZ ? z : maxZ;
  }

  return [[minX, minY, minZ], [maxX, maxY, maxZ]];
}

function assert$4(condition, message) {
  if (!condition) {
    throw new Error(message || 'loader assertion failed.');
  }
}

class Schema {
  constructor(fields, metadata) {
    _defineProperty(this, "fields", void 0);

    _defineProperty(this, "metadata", void 0);

    assert$4(Array.isArray(fields));
    checkNames(fields);
    this.fields = fields;
    this.metadata = metadata || new Map();
  }

  compareTo(other) {
    if (this.metadata !== other.metadata) {
      return false;
    }

    if (this.fields.length !== other.fields.length) {
      return false;
    }

    for (let i = 0; i < this.fields.length; ++i) {
      if (!this.fields[i].compareTo(other.fields[i])) {
        return false;
      }
    }

    return true;
  }

  select(...columnNames) {
    const nameMap = Object.create(null);

    for (const name of columnNames) {
      nameMap[name] = true;
    }

    const selectedFields = this.fields.filter(field => nameMap[field.name]);
    return new Schema(selectedFields, this.metadata);
  }

  selectAt(...columnIndices) {
    const selectedFields = columnIndices.map(index => this.fields[index]).filter(Boolean);
    return new Schema(selectedFields, this.metadata);
  }

  assign(schemaOrFields) {
    let fields;
    let metadata = this.metadata;

    if (schemaOrFields instanceof Schema) {
      const otherSchema = schemaOrFields;
      fields = otherSchema.fields;
      metadata = mergeMaps(mergeMaps(new Map(), this.metadata), otherSchema.metadata);
    } else {
      fields = schemaOrFields;
    }

    const fieldMap = Object.create(null);

    for (const field of this.fields) {
      fieldMap[field.name] = field;
    }

    for (const field of fields) {
      fieldMap[field.name] = field;
    }

    const mergedFields = Object.values(fieldMap);
    return new Schema(mergedFields, metadata);
  }

}

function checkNames(fields) {
  const usedNames = {};

  for (const field of fields) {
    if (usedNames[field.name]) {
      console.warn('Schema: duplicated field name', field.name, field);
    }

    usedNames[field.name] = true;
  }
}

function mergeMaps(m1, m2) {
  return new Map([...(m1 || new Map()), ...(m2 || new Map())]);
}

class Field {
  constructor(name, type, nullable = false, metadata = new Map()) {
    _defineProperty(this, "name", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "nullable", void 0);

    _defineProperty(this, "metadata", void 0);

    this.name = name;
    this.type = type;
    this.nullable = nullable;
    this.metadata = metadata;
  }

  get typeId() {
    return this.type && this.type.typeId;
  }

  clone() {
    return new Field(this.name, this.type, this.nullable, this.metadata);
  }

  compareTo(other) {
    return this.name === other.name && this.type === other.type && this.nullable === other.nullable && this.metadata === other.metadata;
  }

  toString() {
    return "".concat(this.type).concat(this.nullable ? ', nullable' : '').concat(this.metadata ? ", metadata: ".concat(this.metadata) : '');
  }

}

let Type;

(function (Type) {
  Type[Type["NONE"] = 0] = "NONE";
  Type[Type["Null"] = 1] = "Null";
  Type[Type["Int"] = 2] = "Int";
  Type[Type["Float"] = 3] = "Float";
  Type[Type["Binary"] = 4] = "Binary";
  Type[Type["Utf8"] = 5] = "Utf8";
  Type[Type["Bool"] = 6] = "Bool";
  Type[Type["Decimal"] = 7] = "Decimal";
  Type[Type["Date"] = 8] = "Date";
  Type[Type["Time"] = 9] = "Time";
  Type[Type["Timestamp"] = 10] = "Timestamp";
  Type[Type["Interval"] = 11] = "Interval";
  Type[Type["List"] = 12] = "List";
  Type[Type["Struct"] = 13] = "Struct";
  Type[Type["Union"] = 14] = "Union";
  Type[Type["FixedSizeBinary"] = 15] = "FixedSizeBinary";
  Type[Type["FixedSizeList"] = 16] = "FixedSizeList";
  Type[Type["Map"] = 17] = "Map";
  Type[Type["Dictionary"] = -1] = "Dictionary";
  Type[Type["Int8"] = -2] = "Int8";
  Type[Type["Int16"] = -3] = "Int16";
  Type[Type["Int32"] = -4] = "Int32";
  Type[Type["Int64"] = -5] = "Int64";
  Type[Type["Uint8"] = -6] = "Uint8";
  Type[Type["Uint16"] = -7] = "Uint16";
  Type[Type["Uint32"] = -8] = "Uint32";
  Type[Type["Uint64"] = -9] = "Uint64";
  Type[Type["Float16"] = -10] = "Float16";
  Type[Type["Float32"] = -11] = "Float32";
  Type[Type["Float64"] = -12] = "Float64";
  Type[Type["DateDay"] = -13] = "DateDay";
  Type[Type["DateMillisecond"] = -14] = "DateMillisecond";
  Type[Type["TimestampSecond"] = -15] = "TimestampSecond";
  Type[Type["TimestampMillisecond"] = -16] = "TimestampMillisecond";
  Type[Type["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
  Type[Type["TimestampNanosecond"] = -18] = "TimestampNanosecond";
  Type[Type["TimeSecond"] = -19] = "TimeSecond";
  Type[Type["TimeMillisecond"] = -20] = "TimeMillisecond";
  Type[Type["TimeMicrosecond"] = -21] = "TimeMicrosecond";
  Type[Type["TimeNanosecond"] = -22] = "TimeNanosecond";
  Type[Type["DenseUnion"] = -23] = "DenseUnion";
  Type[Type["SparseUnion"] = -24] = "SparseUnion";
  Type[Type["IntervalDayTime"] = -25] = "IntervalDayTime";
  Type[Type["IntervalYearMonth"] = -26] = "IntervalYearMonth";
})(Type || (Type = {}));

let _Symbol$toStringTag, _Symbol$toStringTag2, _Symbol$toStringTag7;
class DataType {
  static isNull(x) {
    return x && x.typeId === Type.Null;
  }

  static isInt(x) {
    return x && x.typeId === Type.Int;
  }

  static isFloat(x) {
    return x && x.typeId === Type.Float;
  }

  static isBinary(x) {
    return x && x.typeId === Type.Binary;
  }

  static isUtf8(x) {
    return x && x.typeId === Type.Utf8;
  }

  static isBool(x) {
    return x && x.typeId === Type.Bool;
  }

  static isDecimal(x) {
    return x && x.typeId === Type.Decimal;
  }

  static isDate(x) {
    return x && x.typeId === Type.Date;
  }

  static isTime(x) {
    return x && x.typeId === Type.Time;
  }

  static isTimestamp(x) {
    return x && x.typeId === Type.Timestamp;
  }

  static isInterval(x) {
    return x && x.typeId === Type.Interval;
  }

  static isList(x) {
    return x && x.typeId === Type.List;
  }

  static isStruct(x) {
    return x && x.typeId === Type.Struct;
  }

  static isUnion(x) {
    return x && x.typeId === Type.Union;
  }

  static isFixedSizeBinary(x) {
    return x && x.typeId === Type.FixedSizeBinary;
  }

  static isFixedSizeList(x) {
    return x && x.typeId === Type.FixedSizeList;
  }

  static isMap(x) {
    return x && x.typeId === Type.Map;
  }

  static isDictionary(x) {
    return x && x.typeId === Type.Dictionary;
  }

  get typeId() {
    return Type.NONE;
  }

  compareTo(other) {
    return this === other;
  }

}
_Symbol$toStringTag = Symbol.toStringTag;
class Int extends DataType {
  constructor(isSigned, bitWidth) {
    super();

    _defineProperty(this, "isSigned", void 0);

    _defineProperty(this, "bitWidth", void 0);

    this.isSigned = isSigned;
    this.bitWidth = bitWidth;
  }

  get typeId() {
    return Type.Int;
  }

  get [_Symbol$toStringTag]() {
    return 'Int';
  }

  toString() {
    return "".concat(this.isSigned ? 'I' : 'Ui', "nt").concat(this.bitWidth);
  }

}
class Int8 extends Int {
  constructor() {
    super(true, 8);
  }

}
class Int16 extends Int {
  constructor() {
    super(true, 16);
  }

}
class Int32 extends Int {
  constructor() {
    super(true, 32);
  }

}
class Uint8 extends Int {
  constructor() {
    super(false, 8);
  }

}
class Uint16 extends Int {
  constructor() {
    super(false, 16);
  }

}
class Uint32 extends Int {
  constructor() {
    super(false, 32);
  }

}
const Precision = {
  HALF: 16,
  SINGLE: 32,
  DOUBLE: 64
};
_Symbol$toStringTag2 = Symbol.toStringTag;
class Float extends DataType {
  constructor(precision) {
    super();

    _defineProperty(this, "precision", void 0);

    this.precision = precision;
  }

  get typeId() {
    return Type.Float;
  }

  get [_Symbol$toStringTag2]() {
    return 'Float';
  }

  toString() {
    return "Float".concat(this.precision);
  }

}
class Float32 extends Float {
  constructor() {
    super(Precision.SINGLE);
  }

}
class Float64 extends Float {
  constructor() {
    super(Precision.DOUBLE);
  }

}
_Symbol$toStringTag7 = Symbol.toStringTag;
class FixedSizeList extends DataType {
  constructor(listSize, child) {
    super();

    _defineProperty(this, "listSize", void 0);

    _defineProperty(this, "children", void 0);

    this.listSize = listSize;
    this.children = [child];
  }

  get typeId() {
    return Type.FixedSizeList;
  }

  get valueType() {
    return this.children[0].type;
  }

  get valueField() {
    return this.children[0];
  }

  get [_Symbol$toStringTag7]() {
    return 'FixedSizeList';
  }

  toString() {
    return "FixedSizeList[".concat(this.listSize, "]<").concat(this.valueType, ">");
  }

}

function getArrowTypeFromTypedArray(array) {
  switch (array.constructor) {
    case Int8Array:
      return new Int8();

    case Uint8Array:
      return new Uint8();

    case Int16Array:
      return new Int16();

    case Uint16Array:
      return new Uint16();

    case Int32Array:
      return new Int32();

    case Uint32Array:
      return new Uint32();

    case Float32Array:
      return new Float32();

    case Float64Array:
      return new Float64();

    default:
      throw new Error('array type not supported');
  }
}

function deduceMeshSchema(attributes, metadata) {
  const fields = deduceMeshFields(attributes);
  return new Schema(fields, metadata);
}
function deduceMeshField(attributeName, attribute, optionalMetadata) {
  const type = getArrowTypeFromTypedArray(attribute.value);
  const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
  const field = new Field(attributeName, new FixedSizeList(attribute.size, new Field('value', type)), false, metadata);
  return field;
}

function deduceMeshFields(attributes) {
  const fields = [];

  for (const attributeName in attributes) {
    const attribute = attributes[attributeName];
    fields.push(deduceMeshField(attributeName, attribute));
  }

  return fields;
}

function makeMeshAttributeMetadata(attribute) {
  const result = new Map();

  if ('byteOffset' in attribute) {
    result.set('byteOffset', attribute.byteOffset.toString(10));
  }

  if ('byteStride' in attribute) {
    result.set('byteStride', attribute.byteStride.toString(10));
  }

  if ('normalized' in attribute) {
    result.set('normalized', attribute.normalized.toString());
  }

  return result;
}

function getModule(){var Module=typeof Module!=='undefined'?Module:{};var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==='object';ENVIRONMENT_IS_WORKER=typeof importScripts==='function';ENVIRONMENT_IS_NODE=typeof process==='object'&&typeof process.versions==='object'&&typeof process.versions.node==='string';ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory='';function locateFile(path){if(Module['locateFile']){return Module['locateFile'](path,scriptDirectory);}return scriptDirectory+path;}var read_,readAsync,readBinary;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require('path').dirname(scriptDirectory)+'/';}else {scriptDirectory=__dirname+'/';}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString();}if(!nodeFS)nodeFS=require('fs');if(!nodePath)nodePath=require('path');filename=nodePath['normalize'](filename);return nodeFS['readFileSync'](filename,binary?null:'utf8');};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret;};if(process['argv'].length>1){process['argv'][1].replace(/\\/g,'/');}process['argv'].slice(2);if(typeof module!=='undefined'){module['exports']=Module;}process['on']('uncaughtException',function(ex){if(!(ex instanceof ExitStatus)){throw ex;}});process['on']('unhandledRejection',abort);Module['inspect']=function(){return '[Emscripten Module object]';};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!='undefined'){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data);}return read(f);};}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data;}if(typeof readbuffer==='function'){return new Uint8Array(readbuffer(f));}data=read(f,'binary');assert(typeof data==='object');return data;};if(typeof scriptArgs!='undefined'){scriptArgs;}if(typeof print!=='undefined'){if(typeof console==='undefined')console={};console.log=print;console.warn=console.error=typeof printErr!=='undefined'?printErr:print;}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href;}else if(document.currentScript){scriptDirectory=document.currentScript.src;}if(scriptDirectory.indexOf('blob:')!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf('/')+1);}else {scriptDirectory='';}{read_=function shell_read(url){try{var xhr=new XMLHttpRequest();xhr.open('GET',url,false);xhr.send(null);return xhr.responseText;}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data);}throw err;}};if(ENVIRONMENT_IS_WORKER){readBinary=function readBinary(url){try{var xhr=new XMLHttpRequest();xhr.open('GET',url,false);xhr.responseType='arraybuffer';xhr.send(null);return new Uint8Array(xhr.response);}catch(err){var data=tryParseAsDataURI(url);if(data){return data;}throw err;}};}readAsync=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest();xhr.open('GET',url,true);xhr.responseType='arraybuffer';xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return;}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return;}onerror();};xhr.onerror=onerror;xhr.send(null);};}}else;var out=Module['print']||console.log.bind(console);var err=Module['printErr']||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=null;if(Module['arguments'])Module['arguments'];if(Module['thisProgram'])Module['thisProgram'];if(Module['quit'])Module['quit'];new Array(0);var tempRet0=0;var setTempRet0=function(value){tempRet0=value;};var getTempRet0=function(){return tempRet0;};var GLOBAL_BASE=8;if(Module['wasmBinary'])Module['wasmBinary'];if(Module['noExitRuntime'])Module['noExitRuntime'];var ABORT=false;function assert(condition,text){if(!condition){abort('Assertion failed: '+text);}}var UTF8Decoder=typeof TextDecoder!=='undefined'?new TextDecoder('utf8'):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr));}else {var str='';while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue;}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue;}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else {u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63;}if(u0<65536){str+=String.fromCharCode(u0);}else {var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}return str;}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):'';}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023;}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}else {if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}}heap[outIdx]=0;return outIdx-startIdx;}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4;}return len;}var UTF16Decoder=typeof TextDecoder!=='undefined'?new TextDecoder('utf-16le'):undefined;function UTF16ToString(ptr,maxBytesToRead){var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder){return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr));}else {var i=0;var str='';while(1){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0||i==maxBytesToRead/2)return str;++i;str+=String.fromCharCode(codeUnit);}}}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647;}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2;}HEAP16[outPtr>>1]=0;return outPtr-startPtr;}function lengthBytesUTF16(str){return str.length*2;}function UTF32ToString(ptr,maxBytesToRead){var i=0;var str='';while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}else {str+=String.fromCharCode(utf32);}}return str;}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647;}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023;}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break;}HEAP32[outPtr>>2]=0;return outPtr-startPtr;}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4;}return len;}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module['HEAP8']=HEAP8=new Int8Array(buf);Module['HEAP16']=HEAP16=new Int16Array(buf);Module['HEAP32']=HEAP32=new Int32Array(buf);Module['HEAPU8']=HEAPU8=new Uint8Array(buf);Module['HEAPU16']=HEAPU16=new Uint16Array(buf);Module['HEAPU32']=HEAPU32=new Uint32Array(buf);Module['HEAPF32']=HEAPF32=new Float32Array(buf);Module['HEAPF64']=HEAPF64=new Float64Array(buf);}var DYNAMIC_BASE=5265264,DYNAMICTOP_PTR=22176;var INITIAL_INITIAL_MEMORY=Module['INITIAL_MEMORY']||167772160;if(Module['buffer']){buffer=Module['buffer'];}else {buffer=new ArrayBuffer(INITIAL_INITIAL_MEMORY);}INITIAL_INITIAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=='function'){callback(Module);continue;}var func=callback.func;if(typeof func==='number'){if(callback.arg===undefined){Module['dynCall_v'](func);}else {Module['dynCall_vi'](func,callback.arg);}}else {func(callback.arg===undefined?null:callback.arg);}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];function preRun(){if(Module['preRun']){if(typeof Module['preRun']=='function')Module['preRun']=[Module['preRun']];while(Module['preRun'].length){addOnPreRun(Module['preRun'].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function initRuntime(){callRuntimeCallbacks(__ATINIT__);}function preMain(){callRuntimeCallbacks(__ATMAIN__);}function postRun(){if(Module['postRun']){if(typeof Module['postRun']=='function')Module['postRun']=[Module['postRun']];while(Module['postRun'].length){addOnPostRun(Module['postRun'].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module['monitorRunDependencies']){Module['monitorRunDependencies'](runDependencies);}}function removeRunDependency(id){runDependencies--;if(Module['monitorRunDependencies']){Module['monitorRunDependencies'](runDependencies);}if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module['preloadedImages']={};Module['preloadedAudios']={};function abort(what){if(Module['onAbort']){Module['onAbort'](what);}what+='';out(what);err(what);ABORT=true;what='abort('+what+'). Build with -s ASSERTIONS=1 for more info.';throw what;}var memoryInitializer=null;function hasPrefix(str,prefix){return String.prototype.startsWith?str.startsWith(prefix):str.indexOf(prefix)===0;}var dataURIPrefix='data:application/octet-stream;base64,';function isDataURI(filename){return hasPrefix(filename,dataURIPrefix);}__ATINIT__.push({func:function(){globalCtors();}});memoryInitializer='data:application/octet-stream;base64,AAAAAAAAAAAPDg0MCwoJCA4AAQMGCgoJDQECBAcLCwoMAwQFCAwMCwsGBwgJDQ0MCgoLDA0ODg0JCgsMDQ4PDggJCgsMDQ4PAAECAwQFBgcBAAECAwQFBgIBAAECAwQFAwIBAAECAwQEAwIBAAECAwUEAwIBAAECBgUEAwIBAAEHBgUEAwIBAMgPAAAoDQAAEBAAACAQAADIDwAAUA0AABAQAAAgEAAAEQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAEACQsLAAAJBgsAAAsABhEAAAAREREAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAADAAAAAAJDAAAAAAADAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAANAAAABA0AAAAACQ4AAAAAAA4AAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAADwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAASEhIAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAKAAAAAAoAAAAACQsAAAAAAAsAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGGRJEOwI/LEcUPTMwChsGRktFNw9JDo4XA0AdPGkrNh9KLRwBICUpIQgMFRYiLhA4Pgs0MRhkdHV2L0EJfzkRI0MyQomKiwUEJignDSoeNYwHGkiTE5SVAAAAAAAAAAAASWxsZWdhbCBieXRlIHNlcXVlbmNlAERvbWFpbiBlcnJvcgBSZXN1bHQgbm90IHJlcHJlc2VudGFibGUATm90IGEgdHR5AFBlcm1pc3Npb24gZGVuaWVkAE9wZXJhdGlvbiBub3QgcGVybWl0dGVkAE5vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBQcmV2aW91cyBvd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATm8gZXJyb3IgaW5mb3JtYXRpb24AAAAAAADgFgAAmRgAAGAQAAAAAAAA4BYAAEIZAABgEAAAAAAAAOAWAAAqGgAASA8AAAAAAAC4FgAANBsAAOAWAACfGgAAMAoAAAAAAADgFgAAaRsAAEgPAAAAAAAA4BYAAIobAABIDwAAAAAAALgWAAAPHAAA4BYAAHwcAABIDwAAAAAAAOAWAACVHAAASA8AAAAAAADgFgAAHh0AAEgPAAAAAAAA4BYAAHcdAABIDwAAAAAAAOAWAACQHQAASA8AAAAAAADgFgAAQh4AAEgPAAAAAAAA4BYAAIceAABgEAAAAAAAAOAWAACkHwAASA8AAAAAAAC4FgAAZyAAAOAWAADkHwAA8AoAAAAAAADgFgAAjyAAAGAQAAAAAAAAuBYAAMMiAADgFgAAAiIAABgLAAAAAAAA4BYAAOEiAABgEAAAAAAAAOAWAADQJAAAGAsAAAAAAADgFgAAkSUAAGAQAAAAAAAA4BYAAIAnAAAYCwAAAAAAAOAWAAA9KAAAYBAAAAAAAADgFgAAJCoAABgLAAAAAAAA4BYAAOkqAABgEAAAAAAAAOAWAADgLAAA8AoAAAAAAADgFgAAui0AAGAQAAAAAAAA4BYAANsvAADwCgAAAAAAAOAWAADTMAAAYBAAAAAAAADgFgAAMDMAAPAKAAAAAAAA4BYAACQ0AABgEAAAAAAAAOAWAAB5NgAA8AoAAAAAAADgFgAAizcAAGAQAAAAAAAA4BYAABw6AABgEAAAAAAAAOAWAACdOgAAYBAAAAAAAADgFgAAXjsAAPAKAAAAAAAA4BYAALU7AABgEAAAAAAAAOAWAADMPAAAGAsAAAAAAADgFgAATz0AAGAQAAAAAAAA4BYAAL4+AAAYCwAAAAAAAOAWAABBPwAAYBAAAAAAAADgFgAAsEAAABgLAAAAAAAA4BYAADNBAABgEAAAAAAAAOAWAACiQgAAGAsAAAAAAADgFgAAJUMAAGAQAAAAAAAA4BYAAJREAAAYCwAAAAAAAOAWAAAXRQAAYBAAAAAAAADgFgAAhkYAABgLAAAAAAAA4BYAAAlHAABgEAAAAAAAALgWAAB4SAAAiBcAAIBIAAAAAAAAIA0AAIgXAACJSAAAAQAAACANAAC4FgAAqkgAAIgXAAC6SAAAAAAAAEgNAACIFwAAy0gAAAEAAABIDQAAuBYAABhMAAC4FgAAN0wAALgWAABWTAAAuBYAAHVMAAC4FgAAlEwAALgWAACzTAAAuBYAANJMAAC4FgAA8UwAALgWAAAQTQAAuBYAAC9NAAC4FgAATk0AALgWAABtTQAAuBYAAIxNAACkFwAAn00AAAAAAAABAAAA8A0AAAAAAAC4FgAA4U0AAKQXAAAHTgAAAAAAAAEAAADwDQAAAAAAAKQXAABJTgAAAAAAAAEAAADwDQAAAAAAAKQXAACITgAAAAAAAAEAAADwDQAAAAAAAKQXAADHTgAAAAAAAAEAAADwDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALgWAADNTwAA4BYAAC1QAAAADwAAAAAAAOAWAADaTwAAEA8AAAAAAAC4FgAA+08AAOAWAAAIUAAA8A4AAAAAAADgFgAAhlAAAOgOAAAAAAAA4BYAAJNQAADoDgAAAAAAAOAWAACjUAAA6A4AAAAAAADgFgAAtVAAADgPAAAAAAAA4BYAAMZQAAA4DwAAAAAAAOAWAADXUAAAAA8AAAAAAADgFgAA+VAAAHgPAAAAAAAA4BYAAB1RAAAADwAAAAAAAOAWAABCUQAAeA8AAAAAAADgFgAAjlEAAAAPAAAAAAAAbBcAALZRAABsFwAAuFEAAGwXAAC7UQAAbBcAAL1RAABsFwAAv1EAAGwXAADBUQAAbBcAAMNRAABsFwAAxVEAAGwXAADHUQAAbBcAAMlRAABsFwAAy1EAAGwXAADNUQAAbBcAAM9RAABsFwAA0VEAAOAWAADTUQAA8A4AAAAAAADgFgAARlIAAOgOAAAAAAAAuBYAAGJSAACkFwAAe1IAAAAAAAABAAAAWBAAAAAAAADgFgAA9FIAAIgQAAAAAAAA4BYAABdTAACYEAAAAAAAALgWAAAuUwAA4BYAAHBTAACIEAAAAAAAAOAWAACSUwAASA8AAAAAAAAAAAAAAAoAAAEAAAACAAAAAwAAAAEAAAAEAAAAAAAAABAKAAABAAAABQAAAAYAAAACAAAABwAAAAAAAAAgCgAACAAAAAkAAAABAAAAAAAAADgKAAAKAAAACwAAAAIAAAABAAAADAAAAA0AAAACAAAAAwAAAAMAAAAAAAAASAoAAAgAAAAOAAAAAQAAAAAAAABYCgAACAAAAA8AAAABAAAAAAAAAIAKAAAIAAAAEAAAAAEAAAAAAAAAcAoAAAgAAAARAAAAAQAAAAAAAACQCgAACAAAABIAAAABAAAAAAAAAKAKAAAIAAAAEwAAAAEAAAAAAAAAsAoAAAgAAAAUAAAAAQAAAAAAAADACgAACAAAABUAAAABAAAAAAAAANAKAAABAAAAFgAAABcAAAAEAAAAGAAAAAAAAADgCgAACAAAABkAAAABAAAAAAAAAPgKAAAFAAAAGgAAABsAAAAAAAAA8AoAAAEAAAAcAAAAHQAAAAAAAAAICwAAAQAAAB4AAAAfAAAABgAAACAAAAAAAAAAIAsAACEAAAAiAAAABwAAAAgAAAAAAAAAGAsAACMAAAAkAAAABwAAAAkAAAAAAAAAMAsAAAEAAAAlAAAAJgAAAAoAAAAnAAAAAAAAAEALAAAoAAAAKQAAAAcAAAALAAAAAAAAAFALAAABAAAAKgAAACsAAAAMAAAALAAAAAAAAABgCwAALQAAAC4AAAAHAAAADQAAAAAAAABwCwAAAQAAAC8AAAAwAAAADgAAADEAAAAAAAAAgAsAADIAAAAzAAAABwAAAA8AAAAAAAAAkAsAAAEAAAA0AAAANQAAABAAAAA2AAAAAAAAAKALAAARAAAANwAAADgAAAAAAAAAsAsAAAEAAAA5AAAAOgAAABIAAAA7AAAAAAAAAMALAAATAAAAPAAAAD0AAAAAAAAA0AsAAAEAAAA+AAAAPwAAABQAAABAAAAAAAAAAOALAAAVAAAAQQAAAEIAAAAAAAAA8AsAAAEAAABDAAAARAAAABYAAABFAAAAAAAAAAAMAAAXAAAARgAAAEcAAAAAAAAAEAwAAAEAAABIAAAASQAAABgAAABKAAAAAAAAACAMAAABAAAASwAAAEwAAAAZAAAATQAAAAAAAAAwDAAAAQAAAE4AAABPAAAAGgAAAFAAAAAAAAAAQAwAABsAAABRAAAAUgAAAAAAAABQDAAAAQAAAFMAAABUAAAAHAAAAFUAAAAAAAAAYAwAAFYAAABXAAAABwAAAB0AAAAAAAAAcAwAAAEAAABYAAAAWQAAAB4AAABaAAAAAAAAAIAMAABbAAAAXAAAAAcAAAAfAAAAAAAAAJAMAAABAAAAXQAAAF4AAAAgAAAAXwAAAAAAAACgDAAAYAAAAGEAAAAHAAAAIQAAAAAAAACwDAAAAQAAAGIAAABjAAAAIgAAAGQAAAAAAAAAwAwAAGUAAABmAAAABwAAACMAAAAAAAAA0AwAAAEAAABnAAAAaAAAACQAAABpAAAAAAAAAOAMAABqAAAAawAAAAcAAAAlAAAAAAAAAPAMAAABAAAAbAAAAG0AAAAmAAAAbgAAAAAAAAAADQAAbwAAAHAAAAAHAAAAJwAAAAAAAAAQDQAAAQAAAHEAAAByAAAAKAAAAHMAAAAoDQAAyA8AACgNAAAIEAAAEBAAACgNAABQDQAAyA8AAFANAAAgEAAAyA8AAFANAAAIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDgAAdAAAAHUAAAB2AAAAdwAAAAIAAAABAAAAAQAAAAEAAAAAAAAAGA8AAHQAAAB4AAAAdgAAAHcAAAACAAAAAgAAAAIAAAACAAAAAAAAACgPAAB5AAAAegAAAAQAAAAAAAAAOA8AAHsAAAB8AAAABQAAAAAAAABIDwAACAAAAH0AAAABAAAAAAAAAFgPAAB7AAAAfgAAAAUAAAAAAAAAaA8AAHsAAAB/AAAABQAAAAAAAAC4DwAAdAAAAIAAAAB2AAAAdwAAAAMAAAAAAAAAiA8AAHQAAACBAAAAdgAAAHcAAAAEAAAAAAAAADgQAAB0AAAAggAAAHYAAAB3AAAAAgAAAAMAAAADAAAAAwAAAAAAAABIEAAAgwAAAIQAAAAGAAAAAAAAAHgQAACFAAAAhgAAAAcAAAABAAAABQAAAAYAAAACAAAAAAAAAKAQAACFAAAAhwAAAAgAAAADAAAABQAAAAYAAAAEAAAA4BcAAAQYAAAAAAAAsBAAAIgAAACJAAAAAQAAAExBU1ppcABvcGVuAGdldFBvaW50AGdldENvdW50AER5bmFtaWNMQVNaaXAAYWRkRmllbGRGbG9hdGluZwBhZGRGaWVsZFNpZ25lZABhZGRGaWVsZFVuc2lnbmVkAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONmxhc3ppcDdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzNfRUVOU185YWxsb2NhdG9ySVMzX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjZsYXN6aXA3c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjZsYXN6aXAyaW82cmVhZGVyMTBiYXNpY19maWxlSU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRU5TXzE0ZGVmYXVsdF9kZWxldGVJUzdfRUVOU185YWxsb2NhdG9ySVM3X0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjZsYXN6aXAyaW82cmVhZGVyMTBiYXNpY19maWxlSU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFAExBU0YATjZsYXN6aXAxM2ludmFsaWRfbWFnaWNFAGFsbG9jYXRvcjxUPjo6YWxsb2NhdGUoc2l6ZV90IG4pICduJyBleGNlZWRzIG1heGltdW0gc3VwcG9ydGVkIHNpemUARmlsZSBtYWdpYyBpcyBub3QgdmFsaWQATlN0M19fMjEwX19mdW5jdGlvbjZfX2Z1bmNJWk42bGFzemlwMmlvNnJlYWRlcjEwYmFzaWNfZmlsZUlOUzJfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRTExX3ZhbGlkYXRvcnNFdkVVbFJOUzNfNmhlYWRlckVFX05TXzlhbGxvY2F0b3JJU0JfRUVGdlNBX0VFRQBOU3QzX18yMTBfX2Z1bmN0aW9uNl9fYmFzZUlGdlJONmxhc3ppcDJpbzZoZWFkZXJFRUVFAE42bGFzemlwMjFvbGRfc3R5bGVfY29tcHJlc3Npb25FAE42bGFzemlwMTRub3RfY29tcHJlc3NlZEUAVGhlIGZpbGUgc2VlbXMgdG8gaGF2ZSBvbGQgc3R5bGUgY29tcHJlc3Npb24gd2hpY2ggaXMgbm90IHN1cHBvcnRlZABUaGUgZmlsZSBkb2Vzbid0IHNlZW0gdG8gYmUgY29tcHJlc3NlZABaTjZsYXN6aXAyaW82cmVhZGVyMTBiYXNpY19maWxlSU5TXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUUxMV92YWxpZGF0b3JzRXZFVWxSTlMwXzZoZWFkZXJFRV8AbGFzemlwIGVuY29kZWQATjZsYXN6aXAxM25vX2xhc3ppcF92bHJFAE42bGFzemlwMjVsYXN6aXBfZm9ybWF0X3Vuc3VwcG9ydGVkRQBPbmx5IExBU3ppcCBQT0lOVFdJU0UgQ0hVTktFRCBkZWNvbXByZXNzb3IgaXMgc3VwcG9ydGVkAE5vIExBU3ppcCBWTFIgd2FzIGZvdW5kIGluIHRoZSBWTFJzIHNlY3Rpb24ATjZsYXN6aXAyMmNodW5rX3RhYmxlX3JlYWRfZXJyb3JFAENodW5rIHRhYmxlIG9mZnNldCA9PSAtMSBpcyBub3Qgc3VwcG9ydGVkIGF0IHRoaXMgdGltZQBONmxhc3ppcDEzbm90X3N1cHBvcnRlZEUATjZsYXN6aXAyNnVua25vd25fY2h1bmtfdGFibGVfZm9ybWF0RQBjaHVua19zaXplID09IHVpbnQubWF4IGlzIG5vdCBzdXBwb3J0ZWQgYXQgdGhpcyB0aW1lLgBUaGVyZSB3YXMgYSBwcm9ibGVtIHJlYWRpbmcgdGhlIGNodW5rIHRhYmxlAFRoZSBjaHVuayB0YWJsZSB2ZXJzaW9uIG51bWJlciBpcyB1bmtub3duAE42bGFzemlwMTFlbmRfb2ZfZmlsZUUAUmVhY2hlZCBFbmQgb2YgZmlsZQBJbnZhbGlkIG51bWJlciBvZiBzeW1ib2xzAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONmxhc3ppcDhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOU18xNGRlZmF1bHRfZGVsZXRlSVM5X0VFTlNfOWFsbG9jYXRvcklTOV9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU42bGFzemlwOGRlY29kZXJzMTBhcml0aG1ldGljSU5TMV8yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOUzFfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRUVFAE42bGFzemlwMTl1bmtub3duX3NjaGVtYV90eXBlRQBUaGUgTEFaIHNjaGVtYSBpcyBub3QgcmVjb2duaXplZABONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2ZpZWxkX2RlY29tcHJlc3NvcklOU184ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlNfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlNfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyMGR5bmFtaWNfZGVjb21wcmVzc29yRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjZsYXN6aXA3Zm9ybWF0czI2ZHluYW1pY19maWVsZF9kZWNvbXByZXNzb3JJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVFRU5TXzE0ZGVmYXVsdF9kZWxldGVJU0NfRUVOU185YWxsb2NhdG9ySVNDX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjZsYXN6aXA3Zm9ybWF0czI2ZHluYW1pY19maWVsZF9kZWNvbXByZXNzb3JJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOU18yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOU183c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMwXzVmaWVsZElOUzBfM2xhczdwb2ludDEwRU5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNDX0VFRUVFRQBONmxhc3ppcDdmb3JtYXRzMTBiYXNlX2ZpZWxkRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjZsYXN6aXA3Zm9ybWF0czI2ZHluYW1pY19kZWNvbXByZXNzb3JfZmllbGRJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzJfNWZpZWxkSU5TMl8zbGFzN3BvaW50MTBFTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0VfRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTSV9FRU5TXzlhbGxvY2F0b3JJU0lfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSU5TMV8yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOUzFfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRU5TMl81ZmllbGRJTlMyXzNsYXM3cG9pbnQxMEVOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTRV9FRUVFRUVFRQBONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOU184ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlNfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlNfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRU5TMF81ZmllbGRJTlMwXzNsYXM3Z3BzdGltZUVOUzBfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTQ19FRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzVmaWVsZElOUzJfM2xhczdncHN0aW1lRU5TMl8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNFX0VFRUVFRU5TXzE0ZGVmYXVsdF9kZWxldGVJU0lfRUVOU185YWxsb2NhdG9ySVNJX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjZsYXN6aXA3Zm9ybWF0czI2ZHluYW1pY19kZWNvbXByZXNzb3JfZmllbGRJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzJfNWZpZWxkSU5TMl8zbGFzN2dwc3RpbWVFTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0VfRUVFRUVFRUUATjZsYXN6aXA3Zm9ybWF0czI2ZHluYW1pY19kZWNvbXByZXNzb3JfZmllbGRJTlNfOGRlY29kZXJzMTBhcml0aG1ldGljSU5TXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzBfNWZpZWxkSU5TMF8zbGFzM3JnYkVOUzBfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTQ19FRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzVmaWVsZElOUzJfM2xhczNyZ2JFTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0VfRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTSV9FRU5TXzlhbGxvY2F0b3JJU0lfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSU5TMV8yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOUzFfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRU5TMl81ZmllbGRJTlMyXzNsYXMzcmdiRU5TMl8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNFX0VFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOU18yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOU183c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMwXzVmaWVsZElOUzBfM2xhczEwZXh0cmFieXRlc0VOUzBfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTQ19FRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzVmaWVsZElOUzJfM2xhczEwZXh0cmFieXRlc0VOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTRV9FRUVFRUVOU18xNGRlZmF1bHRfZGVsZXRlSVNJX0VFTlNfOWFsbG9jYXRvcklTSV9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzVmaWVsZElOUzJfM2xhczEwZXh0cmFieXRlc0VOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTRV9FRUVFRUVFRQBONmxhc3ppcDdmb3JtYXRzMjFkeW5hbWljX2RlY29tcHJlc3NvcjFJTlNfOGRlY29kZXJzMTBhcml0aG1ldGljSU5TXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzBfMTlyZWNvcmRfZGVjb21wcmVzc29ySUpOUzBfNWZpZWxkSU5TMF8zbGFzN3BvaW50MTBFTlMwXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0RfRUVFRUVFRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONmxhc3ppcDdmb3JtYXRzMjFkeW5hbWljX2RlY29tcHJlc3NvcjFJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzJfMTlyZWNvcmRfZGVjb21wcmVzc29ySUpOUzJfNWZpZWxkSU5TMl8zbGFzN3BvaW50MTBFTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0ZfRUVFRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTS19FRU5TXzlhbGxvY2F0b3JJU0tfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjFkeW5hbWljX2RlY29tcHJlc3NvcjFJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzJfMTlyZWNvcmRfZGVjb21wcmVzc29ySUpOUzJfNWZpZWxkSU5TMl8zbGFzN3BvaW50MTBFTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0ZfRUVFRUVFRUVFRUUATjZsYXN6aXA3Zm9ybWF0czIxZHluYW1pY19kZWNvbXByZXNzb3IxSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOU18yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOU183c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMwXzE5cmVjb3JkX2RlY29tcHJlc3NvcklKTlMwXzVmaWVsZElOUzBfM2xhczdwb2ludDEwRU5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNEX0VFRUVOU0JfSU5TQ183Z3BzdGltZUVOU0VfSVNIX0VFRUVFRUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjZsYXN6aXA3Zm9ybWF0czIxZHluYW1pY19kZWNvbXByZXNzb3IxSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzE5cmVjb3JkX2RlY29tcHJlc3NvcklKTlMyXzVmaWVsZElOUzJfM2xhczdwb2ludDEwRU5TMl8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNGX0VFRUVOU0RfSU5TRV83Z3BzdGltZUVOU0dfSVNKX0VFRUVFRUVFRU5TXzE0ZGVmYXVsdF9kZWxldGVJU05fRUVOU185YWxsb2NhdG9ySVNOX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjZsYXN6aXA3Zm9ybWF0czIxZHluYW1pY19kZWNvbXByZXNzb3IxSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzE5cmVjb3JkX2RlY29tcHJlc3NvcklKTlMyXzVmaWVsZElOUzJfM2xhczdwb2ludDEwRU5TMl8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNGX0VFRUVOU0RfSU5TRV83Z3BzdGltZUVOU0dfSVNKX0VFRUVFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyMWR5bmFtaWNfZGVjb21wcmVzc29yMUlOU184ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlNfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlNfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRU5TMF8xOXJlY29yZF9kZWNvbXByZXNzb3JJSk5TMF81ZmllbGRJTlMwXzNsYXM3cG9pbnQxMEVOUzBfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTRF9FRUVFTlNCX0lOU0NfM3JnYkVOU0VfSVNIX0VFRUVFRUVFRQBOU3QzX18yMjBfX3NoYXJlZF9wdHJfcG9pbnRlcklQTjZsYXN6aXA3Zm9ybWF0czIxZHluYW1pY19kZWNvbXByZXNzb3IxSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzE5cmVjb3JkX2RlY29tcHJlc3NvcklKTlMyXzVmaWVsZElOUzJfM2xhczdwb2ludDEwRU5TMl8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNGX0VFRUVOU0RfSU5TRV8zcmdiRU5TR19JU0pfRUVFRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTTl9FRU5TXzlhbGxvY2F0b3JJU05fRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjFkeW5hbWljX2RlY29tcHJlc3NvcjFJTlMxXzhkZWNvZGVyczEwYXJpdGhtZXRpY0lOUzFfMmlvMThfX2lmc3RyZWFtX3dyYXBwZXJJTlMxXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzJfMTlyZWNvcmRfZGVjb21wcmVzc29ySUpOUzJfNWZpZWxkSU5TMl8zbGFzN3BvaW50MTBFTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0ZfRUVFRU5TRF9JTlNFXzNyZ2JFTlNHX0lTSl9FRUVFRUVFRUVFRQBONmxhc3ppcDdmb3JtYXRzMjFkeW5hbWljX2RlY29tcHJlc3NvcjFJTlNfOGRlY29kZXJzMTBhcml0aG1ldGljSU5TXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TXzdzdHJlYW1zMTNtZW1vcnlfc3RyZWFtRUVFRUVOUzBfMTlyZWNvcmRfZGVjb21wcmVzc29ySUpOUzBfNWZpZWxkSU5TMF8zbGFzN3BvaW50MTBFTlMwXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJU0RfRUVFRU5TQl9JTlNDXzdncHN0aW1lRU5TRV9JU0hfRUVFRU5TQl9JTlNDXzNyZ2JFTlNFX0lTS19FRUVFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyMWR5bmFtaWNfZGVjb21wcmVzc29yMUlOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSU5TMV8yaW8xOF9faWZzdHJlYW1fd3JhcHBlcklOUzFfN3N0cmVhbXMxM21lbW9yeV9zdHJlYW1FRUVFRU5TMl8xOXJlY29yZF9kZWNvbXByZXNzb3JJSk5TMl81ZmllbGRJTlMyXzNsYXM3cG9pbnQxMEVOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElTRl9FRUVFTlNEX0lOU0VfN2dwc3RpbWVFTlNHX0lTSl9FRUVFTlNEX0lOU0VfM3JnYkVOU0dfSVNNX0VFRUVFRUVFRU5TXzE0ZGVmYXVsdF9kZWxldGVJU1FfRUVOU185YWxsb2NhdG9ySVNRX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJTjZsYXN6aXA3Zm9ybWF0czIxZHluYW1pY19kZWNvbXByZXNzb3IxSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJTlMxXzJpbzE4X19pZnN0cmVhbV93cmFwcGVySU5TMV83c3RyZWFtczEzbWVtb3J5X3N0cmVhbUVFRUVFTlMyXzE5cmVjb3JkX2RlY29tcHJlc3NvcklKTlMyXzVmaWVsZElOUzJfM2xhczdwb2ludDEwRU5TMl8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSVNGX0VFRUVOU0RfSU5TRV83Z3BzdGltZUVOU0dfSVNKX0VFRUVOU0RfSU5TRV8zcmdiRU5TR19JU01fRUVFRUVFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUDEwYnVmX3N0cmVhbU5TXzE0ZGVmYXVsdF9kZWxldGVJUzFfRUVOU185YWxsb2NhdG9ySVMxX0VFRUUATlN0M19fMjE0ZGVmYXVsdF9kZWxldGVJMTBidWZfc3RyZWFtRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTNV9FRU5TXzlhbGxvY2F0b3JJUzVfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZmllbGRfZGVjb21wcmVzc29ySU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRUVFAE5TdDNfXzIyMF9fc2hhcmVkX3B0cl9wb2ludGVySVBONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2ZpZWxkX2RlY29tcHJlc3NvcklOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFRUVOU18xNGRlZmF1bHRfZGVsZXRlSVM4X0VFTlNfOWFsbG9jYXRvcklTOF9FRUVFAE5TdDNfXzIxNGRlZmF1bHRfZGVsZXRlSU42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZmllbGRfZGVjb21wcmVzc29ySU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRU5TMF81ZmllbGRJaU5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSWlFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVOUzJfNWZpZWxkSWlOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElpRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTQ19FRU5TXzlhbGxvY2F0b3JJU0NfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlMyXzVmaWVsZElpTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJaUVFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRU5TMF81ZmllbGRJak5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSWpFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVOUzJfNWZpZWxkSWpOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElqRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTQ19FRU5TXzlhbGxvY2F0b3JJU0NfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlMyXzVmaWVsZElqTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJakVFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRU5TMF81ZmllbGRJYU5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSWFFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVOUzJfNWZpZWxkSWFOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElhRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTQ19FRU5TXzlhbGxvY2F0b3JJU0NfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlMyXzVmaWVsZElhTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJYUVFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRU5TMF81ZmllbGRJc05TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSXNFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVOUzJfNWZpZWxkSXNOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZElzRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTQ19FRU5TXzlhbGxvY2F0b3JJU0NfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlMyXzVmaWVsZElzTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJc0VFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRU5TMF81ZmllbGRJaE5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSWhFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVOUzJfNWZpZWxkSWhOUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZEloRUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTQ19FRU5TXzlhbGxvY2F0b3JJU0NfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlMyXzVmaWVsZEloTlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJaEVFRUVFRUVFAE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TXzhkZWNvZGVyczEwYXJpdGhtZXRpY0kxMGJ1Zl9zdHJlYW1FRU5TMF81ZmllbGRJdE5TMF8yMHN0YW5kYXJkX2RpZmZfbWV0aG9kSXRFRUVFRUUATlN0M19fMjIwX19zaGFyZWRfcHRyX3BvaW50ZXJJUE42bGFzemlwN2Zvcm1hdHMyNmR5bmFtaWNfZGVjb21wcmVzc29yX2ZpZWxkSU5TMV84ZGVjb2RlcnMxMGFyaXRobWV0aWNJMTBidWZfc3RyZWFtRUVOUzJfNWZpZWxkSXROUzJfMjBzdGFuZGFyZF9kaWZmX21ldGhvZEl0RUVFRUVFTlNfMTRkZWZhdWx0X2RlbGV0ZUlTQ19FRU5TXzlhbGxvY2F0b3JJU0NfRUVFRQBOU3QzX18yMTRkZWZhdWx0X2RlbGV0ZUlONmxhc3ppcDdmb3JtYXRzMjZkeW5hbWljX2RlY29tcHJlc3Nvcl9maWVsZElOUzFfOGRlY29kZXJzMTBhcml0aG1ldGljSTEwYnVmX3N0cmVhbUVFTlMyXzVmaWVsZEl0TlMyXzIwc3RhbmRhcmRfZGlmZl9tZXRob2RJdEVFRUVFRUVFADZMQVNaaXAAUDZMQVNaaXAAUEs2TEFTWmlwAGlpAHYAdmkAdmlpaWkAdmlpaQBpaWkAMTNEeW5hbWljTEFTWmlwAFAxM0R5bmFtaWNMQVNaaXAAUEsxM0R5bmFtaWNMQVNaaXAAdm9pZABib29sAGNoYXIAc2lnbmVkIGNoYXIAdW5zaWduZWQgY2hhcgBzaG9ydAB1bnNpZ25lZCBzaG9ydABpbnQAdW5zaWduZWQgaW50AGxvbmcAdW5zaWduZWQgbG9uZwBmbG9hdABkb3VibGUAc3RkOjpzdHJpbmcAc3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4Ac3RkOjp3c3RyaW5nAHN0ZDo6dTE2c3RyaW5nAHN0ZDo6dTMyc3RyaW5nAGVtc2NyaXB0ZW46OnZhbABlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxzaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8bG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgbG9uZz4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MTZfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGxvbmcgZG91YmxlPgBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0llRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJZEVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0ltRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJbEVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWpFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lpRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJdEVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0loRUUATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJYUVFAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQBOMTBlbXNjcmlwdGVuM3ZhbEUATlN0M19fMjEyYmFzaWNfc3RyaW5nSURpTlNfMTFjaGFyX3RyYWl0c0lEaUVFTlNfOWFsbG9jYXRvcklEaUVFRUUATlN0M19fMjIxX19iYXNpY19zdHJpbmdfY29tbW9uSUxiMUVFRQBOU3QzX18yMTJiYXNpY19zdHJpbmdJRHNOU18xMWNoYXJfdHJhaXRzSURzRUVOU185YWxsb2NhdG9ySURzRUVFRQBOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQBOU3QzX18yMTJiYXNpY19zdHJpbmdJaE5TXzExY2hhcl90cmFpdHNJaEVFTlNfOWFsbG9jYXRvckloRUVFRQBOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQAtKyAgIDBYMHgAKG51bGwpAC0wWCswWCAwWC0weCsweCAweABpbmYASU5GAG5hbgBOQU4ALgB0ZXJtaW5hdGluZyB3aXRoICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzOiAlcwB0ZXJtaW5hdGluZyB3aXRoICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzAHRlcm1pbmF0aW5nIHdpdGggJXMgZm9yZWlnbiBleGNlcHRpb24AdGVybWluYXRpbmcAdW5jYXVnaHQAU3Q5ZXhjZXB0aW9uAE4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAFN0OXR5cGVfaW5mbwBOMTBfX2N4eGFiaXYxMjBfX3NpX2NsYXNzX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAHRlcm1pbmF0ZV9oYW5kbGVyIHVuZXhwZWN0ZWRseSByZXR1cm5lZABzdGQ6OmJhZF9hbGxvYwBTdDliYWRfYWxsb2MAU3QxMWxvZ2ljX2Vycm9yAFN0MTNydW50aW1lX2Vycm9yAFN0MTJsZW5ndGhfZXJyb3IAU3QxMm91dF9vZl9yYW5nZQBOMTBfX2N4eGFiaXYxMTdfX3BiYXNlX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTE5X19wb2ludGVyX3R5cGVfaW5mb0UATjEwX19jeHhhYml2MTIwX19mdW5jdGlvbl90eXBlX2luZm9FAE4xMF9fY3h4YWJpdjEyOV9fcG9pbnRlcl90b19tZW1iZXJfdHlwZV9pbmZvRQBQdXJlIHZpcnR1YWwgZnVuY3Rpb24gY2FsbGVkIQBOMTBfX2N4eGFiaXYxMjNfX2Z1bmRhbWVudGFsX3R5cGVfaW5mb0UAdgBEbgBiAGMAaABhAHMAdABpAGoAbABtAGYAZABOMTBfX2N4eGFiaXYxMjFfX3ZtaV9jbGFzc190eXBlX2luZm9FAF9fY3hhX2d1YXJkX2FjcXVpcmUgZGV0ZWN0ZWQgcmVjdXJzaXZlIGluaXRpYWxpemF0aW9uAHN0ZDo6YmFkX2Z1bmN0aW9uX2NhbGwATlN0M19fMjE3YmFkX2Z1bmN0aW9uX2NhbGxFAE5TdDNfXzIxNF9fc2hhcmVkX2NvdW50RQBOU3QzX18yMTlfX3NoYXJlZF93ZWFrX2NvdW50RQBtdXRleCBsb2NrIGZhaWxlZABiYXNpY19zdHJpbmcAdW5zcGVjaWZpZWQgZ2VuZXJpY19jYXRlZ29yeSBlcnJvcgBVbmtub3duIGVycm9yICVkAGdlbmVyaWMATlN0M19fMjI0X19nZW5lcmljX2Vycm9yX2NhdGVnb3J5RQBOU3QzX18yMTJfX2RvX21lc3NhZ2VFAE5TdDNfXzIxNGVycm9yX2NhdGVnb3J5RQB1bnNwZWNpZmllZCBzeXN0ZW1fY2F0ZWdvcnkgZXJyb3IAc3lzdGVtAE5TdDNfXzIyM19fc3lzdGVtX2Vycm9yX2NhdGVnb3J5RQBOU3QzX18yMTJzeXN0ZW1fZXJyb3JFADogAHZlY3Rvcg==';var tempDoublePtr=22368;function ___cxa_allocate_exception(size){return _malloc(size);}var ___exception_infos={};function ___exception_addRef(ptr){if(!ptr)return;var info=___exception_infos[ptr];info.refcount++;}function ___exception_deAdjust(adjusted){if(!adjusted||___exception_infos[adjusted])return adjusted;for(var key in ___exception_infos){var ptr=+key;var adj=___exception_infos[ptr].adjusted;var len=adj.length;for(var i=0;i<len;i++){if(adj[i]===adjusted){return ptr;}}}return adjusted;}function ___cxa_begin_catch(ptr){var info=___exception_infos[ptr];if(info&&!info.caught){info.caught=true;__ZSt18uncaught_exceptionv.uncaught_exceptions--;}if(info)info.rethrown=false;___exception_addRef(___exception_deAdjust(ptr));return ptr;}function ___cxa_throw(ptr,type,destructor){___exception_infos[ptr]={ptr:ptr,adjusted:[ptr],type:type,destructor:destructor,refcount:0,caught:false,rethrown:false};if(!('uncaught_exception'in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv.uncaught_exceptions=1;}else {__ZSt18uncaught_exceptionv.uncaught_exceptions++;}throw ptr;}function ___cxa_uncaught_exceptions(){return __ZSt18uncaught_exceptionv.uncaught_exceptions;}function ___gxx_personality_v0(){}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError('Unknown type size: '+size);}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i);}embind_charCodes=codes;}var embind_charCodes=undefined;function readLatin1String(ptr){var ret='';var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]];}return ret;}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return '_unknown';}name=name.replace(/[^a-zA-Z0-9_]/g,'$');var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return '_'+name;}else {return name;}}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function('body','return function '+name+'() {\n'+'    "use strict";'+'    return body.apply(this, arguments);\n'+'};\n')(body);}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+'\n'+stack.replace(/^Error(:[^\n]*)?\n/,'');}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name;}else {return this.name+': '+this.message;}};return errorClass;}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message);}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message);}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes;});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError('Mismatched type converter count');}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i]);}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach(function(dt,i){if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt];}else {unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[];}awaitingDependencies[dt].push(function(){typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters);}});}});if(0===unregisteredTypes.length){onComplete(typeConverters);}}function registerType(rawType,registeredInstance,options){options=options||{};if(!('argPackAdvance'in registeredInstance)){throw new TypeError('registerType registeredInstance requires argPackAdvance');}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer');}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return;}else {throwBindingError("Cannot register type '"+name+"' twice");}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(function(cb){cb();});}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,fromWireType:function(wt){return !!wt;},toWireType:function(destructors,o){return o?trueValue:falseValue;},argPackAdvance:8,readValueFromPointer:function(pointer){var heap;if(size===1){heap=HEAP8;}else if(size===2){heap=HEAP16;}else if(size===4){heap=HEAP32;}else {throw new TypeError('Unknown boolean type size: '+name);}return this['fromWireType'](heap[pointer>>shift]);},destructorFunction:null});}function ClassHandle_isAliasOf(other){if(!(this instanceof ClassHandle)){return false;}if(!(other instanceof ClassHandle)){return false;}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass;}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass;}return leftClass===rightClass&&left===right;}function shallowCopyInternalPointer(o){return {count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType};}function throwInstanceAlreadyDeleted(obj){function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name;}throwBindingError(getInstanceTypeName(obj)+' instance already deleted');}var finalizationGroup=false;function detachFinalizer(handle){}function runDestructor($$){if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr);}else {$$.ptrType.registeredClass.rawDestructor($$.ptr);}}function releaseClassHandle($$){$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete){runDestructor($$);}}function attachFinalizer(handle){if('undefined'===typeof FinalizationGroup){attachFinalizer=function(handle){return handle;};return handle;}finalizationGroup=new FinalizationGroup(function(iter){for(var result=iter.next();!result.done;result=iter.next()){var $$=result.value;if(!$$.ptr){console.warn('object already deleted: '+$$.ptr);}else {releaseClassHandle($$);}}});attachFinalizer=function(handle){finalizationGroup.register(handle,handle.$$,handle.$$);return handle;};detachFinalizer=function(handle){finalizationGroup.unregister(handle.$$);};return attachFinalizer(handle);}function ClassHandle_clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this;}else {var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone;}}function ClassHandle_delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError('Object already scheduled for deletion');}detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined;}}function ClassHandle_isDeleted(){return !this.$$.ptr;}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj['delete']();}}function ClassHandle_deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this);}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError('Object already scheduled for deletion');}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes);}this.$$.deleteScheduled=true;return this;}function init_ClassHandle(){ClassHandle.prototype['isAliasOf']=ClassHandle_isAliasOf;ClassHandle.prototype['clone']=ClassHandle_clone;ClassHandle.prototype['delete']=ClassHandle_delete;ClassHandle.prototype['isDeleted']=ClassHandle_isDeleted;ClassHandle.prototype['deleteLater']=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+') - expects one of ('+proto[methodName].overloadTable+')!');}return proto[methodName].overloadTable[arguments.length].apply(this,arguments);};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc;}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice");}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError('Cannot register multiple overloads of a function with the same number of arguments ('+numArguments+')!');}Module[name].overloadTable[numArguments]=value;}else {Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments;}}}function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[];}function upcastPointer(ptr,ptrClass,desiredClass){while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError('Expected null or instance of '+desiredClass.name+', got an instance of '+ptrClass.name);}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass;}return ptr;}function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError('null is not a valid '+this.name);}return 0;}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError('Cannot pass deleted object as a pointer of type '+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr;}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError('null is not a valid '+this.name);}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr);}return ptr;}else {return 0;}}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError('Cannot pass deleted object as a pointer of type '+this.name);}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError('Cannot convert argument of type '+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+' to parameter type '+this.name);}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError('Passing raw pointer to smart pointer is illegal');}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else {throwBindingError('Cannot convert argument of type '+(handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name)+' to parameter type '+this.name);}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr;}else {var clonedHandle=handle['clone']();ptr=this.rawShare(ptr,__emval_register(function(){clonedHandle['delete']();}));if(destructors!==null){destructors.push(this.rawDestructor,ptr);}}break;default:throwBindingError('Unsupporting sharing policy');}}return ptr;}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError('null is not a valid '+this.name);}return 0;}if(!handle.$$){throwBindingError('Cannot pass "'+_embind_repr(handle)+'" as a '+this.name);}if(!handle.$$.ptr){throwBindingError('Cannot pass deleted object as a pointer of type '+this.name);}if(handle.$$.ptrType.isConst){throwBindingError('Cannot convert argument of type '+handle.$$.ptrType.name+' to parameter type '+this.name);}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr;}function simpleReadValueFromPointer(pointer){return this['fromWireType'](HEAPU32[pointer>>2]);}function RegisteredPointer_getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr);}return ptr;}function RegisteredPointer_destructor(ptr){if(this.rawDestructor){this.rawDestructor(ptr);}}function RegisteredPointer_deleteObject(handle){if(handle!==null){handle['delete']();}}function downcastPointer(ptr,ptrClass,desiredClass){if(ptrClass===desiredClass){return ptr;}if(undefined===desiredClass.baseClass){return null;}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null;}return desiredClass.downcast(rv);}function getInheritedInstanceCount(){return Object.keys(registeredInstances).length;}function getLiveInheritedInstances(){var rv=[];for(var k in registeredInstances){if(registeredInstances.hasOwnProperty(k)){rv.push(registeredInstances[k]);}}return rv;}function setDelayFunction(fn){delayFunction=fn;if(deletionQueue.length&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module['getInheritedInstanceCount']=getInheritedInstanceCount;Module['getLiveInheritedInstances']=getLiveInheritedInstances;Module['flushPendingDeletes']=flushPendingDeletes;Module['setDelayFunction']=setDelayFunction;}var registeredInstances={};function getBasestPointer(class_,ptr){if(ptr===undefined){throwBindingError('ptr should not be undefined');}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass;}return ptr;}function getInheritedInstance(class_,ptr){ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr];}function makeClassHandle(prototype,record){if(!record.ptrType||!record.ptr){throwInternalError('makeClassHandle requires ptr and ptrType');}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError('Both smartPtrType and smartPtr must be specified');}record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record}}));}function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null;}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance['clone']();}else {var rv=registeredInstance['clone']();this.destructor(ptr);return rv;}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr});}else {return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr:ptr});}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this);}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType;}else {toType=registeredPointerRecord.pointerType;}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this);}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr});}else {return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp});}}function init_RegisteredPointer(){RegisteredPointer.prototype.getPointee=RegisteredPointer_getPointee;RegisteredPointer.prototype.destructor=RegisteredPointer_destructor;RegisteredPointer.prototype['argPackAdvance']=8;RegisteredPointer.prototype['readValueFromPointer']=simpleReadValueFromPointer;RegisteredPointer.prototype['deleteObject']=RegisteredPointer_deleteObject;RegisteredPointer.prototype['fromWireType']=RegisteredPointer_fromWireType;}function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this['toWireType']=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}else {this['toWireType']=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null;}}else {this['toWireType']=genericPointerToWireType;}}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError('Replacing nonexistant public symbol');}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value;}else {Module[name]=value;Module[name].argCount=numArguments;}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(dynCall){var args=[];for(var i=1;i<signature.length;++i){args.push('a'+i);}var name='dynCall_'+signature+'_'+rawFunction;var body='return function '+name+'('+args.join(', ')+') {\n';body+='    return dynCall(rawFunction'+(args.length?', ':'')+args.join(', ')+');\n';body+='};\n';return new Function('dynCall','rawFunction',body)(dynCall,rawFunction);}var dc=Module['dynCall_'+signature];var fp=makeDynCaller(dc);if(typeof fp!=='function'){throwBindingError('unknown function pointer with signature '+signature+': '+rawFunction);}return fp;}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv;}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return;}if(registeredTypes[type]){return;}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return;}unboundTypes.push(type);seen[type]=true;}types.forEach(visit);throw new UnboundTypeError(message+': '+unboundTypes.map(getTypeName).join([', ']));}function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);if(upcast){upcast=embind__requireFunction(upcastSignature,upcast);}if(downcast){downcast=embind__requireFunction(downcastSignature,downcast);}rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError('Cannot construct '+name+' due to unbound types',[baseClassRawType]);});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],function(base){base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype;}else {basePrototype=ClassHandle.prototype;}var constructor=createNamedFunction(legalFunctionName,function(){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name);}if(undefined===registeredClass.constructor_body){throw new BindingError(name+' has no accessible constructor');}var body=registeredClass.constructor_body[arguments.length];if(undefined===body){throw new BindingError('Tried to invoke ctor of '+name+' with invalid number of parameters ('+arguments.length+') - expected ('+Object.keys(registeredClass.constructor_body).toString()+') parameters instead!');}return body.apply(this,arguments);});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+'*',registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+' const*',registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return [referenceConverter,pointerConverter,constPointerConverter];});}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAP32[(firstElement>>2)+i]);}return array;}function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr);}}function __embind_register_class_constructor(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){assert(argCount>0);var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);var args=[rawConstructor];var destructors=[];whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName='constructor '+classType.name;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[];}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError('Cannot register multiple constructors with identical number of parameters ('+(argCount-1)+") for class '"+classType.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");}classType.registeredClass.constructor_body[argCount-1]=function unboundTypeHandler(){throwUnboundTypeError('Cannot construct '+classType.name+' due to unbound types',rawArgTypes);};whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){classType.registeredClass.constructor_body[argCount-1]=function constructor_body(){if(arguments.length!==argCount-1){throwBindingError(humanName+' called with '+arguments.length+' arguments, expected '+(argCount-1));}destructors.length=0;args.length=argCount;for(var i=1;i<argCount;++i){args[i]=argTypes[i]['toWireType'](destructors,arguments[i-1]);}var ptr=invoker.apply(null,args);runDestructors(destructors);return argTypes[0]['fromWireType'](ptr);};return [];});return [];});}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError('new_ called with constructor type '+typeof constructor+' which is not a function');}var dummy=createNamedFunction(constructor.name||'unknownFunctionName',function(){});dummy.prototype=constructor.prototype;var obj=new dummy();var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj;}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break;}}var returns=argTypes[0].name!=='void';var argsList='';var argsListWired='';for(var i=0;i<argCount-2;++i){argsList+=(i!==0?', ':'')+'arg'+i;argsListWired+=(i!==0?', ':'')+'arg'+i+'Wired';}var invokerFnBody='return function '+makeLegalFunctionName(humanName)+'('+argsList+') {\n'+'if (arguments.length !== '+(argCount-2)+') {\n'+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+'}\n';if(needsDestructorStack){invokerFnBody+='var destructors = [];\n';}var dtorStack=needsDestructorStack?'destructors':'null';var args1=['throwBindingError','invoker','fn','runDestructors','retType','classParam'];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+='var thisWired = classParam.toWireType('+dtorStack+', this);\n';}for(var i=0;i<argCount-2;++i){invokerFnBody+='var arg'+i+'Wired = argType'+i+'.toWireType('+dtorStack+', arg'+i+'); // '+argTypes[i+2].name+'\n';args1.push('argType'+i);args2.push(argTypes[i+2]);}if(isClassMethodFunc){argsListWired='thisWired'+(argsListWired.length>0?', ':'')+argsListWired;}invokerFnBody+=(returns?'var rv = ':'')+'invoker(fn'+(argsListWired.length>0?', ':'')+argsListWired+');\n';if(needsDestructorStack){invokerFnBody+='runDestructors(destructors);\n';}else {for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?'thisWired':'arg'+(i-2)+'Wired';if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+'_dtor('+paramName+'); // '+argTypes[i].name+'\n';args1.push(paramName+'_dtor');args2.push(argTypes[i].destructorFunction);}}}if(returns){invokerFnBody+='var ret = retType.fromWireType(rv);\n'+'return ret;\n';}invokerFnBody+='}\n';args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction;}function __embind_register_class_function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual){var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],function(classType){classType=classType[0];var humanName=classType.name+'.'+methodName;if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName);}function unboundTypesHandler(){throwUnboundTypeError('Cannot call '+humanName+' due to unbound types',rawArgTypes);}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler;}else {ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler;}whenDependentTypesAreResolved([],rawArgTypes,function(argTypes){var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction;}else {proto[methodName].overloadTable[argCount-2]=memberFunction;}return [];});return [];});}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle);}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count;}}return count;}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i];}}return null;}function init_emval(){Module['count_emval_handles']=count_emval_handles;Module['get_first_emval']=get_first_emval;}function __emval_register(value){switch(value){case undefined:{return 1;}case null:{return 2;}case true:{return 3;}case false:{return 4;}default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle;}}}function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,fromWireType:function(handle){var rv=emval_handle_array[handle].value;__emval_decref(handle);return rv;},toWireType:function(destructors,value){return __emval_register(value);},argPackAdvance:8,readValueFromPointer:simpleReadValueFromPointer,destructorFunction:null});}function _embind_repr(v){if(v===null){return 'null';}var t=typeof v;if(t==='object'||t==='array'||t==='function'){return v.toString();}else {return ''+v;}}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this['fromWireType'](HEAPF32[pointer>>2]);};case 3:return function(pointer){return this['fromWireType'](HEAPF64[pointer>>3]);};default:throw new TypeError('Unknown float type: '+name);}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,fromWireType:function(value){return value;},toWireType:function(destructors,value){if(typeof value!=='number'&&typeof value!=='boolean'){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name);}return value;},argPackAdvance:8,readValueFromPointer:floatReadValueFromPointer(name,shift),destructorFunction:null});}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer];}:function readU8FromPointer(pointer){return HEAPU8[pointer];};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1];}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1];};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2];}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2];};default:throw new TypeError('Unknown integer type: '+name);}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295;}var shift=getShiftFromSize(size);var fromWireType=function(value){return value;};if(minRange===0){var bitshift=32-8*size;fromWireType=function(value){return value<<bitshift>>>bitshift;};}var isUnsignedType=name.indexOf('unsigned')!=-1;registerType(primitiveType,{name:name,fromWireType:fromWireType,toWireType:function(destructors,value){if(typeof value!=='number'&&typeof value!=='boolean'){throw new TypeError('Cannot convert "'+_embind_repr(value)+'" to '+this.name);}if(value<minRange||value>maxRange){throw new TypeError('Passing a number "'+_embind_repr(value)+'" from JS side to C/C++ side to an argument of type "'+name+'", which is outside the valid range ['+minRange+', '+maxRange+']!');}return isUnsignedType?value>>>0:value|0;},argPackAdvance:8,readValueFromPointer:integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null});}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(buffer,data,size);}name=readLatin1String(name);registerType(rawType,{name:name,fromWireType:decodeMemoryView,argPackAdvance:8,readValueFromPointer:decodeMemoryView},{ignoreDuplicateRegistrations:true});}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==='std::string';registerType(rawType,{name:name,fromWireType:function(value){var length=HEAPU32[value>>2];var str;if(stdStringIsUTF8){var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i;if(HEAPU8[currentBytePtr]==0||i==length){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment;}else {str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+1;}}}else {var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[value+4+i]);}str=a.join('');}_free(value);return str;},toWireType:function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value);}var getLength;var valueIsOfTypeString=typeof value==='string';if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError('Cannot pass non-string to std::string');}if(stdStringIsUTF8&&valueIsOfTypeString){getLength=function(){return lengthBytesUTF8(value);};}else {getLength=function(){return value.length;};}var length=getLength();var ptr=_malloc(4+length+1);HEAPU32[ptr>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr+4,length+1);}else {if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError('String has UTF-16 code units that do not fit in 8 bits');}HEAPU8[ptr+4+i]=charCode;}}else {for(var i=0;i<length;++i){HEAPU8[ptr+4+i]=value[i];}}}if(destructors!==null){destructors.push(_free,ptr);}return ptr;},argPackAdvance:8,readValueFromPointer:simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var decodeString,encodeString,getHeap,lengthBytesUTF,shift;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;getHeap=function(){return HEAPU16;};shift=1;}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;getHeap=function(){return HEAPU32;};shift=2;}registerType(rawType,{name:name,fromWireType:function(value){var length=HEAPU32[value>>2];var HEAP=getHeap();var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(HEAP[currentBytePtr>>shift]==0||i==length){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment;}else {str+=String.fromCharCode(0);str+=stringSegment;}decodeStartPtr=currentBytePtr+charSize;}}_free(value);return str;},toWireType:function(destructors,value){if(!(typeof value==='string')){throwBindingError('Cannot pass non-string to C++ string type '+name);}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length>>shift;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr);}return ptr;},argPackAdvance:8,readValueFromPointer:simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr);}});}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,argPackAdvance:0,fromWireType:function(){return undefined;},toWireType:function(destructors,o){return undefined;}});}function _abort(){abort();}function _emscripten_get_heap_size(){return HEAPU8.length;}function abortOnCannotGrowMemory(requestedSize){abort('OOM');}function _emscripten_resize_heap(requestedSize){abortOnCannotGrowMemory();}function _llvm_trap(){abort('trap!');}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num);}embind_init_charCodes();BindingError=Module['BindingError']=extendError(Error,'BindingError');InternalError=Module['InternalError']=extendError(Error,'InternalError');init_ClassHandle();init_RegisteredPointer();init_embind();UnboundTypeError=Module['UnboundTypeError']=extendError(Error,'UnboundTypeError');init_emval();function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join('');}var decodeBase64=typeof atob==='function'?atob:function(input){var keyStr='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';var output='';var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,'');do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2);}if(enc4!==64){output=output+String.fromCharCode(chr3);}}while(i<input.length);return output;};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==='boolean'&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,'base64');}catch(_){buf=new Buffer(s,'base64');}return new Uint8Array(buf['buffer'],buf['byteOffset'],buf['byteLength']);}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i);}return bytes;}catch(_){throw new Error('Converting base64 string to bytes failed.');}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return;}return intArrayFromBase64(filename.slice(dataURIPrefix.length));}var asmGlobalArg={Math:Math,Int8Array:Int8Array,Int16Array:Int16Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array,Float32Array:Float32Array,Float64Array:Float64Array};var asmLibraryArg={A:_emscripten_memcpy_big,B:_emscripten_resize_heap,C:_llvm_trap,D:tempDoublePtr,a:abort,b:setTempRet0,c:getTempRet0,d:___cxa_allocate_exception,e:___cxa_begin_catch,f:___cxa_throw,g:___cxa_uncaught_exceptions,h:___exception_addRef,i:___exception_deAdjust,j:___gxx_personality_v0,k:__embind_register_bool,l:__embind_register_class,m:__embind_register_class_constructor,n:__embind_register_class_function,o:__embind_register_emval,p:__embind_register_float,q:__embind_register_integer,r:__embind_register_memory_view,s:__embind_register_std_string,t:__embind_register_std_wstring,u:__embind_register_void,v:__emval_decref,w:__emval_register,x:_abort,y:_embind_repr,z:_emscripten_get_heap_size};var asm=function(global,env,buffer){'use asm';var a=new global.Int8Array(buffer),b=new global.Int16Array(buffer),c=new global.Int32Array(buffer),d=new global.Uint8Array(buffer),e=new global.Uint16Array(buffer),f=new global.Float32Array(buffer),g=new global.Float64Array(buffer),h=env.D|0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0.0,q=global.Math.imul,r=global.Math.clz32,s=env.a,t=env.b,u=env.c,v=env.d,w=env.e,x=env.f,y=env.g,z=env.h,A=env.i,B=env.j,C=env.k,D=env.l,E=env.m,F=env.n,G=env.o,H=env.p,I=env.q,J=env.r,K=env.s,L=env.t,M=env.u,N=env.v,O=env.w,P=env.x,Q=env.y,R=env.z,S=env.A,T=env.B,U=env.C,V=22384,W=5265264,X=0.0;function ia(){em();fm();}function ja(){ka(0);return;}function ka(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;a=V;V=V+16|0;b=a+8|0;d=a;vk();m=xk()|0;g=yk()|0;f=Ak()|0;h=Bk()|0;i=Ck()|0;j=Dk()|0;k=Jk()|0;l=Kk()|0;e=Kk()|0;D(f|0,h|0,i|0,j|0,k|0,9,l|0,m|0,e|0,g|0,6204,Lk()|0,138);Nk(1);c[d>>2]=5;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];Uk(6211,b);c[d>>2]=3;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];cl(6216,b);c[d>>2]=10;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];kl(6225,b);sl();g=ul()|0;e=vl()|0;m=xl()|0;l=yl()|0;k=zl()|0;j=Dk()|0;i=Jk()|0;h=Kk()|0;f=Kk()|0;D(m|0,l|0,k|0,j|0,i|0,11,h|0,g|0,f|0,e|0,6234,Lk()|0,139);Gl(2);c[d>>2]=6;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];Nl(6211,b);c[d>>2]=4;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];Ul(6248,b);c[d>>2]=5;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];Ul(6265,b);c[d>>2]=6;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];Ul(6280,b);c[d>>2]=7;c[d+4>>2]=0;c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];_l(6216,b);V=a;return;}function la(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=V;V=V+32|0;h=e+16|0;f=e+8|0;i=e;g=eq(20)|0;ta(g,b,d);c[i>>2]=0;c[h>>2]=c[i>>2];va(f,g,h);b=c[f>>2]|0;c[f>>2]=c[a>>2];c[a>>2]=b;b=f+4|0;d=a+4|0;g=c[b>>2]|0;c[b>>2]=c[d>>2];c[d>>2]=g;wa(f);d=eq(352)|0;ua(d,c[a>>2]|0);g=a+8|0;c[i>>2]=0;c[h>>2]=c[i>>2];Fa(f,d,h);d=c[f>>2]|0;c[f>>2]=c[g>>2];c[g>>2]=d;g=f+4|0;d=a+12|0;b=c[g>>2]|0;c[g>>2]=c[d>>2];c[d>>2]=b;Ga(f);V=e;return;}function ma(a,b){a=a|0;b=b|0;dd(c[a+8>>2]|0,b);return;}function na(a){a=a|0;a=(Qh(c[a+8>>2]|0)|0)+107|0;return d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24|0;}function oa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=V;V=V+32|0;g=e+16|0;f=e+8|0;h=e;i=eq(12)|0;Rh(i,b,d);c[h>>2]=0;c[g>>2]=c[h>>2];Vh(f,i,g);i=c[f>>2]|0;c[f>>2]=c[a>>2];c[a>>2]=i;i=f+4|0;d=a+4|0;b=c[i>>2]|0;c[i>>2]=c[d>>2];c[d>>2]=b;Wh(f);d=a+8|0;b=eq(12)|0;Sh(b,c[a>>2]|0);c[h>>2]=0;c[g>>2]=c[h>>2];ai(f,b,g);b=c[f>>2]|0;c[f>>2]=c[d>>2];c[d>>2]=b;b=f+4|0;h=a+12|0;i=c[b>>2]|0;c[b>>2]=c[h>>2];c[h>>2]=i;bi(f);Th(f,c[d>>2]|0);d=a+16|0;h=c[f>>2]|0;i=f+4|0;b=c[i>>2]|0;c[f>>2]=0;c[i>>2]=0;c[g>>2]=c[d>>2];c[d>>2]=h;d=a+20|0;c[g+4>>2]=c[d>>2];c[d>>2]=b;Uh(g);Uh(f);V=e;return;}function pa(a,b){a=a|0;b=b|0;var d=0;a=a+16|0;d=c[a>>2]|0;a:do if(d|0)switch(b|0){case 4:{ui(d);break a;}case 8:{vi(d);vi(c[a>>2]|0);break a;}default:break a;}while(0);return;}function qa(a,b){a=a|0;b=b|0;var d=0;d=a+16|0;a=c[d>>2]|0;a:do if(a|0){switch(b|0){case 1:{hj(a);break a;}case 2:{ij(a);break a;}case 8:{ui(a);a=c[d>>2]|0;break;}case 4:break;default:break a;}ui(a);}while(0);return;}function ra(a,b){a=a|0;b=b|0;var d=0;d=a+16|0;a=c[d>>2]|0;a:do if(a|0){switch(b|0){case 1:{Rj(a);break a;}case 2:{Sj(a);break a;}case 8:{vi(a);a=c[d>>2]|0;break;}case 4:break;default:break a;}vi(a);}while(0);return;}function sa(a,b){a=a|0;b=b|0;a=c[a+16>>2]|0;if(a|0)$[c[c[a>>2]>>2]&63](a,b)|0;return;}function ta(b,d,e){b=b|0;d=d|0;e=e|0;c[b>>2]=d;c[b+4>>2]=e;c[b+8>>2]=0;a[b+12>>0]=0;a[b+13>>0]=0;c[b+16>>2]=0;return;}function ua(a,b){a=a|0;b=b|0;c[a>>2]=b;Va(a+4|0,b);Wa(a+247|0);c[a+288>>2]=0;c[a+292>>2]=0;c[a+296>>2]=0;Xa(a+300|0);b=a+312|0;c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;Ya(a+328|0);Za(a);return;}function va(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4296;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;xa(a,e);V=d;return;}function wa(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function xa(a,b){a=a|0;b=b|0;return;}function ya(a){a=a|0;w(a|0)|0;lp();}function za(a){a=a|0;pq(a);jp(a);return;}function Aa(a){a=a|0;a=c[a+12>>2]|0;if(a|0)jp(a);return;}function Ba(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==6407?a+12|0:0)|0;}function Ca(a){a=a|0;Da(a,16);return;}function Da(a,b){a=a|0;b=b|0;Ea(a);return;}function Ea(a){a=a|0;jp(a);return;}function Fa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4324;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Ha(a,e);V=d;return;}function Ga(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function Ha(a,b){a=a|0;b=b|0;return;}function Ia(a){a=a|0;pq(a);jp(a);return;}function Ja(a){a=a|0;a=c[a+12>>2]|0;if(a|0){Ma(a);jp(a);}return;}function Ka(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==6605?a+12|0:0)|0;}function La(a){a=a|0;Da(a,16);return;}function Ma(a){a=a|0;Na(a+320|0);Oa(a+312|0);Pa(a+300|0);Ta(a+288|0);Qa(a+247|0);Ra(a+4|0);return;}function Na(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function Oa(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function Pa(a){a=a|0;Sa(a);return;}function Qa(a){a=a|0;a=a+34|0;a=d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24;if(a|0)gq(a);return;}function Ra(a){a=a|0;Ua(c[a+12>>2]|0);return;}function Sa(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;d=b;if(b|0){c[a+4>>2]=d;Da(b,(c[a+8>>2]|0)-d|0);}return;}function Ta(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;d=b;if(b|0){c[a+4>>2]=d;Da(b,(c[a+8>>2]|0)-d|0);}return;}function Ua(a){a=a|0;er(c[a+-4>>2]|0);return;}function Va(a,b){a=a|0;b=b|0;c[a>>2]=b;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=_a(1048576)|0;return;}function Wa(b){b=b|0;var c=0;c=b+32|0;a[c>>0]=0;a[c+1>>0]=0;b=b+34|0;a[b>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;return;}function Xa(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;return;}function Ya(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;a=a+16|0;c[a>>2]=-1;c[a+4>>2]=-1;return;}function Za(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;i=V;V=V+64|0;g=i+32|0;e=i+56|0;d=i+16|0;h=i;$a(c[b>>2]|0,e,4);mb(g,e,e+4|0);e=lb(6693)|0;f=a[g+11>>0]|0;if((e|0)==((f<<24>>24<0?c[g+4>>2]|0:f&255)|0)){f=(Hq(g,0,-1,6693,e)|0)==0;Cq(g);if(f){e=c[b>>2]|0;c[d>>2]=0;c[d+4>>2]=0;c[d+8>>2]=0;c[d+12>>2]=0;c[g>>2]=c[d>>2];c[g+4>>2]=c[d+4>>2];c[g+8>>2]=c[d+8>>2];c[g+12>>2]=c[d+12>>2];bb(e,g);e=b+20|0;$a(c[b>>2]|0,e,227);cb(b,e);f=db()|0;d=c[f>>2]|0;f=c[f+4>>2]|0;if((d|0)!=(f|0))do{eb(g,d);fb(g,e);gb(g);d=d+24|0;}while((d|0)!=(f|0));hb(b);ib(b);jb(c[b>>2]|0);f=c[b>>2]|0;d=(c[b+116>>2]|0)+8|0;e=h;c[e>>2]=0;c[e+4>>2]=0;e=h+8|0;c[e>>2]=d;c[e+4>>2]=0;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];c[g+12>>2]=c[h+12>>2];bb(f,g);kb(b+4|0);V=i;return;}}else Cq(g);i=v(8)|0;ab(i);x(i|0,2592,8);}function _a(a){a=a|0;var b=0;b=dr(a+68|0)|0;a=b+68&-64;c[a+-4>>2]=b;return a|0;}function $a(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;i=b+13|0;if(!(a[i>>0]|0)){h=b+4|0;f=c[h>>2]|0;j=b+8|0;g=c[j>>2]|0;k=f-g|0;e=(k|0)<(e|0)?k:e;if(e){vr(d|0,(c[b>>2]|0)+g|0,e|0)|0;g=c[j>>2]|0;f=c[h>>2]|0;}k=g+e|0;c[j>>2]=k;c[b+16>>2]=e;if((k|0)>=(f|0))a[i>>0]=1;}else a[b+12>>0]=1;return;}function ab(a){a=a|0;xq(a,6791);c[a>>2]=4352;return;}function bb(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;g=d+8|0;d=c[g>>2]|0;g=c[g+4>>2]|0;e=c[b+4>>2]|0;f=((e|0)<0)<<31>>31;if((g|0)<(f|0)|(g|0)==(f|0)&d>>>0<e>>>0)c[b+8>>2]=d;else a[b+12>>0]=1;return;}function cb(b,c){b=b|0;c=c|0;var d=0.0,e=0.0,f=0,i=0.0,j=0,k=0.0,l=0,m=0.0,n=0,o=0.0;n=c+179|0;a[h>>0]=a[n>>0];a[h+1>>0]=a[n+1>>0];a[h+2>>0]=a[n+2>>0];a[h+3>>0]=a[n+3>>0];a[h+4>>0]=a[n+4>>0];a[h+5>>0]=a[n+5>>0];a[h+6>>0]=a[n+6>>0];a[h+7>>0]=a[n+7>>0];m=+g[h>>3];j=c+187|0;a[h>>0]=a[j>>0];a[h+1>>0]=a[j+1>>0];a[h+2>>0]=a[j+2>>0];a[h+3>>0]=a[j+3>>0];a[h+4>>0]=a[j+4>>0];a[h+5>>0]=a[j+5>>0];a[h+6>>0]=a[j+6>>0];a[h+7>>0]=a[j+7>>0];o=+g[h>>3];b=c+195|0;a[h>>0]=a[b>>0];a[h+1>>0]=a[b+1>>0];a[h+2>>0]=a[b+2>>0];a[h+3>>0]=a[b+3>>0];a[h+4>>0]=a[b+4>>0];a[h+5>>0]=a[b+5>>0];a[h+6>>0]=a[b+6>>0];a[h+7>>0]=a[b+7>>0];i=+g[h>>3];l=c+203|0;a[h>>0]=a[l>>0];a[h+1>>0]=a[l+1>>0];a[h+2>>0]=a[l+2>>0];a[h+3>>0]=a[l+3>>0];a[h+4>>0]=a[l+4>>0];a[h+5>>0]=a[l+5>>0];a[h+6>>0]=a[l+6>>0];a[h+7>>0]=a[l+7>>0];k=+g[h>>3];f=c+211|0;a[h>>0]=a[f>>0];a[h+1>>0]=a[f+1>>0];a[h+2>>0]=a[f+2>>0];a[h+3>>0]=a[f+3>>0];a[h+4>>0]=a[f+4>>0];a[h+5>>0]=a[f+5>>0];a[h+6>>0]=a[f+6>>0];a[h+7>>0]=a[f+7>>0];d=+g[h>>3];c=c+219|0;a[h>>0]=a[c>>0];a[h+1>>0]=a[c+1>>0];a[h+2>>0]=a[c+2>>0];a[h+3>>0]=a[c+3>>0];a[h+4>>0]=a[c+4>>0];a[h+5>>0]=a[c+5>>0];a[h+6>>0]=a[c+6>>0];a[h+7>>0]=a[c+7>>0];e=+g[h>>3];g[h>>3]=o;a[n>>0]=a[h>>0];a[n+1>>0]=a[h+1>>0];a[n+2>>0]=a[h+2>>0];a[n+3>>0]=a[h+3>>0];a[n+4>>0]=a[h+4>>0];a[n+5>>0]=a[h+5>>0];a[n+6>>0]=a[h+6>>0];a[n+7>>0]=a[h+7>>0];g[h>>3]=m;a[l>>0]=a[h>>0];a[l+1>>0]=a[h+1>>0];a[l+2>>0]=a[h+2>>0];a[l+3>>0]=a[h+3>>0];a[l+4>>0]=a[h+4>>0];a[l+5>>0]=a[h+5>>0];a[l+6>>0]=a[h+6>>0];a[l+7>>0]=a[h+7>>0];g[h>>3]=k;a[j>>0]=a[h>>0];a[j+1>>0]=a[h+1>>0];a[j+2>>0]=a[h+2>>0];a[j+3>>0]=a[h+3>>0];a[j+4>>0]=a[h+4>>0];a[j+5>>0]=a[h+5>>0];a[j+6>>0]=a[h+6>>0];a[j+7>>0]=a[h+7>>0];g[h>>3]=i;a[f>>0]=a[h>>0];a[f+1>>0]=a[h+1>>0];a[f+2>>0]=a[h+2>>0];a[f+3>>0]=a[h+3>>0];a[f+4>>0]=a[h+4>>0];a[f+5>>0]=a[h+5>>0];a[f+6>>0]=a[h+6>>0];a[f+7>>0]=a[h+7>>0];g[h>>3]=e;a[b>>0]=a[h>>0];a[b+1>>0]=a[h+1>>0];a[b+2>>0]=a[h+2>>0];a[b+3>>0]=a[h+3>>0];a[b+4>>0]=a[h+4>>0];a[b+5>>0]=a[h+5>>0];a[b+6>>0]=a[h+6>>0];a[b+7>>0]=a[h+7>>0];g[h>>3]=d;a[c>>0]=a[h>>0];a[c+1>>0]=a[h+1>>0];a[c+2>>0]=a[h+2>>0];a[c+3>>0]=a[h+3>>0];a[c+4>>0]=a[h+4>>0];a[c+5>>0]=a[h+5>>0];a[c+6>>0]=a[h+6>>0];a[c+7>>0]=a[h+7>>0];return;}function db(){var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;g=V;V=V+48|0;e=g+24|0;f=g;b=g+44|0;if((a[21440]|0)==0?Tp(21440)|0:0){c[5374]=0;c[5375]=0;c[5376]=0;$p(21440);}if((a[21448]|0)==0?Tp(21448)|0:0)$p(21448);if((c[5374]|0)==(c[5375]|0)){rq(21508);if((c[5374]|0)==(c[5375]|0)){a[e>>0]=a[b>>0]|0;pb(f,e);b=c[5375]|0;do if(b>>>0>=(c[5376]|0)>>>0){b=((b-(c[5374]|0)|0)/24|0)+1|0;d=xb(21496)|0;if(d>>>0<b>>>0)cr(21496);else {h=c[5374]|0;j=((c[5376]|0)-h|0)/24|0;i=j<<1;ub(e,j>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,((c[5375]|0)-h|0)/24|0,21504);d=e+8|0;sb(c[d>>2]|0,f);c[d>>2]=(c[d>>2]|0)+24;vb(21496,e);wb(e);break;}}else {qb(e,21496,1);j=e+4|0;sb(c[j>>2]|0,f);c[j>>2]=(c[j>>2]|0)+24;rb(e);}while(0);gb(f);}sq(21508);}V=g;return 21496;}function eb(a,b){a=a|0;b=b|0;var d=0,e=0;d=b+16|0;e=c[d>>2]|0;do if(e){if((b|0)==(e|0)){e=tb(a)|0;c[a+16>>2]=e;d=c[d>>2]|0;da[c[(c[d>>2]|0)+12>>2]&15](d,e);break;}else {c[a+16>>2]=Z[c[(c[e>>2]|0)+8>>2]&15](e)|0;break;}}else c[a+16>>2]=0;while(0);return;}function fb(a,b){a=a|0;b=b|0;a=c[a+16>>2]|0;if(!a){b=v(4)|0;c[b>>2]=0;Nb(b);x(b|0,4168,131);}else {da[c[(c[a>>2]|0)+24>>2]&15](a,b);return;}}function gb(a){a=a|0;var b=0;b=c[a+16>>2]|0;if((a|0)!=(b|0)){if(b|0)ca[c[(c[b>>2]|0)+20>>2]&255](b);}else ca[c[(c[b>>2]|0)+16>>2]&255](b);return;}function hb(b){b=b|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=V;V=V+96|0;i=q+16|0;o=q;l=q+72|0;j=c[b>>2]|0;m=e[b+114>>1]|0;n=o;c[n>>2]=0;c[n+4>>2]=0;n=o+8|0;c[n>>2]=m;c[n+4>>2]=0;c[i>>2]=c[o>>2];c[i+4>>2]=c[o+4>>2];c[i+8>>2]=c[o+8>>2];c[i+12>>2]=c[o+12>>2];bb(j,i);j=b+120|0;a:do if(c[j>>2]|0){k=i+2|0;m=i+16|0;n=i+20|0;o=i+18|0;g=0;while(1){if(!(Ob(c[b>>2]|0)|0))break a;if(Pb(c[b>>2]|0)|0)break a;$a(c[b>>2]|0,i,54);f=7277;h=k;while(1){if((a[h>>0]|0)!=(a[f>>0]|0))break;h=h+1|0;if((h|0)==(m|0)){p=8;break;}else f=f+1|0;}if((p|0)==8?(p=0,(d[o>>0]|d[o+1>>0]<<8)<<16>>16==22204):0)break;Rb(c[b>>2]|0,(d[n>>0]|d[n+1>>0]<<8)&65535,0,1);g=g+1|0;if(g>>>0>=(c[j>>2]|0)>>>0)break a;}o=(d[n>>0]|d[n+1>>0]<<8)&65535;p=fq(o)|0;$a(c[b>>2]|0,p,o);Qb(b,p);jp(p);p=b+125|0;Tb(l,b+247|0,(d[p>>0]|d[p+1>>0]<<8)&65535);Ub(b+300|0,l)|0;Pa(l);V=q;return;}while(0);q=v(8)|0;Sb(q);x(q|0,2672,8);}function ib(a){a=a|0;var b=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;n=V;V=V+176|0;g=n+40|0;h=n+24|0;b=n+16|0;f=n;k=n+152|0;l=n+136|0;m=n+56|0;j=c[a>>2]|0;i=a+116|0;o=c[i>>2]|0;e=h;c[e>>2]=0;c[e+4>>2]=0;e=h+8|0;c[e>>2]=o;c[e+4>>2]=0;c[g>>2]=c[h>>2];c[g+4>>2]=c[h+4>>2];c[g+8>>2]=c[h+8>>2];c[g+12>>2]=c[h+12>>2];bb(j,g);j=b;c[j>>2]=0;c[j+4>>2]=0;$a(c[a>>2]|0,b,8);if(!(Ob(c[a>>2]|0)|0)){o=v(8)|0;hc(o);x(o|0,2704,8);}e=b;b=c[e>>2]|0;e=c[e+4>>2]|0;if((b|0)==-1&(e|0)==-1){o=v(8)|0;ic(o,7488);x(o|0,2720,8);}o=c[a>>2]|0;j=f;c[j>>2]=0;c[j+4>>2]=0;j=f+8|0;c[j>>2]=b;c[j+4>>2]=e;c[g>>2]=c[f>>2];c[g+4>>2]=c[f+4>>2];c[g+8>>2]=c[f+8>>2];c[g+12>>2]=c[f+12>>2];bb(o,g);if(!(Ob(c[a>>2]|0)|0)){o=v(8)|0;hc(o);x(o|0,2704,8);}$a(c[a>>2]|0,g,8);if(!(Ob(c[a>>2]|0)|0)){o=v(8)|0;hc(o);x(o|0,2704,8);}if(c[g>>2]|0){o=v(8)|0;jc(o);x(o|0,2736,8);}h=a+288|0;j=a+292|0;c[j>>2]=c[h>>2];o=a+259|0;if((d[o>>0]|d[o+1>>0]<<8|d[o+2>>0]<<16|d[o+3>>0]<<24|0)==-1){o=v(8)|0;ic(o,7606);x(o|0,2720,8);}f=g+4|0;kc(h,(c[f>>2]|0)+1|0);o=c[h>>2]|0;c[o>>2]=(c[i>>2]|0)+8;c[o+4>>2]=0;if((c[f>>2]|0)>>>0>1){Va(k,c[a>>2]|0);lc(l,k);mc(m,32,2,8,0);nc(l);oc(m);if(!(c[f>>2]|0)){h=c[h>>2]|0;e=h;}else {e=1;do{if(e>>>0>1)b=c[(c[h>>2]|0)+(e+-1<<3)>>2]|0;else b=0;i=pc(m,l,b,1)|0;b=c[h>>2]|0;o=b+(e<<3)|0;c[o>>2]=i;c[o+4>>2]=((i|0)<0)<<31>>31;e=e+1|0;}while(e>>>0<=(c[f>>2]|0)>>>0);e=b;h=b;}b=c[j>>2]|0;if(b-e>>3>>>0>1){g=b-h>>3;f=h;b=1;e=c[f>>2]|0;f=c[f+4>>2]|0;do{o=h+(b<<3)|0;j=o;e=lr(c[j>>2]|0,c[j+4>>2]|0,e|0,f|0)|0;f=u()|0;c[o>>2]=e;c[o+4>>2]=f;b=b+1|0;}while(b>>>0<g>>>0);}qc(m);rc(l);Ra(k);}V=n;return;}function jb(b){b=b|0;a[b+12>>0]=0;a[b+13>>0]=0;return;}function kb(a){a=a|0;c[a+8>>2]=0;c[a+4>>2]=0;return;}function lb(a){a=a|0;return fo(a)|0;}function mb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;i=V;V=V+16|0;g=d;h=i;f=e-g|0;if(f>>>0>4294967279)yq(b);if(f>>>0<11)a[b+11>>0]=f;else {k=f+16&-16;j=eq(k)|0;c[b>>2]=j;c[b+8>>2]=k|-2147483648;c[b+4>>2]=f;b=j;}if((d|0)!=(e|0)){g=e-g|0;f=b;while(1){nb(f,d);d=d+1|0;if((d|0)==(e|0))break;else f=f+1|0;}b=b+g|0;}a[h>>0]=0;nb(b,h);V=i;return;}function nb(b,c){b=b|0;c=c|0;a[b>>0]=a[c>>0]|0;return;}function ob(a){a=a|0;yp(a);jp(a);return;}function pb(a,b){a=a|0;b=b|0;c[a>>2]=4372;c[a+16>>2]=a;return;}function qb(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;b=c[b+4>>2]|0;c[a+4>>2]=b;c[a+8>>2]=b+(d*24|0);return;}function rb(a){a=a|0;c[(c[a>>2]|0)+4>>2]=c[a+4>>2];return;}function sb(a,b){a=a|0;b=b|0;var d=0,e=0;d=b+16|0;e=c[d>>2]|0;do if(e){if((b|0)==(e|0)){e=tb(a)|0;c[a+16>>2]=e;d=c[d>>2]|0;da[c[(c[d>>2]|0)+12>>2]&15](d,e);break;}else {c[a+16>>2]=e;c[d>>2]=0;break;}}else c[a+16>>2]=0;while(0);return;}function tb(a){a=a|0;return a|0;}function ub(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+12|0;c[f>>2]=0;c[a+16>>2]=e;do if(b){if(b>>>0>178956970){f=v(8)|0;vq(f,6723);c[f>>2]=5956;x(f|0,3928,123);}else {e=eq(b*24|0)|0;break;}}else e=0;while(0);c[a>>2]=e;d=e+(d*24|0)|0;c[a+8>>2]=d;c[a+4>>2]=d;c[f>>2]=e+(b*24|0);return;}function vb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=c[a>>2]|0;j=a+4|0;d=c[j>>2]|0;h=b+4|0;if((d|0)==(i|0)){f=h;g=a;e=c[h>>2]|0;d=i;}else {e=c[h>>2]|0;do{d=d+-24|0;sb(e+-24|0,d);e=(c[h>>2]|0)+-24|0;c[h>>2]=e;}while((d|0)!=(i|0));f=h;g=a;d=c[a>>2]|0;}c[g>>2]=e;c[f>>2]=d;i=b+8|0;h=c[j>>2]|0;c[j>>2]=c[i>>2];c[i>>2]=h;i=a+8|0;j=b+12|0;a=c[i>>2]|0;c[i>>2]=c[j>>2];c[j>>2]=a;c[b>>2]=c[f>>2];return;}function wb(a){a=a|0;var b=0,d=0,e=0,f=0;d=c[a+4>>2]|0;e=a+8|0;b=c[e>>2]|0;if((b|0)!=(d|0))do{f=b+-24|0;c[e>>2]=f;gb(f);b=c[e>>2]|0;}while((b|0)!=(d|0));b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function xb(a){a=a|0;return 178956970;}function yb(a){a=a|0;jp(a);return;}function zb(a){a=a|0;a=eq(8)|0;c[a>>2]=4372;return a|0;}function Ab(a,b){a=a|0;b=b|0;c[b>>2]=4372;return;}function Bb(a){a=a|0;return;}function Cb(a){a=a|0;Da(a,8);return;}function Db(a,b){a=a|0;b=b|0;Hb(a+4|0,b);return;}function Eb(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==7183?a+4|0:0)|0;}function Fb(a){a=a|0;return 2664;}function Gb(a){a=a|0;return;}function Hb(a,b){a=a|0;b=b|0;Ib(a,b);return;}function Ib(b,c){b=b|0;c=c|0;var e=0,f=0;b=c+104|0;c=d[b>>0]|0;e=c>>>7;f=c>>>6&1;if((e|0)==1&(f|0)!=0){f=v(8)|0;Jb(f);x(f|0,2632,8);}if((e|0)==(f|0)){f=v(8)|0;Kb(f);x(f|0,2648,8);}else {a[b>>0]=c&63;return;}}function Jb(a){a=a|0;xq(a,7076);c[a>>2]=4416;return;}function Kb(a){a=a|0;xq(a,7144);c[a>>2]=4436;return;}function Lb(a){a=a|0;yp(a);jp(a);return;}function Mb(a){a=a|0;yp(a);jp(a);return;}function Nb(a){a=a|0;c[a>>2]=6092;return;}function Ob(b){b=b|0;var c=0;c=b+12|0;b=(a[c>>0]|0)==0;a[c>>0]=0;return b|0;}function Pb(b){b=b|0;return (a[b+13>>0]|0)!=0|0;}function Qb(a,b){a=a|0;b=b|0;a=a+247|0;Vb(a,b);if((d[a>>0]|d[a+1>>0]<<8)<<16>>16==2)return;else {b=v(8)|0;Wb(b);x(b|0,2688,8);}}function Rb(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;switch(f|0){case 0:break;case 2:{f=c[b+4>>2]|0;d=lr(lr(d|0,e|0,-1,-1)|0,u()|0,f|0,((f|0)<0)<<31>>31|0)|0;e=u()|0;break;}case 1:{f=c[b+8>>2]|0;d=lr(f|0,((f|0)<0)<<31>>31|0,d|0,e|0)|0;e=u()|0;break;}default:{e=0;d=0;}}g=c[b+4>>2]|0;h=((g|0)<0)<<31>>31;f=b+12|0;if((e|0)<0|((e|0)>(h|0)|(e|0)==(h|0)&d>>>0>=g>>>0))a[f>>0]=1;else {a[f>>0]=0;c[b+8>>2]=d;}return;}function Sb(a){a=a|0;xq(a,7410);c[a>>2]=4476;return;}function Tb(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;h=V;V=V+16|0;g=h;Xa(a);f=b+32|0;if((d[f>>0]|d[f+1>>0]<<8)<<16>>16){e=b+34|0;b=0;do{j=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;k=j+(b*6|0)|0;i=j+(b*6|0)+2|0;j=j+(b*6|0)+4|0;_b(g,(d[k>>0]|d[k+1>>0]<<8)&65535,(d[i>>0]|d[i+1>>0]<<8)&65535,(d[j>>0]|d[j+1>>0]<<8)&65535);Zb(a,g);c=c-((d[i>>0]|d[i+1>>0]<<8)&65535)|0;b=b+1|0;}while(b>>>0<((d[f>>0]|d[f+1>>0]<<8)&65535)>>>0);}if((c|0)<0){k=v(8)|0;Wb(k);x(k|0,2688,8);}if(c|0){_b(g,0,c,2);Zb(a,g);}V=h;return;}function Ub(b,c){b=b|0;c=c|0;var d=0,e=0;d=V;V=V+16|0;e=d+1|0;a[e>>0]=a[d>>0]|0;fc(b,c,e);V=d;return b|0;}function Vb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;f=c+2|0;h=d[c>>0]|d[c+1>>0]<<8;a[b>>0]=h;a[b+1>>0]=h>>8;h=b+2|0;f=d[f>>0]|d[f+1>>0]<<8;a[h>>0]=f;a[h+1>>0]=f>>8;a[b+4>>0]=a[c+4>>0]|0;h=c+6|0;a[b+5>>0]=a[c+5>>0]|0;f=c+8|0;e=b+6|0;h=d[h>>0]|d[h+1>>0]<<8;a[e>>0]=h;a[e+1>>0]=h>>8;e=c+12|0;h=b+8|0;f=d[f>>0]|d[f+1>>0]<<8|d[f+2>>0]<<16|d[f+3>>0]<<24;a[h>>0]=f;a[h+1>>0]=f>>8;a[h+2>>0]=f>>16;a[h+3>>0]=f>>24;h=b+12|0;e=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;a[h>>0]=e;a[h+1>>0]=e>>8;a[h+2>>0]=e>>16;a[h+3>>0]=e>>24;h=c+16|0;e=h;e=d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24;h=h+4|0;h=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;f=b+16|0;i=f;a[i>>0]=e;a[i+1>>0]=e>>8;a[i+2>>0]=e>>16;a[i+3>>0]=e>>24;f=f+4|0;a[f>>0]=h;a[f+1>>0]=h>>8;a[f+2>>0]=h>>16;a[f+3>>0]=h>>24;f=c+32|0;h=c+24|0;i=h;i=d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24;h=h+4|0;h=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24;e=b+24|0;g=e;a[g>>0]=i;a[g+1>>0]=i>>8;a[g+2>>0]=i>>16;a[g+3>>0]=i>>24;e=e+4|0;a[e>>0]=h;a[e+1>>0]=h>>8;a[e+2>>0]=h>>16;a[e+3>>0]=h>>24;e=c+34|0;h=b+32|0;f=d[f>>0]|d[f+1>>0]<<8;a[h>>0]=f;a[h+1>>0]=f>>8;g=b+34|0;b=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;if(!b)b=f;else {gq(b);b=d[h>>0]|d[h+1>>0]<<8;}f=fq((b&65535)*6|0)|0;a[g>>0]=f;a[g+1>>0]=f>>8;a[g+2>>0]=f>>16;a[g+3>>0]=f>>24;if(b<<16>>16?(b=c+36|0,i=d[e>>0]|d[e+1>>0]<<8,a[f>>0]=i,a[f+1>>0]=i>>8,c=c+38|0,i=f+2|0,b=d[b>>0]|d[b+1>>0]<<8,a[i>>0]=b,a[i+1>>0]=b>>8,i=f+4|0,c=d[c>>0]|d[c+1>>0]<<8,a[i>>0]=c,a[i+1>>0]=c>>8,((d[h>>0]|d[h+1>>0]<<8)&65535)>1):0){b=1;do{c=e;e=e+6|0;i=d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24;j=c+8|0;f=i+(b*6|0)|0;k=d[e>>0]|d[e+1>>0]<<8;a[f>>0]=k;a[f+1>>0]=k>>8;c=c+10|0;f=i+(b*6|0)+2|0;j=d[j>>0]|d[j+1>>0]<<8;a[f>>0]=j;a[f+1>>0]=j>>8;i=i+(b*6|0)+4|0;c=d[c>>0]|d[c+1>>0]<<8;a[i>>0]=c;a[i+1>>0]=c>>8;b=b+1|0;}while(b>>>0<((d[h>>0]|d[h+1>>0]<<8)&65535)>>>0);}return;}function Wb(a){a=a|0;xq(a,7354);c[a>>2]=4456;return;}function Xb(a){a=a|0;yp(a);jp(a);return;}function Yb(a){a=a|0;yp(a);jp(a);return;}function Zb(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;i=V;V=V+32|0;f=i;g=a+4|0;d=c[g>>2]|0;h=a+8|0;do if((d|0)==(c[h>>2]|0)){d=((d-(c[a>>2]|0)|0)/12|0)+1|0;e=ec(a)|0;if(e>>>0<d>>>0)cr(a);else {j=c[a>>2]|0;k=((c[h>>2]|0)-j|0)/12|0;h=k<<1;bc(f,k>>>0<e>>>1>>>0?h>>>0<d>>>0?d:h:e,((c[g>>2]|0)-j|0)/12|0,a+8|0);h=f+8|0;g=c[h>>2]|0;c[g>>2]=c[b>>2];c[g+4>>2]=c[b+4>>2];c[g+8>>2]=c[b+8>>2];c[h>>2]=(c[h>>2]|0)+12;cc(a,f);dc(f);break;}}else {$b(f,a,1);k=f+4|0;j=c[k>>2]|0;c[j>>2]=c[b>>2];c[j+4>>2]=c[b+4>>2];c[j+8>>2]=c[b+8>>2];c[k>>2]=(c[k>>2]|0)+12;ac(f);}while(0);V=i;return;}function _b(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=e;return;}function $b(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;b=c[b+4>>2]|0;c[a+4>>2]=b;c[a+8>>2]=b+(d*12|0);return;}function ac(a){a=a|0;c[(c[a>>2]|0)+4>>2]=c[a+4>>2];return;}function bc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+12|0;c[f>>2]=0;c[a+16>>2]=e;do if(b){if(b>>>0>357913941){f=v(8)|0;vq(f,6723);c[f>>2]=5956;x(f|0,3928,123);}else {e=eq(b*12|0)|0;break;}}else e=0;while(0);c[a>>2]=e;d=e+(d*12|0)|0;c[a+8>>2]=d;c[a+4>>2]=d;c[f>>2]=e+(b*12|0);return;}function cc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(((f|0)/-12|0)*12|0)|0;c[g>>2]=d;if((f|0)>0){ur(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0;}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return;}function dc(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~(((e+-12-b|0)>>>0)/12|0)*12|0);b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function ec(a){a=a|0;return 357913941;}function fc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;gc(a);c[a>>2]=c[b>>2];d=b+4|0;c[a+4>>2]=c[d>>2];e=b+8|0;c[a+8>>2]=c[e>>2];c[e>>2]=0;c[d>>2]=0;c[b>>2]=0;return;}function gc(a){a=a|0;var b=0,d=0,e=0,f=0;b=c[a>>2]|0;d=b;if(b|0){e=a+4|0;c[e>>2]=d;f=a+8|0;Da(b,(c[f>>2]|0)-d|0);c[f>>2]=0;c[e>>2]=0;c[a>>2]=0;}return;}function hc(a){a=a|0;xq(a,7660);c[a>>2]=4496;return;}function ic(a,b){a=a|0;b=b|0;xq(a,b);c[a>>2]=4516;return;}function jc(a){a=a|0;xq(a,7704);c[a>>2]=4536;return;}function kc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=a+4|0;f=c[a>>2]|0;e=(c[d>>2]|0)-f>>3;if(e>>>0>=b>>>0){if(e>>>0>b>>>0)c[d>>2]=f+(b<<3);}else vc(a,b-e|0);return;}function lc(a,b){a=a|0;b=b|0;c[a>>2]=b;c[a+4>>2]=0;c[a+8>>2]=-1;return;}function mc(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;c[a+4>>2]=b;c[a+8>>2]=d;c[a+12>>2]=e;c[a+16>>2]=f;c[a+36>>2]=0;c[a+40>>2]=0;c[a+44>>2]=0;Gc(a+48|0);c[a+68>>2]=0;c[a+72>>2]=0;c[a+76>>2]=0;do if(!f){d=a+20|0;if((b+-1|0)>>>0<31){c[d>>2]=b;f=1<<b;c[a+24>>2]=f;d=f>>>1;c[a+28>>2]=0-d;d=f+-1-d|0;break;}else {c[d>>2]=32;c[a+24>>2]=0;c[a+28>>2]=-2147483648;d=2147483647;break;}}else {e=a+20|0;c[e>>2]=0;c[a+24>>2]=f;d=f;g=0;while(1){d=d>>>1;b=g+1|0;if(!d)break;else g=b;}c[e>>2]=(1<<g|0)==(f|0)?g:b;d=f>>>1;c[a+28>>2]=0-d;d=f+-1-d|0;}while(0);c[a+32>>2]=d;c[a>>2]=0;return;}function nc(a){a=a|0;var b=0;b=((Jc(c[a>>2]|0)|0)&255)<<24;b=((Jc(c[a>>2]|0)|0)&255)<<16|b;b=b|((Jc(c[a>>2]|0)|0)&255)<<8;c[a+4>>2]=b|(Jc(c[a>>2]|0)|0)&255;return;}function oc(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;q=V;V=V+64|0;o=q+44|0;p=q;k=a+36|0;l=a+40|0;a:do if((c[k>>2]|0)==(c[l>>2]|0)){m=a+8|0;b:do if(!(c[m>>2]|0))n=a+20|0;else {f=a+20|0;g=a+44|0;h=o+4|0;i=a+44|0;j=o+8|0;e=0;while(1){Oc(p,(c[f>>2]|0)+1|0,0,0);b=c[l>>2]|0;if(b>>>0<(c[g>>2]|0)>>>0){Pc(o,k,1);Rc(c[h>>2]|0,p);c[h>>2]=(c[h>>2]|0)+44;Qc(o);}else {b=((b-(c[k>>2]|0)|0)/44|0)+1|0;d=Vc(k)|0;if(d>>>0<b>>>0)break;r=c[k>>2]|0;t=((c[g>>2]|0)-r|0)/44|0;s=t<<1;Sc(o,t>>>0<d>>>1>>>0?s>>>0<b>>>0?b:s:d,((c[l>>2]|0)-r|0)/44|0,i);Rc(c[j>>2]|0,p);c[j>>2]=(c[j>>2]|0)+44;Tc(k,o);Uc(o);}Ic(p);e=e+1|0;if(e>>>0>=(c[m>>2]|0)>>>0){n=f;break b;}}cr(k);}while(0);if(c[n>>2]|0){h=a+12|0;i=a+68|0;j=a+72|0;k=a+76|0;l=o+4|0;f=a+76|0;g=o+8|0;e=1;while(1){b=c[h>>2]|0;Oc(p,1<<(e>>>0>b>>>0?b:e),0,0);b=c[j>>2]|0;if(b>>>0<(c[k>>2]|0)>>>0){Pc(o,i,1);Rc(c[l>>2]|0,p);c[l>>2]=(c[l>>2]|0)+44;Qc(o);}else {b=((b-(c[i>>2]|0)|0)/44|0)+1|0;d=Vc(i)|0;if(d>>>0<b>>>0)break;t=c[i>>2]|0;r=((c[k>>2]|0)-t|0)/44|0;s=r<<1;Sc(o,r>>>0<d>>>1>>>0?s>>>0<b>>>0?b:s:d,((c[j>>2]|0)-t|0)/44|0,f);Rc(c[g>>2]|0,p);c[g>>2]=(c[g>>2]|0)+44;Tc(i,o);Uc(o);}Ic(p);e=e+1|0;if(e>>>0>(c[n>>2]|0)>>>0)break a;}cr(i);}}while(0);V=q;return;}function pc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;d=(Yc(a,b,(c[a+36>>2]|0)+(e*44|0)|0)|0)+d|0;b=c[a+24>>2]|0;if((d|0)<0)return d+b|0;else return d-(d>>>0<b>>>0?0:b)|0;return 0;}function qc(a){a=a|0;Hc(a+68|0);Hc(a+36|0);return;}function rc(a){a=a|0;return;}function sc(a){a=a|0;yp(a);jp(a);return;}function tc(a){a=a|0;yp(a);jp(a);return;}function uc(a){a=a|0;yp(a);jp(a);return;}function vc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;i=V;V=V+32|0;f=i;g=a+8|0;h=a+4|0;d=c[h>>2]|0;do if((c[g>>2]|0)-d>>3>>>0<b>>>0){d=(d-(c[a>>2]|0)>>3)+b|0;e=Dc(a)|0;if(e>>>0<d>>>0)cr(a);else {j=c[a>>2]|0;k=(c[g>>2]|0)-j|0;g=k>>2;xc(f,k>>3>>>0<e>>>1>>>0?g>>>0<d>>>0?d:g:e,(c[h>>2]|0)-j>>3,a+8|0);yc(f,b);zc(a,f);Ac(f);break;}}else wc(a,b);while(0);V=i;return;}function wc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=V;V=V+16|0;e=f;Bc(e,a,b);a=e+4|0;b=c[a>>2]|0;d=c[e+8>>2]|0;if((b|0)!=(d|0)){d=d+-8-b|0;wr(b|0,0,d+8&-8|0)|0;c[a>>2]=b+((d>>>3)+1<<3);}Cc(e);V=f;return;}function xc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+12|0;c[f>>2]=0;c[a+16>>2]=e;do if(b){if(b>>>0>536870911){f=v(8)|0;vq(f,6723);c[f>>2]=5956;x(f|0,3928,123);}else {e=eq(b<<3)|0;break;}}else e=0;while(0);c[a>>2]=e;d=e+(d<<3)|0;c[a+8>>2]=d;c[a+4>>2]=d;c[f>>2]=e+(b<<3);return;}function yc(a,b){a=a|0;b=b|0;var d=0,e=0;e=V;V=V+16|0;d=e;Ec(d,a+8|0,b);a=c[d>>2]|0;b=c[d+4>>2]|0;if((a|0)!=(b|0)){b=b+-8-a|0;wr(a|0,0,b+8&-8|0)|0;c[d>>2]=a+((b>>>3)+1<<3);}Fc(d);V=e;return;}function zc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;e=c[a>>2]|0;h=a+4|0;g=b+4|0;f=(c[h>>2]|0)-e|0;d=(c[g>>2]|0)+(0-(f>>3)<<3)|0;c[g>>2]=d;if((f|0)>0){ur(d|0,e|0,f|0)|0;e=g;d=c[g>>2]|0;}else e=g;g=c[a>>2]|0;c[a>>2]=d;c[e>>2]=g;g=b+8|0;f=c[h>>2]|0;c[h>>2]=c[g>>2];c[g>>2]=f;g=a+8|0;h=b+12|0;a=c[g>>2]|0;c[g>>2]=c[h>>2];c[h>>2]=a;c[b>>2]=c[e>>2];return;}function Ac(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-8-b|0)>>>3)<<3);b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function Bc(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;b=c[b+4>>2]|0;c[a+4>>2]=b;c[a+8>>2]=b+(d<<3);return;}function Cc(a){a=a|0;c[(c[a>>2]|0)+4>>2]=c[a+4>>2];return;}function Dc(a){a=a|0;return 536870911;}function Ec(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=c[b>>2];c[a+4>>2]=(c[b>>2]|0)+(d<<3);c[a+8>>2]=b;return;}function Fc(a){a=a|0;c[c[a+8>>2]>>2]=c[a>>2];return;}function Gc(a){a=a|0;c[a+12>>2]=1;c[a+16>>2]=2;c[a+8>>2]=4096;c[a+4>>2]=4;c[a>>2]=4;return;}function Hc(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;if(d|0){e=a+4|0;b=c[e>>2]|0;if((b|0)==(d|0))b=d;else {do{b=b+-44|0;Ic(b);}while((b|0)!=(d|0));b=c[a>>2]|0;}c[e>>2]=d;Da(b,(c[a+8>>2]|0)-b|0);}return;}function Ic(a){a=a|0;var b=0;b=c[a+8>>2]|0;if(b|0)Ua(b);b=c[a+12>>2]|0;if(b|0)Ua(b);b=c[a+16>>2]|0;if(b|0)Ua(b);return;}function Jc(b){b=b|0;var d=0,e=0;e=b+4|0;d=c[e>>2]|0;if((d|0)>=(c[b+8>>2]|0)){Kc(b);d=c[e>>2]|0;}b=c[b+12>>2]|0;c[e>>2]=d+1;return a[b+d>>0]|0;}function Kc(a){a=a|0;var b=0;c[a+4>>2]=0;$a(c[a>>2]|0,c[a+12>>2]|0,1048576);b=Lc(c[a>>2]|0)|0;c[a+8>>2]=b;if(!b){b=v(8)|0;Mc(b);x(b|0,2752,8);}else return;}function Lc(a){a=a|0;return c[a+16>>2]|0;}function Mc(a){a=a|0;xq(a,7769);c[a>>2]=4556;return;}function Nc(a){a=a|0;yp(a);jp(a);return;}function Oc(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;c[b>>2]=d;a[b+4>>0]=e&1;h=b+8|0;c[h>>2]=0;i=b+12|0;c[i>>2]=0;g=b+16|0;c[g>>2]=0;if((d+-2|0)>>>0>2046){b=v(8)|0;xq(b,7789);x(b|0,3912,8);}c[b+32>>2]=d+-1;if(d>>>0>16&(e^1)){e=3;while(1)if(1<<e+2>>>0<d>>>0)e=e+1|0;else break;d=1<<e;c[b+36>>2]=d;c[b+40>>2]=15-e;c[g>>2]=_a((d<<2)+8|0)|0;d=c[b>>2]|0;}else {c[g>>2]=0;c[b+40>>2]=0;c[b+36>>2]=0;}c[h>>2]=_a(d<<2)|0;g=_a(c[b>>2]<<2)|0;c[i>>2]=g;c[b+20>>2]=0;d=c[b>>2]|0;e=b+24|0;c[e>>2]=d;d=(d|0)!=0;if(!f){if(d){d=0;do{c[g+(d<<2)>>2]=1;d=d+1|0;}while(d>>>0<(c[b>>2]|0)>>>0);}}else if(d){d=0;do{c[g+(d<<2)>>2]=c[f+(d<<2)>>2];d=d+1|0;}while(d>>>0<(c[b>>2]|0)>>>0);}Xc(b);f=((c[b>>2]|0)+6|0)>>>1;c[e>>2]=f;c[b+28>>2]=f;return;}function Pc(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;b=c[b+4>>2]|0;c[a+4>>2]=b;c[a+8>>2]=b+(d*44|0);return;}function Qc(a){a=a|0;c[(c[a>>2]|0)+4>>2]=c[a+4>>2];return;}function Rc(b,d){b=b|0;d=d|0;var e=0;c[b>>2]=c[d>>2];a[b+4>>0]=a[d+4>>0]|0;e=d+8|0;c[b+8>>2]=c[e>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[e>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;return;}function Sc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+12|0;c[f>>2]=0;c[a+16>>2]=e;do if(b){if(b>>>0>97612893){f=v(8)|0;vq(f,6723);c[f>>2]=5956;x(f|0,3928,123);}else {e=eq(b*44|0)|0;break;}}else e=0;while(0);c[a>>2]=e;d=e+(d*44|0)|0;c[a+8>>2]=d;c[a+4>>2]=d;c[f>>2]=e+(b*44|0);return;}function Tc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=c[a>>2]|0;j=a+4|0;d=c[j>>2]|0;h=b+4|0;if((d|0)==(i|0)){f=h;g=a;e=c[h>>2]|0;d=i;}else {e=c[h>>2]|0;do{d=d+-44|0;Wc(e+-44|0,d);e=(c[h>>2]|0)+-44|0;c[h>>2]=e;}while((d|0)!=(i|0));f=h;g=a;d=c[a>>2]|0;}c[g>>2]=e;c[f>>2]=d;i=b+8|0;h=c[j>>2]|0;c[j>>2]=c[i>>2];c[i>>2]=h;i=a+8|0;j=b+12|0;a=c[i>>2]|0;c[i>>2]=c[j>>2];c[j>>2]=a;c[b>>2]=c[f>>2];return;}function Uc(a){a=a|0;var b=0,d=0,e=0,f=0;d=c[a+4>>2]|0;e=a+8|0;b=c[e>>2]|0;if((b|0)!=(d|0))do{f=b+-44|0;c[e>>2]=f;Ic(f);b=c[e>>2]|0;}while((b|0)!=(d|0));b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function Vc(a){a=a|0;return 97612893;}function Wc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=c[d>>2]|0;c[b>>2]=e;a[b+4>>0]=a[d+4>>0]|0;c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];h=b+36|0;c[h>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];e=e<<2;f=_a(e)|0;c[b+8>>2]=f;g=c[b>>2]|0;if(g|0)vr(f|0,c[d+8>>2]|0,g<<2|0)|0;e=_a(e)|0;c[b+12>>2]=e;f=c[b>>2]|0;if(f|0)vr(e|0,c[d+12>>2]|0,f<<2|0)|0;e=c[h>>2]|0;if(e){f=_a((e<<2)+8|0)|0;c[b+16>>2]=f;e=(c[h>>2]<<2)+8|0;if(e|0)vr(f|0,c[d+16>>2]|0,e|0)|0;}else c[b+16>>2]=0;return;}function Xc(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,r=0;r=b+24|0;g=b+20|0;d=(c[g>>2]|0)+(c[r>>2]|0)|0;c[g>>2]=d;if(d>>>0>32768){c[g>>2]=0;if(!(c[b>>2]|0))d=0;else {f=c[b+12>>2]|0;e=0;do{n=f+(e<<2)|0;d=((c[n>>2]|0)+1|0)>>>1;c[n>>2]=d;d=(c[g>>2]|0)+d|0;c[g>>2]=d;e=e+1|0;}while(e>>>0<(c[b>>2]|0)>>>0);}}n=2147483648/(d>>>0)|0;do if((a[b+4>>0]|0)==0?(o=b+36|0,(c[o>>2]|0)!=0):0){if(c[b>>2]|0){j=c[b+8>>2]|0;k=c[b+12>>2]|0;l=b+40|0;m=b+16|0;d=0;h=0;i=0;do{e=(q(h,n)|0)>>>16;c[j+(i<<2)>>2]=e;h=(c[k+(i<<2)>>2]|0)+h|0;e=e>>>(c[l>>2]|0);if(d>>>0<e>>>0){f=i+-1|0;g=c[m>>2]|0;do{d=d+1|0;c[g+(d<<2)>>2]=f;}while((d|0)!=(e|0));d=e;}i=i+1|0;}while(i>>>0<(c[b>>2]|0)>>>0);e=c[m>>2]|0;c[e>>2]=0;if(d>>>0>(c[o>>2]|0)>>>0){d=b;break;}}else {e=c[b+16>>2]|0;c[e>>2]=0;d=0;}do{d=d+1|0;c[e+(d<<2)>>2]=(c[b>>2]|0)+-1;}while(d>>>0<=(c[o>>2]|0)>>>0);d=b;}else p=7;while(0);if((p|0)==7)if(!(c[b>>2]|0))d=b;else {f=c[b+8>>2]|0;g=c[b+12>>2]|0;d=0;e=0;do{c[f+(d<<2)>>2]=(q(e,n)|0)>>>16;e=(c[g+(d<<2)>>2]|0)+e|0;d=d+1|0;}while(d>>>0<(c[b>>2]|0)>>>0);d=b;}p=((c[r>>2]|0)*5|0)>>>2;o=(c[d>>2]<<3)+48|0;p=p>>>0>o>>>0?o:p;c[r>>2]=p;c[b+28>>2]=p;return;}function Yc(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;d=Zc(b,d)|0;c[a>>2]=d;do if(d){if(d>>>0>=32){d=c[a+28>>2]|0;break;}e=c[a+12>>2]|0;if(d>>>0>e>>>0){e=d-e|0;d=Zc(b,(c[a+68>>2]|0)+((d+-1|0)*44|0)|0)|0;e=d<<e|(_c(b,e)|0);}else e=Zc(b,(c[a+68>>2]|0)+((d+-1|0)*44|0)|0)|0;d=c[a>>2]|0;if((e|0)<(1<<d+-1|0)){d=e+1+(-1<<d)|0;break;}else {d=e+1|0;break;}}else d=$c(b,a+48|0)|0;while(0);return d|0;}function Zc(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;n=a+8|0;m=c[n>>2]|0;f=c[b+16>>2]|0;if(f){e=a+4|0;d=c[e>>2]|0;l=m>>>15;c[n>>2]=l;j=(d>>>0)/(l>>>0)|0;i=j>>>(c[b+40>>2]|0);g=c[f+(i<<2)>>2]|0;i=(c[f+(i+1<<2)>>2]|0)+1|0;h=g+1|0;k=c[b+8>>2]|0;if(i>>>0>h>>>0){f=g;g=i;do{h=(g+f|0)>>>1;i=(c[k+(h<<2)>>2]|0)>>>0>j>>>0;f=i?f:h;g=i?h:g;h=f+1|0;}while(g>>>0>h>>>0);g=f;}f=q(c[k+(g<<2)>>2]|0,l)|0;if((g|0)==(c[b+32>>2]|0))h=m;else h=q(c[k+(h<<2)>>2]|0,l)|0;}else {k=m>>>15;c[n>>2]=k;i=c[b>>2]|0;l=c[b+8>>2]|0;e=a+4|0;d=c[e>>2]|0;j=i>>>1;f=0;h=m;g=0;do{o=q(c[l+(j<<2)>>2]|0,k)|0;m=o>>>0>d>>>0;h=m?o:h;f=m?f:o;g=m?g:j;i=m?j:i;j=(g+i|0)>>>1;}while((j|0)!=(g|0));}c[e>>2]=d-f;o=h-f|0;c[n>>2]=o;if(o>>>0<16777216)ad(a);n=(c[b+12>>2]|0)+(g<<2)|0;c[n>>2]=(c[n>>2]|0)+1;n=b+28|0;o=(c[n>>2]|0)+-1|0;c[n>>2]=o;if(!o)Xc(b);return g|0;}function _c(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;if(b>>>0>19){d=(bd(a)|0)&65535;return (_c(a,b+-16|0)|0)<<16|d|0;}e=a+4|0;f=c[e>>2]|0;g=a+8|0;d=(c[g>>2]|0)>>>b;c[g>>2]=d;b=(f>>>0)/(d>>>0)|0;c[e>>2]=f-(q(b,d)|0);if(d>>>0<16777216)ad(a);return b|0;}function $c(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=a+8|0;f=c[e>>2]|0;d=q(f>>>13,c[b+8>>2]|0)|0;g=a+4|0;h=c[g>>2]|0;i=h>>>0>=d>>>0;if(i){c[g>>2]=h-d;d=f-d|0;c[e>>2]=d;}else {c[e>>2]=d;h=b+12|0;c[h>>2]=(c[h>>2]|0)+1;}if(d>>>0<16777216)ad(a);h=b+4|0;a=(c[h>>2]|0)+-1|0;c[h>>2]=a;if(!a)cd(b);return i&1|0;}function ad(a){a=a|0;var b=0,d=0,e=0,f=0;b=a+4|0;d=a+8|0;e=c[b>>2]|0;do{e=e<<8|(Jc(c[a>>2]|0)|0)&255;c[b>>2]=e;f=c[d>>2]<<8;c[d>>2]=f;}while(f>>>0<16777216);return;}function bd(a){a=a|0;var b=0,d=0,e=0,f=0;d=a+4|0;f=c[d>>2]|0;b=a+8|0;e=(c[b>>2]|0)>>>16;c[b>>2]=e;b=(f>>>0)/(e>>>0)|0;c[d>>2]=f-(q(b,e)|0);ad(a);return b&65535|0;}function cd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;f=c[a>>2]|0;d=a+16|0;b=(c[d>>2]|0)+f|0;c[d>>2]=b;if(b>>>0>8192){e=(b+1|0)>>>1;c[d>>2]=e;g=a+12|0;b=((c[g>>2]|0)+1|0)>>>1;c[g>>2]=b;if((b|0)==(e|0)){b=e+1|0;c[d>>2]=b;d=b;b=e;}else d=e;}else {d=b;b=c[a+12>>2]|0;}c[a+8>>2]=(q(b,2147483648/(d>>>0)|0)|0)>>>18;g=f*5|0;g=g>>>0>259?64:g>>>2;c[a>>2]=g;c[a+4>>2]=g;return;}function dd(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;m=V;V=V+32|0;h=m+16|0;i=m+8|0;j=m;k=a+336|0;f=k;g=a+259|0;if(!((c[f+4>>2]|0)==0?(c[f>>2]|0)==(d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24|0):0)){f=a+320|0;e=c[f>>2]|0;g=e;if(!((e|0)!=0?(c[a+312>>2]|0)!=0:0)){e=g;l=5;}}else {f=a+320|0;e=c[a+320>>2]|0;l=5;}if((l|0)==5){l=a+320|0;c[h>>2]=e;c[l>>2]=0;e=a+324|0;c[h+4>>2]=c[e>>2];c[e>>2]=0;Na(h);g=a+312|0;c[h>>2]=c[g>>2];c[g>>2]=0;n=a+316|0;c[h+4>>2]=c[n>>2];c[n>>2]=0;Oa(h);o=eq(12)|0;lc(o,a+4|0);c[j>>2]=0;c[h>>2]=c[j>>2];fd(i,o,h);o=c[i>>2]|0;c[i>>2]=c[g>>2];c[g>>2]=o;o=i+4|0;j=c[o>>2]|0;c[o>>2]=c[n>>2];c[n>>2]=j;Oa(i);ed(i,c[g>>2]|0,a+300|0);g=c[i>>2]|0;n=i+4|0;j=c[n>>2]|0;c[i>>2]=0;c[n>>2]=0;c[h>>2]=c[l>>2];c[l>>2]=g;c[h+4>>2]=c[e>>2];c[e>>2]=j;Na(h);Na(i);e=a+328|0;j=e;j=lr(c[j>>2]|0,c[j+4>>2]|0,1,0)|0;l=u()|0;c[e>>2]=j;c[e+4>>2]=l;e=k;c[e>>2]=0;c[e+4>>2]=0;e=c[f>>2]|0;}$[c[c[e>>2]>>2]&63](e,b)|0;l=k;l=lr(c[l>>2]|0,c[l+4>>2]|0,1,0)|0;n=u()|0;o=k;c[o>>2]=l;c[o+4>>2]=n;V=m;return;}function ed(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=V;V=V+64|0;e=h+56|0;f=h;g=ld(d)|0;if((g|0)==-1){h=v(8)|0;md(h);x(h|0,2784,8);}d=nd(d)|0;a:do if(!d)switch(g|0){case 0:{g=eq(4788)|0;xd(g);wd(a,b,g);break a;}case 1:{g=eq(5116)|0;zd(g);yd(a,b,g);break a;}case 2:{g=eq(5104)|0;Bd(g);Ad(a,b,g);break a;}case 3:{g=eq(5432)|0;Dd(g);Cd(a,b,g);break a;}default:{c[a>>2]=0;c[a+4>>2]=0;break a;}}else {od(e,b);pd(c[e>>2]|0);if((g|2|0)==3)qd(c[e>>2]|0);if((g|1|0)==3)rd(c[e>>2]|0);g=c[e>>2]|0;td(f,d);sd(g,f);ud(f);c[a>>2]=c[e>>2];g=e+4|0;c[a+4>>2]=c[g>>2];c[e>>2]=0;c[g>>2]=0;vd(e);}while(0);V=h;return;}function fd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4576;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;gd(a,e);V=d;return;}function gd(a,b){a=a|0;b=b|0;return;}function hd(a){a=a|0;pq(a);jp(a);return;}function id(a){a=a|0;a=c[a+12>>2]|0;if(a|0){rc(a);jp(a);}return;}function jd(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==7983?a+12|0:0)|0;}function kd(a){a=a|0;Da(a,16);return;}function ld(a){a=a|0;var b=0,d=0;b=(c[a+4>>2]|0)-(c[a>>2]|0)|0;a:do if(((b|0)!=0?(d=((b|0)/12|0)+(((nd(a)|0)!=0)<<31>>31)|0,(d|0)!=0):0)?(b=c[a>>2]|0,!(Ed(b,Fd()|0)|0)):0){switch(d|0){case 1:{a=0;break a;}case 2:{if(Gd((c[a>>2]|0)+12|0,Hd()|0)|0){a=1;break a;}if(Gd((c[a>>2]|0)+12|0,Id()|0)|0){a=2;break a;}break;}case 3:{if(Gd((c[a>>2]|0)+12|0,Hd()|0)|0?(d=(c[a>>2]|0)+24|0,Gd(d,Id()|0)|0):0){a=3;break a;}break;}default:{}}a=-1;}else a=-1;while(0);return a|0;}function md(a){a=a|0;xq(a,8131);c[a>>2]=4604;return;}function nd(a){a=a|0;var b=0,d=0;b=c[a+4>>2]|0;if(((b|0)!=(c[a>>2]|0)?(d=b,(c[d+-12>>2]|0)==0):0)?(c[d+-4>>2]|0)==2:0)a=c[d+-8>>2]|0;else a=0;return a|0;}function od(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=V;V=V+16|0;e=d+4|0;g=d;f=eq(24)|0;Kd(f,b);c[g>>2]=0;c[e>>2]=c[g>>2];Ld(a,f,e);V=d;return;}function pd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(4792)|0;Zd(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];_d(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function qd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(336)|0;af(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];bf(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function rd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(324)|0;Af(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];Bf(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function sd(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;h=j+12|0;i=j;e=j+8|0;g=eq(64)|0;Qf(g,c[a+4>>2]|0,b);f=a+8|0;c[e>>2]=0;c[h>>2]=c[e>>2];Rf(i,g,h);g=a+12|0;b=c[g>>2]|0;e=a+16|0;do if(b>>>0>=(c[e>>2]|0)>>>0){b=(b-(c[f>>2]|0)>>3)+1|0;d=ee(f)|0;if(d>>>0<b>>>0)cr(f);else {k=c[f>>2]|0;l=(c[e>>2]|0)-k|0;e=l>>2;be(h,l>>3>>>0<d>>>1>>>0?e>>>0<b>>>0?b:e:d,(c[g>>2]|0)-k>>3,a+16|0);a=h+8|0;g=c[a>>2]|0;c[g>>2]=c[i>>2];e=i+4|0;c[g+4>>2]=c[e>>2];c[i>>2]=0;c[e>>2]=0;c[a>>2]=g+8;ce(f,h);de(h);break;}}else {$d(h,f,1);l=h+4|0;k=c[l>>2]|0;c[k>>2]=c[i>>2];a=i+4|0;c[k+4>>2]=c[a>>2];c[i>>2]=0;c[a>>2]=0;c[l>>2]=k+8;ae(h);}while(0);Sd(i);V=j;return;}function td(b,d){b=b|0;d=d|0;var e=0,f=0;e=V;V=V+48|0;f=e;c[b>>2]=d;a[b+4>>0]=0;Jg(b+8|0,d);Jg(b+20|0,d);Oc(f,256,0,0);Kg(b+32|0,d,f);Ic(f);V=e;return;}function ud(a){a=a|0;Ng(a+32|0);_f(a+20|0);_f(a+8|0);return;}function vd(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function wd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=V;V=V+16|0;f=e+4|0;h=e;g=eq(12)|0;Og(g,b,d);c[h>>2]=0;c[f>>2]=c[h>>2];Pg(a,g,f);V=e;return;}function xd(a){a=a|0;ge(a);$g(a+4784|0);return;}function yd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=V;V=V+16|0;f=e+4|0;h=e;g=eq(12)|0;ah(g,b,d);c[h>>2]=0;c[f>>2]=c[h>>2];bh(a,g,f);V=e;return;}function zd(a){a=a|0;ge(a);nh(a+4784|0);return;}function Ad(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=V;V=V+16|0;f=e+4|0;h=e;g=eq(12)|0;oh(g,b,d);c[h>>2]=0;c[f>>2]=c[h>>2];ph(a,g,f);V=e;return;}function Bd(a){a=a|0;ge(a);Bh(a+4784|0);return;}function Cd(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=V;V=V+16|0;f=e+4|0;h=e;g=eq(12)|0;Ch(g,b,d);c[h>>2]=0;c[f>>2]=c[h>>2];Dh(a,g,f);V=e;return;}function Dd(a){a=a|0;ge(a);Ph(a+4784|0);return;}function Ed(a,b){a=a|0;b=b|0;return (Gd(a,b)|0)^1|0;}function Fd(){if((a[21456]|0)==0?Tp(21456)|0:0){_b(21536,6,20,2);$p(21456);}return 21536;}function Gd(a,b){a=a|0;b=b|0;if((c[a>>2]|0)==(c[b>>2]|0)?(c[a+8>>2]|0)==(c[b+8>>2]|0):0)a=(c[a+4>>2]|0)==(c[b+4>>2]|0);else a=0;return a|0;}function Hd(){if((a[21464]|0)==0?Tp(21464)|0:0){_b(21548,7,8,2);$p(21464);}return 21548;}function Id(){if((a[21472]|0)==0?Tp(21472)|0:0){_b(21560,8,6,2);$p(21472);}return 21560;}function Jd(a){a=a|0;yp(a);jp(a);return;}function Kd(b,d){b=b|0;d=d|0;Md(b);c[b>>2]=4624;c[b+4>>2]=d;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;a[b+20>>0]=1;return;}function Ld(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4664;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Ud(a,e);V=d;return;}function Md(a){a=a|0;c[a>>2]=4644;return;}function Nd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=V;V=V+16|0;h=k;e=c[b+8>>2]|0;i=c[b+12>>2]|0;if((e|0)!=(i|0)){j=h+4|0;do{f=c[e>>2]|0;c[h>>2]=f;g=c[e+4>>2]|0;c[j>>2]=g;if(g|0){g=g+4|0;c[g>>2]=(c[g>>2]|0)+1;}d=$[c[(c[f>>2]|0)+12>>2]&63](f,d)|0;Sd(h);e=e+8|0;}while((e|0)!=(i|0));}e=b+20|0;if(a[e>>0]|0){a[e>>0]=0;nc(c[b+4>>2]|0);}V=k;return d|0;}function Od(a){a=a|0;c[a>>2]=4624;Td(a+8|0);Qd(a);return;}function Pd(a){a=a|0;Od(a);jp(a);return;}function Qd(a){a=a|0;return;}function Rd(a){a=a|0;U();}function Sd(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function Td(a){a=a|0;var b=0,d=0,e=0;d=c[a>>2]|0;if(d|0){e=a+4|0;b=c[e>>2]|0;if((b|0)==(d|0))b=d;else {do{b=b+-8|0;Sd(b);}while((b|0)!=(d|0));b=c[a>>2]|0;}c[e>>2]=d;Da(b,(c[a+8>>2]|0)-b|0);}return;}function Ud(a,b){a=a|0;b=b|0;return;}function Vd(a){a=a|0;pq(a);jp(a);return;}function Wd(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+8>>2]&255](a);return;}function Xd(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==8546?a+12|0:0)|0;}function Yd(a){a=a|0;Da(a,16);return;}function Zd(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=4692;c[a+4>>2]=b;ge(a+8|0);return;}function _d(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4740;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function $d(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;b=c[b+4>>2]|0;c[a+4>>2]=b;c[a+8>>2]=b+(d<<3);return;}function ae(a){a=a|0;c[(c[a>>2]|0)+4>>2]=c[a+4>>2];return;}function be(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+12|0;c[f>>2]=0;c[a+16>>2]=e;do if(b){if(b>>>0>536870911){f=v(8)|0;vq(f,6723);c[f>>2]=5956;x(f|0,3928,123);}else {e=eq(b<<3)|0;break;}}else e=0;while(0);c[a>>2]=e;d=e+(d<<3)|0;c[a+8>>2]=d;c[a+4>>2]=d;c[f>>2]=e+(b<<3);return;}function ce(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;i=c[a>>2]|0;j=a+4|0;d=c[j>>2]|0;h=b+4|0;if((d|0)==(i|0)){f=h;g=a;e=c[h>>2]|0;d=i;}else {e=c[h>>2]|0;do{g=d;d=d+-8|0;c[e+-8>>2]=c[d>>2];g=g+-4|0;c[e+-4>>2]=c[g>>2];c[d>>2]=0;c[g>>2]=0;e=(c[h>>2]|0)+-8|0;c[h>>2]=e;}while((d|0)!=(i|0));f=h;g=a;d=c[a>>2]|0;}c[g>>2]=e;c[f>>2]=d;i=b+8|0;h=c[j>>2]|0;c[j>>2]=c[i>>2];c[i>>2]=h;i=a+8|0;j=b+12|0;a=c[i>>2]|0;c[i>>2]=c[j>>2];c[j>>2]=a;c[b>>2]=c[f>>2];return;}function de(a){a=a|0;var b=0,d=0,e=0,f=0;d=c[a+4>>2]|0;e=a+8|0;b=c[e>>2]|0;if((b|0)!=(d|0))do{f=b+-8|0;c[e>>2]=f;Sd(f);b=c[e>>2]|0;}while((b|0)!=(d|0));b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function ee(a){a=a|0;return 536870911;}function fe(a){a=a|0;c[a>>2]=4716;return;}function ge(b){b=b|0;oe(b);pe(b+3980|0);qe(b+4380|0);a[b+4780>>0]=0;a[b+4781>>0]=0;return;}function he(a){a=a|0;c[a>>2]=4692;ze(a+8|0);le(a);return;}function ie(a){a=a|0;he(a);jp(a);return;}function je(a,b){a=a|0;b=b|0;return b|0;}function ke(a,b){a=a|0;b=b|0;return Be(a+8|0,c[a+4>>2]|0,b)|0;}function le(a){a=a|0;return;}function me(a){a=a|0;le(a);jp(a);return;}function ne(a,b){a=a|0;b=b|0;return b|0;}function oe(d){d=d|0;var e=0,f=0;te(d);ue(d+52|0);ue(d+436|0);Oc(d+852|0,64,0,0);a[d+3976>>0]=0;e=d+20|0;f=e+32|0;do{b[e>>1]=0;e=e+2|0;}while((e|0)<(f|0));e=eq(44)|0;Oc(e,256,0,0);c[d+896>>2]=e;e=eq(44)|0;Oc(e,256,0,0);c[d+900>>2]=e;e=d+820|0;c[e>>2]=0;c[e+4>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e+16>>2]=0;c[e+20>>2]=0;c[e+24>>2]=0;c[e+28>>2]=0;e=0;do{f=eq(44)|0;Oc(f,256,0,0);c[d+904+(e<<2)>>2]=f;f=eq(44)|0;Oc(f,256,0,0);c[d+1928+(e<<2)>>2]=f;f=eq(44)|0;Oc(f,256,0,0);c[d+2952+(e<<2)>>2]=f;e=e+1|0;}while(e>>>0<256);return;}function pe(a){a=a|0;xe(a,16,4,8,0);xe(a+80|0,16,1,8,0);xe(a+160|0,32,2,8,0);xe(a+240|0,32,22,8,0);xe(a+320|0,32,20,8,0);return;}function qe(a){a=a|0;mc(a,16,4,8,0);mc(a+80|0,16,1,8,0);mc(a+160|0,32,2,8,0);mc(a+240|0,32,22,8,0);mc(a+320|0,32,20,8,0);return;}function re(a){a=a|0;ye(a+320|0);ye(a+240|0);ye(a+160|0);ye(a+80|0);ye(a);return;}function se(a){a=a|0;var b=0,d=0;b=c[a+896>>2]|0;if(b|0){Ic(b);jp(b);}b=c[a+900>>2]|0;if(b|0){Ic(b);jp(b);}d=0;do{b=c[a+904+(d<<2)>>2]|0;if(b|0){Ic(b);jp(b);}b=c[a+1928+(d<<2)>>2]|0;if(b|0){Ic(b);jp(b);}b=c[a+2952+(d<<2)>>2]|0;if(b|0){Ic(b);jp(b);}d=d+1|0;}while((d|0)!=256);Ic(a+852|0);return;}function te(b){b=b|0;var c=0;a[b>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;c=b+4|0;a[c>>0]=0;a[c+1>>0]=0;a[c+2>>0]=0;a[c+3>>0]=0;b=b+12|0;c=b;a[c>>0]=0;a[c+1>>0]=0;a[c+2>>0]=0;a[c+3>>0]=0;b=b+4|0;a[b>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;return;}function ue(a){a=a|0;var b=0;b=a+384|0;do{ve(a);a=a+24|0;}while((a|0)!=(b|0));return;}function ve(a){a=a|0;we(a);return;}function we(b){b=b|0;c[b>>2]=0;c[b+4>>2]=0;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;a[b+20>>0]=1;return;}function xe(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0;c[a+4>>2]=b;c[a+8>>2]=d;c[a+12>>2]=e;c[a+16>>2]=f;c[a+36>>2]=0;c[a+40>>2]=0;c[a+44>>2]=0;Gc(a+48|0);c[a+68>>2]=0;c[a+72>>2]=0;c[a+76>>2]=0;do if(!f){d=a+20|0;if((b+-1|0)>>>0<31){c[d>>2]=b;f=1<<b;c[a+24>>2]=f;d=f>>>1;c[a+28>>2]=0-d;d=f+-1-d|0;break;}else {c[d>>2]=32;c[a+24>>2]=0;c[a+28>>2]=-2147483648;d=2147483647;break;}}else {e=a+20|0;c[e>>2]=0;c[a+24>>2]=f;d=f;g=0;while(1){d=d>>>1;b=g+1|0;if(!d)break;else g=b;}c[e>>2]=(1<<g|0)==(f|0)?g:b;d=f>>>1;c[a+28>>2]=0-d;d=f+-1-d|0;}while(0);c[a+32>>2]=d;c[a>>2]=0;return;}function ye(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;g=a+36|0;d=c[g>>2]|0;e=a+40|0;b=c[e>>2]|0;if((b|0)!=(d|0))do{b=b+-44|0;Ic(b);}while((b|0)!=(d|0));c[e>>2]=d;e=a+68|0;f=c[e>>2]|0;d=a+72|0;b=c[d>>2]|0;if((b|0)!=(f|0))do{b=b+-44|0;Ic(b);}while((b|0)!=(f|0));c[d>>2]=f;Hc(e);Hc(g);return;}function ze(a){a=a|0;Ae(a+4380|0);re(a+3980|0);se(a);return;}function Ae(a){a=a|0;qc(a+320|0);qc(a+240|0);qc(a+160|0);qc(a+80|0);qc(a);return;}function Be(f,g,h){f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=V;V=V+32|0;o=p;i=f+4781|0;if(!(a[i>>0]|0)){Ce(f+4380|0);a[i>>0]=1;}i=f+3976|0;if(!(a[i>>0]|0)){a[i>>0]=1;Ee(De(g)|0,h,20);Fe(o,h);k=f;i=o;j=k+20|0;do{a[k>>0]=a[i>>0]|0;k=k+1|0;i=i+1|0;}while((k|0)<(j|0));b[f+12>>1]=0;}else {m=Zc(g,f+852|0)|0;if(m){if(m&32|0)He((Zc(g,c[f+904+(((Ge(f)|0)&255)<<2)>>2]|0)|0)&255,f);n=f+14|0;k=a[n>>0]|0;i=k&7;k=(k&255)>>>3&7;j=d[16+(k<<3)+i>>0]|0;i=d[80+(k<<3)+i>>0]|0;if(!(m&16))l=b[f+20+(j<<1)>>1]|0;else {q=f+20+(j<<1)|0;l=(pc(f+4380|0,g,e[q>>1]|0,j>>>0<3?j:3)|0)&65535;b[q>>1]=l;}b[f+12>>1]=l;if(m&8|0){q=f+15|0;a[q>>0]=Zc(g,c[f+1928+(d[q>>0]<<2)>>2]|0)|0;}if(m&4|0){n=Zc(g,c[f+896+(((d[n>>0]|0)>>>6&1)<<2)>>2]|0)|0;q=f+16|0;a[q>>0]=Ie(n+(a[q>>0]|0)|0)|0;}if(m&2|0){q=f+17|0;a[q>>0]=Zc(g,c[f+2952+(d[q>>0]<<2)>>2]|0)|0;}if(m&1){q=f+18|0;b[q>>1]=pc(f+4460|0,g,e[q>>1]|0,0)|0;}}else {q=a[f+14>>0]|0;i=q&7;q=(q&255)>>>3&7;k=q;j=d[16+(q<<3)+i>>0]|0;i=d[80+(q<<3)+i>>0]|0;}l=f+52+(j*24|0)|0;m=f+4540|0;n=(k|0)==1&1;k=pc(m,g,Je(l)|0,n)|0;c[o>>2]=k;c[f>>2]=(c[f>>2]|0)+k;Ke(l,o);l=f+436+(j*24|0)|0;k=Je(l)|0;j=Le(m)|0;q=f+4620|0;j=pc(q,g,k,(j>>>0<20?j&-2:20)|n)|0;c[o>>2]=j;k=f+4|0;c[k>>2]=(c[k>>2]|0)+j;Ke(l,o);o=Le(m)|0;o=(Le(q)|0)+o|0;q=f+820+(i<<2)|0;o=pc(f+4700|0,g,c[q>>2]|0,(o>>>0<36?o>>>1&2147483646:18)|n)|0;c[f+8>>2]=o;c[q>>2]=o;Me(f,h);}V=p;return h+20|0;}function Ce(a){a=a|0;oc(a);oc(a+80|0);oc(a+160|0);oc(a+240|0);oc(a+320|0);return;}function De(a){a=a|0;return c[a>>2]|0;}function Ee(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;k=b+4|0;f=c[k>>2]|0;j=(c[b+8>>2]|0)-f|0;j=j>>>0>e>>>0?e:j;i=b+12|0;g=(c[i>>2]|0)+f|0;h=g+j|0;if(j){f=g;g=d;while(1){a[g>>0]=a[f>>0]|0;f=f+1|0;if((f|0)==(h|0))break;else g=g+1|0;}f=c[k>>2]|0;}c[k>>2]=f+j;e=e-j|0;if(e|0){Kc(b);g=(c[i>>2]|0)+(c[k>>2]|0)|0;h=g+e|0;f=d+j|0;while(1){a[f>>0]=a[g>>0]|0;g=g+1|0;if((g|0)==(h|0))break;else f=f+1|0;}c[k>>2]=(c[k>>2]|0)+e;}return;}function Fe(d,e){d=d|0;e=e|0;te(d);c[d>>2]=Ne(e)|0;c[d+4>>2]=Ne(e+4|0)|0;c[d+8>>2]=Ne(e+8|0)|0;b[d+12>>1]=Oe(e+12|0)|0;He(Pe(e+14|0)|0,d);a[d+15>>0]=Pe(e+15|0)|0;a[d+16>>0]=Qe(e+16|0)|0;a[d+17>>0]=Qe(e+17|0)|0;b[d+18>>1]=Oe(e+18|0)|0;return;}function Ge(b){b=b|0;return a[b+14>>0]|0;}function He(b,c){b=b|0;c=c|0;a[c+14>>0]=b;return;}function Ie(a){a=a|0;return a&255|0;}function Je(a){a=a|0;return c[a+8>>2]|0;}function Ke(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=b+20|0;do if(!(a[k>>0]|0)){j=b+8|0;e=c[j>>2]|0;f=c[d>>2]|0;g=b+4|0;h=c[g>>2]|0;if((e|0)>=(f|0)){if((h|0)<(f|0)){c[b>>2]=h;c[g>>2]=c[d>>2];}else c[b>>2]=f;a[k>>0]=1;break;}c[b>>2]=h;c[g>>2]=e;g=b+16|0;h=c[g>>2]|0;i=c[d>>2]|0;e=b+12|0;f=c[e>>2]|0;if((h|0)<(i|0)){c[j>>2]=f;c[e>>2]=h;c[g>>2]=c[d>>2];break;}if((f|0)<(i|0)){c[j>>2]=f;c[e>>2]=c[d>>2];break;}else {c[j>>2]=i;break;}}else {g=c[d>>2]|0;i=b+8|0;e=c[i>>2]|0;h=b+12|0;f=c[h>>2]|0;if((g|0)>=(e|0)){e=b+16|0;if((g|0)<(f|0)){c[e>>2]=f;c[h>>2]=c[d>>2];}else c[e>>2]=g;a[k>>0]=0;break;}c[b+16>>2]=f;c[h>>2]=e;e=c[d>>2]|0;f=c[b>>2]|0;g=b+4|0;h=c[g>>2]|0;if((e|0)<(f|0)){c[i>>2]=h;c[g>>2]=f;c[b>>2]=c[d>>2];break;}if((e|0)<(h|0)){c[i>>2]=h;c[g>>2]=c[d>>2];break;}else {c[i>>2]=e;break;}}while(0);return;}function Le(a){a=a|0;return c[a>>2]|0;}function Me(b,c){b=b|0;c=c|0;var e=0;Se(d[b>>0]|d[b+1>>0]<<8|d[b+2>>0]<<16|d[b+3>>0]<<24,c);e=b+4|0;Se(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24,c+4|0);e=b+8|0;Se(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24,c+8|0);e=b+12|0;Te(d[e>>0]|d[e+1>>0]<<8,c+12|0);Ue(Ge(b)|0,c+14|0);Ue(a[b+15>>0]|0,c+15|0);Ve(a[b+16>>0]|0,c+16|0);Ve(a[b+17>>0]|0,c+17|0);b=b+18|0;Te(d[b>>0]|d[b+1>>0]<<8,c+18|0);return;}function Ne(a){a=a|0;return Re(a)|0;}function Oe(b){b=b|0;return (a[b+1>>0]<<8|d[b>>0])&65535|0;}function Pe(b){b=b|0;return a[b>>0]|0;}function Qe(b){b=b|0;return a[b>>0]|0;}function Re(a){a=a|0;return (d[a+1>>0]|0)<<8|(d[a>>0]|0)|(d[a+2>>0]|0)<<16|(d[a+3>>0]|0)<<24|0;}function Se(a,b){a=a|0;b=b|0;We(a,b);return;}function Te(b,c){b=b|0;c=c|0;a[c+1>>0]=(b&65535)>>>8;a[c>>0]=b;return;}function Ue(b,c){b=b|0;c=c|0;a[c>>0]=b;return;}function Ve(b,c){b=b|0;c=c|0;a[c>>0]=b;return;}function We(b,c){b=b|0;c=c|0;a[c+3>>0]=b>>>24;a[c+2>>0]=b>>>16;a[c+1>>0]=b>>>8;a[c>>0]=b;return;}function Xe(a,b){a=a|0;b=b|0;return;}function Ye(a){a=a|0;pq(a);jp(a);return;}function Ze(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function _e(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==9202?a+12|0:0)|0;}function $e(a){a=a|0;Da(a,16);return;}function af(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=4768;c[a+4>>2]=b;cf(a+8|0);return;}function bf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4792;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function cf(b){b=b|0;gf(b);hf(b+164|0);jf(b+244|0);a[b+324>>0]=0;a[b+325>>0]=0;return;}function df(a){a=a|0;c[a>>2]=4768;of(a+8|0);le(a);return;}function ef(a){a=a|0;df(a);jp(a);return;}function ff(a,b){a=a|0;b=b|0;return qf(a+8|0,c[a+4>>2]|0,b)|0;}function gf(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;h=V;V=V+16|0;f=h;a[b>>0]=0;Oc(b+4|0,516,0,0);Oc(b+48|0,6,0,0);c[b+92>>2]=0;c[b+96>>2]=0;e=b+100|0;mf(e);nf(f);g=c[f>>2]|0;f=c[f+4>>2]|0;d=4;while(1){i=e;j=i;a[j>>0]=g;a[j+1>>0]=g>>8;a[j+2>>0]=g>>16;a[j+3>>0]=g>>24;i=i+4|0;a[i>>0]=f;a[i+1>>0]=f>>8;a[i+2>>0]=f>>16;a[i+3>>0]=f>>24;d=d+-1|0;if(!d)break;else e=e+8|0;}j=b+132|0;c[j>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;c[j+12>>2]=0;c[j+16>>2]=0;c[j+20>>2]=0;c[j+24>>2]=0;c[j+28>>2]=0;V=h;return;}function hf(a){a=a|0;xe(a,32,9,8,0);return;}function jf(a){a=a|0;mc(a,32,9,8,0);return;}function kf(a){a=a|0;ye(a);return;}function lf(a){a=a|0;Ic(a+48|0);Ic(a+4|0);return;}function mf(a){a=a|0;var b=0;b=a+32|0;do{nf(a);a=a+8|0;}while((a|0)!=(b|0));return;}function nf(b){b=b|0;var c=0;c=b;a[c>>0]=0;a[c+1>>0]=0;a[c+2>>0]=0;a[c+3>>0]=0;b=b+4|0;a[b>>0]=0;a[b+1>>0]=0;a[b+2>>0]=0;a[b+3>>0]=0;return;}function of(a){a=a|0;pf(a+244|0);kf(a+164|0);lf(a);return;}function pf(a){a=a|0;qc(a);return;}function qf(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;g=b+325|0;if(!(a[g>>0]|0)){rf(b+244|0);a[g>>0]=1;}if(!(a[b>>0]|0)){a[b>>0]=1;Ee(De(e)|0,f,8);i=sf(f)|0;j=u()|0;b=b+100|0;e=b;a[e>>0]=i;a[e+1>>0]=i>>8;a[e+2>>0]=i>>16;a[e+3>>0]=i>>24;b=b+4|0;a[b>>0]=j;a[b+1>>0]=j>>8;a[b+2>>0]=j>>16;a[b+3>>0]=j>>24;}else {j=b+92|0;a:do if(!(c[b+132+(c[j>>2]<<2)>>2]|0)){g=Zc(e,b+48|0)|0;switch(g|0){case 1:{e=pc(b+244|0,e,0,0)|0;c[b+132+(c[j>>2]<<2)>>2]=e;e=c[j>>2]|0;k=c[b+132+(e<<2)>>2]|0;i=b+100+(e<<3)|0;h=i;g=h;h=h+4|0;k=lr(d[g>>0]|d[g+1>>0]<<8|d[g+2>>0]<<16|d[g+3>>0]<<24|0,d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24|0,k|0,((k|0)<0)<<31>>31|0)|0;h=u()|0;g=i;a[g>>0]=k;a[g+1>>0]=k>>8;a[g+2>>0]=k>>16;a[g+3>>0]=k>>24;i=i+4|0;a[i>>0]=h;a[i+1>>0]=h>>8;a[i+2>>0]=h>>16;a[i+3>>0]=h>>24;c[b+148+(e<<2)>>2]=0;break a;}case 2:{k=b+96|0;c[k>>2]=(c[k>>2]|0)+1&3;i=b+100+(c[j>>2]<<3)+4|0;i=pc(b+244|0,e,d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24,8)|0;g=b+100+(c[k>>2]<<3)|0;h=g;a[h>>0]=0;a[h+1>>0]=0;a[h+2>>0]=0;a[h+3>>0]=0;g=g+4|0;a[g>>0]=i;a[g+1>>0]=i>>8;a[g+2>>0]=i>>16;a[g+3>>0]=i>>24;g=tf(e)|0;k=c[k>>2]|0;e=b+100+(k<<3)|0;i=e;h=i;i=i+4|0;i=d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24;g=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24|g;h=e;a[h>>0]=g;a[h+1>>0]=g>>8;a[h+2>>0]=g>>16;a[h+3>>0]=g>>24;e=e+4|0;a[e>>0]=i;a[e+1>>0]=i>>8;a[e+2>>0]=i>>16;a[e+3>>0]=i>>24;c[j>>2]=k;c[b+132+(k<<2)>>2]=0;c[b+148+(c[j>>2]<<2)>>2]=0;break a;}default:{if((g|0)<=2)break a;c[j>>2]=g+2+(c[j>>2]|0)&3;qf(b,e,f)|0;break a;}}}else {i=Zc(e,b+4|0)|0;if((i|0)==1){g=pc(b+244|0,e,c[b+132+(c[j>>2]<<2)>>2]|0,1)|0;k=c[j>>2]|0;e=b+100+(k<<3)|0;i=e;h=i;i=i+4|0;g=lr(d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24|0,d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24|0,g|0,((g|0)<0)<<31>>31|0)|0;i=u()|0;h=e;a[h>>0]=g;a[h+1>>0]=g>>8;a[h+2>>0]=g>>16;a[h+3>>0]=g>>24;e=e+4|0;a[e>>0]=i;a[e+1>>0]=i>>8;a[e+2>>0]=i>>16;a[e+3>>0]=i>>24;c[b+148+(k<<2)>>2]=0;break;}if((i|0)>=511){if((i|0)==512){k=b+96|0;c[k>>2]=(c[k>>2]|0)+1&3;i=b+100+(c[j>>2]<<3)+4|0;i=pc(b+244|0,e,d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24,8)|0;g=b+100+(c[k>>2]<<3)|0;h=g;a[h>>0]=0;a[h+1>>0]=0;a[h+2>>0]=0;a[h+3>>0]=0;g=g+4|0;a[g>>0]=i;a[g+1>>0]=i>>8;a[g+2>>0]=i>>16;a[g+3>>0]=i>>24;g=tf(e)|0;k=c[k>>2]|0;e=b+100+(k<<3)|0;i=e;h=i;i=i+4|0;i=d[i>>0]|d[i+1>>0]<<8|d[i+2>>0]<<16|d[i+3>>0]<<24;g=d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24|g;h=e;a[h>>0]=g;a[h+1>>0]=g>>8;a[h+2>>0]=g>>16;a[h+3>>0]=g>>24;e=e+4|0;a[e>>0]=i;a[e+1>>0]=i>>8;a[e+2>>0]=i>>16;a[e+3>>0]=i>>24;c[j>>2]=k;c[b+132+(k<<2)>>2]=0;c[b+148+(c[j>>2]<<2)>>2]=0;break;}if((i|0)<=511)break;c[j>>2]=(c[j>>2]|0)+i&3;qf(b,e,f)|0;break;}do if(!i){g=pc(b+244|0,e,0,7)|0;h=b+148+(c[j>>2]<<2)|0;c[h>>2]=(c[h>>2]|0)+1;h=c[j>>2]|0;if((c[b+148+(h<<2)>>2]|0)>3){c[b+132+(h<<2)>>2]=g;c[b+148+(c[j>>2]<<2)>>2]=0;}}else {if((i|0)<500){g=b+244|0;h=q(c[b+132+(c[j>>2]<<2)>>2]|0,i)|0;if((i|0)<10){g=pc(g,e,h,2)|0;break;}else {g=pc(g,e,h,3)|0;break;}}if((i|0)==500){g=pc(b+244|0,e,(c[b+132+(c[j>>2]<<2)>>2]|0)*500|0,4)|0;h=b+148+(c[j>>2]<<2)|0;c[h>>2]=(c[h>>2]|0)+1;h=c[j>>2]|0;if((c[b+148+(h<<2)>>2]|0)<=3)break;c[b+132+(h<<2)>>2]=g;c[b+148+(c[j>>2]<<2)>>2]=0;break;}g=500-i|0;h=b+244|0;i=c[b+132+(c[j>>2]<<2)>>2]|0;if((g|0)>-10){g=pc(h,e,q(i,g)|0,5)|0;break;}g=pc(h,e,q(i,-10)|0,6)|0;h=b+148+(c[j>>2]<<2)|0;c[h>>2]=(c[h>>2]|0)+1;h=c[j>>2]|0;if((c[b+148+(h<<2)>>2]|0)>3){c[b+132+(h<<2)>>2]=g;c[b+148+(c[j>>2]<<2)>>2]=0;}}while(0);k=b+100+(c[j>>2]<<3)|0;h=k;e=h;h=h+4|0;h=lr(d[e>>0]|d[e+1>>0]<<8|d[e+2>>0]<<16|d[e+3>>0]<<24|0,d[h>>0]|d[h+1>>0]<<8|d[h+2>>0]<<16|d[h+3>>0]<<24|0,g|0,((g|0)<0)<<31>>31|0)|0;e=u()|0;i=k;a[i>>0]=h;a[i+1>>0]=h>>8;a[i+2>>0]=h>>16;a[i+3>>0]=h>>24;k=k+4|0;a[k>>0]=e;a[k+1>>0]=e>>8;a[k+2>>0]=e>>16;a[k+3>>0]=e>>24;}while(0);uf(b+100+(c[j>>2]<<3)|0,f);}return f+8|0;}function rf(a){a=a|0;oc(a);return;}function sf(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;e=Re(a)|0;vf(d,e,Re(a+4|0)|0);a=c[d>>2]|0;t(c[d+4>>2]|0);V=b;return a|0;}function tf(a){a=a|0;var b=0;b=(bd(a)|0)&65535;return ((bd(a)|0)&65535)<<16|b|0;}function uf(a,b){a=a|0;b=b|0;var c=0;c=a;We(d[c>>0]|d[c+1>>0]<<8|d[c+2>>0]<<16|d[c+3>>0]<<24,b);a=a+4|0;We(d[a>>0]|d[a+1>>0]<<8|d[a+2>>0]<<16|d[a+3>>0]<<24,b+4|0);return;}function vf(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;e=b;a[e>>0]=c;a[e+1>>0]=c>>8;a[e+2>>0]=c>>16;a[e+3>>0]=c>>24;c=b+4|0;a[c>>0]=d;a[c+1>>0]=d>>8;a[c+2>>0]=d>>16;a[c+3>>0]=d>>24;return;}function wf(a){a=a|0;pq(a);jp(a);return;}function xf(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function yf(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==9890?a+12|0:0)|0;}function zf(a){a=a|0;Da(a,16);return;}function Af(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=4820;c[a+4>>2]=b;Cf(a+8|0);return;}function Bf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4844;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function Cf(b){b=b|0;a[b>>0]=0;Gf(b+1|0);Oc(b+8|0,128,0,0);Oc(b+52|0,256,0,0);Oc(b+96|0,256,0,0);Oc(b+140|0,256,0,0);Oc(b+184|0,256,0,0);Oc(b+228|0,256,0,0);Oc(b+272|0,256,0,0);return;}function Df(a){a=a|0;c[a>>2]=4820;Hf(a+8|0);le(a);return;}function Ef(a){a=a|0;Df(a);jp(a);return;}function Ff(a,b){a=a|0;b=b|0;return If(a+8|0,c[a+4>>2]|0,b)|0;}function Gf(b){b=b|0;var c=0;a[b>>0]=0;a[b+1>>0]=0;c=b+2|0;a[c>>0]=0;a[c+1>>0]=0;b=b+4|0;a[b>>0]=0;a[b+1>>0]=0;return;}function Hf(a){a=a|0;Ic(a+272|0);Ic(a+228|0);Ic(a+184|0);Ic(a+140|0);Ic(a+96|0);Ic(a+52|0);Ic(a+8|0);return;}function If(c,f,g){c=c|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;o=V;V=V+16|0;m=o;if(!(a[c>>0]|0)){a[c>>0]=1;Ee(De(f)|0,g,6);Jf(m,g);n=c+1|0;a[n>>0]=a[m>>0]|0;a[n+1>>0]=a[m+1>>0]|0;a[n+2>>0]=a[m+2>>0]|0;a[n+3>>0]=a[m+3>>0]|0;a[n+4>>0]=a[m+4>>0]|0;a[n+5>>0]=a[m+5>>0]|0;}else {n=Zc(f,c+8|0)|0;Gf(m);if(!(n&1)){h=c+1|0;h=(d[h>>0]|d[h+1>>0]<<8)&255;}else {l=(Zc(f,c+52|0)|0)&255;h=c+1|0;h=(Ie(l+((d[h>>0]|d[h+1>>0]<<8)&255)|0)|0)&255;}b[m>>1]=h;if(!(n&2)){l=c+1|0;h=h|(d[l>>0]|d[l+1>>0]<<8)&-256;}else {h=(Zc(f,c+96|0)|0)&255;l=c+1|0;h=((Ie((((d[l>>0]|d[l+1>>0]<<8)&65535)>>>8)+h|0)|0)&255)<<8;h=(h|e[m>>1])&65535;}b[m>>1]=h;do if(n&64){k=c+1|0;i=(h&255)-((d[k>>0]|d[k+1>>0]<<8)&255)|0;if(!(n&4)){h=c+3|0;h=(d[h>>0]|d[h+1>>0]<<8)&255;}else {h=(Zc(f,c+140|0)|0)&255;l=c+3|0;l=i+((d[l>>0]|d[l+1>>0]<<8)&255)|0;h=(Ie(((l|0)<1?0:(l|0)>254?255:l&255)+h|0)|0)&255;}l=m+2|0;b[l>>1]=h;if(!(n&16)){h=c+5|0;h=(d[h>>0]|d[h+1>>0]<<8)&255;}else {h=Zc(f,c+228|0)|0;p=c+3|0;j=c+5|0;j=((i+(b[l>>1]&255)-((d[p>>0]|d[p+1>>0]<<8)&255)|0)/2|0)+((d[j>>0]|d[j+1>>0]<<8)&255)|0;h=(Ie(((j|0)<1?0:(j|0)>254?255:j&255)+(h&255)|0)|0)&255;}j=m+4|0;b[j>>1]=h;h=((e[m>>1]|0)>>>8)-(((d[k>>0]|d[k+1>>0]<<8)&65535)>>>8)|0;if(!(n&8)){i=c+3|0;i=b[l>>1]|(d[i>>0]|d[i+1>>0]<<8)&-256;}else {i=(Zc(f,c+184|0)|0)&255;p=c+3|0;p=(((d[p>>0]|d[p+1>>0]<<8)&65535)>>>8)+h|0;i=((Ie(((p|0)<1?0:(p|0)>254?255:p&255)+i|0)|0)&255)<<8;i=(i|e[l>>1])&65535;}b[l>>1]=i;if(!(n&32)){p=c+5|0;b[j>>1]=b[j>>1]|(d[p>>0]|d[p+1>>0]<<8)&-256;break;}else {p=Zc(f,c+272|0)|0;f=c+3|0;n=c+5|0;n=((((e[l>>1]|0)>>>8)+h-(((d[f>>0]|d[f+1>>0]<<8)&65535)>>>8)|0)/2|0)+(((d[n>>0]|d[n+1>>0]<<8)&65535)>>>8)|0;p=((Ie(((n|0)<1?0:(n|0)>254?255:n&255)+(p&255)|0)|0)&255)<<8;b[j>>1]=p|e[j>>1];break;}}else {b[m+2>>1]=h;b[m+4>>1]=h;}while(0);p=c+1|0;a[p>>0]=a[m>>0]|0;a[p+1>>0]=a[m+1>>0]|0;a[p+2>>0]=a[m+2>>0]|0;a[p+3>>0]=a[m+3>>0]|0;a[p+4>>0]=a[m+4>>0]|0;a[p+5>>0]=a[m+5>>0]|0;Kf(p,g);}V=o;return g+6|0;}function Jf(a,b){a=a|0;b=b|0;var c=0,d=0;d=Oe(b)|0;c=Oe(b+2|0)|0;Lf(a,d,c,Oe(b+4|0)|0);return;}function Kf(a,b){a=a|0;b=b|0;var c=0;Te(d[a>>0]|d[a+1>>0]<<8,b);c=a+2|0;Te(d[c>>0]|d[c+1>>0]<<8,b+2|0);a=a+4|0;Te(d[a>>0]|d[a+1>>0]<<8,b+4|0);return;}function Lf(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;a[b>>0]=c;a[b+1>>0]=c>>8;c=b+2|0;a[c>>0]=d;a[c+1>>0]=d>>8;d=b+4|0;a[d>>0]=e;a[d+1>>0]=e>>8;return;}function Mf(a){a=a|0;pq(a);jp(a);return;}function Nf(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function Of(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==10570?a+12|0:0)|0;}function Pf(a){a=a|0;Da(a,16);return;}function Qf(a,b,d){a=a|0;b=b|0;d=d|0;fe(a);c[a>>2]=4872;c[a+4>>2]=b;Sf(a+8|0,d);return;}function Rf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4896;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function Sf(b,d){b=b|0;d=d|0;c[b>>2]=c[d>>2];a[b+4>>0]=a[d+4>>0]|0;Wf(b+8|0,d+8|0);Wf(b+20|0,d+20|0);Xf(b+32|0,d+32|0);return;}function Tf(a){a=a|0;c[a>>2]=4872;ud(a+8|0);le(a);return;}function Uf(a){a=a|0;Tf(a);jp(a);return;}function Vf(a,b){a=a|0;b=b|0;return Dg(a+8|0,c[a+4>>2]|0,b)|0;}function Wf(a,b){a=a|0;b=b|0;var d=0,e=0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;d=b+4|0;e=(c[d>>2]|0)-(c[b>>2]|0)|0;if(e|0){Yf(a,e);Zf(a,c[b>>2]|0,c[d>>2]|0,e);}return;}function Xf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+32|0;e=d+24|0;f=d+16|0;h=d+8|0;g=d;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;zg(h,b);Ag(g,b);c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];c[e>>2]=c[g>>2];c[e+4>>2]=c[g+4>>2];cg(a,f,e,0);V=d;return;}function Yf(a,b){a=a|0;b=b|0;var d=0;if(($f(a)|0)>>>0<b>>>0)cr(a);else {d=eq(b)|0;c[a+4>>2]=d;c[a>>2]=d;c[a+8>>2]=d+b;return;}}function Zf(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=V;V=V+16|0;f=g;ag(f,a,e);e=f+4|0;a=d-b|0;if((a|0)>0){ur(c[e>>2]|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+a;}bg(f);V=g;return;}function _f(a){a=a|0;var b=0,d=0;b=c[a>>2]|0;d=b;if(b|0){c[a+4>>2]=d;Da(b,(c[a+8>>2]|0)-d|0);}return;}function $f(a){a=a|0;return 2147483647;}function ag(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;b=c[b+4>>2]|0;c[a+4>>2]=b;c[a+8>>2]=b+d;return;}function bg(a){a=a|0;c[(c[a>>2]|0)+4>>2]=c[a+4>>2];return;}function cg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;q=V;V=V+96|0;p=q+80|0;m=q+64|0;j=q+48|0;k=q+40|0;l=q+8|0;i=q;n=q+32|0;o=q+16|0;h=b;g=c[h>>2]|0;h=c[h+4>>2]|0;f=d;d=c[f>>2]|0;f=c[f+4>>2]|0;e=g;if((f|0)==(h|0))h=0;else h=((f-(c[d>>2]|0)|0)/44|0)+((d-g>>2)*93|0)+((h-(c[g>>2]|0)|0)/-44|0)|0;d=(c[a+8>>2]|0)-(c[a+4>>2]|0)|0;d=((d|0)==0?0:((d>>2)*93|0)+-1|0)-((c[a+20>>2]|0)+(c[a+16>>2]|0))|0;if(h>>>0>d>>>0)eg(a,h-d|0);fg(k,a);fg(i,a);f=i;d=c[f>>2]|0;f=c[f+4>>2]|0;g=l;c[g>>2]=d;c[g+4>>2]=f;g=d;if(h|0){d=((f-(c[d>>2]|0)|0)/44|0)+h|0;if((d|0)>0){i=(d>>>0)/93|0;h=g+(i<<2)|0;c[l>>2]=h;d=(c[h>>2]|0)+((d-(i*93|0)|0)*44|0)|0;}else {d=92-d|0;i=g+(((d|0)/-93|0)<<2)|0;c[l>>2]=i;d=(c[i>>2]|0)+((92-((d|0)%93|0)|0)*44|0)|0;}c[l+4>>2]=d;}c[m>>2]=c[k>>2];c[m+4>>2]=c[k+4>>2];c[p>>2]=c[l>>2];c[p+4>>2]=c[l+4>>2];gg(j,m,p);hg(p,j);ig(m,j);if(jg(p,m)|0){g=o+4|0;h=b+4|0;do{kg(n,p);lg(o,a,n);d=c[o>>2]|0;if((d|0)!=(c[g>>2]|0)){f=c[h>>2]|0;do{Wc(d,f);d=(c[o>>2]|0)+44|0;c[o>>2]=d;f=f+44|0;c[h>>2]=f;if((f-(c[e>>2]|0)|0)==4092){e=e+4|0;c[b>>2]=e;f=c[e>>2]|0;c[h>>2]=f;}}while((d|0)!=(c[g>>2]|0));}mg(o);ng(p)|0;}while(jg(p,m)|0);}V=q;return;}function dg(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-4-b|0)>>>2)<<2);b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function eg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;B=V;V=V+64|0;v=B+52|0;u=B+48|0;w=B+28|0;x=B+24|0;y=B+20|0;p=B;z=a+8|0;d=c[z>>2]|0;A=a+4|0;j=c[A>>2]|0;s=((d|0)==(j|0)&1)+b|0;h=(s>>>0)/93|0;h=h+((s-(h*93|0)|0)!=0&1)|0;s=a+16|0;e=c[s>>2]|0;i=(e>>>0)/93|0;r=h>>>0<i>>>0?h:i;b=h-r|0;g=d;a:do if(!b){c[s>>2]=(q(r,-93)|0)+e;if(r|0){i=a+12|0;k=a+12|0;l=w+4|0;m=w+8|0;n=w+12|0;b=r;e=j;while(1){h=c[e>>2]|0;g=e+4|0;c[A>>2]=g;t=c[i>>2]|0;e=t;do if((d|0)==(t|0)){t=c[a>>2]|0;d=t;if(g>>>0<=t>>>0){d=e-d|0;d=(d|0)==0?1:d>>1;qg(w,d,d>>>2,k);c[x>>2]=c[A>>2];c[y>>2]=c[z>>2];c[u>>2]=c[x>>2];c[v>>2]=c[y>>2];ug(w,u,v);d=c[a>>2]|0;c[a>>2]=c[w>>2];c[w>>2]=d;d=c[A>>2]|0;c[A>>2]=c[l>>2];c[l>>2]=d;d=c[z>>2]|0;c[z>>2]=c[m>>2];c[m>>2]=d;d=c[i>>2]|0;c[i>>2]=c[n>>2];c[n>>2]=d;tg(w);d=c[z>>2]|0;break;}t=g;d=((t-d>>2)+1|0)/-2|0;f=g+(d<<2)|0;e=e-t|0;if(!e)d=f;else {vr(f|0,g|0,e|0)|0;d=(c[A>>2]|0)+(d<<2)|0;}t=f+(e>>2<<2)|0;c[z>>2]=t;c[A>>2]=d;d=t;}while(0);c[d>>2]=h;d=(c[z>>2]|0)+4|0;c[z>>2]=d;b=b+-1|0;if(!b)break a;e=c[A>>2]|0;}}}else {t=a+12|0;e=c[t>>2]|0;f=e-(c[a>>2]|0)|0;d=g-j>>2;if(b>>>0>((f>>2)-d|0)>>>0){o=f>>1;n=d+b|0;qg(p,o>>>0<n>>>0?n:o,d-r|0,a+12|0);do{c[v>>2]=eq(4092)|0;rg(p,v);b=b+-1|0;}while((b|0)!=0);if(!r)d=c[A>>2]|0;else {i=p+8|0;j=p+12|0;k=p+4|0;l=p+16|0;m=w+4|0;n=w+8|0;o=w+12|0;h=r;b=c[i>>2]|0;d=c[A>>2]|0;do{g=c[j>>2]|0;e=g;do if((b|0)==(g|0)){f=c[k>>2]|0;g=c[p>>2]|0;b=g;if(f>>>0<=g>>>0){b=e-b|0;b=(b|0)==0?1:b>>1;qg(w,b,b>>>2,c[l>>2]|0);c[x>>2]=c[k>>2];c[y>>2]=c[i>>2];c[u>>2]=c[x>>2];c[v>>2]=c[y>>2];ug(w,u,v);b=c[p>>2]|0;c[p>>2]=c[w>>2];c[w>>2]=b;b=c[k>>2]|0;c[k>>2]=c[m>>2];c[m>>2]=b;b=c[i>>2]|0;c[i>>2]=c[n>>2];c[n>>2]=b;b=c[j>>2]|0;c[j>>2]=c[o>>2];c[o>>2]=b;tg(w);b=c[i>>2]|0;break;}C=f;b=((C-b>>2)+1|0)/-2|0;g=f+(b<<2)|0;e=e-C|0;if(!e)b=g;else {vr(g|0,f|0,e|0)|0;b=(c[k>>2]|0)+(b<<2)|0;}C=g+(e>>2<<2)|0;c[i>>2]=C;c[k>>2]=b;b=C;}while(0);c[b>>2]=c[d>>2];b=(c[i>>2]|0)+4|0;c[i>>2]=b;d=(c[A>>2]|0)+4|0;c[A>>2]=d;h=h+-1|0;}while((h|0)!=0);}b=c[z>>2]|0;if((b|0)!=(d|0)){do{b=b+-4|0;sg(p,b);d=c[A>>2]|0;}while((b|0)!=(d|0));b=c[z>>2]|0;}C=c[a>>2]|0;c[a>>2]=c[p>>2];c[p>>2]=C;C=p+4|0;c[A>>2]=c[C>>2];c[C>>2]=d;C=p+8|0;c[z>>2]=c[C>>2];c[C>>2]=b;C=p+12|0;A=c[t>>2]|0;c[t>>2]=c[C>>2];c[C>>2]=A;c[s>>2]=(c[s>>2]|0)+(q(r,-93)|0);tg(p);break;}else {b:do if((e|0)==(g|0))k=18;else {while(1){c[v>>2]=eq(4092)|0;og(a,v);b=b+-1|0;if(!b)break;if((c[t>>2]|0)==(c[z>>2]|0)){k=18;break b;}}d=r;b=c[s>>2]|0;}while(0);if((k|0)==18){e=~(h>>>0>i>>>0?i:h);d=b;do{c[v>>2]=eq(4092)|0;pg(a,v);d=d+-1|0;f=(((c[z>>2]|0)-(c[A>>2]|0)|0)==4?92:93)+(c[s>>2]|0)|0;c[s>>2]=f;}while((d|0)!=0);d=b+-1-e|0;b=f;}c[s>>2]=b+(q(d,-93)|0);if(!d)break;i=a+12|0;j=w+4|0;k=w+8|0;l=w+12|0;b=c[z>>2]|0;do{g=c[A>>2]|0;h=c[g>>2]|0;g=g+4|0;c[A>>2]=g;C=c[t>>2]|0;e=C;do if((b|0)==(C|0)){C=c[a>>2]|0;b=C;if(g>>>0<=C>>>0){b=e-b|0;b=(b|0)==0?1:b>>1;qg(w,b,b>>>2,i);c[x>>2]=c[A>>2];c[y>>2]=c[z>>2];c[u>>2]=c[x>>2];c[v>>2]=c[y>>2];ug(w,u,v);b=c[a>>2]|0;c[a>>2]=c[w>>2];c[w>>2]=b;b=c[A>>2]|0;c[A>>2]=c[j>>2];c[j>>2]=b;b=c[z>>2]|0;c[z>>2]=c[k>>2];c[k>>2]=b;b=c[t>>2]|0;c[t>>2]=c[l>>2];c[l>>2]=b;tg(w);b=c[z>>2]|0;break;}C=g;b=((C-b>>2)+1|0)/-2|0;f=g+(b<<2)|0;e=e-C|0;if(!e)b=f;else {vr(f|0,g|0,e|0)|0;b=(c[A>>2]|0)+(b<<2)|0;}C=f+(e>>2<<2)|0;c[z>>2]=C;c[A>>2]=b;b=C;}while(0);c[b>>2]=h;b=(c[z>>2]|0)+4|0;c[z>>2]=b;d=d+-1|0;}while((d|0)!=0);}}while(0);V=B;return;}function fg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=(c[b+16>>2]|0)+(c[b+20>>2]|0)|0;g=c[b+4>>2]|0;e=(d>>>0)/93|0;f=g+(e<<2)|0;if((c[b+8>>2]|0)==(g|0))b=0;else b=(c[f>>2]|0)+((d-(e*93|0)|0)*44|0)|0;c[a>>2]=f;c[a+4>>2]=b;return;}function gg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=b;b=c[f+4>>2]|0;e=a;c[e>>2]=c[f>>2];c[e+4>>2]=b;e=d;b=c[e+4>>2]|0;d=a+8|0;c[d>>2]=c[e>>2];c[d+4>>2]=b;return;}function hg(a,b){a=a|0;b=b|0;c[a>>2]=c[b>>2];c[a+4>>2]=c[b+4>>2];c[a+8>>2]=c[b+8>>2];c[a+12>>2]=c[b+12>>2];return;}function ig(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=V;V=V+32|0;e=d+24|0;f=d+16|0;h=d+8|0;g=d;i=b+8|0;j=c[i>>2]|0;i=c[i+4>>2]|0;b=h;c[b>>2]=j;c[b+4>>2]=i;b=g;c[b>>2]=j;c[b+4>>2]=i;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];c[e>>2]=c[g>>2];c[e+4>>2]=c[g+4>>2];gg(a,f,e);V=d;return;}function jg(a,b){a=a|0;b=b|0;return (xg(a,b)|0)^1|0;}function kg(a,b){a=a|0;b=b|0;var d=0,e=0;d=c[b>>2]|0;e=c[b+4>>2]|0;if((d|0)==(c[b+8>>2]|0))yg(a,e,c[b+12>>2]|0);else yg(a,e,(c[d>>2]|0)+4092|0);return;}function lg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=c[d>>2]|0;c[a>>2]=e;c[a+4>>2]=c[d+4>>2];c[a+8>>2]=e;c[a+12>>2]=b;return;}function mg(a){a=a|0;var b=0;b=(c[a+12>>2]|0)+20|0;c[b>>2]=(c[b>>2]|0)+(((c[a>>2]|0)-(c[a+8>>2]|0)|0)/44|0);return;}function ng(a){a=a|0;var b=0,d=0,e=0;b=c[a>>2]|0;d=a+8|0;if((b|0)==(c[d>>2]|0)){e=d;b=c[e+4>>2]|0;d=a;c[d>>2]=c[e>>2];c[d+4>>2]=b;}else {e=b+4|0;c[a>>2]=e;c[a+4>>2]=c[e>>2];}return a|0;}function og(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=V;V=V+48|0;f=p+32|0;e=p+28|0;i=p+8|0;j=p+4|0;k=p;o=a+8|0;d=c[o>>2]|0;l=a+12|0;n=c[l>>2]|0;g=n;do if((d|0)==(n|0)){n=a+4|0;m=c[n>>2]|0;q=c[a>>2]|0;h=q;if(m>>>0<=q>>>0){d=g-h|0;d=(d|0)==0?1:d>>1;qg(i,d,d>>>2,a+12|0);c[j>>2]=c[n>>2];c[k>>2]=c[o>>2];c[e>>2]=c[j>>2];c[f>>2]=c[k>>2];ug(i,e,f);d=c[a>>2]|0;c[a>>2]=c[i>>2];c[i>>2]=d;d=i+4|0;q=c[n>>2]|0;c[n>>2]=c[d>>2];c[d>>2]=q;d=i+8|0;q=c[o>>2]|0;c[o>>2]=c[d>>2];c[d>>2]=q;d=i+12|0;q=c[l>>2]|0;c[l>>2]=c[d>>2];c[d>>2]=q;tg(i);d=c[o>>2]|0;break;}f=m;e=((f-h>>2)+1|0)/-2|0;a=m+(e<<2)|0;f=d-f|0;if(!f)d=a;else {vr(a|0,m|0,f|0)|0;d=(c[n>>2]|0)+(e<<2)|0;}q=a+(f>>2<<2)|0;c[o>>2]=q;c[n>>2]=d;d=q;}while(0);c[d>>2]=c[b>>2];c[o>>2]=(c[o>>2]|0)+4;V=p;return;}function pg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=V;V=V+48|0;e=p+32|0;d=p+28|0;h=p+8|0;i=p+4|0;j=p;o=a+4|0;m=c[o>>2]|0;n=c[a>>2]|0;k=n;do if((m|0)==(n|0)){n=a+8|0;l=c[n>>2]|0;g=a+12|0;q=c[g>>2]|0;f=q;if(l>>>0>=q>>>0){q=f-k|0;q=(q|0)==0?1:q>>1;qg(h,q,(q+3|0)>>>2,a+12|0);c[i>>2]=c[o>>2];c[j>>2]=c[n>>2];c[d>>2]=c[i>>2];c[e>>2]=c[j>>2];ug(h,d,e);d=c[a>>2]|0;c[a>>2]=c[h>>2];c[h>>2]=d;d=h+4|0;q=c[o>>2]|0;c[o>>2]=c[d>>2];c[d>>2]=q;d=h+8|0;q=c[n>>2]|0;c[n>>2]=c[d>>2];c[d>>2]=q;d=h+12|0;q=c[g>>2]|0;c[g>>2]=c[d>>2];c[d>>2]=q;tg(h);d=c[o>>2]|0;break;}e=l;a=((f-e>>2)+1|0)/2|0;f=l+(a<<2)|0;e=e-m|0;d=f+(0-(e>>2)<<2)|0;if(!e){d=f;e=f;}else {vr(d|0,m|0,e|0)|0;e=(c[n>>2]|0)+(a<<2)|0;}c[o>>2]=d;c[n>>2]=e;}else d=m;while(0);c[d+-4>>2]=c[b>>2];c[o>>2]=(c[o>>2]|0)+-4;V=p;return;}function qg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=a+12|0;c[f>>2]=0;c[a+16>>2]=e;do if(b){if(b>>>0>1073741823){f=v(8)|0;vq(f,6723);c[f>>2]=5956;x(f|0,3928,123);}else {e=eq(b<<2)|0;break;}}else e=0;while(0);c[a>>2]=e;d=e+(d<<2)|0;c[a+8>>2]=d;c[a+4>>2]=d;c[f>>2]=e+(b<<2);return;}function rg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=V;V=V+48|0;f=p+32|0;e=p+28|0;i=p+8|0;j=p+4|0;k=p;o=a+8|0;d=c[o>>2]|0;l=a+12|0;n=c[l>>2]|0;g=n;do if((d|0)==(n|0)){n=a+4|0;m=c[n>>2]|0;q=c[a>>2]|0;h=q;if(m>>>0<=q>>>0){d=g-h|0;d=(d|0)==0?1:d>>1;qg(i,d,d>>>2,c[a+16>>2]|0);c[j>>2]=c[n>>2];c[k>>2]=c[o>>2];c[e>>2]=c[j>>2];c[f>>2]=c[k>>2];ug(i,e,f);d=c[a>>2]|0;c[a>>2]=c[i>>2];c[i>>2]=d;d=i+4|0;q=c[n>>2]|0;c[n>>2]=c[d>>2];c[d>>2]=q;d=i+8|0;q=c[o>>2]|0;c[o>>2]=c[d>>2];c[d>>2]=q;d=i+12|0;q=c[l>>2]|0;c[l>>2]=c[d>>2];c[d>>2]=q;tg(i);d=c[o>>2]|0;break;}f=m;e=((f-h>>2)+1|0)/-2|0;a=m+(e<<2)|0;f=d-f|0;if(!f)d=a;else {vr(a|0,m|0,f|0)|0;d=(c[n>>2]|0)+(e<<2)|0;}q=a+(f>>2<<2)|0;c[o>>2]=q;c[n>>2]=d;d=q;}while(0);c[d>>2]=c[b>>2];c[o>>2]=(c[o>>2]|0)+4;V=p;return;}function sg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;p=V;V=V+48|0;e=p+32|0;d=p+28|0;h=p+8|0;i=p+4|0;j=p;o=a+4|0;m=c[o>>2]|0;n=c[a>>2]|0;k=n;do if((m|0)==(n|0)){n=a+8|0;l=c[n>>2]|0;g=a+12|0;q=c[g>>2]|0;f=q;if(l>>>0>=q>>>0){q=f-k|0;q=(q|0)==0?1:q>>1;qg(h,q,(q+3|0)>>>2,c[a+16>>2]|0);c[i>>2]=c[o>>2];c[j>>2]=c[n>>2];c[d>>2]=c[i>>2];c[e>>2]=c[j>>2];ug(h,d,e);d=c[a>>2]|0;c[a>>2]=c[h>>2];c[h>>2]=d;d=h+4|0;q=c[o>>2]|0;c[o>>2]=c[d>>2];c[d>>2]=q;d=h+8|0;q=c[n>>2]|0;c[n>>2]=c[d>>2];c[d>>2]=q;d=h+12|0;q=c[g>>2]|0;c[g>>2]=c[d>>2];c[d>>2]=q;tg(h);d=c[o>>2]|0;break;}e=l;a=((f-e>>2)+1|0)/2|0;f=l+(a<<2)|0;e=e-m|0;d=f+(0-(e>>2)<<2)|0;if(!e){d=f;e=f;}else {vr(d|0,m|0,e|0)|0;e=(c[n>>2]|0)+(a<<2)|0;}c[o>>2]=d;c[n>>2]=e;}else d=m;while(0);c[d+-4>>2]=c[b>>2];c[o>>2]=(c[o>>2]|0)+-4;V=p;return;}function tg(a){a=a|0;var b=0,d=0,e=0;b=c[a+4>>2]|0;d=a+8|0;e=c[d>>2]|0;if((e|0)!=(b|0))c[d>>2]=e+(~((e+-4-b|0)>>>2)<<2);b=c[a>>2]|0;if(b|0)Da(b,(c[a+12>>2]|0)-b|0);return;}function ug(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;h=V;V=V+16|0;g=h;f=c[b>>2]|0;vg(g,a+8|0,(c[d>>2]|0)-f>>2);a=c[g>>2]|0;e=g+4|0;if((a|0)!=(c[e>>2]|0)){d=f;do{c[a>>2]=c[d>>2];a=(c[g>>2]|0)+4|0;c[g>>2]=a;d=d+4|0;}while((a|0)!=(c[e>>2]|0));c[b>>2]=d;}wg(g);V=h;return;}function vg(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=c[b>>2];c[a+4>>2]=(c[b>>2]|0)+(d<<2);c[a+8>>2]=b;return;}function wg(a){a=a|0;c[c[a+8>>2]>>2]=c[a>>2];return;}function xg(a,b){a=a|0;b=b|0;return (c[a+4>>2]|0)==(c[b+4>>2]|0)|0;}function yg(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;return;}function zg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=c[b+4>>2]|0;d=c[b+16>>2]|0;e=(d>>>0)/93|0;f=g+(e<<2)|0;if((c[b+8>>2]|0)==(g|0))b=0;else b=(c[f>>2]|0)+((d-(e*93|0)|0)*44|0)|0;c[a>>2]=f;c[a+4>>2]=b;return;}function Ag(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=(c[b+16>>2]|0)+(c[b+20>>2]|0)|0;g=c[b+4>>2]|0;e=(d>>>0)/93|0;f=g+(e<<2)|0;if((c[b+8>>2]|0)==(g|0))b=0;else b=(c[f>>2]|0)+((d-(e*93|0)|0)*44|0)|0;c[a>>2]=f;c[a+4>>2]=b;return;}function Bg(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;i=V;V=V+16|0;e=i+8|0;g=i;Cg(e,a);fg(g,a);f=e+4|0;b=c[f>>2]|0;g=g+4|0;if((b|0)!=(c[g>>2]|0))do{Ic(b);b=(c[f>>2]|0)+44|0;c[f>>2]=b;d=c[e>>2]|0;if((b-(c[d>>2]|0)|0)==4092){b=d+4|0;c[e>>2]=b;b=c[b>>2]|0;c[f>>2]=b;}}while((b|0)!=(c[g>>2]|0));c[a+20>>2]=0;f=a+8|0;e=a+4|0;d=c[e>>2]|0;b=(c[f>>2]|0)-d>>2;if(b>>>0>2)do{Da(c[d>>2]|0,4092);d=(c[e>>2]|0)+4|0;c[e>>2]=d;b=(c[f>>2]|0)-d>>2;}while(b>>>0>2);switch(b|0){case 1:{b=46;h=11;break;}case 2:{b=93;h=11;break;}default:{}}if((h|0)==11)c[a+16>>2]=b;V=i;return;}function Cg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;g=c[b+4>>2]|0;d=c[b+16>>2]|0;e=(d>>>0)/93|0;f=g+(e<<2)|0;if((c[b+8>>2]|0)==(g|0))b=0;else b=(c[f>>2]|0)+((d-(e*93|0)|0)*44|0)|0;c[a>>2]=f;c[a+4>>2]=b;return;}function Dg(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;m=V;V=V+16|0;l=m;j=b+4|0;if(!(a[j>>0]|0)){l=De(e)|0;Ee(l,f,c[b>>2]|0);l=c[b>>2]|0;i=f+l|0;if(!l)g=0;else {g=f;h=c[b+8>>2]|0;while(1){a[h>>0]=a[g>>0]|0;g=g+1|0;if((g|0)==(i|0))break;else h=h+1|0;}g=c[b>>2]|0;}a[j>>0]=1;f=f+g|0;}else {h=c[b+20>>2]|0;g=c[b+8>>2]|0;Cg(l,b+32|0);b=b+12|0;if((g|0)!=(c[b>>2]|0)){k=l+4|0;j=g;i=h;g=c[k>>2]|0;while(1){h=d[j>>0]|0;h=Eg((Zc(e,g)|0)+h|0)|0;a[i>>0]=h;a[f>>0]=h;a[j>>0]=h;j=j+1|0;f=f+1|0;h=c[l>>2]|0;g=(c[k>>2]|0)+44|0;c[k>>2]=g;if((g-(c[h>>2]|0)|0)==4092){g=h+4|0;c[l>>2]=g;g=c[g>>2]|0;c[k>>2]=g;}if((j|0)==(c[b>>2]|0))break;else i=i+1|0;}}}V=m;return f|0;}function Eg(a){a=a|0;return a&255|0;}function Fg(a){a=a|0;pq(a);jp(a);return;}function Gg(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function Hg(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==11262?a+12|0:0)|0;}function Ig(a){a=a|0;Da(a,16);return;}function Jg(a,b){a=a|0;b=b|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;if(b|0){Yf(a,b);Lg(a,b);}return;}function Kg(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;if(b|0)Mg(a,b,d);return;}function Lg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;g=V;V=V+16|0;f=g;ag(f,b,d);d=f+4|0;b=c[d>>2]|0;e=f+8|0;if((b|0)!=(c[e>>2]|0))do{a[b>>0]=0;b=(c[d>>2]|0)+1|0;c[d>>2]=b;}while((b|0)!=(c[e>>2]|0));bg(f);V=g;return;}function Mg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=V;V=V+96|0;n=o+80|0;k=o+64|0;h=o+48|0;i=o+40|0;j=o+8|0;f=o;l=o+32|0;m=o+16|0;e=(c[a+8>>2]|0)-(c[a+4>>2]|0)|0;e=((e|0)==0?0:((e>>2)*93|0)+-1|0)-((c[a+20>>2]|0)+(c[a+16>>2]|0))|0;if(e>>>0<b>>>0)eg(a,b-e|0);fg(i,a);fg(f,a);e=c[f>>2]|0;f=c[f+4>>2]|0;g=j;c[g>>2]=e;c[g+4>>2]=f;g=e;if(b|0){e=((f-(c[e>>2]|0)|0)/44|0)+b|0;if((e|0)>0){b=(e>>>0)/93|0;g=g+(b<<2)|0;c[j>>2]=g;e=(c[g>>2]|0)+((e-(b*93|0)|0)*44|0)|0;}else {e=92-e|0;b=g+(((e|0)/-93|0)<<2)|0;c[j>>2]=b;e=(c[b>>2]|0)+((92-((e|0)%93|0)|0)*44|0)|0;}c[j+4>>2]=e;}c[k>>2]=c[i>>2];c[k+4>>2]=c[i+4>>2];c[n>>2]=c[j>>2];c[n+4>>2]=c[j+4>>2];gg(h,k,n);hg(n,h);ig(k,h);if(jg(n,k)|0){f=m+4|0;do{kg(l,n);lg(m,a,l);e=c[m>>2]|0;if((e|0)!=(c[f>>2]|0))do{Wc(e,d);e=(c[m>>2]|0)+44|0;c[m>>2]=e;}while((e|0)!=(c[f>>2]|0));mg(m);ng(n)|0;}while(jg(n,k)|0);}V=o;return;}function Ng(a){a=a|0;var b=0,d=0;Bg(a);b=c[a+4>>2]|0;d=c[a+8>>2]|0;if((b|0)!=(d|0))do{Da(c[b>>2]|0,4092);b=b+4|0;}while((b|0)!=(d|0));dg(a);return;}function Og(a,b,d){a=a|0;b=b|0;d=d|0;Md(a);c[a>>2]=4924;c[a+4>>2]=b;c[a+8>>2]=d;return;}function Pg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4944;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Wg(a,e);V=d;return;}function Qg(a,b){a=a|0;b=b|0;return Tg(c[a+8>>2]|0,c[a+4>>2]|0,b)|0;}function Rg(a){a=a|0;var b=0,d=0;c[a>>2]=4924;d=a+8|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){Vg(b);jp(b);}Qd(a);return;}function Sg(a){a=a|0;Rg(a);jp(a);return;}function Tg(a,b,c){a=a|0;b=b|0;c=c|0;return Ug(a+4784|0,b,Be(a,b,c)|0)|0;}function Ug(b,c,d){b=b|0;c=c|0;d=d|0;if(a[b>>0]|0){nc(c);a[b>>0]=0;}return d|0;}function Vg(a){a=a|0;ze(a);return;}function Wg(a,b){a=a|0;b=b|0;return;}function Xg(a){a=a|0;pq(a);jp(a);return;}function Yg(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+8>>2]&255](a);return;}function Zg(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==12004?a+12|0:0)|0;}function _g(a){a=a|0;Da(a,16);return;}function $g(b){b=b|0;a[b>>0]=1;return;}function ah(a,b,d){a=a|0;b=b|0;d=d|0;Md(a);c[a>>2]=4972;c[a+4>>2]=b;c[a+8>>2]=d;return;}function bh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=4992;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Wg(a,e);V=d;return;}function ch(a,b){a=a|0;b=b|0;return fh(c[a+8>>2]|0,c[a+4>>2]|0,b)|0;}function dh(a){a=a|0;var b=0,d=0;c[a>>2]=4972;d=a+8|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){hh(b);jp(b);}Qd(a);return;}function eh(a){a=a|0;dh(a);jp(a);return;}function fh(a,b,c){a=a|0;b=b|0;c=c|0;return gh(a+4784|0,b,Be(a,b,c)|0)|0;}function gh(a,b,c){a=a|0;b=b|0;c=c|0;return Ug(a+328|0,b,qf(a,b,c)|0)|0;}function hh(a){a=a|0;ih(a+4784|0);ze(a);return;}function ih(a){a=a|0;of(a);return;}function jh(a){a=a|0;pq(a);jp(a);return;}function kh(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+8>>2]&255](a);return;}function lh(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==12827?a+12|0:0)|0;}function mh(a){a=a|0;Da(a,16);return;}function nh(a){a=a|0;cf(a);$g(a+328|0);return;}function oh(a,b,d){a=a|0;b=b|0;d=d|0;Md(a);c[a>>2]=5020;c[a+4>>2]=b;c[a+8>>2]=d;return;}function ph(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5040;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Wg(a,e);V=d;return;}function qh(a,b){a=a|0;b=b|0;return th(c[a+8>>2]|0,c[a+4>>2]|0,b)|0;}function rh(a){a=a|0;var b=0,d=0;c[a>>2]=5020;d=a+8|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){vh(b);jp(b);}Qd(a);return;}function sh(a){a=a|0;rh(a);jp(a);return;}function th(a,b,c){a=a|0;b=b|0;c=c|0;return uh(a+4784|0,b,Be(a,b,c)|0)|0;}function uh(a,b,c){a=a|0;b=b|0;c=c|0;return Ug(a+316|0,b,If(a,b,c)|0)|0;}function vh(a){a=a|0;wh(a+4784|0);ze(a);return;}function wh(a){a=a|0;Hf(a);return;}function xh(a){a=a|0;pq(a);jp(a);return;}function yh(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+8>>2]&255](a);return;}function zh(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==13672?a+12|0:0)|0;}function Ah(a){a=a|0;Da(a,16);return;}function Bh(a){a=a|0;Cf(a);$g(a+316|0);return;}function Ch(a,b,d){a=a|0;b=b|0;d=d|0;Md(a);c[a>>2]=5068;c[a+4>>2]=b;c[a+8>>2]=d;return;}function Dh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5088;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Wg(a,e);V=d;return;}function Eh(a,b){a=a|0;b=b|0;return Hh(c[a+8>>2]|0,c[a+4>>2]|0,b)|0;}function Fh(a){a=a|0;var b=0,d=0;c[a>>2]=5068;d=a+8|0;b=c[d>>2]|0;c[d>>2]=0;if(b|0){Jh(b);jp(b);}Qd(a);return;}function Gh(a){a=a|0;Fh(a);jp(a);return;}function Hh(a,b,c){a=a|0;b=b|0;c=c|0;return Ih(a+4784|0,b,Be(a,b,c)|0)|0;}function Ih(a,b,c){a=a|0;b=b|0;c=c|0;return uh(a+328|0,b,qf(a,b,c)|0)|0;}function Jh(a){a=a|0;Kh(a+4784|0);ze(a);return;}function Kh(a){a=a|0;wh(a+328|0);of(a);return;}function Lh(a){a=a|0;pq(a);jp(a);return;}function Mh(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+8>>2]&255](a);return;}function Nh(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==14573?a+12|0:0)|0;}function Oh(a){a=a|0;Da(a,16);return;}function Ph(a){a=a|0;cf(a);Bh(a+328|0);return;}function Qh(a){a=a|0;return a+20|0;}function Rh(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=b;c[a+4>>2]=d;c[a+8>>2]=0;return;}function Sh(a,b){a=a|0;b=b|0;c[a>>2]=b;c[a+4>>2]=0;c[a+8>>2]=-1;return;}function Th(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=V;V=V+16|0;e=d+4|0;g=d;f=eq(24)|0;ii(f,b);c[g>>2]=0;c[e>>2]=c[g>>2];ji(a,f,e);V=d;return;}function Uh(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function Vh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5116;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xh(a,e);V=d;return;}function Wh(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function Xh(a,b){a=a|0;b=b|0;return;}function Yh(a){a=a|0;pq(a);jp(a);return;}function Zh(a){a=a|0;a=c[a+12>>2]|0;if(a|0)jp(a);return;}function _h(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==14966?a+12|0:0)|0;}function $h(a){a=a|0;Da(a,16);return;}function ai(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5144;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;ci(a,e);V=d;return;}function bi(a){a=a|0;var b=0,d=0;a=c[a+4>>2]|0;if(a|0?(d=a+4|0,b=c[d>>2]|0,c[d>>2]=b+-1,(b|0)==0):0){ca[c[(c[a>>2]|0)+8>>2]&255](a);qq(a);}return;}function ci(a,b){a=a|0;b=b|0;return;}function di(a){a=a|0;pq(a);jp(a);return;}function ei(a){a=a|0;a=c[a+12>>2]|0;if(a|0){hi(a);jp(a);}return;}function fi(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==15127?a+12|0:0)|0;}function gi(a){a=a|0;Da(a,16);return;}function hi(a){a=a|0;return;}function ii(b,d){b=b|0;d=d|0;Md(b);c[b>>2]=5172;c[b+4>>2]=d;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;a[b+20>>0]=1;return;}function ji(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5192;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;pi(a,e);V=d;return;}function ki(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;k=V;V=V+16|0;h=k;e=c[b+8>>2]|0;i=c[b+12>>2]|0;if((e|0)!=(i|0)){j=h+4|0;do{f=c[e>>2]|0;c[h>>2]=f;g=c[e+4>>2]|0;c[j>>2]=g;if(g|0){g=g+4|0;c[g>>2]=(c[g>>2]|0)+1;}d=$[c[(c[f>>2]|0)+12>>2]&63](f,d)|0;Sd(h);e=e+8|0;}while((e|0)!=(i|0));}e=b+20|0;if(a[e>>0]|0){a[e>>0]=0;ni(c[b+4>>2]|0);}V=k;return d|0;}function li(a){a=a|0;c[a>>2]=5172;Td(a+8|0);Qd(a);return;}function mi(a){a=a|0;li(a);jp(a);return;}function ni(a){a=a|0;var b=0;b=((oi(c[a>>2]|0)|0)&255)<<24;b=((oi(c[a>>2]|0)|0)&255)<<16|b;b=b|((oi(c[a>>2]|0)|0)&255)<<8;c[a+4>>2]=b|(oi(c[a>>2]|0)|0)&255;return;}function oi(b){b=b|0;var d=0,e=0;d=c[b>>2]|0;e=b+8|0;b=c[e>>2]|0;c[e>>2]=b+1;return a[d+b>>0]|0;}function pi(a,b){a=a|0;b=b|0;return;}function qi(a){a=a|0;pq(a);jp(a);return;}function ri(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+8>>2]&255](a);return;}function si(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==15450?a+12|0:0)|0;}function ti(a){a=a|0;Da(a,16);return;}function ui(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(180)|0;wi(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];xi(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function vi(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(180)|0;Ui(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];Vi(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function wi(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=5220;c[a+4>>2]=b;yi(a+8|0);return;}function xi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5244;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function yi(b){b=b|0;xe(b,32,1,8,0);mc(b+80|0,32,1,8,0);a[b+160>>0]=0;a[b+161>>0]=0;Ci(b+164|0);return;}function zi(a){a=a|0;c[a>>2]=5220;Di(a+8|0);le(a);return;}function Ai(a){a=a|0;zi(a);jp(a);return;}function Bi(a,b){a=a|0;b=b|0;return Ei(a+8|0,c[a+4>>2]|0,b)|0;}function Ci(b){b=b|0;a[b+4>>0]=0;return;}function Di(a){a=a|0;qc(a+80|0);ye(a);return;}function Ei(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=V;V=V+16|0;f=h;if(!(a[b+161>>0]|0))oc(b+80|0);g=b+164|0;if(Fi(g)|0){d=Gi(b+80|0,d,c[g>>2]|0,0)|0;c[f>>2]=d;Se(d,e);}else {Ii(Hi(d)|0,e,4);c[f>>2]=Ne(e)|0;}Ji(g,f);V=h;return e+4|0;}function Fi(b){b=b|0;return (a[b+4>>0]|0)!=0|0;}function Gi(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;d=(Ki(a,b,(c[a+36>>2]|0)+(e*44|0)|0)|0)+d|0;b=c[a+24>>2]|0;if((d|0)<0)return d+b|0;else return d-(d>>>0<b>>>0?0:b)|0;return 0;}function Hi(a){a=a|0;return c[a>>2]|0;}function Ii(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((d|0)>0){e=0;do{a[c+e>>0]=oi(b)|0;e=e+1|0;}while((e|0)!=(d|0));}return;}function Ji(b,d){b=b|0;d=d|0;var e=0;e=b+4|0;if(!(a[e>>0]|0))a[e>>0]=1;c[b>>2]=c[d>>2];return;}function Ki(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;d=Li(b,d)|0;c[a>>2]=d;do if(d){if(d>>>0>=32){d=c[a+28>>2]|0;break;}e=c[a+12>>2]|0;if(d>>>0>e>>>0){e=d-e|0;d=Li(b,(c[a+68>>2]|0)+((d+-1|0)*44|0)|0)|0;e=d<<e|(Mi(b,e)|0);}else e=Li(b,(c[a+68>>2]|0)+((d+-1|0)*44|0)|0)|0;d=c[a>>2]|0;if((e|0)<(1<<d+-1|0)){d=e+1+(-1<<d)|0;break;}else {d=e+1|0;break;}}else d=Ni(b,a+48|0)|0;while(0);return d|0;}function Li(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;n=a+8|0;m=c[n>>2]|0;f=c[b+16>>2]|0;if(f){e=a+4|0;d=c[e>>2]|0;l=m>>>15;c[n>>2]=l;j=(d>>>0)/(l>>>0)|0;i=j>>>(c[b+40>>2]|0);g=c[f+(i<<2)>>2]|0;i=(c[f+(i+1<<2)>>2]|0)+1|0;h=g+1|0;k=c[b+8>>2]|0;if(i>>>0>h>>>0){f=g;g=i;do{h=(g+f|0)>>>1;i=(c[k+(h<<2)>>2]|0)>>>0>j>>>0;f=i?f:h;g=i?h:g;h=f+1|0;}while(g>>>0>h>>>0);g=f;}f=q(c[k+(g<<2)>>2]|0,l)|0;if((g|0)==(c[b+32>>2]|0))h=m;else h=q(c[k+(h<<2)>>2]|0,l)|0;}else {k=m>>>15;c[n>>2]=k;i=c[b>>2]|0;l=c[b+8>>2]|0;e=a+4|0;d=c[e>>2]|0;j=i>>>1;f=0;h=m;g=0;do{o=q(c[l+(j<<2)>>2]|0,k)|0;m=o>>>0>d>>>0;h=m?o:h;f=m?f:o;g=m?g:j;i=m?j:i;j=(g+i|0)>>>1;}while((j|0)!=(g|0));}c[e>>2]=d-f;o=h-f|0;c[n>>2]=o;if(o>>>0<16777216)Oi(a);n=(c[b+12>>2]|0)+(g<<2)|0;c[n>>2]=(c[n>>2]|0)+1;n=b+28|0;o=(c[n>>2]|0)+-1|0;c[n>>2]=o;if(!o)Xc(b);return g|0;}function Mi(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;if(b>>>0>19){d=(Pi(a)|0)&65535;return (Mi(a,b+-16|0)|0)<<16|d|0;}e=a+4|0;f=c[e>>2]|0;g=a+8|0;d=(c[g>>2]|0)>>>b;c[g>>2]=d;b=(f>>>0)/(d>>>0)|0;c[e>>2]=f-(q(b,d)|0);if(d>>>0<16777216)Oi(a);return b|0;}function Ni(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;e=a+8|0;f=c[e>>2]|0;d=q(f>>>13,c[b+8>>2]|0)|0;g=a+4|0;h=c[g>>2]|0;i=h>>>0>=d>>>0;if(i){c[g>>2]=h-d;d=f-d|0;c[e>>2]=d;}else {c[e>>2]=d;h=b+12|0;c[h>>2]=(c[h>>2]|0)+1;}if(d>>>0<16777216)Oi(a);h=b+4|0;a=(c[h>>2]|0)+-1|0;c[h>>2]=a;if(!a)cd(b);return i&1|0;}function Oi(a){a=a|0;var b=0,d=0,e=0,f=0;b=a+4|0;d=a+8|0;e=c[b>>2]|0;do{e=e<<8|(oi(c[a>>2]|0)|0)&255;c[b>>2]=e;f=c[d>>2]<<8;c[d>>2]=f;}while(f>>>0<16777216);return;}function Pi(a){a=a|0;var b=0,d=0,e=0,f=0;d=a+4|0;f=c[d>>2]|0;b=a+8|0;e=(c[b>>2]|0)>>>16;c[b>>2]=e;b=(f>>>0)/(e>>>0)|0;c[d>>2]=f-(q(b,e)|0);Oi(a);return b&65535|0;}function Qi(a){a=a|0;pq(a);jp(a);return;}function Ri(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function Si(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==15904?a+12|0:0)|0;}function Ti(a){a=a|0;Da(a,16);return;}function Ui(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=5272;c[a+4>>2]=b;Wi(a+8|0);return;}function Vi(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5296;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function Wi(b){b=b|0;xe(b,32,1,8,0);mc(b+80|0,32,1,8,0);a[b+160>>0]=0;a[b+161>>0]=0;_i(b+164|0);return;}function Xi(a){a=a|0;c[a>>2]=5272;$i(a+8|0);le(a);return;}function Yi(a){a=a|0;Xi(a);jp(a);return;}function Zi(a,b){a=a|0;b=b|0;return aj(a+8|0,c[a+4>>2]|0,b)|0;}function _i(b){b=b|0;a[b+4>>0]=0;return;}function $i(a){a=a|0;qc(a+80|0);ye(a);return;}function aj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=V;V=V+16|0;f=h;if(!(a[b+161>>0]|0))oc(b+80|0);g=b+164|0;if(bj(g)|0){d=Gi(b+80|0,d,c[g>>2]|0,0)|0;c[f>>2]=d;We(d,e);}else {Ii(Hi(d)|0,e,4);c[f>>2]=Re(e)|0;}cj(g,f);V=h;return e+4|0;}function bj(b){b=b|0;return (a[b+4>>0]|0)!=0|0;}function cj(b,d){b=b|0;d=d|0;var e=0;e=b+4|0;if(!(a[e>>0]|0))a[e>>0]=1;c[b>>2]=c[d>>2];return;}function dj(a){a=a|0;pq(a);jp(a);return;}function ej(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function fj(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==16402?a+12|0:0)|0;}function gj(a){a=a|0;Da(a,16);return;}function hj(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(172)|0;jj(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];kj(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function ij(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(176)|0;Aj(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];Bj(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function jj(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=5324;c[a+4>>2]=b;lj(a+8|0);return;}function kj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5348;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function lj(b){b=b|0;xe(b,8,1,8,0);mc(b+80|0,8,1,8,0);a[b+160>>0]=0;a[b+161>>0]=0;pj(b+162|0);return;}function mj(a){a=a|0;c[a>>2]=5324;qj(a+8|0);le(a);return;}function nj(a){a=a|0;mj(a);jp(a);return;}function oj(a,b){a=a|0;b=b|0;return rj(a+8|0,c[a+4>>2]|0,b)|0;}function pj(b){b=b|0;a[b+1>>0]=0;return;}function qj(a){a=a|0;qc(a+80|0);ye(a);return;}function rj(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;g=V;V=V+16|0;e=g;if(!(a[b+161>>0]|0))oc(b+80|0);f=b+162|0;if(sj(f)|0){c=(Gi(b+80|0,c,a[f>>0]|0,0)|0)&255;a[e>>0]=c;tj(c,d);}else {Ii(Hi(c)|0,d,1);a[e>>0]=uj(d)|0;}vj(f,e);V=g;return d+1|0;}function sj(b){b=b|0;return (a[b+1>>0]|0)!=0|0;}function tj(b,c){b=b|0;c=c|0;a[c>>0]=b;return;}function uj(b){b=b|0;return a[b>>0]|0;}function vj(b,c){b=b|0;c=c|0;var d=0;d=b+1|0;if(!(a[d>>0]|0))a[d>>0]=1;a[b>>0]=a[c>>0]|0;return;}function wj(a){a=a|0;pq(a);jp(a);return;}function xj(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function yj(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==16900?a+12|0:0)|0;}function zj(a){a=a|0;Da(a,16);return;}function Aj(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=5376;c[a+4>>2]=b;Cj(a+8|0);return;}function Bj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5400;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function Cj(b){b=b|0;xe(b,16,1,8,0);mc(b+80|0,16,1,8,0);a[b+160>>0]=0;a[b+161>>0]=0;Gj(b+162|0);return;}function Dj(a){a=a|0;c[a>>2]=5376;Hj(a+8|0);le(a);return;}function Ej(a){a=a|0;Dj(a);jp(a);return;}function Fj(a,b){a=a|0;b=b|0;return Ij(a+8|0,c[a+4>>2]|0,b)|0;}function Gj(b){b=b|0;a[b+2>>0]=0;return;}function Hj(a){a=a|0;qc(a+80|0);ye(a);return;}function Ij(c,d,e){c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=V;V=V+16|0;f=h;if(!(a[c+161>>0]|0))oc(c+80|0);g=c+162|0;if(Jj(g)|0){d=(Gi(c+80|0,d,b[g>>1]|0,0)|0)&65535;b[f>>1]=d;Kj(d,e);}else {Ii(Hi(d)|0,e,2);b[f>>1]=Lj(e)|0;}Mj(g,f);V=h;return e+2|0;}function Jj(b){b=b|0;return (a[b+2>>0]|0)!=0|0;}function Kj(a,b){a=a|0;b=b|0;Te(a,b);return;}function Lj(a){a=a|0;return Oe(a)|0;}function Mj(c,d){c=c|0;d=d|0;var e=0;e=c+2|0;if(!(a[e>>0]|0))a[e>>0]=1;b[c>>1]=b[d>>1]|0;return;}function Nj(a){a=a|0;pq(a);jp(a);return;}function Oj(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function Pj(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==17398?a+12|0:0)|0;}function Qj(a){a=a|0;Da(a,16);return;}function Rj(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(172)|0;Tj(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];Uj(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function Sj(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;j=V;V=V+32|0;e=j+12|0;f=j;b=j+8|0;h=eq(176)|0;gk(h,c[a+4>>2]|0);g=a+8|0;c[b>>2]=0;c[e>>2]=c[b>>2];hk(f,h,e);h=a+12|0;b=c[h>>2]|0;i=a+16|0;do if(b>>>0>=(c[i>>2]|0)>>>0){b=(b-(c[g>>2]|0)>>3)+1|0;d=ee(g)|0;if(d>>>0<b>>>0)cr(g);else {k=c[g>>2]|0;l=(c[i>>2]|0)-k|0;i=l>>2;be(e,l>>3>>>0<d>>>1>>>0?i>>>0<b>>>0?b:i:d,(c[h>>2]|0)-k>>3,a+16|0);i=e+8|0;h=c[i>>2]|0;c[h>>2]=c[f>>2];a=f+4|0;c[h+4>>2]=c[a>>2];c[f>>2]=0;c[a>>2]=0;c[i>>2]=h+8;ce(g,e);de(e);break;}}else {$d(e,g,1);l=e+4|0;k=c[l>>2]|0;c[k>>2]=c[f>>2];i=f+4|0;c[k+4>>2]=c[i>>2];c[f>>2]=0;c[i>>2]=0;c[l>>2]=k+8;ae(e);}while(0);Sd(f);V=j;return;}function Tj(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=5428;c[a+4>>2]=b;Vj(a+8|0);return;}function Uj(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5452;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function Vj(b){b=b|0;xe(b,8,1,8,0);mc(b+80|0,8,1,8,0);a[b+160>>0]=0;a[b+161>>0]=0;Zj(b+162|0);return;}function Wj(a){a=a|0;c[a>>2]=5428;_j(a+8|0);le(a);return;}function Xj(a){a=a|0;Wj(a);jp(a);return;}function Yj(a,b){a=a|0;b=b|0;return $j(a+8|0,c[a+4>>2]|0,b)|0;}function Zj(b){b=b|0;a[b+1>>0]=0;return;}function _j(a){a=a|0;qc(a+80|0);ye(a);return;}function $j(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0,h=0;h=V;V=V+16|0;f=h;if(!(a[b+161>>0]|0))oc(b+80|0);g=b+162|0;if(ak(g)|0){c=(Gi(b+80|0,c,d[g>>0]|0,0)|0)&255;a[f>>0]=c;Ue(c,e);}else {Ii(Hi(c)|0,e,1);a[f>>0]=Pe(e)|0;}bk(g,f);V=h;return e+1|0;}function ak(b){b=b|0;return (a[b+1>>0]|0)!=0|0;}function bk(b,c){b=b|0;c=c|0;var d=0;d=b+1|0;if(!(a[d>>0]|0))a[d>>0]=1;a[b>>0]=a[c>>0]|0;return;}function ck(a){a=a|0;pq(a);jp(a);return;}function dk(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function ek(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==17896?a+12|0:0)|0;}function fk(a){a=a|0;Da(a,16);return;}function gk(a,b){a=a|0;b=b|0;fe(a);c[a>>2]=5480;c[a+4>>2]=b;ik(a+8|0);return;}function hk(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;d=V;V=V+16|0;e=d;c[a>>2]=b;f=eq(16)|0;c[f+4>>2]=0;c[f+8>>2]=0;c[f>>2]=5504;c[f+12>>2]=b;c[a+4>>2]=f;c[e>>2]=b;c[e+4>>2]=b;Xe(a,e);V=d;return;}function ik(b){b=b|0;xe(b,16,1,8,0);mc(b+80|0,16,1,8,0);a[b+160>>0]=0;a[b+161>>0]=0;mk(b+162|0);return;}function jk(a){a=a|0;c[a>>2]=5480;nk(a+8|0);le(a);return;}function kk(a){a=a|0;jk(a);jp(a);return;}function lk(a,b){a=a|0;b=b|0;return ok(a+8|0,c[a+4>>2]|0,b)|0;}function mk(b){b=b|0;a[b+2>>0]=0;return;}function nk(a){a=a|0;qc(a+80|0);ye(a);return;}function ok(c,d,f){c=c|0;d=d|0;f=f|0;var g=0,h=0,i=0;i=V;V=V+16|0;g=i;if(!(a[c+161>>0]|0))oc(c+80|0);h=c+162|0;if(pk(h)|0){d=(Gi(c+80|0,d,e[h>>1]|0,0)|0)&65535;b[g>>1]=d;Te(d,f);}else {Ii(Hi(d)|0,f,2);b[g>>1]=Oe(f)|0;}qk(h,g);V=i;return f+2|0;}function pk(b){b=b|0;return (a[b+2>>0]|0)!=0|0;}function qk(c,d){c=c|0;d=d|0;var e=0;e=c+2|0;if(!(a[e>>0]|0))a[e>>0]=1;b[c>>1]=b[d>>1]|0;return;}function rk(a){a=a|0;pq(a);jp(a);return;}function sk(a){a=a|0;a=c[a+12>>2]|0;if(a|0)ca[c[(c[a>>2]|0)+4>>2]&255](a);return;}function tk(a,b){a=a|0;b=b|0;return ((c[b+4>>2]|0)==18394?a+12|0:0)|0;}function uk(a){a=a|0;Da(a,16);return;}function vk(){return;}function wk(a){a=a|0;return Ek(a)|0;}function xk(){return 0;}function yk(){return 0;}function zk(a){a=a|0;if(a|0){Fk(a);jp(a);}return;}function Ak(){return Gk()|0;}function Bk(){return Hk()|0;}function Ck(){return Ik()|0;}function Dk(){return 0;}function Ek(a){a=a|0;return 3360;}function Fk(a){a=a|0;var b=0,d=0,e=0,f=0;b=V;V=V+16|0;e=b;c[e>>2]=c[a>>2];c[a>>2]=0;d=a+4|0;c[e+4>>2]=c[d>>2];c[d>>2]=0;wa(e);d=a+8|0;c[e>>2]=c[d>>2];c[d>>2]=0;f=a+12|0;c[e+4>>2]=c[f>>2];c[f>>2]=0;Ga(e);Ga(d);wa(a);V=b;return;}function Gk(){return 3360;}function Hk(){return 3368;}function Ik(){return 3384;}function Jk(){return 18579;}function Kk(){return 18582;}function Lk(){return 18584;}function Mk(){var a=0;a=eq(16)|0;Tk(a);return a|0;}function Nk(a){a=a|0;var b=0,c=0,d=0,e=0;b=V;V=V+16|0;c=b;e=Ak()|0;d=Pk(c)|0;c=Qk(c)|0;E(e|0,d|0,c|0,Jk()|0,12,a|0);V=b;return;}function Ok(a){a=a|0;return Rk(Y[a&3]()|0)|0;}function Pk(a){a=a|0;return 1;}function Qk(a){a=a|0;return Sk()|0;}function Rk(a){a=a|0;return a|0;}function Sk(){return 5524;}function Tk(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;return;}function Uk(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+16|0;e=d;f=d+8|0;h=c[b+4>>2]|0;c[e>>2]=c[b>>2];c[e+4>>2]=h;h=Ak()|0;g=Wk(f)|0;f=Xk(f)|0;b=bl()|0;F(h|0,a|0,g|0,f|0,b|0,4,Yk(e)|0,0);V=d;return;}function Vk(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=Zk(b)|0;b=c[a>>2]|0;f=c[a+4>>2]|0;a=g+(f>>1)|0;if(f&1)b=c[(c[a>>2]|0)+b>>2]|0;f=_k(d)|0;g=$k(e)|0;ea[b&15](a,f,g);return;}function Wk(a){a=a|0;return 4;}function Xk(a){a=a|0;return al()|0;}function Yk(a){a=a|0;var b=0,d=0;b=eq(8)|0;d=c[a+4>>2]|0;c[b>>2]=c[a>>2];c[b+4>>2]=d;return b|0;}function Zk(a){a=a|0;return a|0;}function _k(a){a=a|0;return a|0;}function $k(a){a=a|0;return a|0;}function al(){return 144;}function bl(){return 18587;}function cl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+16|0;e=d;f=d+8|0;h=c[b+4>>2]|0;c[e>>2]=c[b>>2];c[e+4>>2]=h;h=Ak()|0;g=el(f)|0;f=fl(f)|0;b=jl()|0;F(h|0,a|0,g|0,f|0,b|0,7,gl(e)|0,0);V=d;return;}function dl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=Zk(b)|0;b=c[a>>2]|0;e=c[a+4>>2]|0;a=f+(e>>1)|0;if(e&1)b=c[(c[a>>2]|0)+b>>2]|0;f=hl(d)|0;da[b&15](a,f);return;}function el(a){a=a|0;return 3;}function fl(a){a=a|0;return il()|0;}function gl(a){a=a|0;var b=0,d=0;b=eq(8)|0;d=c[a+4>>2]|0;c[b>>2]=c[a>>2];c[b+4>>2]=d;return b|0;}function hl(a){a=a|0;return a|0;}function il(){return 5528;}function jl(){return 18593;}function kl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+16|0;e=d;f=d+8|0;h=c[b+4>>2]|0;c[e>>2]=c[b>>2];c[e+4>>2]=h;h=Ak()|0;g=ml(f)|0;f=nl(f)|0;b=rl()|0;F(h|0,a|0,g|0,f|0,b|0,41,ol(e)|0,0);V=d;return;}function ll(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;e=V;V=V+16|0;d=e;g=Zk(b)|0;b=c[a>>2]|0;f=c[a+4>>2]|0;a=g+(f>>1)|0;if(f&1)b=c[(c[a>>2]|0)+b>>2]|0;c[d>>2]=Z[b&15](a)|0;g=pl(d)|0;V=e;return g|0;}function ml(a){a=a|0;return 2;}function nl(a){a=a|0;return ql()|0;}function ol(a){a=a|0;var b=0,d=0;b=eq(8)|0;d=c[a+4>>2]|0;c[b>>2]=c[a>>2];c[b+4>>2]=d;return b|0;}function pl(a){a=a|0;return c[a>>2]|0;}function ql(){return 5540;}function rl(){return 18598;}function sl(){return;}function tl(a){a=a|0;return Al(a)|0;}function ul(){return 0;}function vl(){return 0;}function wl(a){a=a|0;if(a|0){Bl(a);jp(a);}return;}function xl(){return Cl()|0;}function yl(){return Dl()|0;}function zl(){return El()|0;}function Al(a){a=a|0;return 3400;}function Bl(a){a=a|0;var b=0,d=0,e=0,f=0;b=V;V=V+16|0;e=b;c[e>>2]=c[a>>2];c[a>>2]=0;d=a+4|0;c[e+4>>2]=c[d>>2];c[d>>2]=0;Wh(e);d=a+16|0;c[e>>2]=c[d>>2];c[d>>2]=0;f=a+20|0;c[e+4>>2]=c[f>>2];c[f>>2]=0;Uh(e);c[e>>2]=c[d>>2];c[d>>2]=0;c[e+4>>2]=c[f>>2];c[f>>2]=0;Uh(e);Uh(d);bi(a+8|0);Wh(a);V=b;return;}function Cl(){return 3400;}function Dl(){return 3408;}function El(){return 3424;}function Fl(){var a=0;a=eq(24)|0;Ml(a);return a|0;}function Gl(a){a=a|0;var b=0,c=0,d=0,e=0;b=V;V=V+16|0;c=b;e=xl()|0;d=Il(c)|0;c=Jl(c)|0;E(e|0,d|0,c|0,Jk()|0,13,a|0);V=b;return;}function Hl(a){a=a|0;return Kl(Y[a&3]()|0)|0;}function Il(a){a=a|0;return 1;}function Jl(a){a=a|0;return Ll()|0;}function Kl(a){a=a|0;return a|0;}function Ll(){return 5548;}function Ml(a){a=a|0;c[a>>2]=0;c[a+4>>2]=0;c[a+8>>2]=0;c[a+12>>2]=0;c[a+16>>2]=0;c[a+20>>2]=0;return;}function Nl(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+16|0;e=d;f=d+8|0;h=c[b+4>>2]|0;c[e>>2]=c[b>>2];c[e+4>>2]=h;h=xl()|0;g=Pl(f)|0;f=Ql(f)|0;b=bl()|0;F(h|0,a|0,g|0,f|0,b|0,5,Rl(e)|0,0);V=d;return;}function Ol(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=Sl(b)|0;b=c[a>>2]|0;f=c[a+4>>2]|0;a=g+(f>>1)|0;if(f&1)b=c[(c[a>>2]|0)+b>>2]|0;f=_k(d)|0;g=$k(e)|0;ea[b&15](a,f,g);return;}function Pl(a){a=a|0;return 4;}function Ql(a){a=a|0;return Tl()|0;}function Rl(a){a=a|0;var b=0,d=0;b=eq(8)|0;d=c[a+4>>2]|0;c[b>>2]=c[a>>2];c[b+4>>2]=d;return b|0;}function Sl(a){a=a|0;return a|0;}function Tl(){return 160;}function Ul(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+16|0;e=d;f=d+8|0;h=c[b+4>>2]|0;c[e>>2]=c[b>>2];c[e+4>>2]=h;h=xl()|0;g=Wl(f)|0;f=Xl(f)|0;b=jl()|0;F(h|0,a|0,g|0,f|0,b|0,8,Yl(e)|0,0);V=d;return;}function Vl(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=Sl(b)|0;b=c[a>>2]|0;e=c[a+4>>2]|0;a=f+(e>>1)|0;if(e&1)b=c[(c[a>>2]|0)+b>>2]|0;f=$k(d)|0;da[b&15](a,f);return;}function Wl(a){a=a|0;return 3;}function Xl(a){a=a|0;return Zl()|0;}function Yl(a){a=a|0;var b=0,d=0;b=eq(8)|0;d=c[a+4>>2]|0;c[b>>2]=c[a>>2];c[b+4>>2]=d;return b|0;}function Zl(){return 5552;}function _l(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=V;V=V+16|0;e=d;f=d+8|0;h=c[b+4>>2]|0;c[e>>2]=c[b>>2];c[e+4>>2]=h;h=xl()|0;g=am(f)|0;f=bm(f)|0;b=jl()|0;F(h|0,a|0,g|0,f|0,b|0,9,cm(e)|0,0);V=d;return;}function $l(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=Sl(b)|0;b=c[a>>2]|0;e=c[a+4>>2]|0;a=f+(e>>1)|0;if(e&1)b=c[(c[a>>2]|0)+b>>2]|0;f=hl(d)|0;da[b&15](a,f);return;}function am(a){a=a|0;return 3;}function bm(a){a=a|0;return dm()|0;}function cm(a){a=a|0;var b=0,d=0;b=eq(8)|0;d=c[a+4>>2]|0;c[b>>2]=c[a>>2];c[b+4>>2]=d;return b|0;}function dm(){return 5564;}function em(){ja();return;}function fm(){gm();return;}function gm(){hm(22144);return;}function hm(a){a=a|0;var b=0;b=V;V=V+16|0;c[b>>2]=a;im();V=b;return;}function im(){M(jm()|0,18653);C(km()|0,18658,1,1,0);lm(18663);mm(18668);nm(18680);om(18694);pm(18700);qm(18715);rm(18719);sm(18732);tm(18737);um(18751);vm(18757);K(wm()|0,18764);K(xm()|0,18776);L(ym()|0,4,18809);L(zm()|0,2,18822);L(Am()|0,4,18837);G(Bm()|0,18852);Cm(18868);Dm(18898);Em(18935);Fm(18974);Gm(19005);Hm(19045);Im(19074);Jm(19112);Km(19142);Dm(19181);Em(19213);Fm(19246);Gm(19279);Hm(19313);Im(19346);Lm(19380);Mm(19411);Nm(19443);return;}function jm(){return _n()|0;}function km(){return Zn()|0;}function lm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Xn()|0;I(a|0,c[d>>2]|0,1,-128<<24>>24|0,127<<24>>24|0);V=b;return;}function mm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Vn()|0;I(a|0,c[d>>2]|0,1,-128<<24>>24|0,127<<24>>24|0);V=b;return;}function nm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Tn()|0;I(a|0,c[d>>2]|0,1,0,255);V=b;return;}function om(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Rn()|0;I(a|0,c[d>>2]|0,2,-32768<<16>>16|0,32767<<16>>16|0);V=b;return;}function pm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Pn()|0;I(a|0,c[d>>2]|0,2,0,65535);V=b;return;}function qm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Nn()|0;I(a|0,c[d>>2]|0,4,-2147483648,2147483647);V=b;return;}function rm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Ln()|0;I(a|0,c[d>>2]|0,4,0,-1);V=b;return;}function sm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Jn()|0;I(a|0,c[d>>2]|0,4,-2147483648,2147483647);V=b;return;}function tm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Hn()|0;I(a|0,c[d>>2]|0,4,0,-1);V=b;return;}function um(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Fn()|0;H(a|0,c[d>>2]|0,4);V=b;return;}function vm(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;c[d>>2]=a;a=Dn()|0;H(a|0,c[d>>2]|0,8);V=b;return;}function wm(){return Cn()|0;}function xm(){return Bn()|0;}function ym(){return An()|0;}function zm(){return zn()|0;}function Am(){return yn()|0;}function Bm(){return xn()|0;}function Cm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=un()|0;a=vn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Dm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=rn()|0;a=sn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Em(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=on()|0;a=pn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Fm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=ln()|0;a=mn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Gm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=hn()|0;a=jn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Hm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=en()|0;a=fn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Im(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=bn()|0;a=cn()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Jm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=_m()|0;a=$m()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Km(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=Xm()|0;a=Ym()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Lm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=Um()|0;a=Vm()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Mm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=Rm()|0;a=Sm()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Nm(a){a=a|0;var b=0,d=0,e=0;b=V;V=V+16|0;d=b;c[d>>2]=a;e=Om()|0;a=Pm()|0;J(e|0,a|0,c[d>>2]|0);V=b;return;}function Om(){return Qm()|0;}function Pm(){return 7;}function Qm(){return 3440;}function Rm(){return Tm()|0;}function Sm(){return 7;}function Tm(){return 3448;}function Um(){return Wm()|0;}function Vm(){return 6;}function Wm(){return 3456;}function Xm(){return Zm()|0;}function Ym(){return 5;}function Zm(){return 3464;}function _m(){return an()|0;}function $m(){return 4;}function an(){return 3472;}function bn(){return dn()|0;}function cn(){return 5;}function dn(){return 3480;}function en(){return gn()|0;}function fn(){return 4;}function gn(){return 3488;}function hn(){return kn()|0;}function jn(){return 3;}function kn(){return 3496;}function ln(){return nn()|0;}function mn(){return 2;}function nn(){return 3504;}function on(){return qn()|0;}function pn(){return 1;}function qn(){return 3512;}function rn(){return tn()|0;}function sn(){return 0;}function tn(){return 3520;}function un(){return wn()|0;}function vn(){return 0;}function wn(){return 3528;}function xn(){return 3536;}function yn(){return 3544;}function zn(){return 3576;}function An(){return 3600;}function Bn(){return 3624;}function Cn(){return 3648;}function Dn(){return En()|0;}function En(){return 4144;}function Fn(){return Gn()|0;}function Gn(){return 4136;}function Hn(){return In()|0;}function In(){return 4128;}function Jn(){return Kn()|0;}function Kn(){return 4120;}function Ln(){return Mn()|0;}function Mn(){return 4112;}function Nn(){return On()|0;}function On(){return 4104;}function Pn(){return Qn()|0;}function Qn(){return 4096;}function Rn(){return Sn()|0;}function Sn(){return 4088;}function Tn(){return Un()|0;}function Un(){return 4072;}function Vn(){return Wn()|0;}function Wn(){return 4080;}function Xn(){return Yn()|0;}function Yn(){return 4064;}function Zn(){return 4056;}function _n(){return 4040;}function $n(a){a=a|0;var b=0,d=0,e=0,f=0;b=V;V=V+16|0;d=b+8|0;e=b+4|0;f=b;c[f>>2]=a;c[e>>2]=c[f>>2];c[d>>2]=c[(c[e>>2]|0)+4>>2];a=Jo(c[d>>2]|0)|0;V=b;return a|0;}function ao(){return 21636;}function bo(a){a=a|0;return (a+-48|0)>>>0<10|0;}function co(){return 5576;}function eo(b,c){b=b|0;c=c|0;var d=0,e=0;d=a[b>>0]|0;e=a[c>>0]|0;if(d<<24>>24==0?1:d<<24>>24!=e<<24>>24)b=e;else {do{b=b+1|0;c=c+1|0;d=a[b>>0]|0;e=a[c>>0]|0;}while(!(d<<24>>24==0?1:d<<24>>24!=e<<24>>24));b=e;}return (d&255)-(b&255)|0;}function fo(b){b=b|0;var d=0,e=0,f=0;f=b;a:do if(!(f&3))e=5;else {d=f;while(1){if(!(a[b>>0]|0)){b=d;break a;}b=b+1|0;d=b;if(!(d&3)){e=5;break;}}}while(0);if((e|0)==5){while(1){d=c[b>>2]|0;if(!((d&-2139062144^-2139062144)&d+-16843009))b=b+4|0;else break;}if((d&255)<<24>>24)do b=b+1|0;while((a[b>>0]|0)!=0);}return b-f|0;}function go(a){a=a|0;return;}function ho(a){a=a|0;return 1;}function io(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;e=c[b+44>>2]|0;c[b+28>>2]=e;c[b+20>>2]=e;c[b+16>>2]=e+(c[b+48>>2]|0);b=0;}else {c[b>>2]=d|32;b=-1;}return b|0;}function jo(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=e+16|0;g=c[f>>2]|0;if(!g){if(!(io(e)|0)){g=c[f>>2]|0;h=5;}else f=0;}else h=5;a:do if((h|0)==5){j=e+20|0;i=c[j>>2]|0;f=i;if((g-i|0)>>>0<d>>>0){f=aa[c[e+36>>2]&7](e,b,d)|0;break;}b:do if((a[e+75>>0]|0)<0|(d|0)==0){h=0;g=b;}else {i=d;while(1){g=i+-1|0;if((a[b+g>>0]|0)==10)break;if(!g){h=0;g=b;break b;}else i=g;}f=aa[c[e+36>>2]&7](e,b,i)|0;if(f>>>0<i>>>0)break a;h=i;g=b+i|0;d=d-i|0;f=c[j>>2]|0;}while(0);ur(f|0,g|0,d|0)|0;c[j>>2]=(c[j>>2]|0)+d;f=h+d|0;}while(0);return f|0;}function ko(a,b){a=a|0;b=b|0;if(!b)b=0;else b=lo(c[b>>2]|0,c[b+4>>2]|0,a)|0;return ((b|0)==0?a:b)|0;}function lo(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;o=(c[b>>2]|0)+1794895138|0;h=mo(c[b+8>>2]|0,o)|0;f=mo(c[b+12>>2]|0,o)|0;g=mo(c[b+16>>2]|0,o)|0;a:do if((h>>>0<d>>>2>>>0?(n=d-(h<<2)|0,f>>>0<n>>>0&g>>>0<n>>>0):0)?((g|f)&3|0)==0:0){n=f>>>2;m=g>>>2;l=0;while(1){j=h>>>1;k=l+j|0;i=k<<1;g=i+n|0;f=mo(c[b+(g<<2)>>2]|0,o)|0;g=mo(c[b+(g+1<<2)>>2]|0,o)|0;if(!(g>>>0<d>>>0&f>>>0<(d-g|0)>>>0)){f=0;break a;}if(a[b+(g+f)>>0]|0){f=0;break a;}f=eo(e,b+g|0)|0;if(!f)break;f=(f|0)<0;if((h|0)==1){f=0;break a;}l=f?l:k;h=f?j:h-j|0;}f=i+m|0;g=mo(c[b+(f<<2)>>2]|0,o)|0;f=mo(c[b+(f+1<<2)>>2]|0,o)|0;if(f>>>0<d>>>0&g>>>0<(d-f|0)>>>0)f=(a[b+(f+g)>>0]|0)==0?b+f|0:0;else f=0;}else f=0;while(0);return f|0;}function mo(a,b){a=a|0;b=b|0;var c=0;c=tr(a|0)|0;return ((b|0)==0?a:c)|0;}function no(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=d&255;f=(e|0)!=0;a:do if(f&(b&3|0)!=0){g=d&255;while(1){if((a[b>>0]|0)==g<<24>>24){g=6;break a;}b=b+1|0;e=e+-1|0;f=(e|0)!=0;if(!(f&(b&3|0)!=0)){g=5;break;}}}else g=5;while(0);if((g|0)==5)if(f)g=6;else b=0;b:do if((g|0)==6){if((a[b>>0]|0)!=(d&255)<<24>>24){f=q(h,16843009)|0;c:do if(e>>>0>3)do{h=c[b>>2]^f;if((h&-2139062144^-2139062144)&h+-16843009|0)break c;b=b+4|0;e=e+-4|0;}while(e>>>0>3);while(0);}if(!e)b=0;else {f=d&255;while(1){if((a[b>>0]|0)==f<<24>>24)break b;e=e+-1|0;if(!e){b=0;break;}else b=b+1|0;}}}while(0);return b|0;}function oo(a,b,c){a=a|0;b=b|0;c=c|0;return ro(a,b,c,1,8)|0;}function po(b,e,f,g,h,i){b=b|0;e=+e;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,r=0.0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;H=V;V=V+560|0;l=H+32|0;w=H+536|0;G=H;F=G;m=H+540|0;c[w>>2]=0;E=m+12|0;Do(e)|0;j=u()|0;if((j|0)<0){e=-e;Do(e)|0;D=1;C=20247;j=u()|0;}else {D=(h&2049|0)!=0&1;C=(h&2048|0)==0?(h&1|0)==0?20248:20253:20250;}do if(0==0&(j&2146435072|0)==2146435072){G=(i&32|0)!=0;j=D+3|0;zo(b,32,f,j,h&-65537);to(b,C,D);to(b,e!=e|0.0!=0.0?G?20274:20278:G?20266:20270,3);zo(b,32,f,j,h^8192);}else {r=+Eo(e,w)*2.0;j=r!=0.0;if(j)c[w>>2]=(c[w>>2]|0)+-1;v=i|32;if((v|0)==97){o=i&32;s=(o|0)==0?C:C+9|0;p=D|2;j=12-g|0;do if(!(g>>>0>11|(j|0)==0)){e=8.0;do{j=j+-1|0;e=e*16.0;}while((j|0)!=0);if((a[s>>0]|0)==45){e=-(e+(-r-e));break;}else {e=r+e-e;break;}}else e=r;while(0);k=c[w>>2]|0;j=(k|0)<0?0-k|0:k;j=yo(j,((j|0)<0)<<31>>31,E)|0;if((j|0)==(E|0)){j=m+11|0;a[j>>0]=48;}a[j+-1>>0]=(k>>31&2)+43;n=j+-2|0;a[n>>0]=i+15;k=(g|0)<1;l=(h&8|0)==0;m=G;do{D=~~e;j=m+1|0;a[m>>0]=o|d[640+D>>0];e=(e-+(D|0))*16.0;if((j-F|0)==1?!(l&(k&e==0.0)):0){a[j>>0]=46;m=m+2|0;}else m=j;}while(e!=0.0);if((g|0)!=0?(-2-F+m|0)<(g|0):0){k=E;l=n;j=g+2+k-l|0;}else {k=E;l=n;j=k-F-l+m|0;}E=j+p|0;zo(b,32,f,E,h);to(b,s,p);zo(b,48,f,E,h^65536);F=m-F|0;to(b,G,F);G=k-l|0;zo(b,48,j-(F+G)|0,0,0);to(b,n,G);zo(b,32,f,E,h^8192);j=E;break;}k=(g|0)<0?6:g;if(j){j=(c[w>>2]|0)+-28|0;c[w>>2]=j;e=r*268435456.0;}else {e=r;j=c[w>>2]|0;}B=(j|0)<0?l:l+288|0;l=B;do{z=~~e>>>0;c[l>>2]=z;l=l+4|0;e=(e-+(z>>>0))*1.0e9;}while(e!=0.0);z=B;if((j|0)>0){o=B;while(1){n=(j|0)<29?j:29;j=l+-4|0;if(j>>>0>=o>>>0){m=0;do{t=rr(c[j>>2]|0,0,n|0)|0;t=lr(t|0,u()|0,m|0,0)|0;x=u()|0;m=pr(t|0,x|0,1e9,0)|0;y=kr(m|0,u()|0,1e9,0)|0;y=mr(t|0,x|0,y|0,u()|0)|0;u()|0;c[j>>2]=y;j=j+-4|0;}while(j>>>0>=o>>>0);if(m){y=o+-4|0;c[y>>2]=m;m=y;}else m=o;}else m=o;a:do if(l>>>0>m>>>0){j=l;while(1){l=j+-4|0;if(c[l>>2]|0){l=j;break a;}if(l>>>0>m>>>0)j=l;else break;}}while(0);j=(c[w>>2]|0)-n|0;c[w>>2]=j;if((j|0)>0)o=m;else break;}}else m=B;if((j|0)<0){g=((k+25|0)/9|0)+1|0;t=(v|0)==102;do{s=0-j|0;s=(s|0)<9?s:9;if(m>>>0<l>>>0){n=(1<<s)+-1|0;o=1e9>>>s;p=0;j=m;do{y=c[j>>2]|0;c[j>>2]=(y>>>s)+p;p=q(y&n,o)|0;j=j+4|0;}while(j>>>0<l>>>0);m=(c[m>>2]|0)==0?m+4|0:m;if(p){c[l>>2]=p;l=l+4|0;}}else m=(c[m>>2]|0)==0?m+4|0:m;j=t?B:m;l=(l-j>>2|0)>(g|0)?j+(g<<2)|0:l;j=(c[w>>2]|0)+s|0;c[w>>2]=j;}while((j|0)<0);t=m;}else t=m;if(t>>>0<l>>>0){j=(z-t>>2)*9|0;n=c[t>>2]|0;if(n>>>0>=10){m=10;do{m=m*10|0;j=j+1|0;}while(n>>>0>=m>>>0);}}else j=0;x=(v|0)==103;y=(k|0)!=0;m=k-((v|0)==102?0:j)+((y&x)<<31>>31)|0;if((m|0)<(((l-z>>2)*9|0)+-9|0)){w=m+9216|0;m=(w|0)/9|0;g=B+4+(m+-1024<<2)|0;m=w-(m*9|0)|0;if((m|0)<8){n=10;while(1){n=n*10|0;if((m|0)<7)m=m+1|0;else break;}}else n=10;p=c[g>>2]|0;m=(p>>>0)/(n>>>0)|0;s=p-(q(m,n)|0)|0;o=(g+4|0)==(l|0);if(!(o&(s|0)==0)){r=(m&1|0)==0?9007199254740992.0:9007199254740994.0;w=n>>>1;e=s>>>0<w>>>0?0.5:o&(s|0)==(w|0)?1.0:1.5;if(D){w=(a[C>>0]|0)==45;e=w?-e:e;r=w?-r:r;}m=p-s|0;c[g>>2]=m;if(r+e!=r){w=m+n|0;c[g>>2]=w;if(w>>>0>999999999){n=g;j=t;while(1){m=n+-4|0;c[n>>2]=0;if(m>>>0<j>>>0){j=j+-4|0;c[j>>2]=0;}w=(c[m>>2]|0)+1|0;c[m>>2]=w;if(w>>>0>999999999)n=m;else {n=j;break;}}}else {m=g;n=t;}j=(z-n>>2)*9|0;p=c[n>>2]|0;if(p>>>0>=10){o=10;do{o=o*10|0;j=j+1|0;}while(p>>>0>=o>>>0);}}else {m=g;n=t;}}else {m=g;n=t;}w=m+4|0;l=l>>>0>w>>>0?w:l;}else n=t;g=0-j|0;b:do if(l>>>0>n>>>0)while(1){m=l+-4|0;if(c[m>>2]|0){w=l;v=1;break b;}if(m>>>0>n>>>0)l=m;else {w=m;v=0;break;}}else {w=l;v=0;}while(0);do if(x){k=k+((y^1)&1)|0;if((k|0)>(j|0)&(j|0)>-5){o=i+-1|0;k=k+-1-j|0;}else {o=i+-2|0;k=k+-1|0;}if(!(h&8)){if(v?(A=c[w+-4>>2]|0,(A|0)!=0):0){if(!((A>>>0)%10|0)){m=0;l=10;do{l=l*10|0;m=m+1|0;}while(!((A>>>0)%(l>>>0)|0|0));}else m=0;}else m=9;l=((w-z>>2)*9|0)+-9|0;if((o|32|0)==102){i=l-m|0;i=(i|0)>0?i:0;k=(k|0)<(i|0)?k:i;break;}else {i=l+j-m|0;i=(i|0)>0?i:0;k=(k|0)<(i|0)?k:i;break;}}}else o=i;while(0);t=(k|0)!=0;p=t?1:h>>>3&1;s=(o|32|0)==102;if(s){x=0;j=(j|0)>0?j:0;}else {l=(j|0)<0?g:j;l=yo(l,((l|0)<0)<<31>>31,E)|0;m=E;if((m-l|0)<2)do{l=l+-1|0;a[l>>0]=48;}while((m-l|0)<2);a[l+-1>>0]=(j>>31&2)+43;j=l+-2|0;a[j>>0]=o;x=j;j=m-j|0;}j=D+1+k+p+j|0;zo(b,32,f,j,h);to(b,C,D);zo(b,48,f,j,h^65536);if(s){p=n>>>0>B>>>0?B:n;s=G+9|0;n=s;o=G+8|0;m=p;do{l=yo(c[m>>2]|0,0,s)|0;if((m|0)==(p|0)){if((l|0)==(s|0)){a[o>>0]=48;l=o;}}else if(l>>>0>G>>>0){wr(G|0,48,l-F|0)|0;do l=l+-1|0;while(l>>>0>G>>>0);}to(b,l,n-l|0);m=m+4|0;}while(m>>>0<=B>>>0);if(!((h&8|0)==0&(t^1)))to(b,20282,1);if(m>>>0<w>>>0&(k|0)>0)while(1){l=yo(c[m>>2]|0,0,s)|0;if(l>>>0>G>>>0){wr(G|0,48,l-F|0)|0;do l=l+-1|0;while(l>>>0>G>>>0);}to(b,l,(k|0)<9?k:9);m=m+4|0;l=k+-9|0;if(!(m>>>0<w>>>0&(k|0)>9)){k=l;break;}else k=l;}zo(b,48,k+9|0,9,0);}else {w=v?w:n+4|0;if(n>>>0<w>>>0&(k|0)>-1){g=G+9|0;t=(h&8|0)==0;v=g;p=0-F|0;s=G+8|0;o=n;do{l=yo(c[o>>2]|0,0,g)|0;if((l|0)==(g|0)){a[s>>0]=48;l=s;}do if((o|0)==(n|0)){m=l+1|0;to(b,l,1);if(t&(k|0)<1){l=m;break;}to(b,20282,1);l=m;}else {if(l>>>0<=G>>>0)break;wr(G|0,48,l+p|0)|0;do l=l+-1|0;while(l>>>0>G>>>0);}while(0);F=v-l|0;to(b,l,(k|0)>(F|0)?F:k);k=k-F|0;o=o+4|0;}while(o>>>0<w>>>0&(k|0)>-1);}zo(b,48,k+18|0,18,0);to(b,x,E-x|0);}zo(b,32,f,j,h^8192);}while(0);V=H;return ((j|0)<(f|0)?f:j)|0;}function qo(a,b){a=a|0;b=b|0;var d=0.0,e=0;e=(c[b>>2]|0)+(8-1)&~(8-1);d=+g[e>>3];c[b>>2]=e+8;g[a>>3]=d;return;}function ro(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;t=V;V=V+224|0;p=t+208|0;q=t+160|0;r=t+80|0;s=t;h=q;i=h+40|0;do{c[h>>2]=0;h=h+4|0;}while((h|0)<(i|0));c[p>>2]=c[e>>2];if((so(0,d,p,r,q,f,g)|0)<0)e=-1;else {if((c[b+76>>2]|0)>-1)o=ho(b)|0;else o=0;e=c[b>>2]|0;n=e&32;if((a[b+74>>0]|0)<1)c[b>>2]=e&-33;h=b+48|0;if(!(c[h>>2]|0)){i=b+44|0;j=c[i>>2]|0;c[i>>2]=s;k=b+28|0;c[k>>2]=s;l=b+20|0;c[l>>2]=s;c[h>>2]=80;m=b+16|0;c[m>>2]=s+80;e=so(b,d,p,r,q,f,g)|0;if(j){aa[c[b+36>>2]&7](b,0,0)|0;e=(c[l>>2]|0)==0?-1:e;c[i>>2]=j;c[h>>2]=0;c[m>>2]=0;c[k>>2]=0;c[l>>2]=0;}}else e=so(b,d,p,r,q,f,g)|0;h=c[b>>2]|0;c[b>>2]=h|n;if(o|0)go(b);e=(h&32|0)==0?e:-1;}V=t;return e|0;}function so(d,e,f,h,i,j,k){d=d|0;e=e|0;f=f|0;h=h|0;i=i|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;J=V;V=V+64|0;G=J+56|0;I=J+40|0;B=J;D=J+48|0;E=J+60|0;c[G>>2]=e;y=(d|0)!=0;z=B+40|0;A=z;B=B+39|0;C=D+4|0;l=0;e=0;n=0;a:while(1){do{do if((e|0)>-1)if((l|0)>(2147483647-e|0)){c[(ao()|0)>>2]=61;e=-1;break;}else {e=l+e|0;break;}while(0);r=c[G>>2]|0;l=a[r>>0]|0;if(!(l<<24>>24)){x=92;break a;}m=r;b:while(1){switch(l<<24>>24){case 37:{x=10;break b;}case 0:{l=m;break b;}default:{}}w=m+1|0;c[G>>2]=w;l=a[w>>0]|0;m=w;}c:do if((x|0)==10){x=0;l=m;do{if((a[m+1>>0]|0)!=37)break c;l=l+1|0;m=m+2|0;c[G>>2]=m;}while((a[m>>0]|0)==37);}while(0);l=l-r|0;if(y)to(d,r,l);}while((l|0)!=0);w=(bo(a[(c[G>>2]|0)+1>>0]|0)|0)==0;m=c[G>>2]|0;if(!w?(a[m+2>>0]|0)==36:0){t=(a[m+1>>0]|0)+-48|0;p=1;l=3;}else {t=-1;p=n;l=1;}l=m+l|0;c[G>>2]=l;m=a[l>>0]|0;n=(m<<24>>24)+-32|0;if(n>>>0>31|(1<<n&75913|0)==0)o=0;else {o=0;do{o=1<<n|o;l=l+1|0;c[G>>2]=l;m=a[l>>0]|0;n=(m<<24>>24)+-32|0;}while(!(n>>>0>31|(1<<n&75913|0)==0));}if(m<<24>>24==42){if((bo(a[l+1>>0]|0)|0)!=0?(H=c[G>>2]|0,(a[H+2>>0]|0)==36):0){l=H+1|0;c[i+((a[l>>0]|0)+-48<<2)>>2]=10;l=c[h+((a[l>>0]|0)+-48<<3)>>2]|0;n=1;m=H+3|0;}else {if(p|0){e=-1;break;}if(y){w=(c[f>>2]|0)+(4-1)&~(4-1);l=c[w>>2]|0;c[f>>2]=w+4;}else l=0;n=0;m=(c[G>>2]|0)+1|0;}c[G>>2]=m;w=(l|0)<0;v=w?0-l|0:l;o=w?o|8192:o;w=n;}else {l=uo(G)|0;if((l|0)<0){e=-1;break;}v=l;w=p;m=c[G>>2]|0;}do if((a[m>>0]|0)==46){l=m+1|0;if((a[l>>0]|0)!=42){c[G>>2]=l;l=uo(G)|0;m=c[G>>2]|0;break;}if(bo(a[m+2>>0]|0)|0?(F=c[G>>2]|0,(a[F+3>>0]|0)==36):0){l=F+2|0;c[i+((a[l>>0]|0)+-48<<2)>>2]=10;l=c[h+((a[l>>0]|0)+-48<<3)>>2]|0;m=F+4|0;c[G>>2]=m;break;}if(w|0){e=-1;break a;}if(y){s=(c[f>>2]|0)+(4-1)&~(4-1);l=c[s>>2]|0;c[f>>2]=s+4;}else l=0;m=(c[G>>2]|0)+2|0;c[G>>2]=m;}else l=-1;while(0);s=0;while(1){if(((a[m>>0]|0)+-65|0)>>>0>57){e=-1;break a;}n=m;m=m+1|0;c[G>>2]=m;n=a[(a[n>>0]|0)+-65+(176+(s*58|0))>>0]|0;p=n&255;if((p+-1|0)>>>0>=8)break;else s=p;}if(!(n<<24>>24)){e=-1;break;}q=(t|0)>-1;do if(n<<24>>24==19){if(q){e=-1;break a;}else x=54;}else {if(q){c[i+(t<<2)>>2]=p;q=h+(t<<3)|0;t=c[q+4>>2]|0;x=I;c[x>>2]=c[q>>2];c[x+4>>2]=t;x=54;break;}if(!y){e=0;break a;}vo(I,p,f,k);m=c[G>>2]|0;x=55;}while(0);if((x|0)==54){x=0;if(y)x=55;else l=0;}d:do if((x|0)==55){x=0;m=a[m+-1>>0]|0;m=(s|0)!=0&(m&15|0)==3?m&-33:m;n=o&-65537;t=(o&8192|0)==0?o:n;e:do switch(m|0){case 110:switch((s&255)<<24>>24){case 0:{c[c[I>>2]>>2]=e;l=0;break d;}case 1:{c[c[I>>2]>>2]=e;l=0;break d;}case 2:{l=c[I>>2]|0;c[l>>2]=e;c[l+4>>2]=((e|0)<0)<<31>>31;l=0;break d;}case 3:{b[c[I>>2]>>1]=e;l=0;break d;}case 4:{a[c[I>>2]>>0]=e;l=0;break d;}case 6:{c[c[I>>2]>>2]=e;l=0;break d;}case 7:{l=c[I>>2]|0;c[l>>2]=e;c[l+4>>2]=((e|0)<0)<<31>>31;l=0;break d;}default:{l=0;break d;}}case 112:{m=120;l=l>>>0>8?l:8;n=t|8;x=67;break;}case 88:case 120:{n=t;x=67;break;}case 111:{q=I;q=xo(c[q>>2]|0,c[q+4>>2]|0,z)|0;n=A-q|0;o=0;p=20230;l=(t&8|0)==0|(l|0)>(n|0)?l:n+1|0;n=t;x=73;break;}case 105:case 100:{n=I;m=c[n>>2]|0;n=c[n+4>>2]|0;if((n|0)<0){m=mr(0,0,m|0,n|0)|0;n=u()|0;o=I;c[o>>2]=m;c[o+4>>2]=n;o=1;p=20230;x=72;break e;}else {o=(t&2049|0)!=0&1;p=(t&2048|0)==0?(t&1|0)==0?20230:20232:20231;x=72;break e;}}case 117:{n=I;o=0;p=20230;m=c[n>>2]|0;n=c[n+4>>2]|0;x=72;break;}case 99:{a[B>>0]=c[I>>2];r=B;o=0;p=20230;q=1;m=n;l=A;break;}case 115:{s=c[I>>2]|0;s=(s|0)==0?20240:s;t=no(s,0,l)|0;K=(t|0)==0;r=s;o=0;p=20230;q=K?l:t-s|0;m=n;l=K?s+l|0:t;break;}case 67:{c[D>>2]=c[I>>2];c[C>>2]=0;c[I>>2]=D;p=-1;x=79;break;}case 83:{if(!l){zo(d,32,v,0,t);l=0;x=89;}else {p=l;x=79;}break;}case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:{l=_[j&1](d,+g[I>>3],v,l,t,m)|0;break d;}default:{o=0;p=20230;q=l;m=t;l=A;}}while(0);f:do if((x|0)==67){q=I;q=wo(c[q>>2]|0,c[q+4>>2]|0,z,m&32)|0;p=I;p=(n&8|0)==0|(c[p>>2]|0)==0&(c[p+4>>2]|0)==0;o=p?0:2;p=p?20230:20230+(m>>>4)|0;x=73;}else if((x|0)==72){q=yo(m,n,z)|0;n=t;x=73;}else if((x|0)==79){x=0;o=c[I>>2]|0;l=0;while(1){m=c[o>>2]|0;if(!m)break;m=Ao(E,m)|0;n=(m|0)<0;if(n|m>>>0>(p-l|0)>>>0){x=83;break;}l=m+l|0;if(p>>>0>l>>>0)o=o+4|0;else break;}if((x|0)==83){x=0;if(n){e=-1;break a;}}zo(d,32,v,l,t);if(!l){l=0;x=89;}else {n=c[I>>2]|0;o=0;while(1){m=c[n>>2]|0;if(!m){x=89;break f;}m=Ao(E,m)|0;o=m+o|0;if((o|0)>(l|0)){x=89;break f;}to(d,E,m);if(o>>>0>=l>>>0){x=89;break;}else n=n+4|0;}}}while(0);if((x|0)==73){x=0;m=I;m=(c[m>>2]|0)!=0|(c[m+4>>2]|0)!=0;K=(l|0)!=0|m;m=A-q+((m^1)&1)|0;r=K?q:z;q=K?(l|0)>(m|0)?l:m:0;m=(l|0)>-1?n&-65537:n;l=A;}else if((x|0)==89){x=0;zo(d,32,v,l,t^8192);l=(v|0)>(l|0)?v:l;break;}t=l-r|0;s=(q|0)<(t|0)?t:q;K=s+o|0;l=(v|0)<(K|0)?K:v;zo(d,32,l,K,m);to(d,p,o);zo(d,48,l,K,m^65536);zo(d,48,s,t,0);to(d,r,t);zo(d,32,l,K,m^8192);}while(0);n=w;}g:do if((x|0)==92)if(!d)if(!n)e=0;else {e=1;while(1){l=c[i+(e<<2)>>2]|0;if(!l)break;vo(h+(e<<3)|0,l,f,k);e=e+1|0;if(e>>>0>=10){e=1;break g;}}while(1){if(c[i+(e<<2)>>2]|0){e=-1;break g;}e=e+1|0;if(e>>>0>=10){e=1;break;}}}while(0);V=J;return e|0;}function to(a,b,d){a=a|0;b=b|0;d=d|0;if(!(c[a>>2]&32))jo(b,d,a)|0;return;}function uo(b){b=b|0;var d=0,e=0;if(!(bo(a[c[b>>2]>>0]|0)|0))d=0;else {d=0;do{e=c[b>>2]|0;d=(d*10|0)+-48+(a[e>>0]|0)|0;e=e+1|0;c[b>>2]=e;}while((bo(a[e>>0]|0)|0)!=0);}return d|0;}function vo(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0;a:do if(b>>>0<=20)do switch(b|0){case 9:{b=(c[d>>2]|0)+(4-1)&~(4-1);e=c[b>>2]|0;c[d>>2]=b+4;c[a>>2]=e;break a;}case 10:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=((b|0)<0)<<31>>31;break a;}case 11:{e=(c[d>>2]|0)+(4-1)&~(4-1);b=c[e>>2]|0;c[d>>2]=e+4;e=a;c[e>>2]=b;c[e+4>>2]=0;break a;}case 12:{e=(c[d>>2]|0)+(8-1)&~(8-1);b=e;f=c[b>>2]|0;b=c[b+4>>2]|0;c[d>>2]=e+8;e=a;c[e>>2]=f;c[e+4>>2]=b;break a;}case 13:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&65535)<<16>>16;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a;}case 14:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&65535;c[f+4>>2]=0;break a;}case 15:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;e=(e&255)<<24>>24;f=a;c[f>>2]=e;c[f+4>>2]=((e|0)<0)<<31>>31;break a;}case 16:{f=(c[d>>2]|0)+(4-1)&~(4-1);e=c[f>>2]|0;c[d>>2]=f+4;f=a;c[f>>2]=e&255;c[f+4>>2]=0;break a;}case 17:{f=(c[d>>2]|0)+(8-1)&~(8-1);h=+g[f>>3];c[d>>2]=f+8;g[a>>3]=h;break a;}case 18:{da[e&15](a,d);break a;}default:break a;}while(0);while(0);return;}function wo(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;if(!((b|0)==0&(c|0)==0))do{e=e+-1|0;a[e>>0]=d[640+(b&15)>>0]|0|f;b=qr(b|0,c|0,4)|0;c=u()|0;}while(!((b|0)==0&(c|0)==0));return e|0;}function xo(b,c,d){b=b|0;c=c|0;d=d|0;if(!((b|0)==0&(c|0)==0))do{d=d+-1|0;a[d>>0]=b&7|48;b=qr(b|0,c|0,3)|0;c=u()|0;}while(!((b|0)==0&(c|0)==0));return d|0;}function yo(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;if(c>>>0>0|(c|0)==0&b>>>0>4294967295){do{e=b;b=pr(b|0,c|0,10,0)|0;f=c;c=u()|0;g=kr(b|0,c|0,10,0)|0;g=mr(e|0,f|0,g|0,u()|0)|0;u()|0;d=d+-1|0;a[d>>0]=g&255|48;}while(f>>>0>9|(f|0)==9&e>>>0>4294967295);c=b;}else c=b;if(c)do{g=c;c=(c>>>0)/10|0;d=d+-1|0;a[d>>0]=g-(c*10|0)|48;}while(g>>>0>=10);return d|0;}function zo(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;g=V;V=V+256|0;f=g;if((c|0)>(d|0)&(e&73728|0)==0){e=c-d|0;wr(f|0,b<<24>>24|0,(e>>>0<256?e:256)|0)|0;if(e>>>0>255){b=c-d|0;do{to(a,f,256);e=e+-256|0;}while(e>>>0>255);e=b&255;}to(a,f,e);}V=g;return;}function Ao(a,b){a=a|0;b=b|0;if(!a)a=0;else a=Bo(a,b,0)|0;return a|0;}function Bo(b,d,e){b=b|0;d=d|0;e=e|0;do if(b){if(d>>>0<128){a[b>>0]=d;b=1;break;}if(!(c[c[(Co()|0)+176>>2]>>2]|0))if((d&-128|0)==57216){a[b>>0]=d;b=1;break;}else {c[(ao()|0)>>2]=25;b=-1;break;}if(d>>>0<2048){a[b>>0]=d>>>6|192;a[b+1>>0]=d&63|128;b=2;break;}if(d>>>0<55296|(d&-8192|0)==57344){a[b>>0]=d>>>12|224;a[b+1>>0]=d>>>6&63|128;a[b+2>>0]=d&63|128;b=3;break;}if((d+-65536|0)>>>0<1048576){a[b>>0]=d>>>18|240;a[b+1>>0]=d>>>12&63|128;a[b+2>>0]=d>>>6&63|128;a[b+3>>0]=d&63|128;b=4;break;}else {c[(ao()|0)>>2]=25;b=-1;break;}}else b=1;while(0);return b|0;}function Co(){return co()|0;}function Do(a){a=+a;var b=0;g[h>>3]=a;b=c[h>>2]|0;t(c[h+4>>2]|0);return b|0;}function Eo(a,b){a=+a;b=b|0;var d=0,e=0,f=0;g[h>>3]=a;d=c[h>>2]|0;e=c[h+4>>2]|0;f=qr(d|0,e|0,52)|0;u()|0;switch(f&2047){case 0:{if(a!=0.0){a=+Eo(a*18446744073709551616.0,b);d=(c[b>>2]|0)+-64|0;}else d=0;c[b>>2]=d;break;}case 2047:break;default:{c[b>>2]=(f&2047)+-1022;c[h>>2]=d;c[h+4>>2]=e&-2146435073|1071644672;a=+g[h>>3];}}return +a;}function Fo(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;a:do if(!d)b=0;else {while(1){e=a[b>>0]|0;f=a[c>>0]|0;if(e<<24>>24!=f<<24>>24)break;d=d+-1|0;if(!d){b=0;break a;}else {b=b+1|0;c=c+1|0;}}b=(e&255)-(f&255)|0;}while(0);return b|0;}function Go(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=V;V=V+16|0;g=f;c[g>>2]=e;e=Ho(a,b,d,g)|0;V=f;return e|0;}function Ho(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;j=V;V=V+160|0;g=j+144|0;i=j;ur(i|0,3672,144)|0;if((d+-1|0)>>>0>2147483646){if(!d){b=g;d=1;h=4;}else {c[(ao()|0)>>2]=61;d=-1;}}else h=4;if((h|0)==4){h=-2-b|0;h=d>>>0>h>>>0?h:d;c[i+48>>2]=h;g=i+20|0;c[g>>2]=b;c[i+44>>2]=b;d=b+h|0;b=i+16|0;c[b>>2]=d;c[i+28>>2]=d;d=oo(i,e,f)|0;if(h){i=c[g>>2]|0;a[i+(((i|0)==(c[b>>2]|0))<<31>>31)>>0]=0;}}V=j;return d|0;}function Io(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=a+20|0;f=c[e>>2]|0;a=(c[a+16>>2]|0)-f|0;a=a>>>0>d>>>0?d:a;ur(f|0,b|0,a|0)|0;c[e>>2]=(c[e>>2]|0)+a;return d|0;}function Jo(a){a=a|0;var b=0,c=0;b=(fo(a)|0)+1|0;c=dr(b)|0;if(!c)a=0;else a=ur(c|0,a|0,b|0)|0;return a|0;}function Ko(b,e){b=b|0;e=e|0;var f=0,g=0;f=0;while(1){if((d[656+f>>0]|0)==(b|0)){g=4;break;}f=f+1|0;if((f|0)==87){b=87;g=5;break;}}if((g|0)==4)if(!f)f=752;else {b=f;g=5;}if((g|0)==5){f=752;do{do{g=f;f=f+1|0;}while((a[g>>0]|0)!=0);b=b+-1|0;}while((b|0)!=0);}return Lo(f,c[e+20>>2]|0)|0;}function Lo(a,b){a=a|0;b=b|0;return ko(a,b)|0;}function Mo(a){a=a|0;return Ko(a,c[(No()|0)+176>>2]|0)|0;}function No(){return co()|0;}function Oo(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;e=Mo(b)|0;b=fo(e)|0;if(b>>>0>=d>>>0){b=d+-1|0;if(!d)b=68;else {ur(c|0,e|0,b|0)|0;a[c+b>>0]=0;b=68;}}else {ur(c|0,e|0,b+1|0)|0;b=0;}return b|0;}function Po(){var a=0,b=0,d=0,e=0,f=0,g=0,h=0;e=V;V=V+48|0;g=e+32|0;b=e+24|0;h=e+16|0;f=e;e=e+36|0;a=Qo()|0;if(a|0?(d=c[a>>2]|0,d|0):0){a=d+48|0;if(!(Ro(a)|0)){c[b>>2]=20420;To(20370,b);}b=So(a)|0;if((b|0)==1126902529&(u()|0)==1129074247)a=c[d+44>>2]|0;else a=d+80|0;c[e>>2]=a;d=c[d>>2]|0;a=c[d+4>>2]|0;if(aa[c[(c[954]|0)+16>>2]&7](3816,d,e)|0){h=c[e>>2]|0;h=Z[c[(c[h>>2]|0)+8>>2]&15](h)|0;c[f>>2]=20420;c[f+4>>2]=a;c[f+8>>2]=h;To(20284,f);}else {c[h>>2]=20420;c[h+4>>2]=a;To(20329,h);}}To(20408,g);}function Qo(){return 21640;}function Ro(a){a=a|0;a=So(a)|0;return (a&-256|0)==1126902528&(u()|0)==1129074247|0;}function So(a){a=a|0;var b=0;b=a;a=c[b>>2]|0;t(c[b+4>>2]|0);return a|0;}function To(a,b){a=a|0;b=b|0;U();}function Uo(a){a=a|0;return;}function Vo(a){a=a|0;Uo(a);jp(a);return;}function Wo(a){a=a|0;return;}function Xo(a){a=a|0;return;}function Yo(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;l=V;V=V+64|0;j=l;if(!(ap(d,e,0)|0)){if((e|0)!=0?(k=ep(e,3840,3824,0)|0,(k|0)!=0):0){c[j>>2]=k;c[j+4>>2]=0;c[j+8>>2]=d;c[j+12>>2]=-1;d=j+16|0;e=j+24|0;g=j+48|0;h=d;i=h+36|0;do{c[h>>2]=0;h=h+4|0;}while((h|0)<(i|0));b[d+36>>1]=0;a[d+38>>0]=0;c[g>>2]=1;fa[c[(c[k>>2]|0)+28>>2]&7](k,j,c[f>>2]|0,1);if((c[e>>2]|0)==1){c[f>>2]=c[d>>2];d=1;}else d=0;}else d=0;}else d=1;V=l;return d|0;}function Zo(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if(ap(a,c[b+8>>2]|0,g)|0)dp(0,b,d,e,f);return;}function _o(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0;do if(!(ap(b,c[d+8>>2]|0,g)|0)){if(ap(b,c[d>>2]|0,g)|0){if((c[d+16>>2]|0)!=(e|0)?(h=d+20|0,(c[h>>2]|0)!=(e|0)):0){c[d+32>>2]=f;c[h>>2]=e;g=d+40|0;c[g>>2]=(c[g>>2]|0)+1;if((c[d+36>>2]|0)==1?(c[d+24>>2]|0)==2:0)a[d+54>>0]=1;c[d+44>>2]=4;break;}if((f|0)==1)c[d+32>>2]=1;}}else cp(0,d,e,f);while(0);return;}function $o(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if(ap(a,c[b+8>>2]|0,0)|0)bp(0,b,d,e);return;}function ap(a,b,d){a=a|0;b=b|0;d=d|0;if(d){if((a|0)==(b|0))a=1;else a=(eo(c[a+4>>2]|0,c[b+4>>2]|0)|0)==0;}else a=(c[a+4>>2]|0)==(c[b+4>>2]|0);return a|0;}function bp(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;b=d+16|0;g=c[b>>2]|0;do if(g){if((g|0)!=(e|0)){f=d+36|0;c[f>>2]=(c[f>>2]|0)+1;c[d+24>>2]=2;a[d+54>>0]=1;break;}b=d+24|0;if((c[b>>2]|0)==2)c[b>>2]=f;}else {c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;}while(0);return;}function cp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;if((c[b+4>>2]|0)==(d|0)?(f=b+28|0,(c[f>>2]|0)!=1):0)c[f>>2]=e;return;}function dp(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;a[d+53>>0]=1;do if((c[d+4>>2]|0)==(f|0)){a[d+52>>0]=1;b=d+16|0;f=c[b>>2]|0;if(!f){c[b>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((g|0)==1?(c[d+48>>2]|0)==1:0))break;a[d+54>>0]=1;break;}if((f|0)!=(e|0)){g=d+36|0;c[g>>2]=(c[g>>2]|0)+1;a[d+54>>0]=1;break;}f=d+24|0;b=c[f>>2]|0;if((b|0)==2){c[f>>2]=g;b=g;}if((b|0)==1?(c[d+48>>2]|0)==1:0)a[d+54>>0]=1;}while(0);return;}function ep(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;p=V;V=V+64|0;n=p;m=c[d>>2]|0;o=d+(c[m+-8>>2]|0)|0;m=c[m+-4>>2]|0;c[n>>2]=f;c[n+4>>2]=d;c[n+8>>2]=e;c[n+12>>2]=g;d=n+16|0;e=n+20|0;g=n+24|0;h=n+28|0;i=n+32|0;j=n+40|0;k=d;l=k+36|0;do{c[k>>2]=0;k=k+4|0;}while((k|0)<(l|0));b[d+36>>1]=0;a[d+38>>0]=0;a:do if(ap(m,f,0)|0){c[n+48>>2]=1;ha[c[(c[m>>2]|0)+20>>2]&3](m,n,o,o,1,0);d=(c[g>>2]|0)==1?o:0;}else {ga[c[(c[m>>2]|0)+24>>2]&3](m,n,o,1,0);switch(c[n+36>>2]|0){case 0:{d=(c[j>>2]|0)==1&(c[h>>2]|0)==1&(c[i>>2]|0)==1?c[e>>2]|0:0;break a;}case 1:break;default:{d=0;break a;}}if((c[g>>2]|0)!=1?!((c[j>>2]|0)==0&(c[h>>2]|0)==1&(c[i>>2]|0)==1):0){d=0;break;}d=c[d>>2]|0;}while(0);V=p;return d|0;}function fp(a){a=a|0;Uo(a);jp(a);return;}function gp(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if(ap(a,c[b+8>>2]|0,g)|0)dp(0,b,d,e,f);else {a=c[a+8>>2]|0;ha[c[(c[a>>2]|0)+20>>2]&3](a,b,d,e,f,g);}return;}function hp(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;a:do if(!(ap(b,c[d+8>>2]|0,g)|0)){if(!(ap(b,c[d>>2]|0,g)|0)){i=c[b+8>>2]|0;ga[c[(c[i>>2]|0)+24>>2]&3](i,d,e,f,g);break;}if((c[d+16>>2]|0)!=(e|0)?(i=d+20|0,(c[i>>2]|0)!=(e|0)):0){c[d+32>>2]=f;f=d+44|0;do if((c[f>>2]|0)!=4){h=d+52|0;a[h>>0]=0;j=d+53|0;a[j>>0]=0;b=c[b+8>>2]|0;ha[c[(c[b>>2]|0)+20>>2]&3](b,d,e,e,1,g);if(a[j>>0]|0){j=(a[h>>0]|0)==0;c[f>>2]=3;if(j)break;else break a;}else {c[f>>2]=4;break;}}while(0);c[i>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1;if((c[d+36>>2]|0)!=1)break;if((c[d+24>>2]|0)!=2)break;a[d+54>>0]=1;break;}if((f|0)==1)c[d+32>>2]=1;}else cp(0,d,e,f);while(0);return;}function ip(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;if(ap(a,c[b+8>>2]|0,0)|0)bp(0,b,d,e);else {a=c[a+8>>2]|0;fa[c[(c[a>>2]|0)+28>>2]&7](a,b,d,e);}return;}function jp(a){a=a|0;er(a);return;}function kp(a){a=a|0;return;}function lp(){var a=0,b=0;a=Qo()|0;if((a|0?(b=c[a>>2]|0,b|0):0)?Ro(b+48|0)|0:0)mp(c[b+12>>2]|0);mp(np()|0);}function mp(a){a=a|0;var b=0;b=V;V=V+16|0;ba[a&3]();To(20559,b);}function np(){return 2;}function op(a){a=a|0;return;}function pp(a){a=a|0;jp(a);return;}function qp(a){a=a|0;return 20599;}function rp(a){a=a|0;c[a>>2]=5916;vp(a+4|0);return;}function sp(a){a=a|0;rp(a);jp(a);return;}function tp(a){a=a|0;return up(a+4|0)|0;}function up(a){a=a|0;return c[a>>2]|0;}function vp(a){a=a|0;var b=0,d=0;if(wp(a)|0?(b=xp(c[a>>2]|0)|0,d=b+8|0,a=c[d>>2]|0,c[d>>2]=a+-1,(a|0)<1):0)jp(b);return;}function wp(a){a=a|0;return 1;}function xp(a){a=a|0;return a+-12|0;}function yp(a){a=a|0;c[a>>2]=5936;vp(a+4|0);return;}function zp(a){a=a|0;yp(a);jp(a);return;}function Ap(a){a=a|0;return up(a+4|0)|0;}function Bp(a){a=a|0;rp(a);jp(a);return;}function Cp(a){a=a|0;rp(a);jp(a);return;}function Dp(){var a=0;a=V;V=V+16|0;To(20848,a);}function Ep(a){a=a|0;Uo(a);jp(a);return;}function Fp(a,b,c){a=a|0;b=b|0;c=c|0;return ap(a,b,0)|0;}function Gp(a){a=a|0;Uo(a);jp(a);return;}function Hp(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;n=V;V=V+64|0;l=n;do if(!(ap(e,4048,0)|0)){if(Ip(d,e,0)|0){e=c[f>>2]|0;if(!e){e=1;break;}c[f>>2]=c[e>>2];e=1;break;}if((e|0)!=0?(g=ep(e,3840,3976,0)|0,(g|0)!=0):0){e=c[f>>2]|0;if(e|0)c[f>>2]=c[e>>2];e=c[g+8>>2]|0;i=d+8|0;h=c[i>>2]|0;if((e&7&(h^7)|0)==0?((e&96^96)&h|0)==0:0){h=d+12|0;d=c[h>>2]|0;g=g+12|0;e=c[g>>2]|0;if(!(ap(d,e,0)|0)){if(ap(d,4040,0)|0){if(!e){e=1;break;}e=(ep(e,3840,3992,0)|0)==0;break;}if(d){e=ep(d,3840,3976,0)|0;if(e|0){if(!(c[i>>2]&1)){e=0;break;}e=Jp(e,c[g>>2]|0)|0;break;}e=c[h>>2]|0;if(e){e=ep(e,3840,4008,0)|0;if(e|0){if(!(c[i>>2]&1)){e=0;break;}e=Kp(e,c[g>>2]|0)|0;break;}e=c[h>>2]|0;if((((e|0)!=0?(j=ep(e,3840,3824,0)|0,(j|0)!=0):0)?(k=c[g>>2]|0,(k|0)!=0):0)?(m=ep(k,3840,3824,0)|0,(m|0)!=0):0){c[l>>2]=m;c[l+4>>2]=0;c[l+8>>2]=j;c[l+12>>2]=-1;e=l+16|0;d=l+24|0;g=l+48|0;h=e;i=h+36|0;do{c[h>>2]=0;h=h+4|0;}while((h|0)<(i|0));b[e+36>>1]=0;a[e+38>>0]=0;c[g>>2]=1;fa[c[(c[m>>2]|0)+28>>2]&7](m,l,c[f>>2]|0,1);do if((c[d>>2]|0)==1){if(!(c[f>>2]|0)){e=1;break;}c[f>>2]=c[e>>2];e=1;}else e=0;while(0);}else e=0;}else e=0;}else e=0;}else e=1;}else e=0;}else e=0;}else {c[f>>2]=0;e=1;}while(0);V=n;return e|0;}function Ip(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;if(!(c[a+8>>2]&24)){if((b|0)!=0?(e=ep(b,3840,3960,0)|0,(e|0)!=0):0){d=(c[e+8>>2]&24|0)!=0;f=5;}else d=0;}else {d=1;f=5;}if((f|0)==5)d=ap(a,b,d)|0;return d|0;}function Jp(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;while(1){if(!b){b=0;break;}d=ep(b,3840,3976,0)|0;if(!d){b=0;break;}f=c[a+8>>2]|0;if(c[d+8>>2]&~f|0){b=0;break;}e=a+12|0;b=c[e>>2]|0;d=d+12|0;if(ap(b,c[d>>2]|0,0)|0){b=1;break;}if((f&1|0)==0|(b|0)==0){b=0;break;}a=ep(b,3840,3976,0)|0;if(!a){h=9;break;}b=c[d>>2]|0;}if((h|0)==9){b=c[e>>2]|0;if((b|0)!=0?(g=ep(b,3840,4008,0)|0,(g|0)!=0):0)b=Kp(g,c[d>>2]|0)|0;else b=0;}return b|0;}function Kp(a,b){a=a|0;b=b|0;var d=0;if((((b|0)!=0?(d=ep(b,3840,4008,0)|0,(d|0)!=0):0)?(c[d+8>>2]&~c[a+8>>2]|0)==0:0)?ap(c[a+12>>2]|0,c[d+12>>2]|0,0)|0:0)a=ap(c[a+16>>2]|0,c[d+16>>2]|0,0)|0;else a=0;return a|0;}function Lp(a){a=a|0;Uo(a);jp(a);return;}function Mp(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(ap(b,c[d+8>>2]|0,h)|0)dp(0,d,e,f,g);else {r=d+52|0;j=a[r>>0]|0;q=d+53|0;i=a[q>>0]|0;p=c[b+12>>2]|0;m=b+16+(p<<3)|0;a[r>>0]=0;a[q>>0]=0;Qp(b+16|0,d,e,f,g,h);k=a[r>>0]|0;j=k|j;l=a[q>>0]|0;i=l|i;a:do if((p|0)>1){n=d+24|0;o=b+8|0;p=d+54|0;b=b+24|0;do{i=i&1;j=j&1;if(a[p>>0]|0)break a;if(!(k<<24>>24)){if(l<<24>>24?(c[o>>2]&1|0)==0:0)break a;}else {if((c[n>>2]|0)==1)break a;if(!(c[o>>2]&2))break a;}a[r>>0]=0;a[q>>0]=0;Qp(b,d,e,f,g,h);k=a[r>>0]|0;j=k|j;l=a[q>>0]|0;i=l|i;b=b+8|0;}while(b>>>0<m>>>0);}while(0);a[r>>0]=j<<24>>24!=0&1;a[q>>0]=i<<24>>24!=0&1;}return;}function Np(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;a:do if(!(ap(b,c[d+8>>2]|0,g)|0)){if(!(ap(b,c[d>>2]|0,g)|0)){p=c[b+12>>2]|0;k=b+16+(p<<3)|0;Rp(b+16|0,d,e,f,g);h=b+24|0;if((p|0)<=1)break;b=c[b+8>>2]|0;if((b&2|0)==0?(j=d+36|0,(c[j>>2]|0)!=1):0){if(!(b&1)){b=d+54|0;while(1){if(a[b>>0]|0)break a;if((c[j>>2]|0)==1)break a;Rp(h,d,e,f,g);h=h+8|0;if(h>>>0>=k>>>0)break a;}}b=d+24|0;i=d+54|0;while(1){if(a[i>>0]|0)break a;if((c[j>>2]|0)==1?(c[b>>2]|0)==1:0)break a;Rp(h,d,e,f,g);h=h+8|0;if(h>>>0>=k>>>0)break a;}}b=d+54|0;while(1){if(a[b>>0]|0)break a;Rp(h,d,e,f,g);h=h+8|0;if(h>>>0>=k>>>0)break a;}}if((c[d+16>>2]|0)!=(e|0)?(p=d+20|0,(c[p>>2]|0)!=(e|0)):0){c[d+32>>2]=f;o=d+44|0;if((c[o>>2]|0)!=4){j=b+16+(c[b+12>>2]<<3)|0;k=d+52|0;f=d+53|0;l=d+54|0;m=b+8|0;n=d+24|0;h=0;i=b+16|0;b=0;b:while(1){if(i>>>0>=j>>>0){i=18;break;}a[k>>0]=0;a[f>>0]=0;Qp(i,d,e,e,1,g);if(a[l>>0]|0){i=18;break;}do if(a[f>>0]|0){if(!(a[k>>0]|0))if(!(c[m>>2]&1)){i=19;break b;}else {b=1;break;}if((c[n>>2]|0)==1){h=1;i=19;break b;}if(!(c[m>>2]&2)){h=1;i=19;break b;}else {h=1;b=1;}}while(0);i=i+8|0;}if((i|0)==18)if(b)i=19;else b=4;if((i|0)==19)b=3;c[o>>2]=b;if(h&1)break;}c[p>>2]=e;e=d+40|0;c[e>>2]=(c[e>>2]|0)+1;if((c[d+36>>2]|0)!=1)break;if((c[d+24>>2]|0)!=2)break;a[d+54>>0]=1;break;}if((f|0)==1)c[d+32>>2]=1;}else cp(0,d,e,f);while(0);return;}function Op(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;a:do if(!(ap(b,c[d+8>>2]|0,0)|0)){h=c[b+12>>2]|0;g=b+16+(h<<3)|0;Pp(b+16|0,d,e,f);if((h|0)>1){h=d+54|0;b=b+24|0;do{Pp(b,d,e,f);if(a[h>>0]|0)break a;b=b+8|0;}while(b>>>0<g>>>0);}}else bp(0,d,e,f);while(0);return;}function Pp(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;g=c[a+4>>2]|0;if(d){f=g>>8;if(g&1)f=c[(c[d>>2]|0)+f>>2]|0;}else f=0;a=c[a>>2]|0;fa[c[(c[a>>2]|0)+28>>2]&7](a,b,d+f|0,(g&2|0)==0?2:e);return;}function Qp(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;i=c[a+4>>2]|0;h=i>>8;if(i&1)h=c[(c[e>>2]|0)+h>>2]|0;a=c[a>>2]|0;ha[c[(c[a>>2]|0)+20>>2]&3](a,b,d,e+h|0,(i&2|0)==0?2:f,g);return;}function Rp(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;h=c[a+4>>2]|0;g=h>>8;if(h&1)g=c[(c[d>>2]|0)+g>>2]|0;a=c[a>>2]|0;ga[c[(c[a>>2]|0)+24>>2]&3](a,b,d+g|0,(h&2|0)==0?2:e,f);return;}function Sp(a){a=a|0;c[a>>2]=5896;return;}function Tp(a){a=a|0;var b=0,c=0;b=V;V=V+16|0;c=b;Up(c,a);a=Vp(c)|0;V=b;return a|0;}function Up(a,b){a=a|0;b=b|0;_p(a,b);return;}function Vp(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;Wp(d,c[a+4>>2]|0);if(!((Xp(d)|0)<<24>>24))a=Zp(Yp(a)|0)|0;else a=0;V=b;return a|0;}function Wp(a,b){a=a|0;b=b|0;c[a>>2]=b;return;}function Xp(b){b=b|0;return a[c[b>>2]>>0]|0;}function Yp(a){a=a|0;return a|0;}function Zp(b){b=b|0;var d=0,e=0,f=0,g=0;g=V;V=V+16|0;f=g;b=c[b+8>>2]|0;d=a[b>>0]|0;do if(d<<24>>24!=1){if(!(d&2)){a[b>>0]=2;e=1;break;}else To(20985,f);}else e=0;while(0);V=g;return e|0;}function _p(a,b){a=a|0;b=b|0;c[a>>2]=b;c[a+4>>2]=b;c[a+8>>2]=b+1;c[a+12>>2]=0;return;}function $p(a){a=a|0;var b=0,c=0;b=V;V=V+16|0;c=b;Up(c,a);aq(c);V=b;return;}function aq(a){a=a|0;var b=0,d=0;b=V;V=V+16|0;d=b;Wp(d,c[a+4>>2]|0);bq(d);cq(Yp(a)|0);V=b;return;}function bq(b){b=b|0;a[c[b>>2]>>0]=1;return;}function cq(b){b=b|0;a[c[b+8>>2]>>0]=1;return;}function dq(){return 0;}function eq(a){a=a|0;var b=0,c=0;c=(a|0)==0?1:a;while(1){b=dr(c)|0;if(b|0){a=6;break;}a=dq()|0;if(!a){a=5;break;}ba[a&3]();}if((a|0)==5){c=v(4)|0;Sp(c);x(c|0,3880,121);}else if((a|0)==6)return b|0;return 0;}function fq(a){a=a|0;return eq(a)|0;}function gq(a){a=a|0;jp(a);return;}function hq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=V;V=V+16|0;e=f;c[e>>2]=c[d>>2];a=aa[c[(c[a>>2]|0)+16>>2]&7](a,b,e)|0;if(a)c[d>>2]=c[e>>2];V=f;return a&1|0;}function iq(a){a=a|0;if(!a)a=0;else a=(ep(a,3840,3976,0)|0)!=0&1;return a|0;}function jq(a){a=a|0;return 0;}function kq(){return (lq()|0)>0|0;}function lq(){return y()|0;}function mq(a){a=a|0;return;}function nq(a){a=a|0;mq(a);jp(a);return;}function oq(a){a=a|0;return 21039;}function pq(a){a=a|0;return;}function qq(a){a=a|0;var b=0,d=0;b=a+8|0;if(!((c[b>>2]|0)!=0?(d=c[b>>2]|0,c[b>>2]=d+-1,(d|0)!=0):0))ca[c[(c[a>>2]|0)+16>>2]&255](a);return;}function rq(a){a=a|0;a=jq(a)|0;if(!a)return;else br(a,21145);}function sq(a){a=a|0;return;}function tq(a,b){a=a|0;b=b|0;var d=0,e=0;e=fo(b)|0;d=eq(e+13|0)|0;c[d>>2]=e;c[d+4>>2]=e;c[d+8>>2]=0;d=uq(d)|0;ur(d|0,b|0,e+1|0)|0;c[a>>2]=d;return;}function uq(a){a=a|0;return a+12|0;}function vq(a,b){a=a|0;b=b|0;c[a>>2]=5916;tq(a+4|0,b);return;}function wq(b,d){b=b|0;d=d|0;c[b>>2]=5936;tq(b+4|0,(a[d+11>>0]|0)<0?c[d>>2]|0:d);return;}function xq(a,b){a=a|0;b=b|0;c[a>>2]=5936;tq(a+4|0,b);return;}function yq(a){a=a|0;a=v(8)|0;vq(a,21163);c[a>>2]=5956;x(a|0,3928,123);}function zq(a){a=a|0;a=v(8)|0;vq(a,21163);c[a>>2]=5976;x(a|0,3944,123);}function Aq(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;g=V;V=V+16|0;f=g;if(e>>>0>4294967279)yq(b);if(e>>>0<11)a[b+11>>0]=e;else {i=e+16&-16;h=eq(i)|0;c[b>>2]=h;c[b+8>>2]=i|-2147483648;c[b+4>>2]=e;b=h;}Bq(b,d,e)|0;a[f>>0]=0;nb(b+e|0,f);V=g;return;}function Bq(a,b,c){a=a|0;b=b|0;c=c|0;if(c|0)ur(a|0,b|0,c|0)|0;return a|0;}function Cq(b){b=b|0;if((a[b+11>>0]|0)<0)Da(c[b>>2]|0,c[b+8>>2]&2147483647);return;}function Dq(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0;o=V;V=V+16|0;n=o;if((-18-d|0)>>>0<e>>>0)yq(b);if((a[b+11>>0]|0)<0)m=c[b>>2]|0;else m=b;if(d>>>0<2147483623){k=e+d|0;l=d<<1;k=k>>>0<l>>>0?l:k;k=k>>>0<11?11:k+16&-16;}else k=-17;l=eq(k)|0;if(g|0)Bq(l,m,g)|0;if(i|0)Bq(l+g|0,j,i)|0;f=f-h|0;e=f-g|0;if(e|0)Bq(l+g+i|0,m+g+h|0,e)|0;e=d+1|0;if((e|0)!=11)Da(m,e);c[b>>2]=l;c[b+8>>2]=k|-2147483648;i=f+i|0;c[b+4>>2]=i;a[n>>0]=0;nb(l+i|0,n);V=o;return;}function Eq(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;k=V;V=V+16|0;i=k;j=b+11|0;f=a[j>>0]|0;h=f<<24>>24<0;if(h){g=(c[b+8>>2]&2147483647)+-1|0;f=c[b+4>>2]|0;}else {g=10;f=f&255;}if((g-f|0)>>>0>=e>>>0){if(e|0){if(h)g=c[b>>2]|0;else g=b;Bq(g+f|0,d,e)|0;f=f+e|0;if((a[j>>0]|0)<0)c[b+4>>2]=f;else a[j>>0]=f;a[i>>0]=0;nb(g+f|0,i);}}else Dq(b,g,f+e-g|0,f,f,0,e,d);V=k;return b|0;}function Fq(a,b){a=a|0;b=b|0;return Eq(a,b,lb(b)|0)|0;}function Gq(a,b,c){a=a|0;b=b|0;c=c|0;if(!c)a=0;else a=Fo(a,b,c)|0;return a|0;}function Hq(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0;h=a[b+11>>0]|0;i=h<<24>>24<0;if(i)h=c[b+4>>2]|0;else h=h&255;if((g|0)==-1|h>>>0<d>>>0)zq(b);h=h-d|0;e=h>>>0<e>>>0?h:e;if(i)b=c[b>>2]|0;h=e>>>0>g>>>0;b=Gq(b+d|0,f,h?g:e)|0;if(!b)return (e>>>0<g>>>0?-1:h&1)|0;else return b|0;return 0;}function Iq(a){a=a|0;return;}function Jq(a){a=a|0;jp(a);return;}function Kq(a){a=a|0;return 21228;}function Lq(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;return;}function Mq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;f=V;V=V+16|0;e=f;ea[c[(c[a>>2]|0)+12>>2]&15](e,a,b);if((c[e+4>>2]|0)==(c[d+4>>2]|0))a=(c[e>>2]|0)==(c[d>>2]|0);else a=0;V=f;return a|0;}function Nq(a,b,d){a=a|0;b=b|0;d=d|0;return ((c[b>>2]|0)==(d|0)?(c[b+4>>2]|0)==(a|0):0)|0;}function Oq(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)>256)Aq(a,21176,lb(21176)|0);else Pq(a,0,c);return;}function Pq(a,b,c){a=a|0;b=b|0;c=c|0;Qq(a,c);return;}function Qq(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;i=V;V=V+1040|0;g=i+1024|0;e=i;h=c[(ao()|0)>>2]|0;f=Rq(Oo(d,e,1024)|0,e)|0;if(!(a[f>>0]|0)){c[g>>2]=d;Go(e,1024,21211,g)|0;}else e=f;c[(ao()|0)>>2]=h;Aq(b,e,lb(e)|0);V=i;return;}function Rq(a,b){a=a|0;b=b|0;var d=0,e=0;switch(a|0){case 0:{d=b;break;}case-1:{a=c[(ao()|0)>>2]|0;e=3;break;}default:e=3;}if((e|0)==3)if((a|0)==28)d=22145;else P();return d|0;}function Sq(a){a=a|0;jp(a);return;}function Tq(a){a=a|0;return 21353;}function Uq(a,b,d){a=a|0;b=b|0;d=d|0;if((d|0)>256){Wq()|0;b=6180;}else {Xq()|0;b=6176;}c[a>>2]=d;c[a+4>>2]=b;return;}function Vq(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)>256)Aq(a,21319,lb(21319)|0);else Pq(a,0,c);return;}function Wq(){if((a[21488]|0)==0?Tp(21488)|0:0)$p(21488);return 6180;}function Xq(){if((a[21480]|0)==0?Tp(21480)|0:0)$p(21480);return 6176;}function Yq(a){a=a|0;yp(a);return;}function Zq(a){a=a|0;Yq(a);jp(a);return;}function _q(a,b){a=a|0;b=b|0;var d=0;d=c[b+4>>2]|0;ea[c[(c[d>>2]|0)+24>>2]&15](a,d,c[b>>2]|0);return;}function $q(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;h=V;V=V+16|0;g=h;if(c[d>>2]|0){f=a[e+11>>0]|0;if(f<<24>>24<0)f=c[e+4>>2]|0;else f=f&255;if(f|0)Fq(e,21417)|0;_q(g,d);d=a[g+11>>0]|0;f=d<<24>>24<0;Eq(e,f?c[g>>2]|0:g,f?c[g+4>>2]|0:d&255)|0;Cq(g);}c[b>>2]=c[e>>2];c[b+4>>2]=c[e+4>>2];c[b+8>>2]=c[e+8>>2];f=0;while(1){if((f|0)==3)break;c[e+(f<<2)>>2]=0;f=f+1|0;}V=h;return;}function ar(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=V;V=V+32|0;g=e+12|0;f=e;Aq(f,d,lb(d)|0);$q(g,b,f);wq(a,g);Cq(g);Cq(f);c[a>>2]=6192;f=b;b=c[f+4>>2]|0;d=a+8|0;c[d>>2]=c[f>>2];c[d+4>>2]=b;V=e;return;}function br(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;f=V;V=V+16|0;e=f+8|0;d=v(16)|0;Wq()|0;c[f>>2]=a;c[f+4>>2]=6180;c[e>>2]=c[f>>2];c[e+4>>2]=c[f+4>>2];ar(d,e,b);x(d|0,4272,136);}function cr(a){a=a|0;a=v(8)|0;vq(a,21420);c[a>>2]=5956;x(a|0,3928,123);}function dr(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;w=V;V=V+16|0;n=w;do if(a>>>0<245){k=a>>>0<11?16:a+11&-8;a=k>>>3;m=c[5412]|0;d=m>>>a;if(d&3|0){b=(d&1^1)+a|0;a=21688+(b<<1<<2)|0;d=a+8|0;e=c[d>>2]|0;f=e+8|0;g=c[f>>2]|0;if((g|0)==(a|0))c[5412]=m&~(1<<b);else {c[g+12>>2]=a;c[d>>2]=g;}v=b<<3;c[e+4>>2]=v|3;v=e+v+4|0;c[v>>2]=c[v>>2]|1;v=f;V=w;return v|0;}l=c[5414]|0;if(k>>>0>l>>>0){if(d|0){b=2<<a;b=d<<a&(b|0-b);b=(b&0-b)+-1|0;i=b>>>12&16;b=b>>>i;d=b>>>5&8;b=b>>>d;g=b>>>2&4;b=b>>>g;a=b>>>1&2;b=b>>>a;e=b>>>1&1;e=(d|i|g|a|e)+(b>>>e)|0;b=21688+(e<<1<<2)|0;a=b+8|0;g=c[a>>2]|0;i=g+8|0;d=c[i>>2]|0;if((d|0)==(b|0)){a=m&~(1<<e);c[5412]=a;}else {c[d+12>>2]=b;c[a>>2]=d;a=m;}v=e<<3;h=v-k|0;c[g+4>>2]=k|3;f=g+k|0;c[f+4>>2]=h|1;c[g+v>>2]=h;if(l|0){e=c[5417]|0;b=l>>>3;d=21688+(b<<1<<2)|0;b=1<<b;if(!(a&b)){c[5412]=a|b;b=d;a=d+8|0;}else {a=d+8|0;b=c[a>>2]|0;}c[a>>2]=e;c[b+12>>2]=e;c[e+8>>2]=b;c[e+12>>2]=d;}c[5414]=h;c[5417]=f;v=i;V=w;return v|0;}g=c[5413]|0;if(g){d=(g&0-g)+-1|0;f=d>>>12&16;d=d>>>f;e=d>>>5&8;d=d>>>e;h=d>>>2&4;d=d>>>h;i=d>>>1&2;d=d>>>i;j=d>>>1&1;j=c[21952+((e|f|h|i|j)+(d>>>j)<<2)>>2]|0;d=j;i=j;j=(c[j+4>>2]&-8)-k|0;while(1){a=c[d+16>>2]|0;if(!a){a=c[d+20>>2]|0;if(!a)break;}h=(c[a+4>>2]&-8)-k|0;f=h>>>0<j>>>0;d=a;i=f?a:i;j=f?h:j;}h=i+k|0;if(h>>>0>i>>>0){f=c[i+24>>2]|0;b=c[i+12>>2]|0;do if((b|0)==(i|0)){a=i+20|0;b=c[a>>2]|0;if(!b){a=i+16|0;b=c[a>>2]|0;if(!b){d=0;break;}}while(1){e=b+20|0;d=c[e>>2]|0;if(!d){e=b+16|0;d=c[e>>2]|0;if(!d)break;else {b=d;a=e;}}else {b=d;a=e;}}c[a>>2]=0;d=b;}else {d=c[i+8>>2]|0;c[d+12>>2]=b;c[b+8>>2]=d;d=b;}while(0);do if(f|0){b=c[i+28>>2]|0;a=21952+(b<<2)|0;if((i|0)==(c[a>>2]|0)){c[a>>2]=d;if(!d){c[5413]=g&~(1<<b);break;}}else {v=f+16|0;c[((c[v>>2]|0)==(i|0)?v:f+20|0)>>2]=d;if(!d)break;}c[d+24>>2]=f;b=c[i+16>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d;}b=c[i+20>>2]|0;if(b|0){c[d+20>>2]=b;c[b+24>>2]=d;}}while(0);if(j>>>0<16){v=j+k|0;c[i+4>>2]=v|3;v=i+v+4|0;c[v>>2]=c[v>>2]|1;}else {c[i+4>>2]=k|3;c[h+4>>2]=j|1;c[h+j>>2]=j;if(l|0){e=c[5417]|0;b=l>>>3;d=21688+(b<<1<<2)|0;b=1<<b;if(!(b&m)){c[5412]=b|m;b=d;a=d+8|0;}else {a=d+8|0;b=c[a>>2]|0;}c[a>>2]=e;c[b+12>>2]=e;c[e+8>>2]=b;c[e+12>>2]=d;}c[5414]=j;c[5417]=h;}v=i+8|0;V=w;return v|0;}else m=k;}else m=k;}else m=k;}else if(a>>>0<=4294967231){a=a+11|0;k=a&-8;e=c[5413]|0;if(e){f=0-k|0;a=a>>>8;if(a){if(k>>>0>16777215)j=31;else {m=(a+1048320|0)>>>16&8;q=a<<m;i=(q+520192|0)>>>16&4;q=q<<i;j=(q+245760|0)>>>16&2;j=14-(i|m|j)+(q<<j>>>15)|0;j=k>>>(j+7|0)&1|j<<1;}}else j=0;d=c[21952+(j<<2)>>2]|0;a:do if(!d){d=0;a=0;q=61;}else {a=0;i=k<<((j|0)==31?0:25-(j>>>1)|0);g=0;while(1){h=(c[d+4>>2]&-8)-k|0;if(h>>>0<f>>>0)if(!h){a=d;f=0;q=65;break a;}else {a=d;f=h;}q=c[d+20>>2]|0;d=c[d+16+(i>>>31<<2)>>2]|0;g=(q|0)==0|(q|0)==(d|0)?g:q;if(!d){d=g;q=61;break;}else i=i<<1;}}while(0);if((q|0)==61){if((d|0)==0&(a|0)==0){a=2<<j;a=(a|0-a)&e;if(!a){m=k;break;}m=(a&0-a)+-1|0;h=m>>>12&16;m=m>>>h;g=m>>>5&8;m=m>>>g;i=m>>>2&4;m=m>>>i;j=m>>>1&2;m=m>>>j;d=m>>>1&1;a=0;d=c[21952+((g|h|i|j|d)+(m>>>d)<<2)>>2]|0;}if(!d){i=a;h=f;}else q=65;}if((q|0)==65){g=d;while(1){m=(c[g+4>>2]&-8)-k|0;d=m>>>0<f>>>0;f=d?m:f;a=d?g:a;d=c[g+16>>2]|0;if(!d)d=c[g+20>>2]|0;if(!d){i=a;h=f;break;}else g=d;}}if(((i|0)!=0?h>>>0<((c[5414]|0)-k|0)>>>0:0)?(l=i+k|0,l>>>0>i>>>0):0){g=c[i+24>>2]|0;b=c[i+12>>2]|0;do if((b|0)==(i|0)){a=i+20|0;b=c[a>>2]|0;if(!b){a=i+16|0;b=c[a>>2]|0;if(!b){b=0;break;}}while(1){f=b+20|0;d=c[f>>2]|0;if(!d){f=b+16|0;d=c[f>>2]|0;if(!d)break;else {b=d;a=f;}}else {b=d;a=f;}}c[a>>2]=0;}else {v=c[i+8>>2]|0;c[v+12>>2]=b;c[b+8>>2]=v;}while(0);do if(g){a=c[i+28>>2]|0;d=21952+(a<<2)|0;if((i|0)==(c[d>>2]|0)){c[d>>2]=b;if(!b){e=e&~(1<<a);c[5413]=e;break;}}else {v=g+16|0;c[((c[v>>2]|0)==(i|0)?v:g+20|0)>>2]=b;if(!b)break;}c[b+24>>2]=g;a=c[i+16>>2]|0;if(a|0){c[b+16>>2]=a;c[a+24>>2]=b;}a=c[i+20>>2]|0;if(a){c[b+20>>2]=a;c[a+24>>2]=b;}}while(0);b:do if(h>>>0<16){v=h+k|0;c[i+4>>2]=v|3;v=i+v+4|0;c[v>>2]=c[v>>2]|1;}else {c[i+4>>2]=k|3;c[l+4>>2]=h|1;c[l+h>>2]=h;b=h>>>3;if(h>>>0<256){d=21688+(b<<1<<2)|0;a=c[5412]|0;b=1<<b;if(!(a&b)){c[5412]=a|b;b=d;a=d+8|0;}else {a=d+8|0;b=c[a>>2]|0;}c[a>>2]=l;c[b+12>>2]=l;c[l+8>>2]=b;c[l+12>>2]=d;break;}b=h>>>8;if(b){if(h>>>0>16777215)d=31;else {u=(b+1048320|0)>>>16&8;v=b<<u;t=(v+520192|0)>>>16&4;v=v<<t;d=(v+245760|0)>>>16&2;d=14-(t|u|d)+(v<<d>>>15)|0;d=h>>>(d+7|0)&1|d<<1;}}else d=0;b=21952+(d<<2)|0;c[l+28>>2]=d;a=l+16|0;c[a+4>>2]=0;c[a>>2]=0;a=1<<d;if(!(e&a)){c[5413]=e|a;c[b>>2]=l;c[l+24>>2]=b;c[l+12>>2]=l;c[l+8>>2]=l;break;}b=c[b>>2]|0;c:do if((c[b+4>>2]&-8|0)!=(h|0)){e=h<<((d|0)==31?0:25-(d>>>1)|0);while(1){d=b+16+(e>>>31<<2)|0;a=c[d>>2]|0;if(!a)break;if((c[a+4>>2]&-8|0)==(h|0)){b=a;break c;}else {e=e<<1;b=a;}}c[d>>2]=l;c[l+24>>2]=b;c[l+12>>2]=l;c[l+8>>2]=l;break b;}while(0);u=b+8|0;v=c[u>>2]|0;c[v+12>>2]=l;c[u>>2]=l;c[l+8>>2]=v;c[l+12>>2]=b;c[l+24>>2]=0;}while(0);v=i+8|0;V=w;return v|0;}else m=k;}else m=k;}else m=-1;while(0);d=c[5414]|0;if(d>>>0>=m>>>0){b=d-m|0;a=c[5417]|0;if(b>>>0>15){v=a+m|0;c[5417]=v;c[5414]=b;c[v+4>>2]=b|1;c[a+d>>2]=b;c[a+4>>2]=m|3;}else {c[5414]=0;c[5417]=0;c[a+4>>2]=d|3;v=a+d+4|0;c[v>>2]=c[v>>2]|1;}v=a+8|0;V=w;return v|0;}h=c[5415]|0;if(h>>>0>m>>>0){t=h-m|0;c[5415]=t;v=c[5418]|0;u=v+m|0;c[5418]=u;c[u+4>>2]=t|1;c[v+4>>2]=m|3;v=v+8|0;V=w;return v|0;}if(!(c[5530]|0)){c[5532]=4096;c[5531]=4096;c[5533]=-1;c[5534]=-1;c[5535]=0;c[5523]=0;c[5530]=n&-16^1431655768;a=4096;}else a=c[5532]|0;i=m+48|0;j=m+47|0;g=a+j|0;f=0-a|0;k=g&f;if(k>>>0<=m>>>0){v=0;V=w;return v|0;}a=c[5522]|0;if(a|0?(l=c[5520]|0,n=l+k|0,n>>>0<=l>>>0|n>>>0>a>>>0):0){v=0;V=w;return v|0;}d:do if(!(c[5523]&4)){d=c[5418]|0;e:do if(d){e=22096;while(1){n=c[e>>2]|0;if(n>>>0<=d>>>0?(n+(c[e+4>>2]|0)|0)>>>0>d>>>0:0)break;a=c[e+8>>2]|0;if(!a){q=128;break e;}else e=a;}b=g-h&f;if(b>>>0<2147483647){a=fr(b)|0;if((a|0)==((c[e>>2]|0)+(c[e+4>>2]|0)|0)){if((a|0)!=(-1|0)){h=b;g=a;q=145;break d;}}else {e=a;q=136;}}else b=0;}else q=128;while(0);do if((q|0)==128){d=fr(0)|0;if((d|0)!=(-1|0)?(b=d,o=c[5531]|0,p=o+-1|0,b=((p&b|0)==0?0:(p+b&0-o)-b|0)+k|0,o=c[5520]|0,p=b+o|0,b>>>0>m>>>0&b>>>0<2147483647):0){n=c[5522]|0;if(n|0?p>>>0<=o>>>0|p>>>0>n>>>0:0){b=0;break;}a=fr(b)|0;if((a|0)==(d|0)){h=b;g=d;q=145;break d;}else {e=a;q=136;}}else b=0;}while(0);do if((q|0)==136){d=0-b|0;if(!(i>>>0>b>>>0&(b>>>0<2147483647&(e|0)!=(-1|0))))if((e|0)==(-1|0)){b=0;break;}else {h=b;g=e;q=145;break d;}a=c[5532]|0;a=j-b+a&0-a;if(a>>>0>=2147483647){h=b;g=e;q=145;break d;}if((fr(a)|0)==(-1|0)){fr(d)|0;b=0;break;}else {h=a+b|0;g=e;q=145;break d;}}while(0);c[5523]=c[5523]|4;q=143;}else {b=0;q=143;}while(0);if(((q|0)==143?k>>>0<2147483647:0)?(t=fr(k)|0,p=fr(0)|0,r=p-t|0,s=r>>>0>(m+40|0)>>>0,!((t|0)==(-1|0)|s^1|t>>>0<p>>>0&((t|0)!=(-1|0)&(p|0)!=(-1|0))^1)):0){h=s?r:b;g=t;q=145;}if((q|0)==145){b=(c[5520]|0)+h|0;c[5520]=b;if(b>>>0>(c[5521]|0)>>>0)c[5521]=b;j=c[5418]|0;f:do if(j){b=22096;while(1){a=c[b>>2]|0;d=c[b+4>>2]|0;if((g|0)==(a+d|0)){q=154;break;}e=c[b+8>>2]|0;if(!e)break;else b=e;}if(((q|0)==154?(u=b+4|0,(c[b+12>>2]&8|0)==0):0)?g>>>0>j>>>0&a>>>0<=j>>>0:0){c[u>>2]=d+h;v=(c[5415]|0)+h|0;t=j+8|0;t=(t&7|0)==0?0:0-t&7;u=j+t|0;t=v-t|0;c[5418]=u;c[5415]=t;c[u+4>>2]=t|1;c[j+v+4>>2]=40;c[5419]=c[5534];break;}if(g>>>0<(c[5416]|0)>>>0)c[5416]=g;d=g+h|0;b=22096;while(1){if((c[b>>2]|0)==(d|0)){q=162;break;}a=c[b+8>>2]|0;if(!a)break;else b=a;}if((q|0)==162?(c[b+12>>2]&8|0)==0:0){c[b>>2]=g;l=b+4|0;c[l>>2]=(c[l>>2]|0)+h;l=g+8|0;l=g+((l&7|0)==0?0:0-l&7)|0;b=d+8|0;b=d+((b&7|0)==0?0:0-b&7)|0;k=l+m|0;i=b-l-m|0;c[l+4>>2]=m|3;g:do if((j|0)==(b|0)){v=(c[5415]|0)+i|0;c[5415]=v;c[5418]=k;c[k+4>>2]=v|1;}else {if((c[5417]|0)==(b|0)){v=(c[5414]|0)+i|0;c[5414]=v;c[5417]=k;c[k+4>>2]=v|1;c[k+v>>2]=v;break;}a=c[b+4>>2]|0;if((a&3|0)==1){h=a&-8;e=a>>>3;h:do if(a>>>0<256){a=c[b+8>>2]|0;d=c[b+12>>2]|0;if((d|0)==(a|0)){c[5412]=c[5412]&~(1<<e);break;}else {c[a+12>>2]=d;c[d+8>>2]=a;break;}}else {g=c[b+24>>2]|0;a=c[b+12>>2]|0;do if((a|0)==(b|0)){d=b+16|0;e=d+4|0;a=c[e>>2]|0;if(!a){a=c[d>>2]|0;if(!a){a=0;break;}}else d=e;while(1){f=a+20|0;e=c[f>>2]|0;if(!e){f=a+16|0;e=c[f>>2]|0;if(!e)break;else {a=e;d=f;}}else {a=e;d=f;}}c[d>>2]=0;}else {v=c[b+8>>2]|0;c[v+12>>2]=a;c[a+8>>2]=v;}while(0);if(!g)break;d=c[b+28>>2]|0;e=21952+(d<<2)|0;do if((c[e>>2]|0)!=(b|0)){v=g+16|0;c[((c[v>>2]|0)==(b|0)?v:g+20|0)>>2]=a;if(!a)break h;}else {c[e>>2]=a;if(a|0)break;c[5413]=c[5413]&~(1<<d);break h;}while(0);c[a+24>>2]=g;d=b+16|0;e=c[d>>2]|0;if(e|0){c[a+16>>2]=e;c[e+24>>2]=a;}d=c[d+4>>2]|0;if(!d)break;c[a+20>>2]=d;c[d+24>>2]=a;}while(0);b=b+h|0;f=h+i|0;}else f=i;b=b+4|0;c[b>>2]=c[b>>2]&-2;c[k+4>>2]=f|1;c[k+f>>2]=f;b=f>>>3;if(f>>>0<256){d=21688+(b<<1<<2)|0;a=c[5412]|0;b=1<<b;if(!(a&b)){c[5412]=a|b;b=d;a=d+8|0;}else {a=d+8|0;b=c[a>>2]|0;}c[a>>2]=k;c[b+12>>2]=k;c[k+8>>2]=b;c[k+12>>2]=d;break;}b=f>>>8;do if(!b)e=0;else {if(f>>>0>16777215){e=31;break;}u=(b+1048320|0)>>>16&8;v=b<<u;t=(v+520192|0)>>>16&4;v=v<<t;e=(v+245760|0)>>>16&2;e=14-(t|u|e)+(v<<e>>>15)|0;e=f>>>(e+7|0)&1|e<<1;}while(0);b=21952+(e<<2)|0;c[k+28>>2]=e;a=k+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[5413]|0;d=1<<e;if(!(a&d)){c[5413]=a|d;c[b>>2]=k;c[k+24>>2]=b;c[k+12>>2]=k;c[k+8>>2]=k;break;}b=c[b>>2]|0;i:do if((c[b+4>>2]&-8|0)!=(f|0)){e=f<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=b+16+(e>>>31<<2)|0;a=c[d>>2]|0;if(!a)break;if((c[a+4>>2]&-8|0)==(f|0)){b=a;break i;}else {e=e<<1;b=a;}}c[d>>2]=k;c[k+24>>2]=b;c[k+12>>2]=k;c[k+8>>2]=k;break g;}while(0);u=b+8|0;v=c[u>>2]|0;c[v+12>>2]=k;c[u>>2]=k;c[k+8>>2]=v;c[k+12>>2]=b;c[k+24>>2]=0;}while(0);v=l+8|0;V=w;return v|0;}b=22096;while(1){a=c[b>>2]|0;if(a>>>0<=j>>>0?(v=a+(c[b+4>>2]|0)|0,v>>>0>j>>>0):0)break;b=c[b+8>>2]|0;}f=v+-47|0;a=f+8|0;a=f+((a&7|0)==0?0:0-a&7)|0;f=j+16|0;a=a>>>0<f>>>0?j:a;b=a+8|0;d=h+-40|0;t=g+8|0;t=(t&7|0)==0?0:0-t&7;u=g+t|0;t=d-t|0;c[5418]=u;c[5415]=t;c[u+4>>2]=t|1;c[g+d+4>>2]=40;c[5419]=c[5534];d=a+4|0;c[d>>2]=27;c[b>>2]=c[5524];c[b+4>>2]=c[5525];c[b+8>>2]=c[5526];c[b+12>>2]=c[5527];c[5524]=g;c[5525]=h;c[5527]=0;c[5526]=b;b=a+24|0;do{u=b;b=b+4|0;c[b>>2]=7;}while((u+8|0)>>>0<v>>>0);if((a|0)!=(j|0)){g=a-j|0;c[d>>2]=c[d>>2]&-2;c[j+4>>2]=g|1;c[a>>2]=g;b=g>>>3;if(g>>>0<256){d=21688+(b<<1<<2)|0;a=c[5412]|0;b=1<<b;if(!(a&b)){c[5412]=a|b;b=d;a=d+8|0;}else {a=d+8|0;b=c[a>>2]|0;}c[a>>2]=j;c[b+12>>2]=j;c[j+8>>2]=b;c[j+12>>2]=d;break;}b=g>>>8;if(b){if(g>>>0>16777215)e=31;else {u=(b+1048320|0)>>>16&8;v=b<<u;t=(v+520192|0)>>>16&4;v=v<<t;e=(v+245760|0)>>>16&2;e=14-(t|u|e)+(v<<e>>>15)|0;e=g>>>(e+7|0)&1|e<<1;}}else e=0;d=21952+(e<<2)|0;c[j+28>>2]=e;c[j+20>>2]=0;c[f>>2]=0;b=c[5413]|0;a=1<<e;if(!(b&a)){c[5413]=b|a;c[d>>2]=j;c[j+24>>2]=d;c[j+12>>2]=j;c[j+8>>2]=j;break;}b=c[d>>2]|0;j:do if((c[b+4>>2]&-8|0)!=(g|0)){e=g<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=b+16+(e>>>31<<2)|0;a=c[d>>2]|0;if(!a)break;if((c[a+4>>2]&-8|0)==(g|0)){b=a;break j;}else {e=e<<1;b=a;}}c[d>>2]=j;c[j+24>>2]=b;c[j+12>>2]=j;c[j+8>>2]=j;break f;}while(0);u=b+8|0;v=c[u>>2]|0;c[v+12>>2]=j;c[u>>2]=j;c[j+8>>2]=v;c[j+12>>2]=b;c[j+24>>2]=0;}}else {v=c[5416]|0;if((v|0)==0|g>>>0<v>>>0)c[5416]=g;c[5524]=g;c[5525]=h;c[5527]=0;c[5421]=c[5530];c[5420]=-1;c[5425]=21688;c[5424]=21688;c[5427]=21696;c[5426]=21696;c[5429]=21704;c[5428]=21704;c[5431]=21712;c[5430]=21712;c[5433]=21720;c[5432]=21720;c[5435]=21728;c[5434]=21728;c[5437]=21736;c[5436]=21736;c[5439]=21744;c[5438]=21744;c[5441]=21752;c[5440]=21752;c[5443]=21760;c[5442]=21760;c[5445]=21768;c[5444]=21768;c[5447]=21776;c[5446]=21776;c[5449]=21784;c[5448]=21784;c[5451]=21792;c[5450]=21792;c[5453]=21800;c[5452]=21800;c[5455]=21808;c[5454]=21808;c[5457]=21816;c[5456]=21816;c[5459]=21824;c[5458]=21824;c[5461]=21832;c[5460]=21832;c[5463]=21840;c[5462]=21840;c[5465]=21848;c[5464]=21848;c[5467]=21856;c[5466]=21856;c[5469]=21864;c[5468]=21864;c[5471]=21872;c[5470]=21872;c[5473]=21880;c[5472]=21880;c[5475]=21888;c[5474]=21888;c[5477]=21896;c[5476]=21896;c[5479]=21904;c[5478]=21904;c[5481]=21912;c[5480]=21912;c[5483]=21920;c[5482]=21920;c[5485]=21928;c[5484]=21928;c[5487]=21936;c[5486]=21936;v=h+-40|0;t=g+8|0;t=(t&7|0)==0?0:0-t&7;u=g+t|0;t=v-t|0;c[5418]=u;c[5415]=t;c[u+4>>2]=t|1;c[g+v+4>>2]=40;c[5419]=c[5534];}while(0);b=c[5415]|0;if(b>>>0>m>>>0){t=b-m|0;c[5415]=t;v=c[5418]|0;u=v+m|0;c[5418]=u;c[u+4>>2]=t|1;c[v+4>>2]=m|3;v=v+8|0;V=w;return v|0;}}c[(ao()|0)>>2]=48;v=0;V=w;return v|0;}function er(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if(!a)return;d=a+-8|0;f=c[5416]|0;a=c[a+-4>>2]|0;b=a&-8;j=d+b|0;do if(!(a&1)){e=c[d>>2]|0;if(!(a&3))return;h=d+(0-e)|0;g=e+b|0;if(h>>>0<f>>>0)return;if((c[5417]|0)==(h|0)){a=j+4|0;b=c[a>>2]|0;if((b&3|0)!=3){i=h;b=g;break;}c[5414]=g;c[a>>2]=b&-2;c[h+4>>2]=g|1;c[h+g>>2]=g;return;}d=e>>>3;if(e>>>0<256){a=c[h+8>>2]|0;b=c[h+12>>2]|0;if((b|0)==(a|0)){c[5412]=c[5412]&~(1<<d);i=h;b=g;break;}else {c[a+12>>2]=b;c[b+8>>2]=a;i=h;b=g;break;}}f=c[h+24>>2]|0;a=c[h+12>>2]|0;do if((a|0)==(h|0)){b=h+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){a=0;break;}}else b=d;while(1){e=a+20|0;d=c[e>>2]|0;if(!d){e=a+16|0;d=c[e>>2]|0;if(!d)break;else {a=d;b=e;}}else {a=d;b=e;}}c[b>>2]=0;}else {i=c[h+8>>2]|0;c[i+12>>2]=a;c[a+8>>2]=i;}while(0);if(f){b=c[h+28>>2]|0;d=21952+(b<<2)|0;if((c[d>>2]|0)==(h|0)){c[d>>2]=a;if(!a){c[5413]=c[5413]&~(1<<b);i=h;b=g;break;}}else {i=f+16|0;c[((c[i>>2]|0)==(h|0)?i:f+20|0)>>2]=a;if(!a){i=h;b=g;break;}}c[a+24>>2]=f;b=h+16|0;d=c[b>>2]|0;if(d|0){c[a+16>>2]=d;c[d+24>>2]=a;}b=c[b+4>>2]|0;if(b){c[a+20>>2]=b;c[b+24>>2]=a;i=h;b=g;}else {i=h;b=g;}}else {i=h;b=g;}}else {i=d;h=d;}while(0);if(h>>>0>=j>>>0)return;a=j+4|0;e=c[a>>2]|0;if(!(e&1))return;if(!(e&2)){if((c[5418]|0)==(j|0)){j=(c[5415]|0)+b|0;c[5415]=j;c[5418]=i;c[i+4>>2]=j|1;if((i|0)!=(c[5417]|0))return;c[5417]=0;c[5414]=0;return;}if((c[5417]|0)==(j|0)){j=(c[5414]|0)+b|0;c[5414]=j;c[5417]=h;c[i+4>>2]=j|1;c[h+j>>2]=j;return;}f=(e&-8)+b|0;d=e>>>3;do if(e>>>0<256){b=c[j+8>>2]|0;a=c[j+12>>2]|0;if((a|0)==(b|0)){c[5412]=c[5412]&~(1<<d);break;}else {c[b+12>>2]=a;c[a+8>>2]=b;break;}}else {g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){b=j+16|0;d=b+4|0;a=c[d>>2]|0;if(!a){a=c[b>>2]|0;if(!a){d=0;break;}}else b=d;while(1){e=a+20|0;d=c[e>>2]|0;if(!d){e=a+16|0;d=c[e>>2]|0;if(!d)break;else {a=d;b=e;}}else {a=d;b=e;}}c[b>>2]=0;d=a;}else {d=c[j+8>>2]|0;c[d+12>>2]=a;c[a+8>>2]=d;d=a;}while(0);if(g|0){a=c[j+28>>2]|0;b=21952+(a<<2)|0;if((c[b>>2]|0)==(j|0)){c[b>>2]=d;if(!d){c[5413]=c[5413]&~(1<<a);break;}}else {e=g+16|0;c[((c[e>>2]|0)==(j|0)?e:g+20|0)>>2]=d;if(!d)break;}c[d+24>>2]=g;a=j+16|0;b=c[a>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d;}a=c[a+4>>2]|0;if(a|0){c[d+20>>2]=a;c[a+24>>2]=d;}}}while(0);c[i+4>>2]=f|1;c[h+f>>2]=f;if((i|0)==(c[5417]|0)){c[5414]=f;return;}}else {c[a>>2]=e&-2;c[i+4>>2]=b|1;c[h+b>>2]=b;f=b;}a=f>>>3;if(f>>>0<256){d=21688+(a<<1<<2)|0;b=c[5412]|0;a=1<<a;if(!(b&a)){c[5412]=b|a;a=d;b=d+8|0;}else {b=d+8|0;a=c[b>>2]|0;}c[b>>2]=i;c[a+12>>2]=i;c[i+8>>2]=a;c[i+12>>2]=d;return;}a=f>>>8;if(a){if(f>>>0>16777215)e=31;else {h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;e=(j+245760|0)>>>16&2;e=14-(g|h|e)+(j<<e>>>15)|0;e=f>>>(e+7|0)&1|e<<1;}}else e=0;a=21952+(e<<2)|0;c[i+28>>2]=e;c[i+20>>2]=0;c[i+16>>2]=0;b=c[5413]|0;d=1<<e;a:do if(!(b&d)){c[5413]=b|d;c[a>>2]=i;c[i+24>>2]=a;c[i+12>>2]=i;c[i+8>>2]=i;}else {a=c[a>>2]|0;b:do if((c[a+4>>2]&-8|0)!=(f|0)){e=f<<((e|0)==31?0:25-(e>>>1)|0);while(1){d=a+16+(e>>>31<<2)|0;b=c[d>>2]|0;if(!b)break;if((c[b+4>>2]&-8|0)==(f|0)){a=b;break b;}else {e=e<<1;a=b;}}c[d>>2]=i;c[i+24>>2]=a;c[i+12>>2]=i;c[i+8>>2]=i;break a;}while(0);h=a+8|0;j=c[h>>2]|0;c[j+12>>2]=i;c[h>>2]=i;c[i+8>>2]=j;c[i+12>>2]=a;c[i+24>>2]=0;}while(0);j=(c[5420]|0)+-1|0;c[5420]=j;if(j|0)return;a=22104;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0;}c[5420]=-1;return;}function fr(a){a=a|0;var b=0,d=0,e=0;e=a+3&-4;a=sr()|0;b=c[a>>2]|0;d=b+e|0;do if((e|0)<1|d>>>0>b>>>0){if(d>>>0>(R()|0)>>>0?(T(d|0)|0)==0:0)break;c[a>>2]=d;e=b;return e|0;}while(0);c[(ao()|0)>>2]=48;e=-1;return e|0;}function gr(a){a=a|0;var b=0;b=V;V=V+a|0;V=V+15&-16;return b|0;}function hr(a){a=a|0;V=a;}function ir(){return V|0;}function jr(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;f=a&65535;e=b&65535;c=q(e,f)|0;d=a>>>16;a=(c>>>16)+(q(e,d)|0)|0;e=b>>>16;b=q(e,f)|0;return (t((a>>>16)+(q(e,d)|0)+(((a&65535)+b|0)>>>16)|0),a+b<<16|c&65535|0)|0;}function kr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;f=c;c=jr(e,f)|0;a=u()|0;return (t((q(b,f)|0)+(q(d,e)|0)+a|a&0|0),c|0|0)|0;}function lr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;c=a+c>>>0;return (t(b+d+(c>>>0<a>>>0|0)>>>0|0),c|0)|0;}function mr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;d=b-d-(c>>>0>a>>>0|0)>>>0;return (t(d|0),a-c>>>0|0)|0;}function nr(a){a=a|0;return (a?31-(r(a^a-1)|0)|0:32)|0;}function or(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;l=a;j=b;k=j;h=d;n=e;i=n;if(!k){g=(f|0)!=0;if(!i){if(g){c[f>>2]=(l>>>0)%(h>>>0);c[f+4>>2]=0;}n=0;f=(l>>>0)/(h>>>0)>>>0;return (t(n|0),f)|0;}else {if(!g){n=0;f=0;return (t(n|0),f)|0;}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;f=0;return (t(n|0),f)|0;}}g=(i|0)==0;do if(h){if(!g){g=(r(i|0)|0)-(r(k|0)|0)|0;if(g>>>0<=31){m=g+1|0;i=31-g|0;b=g-31>>31;h=m;a=l>>>(m>>>0)&b|k<<i;b=k>>>(m>>>0)&b;g=0;i=l<<i;break;}if(!f){n=0;f=0;return (t(n|0),f)|0;}c[f>>2]=a|0;c[f+4>>2]=j|b&0;n=0;f=0;return (t(n|0),f)|0;}g=h-1|0;if(g&h|0){i=(r(h|0)|0)+33-(r(k|0)|0)|0;p=64-i|0;m=32-i|0;j=m>>31;o=i-32|0;b=o>>31;h=i;a=m-1>>31&k>>>(o>>>0)|(k<<m|l>>>(i>>>0))&b;b=b&k>>>(i>>>0);g=l<<p&j;i=(k<<p|l>>>(o>>>0))&j|l<<m&i-33>>31;break;}if(f|0){c[f>>2]=g&l;c[f+4>>2]=0;}if((h|0)==1){o=j|b&0;p=a|0|0;return (t(o|0),p)|0;}else {p=nr(h|0)|0;o=k>>>(p>>>0)|0;p=k<<32-p|l>>>(p>>>0)|0;return (t(o|0),p)|0;}}else {if(g){if(f|0){c[f>>2]=(k>>>0)%(h>>>0);c[f+4>>2]=0;}o=0;p=(k>>>0)/(h>>>0)>>>0;return (t(o|0),p)|0;}if(!l){if(f|0){c[f>>2]=0;c[f+4>>2]=(k>>>0)%(i>>>0);}o=0;p=(k>>>0)/(i>>>0)>>>0;return (t(o|0),p)|0;}g=i-1|0;if(!(g&i)){if(f|0){c[f>>2]=a|0;c[f+4>>2]=g&k|b&0;}o=0;p=k>>>((nr(i|0)|0)>>>0);return (t(o|0),p)|0;}g=(r(i|0)|0)-(r(k|0)|0)|0;if(g>>>0<=30){b=g+1|0;i=31-g|0;h=b;a=k<<i|l>>>(b>>>0);b=k>>>(b>>>0);g=0;i=l<<i;break;}if(!f){o=0;p=0;return (t(o|0),p)|0;}c[f>>2]=a|0;c[f+4>>2]=j|b&0;o=0;p=0;return (t(o|0),p)|0;}while(0);if(!h){k=i;j=0;i=0;}else {m=d|0|0;l=n|e&0;k=lr(m|0,l|0,-1,-1)|0;d=u()|0;j=i;i=0;do{e=j;j=g>>>31|j<<1;g=i|g<<1;e=a<<1|e>>>31|0;n=a>>>31|b<<1|0;mr(k|0,d|0,e|0,n|0)|0;p=u()|0;o=p>>31|((p|0)<0?-1:0)<<1;i=o&1;a=mr(e|0,n|0,o&m|0,(((p|0)<0?-1:0)>>31|((p|0)<0?-1:0)<<1)&l|0)|0;b=u()|0;h=h-1|0;}while((h|0)!=0);k=j;j=0;}h=0;if(f|0){c[f>>2]=a;c[f+4>>2]=b;}o=(g|0)>>>31|(k|h)<<1|(h<<1|g>>>31)&0|j;p=(g<<1|0>>>31)&-2|i;return (t(o|0),p)|0;}function pr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return or(a,b,c,d,0)|0;}function qr(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){t(b>>>c|0);return a>>>c|(b&(1<<c)-1)<<32-c;}t(0);return b>>>c-32|0;}function rr(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){t(b<<c|(a&(1<<c)-1<<32-c)>>>32-c|0);return a<<c;}t(a<<c-32|0);return 0;}function sr(){return 22176;}function tr(a){a=a|0;return (a&255)<<24|(a>>8&255)<<16|(a>>16&255)<<8|a>>>24|0;}function ur(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=512){S(b|0,d|0,e|0)|0;return b|0;}h=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return h|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0;}e=g&-4|0;f=e-64|0;while((b|0)<=(f|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0;}while((b|0)<(e|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;}}else {e=g-4|0;while((b|0)<(e|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0;}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;}return h|0;}function vr(b,c,d){b=b|0;c=c|0;d=d|0;var e=0;if((c|0)<(b|0)&(b|0)<(c+d|0)){e=b;c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b>>0]=a[c>>0]|0;}b=e;}else ur(b,c,d)|0;return b|0;}function wr(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=b+e|0;d=d&255;if((e|0)>=67){while(b&3){a[b>>0]=d;b=b+1|0;}f=h&-4|0;i=d|d<<8|d<<16|d<<24;g=f-64|0;while((b|0)<=(g|0)){c[b>>2]=i;c[b+4>>2]=i;c[b+8>>2]=i;c[b+12>>2]=i;c[b+16>>2]=i;c[b+20>>2]=i;c[b+24>>2]=i;c[b+28>>2]=i;c[b+32>>2]=i;c[b+36>>2]=i;c[b+40>>2]=i;c[b+44>>2]=i;c[b+48>>2]=i;c[b+52>>2]=i;c[b+56>>2]=i;c[b+60>>2]=i;b=b+64|0;}while((b|0)<(f|0)){c[b>>2]=i;b=b+4|0;}}while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0;}return h-e|0;}function xr(a){a=a|0;return Y[a&3]()|0;}function yr(a,b){a=a|0;b=b|0;return Z[a&15](b|0)|0;}function zr(a,b,c,d,e,f,g){a=a|0;b=b|0;c=+c;d=d|0;e=e|0;f=f|0;g=g|0;return _[a&1](b|0,+c,d|0,e|0,f|0,g|0)|0;}function Ar(a,b,c){a=a|0;b=b|0;c=c|0;return $[a&63](b|0,c|0)|0;}function Br(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return aa[a&7](b|0,c|0,d|0)|0;}function Cr(a){a=a|0;ba[a&3]();}function Dr(a,b){a=a|0;b=b|0;ca[a&255](b|0);}function Er(a,b,c){a=a|0;b=b|0;c=c|0;da[a&15](b|0,c|0);}function Fr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ea[a&15](b|0,c|0,d|0);}function Gr(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;fa[a&7](b|0,c|0,d|0,e|0);}function Hr(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ga[a&3](b|0,c|0,d|0,e|0,f|0);}function Ir(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ha[a&3](b|0,c|0,d|0,e|0,f|0,g|0);}function Jr(){s(0);return 0;}function Kr(a){a=a|0;s(1);return 0;}function Lr(a,b,c,d,e,f){a=a|0;b=+b;c=c|0;d=d|0;e=e|0;f=f|0;s(2);return 0;}function Mr(a,b){a=a|0;b=b|0;s(3);return 0;}function Nr(a,b,c){a=a|0;b=b|0;c=c|0;s(4);return 0;}function Or(){s(5);}function Pr(a){a=a|0;s(6);}function Qr(a,b){a=a|0;b=b|0;s(7);}function Rr(a,b,c){a=a|0;b=b|0;c=c|0;s(8);}function Sr(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;s(9);}function Tr(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;s(10);}function Ur(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;s(11);}var Y=[Jr,Mk,Fl,Jr];var Z=[Kr,Ap,zb,Fb,qp,tp,oq,Kq,Tq,wk,na,tl,Ok,Hl,Kr,Kr];var _=[Lr,po];var $=[Mr,Ba,Ka,Eb,jd,Nd,Xd,je,ke,ne,_e,ff,yf,Ff,Of,Vf,Hg,Qg,Zg,ch,lh,qh,zh,Eh,Nh,_h,fi,ki,si,Bi,Si,Zi,fj,oj,yj,Fj,Pj,Yj,ek,lk,tk,ll,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr,Mr];var aa=[Nr,Io,Yo,Fp,Hp,Mq,Nq,Nr];var ba=[Or,Dp,Po,Or];var ca=[Pr,pq,za,Aa,Ca,Ia,Ja,La,yp,ob,Gb,yb,Bb,Cb,Lb,Mb,Xb,Yb,sc,tc,uc,Nc,hd,id,kd,Jd,Od,Pd,Qd,Rd,Vd,Wd,Yd,he,ie,le,me,Ye,Ze,$e,df,ef,wf,xf,zf,Df,Ef,Mf,Nf,Pf,Tf,Uf,Fg,Gg,Ig,Rg,Sg,Xg,Yg,_g,dh,eh,jh,kh,mh,rh,sh,xh,yh,Ah,Fh,Gh,Lh,Mh,Oh,Yh,Zh,$h,di,ei,gi,li,mi,qi,ri,ti,zi,Ai,Qi,Ri,Ti,Xi,Yi,dj,ej,gj,mj,nj,wj,xj,zj,Dj,Ej,Nj,Oj,Qj,Wj,Xj,ck,dk,fk,jk,kk,rk,sk,uk,Uo,Vo,Wo,Xo,fp,op,pp,rp,sp,zp,Bp,Cp,Ep,Gp,Lp,mq,nq,Iq,Jq,Sq,Yq,Zq,zk,wl,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr,Pr];var da=[Qr,Ab,Db,ma,pa,qa,ra,sa,qo,Qr,Qr,Qr,Qr,Qr,Qr,Qr];var ea=[Rr,Lq,Oq,Uq,Vq,la,oa,dl,Vl,$l,Rr,Rr,Rr,Rr,Rr,Rr];var fa=[Sr,$o,ip,Op,Vk,Ol,Sr,Sr];var ga=[Tr,_o,hp,Np];var ha=[Ur,Zo,gp,Mp];return {__ZSt18uncaught_exceptionv:kq,___cxa_can_catch:hq,___cxa_is_pointer_type:iq,___embind_register_native_and_builtin_types:im,___errno_location:ao,___getTypeName:$n,___muldi3:kr,___udivdi3:pr,_bitshift64Lshr:qr,_bitshift64Shl:rr,_emscripten_get_sbrk_ptr:sr,_free:er,_i64Add:lr,_i64Subtract:mr,_llvm_bswap_i32:tr,_malloc:dr,_memcpy:ur,_memmove:vr,_memset:wr,dynCall_i:xr,dynCall_ii:yr,dynCall_iidiiii:zr,dynCall_iii:Ar,dynCall_iiii:Br,dynCall_v:Cr,dynCall_vi:Dr,dynCall_vii:Er,dynCall_viii:Fr,dynCall_viiii:Gr,dynCall_viiiii:Hr,dynCall_viiiiii:Ir,globalCtors:ia,stackAlloc:gr,stackRestore:hr,stackSave:ir};}(asmGlobalArg,asmLibraryArg,buffer);var __ZSt18uncaught_exceptionv=Module['__ZSt18uncaught_exceptionv']=asm['__ZSt18uncaught_exceptionv'];Module['___cxa_can_catch']=asm['___cxa_can_catch'];Module['___cxa_is_pointer_type']=asm['___cxa_is_pointer_type'];Module['___embind_register_native_and_builtin_types']=asm['___embind_register_native_and_builtin_types'];Module['___errno_location']=asm['___errno_location'];var ___getTypeName=Module['___getTypeName']=asm['___getTypeName'];Module['___muldi3']=asm['___muldi3'];Module['___udivdi3']=asm['___udivdi3'];Module['_bitshift64Lshr']=asm['_bitshift64Lshr'];Module['_bitshift64Shl']=asm['_bitshift64Shl'];Module['_emscripten_get_sbrk_ptr']=asm['_emscripten_get_sbrk_ptr'];var _free=Module['_free']=asm['_free'];Module['_i64Add']=asm['_i64Add'];Module['_i64Subtract']=asm['_i64Subtract'];Module['_llvm_bswap_i32']=asm['_llvm_bswap_i32'];var _malloc=Module['_malloc']=asm['_malloc'];Module['_memcpy']=asm['_memcpy'];Module['_memmove']=asm['_memmove'];Module['_memset']=asm['_memset'];var globalCtors=Module['globalCtors']=asm['globalCtors'];Module['stackAlloc']=asm['stackAlloc'];Module['stackRestore']=asm['stackRestore'];Module['stackSave']=asm['stackSave'];Module['dynCall_i']=asm['dynCall_i'];Module['dynCall_ii']=asm['dynCall_ii'];Module['dynCall_iidiiii']=asm['dynCall_iidiiii'];Module['dynCall_iii']=asm['dynCall_iii'];Module['dynCall_iiii']=asm['dynCall_iiii'];Module['dynCall_v']=asm['dynCall_v'];Module['dynCall_vi']=asm['dynCall_vi'];Module['dynCall_vii']=asm['dynCall_vii'];Module['dynCall_viii']=asm['dynCall_viii'];Module['dynCall_viiii']=asm['dynCall_viiii'];Module['dynCall_viiiii']=asm['dynCall_viiiii'];Module['dynCall_viiiiii']=asm['dynCall_viiiiii'];Module['asm']=asm;if(memoryInitializer){if(!isDataURI(memoryInitializer)){memoryInitializer=locateFile(memoryInitializer);}if(ENVIRONMENT_IS_NODE||ENVIRONMENT_IS_SHELL){var data=readBinary(memoryInitializer);HEAPU8.set(data,GLOBAL_BASE);}else {addRunDependency();var applyMemoryInitializer=function(data){if(data.byteLength)data=new Uint8Array(data);HEAPU8.set(data,GLOBAL_BASE);if(Module['memoryInitializerRequest'])delete Module['memoryInitializerRequest'].response;removeRunDependency();};var doBrowserLoad=function(){readAsync(memoryInitializer,applyMemoryInitializer,function(){var e=new Error('could not load memory initializer '+memoryInitializer);throw e;});};var memoryInitializerBytes=tryParseAsDataURI(memoryInitializer);if(memoryInitializerBytes){applyMemoryInitializer(memoryInitializerBytes.buffer);}else if(Module['memoryInitializerRequest']){var useRequest=function(){var request=Module['memoryInitializerRequest'];var response=request.response;if(request.status!==200&&request.status!==0){var data=tryParseAsDataURI(Module['memoryInitializerRequestURL']);if(data){response=data.buffer;}else {console.warn('a problem seems to have happened with Module.memoryInitializerRequest, status: '+request.status+', retrying '+memoryInitializer);doBrowserLoad();return;}}applyMemoryInitializer(response);};if(Module['memoryInitializerRequest'].response){setTimeout(useRequest,0);}else {Module['memoryInitializerRequest'].addEventListener('load',useRequest);}}else {doBrowserLoad();}}}var calledRun;function ExitStatus(status){this.name='ExitStatus';this.message='Program terminated with exit('+status+')';this.status=status;}dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller;};function run(args){if(runDependencies>0){return;}preRun();if(runDependencies>0)return;function doRun(){if(calledRun)return;calledRun=true;Module['calledRun']=true;if(ABORT)return;initRuntime();preMain();if(Module['onRuntimeInitialized'])Module['onRuntimeInitialized']();postRun();}if(Module['setStatus']){Module['setStatus']('Running...');setTimeout(function(){setTimeout(function(){Module['setStatus']('');},1);doRun();},1);}else {doRun();}}Module['run']=run;if(Module['preInit']){if(typeof Module['preInit']=='function')Module['preInit']=[Module['preInit']];while(Module['preInit'].length>0){Module['preInit'].pop()();}}run();return Module;}

let Module = null;
const POINT_FORMAT_READERS = {
  0: dv => {
    return {
      position: [dv.getInt32(0, true), dv.getInt32(4, true), dv.getInt32(8, true)],
      intensity: dv.getUint16(12, true),
      classification: dv.getUint8(15)
    };
  },
  1: dv => {
    return {
      position: [dv.getInt32(0, true), dv.getInt32(4, true), dv.getInt32(8, true)],
      intensity: dv.getUint16(12, true),
      classification: dv.getUint8(15)
    };
  },
  2: dv => {
    return {
      position: [dv.getInt32(0, true), dv.getInt32(4, true), dv.getInt32(8, true)],
      intensity: dv.getUint16(12, true),
      classification: dv.getUint8(15),
      color: [dv.getUint16(20, true), dv.getUint16(22, true), dv.getUint16(24, true)]
    };
  },
  3: dv => {
    return {
      position: [dv.getInt32(0, true), dv.getInt32(4, true), dv.getInt32(8, true)],
      intensity: dv.getUint16(12, true),
      classification: dv.getUint8(15),
      color: [dv.getUint16(28, true), dv.getUint16(30, true), dv.getUint16(32, true)]
    };
  }
};

function readAs(buf, Type = {}, offset, count) {
  count = count === undefined || count === 0 ? 1 : count;
  const sub = buf.slice(offset, offset + Type.BYTES_PER_ELEMENT * count);
  const r = new Type(sub);

  if (count === 1) {
    return r[0];
  }

  const ret = [];

  for (let i = 0; i < count; i++) {
    ret.push(r[i]);
  }

  return ret;
}

function parseLASHeader(arraybuffer) {
  let start = 32 * 3 + 35;
  const o = {
    pointsOffset: readAs(arraybuffer, Uint32Array, 32 * 3),
    pointsFormatId: readAs(arraybuffer, Uint8Array, 32 * 3 + 8),
    pointsStructSize: readAs(arraybuffer, Uint16Array, 32 * 3 + 8 + 1),
    pointsCount: readAs(arraybuffer, Uint32Array, 32 * 3 + 11),
    scale: readAs(arraybuffer, Float64Array, start, 3)
  };
  start += 24;
  o.offset = readAs(arraybuffer, Float64Array, start, 3);
  start += 24;
  const bounds = readAs(arraybuffer, Float64Array, start, 6);
  start += 48;
  o.maxs = [bounds[0], bounds[2], bounds[4]];
  o.mins = [bounds[1], bounds[3], bounds[5]];
  return o;
}

class LASLoader$1 {
  constructor(arraybuffer) {
    _defineProperty(this, "arraybuffer", void 0);

    _defineProperty(this, "readOffset", 0);

    _defineProperty(this, "header", {
      pointsOffset: 0,
      pointsFormatId: 0,
      pointsStructSize: 0,
      pointsCount: 0,
      scale: [0, 0, 0],
      offset: [0, 0, 0],
      maxs: [0],
      mins: [0],
      totalToRead: 0,
      totalRead: 0,
      versionAsString: '',
      isCompressed: true
    });

    this.arraybuffer = arraybuffer;
  }

  open() {
    return true;
  }

  getHeader() {
    this.header = parseLASHeader(this.arraybuffer);
    return this.header;
  }

  readData(count, skip) {
    const {
      header,
      arraybuffer
    } = this;

    if (!header) {
      throw new Error('Cannot start reading data till a header request is issued');
    }

    let {
      readOffset
    } = this;
    let start;

    if (skip <= 1) {
      count = Math.min(count, header.pointsCount - readOffset);
      start = header.pointsOffset + readOffset * header.pointsStructSize;
      const end = start + count * header.pointsStructSize;
      readOffset += count;
      this.readOffset = readOffset;
      return {
        buffer: arraybuffer.slice(start, end),
        count,
        hasMoreData: readOffset < header.pointsCount
      };
    }

    const pointsToRead = Math.min(count * skip, header.pointsCount - readOffset);
    const bufferSize = Math.ceil(pointsToRead / skip);
    let pointsRead = 0;
    const buf = new Uint8Array(bufferSize * header.pointsStructSize);

    for (let i = 0; i < pointsToRead; i++) {
      if (i % skip === 0) {
        start = header.pointsOffset + readOffset * header.pointsStructSize;
        const src = new Uint8Array(arraybuffer, start, header.pointsStructSize);
        buf.set(src, pointsRead * header.pointsStructSize);
        pointsRead++;
      }

      readOffset++;
    }

    this.readOffset = readOffset;
    return {
      buffer: buf.buffer,
      count: pointsRead,
      hasMoreData: readOffset < header.pointsCount
    };
  }

  close() {
    this.arraybuffer = null;
    return true;
  }

}

class LAZLoader {
  constructor(arraybuffer) {
    _defineProperty(this, "arraybuffer", void 0);

    _defineProperty(this, "instance", null);

    _defineProperty(this, "header", null);

    this.arraybuffer = arraybuffer;

    if (!Module) {
      Module = getModule();
    }
  }

  open() {
    try {
      const {
        arraybuffer
      } = this;
      this.instance = new Module.LASZip();
      const abInt = new Uint8Array(arraybuffer);

      const buf = Module._malloc(arraybuffer.byteLength);

      this.instance.arraybuffer = arraybuffer;
      this.instance.buf = buf;
      Module.HEAPU8.set(abInt, buf);
      this.instance.open(buf, arraybuffer.byteLength);
      this.instance.readOffset = 0;
      return true;
    } catch (error) {
      throw new Error("Failed to open file: ".concat(error.message));
    }
  }

  getHeader() {
    if (!this.instance) {
      throw new Error('You need to open the file before trying to read header');
    }

    try {
      const header = parseLASHeader(this.instance.arraybuffer);
      header.pointsFormatId &= 0x3f;
      this.header = header;
      return header;
    } catch (error) {
      throw new Error("Failed to get header: ".concat(error.message));
    }
  }

  readData(count, offset, skip) {
    if (!this.instance) {
      throw new Error('You need to open the file before trying to read stuff');
    }

    const {
      header,
      instance
    } = this;

    if (!header) {
      throw new Error('You need to query header before reading, I maintain state that way, sorry :(');
    }

    try {
      const pointsToRead = Math.min(count * skip, header.pointsCount - instance.readOffset);
      const bufferSize = Math.ceil(pointsToRead / skip);
      let pointsRead = 0;
      const thisBuf = new Uint8Array(bufferSize * header.pointsStructSize);

      const bufRead = Module._malloc(header.pointsStructSize);

      for (let i = 0; i < pointsToRead; i++) {
        instance.getPoint(bufRead);

        if (i % skip === 0) {
          const a = new Uint8Array(Module.HEAPU8.buffer, bufRead, header.pointsStructSize);
          thisBuf.set(a, pointsRead * header.pointsStructSize);
          pointsRead++;
        }

        instance.readOffset++;
      }

      return {
        buffer: thisBuf.buffer,
        count: pointsRead,
        hasMoreData: instance.readOffset < header.pointsCount
      };
    } catch (error) {
      throw new Error("Failed to read data: ".concat(error.message));
    }
  }

  close() {
    try {
      if (this.instance !== null) {
        this.instance.delete();
        this.instance = null;
      }

      return true;
    } catch (error) {
      throw new Error("Failed to close file: ".concat(error.message));
    }
  }

}

class LASDecoder {
  constructor(buffer, len, header) {
    _defineProperty(this, "arrayb", void 0);

    _defineProperty(this, "decoder", void 0);

    _defineProperty(this, "pointsCount", void 0);

    _defineProperty(this, "pointSize", void 0);

    _defineProperty(this, "scale", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "mins", void 0);

    _defineProperty(this, "maxs", void 0);

    this.arrayb = buffer;
    this.decoder = POINT_FORMAT_READERS[header.pointsFormatId];
    this.pointsCount = len;
    this.pointSize = header.pointsStructSize;
    this.scale = header.scale;
    this.offset = header.offset;
    this.mins = header.mins;
    this.maxs = header.maxs;
  }

  getPoint(index) {
    if (index < 0 || index >= this.pointsCount) {
      throw new Error('Point index out of range');
    }

    const dv = new DataView(this.arrayb, index * this.pointSize, this.pointSize);
    return this.decoder(dv);
  }

}

class LASFile {
  constructor(arraybuffer) {
    _defineProperty(this, "arraybuffer", void 0);

    _defineProperty(this, "formatId", 0);

    _defineProperty(this, "loader", void 0);

    _defineProperty(this, "isCompressed", true);

    _defineProperty(this, "isOpen", false);

    _defineProperty(this, "version", 0);

    _defineProperty(this, "versionAsString", '');

    this.arraybuffer = arraybuffer;

    if (this.determineVersion() > 13) {
      throw new Error('Only file versions <= 1.3 are supported at this time');
    }

    this.determineFormat();

    if (POINT_FORMAT_READERS[this.formatId] === undefined) {
      throw new Error('The point format ID is not supported');
    }

    this.loader = this.isCompressed ? new LAZLoader(this.arraybuffer) : new LASLoader$1(this.arraybuffer);
  }

  determineFormat() {
    const formatId = readAs(this.arraybuffer, Uint8Array, 32 * 3 + 8);
    const bit7 = (formatId & 0x80) >> 7;
    const bit6 = (formatId & 0x40) >> 6;

    if (bit7 === 1 && bit6 === 1) {
      throw new Error('Old style compression not supported');
    }

    this.formatId = formatId & 0x3f;
    this.isCompressed = bit7 === 1 || bit6 === 1;
  }

  determineVersion() {
    const ver = new Int8Array(this.arraybuffer, 24, 2);
    this.version = ver[0] * 10 + ver[1];
    this.versionAsString = "".concat(ver[0], ".").concat(ver[1]);
    return this.version;
  }

  open() {
    if (this.loader.open()) {
      this.isOpen = true;
    }
  }

  getHeader() {
    return this.loader.getHeader();
  }

  readData(count, start, skip) {
    return this.loader.readData(count, start, skip);
  }

  close() {
    if (this.loader.close()) {
      this.isOpen = false;
    }
  }

  getUnpacker() {
    return LASDecoder;
  }

}

function getLASSchema(lasHeader, attributes) {
  const metadataMap = makeMetadataFromLasHeader(lasHeader);
  const schema = deduceMeshSchema(attributes, metadataMap);
  return schema;
}
function makeMetadataFromLasHeader(lasHeader) {
  const metadataMap = new Map();
  metadataMap.set('las_pointsOffset', lasHeader.pointsOffset.toString(10));
  metadataMap.set('las_pointsFormatId', lasHeader.pointsFormatId.toString(10));
  metadataMap.set('las_pointsStructSize', lasHeader.pointsStructSize.toString(10));
  metadataMap.set('las_pointsCount', lasHeader.pointsCount.toString(10));
  metadataMap.set('las_scale', JSON.stringify(lasHeader.scale));
  metadataMap.set('las_offset', JSON.stringify(lasHeader.offset));

  if (lasHeader.maxs !== undefined) {
    metadataMap.set('las_maxs', JSON.stringify(lasHeader.maxs));
  }

  if (lasHeader.mins !== undefined) {
    metadataMap.set('las_mins', JSON.stringify(lasHeader.mins));
  }

  metadataMap.set('las_totalToRead', lasHeader.totalToRead.toString(10));
  metadataMap.set('las_pointsFortotalReadmatId', lasHeader.totalRead.toString(10));

  if (lasHeader.versionAsString !== undefined) {
    metadataMap.set('las_versionAsString', lasHeader.versionAsString);
  }

  if (lasHeader.isCompressed !== undefined) {
    metadataMap.set('las_isCompressed', lasHeader.isCompressed.toString());
  }

  return metadataMap;
}

function parseLAS(arrayBuffer, options) {
  return parseLASMesh(arrayBuffer, options);
}

function parseLASMesh(arrayBuffer, options = {}) {
  var _options$las;

  let pointIndex = 0;
  let positions;
  let colors;
  let intensities;
  let classifications;
  let originalHeader;
  const lasMesh = {
    loader: 'las',
    loaderData: {},
    schema: new Schema([]),
    header: {
      vertexCount: 0,
      boundingBox: [[0, 0, 0], [0, 0, 0]]
    },
    attributes: {},
    topology: 'point-list',
    mode: 0
  };
  parseLASChunked(arrayBuffer, (_options$las = options.las) === null || _options$las === void 0 ? void 0 : _options$las.skip, (decoder = {}, lasHeader) => {
    var _options$las3, _options$onProgress;

    if (!originalHeader) {
      var _options$las2;

      originalHeader = lasHeader;
      const total = lasHeader.totalToRead;
      const PositionsType = (_options$las2 = options.las) !== null && _options$las2 !== void 0 && _options$las2.fp64 ? Float64Array : Float32Array;
      positions = new PositionsType(total * 3);
      colors = lasHeader.pointsFormatId >= 2 ? new Uint8Array(total * 4) : null;
      intensities = new Uint16Array(total);
      classifications = new Uint8Array(total);
      lasMesh.loaderData = lasHeader;
      lasMesh.attributes = {
        POSITION: {
          value: positions,
          size: 3
        },
        intensity: {
          value: intensities,
          size: 1
        },
        classification: {
          value: classifications,
          size: 1
        }
      };

      if (colors) {
        lasMesh.attributes.COLOR_0 = {
          value: colors,
          size: 4
        };
      }
    }

    const batchSize = decoder.pointsCount;
    const {
      scale: [scaleX, scaleY, scaleZ],
      offset: [offsetX, offsetY, offsetZ]
    } = lasHeader;
    const twoByteColor = detectTwoByteColors(decoder, batchSize, (_options$las3 = options.las) === null || _options$las3 === void 0 ? void 0 : _options$las3.colorDepth);

    for (let i = 0; i < batchSize; i++) {
      const {
        position,
        color,
        intensity,
        classification
      } = decoder.getPoint(i);
      positions[pointIndex * 3] = position[0] * scaleX + offsetX;
      positions[pointIndex * 3 + 1] = position[1] * scaleY + offsetY;
      positions[pointIndex * 3 + 2] = position[2] * scaleZ + offsetZ;

      if (color && colors) {
        if (twoByteColor) {
          colors[pointIndex * 4] = color[0] / 256;
          colors[pointIndex * 4 + 1] = color[1] / 256;
          colors[pointIndex * 4 + 2] = color[2] / 256;
        } else {
          colors[pointIndex * 4] = color[0];
          colors[pointIndex * 4 + 1] = color[1];
          colors[pointIndex * 4 + 2] = color[2];
        }

        colors[pointIndex * 4 + 3] = 255;
      }

      intensities[pointIndex] = intensity;
      classifications[pointIndex] = classification;
      pointIndex++;
    }

    const meshBatch = { ...lasMesh,
      header: {
        vertexCount: lasHeader.totalRead
      },
      progress: lasHeader.totalRead / lasHeader.totalToRead
    };
    options === null || options === void 0 ? void 0 : (_options$onProgress = options.onProgress) === null || _options$onProgress === void 0 ? void 0 : _options$onProgress.call(options, meshBatch);
  });
  lasMesh.header = {
    vertexCount: originalHeader.totalToRead,
    boundingBox: getMeshBoundingBox((lasMesh === null || lasMesh === void 0 ? void 0 : lasMesh.attributes) || {})
  };

  if (lasMesh) {
    lasMesh.schema = getLASSchema(lasMesh.loaderData, lasMesh.attributes);
  }

  return lasMesh;
}

function parseLASChunked(rawData, skip, onParseData = {}) {
  const dataHandler = new LASFile(rawData);

  try {
    dataHandler.open();
    const header = dataHandler.getHeader();
    const Unpacker = dataHandler.getUnpacker();
    const totalToRead = Math.ceil(header.pointsCount / Math.max(1, skip));
    header.totalToRead = totalToRead;
    let totalRead = 0;

    while (true) {
      const chunk = dataHandler.readData(1000 * 100, 0, skip);
      totalRead += chunk.count;
      header.totalRead = totalRead;
      header.versionAsString = chunk.versionAsString;
      header.isCompressed = chunk.isCompressed;
      const unpacker = new Unpacker(chunk.buffer, chunk.count, header);
      onParseData(unpacker, header);

      if (!chunk.hasMoreData || totalRead >= totalToRead) {
        break;
      }
    }
  } catch (e) {
    throw e;
  } finally {
    dataHandler.close();
  }
}

function detectTwoByteColors(decoder = {}, batchSize, colorDepth) {
  let twoByteColor = false;

  switch (colorDepth) {
    case 8:
      twoByteColor = false;
      break;

    case 16:
      twoByteColor = true;
      break;

    case 'auto':
      if (decoder.getPoint(0).color) {
        for (let i = 0; i < batchSize; i++) {
          const {
            color
          } = decoder.getPoint(i);

          if (color[0] > 255 || color[1] > 255 || color[2] > 255) {
            twoByteColor = true;
          }
        }
      }

      break;

    default:
      console.warn('las: illegal value for options.las.colorDepth');
      break;
  }

  return twoByteColor;
}

const LASLoader = { ...LASLoader$2,
  parse: async (arrayBuffer, options) => parseLAS(arrayBuffer, options),
  parseSync: (arrayBuffer, options) => parseLAS(arrayBuffer, options)
};

function assert$3(condition, message) {
  if (!condition) {
    throw new Error("math.gl assertion ".concat(message));
  }
}

const RADIANS_TO_DEGREES = 1 / Math.PI * 180;
const DEGREES_TO_RADIANS = 1 / 180 * Math.PI;
const config = {
  EPSILON: 1e-12,
  debug: false,
  precision: 4,
  printTypes: false,
  printDegrees: false,
  printRowMajor: true
};
function formatValue(value, {
  precision = config.precision
} = {}) {
  value = round(value);
  return "".concat(parseFloat(value.toPrecision(precision)));
}
function isArray(value) {
  return Array.isArray(value) || ArrayBuffer.isView(value) && !(value instanceof DataView);
}
function toRadians(degrees) {
  return radians(degrees);
}
function toDegrees(radians) {
  return degrees(radians);
}
function radians(degrees, result) {
  return map(degrees, degrees => degrees * DEGREES_TO_RADIANS, result);
}
function degrees(radians, result) {
  return map(radians, radians => radians * RADIANS_TO_DEGREES, result);
}
function clamp(value, min, max) {
  return map(value, value => Math.max(min, Math.min(max, value)));
}
function equals(a, b, epsilon) {
  const oldEpsilon = config.EPSILON;

  if (epsilon) {
    config.EPSILON = epsilon;
  }

  try {
    if (a === b) {
      return true;
    }

    if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }

      for (let i = 0; i < a.length; ++i) {
        if (!equals(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    if (a && a.equals) {
      return a.equals(b);
    }

    if (b && b.equals) {
      return b.equals(a);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return Math.abs(a - b) <= config.EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
    }

    return false;
  } finally {
    config.EPSILON = oldEpsilon;
  }
}

function round(value) {
  return Math.round(value / config.EPSILON) * config.EPSILON;
}

function duplicateArray(array) {
  return array.clone ? array.clone() : new Array(array.length);
}

function map(value, func, result) {
  if (isArray(value)) {
    const array = value;
    result = result || duplicateArray(array);

    for (let i = 0; i < result.length && i < array.length; ++i) {
      result[i] = func(value[i], i, result);
    }

    return result;
  }

  return func(value);
}

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}
class MathArray extends _extendableBuiltin(Array) {
  clone() {
    return new this.constructor().copy(this);
  }

  fromArray(array, offset = 0) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = array[i + offset];
    }

    return this.check();
  }

  toArray(targetArray = [], offset = 0) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      targetArray[offset + i] = this[i];
    }

    return targetArray;
  }

  from(arrayOrObject) {
    return Array.isArray(arrayOrObject) ? this.copy(arrayOrObject) : this.fromObject(arrayOrObject);
  }

  to(arrayOrObject) {
    if (arrayOrObject === this) {
      return this;
    }

    return isArray(arrayOrObject) ? this.toArray(arrayOrObject) : this.toObject(arrayOrObject);
  }

  toTarget(target) {
    return target ? this.to(target) : this;
  }

  toFloat32Array() {
    return new Float32Array(this);
  }

  toString() {
    return this.formatString(config);
  }

  formatString(opts) {
    let string = '';

    for (let i = 0; i < this.ELEMENTS; ++i) {
      string += (i > 0 ? ', ' : '') + formatValue(this[i], opts);
    }

    return "".concat(opts.printTypes ? this.constructor.name : '', "[").concat(string, "]");
  }

  equals(array) {
    if (!array || this.length !== array.length) {
      return false;
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      if (!equals(this[i], array[i])) {
        return false;
      }
    }

    return true;
  }

  exactEquals(array) {
    if (!array || this.length !== array.length) {
      return false;
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      if (this[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }

  negate() {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = -this[i];
    }

    return this.check();
  }

  lerp(a, b, t) {
    if (t === undefined) {
      return this.lerp(this, a, b);
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      const ai = a[i];
      this[i] = ai + t * (b[i] - ai);
    }

    return this.check();
  }

  min(vector) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.min(vector[i], this[i]);
    }

    return this.check();
  }

  max(vector) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.max(vector[i], this[i]);
    }

    return this.check();
  }

  clamp(minVector, maxVector) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.min(Math.max(this[i], minVector[i]), maxVector[i]);
    }

    return this.check();
  }

  add(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] += vector[i];
      }
    }

    return this.check();
  }

  subtract(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] -= vector[i];
      }
    }

    return this.check();
  }

  scale(scale) {
    if (typeof scale === 'number') {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= scale;
      }
    } else {
      for (let i = 0; i < this.ELEMENTS && i < scale.length; ++i) {
        this[i] *= scale[i];
      }
    }

    return this.check();
  }

  multiplyByScalar(scalar) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] *= scalar;
    }

    return this.check();
  }

  check() {
    if (config.debug && !this.validate()) {
      throw new Error("math.gl: ".concat(this.constructor.name, " some fields set to invalid numbers'"));
    }

    return this;
  }

  validate() {
    let valid = this.length === this.ELEMENTS;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      valid = valid && Number.isFinite(this[i]);
    }

    return valid;
  }

  sub(a) {
    return this.subtract(a);
  }

  setScalar(a) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = a;
    }

    return this.check();
  }

  addScalar(a) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] += a;
    }

    return this.check();
  }

  subScalar(a) {
    return this.addScalar(-a);
  }

  multiplyScalar(scalar) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] *= scalar;
    }

    return this.check();
  }

  divideScalar(a) {
    return this.multiplyByScalar(1 / a);
  }

  clampScalar(min, max) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.min(Math.max(this[i], min), max);
    }

    return this.check();
  }

  get elements() {
    return this;
  }

}

function validateVector(v, length) {
  if (v.length !== length) {
    return false;
  }

  for (let i = 0; i < v.length; ++i) {
    if (!Number.isFinite(v[i])) {
      return false;
    }
  }

  return true;
}
function checkNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid number ".concat(value));
  }

  return value;
}
function checkVector(v, length, callerName = '') {
  if (config.debug && !validateVector(v, length)) {
    throw new Error("math.gl: ".concat(callerName, " some fields set to invalid numbers'"));
  }

  return v;
}

class Vector extends MathArray {
  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = checkNumber(value);
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = checkNumber(value);
  }

  len() {
    return Math.sqrt(this.lengthSquared());
  }

  magnitude() {
    return this.len();
  }

  lengthSquared() {
    let length = 0;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      length += this[i] * this[i];
    }

    return length;
  }

  magnitudeSquared() {
    return this.lengthSquared();
  }

  distance(mathArray) {
    return Math.sqrt(this.distanceSquared(mathArray));
  }

  distanceSquared(mathArray) {
    let length = 0;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      const dist = this[i] - mathArray[i];
      length += dist * dist;
    }

    return checkNumber(length);
  }

  dot(mathArray) {
    let product = 0;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      product += this[i] * mathArray[i];
    }

    return checkNumber(product);
  }

  normalize() {
    const length = this.magnitude();

    if (length !== 0) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] /= length;
      }
    }

    return this.check();
  }

  multiply(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= vector[i];
      }
    }

    return this.check();
  }

  divide(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] /= vector[i];
      }
    }

    return this.check();
  }

  lengthSq() {
    return this.lengthSquared();
  }

  distanceTo(vector) {
    return this.distance(vector);
  }

  distanceToSquared(vector) {
    return this.distanceSquared(vector);
  }

  getComponent(i) {
    assert$3(i >= 0 && i < this.ELEMENTS, 'index is out of range');
    return checkNumber(this[i]);
  }

  setComponent(i, value) {
    assert$3(i >= 0 && i < this.ELEMENTS, 'index is out of range');
    this[i] = value;
    return this.check();
  }

  addVectors(a, b) {
    return this.copy(a).add(b);
  }

  subVectors(a, b) {
    return this.copy(a).subtract(b);
  }

  multiplyVectors(a, b) {
    return this.copy(a).multiply(b);
  }

  addScaledVector(a, b) {
    return this.add(new this.constructor(a).multiplyScalar(b));
  }

}

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create$4() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3$1(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4$2(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$4();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
})();

function vec2_transformMat4AsVector(out, a, m) {
  const x = a[0];
  const y = a[1];
  const w = m[3] * x + m[7] * y || 1.0;
  out[0] = (m[0] * x + m[4] * y) / w;
  out[1] = (m[1] * x + m[5] * y) / w;
  return out;
}
function vec3_transformMat4AsVector(out, a, m) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = m[3] * x + m[7] * y + m[11] * z || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
function vec3_transformMat2(out, a, m) {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  out[2] = a[2];
  return out;
}
function vec4_transformMat2(out, a, m) {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function vec4_transformMat3(out, a, m) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  out[0] = m[0] * x + m[3] * y + m[6] * z;
  out[1] = m[1] * x + m[4] * y + m[7] * z;
  out[2] = m[2] * x + m[5] * y + m[8] * z;
  out[3] = a[3];
  return out;
}

class Vector2 extends Vector {
  constructor(x = 0, y = 0) {
    super(2);

    if (isArray(x) && arguments.length === 1) {
      this.copy(x);
    } else {
      if (config.debug) {
        checkNumber(x);
        checkNumber(y);
      }

      this[0] = x;
      this[1] = y;
    }
  }

  set(x, y) {
    this[0] = x;
    this[1] = y;
    return this.check();
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    return this.check();
  }

  fromObject(object) {
    if (config.debug) {
      checkNumber(object.x);
      checkNumber(object.y);
    }

    this[0] = object.x;
    this[1] = object.y;
    return this.check();
  }

  toObject(object) {
    object.x = this[0];
    object.y = this[1];
    return object;
  }

  get ELEMENTS() {
    return 2;
  }

  horizontalAngle() {
    return Math.atan2(this.y, this.x);
  }

  verticalAngle() {
    return Math.atan2(this.x, this.y);
  }

  transform(matrix4) {
    return this.transformAsPoint(matrix4);
  }

  transformAsPoint(matrix4) {
    transformMat4$2(this, this, matrix4);
    return this.check();
  }

  transformAsVector(matrix4) {
    vec2_transformMat4AsVector(this, this, matrix4);
    return this.check();
  }

  transformByMatrix3(matrix3) {
    transformMat3$1(this, this, matrix3);
    return this.check();
  }

  transformByMatrix2x3(matrix2x3) {
    transformMat2d(this, this, matrix2x3);
    return this.check();
  }

  transformByMatrix2(matrix2) {
    transformMat2(this, this, matrix2);
    return this.check();
  }

}

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$3() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length$2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize$2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot$2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4$1(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat$1(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX$2(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY$2(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ$2(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot$2(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length$2;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$3();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
})();

const ORIGIN = [0, 0, 0];
let ZERO$2;
class Vector3 extends Vector {
  static get ZERO() {
    if (!ZERO$2) {
      ZERO$2 = new Vector3(0, 0, 0);
      Object.freeze(ZERO$2);
    }

    return ZERO$2;
  }

  constructor(x = 0, y = 0, z = 0) {
    super(-0, -0, -0);

    if (arguments.length === 1 && isArray(x)) {
      this.copy(x);
    } else {
      if (config.debug) {
        checkNumber(x);
        checkNumber(y);
        checkNumber(z);
      }

      this[0] = x;
      this[1] = y;
      this[2] = z;
    }
  }

  set(x, y, z) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    return this.check();
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    return this.check();
  }

  fromObject(object) {
    if (config.debug) {
      checkNumber(object.x);
      checkNumber(object.y);
      checkNumber(object.z);
    }

    this[0] = object.x;
    this[1] = object.y;
    this[2] = object.z;
    return this.check();
  }

  toObject(object) {
    object.x = this[0];
    object.y = this[1];
    object.z = this[2];
    return object;
  }

  get ELEMENTS() {
    return 3;
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = checkNumber(value);
  }

  angle(vector) {
    return angle(this, vector);
  }

  cross(vector) {
    cross(this, this, vector);
    return this.check();
  }

  rotateX({
    radians,
    origin = ORIGIN
  }) {
    rotateX$2(this, this, origin, radians);
    return this.check();
  }

  rotateY({
    radians,
    origin = ORIGIN
  }) {
    rotateY$2(this, this, origin, radians);
    return this.check();
  }

  rotateZ({
    radians,
    origin = ORIGIN
  }) {
    rotateZ$2(this, this, origin, radians);
    return this.check();
  }

  transform(matrix4) {
    return this.transformAsPoint(matrix4);
  }

  transformAsPoint(matrix4) {
    transformMat4$1(this, this, matrix4);
    return this.check();
  }

  transformAsVector(matrix4) {
    vec3_transformMat4AsVector(this, this, matrix4);
    return this.check();
  }

  transformByMatrix3(matrix3) {
    transformMat3(this, this, matrix3);
    return this.check();
  }

  transformByMatrix2(matrix2) {
    vec3_transformMat2(this, this, matrix2);
    return this.check();
  }

  transformByQuaternion(quaternion) {
    transformQuat$1(this, this, quaternion);
    return this.check();
  }

}

let ZERO$1;
class Vector4 extends Vector {
  static get ZERO() {
    if (!ZERO$1) {
      ZERO$1 = new Vector4(0, 0, 0, 0);
      Object.freeze(ZERO$1);
    }

    return ZERO$1;
  }

  constructor(x = 0, y = 0, z = 0, w = 0) {
    super(-0, -0, -0, -0);

    if (isArray(x) && arguments.length === 1) {
      this.copy(x);
    } else {
      if (config.debug) {
        checkNumber(x);
        checkNumber(y);
        checkNumber(z);
        checkNumber(w);
      }

      this[0] = x;
      this[1] = y;
      this[2] = z;
      this[3] = w;
    }
  }

  set(x, y, z, w) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
    return this.check();
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    this[3] = array[3];
    return this.check();
  }

  fromObject(object) {
    if (config.debug) {
      checkNumber(object.x);
      checkNumber(object.y);
      checkNumber(object.z);
      checkNumber(object.w);
    }

    this[0] = object.x;
    this[1] = object.y;
    this[2] = object.z;
    this[3] = object.w;
    return this;
  }

  toObject(object) {
    object.x = this[0];
    object.y = this[1];
    object.z = this[2];
    object.w = this[3];
    return object;
  }

  get ELEMENTS() {
    return 4;
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = checkNumber(value);
  }

  get w() {
    return this[3];
  }

  set w(value) {
    this[3] = checkNumber(value);
  }

  transform(matrix4) {
    transformMat4$1(this, this, matrix4);
    return this.check();
  }

  transformByMatrix3(matrix3) {
    vec4_transformMat3(this, this, matrix3);
    return this.check();
  }

  transformByMatrix2(matrix2) {
    vec4_transformMat2(this, this, matrix2);
    return this.check();
  }

  transformByQuaternion(quaternion) {
    transformQuat$1(this, this, quaternion);
    return this.check();
  }

  applyMatrix4(m) {
    m.transform(this, this);
    return this;
  }

}

class Matrix extends MathArray {
  toString() {
    let string = '[';

    if (config.printRowMajor) {
      string += 'row-major:';

      for (let row = 0; row < this.RANK; ++row) {
        for (let col = 0; col < this.RANK; ++col) {
          string += " ".concat(this[col * this.RANK + row]);
        }
      }
    } else {
      string += 'column-major:';

      for (let i = 0; i < this.ELEMENTS; ++i) {
        string += " ".concat(this[i]);
      }
    }

    string += ']';
    return string;
  }

  getElementIndex(row, col) {
    return col * this.RANK + row;
  }

  getElement(row, col) {
    return this[col * this.RANK + row];
  }

  setElement(row, col, value) {
    this[col * this.RANK + row] = checkNumber(value);
    return this;
  }

  getColumn(columnIndex, result = new Array(this.RANK).fill(-0)) {
    const firstIndex = columnIndex * this.RANK;

    for (let i = 0; i < this.RANK; ++i) {
      result[i] = this[firstIndex + i];
    }

    return result;
  }

  setColumn(columnIndex, columnVector) {
    const firstIndex = columnIndex * this.RANK;

    for (let i = 0; i < this.RANK; ++i) {
      this[firstIndex + i] = columnVector[i];
    }

    return this;
  }

}

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create$2() {
  var out = new ARRAY_TYPE(9);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function transpose$1(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function invert$2(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant$1(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function multiply$2(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */

function translate$1(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate$1(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale$3(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */

function fromQuat$1(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}

var INDICES$1;

(function (INDICES) {
  INDICES[INDICES["COL0ROW0"] = 0] = "COL0ROW0";
  INDICES[INDICES["COL0ROW1"] = 1] = "COL0ROW1";
  INDICES[INDICES["COL0ROW2"] = 2] = "COL0ROW2";
  INDICES[INDICES["COL1ROW0"] = 3] = "COL1ROW0";
  INDICES[INDICES["COL1ROW1"] = 4] = "COL1ROW1";
  INDICES[INDICES["COL1ROW2"] = 5] = "COL1ROW2";
  INDICES[INDICES["COL2ROW0"] = 6] = "COL2ROW0";
  INDICES[INDICES["COL2ROW1"] = 7] = "COL2ROW1";
  INDICES[INDICES["COL2ROW2"] = 8] = "COL2ROW2";
})(INDICES$1 || (INDICES$1 = {}));

const IDENTITY_MATRIX$1 = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
class Matrix3 extends Matrix {
  static get IDENTITY() {
    return getIdentityMatrix$1();
  }

  static get ZERO() {
    return getZeroMatrix$1();
  }

  get ELEMENTS() {
    return 9;
  }

  get RANK() {
    return 3;
  }

  get INDICES() {
    return INDICES$1;
  }

  constructor(array, ...args) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0);

    if (arguments.length === 1 && Array.isArray(array)) {
      this.copy(array);
    } else if (args.length > 0) {
      this.copy([array, ...args]);
    } else {
      this.identity();
    }
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    this[3] = array[3];
    this[4] = array[4];
    this[5] = array[5];
    this[6] = array[6];
    this[7] = array[7];
    this[8] = array[8];
    return this.check();
  }

  identity() {
    return this.copy(IDENTITY_MATRIX$1);
  }

  fromObject(object) {
    return this.check();
  }

  fromQuaternion(q) {
    fromQuat$1(this, q);
    return this.check();
  }

  set(m00, m10, m20, m01, m11, m21, m02, m12, m22) {
    this[0] = m00;
    this[1] = m10;
    this[2] = m20;
    this[3] = m01;
    this[4] = m11;
    this[5] = m21;
    this[6] = m02;
    this[7] = m12;
    this[8] = m22;
    return this.check();
  }

  setRowMajor(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    this[0] = m00;
    this[1] = m10;
    this[2] = m20;
    this[3] = m01;
    this[4] = m11;
    this[5] = m21;
    this[6] = m02;
    this[7] = m12;
    this[8] = m22;
    return this.check();
  }

  determinant() {
    return determinant$1(this);
  }

  transpose() {
    transpose$1(this, this);
    return this.check();
  }

  invert() {
    invert$2(this, this);
    return this.check();
  }

  multiplyLeft(a) {
    multiply$2(this, a, this);
    return this.check();
  }

  multiplyRight(a) {
    multiply$2(this, this, a);
    return this.check();
  }

  rotate(radians) {
    rotate$1(this, this, radians);
    return this.check();
  }

  scale(factor) {
    if (Array.isArray(factor)) {
      scale$3(this, this, factor);
    } else {
      scale$3(this, this, [factor, factor]);
    }

    return this.check();
  }

  translate(vec) {
    translate$1(this, this, vec);
    return this.check();
  }

  transform(vector, result) {
    let out;

    switch (vector.length) {
      case 2:
        out = transformMat3$1(result || [-0, -0], vector, this);
        break;

      case 3:
        out = transformMat3(result || [-0, -0, -0], vector, this);
        break;

      case 4:
        out = vec4_transformMat3(result || [-0, -0, -0, -0], vector, this);
        break;

      default:
        throw new Error('Illegal vector');
    }

    checkVector(out, vector.length);
    return out;
  }

  transformVector(vector, result) {
    return this.transform(vector, result);
  }

  transformVector2(vector, result) {
    return this.transform(vector, result);
  }

  transformVector3(vector, result) {
    return this.transform(vector, result);
  }

}
let ZERO_MATRIX3;
let IDENTITY_MATRIX3;

function getZeroMatrix$1() {
  if (!ZERO_MATRIX3) {
    ZERO_MATRIX3 = new Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    Object.freeze(ZERO_MATRIX3);
  }

  return ZERO_MATRIX3;
}

function getIdentityMatrix$1() {
  if (!IDENTITY_MATRIX3) {
    IDENTITY_MATRIX3 = new Matrix3();
    Object.freeze(IDENTITY_MATRIX3);
  }

  return IDENTITY_MATRIX3;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity$2(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert$1(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply$1(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale$2(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX$1(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY$1(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ$1(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Alias for {@link mat4.perspectiveNO}
 * @function
 */

var perspective = perspectiveNO;
/**
 * Generates a orthogonal projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Alias for {@link mat4.orthoNO}
 * @function
 */

var ortho = orthoNO;
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity$2(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$1() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add$1(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length$1(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength$1(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize$1(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp$1(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$1();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
})();

var INDICES;

(function (INDICES) {
  INDICES[INDICES["COL0ROW0"] = 0] = "COL0ROW0";
  INDICES[INDICES["COL0ROW1"] = 1] = "COL0ROW1";
  INDICES[INDICES["COL0ROW2"] = 2] = "COL0ROW2";
  INDICES[INDICES["COL0ROW3"] = 3] = "COL0ROW3";
  INDICES[INDICES["COL1ROW0"] = 4] = "COL1ROW0";
  INDICES[INDICES["COL1ROW1"] = 5] = "COL1ROW1";
  INDICES[INDICES["COL1ROW2"] = 6] = "COL1ROW2";
  INDICES[INDICES["COL1ROW3"] = 7] = "COL1ROW3";
  INDICES[INDICES["COL2ROW0"] = 8] = "COL2ROW0";
  INDICES[INDICES["COL2ROW1"] = 9] = "COL2ROW1";
  INDICES[INDICES["COL2ROW2"] = 10] = "COL2ROW2";
  INDICES[INDICES["COL2ROW3"] = 11] = "COL2ROW3";
  INDICES[INDICES["COL3ROW0"] = 12] = "COL3ROW0";
  INDICES[INDICES["COL3ROW1"] = 13] = "COL3ROW1";
  INDICES[INDICES["COL3ROW2"] = 14] = "COL3ROW2";
  INDICES[INDICES["COL3ROW3"] = 15] = "COL3ROW3";
})(INDICES || (INDICES = {}));

const DEFAULT_FOVY = 45 * Math.PI / 180;
const DEFAULT_ASPECT = 1;
const DEFAULT_NEAR = 0.1;
const DEFAULT_FAR = 500;
const IDENTITY_MATRIX = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
class Matrix4 extends Matrix {
  static get IDENTITY() {
    return getIdentityMatrix();
  }

  static get ZERO() {
    return getZeroMatrix();
  }

  get ELEMENTS() {
    return 16;
  }

  get RANK() {
    return 4;
  }

  get INDICES() {
    return INDICES;
  }

  constructor(array) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0);

    if (arguments.length === 1 && Array.isArray(array)) {
      this.copy(array);
    } else {
      this.identity();
    }
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    this[3] = array[3];
    this[4] = array[4];
    this[5] = array[5];
    this[6] = array[6];
    this[7] = array[7];
    this[8] = array[8];
    this[9] = array[9];
    this[10] = array[10];
    this[11] = array[11];
    this[12] = array[12];
    this[13] = array[13];
    this[14] = array[14];
    this[15] = array[15];
    return this.check();
  }

  set(m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33) {
    this[0] = m00;
    this[1] = m10;
    this[2] = m20;
    this[3] = m30;
    this[4] = m01;
    this[5] = m11;
    this[6] = m21;
    this[7] = m31;
    this[8] = m02;
    this[9] = m12;
    this[10] = m22;
    this[11] = m32;
    this[12] = m03;
    this[13] = m13;
    this[14] = m23;
    this[15] = m33;
    return this.check();
  }

  setRowMajor(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this[0] = m00;
    this[1] = m10;
    this[2] = m20;
    this[3] = m30;
    this[4] = m01;
    this[5] = m11;
    this[6] = m21;
    this[7] = m31;
    this[8] = m02;
    this[9] = m12;
    this[10] = m22;
    this[11] = m32;
    this[12] = m03;
    this[13] = m13;
    this[14] = m23;
    this[15] = m33;
    return this.check();
  }

  toRowMajor(result) {
    result[0] = this[0];
    result[1] = this[4];
    result[2] = this[8];
    result[3] = this[12];
    result[4] = this[1];
    result[5] = this[5];
    result[6] = this[9];
    result[7] = this[13];
    result[8] = this[2];
    result[9] = this[6];
    result[10] = this[10];
    result[11] = this[14];
    result[12] = this[3];
    result[13] = this[7];
    result[14] = this[11];
    result[15] = this[15];
    return result;
  }

  identity() {
    return this.copy(IDENTITY_MATRIX);
  }

  fromObject(object) {
    return this.check();
  }

  fromQuaternion(quaternion) {
    fromQuat(this, quaternion);
    return this.check();
  }

  frustum(view) {
    const {
      left,
      right,
      bottom,
      top,
      near = DEFAULT_NEAR,
      far = DEFAULT_FAR
    } = view;

    if (far === Infinity) {
      computeInfinitePerspectiveOffCenter(this, left, right, bottom, top, near);
    } else {
      frustum(this, left, right, bottom, top, near, far);
    }

    return this.check();
  }

  lookAt(view) {
    const {
      eye,
      center = [0, 0, 0],
      up = [0, 1, 0]
    } = view;
    lookAt(this, eye, center, up);
    return this.check();
  }

  ortho(view) {
    const {
      left,
      right,
      bottom,
      top,
      near = DEFAULT_NEAR,
      far = DEFAULT_FAR
    } = view;
    ortho(this, left, right, bottom, top, near, far);
    return this.check();
  }

  orthographic(view) {
    const {
      fovy = DEFAULT_FOVY,
      aspect = DEFAULT_ASPECT,
      focalDistance = 1,
      near = DEFAULT_NEAR,
      far = DEFAULT_FAR
    } = view;
    checkRadians(fovy);
    const halfY = fovy / 2;
    const top = focalDistance * Math.tan(halfY);
    const right = top * aspect;
    return this.ortho({
      left: -right,
      right,
      bottom: -top,
      top,
      near,
      far
    });
  }

  perspective(view) {
    const {
      fovy = 45 * Math.PI / 180,
      aspect = 1,
      near = 0.1,
      far = 500
    } = view;
    checkRadians(fovy);
    perspective(this, fovy, aspect, near, far);
    return this.check();
  }

  determinant() {
    return determinant(this);
  }

  getScale(result = [-0, -0, -0]) {
    result[0] = Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);
    result[1] = Math.sqrt(this[4] * this[4] + this[5] * this[5] + this[6] * this[6]);
    result[2] = Math.sqrt(this[8] * this[8] + this[9] * this[9] + this[10] * this[10]);
    return result;
  }

  getTranslation(result = [-0, -0, -0]) {
    result[0] = this[12];
    result[1] = this[13];
    result[2] = this[14];
    return result;
  }

  getRotation(result, scaleResult) {
    result = result || [-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0];
    scaleResult = scaleResult || [-0, -0, -0];
    const scale = this.getScale(scaleResult);
    const inverseScale0 = 1 / scale[0];
    const inverseScale1 = 1 / scale[1];
    const inverseScale2 = 1 / scale[2];
    result[0] = this[0] * inverseScale0;
    result[1] = this[1] * inverseScale1;
    result[2] = this[2] * inverseScale2;
    result[3] = 0;
    result[4] = this[4] * inverseScale0;
    result[5] = this[5] * inverseScale1;
    result[6] = this[6] * inverseScale2;
    result[7] = 0;
    result[8] = this[8] * inverseScale0;
    result[9] = this[9] * inverseScale1;
    result[10] = this[10] * inverseScale2;
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
  }

  getRotationMatrix3(result, scaleResult) {
    result = result || [-0, -0, -0, -0, -0, -0, -0, -0, -0];
    scaleResult = scaleResult || [-0, -0, -0];
    const scale = this.getScale(scaleResult);
    const inverseScale0 = 1 / scale[0];
    const inverseScale1 = 1 / scale[1];
    const inverseScale2 = 1 / scale[2];
    result[0] = this[0] * inverseScale0;
    result[1] = this[1] * inverseScale1;
    result[2] = this[2] * inverseScale2;
    result[3] = this[4] * inverseScale0;
    result[4] = this[5] * inverseScale1;
    result[5] = this[6] * inverseScale2;
    result[6] = this[8] * inverseScale0;
    result[7] = this[9] * inverseScale1;
    result[8] = this[10] * inverseScale2;
    return result;
  }

  transpose() {
    transpose(this, this);
    return this.check();
  }

  invert() {
    invert$1(this, this);
    return this.check();
  }

  multiplyLeft(a) {
    multiply$1(this, a, this);
    return this.check();
  }

  multiplyRight(a) {
    multiply$1(this, this, a);
    return this.check();
  }

  rotateX(radians) {
    rotateX$1(this, this, radians);
    return this.check();
  }

  rotateY(radians) {
    rotateY$1(this, this, radians);
    return this.check();
  }

  rotateZ(radians) {
    rotateZ$1(this, this, radians);
    return this.check();
  }

  rotateXYZ(angleXYZ) {
    return this.rotateX(angleXYZ[0]).rotateY(angleXYZ[1]).rotateZ(angleXYZ[2]);
  }

  rotateAxis(radians, axis) {
    rotate(this, this, radians, axis);
    return this.check();
  }

  scale(factor) {
    scale$2(this, this, Array.isArray(factor) ? factor : [factor, factor, factor]);
    return this.check();
  }

  translate(vector) {
    translate(this, this, vector);
    return this.check();
  }

  transform(vector, result) {
    if (vector.length === 4) {
      result = transformMat4(result || [-0, -0, -0, -0], vector, this);
      checkVector(result, 4);
      return result;
    }

    return this.transformAsPoint(vector, result);
  }

  transformAsPoint(vector, result) {
    const {
      length
    } = vector;
    let out;

    switch (length) {
      case 2:
        out = transformMat4$2(result || [-0, -0], vector, this);
        break;

      case 3:
        out = transformMat4$1(result || [-0, -0, -0], vector, this);
        break;

      default:
        throw new Error('Illegal vector');
    }

    checkVector(out, vector.length);
    return out;
  }

  transformAsVector(vector, result) {
    let out;

    switch (vector.length) {
      case 2:
        out = vec2_transformMat4AsVector(result || [-0, -0], vector, this);
        break;

      case 3:
        out = vec3_transformMat4AsVector(result || [-0, -0, -0], vector, this);
        break;

      default:
        throw new Error('Illegal vector');
    }

    checkVector(out, vector.length);
    return out;
  }

  transformPoint(vector, result) {
    return this.transformAsPoint(vector, result);
  }

  transformVector(vector, result) {
    return this.transformAsPoint(vector, result);
  }

  transformDirection(vector, result) {
    return this.transformAsVector(vector, result);
  }

  makeRotationX(radians) {
    return this.identity().rotateX(radians);
  }

  makeTranslation(x, y, z) {
    return this.identity().translate([x, y, z]);
  }

}
let ZERO;
let IDENTITY;

function getZeroMatrix() {
  if (!ZERO) {
    ZERO = new Matrix4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    Object.freeze(ZERO);
  }

  return ZERO;
}

function getIdentityMatrix() {
  if (!IDENTITY) {
    IDENTITY = new Matrix4();
    Object.freeze(IDENTITY);
  }

  return IDENTITY;
}

function checkRadians(possiblyDegrees) {
  if (possiblyDegrees > Math.PI * 2) {
    throw Error('expected radians');
  }
}

function computeInfinitePerspectiveOffCenter(result, left, right, bottom, top, near) {
  const column0Row0 = 2 * near / (right - left);
  const column1Row1 = 2 * near / (top - bottom);
  const column2Row0 = (right + left) / (right - left);
  const column2Row1 = (top + bottom) / (top - bottom);
  const column2Row2 = -1;
  const column2Row3 = -1;
  const column3Row2 = -2 * near;
  result[0] = column0Row0;
  result[1] = 0;
  result[2] = 0;
  result[3] = 0;
  result[4] = 0;
  result[5] = column1Row1;
  result[6] = 0;
  result[7] = 0;
  result[8] = column2Row0;
  result[9] = column2Row1;
  result[10] = column2Row2;
  result[11] = column2Row3;
  result[12] = 0;
  result[13] = 0;
  result[14] = column3Row2;
  result[15] = 0;
  return result;
}

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity$1(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */

function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */

function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 * @function
 */

var add = add$1;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {ReadonlyQuat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

var scale = scale$1;
/**
 * Calculates the dot product of two quat's
 *
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = dot$1;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

var lerp = lerp$1;
/**
 * Calculates the length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate length of
 * @returns {Number} length of a
 */

var length = length$1;
/**
 * Calculates the squared length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = squaredLength$1;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize = normalize$1;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = create$3();
  var xUnitVec3 = fromValues(1, 0, 0);
  var yUnitVec3 = fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot = dot$2(a, b);

    if (dot < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
      normalize$2(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

(function () {
  var temp1 = create();
  var temp2 = create();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
})();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

(function () {
  var matr = create$2();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
})();

const IDENTITY_QUATERNION = [0, 0, 0, 1];
class Quaternion extends MathArray {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    super(-0, -0, -0, -0);

    if (Array.isArray(x) && arguments.length === 1) {
      this.copy(x);
    } else {
      this.set(x, y, z, w);
    }
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    this[3] = array[3];
    return this.check();
  }

  set(x, y, z, w) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
    return this.check();
  }

  fromObject(object) {
    this[0] = object.x;
    this[1] = object.y;
    this[2] = object.z;
    this[3] = object.w;
    return this.check();
  }

  fromMatrix3(m) {
    fromMat3(this, m);
    return this.check();
  }

  fromAxisRotation(axis, rad) {
    setAxisAngle(this, axis, rad);
    return this.check();
  }

  identity() {
    identity$1(this);
    return this.check();
  }

  setAxisAngle(axis, rad) {
    return this.fromAxisRotation(axis, rad);
  }

  get ELEMENTS() {
    return 4;
  }

  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = checkNumber(value);
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = checkNumber(value);
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = checkNumber(value);
  }

  get w() {
    return this[3];
  }

  set w(value) {
    this[3] = checkNumber(value);
  }

  len() {
    return length(this);
  }

  lengthSquared() {
    return squaredLength(this);
  }

  dot(a) {
    return dot(this, a);
  }

  rotationTo(vectorA, vectorB) {
    rotationTo(this, vectorA, vectorB);
    return this.check();
  }

  add(a) {
    add(this, this, a);
    return this.check();
  }

  calculateW() {
    calculateW(this, this);
    return this.check();
  }

  conjugate() {
    conjugate(this, this);
    return this.check();
  }

  invert() {
    invert(this, this);
    return this.check();
  }

  lerp(a, b, t) {
    if (t === undefined) {
      return this.lerp(this, a, b);
    }

    lerp(this, a, b, t);
    return this.check();
  }

  multiplyRight(a) {
    multiply(this, this, a);
    return this.check();
  }

  multiplyLeft(a) {
    multiply(this, a, this);
    return this.check();
  }

  normalize() {
    const length = this.len();
    const l = length > 0 ? 1 / length : 0;
    this[0] = this[0] * l;
    this[1] = this[1] * l;
    this[2] = this[2] * l;
    this[3] = this[3] * l;

    if (length === 0) {
      this[3] = 1;
    }

    return this.check();
  }

  rotateX(rad) {
    rotateX(this, this, rad);
    return this.check();
  }

  rotateY(rad) {
    rotateY(this, this, rad);
    return this.check();
  }

  rotateZ(rad) {
    rotateZ(this, this, rad);
    return this.check();
  }

  scale(b) {
    scale(this, this, b);
    return this.check();
  }

  slerp(arg0, arg1, arg2) {
    let start;
    let target;
    let ratio;

    switch (arguments.length) {
      case 1:
        ({
          start = IDENTITY_QUATERNION,
          target,
          ratio
        } = arg0);
        break;

      case 2:
        start = this;
        target = arg0;
        ratio = arg1;
        break;

      default:
        start = arg0;
        target = arg1;
        ratio = arg2;
    }

    slerp(this, start, target, ratio);
    return this.check();
  }

  transformVector4(vector, result = new Vector4()) {
    transformQuat(result, vector, this);
    return checkVector(result, 4);
  }

  lengthSq() {
    return this.lengthSquared();
  }

  setFromAxisAngle(axis, rad) {
    return this.setAxisAngle(axis, rad);
  }

  premultiply(a) {
    return this.multiplyLeft(a);
  }

  multiply(a) {
    return this.multiplyRight(a);
  }

}

var _MathUtils = {
  EPSILON1: 1e-1,
  EPSILON2: 1e-2,
  EPSILON3: 1e-3,
  EPSILON4: 1e-4,
  EPSILON5: 1e-5,
  EPSILON6: 1e-6,
  EPSILON7: 1e-7,
  EPSILON8: 1e-8,
  EPSILON9: 1e-9,
  EPSILON10: 1e-10,
  EPSILON11: 1e-11,
  EPSILON12: 1e-12,
  EPSILON13: 1e-13,
  EPSILON14: 1e-14,
  EPSILON15: 1e-15,
  EPSILON16: 1e-16,
  EPSILON17: 1e-17,
  EPSILON18: 1e-18,
  EPSILON19: 1e-19,
  EPSILON20: 1e-20,
  PI_OVER_TWO: Math.PI / 2,
  PI_OVER_FOUR: Math.PI / 4,
  PI_OVER_SIX: Math.PI / 6,
  TWO_PI: Math.PI * 2
};

const WGS84_RADIUS_X = 6378137.0;
const WGS84_RADIUS_Y = 6378137.0;
const WGS84_RADIUS_Z = 6356752.3142451793;

function identity(x) {
  return x;
}

new Vector3();
function fromCartographic(cartographic, result = [], map = identity) {
  if ('longitude' in cartographic) {
    result[0] = map(cartographic.longitude);
    result[1] = map(cartographic.latitude);
    result[2] = cartographic.height;
  } else if ('x' in cartographic) {
    result[0] = map(cartographic.x);
    result[1] = map(cartographic.y);
    result[2] = cartographic.z;
  } else {
    result[0] = map(cartographic[0]);
    result[1] = map(cartographic[1]);
    result[2] = cartographic[2];
  }

  return result;
}
function fromCartographicToRadians(cartographic, vector = []) {
  return fromCartographic(cartographic, vector, config._cartographicRadians ? identity : toRadians);
}
function toCartographic(vector, cartographic, map = identity) {
  if ('longitude' in cartographic) {
    cartographic.longitude = map(vector[0]);
    cartographic.latitude = map(vector[1]);
    cartographic.height = vector[2];
  } else if ('x' in cartographic) {
    cartographic.x = map(vector[0]);
    cartographic.y = map(vector[1]);
    cartographic.z = vector[2];
  } else {
    cartographic[0] = map(vector[0]);
    cartographic[1] = map(vector[1]);
    cartographic[2] = vector[2];
  }

  return cartographic;
}
function toCartographicFromRadians(vector, cartographic) {
  return toCartographic(vector, cartographic, config._cartographicRadians ? identity : toDegrees);
}

const scratchVector$1 = new Vector3();
const scaleToGeodeticSurfaceIntersection = new Vector3();
const scaleToGeodeticSurfaceGradient = new Vector3();
function scaleToGeodeticSurface(cartesian, ellipsoid, result = []) {
  const {
    oneOverRadii,
    oneOverRadiiSquared,
    centerToleranceSquared
  } = ellipsoid;
  scratchVector$1.from(cartesian);
  const positionX = scratchVector$1.x;
  const positionY = scratchVector$1.y;
  const positionZ = scratchVector$1.z;
  const oneOverRadiiX = oneOverRadii.x;
  const oneOverRadiiY = oneOverRadii.y;
  const oneOverRadiiZ = oneOverRadii.z;
  const x2 = positionX * positionX * oneOverRadiiX * oneOverRadiiX;
  const y2 = positionY * positionY * oneOverRadiiY * oneOverRadiiY;
  const z2 = positionZ * positionZ * oneOverRadiiZ * oneOverRadiiZ;
  const squaredNorm = x2 + y2 + z2;
  const ratio = Math.sqrt(1.0 / squaredNorm);

  if (!Number.isFinite(ratio)) {
    return undefined;
  }

  const intersection = scaleToGeodeticSurfaceIntersection;
  intersection.copy(cartesian).scale(ratio);

  if (squaredNorm < centerToleranceSquared) {
    return intersection.to(result);
  }

  const oneOverRadiiSquaredX = oneOverRadiiSquared.x;
  const oneOverRadiiSquaredY = oneOverRadiiSquared.y;
  const oneOverRadiiSquaredZ = oneOverRadiiSquared.z;
  const gradient = scaleToGeodeticSurfaceGradient;
  gradient.set(intersection.x * oneOverRadiiSquaredX * 2.0, intersection.y * oneOverRadiiSquaredY * 2.0, intersection.z * oneOverRadiiSquaredZ * 2.0);
  let lambda = (1.0 - ratio) * scratchVector$1.len() / (0.5 * gradient.len());
  let correction = 0.0;
  let xMultiplier;
  let yMultiplier;
  let zMultiplier;
  let func;

  do {
    lambda -= correction;
    xMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredX);
    yMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredY);
    zMultiplier = 1.0 / (1.0 + lambda * oneOverRadiiSquaredZ);
    const xMultiplier2 = xMultiplier * xMultiplier;
    const yMultiplier2 = yMultiplier * yMultiplier;
    const zMultiplier2 = zMultiplier * zMultiplier;
    const xMultiplier3 = xMultiplier2 * xMultiplier;
    const yMultiplier3 = yMultiplier2 * yMultiplier;
    const zMultiplier3 = zMultiplier2 * zMultiplier;
    func = x2 * xMultiplier2 + y2 * yMultiplier2 + z2 * zMultiplier2 - 1.0;
    const denominator = x2 * xMultiplier3 * oneOverRadiiSquaredX + y2 * yMultiplier3 * oneOverRadiiSquaredY + z2 * zMultiplier3 * oneOverRadiiSquaredZ;
    const derivative = -2.0 * denominator;
    correction = func / derivative;
  } while (Math.abs(func) > _MathUtils.EPSILON12);

  return scratchVector$1.scale([xMultiplier, yMultiplier, zMultiplier]).to(result);
}

const EPSILON14 = 1e-14;
const scratchOrigin = new Vector3();
const VECTOR_PRODUCT_LOCAL_FRAME = {
  up: {
    south: 'east',
    north: 'west',
    west: 'south',
    east: 'north'
  },
  down: {
    south: 'west',
    north: 'east',
    west: 'north',
    east: 'south'
  },
  south: {
    up: 'west',
    down: 'east',
    west: 'down',
    east: 'up'
  },
  north: {
    up: 'east',
    down: 'west',
    west: 'up',
    east: 'down'
  },
  west: {
    up: 'north',
    down: 'south',
    north: 'down',
    south: 'up'
  },
  east: {
    up: 'south',
    down: 'north',
    north: 'up',
    south: 'down'
  }
};
const degeneratePositionLocalFrame = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
};
const scratchAxisVectors = {
  east: new Vector3(),
  north: new Vector3(),
  up: new Vector3(),
  west: new Vector3(),
  south: new Vector3(),
  down: new Vector3()
};
const scratchVector1 = new Vector3();
const scratchVector2 = new Vector3();
const scratchVector3 = new Vector3();
function localFrameToFixedFrame(ellipsoid, firstAxis, secondAxis, thirdAxis, cartesianOrigin, result) {
  const thirdAxisInferred = VECTOR_PRODUCT_LOCAL_FRAME[firstAxis] && VECTOR_PRODUCT_LOCAL_FRAME[firstAxis][secondAxis];
  assert$3(thirdAxisInferred && (!thirdAxis || thirdAxis === thirdAxisInferred));
  let firstAxisVector;
  let secondAxisVector;
  let thirdAxisVector;
  const origin = scratchOrigin.copy(cartesianOrigin);
  const atPole = equals(origin.x, 0.0, EPSILON14) && equals(origin.y, 0.0, EPSILON14);

  if (atPole) {
    const sign = Math.sign(origin.z);
    firstAxisVector = scratchVector1.fromArray(degeneratePositionLocalFrame[firstAxis]);

    if (firstAxis !== 'east' && firstAxis !== 'west') {
      firstAxisVector.scale(sign);
    }

    secondAxisVector = scratchVector2.fromArray(degeneratePositionLocalFrame[secondAxis]);

    if (secondAxis !== 'east' && secondAxis !== 'west') {
      secondAxisVector.scale(sign);
    }

    thirdAxisVector = scratchVector3.fromArray(degeneratePositionLocalFrame[thirdAxis]);

    if (thirdAxis !== 'east' && thirdAxis !== 'west') {
      thirdAxisVector.scale(sign);
    }
  } else {
    const {
      up,
      east,
      north
    } = scratchAxisVectors;
    east.set(-origin.y, origin.x, 0.0).normalize();
    ellipsoid.geodeticSurfaceNormal(origin, up);
    north.copy(up).cross(east);
    const {
      down,
      west,
      south
    } = scratchAxisVectors;
    down.copy(up).scale(-1);
    west.copy(east).scale(-1);
    south.copy(north).scale(-1);
    firstAxisVector = scratchAxisVectors[firstAxis];
    secondAxisVector = scratchAxisVectors[secondAxis];
    thirdAxisVector = scratchAxisVectors[thirdAxis];
  }

  result[0] = firstAxisVector.x;
  result[1] = firstAxisVector.y;
  result[2] = firstAxisVector.z;
  result[3] = 0.0;
  result[4] = secondAxisVector.x;
  result[5] = secondAxisVector.y;
  result[6] = secondAxisVector.z;
  result[7] = 0.0;
  result[8] = thirdAxisVector.x;
  result[9] = thirdAxisVector.y;
  result[10] = thirdAxisVector.z;
  result[11] = 0.0;
  result[12] = origin.x;
  result[13] = origin.y;
  result[14] = origin.z;
  result[15] = 1.0;
  return result;
}

const scratchVector = new Vector3();
const scratchNormal$2 = new Vector3();
const scratchK = new Vector3();
const scratchPosition$1 = new Vector3();
const scratchHeight = new Vector3();
const scratchCartesian = new Vector3();
class Ellipsoid {
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    _defineProperty(this, "radii", void 0);

    _defineProperty(this, "radiiSquared", void 0);

    _defineProperty(this, "radiiToTheFourth", void 0);

    _defineProperty(this, "oneOverRadii", void 0);

    _defineProperty(this, "oneOverRadiiSquared", void 0);

    _defineProperty(this, "minimumRadius", void 0);

    _defineProperty(this, "maximumRadius", void 0);

    _defineProperty(this, "centerToleranceSquared", _MathUtils.EPSILON1);

    _defineProperty(this, "squaredXOverSquaredZ", void 0);

    assert$3(x >= 0.0);
    assert$3(y >= 0.0);
    assert$3(z >= 0.0);
    this.radii = new Vector3(x, y, z);
    this.radiiSquared = new Vector3(x * x, y * y, z * z);
    this.radiiToTheFourth = new Vector3(x * x * x * x, y * y * y * y, z * z * z * z);
    this.oneOverRadii = new Vector3(x === 0.0 ? 0.0 : 1.0 / x, y === 0.0 ? 0.0 : 1.0 / y, z === 0.0 ? 0.0 : 1.0 / z);
    this.oneOverRadiiSquared = new Vector3(x === 0.0 ? 0.0 : 1.0 / (x * x), y === 0.0 ? 0.0 : 1.0 / (y * y), z === 0.0 ? 0.0 : 1.0 / (z * z));
    this.minimumRadius = Math.min(x, y, z);
    this.maximumRadius = Math.max(x, y, z);

    if (this.radiiSquared.z !== 0) {
      this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z;
    }

    Object.freeze(this);
  }

  equals(right) {
    return this === right || Boolean(right && this.radii.equals(right.radii));
  }

  toString() {
    return this.radii.toString();
  }

  cartographicToCartesian(cartographic, result = [0, 0, 0]) {
    const normal = scratchNormal$2;
    const k = scratchK;
    const [,, height] = cartographic;
    this.geodeticSurfaceNormalCartographic(cartographic, normal);
    k.copy(this.radiiSquared).scale(normal);
    const gamma = Math.sqrt(normal.dot(k));
    k.scale(1 / gamma);
    normal.scale(height);
    k.add(normal);
    return k.to(result);
  }

  cartesianToCartographic(cartesian, result = [0, 0, 0]) {
    scratchCartesian.from(cartesian);
    const point = this.scaleToGeodeticSurface(scratchCartesian, scratchPosition$1);

    if (!point) {
      return undefined;
    }

    const normal = this.geodeticSurfaceNormal(point, scratchNormal$2);
    const h = scratchHeight;
    h.copy(scratchCartesian).subtract(point);
    const longitude = Math.atan2(normal.y, normal.x);
    const latitude = Math.asin(normal.z);
    const height = Math.sign(dot$2(h, scratchCartesian)) * length$2(h);
    return toCartographicFromRadians([longitude, latitude, height], result);
  }

  eastNorthUpToFixedFrame(origin, result = new Matrix4()) {
    return localFrameToFixedFrame(this, 'east', 'north', 'up', origin, result);
  }

  localFrameToFixedFrame(firstAxis, secondAxis, thirdAxis, origin, result = new Matrix4()) {
    return localFrameToFixedFrame(this, firstAxis, secondAxis, thirdAxis, origin, result);
  }

  geocentricSurfaceNormal(cartesian, result = [0, 0, 0]) {
    return scratchVector.from(cartesian).normalize().to(result);
  }

  geodeticSurfaceNormalCartographic(cartographic, result = [0, 0, 0]) {
    const cartographicVectorRadians = fromCartographicToRadians(cartographic);
    const longitude = cartographicVectorRadians[0];
    const latitude = cartographicVectorRadians[1];
    const cosLatitude = Math.cos(latitude);
    scratchVector.set(cosLatitude * Math.cos(longitude), cosLatitude * Math.sin(longitude), Math.sin(latitude)).normalize();
    return scratchVector.to(result);
  }

  geodeticSurfaceNormal(cartesian, result = [0, 0, 0]) {
    return scratchVector.from(cartesian).scale(this.oneOverRadiiSquared).normalize().to(result);
  }

  scaleToGeodeticSurface(cartesian, result) {
    return scaleToGeodeticSurface(cartesian, this, result);
  }

  scaleToGeocentricSurface(cartesian, result = [0, 0, 0]) {
    scratchPosition$1.from(cartesian);
    const positionX = scratchPosition$1.x;
    const positionY = scratchPosition$1.y;
    const positionZ = scratchPosition$1.z;
    const oneOverRadiiSquared = this.oneOverRadiiSquared;
    const beta = 1.0 / Math.sqrt(positionX * positionX * oneOverRadiiSquared.x + positionY * positionY * oneOverRadiiSquared.y + positionZ * positionZ * oneOverRadiiSquared.z);
    return scratchPosition$1.multiplyScalar(beta).to(result);
  }

  transformPositionToScaledSpace(position, result = [0, 0, 0]) {
    return scratchPosition$1.from(position).scale(this.oneOverRadii).to(result);
  }

  transformPositionFromScaledSpace(position, result = [0, 0, 0]) {
    return scratchPosition$1.from(position).scale(this.radii).to(result);
  }

  getSurfaceNormalIntersectionWithZAxis(position, buffer = 0, result = [0, 0, 0]) {
    assert$3(equals(this.radii.x, this.radii.y, _MathUtils.EPSILON15));
    assert$3(this.radii.z > 0);
    scratchPosition$1.from(position);
    const z = scratchPosition$1.z * (1 - this.squaredXOverSquaredZ);

    if (Math.abs(z) >= this.radii.z - buffer) {
      return undefined;
    }

    return scratchPosition$1.set(0.0, 0.0, z).to(result);
  }

}

_defineProperty(Ellipsoid, "WGS84", new Ellipsoid(WGS84_RADIUS_X, WGS84_RADIUS_Y, WGS84_RADIUS_Z));

const INTERSECTION = {
  OUTSIDE: -1,
  INTERSECTING: 0,
  INSIDE: 1
};

new Vector3();
new Vector3();

new Vector3();
new Vector3();

new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();

const scratchPosition = new Vector3();
const scratchNormal$1 = new Vector3();
class Plane {
  constructor(normal = [0, 0, 1], distance = 0) {
    _defineProperty(this, "normal", void 0);

    _defineProperty(this, "distance", void 0);

    this.normal = new Vector3();
    this.distance = -0;
    this.fromNormalDistance(normal, distance);
  }

  fromNormalDistance(normal, distance) {
    assert$3(Number.isFinite(distance));
    this.normal.from(normal).normalize();
    this.distance = distance;
    return this;
  }

  fromPointNormal(point, normal) {
    point = scratchPosition.from(point);
    this.normal.from(normal).normalize();
    const distance = -this.normal.dot(point);
    this.distance = distance;
    return this;
  }

  fromCoefficients(a, b, c, d) {
    this.normal.set(a, b, c);
    assert$3(equals(this.normal.len(), 1));
    this.distance = d;
    return this;
  }

  clone() {
    return new Plane(this.normal, this.distance);
  }

  equals(right) {
    return equals(this.distance, right.distance) && equals(this.normal, right.normal);
  }

  getPointDistance(point) {
    return this.normal.dot(point) + this.distance;
  }

  transform(matrix4) {
    const normal = scratchNormal$1.copy(this.normal).transformAsVector(matrix4).normalize();
    const point = this.normal.scale(-this.distance).transform(matrix4);
    return this.fromPointNormal(point, normal);
  }

  projectPointOntoPlane(point, result = [0, 0, 0]) {
    point = scratchPosition.from(point);
    const pointDistance = this.getPointDistance(point);
    const scaledNormal = scratchNormal$1.copy(this.normal).scale(pointDistance);
    return point.subtract(scaledNormal).to(result);
  }

}

const faces = [new Vector3([1, 0, 0]), new Vector3([0, 1, 0]), new Vector3([0, 0, 1])];
const scratchPlaneCenter = new Vector3();
const scratchPlaneNormal = new Vector3();
new Plane(new Vector3(1.0, 0.0, 0.0), 0.0);
class CullingVolume {
  constructor(planes = []) {
    _defineProperty(this, "planes", void 0);

    this.planes = planes;
  }

  fromBoundingSphere(boundingSphere) {
    this.planes.length = 2 * faces.length;
    const center = boundingSphere.center;
    const radius = boundingSphere.radius;
    let planeIndex = 0;

    for (const faceNormal of faces) {
      let plane0 = this.planes[planeIndex];
      let plane1 = this.planes[planeIndex + 1];

      if (!plane0) {
        plane0 = this.planes[planeIndex] = new Plane();
      }

      if (!plane1) {
        plane1 = this.planes[planeIndex + 1] = new Plane();
      }

      const plane0Center = scratchPlaneCenter.copy(faceNormal).scale(-radius).add(center);
      -faceNormal.dot(plane0Center);
      plane0.fromPointNormal(plane0Center, faceNormal);
      const plane1Center = scratchPlaneCenter.copy(faceNormal).scale(radius).add(center);
      const negatedFaceNormal = scratchPlaneNormal.copy(faceNormal).negate();
      -negatedFaceNormal.dot(plane1Center);
      plane1.fromPointNormal(plane1Center, negatedFaceNormal);
      planeIndex += 2;
    }

    return this;
  }

  computeVisibility(boundingVolume) {
    let intersect = INTERSECTION.INSIDE;

    for (const plane of this.planes) {
      const result = boundingVolume.intersectPlane(plane);

      switch (result) {
        case INTERSECTION.OUTSIDE:
          return INTERSECTION.OUTSIDE;

        case INTERSECTION.INTERSECTING:
          intersect = INTERSECTION.INTERSECTING;
          break;
      }
    }

    return intersect;
  }

  computeVisibilityWithPlaneMask(boundingVolume, parentPlaneMask) {
    assert$3(Number.isFinite(parentPlaneMask), 'parentPlaneMask is required.');

    if (parentPlaneMask === CullingVolume.MASK_OUTSIDE || parentPlaneMask === CullingVolume.MASK_INSIDE) {
      return parentPlaneMask;
    }

    let mask = CullingVolume.MASK_INSIDE;
    const planes = this.planes;

    for (let k = 0; k < this.planes.length; ++k) {
      const flag = k < 31 ? 1 << k : 0;

      if (k < 31 && (parentPlaneMask & flag) === 0) {
        continue;
      }

      const plane = planes[k];
      const result = boundingVolume.intersectPlane(plane);

      if (result === INTERSECTION.OUTSIDE) {
        return CullingVolume.MASK_OUTSIDE;
      } else if (result === INTERSECTION.INTERSECTING) {
        mask |= flag;
      }
    }

    return mask;
  }

}

_defineProperty(CullingVolume, "MASK_OUTSIDE", 0xffffffff);

_defineProperty(CullingVolume, "MASK_INSIDE", 0x00000000);

_defineProperty(CullingVolume, "MASK_INDETERMINATE", 0x7fffffff);

new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();

new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();

new Matrix3();
new Matrix3();
new Matrix3();
new Matrix3();
new Matrix3();

new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Vector3();
new Matrix3();
({
  diagonal: new Matrix3(),
  unitary: new Matrix3()
});

const TILE_REFINEMENT = {
  ADD: 1,
  REPLACE: 2
};
const TILE_TYPE = {
  EMPTY: 'empty',
  SCENEGRAPH: 'scenegraph',
  POINTCLOUD: 'pointcloud',
  MESH: 'mesh'
};
const TILESET_TYPE = {
  I3S: 'I3S',
  TILES3D: 'TILES3D'
};
const LOD_METRIC_TYPE = {
  GEOMETRIC_ERROR: 'geometricError',
  MAX_SCREEN_THRESHOLD: 'maxScreenThreshold'
};

const VERSION$5 = "3.2.13" ;

const TILE3D_TYPE = {
  COMPOSITE: 'cmpt',
  POINT_CLOUD: 'pnts',
  BATCHED_3D_MODEL: 'b3dm',
  INSTANCED_3D_MODEL: 'i3dm',
  GEOMETRY: 'geom',
  VECTOR: 'vect',
  GLTF: 'glTF'
};

function getStringFromArrayBuffer(arrayBuffer, byteOffset, byteLength) {
  assert$7(arrayBuffer instanceof ArrayBuffer);
  const textDecoder = new TextDecoder('utf8');
  const typedArray = new Uint8Array(arrayBuffer, byteOffset, byteLength);
  const string = textDecoder.decode(typedArray);
  return string;
}
function getMagicString$1(arrayBuffer, byteOffset = 0) {
  const dataView = new DataView(arrayBuffer);
  return "".concat(String.fromCharCode(dataView.getUint8(byteOffset + 0))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 1))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 2))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 3)));
}

const VERSION$4 = "3.2.13" ;

const DEFAULT_DRACO_OPTIONS = {
  draco: {
    decoderType: typeof WebAssembly === 'object' ? 'wasm' : 'js',
    libraryPath: 'libs/',
    extraAttributes: {},
    attributeNameEntry: undefined
  }
};
const DracoLoader$1 = {
  name: 'Draco',
  id: 'draco',
  module: 'draco',
  shapes: ['mesh'],
  version: VERSION$4,
  worker: true,
  extensions: ['drc'],
  mimeTypes: ['application/octet-stream'],
  binary: true,
  tests: ['DRACO'],
  options: DEFAULT_DRACO_OPTIONS
};

function getDracoSchema(attributes, loaderData, indices) {
  const metadataMap = makeMetadata(loaderData.metadata);
  const fields = [];
  const namedLoaderDataAttributes = transformAttributesLoaderData(loaderData.attributes);

  for (const attributeName in attributes) {
    const attribute = attributes[attributeName];
    const field = getArrowFieldFromAttribute(attributeName, attribute, namedLoaderDataAttributes[attributeName]);
    fields.push(field);
  }

  if (indices) {
    const indicesField = getArrowFieldFromAttribute('indices', indices);
    fields.push(indicesField);
  }

  return new Schema(fields, metadataMap);
}

function transformAttributesLoaderData(loaderData) {
  const result = {};

  for (const key in loaderData) {
    const dracoAttribute = loaderData[key];
    result[dracoAttribute.name || 'undefined'] = dracoAttribute;
  }

  return result;
}

function getArrowFieldFromAttribute(attributeName, attribute, loaderData) {
  const metadataMap = loaderData ? makeMetadata(loaderData.metadata) : undefined;
  const field = deduceMeshField(attributeName, attribute, metadataMap);
  return field;
}

function makeMetadata(metadata) {
  const metadataMap = new Map();

  for (const key in metadata) {
    metadataMap.set("".concat(key, ".string"), JSON.stringify(metadata[key]));
  }

  return metadataMap;
}

const DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP = {
  POSITION: 'POSITION',
  NORMAL: 'NORMAL',
  COLOR: 'COLOR_0',
  TEX_COORD: 'TEXCOORD_0'
};
const DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
};
const INDEX_ITEM_SIZE = 4;
class DracoParser {
  constructor(draco) {
    _defineProperty(this, "draco", void 0);

    _defineProperty(this, "decoder", void 0);

    _defineProperty(this, "metadataQuerier", void 0);

    this.draco = draco;
    this.decoder = new this.draco.Decoder();
    this.metadataQuerier = new this.draco.MetadataQuerier();
  }

  destroy() {
    this.draco.destroy(this.decoder);
    this.draco.destroy(this.metadataQuerier);
  }

  parseSync(arrayBuffer, options = {}) {
    const buffer = new this.draco.DecoderBuffer();
    buffer.Init(new Int8Array(arrayBuffer), arrayBuffer.byteLength);

    this._disableAttributeTransforms(options);

    const geometry_type = this.decoder.GetEncodedGeometryType(buffer);
    const dracoGeometry = geometry_type === this.draco.TRIANGULAR_MESH ? new this.draco.Mesh() : new this.draco.PointCloud();

    try {
      let dracoStatus;

      switch (geometry_type) {
        case this.draco.TRIANGULAR_MESH:
          dracoStatus = this.decoder.DecodeBufferToMesh(buffer, dracoGeometry);
          break;

        case this.draco.POINT_CLOUD:
          dracoStatus = this.decoder.DecodeBufferToPointCloud(buffer, dracoGeometry);
          break;

        default:
          throw new Error('DRACO: Unknown geometry type.');
      }

      if (!dracoStatus.ok() || !dracoGeometry.ptr) {
        const message = "DRACO decompression failed: ".concat(dracoStatus.error_msg());
        throw new Error(message);
      }

      const loaderData = this._getDracoLoaderData(dracoGeometry, geometry_type, options);

      const geometry = this._getMeshData(dracoGeometry, loaderData, options);

      const boundingBox = getMeshBoundingBox(geometry.attributes);
      const schema = getDracoSchema(geometry.attributes, loaderData, geometry.indices);
      const data = {
        loader: 'draco',
        loaderData,
        header: {
          vertexCount: dracoGeometry.num_points(),
          boundingBox
        },
        ...geometry,
        schema
      };
      return data;
    } finally {
      this.draco.destroy(buffer);

      if (dracoGeometry) {
        this.draco.destroy(dracoGeometry);
      }
    }
  }

  _getDracoLoaderData(dracoGeometry, geometry_type, options) {
    const metadata = this._getTopLevelMetadata(dracoGeometry);

    const attributes = this._getDracoAttributes(dracoGeometry, options);

    return {
      geometry_type,
      num_attributes: dracoGeometry.num_attributes(),
      num_points: dracoGeometry.num_points(),
      num_faces: dracoGeometry instanceof this.draco.Mesh ? dracoGeometry.num_faces() : 0,
      metadata,
      attributes
    };
  }

  _getDracoAttributes(dracoGeometry, options) {
    const dracoAttributes = {};

    for (let attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
      const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attributeId);

      const metadata = this._getAttributeMetadata(dracoGeometry, attributeId);

      dracoAttributes[dracoAttribute.unique_id()] = {
        unique_id: dracoAttribute.unique_id(),
        attribute_type: dracoAttribute.attribute_type(),
        data_type: dracoAttribute.data_type(),
        num_components: dracoAttribute.num_components(),
        byte_offset: dracoAttribute.byte_offset(),
        byte_stride: dracoAttribute.byte_stride(),
        normalized: dracoAttribute.normalized(),
        attribute_index: attributeId,
        metadata
      };

      const quantization = this._getQuantizationTransform(dracoAttribute, options);

      if (quantization) {
        dracoAttributes[dracoAttribute.unique_id()].quantization_transform = quantization;
      }

      const octahedron = this._getOctahedronTransform(dracoAttribute, options);

      if (octahedron) {
        dracoAttributes[dracoAttribute.unique_id()].octahedron_transform = octahedron;
      }
    }

    return dracoAttributes;
  }

  _getMeshData(dracoGeometry, loaderData, options) {
    const attributes = this._getMeshAttributes(loaderData, dracoGeometry, options);

    const positionAttribute = attributes.POSITION;

    if (!positionAttribute) {
      throw new Error('DRACO: No position attribute found.');
    }

    if (dracoGeometry instanceof this.draco.Mesh) {
      switch (options.topology) {
        case 'triangle-strip':
          return {
            topology: 'triangle-strip',
            mode: 4,
            attributes,
            indices: {
              value: this._getTriangleStripIndices(dracoGeometry),
              size: 1
            }
          };

        case 'triangle-list':
        default:
          return {
            topology: 'triangle-list',
            mode: 5,
            attributes,
            indices: {
              value: this._getTriangleListIndices(dracoGeometry),
              size: 1
            }
          };
      }
    }

    return {
      topology: 'point-list',
      mode: 0,
      attributes
    };
  }

  _getMeshAttributes(loaderData, dracoGeometry, options) {
    const attributes = {};

    for (const loaderAttribute of Object.values(loaderData.attributes)) {
      const attributeName = this._deduceAttributeName(loaderAttribute, options);

      loaderAttribute.name = attributeName;

      const {
        value,
        size
      } = this._getAttributeValues(dracoGeometry, loaderAttribute);

      attributes[attributeName] = {
        value,
        size,
        byteOffset: loaderAttribute.byte_offset,
        byteStride: loaderAttribute.byte_stride,
        normalized: loaderAttribute.normalized
      };
    }

    return attributes;
  }

  _getTriangleListIndices(dracoGeometry) {
    const numFaces = dracoGeometry.num_faces();
    const numIndices = numFaces * 3;
    const byteLength = numIndices * INDEX_ITEM_SIZE;

    const ptr = this.draco._malloc(byteLength);

    try {
      this.decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
      return new Uint32Array(this.draco.HEAPF32.buffer, ptr, numIndices).slice();
    } finally {
      this.draco._free(ptr);
    }
  }

  _getTriangleStripIndices(dracoGeometry) {
    const dracoArray = new this.draco.DracoInt32Array();

    try {
      this.decoder.GetTriangleStripsFromMesh(dracoGeometry, dracoArray);
      return getUint32Array(dracoArray);
    } finally {
      this.draco.destroy(dracoArray);
    }
  }

  _getAttributeValues(dracoGeometry, attribute) {
    const TypedArrayCtor = DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[attribute.data_type];
    const numComponents = attribute.num_components;
    const numPoints = dracoGeometry.num_points();
    const numValues = numPoints * numComponents;
    const byteLength = numValues * TypedArrayCtor.BYTES_PER_ELEMENT;
    const dataType = getDracoDataType(this.draco, TypedArrayCtor);
    let value;

    const ptr = this.draco._malloc(byteLength);

    try {
      const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attribute.attribute_index);
      this.decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, dracoAttribute, dataType, byteLength, ptr);
      value = new TypedArrayCtor(this.draco.HEAPF32.buffer, ptr, numValues).slice();
    } finally {
      this.draco._free(ptr);
    }

    return {
      value,
      size: numComponents
    };
  }

  _deduceAttributeName(attribute, options) {
    const uniqueId = attribute.unique_id;

    for (const [attributeName, attributeUniqueId] of Object.entries(options.extraAttributes || {})) {
      if (attributeUniqueId === uniqueId) {
        return attributeName;
      }
    }

    const thisAttributeType = attribute.attribute_type;

    for (const dracoAttributeConstant in DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP) {
      const attributeType = this.draco[dracoAttributeConstant];

      if (attributeType === thisAttributeType) {
        return DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP[dracoAttributeConstant];
      }
    }

    const entryName = options.attributeNameEntry || 'name';

    if (attribute.metadata[entryName]) {
      return attribute.metadata[entryName].string;
    }

    return "CUSTOM_ATTRIBUTE_".concat(uniqueId);
  }

  _getTopLevelMetadata(dracoGeometry) {
    const dracoMetadata = this.decoder.GetMetadata(dracoGeometry);
    return this._getDracoMetadata(dracoMetadata);
  }

  _getAttributeMetadata(dracoGeometry, attributeId) {
    const dracoMetadata = this.decoder.GetAttributeMetadata(dracoGeometry, attributeId);
    return this._getDracoMetadata(dracoMetadata);
  }

  _getDracoMetadata(dracoMetadata) {
    if (!dracoMetadata || !dracoMetadata.ptr) {
      return {};
    }

    const result = {};
    const numEntries = this.metadataQuerier.NumEntries(dracoMetadata);

    for (let entryIndex = 0; entryIndex < numEntries; entryIndex++) {
      const entryName = this.metadataQuerier.GetEntryName(dracoMetadata, entryIndex);
      result[entryName] = this._getDracoMetadataField(dracoMetadata, entryName);
    }

    return result;
  }

  _getDracoMetadataField(dracoMetadata, entryName) {
    const dracoArray = new this.draco.DracoInt32Array();

    try {
      this.metadataQuerier.GetIntEntryArray(dracoMetadata, entryName, dracoArray);
      const intArray = getInt32Array(dracoArray);
      return {
        int: this.metadataQuerier.GetIntEntry(dracoMetadata, entryName),
        string: this.metadataQuerier.GetStringEntry(dracoMetadata, entryName),
        double: this.metadataQuerier.GetDoubleEntry(dracoMetadata, entryName),
        intArray
      };
    } finally {
      this.draco.destroy(dracoArray);
    }
  }

  _disableAttributeTransforms(options) {
    const {
      quantizedAttributes = [],
      octahedronAttributes = []
    } = options;
    const skipAttributes = [...quantizedAttributes, ...octahedronAttributes];

    for (const dracoAttributeName of skipAttributes) {
      this.decoder.SkipAttributeTransform(this.draco[dracoAttributeName]);
    }
  }

  _getQuantizationTransform(dracoAttribute, options) {
    const {
      quantizedAttributes = []
    } = options;
    const attribute_type = dracoAttribute.attribute_type();
    const skip = quantizedAttributes.map(type => this.decoder[type]).includes(attribute_type);

    if (skip) {
      const transform = new this.draco.AttributeQuantizationTransform();

      try {
        if (transform.InitFromAttribute(dracoAttribute)) {
          return {
            quantization_bits: transform.quantization_bits(),
            range: transform.range(),
            min_values: new Float32Array([1, 2, 3]).map(i => transform.min_value(i))
          };
        }
      } finally {
        this.draco.destroy(transform);
      }
    }

    return null;
  }

  _getOctahedronTransform(dracoAttribute, options) {
    const {
      octahedronAttributes = []
    } = options;
    const attribute_type = dracoAttribute.attribute_type();
    const octahedron = octahedronAttributes.map(type => this.decoder[type]).includes(attribute_type);

    if (octahedron) {
      const transform = new this.draco.AttributeQuantizationTransform();

      try {
        if (transform.InitFromAttribute(dracoAttribute)) {
          return {
            quantization_bits: transform.quantization_bits()
          };
        }
      } finally {
        this.draco.destroy(transform);
      }
    }

    return null;
  }

}

function getDracoDataType(draco, attributeType) {
  switch (attributeType) {
    case Float32Array:
      return draco.DT_FLOAT32;

    case Int8Array:
      return draco.DT_INT8;

    case Int16Array:
      return draco.DT_INT16;

    case Int32Array:
      return draco.DT_INT32;

    case Uint8Array:
      return draco.DT_UINT8;

    case Uint16Array:
      return draco.DT_UINT16;

    case Uint32Array:
      return draco.DT_UINT32;

    default:
      return draco.DT_INVALID;
  }
}

function getInt32Array(dracoArray) {
  const numValues = dracoArray.size();
  const intArray = new Int32Array(numValues);

  for (let i = 0; i < numValues; i++) {
    intArray[i] = dracoArray.GetValue(i);
  }

  return intArray;
}

function getUint32Array(dracoArray) {
  const numValues = dracoArray.size();
  const intArray = new Int32Array(numValues);

  for (let i = 0; i < numValues; i++) {
    intArray[i] = dracoArray.GetValue(i);
  }

  return intArray;
}

const DRACO_VERSION = '1.4.1';
const DRACO_JS_DECODER_URL = "https://www.gstatic.com/draco/versioned/decoders/".concat(DRACO_VERSION, "/draco_decoder.js");
const DRACO_WASM_WRAPPER_URL = "https://www.gstatic.com/draco/versioned/decoders/".concat(DRACO_VERSION, "/draco_wasm_wrapper.js");
const DRACO_WASM_DECODER_URL = "https://www.gstatic.com/draco/versioned/decoders/".concat(DRACO_VERSION, "/draco_decoder.wasm");
let loadDecoderPromise;
async function loadDracoDecoderModule(options) {
  const modules = options.modules || {};

  if (modules.draco3d) {
    loadDecoderPromise = loadDecoderPromise || modules.draco3d.createDecoderModule({}).then(draco => {
      return {
        draco
      };
    });
  } else {
    loadDecoderPromise = loadDecoderPromise || loadDracoDecoder(options);
  }

  return await loadDecoderPromise;
}

async function loadDracoDecoder(options) {
  let DracoDecoderModule;
  let wasmBinary;

  switch (options.draco && options.draco.decoderType) {
    case 'js':
      DracoDecoderModule = await loadLibrary(DRACO_JS_DECODER_URL, 'draco', options);
      break;

    case 'wasm':
    default:
      [DracoDecoderModule, wasmBinary] = await Promise.all([await loadLibrary(DRACO_WASM_WRAPPER_URL, 'draco', options), await loadLibrary(DRACO_WASM_DECODER_URL, 'draco', options)]);
  }

  DracoDecoderModule = DracoDecoderModule || globalThis.DracoDecoderModule;
  return await initializeDracoDecoder(DracoDecoderModule, wasmBinary);
}

function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
  const options = {};

  if (wasmBinary) {
    options.wasmBinary = wasmBinary;
  }

  return new Promise(resolve => {
    DracoDecoderModule({ ...options,
      onModuleLoaded: draco => resolve({
        draco
      })
    });
  });
}

({
  id: isBrowser$1 ? 'draco-writer' : 'draco-writer-nodejs',
  name: 'Draco compressed geometry writer',
  module: 'draco',
  version: VERSION$4,
  worker: true,
  options: {
    draco: {},
    source: null
  }
});
const DracoLoader = { ...DracoLoader$1,
  parse: parse$2
};

async function parse$2(arrayBuffer, options) {
  const {
    draco
  } = await loadDracoDecoderModule(options);
  const dracoParser = new DracoParser(draco);

  try {
    return dracoParser.parseSync(arrayBuffer, options === null || options === void 0 ? void 0 : options.draco);
  } finally {
    dracoParser.destroy();
  }
}

const GL_PRIMITIVE_MODE = {
  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006
};
const GL_TYPE = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DOUBLE: 5130
};
const GL$1 = { ...GL_PRIMITIVE_MODE,
  ...GL_TYPE
};

const GL_TYPE_TO_ARRAY_TYPE = {
  [GL_TYPE.DOUBLE]: Float64Array,
  [GL_TYPE.FLOAT]: Float32Array,
  [GL_TYPE.UNSIGNED_SHORT]: Uint16Array,
  [GL_TYPE.UNSIGNED_INT]: Uint32Array,
  [GL_TYPE.UNSIGNED_BYTE]: Uint8Array,
  [GL_TYPE.BYTE]: Int8Array,
  [GL_TYPE.SHORT]: Int16Array,
  [GL_TYPE.INT]: Int32Array
};
const NAME_TO_GL_TYPE = {
  DOUBLE: GL_TYPE.DOUBLE,
  FLOAT: GL_TYPE.FLOAT,
  UNSIGNED_SHORT: GL_TYPE.UNSIGNED_SHORT,
  UNSIGNED_INT: GL_TYPE.UNSIGNED_INT,
  UNSIGNED_BYTE: GL_TYPE.UNSIGNED_BYTE,
  BYTE: GL_TYPE.BYTE,
  SHORT: GL_TYPE.SHORT,
  INT: GL_TYPE.INT
};
const ERR_TYPE_CONVERSION = 'Failed to convert GL type';
class GLType {
  static fromTypedArray(arrayOrType) {
    arrayOrType = ArrayBuffer.isView(arrayOrType) ? arrayOrType.constructor : arrayOrType;

    for (const glType in GL_TYPE_TO_ARRAY_TYPE) {
      const ArrayType = GL_TYPE_TO_ARRAY_TYPE[glType];

      if (ArrayType === arrayOrType) {
        return glType;
      }
    }

    throw new Error(ERR_TYPE_CONVERSION);
  }

  static fromName(name) {
    const glType = NAME_TO_GL_TYPE[name];

    if (!glType) {
      throw new Error(ERR_TYPE_CONVERSION);
    }

    return glType;
  }

  static getArrayType(glType) {
    switch (glType) {
      case GL_TYPE.UNSIGNED_SHORT_5_6_5:
      case GL_TYPE.UNSIGNED_SHORT_4_4_4_4:
      case GL_TYPE.UNSIGNED_SHORT_5_5_5_1:
        return Uint16Array;

      default:
        const ArrayType = GL_TYPE_TO_ARRAY_TYPE[glType];

        if (!ArrayType) {
          throw new Error(ERR_TYPE_CONVERSION);
        }

        return ArrayType;
    }
  }

  static getByteSize(glType) {
    const ArrayType = GLType.getArrayType(glType);
    return ArrayType.BYTES_PER_ELEMENT;
  }

  static validate(glType) {
    return Boolean(GLType.getArrayType(glType));
  }

  static createTypedArray(glType, buffer, byteOffset = 0, length) {
    if (length === undefined) {
      length = (buffer.byteLength - byteOffset) / GLType.getByteSize(glType);
    }

    const ArrayType = GLType.getArrayType(glType);
    return new ArrayType(buffer, byteOffset, length);
  }

}

function assert$2(condition, message) {
  if (!condition) {
    throw new Error("math.gl assertion failed. ".concat(message));
  }
}

function decodeRGB565(rgb565, target = [0, 0, 0]) {
  const r5 = rgb565 >> 11 & 31;
  const g6 = rgb565 >> 5 & 63;
  const b5 = rgb565 & 31;
  target[0] = r5 << 3;
  target[1] = g6 << 2;
  target[2] = b5 << 3;
  return target;
}

new Vector2();
new Vector3();
new Vector2();
new Vector2();

function fromSNorm(value, rangeMaximum = 255) {
  return clamp(value, 0.0, rangeMaximum) / rangeMaximum * 2.0 - 1.0;
}

function signNotZero(value) {
  return value < 0.0 ? -1.0 : 1.0;
}
function octDecodeInRange(x, y, rangeMax, result) {
  assert$2(result);

  if (x < 0 || x > rangeMax || y < 0 || y > rangeMax) {
    throw new Error("x and y must be unsigned normalized integers between 0 and ".concat(rangeMax));
  }

  result.x = fromSNorm(x, rangeMax);
  result.y = fromSNorm(y, rangeMax);
  result.z = 1.0 - (Math.abs(result.x) + Math.abs(result.y));

  if (result.z < 0.0) {
    const oldVX = result.x;
    result.x = (1.0 - Math.abs(result.y)) * signNotZero(oldVX);
    result.y = (1.0 - Math.abs(oldVX)) * signNotZero(result.y);
  }

  return result.normalize();
}
function octDecode(x, y, result) {
  return octDecodeInRange(x, y, 255, result);
}

class Tile3DFeatureTable {
  constructor(featureTableJson, featureTableBinary) {
    _defineProperty(this, "json", void 0);

    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "featuresLength", 0);

    _defineProperty(this, "_cachedTypedArrays", {});

    this.json = featureTableJson;
    this.buffer = featureTableBinary;
  }

  getExtension(extensionName) {
    return this.json.extensions && this.json.extensions[extensionName];
  }

  hasProperty(propertyName) {
    return Boolean(this.json[propertyName]);
  }

  getGlobalProperty(propertyName, componentType = GL$1.UNSIGNED_INT, componentLength = 1) {
    const jsonValue = this.json[propertyName];

    if (jsonValue && Number.isFinite(jsonValue.byteOffset)) {
      return this._getTypedArrayFromBinary(propertyName, componentType, componentLength, 1, jsonValue.byteOffset);
    }

    return jsonValue;
  }

  getPropertyArray(propertyName, componentType, componentLength) {
    const jsonValue = this.json[propertyName];

    if (jsonValue && Number.isFinite(jsonValue.byteOffset)) {
      if ('componentType' in jsonValue) {
        componentType = GLType.fromName(jsonValue.componentType);
      }

      return this._getTypedArrayFromBinary(propertyName, componentType, componentLength, this.featuresLength, jsonValue.byteOffset);
    }

    return this._getTypedArrayFromArray(propertyName, componentType, jsonValue);
  }

  getProperty(propertyName, componentType, componentLength, featureId, result) {
    const jsonValue = this.json[propertyName];

    if (!jsonValue) {
      return jsonValue;
    }

    const typedArray = this.getPropertyArray(propertyName, componentType, componentLength);

    if (componentLength === 1) {
      return typedArray[featureId];
    }

    for (let i = 0; i < componentLength; ++i) {
      result[i] = typedArray[componentLength * featureId + i];
    }

    return result;
  }

  _getTypedArrayFromBinary(propertyName, componentType, componentLength, count, byteOffset) {
    const cachedTypedArrays = this._cachedTypedArrays;
    let typedArray = cachedTypedArrays[propertyName];

    if (!typedArray) {
      typedArray = GLType.createTypedArray(componentType, this.buffer.buffer, this.buffer.byteOffset + byteOffset, count * componentLength);
      cachedTypedArrays[propertyName] = typedArray;
    }

    return typedArray;
  }

  _getTypedArrayFromArray(propertyName, componentType, array) {
    const cachedTypedArrays = this._cachedTypedArrays;
    let typedArray = cachedTypedArrays[propertyName];

    if (!typedArray) {
      typedArray = GLType.createTypedArray(componentType, array);
      cachedTypedArrays[propertyName] = typedArray;
    }

    return typedArray;
  }

}

const COMPONENTS_PER_ATTRIBUTE = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const UNPACKER = {
  SCALAR: (values, i) => values[i],
  VEC2: (values, i) => [values[2 * i + 0], values[2 * i + 1]],
  VEC3: (values, i) => [values[3 * i + 0], values[3 * i + 1], values[3 * i + 2]],
  VEC4: (values, i) => [values[4 * i + 0], values[4 * i + 1], values[4 * i + 2], values[4 * i + 3]],
  MAT2: (values, i) => [values[4 * i + 0], values[4 * i + 1], values[4 * i + 2], values[4 * i + 3]],
  MAT3: (values, i) => [values[9 * i + 0], values[9 * i + 1], values[9 * i + 2], values[9 * i + 3], values[9 * i + 4], values[9 * i + 5], values[9 * i + 6], values[9 * i + 7], values[9 * i + 8]],
  MAT4: (values, i) => [values[16 * i + 0], values[16 * i + 1], values[16 * i + 2], values[16 * i + 3], values[16 * i + 4], values[16 * i + 5], values[16 * i + 6], values[16 * i + 7], values[16 * i + 8], values[16 * i + 9], values[16 * i + 10], values[16 * i + 11], values[16 * i + 12], values[16 * i + 13], values[16 * i + 14], values[16 * i + 15]]
};
const PACKER = {
  SCALAR: (x, values, i) => {
    values[i] = x;
  },
  VEC2: (x, values, i) => {
    values[2 * i + 0] = x[0];
    values[2 * i + 1] = x[1];
  },
  VEC3: (x, values, i) => {
    values[3 * i + 0] = x[0];
    values[3 * i + 1] = x[1];
    values[3 * i + 2] = x[2];
  },
  VEC4: (x, values, i) => {
    values[4 * i + 0] = x[0];
    values[4 * i + 1] = x[1];
    values[4 * i + 2] = x[2];
    values[4 * i + 3] = x[3];
  },
  MAT2: (x, values, i) => {
    values[4 * i + 0] = x[0];
    values[4 * i + 1] = x[1];
    values[4 * i + 2] = x[2];
    values[4 * i + 3] = x[3];
  },
  MAT3: (x, values, i) => {
    values[9 * i + 0] = x[0];
    values[9 * i + 1] = x[1];
    values[9 * i + 2] = x[2];
    values[9 * i + 3] = x[3];
    values[9 * i + 4] = x[4];
    values[9 * i + 5] = x[5];
    values[9 * i + 6] = x[6];
    values[9 * i + 7] = x[7];
    values[9 * i + 8] = x[8];
    values[9 * i + 9] = x[9];
  },
  MAT4: (x, values, i) => {
    values[16 * i + 0] = x[0];
    values[16 * i + 1] = x[1];
    values[16 * i + 2] = x[2];
    values[16 * i + 3] = x[3];
    values[16 * i + 4] = x[4];
    values[16 * i + 5] = x[5];
    values[16 * i + 6] = x[6];
    values[16 * i + 7] = x[7];
    values[16 * i + 8] = x[8];
    values[16 * i + 9] = x[9];
    values[16 * i + 10] = x[10];
    values[16 * i + 11] = x[11];
    values[16 * i + 12] = x[12];
    values[16 * i + 13] = x[13];
    values[16 * i + 14] = x[14];
    values[16 * i + 15] = x[15];
  }
};
function createTypedArrayFromAccessor(tile3DAccessor, buffer, byteOffset, length) {
  const {
    componentType
  } = tile3DAccessor;
  assert$7(tile3DAccessor.componentType);
  const type = typeof componentType === 'string' ? GLType.fromName(componentType) : componentType;
  const size = COMPONENTS_PER_ATTRIBUTE[tile3DAccessor.type];
  const unpacker = UNPACKER[tile3DAccessor.type];
  const packer = PACKER[tile3DAccessor.type];
  byteOffset += tile3DAccessor.byteOffset;
  const values = GLType.createTypedArray(type, buffer, byteOffset, size * length);
  return {
    values,
    type,
    size,
    unpacker,
    packer
  };
}

const defined$1 = x => x !== undefined;

function initializeHierarchy(batchTable, jsonHeader, binaryBody) {
  if (!jsonHeader) {
    return null;
  }

  let hierarchy = batchTable.getExtension('3DTILES_batch_table_hierarchy');
  const legacyHierarchy = jsonHeader.HIERARCHY;

  if (legacyHierarchy) {
    console.warn('3D Tile Parser: HIERARCHY is deprecated. Use 3DTILES_batch_table_hierarchy.');
    jsonHeader.extensions = jsonHeader.extensions || {};
    jsonHeader.extensions['3DTILES_batch_table_hierarchy'] = legacyHierarchy;
    hierarchy = legacyHierarchy;
  }

  if (!hierarchy) {
    return null;
  }

  return initializeHierarchyValues(hierarchy, binaryBody);
}

function initializeHierarchyValues(hierarchyJson, binaryBody) {
  let i;
  let classId;
  let binaryAccessor;
  const instancesLength = hierarchyJson.instancesLength;
  const classes = hierarchyJson.classes;
  let classIds = hierarchyJson.classIds;
  let parentCounts = hierarchyJson.parentCounts;
  let parentIds = hierarchyJson.parentIds;
  let parentIdsLength = instancesLength;

  if (defined$1(classIds.byteOffset)) {
    classIds.componentType = defaultValue(classIds.componentType, GL.UNSIGNED_SHORT);
    classIds.type = AttributeType.SCALAR;
    binaryAccessor = getBinaryAccessor(classIds);
    classIds = binaryAccessor.createArrayBufferView(binaryBody.buffer, binaryBody.byteOffset + classIds.byteOffset, instancesLength);
  }

  let parentIndexes;

  if (defined$1(parentCounts)) {
    if (defined$1(parentCounts.byteOffset)) {
      parentCounts.componentType = defaultValue(parentCounts.componentType, GL.UNSIGNED_SHORT);
      parentCounts.type = AttributeType.SCALAR;
      binaryAccessor = getBinaryAccessor(parentCounts);
      parentCounts = binaryAccessor.createArrayBufferView(binaryBody.buffer, binaryBody.byteOffset + parentCounts.byteOffset, instancesLength);
    }

    parentIndexes = new Uint16Array(instancesLength);
    parentIdsLength = 0;

    for (i = 0; i < instancesLength; ++i) {
      parentIndexes[i] = parentIdsLength;
      parentIdsLength += parentCounts[i];
    }
  }

  if (defined$1(parentIds) && defined$1(parentIds.byteOffset)) {
    parentIds.componentType = defaultValue(parentIds.componentType, GL.UNSIGNED_SHORT);
    parentIds.type = AttributeType.SCALAR;
    binaryAccessor = getBinaryAccessor(parentIds);
    parentIds = binaryAccessor.createArrayBufferView(binaryBody.buffer, binaryBody.byteOffset + parentIds.byteOffset, parentIdsLength);
  }

  const classesLength = classes.length;

  for (i = 0; i < classesLength; ++i) {
    const classInstancesLength = classes[i].length;
    const properties = classes[i].instances;
    const binaryProperties = getBinaryProperties(classInstancesLength, properties, binaryBody);
    classes[i].instances = combine(binaryProperties, properties);
  }

  const classCounts = new Array(classesLength).fill(0);
  const classIndexes = new Uint16Array(instancesLength);

  for (i = 0; i < instancesLength; ++i) {
    classId = classIds[i];
    classIndexes[i] = classCounts[classId];
    ++classCounts[classId];
  }

  const hierarchy = {
    classes,
    classIds,
    classIndexes,
    parentCounts,
    parentIndexes,
    parentIds
  };
  validateHierarchy(hierarchy);
  return hierarchy;
}

function traverseHierarchy(hierarchy, instanceIndex, endConditionCallback) {
  if (!hierarchy) {
    return;
  }

  const parentCounts = hierarchy.parentCounts;
  const parentIds = hierarchy.parentIds;

  if (parentIds) {
    return endConditionCallback(hierarchy, instanceIndex);
  }

  if (parentCounts > 0) {
    return traverseHierarchyMultipleParents(hierarchy, instanceIndex, endConditionCallback);
  }

  return traverseHierarchySingleParent(hierarchy, instanceIndex, endConditionCallback);
}

function traverseHierarchyMultipleParents(hierarchy, instanceIndex, endConditionCallback) {
  const classIds = hierarchy.classIds;
  const parentCounts = hierarchy.parentCounts;
  const parentIds = hierarchy.parentIds;
  const parentIndexes = hierarchy.parentIndexes;
  const instancesLength = classIds.length;
  const visited = scratchVisited;
  visited.length = Math.max(visited.length, instancesLength);
  const visitedMarker = ++marker;
  const stack = scratchStack;
  stack.length = 0;
  stack.push(instanceIndex);

  while (stack.length > 0) {
    instanceIndex = stack.pop();

    if (visited[instanceIndex] === visitedMarker) {
      continue;
    }

    visited[instanceIndex] = visitedMarker;
    const result = endConditionCallback(hierarchy, instanceIndex);

    if (defined$1(result)) {
      return result;
    }

    const parentCount = parentCounts[instanceIndex];
    const parentIndex = parentIndexes[instanceIndex];

    for (let i = 0; i < parentCount; ++i) {
      const parentId = parentIds[parentIndex + i];

      if (parentId !== instanceIndex) {
        stack.push(parentId);
      }
    }
  }

  return null;
}

function traverseHierarchySingleParent(hierarchy, instanceIndex, endConditionCallback) {
  let hasParent = true;

  while (hasParent) {
    const result = endConditionCallback(hierarchy, instanceIndex);

    if (defined$1(result)) {
      return result;
    }

    const parentId = hierarchy.parentIds[instanceIndex];
    hasParent = parentId !== instanceIndex;
    instanceIndex = parentId;
  }

  throw new Error('traverseHierarchySingleParent');
}

function validateHierarchy(hierarchy) {
  const classIds = hierarchy.classIds;
  const instancesLength = classIds.length;

  for (let i = 0; i < instancesLength; ++i) {
    validateInstance(hierarchy, i, stack);
  }
}

function validateInstance(hierarchy, instanceIndex, stack) {
  const parentCounts = hierarchy.parentCounts;
  const parentIds = hierarchy.parentIds;
  const parentIndexes = hierarchy.parentIndexes;
  const classIds = hierarchy.classIds;
  const instancesLength = classIds.length;

  if (!defined$1(parentIds)) {
    return;
  }

  assert(instanceIndex < instancesLength, "Parent index ".concat(instanceIndex, " exceeds the total number of instances: ").concat(instancesLength));
  assert(stack.indexOf(instanceIndex) === -1, 'Circular dependency detected in the batch table hierarchy.');
  stack.push(instanceIndex);
  const parentCount = defined$1(parentCounts) ? parentCounts[instanceIndex] : 1;
  const parentIndex = defined$1(parentCounts) ? parentIndexes[instanceIndex] : instanceIndex;

  for (let i = 0; i < parentCount; ++i) {
    const parentId = parentIds[parentIndex + i];

    if (parentId !== instanceIndex) {
      validateInstance(hierarchy, parentId, stack);
    }
  }

  stack.pop(instanceIndex);
}

function defined(x) {
  return x !== undefined && x !== null;
}

const clone = (x, y) => x;

const IGNORED_PROPERTY_FIELDS = {
  HIERARCHY: true,
  extensions: true,
  extras: true
};
class Tile3DBatchTableParser {
  constructor(json, binary, featureCount, options = {}) {
    var _this$json;

    _defineProperty(this, "json", void 0);

    _defineProperty(this, "binary", void 0);

    _defineProperty(this, "featureCount", void 0);

    _defineProperty(this, "_extensions", void 0);

    _defineProperty(this, "_properties", void 0);

    _defineProperty(this, "_binaryProperties", void 0);

    _defineProperty(this, "_hierarchy", void 0);

    assert$7(featureCount >= 0);
    this.json = json || {};
    this.binary = binary;
    this.featureCount = featureCount;
    this._extensions = ((_this$json = this.json) === null || _this$json === void 0 ? void 0 : _this$json.extensions) || {};
    this._properties = {};

    for (const propertyName in this.json) {
      if (!IGNORED_PROPERTY_FIELDS[propertyName]) {
        this._properties[propertyName] = this.json[propertyName];
      }
    }

    this._binaryProperties = this._initializeBinaryProperties();

    if (options['3DTILES_batch_table_hierarchy']) {
      this._hierarchy = initializeHierarchy(this, this.json, this.binary);
    }
  }

  getExtension(extensionName) {
    return this.json && this.json.extensions && this.json.extensions[extensionName];
  }

  memorySizeInBytes() {
    return 0;
  }

  isClass(batchId, className) {
    this._checkBatchId(batchId);

    assert$7(typeof className === 'string', className);

    if (this._hierarchy) {
      const result = traverseHierarchy(this._hierarchy, batchId, (hierarchy, instanceIndex) => {
        const classId = hierarchy.classIds[instanceIndex];
        const instanceClass = hierarchy.classes[classId];
        return instanceClass.name === className;
      });
      return defined(result);
    }

    return false;
  }

  isExactClass(batchId, className) {
    assert$7(typeof className === 'string', className);
    return this.getExactClassName(batchId) === className;
  }

  getExactClassName(batchId) {
    this._checkBatchId(batchId);

    if (this._hierarchy) {
      const classId = this._hierarchy.classIds[batchId];
      const instanceClass = this._hierarchy.classes[classId];
      return instanceClass.name;
    }

    return undefined;
  }

  hasProperty(batchId, name) {
    this._checkBatchId(batchId);

    assert$7(typeof name === 'string', name);
    return defined(this._properties[name]) || this._hasPropertyInHierarchy(batchId, name);
  }

  getPropertyNames(batchId, results) {
    this._checkBatchId(batchId);

    results = defined(results) ? results : [];
    results.length = 0;
    const propertyNames = Object.keys(this._properties);
    results.push(...propertyNames);

    if (this._hierarchy) {
      this._getPropertyNamesInHierarchy(batchId, results);
    }

    return results;
  }

  getProperty(batchId, name) {
    this._checkBatchId(batchId);

    assert$7(typeof name === 'string', name);

    if (this._binaryProperties) {
      const binaryProperty = this._binaryProperties[name];

      if (defined(binaryProperty)) {
        return this._getBinaryProperty(binaryProperty, batchId);
      }
    }

    const propertyValues = this._properties[name];

    if (defined(propertyValues)) {
      return clone(propertyValues[batchId]);
    }

    if (this._hierarchy) {
      const hierarchyProperty = this._getHierarchyProperty(batchId, name);

      if (defined(hierarchyProperty)) {
        return hierarchyProperty;
      }
    }

    return undefined;
  }

  setProperty(batchId, name, value) {
    const featureCount = this.featureCount;

    this._checkBatchId(batchId);

    assert$7(typeof name === 'string', name);

    if (this._binaryProperties) {
      const binaryProperty = this._binaryProperties[name];

      if (binaryProperty) {
        this._setBinaryProperty(binaryProperty, batchId, value);

        return;
      }
    }

    if (this._hierarchy) {
      if (this._setHierarchyProperty(this, batchId, name, value)) {
        return;
      }
    }

    let propertyValues = this._properties[name];

    if (!defined(propertyValues)) {
      this._properties[name] = new Array(featureCount);
      propertyValues = this._properties[name];
    }

    propertyValues[batchId] = clone(value);
  }

  _checkBatchId(batchId) {
    const valid = batchId >= 0 && batchId < this.featureCount;

    if (!valid) {
      throw new Error('batchId not in range [0, featureCount - 1].');
    }
  }

  _getBinaryProperty(binaryProperty, index) {
    return binaryProperty.unpack(binaryProperty.typedArray, index);
  }

  _setBinaryProperty(binaryProperty, index, value) {
    binaryProperty.pack(value, binaryProperty.typedArray, index);
  }

  _initializeBinaryProperties() {
    let binaryProperties = null;

    for (const name in this._properties) {
      const property = this._properties[name];

      const binaryProperty = this._initializeBinaryProperty(name, property);

      if (binaryProperty) {
        binaryProperties = binaryProperties || {};
        binaryProperties[name] = binaryProperty;
      }
    }

    return binaryProperties;
  }

  _initializeBinaryProperty(name, property) {
    if ('byteOffset' in property) {
      const tile3DAccessor = property;
      assert$7(this.binary, "Property ".concat(name, " requires a batch table binary."));
      assert$7(tile3DAccessor.type, "Property ".concat(name, " requires a type."));
      const accessor = createTypedArrayFromAccessor(tile3DAccessor, this.binary.buffer, this.binary.byteOffset | 0, this.featureCount);
      return {
        typedArray: accessor.values,
        componentCount: accessor.size,
        unpack: accessor.unpacker,
        pack: accessor.packer
      };
    }

    return null;
  }

  _hasPropertyInHierarchy(batchId, name) {
    if (!this._hierarchy) {
      return false;
    }

    const result = traverseHierarchy(this._hierarchy, batchId, (hierarchy, instanceIndex) => {
      const classId = hierarchy.classIds[instanceIndex];
      const instances = hierarchy.classes[classId].instances;
      return defined(instances[name]);
    });
    return defined(result);
  }

  _getPropertyNamesInHierarchy(batchId, results) {
    traverseHierarchy(this._hierarchy, batchId, (hierarchy, instanceIndex) => {
      const classId = hierarchy.classIds[instanceIndex];
      const instances = hierarchy.classes[classId].instances;

      for (const name in instances) {
        if (instances.hasOwnProperty(name)) {
          if (results.indexOf(name) === -1) {
            results.push(name);
          }
        }
      }
    });
  }

  _getHierarchyProperty(batchId, name) {
    return traverseHierarchy(this._hierarchy, batchId, (hierarchy, instanceIndex) => {
      const classId = hierarchy.classIds[instanceIndex];
      const instanceClass = hierarchy.classes[classId];
      const indexInClass = hierarchy.classIndexes[instanceIndex];
      const propertyValues = instanceClass.instances[name];

      if (defined(propertyValues)) {
        if (defined(propertyValues.typedArray)) {
          return this._getBinaryProperty(propertyValues, indexInClass);
        }

        return clone(propertyValues[indexInClass]);
      }

      return null;
    });
  }

  _setHierarchyProperty(batchTable, batchId, name, value) {
    const result = traverseHierarchy(this._hierarchy, batchId, (hierarchy, instanceIndex) => {
      const classId = hierarchy.classIds[instanceIndex];
      const instanceClass = hierarchy.classes[classId];
      const indexInClass = hierarchy.classIndexes[instanceIndex];
      const propertyValues = instanceClass.instances[name];

      if (defined(propertyValues)) {
        assert$7(instanceIndex === batchId, "Inherited property \"".concat(name, "\" is read-only."));

        if (defined(propertyValues.typedArray)) {
          this._setBinaryProperty(propertyValues, indexInClass, value);
        } else {
          propertyValues[indexInClass] = clone(value);
        }

        return true;
      }

      return false;
    });
    return defined(result);
  }

}

const SIZEOF_UINT32$1 = 4;
function parse3DTileHeaderSync(tile, arrayBuffer, byteOffset = 0) {
  const view = new DataView(arrayBuffer);
  tile.magic = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32$1;
  tile.version = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32$1;
  tile.byteLength = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32$1;

  if (tile.version !== 1) {
    throw new Error("3D Tile Version ".concat(tile.version, " not supported"));
  }

  return byteOffset;
}

const SIZEOF_UINT32 = 4;
const DEPRECATION_WARNING = 'b3dm tile in legacy format.';
function parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset) {
  const view = new DataView(arrayBuffer);
  let batchLength;
  tile.header = tile.header || {};
  let featureTableJsonByteLength = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32;
  let featureTableBinaryByteLength = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32;
  let batchTableJsonByteLength = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32;
  let batchTableBinaryByteLength = view.getUint32(byteOffset, true);
  byteOffset += SIZEOF_UINT32;

  if (batchTableJsonByteLength >= 570425344) {
    byteOffset -= SIZEOF_UINT32 * 2;
    batchLength = featureTableJsonByteLength;
    batchTableJsonByteLength = featureTableBinaryByteLength;
    batchTableBinaryByteLength = 0;
    featureTableJsonByteLength = 0;
    featureTableBinaryByteLength = 0;
    console.warn(DEPRECATION_WARNING);
  } else if (batchTableBinaryByteLength >= 570425344) {
    byteOffset -= SIZEOF_UINT32;
    batchLength = batchTableJsonByteLength;
    batchTableJsonByteLength = featureTableJsonByteLength;
    batchTableBinaryByteLength = featureTableBinaryByteLength;
    featureTableJsonByteLength = 0;
    featureTableBinaryByteLength = 0;
    console.warn(DEPRECATION_WARNING);
  }

  tile.header.featureTableJsonByteLength = featureTableJsonByteLength;
  tile.header.featureTableBinaryByteLength = featureTableBinaryByteLength;
  tile.header.batchTableJsonByteLength = batchTableJsonByteLength;
  tile.header.batchTableBinaryByteLength = batchTableBinaryByteLength;
  tile.header.batchLength = batchLength;
  return byteOffset;
}
function parse3DTileTablesSync(tile, arrayBuffer, byteOffset, options) {
  byteOffset = parse3DTileFeatureTable(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileBatchTable(tile, arrayBuffer, byteOffset);
  return byteOffset;
}

function parse3DTileFeatureTable(tile, arrayBuffer, byteOffset, options) {
  const {
    featureTableJsonByteLength,
    featureTableBinaryByteLength,
    batchLength
  } = tile.header;
  tile.featureTableJson = {
    BATCH_LENGTH: batchLength || 0
  };

  if (featureTableJsonByteLength > 0) {
    const featureTableString = getStringFromArrayBuffer(arrayBuffer, byteOffset, featureTableJsonByteLength);
    tile.featureTableJson = JSON.parse(featureTableString);
  }

  byteOffset += featureTableJsonByteLength;
  tile.featureTableBinary = new Uint8Array(arrayBuffer, byteOffset, featureTableBinaryByteLength);
  byteOffset += featureTableBinaryByteLength;
  return byteOffset;
}

function parse3DTileBatchTable(tile, arrayBuffer, byteOffset, options) {
  const {
    batchTableJsonByteLength,
    batchTableBinaryByteLength
  } = tile.header;

  if (batchTableJsonByteLength > 0) {
    const batchTableString = getStringFromArrayBuffer(arrayBuffer, byteOffset, batchTableJsonByteLength);
    tile.batchTableJson = JSON.parse(batchTableString);
    byteOffset += batchTableJsonByteLength;

    if (batchTableBinaryByteLength > 0) {
      tile.batchTableBinary = new Uint8Array(arrayBuffer, byteOffset, batchTableBinaryByteLength);
      tile.batchTableBinary = new Uint8Array(tile.batchTableBinary);
      byteOffset += batchTableBinaryByteLength;
    }
  }

  return byteOffset;
}

function normalize3DTileColorAttribute(tile, colors, batchTable) {
  if (!colors && (!tile || !tile.batchIds || !batchTable)) {
    return null;
  }

  const {
    batchIds,
    isRGB565,
    pointCount
  } = tile;

  if (batchIds && batchTable) {
    const colorArray = new Uint8ClampedArray(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const batchId = batchIds[i];
      const dimensions = batchTable.getProperty(batchId, 'dimensions');
      const color = dimensions.map(d => d * 255);
      colorArray[i * 3] = color[0];
      colorArray[i * 3 + 1] = color[1];
      colorArray[i * 3 + 2] = color[2];
    }

    return {
      type: GL$1.UNSIGNED_BYTE,
      value: colorArray,
      size: 3,
      normalized: true
    };
  }

  if (isRGB565) {
    const colorArray = new Uint8ClampedArray(pointCount * 3);

    for (let i = 0; i < pointCount; i++) {
      const color = decodeRGB565(colors[i]);
      colorArray[i * 3] = color[0];
      colorArray[i * 3 + 1] = color[1];
      colorArray[i * 3 + 2] = color[2];
    }

    return {
      type: GL$1.UNSIGNED_BYTE,
      value: colorArray,
      size: 3,
      normalized: true
    };
  }

  if (colors && colors.length === pointCount * 3) {
    return {
      type: GL$1.UNSIGNED_BYTE,
      value: colors,
      size: 3,
      normalized: true
    };
  }

  return {
    type: GL$1.UNSIGNED_BYTE,
    value: colors,
    size: 4,
    normalized: true
  };
}

const scratchNormal = new Vector3();
function normalize3DTileNormalAttribute(tile, normals) {
  if (!normals) {
    return null;
  }

  if (tile.isOctEncoded16P) {
    const decodedArray = new Float32Array(tile.pointsLength * 3);

    for (let i = 0; i < tile.pointsLength; i++) {
      octDecode(normals[i * 2], normals[i * 2 + 1], scratchNormal);
      scratchNormal.toArray(decodedArray, i * 3);
    }

    return {
      type: GL$1.FLOAT,
      size: 2,
      value: decodedArray
    };
  }

  return {
    type: GL$1.FLOAT,
    size: 2,
    value: normals
  };
}

function normalize3DTilePositionAttribute(tile, positions, options) {
  if (!tile.isQuantized) {
    return positions;
  }

  if (options['3d-tiles'] && options['3d-tiles'].decodeQuantizedPositions) {
    tile.isQuantized = false;
    return decodeQuantizedPositions(tile, positions);
  }

  return {
    type: GL$1.UNSIGNED_SHORT,
    value: positions,
    size: 3,
    normalized: true
  };
}

function decodeQuantizedPositions(tile, positions) {
  const scratchPosition = new Vector3();
  const decodedArray = new Float32Array(tile.pointCount * 3);

  for (let i = 0; i < tile.pointCount; i++) {
    scratchPosition.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]).scale(1 / tile.quantizedRange).multiply(tile.quantizedVolumeScale).add(tile.quantizedVolumeOffset).toArray(decodedArray, i * 3);
  }

  return decodedArray;
}

async function parsePointCloud3DTile(tile, arrayBuffer, byteOffset, options, context) {
  byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileTablesSync(tile, arrayBuffer, byteOffset);
  initializeTile(tile);
  const {
    featureTable,
    batchTable
  } = parsePointCloudTables(tile);
  await parseDraco(tile, featureTable, batchTable, options, context);
  parsePositions(tile, featureTable, options);
  parseColors(tile, featureTable, batchTable);
  parseNormals(tile, featureTable);
  return byteOffset;
}

function initializeTile(tile) {
  tile.attributes = {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  };
  tile.isQuantized = false;
  tile.isTranslucent = false;
  tile.isRGB565 = false;
  tile.isOctEncoded16P = false;
}

function parsePointCloudTables(tile) {
  const featureTable = new Tile3DFeatureTable(tile.featureTableJson, tile.featureTableBinary);
  const pointsLength = featureTable.getGlobalProperty('POINTS_LENGTH');

  if (!Number.isFinite(pointsLength)) {
    throw new Error('POINTS_LENGTH must be defined');
  }

  featureTable.featuresLength = pointsLength;
  tile.featuresLength = pointsLength;
  tile.pointsLength = pointsLength;
  tile.pointCount = pointsLength;
  tile.rtcCenter = featureTable.getGlobalProperty('RTC_CENTER', GL$1.FLOAT, 3);
  const batchTable = parseBatchIds(tile, featureTable);
  return {
    featureTable,
    batchTable
  };
}

function parsePositions(tile, featureTable, options) {
  if (!tile.attributes.positions) {
    if (featureTable.hasProperty('POSITION')) {
      tile.attributes.positions = featureTable.getPropertyArray('POSITION', GL$1.FLOAT, 3);
    } else if (featureTable.hasProperty('POSITION_QUANTIZED')) {
      const positions = featureTable.getPropertyArray('POSITION_QUANTIZED', GL$1.UNSIGNED_SHORT, 3);
      tile.isQuantized = true;
      tile.quantizedRange = (1 << 16) - 1;
      tile.quantizedVolumeScale = featureTable.getGlobalProperty('QUANTIZED_VOLUME_SCALE', GL$1.FLOAT, 3);

      if (!tile.quantizedVolumeScale) {
        throw new Error('QUANTIZED_VOLUME_SCALE must be defined for quantized positions.');
      }

      tile.quantizedVolumeOffset = featureTable.getGlobalProperty('QUANTIZED_VOLUME_OFFSET', GL$1.FLOAT, 3);

      if (!tile.quantizedVolumeOffset) {
        throw new Error('QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.');
      }

      tile.attributes.positions = normalize3DTilePositionAttribute(tile, positions, options);
    }
  }

  if (!tile.attributes.positions) {
    throw new Error('Either POSITION or POSITION_QUANTIZED must be defined.');
  }
}

function parseColors(tile, featureTable, batchTable) {
  if (!tile.attributes.colors) {
    let colors = null;

    if (featureTable.hasProperty('RGBA')) {
      colors = featureTable.getPropertyArray('RGBA', GL$1.UNSIGNED_BYTE, 4);
      tile.isTranslucent = true;
    } else if (featureTable.hasProperty('RGB')) {
      colors = featureTable.getPropertyArray('RGB', GL$1.UNSIGNED_BYTE, 3);
    } else if (featureTable.hasProperty('RGB565')) {
      colors = featureTable.getPropertyArray('RGB565', GL$1.UNSIGNED_SHORT, 1);
      tile.isRGB565 = true;
    }

    tile.attributes.colors = normalize3DTileColorAttribute(tile, colors, batchTable);
  }

  if (featureTable.hasProperty('CONSTANT_RGBA')) {
    tile.constantRGBA = featureTable.getGlobalProperty('CONSTANT_RGBA', GL$1.UNSIGNED_BYTE, 4);
  }
}

function parseNormals(tile, featureTable) {
  if (!tile.attributes.normals) {
    let normals = null;

    if (featureTable.hasProperty('NORMAL')) {
      normals = featureTable.getPropertyArray('NORMAL', GL$1.FLOAT, 3);
    } else if (featureTable.hasProperty('NORMAL_OCT16P')) {
      normals = featureTable.getPropertyArray('NORMAL_OCT16P', GL$1.UNSIGNED_BYTE, 2);
      tile.isOctEncoded16P = true;
    }

    tile.attributes.normals = normalize3DTileNormalAttribute(tile, normals);
  }
}

function parseBatchIds(tile, featureTable) {
  let batchTable = null;

  if (!tile.batchIds && featureTable.hasProperty('BATCH_ID')) {
    tile.batchIds = featureTable.getPropertyArray('BATCH_ID', GL$1.UNSIGNED_SHORT, 1);

    if (tile.batchIds) {
      const batchFeatureLength = featureTable.getGlobalProperty('BATCH_LENGTH');

      if (!batchFeatureLength) {
        throw new Error('Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.');
      }

      const {
        batchTableJson,
        batchTableBinary
      } = tile;
      batchTable = new Tile3DBatchTableParser(batchTableJson, batchTableBinary, batchFeatureLength);
    }
  }

  return batchTable;
}

async function parseDraco(tile, featureTable, batchTable, options, context) {
  let dracoBuffer;
  let dracoFeatureTableProperties;
  let dracoBatchTableProperties;
  const batchTableDraco = tile.batchTableJson && tile.batchTableJson.extensions && tile.batchTableJson.extensions['3DTILES_draco_point_compression'];

  if (batchTableDraco) {
    dracoBatchTableProperties = batchTableDraco.properties;
  }

  const featureTableDraco = featureTable.getExtension('3DTILES_draco_point_compression');

  if (featureTableDraco) {
    dracoFeatureTableProperties = featureTableDraco.properties;
    const dracoByteOffset = featureTableDraco.byteOffset;
    const dracoByteLength = featureTableDraco.byteLength;

    if (!dracoFeatureTableProperties || !Number.isFinite(dracoByteOffset) || !dracoByteLength) {
      throw new Error('Draco properties, byteOffset, and byteLength must be defined');
    }

    dracoBuffer = tile.featureTableBinary.slice(dracoByteOffset, dracoByteOffset + dracoByteLength);
    tile.hasPositions = Number.isFinite(dracoFeatureTableProperties.POSITION);
    tile.hasColors = Number.isFinite(dracoFeatureTableProperties.RGB) || Number.isFinite(dracoFeatureTableProperties.RGBA);
    tile.hasNormals = Number.isFinite(dracoFeatureTableProperties.NORMAL);
    tile.hasBatchIds = Number.isFinite(dracoFeatureTableProperties.BATCH_ID);
    tile.isTranslucent = Number.isFinite(dracoFeatureTableProperties.RGBA);
  }

  if (!dracoBuffer) {
    return true;
  }

  const dracoData = {
    buffer: dracoBuffer,
    properties: { ...dracoFeatureTableProperties,
      ...dracoBatchTableProperties
    },
    featureTableProperties: dracoFeatureTableProperties,
    batchTableProperties: dracoBatchTableProperties,
    dequantizeInShader: false
  };
  return await loadDraco(tile, dracoData, options, context);
}

async function loadDraco(tile, dracoData, options, context) {
  const {
    parse
  } = context;
  const dracoOptions = { ...options,
    draco: { ...options.draco,
      extraAttributes: dracoData.batchTableProperties || {}
    }
  };
  delete dracoOptions['3d-tiles'];
  const data = await parse(dracoData.buffer, DracoLoader, dracoOptions);
  const decodedPositions = data.attributes.POSITION && data.attributes.POSITION.value;
  const decodedColors = data.attributes.COLOR_0 && data.attributes.COLOR_0.value;
  const decodedNormals = data.attributes.NORMAL && data.attributes.NORMAL.value;
  const decodedBatchIds = data.attributes.BATCH_ID && data.attributes.BATCH_ID.value;
  const isQuantizedDraco = decodedPositions && data.attributes.POSITION.value.quantization;
  const isOctEncodedDraco = decodedNormals && data.attributes.NORMAL.value.quantization;

  if (isQuantizedDraco) {
    const quantization = data.POSITION.data.quantization;
    const range = quantization.range;
    tile.quantizedVolumeScale = new Vector3(range, range, range);
    tile.quantizedVolumeOffset = new Vector3(quantization.minValues);
    tile.quantizedRange = (1 << quantization.quantizationBits) - 1.0;
    tile.isQuantizedDraco = true;
  }

  if (isOctEncodedDraco) {
    tile.octEncodedRange = (1 << data.NORMAL.data.quantization.quantizationBits) - 1.0;
    tile.isOctEncodedDraco = true;
  }

  const batchTableAttributes = {};

  if (dracoData.batchTableProperties) {
    for (const attributeName of Object.keys(dracoData.batchTableProperties)) {
      if (data.attributes[attributeName] && data.attributes[attributeName].value) {
        batchTableAttributes[attributeName.toLowerCase()] = data.attributes[attributeName].value;
      }
    }
  }

  tile.attributes = {
    positions: decodedPositions,
    colors: normalize3DTileColorAttribute(tile, decodedColors, undefined),
    normals: decodedNormals,
    batchIds: decodedBatchIds,
    ...batchTableAttributes
  };
}

const VERSION$3 = "3.2.13" ;

const VERSION$2 = "3.2.13" ;

const VERSION$1 = "3.2.13" ;
const BASIS_CDN_ENCODER_WASM = "https://unpkg.com/@loaders.gl/textures@".concat(VERSION$1, "/dist/libs/basis_encoder.wasm");
const BASIS_CDN_ENCODER_JS = "https://unpkg.com/@loaders.gl/textures@".concat(VERSION$1, "/dist/libs/basis_encoder.js");
let loadBasisTranscoderPromise;
async function loadBasisTrascoderModule(options) {
  const modules = options.modules || {};

  if (modules.basis) {
    return modules.basis;
  }

  loadBasisTranscoderPromise = loadBasisTranscoderPromise || loadBasisTrascoder(options);
  return await loadBasisTranscoderPromise;
}

async function loadBasisTrascoder(options) {
  let BASIS = null;
  let wasmBinary = null;
  [BASIS, wasmBinary] = await Promise.all([await loadLibrary('basis_transcoder.js', 'textures', options), await loadLibrary('basis_transcoder.wasm', 'textures', options)]);
  BASIS = BASIS || globalThis.BASIS;
  return await initializeBasisTrascoderModule(BASIS, wasmBinary);
}

function initializeBasisTrascoderModule(BasisModule, wasmBinary) {
  const options = {};

  if (wasmBinary) {
    options.wasmBinary = wasmBinary;
  }

  return new Promise(resolve => {
    BasisModule(options).then(module => {
      const {
        BasisFile,
        initializeBasis
      } = module;
      initializeBasis();
      resolve({
        BasisFile
      });
    });
  });
}

let loadBasisEncoderPromise;
async function loadBasisEncoderModule(options) {
  const modules = options.modules || {};

  if (modules.basisEncoder) {
    return modules.basisEncoder;
  }

  loadBasisEncoderPromise = loadBasisEncoderPromise || loadBasisEncoder(options);
  return await loadBasisEncoderPromise;
}

async function loadBasisEncoder(options) {
  let BASIS_ENCODER = null;
  let wasmBinary = null;
  [BASIS_ENCODER, wasmBinary] = await Promise.all([await loadLibrary(BASIS_CDN_ENCODER_JS, 'textures', options), await loadLibrary(BASIS_CDN_ENCODER_WASM, 'textures', options)]);
  BASIS_ENCODER = BASIS_ENCODER || globalThis.BASIS;
  return await initializeBasisEncoderModule(BASIS_ENCODER, wasmBinary);
}

function initializeBasisEncoderModule(BasisEncoderModule, wasmBinary) {
  const options = {};

  if (wasmBinary) {
    options.wasmBinary = wasmBinary;
  }

  return new Promise(resolve => {
    BasisEncoderModule(options).then(module => {
      const {
        BasisFile,
        KTX2File,
        initializeBasis,
        BasisEncoder
      } = module;
      initializeBasis();
      resolve({
        BasisFile,
        KTX2File,
        BasisEncoder
      });
    });
  });
}

const GL_EXTENSIONS_CONSTANTS = {
  COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83f0,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83f1,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83f2,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83f3,
  COMPRESSED_R11_EAC: 0x9270,
  COMPRESSED_SIGNED_R11_EAC: 0x9271,
  COMPRESSED_RG11_EAC: 0x9272,
  COMPRESSED_SIGNED_RG11_EAC: 0x9273,
  COMPRESSED_RGB8_ETC2: 0x9274,
  COMPRESSED_RGBA8_ETC2_EAC: 0x9275,
  COMPRESSED_SRGB8_ETC2: 0x9276,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9277,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9278,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9279,
  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8c00,
  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8c02,
  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8c01,
  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8c03,
  COMPRESSED_RGB_ETC1_WEBGL: 0x8d64,
  COMPRESSED_RGB_ATC_WEBGL: 0x8c92,
  COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 0x8c93,
  COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 0x87ee,
  COMPRESSED_RGBA_ASTC_4X4_KHR: 0x93b0,
  COMPRESSED_RGBA_ASTC_5X4_KHR: 0x93b1,
  COMPRESSED_RGBA_ASTC_5X5_KHR: 0x93b2,
  COMPRESSED_RGBA_ASTC_6X5_KHR: 0x93b3,
  COMPRESSED_RGBA_ASTC_6X6_KHR: 0x93b4,
  COMPRESSED_RGBA_ASTC_8X5_KHR: 0x93b5,
  COMPRESSED_RGBA_ASTC_8X6_KHR: 0x93b6,
  COMPRESSED_RGBA_ASTC_8X8_KHR: 0x93b7,
  COMPRESSED_RGBA_ASTC_10X5_KHR: 0x93b8,
  COMPRESSED_RGBA_ASTC_10X6_KHR: 0x93b9,
  COMPRESSED_RGBA_ASTC_10X8_KHR: 0x93ba,
  COMPRESSED_RGBA_ASTC_10X10_KHR: 0x93bb,
  COMPRESSED_RGBA_ASTC_12X10_KHR: 0x93bc,
  COMPRESSED_RGBA_ASTC_12X12_KHR: 0x93bd,
  COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR: 0x93d0,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR: 0x93d1,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR: 0x93d2,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR: 0x93d3,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR: 0x93d4,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR: 0x93d5,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR: 0x93d6,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR: 0x93d7,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR: 0x93d8,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR: 0x93d9,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR: 0x93da,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR: 0x93db,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR: 0x93dc,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR: 0x93dd,
  COMPRESSED_RED_RGTC1_EXT: 0x8dbb,
  COMPRESSED_SIGNED_RED_RGTC1_EXT: 0x8dbc,
  COMPRESSED_RED_GREEN_RGTC2_EXT: 0x8dbd,
  COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT: 0x8dbe,
  COMPRESSED_SRGB_S3TC_DXT1_EXT: 0x8c4c,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: 0x8c4d,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: 0x8c4e,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: 0x8c4f
};

const BROWSER_PREFIXES = ['', 'WEBKIT_', 'MOZ_'];
const WEBGL_EXTENSIONS = {
  WEBGL_compressed_texture_s3tc: 'dxt',
  WEBGL_compressed_texture_s3tc_srgb: 'dxt-srgb',
  WEBGL_compressed_texture_etc1: 'etc1',
  WEBGL_compressed_texture_etc: 'etc2',
  WEBGL_compressed_texture_pvrtc: 'pvrtc',
  WEBGL_compressed_texture_atc: 'atc',
  WEBGL_compressed_texture_astc: 'astc',
  EXT_texture_compression_rgtc: 'rgtc'
};
let formats = null;
function getSupportedGPUTextureFormats(gl) {
  if (!formats) {
    gl = gl || getWebGLContext() || undefined;
    formats = new Set();

    for (const prefix of BROWSER_PREFIXES) {
      for (const extension in WEBGL_EXTENSIONS) {
        if (gl && gl.getExtension("".concat(prefix).concat(extension))) {
          const gpuTextureFormat = WEBGL_EXTENSIONS[extension];
          formats.add(gpuTextureFormat);
        }
      }
    }
  }

  return formats;
}

function getWebGLContext() {
  try {
    const canvas = document.createElement('canvas');
    return canvas.getContext('webgl');
  } catch (error) {
    return null;
  }
}

var n,i,s,a,r,o,l,f;!function(t){t[t.NONE=0]="NONE",t[t.BASISLZ=1]="BASISLZ",t[t.ZSTD=2]="ZSTD",t[t.ZLIB=3]="ZLIB";}(n||(n={})),function(t){t[t.BASICFORMAT=0]="BASICFORMAT";}(i||(i={})),function(t){t[t.UNSPECIFIED=0]="UNSPECIFIED",t[t.ETC1S=163]="ETC1S",t[t.UASTC=166]="UASTC";}(s||(s={})),function(t){t[t.UNSPECIFIED=0]="UNSPECIFIED",t[t.SRGB=1]="SRGB";}(a||(a={})),function(t){t[t.UNSPECIFIED=0]="UNSPECIFIED",t[t.LINEAR=1]="LINEAR",t[t.SRGB=2]="SRGB",t[t.ITU=3]="ITU",t[t.NTSC=4]="NTSC",t[t.SLOG=5]="SLOG",t[t.SLOG2=6]="SLOG2";}(r||(r={})),function(t){t[t.ALPHA_STRAIGHT=0]="ALPHA_STRAIGHT",t[t.ALPHA_PREMULTIPLIED=1]="ALPHA_PREMULTIPLIED";}(o||(o={})),function(t){t[t.RGB=0]="RGB",t[t.RRR=3]="RRR",t[t.GGG=4]="GGG",t[t.AAA=15]="AAA";}(l||(l={})),function(t){t[t.RGB=0]="RGB",t[t.RGBA=3]="RGBA",t[t.RRR=4]="RRR",t[t.RRRG=5]="RRRG";}(f||(f={}));

const KTX2_ID = [0xab, 0x4b, 0x54, 0x58, 0x20, 0x32, 0x30, 0xbb, 0x0d, 0x0a, 0x1a, 0x0a];
function isKTX(data) {
  const id = new Uint8Array(data);
  const notKTX = id.byteLength < KTX2_ID.length || id[0] !== KTX2_ID[0] || id[1] !== KTX2_ID[1] || id[2] !== KTX2_ID[2] || id[3] !== KTX2_ID[3] || id[4] !== KTX2_ID[4] || id[5] !== KTX2_ID[5] || id[6] !== KTX2_ID[6] || id[7] !== KTX2_ID[7] || id[8] !== KTX2_ID[8] || id[9] !== KTX2_ID[9] || id[10] !== KTX2_ID[10] || id[11] !== KTX2_ID[11];
  return !notKTX;
}

const OutputFormat = {
  etc1: {
    basisFormat: 0,
    compressed: true,
    format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_ETC1_WEBGL
  },
  etc2: {
    basisFormat: 1,
    compressed: true
  },
  bc1: {
    basisFormat: 2,
    compressed: true,
    format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_S3TC_DXT1_EXT
  },
  bc3: {
    basisFormat: 3,
    compressed: true,
    format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT5_EXT
  },
  bc4: {
    basisFormat: 4,
    compressed: true
  },
  bc5: {
    basisFormat: 5,
    compressed: true
  },
  'bc7-m6-opaque-only': {
    basisFormat: 6,
    compressed: true
  },
  'bc7-m5': {
    basisFormat: 7,
    compressed: true
  },
  'pvrtc1-4-rgb': {
    basisFormat: 8,
    compressed: true,
    format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
  },
  'pvrtc1-4-rgba': {
    basisFormat: 9,
    compressed: true,
    format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
  },
  'astc-4x4': {
    basisFormat: 10,
    compressed: true,
    format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_4X4_KHR
  },
  'atc-rgb': {
    basisFormat: 11,
    compressed: true
  },
  'atc-rgba-interpolated-alpha': {
    basisFormat: 12,
    compressed: true
  },
  rgba32: {
    basisFormat: 13,
    compressed: false
  },
  rgb565: {
    basisFormat: 14,
    compressed: false
  },
  bgr565: {
    basisFormat: 15,
    compressed: false
  },
  rgba4444: {
    basisFormat: 16,
    compressed: false
  }
};
async function parseBasis(data, options) {
  if (options.basis.containerFormat === 'auto') {
    if (isKTX(data)) {
      const fileConstructors = await loadBasisEncoderModule(options);
      return parseKTX2File(fileConstructors.KTX2File, data, options);
    }

    const {
      BasisFile
    } = await loadBasisTrascoderModule(options);
    return parseBasisFile(BasisFile, data, options);
  }

  switch (options.basis.module) {
    case 'encoder':
      const fileConstructors = await loadBasisEncoderModule(options);

      switch (options.basis.containerFormat) {
        case 'ktx2':
          return parseKTX2File(fileConstructors.KTX2File, data, options);

        case 'basis':
        default:
          return parseBasisFile(fileConstructors.BasisFile, data, options);
      }

    case 'transcoder':
    default:
      const {
        BasisFile
      } = await loadBasisTrascoderModule(options);
      return parseBasisFile(BasisFile, data, options);
  }
}

function parseBasisFile(BasisFile, data, options) {
  const basisFile = new BasisFile(new Uint8Array(data));

  try {
    if (!basisFile.startTranscoding()) {
      throw new Error('Failed to start basis transcoding');
    }

    const imageCount = basisFile.getNumImages();
    const images = [];

    for (let imageIndex = 0; imageIndex < imageCount; imageIndex++) {
      const levelsCount = basisFile.getNumLevels(imageIndex);
      const levels = [];

      for (let levelIndex = 0; levelIndex < levelsCount; levelIndex++) {
        levels.push(transcodeImage(basisFile, imageIndex, levelIndex, options));
      }

      images.push(levels);
    }

    return images;
  } finally {
    basisFile.close();
    basisFile.delete();
  }
}

function transcodeImage(basisFile, imageIndex, levelIndex, options) {
  const width = basisFile.getImageWidth(imageIndex, levelIndex);
  const height = basisFile.getImageHeight(imageIndex, levelIndex);
  const hasAlpha = basisFile.getHasAlpha();
  const {
    compressed,
    format,
    basisFormat
  } = getBasisOptions(options, hasAlpha);
  const decodedSize = basisFile.getImageTranscodedSizeInBytes(imageIndex, levelIndex, basisFormat);
  const decodedData = new Uint8Array(decodedSize);

  if (!basisFile.transcodeImage(decodedData, imageIndex, levelIndex, basisFormat, 0, 0)) {
    throw new Error('failed to start Basis transcoding');
  }

  return {
    width,
    height,
    data: decodedData,
    compressed,
    format,
    hasAlpha
  };
}

function parseKTX2File(KTX2File, data, options) {
  const ktx2File = new KTX2File(new Uint8Array(data));

  try {
    if (!ktx2File.startTranscoding()) {
      throw new Error('failed to start KTX2 transcoding');
    }

    const levelsCount = ktx2File.getLevels();
    const levels = [];

    for (let levelIndex = 0; levelIndex < levelsCount; levelIndex++) {
      levels.push(transcodeKTX2Image(ktx2File, levelIndex, options));
      break;
    }

    return [levels];
  } finally {
    ktx2File.close();
    ktx2File.delete();
  }
}

function transcodeKTX2Image(ktx2File, levelIndex, options) {
  const {
    alphaFlag,
    height,
    width
  } = ktx2File.getImageLevelInfo(levelIndex, 0, 0);
  const {
    compressed,
    format,
    basisFormat
  } = getBasisOptions(options, alphaFlag);
  const decodedSize = ktx2File.getImageTranscodedSizeInBytes(levelIndex, 0, 0, basisFormat);
  const decodedData = new Uint8Array(decodedSize);

  if (!ktx2File.transcodeImage(decodedData, levelIndex, 0, 0, basisFormat, 0, -1, -1)) {
    throw new Error('Failed to transcode KTX2 image');
  }

  return {
    width,
    height,
    data: decodedData,
    compressed,
    hasAlpha: alphaFlag,
    format
  };
}

function getBasisOptions(options, hasAlpha) {
  let format = options && options.basis && options.basis.format;

  if (format === 'auto') {
    format = selectSupportedBasisFormat();
  }

  if (typeof format === 'object') {
    format = hasAlpha ? format.alpha : format.noAlpha;
  }

  format = format.toLowerCase();
  return OutputFormat[format];
}

function selectSupportedBasisFormat() {
  const supportedFormats = getSupportedGPUTextureFormats();

  if (supportedFormats.has('astc')) {
    return 'astc-4x4';
  } else if (supportedFormats.has('dxt')) {
    return {
      alpha: 'bc3',
      noAlpha: 'bc1'
    };
  } else if (supportedFormats.has('pvrtc')) {
    return {
      alpha: 'pvrtc1-4-rgba',
      noAlpha: 'pvrtc1-4-rgb'
    };
  } else if (supportedFormats.has('etc1')) {
    return 'etc1';
  } else if (supportedFormats.has('etc2')) {
    return 'etc2';
  }

  return 'rgb565';
}

const BasisWorkerLoader = {
  name: 'Basis',
  id: 'basis',
  module: 'textures',
  version: VERSION$2,
  worker: true,
  extensions: ['basis', 'ktx2'],
  mimeTypes: ['application/octet-stream', 'image/ktx2'],
  tests: ['sB'],
  binary: true,
  options: {
    basis: {
      format: 'auto',
      libraryPath: 'libs/',
      containerFormat: 'auto',
      module: 'transcoder'
    }
  }
};
const BasisLoader = { ...BasisWorkerLoader,
  parse: parseBasis
};

const VERSION = "3.2.13" ;

const {
  _parseImageNode
} = globalThis;
const IMAGE_SUPPORTED = typeof Image !== 'undefined';
const IMAGE_BITMAP_SUPPORTED = typeof ImageBitmap !== 'undefined';
const NODE_IMAGE_SUPPORTED = Boolean(_parseImageNode);
const DATA_SUPPORTED = isBrowser$2 ? true : NODE_IMAGE_SUPPORTED;
function isImageTypeSupported(type) {
  switch (type) {
    case 'auto':
      return IMAGE_BITMAP_SUPPORTED || IMAGE_SUPPORTED || DATA_SUPPORTED;

    case 'imagebitmap':
      return IMAGE_BITMAP_SUPPORTED;

    case 'image':
      return IMAGE_SUPPORTED;

    case 'data':
      return DATA_SUPPORTED;

    default:
      throw new Error("@loaders.gl/images: image ".concat(type, " not supported in this environment"));
  }
}
function getDefaultImageType() {
  if (IMAGE_BITMAP_SUPPORTED) {
    return 'imagebitmap';
  }

  if (IMAGE_SUPPORTED) {
    return 'image';
  }

  if (DATA_SUPPORTED) {
    return 'data';
  }

  throw new Error('Install \'@loaders.gl/polyfills\' to parse images under Node.js');
}

function getImageType(image) {
  const format = getImageTypeOrNull(image);

  if (!format) {
    throw new Error('Not an image');
  }

  return format;
}
function getImageData(image) {
  switch (getImageType(image)) {
    case 'data':
      return image;

    case 'image':
    case 'imagebitmap':
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('getImageData');
      }

      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, image.width, image.height);

    default:
      throw new Error('getImageData');
  }
}

function getImageTypeOrNull(image) {
  if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
    return 'imagebitmap';
  }

  if (typeof Image !== 'undefined' && image instanceof Image) {
    return 'image';
  }

  if (image && typeof image === 'object' && image.data && image.width && image.height) {
    return 'data';
  }

  return null;
}

const SVG_DATA_URL_PATTERN = /^data:image\/svg\+xml/;
const SVG_URL_PATTERN = /\.svg((\?|#).*)?$/;
function isSVG(url) {
  return url && (SVG_DATA_URL_PATTERN.test(url) || SVG_URL_PATTERN.test(url));
}
function getBlobOrSVGDataUrl(arrayBuffer, url) {
  if (isSVG(url)) {
    const textDecoder = new TextDecoder();
    let xmlText = textDecoder.decode(arrayBuffer);

    try {
      if (typeof unescape === 'function' && typeof encodeURIComponent === 'function') {
        xmlText = unescape(encodeURIComponent(xmlText));
      }
    } catch (error) {
      throw new Error(error.message);
    }

    const src = "data:image/svg+xml;base64,".concat(btoa(xmlText));
    return src;
  }

  return getBlob(arrayBuffer, url);
}
function getBlob(arrayBuffer, url) {
  if (isSVG(url)) {
    throw new Error('SVG cannot be parsed directly to imagebitmap');
  }

  return new Blob([new Uint8Array(arrayBuffer)]);
}

async function parseToImage(arrayBuffer, options, url) {
  const blobOrDataUrl = getBlobOrSVGDataUrl(arrayBuffer, url);
  const URL = self.URL || self.webkitURL;
  const objectUrl = typeof blobOrDataUrl !== 'string' && URL.createObjectURL(blobOrDataUrl);

  try {
    return await loadToImage(objectUrl || blobOrDataUrl, options);
  } finally {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  }
}
async function loadToImage(url, options) {
  const image = new Image();
  image.src = url;

  if (options.image && options.image.decode && image.decode) {
    await image.decode();
    return image;
  }

  return await new Promise((resolve, reject) => {
    try {
      image.onload = () => resolve(image);

      image.onerror = err => reject(new Error("Could not load image ".concat(url, ": ").concat(err)));
    } catch (error) {
      reject(error);
    }
  });
}

const EMPTY_OBJECT = {};
let imagebitmapOptionsSupported = true;
async function parseToImageBitmap(arrayBuffer, options, url) {
  let blob;

  if (isSVG(url)) {
    const image = await parseToImage(arrayBuffer, options, url);
    blob = image;
  } else {
    blob = getBlob(arrayBuffer, url);
  }

  const imagebitmapOptions = options && options.imagebitmap;
  return await safeCreateImageBitmap(blob, imagebitmapOptions);
}

async function safeCreateImageBitmap(blob, imagebitmapOptions = null) {
  if (isEmptyObject(imagebitmapOptions) || !imagebitmapOptionsSupported) {
    imagebitmapOptions = null;
  }

  if (imagebitmapOptions) {
    try {
      return await createImageBitmap(blob, imagebitmapOptions);
    } catch (error) {
      console.warn(error);
      imagebitmapOptionsSupported = false;
    }
  }

  return await createImageBitmap(blob);
}

function isEmptyObject(object) {
  for (const key in object || EMPTY_OBJECT) {
    return false;
  }

  return true;
}

const BIG_ENDIAN = false;
const LITTLE_ENDIAN = true;
function getBinaryImageMetadata(binaryData) {
  const dataView = toDataView(binaryData);
  return getPngMetadata(dataView) || getJpegMetadata(dataView) || getGifMetadata(dataView) || getBmpMetadata(dataView);
}

function getPngMetadata(binaryData) {
  const dataView = toDataView(binaryData);
  const isPng = dataView.byteLength >= 24 && dataView.getUint32(0, BIG_ENDIAN) === 0x89504e47;

  if (!isPng) {
    return null;
  }

  return {
    mimeType: 'image/png',
    width: dataView.getUint32(16, BIG_ENDIAN),
    height: dataView.getUint32(20, BIG_ENDIAN)
  };
}

function getGifMetadata(binaryData) {
  const dataView = toDataView(binaryData);
  const isGif = dataView.byteLength >= 10 && dataView.getUint32(0, BIG_ENDIAN) === 0x47494638;

  if (!isGif) {
    return null;
  }

  return {
    mimeType: 'image/gif',
    width: dataView.getUint16(6, LITTLE_ENDIAN),
    height: dataView.getUint16(8, LITTLE_ENDIAN)
  };
}

function getBmpMetadata(binaryData) {
  const dataView = toDataView(binaryData);
  const isBmp = dataView.byteLength >= 14 && dataView.getUint16(0, BIG_ENDIAN) === 0x424d && dataView.getUint32(2, LITTLE_ENDIAN) === dataView.byteLength;

  if (!isBmp) {
    return null;
  }

  return {
    mimeType: 'image/bmp',
    width: dataView.getUint32(18, LITTLE_ENDIAN),
    height: dataView.getUint32(22, LITTLE_ENDIAN)
  };
}

function getJpegMetadata(binaryData) {
  const dataView = toDataView(binaryData);
  const isJpeg = dataView.byteLength >= 3 && dataView.getUint16(0, BIG_ENDIAN) === 0xffd8 && dataView.getUint8(2) === 0xff;

  if (!isJpeg) {
    return null;
  }

  const {
    tableMarkers,
    sofMarkers
  } = getJpegMarkers();
  let i = 2;

  while (i + 9 < dataView.byteLength) {
    const marker = dataView.getUint16(i, BIG_ENDIAN);

    if (sofMarkers.has(marker)) {
      return {
        mimeType: 'image/jpeg',
        height: dataView.getUint16(i + 5, BIG_ENDIAN),
        width: dataView.getUint16(i + 7, BIG_ENDIAN)
      };
    }

    if (!tableMarkers.has(marker)) {
      return null;
    }

    i += 2;
    i += dataView.getUint16(i, BIG_ENDIAN);
  }

  return null;
}

function getJpegMarkers() {
  const tableMarkers = new Set([0xffdb, 0xffc4, 0xffcc, 0xffdd, 0xfffe]);

  for (let i = 0xffe0; i < 0xfff0; ++i) {
    tableMarkers.add(i);
  }

  const sofMarkers = new Set([0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf, 0xffde]);
  return {
    tableMarkers,
    sofMarkers
  };
}

function toDataView(data) {
  if (data instanceof DataView) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return new DataView(data.buffer);
  }

  if (data instanceof ArrayBuffer) {
    return new DataView(data);
  }

  throw new Error('toDataView');
}

async function parseToNodeImage(arrayBuffer, options) {
  const {
    mimeType
  } = getBinaryImageMetadata(arrayBuffer) || {};
  const _parseImageNode = globalThis._parseImageNode;
  assert$7(_parseImageNode);
  return await _parseImageNode(arrayBuffer, mimeType);
}

async function parseImage(arrayBuffer, options, context) {
  options = options || {};
  const imageOptions = options.image || {};
  const imageType = imageOptions.type || 'auto';
  const {
    url
  } = context || {};
  const loadType = getLoadableImageType(imageType);
  let image;

  switch (loadType) {
    case 'imagebitmap':
      image = await parseToImageBitmap(arrayBuffer, options, url);
      break;

    case 'image':
      image = await parseToImage(arrayBuffer, options, url);
      break;

    case 'data':
      image = await parseToNodeImage(arrayBuffer);
      break;

    default:
      assert$7(false);
  }

  if (imageType === 'data') {
    image = getImageData(image);
  }

  return image;
}

function getLoadableImageType(type) {
  switch (type) {
    case 'auto':
    case 'data':
      return getDefaultImageType();

    default:
      isImageTypeSupported(type);
      return type;
  }
}

const EXTENSIONS$1 = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg'];
const MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp', 'image/vnd.microsoft.icon', 'image/svg+xml'];
const DEFAULT_IMAGE_LOADER_OPTIONS = {
  image: {
    type: 'auto',
    decode: true
  }
};
const ImageLoader = {
  id: 'image',
  module: 'images',
  name: 'Images',
  version: VERSION,
  mimeTypes: MIME_TYPES,
  extensions: EXTENSIONS$1,
  parse: parseImage,
  tests: [arrayBuffer => Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)))],
  options: DEFAULT_IMAGE_LOADER_OPTIONS
};

const NODE_FORMAT_SUPPORT = ['image/png', 'image/jpeg', 'image/gif'];
const mimeTypeSupported = {};
function _isImageFormatSupported(mimeType) {
  if (mimeTypeSupported[mimeType] === undefined) {
    mimeTypeSupported[mimeType] = checkFormatSupport(mimeType);
  }

  return mimeTypeSupported[mimeType];
}

function checkFormatSupport(mimeType) {
  switch (mimeType) {
    case 'image/webp':
      return checkWebPSupport();

    case 'image/svg':
      return isBrowser$2;

    default:
      if (!isBrowser$2) {
        const {
          _parseImageNode
        } = globalThis;
        return Boolean(_parseImageNode) && NODE_FORMAT_SUPPORT.includes(mimeType);
      }

      return true;
  }
}

function checkWebPSupport() {
  if (!isBrowser$2) {
    return false;
  }

  try {
    const element = document.createElement('canvas');
    return element.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    return false;
  }
}

function assert$1(condition, message) {
  if (!condition) {
    throw new Error(message || 'assert failed: gltf');
  }
}

function resolveUrl(url, options) {
  const absolute = url.startsWith('data:') || url.startsWith('http:') || url.startsWith('https:');

  if (absolute) {
    return url;
  }

  const baseUrl = options.baseUri || options.uri;

  if (!baseUrl) {
    throw new Error("'baseUri' must be provided to resolve relative url ".concat(url));
  }

  return baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1) + url;
}

function getTypedArrayForBufferView(json, buffers, bufferViewIndex) {
  const bufferView = json.bufferViews[bufferViewIndex];
  assert$1(bufferView);
  const bufferIndex = bufferView.buffer;
  const binChunk = buffers[bufferIndex];
  assert$1(binChunk);
  const byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
  return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
}

const TYPES = ['SCALAR', 'VEC2', 'VEC3', 'VEC4'];
const ARRAY_CONSTRUCTOR_TO_WEBGL_CONSTANT = [[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126], [Float64Array, 5130]];
const ARRAY_TO_COMPONENT_TYPE = new Map(ARRAY_CONSTRUCTOR_TO_WEBGL_CONSTANT);
const ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
const ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function getAccessorTypeFromSize(size) {
  const type = TYPES[size - 1];
  return type || TYPES[0];
}
function getComponentTypeFromArray(typedArray) {
  const componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);

  if (!componentType) {
    throw new Error('Illegal typed array');
  }

  return componentType;
}
function getAccessorArrayTypeAndLength(accessor, bufferView) {
  const ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
  const components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
  const bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[accessor.componentType];
  const length = accessor.count * components;
  const byteLength = accessor.count * components * bytesPerComponent;
  assert$1(byteLength >= 0 && byteLength <= bufferView.byteLength);
  return {
    ArrayType,
    length,
    byteLength
  };
}

const DEFAULT_GLTF_JSON = {
  asset: {
    version: '2.0',
    generator: 'loaders.gl'
  },
  buffers: []
};
class GLTFScenegraph {
  constructor(gltf) {
    _defineProperty(this, "gltf", void 0);

    _defineProperty(this, "sourceBuffers", void 0);

    _defineProperty(this, "byteLength", void 0);

    this.gltf = gltf || {
      json: { ...DEFAULT_GLTF_JSON
      },
      buffers: []
    };
    this.sourceBuffers = [];
    this.byteLength = 0;

    if (this.gltf.buffers && this.gltf.buffers[0]) {
      this.byteLength = this.gltf.buffers[0].byteLength;
      this.sourceBuffers = [this.gltf.buffers[0]];
    }
  }

  get json() {
    return this.gltf.json;
  }

  getApplicationData(key) {
    const data = this.json[key];
    return data;
  }

  getExtraData(key) {
    const extras = this.json.extras || {};
    return extras[key];
  }

  getExtension(extensionName) {
    const isExtension = this.getUsedExtensions().find(name => name === extensionName);
    const extensions = this.json.extensions || {};
    return isExtension ? extensions[extensionName] || true : null;
  }

  getRequiredExtension(extensionName) {
    const isRequired = this.getRequiredExtensions().find(name => name === extensionName);
    return isRequired ? this.getExtension(extensionName) : null;
  }

  getRequiredExtensions() {
    return this.json.extensionsRequired || [];
  }

  getUsedExtensions() {
    return this.json.extensionsUsed || [];
  }

  getObjectExtension(object, extensionName) {
    const extensions = object.extensions || {};
    return extensions[extensionName];
  }

  getScene(index) {
    return this.getObject('scenes', index);
  }

  getNode(index) {
    return this.getObject('nodes', index);
  }

  getSkin(index) {
    return this.getObject('skins', index);
  }

  getMesh(index) {
    return this.getObject('meshes', index);
  }

  getMaterial(index) {
    return this.getObject('materials', index);
  }

  getAccessor(index) {
    return this.getObject('accessors', index);
  }

  getTexture(index) {
    return this.getObject('textures', index);
  }

  getSampler(index) {
    return this.getObject('samplers', index);
  }

  getImage(index) {
    return this.getObject('images', index);
  }

  getBufferView(index) {
    return this.getObject('bufferViews', index);
  }

  getBuffer(index) {
    return this.getObject('buffers', index);
  }

  getObject(array, index) {
    if (typeof index === 'object') {
      return index;
    }

    const object = this.json[array] && this.json[array][index];

    if (!object) {
      throw new Error("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
    }

    return object;
  }

  getTypedArrayForBufferView(bufferView) {
    bufferView = this.getBufferView(bufferView);
    const bufferIndex = bufferView.buffer;
    const binChunk = this.gltf.buffers[bufferIndex];
    assert$1(binChunk);
    const byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
    return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
  }

  getTypedArrayForAccessor(accessor) {
    accessor = this.getAccessor(accessor);
    const bufferView = this.getBufferView(accessor.bufferView);
    const buffer = this.getBuffer(bufferView.buffer);
    const arrayBuffer = buffer.data;
    const {
      ArrayType,
      length
    } = getAccessorArrayTypeAndLength(accessor, bufferView);
    const byteOffset = bufferView.byteOffset + accessor.byteOffset;
    return new ArrayType(arrayBuffer, byteOffset, length);
  }

  getTypedArrayForImageData(image) {
    image = this.getAccessor(image);
    const bufferView = this.getBufferView(image.bufferView);
    const buffer = this.getBuffer(bufferView.buffer);
    const arrayBuffer = buffer.data;
    const byteOffset = bufferView.byteOffset || 0;
    return new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
  }

  addApplicationData(key, data) {
    this.json[key] = data;
    return this;
  }

  addExtraData(key, data) {
    this.json.extras = this.json.extras || {};
    this.json.extras[key] = data;
    return this;
  }

  addObjectExtension(object, extensionName, data) {
    object.extensions = object.extensions || {};
    object.extensions[extensionName] = data;
    this.registerUsedExtension(extensionName);
    return this;
  }

  setObjectExtension(object, extensionName, data) {
    const extensions = object.extensions || {};
    extensions[extensionName] = data;
  }

  removeObjectExtension(object, extensionName) {
    const extensions = object.extensions || {};
    const extension = extensions[extensionName];
    delete extensions[extensionName];
    return extension;
  }

  addExtension(extensionName, extensionData = {}) {
    assert$1(extensionData);
    this.json.extensions = this.json.extensions || {};
    this.json.extensions[extensionName] = extensionData;
    this.registerUsedExtension(extensionName);
    return extensionData;
  }

  addRequiredExtension(extensionName, extensionData = {}) {
    assert$1(extensionData);
    this.addExtension(extensionName, extensionData);
    this.registerRequiredExtension(extensionName);
    return extensionData;
  }

  registerUsedExtension(extensionName) {
    this.json.extensionsUsed = this.json.extensionsUsed || [];

    if (!this.json.extensionsUsed.find(ext => ext === extensionName)) {
      this.json.extensionsUsed.push(extensionName);
    }
  }

  registerRequiredExtension(extensionName) {
    this.registerUsedExtension(extensionName);
    this.json.extensionsRequired = this.json.extensionsRequired || [];

    if (!this.json.extensionsRequired.find(ext => ext === extensionName)) {
      this.json.extensionsRequired.push(extensionName);
    }
  }

  removeExtension(extensionName) {
    if (this.json.extensionsRequired) {
      this._removeStringFromArray(this.json.extensionsRequired, extensionName);
    }

    if (this.json.extensionsUsed) {
      this._removeStringFromArray(this.json.extensionsUsed, extensionName);
    }

    if (this.json.extensions) {
      delete this.json.extensions[extensionName];
    }
  }

  setDefaultScene(sceneIndex) {
    this.json.scene = sceneIndex;
  }

  addScene(scene) {
    const {
      nodeIndices
    } = scene;
    this.json.scenes = this.json.scenes || [];
    this.json.scenes.push({
      nodes: nodeIndices
    });
    return this.json.scenes.length - 1;
  }

  addNode(node) {
    const {
      meshIndex,
      matrix
    } = node;
    this.json.nodes = this.json.nodes || [];
    const nodeData = {
      mesh: meshIndex
    };

    if (matrix) {
      nodeData.matrix = matrix;
    }

    this.json.nodes.push(nodeData);
    return this.json.nodes.length - 1;
  }

  addMesh(mesh) {
    const {
      attributes,
      indices,
      material,
      mode = 4
    } = mesh;

    const accessors = this._addAttributes(attributes);

    const glTFMesh = {
      primitives: [{
        attributes: accessors,
        mode
      }]
    };

    if (indices) {
      const indicesAccessor = this._addIndices(indices);

      glTFMesh.primitives[0].indices = indicesAccessor;
    }

    if (Number.isFinite(material)) {
      glTFMesh.primitives[0].material = material;
    }

    this.json.meshes = this.json.meshes || [];
    this.json.meshes.push(glTFMesh);
    return this.json.meshes.length - 1;
  }

  addPointCloud(attributes) {
    const accessorIndices = this._addAttributes(attributes);

    const glTFMesh = {
      primitives: [{
        attributes: accessorIndices,
        mode: 0
      }]
    };
    this.json.meshes = this.json.meshes || [];
    this.json.meshes.push(glTFMesh);
    return this.json.meshes.length - 1;
  }

  addImage(imageData, mimeTypeOpt) {
    const metadata = getBinaryImageMetadata(imageData);
    const mimeType = mimeTypeOpt || (metadata === null || metadata === void 0 ? void 0 : metadata.mimeType);
    const bufferViewIndex = this.addBufferView(imageData);
    const glTFImage = {
      bufferView: bufferViewIndex,
      mimeType
    };
    this.json.images = this.json.images || [];
    this.json.images.push(glTFImage);
    return this.json.images.length - 1;
  }

  addBufferView(buffer) {
    const byteLength = buffer.byteLength;
    assert$1(Number.isFinite(byteLength));
    this.sourceBuffers = this.sourceBuffers || [];
    this.sourceBuffers.push(buffer);
    const glTFBufferView = {
      buffer: 0,
      byteOffset: this.byteLength,
      byteLength
    };
    this.byteLength += padToNBytes(byteLength, 4);
    this.json.bufferViews = this.json.bufferViews || [];
    this.json.bufferViews.push(glTFBufferView);
    return this.json.bufferViews.length - 1;
  }

  addAccessor(bufferViewIndex, accessor) {
    const glTFAccessor = {
      bufferView: bufferViewIndex,
      type: getAccessorTypeFromSize(accessor.size),
      componentType: accessor.componentType,
      count: accessor.count,
      max: accessor.max,
      min: accessor.min
    };
    this.json.accessors = this.json.accessors || [];
    this.json.accessors.push(glTFAccessor);
    return this.json.accessors.length - 1;
  }

  addBinaryBuffer(sourceBuffer, accessor = {
    size: 3
  }) {
    const bufferViewIndex = this.addBufferView(sourceBuffer);
    let minMax = {
      min: accessor.min,
      max: accessor.max
    };

    if (!minMax.min || !minMax.max) {
      minMax = this._getAccessorMinMax(sourceBuffer, accessor.size);
    }

    const accessorDefaults = {
      size: accessor.size,
      componentType: getComponentTypeFromArray(sourceBuffer),
      count: Math.round(sourceBuffer.length / accessor.size),
      min: minMax.min,
      max: minMax.max
    };
    return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
  }

  addTexture(texture) {
    const {
      imageIndex
    } = texture;
    const glTFTexture = {
      source: imageIndex
    };
    this.json.textures = this.json.textures || [];
    this.json.textures.push(glTFTexture);
    return this.json.textures.length - 1;
  }

  addMaterial(pbrMaterialInfo) {
    this.json.materials = this.json.materials || [];
    this.json.materials.push(pbrMaterialInfo);
    return this.json.materials.length - 1;
  }

  createBinaryChunk() {
    var _this$json, _this$json$buffers;

    this.gltf.buffers = [];
    const totalByteLength = this.byteLength;
    const arrayBuffer = new ArrayBuffer(totalByteLength);
    const targetArray = new Uint8Array(arrayBuffer);
    let dstByteOffset = 0;

    for (const sourceBuffer of this.sourceBuffers || []) {
      dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
    }

    if ((_this$json = this.json) !== null && _this$json !== void 0 && (_this$json$buffers = _this$json.buffers) !== null && _this$json$buffers !== void 0 && _this$json$buffers[0]) {
      this.json.buffers[0].byteLength = totalByteLength;
    } else {
      this.json.buffers = [{
        byteLength: totalByteLength
      }];
    }

    this.gltf.binary = arrayBuffer;
    this.sourceBuffers = [arrayBuffer];
  }

  _removeStringFromArray(array, string) {
    let found = true;

    while (found) {
      const index = array.indexOf(string);

      if (index > -1) {
        array.splice(index, 1);
      } else {
        found = false;
      }
    }
  }

  _addAttributes(attributes = {}) {
    const result = {};

    for (const attributeKey in attributes) {
      const attributeData = attributes[attributeKey];

      const attrName = this._getGltfAttributeName(attributeKey);

      const accessor = this.addBinaryBuffer(attributeData.value, attributeData);
      result[attrName] = accessor;
    }

    return result;
  }

  _addIndices(indices) {
    return this.addBinaryBuffer(indices, {
      size: 1
    });
  }

  _getGltfAttributeName(attributeName) {
    switch (attributeName.toLowerCase()) {
      case 'position':
      case 'positions':
      case 'vertices':
        return 'POSITION';

      case 'normal':
      case 'normals':
        return 'NORMAL';

      case 'color':
      case 'colors':
        return 'COLOR_0';

      case 'texcoord':
      case 'texcoords':
        return 'TEXCOORD_0';

      default:
        return attributeName;
    }
  }

  _getAccessorMinMax(buffer, size) {
    const result = {
      min: null,
      max: null
    };

    if (buffer.length < size) {
      return result;
    }

    result.min = [];
    result.max = [];
    const initValues = buffer.subarray(0, size);

    for (const value of initValues) {
      result.min.push(value);
      result.max.push(value);
    }

    for (let index = size; index < buffer.length; index += size) {
      for (let componentIndex = 0; componentIndex < size; componentIndex++) {
        result.min[0 + componentIndex] = Math.min(result.min[0 + componentIndex], buffer[index + componentIndex]);
        result.max[0 + componentIndex] = Math.max(result.max[0 + componentIndex], buffer[index + componentIndex]);
      }
    }

    return result;
  }

}

const wasm_base = 'B9h9z9tFBBBF8fL9gBB9gLaaaaaFa9gEaaaB9gFaFa9gEaaaFaEMcBFFFGGGEIIILF9wFFFLEFBFKNFaFCx/IFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBF8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBGy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBEn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBIi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBKI9z9iqlBOc+x8ycGBM/qQFTa8jUUUUBCU/EBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAGTkUUUBRNCUoBAG9uC/wgBZHKCUGAKCUG9JyRVAECFJRICBRcGXEXAcAF9PQFAVAFAclAcAVJAF9JyRMGXGXAG9FQBAMCbJHKC9wZRSAKCIrCEJCGrRQANCUGJRfCBRbAIRTEXGXAOATlAQ9PQBCBRISEMATAQJRIGXAS9FQBCBRtCBREEXGXAOAIlCi9PQBCBRISLMANCU/CBJAEJRKGXGXGXGXGXATAECKrJ2BBAtCKZrCEZfIBFGEBMAKhB83EBAKCNJhB83EBSEMAKAI2BIAI2BBHmCKrHYAYCE6HYy86BBAKCFJAICIJAYJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCGJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCEJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCIJAYAmJHY2BBAI2BFHmCKrHPAPCE6HPy86BBAKCLJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCKJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCOJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCNJAYAmJHY2BBAI2BGHmCKrHPAPCE6HPy86BBAKCVJAYAPJHY2BBAmCIrCEZHPAPCE6HPy86BBAKCcJAYAPJHY2BBAmCGrCEZHPAPCE6HPy86BBAKCMJAYAPJHY2BBAmCEZHmAmCE6Hmy86BBAKCSJAYAmJHm2BBAI2BEHICKrHYAYCE6HYy86BBAKCQJAmAYJHm2BBAICIrCEZHYAYCE6HYy86BBAKCfJAmAYJHm2BBAICGrCEZHYAYCE6HYy86BBAKCbJAmAYJHK2BBAICEZHIAICE6HIy86BBAKAIJRISGMAKAI2BNAI2BBHmCIrHYAYCb6HYy86BBAKCFJAICNJAYJHY2BBAmCbZHmAmCb6Hmy86BBAKCGJAYAmJHm2BBAI2BFHYCIrHPAPCb6HPy86BBAKCEJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCIJAmAYJHm2BBAI2BGHYCIrHPAPCb6HPy86BBAKCLJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCKJAmAYJHm2BBAI2BEHYCIrHPAPCb6HPy86BBAKCOJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCNJAmAYJHm2BBAI2BIHYCIrHPAPCb6HPy86BBAKCVJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCcJAmAYJHm2BBAI2BLHYCIrHPAPCb6HPy86BBAKCMJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCSJAmAYJHm2BBAI2BKHYCIrHPAPCb6HPy86BBAKCQJAmAPJHm2BBAYCbZHYAYCb6HYy86BBAKCfJAmAYJHm2BBAI2BOHICIrHYAYCb6HYy86BBAKCbJAmAYJHK2BBAICbZHIAICb6HIy86BBAKAIJRISFMAKAI8pBB83BBAKCNJAICNJ8pBB83BBAICTJRIMAtCGJRtAECTJHEAS9JQBMMGXAIQBCBRISEMGXAM9FQBANAbJ2BBRtCBRKAfREEXAEANCU/CBJAKJ2BBHTCFrCBATCFZl9zAtJHt86BBAEAGJREAKCFJHKAM9HQBMMAfCFJRfAIRTAbCFJHbAG9HQBMMABAcAG9sJANCUGJAMAG9sTkUUUBpANANCUGJAMCaJAG9sJAGTkUUUBpMAMCBAIyAcJRcAIQBMC9+RKSFMCBC99AOAIlAGCAAGCA9Ly6yRKMALCU/EBJ8kUUUUBAKM+OmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUFT+JUUUBpALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM+lLKFaF99GaG99FaG99GXGXAGCI9HQBAF9FQFEXGXGX9DBBB8/9DBBB+/ABCGJHG1BB+yAB1BBHE+yHI+L+TABCFJHL1BBHK+yHO+L+THN9DBBBB9gHVyAN9DBB/+hANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE86BBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG86BBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG86BBABCIJRBAFCaJHFQBSGMMAF9FQBEXGXGX9DBBB8/9DBBB+/ABCIJHG8uFB+yAB8uFBHE+yHI+L+TABCGJHL8uFBHK+yHO+L+THN9DBBBB9gHVyAN9DB/+g6ANAN+U9DBBBBANAVyHcAc+MHMAECa3yAI+SHIAI+UAcAMAKCa3yAO+SHcAc+U+S+S+R+VHO+U+SHN+L9DBBB9P9d9FQBAN+oRESFMCUUUU94REMAGAE87FBGXGX9DBBB8/9DBBB+/Ac9DBBBB9gyAcAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMALAG87FBGXGX9DBBB8/9DBBB+/AI9DBBBB9gyAIAO+U+SHN+L9DBBB9P9d9FQBAN+oRGSFMCUUUU94RGMABAG87FBABCNJRBAFCaJHFQBMMM/SEIEaE99EaF99GXAF9FQBCBREABRIEXGXGX9D/zI818/AICKJ8uFBHLCEq+y+VHKAI8uFB+y+UHO9DB/+g6+U9DBBB8/9DBBB+/AO9DBBBB9gy+SHN+L9DBBB9P9d9FQBAN+oRVSFMCUUUU94RVMAICIJ8uFBRcAICGJ8uFBRMABALCFJCEZAEqCFWJAV87FBGXGXAKAM+y+UHN9DB/+g6+U9DBBB8/9DBBB+/AN9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRMSFMCUUUU94RMMABALCGJCEZAEqCFWJAM87FBGXGXAKAc+y+UHK9DB/+g6+U9DBBB8/9DBBB+/AK9DBBBB9gy+SHS+L9DBBB9P9d9FQBAS+oRcSFMCUUUU94RcMABALCaJCEZAEqCFWJAc87FBGXGX9DBBU8/AOAO+U+TANAN+U+TAKAK+U+THO9DBBBBAO9DBBBB9gy+R9DB/+g6+U9DBBB8/+SHO+L9DBBB9P9d9FQBAO+oRcSFMCUUUU94RcMABALCEZAEqCFWJAc87FBAICNJRIAECIJREAFCaJHFQBMMM9JBGXAGCGrAF9sHF9FQBEXABAB8oGBHGCNWCN91+yAGCi91CnWCUUU/8EJ+++U84GBABCIJRBAFCaJHFQBMMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEM/lFFFaGXGXAFABqCEZ9FQBABRESFMGXGXAGCT9PQBABRESFMABREEXAEAF8oGBjGBAECIJAFCIJ8oGBjGBAECNJAFCNJ8oGBjGBAECSJAFCSJ8oGBjGBAECTJREAFCTJRFAGC9wJHGCb9LQBMMAGCI9JQBEXAEAF8oGBjGBAFCIJRFAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF2BB86BBAECFJREAFCFJRFAGCaJHGQBMMABMoFFGaGXGXABCEZ9FQBABRESFMAFCgFZC+BwsN9sRIGXGXAGCT9PQBABRESFMABREEXAEAIjGBAECSJAIjGBAECNJAIjGBAECIJAIjGBAECTJREAGC9wJHGCb9LQBMMAGCI9JQBEXAEAIjGBAECIJREAGC98JHGCE9LQBMMGXAG9FQBEXAEAF86BBAECFJREAGCaJHGQBMMABMMMFBCUNMIT9kBB';
const wasm_simd = 'B9h9z9tFBBBF8dL9gBB9gLaaaaaFa9gEaaaB9gGaaB9gFaFaEQSBBFBFFGEGEGIILF9wFFFLEFBFKNFaFCx/aFMO/LFVK9tv9t9vq95GBt9f9f939h9z9t9f9j9h9s9s9f9jW9vq9zBBp9tv9z9o9v9wW9f9kv9j9v9kv9WvqWv94h919m9mvqBG8Z9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv94h919m9mvqBIy9tv9z9o9v9wW9f9kv9j9v9kv9J9u9kv949TvZ91v9u9jvBLn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9P9jWBKi9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9R919hWBNn9tv9z9o9v9wW9f9kv9j9v9kv69p9sWvq9F949wBcI9z9iqlBMc/j9JSIBTEM9+FLa8jUUUUBCTlRBCBRFEXCBRGCBREEXABCNJAGJAECUaAFAGrCFZHIy86BBAEAIJREAGCFJHGCN9HQBMAFCx+YUUBJAE86BBAFCEWCxkUUBJAB8pEN83EBAFCFJHFCUG9HQBMMkRIbaG97FaK978jUUUUBCU/KBlHL8kUUUUBC9+RKGXAGCFJAI9LQBCaRKAE2BBC+gF9HQBALAEAIJHOAGlAG/8cBBCUoBAG9uC/wgBZHKCUGAKCUG9JyRNAECFJRKCBRVGXEXAVAF9PQFANAFAVlAVANJAF9JyRcGXGXAG9FQBAcCbJHIC9wZHMCE9sRSAMCFWRQAICIrCEJCGrRfCBRbEXAKRTCBRtGXEXGXAOATlAf9PQBCBRKSLMALCU/CBJAtAM9sJRmATAfJRKCBREGXAMCoB9JQBAOAKlC/gB9JQBCBRIEXAmAIJREGXGXGXGXGXATAICKrJ2BBHYCEZfIBFGEBMAECBDtDMIBSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAEAKDBBBDMIBAKCTJRKMGXGXGXGXGXAYCGrCEZfIBFGEBMAECBDtDMITSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMITAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAEAKDBBBDMITAKCTJRKMGXGXGXGXGXAYCIrCEZfIBFGEBMAECBDtDMIASEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIAAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAEAKDBBBDMIAAKCTJRKMGXGXGXGXGXAYCKrfIBFGEBMAECBDtDMI8wSEMAEAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCIJAnDeBJAYCx+YUUBJ2BBJRKSGMAEAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBAYCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HYCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMI8wAKCNJAnDeBJAYCx+YUUBJ2BBJRKSFMAEAKDBBBDMI8wAKCTJRKMAICoBJREAICUFJAM9LQFAERIAOAKlC/fB9LQBMMGXAEAM9PQBAECErRIEXGXAOAKlCi9PQBCBRKSOMAmAEJRYGXGXGXGXGXATAECKrJ2BBAICKZrCEZfIBFGEBMAYCBDtDMIBSEMAYAKDBBIAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnHPCGD+MFAPDQBTFtGmEYIPLdKeOnC0+G+MiDtD9OHdCEDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCIJAnDeBJAeCx+YUUBJ2BBJRKSGMAYAKDBBNAKDBBBHPCID+MFAPDQBTFtGmEYIPLdKeOnC+P+e+8/4BDtD9OHdCbDbD8jHPD8dBhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBAeCx+YUUBJDBBBHnAnDQBBBBBBBBBBBBBBBBAPD8dFhUg/8/4/w/goB9+h84k7HeCEWCxkUUBJDBEBD9uDQBFGEILKOTtmYPdenDfAdAPD9SDMIBAKCNJAnDeBJAeCx+YUUBJ2BBJRKSFMAYAKDBBBDMIBAKCTJRKMAICGJRIAECTJHEAM9JQBMMGXAK9FQBAKRTAtCFJHtCI6QGSFMMCBRKSEMGXAM9FQBALCUGJAbJREALAbJDBGBRnCBRYEXAEALCU/CBJAYJHIDBIBHdCFD9tAdCFDbHPD9OD9hD9RHdAIAMJDBIBHiCFD9tAiAPD9OD9hD9RHiDQBTFtGmEYIPLdKeOnH8ZAIAQJDBIBHpCFD9tApAPD9OD9hD9RHpAIASJDBIBHyCFD9tAyAPD9OD9hD9RHyDQBTFtGmEYIPLdKeOnH8cDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGEAnD9uHnDyBjGBAEAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJHIAnA8ZA8cDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHnDyBjGBAIAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJHIAnAdAiDQNiV8ZcpMyS8cQ8df8eb8fHdApAyDQNiV8ZcpMyS8cQ8df8eb8fHiDQBFTtGEmYILPdKOenHPAPDQBFGEBFGEBFGEBFGED9uHnDyBjGBAIAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJHIAnAdAiDQNVi8ZcMpySQ8c8dfb8e8fHPAPDQBFGEBFGEBFGEBFGED9uHnDyBjGBAIAGJHIAnAPAPDQILKOILKOILKOILKOD9uHnDyBjGBAIAGJHIAnAPAPDQNVcMNVcMNVcMNVcMD9uHnDyBjGBAIAGJHIAnAPAPDQSQfbSQfbSQfbSQfbD9uHnDyBjGBAIAGJREAYCTJHYAM9JQBMMAbCIJHbAG9JQBMMABAVAG9sJALCUGJAcAG9s/8cBBALALCUGJAcCaJAG9sJAG/8cBBMAcCBAKyAVJRVAKQBMC9+RKSFMCBC99AOAKlAGCAAGCA9Ly6yRKMALCU/KBJ8kUUUUBAKMNBT+BUUUBM+KmFTa8jUUUUBCoFlHL8kUUUUBC9+RKGXAFCE9uHOCtJAI9LQBCaRKAE2BBHNC/wFZC/gF9HQBANCbZHVCF9LQBALCoBJCgFCUF/8MBALC84Jha83EBALC8wJha83EBALC8oJha83EBALCAJha83EBALCiJha83EBALCTJha83EBALha83ENALha83EBAEAIJC9wJRcAECFJHNAOJRMGXAF9FQBCQCbAVCF6yRSABRECBRVCBRQCBRfCBRICBRKEXGXAMAcuQBC9+RKSEMGXGXAN2BBHOC/vF9LQBALCoBJAOCIrCa9zAKJCbZCEWJHb8oGIRTAb8oGBRtGXAOCbZHbAS9PQBALAOCa9zAIJCbZCGWJ8oGBAVAbyROAb9FRbGXGXAGCG9HQBABAt87FBABCIJAO87FBABCGJAT87FBSFMAEAtjGBAECNJAOjGBAECIJATjGBMAVAbJRVALCoBJAKCEWJHmAOjGBAmATjGIALAICGWJAOjGBALCoBJAKCFJCbZHKCEWJHTAtjGBATAOjGIAIAbJRIAKCFJRKSGMGXGXAbCb6QBAQAbJAbC989zJCFJRQSFMAM1BBHbCgFZROGXGXAbCa9MQBAMCFJRMSFMAM1BFHbCgBZCOWAOCgBZqROGXAbCa9MQBAMCGJRMSFMAM1BGHbCgBZCfWAOqROGXAbCa9MQBAMCEJRMSFMAM1BEHbCgBZCdWAOqROGXAbCa9MQBAMCIJRMSFMAM2BIC8cWAOqROAMCLJRMMAOCFrCBAOCFZl9zAQJRQMGXGXAGCG9HQBABAt87FBABCIJAQ87FBABCGJAT87FBSFMAEAtjGBAECNJAQjGBAECIJATjGBMALCoBJAKCEWJHOAQjGBAOATjGIALAICGWJAQjGBALCoBJAKCFJCbZHKCEWJHOAtjGBAOAQjGIAICFJRIAKCFJRKSFMGXAOCDF9LQBALAIAcAOCbZJ2BBHbCIrHTlCbZCGWJ8oGBAVCFJHtATyROALAIAblCbZCGWJ8oGBAtAT9FHmJHtAbCbZHTyRbAT9FRTGXGXAGCG9HQBABAV87FBABCIJAb87FBABCGJAO87FBSFMAEAVjGBAECNJAbjGBAECIJAOjGBMALAICGWJAVjGBALCoBJAKCEWJHYAOjGBAYAVjGIALAICFJHICbZCGWJAOjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAIAmJCbZHICGWJAbjGBALCoBJAKCGJCbZHKCEWJHOAVjGBAOAbjGIAKCFJRKAIATJRIAtATJRVSFMAVCBAM2BBHYyHTAOC/+F6HPJROAYCbZRtGXGXAYCIrHmQBAOCFJRbSFMAORbALAIAmlCbZCGWJ8oGBROMGXGXAtQBAbCFJRVSFMAbRVALAIAYlCbZCGWJ8oGBRbMGXGXAP9FQBAMCFJRYSFMAM1BFHYCgFZRTGXGXAYCa9MQBAMCGJRYSFMAM1BGHYCgBZCOWATCgBZqRTGXAYCa9MQBAMCEJRYSFMAM1BEHYCgBZCfWATqRTGXAYCa9MQBAMCIJRYSFMAM1BIHYCgBZCdWATqRTGXAYCa9MQBAMCLJRYSFMAMCKJRYAM2BLC8cWATqRTMATCFrCBATCFZl9zAQJHQRTMGXGXAmCb6QBAYRPSFMAY1BBHMCgFZROGXGXAMCa9MQBAYCFJRPSFMAY1BFHMCgBZCOWAOCgBZqROGXAMCa9MQBAYCGJRPSFMAY1BGHMCgBZCfWAOqROGXAMCa9MQBAYCEJRPSFMAY1BEHMCgBZCdWAOqROGXAMCa9MQBAYCIJRPSFMAYCLJRPAY2BIC8cWAOqROMAOCFrCBAOCFZl9zAQJHQROMGXGXAtCb6QBAPRMSFMAP1BBHMCgFZRbGXGXAMCa9MQBAPCFJRMSFMAP1BFHMCgBZCOWAbCgBZqRbGXAMCa9MQBAPCGJRMSFMAP1BGHMCgBZCfWAbqRbGXAMCa9MQBAPCEJRMSFMAP1BEHMCgBZCdWAbqRbGXAMCa9MQBAPCIJRMSFMAPCLJRMAP2BIC8cWAbqRbMAbCFrCBAbCFZl9zAQJHQRbMGXGXAGCG9HQBABAT87FBABCIJAb87FBABCGJAO87FBSFMAEATjGBAECNJAbjGBAECIJAOjGBMALCoBJAKCEWJHYAOjGBAYATjGIALAICGWJATjGBALCoBJAKCFJCbZCEWJHYAbjGBAYAOjGIALAICFJHICbZCGWJAOjGBALCoBJAKCGJCbZCEWJHOATjGBAOAbjGIALAIAm9FAmCb6qJHICbZCGWJAbjGBAIAt9FAtCb6qJRIAKCEJRKMANCFJRNABCKJRBAECSJREAKCbZRKAICbZRIAfCEJHfAF9JQBMMCBC99AMAc6yRKMALCoFJ8kUUUUBAKM/tIFGa8jUUUUBCTlRLC9+RKGXAFCLJAI9LQBCaRKAE2BBC/+FZC/QF9HQBALhB83ENAECFJRKAEAIJC98JREGXAF9FQBGXAGCG6QBEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMALCNJAICFZCGWqHGAICGrCBAICFrCFZl9zAG8oGBJHIjGBABAIjGBABCIJRBAFCaJHFQBSGMMEXGXAKAE9JQBC9+bMAK1BBHGCgFZRIGXGXAGCa9MQBAKCFJRKSFMAK1BFHGCgBZCOWAICgBZqRIGXAGCa9MQBAKCGJRKSFMAK1BGHGCgBZCfWAIqRIGXAGCa9MQBAKCEJRKSFMAK1BEHGCgBZCdWAIqRIGXAGCa9MQBAKCIJRKSFMAK2BIC8cWAIqRIAKCLJRKMABAICGrCBAICFrCFZl9zALCNJAICFZCGWqHI8oGBJHG87FBAIAGjGBABCGJRBAFCaJHFQBMMCBC99AKAE6yRKMAKM/xLGEaK978jUUUUBCAlHE8kUUUUBGXGXAGCI9HQBGXAFC98ZHI9FQBABRGCBRLEXAGAGDBBBHKCiD+rFCiD+sFD/6FHOAKCND+rFCiD+sFD/6FAOD/gFAKCTD+rFCiD+sFD/6FHND/gFD/kFD/lFHVCBDtD+2FHcAOCUUUU94DtHMD9OD9RD/kFHO9DBB/+hDYAOAOD/mFAVAVD/mFANAcANAMD9OD9RD/kFHOAOD/mFD/kFD/kFD/jFD/nFHND/mF9DBBX9LDYHcD/kFCgFDtD9OAKCUUU94DtD9OD9QAOAND/mFAcD/kFCND+rFCU/+EDtD9OD9QAVAND/mFAcD/kFCTD+rFCUU/8ODtD9OD9QDMBBAGCTJRGALCIJHLAI9JQBMMAIAF9PQFAEAFCEZHLCGWHGqCBCTAGl/8MBAEABAICGWJHIAG/8cBBGXAL9FQBAEAEDBIBHKCiD+rFCiD+sFD/6FHOAKCND+rFCiD+sFD/6FAOD/gFAKCTD+rFCiD+sFD/6FHND/gFD/kFD/lFHVCBDtD+2FHcAOCUUUU94DtHMD9OD9RD/kFHO9DBB/+hDYAOAOD/mFAVAVD/mFANAcANAMD9OD9RD/kFHOAOD/mFD/kFD/kFD/jFD/nFHND/mF9DBBX9LDYHcD/kFCgFDtD9OAKCUUU94DtD9OD9QAOAND/mFAcD/kFCND+rFCU/+EDtD9OD9QAVAND/mFAcD/kFCTD+rFCUU/8ODtD9OD9QDMIBMAIAEAG/8cBBSFMABAFC98ZHGT+HUUUBAGAF9PQBAEAFCEZHICEWHLJCBCAALl/8MBAEABAGCEWJHGAL/8cBBAEAIT+HUUUBAGAEAL/8cBBMAECAJ8kUUUUBM+yEGGaO97GXAF9FQBCBRGEXABCTJHEAEDBBBHICBDtHLCUU98D8cFCUU98D8cEHKD9OABDBBBHOAIDQILKOSQfbPden8c8d8e8fCggFDtD9OD/6FAOAIDQBFGENVcMTtmYi8ZpyHICTD+sFD/6FHND/gFAICTD+rFCTD+sFD/6FHVD/gFD/kFD/lFHI9DB/+g6DYAVAIALD+2FHLAVCUUUU94DtHcD9OD9RD/kFHVAVD/mFAIAID/mFANALANAcD9OD9RD/kFHIAID/mFD/kFD/kFD/jFD/nFHND/mF9DBBX9LDYHLD/kFCTD+rFAVAND/mFALD/kFCggEDtD9OD9QHVAIAND/mFALD/kFCaDbCBDnGCBDnECBDnKCBDnOCBDncCBDnMCBDnfCBDnbD9OHIDQNVi8ZcMpySQ8c8dfb8e8fD9QDMBBABAOAKD9OAVAIDQBFTtGEmYILPdKOenD9QDMBBABCAJRBAGCIJHGAF9JQBMMM94FEa8jUUUUBCAlHE8kUUUUBABAFC98ZHIT+JUUUBGXAIAF9PQBAEAFCEZHLCEWHFJCBCAAFl/8MBAEABAICEWJHBAF/8cBBAEALT+JUUUBABAEAF/8cBBMAECAJ8kUUUUBM/hEIGaF97FaL978jUUUUBCTlRGGXAF9FQBCBREEXAGABDBBBHIABCTJHLDBBBHKDQILKOSQfbPden8c8d8e8fHOCTD+sFHNCID+rFDMIBAB9DBBU8/DY9D/zI818/DYANCEDtD9QD/6FD/nFHNAIAKDQBFGENVcMTtmYi8ZpyHICTD+rFCTD+sFD/6FD/mFHKAKD/mFANAICTD+sFD/6FD/mFHVAVD/mFANAOCTD+rFCTD+sFD/6FD/mFHOAOD/mFD/kFD/kFD/lFCBDtD+4FD/jF9DB/+g6DYHND/mF9DBBX9LDYHID/kFCggEDtHcD9OAVAND/mFAID/kFCTD+rFD9QHVAOAND/mFAID/kFCTD+rFAKAND/mFAID/kFAcD9OD9QHNDQBFTtGEmYILPdKOenHID8dBAGDBIBDyB+t+J83EBABCNJAID8dFAGDBIBDyF+t+J83EBALAVANDQNVi8ZcMpySQ8c8dfb8e8fHND8dBAGDBIBDyG+t+J83EBABCiJAND8dFAGDBIBDyE+t+J83EBABCAJRBAECIJHEAF9JQBMMM/3FGEaF978jUUUUBCoBlREGXAGCGrAF9sHIC98ZHL9FQBCBRGABRFEXAFAFDBBBHKCND+rFCND+sFD/6FAKCiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMBBAFCTJRFAGCIJHGAL9JQBMMGXALAI9PQBAEAICEZHGCGWHFqCBCoBAFl/8MBAEABALCGWJHLAF/8cBBGXAG9FQBAEAEDBIBHKCND+rFCND+sFD/6FAKCiD+sFCnD+rFCUUU/8EDtD+uFD/mFDMIBMALAEAF/8cBBMM9TFEaCBCB8oGUkUUBHFABCEJC98ZJHBjGUkUUBGXGXAB8/BCTWHGuQBCaREABAGlCggEJCTrXBCa6QFMAFREMAEMMMFBCUNMIT9tBB';
const detector = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]);
const wasmpack = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]);
const FILTERS = {
  0: '',
  1: 'meshopt_decodeFilterOct',
  2: 'meshopt_decodeFilterQuat',
  3: 'meshopt_decodeFilterExp',
  NONE: '',
  OCTAHEDRAL: 'meshopt_decodeFilterOct',
  QUATERNION: 'meshopt_decodeFilterQuat',
  EXPONENTIAL: 'meshopt_decodeFilterExp'
};
const DECODERS = {
  0: 'meshopt_decodeVertexBuffer',
  1: 'meshopt_decodeIndexBuffer',
  2: 'meshopt_decodeIndexSequence',
  ATTRIBUTES: 'meshopt_decodeVertexBuffer',
  TRIANGLES: 'meshopt_decodeIndexBuffer',
  INDICES: 'meshopt_decodeIndexSequence'
};
async function meshoptDecodeGltfBuffer(target, count, size, source, mode, filter = 'NONE') {
  const instance = await loadWasmInstance();
  decode$5(instance, instance.exports[DECODERS[mode]], target, count, size, source, instance.exports[FILTERS[filter || 'NONE']]);
}
let wasmPromise;

async function loadWasmInstance() {
  if (!wasmPromise) {
    wasmPromise = loadWasmModule();
  }

  return wasmPromise;
}

async function loadWasmModule() {
  let wasm = wasm_base;

  if (WebAssembly.validate(detector)) {
    wasm = wasm_simd;
    console.log('Warning: meshopt_decoder is using experimental SIMD support');
  }

  const result = await WebAssembly.instantiate(unpack(wasm), {});
  await result.instance.exports.__wasm_call_ctors();
  return result.instance;
}

function unpack(data) {
  const result = new Uint8Array(data.length);

  for (let i = 0; i < data.length; ++i) {
    const ch = data.charCodeAt(i);
    result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
  }

  let write = 0;

  for (let i = 0; i < data.length; ++i) {
    result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
  }

  return result.buffer.slice(0, write);
}

function decode$5(instance, fun, target, count, size, source, filter) {
  const sbrk = instance.exports.sbrk;
  const count4 = count + 3 & ~3;
  const tp = sbrk(count4 * size);
  const sp = sbrk(source.length);
  const heap = new Uint8Array(instance.exports.memory.buffer);
  heap.set(source, sp);
  const res = fun(tp, count, size, sp, source.length);

  if (res === 0 && filter) {
    filter(tp, count4, size);
  }

  target.set(heap.subarray(tp, tp + count * size));
  sbrk(tp - sbrk(0));

  if (res !== 0) {
    throw new Error("Malformed buffer data: ".concat(res));
  }
}

const EXT_MESHOPT_COMPRESSION = 'EXT_meshopt_compression';
const name$6 = EXT_MESHOPT_COMPRESSION;
async function decode$4(gltfData, options) {
  var _options$gltf;

  const scenegraph = new GLTFScenegraph(gltfData);

  if (!(options !== null && options !== void 0 && (_options$gltf = options.gltf) !== null && _options$gltf !== void 0 && _options$gltf.decompressMeshes)) {
    return;
  }

  const promises = [];

  for (const bufferViewIndex of gltfData.json.bufferViews || []) {
    promises.push(decodeMeshoptBufferView(scenegraph, bufferViewIndex));
  }

  await Promise.all(promises);
  scenegraph.removeExtension(EXT_MESHOPT_COMPRESSION);
}

async function decodeMeshoptBufferView(scenegraph, bufferView) {
  const meshoptExtension = scenegraph.getObjectExtension(bufferView, EXT_MESHOPT_COMPRESSION);

  if (meshoptExtension) {
    const {
      byteOffset = 0,
      byteLength = 0,
      byteStride,
      count,
      mode,
      filter = 'NONE',
      buffer: bufferIndex
    } = meshoptExtension;
    const buffer = scenegraph.gltf.buffers[bufferIndex];
    const source = new Uint8Array(buffer.arrayBuffer, buffer.byteOffset + byteOffset, byteLength);
    const result = new Uint8Array(scenegraph.gltf.buffers[bufferView.buffer].arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
    await meshoptDecodeGltfBuffer(result, count, byteStride, source, mode, filter);
    return result;
  }

  return null;
}

var EXT_meshopt_compression = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$6,
    decode: decode$4
});

const EXT_TEXTURE_WEBP = 'EXT_texture_webp';
const name$5 = EXT_TEXTURE_WEBP;
function preprocess$3(gltfData, options) {
  const scenegraph = new GLTFScenegraph(gltfData);

  if (!_isImageFormatSupported('image/webp')) {
    if (scenegraph.getRequiredExtensions().includes(EXT_TEXTURE_WEBP)) {
      throw new Error("gltf: Required extension ".concat(EXT_TEXTURE_WEBP, " not supported by browser"));
    }

    return;
  }

  const {
    json
  } = scenegraph;

  for (const texture of json.textures || []) {
    const extension = scenegraph.getObjectExtension(texture, EXT_TEXTURE_WEBP);

    if (extension) {
      texture.source = extension.source;
    }

    scenegraph.removeObjectExtension(texture, EXT_TEXTURE_WEBP);
  }

  scenegraph.removeExtension(EXT_TEXTURE_WEBP);
}

var EXT_texture_webp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$5,
    preprocess: preprocess$3
});

const KHR_TEXTURE_BASISU = 'KHR_texture_basisu';
const name$4 = KHR_TEXTURE_BASISU;
function preprocess$2(gltfData, options) {
  const scene = new GLTFScenegraph(gltfData);
  const {
    json
  } = scene;

  for (const texture of json.textures || []) {
    const extension = scene.getObjectExtension(texture, KHR_TEXTURE_BASISU);

    if (extension) {
      texture.source = extension.source;
    }

    scene.removeObjectExtension(texture, KHR_TEXTURE_BASISU);
  }

  scene.removeExtension(KHR_TEXTURE_BASISU);
}

var KHR_texture_basisu = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$4,
    preprocess: preprocess$2
});

function getGLTFAccessors(attributes) {
  const accessors = {};

  for (const name in attributes) {
    const attribute = attributes[name];

    if (name !== 'indices') {
      const glTFAccessor = getGLTFAccessor(attribute);
      accessors[name] = glTFAccessor;
    }
  }

  return accessors;
}
function getGLTFAccessor(attribute) {
  const {
    buffer,
    size,
    count
  } = getAccessorData(attribute);
  const glTFAccessor = {
    value: buffer,
    size,
    byteOffset: 0,
    count,
    type: getAccessorTypeFromSize(size),
    componentType: getComponentTypeFromArray(buffer)
  };
  return glTFAccessor;
}

function getAccessorData(attribute) {
  let buffer = attribute;
  let size = 1;
  let count = 0;

  if (attribute && attribute.value) {
    buffer = attribute.value;
    size = attribute.size || 1;
  }

  if (buffer) {
    if (!ArrayBuffer.isView(buffer)) {
      buffer = toTypedArray(buffer, Float32Array);
    }

    count = buffer.length / size;
  }

  return {
    buffer,
    size,
    count
  };
}

function toTypedArray(array, ArrayType, convertTypedArrays = false) {
  if (!array) {
    return null;
  }

  if (Array.isArray(array)) {
    return new ArrayType(array);
  }

  if (convertTypedArrays && !(array instanceof ArrayType)) {
    return new ArrayType(array);
  }

  return array;
}

const KHR_DRACO_MESH_COMPRESSION = 'KHR_draco_mesh_compression';
const name$3 = KHR_DRACO_MESH_COMPRESSION;
function preprocess$1(gltfData, options, context) {
  const scenegraph = new GLTFScenegraph(gltfData);

  for (const primitive of makeMeshPrimitiveIterator(scenegraph)) {
    if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) ;
  }
}
async function decode$3(gltfData, options, context) {
  var _options$gltf;

  if (!(options !== null && options !== void 0 && (_options$gltf = options.gltf) !== null && _options$gltf !== void 0 && _options$gltf.decompressMeshes)) {
    return;
  }

  const scenegraph = new GLTFScenegraph(gltfData);
  const promises = [];

  for (const primitive of makeMeshPrimitiveIterator(scenegraph)) {
    if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
      promises.push(decompressPrimitive(scenegraph, primitive, options, context));
    }
  }

  await Promise.all(promises);
  scenegraph.removeExtension(KHR_DRACO_MESH_COMPRESSION);
}
function encode$3(gltfData, options = {}) {
  const scenegraph = new GLTFScenegraph(gltfData);

  for (const mesh of scenegraph.json.meshes || []) {
    compressMesh(mesh);
    scenegraph.addRequiredExtension(KHR_DRACO_MESH_COMPRESSION);
  }
}

async function decompressPrimitive(scenegraph, primitive, options, context) {
  const dracoExtension = scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION);

  if (!dracoExtension) {
    return;
  }

  const buffer = scenegraph.getTypedArrayForBufferView(dracoExtension.bufferView);
  const bufferCopy = sliceArrayBuffer(buffer.buffer, buffer.byteOffset);
  const {
    parse
  } = context;
  const dracoOptions = { ...options
  };
  delete dracoOptions['3d-tiles'];
  const decodedData = await parse(bufferCopy, DracoLoader, dracoOptions, context);
  const decodedAttributes = getGLTFAccessors(decodedData.attributes);

  for (const [attributeName, decodedAttribute] of Object.entries(decodedAttributes)) {
    if (attributeName in primitive.attributes) {
      const accessorIndex = primitive.attributes[attributeName];
      const accessor = scenegraph.getAccessor(accessorIndex);

      if (accessor !== null && accessor !== void 0 && accessor.min && accessor !== null && accessor !== void 0 && accessor.max) {
        decodedAttribute.min = accessor.min;
        decodedAttribute.max = accessor.max;
      }
    }
  }

  primitive.attributes = decodedAttributes;

  if (decodedData.indices) {
    primitive.indices = getGLTFAccessor(decodedData.indices);
  }

  checkPrimitive(primitive);
}

function compressMesh(attributes, indices, mode = 4, options, context) {
  var _context$parseSync;

  if (!options.DracoWriter) {
    throw new Error('options.gltf.DracoWriter not provided');
  }

  const compressedData = options.DracoWriter.encodeSync({
    attributes
  });
  const decodedData = context === null || context === void 0 ? void 0 : (_context$parseSync = context.parseSync) === null || _context$parseSync === void 0 ? void 0 : _context$parseSync.call(context, {
    attributes
  });

  const fauxAccessors = options._addFauxAttributes(decodedData.attributes);

  const bufferViewIndex = options.addBufferView(compressedData);
  const glTFMesh = {
    primitives: [{
      attributes: fauxAccessors,
      mode,
      extensions: {
        [KHR_DRACO_MESH_COMPRESSION]: {
          bufferView: bufferViewIndex,
          attributes: fauxAccessors
        }
      }
    }]
  };
  return glTFMesh;
}

function checkPrimitive(primitive) {
  if (!primitive.attributes && Object.keys(primitive.attributes).length > 0) {
    throw new Error('glTF: Empty primitive detected: Draco decompression failure?');
  }
}

function* makeMeshPrimitiveIterator(scenegraph) {
  for (const mesh of scenegraph.json.meshes || []) {
    for (const primitive of mesh.primitives) {
      yield primitive;
    }
  }
}

var KHR_draco_mesh_compression = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$3,
    preprocess: preprocess$1,
    decode: decode$3,
    encode: encode$3
});

const KHR_LIGHTS_PUNCTUAL = 'KHR_lights_punctual';
const name$2 = KHR_LIGHTS_PUNCTUAL;
async function decode$2(gltfData) {
  const gltfScenegraph = new GLTFScenegraph(gltfData);
  const {
    json
  } = gltfScenegraph;
  const extension = gltfScenegraph.getExtension(KHR_LIGHTS_PUNCTUAL);

  if (extension) {
    gltfScenegraph.json.lights = extension.lights;
    gltfScenegraph.removeExtension(KHR_LIGHTS_PUNCTUAL);
  }

  for (const node of json.nodes || []) {
    const nodeExtension = gltfScenegraph.getObjectExtension(node, KHR_LIGHTS_PUNCTUAL);

    if (nodeExtension) {
      node.light = nodeExtension.light;
    }

    gltfScenegraph.removeObjectExtension(node, KHR_LIGHTS_PUNCTUAL);
  }
}
async function encode$2(gltfData) {
  const gltfScenegraph = new GLTFScenegraph(gltfData);
  const {
    json
  } = gltfScenegraph;

  if (json.lights) {
    const extension = gltfScenegraph.addExtension(KHR_LIGHTS_PUNCTUAL);
    assert$1(!extension.lights);
    extension.lights = json.lights;
    delete json.lights;
  }

  if (gltfScenegraph.json.lights) {
    for (const light of gltfScenegraph.json.lights) {
      const node = light.node;
      gltfScenegraph.addObjectExtension(node, KHR_LIGHTS_PUNCTUAL, light);
    }

    delete gltfScenegraph.json.lights;
  }
}

var KHR_lights_punctual = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$2,
    decode: decode$2,
    encode: encode$2
});

const KHR_MATERIALS_UNLIT = 'KHR_materials_unlit';
const name$1 = KHR_MATERIALS_UNLIT;
async function decode$1(gltfData) {
  const gltfScenegraph = new GLTFScenegraph(gltfData);
  const {
    json
  } = gltfScenegraph;
  gltfScenegraph.removeExtension(KHR_MATERIALS_UNLIT);

  for (const material of json.materials || []) {
    const extension = material.extensions && material.extensions.KHR_materials_unlit;

    if (extension) {
      material.unlit = true;
    }

    gltfScenegraph.removeObjectExtension(material, KHR_MATERIALS_UNLIT);
  }
}
function encode$1(gltfData) {
  const gltfScenegraph = new GLTFScenegraph(gltfData);
  const {
    json
  } = gltfScenegraph;

  if (gltfScenegraph.materials) {
    for (const material of json.materials || []) {
      if (material.unlit) {
        delete material.unlit;
        gltfScenegraph.addObjectExtension(material, KHR_MATERIALS_UNLIT, {});
        gltfScenegraph.addExtension(KHR_MATERIALS_UNLIT);
      }
    }
  }
}

var KHR_materials_unlit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name$1,
    decode: decode$1,
    encode: encode$1
});

const KHR_TECHNIQUES_WEBGL = 'KHR_techniques_webgl';
const name = KHR_TECHNIQUES_WEBGL;
async function decode(gltfData) {
  const gltfScenegraph = new GLTFScenegraph(gltfData);
  const {
    json
  } = gltfScenegraph;
  const extension = gltfScenegraph.getExtension(KHR_TECHNIQUES_WEBGL);

  if (extension) {
    const techniques = resolveTechniques(extension, gltfScenegraph);

    for (const material of json.materials || []) {
      const materialExtension = gltfScenegraph.getObjectExtension(material, KHR_TECHNIQUES_WEBGL);

      if (materialExtension) {
        material.technique = Object.assign({}, materialExtension, techniques[materialExtension.technique]);
        material.technique.values = resolveValues(material.technique, gltfScenegraph);
      }

      gltfScenegraph.removeObjectExtension(material, KHR_TECHNIQUES_WEBGL);
    }

    gltfScenegraph.removeExtension(KHR_TECHNIQUES_WEBGL);
  }
}
async function encode(gltfData, options) {}

function resolveTechniques(techniquesExtension, gltfScenegraph) {
  const {
    programs = [],
    shaders = [],
    techniques = []
  } = techniquesExtension;
  const textDecoder = new TextDecoder();
  shaders.forEach(shader => {
    if (Number.isFinite(shader.bufferView)) {
      shader.code = textDecoder.decode(gltfScenegraph.getTypedArrayForBufferView(shader.bufferView));
    } else {
      throw new Error('KHR_techniques_webgl: no shader code');
    }
  });
  programs.forEach(program => {
    program.fragmentShader = shaders[program.fragmentShader];
    program.vertexShader = shaders[program.vertexShader];
  });
  techniques.forEach(technique => {
    technique.program = programs[technique.program];
  });
  return techniques;
}

function resolveValues(technique, gltfScenegraph) {
  const values = Object.assign({}, technique.values);
  Object.keys(technique.uniforms || {}).forEach(uniform => {
    if (technique.uniforms[uniform].value && !(uniform in values)) {
      values[uniform] = technique.uniforms[uniform].value;
    }
  });
  Object.keys(values).forEach(uniform => {
    if (typeof values[uniform] === 'object' && values[uniform].index !== undefined) {
      values[uniform].texture = gltfScenegraph.getTexture(values[uniform].index);
    }
  });
  return values;
}

var KHR_techniques_webgl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name,
    decode: decode,
    encode: encode
});

const EXTENSIONS = [EXT_meshopt_compression, EXT_texture_webp, KHR_texture_basisu, KHR_draco_mesh_compression, KHR_lights_punctual, KHR_materials_unlit, KHR_techniques_webgl];
function preprocessExtensions(gltf, options = {}, context) {
  const extensions = EXTENSIONS.filter(extension => useExtension(extension.name, options));

  for (const extension of extensions) {
    var _extension$preprocess;

    (_extension$preprocess = extension.preprocess) === null || _extension$preprocess === void 0 ? void 0 : _extension$preprocess.call(extension, gltf, options, context);
  }
}
async function decodeExtensions(gltf, options = {}, context) {
  const extensions = EXTENSIONS.filter(extension => useExtension(extension.name, options));

  for (const extension of extensions) {
    var _extension$decode;

    await ((_extension$decode = extension.decode) === null || _extension$decode === void 0 ? void 0 : _extension$decode.call(extension, gltf, options, context));
  }
}

function useExtension(extensionName, options) {
  var _options$gltf;

  const excludes = (options === null || options === void 0 ? void 0 : (_options$gltf = options.gltf) === null || _options$gltf === void 0 ? void 0 : _options$gltf.excludeExtensions) || {};
  const exclude = extensionName in excludes && !excludes[extensionName];
  return !exclude;
}

const KHR_BINARY_GLTF = 'KHR_binary_glTF';
function preprocess(gltfData) {
  const gltfScenegraph = new GLTFScenegraph(gltfData);
  const {
    json
  } = gltfScenegraph;

  for (const image of json.images || []) {
    const extension = gltfScenegraph.getObjectExtension(image, KHR_BINARY_GLTF);

    if (extension) {
      Object.assign(image, extension);
    }

    gltfScenegraph.removeObjectExtension(image, KHR_BINARY_GLTF);
  }

  if (json.buffers && json.buffers[0]) {
    delete json.buffers[0].uri;
  }

  gltfScenegraph.removeExtension(KHR_BINARY_GLTF);
}

const GLTF_ARRAYS = {
  accessors: 'accessor',
  animations: 'animation',
  buffers: 'buffer',
  bufferViews: 'bufferView',
  images: 'image',
  materials: 'material',
  meshes: 'mesh',
  nodes: 'node',
  samplers: 'sampler',
  scenes: 'scene',
  skins: 'skin',
  textures: 'texture'
};
const GLTF_KEYS = {
  accessor: 'accessors',
  animations: 'animation',
  buffer: 'buffers',
  bufferView: 'bufferViews',
  image: 'images',
  material: 'materials',
  mesh: 'meshes',
  node: 'nodes',
  sampler: 'samplers',
  scene: 'scenes',
  skin: 'skins',
  texture: 'textures'
};

class GLTFV1Normalizer {
  constructor() {
    _defineProperty(this, "idToIndexMap", {
      animations: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      images: {},
      materials: {},
      meshes: {},
      nodes: {},
      samplers: {},
      scenes: {},
      skins: {},
      textures: {}
    });

    _defineProperty(this, "json", void 0);
  }

  normalize(gltf, options) {
    this.json = gltf.json;
    const json = gltf.json;

    switch (json.asset && json.asset.version) {
      case '2.0':
        return;

      case undefined:
      case '1.0':
        break;

      default:
        console.warn("glTF: Unknown version ".concat(json.asset.version));
        return;
    }

    if (!options.normalize) {
      throw new Error('glTF v1 is not supported.');
    }

    console.warn('Converting glTF v1 to glTF v2 format. This is experimental and may fail.');

    this._addAsset(json);

    this._convertTopLevelObjectsToArrays(json);

    preprocess(gltf);

    this._convertObjectIdsToArrayIndices(json);

    this._updateObjects(json);

    this._updateMaterial(json);
  }

  _addAsset(json) {
    json.asset = json.asset || {};
    json.asset.version = '2.0';
    json.asset.generator = json.asset.generator || 'Normalized to glTF 2.0 by loaders.gl';
  }

  _convertTopLevelObjectsToArrays(json) {
    for (const arrayName in GLTF_ARRAYS) {
      this._convertTopLevelObjectToArray(json, arrayName);
    }
  }

  _convertTopLevelObjectToArray(json, mapName) {
    const objectMap = json[mapName];

    if (!objectMap || Array.isArray(objectMap)) {
      return;
    }

    json[mapName] = [];

    for (const id in objectMap) {
      const object = objectMap[id];
      object.id = object.id || id;
      const index = json[mapName].length;
      json[mapName].push(object);
      this.idToIndexMap[mapName][id] = index;
    }
  }

  _convertObjectIdsToArrayIndices(json) {
    for (const arrayName in GLTF_ARRAYS) {
      this._convertIdsToIndices(json, arrayName);
    }

    if ('scene' in json) {
      json.scene = this._convertIdToIndex(json.scene, 'scene');
    }

    for (const texture of json.textures) {
      this._convertTextureIds(texture);
    }

    for (const mesh of json.meshes) {
      this._convertMeshIds(mesh);
    }

    for (const node of json.nodes) {
      this._convertNodeIds(node);
    }

    for (const node of json.scenes) {
      this._convertSceneIds(node);
    }
  }

  _convertTextureIds(texture) {
    if (texture.source) {
      texture.source = this._convertIdToIndex(texture.source, 'image');
    }
  }

  _convertMeshIds(mesh) {
    for (const primitive of mesh.primitives) {
      const {
        attributes,
        indices,
        material
      } = primitive;

      for (const attributeName in attributes) {
        attributes[attributeName] = this._convertIdToIndex(attributes[attributeName], 'accessor');
      }

      if (indices) {
        primitive.indices = this._convertIdToIndex(indices, 'accessor');
      }

      if (material) {
        primitive.material = this._convertIdToIndex(material, 'material');
      }
    }
  }

  _convertNodeIds(node) {
    if (node.children) {
      node.children = node.children.map(child => this._convertIdToIndex(child, 'node'));
    }

    if (node.meshes) {
      node.meshes = node.meshes.map(mesh => this._convertIdToIndex(mesh, 'mesh'));
    }
  }

  _convertSceneIds(scene) {
    if (scene.nodes) {
      scene.nodes = scene.nodes.map(node => this._convertIdToIndex(node, 'node'));
    }
  }

  _convertIdsToIndices(json, topLevelArrayName) {
    if (!json[topLevelArrayName]) {
      console.warn("gltf v1: json doesn't contain attribute ".concat(topLevelArrayName));
      json[topLevelArrayName] = [];
    }

    for (const object of json[topLevelArrayName]) {
      for (const key in object) {
        const id = object[key];

        const index = this._convertIdToIndex(id, key);

        object[key] = index;
      }
    }
  }

  _convertIdToIndex(id, key) {
    const arrayName = GLTF_KEYS[key];

    if (arrayName in this.idToIndexMap) {
      const index = this.idToIndexMap[arrayName][id];

      if (!Number.isFinite(index)) {
        throw new Error("gltf v1: failed to resolve ".concat(key, " with id ").concat(id));
      }

      return index;
    }

    return id;
  }

  _updateObjects(json) {
    for (const buffer of this.json.buffers) {
      delete buffer.type;
    }
  }

  _updateMaterial(json) {
    for (const material of json.materials) {
      var _material$values, _material$values2, _material$values3;

      material.pbrMetallicRoughness = {
        baseColorFactor: [1, 1, 1, 1],
        metallicFactor: 1,
        roughnessFactor: 1
      };
      const textureId = ((_material$values = material.values) === null || _material$values === void 0 ? void 0 : _material$values.tex) || ((_material$values2 = material.values) === null || _material$values2 === void 0 ? void 0 : _material$values2.texture2d_0) || ((_material$values3 = material.values) === null || _material$values3 === void 0 ? void 0 : _material$values3.diffuseTex);
      const textureIndex = json.textures.findIndex(texture => texture.id === textureId);

      if (textureIndex !== -1) {
        material.pbrMetallicRoughness.baseColorTexture = {
          index: textureIndex
        };
      }
    }
  }

}

function normalizeGLTFV1(gltf, options = {}) {
  return new GLTFV1Normalizer().normalize(gltf, options);
}

const COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const BYTES = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
const GL_SAMPLER = {
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,
  REPEAT: 0x2901,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_LINEAR: 0x2702
};
const SAMPLER_PARAMETER_GLTF_TO_GL = {
  magFilter: GL_SAMPLER.TEXTURE_MAG_FILTER,
  minFilter: GL_SAMPLER.TEXTURE_MIN_FILTER,
  wrapS: GL_SAMPLER.TEXTURE_WRAP_S,
  wrapT: GL_SAMPLER.TEXTURE_WRAP_T
};
const DEFAULT_SAMPLER = {
  [GL_SAMPLER.TEXTURE_MAG_FILTER]: GL_SAMPLER.LINEAR,
  [GL_SAMPLER.TEXTURE_MIN_FILTER]: GL_SAMPLER.NEAREST_MIPMAP_LINEAR,
  [GL_SAMPLER.TEXTURE_WRAP_S]: GL_SAMPLER.REPEAT,
  [GL_SAMPLER.TEXTURE_WRAP_T]: GL_SAMPLER.REPEAT
};

function getBytesFromComponentType(componentType) {
  return BYTES[componentType];
}

function getSizeFromAccessorType(type) {
  return COMPONENTS[type];
}

class GLTFPostProcessor {
  constructor() {
    _defineProperty(this, "baseUri", '');

    _defineProperty(this, "json", {});

    _defineProperty(this, "buffers", []);

    _defineProperty(this, "images", []);
  }

  postProcess(gltf, options = {}) {
    const {
      json,
      buffers = [],
      images = [],
      baseUri = ''
    } = gltf;
    assert$1(json);
    this.baseUri = baseUri;
    this.json = json;
    this.buffers = buffers;
    this.images = images;

    this._resolveTree(this.json, options);

    return this.json;
  }

  _resolveTree(json, options = {}) {
    if (json.bufferViews) {
      json.bufferViews = json.bufferViews.map((bufView, i) => this._resolveBufferView(bufView, i));
    }

    if (json.images) {
      json.images = json.images.map((image, i) => this._resolveImage(image, i));
    }

    if (json.samplers) {
      json.samplers = json.samplers.map((sampler, i) => this._resolveSampler(sampler, i));
    }

    if (json.textures) {
      json.textures = json.textures.map((texture, i) => this._resolveTexture(texture, i));
    }

    if (json.accessors) {
      json.accessors = json.accessors.map((accessor, i) => this._resolveAccessor(accessor, i));
    }

    if (json.materials) {
      json.materials = json.materials.map((material, i) => this._resolveMaterial(material, i));
    }

    if (json.meshes) {
      json.meshes = json.meshes.map((mesh, i) => this._resolveMesh(mesh, i));
    }

    if (json.nodes) {
      json.nodes = json.nodes.map((node, i) => this._resolveNode(node, i));
    }

    if (json.skins) {
      json.skins = json.skins.map((skin, i) => this._resolveSkin(skin, i));
    }

    if (json.scenes) {
      json.scenes = json.scenes.map((scene, i) => this._resolveScene(scene, i));
    }

    if (json.scene !== undefined) {
      json.scene = json.scenes[this.json.scene];
    }
  }

  getScene(index) {
    return this._get('scenes', index);
  }

  getNode(index) {
    return this._get('nodes', index);
  }

  getSkin(index) {
    return this._get('skins', index);
  }

  getMesh(index) {
    return this._get('meshes', index);
  }

  getMaterial(index) {
    return this._get('materials', index);
  }

  getAccessor(index) {
    return this._get('accessors', index);
  }

  getCamera(index) {
    return null;
  }

  getTexture(index) {
    return this._get('textures', index);
  }

  getSampler(index) {
    return this._get('samplers', index);
  }

  getImage(index) {
    return this._get('images', index);
  }

  getBufferView(index) {
    return this._get('bufferViews', index);
  }

  getBuffer(index) {
    return this._get('buffers', index);
  }

  _get(array, index) {
    if (typeof index === 'object') {
      return index;
    }

    const object = this.json[array] && this.json[array][index];

    if (!object) {
      console.warn("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
    }

    return object;
  }

  _resolveScene(scene, index) {
    scene.id = scene.id || "scene-".concat(index);
    scene.nodes = (scene.nodes || []).map(node => this.getNode(node));
    return scene;
  }

  _resolveNode(node, index) {
    node.id = node.id || "node-".concat(index);

    if (node.children) {
      node.children = node.children.map(child => this.getNode(child));
    }

    if (node.mesh !== undefined) {
      node.mesh = this.getMesh(node.mesh);
    } else if (node.meshes !== undefined && node.meshes.length) {
      node.mesh = node.meshes.reduce((accum, meshIndex) => {
        const mesh = this.getMesh(meshIndex);
        accum.id = mesh.id;
        accum.primitives = accum.primitives.concat(mesh.primitives);
        return accum;
      }, {
        primitives: []
      });
    }

    if (node.camera !== undefined) {
      node.camera = this.getCamera(node.camera);
    }

    if (node.skin !== undefined) {
      node.skin = this.getSkin(node.skin);
    }

    return node;
  }

  _resolveSkin(skin, index) {
    skin.id = skin.id || "skin-".concat(index);
    skin.inverseBindMatrices = this.getAccessor(skin.inverseBindMatrices);
    return skin;
  }

  _resolveMesh(mesh, index) {
    mesh.id = mesh.id || "mesh-".concat(index);

    if (mesh.primitives) {
      mesh.primitives = mesh.primitives.map(primitive => {
        primitive = { ...primitive
        };
        const attributes = primitive.attributes;
        primitive.attributes = {};

        for (const attribute in attributes) {
          primitive.attributes[attribute] = this.getAccessor(attributes[attribute]);
        }

        if (primitive.indices !== undefined) {
          primitive.indices = this.getAccessor(primitive.indices);
        }

        if (primitive.material !== undefined) {
          primitive.material = this.getMaterial(primitive.material);
        }

        return primitive;
      });
    }

    return mesh;
  }

  _resolveMaterial(material, index) {
    material.id = material.id || "material-".concat(index);

    if (material.normalTexture) {
      material.normalTexture = { ...material.normalTexture
      };
      material.normalTexture.texture = this.getTexture(material.normalTexture.index);
    }

    if (material.occlusionTexture) {
      material.occlustionTexture = { ...material.occlustionTexture
      };
      material.occlusionTexture.texture = this.getTexture(material.occlusionTexture.index);
    }

    if (material.emissiveTexture) {
      material.emmisiveTexture = { ...material.emmisiveTexture
      };
      material.emissiveTexture.texture = this.getTexture(material.emissiveTexture.index);
    }

    if (!material.emissiveFactor) {
      material.emissiveFactor = material.emmisiveTexture ? [1, 1, 1] : [0, 0, 0];
    }

    if (material.pbrMetallicRoughness) {
      material.pbrMetallicRoughness = { ...material.pbrMetallicRoughness
      };
      const mr = material.pbrMetallicRoughness;

      if (mr.baseColorTexture) {
        mr.baseColorTexture = { ...mr.baseColorTexture
        };
        mr.baseColorTexture.texture = this.getTexture(mr.baseColorTexture.index);
      }

      if (mr.metallicRoughnessTexture) {
        mr.metallicRoughnessTexture = { ...mr.metallicRoughnessTexture
        };
        mr.metallicRoughnessTexture.texture = this.getTexture(mr.metallicRoughnessTexture.index);
      }
    }

    return material;
  }

  _resolveAccessor(accessor, index) {
    accessor.id = accessor.id || "accessor-".concat(index);

    if (accessor.bufferView !== undefined) {
      accessor.bufferView = this.getBufferView(accessor.bufferView);
    }

    accessor.bytesPerComponent = getBytesFromComponentType(accessor.componentType);
    accessor.components = getSizeFromAccessorType(accessor.type);
    accessor.bytesPerElement = accessor.bytesPerComponent * accessor.components;

    if (accessor.bufferView) {
      const buffer = accessor.bufferView.buffer;
      const {
        ArrayType,
        byteLength
      } = getAccessorArrayTypeAndLength(accessor, accessor.bufferView);
      const byteOffset = (accessor.bufferView.byteOffset || 0) + (accessor.byteOffset || 0) + buffer.byteOffset;
      let cutBuffer = buffer.arrayBuffer.slice(byteOffset, byteOffset + byteLength);

      if (accessor.bufferView.byteStride) {
        cutBuffer = this._getValueFromInterleavedBuffer(buffer, byteOffset, accessor.bufferView.byteStride, accessor.bytesPerElement, accessor.count);
      }

      accessor.value = new ArrayType(cutBuffer);
    }

    return accessor;
  }

  _getValueFromInterleavedBuffer(buffer, byteOffset, byteStride, bytesPerElement, count) {
    const result = new Uint8Array(count * bytesPerElement);

    for (let i = 0; i < count; i++) {
      const elementOffset = byteOffset + i * byteStride;
      result.set(new Uint8Array(buffer.arrayBuffer.slice(elementOffset, elementOffset + bytesPerElement)), i * bytesPerElement);
    }

    return result.buffer;
  }

  _resolveTexture(texture, index) {
    texture.id = texture.id || "texture-".concat(index);
    texture.sampler = 'sampler' in texture ? this.getSampler(texture.sampler) : DEFAULT_SAMPLER;
    texture.source = this.getImage(texture.source);
    return texture;
  }

  _resolveSampler(sampler, index) {
    sampler.id = sampler.id || "sampler-".concat(index);
    sampler.parameters = {};

    for (const key in sampler) {
      const glEnum = this._enumSamplerParameter(key);

      if (glEnum !== undefined) {
        sampler.parameters[glEnum] = sampler[key];
      }
    }

    return sampler;
  }

  _enumSamplerParameter(key) {
    return SAMPLER_PARAMETER_GLTF_TO_GL[key];
  }

  _resolveImage(image, index) {
    image.id = image.id || "image-".concat(index);

    if (image.bufferView !== undefined) {
      image.bufferView = this.getBufferView(image.bufferView);
    }

    const preloadedImage = this.images[index];

    if (preloadedImage) {
      image.image = preloadedImage;
    }

    return image;
  }

  _resolveBufferView(bufferView, index) {
    const bufferIndex = bufferView.buffer;
    const result = {
      id: "bufferView-".concat(index),
      ...bufferView,
      buffer: this.buffers[bufferIndex]
    };
    const arrayBuffer = this.buffers[bufferIndex].arrayBuffer;
    let byteOffset = this.buffers[bufferIndex].byteOffset || 0;

    if ('byteOffset' in bufferView) {
      byteOffset += bufferView.byteOffset;
    }

    result.data = new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
    return result;
  }

  _resolveCamera(camera, index) {
    camera.id = camera.id || "camera-".concat(index);

    if (camera.perspective) ;

    if (camera.orthographic) ;

    return camera;
  }

}

function postProcessGLTF(gltf, options) {
  return new GLTFPostProcessor().postProcess(gltf, options);
}

const MAGIC_glTF = 0x676c5446;
const GLB_FILE_HEADER_SIZE = 12;
const GLB_CHUNK_HEADER_SIZE = 8;
const GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
const GLB_CHUNK_TYPE_BIN = 0x004e4942;
const GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED = 0;
const GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED = 1;
const GLB_V1_CONTENT_FORMAT_JSON = 0x0;
const LE = true;

function getMagicString(dataView, byteOffset = 0) {
  return "".concat(String.fromCharCode(dataView.getUint8(byteOffset + 0))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 1))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 2))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 3)));
}

function isGLB(arrayBuffer, byteOffset = 0, options = {}) {
  const dataView = new DataView(arrayBuffer);
  const {
    magic = MAGIC_glTF
  } = options;
  const magic1 = dataView.getUint32(byteOffset, false);
  return magic1 === magic || magic1 === MAGIC_glTF;
}
function parseGLBSync(glb, arrayBuffer, byteOffset = 0, options = {}) {
  const dataView = new DataView(arrayBuffer);
  const type = getMagicString(dataView, byteOffset + 0);
  const version = dataView.getUint32(byteOffset + 4, LE);
  const byteLength = dataView.getUint32(byteOffset + 8, LE);
  Object.assign(glb, {
    header: {
      byteOffset,
      byteLength,
      hasBinChunk: false
    },
    type,
    version,
    json: {},
    binChunks: []
  });
  byteOffset += GLB_FILE_HEADER_SIZE;

  switch (glb.version) {
    case 1:
      return parseGLBV1(glb, dataView, byteOffset);

    case 2:
      return parseGLBV2(glb, dataView, byteOffset, options = {});

    default:
      throw new Error("Invalid GLB version ".concat(glb.version, ". Only supports v1 and v2."));
  }
}

function parseGLBV1(glb, dataView, byteOffset) {
  assert$7(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  const contentLength = dataView.getUint32(byteOffset + 0, LE);
  const contentFormat = dataView.getUint32(byteOffset + 4, LE);
  byteOffset += GLB_CHUNK_HEADER_SIZE;
  assert$7(contentFormat === GLB_V1_CONTENT_FORMAT_JSON);
  parseJSONChunk(glb, dataView, byteOffset, contentLength);
  byteOffset += contentLength;
  byteOffset += parseBINChunk(glb, dataView, byteOffset, glb.header.byteLength);
  return byteOffset;
}

function parseGLBV2(glb, dataView, byteOffset, options) {
  assert$7(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  parseGLBChunksSync(glb, dataView, byteOffset, options);
  return byteOffset + glb.header.byteLength;
}

function parseGLBChunksSync(glb, dataView, byteOffset, options) {
  while (byteOffset + 8 <= glb.header.byteLength) {
    const chunkLength = dataView.getUint32(byteOffset + 0, LE);
    const chunkFormat = dataView.getUint32(byteOffset + 4, LE);
    byteOffset += GLB_CHUNK_HEADER_SIZE;

    switch (chunkFormat) {
      case GLB_CHUNK_TYPE_JSON:
        parseJSONChunk(glb, dataView, byteOffset, chunkLength);
        break;

      case GLB_CHUNK_TYPE_BIN:
        parseBINChunk(glb, dataView, byteOffset, chunkLength);
        break;

      case GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED:
        if (!options.strict) {
          parseJSONChunk(glb, dataView, byteOffset, chunkLength);
        }

        break;

      case GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED:
        if (!options.strict) {
          parseBINChunk(glb, dataView, byteOffset, chunkLength);
        }

        break;
    }

    byteOffset += padToNBytes(chunkLength, 4);
  }

  return byteOffset;
}

function parseJSONChunk(glb, dataView, byteOffset, chunkLength) {
  const jsonChunk = new Uint8Array(dataView.buffer, byteOffset, chunkLength);
  const textDecoder = new TextDecoder('utf8');
  const jsonText = textDecoder.decode(jsonChunk);
  glb.json = JSON.parse(jsonText);
  return padToNBytes(chunkLength, 4);
}

function parseBINChunk(glb, dataView, byteOffset, chunkLength) {
  glb.header.hasBinChunk = true;
  glb.binChunks.push({
    byteOffset,
    byteLength: chunkLength,
    arrayBuffer: dataView.buffer
  });
  return padToNBytes(chunkLength, 4);
}

async function parseGLTF(gltf, arrayBufferOrString, byteOffset = 0, options, context) {
  var _options$gltf, _options$gltf2, _options$gltf3, _options$gltf4;

  parseGLTFContainerSync(gltf, arrayBufferOrString, byteOffset, options);
  normalizeGLTFV1(gltf, {
    normalize: options === null || options === void 0 ? void 0 : (_options$gltf = options.gltf) === null || _options$gltf === void 0 ? void 0 : _options$gltf.normalize
  });
  preprocessExtensions(gltf, options, context);
  const promises = [];

  if (options !== null && options !== void 0 && (_options$gltf2 = options.gltf) !== null && _options$gltf2 !== void 0 && _options$gltf2.loadBuffers && gltf.json.buffers) {
    await loadBuffers(gltf, options, context);
  }

  if (options !== null && options !== void 0 && (_options$gltf3 = options.gltf) !== null && _options$gltf3 !== void 0 && _options$gltf3.loadImages) {
    const promise = loadImages(gltf, options, context);
    promises.push(promise);
  }

  const promise = decodeExtensions(gltf, options, context);
  promises.push(promise);
  await Promise.all(promises);
  return options !== null && options !== void 0 && (_options$gltf4 = options.gltf) !== null && _options$gltf4 !== void 0 && _options$gltf4.postProcess ? postProcessGLTF(gltf, options) : gltf;
}

function parseGLTFContainerSync(gltf, data, byteOffset, options) {
  if (options.uri) {
    gltf.baseUri = options.uri;
  }

  if (data instanceof ArrayBuffer && !isGLB(data, byteOffset, options)) {
    const textDecoder = new TextDecoder();
    data = textDecoder.decode(data);
  }

  if (typeof data === 'string') {
    gltf.json = parseJSON(data);
  } else if (data instanceof ArrayBuffer) {
    const glb = {};
    byteOffset = parseGLBSync(glb, data, byteOffset, options.glb);
    assert$1(glb.type === 'glTF', "Invalid GLB magic string ".concat(glb.type));
    gltf._glb = glb;
    gltf.json = glb.json;
  } else {
    assert$1(false, 'GLTF: must be ArrayBuffer or string');
  }

  const buffers = gltf.json.buffers || [];
  gltf.buffers = new Array(buffers.length).fill(null);

  if (gltf._glb && gltf._glb.header.hasBinChunk) {
    const {
      binChunks
    } = gltf._glb;
    gltf.buffers[0] = {
      arrayBuffer: binChunks[0].arrayBuffer,
      byteOffset: binChunks[0].byteOffset,
      byteLength: binChunks[0].byteLength
    };
  }

  const images = gltf.json.images || [];
  gltf.images = new Array(images.length).fill({});
}

async function loadBuffers(gltf, options, context) {
  const buffers = gltf.json.buffers || [];

  for (let i = 0; i < buffers.length; ++i) {
    const buffer = buffers[i];

    if (buffer.uri) {
      var _context$fetch, _response$arrayBuffer;

      const {
        fetch
      } = context;
      assert$1(fetch);
      const uri = resolveUrl(buffer.uri, options);
      const response = await (context === null || context === void 0 ? void 0 : (_context$fetch = context.fetch) === null || _context$fetch === void 0 ? void 0 : _context$fetch.call(context, uri));
      const arrayBuffer = await (response === null || response === void 0 ? void 0 : (_response$arrayBuffer = response.arrayBuffer) === null || _response$arrayBuffer === void 0 ? void 0 : _response$arrayBuffer.call(response));
      gltf.buffers[i] = {
        arrayBuffer,
        byteOffset: 0,
        byteLength: arrayBuffer.byteLength
      };
      delete buffer.uri;
    } else if (gltf.buffers[i] === null) {
      gltf.buffers[i] = {
        arrayBuffer: new ArrayBuffer(buffer.byteLength),
        byteOffset: 0,
        byteLength: buffer.byteLength
      };
    }
  }
}

async function loadImages(gltf, options, context) {
  const imageIndices = getReferencesImageIndices(gltf);
  const images = gltf.json.images || [];
  const promises = [];

  for (const imageIndex of imageIndices) {
    promises.push(loadImage(gltf, images[imageIndex], imageIndex, options, context));
  }

  return await Promise.all(promises);
}

function getReferencesImageIndices(gltf) {
  const imageIndices = new Set();
  const textures = gltf.json.textures || [];

  for (const texture of textures) {
    if (texture.source !== undefined) {
      imageIndices.add(texture.source);
    }
  }

  return Array.from(imageIndices).sort();
}

async function loadImage(gltf, image, index, options, context) {
  const {
    fetch,
    parse
  } = context;
  let arrayBuffer;

  if (image.uri && !image.hasOwnProperty('bufferView')) {
    const uri = resolveUrl(image.uri, options);
    const response = await fetch(uri);
    arrayBuffer = await response.arrayBuffer();
  }

  if (Number.isFinite(image.bufferView)) {
    const array = getTypedArrayForBufferView(gltf.json, gltf.buffers, image.bufferView);
    arrayBuffer = sliceArrayBuffer(array.buffer, array.byteOffset, array.byteLength);
  }

  assert$1(arrayBuffer, 'glTF image has no data');
  let parsedImage = await parse(arrayBuffer, [ImageLoader, BasisLoader], {
    mimeType: image.mimeType,
    basis: options.basis || {
      format: selectSupportedBasisFormat()
    }
  }, context);

  if (parsedImage && parsedImage[0]) {
    parsedImage = {
      compressed: true,
      mipmaps: false,
      width: parsedImage[0].width,
      height: parsedImage[0].height,
      data: parsedImage[0]
    };
  }

  gltf.images = gltf.images || [];
  gltf.images[index] = parsedImage;
}

const GLTFLoader = {
  name: 'glTF',
  id: 'gltf',
  module: 'gltf',
  version: VERSION$3,
  extensions: ['gltf', 'glb'],
  mimeTypes: ['model/gltf+json', 'model/gltf-binary'],
  text: true,
  binary: true,
  tests: ['glTF'],
  parse: parse$1,
  options: {
    gltf: {
      normalize: true,
      loadBuffers: true,
      loadImages: true,
      decompressMeshes: true,
      postProcess: true
    },
    log: console
  },
  deprecatedOptions: {
    fetchImages: 'gltf.loadImages',
    createImages: 'gltf.loadImages',
    decompress: 'gltf.decompressMeshes',
    postProcess: 'gltf.postProcess',
    gltf: {
      decompress: 'gltf.decompressMeshes'
    }
  }
};
async function parse$1(arrayBuffer, options = {}, context) {
  options = { ...GLTFLoader.options,
    ...options
  };
  options.gltf = { ...GLTFLoader.options.gltf,
    ...options.gltf
  };
  const {
    byteOffset = 0
  } = options;
  const gltf = {};
  return await parseGLTF(gltf, arrayBuffer, byteOffset, options, context);
}

const GLTF_FORMAT = {
  URI: 0,
  EMBEDDED: 1
};
function parse3DTileGLTFViewSync(tile, arrayBuffer, byteOffset, options) {
  tile.rotateYtoZ = true;
  const gltfByteLength = tile.byteOffset + tile.byteLength - byteOffset;

  if (gltfByteLength === 0) {
    throw new Error('glTF byte length must be greater than 0.');
  }

  tile.gltfUpAxis = options['3d-tiles'] && options['3d-tiles'].assetGltfUpAxis ? options['3d-tiles'].assetGltfUpAxis : 'Y';
  tile.gltfArrayBuffer = sliceArrayBuffer(arrayBuffer, byteOffset, gltfByteLength);
  tile.gltfByteOffset = 0;
  tile.gltfByteLength = gltfByteLength;

  if (byteOffset % 4 === 0) ; else {
    console.warn("".concat(tile.type, ": embedded glb is not aligned to a 4-byte boundary."));
  }

  return tile.byteOffset + tile.byteLength;
}
async function extractGLTF(tile, gltfFormat, options, context) {
  const tile3DOptions = options['3d-tiles'] || {};
  extractGLTFBufferOrURL(tile, gltfFormat);

  if (tile3DOptions.loadGLTF) {
    const {
      parse,
      fetch
    } = context;

    if (tile.gltfUrl) {
      tile.gltfArrayBuffer = await fetch(tile.gltfUrl, options);
      tile.gltfByteOffset = 0;
    }

    if (tile.gltfArrayBuffer) {
      tile.gltf = await parse(tile.gltfArrayBuffer, GLTFLoader, options, context);
      delete tile.gltfArrayBuffer;
      delete tile.gltfByteOffset;
      delete tile.gltfByteLength;
    }
  }
}

function extractGLTFBufferOrURL(tile, gltfFormat, options) {
  switch (gltfFormat) {
    case GLTF_FORMAT.URI:
      const gltfUrlBytes = new Uint8Array(tile.gltfArrayBuffer, tile.gltfByteOffset);
      const textDecoder = new TextDecoder();
      const gltfUrl = textDecoder.decode(gltfUrlBytes);
      tile.gltfUrl = gltfUrl.replace(/[\s\0]+$/, '');
      delete tile.gltfArrayBuffer;
      delete tile.gltfByteOffset;
      delete tile.gltfByteLength;
      break;

    case GLTF_FORMAT.EMBEDDED:
      break;

    default:
      throw new Error('b3dm: Illegal glTF format field');
  }
}

async function parseBatchedModel3DTile(tile, arrayBuffer, byteOffset, options, context) {
  var _tile$gltf;

  byteOffset = parseBatchedModel(tile, arrayBuffer, byteOffset, options);
  await extractGLTF(tile, GLTF_FORMAT.EMBEDDED, options, context);
  const extensions = tile === null || tile === void 0 ? void 0 : (_tile$gltf = tile.gltf) === null || _tile$gltf === void 0 ? void 0 : _tile$gltf.extensions;

  if (extensions && extensions.CESIUM_RTC) {
    tile.rtcCenter = extensions.CESIUM_RTC.center;
  }

  return byteOffset;
}

function parseBatchedModel(tile, arrayBuffer, byteOffset, options, context) {
  byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileTablesSync(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileGLTFViewSync(tile, arrayBuffer, byteOffset, options);
  const featureTable = new Tile3DFeatureTable(tile.featureTableJson, tile.featureTableBinary);
  tile.rtcCenter = featureTable.getGlobalProperty('RTC_CENTER', GL$1.FLOAT, 3);
  return byteOffset;
}

async function parseInstancedModel3DTile(tile, arrayBuffer, byteOffset, options, context) {
  byteOffset = parseInstancedModel(tile, arrayBuffer, byteOffset, options);
  await extractGLTF(tile, tile.gltfFormat, options, context);
  return byteOffset;
}

function parseInstancedModel(tile, arrayBuffer, byteOffset, options, context) {
  byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);

  if (tile.version !== 1) {
    throw new Error("Instanced 3D Model version ".concat(tile.version, " is not supported"));
  }

  byteOffset = parse3DTileTablesHeaderSync(tile, arrayBuffer, byteOffset);
  const view = new DataView(arrayBuffer);
  tile.gltfFormat = view.getUint32(byteOffset, true);
  byteOffset += 4;
  byteOffset = parse3DTileTablesSync(tile, arrayBuffer, byteOffset);
  byteOffset = parse3DTileGLTFViewSync(tile, arrayBuffer, byteOffset, options);

  if (tile.featureTableJsonByteLength === 0) {
    throw new Error('i3dm parser: featureTableJsonByteLength is zero.');
  }

  const featureTable = new Tile3DFeatureTable(tile.featureTableJson, tile.featureTableBinary);
  const instancesLength = featureTable.getGlobalProperty('INSTANCES_LENGTH');
  featureTable.featuresLength = instancesLength;

  if (!Number.isFinite(instancesLength)) {
    throw new Error('i3dm parser: INSTANCES_LENGTH must be defined');
  }

  tile.eastNorthUp = featureTable.getGlobalProperty('EAST_NORTH_UP');
  tile.rtcCenter = featureTable.getGlobalProperty('RTC_CENTER', GL$1.FLOAT, 3);
  const batchTable = new Tile3DBatchTableParser(tile.batchTableJson, tile.batchTableBinary, instancesLength);
  extractInstancedAttributes(tile, featureTable, batchTable, instancesLength);
  return byteOffset;
}

function extractInstancedAttributes(tile, featureTable, batchTable, instancesLength) {
  const collectionOptions = {
    instances: new Array(instancesLength),
    batchTable: tile._batchTable,
    cull: false,
    url: undefined,
    gltf: undefined,
    basePath: undefined,
    incrementallyLoadTextures: false,
    forwardAxis: [1, 0, 0]
  };
  const instances = collectionOptions.instances;
  const instancePosition = new Vector3();
  new Vector3();
  new Vector3();
  new Vector3();
  const instanceRotation = new Matrix3();
  const instanceQuaternion = new Quaternion();
  const instanceScale = new Vector3();
  const instanceTranslationRotationScale = {};
  const instanceTransform = new Matrix4();
  const scratch1 = [];
  const scratch2 = [];
  const scratchVector1 = new Vector3();
  const scratchVector2 = new Vector3();

  for (let i = 0; i < instancesLength; i++) {
    let position;

    if (featureTable.hasProperty('POSITION')) {
      position = featureTable.getProperty('POSITION', GL$1.FLOAT, 3, i, instancePosition);
    } else if (featureTable.hasProperty('POSITION_QUANTIZED')) {
      position = featureTable.getProperty('POSITION_QUANTIZED', GL$1.UNSIGNED_SHORT, 3, i, instancePosition);
      const quantizedVolumeOffset = featureTable.getGlobalProperty('QUANTIZED_VOLUME_OFFSET', GL$1.FLOAT, 3, scratchVector1);

      if (!quantizedVolumeOffset) {
        throw new Error('i3dm parser: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.');
      }

      const quantizedVolumeScale = featureTable.getGlobalProperty('QUANTIZED_VOLUME_SCALE', GL$1.FLOAT, 3, scratchVector2);

      if (!quantizedVolumeScale) {
        throw new Error('i3dm parser: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.');
      }

      const MAX_UNSIGNED_SHORT = 65535.0;

      for (let j = 0; j < 3; j++) {
        position[j] = position[j] / MAX_UNSIGNED_SHORT * quantizedVolumeScale[j] + quantizedVolumeOffset[j];
      }
    }

    if (!position) {
      throw new Error('i3dm: POSITION or POSITION_QUANTIZED must be defined for each instance.');
    }

    instancePosition.copy(position);
    instanceTranslationRotationScale.translation = instancePosition;
    tile.normalUp = featureTable.getProperty('NORMAL_UP', GL$1.FLOAT, 3, i, scratch1);
    tile.normalRight = featureTable.getProperty('NORMAL_RIGHT', GL$1.FLOAT, 3, i, scratch2);

    if (tile.normalUp) {
      if (!tile.normalRight) {
        throw new Error('i3dm: Custom orientation requires both NORMAL_UP and NORMAL_RIGHT.');
      }

      tile.hasCustomOrientation = true;
    } else {
      tile.octNormalUp = featureTable.getProperty('NORMAL_UP_OCT32P', GL$1.UNSIGNED_SHORT, 2, scratch1);
      tile.octNormalRight = featureTable.getProperty('NORMAL_RIGHT_OCT32P', GL$1.UNSIGNED_SHORT, 2, scratch2);

      if (tile.octNormalUp) {
        if (!tile.octNormalRight) {
          throw new Error('i3dm: oct-encoded orientation requires NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P');
        }

        throw new Error('i3dm: oct-encoded orientation not implemented');
      } else if (tile.eastNorthUp) {
        Ellipsoid.WGS84.eastNorthUpToFixedFrame(instancePosition, instanceTransform);
        instanceTransform.getRotationMatrix3(instanceRotation);
      } else {
        instanceRotation.identity();
      }
    }

    instanceQuaternion.fromMatrix3(instanceRotation);
    instanceTranslationRotationScale.rotation = instanceQuaternion;
    instanceScale.set(1.0, 1.0, 1.0);
    const scale = featureTable.getProperty('SCALE', GL$1.FLOAT, 1, i);

    if (Number.isFinite(scale)) {
      instanceScale.multiplyByScalar(scale);
    }

    const nonUniformScale = featureTable.getProperty('SCALE_NON_UNIFORM', GL$1.FLOAT, 3, i, scratch1);

    if (nonUniformScale) {
      instanceScale.scale(nonUniformScale);
    }

    instanceTranslationRotationScale.scale = instanceScale;
    let batchId = featureTable.getProperty('BATCH_ID', GL$1.UNSIGNED_SHORT, 1, i);

    if (batchId === undefined) {
      batchId = i;
    }

    const rotationMatrix = new Matrix4().fromQuaternion(instanceTranslationRotationScale.rotation);
    instanceTransform.identity();
    instanceTransform.translate(instanceTranslationRotationScale.translation);
    instanceTransform.multiplyRight(rotationMatrix);
    instanceTransform.scale(instanceTranslationRotationScale.scale);
    const modelMatrix = instanceTransform.clone();
    instances[i] = {
      modelMatrix,
      batchId
    };
  }

  tile.instances = instances;
}

async function parseComposite3DTile(tile, arrayBuffer, byteOffset, options, context, parse3DTile) {
  byteOffset = parse3DTileHeaderSync(tile, arrayBuffer, byteOffset);
  const view = new DataView(arrayBuffer);
  tile.tilesLength = view.getUint32(byteOffset, true);
  byteOffset += 4;
  tile.tiles = [];

  while (tile.tiles.length < tile.tilesLength && tile.byteLength - byteOffset > 12) {
    const subtile = {};
    tile.tiles.push(subtile);
    byteOffset = await parse3DTile(arrayBuffer, byteOffset, options, context, subtile);
  }

  return byteOffset;
}

async function parseGltf3DTile(tile, arrayBuffer, options, context) {
  tile.rotateYtoZ = true;
  tile.gltfUpAxis = options['3d-tiles'] && options['3d-tiles'].assetGltfUpAxis ? options['3d-tiles'].assetGltfUpAxis : 'Y';
  const {
    parse
  } = context;
  tile.gltf = await parse(arrayBuffer, GLTFLoader, options, context);
}

async function parse3DTile(arrayBuffer, byteOffset = 0, options, context, tile = {}) {
  tile.byteOffset = byteOffset;
  tile.type = getMagicString$1(arrayBuffer, byteOffset);

  switch (tile.type) {
    case TILE3D_TYPE.COMPOSITE:
      return await parseComposite3DTile(tile, arrayBuffer, byteOffset, options, context, parse3DTile);

    case TILE3D_TYPE.BATCHED_3D_MODEL:
      return await parseBatchedModel3DTile(tile, arrayBuffer, byteOffset, options, context);

    case TILE3D_TYPE.GLTF:
      return await parseGltf3DTile(tile, arrayBuffer, options, context);

    case TILE3D_TYPE.INSTANCED_3D_MODEL:
      return await parseInstancedModel3DTile(tile, arrayBuffer, byteOffset, options, context);

    case TILE3D_TYPE.POINT_CLOUD:
      return await parsePointCloud3DTile(tile, arrayBuffer, byteOffset, options, context);

    default:
      throw new Error("3DTileLoader: unknown type ".concat(tile.type));
  }
}

const SUBTREE_FILE_MAGIC = 0x74627573;
const SUBTREE_FILE_VERSION = 1;
async function parse3DTilesSubtree(data) {
  const magic = new Uint32Array(data.slice(0, 4));

  if (magic[0] !== SUBTREE_FILE_MAGIC) {
    throw new Error('Wrong subtree file magic number');
  }

  const version = new Uint32Array(data.slice(4, 8));

  if (version[0] !== SUBTREE_FILE_VERSION) {
    throw new Error('Wrong subtree file verson, must be 1');
  }

  const jsonByteLength = parseUint64Value(data.slice(8, 16));
  const stringAttribute = new Uint8Array(data, 24, jsonByteLength);
  const textDecoder = new TextDecoder('utf8');
  const string = textDecoder.decode(stringAttribute);
  const subtree = JSON.parse(string);
  const binaryByteLength = parseUint64Value(data.slice(16, 24));
  let internalBinaryBuffer = new ArrayBuffer(0);

  if (binaryByteLength) {
    internalBinaryBuffer = data.slice(24 + jsonByteLength);
  }

  if ('bufferView' in subtree.tileAvailability) {
    subtree.tileAvailability.explicitBitstream = await getExplicitBitstream(subtree, 'tileAvailability', internalBinaryBuffer);
  }

  if ('bufferView' in subtree.contentAvailability) {
    subtree.contentAvailability.explicitBitstream = await getExplicitBitstream(subtree, 'contentAvailability', internalBinaryBuffer);
  }

  if ('bufferView' in subtree.childSubtreeAvailability) {
    subtree.childSubtreeAvailability.explicitBitstream = await getExplicitBitstream(subtree, 'childSubtreeAvailability', internalBinaryBuffer);
  }

  return subtree;
}

async function getExplicitBitstream(subtree, name, internalBinaryBuffer) {
  const bufferViewIndex = subtree[name].bufferView;
  const bufferView = subtree.bufferViews[bufferViewIndex];
  const buffer = subtree.buffers[bufferView.buffer];

  if (buffer.uri) {
    const response = await fetchFile(buffer.uri);
    const data = await response.arrayBuffer();
    return new Uint8Array(data, bufferView.byteOffset, bufferView.byteLength);
  }

  return new Uint8Array(internalBinaryBuffer, bufferView.byteOffset, bufferView.byteLength);
}

function parseUint64Value(buffer) {
  const dataView = new DataView(buffer);
  const left = dataView.getUint32(0, true);
  const right = dataView.getUint32(4, true);
  return left + 2 ** 32 * right;
}

const Tile3DSubtreeLoader = {
  id: '3d-tiles-subtree',
  name: '3D Tiles Subtree',
  module: '3d-tiles',
  version: VERSION$5,
  extensions: ['subtree'],
  mimeTypes: ['application/octet-stream'],
  tests: ['subtree'],
  parse: parse3DTilesSubtree,
  options: {}
};

const QUADTREE_DEVISION_COUNT = 4;
const OCTREE_DEVISION_COUNT = 8;
const SUBDIVISION_COUNT_MAP = {
  QUADTREE: QUADTREE_DEVISION_COUNT,
  OCTREE: OCTREE_DEVISION_COUNT
};
async function parseImplicitTiles(params) {
  const {
    options,
    parentData = {
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    },
    childIndex = 0,
    globalData = {
      level: 0,
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    }
  } = params;
  let {
    subtree,
    level = 0
  } = params;
  const {
    subdivisionScheme,
    subtreeLevels,
    maximumLevel,
    contentUrlTemplate,
    subtreesUriTemplate,
    basePath
  } = options;
  const tile = {
    children: [],
    lodMetricValue: 0,
    contentUrl: ''
  };
  const childrenPerTile = SUBDIVISION_COUNT_MAP[subdivisionScheme];
  const childX = childIndex & 0b01;
  const childY = childIndex >> 1 & 0b01;
  const childZ = childIndex >> 2 & 0b01;
  const levelOffset = (childrenPerTile ** level - 1) / (childrenPerTile - 1);
  let childTileMortonIndex = concatBits(parentData.mortonIndex, childIndex);
  let tileAvailabilityIndex = levelOffset + childTileMortonIndex;
  let childTileX = concatBits(parentData.x, childX);
  let childTileY = concatBits(parentData.y, childY);
  let childTileZ = concatBits(parentData.z, childZ);
  let isChildSubtreeAvailable = false;

  if (level + 1 > subtreeLevels) {
    isChildSubtreeAvailable = getAvailabilityResult(subtree.childSubtreeAvailability, childTileMortonIndex);
  }

  const x = concatBits(globalData.x, childTileX);
  const y = concatBits(globalData.y, childTileY);
  const z = concatBits(globalData.z, childTileZ);
  const lev = level + globalData.level;

  if (isChildSubtreeAvailable) {
    const subtreePath = "".concat(basePath, "/").concat(subtreesUriTemplate);
    const childSubtreeUrl = replaceContentUrlTemplate(subtreePath, lev, x, y, z);
    const childSubtree = await load(childSubtreeUrl, Tile3DSubtreeLoader);
    subtree = childSubtree;
    globalData.mortonIndex = childTileMortonIndex;
    globalData.x = childTileX;
    globalData.y = childTileY;
    globalData.z = childTileZ;
    globalData.level = level;
    childTileMortonIndex = 0;
    tileAvailabilityIndex = 0;
    childTileX = 0;
    childTileY = 0;
    childTileZ = 0;
    level = 0;
  }

  const isTileAvailable = getAvailabilityResult(subtree.tileAvailability, tileAvailabilityIndex);

  if (!isTileAvailable || level > maximumLevel) {
    return tile;
  }

  const isContentAvailable = getAvailabilityResult(subtree.contentAvailability, tileAvailabilityIndex);

  if (isContentAvailable) {
    tile.contentUrl = replaceContentUrlTemplate(contentUrlTemplate, lev, x, y, z);
  }

  const childTileLevel = level + 1;
  const pData = {
    mortonIndex: childTileMortonIndex,
    x: childTileX,
    y: childTileY,
    z: childTileZ
  };

  for (let index = 0; index < childrenPerTile; index++) {
    const currentTile = await parseImplicitTiles({
      subtree,
      options,
      parentData: pData,
      childIndex: index,
      level: childTileLevel,
      globalData
    });

    if (currentTile.contentUrl || currentTile.children.length) {
      const globalLevel = lev + 1;
      const childCoordinates = {
        childTileX,
        childTileY,
        childTileZ
      };
      const formattedTile = formatTileData(currentTile, globalLevel, childCoordinates, options);
      tile.children.push(formattedTile);
    }
  }

  return tile;
}

function getAvailabilityResult(availabilityData, index) {
  if ('constant' in availabilityData) {
    return Boolean(availabilityData.constant);
  }

  if (availabilityData.explicitBitstream) {
    return getBooleanValueFromBitstream(index, availabilityData.explicitBitstream);
  }

  return false;
}

function formatTileData(tile, level, childCoordinates, options) {
  const {
    basePath,
    refine,
    getRefine,
    lodMetricType,
    getTileType,
    rootLodMetricValue,
    rootBoundingVolume
  } = options;
  const uri = tile.contentUrl && tile.contentUrl.replace("".concat(basePath, "/"), '');
  const lodMetricValue = rootLodMetricValue / 2 ** level;
  const boundingVolume = calculateBoundingVolumeForChildTile(level, rootBoundingVolume, childCoordinates);
  return {
    children: tile.children,
    contentUrl: tile.contentUrl,
    content: {
      uri
    },
    id: tile.contentUrl,
    refine: getRefine(refine),
    type: getTileType(tile),
    lodMetricType,
    lodMetricValue,
    boundingVolume
  };
}

function calculateBoundingVolumeForChildTile(level, rootBoundingVolume, childCoordinates) {
  if (rootBoundingVolume.region) {
    const {
      childTileX,
      childTileY,
      childTileZ
    } = childCoordinates;
    const [west, south, east, north, minimumHeight, maximumHeight] = rootBoundingVolume.region;
    const boundingVolumesCount = 2 ** level;
    const sizeX = (east - west) / boundingVolumesCount;
    const sizeY = (north - south) / boundingVolumesCount;
    const sizeZ = (maximumHeight - minimumHeight) / boundingVolumesCount;
    const [childWest, childEast] = [west + sizeX * childTileX, west + sizeX * (childTileX + 1)];
    const [childSouth, childNorth] = [south + sizeY * childTileY, south + sizeY * (childTileY + 1)];
    const [childMinimumHeight, childMaximumHeight] = [minimumHeight + sizeZ * childTileZ, minimumHeight + sizeZ * (childTileZ + 1)];
    return {
      region: [childWest, childSouth, childEast, childNorth, childMinimumHeight, childMaximumHeight]
    };
  }

  console.warn('Unsupported bounding volume type: ', rootBoundingVolume);
  return null;
}

function concatBits(first, second) {
  return parseInt(first.toString(2) + second.toString(2), 2);
}

function replaceContentUrlTemplate(templateUrl, level, x, y, z) {
  const mapUrl = generateMapUrl({
    level,
    x,
    y,
    z
  });
  return templateUrl.replace(/{level}|{x}|{y}|{z}/gi, matched => mapUrl[matched]);
}

function generateMapUrl(items) {
  const mapUrl = {};

  for (const key in items) {
    mapUrl["{".concat(key, "}")] = items[key];
  }

  return mapUrl;
}

function getBooleanValueFromBitstream(availabilityIndex, availabilityBuffer) {
  const byteIndex = Math.floor(availabilityIndex / 8);
  const bitIndex = availabilityIndex % 8;
  const bitValue = availabilityBuffer[byteIndex] >> bitIndex & 1;
  return bitValue === 1;
}

function getTileType(tile) {
  if (!tile.contentUrl) {
    return TILE_TYPE.EMPTY;
  }

  const contentUrl = tile.contentUrl;
  const fileExtension = contentUrl.split('.').pop();

  switch (fileExtension) {
    case 'pnts':
      return TILE_TYPE.POINTCLOUD;

    case 'i3dm':
    case 'b3dm':
    case 'glb':
    case 'gltf':
      return TILE_TYPE.SCENEGRAPH;

    default:
      return fileExtension;
  }
}

function getRefine(refine) {
  switch (refine) {
    case 'REPLACE':
    case 'replace':
      return TILE_REFINEMENT.REPLACE;

    case 'ADD':
    case 'add':
      return TILE_REFINEMENT.ADD;

    default:
      return refine;
  }
}

function resolveUri(uri, basePath) {
  const urlSchemeRegex = /^[a-z][0-9a-z+.-]*:/i;

  if (urlSchemeRegex.test(basePath)) {
    const url = new URL(uri, "".concat(basePath, "/"));
    return decodeURI(url.toString());
  } else if (uri.startsWith('/')) {
    return uri;
  }

  return "".concat(basePath, "/").concat(uri);
}

function normalizeTileData(tile, options) {
  if (!tile) {
    return null;
  }

  if (tile.content) {
    const contentUri = tile.content.uri || tile.content.url;
    tile.contentUrl = resolveUri(contentUri, options.basePath);
  }

  tile.id = tile.contentUrl;
  tile.lodMetricType = LOD_METRIC_TYPE.GEOMETRIC_ERROR;
  tile.lodMetricValue = tile.geometricError;
  tile.transformMatrix = tile.transform;
  tile.type = getTileType(tile);
  tile.refine = getRefine(tile.refine);
  return tile;
}
function normalizeTileHeaders(tileset) {
  const basePath = tileset.basePath;
  const root = normalizeTileData(tileset.root, tileset);
  const stack = [];
  stack.push(root);

  while (stack.length > 0) {
    const tile = stack.pop() || {};
    const children = tile.children || [];

    for (const childHeader of children) {
      normalizeTileData(childHeader, {
        basePath
      });
      stack.push(childHeader);
    }
  }

  return root;
}
async function normalizeImplicitTileHeaders(tileset) {
  if (!tileset.root) {
    return null;
  }

  const basePath = tileset.basePath;
  const implicitTilingExtension = tileset.root.extensions['3DTILES_implicit_tiling'];
  const {
    subdivisionScheme,
    maximumLevel,
    subtreeLevels,
    subtrees: {
      uri: subtreesUriTemplate
    }
  } = implicitTilingExtension;
  const subtreeUrl = replaceContentUrlTemplate(subtreesUriTemplate, 0, 0, 0, 0);
  const rootSubtreeUrl = resolveUri(subtreeUrl, basePath);
  const rootSubtree = await load(rootSubtreeUrl, Tile3DSubtreeLoader);
  const contentUrlTemplate = resolveUri(tileset.root.content.uri, basePath);
  const refine = tileset.root.refine;
  const rootLodMetricValue = tileset.root.geometricError;
  const rootBoundingVolume = tileset.root.boundingVolume;
  const options = {
    contentUrlTemplate,
    subtreesUriTemplate,
    subdivisionScheme,
    subtreeLevels,
    maximumLevel,
    refine,
    basePath,
    lodMetricType: LOD_METRIC_TYPE.GEOMETRIC_ERROR,
    rootLodMetricValue,
    rootBoundingVolume,
    getTileType,
    getRefine
  };
  return await normalizeImplicitTileData(tileset.root, rootSubtree, options);
}
async function normalizeImplicitTileData(tile, rootSubtree, options) {
  if (!tile) {
    return null;
  }

  tile.lodMetricType = LOD_METRIC_TYPE.GEOMETRIC_ERROR;
  tile.lodMetricValue = tile.geometricError;
  tile.transformMatrix = tile.transform;
  const {
    children,
    contentUrl
  } = await parseImplicitTiles({
    subtree: rootSubtree,
    options
  });

  if (contentUrl) {
    tile.contentUrl = contentUrl;
    tile.content = {
      uri: contentUrl.replace("".concat(options.basePath, "/"), '')
    };
  }

  tile.refine = getRefine(tile.refine);
  tile.type = getTileType(tile);
  tile.children = children;
  tile.id = tile.contentUrl;
  return tile;
}

const IMPLICIT_TILING_EXTENSION_NAME = '3DTILES_implicit_tiling';
const Tiles3DLoader = {
  id: '3d-tiles',
  name: '3D Tiles',
  module: '3d-tiles',
  version: VERSION$5,
  extensions: ['cmpt', 'pnts', 'b3dm', 'i3dm'],
  mimeTypes: ['application/octet-stream'],
  tests: ['cmpt', 'pnts', 'b3dm', 'i3dm'],
  parse,
  options: {
    '3d-tiles': {
      loadGLTF: true,
      decodeQuantizedPositions: false,
      isTileset: 'auto',
      assetGltfUpAxis: null
    }
  }
};

function getBaseUri(tileset) {
  return dirname(tileset.url);
}

async function parseTile(arrayBuffer, options, context) {
  const tile = {
    content: {
      featureIds: null
    }
  };
  const byteOffset = 0;
  await parse3DTile(arrayBuffer, byteOffset, options, context, tile.content);
  return tile.content;
}

async function parseTileset(data, options, context) {
  var _tilesetJson$root;

  const tilesetJson = JSON.parse(new TextDecoder().decode(data));
  tilesetJson.loader = options.loader || Tiles3DLoader;
  tilesetJson.url = context.url;
  tilesetJson.basePath = getBaseUri(tilesetJson);
  tilesetJson.root = hasImplicitTilingExtension(tilesetJson) ? await normalizeImplicitTileHeaders(tilesetJson) : normalizeTileHeaders(tilesetJson);
  tilesetJson.type = TILESET_TYPE.TILES3D;
  tilesetJson.lodMetricType = LOD_METRIC_TYPE.GEOMETRIC_ERROR;
  tilesetJson.lodMetricValue = ((_tilesetJson$root = tilesetJson.root) === null || _tilesetJson$root === void 0 ? void 0 : _tilesetJson$root.lodMetricValue) || 0;
  return tilesetJson;
}

async function parse(data, options, context) {
  const loaderOptions = options['3d-tiles'] || {};
  let isTileset;

  if (loaderOptions.isTileset === 'auto') {
    isTileset = context.url && context.url.indexOf('.json') !== -1;
  } else {
    isTileset = loaderOptions.isTileset;
  }

  if (isTileset) {
    data = await parseTileset(data, options, context);
  } else {
    data = await parseTile(data, options, context);
  }

  return data;
}

function hasImplicitTilingExtension(tilesetJson) {
  var _tilesetJson$extensio, _tilesetJson$extensio2;

  return (tilesetJson === null || tilesetJson === void 0 ? void 0 : (_tilesetJson$extensio = tilesetJson.extensionsRequired) === null || _tilesetJson$extensio === void 0 ? void 0 : _tilesetJson$extensio.includes(IMPLICIT_TILING_EXTENSION_NAME)) && (tilesetJson === null || tilesetJson === void 0 ? void 0 : (_tilesetJson$extensio2 = tilesetJson.extensionsUsed) === null || _tilesetJson$extensio2 === void 0 ? void 0 : _tilesetJson$extensio2.includes(IMPLICIT_TILING_EXTENSION_NAME));
}

const CESIUM_ION_URL = 'https://api.cesium.com/v1/assets';
async function getIonTilesetMetadata(accessToken, assetId) {
  if (!assetId) {
    const assets = await getIonAssets(accessToken);

    for (const item of assets.items) {
      if (item.type === '3DTILES') {
        assetId = item.id;
      }
    }
  }

  const ionAssetMetadata = await getIonAssetMetadata(accessToken, assetId);
  const {
    type,
    url
  } = ionAssetMetadata;
  assert$7(type === '3DTILES' && url);
  ionAssetMetadata.headers = {
    Authorization: "Bearer ".concat(ionAssetMetadata.accessToken)
  };
  return ionAssetMetadata;
}
async function getIonAssets(accessToken) {
  assert$7(accessToken);
  const url = CESIUM_ION_URL;
  const headers = {
    Authorization: "Bearer ".concat(accessToken)
  };
  const response = await fetchFile(url, {
    fetch: {
      headers
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
async function getIonAssetMetadata(accessToken, assetId) {
  assert$7(accessToken, assetId);
  const headers = {
    Authorization: "Bearer ".concat(accessToken)
  };
  const url = "".concat(CESIUM_ION_URL, "/").concat(assetId);
  let response = await fetchFile("".concat(url), {
    fetch: {
      headers
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  let metadata = await response.json();
  response = await fetchFile("".concat(url, "/endpoint"), {
    fetch: {
      headers
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const tilesetInfo = await response.json();
  metadata = { ...metadata,
    ...tilesetInfo
  };
  return metadata;
}

async function preload(url, options = {}) {
  options = options['cesium-ion'] || {};
  const {
    accessToken
  } = options;
  let assetId = options.assetId;

  if (!Number.isFinite(assetId)) {
    const matched = url.match(/\/([0-9]+)\/tileset.json/);
    assetId = matched && matched[1];
  }

  return getIonTilesetMetadata(accessToken, assetId);
}

const CesiumIonLoader = { ...Tiles3DLoader,
  id: 'cesium-ion',
  name: 'Cesium Ion',
  preload,
  parse: async (data, options, context) => {
    options = { ...options
    };
    options['3d-tiles'] = options['cesium-ion'];
    options.loader = CesiumIonLoader;
    return Tiles3DLoader.parse(data, options, context);
  },
  options: {
    'cesium-ion': { ...Tiles3DLoader.options['3d-tiles'],
      accessToken: null
    }
  }
};

// From https://github.com/potree/potree/blob/master/src/materials/PointCloudMaterial.js
function generateGradientTexture(gradient) {
    const size = 64;
    // create canvas
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    // get context
    const context = canvas.getContext('2d');
    // draw gradient
    context.rect(0, 0, size, size);
    const ctxGradient = context.createLinearGradient(0, 0, size, size);
    for (let i = 0; i < gradient.length; i++) {
        const step = gradient[i];
        ctxGradient.addColorStop(step[0], '#' + step[1].getHexString());
    }
    context.fillStyle = ctxGradient;
    context.fill();
    //let texture = new THREE.Texture(canvas);
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = LinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(2, 2);
    // textureImage = texture.image;
    return texture;
}
function getCameraFrustum(camera) {
    camera.updateMatrix(); // make sure camera's local matrix is updated
    camera.updateMatrixWorld(); // make sure camera's world matrix is updated
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
    const frustum = new Frustum();
    frustum.setFromProjectionMatrix(new Matrix4$1().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
    return frustum;
}
function loadersPlaneToMesh(plane) {
    const group = new Group();
    // Create a basic rectangle geometry from math.gl plane
    const planeGeometry = new PlaneGeometry(10, 5);
    // Align the geometry to the plane
    const coplanarPoint = new Vector3$1(...plane.projectPointOntoPlane([0, 0, 0]));
    const normal = new Vector3$1(plane.normal.x, plane.normal.y, plane.normal.z);
    const focalPoint = new Vector3$1().copy(coplanarPoint).add(normal);
    planeGeometry.lookAt(focalPoint);
    planeGeometry.translate(coplanarPoint.x, coplanarPoint.y, coplanarPoint.z);
    // Edges
    /*
    const edges = new EdgesGeometry(planeGeometry)
    var dispPlane = new LineSegments(edges, new LineBasicMaterial({ color: 0x00ffff }))*/
    //plane
    const material = new MeshBasicMaterial({ color: 0x00ffff, side: DoubleSide });
    const mesh = new Mesh(planeGeometry, material);
    const arrowHelper = new ArrowHelper(normal, coplanarPoint, 5, 0xffff00);
    group.add(arrowHelper);
    group.add(mesh);
    return group;
}

const Gradients = {
    // From chroma spectral http://gka.github.io/chroma.js/
    SPECTRAL: [
        [0, new Color(0.3686, 0.3098, 0.6353)],
        [0.1, new Color(0.1961, 0.5333, 0.7412)],
        [0.2, new Color(0.4, 0.7608, 0.6471)],
        [0.3, new Color(0.6706, 0.8667, 0.6431)],
        [0.4, new Color(0.902, 0.9608, 0.5961)],
        [0.5, new Color(1.0, 1.0, 0.749)],
        [0.6, new Color(0.9961, 0.8784, 0.5451)],
        [0.7, new Color(0.9922, 0.6824, 0.3804)],
        [0.8, new Color(0.9569, 0.4275, 0.2627)],
        [0.9, new Color(0.8353, 0.2431, 0.3098)],
        [1, new Color(0.6196, 0.0039, 0.2588)],
    ],
    PLASMA: [
        [0.0, new Color(0.241, 0.015, 0.61)],
        [0.1, new Color(0.387, 0.001, 0.654)],
        [0.2, new Color(0.524, 0.025, 0.653)],
        [0.3, new Color(0.651, 0.125, 0.596)],
        [0.4, new Color(0.752, 0.227, 0.513)],
        [0.5, new Color(0.837, 0.329, 0.431)],
        [0.6, new Color(0.907, 0.435, 0.353)],
        [0.7, new Color(0.963, 0.554, 0.272)],
        [0.8, new Color(0.992, 0.681, 0.195)],
        [0.9, new Color(0.987, 0.822, 0.144)],
        [1.0, new Color(0.94, 0.975, 0.131)],
    ],
    YELLOW_GREEN: [
        [0, new Color(0.1647, 0.2824, 0.3451)],
        [0.1, new Color(0.1338, 0.3555, 0.4227)],
        [0.2, new Color(0.061, 0.4319, 0.4864)],
        [0.3, new Color(0.0, 0.5099, 0.5319)],
        [0.4, new Color(0.0, 0.5881, 0.5569)],
        [0.5, new Color(0.137, 0.665, 0.5614)],
        [0.6, new Color(0.2906, 0.7395, 0.5477)],
        [0.7, new Color(0.4453, 0.8099, 0.5201)],
        [0.8, new Color(0.6102, 0.8748, 0.485)],
        [0.9, new Color(0.7883, 0.9323, 0.4514)],
        [1, new Color(0.9804, 0.9804, 0.4314)],
    ],
    VIRIDIS: [
        [0.0, new Color(0.267, 0.005, 0.329)],
        [0.1, new Color(0.283, 0.141, 0.458)],
        [0.2, new Color(0.254, 0.265, 0.53)],
        [0.3, new Color(0.207, 0.372, 0.553)],
        [0.4, new Color(0.164, 0.471, 0.558)],
        [0.5, new Color(0.128, 0.567, 0.551)],
        [0.6, new Color(0.135, 0.659, 0.518)],
        [0.7, new Color(0.267, 0.749, 0.441)],
        [0.8, new Color(0.478, 0.821, 0.318)],
        [0.9, new Color(0.741, 0.873, 0.15)],
        [1.0, new Color(0.993, 0.906, 0.144)],
    ],
    INFERNO: [
        [0.0, new Color(0.077, 0.042, 0.206)],
        [0.1, new Color(0.225, 0.036, 0.388)],
        [0.2, new Color(0.373, 0.074, 0.432)],
        [0.3, new Color(0.522, 0.128, 0.42)],
        [0.4, new Color(0.665, 0.182, 0.37)],
        [0.5, new Color(0.797, 0.255, 0.287)],
        [0.6, new Color(0.902, 0.364, 0.184)],
        [0.7, new Color(0.969, 0.516, 0.063)],
        [0.8, new Color(0.988, 0.683, 0.072)],
        [0.9, new Color(0.961, 0.859, 0.298)],
        [1.0, new Color(0.988, 0.998, 0.645)],
    ],
    GRAYSCALE: [
        [0, new Color(0, 0, 0)],
        [1, new Color(1, 1, 1)],
    ],
    // 16 samples of the TURBU color scheme
    // values taken from: https://gist.github.com/mikhailov-work/ee72ba4191942acecc03fe6da94fc73f
    // original file licensed under Apache-2.0
    TURBO: [
        [0.0, new Color(0.18995, 0.07176, 0.23217)],
        [0.07, new Color(0.25107, 0.25237, 0.63374)],
        [0.13, new Color(0.27628, 0.42118, 0.89123)],
        [0.2, new Color(0.25862, 0.57958, 0.99876)],
        [0.27, new Color(0.15844, 0.73551, 0.92305)],
        [0.33, new Color(0.09267, 0.86554, 0.7623)],
        [0.4, new Color(0.19659, 0.94901, 0.59466)],
        [0.47, new Color(0.42778, 0.99419, 0.38575)],
        [0.53, new Color(0.64362, 0.98999, 0.23356)],
        [0.6, new Color(0.80473, 0.92452, 0.20459)],
        [0.67, new Color(0.93301, 0.81236, 0.22667)],
        [0.73, new Color(0.99314, 0.67408, 0.20348)],
        [0.8, new Color(0.9836, 0.49291, 0.12849)],
        [0.87, new Color(0.92105, 0.31489, 0.05475)],
        [0.93, new Color(0.81608, 0.18462, 0.01809)],
        [1.0, new Color(0.66449, 0.08436, 0.00424)],
    ],
    RAINBOW: [
        [0, new Color(0.278, 0, 0.714)],
        [1 / 6, new Color(0, 0, 1)],
        [2 / 6, new Color(0, 1, 1)],
        [3 / 6, new Color(0, 1, 0)],
        [4 / 6, new Color(1, 1, 0)],
        [5 / 6, new Color(1, 0.64, 0)],
        [1, new Color(1, 0, 0)],
    ],
    CONTOUR: [
        [0.0, new Color(0, 0, 0)],
        [0.03, new Color(0, 0, 0)],
        [0.04, new Color(1, 1, 1)],
        [1.0, new Color(1, 1, 1)],
    ],
};

const PointCloudFS = `
  varying vec3 vColor;
  uniform float alpha;

  void main() {
    if (vColor == vec3(0.0, 0.0, 0.0)) {
      discard;
    } else {
      gl_FragColor = vec4( vColor, alpha);
    }
  }
`;
const PointCloudVS = `
  varying vec3 vColor;
  uniform sampler2D gradient;
  uniform sampler2D grayscale;
  attribute float intensity;
  attribute float classification;
  uniform vec3 rootCenter;
  uniform vec3 rootNormal;
  uniform vec2 elevationRange;
  uniform int coloring;
  uniform bool hideGround;
  uniform float maxIntensity;
  uniform float intensityContrast;
  uniform float pointSize;

  #ifdef USE_COLOR
  vec3 getRGB() {
      vec3 rgb = color;
      return rgb;
  }
  #endif

  vec3 getElevation(){
    vec4 world = modelMatrix * vec4( position, 1.0 );
    float diff = abs(dot(rootNormal, (vec3(world) - rootCenter)));
    float w = max(diff - elevationRange.x,0.0) / max(elevationRange.y - elevationRange.x,1.0);
    vec3 cElevation = texture2D(gradient, vec2(w,1.0-w)).rgb;

    return cElevation;
  }

  vec3 getIntensity(){
    // TODO: real contrast enhancement. Check https://github.com/yuki-koyama/enhancer/blob/master/shaders/enhancer.fs
    float intmod = pow(intensity, intensityContrast);
    vec3 cIntensity = texture2D(grayscale, vec2(intmod / maxIntensity ,1.0-(intmod / maxIntensity))).rgb;
    return cIntensity;
  }

  vec3 getClassification(){
    float classNormalized = classification / 255.0;
    vec3 cClassification = texture2D(gradient, vec2(classNormalized * 5.0,1.0-classNormalized * 5.0)).rgb;
    return cClassification;
  }

  vec3 getColor(){
      vec3 color;
      if (hideGround && classification == 2.0) {
         return vec3(0.0, 0.0, 0.0);               
      }

      if (coloring == 1) {
        color = getIntensity();
      }
      else if (coloring == 2) {
        color = getClassification();
      } else if (coloring == 3) {
        color = getElevation();
      } 
      #ifdef USE_COLOR
      else if (coloring == 4) {
        color = getRGB();
      }
      #endif
      else {
        color = vec3(1.0, 1.0, 1.0);
      }
      return color;
  }

  void main() {
      vColor = getColor();

      gl_PointSize = pointSize;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

/** Types of coloring used when viewing point cloud tiles */
var PointCloudColoring;
(function (PointCloudColoring) {
    PointCloudColoring[PointCloudColoring["Intensity"] = 1] = "Intensity";
    PointCloudColoring[PointCloudColoring["Classification"] = 2] = "Classification";
    PointCloudColoring[PointCloudColoring["Elevation"] = 3] = "Elevation";
    PointCloudColoring[PointCloudColoring["RGB"] = 4] = "RGB";
    PointCloudColoring[PointCloudColoring["White"] = 5] = "White";
})(PointCloudColoring || (PointCloudColoring = {}));
/** Types of shading used when viewing b3dm (mesh) tiles */
var Shading;
(function (Shading) {
    Shading[Shading["FlatTexture"] = 1] = "FlatTexture";
    Shading[Shading["ShadedTexture"] = 2] = "ShadedTexture";
    Shading[Shading["ShadedNoTexture"] = 3] = "ShadedNoTexture";
})(Shading || (Shading = {}));
var GeoTransform;
(function (GeoTransform) {
    GeoTransform[GeoTransform["Reset"] = 1] = "Reset";
    GeoTransform[GeoTransform["Mercator"] = 2] = "Mercator";
    GeoTransform[GeoTransform["WGS84Cartesian"] = 3] = "WGS84Cartesian";
})(GeoTransform || (GeoTransform = {}));

const gradient = Gradients.RAINBOW;
const gradientTexture = typeof document != 'undefined' ? generateGradientTexture(gradient) : null;
const grayscale = Gradients.GRAYSCALE;
const grayscaleTexture = typeof document != 'undefined' ? generateGradientTexture(grayscale) : null;
const defaultOptions = {
    throttleRequests: true,
    maxRequests: 64,
    updateInterval: 0.1,
    maxConcurrency: 1,
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 32,
    viewDistanceScale: 1.0,
    skipLevelOfDetail: false,
    updateTransforms: true,
    shading: Shading.FlatTexture,
    transparent: false,
    pointCloudColoring: PointCloudColoring.Classification,
    pointSize: 1.0,
    worker: true,
    wireframe: false,
    debug: false,
    basisTranscoderPath: null,
    dracoDecoderPath: null,
    material: null,
    computeNormals: false,
    shaderCallback: null,
    geoTransform: GeoTransform.Reset,
    preloadTilesCount: null
};
class LoaderLAS {
    static load(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, defaultOptions), props.options);
            const { url } = props;
            options.updateInterval;
            const loadersGLOptions = {};
            if (props.loadingManager) {
                props.loadingManager.itemStart(url);
            }
            const data = yield load(url, LASLoader, Object.assign({}, loadersGLOptions));
            new Group();
            //root.add(data);
            //console.log(root);
            const pointcloudUniforms = {
                pointSize: { type: 'f', value: options.pointSize },
                gradient: { type: 't', value: gradientTexture },
                grayscale: { type: 't', value: grayscaleTexture },
                rootCenter: { type: 'vec3', value: new Vector3$1() },
                rootNormal: { type: 'vec3', value: new Vector3$1() },
                coloring: { type: 'i', value: options.pointCloudColoring },
                hideGround: { type: 'b', value: true },
                elevationRange: { type: 'vec2', value: new Vector2$1(0, 400) },
                maxIntensity: { type: 'f', value: 1.0 },
                intensityContrast: { type: 'f', value: 1.0 },
                alpha: { type: 'f', value: 1.0 },
            };
            new ShaderMaterial({
                uniforms: pointcloudUniforms,
                vertexShader: PointCloudVS,
                fragmentShader: PointCloudFS,
                transparent: options.transparent,
                vertexColors: true
            });
            new MeshBasicMaterial({ transparent: options.transparent });
            return data;
            // runtime: {
            //   getTileset: () => {
            //     return data;
            //   //   return tileset;
            //   },
            //   getStats: () => {
            //     return null;
            //   //   return tileset.stats;
            //   },
            //   showTiles: (visible) => {
            //   //   tileBoxes.visible = visible;
            //   },
            //   setWireframe: (wireframe) => {
            //     options.wireframe = wireframe;
            //     root.traverse((object) => {
            //       if (object instanceof Mesh) {
            //         object.material.wireframe = wireframe;
            //       }
            //     });
            //   },
            //   setDebug: (debug) => {
            //     options.debug = debug;
            //   },
            //   setShading: (shading) => {
            //     options.shading = shading;
            //   },
            //   getTileBoxes: () => {
            //     return null;
            //   },
            //   setViewDistanceScale: (scale) => {
            //   //   tileset.options.viewDistanceScale = scale;
            //   //   tileset._frameNumber++;
            //   //   tilesetUpdate(tileset, renderMap, rendererReference, cameraReference);
            //   },
            //   setHideGround: (enabled) => {
            //     pointcloudUniforms.hideGround.value = enabled;
            //   },
            //   setPointCloudColoring: (selection) => {
            //     pointcloudUniforms.coloring.value = selection;
            //   },
            //   setElevationRange: (range) => {
            //     pointcloudUniforms.elevationRange.value.set(range[0], range[1]);
            //   },
            //   setMaxIntensity: (intensity) => {
            //     pointcloudUniforms.maxIntensity.value = intensity;
            //   },
            //   setIntensityContrast: (contrast) => {
            //     pointcloudUniforms.intensityContrast.value = contrast;
            //   },
            //   setPointAlpha: (alpha) => {
            //     pointcloudUniforms.alpha.value = alpha;
            //   },
            //   getLatLongHeightFromPosition: (position) => {
            //   //   const cartographicPosition = tileset.ellipsoid.cartesianToCartographic(
            //   //     new Vector3().copy(position).applyMatrix4(new Matrix4().copy(threeMat).invert()).toArray(),
            //   //   );
            //   //   return {
            //   //     lat: cartographicPosition[1],
            //   //     long: cartographicPosition[0],
            //   //     height: cartographicPosition[2],
            //   //   };
            //   return null;
            //   },
            //   getPositionFromLatLongHeight: (coord) => {
            //   //   const cartesianPosition = tileset.ellipsoid.cartographicToCartesian([coord.long, coord.lat, coord.height]);
            //   //   return new Vector3(...cartesianPosition).applyMatrix4(threeMat);
            //   return null;
            //   },
            //   getCameraFrustum: (camera: Camera) => {
            //     const frustum = Util.getCameraFrustum(camera);
            //     const meshes = frustum.planes
            //       .map((plane) => new Plane(plane.normal.toArray(), plane.constant))
            //       .map((loadersPlane) => Util.loadersPlaneToMesh(loadersPlane));
            //     const model = new Group();
            //     for (const mesh of meshes) model.add(mesh);
            //     return model;
            //   },
            //   update: function (dt: number, renderer: WebGLRenderer, camera: Camera) {
            //     cameraReference = camera;
            //     rendererReference = renderer;
            //     timer += dt;
            //   },
            //   dispose: function () {
            //     // disposeFlag = true;
            //     // tileset._destroy();
            //     while (root.children.length > 0) {
            //       const obj = root.children[0];
            //       disposeNode(obj);
            //       root.remove(obj);
            //     }
            //   },
            // },
            //};
        });
    }
}
/** 3D Tiles Loader */
class Loader3DTiles {
    /**
    * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
    * @public
    *
    * @param props - Properties for this load call {@link LoaderProps}.
    * @returns An object containing the 3D Model to be added to the scene
    * and a runtime engine to be updated every frame.
    */
    static load(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = Object.assign(Object.assign({}, defaultOptions), props.options);
            const { url } = props;
            options.updateInterval;
            const loadersGLOptions = {};
            if (options.cesiumIONToken) {
                loadersGLOptions['cesium-ion'] = {
                    accessToken: options.cesiumIONToken,
                };
                const metadata = yield CesiumIonLoader.preload(url, loadersGLOptions);
                loadersGLOptions['fetch'] = { headers: metadata.headers };
            }
            if (props.loadingManager) {
                props.loadingManager.itemStart(url);
            }
            yield load(url, Tiles3DLoader, Object.assign({}, loadersGLOptions));
            const root = new Group();
            const tileBoxes = new Group();
            if (!options.debug) {
                tileBoxes.visible = false;
            }
            else {
                // TODO: Need to have a parent root with no transform and then a conent root with transform
                root.add(tileBoxes);
            }
            const pointcloudUniforms = {
                pointSize: { type: 'f', value: options.pointSize },
                gradient: { type: 't', value: gradientTexture },
                grayscale: { type: 't', value: grayscaleTexture },
                rootCenter: { type: 'vec3', value: new Vector3$1() },
                rootNormal: { type: 'vec3', value: new Vector3$1() },
                coloring: { type: 'i', value: options.pointCloudColoring },
                hideGround: { type: 'b', value: true },
                elevationRange: { type: 'vec2', value: new Vector2$1(0, 400) },
                maxIntensity: { type: 'f', value: 1.0 },
                intensityContrast: { type: 'f', value: 1.0 },
                alpha: { type: 'f', value: 1.0 },
            };
            new ShaderMaterial({
                uniforms: pointcloudUniforms,
                vertexShader: PointCloudVS,
                fragmentShader: PointCloudFS,
                transparent: options.transparent,
                vertexColors: true
            });
            // if (options.basisTranscoderPath) {
            //   ktx2Loader = new KTX2Loader();
            //   ktx2Loader.detectSupport(props.renderer);
            //   ktx2Loader.setTranscoderPath(options.basisTranscoderPath + '/');
            //   ktx2Loader.setWorkerLimit(1);
            //   gltfLoader.setKTX2Loader(ktx2Loader);
            // }
            // if (options.dracoDecoderPath) {
            //   dracoLoader = new DRACOLoader();
            //   dracoLoader.setDecoderPath(options.dracoDecoderPath + '/');
            //   dracoLoader.setWorkerLimit(options.maxConcurrency);
            //   gltfLoader.setDRACOLoader(dracoLoader);
            // }
            new MeshBasicMaterial({ transparent: options.transparent });
            // let lastCameraTransform: Matrix4 = null;
            // let lastCameraAspect = null;
            // const lastCameraPosition = new Vector3(Infinity, Infinity, Infinity);
            // let sseDenominator = null;
            // root.updateMatrixWorld(true);
            // const lastRootTransform:Matrix4 = new Matrix4().copy(root.matrixWorld)
            // const rootTransformInverse = new Matrix4().copy(lastRootTransform).invert();
            // detectOrientation(tileset.root);
            // updateResetTransform();
            // if (options.debug) {
            //   boxMap[tileset.root.id].applyMatrix4(threeMat);
            //   tileBoxes.matrixWorld.copy(root.matrixWorld);
            // }
            // if (options.geoTransform == GeoTransform.Mercator) {
            //   const coords = Util.datumsToSpherical(
            //     tileset.cartographicCenter[1],
            //     tileset.cartographicCenter[0]
            //   )
            //   rootCenter.set(
            //    coords.x,
            //    0,
            //    -coords.y
            //   );
            //   root.position.copy(rootCenter);
            //   root.rotation.set(-Math.PI / 2, 0, 0);
            //   root.updateMatrixWorld(true);
            // } else if (options.geoTransform == GeoTransform.WGS84Cartesian) {
            //   root.applyMatrix4(tileTrasnform);
            //   root.updateMatrixWorld(true);
            //   rootCenter.copy(root.position);
            // }
            // function detectOrientation(tile) {
            //   if (!tile.boundingVolume.halfAxes) {
            //     return;
            //   }
            //   const halfAxes = tile.boundingVolume.halfAxes;
            //   const orientationMatrix = new Matrix4()
            //   .extractRotation(Util.getMatrix4FromHalfAxes(halfAxes))
            //   .premultiply(new Matrix4().extractRotation(rootTransformInverse));
            //   const rotation = new Euler().setFromRotationMatrix(orientationMatrix);
            //   if (!rotation.equals(new Euler())) {
            //     orientationDetected = true;
            //     const pos = new Vector3(
            //       tileTrasnform.elements[12], 
            //       tileTrasnform.elements[13], 
            //       tileTrasnform.elements[14])
            //     ;
            //     tileTrasnform.extractRotation(orientationMatrix);
            //     tileTrasnform.setPosition(pos);
            //     updateResetTransform();
            //   } 
            // }
            // function updateResetTransform() {
            //   if (options.geoTransform != GeoTransform.WGS84Cartesian) {
            //     // Reset the current model matrix and apply our own transformation
            //     threeMat.copy(tileTrasnform).invert();
            //     threeMat.premultiply(lastRootTransform);
            //     threeMat.copy(lastRootTransform).multiply(new Matrix4().copy(tileTrasnform).invert());
            //     tileset.modelMatrix = new MathGLMatrix4(threeMat.toArray());
            //   }
            // }
            // function tilesetUpdate(tileset, renderMap, renderer, camera) {
            //   if (disposeFlag) {
            //     return;
            //   }
            //   // Assumes camera fov, near and far are not changing
            //   if (!sseDenominator || camera.aspect != lastCameraAspect) {
            //     const loadersFrustum = new PerspectiveFrustum({
            //       fov: (camera.fov / 180) * Math.PI,
            //       aspectRatio: camera.aspect,
            //       near: camera.near,
            //       far: camera.far,
            //     });
            //     sseDenominator = loadersFrustum.sseDenominator;
            //     lastCameraAspect = camera.aspect;
            //     if (options.debug) {
            //       console.log('Updated sse denonimator:', sseDenominator);
            //     }
            //   }
            //   const frustum = Util.getCameraFrustum(camera);
            //   const planes = frustum.planes.map((plane) => new Plane(plane.normal.toArray(), plane.constant));
            //   const cullingVolume = new CullingVolume(planes);
            //   const rendererSize = new Vector2();
            //   renderer.getSize(rendererSize);
            //   const frameState = {
            //     camera: {
            //       position: lastCameraPosition.toArray(),
            //     },
            //     height: rendererSize.y,
            //     frameNumber: tileset._frameNumber,
            //     sseDenominator: sseDenominator,
            //     cullingVolume: cullingVolume,
            //     viewport: {
            //       id: 0,
            //     },
            //   };
            //   tileset._cache.reset();
            //   tileset._traverser.traverse(tileset.root, frameState, tileset.options);
            //   for (const tile of tileset.tiles) {
            //     if (tile.selected) {
            //       if (!renderMap[tile.id]) {
            //         console.error('TILE SELECTED BUT NOT LOADED!!', tile.id);
            //       } else {
            //         // Make sure it's visible
            //         renderMap[tile.id].visible = true;
            //       }
            //     } else {
            //       if (renderMap[tile.id]) {
            //         renderMap[tile.id].visible = false;
            //       }
            //     }
            //   }
            //   while (unloadQueue.length > 0) {
            //     const tile = unloadQueue.pop();
            //     if (renderMap[tile.id] && tile.contentState == TILE_CONTENT_STATE.UNLOADED) {
            //       root.remove(renderMap[tile.id]);
            //       disposeNode(renderMap[tile.id]);
            //       delete renderMap[tile.id];
            //     }
            //     if (boxMap[tile.id]) {
            //       disposeNode(boxMap[tile.id]);
            //       tileBoxes.remove(boxMap[tile.id]);
            //       delete boxMap[tile.id];
            //     }
            //   }
            //   const tilesLoaded = tileset.stats.get('Tiles Loaded').count;
            //   const tilesLoading = tileset.stats.get('Tiles Loading').count;
            //   if (props.onProgress) {
            //     props.onProgress(
            //       tilesLoaded,
            //       tilesLoaded + tilesLoading
            //     );
            //   }
            //   if (props.loadingManager && !loadingEnded) {
            //     if (tilesLoading == 0 && 
            //        (
            //         options.preloadTilesCount == null ||
            //         tilesLoaded >= options.preloadTilesCount)
            //        ) {
            //          loadingEnded = true;
            //          props.loadingManager.itemEnd(props.url);
            //        }
            //   }
            //   return frameState;
            // }
            return {
                model: root,
                runtime: {
                    getTileset: () => {
                        return null;
                        //   return tileset;
                    },
                    getStats: () => {
                        return null;
                        //   return tileset.stats;
                    },
                    showTiles: (visible) => {
                        //   tileBoxes.visible = visible;
                    },
                    setWireframe: (wireframe) => {
                        options.wireframe = wireframe;
                        root.traverse((object) => {
                            if (object instanceof Mesh) {
                                object.material.wireframe = wireframe;
                            }
                        });
                    },
                    setDebug: (debug) => {
                        options.debug = debug;
                        tileBoxes.visible = debug;
                    },
                    setShading: (shading) => {
                        options.shading = shading;
                    },
                    getTileBoxes: () => {
                        return tileBoxes;
                    },
                    setViewDistanceScale: (scale) => {
                        //   tileset.options.viewDistanceScale = scale;
                        //   tileset._frameNumber++;
                        //   tilesetUpdate(tileset, renderMap, rendererReference, cameraReference);
                    },
                    setHideGround: (enabled) => {
                        pointcloudUniforms.hideGround.value = enabled;
                    },
                    setPointCloudColoring: (selection) => {
                        pointcloudUniforms.coloring.value = selection;
                    },
                    setElevationRange: (range) => {
                        //   pointcloudUniforms.elevationRange.value.set(range[0], range[1]);
                    },
                    setMaxIntensity: (intensity) => {
                        pointcloudUniforms.maxIntensity.value = intensity;
                    },
                    setIntensityContrast: (contrast) => {
                        pointcloudUniforms.intensityContrast.value = contrast;
                    },
                    setPointAlpha: (alpha) => {
                        pointcloudUniforms.alpha.value = alpha;
                    },
                    getLatLongHeightFromPosition: (position) => {
                        //   const cartographicPosition = tileset.ellipsoid.cartesianToCartographic(
                        //     new Vector3().copy(position).applyMatrix4(new Matrix4().copy(threeMat).invert()).toArray(),
                        //   );
                        //   return {
                        //     lat: cartographicPosition[1],
                        //     long: cartographicPosition[0],
                        //     height: cartographicPosition[2],
                        //   };
                        return null;
                    },
                    getPositionFromLatLongHeight: (coord) => {
                        //   const cartesianPosition = tileset.ellipsoid.cartographicToCartesian([coord.long, coord.lat, coord.height]);
                        //   return new Vector3(...cartesianPosition).applyMatrix4(threeMat);
                        return null;
                    },
                    getCameraFrustum: (camera) => {
                        const frustum = getCameraFrustum(camera);
                        const meshes = frustum.planes
                            .map((plane) => new Plane(plane.normal.toArray(), plane.constant))
                            .map((loadersPlane) => loadersPlaneToMesh(loadersPlane));
                        const model = new Group();
                        for (const mesh of meshes)
                            model.add(mesh);
                        return model;
                    },
                    update: function (dt, renderer, camera) {
                        // if (tileset && timer >= UPDATE_INTERVAL) {
                        //   // if (!lastRootTransform.equals(root.matrixWorld)) {
                        //   //   timer = 0;
                        //   //   lastRootTransform.copy(root.matrixWorld);
                        //   //   updateResetTransform();
                        //   //   const rootCenter = new Vector3().setFromMatrixPosition(lastRootTransform);
                        //   //   pointcloudUniforms.rootCenter.value.copy(rootCenter);
                        //   //   pointcloudUniforms.rootNormal.value.copy(new Vector3(0, 0, 1).applyMatrix4(lastRootTransform).normalize());
                        //   //   rootTransformInverse.copy(lastRootTransform).invert(); 
                        //   //   if (options.debug) {
                        //   //     boxMap[tileset.root.id].matrixWorld.copy(threeMat);
                        //   //     boxMap[tileset.root.id].applyMatrix4(lastRootTransform);
                        //   //   }
                        //   // }
                        //   if (lastCameraTransform == null) {
                        //     lastCameraTransform = new Matrix4().copy(camera.matrixWorld);
                        //   } else {
                        //     const cameraChanged: boolean =
                        //       !camera.matrixWorld.equals(lastCameraTransform) ||
                        //       !((<PerspectiveCamera>camera).aspect == lastCameraAspect);
                        //     if (cameraChanged) {
                        //       timer = 0;
                        //       tileset._frameNumber++;
                        //       camera.getWorldPosition(lastCameraPosition);
                        //       lastCameraTransform.copy(camera.matrixWorld);
                        //       tilesetUpdate(tileset, renderMap, renderer, camera);
                        //     }
                        //   }
                        // }
                    },
                    dispose: function () {
                        // disposeFlag = true;
                        // tileset._destroy();
                        while (root.children.length > 0) {
                            const obj = root.children[0];
                            disposeNode(obj);
                            root.remove(obj);
                        }
                        while (tileBoxes.children.length > 0) {
                            const obj = tileBoxes.children[0];
                            tileBoxes.remove(obj);
                            obj.geometry.dispose();
                            obj.material.dispose();
                        }
                    },
                },
            };
        });
    }
}
function disposeMaterial(material) {
    var _a, _b, _c, _d;
    if ((_a = material === null || material === void 0 ? void 0 : material.uniforms) === null || _a === void 0 ? void 0 : _a.map) {
        (_c = (_b = material === null || material === void 0 ? void 0 : material.uniforms) === null || _b === void 0 ? void 0 : _b.map.value) === null || _c === void 0 ? void 0 : _c.dispose();
    }
    else if (material.map) {
        (_d = material.map) === null || _d === void 0 ? void 0 : _d.dispose();
    }
    material.dispose();
}
function disposeNode(node) {
    node.traverse((object) => {
        if (object.isMesh) {
            object.geometry.dispose();
            if (object.material.isMaterial) {
                disposeMaterial(object.material);
            }
            else {
                // an array of materials
                for (const material of object.material) {
                    disposeMaterial(material);
                }
            }
        }
    });
    for (let i = node.children.length - 1; i >= 0; i--) {
        const obj = node.children[i];
        node.remove(obj);
    }
}

export { GeoTransform, Loader3DTiles, LoaderLAS, PointCloudColoring, Shading };
//# sourceMappingURL=three-loader-3dtiles.esm.js.map
