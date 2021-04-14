// global variables constraints
const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// files to cache

const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];

  self.addEventListener('install', function (e) {
      // call back funciton waitUntil
      /*
        We use e.waitUntil to tell the browser to wait
        until the work is complete before terminating 
        the service worker. This ensures that the service 
        worker doesn't move on from the installing phase
        until it's finished executing all of its code.
        We use caches.open to find the specific cache by name, 
        then add every file in the FILES_TO_CACHE array to the cache.
      */
    e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
      })
    )
  })