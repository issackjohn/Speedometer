const fs = require("fs");
const postcss = require("postcss");
const selectorParser = require("postcss-selector-parser");

const INPUT_FILE_PATH = "./dist/big-dom-generator-v1.css";
const OUTPUT_FILE_PATH = "./dist/big-dom-generator-v2.css";

/**
 * Modifies CSS rules based on the provided selector, tuple, and operation.
 *
 * @param {string} cssSelector - The CSS selector to match.
 * @param {Array} propValueTuple - The tuple containing the property and value to apply.
 * @param {string} operation - The operation to perform ('add', 'remove', or 'modify').
 * @returns {void}
 */
function vary(cssSelector, propValueTuple, operation) {
    // Parse the CSS
    const root = postcss.parse(css);

    // Walk through every rule in the CSS
    root.walkRules((rule) => {
        // Parse the selector
        const selector = selectorParser().processSync(rule);

        // If the selector matches the provided cssSelector
        if (selector === cssSelector) {
            // Apply the operation to the propValueTuple
            const [prop, value] = propValueTuple;
            switch (operation) {
                case "add":
                    rule.append({ prop, value });
                    break;
                case "remove":
                    // Not required for this use case but added for completeness
                    break;
                case "modify":
                    // Not required for this use case but added for completeness
                    break;
                default:
                    throw new Error(`Invalid operation '${operation}'.`);
            }
        }
    });

    // Stringify the modified CSS and write it back to the file
    const output = root.toString();
    fs.writeFileSync(OUTPUT_FILE_PATH, output);
}

let css;

try {
    css = fs.readFileSync(INPUT_FILE_PATH, "utf-8");
} catch (error) {
    console.error("An error occurred while reading the CSS file:", error);
    return;
}

try {
    vary(".tree-area", ["isolation", "isolate"], "add");
} catch (error) {
    console.error("An error occurred while varying the CSS:", error);
}
