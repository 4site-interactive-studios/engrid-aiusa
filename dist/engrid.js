/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 861:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ tippy_esm)
});

// UNUSED EXPORTS: animateFill, createSingleton, delegate, followCursor, hideAll, inlinePositioning, roundArrow, sticky

;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js


function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}


;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js




function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js



function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js







function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/enums.js
var enums_top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [enums_top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var enums_placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/orderModifiers.js
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/createPopper.js














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/(/* unused pure expression or super */ null && (popperGenerator())); // eslint-disable-next-line import/no-unused-modules


;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const eventListeners = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js

function getBasePlacement(placement) {
  return placement.split('-')[0];
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split('-')[1];
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/computeOffsets.js




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case enums_top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_popperOffsets = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/math.js
var math_max = Math.max;
var math_min = Math.min;
var round = Math.round;
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js






 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = enums_top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === enums_top) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (false) { var transitionProperty; }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_computeStyles = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function applyStyles_effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_applyStyles = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: applyStyles_effect,
  requires: ['computeStyles']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/offset.js


function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, enums_top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = enums_placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_offset = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var getOppositeVariationPlacement_hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return getOppositeVariationPlacement_hash[matched];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js



function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/contains.js

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js















function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = math_max(rect.top, accRect.top);
    accRect.right = math_min(rect.right, accRect.right);
    accRect.bottom = math_min(rect.bottom, accRect.bottom);
    accRect.left = math_max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/detectOverflow.js








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [enums_top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? enums_placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (false) {}
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/flip.js






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [enums_top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_flip = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/utils/within.js

function within(min, value, max) {
  return math_max(min, math_min(value, max));
}
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? enums_top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? enums_top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? math_min(_min, tetherMin) : _min, _offset, tether ? math_max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_preventOverflow = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/arrow.js









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? enums_top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function arrow_effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (false) {}

  if (!contains(state.elements.popper, arrowElement)) {
    if (false) {}

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_arrow = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: arrow_effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/hide.js



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [enums_top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const modifiers_hide = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/popper.js










var defaultModifiers = [eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide];
var popper_createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules


;// CONCATENATED MODULE: ./node_modules/tippy.js/dist/tippy.esm.js
/**!
* tippy.js v6.3.1
* (c) 2017-2021 atomiks
* MIT License
*/


var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};

function tippy_esm_hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function tippy_esm_debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function tippy_esm_getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function tippy_esm_isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (tippy_esm_isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return (element == null ? void 0 : (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body) ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = tippy_esm_getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var ua = isBrowser ? navigator.userAgent : '';
var isIE = /MSIE |Trident\//.test(ua);

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message

var visitedMessages;

if (false) {}

function resetVisitedMessages() {
  visitedMessages = new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: function appendTo() {
    return document.body;
  },
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, {}, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if (false) {}

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      acc[name] = passedProps[name] !== undefined ? passedProps[name] : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, {}, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !tippy_esm_hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (tippy_esm_isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (tippy_esm_isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = tippy_esm_debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if (false) {}

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function (event) {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
      debouncedOnMouseMove(event);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles() {
    popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(void 0, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    } // Clicked on interactive popper


    if (instance.props.interactive && popper.contains(event.target)) {
      return;
    } // Clicked on the event listeners target


    if (getCurrentTarget().contains(event.target)) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = popper_createPopper(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === defaultProps.appendTo || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    createPopperInstance();
    /* istanbul ignore else */

    if (false) {}
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if (false) {}

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = tippy_esm_debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if (false) {} // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      instance.state.isMounted = true;
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if (false) {} // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles();

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if (false) {}

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if (false) {}

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if (false) {}

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if (false) {}

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if (false) { var isMoreThanOneReferenceElement, isSingleContentElement; }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return tippy_esm_isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

var applyStylesModifier = Object.assign({}, modifiers_applyStyles, {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

var createSingleton = function createSingleton(tippyInstances, optionalProps) {
  var _optionalProps$popper;

  if (optionalProps === void 0) {
    optionalProps = {};
  }

  /* istanbul ignore else */
  if (false) {}

  var individualInstances = tippyInstances;
  var references = [];
  var currentTarget;
  var overrides = optionalProps.overrides;
  var interceptSetPropsCleanups = [];
  var shownOnCreate = false;

  function setReferences() {
    references = individualInstances.map(function (instance) {
      return instance.reference;
    });
  }

  function enableInstances(isEnabled) {
    individualInstances.forEach(function (instance) {
      if (isEnabled) {
        instance.enable();
      } else {
        instance.disable();
      }
    });
  }

  function interceptSetProps(singleton) {
    return individualInstances.map(function (instance) {
      var originalSetProps = instance.setProps;

      instance.setProps = function (props) {
        originalSetProps(props);

        if (instance.reference === currentTarget) {
          singleton.setProps(props);
        }
      };

      return function () {
        instance.setProps = originalSetProps;
      };
    });
  } // have to pass singleton, as it maybe undefined on first call


  function prepareInstance(singleton, target) {
    var index = references.indexOf(target); // bail-out

    if (target === currentTarget) {
      return;
    }

    currentTarget = target;
    var overrideProps = (overrides || []).concat('content').reduce(function (acc, prop) {
      acc[prop] = individualInstances[index].props[prop];
      return acc;
    }, {});
    singleton.setProps(Object.assign({}, overrideProps, {
      getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function () {
        return target.getBoundingClientRect();
      }
    }));
  }

  enableInstances(false);
  setReferences();
  var plugin = {
    fn: function fn() {
      return {
        onDestroy: function onDestroy() {
          enableInstances(true);
        },
        onHidden: function onHidden() {
          currentTarget = null;
        },
        onClickOutside: function onClickOutside(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            currentTarget = null;
          }
        },
        onShow: function onShow(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            prepareInstance(instance, references[0]);
          }
        },
        onTrigger: function onTrigger(instance, event) {
          prepareInstance(instance, event.currentTarget);
        }
      };
    }
  };
  var singleton = tippy(div(), Object.assign({}, removeProperties(optionalProps, ['overrides']), {
    plugins: [plugin].concat(optionalProps.plugins || []),
    triggerTarget: references,
    popperOptions: Object.assign({}, optionalProps.popperOptions, {
      modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [applyStylesModifier])
    })
  }));
  var originalShow = singleton.show;

  singleton.show = function (target) {
    originalShow(); // first time, showOnCreate or programmatic call with no params
    // default to showing first instance

    if (!currentTarget && target == null) {
      return prepareInstance(singleton, references[0]);
    } // triggered from event (do nothing as prepareInstance already called by onTrigger)
    // programmatic call with no params when already visible (do nothing again)


    if (currentTarget && target == null) {
      return;
    } // target is index of instance


    if (typeof target === 'number') {
      return references[target] && prepareInstance(singleton, references[target]);
    } // target is a child tippy instance


    if (individualInstances.includes(target)) {
      var ref = target.reference;
      return prepareInstance(singleton, ref);
    } // target is a ReferenceElement


    if (references.includes(target)) {
      return prepareInstance(singleton, target);
    }
  };

  singleton.showNext = function () {
    var first = references[0];

    if (!currentTarget) {
      return singleton.show(0);
    }

    var index = references.indexOf(currentTarget);
    singleton.show(references[index + 1] || first);
  };

  singleton.showPrevious = function () {
    var last = references[references.length - 1];

    if (!currentTarget) {
      return singleton.show(last);
    }

    var index = references.indexOf(currentTarget);
    var target = references[index - 1] || last;
    singleton.show(target);
  };

  var originalSetProps = singleton.setProps;

  singleton.setProps = function (props) {
    overrides = props.overrides || overrides;
    originalSetProps(props);
  };

  singleton.setInstances = function (nextInstances) {
    enableInstances(true);
    interceptSetPropsCleanups.forEach(function (fn) {
      return fn();
    });
    individualInstances = nextInstances;
    enableInstances(false);
    setReferences();
    interceptSetProps(singleton);
    singleton.setProps({
      triggerTarget: references
    });
  };

  interceptSetPropsCleanups = interceptSetProps(singleton);
  return singleton;
};

var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if (false) {}

  var listeners = [];
  var childTippyInstances = [];
  var disabled = false;
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({}, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target || disabled) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;
    var originalEnable = instance.enable;
    var originalDisable = instance.disable;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    instance.enable = function () {
      originalEnable();
      childTippyInstances.forEach(function (instance) {
        return instance.enable();
      });
      disabled = false;
    };

    instance.disable = function () {
      originalDisable();
      childTippyInstances.forEach(function (instance) {
        return instance.disable();
      });
      disabled = true;
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

var animateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn: function fn(instance) {
    var _instance$props$rende;

    // @ts-ignore
    if (!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy)) {
      if (false) {}

      return {};
    }

    var _getChildren = getChildren(instance.popper),
        box = _getChildren.box,
        content = _getChildren.content;

    var backdrop = instance.props.animateFill ? createBackdropElement() : null;
    return {
      onCreate: function onCreate() {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';
          instance.setProps({
            arrow: false,
            animation: 'shift-away'
          });
        }
      },
      onMount: function onMount() {
        if (backdrop) {
          var transitionDuration = box.style.transitionDuration;
          var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.

          content.style.transitionDelay = Math.round(duration / 10) + "ms";
          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow: function onShow() {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide: function onHide() {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      }
    };
  }
};

function createBackdropElement() {
  var backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}

var mouseCoords = {
  clientX: 0,
  clientY: 0
};
var activeInstances = [];

function storeMouseCoords(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  mouseCoords = {
    clientX: clientX,
    clientY: clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

var followCursor = {
  name: 'followCursor',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;
    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
    var isInternalUpdate = false;
    var wasFocusEvent = false;
    var isUnmounted = true;
    var prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
      var followCursor = instance.props.followCursor;
      var clientX = event.clientX,
          clientY = event.clientY;
      var rect = reference.getBoundingClientRect();
      var relativeX = clientX - rect.left;
      var relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          getReferenceClientRect: function getReferenceClientRect() {
            var rect = reference.getBoundingClientRect();
            var x = clientX;
            var y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            var top = followCursor === 'horizontal' ? rect.top : y;
            var right = followCursor === 'vertical' ? rect.right : x;
            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
            var left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top: top,
              right: right,
              bottom: bottom,
              left: left
            };
          }
        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance: instance,
          doc: doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(function (data) {
        return data.instance !== instance;
      });

      if (activeInstances.filter(function (data) {
        return data.doc === doc;
      }).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,
      onBeforeUpdate: function onBeforeUpdate() {
        prevProps = instance.props;
      },
      onAfterUpdate: function onAfterUpdate(_, _ref2) {
        var followCursor = _ref2.followCursor;

        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },
      onMount: function onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },
      onHidden: function onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }
    };
  }
};

function getProps(props, modifier) {
  var _props$popperOptions;

  return {
    popperOptions: Object.assign({}, props.popperOptions, {
      modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function (_ref) {
        var name = _ref.name;
        return name !== modifier.name;
      }), [modifier])
    })
  };
}

var inlinePositioning = {
  name: 'inlinePositioning',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;

    function isEnabled() {
      return !!instance.props.inlinePositioning;
    }

    var placement;
    var cursorRectIndex = -1;
    var isInternalUpdate = false;
    var modifier = {
      name: 'tippyInlinePositioning',
      enabled: true,
      phase: 'afterWrite',
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (isEnabled()) {
          if (placement !== state.placement) {
            instance.setProps({
              getReferenceClientRect: function getReferenceClientRect() {
                return _getReferenceClientRect(state.placement);
              }
            });
          }

          placement = state.placement;
        }
      }
    };

    function _getReferenceClientRect(placement) {
      return getInlineBoundingClientRect(tippy_esm_getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
    }

    function setInternalProps(partialProps) {
      isInternalUpdate = true;
      instance.setProps(partialProps);
      isInternalUpdate = false;
    }

    function addModifier() {
      if (!isInternalUpdate) {
        setInternalProps(getProps(instance.props, modifier));
      }
    }

    return {
      onCreate: addModifier,
      onAfterUpdate: addModifier,
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          var rects = arrayFrom(instance.reference.getClientRects());
          var cursorRect = rects.find(function (rect) {
            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
          });
          cursorRectIndex = rects.indexOf(cursorRect);
        }
      },
      onUntrigger: function onUntrigger() {
        cursorRectIndex = -1;
      }
    };
  }
};
function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
  // Not an inline element, or placement is not yet known
  if (clientRects.length < 2 || currentBasePlacement === null) {
    return boundingRect;
  } // There are two rects and they are disjoined


  if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
    return clientRects[cursorRectIndex] || boundingRect;
  }

  switch (currentBasePlacement) {
    case 'top':
    case 'bottom':
      {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === 'top';
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }

    case 'left':
    case 'right':
      {
        var minLeft = Math.min.apply(Math, clientRects.map(function (rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function (rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function (rect) {
          return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;

        var _width = _right - _left;

        var _height = _bottom - _top;

        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }

    default:
      {
        return boundingRect;
      }
  }
}

var sticky = {
  name: 'sticky',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference,
        popper = instance.popper;

    function getReference() {
      return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
    }

    function shouldCheck(value) {
      return instance.props.sticky === true || instance.props.sticky === value;
    }

    var prevRefRect = null;
    var prevPopRect = null;

    function updatePosition() {
      var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
      var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;

      if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
        if (instance.popperInstance) {
          instance.popperInstance.update();
        }
      }

      prevRefRect = currentRefRect;
      prevPopRect = currentPopRect;

      if (instance.state.isMounted) {
        requestAnimationFrame(updatePosition);
      }
    }

    return {
      onMount: function onMount() {
        if (instance.props.sticky) {
          updatePosition();
        }
      }
    };
  }
};

function areRectsDifferent(rectA, rectB) {
  if (rectA && rectB) {
    return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
  }

  return true;
}

tippy.setDefaultProps({
  render: render
});

/* harmony default export */ const tippy_esm = (tippy);

//# sourceMappingURL=tippy.esm.js.map


/***/ }),

/***/ 256:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(356);


/***/ }),

/***/ 356:
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ 110:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatchError = void 0;
/**
 * Indicates an error with dispatching.
 *
 * @export
 * @class DispatchError
 * @extends {Error}
 */
class DispatchError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.DispatchError = DispatchError;


/***/ }),

/***/ 53:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatcherBase = void 0;
const __1 = __webpack_require__(233);
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
class DispatcherBase {
    constructor() {
        this._wrap = new __1.DispatcherWrapper(this);
        this._subscriptions = new Array();
    }
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     *
     * @memberOf DispatcherBase
     */
    get count() {
        return this._subscriptions.length;
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn) {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, false));
        }
        return () => {
            this.unsubscribe(fn);
        };
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn) {
        return this.subscribe(fn);
    }
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    one(fn) {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, true));
        }
        return () => {
            this.unsubscribe(fn);
        };
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn) {
        if (!fn)
            return false;
        return this._subscriptions.some((sub) => sub.handler == fn);
    }
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsubscribe(fn) {
        if (!fn)
            return;
        for (let i = 0; i < this._subscriptions.length; i++) {
            if (this._subscriptions[i].handler == fn) {
                this._subscriptions.splice(i, 1);
                break;
            }
        }
    }
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsub(fn) {
        this.unsubscribe(fn);
    }
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scrop The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    _dispatch(executeAsync, scope, args) {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new __1.EventManagement(() => this.unsub(sub.handler));
            let nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            let s = sub;
            s.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }
        if (executeAsync) {
            return null;
        }
        return { propagationStopped: false };
    }
    createSubscription(handler, isOnce) {
        return new __1.Subscription(handler, isOnce);
    }
    /**
     * Cleans up subs that ran and should run only once.
     */
    cleanup(sub) {
        if (sub.isOnce && sub.isExecuted) {
            let i = this._subscriptions.indexOf(sub);
            if (i > -1) {
                this._subscriptions.splice(i, 1);
            }
        }
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return this._wrap;
    }
    /**
     * Clears all the subscriptions.
     */
    clear() {
        this._subscriptions.splice(0, this._subscriptions.length);
    }
}
exports.DispatcherBase = DispatcherBase;


/***/ }),

/***/ 207:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatcherWrapper = void 0;
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
class DispatcherWrapper {
    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher) {
        this._subscribe = (fn) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn) => dispatcher.unsubscribe(fn);
        this._one = (fn) => dispatcher.one(fn);
        this._has = (fn) => dispatcher.has(fn);
        this._clear = () => dispatcher.clear();
        this._count = () => dispatcher.count;
    }
    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     * @type {number}
     * @memberOf DispatcherWrapper
     */
    get count() {
        return this._count();
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn) {
        return this._subscribe(fn);
    }
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn) {
        return this.subscribe(fn);
    }
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsubscribe(fn) {
        this._unsubscribe(fn);
    }
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsub(fn) {
        this.unsubscribe(fn);
    }
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    one(fn) {
        return this._one(fn);
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn) {
        return this._has(fn);
    }
    /**
     * Clears all the subscriptions.
     */
    clear() {
        this._clear();
    }
}
exports.DispatcherWrapper = DispatcherWrapper;


/***/ }),

/***/ 685:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventListBase = void 0;
/**
 * Base class for event lists classes. Implements the get and remove.
 */
class EventListBase {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        let event = this._events[name];
        if (event) {
            return event;
        }
        event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
}
exports.EventListBase = EventListBase;


/***/ }),

/***/ 928:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseDispatcherBase = void 0;
const __1 = __webpack_require__(233);
class PromiseDispatcherBase extends __1.DispatcherBase {
    constructor() {
        super();
    }
    _dispatch(executeAsync, scope, args) {
        throw new __1.DispatchError("_dispatch not supported. Use _dispatchAsPromise.");
    }
    createSubscription(handler, isOnce) {
        return new __1.PromiseSubscription(handler, isOnce);
    }
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scrop The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    async _dispatchAsPromise(executeAsync, scope, args) {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new __1.EventManagement(() => this.unsub(sub.handler));
            let nargs = Array.prototype.slice.call(args);
            nargs.push(ev);
            let ps = sub;
            await ps.execute(executeAsync, scope, nargs);
            //cleanup subs that are no longer needed
            this.cleanup(sub);
            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }
        if (executeAsync) {
            return null;
        }
        return { propagationStopped: false };
    }
}
exports.PromiseDispatcherBase = PromiseDispatcherBase;


/***/ }),

/***/ 622:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSubscription = void 0;
class PromiseSubscription {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    constructor(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    async execute(executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            //TODO: do we need to cast to any -- seems yuck
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
                return;
            }
            let result = fn.apply(scope, args);
            await result;
        }
    }
}
exports.PromiseSubscription = PromiseSubscription;


/***/ }),

/***/ 84:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Subscription = void 0;
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
class Subscription {
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    constructor(handler, isOnce) {
        this.handler = handler;
        this.isOnce = isOnce;
        /**
         * Indicates if the subscription has been executed before.
         */
        this.isExecuted = false;
    }
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    execute(executeAsync, scope, args) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;
            var fn = this.handler;
            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
            }
            else {
                fn.apply(scope, args);
            }
        }
    }
}
exports.Subscription = Subscription;


/***/ }),

/***/ 114:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HandlingBase = void 0;
/**
 * Base class that implements event handling. With a an
 * event list this base class will expose events that can be
 * subscribed to. This will give your class generic events.
 *
 * @export
 * @abstract
 * @class HandlingBase
 * @template TEventHandler
 * @template TDispatcher
 * @template TList
 */
class HandlingBase {
    constructor(events) {
        this.events = events;
    }
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name, fn) {
        this.events.get(name).one(fn);
    }
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name, fn) {
        return this.events.get(name).has(fn);
    }
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name, fn) {
        this.events.get(name).subscribe(fn);
    }
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name, fn) {
        this.subscribe(name, fn);
    }
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name, fn) {
        this.events.get(name).unsubscribe(fn);
    }
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name, fn) {
        this.unsubscribe(name, fn);
    }
}
exports.HandlingBase = HandlingBase;


/***/ }),

/***/ 233:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HandlingBase = exports.PromiseDispatcherBase = exports.PromiseSubscription = exports.DispatchError = exports.EventManagement = exports.EventListBase = exports.DispatcherWrapper = exports.DispatcherBase = exports.Subscription = void 0;
const DispatcherBase_1 = __webpack_require__(53);
Object.defineProperty(exports, "DispatcherBase", ({ enumerable: true, get: function () { return DispatcherBase_1.DispatcherBase; } }));
const DispatchError_1 = __webpack_require__(110);
Object.defineProperty(exports, "DispatchError", ({ enumerable: true, get: function () { return DispatchError_1.DispatchError; } }));
const DispatcherWrapper_1 = __webpack_require__(207);
Object.defineProperty(exports, "DispatcherWrapper", ({ enumerable: true, get: function () { return DispatcherWrapper_1.DispatcherWrapper; } }));
const EventListBase_1 = __webpack_require__(685);
Object.defineProperty(exports, "EventListBase", ({ enumerable: true, get: function () { return EventListBase_1.EventListBase; } }));
const EventManagement_1 = __webpack_require__(824);
Object.defineProperty(exports, "EventManagement", ({ enumerable: true, get: function () { return EventManagement_1.EventManagement; } }));
const HandlingBase_1 = __webpack_require__(114);
Object.defineProperty(exports, "HandlingBase", ({ enumerable: true, get: function () { return HandlingBase_1.HandlingBase; } }));
const PromiseDispatcherBase_1 = __webpack_require__(928);
Object.defineProperty(exports, "PromiseDispatcherBase", ({ enumerable: true, get: function () { return PromiseDispatcherBase_1.PromiseDispatcherBase; } }));
const PromiseSubscription_1 = __webpack_require__(622);
Object.defineProperty(exports, "PromiseSubscription", ({ enumerable: true, get: function () { return PromiseSubscription_1.PromiseSubscription; } }));
const Subscription_1 = __webpack_require__(84);
Object.defineProperty(exports, "Subscription", ({ enumerable: true, get: function () { return Subscription_1.Subscription; } }));


/***/ }),

/***/ 824:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventManagement = void 0;
/**
 * Allows the user to interact with the event.
 *
 * @class EventManagement
 * @implements {IEventManagement}
 */
class EventManagement {
    constructor(unsub) {
        this.unsub = unsub;
        this.propagationStopped = false;
    }
    stopPropagation() {
        this.propagationStopped = true;
    }
}
exports.EventManagement = EventManagement;


/***/ }),

/***/ 608:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDispatcher = void 0;
const ste_core_1 = __webpack_require__(233);
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class EventDispatcher
 * @extends {DispatcherBase<IEventHandler<TSender, TArgs>>}
 * @implements {IEvent<TSender, TArgs>}
 * @template TSender
 * @template TArgs
 */
class EventDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of EventDispatcher.
     *
     * @memberOf EventDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The event status.
     *
     * @memberOf EventDispatcher
     */
    dispatch(sender, args) {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatchAsync(sender, args) {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {IEvent<TSender, TArgs>} The event.
     *
     * @memberOf EventDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.EventDispatcher = EventDispatcher;


/***/ }),

/***/ 164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(233);
const EventList_1 = __webpack_require__(594);
/**
 * Extends objects with signal event handling capabilities.
 */
class EventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new EventList_1.EventList());
    }
}
exports.EventHandlingBase = EventHandlingBase;


/***/ }),

/***/ 594:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventList = void 0;
const ste_core_1 = __webpack_require__(233);
const EventDispatcher_1 = __webpack_require__(608);
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class EventList extends ste_core_1.EventListBase {
    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new EventDispatcher_1.EventDispatcher();
    }
}
exports.EventList = EventList;


/***/ }),

/***/ 107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformEventList = void 0;
const EventDispatcher_1 = __webpack_require__(608);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new EventDispatcher_1.EventDispatcher();
    }
}
exports.NonUniformEventList = NonUniformEventList;


/***/ }),

/***/ 851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformEventList = exports.EventList = exports.EventHandlingBase = exports.EventDispatcher = void 0;
const EventDispatcher_1 = __webpack_require__(608);
Object.defineProperty(exports, "EventDispatcher", ({ enumerable: true, get: function () { return EventDispatcher_1.EventDispatcher; } }));
const EventHandlingBase_1 = __webpack_require__(164);
Object.defineProperty(exports, "EventHandlingBase", ({ enumerable: true, get: function () { return EventHandlingBase_1.EventHandlingBase; } }));
const EventList_1 = __webpack_require__(594);
Object.defineProperty(exports, "EventList", ({ enumerable: true, get: function () { return EventList_1.EventList; } }));
const NonUniformEventList_1 = __webpack_require__(107);
Object.defineProperty(exports, "NonUniformEventList", ({ enumerable: true, get: function () { return NonUniformEventList_1.NonUniformEventList; } }));


/***/ }),

/***/ 253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseEventList = void 0;
const PromiseEventDispatcher_1 = __webpack_require__(933);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformPromiseEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseEventDispatcher_1.PromiseEventDispatcher();
    }
}
exports.NonUniformPromiseEventList = NonUniformPromiseEventList;


/***/ }),

/***/ 933:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(233);
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class PromiseEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseEventHandler<TSender, TArgs>>}
 * @implements {IPromiseEvent<TSender, TArgs>}
 * @template TSender
 * @template TArgs
 */
class PromiseEventDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     * @returns {Promise<IPropagationStatus>} The status.
     *
     * @memberOf PromiseEventDispatcher
     */
    async dispatch(sender, args) {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     *
     * @memberOf PromiseEventDispatcher
     */
    dispatchAsync(sender, args) {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseEventDispatcher = PromiseEventDispatcher;


/***/ }),

/***/ 238:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(233);
const PromiseEventList_1 = __webpack_require__(930);
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseEventList_1.PromiseEventList());
    }
}
exports.PromiseEventHandlingBase = PromiseEventHandlingBase;


/***/ }),

/***/ 930:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseEventList = void 0;
const ste_core_1 = __webpack_require__(233);
const PromiseEventDispatcher_1 = __webpack_require__(933);
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new EventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseEventDispatcher_1.PromiseEventDispatcher();
    }
}
exports.PromiseEventList = PromiseEventList;


/***/ }),

/***/ 129:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseEventList = exports.PromiseEventList = exports.PromiseEventHandlingBase = exports.PromiseEventDispatcher = void 0;
const PromiseEventDispatcher_1 = __webpack_require__(933);
Object.defineProperty(exports, "PromiseEventDispatcher", ({ enumerable: true, get: function () { return PromiseEventDispatcher_1.PromiseEventDispatcher; } }));
const PromiseEventHandlingBase_1 = __webpack_require__(238);
Object.defineProperty(exports, "PromiseEventHandlingBase", ({ enumerable: true, get: function () { return PromiseEventHandlingBase_1.PromiseEventHandlingBase; } }));
const PromiseEventList_1 = __webpack_require__(930);
Object.defineProperty(exports, "PromiseEventList", ({ enumerable: true, get: function () { return PromiseEventList_1.PromiseEventList; } }));
const NonUniformPromiseEventList_1 = __webpack_require__(253);
Object.defineProperty(exports, "NonUniformPromiseEventList", ({ enumerable: true, get: function () { return NonUniformPromiseEventList_1.NonUniformPromiseEventList; } }));


/***/ }),

/***/ 482:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalDispatcher = void 0;
const ste_core_1 = __webpack_require__(233);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
class PromiseSignalDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the dispatch.
     *
     * @memberOf SignalDispatcher
     */
    async dispatch() {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync() {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseSignalDispatcher = PromiseSignalDispatcher;


/***/ }),

/***/ 948:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalHandlingBase = void 0;
const ste_core_1 = __webpack_require__(233);
const PromiseSignalList_1 = __webpack_require__(758);
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseSignalHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseSignalList_1.PromiseSignalList());
    }
}
exports.PromiseSignalHandlingBase = PromiseSignalHandlingBase;


/***/ }),

/***/ 758:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalList = void 0;
const ste_core_1 = __webpack_require__(233);
const _1 = __webpack_require__(559);
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseSignalList extends ste_core_1.EventListBase {
    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new _1.PromiseSignalDispatcher();
    }
}
exports.PromiseSignalList = PromiseSignalList;


/***/ }),

/***/ 559:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Promise Signals
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSignalList = exports.PromiseSignalHandlingBase = exports.PromiseSignalDispatcher = void 0;
const PromiseSignalDispatcher_1 = __webpack_require__(482);
Object.defineProperty(exports, "PromiseSignalDispatcher", ({ enumerable: true, get: function () { return PromiseSignalDispatcher_1.PromiseSignalDispatcher; } }));
const PromiseSignalHandlingBase_1 = __webpack_require__(948);
Object.defineProperty(exports, "PromiseSignalHandlingBase", ({ enumerable: true, get: function () { return PromiseSignalHandlingBase_1.PromiseSignalHandlingBase; } }));
const PromiseSignalList_1 = __webpack_require__(758);
Object.defineProperty(exports, "PromiseSignalList", ({ enumerable: true, get: function () { return PromiseSignalList_1.PromiseSignalList; } }));


/***/ }),

/***/ 841:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseSimpleEventList = void 0;
const PromiseSimpleEventDispatcher_1 = __webpack_require__(377);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformPromiseSimpleEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher();
    }
}
exports.NonUniformPromiseSimpleEventList = NonUniformPromiseSimpleEventList;


/***/ }),

/***/ 377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSimpleEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(233);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class PromiseSimpleEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseSimpleEventHandler<TArgs>>}
 * @implements {IPromiseSimpleEvent<TArgs>}
 * @template TArgs
 */
class PromiseSimpleEventDispatcher extends ste_core_1.PromiseDispatcherBase {
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     * @param args The arguments object.
     * @returns {IPropagationStatus} The status of the dispatch.
     * @memberOf PromiseSimpleEventDispatcher
     */
    async dispatch(args) {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for it to complete.
     * @param args The argument object.
     * @memberOf PromiseSimpleEventDispatcher
     */
    dispatchAsync(args) {
        this._dispatchAsPromise(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.PromiseSimpleEventDispatcher = PromiseSimpleEventDispatcher;


/***/ }),

/***/ 511:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSimpleEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(233);
const PromiseSimpleEventList_1 = __webpack_require__(879);
/**
 * Extends objects with signal event handling capabilities.
 */
class PromiseSimpleEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new PromiseSimpleEventList_1.PromiseSimpleEventList());
    }
}
exports.PromiseSimpleEventHandlingBase = PromiseSimpleEventHandlingBase;


/***/ }),

/***/ 879:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromiseSimpleEventList = void 0;
const ste_core_1 = __webpack_require__(233);
const PromiseSimpleEventDispatcher_1 = __webpack_require__(377);
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class PromiseSimpleEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher();
    }
}
exports.PromiseSimpleEventList = PromiseSimpleEventList;


/***/ }),

/***/ 817:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Core
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformPromiseSimpleEventList = exports.PromiseSimpleEventList = exports.PromiseSimpleEventHandlingBase = exports.PromiseSimpleEventDispatcher = void 0;
const NonUniformPromiseSimpleEventList_1 = __webpack_require__(841);
Object.defineProperty(exports, "NonUniformPromiseSimpleEventList", ({ enumerable: true, get: function () { return NonUniformPromiseSimpleEventList_1.NonUniformPromiseSimpleEventList; } }));
const PromiseSimpleEventDispatcher_1 = __webpack_require__(377);
Object.defineProperty(exports, "PromiseSimpleEventDispatcher", ({ enumerable: true, get: function () { return PromiseSimpleEventDispatcher_1.PromiseSimpleEventDispatcher; } }));
const PromiseSimpleEventHandlingBase_1 = __webpack_require__(511);
Object.defineProperty(exports, "PromiseSimpleEventHandlingBase", ({ enumerable: true, get: function () { return PromiseSimpleEventHandlingBase_1.PromiseSimpleEventHandlingBase; } }));
const PromiseSimpleEventList_1 = __webpack_require__(879);
Object.defineProperty(exports, "PromiseSimpleEventList", ({ enumerable: true, get: function () { return PromiseSimpleEventList_1.PromiseSimpleEventList; } }));


/***/ }),

/***/ 275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalDispatcher = void 0;
const ste_core_1 = __webpack_require__(233);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 *
 * @export
 * @class SignalDispatcher
 * @extends {DispatcherBase<ISignalHandler>}
 * @implements {ISignal}
 */
class SignalDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of SignalDispatcher.
     *
     * @memberOf SignalDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the signal.
     *
     * @memberOf SignalDispatcher
     */
    dispatch() {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the signal without waiting for the result.
     *
     * @memberOf SignalDispatcher
     */
    dispatchAsync() {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISignal} The signal.
     *
     * @memberOf SignalDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.SignalDispatcher = SignalDispatcher;


/***/ }),

/***/ 36:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalHandlingBase = void 0;
const ste_core_1 = __webpack_require__(233);
const SignalList_1 = __webpack_require__(80);
/**
 * Extends objects with signal event handling capabilities.
 */
class SignalHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new SignalList_1.SignalList());
    }
}
exports.SignalHandlingBase = SignalHandlingBase;


/***/ }),

/***/ 80:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalList = void 0;
const ste_core_1 = __webpack_require__(233);
const SignalDispatcher_1 = __webpack_require__(275);
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SignalList extends ste_core_1.EventListBase {
    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SignalDispatcher_1.SignalDispatcher();
    }
}
exports.SignalList = SignalList;


/***/ }),

/***/ 350:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*!
 * Strongly Typed Events for TypeScript - Promise Signals
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignalList = exports.SignalHandlingBase = exports.SignalDispatcher = void 0;
const SignalDispatcher_1 = __webpack_require__(275);
Object.defineProperty(exports, "SignalDispatcher", ({ enumerable: true, get: function () { return SignalDispatcher_1.SignalDispatcher; } }));
const SignalHandlingBase_1 = __webpack_require__(36);
Object.defineProperty(exports, "SignalHandlingBase", ({ enumerable: true, get: function () { return SignalHandlingBase_1.SignalHandlingBase; } }));
const SignalList_1 = __webpack_require__(80);
Object.defineProperty(exports, "SignalList", ({ enumerable: true, get: function () { return SignalList_1.SignalList; } }));


/***/ }),

/***/ 335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformSimpleEventList = void 0;
const SimpleEventDispatcher_1 = __webpack_require__(120);
/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */
class NonUniformSimpleEventList {
    constructor() {
        this._events = {};
    }
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name) {
        if (this._events[name]) {
            // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
            return this._events[name];
        }
        const event = this.createDispatcher();
        this._events[name] = event;
        return event;
    }
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name) {
        delete this._events[name];
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SimpleEventDispatcher_1.SimpleEventDispatcher();
    }
}
exports.NonUniformSimpleEventList = NonUniformSimpleEventList;


/***/ }),

/***/ 120:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleEventDispatcher = void 0;
const ste_core_1 = __webpack_require__(233);
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class SimpleEventDispatcher
 * @extends {DispatcherBase<ISimpleEventHandler<TArgs>>}
 * @implements {ISimpleEvent<TArgs>}
 * @template TArgs
 */
class SimpleEventDispatcher extends ste_core_1.DispatcherBase {
    /**
     * Creates an instance of SimpleEventDispatcher.
     *
     * @memberOf SimpleEventDispatcher
     */
    constructor() {
        super();
    }
    /**
     * Dispatches the event.
     *
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The status of the event.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatch(args) {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new ste_core_1.DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }
    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TArgs} args The arguments object.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatchAsync(args) {
        this._dispatch(true, this, arguments);
    }
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     *
     * @returns {ISimpleEvent<TArgs>} The event.
     *
     * @memberOf SimpleEventDispatcher
     */
    asEvent() {
        return super.asEvent();
    }
}
exports.SimpleEventDispatcher = SimpleEventDispatcher;


/***/ }),

/***/ 229:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleEventHandlingBase = void 0;
const ste_core_1 = __webpack_require__(233);
const SimpleEventList_1 = __webpack_require__(222);
/**
 * Extends objects with signal event handling capabilities.
 */
class SimpleEventHandlingBase extends ste_core_1.HandlingBase {
    constructor() {
        super(new SimpleEventList_1.SimpleEventList());
    }
}
exports.SimpleEventHandlingBase = SimpleEventHandlingBase;


/***/ }),

/***/ 222:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SimpleEventList = void 0;
const ste_core_1 = __webpack_require__(233);
const SimpleEventDispatcher_1 = __webpack_require__(120);
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
class SimpleEventList extends ste_core_1.EventListBase {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }
    /**
     * Creates a new dispatcher instance.
     */
    createDispatcher() {
        return new SimpleEventDispatcher_1.SimpleEventDispatcher();
    }
}
exports.SimpleEventList = SimpleEventList;


/***/ }),

/***/ 844:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NonUniformSimpleEventList = exports.SimpleEventList = exports.SimpleEventHandlingBase = exports.SimpleEventDispatcher = void 0;
const SimpleEventDispatcher_1 = __webpack_require__(120);
Object.defineProperty(exports, "SimpleEventDispatcher", ({ enumerable: true, get: function () { return SimpleEventDispatcher_1.SimpleEventDispatcher; } }));
const SimpleEventHandlingBase_1 = __webpack_require__(229);
Object.defineProperty(exports, "SimpleEventHandlingBase", ({ enumerable: true, get: function () { return SimpleEventHandlingBase_1.SimpleEventHandlingBase; } }));
const NonUniformSimpleEventList_1 = __webpack_require__(335);
Object.defineProperty(exports, "NonUniformSimpleEventList", ({ enumerable: true, get: function () { return NonUniformSimpleEventList_1.NonUniformSimpleEventList; } }));
const SimpleEventList_1 = __webpack_require__(222);
Object.defineProperty(exports, "SimpleEventList", ({ enumerable: true, get: function () { return SimpleEventList_1.SimpleEventList; } }));


/***/ }),

/***/ 590:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.nz = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = exports.FK = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = __webpack_unused_export__ = void 0;
var ste_core_1 = __webpack_require__(233);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.Subscription; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.DispatcherBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.DispatcherWrapper; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.EventListBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.EventManagement; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.DispatchError; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.PromiseSubscription; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.PromiseDispatcherBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_core_1.HandlingBase; } });
var ste_events_1 = __webpack_require__(851);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_events_1.EventDispatcher; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_events_1.EventHandlingBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_events_1.EventList; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_events_1.NonUniformEventList; } });
var ste_simple_events_1 = __webpack_require__(844);
Object.defineProperty(exports, "FK", ({ enumerable: true, get: function () { return ste_simple_events_1.SimpleEventDispatcher; } }));
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_simple_events_1.SimpleEventHandlingBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_simple_events_1.SimpleEventList; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_simple_events_1.NonUniformSimpleEventList; } });
var ste_signals_1 = __webpack_require__(350);
Object.defineProperty(exports, "nz", ({ enumerable: true, get: function () { return ste_signals_1.SignalDispatcher; } }));
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_signals_1.SignalHandlingBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_signals_1.SignalList; } });
var ste_promise_events_1 = __webpack_require__(129);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_events_1.PromiseEventDispatcher; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_events_1.PromiseEventHandlingBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_events_1.PromiseEventList; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_events_1.NonUniformPromiseEventList; } });
var ste_promise_signals_1 = __webpack_require__(559);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalDispatcher; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalHandlingBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_signals_1.PromiseSignalList; } });
var ste_promise_simple_events_1 = __webpack_require__(817);
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventDispatcher; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventHandlingBase; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_simple_events_1.PromiseSimpleEventList; } });
__webpack_unused_export__ = ({ enumerable: true, get: function () { return ste_promise_simple_events_1.NonUniformPromiseSimpleEventList; } });


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/deprecated.js


// A way to gracefully handle deprecation.
// Find and replace HTML Elements, Classes, and more after the DOM is loaded but before any other Javascript fires.

var Deprecated = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function Deprecated() {
    _classCallCheck(this, Deprecated);

    var deprecated;
    var replacement; // Checks for body-side class

    deprecated = document.querySelector(".body-side");

    if (deprecated) {
      this.warning(deprecated);
    } // Checks for backgroundImage class


    deprecated = document.querySelector(".backgroundImage");

    if (deprecated) {
      replacement = "background-image";
      this.replace(deprecated, replacement);
    } // Checks for backgroundImageOverlay class


    deprecated = document.querySelector(".backgroundImageOverlay");

    if (deprecated) {
      replacement = "background-image-overlay";
      this.replace(deprecated, replacement);
    }
  }

  _createClass(Deprecated, [{
    key: "warning",
    value: function warning(deprecated) {
      if (ENGrid.debug) console.log("Deprecated: '" + deprecated + "' was detected and nothing was done.");
    }
  }, {
    key: "replace",
    value: function replace(deprecated, replacement) {
      if (ENGrid.debug) console.log("Deprecated: '" + deprecated + "' was detected and replaced with '" + replacement + "'.");
      deprecated.classList.add(replacement);
      deprecated.classList.remove(deprecated);
    }
  }]);

  return Deprecated;
}()));
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/interfaces/options.js
var OptionsDefaults = {
  backgroundImage: '',
  MediaAttribution: true,
  applePay: false,
  CapitalizeFields: false,
  ClickToExpand: true,
  CurrencySymbol: '$',
  CurrencySeparator: '.',
  SkipToMainContentLink: true,
  SrcDefer: true,
  NeverBounceAPI: null,
  NeverBounceDateField: null,
  NeverBounceStatusField: null,
  Debug: false
};
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/interfaces/upsell-options.js
var UpsellOptionsDefaults = {
  image: "https://picsum.photos/480/650",
  imagePosition: "left",
  title: "Will you change your gift to just {new-amount} a month to boost your impact?",
  paragraph: "Make a monthly pledge today to support us with consistent, reliable resources during emergency moments.",
  yesLabel: "Yes! Process My <br> {new-amount} monthly gift",
  noLabel: "No, thanks. Continue with my <br> {old-amount} one-time gift",
  otherAmount: true,
  otherLabel: "Or enter a different monthly amount:",
  upsellOriginalGiftAmountFieldName: '',
  amountRange: [{
    max: 10,
    suggestion: 5
  }, {
    max: 15,
    suggestion: 7
  }, {
    max: 20,
    suggestion: 8
  }, {
    max: 25,
    suggestion: 9
  }, {
    max: 30,
    suggestion: 10
  }, {
    max: 35,
    suggestion: 11
  }, {
    max: 40,
    suggestion: 12
  }, {
    max: 50,
    suggestion: 14
  }, {
    max: 100,
    suggestion: 15
  }, {
    max: 200,
    suggestion: 19
  }, {
    max: 300,
    suggestion: 29
  }, {
    max: 500,
    suggestion: "Math.ceil((amount / 12)/5)*5"
  }],
  canClose: true,
  submitOnClose: false
};
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function classCallCheck_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function createClass_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
;// CONCATENATED MODULE: ../engrid-scripts/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// EXTERNAL MODULE: ../engrid-scripts/packages/common/node_modules/strongly-typed-events/dist/index.js
var dist = __webpack_require__(590);
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/events/en-form.js




var EnForm = /*#__PURE__*/function () {
  function EnForm() {
    classCallCheck_classCallCheck(this, EnForm);

    this._onSubmit = new dist/* SignalDispatcher */.nz();
    this._onValidate = new dist/* SignalDispatcher */.nz();
    this._onError = new dist/* SignalDispatcher */.nz();
    this.submit = true;
    this.validate = true;
  }

  createClass_createClass(EnForm, [{
    key: "dispatchSubmit",
    value: function dispatchSubmit() {
      this._onSubmit.dispatch();

      if (engrid_ENGrid.debug) console.log("dispatchSubmit");
    }
  }, {
    key: "dispatchValidate",
    value: function dispatchValidate() {
      this._onValidate.dispatch();

      if (engrid_ENGrid.debug) console.log("dispatchValidate");
    }
  }, {
    key: "dispatchError",
    value: function dispatchError() {
      this._onError.dispatch();

      if (engrid_ENGrid.debug) console.log("dispatchError");
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var enForm = document.querySelector("form .en__submit button");

      if (enForm) {
        // Add submitting class to modal
        var enModal = document.getElementById("enModal");
        if (enModal) enModal.classList.add("is-submitting");
        enForm.click();
        if (engrid_ENGrid.debug) console.log("submitForm");
      }
    }
  }, {
    key: "onSubmit",
    get: function get() {
      // if(ENGrid.debug) console.log("onSubmit");
      return this._onSubmit.asEvent();
    }
  }, {
    key: "onError",
    get: function get() {
      // if(ENGrid.debug) console.log("onError");
      return this._onError.asEvent();
    }
  }, {
    key: "onValidate",
    get: function get() {
      // if(ENGrid.debug) console.log("onError");
      return this._onValidate.asEvent();
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!EnForm.instance) {
        EnForm.instance = new EnForm();
      }

      return EnForm.instance;
    }
  }]);

  return EnForm;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/events/donation-amount.js



