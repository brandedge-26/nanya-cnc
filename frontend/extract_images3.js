const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

const zip = new AdmZip('equipments.docx');
const docXml = zip.readAsText('word/document.xml');
const relsXml = zip.readAsText('word/_rels/document.xml.rels');

const relMap = {};
const relMatches = [...relsXml.matchAll(/Id="(rId\d+)"[^>]*Target="(media\/[^"]+)"/g)];
for (const m of relMatches) relMap[m[1]] = m[2];

// Parse all elements
const elements = [];
const paraRegex = /<w:p[\s>][\s\S]*?<\/w:p>/g;
let paraMatch;
while ((paraMatch = paraRegex.exec(docXml)) !== null) {
    const para = paraMatch[0];
    const textParts = [];
    const textRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
    let textMatch;
    while ((textMatch = textRegex.exec(para)) !== null) textParts.push(textMatch[1]);
    const text = textParts.join('');

    const images = [];
    const imgRegex = /r:embed="(rId\d+)"/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(para)) !== null) {
        if (relMap[imgMatch[1]]) images.push(relMap[imgMatch[1]]);
    }

    elements.push({ text: text.trim(), images });
}

// Search for specific missing models
const searches = ['AR96-155', 'AR155-I', 'CV255125', 'TS52-ER40', 'TS96-ER32', 'TS96-ER40', 'TS9652-200', 'Three Jaw', 'Run_out'];
for (const s of searches) {
    console.log('\n=== Searching for: ' + s + ' ===');
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].text.includes(s)) {
            console.log('Found at element ' + i + ': "' + elements[i].text.substring(0, 80) + '"');
            // Show next 15 elements
            for (let j = i; j < Math.min(i + 15, elements.length); j++) {
                const e = elements[j];
                let line = '  [' + j + '] ';
                if (e.text) line += 'TEXT: "' + e.text.substring(0, 60) + '"';
                if (e.images.length > 0) {
                    for (const img of e.images) {
                        const imgPath = path.join('docx_images_tmp', path.basename(img));
                        const size = fs.existsSync(imgPath) ? fs.statSync(imgPath).size : 0;
                        line += ' IMG: ' + path.basename(img) + '(' + Math.round(size/1024) + 'KB)';
                    }
                }
                if (e.text || e.images.length > 0) console.log(line);
            }
            break;
        }
    }
}

// Also check TS52-215 (Zero Point Tower)
console.log('\n=== TS52-215 ===');
for (let i = 0; i < elements.length; i++) {
    if (elements[i].text.includes('TS52-215')) {
        console.log('Found at element ' + i);
        for (let j = i; j < Math.min(i + 15, elements.length); j++) {
            const e = elements[j];
            let line = '  [' + j + '] ';
            if (e.text) line += 'TEXT: "' + e.text.substring(0, 60) + '"';
            if (e.images.length > 0) {
                for (const img of e.images) {
                    const imgPath = path.join('docx_images_tmp', path.basename(img));
                    const size = fs.existsSync(imgPath) ? fs.statSync(imgPath).size : 0;
                    line += ' IMG: ' + path.basename(img) + '(' + Math.round(size/1024) + 'KB)';
                }
            }
            if (e.text || e.images.length > 0) console.log(line);
        }
        break;
    }
}

// SV10075
console.log('\n=== SV10075 ===');
for (let i = 0; i < elements.length; i++) {
    if (elements[i].text.includes('SV10075')) {
        console.log('Found at element ' + i);
        for (let j = i; j < Math.min(i + 15, elements.length); j++) {
            const e = elements[j];
            let line = '  [' + j + '] ';
            if (e.text) line += 'TEXT: "' + e.text.substring(0, 60) + '"';
            if (e.images.length > 0) {
                for (const img of e.images) {
                    const imgPath = path.join('docx_images_tmp', path.basename(img));
                    const size = fs.existsSync(imgPath) ? fs.statSync(imgPath).size : 0;
                    line += ' IMG: ' + path.basename(img) + '(' + Math.round(size/1024) + 'KB)';
                }
            }
            if (e.text || e.images.length > 0) console.log(line);
        }
        break;
    }
}

// TB255125
console.log('\n=== TB255125 ===');
for (let i = 0; i < elements.length; i++) {
    if (elements[i].text.includes('TB255125')) {
        console.log('Found at element ' + i);
        for (let j = i; j < Math.min(i + 15, elements.length); j++) {
            const e = elements[j];
            let line = '  [' + j + '] ';
            if (e.text) line += 'TEXT: "' + e.text.substring(0, 60) + '"';
            if (e.images.length > 0) {
                for (const img of e.images) {
                    const imgPath = path.join('docx_images_tmp', path.basename(img));
                    const size = fs.existsSync(imgPath) ? fs.statSync(imgPath).size : 0;
                    line += ' IMG: ' + path.basename(img) + '(' + Math.round(size/1024) + 'KB)';
                }
            }
            if (e.text || e.images.length > 0) console.log(line);
        }
        break;
    }
}

// TS96-9690
console.log('\n=== TS96-9690 ===');
for (let i = 0; i < elements.length; i++) {
    if (elements[i].text.includes('TS96-9690')) {
        console.log('Found at element ' + i);
        for (let j = i; j < Math.min(i + 15, elements.length); j++) {
            const e = elements[j];
            let line = '  [' + j + '] ';
            if (e.text) line += 'TEXT: "' + e.text.substring(0, 60) + '"';
            if (e.images.length > 0) {
                for (const img of e.images) {
                    const imgPath = path.join('docx_images_tmp', path.basename(img));
                    const size = fs.existsSync(imgPath) ? fs.statSync(imgPath).size : 0;
                    line += ' IMG: ' + path.basename(img) + '(' + Math.round(size/1024) + 'KB)';
                }
            }
            if (e.text || e.images.length > 0) console.log(line);
        }
        break;
    }
}
