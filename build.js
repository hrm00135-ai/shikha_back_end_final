const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

console.log('Starting build process...');

// 1. Clean the dist directory if it exists
if (fs.existsSync(distDir)) {
  console.log('Cleaning existing dist folder...');
  fs.rmSync(distDir, { recursive: true, force: true });
}

// 2. Create the dist directory
fs.mkdirSync(distDir);
console.log('Created dist folder.');

// 3. Files and folders to copy
const itemsToCopy = [
  'src',
  'package.json',
  'package-lock.json',
  '.env.example'
];

itemsToCopy.forEach(item => {
  const srcPath = path.join(rootDir, item);
  const destPath = path.join(distDir, item);

  if (fs.existsSync(srcPath)) {
    const stats = fs.statSync(srcPath);
    if (stats.isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
      console.log(`Copied directory: ${item}`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied file: ${item}`);
    }
  } else {
    console.warn(`Warning: ${item} not found, skipping.`);
  }
});

console.log('\n--- Build Completed! ---');
console.log('You can now upload the contents of the "dist" folder to MilesWeb.');
console.log('Don\'t forget to run "npm install --production" on the server and set up your .env file!');
