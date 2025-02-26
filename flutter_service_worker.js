'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "e0d369fc8b1b4ddcb02d1d5aa06f040e",
"version.json": "402f0c5dfbd8b62cb44df6ab04a9a32c",
"index.html": "b3ff3a185f969924f0b4576a2f0cd229",
"/": "b3ff3a185f969924f0b4576a2f0cd229",
"main.dart.js": "83749f8fbe46cba8846ade0bc1c7fe0f",
"flutter.js": "1e28bc80be052b70b1e92d55bea86b2a",
"main.dart.wasm.map": "2f003ed688dd2c1d2f74dcacd84bad02",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"demo_app.js": "4abc134b13bee43b33a17b227ab0fc08",
"main.dart.mjs": "2bf4c68cb59c80b2efe3e020034f9b19",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "49a9d07f9d170abda6efca4dc946121b",
"main.dart.wasm": "af530ee81397f22278098da3c01a712d",
".git/config": "b4b7a32ba5493d52f5af7c7ad36feb27",
".git/objects/61/4ea97221bd1e4b79024049c5108fd5c72b6b29": "55b733729ccf95c0eeda7055b7d3a265",
".git/objects/95/a61795437de6fafa9a0dcb8e2ab54bd22d1831": "821df5e0ba448934f92fcd66f9da5c3a",
".git/objects/95/ab973f323f47b720993719a8aec15b0883cfd5": "fc1b576764ffb53b791f7e3c8b3dc6f7",
".git/objects/3e/d0ddd7136a48520910e7e4bf665362facd60d4": "c8322669a78b5f07c75b1decdc05718d",
".git/objects/03/eaddffb9c0e55fb7b5f9b378d9134d8d75dd37": "87850ce0a3dd72f458581004b58ac0d6",
".git/objects/9b/79f4650360bc77efb4800006e71af5108fd4b6": "6e10b328bba8dca36f668ba64e1f597e",
".git/objects/69/dd618354fa4dade8a26e0fd18f5e87dd079236": "8cc17911af57a5f6dc0b9ee255bb1a93",
".git/objects/94/ed4a7037b38f5ed6cd47722005811d7aa4369e": "778a6a6946f9e5b7d486062859cbc842",
".git/objects/60/b04d3131edd26c5653375f47eb0dd26863a8f8": "b1c6b0e8aad4f1b5236daac82f1ae244",
".git/objects/60/945552bd06b85d105d518f010895ae6484df84": "da8e38cae534d3b7f2d9fe23f3f14c8e",
".git/objects/34/27be90c6eeb9df43357df25fd399639f75a51e": "6e5d1e65bade61e78dd9c3e479671eb1",
".git/objects/9c/4f6af65040a0149ba6a8c44dcd4b4a36ee549a": "f2311f8c7613e35fddb887b9368c1c38",
".git/objects/d7/7cfefdbe249b8bf90ce8244ed8fc1732fe8f73": "9c0876641083076714600718b0dab097",
".git/objects/b4/670417ab0735ed4ed857a6527b2c5df5da1959": "e094d4d8e2ed485f711021e8f964db19",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/c7/6cd2cc242189282222f0ed2863b077d66fdd18": "85399b7b2f87635ebfe97fa66eb3281a",
".git/objects/ee/7ef256d5553c9c9a1774798d93e55b27dbe41f": "55073bd40b1ee36b7a5f0a545fe14326",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f5/72b90ef57ee79b82dd846c6871359a7cb10404": "e68f5265f0bb82d792ff536dcb99d803",
".git/objects/c8/466c6242a3a737a1f0e62bb6c929f2de171ffc": "6c67e18230a57024e58898ee6391e838",
".git/objects/20/7f4bfce27ae1dd77283f874c28aece65285d02": "82c560f867f4f3ef97dea6ad5492b5bf",
".git/objects/27/a7fc889fe0fb2f2fbc3cd0c46afbf50dd7bf3c": "f1ebb43ca88a10f6079a89f70113cd5a",
".git/objects/73/90be151595ab11bfee79affa7be8a6a99ef236": "56520bd9df20d96ff38ed5068e6633b1",
".git/objects/8f/e7af5a3e840b75b70e59c3ffda1b58e84a5a1c": "e3695ae5742d7e56a9c696f82745288d",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/43/06fe03d255dccb99facb580d2d53bcdc651d94": "9a058f8f1e3471afbd97d81c01ffc203",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/6b/9862a1351012dc0f337c9ee5067ed3dbfbb439": "85896cd5fba127825eb58df13dfac82b",
".git/objects/3a/9b497d4434e7635de53d8dc9c0c1b0618c0788": "d3e28673cba352be60450ea5be91de09",
".git/objects/54/8d1f5db71a877e28abd67b880d048d77bf90f2": "16df6c972ef5f227ba1eb3832094dedc",
".git/objects/37/b3409e06738d5dd4fa2c0b0d644ef40aec5ca8": "4420c61f3ddcb5671bcc427b103d7744",
".git/objects/37/05073e150d8cd79bf4e7b57c04564a62724366": "a67ee893cb3a390c7286f23baca546bb",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/dd/e2f324c743ce9c55f0fb42f5719c9ce72c8401": "7d3d5991a8f84784e84faaecba6a405e",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/cd/3e2c87ae2ec1db0cb0a34c373428561caf809e": "274b81ca0eba73d66744739346787e2e",
".git/objects/cc/625e6675eca6f6fbcd0d436c2bec301377c8c9": "f08eaab9329068b0b262562bca5e1257",
".git/objects/fa/79cf8f9107e5aad5bf985ac74890dcb27da207": "75bab0eae53bbd68fe1f48f5b617eeb5",
".git/objects/e9/94225c71c957162e2dcc06abe8295e482f93a2": "2eed33506ed70a5848a0b06f5b754f2c",
".git/objects/cb/6b7a6137f8e01d986294349a6bc2fadc6d1849": "9df7d09456db8013ef6b3c4b23309f7a",
".git/objects/f8/6659805bff3c3bbc720e114dd1b379871e6ccb": "1d975dbf241089504fea3419f77f1c31",
".git/objects/46/4ab5882a2234c39b1a4dbad5feba0954478155": "2e52a767dc04391de7b4d0beb32e7fc4",
".git/objects/48/07d0c85e148b3d0a7a105b6f14e63f83511b0d": "19d04fefa673887e84a155356d9990b0",
".git/objects/7f/136af3d42c738911a4bb5744ea444fa620907a": "bc65190af6c1657f89ca374966c8e675",
".git/objects/25/b6f2e89ee8d1897cc8b3b38218f668d1229c73": "d6d49b0f5c96a1437e00f2e585d86cd9",
".git/HEAD": "4cf2d64e44205fe628ddd534e1151b58",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "e7af1b3b2daed1d991739b6f026ad465",
".git/logs/refs/heads/master": "e7af1b3b2daed1d991739b6f026ad465",
".git/logs/refs/remotes/origin/master": "faf7b3348f47a2308cf3364ba48dc95c",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/master": "d7cade103690daa91313818db18db42c",
".git/refs/remotes/origin/master": "d7cade103690daa91313818db18db42c",
".git/index": "bda0d8003c45cbab9fdcb1c7e2b41374",
".git/COMMIT_EDITMSG": "889e0d7343405c079195e7b8903c8c9e",
".git/FETCH_HEAD": "b578c066a27ac341c9a6364f1b52f991",
"assets/AssetManifest.json": "2efbb41d7877d10aac9d091f58ccd7b9",
"assets/NOTICES": "ec114d8a1d3629c8af2e6a5577bd0a9f",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "69a99f98c8b1fb8111c5fb961769fcd8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "693635b5258fe5f1cda720cf224f158c",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"canvaskit/skwasm_st.js": "7df9d8484fef4ca8fff6eb4f419a89f8",
"canvaskit/skwasm.js": "9c817487f9f24229450747c66b9374a6",
"canvaskit/skwasm.js.symbols": "7157d996c331b2a9e316b6ec288305ad",
"canvaskit/canvaskit.js.symbols": "8d7b042615c3df3b6084a43f4cbab201",
"canvaskit/skwasm.wasm": "a789594257ac1bdad1f89ec1bb3a823d",
"canvaskit/chromium/canvaskit.js.symbols": "fb34b276adaa25a69526127d3eb90c16",
"canvaskit/chromium/canvaskit.js": "9dc7a140b1f0755e6321e9c61b9bd4d9",
"canvaskit/chromium/canvaskit.wasm": "c03ca38cf9e6d7c428fb4002bc85f4e7",
"canvaskit/skwasm_st.js.symbols": "21bd5519d3b07c5c54daf3ce328fbf37",
"canvaskit/canvaskit.js": "8cf6e87eff144e2453a9640bfa1a4ad0",
"canvaskit/canvaskit.wasm": "f2bff9540242b13879d64cad2240f3d7",
"canvaskit/skwasm_st.wasm": "48287a212ba5f76ff8d45a852ee51441"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
