const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const zip = new AdmZip('equipments.docx');

// Read document.xml
const docXml = zip.readAsText('word/document.xml');

// Read relationships to map rId to image files
const relsXml = zip.readAsText('word/_rels/document.xml.rels');

// Parse relationships: rId -> image file
const relMap = {};
const relMatches = [...relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="(media\/[^"]+)"/g)];
for (const m of relMatches) {
    relMap[m[1]] = m[2];
}
console.log('Found', Object.keys(relMap).length, 'image relationships');

// Now parse document.xml to find text + image sequences
// We'll look for paragraphs containing model numbers followed by images

// Extract all elements in order (paragraphs with text and images)
const elements = [];

// Find all paragraphs with their text content
const paraRegex = /<w:p[\s>][\s\S]*?<\/w:p>/g;
let paraMatch;
let paraIndex = 0;
while ((paraMatch = paraRegex.exec(docXml)) !== null) {
    const para = paraMatch[0];
    paraIndex++;

    // Extract text from this paragraph
    const textParts = [];
    const textRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
    let textMatch;
    while ((textMatch = textRegex.exec(para)) !== null) {
        textParts.push(textMatch[1]);
    }
    const text = textParts.join('');

    // Extract images from this paragraph
    const imgRegex = /r:embed="(rId\d+)"/g;
    let imgMatch;
    const images = [];
    while ((imgMatch = imgRegex.exec(para)) !== null) {
        const rId = imgMatch[1];
        if (relMap[rId]) {
            images.push(relMap[rId]);
        }
    }

    if (text.trim() || images.length > 0) {
        elements.push({ paraIndex, text: text.trim(), images });
    }
}

console.log('Parsed', elements.length, 'non-empty elements');

// Now find model headings and map to their nearest product image
const modelPatterns = [
    { pattern: 'AR52-108', file: 'ar52-108' },
    { pattern: 'AR96-155', file: 'ar96-155' },
    { pattern: '1552-108', file: 'is52-108' },
    { pattern: '1552-120', file: 'is52-120' },
    { pattern: '1552-170', file: 'is52-170' },
    { pattern: '1552-96', file: 'is52-96' },
    { pattern: '1552-210', file: 'is52-210' },
    { pattern: 'lA52-108', file: 'ia52-108' },
    { pattern: 'TS52-215', file: 'ts52-215' },
    { pattern: 'TS52-9052', file: 'ts52-9052' },
    { pattern: 'TS52-0090', file: 'ts52-0090' },
    { pattern: 'TS52-9096', file: 'ts52-9096' },
    { pattern: 'TS52-120R', file: 'ts52-120r' },
    { pattern: 'TS96-185', file: 'ts96-185' },
    { pattern: 'TS96-200', file: 'ts96-200' },
    { pattern: '1596-155', file: 'is96-155' },
    { pattern: '1596-175', file: 'is96-175' },
    { pattern: '1596-340', file: 'is96-340' },
    { pattern: 'lA9652-155', file: 'ia9652-155' },
    { pattern: 'TS9652-155', file: 'ts9652-155' },
    { pattern: 'TS9652-200', file: 'ts9652-200' },
    { pattern: 'TO9652-200', file: 'to9652-200' },
    { pattern: 'TS96-276', file: 'ts96-276' },
    { pattern: 'TO96-276', file: 'to96-276' },
    { pattern: 'TS96-9690', file: 'ts96-9690' },
    { pattern: 'TS96-0090', file: 'ts96-0090' },
    { pattern: '1596-9096', file: 'is96-9096' },
    { pattern: 'SV10075', file: 'sv10075' },
    { pattern: 'SV150100', file: 'sv150100' },
    { pattern: 'SV170130', file: 'sv170130' },
    { pattern: 'CV10075', file: 'cv10075' },
    { pattern: 'CV15075', file: 'cv15075' },
    { pattern: 'CV155125-I', file: 'cv155125-i' },
    { pattern: 'CV155125-II', file: 'cv155125-ii' },
    { pattern: 'CV255125', file: 'cv255125' },
    { pattern: 'TB255125', file: 'tb255125' },
    { pattern: 'AV0166', file: 'av0166' },
    { pattern: 'AR155-I', file: 'ar155-i' },
    { pattern: 'AR155-II', file: 'ar155-ii' },
    { pattern: 'TS52-ER32', file: 'ts52-er32' },
    { pattern: 'TS52-ER40', file: 'ts52-er40' },
    { pattern: 'TS96-ER32', file: 'ts96-er32' },
    { pattern: 'TS96-ER40', file: 'ts96-er40' },
    { pattern: 'L170', file: 'l170' },
    { pattern: 'L200', file: 'l200' },
    { pattern: 'DW-1', file: 'dw-1' },
    { pattern: 'BT30/BT40', file: 'runout-tester' },
];

