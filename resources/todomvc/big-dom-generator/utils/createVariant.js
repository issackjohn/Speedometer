const fs = require("fs");
const postcss = require("postcss");

const INPUT_FILE_PATH = "./dist/big-dom.css";
const OUTPUT_FILE_PATH = "./dist/big-dom-with-stacking-context-scrollable.css";

try {
    const css = fs.readFileSync(INPUT_FILE_PATH, "utf-8");
    const root = postcss.parse(css, { from: INPUT_FILE_PATH });
    root.walkRules(".tree-area", (rule) => {
        rule.append({ prop: "isolation", value: "isolate" });
    });
    fs.writeFileSync(OUTPUT_FILE_PATH, root.toString());
} catch (error) {
    console.error("An error occurred while processing the CSS:", error);
}
