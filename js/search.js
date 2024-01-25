/*global Ultraviolet, UVServiceWorker, __uv$config, search*/
"use strict";

// ... (search function)

/**
 * @type {import('../uv').UltravioletCtor}
 */
const Ultraviolet = self.Ultraviolet;

self.__uv$config = {
    prefix: '/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv.handler.js',
    client: '/uv.client.js',
    bundle: '/uv.bundle.js',
    config: '/uv.config.js',
    sw: '/uv.sw.js',
};

/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in uv.config.js so it will not need to be modified.
 * However, if a user changes the location of uv.bundle.js/uv.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
importScripts(__uv$config.bundle || 'uv.bundle.js');
importScripts(__uv$config.config || 'uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const sw = new UVServiceWorker(__uv$config);

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));

/*globals __uv$config, UVServiceWorker*/
// Users must import the config (and bundle) prior to importing uv.sw.js
// This is to allow us to produce a generic bundle with no hard-coded paths.

/**
 * @type {import('../uv').UltravioletCtor}
 */
const Ultraviolet = self.Ultraviolet;

const cspHeaders = [
    'cross-origin-embedder-policy',
    'cross-origin-opener-policy',
    'cross-origin-resource-policy',
    'content-security-policy',
    'content-security-policy-report-only',
    'expect-ct',
    'feature-policy',
    'origin-isolation',
    'strict-transport-security',
    'upgrade-insecure-requests',
    'x-content-type-options',
    'x-download-options',
    'x-frame-options',
    'x-permitted-cross-domain-policies',
    'x-powered-by',
    'x-xss-protection',
];
const emptyMethods = ['GET', 'HEAD'];

class UVServiceWorker extends Ultraviolet.EventEmitter {
    // ... (UVServiceWorker class)

    /**
     *
     * @param {Event & {request: Request}} param0
     * @returns
     */
    async fetch({ request }) {
        /**
         * @type {string|void}
         */
        let fetchedURL;

        try {
            // ... (UVServiceWorker fetch method)

            return new Response(responseCtx.body, {
                headers: responseCtx.headers,
                status: responseCtx.status,
                statusText: responseCtx.statusText,
            });
        } catch (err) {
            if (!['document', 'iframe'].includes(request.destination))
                return new Response(undefined, { status: 500 });

            console.error(err);

            return renderError(err, fetchedURL, this.address);
        }
    }

    // ... (Remaining UVServiceWorker class methods)

    static Ultraviolet = Ultraviolet;
}

self.UVServiceWorker = UVServiceWorker;

class ResponseContext {
    // ... (ResponseContext class)
}

class RequestContext {
    // ... (RequestContext class)
}

function isHtml(url, contentType = '') {
    // ... (isHtml function)
}

class HookEvent {
    // ... (HookEvent class)
}

/**
 *
 * @param {string} fetchedURL
 * @param {string} bareServer
 * @returns
 */
function hostnameErrorTemplate(fetchedURL, bareServer) {
    // ... (hostnameErrorTemplate function)
}

/**
 *
 * @param {string} title
 * @param {string} code
 * @param {string} id
 * @param {string} message
 * @param {string} trace
 * @param {string} fetchedURL
 * @param {string} bareServer
 * @returns
 */
function errorTemplate(
    title,
    code,
    id,
    message,
    trace,
    fetchedURL,
    bareServer
) {
    // ... (errorTemplate function)
}

/**
 * @typedef {import("@tomphttp/bare-client").BareError} BareError
 */

/**
 *
 * @param {unknown} err
 * @returns {err is BareError}
 */
function isBareError(err) {
    // ... (isBareError function)
}

/**
 *
 * @param {unknown} err
 * @param {string} fetchedURL
 * @param {string} bareServer
 */
function renderError(err, fetchedURL, bareServer) {
    // ... (renderError function)
}
