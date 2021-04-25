/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable no-inline-comments */
/* eslint-disable no-undef */
/* eslint-disable no-func-assign */
/* !
	* Bootstrap v5.0.0-beta2 (https://getbootstrap.com/)
	* Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	*/
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
}(this, (function() {
	'use strict';

	function _defineProperties(target, props) {
		for (let i = 0; i < props.length; i++) {
			const descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ('value' in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}

	function _createClass(Constructor, protoProps, staticProps) {
		if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		if (staticProps) _defineProperties(Constructor, staticProps);
		return Constructor;
	}

	function _extends() {
		_extends = Object.assign || function(target) {
			for (let i = 1; i < arguments.length; i++) {
				const source = arguments[i];

				for (const key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}

			return target;
		};

		return _extends.apply(this, arguments);
	}

	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;

		_setPrototypeOf(subClass, superClass);
	}

	function _setPrototypeOf(o, p) {
		_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
			o.__proto__ = p;
			return o;
		};

		return _setPrototypeOf(o, p);
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): util/index.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const MAX_UID = 1000000;
	const MILLISECONDS_MULTIPLIER = 1000;
	const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	const toType = function toType(obj) {
		if (obj === null || obj === undefined) {
			return '' + obj;
		}

		return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	};
	/**
	 * --------------------------------------------------------------------------
	 * Public Util Api
	 * --------------------------------------------------------------------------
	 */


	const getUID = function getUID(prefix) {
		do {
			prefix += Math.floor(Math.random() * MAX_UID);
		} while (document.getElementById(prefix));

		return prefix;
	};

	const getSelector = function getSelector(element) {
		let selector = element.getAttribute('data-bs-target');

		if (!selector || selector === '#') {
			let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			// so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			// `document.querySelector` will rightfully complain it is invalid.
			// See https://github.com/twbs/bootstrap/issues/32273

			if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
				return null;
			} // Just in case some CMS puts out a full URL with the anchor appended


			if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
				hrefAttr = '#' + hrefAttr.split('#')[1];
			}

			selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
		}

		return selector;
	};

	const getSelectorFromElement = function getSelectorFromElement(element) {
		const selector = getSelector(element);

		if (selector) {
			return document.querySelector(selector) ? selector : null;
		}

		return null;
	};

	const getElementFromSelector = function getElementFromSelector(element) {
		const selector = getSelector(element);
		return selector ? document.querySelector(selector) : null;
	};

	const getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
		if (!element) {
			return 0;
		} // Get transition-duration of the element


		let _window$getComputedSt = window.getComputedStyle(element),
			transitionDuration = _window$getComputedSt.transitionDuration,
			transitionDelay = _window$getComputedSt.transitionDelay;

		const floatTransitionDuration = Number.parseFloat(transitionDuration);
		const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

		if (!floatTransitionDuration && !floatTransitionDelay) {
			return 0;
		} // If multiple durations are defined, take the first


		transitionDuration = transitionDuration.split(',')[0];
		transitionDelay = transitionDelay.split(',')[0];
		return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};

	const triggerTransitionEnd = function triggerTransitionEnd(element) {
		element.dispatchEvent(new Event(TRANSITION_END));
	};

	const isElement = function isElement(obj) {
		return (obj[0] || obj).nodeType;
	};

	const emulateTransitionEnd = function emulateTransitionEnd(element, duration) {
		let called = false;
		const durationPadding = 5;
		const emulatedDuration = duration + durationPadding;

		function listener() {
			called = true;
			element.removeEventListener(TRANSITION_END, listener);
		}

		element.addEventListener(TRANSITION_END, listener);
		setTimeout(function() {
			if (!called) {
				triggerTransitionEnd(element);
			}
		}, emulatedDuration);
	};

	const typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
		Object.keys(configTypes).forEach(function(property) {
			const expectedTypes = configTypes[property];
			const value = config[property];
			const valueType = value && isElement(value) ? 'element' : toType(value);

			if (!new RegExp(expectedTypes).test(valueType)) {
				throw new TypeError(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
			}
		});
	};

	const isVisible = function isVisible(element) {
		if (!element) {
			return false;
		}

		if (element.style && element.parentNode && element.parentNode.style) {
			const elementStyle = getComputedStyle(element);
			const parentNodeStyle = getComputedStyle(element.parentNode);
			return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
		}

		return false;
	};

	const findShadowRoot = function findShadowRoot(element) {
		if (!document.documentElement.attachShadow) {
			return null;
		} // Can find the shadow root otherwise it'll return the document


		if (typeof element.getRootNode === 'function') {
			const root = element.getRootNode();
			return root instanceof ShadowRoot ? root : null;
		}

		if (element instanceof ShadowRoot) {
			return element;
		} // when we don't find a shadow root


		if (!element.parentNode) {
			return null;
		}

		return findShadowRoot(element.parentNode);
	};

	const noop = function noop() {
		return function() {};
	};

	const reflow = function reflow(element) {
		return element.offsetHeight;
	};

	const getjQuery = function getjQuery() {
		const _window = window,
			jQuery = _window.jQuery;

		if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			return jQuery;
		}

		return null;
	};

	const onDOMContentLoaded = function onDOMContentLoaded(callback) {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', callback);
		} else {
			callback();
		}
	};

	const isRTL = document.documentElement.dir === 'rtl';

	const defineJQueryPlugin = function defineJQueryPlugin(name, plugin) {
		onDOMContentLoaded(function() {
			const $ = getjQuery();
			/* istanbul ignore if */

			if ($) {
				const JQUERY_NO_CONFLICT = $.fn[name];
				$.fn[name] = plugin.jQueryInterface;
				$.fn[name].Constructor = plugin;

				$.fn[name].noConflict = function() {
					$.fn[name] = JQUERY_NO_CONFLICT;
					return plugin.jQueryInterface;
				};
			}
		});
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): dom/data.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */
	const mapData = function() {
		const storeData = {};
		let id = 1;
		return {
			set: function set(element, key, data) {
				if (typeof element.bsKey === 'undefined') {
					element.bsKey = {
						key: key,
						id: id,
					};
					id++;
				}

				storeData[element.bsKey.id] = data;
			},
			get: function get(element, key) {
				if (!element || typeof element.bsKey === 'undefined') {
					return null;
				}

				const keyProperties = element.bsKey;

				if (keyProperties.key === key) {
					return storeData[keyProperties.id];
				}

				return null;
			},
			delete: function _delete(element, key) {
				if (typeof element.bsKey === 'undefined') {
					return;
				}

				const keyProperties = element.bsKey;

				if (keyProperties.key === key) {
					delete storeData[keyProperties.id];
					delete element.bsKey;
				}
			},
		};
	}();

	const Data = {
		setData: function setData(instance, key, data) {
			mapData.set(instance, key, data);
		},
		getData: function getData(instance, key) {
			return mapData.get(instance, key);
		},
		removeData: function removeData(instance, key) {
			mapData.delete(instance, key);
		},
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): dom/event-handler.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	const stripNameRegex = /\..*/;
	const stripUidRegex = /::\d+$/;
	const eventRegistry = {}; // Events storage

	let uidEvent = 1;
	const customEvents = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
	};
	const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	/**
	 * ------------------------------------------------------------------------
	 * Private methods
	 * ------------------------------------------------------------------------
	 */

	function getUidEvent(element, uid) {
		return uid && uid + '::' + uidEvent++ || element.uidEvent || uidEvent++;
	}

	function getEvent(element) {
		const uid = getUidEvent(element);
		element.uidEvent = uid;
		eventRegistry[uid] = eventRegistry[uid] || {};
		return eventRegistry[uid];
	}

	function bootstrapHandler(element, fn) {
		return function handler(event) {
			event.delegateTarget = element;

			if (handler.oneOff) {
				EventHandler.off(element, event.type, fn);
			}

			return fn.apply(element, [event]);
		};
	}

	function bootstrapDelegationHandler(element, selector, fn) {
		return function handler(event) {
			const domElements = element.querySelectorAll(selector);

			for (let target = event.target; target && target !== this; target = target.parentNode) {
				for (let i = domElements.length; i--;) {
					if (domElements[i] === target) {
						event.delegateTarget = target;

						if (handler.oneOff) {
							EventHandler.off(element, event.type, fn);
						}

						return fn.apply(target, [event]);
					}
				}
			} // To please ESLint


			return null;
		};
	}

	function findHandler(events, handler, delegationSelector) {
		if (delegationSelector === void 0) {
			delegationSelector = null;
		}

		const uidEventList = Object.keys(events);

		for (let i = 0, len = uidEventList.length; i < len; i++) {
			const event = events[uidEventList[i]];

			if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
				return event;
			}
		}

		return null;
	}

	function normalizeParams(originalTypeEvent, handler, delegationFn) {
		const delegation = typeof handler === 'string';
		const originalHandler = delegation ? delegationFn : handler; // allow to get the native events from namespaced events ('click.bs.button' --> 'click')

		let typeEvent = originalTypeEvent.replace(stripNameRegex, '');
		const custom = customEvents[typeEvent];

		if (custom) {
			typeEvent = custom;
		}

		const isNative = nativeEvents.has(typeEvent);

		if (!isNative) {
			typeEvent = originalTypeEvent;
		}

		return [delegation, originalHandler, typeEvent];
	}

	function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
		if (typeof originalTypeEvent !== 'string' || !element) {
			return;
		}

		if (!handler) {
			handler = delegationFn;
			delegationFn = null;
		}

		const _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
			delegation = _normalizeParams[0],
			originalHandler = _normalizeParams[1],
			typeEvent = _normalizeParams[2];

		const events = getEvent(element);
		const handlers = events[typeEvent] || (events[typeEvent] = {});
		const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

		if (previousFn) {
			previousFn.oneOff = previousFn.oneOff && oneOff;
			return;
		}

		const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
		const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
		fn.delegationSelector = delegation ? handler : null;
		fn.originalHandler = originalHandler;
		fn.oneOff = oneOff;
		fn.uidEvent = uid;
		handlers[uid] = fn;
		element.addEventListener(typeEvent, fn, delegation);
	}

	function removeHandler(element, events, typeEvent, handler, delegationSelector) {
		const fn = findHandler(events[typeEvent], handler, delegationSelector);

		if (!fn) {
			return;
		}

		element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
		delete events[typeEvent][fn.uidEvent];
	}

	function removeNamespacedHandlers(element, events, typeEvent, namespace) {
		const storeElementEvent = events[typeEvent] || {};
		Object.keys(storeElementEvent).forEach(function(handlerKey) {
			if (handlerKey.includes(namespace)) {
				const event = storeElementEvent[handlerKey];
				removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
			}
		});
	}

	var EventHandler = {
		on: function on(element, event, handler, delegationFn) {
			addHandler(element, event, handler, delegationFn, false);
		},
		one: function one(element, event, handler, delegationFn) {
			addHandler(element, event, handler, delegationFn, true);
		},
		off: function off(element, originalTypeEvent, handler, delegationFn) {
			if (typeof originalTypeEvent !== 'string' || !element) {
				return;
			}

			const _normalizeParams2 = normalizeParams(originalTypeEvent, handler, delegationFn),
				delegation = _normalizeParams2[0],
				originalHandler = _normalizeParams2[1],
				typeEvent = _normalizeParams2[2];

			const inNamespace = typeEvent !== originalTypeEvent;
			const events = getEvent(element);
			const isNamespace = originalTypeEvent.startsWith('.');

			if (typeof originalHandler !== 'undefined') {
				// Simplest case: handler is passed, remove that listener ONLY.
				if (!events || !events[typeEvent]) {
					return;
				}

				removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
				return;
			}

			if (isNamespace) {
				Object.keys(events).forEach(function(elementEvent) {
					removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
				});
			}

			const storeElementEvent = events[typeEvent] || {};
			Object.keys(storeElementEvent).forEach(function(keyHandlers) {
				const handlerKey = keyHandlers.replace(stripUidRegex, '');

				if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
					const event = storeElementEvent[keyHandlers];
					removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
				}
			});
		},
		trigger: function trigger(element, event, args) {
			if (typeof event !== 'string' || !element) {
				return null;
			}

			const $ = getjQuery();
			const typeEvent = event.replace(stripNameRegex, '');
			const inNamespace = event !== typeEvent;
			const isNative = nativeEvents.has(typeEvent);
			let jQueryEvent;
			let bubbles = true;
			let nativeDispatch = true;
			let defaultPrevented = false;
			let evt = null;

			if (inNamespace && $) {
				jQueryEvent = $.Event(event, args);
				$(element).trigger(jQueryEvent);
				bubbles = !jQueryEvent.isPropagationStopped();
				nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
				defaultPrevented = jQueryEvent.isDefaultPrevented();
			}

			if (isNative) {
				evt = document.createEvent('HTMLEvents');
				evt.initEvent(typeEvent, bubbles, true);
			} else {
				evt = new CustomEvent(event, {
					bubbles: bubbles,
					cancelable: true,
				});
			} // merge custom information in our event


			if (typeof args !== 'undefined') {
				Object.keys(args).forEach(function(key) {
					Object.defineProperty(evt, key, {
						get: function get() {
							return args[key];
						},
					});
				});
			}

			if (defaultPrevented) {
				evt.preventDefault();
			}

			if (nativeDispatch) {
				element.dispatchEvent(evt);
			}

			if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
				jQueryEvent.preventDefault();
			}

			return evt;
		},
	};

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const VERSION = '5.0.0-beta2';

	const BaseComponent = /* #__PURE__*/function() {
		function BaseComponent(element) {
			if (!element) {
				return;
			}

			this._element = element;
			Data.setData(element, this.constructor.DATA_KEY, this);
		}

		const _proto = BaseComponent.prototype;

		_proto.dispose = function dispose() {
			Data.removeData(this._element, this.constructor.DATA_KEY);
			this._element = null;
		}
		/** Static */
		;

		BaseComponent.getInstance = function getInstance(element) {
			return Data.getData(element, this.DATA_KEY);
		};

		_createClass(BaseComponent, null, [{
			key: 'VERSION',
			get: function get() {
				return VERSION;
			},
		}]);

		return BaseComponent;
	}();

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME = 'alert';
	const DATA_KEY = 'bs.alert';
	const EVENT_KEY = '.' + DATA_KEY;
	const DATA_API_KEY = '.data-api';
	const SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
	const EVENT_CLOSE = 'close' + EVENT_KEY;
	const EVENT_CLOSED = 'closed' + EVENT_KEY;
	const EVENT_CLICK_DATA_API = 'click' + EVENT_KEY + DATA_API_KEY;
	const CLASS_NAME_ALERT = 'alert';
	const CLASS_NAME_FADE = 'fade';
	const CLASS_NAME_SHOW = 'show';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Alert = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Alert, _BaseComponent);

		function Alert() {
			return _BaseComponent.apply(this, arguments) || this;
		}

		const _proto = Alert.prototype;

		// Public
		_proto.close = function close(element) {
			const rootElement = element ? this._getRootElement(element) : this._element;

			const customEvent = this._triggerCloseEvent(rootElement);

			if (customEvent === null || customEvent.defaultPrevented) {
				return;
			}

			this._removeElement(rootElement);
		} // Private
		;

		_proto._getRootElement = function _getRootElement(element) {
			return getElementFromSelector(element) || element.closest('.' + CLASS_NAME_ALERT);
		};

		_proto._triggerCloseEvent = function _triggerCloseEvent(element) {
			return EventHandler.trigger(element, EVENT_CLOSE);
		};

		_proto._removeElement = function _removeElement(element) {
			const _this = this;

			element.classList.remove(CLASS_NAME_SHOW);

			if (!element.classList.contains(CLASS_NAME_FADE)) {
				this._destroyElement(element);

				return;
			}

			const transitionDuration = getTransitionDurationFromElement(element);
			EventHandler.one(element, 'transitionend', function() {
				return _this._destroyElement(element);
			});
			emulateTransitionEnd(element, transitionDuration);
		};

		_proto._destroyElement = function _destroyElement(element) {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}

			EventHandler.trigger(element, EVENT_CLOSED);
		} // Static
		;

		Alert.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY);

				if (!data) {
					data = new Alert(this);
				}

				if (config === 'close') {
					data[config](this);
				}
			});
		};

		Alert.handleDismiss = function handleDismiss(alertInstance) {
			return function(event) {
				if (event) {
					event.preventDefault();
				}

				alertInstance.close(this);
			};
		};

		_createClass(Alert, null, [{
			key: 'DATA_KEY',
			get: // Getters
			function get() {
				return DATA_KEY;
			},
		}]);

		return Alert;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Alert to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME, Alert);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$1 = 'button';
	const DATA_KEY$1 = 'bs.button';
	const EVENT_KEY$1 = '.' + DATA_KEY$1;
	const DATA_API_KEY$1 = '.data-api';
	const CLASS_NAME_ACTIVE = 'active';
	const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
	const EVENT_CLICK_DATA_API$1 = 'click' + EVENT_KEY$1 + DATA_API_KEY$1;
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Button = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Button, _BaseComponent);

		function Button() {
			return _BaseComponent.apply(this, arguments) || this;
		}

		const _proto = Button.prototype;

		// Public
		_proto.toggle = function toggle() {
			// Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
			this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		} // Static
		;

		Button.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY$1);

				if (!data) {
					data = new Button(this);
				}

				if (config === 'toggle') {
					data[config]();
				}
			});
		};

		_createClass(Button, null, [{
			key: 'DATA_KEY',
			get: // Getters
			function get() {
				return DATA_KEY$1;
			},
		}]);

		return Button;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE, function(event) {
		event.preventDefault();
		const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		let data = Data.getData(button, DATA_KEY$1);

		if (!data) {
			data = new Button(button);
		}

		data.toggle();
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Button to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$1, Button);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): dom/manipulator.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	function normalizeData(val) {
		if (val === 'true') {
			return true;
		}

		if (val === 'false') {
			return false;
		}

		if (val === Number(val).toString()) {
			return Number(val);
		}

		if (val === '' || val === 'null') {
			return null;
		}

		return val;
	}

	function normalizeDataKey(key) {
		return key.replace(/[A-Z]/g, function(chr) {
			return '-' + chr.toLowerCase();
		});
	}

	const Manipulator = {
		setDataAttribute: function setDataAttribute(element, key, value) {
			element.setAttribute('data-bs-' + normalizeDataKey(key), value);
		},
		removeDataAttribute: function removeDataAttribute(element, key) {
			element.removeAttribute('data-bs-' + normalizeDataKey(key));
		},
		getDataAttributes: function getDataAttributes(element) {
			if (!element) {
				return {};
			}

			const attributes = {};
			Object.keys(element.dataset).filter(function(key) {
				return key.startsWith('bs');
			}).forEach(function(key) {
				let pureKey = key.replace(/^bs/, '');
				pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
				attributes[pureKey] = normalizeData(element.dataset[key]);
			});
			return attributes;
		},
		getDataAttribute: function getDataAttribute(element, key) {
			return normalizeData(element.getAttribute('data-bs-' + normalizeDataKey(key)));
		},
		offset: function offset(element) {
			const rect = element.getBoundingClientRect();
			return {
				top: rect.top + document.body.scrollTop,
				left: rect.left + document.body.scrollLeft,
			};
		},
		position: function position(element) {
			return {
				top: element.offsetTop,
				left: element.offsetLeft,
			};
		},
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): dom/selector-engine.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */
	const NODE_TEXT = 3;
	const SelectorEngine = {
		find: function find(selector, element) {
			let _ref;

			if (element === void 0) {
				element = document.documentElement;
			}

			return (_ref = []).concat.apply(_ref, Element.prototype.querySelectorAll.call(element, selector));
		},
		findOne: function findOne(selector, element) {
			if (element === void 0) {
				element = document.documentElement;
			}

			return Element.prototype.querySelector.call(element, selector);
		},
		children: function children(element, selector) {
			let _ref2;

			return (_ref2 = []).concat.apply(_ref2, element.children).filter(function(child) {
				return child.matches(selector);
			});
		},
		parents: function parents(element, selector) {
			const parents = [];
			let ancestor = element.parentNode;

			while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
				if (ancestor.matches(selector)) {
					parents.push(ancestor);
				}

				ancestor = ancestor.parentNode;
			}

			return parents;
		},
		prev: function prev(element, selector) {
			let previous = element.previousElementSibling;

			while (previous) {
				if (previous.matches(selector)) {
					return [previous];
				}

				previous = previous.previousElementSibling;
			}

			return [];
		},
		next: function next(element, selector) {
			let next = element.nextElementSibling;

			while (next) {
				if (next.matches(selector)) {
					return [next];
				}

				next = next.nextElementSibling;
			}

			return [];
		},
	};

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$2 = 'carousel';
	const DATA_KEY$2 = 'bs.carousel';
	const EVENT_KEY$2 = '.' + DATA_KEY$2;
	const DATA_API_KEY$2 = '.data-api';
	const ARROW_LEFT_KEY = 'ArrowLeft';
	const ARROW_RIGHT_KEY = 'ArrowRight';
	const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	const SWIPE_THRESHOLD = 40;
	const Default = {
		interval: 5000,
		keyboard: true,
		slide: false,
		pause: 'hover',
		wrap: true,
		touch: true,
	};
	const DefaultType = {
		interval: '(number|boolean)',
		keyboard: 'boolean',
		slide: '(boolean|string)',
		pause: '(string|boolean)',
		wrap: 'boolean',
		touch: 'boolean',
	};
	const DIRECTION_NEXT = 'next';
	const DIRECTION_PREV = 'prev';
	const DIRECTION_LEFT = 'left';
	const DIRECTION_RIGHT = 'right';
	const EVENT_SLIDE = 'slide' + EVENT_KEY$2;
	const EVENT_SLID = 'slid' + EVENT_KEY$2;
	const EVENT_KEYDOWN = 'keydown' + EVENT_KEY$2;
	const EVENT_MOUSEENTER = 'mouseenter' + EVENT_KEY$2;
	const EVENT_MOUSELEAVE = 'mouseleave' + EVENT_KEY$2;
	const EVENT_TOUCHSTART = 'touchstart' + EVENT_KEY$2;
	const EVENT_TOUCHMOVE = 'touchmove' + EVENT_KEY$2;
	const EVENT_TOUCHEND = 'touchend' + EVENT_KEY$2;
	const EVENT_POINTERDOWN = 'pointerdown' + EVENT_KEY$2;
	const EVENT_POINTERUP = 'pointerup' + EVENT_KEY$2;
	const EVENT_DRAG_START = 'dragstart' + EVENT_KEY$2;
	const EVENT_LOAD_DATA_API = 'load' + EVENT_KEY$2 + DATA_API_KEY$2;
	const EVENT_CLICK_DATA_API$2 = 'click' + EVENT_KEY$2 + DATA_API_KEY$2;
	const CLASS_NAME_CAROUSEL = 'carousel';
	const CLASS_NAME_ACTIVE$1 = 'active';
	const CLASS_NAME_SLIDE = 'slide';
	const CLASS_NAME_END = 'carousel-item-end';
	const CLASS_NAME_START = 'carousel-item-start';
	const CLASS_NAME_NEXT = 'carousel-item-next';
	const CLASS_NAME_PREV = 'carousel-item-prev';
	const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	const SELECTOR_ACTIVE = '.active';
	const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	const SELECTOR_ITEM = '.carousel-item';
	const SELECTOR_ITEM_IMG = '.carousel-item img';
	const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	const SELECTOR_INDICATORS = '.carousel-indicators';
	const SELECTOR_INDICATOR = '[data-bs-target]';
	const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	const POINTER_TYPE_TOUCH = 'touch';
	const POINTER_TYPE_PEN = 'pen';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Carousel = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Carousel, _BaseComponent);

		function Carousel(element, config) {
			let _this;

			_this = _BaseComponent.call(this, element) || this;
			_this._items = null;
			_this._interval = null;
			_this._activeElement = null;
			_this._isPaused = false;
			_this._isSliding = false;
			_this.touchTimeout = null;
			_this.touchStartX = 0;
			_this.touchDeltaX = 0;
			_this._config = _this._getConfig(config);
			_this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element);
			_this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			_this._pointerEvent = Boolean(window.PointerEvent);

			_this._addEventListeners();

			return _this;
		} // Getters


		const _proto = Carousel.prototype;

		// Public
		_proto.next = function next() {
			if (!this._isSliding) {
				this._slide(DIRECTION_NEXT);
			}
		};

		_proto.nextWhenVisible = function nextWhenVisible() {
			// Don't call next when the page isn't visible
			// or the carousel or its parent isn't visible
			if (!document.hidden && isVisible(this._element)) {
				this.next();
			}
		};

		_proto.prev = function prev() {
			if (!this._isSliding) {
				this._slide(DIRECTION_PREV);
			}
		};

		_proto.pause = function pause(event) {
			if (!event) {
				this._isPaused = true;
			}

			if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
				triggerTransitionEnd(this._element);
				this.cycle(true);
			}

			clearInterval(this._interval);
			this._interval = null;
		};

		_proto.cycle = function cycle(event) {
			if (!event) {
				this._isPaused = false;
			}

			if (this._interval) {
				clearInterval(this._interval);
				this._interval = null;
			}

			if (this._config && this._config.interval && !this._isPaused) {
				this._updateInterval();

				this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
			}
		};

		_proto.to = function to(index) {
			const _this2 = this;

			this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

			const activeIndex = this._getItemIndex(this._activeElement);

			if (index > this._items.length - 1 || index < 0) {
				return;
			}

			if (this._isSliding) {
				EventHandler.one(this._element, EVENT_SLID, function() {
					return _this2.to(index);
				});
				return;
			}

			if (activeIndex === index) {
				this.pause();
				this.cycle();
				return;
			}

			const direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

			this._slide(direction, this._items[index]);
		};

		_proto.dispose = function dispose() {
			_BaseComponent.prototype.dispose.call(this);

			EventHandler.off(this._element, EVENT_KEY$2);
			this._items = null;
			this._config = null;
			this._interval = null;
			this._isPaused = null;
			this._isSliding = null;
			this._activeElement = null;
			this._indicatorsElement = null;
		} // Private
		;

		_proto._getConfig = function _getConfig(config) {
			config = _extends({}, Default, config);
			typeCheckConfig(NAME$2, config, DefaultType);
			return config;
		};

		_proto._handleSwipe = function _handleSwipe() {
			const absDeltax = Math.abs(this.touchDeltaX);

			if (absDeltax <= SWIPE_THRESHOLD) {
				return;
			}

			const direction = absDeltax / this.touchDeltaX;
			this.touchDeltaX = 0; // swipe left

			if (direction > 0) {
				if (isRTL) {
					this.next();
				} else {
					this.prev();
				}
			} // swipe right


			if (direction < 0) {
				if (isRTL) {
					this.prev();
				} else {
					this.next();
				}
			}
		};

		_proto._addEventListeners = function _addEventListeners() {
			const _this3 = this;

			if (this._config.keyboard) {
				EventHandler.on(this._element, EVENT_KEYDOWN, function(event) {
					return _this3._keydown(event);
				});
			}

			if (this._config.pause === 'hover') {
				EventHandler.on(this._element, EVENT_MOUSEENTER, function(event) {
					return _this3.pause(event);
				});
				EventHandler.on(this._element, EVENT_MOUSELEAVE, function(event) {
					return _this3.cycle(event);
				});
			}

			if (this._config.touch && this._touchSupported) {
				this._addTouchEventListeners();
			}
		};

		_proto._addTouchEventListeners = function _addTouchEventListeners() {
			const _this4 = this;

			const start = function start(event) {
				if (_this4._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
					_this4.touchStartX = event.clientX;
				} else if (!_this4._pointerEvent) {
					_this4.touchStartX = event.touches[0].clientX;
				}
			};

			const move = function move(event) {
				// ensure swiping with one touch and not pinching
				if (event.touches && event.touches.length > 1) {
					_this4.touchDeltaX = 0;
				} else {
					_this4.touchDeltaX = event.touches[0].clientX - _this4.touchStartX;
				}
			};

			const end = function end(event) {
				if (_this4._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
					_this4.touchDeltaX = event.clientX - _this4.touchStartX;
				}

				_this4._handleSwipe();

				if (_this4._config.pause === 'hover') {
					// If it's a touch-enabled device, mouseenter/leave are fired as
					// part of the mouse compatibility events on first tap - the carousel
					// would stop cycling until user tapped out of it;
					// here, we listen for touchend, explicitly pause the carousel
					// (as if it's the second time we tap on it, mouseenter compat event
					// is NOT fired) and after a timeout (to allow for mouse compatibility
					// events to fire) we explicitly restart cycling
					_this4.pause();

					if (_this4.touchTimeout) {
						clearTimeout(_this4.touchTimeout);
					}

					_this4.touchTimeout = setTimeout(function(event) {
						return _this4.cycle(event);
					}, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval);
				}
			};

			SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(function(itemImg) {
				EventHandler.on(itemImg, EVENT_DRAG_START, function(e) {
					return e.preventDefault();
				});
			});

			if (this._pointerEvent) {
				EventHandler.on(this._element, EVENT_POINTERDOWN, function(event) {
					return start(event);
				});
				EventHandler.on(this._element, EVENT_POINTERUP, function(event) {
					return end(event);
				});

				this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			} else {
				EventHandler.on(this._element, EVENT_TOUCHSTART, function(event) {
					return start(event);
				});
				EventHandler.on(this._element, EVENT_TOUCHMOVE, function(event) {
					return move(event);
				});
				EventHandler.on(this._element, EVENT_TOUCHEND, function(event) {
					return end(event);
				});
			}
		};

		_proto._keydown = function _keydown(event) {
			if (/input|textarea/i.test(event.target.tagName)) {
				return;
			}

			if (event.key === ARROW_LEFT_KEY) {
				event.preventDefault();

				if (isRTL) {
					this.next();
				} else {
					this.prev();
				}
			} else if (event.key === ARROW_RIGHT_KEY) {
				event.preventDefault();

				if (isRTL) {
					this.prev();
				} else {
					this.next();
				}
			}
		};

		_proto._getItemIndex = function _getItemIndex(element) {
			this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
			return this._items.indexOf(element);
		};

		_proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
			const isNextDirection = direction === DIRECTION_NEXT;
			const isPrevDirection = direction === DIRECTION_PREV;

			const activeIndex = this._getItemIndex(activeElement);

			const lastItemIndex = this._items.length - 1;
			const isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

			if (isGoingToWrap && !this._config.wrap) {
				return activeElement;
			}

			const delta = direction === DIRECTION_PREV ? -1 : 1;
			const itemIndex = (activeIndex + delta) % this._items.length;
			return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
		};

		_proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
			const targetIndex = this._getItemIndex(relatedTarget);

			const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

			return EventHandler.trigger(this._element, EVENT_SLIDE, {
				relatedTarget: relatedTarget,
				direction: eventDirectionName,
				from: fromIndex,
				to: targetIndex,
			});
		};

		_proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
			if (this._indicatorsElement) {
				const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
				activeIndicator.classList.remove(CLASS_NAME_ACTIVE$1);
				activeIndicator.removeAttribute('aria-current');
				const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

				for (let i = 0; i < indicators.length; i++) {
					if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
						indicators[i].classList.add(CLASS_NAME_ACTIVE$1);
						indicators[i].setAttribute('aria-current', 'true');
						break;
					}
				}
			}
		};

		_proto._updateInterval = function _updateInterval() {
			const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

			if (!element) {
				return;
			}

			const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

			if (elementInterval) {
				this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
				this._config.interval = elementInterval;
			} else {
				this._config.interval = this._config.defaultInterval || this._config.interval;
			}
		};

		_proto._slide = function _slide(direction, element) {
			const _this5 = this;

			const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

			const activeElementIndex = this._getItemIndex(activeElement);

			const nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

			const nextElementIndex = this._getItemIndex(nextElement);

			const isCycling = Boolean(this._interval);
			const directionalClassName = direction === DIRECTION_NEXT ? CLASS_NAME_START : CLASS_NAME_END;
			const orderClassName = direction === DIRECTION_NEXT ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
			const eventDirectionName = direction === DIRECTION_NEXT ? DIRECTION_LEFT : DIRECTION_RIGHT;

			if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$1)) {
				this._isSliding = false;
				return;
			}

			const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

			if (slideEvent.defaultPrevented) {
				return;
			}

			if (!activeElement || !nextElement) {
				// Some weirdness is happening, so we bail
				return;
			}

			this._isSliding = true;

			if (isCycling) {
				this.pause();
			}

			this._setActiveIndicatorElement(nextElement);

			this._activeElement = nextElement;

			if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
				nextElement.classList.add(orderClassName);
				reflow(nextElement);
				activeElement.classList.add(directionalClassName);
				nextElement.classList.add(directionalClassName);
				const transitionDuration = getTransitionDurationFromElement(activeElement);
				EventHandler.one(activeElement, 'transitionend', function() {
					nextElement.classList.remove(directionalClassName, orderClassName);
					nextElement.classList.add(CLASS_NAME_ACTIVE$1);
					activeElement.classList.remove(CLASS_NAME_ACTIVE$1, orderClassName, directionalClassName);
					_this5._isSliding = false;
					setTimeout(function() {
						EventHandler.trigger(_this5._element, EVENT_SLID, {
							relatedTarget: nextElement,
							direction: eventDirectionName,
							from: activeElementIndex,
							to: nextElementIndex,
						});
					}, 0);
				});
				emulateTransitionEnd(activeElement, transitionDuration);
			} else {
				activeElement.classList.remove(CLASS_NAME_ACTIVE$1);
				nextElement.classList.add(CLASS_NAME_ACTIVE$1);
				this._isSliding = false;
				EventHandler.trigger(this._element, EVENT_SLID, {
					relatedTarget: nextElement,
					direction: eventDirectionName,
					from: activeElementIndex,
					to: nextElementIndex,
				});
			}

			if (isCycling) {
				this.cycle();
			}
		} // Static
		;

		Carousel.carouselInterface = function carouselInterface(element, config) {
			let data = Data.getData(element, DATA_KEY$2);

			let _config = _extends({}, Default, Manipulator.getDataAttributes(element));

			if (typeof config === 'object') {
				_config = _extends({}, _config, config);
			}

			const action = typeof config === 'string' ? config : _config.slide;

			if (!data) {
				data = new Carousel(element, _config);
			}

			if (typeof config === 'number') {
				data.to(config);
			} else if (typeof action === 'string') {
				if (typeof data[action] === 'undefined') {
					throw new TypeError('No method named "' + action + '"');
				}

				data[action]();
			} else if (_config.interval && _config.ride) {
				data.pause();
				data.cycle();
			}
		};

		Carousel.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				Carousel.carouselInterface(this, config);
			});
		};

		Carousel.dataApiClickHandler = function dataApiClickHandler(event) {
			const target = getElementFromSelector(this);

			if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
				return;
			}

			const config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

			const slideIndex = this.getAttribute('data-bs-slide-to');

			if (slideIndex) {
				config.interval = false;
			}

			Carousel.carouselInterface(target, config);

			if (slideIndex) {
				Data.getData(target, DATA_KEY$2).to(slideIndex);
			}

			event.preventDefault();
		};

		_createClass(Carousel, null, [{
			key: 'Default',
			get: function get() {
				return Default;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$2;
			},
		}]);

		return Carousel;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	EventHandler.on(window, EVENT_LOAD_DATA_API, function() {
		const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

		for (let i = 0, len = carousels.length; i < len; i++) {
			Carousel.carouselInterface(carousels[i], Data.getData(carousels[i], DATA_KEY$2));
		}
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Carousel to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$2, Carousel);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$3 = 'collapse';
	const DATA_KEY$3 = 'bs.collapse';
	const EVENT_KEY$3 = '.' + DATA_KEY$3;
	const DATA_API_KEY$3 = '.data-api';
	const Default$1 = {
		toggle: true,
		parent: '',
	};
	const DefaultType$1 = {
		toggle: 'boolean',
		parent: '(string|element)',
	};
	const EVENT_SHOW = 'show' + EVENT_KEY$3;
	const EVENT_SHOWN = 'shown' + EVENT_KEY$3;
	const EVENT_HIDE = 'hide' + EVENT_KEY$3;
	const EVENT_HIDDEN = 'hidden' + EVENT_KEY$3;
	const EVENT_CLICK_DATA_API$3 = 'click' + EVENT_KEY$3 + DATA_API_KEY$3;
	const CLASS_NAME_SHOW$1 = 'show';
	const CLASS_NAME_COLLAPSE = 'collapse';
	const CLASS_NAME_COLLAPSING = 'collapsing';
	const CLASS_NAME_COLLAPSED = 'collapsed';
	const WIDTH = 'width';
	const HEIGHT = 'height';
	const SELECTOR_ACTIVES = '.show, .collapsing';
	const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="collapse"]';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Collapse = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Collapse, _BaseComponent);

		function Collapse(element, config) {
			let _this;

			_this = _BaseComponent.call(this, element) || this;
			_this._isTransitioning = false;
			_this._config = _this._getConfig(config);
			_this._triggerArray = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1 + '[href="#' + element.id + '"],' + (SELECTOR_DATA_TOGGLE$1 + '[data-bs-target="#' + element.id + '"]'));
			const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$1);

			for (let i = 0, len = toggleList.length; i < len; i++) {
				const elem = toggleList[i];
				const selector = getSelectorFromElement(elem);
				const filterElement = SelectorEngine.find(selector).filter(function(foundElem) {
					return foundElem === element;
				});

				if (selector !== null && filterElement.length) {
					_this._selector = selector;

					_this._triggerArray.push(elem);
				}
			}

			_this._parent = _this._config.parent ? _this._getParent() : null;

			if (!_this._config.parent) {
				_this._addAriaAndCollapsedClass(_this._element, _this._triggerArray);
			}

			if (_this._config.toggle) {
				_this.toggle();
			}

			return _this;
		} // Getters


		const _proto = Collapse.prototype;

		// Public
		_proto.toggle = function toggle() {
			if (this._element.classList.contains(CLASS_NAME_SHOW$1)) {
				this.hide();
			} else {
				this.show();
			}
		};

		_proto.show = function show() {
			const _this2 = this;

			if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$1)) {
				return;
			}

			let actives;
			let activesData;

			if (this._parent) {
				actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(function(elem) {
					if (typeof _this2._config.parent === 'string') {
						return elem.getAttribute('data-bs-parent') === _this2._config.parent;
					}

					return elem.classList.contains(CLASS_NAME_COLLAPSE);
				});

				if (actives.length === 0) {
					actives = null;
				}
			}

			const container = SelectorEngine.findOne(this._selector);

			if (actives) {
				const tempActiveData = actives.find(function(elem) {
					return container !== elem;
				});
				activesData = tempActiveData ? Data.getData(tempActiveData, DATA_KEY$3) : null;

				if (activesData && activesData._isTransitioning) {
					return;
				}
			}

			const startEvent = EventHandler.trigger(this._element, EVENT_SHOW);

			if (startEvent.defaultPrevented) {
				return;
			}

			if (actives) {
				actives.forEach(function(elemActive) {
					if (container !== elemActive) {
						Collapse.collapseInterface(elemActive, 'hide');
					}

					if (!activesData) {
						Data.setData(elemActive, DATA_KEY$3, null);
					}
				});
			}

			const dimension = this._getDimension();

			this._element.classList.remove(CLASS_NAME_COLLAPSE);

			this._element.classList.add(CLASS_NAME_COLLAPSING);

			this._element.style[dimension] = 0;

			if (this._triggerArray.length) {
				this._triggerArray.forEach(function(element) {
					element.classList.remove(CLASS_NAME_COLLAPSED);
					element.setAttribute('aria-expanded', true);
				});
			}

			this.setTransitioning(true);

			const complete = function complete() {
				_this2._element.classList.remove(CLASS_NAME_COLLAPSING);

				_this2._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$1);

				_this2._element.style[dimension] = '';

				_this2.setTransitioning(false);

				EventHandler.trigger(_this2._element, EVENT_SHOWN);
			};

			const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
			const scrollSize = 'scroll' + capitalizedDimension;
			const transitionDuration = getTransitionDurationFromElement(this._element);
			EventHandler.one(this._element, 'transitionend', complete);
			emulateTransitionEnd(this._element, transitionDuration);
			this._element.style[dimension] = this._element[scrollSize] + 'px';
		};

		_proto.hide = function hide() {
			const _this3 = this;

			if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$1)) {
				return;
			}

			const startEvent = EventHandler.trigger(this._element, EVENT_HIDE);

			if (startEvent.defaultPrevented) {
				return;
			}

			const dimension = this._getDimension();

			this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';
			reflow(this._element);

			this._element.classList.add(CLASS_NAME_COLLAPSING);

			this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$1);

			const triggerArrayLength = this._triggerArray.length;

			if (triggerArrayLength > 0) {
				for (let i = 0; i < triggerArrayLength; i++) {
					const trigger = this._triggerArray[i];
					const elem = getElementFromSelector(trigger);

					if (elem && !elem.classList.contains(CLASS_NAME_SHOW$1)) {
						trigger.classList.add(CLASS_NAME_COLLAPSED);
						trigger.setAttribute('aria-expanded', false);
					}
				}
			}

			this.setTransitioning(true);

			const complete = function complete() {
				_this3.setTransitioning(false);

				_this3._element.classList.remove(CLASS_NAME_COLLAPSING);

				_this3._element.classList.add(CLASS_NAME_COLLAPSE);

				EventHandler.trigger(_this3._element, EVENT_HIDDEN);
			};

			this._element.style[dimension] = '';
			const transitionDuration = getTransitionDurationFromElement(this._element);
			EventHandler.one(this._element, 'transitionend', complete);
			emulateTransitionEnd(this._element, transitionDuration);
		};

		_proto.setTransitioning = function setTransitioning(isTransitioning) {
			this._isTransitioning = isTransitioning;
		};

		_proto.dispose = function dispose() {
			_BaseComponent.prototype.dispose.call(this);

			this._config = null;
			this._parent = null;
			this._triggerArray = null;
			this._isTransitioning = null;
		} // Private
		;

		_proto._getConfig = function _getConfig(config) {
			config = _extends({}, Default$1, config);
			config.toggle = Boolean(config.toggle); // Coerce string values

			typeCheckConfig(NAME$3, config, DefaultType$1);
			return config;
		};

		_proto._getDimension = function _getDimension() {
			return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
		};

		_proto._getParent = function _getParent() {
			const _this4 = this;

			let parent = this._config.parent;

			if (isElement(parent)) {
				// it's a jQuery object
				if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
					parent = parent[0];
				}
			} else {
				parent = SelectorEngine.findOne(parent);
			}

			const selector = SELECTOR_DATA_TOGGLE$1 + '[data-bs-parent="' + parent + '"]';
			SelectorEngine.find(selector, parent).forEach(function(element) {
				const selected = getElementFromSelector(element);

				_this4._addAriaAndCollapsedClass(selected, [element]);
			});
			return parent;
		};

		_proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
			if (!element || !triggerArray.length) {
				return;
			}

			const isOpen = element.classList.contains(CLASS_NAME_SHOW$1);
			triggerArray.forEach(function(elem) {
				if (isOpen) {
					elem.classList.remove(CLASS_NAME_COLLAPSED);
				} else {
					elem.classList.add(CLASS_NAME_COLLAPSED);
				}

				elem.setAttribute('aria-expanded', isOpen);
			});
		} // Static
		;

		Collapse.collapseInterface = function collapseInterface(element, config) {
			let data = Data.getData(element, DATA_KEY$3);

			const _config = _extends({}, Default$1, Manipulator.getDataAttributes(element), typeof config === 'object' && config ? config : {});

			if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
				_config.toggle = false;
			}

			if (!data) {
				data = new Collapse(element, _config);
			}

			if (typeof config === 'string') {
				if (typeof data[config] === 'undefined') {
					throw new TypeError('No method named "' + config + '"');
				}

				data[config]();
			}
		};

		Collapse.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				Collapse.collapseInterface(this, config);
			});
		};

		_createClass(Collapse, null, [{
			key: 'Default',
			get: function get() {
				return Default$1;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$3;
			},
		}]);

		return Collapse;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$1, function(event) {
		// preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
			event.preventDefault();
		}

		const triggerData = Manipulator.getDataAttributes(this);
		const selector = getSelectorFromElement(this);
		const selectorElements = SelectorEngine.find(selector);
		selectorElements.forEach(function(element) {
			const data = Data.getData(element, DATA_KEY$3);
			let config;

			if (data) {
				// update parent attribute
				if (data._parent === null && typeof triggerData.parent === 'string') {
					data._config.parent = triggerData.parent;
					data._parent = data._getParent();
				}

				config = 'toggle';
			} else {
				config = triggerData;
			}

			Collapse.collapseInterface(element, config);
		});
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Collapse to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$3, Collapse);

	const top = 'top';
	const bottom = 'bottom';
	const right = 'right';
	const left = 'left';
	const auto = 'auto';
	const basePlacements = [top, bottom, right, left];
	const start = 'start';
	const end = 'end';
	const clippingParents = 'clippingParents';
	const viewport = 'viewport';
	const popper = 'popper';
	const reference = 'reference';
	const variationPlacements = /* #__PURE__*/basePlacements.reduce(function(acc, placement) {
		return acc.concat([placement + '-' + start, placement + '-' + end]);
	}, []);
	const placements = /* #__PURE__*/[].concat(basePlacements, [auto]).reduce(function(acc, placement) {
		return acc.concat([placement, placement + '-' + start, placement + '-' + end]);
	}, []); // modifiers that need to read the DOM

	const beforeRead = 'beforeRead';
	const read = 'read';
	const afterRead = 'afterRead'; // pure-logic modifiers

	const beforeMain = 'beforeMain';
	const main = 'main';
	const afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	const beforeWrite = 'beforeWrite';
	const write = 'write';
	const afterWrite = 'afterWrite';
	const modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
		return element ? (element.nodeName || '').toLowerCase() : null;
	}

	/* :: import type { Window } from '../types'; */

	/* :: declare function getWindow(node: Node | Window): Window; */
	function getWindow(node) {
		if (node.toString() !== '[object Window]') {
			const ownerDocument = node.ownerDocument;
			return ownerDocument ? ownerDocument.defaultView || window : window;
		}

		return node;
	}

	/* :: declare function isElement(node: mixed): boolean %checks(node instanceof
		Element); */

	function isElement$1(node) {
		const OwnElement = getWindow(node).Element;
		return node instanceof OwnElement || node instanceof Element;
	}
	/* :: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
		HTMLElement); */


	function isHTMLElement(node) {
		const OwnElement = getWindow(node).HTMLElement;
		return node instanceof OwnElement || node instanceof HTMLElement;
	}
	/* :: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
		ShadowRoot); */


	function isShadowRoot(node) {
		const OwnElement = getWindow(node).ShadowRoot;
		return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
		const state = _ref.state;
		Object.keys(state.elements).forEach(function(name) {
			const style = state.styles[name] || {};
			const attributes = state.attributes[name] || {};
			const element = state.elements[name]; // arrow is optional + virtual elements

			if (!isHTMLElement(element) || !getNodeName(element)) {
				return;
			} // Flow doesn't support to extend this property, but it's the most
			// effective way to apply styles to an HTMLElement
			// $FlowFixMe[cannot-write]


			Object.assign(element.style, style);
			Object.keys(attributes).forEach(function(name) {
				const value = attributes[name];

				if (value === false) {
					element.removeAttribute(name);
				} else {
					element.setAttribute(name, value === true ? '' : value);
				}
			});
		});
	}

	function effect(_ref2) {
		const state = _ref2.state;
		const initialStyles = {
			popper: {
				position: state.options.strategy,
				left: '0',
				top: '0',
				margin: '0',
			},
			arrow: {
				position: 'absolute',
			},
			reference: {},
		};
		Object.assign(state.elements.popper.style, initialStyles.popper);

		if (state.elements.arrow) {
			Object.assign(state.elements.arrow.style, initialStyles.arrow);
		}

		return function() {
			Object.keys(state.elements).forEach(function(name) {
				const element = state.elements[name];
				const attributes = state.attributes[name] || {};
				const styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

				const style = styleProperties.reduce(function(style, property) {
					style[property] = '';
					return style;
				}, {}); // arrow is optional + virtual elements

				if (!isHTMLElement(element) || !getNodeName(element)) {
					return;
				}

				Object.assign(element.style, style);
				Object.keys(attributes).forEach(function(attribute) {
					element.removeAttribute(attribute);
				});
			});
		};
	}


	const applyStyles$1 = {
		name: 'applyStyles',
		enabled: true,
		phase: 'write',
		fn: applyStyles,
		effect: effect,
		requires: ['computeStyles'],
	};

	function getBasePlacement(placement) {
		return placement.split('-')[0];
	}

	// Returns the layout rect of an element relative to its offsetParent. Layout
	// means it doesn't take into account transforms.
	function getLayoutRect(element) {
		return {
			x: element.offsetLeft,
			y: element.offsetTop,
			width: element.offsetWidth,
			height: element.offsetHeight,
		};
	}

	function contains(parent, child) {
		const rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

		if (parent.contains(child)) {
			return true;
		} // then fallback to custom implementation with Shadow DOM support
		else if (rootNode && isShadowRoot(rootNode)) {
			let next = child;

			do {
				if (next && parent.isSameNode(next)) {
					return true;
				} // $FlowFixMe[prop-missing]: need a better way to handle this...


				next = next.parentNode || next.host;
			} while (next);
		} // Give up, the result is false


		return false;
	}

	function getComputedStyle$1(element) {
		return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
		return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
		// $FlowFixMe[incompatible-return]: assume body is always available
		return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
			element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
		if (getNodeName(element) === 'html') {
			return element;
		}

		return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
		// $FlowFixMe[incompatible-return]
		// $FlowFixMe[prop-missing]
			element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
			element.parentNode || // DOM Element detected
			// $FlowFixMe[incompatible-return]: need a better way to handle this...
			element.host || // ShadowRoot detected
			// $FlowFixMe[incompatible-call]: HTMLElement is a Node
			getDocumentElement(element) // fallback

		);
	}

	function getTrueOffsetParent(element) {
		if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
		getComputedStyle$1(element).position === 'fixed') {
			return null;
		}

		const offsetParent = element.offsetParent;

		if (offsetParent) {
			const html = getDocumentElement(offsetParent);

			if (getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && getComputedStyle$1(html).position !== 'static') {
				return html;
			}
		}

		return offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
		let currentNode = getParentNode(element);

		while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
			const css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
			// create a containing block.

			if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
				return currentNode;
			} else {
				currentNode = currentNode.parentNode;
			}
		}

		return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
		const window = getWindow(element);
		let offsetParent = getTrueOffsetParent(element);

		while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
			offsetParent = getTrueOffsetParent(offsetParent);
		}

		if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
			return window;
		}

		return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
		return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min, value, max) {
		return Math.max(min, Math.min(value, max));
	}

	function getFreshSideObject() {
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		};
	}

	function mergePaddingObject(paddingObject) {
		return Object.assign(Object.assign({}, getFreshSideObject()), paddingObject);
	}

	function expandToHashMap(value, keys) {
		return keys.reduce(function(hashMap, key) {
			hashMap[key] = value;
			return hashMap;
		}, {});
	}

	function arrow(_ref) {
		let _state$modifiersData$;

		const state = _ref.state,
			name = _ref.name;
		const arrowElement = state.elements.arrow;
		const popperOffsets = state.modifiersData.popperOffsets;
		const basePlacement = getBasePlacement(state.placement);
		const axis = getMainAxisFromPlacement(basePlacement);
		const isVertical = [left, right].indexOf(basePlacement) >= 0;
		const len = isVertical ? 'height' : 'width';

		if (!arrowElement || !popperOffsets) {
			return;
		}

		const paddingObject = state.modifiersData[name + '#persistent'].padding;
		const arrowRect = getLayoutRect(arrowElement);
		const minProp = axis === 'y' ? top : left;
		const maxProp = axis === 'y' ? bottom : right;
		const endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
		const startDiff = popperOffsets[axis] - state.rects.reference[axis];
		const arrowOffsetParent = getOffsetParent(arrowElement);
		const clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
		const centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
		// outside of the popper bounds

		const min = paddingObject[minProp];
		const max = clientSize - arrowRect[len] - paddingObject[maxProp];
		const center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
		const offset = within(min, center, max); // Prevents breaking syntax highlighting...

		const axisProp = axis;
		state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
		const state = _ref2.state,
			options = _ref2.options,
			name = _ref2.name;
		let _options$element = options.element,
			arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
			_options$padding = options.padding,
			padding = _options$padding === void 0 ? 0 : _options$padding;

		if (arrowElement == null) {
			return;
		} // CSS selector


		if (typeof arrowElement === 'string') {
			arrowElement = state.elements.popper.querySelector(arrowElement);

			if (!arrowElement) {
				return;
			}
		}

		if (!contains(state.elements.popper, arrowElement)) {

			return;
		}

		state.elements.arrow = arrowElement;
		state.modifiersData[name + '#persistent'] = {
			padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements)),
		};
	}


	const arrow$1 = {
		name: 'arrow',
		enabled: true,
		phase: 'main',
		fn: arrow,
		effect: effect$1,
		requires: ['popperOffsets'],
		requiresIfExists: ['preventOverflow'],
	};

	const unsetSides = {
		top: 'auto',
		right: 'auto',
		bottom: 'auto',
		left: 'auto',
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
		const x = _ref.x,
			y = _ref.y;
		const win = window;
		const dpr = win.devicePixelRatio || 1;
		return {
			x: Math.round(x * dpr) / dpr || 0,
			y: Math.round(y * dpr) / dpr || 0,
		};
	}

	function mapToStyles(_ref2) {
		let _Object$assign2;

		const popper = _ref2.popper,
			popperRect = _ref2.popperRect,
			placement = _ref2.placement,
			offsets = _ref2.offsets,
			position = _ref2.position,
			gpuAcceleration = _ref2.gpuAcceleration,
			adaptive = _ref2.adaptive,
			roundOffsets = _ref2.roundOffsets;

		let _ref3 = roundOffsets ? roundOffsetsByDPR(offsets) : offsets,
			_ref3$x = _ref3.x,
			x = _ref3$x === void 0 ? 0 : _ref3$x,
			_ref3$y = _ref3.y,
			y = _ref3$y === void 0 ? 0 : _ref3$y;

		const hasX = offsets.hasOwnProperty('x');
		const hasY = offsets.hasOwnProperty('y');
		let sideX = left;
		let sideY = top;
		const win = window;

		if (adaptive) {
			let offsetParent = getOffsetParent(popper);

			if (offsetParent === getWindow(popper)) {
				offsetParent = getDocumentElement(popper);
			} // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

			/* :: offsetParent = (offsetParent: Element); */


			if (placement === top) {
				sideY = bottom;
				y -= offsetParent.clientHeight - popperRect.height;
				y *= gpuAcceleration ? 1 : -1;
			}

			if (placement === left) {
				sideX = right;
				x -= offsetParent.clientWidth - popperRect.width;
				x *= gpuAcceleration ? 1 : -1;
			}
		}

		const commonStyles = Object.assign({
			position: position,
		}, adaptive && unsetSides);

		if (gpuAcceleration) {
			let _Object$assign;

			return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? 'translate(' + x + 'px, ' + y + 'px)' : 'translate3d(' + x + 'px, ' + y + 'px, 0)', _Object$assign));
		}

		return Object.assign(Object.assign({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + 'px' : '', _Object$assign2[sideX] = hasX ? x + 'px' : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref4) {
		const state = _ref4.state,
			options = _ref4.options;
		const _options$gpuAccelerat = options.gpuAcceleration,
			gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
			_options$adaptive = options.adaptive,
			adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
			_options$roundOffsets = options.roundOffsets,
			roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

		const commonStyles = {
			placement: getBasePlacement(state.placement),
			popper: state.elements.popper,
			popperRect: state.rects.popper,
			gpuAcceleration: gpuAcceleration,
		};

		if (state.modifiersData.popperOffsets != null) {
			state.styles.popper = Object.assign(Object.assign({}, state.styles.popper), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
				offsets: state.modifiersData.popperOffsets,
				position: state.options.strategy,
				adaptive: adaptive,
				roundOffsets: roundOffsets,
			})));
		}

		if (state.modifiersData.arrow != null) {
			state.styles.arrow = Object.assign(Object.assign({}, state.styles.arrow), mapToStyles(Object.assign(Object.assign({}, commonStyles), {}, {
				offsets: state.modifiersData.arrow,
				position: 'absolute',
				adaptive: false,
				roundOffsets: roundOffsets,
			})));
		}

		state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
			'data-popper-placement': state.placement,
		});
	}


	const computeStyles$1 = {
		name: 'computeStyles',
		enabled: true,
		phase: 'beforeWrite',
		fn: computeStyles,
		data: {},
	};

	const passive = {
		passive: true,
	};

	function effect$2(_ref) {
		const state = _ref.state,
			instance = _ref.instance,
			options = _ref.options;
		const _options$scroll = options.scroll,
			scroll = _options$scroll === void 0 ? true : _options$scroll,
			_options$resize = options.resize,
			resize = _options$resize === void 0 ? true : _options$resize;
		const window = getWindow(state.elements.popper);
		const scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

		if (scroll) {
			scrollParents.forEach(function(scrollParent) {
				scrollParent.addEventListener('scroll', instance.update, passive);
			});
		}

		if (resize) {
			window.addEventListener('resize', instance.update, passive);
		}

		return function() {
			if (scroll) {
				scrollParents.forEach(function(scrollParent) {
					scrollParent.removeEventListener('scroll', instance.update, passive);
				});
			}

			if (resize) {
				window.removeEventListener('resize', instance.update, passive);
			}
		};
	}


	const eventListeners = {
		name: 'eventListeners',
		enabled: true,
		phase: 'write',
		fn: function fn() {},
		effect: effect$2,
		data: {},
	};

	const hash = {
		left: 'right',
		right: 'left',
		bottom: 'top',
		top: 'bottom',
	};
	function getOppositePlacement(placement) {
		return placement.replace(/left|right|bottom|top/g, function(matched) {
			return hash[matched];
		});
	}

	const hash$1 = {
		start: 'end',
		end: 'start',
	};
	function getOppositeVariationPlacement(placement) {
		return placement.replace(/start|end/g, function(matched) {
			return hash$1[matched];
		});
	}

	function getBoundingClientRect(element) {
		const rect = element.getBoundingClientRect();
		return {
			width: rect.width,
			height: rect.height,
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left,
			x: rect.left,
			y: rect.top,
		};
	}

	function getWindowScroll(node) {
		const win = getWindow(node);
		const scrollLeft = win.pageXOffset;
		const scrollTop = win.pageYOffset;
		return {
			scrollLeft: scrollLeft,
			scrollTop: scrollTop,
		};
	}

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

	function getViewportRect(element) {
		const win = getWindow(element);
		const html = getDocumentElement(element);
		const visualViewport = win.visualViewport;
		let width = html.clientWidth;
		let height = html.clientHeight;
		let x = 0;
		let y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
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
			y: y,
		};
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
		const html = getDocumentElement(element);
		const winScroll = getWindowScroll(element);
		const body = element.ownerDocument.body;
		const width = Math.max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
		const height = Math.max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
		let x = -winScroll.scrollLeft + getWindowScrollBarX(element);
		const y = -winScroll.scrollTop;

		if (getComputedStyle$1(body || html).direction === 'rtl') {
			x += Math.max(html.clientWidth, body ? body.clientWidth : 0) - width;
		}

		return {
			width: width,
			height: height,
			x: x,
			y: y,
		};
	}

	function isScrollParent(element) {
		// Firefox wants us to check `-x` and `-y` variations as well
		const _getComputedStyle = getComputedStyle$1(element),
			overflow = _getComputedStyle.overflow,
			overflowX = _getComputedStyle.overflowX,
			overflowY = _getComputedStyle.overflowY;

		return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

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

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
		if (list === void 0) {
			list = [];
		}

		const scrollParent = getScrollParent(element);
		const isBody = getNodeName(scrollParent) === 'body';
		const win = getWindow(scrollParent);
		const target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
		const updatedList = list.concat(target);
		return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
			updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
		return Object.assign(Object.assign({}, rect), {}, {
			left: rect.x,
			top: rect.y,
			right: rect.x + rect.width,
			bottom: rect.y + rect.height,
		});
	}

	function getInnerBoundingClientRect(element) {
		const rect = getBoundingClientRect(element);
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
		const clippingParents = listScrollParents(getParentNode(element));
		const canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
		const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

		if (!isElement$1(clipperElement)) {
			return [];
		} // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


		return clippingParents.filter(function(clippingParent) {
			return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
		});
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
		const mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
		const clippingParents = [].concat(mainClippingParents, [rootBoundary]);
		const firstClippingParent = clippingParents[0];
		const clippingRect = clippingParents.reduce(function(accRect, clippingParent) {
			const rect = getClientRectFromMixedType(element, clippingParent);
			accRect.top = Math.max(rect.top, accRect.top);
			accRect.right = Math.min(rect.right, accRect.right);
			accRect.bottom = Math.min(rect.bottom, accRect.bottom);
			accRect.left = Math.max(rect.left, accRect.left);
			return accRect;
		}, getClientRectFromMixedType(element, firstClippingParent));
		clippingRect.width = clippingRect.right - clippingRect.left;
		clippingRect.height = clippingRect.bottom - clippingRect.top;
		clippingRect.x = clippingRect.left;
		clippingRect.y = clippingRect.top;
		return clippingRect;
	}

	function getVariation(placement) {
		return placement.split('-')[1];
	}

	function computeOffsets(_ref) {
		const reference = _ref.reference,
			element = _ref.element,
			placement = _ref.placement;
		const basePlacement = placement ? getBasePlacement(placement) : null;
		const variation = placement ? getVariation(placement) : null;
		const commonX = reference.x + reference.width / 2 - element.width / 2;
		const commonY = reference.y + reference.height / 2 - element.height / 2;
		let offsets;

		switch (basePlacement) {
		case top:
			offsets = {
				x: commonX,
				y: reference.y - element.height,
			};
			break;

		case bottom:
			offsets = {
				x: commonX,
				y: reference.y + reference.height,
			};
			break;

		case right:
			offsets = {
				x: reference.x + reference.width,
				y: commonY,
			};
			break;

		case left:
			offsets = {
				x: reference.x - element.width,
				y: commonY,
			};
			break;

		default:
			offsets = {
				x: reference.x,
				y: reference.y,
			};
		}

		const mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

		if (mainAxis != null) {
			const len = mainAxis === 'y' ? 'height' : 'width';

			switch (variation) {
			case start:
				offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
				break;

			case end:
				offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
				break;
			}
		}

		return offsets;
	}

	function detectOverflow(state, options) {
		if (options === void 0) {
			options = {};
		}

		const _options = options,
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
		const paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
		const altContext = elementContext === popper ? reference : popper;
		const referenceElement = state.elements.reference;
		const popperRect = state.rects.popper;
		const element = state.elements[altBoundary ? altContext : elementContext];
		const clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
		const referenceClientRect = getBoundingClientRect(referenceElement);
		const popperOffsets = computeOffsets({
			reference: referenceClientRect,
			element: popperRect,
			strategy: 'absolute',
			placement: placement,
		});
		const popperClientRect = rectToClientRect(Object.assign(Object.assign({}, popperRect), popperOffsets));
		const elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
		// 0 or negative = within the clipping rect

		const overflowOffsets = {
			top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
			bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
			left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
			right: elementClientRect.right - clippingClientRect.right + paddingObject.right,
		};
		const offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

		if (elementContext === popper && offsetData) {
			const offset = offsetData[placement];
			Object.keys(overflowOffsets).forEach(function(key) {
				const multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
				const axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
				overflowOffsets[key] += offset[axis] * multiply;
			});
		}

		return overflowOffsets;
	}

	/* :: type OverflowsMap = { [ComputedPlacement]: number }; */

	/* ;; type OverflowsMap = { [key in ComputedPlacement]: number }; */
	function computeAutoPlacement(state, options) {
		if (options === void 0) {
			options = {};
		}

		const _options = options,
			placement = _options.placement,
			boundary = _options.boundary,
			rootBoundary = _options.rootBoundary,
			padding = _options.padding,
			flipVariations = _options.flipVariations,
			_options$allowedAutoP = _options.allowedAutoPlacements,
			allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
		const variation = getVariation(placement);
		const placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement) {
			return getVariation(placement) === variation;
		}) : basePlacements;
		let allowedPlacements = placements$1.filter(function(placement) {
			return allowedAutoPlacements.indexOf(placement) >= 0;
		});

		if (allowedPlacements.length === 0) {
			allowedPlacements = placements$1;
		} // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


		const overflows = allowedPlacements.reduce(function(acc, placement) {
			acc[placement] = detectOverflow(state, {
				placement: placement,
				boundary: boundary,
				rootBoundary: rootBoundary,
				padding: padding,
			})[getBasePlacement(placement)];
			return acc;
		}, {});
		return Object.keys(overflows).sort(function(a, b) {
			return overflows[a] - overflows[b];
		});
	}

	function getExpandedFallbackPlacements(placement) {
		if (getBasePlacement(placement) === auto) {
			return [];
		}

		const oppositePlacement = getOppositePlacement(placement);
		return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
		const state = _ref.state,
			options = _ref.options,
			name = _ref.name;

		if (state.modifiersData[name]._skip) {
			return;
		}

		const _options$mainAxis = options.mainAxis,
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
		const preferredPlacement = state.options.placement;
		const basePlacement = getBasePlacement(preferredPlacement);
		const isBasePlacement = basePlacement === preferredPlacement;
		const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
		const placements = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement) {
			return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
				placement: placement,
				boundary: boundary,
				rootBoundary: rootBoundary,
				padding: padding,
				flipVariations: flipVariations,
				allowedAutoPlacements: allowedAutoPlacements,
			}) : placement);
		}, []);
		const referenceRect = state.rects.reference;
		const popperRect = state.rects.popper;
		const checksMap = new Map();
		let makeFallbackChecks = true;
		let firstFittingPlacement = placements[0];

		for (let i = 0; i < placements.length; i++) {
			const placement = placements[i];

			const _basePlacement = getBasePlacement(placement);

			const isStartVariation = getVariation(placement) === start;
			const isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
			const len = isVertical ? 'width' : 'height';
			const overflow = detectOverflow(state, {
				placement: placement,
				boundary: boundary,
				rootBoundary: rootBoundary,
				altBoundary: altBoundary,
				padding: padding,
			});
			let mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

			if (referenceRect[len] > popperRect[len]) {
				mainVariationSide = getOppositePlacement(mainVariationSide);
			}

			const altVariationSide = getOppositePlacement(mainVariationSide);
			const checks = [];

			if (checkMainAxis) {
				checks.push(overflow[_basePlacement] <= 0);
			}

			if (checkAltAxis) {
				checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
			}

			if (checks.every(function(check) {
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
			const numberOfChecks = flipVariations ? 3 : 1;

			const _loop = function _loop(_i) {
				const fittingPlacement = placements.find(function(placement) {
					const checks = checksMap.get(placement);

					if (checks) {
						return checks.slice(0, _i).every(function(check) {
							return check;
						});
					}
				});

				if (fittingPlacement) {
					firstFittingPlacement = fittingPlacement;
					return 'break';
				}
			};

			for (let _i = numberOfChecks; _i > 0; _i--) {
				const _ret = _loop(_i);

				if (_ret === 'break') break;
			}
		}

		if (state.placement !== firstFittingPlacement) {
			state.modifiersData[name]._skip = true;
			state.placement = firstFittingPlacement;
			state.reset = true;
		}
	}


	const flip$1 = {
		name: 'flip',
		enabled: true,
		phase: 'main',
		fn: flip,
		requiresIfExists: ['offset'],
		data: {
			_skip: false,
		},
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
		if (preventedOffsets === void 0) {
			preventedOffsets = {
				x: 0,
				y: 0,
			};
		}

		return {
			top: overflow.top - rect.height - preventedOffsets.y,
			right: overflow.right - rect.width + preventedOffsets.x,
			bottom: overflow.bottom - rect.height + preventedOffsets.y,
			left: overflow.left - rect.width - preventedOffsets.x,
		};
	}

	function isAnySideFullyClipped(overflow) {
		return [top, right, bottom, left].some(function(side) {
			return overflow[side] >= 0;
		});
	}

	function hide(_ref) {
		const state = _ref.state,
			name = _ref.name;
		const referenceRect = state.rects.reference;
		const popperRect = state.rects.popper;
		const preventedOffsets = state.modifiersData.preventOverflow;
		const referenceOverflow = detectOverflow(state, {
			elementContext: 'reference',
		});
		const popperAltOverflow = detectOverflow(state, {
			altBoundary: true,
		});
		const referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
		const popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
		const isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
		const hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
		state.modifiersData[name] = {
			referenceClippingOffsets: referenceClippingOffsets,
			popperEscapeOffsets: popperEscapeOffsets,
			isReferenceHidden: isReferenceHidden,
			hasPopperEscaped: hasPopperEscaped,
		};
		state.attributes.popper = Object.assign(Object.assign({}, state.attributes.popper), {}, {
			'data-popper-reference-hidden': isReferenceHidden,
			'data-popper-escaped': hasPopperEscaped,
		});
	}


	const hide$1 = {
		name: 'hide',
		enabled: true,
		phase: 'main',
		requiresIfExists: ['preventOverflow'],
		fn: hide,
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
		const basePlacement = getBasePlacement(placement);
		const invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

		let _ref = typeof offset === 'function' ? offset(Object.assign(Object.assign({}, rects), {}, {
				placement: placement,
			})) : offset,
			skidding = _ref[0],
			distance = _ref[1];

		skidding = skidding || 0;
		distance = (distance || 0) * invertDistance;
		return [left, right].indexOf(basePlacement) >= 0 ? {
			x: distance,
			y: skidding,
		} : {
			x: skidding,
			y: distance,
		};
	}

	function offset(_ref2) {
		const state = _ref2.state,
			options = _ref2.options,
			name = _ref2.name;
		const _options$offset = options.offset,
			offset = _options$offset === void 0 ? [0, 0] : _options$offset;
		const data = placements.reduce(function(acc, placement) {
			acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
			return acc;
		}, {});
		const _data$state$placement = data[state.placement],
			x = _data$state$placement.x,
			y = _data$state$placement.y;

		if (state.modifiersData.popperOffsets != null) {
			state.modifiersData.popperOffsets.x += x;
			state.modifiersData.popperOffsets.y += y;
		}

		state.modifiersData[name] = data;
	}


	const offset$1 = {
		name: 'offset',
		enabled: true,
		phase: 'main',
		requires: ['popperOffsets'],
		fn: offset,
	};

	function popperOffsets(_ref) {
		const state = _ref.state,
			name = _ref.name;
		// Offsets are the actual position the popper needs to have to be
		// properly positioned near its reference element
		// This is the most basic placement, and will be adjusted by
		// the modifiers in the next step
		state.modifiersData[name] = computeOffsets({
			reference: state.rects.reference,
			element: state.rects.popper,
			strategy: 'absolute',
			placement: state.placement,
		});
	}


	const popperOffsets$1 = {
		name: 'popperOffsets',
		enabled: true,
		phase: 'read',
		fn: popperOffsets,
		data: {},
	};

	function getAltAxis(axis) {
		return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
		const state = _ref.state,
			options = _ref.options,
			name = _ref.name;
		const _options$mainAxis = options.mainAxis,
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
		const overflow = detectOverflow(state, {
			boundary: boundary,
			rootBoundary: rootBoundary,
			padding: padding,
			altBoundary: altBoundary,
		});
		const basePlacement = getBasePlacement(state.placement);
		const variation = getVariation(state.placement);
		const isBasePlacement = !variation;
		const mainAxis = getMainAxisFromPlacement(basePlacement);
		const altAxis = getAltAxis(mainAxis);
		const popperOffsets = state.modifiersData.popperOffsets;
		const referenceRect = state.rects.reference;
		const popperRect = state.rects.popper;
		const tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign(Object.assign({}, state.rects), {}, {
			placement: state.placement,
		})) : tetherOffset;
		const data = {
			x: 0,
			y: 0,
		};

		if (!popperOffsets) {
			return;
		}

		if (checkMainAxis) {
			const mainSide = mainAxis === 'y' ? top : left;
			const altSide = mainAxis === 'y' ? bottom : right;
			const len = mainAxis === 'y' ? 'height' : 'width';
			const offset = popperOffsets[mainAxis];
			const min = popperOffsets[mainAxis] + overflow[mainSide];
			const max = popperOffsets[mainAxis] - overflow[altSide];
			const additive = tether ? -popperRect[len] / 2 : 0;
			const minLen = variation === start ? referenceRect[len] : popperRect[len];
			const maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
			// outside the reference bounds

			const arrowElement = state.elements.arrow;
			const arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
				width: 0,
				height: 0,
			};
			const arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
			const arrowPaddingMin = arrowPaddingObject[mainSide];
			const arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
			// to include its full size in the calculation. If the reference is small
			// and near the edge of a boundary, the popper can overflow even if the
			// reference is not overflowing as well (e.g. virtual elements with no
			// width or height)

			const arrowLen = within(0, referenceRect[len], arrowRect[len]);
			const minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
			const maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
			const arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
			const clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
			const offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
			const tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
			const tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
			const preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
			popperOffsets[mainAxis] = preventedOffset;
			data[mainAxis] = preventedOffset - offset;
		}

		if (checkAltAxis) {
			const _mainSide = mainAxis === 'x' ? top : left;

			const _altSide = mainAxis === 'x' ? bottom : right;

			const _offset = popperOffsets[altAxis];

			const _min = _offset + overflow[_mainSide];

			const _max = _offset - overflow[_altSide];

			const _preventedOffset = within(_min, _offset, _max);

			popperOffsets[altAxis] = _preventedOffset;
			data[altAxis] = _preventedOffset - _offset;
		}

		state.modifiersData[name] = data;
	}


	const preventOverflow$1 = {
		name: 'preventOverflow',
		enabled: true,
		phase: 'main',
		fn: preventOverflow,
		requiresIfExists: ['offset'],
	};

	function getHTMLElementScroll(element) {
		return {
			scrollLeft: element.scrollLeft,
			scrollTop: element.scrollTop,
		};
	}

	function getNodeScroll(node) {
		if (node === getWindow(node) || !isHTMLElement(node)) {
			return getWindowScroll(node);
		} else {
			return getHTMLElementScroll(node);
		}
	}

	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
		if (isFixed === void 0) {
			isFixed = false;
		}

		const documentElement = getDocumentElement(offsetParent);
		const rect = getBoundingClientRect(elementOrVirtualElement);
		const isOffsetParentAnElement = isHTMLElement(offsetParent);
		let scroll = {
			scrollLeft: 0,
			scrollTop: 0,
		};
		let offsets = {
			x: 0,
			y: 0,
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
			height: rect.height,
		};
	}

	function order(modifiers) {
		const map = new Map();
		const visited = new Set();
		const result = [];
		modifiers.forEach(function(modifier) {
			map.set(modifier.name, modifier);
		}); // On visiting object, check for its dependencies and visit them recursively

		function sort(modifier) {
			visited.add(modifier.name);
			const requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
			requires.forEach(function(dep) {
				if (!visited.has(dep)) {
					const depModifier = map.get(dep);

					if (depModifier) {
						sort(depModifier);
					}
				}
			});
			result.push(modifier);
		}

		modifiers.forEach(function(modifier) {
			if (!visited.has(modifier.name)) {
				// check for visited object
				sort(modifier);
			}
		});
		return result;
	}

	function orderModifiers(modifiers) {
		// order based on dependencies
		const orderedModifiers = order(modifiers); // order based on phase

		return modifierPhases.reduce(function(acc, phase) {
			return acc.concat(orderedModifiers.filter(function(modifier) {
				return modifier.phase === phase;
			}));
		}, []);
	}

	function debounce(fn) {
		let pending;
		return function() {
			if (!pending) {
				pending = new Promise(function(resolve) {
					Promise.resolve().then(function() {
						pending = undefined;
						resolve(fn());
					});
				});
			}

			return pending;
		};
	}

	function mergeByName(modifiers) {
		const merged = modifiers.reduce(function(merged, current) {
			const existing = merged[current.name];
			merged[current.name] = existing ? Object.assign(Object.assign(Object.assign({}, existing), current), {}, {
				options: Object.assign(Object.assign({}, existing.options), current.options),
				data: Object.assign(Object.assign({}, existing.data), current.data),
			}) : current;
			return merged;
		}, {}); // IE11 does not support Object.values

		return Object.keys(merged).map(function(key) {
			return merged[key];
		});
	}

	const DEFAULT_OPTIONS = {
		placement: 'bottom',
		modifiers: [],
		strategy: 'absolute',
	};

	function areValidElements() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return !args.some(function(element) {
			return !(element && typeof element.getBoundingClientRect === 'function');
		});
	}

	function popperGenerator(generatorOptions) {
		if (generatorOptions === void 0) {
			generatorOptions = {};
		}

		const _generatorOptions = generatorOptions,
			_generatorOptions$def = _generatorOptions.defaultModifiers,
			defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
			_generatorOptions$def2 = _generatorOptions.defaultOptions,
			defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
		return function createPopper(reference, popper, options) {
			if (options === void 0) {
				options = defaultOptions;
			}

			let state = {
				placement: 'bottom',
				orderedModifiers: [],
				options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
				modifiersData: {},
				elements: {
					reference: reference,
					popper: popper,
				},
				attributes: {},
				styles: {},
			};
			let effectCleanupFns = [];
			let isDestroyed = false;
			var instance = {
				state: state,
				setOptions: function setOptions(options) {
					cleanupModifierEffects();
					state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
					state.scrollParents = {
						reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
						popper: listScrollParents(popper),
					}; // Orders the modifiers based on their dependencies and `phase`
					// properties

					const orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

					state.orderedModifiers = orderedModifiers.filter(function(m) {
						return m.enabled;
					}); // Validate the provided modifiers so that the consumer will get warned

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

					const _state$elements = state.elements,
						reference = _state$elements.reference,
						popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
					// anymore

					if (!areValidElements(reference, popper)) {

						return;
					} // Store the reference and popper rects to be read by modifiers


					state.rects = {
						reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
						popper: getLayoutRect(popper),
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

					state.orderedModifiers.forEach(function(modifier) {
						return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
					});

					for (let index = 0; index < state.orderedModifiers.length; index++) {

						if (state.reset === true) {
							state.reset = false;
							index = -1;
							continue;
						}

						const _state$orderedModifie = state.orderedModifiers[index],
							fn = _state$orderedModifie.fn,
							_state$orderedModifie2 = _state$orderedModifie.options,
							_options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
							name = _state$orderedModifie.name;

						if (typeof fn === 'function') {
							state = fn({
								state: state,
								options: _options,
								name: name,
								instance: instance,
							}) || state;
						}
					}
				},
				// Async and optimistically optimized update – it will not be executed if
				// not necessary (debounced to run at most once-per-tick)
				update: debounce(function() {
					return new Promise(function(resolve) {
						instance.forceUpdate();
						resolve(state);
					});
				}),
				destroy: function destroy() {
					cleanupModifierEffects();
					isDestroyed = true;
				},
			};

			if (!areValidElements(reference, popper)) {

				return instance;
			}

			instance.setOptions(options).then(function(state) {
				if (!isDestroyed && options.onFirstUpdate) {
					options.onFirstUpdate(state);
				}
			}); // Modifiers have the ability to execute arbitrary code before the first
			// update cycle runs. They will be executed in the same order as the update
			// cycle. This is useful when a modifier adds some persistent data that
			// other modifiers need to use, but the modifier is run after the dependent
			// one.

			function runModifierEffects() {
				state.orderedModifiers.forEach(function(_ref3) {
					const name = _ref3.name,
						_ref3$options = _ref3.options,
						options = _ref3$options === void 0 ? {} : _ref3$options,
						effect = _ref3.effect;

					if (typeof effect === 'function') {
						const cleanupFn = effect({
							state: state,
							name: name,
							instance: instance,
							options: options,
						});

						const noopFn = function noopFn() {};

						effectCleanupFns.push(cleanupFn || noopFn);
					}
				});
			}

			function cleanupModifierEffects() {
				effectCleanupFns.forEach(function(fn) {
					return fn();
				});
				effectCleanupFns = [];
			}

			return instance;
		};
	}
	const createPopper = /* #__PURE__*/popperGenerator();

	const defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	const createPopper$1 = /* #__PURE__*/popperGenerator({
		defaultModifiers: defaultModifiers,
	});

	const defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	const createPopper$2 = /* #__PURE__*/popperGenerator({
		defaultModifiers: defaultModifiers$1,
	});

	const Popper = /* #__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper,
		createPopper: createPopper$2,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1,
	});

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$4 = 'dropdown';
	const DATA_KEY$4 = 'bs.dropdown';
	const EVENT_KEY$4 = '.' + DATA_KEY$4;
	const DATA_API_KEY$4 = '.data-api';
	const ESCAPE_KEY = 'Escape';
	const SPACE_KEY = 'Space';
	const TAB_KEY = 'Tab';
	const ARROW_UP_KEY = 'ArrowUp';
	const ARROW_DOWN_KEY = 'ArrowDown';
	const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	const REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEY + '|' + ARROW_DOWN_KEY + '|' + ESCAPE_KEY);
	const EVENT_HIDE$1 = 'hide' + EVENT_KEY$4;
	const EVENT_HIDDEN$1 = 'hidden' + EVENT_KEY$4;
	const EVENT_SHOW$1 = 'show' + EVENT_KEY$4;
	const EVENT_SHOWN$1 = 'shown' + EVENT_KEY$4;
	const EVENT_CLICK = 'click' + EVENT_KEY$4;
	const EVENT_CLICK_DATA_API$4 = 'click' + EVENT_KEY$4 + DATA_API_KEY$4;
	const EVENT_KEYDOWN_DATA_API = 'keydown' + EVENT_KEY$4 + DATA_API_KEY$4;
	const EVENT_KEYUP_DATA_API = 'keyup' + EVENT_KEY$4 + DATA_API_KEY$4;
	const CLASS_NAME_DISABLED = 'disabled';
	const CLASS_NAME_SHOW$2 = 'show';
	const CLASS_NAME_DROPUP = 'dropup';
	const CLASS_NAME_DROPEND = 'dropend';
	const CLASS_NAME_DROPSTART = 'dropstart';
	const CLASS_NAME_NAVBAR = 'navbar';
	const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="dropdown"]';
	const SELECTOR_FORM_CHILD = '.dropdown form';
	const SELECTOR_MENU = '.dropdown-menu';
	const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	const PLACEMENT_TOP = isRTL ? 'top-end' : 'top-start';
	const PLACEMENT_TOPEND = isRTL ? 'top-start' : 'top-end';
	const PLACEMENT_BOTTOM = isRTL ? 'bottom-end' : 'bottom-start';
	const PLACEMENT_BOTTOMEND = isRTL ? 'bottom-start' : 'bottom-end';
	const PLACEMENT_RIGHT = isRTL ? 'left-start' : 'right-start';
	const PLACEMENT_LEFT = isRTL ? 'right-start' : 'left-start';
	const Default$2 = {
		offset: [0, 2],
		flip: true,
		boundary: 'clippingParents',
		reference: 'toggle',
		display: 'dynamic',
		popperConfig: null,
	};
	const DefaultType$2 = {
		offset: '(array|string|function)',
		flip: 'boolean',
		boundary: '(string|element)',
		reference: '(string|element|object)',
		display: 'string',
		popperConfig: '(null|object|function)',
	};
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Dropdown = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Dropdown, _BaseComponent);

		function Dropdown(element, config) {
			let _this;

			_this = _BaseComponent.call(this, element) || this;
			_this._popper = null;
			_this._config = _this._getConfig(config);
			_this._menu = _this._getMenuElement();
			_this._inNavbar = _this._detectNavbar();

			_this._addEventListeners();

			return _this;
		} // Getters


		const _proto = Dropdown.prototype;

		// Public
		_proto.toggle = function toggle() {
			if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED)) {
				return;
			}

			const isActive = this._element.classList.contains(CLASS_NAME_SHOW$2);

			Dropdown.clearMenus();

			if (isActive) {
				return;
			}

			this.show();
		};

		_proto.show = function show() {
			if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || this._menu.classList.contains(CLASS_NAME_SHOW$2)) {
				return;
			}

			const parent = Dropdown.getParentFromElement(this._element);
			const relatedTarget = {
				relatedTarget: this._element,
			};
			const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, relatedTarget);

			if (showEvent.defaultPrevented) {
				return;
			} // Totally disable Popper for Dropdowns in Navbar


			if (this._inNavbar) {
				Manipulator.setDataAttribute(this._menu, 'popper', 'none');
			} else {
				if (typeof Popper === 'undefined') {
					throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
				}

				let referenceElement = this._element;

				if (this._config.reference === 'parent') {
					referenceElement = parent;
				} else if (isElement(this._config.reference)) {
					referenceElement = this._config.reference; // Check if it's jQuery element

					if (typeof this._config.reference.jquery !== 'undefined') {
						referenceElement = this._config.reference[0];
					}
				} else if (typeof this._config.reference === 'object') {
					referenceElement = this._config.reference;
				}

				const popperConfig = this._getPopperConfig();

				const isDisplayStatic = popperConfig.modifiers.find(function(modifier) {
					return modifier.name === 'applyStyles' && modifier.enabled === false;
				});
				this._popper = createPopper$2(referenceElement, this._menu, popperConfig);

				if (isDisplayStatic) {
					Manipulator.setDataAttribute(this._menu, 'popper', 'static');
				}
			} // If this is a touch-enabled device we add extra
			// empty mouseover listeners to the body's immediate children;
			// only needed because of broken event delegation on iOS
			// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


			if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
				let _ref;

				(_ref = []).concat.apply(_ref, document.body.children).forEach(function(elem) {
					return EventHandler.on(elem, 'mouseover', null, noop());
				});
			}

			this._element.focus();

			this._element.setAttribute('aria-expanded', true);

			this._menu.classList.toggle(CLASS_NAME_SHOW$2);

			this._element.classList.toggle(CLASS_NAME_SHOW$2);

			EventHandler.trigger(this._element, EVENT_SHOWN$1, relatedTarget);
		};

		_proto.hide = function hide() {
			if (this._element.disabled || this._element.classList.contains(CLASS_NAME_DISABLED) || !this._menu.classList.contains(CLASS_NAME_SHOW$2)) {
				return;
			}

			const relatedTarget = {
				relatedTarget: this._element,
			};
			const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$1, relatedTarget);

			if (hideEvent.defaultPrevented) {
				return;
			}

			if (this._popper) {
				this._popper.destroy();
			}

			this._menu.classList.toggle(CLASS_NAME_SHOW$2);

			this._element.classList.toggle(CLASS_NAME_SHOW$2);

			Manipulator.removeDataAttribute(this._menu, 'popper');
			EventHandler.trigger(this._element, EVENT_HIDDEN$1, relatedTarget);
		};

		_proto.dispose = function dispose() {
			_BaseComponent.prototype.dispose.call(this);

			EventHandler.off(this._element, EVENT_KEY$4);
			this._menu = null;

			if (this._popper) {
				this._popper.destroy();

				this._popper = null;
			}
		};

		_proto.update = function update() {
			this._inNavbar = this._detectNavbar();

			if (this._popper) {
				this._popper.update();
			}
		} // Private
		;

		_proto._addEventListeners = function _addEventListeners() {
			const _this2 = this;

			EventHandler.on(this._element, EVENT_CLICK, function(event) {
				event.preventDefault();
				event.stopPropagation();

				_this2.toggle();
			});
		};

		_proto._getConfig = function _getConfig(config) {
			config = _extends({}, this.constructor.Default, Manipulator.getDataAttributes(this._element), config);
			typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

			if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
				// Popper virtual elements require a getBoundingClientRect method
				throw new TypeError(NAME$4.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
			}

			return config;
		};

		_proto._getMenuElement = function _getMenuElement() {
			return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
		};

		_proto._getPlacement = function _getPlacement() {
			const parentDropdown = this._element.parentNode;

			if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
				return PLACEMENT_RIGHT;
			}

			if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
				return PLACEMENT_LEFT;
			} // We need to trim the value because custom properties can also include spaces


			const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

			if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
				return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
			}

			return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		};

		_proto._detectNavbar = function _detectNavbar() {
			return this._element.closest('.' + CLASS_NAME_NAVBAR) !== null;
		};

		_proto._getOffset = function _getOffset() {
			const _this3 = this;

			const offset = this._config.offset;

			if (typeof offset === 'string') {
				return offset.split(',').map(function(val) {
					return Number.parseInt(val, 10);
				});
			}

			if (typeof offset === 'function') {
				return function(popperData) {
					return offset(popperData, _this3._element);
				};
			}

			return offset;
		};

		_proto._getPopperConfig = function _getPopperConfig() {
			const defaultBsPopperConfig = {
				placement: this._getPlacement(),
				modifiers: [{
					name: 'preventOverflow',
					options: {
						altBoundary: this._config.flip,
						boundary: this._config.boundary,
					},
				}, {
					name: 'offset',
					options: {
						offset: this._getOffset(),
					},
				}],
			}; // Disable Popper if we have a static display

			if (this._config.display === 'static') {
				defaultBsPopperConfig.modifiers = [{
					name: 'applyStyles',
					enabled: false,
				}];
			}

			return _extends({}, defaultBsPopperConfig, typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig);
		} // Static
		;

		Dropdown.dropdownInterface = function dropdownInterface(element, config) {
			let data = Data.getData(element, DATA_KEY$4);

			const _config = typeof config === 'object' ? config : null;

			if (!data) {
				data = new Dropdown(element, _config);
			}

			if (typeof config === 'string') {
				if (typeof data[config] === 'undefined') {
					throw new TypeError('No method named "' + config + '"');
				}

				data[config]();
			}
		};

		Dropdown.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				Dropdown.dropdownInterface(this, config);
			});
		};

		Dropdown.clearMenus = function clearMenus(event) {
			if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY)) {
				return;
			}

			const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$2);

			for (let i = 0, len = toggles.length; i < len; i++) {
				const context = Data.getData(toggles[i], DATA_KEY$4);
				const relatedTarget = {
					relatedTarget: toggles[i],
				};

				if (event && event.type === 'click') {
					relatedTarget.clickEvent = event;
				}

				if (!context) {
					continue;
				}

				const dropdownMenu = context._menu;

				if (!toggles[i].classList.contains(CLASS_NAME_SHOW$2)) {
					continue;
				}

				if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.key === TAB_KEY) && dropdownMenu.contains(event.target)) {
					continue;
				}

				const hideEvent = EventHandler.trigger(toggles[i], EVENT_HIDE$1, relatedTarget);

				if (hideEvent.defaultPrevented) {
					continue;
				} // If this is a touch-enabled device we remove the extra
				// empty mouseover listeners we added for iOS support


				if ('ontouchstart' in document.documentElement) {
					var _ref2;

					(_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function(elem) {
						return EventHandler.off(elem, 'mouseover', null, noop());
					});
				}

				toggles[i].setAttribute('aria-expanded', 'false');

				if (context._popper) {
					context._popper.destroy();
				}

				dropdownMenu.classList.remove(CLASS_NAME_SHOW$2);
				toggles[i].classList.remove(CLASS_NAME_SHOW$2);
				Manipulator.removeDataAttribute(dropdownMenu, 'popper');
				EventHandler.trigger(toggles[i], EVENT_HIDDEN$1, relatedTarget);
			}
		};

		Dropdown.getParentFromElement = function getParentFromElement(element) {
			return getElementFromSelector(element) || element.parentNode;
		};

		Dropdown.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
			// If not input/textarea:
			//  - And not a key in REGEXP_KEYDOWN => not a dropdown command
			// If input/textarea:
			//  - If space key => not a dropdown command
			//  - If key is other than escape
			//    - If key is not up or down => not a dropdown command
			//    - If trigger inside the menu => not a dropdown command
			if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
				return;
			}

			event.preventDefault();
			event.stopPropagation();

			if (this.disabled || this.classList.contains(CLASS_NAME_DISABLED)) {
				return;
			}

			const parent = Dropdown.getParentFromElement(this);
			const isActive = this.classList.contains(CLASS_NAME_SHOW$2);

			if (event.key === ESCAPE_KEY) {
				const button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];
				button.focus();
				Dropdown.clearMenus();
				return;
			}

			if (!isActive && (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY)) {
				const _button = this.matches(SELECTOR_DATA_TOGGLE$2) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$2)[0];

				_button.click();

				return;
			}

			if (!isActive || event.key === SPACE_KEY) {
				Dropdown.clearMenus();
				return;
			}

			const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, parent).filter(isVisible);

			if (!items.length) {
				return;
			}

			let index = items.indexOf(event.target); // Up

			if (event.key === ARROW_UP_KEY && index > 0) {
				index--;
			} // Down


			if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
				index++;
			} // index is -1 if the first keydown is an ArrowUp


			index = index === -1 ? 0 : index;
			items[index].focus();
		};

		_createClass(Dropdown, null, [{
			key: 'Default',
			get: function get() {
				return Default$2;
			},
		}, {
			key: 'DefaultType',
			get: function get() {
				return DefaultType$2;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$4;
			},
		}]);

		return Dropdown;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$2, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$2, function(event) {
		event.preventDefault();
		event.stopPropagation();
		Dropdown.dropdownInterface(this, 'toggle');
	});
	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_FORM_CHILD, function(e) {
		return e.stopPropagation();
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Dropdown to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$4, Dropdown);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$5 = 'modal';
	const DATA_KEY$5 = 'bs.modal';
	const EVENT_KEY$5 = '.' + DATA_KEY$5;
	const DATA_API_KEY$5 = '.data-api';
	const ESCAPE_KEY$1 = 'Escape';
	const Default$3 = {
		backdrop: true,
		keyboard: true,
		focus: true,
	};
	const DefaultType$3 = {
		backdrop: '(boolean|string)',
		keyboard: 'boolean',
		focus: 'boolean',
	};
	const EVENT_HIDE$2 = 'hide' + EVENT_KEY$5;
	const EVENT_HIDE_PREVENTED = 'hidePrevented' + EVENT_KEY$5;
	const EVENT_HIDDEN$2 = 'hidden' + EVENT_KEY$5;
	const EVENT_SHOW$2 = 'show' + EVENT_KEY$5;
	const EVENT_SHOWN$2 = 'shown' + EVENT_KEY$5;
	const EVENT_FOCUSIN = 'focusin' + EVENT_KEY$5;
	const EVENT_RESIZE = 'resize' + EVENT_KEY$5;
	const EVENT_CLICK_DISMISS = 'click.dismiss' + EVENT_KEY$5;
	const EVENT_KEYDOWN_DISMISS = 'keydown.dismiss' + EVENT_KEY$5;
	const EVENT_MOUSEUP_DISMISS = 'mouseup.dismiss' + EVENT_KEY$5;
	const EVENT_MOUSEDOWN_DISMISS = 'mousedown.dismiss' + EVENT_KEY$5;
	const EVENT_CLICK_DATA_API$5 = 'click' + EVENT_KEY$5 + DATA_API_KEY$5;
	const CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure';
	const CLASS_NAME_BACKDROP = 'modal-backdrop';
	const CLASS_NAME_OPEN = 'modal-open';
	const CLASS_NAME_FADE$1 = 'fade';
	const CLASS_NAME_SHOW$3 = 'show';
	const CLASS_NAME_STATIC = 'modal-static';
	const SELECTOR_DIALOG = '.modal-dialog';
	const SELECTOR_MODAL_BODY = '.modal-body';
	const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="modal"]';
	const SELECTOR_DATA_DISMISS = '[data-bs-dismiss="modal"]';
	const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	const SELECTOR_STICKY_CONTENT = '.sticky-top';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Modal = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Modal, _BaseComponent);

		function Modal(element, config) {
			let _this;

			_this = _BaseComponent.call(this, element) || this;
			_this._config = _this._getConfig(config);
			_this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, element);
			_this._backdrop = null;
			_this._isShown = false;
			_this._isBodyOverflowing = false;
			_this._ignoreBackdropClick = false;
			_this._isTransitioning = false;
			_this._scrollbarWidth = 0;
			return _this;
		} // Getters


		const _proto = Modal.prototype;

		// Public
		_proto.toggle = function toggle(relatedTarget) {
			return this._isShown ? this.hide() : this.show(relatedTarget);
		};

		_proto.show = function show(relatedTarget) {
			const _this2 = this;

			if (this._isShown || this._isTransitioning) {
				return;
			}

			if (this._element.classList.contains(CLASS_NAME_FADE$1)) {
				this._isTransitioning = true;
			}

			const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
				relatedTarget: relatedTarget,
			});

			if (this._isShown || showEvent.defaultPrevented) {
				return;
			}

			this._isShown = true;

			this._checkScrollbar();

			this._setScrollbar();

			this._adjustDialog();

			this._setEscapeEvent();

			this._setResizeEvent();

			EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function(event) {
				return _this2.hide(event);
			});
			EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, function() {
				EventHandler.one(_this2._element, EVENT_MOUSEUP_DISMISS, function(event) {
					if (event.target === _this2._element) {
						_this2._ignoreBackdropClick = true;
					}
				});
			});

			this._showBackdrop(function() {
				return _this2._showElement(relatedTarget);
			});
		};

		_proto.hide = function hide(event) {
			const _this3 = this;

			if (event) {
				event.preventDefault();
			}

			if (!this._isShown || this._isTransitioning) {
				return;
			}

			const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

			if (hideEvent.defaultPrevented) {
				return;
			}

			this._isShown = false;

			const transition = this._element.classList.contains(CLASS_NAME_FADE$1);

			if (transition) {
				this._isTransitioning = true;
			}

			this._setEscapeEvent();

			this._setResizeEvent();

			EventHandler.off(document, EVENT_FOCUSIN);

			this._element.classList.remove(CLASS_NAME_SHOW$3);

			EventHandler.off(this._element, EVENT_CLICK_DISMISS);
			EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

			if (transition) {
				const transitionDuration = getTransitionDurationFromElement(this._element);
				EventHandler.one(this._element, 'transitionend', function(event) {
					return _this3._hideModal(event);
				});
				emulateTransitionEnd(this._element, transitionDuration);
			} else {
				this._hideModal();
			}
		};

		_proto.dispose = function dispose() {
			[window, this._element, this._dialog].forEach(function(htmlElement) {
				return EventHandler.off(htmlElement, EVENT_KEY$5);
			});

			_BaseComponent.prototype.dispose.call(this);
			/**
			 * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
			 * Do not move `document` in `htmlElements` array
			 * It will remove `EVENT_CLICK_DATA_API` event that should remain
			 */


			EventHandler.off(document, EVENT_FOCUSIN);
			this._config = null;
			this._dialog = null;
			this._backdrop = null;
			this._isShown = null;
			this._isBodyOverflowing = null;
			this._ignoreBackdropClick = null;
			this._isTransitioning = null;
			this._scrollbarWidth = null;
		};

		_proto.handleUpdate = function handleUpdate() {
			this._adjustDialog();
		} // Private
		;

		_proto._getConfig = function _getConfig(config) {
			config = _extends({}, Default$3, config);
			typeCheckConfig(NAME$5, config, DefaultType$3);
			return config;
		};

		_proto._showElement = function _showElement(relatedTarget) {
			const _this4 = this;

			const transition = this._element.classList.contains(CLASS_NAME_FADE$1);

			const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

			if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
				// Don't move modal's DOM position
				document.body.appendChild(this._element);
			}

			this._element.style.display = 'block';

			this._element.removeAttribute('aria-hidden');

			this._element.setAttribute('aria-modal', true);

			this._element.setAttribute('role', 'dialog');

			this._element.scrollTop = 0;

			if (modalBody) {
				modalBody.scrollTop = 0;
			}

			if (transition) {
				reflow(this._element);
			}

			this._element.classList.add(CLASS_NAME_SHOW$3);

			if (this._config.focus) {
				this._enforceFocus();
			}

			const transitionComplete = function transitionComplete() {
				if (_this4._config.focus) {
					_this4._element.focus();
				}

				_this4._isTransitioning = false;
				EventHandler.trigger(_this4._element, EVENT_SHOWN$2, {
					relatedTarget: relatedTarget,
				});
			};

			if (transition) {
				const transitionDuration = getTransitionDurationFromElement(this._dialog);
				EventHandler.one(this._dialog, 'transitionend', transitionComplete);
				emulateTransitionEnd(this._dialog, transitionDuration);
			} else {
				transitionComplete();
			}
		};

		_proto._enforceFocus = function _enforceFocus() {
			const _this5 = this;

			EventHandler.off(document, EVENT_FOCUSIN); // guard against infinite focus loop

			EventHandler.on(document, EVENT_FOCUSIN, function(event) {
				if (document !== event.target && _this5._element !== event.target && !_this5._element.contains(event.target)) {
					_this5._element.focus();
				}
			});
		};

		_proto._setEscapeEvent = function _setEscapeEvent() {
			const _this6 = this;

			if (this._isShown) {
				EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function(event) {
					if (_this6._config.keyboard && event.key === ESCAPE_KEY$1) {
						event.preventDefault();

						_this6.hide();
					} else if (!_this6._config.keyboard && event.key === ESCAPE_KEY$1) {
						_this6._triggerBackdropTransition();
					}
				});
			} else {
				EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS);
			}
		};

		_proto._setResizeEvent = function _setResizeEvent() {
			const _this7 = this;

			if (this._isShown) {
				EventHandler.on(window, EVENT_RESIZE, function() {
					return _this7._adjustDialog();
				});
			} else {
				EventHandler.off(window, EVENT_RESIZE);
			}
		};

		_proto._hideModal = function _hideModal() {
			const _this8 = this;

			this._element.style.display = 'none';

			this._element.setAttribute('aria-hidden', true);

			this._element.removeAttribute('aria-modal');

			this._element.removeAttribute('role');

			this._isTransitioning = false;

			this._showBackdrop(function() {
				document.body.classList.remove(CLASS_NAME_OPEN);

				_this8._resetAdjustments();

				_this8._resetScrollbar();

				EventHandler.trigger(_this8._element, EVENT_HIDDEN$2);
			});
		};

		_proto._removeBackdrop = function _removeBackdrop() {
			this._backdrop.parentNode.removeChild(this._backdrop);

			this._backdrop = null;
		};

		_proto._showBackdrop = function _showBackdrop(callback) {
			const _this9 = this;

			const animate = this._element.classList.contains(CLASS_NAME_FADE$1) ? CLASS_NAME_FADE$1 : '';

			if (this._isShown && this._config.backdrop) {
				this._backdrop = document.createElement('div');
				this._backdrop.className = CLASS_NAME_BACKDROP;

				if (animate) {
					this._backdrop.classList.add(animate);
				}

				document.body.appendChild(this._backdrop);
				EventHandler.on(this._element, EVENT_CLICK_DISMISS, function(event) {
					if (_this9._ignoreBackdropClick) {
						_this9._ignoreBackdropClick = false;
						return;
					}

					if (event.target !== event.currentTarget) {
						return;
					}

					if (_this9._config.backdrop === 'static') {
						_this9._triggerBackdropTransition();
					} else {
						_this9.hide();
					}
				});

				if (animate) {
					reflow(this._backdrop);
				}

				this._backdrop.classList.add(CLASS_NAME_SHOW$3);

				if (!animate) {
					callback();
					return;
				}

				const backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);
				EventHandler.one(this._backdrop, 'transitionend', callback);
				emulateTransitionEnd(this._backdrop, backdropTransitionDuration);
			} else if (!this._isShown && this._backdrop) {
				this._backdrop.classList.remove(CLASS_NAME_SHOW$3);

				const callbackRemove = function callbackRemove() {
					_this9._removeBackdrop();

					callback();
				};

				if (this._element.classList.contains(CLASS_NAME_FADE$1)) {
					const _backdropTransitionDuration = getTransitionDurationFromElement(this._backdrop);

					EventHandler.one(this._backdrop, 'transitionend', callbackRemove);
					emulateTransitionEnd(this._backdrop, _backdropTransitionDuration);
				} else {
					callbackRemove();
				}
			} else {
				callback();
			}
		};

		_proto._triggerBackdropTransition = function _triggerBackdropTransition() {
			const _this10 = this;

			const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

			if (hideEvent.defaultPrevented) {
				return;
			}

			const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

			if (!isModalOverflowing) {
				this._element.style.overflowY = 'hidden';
			}

			this._element.classList.add(CLASS_NAME_STATIC);

			const modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
			EventHandler.off(this._element, 'transitionend');
			EventHandler.one(this._element, 'transitionend', function() {
				_this10._element.classList.remove(CLASS_NAME_STATIC);

				if (!isModalOverflowing) {
					EventHandler.one(_this10._element, 'transitionend', function() {
						_this10._element.style.overflowY = '';
					});
					emulateTransitionEnd(_this10._element, modalTransitionDuration);
				}
			});
			emulateTransitionEnd(this._element, modalTransitionDuration);

			this._element.focus();
		} // ----------------------------------------------------------------------
		// the following methods are used to handle overflowing modals
		// ----------------------------------------------------------------------
		;

		_proto._adjustDialog = function _adjustDialog() {
			const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

			if (!this._isBodyOverflowing && isModalOverflowing && !isRTL || this._isBodyOverflowing && !isModalOverflowing && isRTL) {
				this._element.style.paddingLeft = this._scrollbarWidth + 'px';
			}

			if (this._isBodyOverflowing && !isModalOverflowing && !isRTL || !this._isBodyOverflowing && isModalOverflowing && isRTL) {
				this._element.style.paddingRight = this._scrollbarWidth + 'px';
			}
		};

		_proto._resetAdjustments = function _resetAdjustments() {
			this._element.style.paddingLeft = '';
			this._element.style.paddingRight = '';
		};

		_proto._checkScrollbar = function _checkScrollbar() {
			const rect = document.body.getBoundingClientRect();
			this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth;
			this._scrollbarWidth = this._getScrollbarWidth();
		};

		_proto._setScrollbar = function _setScrollbar() {
			const _this11 = this;

			if (this._isBodyOverflowing) {
				this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', function(calculatedValue) {
					return calculatedValue + _this11._scrollbarWidth;
				});

				this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', function(calculatedValue) {
					return calculatedValue - _this11._scrollbarWidth;
				});

				this._setElementAttributes('body', 'paddingRight', function(calculatedValue) {
					return calculatedValue + _this11._scrollbarWidth;
				});
			}

			document.body.classList.add(CLASS_NAME_OPEN);
		};

		_proto._setElementAttributes = function _setElementAttributes(selector, styleProp, callback) {
			SelectorEngine.find(selector).forEach(function(element) {
				const actualValue = element.style[styleProp];
				const calculatedValue = window.getComputedStyle(element)[styleProp];
				Manipulator.setDataAttribute(element, styleProp, actualValue);
				element.style[styleProp] = callback(Number.parseFloat(calculatedValue)) + 'px';
			});
		};

		_proto._resetScrollbar = function _resetScrollbar() {
			this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

			this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');

			this._resetElementAttributes('body', 'paddingRight');
		};

		_proto._resetElementAttributes = function _resetElementAttributes(selector, styleProp) {
			SelectorEngine.find(selector).forEach(function(element) {
				const value = Manipulator.getDataAttribute(element, styleProp);

				if (typeof value === 'undefined' && element === document.body) {
					element.style[styleProp] = '';
				} else {
					Manipulator.removeDataAttribute(element, styleProp);
					element.style[styleProp] = value;
				}
			});
		};

		_proto._getScrollbarWidth = function _getScrollbarWidth() {
			// thx d.walsh
			const scrollDiv = document.createElement('div');
			scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER;
			document.body.appendChild(scrollDiv);
			const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
			return scrollbarWidth;
		} // Static
		;

		Modal.jQueryInterface = function jQueryInterface(config, relatedTarget) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY$5);

				const _config = _extends({}, Default$3, Manipulator.getDataAttributes(this), typeof config === 'object' && config ? config : {});

				if (!data) {
					data = new Modal(this, _config);
				}

				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError('No method named "' + config + '"');
					}

					data[config](relatedTarget);
				}
			});
		};

		_createClass(Modal, null, [{
			key: 'Default',
			get: function get() {
				return Default$3;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$5;
			},
		}]);

		return Modal;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_TOGGLE$3, function(event) {
		const _this12 = this;

		const target = getElementFromSelector(this);

		if (this.tagName === 'A' || this.tagName === 'AREA') {
			event.preventDefault();
		}

		EventHandler.one(target, EVENT_SHOW$2, function(showEvent) {
			if (showEvent.defaultPrevented) {
				// only register focus restorer if modal will actually get shown
				return;
			}

			EventHandler.one(target, EVENT_HIDDEN$2, function() {
				if (isVisible(_this12)) {
					_this12.focus();
				}
			});
		});
		let data = Data.getData(target, DATA_KEY$5);

		if (!data) {
			const config = _extends({}, Manipulator.getDataAttributes(target), Manipulator.getDataAttributes(this));

			data = new Modal(target, config);
		}

		data.toggle(this);
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Modal to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$5, Modal);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): util/sanitizer.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	/**
	 * A pattern that recognizes a commonly useful subset of URLs that are safe.
	 *
	 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	 */

	const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi;
	/**
	 * A pattern that matches safe data URLs. Only matches image, video and audio types.
	 *
	 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
	 */

	const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	const allowedAttribute = function allowedAttribute(attr, allowedAttributeList) {
		const attrName = attr.nodeName.toLowerCase();

		if (allowedAttributeList.includes(attrName)) {
			if (uriAttrs.has(attrName)) {
				return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
			}

			return true;
		}

		const regExp = allowedAttributeList.filter(function(attrRegex) {
			return attrRegex instanceof RegExp;
		}); // Check if a regular expression validates the attribute.

		for (let i = 0, len = regExp.length; i < len; i++) {
			if (regExp[i].test(attrName)) {
				return true;
			}
		}

		return false;
	};

	const DefaultAllowlist = {
		// Global attributes allowed on any supplied element below.
		'*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
		a: ['target', 'href', 'title', 'rel'],
		area: [],
		b: [],
		br: [],
		col: [],
		code: [],
		div: [],
		em: [],
		hr: [],
		h1: [],
		h2: [],
		h3: [],
		h4: [],
		h5: [],
		h6: [],
		i: [],
		img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
		li: [],
		ol: [],
		p: [],
		pre: [],
		s: [],
		small: [],
		span: [],
		sub: [],
		sup: [],
		strong: [],
		u: [],
		ul: [],
	};
	function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
		let _ref;

		if (!unsafeHtml.length) {
			return unsafeHtml;
		}

		if (sanitizeFn && typeof sanitizeFn === 'function') {
			return sanitizeFn(unsafeHtml);
		}

		const domParser = new window.DOMParser();
		const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
		const allowlistKeys = Object.keys(allowList);

		const elements = (_ref = []).concat.apply(_ref, createdDocument.body.querySelectorAll('*'));

		const _loop = function _loop(i, len) {
			let _ref2;

			const el = elements[i];
			const elName = el.nodeName.toLowerCase();

			if (!allowlistKeys.includes(elName)) {
				el.parentNode.removeChild(el);
				return 'continue';
			}

			const attributeList = (_ref2 = []).concat.apply(_ref2, el.attributes);

			const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
			attributeList.forEach(function(attr) {
				if (!allowedAttribute(attr, allowedAttributes)) {
					el.removeAttribute(attr.nodeName);
				}
			});
		};

		for (let i = 0, len = elements.length; i < len; i++) {
			const _ret = _loop(i);

			if (_ret === 'continue') continue;
		}

		return createdDocument.body.innerHTML;
	}

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$6 = 'tooltip';
	const DATA_KEY$6 = 'bs.tooltip';
	const EVENT_KEY$6 = '.' + DATA_KEY$6;
	const CLASS_PREFIX = 'bs-tooltip';
	const BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');
	const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	const DefaultType$4 = {
		animation: 'boolean',
		template: 'string',
		title: '(string|element|function)',
		trigger: 'string',
		delay: '(number|object)',
		html: 'boolean',
		selector: '(string|boolean)',
		placement: '(string|function)',
		offset: '(array|string|function)',
		container: '(string|element|boolean)',
		fallbackPlacements: 'array',
		boundary: '(string|element)',
		customClass: '(string|function)',
		sanitize: 'boolean',
		sanitizeFn: '(null|function)',
		allowList: 'object',
		popperConfig: '(null|object|function)',
	};
	const AttachmentMap = {
		AUTO: 'auto',
		TOP: 'top',
		RIGHT: isRTL ? 'left' : 'right',
		BOTTOM: 'bottom',
		LEFT: isRTL ? 'right' : 'left',
	};
	const Default$4 = {
		animation: true,
		template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
		trigger: 'hover focus',
		title: '',
		delay: 0,
		html: false,
		selector: false,
		placement: 'top',
		offset: [0, 0],
		container: false,
		fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		boundary: 'clippingParents',
		customClass: '',
		sanitize: true,
		sanitizeFn: null,
		allowList: DefaultAllowlist,
		popperConfig: null,
	};
	const Event$1 = {
		HIDE: 'hide' + EVENT_KEY$6,
		HIDDEN: 'hidden' + EVENT_KEY$6,
		SHOW: 'show' + EVENT_KEY$6,
		SHOWN: 'shown' + EVENT_KEY$6,
		INSERTED: 'inserted' + EVENT_KEY$6,
		CLICK: 'click' + EVENT_KEY$6,
		FOCUSIN: 'focusin' + EVENT_KEY$6,
		FOCUSOUT: 'focusout' + EVENT_KEY$6,
		MOUSEENTER: 'mouseenter' + EVENT_KEY$6,
		MOUSELEAVE: 'mouseleave' + EVENT_KEY$6,
	};
	const CLASS_NAME_FADE$2 = 'fade';
	const CLASS_NAME_MODAL = 'modal';
	const CLASS_NAME_SHOW$4 = 'show';
	const HOVER_STATE_SHOW = 'show';
	const HOVER_STATE_OUT = 'out';
	const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	const TRIGGER_HOVER = 'hover';
	const TRIGGER_FOCUS = 'focus';
	const TRIGGER_CLICK = 'click';
	const TRIGGER_MANUAL = 'manual';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Tooltip = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Tooltip, _BaseComponent);

		function Tooltip(element, config) {
			let _this;

			if (typeof Popper === 'undefined') {
				throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
			}

			_this = _BaseComponent.call(this, element) || this; // private

			_this._isEnabled = true;
			_this._timeout = 0;
			_this._hoverState = '';
			_this._activeTrigger = {};
			_this._popper = null; // Protected

			_this.config = _this._getConfig(config);
			_this.tip = null;

			_this._setListeners();

			return _this;
		} // Getters


		const _proto = Tooltip.prototype;

		// Public
		_proto.enable = function enable() {
			this._isEnabled = true;
		};

		_proto.disable = function disable() {
			this._isEnabled = false;
		};

		_proto.toggleEnabled = function toggleEnabled() {
			this._isEnabled = !this._isEnabled;
		};

		_proto.toggle = function toggle(event) {
			if (!this._isEnabled) {
				return;
			}

			if (event) {
				const context = this._initializeOnDelegatedTarget(event);

				context._activeTrigger.click = !context._activeTrigger.click;

				if (context._isWithActiveTrigger()) {
					context._enter(null, context);
				} else {
					context._leave(null, context);
				}
			} else {
				if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$4)) {
					this._leave(null, this);

					return;
				}

				this._enter(null, this);
			}
		};

		_proto.dispose = function dispose() {
			clearTimeout(this._timeout);
			EventHandler.off(this._element, this.constructor.EVENT_KEY);
			EventHandler.off(this._element.closest('.' + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

			if (this.tip && this.tip.parentNode) {
				this.tip.parentNode.removeChild(this.tip);
			}

			this._isEnabled = null;
			this._timeout = null;
			this._hoverState = null;
			this._activeTrigger = null;

			if (this._popper) {
				this._popper.destroy();
			}

			this._popper = null;
			this.config = null;
			this.tip = null;

			_BaseComponent.prototype.dispose.call(this);
		};

		_proto.show = function show() {
			const _this2 = this;

			if (this._element.style.display === 'none') {
				throw new Error('Please use show on visible elements');
			}

			if (!(this.isWithContent() && this._isEnabled)) {
				return;
			}

			const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
			const shadowRoot = findShadowRoot(this._element);
			const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

			if (showEvent.defaultPrevented || !isInTheDom) {
				return;
			}

			const tip = this.getTipElement();
			const tipId = getUID(this.constructor.NAME);
			tip.setAttribute('id', tipId);

			this._element.setAttribute('aria-describedby', tipId);

			this.setContent();

			if (this.config.animation) {
				tip.classList.add(CLASS_NAME_FADE$2);
			}

			const placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this._element) : this.config.placement;

			const attachment = this._getAttachment(placement);

			this._addAttachmentClass(attachment);

			const container = this._getContainer();

			Data.setData(tip, this.constructor.DATA_KEY, this);

			if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
				container.appendChild(tip);
			}

			EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
			this._popper = createPopper$2(this._element, tip, this._getPopperConfig(attachment));
			tip.classList.add(CLASS_NAME_SHOW$4);
			const customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass;

			if (customClass) {
				let _tip$classList;

				(_tip$classList = tip.classList).add.apply(_tip$classList, customClass.split(' '));
			} // If this is a touch-enabled device we add extra
			// empty mouseover listeners to the body's immediate children;
			// only needed because of broken event delegation on iOS
			// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


			if ('ontouchstart' in document.documentElement) {
				let _ref;

				(_ref = []).concat.apply(_ref, document.body.children).forEach(function(element) {
					EventHandler.on(element, 'mouseover', noop());
				});
			}

			const complete = function complete() {
				const prevHoverState = _this2._hoverState;
				_this2._hoverState = null;
				EventHandler.trigger(_this2._element, _this2.constructor.Event.SHOWN);

				if (prevHoverState === HOVER_STATE_OUT) {
					_this2._leave(null, _this2);
				}
			};

			if (this.tip.classList.contains(CLASS_NAME_FADE$2)) {
				const transitionDuration = getTransitionDurationFromElement(this.tip);
				EventHandler.one(this.tip, 'transitionend', complete);
				emulateTransitionEnd(this.tip, transitionDuration);
			} else {
				complete();
			}
		};

		_proto.hide = function hide() {
			const _this3 = this;

			if (!this._popper) {
				return;
			}

			const tip = this.getTipElement();

			const complete = function complete() {
				if (_this3._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
					tip.parentNode.removeChild(tip);
				}

				_this3._cleanTipClass();

				_this3._element.removeAttribute('aria-describedby');

				EventHandler.trigger(_this3._element, _this3.constructor.Event.HIDDEN);

				if (_this3._popper) {
					_this3._popper.destroy();

					_this3._popper = null;
				}
			};

			const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

			if (hideEvent.defaultPrevented) {
				return;
			}

			tip.classList.remove(CLASS_NAME_SHOW$4); // If this is a touch-enabled device we remove the extra
			// empty mouseover listeners we added for iOS support

			if ('ontouchstart' in document.documentElement) {
				let _ref2;

				(_ref2 = []).concat.apply(_ref2, document.body.children).forEach(function(element) {
					return EventHandler.off(element, 'mouseover', noop);
				});
			}

			this._activeTrigger[TRIGGER_CLICK] = false;
			this._activeTrigger[TRIGGER_FOCUS] = false;
			this._activeTrigger[TRIGGER_HOVER] = false;

			if (this.tip.classList.contains(CLASS_NAME_FADE$2)) {
				const transitionDuration = getTransitionDurationFromElement(tip);
				EventHandler.one(tip, 'transitionend', complete);
				emulateTransitionEnd(tip, transitionDuration);
			} else {
				complete();
			}

			this._hoverState = '';
		};

		_proto.update = function update() {
			if (this._popper !== null) {
				this._popper.update();
			}
		} // Protected
		;

		_proto.isWithContent = function isWithContent() {
			return Boolean(this.getTitle());
		};

		_proto.getTipElement = function getTipElement() {
			if (this.tip) {
				return this.tip;
			}

			const element = document.createElement('div');
			element.innerHTML = this.config.template;
			this.tip = element.children[0];
			return this.tip;
		};

		_proto.setContent = function setContent() {
			const tip = this.getTipElement();
			this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
			tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$4);
		};

		_proto.setElementContent = function setElementContent(element, content) {
			if (element === null) {
				return;
			}

			if (typeof content === 'object' && isElement(content)) {
				if (content.jquery) {
					content = content[0];
				} // content is a DOM node or a jQuery


				if (this.config.html) {
					if (content.parentNode !== element) {
						element.innerHTML = '';
						element.appendChild(content);
					}
				} else {
					element.textContent = content.textContent;
				}

				return;
			}

			if (this.config.html) {
				if (this.config.sanitize) {
					content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
				}

				element.innerHTML = content;
			} else {
				element.textContent = content;
			}
		};

		_proto.getTitle = function getTitle() {
			let title = this._element.getAttribute('data-bs-original-title');

			if (!title) {
				title = typeof this.config.title === 'function' ? this.config.title.call(this._element) : this.config.title;
			}

			return title;
		};

		_proto.updateAttachment = function updateAttachment(attachment) {
			if (attachment === 'right') {
				return 'end';
			}

			if (attachment === 'left') {
				return 'start';
			}

			return attachment;
		} // Private
		;

		_proto._initializeOnDelegatedTarget = function _initializeOnDelegatedTarget(event, context) {
			const dataKey = this.constructor.DATA_KEY;
			context = context || Data.getData(event.delegateTarget, dataKey);

			if (!context) {
				context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
				Data.setData(event.delegateTarget, dataKey, context);
			}

			return context;
		};

		_proto._getOffset = function _getOffset() {
			const _this4 = this;

			const offset = this.config.offset;

			if (typeof offset === 'string') {
				return offset.split(',').map(function(val) {
					return Number.parseInt(val, 10);
				});
			}

			if (typeof offset === 'function') {
				return function(popperData) {
					return offset(popperData, _this4._element);
				};
			}

			return offset;
		};

		_proto._getPopperConfig = function _getPopperConfig(attachment) {
			const _this5 = this;

			const defaultBsPopperConfig = {
				placement: attachment,
				modifiers: [{
					name: 'flip',
					options: {
						altBoundary: true,
						fallbackPlacements: this.config.fallbackPlacements,
					},
				}, {
					name: 'offset',
					options: {
						offset: this._getOffset(),
					},
				}, {
					name: 'preventOverflow',
					options: {
						boundary: this.config.boundary,
					},
				}, {
					name: 'arrow',
					options: {
						element: '.' + this.constructor.NAME + '-arrow',
					},
				}, {
					name: 'onChange',
					enabled: true,
					phase: 'afterWrite',
					fn: function fn(data) {
						return _this5._handlePopperPlacementChange(data);
					},
				}],
				onFirstUpdate: function onFirstUpdate(data) {
					if (data.options.placement !== data.placement) {
						_this5._handlePopperPlacementChange(data);
					}
				},
			};
			return _extends({}, defaultBsPopperConfig, typeof this.config.popperConfig === 'function' ? this.config.popperConfig(defaultBsPopperConfig) : this.config.popperConfig);
		};

		_proto._addAttachmentClass = function _addAttachmentClass(attachment) {
			this.getTipElement().classList.add(CLASS_PREFIX + '-' + this.updateAttachment(attachment));
		};

		_proto._getContainer = function _getContainer() {
			if (this.config.container === false) {
				return document.body;
			}

			if (isElement(this.config.container)) {
				return this.config.container;
			}

			return SelectorEngine.findOne(this.config.container);
		};

		_proto._getAttachment = function _getAttachment(placement) {
			return AttachmentMap[placement.toUpperCase()];
		};

		_proto._setListeners = function _setListeners() {
			const _this6 = this;

			const triggers = this.config.trigger.split(' ');
			triggers.forEach(function(trigger) {
				if (trigger === 'click') {
					EventHandler.on(_this6._element, _this6.constructor.Event.CLICK, _this6.config.selector, function(event) {
						return _this6.toggle(event);
					});
				} else if (trigger !== TRIGGER_MANUAL) {
					const eventIn = trigger === TRIGGER_HOVER ? _this6.constructor.Event.MOUSEENTER : _this6.constructor.Event.FOCUSIN;
					const eventOut = trigger === TRIGGER_HOVER ? _this6.constructor.Event.MOUSELEAVE : _this6.constructor.Event.FOCUSOUT;
					EventHandler.on(_this6._element, eventIn, _this6.config.selector, function(event) {
						return _this6._enter(event);
					});
					EventHandler.on(_this6._element, eventOut, _this6.config.selector, function(event) {
						return _this6._leave(event);
					});
				}
			});

			this._hideModalHandler = function() {
				if (_this6._element) {
					_this6.hide();
				}
			};

			EventHandler.on(this._element.closest('.' + CLASS_NAME_MODAL), 'hide.bs.modal', this._hideModalHandler);

			if (this.config.selector) {
				this.config = _extends({}, this.config, {
					trigger: 'manual',
					selector: '',
				});
			} else {
				this._fixTitle();
			}
		};

		_proto._fixTitle = function _fixTitle() {
			const title = this._element.getAttribute('title');

			const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

			if (title || originalTitleType !== 'string') {
				this._element.setAttribute('data-bs-original-title', title || '');

				if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
					this._element.setAttribute('aria-label', title);
				}

				this._element.setAttribute('title', '');
			}
		};

		_proto._enter = function _enter(event, context) {
			context = this._initializeOnDelegatedTarget(event, context);

			if (event) {
				context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
			}

			if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$4) || context._hoverState === HOVER_STATE_SHOW) {
				context._hoverState = HOVER_STATE_SHOW;
				return;
			}

			clearTimeout(context._timeout);
			context._hoverState = HOVER_STATE_SHOW;

			if (!context.config.delay || !context.config.delay.show) {
				context.show();
				return;
			}

			context._timeout = setTimeout(function() {
				if (context._hoverState === HOVER_STATE_SHOW) {
					context.show();
				}
			}, context.config.delay.show);
		};

		_proto._leave = function _leave(event, context) {
			context = this._initializeOnDelegatedTarget(event, context);

			if (event) {
				context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
			}

			if (context._isWithActiveTrigger()) {
				return;
			}

			clearTimeout(context._timeout);
			context._hoverState = HOVER_STATE_OUT;

			if (!context.config.delay || !context.config.delay.hide) {
				context.hide();
				return;
			}

			context._timeout = setTimeout(function() {
				if (context._hoverState === HOVER_STATE_OUT) {
					context.hide();
				}
			}, context.config.delay.hide);
		};

		_proto._isWithActiveTrigger = function _isWithActiveTrigger() {
			for (const trigger in this._activeTrigger) {
				if (this._activeTrigger[trigger]) {
					return true;
				}
			}

			return false;
		};

		_proto._getConfig = function _getConfig(config) {
			const dataAttributes = Manipulator.getDataAttributes(this._element);
			Object.keys(dataAttributes).forEach(function(dataAttr) {
				if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
					delete dataAttributes[dataAttr];
				}
			});

			if (config && typeof config.container === 'object' && config.container.jquery) {
				config.container = config.container[0];
			}

			config = _extends({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

			if (typeof config.delay === 'number') {
				config.delay = {
					show: config.delay,
					hide: config.delay,
				};
			}

			if (typeof config.title === 'number') {
				config.title = config.title.toString();
			}

			if (typeof config.content === 'number') {
				config.content = config.content.toString();
			}

			typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

			if (config.sanitize) {
				config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
			}

			return config;
		};

		_proto._getDelegateConfig = function _getDelegateConfig() {
			const config = {};

			if (this.config) {
				for (const key in this.config) {
					if (this.constructor.Default[key] !== this.config[key]) {
						config[key] = this.config[key];
					}
				}
			}

			return config;
		};

		_proto._cleanTipClass = function _cleanTipClass() {
			const tip = this.getTipElement();
			const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

			if (tabClass !== null && tabClass.length > 0) {
				tabClass.map(function(token) {
					return token.trim();
				}).forEach(function(tClass) {
					return tip.classList.remove(tClass);
				});
			}
		};

		_proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
			const state = popperData.state;

			if (!state) {
				return;
			}

			this.tip = state.elements.popper;

			this._cleanTipClass();

			this._addAttachmentClass(this._getAttachment(state.placement));
		} // Static
		;

		Tooltip.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY$6);

				const _config = typeof config === 'object' && config;

				if (!data && /dispose|hide/.test(config)) {
					return;
				}

				if (!data) {
					data = new Tooltip(this, _config);
				}

				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError('No method named "' + config + '"');
					}

					data[config]();
				}
			});
		};

		_createClass(Tooltip, null, [{
			key: 'Default',
			get: function get() {
				return Default$4;
			},
		}, {
			key: 'NAME',
			get: function get() {
				return NAME$6;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$6;
			},
		}, {
			key: 'Event',
			get: function get() {
				return Event$1;
			},
		}, {
			key: 'EVENT_KEY',
			get: function get() {
				return EVENT_KEY$6;
			},
		}, {
			key: 'DefaultType',
			get: function get() {
				return DefaultType$4;
			},
		}]);

		return Tooltip;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Tooltip to jQuery only if jQuery is present
	 */


	defineJQueryPlugin(NAME$6, Tooltip);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$7 = 'popover';
	const DATA_KEY$7 = 'bs.popover';
	const EVENT_KEY$7 = '.' + DATA_KEY$7;
	const CLASS_PREFIX$1 = 'bs-popover';
	const BSCLS_PREFIX_REGEX$1 = new RegExp('(^|\\s)' + CLASS_PREFIX$1 + '\\S+', 'g');

	const Default$5 = _extends({}, Tooltip.Default, {
		placement: 'right',
		offset: [0, 8],
		trigger: 'click',
		content: '',
		template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
	});

	const DefaultType$5 = _extends({}, Tooltip.DefaultType, {
		content: '(string|element|function)',
	});

	const Event$2 = {
		HIDE: 'hide' + EVENT_KEY$7,
		HIDDEN: 'hidden' + EVENT_KEY$7,
		SHOW: 'show' + EVENT_KEY$7,
		SHOWN: 'shown' + EVENT_KEY$7,
		INSERTED: 'inserted' + EVENT_KEY$7,
		CLICK: 'click' + EVENT_KEY$7,
		FOCUSIN: 'focusin' + EVENT_KEY$7,
		FOCUSOUT: 'focusout' + EVENT_KEY$7,
		MOUSEENTER: 'mouseenter' + EVENT_KEY$7,
		MOUSELEAVE: 'mouseleave' + EVENT_KEY$7,
	};
	const CLASS_NAME_FADE$3 = 'fade';
	const CLASS_NAME_SHOW$5 = 'show';
	const SELECTOR_TITLE = '.popover-header';
	const SELECTOR_CONTENT = '.popover-body';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Popover = /* #__PURE__*/function(_Tooltip) {
		_inheritsLoose(Popover, _Tooltip);

		function Popover() {
			return _Tooltip.apply(this, arguments) || this;
		}

		const _proto = Popover.prototype;

		// Overrides
		_proto.isWithContent = function isWithContent() {
			return this.getTitle() || this._getContent();
		};

		_proto.setContent = function setContent() {
			const tip = this.getTipElement(); // we use append for html objects to maintain js events

			this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

			let content = this._getContent();

			if (typeof content === 'function') {
				content = content.call(this._element);
			}

			this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
			tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$5);
		} // Private
		;

		_proto._addAttachmentClass = function _addAttachmentClass(attachment) {
			this.getTipElement().classList.add(CLASS_PREFIX$1 + '-' + this.updateAttachment(attachment));
		};

		_proto._getContent = function _getContent() {
			return this._element.getAttribute('data-bs-content') || this.config.content;
		};

		_proto._cleanTipClass = function _cleanTipClass() {
			const tip = this.getTipElement();
			const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

			if (tabClass !== null && tabClass.length > 0) {
				tabClass.map(function(token) {
					return token.trim();
				}).forEach(function(tClass) {
					return tip.classList.remove(tClass);
				});
			}
		} // Static
		;

		Popover.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY$7);

				const _config = typeof config === 'object' ? config : null;

				if (!data && /dispose|hide/.test(config)) {
					return;
				}

				if (!data) {
					data = new Popover(this, _config);
					Data.setData(this, DATA_KEY$7, data);
				}

				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError('No method named "' + config + '"');
					}

					data[config]();
				}
			});
		};

		_createClass(Popover, null, [{
			key: 'Default',
			get: // Getters
			function get() {
				return Default$5;
			},
		}, {
			key: 'NAME',
			get: function get() {
				return NAME$7;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$7;
			},
		}, {
			key: 'Event',
			get: function get() {
				return Event$2;
			},
		}, {
			key: 'EVENT_KEY',
			get: function get() {
				return EVENT_KEY$7;
			},
		}, {
			key: 'DefaultType',
			get: function get() {
				return DefaultType$5;
			},
		}]);

		return Popover;
	}(Tooltip);
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Popover to jQuery only if jQuery is present
	 */


	defineJQueryPlugin(NAME$7, Popover);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$8 = 'scrollspy';
	const DATA_KEY$8 = 'bs.scrollspy';
	const EVENT_KEY$8 = '.' + DATA_KEY$8;
	const DATA_API_KEY$6 = '.data-api';
	const Default$6 = {
		offset: 10,
		method: 'auto',
		target: '',
	};
	const DefaultType$6 = {
		offset: 'number',
		method: 'string',
		target: '(string|element)',
	};
	const EVENT_ACTIVATE = 'activate' + EVENT_KEY$8;
	const EVENT_SCROLL = 'scroll' + EVENT_KEY$8;
	const EVENT_LOAD_DATA_API$1 = 'load' + EVENT_KEY$8 + DATA_API_KEY$6;
	const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	const CLASS_NAME_ACTIVE$2 = 'active';
	const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	const SELECTOR_NAV_LINKS = '.nav-link';
	const SELECTOR_NAV_ITEMS = '.nav-item';
	const SELECTOR_LIST_ITEMS = '.list-group-item';
	const SELECTOR_DROPDOWN = '.dropdown';
	const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	const METHOD_OFFSET = 'offset';
	const METHOD_POSITION = 'position';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const ScrollSpy = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(ScrollSpy, _BaseComponent);

		function ScrollSpy(element, config) {
			let _this;

			_this = _BaseComponent.call(this, element) || this;
			_this._scrollElement = element.tagName === 'BODY' ? window : element;
			_this._config = _this._getConfig(config);
			_this._selector = _this._config.target + ' ' + SELECTOR_NAV_LINKS + ', ' + _this._config.target + ' ' + SELECTOR_LIST_ITEMS + ', ' + _this._config.target + ' .' + CLASS_NAME_DROPDOWN_ITEM;
			_this._offsets = [];
			_this._targets = [];
			_this._activeTarget = null;
			_this._scrollHeight = 0;
			EventHandler.on(_this._scrollElement, EVENT_SCROLL, function() {
				return _this._process();
			});

			_this.refresh();

			_this._process();

			return _this;
		} // Getters


		const _proto = ScrollSpy.prototype;

		// Public
		_proto.refresh = function refresh() {
			const _this2 = this;

			const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
			const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
			const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
			this._offsets = [];
			this._targets = [];
			this._scrollHeight = this._getScrollHeight();
			const targets = SelectorEngine.find(this._selector);
			targets.map(function(element) {
				const targetSelector = getSelectorFromElement(element);
				const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

				if (target) {
					const targetBCR = target.getBoundingClientRect();

					if (targetBCR.width || targetBCR.height) {
						return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
					}
				}

				return null;
			}).filter(function(item) {
				return item;
			}).sort(function(a, b) {
				return a[0] - b[0];
			}).forEach(function(item) {
				_this2._offsets.push(item[0]);

				_this2._targets.push(item[1]);
			});
		};

		_proto.dispose = function dispose() {
			_BaseComponent.prototype.dispose.call(this);

			EventHandler.off(this._scrollElement, EVENT_KEY$8);
			this._scrollElement = null;
			this._config = null;
			this._selector = null;
			this._offsets = null;
			this._targets = null;
			this._activeTarget = null;
			this._scrollHeight = null;
		} // Private
		;

		_proto._getConfig = function _getConfig(config) {
			config = _extends({}, Default$6, typeof config === 'object' && config ? config : {});

			if (typeof config.target !== 'string' && isElement(config.target)) {
				let id = config.target.id;

				if (!id) {
					id = getUID(NAME$8);
					config.target.id = id;
				}

				config.target = '#' + id;
			}

			typeCheckConfig(NAME$8, config, DefaultType$6);
			return config;
		};

		_proto._getScrollTop = function _getScrollTop() {
			return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
		};

		_proto._getScrollHeight = function _getScrollHeight() {
			return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		};

		_proto._getOffsetHeight = function _getOffsetHeight() {
			return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
		};

		_proto._process = function _process() {
			const scrollTop = this._getScrollTop() + this._config.offset;

			const scrollHeight = this._getScrollHeight();

			const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

			if (this._scrollHeight !== scrollHeight) {
				this.refresh();
			}

			if (scrollTop >= maxScroll) {
				const target = this._targets[this._targets.length - 1];

				if (this._activeTarget !== target) {
					this._activate(target);
				}

				return;
			}

			if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
				this._activeTarget = null;

				this._clear();

				return;
			}

			for (let i = this._offsets.length; i--;) {
				const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

				if (isActiveTarget) {
					this._activate(this._targets[i]);
				}
			}
		};

		_proto._activate = function _activate(target) {
			this._activeTarget = target;

			this._clear();

			const queries = this._selector.split(',').map(function(selector) {
				return selector + '[data-bs-target="' + target + '"],' + selector + '[href="' + target + '"]';
			});

			const link = SelectorEngine.findOne(queries.join(','));

			if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
				SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE, link.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$2);
				link.classList.add(CLASS_NAME_ACTIVE$2);
			} else {
				// Set triggered link as active
				link.classList.add(CLASS_NAME_ACTIVE$2);
				SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP).forEach(function(listGroup) {
					// Set triggered links parents as active
					// With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
					SelectorEngine.prev(listGroup, SELECTOR_NAV_LINKS + ', ' + SELECTOR_LIST_ITEMS).forEach(function(item) {
						return item.classList.add(CLASS_NAME_ACTIVE$2);
					}); // Handle special case when .nav-link is inside .nav-item

					SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(function(navItem) {
						SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(function(item) {
							return item.classList.add(CLASS_NAME_ACTIVE$2);
						});
					});
				});
			}

			EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
				relatedTarget: target,
			});
		};

		_proto._clear = function _clear() {
			SelectorEngine.find(this._selector).filter(function(node) {
				return node.classList.contains(CLASS_NAME_ACTIVE$2);
			}).forEach(function(node) {
				return node.classList.remove(CLASS_NAME_ACTIVE$2);
			});
		} // Static
		;

		ScrollSpy.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY$8);

				const _config = typeof config === 'object' && config;

				if (!data) {
					data = new ScrollSpy(this, _config);
				}

				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError('No method named "' + config + '"');
					}

					data[config]();
				}
			});
		};

		_createClass(ScrollSpy, null, [{
			key: 'Default',
			get: function get() {
				return Default$6;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$8;
			},
		}]);

		return ScrollSpy;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(window, EVENT_LOAD_DATA_API$1, function() {
		SelectorEngine.find(SELECTOR_DATA_SPY).forEach(function(spy) {
			return new ScrollSpy(spy, Manipulator.getDataAttributes(spy));
		});
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .ScrollSpy to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$8, ScrollSpy);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$9 = 'tab';
	const DATA_KEY$9 = 'bs.tab';
	const EVENT_KEY$9 = '.' + DATA_KEY$9;
	const DATA_API_KEY$7 = '.data-api';
	const EVENT_HIDE$3 = 'hide' + EVENT_KEY$9;
	const EVENT_HIDDEN$3 = 'hidden' + EVENT_KEY$9;
	const EVENT_SHOW$3 = 'show' + EVENT_KEY$9;
	const EVENT_SHOWN$3 = 'shown' + EVENT_KEY$9;
	const EVENT_CLICK_DATA_API$6 = 'click' + EVENT_KEY$9 + DATA_API_KEY$7;
	const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
	const CLASS_NAME_ACTIVE$3 = 'active';
	const CLASS_NAME_DISABLED$1 = 'disabled';
	const CLASS_NAME_FADE$4 = 'fade';
	const CLASS_NAME_SHOW$6 = 'show';
	const SELECTOR_DROPDOWN$1 = '.dropdown';
	const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
	const SELECTOR_ACTIVE$1 = '.active';
	const SELECTOR_ACTIVE_UL = ':scope > li > .active';
	const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
	const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Tab = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Tab, _BaseComponent);

		function Tab() {
			return _BaseComponent.apply(this, arguments) || this;
		}

		const _proto = Tab.prototype;

		// Public
		_proto.show = function show() {
			const _this = this;

			if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE$3) || this._element.classList.contains(CLASS_NAME_DISABLED$1)) {
				return;
			}

			let previous;
			const target = getElementFromSelector(this._element);

			const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP$1);

			if (listElement) {
				const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE$1;
				previous = SelectorEngine.find(itemSelector, listElement);
				previous = previous[previous.length - 1];
			}

			const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$3, {
				relatedTarget: this._element,
			}) : null;
			const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
				relatedTarget: previous,
			});

			if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
				return;
			}

			this._activate(this._element, listElement);

			const complete = function complete() {
				EventHandler.trigger(previous, EVENT_HIDDEN$3, {
					relatedTarget: _this._element,
				});
				EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
					relatedTarget: previous,
				});
			};

			if (target) {
				this._activate(target, target.parentNode, complete);
			} else {
				complete();
			}
		} // Private
		;

		_proto._activate = function _activate(element, container, callback) {
			const _this2 = this;

			const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE$1);
			const active = activeElements[0];
			const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$4);

			const complete = function complete() {
				return _this2._transitionComplete(element, active, callback);
			};

			if (active && isTransitioning) {
				const transitionDuration = getTransitionDurationFromElement(active);
				active.classList.remove(CLASS_NAME_SHOW$6);
				EventHandler.one(active, 'transitionend', complete);
				emulateTransitionEnd(active, transitionDuration);
			} else {
				complete();
			}
		};

		_proto._transitionComplete = function _transitionComplete(element, active, callback) {
			if (active) {
				active.classList.remove(CLASS_NAME_ACTIVE$3);
				const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

				if (dropdownChild) {
					dropdownChild.classList.remove(CLASS_NAME_ACTIVE$3);
				}

				if (active.getAttribute('role') === 'tab') {
					active.setAttribute('aria-selected', false);
				}
			}

			element.classList.add(CLASS_NAME_ACTIVE$3);

			if (element.getAttribute('role') === 'tab') {
				element.setAttribute('aria-selected', true);
			}

			reflow(element);

			if (element.classList.contains(CLASS_NAME_FADE$4)) {
				element.classList.add(CLASS_NAME_SHOW$6);
			}

			if (element.parentNode && element.parentNode.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
				const dropdownElement = element.closest(SELECTOR_DROPDOWN$1);

				if (dropdownElement) {
					SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE$1).forEach(function(dropdown) {
						return dropdown.classList.add(CLASS_NAME_ACTIVE$3);
					});
				}

				element.setAttribute('aria-expanded', true);
			}

			if (callback) {
				callback();
			}
		} // Static
		;

		Tab.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				const data = Data.getData(this, DATA_KEY$9) || new Tab(this);

				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError('No method named "' + config + '"');
					}

					data[config]();
				}
			});
		};

		_createClass(Tab, null, [{
			key: 'DATA_KEY',
			get: // Getters
			function get() {
				return DATA_KEY$9;
			},
		}]);

		return Tab;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$4, function(event) {
		event.preventDefault();
		const data = Data.getData(this, DATA_KEY$9) || new Tab(this);
		data.show();
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Tab to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(NAME$9, Tab);

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$a = 'toast';
	const DATA_KEY$a = 'bs.toast';
	const EVENT_KEY$a = '.' + DATA_KEY$a;
	const EVENT_CLICK_DISMISS$1 = 'click.dismiss' + EVENT_KEY$a;
	const EVENT_HIDE$4 = 'hide' + EVENT_KEY$a;
	const EVENT_HIDDEN$4 = 'hidden' + EVENT_KEY$a;
	const EVENT_SHOW$4 = 'show' + EVENT_KEY$a;
	const EVENT_SHOWN$4 = 'shown' + EVENT_KEY$a;
	const CLASS_NAME_FADE$5 = 'fade';
	const CLASS_NAME_HIDE = 'hide';
	const CLASS_NAME_SHOW$7 = 'show';
	const CLASS_NAME_SHOWING = 'showing';
	const DefaultType$7 = {
		animation: 'boolean',
		autohide: 'boolean',
		delay: 'number',
	};
	const Default$7 = {
		animation: true,
		autohide: true,
		delay: 5000,
	};
	const SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="toast"]';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	const Toast = /* #__PURE__*/function(_BaseComponent) {
		_inheritsLoose(Toast, _BaseComponent);

		function Toast(element, config) {
			let _this;

			_this = _BaseComponent.call(this, element) || this;
			_this._config = _this._getConfig(config);
			_this._timeout = null;

			_this._setListeners();

			return _this;
		} // Getters


		const _proto = Toast.prototype;

		// Public
		_proto.show = function show() {
			const _this2 = this;

			const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4);

			if (showEvent.defaultPrevented) {
				return;
			}

			this._clearTimeout();

			if (this._config.animation) {
				this._element.classList.add(CLASS_NAME_FADE$5);
			}

			const complete = function complete() {
				_this2._element.classList.remove(CLASS_NAME_SHOWING);

				_this2._element.classList.add(CLASS_NAME_SHOW$7);

				EventHandler.trigger(_this2._element, EVENT_SHOWN$4);

				if (_this2._config.autohide) {
					_this2._timeout = setTimeout(function() {
						_this2.hide();
					}, _this2._config.delay);
				}
			};

			this._element.classList.remove(CLASS_NAME_HIDE);

			reflow(this._element);

			this._element.classList.add(CLASS_NAME_SHOWING);

			if (this._config.animation) {
				const transitionDuration = getTransitionDurationFromElement(this._element);
				EventHandler.one(this._element, 'transitionend', complete);
				emulateTransitionEnd(this._element, transitionDuration);
			} else {
				complete();
			}
		};

		_proto.hide = function hide() {
			const _this3 = this;

			if (!this._element.classList.contains(CLASS_NAME_SHOW$7)) {
				return;
			}

			const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);

			if (hideEvent.defaultPrevented) {
				return;
			}

			const complete = function complete() {
				_this3._element.classList.add(CLASS_NAME_HIDE);

				EventHandler.trigger(_this3._element, EVENT_HIDDEN$4);
			};

			this._element.classList.remove(CLASS_NAME_SHOW$7);

			if (this._config.animation) {
				const transitionDuration = getTransitionDurationFromElement(this._element);
				EventHandler.one(this._element, 'transitionend', complete);
				emulateTransitionEnd(this._element, transitionDuration);
			} else {
				complete();
			}
		};

		_proto.dispose = function dispose() {
			this._clearTimeout();

			if (this._element.classList.contains(CLASS_NAME_SHOW$7)) {
				this._element.classList.remove(CLASS_NAME_SHOW$7);
			}

			EventHandler.off(this._element, EVENT_CLICK_DISMISS$1);

			_BaseComponent.prototype.dispose.call(this);

			this._config = null;
		} // Private
		;

		_proto._getConfig = function _getConfig(config) {
			config = _extends({}, Default$7, Manipulator.getDataAttributes(this._element), typeof config === 'object' && config ? config : {});
			typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
			return config;
		};

		_proto._setListeners = function _setListeners() {
			const _this4 = this;

			EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, function() {
				return _this4.hide();
			});
		};

		_proto._clearTimeout = function _clearTimeout() {
			clearTimeout(this._timeout);
			this._timeout = null;
		} // Static
		;

		Toast.jQueryInterface = function jQueryInterface(config) {
			return this.each(function() {
				let data = Data.getData(this, DATA_KEY$a);

				const _config = typeof config === 'object' && config;

				if (!data) {
					data = new Toast(this, _config);
				}

				if (typeof config === 'string') {
					if (typeof data[config] === 'undefined') {
						throw new TypeError('No method named "' + config + '"');
					}

					data[config](this);
				}
			});
		};

		_createClass(Toast, null, [{
			key: 'DefaultType',
			get: function get() {
				return DefaultType$7;
			},
		}, {
			key: 'Default',
			get: function get() {
				return Default$7;
			},
		}, {
			key: 'DATA_KEY',
			get: function get() {
				return DATA_KEY$a;
			},
		}]);

		return Toast;
	}(BaseComponent);
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Toast to jQuery only if jQuery is present
	 */


	defineJQueryPlugin(NAME$a, Toast);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.0.0-beta2): index.umd.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const index_umd = {
		Alert: Alert,
		Button: Button,
		Carousel: Carousel,
		Collapse: Collapse,
		Dropdown: Dropdown,
		Modal: Modal,
		Popover: Popover,
		ScrollSpy: ScrollSpy,
		Tab: Tab,
		Toast: Toast,
		Tooltip: Tooltip,
	};

	return index_umd;

})));
// # sourceMappingURL=bootstrap.bundle.js.map
