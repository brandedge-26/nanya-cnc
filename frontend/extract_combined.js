const mammoth = require('mammoth');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const tmpDir = 'docx_images_tmp';
const outputDir = 'public/equipments';

// Method 1: Use mammoth to parse HTML and find model->image mappings
async function extractViaMammoth() {
    let imageCounter = 0;
    const imageInfo = [];

    const result = await mammoth.convertToHtml({path: 'equipments.docx'}, {
        convertImage: mammoth.images.imgElement(function(image) {
            imageCounter++;
            const idx = imageCounter;
            return image.read('base64').then(function(buf) {
                const sizeBytes = Buffer.from(buf, 'base64').length;
                imageInfo.push({idx, size: sizeBytes});
                return {src: 'DOCIMG_' + idx};
            });
        })
    });

    const html = result.value;

    // Models as they appear in the docx text
    const modelEntries = [
        { docx: 'AR52-108', file: 'ar52-108' },
        { docx: 'AR96-155', file: 'ar96-155' },
        { docx: '1552-108', file: 'is52-108' },
        { docx: '1552-120', file: 'is52-120' },
        { docx: '1552-170', file: 'is52-170' },
        { docx: '1552-96', file: 'is52-96' },
        { docx: '1552-210', file: 'is52-210' },
        { docx: 'lA52-108', file: 'ia52-108' },
        { docx: 'TS52-215', file: 'ts52-215' },
        { docx: 'TS52-9052', file: 'ts52-9052' },
        { docx: 'TS52-0090', file: 'ts52-0090' },
        { docx: 'TS52-9096', file: 'ts52-9096' },
        { docx: 'TS52-120R', file: 'ts52-120r' },
        { docx: 'TS96-185', file: 'ts96-185' },
        { docx: 'TS96-200', file: 'ts96-200' },
        { docx: '1596-155', file: 'is96-155' },
        { docx: '1596-175', file: 'is96-175' },
        { docx: '1596-340', file: 'is96-340' },
        { docx: 'lA9652-155', file: 'ia9652-155' },
        { docx: 'TS9652-155', file: 'ts9652-155' },
        { docx: 'TS9652-200', file: 'ts9652-200' },
        { docx: 'TO9652-200', file: 'to9652-200' },
        { docx: 'TS96-276', file: 'ts96-276' },
        { docx: 'TO96-276', file: 'to96-276' },
        { docx: 'TS96-9690', file: 'ts96-9690' },
        { docx: 'TS96-0090', file: 'ts96-0090' },
        { docx: '1596-9096', file: 'is96-9096' },
        { docx: 'SV10075', file: 'sv10075' },
        { docx: 'SV150100', file: 'sv150100' },
        { docx: 'SV170130', file: 'sv170130' },
        { docx: 'CV10075', file: 'cv10075' },
        { docx: 'CV15075', file: 'cv15075' },
        { docx: 'CV155125-I', file: 'cv155125-i' },
        { docx: 'CV155125-II', file: 'cv155125-ii' },
        { docx: 'CV255125', file: 'cv255125' },
        { docx: 'TB255125', file: 'tb255125' },
        { docx: 'AV0166', file: 'av0166' },
        { docx: 'AR155-I', file: 'ar155-i' },
        { docx: 'AR155-II', file: 'ar155-ii' },
        { docx: 'TS52-ER32', file: 'ts52-er32' },
        { docx: 'TS52-ER40', file: 'ts52-er40' },
        { docx: 'TS96-ER32', file: 'ts96-er32' },
        { docx: 'TS96-ER40', file: 'ts96-er40' },
        { docx: 'L170', file: 'l170' },
        { docx: 'L200', file: 'l200' },
        { docx: 'DW-1', file: 'dw-1' },
        { docx: 'BT30/BT40', file: 'runout-tester' },
    ];

    // Find positions and sort
    const positioned = [];
    for (const me of modelEntries) {
        const pos = html.indexOf(me.docx);
        if (pos !== -1) positioned.push({...me, pos});
    }
    positioned.sort((a, b) => a.pos - b.pos);

    const mapping = {};
    for (let i = 0; i < positioned.length; i++) {
        const {file, pos} = positioned[i];
        const nextPos = i + 1 < positioned.length ? positioned[i + 1].pos : html.length;
        const section = html.substring(pos, nextPos);
        const imgMatches = [...section.matchAll(/DOCIMG_(\d+)/g)];

        // Find first image > threshold
        for (const threshold of [10000, 5000, 3000]) {
            const found = imgMatches.find(m => {
                const info = imageInfo.find(d => d.idx === parseInt(m[1]));
                return info && info.size > threshold;
            });
            if (found) {
                const imgIdx = parseInt(found[1]);
                const info = imageInfo.find(d => d.idx === imgIdx);
                mapping[file] = { imgNum: imgIdx, size: info.size };
                break;
            }
        }
    }

    return mapping;
}

async function main() {
    console.log('Extracting via mammoth...');
    const mammothMapping = await extractViaMammoth();

    console.log('\nMammoth found mappings for:', Object.keys(mammothMapping).length, 'models');

    // Copy images
    let copied = 0;
    let missing = [];

    const allFiles = [
        'ar52-108', 'ar96-155', 'is52-108', 'is52-120', 'is52-170', 'is52-96', 'is52-210', 'ia52-108',
        'ts52-215', 'ts52-9052', 'ts52-0090', 'ts52-9096', 'ts52-120r',
        'ts96-185', 'ts96-200', 'is96-155', 'is96-175', 'is96-340', 'ia9652-155', 'ts9652-155',
        'ts96-276', 'to96-276', 'ts96-9690', 'ts96-0090', 'is96-9096',
        'sv10075', 'sv150100', 'sv170130',
        'cv10075', 'cv15075', 'cv155125-i', 'cv155125-ii', 'cv255125',
        'tb255125', 'av0166', 'ar155-i', 'ar155-ii',
        'ts52-er32', 'ts52-er40', 'ts96-er32', 'ts96-er40',
        'l170', 'l200', 'dw-1',
        'sc96-125', 'sc96-160', 'sc96-200', 'sc52-80', 'sc52-100', 'sc52-130',
        'runout-tester'
    ];

    for (const file of allFiles) {
        if (mammothMapping[file]) {
            const {imgNum, size} = mammothMapping[file];
            const srcFile = path.join(tmpDir, 'image' + imgNum + '.jpeg');
            const srcFilePng = path.join(tmpDir, 'image' + imgNum + '.png');
            const destFile = path.join(outputDir, file + '.jpg');

            const src = fs.existsSync(srcFile) ? srcFile : fs.existsSync(srcFilePng) ? srcFilePng : null;
            if (src) {
                fs.copyFileSync(src, destFile);
                copied++;
                console.log('  ' + file + '.jpg <- image' + imgNum + ' (' + Math.round(size/1024) + 'KB)');
            }
        } else {
            missing.push(file);
        }
    }

    console.log('\nCopied: ' + copied);
    console.log('Missing: ' + missing.join(', '));

    // For missing SC series (Three Jaws) - they share images in docx
    // The docx doesn't have individual SC model listings
    // Let's check what SC images currently exist
    console.log('\nExisting SC images (not from docx):');
    for (const f of missing) {
        const destFile = path.join(outputDir, f + '.jpg');
        if (fs.existsSync(destFile)) {
            console.log('  ' + f + '.jpg exists (' + Math.round(fs.statSync(destFile).size/1024) + 'KB)');
        } else {
            console.log('  ' + f + '.jpg DOES NOT EXIST');
        }
    }
}

main().catch(console.error);
