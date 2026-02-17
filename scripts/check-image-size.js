import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');
const screenPath = join(publicDir, 'screen1.png');

try {
  const metadata = await sharp(screenPath).metadata();
  console.log(`Screen1.png: ${metadata.width}x${metadata.height}`);
} catch (error) {
  console.error('Error:', error.message);
}
