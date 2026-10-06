import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-video-api',
        configureServer(server) {
          server.middlewares.use('/api/save-wedding-image', (req, res) => {
            if (req.method === 'POST') {
              const publicDir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              const filePath = path.join(publicDir, 'web_wedding_img_1.png');
              const aliasPath = path.join(publicDir, 'web wedding img 1.png');

              const writeStream = fs.createWriteStream(filePath);
              req.pipe(writeStream);

              writeStream.on('finish', () => {
                try {
                  fs.copyFileSync(filePath, aliasPath);
                  const imagesDir = path.join(publicDir, 'images');
                  if (!fs.existsSync(imagesDir)) {
                    fs.mkdirSync(imagesDir, { recursive: true });
                  }
                  fs.copyFileSync(filePath, path.join(imagesDir, 'section-image.png'));
                  fs.copyFileSync(filePath, path.join(imagesDir, 'wedding.png'));
                } catch (e) {
                  console.error('Failed to copy alias:', e);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, url: '/images/section-image.png' }));
              });

              writeStream.on('error', (err) => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });

          server.middlewares.use('/api/save-section-image', (req, res) => {
            if (req.method === 'POST') {
              const urlObj = new URL(req.url || '', 'http://localhost:3000');
              const rawId = urlObj.searchParams.get('id') || (req.headers['x-section-id'] as string) || 'section';
              const cleanId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
              const publicDir = path.resolve(__dirname, 'public');
              const imagesDir = path.join(publicDir, 'images');
              if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
              }

              const targetFile = path.join(imagesDir, `${cleanId}.png`);
              const writeStream = fs.createWriteStream(targetFile);
              req.pipe(writeStream);

              writeStream.on('finish', () => {
                if (cleanId === 'wedding' || cleanId === 'section-image') {
                  try {
                    fs.copyFileSync(targetFile, path.join(imagesDir, 'section-image.png'));
                    fs.copyFileSync(targetFile, path.join(publicDir, 'web_wedding_img_1.png'));
                    fs.copyFileSync(targetFile, path.join(publicDir, 'web wedding img 1.png'));
                  } catch (e) {
                    console.error('Failed to copy wedding aliases:', e);
                  }
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, id: cleanId, url: `/images/${cleanId}.png` }));
              });

              writeStream.on('error', (err) => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              });
            } else if (req.method === 'GET') {
              const imagesDir = path.resolve(__dirname, 'public', 'images');
              let files: string[] = [];
              if (fs.existsSync(imagesDir)) {
                files = fs.readdirSync(imagesDir).filter((f) => f.endsWith('.png'));
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ files }));
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });

          server.middlewares.use('/api/save-hero-video', (req, res) => {
            if (req.method === 'POST') {
              const publicDir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              const filePath = path.join(publicDir, 'hero_event_video.mp4');
              const aliasPath = path.join(publicDir, 'amman_event_video.mp4');

              const writeStream = fs.createWriteStream(filePath);
              req.pipe(writeStream);

              writeStream.on('finish', () => {
                try {
                  fs.copyFileSync(filePath, aliasPath);
                } catch (e) {
                  console.error('Failed to copy alias:', e);
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Video saved successfully' }));
              });

              writeStream.on('error', (err) => {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