// Find each model's paragraph position
const modelPositions = [];
for (const mp of modelPatterns) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].text.includes(mp.pattern)) {
            modelPositions.push({ ...mp, elemIndex: i });
            break;
        }
    }
}

// Sort by element index
modelPositions.sort((a, b) => a.elemIndex - b.elemIndex);

// For each model, find the first image within the next 20 paragraphs that is > 5KB
const outputDir = 'public/equipments';
const tmpDir = 'docx_images_tmp';

let totalCopied = 0;
for (let i = 0; i < modelPositions.length; i++) {
    const mp = modelPositions[i];
    const nextModelIdx = i + 1 < modelPositions.length ? modelPositions[i + 1].elemIndex : elements.length;
    const searchEnd = Math.min(nextModelIdx, mp.elemIndex + 30);

    let foundImage = null;
    let foundImageSize = 0;

    // Look for images in the elements after the model heading
    for (let j = mp.elemIndex; j < searchEnd; j++) {
        for (const img of elements[j].images) {
            const imgPath = path.join(tmpDir, path.basename(img));
            // Try with different extensions
            const possiblePaths = [imgPath, imgPath.replace('.jpeg', '.png'), imgPath.replace('.png', '.jpeg')];
            for (const p of possiblePaths) {
                if (fs.existsSync(p)) {
                    const size = fs.statSync(p).size;
                    if (size > 5000 && (!foundImage || size > foundImageSize)) {
                        // Take the FIRST large image, not the largest
                        if (!foundImage) {
                            foundImage = p;
                            foundImageSize = size;
                        }
                    }
                }
            }
            if (foundImage) break;
        }
        if (foundImage) break;
    }

    if (foundImage) {
        const destFile = path.join(outputDir, mp.file + '.jpg');
        fs.copyFileSync(foundImage, destFile);
        totalCopied++;
        console.log('OK: ' + mp.file + '.jpg <- ' + path.basename(foundImage) + ' (' + Math.round(foundImageSize/1024) + 'KB)');
    } else {
        // Try smaller threshold
        for (let j = mp.elemIndex; j < searchEnd; j++) {
            for (const img of elements[j].images) {
                const imgPath = path.join(tmpDir, path.basename(img));
                if (fs.existsSync(imgPath)) {
                    const size = fs.statSync(imgPath).size;
                    if (size > 2000 && !foundImage) {
                        foundImage = imgPath;
                        foundImageSize = size;
                    }
                }
            }
            if (foundImage) break;
        }
        if (foundImage) {
            const destFile = path.join(outputDir, mp.file + '.jpg');
            fs.copyFileSync(foundImage, destFile);
            totalCopied++;
            console.log('SMALL: ' + mp.file + '.jpg <- ' + path.basename(foundImage) + ' (' + Math.round(foundImageSize/1024) + 'KB)');
        } else {
            console.log('MISSING: ' + mp.file + ' (' + mp.pattern + ')');
        }
    }
}

console.log('\nTotal copied: ' + totalCopied + '/' + modelPositions.length);

// Check for Three Jaws series - they might use different naming
console.log('\n--- Searching for Three Jaws models ---');
for (let i = 0; i < elements.length; i++) {
    const text = elements[i].text;
    if (text.includes('Three Jaw') || text.includes('three jaw') || text.includes('3 Jaw') ||
        (text.includes('SC') && text.includes('-'))) {
        console.log('Element ' + i + ': ' + text.substring(0, 100));
    }
}
