"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isElementClickable(elem) {
    if (!elem.getBoundingClientRect || !elem.scrollIntoView || !elem.contains || !elem.getClientRects || !document.elementFromPoint) {
        return false;
    }
    const isOldEdge = !!window.StyleMedia;
    const scrollIntoViewFullSupport = !(window.safari || isOldEdge);
    function getOverlappingElement(elem, context) {
        context = context || document;
        const elemDimension = elem.getBoundingClientRect();
        const x = elemDimension.left + (elem.clientWidth / 2);
        const y = elemDimension.top + (elem.clientHeight / 2);
        return context.elementFromPoint(x, y);
    }
    function getOverlappingRects(elem, context) {
        context = context || document;
        const elems = [];
        const rects = elem.getClientRects();
        const rect = rects[0];
        const x = rect.left + (rect.width / 2);
        const y = rect.top + (rect.height / 2);
        elems.push(context.elementFromPoint(x, y));
        return elems;
    }
    function getOverlappingElements(elem, context) {
        return [getOverlappingElement(elem, context)].concat(getOverlappingRects(elem, context));
    }
    function nodeContains(elem, otherNode) {
        if (isOldEdge) {
            let tmpElement = otherNode;
            while (tmpElement) {
                if (tmpElement === elem) {
                    return true;
                }
                tmpElement = tmpElement.parentNode;
                if (tmpElement && tmpElement.nodeType === 11 && tmpElement.host) {
                    tmpElement = tmpElement.host;
                }
            }
            return false;
        }
        return elem.contains(otherNode);
    }
    function isOverlappingElementMatch(elementsFromPoint, elem) {
        if (elementsFromPoint.some(function (elementFromPoint) {
            return elementFromPoint === elem || nodeContains(elem, elementFromPoint);
        })) {
            return true;
        }
        let elemsWithShadowRoot = [].concat(elementsFromPoint);
        elemsWithShadowRoot = elemsWithShadowRoot.filter(function (x) {
            return x && x.shadowRoot && x.shadowRoot.elementFromPoint;
        });
        let shadowElementsFromPoint = [];
        for (let i = 0; i < elemsWithShadowRoot.length; ++i) {
            let shadowElement = elemsWithShadowRoot[i];
            shadowElementsFromPoint = shadowElementsFromPoint.concat(getOverlappingElements(elem, shadowElement.shadowRoot));
        }
        shadowElementsFromPoint = [].concat(shadowElementsFromPoint);
        shadowElementsFromPoint = shadowElementsFromPoint.filter(function (x) {
            return !elementsFromPoint.includes(x);
        });
        if (shadowElementsFromPoint.length === 0) {
            return false;
        }
        return isOverlappingElementMatch(shadowElementsFromPoint, elem);
    }
    function isElementInViewport(elem) {
        if (!elem.getBoundingClientRect) {
            return false;
        }
        const rect = elem.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) > 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) > 0);
        return (vertInView && horInView);
    }
    function isClickable(elem) {
        return (isElementInViewport(elem) && elem.disabled !== true &&
            isOverlappingElementMatch(getOverlappingElements(elem), elem));
    }
    if (!isClickable(elem)) {
        elem.scrollIntoView(scrollIntoViewFullSupport ? { block: 'nearest', inline: 'nearest' } : false);
        if (!isClickable(elem)) {
            elem.scrollIntoView(scrollIntoViewFullSupport ? { block: 'center', inline: 'center' } : true);
            return isClickable(elem);
        }
    }
    return true;
}
exports.default = isElementClickable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbGVtZW50Q2xpY2thYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvaXNFbGVtZW50Q2xpY2thYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsU0FBd0Isa0JBQWtCLENBQUUsSUFBaUI7SUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUM3SCxPQUFPLEtBQUssQ0FBQTtLQUNmO0lBR0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7SUFFckMsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLENBQUUsTUFBYyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQTtJQUd4RSxTQUFTLHFCQUFxQixDQUFFLElBQWlCLEVBQUUsT0FBa0I7UUFDakUsT0FBTyxHQUFHLE9BQU8sSUFBSSxRQUFRLENBQUE7UUFDN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUE7UUFDbEQsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckQsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDckQsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFJRCxTQUFTLG1CQUFtQixDQUFFLElBQWlCLEVBQUUsT0FBa0I7UUFDL0QsT0FBTyxHQUFHLE9BQU8sSUFBSSxRQUFRLENBQUE7UUFDN0IsTUFBTSxLQUFLLEdB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