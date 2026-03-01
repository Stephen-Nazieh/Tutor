;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="a4b15364-a98f-1cad-33b6-232249ad8e7e")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/fast-memoize/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoize",
    ()=>memoize,
    "strategies",
    ()=>strategies
]);
function memoize(fn, options) {
    const cache = options && options.cache ? options.cache : cacheDefault;
    const serializer = options && options.serializer ? options.serializer : serializerDefault;
    const strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
        cache,
        serializer
    });
}
//
// Strategy
//
function isPrimitive(value) {
    return value == null || typeof value === "number" || typeof value === "boolean";
}
function monadic(fn, cache, serializer, arg) {
    const cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    let computedValue = cache.get(cacheKey);
    if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function variadic(fn, cache, serializer) {
    const args = Array.prototype.slice.call(arguments, 3);
    const cacheKey = serializer(args);
    let computedValue = cache.get(cacheKey);
    if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
    }
    return computedValue;
}
function assemble(fn, context, strategy, cache, serialize) {
    return strategy.bind(context, fn, cache, serialize);
}
function strategyDefault(fn, options) {
    const strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
}
function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
}
function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
}
//
// Serializer
//
const serializerDefault = function() {
    return JSON.stringify(arguments);
};
//
// Cache
//
class ObjectWithoutPrototypeCache {
    cache;
    constructor(){
        this.cache = Object.create(null);
    }
    get(key) {
        return this.cache[key];
    }
    set(key, value) {
        this.cache[key] = value;
    }
}
const cacheDefault = {
    create: function create() {
        return new ObjectWithoutPrototypeCache();
    }
};
const strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I",
    ()=>IntlError,
    "a",
    ()=>IntlErrorCode,
    "b",
    ()=>createCache,
    "c",
    ()=>createIntlFormatters,
    "m",
    ()=>memoFn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/fast-memoize/index.js [app-client] (ecmascript)");
;
class IntlError extends Error {
    constructor(code, originalMessage){
        let message = code;
        if (originalMessage) {
            message += ': ' + originalMessage;
        }
        super(message);
        this.code = code;
        if (originalMessage) {
            this.originalMessage = originalMessage;
        }
    }
}
var IntlErrorCode = /*#__PURE__*/ function(IntlErrorCode) {
    IntlErrorCode["MISSING_MESSAGE"] = "MISSING_MESSAGE";
    IntlErrorCode["MISSING_FORMAT"] = "MISSING_FORMAT";
    IntlErrorCode["ENVIRONMENT_FALLBACK"] = "ENVIRONMENT_FALLBACK";
    IntlErrorCode["INSUFFICIENT_PATH"] = "INSUFFICIENT_PATH";
    IntlErrorCode["INVALID_MESSAGE"] = "INVALID_MESSAGE";
    IntlErrorCode["INVALID_KEY"] = "INVALID_KEY";
    IntlErrorCode["FORMATTING_ERROR"] = "FORMATTING_ERROR";
    return IntlErrorCode;
}(IntlErrorCode || {});
function createCache() {
    return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
        displayNames: {}
    };
}
function createMemoCache(store) {
    return {
        create () {
            return {
                get (key) {
                    return store[key];
                },
                set (key, value) {
                    store[key] = value;
                }
            };
        }
    };
}
function memoFn(fn, cache) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoize"])(fn, {
        cache: createMemoCache(cache),
        strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["strategies"].variadic
    });
}
function memoConstructor(ConstructorFn, cache) {
    return memoFn((...args)=>new ConstructorFn(...args), cache);
}
function createIntlFormatters(cache) {
    const getDateTimeFormat = memoConstructor(Intl.DateTimeFormat, cache.dateTime);
    const getNumberFormat = memoConstructor(Intl.NumberFormat, cache.number);
    const getPluralRules = memoConstructor(Intl.PluralRules, cache.pluralRules);
    const getRelativeTimeFormat = memoConstructor(Intl.RelativeTimeFormat, cache.relativeTime);
    const getListFormat = memoConstructor(Intl.ListFormat, cache.list);
    const getDisplayNames = memoConstructor(Intl.DisplayNames, cache.displayNames);
    return {
        getDateTimeFormat,
        getNumberFormat,
        getPluralRules,
        getRelativeTimeFormat,
        getListFormat,
        getDisplayNames
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/date-time.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseDateTimeSkeleton",
    ()=>parseDateTimeSkeleton
]);
/**
* https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* Credit: https://github.com/caridy/intl-datetimeformat-pattern/blob/master/index.js
* with some tweaks
*/ const DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function parseDateTimeSkeleton(skeleton) {
    const result = {};
    skeleton.replace(DATE_TIME_REGEX, (match)=>{
        const len = match.length;
        switch(match[0]){
            case "G":
                result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
                break;
            case "y":
                result.year = len === 2 ? "2-digit" : "numeric";
                break;
            case "Y":
            case "u":
            case "U":
            case "r":
                throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
            case "q":
            case "Q":
                throw new RangeError("`q/Q` (quarter) patterns are not supported");
            case "M":
            case "L":
                result.month = [
                    "numeric",
                    "2-digit",
                    "short",
                    "long",
                    "narrow"
                ][len - 1];
                break;
            case "w":
            case "W":
                throw new RangeError("`w/W` (week) patterns are not supported");
            case "d":
                result.day = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "D":
            case "F":
            case "g":
                throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
            case "E":
                result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
                break;
            case "e":
                if (len < 4) {
                    throw new RangeError("`e..eee` (weekday) patterns are not supported");
                }
                result.weekday = [
                    "short",
                    "long",
                    "narrow",
                    "short"
                ][len - 4];
                break;
            case "c":
                if (len < 4) {
                    throw new RangeError("`c..ccc` (weekday) patterns are not supported");
                }
                result.weekday = [
                    "short",
                    "long",
                    "narrow",
                    "short"
                ][len - 4];
                break;
            case "a":
                result.hour12 = true;
                break;
            case "b":
            case "B":
                throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
            case "h":
                result.hourCycle = "h12";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "H":
                result.hourCycle = "h23";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "K":
                result.hourCycle = "h11";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "k":
                result.hourCycle = "h24";
                result.hour = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "j":
            case "J":
            case "C":
                throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
            case "m":
                result.minute = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "s":
                result.second = [
                    "numeric",
                    "2-digit"
                ][len - 1];
                break;
            case "S":
            case "A":
                throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
            case "z":
                result.timeZoneName = len < 4 ? "short" : "long";
                break;
            case "Z":
            case "O":
            case "v":
            case "V":
            case "X":
            case "x":
                throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
        }
        return "";
    });
    return result;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/regex.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @generated from regex-gen.ts
__turbopack_context__.s([
    "WHITE_SPACE_REGEX",
    ()=>WHITE_SPACE_REGEX
]);
const WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/number.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNumberSkeleton",
    ()=>parseNumberSkeleton,
    "parseNumberSkeletonFromString",
    ()=>parseNumberSkeletonFromString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$regex$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/regex.generated.js [app-client] (ecmascript)");
;
function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
        throw new Error("Number skeleton cannot be empty");
    }
    // Parse the skeleton
    const stringTokens = skeleton.split(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$regex$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WHITE_SPACE_REGEX"]).filter((x)=>x.length > 0);
    const tokens = [];
    for (const stringToken of stringTokens){
        let stemAndOptions = stringToken.split("/");
        if (stemAndOptions.length === 0) {
            throw new Error("Invalid number skeleton");
        }
        const [stem, ...options] = stemAndOptions;
        for (const option of options){
            if (option.length === 0) {
                throw new Error("Invalid number skeleton");
            }
        }
        tokens.push({
            stem,
            options
        });
    }
    return tokens;
}
function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, "");
}
const FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
const SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
const INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
const CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
function parseSignificantPrecision(str) {
    const result = {};
    if (str[str.length - 1] === "r") {
        result.roundingPriority = "morePrecision";
    } else if (str[str.length - 1] === "s") {
        result.roundingPriority = "lessPrecision";
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
        // @@@ case
        if (typeof g2 !== "string") {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length;
        } else if (g2 === "+") {
            result.minimumSignificantDigits = g1.length;
        } else if (g1[0] === "#") {
            result.maximumSignificantDigits = g1.length;
        } else {
            result.minimumSignificantDigits = g1.length;
            result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
        }
        return "";
    });
    return result;
}
function parseSign(str) {
    switch(str){
        case "sign-auto":
            return {
                signDisplay: "auto"
            };
        case "sign-accounting":
        case "()":
            return {
                currencySign: "accounting"
            };
        case "sign-always":
        case "+!":
            return {
                signDisplay: "always"
            };
        case "sign-accounting-always":
        case "()!":
            return {
                signDisplay: "always",
                currencySign: "accounting"
            };
        case "sign-except-zero":
        case "+?":
            return {
                signDisplay: "exceptZero"
            };
        case "sign-accounting-except-zero":
        case "()?":
            return {
                signDisplay: "exceptZero",
                currencySign: "accounting"
            };
        case "sign-never":
        case "+_":
            return {
                signDisplay: "never"
            };
    }
}
function parseConciseScientificAndEngineeringStem(stem) {
    // Engineering
    let result;
    if (stem[0] === "E" && stem[1] === "E") {
        result = {
            notation: "engineering"
        };
        stem = stem.slice(2);
    } else if (stem[0] === "E") {
        result = {
            notation: "scientific"
        };
        stem = stem.slice(1);
    }
    if (result) {
        const signDisplay = stem.slice(0, 2);
        if (signDisplay === "+!") {
            result.signDisplay = "always";
            stem = stem.slice(2);
        } else if (signDisplay === "+?") {
            result.signDisplay = "exceptZero";
            stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
            throw new Error("Malformed concise eng/scientific notation");
        }
        result.minimumIntegerDigits = stem.length;
    }
    return result;
}
function parseNotationOptions(opt) {
    const result = {};
    const signOpts = parseSign(opt);
    if (signOpts) {
        return signOpts;
    }
    return result;
}
function parseNumberSkeleton(tokens) {
    let result = {};
    for (const token of tokens){
        switch(token.stem){
            case "percent":
            case "%":
                result.style = "percent";
                continue;
            case "%x100":
                result.style = "percent";
                result.scale = 100;
                continue;
            case "currency":
                result.style = "currency";
                result.currency = token.options[0];
                continue;
            case "group-off":
            case ",_":
                result.useGrouping = false;
                continue;
            case "precision-integer":
            case ".":
                result.maximumFractionDigits = 0;
                continue;
            case "measure-unit":
            case "unit":
                result.style = "unit";
                result.unit = icuUnitToEcma(token.options[0]);
                continue;
            case "compact-short":
            case "K":
                result.notation = "compact";
                result.compactDisplay = "short";
                continue;
            case "compact-long":
            case "KK":
                result.notation = "compact";
                result.compactDisplay = "long";
                continue;
            case "scientific":
                result = {
                    ...result,
                    notation: "scientific",
                    ...token.options.reduce((all, opt)=>({
                            ...all,
                            ...parseNotationOptions(opt)
                        }), {})
                };
                continue;
            case "engineering":
                result = {
                    ...result,
                    notation: "engineering",
                    ...token.options.reduce((all, opt)=>({
                            ...all,
                            ...parseNotationOptions(opt)
                        }), {})
                };
                continue;
            case "notation-simple":
                result.notation = "standard";
                continue;
            case "unit-width-narrow":
                result.currencyDisplay = "narrowSymbol";
                result.unitDisplay = "narrow";
                continue;
            case "unit-width-short":
                result.currencyDisplay = "code";
                result.unitDisplay = "short";
                continue;
            case "unit-width-full-name":
                result.currencyDisplay = "name";
                result.unitDisplay = "long";
                continue;
            case "unit-width-iso-code":
                result.currencyDisplay = "symbol";
                continue;
            case "scale":
                result.scale = parseFloat(token.options[0]);
                continue;
            case "rounding-mode-floor":
                result.roundingMode = "floor";
                continue;
            case "rounding-mode-ceiling":
                result.roundingMode = "ceil";
                continue;
            case "rounding-mode-down":
                result.roundingMode = "trunc";
                continue;
            case "rounding-mode-up":
                result.roundingMode = "expand";
                continue;
            case "rounding-mode-half-even":
                result.roundingMode = "halfEven";
                continue;
            case "rounding-mode-half-down":
                result.roundingMode = "halfTrunc";
                continue;
            case "rounding-mode-half-up":
                result.roundingMode = "halfExpand";
                continue;
            case "integer-width":
                if (token.options.length > 1) {
                    throw new RangeError("integer-width stems only accept a single optional option");
                }
                token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
                    if (g1) {
                        result.minimumIntegerDigits = g2.length;
                    } else if (g3 && g4) {
                        throw new Error("We currently do not support maximum integer digits");
                    } else if (g5) {
                        throw new Error("We currently do not support exact integer digits");
                    }
                    return "";
                });
                continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
            result.minimumIntegerDigits = token.stem.length;
            continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
            // Precision
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#fraction-precision
            // precision-integer case
            if (token.options.length > 1) {
                throw new RangeError("Fraction-precision stems only accept a single optional option");
            }
            token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
                // .000* case (before ICU67 it was .000+)
                if (g2 === "*") {
                    result.minimumFractionDigits = g1.length;
                } else if (g3 && g3[0] === "#") {
                    result.maximumFractionDigits = g3.length;
                } else if (g4 && g5) {
                    result.minimumFractionDigits = g4.length;
                    result.maximumFractionDigits = g4.length + g5.length;
                } else {
                    result.minimumFractionDigits = g1.length;
                    result.maximumFractionDigits = g1.length;
                }
                return "";
            });
            const opt = token.options[0];
            // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#trailing-zero-display
            if (opt === "w") {
                result = {
                    ...result,
                    trailingZeroDisplay: "stripIfInteger"
                };
            } else if (opt) {
                result = {
                    ...result,
                    ...parseSignificantPrecision(opt)
                };
            }
            continue;
        }
        // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#significant-digits-precision
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
            result = {
                ...result,
                ...parseSignificantPrecision(token.stem)
            };
            continue;
        }
        const signOpts = parseSign(token.stem);
        if (signOpts) {
            result = {
                ...result,
                ...signOpts
            };
        }
        const conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
            result = {
                ...result,
                ...conciseScientificAndEngineeringOpts
            };
        }
    }
    return result;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$date$2d$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/date-time.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/number.js [app-client] (ecmascript)");
;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SKELETON_TYPE",
    ()=>SKELETON_TYPE,
    "TYPE",
    ()=>TYPE,
    "createLiteralElement",
    ()=>createLiteralElement,
    "createNumberElement",
    ()=>createNumberElement,
    "isArgumentElement",
    ()=>isArgumentElement,
    "isDateElement",
    ()=>isDateElement,
    "isDateTimeSkeleton",
    ()=>isDateTimeSkeleton,
    "isLiteralElement",
    ()=>isLiteralElement,
    "isNumberElement",
    ()=>isNumberElement,
    "isNumberSkeleton",
    ()=>isNumberSkeleton,
    "isPluralElement",
    ()=>isPluralElement,
    "isPoundElement",
    ()=>isPoundElement,
    "isSelectElement",
    ()=>isSelectElement,
    "isTagElement",
    ()=>isTagElement,
    "isTimeElement",
    ()=>isTimeElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/index.js [app-client] (ecmascript) <locals>");
