import sharp from 'sharp';
import fs from 'fs';

async function main() {
  try {
    let svgText = fs.readFileSync('/app/applet/public/web_wedding_img_1.svg', 'utf8');
    // Strip all comments completely so XML parser is 100% clean
    svgText = svgText.replace(/<!--[\s\S]*?-->/g, '');
    svgText = svgText.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    
    fs.writeFileSync('/app/applet/public/images/section-image.svg', svgText);
    fs.writeFileSync('/app/applet/public/web_wedding_img_1.svg', svgText);

    const svgBuffer = Buffer.from(svgText);
    await sharp(svgBuffer, { density: 300 })
      .resize(1200, 1200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile('/app/applet/public/images/section-image.png');
    
    await sharp(svgBuffer, { density: 300 })
      .resize(1200, 1200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .jpeg({ quality: 96 })
      .toFile('/app/applet/public/images/section-image.jpg');

    // Also copy to web wedding img 1.png in public so any reference works
    fs.copyFileSync('/app/applet/public/images/section-image.png', '/app/applet/public/web wedding img 1.png');
    fs.copyFileSync('/app/applet/public/images/section-image.png', '/app/applet/public/web_wedding_img_1.png');

    console.log('SUCCESS: Generated /public/images/section-image.png and section-image.jpg');
    console.log('Files in /public/images:', fs.readdirSync('/app/applet/public/images'));
    const stats = fs.statSync('/app/applet/public/images/section-image.jpg');
    console.log('section-image.jpg size:', stats.size);
  } catch (err) {
    console.error('Sharp error:', err);
  }
}

main();
