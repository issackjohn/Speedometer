import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-import-css";
import html from "@rollup/plugin-html";
import path from "path";
import fs from "fs";

export default {
    input: "src/app.js",
    output: [
        {
            file: "dist/app.js",
            format: "es",
            name: "app",
            plugins: [terser()],
        },
    ],
    plugins: [
        resolve(),
        css(),
        copy({
            targets: [
                { src: "index.html", dest: "dist/" },
                { src: "public/", dest: "dist/" },
            ],
        }),
        html({
            template: () => {
                const imagesDir = path.resolve("public", "images");
                const imageExtensions = [".png", ".webp", ".svg"];
                const images = fs.readdirSync(imagesDir).filter((file) => {
                    return imageExtensions.includes(path.extname(file).toLowerCase());
                });

                const preloadLinks = images
                    .map((image) => {
                        return `<link rel="preload" as="image" href="./public/images/${image}">`;
                    })
                    .join("\n        ");

                const iframePath = path.resolve("iframe.html");
                let iframeContent = fs.readFileSync(iframePath, "utf-8");

                const preloadComment = "<!-- Preload links autogenerated by Rollup -->";
                const autogeneratedComment = `${preloadComment}\n        ${preloadLinks}`;

                iframeContent = iframeContent.replace("</head>", `    ${autogeneratedComment}\n    </head>`);

                return iframeContent;
            },
            fileName: "iframe.html",
        }),
    ],
};
