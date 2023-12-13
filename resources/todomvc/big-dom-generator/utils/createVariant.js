const fs = require('fs');
const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');

/**
 * Modifies CSS rules based on the provided selector, tuple, and operation.
 *
 * @param {string} css_selector - The CSS selector to match.
 * @param {Array} tuple - The tuple containing the property and value to apply.
 * @param {string} operation - The operation to perform ('add', 'remove', or 'modify').
 * @returns {void}
 */
function vary(css_selector, tuple, operation) {
    // Parse the CSS
    const root = postcss.parse(css);

    // Walk through every rule in the CSS
    root.walkRules(rule => {
        // Parse the selector
        const selector = selectorParser().processSync(rule);

        // If the selector matches the provided css_selector
        if (selector === css_selector) {
            // Apply the operation to the tuple
            const [prop, value] = tuple;
            switch (operation) {
                case 'add':
                    rule.append({ prop, value });
                    break;
                case 'remove':
                    // Check if the property exists in the rule
                    if (rule.nodes.some(node => node.prop === prop)) {
                        // Remove the property from the rule
                        rule.nodes = rule.nodes.filter(node => node.prop !== prop);
                    } else {
                        console.error(`Property '${prop}' does not exist in the rule.`);
                    }
                    break;
                case 'modify':
                    // Check if the property exists in the rule
                    const propertyNode = rule.nodes.find(node => node.prop === prop);
                    if (propertyNode) {
                        // Modify the property value in the rule
                        propertyNode.value = value;
                    } else {
                        console.error(`Property '${prop}' does not exist in the rule.`);
                    }
                    break;
                default:
                    console.error(`Invalid operation '${operation}'.`);
                    break;
            }
        }
    });

    // Stringify the modified CSS and write it back to the file
    const output = root.toString();
    fs.writeFileSync('./dist/big-dom-generator-v2.css', output);
}

let css;

// Read the CSS file
try {
    css = fs.readFileSync('./dist/big-dom-generator-v1.css', 'utf-8');
} catch (error) {
    console.error('An error occurred while reading the CSS file:', error);
    return; // Stop execution if file reading fails
}

try {
    vary('.tree-area', ['isolation', 'isolate'], 'add');
} catch (error) {
    console.error('An error occurred while varying the CSS:', error);
}
