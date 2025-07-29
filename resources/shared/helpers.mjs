/**
 * Helper Methods
 *
 * Various methods that are extracted from the Page class.
 */
export function getParent(lookupStartNode, path) {
    lookupStartNode = lookupStartNode.shadowRoot ?? lookupStartNode;
    const parent = path.reduce((root, selector) => {
        const node = root.querySelector(selector);
        return node.shadowRoot ?? node;
    }, lookupStartNode);

    return parent;
}

export function getElement(selector, path = [], lookupStartNode = document) {
    const element = getParent(lookupStartNode, path).querySelector(selector);
    return element;
}

export function getAllElements(selector, path = [], lookupStartNode = document) {
    const elements = Array.from(getParent(lookupStartNode, path).querySelectorAll(selector));
    return elements;
}

export function forceLayout(body, layoutMode = "getBoundingRectAndElementFromPoint") {
    body ??= document.body;
    const rect = body.getBoundingClientRect();
    switch (layoutMode) {
        case "getBoundingRectAndElementFromPoint": {
            const element = document.elementFromPoint((rect.width / 2) | 0, (rect.height / 2) | 0);
            console.log("forceLayout elementFromPoint:", element, "at coords:", (rect.width / 2) | 0, (rect.height / 2) | 0, "rect:", rect);
            return element;
        }
        case "getBoundingClientRect":
            return rect.height;
        default:
            throw Error(`Invalid layoutMode: ${layoutMode}`);
    }
}
