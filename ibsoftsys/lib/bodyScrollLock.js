/* -------- body-scroll-lock Library ------------
Source: https://github.com/willmcpo/body-scroll-lock
*/

/*
MIT License

Copyright (c) 2018 Will Po

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* HOW TO USE IT:
// 1. Import the functions
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

// 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
// Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
// This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.
const targetElement = document.querySelector('#someElementId');

// 3. ...in some event handler after showing the target element...disable body scroll
disableBodyScroll(targetElement);

// 4. ...in some event handler after hiding the target element...
enableBodyScroll(targetElement);
*/

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.bodyScrollLock = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  // Older browsers don't support event options, feature detect it.

  // Adopted and modified solution from Bohdan Didukh (2017)
  // https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

  var hasPassiveEvents = false;
  if (typeof window !== 'undefined') {
    var passiveTestOptions = {
      get passive() {
        hasPassiveEvents = true;
        return undefined;
      }
    };
    window.addEventListener('testPassive', null, passiveTestOptions);
    window.removeEventListener('testPassive', null, passiveTestOptions);
  }

  var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


  var locks = [];
  var documentListenerAdded = false;
  var initialClientY = -1;
  var previousBodyOverflowSetting = void 0;
  var previousBodyPosition = void 0;
  var previousBodyPaddingRight = void 0;


  var previousScrollYPosition = 0; // JE 06Sep21-1655

  // returns true if `el` should be allowed to receive touchmove events.
  var allowTouchMove = function allowTouchMove(el) {
    return locks.some(function (lock) {
      if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
        return true;
      }

      return false;
    });
  };

  var preventDefault = function preventDefault(rawEvent) {
    var e = rawEvent || window.event;

    // For the case whereby consumers adds a touchmove event listener to document.
    // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
    // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
    // the touchmove event on document will break.
    if (allowTouchMove(e.target)) {
      return true;
    }

    // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
    if (e.touches.length > 1) return true;

    if (e.preventDefault) e.preventDefault();

    return false;
  };

  var setOverflowHidden = function setOverflowHidden(options) {

    // console.log("in setOverflowHidden: previousBodyPaddingRight = " + previousBodyPaddingRight); // JE 05Sep21-1637

    // If previousBodyPaddingRight is already set, don't set it again.
    if (previousBodyPaddingRight === undefined) {
      var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
      var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

      // console.log("in setOverflowHidden: scrollBarGap = " + scrollBarGap); // JE 05Sep21-1637

      if (_reserveScrollBarGap && scrollBarGap > 0) {
        var computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
        previousBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = computedBodyPaddingRight + scrollBarGap + 'px';
      }
    }

    // console.log("in setOverflowHidden: previousBodyOverflowSetting = " + previousBodyOverflowSetting); // JE 04Sep21
    // console.log("in setOverflowHidden (before): document.body.style.overflow = " + document.body.style.overflow); // JE 05Sep21

    // If previousBodyOverflowSetting is already set, don't set it again.
    if (previousBodyOverflowSetting === undefined) {
        // CHANGED this part of code (see comment in js/javascript.js)
      // console.log("in setOverflowHidden: DO NOT set document.body.style.overflow = 'hidden'"); // JE 05Sep21-1712

      previousBodyOverflowSetting = document.body.style.overflow;

      previousScrollYPosition = scrollY; // JE 06Sep21-1655
      // console.log("in setOverflowHidden: previousScrollYPosition = " + previousScrollYPosition);

      document.body.style.position = 'fixed'; // JE 06Sep21-1655 ALTERNATIVE

      // document.body.style.overflow = 'hidden';  // ORIGINAL body-scroll-lock code

      document.body.style.top = `-${previousScrollYPosition}px`; // JE 06Sep21-1655   ALTERNATIVE

      // console.log("in setOverflowHidden: document.body.style.top = " + document.body.style.top); // JE 06Sep21-1655
    }

    // console.log("in setOverflowHidden (after): document.body.style.overflow = " + document.body.style.overflow); // JE 05Sep21
  };

  var restoreOverflowSetting = function restoreOverflowSetting() {

    if (previousBodyPaddingRight !== undefined) {
      document.body.style.paddingRight = previousBodyPaddingRight;

      // console.log("in restoreOverflowSetting: previousBodyPaddingRight = " + previousBodyPaddingRight); // JE 31Aug2012

      // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
      // can be set again.
      previousBodyPaddingRight = undefined;
    } else {
      // console.log("in restoreOverflowSetting: previousBodyPaddingRight is undefined"); // JE 31Aug2012
    }

    if (previousBodyOverflowSetting !== undefined) {
      document.body.style.overflow = previousBodyOverflowSetting;

      // console.log("in restoreOverflowSetting: previousBodyOverflowSetting = " + previousBodyOverflowSetting); // JE 31Aug2012

      // Restore previousBodyOverflowSetting to undefined
      // so setOverflowHidden knows it can be set again.
      previousBodyOverflowSetting = undefined;
    } else {
      // console.log("in restoreOverflowSetting: previousBodyOverflowSetting is undefined"); // JE 31Aug2012
    }
  };

  var setPositionFixed = function setPositionFixed() {
    // console.log("in setPositionFixed"); // JE 06Sep21-1244
    return window.requestAnimationFrame(function () {
      // If previousBodyPosition is already set, don't set it again.
      if (previousBodyPosition === undefined) {
        // console.log("in setPositionedFixed: previousBodyPosition = undefined"); // JE 31Aug2021
        previousBodyPosition = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left
        };

        // Update the dom inside an animation frame
        var _window = window,
            scrollY = _window.scrollY,
            scrollX = _window.scrollX,
            innerHeight = _window.innerHeight;

        document.body.style.position = 'fixed';
        document.body.style.top = -scrollY + 'px';
        document.body.style.left = -scrollX + 'px';

        setTimeout(function () {
          return window.requestAnimationFrame(function () {
            // Attempt to check if the bottom bar appeared due to the position change
            var bottomBarHeight = innerHeight - window.innerHeight;
            if (bottomBarHeight && scrollY >= innerHeight) {
              // Move the content further up so that the bottom bar doesn't hide it
              document.body.style.top = -(scrollY + bottomBarHeight);
            }
          });
        }, 300);
    } else {
        // console.log("in setPositionFixed: previousBodyPosition = " + previousBodyPosition); // JE 31Aug2021
    }
    });
  };

  var restorePositionSetting = function restorePositionSetting() {
    // console.log("in restorePositionSetting"); // JE 06Sep21-1244

    if (previousBodyPosition !== undefined) {
      // Convert the position from "px" to Int
      var y = -parseInt(document.body.style.top, 10);
      var x = -parseInt(document.body.style.left, 10);

      // Restore styles
      document.body.style.position = previousBodyPosition.position;
      document.body.style.top = previousBodyPosition.top;
      document.body.style.left = previousBodyPosition.left;

      // console.log("in restorePositionSetting (before 'window.scrollTo(x,y)'): (x, y) = " + x + "," + y); // JE 31Aug2012

      // Restore scroll
      window.scrollTo(x, y);

      previousBodyPosition = undefined;
    } else {
      // console.log("in restorePositionSetting: previousBodyPosition is undefined"); // JE
    }
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
  var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
    return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
  };

  var handleScroll = function handleScroll(event, targetElement) {
    var clientY = event.targetTouches[0].clientY - initialClientY;

    // console.log("in handleScroll: clientY = " + clientY); // JE 05Sep21

    if (allowTouchMove(event.target)) {
      return false;
    }

    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
      // element is at the top of its scroll.
      return preventDefault(event);
    }

    if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
      // element is at the bottom of its scroll.
      return preventDefault(event);
    }

    event.stopPropagation();
    return true;
  };

  var disableBodyScroll = exports.disableBodyScroll = function disableBodyScroll(targetElement, options) {
    // targetElement must be provided
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
      return;
    }

    // disableBodyScroll must not have been called on this targetElement before
    if (locks.some(function (lock) {
      return lock.targetElement === targetElement;
    })) {
      return;
    }

    var lock = {
      targetElement: targetElement,
      options: options || {}
    };

    locks = [].concat(_toConsumableArray(locks), [lock]);

    // console.log("in disableBodyScroll: isIosDevice = " + isIosDevice); // JE 04Sep21

    if (isIosDevice) {
      setPositionFixed();
    } else {
        // console.log("in disableBodyScroll: options = " + options); // JE 05Sep21-1314
      setOverflowHidden(options);
    }

    if (isIosDevice) {
      targetElement.ontouchstart = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          initialClientY = event.targetTouches[0].clientY;
        }
      };
      targetElement.ontouchmove = function (event) {
        if (event.targetTouches.length === 1) {
          // detect single touch.
          handleScroll(event, targetElement);
        }
      };

      if (!documentListenerAdded) {
        document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = true;
      }
    }
  };

  var clearAllBodyScrollLocks = exports.clearAllBodyScrollLocks = function clearAllBodyScrollLocks() {
    if (isIosDevice) {
      // Clear all locks ontouchstart/ontouchmove handlers, and the references.
      locks.forEach(function (lock) {
        lock.targetElement.ontouchstart = null;
        lock.targetElement.ontouchmove = null;
      });

      if (documentListenerAdded) {
        document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = false;
      }

      // Reset initial clientY.
      initialClientY = -1;
    }

    if (isIosDevice) {
      restorePositionSetting();
    } else {
      restoreOverflowSetting();
    }

    locks = [];
  };

  var enableBodyScroll = exports.enableBodyScroll = function enableBodyScroll(targetElement) {
    if (!targetElement) {
      // eslint-disable-next-line no-console
      console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
      return;
    }

    locks = locks.filter(function (lock) {
      return lock.targetElement !== targetElement;
    });

    if (isIosDevice) {
      targetElement.ontouchstart = null;
      targetElement.ontouchmove = null;

      if (documentListenerAdded && locks.length === 0) {
        document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
        documentListenerAdded = false;
      }
    }

    if (isIosDevice) {
      restorePositionSetting();
    } else {
      restoreOverflowSetting();
    }
  };
});
