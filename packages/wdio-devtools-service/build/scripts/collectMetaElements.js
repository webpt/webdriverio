"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function collectMetaElements() {
    const selector = 'head meta';
    const realMatchesFn = window.Element.prototype.matches;
    const metas = [];
    const _findAllElements = (nodes) => {
        for (let i = 0, el; el = nodes[i]; ++i) {
            if (!selector || realMatchesFn.call(el, selector)) {
                metas.push(el);
            }
            if (el.shadowRoot) {
                _findAllElements(el.shadowRoot.querySelectorAll('*'));
            }
        }
    };
    _findAllElements(document.querySelectorAll('*'));
    return metas.map(meta => {
        const getAttribute = (name) => {
            const attr = meta.attributes.getNamedItem(name);
            if (!attr)
                return;
            return attr.value;
        };
        return {
            name: meta.name.toLowerCase(),
            content: meta.content,
            property: getAttribute('property'),
            httpEquiv: meta.httpEquiv ? meta.httpEquiv.toLowerCase() : undefined,
            charset: getAttribute('charset'),
        };
    });
}
exports.default = collectMetaElements;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdE1ldGFFbGVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2NvbGxlY3RNZXRhRWxlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUF3QixtQkFBbUI7SUFDdkMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFBO0lBQzVCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQTtJQUN0RCxNQUFNLEtBQUssR0FBYyxFQUFFLENBQUE7SUFFM0IsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQTBCLEVBQUUsRUFBRTtRQUVwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQ2pCO1lBRUQsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFO2dCQUNmLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTthQUN4RDtTQUNKO0lBQ0wsQ0FBQyxDQUFBO0lBQ0QsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFaEQsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BCLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7WUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTTtZQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQyxDQUFBO1FBRUQsT0FBTztZQUVILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUU3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUM7WUFFbEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDcEUsT0FBTyxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUM7U0FDbkMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQXJDRCxzQ0FxQ0MifQ==