;
let TYPE = /* @__PURE__ */ function(TYPE) {
    /**
	* Raw text
	*/ TYPE[TYPE["literal"] = 0] = "literal";
    /**
	* Variable w/o any format, e.g `var` in `this is a {var}`
	*/ TYPE[TYPE["argument"] = 1] = "argument";
    /**
	* Variable w/ number format
	*/ TYPE[TYPE["number"] = 2] = "number";
    /**
	* Variable w/ date format
	*/ TYPE[TYPE["date"] = 3] = "date";
    /**
	* Variable w/ time format
	*/ TYPE[TYPE["time"] = 4] = "time";
    /**
	* Variable w/ select format
	*/ TYPE[TYPE["select"] = 5] = "select";
    /**
	* Variable w/ plural format
	*/ TYPE[TYPE["plural"] = 6] = "plural";
    /**
	* Only possible within plural argument.
	* This is the `#` symbol that will be substituted with the count.
	*/ TYPE[TYPE["pound"] = 7] = "pound";
    /**
	* XML-like tag
	*/ TYPE[TYPE["tag"] = 8] = "tag";
    return TYPE;
}({});
let SKELETON_TYPE = /* @__PURE__ */ function(SKELETON_TYPE) {
    SKELETON_TYPE[SKELETON_TYPE["number"] = 0] = "number";
    SKELETON_TYPE[SKELETON_TYPE["dateTime"] = 1] = "dateTime";
    return SKELETON_TYPE;
}({});
function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
function isNumberElement(el) {
    return el.type === TYPE.number;
}
function isDateElement(el) {
    return el.type === TYPE.date;
}
function isTimeElement(el) {
    return el.type === TYPE.time;
}
function isSelectElement(el) {
    return el.type === TYPE.select;
}
function isPluralElement(el) {
    return el.type === TYPE.plural;
}
function isPoundElement(el) {
    return el.type === TYPE.pound;
}
function isTagElement(el) {
    return el.type === TYPE.tag;
}
function isNumberSkeleton(el) {
    return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
}
function isDateTimeSkeleton(el) {
    return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
}
function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value
    };
}
function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value,
        style
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/error.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorKind",
    ()=>ErrorKind
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [app-client] (ecmascript)");
;
let ErrorKind = /* @__PURE__ */ function(ErrorKind) {
    /** Argument is unclosed (e.g. `{0`) */ ErrorKind[ErrorKind["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    /** Argument is empty (e.g. `{}`). */ ErrorKind[ErrorKind["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    /** Argument is malformed (e.g. `{foo!}``) */ ErrorKind[ErrorKind["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    /** Expect an argument type (e.g. `{foo,}`) */ ErrorKind[ErrorKind["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    /** Unsupported argument type (e.g. `{foo,foo}`) */ ErrorKind[ErrorKind["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    /** Expect an argument style (e.g. `{foo, number, }`) */ ErrorKind[ErrorKind["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    /** The number skeleton is invalid. */ ErrorKind[ErrorKind["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    /** The date time skeleton is invalid. */ ErrorKind[ErrorKind["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    /** Exepct a number skeleton following the `::` (e.g. `{foo, number, ::}`) */ ErrorKind[ErrorKind["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    /** Exepct a date time skeleton following the `::` (e.g. `{foo, date, ::}`) */ ErrorKind[ErrorKind["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    /** Unmatched apostrophes in the argument style (e.g. `{foo, number, 'test`) */ ErrorKind[ErrorKind["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    /** Missing select argument options (e.g. `{foo, select}`) */ ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    /** Expecting an offset value in `plural` or `selectordinal` argument (e.g `{foo, plural, offset}`) */ ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Offset value in `plural` or `selectordinal` is invalid (e.g. `{foo, plural, offset: x}`) */ ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    /** Expecting a selector in `select` argument (e.g `{foo, select}`) */ ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    /** Expecting a selector in `plural` or `selectordinal` argument (e.g `{foo, plural}`) */ ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    /** Expecting a message fragment after the `select` selector (e.g. `{foo, select, apple}`) */ ErrorKind[ErrorKind["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    /**
	* Expecting a message fragment after the `plural` or `selectordinal` selector
	* (e.g. `{foo, plural, one}`)
	*/ ErrorKind[ErrorKind["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    /** Selector in `plural` or `selectordinal` is malformed (e.g. `{foo, plural, =x {#}}`) */ ErrorKind[ErrorKind["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    /**
	* Duplicate selectors in `plural` or `selectordinal` argument.
	* (e.g. {foo, plural, one {#} one {#}})
	*/ ErrorKind[ErrorKind["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    /** Duplicate selectors in `select` argument.
	* (e.g. {foo, select, apple {apple} apple {apple}})
	*/ ErrorKind[ErrorKind["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    /** Plural or select argument option must have `other` clause. */ ErrorKind[ErrorKind["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    /** The tag is malformed. (e.g. `<bold!>foo</bold!>) */ ErrorKind[ErrorKind["INVALID_TAG"] = 23] = "INVALID_TAG";
    /** The tag name is invalid. (e.g. `<123>foo</123>`) */ ErrorKind[ErrorKind["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    /** The closing tag does not match the opening tag. (e.g. `<bold>foo</italic>`) */ ErrorKind[ErrorKind["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    /** The opening tag has unmatched closing tag. (e.g. `<bold>foo`) */ ErrorKind[ErrorKind["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
    return ErrorKind;
}({});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/regex.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @generated from regex-gen.ts
__turbopack_context__.s([
    "SPACE_SEPARATOR_REGEX",
    ()=>SPACE_SEPARATOR_REGEX,
    "WHITE_SPACE_REGEX",
    ()=>WHITE_SPACE_REGEX
]);
const SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
const WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @generated from time-data-gen.ts
// prettier-ignore
__turbopack_context__.s([
    "timeData",
    ()=>timeData
]);
const timeData = {
    "001": [
        "H",
        "h"
    ],
    "419": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AD": [
        "H",
        "hB"
    ],
    "AE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "AF": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "AG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "AL": [
        "h",
        "H",
        "hB"
    ],
    "AM": [
        "H",
        "hB"
    ],
    "AO": [
        "H",
        "hB"
    ],
    "AR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "AS": [
        "h",
        "H"
    ],
    "AT": [
        "H",
        "hB"
    ],
    "AU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "AW": [
        "H",
        "hB"
    ],
    "AX": [
        "H"
    ],
    "AZ": [
        "H",
        "hB",
        "h"
    ],
    "BA": [
        "H",
        "hB",
        "h"
    ],
    "BB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BD": [
        "h",
        "hB",
        "H"
    ],
    "BE": [
        "H",
        "hB"
    ],
    "BF": [
        "H",
        "hB"
    ],
    "BG": [
        "H",
        "hB",
        "h"
    ],
    "BH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "BI": [
        "H",
        "h"
    ],
    "BJ": [
        "H",
        "hB"
    ],
    "BL": [
        "H",
        "hB"
    ],
    "BM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BN": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "BO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "BQ": [
        "H"
    ],
    "BR": [
        "H",
        "hB"
    ],
    "BS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "BT": [
        "h",
        "H"
    ],
    "BW": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "BY": [
        "H",
        "h"
    ],
    "BZ": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CA": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "CC": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CD": [
        "hB",
        "H"
    ],
    "CF": [
        "H",
        "h",
        "hB"
    ],
    "CG": [
        "H",
        "hB"
    ],
    "CH": [
        "H",
        "hB",
        "h"
    ],
    "CI": [
        "H",
        "hB"
    ],
    "CK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CL": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CM": [
        "H",
        "h",
        "hB"
    ],
    "CN": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "CO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CP": [
        "H"
    ],
    "CR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CU": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "CV": [
        "H",
        "hB"
    ],
    "CW": [
        "H",
        "hB"
    ],
    "CX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "CY": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "CZ": [
        "H"
    ],
    "DE": [
        "H",
        "hB"
    ],
    "DG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "DJ": [
        "h",
        "H"
    ],
    "DK": [
        "H"
    ],
    "DM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "DO": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "DZ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "EC": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "EE": [
        "H",
        "hB"
    ],
    "EG": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "EH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ER": [
        "h",
        "H"
    ],
    "ES": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "ET": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "FI": [
        "H"
    ],
    "FJ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "FM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "FO": [
        "H",
        "h"
    ],
    "FR": [
        "H",
        "hB"
    ],
    "GA": [
        "H",
        "hB"
    ],
    "GB": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GD": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GE": [
        "H",
        "hB",
        "h"
    ],
    "GF": [
        "H",
        "hB"
    ],
    "GG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GH": [
        "h",
        "H"
    ],
    "GI": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GL": [
        "H",
        "h"
    ],
    "GM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GN": [
        "H",
        "hB"
    ],
    "GP": [
        "H",
        "hB"
    ],
    "GQ": [
        "H",
        "hB",
        "h",
        "hb"
    ],
    "GR": [
        "h",
        "H",
        "hb",
        "hB"
    ],
    "GS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "GT": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "GU": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "GW": [
        "H",
        "hB"
    ],
    "GY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "HK": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "HN": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "HR": [
        "H",
        "hB"
    ],
    "HU": [
        "H",
        "h"
    ],
    "IC": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ID": [
        "H"
    ],
    "IE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IL": [
        "H",
        "hB"
    ],
    "IM": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IN": [
        "h",
        "H"
    ],
    "IO": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "IQ": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "IR": [
        "hB",
        "H"
    ],
    "IS": [
        "H"
    ],
    "IT": [
        "H",
        "hB"
    ],
    "JE": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "JM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "JO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "JP": [
        "H",
        "K",
        "h"
    ],
    "KE": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "KG": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KH": [
        "hB",
        "h",
        "H",
        "hb"
    ],
    "KI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KM": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "KN": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KP": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "KW": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "KY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "KZ": [
        "H",
        "hB"
    ],
    "LA": [
        "H",
        "hb",
        "hB",
        "h"
    ],
    "LB": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "LC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LI": [
        "H",
        "hB",
        "h"
    ],
    "LK": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "LR": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "LS": [
        "h",
        "H"
    ],
    "LT": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "LU": [
        "H",
        "h",
        "hB"
    ],
    "LV": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "LY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "MC": [
        "H",
        "hB"
    ],
    "MD": [
        "H",
        "hB"
    ],
    "ME": [
        "H",
        "hB",
        "h"
    ],
    "MF": [
        "H",
        "hB"
    ],
    "MG": [
        "H",
        "h"
    ],
    "MH": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MK": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ML": [
        "H"
    ],
    "MM": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "MN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MO": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MP": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MQ": [
        "H",
        "hB"
    ],
    "MR": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "MS": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "MT": [
        "H",
        "h"
    ],
    "MU": [
        "H",
        "h"
    ],
    "MV": [
        "H",
        "h"
    ],
    "MW": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "MX": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "MY": [
        "hb",
        "hB",
        "h",
        "H"
    ],
    "MZ": [
        "H",
        "hB"
    ],
    "NA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NC": [
        "H",
        "hB"
    ],
    "NE": [
        "H"
    ],
    "NF": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NG": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NI": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "NL": [
        "H",
        "hB"
    ],
    "NO": [
        "H",
        "h"
    ],
    "NP": [
        "H",
        "h",
        "hB"
    ],
    "NR": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NU": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "NZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "OM": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PA": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PF": [
        "H",
        "h",
        "hB"
    ],
    "PG": [
        "h",
        "H"
    ],
    "PH": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PK": [
        "h",
        "hB",
        "H"
    ],
    "PL": [
        "H",
        "h"
    ],
    "PM": [
        "H",
        "hB"
    ],
    "PN": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "PR": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "PS": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "PT": [
        "H",
        "hB"
    ],
    "PW": [
        "h",
        "H"
    ],
    "PY": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "QA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "RE": [
        "H",
        "hB"
    ],
    "RO": [
        "H",
        "hB"
    ],
    "RS": [
        "H",
        "hB",
        "h"
    ],
    "RU": [
        "H"
    ],
    "RW": [
        "H",
        "h"
    ],
    "SA": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SB": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SC": [
        "H",
        "h",
        "hB"
    ],
    "SD": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SE": [
        "H"
    ],
    "SG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SH": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SI": [
        "H",
        "hB"
    ],
    "SJ": [
        "H"
    ],
    "SK": [
        "H"
    ],
    "SL": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "SM": [
        "H",
        "h",
        "hB"
    ],
    "SN": [
        "H",
        "h",
        "hB"
    ],
    "SO": [
        "h",
        "H"
    ],
    "SR": [
        "H",
        "hB"
    ],
    "SS": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ST": [
        "H",
        "hB"
    ],
    "SV": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "SX": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "SY": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "SZ": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "TC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TD": [
        "h",
        "H",
        "hB"
    ],
    "TF": [
        "H",
        "h",
        "hB"
    ],
    "TG": [
        "H",
        "hB"
    ],
    "TH": [
        "H",
        "h"
    ],
    "TJ": [
        "H",
        "h"
    ],
    "TL": [
        "H",
        "hB",
        "hb",
        "h"
    ],
    "TM": [
        "H",
        "h"
    ],
    "TN": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "TO": [
        "h",
        "H"
    ],
    "TR": [
        "H",
        "hB"
    ],
    "TT": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "TW": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "TZ": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UA": [
        "H",
        "hB",
        "h"
    ],
    "UG": [
        "hB",
        "hb",
        "H",
        "h"
    ],
    "UM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "US": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "UY": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "UZ": [
        "H",
        "hB",
        "h"
    ],
    "VA": [
        "H",
        "h",
        "hB"
    ],
    "VC": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VE": [
        "h",
        "H",
        "hB",
        "hb"
    ],
    "VG": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VI": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "VN": [
        "H",
        "h"
    ],
    "VU": [
        "h",
        "H"
    ],
    "WF": [
        "H",
        "hB"
    ],
    "WS": [
        "h",
        "H"
    ],
    "XK": [
        "H",
        "hB",
        "h"
    ],
    "YE": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "YT": [
        "H",
        "hB"
    ],
    "ZA": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "ZM": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "ZW": [
        "H",
        "h"
    ],
    "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
    ],
    "ca-ES": [
        "H",
        "h",
        "hB"
    ],
    "en-001": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "en-HK": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "en-IL": [
        "H",
        "h",
        "hb",
        "hB"
    ],
    "en-MY": [
        "h",
        "hb",
        "H",
        "hB"
    ],
    "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
    ],
    "fr-CA": [
        "H",
        "h",
        "hB"
    ],
    "gl-ES": [
        "H",
        "h",
        "hB"
    ],
    "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "hi-IN": [
        "hB",
        "h",
        "H"
    ],
    "it-CH": [
        "H",
        "h",
        "hB"
    ],
    "it-IT": [
        "H",
        "h",
        "hB"
    ],
    "kn-IN": [
        "hB",
        "h",
        "H"
    ],
    "ku-SY": [
        "H",
        "hB"
    ],
    "ml-IN": [
        "hB",
        "h",
        "H"
    ],
    "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
    ],
    "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
    ],
    "te-IN": [
        "hB",
        "h",
        "H"
    ],
    "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
    ]
};
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBestPattern",
    ()=>getBestPattern
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js [app-client] (ecmascript)");
;
function getBestPattern(skeleton, locale) {
    let skeletonCopy = "";
    for(let patternPos = 0; patternPos < skeleton.length; patternPos++){
        const patternChar = skeleton.charAt(patternPos);
        if (patternChar === "j") {
            let extraLength = 0;
            while(patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar){
                extraLength++;
                patternPos++;
            }
            let hourLen = 1 + (extraLength & 1);
            let dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
            let dayPeriodChar = "a";
            let hourChar = getDefaultHourSymbolFromLocale(locale);
            if (hourChar == "H" || hourChar == "k") {
                dayPeriodLen = 0;
            }
            while(dayPeriodLen-- > 0){
                skeletonCopy += dayPeriodChar;
            }
            while(hourLen-- > 0){
                skeletonCopy = hourChar + skeletonCopy;
            }
        } else if (patternChar === "J") {
            skeletonCopy += "H";
        } else {
            skeletonCopy += patternChar;
        }
    }
    return skeletonCopy;
}
/**
* Maps the [hour cycle type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/hourCycle)
* of the given `locale` to the corresponding time pattern.
* @param locale
*/ function getDefaultHourSymbolFromLocale(locale) {
    let hourCycle = locale.hourCycle;
    if (hourCycle === undefined && locale.hourCycles && locale.hourCycles.length) {
        // @ts-ignore
        hourCycle = locale.hourCycles[0];
    }
    if (hourCycle) {
        switch(hourCycle){
            case "h24":
                return "k";
            case "h23":
                return "H";
            case "h12":
                return "h";
            case "h11":
                return "K";
            default:
                throw new Error("Invalid hourCycle");
        }
    }
    // TODO: Once hourCycle is fully supported remove the following with data generation
    const languageTag = locale.language;
    let regionTag;
    if (languageTag !== "root") {
        regionTag = locale.maximize().region;
    }
    const hourCycles = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeData"][regionTag || ""] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeData"][languageTag || ""] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeData"][`${languageTag}-001`] || __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$time$2d$data$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeData"]["001"];
    return hourCycles[0];
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/parser.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Parser",
    ()=>Parser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$regex$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/regex.generated.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/number.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$date$2d$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-skeleton-parser/date-time.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$date$2d$time$2d$pattern$2d$generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js [app-client] (ecmascript)");
