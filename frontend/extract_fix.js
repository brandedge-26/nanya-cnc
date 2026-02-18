const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const tmpDir = 'docx_images_tmp';
const outputDir = 'public/equipments';

// Manual fixes based on document analysis:

// 1. AR96-155 - appears on same page spread as AR52-108
// In the docx, AR96-155 is the larger pneumatic plate. Let's check the image around it.
// AR52-108 got image36, the next large image in that area should be for AR96-155
// Looking at images 37-48: image39 was assigned to is52-120, image48 (22KB) is likely AR96-155's product photo
// Actually from the first mammoth run (with wider windows), AR96-155 mapped to image48 (22KB)

// 2. AR155-I - its image overlaps with TS52-ER32's section
// image243 (21KB) is actually AR155-I's pneumatic vise photo
// image244 (14KB) is likely the ER32 chuck photo for TS52-ER32

// 3. CV255125 - no image found by mammoth, XML method found image227 (13KB)
// But image227 was also assigned to AV0166. Let's check nearby alternatives.
// Looking at CV255125's position in the doc, image225 (15KB) or image224 (15KB) might be better

// 4. TS96-ER32, TS96-ER40 - sharing page with L170/L200
// These are ER collet chucks for 96mm system. Let me look at the image range 255-268

// 5. Three Jaws (SC series) - no individual model entries in docx
// The docx has a combined "Three Jaws series" section with image288 (6KB) and image289 (29KB)
// image289 appears to be the run-out tester photo, not three jaws
// The SC chuck images might be in a catalog photo showing all chucks together

// Let's examine the relevant image files to pick the right ones
const fixes = [
    // AR96-155: From first mammoth run, the image after AR96 section before IS52
    // image45 (9KB) - might be the technical drawing
    // image48 (22KB) - this is more likely the product photo
    { file: 'ar96-155', imgNum: 48, note: 'Larger pneumatic plate' },

    // AR155-I: image243 is the single station pneumatic vise photo
    { file: 'ar155-i', imgNum: 243, note: 'Single station pneumatic vise' },

    // Fix TS52-ER32: should be image244 or image245 instead of image243
    { file: 'ts52-er32', imgNum: 248, note: 'ER32 zero point chuck for 52mm' },

    // CV255125: image224 (15KB) is nearby and large enough
    { file: 'cv255125', imgNum: 225, note: 'Long self-centering vise' },

    // TS96-ER32: look at images around element 2311
    // image265 (14KB) is nearby - could be the ER32 for 96mm
    { file: 'ts96-er32', imgNum: 265, note: 'ER32 for 96mm system' },

    // TS96-ER40: image267 (12KB)
    { file: 'ts96-er40', imgNum: 268, note: 'ER40 for 96mm system' },
];

for (const fix of fixes) {
    const srcJpeg = path.join(tmpDir, 'image' + fix.imgNum + '.jpeg');
    const srcPng = path.join(tmpDir, 'image' + fix.imgNum + '.png');
    const destFile = path.join(outputDir, fix.file + '.jpg');

    const src = fs.existsSync(srcJpeg) ? srcJpeg : fs.existsSync(srcPng) ? srcPng : null;
    if (src) {
        const size = fs.statSync(src).size;
        fs.copyFileSync(src, destFile);
        console.log('FIXED: ' + fix.file + '.jpg <- image' + fix.imgNum + ' (' + Math.round(size/1024) + 'KB) - ' + fix.note);
    } else {
        console.log('NOT FOUND: image' + fix.imgNum + ' for ' + fix.file);
    }
}

// Now check some images that might be wrong (too small < 5KB)
console.log('\n--- Checking for small/suspicious images ---');
const allEquipmentFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg'));
for (const f of allEquipmentFiles.sort()) {
    const size = fs.statSync(path.join(outputDir, f)).size;
    if (size < 5000) {
        console.log('SMALL: ' + f + ' (' + Math.round(size/1024) + 'KB) - may need better image');
    }
}

// Also check: is52-170 was getting image48 which is actually for AR96-155
// Let's check what image is really for is52-170
// From the mammoth flow, after is52-170 position, the next image should be specific to it
// image44 (9KB) or image45 (7KB) - one of these is the is52-170 product photo

console.log('\n--- Checking is52-170 assignment ---');
const is52_170_dest = path.join(outputDir, 'is52-170.jpg');
console.log('is52-170.jpg: ' + Math.round(fs.statSync(is52_170_dest).size/1024) + 'KB');
// It got image48 (22KB) which might actually be AR96-155's image
// Let's fix it to a nearby alternative
const img44 = path.join(tmpDir, 'image44.jpeg');
const img45 = path.join(tmpDir, 'image45.jpeg');
console.log('image44: ' + (fs.existsSync(img44) ? Math.round(fs.statSync(img44).size/1024) + 'KB' : 'not found'));
console.log('image45: ' + (fs.existsSync(img45) ? Math.round(fs.statSync(img45).size/1024) + 'KB' : 'not found'));

console.log('\nDone with fixes!');
