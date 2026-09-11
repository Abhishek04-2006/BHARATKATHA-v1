// src/lib/snapshotEngine.js

export function generateStoryCard(webglCanvas, zoneName = 'Nalanda Mahavihara') {
  return new Promise((resolve) => {
    // 9:16 vertical resolution
    const storyWidth = 1080;
    const storyHeight = 1920;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = storyWidth;
    exportCanvas.height = storyHeight;
    const ctx = exportCanvas.getContext('2d');

    // 1. Deep Obsidian Base Background
    ctx.fillStyle = '#0B0C10';
    ctx.fillRect(0, 0, storyWidth, storyHeight);

    // 2. Draw 3D Viewport in Center (Square / Portrait Frame)
    const framePadding = 60;
    const imgWidth = storyWidth - framePadding * 2;
    const imgHeight = 1100;
    const imgY = 320;

    ctx.save();
    // Rounded corners for the capture frame
    ctx.beginPath();
    ctx.roundRect(framePadding, imgY, imgWidth, imgHeight, 32);
    ctx.clip();
    ctx.drawImage(webglCanvas, framePadding, imgY, imgWidth, imgHeight);
    
    // Ambient dark overlay inside frame edges
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(framePadding, imgY, imgWidth, imgHeight);
    ctx.restore();

    // 3. Golden Border Frame around screenshot
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(framePadding, imgY, imgWidth, imgHeight, 32);
    ctx.stroke();

    // 4. Header Details (Top)
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 36px serif';
    ctx.fillText('BHARATKATHA', framePadding, 160);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '24px monospace';
    ctx.fillText('HISTORICAL CHRONICLE • 5TH CENTURY CE', framePadding, 210);

    // 5. Footer Details (Bottom)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 52px serif';
    ctx.fillText(zoneName, framePadding, 1520);

    ctx.fillStyle = '#E58A2B';
    ctx.font = '28px sans-serif';
    ctx.fillText('Ancient Seat of Universal Learning • Magadha', framePadding, 1575);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '22px monospace';
    ctx.fillText(`Verified Field Discovery • ${new Date().toLocaleDateString('en-GB')}`, framePadding, 1640);

    // 6. Watermark Seal
    ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('bharat-katha.app', storyWidth - framePadding - 240, 1820);

    // Export as PNG Data URL
    resolve(exportCanvas.toDataURL('image/png'));
  });
}