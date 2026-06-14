import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const frontendDir = path.join(__dirname, '..', 'frontend');
const outDir = path.join(frontendDir, 'out');
const publicDir = path.join(__dirname, '..', 'public');

// 1. Start Laravel server in the background
console.log('Starting Laravel server for static site generation...');
const artisan = spawn('php', ['artisan', 'serve', '--port=8000'], {
    stdio: 'ignore',
    shell: true
});

// Helper to check if server is ready
function checkServer() {
    return new Promise((resolve) => {
        const check = () => {
            http.get('http://127.0.0.1:8000/api/news', (res) => {
                if (res.statusCode === 200) {
                    console.log('Laravel server is ready!');
                    resolve(true);
                } else {
                    setTimeout(check, 500);
                }
            }).on('error', () => {
                setTimeout(check, 500);
            });
        };
        check();
    });
}

async function run() {
    try {
        await checkServer();

        // 2. Build Frontend
        console.log('Building Next.js frontend (exporting static site)...');
        execSync('npm run build', {
            cwd: frontendDir,
            stdio: 'inherit',
            shell: true
        });

        // 3. Stop Laravel server
        console.log('Stopping Laravel server...');
        artisan.kill('SIGINT');
        artisan.kill();

        // 4. Clean old build files in Laravel public/
        console.log('Cleaning up old build files in public/...');
        const cleanPaths = [
            path.join(publicDir, '_next'),
            path.join(publicDir, 'index.html'),
            path.join(publicDir, 'destinasi.html'),
            path.join(publicDir, 'berita.html'),
            path.join(publicDir, 'destinasi'),
            path.join(publicDir, 'berita'),
        ];
        
        for (const p of cleanPaths) {
            if (fs.existsSync(p)) {
                fs.rmSync(p, { recursive: true, force: true });
            }
        }

        // 5. Copy frontend/out/ contents into Laravel public/
        console.log('Copying static export files to public/...');
        copyFolderSync(outDir, publicDir);

        console.log('Build & copy completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error during build-deployment:', err);
        artisan.kill();
        process.exit(1);
    }
}

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isDirectory()) {
            copyFolderSync(fromPath, toPath);
        } else {
            fs.copyFileSync(fromPath, toPath);
        }
    });
}

run();
