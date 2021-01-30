function descriptografar(message){
    try{
        let bytes = Buffer.from(fibonacci(message), 'base64');
        bytes = Buffer.from(fibonacci(bytes.toString('utf8')), 'base64');
        bytes = Buffer.from(bytes.toString('utf8'), 'base64');
        bytes = Buffer.from(fibonacci(bytes.toString('utf8')).replace(/ush63nshgrdf/g, ''), 'base64');
        return bytes.toString('utf8');
    }
    catch(ex){
        return '';
    }
}

function fibonacci(texto){
    let text = '';

    for (let num = texto.length; num > 0; num--)
        text += texto.substr(num - 1, 1);

    return text;
}

module.exports = {
    descriptografar
};