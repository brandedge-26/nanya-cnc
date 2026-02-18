const mammoth = require('mammoth');

let imageCounter = 0;
const imageData = [];

mammoth.convertToHtml({path: 'equipments.docx'}, {
    convertImage: mammoth.images.imgElement(function(image) {
        imageCounter++;
        const idx = imageCounter;
        return image.read('base64').then(function(buf) {
            const sizeBytes = Buffer.from(buf, 'base64').length;
            imageData.push({idx, size: sizeBytes});
            return {src: 'DOCIMG_' + idx};
        });
    })
}).then(function(result) {
    const html = result.value;

    // Search for missing models with alternative names
    const searches = [
        'IS96-9096', '1596-9096', '1S96-9096', '9096',
        'SC96', 'SC52', 'Three Jaw', 'three jaw', '3 Jaw',
        'AR96-155', 'AR155-I', 'CV255125',
        'TS96-ER32', 'TS96-ER40',
    ];

    for (const s of searches) {
        const idx = html.indexOf(s);
        if (idx !== -1) {
            const context = html.substring(Math.max(0, idx - 50), idx + 150).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            console.log(s + ' at ' + idx + ': ...' + context.substring(0, 120) + '...');
        } else {
            console.log(s + ' NOT FOUND');
        }
    }

    // Check around AR96-155
    const ar96Idx = html.indexOf('AR96-155');
    if (ar96Idx !== -1) {
        const section = html.substring(ar96Idx, ar96Idx + 2000);
        const imgs = [...section.matchAll(/DOCIMG_(\d+)/g)];
        console.log('\nAR96-155 images nearby:');
        for (const m of imgs) {
            const imgIdx = parseInt(m[1]);
            const info = imageData.find(d => d.idx === imgIdx);
            console.log('  img' + imgIdx + ': ' + (info ? Math.round(info.size/1024) + 'KB' : 'unknown'));
        }
    }

    // Three Jaws section
    const tjIdx = html.indexOf('Three Jaw');
    if (tjIdx !== -1) {
        const section = html.substring(tjIdx, Math.min(html.length, tjIdx + 5000));
        const text = section.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 500);
        console.log('\nThree Jaws text: ' + text);
        const imgs = [...section.matchAll(/DOCIMG_(\d+)/g)];
        console.log('Three Jaws images:');
        for (const m of imgs) {
            const imgIdx = parseInt(m[1]);
            const info = imageData.find(d => d.idx === imgIdx);
            console.log('  img' + imgIdx + ': ' + (info ? Math.round(info.size/1024) + 'KB' : 'unknown'));
        }
    }

    // Check around ER chuck section
    const erIdx = html.indexOf('ER zero point chuck');
    if (erIdx === -1) {
        const erIdx2 = html.indexOf('ER Zero');
        if (erIdx2 !== -1) {
            console.log('\nER Zero at ' + erIdx2);
        }
    } else {
        console.log('\nER zero point chuck at ' + erIdx);
        const section = html.substring(erIdx, erIdx + 3000);
        const text = section.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 400);
        console.log(text);
    }

    // Check L plate section
    const lIdx = html.indexOf('L plate series');
    if (lIdx !== -1) {
        const section = html.substring(lIdx, lIdx + 3000);
        const text = section.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 400);
        console.log('\nL plate section: ' + text);
    }

    // Around position of IS96-9096 alternative
    const idx9096 = html.indexOf('9096');
    if (idx9096 !== -1) {
        const context = html.substring(Math.max(0, idx9096 - 200), idx9096 + 200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        console.log('\n9096 context: ' + context.substring(0, 300));
    }

}).catch(console.error);
