const fs = require('fs');
const { getA } = require('./z');

main();

async function main(){
    try { fs.mkdirSync('build'); }catch{}

    let txtA = await getA();
    fs.writeFileSync('build/866.m3u8', txtA);
}