var DonationAmount = /*#__PURE__*/function () {
  function DonationAmount() {
    var _this = this;

    var radios = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "transaction.donationAmt";
    var other = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "transaction.donationAmt.other";

    classCallCheck_classCallCheck(this, DonationAmount);

    this._onAmountChange = new dist/* SimpleEventDispatcher */.FK();
    this._amount = 0;
    this._radios = "";
    this._other = "";
    this._dispatch = true;
    this._other = other;
    this._radios = radios; // Watch Radios Inputs for Changes

    document.addEventListener("change", function (e) {
      var element = e.target;

      if (element && element.name == radios) {
        element.value = _this.removeCommas(element.value);
        _this.amount = parseFloat(element.value);
      }
    }); // Watch Other Amount Field

    var otherField = document.querySelector("[name='".concat(this._other, "']"));

    if (otherField) {
      otherField.addEventListener("keyup", function (e) {
        otherField.value = _this.removeCommas(otherField.value);
        _this.amount = parseFloat(otherField.value);
      });
    }
  }

  createClass_createClass(DonationAmount, [{
    key: "amount",
    get: function get() {
      return this._amount;
    } // Every time we set an amount, trigger the onAmountChange event
    ,
    set: function set(value) {
      this._amount = value || 0;
      if (this._dispatch) this._onAmountChange.dispatch(this._amount);
    }
  }, {
    key: "onAmountChange",
    get: function get() {
      return this._onAmountChange.asEvent();
    } // Set amount var with currently selected amount

  }, {
    key: "load",
    value: function load() {
      var currentAmountField = document.querySelector('input[name="' + this._radios + '"]:checked');

      if (currentAmountField && currentAmountField.value) {
        var currentAmountValue = parseFloat(currentAmountField.value);

        if (currentAmountValue > 0) {
          this.amount = parseFloat(currentAmountField.value);
        } else {
          var otherField = document.querySelector('input[name="' + this._other + '"]');
          currentAmountValue = parseFloat(otherField.value);
          this.amount = parseFloat(otherField.value);
        }
      }
    } // Force a new amount

  }, {
    key: "setAmount",
    value: function setAmount(amount) {
      var dispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Run only if it is a Donation Page with a Donation Amount field
      if (!document.getElementsByName(this._radios).length) {
        return;
      } // Set dispatch to be checked by the SET method


      this._dispatch = dispatch; // Search for the current amount on radio boxes

      var found = Array.from(document.querySelectorAll('input[name="' + this._radios + '"]')).filter(function (el) {
        return el instanceof HTMLInputElement && parseInt(el.value) == amount;
      }); // We found the amount on the radio boxes, so check it

      if (found.length) {
        var amountField = found[0];
        amountField.checked = true; // Clear OTHER text field

        this.clearOther();
      } else {
        var otherField = document.querySelector('input[name="' + this._other + '"]');
        otherField.focus();
        otherField.value = parseFloat(amount.toString()).toFixed(2);
      } // Set the new amount and trigger all live variables


      this.amount = amount; // Revert dispatch to default value (true)

      this._dispatch = true;
    } // Clear Other Field

  }, {
    key: "clearOther",
    value: function clearOther() {
      var otherField = document.querySelector('input[name="' + this._other + '"]');
      otherField.value = "";
      var otherWrapper = otherField.parentNode;
      otherWrapper.classList.add("en__field__item--hidden");
    } // Remove commas

  }, {
    key: "removeCommas",
    value: function removeCommas(v) {
      // replace 5,00 with 5.00
      if (v.length > 3 && v.charAt(v.length - 3) == ',') {
        v = v.substr(0, v.length - 3) + "." + v.substr(v.length - 2, 2);
      } else if (v.length > 2 && v.charAt(v.length - 2) == ',') {
        v = v.substr(0, v.length - 2) + "." + v.substr(v.length - 1, 1);
      } // replace any remaining commas


      return v.replace(/,/g, '');
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      var radios = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "transaction.donationAmt";
      var other = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "transaction.donationAmt.other";

      if (!DonationAmount.instance) {
        DonationAmount.instance = new DonationAmount(radios, other);
      }

      return DonationAmount.instance;
    }
  }]);

  return DonationAmount;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/engrid.js



function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var engrid_ENGrid = /*#__PURE__*/function () {
  function ENGrid() {
    classCallCheck_classCallCheck(this, ENGrid);

    if (!ENGrid.enForm) {
      throw new Error('Engaging Networks Form Not Found!');
    }
  }

  createClass_createClass(ENGrid, null, [{
    key: "enForm",
    get: function get() {
      return document.querySelector("form.en__component");
    }
  }, {
    key: "debug",
    get: function get() {
      return !!this.getOption('Debug');
    } // Return any parameter from the URL

  }, {
    key: "getUrlParameter",
    value: function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    } // Return the field value from its name. It works on any field type.
    // Multiple values (from checkboxes or multi-select) are returned as single string
    // Separated by ,

  }, {
    key: "getFieldValue",
    value: function getFieldValue(name) {
      return new FormData(this.enForm).getAll(name).join(',');
    } // Set a value to any field. If it's a dropdown, radio or checkbox, it selects the proper option matching the value

  }, {
    key: "setFieldValue",
    value: function setFieldValue(name, value) {
      document.getElementsByName(name).forEach(function (field) {
        if ('type' in field) {
          switch (field.type) {
            case 'select-one':
            case 'select-multiple':
              var _iterator = _createForOfIteratorHelper(field.options),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var option = _step.value;

                  if (option.value == value) {
                    option.selected = true;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              break;

            case 'checkbox':
            case 'radio':
              // @TODO: Try to trigger the onChange event
              if (field.value == value) {
                field.checked = true;
              }

              break;

            case 'textarea':
            case 'text':
            default:
              field.value = value;
          }
        }
      });
      this.enParseDependencies();
      return;
    } // Trigger EN Dependencies

  }, {
    key: "enParseDependencies",
    value: function enParseDependencies() {
      var _a, _b, _c, _d, _e;

      if (window.EngagingNetworks && typeof ((_e = (_d = (_c = (_b = (_a = window.EngagingNetworks) === null || _a === void 0 ? void 0 : _a.require) === null || _b === void 0 ? void 0 : _b._defined) === null || _c === void 0 ? void 0 : _c.enDependencies) === null || _d === void 0 ? void 0 : _d.dependencies) === null || _e === void 0 ? void 0 : _e.parseDependencies) === "function") {
        window.EngagingNetworks.require._defined.enDependencies.dependencies.parseDependencies(window.EngagingNetworks.dependencies);

        if (ENGrid.getOption('Debug')) console.trace('EN Dependencies Triggered');
      }
    } // Return the status of the gift process (true if a donation has been made, otherwise false)

  }, {
    key: "getGiftProcess",
    value: function getGiftProcess() {
      if ('pageJson' in window) return window.pageJson.giftProcess;
      return null;
    } // Return the page count

  }, {
    key: "getPageCount",
    value: function getPageCount() {
      if ('pageJson' in window) return window.pageJson.pageCount;
      return null;
    } // Return the current page number

  }, {
    key: "getPageNumber",
    value: function getPageNumber() {
      if ('pageJson' in window) return window.pageJson.pageNumber;
      return null;
    } // Return the current page ID

  }, {
    key: "getPageID",
    value: function getPageID() {
      if ('pageJson' in window) return window.pageJson.campaignPageId;
      return 0;
    } // Return the current page type

  }, {
    key: "getPageType",
    value: function getPageType() {
      if ('pageJson' in window && 'pageType' in window.pageJson) {
        switch (window.pageJson.pageType) {
          case "e-card":
            return "ECARD";
            break;

          case "otherdatacapture":
            return "SURVEY";
            break;

          case "emailtotarget":
          case "advocacypetition":
            return "ADVOCACY";
            break;

          case "emailsubscribeform":
            return "SUBSCRIBEFORM";
            break;

          default:
            return "DONATION";
        }
      } else {
        return "DONATION";
      }
    } // Set body engrid data attributes

  }, {
    key: "setBodyData",
    value: function setBodyData(dataName, value) {
      var body = document.querySelector('body');
      body.setAttribute("data-engrid-".concat(dataName), value);
    } // Get body engrid data attributes

  }, {
    key: "getBodyData",
    value: function getBodyData(dataName) {
      var body = document.querySelector('body');
      return body.getAttribute("data-engrid-".concat(dataName));
    } // Return the option value

  }, {
    key: "getOption",
    value: function getOption(key) {
      return window.EngridOptions[key] || null;
    } // Load an external script

  }, {
    key: "loadJS",
    value: function loadJS(url) {
      var onload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var head = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var scriptTag = document.createElement('script');
      scriptTag.src = url;
      scriptTag.onload = onload;

      if (head) {
        document.getElementsByTagName("head")[0].appendChild(scriptTag);
        return;
      }

      document.getElementsByTagName("body")[0].appendChild(scriptTag);
      return;
    }
  }]);

  return ENGrid;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/events/donation-frequency.js




var DonationFrequency = /*#__PURE__*/function () {
  function DonationFrequency() {
    var _this = this;

    classCallCheck_classCallCheck(this, DonationFrequency);

    this._onFrequencyChange = new dist/* SimpleEventDispatcher */.FK();
    this._frequency = "onetime";
    this._recurring = "n";
    this._dispatch = true; // Watch the Radios for Changes

    document.addEventListener("change", function (e) {
      var element = e.target;

      if (element && element.name == "transaction.recurrpay") {
        _this.recurring = element.value; // When this element is a radio, that means you're between onetime and monthly only

        if (element.type == 'radio') {
          _this.frequency = element.value.toLowerCase() == 'n' ? 'onetime' : 'monthly'; // This field is hidden when transaction.recurrpay is radio

          engrid_ENGrid.setFieldValue('transaction.recurrfreq', _this.frequency.toUpperCase());
        }
      }

      if (element && element.name == "transaction.recurrfreq") {
        _this.frequency = element.value;
      }
    });
  }

  createClass_createClass(DonationFrequency, [{
    key: "frequency",
    get: function get() {
      return this._frequency;
    } // Every time we set a frequency, trigger the onFrequencyChange event
    ,
    set: function set(value) {
      this._frequency = value.toLowerCase() || 'onetime';
      if (this._dispatch) this._onFrequencyChange.dispatch(this._frequency);
      engrid_ENGrid.setBodyData('transaction-recurring-frequency', this._frequency);
    }
  }, {
    key: "recurring",
    get: function get() {
      return this._recurring;
    },
    set: function set(value) {
      this._recurring = value.toLowerCase() || 'n';
      engrid_ENGrid.setBodyData('transaction-recurring', this._recurring);
    }
  }, {
    key: "onFrequencyChange",
    get: function get() {
      return this._onFrequencyChange.asEvent();
    } // Set amount var with currently selected amount

  }, {
    key: "load",
    value: function load() {
      this.frequency = engrid_ENGrid.getFieldValue('transaction.recurrfreq');
      this.recurring = engrid_ENGrid.getFieldValue('transaction.recurrpay'); // ENGrid.enParseDependencies();
    } // Force a new recurrency

  }, {
    key: "setRecurrency",
    value: function setRecurrency(recurr) {
      var dispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Run only if it is a Donation Page with a Recurrency
      if (!document.getElementsByName("transaction.recurrpay").length) {
        return;
      } // Set dispatch to be checked by the SET method


      this._dispatch = dispatch;
      engrid_ENGrid.setFieldValue("transaction.recurrpay", recurr.toUpperCase()); // Revert dispatch to default value (true)

      this._dispatch = true;
    } // Force a new frequency

  }, {
    key: "setFrequency",
    value: function setFrequency(freq) {
      var dispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Run only if it is a Donation Page with a Frequency
      if (!document.getElementsByName("transaction.recurrfreq").length) {
        return;
      } // Set dispatch to be checked by the SET method


      this._dispatch = dispatch; // Search for the current amount on radio boxes

      var found = Array.from(document.querySelectorAll('input[name="transaction.recurrfreq"]')).filter(function (el) {
        return el instanceof HTMLInputElement && el.value == freq.toUpperCase();
      }); // We found the amount on the radio boxes, so check it

      if (found.length) {
        var freqField = found[0];
        freqField.checked = true;
        this.frequency = freq.toLowerCase();

        if (this.frequency === 'onetime') {
          this.setRecurrency("N", dispatch);
        } else {
          this.setRecurrency("Y", dispatch);
        }
      } // Revert dispatch to default value (true)


      this._dispatch = true;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!DonationFrequency.instance) {
        DonationFrequency.instance = new DonationFrequency();
      }

      return DonationFrequency.instance;
    }
  }]);

  return DonationFrequency;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/events/processing-fees.js





var ProcessingFees = /*#__PURE__*/function () {
  function ProcessingFees() {
    var _this = this;

    classCallCheck_classCallCheck(this, ProcessingFees);

    this._onFeeChange = new dist/* SimpleEventDispatcher */.FK();
    this._amount = DonationAmount.getInstance();
    this._form = EnForm.getInstance();
    this._fee = 0;
    this._field = document.querySelector('input[name="supporter.processing_fees"]'); // console.log('%c Processing Fees Constructor', 'font-size: 30px; background-color: #000; color: #FF0');
    // Run only if it is a Donation Page with a Donation Amount field

    if (!document.getElementsByName("transaction.donationAmt").length) {
      return;
    } // Watch the Radios for Changes


    if (this._field instanceof HTMLInputElement) {
      // console.log('%c Processing Fees Start', 'font-size: 30px; background-color: #000; color: #FF0');
      this._field.addEventListener("change", function (e) {
        if (_this._field instanceof HTMLInputElement && _this._field.checked && !_this._subscribe) {
          _this._subscribe = _this._form.onSubmit.subscribe(function () {
            return _this.addFees();
          });
        }

        _this._onFeeChange.dispatch(_this.fee); // // console.log('%c Processing Fees Script Applied', 'font-size: 30px; background-color: #000; color: #FF0');

      });
    } // this._amount = amount;

  }

  createClass_createClass(ProcessingFees, [{
    key: "onFeeChange",
    get: function get() {
      return this._onFeeChange.asEvent();
    }
  }, {
    key: "fee",
    get: function get() {
      return this.calculateFees();
    } // Every time we set a frequency, trigger the onFrequencyChange event
    ,
    set: function set(value) {
      this._fee = value;

      this._onFeeChange.dispatch(this._fee);
    }
  }, {
    key: "calculateFees",
    value: function calculateFees() {
      if (this._field instanceof HTMLInputElement && this._field.checked && "dataset" in this._field) {
        var fees = Object.assign({
          processingfeepercentadded: "0",
          processingfeefixedamountadded: "0"
        }, this._field.dataset);
        var processing_fee = parseFloat(fees.processingfeepercentadded) / 100 * this._amount.amount + parseFloat(fees.processingfeefixedamountadded);
        return Math.round(processing_fee * 100) / 100;
      }

      return 0;
    } // Add Fees to Amount

  }, {
    key: "addFees",
    value: function addFees() {
      if (this._form.submit) {
        this._amount.setAmount(this._amount.amount + this.fee, false);
      }
    } // Remove Fees From Amount

  }, {
    key: "removeFees",
    value: function removeFees() {
      this._amount.setAmount(this._amount.amount - this.fee);
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!ProcessingFees.instance) {
        ProcessingFees.instance = new ProcessingFees();
      }

      return ProcessingFees.instance;
    }
  }]);

  return ProcessingFees;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/events/index.js




;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/app.js






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var App = /*#__PURE__*/function (_ENGrid) {
  _inherits(App, _ENGrid);

  var _super = _createSuper(App);

  function App(options) {
    var _this;

    classCallCheck_classCallCheck(this, App);

    _this = _super.call(this); // Events

    _this._form = EnForm.getInstance();
    _this._fees = ProcessingFees.getInstance();
    _this._amount = DonationAmount.getInstance("transaction.donationAmt", "transaction.donationAmt.other");
    _this._frequency = DonationFrequency.getInstance();

    _this.shouldScroll = function () {
      // If you find a error, scroll
      if (document.querySelector('.en__errorHeader')) {
        return true;
      } // Try to match the iframe referrer URL by testing valid EN Page URLs


      var referrer = document.referrer;
      var enURLPattern = new RegExp(/^(.*)\/(page)\/(\d+.*)/); // Scroll if the Regex matches, don't scroll otherwise

      return enURLPattern.test(referrer);
    };

    _this.options = Object.assign(Object.assign({}, OptionsDefaults), options); // Add Options to window

    window.EngridOptions = _this.options; // Document Load

    if (document.readyState !== "loading") {
      _this.run();
    } else {
      document.addEventListener("DOMContentLoaded", function () {
        _this.run();
      });
    } // Window Load


    window.onload = function () {
      _this.onLoad();
    }; // Window Resize


    window.onresize = function () {
      _this.onResize();
    };

    return _this;
  }

  createClass_createClass(App, [{
    key: "run",
    value: function run() {
      var _this2 = this;

      // Enable debug if available is the first thing
      if (this.options.Debug || App.getUrlParameter('debug') == 'true') App.setBodyData('debug', ''); // IE Warning

      new IE(); // Page Background

      new PageBackground(); // TODO: Abstract everything to the App class so we can remove custom-methods

      inputPlaceholder();
      watchInmemField();
      watchGiveBySelectField();
      SetEnFieldOtherAmountRadioStepValue();
      simpleUnsubscribe();
      contactDetailLabels();
      easyEdit();
      enInput.init();
      new ShowHideRadioCheckboxes("transaction.giveBySelect", "giveBySelect-");
      new ShowHideRadioCheckboxes("transaction.inmem", "inmem-");
      new ShowHideRadioCheckboxes("transaction.recurrpay", "recurrpay-"); // Controls if the Theme has a the "Debug Bar"
      // legacy.debugBar();
      // Client onSubmit and onError functions

      this._form.onSubmit.subscribe(function () {
        return _this2.onSubmit();
      });

      this._form.onError.subscribe(function () {
        return _this2.onError();
      });

      this._form.onValidate.subscribe(function () {
        return _this2.onValidate();
      }); // Event Listener Examples


      this._amount.onAmountChange.subscribe(function (s) {
        return console.log("Live Amount: ".concat(s));
      });

      this._frequency.onFrequencyChange.subscribe(function (s) {
        return console.log("Live Frequency: ".concat(s));
      });

      this._form.onSubmit.subscribe(function (s) {
        return console.log('Submit: ', s);
      });

      this._form.onError.subscribe(function (s) {
        return console.log('Error:', s);
      });

      window.enOnSubmit = function () {
        _this2._form.dispatchSubmit();

        return _this2._form.submit;
      };

      window.enOnError = function () {
        _this2._form.dispatchError();
      };

      window.enOnValidate = function () {
        _this2._form.dispatchValidate();

        return _this2._form.validate;
      }; // iFrame Logic


      this.loadIFrame(); // Live Variables

      new LiveVariables(this.options); // Dynamically set Recurrency Frequency

      new setRecurrFreq(); // Upsell Lightbox

      new UpsellLightbox(); // On the end of the script, after all subscribers defined, let's load the current value

      this._amount.load();

      this._frequency.load(); // Simple Country Select


      new SimpleCountrySelect(); // Add Image Attribution

      if (this.options.MediaAttribution) new MediaAttribution(); // Apple Pay

      if (this.options.applePay) new ApplePay(); // Capitalize Fields

      if (this.options.CapitalizeFields) new CapitalizeFields(); // Click To Expand

      if (this.options.ClickToExpand) new ClickToExpand();
      if (this.options.SkipToMainContentLink) new SkipToMainContentLink();
      if (this.options.SrcDefer) new SrcDefer();
      if (this.options.NeverBounceAPI) new NeverBounce(this.options.NeverBounceAPI, this.options.NeverBounceDateField, this.options.NeverBounceStatusField);
      this.setDataAttributes();
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      if (this.options.onLoad) {
        this.options.onLoad();
      }

      if (this.inIframe()) {
        // Scroll to top of iFrame
        if (App.debug) console.log("iFrame Event - window.onload");
        sendIframeHeight();
        window.parent.postMessage({
          scroll: this.shouldScroll()
        }, "*"); // On click fire the resize event

        document.addEventListener("click", function (e) {
          if (App.debug) console.log("iFrame Event - click");
          setTimeout(function () {
            sendIframeHeight();
          }, 100);
        });
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      if (this.options.onResize) {
        this.options.onResize();
      }

      if (this.inIframe()) {
        if (App.debug) console.log("iFrame Event - window.onload");
        sendIframeHeight();
      }
    }
  }, {
    key: "onValidate",
    value: function onValidate() {
      if (this.options.onValidate) {
        if (App.debug) console.log("Client onValidate Triggered");
        this.options.onValidate();
      }
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      if (this.options.onSubmit) {
        if (App.debug) console.log("Client onSubmit Triggered");
        this.options.onSubmit();
      }

      if (this.inIframe()) {
        sendIframeFormStatus('submit');
      }
    }
  }, {
    key: "onError",
    value: function onError() {
      if (this.options.onError) {
        if (App.debug) console.log("Client onError Triggered");
        this.options.onError();
      }
    }
  }, {
    key: "inIframe",
    value: function inIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }
  }, {
    key: "loadIFrame",
    value: function loadIFrame() {
      if (this.inIframe()) {
        // Add the data-engrid-embedded attribute when inside an iFrame if it wasn't already added by a script in the Page Template
        App.setBodyData("embedded", ""); // Fire the resize event

        if (App.debug) console.log("iFrame Event - First Resize");
        sendIframeHeight();
      }
    } // Use this function to add any Data Attributes to the Body tag

  }, {
    key: "setDataAttributes",
    value: function setDataAttributes() {
      // Add a body banner data attribute if it's empty
      if (!document.querySelector('.body-banner img')) {
        App.setBodyData('body-banner', 'empty');
      }
    }
  }]);

  return App;
}(engrid_ENGrid);
// EXTERNAL MODULE: ../engrid-scripts/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(256);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/apple-pay.js




var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



/*global window */

var ApplePaySession = window.ApplePaySession;
var merchantIdentifier = window.merchantIdentifier;
var merchantDomainName = window.merchantDomainName;
var merchantDisplayName = window.merchantDisplayName;
var merchantSessionIdentifier = window.merchantSessionIdentifier;
var merchantNonce = window.merchantNonce;
var merchantEpochTimestamp = window.merchantEpochTimestamp;
var merchantSignature = window.merchantSignature;
var merchantCountryCode = window.merchantCountryCode;
var merchantCurrencyCode = window.merchantCurrencyCode;
var merchantSupportedNetworks = window.merchantSupportedNetworks;
var merchantCapabilities = window.merchantCapabilities;
var merchantTotalLabel = window.merchantTotalLabel;
var ApplePay = /*#__PURE__*/function () {
  function ApplePay() {
    classCallCheck_classCallCheck(this, ApplePay);

    this.applePay = document.querySelector('.en__field__input.en__field__input--radio[value="applepay"]');
    this._amount = DonationAmount.getInstance();
    this._form = EnForm.getInstance();
    this.checkApplePay();
  }

  createClass_createClass(ApplePay, [{
    key: "checkApplePay",
    value: function checkApplePay() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this = this;

        var pageform, promise, applePayEnabled, applePayWrapper;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pageform = document.querySelector("form.en__component--page");

                if (!(!this.applePay || !window.hasOwnProperty('ApplePaySession'))) {
                  _context.next = 4;
                  break;
                }

                if (engrid_ENGrid.debug) console.log('Apple Pay DISABLED');
                return _context.abrupt("return", false);

              case 4:
                promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
                applePayEnabled = false;
                _context.next = 8;
                return promise.then(function (canMakePayments) {
                  applePayEnabled = canMakePayments;

                  if (canMakePayments) {
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    input.setAttribute("name", "PkPaymentToken");
                    input.setAttribute("id", "applePayToken");
                    pageform.appendChild(input);

                    _this._form.onSubmit.subscribe(function () {
                      return _this.onPayClicked();
                    });
                  }
                });

              case 8:
                if (engrid_ENGrid.debug) console.log('applePayEnabled', applePayEnabled);
                applePayWrapper = this.applePay.closest('.en__field__item');

                if (applePayEnabled) {
                  // Set Apple Pay Class
                  applePayWrapper === null || applePayWrapper === void 0 ? void 0 : applePayWrapper.classList.add('applePayWrapper');
                } else {
                  // Hide Apple Pay Wrapper
                  if (applePayWrapper) applePayWrapper.style.display = 'none';
                }

                return _context.abrupt("return", applePayEnabled);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "performValidation",
    value: function performValidation(url) {
      return new Promise(function (resolve, reject) {
        var merchantSession = {};
        merchantSession.merchantIdentifier = merchantIdentifier;
        merchantSession.merchantSessionIdentifier = merchantSessionIdentifier;
        merchantSession.nonce = merchantNonce;
        merchantSession.domainName = merchantDomainName;
        merchantSession.epochTimestamp = merchantEpochTimestamp;
        merchantSession.signature = merchantSignature;
        var validationData = "&merchantIdentifier=" + merchantIdentifier + "&merchantDomain=" + merchantDomainName + "&displayName=" + merchantDisplayName;
        var validationUrl = '/ea-dataservice/rest/applepay/validateurl?url=' + url + validationData;
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
          var data = JSON.parse(this.responseText);
          if (engrid_ENGrid.debug) console.log('Apple Pay Validation', data);
          resolve(data);
        };

        xhr.onerror = reject;
        xhr.open('GET', validationUrl);
        xhr.send();
      });
    }
  }, {
    key: "log",
    value: function log(name, msg) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/ea-dataservice/rest/applepay/log?name=' + name + '&msg=' + msg);
      xhr.send();
    }
  }, {
    key: "sendPaymentToken",
    value: function sendPaymentToken(token) {
      return new Promise(function (resolve, reject) {
        resolve(true);
      });
    }
  }, {
    key: "onPayClicked",
    value: function onPayClicked() {
      var enFieldPaymentType = document.querySelector("#en__field_transaction_paymenttype");
      var applePayToken = document.getElementById("applePayToken");
      var formClass = this._form; // Only work if Payment Type is Apple Pay

      if (enFieldPaymentType.value == 'applepay' && applePayToken.value == '') {
        try {
          var donationAmount = this._amount.amount;
          var request = {
            supportedNetworks: merchantSupportedNetworks,
            merchantCapabilities: merchantCapabilities,
            countryCode: merchantCountryCode,
            currencyCode: merchantCurrencyCode,
            total: {
              label: merchantTotalLabel,
              amount: donationAmount
            }
          };
          var session = new ApplePaySession(1, request);
          var thisClass = this;

          session.onvalidatemerchant = function (event) {
            thisClass.performValidation(event.validationURL).then(function (merchantSession) {
              if (engrid_ENGrid.debug) console.log('Apple Pay merchantSession', merchantSession);
              session.completeMerchantValidation(merchantSession);
            });
          };

          session.onpaymentauthorized = function (event) {
            thisClass.sendPaymentToken(event.payment.token).then(function (success) {
              if (engrid_ENGrid.debug) console.log('Apple Pay Token', event.payment.token);
              document.getElementById("applePayToken").value = JSON.stringify(event.payment.token);
              formClass.submitForm();
            });
          };

          session.oncancel = function (event) {
            if (engrid_ENGrid.debug) console.log('Cancelled', event);
            alert("You cancelled. Sorry it didn't work out.");
            formClass.dispatchError();
          };

          session.begin();
          this._form.submit = false;
          return false;
        } catch (e) {
          alert("Developer mistake: '" + e.message + "'");
          formClass.dispatchError();
        }
      }

      this._form.submit = true;
      return true;
    }
  }]);

  return ApplePay;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/capitalize-fields.js




var CapitalizeFields = /*#__PURE__*/function () {
  function CapitalizeFields() {
    var _this = this;

    classCallCheck_classCallCheck(this, CapitalizeFields);

    this._form = EnForm.getInstance();

    this._form.onSubmit.subscribe(function () {
      return _this.capitalizeFields('en__field_supporter_firstName', 'en__field_supporter_lastName', 'en__field_supporter_address1', 'en__field_supporter_city');
    });
  }

  createClass_createClass(CapitalizeFields, [{
    key: "capitalizeFields",
    value: function capitalizeFields() {
      var _this2 = this;

      for (var _len = arguments.length, fields = new Array(_len), _key = 0; _key < _len; _key++) {
        fields[_key] = arguments[_key];
      }

      fields.forEach(function (f) {
        return _this2.capitalize(f);
      });
    }
  }, {
    key: "capitalize",
    value: function capitalize(f) {
      var field = document.getElementById(f);

      if (field) {
        field.value = field.value.replace(/\w\S*/g, function (w) {
          return w.replace(/^\w/, function (c) {
            return c.toUpperCase();
          });
        });
        if (engrid_ENGrid.debug) console.log('Capitalized', field.value);
      }

      return true;
    }
  }]);

  return CapitalizeFields;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/click-to-expand.js

// Depends on engrid-click-to-expand.scss to work
 // Works when the user has adds ".click-to-expand" as a class to any field

var ClickToExpand = function ClickToExpand() {
  classCallCheck_classCallCheck(this, ClickToExpand);

  this.clickToExpandWrapper = document.querySelectorAll('div.click-to-expand');

  if (this.clickToExpandWrapper.length) {
    this.clickToExpandWrapper.forEach(function (element) {
      var content = element.innerHTML;
      var wrapper_html = '<div class="click-to-expand-cta"></div><div class="click-to-expand-text-wrapper" tabindex="0">' + content + '</div>';
      element.innerHTML = wrapper_html;
      element.addEventListener("click", function (event) {
        if (event) {
          if (engrid_ENGrid.debug) console.log("A click-to-expand div was clicked");
          element.classList.add("expanded");
        }
      });
      element.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
          if (engrid_ENGrid.debug) console.log("A click-to-expand div had the 'Enter' key pressed on it");
          element.classList.add("expanded");
        } else if (event.key === ' ') {
          if (engrid_ENGrid.debug) console.log("A click-to-expand div had the 'Spacebar' key pressed on it");
          element.classList.add("expanded");
          event.preventDefault(); // Prevents the page from scrolling

          event.stopPropagation(); // Prevent a console error generated by LastPass https://github.com/KillerCodeMonkey/ngx-quill/issues/351#issuecomment-476017960
        }
      });
    });
  }
};
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/custom-methods.js

