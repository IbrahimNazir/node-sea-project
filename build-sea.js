const { execSync } = require('child_process');
const fs = require('fs');
const esbuild = require('esbuild');
const path = require('path');

/**
 * References: 
 * SEA: https://nodejs.org/api/single-executable-applications.html
 * ESbuild: https://esbuild.github.io/getting-started/#build-scripts
**/

async function build() {
    try {
        // Create dist directory if it doesn't exist
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }

        // Step 1: Bundle the application (to make single entry point file)
        await esbuild.build({
            entryPoints: ['src/server.js'],
            bundle: true,
            outfile: 'dist/server-out.js',
            minify: true,
            format: 'cjs',
            platform: 'node',
            
        });
        console.log('Bundling completed');

        // Step 2: Generate SEA blob
        execSync('node --experimental-sea-config sea-config.json',{ stdio: 'inherit' });
        console.log('SEA blob generated');

        // Step 3: Create a copy of the node executable
        const exePath = path.join('dist', 'hello.exe');
        fs.copyFileSync(process.execPath, exePath);
        console.log('Node.js executable copied');

        // Step 4: emove the signature of the binary (optional) [On Windows (optional)]
        try {
            execSync(`signtool remove /s "${exePath}"`, { stdio: 'inherit' });
            console.log('Signature removed');
        } catch (e) {
            console.log('Signature removal skipped or failed (optional step)');
        }

        // Step 5: Inject blob into executable
        execSync(
            `npx postject "${exePath}" NODE_SEA_BLOB dist/sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`,
            { stdio: 'inherit' }
        );
        console.log('Blob injected');

        // Step 6: Sign the binary (optional)
        // A certificate needs to be present for this to work. However, the unsigned binary would still be runnable.
        try {
            execSync(`signtool sign /fd SHA256 "${exePath}"`, { stdio: 'inherit' });
            console.log('Binary signed');
        } catch (e) {
            console.log('Binary signing skipped or failed (optional step)');
        }

        console.log('Build completed successfully.\nExecutable: dist/hello.exe');
    } catch (error) {
        console.error('Build failed:', error.message);
        process.exit(1);
    }
}

build();