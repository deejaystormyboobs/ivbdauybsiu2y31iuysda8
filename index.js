const fs = require('fs');
const { getData, generateA, generateB } = require('./z');

main();

async function main(){
    try { fs.mkdirSync('build'); }catch{}

    const data = await getData();

    let txtA = await generateA(data);
    fs.writeFileSync('build/866.m3u8', txtA);
    fs.writeFileSync('build/866.m3u8.txt', txtA);

    let txtB = await generateB(data);
    fs.writeFileSync('build/173.m3u8', txtB);
    fs.writeFileSync('build/173.m3u8.txt', txtB);
}