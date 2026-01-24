self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('appku-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/manifest.json',
        '/icon.png'
      ]);
    })
  );
});
