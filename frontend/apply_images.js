const fs = require('fs');
const path = require('path');

const tmpDir = 'docx_images_tmp';
const outputDir = 'public/equipments';

// DEFINITIVE MAPPING: Based on visual inspection of each image
// Each entry maps equipment file name -> docx image number (confirmed product photo)
const mapping = {
    // AR Series (Pneumatic Zero Point Plate)
    'ar52-108': 35,    // Silver square plate with OPEN button, labeled AR52-108
    'ar96-155': 44,    // Larger silver plate with OPEN button
    'ar155-i': 244,    // Blue-silver angular block, labeled AR155 (single station)
    'ar155-ii': 253,   // Blue-silver angular block, labeled AR155 (double station)

    // 52 Series (Manual Zero Point Plate)
    'is52-108': 54,    // Silver square plate, labeled IS52-108
    'is52-120': 38,    // Rounded plate (circular D120)
    // is52-170: no clear product photo in docx - keep existing
    'is52-96': 58,     // Partial photo, labeled TS52-96 (conversion plate)
    'is52-210': 60,    // Multi-station plate with 3 OPEN buttons
    'ia52-108': 65,    // Black aluminum plate

    // 52 Series Towers & Workholding
    'ts52-215': 71,    // Tower labeled TS52-215 (blue base, pyramid)
    'ts52-9052': 75,   // Small 0-90° workholding labeled TS52-9052
    'ts52-0090': 76,   // Larger 0-90° workholding labeled TS52-0090
    'ts52-9096': 83,   // 90° workholding on blue base
    'ts52-120r': 99,   // Rotary swivel labeled TS52-120R (better angle)

    // 96 Series (Manual Zero Point Plate)
    'ts96-185': 141,   // Circular plate (D185)
    'ts96-200': 101,   // Large circular plate (D200, png)
    'is96-155': 94,    // Square plate with OPEN button
    // is96-175: no clear product photo in docx - keep existing
    'is96-340': 111,   // Multi-station plate with 3 gold locks
    'ia9652-155': 119, // Black aluminum plate (96mm system)
    'ts9652-155': 128, // Silver compatible plate with gold OPEN

    // 96 Series Towers & Workholding
    'ts96-276': 149,   // Tower labeled TS96-276 (blue base, round)
    'to96-276': 161,   // Through-hole chuck (blue base, center bore)
    // ts96-9690: no clear standalone photo found - keep existing
    'ts96-0090': 154,  // Cube labeled TS96-0090
    'is96-9096': 162,  // Large cube (90° workholding for 96)

    // Self-Centering Vise (SV & CV Series)
    'sv10075': 185,    // Silver vise labeled SV10075
    'sv150100': 191,   // Silver vise labeled SV150100
    'sv170130': 198,   // Silver vise labeled SV170130
    'cv10075': 199,    // Black vise labeled CV10075
    'cv15075': 205,    // Black vise labeled CV15075
    'cv155125-i': 212, // Black vise labeled CV155125
    'cv155125-ii': 224,// Black vise with red accents labeled CV155125
    'cv255125': 229,   // Black double vise labeled CV255125

    // Pneumatic Vise
    'tb255125': 225,   // Double station vise (similar to CV255125)
    'av0166': 227,     // Angular vise labeled AV0166

    // ER Zero Point Chuck
    'ts52-er32': 245,  // Small ER32 collet chuck
    'ts52-er40': 261,  // ER40 collet chuck labeled ER40
    'ts96-er32': 259,  // ER chuck on square base (96mm system)
    'ts96-er40': 261,  // Share ER40 photo (same product, different mount)

    // 4-Axis L Plate
    'l170': 266,       // L-plate labeled L170
    'l200': 267,       // L-plate labeled L200
    'dw-1': 176,       // Cross-shaped positioning locator

    // Three Jaws Series (all share same product photo since docx shows one 3-jaw chuck)
    'sc96-125': 289,   // 3-jaw chuck product photo
    'sc96-160': 289,
    'sc96-200': 289,
    'sc52-80': 289,
    'sc52-100': 289,
    'sc52-130': 289,

    // Run Out Tester
    'runout-tester': 290, // BT40 run-out tester with dial indicator
};

let copied = 0;
let errors = [];

for (const [file, imgNum] of Object.entries(mapping)) {
    const srcJpeg = path.join(tmpDir, 'image' + imgNum + '.jpeg');
    const srcPng = path.join(tmpDir, 'image' + imgNum + '.png');
    const destFile = path.join(outputDir, file + '.jpg');

    const src = fs.existsSync(srcJpeg) ? srcJpeg : fs.existsSync(srcPng) ? srcPng : null;
    if (src) {
        fs.copyFileSync(src, destFile);
        const size = fs.statSync(src).size;
        copied++;
        console.log('OK: ' + file + '.jpg <- image' + imgNum + ' (' + Math.round(size / 1024) + 'KB)');
    } else {
        errors.push(file);
        console.log('ERROR: image' + imgNum + ' not found for ' + file);
    }
}

console.log('\nCopied: ' + copied + '/' + Object.keys(mapping).length);
if (errors.length > 0) console.log('Errors: ' + errors.join(', '));

// List files NOT in mapping (kept as-is)
const notMapped = ['is52-170', 'is96-175', 'ts96-9690', 'ts9652-200', 'to9652-200'];
console.log('\nNot remapped (no clear product photo found): ' + notMapped.filter(f => {
    return fs.existsSync(path.join(outputDir, f + '.jpg'));
}).join(', '));

// Summary of all output files
console.log('\n--- Final image sizes ---');
const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg')).sort();
for (const f of files) {
    const size = fs.statSync(path.join(outputDir, f)).size;
    const status = size < 3000 ? ' ⚠️ SMALL' : size < 6000 ? ' ⚡ moderate' : '';
    console.log('  ' + f + ': ' + Math.round(size / 1024) + 'KB' + status);
}
