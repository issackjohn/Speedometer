const fs = require("fs");
const postcss = require("postcss");
const selectorParser = require("postcss-selector-parser");

const INPUT_FILE_PATH = "./dist/big-dom-generator-v1.css";
const OUTPUT_FILE_PATH = "./dist/big-dom-generator-v2.css";

/**
 * Modifies CSS rules based on the provided selector, tuple, and operation.
 *
 * @param {string} cssSelector - The CSS selector to match.
 * @param {Array<[string, string]>} propValueTuples - The property-value tuples to apply.
 * @param {string} operation - The operation to perform ('add', 'remove', or 'modify'). At present, only the "add" operation is implemented.
 * @returns {string} - The modified CSS as a string.
 */
function vary(cssSelector, propValueTuples, operation) {
    // Parse the CSS
    const root = postcss.parse(css);

    // Walk through every rule in the CSS
    root.walkRules((rule) => {
        // Parse the selector
        const selector = selectorParser().processSync(rule);

        // If the selector matches the provided cssSelector
        if (selector === cssSelector) {
            // Apply the operation to the propValueTuple
            const props = propValueTuples.map(([prop, value]) => ({ prop, value }));

            switch (operation) {
                case "add":
                    rule.append(...props);
                    break;
                default:
                    throw new Error(`Invalid operation '${operation}'.`);
            }
        }
    });

    // Stringify the modified CSS and return it
    return root.toString();
}

let css;

try {
    css = fs.readFileSync(INPUT_FILE_PATH, "utf-8");
} catch (error) {
    console.error("An error occurred while reading the CSS file:", error);
    return;
}

try {
    const modifiedCSS = vary(".tree-area", [["isolation", "isolate"]], "add");
    fs.writeFileSync(OUTPUT_FILE_PATH, modifiedCSS);
} catch (error) {
    console.error("An error occurred while varying the CSS:", error);
}
