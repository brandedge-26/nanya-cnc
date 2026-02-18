const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const zip = new AdmZip('equipments.docx');
const docXml = zip.readAsText('word/document.xml');
const relsXml = zip.readAsText('word/_rels/document.xml.rels');

// Parse relationships
const relMap = {};
const relMatches = [...relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="(media\/[^"]+)"/g)];
for (const m of relMatches) relMap[m[1]] = m[2];

// Get image sizes
const imageSizes = {};
const tmpDir = 'docx_images_tmp';
for (const [rId, target] of Object.entries(relMap)) {
    const imgPath = path.join(tmpDir, path.basename(target));
    if (fs.existsSync(imgPath)) {
        imageSizes[rId] = fs.statSync(imgPath).size;
    }
}

// Model patterns in the docx XML (model number as it appears in <w:t> tags)
const models = [
    { patterns: ['AR52-108'], file: 'ar52-108' },
    { patterns: ['AR96-155'], file: 'ar96-155' },
    { patterns: ['1552-108', 'IS52-108'], file: 'is52-108' },
    { patterns: ['1552-120', 'IS52-120'], file: 'is52-120' },
    { patterns: ['1552-170', 'IS52-170'], file: 'is52-170' },
    { patterns: ['1552-96', 'IS52-96'], file: 'is52-96' },
    { patterns: ['1552-210', 'IS52-210'], file: 'is52-210' },
    { patterns: ['lA52-108', 'IA52-108', '1A52-108'], file: 'ia52-108' },
    { patterns: ['TS52-215'], file: 'ts52-215' },
    { patterns: ['TS52-9052'], file: 'ts52-9052' },
    { patterns: ['TS52-0090'], file: 'ts52-0090' },
    { patterns: ['TS52-9096'], file: 'ts52-9096' },
    { patterns: ['TS52-120R'], file: 'ts52-120r' },
    { patterns: ['TS96-185'], file: 'ts96-185' },
    { patterns: ['TS96-200'], file: 'ts96-200' },
    { patterns: ['1596-155', 'IS96-155'], file: 'is96-155' },
    { patterns: ['1596-175', 'IS96-175'], file: 'is96-175' },
    { patterns: ['1596-340', 'IS96-340'], file: 'is96-340' },
    { patterns: ['lA9652-155', 'IA9652-155'], file: 'ia9652-155' },
    { patterns: ['TS9652-155'], file: 'ts9652-155' },
    { patterns: ['TS9652-200'], file: 'ts9652-200' },
    { patterns: ['TO9652-200'], file: 'to9652-200' },
    { patterns: ['TS96-276'], file: 'ts96-276' },
    { patterns: ['TO96-276'], file: 'to96-276' },
    { patterns: ['TS96-9690'], file: 'ts96-9690' },
    { patterns: ['TS96-0090'], file: 'ts96-0090' },
    { patterns: ['1596-9096', 'IS96-9096'], file: 'is96-9096' },
    { patterns: ['SV10075'], file: 'sv10075' },
    { patterns: ['SV150100'], file: 'sv150100' },
    { patterns: ['SV170130'], file: 'sv170130' },
    { patterns: ['CV10075'], file: 'cv10075' },
    { patterns: ['CV15075'], file: 'cv15075' },
    { patterns: ['CV155125-I'], file: 'cv155125-i' },
    { patterns: ['CV155125-II'], file: 'cv155125-ii' },
    { patterns: ['CV255125'], file: 'cv255125' },
    { patterns: ['TB255125'], file: 'tb255125' },
    { patterns: ['AV0166'], file: 'av0166' },
    { patterns: ['AR155-I'], file: 'ar155-i' },
    { patterns: ['AR155-II'], file: 'ar155-ii' },
    { patterns: ['TS52-ER32'], file: 'ts52-er32' },
    { patterns: ['TS52-ER40'], file: 'ts52-er40' },
    { patterns: ['TS96-ER32'], file: 'ts96-er32' },
    { patterns: ['TS96-ER40'], file: 'ts96-er40' },
    { patterns: ['L170'], file: 'l170' },
    { patterns: ['L200'], file: 'l200' },
    { patterns: ['DW-1'], file: 'dw-1' },
    { patterns: ['SC96-125'], file: 'sc96-125' },
    { patterns: ['SC96-160'], file: 'sc96-160' },
    { patterns: ['SC96-200'], file: 'sc96-200' },
    { patterns: ['SC52-80'], file: 'sc52-80' },
    { patterns: ['SC52-100'], file: 'sc52-100' },
    { patterns: ['SC52-130'], file: 'sc52-130' },
    { patterns: ['BT30/BT40', 'BT30', 'Run_out', 'Run out'], file: 'runout-tester' },
];

// Search for each model in the raw XML and find the NEAREST large image reference AFTER it
const outputDir = 'public/equipments';
const results = [];

for (const model of models) {
    let bestPos = -1;
    let matchedPattern = '';

    for (const pattern of model.patterns) {
        const pos = docXml.indexOf(pattern);
        if (pos !== -1 && (bestPos === -1 || pos < bestPos)) {
            bestPos = pos;
            matchedPattern = pattern;
        }
    }

    if (bestPos === -1) {
        console.log('NOT IN XML: ' + model.file);
        continue;
    }

    // Search forward in XML for image references (r:embed="rIdXXX")
    // Look within next 15000 chars of XML (roughly a few paragraphs)
    const searchWindow = docXml.substring(bestPos, bestPos + 15000);
    const embedMatches = [...searchWindow.matchAll(/r:embed="(rId\d+)"/g)];

    let foundImage = null;
    let foundSize = 0;

    for (const m of embedMatches) {
        const rId = m[1];
        const size = imageSizes[rId] || 0;
        const target = relMap[rId];

        if (target && size > 5000) {
            foundImage = target;
            foundSize = size;
            break; // Take the first large image
        }
    }

    if (foundImage) {
        const srcFile = path.join(tmpDir, path.basename(foundImage));
        const destFile = path.join(outputDir, model.file + '.jpg');
        if (fs.existsSync(srcFile)) {
            fs.copyFileSync(srcFile, destFile);
            results.push({ file: model.file, src: path.basename(foundImage), size: foundSize, pattern: matchedPattern });
            console.log('OK: ' + model.file + ' <- ' + path.basename(foundImage) + ' (' + Math.round(foundSize/1024) + 'KB) [' + matchedPattern + ']');
        }
    } else {
        // Try lower threshold
        for (const m of embedMatches) {
            const rId = m[1];
            const size = imageSizes[rId] || 0;
            const target = relMap[rId];
            if (target && size > 2000) {
                foundImage = target;
                foundSize = size;
                break;
            }
        }
        if (foundImage) {
            const srcFile = path.join(tmpDir, path.basename(foundImage));
            const destFile = path.join(outputDir, model.file + '.jpg');
            if (fs.existsSync(srcFile)) {
                fs.copyFileSync(srcFile, destFile);
                console.log('SMALL: ' + model.file + ' <- ' + path.basename(foundImage) + ' (' + Math.round(foundSize/1024) + 'KB) [' + matchedPattern + ']');
            }
        } else {
            console.log('NO IMAGE: ' + model.file + ' [' + matchedPattern + ' at pos ' + bestPos + ']');
        }
    }
}

console.log('\nDone!');