;
;
;
;
;
const SPACE_SEPARATOR_START_REGEX = new RegExp(`^${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$regex$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPACE_SEPARATOR_REGEX"].source}*`);
const SPACE_SEPARATOR_END_REGEX = new RegExp(`${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$regex$2e$generated$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SPACE_SEPARATOR_REGEX"].source}*$`);
function createLocation(start, end) {
    return {
        start,
        end
    };
}
// #region Ponyfills
// Consolidate these variables up top for easier toggling during debugging
const hasNativeFromEntries = !!Object.fromEntries;
const hasTrimStart = !!String.prototype.trimStart;
const hasTrimEnd = !!String.prototype.trimEnd;
const fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries(entries) {
    const obj = {};
    for (const [k, v] of entries){
        obj[k] = v;
    }
    return obj;
};
const trimStart = hasTrimStart ? function trimStart(s) {
    return s.trimStart();
} : function trimStart(s) {
    return s.replace(SPACE_SEPARATOR_START_REGEX, "");
};
const trimEnd = hasTrimEnd ? function trimEnd(s) {
    return s.trimEnd();
} : function trimEnd(s) {
    return s.replace(SPACE_SEPARATOR_END_REGEX, "");
};
// #endregion
const IDENTIFIER_PREFIX_RE = new RegExp("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
function matchIdentifierAtIndex(s, index) {
    IDENTIFIER_PREFIX_RE.lastIndex = index;
    const match = IDENTIFIER_PREFIX_RE.exec(s);
    return match[1] ?? "";
}
class Parser {
    message;
    position;
    locale;
    ignoreTag;
    requiresOtherClause;
    shouldParseSkeletons;
    constructor(message, options = {}){
        this.message = message;
        this.position = {
            offset: 0,
            line: 1,
            column: 1
        };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
    }
    parse() {
        if (this.offset() !== 0) {
            throw Error("parser can only be used once");
        }
        return this.parseMessage(0, "", false);
    }
    parseMessage(nestingLevel, parentArgType, expectingCloseTag) {
        let elements = [];
        while(!this.isEOF()){
            const char = this.char();
            if (char === 123) {
                const result = this.parseArgument(nestingLevel, expectingCloseTag);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            } else if (char === 125 && nestingLevel > 0) {
                break;
            } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
                const position = this.clonePosition();
                this.bump();
                elements.push({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].pound,
                    location: createLocation(position, this.clonePosition())
                });
            } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
                if (expectingCloseTag) {
                    break;
                } else {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
                }
            } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
                const result = this.parseTag(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            } else {
                const result = this.parseLiteral(nestingLevel, parentArgType);
                if (result.err) {
                    return result;
                }
                elements.push(result.val);
            }
        }
        return {
            val: elements,
            err: null
        };
    }
    /**
	* A tag name must start with an ASCII lower/upper case letter. The grammar is based on the
	* [custom element name][] except that a dash is NOT always mandatory and uppercase letters
	* are accepted:
	*
	* ```
	* tag ::= "<" tagName (whitespace)* "/>" | "<" tagName (whitespace)* ">" message "</" tagName (whitespace)* ">"
	* tagName ::= [a-z] (PENChar)*
	* PENChar ::=
	*     "-" | "." | [0-9] | "_" | [a-z] | [A-Z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
	*     [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] |
	*     [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	* ```
	*
	* [custom element name]: https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
	* NOTE: We're a bit more lax here since HTML technically does not allow uppercase HTML element but we do
	* since other tag-based engines like React allow it
	*/ parseTag(nestingLevel, parentArgType) {
        const startPosition = this.clonePosition();
        this.bump();
        const tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf("/>")) {
            // Self closing tag
            return {
                val: {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].literal,
                    value: `<${tagName}/>`,
                    location: createLocation(startPosition, this.clonePosition())
                },
                err: null
            };
        } else if (this.bumpIf(">")) {
            const childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
                return childrenResult;
            }
            const children = childrenResult.val;
            // Expecting a close tag
            const endTagStartPosition = this.clonePosition();
            if (this.bumpIf("</")) {
                if (this.isEOF() || !_isAlpha(this.char())) {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                const closingTagNameStartPosition = this.clonePosition();
                const closingTagName = this.parseTagName();
                if (tagName !== closingTagName) {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
                }
                this.bumpSpace();
                if (!this.bumpIf(">")) {
                    return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
                }
                return {
                    val: {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].tag,
                        value: tagName,
                        children,
                        location: createLocation(startPosition, this.clonePosition())
                    },
                    err: null
                };
            } else {
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
        } else {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
    }
    /**
	* This method assumes that the caller has peeked ahead for the first tag character.
	*/ parseTagName() {
        const startOffset = this.offset();
        this.bump();
        while(!this.isEOF() && _isPotentialElementNameChar(this.char())){
            this.bump();
        }
        return this.message.slice(startOffset, this.offset());
    }
    parseLiteral(nestingLevel, parentArgType) {
        const start = this.clonePosition();
        let value = "";
        while(true){
            const parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
                value += parseQuoteResult;
                continue;
            }
            const parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
                value += parseUnquotedResult;
                continue;
            }
            const parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
                value += parseLeftAngleResult;
                continue;
            }
            break;
        }
        const location = createLocation(start, this.clonePosition());
        return {
            val: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].literal,
                value,
                location
            },
            err: null
        };
    }
    tryParseLeftAngleBracket() {
        if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump();
            return "<";
        }
        return null;
    }
    /**
	* Starting with ICU 4.8, an ASCII apostrophe only starts quoted text if it immediately precedes
	* a character that requires quoting (that is, "only where needed"), and works the same in
	* nested messages as on the top level of the pattern. The new behavior is otherwise compatible.
	*/ tryParseQuote(parentArgType) {
        if (this.isEOF() || this.char() !== 39) {
            return null;
        }
        // Parse escaped char following the apostrophe, or early return if there is no escaped char.
        // Check if is valid escaped character
        switch(this.peek()){
            case 39:
                // double quote, should return as a single quote.
                this.bump();
                this.bump();
                return "'";
            case 123:
            case 60:
            case 62:
            case 125:
                break;
            case 35:
                if (parentArgType === "plural" || parentArgType === "selectordinal") {
                    break;
                }
                return null;
            default:
                return null;
        }
        this.bump();
        const codePoints = [
            this.char()
        ];
        this.bump();
        // read chars until the optional closing apostrophe is found
        while(!this.isEOF()){
            const ch = this.char();
            if (ch === 39) {
                if (this.peek() === 39) {
                    codePoints.push(39);
                    // Bump one more time because we need to skip 2 characters.
                    this.bump();
                } else {
                    // Optional closing apostrophe.
                    this.bump();
                    break;
                }
            } else {
                codePoints.push(ch);
            }
            this.bump();
        }
        return String.fromCodePoint(...codePoints);
    }
    tryParseUnquoted(nestingLevel, parentArgType) {
        if (this.isEOF()) {
            return null;
        }
        const ch = this.char();
        if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
            return null;
        } else {
            this.bump();
            return String.fromCodePoint(ch);
        }
    }
    parseArgument(nestingLevel, expectingCloseTag) {
        const openingBracePosition = this.clonePosition();
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125) {
            this.bump();
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        // argument name
        let value = this.parseIdentifierIfPossible().value;
        if (!value) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch(this.char()){
            case 125:
                {
                    this.bump();
                    return {
                        val: {
                            type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].argument,
                            value,
                            location: createLocation(openingBracePosition, this.clonePosition())
                        },
                        err: null
                    };
                }
            case 44:
                {
                    this.bump();
                    this.bumpSpace();
                    if (this.isEOF()) {
                        return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
                    }
                    return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
                }
            default:
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
    }
    /**
	* Advance the parser until the end of the identifier, if it is currently on
	* an identifier character. Return an empty string otherwise.
	*/ parseIdentifierIfPossible() {
        const startingPosition = this.clonePosition();
        const startOffset = this.offset();
        const value = matchIdentifierAtIndex(this.message, startOffset);
        const endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        const endPosition = this.clonePosition();
        const location = createLocation(startingPosition, endPosition);
        return {
            value,
            location
        };
    }
    parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition) {
        // Parse this range:
        // {name, type, style}
        //        ^---^
        let typeStartPosition = this.clonePosition();
        let argType = this.parseIdentifierIfPossible().value;
        let typeEndPosition = this.clonePosition();
        switch(argType){
            case "":
                // Expecting a style string number, date, time, plural, selectordinal, or select.
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case "number":
            case "date":
            case "time":
                {
                    // Parse this range:
                    // {name, number, style}
                    //              ^-------^
                    this.bumpSpace();
                    let styleAndLocation = null;
                    if (this.bumpIf(",")) {
                        this.bumpSpace();
                        const styleStartPosition = this.clonePosition();
                        const result = this.parseSimpleArgStyleIfPossible();
                        if (result.err) {
                            return result;
                        }
                        const style = trimEnd(result.val);
                        if (style.length === 0) {
                            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                        }
                        const styleLocation = createLocation(styleStartPosition, this.clonePosition());
                        styleAndLocation = {
                            style,
                            styleLocation
                        };
                    }
                    const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                    if (argCloseResult.err) {
                        return argCloseResult;
                    }
                    const location = createLocation(openingBracePosition, this.clonePosition());
                    // Extract style or skeleton
                    if (styleAndLocation && styleAndLocation.style.startsWith("::")) {
                        // Skeleton starts with `::`.
                        let skeleton = trimStart(styleAndLocation.style.slice(2));
                        if (argType === "number") {
                            const result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                            if (result.err) {
                                return result;
                            }
                            return {
                                val: {
                                    type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].number,
                                    value,
                                    location,
                                    style: result.val
                                },
                                err: null
                            };
                        } else {
                            if (skeleton.length === 0) {
                                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_DATE_TIME_SKELETON, location);
                            }
                            let dateTimePattern = skeleton;
                            // Get "best match" pattern only if locale is passed, if not, let it
                            // pass as-is where `parseDateTimeSkeleton()` will throw an error
                            // for unsupported patterns.
                            if (this.locale) {
                                dateTimePattern = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$date$2d$time$2d$pattern$2d$generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBestPattern"])(skeleton, this.locale);
                            }
                            const style = {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKELETON_TYPE"].dateTime,
                                pattern: dateTimePattern,
                                location: styleAndLocation.styleLocation,
                                parsedOptions: this.shouldParseSkeletons ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$date$2d$time$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseDateTimeSkeleton"])(dateTimePattern) : {}
                            };
                            const type = argType === "date" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].date : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].time;
                            return {
                                val: {
                                    type,
                                    value,
                                    location,
                                    style
                                },
                                err: null
                            };
                        }
                    }
                    // Regular style or no style.
                    return {
                        val: {
                            type: argType === "number" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].number : argType === "date" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].date : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].time,
                            value,
                            location,
                            style: styleAndLocation?.style ?? null
                        },
                        err: null
                    };
                }
            case "plural":
            case "selectordinal":
            case "select":
                {
                    // Parse this range:
                    // {name, plural, options}
                    //              ^---------^
                    const typeEndPosition = this.clonePosition();
                    this.bumpSpace();
                    if (!this.bumpIf(",")) {
                        return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition, {
                            ...typeEndPosition
                        }));
                    }
                    this.bumpSpace();
                    // Parse offset:
                    // {name, plural, offset:1, options}
                    //                ^-----^
                    //
                    // or the first option:
                    //
                    // {name, plural, one {...} other {...}}
                    //                ^--^
                    let identifierAndLocation = this.parseIdentifierIfPossible();
                    let pluralOffset = 0;
                    if (argType !== "select" && identifierAndLocation.value === "offset") {
                        if (!this.bumpIf(":")) {
                            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                        }
                        this.bumpSpace();
                        const result = this.tryParseDecimalInteger(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                        if (result.err) {
                            return result;
                        }
                        // Parse another identifier for option parsing
                        this.bumpSpace();
                        identifierAndLocation = this.parseIdentifierIfPossible();
                        pluralOffset = result.val;
                    }
                    const optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
                    if (optionsResult.err) {
                        return optionsResult;
                    }
                    const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
                    if (argCloseResult.err) {
                        return argCloseResult;
                    }
                    const location = createLocation(openingBracePosition, this.clonePosition());
                    if (argType === "select") {
                        return {
                            val: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].select,
                                value,
                                options: fromEntries(optionsResult.val),
                                location
                            },
                            err: null
                        };
                    } else {
                        return {
                            val: {
                                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].plural,
                                value,
                                options: fromEntries(optionsResult.val),
                                offset: pluralOffset,
                                pluralType: argType === "plural" ? "cardinal" : "ordinal",
                                location
                            },
                            err: null
                        };
                    }
                }
            default:
                return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
    }
    tryParseArgumentClose(openingBracePosition) {
        // Parse: {value, number, ::currency/GBP }
        //
        if (this.isEOF() || this.char() !== 125) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump();
        return {
            val: true,
            err: null
        };
    }
    /**
	* See: https://github.com/unicode-org/icu/blob/af7ed1f6d2298013dc303628438ec4abe1f16479/icu4c/source/common/messagepattern.cpp#L659
	*/ parseSimpleArgStyleIfPossible() {
        let nestedBraces = 0;
        const startPosition = this.clonePosition();
        while(!this.isEOF()){
            const ch = this.char();
            switch(ch){
                case 39:
                    {
                        // Treat apostrophe as quoting but include it in the style part.
                        // Find the end of the quoted literal text.
                        this.bump();
                        let apostrophePosition = this.clonePosition();
                        if (!this.bumpUntil("'")) {
                            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                        }
                        this.bump();
                        break;
                    }
                case 123:
                    {
                        nestedBraces += 1;
                        this.bump();
                        break;
                    }
                case 125:
                    {
                        if (nestedBraces > 0) {
                            nestedBraces -= 1;
                        } else {
                            return {
                                val: this.message.slice(startPosition.offset, this.offset()),
                                err: null
                            };
                        }
                        break;
                    }
                default:
                    this.bump();
                    break;
            }
        }
        return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null
        };
    }
    parseNumberSkeletonFromString(skeleton, location) {
        let tokens = [];
        try {
            tokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNumberSkeletonFromString"])(skeleton);
        } catch  {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_NUMBER_SKELETON, location);
        }
        return {
            val: {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SKELETON_TYPE"].number,
                tokens,
                location,
                parsedOptions: this.shouldParseSkeletons ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$skeleton$2d$parser$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNumberSkeleton"])(tokens) : {}
            },
            err: null
        };
    }
    /**
	* @param nesting_level The current nesting level of messages.
	*     This can be positive when parsing message fragment in select or plural argument options.
	* @param parent_arg_type The parent argument's type.
	* @param parsed_first_identifier If provided, this is the first identifier-like selector of
	*     the argument. It is a by-product of a previous parsing attempt.
	* @param expecting_close_tag If true, this message is directly or indirectly nested inside
	*     between a pair of opening and closing tags. The nested message will not parse beyond
	*     the closing tag boundary.
	*/ tryParsePluralOrSelectOptions(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        let hasOtherClause = false;
        const options = [];
        const parsedSelectors = new Set();
        let { value: selector, location: selectorLocation } = parsedFirstIdentifier;
        // Parse:
        // one {one apple}
        // ^--^
        while(true){
            if (selector.length === 0) {
                const startPosition = this.clonePosition();
                if (parentArgType !== "select" && this.bumpIf("=")) {
                    // Try parse `={number}` selector
                    const result = this.tryParseDecimalInteger(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_SELECTOR, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].INVALID_PLURAL_ARGUMENT_SELECTOR);
                    if (result.err) {
                        return result;
                    }
                    selectorLocation = createLocation(startPosition, this.clonePosition());
                    selector = this.message.slice(startPosition.offset, this.offset());
                } else {
                    break;
                }
            }
            // Duplicate selector clauses
            if (parsedSelectors.has(selector)) {
                return this.error(parentArgType === "select" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].DUPLICATE_SELECT_ARGUMENT_SELECTOR : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === "other") {
                hasOtherClause = true;
            }
            // Parse:
            // one {one apple}
            //     ^----------^
            this.bumpSpace();
            const openingBracePosition = this.clonePosition();
            if (!this.bumpIf("{")) {
                return this.error(parentArgType === "select" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            const fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
                return fragmentResult;
            }
            const argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
                return argCloseResult;
            }
            options.push([
                selector,
                {
                    value: fragmentResult.val,
                    location: createLocation(openingBracePosition, this.clonePosition())
                }
            ]);
            // Keep track of the existing selectors
            parsedSelectors.add(selector);
            // Prep next selector clause.
            this.bumpSpace();
            ({ value: selector, location: selectorLocation } = this.parseIdentifierIfPossible());
        }
        if (options.length === 0) {
            return this.error(parentArgType === "select" ? __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_SELECT_ARGUMENT_SELECTOR : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"].MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return {
            val: options,
            err: null
        };
    }
    tryParseDecimalInteger(expectNumberError, invalidNumberError) {
        let sign = 1;
        const startingPosition = this.clonePosition();
        if (this.bumpIf("+")) {} else if (this.bumpIf("-")) {
            sign = -1;
        }
        let hasDigits = false;
        let decimal = 0;
        while(!this.isEOF()){
            const ch = this.char();
            if (ch >= 48 && ch <= 57) {
                hasDigits = true;
                decimal = decimal * 10 + (ch - 48);
                this.bump();
            } else {
                break;
            }
        }
        const location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
            return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!Number.isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
        }
        return {
            val: decimal,
            err: null
        };
    }
    offset() {
        return this.position.offset;
    }
    isEOF() {
        return this.offset() === this.message.length;
    }
    clonePosition() {
        // This is much faster than `Object.assign` or spread.
        return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column
        };
    }
    /**
	* Return the code point at the current position of the parser.
	* Throws if the index is out of bound.
	*/ char() {
        const offset = this.position.offset;
        if (offset >= this.message.length) {
            throw Error("out of bound");
        }
        const code = this.message.codePointAt(offset);
        if (code === undefined) {
            throw Error(`Offset ${offset} is at invalid UTF-16 code unit boundary`);
        }
        return code;
    }
    error(kind, location) {
        return {
            val: null,
            err: {
                kind,
                message: this.message,
                location
            }
        };
    }
    /** Bump the parser to the next UTF-16 code unit. */ bump() {
        if (this.isEOF()) {
            return;
        }
        const code = this.char();
        if (code === 10) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
        } else {
            this.position.column += 1;
            // 0 ~ 0x10000 -> unicode BMP, otherwise skip the surrogate pair.
            this.position.offset += code < 65536 ? 1 : 2;
        }
    }
    /**
	* If the substring starting at the current position of the parser has
	* the given prefix, then bump the parser to the character immediately
	* following the prefix and return true. Otherwise, don't bump the parser
	* and return false.
	*/ bumpIf(prefix) {
        if (this.message.startsWith(prefix, this.offset())) {
            for(let i = 0; i < prefix.length; i++){
                this.bump();
            }
            return true;
        }
        return false;
    }
    /**
	* Bump the parser until the pattern character is found and return `true`.
	* Otherwise bump to the end of the file and return `false`.
	*/ bumpUntil(pattern) {
        const currentOffset = this.offset();
        const index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
            this.bumpTo(index);
            return true;
        } else {
            this.bumpTo(this.message.length);
            return false;
        }
    }
    /**
	* Bump the parser to the target offset.
	* If target offset is beyond the end of the input, bump the parser to the end of the input.
	*/ bumpTo(targetOffset) {
        if (this.offset() > targetOffset) {
            throw Error(`targetOffset ${targetOffset} must be greater than or equal to the current offset ${this.offset()}`);
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while(true){
            const offset = this.offset();
            if (offset === targetOffset) {
                break;
            }
            if (offset > targetOffset) {
                throw Error(`targetOffset ${targetOffset} is at invalid UTF-16 code unit boundary`);
            }
            this.bump();
            if (this.isEOF()) {
                break;
            }
        }
    }
    /** advance the parser through all whitespace to the next non-whitespace code unit. */ bumpSpace() {
        while(!this.isEOF() && _isWhiteSpace(this.char())){
            this.bump();
        }
    }
    /**
	* Peek at the *next* Unicode codepoint in the input without advancing the parser.
	* If the input has been exhausted, then this returns null.
	*/ peek() {
        if (this.isEOF()) {
            return null;
        }
        const code = this.char();
        const offset = this.offset();
        const nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
        return nextCode ?? null;
    }
}
/**
* This check if codepoint is alphabet (lower & uppercase)
* @param codepoint
* @returns
*/ function _isAlpha(codepoint) {
    return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
}
function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47;
}
/** See `parseTag` function docs. */ function _isPotentialElementNameChar(c) {
    return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
}
/**
* Code point equivalent of regex `\p{White_Space}`.
* From: https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt
*/ function _isWhiteSpace(c) {
    return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/manipulator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hoistSelectors",
    ()=>hoistSelectors,
    "isStructurallySame",
    ()=>isStructurallySame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [app-client] (ecmascript)");
;
function cloneDeep(obj) {
    if (Array.isArray(obj)) {
        // @ts-expect-error meh
        return obj.map(cloneDeep);
    }
    if (obj !== null && typeof obj === "object") {
        // @ts-expect-error meh
        return Object.keys(obj).reduce((cloned, k)=>{
            // @ts-expect-error meh
            cloned[k] = cloneDeep(obj[k]);
            return cloned;
        }, {});
    }
    return obj;
}
/**
* Replace pound elements with number elements referencing the given variable.
* This is needed when nesting plurals - the # in the outer plural should become
* an explicit variable reference when nested inside another plural.
* GH #4202
*/ function replacePoundWithArgument(ast, variableName) {
    return ast.map((el)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPoundElement"])(el)) {
            // Replace # with {variableName, number}
            return {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"].number,
                value: variableName,
                style: null,
                location: el.location
            };
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPluralElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectElement"])(el)) {
            // Recursively process options
            const newOptions = {};
            for (const key of Object.keys(el.options)){
                newOptions[key] = {
                    value: replacePoundWithArgument(el.options[key].value, variableName)
                };
            }
            return {
                ...el,
                options: newOptions
            };
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            return {
                ...el,
                children: replacePoundWithArgument(el.children, variableName)
            };
        }
        return el;
    });
}
function hoistPluralOrSelectElement(ast, el, positionToInject) {
    // pull this out of the ast and move it to the top
    const cloned = cloneDeep(el);
    const { options } = cloned;
    // GH #4202: Check if there are other plural/select elements after this one
    const afterElements = ast.slice(positionToInject + 1);
    const hasSubsequentPluralOrSelect = afterElements.some(isPluralOrSelectElement);
    cloned.options = Object.keys(options).reduce((all, k)=>{
        let optionValue = options[k].value;
        // GH #4202: If there are subsequent plurals/selects and this is a plural,
        // replace # with explicit variable reference to avoid ambiguity
        if (hasSubsequentPluralOrSelect && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPluralElement"])(el)) {
            optionValue = replacePoundWithArgument(optionValue, el.value);
        }
        const newValue = hoistSelectors([
            ...ast.slice(0, positionToInject),
            ...optionValue,
            ...afterElements
        ]);
        all[k] = {
            value: newValue
        };
        return all;
    }, {});
    return cloned;
}
function isPluralOrSelectElement(el) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPluralElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectElement"])(el);
}
function findPluralOrSelectElement(ast) {
    return !!ast.find((el)=>{
        if (isPluralOrSelectElement(el)) {
            return true;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            return findPluralOrSelectElement(el.children);
        }
        return false;
    });
}
function hoistSelectors(ast) {
    for(let i = 0; i < ast.length; i++){
        const el = ast[i];
        if (isPluralOrSelectElement(el)) {
            return [
                hoistPluralOrSelectElement(ast, el, i)
            ];
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTagElement"])(el) && findPluralOrSelectElement([
            el
        ])) {
            throw new Error("Cannot hoist plural/select within a tag element. Please put the tag element inside each plural/select option");
        }
    }
    return ast;
}
/**
* Collect all variables in an AST to Record<string, TYPE>
* @param ast AST to collect variables from
* @param vars Record of variable name to variable type
*/ function collectVariables(ast, vars = new Map()) {
    ast.forEach((el)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArgumentElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDateElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTimeElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberElement"])(el)) {
            if (el.value in vars && vars.get(el.value) !== el.type) {
                throw new Error(`Variable ${el.value} has conflicting types`);
            }
            vars.set(el.value, el.type);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPluralElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectElement"])(el)) {
            vars.set(el.value, el.type);
            Object.keys(el.options).forEach((k)=>{
                collectVariables(el.options[k].value, vars);
            });
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            vars.set(el.value, el.type);
            collectVariables(el.children, vars);
        }
    });
}
function isStructurallySame(a, b) {
    const aVars = new Map();
    const bVars = new Map();
    collectVariables(a, aVars);
    collectVariables(b, bVars);
    if (aVars.size !== bVars.size) {
        return {
            success: false,
            error: new Error(`Different number of variables: [${Array.from(aVars.keys()).join(", ")}] vs [${Array.from(bVars.keys()).join(", ")}]`)
        };
    }
    return Array.from(aVars.entries()).reduce((result, [key, type])=>{
        if (!result.success) {
            return result;
        }
        const bType = bVars.get(key);
        if (bType == null) {
            return {
                success: false,
                error: new Error(`Missing variable ${key} in message`)
            };
        }
        if (bType !== type) {
            return {
                success: false,
                error: new Error(`Variable ${key} has conflicting types: ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"][type]} vs ${__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE"][bType]}`)
            };
        }
        return result;
    }, {
        success: true
    });
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_Parser",
    ()=>_Parser,
    "parse",
    ()=>parse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/error.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/parser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$manipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/manipulator.js [app-client] (ecmascript)");
;
;
;
function pruneLocation(els) {
    els.forEach((el)=>{
        delete el.location;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPluralElement"])(el)) {
            for(const k in el.options){
                delete el.options[k].location;
                pruneLocation(el.options[k].value);
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberElement"])(el) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberSkeleton"])(el.style)) {
            delete el.style.location;
        } else if (((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDateElement"])(el) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTimeElement"])(el)) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDateTimeSkeleton"])(el.style)) {
            delete el.style.location;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            pruneLocation(el.children);
        }
    });
}
function parse(message, opts = {}) {
    opts = {
        shouldParseSkeletons: true,
        requiresOtherClause: true,
        ...opts
    };
    const result = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parser"](message, opts).parse();
    if (result.err) {
        const error = SyntaxError(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorKind"][result.err.kind]);
        // @ts-expect-error Assign to error object
        error.location = result.err.location;
        // @ts-expect-error Assign to error object
        error.originalMessage = result.err.message;
        throw error;
    }
    if (!opts?.captureLocation) {
        pruneLocation(result.val);
    }
    return result.val;
}
;
const _Parser = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Parser"];
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/error.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorCode",
    ()=>ErrorCode,
    "FormatError",
    ()=>FormatError,
    "InvalidValueError",
    ()=>InvalidValueError,
    "InvalidValueTypeError",
    ()=>InvalidValueTypeError,
    "MissingValueError",
    ()=>MissingValueError
]);
let ErrorCode = /* @__PURE__ */ function(ErrorCode) {
    // When we have a placeholder but no value to format
    ErrorCode["MISSING_VALUE"] = "MISSING_VALUE";
    // When value supplied is invalid
    ErrorCode["INVALID_VALUE"] = "INVALID_VALUE";
    // When we need specific Intl API but it's not available
    ErrorCode["MISSING_INTL_API"] = "MISSING_INTL_API";
    return ErrorCode;
}({});
class FormatError extends Error {
    code;
    /**
	* Original message we're trying to format
	* `undefined` if we're only dealing w/ AST
	*
	* @type {(string | undefined)}
	* @memberof FormatError
	*/ originalMessage;
    constructor(msg, code, originalMessage){
        super(msg);
        this.code = code;
        this.originalMessage = originalMessage;
    }
    toString() {
        return `[formatjs Error: ${this.code}] ${this.message}`;
    }
}
class InvalidValueError extends FormatError {
    constructor(variableId, value, options, originalMessage){
        super(`Invalid values for "${variableId}": "${value}". Options are "${Object.keys(options).join("\", \"")}"`, ErrorCode.INVALID_VALUE, originalMessage);
    }
}
class InvalidValueTypeError extends FormatError {
    constructor(value, type, originalMessage){
        super(`Value for "${value}" must be of type ${type}`, ErrorCode.INVALID_VALUE, originalMessage);
    }
}
class MissingValueError extends FormatError {
    constructor(variableId, originalMessage){
        super(`The intl string context variable "${variableId}" was not provided to the string "${originalMessage}"`, ErrorCode.MISSING_VALUE, originalMessage);
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/formatters.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PART_TYPE",
    ()=>PART_TYPE,
    "formatToParts",
    ()=>formatToParts,
    "isFormatXMLElementFn",
    ()=>isFormatXMLElementFn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/error.js [app-client] (ecmascript)");
;
;
;
let PART_TYPE = /* @__PURE__ */ function(PART_TYPE) {
    PART_TYPE[PART_TYPE["literal"] = 0] = "literal";
    PART_TYPE[PART_TYPE["object"] = 1] = "object";
    return PART_TYPE;
}({});
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce((all, part)=>{
        const lastPart = all[all.length - 1];
        if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
            all.push(part);
        } else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
function isFormatXMLElementFn(el) {
    return typeof el === "function";
}
function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLiteralElement"])(els[0])) {
        return [
            {
                type: PART_TYPE.literal,
                value: els[0].value
            }
        ];
    }
    const result = [];
    for (const el of els){
        // Exit early for string parts.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLiteralElement"])(el)) {
            result.push({
                type: PART_TYPE.literal,
                value: el.value
            });
            continue;
        }
        // TODO: should this part be literal type?
        // Replace `#` in plural rules with the actual numeric value.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPoundElement"])(el)) {
            if (typeof currentPluralValue === "number") {
                result.push({
                    type: PART_TYPE.literal,
                    value: formatters.getNumberFormat(locales).format(currentPluralValue)
                });
            }
            continue;
        }
        const { value: varName } = el;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MissingValueError"](varName, originalMessage);
        }
        let value = values[varName];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isArgumentElement"])(el)) {
            if (!value || typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
                value = typeof value === "string" || typeof value === "number" || typeof value === "bigint" ? String(value) : "";
            }
            result.push({
                type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
                value
            });
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDateElement"])(el)) {
            const style = typeof el.style === "string" ? formats.date[el.style] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDateTimeSkeleton"])(el.style) ? el.style.parsedOptions : undefined;
            result.push({
                type: PART_TYPE.literal,
                value: formatters.getDateTimeFormat(locales, style).format(value)
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTimeElement"])(el)) {
            const style = typeof el.style === "string" ? formats.time[el.style] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDateTimeSkeleton"])(el.style) ? el.style.parsedOptions : formats.time.medium;
            result.push({
                type: PART_TYPE.literal,
                value: formatters.getDateTimeFormat(locales, style).format(value)
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberElement"])(el)) {
            const style = typeof el.style === "string" ? formats.number[el.style] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumberSkeleton"])(el.style) ? el.style.parsedOptions : undefined;
            if (style && style.scale) {
                const scale = style.scale || 1;
                // Handle bigint scale multiplication
                // BigInt can only be multiplied by BigInt
                if (typeof value === "bigint") {
                    // Check if scale is a safe integer that can be converted to BigInt
                    if (!Number.isInteger(scale)) {
                        throw new TypeError(`Cannot apply fractional scale ${scale} to bigint value. Scale must be an integer when formatting bigint.`);
                    }
                    value = value * BigInt(scale);
                } else {
                    value = value * scale;
                }
            }
            result.push({
                type: PART_TYPE.literal,
                value: formatters.getNumberFormat(locales, style).format(value)
            });
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTagElement"])(el)) {
            const { children, value } = el;
            const formatFn = values[value];
            if (!isFormatXMLElementFn(formatFn)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidValueTypeError"](value, "function", originalMessage);
            }
            const parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
            let chunks = formatFn(parts.map((p)=>p.value));
            if (!Array.isArray(chunks)) {
                chunks = [
                    chunks
                ];
            }
            result.push(...chunks.map((c)=>{
                return {
                    type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
                    value: c
                };
            }));
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectElement"])(el)) {
            // GH #4490: Use hasOwnProperty to avoid prototype chain issues with keys like "constructor"
            const key = value;
            const opt = (Object.prototype.hasOwnProperty.call(el.options, key) ? el.options[key] : undefined) || el.options.other;
            if (!opt) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidValueError"](el.value, value, Object.keys(el.options), originalMessage);
            }
            result.push(...formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPluralElement"])(el)) {
            // GH #4490: Use hasOwnProperty to avoid prototype chain issues
            const exactKey = `=${value}`;
            let opt = Object.prototype.hasOwnProperty.call(el.options, exactKey) ? el.options[exactKey] : undefined;
            if (!opt) {
                if (!Intl.PluralRules) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormatError"](`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorCode"].MISSING_INTL_API, originalMessage);
                }
                // Convert bigint to number for PluralRules (which only accepts number)
                const numericValue = typeof value === "bigint" ? Number(value) : value;
                const rule = formatters.getPluralRules(locales, {
                    type: el.pluralType
                }).select(numericValue - (el.offset || 0));
                opt = (Object.prototype.hasOwnProperty.call(el.options, rule) ? el.options[rule] : undefined) || el.options.other;
            }
            if (!opt) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$error$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidValueError"](el.value, value, Object.keys(el.options), originalMessage);
            }
            // Convert bigint to number for currentPluralValue
            const numericValue = typeof value === "bigint" ? Number(value) : value;
            result.push(...formatToParts(opt.value, locales, formatters, formats, values, numericValue - (el.offset || 0)));
            continue;
        }
    }
    return mergeLiteral(result);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/core.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntlMessageFormat",
    ()=>IntlMessageFormat
]);
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/fast-memoize/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@formatjs/icu-messageformat-parser/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$formatters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/formatters.js [app-client] (ecmascript)");
;
;
;
// -- MessageFormat --------------------------------------------------------
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return {
        ...c1,
        ...c2,
        ...Object.keys(c1).reduce((all, k)=>{
            all[k] = {
                ...c1[k],
                ...c2[k]
            };
            return all;
        }, {})
    };
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce((all, k)=>{
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, {
        ...defaultConfig
    });
}
function createFastMemoizeCache(store) {
    return {
        create () {
            return {
                get (key) {
                    return store[key];
                },
                set (key, value) {
                    store[key] = value;
                }
            };
        }
    };
}
function createDefaultFormatters(cache = {
    number: {},
    dateTime: {},
    pluralRules: {}
}) {
    return {
        getNumberFormat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoize"])((...args)=>new Intl.NumberFormat(...args), {
            cache: createFastMemoizeCache(cache.number),
            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["strategies"].variadic
        }),
        getDateTimeFormat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoize"])((...args)=>new Intl.DateTimeFormat(...args), {
            cache: createFastMemoizeCache(cache.dateTime),
            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["strategies"].variadic
        }),
        getPluralRules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoize"])((...args)=>new Intl.PluralRules(...args), {
            cache: createFastMemoizeCache(cache.pluralRules),
            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$fast$2d$memoize$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["strategies"].variadic
        })
    };
}
class IntlMessageFormat {
    ast;
    locales;
    resolvedLocale;
    formatters;
    formats;
    message;
    formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
    };
    constructor(message, locales = IntlMessageFormat.defaultLocale, overrideFormats, opts){
        // Defined first because it's used to build the format pattern.
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat.resolveLocale(locales);
        if (typeof message === "string") {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
            }
            const { ...parseOpts } = opts || {};
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message, {
                ...parseOpts,
                locale: this.resolvedLocale
            });
        } else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError("A message must be provided as a String or AST.");
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
    }
    format = (values)=>{
        const parts = this.formatToParts(values);
        // Hot path for straight simple msg translations
        if (parts.length === 1) {
            return parts[0].value;
        }
        const result = parts.reduce((all, part)=>{
            if (!all.length || part.type !== __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$formatters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PART_TYPE"].literal || typeof all[all.length - 1] !== "string") {
                all.push(part.value);
            } else {
                all[all.length - 1] += part.value;
            }
            return all;
        }, []);
        if (result.length <= 1) {
            return result[0] || "";
        }
        return result;
    };
    formatToParts = (values)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$formatters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatToParts"])(this.ast, this.locales, this.formatters, this.formats, values, undefined, this.message);
    resolvedOptions = ()=>({
            locale: this.resolvedLocale?.toString() || Intl.NumberFormat.supportedLocalesOf(this.locales)[0]
        });
    getAst = ()=>this.ast;
    static memoizedDefaultLocale = null;
    static get defaultLocale() {
        if (!IntlMessageFormat.memoizedDefaultLocale) {
            IntlMessageFormat.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
        }
        return IntlMessageFormat.memoizedDefaultLocale;
    }
    static resolveLocale = (locales)=>{
        if (typeof Intl.Locale === "undefined") {
            return;
        }
        const supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales.length > 0) {
            return new Intl.Locale(supportedLocales[0]);
        }
        return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
    };
    static __parse = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f40$formatjs$2f$icu$2d$messageformat$2d$parser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"];
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    static formats = {
        number: {
            integer: {
                maximumFractionDigits: 0
            },
            currency: {
                style: "currency"
            },
            percent: {
                style: "percent"
            }
        },
        date: {
            short: {
                month: "numeric",
                day: "numeric",
                year: "2-digit"
            },
            medium: {
                month: "short",
                day: "numeric",
                year: "numeric"
            },
            long: {
                month: "long",
                day: "numeric",
                year: "numeric"
            },
            full: {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        },
        time: {
            short: {
                hour: "numeric",
                minute: "numeric"
            },
            medium: {
                hour: "numeric",
                minute: "numeric",
                second: "numeric"
            },
            long: {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short"
            },
            full: {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short"
            }
        }
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/format-message/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>formatMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/intl-messageformat/src/core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [app-client] (ecmascript)");
;
;
;
/**
 * `intl-messageformat` uses separate keys for `date` and `time`, but there's
 * only one native API: `Intl.DateTimeFormat`. Additionally you might want to
 * include both a time and a date in a value, therefore the separation doesn't
 * seem so useful. We offer a single `dateTime` namespace instead, but we have
 * to convert the format before `intl-messageformat` can be used.
 */ function convertFormatsToIntlMessageFormat(globalFormats, inlineFormats, timeZone) {
    const mfDateDefaults = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntlMessageFormat"].formats.date;
    const mfTimeDefaults = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntlMessageFormat"].formats.time;
    const dateTimeFormats = {
        ...globalFormats?.dateTime,
        ...inlineFormats?.dateTime
    };
    const allFormats = {
        date: {
            ...mfDateDefaults,
            ...dateTimeFormats
        },
        time: {
            ...mfTimeDefaults,
            ...dateTimeFormats
        },
        number: {
            ...globalFormats?.number,
            ...inlineFormats?.number
        }
    };
    if (timeZone) {
        // The only way to set a time zone with `intl-messageformat` is to merge it into the formats
        // https://github.com/formatjs/formatjs/blob/8256c5271505cf2606e48e3c97ecdd16ede4f1b5/packages/intl/src/message.ts#L15
        [
            'date',
            'time'
        ].forEach((property)=>{
            const formats = allFormats[property];
            for (const [key, value] of Object.entries(formats)){
                formats[key] = {
                    timeZone,
                    ...value
                };
            }
        });
    }
    return allFormats;
}
// Placed here for improved tree shaking. Somehow when this is placed in
// `formatters.tsx`, then it can't be shaken off from `next-intl`.
function createMessageFormatter(cache, intlFormatters) {
    const getMessageFormat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["m"])((...args)=>new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$intl$2d$messageformat$2f$src$2f$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntlMessageFormat"](args[0], args[1], args[2], {
            formatters: intlFormatters,
            ...args[3]
        }), cache.message);
    return getMessageFormat;
}
function getPlainMessage(candidate, values) {
    // To improve runtime performance, only compile message if:
    return(// 1. Values are provided
    values || // 2. There are escaped braces (e.g. "'{name'}")
    /'[{}]/.test(candidate) || // 3. There are missing arguments or tags (dev-only error handling)
    /<|{/.test(candidate) ? undefined // Compile
     : candidate // Don't compile
    );
}
/**
 * Compiles and formats an ICU message at runtime using intl-messageformat.
 * This is the default implementation used when messages are not precompiled.
 */ function formatMessage(/** The raw ICU message string (or precompiled message, though this implementation ignores precompilation) */ ...[key, message, values, options]) {
    if (Array.isArray(message)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].INVALID_MESSAGE, `Message at \`${key}\` resolved to an array, but only strings are supported. See https://next-intl.dev/docs/usage/translations#arrays-of-messages`);
    }
    if (typeof message === 'object') {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].INSUFFICIENT_PATH, `Message at \`${key}\` resolved to \`${typeof message}\`, but only strings are supported. Use a \`.\` to retrieve nested messages. See https://next-intl.dev/docs/usage/translations#structuring-messages`);
    }
    // Hot path that avoids creating an `IntlMessageFormat` instance
    if (typeof message === 'string') {
        const plainMessage = getPlainMessage(message, values);
        if (plainMessage) return plainMessage;
    }
    const { cache, formats, formatters, globalFormats, locale, timeZone } = options;
    // Lazy init the message formatter for better tree
    // shaking in case message formatting is not used.
    if (!formatters.getMessageFormat) {
        formatters.getMessageFormat = createMessageFormatter(cache, formatters);
    }
    let messageFormat;
    try {
        messageFormat = formatters.getMessageFormat(message, locale, convertFormatsToIntlMessageFormat(globalFormats, formats, timeZone), {
            formatters: {
                ...formatters,
                getDateTimeFormat (locales, dateTimeOptions) {
                    // Workaround for https://github.com/formatjs/formatjs/issues/4279
                    return formatters.getDateTimeFormat(locales, {
                        ...dateTimeOptions,
                        timeZone: dateTimeOptions?.timeZone ?? timeZone
                    });
                }
            }
        });
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].INVALID_MESSAGE, `${error.message} (${error.originalMessage})`);
    }
    const formattedMessage = messageFormat.format(// @ts-expect-error `intl-messageformat` expects a different format
    // for rich text elements since a recent minor update. This
    // needs to be evaluated in detail, possibly also in regard
    // to be able to format to parts.
    values);
    // Limit the function signature to return strings or React elements
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(formattedMessage) || // Arrays of React elements
    Array.isArray(formattedMessage) || typeof formattedMessage === 'string' ? formattedMessage : String(formattedMessage);
}
// `t.raw` is supported
formatMessage.raw = true;
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "a",
    ()=>createBaseTranslator,
    "b",
    ()=>defaultOnError,
    "c",
    ()=>createFormatter,
    "d",
    ()=>defaultGetMessageFallback,
    "i",
    ()=>initializeConfig,
    "r",
    ()=>resolveNamespace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$format$2d$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/format-message/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [app-client] (ecmascript)");
