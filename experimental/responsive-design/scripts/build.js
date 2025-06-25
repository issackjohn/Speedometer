const fs = require('fs');
const path = require('path');

console.log('Building responsive-design workload...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy files to dist directory
const filesToCopy = [
    'index.html',
    'src/styles.css',
    'src/responsive-engine.js',
    'src/performance-monitor.js',
    'src/app.js'
];

filesToCopy.forEach(file => {
    const srcPath = path.join(__dirname, '..', file);
    const destPath = path.join(distDir, file);
    
    // Create destination directory if it doesn't exist
    const destDirPath = path.dirname(destPath);
    if (!fs.existsSync(destDirPath)) {
        fs.mkdirSync(destDirPath, { recursive: true });
    }
    
    // Copy file
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
    } else {
        console.warn(`Source file not found: ${file}`);
    }
});

console.log('Build completed successfully!');
console.log(`Built files are in: ${distDir}`);