// get-one.js
/**
 *
 * @param jloads
 * @param object
 * @param i
 * @param mapFunction
 * @param success
 * @param error
 */
jlogs('exist?', 'getOne');
if (typeof getOne !== 'function') getOne = function (load, url, selector, mapFunction, success, error) {
    const f = 'jloadsTarget getOne';

    jlogs(f, ' load.getTarget() ', load.getTarget());

    // TODO: move to class E for smart load content on not existing DOM elements
    // if (selector === 'head' || !isEmpty(load.getTarget())) {
    jlogs(f, ' selector ', selector);
    jlogs(f, ' url 1', url, typeof url, isString(url), Object.keys(url).length);

    if (isArray(url) && Object.keys(url).length === 1 && isString(url[0])) {
        url = url[0];
    }

    jlogs(f, ' url 2 ', url, typeof url, isString(url));

    if (isString(url)) {
        // if (selector === 'head') {
        //     loadContentByUrls(load, url, mapFunction, success, error);
        //     success(load.getTarget(selector));
        // } else if (selector === 'body') {
        //     jlogs(f, ' wait for body selector ', selector);
        //     jlogs(f, ' wait for body target ', load.getTarget(selector));

        // var reload = document.querySelector(selector);
        // reload.addEventListener("load", function (event) {
        //
        //     console.log(f, 'event::', event);
        //
        //     ReadyHtml(url, selector, mapFunction, success, error);
        // });
        // } else {
        jlogs(f, ' wait for element selector ', selector);
        jlogs(f, ' wait for element url ', url);
        // console.log(f, ' wait for element target ', load.getTarget(selector));

        // waitForSelector(url, selector, mapFunction, success, error)
        // waitForSelector(url, selector, mapFunction, success, error);

        var l = new Load(selector, success, error);
        // var elem = document.querySelectorAll(selector)[0] || document.querySelectorAll(selector);
        // if (elem) {
        // callback executed when canvas was found

        // loadContentByUrls(jloads, object, mapFunction, success, error);
        const funcName = getFunctionName(url, mapFunction, f);
        jlogs(f, ' funcName ', funcName);
        //jlogs(funcName, url, elem);
        l[funcName](url);
        // }


    } else {
        var list = url;
        jlogs(f, ' url4 ', url);
        jlogs(f, ' list ', list);
        jlogs(f, ' list isArray', isArray(list));
        jlogs(f, ' list isObject', isObject(list));


        //
        if (isArray(list)) {
            for (var i in list) {
                var url = list[i];

                jlogs(f, 'isArray url4 ', url);
                jlogs(f, 'isArray list ', list);
                getOne(load, url, selector, mapFunction, success, error);

                // waitForSelector(url, selector, mapFunction, success, error);
                //

            }//for
        } else if (isObject(list)) {
            url = Object.keys(list)[0];
            jlogs(f, 'isObject url4 ', url);
            jlogs(f, 'isObject list ', list);

            waitForSelector(url, selector, mapFunction, function () {
                for (var i in list) {
                    var object = list[i];
                    jlogs(f, 'isObject url5 i ', i);
                    jlogs(f, 'isObject url5 object ', object);
                    for (var ii in object) {
                        jlogs(f, 'isObject url5 object[ii], ii ', object[ii], ii);
                        getOne(load, object[ii], selector, mapFunction, success, error);
                    }
                }//for
            }, error);

        }
    }
    // error(elem);
}


