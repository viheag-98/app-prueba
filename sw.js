const CACHE_ELEMENTS = [
    "./", //pagina de inicio de toda la aplicacion
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js",
]

const CACHE_NAME = "V1_cache_contador_react"

//constante  self=this
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => { //retornara una promesa 
            cache.addAll(CACHE_ELEMENTS).then(() => { //agregar a este cache los elementos/rutas que fueron seleccionados
                self.skipWaiting()
            }).catch(console.log);
        })
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    return (
                        cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName) //significa que el cache no existe
                    );
                }))
        }).then(() => self.clients.claim())
    );
});
 
self.addEventListener("fetch", (e) => {
    e.respondWith( 
        caches.match(e.request).then((res)=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});