/*global Ultraviolet, UVServiceWorker, __uv$config, search*/
"use strict";

/**
 * @type {import('../uv').UltravioletCtor}
 */
const Ultraviolet = self.Ultraviolet;

self.__uv$config = {
    prefix: '/service/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv.handler.js',
    client: '/uv.client.js',
    bundle: '/uv.bundle.js',
    config: '/uv.config.js',
    sw: '/uv.sw.js',
};

importScripts(__uv$config.bundle || 'uv.bundle.js');
importScripts(__uv$config.config || 'uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const sw = new UVServiceWorker(__uv$config);

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

/*global Ultraviolet, UVServiceWorker, __uv$config, search*/
"use strict";

// ... (search function)

/**
 * @type {import('../uv').UltravioletCtor}
 */
const Ultraviolet = self.Ultraviolet;

self.__uv$config = {
    prefix: '/service/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv.handler.js',
    client: '/uv.client.js',
    bundle: '/uv.bundle.js',
    config: '/uv.config.js',
    sw: '/uv.sw.js',
};

importScripts(__uv$config.bundle || 'uv.bundle.js');
importScripts(__uv$config.config || 'uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const sw = new UVServiceWorker(__uv$config);

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

/**
 * Your apps.js script
 */

function visit() {
    const inputUrl = document.getElementById('urlInput').value;
    const proxyUrl = '/service/' + encodeURIComponent(inputUrl);
    const proxyFrame = document.getElementById('proxyFrame');
    proxyFrame.src = proxyUrl;
}

fetch('/service/apps.json')
    .then(response => response.json())
    .then(data => {
        const apps = data;

        function displayApps() {
            const appsContainer = document.querySelector('.apps-section');

            apps.forEach(app => {
                const appLink = document.createElement('a');
                appLink.href = '#';
                appLink.textContent = app.name;
                appsContainer.appendChild(appLink);

                appLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    const proxyUrl = '/service/' + encodeURIComponent(app.url);
                    const proxyFrame = document.getElementById('proxyFrame');
                    proxyFrame.src = proxyUrl;
                });
            });
        }

        displayApps();
    })
    .catch(error => console.error('Error fetching apps data:', error));

/**
 * Your search.js script
 */

// ... (search function)
