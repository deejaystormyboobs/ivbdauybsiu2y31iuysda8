const config = require('./config');
const crypto = require('./crypto');
const axios = require('axios').default;

let userAgent = null;

module.exports = {
    async getData(){
        let _URL = null;
        try{
            const { status, data } = await axios.get(config.URL);
        
            userAgent = !data.User ? config.USER_AGENT : (crypto.descriptografar(data.User) || config.USER_AGENT);
            _URL = data.URLListaTVCompleta || data.URLListaTV || data.URLListaTemp || config.FALLBACK_URL;
        }
        catch(ex){
            console.error('Falha ao carregar as configurações. Stack:');
            console.error(ex);

            userAgent = config.USER_AGENT;
            _URL = config.FALLBACK_URL;
        }

        const { status, data } = await axios.get(_URL);
        return data;
    },
    async generateA(data){
        let result = '';
        result += '#EXTM3U tvg-shift=3\n';

        let id = 1;
        for(let canal of data){
            const url = crypto.descriptografar(canal.url.trim());

            result += `#EXTINF:-1 tvg-id="id${id}" tvg-name="${canal.Name.trim()}" tvg-chno="${id}" group-title="${canal.category.trim()}",${canal.Name.trim()}\n`;
            result += `#EXTVLCOPT:http-user-agent=${userAgent}\n`;
            result += `${url};\n`;

            id++;
        }

        return result;
    },
    async generateB(data){
        let result = '';
        result += '#EXTM3U tvg-shift=3\n';

        let id = 1;
        for(let canal of data){
            const url = crypto.descriptografar(canal.url.trim());

            result += `#EXTINF:-1 tvg-id="id${id}" tvg-name="${canal.Name.trim()}" tvg-chno="${id}" group-title="${canal.category.trim()}",${canal.Name.trim()}\n`;
            result += `${url}|user-agent=${userAgent};\n`;

            id++;
        }

        return result;
    },
    async generateC(data){
        let result = [];

        for(let canal of data){
            const url = crypto.descriptografar(canal.url.trim());

            result.push({
                link: url,
                descricao: canal.Name.trim(),
                grupo: canal.category.trim(),
                userAgent,
            });
        }

        return JSON.stringify(result);
    },
}