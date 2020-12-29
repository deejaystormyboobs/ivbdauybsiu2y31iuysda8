const config = require('./config');
const crypto = require('./crypto');
const axios = require('axios').default;

const URL = config.URL;
const userAgent = crypto.criptografar(config.USER_AGENT);

module.exports = {
    async getA(){
        const { status, data } = await axios.get(URL);

        let result = '';
        result += '#EXTM3U tvg-shift=3\n';

        let id = 1;
        for(let canal of data){
            const url = crypto.descriptografar(canal.Link.trim());

            result += `#EXTINF:-1 tvg-id="id${id}" tvg-name="${canal.Descricao.trim()}" tvg-logo="${canal.Logo.trim()}" tvg-chno="${id}" group-title="${canal.Grupo.trim()}",${canal.Descricao.trim()}\n`;
            result += `#EXTVLCOPT:http-user-agent=${userAgent}\n`;
            result += `${url};\n`;

            id++;
        }

        return result;
    }
}