var body = document.body;
var enGrid = document.getElementById("engrid");
var enInput = function () {
  /* @TODO */

  /************************************
   * Globablly Scoped Constants and Variables
   ***********************************/
  // @TODO Needs to be expanded to bind other EN elements (checkbox, radio) and compound elements (split-text, split-select, select with other input, etc...)
  // @TODO A "Not" condition is needed for #en__field_transaction_email because someone could name their email opt in "Email" and it will get the .en_field--email class generated for it
  // get DOM elements
  var init = function init() {
    var formInput = document.querySelectorAll(".en__field--text, .en__field--email:not(.en__field--checkbox), .en__field--telephone, .en__field--number, .en__field--textarea, .en__field--select, .en__field--checkbox");
    var otherInputs = document.querySelectorAll(".en__field__input--other");
    Array.from(formInput).forEach(function (e) {
      // @TODO Currently checkboxes always return as having a value, since they do but they're just not checked. Need to update and account for that, should also do Radio's while we're at it
      var element = e.querySelector("input, textarea, select");

      if (element && element.value) {
        e.classList.add("has-value");
      }

      bindEvents(e);
    });
    /* @TODO Review Engaging Networks to see if this is still needed */

    /************************************
     * Automatically select other radio input when an amount is entered into it.
     ***********************************/

    Array.from(otherInputs).forEach(function (e) {
      ["focus", "input"].forEach(function (evt) {
        e.addEventListener(evt, function (ev) {
          var target = ev.target;

          if (target && target.parentNode && target.parentNode.parentNode) {
            var targetWrapper = target.parentNode;
            targetWrapper.classList.remove("en__field__item--hidden");

            if (targetWrapper.parentNode) {
              var lastRadioInput = targetWrapper.parentNode.querySelector(".en__field__item:nth-last-child(2) input");
              lastRadioInput.checked = !0;
            }
          }
        }, false);
      });
    });
  };

  return {
    init: init
  };
}();
var bindEvents = function bindEvents(e) {
  /* @TODO */

  /************************************
   * INPUT, TEXTAREA, AND SELECT ACTIVITY CLASSES (FOCUS AND BLUR)
   * NOTE: STILL NEEDS WORK TO FUNCTION ON "SPLIT" CUSTOM EN FIELDS
   * REF: https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
   ***********************************/
  // Occurs when an input field gets focus
  var handleFocus = function handleFocus(e) {
    var target = e.target;

    if (target && target.parentNode && target.parentNode.parentNode) {
      var targetWrapper = target.parentNode.parentNode;
      targetWrapper.classList.add("has-focus");
    }
  }; // Occurs when a user leaves an input field


  var handleBlur = function handleBlur(e) {
    var target = e.target;

    if (target && target.parentNode && target.parentNode.parentNode) {
      var targetWrapper = target.parentNode.parentNode;
      targetWrapper.classList.remove("has-focus");

      if (target.value) {
        targetWrapper.classList.add("has-value");
      } else {
        targetWrapper.classList.remove("has-value");
      }
    }
  }; // Occurs when a user changes the selected option of a <select> element


  var handleChange = function handleChange(e) {
    var target = e.target;

    if (target && target.parentNode && target.parentNode.parentNode) {
      var targetWrapper = target.parentNode.parentNode;
      targetWrapper.classList.add("has-value");
    }
  }; // Occurs when a text or textarea element gets user input


  var handleInput = function handleInput(e) {
    var target = e.target;

    if (target && target.parentNode && target.parentNode.parentNode) {
      var targetWrapper = target.parentNode.parentNode;
      targetWrapper.classList.add("has-value");
    }
  }; // Occurs when the web browser autofills a form fields
  // REF: engrid-autofill.scss
  // REF: https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7


  var onAutoFillStart = function onAutoFillStart(e) {
    e.parentNode.parentNode.classList.add("is-autofilled", "has-value");
  };

  var onAutoFillCancel = function onAutoFillCancel(e) {
    return e.parentNode.parentNode.classList.remove("is-autofilled", "has-value");
  };

  var onAnimationStart = function onAnimationStart(e) {
    var target = e.target;
    var animation = e.animationName;

    switch (animation) {
      case "onAutoFillStart":
        return onAutoFillStart(target);

      case "onAutoFillCancel":
        return onAutoFillCancel(target);
    }
  };

  var enField = e.querySelector("input, textarea, select");

  if (enField) {
    enField.addEventListener("focus", handleFocus);
    enField.addEventListener("blur", handleBlur);
    enField.addEventListener("change", handleChange);
    enField.addEventListener("input", handleInput);
    enField.addEventListener("animationstart", onAnimationStart);
  }
};
var removeClassesByPrefix = function removeClassesByPrefix(el, prefix) {
  for (var i = el.classList.length - 1; i >= 0; i--) {
    if (el.classList[i].startsWith(prefix)) {
      el.classList.remove(el.classList[i]);
    }
  }
};
var debugBar = function debugBar() {
  if (window.location.href.indexOf("debug") != -1 || location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    body.classList.add("debug");

    if (enGrid) {
      enGrid.insertAdjacentHTML("beforebegin", '<span id="debug-bar">' + '<span id="info-wrapper">' + "<span>DEBUG BAR</span>" + "</span>" + '<span id="buttons-wrapper">' + '<span id="debug-close">X</span>' + "</span>" + "</span>");
    }

    if (window.location.search.indexOf("mode=DEMO") > -1) {
      var infoWrapper = document.getElementById("info-wrapper");
      var buttonsWrapper = document.getElementById("buttons-wrapper");

      if (infoWrapper) {
        // console.log(window.performance);
        var now = new Date().getTime();
        var initialPageLoad = (now - performance.timing.navigationStart) / 1000;
        var domInteractive = initialPageLoad + (now - performance.timing.domInteractive) / 1000;
        infoWrapper.insertAdjacentHTML("beforeend", "<span>Initial Load: " + initialPageLoad + "s</span>" + "<span>DOM Interactive: " + domInteractive + "s</span>");

        if (buttonsWrapper) {
          buttonsWrapper.insertAdjacentHTML("afterbegin", '<button id="layout-toggle" type="button">Layout Toggle</button>' + '<button id="page-edit" type="button">Edit in PageBuilder (BETA)</button>');
        }
      }
    }

    if (window.location.href.indexOf("debug") != -1 || location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      var _buttonsWrapper = document.getElementById("buttons-wrapper");

      if (_buttonsWrapper) {
        _buttonsWrapper.insertAdjacentHTML("afterbegin", '<button id="layout-toggle" type="button">Layout Toggle</button>' + '<button id="fancy-errors-toggle" type="button">Toggle Fancy Errors</button>');
      }
    }

    if (document.getElementById("fancy-errors-toggle")) {
      var debugTemplateButton = document.getElementById("fancy-errors-toggle");

      if (debugTemplateButton) {
        debugTemplateButton.addEventListener("click", function () {
          fancyErrorsToggle();
        }, false);
      }
    }

    if (document.getElementById("layout-toggle")) {
      var _debugTemplateButton = document.getElementById("layout-toggle");

      if (_debugTemplateButton) {
        _debugTemplateButton.addEventListener("click", function () {
          layoutToggle();
        }, false);
      }
    }

    if (document.getElementById("page-edit")) {
      var _debugTemplateButton2 = document.getElementById("page-edit");

      if (_debugTemplateButton2) {
        _debugTemplateButton2.addEventListener("click", function () {
          pageEdit();
        }, false);
      }
    }

    if (document.getElementById("debug-close")) {
      var _debugTemplateButton3 = document.getElementById("debug-close");

      if (_debugTemplateButton3) {
        _debugTemplateButton3.addEventListener("click", function () {
          debugClose();
        }, false);
      }
    }

    var fancyErrorsToggle = function fancyErrorsToggle() {
      if (enGrid) {
        enGrid.classList.toggle("fancy-errors");
      }
    };

    var pageEdit = function pageEdit() {
      window.location.href = window.location.href + "?edit";
    };

    var layoutToggle = function layoutToggle() {
      if (enGrid) {
        if (enGrid.classList.contains("layout-centercenter1col")) {
          removeClassesByPrefix(enGrid, "layout-");
          enGrid.classList.add("layout-centercenter1col-wide");
        } else if (enGrid.classList.contains("layout-centercenter1col-wide")) {
          removeClassesByPrefix(enGrid, "layout-");
          enGrid.classList.add("layout-centerright1col");
        } else if (enGrid.classList.contains("layout-centerright1col")) {
          removeClassesByPrefix(enGrid, "layout-");
          enGrid.classList.add("layout-centerleft1col");
        } else if (enGrid.classList.contains("layout-centerleft1col")) {
          removeClassesByPrefix(enGrid, "layout-");
          enGrid.classList.add("layout-embedded");
        } else if (enGrid.classList.contains("layout-embedded")) {
          removeClassesByPrefix(enGrid, "layout-");
          enGrid.classList.add("layout-centercenter1col");
        } else {
          console.log("While trying to switch layouts, something unexpected happen.");
        }
      }
    };

    var debugClose = function debugClose() {
      body.classList.remove("debug");
      var debugBar = document.getElementById("debug-bar");

      if (debugBar) {
        debugBar.style.display = "none";
      }
    };
  }
};
var inputPlaceholder = function inputPlaceholder() {
  // FIND ALL COMMON INPUT FIELDS
  var enFieldDonationAmt = document.querySelector(".en__field--donationAmt.en__field--withOther .en__field__input--other");
  var enFieldFirstName = document.querySelector("input#en__field_supporter_firstName");
  var enFieldLastName = document.querySelector("input#en__field_supporter_lastName");
  var enFieldEmailAddress = document.querySelector("input#en__field_supporter_emailAddress");
  var enFieldPhoneNumber = document.querySelector("#inputen__field_supporter_phoneNumber");
  var enFieldPhoneNumber2 = document.querySelector("input#en__field_supporter_phoneNumber2");
  var enFieldCountry = document.querySelector("input#en__field_supporter_country");
  var enFieldAddress1 = document.querySelector("input#en__field_supporter_address1");
  var enFieldAddress2 = document.querySelector("input#en__field_supporter_address2");
  var enFieldCity = document.querySelector("input#en__field_supporter_city"); // let enFieldRegion = document.querySelector("input#en__field_supporter_region") as HTMLInputElement

  var enFieldPostcode = document.querySelector("input#en__field_supporter_postcode");
  var enFieldHonname = document.querySelector("input#en__field_transaction_honname");
  var enFieldInfname = document.querySelector("input#en__field_transaction_infname");
  var enFieldInfemail = document.querySelector("input#en__field_transaction_infemail");
  var enFieldInfcountry = document.querySelector("input#en__field_transaction_infcountry");
  var enFieldInfadd1 = document.querySelector("input#en__field_transaction_infadd1");
  var enFieldInfadd2 = document.querySelector("input#en__field_transaction_infadd2");
  var enFieldInfcity = document.querySelector("input#en__field_transaction_infcity");
  var enFieldInfpostcd = document.querySelector("input#en__field_transaction_infpostcd");
  var enFieldGftrsn = document.querySelector("input#en__field_transaction_gftrsn");
  var enFieldCcnumber = document.querySelector("input#en__field_transaction_ccnumber");
  var enFieldCcexpire = document.querySelector("input#en__field_transaction_ccexpire");
  var enFieldCcvv = document.querySelector("input#en__field_transaction_ccvv");
  var enFieldBankAccountNumber = document.querySelector("input#en__field_supporter_bankAccountNumber");
  var enFieldBankRoutingNumber = document.querySelector("input#en__field_supporter_bankRoutingNumber"); // CHANGE FIELD INPUT TYPES

  if (enFieldDonationAmt) {
    enFieldDonationAmt.setAttribute("inputmode", "numeric");
  } // ADD FIELD PLACEHOLDERS


  var enAddInputPlaceholder = document.querySelector("[data-engrid-add-input-placeholders]");

  if (enAddInputPlaceholder && enFieldDonationAmt) {
    enFieldDonationAmt.placeholder = "Other Amount";
  }

  if (enAddInputPlaceholder && enFieldFirstName) {
    enFieldFirstName.placeholder = "First Name";
  }

  if (enAddInputPlaceholder && enFieldLastName) {
    enFieldLastName.placeholder = "Last Name";
  }

  if (enAddInputPlaceholder && enFieldEmailAddress) {
    enFieldEmailAddress.placeholder = "Email Address";
  }

  if (enAddInputPlaceholder && enFieldPhoneNumber) {
    enFieldPhoneNumber.placeholder = "Phone Number";
  }

  if (enAddInputPlaceholder && enFieldPhoneNumber2) {
    enFieldPhoneNumber2.placeholder = "000-000-0000 (Optional)";
  }

  if (enAddInputPlaceholder && enFieldCountry) {
    enFieldCountry.placeholder = "Country";
  }

  if (enAddInputPlaceholder && enFieldAddress1) {
    enFieldAddress1.placeholder = "Street Address";
  }

  if (enAddInputPlaceholder && enFieldAddress2) {
    enFieldAddress2.placeholder = "Apt., ste., bldg.";
  }

  if (enAddInputPlaceholder && enFieldCity) {
    enFieldCity.placeholder = "City";
  } // if (enAddInputPlaceholder && enFieldRegion){enFieldRegion.placeholder = "TBD";}


  if (enAddInputPlaceholder && enFieldPostcode) {
    enFieldPostcode.placeholder = "Postal Code";
  }

  if (enAddInputPlaceholder && enFieldHonname) {
    enFieldHonname.placeholder = "Honoree Name";
  }

  if (enAddInputPlaceholder && enFieldInfname) {
    enFieldInfname.placeholder = "Recipient Name";
  }

  if (enAddInputPlaceholder && enFieldInfemail) {
    enFieldInfemail.placeholder = "Recipient Email Address";
  }

  if (enAddInputPlaceholder && enFieldInfcountry) {
    enFieldInfcountry.placeholder = "TBD";
  }

  if (enAddInputPlaceholder && enFieldInfadd1) {
    enFieldInfadd1.placeholder = "Recipient Street Address";
  }

  if (enAddInputPlaceholder && enFieldInfadd2) {
    enFieldInfadd2.placeholder = "Recipient Apt., ste., bldg.";
  }

  if (enAddInputPlaceholder && enFieldInfcity) {
    enFieldInfcity.placeholder = "Recipient City";
  }

  if (enAddInputPlaceholder && enFieldInfpostcd) {
    enFieldInfpostcd.placeholder = "Recipient Postal Code";
  }

  if (enAddInputPlaceholder && enFieldGftrsn) {
    enFieldGftrsn.placeholder = "Reason for your gift";
  }

  if (enAddInputPlaceholder && enFieldCcnumber) {
    enFieldCcnumber.placeholder = "•••• •••• •••• ••••";
  }

  if (enAddInputPlaceholder && enFieldCcexpire) {
    enFieldCcexpire.placeholder = "MM / YY";
  }

  if (enAddInputPlaceholder && enFieldCcvv) {
    enFieldCcvv.placeholder = "CVV";
  }

  if (enAddInputPlaceholder && enFieldBankAccountNumber) {
    enFieldBankAccountNumber.placeholder = "Bank Account Number";
  }

  if (enAddInputPlaceholder && enFieldBankRoutingNumber) {
    enFieldBankRoutingNumber.placeholder = "Bank Routing Number";
  }
};
var watchInmemField = function watchInmemField() {
  var enFieldTransactionInmem = document.getElementById("en__field_transaction_inmem");

  var handleEnFieldTransactionInmemChange = function handleEnFieldTransactionInmemChange(e) {
    if (enGrid) {
      if (enFieldTransactionInmem.checked) {
        enGrid.classList.add("has-give-in-honor");
      } else {
        enGrid.classList.remove("has-give-in-honor");
      }
    }
  }; // Check Give In Honor State on Page Load


  if (enFieldTransactionInmem && enGrid) {
    // Run on page load
    if (enFieldTransactionInmem.checked) {
      enGrid.classList.add("has-give-in-honor");
    } else {
      enGrid.classList.remove("has-give-in-honor");
    } // Run on change


    enFieldTransactionInmem.addEventListener("change", handleEnFieldTransactionInmemChange);
  }
}; // @TODO Refactor (low priority)