;
;
;
function joinPath(...parts) {
    return parts.filter(Boolean).join('.');
}
/**
 * Contains defaults that are used for all entry points into the core.
 * See also `InitializedIntlConfiguration`.
 */ function defaultGetMessageFallback(props) {
    return joinPath(props.namespace, props.key);
}
function defaultOnError(error) {
    console.error(error);
}
function prepareTranslationValues(values) {
    // Related to https://github.com/formatjs/formatjs/issues/1467
    const transformedValues = {};
    Object.keys(values).forEach((key)=>{
        let index = 0;
        const value = values[key];
        let transformed;
        if (typeof value === 'function') {
            transformed = (chunks)=>{
                const result = value(chunks);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(result) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(result, {
                    key: key + index++
                }) : result;
            };
        } else {
            transformed = value;
        }
        transformedValues[key] = transformed;
    });
    return transformedValues;
}
function resolvePath(locale, messages, key, namespace) {
    const fullKey = joinPath(namespace, key);
    if (!messages) {
        throw new Error(`No messages available at \`${namespace}\`.`);
    }
    let message = messages;
    key.split('.').forEach((part)=>{
        const next = message[part];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (part == null || next == null) {
            throw new Error(`Could not resolve \`${fullKey}\` in messages for locale \`${locale}\`.`);
        }
        message = next;
    });
    return message;
}
function getMessagesOrError(locale, messages, namespace) {
    try {
        if (!messages) {
            throw new Error(`No messages were configured.`);
        }
        const retrievedMessages = namespace ? resolvePath(locale, messages, namespace) : messages;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!retrievedMessages) {
            throw new Error(`No messages for namespace \`${namespace}\` found.`);
        }
        return retrievedMessages;
    } catch (error) {
        const intlError = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].MISSING_MESSAGE, error.message);
        return intlError;
    }
}
function createBaseTranslator(config) {
    const messagesOrError = getMessagesOrError(config.locale, config.messages, config.namespace);
    return createBaseTranslatorImpl({
        ...config,
        messagesOrError
    });
}
function createBaseTranslatorImpl({ cache, formats: globalFormats, formatters, getMessageFallback = defaultGetMessageFallback, locale, messagesOrError, namespace, onError, timeZone }) {
    const hasMessagesError = messagesOrError instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"];
    function getFallbackFromErrorAndNotify(key, code, message, fallback) {
        const error = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](code, message);
        onError(error);
        return fallback ?? getMessageFallback({
            error,
            key,
            namespace
        });
    }
    function translateBaseFn(/** Use a dot to indicate a level of nesting (e.g. `namespace.nestedLabel`). */ key, /** Key value pairs for values to interpolate into the message. */ values, /** Provide custom formats for numbers, dates and times. */ formats, _fallback) {
        const fallback = _fallback;
        let message;
        if (hasMessagesError) {
            if (fallback) {
                message = fallback;
            } else {
                onError(messagesOrError);
                return getMessageFallback({
                    error: messagesOrError,
                    key,
                    namespace
                });
            }
        } else {
            const messages = messagesOrError;
            try {
                message = resolvePath(locale, messages, key, namespace);
            } catch (error) {
                if (fallback) {
                    message = fallback;
                } else {
                    return getFallbackFromErrorAndNotify(key, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].MISSING_MESSAGE, error.message, fallback);
                }
            }
        }
        try {
            const messagePath = joinPath(namespace, key);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$format$2d$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(messagePath, // @ts-expect-error -- We have additional validation either in `compile-format.tsx` or in case of `format-only.tsx` in the loader
            message, values ? prepareTranslationValues(values) : values, {
                cache,
                formatters,
                globalFormats,
                formats,
                locale,
                timeZone
            });
        } catch (error) {
            let errorCode, errorMessage;
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"]) {
                errorCode = error.code;
                errorMessage = error.originalMessage;
            } else {
                errorCode = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR;
                errorMessage = error.message;
            }
            return getFallbackFromErrorAndNotify(key, errorCode, errorMessage, fallback);
        }
    }
    function translateFn(/** Use a dot to indicate a level of nesting (e.g. `namespace.nestedLabel`). */ key, /** Key value pairs for values to interpolate into the message. */ values, /** Custom formats for numbers, dates and times. */ formats, _fallback) {
        const result = translateBaseFn(key, values, formats, _fallback);
        if (typeof result !== 'string') {
            return getFallbackFromErrorAndNotify(key, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].INVALID_MESSAGE, `The message \`${key}\` in ${namespace ? `namespace \`${namespace}\`` : 'messages'} didn't resolve to a string. If you want to format rich text, use \`t.rich\` instead.`);
        }
        return result;
    }
    translateFn.rich = translateBaseFn;
    // Augment `translateBaseFn` to return plain strings
    translateFn.markup = (key, values, formats, _fallback)=>{
        const result = translateBaseFn(key, // @ts-expect-error -- `MarkupTranslationValues` is practically a sub type
        // of `RichTranslationValues` but TypeScript isn't smart enough here.
        values, formats, _fallback);
        if (typeof result !== 'string') {
            const error = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR, "`t.markup` only accepts functions for formatting that receive and return strings.\n\nE.g. t.markup('markup', {b: (chunks) => `<b>${chunks}</b>`})");
            onError(error);
            return getMessageFallback({
                error,
                key,
                namespace
            });
        }
        return result;
    };
    translateFn.raw = (key)=>{
        {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$format$2d$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].raw) {
                throw new Error('`t.raw` is not supported when messages are precompiled.');
            }
        }
        if (hasMessagesError) {
            onError(messagesOrError);
            return getMessageFallback({
                error: messagesOrError,
                key,
                namespace
            });
        }
        const messages = messagesOrError;
        try {
            return resolvePath(locale, messages, key, namespace);
        } catch (error) {
            return getFallbackFromErrorAndNotify(key, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].MISSING_MESSAGE, error.message);
        }
    };
    translateFn.has = (key)=>{
        if (hasMessagesError) {
            return false;
        }
        try {
            resolvePath(locale, messagesOrError, key, namespace);
            return true;
        } catch  {
            return false;
        }
    };
    return translateFn;
}
/**
 * For the strictly typed messages to work we have to wrap the namespace into
 * a mandatory prefix. See https://stackoverflow.com/a/71529575/343045
 */ function resolveNamespace(namespace, namespacePrefix) {
    return namespace === namespacePrefix ? undefined : namespace.slice((namespacePrefix + '.').length);
}
const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * (365 / 12); // Approximation
const QUARTER = MONTH * 3;
const YEAR = DAY * 365;
const UNIT_SECONDS = {
    second: SECOND,
    seconds: SECOND,
    minute: MINUTE,
    minutes: MINUTE,
    hour: HOUR,
    hours: HOUR,
    day: DAY,
    days: DAY,
    week: WEEK,
    weeks: WEEK,
    month: MONTH,
    months: MONTH,
    quarter: QUARTER,
    quarters: QUARTER,
    year: YEAR,
    years: YEAR
};
function resolveRelativeTimeUnit(seconds) {
    const absValue = Math.abs(seconds);
    if (absValue < MINUTE) {
        return 'second';
    } else if (absValue < HOUR) {
        return 'minute';
    } else if (absValue < DAY) {
        return 'hour';
    } else if (absValue < WEEK) {
        return 'day';
    } else if (absValue < MONTH) {
        return 'week';
    } else if (absValue < YEAR) {
        return 'month';
    }
    return 'year';
}
function calculateRelativeTimeValue(seconds, unit) {
    // We have to round the resulting values, as `Intl.RelativeTimeFormat`
    // will include fractions like '2.1 hours ago'.
    return Math.round(seconds / UNIT_SECONDS[unit]);
}
function createFormatter(props) {
    const { _cache: cache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])(), _formatters: formatters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(cache), formats, locale, onError = defaultOnError, timeZone: globalTimeZone } = props;
    function applyTimeZone(options) {
        if (!options?.timeZone) {
            if (globalTimeZone) {
                options = {
                    ...options,
                    timeZone: globalTimeZone
                };
            } else {
                onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].ENVIRONMENT_FALLBACK, `The \`timeZone\` parameter wasn't provided and there is no global default configured. Consider adding a global default to avoid markup mismatches caused by environment differences. Learn more: https://next-intl.dev/docs/configuration#time-zone`));
            }
        }
        return options;
    }
    function resolveFormatOrOptions(typeFormats, formatOrOptions, overrides) {
        let options;
        if (typeof formatOrOptions === 'string') {
            const formatName = formatOrOptions;
            options = typeFormats?.[formatName];
            if (!options) {
                const error = new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].MISSING_FORMAT, `Format \`${formatName}\` is not available.`);
                onError(error);
                throw error;
            }
        } else {
            options = formatOrOptions;
        }
        if (overrides) {
            options = {
                ...options,
                ...overrides
            };
        }
        return options;
    }
    function getFormattedValue(formatOrOptions, overrides, typeFormats, formatter, getFallback) {
        let options;
        try {
            options = resolveFormatOrOptions(typeFormats, formatOrOptions, overrides);
        } catch  {
            return getFallback();
        }
        try {
            return formatter(options);
        } catch (error) {
            onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR, error.message));
            return getFallback();
        }
    }
    function dateTime(value, formatOrOptions, overrides) {
        return getFormattedValue(formatOrOptions, overrides, formats?.dateTime, (options)=>{
            options = applyTimeZone(options);
            return formatters.getDateTimeFormat(locale, options).format(value);
        }, ()=>String(value));
    }
    function dateTimeRange(start, end, formatOrOptions, overrides) {
        return getFormattedValue(formatOrOptions, overrides, formats?.dateTime, (options)=>{
            options = applyTimeZone(options);
            return formatters.getDateTimeFormat(locale, options).formatRange(start, end);
        }, ()=>[
                dateTime(start),
                dateTime(end)
            ].join(' – '));
    }
    function number(value, formatOrOptions, overrides) {
        return getFormattedValue(formatOrOptions, overrides, formats?.number, (options)=>formatters.getNumberFormat(locale, options).format(value), ()=>String(value));
    }
    function getGlobalNow() {
        // Only read when necessary to avoid triggering a `dynamicIO` error
        // unnecessarily (`now` is only needed for `format.relativeTime`)
        if (props.now) {
            return props.now;
        } else {
            onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].ENVIRONMENT_FALLBACK, `The \`now\` parameter wasn't provided to \`relativeTime\` and there is no global default configured, therefore the current time will be used as a fallback. See https://next-intl.dev/docs/usage/dates-times#relative-times-usenow`));
            return new Date();
        }
    }
    function relativeTime(date, nowOrOptions) {
        try {
            let nowDate, unit;
            const opts = {};
            if (nowOrOptions instanceof Date || typeof nowOrOptions === 'number') {
                nowDate = new Date(nowOrOptions);
            } else if (nowOrOptions) {
                if (nowOrOptions.now != null) {
                    nowDate = new Date(nowOrOptions.now);
                } else {
                    nowDate = getGlobalNow();
                }
                unit = nowOrOptions.unit;
                opts.style = nowOrOptions.style;
                // @ts-expect-error -- Types are slightly outdated
                opts.numberingSystem = nowOrOptions.numberingSystem;
            }
            if (!nowDate) {
                nowDate = getGlobalNow();
            }
            const dateDate = new Date(date);
            const seconds = (dateDate.getTime() - nowDate.getTime()) / 1000;
            if (!unit) {
                unit = resolveRelativeTimeUnit(seconds);
            }
            // `numeric: 'auto'` can theoretically produce output like "yesterday",
            // but it only works with integers. E.g. -1 day will produce "yesterday",
            // but -1.1 days will produce "-1.1 days". Rounding before formatting is
            // not desired, as the given dates might cross a threshold were the
            // output isn't correct anymore. Example: 2024-01-08T23:00:00.000Z and
            // 2024-01-08T01:00:00.000Z would produce "yesterday", which is not the
            // case. By using `always` we can ensure correct output. The only exception
            // is the formatting of times <1 second as "now".
            opts.numeric = unit === 'second' ? 'auto' : 'always';
            const value = calculateRelativeTimeValue(seconds, unit);
            return formatters.getRelativeTimeFormat(locale, opts).format(value, unit);
        } catch (error) {
            onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].FORMATTING_ERROR, error.message));
            return String(date);
        }
    }
    function list(value, formatOrOptions, overrides) {
        const serializedValue = [];
        const richValues = new Map();
        // `formatToParts` only accepts strings, therefore we have to temporarily
        // replace React elements with a placeholder ID that can be used to retrieve
        // the original value afterwards.
        let index = 0;
        for (const item of value){
            let serializedItem;
            if (typeof item === 'object') {
                serializedItem = String(index);
                richValues.set(serializedItem, item);
            } else {
                serializedItem = String(item);
            }
            serializedValue.push(serializedItem);
            index++;
        }
        return getFormattedValue(formatOrOptions, overrides, formats?.list, // @ts-expect-error -- `richValues.size` is used to determine the return type, but TypeScript can't infer the meaning of this correctly
        (options)=>{
            const result = formatters.getListFormat(locale, options).formatToParts(serializedValue).map((part)=>part.type === 'literal' ? part.value : richValues.get(part.value) || part.value);
            if (richValues.size > 0) {
                return result;
            } else {
                return result.join('');
            }
        }, ()=>String(value));
    }
    return {
        dateTime,
        number,
        relativeTime,
        list,
        dateTimeRange
    };
}
function validateMessagesSegment(messages, invalidKeyLabels, parentPath) {
    Object.entries(messages).forEach(([key, messageOrMessages])=>{
        if (key.includes('.')) {
            let keyLabel = key;
            if (parentPath) keyLabel += ` (at ${parentPath})`;
            invalidKeyLabels.push(keyLabel);
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (messageOrMessages != null && typeof messageOrMessages === 'object') {
            validateMessagesSegment(messageOrMessages, invalidKeyLabels, joinPath(parentPath, key));
        }
    });
}
function validateMessages(messages, onError) {
    const invalidKeyLabels = [];
    validateMessagesSegment(messages, invalidKeyLabels);
    if (invalidKeyLabels.length > 0) {
        onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].INVALID_KEY, `Namespace keys can not contain the character "." as this is used to express nesting. Please remove it or replace it with another character.

Invalid ${invalidKeyLabels.length === 1 ? 'key' : 'keys'}: ${invalidKeyLabels.join(', ')}

If you're migrating from a flat structure, you can convert your messages as follows:

import {set} from "lodash";

const input = {
  "one.one": "1.1",
  "one.two": "1.2",
  "two.one.one": "2.1.1"
};

const output = Object.entries(input).reduce(
  (acc, [key, value]) => set(acc, key, value),
  {}
);

// Output:
//
// {
//   "one": {
//     "one": "1.1",
//     "two": "1.2"
//   },
//   "two": {
//     "one": {
//       "one": "2.1.1"
//     }
//   }
// }
`));
    }
}
/**
 * Enhances the incoming props with defaults.
 */ function initializeConfig({ formats, getMessageFallback, messages, onError, ...rest }) {
    const finalOnError = onError || defaultOnError;
    const finalGetMessageFallback = getMessageFallback || defaultGetMessageFallback;
    {
        if (messages) {
            validateMessages(messages, finalOnError);
        }
    }
    return {
        ...rest,
        formats: formats || undefined,
        messages: messages || undefined,
        onError: finalOnError,
        getMessageFallback: finalGetMessageFallback
    };
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntlProvider",
    ()=>IntlProvider,
    "_useExtracted",
    ()=>useExtracted,
    "useFormatter",
    ()=>useFormatter,
    "useLocale",
    ()=>useLocale,
    "useMessages",
    ()=>useMessages,
    "useNow",
    ()=>useNow,
    "useTimeZone",
    ()=>useTimeZone,
    "useTranslations",
    ()=>useTranslations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/formatters-r4aAmsMP.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/initializeConfig-DzxNJxi9.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
;
const IntlContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function IntlProvider({ children, formats, getMessageFallback, locale, messages, now, onError, timeZone }) {
    const prevContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(IntlContext);
    // The formatter cache is released when the locale changes. For
    // long-running apps with a persistent `IntlProvider` at the root,
    // this can reduce the memory footprint (e.g. in React Native).
    const cache = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IntlProvider.useMemo[cache]": ()=>{
            return prevContext?.cache || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["b"])();
        }
    }["IntlProvider.useMemo[cache]"], [
        locale,
        prevContext?.cache
    ]);
    const formatters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IntlProvider.useMemo[formatters]": ()=>prevContext?.formatters || (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(cache)
    }["IntlProvider.useMemo[formatters]"], [
        cache,
        prevContext?.formatters
    ]);
    // Memoizing this value helps to avoid triggering a re-render of all
    // context consumers in case the configuration didn't change. However,
    // if some of the non-primitive values change, a re-render will still
    // be triggered. Note that there's no need to put `memo` on `IntlProvider`
    // itself, because the `children` typically change on every render.
    // There's some burden on the consumer side if it's important to reduce
    // re-renders, put that's how React works.
    // See: https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#context-updates-and-render-optimizations
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IntlProvider.useMemo[value]": ()=>({
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["i"])({
                    locale,
                    // (required by provider)
                    formats: formats === undefined ? prevContext?.formats : formats,
                    getMessageFallback: getMessageFallback || prevContext?.getMessageFallback,
                    messages: messages === undefined ? prevContext?.messages : messages,
                    now: now || prevContext?.now,
                    onError: onError || prevContext?.onError,
                    timeZone: timeZone || prevContext?.timeZone
                }),
                formatters,
                cache
            })
    }["IntlProvider.useMemo[value]"], [
        cache,
        formats,
        formatters,
        getMessageFallback,
        locale,
        messages,
        now,
        onError,
        prevContext,
        timeZone
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(IntlContext.Provider, {
        value: value,
        children: children
    });
}
function useIntlContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(IntlContext);
    if (!context) {
        throw new Error('No intl context found. Have you configured the provider? See https://next-intl.dev/docs/usage/configuration#server-client-components');
    }
    return context;
}
let hasWarnedForMissingTimezone = false;
const isServer = typeof window === 'undefined';
function useTranslationsImpl(allMessagesPrefixed, namespacePrefixed, namespacePrefix) {
    const { cache, formats: globalFormats, formatters, getMessageFallback, locale, onError, timeZone } = useIntlContext();
    // The `namespacePrefix` is part of the type system.
    // See the comment in the hook invocation.
    const allMessages = allMessagesPrefixed[namespacePrefix];
    const namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["r"])(namespacePrefixed, namespacePrefix);
    if (!timeZone && !hasWarnedForMissingTimezone && isServer) {
        // eslint-disable-next-line react-compiler/react-compiler
        hasWarnedForMissingTimezone = true;
        onError(new __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["I"](__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$formatters$2d$r4aAmsMP$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"].ENVIRONMENT_FALLBACK, `There is no \`timeZone\` configured, this can lead to markup mismatches caused by environment differences. Consider adding a global default: https://next-intl.dev/docs/configuration#time-zone`));
    }
    const translate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useTranslationsImpl.useMemo[translate]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["a"])({
                cache,
                formatters,
                getMessageFallback,
                messages: allMessages,
                namespace,
                onError,
                formats: globalFormats,
                locale,
                timeZone
            })
    }["useTranslationsImpl.useMemo[translate]"], [
        cache,
        formatters,
        getMessageFallback,
        allMessages,
        namespace,
        onError,
        globalFormats,
        locale,
        timeZone
    ]);
    return translate;
}
/**
 * Translates messages from the given namespace by using the ICU syntax.
 * See https://formatjs.io/docs/core-concepts/icu-syntax.
 *
 * If no namespace is provided, all available messages are returned.
 * The namespace can also indicate nesting by using a dot
 * (e.g. `namespace.Component`).
 */ function useTranslations(namespace) {
    const context = useIntlContext();
    const messages = context.messages;
    // We have to wrap the actual hook so the type inference for the optional
    // namespace works correctly. See https://stackoverflow.com/a/71529575/343045
    // The prefix ("!") is arbitrary.
    // @ts-expect-error Use the explicit annotation instead
    return useTranslationsImpl({
        '!': messages
    }, // @ts-expect-error
    namespace ? `!.${namespace}` : '!', '!');
}
function useLocale() {
    return useIntlContext().locale;
}
function getNow() {
    return new Date();
}
/**
 * @see https://next-intl.dev/docs/usage/dates-times#relative-times-usenow
 */ function useNow(options) {
    const updateInterval = options?.updateInterval;
    const { now: globalNow } = useIntlContext();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(globalNow || getNow());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNow.useEffect": ()=>{
            if (!updateInterval) return;
            const intervalId = setInterval({
                "useNow.useEffect.intervalId": ()=>{
                    setNow(getNow());
                }
            }["useNow.useEffect.intervalId"], updateInterval);
            return ({
                "useNow.useEffect": ()=>{
                    clearInterval(intervalId);
                }
            })["useNow.useEffect"];
        }
    }["useNow.useEffect"], [
        globalNow,
        updateInterval
    ]);
    return updateInterval == null && globalNow ? globalNow : now;
}
function useTimeZone() {
    return useIntlContext().timeZone;
}
function useMessages() {
    const context = useIntlContext();
    if (!context.messages) {
        throw new Error('No messages found. Have you configured them correctly? See https://next-intl.dev/docs/configuration#messages');
    }
    return context.messages;
}
function useFormatter() {
    const { formats, formatters, locale, now: globalNow, onError, timeZone } = useIntlContext();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useFormatter.useMemo": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$initializeConfig$2d$DzxNJxi9$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])({
                formats,
                locale,
                now: globalNow,
                onError,
                timeZone,
                _formatters: formatters
            })
    }["useFormatter.useMemo"], [
        formats,
        formatters,
        globalNow,
        locale,
        onError,
        timeZone
    ]);
}
function getArgs(messageOrParams, ...rest) {
    let message, values, formats;
    if (typeof messageOrParams === 'string') {
        message = messageOrParams;
        values = rest[0];
        formats = rest[1];
    } else {
        message = messageOrParams.message;
        values = messageOrParams.values;
        formats = messageOrParams.formats;
    // `description` is is not used at runtime
    }
    // @ts-expect-error -- Secret fallback parameter
    return [
        undefined,
        // Always use fallback if not compiled
        values,
        formats,
        message
    ];
}
// Note: This API is usually compiled into `useTranslations`,
// but there is some fallback handling which allows this hook
// to still work when not being compiled.
//
// This is relevant for:
// - Isolated environments like tests, Storybook, etc.
// - Fallbacks in case an extracted message is not yet available
function useExtracted(namespace) {
    const t = useTranslations(namespace);
    function translateFn(...params) {
        // @ts-expect-error -- Passing `undefined` as an ID is secretly allowed here
        return t(...getArgs(...params));
    }
    translateFn.rich = (...params)=>// @ts-expect-error -- Passing `undefined` as an ID is secretly allowed here
        t.rich(...getArgs(...params));
    translateFn.markup = (...params)=>// @ts-expect-error -- Passing `undefined` as an ID is secretly allowed here
        t.markup(...getArgs(...params));
    translateFn.has = function translateHasFn(// eslint-disable-next-line @typescript-eslint/no-unused-vars
    message) {
        // Not really something better we can do here
        return true;
    };
    return translateFn;
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLocaleAsPrefix",
    ()=>getLocaleAsPrefix,
    "getLocalePrefix",
    ()=>getLocalePrefix,
    "getLocalizedTemplate",
    ()=>getLocalizedTemplate,
    "getSortedPathnames",
    ()=>getSortedPathnames,
    "hasPathnamePrefixed",
    ()=>hasPathnamePrefixed,
    "isLocalizableHref",
    ()=>isLocalizableHref,
    "isPromise",
    ()=>isPromise,
    "matchesPathname",
    ()=>matchesPathname,
    "normalizeTrailingSlash",
    ()=>normalizeTrailingSlash,
    "prefixPathname",
    ()=>prefixPathname,
    "templateToRegex",
    ()=>templateToRegex,
    "unprefixPathname",
    ()=>unprefixPathname
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
function isRelativeHref(href) {
    const pathname = typeof href === 'object' ? href.pathname : href;
    return pathname != null && !pathname.startsWith('/');
}
function isLocalHref(href) {
    if (typeof href === 'object') {
        return href.host == null && href.hostname == null;
    } else {
        const hasProtocol = /^[a-z]+:/i.test(href);
        return !hasProtocol;
    }
}
function isLocalizableHref(href) {
    return isLocalHref(href) && !isRelativeHref(href);
}
function unprefixPathname(pathname, prefix) {
    return pathname.replace(new RegExp(`^${prefix}`), '') || '/';
}
function prefixPathname(prefix, pathname) {
    let localizedHref = prefix;
    // Avoid trailing slashes
    if (/^\/(\?.*)?$/.test(pathname)) {
        pathname = pathname.slice(1);
    }
    localizedHref += pathname;
    return localizedHref;
}
function hasPathnamePrefixed(prefix, pathname) {
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
}
function hasTrailingSlash() {
    try {
        // Provided via `env` setting in `next.config.js` via the plugin
        return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env._next_intl_trailing_slash === 'true';
    } catch  {
        return false;
    }
}
function getLocalizedTemplate(pathnameConfig, locale, internalTemplate) {
    return typeof pathnameConfig === 'string' ? pathnameConfig : pathnameConfig[locale] || internalTemplate;
}
function normalizeTrailingSlash(pathname) {
    const trailingSlash = hasTrailingSlash();
    const [path, ...hashParts] = pathname.split('#');
    const hash = hashParts.join('#');
    let normalizedPath = path;
    if (normalizedPath !== '/') {
        const pathnameEndsWithSlash = normalizedPath.endsWith('/');
        if (trailingSlash && !pathnameEndsWithSlash) {
            normalizedPath += '/';
        } else if (!trailingSlash && pathnameEndsWithSlash) {
            normalizedPath = normalizedPath.slice(0, -1);
        }
    }
    if (hash) {
        normalizedPath += '#' + hash;
    }
    return normalizedPath;
}
function matchesPathname(/** E.g. `/users/[userId]-[userName]` */ template, /** E.g. `/users/23-jane` */ pathname) {
    const normalizedTemplate = normalizeTrailingSlash(template);
    const normalizedPathname = normalizeTrailingSlash(pathname);
    const regex = templateToRegex(normalizedTemplate);
    return regex.test(normalizedPathname);
}
function getLocalePrefix(locale, localePrefix) {
    return localePrefix.mode !== 'never' && localePrefix.prefixes?.[locale] || // We return a prefix even if `mode: 'never'`. It's up to the consumer
    // to decide to use it or not.
    getLocaleAsPrefix(locale);
}
function getLocaleAsPrefix(locale) {
    return '/' + locale;
}
function templateToRegex(template) {
    const regexPattern = template// Replace optional catchall ('[[...slug]]')
    .replace(/\/\[\[(\.\.\.[^\]]+)\]\]/g, '(?:/(.*))?') // With leading slash
    .replace(/\[\[(\.\.\.[^\]]+)\]\]/g, '(?:/(.*))?') // Without leading slash
    // Replace catchall ('[...slug]')
    .replace(/\[(\.\.\.[^\]]+)\]/g, '(.+)')// Replace regular parameter ('[slug]')
    .replace(/\[([^\]]+)\]/g, '([^/]+)');
    return new RegExp(`^${regexPattern}$`);
}
function isOptionalCatchAllSegment(pathname) {
    return pathname.includes('[[...');
}
function isCatchAllSegment(pathname) {
    return pathname.includes('[...');
}
function isDynamicSegment(pathname) {
    return pathname.includes('[');
}
function comparePathnamePairs(a, b) {
    const pathA = a.split('/');
    const pathB = b.split('/');
    const maxLength = Math.max(pathA.length, pathB.length);
    for(let i = 0; i < maxLength; i++){
        const segmentA = pathA[i];
        const segmentB = pathB[i];
        // If one of the paths ends, prioritize the shorter path
        if (!segmentA && segmentB) return -1;
        if (segmentA && !segmentB) return 1;
        if (!segmentA && !segmentB) continue;
        // Prioritize static segments over dynamic segments
        if (!isDynamicSegment(segmentA) && isDynamicSegment(segmentB)) return -1;
        if (isDynamicSegment(segmentA) && !isDynamicSegment(segmentB)) return 1;
        // Prioritize non-catch-all segments over catch-all segments
        if (!isCatchAllSegment(segmentA) && isCatchAllSegment(segmentB)) return -1;
        if (isCatchAllSegment(segmentA) && !isCatchAllSegment(segmentB)) return 1;
        // Prioritize non-optional catch-all segments over optional catch-all segments
        if (!isOptionalCatchAllSegment(segmentA) && isOptionalCatchAllSegment(segmentB)) {
            return -1;
        }
        if (isOptionalCatchAllSegment(segmentA) && !isOptionalCatchAllSegment(segmentB)) {
            return 1;
        }
        if (segmentA === segmentB) continue;
    }
    // Both pathnames are completely static
    return 0;
}
function getSortedPathnames(pathnames) {
    return pathnames.sort(comparePathnamePairs);
}
function isPromise(value) {
    // https://github.com/amannn/next-intl/issues/1711
    return typeof value.then === 'function';
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyPathnamePrefix",
    ()=>applyPathnamePrefix,
    "compileLocalizedPathname",
    ()=>compileLocalizedPathname,
    "getBasePath",
    ()=>getBasePath,
    "getRoute",
    ()=>getRoute,
    "normalizeNameOrNameWithParams",
    ()=>normalizeNameOrNameWithParams,
    "serializeSearchParams",
    ()=>serializeSearchParams,
    "validateReceivedConfig",
    ()=>validateReceivedConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/utils.js [app-client] (ecmascript)");
;
// Minor false positive: A route that has both optional and
// required params will allow optional params.
// For `Link`
// For `getPathname` (hence also its consumers: `redirect`, `useRouter`, …)
function normalizeNameOrNameWithParams(href) {
    return typeof href === 'string' ? {
        pathname: href
    } : href;
}
function serializeSearchParams(searchParams) {
    function serializeValue(value) {
        return String(value);
    }
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)){
        if (Array.isArray(value)) {
            value.forEach((cur)=>{
                urlSearchParams.append(key, serializeValue(cur));
            });
        } else {
            urlSearchParams.set(key, serializeValue(value));
        }
    }
    return '?' + urlSearchParams.toString();
}
function compileLocalizedPathname({ pathname, locale, params, pathnames, query }) {
    function compilePath(value) {
        const pathnameConfig = pathnames[value];
        let compiled;
        if (pathnameConfig) {
            const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(pathnameConfig, locale, value);
            compiled = template;
            if (params) {
                Object.entries(params).forEach(([key, paramValue])=>{
                    let regexp, replacer;
                    if (Array.isArray(paramValue)) {
                        regexp = `(\\[)?\\[...${key}\\](\\])?`;
                        replacer = paramValue.map((v)=>String(v)).join('/');
                    } else {
                        regexp = `\\[${key}\\]`;
                        replacer = String(paramValue);
                    }
                    compiled = compiled.replace(new RegExp(regexp, 'g'), replacer);
                });
            }
            // Clean up optional catch-all segments that were not replaced
            compiled = compiled.replace(/\[\[\.\.\..+\]\]/g, '');
            if (compiled.includes('[')) {
                // Next.js throws anyway, therefore better provide a more helpful error message
                throw new Error(`Insufficient params provided for localized pathname.\nTemplate: ${template}\nParams: ${JSON.stringify(params)}`);
            }
            compiled = encodePathname(compiled);
        } else {
            // Unknown pathnames
            compiled = value;
        }
        compiled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeTrailingSlash"])(compiled);
        if (query) {
            // This also encodes non-ASCII characters by
            // using `new URLSearchParams()` internally
            compiled += serializeSearchParams(query);
        }
        return compiled;
    }
    if (typeof pathname === 'string') {
        return compilePath(pathname);
    } else {
        const { pathname: internalPathname, ...rest } = pathname;
        const compiled = compilePath(internalPathname);
        const result = {
            ...rest,
            pathname: compiled
        };
        return result;
    }
}
function encodePathname(pathname) {
    // Generally, to comply with RFC 3986 and Google's best practices for URL structures
    // (https://developers.google.com/search/docs/crawling-indexing/url-structure),
    // we should always encode non-ASCII characters.
    //
    // There are two places where next-intl interacts with potentially non-ASCII URLs:
    // 1. Middleware: When mapping a localized pathname to a non-localized pathname internally
    // 2. Navigation APIs: When generating a URLs to be used for <Link /> & friends
    //
    // Next.js normalizes incoming pathnames to always be encoded, therefore we can safely
    // decode them there (see middleware.tsx). On the other hand, Next.js doesn't consistently
    // encode non-ASCII characters that are passed to navigation APIs:
    // 1. <Link /> doesn't encode non-ASCII characters
    // 2. useRouter() uses `new URL()` internally, which will encode—but only if necessary
    // 3. redirect() uses useRouter() on the client, but on the server side only
    //    assigns the location header without encoding.
    //
    // In addition to this, for getPathname() we need to encode non-ASCII characters.
    //
    // Therefore, the bottom line is that next-intl should take care of encoding non-ASCII
    // characters in all cases, but can rely on `new URL()` to not double-encode characters.
    return new URL(pathname, 'http://l').pathname;
}
function getRoute(locale, pathname, pathnames) {
    const sortedPathnames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedPathnames"])(Object.keys(pathnames));
    const decoded = decodeURI(pathname);
    for (const internalPathname of sortedPathnames){
        const localizedPathnamesOrPathname = pathnames[internalPathname];
        if (typeof localizedPathnamesOrPathname === 'string') {
            const localizedPathname = localizedPathnamesOrPathname;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesPathname"])(localizedPathname, decoded)) {
                return internalPathname;
            }
        } else {
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesPathname"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalizedTemplate"])(localizedPathnamesOrPathname, locale, internalPathname), decoded)) {
                return internalPathname;
            }
        }
    }
    return pathname;
}
function getBasePath(pathname, windowPathname = window.location.pathname) {
    if (pathname === '/') {
        return windowPathname;
    } else {
        return windowPathname.replace(pathname, '');
    }
}
function applyPathnamePrefix(pathname, locale, routing, force) {
    const { mode } = routing.localePrefix;
    let shouldPrefix;
    if (force !== undefined) {
        shouldPrefix = force;
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLocalizableHref"])(pathname)) {
        if (mode === 'always') {
            shouldPrefix = true;
        } else if (mode === 'as-needed') {
            shouldPrefix = routing.domains ? // Since locales are unique per domain, any locale that is a
            // default locale of a domain doesn't require a prefix
            !routing.domains.some((cur)=>cur.defaultLocale === locale) : locale !== routing.defaultLocale;
        }
    }
    return shouldPrefix ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefixPathname"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalePrefix"])(locale, routing.localePrefix), pathname) : pathname;
}
function validateReceivedConfig(config) {
    if (config.localePrefix?.mode === 'as-needed' && !('defaultLocale' in config)) {
        throw new Error("`localePrefix: 'as-needed' requires a `defaultLocale`.");
    }
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/syncLocaleCookie.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>syncLocaleCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/utils.js [app-client] (ecmascript)");
;
/**
 * We have to keep the cookie value in sync as Next.js might
 * skip a request to the server due to its router cache.
 * See https://github.com/amannn/next-intl/issues/786.
 */ function syncLocaleCookie(localeCookie, pathname, locale, nextLocale) {
    const isSwitchingLocale = nextLocale !== locale && nextLocale != null;
    if (!localeCookie || !isSwitchingLocale || // Theoretical case, we always have a pathname in a real app,
    // only not when running e.g. in a simulated test environment
    !pathname) {
        return;
    }
    const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBasePath"])(pathname);
    const hasBasePath = basePath !== '';
    const defaultPath = hasBasePath ? basePath : '/';
    const { name, ...rest } = localeCookie;
    if (!rest.path) {
        rest.path = defaultPath;
    }
    let localeCookieString = `${name}=${nextLocale};`;
    for (const [key, value] of Object.entries(rest)){
        // Map object properties to cookie properties.
        // Interestingly, `maxAge` corresponds to `max-age`,
        // while `sameSite` corresponds to `SameSite`.
        // Also, keys are case-insensitive.
        const targetKey = key === 'maxAge' ? 'max-age' : key;
        localeCookieString += `${targetKey}`;
        if (typeof value !== 'boolean') {
            localeCookieString += '=' + value;
        }
        // A trailing ";" is allowed by browsers
        localeCookieString += ';';
    }
    // Note that writing to `document.cookie` doesn't overwrite all
    // cookies, but only the ones referenced via the name here.
    document.cookie = localeCookieString;
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/BaseLink.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BaseLink$1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$syncLocaleCookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/navigation/shared/syncLocaleCookie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function BaseLink({ href, locale, localeCookie, onClick, prefetch, ...rest }, ref) {
    const curLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const isChangingLocale = locale != null && locale !== curLocale;
    // The types aren't entirely correct here. Outside of Next.js
    // `useParams` can be called, but the return type is `null`.
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    function onLinkClick(event) {
        // Even though we force a prefix when changing locales,
        // this could be a cache hit of the client-side router,
        // therefore we sync the cookie to ensure it's up to date.
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$shared$2f$syncLocaleCookie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(localeCookie, pathname, curLocale, locale);
        if (onClick) onClick(event);
    }
    if (isChangingLocale) {
        if (prefetch && "development" !== 'production') {
            console.error('The `prefetch` prop is currently not supported when using the `locale` prop on `Link` to switch the locale.`');
        }
        prefetch = false;
    }
    // Somehow the types for `next/link` don't work as expected
    // when `moduleResolution: "nodenext"` is used.
    const Link = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(Link, {
        ref: ref,
        href: href,
        hrefLang: isChangingLocale ? locale : undefined,
        onClick: onLinkClick,
        prefetch: prefetch,
        ...rest
    });
}
var BaseLink$1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(BaseLink);
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/NextIntlClientProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NextIntlClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function NextIntlClientProvider({ locale, ...rest }) {
    if (!locale) {
        throw new Error("Couldn't infer the `locale` prop in `NextIntlClientProvider`, please provide it explicitly.\n\nSee https://next-intl.dev/docs/configuration#locale");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntlProvider"], {
        locale: locale,
        ...rest
    });
}
;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/NextIntlClientProvider.js [app-client] (ecmascript) <export default as NextIntlClientProvider>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NextIntlClientProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$NextIntlClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$NextIntlClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-intl/dist/esm/development/shared/NextIntlClientProvider.js [app-client] (ecmascript)");
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/typeof.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _typeof(o) {
    "@babel/helpers - typeof";
    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/OverloadYield.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _OverloadYield(e, d) {
    this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorDefine.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
        i({}, "", {});
    } catch (e) {
        i = 0;
    }
    module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
        function o(r, n) {
            _regeneratorDefine(e, r, function(e) {
                return this._invoke(r, n, e);
            });
        }
        r ? i ? i(e, r, {
            value: n,
            enumerable: !t,
            configurable: !t,
            writable: !t
        }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regenerator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var regeneratorDefine = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorDefine.js [app-client] (ecmascript)");
function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
        var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype);
        return regeneratorDefine(u, "_invoke", function(r, n, o) {
            var i, c, u, f = 0, p = o || [], y = !1, G = {
                p: 0,
                n: 0,
                v: e,
                a: d,
                f: d.bind(e, 4),
                d: function d(t, r) {
                    return i = t, c = 0, u = e, G.n = r, a;
                }
            };
            function d(r, n) {
                for(c = r, u = n, t = 0; !y && f && !o && t < p.length; t++){
                    var o, i = p[t], d = G.p, l = i[2];
                    r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
                }
                if (o || r > 1) return a;
                throw y = !0, n;
            }
            return function(o, p, l) {
                if (f > 1) throw TypeError("Generator is already running");
                for(y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;){
                    i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
                    try {
                        if (f = 2, i) {
                            if (c || (o = "next"), t = i[o]) {
                                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                                if (!t.done) return t;
                                u = t.value, c < 2 && (c = 0);
                            } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                            i = e;
                        } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
                    } catch (t) {
                        i = e, c = 1, u = t;
                    } finally{
                        f = 1;
                    }
                }
                return {
                    value: t,
                    done: y
                };
            };
        }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function() {
        return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function() {
        return this;
    }), regeneratorDefine(u, "toString", function() {
        return "[object Generator]";
    }), (module.exports = _regenerator = function _regenerator() {
        return {
            w: i,
            m: f
        };
    }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var OverloadYield = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/OverloadYield.js [app-client] (ecmascript)");
var regeneratorDefine = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorDefine.js [app-client] (ecmascript)");
function AsyncIterator(t, e) {
    function n(r, o, i, f) {
        try {
            var c = t[r](o), u = c.value;
            return u instanceof OverloadYield ? e.resolve(u.v).then(function(t) {
                n("next", t, i, f);
            }, function(t) {
                n("throw", t, i, f);
            }) : e.resolve(u).then(function(t) {
                c.value = t, i(c);
            }, function(t) {
                return n("throw", t, i, f);
            });
        } catch (t) {
            f(t);
        }
    }
    var r;
    this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
    })), regeneratorDefine(this, "_invoke", function(t, o, i) {
        function f() {
            return new e(function(e, r) {
                n(t, i, e, r);
            });
        }
        return r = r ? r.then(f, f) : f();
    }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var regenerator = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regenerator.js [app-client] (ecmascript)");
var regeneratorAsyncIterator = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js [app-client] (ecmascript)");
function _regeneratorAsyncGen(r, e, t, o, n) {
    return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsync.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var regeneratorAsyncGen = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js [app-client] (ecmascript)");
function _regeneratorAsync(n, e, r, t, o) {
    var a = regeneratorAsyncGen(n, e, r, t, o);
    return a.next().then(function(n) {
        return n.done ? n.value : a.next();
    });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorKeys.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _regeneratorKeys(e) {
    var n = Object(e), r = [];
    for(var t in n)r.unshift(t);
    return function e() {
        for(; r.length;)if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
        return e.done = !0, e;
    };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorValues.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/typeof.js [app-client] (ecmascript)")["default"];
function _regeneratorValues(e) {
    if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return {
            next: function next() {
                return e && r >= e.length && (e = void 0), {
                    value: e && e[r++],
                    done: !e
                };
            }
        };
    }
    throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorRuntime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var OverloadYield = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/OverloadYield.js [app-client] (ecmascript)");
var regenerator = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regenerator.js [app-client] (ecmascript)");
var regeneratorAsync = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsync.js [app-client] (ecmascript)");
var regeneratorAsyncGen = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js [app-client] (ecmascript)");
var regeneratorAsyncIterator = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js [app-client] (ecmascript)");
var regeneratorKeys = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorKeys.js [app-client] (ecmascript)");
var regeneratorValues = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorValues.js [app-client] (ecmascript)");
function _regeneratorRuntime() {
    "use strict";
    var r = regenerator(), e = r.m(_regeneratorRuntime), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
    function n(r) {
        var e = "function" == typeof r && r.constructor;
        return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
    }
    var o = {
        "throw": 1,
        "return": 2,
        "break": 3,
        "continue": 3
    };
    function a(r) {
        var e, t;
        return function(n) {
            e || (e = {
                stop: function stop() {
                    return t(n.a, 2);
                },
                "catch": function _catch() {
                    return n.v;
                },
                abrupt: function abrupt(r, e) {
                    return t(n.a, o[r], e);
                },
                delegateYield: function delegateYield(r, o, a) {
                    return e.resultName = o, t(n.d, regeneratorValues(r), a);
                },
                finish: function finish(r) {
                    return t(n.f, r);
                }
            }, t = function t(r, _t, o) {
                n.p = e.prev, n.n = e.next;
                try {
                    return r(_t, o);
                } finally{
                    e.next = n.n;
                }
            }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
            try {
                return r.call(this, e);
            } finally{
                n.p = e.prev, n.n = e.next;
            }
        };
    }
    return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
        return {
            wrap: function wrap(e, t, n, o) {
                return r.w(a(e), t, n, o && o.reverse());
            },
            isGeneratorFunction: n,
            mark: r.m,
            awrap: function awrap(r, e) {
                return new OverloadYield(r, e);
            },
            AsyncIterator: regeneratorAsyncIterator,
            async: function async(r, e, t, o, u) {
                return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
            },
            keys: regeneratorKeys,
            values: regeneratorValues
        };
    }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/regenerator/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// TODO(Babel 8): Remove this file.
var runtime = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/regeneratorRuntime.js [app-client] (ecmascript)")();
module.exports = runtime;
// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
    } else {
        Function("r", "regeneratorRuntime = r")(runtime);
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/toPrimitive.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/typeof.js [app-client] (ecmascript)")["default"];
function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/typeof.js [app-client] (ecmascript)")["default"];
var toPrimitive = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/toPrimitive.js [app-client] (ecmascript)");
function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/defineProperty.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toPropertyKey = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-client] (ecmascript)");
function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
        var i = n[a](c), u = i.value;
    } catch (n) {
        return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
    return function() {
        var t = this, e = arguments;
        return new Promise(function(r, o) {
            var a = n.apply(t, e);
            function _next(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
            }
            function _throw(n) {
                asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
            }
            _next(void 0);
        });
    };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/arrayWithHoles.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayLikeToArray = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js [app-client] (ecmascript)");
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
    }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/nonIterableRest.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/slicedToArray.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var arrayWithHoles = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/arrayWithHoles.js [app-client] (ecmascript)");
var iterableToArrayLimit = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js [app-client] (ecmascript)");
var unsupportedIterableToArray = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js [app-client] (ecmascript)");
var nonIterableRest = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/nonIterableRest.js [app-client] (ecmascript)");
function _slicedToArray(r, e) {
    return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/classCallCheck.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/createClass.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toPropertyKey = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/toPropertyKey.js [app-client] (ecmascript)");
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/assertThisInitialized.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _typeof = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/typeof.js [app-client] (ecmascript)")["default"];
var assertThisInitialized = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/assertThisInitialized.js [app-client] (ecmascript)");
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/getPrototypeOf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _getPrototypeOf(t) {
    return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _setPrototypeOf(t, e) {
    return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/inherits.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var setPrototypeOf = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-client] (ecmascript)");
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/isNativeFunction.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _isNativeFunction(t) {
    try {
        return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
        return "function" == typeof t;
    }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/construct.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var isNativeReflectConstruct = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js [app-client] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-client] (ecmascript)");
function _construct(t, e, r) {
    if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [
        null
    ];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/wrapNativeSuper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var getPrototypeOf = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/getPrototypeOf.js [app-client] (ecmascript)");
var setPrototypeOf = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/setPrototypeOf.js [app-client] (ecmascript)");
var isNativeFunction = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/isNativeFunction.js [app-client] (ecmascript)");
var construct = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/construct.js [app-client] (ecmascript)");
function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return module.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {
        if (null === t || !isNativeFunction(t)) return t;
        if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
        if (void 0 !== r) {
            if (r.has(t)) return r.get(t);
            r.set(t, Wrapper);
        }
        function Wrapper() {
            return construct(t, arguments, getPrototypeOf(this).constructor);
        }
        return Wrapper.prototype = Object.create(t.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), setPrototypeOf(Wrapper, t);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _wrapNativeSuper(t);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/core/errors.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-client] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/regenerator/index.js [app-client] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-client] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/defineProperty.js [app-client] (ecmascript)"));
var _classCallCheck2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/classCallCheck.js [app-client] (ecmascript)"));
var _createClass2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/createClass.js [app-client] (ecmascript)"));
var _possibleConstructorReturn2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js [app-client] (ecmascript)"));
var _getPrototypeOf2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/getPrototypeOf.js [app-client] (ecmascript)"));
var _inherits2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/inherits.js [app-client] (ecmascript)"));
var _wrapNativeSuper2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/wrapNativeSuper.js [app-client] (ecmascript)"));
function _callSuper(t, o, e) {
    return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e));
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
var UnknownError = exports.UnknownError = function(_Error) {
    function UnknownError(error) {
        var _message;
        var _this;
        (0, _classCallCheck2.default)(this, UnknownError);
        _this = _callSuper(this, UnknownError, [
            (_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error
        ]);
        _this.name = "UnknownError";
        _this.code = error.code;
        if (error instanceof Error) {
            _this.stack = error.stack;
        }
        return _this;
    }
    (0, _inherits2.default)(UnknownError, _Error);
    return (0, _createClass2.default)(UnknownError, [
        {
            key: "toJSON",
            value: function toJSON() {
                return {
                    name: this.name,
                    message: this.message,
                    stack: this.stack
                };
            }
        }
    ]);
}((0, _wrapNativeSuper2.default)(Error));
var OAuthCallbackError = exports.OAuthCallbackError = function(_UnknownError) {
    function OAuthCallbackError() {
        var _this2;
        (0, _classCallCheck2.default)(this, OAuthCallbackError);
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        _this2 = _callSuper(this, OAuthCallbackError, [].concat(args));
        (0, _defineProperty2.default)(_this2, "name", "OAuthCallbackError");
        return _this2;
    }
    (0, _inherits2.default)(OAuthCallbackError, _UnknownError);
    return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);
var AccountNotLinkedError = exports.AccountNotLinkedError = function(_UnknownError2) {
    function AccountNotLinkedError() {
        var _this3;
        (0, _classCallCheck2.default)(this, AccountNotLinkedError);
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
            args[_key2] = arguments[_key2];
        }
        _this3 = _callSuper(this, AccountNotLinkedError, [].concat(args));
        (0, _defineProperty2.default)(_this3, "name", "AccountNotLinkedError");
        return _this3;
    }
    (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);
    return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);
var MissingAPIRoute = exports.MissingAPIRoute = function(_UnknownError3) {
    function MissingAPIRoute() {
        var _this4;
        (0, _classCallCheck2.default)(this, MissingAPIRoute);
        for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++){
            args[_key3] = arguments[_key3];
        }
        _this4 = _callSuper(this, MissingAPIRoute, [].concat(args));
        (0, _defineProperty2.default)(_this4, "name", "MissingAPIRouteError");
        (0, _defineProperty2.default)(_this4, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
        return _this4;
    }
    (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);
    return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);
var MissingSecret = exports.MissingSecret = function(_UnknownError4) {
    function MissingSecret() {
        var _this5;
        (0, _classCallCheck2.default)(this, MissingSecret);
        for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++){
            args[_key4] = arguments[_key4];
        }
        _this5 = _callSuper(this, MissingSecret, [].concat(args));
        (0, _defineProperty2.default)(_this5, "name", "MissingSecretError");
        (0, _defineProperty2.default)(_this5, "code", "NO_SECRET");
        return _this5;
    }
    (0, _inherits2.default)(MissingSecret, _UnknownError4);
    return (0, _createClass2.default)(MissingSecret);
}(UnknownError);
var MissingAuthorize = exports.MissingAuthorize = function(_UnknownError5) {
    function MissingAuthorize() {
        var _this6;
        (0, _classCallCheck2.default)(this, MissingAuthorize);
        for(var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++){
            args[_key5] = arguments[_key5];
        }
        _this6 = _callSuper(this, MissingAuthorize, [].concat(args));
        (0, _defineProperty2.default)(_this6, "name", "MissingAuthorizeError");
        (0, _defineProperty2.default)(_this6, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
        return _this6;
    }
    (0, _inherits2.default)(MissingAuthorize, _UnknownError5);
    return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);
var MissingAdapter = exports.MissingAdapter = function(_UnknownError6) {
    function MissingAdapter() {
        var _this7;
        (0, _classCallCheck2.default)(this, MissingAdapter);
        for(var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++){
            args[_key6] = arguments[_key6];
        }
        _this7 = _callSuper(this, MissingAdapter, [].concat(args));
        (0, _defineProperty2.default)(_this7, "name", "MissingAdapterError");
        (0, _defineProperty2.default)(_this7, "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
        return _this7;
    }
    (0, _inherits2.default)(MissingAdapter, _UnknownError6);
    return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);
var MissingAdapterMethods = exports.MissingAdapterMethods = function(_UnknownError7) {
    function MissingAdapterMethods() {
        var _this8;
        (0, _classCallCheck2.default)(this, MissingAdapterMethods);
        for(var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++){
            args[_key7] = arguments[_key7];
        }
        _this8 = _callSuper(this, MissingAdapterMethods, [].concat(args));
        (0, _defineProperty2.default)(_this8, "name", "MissingAdapterMethodsError");
        (0, _defineProperty2.default)(_this8, "code", "MISSING_ADAPTER_METHODS_ERROR");
        return _this8;
    }
    (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);
    return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);
var UnsupportedStrategy = exports.UnsupportedStrategy = function(_UnknownError8) {
    function UnsupportedStrategy() {
        var _this9;
        (0, _classCallCheck2.default)(this, UnsupportedStrategy);
        for(var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++){
            args[_key8] = arguments[_key8];
        }
        _this9 = _callSuper(this, UnsupportedStrategy, [].concat(args));
        (0, _defineProperty2.default)(_this9, "name", "UnsupportedStrategyError");
        (0, _defineProperty2.default)(_this9, "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
        return _this9;
    }
    (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);
    return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);
var InvalidCallbackUrl = exports.InvalidCallbackUrl = function(_UnknownError9) {
    function InvalidCallbackUrl() {
        var _this10;
        (0, _classCallCheck2.default)(this, InvalidCallbackUrl);
        for(var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++){
            args[_key9] = arguments[_key9];
        }
        _this10 = _callSuper(this, InvalidCallbackUrl, [].concat(args));
        (0, _defineProperty2.default)(_this10, "name", "InvalidCallbackUrl");
        (0, _defineProperty2.default)(_this10, "code", "INVALID_CALLBACK_URL_ERROR");
        return _this10;
    }
    (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);
    return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);
function upperSnake(s) {
    return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}
function capitalize(s) {
    return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}
function eventsErrorHandler(methods, logger) {
    return Object.keys(methods).reduce(function(acc, name) {
        acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
            var method, _args = arguments;
            return _regenerator.default.wrap(function _callee$(_context) {
                while(1)switch(_context.prev = _context.next){
                    case 0:
                        _context.prev = 0;
                        method = methods[name];
                        _context.next = 4;
                        return method.apply(void 0, _args);
                    case 4:
                        return _context.abrupt("return", _context.sent);
                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context["catch"](0);
                        logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);
                    case 10:
                    case "end":
                        return _context.stop();
                }
            }, _callee, null, [
                [
                    0,
                    7
                ]
            ]);
        }));
        return acc;
    }, {});
}
function adapterErrorHandler(adapter, logger) {
    if (!adapter) return;
    return Object.keys(adapter).reduce(function(acc, name) {
        acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
            var _len10, args, _key10, method, e, _args2 = arguments;
            return _regenerator.default.wrap(function _callee2$(_context2) {
                while(1)switch(_context2.prev = _context2.next){
                    case 0:
                        _context2.prev = 0;
                        for(_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++){
                            args[_key10] = _args2[_key10];
                        }
                        logger.debug("adapter_".concat(name), {
                            args: args
                        });
                        method = adapter[name];
                        _context2.next = 6;
                        return method.apply(void 0, args);
                    case 6:
                        return _context2.abrupt("return", _context2.sent);
                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](0);
                        logger.error("adapter_error_".concat(name), _context2.t0);
                        e = new UnknownError(_context2.t0);
                        e.name = "".concat(capitalize(name), "Error");
                        throw e;
                    case 15:
                    case "end":
                        return _context2.stop();
                }
            }, _callee2, null, [
                [
                    0,
                    9
                ]
            ]);
        }));
        return acc;
    }, {});
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/utils/logger.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-client] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/regenerator/index.js [app-client] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/defineProperty.js [app-client] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-client] (ecmascript)"));
var _errors = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/core/errors.js [app-client] (ecmascript)");
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, _defineProperty2.default)(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function formatError(o) {
    if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
        return {
            message: o.message,
            stack: o.stack,
            name: o.name
        };
    }
    if (hasErrorProperty(o)) {
        var _o$message;
        o.error = formatError(o.error);
        o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
    }
    return o;
}
function hasErrorProperty(x) {
    return !!(x !== null && x !== void 0 && x.error);
}
var _logger = {
    error: function error(code, metadata) {
        metadata = formatError(metadata);
        console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
    },
    warn: function warn(code) {
        console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
    },
    debug: function debug(code, metadata) {
        console.log("[next-auth][debug][".concat(code, "]"), metadata);
    }
};
function setLogger() {
    var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var debug = arguments.length > 1 ? arguments[1] : undefined;
    if (!debug) _logger.debug = function() {};
    if (newLogger.error) _logger.error = newLogger.error;
    if (newLogger.warn) _logger.warn = newLogger.warn;
    if (newLogger.debug) _logger.debug = newLogger.debug;
}
var _default = exports.default = _logger;
function proxyLogger() {
    var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
    var basePath = arguments.length > 1 ? arguments[1] : undefined;
    try {
        if (typeof window === "undefined") {
            return logger;
        }
        var clientLogger = {};
        var _loop = function _loop(level) {
            clientLogger[level] = function() {
                var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(code, metadata) {
                    var url, body;
                    return _regenerator.default.wrap(function _callee$(_context) {
                        while(1)switch(_context.prev = _context.next){
                            case 0:
                                _logger[level](code, metadata);
                                if (level === "error") {
                                    metadata = formatError(metadata);
                                }
                                ;
                                metadata.client = true;
                                url = "".concat(basePath, "/_log");
                                body = new URLSearchParams(_objectSpread({
                                    level: level,
                                    code: code
                                }, metadata));
                                if (!navigator.sendBeacon) {
                                    _context.next = 8;
                                    break;
                                }
                                return _context.abrupt("return", navigator.sendBeacon(url, body));
                            case 8:
                                _context.next = 10;
                                return fetch(url, {
                                    method: "POST",
                                    body: body,
                                    keepalive: true
                                });
                            case 10:
                                return _context.abrupt("return", _context.sent);
                            case 11:
                            case "end":
                                return _context.stop();
                        }
                    }, _callee);
                }));
                return function(_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }();
        };
        for(var level in logger){
            _loop(level);
        }
        return clientLogger;
    } catch (_unused) {
        return _logger;
    }
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/utils/parse-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseUrl;
function parseUrl(url) {
    var _url2;
    const defaultUrl = new URL("http://localhost:3000/api/auth");
    if (url && !url.startsWith("http")) {
        url = `https://${url}`;
    }
    const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
    const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
    const base = `${_url.origin}${path}`;
    return {
        origin: _url.origin,
        host: _url.host,
        path,
        base,
        toString: ()=>base
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/client/_utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-client] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BroadcastChannel = BroadcastChannel;
exports.apiBaseUrl = apiBaseUrl;
exports.fetchData = fetchData;
exports.now = now;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/regenerator/index.js [app-client] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/defineProperty.js [app-client] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-client] (ecmascript)"));
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, _defineProperty2.default)(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
function fetchData(_x, _x2, _x3) {
    return _fetchData.apply(this, arguments);
}
function _fetchData() {
    _fetchData = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path, __NEXTAUTH, logger) {
        var _ref, ctx, _ref$req, req, url, _req$headers, options, res, data, _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
            while(1)switch(_context.prev = _context.next){
                case 0:
                    _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, ctx = _ref.ctx, _ref$req = _ref.req, req = _ref$req === void 0 ? ctx === null || ctx === void 0 ? void 0 : ctx.req : _ref$req;
                    url = "".concat(apiBaseUrl(__NEXTAUTH), "/").concat(path);
                    _context.prev = 2;
                    options = {
                        headers: _objectSpread({
                            "Content-Type": "application/json"
                        }, req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.cookie ? {
                            cookie: req.headers.cookie
                        } : {})
                    };
                    if (req !== null && req !== void 0 && req.body) {
                        options.body = JSON.stringify(req.body);
                        options.method = "POST";
                    }
                    _context.next = 7;
                    return fetch(url, options);
                case 7:
                    res = _context.sent;
                    _context.next = 10;
                    return res.json();
                case 10:
                    data = _context.sent;
                    if (res.ok) {
                        _context.next = 13;
                        break;
                    }
                    throw data;
                case 13:
                    return _context.abrupt("return", Object.keys(data).length > 0 ? data : null);
                case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](2);
                    logger.error("CLIENT_FETCH_ERROR", {
                        error: _context.t0,
                        url: url
                    });
                    return _context.abrupt("return", null);
                case 20:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                2,
                16
            ]
        ]);
    }));
    return _fetchData.apply(this, arguments);
}
function apiBaseUrl(__NEXTAUTH) {
    if (typeof window === "undefined") {
        return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
    }
    return __NEXTAUTH.basePath;
}
function now() {
    return Math.floor(Date.now() / 1000);
}
function BroadcastChannel() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nextauth.message";
    return {
        receive: function receive(onReceive) {
            var handler = function handler(event) {
                var _event$newValue;
                if (event.key !== name) return;
                var message = JSON.parse((_event$newValue = event.newValue) !== null && _event$newValue !== void 0 ? _event$newValue : "{}");
                if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
                onReceive(message);
            };
            window.addEventListener("storage", handler);
            return function() {
                return window.removeEventListener("storage", handler);
            };
        },
        post: function post(message) {
            if (typeof window === "undefined") return;
            try {
                localStorage.setItem(name, JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
                    timestamp: now()
                })));
            } catch (_unused) {}
        }
    };
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/types.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
var _interopRequireDefault = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-client] (ecmascript)");
var _typeof = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/typeof.js [app-client] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _exportNames = {
    SessionContext: true,
    useSession: true,
    getSession: true,
    getCsrfToken: true,
    getProviders: true,
    signIn: true,
    signOut: true,
    SessionProvider: true
};
exports.SessionContext = void 0;
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;
var _regenerator = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/regenerator/index.js [app-client] (ecmascript)"));
var _defineProperty2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/defineProperty.js [app-client] (ecmascript)"));
var _asyncToGenerator2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/asyncToGenerator.js [app-client] (ecmascript)"));
var _slicedToArray2 = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/@babel/runtime/helpers/slicedToArray.js [app-client] (ecmascript)"));
var React = _interopRequireWildcard(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
var _logger2 = _interopRequireWildcard(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/utils/logger.js [app-client] (ecmascript)"));
var _parseUrl = _interopRequireDefault(__turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/utils/parse-url.js [app-client] (ecmascript)"));
var _utils = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/client/_utils.js [app-client] (ecmascript)");
var _jsxRuntime = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var _types = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next-auth/react/types.js [app-client] (ecmascript)");
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _types[key];
        }
    });
});
var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _React$createContext;
function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(), t = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
        return e ? t : r;
    })(e);
}
function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
        default: e
    };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
        __proto__: null
    }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && ({}).hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
}
function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
    }
    return t;
}
function _objectSpread(e) {
    for(var r = 1; r < arguments.length; r++){
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
            (0, _defineProperty2.default)(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
    }
    return e;
}
var __NEXTAUTH = {
    baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VERCEL_URL).origin,
    basePath: (0, _parseUrl.default)(__TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_URL).path,
    baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VERCEL_URL).origin,
    basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXTAUTH_URL).path,
    _lastSync: 0,
    _session: undefined,
    _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);
