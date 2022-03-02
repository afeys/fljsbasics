/*
 ================================================================================
 FLFunctions
 ================================================================================
 */
class FLFunctions {
    
    /**
     * returns the url base for the current page. 
     * example: if you are currently on paget http://microsoft.com/view/blabla.php
     * it will return http://microsoft.com
     * @returns {String}
     */
    static getUrlBase() {
        return location.protocol.split(':')[0] + '://' + location.host + '/';
    }
    
    /**
     * generate a unique identifier
     * @param  {String} prefix A prefix that is put in front of the uniq identifier
     * @return {String}        A unique identifier
     */
    static uniqId(prefix = "") {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }
        return prefix + chr4() + chr4() +
                '-' + chr4() +
                '-' + chr4() +
                '-' + chr4() +
                '-' + chr4() + chr4() + chr4();
    }

    /**
     * checks if a string is empty, null, undefined,...
     * @param  {String} str  The string to check
     * @return {Boolean}     Returns true or false
     */
    static isEmpty(str)
    {
        if (typeof str === 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "")
        {
            return true;
        }
        return false;
    }

    /**
     * checks if a variable is an array
     * @param  {variable} obj  The variable to check
     * @return {Boolean}     Returns true or false
     */
    static isArray(obj) {
        return Array.isArray(obj);
    }

    /**
     * checks if a string contains a value (opposite of isEmpty(str)
     * @param  {String} str  The string to check
     * @return {Boolean}     Returns true or false
     */
    static isNotEmpty(str)
    {
        if (FLFunctions.isEmpty(str)) {
            return false;
        }
        return true;
    }

    /**
     * checks if an element is a html tag 
     * @param  {Element} el  The element to check
     * @return {Boolean}     Returns true or false
     */
    static isHTMLTag(el)
    {
        return (el.tagName ? "true" : "false");
    }

    /**
     * checks if an element is a DOM element 
     * @param  {Element} el  The element to check
     * @return {Boolean}     Returns true or false
     */
    static isDOMElement(el)
    {
        return (el.nodeName ? "true" : "false");
    }

    /**
     * checks if an item is an element 
     * @param  {Element} el  The element to check
     * @return {Boolean}     Returns true or false
     */
    static isElement(el) {
        if (el instanceof Element) {
            return true;
        }
        return false;
    }

    static hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    static addClass(el, className) {
        if (el.classList)
            el.classList.add(className);
        else if (!hasClass(el, className))
            el.className += " " + className;
    }

    static removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }
    static removeAllChildrenFromElement(idorelement) {
        if (this.isElement(idorelement)) {
            var container = idorelement;
        } else {
            var container = document.getElementById(idorelement);
        }
        if (FLFunctions.isElement(container)) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
    static clearValueFromElement(idorelement) {
        if (this.isElement(idorelement)) {
            var element = idorelement;
        } else {
            var element = document.getElementById(idorelement);
        }
        if (FLFunctions.isElement(element)) {
            if (element.tagName === 'SELECT') {
                var elements = element.options;
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].selected)
                        elements[i].selected = false;
                }
            }
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'color')) {
                element.value = "";
            }
        }
    }
// // Function fl_findparentel is used to find the closest parent of an element
// with a specific classname

    static findParentWithClass(el, clas) {
        while ((el = el.parentNode) && el.className.indexOf(clas) < 0)
            ;
        return el;
    }
    static findParentWithTagname(el, tagname) {
        while ((el = el.parentNode) && el.tagName.toLowerCase() !== tagname.toLowerCase())
            ;
        return el;
    }

    static getNearestChild(el, selector) {
        if (FLFunctions.isElement(el)) {
            return el.querySelector(selector);
        }
        return null;
    }

    static tableDeleteRowCells(row) {
        for (let i = 0, len = row.cells.length; i < len; i++) {
            row.deleteCell(0); // delete the first cell each time (because it shifts)
        }
    }

    static sessionSetVar(varname, value) {
        sessionStorage.setItem(varname, JSON.stringify(value));
    }

    static sessionGetVar(varname) {
        return JSON.parse(sessionStorage.getItem(varname));
    }
    static getHeightOf(id) {
        let element = document.getElementById(id);
        if (FLFunctions.isElement(element)) {
            let style = getComputedStyle(element);
            return element.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
        }
        return 0;
    }
    static setMarginTop(id, height) {
        let element = document.getElementById(id);
        if (FLFunctions.isElement(element)) {
            element.style.marginTop=height + 'px';
        }
    }
    static setPaddingTop(id, height) {
        let element = document.getElementById(id);
        if (FLFunctions.isElement(element)) {
            element.style.paddingTop=height + 'px';
        }
    }
    static showElementById(id, displaystyle = "initial") {
        let element = document.getElementById(id);
        if (FLFunctions.isElement(element)) {
            element.style.display = displaystyle; 
            element.style.visibility = "visible";
        }
    }
    static hideElementById(id) {
        let element = document.getElementById(id);
        if (FLFunctions.isElement(element)) {
            element.style.display = "none"; 
            element.style.visibility = "hidden";
        }
    }  
    
    // addChildElementTo
    // params:
    //   id: id of element where the element to add has to be added
    //   childel: element to add, this can be a regular element, or a FLElement
    static addChildElementTo(id, childel) {
        let parentel = document.getElementById(id);
        if (this.isElement(parentel)) {
            if (childel instanceof FLElement || childel instanceof FLContainer) {
                parentel.appendChild(childel.getAsElement());
            } else {
                parentel.appendChild(childel);
            }
        }
    }
    
    static async loadFromURL(url) {
        try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async saveToURL(url, data) {
        // it's impossible to use the json option if you want to upload files. 
        // found some info on https://stackoverflow.com/questions/35192841/how-do-i-post-with-multipart-form-data-using-fetch
        let useJson = true;
        console.log("inside saveToURL");
        let urltouse = new URL(url);
        let search_params = urltouse.searchParams;
        
        
        if ("_hasattachments" in data ) {
            if (data._hasattachments === true) {
                console.log("has attachments !!!");
                useJson = false;
            }
        }
        if (useJson === true) {
            console.log("using json savetourl");
            search_params.set('_flformat', "json");
            urltouse.search = search_params.toString();
            let res = await fetch(urltouse, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return await res.json();
        } else {
            console.log("NOT using json savetourl");
            const formData = new FormData();
            for (const name in data) {
                formData.append(name, data[name]);
            }
            search_params.set('_flformat', "formdata");
            urltouse.search = search_params.toString();
            let res = await fetch(urltouse, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: formData 
            });
            return await res.json();
        }
        return null;
    }

// this can be used to do something as soon as the page is loaded fully:
// FLFunctions.pageLoaded(function() {
//    alert("page loaded");
// });
    static pageLoaded(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }  
}