var watchGiveBySelectField = function watchGiveBySelectField() {
  var enFieldGiveBySelect = document.querySelector(".en__field--giveBySelect");
  var transactionGiveBySelect = document.getElementsByName("transaction.giveBySelect");
  var enFieldPaymentType = document.querySelector("#en__field_transaction_paymenttype");
  var enFieldGiveBySelectCurrentValue = document.querySelector('input[name="transaction.giveBySelect"]:checked');
  var prefix = "has-give-by-";

  var handleEnFieldGiveBySelect = function handleEnFieldGiveBySelect(e) {
    enFieldGiveBySelectCurrentValue = document.querySelector('input[name="transaction.giveBySelect"]:checked');
    console.log("enFieldGiveBySelectCurrentValue:", enFieldGiveBySelectCurrentValue);

    if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "card") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-card");
      } // enFieldPaymentType.value = "card";


      handleCCUpdate();
    } else if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "ach") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-ach");
      }

      enFieldPaymentType.value = "ach";
      enFieldPaymentType.value = "ACH";
    } else if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "paypal") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-paypal");
      }

      enFieldPaymentType.value = "paypal";
    } else if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "applepay") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-applepay");
      }

      enFieldPaymentType.value = "applepay";
    }
  }; // Check Giving Frequency on page load


  if (enFieldGiveBySelect) {
    enFieldGiveBySelectCurrentValue = document.querySelector('input[name="transaction.giveBySelect"]:checked');

    if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "card") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-card");
      } // enFieldPaymentType.value = "card";


      handleCCUpdate();
    } else if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "ach") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-check");
      }

      enFieldPaymentType.value = "ach";
      enFieldPaymentType.value = "ACH";
    } else if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "paypal") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-paypal");
      }

      enFieldPaymentType.value = "paypal";
      enFieldPaymentType.value = "Paypal";
    } else if (enFieldGiveBySelectCurrentValue && enFieldGiveBySelectCurrentValue.value.toLowerCase() == "applepay") {
      if (enGrid) {
        removeClassesByPrefix(enGrid, prefix);
        enGrid.classList.add("has-give-by-applepay");
      }

      enFieldPaymentType.value = "applepay";
    }
  } // Watch each Giving Frequency radio input for a change


  if (transactionGiveBySelect) {
    Array.from(transactionGiveBySelect).forEach(function (e) {
      var element = e;
      element.addEventListener("change", handleEnFieldGiveBySelect);
    });
  }
};
/*
 * Input fields as reference variables
 */

var field_credit_card = document.getElementById("en__field_transaction_ccnumber");
var field_payment_type = document.getElementById("en__field_transaction_paymenttype");
var field_expiration_parts = document.querySelectorAll(".en__field--ccexpire .en__field__input--splitselect");
var field_country = document.getElementById("en__field_supporter_country");
var field_expiration_month = field_expiration_parts[0];
var field_expiration_year = field_expiration_parts[1];
/* The Donation Other Giving Amount is a "Number" type input field.
   It also has its step value set to .01 so it increments up/down by once whole cent.
   This step also client-side prevents users from entering a fraction of a penny.
   And it has a min set to 5 so nothing less can be submitted
*/

var SetEnFieldOtherAmountRadioStepValue = function SetEnFieldOtherAmountRadioStepValue() {
  var enFieldOtherAmountRadio = document.querySelector(".en__field--donationAmt .en__field__input--other");

  if (enFieldOtherAmountRadio) {
    enFieldOtherAmountRadio.setAttribute("step", ".01");
    enFieldOtherAmountRadio.setAttribute("type", "number");
    enFieldOtherAmountRadio.setAttribute("min", "5");
  }
};
/*
 * Helpers
 */
// current_month and current_year used by handleExpUpdate()

var d = new Date();
var current_month = d.getMonth() + 1; // month options in expiration dropdown are indexed from 1

var current_year = d.getFullYear() - 2000; // getCardType used by handleCCUpdate()

var getCardType = function getCardType(cc_partial) {
  var key_character = cc_partial.charAt(0);
  var prefix = "live-card-type-";
  var field_credit_card_classes = field_credit_card.className.split(" ").filter(function (c) {
    return !c.startsWith(prefix);
  });

  switch (key_character) {
    case "0":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-invalid");
      return false;

    case "1":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-invalid");
      return false;

    case "2":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-invalid");
      return false;

    case "3":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-amex");
      return "amex";

    case "4":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-visa");
      return "visa";

    case "5":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-mastercard");
      return "mastercard";

    case "6":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-discover");
      return "discover";

    case "7":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-invalid");
      return false;

    case "8":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-invalid");
      return false;

    case "9":
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-invalid");
      return false;

    default:
      field_credit_card.className = field_credit_card_classes.join(" ").trim();
      field_credit_card.classList.add("live-card-type-na");
      return false;
  }
};
/*
 * Handlers
 */


var handleCCUpdate = function handleCCUpdate() {
  var card_type = getCardType(field_credit_card.value);
  var card_values = {
    amex: ['amex', 'american express', 'americanexpress', 'amx', 'ax'],
    visa: ['visa', 'vi'],
    mastercard: ['mastercard', 'master card', 'mc'],
    discover: ['discover', 'di']
  };
  var payment_text = field_payment_type.options[field_payment_type.selectedIndex].text;

  if (card_type && payment_text != card_type) {
    field_payment_type.value = Array.from(field_payment_type.options).filter(function (d) {
      return card_values[card_type].includes(d.value.toLowerCase());
    })[0].value;
  }
};

var handleExpUpdate = function handleExpUpdate(e) {
  // handle if year is changed to current year (disable all months less than current month)
  // handle if month is changed to less than current month (disable current year)
  if (e == "month") {
    var selected_month = parseInt(field_expiration_month.value);
    var disable = selected_month < current_month;
    console.log("month disable", disable, _typeof(disable), selected_month, current_month);

    for (var i = 0; i < field_expiration_year.options.length; i++) {
      // disable or enable current year
      if (parseInt(field_expiration_year.options[i].value) <= current_year) {
        if (disable) {
          //@TODO Couldn't get working in TypeScript
          field_expiration_year.options[i].setAttribute("disabled", "disabled");
        } else {
          field_expiration_year.options[i].disabled = false;
        }
      }
    }
  } else if (e == "year") {
    var selected_year = parseInt(field_expiration_year.value);

    var _disable = selected_year == current_year;

    console.log("year disable", _disable, _typeof(_disable), selected_year, current_year);

    for (var _i = 0; _i < field_expiration_month.options.length; _i++) {
      // disable or enable all months less than current month
      if (parseInt(field_expiration_month.options[_i].value) < current_month) {
        if (_disable) {
          //@TODO Couldn't get working in TypeScript
          field_expiration_month.options[_i].setAttribute("disabled", "disabled");
        } else {
          field_expiration_month.options[_i].disabled = false;
        }
      }
    }
  }
};
/*
 * Event Listeners
 */


if (field_credit_card) {
  field_credit_card.addEventListener("keyup", function () {
    handleCCUpdate();
  });
  field_credit_card.addEventListener("paste", function () {
    handleCCUpdate();
  });
  field_credit_card.addEventListener("blur", function () {
    handleCCUpdate();
  });
}

if (field_expiration_month && field_expiration_year) {
  field_expiration_month.addEventListener("change", function () {
    handleExpUpdate("month");
  });
  field_expiration_year.addEventListener("change", function () {
    handleExpUpdate("year");
  });
} // EN Polyfill to support "label" clicking on Advocacy Recipient "labels"


var contactDetailLabels = function contactDetailLabels() {
  var contact = document.querySelectorAll(".en__contactDetails__rows"); // @TODO Needs refactoring. Has to be a better way to do this.

  var recipientChange = function recipientChange(e) {
    var recipientRow = e.target; // console.log("recipientChange: recipientRow: ", recipientRow);

    var recipientRowWrapper = recipientRow.parentNode; // console.log("recipientChange: recipientRowWrapper: ", recipientRowWrapper);

    var recipientRowsWrapper = recipientRowWrapper.parentNode; // console.log("recipientChange: recipientRowsWrapper: ", recipientRowsWrapper);

    var contactDetails = recipientRowsWrapper.parentNode; // console.log("recipientChange: contactDetails: ", contactDetails);

    var contactDetailsCheckbox = contactDetails.querySelector("input"); // console.log("recipientChange: contactDetailsCheckbox: ", contactDetailsCheckbox);

    if (contactDetailsCheckbox.checked) {
      contactDetailsCheckbox.checked = false;
    } else {
      contactDetailsCheckbox.checked = true;
    }
  };

  if (contact) {
    Array.from(contact).forEach(function (e) {
      var element = e;
      element.addEventListener("click", recipientChange);
    });
  }
}; // @TODO Adds a URL path "/edit" that can be used to easily arrive at the editable version of the current page. Should automatically detect if the client is using us.e-activist or e-activist and adjust accoridngly. Should also pass in page number and work for all page types without each needing to be specified.
// @TODO Remove hard coded client values

var easyEdit = function easyEdit() {
  var liveURL = window.location.href;
  var editURL = "";

  if (liveURL.search("edit") !== -1) {
    if (liveURL.includes("https://act.ran.org/page/")) {
      editURL = liveURL.replace("https://act.ran.org/page/", "https://us.e-activist.com/index.html#pages/");
      editURL = editURL.replace("/donate/1", "/edit");
      editURL = editURL.replace("/action/1", "/edit");
      editURL = editURL.replace("/data/1", "/edit");
      window.location.href = editURL;
    }
  }
}; // If you go to and Engaging Networks Unsubscribe page anonymously
// then the fields are in their default states. If you go to it via an email
// link that authenticates who you are, it then populates the fields with corresponding
// values from your account. This means to unsubscribe the user has to uncheck the
// newsletter checkbox(s) before submitting.

var simpleUnsubscribe = function simpleUnsubscribe() {
  // console.log("simpleUnsubscribe fired");
  // Check if we're on an Unsubscribe / Manage Subscriptions page
  if (window.location.href.indexOf("/subscriptions") != -1) {
    // console.log("On an subscription management page");
    // Check if any form elements on this page have the "forceUncheck" class
    var forceUncheck = document.querySelectorAll(".forceUncheck");

    if (forceUncheck) {
      // console.log("Found forceUnchecl dom elements", forceUncheck);
      // Step through each DOM element with forceUncheck looking for checkboxes
      Array.from(forceUncheck).forEach(function (e) {
        var element = e; // console.log("Checking this formComponent for checkboxes", element);
        // In the forceUncheck form component, find any checboxes

        var uncheckCheckbox = element.querySelectorAll("input[type='checkbox']");

        if (uncheckCheckbox) {
          // Step through each Checkbox in the forceUncheck form component
          Array.from(uncheckCheckbox).forEach(function (f) {
            var checkbox = f; // console.log("Unchecking this checkbox", checkbox);
            // Uncheck the checbox

            checkbox.checked = false;
          });
        }
      });
    }
  }
}; // Watch the Region Field for changes. If there is only one option, hide it.
// @TODO Should this be expanded where if a select only has one option it's always hidden?

var country_select = document.getElementById("en__field_supporter_country");
var region_select = document.getElementById("en__field_supporter_region");

if (country_select) {
  country_select.addEventListener("change", function () {
    setTimeout(function () {
      if (region_select.options.length == 1 && region_select.options[0].value == "other") {
        region_select.classList.add("hide");
      } else {
        region_select.classList.remove("hide");
      }
    }, 100);
  });
} // @TODO "Footer in Viewport Check" should be made its own TS file


var contentFooter = document.querySelector(".content-footer");

var isInViewport = function isInViewport(e) {
  var distance = e.getBoundingClientRect(); // console.log("Footer: ", distance);

  return distance.top >= 0 && distance.left >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth);
}; // Checks to see if the page is so short, the footer is above the fold. If the footer is above the folde we'll use this class to ensure at a minimum the page fills the full viewport height.


if (contentFooter && isInViewport(contentFooter)) {
  document.getElementsByTagName("BODY")[0].setAttribute("data-engrid-footer-above-fold", "");
} else {
  document.getElementsByTagName("BODY")[0].setAttribute("data-engrid-footer-below-fold", "");
}
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/cookie.js
/**
Example:
import * as cookie from "./cookie";

cookie.set('name', 'value');
cookie.get('name'); // => 'value'
cookie.remove('name');
cookie.set('name', 'value', { expires: 7 }); // 7 Days cookie
cookie.set('name', 'value', { expires: 7, path: '' }); // Set Path
cookie.remove('name', { path: '' });
 */
function stringifyAttribute(name, value) {
  if (!value) {
    return "";
  }

  var stringified = "; " + name;

  if (value === true) {
    return stringified; // boolean attributes shouldn't have a value
  }

  return stringified + "=" + value;
}

function stringifyAttributes(attributes) {
  if (typeof attributes.expires === "number") {
    var expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e5);
    attributes.expires = expires;
  }

  return stringifyAttribute("Expires", attributes.expires ? attributes.expires.toUTCString() : "") + stringifyAttribute("Domain", attributes.domain) + stringifyAttribute("Path", attributes.path) + stringifyAttribute("Secure", attributes.secure) + stringifyAttribute("SameSite", attributes.sameSite);
}

function encode(name, value, attributes) {
  return encodeURIComponent(name).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent) // allowed special characters
  .replace(/\(/g, "%28").replace(/\)/g, "%29") + // replace opening and closing parens
  "=" + encodeURIComponent(value) // allowed special characters
  .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent) + stringifyAttributes(attributes);
}
function parse(cookieString) {
  var result = {};
  var cookies = cookieString ? cookieString.split("; ") : [];
  var rdecode = /(%[\dA-F]{2})+/gi;

  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("=");
    var cookie = parts.slice(1).join("=");

    if (cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      var name = parts[0].replace(rdecode, decodeURIComponent);
      result[name] = cookie.replace(rdecode, decodeURIComponent);
    } catch (e) {// ignore cookies with invalid name/value encoding
    }
  }

  return result;
}
function getAll() {
  return parse(document.cookie);
}
function get(name) {
  return getAll()[name];
}
function set(name, value, attributes) {
  document.cookie = encode(name, value, Object.assign({
    path: "/"
  }, attributes));
}
function remove(name, attributes) {
  set(name, "", Object.assign(Object.assign({}, attributes), {
    expires: -1
  }));
}
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/ie.js



var IE = /*#__PURE__*/function () {
  function IE() {
    classCallCheck_classCallCheck(this, IE);

    this.debug = false;
    this.overlay = document.createElement("div");

    var isIE = function isIE() {
      return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1;
    }; // If it's not IE, get out!


    if (!isIE()) return;
    var markup = "\n    <div class=\"ieModal-container\">\n        <a href=\"#\" class=\"button-close\"></a>\n        <div id=\"ieModalContent\">\n        <strong>Attention: </strong>\n        Your browser is no longer supported and will not receive any further security updates. Websites may no longer display or behave correctly as they have in the past. \n        Please transition to using <a href=\"https://www.microsoft.com/edge\">Microsoft Edge</a>, Microsoft's latest browser, to continue enjoying the modern web.\n        </div>\n    </div>";
    var overlay = document.createElement("div");
    overlay.id = "ieModal";
    overlay.classList.add("is-hidden");
    overlay.innerHTML = markup;
    var closeButton = overlay.querySelector(".button-close");
    closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keyup", function (e) {
      if (e.key === "Escape") {
        closeButton.click();
      }
    });
    this.overlay = overlay;
    document.body.appendChild(overlay);
    this.open();
  }

  createClass_createClass(IE, [{
    key: "open",
    value: function open() {
      var hideModal = get("hide_ieModal"); // Get cookie
      // If we have a cookie AND no Debug, get out

      if (hideModal && !this.debug) return; // Show Modal

      this.overlay.classList.remove("is-hidden");
    }
  }, {
    key: "close",
    value: function close(e) {
      e.preventDefault();
      set("hide_ieModal", "1", {
        expires: 1
      }); // Create one day cookie

      this.overlay.classList.add("is-hidden");
    }
  }]);

  return IE;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/iframe.js

var sendIframeHeight = function sendIframeHeight() {
  var height = document.body.offsetHeight;
  console.log("Sending iFrame height of: ", height, "px"); // check the message is being sent correctly

  window.parent.postMessage({
    frameHeight: height,
    pageNumber: engrid_ENGrid.getPageNumber(),
    pageCount: engrid_ENGrid.getPageCount(),
    giftProcess: engrid_ENGrid.getGiftProcess()
  }, "*");
};
var sendIframeFormStatus = function sendIframeFormStatus(status) {
  window.parent.postMessage({
    status: status,
    pageNumber: engrid_ENGrid.getPageNumber(),
    pageCount: engrid_ENGrid.getPageCount(),
    giftProcess: engrid_ENGrid.getGiftProcess()
  }, "*");
};
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/media-attribution.js


/*
  Looks for specially crafted <img> links and will transform its markup to display an attribution overlay on top of the image
  Depends on "_engrid-media-attribution.scss" for styling
  
  Example Image Input
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mO8/5+BAQAGgwHgbKwW2QAAAABJRU5ErkJggg==" data-src="https://via.placeholder.com/300x300" data-attribution-source="© Jane Doe 1">
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mO8/5+BAQAGgwHgbKwW2QAAAABJRU5ErkJggg==" data-src="https://via.placeholder.com/300x300" data-attribution-source="© John Doe 2" data-attribution-source-link="https://www.google.com/">
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mO8/5+BAQAGgwHgbKwW2QAAAABJRU5ErkJggg==" data-src="https://via.placeholder.com/300x300" data-attribution-source="© Max Doe 3" data-attribution-source-link="https://www.google.com/" data-attribution-hide-overlay>

  Example Video Input (Doesn't currently visually display)
  @TODO Video tags are processed but their <figcaption> is not visually displayed. Need to update "_engrid-media-attribution.scss"
  <video poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAADUlEQVR42mO8/5+BAQAGgwHgbKwW2QAAAABJRU5ErkJggg==" data-attribution-source="© Jane Doe 1" data-attribution-source-link="https://www.google.com/"> <source data-src="https://player.vimeo.com/external/123456789.hd.mp4?s=987654321&amp;profile_id=123" type="video/mp4"></video>

  Example Image Output
  <figure class="media-with-attribution"><img src="https://via.placeholder.com/300x300" data-src="https://via.placeholder.com/300x300" data-attribution-source="Jane Doe 1"><figattribution class="attribution-bottomright">Jane Doe 1</figattribution></figure>
*/

var MediaAttribution = function MediaAttribution() {
  classCallCheck_classCallCheck(this, MediaAttribution);

  // Find all images with attribution but not with the "data-attribution-hide-overlay" attribute
  this.mediaWithAttribution = document.querySelectorAll("img[data-attribution-source]:not([data-attribution-hide-overlay]), video[data-attribution-source]:not([data-attribution-hide-overlay])");
  this.mediaWithAttribution.forEach(function (element) {
    if (engrid_ENGrid.debug) console.log("The following image was found with data attribution fields on it. It's markup will be changed to add caption support.", element); // Creates the wapping <figure> element

    var figure = document.createElement('figure');
    figure.classList.add("media-with-attribution"); // Moves the <img> inside its <figure> element

    var mediaWithAttributionParent = element.parentNode;

    if (mediaWithAttributionParent) {
      mediaWithAttributionParent.insertBefore(figure, element);
      figure.appendChild(element);
      var mediaWithAttributionElement = element; // Append the <figcaption> element after the <img> and conditionally add the Source's Link to it

      var attributionSource = mediaWithAttributionElement.dataset.attributionSource;

      if (attributionSource) {
        var attributionSourceLink = mediaWithAttributionElement.dataset.attributionSourceLink;

        if (attributionSourceLink) {
          mediaWithAttributionElement.insertAdjacentHTML('afterend', '<figattribution><a href="' + decodeURIComponent(attributionSourceLink) + '" target="_blank" tabindex="-1">' + attributionSource + '</a></figure>');
        } else {
          mediaWithAttributionElement.insertAdjacentHTML('afterend', '<figattribution>' + attributionSource + '</figure>');
        }
      }
    }
  });
};
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/live-variables.js




