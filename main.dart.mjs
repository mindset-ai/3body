// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  async instantiate(additionalImports, {loadDeferredWasm, loadDynamicModule} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            _1: (x0,x1,x2) => x0.set(x1,x2),
      _2: (x0,x1,x2) => x0.set(x1,x2),
      _6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
      _7: x0 => new window.FinalizationRegistry(x0),
      _8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _9: (x0,x1) => x0.unregister(x1),
      _10: (x0,x1,x2) => x0.slice(x1,x2),
      _11: (x0,x1) => x0.decode(x1),
      _12: (x0,x1) => x0.segment(x1),
      _13: () => new TextDecoder(),
      _14: x0 => x0.buffer,
      _15: x0 => x0.wasmMemory,
      _16: () => globalThis.window._flutter_skwasmInstance,
      _17: x0 => x0.rasterStartMilliseconds,
      _18: x0 => x0.rasterEndMilliseconds,
      _19: x0 => x0.imageBitmaps,
      _192: x0 => x0.select(),
      _193: (x0,x1) => x0.append(x1),
      _194: x0 => x0.remove(),
      _197: x0 => x0.unlock(),
      _202: x0 => x0.getReader(),
      _211: x0 => new MutationObserver(x0),
      _222: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _223: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _226: x0 => new ResizeObserver(x0),
      _229: (x0,x1) => new Intl.Segmenter(x0,x1),
      _230: x0 => x0.next(),
      _231: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _234: (x0,x1) => x0.addListener(x1),
      _235: (x0,x1) => x0.removeListener(x1),
      _320: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._320(f,arguments.length,x0) }),
      _321: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._321(f,arguments.length,x0) }),
      _322: (x0,x1) => ({addView: x0,removeView: x1}),
      _323: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._323(f,arguments.length,x0) }),
      _324: f => finalizeWrapper(f, function() { return dartInstance.exports._324(f,arguments.length) }),
      _325: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _326: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._326(f,arguments.length,x0) }),
      _327: x0 => ({runApp: x0}),
      _328: x0 => new Uint8Array(x0),
      _330: x0 => x0.preventDefault(),
      _331: x0 => x0.stopPropagation(),
      _332: (x0,x1) => x0.prepend(x1),
      _333: x0 => x0.remove(),
      _334: x0 => x0.disconnect(),
      _335: (x0,x1) => x0.addListener(x1),
      _336: (x0,x1) => x0.removeListener(x1),
      _337: x0 => x0.blur(),
      _338: (x0,x1) => x0.append(x1),
      _339: x0 => x0.remove(),
      _340: x0 => x0.stopPropagation(),
      _344: x0 => x0.preventDefault(),
      _349: (x0,x1) => x0.removeChild(x1),
      _350: (x0,x1) => x0.appendChild(x1),
      _351: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _352: (x0,x1) => x0.appendChild(x1),
      _353: (x0,x1) => x0.transferFromImageBitmap(x1),
      _355: (x0,x1) => x0.append(x1),
      _356: (x0,x1) => x0.append(x1),
      _357: (x0,x1) => x0.append(x1),
      _358: x0 => x0.remove(),
      _359: x0 => x0.remove(),
      _360: x0 => x0.remove(),
      _361: (x0,x1) => x0.appendChild(x1),
      _362: (x0,x1) => x0.appendChild(x1),
      _363: x0 => x0.remove(),
      _364: (x0,x1) => x0.append(x1),
      _365: (x0,x1) => x0.append(x1),
      _366: x0 => x0.remove(),
      _367: (x0,x1) => x0.append(x1),
      _368: (x0,x1) => x0.append(x1),
      _369: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _370: (x0,x1) => x0.append(x1),
      _371: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _372: x0 => x0.remove(),
      _373: (x0,x1) => x0.append(x1),
      _374: x0 => x0.remove(),
      _375: (x0,x1) => x0.append(x1),
      _376: x0 => x0.remove(),
      _377: x0 => x0.remove(),
      _378: x0 => x0.getBoundingClientRect(),
      _379: x0 => x0.remove(),
      _392: (x0,x1) => x0.append(x1),
      _393: x0 => x0.remove(),
      _394: (x0,x1) => x0.append(x1),
      _395: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _396: x0 => x0.preventDefault(),
      _397: x0 => x0.preventDefault(),
      _398: x0 => x0.preventDefault(),
      _399: x0 => x0.preventDefault(),
      _400: (x0,x1) => x0.observe(x1),
      _401: x0 => x0.disconnect(),
      _402: (x0,x1) => x0.appendChild(x1),
      _403: (x0,x1) => x0.appendChild(x1),
      _404: (x0,x1) => x0.appendChild(x1),
      _405: (x0,x1) => x0.append(x1),
      _406: x0 => x0.remove(),
      _407: (x0,x1) => x0.append(x1),
      _409: (x0,x1) => x0.appendChild(x1),
      _410: (x0,x1) => x0.append(x1),
      _411: x0 => x0.remove(),
      _412: (x0,x1) => x0.append(x1),
      _413: x0 => x0.remove(),
      _417: (x0,x1) => x0.appendChild(x1),
      _418: x0 => x0.remove(),
      _422: x0 => x0.preventDefault(),
      _423: (x0,x1) => x0.append(x1),
      _424: x0 => x0.remove(),
      _977: () => globalThis.window.flutterConfiguration,
      _978: x0 => x0.assetBase,
      _984: x0 => x0.debugShowSemanticsNodes,
      _985: x0 => x0.hostElement,
      _986: x0 => x0.multiViewEnabled,
      _987: x0 => x0.nonce,
      _989: x0 => x0.fontFallbackBaseUrl,
      _995: x0 => x0.console,
      _996: x0 => x0.devicePixelRatio,
      _997: x0 => x0.document,
      _998: x0 => x0.history,
      _999: x0 => x0.innerHeight,
      _1000: x0 => x0.innerWidth,
      _1001: x0 => x0.location,
      _1002: x0 => x0.navigator,
      _1003: x0 => x0.visualViewport,
      _1004: x0 => x0.performance,
      _1007: (x0,x1) => x0.dispatchEvent(x1),
      _1008: (x0,x1) => x0.matchMedia(x1),
      _1010: (x0,x1) => x0.getComputedStyle(x1),
      _1011: x0 => x0.screen,
      _1012: (x0,x1) => x0.requestAnimationFrame(x1),
      _1013: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1013(f,arguments.length,x0) }),
      _1018: (x0,x1) => x0.warn(x1),
      _1021: () => globalThis.window,
      _1022: () => globalThis.Intl,
      _1023: () => globalThis.Symbol,
      _1026: x0 => x0.clipboard,
      _1027: x0 => x0.maxTouchPoints,
      _1028: x0 => x0.vendor,
      _1029: x0 => x0.language,
      _1030: x0 => x0.platform,
      _1031: x0 => x0.userAgent,
      _1032: x0 => x0.languages,
      _1033: x0 => x0.documentElement,
      _1034: (x0,x1) => x0.querySelector(x1),
      _1038: (x0,x1) => x0.createElement(x1),
      _1039: (x0,x1) => x0.execCommand(x1),
      _1042: (x0,x1) => x0.createTextNode(x1),
      _1043: (x0,x1) => x0.createEvent(x1),
      _1047: x0 => x0.head,
      _1048: x0 => x0.body,
      _1049: (x0,x1) => x0.title = x1,
      _1052: x0 => x0.activeElement,
      _1054: x0 => x0.visibilityState,
      _1056: x0 => x0.hasFocus(),
      _1057: () => globalThis.document,
      _1058: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1059: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1062: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1062(f,arguments.length,x0) }),
      _1063: x0 => x0.target,
      _1065: x0 => x0.timeStamp,
      _1066: x0 => x0.type,
      _1068: x0 => x0.preventDefault(),
      _1070: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _1077: x0 => x0.firstChild,
      _1082: x0 => x0.parentElement,
      _1084: x0 => x0.parentNode,
      _1088: (x0,x1) => x0.removeChild(x1),
      _1089: (x0,x1) => x0.removeChild(x1),
      _1090: x0 => x0.isConnected,
      _1091: (x0,x1) => x0.textContent = x1,
      _1095: (x0,x1) => x0.contains(x1),
      _1101: x0 => x0.firstElementChild,
      _1103: x0 => x0.nextElementSibling,
      _1104: x0 => x0.clientHeight,
      _1105: x0 => x0.clientWidth,
      _1106: x0 => x0.offsetHeight,
      _1107: x0 => x0.offsetWidth,
      _1108: x0 => x0.id,
      _1109: (x0,x1) => x0.id = x1,
      _1112: (x0,x1) => x0.spellcheck = x1,
      _1113: x0 => x0.tagName,
      _1114: x0 => x0.style,
      _1115: (x0,x1) => x0.append(x1),
      _1117: (x0,x1) => x0.getAttribute(x1),
      _1118: x0 => x0.getBoundingClientRect(),
      _1121: (x0,x1) => x0.closest(x1),
      _1124: (x0,x1) => x0.querySelectorAll(x1),
      _1126: x0 => x0.remove(),
      _1127: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _1128: (x0,x1) => x0.removeAttribute(x1),
      _1129: (x0,x1) => x0.tabIndex = x1,
      _1132: (x0,x1) => x0.focus(x1),
      _1133: x0 => x0.scrollTop,
      _1134: (x0,x1) => x0.scrollTop = x1,
      _1135: x0 => x0.scrollLeft,
      _1136: (x0,x1) => x0.scrollLeft = x1,
      _1137: x0 => x0.classList,
      _1138: (x0,x1) => x0.className = x1,
      _1144: (x0,x1) => x0.getElementsByClassName(x1),
      _1146: x0 => x0.click(),
      _1147: (x0,x1) => x0.hasAttribute(x1),
      _1150: (x0,x1) => x0.attachShadow(x1),
      _1156: (x0,x1) => x0.getPropertyValue(x1),
      _1157: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _1159: (x0,x1) => x0.removeProperty(x1),
      _1161: x0 => x0.offsetLeft,
      _1162: x0 => x0.offsetTop,
      _1163: x0 => x0.offsetParent,
      _1165: (x0,x1) => x0.name = x1,
      _1166: x0 => x0.content,
      _1167: (x0,x1) => x0.content = x1,
      _1185: (x0,x1) => x0.nonce = x1,
      _1190: x0 => x0.now(),
      _1192: (x0,x1) => x0.width = x1,
      _1194: (x0,x1) => x0.height = x1,
      _1198: (x0,x1) => x0.getContext(x1),
      _1277: (x0,x1) => x0.fetch(x1),
      _1278: x0 => x0.status,
      _1280: x0 => x0.body,
      _1281: x0 => x0.arrayBuffer(),
      _1287: x0 => x0.read(),
      _1288: x0 => x0.value,
      _1289: x0 => x0.done,
      _1292: x0 => x0.x,
      _1293: x0 => x0.y,
      _1296: x0 => x0.top,
      _1297: x0 => x0.right,
      _1298: x0 => x0.bottom,
      _1299: x0 => x0.left,
      _1308: x0 => x0.height,
      _1309: x0 => x0.width,
      _1310: x0 => x0.scale,
      _1311: (x0,x1) => x0.value = x1,
      _1313: (x0,x1) => x0.placeholder = x1,
      _1314: (x0,x1) => x0.name = x1,
      _1315: x0 => x0.selectionDirection,
      _1316: x0 => x0.selectionStart,
      _1317: x0 => x0.selectionEnd,
      _1320: x0 => x0.value,
      _1322: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1325: x0 => x0.readText(),
      _1326: (x0,x1) => x0.writeText(x1),
      _1327: x0 => x0.altKey,
      _1328: x0 => x0.code,
      _1329: x0 => x0.ctrlKey,
      _1330: x0 => x0.key,
      _1331: x0 => x0.keyCode,
      _1332: x0 => x0.location,
      _1333: x0 => x0.metaKey,
      _1334: x0 => x0.repeat,
      _1335: x0 => x0.shiftKey,
      _1336: x0 => x0.isComposing,
      _1337: (x0,x1) => x0.getModifierState(x1),
      _1339: x0 => x0.state,
      _1340: (x0,x1) => x0.go(x1),
      _1343: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _1344: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _1345: x0 => x0.pathname,
      _1346: x0 => x0.search,
      _1347: x0 => x0.hash,
      _1351: x0 => x0.state,
      _1357: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1357(f,arguments.length,x0,x1) }),
      _1360: (x0,x1,x2) => x0.observe(x1,x2),
      _1363: x0 => x0.attributeName,
      _1364: x0 => x0.type,
      _1365: x0 => x0.matches,
      _1369: x0 => x0.matches,
      _1371: x0 => x0.relatedTarget,
      _1372: x0 => x0.clientX,
      _1373: x0 => x0.clientY,
      _1374: x0 => x0.offsetX,
      _1375: x0 => x0.offsetY,
      _1378: x0 => x0.button,
      _1379: x0 => x0.buttons,
      _1380: x0 => x0.ctrlKey,
      _1382: (x0,x1) => x0.getModifierState(x1),
      _1385: x0 => x0.pointerId,
      _1386: x0 => x0.pointerType,
      _1387: x0 => x0.pressure,
      _1388: x0 => x0.tiltX,
      _1389: x0 => x0.tiltY,
      _1390: x0 => x0.getCoalescedEvents(),
      _1392: x0 => x0.deltaX,
      _1393: x0 => x0.deltaY,
      _1394: x0 => x0.wheelDeltaX,
      _1395: x0 => x0.wheelDeltaY,
      _1396: x0 => x0.deltaMode,
      _1402: x0 => x0.changedTouches,
      _1404: x0 => x0.clientX,
      _1405: x0 => x0.clientY,
      _1407: x0 => x0.data,
      _1410: (x0,x1) => x0.disabled = x1,
      _1411: (x0,x1) => x0.type = x1,
      _1412: (x0,x1) => x0.max = x1,
      _1413: (x0,x1) => x0.min = x1,
      _1414: (x0,x1) => x0.value = x1,
      _1415: x0 => x0.value,
      _1416: x0 => x0.disabled,
      _1417: (x0,x1) => x0.disabled = x1,
      _1418: (x0,x1) => x0.placeholder = x1,
      _1419: (x0,x1) => x0.name = x1,
      _1420: (x0,x1) => x0.autocomplete = x1,
      _1421: x0 => x0.selectionDirection,
      _1422: x0 => x0.selectionStart,
      _1423: x0 => x0.selectionEnd,
      _1427: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1432: (x0,x1) => x0.add(x1),
      _1435: (x0,x1) => x0.noValidate = x1,
      _1436: (x0,x1) => x0.method = x1,
      _1437: (x0,x1) => x0.action = x1,
      _1463: x0 => x0.orientation,
      _1464: x0 => x0.width,
      _1465: x0 => x0.height,
      _1467: (x0,x1) => x0.lock(x1),
      _1484: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1484(f,arguments.length,x0,x1) }),
      _1493: x0 => x0.length,
      _1494: (x0,x1) => x0.item(x1),
      _1495: x0 => x0.length,
      _1496: (x0,x1) => x0.item(x1),
      _1497: x0 => x0.iterator,
      _1498: x0 => x0.Segmenter,
      _1499: x0 => x0.v8BreakIterator,
      _1502: x0 => x0.done,
      _1503: x0 => x0.value,
      _1504: x0 => x0.index,
      _1508: (x0,x1) => x0.adoptText(x1),
      _1509: x0 => x0.first(),
      _1510: x0 => x0.next(),
      _1511: x0 => x0.current(),
      _1522: x0 => x0.hostElement,
      _1523: x0 => x0.viewConstraints,
      _1525: x0 => x0.maxHeight,
      _1526: x0 => x0.maxWidth,
      _1527: x0 => x0.minHeight,
      _1528: x0 => x0.minWidth,
      _1529: x0 => x0.loader,
      _1530: () => globalThis._flutter,
      _1532: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1533: (x0,x1,x2) => x0.call(x1,x2),
      _1534: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1534(f,arguments.length,x0,x1) }),
      _1535: x0 => new Promise(x0),
      _1539: x0 => x0.length,
      _1619: (x0,x1) => x0.send(x1),
      _1690: x0 => new Array(x0),
      _1692: x0 => x0.length,
      _1694: (x0,x1) => x0[x1],
      _1695: (x0,x1,x2) => x0[x1] = x2,
      _1698: (x0,x1,x2) => new DataView(x0,x1,x2),
      _1700: x0 => new Int8Array(x0),
      _1701: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _1702: x0 => new Uint8Array(x0),
      _1710: x0 => new Int32Array(x0),
      _1714: x0 => new Float32Array(x0),
      _1716: x0 => new Float64Array(x0),
      _1748: (decoder, codeUnits) => decoder.decode(codeUnits),
      _1749: () => new TextDecoder("utf-8", {fatal: true}),
      _1750: () => new TextDecoder("utf-8", {fatal: false}),
      _1751: (s) => parseFloat(s),
      _1752: x0 => new WeakRef(x0),
      _1753: x0 => x0.deref(),
      _1759: Date.now,
      _1761: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _1762: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _1763: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _1764: () => typeof dartUseDateNowForTicks !== "undefined",
      _1765: () => 1000 * performance.now(),
      _1766: () => Date.now(),
      _1769: () => new WeakMap(),
      _1770: (map, o) => map.get(o),
      _1771: (map, o, v) => map.set(o, v),
      _1772: () => globalThis.WeakRef,
      _1783: s => JSON.stringify(s),
      _1785: s => printToConsole(s),
      _1786: a => a.join(''),
      _1787: (o, a, b) => o.replace(a, b),
      _1789: (s, t) => s.split(t),
      _1790: s => s.toLowerCase(),
      _1791: s => s.toUpperCase(),
      _1792: s => s.trim(),
      _1793: s => s.trimLeft(),
      _1794: s => s.trimRight(),
      _1796: (s, p, i) => s.indexOf(p, i),
      _1797: (s, p, i) => s.lastIndexOf(p, i),
      _1798: (s) => s.replace(/\$/g, "$$$$"),
      _1799: Object.is,
      _1800: s => s.toUpperCase(),
      _1801: s => s.toLowerCase(),
      _1802: (a, i) => a.push(i),
      _1806: a => a.pop(),
      _1807: (a, i) => a.splice(i, 1),
      _1809: (a, s) => a.join(s),
      _1810: (a, s, e) => a.slice(s, e),
      _1813: a => a.length,
      _1815: (a, i) => a[i],
      _1816: (a, i, v) => a[i] = v,
      _1818: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _1819: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _1820: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _1821: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _1822: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _1823: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _1824: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _1825: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _1827: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _1828: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _1829: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _1830: (t, s) => t.set(s),
      _1832: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _1833: o => o.byteLength,
      _1834: o => o.buffer,
      _1835: o => o.byteOffset,
      _1836: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _1837: (b, o) => new DataView(b, o),
      _1838: (b, o, l) => new DataView(b, o, l),
      _1839: Function.prototype.call.bind(DataView.prototype.getUint8),
      _1840: Function.prototype.call.bind(DataView.prototype.setUint8),
      _1841: Function.prototype.call.bind(DataView.prototype.getInt8),
      _1842: Function.prototype.call.bind(DataView.prototype.setInt8),
      _1843: Function.prototype.call.bind(DataView.prototype.getUint16),
      _1844: Function.prototype.call.bind(DataView.prototype.setUint16),
      _1845: Function.prototype.call.bind(DataView.prototype.getInt16),
      _1846: Function.prototype.call.bind(DataView.prototype.setInt16),
      _1847: Function.prototype.call.bind(DataView.prototype.getUint32),
      _1848: Function.prototype.call.bind(DataView.prototype.setUint32),
      _1849: Function.prototype.call.bind(DataView.prototype.getInt32),
      _1850: Function.prototype.call.bind(DataView.prototype.setInt32),
      _1853: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _1854: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _1855: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _1856: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _1857: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _1858: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _1859: x0 => x0.abort(),
      _1860: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
      _1861: (x0,x1) => x0.overrideMimeType(x1),
      _1862: () => new XMLHttpRequest(),
      _1863: (x0,x1,x2) => x0.open(x1,x2),
      _1876: (o, t) => o instanceof t,
      _1878: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1878(f,arguments.length,x0) }),
      _1879: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1879(f,arguments.length,x0) }),
      _1880: o => Object.keys(o),
      _1881: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _1882: (handle) => clearTimeout(handle),
      _1883: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      _1884: (handle) => clearInterval(handle),
      _1885: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _1886: () => Date.now(),
      _1904: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1904(f,arguments.length,x0) }),
      _1906: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1907: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _1930: x0 => x0.getAllResponseHeaders(),
      _1931: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _1932: (x0,x1) => x0.exec(x1),
      _1933: (x0,x1) => x0.test(x1),
      _1934: (x0,x1) => x0.exec(x1),
      _1935: (x0,x1) => x0.exec(x1),
      _1936: x0 => x0.pop(),
      _1938: o => o === undefined,
      _1957: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _1959: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _1960: o => o instanceof RegExp,
      _1961: (l, r) => l === r,
      _1962: o => o,
      _1963: o => o,
      _1964: o => o,
      _1965: b => !!b,
      _1966: o => o.length,
      _1969: (o, i) => o[i],
      _1970: f => f.dartFunction,
      _1971: l => arrayFromDartList(Int8Array, l),
      _1972: l => arrayFromDartList(Uint8Array, l),
      _1973: l => arrayFromDartList(Uint8ClampedArray, l),
      _1974: l => arrayFromDartList(Int16Array, l),
      _1975: l => arrayFromDartList(Uint16Array, l),
      _1976: l => arrayFromDartList(Int32Array, l),
      _1977: l => arrayFromDartList(Uint32Array, l),
      _1978: l => arrayFromDartList(Float32Array, l),
      _1979: l => arrayFromDartList(Float64Array, l),
      _1980: x0 => new ArrayBuffer(x0),
      _1981: (data, length) => {
        const getValue = dartInstance.exports.$byteDataGetUint8;
        const view = new DataView(new ArrayBuffer(length));
        for (let i = 0; i < length; i++) {
          view.setUint8(i, getValue(data, i));
        }
        return view;
      },
      _1982: l => arrayFromDartList(Array, l),
      _1983: () => ({}),
      _1984: () => [],
      _1985: l => new Array(l),
      _1986: () => globalThis,
      _1987: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _1988: (o, p) => p in o,
      _1989: (o, p) => o[p],
      _1990: (o, p, v) => o[p] = v,
      _1991: (o, m, a) => o[m].apply(o, a),
      _1993: o => String(o),
      _1994: (p, s, f) => p.then(s, f),
      _1995: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        return 17;
      },
      _1996: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1997: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2000: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2001: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2002: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2003: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2004: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _2005: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _2006: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _2009: x0 => x0.index,
      _2014: x0 => x0.flags,
      _2015: x0 => x0.multiline,
      _2016: x0 => x0.ignoreCase,
      _2017: x0 => x0.unicode,
      _2018: x0 => x0.dotAll,
      _2019: (x0,x1) => x0.lastIndex = x1,
      _2021: (o, p) => o[p],
      _2024: x0 => x0.random(),
      _2025: x0 => x0.random(),
      _2029: () => globalThis.Math,
      _2031: Function.prototype.call.bind(Number.prototype.toString),
      _2032: (d, digits) => d.toFixed(digits),
      _2144: x0 => x0.readyState,
      _2151: x0 => x0.status,
      _2154: (x0,x1) => x0.responseType = x1,
      _2156: x0 => x0.responseText,

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      
    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
    };


    const loadModuleFromBytes = async (bytes) => {
        const module = await WebAssembly.compile(bytes, this.builtins);
        return await WebAssembly.instantiate(module, {
          ...baseImports,
          ...additionalImports,
          "wasm:js-string": jsStringPolyfill,
          "module0": dartInstance.exports,
        });
    }

    const loadModule = async (loader, loaderArgument) => {
        const source = await Promise.resolve(loader(loaderArgument));
        const module = await ((source instanceof Response)
            ? WebAssembly.compileStreaming(source, this.builtins)
            : WebAssembly.compile(source, this.builtins));
        return await WebAssembly.instantiate(module, {
          ...baseImports,
          ...additionalImports,
          "wasm:js-string": jsStringPolyfill,
          "module0": dartInstance.exports,
        });
    }

    const deferredLibraryHelper = {
      "loadModule": async (moduleName) => {
        if (!loadDeferredWasm) {
          throw "No implementation of loadDeferredWasm provided.";
        }
        return await loadModule(loadDeferredWasm, moduleName);
      },
      "loadDynamicModuleFromUri": async (uri) => {
        if (!loadDynamicModule) {
          throw "No implementation of loadDynamicModule provided.";
        }
        const loadedModule = await loadModule(loadDynamicModule, uri);
        return loadedModule.exports.$invokeEntryPoint;
      },
      "loadDynamicModuleFromBytes": async (bytes) => {
        const loadedModule = await loadModuleFromBytes(loadDynamicModule, uri);
        return loadedModule.exports.$invokeEntryPoint;
      },
    };

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      "deferredLibraryHelper": deferredLibraryHelper,
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
