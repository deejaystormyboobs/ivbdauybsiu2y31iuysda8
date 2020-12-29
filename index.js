const fs = require('fs');

main();

async function main(){
    fs.mkdirSync('build');

    let txt = '';
    txt += '#EXTM3U tvg-shift=3\n';

    fs.writeFileSync('build/866.m3u8', txt);
}