var LiveVariables = /*#__PURE__*/function () {
  function LiveVariables(options) {
    var _this = this;

    classCallCheck_classCallCheck(this, LiveVariables);

    var _a;

    this._amount = DonationAmount.getInstance();
    this._fees = ProcessingFees.getInstance();
    this._frequency = DonationFrequency.getInstance();
    this._form = EnForm.getInstance();
    this.multiplier = 1 / 12;
    this.options = Object.assign(Object.assign({}, OptionsDefaults), options);
    this.submitLabel = ((_a = document.querySelector(".en__submit button")) === null || _a === void 0 ? void 0 : _a.innerHTML) || "Donate";

    this._amount.onAmountChange.subscribe(function () {
      return _this.changeSubmitButton();
    });

    this._amount.onAmountChange.subscribe(function () {
      return _this.changeLiveAmount();
    });

    this._amount.onAmountChange.subscribe(function () {
      return _this.changeLiveUpsellAmount();
    });

    this._fees.onFeeChange.subscribe(function () {
      return _this.changeLiveAmount();
    });

    this._fees.onFeeChange.subscribe(function () {
      return _this.changeLiveUpsellAmount();
    });

    this._fees.onFeeChange.subscribe(function () {
      return _this.changeSubmitButton();
    });

    this._frequency.onFrequencyChange.subscribe(function () {
      return _this.swapAmounts();
    });

    this._frequency.onFrequencyChange.subscribe(function () {
      return _this.changeLiveFrequency();
    });

    this._frequency.onFrequencyChange.subscribe(function () {
      return _this.changeRecurrency();
    });

    this._frequency.onFrequencyChange.subscribe(function () {
      return _this.changeSubmitButton();
    });

    this._form.onSubmit.subscribe(function () {
      return _this.loadingSubmitButton();
    });

    this._form.onError.subscribe(function () {
      return _this.changeSubmitButton();
    }); // Watch the monthly-upsell links


    document.addEventListener("click", function (e) {
      var element = e.target;

      if (element) {
        if (element.classList.contains("monthly-upsell")) {
          _this.upsold(e);
        } else if (element.classList.contains("form-submit")) {
          e.preventDefault();

          _this._form.submitForm();
        }
      }
    });
  }

  createClass_createClass(LiveVariables, [{
    key: "getAmountTxt",
    value: function getAmountTxt() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var _a, _b;

      var symbol = (_a = this.options.CurrencySymbol) !== null && _a !== void 0 ? _a : '$';
      var separator = (_b = this.options.CurrencySeparator) !== null && _b !== void 0 ? _b : '.';
      var amountTxt = Number.isInteger(amount) ? symbol + amount : symbol + amount.toFixed(2).replace('.', separator);
      return amount > 0 ? amountTxt : "";
    }
  }, {
    key: "getUpsellAmountTxt",
    value: function getUpsellAmountTxt() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var amountTxt = this.options.CurrencySymbol + Math.ceil(amount / 5) * 5;
      return amount > 0 ? amountTxt : "";
    }
  }, {
    key: "getUpsellAmountRaw",
    value: function getUpsellAmountRaw() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var amountRaw = Math.ceil(amount / 5) * 5;
      return amount > 0 ? amountRaw.toString() : "";
    }
  }, {
    key: "changeSubmitButton",
    value: function changeSubmitButton() {
      var submit = document.querySelector(".en__submit button");
      var amount = this.getAmountTxt(this._amount.amount + this._fees.fee);
      var frequency = this._frequency.frequency == "onetime" ? "" : this._frequency.frequency == "annual" ? "annually" : this._frequency.frequency;
      var label = this.submitLabel;

      if (amount) {
        label = label.replace("$AMOUNT", amount);
        label = label.replace("$FREQUENCY", frequency);
      } else {
        label = label.replace("$AMOUNT", '');
        label = label.replace("$FREQUENCY", '');
      }

      if (submit && label) {
        submit.innerHTML = label;
      }
    }
  }, {
    key: "loadingSubmitButton",
    value: function loadingSubmitButton() {
      var submit = document.querySelector(".en__submit button");
      var submitButtonOriginalHTML = submit.innerHTML;
      var submitButtonProcessingHTML = "<span class='loader-wrapper'><span class='loader loader-quart'></span><span class='submit-button-text-wrapper'>" + submitButtonOriginalHTML + "</span></span>";
      submitButtonOriginalHTML = submit.innerHTML;
      submit.innerHTML = submitButtonProcessingHTML;
      return true;
    }
  }, {
    key: "changeLiveAmount",
    value: function changeLiveAmount() {
      var _this2 = this;

      var value = this._amount.amount + this._fees.fee;
      var live_amount = document.querySelectorAll(".live-giving-amount");
      live_amount.forEach(function (elem) {
        return elem.innerHTML = _this2.getAmountTxt(value);
      });
    }
  }, {
    key: "changeLiveUpsellAmount",
    value: function changeLiveUpsellAmount() {
      var _this3 = this;

      var value = (this._amount.amount + this._fees.fee) * this.multiplier;
      var live_upsell_amount = document.querySelectorAll(".live-giving-upsell-amount");
      live_upsell_amount.forEach(function (elem) {
        return elem.innerHTML = _this3.getUpsellAmountTxt(value);
      });
      var live_upsell_amount_raw = document.querySelectorAll(".live-giving-upsell-amount-raw");
      live_upsell_amount_raw.forEach(function (elem) {
        return elem.innerHTML = _this3.getUpsellAmountRaw(value);
      });
    }
  }, {
    key: "changeLiveFrequency",
    value: function changeLiveFrequency() {
      var _this4 = this;

      var live_frequency = document.querySelectorAll(".live-giving-frequency");
      live_frequency.forEach(function (elem) {
        return elem.innerHTML = _this4._frequency.frequency == "onetime" ? "" : _this4._frequency.frequency;
      });
    }
  }, {
    key: "changeRecurrency",
    value: function changeRecurrency() {
      var recurrpay = document.querySelector("[name='transaction.recurrpay']");

      if (recurrpay && recurrpay.type != 'radio') {
        recurrpay.value = this._frequency.frequency == 'onetime' ? 'N' : 'Y';
        this._frequency.recurring = recurrpay.value;
        if (engrid_ENGrid.getOption('Debug')) console.log('Recurpay Changed!');
      }
    }
  }, {
    key: "swapAmounts",
    value: function swapAmounts() {
      if ("EngridAmounts" in window && this._frequency.frequency in window.EngridAmounts) {
        var loadEnAmounts = function loadEnAmounts(amountArray) {
          var ret = [];

          for (var amount in amountArray.amounts) {
            ret.push({
              selected: amountArray.amounts[amount] === amountArray["default"],
              label: amount,
              value: amountArray.amounts[amount].toString()
            });
          }

          return ret;
        };

        window.EngagingNetworks.require._defined.enjs.swapList("donationAmt", loadEnAmounts(window.EngridAmounts[this._frequency.frequency]), {
          ignoreCurrentValue: !window.EngagingNetworks.require._defined.enjs.checkSubmissionFailed()
        });

        this._amount.load();

        if (engrid_ENGrid.getOption('Debug')) console.log("Amounts Swapped To", window.EngridAmounts[this._frequency.frequency]);
      }
    } // Watch for a clicks on monthly-upsell link

  }, {
    key: "upsold",
    value: function upsold(e) {
      // Find and select monthly giving
      var enFieldRecurrpay = document.querySelector(".en__field--recurrpay input[value='Y']");

      if (enFieldRecurrpay) {
        enFieldRecurrpay.checked = true;
      } // Find the hidden radio select that needs to be selected when entering an "Other" amount


      var enFieldOtherAmountRadio = document.querySelector(".en__field--donationAmt input[value='other']");

      if (enFieldOtherAmountRadio) {
        enFieldOtherAmountRadio.checked = true;
      } // Enter the other amount and remove the "en__field__item--hidden" class from the input's parent


      var enFieldOtherAmount = document.querySelector("input[name='transaction.donationAmt.other']");

      if (enFieldOtherAmount) {
        enFieldOtherAmount.value = this.getUpsellAmountRaw(this._amount.amount * this.multiplier);

        this._amount.load();

        this._frequency.load();

        if (enFieldOtherAmount.parentElement) {
          enFieldOtherAmount.parentElement.classList.remove("en__field__item--hidden");
        }
      }

      var target = e.target;

      if (target && target.classList.contains("form-submit")) {
        e.preventDefault(); // Form submit

        this._form.submitForm();
      }
    }
  }]);

  return LiveVariables;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/upsell-lightbox.js




