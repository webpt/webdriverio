"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementDisplayed(element) {
    function nodeIsElement(node) {
        if (!node) {
            return false;
        }
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
                return true;
            default:
                return false;
        }
    }
    function parentElementForElement(element) {
        if (!element) {
            return null;
        }
        return enclosingNodeOrSelfMatchingPredicate(element.parentNode, nodeIsElement);
    }
    function enclosingNodeOrSelfMatchingPredicate(targetNode, predicate) {
        for (let node = targetNode; node && node !== targetNode.ownerDocument; node = node.parentNode)
            if (predicate(node)) {
                return node;
            }
        return null;
    }
    function enclosingElementOrSelfMatchingPredicate(targetElement, predicate) {
        for (let element = targetElement; element && element !== targetElement.ownerDocument; element = parentElementForElement(element))
            if (predicate(element)) {
                return element;
            }
        return null;
    }
    function cascadedStylePropertyForElement(element, property) {
        if (!element || !property) {
            return null;
        }
        if (element instanceof DocumentFragment) {
            element = element.host;
        }
        let computedStyle = window.getComputedStyle(element);
        let computedStyleProperty = computedStyle.getPropertyValue(property);
        if (computedStyleProperty && computedStyleProperty !== 'inherit') {
            return computedStyleProperty;
        }
        let parentElement = parentElementForElement(element);
        return cascadedStylePropertyForElement(parentElement, property);
    }
    function elementSubtreeHasNonZeroDimensions(element) {
        let boundingBox = element.getBoundingClientRect();
        if (boundingBox.width > 0 && boundingBox.height > 0) {
            return true;
        }
        if (element.tagName.toUpperCase() === 'PATH' && boundingBox.width + boundingBox.height > 0) {
            let strokeWidth = cascadedStylePropertyForElement(element, 'stroke-width');
            return !!strokeWidth && (parseInt(strokeWidth, 10) > 0);
        }
        let cascadedOverflow = cascadedStylePropertyForElement(element, 'overflow');
        if (cascadedOverflow === 'hidden') {
            return false;
        }
        return Array.from(element.childNodes).some((childNode) => {
            if (childNode.nodeType === Node.TEXT_NODE) {
                return true;
            }
            if (nodeIsElement(childNode)) {
                return elementSubtreeHasNonZeroDimensions(childNode);
            }
            return false;
        });
    }
    function elementOverflowsContainer(element) {
        let cascadedOverflow = cascadedStylePropertyForElement(element, 'overflow');
        if (cascadedOverflow !== 'hidden') {
            return false;
        }
        return true;
    }
    function isElementSubtreeHiddenByOverflow(element) {
        if (!element) {
            return false;
        }
        if (!elementOverflowsContainer(element)) {
            return false;
        }
        if (!element.childNodes.length) {
            return false;
        }
        return Array.from(element.childNodes).every((childNode) => {
            if (childNode.nodeType === Node.TEXT_NODE) {
                return false;
            }
            if (!nodeIsElement(childNode)) {
                return true;
            }
            if (!elementSubtreeHasNonZeroDimensions(childNode)) {
                return true;
            }
            return isElementSubtreeHiddenByOverflow(childNode);
        });
    }
    function isElementInsideShadowRoot(element) {
        if (!element) {
            return false;
        }
        if (element.parentNode && element.parentNode.host) {
            return true;
        }
        return isElementInsideShadowRoot(element.parentNode);
    }
    if (!isElementInsideShadowRoot(element) && !document.contains(element)) {
        return false;
    }
    switch (element.tagName.toUpperCase()) {
        case 'BODY':
            return true;
        case 'SCRIPT':
        case 'NOSCRIPT':
            return false;
        case 'OPTGROUP':
        case 'OPTION': {
            let enclosingSelectElement = enclosingNodeOrSelfMatchingPredicate(element, (e) => e.tagName.toUpperCase() === 'SELECT');
            return isElementDisplayed(enclosingSelectElement);
        }
        case 'INPUT':
            if (element.type === 'hidden') {
                return false;
            }
            break;
        default:
            break;
    }
    if (cascadedStylePropertyForElement(element, 'visibility') !== 'visible') {
        return false;
    }
    let hasAncestorWithZeroOpacity = !!enclosingElementOrSelfMatchingPredicate(element, (e) => {
        return Number(cascadedStylePropertyForElement(e, 'opacity')) === 0;
    });
    let hasAncestorWithDisplayNone = !!enclosingElementOrSelfMatchingPredicate(element, (e) => {
        return cascadedStylePropertyForElement(e, 'display') === 'none';
    });
    if (hasAncestorWithZeroOpacity || hasAncestorWithDisplayNone) {
        return false;
    }
    if (!elementSubtreeHasNonZeroDimensions(element)) {
        return false;
    }
    if (isElementSubtreeHiddenByOverflow(element)) {
        return false;
    }
    return true;
}
exports.default = isElementDisplayed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbGVtZW50RGlzcGxheWVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvaXNFbGVtZW50RGlzcGxheWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBOEJBLFNBQXdCLGtCQUFrQixDQUFFLE9BQWdCO0lBQ3hELFNBQVMsYUFBYSxDQUFDLElBQWM7UUFDakMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sS0FBSyxDQUFBO1NBQ2Y7UUFFRCxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdkIsS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN4QixLQUFLLElBQUksQ0FBQyxzQkFBc0I7Z0JBQzVCLE9BQU8sSUFBSSxDQUFBO1lBRWY7Z0JBQ0ksT0FBTyxLQUFLLENBQUE7U0FDZjtJQUNMLENBQUM7SUFFRCxTQUFTLHVCQUF1QixDQUFDLE9BQWlCO1FBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQTtTQUNkO1FBRUQsT0FBTyxvQ0FBb0MsQ0FBQyxPQUFPLENBQUMsVUFBd0IsRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUNoRyxDQUFDO0lBRUQsU0FBUyxvQ0FBb0MsQ0FBQyxVQUFvQyxFQUFFLFNBQW1CO1FBQ25HLEtBQ0ksSUFBSSxJQUFJLEdBQWUsVUFBVSxFQUNqQyxJQUFJLElBQUksSUFBSSxLQUFNLFVBQW1CLENBQUMsYUFBYSxFQUNuRCxJQUFJLEdBQUksSUFBb0IsQ0FBQyxVQUF3QjtZQUVyRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDakIsT0FBTyxJQUFJLENBQUE7YUFDZDtRQUVMLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVELFNBQVMsdUNBQXVDLENBQUMsYUFBcUMsRUFBRSxTQUFtQjtRQUN2RyxLQUNJLElBQUksT0FBTyxHQUE2QixhQUFhLEVBQ3JELE9BQU8sSUFB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