const fs = require("fs");
const postcss = require("postcss");
const selectorParser = require("postcss-selector-parser");

const INPUT_FILE_PATH = "./dist/big-dom-generator-v1.css";
const OUTPUT_FILE_PATH = "./dist/big-dom-generator-v2.css";
let root;

/**
 * Modifies CSS rules based on the provided selector, dictionary, and operation.
 *
 * @param {string} cssSelector - The CSS selector to match.
 * @param {Object} propValueDict - The property-value dictionary to apply.
 * @param {string} operation - The operation to perform ('add', 'remove', or 'modify'). At present, only the "add" operation is implemented.
 */
function vary(cssSelector, propValueDict, operation) {
    try {
        root.walkRules((rule) => {
            const selector = selectorParser().processSync(rule);

            if (selector === cssSelector) {
                const props = Object.entries(propValueDict).map(([prop, value]) => ({ prop, value }));

                switch (operation) {
                    case "add":
                        rule.append(...props);
                        break;
                    default:
                        throw new Error(`Invalid operation '${operation}'.`);
                }
            }
        });
    } catch (error) {
        console.error("An error occurred while varying the CSS:", error);
    }
}

try {
    const css = fs.readFileSync(INPUT_FILE_PATH, "utf-8");
    root = postcss.parse(css);
    vary(".tree-area", { isolation: "isolate" }, "add");
    fs.writeFileSync(OUTPUT_FILE_PATH, root.toString());
} catch (error) {
    console.error("An error occurred while processing the CSS:", error);
}