function useOnline() {
    var _React$useState = React.useState(typeof navigator !== "undefined" ? navigator.onLine : false), _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2), isOnline = _React$useState2[0], setIsOnline = _React$useState2[1];
    var setOnline = function setOnline() {
        return setIsOnline(true);
    };
    var setOffline = function setOffline() {
        return setIsOnline(false);
    };
    React.useEffect({
        "useOnline.useEffect": function() {
            window.addEventListener("online", setOnline);
            window.addEventListener("offline", setOffline);
            return ({
                "useOnline.useEffect": function() {
                    window.removeEventListener("online", setOnline);
                    window.removeEventListener("offline", setOffline);
                }
            })["useOnline.useEffect"];
        }
    }["useOnline.useEffect"], []);
    return isOnline;
}
var SessionContext = exports.SessionContext = (_React$createContext = React.createContext) === null || _React$createContext === void 0 ? void 0 : _React$createContext.call(React, undefined);
function useSession(options) {
    if (!SessionContext) {
        throw new Error("React Context is unavailable in Server Components");
    }
    var value = React.useContext(SessionContext);
    if (!value && ("TURBOPACK compile-time value", "development") !== "production") {
        throw new Error("[next-auth]: `useSession` must be wrapped in a <SessionProvider />");
    }
    var _ref2 = options !== null && options !== void 0 ? options : {}, required = _ref2.required, onUnauthenticated = _ref2.onUnauthenticated;
    var requiredAndNotLoading = required && value.status === "unauthenticated";
    React.useEffect({
        "useSession.useEffect": function() {
            if (requiredAndNotLoading) {
                var url = "/api/auth/signin?".concat(new URLSearchParams({
                    error: "SessionRequired",
                    callbackUrl: window.location.href
                }));
                if (onUnauthenticated) onUnauthenticated();
                else window.location.href = url;
            }
        }
    }["useSession.useEffect"], [
        requiredAndNotLoading,
        onUnauthenticated
    ]);
    if (requiredAndNotLoading) {
        return {
            data: value.data,
            update: value.update,
            status: "loading"
        };
    }
    return value;
}
function getSession(_x) {
    return _getSession2.apply(this, arguments);
}
function _getSession2() {
    _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
        var _params$broadcast;
        var session;
        return _regenerator.default.wrap(function _callee3$(_context3) {
            while(1)switch(_context3.prev = _context3.next){
                case 0:
                    _context3.next = 2;
                    return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);
                case 2:
                    session = _context3.sent;
                    if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
                        broadcast.post({
                            event: "session",
                            data: {
                                trigger: "getSession"
                            }
                        });
                    }
                    return _context3.abrupt("return", session);
                case 5:
                case "end":
                    return _context3.stop();
            }
        }, _callee3);
    }));
    return _getSession2.apply(this, arguments);
}
function getCsrfToken(_x2) {
    return _getCsrfToken.apply(this, arguments);
}
function _getCsrfToken() {
    _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(params) {
        var response;
        return _regenerator.default.wrap(function _callee4$(_context4) {
            while(1)switch(_context4.prev = _context4.next){
                case 0:
                    _context4.next = 2;
                    return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);
                case 2:
                    response = _context4.sent;
                    return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);
                case 4:
                case "end":
                    return _context4.stop();
            }
        }, _callee4);
    }));
    return _getCsrfToken.apply(this, arguments);
}
function getProviders() {
    return _getProviders.apply(this, arguments);
}
function _getProviders() {
    _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
        return _regenerator.default.wrap(function _callee5$(_context5) {
            while(1)switch(_context5.prev = _context5.next){
                case 0:
                    _context5.next = 2;
                    return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);
                case 2:
                    return _context5.abrupt("return", _context5.sent);
                case 3:
                case "end":
                    return _context5.stop();
            }
        }, _callee5);
    }));
    return _getProviders.apply(this, arguments);
}
function signIn(_x3, _x4, _x5) {
    return _signIn.apply(this, arguments);
}
function _signIn() {
    _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(provider, options, authorizationParams) {
        var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;
        return _regenerator.default.wrap(function _callee6$(_context6) {
            while(1)switch(_context6.prev = _context6.next){
                case 0:
                    _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
                    baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
                    _context6.next = 4;
                    return getProviders();
                case 4:
                    providers = _context6.sent;
                    if (providers) {
                        _context6.next = 8;
                        break;
                    }
                    window.location.href = "".concat(baseUrl, "/error");
                    return _context6.abrupt("return");
                case 8:
                    if (!(!provider || !(provider in providers))) {
                        _context6.next = 11;
                        break;
                    }
                    window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
                        callbackUrl: callbackUrl
                    }));
                    return _context6.abrupt("return");
                case 11:
                    isCredentials = providers[provider].type === "credentials";
                    isEmail = providers[provider].type === "email";
                    isSupportingReturn = isCredentials || isEmail;
                    signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
                    _signInUrl = "".concat(signInUrl).concat(authorizationParams ? "?".concat(new URLSearchParams(authorizationParams)) : "");
                    _context6.t0 = fetch;
                    _context6.t1 = _signInUrl;
                    _context6.t2 = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    _context6.t3 = URLSearchParams;
                    _context6.t4 = _objectSpread;
                    _context6.t5 = _objectSpread({}, options);
                    _context6.t6 = {};
                    _context6.next = 25;
                    return getCsrfToken();
                case 25:
                    _context6.t7 = _context6.sent;
                    _context6.t8 = callbackUrl;
                    _context6.t9 = {
                        csrfToken: _context6.t7,
                        callbackUrl: _context6.t8,
                        json: true
                    };
                    _context6.t10 = (0, _context6.t4)(_context6.t5, _context6.t6, _context6.t9);
                    _context6.t11 = new _context6.t3(_context6.t10);
                    _context6.t12 = {
                        method: "post",
                        headers: _context6.t2,
                        body: _context6.t11
                    };
                    _context6.next = 33;
                    return (0, _context6.t0)(_context6.t1, _context6.t12);
                case 33:
                    res = _context6.sent;
                    _context6.next = 36;
                    return res.json();
                case 36:
                    data = _context6.sent;
                    if (!(redirect || !isSupportingReturn)) {
                        _context6.next = 42;
                        break;
                    }
                    url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
                    window.location.href = url;
                    if (url.includes("#")) window.location.reload();
                    return _context6.abrupt("return");
                case 42:
                    error = new URL(data.url).searchParams.get("error");
                    if (!res.ok) {
                        _context6.next = 46;
                        break;
                    }
                    _context6.next = 46;
                    return __NEXTAUTH._getSession({
                        event: "storage"
                    });
                case 46:
                    return _context6.abrupt("return", {
                        error: error,
                        status: res.status,
                        ok: res.ok,
                        url: error ? null : data.url
                    });
                case 47:
                case "end":
                    return _context6.stop();
            }
        }, _callee6);
    }));
    return _signIn.apply(this, arguments);
}
function signOut(_x6) {
    return _signOut.apply(this, arguments);
}
function _signOut() {
    _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(options) {
        var _options$redirect;
        var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;
        return _regenerator.default.wrap(function _callee7$(_context7) {
            while(1)switch(_context7.prev = _context7.next){
                case 0:
                    _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
                    baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
                    _context7.t0 = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    _context7.t1 = URLSearchParams;
                    _context7.next = 6;
                    return getCsrfToken();
                case 6:
                    _context7.t2 = _context7.sent;
                    _context7.t3 = callbackUrl;
                    _context7.t4 = {
                        csrfToken: _context7.t2,
                        callbackUrl: _context7.t3,
                        json: true
                    };
                    _context7.t5 = new _context7.t1(_context7.t4);
                    fetchOptions = {
                        method: "post",
                        headers: _context7.t0,
                        body: _context7.t5
                    };
                    _context7.next = 13;
                    return fetch("".concat(baseUrl, "/signout"), fetchOptions);
                case 13:
                    res = _context7.sent;
                    _context7.next = 16;
                    return res.json();
                case 16:
                    data = _context7.sent;
                    broadcast.post({
                        event: "session",
                        data: {
                            trigger: "signout"
                        }
                    });
                    if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
                        _context7.next = 23;
                        break;
                    }
                    url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
                    window.location.href = url;
                    if (url.includes("#")) window.location.reload();
                    return _context7.abrupt("return");
                case 23:
                    _context7.next = 25;
                    return __NEXTAUTH._getSession({
                        event: "storage"
                    });
                case 25:
                    return _context7.abrupt("return", data);
                case 26:
                case "end":
                    return _context7.stop();
            }
        }, _callee7);
    }));
    return _signOut.apply(this, arguments);
}
function SessionProvider(props) {
    if (!SessionContext) {
        throw new Error("React Context is unavailable in Server Components");
    }
    var children = props.children, basePath = props.basePath, refetchInterval = props.refetchInterval, refetchWhenOffline = props.refetchWhenOffline;
    if (basePath) __NEXTAUTH.basePath = basePath;
    var hasInitialSession = props.session !== undefined;
    __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;
    var _React$useState3 = React.useState({
        "SessionProvider.useState[_React$useState3]": function() {
            if (hasInitialSession) __NEXTAUTH._session = props.session;
            return props.session;
        }
    }["SessionProvider.useState[_React$useState3]"]), _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2), session = _React$useState4[0], setSession = _React$useState4[1];
    var _React$useState5 = React.useState(!hasInitialSession), _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2), loading = _React$useState6[0], setLoading = _React$useState6[1];
    React.useEffect({
        "SessionProvider.useEffect": function() {
            __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
                var _ref4, event, storageEvent, _args = arguments;
                return _regenerator.default.wrap(function _callee$(_context) {
                    while(1)switch(_context.prev = _context.next){
                        case 0:
                            _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
                            _context.prev = 1;
                            storageEvent = event === "storage";
                            if (!(storageEvent || __NEXTAUTH._session === undefined)) {
                                _context.next = 10;
                                break;
                            }
                            __NEXTAUTH._lastSync = (0, _utils.now)();
                            _context.next = 7;
                            return getSession({
                                broadcast: !storageEvent
                            });
                        case 7:
                            __NEXTAUTH._session = _context.sent;
                            setSession(__NEXTAUTH._session);
                            return _context.abrupt("return");
                        case 10:
                            if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
                                _context.next = 12;
                                break;
                            }
                            return _context.abrupt("return");
                        case 12:
                            __NEXTAUTH._lastSync = (0, _utils.now)();
                            _context.next = 15;
                            return getSession();
                        case 15:
                            __NEXTAUTH._session = _context.sent;
                            setSession(__NEXTAUTH._session);
                            _context.next = 22;
                            break;
                        case 19:
                            _context.prev = 19;
                            _context.t0 = _context["catch"](1);
                            logger.error("CLIENT_SESSION_ERROR", _context.t0);
                        case 22:
                            _context.prev = 22;
                            setLoading(false);
                            return _context.finish(22);
                        case 25:
                        case "end":
                            return _context.stop();
                    }
                }, _callee, null, [
                    [
                        1,
                        19,
                        22,
                        25
                    ]
                ]);
            }));
            __NEXTAUTH._getSession();
            return ({
                "SessionProvider.useEffect": function() {
                    __NEXTAUTH._lastSync = 0;
                    __NEXTAUTH._session = undefined;
                    __NEXTAUTH._getSession = ({
                        "SessionProvider.useEffect": function() {}
                    })["SessionProvider.useEffect"];
                }
            })["SessionProvider.useEffect"];
        }
    }["SessionProvider.useEffect"], []);
    React.useEffect({
        "SessionProvider.useEffect": function() {
            var unsubscribe = broadcast.receive({
                "SessionProvider.useEffect.unsubscribe": function() {
                    return __NEXTAUTH._getSession({
                        event: "storage"
                    });
                }
            }["SessionProvider.useEffect.unsubscribe"]);
            return ({
                "SessionProvider.useEffect": function() {
                    return unsubscribe();
                }
            })["SessionProvider.useEffect"];
        }
    }["SessionProvider.useEffect"], []);
    React.useEffect({
        "SessionProvider.useEffect": function() {
            var _props$refetchOnWindo = props.refetchOnWindowFocus, refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;
            var visibilityHandler = function visibilityHandler() {
                if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
                    event: "visibilitychange"
                });
            };
            document.addEventListener("visibilitychange", visibilityHandler, false);
            return ({
                "SessionProvider.useEffect": function() {
                    return document.removeEventListener("visibilitychange", visibilityHandler, false);
                }
            })["SessionProvider.useEffect"];
        }
    }["SessionProvider.useEffect"], [
        props.refetchOnWindowFocus
    ]);
    var isOnline = useOnline();
    var shouldRefetch = refetchWhenOffline !== false || isOnline;
    React.useEffect({
        "SessionProvider.useEffect": function() {
            if (refetchInterval && shouldRefetch) {
                var refetchIntervalTimer = setInterval({
                    "SessionProvider.useEffect.refetchIntervalTimer": function() {
                        if (__NEXTAUTH._session) {
                            __NEXTAUTH._getSession({
                                event: "poll"
                            });
                        }
                    }
                }["SessionProvider.useEffect.refetchIntervalTimer"], refetchInterval * 1000);
                return ({
                    "SessionProvider.useEffect": function() {
                        return clearInterval(refetchIntervalTimer);
                    }
                })["SessionProvider.useEffect"];
            }
        }
    }["SessionProvider.useEffect"], [
        refetchInterval,
        shouldRefetch
    ]);
    var value = React.useMemo({
        "SessionProvider.useMemo[value]": function() {
            return {
                data: session,
                status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
                update: function update(data) {
                    return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
                        var newSession;
                        return _regenerator.default.wrap(function _callee2$(_context2) {
                            while(1)switch(_context2.prev = _context2.next){
                                case 0:
                                    if (!(loading || !session)) {
                                        _context2.next = 2;
                                        break;
                                    }
                                    return _context2.abrupt("return");
                                case 2:
                                    setLoading(true);
                                    _context2.t0 = _utils.fetchData;
                                    _context2.t1 = __NEXTAUTH;
                                    _context2.t2 = logger;
                                    _context2.next = 8;
                                    return getCsrfToken();
                                case 8:
                                    _context2.t3 = _context2.sent;
                                    _context2.t4 = data;
                                    _context2.t5 = {
                                        csrfToken: _context2.t3,
                                        data: _context2.t4
                                    };
                                    _context2.t6 = {
                                        body: _context2.t5
                                    };
                                    _context2.t7 = {
                                        req: _context2.t6
                                    };
                                    _context2.next = 15;
                                    return (0, _context2.t0)("session", _context2.t1, _context2.t2, _context2.t7);
                                case 15:
                                    newSession = _context2.sent;
                                    setLoading(false);
                                    if (newSession) {
                                        setSession(newSession);
                                        broadcast.post({
                                            event: "session",
                                            data: {
                                                trigger: "getSession"
                                            }
                                        });
                                    }
                                    return _context2.abrupt("return", newSession);
                                case 19:
                                case "end":
                                    return _context2.stop();
                            }
                        }, _callee2);
                    }))();
                }
            };
        }
    }["SessionProvider.useMemo[value]"], [
        session,
        loading
    ]);
    return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
        value: value,
        children: children
    });
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/web-vitals/web-vitals.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    "use strict";
    var n = {};
    !function() {
        n.d = function(b, L) {
            for(var P in L){
                if (n.o(L, P) && !n.o(b, P)) {
                    Object.defineProperty(b, P, {
                        enumerable: true,
                        get: L[P]
                    });
                }
            }
        };
    }();
    !function() {
        n.o = function(n, b) {
            return Object.prototype.hasOwnProperty.call(n, b);
        };
    }();
    !function() {
        n.r = function(n) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(n, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(n, "__esModule", {
                value: true
            });
        };
    }();
    if (typeof n !== "undefined") n.ab = ("TURBOPACK compile-time value", "/ROOT/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/web-vitals") + "/";
    var b = {};
    n.r(b);
    n.d(b, {
        CLSThresholds: function() {
            return j;
        },
        FCPThresholds: function() {
            return B;
        },
        FIDThresholds: function() {
            return cn;
        },
        INPThresholds: function() {
            return nn;
        },
        LCPThresholds: function() {
            return en;
        },
        TTFBThresholds: function() {
            return rn;
        },
        onCLS: function() {
            return w;
        },
        onFCP: function() {
            return S;
        },
        onFID: function() {
            return $;
        },
        onINP: function() {
            return N;
        },
        onLCP: function() {
            return z;
        },
        onTTFB: function() {
            return K;
        }
    });
    var L, P, I, A, F, D = -1, a = function(n) {
        addEventListener("pageshow", function(b) {
            b.persisted && (D = b.timeStamp, n(b));
        }, !0);
    }, c = function() {
        var n = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
        if (n && n.responseStart > 0 && n.responseStart < performance.now()) return n;
    }, u = function() {
        var n = c();
        return n && n.activationStart || 0;
    }, f = function(n, b) {
        var L = c(), P = "navigate";
        D >= 0 ? P = "back-forward-cache" : L && (document.prerendering || u() > 0 ? P = "prerender" : document.wasDiscarded ? P = "restore" : L.type && (P = L.type.replace(/_/g, "-")));
        return {
            name: n,
            value: void 0 === b ? -1 : b,
            rating: "good",
            delta: 0,
            entries: [],
            id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
            navigationType: P
        };
    }, s = function(n, b, L) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(n)) {
                var P = new PerformanceObserver(function(n) {
                    Promise.resolve().then(function() {
                        b(n.getEntries());
                    });
                });
                return P.observe(Object.assign({
                    type: n,
                    buffered: !0
                }, L || {})), P;
            }
        } catch (n) {}
    }, d = function(n, b, L, P) {
        var I, A;
        return function(F) {
            b.value >= 0 && (F || P) && ((A = b.value - (I || 0)) || void 0 === I) && (I = b.value, b.delta = A, b.rating = function(n, b) {
                return n > b[1] ? "poor" : n > b[0] ? "needs-improvement" : "good";
            }(b.value, L), n(b));
        };
    }, l = function(n) {
        requestAnimationFrame(function() {
            return requestAnimationFrame(function() {
                return n();
            });
        });
    }, p = function(n) {
        document.addEventListener("visibilitychange", function() {
            "hidden" === document.visibilityState && n();
        });
    }, v = function(n) {
        var b = !1;
        return function() {
            b || (n(), b = !0);
        };
    }, O = -1, h = function() {
        return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
    }, g = function(n) {
        "hidden" === document.visibilityState && O > -1 && (O = "visibilitychange" === n.type ? n.timeStamp : 0, T());
    }, y = function() {
        addEventListener("visibilitychange", g, !0), addEventListener("prerenderingchange", g, !0);
    }, T = function() {
        removeEventListener("visibilitychange", g, !0), removeEventListener("prerenderingchange", g, !0);
    }, E = function() {
        return O < 0 && (O = h(), y(), a(function() {
            setTimeout(function() {
                O = h(), y();
            }, 0);
        })), {
            get firstHiddenTime () {
                return O;
            }
        };
    }, C = function(n) {
        document.prerendering ? addEventListener("prerenderingchange", function() {
            return n();
        }, !0) : n();
    }, B = [
        1800,
        3e3
    ], S = function(n, b) {
        b = b || {}, C(function() {
            var L, P = E(), I = f("FCP"), A = s("paint", function(n) {
                n.forEach(function(n) {
                    "first-contentful-paint" === n.name && (A.disconnect(), n.startTime < P.firstHiddenTime && (I.value = Math.max(n.startTime - u(), 0), I.entries.push(n), L(!0)));
                });
            });
            A && (L = d(n, I, B, b.reportAllChanges), a(function(P) {
                I = f("FCP"), L = d(n, I, B, b.reportAllChanges), l(function() {
                    I.value = performance.now() - P.timeStamp, L(!0);
                });
            }));
        });
    }, j = [
        .1,
        .25
    ], w = function(n, b) {
        b = b || {}, S(v(function() {
            var L, P = f("CLS", 0), I = 0, A = [], c = function(n) {
                n.forEach(function(n) {
                    if (!n.hadRecentInput) {
                        var b = A[0], L = A[A.length - 1];
                        I && n.startTime - L.startTime < 1e3 && n.startTime - b.startTime < 5e3 ? (I += n.value, A.push(n)) : (I = n.value, A = [
                            n
                        ]);
                    }
                }), I > P.value && (P.value = I, P.entries = A, L());
            }, F = s("layout-shift", c);
            F && (L = d(n, P, j, b.reportAllChanges), p(function() {
                c(F.takeRecords()), L(!0);
            }), a(function() {
                I = 0, P = f("CLS", 0), L = d(n, P, j, b.reportAllChanges), l(function() {
                    return L();
                });
            }), setTimeout(L, 0));
        }));
    }, x = 0, _ = 1 / 0, G = 0, M = function(n) {
        n.forEach(function(n) {
            n.interactionId && (_ = Math.min(_, n.interactionId), G = Math.max(G, n.interactionId), x = G ? (G - _) / 7 + 1 : 0);
        });
    }, k = function() {
        "interactionCount" in performance || L || (L = s("event", M, {
            type: "event",
            buffered: !0,
            durationThreshold: 0
        }));
    }, J = [], Q = new Map, U = 0, R = function() {
        return (L ? x : performance.interactionCount || 0) - U;
    }, Z = [], H = function(n) {
        if (Z.forEach(function(b) {
            return b(n);
        }), n.interactionId || "first-input" === n.entryType) {
            var b = J[J.length - 1], L = Q.get(n.interactionId);
            if (L || J.length < 10 || n.duration > b.latency) {
                if (L) n.duration > L.latency ? (L.entries = [
                    n
                ], L.latency = n.duration) : n.duration === L.latency && n.startTime === L.entries[0].startTime && L.entries.push(n);
                else {
                    var P = {
                        id: n.interactionId,
                        latency: n.duration,
                        entries: [
                            n
                        ]
                    };
                    Q.set(P.id, P), J.push(P);
                }
                J.sort(function(n, b) {
                    return b.latency - n.latency;
                }), J.length > 10 && J.splice(10).forEach(function(n) {
                    return Q.delete(n.id);
                });
            }
        }
    }, q = function(n) {
        var b = self.requestIdleCallback || self.setTimeout, L = -1;
        return n = v(n), "hidden" === document.visibilityState ? n() : (L = b(n), p(n)), L;
    }, nn = [
        200,
        500
    ], N = function(n, b) {
        "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (b = b || {}, C(function() {
            var L;
            k();
            var P, I = f("INP"), o = function(n) {
                q(function() {
                    n.forEach(H);
                    var b, L = (b = Math.min(J.length - 1, Math.floor(R() / 50)), J[b]);
                    L && L.latency !== I.value && (I.value = L.latency, I.entries = L.entries, P());
                });
            }, A = s("event", o, {
                durationThreshold: null !== (L = b.durationThreshold) && void 0 !== L ? L : 40
            });
            P = d(n, I, nn, b.reportAllChanges), A && (A.observe({
                type: "first-input",
                buffered: !0
            }), p(function() {
                o(A.takeRecords()), P(!0);
            }), a(function() {
                U = 0, J.length = 0, Q.clear(), I = f("INP"), P = d(n, I, nn, b.reportAllChanges);
            }));
        }));
    }, en = [
        2500,
        4e3
    ], tn = {}, z = function(n, b) {
        b = b || {}, C(function() {
            var L, P = E(), I = f("LCP"), o = function(n) {
                b.reportAllChanges || (n = n.slice(-1)), n.forEach(function(n) {
                    n.startTime < P.firstHiddenTime && (I.value = Math.max(n.startTime - u(), 0), I.entries = [
                        n
                    ], L());
                });
            }, A = s("largest-contentful-paint", o);
            if (A) {
                L = d(n, I, en, b.reportAllChanges);
                var F = v(function() {
                    tn[I.id] || (o(A.takeRecords()), A.disconnect(), tn[I.id] = !0, L(!0));
                });
                [
                    "keydown",
                    "click"
                ].forEach(function(n) {
                    addEventListener(n, function() {
                        return q(F);
                    }, !0);
                }), p(F), a(function(P) {
                    I = f("LCP"), L = d(n, I, en, b.reportAllChanges), l(function() {
                        I.value = performance.now() - P.timeStamp, tn[I.id] = !0, L(!0);
                    });
                });
            }
        });
    }, rn = [
        800,
        1800
    ], on = function e(n) {
        document.prerendering ? C(function() {
            return e(n);
        }) : "complete" !== document.readyState ? addEventListener("load", function() {
            return e(n);
        }, !0) : setTimeout(n, 0);
    }, K = function(n, b) {
        b = b || {};
        var L = f("TTFB"), P = d(n, L, rn, b.reportAllChanges);
        on(function() {
            var I = c();
            I && (L.value = Math.max(I.responseStart - u(), 0), L.entries = [
                I
            ], P(!0), a(function() {
                L = f("TTFB", 0), (P = d(n, L, rn, b.reportAllChanges))(!0);
            }));
        });
    }, an = {
        passive: !0,
        capture: !0
    }, un = new Date, V = function(n, b) {
        P || (P = b, I = n, A = new Date, Y(removeEventListener), W());
    }, W = function() {
        if (I >= 0 && I < A - un) {
            var n = {
                entryType: "first-input",
                name: P.type,
                target: P.target,
                cancelable: P.cancelable,
                startTime: P.timeStamp,
                processingStart: P.timeStamp + I
            };
            F.forEach(function(b) {
                b(n);
            }), F = [];
        }
    }, X = function(n) {
        if (n.cancelable) {
            var b = (n.timeStamp > 1e12 ? new Date : performance.now()) - n.timeStamp;
            "pointerdown" == n.type ? function(n, b) {
                var t = function() {
                    V(n, b), i();
                }, r = function() {
                    i();
                }, i = function() {
                    removeEventListener("pointerup", t, an), removeEventListener("pointercancel", r, an);
                };
                addEventListener("pointerup", t, an), addEventListener("pointercancel", r, an);
            }(b, n) : V(b, n);
        }
    }, Y = function(n) {
        [
            "mousedown",
            "keydown",
            "touchstart",
            "pointerdown"
        ].forEach(function(b) {
            return n(b, X, an);
        });
    }, cn = [
        100,
        300
    ], $ = function(n, b) {
        b = b || {}, C(function() {
            var L, A = E(), D = f("FID"), l = function(n) {
                n.startTime < A.firstHiddenTime && (D.value = n.processingStart - n.startTime, D.entries.push(n), L(!0));
            }, m = function(n) {
                n.forEach(l);
            }, O = s("first-input", m);
            L = d(n, D, cn, b.reportAllChanges), O && (p(v(function() {
                m(O.takeRecords()), O.disconnect();
            })), a(function() {
                var A;
                D = f("FID"), L = d(n, D, cn, b.reportAllChanges), F = [], I = -1, P = null, Y(addEventListener), A = l, F.push(A), W();
            }));
        });
    };
    module.exports = b;
})();
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/web-vitals.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useReportWebVitals", {
    enumerable: true,
    get: function() {
        return useReportWebVitals;
    }
});
const _react = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const _webvitals = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/compiled/web-vitals/web-vitals.js [app-client] (ecmascript)");
function useReportWebVitals(reportWebVitalsFn) {
    (0, _react.useEffect)(()=>{
        (0, _webvitals.onCLS)(reportWebVitalsFn);
        (0, _webvitals.onFID)(reportWebVitalsFn);
        (0, _webvitals.onLCP)(reportWebVitalsFn);
        (0, _webvitals.onINP)(reportWebVitalsFn);
        (0, _webvitals.onFCP)(reportWebVitalsFn);
        (0, _webvitals.onTTFB)(reportWebVitalsFn);
    }, [
        reportWebVitalsFn
    ]);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=web-vitals.js.map
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/web-vitals.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/client/web-vitals.js [app-client] (ecmascript)");
}),
]);

//# debugId=a4b15364-a98f-1cad-33b6-232249ad8e7e
//# sourceMappingURL=c427b_77969bcf._.js.map