var UpsellLightbox = /*#__PURE__*/function () {
  function UpsellLightbox() {
    var _this = this;

    classCallCheck_classCallCheck(this, UpsellLightbox);

    this.overlay = document.createElement("div");
    this._form = EnForm.getInstance();
    this._amount = DonationAmount.getInstance();
    this._frequency = DonationFrequency.getInstance();
    var options = "EngridUpsell" in window ? window.EngridUpsell : {};
    this.options = Object.assign(Object.assign({}, UpsellOptionsDefaults), options);

    if (!this.shouldRun()) {
      if (engrid_ENGrid.debug) console.log("Upsell script should NOT run"); // If we're not on a Donation Page, get out

      return;
    }

    this.overlay.id = "enModal";
    this.overlay.classList.add("is-hidden");
    this.overlay.classList.add("image-" + this.options.imagePosition);
    this.renderLightbox();

    this._form.onSubmit.subscribe(function () {
      return _this.open();
    });
  }

  createClass_createClass(UpsellLightbox, [{
    key: "renderLightbox",
    value: function renderLightbox() {
      var _this2 = this;

      var title = this.options.title.replace("{new-amount}", "<span class='upsell_suggestion'></span>").replace("{old-amount}", "<span class='upsell_amount'></span>");
      var paragraph = this.options.paragraph.replace("{new-amount}", "<span class='upsell_suggestion'></span>").replace("{old-amount}", "<span class='upsell_amount'></span>");
      var yes = this.options.yesLabel.replace("{new-amount}", "<span class='upsell_suggestion'></span>").replace("{old-amount}", "<span class='upsell_amount'></span>");
      var no = this.options.noLabel.replace("{new-amount}", "<span class='upsell_suggestion'></span>").replace("{old-amount}", "<span class='upsell_amount'></span>");
      var markup = "\n            <div class=\"upsellLightboxContainer\" id=\"goMonthly\">\n              <!-- ideal image size is 480x650 pixels -->\n              <div class=\"background\" style=\"background-image: url('".concat(this.options.image, "');\"></div>\n              <div class=\"upsellLightboxContent\">\n              ").concat(this.options.canClose ? "<span id=\"goMonthlyClose\"></span>" : "", "\n                <h1>\n                  ").concat(title, "\n                </h1>\n                ").concat(this.options.otherAmount ? "\n                <p>\n                  <span>".concat(this.options.otherLabel, "</span>\n                  <input href=\"#\" id=\"secondOtherField\" name=\"secondOtherField\" size=\"12\" type=\"number\" inputmode=\"numeric\" step=\"1\" value=\"\">\n                </p>\n                ") : "", "\n\n                <p>\n                  ").concat(paragraph, "\n                </p>\n                <!-- YES BUTTON -->\n                <div id=\"upsellYesButton\">\n                  <a href=\"#\">\n                    <div>\n                    <span class='loader-wrapper'><span class='loader loader-quart'></span></span>\n                    <span class='label'>").concat(yes, "</span>\n                    </div>\n                  </a>\n                </div>\n                <!-- NO BUTTON -->\n                <div id=\"upsellNoButton\">\n                  <button title=\"Close (Esc)\" type=\"button\">\n                    <div>\n                    <span class='loader-wrapper'><span class='loader loader-quart'></span></span>\n                    <span class='label'>").concat(no, "</span>\n                    </div>\n                  </button>\n                </div>\n              </div>\n            </div>\n            ");
      this.overlay.innerHTML = markup;
      var closeButton = this.overlay.querySelector("#goMonthlyClose");
      var yesButton = this.overlay.querySelector("#upsellYesButton a");
      var noButton = this.overlay.querySelector("#upsellNoButton button");
      yesButton.addEventListener("click", this["continue"].bind(this));
      noButton.addEventListener("click", this["continue"].bind(this));
      if (closeButton) closeButton.addEventListener("click", this.close.bind(this));
      this.overlay.addEventListener("click", function (e) {
        if (e.target instanceof Element && e.target.id == _this2.overlay.id && _this2.options.canClose) {
          _this2.close(e);
        }
      });
      document.addEventListener("keyup", function (e) {
        if (e.key === "Escape" && closeButton) {
          closeButton.click();
        }
      });
      document.body.appendChild(this.overlay);
      var otherField = document.querySelector("#secondOtherField");

      if (otherField) {
        otherField.addEventListener("keyup", this.popupOtherField.bind(this));
      }

      if (engrid_ENGrid.debug) console.log("Upsell script rendered");
    } // Should we run the script?

  }, {
    key: "shouldRun",
    value: function shouldRun() {
      // const hideModal = cookie.get("hideUpsell"); // Get cookie
      // if it's a first page of a Donation page
      return (// !hideModal &&
        'EngridUpsell' in window && !!window.pageJson && window.pageJson.pageNumber == 1 && window.pageJson.pageType == "donation"
      );
    }
  }, {
    key: "popupOtherField",
    value: function popupOtherField() {
      var _this3 = this;

      var _a, _b;

      var value = parseFloat((_b = (_a = this.overlay.querySelector("#secondOtherField")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "");
      var live_upsell_amount = document.querySelectorAll("#upsellYesButton .upsell_suggestion");

      if (!isNaN(value) && value > 0) {
        live_upsell_amount.forEach(function (elem) {
          return elem.innerHTML = "$" + value.toFixed(2);
        });
      } else {
        live_upsell_amount.forEach(function (elem) {
          return elem.innerHTML = "$" + _this3.getUpsellAmount().toFixed(2);
        });
      }
    }
  }, {
    key: "liveAmounts",
    value: function liveAmounts() {
      var _this4 = this;

      var live_upsell_amount = document.querySelectorAll(".upsell_suggestion");
      var live_amount = document.querySelectorAll(".upsell_amount");
      var suggestedAmount = this.getUpsellAmount();
      live_upsell_amount.forEach(function (elem) {
        return elem.innerHTML = "$" + suggestedAmount.toFixed(2);
      });
      live_amount.forEach(function (elem) {
        return elem.innerHTML = "$" + _this4._amount.amount.toFixed(2);
      });
    } // Return the Suggested Upsell Amount

  }, {
    key: "getUpsellAmount",
    value: function getUpsellAmount() {
      var _a, _b;

      var amount = this._amount.amount;
      var otherAmount = parseFloat((_b = (_a = this.overlay.querySelector("#secondOtherField")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "");

      if (otherAmount > 0) {
        return otherAmount;
      }

      var upsellAmount = 0;

      for (var i = 0; i < this.options.amountRange.length; i++) {
        var val = this.options.amountRange[i];

        if (upsellAmount == 0 && amount <= val.max) {
          upsellAmount = val.suggestion;

          if (typeof upsellAmount !== 'number') {
            var suggestionMath = upsellAmount.replace("amount", amount.toFixed(2));
            upsellAmount = parseFloat(Function('"use strict";return (' + suggestionMath + ')')());
          }

          break;
        }
      }

      return upsellAmount;
    }
  }, {
    key: "shouldOpen",
    value: function shouldOpen() {
      var freq = this._frequency.frequency;
      var upsellAmount = this.getUpsellAmount(); // If frequency is not onetime or
      // the modal is already opened or
      // there's no suggestion for this donation amount,
      // we should not open

      if (freq == "onetime" && !this.overlay.classList.contains("is-submitting") && upsellAmount > 0) {
        if (engrid_ENGrid.debug) {
          console.log("Upsell Frequency", this._frequency.frequency);
          console.log("Upsell Amount", this._amount.amount);
          console.log("Upsell Suggested Amount", upsellAmount);
        }

        return true;
      }

      return false;
    }
  }, {
    key: "open",
    value: function open() {
      if (engrid_ENGrid.debug) console.log("Upsell Script Triggered");

      if (!this.shouldOpen()) {
        // In the circumstance when the form fails to validate via server-side validation, the page will reload
        // When that happens, we should place the original amount saved in sessionStorage into the upsell original amount field
        var original = window.sessionStorage.getItem('original');

        if (original && document.querySelectorAll('.en__errorList .en__error').length > 0) {
          this.setOriginalAmount(original);
        } // Returning true will give the "go ahead" to submit the form


        this._form.submit = true;
        return true;
      }

      this.liveAmounts();
      this.overlay.classList.remove("is-hidden");
      this._form.submit = false;
      return false;
    } // Set the original amount into a hidden field using the upsellOriginalGiftAmountFieldName, if provided

  }, {
    key: "setOriginalAmount",
    value: function setOriginalAmount(original) {
      if (this.options.upsellOriginalGiftAmountFieldName) {
        var enFieldUpsellOriginalAmount = document.querySelector(".en__field__input.en__field__input--hidden[name='" + this.options.upsellOriginalGiftAmountFieldName + "']");

        if (!enFieldUpsellOriginalAmount) {
          var pageform = document.querySelector("form.en__component--page");

          if (pageform) {
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", this.options.upsellOriginalGiftAmountFieldName);
            input.classList.add('en__field__input', 'en__field__input--hidden');
            pageform.appendChild(input);
            enFieldUpsellOriginalAmount = document.querySelector('.en__field__input.en__field__input--hidden[name="' + this.options.upsellOriginalGiftAmountFieldName + '"]');
          }
        }

        if (enFieldUpsellOriginalAmount) {
          // save it to a session variable just in case this page reloaded due to server-side validation error
          window.sessionStorage.setItem('original', original);
          enFieldUpsellOriginalAmount.setAttribute("value", original);
        }
      }
    } // Proceed to the next page (upsold or not)

  }, {
    key: "continue",
    value: function _continue(e) {
      var _a;

      e.preventDefault();

      if (e.target instanceof Element && ((_a = document.querySelector("#upsellYesButton")) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
        if (engrid_ENGrid.debug) console.log("Upsold");
        this.setOriginalAmount(this._amount.amount.toString());

        this._frequency.setFrequency("monthly");

        this._amount.setAmount(this.getUpsellAmount());
      } else {
        this.setOriginalAmount('');
        window.sessionStorage.removeItem('original');
      }

      this._form.submitForm();
    } // Close the lightbox (no cookies)

  }, {
    key: "close",
    value: function close(e) {
      e.preventDefault(); // cookie.set("hideUpsell", "1", { expires: 1 }); // Create one day cookie

      this.overlay.classList.add("is-hidden");

      if (this.options.submitOnClose) {
        this._form.submitForm();
      } else {
        this._form.dispatchError();
      }
    }
  }]);

  return UpsellLightbox;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/show-hide-radio-checkboxes.js


var ShowHideRadioCheckboxes = /*#__PURE__*/function () {
  function ShowHideRadioCheckboxes(elements, classes) {
    var _this = this;

    classCallCheck_classCallCheck(this, ShowHideRadioCheckboxes);

    this.elements = document.getElementsByName(elements);
    this.classes = classes;
    this.hideAll();

    var _loop = function _loop(i) {
      var element = _this.elements[i];

      if (element.checked) {
        _this.show(element);
      }

      element.addEventListener("change", function (e) {
        _this.hideAll();

        _this.show(element);
      });
    };

    for (var i = 0; i < this.elements.length; i++) {
      _loop(i);
    }
  } // Hide All Divs


  createClass_createClass(ShowHideRadioCheckboxes, [{
    key: "hideAll",
    value: function hideAll() {
      var _this2 = this;

      this.elements.forEach(function (item, index) {
        if (item instanceof HTMLInputElement) _this2.hide(item);
      });
    } // Hide Single Element Div

  }, {
    key: "hide",
    value: function hide(item) {
      var inputValue = item.value;
      document.querySelectorAll("." + this.classes + inputValue).forEach(function (el) {
        // Consider toggling "hide" class so these fields can be displayed when in a debug state
        if (el instanceof HTMLElement) el.style.display = "none";
      });
    } // Show Single Element Div

  }, {
    key: "show",
    value: function show(item) {
      var inputValue = item.value;
      document.querySelectorAll("." + this.classes + inputValue).forEach(function (el) {
        // Consider toggling "hide" class so these fields can be displayed when in a debug state
        if (el instanceof HTMLElement) el.style.display = "";
      });

      if (item.type == "checkbox" && !item.checked) {
        this.hide(item);
      }
    }
  }]);

  return ShowHideRadioCheckboxes;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/simple-country-select.js


// This class works when the user has added ".simple_country_select" as a class in page builder for the Country select
var SimpleCountrySelect = /*#__PURE__*/function () {
  function SimpleCountrySelect() {
    var _this = this;

    classCallCheck_classCallCheck(this, SimpleCountrySelect);

    var _a;

    this.countryWrapper = document.querySelector('.simple_country_select');
    this.countrySelect = document.querySelector('#en__field_supporter_country');

    if (this.countrySelect) {
      var countrySelecLabel = this.countrySelect.options[this.countrySelect.selectedIndex].innerHTML;
      var countrySelecValue = this.countrySelect.options[this.countrySelect.selectedIndex].value;

      if (countrySelecValue == "US") {
        countrySelecValue = " US";
      }

      if (countrySelecLabel == "United States") {
        countrySelecLabel = "the United States";
      }

      var countryWrapper = document.querySelector('.simple_country_select');

      if (countryWrapper) {
        // Remove Country Select tab index
        this.countrySelect.tabIndex = -1; // Find the address label

        var addressLabel = document.querySelector('.en__field--address1 label');
        var addressWrapper = (_a = addressLabel.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement; // EN does not enforce a labels on fields so we have to check for it

        if (addressLabel) {
          // Wrap the address label in a div to break out of the flexbox
          this.wrap(addressLabel, document.createElement('div')); // Add our link after the address label
          // Includes both long form and short form variants

          var newEl = document.createElement('span');
          newEl.innerHTML = ' <label id="en_custom_field_simple_country_select_long" class="en__field__label"><a href="javascript:void(0)">(Outside ' + countrySelecLabel + '?)</a></label><label id="en_custom_field_simple_country_select_short" class="en__field__label"><a href="javascript:void(0)">(Outside ' + countrySelecValue + '?)</a></label>';
          newEl.querySelectorAll("a").forEach(function (el) {
            el.addEventListener("click", _this.showCountrySelect.bind(_this));
          });
          this.insertAfter(newEl, addressLabel);
        }
      }
    }
  } // Helper function to insert HTML after a node


  createClass_createClass(SimpleCountrySelect, [{
    key: "insertAfter",
    value: function insertAfter(el, referenceNode) {
      var parentElement = referenceNode.parentNode;
      parentElement.insertBefore(el, referenceNode.nextSibling);
    } // Helper function to wrap a target in a new element

  }, {
    key: "wrap",
    value: function wrap(el, wrapper) {
      var parentElement = el.parentNode;
      parentElement.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }
  }, {
    key: "showCountrySelect",
    value: function showCountrySelect(e) {
      var _a;

      e.preventDefault();
      this.countryWrapper.classList.add("country-select-visible");
      var addressLabel = document.querySelector('.en__field--address1 label');
      var addressWrapper = (_a = addressLabel.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
      addressWrapper.classList.add("country-select-visible");
      this.countrySelect.focus(); // Reinstate Country Select tab index

      this.countrySelect.removeAttribute("tabIndex");
    }
  }]);

  return SimpleCountrySelect;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/skip-link.js


// Javascript that adds an accessible "Skip Link" button after the <body> opening that jumps to
// the first <title> or <h1> field in a "body-" section, or the first <h1> if none are found
// in those sections
// Depends on _engrid-skip-link.scss

var SkipToMainContentLink = /*#__PURE__*/function () {
  function SkipToMainContentLink() {
    classCallCheck_classCallCheck(this, SkipToMainContentLink);

    var firstTitleInEngridBody = document.querySelector("div[class*='body-'] title");
    var firstH1InEngridBody = document.querySelector("div[class*='body-'] h1");
    var firstTitle = document.querySelector("title");
    var firstH1 = document.querySelector("h1");

    if (firstTitleInEngridBody && firstTitleInEngridBody.parentElement) {
      firstTitleInEngridBody.parentElement.insertAdjacentHTML('beforebegin', '<span id="skip-link"></span>');
      this.insertSkipLinkSpan();
    } else if (firstH1InEngridBody && firstH1InEngridBody.parentElement) {
      firstH1InEngridBody.parentElement.insertAdjacentHTML('beforebegin', '<span id="skip-link"></span>');
      this.insertSkipLinkSpan();
    } else if (firstTitle && firstTitle.parentElement) {
      firstTitle.parentElement.insertAdjacentHTML('beforebegin', '<span id="skip-link"></span>');
      this.insertSkipLinkSpan();
    } else if (firstH1 && firstH1.parentElement) {
      firstH1.parentElement.insertAdjacentHTML('beforebegin', '<span id="skip-link"></span>');
      this.insertSkipLinkSpan();
    } else {
      if (engrid_ENGrid.debug) console.log("This page contains no <title> or <h1> and a 'Skip to main content' link was not added");
    }
  }

  createClass_createClass(SkipToMainContentLink, [{
    key: "insertSkipLinkSpan",
    value: function insertSkipLinkSpan() {
      document.body.insertAdjacentHTML('afterbegin', '<a class="skip-link" href="#skip-link">Skip to main content</a>');
    }
  }]);

  return SkipToMainContentLink;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/src-defer.js

// Build Notes: Add the vanilla Javascript version inline inside the page template right before </body>
// In the event the vanilla javascript is not inlined we should still process any assets with a data-src still defined on it. Plus we only process background video via this JS file as to not block the page with a large video file downloading.
// // 4Site's simplified image lazy loader
// var srcDefer = document.querySelectorAll("img[data-src]");
// window.addEventListener('DOMContentLoaded', (event) => {
//   for (var i = 0; i < srcDefer.length; i++) {
//     let dataSrc = srcDefer[i].getAttribute("data-src");
//     if (dataSrc) {
//       srcDefer[i].setAttribute("decoding", "async"); // Gets image processing off the main working thread
//       srcDefer[i].setAttribute("loading", "lazy"); // Lets the browser determine when the asset should be downloaded
//       srcDefer[i].setAttribute("src", dataSrc); // Sets the src which will cause the browser to retrieve the asset
//       srcDefer[i].setAttribute("data-engrid-data-src-processed", "true"); // Sets an attribute to mark that it has been processed by ENGrid
//       srcDefer[i].removeAttribute("data-src"); // Removes the data-source
//     }
//   }
// });
var SrcDefer = function SrcDefer() {
  classCallCheck_classCallCheck(this, SrcDefer);

  // Find all images and videos with a data-src defined
  this.imgSrcDefer = document.querySelectorAll("img[data-src]");
  this.videoBackground = document.querySelectorAll("video");
  this.videoBackgroundSource = document.querySelectorAll("video source"); // Process images

  for (var i = 0; i < this.imgSrcDefer.length; i++) {
    var img = this.imgSrcDefer[i];

    if (img) {
      img.setAttribute("decoding", "async"); // Gets image processing off the main working thread, and decodes the image asynchronously to reduce delay in presenting other content

      img.setAttribute("loading", "lazy"); // Lets the browser determine when the asset should be downloaded using it's native lazy loading

      var imgDataSrc = img.getAttribute("data-src");

      if (imgDataSrc) {
        img.setAttribute("src", imgDataSrc); // Sets the src which will cause the browser to retrieve the asset
      }

      img.setAttribute("data-engrid-data-src-processed", "true"); // Sets an attribute to mark that it has been processed by ENGrid

      img.removeAttribute("data-src"); // Removes the data-source
    }
  } // Process video


  for (var _i = 0; _i < this.videoBackground.length; _i++) {
    var video = this.videoBackground[_i];
    video.setAttribute("loading", "lazy"); // Lets the browser determine when the asset should be downloaded
    // Process one or more defined sources in the <video> tag

    var videoBackgroundSource = video.querySelectorAll("source");

    var videoBackgroundSourcedDataSrc = this.videoBackgroundSource[_i].getAttribute("data-src");

    if (videoBackgroundSource) {
      for (var _i2 = 0; _i2 < this.videoBackgroundSource.length; _i2++) {
        // Construct the <video> tags new <source>
        if (videoBackgroundSourcedDataSrc) {
          this.videoBackgroundSource[_i2].setAttribute("src", videoBackgroundSourcedDataSrc);

          this.videoBackgroundSource[_i2].setAttribute("data-engrid-data-src-processed", "true"); // Sets an attribute to mark that it has been processed by ENGrid


          this.videoBackgroundSource[_i2].removeAttribute("data-src"); // Removes the data-source

        } // To get the browser to request the video asset defined we need to remove the <video> tag and re-add it


        var videoBackgroundParent = video.parentNode; // Determine the parent of the <video> tag

        var copyOfVideoBackground = video; // Copy the <video> tag

        if (videoBackgroundParent && copyOfVideoBackground) {
          videoBackgroundParent.replaceChild(copyOfVideoBackground, this.videoBackground[_i2]); // Replace the <video> with the copy of itself
          // Update the video to auto play, mute, loop

          video.muted = true; // Mute the video by default

          video.controls = false; // Hide the browser controls

          video.loop = true; // Loop the video

          video.playsInline = true; // Encourage the user agent to display video content within the element's playback area

          video.play(); // Plays the video
        }
      }
    }
  }
};
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/set-recurr-freq.js



var setRecurrFreq = function setRecurrFreq() {
  var _this = this;

  classCallCheck_classCallCheck(this, setRecurrFreq);

  this._frequency = DonationFrequency.getInstance();
  this.linkClass = 'setRecurrFreq-';
  this.checkboxName = 'engrid.recurrfreq'; // Watch the links that starts with linkClass

  document.querySelectorAll("a[class^=\"".concat(this.linkClass, "\"]")).forEach(function (element) {
    element.addEventListener("click", function (e) {
      // Get the right class
      var setRecurrFreqClass = element.className.split(' ').filter(function (linkClass) {
        return linkClass.startsWith(_this.linkClass);
      });
      if (engrid_ENGrid.debug) console.log(setRecurrFreqClass);

      if (setRecurrFreqClass.length) {
        e.preventDefault();
        engrid_ENGrid.setFieldValue('transaction.recurrfreq', setRecurrFreqClass[0].substring(_this.linkClass.length).toUpperCase());

        _this._frequency.load();
      }
    });
  }); // Watch checkboxes with the name checkboxName

  document.getElementsByName(this.checkboxName).forEach(function (element) {
    element.addEventListener("change", function () {
      if (element.checked) {
        engrid_ENGrid.setFieldValue('transaction.recurrfreq', element.value.toUpperCase());

        _this._frequency.load();
      }
    });
  }); // Uncheck the checkbox when frequency != checkbox value

  this._frequency.onFrequencyChange.subscribe(function () {
    var freq = _this._frequency.frequency.toUpperCase();

    document.getElementsByName(_this.checkboxName).forEach(function (element) {
      if (element.checked && element.value != freq) {
        element.checked = false;
      }
    });
  });
};
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/page-background.js



var PageBackground = /*#__PURE__*/function () {
  function PageBackground() {
    classCallCheck_classCallCheck(this, PageBackground);

    // @TODO: Change page-backgroundImage to page-background
    this.pageBackground = document.querySelector(".page-backgroundImage"); // Finds any <img> added to the "backgroundImage" ENGRid section and sets it as the "--engrid__page-backgroundImage_url" CSS Custom Property

    if (this.pageBackground) {
      var pageBackgroundImg = this.pageBackground.querySelector("img");
      var pageBackgroundImgDataSrc = pageBackgroundImg === null || pageBackgroundImg === void 0 ? void 0 : pageBackgroundImg.getAttribute("data-src");
      var pageBackgroundImgSrc = pageBackgroundImg === null || pageBackgroundImg === void 0 ? void 0 : pageBackgroundImg.src;

      if (this.pageBackground && pageBackgroundImgDataSrc) {
        if (engrid_ENGrid.debug) console.log("A background image set in the page was found with a data-src value, setting it as --engrid__page-backgroundImage_url", pageBackgroundImgDataSrc);
        pageBackgroundImgDataSrc = "url('" + pageBackgroundImgDataSrc + "')";
        this.pageBackground.style.setProperty('--engrid__page-backgroundImage_url', pageBackgroundImgDataSrc);
      } else if (this.pageBackground && pageBackgroundImgSrc) {
        if (engrid_ENGrid.debug) console.log("A background image set in the page was found with a src value, setting it as --engrid__page-backgroundImage_url", pageBackgroundImgSrc);
        pageBackgroundImgSrc = "url('" + pageBackgroundImgSrc + "')";
        this.pageBackground.style.setProperty('--engrid__page-backgroundImage_url', pageBackgroundImgSrc);
      } else if (pageBackgroundImg) {
        if (engrid_ENGrid.debug) console.log("A background image set in the page was found but without a data-src or src value, no action taken", pageBackgroundImg);
      } else {
        if (engrid_ENGrid.debug) console.log("A background image set in the page was not found, any default image set in the theme on --engrid__page-backgroundImage_url will be used");
      }
    } else {
      if (engrid_ENGrid.debug) console.log("A background image set in the page was not found, any default image set in the theme on --engrid__page-backgroundImage_url will be used");
    }

    this.setDataAttributes();
  }

  createClass_createClass(PageBackground, [{
    key: "setDataAttributes",
    value: function setDataAttributes() {
      if (this.hasVideoBackground()) return engrid_ENGrid.setBodyData('page-background', 'video');
      if (this.hasImageBackground()) return engrid_ENGrid.setBodyData('page-background', 'image');
      return engrid_ENGrid.setBodyData('page-background', 'empty');
    }
  }, {
    key: "hasVideoBackground",
    value: function hasVideoBackground() {
      return !!this.pageBackground.querySelector('video');
    }
  }, {
    key: "hasImageBackground",
    value: function hasImageBackground() {
      return !this.hasVideoBackground() && !!this.pageBackground.querySelector('img');
    }
  }]);

  return PageBackground;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/neverbounce.js




var NeverBounce = /*#__PURE__*/function () {
  function NeverBounce(apiKey) {
    var _this = this;

    var dateField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var statusField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    classCallCheck_classCallCheck(this, NeverBounce);

    this.apiKey = apiKey;
    this.dateField = dateField;
    this.statusField = statusField;
    this.form = EnForm.getInstance();
    this.emailField = null;
    this.emailWrapper = document.querySelector(".en__field--emailAddress");
    this.nbDate = null;
    this.nbStatus = null;
    window._NBSettings = {
      apiKey: this.apiKey,
      autoFieldHookup: false,
      inputLatency: 500,
      displayPoweredBy: false,
      loadingMessage: "Validating...",
      softRejectMessage: "Invalid email",
      acceptedMessage: "Email validated!",
      feedback: false
    };
    engrid_ENGrid.loadJS('https://cdn.neverbounce.com/widget/dist/NeverBounce.js');
    this.init();
    this.form.onValidate.subscribe(function () {
      return _this.form.validate = _this.validate();
    });
  }

  createClass_createClass(NeverBounce, [{
    key: "init",
    value: function init() {
      this.emailField = document.getElementById("en__field_supporter_emailAddress");
      if (this.dateField && document.getElementsByName(this.dateField).length) this.nbDate = document.querySelector("[name='" + this.dateField + "']");
      if (this.statusField && document.getElementsByName(this.statusField).length) this.nbStatus = document.querySelector("[name='" + this.statusField + "']");

      if (!this.emailField) {
        if (engrid_ENGrid.debug) console.log('Engrid Neverbounce: E-mail Field Not Found');
        return;
      }

      if (!this.emailField) {
        if (engrid_ENGrid.debug) console.log('Engrid Neverbounce: E-mail Field Not Found', this.emailField);
        return;
      }

      if (engrid_ENGrid.debug) console.log('Engrid Neverbounce External Script Loaded');
      this.wrap(this.emailField, document.createElement("div"));
      var parentNode = this.emailField.parentNode;
      parentNode.id = "nb-wrapper"; // Define HTML structure for a Custom NB Message and insert it after Email field

      var nbCustomMessageHTML = document.createElement("div");
      nbCustomMessageHTML.innerHTML = '<div id="nb-feedback" class="en__field__error nb-hidden">Enter a valid email.</div>';
      this.insertAfter(nbCustomMessageHTML, this.emailField);
      var NBClass = this;
      window.addEventListener("load", function () {
        document.getElementsByTagName("body")[0].addEventListener("nb:registered", function (event) {
          var field = document.querySelector('[data-nb-id="' + event.detail.id + '"]'); // Never Bounce: Do work when input changes or when API responds with an error

          field.addEventListener("nb:clear", function (e) {
            NBClass.setEmailStatus("clear");
            if (NBClass.nbDate) NBClass.nbDate.value = "";
            if (NBClass.nbStatus) NBClass.nbStatus.value = "";
          }); // Never Bounce: Do work when results have an input that does not look like an email (i.e. missing @ or no .com/.net/etc...)

          field.addEventListener("nb:soft-result", function (e) {
            NBClass.setEmailStatus("soft-result");
            if (NBClass.nbDate) NBClass.nbDate.value = "";
            if (NBClass.nbStatus) NBClass.nbStatus.value = "";
          }); // Never Bounce: When results have been received

          field.addEventListener("nb:result", function (e) {
            if (e.detail.result.is(window._nb.settings.getAcceptedStatusCodes())) {
              NBClass.setEmailStatus("valid");
              if (NBClass.nbDate) NBClass.nbDate.value = new Date().toLocaleDateString();
            } else {
              NBClass.setEmailStatus("invalid");
              if (NBClass.nbDate) NBClass.nbDate.value = "";
            }
          });
        }); // Never Bounce: Register field with the widget and broadcast nb:registration event

        window._nb.fields.registerListener(NBClass.emailField, true);
      });
    }
  }, {
    key: "clearStatus",
    value: function clearStatus() {
      if (!this.emailField) {
        if (engrid_ENGrid.debug) console.log('Engrid Neverbounce: E-mail Field Not Found');
        return;
      }

      this.emailField.classList.remove("rm-error"); // Search page for the NB Wrapper div and set as variable

      var nb_email_field_wrapper = document.getElementById("nb-wrapper"); // Search page for the NB Feedback div and set as variable

      var nb_email_feedback_field = document.getElementById("nb-feedback");
      nb_email_field_wrapper.className = "";
      nb_email_feedback_field.className = "en__field__error nb-hidden";
      nb_email_feedback_field.innerHTML = "";
      this.emailWrapper.classList.remove("en__field--validationFailed");
    }
  }, {
    key: "deleteENFieldError",
    value: function deleteENFieldError() {
      var errorField = document.querySelector(".en__field--emailAddress>div.en__field__error");
      if (errorField) errorField.remove();
    }
  }, {
    key: "setEmailStatus",
    value: function setEmailStatus(status) {
      if (engrid_ENGrid.debug) console.log("Neverbounce Status:", status);

      if (!this.emailField) {
        if (engrid_ENGrid.debug) console.log('Engrid Neverbounce: E-mail Field Not Found');
        return;
      } // Search page for the NB Wrapper div and set as variable


      var nb_email_field_wrapper = document.getElementById("nb-wrapper"); // Search page for the NB Feedback div and set as variable

      var nb_email_feedback_field = document.getElementById("nb-feedback"); // classes to add or remove based on neverbounce results

      var nb_email_field_wrapper_success = "nb-success";
      var nb_email_field_wrapper_error = "nb-error";
      var nb_email_feedback_hidden = "nb-hidden";
      var nb_email_feedback_loading = "nb-loading";
      var nb_email_field_error = "rm-error";

      if (!nb_email_feedback_field) {
        var nbWrapperDiv = nb_email_field_wrapper.querySelector('div');
        if (nbWrapperDiv) nbWrapperDiv.innerHTML = '<div id="nb-feedback" class="en__field__error nb-hidden">Enter a valid email.</div>';
      }

      if (status == "valid") {
        this.clearStatus();
      } else {
        nb_email_field_wrapper.classList.remove(nb_email_field_wrapper_success);
        nb_email_field_wrapper.classList.add(nb_email_field_wrapper_error);

        switch (status) {
          case "required":
            // special case status that we added ourselves -- doesn't come from NB
            this.deleteENFieldError();
            nb_email_feedback_field.innerHTML = "A valid email is required";
            nb_email_feedback_field.classList.remove(nb_email_feedback_loading);
            nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
            this.emailField.classList.add(nb_email_field_error);
            break;

          case "soft-result":
            if (this.emailField.value) {
              this.deleteENFieldError();
              nb_email_feedback_field.innerHTML = "Invalid email";
              nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
              this.emailField.classList.add(nb_email_field_error);
            } else {
              this.clearStatus();
            }

            break;

          case "invalid":
            this.deleteENFieldError();
            nb_email_feedback_field.innerHTML = "Invalid email";
            nb_email_feedback_field.classList.remove(nb_email_feedback_loading);
            nb_email_feedback_field.classList.remove(nb_email_feedback_hidden);
            this.emailField.classList.add(nb_email_field_error);
            break;

          case "loading":
          case "clear":
          default:
            this.clearStatus();
            break;
        }
      }
    } // Function to insert HTML after a DIV

  }, {
    key: "insertAfter",
    value: function insertAfter(el, referenceNode) {
      var _a;

      (_a = referenceNode === null || referenceNode === void 0 ? void 0 : referenceNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(el, referenceNode.nextSibling);
    } //  to insert HTML before a DIV

  }, {
    key: "insertBefore",
    value: function insertBefore(el, referenceNode) {
      var _a;

      (_a = referenceNode === null || referenceNode === void 0 ? void 0 : referenceNode.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(el, referenceNode);
    } //  to Wrap HTML around a DIV

  }, {
    key: "wrap",
    value: function wrap(el, wrapper) {
      var _a;

      (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }
  }, {
    key: "validate",
    value: function validate() {
      var _a;

      if (!this.emailField) {
        if (engrid_ENGrid.debug) console.log('Engrid Neverbounce validate(): E-mail Field Not Found. Returning true.');
        return true;
      }

      if (this.nbStatus) {
        this.nbStatus.value = engrid_ENGrid.getFieldValue("nb-result");
      }

      if (!['catchall', 'valid'].includes(engrid_ENGrid.getFieldValue('nb-result'))) {
        this.setEmailStatus("required");
        (_a = this.emailField) === null || _a === void 0 ? void 0 : _a.focus();
        return false;
      }

      return true;
    }
  }]);

  return NeverBounce;
}();
;// CONCATENATED MODULE: ../engrid-scripts/packages/common/dist/index.js
 // Runs first so it can change the DOM markup before any markup dependent code fires






















;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function typeof_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    typeof_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    typeof_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return typeof_typeof(obj);
}
;// CONCATENATED MODULE: ./src/scripts/main.js


var tippy = __webpack_require__(861)/* .default */ .ZP;

document.onreadystatechange = function () {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    // Render Critical because it moves DOM elements that can be above the fold
    // Has also been added to the Page Template after main.js in a <script> tag that fires after DomContentLoaded
    var inlineMonthlyUpsell = document.querySelectorAll('.move-after-transaction-recurrfreq')[0];
    var recurrFrequencyField = document.querySelectorAll('.en__field--recurrfreq')[0];

    if (inlineMonthlyUpsell && recurrFrequencyField) {
      recurrFrequencyField.insertAdjacentElement("beforeend", inlineMonthlyUpsell); // inlineMonthlyUpsell.style.visibility='visible';
    }

    var inlineDonationAmountHeader = document.querySelectorAll('.move-before-transaction-donationamt')[0];
    var donationAmtField = document.querySelectorAll('.en__field--donationAmt')[0];

    if (inlineDonationAmountHeader && donationAmtField) {
      donationAmtField.insertAdjacentElement("afterbegin", inlineDonationAmountHeader); // inlineGiftAmountHeader.style.visibility='visible';
    } // Add placeholder to the Mobile Phone Field


    var enFieldMobilePhone = document.querySelectorAll('input#en__field_supporter_NOT_TAGGED_13')[0];

    if (enFieldMobilePhone) {
      enFieldMobilePhone.placeholder = "Phone Number";
    }

    var enFieldAddressLine2 = document.querySelectorAll('input#en__field_supporter_address2')[0];

    if (enFieldAddressLine2) {
      enFieldAddressLine2.placeholder = "#000";
    }

    var enFieldPostalCode = document.querySelectorAll('input#en__field_supporter_postcode')[0];

    if (enFieldPostalCode) {
      enFieldPostalCode.placeholder = "00000";
    }

    var enFieldPhoneNumber = document.querySelectorAll('input#en__field_supporter_phoneNumber')[0];

    if (enFieldPhoneNumber) {
      enFieldPhoneNumber.placeholder = "Phone Number";
    } // Add "Why is this required?" markup to the Title field
    // Only show it if the Title field is marked as required


    var titleLabel = document.querySelectorAll('.en__field--title.en__mandatory > label')[0];

    if (titleLabel) {
      var el = document.createElement('span');
      var childEl = document.createElement('a');
      childEl.href = '#';
      childEl.id = 'title-tooltip';
      childEl.className = "label-tooltip";
      childEl.tabIndex = "-1";
      childEl.innerText = "Why is this required?";
      childEl.addEventListener('click', function (e) {
        return e.preventDefault();
      });
      el.appendChild(childEl);
      titleLabel.appendChild(el);
      tippy("#title-tooltip", {
        content: "The U.S. Senate is now requiring that all letters include a title. Please select one in order to ensure that your action lands in the inbox of your Senator."
      });
    } // Add "what's this" markup to the CVV field


    var ccvvLabel = document.querySelectorAll('.en__field--ccvv > label')[0];

    if (ccvvLabel) {
      var _el = document.createElement('span');

      var _childEl = document.createElement('a');

      _childEl.href = '#';
      _childEl.id = 'ccv-tooltip';
      _childEl.className = "label-tooltip";
      _childEl.tabIndex = "-1";
      _childEl.innerText = "What's this?";

      _childEl.addEventListener('click', function (e) {
        return e.preventDefault();
      });

      _el.appendChild(_childEl);

      ccvvLabel.appendChild(_el);
      tippy("#ccv-tooltip", {
        content: "The three or four digit security code on your debit or credit card"
      });
    } // Conversion Tracking if this is a thank you page


    if (typeof pageJson !== 'undefined' && pageJson.giftProcess && typeof dataLayer !== 'undefined') {
      // In the upsell portion of the engrid-scripts/packages/common, we are setting 'original' to the one-time donation amount if the donor was upsold
      var upsell = window.sessionStorage.getItem('original') ? window.sessionStorage.getItem('original') : 'No value';
      var quantity = 1;
      var total = pageJson.amount; // Defaulting to 'Recurring' for recurring donations in case the transactionExtra object isn't defined
      // That way those looking at the analytics data will understand that the total isn't necessarily correct because we don't know the quantity

      var frequency = pageJson.recurring ? 'Recurring' : 'One Time'; // Fallbacks in case the transactionExtra object isn't defined

      var te_exists = typeof transactionExtra !== 'undefined';
      var te_frequency = te_exists && transactionExtra.frequency ? transactionExtra.frequency : 'Unknown';
      var te_city = te_exists && transactionExtra.city ? transactionExtra.city : 'Unknown';
      var te_state = te_exists && transactionExtra.state ? transactionExtra.state : 'Unknown';

      switch (te_frequency) {
        case 'MONTHLY':
          frequency = 'Monthly';
          quantity = 12;
          total = 12 * pageJson.amount;
          var monthlyReceipt = document.getElementById('monthlyReceipt');

          if (monthlyReceipt) {
            monthlyReceipt.style.display = 'block';
          }

          break;

        case 'ANNUAL':
          frequency = 'Annual';
          var annualReceipt = document.getElementById('annualReceipt');

          if (annualReceipt) {
            annualReceipt.style.display = 'block';
          }

          break;

        default:
          break;
      } // Push analytics data and other custom GTM variables


      dataLayer.push({
        'en_transaction_amount': total,
        // custom variable in GTM
        'en_payment_amount': pageJson.amount,
        // original payment amount not *12 for monthly gifts
        'en_transaction_id': pageJson.donationLogId,
        // custom variable in GTM
        'en_campaign_id': pageJson.campaignId,
        'transactionId': pageJson.donationLogId,
        'transactionAffiliation': 'Donation Form',
        'transactionTotal': total,
        'transactionTax': 0,
        'transactionShipping': 0,
        'transactionCity': te_city,
        'transactionState': te_state,
        'transactionCountry': pageJson.country,
        'transactionProducts': [{
          id: pageJson.donationLogId,
          quantity: quantity,
          name: pageJson.pageName,
          price: pageJson.amount,
          sku: pageJson.campaignId,
          category: frequency
        }],
        'transactionPromoCode': upsell,
        'successful_donation': 'main form (EN)',
        // custom variable/event for GA
        'event': frequency,
        // event used to determine transaction frequency for tag placement
        'donation_type': frequency
      });
      dataLayer.push({
        'event': 'en_donation' // used to signal that we're on the thank you page instead of url/parameters

      });
    } // Close's the menu when tapping the close button on mobile


    var menuBtn = document.querySelector('a[role="menuitem"]'); // @TODO Make this a passive event listener to improce scrolling performance: https://web.dev/uses-passive-event-listeners/?utm_source=lighthouse&utm_medium=unknown

    menuBtn.addEventListener('touchstart', function (event) {
      var menu = document.querySelector('ul#main-menu ul[role="menu"]');

      if (menu.style.display === "block") {
        menu.style.display = "none";
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }); // Menu copied from: https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html#
    // @TODO Move to this package https://github.com/NickDJM/accessible-menu/blob/HEAD/docs/basics/two-level-menu-with-toggle.md
    // MenubarItemLinks.js

    /*
    *   This content is licensed according to the W3C Software License at
    *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
    */

    var MenubarItem = function MenubarItem(domNode, menuObj) {
      this.menu = menuObj;
      this.domNode = domNode;
      this.popupMenu = false;
      this.hasFocus = false;
      this.hasHover = false;
      this.isMenubarItem = true;
      this.keyCode = Object.freeze({
        'TAB': 9,
        'RETURN': 13,
        'ESC': 27,
        'SPACE': 32,
        'PAGEUP': 33,
        'PAGEDOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT': 37,
        'UP': 38,
        'RIGHT': 39,
        'DOWN': 40
      });
    };

    MenubarItem.prototype.init = function () {
      this.domNode.tabIndex = -1;
      this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
      this.domNode.addEventListener('focus', this.handleFocus.bind(this));
      this.domNode.addEventListener('blur', this.handleBlur.bind(this));
      this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
      this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this)); // Initialize pop up menus

      var nextElement = this.domNode.nextElementSibling;

      if (nextElement && nextElement.tagName === 'UL') {
        this.popupMenu = new PopupMenu(nextElement, this);
        this.popupMenu.init();
      }
    };

    MenubarItem.prototype.handleKeydown = function (event) {
      var tgt = event.currentTarget,
          _char = event.key,
          flag = false,
          clickEvent;

      function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      }

      switch (event.keyCode) {
        case this.keyCode.SPACE:
        case this.keyCode.RETURN:
        case this.keyCode.DOWN:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
            flag = true;
          }

          break;

        case this.keyCode.LEFT:
          this.menu.setFocusToPreviousItem(this);
          flag = true;
          break;

        case this.keyCode.RIGHT:
          this.menu.setFocusToNextItem(this);
          flag = true;
          break;

        case this.keyCode.UP:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToLastItem();
            flag = true;
          }

          break;

        case this.keyCode.HOME:
        case this.keyCode.PAGEUP:
          this.menu.setFocusToFirstItem();
          flag = true;
          break;

        case this.keyCode.END:
        case this.keyCode.PAGEDOWN:
          this.menu.setFocusToLastItem();
          flag = true;
          break;

        case this.keyCode.TAB:
          this.popupMenu.close(true);
          break;

        case this.keyCode.ESC:
          this.popupMenu.close(true);
          break;

        default:
          if (isPrintableCharacter(_char)) {
            this.menu.setFocusByFirstCharacter(this, _char);
            flag = true;
          }

          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    MenubarItem.prototype.setExpanded = function (value) {
      if (value) {
        this.domNode.setAttribute('aria-expanded', 'true');
      } else {
        this.domNode.setAttribute('aria-expanded', 'false');
      }
    };

    MenubarItem.prototype.handleFocus = function (event) {
      this.menu.hasFocus = true;
    };

    MenubarItem.prototype.handleBlur = function (event) {
      this.menu.hasFocus = false;
    };

    MenubarItem.prototype.handleMouseover = function (event) {
      this.hasHover = true;
      this.popupMenu.open();
    };

    MenubarItem.prototype.handleMouseout = function (event) {
      this.hasHover = false;
      setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
    }; // MenubarLinks.js

    /*
    *   This content is licensed according to the W3C Software License at
    *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
    */


    var Menubar = function Menubar(domNode) {
      var elementChildren,
          msgPrefix = 'Menubar constructor argument menubarNode '; // Check whether menubarNode is a DOM element

      if (!(domNode instanceof Element)) {
        throw new TypeError(msgPrefix + 'is not a DOM Element.');
      } // Check whether menubarNode has descendant elements


      if (domNode.childElementCount === 0) {
        throw new Error(msgPrefix + 'has no element children.');
      } // Check whether menubarNode has A elements


      var e = domNode.firstElementChild;

      while (e) {
        var menubarItem = e.firstElementChild;

        if (e && menubarItem && menubarItem.tagName !== 'A') {
          throw new Error(msgPrefix + 'has child elements are not A elements.');
        }

        e = e.nextElementSibling;
      }

      this.isMenubar = true;
      this.domNode = domNode;
      this.menubarItems = []; // See Menubar init method

      this.firstChars = []; // See Menubar init method

      this.firstItem = null; // See Menubar init method

      this.lastItem = null; // See Menubar init method

      this.hasFocus = false; // See MenubarItem handleFocus, handleBlur

      this.hasHover = false; // See Menubar handleMouseover, handleMouseout
    };
    /*
    *   @method Menubar.prototype.init
    *
    *   @desc
    *       Adds ARIA role to the menubar node
    *       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
    *       and populate menuitems array. Initialize firstItem and lastItem properties.
    */


    Menubar.prototype.init = function () {
      var menubarItem, childElement, menuElement, textContent, numItems; // Traverse the element children of menubarNode: configure each with
      // menuitem role behavior and store reference in menuitems array.

      var elem = this.domNode.firstElementChild;

      while (elem) {
        menuElement = elem.firstElementChild;

        if (elem && menuElement && menuElement.tagName === 'A') {
          menubarItem = new MenubarItem(menuElement, this);
          menubarItem.init();
          this.menubarItems.push(menubarItem);
          textContent = menuElement.textContent.trim();
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
        }

        elem = elem.nextElementSibling;
      } // Use populated menuitems array to initialize firstItem and lastItem.


      numItems = this.menubarItems.length;

      if (numItems > 0) {
        this.firstItem = this.menubarItems[0];
        this.lastItem = this.menubarItems[numItems - 1];
      }

      this.firstItem.domNode.tabIndex = 0;
    };
    /* FOCUS MANAGEMENT METHODS */


    Menubar.prototype.setFocusToItem = function (newItem) {
      var flag = false;

      for (var i = 0; i < this.menubarItems.length; i++) {
        var mbi = this.menubarItems[i];

        if (mbi.domNode.tabIndex == 0) {
          flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
        }

        mbi.domNode.tabIndex = -1;

        if (mbi.popupMenu) {
          mbi.popupMenu.close();
        }
      }

      newItem.domNode.focus();
      newItem.domNode.tabIndex = 0;

      if (flag && newItem.popupMenu) {
        newItem.popupMenu.open();
      }
    };

    Menubar.prototype.setFocusToFirstItem = function (flag) {
      this.setFocusToItem(this.firstItem);
    };

    Menubar.prototype.setFocusToLastItem = function (flag) {
      this.setFocusToItem(this.lastItem);
    };

    Menubar.prototype.setFocusToPreviousItem = function (currentItem) {
      var index;

      if (currentItem === this.firstItem) {
        newItem = this.lastItem;
      } else {
        index = this.menubarItems.indexOf(currentItem);
        newItem = this.menubarItems[index - 1];
      }

      this.setFocusToItem(newItem);
    };

    Menubar.prototype.setFocusToNextItem = function (currentItem) {
      var index;

      if (currentItem === this.lastItem) {
        newItem = this.firstItem;
      } else {
        index = this.menubarItems.indexOf(currentItem);
        newItem = this.menubarItems[index + 1];
      }

      this.setFocusToItem(newItem);
    };

    Menubar.prototype.setFocusByFirstCharacter = function (currentItem, _char2) {
      var start, index;
      var flag = currentItem.domNode.getAttribute('aria-expanded') === 'true';
      _char2 = _char2.toLowerCase(); // Get start index for search based on position of currentItem

      start = this.menubarItems.indexOf(currentItem) + 1;

      if (start === this.menubarItems.length) {
        start = 0;
      } // Check remaining slots in the menu


      index = this.getIndexFirstChars(start, _char2); // If not found in remaining slots, check from beginning

      if (index === -1) {
        index = this.getIndexFirstChars(0, _char2);
      } // If match was found...


      if (index > -1) {
        this.setFocusToItem(this.menubarItems[index]);
      }
    };

    Menubar.prototype.getIndexFirstChars = function (startIndex, _char3) {
      for (var i = startIndex; i < this.firstChars.length; i++) {
        if (_char3 === this.firstChars[i]) {
          return i;
        }
      }

      return -1;
    }; // PopupMenuItemLinks.js

    /*
    *   This content is licensed according to the W3C Software License at
    *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
    */


    var MenuItem = function MenuItem(domNode, menuObj) {
      if (typeof_typeof(popupObj) !== 'object') {
        var popupObj = false;
      }

      this.domNode = domNode;
      this.menu = menuObj;
      this.popupMenu = false;
      this.isMenubarItem = false;
      this.keyCode = Object.freeze({
        'TAB': 9,
        'RETURN': 13,
        'ESC': 27,
        'SPACE': 32,
        'PAGEUP': 33,
        'PAGEDOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT': 37,
        'UP': 38,
        'RIGHT': 39,
        'DOWN': 40
      });
    };

    MenuItem.prototype.init = function () {
      this.domNode.tabIndex = -1;
      this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
      this.domNode.addEventListener('click', this.handleClick.bind(this));
      this.domNode.addEventListener('focus', this.handleFocus.bind(this));
      this.domNode.addEventListener('blur', this.handleBlur.bind(this));
      this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
      this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this)); // Initialize flyout menu

      var nextElement = this.domNode.nextElementSibling;

      if (nextElement && nextElement.tagName === 'UL') {
        this.popupMenu = new PopupMenu(nextElement, this);
        this.popupMenu.init();
      }
    };

    MenuItem.prototype.isExpanded = function () {
      return this.domNode.getAttribute('aria-expanded') === 'true';
    };
    /* EVENT HANDLERS */


    MenuItem.prototype.handleKeydown = function (event) {
      var tgt = event.currentTarget,
          _char4 = event.key,
          flag = false,
          clickEvent;

      function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      }

      switch (event.keyCode) {
        case this.keyCode.SPACE:
        case this.keyCode.RETURN:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
          } else {
            // Create simulated mouse event to mimic the behavior of ATs
            // and let the event handler handleClick do the housekeeping.
            try {
              clickEvent = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
            } catch (err) {
              if (document.createEvent) {
                // DOM Level 3 for IE 9+
                clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent('click', true, true);
              }
            }

            tgt.dispatchEvent(clickEvent);
          }

          flag = true;
          break;

        case this.keyCode.UP:
          this.menu.setFocusToPreviousItem(this);
          flag = true;
          break;

        case this.keyCode.DOWN:
          this.menu.setFocusToNextItem(this);
          flag = true;
          break;

        case this.keyCode.LEFT:
          this.menu.setFocusToController('previous', true);
          this.menu.close(true);
          flag = true;
          break;

        case this.keyCode.RIGHT:
          if (this.popupMenu) {
            this.popupMenu.open();
            this.popupMenu.setFocusToFirstItem();
          } else {
            this.menu.setFocusToController('next', true);
            this.menu.close(true);
          }

          flag = true;
          break;

        case this.keyCode.HOME:
        case this.keyCode.PAGEUP:
          this.menu.setFocusToFirstItem();
          flag = true;
          break;

        case this.keyCode.END:
        case this.keyCode.PAGEDOWN:
          this.menu.setFocusToLastItem();
          flag = true;
          break;

        case this.keyCode.ESC:
          this.menu.setFocusToController();
          this.menu.close(true);
          flag = true;
          break;

        case this.keyCode.TAB:
          this.menu.setFocusToController();
          break;

        default:
          if (isPrintableCharacter(_char4)) {
            this.menu.setFocusByFirstCharacter(this, _char4);
            flag = true;
          }

          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

    MenuItem.prototype.setExpanded = function (value) {
      if (value) {
        this.domNode.setAttribute('aria-expanded', 'true');
      } else {
        this.domNode.setAttribute('aria-expanded', 'false');
      }
    };

    MenuItem.prototype.handleClick = function (event) {
      this.menu.setFocusToController();
      this.menu.close(true);
    };

    MenuItem.prototype.handleFocus = function (event) {
      this.menu.hasFocus = true;
    };

    MenuItem.prototype.handleBlur = function (event) {
      this.menu.hasFocus = false;
      setTimeout(this.menu.close.bind(this.menu, false), 300);
    };

    MenuItem.prototype.handleMouseover = function (event) {
      this.menu.hasHover = true;
      this.menu.open();

      if (this.popupMenu) {
        this.popupMenu.hasHover = true;
        this.popupMenu.open();
      }
    };

    MenuItem.prototype.handleMouseout = function (event) {
      if (this.popupMenu) {
        this.popupMenu.hasHover = false;
        this.popupMenu.close(true);
      }

      this.menu.hasHover = false;
      setTimeout(this.menu.close.bind(this.menu, false), 300);
    }; // PopupMenuLinks.js

    /*
    *   This content is licensed according to the W3C Software License at
    *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
    */


    var PopupMenu = function PopupMenu(domNode, controllerObj) {
      var elementChildren,
          msgPrefix = 'PopupMenu constructor argument domNode '; // Check whether domNode is a DOM element

      if (!(domNode instanceof Element)) {
        throw new TypeError(msgPrefix + 'is not a DOM Element.');
      } // Check whether domNode has child elements


      if (domNode.childElementCount === 0) {
        throw new Error(msgPrefix + 'has no element children.');
      } // Check whether domNode descendant elements have A elements


      var childElement = domNode.firstElementChild;

      while (childElement) {
        var menuitem = childElement.firstElementChild;

        if (menuitem && menuitem === 'A') {
          throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
        }

        childElement = childElement.nextElementSibling;
      }

      this.isMenubar = false;
      this.domNode = domNode;
      this.controller = controllerObj;
      this.menuitems = []; // See PopupMenu init method

      this.firstChars = []; // See PopupMenu init method

      this.firstItem = null; // See PopupMenu init method

      this.lastItem = null; // See PopupMenu init method

      this.hasFocus = false; // See MenuItem handleFocus, handleBlur

      this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
    };
    /*
    *   @method PopupMenu.prototype.init
    *
    *   @desc
    *       Add domNode event listeners for mouseover and mouseout. Traverse
    *       domNode children to configure each menuitem and populate menuitems
    *       array. Initialize firstItem and lastItem properties.
    */


    PopupMenu.prototype.init = function () {
      var childElement, menuElement, menuItem, textContent, numItems, label; // Configure the domNode itself

      this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
      this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this)); // Traverse the element children of domNode: configure each with
      // menuitem role behavior and store reference in menuitems array.

      childElement = this.domNode.firstElementChild;

      while (childElement) {
        menuElement = childElement.firstElementChild;

        if (menuElement && menuElement.tagName === 'A') {
          menuItem = new MenuItem(menuElement, this);
          menuItem.init();
          this.menuitems.push(menuItem);
          textContent = menuElement.textContent.trim();
          this.firstChars.push(textContent.substring(0, 1).toLowerCase());
        }

        childElement = childElement.nextElementSibling;
      } // Use populated menuitems array to initialize firstItem and lastItem.


      numItems = this.menuitems.length;

      if (numItems > 0) {
        this.firstItem = this.menuitems[0];
        this.lastItem = this.menuitems[numItems - 1];
      }
    };
    /* EVENT HANDLERS */


    PopupMenu.prototype.handleMouseover = function (event) {
      this.hasHover = true;
    };

    PopupMenu.prototype.handleMouseout = function (event) {
      this.hasHover = false;
      setTimeout(this.close.bind(this, false), 1);
    };
    /* FOCUS MANAGEMENT METHODS */


    PopupMenu.prototype.setFocusToController = function (command, flag) {
      if (typeof command !== 'string') {
        command = '';
      }

      function setFocusToMenubarItem(controller, close) {
        while (controller) {
          if (controller.isMenubarItem) {
            controller.domNode.focus();
            return controller;
          } else {
            if (close) {
              controller.menu.close(true);
            }

            controller.hasFocus = false;
          }

          controller = controller.menu.controller;
        }

        return false;
      }

      if (command === '') {
        if (this.controller && this.controller.domNode) {
          this.controller.domNode.focus();
        }

        return;
      }

      if (!this.controller.isMenubarItem) {
        this.controller.domNode.focus();
        this.close();

        if (command === 'next') {
          var menubarItem = setFocusToMenubarItem(this.controller, false);

          if (menubarItem) {
            menubarItem.menu.setFocusToNextItem(menubarItem, flag);
          }
        }
      } else {
        if (command === 'previous') {
          this.controller.menu.setFocusToPreviousItem(this.controller, flag);
        } else if (command === 'next') {
          this.controller.menu.setFocusToNextItem(this.controller, flag);
        }
      }
    };

    PopupMenu.prototype.setFocusToFirstItem = function () {
      this.firstItem.domNode.focus();
    };

    PopupMenu.prototype.setFocusToLastItem = function () {
      this.lastItem.domNode.focus();
    };

    PopupMenu.prototype.setFocusToPreviousItem = function (currentItem) {
      var index;

      if (currentItem === this.firstItem) {
        this.lastItem.domNode.focus();
      } else {
        index = this.menuitems.indexOf(currentItem);
        this.menuitems[index - 1].domNode.focus();
      }
    };

    PopupMenu.prototype.setFocusToNextItem = function (currentItem) {
      var index;

      if (currentItem === this.lastItem) {
        this.firstItem.domNode.focus();
      } else {
        index = this.menuitems.indexOf(currentItem);
        this.menuitems[index + 1].domNode.focus();
      }
    };

    PopupMenu.prototype.setFocusByFirstCharacter = function (currentItem, _char5) {
      var start, index;
      _char5 = _char5.toLowerCase(); // Get start index for search based on position of currentItem

      start = this.menuitems.indexOf(currentItem) + 1;

      if (start === this.menuitems.length) {
        start = 0;
      } // Check remaining slots in the menu


      index = this.getIndexFirstChars(start, _char5); // If not found in remaining slots, check from beginning

      if (index === -1) {
        index = this.getIndexFirstChars(0, _char5);
      } // If match was found...


      if (index > -1) {
        this.menuitems[index].domNode.focus();
      }
    };

    PopupMenu.prototype.getIndexFirstChars = function (startIndex, _char6) {
      for (var i = startIndex; i < this.firstChars.length; i++) {
        if (_char6 === this.firstChars[i]) {
          return i;
        }
      }

      return -1;
    };
    /* MENU DISPLAY METHODS */


    PopupMenu.prototype.open = function () {
      // Get position and bounding rectangle of controller object's DOM node
      var rect = this.controller.domNode.getBoundingClientRect(); // Set CSS properties

      if (!this.controller.isMenubarItem) {
        this.domNode.parentNode.style.position = 'relative';
        this.domNode.style.display = 'block';
        this.domNode.style.position = 'absolute';
        this.domNode.style.left = rect.width + 'px';
        this.domNode.style.zIndex = 100;
      } else {
        this.domNode.style.display = 'block';
        this.domNode.style.position = 'absolute'; //this.domNode.style.top = (rect.height - 1) + 'px';

        this.domNode.style.zIndex = 100;
      }

      this.controller.setExpanded(true);
    };

    PopupMenu.prototype.close = function (force) {
      var controllerHasHover = this.controller.hasHover;
      var hasFocus = this.hasFocus;

      for (var i = 0; i < this.menuitems.length; i++) {
        var mi = this.menuitems[i];

        if (mi.popupMenu) {
          hasFocus = hasFocus | mi.popupMenu.hasFocus;
        }
      }

      if (!this.controller.isMenubarItem) {
        controllerHasHover = false;
      }

      if (force || !hasFocus && !this.hasHover && !controllerHasHover) {
        this.domNode.style.display = 'none';
        this.domNode.style.zIndex = 0;
        this.controller.setExpanded(false);
      }
    };

    var menubar = new Menubar(document.getElementById('main-menu'));

    if (menubar) {
      menubar.init();
    }
  }
};
;// CONCATENATED MODULE: ./src/index.ts
// import { Options, App } from "@4site/engrid-common"; // Uses ENGrid via NPM
 // Uses ENGrid via Visual Studio Workspace



var options = {
  applePay: false,
  CapitalizeFields: true,
  ClickToExpand: true,
  CurrencySymbol: '$',
  CurrencySeparator: '.',
  MediaAttribution: true,
  SkipToMainContentLink: true,
  SrcDefer: true,
  Debug: App.getUrlParameter('debug') == 'true' ? true : false,
  onLoad: function onLoad() {
    return console.log("Starter Theme Loaded");
  },
  onResize: function onResize() {
    return console.log("Starter Theme Window Resized");
  }
};
new App(options);
})();

/******/ })()
;