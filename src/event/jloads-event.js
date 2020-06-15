// jloads-event.js
/**
 *
 * @param json
 * @param success
 * @param error
 * @param mapFunction
 * @returns {Load}
 */
jlogs('exist?', 'jloadsEvent');
if (typeof jloadsEvent !== 'function') jloadsEvent = function (json, success, error, mapFunction) {
    const f = 'jloadsEvent';

    //url is URL of external file, success is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    if (typeof success !== 'function' && (typeof success !== 'object' || success === null)) {
        // Configuration
        success = function (data) {
            console.log(f, ' loaded ', data);
        };
        error = function (data) {
            console.error(f, ' !loaded ', data);
        };
    }

    if (typeof mapFunction !== 'object' && typeof map === 'object') {
        // Configuration
        mapFunction = map;
    }
    jlogs(' jloadsEvent', ' json ', json, Object.keys(json).length, Object.keys(json)[0]);


    // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs('jloadsEvent jloadsEventUrl ', ' elem ', elem, !isEmpty(elem));
    jlogs('jloadsEvent jloadsEventUrl ', ' i ', i);
    var jloads = new Load(i, success, error);

    if (Object.keys(json).length === 1) {
        var i = Object.keys(json)[0];
        jloadsEventUrl(jloads, json[i], i, mapFunction, success, error)
    } else {
        for (var i in json) {
            var object = json[i];
            jloadsEventUrl(jloads, object, i, mapFunction, success, error)
        }
    }
    // success(json);

    return jloads;
}


/**
 *
 * @param jloads
 * @param object
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'loadUrlData');
if (typeof loadUrlData !== 'function') loadUrlData = function (jloads, object, mapFunction, success, error) {

    const f = 'jloadsEvent loadUrlData';

    jlogs(f, ' isArray object, elem, mapFunction', object, isArray(object), mapFunction);

    if (isArray(object)) {
        var url = '';
        for (var id in object) {
            jlogs(f, ' isArray', ' id ', id);
            url = object[id];
            jlogs(f, ' isArray', ' url ', url);

            if (typeof url === 'string') {
                try {
                    // base64 in url
                    if (url.length > 200) {
                        jloads['img'](url);
                    } else {
                        const funcName = getFunctionName(url, mapFunction);
                        jlogs(f, ' funcName ', funcName);
                        //jlogs(funcName, url, elem);
                        jloads[funcName](url);
                    }
                    success(url);
                } catch (e) {
                    //jlogs(f, ' ERROR elem ', elem);
                    jlogs(f, ' ERROR e ', e);
                    error(e);
                }

                // jloads.js([url]);
                // elem.appendChild(url, funcName);
            }
        }
    } else {
        jlogs(f, ' isArray ERROR object', object);
        error(object);
    }
}


/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'jloadsEventUrl');
if (typeof jloadsEventUrl !== 'function') jloadsEventUrl = function (jloads, object, i, mapFunction, success, error) {
    const f = 'jloadsEvent jloadsEventUrl';

    jlogs(f, ' jloads.getTarget() ', jloads.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (i === 'head' || !isEmpty(jloads.getTarget())) {
    jlogs(f, ' object i ', object, i);
    if (i === 'head') {
        loadUrlData(jloads, object, mapFunction, success, error);
        success(jloads.getTarget());
    } else if (i === 'body') {
        jlogs(f, ' wait for body i ', i);
        jlogs(f, ' wait for body target ', jloads.getTarget());
        document.addEventListener("DOMContentLoaded", function () {
            ReadyHtml(object, i, mapFunction, success, error);
        });
    } else {
        jlogs(f, ' wait for element i ', i);
        jlogs(f, ' wait for element target ', jloads.getTarget());

        try {
            // set up the mutation observer
            var observer = new MutationObserver(function (mutations, me) {
                // `mutations` is an array of mutations that occurred
                // `me` is the MutationObserver instance
                // var canvas = document.getElementById('my-canvas');
                var canvas = document.querySelectorAll(i)[0] || document.querySelectorAll(i)
                if (canvas) {
                    // callback executed when canvas was found
                    ReadyHtml(object, i, mapFunction, success, error);
                    me.disconnect(); // stop observing
                    return;
                }
            });

            // start observing
            observer.observe(document, {
                childList: true,
                subtree: true
            });

        } catch (e) {
            //jlogs(f, ' ERROR elem ', elem);
            jlogs(f, ' jloadsEventUrl ERROR e ', e);
            error(e);
        }
    }
    // error(elem);
}


/**
 *
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 * @returns {*}
 * @constructor
 */
jlogs('exist?', 'ReadyHtml');
if (typeof ReadyHtml !== 'function') ReadyHtml = function (object, i, mapFunction, success, error) {
    const f = 'jloadsEvent ReadyHtml';

    jlogs(f, ' i ', i);
    var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i) || document.body;
    // jlogs(f, ' elem ', elem);

    var jloads = new Load(i, success, error);

    if (!isEmpty(elem)) {
        loadUrlData(jloads, object, mapFunction, success, error);
        success(elem);
    } else {
        waitFor(i, 40, function (i) {
            // var elem = document.querySelectorAll(i)[0] || document.querySelectorAll(i);
            var jloads = new Load(i, success, error);
            loadUrlData(jloads, object, mapFunction, success, error);
        });
        // error(elem);
    }
}